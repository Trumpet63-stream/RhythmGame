/**
 * Collection of SWF tags and tag types to assist with reading and parsing a .swf file.
 *
 * File contents originally from:
 * @author: Velocity
 * @github: https://github.com/flashflashrevolution/web-beatbox-editor
 */

export abstract class SWFTags {
    public static END: number = 0;
    public static SHOWFRAME: number = 1;
    public static DOACTION: number = 12;
    public static DEFINESOUND: number = 14;
    public static STREAMHEAD: number = 18;
    public static STREAMBLOCK: number = 19;
    public static STREAMHEAD2: number = 45;
    public static FILEATTRIBUTES: number = 69;
}

export abstract class SWFActionTags {
    public static END: number = 0;
    public static CONSTANTPOOL: number = 0x88;
    public static PUSH: number = 0x96;
    public static POP: number = 0x17;
    public static DUPLICATE: number = 0x4C;
    public static STORE_REGISTER: number = 0x87;
    public static GET_VARIABLE: number = 0x1C;
    public static SET_VARIABLE: number = 0x1D;
    public static INIT_ARRAY: number = 0x42;
    public static GET_MEMBER: number = 0x4E;
    public static SET_MEMBER: number = 0x4F;
}

export abstract class SWFTypeTags {
    public static STRING_LITERAL: number = 0;
    public static FLOAT_LITERAL: number = 1;
    public static NULL: number = 2;
    public static UNDEFINED: number = 3;
    public static REGISTER: number = 4;
    public static BOOLEAN: number = 5;
    public static DOUBLE: number = 6;
    public static INTEGER: number = 7;
    public static CONSTANT8: number = 8;
    public static CONSTANT16: number = 9;
}

export abstract class SWFOtherTags {
    public static CODEC_MP3: number = 2;
}
