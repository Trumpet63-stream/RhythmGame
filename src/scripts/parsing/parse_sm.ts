import {getEmpty2dArray} from "../util";
import {RhythmClassifier} from "../rhythm_classifier";

export class PartialParse {
    public metaData: Map<string, string>;
    public modes: Map<string, string>[];
}

export interface Measure {
    position: number,
    divisions: number,
    fraction: number
}

interface BeatAndLine {
    endBeat: number,
    lineInfo: string,
    measure: Measure
}

interface TimeBeatAndLine {
    endBeat: number,
    lineInfo: string,
    measure: Measure,
    timeInSeconds: number
}

export interface ParsedNoteInfo {
    endBeat: number,
    measure: Measure,
    timeInSeconds: number,
    trackNumber: number,
    type: string
}

export class FullParse {
    public metaData: Map<string, string>;
    public modes: Map<string, string>[];
    public offset: number;
    public bpms: BpmEntry[];
    public stops: StopEntry[];
    public tracks: ParsedNoteInfo[][];

    public constructor(partialParse: PartialParse) {
        this.metaData = partialParse.metaData;
        this.modes = partialParse.modes;
    }
}

interface BpmEntry {
    beat: number;
    bpm: number
}

interface StopEntry {
    beat: number;
    stopDuration: number
}

/* Step One Of Parsing */
export function getPartialParse(fileContents: string) {
    let partialParse: PartialParse = new PartialParse();
    partialParse.metaData = getTopMetaDataAsStrings(fileContents);
    partialParse.modes = getModesInfoAsStrings(fileContents);
    return partialParse;
}

function getTopMetaDataAsStrings(file: string) {
    // match any metadata tag excluding the "NOTES" tag (case-insensitive)
    let re = /#(?![nN][oO][tT][eE][sS])([^:]+):([^;]+);/g;
    let matches = [...file.matchAll(re)];
    let metaData: Map<string, string> = new Map();
    for (let i = 0; i < matches.length; i++) {
        let match = matches[i];
        metaData.set(cleanMetaDataString(match[1]).toUpperCase(), cleanMetaDataString(match[2]));
    }
    return metaData;
}

function getModesInfoAsStrings(fileContents: string) {
    // Get "NOTES" sections (case-insensitive). The first five values are postfixed with a colon.
    // Note data comes last, postfixed by a semicolon.
    let re = /#[nN][oO][tT][eE][sS]:([^:]*):([^:]*):([^:]*):([^:]*):([^:]*):([^;]+;)/g;
    let matches = [...fileContents.matchAll(re)];
    let modes: Map<string, string>[] = [];
    let fieldNames = ["type", "desc/author", "difficulty", "meter", "radar"];
    for (let i = 0; i < matches.length; i++) {
        let match = matches[i];
        let mode: Map<string, string> = new Map();
        for (let j = 1; j < match.length - 1; j++) {
            mode.set(fieldNames[j - 1], cleanMetaDataString(match[j]));
        }
        mode.set("notes", match[match.length - 1]);
        modes.push(mode);
    }
    return modes;
}

function cleanMetaDataString(string: string): string {
    return string.trim().replace(/\n/g, "");
}

/* Step Two Of Parsing */
export function getFullParse(modeIndex: number, partialParse: PartialParse): FullParse {
    let fullParse = new FullParse(partialParse);
    let cleanedBeatsAndLines: BeatAndLine[] = getCleanedBeatsAndLines(partialParse, modeIndex);
    fullParse.offset = parseFloat(partialParse.metaData.get("OFFSET"));
    fullParse.bpms = parseBPMS(partialParse.metaData.get("BPMS"));
    fullParse.stops = parseStops(partialParse.metaData.get("STOPS"));
    let timesBeatsAndLines: TimeBeatAndLine[] =
        getTimeInfoByLine(cleanedBeatsAndLines, fullParse.offset, fullParse.bpms, fullParse.stops);
    fullParse.tracks = getTracksFromLines(timesBeatsAndLines);
    return fullParse;
}

