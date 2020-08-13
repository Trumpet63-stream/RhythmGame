import {SWFTags} from "./swf-tags";
import {SWF, uncompress} from "./swf-reader";

/**
 * File contents originally from:
 * @author: Velocity
 * @github: https://github.com/flashflashrevolution/web-beatbox-editor
 */

export interface SwfParseResponse {
    chartData: [number, string, string][];
    blob: Blob;
}

export function parseSwfFromArrayBuffer(input: ArrayBuffer): SwfParseResponse {
    return swfFile_Ready(<Uint8Array>input);
}

let swf_tags: SWF;

function swfFile_Ready(buffer: Uint8Array): SwfParseResponse {
    swf_tags = uncompress(buffer);

    // Chart Data
    let chart_tag = getBeatBox();
    let chart_data = chart_tag["variables"]["_root"]["beatBox"];

    // Music Data
    let music_binary = getAudio();
    let blob = new Blob([music_binary], {type: 'audio/mpeg'});

    return {blob: blob, chartData: chart_data};
}

/**
 * Find Beatbox in the swf_tags.
 */
function getBeatBox() {
    let len = swf_tags.tags.length;
    let i = 0;
    let elm = null;

    for (i = 0; i < len; i++) {
        elm = swf_tags.tags[i];
        if (elm.header.code === SWFTags.DOACTION)
            return elm;
    }

    return null;
}

/**
 * Find Beatbox in the swf_tags.
 */
function getAudio() {
    let len = swf_tags.tags.length;
    let i = 0;
    let elm = null;

    let audioSize = 0

    // Loop All Audio Tags, get Total Byte Size
    for (i = 0; i < len; i++) {
        elm = swf_tags.tags[i];
        if (elm.header.code === SWFTags.DEFINESOUND || elm.header.code === SWFTags.STREAMBLOCK)
            audioSize += elm.audio_bytes;
    }

    // Loop All Audio Tags, get Total Byte Size
    let writePosition = 0;
    let binary = new Uint8Array(audioSize);
    for (i = 0; i < len; i++) {
        elm = swf_tags.tags[i];
        if (elm.header.code === SWFTags.DEFINESOUND || elm.header.code === SWFTags.STREAMBLOCK) {
            binary.set(new Uint8Array(elm.data), writePosition);
            writePosition += elm.audio_bytes;
        }
    }
    return binary;
}