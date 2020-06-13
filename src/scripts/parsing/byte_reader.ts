/**
 * File contents originally from:
 * @author: Velocity
 * @github: https://github.com/flashflashrevolution/web-beatbox-editor
 */

const RECORDHEADER_LENGTH_FULL = 0x3f
    // null-character
    , EOS = 0x00
    , styleCountExt = 0xFF;

export class ByteReader {
    public buffer_raw: ArrayBufferLike;
    public buffer: DataView;
    public pointer: number;
    public position: number;
    public current: number;
    public length: number;

    constructor(buffer: ArrayBufferLike) {
        this.buffer_raw = buffer;
        this.buffer = new DataView(buffer);
        this.pointer = 0;
        this.position = 1;
        this.current = 0;
        this.length = buffer.byteLength;
    }

    /**
     * Reads unsigned 16 or 32 Little Endian Bits
     * and advance pointer to next bits / 8 bytes
     *
     * @param {Number} bits
     * @return {Number} Value read from buffer
     */
    public readUIntLE(bits: number): number {
        let value: number = 0;
        switch (bits) {
            case 8:
                // @ts-ignore: the second parameter might only exist in ES6, let's see if this causes an error
                value = this.buffer.getUint8(this.pointer, true);
                break;
            case 16:
                value = this.buffer.getUint16(this.pointer, true);
                break;
            case 32:
                value = this.buffer.getUint32(this.pointer, true);
                break;
            default:
                throw "Unexpected number of bits: '" + bits + "'";
        }
        this.pointer += bits / 8;
        return value;
    }

    /**
     * Reads unsigned 8 bit from the buffer
     *
     * @return {Number} Value read from buffer
     */

    public readUInt8() {
        return this.buffer.getUint8(this.pointer++);
    };

    /**
     * Reads float from the buffer
     *
     * @return {Number} Value read from buffer
     */

    public readFloat() {
        let value = 0;
        try {
            value = this.buffer.getFloat32(this.pointer, true);
            this.pointer += 4;
        } catch (e) {
            throw e;
        }
        return value;
    };

    /**
     * Reads double from the buffer
     *
     * @return {Number} Value read from buffer
     */

    public readDouble() {
        let value = 0;
        try {
            value = this.buffer.getFloat64(this.pointer, true);
            this.pointer += 8;
        } catch (e) {
            throw e;
        }
        return value;
    };

    /**
     * Reads 32-bit unsigned integers value encoded (1-5 bytes)
     *
     * @return {Number} 32-bit unsigned integer
     */

    public readEncodedU32() {
        let i = 5
            , result = 0
            , nb;

        do
            result += (nb = this.nextByte());
        while ((nb & 128) && --i);

        return result;
    };

    /**
     * Reads an encoded data from buffer and returns a
     * string using the specified character set.
     *
     * @returns {String} Decoded string
     */

    public readString() {
        let str = "";
        while (true) {
            let read = this.readUInt8();
            if (read === EOS)
                break;
            str += String.fromCharCode(read);
        }
        return str;
    };

    /**
     * Reads an encoded data from buffer and returns a
     * string using the specified character set.
     *
     * @returns {String} Decoded string
     */
    public readStringFixed(readLength: number) {
        let str = "";
        while (readLength-- > 0) {
            let read = this.readUInt8();
            if (read === EOS)
                break;
            str += String.fromCharCode(read);
        }
        return str;
    };

    /**
     * Reads RECORDHEADER from next tag in the buffer
     *
     * @return {Object} Tag code and length
     */
    public readTagCodeAndLength(): TagHeader {
        let p = this.pointer;
        let n = this.readUIntLE(16)
            , tagType = n >> 6
            , tagLength = n & RECORDHEADER_LENGTH_FULL;

        if (n === 0)
            return null;

        if (tagLength === RECORDHEADER_LENGTH_FULL)
            tagLength = this.readUIntLE(32);

        return {start: p, end: this.pointer + tagLength, code: tagType, length: tagLength, position: this.pointer};
    };

    /**
     * Reads RECORDHEADER from next tag in the buffer
     *
     * @return {Object} Tag code and length
     */

    public readAction() {
        let s = this.pointer;
        let a = this.readUInt8();
        let l = (a & 0x80) ? this.readUIntLE(16) : 0;
        let p = this.pointer;

        return {start: s, action: a, length: l, position: p};
    };

    /**
     * Reads RECT format
     *
     * @return {Rect} x, y, width and height of the RECT
     */
    public readRect(): Rect {
        this.start();

        let NBits = this.readBits(5)
            , Xmin = this.readBits(NBits, true) / 20
            , Xmax = this.readBits(NBits, true) / 20
            , Ymin = this.readBits(NBits, true) / 20
            , Ymax = this.readBits(NBits, true) / 20;

        return {
            x: Xmin,
            y: Ymin,
            width: (Xmax > Xmin ? Xmax - Xmin : Xmin - Xmax),
            height: (Ymax > Ymin ? Ymax - Ymin : Ymin - Ymax)
        };

    }

    /**
     * Sets internal pointer to the specified position;
     *
     * @param {Number} pos
     */
    public seek(pos: number) {
        this.pointer = pos % this.buffer.byteLength;
    };

    /**
     * Resets position and sets current to next Byte in buffer
     */
    public start() {
        this.current = this.nextByte();
        this.position = 1;
    };

    /**
     * Gets next Byte in the buffer and Increment internal pointer
     *
     * @return {Number} Next byte in buffer
     */

    public nextByte() {
        return this.pointer > this.buffer.byteLength ? null : this.buffer.getUint8(this.pointer++);
    };

    /**
     * Reads b bits from current byte in buffer
     *
     * @param {Number} b
     * @return {Number} Bits read from buffer
     */
    public readBits(b: number, signed: boolean = false) {
        let n = 0
            , r = 0
            , sign = signed && ++n && ((this.current >> (8 - this.position++)) & 1) ? -1 : 1;

        while (n++ < b) {
            if (this.position > 8) this.start();

            r = (r << 1) + ((this.current >> (8 - this.position++)) & 1);
        }
        return sign * r;
    };

    /**
     * Replace bytes in the ArrayBuffer with the provided bytes.
     * This slices the from `0 -> pointer` and `position_end -> bufferlength`
     * and inserts the given bytes between them.
     *
     * @return {Number} Bits read from buffer
     */
    public replaceBytes(new_bytes: any, postion_end: number) {
        let buffer1 = this.buffer_raw.slice(0, this.pointer);
        let buffer2 = new_bytes;
        let buffer3 = this.buffer_raw.slice(postion_end);

        let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength + buffer3.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        tmp.set(new Uint8Array(buffer3), buffer1.byteLength + buffer2.byteLength);

        this.buffer_raw = tmp.buffer;
        this.buffer = new DataView(this.buffer_raw);
        this.pointer = 0;
        this.position = 1;
        this.current = 0;
        this.length = this.buffer.byteLength;
    };
}

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Tag {
    pool?: string[];
    variables?: any;
    header?: TagHeader;
    doInclude?: boolean;
    data?: ArrayBufferLike
    audio_bytes?: number;
}

export interface TagHeader {
    start: number;
    end: number;
    code: number;
    length: number;
    position: number;
}