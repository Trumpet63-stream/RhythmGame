import {NoteManager} from "./note_manager";

/* This class is intended only to be used to store the hold state of key events for notes that can be held. This
    shouldn't be used for normal notes */
export class HoldManager {
    private heldTracks: boolean[];
    private noteManager: NoteManager;

    constructor(numTracks: number) {
        this.heldTracks = [];
        for (let i = 0; i < numTracks; i++) {
            this.heldTracks.push(false);
        }
    }

    public isTrackHeld(trackNumber: number) {
        return this.heldTracks[trackNumber];
    }

    public holdTrack(trackNumber: number) {
        this.heldTracks[trackNumber] = true;
    }

    public unholdTrack(trackNumber: number) {
        console.log("unhold track " + (trackNumber + 1));
        this.heldTracks[trackNumber] = false;
    }
}