import {Config} from "./config";
import {Accuracy} from "./accuracy_manager";

export abstract class AccuracyUtil {
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
}