import * as pako from "pako";
import {SWFActionTags, SWFOtherTags, SWFTags, SWFTypeTags} from "./swf-tags";
import {ByteReader, Rect, Tag, TagHeader} from "./byte_reader";

/**
 * File contents originally from:
 * @author: Velocity
 * @github: https://github.com/flashflashrevolution/web-beatbox-editor
 */

export class SWF {
    public buffer: ByteReader;
    public magic: string;
    public version: number;
    public fileLength: { compressed: number, uncompressed: number };
    public frameSize: Rect;
    public frameRate: number;
    public frameCount: number;
    public tags: any[];
}

/**
 * Concat SWF Header with uncompressed Buffer
 */
export function concatSWFHeader(buff: Uint8Array, swf: ArrayBuffer) {
    let tmp = new Uint8Array(buff.byteLength + 8);
    tmp.set(new Uint8Array(swf.slice(0, 8)));
    tmp.set(new Uint8Array(buff), 8);
    return tmp.buffer;
}

/**
 * Decompress SWF if needed and Read SWF
 */
export function uncompress(swf: Uint8Array) {
    let swf_bytes = new Uint8Array(swf);
    let compressed_buff: Uint8Array = swf.slice(8);

    // uncompress buffer
    switch (swf_bytes[0]) { // MAGIC
        case 0x43 : // 'C' = zlib compressed
            let uncompressed_buff = concatSWFHeader(pako.inflate(compressed_buff), swf);
            return readSWFBuff(new ByteReader(uncompressed_buff), swf);
            break;

        case 0x46 : // 'F' = uncompressed
            return readSWFBuff(new ByteReader(swf), swf);
            break;

        case 0x5a : // LZMA compressed
            alert('Cannot handle LZMA SWF compressions');
            break;

        default :
            alert('Unknown SWF compressions');
            break;
    }
}

/**
 * Reads the SWF from uncompressed buffer.
 */
export function readSWFBuff(buff: ByteReader, compressed_buff: ArrayBuffer): SWF {
    buff.seek(0);// start

    let swf = new SWF()
    swf.buffer = buff;
    swf.magic = buff.readStringFixed(3);
    swf.version = buff.readUInt8();
    swf.fileLength = {
        compressed: compressed_buff.byteLength,
        uncompressed: buff.readUIntLE(32)
    };
    swf.frameSize = buff.readRect();
    swf.frameRate = buff.readUIntLE(16) / 256;
    swf.frameCount = buff.readUIntLE(16);
    try {
        swf.tags = readSWFTags(buff);
    } catch (e) {
        console.log(e);
    }
    return swf;
}

/**
 * Parses the SWF TAG data structure, keeping only the tags
 * we are interested in.
 * - Audio Tags: Audio Samples
 * - Do Action Tag: Containing the beatBox variable.
 */
