/* This class is intended only to be used to store the hold state for notes that can be held. This shouldn't be used
   for normal notes or general keyboard state */
export class HoldManager {
    private heldTracks: boolean[];
    private onTrackHold: (trackNumber: number, currentTimeInSeconds?: number) => void;
    private onTrackUnhold: (trackNumber: number, currentTimeInSeconds?: number) => void;

    constructor(numTracks: number, onTrackHold: (trackNumber: number, currentTimeInSeconds?: number) => void,
                onTrackUnhold: (trackNumber: number, currentTimeInSeconds?: number) => void) {
        this.heldTracks = [];
        for (let i = 0; i < numTracks; i++) {
            this.heldTracks.push(false);
        }
        this.onTrackHold = onTrackHold;
        this.onTrackUnhold = onTrackUnhold;
    }

    public isTrackHeld(trackNumber: number) {
        return this.heldTracks[trackNumber];
    }

    public holdTrack(trackNumber: number, currentTimeInSeconds: number) {
        this.heldTracks[trackNumber] = true;
        this.onTrackHold(trackNumber, currentTimeInSeconds);
    }

    public unholdTrack(trackNumber: number, currentTimeInSeconds: number) {
        this.heldTracks[trackNumber] = false;
        this.onTrackUnhold(trackNumber, currentTimeInSeconds);
    }
}