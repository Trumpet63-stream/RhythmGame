export enum AudioFileState {
    NO_AUDIO_FILE,
    DONE_READING,
    BUFFERED,
    ERROR,
}

export abstract class AudioFile {
    public source: File | Blob;
    protected state: AudioFileState;

    public constructor() {
        this.state = AudioFileState.NO_AUDIO_FILE;
    }

    public getState(): AudioFileState {
        return this.state;
    }

    abstract loadFile(file: File): void;

    abstract loadBlob(blob: Blob): void;

    abstract getDuration(): number | undefined;

    abstract play(delayInSeconds: number): void;

    abstract stop(): void;

    abstract getCurrentTimeInSeconds(): number;

    abstract reset(): void;

    public getName(): string {
        if (this.source instanceof File) {
            return this.source.name;
        }
        throw new Error("called getName() but name does not exist on Blob");
    }
}
