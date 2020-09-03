import * as p5 from "p5";
import {Accuracy} from "../../accuracy_manager";
import {Config} from "../../config";
import {NoteManager} from "../../note_manager";
import {AccuracyRecording, AccuracyRecordingEntry} from "../../accuracy_recording";
import {AccuracyUtil} from "../../accuracy_util";
import {PageDescription} from "../../page_manager";
import {Rectangle} from "../../rectangle";
import {Score, ScoreProvider} from "../../score_provider";
import {LocalStorage} from "../../local_storage";

export class ResultsDisplay {
    private config: Config;
    private noteManager: NoteManager;
    private accuracyRecording: AccuracyRecording;
    private p: p5;
    private songTitle: string;
    private returnPage: PageDescription;
    private readonly totalNotes: number;

    constructor(config: Config, noteManager: NoteManager, p: p5, accuracyRecording: AccuracyRecording, songTitle: string,
                returnPage: PageDescription) {
        this.config = config;
        this.noteManager = noteManager;
        this.p = p;
        this.accuracyRecording = accuracyRecording;
        this.songTitle = songTitle;
        this.returnPage = returnPage;
        this.totalNotes = this.noteManager.getTotalNotes();
        LocalStorage.saveReplay(accuracyRecording, noteManager);

        console.log("total notes = " + this.totalNotes);
        let scoreProvider: ScoreProvider = new ScoreProvider(this.config, this.totalNotes);
        let score: Score = scoreProvider.score(this.accuracyRecording.linearRecording);
        console.log("score = " + score.totalScore + ", percent = " + score.percentScore);
    }

    draw() {
        let heading: string = this.returnPage.name + "// " + this.songTitle;
        this.drawHeadingText(heading);
        this.drawResults(Rectangle.fromTopLeft(60, 50, this.p.width - 60, this.p.height - 100));
    }

    private drawHeadingText(heading: string) {
        let p = this.p;
        p.push();
        p.textAlign(p.LEFT, p.TOP);
        p.fill("white");
        p.textSize(20);
        p.text(heading, 8, 8);
        p.pop();
    }

    private drawResults(bounds: Rectangle) {
        let barWidth = bounds.width * 0.6;
        let barHeight = barWidth / 10;
        let leftLabelHeight = 0.8 * barHeight;
        let accuracyListForResults = this.getAccuracyNamesDescending(this.config.accuracySettings);
        this.drawAccuracyBars(accuracyListForResults, bounds.center.x, bounds.center.y, leftLabelHeight, barWidth, barHeight,
            AccuracyUtil.isConfiguredForBoos(this.config));
    }

    // return a list of unique accuracies sorted by the offset, with the best accuracy being first
    private getAccuracyNamesDescending(accuracySettings: Accuracy[]): string[] {
        let accuracyTable: { accuracyName: string, sortValue: number }[] = accuracySettings.map(accuracy => {
            return {
                accuracyName: accuracy.name,
                sortValue: ResultsDisplay.getAccuracySortingValue(accuracy.lowerBound, accuracy.upperBound)
            };
        });
        let mergedAccuracyTable: { accuracyName: string, sortValue: number }[] =
            this.mergeAccuraciesWithSameName(accuracyTable);
        mergedAccuracyTable.sort(ResultsDisplay.accuracyTableSortFunction);
        return mergedAccuracyTable.map(row => row.accuracyName);
    }

    private static getAccuracySortingValue(lowerBound: number, upperBound: number) {
        if (lowerBound === null) {
            return Math.abs(upperBound);
        }
        if (upperBound === null) {
            return Math.abs(lowerBound);
        }
        return Math.abs((upperBound + lowerBound) / 2);
    }

    private mergeAccuraciesWithSameName(accuracyTable: { accuracyName: string; sortValue: number }[]) {
        let mergedAccuracyTable: { accuracyName: string, sortValue: number }[] = [];
        while (accuracyTable.length > 0) {
            let keyAccuracyName = accuracyTable[0].accuracyName;
            let matchedAccuracies = accuracyTable.filter(row => row.accuracyName === keyAccuracyName);
            let sortValueAverage = matchedAccuracies
                    .reduce((sum, row) => sum + row.sortValue, 0)
                / matchedAccuracies.length;
            mergedAccuracyTable.push({accuracyName: keyAccuracyName, sortValue: sortValueAverage});
            accuracyTable = accuracyTable.filter(row => row.accuracyName !== keyAccuracyName);
        }
        return mergedAccuracyTable;
    }

    private static accuracyTableSortFunction(a: { accuracyName: string, sortValue: number },
                                             b: { accuracyName: string, sortValue: number }) {
        return a.sortValue - b.sortValue;
    }

