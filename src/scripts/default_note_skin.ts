import {NoteType} from "./parsing";
import {global} from "./index";
import * as p5 from "p5";

export abstract class DefaultNoteSkin {
    public static drawNote(trackNumber: number, numTracks: number, centerX: number, centerY: number, noteType: NoteType) {
        let p: p5 = global.p5Scene.sketchInstance;
        let noteSize = global.config.noteSize;
        let width = noteSize;
        let height = noteSize;
        p.push();
        p.fill("black");
        switch (noteType) {
            case NoteType.NORMAL:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                break;
            case NoteType.HOLD_HEAD:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("white");
                p.text("v", centerX, centerY + 6);
                break;
            case NoteType.TAIL:
                p.noFill();
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                break;
            case NoteType.ROLL_HEAD:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("white");
                p.text("x", centerX, centerY + 6);
                break;
            case NoteType.MINE:
                p.fill("black");
                p.circle(centerX, centerY, 24);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("white");
                p.text("X", centerX, centerY + 8);
                break;
            default:
                p.noFill();
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.fill("black");
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.text("?", centerX, centerY + 7);
                break;
        }
        p.pop();
    }

    public static drawReceptor(trackNumber: number, numTracks: number, centerX: number, centerY: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        let noteSize = global.config.noteSize;
        let width = noteSize;
        let height = noteSize;
        p.push();
        p.noFill();
        p.rect(centerX - width / 2, centerY - height / 2, width, height);
        p.pop();
    }

    public static drawHoldConnector(centerX: number, startY: number, endY: number) {
        let p: p5 = global.p5Scene.sketchInstance;
        let noteSize = global.config.noteSize;
        let width = noteSize * 0.5;
        p.push();
        p.fill("black");
        p.rect(centerX - width / 2, startY, width, endY - startY);
        p.pop();
    }
}