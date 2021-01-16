import * as p5 from "p5";
import {Accuracy} from "../../accuracy_manager";
import {Config} from "../../config";
import {NoteManager} from "../../note_manager";
import {AccuracyRecording, AccuracyRecordingEntry, Replay} from "../../accuracy_recording";
import {AccuracyUtil} from "../../accuracy_util";
import {PageDescription} from "../page_manager";
import {Rectangle} from "../../rectangle";
import {Score, ScoreProvider} from "../../score_provider";

export class ResultsDisplay {
    private config: Config;
    private noteManager: NoteManager;
    private currentRecording: AccuracyRecording;
    public currentScore: Score;
    private comparisonRecording: AccuracyRecording;
    private comparisonScore: Score;
    private p: p5;
    private songTitle: string;
    private returnPage: PageDescription;
    private readonly totalNotes: number;

    constructor(config: Config, noteManager: NoteManager, p: p5, currentRecording: AccuracyRecording,
                comparisonReplay: Replay, songTitle: string,
                returnPage: PageDescription) {
        this.config = config;
        this.noteManager = noteManager;
        this.p = p;
        this.currentRecording = currentRecording;
        this.songTitle = songTitle;
        this.returnPage = returnPage;
        this.totalNotes = this.noteManager.getTotalNotes();
        let scoreProvider: ScoreProvider = new ScoreProvider(this.config, this.totalNotes);
        this.currentScore = scoreProvider.score(this.currentRecording.linearRecording);

        if (comparisonReplay !== undefined) {
            this.comparisonRecording = AccuracyRecording.ofReplay(comparisonReplay);
            this.comparisonScore = scoreProvider.score(this.comparisonRecording.linearRecording);
        }
    }

