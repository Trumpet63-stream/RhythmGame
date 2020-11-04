// Calculates the fraction of the beat associated with a measure position, ex: 4th, 8th, 24th, etc.
export abstract class RhythmClassifier {
    public static getBeatFraction(measureDivisions: number, measurePosition: number): number {
        for (let divisor = measureDivisions; divisor > 1; divisor--) {
            if ((measureDivisions % divisor === 0) &&
                (measurePosition % divisor === 0)) {
                return measureDivisions / divisor;
            }
        }
        return measureDivisions;
    }
}