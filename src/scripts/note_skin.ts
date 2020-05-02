import * as p5 from "p5";
import {global} from "./index";
import {NoteType} from "./parsing";
import {ScrollDirection} from "./scroll_direction";

export class NoteSkin {
    public note: p5.Image;
    public connectorTile: p5.Image;
    private rotationAngles: Map<number, number[]> = new Map([
        [4, [270, 180, 0, 90]],
        [6, [270, 315, 180, 0, 45, 90]]
    ]);

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
    public drawHoldConnector(centerX: number, drawStartY: number, drawEndY: number, noteStartY: number, noteEndY: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        let noteSize = global.config.noteSize;
        let sourceWidth = this.connectorTile.width;
        let sourceHeight = this.connectorTile.height;
        let scaledWidth = noteSize;
        let scaledHeight = scaledWidth / sourceWidth * sourceHeight;
        let connectorHeight = Math.abs(drawEndY - drawStartY);
        let startYOffset = Math.abs(noteStartY - drawStartY);
        let startRemainderHeight = scaledHeight - startYOffset % scaledHeight;
        let endRemainderHeight = ((connectorHeight - startRemainderHeight) % scaledHeight);
        let numCompleteTiles = Math.round((connectorHeight - startRemainderHeight - endRemainderHeight) / scaledHeight);

        if (global.config.scrollDirection === ScrollDirection.Up) {
            this.drawPartialTile(centerX, drawStartY, scaledWidth, scaledHeight, sourceWidth, sourceHeight,
                startRemainderHeight / scaledHeight, true, p);
            this.drawCompleteTiles(centerX,drawStartY + startRemainderHeight, scaledWidth, scaledHeight,
                numCompleteTiles, p);
            this.drawPartialTile(centerX, drawEndY - endRemainderHeight, scaledWidth, scaledHeight,
                sourceWidth, sourceHeight, endRemainderHeight / scaledHeight, false, p);
        } else {
            this.drawPartialTile(centerX, drawStartY - startRemainderHeight, scaledWidth, scaledHeight,
                sourceWidth, sourceHeight, startRemainderHeight / scaledHeight, false, p);
            this.drawCompleteTiles(centerX, drawEndY + endRemainderHeight, scaledWidth, scaledHeight,
                numCompleteTiles, p);
            this.drawPartialTile(centerX, drawEndY, scaledWidth, scaledHeight, sourceWidth, sourceHeight,
                endRemainderHeight / scaledHeight, true, p);
        }

        return true;
    }

    private drawCompleteTiles(centerX: number, leastY: number, scaledWidth: number, scaledHeight: number,
                              numTiles: number, p: p5) {
        for (let i = 0; i < numTiles; i++) {
            p.image(this.connectorTile, centerX - scaledWidth / 2, leastY + i * scaledHeight, scaledWidth,
                scaledHeight);
        }
    }

    private drawPartialTile(centerX: number, topLeftY: number, scaledWidth: number, scaledHeight: number,
                            sourceWidth: number, sourceHeight: number, heightPercent: number, isDrawnFromBottom: boolean,
                           p: p5) {
        if (heightPercent > 0) {
            if (isDrawnFromBottom) { // Draw from the bottom of the image
                p.image(this.connectorTile, centerX - scaledWidth / 2, topLeftY, scaledWidth,
                    heightPercent * scaledHeight, 0, sourceHeight - heightPercent * sourceHeight,
                    sourceWidth, heightPercent * sourceHeight);
            } else { // Draw from the top of the image
                p.image(this.connectorTile, centerX - scaledWidth / 2, topLeftY, scaledWidth,
                    heightPercent * scaledHeight, 0, 0, sourceWidth, heightPercent * sourceHeight);
            }
        }
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