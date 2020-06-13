import * as p5 from "p5";

import {NoteManager} from "./note_manager";
import {ScrollDirection} from "./scroll_direction";
import {Note, NoteState, NoteType} from "./parsing/parse_sm";
import {Config} from "./config";
import {global} from "./index";
import {DefaultNoteSkin} from "./default_note_skin";

class NoteDisplay {
    centerX: number;
    centerY: number;
    noteType: NoteType;
    private sketchInstance: p5;
    private noteSize: number;
    private trackNumber: number;
    private numTracks: number;

    constructor(centerX: number, centerY: number, noteType: NoteType, sketchInstance: p5, noteSize: number,
                trackNumber: number, numTracks: number) {
        this.sketchInstance = sketchInstance;
        this.centerX = centerX;
        this.centerY = centerY;
        this.noteType = noteType;
        this.noteSize = noteSize;
        this.trackNumber = trackNumber;
        this.numTracks = numTracks;
    }

    draw() {
        let isNoteDrawSuccessful = global.noteSkin.drawNote(this.trackNumber, this.numTracks, this.centerX,
            this.centerY, this.noteType, this.noteSize);
        if (!isNoteDrawSuccessful) {
            DefaultNoteSkin.drawNote(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteType,
                this.noteSize);
        }
    }
}

class HoldConnector {
    centerX: number;
    startY: number;
    endY: number;
    noteStartY: number;
    noteEndY: number;
    private sketchInstance: p5;

    constructor(centerX: number, startY: number, endY: number, noteStartY: number, noteEndY: number, sketchInstance: p5) {
        this.sketchInstance = sketchInstance;
        this.centerX = centerX;
        this.startY = startY;
        this.endY = endY;
        this.noteStartY = noteStartY;
        this.noteEndY = noteEndY;
    }

    draw() {
        let isConnectorDrawSuccessful = global.noteSkin.drawHoldConnector(this.centerX, this.startY, this.endY,
            this.noteStartY, this.noteEndY);
        if (!isConnectorDrawSuccessful) {
            DefaultNoteSkin.drawHoldConnector(this.centerX, this.startY, this.endY);
        }
    }
}

class Receptor {
    centerX: number;
    centerY: number;
    private sketchInstance: p5;
    private noteSize: number
    private trackNumber: number;
    private numTracks: number;

    constructor(centerX: number, centerY: number, sketchInstance: p5, noteSize: number, trackNumber: number,
                numTracks: number) {
        this.sketchInstance = sketchInstance;
        this.centerX = centerX;
        this.centerY = centerY;
        this.noteSize = noteSize;
        this.trackNumber = trackNumber;
        this.numTracks = numTracks;
    }

    draw() {
        let isReceptorDrawSuccessful = global.noteSkin.drawReceptor(this.trackNumber, this.numTracks, this.centerX,
            this.centerY, this.noteSize);
        if (!isReceptorDrawSuccessful) {
            DefaultNoteSkin.drawReceptor(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteSize);
        }
    }
}

// export class DisplayConfig {
//     public noteSize: number;
//     public pixelsPerSecond: number;
//     public receptorYPercent: number;
//     public scrollDirection: ScrollDirection;
//     public receptorSizes: number[];
//
//     constructor(config: Config, numTracks: number) {
//         this.noteSize = config.noteSize;
//         this.pixelsPerSecond = config.pixelsPerSecond;
//         this.receptorYPercent = config.receptorYPercent;
//         this.scrollDirection = config.scrollDirection;
//         this.receptorSizes = [];
//         for (let i = 0; i < numTracks; i++) {
//             this.receptorSizes.push(config.noteSize);
//         }
//     }
// }

/* A set of options that intersect with the user Config, but are expected to be changed during play */
export interface DisplayConfig {
    getNoteSize: () => number;
    getPixelsPerSecond: () => number;
    getReceptorYPercent: () => number;
    getScrollDirection: () => ScrollDirection;
    getReceptorSizes: () => number[];
    setReceptorSize: (trackNumber: number, receptorSize: number) => void;
}

