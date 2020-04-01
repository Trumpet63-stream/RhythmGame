import {NoteManager} from "./note_manager";

/* This class is intended only to be used to store the hold state of key events for notes that can be held. This
    shouldn't be used for normal notes */
export class HoldManager {
    heldTracks: boolean[];
    private noteManager: NoteManager;

    constructor(numTracks: number) {
        this.heldTracks = [];
        for (let i = 0; i < numTracks; i++) {
            this.heldTracks.push(false);
        }
    }

    holdNote(trackNumber: number) {
        this.heldTracks[trackNumber] = true;
    }

    unHoldNote(trackNumber: number) {
        this.heldTracks[trackNumber] = false;
    }
}