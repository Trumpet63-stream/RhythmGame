import * as p5 from "p5";

import {NoteManager} from "./note_manager";
import {ScrollDirection} from "./scroll_direction";
import {Note, NoteState, NoteType} from "./stepfile";
import {global} from "./index";
import {DefaultNoteSkin} from "./default_note_skin";
import {Rectangle} from "./rectangle";
import {NoteSkin} from "./note_skin";
import {Point2D} from "./point_2d";

class NoteDisplay {
    private readonly centerX: number;
    private readonly centerY: number;
    public noteType: NoteType;
    private readonly noteSize: number;
    private readonly trackNumber: number;
    private readonly numTracks: number;
    private readonly beatFraction: number;

    constructor(centerX: number, centerY: number, noteType: NoteType, noteSize: number, trackNumber: number,
                numTracks: number, beatFraction: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.noteType = noteType;
        this.noteSize = noteSize;
        this.trackNumber = trackNumber;
        this.numTracks = numTracks;
        this.beatFraction = beatFraction;
    }

    draw() {
        let isNoteDrawSuccessful = (<NoteSkin>global.noteSkin).drawNote({
            trackNumber: this.trackNumber,
            numTracks: this.numTracks,
            center: new Point2D(this.centerX, this.centerY),
            noteType: this.noteType,
            noteSize: this.noteSize,
            beatFraction: this.beatFraction
        });
        if (!isNoteDrawSuccessful) {
            DefaultNoteSkin.drawNote(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteType,
                this.noteSize);
        }
    }
}

class HoldConnector {
    private readonly centerX: number;
    private readonly drawStartY: number;
    private readonly drawEndY: number;
    private readonly noteStartY: number;
    private readonly noteEndY: number;
    private readonly noteSize: number;

    constructor(centerX: number, drawStartY: number, drawEndY: number, noteStartY: number, noteEndY: number, noteSize: number) {
        this.centerX = centerX;
        this.drawStartY = drawStartY;
        this.drawEndY = drawEndY;
        this.noteStartY = noteStartY;
        this.noteEndY = noteEndY;
        this.noteSize = noteSize;
    }

    draw() {
        let isConnectorDrawSuccessful = (<NoteSkin>global.noteSkin).drawHoldConnector(this.centerX, this.drawStartY, this.drawEndY,
            this.noteStartY, this.noteEndY, this.noteSize);
        if (!isConnectorDrawSuccessful) {
            DefaultNoteSkin.drawHoldConnector(this.centerX, this.drawStartY, this.drawEndY, this.noteSize);
        }
    }
}

class Receptor {
    private readonly centerX: number;
    private readonly centerY: number;
    private readonly noteSize: number
    private readonly trackNumber: number;
    private readonly numTracks: number;

    constructor(centerX: number, centerY: number, noteSize: number, trackNumber: number,
                numTracks: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.noteSize = noteSize;
        this.trackNumber = trackNumber;
        this.numTracks = numTracks;
    }

    draw() {
        let isReceptorDrawSuccessful = (<NoteSkin>global.noteSkin).drawReceptor(this.trackNumber, this.numTracks, this.centerX,
            this.centerY, this.noteSize);
        if (!isReceptorDrawSuccessful) {
            DefaultNoteSkin.drawReceptor(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteSize);
        }
    }
}

/* A set of options that intersect with the user Config, but are expected to be changed during play */
export interface DisplayConfig {
    getNoteSize: () => number;
    getNoteSpacing: () => number;
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
    private readonly sketchInstance: p5;
    private bounds: Rectangle;

    constructor(noteManager: NoteManager, displayConfig: DisplayConfig, sketchInstance: p5, bounds: Rectangle) {
        this.displayConfig = displayConfig;
        this.noteManager = noteManager;
        this.currentTimeInSeconds = 0;
        this.sketchInstance = sketchInstance;
        this.bounds = bounds;
    }