function getCleanedBeatsAndLines(partialParse: PartialParse, modeIndex: number): BeatAndLine[] {
    let unparsedNotes: string = partialParse.modes[modeIndex].get("notes");
    let unparsedArray: string[] = unparsedNotes.split("\n");
    let measures: string[][] = getMeasures(unparsedArray);
    let beatsAndLines: BeatAndLine[] = getBeatInfoByLine(measures);
    return removeBlankLines(beatsAndLines);
}

function getMeasures(unparsedArray: string[]) {
    let measures: string[][] = [];
    let state = 0;
    let i = 0;
    let currentMeasure: string[] = [];
    while (i < unparsedArray.length) {
        let currentLine = unparsedArray[i];
        switch (state) {
            case 0:
                if (!currentLine.includes("//") && currentLine.trim() !== "") {
                    state = 1;
                } else {
                    i++;
                }
                break;
            case 1:
                if (!currentLine.includes(",") && !currentLine.includes(";") && currentLine.trim() !== "") {
                    currentMeasure.push(currentLine.trim());
                    i++;
                } else {
                    state = 2;
                }
                break;
            case 2:
                measures.push(currentMeasure);
                currentMeasure = [];
                i++;
                state = 0;
                break;
        }
    }
    return measures;
}

// assumes 4/4 time signature (4 beats per measure)
function getBeatInfoByLine(measures: string[][]): BeatAndLine[] {
    let beatsAndLines: BeatAndLine[] = [];
    let currentBeat = 0;
    for (let i = 0; i < measures.length; i++) {
        let measure = measures[i];
        for (let j = 0; j < measure.length; j++) {
            beatsAndLines.push({
                endBeat: currentBeat,
                lineInfo: measure[j],
                measure: getMeasureDescription(measure.length, j)
            });
            currentBeat += 4 / measure.length;
        }
    }
    return beatsAndLines;
}

function getMeasureDescription(measureDivisions: number, measurePosition: number): Measure {
    return {
        divisions: measureDivisions,
        position: measurePosition,
        fraction: RhythmClassifier.getBeatFraction(measureDivisions, measurePosition)
    };
}

function removeBlankLines(beatsAndLines: BeatAndLine[]): BeatAndLine[] {
    let cleanedBeatsAndLines: BeatAndLine[] = [];
    for (let i = 0; i < beatsAndLines.length; i++) {
        let line = beatsAndLines[i];
        if (!isAllZeros(line.lineInfo)) {
            cleanedBeatsAndLines.push(line);
        }
    }
    return cleanedBeatsAndLines;
}

function isAllZeros(string: string) {
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) !== '0') {
            return false;
        }
    }
    return true;
}

function getTimeInfoByLine(infoByLine: BeatAndLine[], offset: number,
                           bpms: BpmEntry[], stops: StopEntry[]): TimeBeatAndLine[] {
    let infoByLineWithTime: TimeBeatAndLine[] = [];
    let currentTime = -offset + getElapsedTime(0, infoByLine[0].endBeat, bpms, stops);
    infoByLineWithTime.push(addTimeProperty(infoByLine[0], currentTime));
    for (let i = 1; i < infoByLine.length; i++) {
        let startBeat = infoByLine[i - 1].endBeat;
        let endBeat = infoByLine[i].endBeat;
        currentTime += getElapsedTime(startBeat, endBeat, bpms, stops);
        infoByLineWithTime.push(addTimeProperty(infoByLine[i], currentTime));
    }
    return infoByLineWithTime;
}

function addTimeProperty(b: BeatAndLine, time: number): TimeBeatAndLine {
    return {
        timeInSeconds: time,
        endBeat: b.endBeat,
        lineInfo: b.lineInfo,
        measure: b.measure
    };
}

