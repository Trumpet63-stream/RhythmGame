
export enum WebAudioState {
    NO_AUDIO_FILE,
    DONE_READING,
    BUFFERED,
    ERROR,
}

export class WebAudioHelper {
    public state: WebAudioState;
    public file: File;
    public blob: Blob;
    public audioSource: AudioBufferSourceNode;
    public audioContext: AudioContext;
    public audioBuffer: AudioBuffer;
    private playStartTime: number;

    public constructor() {
        this.state = WebAudioState.NO_AUDIO_FILE;
    }

    public loadFile(file: File) {
        this.file = file;
        this.loadAudioData(this.file);
    }

    public loadBlob(blob: Blob) {
        this.blob = blob;
        this.loadAudioData(this.blob);
    }

    public getDuration(): number | undefined {
        if (this.state === WebAudioState.BUFFERED) {
            return this.audioSource.buffer.duration;
        }
        return undefined;
    }

    public play(delayInSeconds: number = 0) {
        let currentTime = this.audioContext.currentTime;
        this.playStartTime = currentTime;
        this.audioSource.start(currentTime + delayInSeconds);
    }

    public stop() {
        this.audioSource.stop(0);
        this.state = WebAudioState.DONE_READING;
        this.recreateSourceNode();
    }

    public getCurrentTimeInSeconds(): number {
        return this.audioContext.currentTime - this.playStartTime;
    }

    private loadAudioData(audioData: File | Blob) {
        this.loadSoundFile(audioData, ((onFileRead: ProgressEvent<FileReader>) => {
            this.state = WebAudioState.DONE_READING;
            // @ts-ignore
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioSource = this.audioContext.createBufferSource();
            this.decodeAudioData(<ArrayBuffer>onFileRead.target.result);
        }));
    }

    private decodeAudioData(audioData: ArrayBuffer) {
        this.audioContext.decodeAudioData(audioData)
            .then(((buffer: AudioBuffer) => {
                this.audioBuffer = buffer;
                this.audioSource.buffer = buffer;
                this.audioSource.connect(this.audioContext.destination);
                this.state = WebAudioState.BUFFERED;
            }),
            (e: any) => {
                console.log("Error with decoding audio data" + e.err);
                this.state = WebAudioState.ERROR;
            });
    }

    private recreateSourceNode() {
        this.audioSource = this.audioContext.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;
        this.audioSource.connect(this.audioContext.destination);
        this.state = WebAudioState.BUFFERED;
    }

    private loadSoundFile(
        file: Blob | File,
        listener: (event: ProgressEvent<FileReader>) => any,
        options?: boolean | AddEventListenerOptions
    ) {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.addEventListener("loadend", listener, options);
    }

    public reset() {
        this.state = WebAudioState.NO_AUDIO_FILE;
        this.file = undefined;
        this.blob = undefined;
    }
}