    draw(currentTimeInSeconds: number) {
        let p: p5 = this.sketchInstance;
        p.push();
        p.fill("black");
        this.currentTimeInSeconds = currentTimeInSeconds;
        p.rect(this.bounds.topLeftX, this.bounds.topLeftY, this.bounds.width, this.bounds.height);
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
        if (note.state === NoteState.DEFAULT) {
            let x = this.getNoteCenterX(trackNumber, numTracks);
            let y = this.getNoteCenterY(note.timeInSeconds, currentTime);
            new NoteDisplay(x, y, note.type, this.displayConfig.getNoteSize(), trackNumber, numTracks, note.beatFraction).draw();
        }
    }

    private getLeastTime(currentTime: number) {
        let totalDisplaySeconds = this.bounds.height / this.displayConfig.getPixelsPerSecond();
        return currentTime - this.displayConfig.getReceptorYPercent() / 100 * totalDisplaySeconds;
    }

    private getGreatestTime(currentTime: number) {
        let totalDisplaySeconds = this.bounds.height / this.displayConfig.getPixelsPerSecond();
        return currentTime + (1 - this.displayConfig.getReceptorYPercent() / 100) * totalDisplaySeconds;
    }

    public getNoteCenterX(trackNumber: number, numTracks: number) {
        let noteSpacing: number = this.displayConfig.getNoteSpacing();
        let noteSize: number = this.displayConfig.getNoteSize();
        let totalSize: number = numTracks * noteSize + (numTracks - 1) * noteSpacing;
        let width: number = this.bounds.width;
        let startX: number = this.bounds.topLeftX;
        return (trackNumber + 0.5) * noteSize + trackNumber * noteSpacing + (width - totalSize) / 2 + startX;
    }

    // This essentially defines a conversion from seconds to pixels
    public getNoteCenterY(noteTimeInSeconds: number, currentTimeInSeconds: number) {
        let noteYOffset = this.displayConfig.getPixelsPerSecond() * (noteTimeInSeconds - currentTimeInSeconds);
        let receptorYOffset = this.displayConfig.getReceptorYPercent() / 100 * this.bounds.height;
        if (this.displayConfig.getScrollDirection() === ScrollDirection.Up) {
            return receptorYOffset + noteYOffset + this.bounds.topLeftY;
        } else {
            return this.bounds.height - (receptorYOffset + noteYOffset) + this.bounds.topLeftY;
        }
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
                    if (startNote !== undefined && endNote !== undefined) {
                        if ((startNote.state === NoteState.DEFAULT || startNote.state === NoteState.HELD) &&
                            endNote.state === NoteState.DEFAULT) {
                            this.drawConnector(startNote, endNote, trackNumber, numTracks, currentTime);
                        }
                    }
                }
            } else {
                if (noteStack.length === 0) {
                    break;
                }
                if (currentNote.type === NoteType.HOLD_HEAD || currentNote.type === NoteType.ROLL_HEAD) {
                    noteStack.push(currentNote);
                } else if (currentNote.type === NoteType.TAIL) {
                    let startNote = noteStack.pop();
                    let endNote = currentNote;
                    if (startNote !== undefined && endNote !== undefined) {
                        if ((startNote.state === NoteState.DEFAULT || startNote.state === NoteState.HELD) &&
                            endNote.state === NoteState.DEFAULT) {
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
        if (startNote.state === NoteState.HELD) {
            drawStartY = this.getNoteCenterY(Math.min(currentTime, endNote.timeInSeconds), currentTime);
        } else {
            drawStartY = noteStartY;
        }
        drawStartY = this.clampValueToRange(drawStartY, this.bounds.topLeftY, this.bounds.topLeftY + this.bounds.height);

        let drawEndY = noteEndY
        drawEndY = this.clampValueToRange(drawEndY, this.bounds.topLeftY, this.bounds.topLeftY + this.bounds.height);

        new HoldConnector(centerX, drawStartY, drawEndY, noteStartY, noteEndY, this.displayConfig.getNoteSize()).draw();
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
            let noteCenterX: number = this.getNoteCenterX(i, numTracks);
            let noteCenterY: number = this.getNoteCenterY(this.currentTimeInSeconds, this.currentTimeInSeconds);
            let noteSize: number = this.displayConfig.getReceptorSizes()[i];
            new Receptor(noteCenterX, noteCenterY, noteSize, i, numTracks).draw();
        }
    }
}