function getElapsedTime(startBeat: number, endBeat: number, bpms: BpmEntry[], stops: StopEntry[]) {
    let currentBPMIndex: number = getStartBPMIndex(startBeat, bpms);
    let earliestBeat: number = startBeat;
    let elapsedTime: number = stops === null ? 0 : stoppedTime(startBeat, endBeat, stops);
    do {
        let nextBPMChange: number = getNextBPMChange(currentBPMIndex, bpms);
        let nextBeat: number = Math.min(endBeat, nextBPMChange);
        elapsedTime += (nextBeat - earliestBeat) / bpms[currentBPMIndex].bpm * 60;
        earliestBeat = nextBeat;
        currentBPMIndex++;
    } while (earliestBeat < endBeat);
    return elapsedTime;
}

function getStartBPMIndex(startBeat: number, bpms: BpmEntry[]) {
    let startBPMIndex = 0;
    for (let i = 1; i < bpms.length; i++) {
        if (bpms[i].beat < startBeat) {
            startBPMIndex = i;
        }
    }
    return startBPMIndex;
}

// does NOT snap to nearest 1/192nd of beat
function stoppedTime(startBeat: number, endBeat: number, stops: StopEntry[]): number {
    let time = 0;
    for (let i = 0; i < stops.length; i++) {
        let stopBeat = stops[i].beat;
        if (startBeat <= stopBeat && stopBeat < endBeat) {
            time += stops[i].stopDuration;
        }
    }
    return time;
}

function getNextBPMChange(currentBPMIndex: number, bpms: BpmEntry[]): number {
    if (currentBPMIndex + 1 < bpms.length) {
        return bpms[currentBPMIndex + 1].beat;
    }
    return Number.POSITIVE_INFINITY;
}

const EMPTY_NOTE: string = "0";

function getTracksFromLines(timesBeatsAndLines: TimeBeatAndLine[]): ParsedNoteInfo[][] {
    let numTracks: number = timesBeatsAndLines[0].lineInfo.length;
    let tracks: ParsedNoteInfo[][] = getEmpty2dArray(numTracks);
    for (let i = 0; i < timesBeatsAndLines.length; i++) {
        let line: TimeBeatAndLine = timesBeatsAndLines[i];
        for (let j = 0; j < line.lineInfo.length; j++) {
            let noteType = line.lineInfo.charAt(j);
            if (noteType !== EMPTY_NOTE) {
                tracks[j].push(addNoteTypeAndTrack(noteType, j, line));
            }
        }
    }
    return tracks;
}

function addNoteTypeAndTrack(noteType: string, trackNumber: number, line: TimeBeatAndLine): ParsedNoteInfo {
    return {
        measure: line.measure,
        timeInSeconds: line.timeInSeconds,
        endBeat: line.endBeat,
        type: noteType,
        trackNumber: trackNumber
    }
}

function parseBPMS(bpmString: string): BpmEntry[] {
    if (bpmString === undefined) {
        return [];
    }
    let bpmArray: [number, number][] = parseFloatEqualsFloatPattern(bpmString);
    let bpms: BpmEntry[] = [];
    for (let i = 0; i < bpmArray.length; i++) {
        bpms.push({beat: bpmArray[i][0], bpm: bpmArray[i][1]});
    }
    return bpms;
}

function parseStops(stopsString: string): StopEntry[] {
    if (stopsString === undefined) {
        return [];
    }
    let stopsArray: [number, number][] = parseFloatEqualsFloatPattern(stopsString);
    let stops: StopEntry[] = [];
    for (let i = 0; i < stopsArray.length; i++) {
        stops.push({beat: stopsArray[i][0], stopDuration: stopsArray[i][1]});
    }
    return stops;
}

function parseFloatEqualsFloatPattern(string: string) {
    let stringArray: string[][] = string.split(",").map(e => e.trim().split("="));
    let array: [number, number][] = [];
    for (let i = 0; i < stringArray.length; i++) {
        array.push([parseFloat(stringArray[i][0]), parseFloat(stringArray[i][1])]);
    }
    return array;
}