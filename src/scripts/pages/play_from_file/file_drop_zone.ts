import * as Dropzone from "dropzone";
import {DOMWrapper} from "../../dom_wrapper";
import {setElementCenterPositionRelative, setElementClasses} from "../../ui_util";
import * as p5 from "p5";
import {global} from "../../index";
import {PlayFromFile} from "./play_from_file";
import {Stepfile} from "../../stepfile";
import {AudioFile} from "../../audio/audio_file";

export abstract class FileDropZone {
    private static readonly PREVIEW_TEMPLATE: string = '<div></div>';
    private static readonly MESSAGE: string = "Drop files here or use the buttons below"
    private static DROPZONE_CONFIG: any = {
        url: FileDropZone.getUrl,
        acceptedFiles: ".sm,.mp3,.ogg",
        uploadMultiple: true,
        maxFilesize: null,
        previewTemplate: FileDropZone.PREVIEW_TEMPLATE,
        createImageThumbnails: false,
        clickable: false,
        accept: FileDropZone.onFileAccept.bind(FileDropZone),
        error: FileDropZone.onError,
        dictDefaultMessage: FileDropZone.MESSAGE
    }
    private static dropzone: Dropzone;
    private static width: number = 650;
    private static height: number = 60;
    private static stepfile: Stepfile;
    private static audioFile: AudioFile;
    private static acceptedAudioFile = false;
    private static acceptedStepfile = false;

    public static create(stepfile: Stepfile, audioFile: AudioFile) {
        let p: p5 = global.p5Scene.sketchInstance;

        let div = DOMWrapper.create(() => {
            return p.createDiv();
        }, "div");
        if (!div.alreadyExists) {
            this.stepfile = stepfile;
            this.audioFile = audioFile;
            this.styleDropzone(div.element);
            div.element.id("my-div");
            let divSelector = "#" + div.element.id();
            this.configureDropzone(divSelector);
        }
    }

    private static styleDropzone(element: p5.Element) {
        setElementCenterPositionRelative(element, 0.5, 0.2, this.width, this.height);
        setElementClasses(element, global.globalClass, "dropzone");
        element.style("width: " + this.width + "px; height: " + this.height + "px;");
    }

    private static configureDropzone(dropzoneSelector: string) {
        // @ts-ignore
        Dropzone.autoDiscover = false;
        this.DROPZONE_CONFIG.hiddenInputContainer = dropzoneSelector;
        this.dropzone = new Dropzone(dropzoneSelector, this.DROPZONE_CONFIG);
        this.dropzone.on("drop", this.resetAcceptedFilesCounters.bind(this));
    }

    private static getUrl(files: any) {
        return "#";
    }

    private static onFileAccept(file: Dropzone.DropzoneFile, done: (error?: (string | Error)) => void) {
        if (this.isStepfile(file) && !this.acceptedStepfile) {
            this.handleAddStepfile(file);
        } else if (!this.acceptedAudioFile) {
            this.handleAddAudioFile(file);
        }
        this.dropzone.removeFile(file);
        done();
    }

    private static isStepfile(file: Dropzone.DropzoneFile) {
        let fileExtension = this.getFileExtension(file.name);
        return fileExtension.toLowerCase() === "sm";
    }

    private static getFileExtension(fileName: string) {
        return fileName.split(".").pop()
    }

    private static handleAddStepfile(file: Dropzone.DropzoneFile) {
        this.acceptedStepfile = true;
        this.stepfile.loadFile(file);
        PlayFromFile.resetModeOptions();
    }

    private static handleAddAudioFile(file: Dropzone.DropzoneFile) {
        this.acceptedAudioFile = true;
        this.audioFile.loadFile(file);
    }

    private static onError(file: Dropzone.DropzoneFile, message: string | Error, xhr: XMLHttpRequest) {
        // @ts-ignore
        (<Dropzone>this).removeFile(file);
    }

    private static resetAcceptedFilesCounters() {
        this.acceptedAudioFile = false;
        this.acceptedStepfile = false;
    }
}
