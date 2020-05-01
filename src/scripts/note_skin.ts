import * as p5 from "p5";
import {global} from "./index";
import {NoteType} from "./parsing";

export class NoteSkin {
    public note: p5.Image;
    public connectorTile: p5.Image;
    private rotationAngles: Map<number, number[]> = new Map([
        [4, [270, 180, 0, 90]],
        [6, [270, 315, 180, 0, 45, 90]]
    ]);
    private first = true;

    constructor(note: p5.Image, connector: p5.Image) {
        this.note = note;
        this.connectorTile = connector;
    }

    // Returns true if able to draw note type, otherwise returns false
    public drawNote(trackNumber: number, numTracks: number, centerX: number, centerY: number, noteType: NoteType): boolean {
        switch (noteType) {
            case NoteType.NORMAL:
            case NoteType.HOLD_HEAD:
                this.drawNoteRotated(trackNumber, numTracks, centerX, centerY);
                break;
            default:
                return false;
        }
        return true;
    }

    // Returns true if able to draw note type, otherwise returns false
    public drawReceptor(trackNumber: number, numTracks: number, centerX: number, centerY: number): boolean {
        this.drawNoteRotated(trackNumber, numTracks, centerX, centerY);
        return true;
    }

    // Returns true if able to draw note type, otherwise returns false
    public drawHoldConnector(centerX: number, startY: number, endY: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        let noteSize = global.config.noteSize;
        let sourceWidth = this.connectorTile.width;
        let sourceHeight = this.connectorTile.height;
        let scaledWidth = noteSize;
        let scaledHeight = scaledWidth / sourceWidth * sourceHeight;
        let connectorHeight = endY - startY;
        let numCompleteTiles = Math.floor(connectorHeight / scaledHeight);
        let remainderHeight = connectorHeight - scaledHeight * numCompleteTiles;
        let remainderHeightPercent = remainderHeight / scaledHeight;
        if (this.first) {
            console.log(sourceWidth + ", " + sourceHeight);
            console.log(scaledWidth + ", " + scaledHeight);
            this.first = false;
        }

        for (let i = 0; i < numCompleteTiles; i++) {
            p.image(this.connectorTile, centerX - noteSize / 2, startY + i * scaledHeight, scaledWidth,
                scaledHeight);
        }

        p.image(this.connectorTile, centerX - noteSize / 2, startY + numCompleteTiles * scaledHeight,
            scaledWidth, scaledHeight, 0, 0, sourceWidth, remainderHeightPercent * sourceHeight);

        return true;
    }


    private drawNoteRotated(trackNumber: number, numTracks: number, centerX: number, centerY: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        let noteSize = global.config.noteSize;
        p.push();
        p.angleMode(p.DEGREES);
        p.translate(centerX, centerY);
        this.rotate(p, trackNumber, numTracks);
        p.image(this.note, -noteSize / 2, -noteSize / 2, noteSize, noteSize);
        p.pop();
    }

    private rotate(p: p5, trackNumber: number, numTracks: number) {
        if (this.rotationAngles.has(numTracks)) {
            p.rotate(this.rotationAngles.get(numTracks)[trackNumber]);
        } else {
            p.rotate(this.getDefaultRotationAngleInDegrees(trackNumber, numTracks));
        }
    }

    private getDefaultRotationAngleInDegrees(trackNumber: number, numTracks: number) {
        let rotation = -90;
        let rotationPerTrack = 360 / numTracks;
        if (trackNumber < numTracks / 2) {
            rotation -= trackNumber * rotationPerTrack;
        } else {
            rotation += (trackNumber - numTracks / 2 + 1) * rotationPerTrack;
        }
        return rotation;
    }
}