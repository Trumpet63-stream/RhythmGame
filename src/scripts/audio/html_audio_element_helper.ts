import {AudioFile, AudioFileState} from "./audio_file";

export class HtmlAudioElementHelper implements AudioFile{
    public state: AudioFileState;
    public source: File | Blob;
    private audioElement: HTMLAudioElement;
    private sourceUrl: string;

    public constructor() {
        this.state = AudioFileState.NO_AUDIO_FILE;
    }

    public getState() {
        return this.state;
    }

    public loadFile(file: File) {
        this.source = file;
        this.loadSource();
    }

    public loadBlob(blob: Blob) {
        this.source = blob;
        this.loadSource();
    }

    private loadSource() {
        this.sourceUrl = this.getSourceUrl();
        this.audioElement = new Audio(this.sourceUrl);
        this.state = AudioFileState.DONE_READING;
        this.audioElement.addEventListener('canplaythrough', function() {
            this.state = AudioFileState.BUFFERED;
        }.bind(this));
    }

    private getSourceUrl(): string {
        return URL.createObjectURL(this.source);
    }

    private releaseSourceUrl() {
        URL.revokeObjectURL(this.sourceUrl);
        this.sourceUrl = undefined;
    }

    public getDuration(): number | undefined {
        if (this.audioElement !== undefined) {
            return this.audioElement.duration
        }
        return undefined;
    }

    public play(delayInSeconds: number = 0) {
        setTimeout(this.audioElement.play.bind(this.audioElement), delayInSeconds * 1000);
    }

    public stop() {
        this.audioElement.pause();
        this.state = AudioFileState.BUFFERED;
        this.audioElement.load();
    }

    public getCurrentTimeInSeconds(): number {
        return this.audioElement.currentTime;
    }

    public reset() {
        this.releaseSourceUrl();
        this.source = undefined;
    }

    public getName(): string {
        if (this.source instanceof File) {
            return this.source.name;
        }
        throw "Error: called getName() but name does not exist on Blob";
    }
}