    draw() {
        let heading: string = this.returnPage.name + "// " + this.songTitle;
        this.drawHeadingText(heading);

        let barsBounds: Rectangle = Rectangle.fromTopLeft(0, 80, this.p.width * 0.9, this.p.height * 0.47);
        this.drawBars(barsBounds);

        let scoreSummaryBounds: Rectangle = Rectangle.fromTopLeft(this.p.width * 0.2,
            barsBounds.topLeftY + barsBounds.height + 20, barsBounds.width, this.p.height * 0.12);
        this.drawScoreSummary(scoreSummaryBounds);

        if (this.comparisonRecording !== undefined) {
            let comparisonBarStatsBounds: Rectangle = Rectangle.fromTopLeft(barsBounds.width + barsBounds.topLeftX - 20,
                barsBounds.topLeftY, 0, barsBounds.height);
            this.drawComparisonBarStats(comparisonBarStatsBounds);

            let comparisonScoreSummaryBounds: Rectangle = Rectangle.fromTopLeft(comparisonBarStatsBounds.topLeftX,
                scoreSummaryBounds.topLeftY, 0, scoreSummaryBounds.height);
            this.drawComparisonScoreSummary(comparisonScoreSummaryBounds);
        }
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

    private drawScoreSummary(bounds: Rectangle) {
        let numLines: number = 2;
        let lineSpacingRatio: number = 1 / 3;
        let lineHeight: number = bounds.height / (numLines + (numLines - 1) * lineSpacingRatio);
        let lineSpacing: number = lineSpacingRatio * lineHeight;
        let textSize: number = lineHeight * 0.9;

        let totalScore: string = "Total Score: " + this.currentScore.totalScore.toFixed(0);
        let y: number = bounds.topLeftY + lineHeight / 2;
        this.drawLeftAlignedText(bounds.topLeftX, y, totalScore, textSize);

        let percentScore: string = "Percent Score: " + this.currentScore.percentScore.toFixed(2) + "%";
        y += lineHeight + lineSpacing;
        this.drawLeftAlignedText(bounds.topLeftX, y, percentScore, textSize);
    }

    private drawComparisonScoreSummary(bounds: Rectangle) {
        let numLines: number = 2;
        let lineSpacingRatio: number = 1 / 3;
        let lineHeight: number = bounds.height / (numLines + (numLines - 1) * lineSpacingRatio);
        let lineSpacing: number = lineSpacingRatio * lineHeight;
        let textSize: number = lineHeight * 0.9;

        let totalScore: string = this.comparisonScore.totalScore.toFixed(0);
        let y: number = bounds.topLeftY + lineHeight / 2;
        this.drawCenteredText(bounds.centerX, y, totalScore, textSize);

        let percentScore: string = this.comparisonScore.percentScore.toFixed(2) + "%";
        y += lineHeight + lineSpacing;
        this.drawCenteredText(bounds.centerX, y, percentScore, textSize);
    }

    private drawComparisonBarStats(bounds: Rectangle) {
        let accuracyLabels: string[] = this.getAccuracyNamesDescending(this.config.accuracySettings);
        let numBars: number = accuracyLabels.length + 1; // plus one for the combo bar
        let barSpacingRatio: number = 1 / 3;
        let barHeight: number = bounds.height / (numBars + (numBars - 1) * barSpacingRatio);
        let barSpacing: number = barSpacingRatio * barHeight;
        let textSize: number = barHeight * 0.9;
        this.drawPBAccuracyStats(accuracyLabels, bounds, textSize, barHeight, barSpacing, numBars);
    }

    private drawPBAccuracyStats(accuracyLabels: string[], bounds: Rectangle, textSize: number,
                                barHeight: number, barSpacing: number, numStats: number) {
        let startY = bounds.topLeftY;

        let headerText: string = "Personal Best";
        let headerSize: number = textSize * 0.8;
        this.drawCenteredText(bounds.centerX, startY - headerSize * 1.5, headerText, headerSize);

        // combo bar
        let statCenterY: number = this.getBarCenterY(startY, 0, barHeight, barSpacing);
        let combo = this.calculateCombo(this.comparisonRecording.linearRecording);
        this.drawCenteredText(bounds.centerX, statCenterY, combo.toString(), textSize);

        // other bars
        for (let i = 1; i < numStats; i++) {
            let accuracyLabel = accuracyLabels[i - 1];
            let numAccuracyEvents = this.getNumAccuracyEvents(this.comparisonRecording.perTrackRecording, accuracyLabel, this.config);
            let statCenterY: number = this.getBarCenterY(startY, i, barHeight, barSpacing);
            this.drawCenteredText(bounds.centerX, statCenterY, numAccuracyEvents.toString(), textSize);
        }
    }

    private drawBars(bounds: Rectangle) {
        let accuracyLabels: string[] = this.getAccuracyNamesDescending(this.config.accuracySettings);
        let numBars: number = accuracyLabels.length + 1; // plus one for the combo bar
        let barSpacingRatio: number = 1 / 3;
        let barHeight: number = bounds.height / (numBars + (numBars - 1) * barSpacingRatio);
        let barWidth: number = bounds.width * 0.6;
        let barSpacing: number = barSpacingRatio * barHeight;
        let leftTextSize: number = 0.8 * barHeight;
        this.drawAccuracyBars(accuracyLabels, bounds, leftTextSize, barWidth, barHeight, barSpacing, numBars,
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

    private drawAccuracyBars(accuracyLabels: string[], bounds: Rectangle, textSize: number, barWidth: number,
                             barHeight: number, barSpacing: number, numBars: number,
                             isBooForLastAccuracy: boolean) {
        let maxTextWidth = this.getMaxTextWidth(accuracyLabels, textSize);
        let startY = bounds.topLeftY;

        // combo bar
        let barCenterY: number = this.getBarCenterY(startY, 0, barHeight, barSpacing);
        let combo = this.calculateCombo(this.currentRecording.linearRecording);
        let percentFilled = combo / this.totalNotes;
        this.drawAccuracyBar(bounds.centerX, barCenterY, "Combo", combo.toString(),
            this.totalNotes.toString(), textSize, maxTextWidth, barWidth, barHeight, percentFilled);

        // other bars
        for (let i = 1; i < numBars; i++) {
            let accuracyLabel = accuracyLabels[i - 1];
            let numAccuracyEvents = this.getNumAccuracyEvents(this.currentRecording.perTrackRecording, accuracyLabel, this.config);
            let percentFilled = numAccuracyEvents / this.totalNotes;
            let barCenterY: number = this.getBarCenterY(startY, i, barHeight, barSpacing);

            if (isBooForLastAccuracy && i === numBars - 1) {
                this.drawAccuracyWithNoBar(bounds.centerX, barCenterY, accuracyLabel, numAccuracyEvents.toString(),
                    this.totalNotes.toString(), textSize, maxTextWidth, barWidth);
            } else {
                this.drawAccuracyBar(bounds.centerX, barCenterY, accuracyLabel, numAccuracyEvents.toString(),
                    this.totalNotes.toString(), textSize, maxTextWidth, barWidth, barHeight, percentFilled);
            }
        }
    }

    private getBarCenterY(startY: number, i: number, barHeight: number, barSpacing: number) {
        return startY + i * (barHeight + barSpacing);
    }

    private getNumAccuracyEvents(perTrackRecording: AccuracyRecordingEntry[][], accuracyLabel: string, config: Config) {
        return perTrackRecording.reduce((sum, trackRecording) =>
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
        let spacingBetweenBarAndLabel = 8;
        let totalWidth = largestTextWidth + spacingBetweenBarAndLabel + barWidth;
        let labelRightmostX = centerX - totalWidth / 2 + largestTextWidth;
        this.drawRightAlignedLabel(labelRightmostX, centerY, label1, textSize);

        // draw the accuracy count label on the left end of the bar
        let labelSize = 1.5 * textSize;
        let barRightX = centerX + totalWidth / 2;
        let barLeftX = barRightX - barWidth;
        let barCenterX = (barLeftX + barRightX) / 2;
        let p: p5 = this.p;
        p.push();
        p.fill("white");
        p.textSize(labelSize);
        p.textAlign(p.LEFT, p.CENTER);
        p.text(label2, barCenterX - barWidth / 2, centerY + 2);
        p.pop();
    }

    private drawLeftAlignedText(leftX: number, centerY: number, text: string, textSize: number) {
        let p: p5 = this.p;
        p.push();
        p.fill("white");
        p.textSize(textSize);
        p.textAlign(p.LEFT, p.CENTER);
        p.text(text, leftX, centerY);
        p.pop();
    }

    private drawCenteredText(centerX: number, centerY: number, text: string, textSize: number) {
        let p: p5 = this.p;
        p.push();
        p.fill("white");
        p.textSize(textSize);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(text, centerX, centerY);
        p.pop();
    }

    private calculateCombo(entries: AccuracyRecordingEntry[]): number {
        let maxCombo = 0;
        let combo: number = 0;
        for (let i = 0; i < entries.length; i++) {
            let entry: AccuracyRecordingEntry = entries[i];
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