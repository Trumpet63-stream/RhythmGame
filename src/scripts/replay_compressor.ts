import {AccuracyRecordingEntry} from "./accuracy_recording";
import {NoteType} from "./note";

interface UncompressedEntries {
    trackNumbers: number[];
    noteIndices: number[];
    timesInSeconds: number[];
    accuraciesMillis: number[];
    noteTypes: NoteType[];
}

interface CompressedEntries {
    trackNumbers: string;
    noteIndices: string;
    timesInSeconds: string;
    accuraciesMillis: string;
    noteTypes: string;
}

export abstract class ReplayCompressor {
    private static readonly DELETE_FLAG_8BIT: number = 255;

    public static compress(linearRecording: AccuracyRecordingEntry[]): string {
        let uncompressed: UncompressedEntries = this.getUncompressedReplay(linearRecording);
        let compressed: CompressedEntries = {
            trackNumbers: this.compressTracks(uncompressed.trackNumbers),
            noteIndices: this.compressIndices(uncompressed.noteIndices),
            timesInSeconds: this.compressTimes(uncompressed.timesInSeconds),
            accuraciesMillis: this.compressAccuracies(uncompressed.accuraciesMillis),
            noteTypes: this.compressNoteTypes(uncompressed.noteTypes)
        }
        return JSON.stringify(compressed);
    }

    public static uncompress(string: string): AccuracyRecordingEntry[] {
        let compressed: CompressedEntries = JSON.parse(string);
        let uncompressed: UncompressedEntries = {
            trackNumbers: this.uncompressTracks(compressed.trackNumbers),
            noteIndices: this.uncompressIndices(compressed.noteIndices),
            timesInSeconds: this.uncompressTimes(compressed.timesInSeconds),
            accuraciesMillis: this.uncompressAccuracies(compressed.accuraciesMillis),
            noteTypes: this.uncompressNoteTypes(compressed.noteTypes)
        }
        return this.getAccuracyRecordingEntries(uncompressed);
    }

    private static getUncompressedReplay(linearRecording: AccuracyRecordingEntry[]): UncompressedEntries {
        let trackNumbers: number[] = [];
        let noteIndices: number[] = [];
        let timesInSeconds: number[] = [];
        let accuraciesMillis: number[] = [];
        let noteTypes: NoteType[] = [];

        for (let i = 0; i < linearRecording.length; i++) {
            let entry: AccuracyRecordingEntry = linearRecording[i];
            trackNumbers.push(entry.trackNumber);
            noteIndices.push(entry.noteIndex);
            timesInSeconds.push(entry.timeInSeconds);
            accuraciesMillis.push(entry.accuracyMillis);
            noteTypes.push(entry.noteType);
        }
        return {
            trackNumbers: trackNumbers,
            noteIndices: noteIndices,
            timesInSeconds: timesInSeconds,
            accuraciesMillis: accuraciesMillis,
            noteTypes: noteTypes
        }
    }

    private static getAccuracyRecordingEntries(uncompressedReplay: UncompressedEntries): AccuracyRecordingEntry[] {
        let entries: AccuracyRecordingEntry[] = []
        for (let i = 0; i < uncompressedReplay.trackNumbers.length; i++) {
            entries.push({
                trackNumber: uncompressedReplay.trackNumbers[i],
                noteIndex: uncompressedReplay.noteIndices[i],
                timeInSeconds: uncompressedReplay.timesInSeconds[i],
                accuracyMillis: uncompressedReplay.accuraciesMillis[i],
                noteType: uncompressedReplay.noteTypes[i]
            });
        }
        return entries;
    }

    private static compressTracks(numbers: number[]): string {
        return this.compress8BitNumbers(numbers)
    }

    private static uncompressTracks(string: string): number[] {
        return this.uncompress8BitNumbers(string);
    }

    private static compressIndices(numbers: number[]): string {
        return this.compressFloats(numbers);
    }

    private static uncompressIndices(string: string): number[] {
        return this.uncompressFloats(string);
    }

    private static compressTimes(numbers: number[]): string {
        return this.compressFloats(numbers);
    }

    private static uncompressTimes(string: string): number[] {
        return this.uncompressFloats(string);
    }

    private static compressAccuracies(numbers: number[]): string {
        return this.compressFloats(numbers);
    }

    private static uncompressAccuracies(string: string): number[] {
        return this.uncompressFloats(string);
    }

    private static compressNoteTypes(noteTypes: NoteType[]): string {
        return this.compress8BitNumbers(noteTypes);
    }

    private static uncompressNoteTypes(string: string): NoteType[] {
        return this.uncompress8BitNumbers(string);
    }

    private static compressFloats(numbers: number[]): string {
        let typed: Float64Array = new Float64Array(numbers);
        let split: Uint16Array = new Uint16Array(typed.buffer);
        return this.decodeUTF8String(split);
    }

    private static uncompressFloats(string: string): number[] {
        let split: Uint16Array = this.encodeUTF8String(string);
        let typed: Float64Array = new Float64Array(split.buffer);
        return Array.from(typed);
    }

    private static compress8BitNumbers(numbers: number[]): string {
        let converted: Uint8Array;
        if (numbers.length % 2 !== 0) {
            converted = new Uint8Array(numbers.concat([ReplayCompressor.DELETE_FLAG_8BIT]));
        } else {
            converted = new Uint8Array(numbers);
        }
        let merged: Uint16Array = new Uint16Array(converted.buffer);
        return this.decodeUTF8String(merged);
    }

    private static uncompress8BitNumbers(string: string): number[] {
        let codes: Uint16Array = this.encodeUTF8String(string);
        let split: Uint8Array = new Uint8Array(codes.buffer);
        let numbers: number[] = Array.from(split);
        if (numbers[numbers.length - 1] === ReplayCompressor.DELETE_FLAG_8BIT) {
            numbers.pop();
        }
        return numbers;
    }

    private static decodeUTF8String(array: Uint16Array): string {
        let string: string = "";
        for (let i = 0; i < array.length; i++) {
            string += String.fromCharCode(array[i]);
        }
        return string;
    }

    private static encodeUTF8String(string: string): Uint16Array {
        let characters: string[] = string.split("");
        let numbers: number[] = [];
        for (let i = 0; i < characters.length; i++) {
            numbers.push(characters[i].charCodeAt(0));
        }
        return new Uint16Array(numbers);
    }
}