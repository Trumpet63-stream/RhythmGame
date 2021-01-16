import {Note, NoteState, NoteType} from "./note";

export class NoteManager {
    public tracks: Note[][];

    constructor(tracks: Note[][]) {
        this.tracks = tracks;
        this.removeUnsupportedNoteTypes();
        this.setAllNotesToDefaultState();
    }

    private removeUnsupportedNoteTypes() {
        let supportedNoteTypes: NoteType[] = [NoteType.TAIL, NoteType.HOLD_HEAD, NoteType.NORMAL];

        for (let trackNumber = 0; trackNumber < this.tracks.length; trackNumber++) {
            let track: Note[] = this.tracks[trackNumber];
            for (let noteNumber = 0; noteNumber < track.length; noteNumber++) {
                let note: Note = track[noteNumber];
                if (!supportedNoteTypes.includes(note.type)) {
                    track.splice(noteNumber, 1);
                    noteNumber--;
                }
            }
        }
    }

    private setAllNotesToDefaultState() {
        for (let i = 0; i < this.tracks.length; i++) {
            for (let j = 0; j < this.tracks[i].length; j++) {
                this.tracks[i][j].state = NoteState.DEFAULT;
            }
        }
    }

    public getNotesByTimeRange(leastTime: number, greatestTime: number, trackNumber: number): { startIndex: number, endIndexNotInclusive: number } {
        let track = this.tracks[trackNumber];
        let firstFindResult = this.findIndexOfFirstNoteAfterTime(leastTime, track);
        if (firstFindResult < 0) {
            return {startIndex: -1, endIndexNotInclusive: -1}; // no notes left after least time
        }
        let lastFindResult = this.findIndexOfFirstNoteAfterTime(greatestTime, track, firstFindResult);
        if (lastFindResult < 0) {
            lastFindResult = track.length; // greatestTime exceeds the end of the notes
        }
        if (firstFindResult === 0) {
            if (lastFindResult === 0) {
                return {startIndex: -1, endIndexNotInclusive: -1}; // haven't seen first note
            } else {
                return {startIndex: 0, endIndexNotInclusive: lastFindResult}; // notes are just starting
            }
        }
        return {startIndex: firstFindResult, endIndexNotInclusive: lastFindResult};
    }

    // This function assumes that no two notes will have the same time in the same track
    public findIndexOfFirstNoteAfterTime(keyTime: number, track: Note[], searchStart = 0) {
        for (let i = searchStart; i < track.length; i++) {
            if (track[i].timeInSeconds > keyTime) {
                return i;
            }
        }
        return -1;
    }

    public getEarliestNote(): Note {
        let earliestNote: Note;
        for (let i = 0; i < this.tracks.length; i++) {
            if (this.tracks[i].length > 0) {
                let trackEarliestNote: Note = this.tracks[i][0];
                if (earliestNote === undefined) {
                    earliestNote = trackEarliestNote;
                } else if (earliestNote.timeInSeconds > trackEarliestNote.timeInSeconds) {
                    earliestNote = trackEarliestNote;
                }
            }
        }
        return earliestNote;
    }

    public getLatestNote(): Note {
        let latestNote: Note;
        for (let i = 0; i < this.tracks.length; i++) {
            if (this.tracks[i].length > 0) {
                let trackLatestNote: Note = this.tracks[i][this.tracks[i].length - 1];
                if (latestNote === undefined) {
                    latestNote = trackLatestNote;
                } else if (latestNote.timeInSeconds < trackLatestNote.timeInSeconds) {
                    latestNote = trackLatestNote;
                }
            }
        }
        return latestNote;
    }

    public getTotalNotes() {
        return this.tracks.reduce((sum, track) => sum + track.length, 0);
    }

    public getNoteByIndex(noteIndex: number): Note {
        let currentNoteIndices: number[] = [];
        for (let i = 0; i < this.tracks.length; i++) {
            currentNoteIndices.push(0);
        }

        let currentNote: Note;
        for (let i = 0; i <= noteIndex; i++) {
            let nextNotes: Note[] = this.getNextNoteFromEachTrack(currentNoteIndices);
            let earliestNote: Note = NoteManager.getEarliestNoteInArray(nextNotes);
            currentNoteIndices[earliestNote.trackNumber]++;
            currentNote = earliestNote;
        }

        return currentNote;
    }

    private getNextNoteFromEachTrack(currentNoteIndices: number[]): Note[] {
        let nextNotes: Note[] = [];
        for (let trackNumber = 0; trackNumber < this.tracks.length; trackNumber++) {
            let track = this.tracks[trackNumber];
            if (currentNoteIndices[trackNumber] < track.length) {
                nextNotes.push(track[currentNoteIndices[trackNumber]]);
            }
        }
        return nextNotes;
    }

    private static getEarliestNoteInArray(notes: Note[]) {
        let earliestNote: Note = notes[0];
        for (let i = 1; i < notes.length; i++) {
            if (notes[i].timeInSeconds < earliestNote.timeInSeconds) {
                earliestNote = notes[i];
            }
        }
        return earliestNote;
    }

    public hideAllNotesAfterIndex(noteIndex: number): void {
        let currentNoteIndices: number[] = [];
        for (let i = 0; i < this.tracks.length; i++) {
            currentNoteIndices.push(0);
        }

        for (let i = 0; i <= noteIndex; i++) {
            let nextNotes: Note[] = this.getNextNoteFromEachTrack(currentNoteIndices);
            let earliestNote: Note = NoteManager.getEarliestNoteInArray(nextNotes);
            currentNoteIndices[earliestNote.trackNumber]++;
        }

        this.allowHoldTails(currentNoteIndices);

        for (let trackNumber = 0; trackNumber < currentNoteIndices.length; trackNumber++) {
            let track = this.tracks[trackNumber];
            for (let i = currentNoteIndices[trackNumber]; i < track.length; i++) {
                track[i].state = NoteState.HIT;
            }
        }
    }

    private allowHoldTails(currentNoteIndices: number[]) {
        for (let trackNumber = 0; trackNumber < currentNoteIndices.length; trackNumber++) {
            let track = this.tracks[trackNumber];
            if (currentNoteIndices[trackNumber] < track.length) {
                let note: Note = track[currentNoteIndices[trackNumber]];
                if (note.type === NoteType.TAIL) {
                    currentNoteIndices[trackNumber]++;
                }
            }
        }
    }

    public getLatestUnhitNote(): Note {
        let latestNotes: Note[] = [];
        for (let trackNumber = 0; trackNumber < this.tracks.length; trackNumber++) {
            let latestUnhitNote = this.getLatestUnhitNoteInTrack(trackNumber);
            latestNotes.push(latestUnhitNote);
        }
        return NoteManager.getLatestNoteInArray(latestNotes);
    }

    private getLatestUnhitNoteInTrack(trackNumber: number) {
        let track = this.tracks[trackNumber];
        let latestUnhitNote;
        for (let i = 0; i < track.length; i++) {
            if (track[i].state === NoteState.DEFAULT) {
                latestUnhitNote = track[i];
            } else {
                return latestUnhitNote;
            }
        }
        return latestUnhitNote;
    }

    private static getLatestNoteInArray(notes: Note[]) {
        let latestNote: Note = notes[0];
        for (let i = 1; i < notes.length; i++) {
            if (notes[i].timeInSeconds > latestNote.timeInSeconds) {
                latestNote = notes[i];
            }
        }
        return latestNote;
    }
}
