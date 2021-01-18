import {Config} from "./config";
import {Accuracy} from "./accuracy_manager";
import {AccuracyEvent} from "./accuracy_event";

export abstract class AccuracyUtil {
    public static BOO_NOTE_INDEX_FLAG = -1;
    public static BOO_ACCURACY_FLAG = Infinity;
    public static MISS_ACCURACY_FLAG = -Infinity;

    public static isConfiguredForBoos(config: Config): boolean {
        return config.accuracySettings[config.accuracySettings.length - 1].upperBound === null;
    }

    public static getAccuracyEventName(timeDifferenceInMilliseconds: number, config: Config): string {
        if (config.accuracySettings[0].lowerBound === null &&
            timeDifferenceInMilliseconds < config.accuracySettings[0].upperBound) {
            return config.accuracySettings[0].name; // Handle miss if it exists
        }
        if (this.isConfiguredForBoos(config) &&
            timeDifferenceInMilliseconds >= config.accuracySettings[config.accuracySettings.length - 1].lowerBound) {
            return config.accuracySettings[config.accuracySettings.length - 1].name; // Handle boo if it exists
        }
        for (let i = 0; i < config.accuracySettings.length; i++) {
            let accuracy: Accuracy = config.accuracySettings[i];
            if (accuracy.lowerBound !== null && accuracy.upperBound !== null) {
                if (accuracy.lowerBound < timeDifferenceInMilliseconds && timeDifferenceInMilliseconds <= accuracy.upperBound) {
                    return accuracy.name;
                }
            }
        }
        return "ERROR: Unknown accuracy";
    }

    // Returns a rank where 1 is the best
    public static getAccuracyRank(accuracyEvent: AccuracyEvent | { accuracyMillis: number }, config: Config) {
        let accuracies: Accuracy[] = config.accuracySettings;
        if (accuracyEvent.accuracyMillis < 0) {
            accuracies = this.getReversed(accuracies);
        }
        let bestAccuracyIndex = this.getBestAccuracyIndex(accuracies);
        let currentRank = 1;
        for (let i = bestAccuracyIndex; i < accuracies.length; i++) {
            let accuracy = accuracies[i];
            if (accuracy.lowerBound < accuracyEvent.accuracyMillis && accuracyEvent.accuracyMillis <= accuracy.upperBound) {
                return currentRank;
            }
            currentRank++;
        }
    }

    private static getReversed(array: any[]) {
        let arrayCopy: any[] = [];
        for (let i = array.length - 1; i >= 0; i--) {
            arrayCopy.push(array[i]);
        }
        return arrayCopy;
    }

    public static getBestAccuracyIndex(accuracies: Accuracy[]) {
        for (let i = 0; i < accuracies.length; i++) {
            let accuracy: Accuracy = accuracies[i];
            if (accuracy.lowerBound < 0 && 0 <= accuracy.upperBound) {
                return i;
            }
        }
        return null;
    }

    public static eventIsAHit(accuracyEvent: { accuracyMillis: number }, config: Config) {
        return !this.eventIsABoo(accuracyEvent, config) &&
            !this.eventIsAMiss(accuracyEvent, config);
    }

    public static eventIsABoo(accuracyEvent: { accuracyMillis: number }, config: Config) {
        let accuracies = config.accuracySettings;
        return accuracies[accuracies.length - 1].upperBound === null &&
            accuracyEvent.accuracyMillis >= accuracies[accuracies.length - 1].lowerBound;
    }

    public static eventIsAMiss(accuracyEvent: { accuracyMillis: number }, config: Config) {
        let accuracies = config.accuracySettings;
        return accuracies[0].lowerBound === null &&
            accuracyEvent.accuracyMillis < accuracies[0].upperBound;
    }

    // Assumes symmetrical accuracy settings
    public static countDifferentHitAccuracies(config: Config): number {
        let accuracies: Accuracy[] = config.accuracySettings;
        let bestAccuracyIndex = AccuracyUtil.getBestAccuracyIndex(accuracies);
        let numRanks = 1; // start with 1 because we at least have the best rank
        for (let i = bestAccuracyIndex + 1; i < accuracies.length; i++) {
            let accuracy: Accuracy = accuracies[i];
            if (accuracy.lowerBound !== undefined && accuracy.upperBound !== undefined) {
                numRanks++;
            }
        }
        return numRanks
    }

    public static isBounded(accuracy: Accuracy) {
        return accuracy.lowerBound !== null && accuracy.upperBound !== null;
    }

    public static getEarliestMillis(config: Config): number {
        if (this.isConfiguredForBoos(config)) {
            return config.accuracySettings[config.accuracySettings.length - 1].lowerBound;
        } else {
            return config.accuracySettings[config.accuracySettings.length - 1].upperBound;
        }
    }

    public static getLatestMillis(config: Config): number {
        return config.accuracySettings[0].upperBound;
    }
}