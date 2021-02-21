import {createLabel, drawHeading, setElementCenterPositionRelative} from "../../ui_util";
import * as p5 from "p5";
import {global} from "../../index";
import {DOMWrapper} from "../../dom_wrapper";
import {initExperimentDisplay, isString, lerp, mapLinear} from "../../util";
import {PageManager, Pages} from "../page_manager";
import {MenuTable} from "../../menu_table";
import {getEnumReverseMap, getEnumValues} from "../../enum_util";

enum PatternOption {
    STREAM = "Stream",
    JUMPSTREAM_1_4 = "1:4 Jumpstream",
    JUMPSTREAM_1_2 = "1:2 Jumpstream",
    JUMPSTREAM_1_3 = "1:3 Jumpstream",
    JUMPSTREAM_2_3 = "2:3 Jumpstream",
    LIGHT_HANDSTREAM = "Light Handstream",
    HEAVY_HANDSTREAM = "Heavy Handstream",
    LIGHT_CHORDJACKS = "Light Chordjacks",
    MEDIUM_CHORDJACKS = "Medium Chordjacks",
    HEAVY_CHORDJACKS = "Heavy Chordjacks",
}

let PatternOptionsReverseLookup: Map<string, PatternOption> = getEnumReverseMap(PatternOption);

export abstract class ExperimentConfig {
    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);

        let playButtonId = "playButton";
        let playButton = DOMWrapper.create(() => {
            return p.createButton("Play");
        }, playButtonId);
        if (!playButton.alreadyExists) {
            playButton.element.addClass(global.globalClass);
            ExperimentConfig.setPlayButtonBehavior(playButton.element);
        }
        setElementCenterPositionRelative(playButton.element, 0.5, 0.75, 79, 30);

        let tableContents: p5.Element[][] = [];

        let difficultySliderContainer = DOMWrapper.create(() => p.createDiv(), "div");
        let leftValue: number = 5;
        let rightValue: number = 100;
        let initialValue = global.experimentConfig.hardStdDev;
        let initialRatio = mapLinear(leftValue, rightValue, 0, 1, initialValue);
        let difficultySliderId = "difficultySlider";
        let difficultyValueDisplayId = "difficultyValueDisplay";
        let difficultySlider = DOMWrapper.create(() => p.createSlider(0, 1, initialRatio, 0), difficultySliderId);
        if (!difficultySlider.alreadyExists) {
            difficultySlider.element.id(difficultySliderId);
        }
        let initialdifficultyValueDisplay: string = this.getdifficultyValueDisplay(initialValue);
        let difficultyValueDisplay = DOMWrapper.create(() => p.createElement("div", initialdifficultyValueDisplay), difficultyValueDisplayId);
        if (!difficultySlider.alreadyExists) {
            difficultyValueDisplay.element.addClass(global.globalClass);
            // @ts-ignore
            difficultySlider.element.input(() => {
                let value: number = <number>difficultySlider.element.value();
                let mappedValue: number = lerp(leftValue, rightValue, value);
                global.experimentConfig.hardStdDev = mappedValue;
                difficultyValueDisplay.element.html(this.getdifficultyValueDisplay(mappedValue));
            })

            difficultySliderContainer.element.child(difficultyValueDisplay.element);
            difficultySliderContainer.element.child(difficultySlider.element);
        }
        let difficultySliderLabel = DOMWrapper.create(() => createLabel(p, "Max Difficulty", difficultySliderId), "difficultySliderLabel");

        tableContents.push([difficultySliderLabel.element, difficultySliderContainer.element]);

        let numTracksSliderContainer = DOMWrapper.create(() => p.createDiv(), "numTracksSliderContainer");
        let numTracksSliderId = "numTracksSlider";
        let numTracksValueDisplayId = "numTracksValueDisplay";
        let initialNumTracks: number = global.experimentConfig.numTracks;
        let initialnumTracksValueDisplay: string = this.getnumTracksValueDisplay(initialNumTracks);
        let numTracksSlider = DOMWrapper.create(() => p.createSlider(4, 10, initialNumTracks, 1), numTracksSliderId);
        if (!numTracksSlider.alreadyExists) {
            numTracksSlider.element.id(numTracksSliderId);
        }
        let numTracksValueDisplay = DOMWrapper.create(() => p.createDiv(initialnumTracksValueDisplay), numTracksValueDisplayId);
        if (!numTracksSlider.alreadyExists) {
            numTracksValueDisplay.element.addClass(global.globalClass);
            // @ts-ignore
            numTracksSlider.element.input(() => {
                let value: number = <number>numTracksSlider.element.value();
                global.experimentConfig.numTracks = value;
                numTracksValueDisplay.element.html(this.getnumTracksValueDisplay(value));
            })
            numTracksSliderContainer.element.child(numTracksValueDisplay.element);
            numTracksSliderContainer.element.child(numTracksSlider.element);
        }
        let numTracksSliderLabel = DOMWrapper.create(() => createLabel(p, "Number of Tracks", numTracksSliderId), "numTracksSliderLabel");

        tableContents.push([numTracksSliderLabel.element, numTracksSliderContainer.element]);

        let patternSelectContainer = DOMWrapper.create(() => p.createDiv(), "patternSelectContainer");
        let patternSelectId = "patternSelect";
        let initialPattern: string = global.experimentConfig.patternSelected;
        let patternSelect = DOMWrapper.create(() => p.createSelect(), "patternSelect");
        if (!patternSelect.alreadyExists) {
            let patternValues: string[] = getEnumValues(PatternOption);
            for (let i = 0; i < patternValues.length; i++) {
                // @ts-ignore
                patternSelect.element.option(patternValues[i]);
            }

            // @ts-ignore
            patternSelect.element.input(() => {
                let value: number | string = patternSelect.element.value();
                if (isString(value)) {
                    let valueString: string = <string>value;
                    let patternOption: undefined | PatternOption = PatternOptionsReverseLookup.get(valueString);
                    if (patternOption !== undefined) {
                        let chordSizeSequence: string[] = this.getChordSizeSequenceForPattern(<PatternOption>valueString);
                        global.experimentConfig.patternSelected = valueString;
                        global.experimentConfig.chordSizeSequence = chordSizeSequence;
                    }
                }
            });
            // @ts-ignore
            patternSelect.element.selected(initialPattern);
            patternSelectContainer.element.child(patternSelect.element);
        }
        let patternSelectLabel = DOMWrapper.create(() => createLabel(p, "Pattern", patternSelectId), "patternSelectLabel");
        tableContents.push([patternSelectLabel.element, patternSelectContainer.element]);

        let menuTable = MenuTable.create("uniqueId", 400, 200, [50, 50], tableContents);
        setElementCenterPositionRelative(menuTable.element, 0.5, 0.35, 400, 200);
    }

    private static getChordSizeSequenceForPattern(pattern: PatternOption): string[] {
        switch (pattern) {
            case PatternOption.STREAM:
                return ["1A"];
            case PatternOption.JUMPSTREAM_1_4:
                return ["1A", "1A", "1A", "2A"];
            case PatternOption.JUMPSTREAM_1_2:
                return ["1A", "2A"];
            case PatternOption.JUMPSTREAM_1_3:
                return ["1A", "1A", "2A"];
            case PatternOption.JUMPSTREAM_2_3:
                return ["1A", "2A", "2A"];
            case PatternOption.LIGHT_HANDSTREAM:
                return ["1A", "1A", "1A", "3A"]
            case PatternOption.HEAVY_HANDSTREAM:
                return ["1A", "2A", "1A", "3A"];
            case PatternOption.LIGHT_CHORDJACKS:
                return ["2"];
            case PatternOption.MEDIUM_CHORDJACKS:
                return ["2", "2", "3"];
            case PatternOption.HEAVY_CHORDJACKS:
                return ["2", "3"];
        }
    }

    private static getdifficultyValueDisplay(mappedValue: number): string {
        let difficultyWord: string = "";
        if (mappedValue <= 15) {
            difficultyWord = "Very Easy";
        } else if (15 < mappedValue && mappedValue <= 30) {
            difficultyWord = "Easy";
        } else if (30 < mappedValue && mappedValue <= 45) {
            difficultyWord = "Medium";
        } else if (45 < mappedValue && mappedValue <= 60) {
            difficultyWord = "Hard";
        } else if (60 < mappedValue && mappedValue <= 80) {
            difficultyWord = "Very Hard";
        } else {
            difficultyWord = "Insane";
        }
        return difficultyWord;
    }

    private static getnumTracksValueDisplay(mappedValue: number): string {
        return String(mappedValue);
    }

    private static setPlayButtonBehavior(playButton: p5.Element) {
        playButton.mouseClicked(() => {
            initExperimentDisplay(global.experimentConfig.numTracks, Pages.EXPERIMENT_CONFIG, "Experiment")
            PageManager.setCurrentPage(Pages.EXPERIMENT);
        });
    }
}