export enum AudioFileState {
    NO_AUDIO_FILE,
    DONE_READING,
    BUFFERED,
    ERROR,
}

export interface AudioFile {
    source: File | Blob;
    getState(): AudioFileState;
    loadFile(file: File): void;
    loadBlob(blob: Blob): void;
    getDuration(): number | undefined;
    play(delayInSeconds: number): void;
    stop(): void;
    getCurrentTimeInSeconds(): number;
    reset(): void;
    getName(): string;
}
