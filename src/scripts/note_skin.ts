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
            case NoteType.TAIL:
                this.drawTailRotated(trackNumber, numTracks, centerX, centerY);
                break;
            default:
                return false;
        }
        return true;
    }

    // Returns true if able to draw note type, otherwise returns false
    public drawReceptor(trackNumber: number, numTracks: number, centerX: number, centerY: number) {
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
        let startYOffset = this.getNoteStartOffset(noteStartY, drawStartY);
        let startPartialTileHeight = scaledHeight - startYOffset % scaledHeight;
        let endPartialTileHeight = ((connectorHeight - startPartialTileHeight) % scaledHeight);
        let numCompleteTiles = Math.round((connectorHeight - startPartialTileHeight - endPartialTileHeight) / scaledHeight);

        // The following block allows us to use the same drawing method for both upscroll and downscroll
        let bottomPartialTileHeight: number;
        let topPartialTileHeight: number;
        if (global.config.scrollDirection === ScrollDirection.Up) {
            bottomPartialTileHeight = endPartialTileHeight;
            topPartialTileHeight = startPartialTileHeight;
        } else {
            bottomPartialTileHeight = startPartialTileHeight;
            topPartialTileHeight = endPartialTileHeight;
        }
        let drawMinY = Math.min(drawStartY, drawEndY);
        let drawMaxY = Math.max(drawStartY, drawEndY);

        this.drawPartialTile(centerX, drawMinY, scaledWidth, scaledHeight, sourceWidth, sourceHeight,
            topPartialTileHeight / scaledHeight, true, p);
        this.drawCompleteTiles(centerX, drawMinY + topPartialTileHeight, scaledWidth, scaledHeight,
            numCompleteTiles, p);
        this.drawPartialTile(centerX, drawMaxY - bottomPartialTileHeight, scaledWidth, scaledHeight,
            sourceWidth, sourceHeight, bottomPartialTileHeight / scaledHeight, false, p);

        return true;
    }

    private drawTailRotated(trackNumber: number, numTracks: number, centerX: number, centerY: number) {
        // let p: p5 = global.p5Scene.sketchInstance;
        // let noteSize = global.config.noteSize;
        // let sourceWidth = this.connectorTile.width;
        // let sourceHeight = this.connectorTile.height;
        // p.push();
        // p.angleMode(p.DEGREES);
        // p.translate(centerX, centerY);
        // this.rotate(p, trackNumber, numTracks);
        // p.image(this.note, -noteSize / 2, -noteSize / 2, noteSize, noteSize / 2, 0, 0, sourceWidth,
        //     sourceHeight / 2);
        // p.pop();
        this.drawNoteRotated(trackNumber, numTracks, centerX, centerY);
    }

    private getNoteStartOffset(noteStartY: number, drawStartY: number) {
        let offset: number;
        if (global.config.scrollDirection === ScrollDirection.Up) {
            offset = drawStartY - noteStartY;
        } else {
            offset = noteStartY - drawStartY;
        }

        // This prevents the partial tile texture from stretching when the player hits a hold early
        offset = Math.max(0, offset);

        return offset;
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