    private drawAccuracyBars(accuracyLabels: string[],
                             centerX: number, centerY: number, textSize: number, barWidth: number,
                             barHeight: number,
                             isBooForLastAccuracy: boolean) {
        let p: p5 = this.p;
        let maxTextWidth = this.getMaxTextWidth(accuracyLabels, textSize);
        let barSpacing = 10;
        let numBars = accuracyLabels.length + 1;
        let totalHeight = numBars * barHeight + (numBars - 1) * barSpacing;
        let startY = (p.height - totalHeight) / 2 + barHeight / 2;
        startY *= 0.8; // shift the results up to make room for exit button

        // combo bar
        let barCenterY: number = this.getBarCenterY(startY, 0, barHeight, barSpacing);
        let combo = this.calculateCombo();
        let percentFilled = combo / this.totalNotes;
        this.drawAccuracyBar(centerX, barCenterY, "Combo", combo.toString(),
            this.totalNotes.toString(), textSize, maxTextWidth, barWidth, barHeight, percentFilled);

        // other bars
        for (let i = 1; i < numBars; i++) {
            let accuracyLabel = accuracyLabels[i - 1];
            let numAccuracyEvents = this.getNumAccuracyEvents(accuracyLabel, this.config);
            let percentFilled = numAccuracyEvents / this.totalNotes;
            let barCenterY: number = this.getBarCenterY(startY, i, barHeight, barSpacing);

            if (isBooForLastAccuracy && i === numBars - 1) {
                this.drawAccuracyWithNoBar(centerX, barCenterY, accuracyLabel, numAccuracyEvents.toString(),
                    this.totalNotes.toString(), textSize, maxTextWidth, barWidth);
            } else {
                this.drawAccuracyBar(centerX, barCenterY, accuracyLabel, numAccuracyEvents.toString(),
                    this.totalNotes.toString(), textSize, maxTextWidth, barWidth, barHeight, percentFilled);
            }
        }
    }

    private getBarCenterY(startY: number, i: number, barHeight: number, barSpacing: number) {
        return startY + i * (barHeight + barSpacing);
    }

    private getNumAccuracyEvents(accuracyLabel: string, config: Config) {
        return this.accuracyRecording.perTrackRecording.reduce((sum, trackRecording) =>
            sum + trackRecording.filter(accuracyEvent =>
            AccuracyUtil.getAccuracyEventName(accuracyEvent.accuracyMillis, config) === accuracyLabel).length, 0);
    }

    private getMaxTextWidth(textArray: string[], textSize: number) {
        let p: p5 = this.p;
        p.push();
        p.textSize(textSize);
        let maxTextWidth = textArray.map((string) => p.textWidth(string))
            .reduce((maxWidth, width) => Math.max(maxWidth, width, -1));
        p.pop();
        return maxTextWidth;
    }

    private drawAccuracyBar(centerX: number, centerY: number, label1: string, label2: string, label3: string,
                            textSize: number, largestTextWidth: number, barWidth: number, barHeight: number,
                            percentFilled: number) {
        let p: p5 = this.p;
        let spacingBetweenBarAndLabel = 8;
        let totalWidth = largestTextWidth + spacingBetweenBarAndLabel + barWidth;
        let labelRightmostX = centerX - totalWidth / 2 + largestTextWidth;
        this.drawRightAlignedLabel(labelRightmostX, centerY, label1, textSize);

        let barRightX = centerX + totalWidth / 2;
        let barLeftX = barRightX - barWidth;
        let barCenterX = (barLeftX + barRightX) / 2;
        this.drawPartiallyFilledBar(barCenterX, centerY, barWidth, barHeight, percentFilled, textSize, label2, label3);
    }

    private drawRightAlignedLabel(rightmostX: number, centerY: number, text: string, textSize: number) {
        let p: p5 = this.p;
        p.push();
        p.fill("white");
        p.textSize(textSize);
        p.textAlign(p.RIGHT, p.CENTER);
        p.text(text, rightmostX, centerY);
        p.pop();
    }

    private drawPartiallyFilledBar(centerX: number, centerY: number, width: number, height: number,
                                   percentFilled: number, textSize: number, startLabel: string, endLabel: string) {
        let p: p5 = this.p;
        p.push();
        p.rectMode(p.CENTER);
        p.stroke("white");

        // draw the filled part of the bar
        p.fill("gray");
        p.rect(centerX - (width * (1 - percentFilled) / 2), centerY, width * percentFilled, height);

        // draw the outline of the bar
        p.noFill();
        p.rect(centerX, centerY, width, height);

        // draw the labels on the ends of the bar
        let labelSize = 1.5 * textSize;
        p.fill("white");
        p.textSize(labelSize);
        p.textAlign(p.LEFT, p.CENTER);
        p.text(startLabel, centerX - width / 2, centerY + 2);
        p.textAlign(p.RIGHT, p.CENTER);
        p.text(endLabel, centerX + width / 2, centerY + 2);
        p.pop();
    }

    private drawAccuracyWithNoBar(centerX: number, centerY: number, label1: string, label2: string, label3: string,
                                  textSize: number, largestTextWidth: number, barWidth: number) {
        let p: p5 = this.p;
        let spacingBetweenBarAndLabel = 8;
        let totalWidth = largestTextWidth + spacingBetweenBarAndLabel + barWidth;
        let labelRightmostX = centerX - totalWidth / 2 + largestTextWidth;
        this.drawRightAlignedLabel(labelRightmostX, centerY, label1, textSize);

        // draw the accuracy count label on the left end of the bar
        let labelSize = 1.5 * textSize;
        let barRightX = centerX + totalWidth / 2;
        let barLeftX = barRightX - barWidth;
        let barCenterX = (barLeftX + barRightX) / 2;
        p.push();
        p.fill("white");
        p.textSize(labelSize);
        p.textAlign(p.LEFT, p.CENTER);
        p.text(label2, barCenterX - barWidth / 2, centerY + 2);
        p.pop();
    }

    private calculateCombo(): number {
        let maxCombo = 0;
        let combo: number = 0;
        for (let i = 0; i < this.accuracyRecording.linearRecording.length; i++) {
            let entry: AccuracyRecordingEntry = this.accuracyRecording.linearRecording[i];
            if (AccuracyUtil.eventIsAHit(entry, this.config)) {
                combo++;
            } else {
                combo = 0;
            }
            if (combo > maxCombo) {
                maxCombo = combo;
            }
        }
        return maxCombo;
    }
}