export class DisplayManager {
    private displayConfig: DisplayConfig;
    private noteManager: NoteManager;
    private currentTimeInSeconds: number;
    private sketchInstance: p5;
    private topLeftX: number;
    private topLeftY: number;
    private width: number;
    private height: number;

    constructor(noteManager: NoteManager, displayConfig: DisplayConfig, sketchInstance: p5, topLeftX: number = 0,
                topLeftY: number = 0, width: number = 180, height: number = 400) {
        this.displayConfig = displayConfig;
        this.noteManager = noteManager;
        this.currentTimeInSeconds = 0;
        this.sketchInstance = sketchInstance;
        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;
        this.width = width;
        this.height = height;
    }

    draw(currentTimeInSeconds: number) {
        let p: p5 = this.sketchInstance;
        p.push();
        p.fill("black");
        this.currentTimeInSeconds = currentTimeInSeconds;
        this.sketchInstance.rect(this.topLeftX, this.topLeftY, this.width, this.height);
        this.drawNotesAndConnectors();
        this.drawReceptors();
        p.pop();
    }

    private drawNotesAndConnectors() {
        let leastTime = this.getLeastTime(this.currentTimeInSeconds);
        let greatestTime = this.getGreatestTime(this.currentTimeInSeconds);
        this.drawAllConnectors(leastTime, greatestTime);
        this.drawAllNotes(leastTime, greatestTime);
    }

    private drawAllNotes(leastTime: number, greatestTime: number) {
        let numTracks = this.noteManager.tracks.length;
        for (let i = 0; i < numTracks; i++) {
            this.drawNotesInTrack(leastTime, greatestTime, i, numTracks, this.currentTimeInSeconds);
        }
    }

    private drawNotesInTrack(leastTime: number, greatestTime: number, trackNumber: number,
                             numTracks: number, currentTime: number) {
        let noteIndexRange = this.noteManager.getNotesByTimeRange(leastTime, greatestTime, trackNumber);
        let notes = this.noteManager.tracks[trackNumber].slice(noteIndexRange.startIndex, noteIndexRange.endIndexNotInclusive);
        for (let i = 0; i < notes.length; i++) {
            this.drawNote(notes[i], trackNumber, numTracks, currentTime);
        }
    }

    private drawNote(note: Note, trackNumber: number, numTracks: number, currentTime: number) {
        if (note.state == NoteState.DEFAULT) {
            let x = this.getNoteCenterX(trackNumber, numTracks);
            let y = this.getNoteCenterY(note.timeInSeconds, currentTime);
            new NoteDisplay(x, y, note.type, this.sketchInstance, this.displayConfig.getNoteSize(), trackNumber, numTracks).draw();
        }
    }

    private getLeastTime(currentTime: number) {
        let totalDisplaySeconds = this.getDisplayHeight() / this.displayConfig.getPixelsPerSecond();
        return currentTime - this.displayConfig.getReceptorYPercent() / 100 * totalDisplaySeconds;
    }

    private getGreatestTime(currentTime: number) {
        let totalDisplaySeconds = this.getDisplayHeight() / this.displayConfig.getPixelsPerSecond();
        return currentTime + (1 - this.displayConfig.getReceptorYPercent() / 100) * totalDisplaySeconds;
    }

    public getNoteCenterX(trackNumber: number, numTracks: number) {
        let receptorSpacing = this.getDisplayWidth() / numTracks - this.displayConfig.getNoteSize();
        return (2 * trackNumber + 1) / 2 * (this.displayConfig.getNoteSize() + receptorSpacing) + this.topLeftX;
    }

    // This essentially defines a conversion from seconds to pixels
    public getNoteCenterY(noteTimeInSeconds: number, currentTimeInSeconds: number) {
        let noteYOffset = this.displayConfig.getPixelsPerSecond() * (noteTimeInSeconds - currentTimeInSeconds);
        let receptorYOffset = this.displayConfig.getReceptorYPercent() / 100 * this.getDisplayHeight();
        if (this.displayConfig.getScrollDirection() == ScrollDirection.Up) {
            return receptorYOffset + noteYOffset + this.topLeftY;
        } else {
            return this.getDisplayHeight() - (receptorYOffset + noteYOffset) + this.topLeftY;
        }
    }

