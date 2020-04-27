import * as p5 from "p5";

export enum AudioFileState {
    NO_AUDIO_FILE,
    DONE_READING,
    BUFFERED,
}

export class AudioFile {
    public state: AudioFileState;
    public file: File;
    public audioSource: AudioBufferSourceNode;
    public audioContext: AudioContext;

    public constructor() {
        this.state = AudioFileState.NO_AUDIO_FILE;
    }

    public load(file: p5.File) {
        this.file = file.file; // this unwraps the p5.File wrapper to get the original DOM file
        loadSoundFile(this.file, ((onFileRead: ProgressEvent<FileReader>) => {
            this.state = AudioFileState.DONE_READING;
            // @ts-ignore
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioSource = this.audioContext.createBufferSource();
            this.audioContext.decodeAudioData(<ArrayBuffer>onFileRead.target.result).then(((buffer: AudioBuffer) => {
                    this.audioSource.buffer = buffer;
                    this.audioSource.connect(this.audioContext.destination);
                    this.state = AudioFileState.BUFFERED;
                }),
                (e: any) => {
                    console.log("Error with decoding audio data" + e.err);
                });
        }));
    }

    public getDuration(): number | undefined {
        if (this.state === AudioFileState.BUFFERED) {
            return this.audioSource.buffer.duration;
        }
        return undefined;
    }

    public play(delayInSeconds: number = 0) {
        this.audioSource.start(this.audioContext.currentTime + delayInSeconds);
    }

    public stop() {
        this.audioSource.stop(0);
    }
}

function loadSoundFile(
    file: File,
    listener: (event: ProgressEvent<FileReader>) => any,
    options?: boolean | AddEventListenerOptions
) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.addEventListener("loadend", listener, options);
}