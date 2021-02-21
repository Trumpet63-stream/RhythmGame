import {getRandomIntInclusive} from "../../util";

export class PatternProvider {
    private currentPatternIndex = -1;
    private patternLength: number;
    private numTracks: number;
    private callSequence: ((lastNoteTracks: number[]) => number[])[];

    public constructor(numTracks: number, chordSizeSequence: string[]) {
        this.numTracks = numTracks;
        this.patternLength = chordSizeSequence.length;
        this.callSequence = this.generateCallSequence(chordSizeSequence);
    }

    private generateCallSequence(chordSizeSequence: string[]): ((lastNoteTracks: number[]) => number[])[] {
        let callSequence: ((lastNoteTracks: number[]) => number[])[] = [];
        for (let i = 0; i < chordSizeSequence.length; i++) {
            switch (chordSizeSequence[i]) {
                case "1A":
                    callSequence.push((lastNoteTracks: number[]) => this.randomSingleNoteAvoidPrevious(lastNoteTracks));
                    break
                case "2A":
                    callSequence.push((lastNoteTracks: number[]) => this.randomJumpAvoidPrevious(lastNoteTracks));
                    break;
                case "3A":
                    callSequence.push((lastNoteTracks: number[]) => this.randomHandAvoidPrevious(lastNoteTracks));
                    break;
                case "1":
                    callSequence.push((lastNoteTracks: number[]) => this.randomSingleNote());
                    break
                case "2":
                    callSequence.push((lastNoteTracks: number[]) => this.randomJump());
                    break;
                case "3":
                    callSequence.push((lastNoteTracks: number[]) => this.randomHand());
                    break;
            }
        }
        return callSequence;
    }

    public getNextNoteTracks(lastNoteTracks: number[]): number[] {
        this.currentPatternIndex = (this.currentPatternIndex + 1) % this.patternLength;
        return this.callSequence[this.currentPatternIndex](lastNoteTracks);
    }

    private randomSingleNote(): number[] {
        let possibleNoteTracks: number[][] = [];
        for (let i = 0; i < this.numTracks; i++) {
            possibleNoteTracks.push([i]);
        }
        return this.chooseElementRandomly(possibleNoteTracks);
    }

    private randomSingleNoteAvoidPrevious(lastNoteTracks: number[]): number[] {
        let possibleNoteTracks: number[][] = [];
        for (let i = 0; i < this.numTracks; i++) {
            if (!lastNoteTracks.includes(i)) {
                possibleNoteTracks.push([i]);
            }
        }
        return this.chooseElementRandomly(possibleNoteTracks);
    }

    private randomJumpAvoidPrevious(lastNoteTracks: number[]): number[] {
        let possibleSingleNotes: number[] = [];
        for (let i = 0; i < this.numTracks; i++) {
            if (!lastNoteTracks.includes(i)) {
                possibleSingleNotes.push(i);
            }
        }

        let possibleNoteTracks: number[][] = []
        for (let i = 0; i < possibleSingleNotes.length - 1; i++) {
            for (let j = i + 1; j < possibleSingleNotes.length; j++) {
                possibleNoteTracks.push([possibleSingleNotes[i], possibleSingleNotes[j]]);
            }
        }

        return this.chooseElementRandomly(possibleNoteTracks);
    }

    private randomJump(): number[] {
        let possibleSingleNotes: number[] = [];
        for (let i = 0; i < this.numTracks; i++) {
            possibleSingleNotes.push(i);
        }

        let possibleNoteTracks: number[][] = []
        for (let i = 0; i < possibleSingleNotes.length - 1; i++) {
            for (let j = i + 1; j < possibleSingleNotes.length; j++) {
                possibleNoteTracks.push([possibleSingleNotes[i], possibleSingleNotes[j]]);
            }
        }

        return this.chooseElementRandomly(possibleNoteTracks);
    }

    private randomHand(): number[] {
        let possibleSingleNotes: number[] = [];
        for (let i = 0; i < this.numTracks; i++) {
            possibleSingleNotes.push(i);
        }

        let possibleNoteTracks: number[][] = []
        for (let i = 0; i < possibleSingleNotes.length - 2; i++) {
            for (let j = i + 1; j < possibleSingleNotes.length - 1; j++) {
                for (let k = j + 1; k < possibleSingleNotes.length; k++) {
                    possibleNoteTracks.push([possibleSingleNotes[i], possibleSingleNotes[j], possibleSingleNotes[k]]);
                }
            }
        }

        return this.chooseElementRandomly(possibleNoteTracks);
    }

    private randomHandAvoidPrevious(lastNoteTracks: number[]): number[] {
        let possibleSingleNotes: number[] = [];
        for (let i = 0; i < this.numTracks; i++) {
            if (!lastNoteTracks.includes(i)) {
                possibleSingleNotes.push(i);
            }
        }

        let possibleNoteTracks: number[][] = []
        for (let i = 0; i < possibleSingleNotes.length - 2; i++) {
            for (let j = i + 1; j < possibleSingleNotes.length - 1; j++) {
                for (let k = j + 1; k < possibleSingleNotes.length; k++) {
                    possibleNoteTracks.push([possibleSingleNotes[i], possibleSingleNotes[j], possibleSingleNotes[k]]);
                }
            }
        }

        return this.chooseElementRandomly(possibleNoteTracks);
    }

    private chooseElementRandomly(elements: any[]): any {
        return elements[getRandomIntInclusive(0, elements.length - 1)];
    }
}