export function readSWFTags(buff: ByteReader) {
    let tags: Tag[] = [];
    let tagHeader: TagHeader;

    let mp3Seek = 0;
    let mp3Samples = 0;
    let mp3Id = 0;
    let mp3Format = 0;
    let mp3Stream = false;

    /* Reads TagCodeAndLength from Tag's RECORDHEADER */
    while ((tagHeader = buff.readTagCodeAndLength()) !== null) {
        let tag: Tag = {};
        tag.header = tagHeader;
        tag.doInclude = false;

        switch (tagHeader.code) {
            // Sound Tags - MP3 Extraction
            case SWFTags.STREAMBLOCK:
                if (!mp3Stream || ((tagHeader.length - 4) == 0))
                    break;

                mp3Samples += buff.readUIntLE(16); // frame samples
                buff.readUIntLE(16); // seek samples

                tag.data = buff.buffer_raw.slice(buff.pointer, buff.pointer + (tagHeader.length - 4));
                tag.audio_bytes = (tagHeader.length - 4);
                tag.doInclude = true;
                break;

            case SWFTags.STREAMHEAD:
            case SWFTags.STREAMHEAD2:
                buff.readUIntLE(8);
                mp3Format = buff.readUIntLE(8);
                buff.readUIntLE(16); // average frame samples
                mp3Seek = buff.readUIntLE(16);
                if (((mp3Format >>> 4) & 0xf) == SWFOtherTags.CODEC_MP3)
                    mp3Stream = true;
                break;

            case SWFTags.DEFINESOUND:
                if (!mp3Stream) {
                    let id = buff.readUIntLE(16);
                    let format = buff.readUIntLE(8);
                    if (((format >>> 4) & 0xf) == SWFOtherTags.CODEC_MP3) {
                        mp3Id = id;
                        mp3Format = format;
                        mp3Samples = buff.readUIntLE(32);
                        mp3Seek = buff.readUIntLE(16);
                        tag.data = buff.buffer_raw.slice(buff.pointer, buff.pointer + (tagHeader.length - 9));
                        tag.audio_bytes = (tagHeader.length - 9);
                        tag.doInclude = true;
                    }
                }
                break;

            // DoAction - Where the Beatbox Lives
            case SWFTags.DOACTION :
                let _finishedReading = false;

                let actionStack: any[] = [];
                let actionVariables: any = {};
                let actionRegisters: [any, any, any, any] = [null, null, null, null];
                let constantPool = [];

                while (!_finishedReading) {
                    let action = buff.readAction();

                    // Read Action Tag
                    switch (action.action) {
                        case SWFActionTags.END:
                            _finishedReading = true;
                            break;

                        case SWFActionTags.CONSTANTPOOL:
                            constantPool = [];
                            let constantCount = buff.readUIntLE(16);
                            for (let i = 0; i < constantCount; i++) {
                                constantPool.push(buff.readString());
                            }
                            break;

                        case SWFActionTags.PUSH:
                            while (buff.pointer < action.position + action.length) {
                                let pushValue = undefined;
                                let pushType = buff.readUIntLE(8);
                                switch (pushType) {
                                    case SWFTypeTags.STRING_LITERAL:
                                        pushValue = buff.readString();
                                        break;

                                    case SWFTypeTags.FLOAT_LITERAL:
                                        pushValue = buff.readFloat();
                                        break;

                                    case SWFTypeTags.NULL:
                                        pushValue = null;
                                        break;

                                    case SWFTypeTags.UNDEFINED:
                                        pushValue = undefined;
                                        break;

                                    case SWFTypeTags.REGISTER:
                                        pushValue = actionRegisters[buff.readUIntLE(8)];
                                        break;

                                    case SWFTypeTags.BOOLEAN:
                                        pushValue = Boolean(buff.readUIntLE(8));
                                        break;

                                    case SWFTypeTags.DOUBLE:
                                        pushValue = buff.readDouble();
                                        break;

                                    case SWFTypeTags.INTEGER:
                                        pushValue = buff.readUIntLE(32);
                                        break;

                                    case SWFTypeTags.CONSTANT8:
                                        pushValue = constantPool[buff.readUIntLE(8)];
                                        break;

                                    case SWFTypeTags.CONSTANT16:
                                        pushValue = constantPool[buff.readUIntLE(16)];
                                        break;

                                    default:
                                        console.log("FOUND UNSUPPORTED PUSHDATA TYPE: " + pushType);
                                        break;
                                }
                                actionStack.push(pushValue);
                            }
                            break;

                        case SWFActionTags.POP:
                            actionStack.pop();
                            break;

                        case SWFActionTags.DUPLICATE:
                            actionStack.push(actionStack[actionStack.length - 1]);
                            break;

                        case SWFActionTags.STORE_REGISTER:
                            actionRegisters[buff.readUIntLE(8)] = actionStack[actionStack.length - 1];
                            break;

                        case SWFActionTags.GET_VARIABLE:
                            let gvName = actionStack.pop();
                            if (!(gvName in actionVariables))
                                actionVariables[gvName] = {};
                            actionStack.push(actionVariables[gvName]);
                            break;

                        case SWFActionTags.SET_VARIABLE:
                            let svValue = actionStack.pop();
                            actionVariables[actionStack.pop()] = svValue;
                            break;

                        case SWFActionTags.INIT_ARRAY:
                            let arraySize = actionStack.pop();
                            let array = [];
                            for (let i = 0; i < arraySize; i++)
                                array.push(actionStack.pop());
                            actionStack.push(array);
                            break;

                        case SWFActionTags.GET_MEMBER:
                            let gmName = actionStack.pop();
                            let gmObject = actionStack.pop();
                            if (!(gmName in gmObject))
                                gmObject[gmName] = {};
                            actionStack.push(gmObject[gmName]);
                            break;

                        case SWFActionTags.SET_MEMBER:
                            let smValue = actionStack.pop();
                            let smName = actionStack.pop();
                            actionStack.pop()[smName] = smValue;
                            break;

                        case 7:
                            // this tag isn't supported, but it seems to be in every file, so I'm ignoring it
                            break;

                        default:
                            console.log("FOUND UNSUPPORTED ACTION TAG: " + action.action.toString(16));
                            break;
                    }
                }
                if (actionVariables["_root"] != undefined && actionVariables["_root"]["beatBox"])
                    tag.doInclude = true;

                tag.pool = constantPool;
                tag.variables = actionVariables;
                break;

            default:
                //tag.data = buff.buffer_raw.slice(buff.pointer, buff.pointer + tagHeader.length);
                break;
        }

        if (tag.doInclude) {
            delete tag.doInclude;
            tags.push(tag);
        }

        buff.seek(tagHeader.position + tagHeader.length);
    }
    return tags;
}