    private getDisplayWidth(): number {
        return this.width;
    }

    private getDisplayHeight(): number {
        return this.height;
    }

    private drawAllConnectors(leastTime: number, greatestTime: number) {
        let tracks = this.noteManager.tracks;
        for (let i = 0; i < tracks.length; i++) {
            this.drawAllTrackConnectors(leastTime, greatestTime, tracks[i], i,
                tracks.length, this.currentTimeInSeconds);
        }
    }

    private drawAllTrackConnectors(leastTime: number, greatestTime: number, track: Note[], trackNumber: number,
                                   numTracks: number, currentTime: number) {
        let noteStack: Note[] = [];
        for (let i = 0; i < track.length; i++) {
            let currentNote: Note = track[i];
            if (currentNote.timeInSeconds < leastTime) {
                if (currentNote.type === NoteType.HOLD_HEAD || currentNote.type === NoteType.ROLL_HEAD) {
                    noteStack.push(currentNote);
                } else if (currentNote.type === NoteType.TAIL) {
                    noteStack.pop();
                }
            } else if (currentNote.timeInSeconds < greatestTime) {
                if (currentNote.type === NoteType.HOLD_HEAD || currentNote.type === NoteType.ROLL_HEAD) {
                    noteStack.push(currentNote);
                } else if (currentNote.type === NoteType.TAIL) {
                    let startNote = noteStack.pop();
                    let endNote = currentNote;
                    if (startNote != undefined && endNote != undefined) {
                        if ((startNote.state == NoteState.DEFAULT || startNote.state == NoteState.HELD) &&
                            endNote.state == NoteState.DEFAULT) {
                            this.drawConnector(startNote, endNote, trackNumber, numTracks, currentTime);
                        }
                    }
                }
            } else {
                if (noteStack.length == 0) {
                    break;
                }
                if (currentNote.type === NoteType.HOLD_HEAD || currentNote.type === NoteType.ROLL_HEAD) {
                    noteStack.push(currentNote);
                } else if (currentNote.type === NoteType.TAIL) {
                    let startNote = noteStack.pop();
                    let endNote = currentNote;
                    if (startNote != undefined && endNote != undefined) {
                        if ((startNote.state == NoteState.DEFAULT || startNote.state == NoteState.HELD) &&
                            endNote.state == NoteState.DEFAULT) {
                            this.drawConnector(startNote, endNote, trackNumber, numTracks, currentTime);
                        }
                    }
                }
            }
        }
    }

    private drawConnector(startNote: Note, endNote: Note, trackNumber: number, numTracks: number, currentTime: number) {
        let centerX = this.getNoteCenterX(trackNumber, numTracks);
        let noteStartY = this.getNoteCenterY(startNote.timeInSeconds, currentTime);
        let noteEndY = this.getNoteCenterY(endNote.timeInSeconds, currentTime);

        let drawStartY;
        if (startNote.state == NoteState.HELD) {
            drawStartY = this.getNoteCenterY(Math.min(currentTime, endNote.timeInSeconds), currentTime);
        } else {
            drawStartY = noteStartY;
        }
        drawStartY = this.clampValueToRange(drawStartY, this.topLeftY, this.topLeftY + this.height);

        let drawEndY = noteEndY
        drawEndY = this.clampValueToRange(drawEndY, this.topLeftY, this.topLeftY + this.height);

        new HoldConnector(centerX, drawStartY, drawEndY, noteStartY, noteEndY, this.sketchInstance).draw();
    }

    private clampValueToRange(value: number, lowerBound: number, upperBound: number): number {
        if (value < lowerBound) {
            return lowerBound;
        }
        if (value > upperBound) {
            return upperBound;
        }
        return value;
    }

    private drawReceptors() {
        let numTracks = this.noteManager.tracks.length;
        for (let i = 0; i < numTracks; i++) {
            new Receptor(this.getNoteCenterX(i, numTracks), this.getNoteCenterY(this.currentTimeInSeconds, this.currentTimeInSeconds),
                this.sketchInstance, this.displayConfig.getReceptorSizes()[i], i, numTracks).draw();
        }
    }
}
