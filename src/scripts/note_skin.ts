import * as p5 from "p5";
import {global} from "./index";
import {NoteType} from "./parsing/parse_sm";
import {ScrollDirection} from "./scroll_direction";

export class NoteSkin {
    private readonly note: p5.Image;
    private readonly connectorTile: p5.Image;
    private readonly receptor: p5.Image;

    /* Requires that the tail be half the height and same width as note image */
    public tail: p5.Image;

    private rotationAngles: Map<number, number[]> = new Map([
        [4, [270, 180, 0, 90]],
        [6, [270, 315, 180, 0, 45, 90]]
    ]);

    constructor(note: p5.Image, connector: p5.Image, tail: p5.Image, receptor: p5.Image) {
        this.note = note;
        this.connectorTile = connector;
        this.tail = tail;
        this.receptor = receptor;
    }

    // Returns true if able to draw note type, otherwise returns false
    public drawNote(trackNumber: number, numTracks: number, centerX: number, centerY: number, noteType: NoteType,
                    noteSize: number): boolean {
        switch (noteType) {
            case NoteType.NORMAL:
            case NoteType.HOLD_HEAD:
                this.drawImageRotated(this.note, trackNumber, numTracks, centerX, centerY, noteSize);
                break;
            case NoteType.TAIL:
                this.drawTail(trackNumber, numTracks, centerX, centerY, noteSize);
                break;
            default:
                return false;
        }
        return true;
    }

    // Returns true if able to draw note type, otherwise returns false
    public drawReceptor(trackNumber: number, numTracks: number, centerX: number, centerY: number, noteSize: number) {
        this.drawImageRotated(this.receptor, trackNumber, numTracks, centerX, centerY, noteSize);
        return true;
    }

    // Returns true if able to draw note type, otherwise returns false
    public drawHoldConnector(centerX: number, drawStartY: number, drawEndY: number, noteStartY: number, noteEndY: number,
                             noteSize: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        let sourceWidth = this.connectorTile.width;
        let sourceHeight = this.connectorTile.height;
        let scaledWidth = noteSize;
        let scaledHeight = scaledWidth / sourceWidth * sourceHeight;
        let connectorHeight = Math.abs(drawEndY - drawStartY);
        let endYOffset = this.getNoteEndOffset(noteEndY, drawEndY);

        let endPartialTileHeight = scaledHeight - (endYOffset % scaledHeight);
        endPartialTileHeight = Math.min(endPartialTileHeight, connectorHeight);

        let startPartialTileHeight = (connectorHeight - endPartialTileHeight) % scaledHeight;
        let numCompleteTiles = Math.round(
            (connectorHeight - startPartialTileHeight - endPartialTileHeight) / scaledHeight);

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
        let isReversed = global.config.scrollDirection === ScrollDirection.Up;
        let isDrawnFromBottom = global.config.scrollDirection === ScrollDirection.Up;
        if (endPartialTileHeight === connectorHeight) {
            isDrawnFromBottom = !isDrawnFromBottom;
        }

        this.drawPartialTile(centerX, drawMinY, scaledWidth, scaledHeight, sourceWidth, sourceHeight,
            topPartialTileHeight / scaledHeight, !isDrawnFromBottom, isReversed, p);
        this.drawCompleteTiles(centerX, drawMinY + topPartialTileHeight, scaledWidth, scaledHeight,
            numCompleteTiles, isReversed, p);
        this.drawPartialTile(centerX, drawMaxY - bottomPartialTileHeight, scaledWidth, scaledHeight,
            sourceWidth, sourceHeight, bottomPartialTileHeight / scaledHeight, isDrawnFromBottom,
            isReversed, p);

        return true;
    }

    public drawTail(trackNumber: number, numTracks: number, centerX: number, centerY: number, noteSize: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        if (global.config.scrollDirection === ScrollDirection.Up) {
            p.push();
            p.angleMode(p.DEGREES);
            p.translate(centerX, centerY);
            p.rotate(180);
            p.image(this.tail, -noteSize / 2, -noteSize / 2, noteSize, noteSize);
            p.pop();
        } else {
            p.image(this.tail, centerX - noteSize / 2, centerY - noteSize / 2, noteSize, noteSize);
        }
    }

    private getNoteEndOffset(noteEndY: number, drawEndY: number) {
        let offset: number;
        if (global.config.scrollDirection === ScrollDirection.Up) {
            offset = noteEndY - drawEndY;
        } else {
            offset = drawEndY - noteEndY;
        }

        // This prevents the partial tile texture from stretching when the player hits a hold early
        offset = Math.max(0, offset);

        return offset;
    }

    private drawCompleteTiles(centerX: number, leastY: number, scaledWidth: number, scaledHeight: number,
                              numTiles: number, isReversed: boolean, p: p5) {
        for (let i = 0; i < numTiles; i++) {
            p.push();
            p.angleMode(p.DEGREES);
            let centerY = leastY + i * scaledHeight + scaledHeight / 2;
            p.translate(centerX, centerY);
            if (isReversed) {
                p.rotate(180);
            }
            p.image(this.connectorTile, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
            p.pop();
        }
    }

    private drawPartialTile(centerX: number, topLeftY: number, scaledWidth: number, scaledHeight: number,
                            sourceWidth: number, sourceHeight: number, heightPercent: number, isDrawnFromBottom: boolean,
                            isReversed: boolean, p: p5) {
        if (heightPercent <= 0) {
            return;
        }

        p.push();
        let destinationHeight = heightPercent * scaledHeight;
        let centerY = topLeftY + destinationHeight / 2;
        p.translate(centerX, centerY);
        if (isReversed) {
            p.angleMode(p.DEGREES);
            p.rotate(180);
        }
        if (isDrawnFromBottom) { // Draw from the bottom of the image
            p.image(this.connectorTile, -scaledWidth / 2, -destinationHeight / 2, scaledWidth,
                destinationHeight, 0, sourceHeight - heightPercent * sourceHeight,
                sourceWidth, heightPercent * sourceHeight);
        } else { // Draw from the top of the image
            p.image(this.connectorTile, -scaledWidth / 2, -destinationHeight / 2, scaledWidth,
                destinationHeight, 0, 0, sourceWidth, heightPercent * sourceHeight);
        }
        p.pop();
    }

    private drawImageRotated(image: p5.Image, trackNumber: number, numTracks: number, centerX: number, centerY: number,
                             noteSize: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        p.push();
        p.angleMode(p.DEGREES);
        p.translate(centerX, centerY);
        this.rotate(p, trackNumber, numTracks);
        p.image(image, -noteSize / 2, -noteSize / 2, noteSize, noteSize);
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