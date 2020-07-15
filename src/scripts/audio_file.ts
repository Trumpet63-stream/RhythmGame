import {WebAudioHelper, WebAudioState} from "./web_audio_helper";

export enum AudioFileState {
    NO_AUDIO_FILE,
    DONE_READING,
    BUFFERED,
    ERROR,
}

export class AudioFile {
    private readonly state: AudioFileState;
    public file: File;
    public blob: Blob;
    private webAudioHelper: WebAudioHelper;

    public constructor() {
        this.state = AudioFileState.NO_AUDIO_FILE;
        this.webAudioHelper = new WebAudioHelper();
    }

    public getState() {
        switch (this.webAudioHelper.state) {
            case WebAudioState.NO_AUDIO_FILE:
                return AudioFileState.NO_AUDIO_FILE;
            case WebAudioState.DONE_READING:
                return AudioFileState.DONE_READING;
            case WebAudioState.BUFFERED:
                return AudioFileState.BUFFERED;
            case WebAudioState.ERROR:
                return AudioFileState.ERROR;
        }
    }

    public loadFile(file: File) {
        this.file = file;
        this.webAudioHelper.loadFile(this.file);
    }

    public loadBlob(blob: Blob) {
        this.blob = blob;
        this.webAudioHelper.loadBlob(this.blob);
    }

    public getDuration(): number | undefined {
        return this.webAudioHelper.getDuration();
    }

    public play(delayInSeconds: number = 0) {
        this.webAudioHelper.play(delayInSeconds);
    }

    public stop() {
        this.webAudioHelper.stop();
    }

    public getCurrentTimeInSeconds(): number {
        return this.webAudioHelper.getCurrentTimeInSeconds();
    }

    public reset() {
        this.webAudioHelper.reset();
    }
}
