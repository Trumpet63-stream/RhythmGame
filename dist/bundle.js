var rhythmgame =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/accuracy_feedback_flash.ts":
/*!************************************************!*\
  !*** ./src/scripts/accuracy_feedback_flash.ts ***!
  \************************************************/
/*! exports provided: AccuracyFeedbackFlash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccuracyFeedbackFlash", function() { return AccuracyFeedbackFlash; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");

class AccuracyFeedbackFlash {
    constructor(accuracyRecording, config, displayManager, numTracks) {
        this.accuracyRecording = accuracyRecording;
        this.config = config;
        this.displayManager = displayManager;
        this.numTracks = numTracks;
        this.numColoredAccuracyRanks = this.getNumColoredAccuracyRanks(this.config.accuracySettings);
        this.accuracyColors = [
            [178, 94, 247, 180],
            [30, 217, 124, 160],
            [196, 199, 30, 140],
            [245, 213, 221, 120]
        ];
        while (this.numColoredAccuracyRanks > this.accuracyColors.length) {
            this.accuracyColors.push([this.getRandomInt(255), this.getRandomInt(255), this.getRandomInt(255), 100]);
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    draw(currentTimeInSeconds) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            this.drawFlashForTrack(trackNumber, currentTimeInSeconds);
        }
    }
    drawFlashForTrack(trackNumber, currentTimeInSeconds) {
        let mostRecentAccuracyRecordingEntry = this.getTrackMostRecentAccuracyRecordingEntry(trackNumber);
        if (this.isFlashHappening(currentTimeInSeconds, mostRecentAccuracyRecordingEntry)) {
            let centerX = this.displayManager.getNoteCenterX(trackNumber, this.numTracks);
            let centerY = this.displayManager.getNoteCenterY(currentTimeInSeconds, currentTimeInSeconds);
            let flashColor = this.getFlashColor(mostRecentAccuracyRecordingEntry);
            let elapsedTimeInSeconds = this.getElapsedTimeInSeconds(currentTimeInSeconds, mostRecentAccuracyRecordingEntry);
            this.drawFlash(elapsedTimeInSeconds, centerX, centerY, flashColor);
        }
    }
    isFlashHappening(currentTimeInSeconds, accuracyEvent) {
        if (accuracyEvent === null) {
            return false;
        }
        let accuracies = this.config.accuracySettings;
        if (accuracies[0].lowerBound == null &&
            accuracyEvent.accuracyMillis < accuracies[0].upperBound) {
            return false; // Handle miss if it exists
        }
        if (accuracies[accuracies.length - 1].upperBound == null &&
            accuracyEvent.accuracyMillis >= accuracies[accuracies.length - 1].lowerBound) {
            return false; // Handle boo if it exists
        }
        let elapsedTimeInSeconds = this.getElapsedTimeInSeconds(currentTimeInSeconds, accuracyEvent);
        if (elapsedTimeInSeconds > AccuracyFeedbackFlash.flashDurationInSeconds) {
            return false;
        }
        return true;
    }
    getElapsedTimeInSeconds(currentTimeInSeconds, accuracyEvent) {
        return currentTimeInSeconds - accuracyEvent.timeInSeconds;
    }
    getTrackMostRecentAccuracyRecordingEntry(trackNumber) {
        let track = this.accuracyRecording.recording[trackNumber];
        if (track.length > 0) {
            return this.accuracyRecording.recording[trackNumber][track.length - 1];
        }
        else {
            return null;
        }
    }
    // Assumes symmetrical accuracy settings
    getFlashColor(accuracyEvent) {
        let accuracies = this.config.accuracySettings;
        let accuracyRank = this.getAccuracyRank(accuracyEvent, accuracies);
        let colorValues = this.accuracyColors[accuracyRank - 1];
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        return p.color(colorValues[0], colorValues[1], colorValues[2], colorValues[3]);
    }
    // Assumes symmetrical accuracy settings
    getNumColoredAccuracyRanks(accuracies) {
        let bestAccuracyIndex = this.getBestAccuracyIndex(accuracies);
        let numRanks = 1; // start with 1 because we at least have the best rank
        for (let i = bestAccuracyIndex + 1; i < accuracies.length; i++) {
            let accuracy = accuracies[i];
            if (accuracy.lowerBound !== undefined && accuracy.upperBound !== undefined) {
                numRanks++;
            }
        }
        return numRanks;
    }
    getBestAccuracyIndex(accuracies) {
        for (let i = 0; i < accuracies.length; i++) {
            let accuracy = accuracies[i];
            if (accuracy.lowerBound < 0 && 0 <= accuracy.upperBound) {
                return i;
            }
        }
        return null;
    }
    // Returns a rank where 1 is the best
    getAccuracyRank(accuracyEvent, accuracies) {
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
    getReversed(array) {
        let arrayCopy = [];
        for (let i = array.length - 1; i >= 0; i--) {
            arrayCopy.push(array[i]);
        }
        return arrayCopy;
    }
    drawFlash(elapsedTimeInSeconds, centerX, centerY, color) {
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        let flashSize = this.getFlashSize(elapsedTimeInSeconds, AccuracyFeedbackFlash.flashDurationInSeconds);
        p.push();
        p.translate(centerX, centerY);
        p.fill(color);
        // p.fill(255, 255, 255, 150);
        p.noStroke();
        this.drawStar(p, 0, 0, flashSize, flashSize * 0.4, 4);
        p.pop();
    }
    getFlashSize(elapsedTimeInSeconds, flashDurationInSeconds) {
        let flashCompletionRatio = elapsedTimeInSeconds / flashDurationInSeconds;
        let minSize = 0;
        let maxSize = this.config.noteSize;
        return this.interpolate(minSize, maxSize, flashCompletionRatio);
    }
    interpolate(minValue, maxValue, ratio) {
        if (ratio <= 0) {
            return minValue;
        }
        else if (ratio > 0 && ratio < 1) {
            return minValue + (maxValue - minValue) * ratio;
        }
        else {
            return maxValue;
        }
    }
    drawStar(p, centerX, centerY, radius1, radius2, npoints) {
        p.push();
        p.angleMode(p.RADIANS);
        let angle = p.TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += angle) {
            let sx = centerX + p.cos(a) * radius2;
            let sy = centerY + p.sin(a) * radius2;
            p.vertex(sx, sy);
            sx = centerX + p.cos(a + halfAngle) * radius1;
            sy = centerY + p.sin(a + halfAngle) * radius1;
            p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
        p.pop();
    }
}
AccuracyFeedbackFlash.flashDurationInSeconds = 0.1;


/***/ }),

/***/ "./src/scripts/accuracy_feedback_particles.ts":
/*!****************************************************!*\
  !*** ./src/scripts/accuracy_feedback_particles.ts ***!
  \****************************************************/
/*! exports provided: AccuracyFeedbackParticles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccuracyFeedbackParticles", function() { return AccuracyFeedbackParticles; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _scroll_direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scroll_direction */ "./src/scripts/scroll_direction.ts");
/* harmony import */ var _particle_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./particle_system */ "./src/scripts/particle_system.ts");



class AccuracyFeedbackParticles {
    constructor(config, displayManager, numTracks) {
        this.config = config;
        this.displayManager = displayManager;
        this.numTracks = numTracks;
        this.numColoredAccuracyRanks = this.getNumColoredAccuracyRanks(this.config.accuracySettings);
        this.particleSettings = [
            [178, 94, 247, 30],
            [30, 217, 124, 25],
            [196, 199, 30, 20],
            [245, 213, 221, 15]
        ];
        while (this.numColoredAccuracyRanks > this.particleSettings.length) {
            this.particleSettings.push([this.getRandomInt(255), this.getRandomInt(255), this.getRandomInt(255), 20]);
        }
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        this.gravityDirection = config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_1__["ScrollDirection"].Down ? 1 : -1;
        let gravity = p.createVector(0, 2000 * this.gravityDirection);
        this.particleSystems = [];
        for (let i = 0; i < this.numTracks; i++) {
            this.particleSystems.push(new _particle_system__WEBPACK_IMPORTED_MODULE_2__["ParticleSystem"](AccuracyFeedbackParticles.particlesLifetimeInSeconds, gravity));
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    draw(currentTimeInSeconds) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            this.particleSystems[trackNumber].draw(currentTimeInSeconds);
        }
    }
    addParticlesForAccuracyEvent(accuracyEvent) {
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        if (this.isEventForParticles(accuracyEvent)) {
            let receptorTimePosition = accuracyEvent.timeInSeconds - accuracyEvent.accuracyMillis / 1000;
            let initialPosition = this.getInitialPosition(p, accuracyEvent.trackNumber, this.numTracks, receptorTimePosition);
            let initialVelocity = p.createVector(0, -500 * this.gravityDirection);
            let particleSettings = this.getParticleSettings(accuracyEvent);
            this.particleSystems[accuracyEvent.trackNumber].addRandomizedParticles(initialPosition, initialVelocity, accuracyEvent.timeInSeconds, particleSettings.numParticles, particleSettings.color);
        }
    }
    getInitialPosition(p, trackNumber, numTracks, centerTimeInSeconds) {
        let centerX = this.displayManager.getNoteCenterX(trackNumber, numTracks);
        let centerY = this.displayManager.getNoteCenterY(centerTimeInSeconds, centerTimeInSeconds);
        return p.createVector(centerX, centerY);
    }
    isEventForParticles(accuracyEvent) {
        let accuracies = this.config.accuracySettings;
        if (accuracies[0].lowerBound == null &&
            accuracyEvent.accuracyMillis < accuracies[0].upperBound) {
            return false; // Handle miss if it exists
        }
        if (accuracies[accuracies.length - 1].upperBound == null &&
            accuracyEvent.accuracyMillis >= accuracies[accuracies.length - 1].lowerBound) {
            return false; // Handle boo if it exists
        }
        return true;
    }
    // Assumes symmetrical accuracy settings
    getParticleSettings(accuracyEvent) {
        let accuracies = this.config.accuracySettings;
        let accuracyRank = this.getAccuracyRank(accuracyEvent, accuracies);
        let particleSettings = this.particleSettings[accuracyRank - 1];
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        return { color: p.color(particleSettings[0], particleSettings[1], particleSettings[2]),
            numParticles: particleSettings[3] };
    }
    // Assumes symmetrical accuracy settings
    getNumColoredAccuracyRanks(accuracies) {
        let bestAccuracyIndex = this.getBestAccuracyIndex(accuracies);
        let numRanks = 1; // start with 1 because we at least have the best rank
        for (let i = bestAccuracyIndex + 1; i < accuracies.length; i++) {
            let accuracy = accuracies[i];
            if (accuracy.lowerBound !== undefined && accuracy.upperBound !== undefined) {
                numRanks++;
            }
        }
        return numRanks;
    }
    getBestAccuracyIndex(accuracies) {
        for (let i = 0; i < accuracies.length; i++) {
            let accuracy = accuracies[i];
            if (accuracy.lowerBound < 0 && 0 <= accuracy.upperBound) {
                return i;
            }
        }
        return null;
    }
    // Returns a rank where 1 is the best
    getAccuracyRank(accuracyEvent, accuracies) {
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
    getReversed(array) {
        let arrayCopy = [];
        for (let i = array.length - 1; i >= 0; i--) {
            arrayCopy.push(array[i]);
        }
        return arrayCopy;
    }
}
AccuracyFeedbackParticles.particlesLifetimeInSeconds = 1.5;


/***/ }),

/***/ "./src/scripts/accuracy_feedback_text.ts":
/*!***********************************************!*\
  !*** ./src/scripts/accuracy_feedback_text.ts ***!
  \***********************************************/
/*! exports provided: AccuracyFeedbackText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccuracyFeedbackText", function() { return AccuracyFeedbackText; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");


class AccuracyFeedbackText {
    constructor(accuracyRecording, centerX, centerY, config) {
        this.accuracyRecording = accuracyRecording;
        this.centerX = centerX;
        this.centerY = centerY;
        this.config = config;
    }
    draw(currentTimeInSeconds) {
        let lastEvent = this.getMostRecentAccuracyRecordingEntry();
        if (lastEvent === null) {
            return;
        }
        let timeSinceLastEvent = currentTimeInSeconds - lastEvent.timeInSeconds;
        let textSize = this.getFontSize(timeSinceLastEvent);
        if (textSize <= 0) {
            return;
        }
        let eventName = Object(_util__WEBPACK_IMPORTED_MODULE_1__["getAccuracyEventName"])(lastEvent.accuracyMillis, this.config);
        this.drawEventText(eventName, textSize);
    }
    getMostRecentAccuracyRecordingEntry() {
        let mostRecentTrack = [];
        let greatestTime = Number.NEGATIVE_INFINITY;
        for (let trackNumber = 0; trackNumber < this.accuracyRecording.recording.length; trackNumber++) {
            let track = this.accuracyRecording.recording[trackNumber];
            if (track.length > 0) {
                let lastEventTime = this.accuracyRecording.recording[trackNumber][track.length - 1].timeInSeconds;
                if (lastEventTime > greatestTime) {
                    greatestTime = lastEventTime;
                    mostRecentTrack = track;
                }
            }
        }
        if (mostRecentTrack.length === 0) {
            return null;
        }
        return mostRecentTrack[mostRecentTrack.length - 1];
    }
    getFontSize(time) {
        let maxFontSize = 30;
        if (time < 0.1) {
            return time / 0.1 * maxFontSize;
        }
        else if (time >= 0.1 && time < 0.4) {
            return maxFontSize;
        }
        else if (time >= 0.4 && time < 0.7) {
            return (1 - (time - 0.4) / (0.7 - 0.4)) * maxFontSize;
        }
        return 0;
    }
    drawEventText(text, textSize) {
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        p.push();
        p.textAlign(p.CENTER, p.CENTER);
        p.fill("white");
        p.textSize(textSize);
        p.text(text, this.centerX, this.centerY);
        p.pop();
    }
}


/***/ }),

/***/ "./src/scripts/accuracy_manager.ts":
/*!*****************************************!*\
  !*** ./src/scripts/accuracy_manager.ts ***!
  \*****************************************/
/*! exports provided: Accuracy, AccuracyManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Accuracy", function() { return Accuracy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccuracyManager", function() { return AccuracyManager; });
/* harmony import */ var _player_key_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player_key_action */ "./src/scripts/player_key_action.ts");
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");



class Accuracy {
    constructor(name, lowerBound, upperBound) {
        this.name = name;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }
}
class AccuracyManager {
    constructor(noteManager, config, holdManager, handleAccuracyEvent) {
        this.noteManager = noteManager;
        this.config = config;
        this.holdManager = holdManager;
        this.handleAccuracyEvent = handleAccuracyEvent;
    }
    handlePlayerAction(action) {
        if (action.keyState == _player_key_action__WEBPACK_IMPORTED_MODULE_0__["KeyState"].DOWN) {
            this.tryToHitNote(action.gameTime, action.track);
        }
        else if (action.keyState === _player_key_action__WEBPACK_IMPORTED_MODULE_0__["KeyState"].UP) {
            if (this.holdManager.isTrackHeld(action.track)) {
                this.holdManager.unholdTrack(action.track, action.gameTime);
                this.tryToReleaseNote(action.gameTime, action.track);
            }
        }
    }
    tryToHitNote(currentTimeInSeconds, trackNumber) {
        let noteIndex = this.getEarliestHittableUnhitNoteIndex(currentTimeInSeconds, trackNumber);
        if (noteIndex != null) {
            let note = this.noteManager.tracks[trackNumber][noteIndex];
            if (note.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NORMAL) {
                note.state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT;
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                this.handleAccuracyEvent({
                    accuracyName: Object(_util__WEBPACK_IMPORTED_MODULE_2__["getAccuracyEventName"])(accuracy, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: accuracy,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: note.type,
                });
            }
            else if (note.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD) {
                note.state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HELD; // set the note to held so it won't count as a miss
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                this.handleAccuracyEvent({
                    accuracyName: Object(_util__WEBPACK_IMPORTED_MODULE_2__["getAccuracyEventName"])(accuracy, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: accuracy,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: note.type,
                });
                this.holdManager.holdTrack(trackNumber, currentTimeInSeconds);
            }
        }
        else if (this.isConfiguredForBoos()) {
            this.handleAccuracyEvent({
                accuracyName: Object(_util__WEBPACK_IMPORTED_MODULE_2__["getAccuracyEventName"])(Infinity, this.config),
                trackNumber: trackNumber,
                accuracyMillis: Infinity,
                timeInSeconds: currentTimeInSeconds,
                noteType: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NONE,
            });
        }
    }
    getEarliestHittableUnhitNoteIndex(currentTimeInSeconds, trackNumber) {
        let accuracyRange = this.getAccuracyRangeInSeconds();
        let hittableTimeRange = this.getHittableRange(accuracyRange, currentTimeInSeconds);
        let hittableIndexRange = this.noteManager.getNotesByTimeRange(hittableTimeRange.leastTime, hittableTimeRange.greatestTime, trackNumber);
        return this.getEarliestUnhitNoteIndexInRange(trackNumber, hittableIndexRange);
    }
    getAccuracyRangeInSeconds() {
        let accuracySettings = this.config.accuracySettings;
        let numSettings = accuracySettings.length;
        let leastTime = accuracySettings[0].lowerBound == null ?
            accuracySettings[1].lowerBound : accuracySettings[0].lowerBound;
        let greatestTime;
        if (accuracySettings[numSettings - 1].upperBound == null) {
            greatestTime = accuracySettings[numSettings - 2].upperBound;
        }
        else {
            greatestTime = accuracySettings[numSettings - 1].upperBound;
        }
        return { leastTime: leastTime / 1000, greatestTime: greatestTime / 1000 };
    }
    getHittableRange(accuracyRange, receptorTimePosition) {
        return {
            leastTime: receptorTimePosition + accuracyRange.leastTime,
            greatestTime: receptorTimePosition + accuracyRange.greatestTime
        };
    }
    getEarliestUnhitNoteIndexInRange(trackNumber, noteIndexRange) {
        for (let i = noteIndexRange.startIndex; i < noteIndexRange.endIndexNotInclusive; i++) {
            if (this.noteManager.tracks[trackNumber][i].state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT) {
                return i;
            }
        }
        return null;
    }
    isConfiguredForBoos() {
        return this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound == null;
    }
    tryToReleaseNote(currentTimeInSeconds, trackNumber) {
        let noteIndex = this.getEarliestHittableUnhitNoteIndex(currentTimeInSeconds, trackNumber);
        if (noteIndex != null) {
            let note = this.noteManager.tracks[trackNumber][noteIndex];
            if (note.type == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                let hold = this.noteManager.tracks[trackNumber][noteIndex - 1]; // get the hold belonging to this tail
                hold.state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT; // change the hold state from HELD to HIT
                note.state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT; // hit the tail of the hold
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                this.handleAccuracyEvent({
                    accuracyName: "Release " + Object(_util__WEBPACK_IMPORTED_MODULE_2__["getAccuracyEventName"])(accuracy, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: accuracy,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: note.type,
                });
            }
        }
        else { // let go too early
            // Could this return -1?
            let holdStartIndex = this.noteManager.findIndexOfFirstNoteAfterTime(currentTimeInSeconds, this.noteManager.tracks[trackNumber]);
            let hold = this.noteManager.tracks[trackNumber][holdStartIndex - 1];
            let tail = this.noteManager.tracks[trackNumber][holdStartIndex];
            if (hold.type == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD && tail.type == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                this.noteManager.tracks[trackNumber][holdStartIndex - 1].state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT; // hit the start of the hold
                this.noteManager.tracks[trackNumber][holdStartIndex].state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT; // hit the tail of the hold
                this.handleAccuracyEvent({
                    accuracyName: "Release " + Object(_util__WEBPACK_IMPORTED_MODULE_2__["getAccuracyEventName"])(Infinity, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: Infinity,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NONE,
                });
            }
            else {
                // TODO: It's possible that this is something like a race condition between the key event and the animation loop. Don't throw an error for now
                // throw "Error: Release miss failed to trigger on note index " + (holdStartIndex - 1) + ", track index " + trackNumber + " at time " + currentTimeInSeconds;
            }
        }
    }
}


/***/ }),

/***/ "./src/scripts/accuracy_recording.ts":
/*!*******************************************!*\
  !*** ./src/scripts/accuracy_recording.ts ***!
  \*******************************************/
/*! exports provided: AccuracyRecordingState, AccuracyRecording */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccuracyRecordingState", function() { return AccuracyRecordingState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccuracyRecording", function() { return AccuracyRecording; });
var AccuracyRecordingState;
(function (AccuracyRecordingState) {
    AccuracyRecordingState[AccuracyRecordingState["INCOMPLETE"] = 0] = "INCOMPLETE";
    AccuracyRecordingState[AccuracyRecordingState["READY"] = 1] = "READY";
})(AccuracyRecordingState || (AccuracyRecordingState = {}));
class AccuracyRecording {
    constructor(numTracks) {
        this.state = AccuracyRecordingState.INCOMPLETE;
        this.recording = [];
        for (let i = 0; i < numTracks; i++) {
            this.recording.push([]);
        }
    }
    recordAccuracyEvent(accuracyEvent) {
        this.recording[accuracyEvent.trackNumber].push({
            timeInSeconds: accuracyEvent.timeInSeconds,
            accuracyMillis: accuracyEvent.accuracyMillis,
            noteType: accuracyEvent.noteType
        });
    }
}


/***/ }),

/***/ "./src/scripts/audio_file.ts":
/*!***********************************!*\
  !*** ./src/scripts/audio_file.ts ***!
  \***********************************/
/*! exports provided: AudioFileState, AudioFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioFileState", function() { return AudioFileState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioFile", function() { return AudioFile; });
var AudioFileState;
(function (AudioFileState) {
    AudioFileState[AudioFileState["NO_AUDIO_FILE"] = 0] = "NO_AUDIO_FILE";
    AudioFileState[AudioFileState["DONE_READING"] = 1] = "DONE_READING";
    AudioFileState[AudioFileState["BUFFERED"] = 2] = "BUFFERED";
    AudioFileState[AudioFileState["ERROR"] = 3] = "ERROR";
})(AudioFileState || (AudioFileState = {}));
class AudioFile {
    constructor() {
        this.state = AudioFileState.NO_AUDIO_FILE;
    }
    loadFile(file) {
        this.file = file.file; // this unwraps the p5.File wrapper to get the original DOM file
        this.loadAudioData(this.file);
    }
    loadBlob(blob) {
        this.blob = blob;
        this.loadAudioData(this.blob);
    }
    loadAudioData(audioData) {
        this.loadSoundFile(audioData, ((onFileRead) => {
            this.state = AudioFileState.DONE_READING;
            // @ts-ignore
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioSource = this.audioContext.createBufferSource();
            this.decodeAudioData(onFileRead.target.result);
        }));
    }
    decodeAudioData(audioData) {
        this.audioContext.decodeAudioData(audioData).then(((buffer) => {
            this.audioBuffer = buffer;
            this.audioSource.buffer = buffer;
            this.audioSource.connect(this.audioContext.destination);
            this.state = AudioFileState.BUFFERED;
        }), (e) => {
            console.log("Error with decoding audio data" + e.err);
            this.state = AudioFileState.ERROR;
        });
    }
    getDuration() {
        if (this.state === AudioFileState.BUFFERED) {
            return this.audioSource.buffer.duration;
        }
        return undefined;
    }
    play(delayInSeconds = 0) {
        let currentTime = this.audioContext.currentTime;
        this.playStartTime = currentTime;
        this.audioSource.start(currentTime + delayInSeconds);
    }
    stop() {
        this.audioSource.stop(0);
        this.state = AudioFileState.DONE_READING;
        this.recreateSourceNode();
    }
    getCurrentTimeInSeconds() {
        return this.audioContext.currentTime - this.playStartTime;
    }
    recreateSourceNode() {
        this.audioSource = this.audioContext.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;
        this.audioSource.connect(this.audioContext.destination);
        this.state = AudioFileState.BUFFERED;
    }
    loadSoundFile(file, listener, options) {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.addEventListener("loadend", listener, options);
    }
}


/***/ }),

/***/ "./src/scripts/config.ts":
/*!*******************************!*\
  !*** ./src/scripts/config.ts ***!
  \*******************************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");
/* harmony import */ var _default_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default_config */ "./src/scripts/default_config.ts");


/* Stores user settings. Expected not to change during play */
class Config {
    constructor(args) {
        this.gameAreaHeight = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.gameAreaHeight, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].gameAreaHeight);
        this.gameAreaWidth = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.gameAreaWidth, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].gameAreaWidth);
        this.pixelsPerSecond = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.pixelsPerSecond, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].pixelsPerSecond);
        this.scrollDirection = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.scrollDirection, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].scrollDirection);
        // NOTE: Scroll direction and gameAreaHeight must be set BEFORE setting receptorYPosition
        this.receptorYPercent = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.receptorYPercent, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].receptorYPercent);
        this.additionalOffsetInSeconds = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.additionalOffsetInSeconds, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].additionalOffsetInSeconds);
        this.accuracySettings = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.accuracySettings, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].accuracySettings);
        this.pauseAtStartInSeconds = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.pauseAtStartInSeconds, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].pauseAtStartInSeconds);
        this.noteSize = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.noteSize, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].noteSize);
        this.keyBindings = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.keyBindings, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].keyBindings);
        this.quitKey = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.quitKey, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].quitKey);
        this.isAccuracyFlashEnabled = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.isAccuracyFlashEnabled, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].isAccuracyFlashEnabled);
        this.isAccuracyParticlesEnabled = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.isAccuracyParticlesEnabled, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].isAccuracyParticlesEnabled);
        this.isAccuracyTextEnabled = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.isAccuracyTextEnabled, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].isAccuracyTextEnabled);
        this.isHoldParticlesEnabled = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.isHoldParticlesEnabled, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].isHoldParticlesEnabled);
        this.isHoldGlowEnabled = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.isHoldGlowEnabled, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].isHoldGlowEnabled);
    }
    save() {
        let configString = this.getConfigAsString();
        let expires = this.getDateOfOneYearFromNow();
        let path = '/';
        let cookieString = "config=" + escape(configString)
            + ';path=' + path
            + ';expires=' + expires.toUTCString();
        console.log(cookieString);
        document.cookie = cookieString;
        console.log("Config saved to cookie!");
    }
    getConfigAsString() {
        let string = JSON.stringify(this);
        string = string.replace(',"keyBindings":{},', ',"keyBindings":' + this.stringifyKeyBindings() + ',');
        return string;
    }
    static load() {
        let configCookie = Config.getFromCookie("config");
        console.log(configCookie);
        if (configCookie !== null) {
            try {
                let configJSON = JSON.parse(unescape(configCookie));
                configJSON.keyBindings = new Map(configJSON.keyBindings);
                let config = new Config(configJSON);
                console.log("Config loaded from cookie!");
                console.log(config);
                return config;
            }
            catch (e) { }
        }
        console.log("No valid cookie found, returning default config!");
        return new Config({});
    }
    getDateOfOneYearFromNow() {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return date;
    }
    stringifyKeyBindings() {
        let string = "[";
        this.keyBindings.forEach((value, key) => {
            string += "[" + key + "," + JSON.stringify(value) + "]";
        });
        string += "]";
        return string;
    }
    static getFromCookie(key) {
        try {
            return document.cookie
                .split("; ")
                .find(row => row.startsWith(key))
                .split("=")[1];
        }
        catch (e) {
            return null;
        }
    }
}


/***/ }),

/***/ "./src/scripts/default_config.ts":
/*!***************************************!*\
  !*** ./src/scripts/default_config.ts ***!
  \***************************************/
/*! exports provided: DEFAULT_CONFIG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CONFIG", function() { return DEFAULT_CONFIG; });
/* harmony import */ var _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accuracy_manager */ "./src/scripts/accuracy_manager.ts");
/* harmony import */ var _scroll_direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scroll_direction */ "./src/scripts/scroll_direction.ts");


let DEFAULT_CONFIG = {
    pixelsPerSecond: 550,
    scrollDirection: _scroll_direction__WEBPACK_IMPORTED_MODULE_1__["ScrollDirection"].Down,
    receptorYPercent: 15,
    additionalOffsetInSeconds: 0,
    // This is a symmetrical version of FFR's accuracy
    accuracySettings: [
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Miss", null, -117),
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Average", -117, -83),
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Good", -83, -50),
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Perfect", -50, -17),
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Amazing", -17, 17),
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Perfect", 17, 50),
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Good", 50, 83),
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Average", 83, 117),
        new _accuracy_manager__WEBPACK_IMPORTED_MODULE_0__["Accuracy"]("Boo", 117, null)
    ],
    pauseAtStartInSeconds: 0,
    keyBindings: new Map(),
    gameAreaHeight: 600,
    gameAreaWidth: 400,
    noteSize: 30,
    quitKey: 27,
    isAccuracyFlashEnabled: true,
    isAccuracyParticlesEnabled: true,
    isAccuracyTextEnabled: true,
    isHoldParticlesEnabled: true,
    isHoldGlowEnabled: true,
};


/***/ }),

/***/ "./src/scripts/default_note_skin.ts":
/*!******************************************!*\
  !*** ./src/scripts/default_note_skin.ts ***!
  \******************************************/
/*! exports provided: DefaultNoteSkin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultNoteSkin", function() { return DefaultNoteSkin; });
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");


class DefaultNoteSkin {
    static drawNote(trackNumber, numTracks, centerX, centerY, noteType, noteSize) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let width = noteSize;
        let height = noteSize;
        p.push();
        p.fill("black");
        switch (noteType) {
            case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                break;
            case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("white");
                p.text("v", centerX, centerY + 6);
                break;
            case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL:
                p.noFill();
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                break;
            case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].ROLL_HEAD:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("white");
                p.text("x", centerX, centerY + 6);
                break;
            case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].MINE:
                p.fill("white");
                p.circle(centerX, centerY, 24);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("black");
                p.text("X", centerX, centerY + 8);
                break;
            default:
                p.noFill();
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.fill("white");
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.text("?", centerX, centerY + 7);
                break;
        }
        p.pop();
    }
    static drawReceptor(trackNumber, numTracks, centerX, centerY, noteSize) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let width = noteSize;
        let height = noteSize;
        p.push();
        p.noFill();
        p.rect(centerX - width / 2, centerY - height / 2, width, height);
        p.pop();
    }
    static drawHoldConnector(centerX, startY, endY) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let noteSize = _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.noteSize;
        let width = noteSize * 0.5;
        p.push();
        p.fill("black");
        p.rect(centerX - width / 2, startY, width, endY - startY);
        p.pop();
    }
}


/***/ }),

/***/ "./src/scripts/display_manager.ts":
/*!****************************************!*\
  !*** ./src/scripts/display_manager.ts ***!
  \****************************************/
/*! exports provided: DisplayManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayManager", function() { return DisplayManager; });
/* harmony import */ var _scroll_direction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll_direction */ "./src/scripts/scroll_direction.ts");
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _default_note_skin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./default_note_skin */ "./src/scripts/default_note_skin.ts");




class NoteDisplay {
    constructor(centerX, centerY, noteType, sketchInstance, noteSize, trackNumber, numTracks) {
        this.sketchInstance = sketchInstance;
        this.centerX = centerX;
        this.centerY = centerY;
        this.noteType = noteType;
        this.noteSize = noteSize;
        this.trackNumber = trackNumber;
        this.numTracks = numTracks;
    }
    draw() {
        let isNoteDrawSuccessful = _index__WEBPACK_IMPORTED_MODULE_2__["global"].noteSkin.drawNote(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteType, this.noteSize);
        if (!isNoteDrawSuccessful) {
            _default_note_skin__WEBPACK_IMPORTED_MODULE_3__["DefaultNoteSkin"].drawNote(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteType, this.noteSize);
        }
    }
}
class HoldConnector {
    constructor(centerX, startY, endY, noteStartY, noteEndY, sketchInstance) {
        this.sketchInstance = sketchInstance;
        this.centerX = centerX;
        this.startY = startY;
        this.endY = endY;
        this.noteStartY = noteStartY;
        this.noteEndY = noteEndY;
    }
    draw() {
        let isConnectorDrawSuccessful = _index__WEBPACK_IMPORTED_MODULE_2__["global"].noteSkin.drawHoldConnector(this.centerX, this.startY, this.endY, this.noteStartY, this.noteEndY);
        if (!isConnectorDrawSuccessful) {
            _default_note_skin__WEBPACK_IMPORTED_MODULE_3__["DefaultNoteSkin"].drawHoldConnector(this.centerX, this.startY, this.endY);
        }
    }
}
class Receptor {
    constructor(centerX, centerY, sketchInstance, noteSize, trackNumber, numTracks) {
        this.sketchInstance = sketchInstance;
        this.centerX = centerX;
        this.centerY = centerY;
        this.noteSize = noteSize;
        this.trackNumber = trackNumber;
        this.numTracks = numTracks;
    }
    draw() {
        let isReceptorDrawSuccessful = _index__WEBPACK_IMPORTED_MODULE_2__["global"].noteSkin.drawReceptor(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteSize);
        if (!isReceptorDrawSuccessful) {
            _default_note_skin__WEBPACK_IMPORTED_MODULE_3__["DefaultNoteSkin"].drawReceptor(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteSize);
        }
    }
}
class DisplayManager {
    constructor(noteManager, displayConfig, sketchInstance, topLeftX = 0, topLeftY = 0, width = 180, height = 400) {
        this.displayConfig = displayConfig;
        this.noteManager = noteManager;
        this.currentTimeInSeconds = 0;
        this.sketchInstance = sketchInstance;
        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;
        this.width = width;
        this.height = height;
    }
    draw(currentTimeInSeconds) {
        let p = this.sketchInstance;
        p.push();
        p.fill("black");
        this.currentTimeInSeconds = currentTimeInSeconds;
        this.sketchInstance.rect(this.topLeftX, this.topLeftY, this.width, this.height);
        this.drawNotesAndConnectors();
        this.drawReceptors();
        p.pop();
    }
    drawNotesAndConnectors() {
        let leastTime = this.getLeastTime(this.currentTimeInSeconds);
        let greatestTime = this.getGreatestTime(this.currentTimeInSeconds);
        this.drawAllConnectors(leastTime, greatestTime);
        this.drawAllNotes(leastTime, greatestTime);
    }
    drawAllNotes(leastTime, greatestTime) {
        let numTracks = this.noteManager.tracks.length;
        for (let i = 0; i < numTracks; i++) {
            this.drawNotesInTrack(leastTime, greatestTime, i, numTracks, this.currentTimeInSeconds);
        }
    }
    drawNotesInTrack(leastTime, greatestTime, trackNumber, numTracks, currentTime) {
        let noteIndexRange = this.noteManager.getNotesByTimeRange(leastTime, greatestTime, trackNumber);
        let notes = this.noteManager.tracks[trackNumber].slice(noteIndexRange.startIndex, noteIndexRange.endIndexNotInclusive);
        for (let i = 0; i < notes.length; i++) {
            this.drawNote(notes[i], trackNumber, numTracks, currentTime);
        }
    }
    drawNote(note, trackNumber, numTracks, currentTime) {
        if (note.state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT) {
            let x = this.getNoteCenterX(trackNumber, numTracks);
            let y = this.getNoteCenterY(note.timeInSeconds, currentTime);
            new NoteDisplay(x, y, note.type, this.sketchInstance, this.displayConfig.getNoteSize(), trackNumber, numTracks).draw();
        }
    }
    getLeastTime(currentTime) {
        let totalDisplaySeconds = this.getDisplayHeight() / this.displayConfig.getPixelsPerSecond();
        return currentTime - this.displayConfig.getReceptorYPercent() / 100 * totalDisplaySeconds;
    }
    getGreatestTime(currentTime) {
        let totalDisplaySeconds = this.getDisplayHeight() / this.displayConfig.getPixelsPerSecond();
        return currentTime + (1 - this.displayConfig.getReceptorYPercent() / 100) * totalDisplaySeconds;
    }
    getNoteCenterX(trackNumber, numTracks) {
        let receptorSpacing = this.getDisplayWidth() / numTracks - this.displayConfig.getNoteSize();
        return (2 * trackNumber + 1) / 2 * (this.displayConfig.getNoteSize() + receptorSpacing) + this.topLeftX;
    }
    // This essentially defines a conversion from seconds to pixels
    getNoteCenterY(noteTimeInSeconds, currentTimeInSeconds) {
        let noteYOffset = this.displayConfig.getPixelsPerSecond() * (noteTimeInSeconds - currentTimeInSeconds);
        let receptorYOffset = this.displayConfig.getReceptorYPercent() / 100 * this.getDisplayHeight();
        if (this.displayConfig.getScrollDirection() == _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"].Up) {
            return receptorYOffset + noteYOffset + this.topLeftY;
        }
        else {
            return this.getDisplayHeight() - (receptorYOffset + noteYOffset) + this.topLeftY;
        }
    }
    getDisplayWidth() {
        return this.width;
    }
    getDisplayHeight() {
        return this.height;
    }
    drawAllConnectors(leastTime, greatestTime) {
        let tracks = this.noteManager.tracks;
        for (let i = 0; i < tracks.length; i++) {
            this.drawAllTrackConnectors(leastTime, greatestTime, tracks[i], i, tracks.length, this.currentTimeInSeconds);
        }
    }
    drawAllTrackConnectors(leastTime, greatestTime, track, trackNumber, numTracks, currentTime) {
        let noteStack = [];
        for (let i = 0; i < track.length; i++) {
            let currentNote = track[i];
            if (currentNote.timeInSeconds < leastTime) {
                if (currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD || currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].ROLL_HEAD) {
                    noteStack.push(currentNote);
                }
                else if (currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                    noteStack.pop();
                }
            }
            else if (currentNote.timeInSeconds < greatestTime) {
                if (currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD || currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].ROLL_HEAD) {
                    noteStack.push(currentNote);
                }
                else if (currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                    let startNote = noteStack.pop();
                    let endNote = currentNote;
                    if (startNote != undefined && endNote != undefined) {
                        if ((startNote.state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT || startNote.state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HELD) &&
                            endNote.state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT) {
                            this.drawConnector(startNote, endNote, trackNumber, numTracks, currentTime);
                        }
                    }
                }
            }
            else {
                if (noteStack.length == 0) {
                    break;
                }
                if (currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD || currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].ROLL_HEAD) {
                    noteStack.push(currentNote);
                }
                else if (currentNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                    let startNote = noteStack.pop();
                    let endNote = currentNote;
                    if (startNote != undefined && endNote != undefined) {
                        if ((startNote.state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT || startNote.state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HELD) &&
                            endNote.state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT) {
                            this.drawConnector(startNote, endNote, trackNumber, numTracks, currentTime);
                        }
                    }
                }
            }
        }
    }
    drawConnector(startNote, endNote, trackNumber, numTracks, currentTime) {
        let centerX = this.getNoteCenterX(trackNumber, numTracks);
        let noteStartY = this.getNoteCenterY(startNote.timeInSeconds, currentTime);
        let noteEndY = this.getNoteCenterY(endNote.timeInSeconds, currentTime);
        let drawStartY;
        if (startNote.state == _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HELD) {
            drawStartY = this.getNoteCenterY(Math.min(currentTime, endNote.timeInSeconds), currentTime);
        }
        else {
            drawStartY = noteStartY;
        }
        drawStartY = this.clampValueToRange(drawStartY, this.topLeftY, this.topLeftY + this.height);
        let drawEndY = noteEndY;
        drawEndY = this.clampValueToRange(drawEndY, this.topLeftY, this.topLeftY + this.height);
        new HoldConnector(centerX, drawStartY, drawEndY, noteStartY, noteEndY, this.sketchInstance).draw();
    }
    clampValueToRange(value, lowerBound, upperBound) {
        if (value < lowerBound) {
            return lowerBound;
        }
        if (value > upperBound) {
            return upperBound;
        }
        return value;
    }
    drawReceptors() {
        let numTracks = this.noteManager.tracks.length;
        for (let i = 0; i < numTracks; i++) {
            new Receptor(this.getNoteCenterX(i, numTracks), this.getNoteCenterY(this.currentTimeInSeconds, this.currentTimeInSeconds), this.sketchInstance, this.displayConfig.getReceptorSizes()[i], i, numTracks).draw();
        }
    }
}


/***/ }),

/***/ "./src/scripts/dom_wrapper.ts":
/*!************************************!*\
  !*** ./src/scripts/dom_wrapper.ts ***!
  \************************************/
/*! exports provided: DOMWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMWrapper", function() { return DOMWrapper; });
// Lets us code the DOM UI elements as if it were "immediate", i.e. stateless.
class DOMWrapper {
    // uniqueID should be unique within a scene
    static create(createCall, uniqueId) {
        if (this.registry.has(uniqueId)) {
            return {
                element: this.registry.get(uniqueId),
                alreadyExists: true
            };
        }
        else {
            let element = createCall();
            this.registry.set(uniqueId, element);
            return {
                element: element,
                alreadyExists: false
            };
        }
    }
    static clearRegistry() {
        this.registry.forEach((value, key, map) => {
            value.remove();
        });
        this.registry.clear();
    }
    // Returns true if remove was successful, otherwise returns false;
    static removeElementById(id) {
        if (this.registry.has(id)) {
            this.registry.get(id).remove();
            this.registry.delete(id);
            return true;
        }
        else {
            return false;
        }
    }
    // Returns the element if found, otherwise returns undefined;
    static getElementById(id) {
        return this.registry.get(id);
    }
}
DOMWrapper.registry = new Map();


/***/ }),

/***/ "./src/scripts/drawing_util.ts":
/*!*************************************!*\
  !*** ./src/scripts/drawing_util.ts ***!
  \*************************************/
/*! exports provided: drawAccuracyBars */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawAccuracyBars", function() { return drawAccuracyBars; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");

function drawAccuracyBars(p, accuracyLabels, accuracyRecording, centerX, centerY, textSize, barWidth, barHeight, noteManager, accuracyManager, isBooForLastAccuracy) {
    let maxTextWidth = getMaxTextWidth(p, accuracyLabels, textSize);
    let totalNotes = noteManager.getTotalNotes();
    let barSpacing = 10;
    let totalHeight = accuracyLabels.length * barHeight + (accuracyLabels.length - 1) * barSpacing;
    let startY = (p.height - totalHeight) / 2 + barHeight / 2;
    startY *= 0.8; // shift the results up to make room for exit button
    for (let i = 0; i < accuracyLabels.length; i++) {
        let accuracyLabel = accuracyLabels[i];
        let numAccuracyEvents = getNumAccuracyEvents(accuracyLabel, accuracyRecording, accuracyManager);
        let percentFilled = numAccuracyEvents / totalNotes;
        if (isBooForLastAccuracy && i === accuracyLabels.length - 1) {
            drawAccuracyWithNoBar(p, centerX, startY + i * (barHeight + barSpacing), accuracyLabel, numAccuracyEvents.toString(), totalNotes.toString(), textSize, maxTextWidth, barWidth, barHeight, percentFilled);
        }
        else {
            drawAccuracyBar(p, centerX, startY + i * (barHeight + barSpacing), accuracyLabel, numAccuracyEvents.toString(), totalNotes.toString(), textSize, maxTextWidth, barWidth, barHeight, percentFilled);
        }
    }
}
function getNumAccuracyEvents(accuracyLabel, accuracyRecording, accuracyManager) {
    return accuracyRecording.recording.reduce((sum, trackRecording) => sum + trackRecording.filter(accuracyEvent => Object(_util__WEBPACK_IMPORTED_MODULE_0__["getAccuracyEventName"])(accuracyEvent.accuracyMillis, accuracyManager.config) === accuracyLabel).length, 0);
}
function getMaxTextWidth(p, textArray, textSize) {
    p.push();
    p.textSize(textSize);
    let maxTextWidth = textArray.map((string) => p.textWidth(string))
        .reduce((maxWidth, width) => Math.max(maxWidth, width, -1));
    p.pop();
    return maxTextWidth;
}
function drawAccuracyBar(p, centerX, centerY, label1, label2, label3, textSize, largestTextWidth, barWidth, barHeight, percentFilled) {
    let spacingBetweenBarAndLabel = 8;
    let totalWidth = largestTextWidth + spacingBetweenBarAndLabel + barWidth;
    let labelRightmostX = centerX - totalWidth / 2 + largestTextWidth;
    drawRightAlignedLabel(p, labelRightmostX, centerY, label1, textSize);
    let barRightX = centerX + totalWidth / 2;
    let barLeftX = barRightX - barWidth;
    let barCenterX = (barLeftX + barRightX) / 2;
    drawPartiallyFilledBar(p, barCenterX, centerY, barWidth, barHeight, percentFilled, textSize, label2, label3);
}
function drawRightAlignedLabel(p, rightmostX, centerY, text, textSize) {
    p.push();
    p.fill("white");
    p.textSize(textSize);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text(text, rightmostX, centerY);
    p.pop();
}
function drawPartiallyFilledBar(p, centerX, centerY, width, height, percentFilled, textSize, startLabel, endLabel) {
    p.push();
    p.rectMode(p.CENTER);
    p.stroke("white");
    // draw the filled part of the bar
    p.fill("gray");
    p.rect(centerX - (width * (1 - percentFilled) / 2), centerY, width * percentFilled, height);
    // draw the outline of the bar
    p.noFill();
    p.rect(centerX, centerY, width, height);
    // draw the labels on the ends of the bar
    let labelSize = 1.5 * textSize;
    p.fill("white");
    p.textSize(labelSize);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(startLabel, centerX - width / 2, centerY + 2);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text(endLabel, centerX + width / 2, centerY + 2);
    p.pop();
}
function drawAccuracyWithNoBar(p, centerX, centerY, label1, label2, label3, textSize, largestTextWidth, barWidth, barHeight, percentFilled) {
    let spacingBetweenBarAndLabel = 8;
    let totalWidth = largestTextWidth + spacingBetweenBarAndLabel + barWidth;
    let labelRightmostX = centerX - totalWidth / 2 + largestTextWidth;
    drawRightAlignedLabel(p, labelRightmostX, centerY, label1, textSize);
    // draw the accuracy count label on the left end of the bar
    let labelSize = 1.5 * textSize;
    let barRightX = centerX + totalWidth / 2;
    let barLeftX = barRightX - barWidth;
    let barCenterX = (barLeftX + barRightX) / 2;
    p.push();
    p.fill("white");
    p.textSize(labelSize);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(label2, barCenterX - barWidth / 2, centerY + 2);
    p.pop();
}


/***/ }),

/***/ "./src/scripts/hold_glow.ts":
/*!**********************************!*\
  !*** ./src/scripts/hold_glow.ts ***!
  \**********************************/
/*! exports provided: HoldGlow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoldGlow", function() { return HoldGlow; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");

class HoldGlow {
    constructor(config, numTracks, displayManager) {
        this.config = config;
        this.numTracks = numTracks;
        this.displayManager = displayManager;
        this.glowStartTimes = [];
        for (let i = 0; i < numTracks; i++) {
            this.glowStartTimes.push(HoldGlow.dontDrawFlag);
        }
    }
    draw(currentTimeInSeconds) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            if (this.glowStartTimes[trackNumber] !== HoldGlow.dontDrawFlag) {
                let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
                let elapsedTime = currentTimeInSeconds - this.glowStartTimes[trackNumber];
                let centerX = this.displayManager.getNoteCenterX(trackNumber, this.numTracks);
                let centerY = this.displayManager.getNoteCenterY(currentTimeInSeconds, currentTimeInSeconds);
                let glowAlpha = this.getGlowAlpha(elapsedTime);
                let glowColor = p.color(0, 255, 0, glowAlpha);
                let glowSize = this.getGlowSize(elapsedTime);
                this.drawGlow(p, centerX, centerY, glowSize, glowSize / 2, glowColor);
            }
        }
    }
    drawGlow(p, centerX, centerY, width, height, color) {
        p.push();
        p.noStroke();
        p.fill(color);
        p.ellipse(centerX, centerY, width, height);
        p.pop();
    }
    getGlowAlpha(elapsedTimeInSeconds) {
        let animationTime = elapsedTimeInSeconds % HoldGlow.glowPeriodInSeconds;
        let animationRatio = animationTime / HoldGlow.glowPeriodInSeconds;
        return this.biLerp(0, 50, animationRatio);
    }
    getGlowSize(elapsedTimeInSeconds) {
        let animationTime = elapsedTimeInSeconds % HoldGlow.glowPeriodInSeconds;
        let animationRatio = animationTime / HoldGlow.glowPeriodInSeconds;
        let maxSize = this.config.noteSize;
        return this.biLerp(0, maxSize, animationRatio);
    }
    biLerp(minValue, maxValue, ratio) {
        if (ratio < 0.5) {
            return this.lerp(minValue, maxValue, 1 - ratio / 0.5);
        }
        else {
            return this.lerp(minValue, maxValue, 2 * ratio - 1);
        }
    }
    lerp(minValue, maxValue, ratio) {
        if (ratio <= 0) {
            return minValue;
        }
        else if (ratio > 0 && ratio < 1) {
            return minValue + (maxValue - minValue) * ratio;
        }
        else {
            return maxValue;
        }
    }
    holdTrack(trackNumber, currentTimeInSeconds) {
        this.glowStartTimes[trackNumber] = currentTimeInSeconds;
    }
    unholdTrack(trackNumber) {
        this.glowStartTimes[trackNumber] = HoldGlow.dontDrawFlag;
    }
}
HoldGlow.dontDrawFlag = -1;
HoldGlow.glowPeriodInSeconds = 0.3;


/***/ }),

/***/ "./src/scripts/hold_manager.ts":
/*!*************************************!*\
  !*** ./src/scripts/hold_manager.ts ***!
  \*************************************/
/*! exports provided: HoldManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoldManager", function() { return HoldManager; });
/* This class is intended only to be used to store the hold state for notes that can be held. This shouldn't be used
   for normal notes or general keyboard state */
class HoldManager {
    constructor(numTracks, onTrackHold, onTrackUnhold) {
        this.heldTracks = [];
        for (let i = 0; i < numTracks; i++) {
            this.heldTracks.push(false);
        }
        this.onTrackHold = onTrackHold;
        this.onTrackUnhold = onTrackUnhold;
    }
    isTrackHeld(trackNumber) {
        return this.heldTracks[trackNumber];
    }
    holdTrack(trackNumber, currentTimeInSeconds) {
        this.heldTracks[trackNumber] = true;
        this.onTrackHold(trackNumber, currentTimeInSeconds);
    }
    unholdTrack(trackNumber, currentTimeInSeconds) {
        this.heldTracks[trackNumber] = false;
        this.onTrackUnhold(trackNumber, currentTimeInSeconds);
    }
}


/***/ }),

/***/ "./src/scripts/hold_particles.ts":
/*!***************************************!*\
  !*** ./src/scripts/hold_particles.ts ***!
  \***************************************/
/*! exports provided: HoldParticles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoldParticles", function() { return HoldParticles; });
/* harmony import */ var _particle_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle_system */ "./src/scripts/particle_system.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _scroll_direction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scroll_direction */ "./src/scripts/scroll_direction.ts");



class HoldParticles {
    constructor(config, numTracks, displayManager) {
        this.numTracks = numTracks;
        this.displayManager = displayManager;
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        this.gravityDirection = config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_2__["ScrollDirection"].Down ? 1 : -1;
        let gravity = p.createVector(0, 2000 * this.gravityDirection);
        this.particleSystems = [];
        for (let i = 0; i < numTracks; i++) {
            this.particleSystems.push(new _particle_system__WEBPACK_IMPORTED_MODULE_0__["ParticleSystem"](HoldParticles.particlesLifetimeInSeconds, gravity));
        }
        this.previousParticleTimestamps = [];
        for (let i = 0; i < numTracks; i++) {
            this.previousParticleTimestamps.push(HoldParticles.dontDrawFlag);
        }
    }
    draw(currentTimeInSeconds) {
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            this.addParticlesToTrack(trackNumber, currentTimeInSeconds);
            this.particleSystems[trackNumber].draw(currentTimeInSeconds);
        }
    }
    addParticlesToTrack(trackNumber, currentTimeInSeconds) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        if (this.previousParticleTimestamps[trackNumber] !== HoldParticles.dontDrawFlag) {
            while (this.previousParticleTimestamps[trackNumber] + HoldParticles.particlePeriodInSeconds < currentTimeInSeconds) {
                let newTimestamp = this.previousParticleTimestamps[trackNumber] + HoldParticles.particlePeriodInSeconds;
                let receptorTimePosition = currentTimeInSeconds;
                let initialPosition = this.getInitialPosition(p, trackNumber, this.numTracks, receptorTimePosition);
                let initialVelocity = p.createVector(0, -500 * this.gravityDirection);
                this.particleSystems[trackNumber].addRandomizedParticles(initialPosition, initialVelocity, newTimestamp, 1, p.color(0, 255, 0, 150));
                this.previousParticleTimestamps[trackNumber] = newTimestamp;
            }
        }
    }
    getInitialPosition(p, trackNumber, numTracks, centerTimeInSeconds) {
        let centerX = this.displayManager.getNoteCenterX(trackNumber, numTracks);
        let centerY = this.displayManager.getNoteCenterY(centerTimeInSeconds, centerTimeInSeconds);
        return p.createVector(centerX, centerY);
    }
    holdTrack(trackNumber, currentTimeInSeconds) {
        this.previousParticleTimestamps[trackNumber] = currentTimeInSeconds;
    }
    unholdTrack(trackNumber) {
        this.previousParticleTimestamps[trackNumber] = HoldParticles.dontDrawFlag;
    }
}
HoldParticles.particlesLifetimeInSeconds = 1.5;
HoldParticles.dontDrawFlag = -1;
HoldParticles.particlePeriodInSeconds = 0.05;


/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/*! exports provided: global */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "global", function() { return global; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/scripts/config.ts");
/* harmony import */ var _p5_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./p5_scene */ "./src/scripts/p5_scene.ts");
/* harmony import */ var _online_playlist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./online_playlist */ "./src/scripts/online_playlist.ts");



const global = {};
global.p5Scene = new _p5_scene__WEBPACK_IMPORTED_MODULE_1__["P5Scene"]();
global.config = _config__WEBPACK_IMPORTED_MODULE_0__["Config"].load();
global.globalClass = "game";
global.onlinePlaylist = new _online_playlist__WEBPACK_IMPORTED_MODULE_2__["OnlinePlaylist"]();


/***/ }),

/***/ "./src/scripts/key_binding_helper.ts":
/*!*******************************************!*\
  !*** ./src/scripts/key_binding_helper.ts ***!
  \*******************************************/
/*! exports provided: KeyBindingHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyBindingHelper", function() { return KeyBindingHelper; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _key_bindings_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./key_bindings_ui */ "./src/scripts/key_bindings_ui.ts");



class KeyBindingHelper {
    constructor(bindingsToAcquire) {
        this.bindingsToAcquire = bindingsToAcquire;
        this.currentBindingNumber = 0;
    }
    bindNext(p, keyBindingsQuickstartId) {
        let keybinding = {
            trackNumber: this.currentBindingNumber,
            keyCode: p.keyCode,
            string: Object(_util__WEBPACK_IMPORTED_MODULE_0__["getKeyString"])(p)
        };
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["setConfigKeyBinding"])(this.currentBindingNumber, this.bindingsToAcquire, keybinding);
        this.currentBindingNumber++;
        if (this.currentBindingNumber >= this.bindingsToAcquire) {
            _index__WEBPACK_IMPORTED_MODULE_1__["global"].keyboardEventManager.unbindKey(-1);
            document.getElementById(keyBindingsQuickstartId).scrollIntoView();
            _key_bindings_ui__WEBPACK_IMPORTED_MODULE_2__["KeyBindingsUi"].noLongerWaitingForLastKey(p);
        }
        else {
            _key_bindings_ui__WEBPACK_IMPORTED_MODULE_2__["KeyBindingsUi"].scrollKeyBindingIntoView(this.currentBindingNumber);
            _key_bindings_ui__WEBPACK_IMPORTED_MODULE_2__["KeyBindingsUi"].indicateWaitingForKey(p, this.currentBindingNumber);
        }
    }
}


/***/ }),

/***/ "./src/scripts/key_bindings_ui.ts":
/*!****************************************!*\
  !*** ./src/scripts/key_bindings_ui.ts ***!
  \****************************************/
/*! exports provided: KeyBindingsUi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyBindingsUi", function() { return KeyBindingsUi; });
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_wrapper */ "./src/scripts/dom_wrapper.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _key_binding_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./key_binding_helper */ "./src/scripts/key_binding_helper.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");
/* harmony import */ var _ui_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui_util */ "./src/scripts/ui_util.ts");
/* harmony import */ var _preview_display__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./preview_display */ "./src/scripts/preview_display.ts");
/* harmony import */ var _pages_options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/options */ "./src/scripts/pages/options.ts");
/* harmony import */ var _ticker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ticker */ "./src/scripts/ticker.ts");








class KeyBindingsUi {
    static resetNumTracks() {
        this.numTracks = KeyBindingsUi.DEFAULT_NUM_TRACKS;
    }
    static create(parentElement, pageStyleClass) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let keyBindingsSectionHeader = this.createKeyBindingsSectionHeader();
        if (!keyBindingsSectionHeader.alreadyExists) {
            parentElement.child(keyBindingsSectionHeader.element);
        }
        if (this.numTracks == undefined) {
            this.numTracks = this.DEFAULT_NUM_TRACKS;
        }
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_4__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_4__["createLabeledInput"])("Number of Tracks", "previewNumTracksInput", this.numTracks.toString(), _pages_options__WEBPACK_IMPORTED_MODULE_6__["Options"].OPTIONS_CLASS), this.isValidNumberOfTracks.bind(this), this.showNumberOfTracksInfo.bind(this), this.showNumberOfTracksError.bind(this), (input) => {
            KeyBindingsUi.removeOldBindingButtons(this.numTracks);
            this.numTracks = Object(_util__WEBPACK_IMPORTED_MODULE_3__["getInt"])(input);
            this.regeneratePreview();
        }, parentElement);
        let keyBindingsQuickstartButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_0__["DOMWrapper"].create(() => {
            return p.createButton("Key-Bindings Quickstart");
        }, "keyBindingsQuickstartButton");
        if (!keyBindingsQuickstartButton.alreadyExists) {
            let keyBindingsQuickstartId = "keybindings-quickstart";
            keyBindingsQuickstartButton.element.addClass(pageStyleClass);
            keyBindingsQuickstartButton.element.addClass("keybindings-quickstart");
            keyBindingsQuickstartButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass);
            keyBindingsQuickstartButton.element.id(keyBindingsQuickstartId);
            keyBindingsQuickstartButton.element.mousePressed(() => {
                let keybindingHelper = new _key_binding_helper__WEBPACK_IMPORTED_MODULE_2__["KeyBindingHelper"](this.numTracks);
                this.scrollKeyBindingIntoView(0);
                this.indicateWaitingForKey(p, 0);
                // Bind this action to the "-1" key so that it happens on any key press
                _index__WEBPACK_IMPORTED_MODULE_1__["global"].keyboardEventManager.bindKeyToAction(-1, () => {
                    // Ignore this code because it's used to indicate input that's not yet finished processing
                    if (p.keyCode !== 229) {
                        keybindingHelper.bindNext(p, keyBindingsQuickstartId);
                    }
                });
            });
            parentElement.child(keyBindingsQuickstartButton.element);
        }
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_3__["isKeyBindingsDefined"])(this.numTracks)) {
            Object(_util__WEBPACK_IMPORTED_MODULE_3__["initializeKeyBindings"])(this.numTracks);
        }
        for (let trackNumber = 0; trackNumber < this.numTracks; trackNumber++) {
            let keyBindingInput = this.createKeyBindingInput(trackNumber, this.numTracks, pageStyleClass);
            if (!keyBindingInput.alreadyExists) {
                parentElement.child(keyBindingInput.element);
            }
        }
    }
    static createKeyBindingsSectionHeader() {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_0__["DOMWrapper"].create(() => {
            let container = p.createDiv();
            container.html('Key Bindings <span style="font-size:12px">(track 1 is the leftmost track)</span>');
            container.addClass("options-free-text");
            container.addClass(_pages_options__WEBPACK_IMPORTED_MODULE_6__["Options"].OPTIONS_CLASS);
            container.addClass(_index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass);
            return container;
        }, "keyBindingsSectionHeader");
        return container;
    }
    static isValidNumberOfTracks(value) {
        let numberValue = Object(_util__WEBPACK_IMPORTED_MODULE_3__["getInt"])(value);
        return Number.isInteger(numberValue) && numberValue > 0 && numberValue <= 26;
    }
    static showNumberOfTracksInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Show options for the number of note tracks you'll be playing with.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showNumberOfTracksError() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Error: must be an integer number between 1 and 26.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].ERROR);
    }
    static createKeyBindingInput(trackNumber, numTracks, customClass) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let setButtonId = this.getKeyBindingButtonId(trackNumber, numTracks);
        let keybindingInputClass = "keybinding-input";
        let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_0__["DOMWrapper"].create(() => {
            let container = p.createDiv();
            container.addClass(customClass);
            container.addClass(keybindingInputClass);
            container.addClass(_index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass);
            let label = Object(_ui_util__WEBPACK_IMPORTED_MODULE_4__["createLabel"])(p, "");
            label.addClass(customClass);
            label.addClass(keybindingInputClass);
            label.addClass(_index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass);
            label.parent(container);
            let setButton = p.createButton("Set");
            setButton.parent(container);
            setButton.id(setButtonId);
            setButton.mousePressed(() => {
                this.indicateWaitingForKey(p, trackNumber);
                _index__WEBPACK_IMPORTED_MODULE_1__["global"].keyboardEventManager.bindKeyToAction(-1, () => {
                    // Ignore this code because it's used to indicate input that's not yet finished processing
                    if (p.keyCode !== 229) {
                        Object(_util__WEBPACK_IMPORTED_MODULE_3__["setConfigKeyBinding"])(trackNumber, numTracks, { trackNumber: trackNumber, keyCode: p.keyCode, string: Object(_util__WEBPACK_IMPORTED_MODULE_3__["getKeyString"])(p) });
                        this.noLongerWaitingForKey(setButton);
                        _index__WEBPACK_IMPORTED_MODULE_1__["global"].keyboardEventManager.unbindKey(-1);
                    }
                });
            });
            setButton.addClass(customClass);
            setButton.addClass(keybindingInputClass);
            setButton.addClass(_index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass);
            return container;
        }, this.getKeyBindingButtonId(trackNumber, numTracks));
        let trackBindingInfo = Object(_util__WEBPACK_IMPORTED_MODULE_3__["findBindingInfoForTrack"])(trackNumber, _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.keyBindings.get(numTracks));
        let keyString = trackBindingInfo.string;
        let labelString = 'Track ' + (trackNumber + 1) + ': <span class="' +
            keybindingInputClass + " " + customClass + " " + _index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass +
            '">' + keyString + '</span>';
        let labelElement = Object(_util__WEBPACK_IMPORTED_MODULE_3__["getFirstElementByTagName"])(container.element, "LABEL");
        labelElement.html(labelString);
        return container;
    }
    static indicateWaitingForKey(p, trackNumber) {
        let setButtons = [];
        for (let i = 0; i < this.numTracks; i++) {
            setButtons.push(this.getSetButton(p, i, this.numTracks));
        }
        for (let i = 0; i < this.numTracks; i++) {
            let setButton = setButtons[i];
            if (i === trackNumber) {
                setButton.html(this.SET_BUTTON_ACTIVE_TEXT);
            }
            else {
                setButton.html(this.SET_BUTTON_INACTIVE_TEXT);
            }
        }
    }
    static getSetButton(p, trackNumber, numTracks) {
        let setButtonId = this.getKeyBindingButtonId(trackNumber, numTracks);
        return p.select("#" + setButtonId);
    }
    static noLongerWaitingForKey(setButton) {
        setButton.html(this.SET_BUTTON_INACTIVE_TEXT);
    }
    static noLongerWaitingForLastKey(p) {
        let setButton = this.getSetButton(p, this.numTracks - 1, this.numTracks);
        setButton.html(this.SET_BUTTON_INACTIVE_TEXT);
    }
    static getKeyBindingButtonId(trackNumber, numTracks) {
        return this.getKeyBindingUniqueId(trackNumber, numTracks) + "Button";
    }
    static getKeyBindingUniqueId(trackNumber, numTracks) {
        return "track" + trackNumber + "Of" + numTracks + "Binding";
    }
    static scrollKeyBindingIntoView(trackNumber) {
        let keyBindingButtonId = this.getKeyBindingButtonId(trackNumber, this.numTracks);
        document.getElementById(keyBindingButtonId).parentElement.scrollIntoView();
    }
    static removeOldBindingButtons(numTracks) {
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_0__["DOMWrapper"].removeElementById(this.getKeyBindingButtonId(trackNumber, numTracks));
        }
    }
    static regeneratePreview() {
        _index__WEBPACK_IMPORTED_MODULE_1__["global"].previewDisplay = new _preview_display__WEBPACK_IMPORTED_MODULE_5__["PreviewDisplay"](Object(_util__WEBPACK_IMPORTED_MODULE_3__["generatePreviewNotes"])(this.numTracks), _index__WEBPACK_IMPORTED_MODULE_1__["global"].config, _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene);
    }
}
KeyBindingsUi.SET_BUTTON_INACTIVE_TEXT = "Set";
KeyBindingsUi.SET_BUTTON_ACTIVE_TEXT = "Press Any Key";
KeyBindingsUi.DEFAULT_NUM_TRACKS = 4;


/***/ }),

/***/ "./src/scripts/keyboard_event_manager.ts":
/*!***********************************************!*\
  !*** ./src/scripts/keyboard_event_manager.ts ***!
  \***********************************************/
/*! exports provided: KeyboardEventManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyboardEventManager", function() { return KeyboardEventManager; });
class KeyboardEventManager {
    constructor(p) {
        this.actionBindings = new Map();
        p.keyPressed = function () {
            // -1 is a special keyCode flag that means "any". This is especially useful for setting up key bindings.
            let globalActions = this.actionBindings.get(-1);
            if (globalActions !== undefined) {
                if (globalActions.keyDownAction !== undefined) {
                    globalActions.keyDownAction();
                    // Equivalent to event.preventDefault
                    return false;
                }
            }
            else {
                let actions = this.actionBindings.get(p.keyCode);
                if (actions !== undefined) {
                    if (actions.keyDownAction !== undefined) {
                        actions.keyDownAction();
                        // Equivalent to event.preventDefault
                        return false;
                    }
                }
            }
        }.bind(this);
        p.keyReleased = function () {
            let actions = this.actionBindings.get(p.keyCode);
            if (actions !== undefined) {
                if (actions.keyUpAction !== undefined) {
                    actions.keyUpAction();
                    // Equivalent to event.preventDefault
                    return false;
                }
            }
        }.bind(this);
    }
    bindKeyToAction(keyCode, keyDownAction, keyUpAction = undefined) {
        this.actionBindings.set(keyCode, { keyDownAction: keyDownAction, keyUpAction: keyUpAction });
    }
    unbindKey(keyCode) {
        return this.actionBindings.delete(keyCode);
    }
}


/***/ }),

/***/ "./src/scripts/miss_manager.ts":
/*!*************************************!*\
  !*** ./src/scripts/miss_manager.ts ***!
  \*************************************/
/*! exports provided: MissManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissManager", function() { return MissManager; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");


class MissManager {
    constructor(config, noteManager, accuracyRecording, holdManager, handleAccuracyEvent) {
        this.config = config;
        this.noteManager = noteManager;
        this.lastCheckedNoteIndices = [];
        for (let i = 0; i < this.noteManager.tracks.length; i++) {
            this.lastCheckedNoteIndices.push(0);
        }
        this.accuracyRecording = accuracyRecording;
        this.holdManager = holdManager;
        this.handleAccuracyEvent = handleAccuracyEvent;
    }
    update(currentTime) {
        if (this.config.accuracySettings[0].lowerBound != null) {
            return; // A lowerBound for misses is incompatible with this way of doing misses
        }
        let numTracks = this.noteManager.tracks.length;
        for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
            this.handleAllMissedNotesForTrack(trackNumber, currentTime);
        }
    }
    handleAllMissedNotesForTrack(trackNumber, currentTime) {
        let indexOfLastCheckedNote = this.lastCheckedNoteIndices[trackNumber];
        let track = this.noteManager.tracks[trackNumber];
        while (true) {
            if (indexOfLastCheckedNote >= track.length) {
                break;
            }
            let currentNote = track[indexOfLastCheckedNote];
            if (this.isNotMissable(currentNote)) {
                indexOfLastCheckedNote++;
                continue;
            }
            if (this.isNoteMissedAndNotHandled(currentNote, currentTime)) {
                this.handleMissedNote(trackNumber, indexOfLastCheckedNote, currentTime);
                indexOfLastCheckedNote++;
            }
            else {
                break;
            }
        }
        this.lastCheckedNoteIndices[trackNumber] = indexOfLastCheckedNote;
    }
    // For example: notes that have already been hit are not missable
    isNotMissable(note) {
        return note.state !== _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT;
    }
    isNoteMissedAndNotHandled(note, currentTime) {
        let missBoundary = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getMissBoundary"])(currentTime, this.config);
        return note.timeInSeconds < missBoundary && note.state === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT;
    }
    handleMissedNote(trackNumber, indexOfMissedNote, currentTimeInSeconds) {
        let track = this.noteManager.tracks[trackNumber];
        let missedNote = track[indexOfMissedNote];
        this.handleAccuracyEvent({
            accuracyName: this.config.accuracySettings[0].name,
            trackNumber: trackNumber,
            accuracyMillis: -Infinity,
            timeInSeconds: currentTimeInSeconds,
            noteType: missedNote.type
        });
        missedNote.state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].MISSED;
        if (missedNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
            if (this.holdManager.isTrackHeld(trackNumber)) {
                this.holdManager.unholdTrack(trackNumber, currentTimeInSeconds); // Force a hold release upon missing the tail
            }
        }
        else if (missedNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD) {
            let nextNote = track[indexOfMissedNote + 1];
            if (nextNote !== undefined) {
                if (nextNote.type === _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                    nextNote.state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteState"].MISSED; // Miss the tail when you miss the head
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/scripts/note_manager.ts":
/*!*************************************!*\
  !*** ./src/scripts/note_manager.ts ***!
  \*************************************/
/*! exports provided: NoteManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteManager", function() { return NoteManager; });
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");

class NoteManager {
    constructor(tracks) {
        this.tracks = tracks;
        this.removeUnsupportedNoteTypes();
    }
    removeUnsupportedNoteTypes() {
        let supportedNoteTypes = [_parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL, _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD, _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL];
        for (let trackNumber = 0; trackNumber < this.tracks.length; trackNumber++) {
            let track = this.tracks[trackNumber];
            for (let noteNumber = 0; noteNumber < track.length; noteNumber++) {
                let note = track[noteNumber];
                if (!supportedNoteTypes.includes(note.type)) {
                    track.splice(noteNumber, 1);
                    noteNumber--; // decrement note number so next iteration it starts at the right note
                }
            }
        }
    }
    getNotesByTimeRange(leastTime, greatestTime, trackNumber) {
        let track = this.tracks[trackNumber];
        let firstFindResult = this.findIndexOfFirstNoteAfterTime(leastTime, track);
        if (firstFindResult < 0) {
            return { startIndex: -1, endIndexNotInclusive: -1 }; // no notes left after least time
        }
        let lastFindResult = this.findIndexOfFirstNoteAfterTime(greatestTime, track, firstFindResult);
        if (lastFindResult < 0) {
            lastFindResult = track.length; // greatestTime exceeds the end of the notes
        }
        if (firstFindResult === 0) {
            if (lastFindResult === 0) {
                return { startIndex: -1, endIndexNotInclusive: -1 }; // haven't seen first note
            }
            else {
                return { startIndex: 0, endIndexNotInclusive: lastFindResult }; // notes are just starting
            }
        }
        return { startIndex: firstFindResult, endIndexNotInclusive: lastFindResult };
    }
    // This function assumes that no two notes will have the same time in the same track
    findIndexOfFirstNoteAfterTime(keyTime, track, searchStart = 0) {
        for (let i = searchStart; i < track.length; i++) {
            if (track[i].timeInSeconds > keyTime) {
                return i;
            }
        }
        return -1;
    }
    getEarliestNote() {
        let earliestNote;
        for (let i = 0; i < this.tracks.length; i++) {
            if (this.tracks[i].length > 0) {
                let trackEarliestNote = this.tracks[i][0];
                if (earliestNote == undefined) {
                    earliestNote = trackEarliestNote;
                }
                else if (earliestNote.timeInSeconds > trackEarliestNote.timeInSeconds) {
                    earliestNote = trackEarliestNote;
                }
            }
        }
        return earliestNote;
    }
    getLatestNote() {
        let latestNote;
        for (let i = 0; i < this.tracks.length; i++) {
            if (this.tracks[i].length > 0) {
                let trackLatestNote = this.tracks[i][this.tracks[i].length - 1];
                if (latestNote == undefined) {
                    latestNote = trackLatestNote;
                }
                else if (latestNote.timeInSeconds < trackLatestNote.timeInSeconds) {
                    latestNote = trackLatestNote;
                }
            }
        }
        return latestNote;
    }
    getTotalNotes() {
        return this.tracks.reduce((sum, track) => sum + track.length, 0);
    }
}


/***/ }),

/***/ "./src/scripts/note_skin.ts":
/*!**********************************!*\
  !*** ./src/scripts/note_skin.ts ***!
  \**********************************/
/*! exports provided: NoteSkin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteSkin", function() { return NoteSkin; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");
/* harmony import */ var _scroll_direction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scroll_direction */ "./src/scripts/scroll_direction.ts");



class NoteSkin {
    constructor(note, connector, tail, receptor) {
        this.rotationAngles = new Map([
            [4, [270, 180, 0, 90]],
            [6, [270, 315, 180, 0, 45, 90]]
        ]);
        this.note = note;
        this.connectorTile = connector;
        this.tail = tail;
        this.receptor = receptor;
    }
    // Returns true if able to draw note type, otherwise returns false
    drawNote(trackNumber, numTracks, centerX, centerY, noteType, noteSize) {
        switch (noteType) {
            case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NORMAL:
            case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD:
                this.drawImageRotated(this.note, trackNumber, numTracks, centerX, centerY, noteSize);
                break;
            case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL:
                this.drawTail(trackNumber, numTracks, centerX, centerY);
                break;
            default:
                return false;
        }
        return true;
    }
    // Returns true if able to draw note type, otherwise returns false
    drawReceptor(trackNumber, numTracks, centerX, centerY, noteSize) {
        this.drawImageRotated(this.receptor, trackNumber, numTracks, centerX, centerY, noteSize);
        return true;
    }
    // Returns true if able to draw note type, otherwise returns false
    drawHoldConnector(centerX, drawStartY, drawEndY, noteStartY, noteEndY) {
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        let noteSize = _index__WEBPACK_IMPORTED_MODULE_0__["global"].config.noteSize;
        let sourceWidth = this.connectorTile.width;
        let sourceHeight = this.connectorTile.height;
        let scaledWidth = noteSize;
        let scaledHeight = scaledWidth / sourceWidth * sourceHeight;
        let connectorHeight = Math.abs(drawEndY - drawStartY);
        let endYOffset = this.getNoteEndOffset(noteEndY, drawEndY);
        let endPartialTileHeight = scaledHeight - (endYOffset % scaledHeight);
        endPartialTileHeight = Math.min(endPartialTileHeight, connectorHeight);
        let startPartialTileHeight = (connectorHeight - endPartialTileHeight) % scaledHeight;
        let numCompleteTiles = Math.round((connectorHeight - startPartialTileHeight - endPartialTileHeight) / scaledHeight);
        // The following block allows us to use the same drawing method for both upscroll and downscroll
        let bottomPartialTileHeight;
        let topPartialTileHeight;
        if (_index__WEBPACK_IMPORTED_MODULE_0__["global"].config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_2__["ScrollDirection"].Up) {
            bottomPartialTileHeight = endPartialTileHeight;
            topPartialTileHeight = startPartialTileHeight;
        }
        else {
            bottomPartialTileHeight = startPartialTileHeight;
            topPartialTileHeight = endPartialTileHeight;
        }
        let drawMinY = Math.min(drawStartY, drawEndY);
        let drawMaxY = Math.max(drawStartY, drawEndY);
        let isReversed = _index__WEBPACK_IMPORTED_MODULE_0__["global"].config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_2__["ScrollDirection"].Up;
        let isDrawnFromBottom = _index__WEBPACK_IMPORTED_MODULE_0__["global"].config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_2__["ScrollDirection"].Up;
        if (endPartialTileHeight === connectorHeight) {
            isDrawnFromBottom = !isDrawnFromBottom;
        }
        this.drawPartialTile(centerX, drawMinY, scaledWidth, scaledHeight, sourceWidth, sourceHeight, topPartialTileHeight / scaledHeight, !isDrawnFromBottom, isReversed, p);
        this.drawCompleteTiles(centerX, drawMinY + topPartialTileHeight, scaledWidth, scaledHeight, numCompleteTiles, isReversed, p);
        this.drawPartialTile(centerX, drawMaxY - bottomPartialTileHeight, scaledWidth, scaledHeight, sourceWidth, sourceHeight, bottomPartialTileHeight / scaledHeight, isDrawnFromBottom, isReversed, p);
        return true;
    }
    drawTail(trackNumber, numTracks, centerX, centerY) {
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        let noteSize = _index__WEBPACK_IMPORTED_MODULE_0__["global"].config.noteSize;
        if (_index__WEBPACK_IMPORTED_MODULE_0__["global"].config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_2__["ScrollDirection"].Up) {
            p.push();
            p.angleMode(p.DEGREES);
            p.translate(centerX, centerY);
            p.rotate(180);
            p.image(this.tail, -noteSize / 2, -noteSize / 2, noteSize, noteSize);
            // p.image(this.tail, -noteSize / 2, -noteSize / 2, noteSize, noteSize / 2);
            p.pop();
        }
        else {
            p.image(this.tail, centerX - noteSize / 2, centerY - noteSize / 2, noteSize, noteSize);
            // p.image(this.tail, centerX - noteSize / 2, centerY - noteSize / 2, noteSize, noteSize / 2);
        }
    }
    getNoteEndOffset(noteEndY, drawEndY) {
        let offset;
        if (_index__WEBPACK_IMPORTED_MODULE_0__["global"].config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_2__["ScrollDirection"].Up) {
            offset = noteEndY - drawEndY;
        }
        else {
            offset = drawEndY - noteEndY;
        }
        // This prevents the partial tile texture from stretching when the player hits a hold early
        offset = Math.max(0, offset);
        return offset;
    }
    drawCompleteTiles(centerX, leastY, scaledWidth, scaledHeight, numTiles, isReversed, p) {
        for (let i = 0; i < numTiles; i++) {
            p.push();
            p.angleMode(p.DEGREES);
            let centerY = leastY + i * scaledHeight + scaledHeight / 2;
            p.translate(centerX, centerY);
            if (isReversed) {
                p.rotate(180);
            }
            p.image(this.connectorTile, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
            p.pop();
        }
    }
    drawPartialTile(centerX, topLeftY, scaledWidth, scaledHeight, sourceWidth, sourceHeight, heightPercent, isDrawnFromBottom, isReversed, p) {
        if (heightPercent <= 0) {
            return;
        }
        p.push();
        let destinationHeight = heightPercent * scaledHeight;
        let centerY = topLeftY + destinationHeight / 2;
        p.translate(centerX, centerY);
        if (isReversed) {
            p.angleMode(p.DEGREES);
            p.rotate(180);
        }
        if (isDrawnFromBottom) { // Draw from the bottom of the image
            p.image(this.connectorTile, -scaledWidth / 2, -destinationHeight / 2, scaledWidth, destinationHeight, 0, sourceHeight - heightPercent * sourceHeight, sourceWidth, heightPercent * sourceHeight);
        }
        else { // Draw from the top of the image
            p.image(this.connectorTile, -scaledWidth / 2, -destinationHeight / 2, scaledWidth, destinationHeight, 0, 0, sourceWidth, heightPercent * sourceHeight);
        }
        p.pop();
    }
    drawImageRotated(image, trackNumber, numTracks, centerX, centerY, noteSize) {
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        p.push();
        p.angleMode(p.DEGREES);
        p.translate(centerX, centerY);
        this.rotate(p, trackNumber, numTracks);
        p.image(image, -noteSize / 2, -noteSize / 2, noteSize, noteSize);
        p.pop();
    }
    rotate(p, trackNumber, numTracks) {
        if (this.rotationAngles.has(numTracks)) {
            p.rotate(this.rotationAngles.get(numTracks)[trackNumber]);
        }
        else {
            p.rotate(this.getDefaultRotationAngleInDegrees(trackNumber, numTracks));
        }
    }
    getDefaultRotationAngleInDegrees(trackNumber, numTracks) {
        let rotation = -90;
        let rotationPerTrack = 360 / numTracks;
        if (trackNumber < numTracks / 2) {
            rotation -= trackNumber * rotationPerTrack;
        }
        else {
            rotation += (trackNumber - numTracks / 2 + 1) * rotationPerTrack;
        }
        return rotation;
    }
}


/***/ }),

/***/ "./src/scripts/online_playlist.ts":
/*!****************************************!*\
  !*** ./src/scripts/online_playlist.ts ***!
  \****************************************/
/*! exports provided: OnlinePlaylistState, OnlinePlaylist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnlinePlaylistState", function() { return OnlinePlaylistState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnlinePlaylist", function() { return OnlinePlaylist; });
/* harmony import */ var _stepfile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stepfile */ "./src/scripts/stepfile.ts");
/* harmony import */ var _audio_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio_file */ "./src/scripts/audio_file.ts");
/* harmony import */ var _playlist_client_playlist_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlist_client/playlist_client */ "./src/scripts/playlist_client/playlist_client.ts");



var OnlinePlaylistState;
(function (OnlinePlaylistState) {
    OnlinePlaylistState[OnlinePlaylistState["NO_PLAYLIST"] = 0] = "NO_PLAYLIST";
    OnlinePlaylistState[OnlinePlaylistState["LOADING_PLAYLIST"] = 1] = "LOADING_PLAYLIST";
    OnlinePlaylistState[OnlinePlaylistState["PLAYLIST_READY"] = 2] = "PLAYLIST_READY";
    OnlinePlaylistState[OnlinePlaylistState["PLAYLIST_ERROR"] = 3] = "PLAYLIST_ERROR";
    OnlinePlaylistState[OnlinePlaylistState["LOADING_SONG"] = 4] = "LOADING_SONG";
    OnlinePlaylistState[OnlinePlaylistState["SONG_ERROR"] = 5] = "SONG_ERROR";
})(OnlinePlaylistState || (OnlinePlaylistState = {}));
class DisplayableSong {
    constructor(song) {
        this.song = song;
    }
    toString() {
        return this.song.songDifficulty + " " + this.song.songName;
    }
}
class OnlinePlaylist {
    constructor() {
        this.state = OnlinePlaylistState.NO_PLAYLIST;
        this.indexUrl = "";
        this.playlistClient = new _playlist_client_playlist_client__WEBPACK_IMPORTED_MODULE_2__["PlaylistClient"]();
    }
    kickOffLoadPlaylist(indexUrl) {
        this.state = OnlinePlaylistState.LOADING_PLAYLIST;
        this.playlistClient.initialize(indexUrl)
            .then(() => this.initializeDisplayedPlaylist())
            .catch(() => this.state = OnlinePlaylistState.PLAYLIST_ERROR);
    }
    initializeDisplayedPlaylist() {
        this.setPage(0);
        this.state = OnlinePlaylistState.PLAYLIST_READY;
    }
    kickOffLoadSong(displayedSongIndex, stepfile, audioFile) {
        this.state = OnlinePlaylistState.LOADING_SONG;
        audioFile.state = _audio_file__WEBPACK_IMPORTED_MODULE_1__["AudioFileState"].NO_AUDIO_FILE;
        stepfile.state = _stepfile__WEBPACK_IMPORTED_MODULE_0__["StepfileState"].NO_STEPFILE;
        this.playlistClient.getSwf(this.getSongIndex(displayedSongIndex))
            .then((swfParseResponse) => this.loadSwfIntoStepfileAndAudioFile(swfParseResponse, stepfile, audioFile))
            .catch(() => this.state = OnlinePlaylistState.SONG_ERROR);
    }
    getSongIndex(displayedSongIndex) {
        return displayedSongIndex + this.pageSize * this.pageNumber;
    }
    loadSwfIntoStepfileAndAudioFile(swfParseResponse, stepfile, audioFile) {
        stepfile.loadFfrBeatmap(swfParseResponse.chartData);
        audioFile.loadBlob(swfParseResponse.blob);
    }
    getPage() {
        return this.pageNumber;
    }
    nextPage() {
        this.setPage(this.pageNumber + 1);
    }
    previousPage() {
        this.setPage(this.pageNumber - 1);
    }
    setPage(pageNumber, pageSize) {
        pageSize = this.getValidPageSize(pageSize);
        if (!this.isValidPageNumber(pageNumber, pageSize)) {
            return;
        }
        let minIndex = pageNumber * pageSize;
        let maxIndex = minIndex + pageSize;
        this.displayedPlaylist = [];
        for (let i = minIndex; i < maxIndex; i++) {
            if (i < this.playlistClient.getPlaylist().length) {
                this.displayedPlaylist.push(this.getDisplayableSong(i));
            }
        }
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
    isValidPageNumber(pageNumber, pageSize) {
        return 0 <= pageNumber && pageNumber <= this.getMaxPageNumber(pageSize);
    }
    getDisplayableSong(songIndex) {
        return new DisplayableSong(this.playlistClient.getPlaylist()[songIndex]);
    }
    getValidPageSize(pageSize) {
        if (pageSize === undefined) {
            return OnlinePlaylist.DEFAULT_PAGE_SIZE;
        }
        else if (pageSize < 1) {
            return 1;
        }
        else if (pageSize > 100) {
            return 100;
        }
    }
    getMaxPageNumber(pageSize) {
        return Math.floor(this.playlistClient.getPlaylist().length / pageSize) - 1;
    }
}
OnlinePlaylist.DEFAULT_PAGE_SIZE = 50;


/***/ }),

/***/ "./src/scripts/p5_scene.ts":
/*!*********************************!*\
  !*** ./src/scripts/p5_scene.ts ***!
  \*********************************/
/*! exports provided: P5Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P5Scene", function() { return P5Scene; });
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ "p5");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _keyboard_event_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard_event_manager */ "./src/scripts/keyboard_event_manager.ts");
/* harmony import */ var _preview_display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./preview_display */ "./src/scripts/preview_display.ts");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page_manager */ "./src/scripts/page_manager.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");
/* harmony import */ var _note_skin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./note_skin */ "./src/scripts/note_skin.ts");







let width = 720;
let height = 480;
class P5Scene {
    constructor() {
        this.sketchInstance = new p5__WEBPACK_IMPORTED_MODULE_0__((p) => {
            let renderer;
            function centerCanvas() {
                // renderer.center(); // Disable this for now to make embedding work
            }
            p.preload = function () {
                _index__WEBPACK_IMPORTED_MODULE_4__["global"].noteSkin = new _note_skin__WEBPACK_IMPORTED_MODULE_6__["NoteSkin"](p.loadImage("../assets/arrow_blue_v3.png"), p.loadImage("../assets/connector_tile_resize.png"), p.loadImage("../assets/tail_square.png"), p.loadImage("../assets/arrow_receptor.png"));
                _index__WEBPACK_IMPORTED_MODULE_4__["global"].playFromFileBackground = p.loadImage("../assets/play_from_file_background.jpg");
                _index__WEBPACK_IMPORTED_MODULE_4__["global"].optionsBackground = _index__WEBPACK_IMPORTED_MODULE_4__["global"].playFromFileBackground;
            };
            p.setup = function () {
                renderer = p.createCanvas(width, height);
                renderer.addClass(_index__WEBPACK_IMPORTED_MODULE_4__["global"].globalClass);
                _index__WEBPACK_IMPORTED_MODULE_4__["global"].keyboardEventManager = new _keyboard_event_manager__WEBPACK_IMPORTED_MODULE_1__["KeyboardEventManager"](p);
                _index__WEBPACK_IMPORTED_MODULE_4__["global"].previewDisplay = new _preview_display__WEBPACK_IMPORTED_MODULE_2__["PreviewDisplay"](Object(_util__WEBPACK_IMPORTED_MODULE_5__["generatePreviewNotes"])(4), _index__WEBPACK_IMPORTED_MODULE_4__["global"].config, _index__WEBPACK_IMPORTED_MODULE_4__["global"].p5Scene);
                renderer.style('display', 'block'); // Makes the canvas be able to fill the whole browser window
                centerCanvas();
            };
            p.draw = function () {
                p.clear();
                _page_manager__WEBPACK_IMPORTED_MODULE_3__["PageManager"].draw();
            };
            p.windowResized = function () {
                centerCanvas();
            };
        });
    }
}


/***/ }),

/***/ "./src/scripts/page_manager.ts":
/*!*************************************!*\
  !*** ./src/scripts/page_manager.ts ***!
  \*************************************/
/*! exports provided: PAGES, PageManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGES", function() { return PAGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageManager", function() { return PageManager; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _pages_play_from_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/play_from_file */ "./src/scripts/pages/play_from_file.ts");
/* harmony import */ var _pages_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/options */ "./src/scripts/pages/options.ts");
/* harmony import */ var _pages_play__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/play */ "./src/scripts/pages/play.ts");
/* harmony import */ var _pages_results__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/results */ "./src/scripts/pages/results.ts");
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom_wrapper */ "./src/scripts/dom_wrapper.ts");
/* harmony import */ var _pages_play_from_online__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/play_from_online */ "./src/scripts/pages/play_from_online.ts");







var PAGES;
(function (PAGES) {
    PAGES[PAGES["PLAY_FROM_FILE"] = 0] = "PLAY_FROM_FILE";
    PAGES[PAGES["OPTIONS"] = 1] = "OPTIONS";
    PAGES[PAGES["PLAY"] = 2] = "PLAY";
    PAGES[PAGES["RESULTS"] = 3] = "RESULTS";
    PAGES[PAGES["PLAY_FROM_ONLINE"] = 4] = "PLAY_FROM_ONLINE";
})(PAGES || (PAGES = {}));
class PageManager {
    static setCurrentPage(page) {
        if (this.currentPage !== PAGES.PLAY) {
            this.returnPage = this.currentPage;
        }
        this.currentPage = page;
        _dom_wrapper__WEBPACK_IMPORTED_MODULE_5__["DOMWrapper"].clearRegistry();
    }
    static return() {
        this.setCurrentPage(this.returnPage);
    }
    static draw() {
        switch (this.currentPage) {
            case PAGES.PLAY_FROM_FILE:
                _pages_play_from_file__WEBPACK_IMPORTED_MODULE_1__["PlayFromFile"].draw();
                break;
            case PAGES.OPTIONS:
                _pages_options__WEBPACK_IMPORTED_MODULE_2__["Options"].draw();
                break;
            case PAGES.PLAY:
                _pages_play__WEBPACK_IMPORTED_MODULE_3__["Play"].draw();
                break;
            case PAGES.RESULTS:
                _pages_results__WEBPACK_IMPORTED_MODULE_4__["Results"].draw();
                break;
            case PAGES.PLAY_FROM_ONLINE:
                _pages_play_from_online__WEBPACK_IMPORTED_MODULE_6__["PlayFromOnline"].draw();
                break;
            default:
                throw new Error("Unexpected page: " + _index__WEBPACK_IMPORTED_MODULE_0__["global"].currentPage);
        }
    }
}
PageManager.currentPage = PAGES.PLAY_FROM_FILE;


/***/ }),

/***/ "./src/scripts/pages/options.ts":
/*!**************************************!*\
  !*** ./src/scripts/pages/options.ts ***!
  \**************************************/
/*! exports provided: Options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return Options; });
/* harmony import */ var _scroll_direction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scroll_direction */ "./src/scripts/scroll_direction.ts");
/* harmony import */ var _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui_util */ "./src/scripts/ui_util.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ "./src/scripts/index.ts");
/* harmony import */ var _accuracy_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../accuracy_manager */ "./src/scripts/accuracy_manager.ts");
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom_wrapper */ "./src/scripts/dom_wrapper.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./src/scripts/config.ts");
/* harmony import */ var _key_bindings_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../key_bindings_ui */ "./src/scripts/key_bindings_ui.ts");
/* harmony import */ var _ticker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ticker */ "./src/scripts/ticker.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util */ "./src/scripts/util.ts");









class Options {
    static draw() {
        let p = _index__WEBPACK_IMPORTED_MODULE_2__["global"].p5Scene.sketchInstance;
        p.background(_index__WEBPACK_IMPORTED_MODULE_2__["global"].optionsBackground);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["drawHeading"])();
        let scrollDiv = _dom_wrapper__WEBPACK_IMPORTED_MODULE_4__["DOMWrapper"].create(() => {
            return p.createDiv();
        }, "scrollDiv");
        if (!scrollDiv.alreadyExists) {
            scrollDiv.element.addClass("options-scroll-div");
            scrollDiv.element.addClass(Options.OPTIONS_CLASS);
            scrollDiv.element.addClass(_index__WEBPACK_IMPORTED_MODULE_2__["global"].globalClass);
        }
        // @ts-ignore
        let canvasPosition = p._renderer.position();
        scrollDiv.element.position(canvasPosition.x + 335, canvasPosition.y + 45);
        let resetConfigButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_4__["DOMWrapper"].create(() => {
            return p.createButton("Reset To Default");
        }, "resetConfigButton");
        if (!resetConfigButton.alreadyExists) {
            resetConfigButton.element.addClass(Options.OPTIONS_CLASS);
            resetConfigButton.element.addClass("reset-config");
            resetConfigButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_2__["global"].globalClass);
            resetConfigButton.element.mousePressed(() => {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config = new _config__WEBPACK_IMPORTED_MODULE_5__["Config"]({});
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
                _key_bindings_ui__WEBPACK_IMPORTED_MODULE_6__["KeyBindingsUi"].resetNumTracks();
                _key_bindings_ui__WEBPACK_IMPORTED_MODULE_6__["KeyBindingsUi"].regeneratePreview();
                _dom_wrapper__WEBPACK_IMPORTED_MODULE_4__["DOMWrapper"].clearRegistry();
            });
            scrollDiv.element.child(resetConfigButton.element);
        }
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledInput"])("Pause at Start (sec)", "pauseAtStartInSecondsInput", _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pauseAtStartInSeconds.toString(), Options.OPTIONS_CLASS), this.isValidPauseAtStart.bind(this), this.showPauseAtStartInfo.bind(this), this.showPauseAtStartError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pauseAtStartInSeconds = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getFloat"])(input);
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledInput"])("Scroll Speed (px/sec)", "scrollSpeedInput", _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pixelsPerSecond.toString(), Options.OPTIONS_CLASS), this.isValidScrollSpeed.bind(this), this.showScrollSpeedInfo.bind(this), this.showScrollSpeedError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pixelsPerSecond = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getFloat"])(input);
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Scroll Direction", "scrollDirectionSelect", _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"], _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.scrollDirection, Options.OPTIONS_CLASS), this.isValidScrollDirection.bind(this), this.showScrollDirectionInfo.bind(this), this.showScrollDirectionError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.scrollDirection = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getEnum"])(input, _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"]);
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledInput"])("Receptor Position (%)", "receptorPositionInput", _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.receptorYPercent.toString(), Options.OPTIONS_CLASS), this.isValidReceptorPosition.bind(this), this.showReceptorPositionInfo.bind(this), this.showReceptorPositionError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.receptorYPercent = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getFloat"])(input);
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledInput"])("Accuracy Offset (ms)", "additionalOffsetInput", (_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.additionalOffsetInSeconds * 1000).toString(), Options.OPTIONS_CLASS), this.isValidAdditionalOffset.bind(this), this.showAdditionalOffsetInfo.bind(this), this.showAdditionalOffsetError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.additionalOffsetInSeconds = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getFloat"])(input) / 1000;
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledTextArea"])("Accuracy Settings", "accuracySettingsInput", JSON.stringify(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.accuracySettings, null, 3), Options.OPTIONS_CLASS), this.isValidAccuracySettings.bind(this), this.showAccuracySettingsInfo.bind(this), this.showAccuracySettingsError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.accuracySettings = parseAccuracySettingsJson(String(input));
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Accuracy Flash", "accuracyFlashEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyFlashEnabled), Options.OPTIONS_CLASS), this.isValidAccuracyFlash.bind(this), this.showAccuracyFlashInfo.bind(this), this.showAccuracyFlashError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyFlashEnabled = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["yesNoToBoolean"])(Object(_util__WEBPACK_IMPORTED_MODULE_8__["getEnum"])(input, _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"]));
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Accuracy Particles", "accuracyParticlesEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyParticlesEnabled), Options.OPTIONS_CLASS), this.isValidAccuracyParticles.bind(this), this.showAccuracyParticlesInfo.bind(this), this.showAccuracyParticlesError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyParticlesEnabled = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["yesNoToBoolean"])(Object(_util__WEBPACK_IMPORTED_MODULE_8__["getEnum"])(input, _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"]));
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Accuracy Text", "accuracyTextEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyTextEnabled), Options.OPTIONS_CLASS), this.isValidAccuracyText.bind(this), this.showAccuracyTextInfo.bind(this), this.showAccuracyTextError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyTextEnabled = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["yesNoToBoolean"])(Object(_util__WEBPACK_IMPORTED_MODULE_8__["getEnum"])(input, _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"]));
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Hold Particles", "holdParticlesEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldParticlesEnabled), Options.OPTIONS_CLASS), this.isValidHoldParticles.bind(this), this.showHoldParticlesInfo.bind(this), this.showHoldParticlesError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldParticlesEnabled = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["yesNoToBoolean"])(Object(_util__WEBPACK_IMPORTED_MODULE_8__["getEnum"])(input, _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"]));
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createUserInput"])(() => Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Hold Glow", "holdGlowEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldGlowEnabled), Options.OPTIONS_CLASS), this.isValidHoldGlow.bind(this), this.showHoldGlowInfo.bind(this), this.showHoldGlowError.bind(this), (input) => {
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldGlowEnabled = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["yesNoToBoolean"])(Object(_util__WEBPACK_IMPORTED_MODULE_8__["getEnum"])(input, _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"]));
            _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
        }, scrollDiv.element);
        _key_bindings_ui__WEBPACK_IMPORTED_MODULE_6__["KeyBindingsUi"].create(scrollDiv.element, Options.OPTIONS_CLASS);
        _index__WEBPACK_IMPORTED_MODULE_2__["global"].previewDisplay.draw();
        let ticker = _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].create(this.DEFAULT_TICKER_MESSAGE, Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setElementToBottom"])(ticker.element, 4.2, 12, 8);
    }
    static isValidPauseAtStart(value) {
        return this.isFloatGreaterThanOrEqualZero(value);
    }
    static showPauseAtStartInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Delay the start of the song to give yourself more time to get ready.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showPauseAtStartError() {
        this.showNumberNotGreaterThanOrEqualZeroError();
    }
    static isValidScrollSpeed(value) {
        return this.isFloatGreaterThanOrEqualZero(value);
    }
    static showScrollSpeedInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("The movement speed of the notes. Higher values will make the notes look farther apart.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showScrollSpeedError() {
        this.showNumberNotGreaterThanOrEqualZeroError();
    }
    static isValidScrollDirection(value) {
        let enumValue = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getEnum"])(value, _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"]);
        return enumValue !== undefined;
    }
    static showScrollDirectionInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Controls which way the arrows go.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showScrollDirectionError() {
        this.showSelectError();
    }
    static isValidReceptorPosition(value) {
        return this.isFloat(value);
    }
    static showReceptorPositionInfo() {
        let oppositeDirection;
        if (_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"].Down) {
            oppositeDirection = "up";
        }
        else {
            oppositeDirection = "down";
        }
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Increase this value to move the receptors " + oppositeDirection + ".", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showReceptorPositionError() {
        this.showValueNotNumberError();
    }
    static isValidAdditionalOffset(value) {
        return this.isFloat(value);
    }
    static showAdditionalOffsetInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Shifts the time position of all the notes. Use this to help synchronize the music.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showAdditionalOffsetError() {
        this.showValueNotNumberError();
    }
    static isValidAccuracySettings(value) {
        let stringValue = String(value);
        return parseAccuracySettingsJson(stringValue) !== null;
    }
    static showAccuracySettingsInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Controls what happens when you hit a note too early, too late, or exactly right.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showAccuracySettingsError() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Error: unable to parse the JSON text.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].ERROR);
    }
    static isValidAccuracyFlash(value) {
        return this.isValidYesNo(value);
    }
    static showAccuracyFlashInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("A flash effect that shows on the receptors when you hit a note.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showAccuracyFlashError() {
        this.showSelectError();
    }
    static isValidAccuracyParticles(value) {
        return this.isValidYesNo(value);
    }
    static showAccuracyParticlesInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Particles that shoot out of the receptors when you hit a note.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showAccuracyParticlesError() {
        this.showSelectError();
    }
    static isValidAccuracyText(value) {
        return this.isValidYesNo(value);
    }
    static showAccuracyTextInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Text that pops up telling you what accuracy you hit a note with.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showAccuracyTextError() {
        this.showSelectError();
    }
    static isValidHoldParticles(value) {
        return this.isValidYesNo(value);
    }
    static showHoldParticlesInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Particles that shoot out while you're holding a note.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showHoldParticlesError() {
        this.showSelectError();
    }
    static isValidHoldGlow(value) {
        return this.isValidYesNo(value);
    }
    static showHoldGlowInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("A glow effect on the receptors that shows when you're holding a note.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showHoldGlowError() {
        this.showSelectError();
    }
    static isFloatGreaterThanOrEqualZero(value) {
        let numberValue = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getFloat"])(value);
        return !isNaN(numberValue) && numberValue >= 0;
    }
    static showNumberNotGreaterThanOrEqualZeroError() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Error: must be a number greater than or equal to zero.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].ERROR);
    }
    static isValidYesNo(value) {
        let enumValue = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getEnum"])(value, _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"]);
        return enumValue !== undefined;
    }
    static showSelectError() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Error: huh... not sure how you did that.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].ERROR);
    }
    static showValueNotNumberError() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Error: must be a number.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].ERROR);
    }
    static isFloat(value) {
        let numberValue = Object(_util__WEBPACK_IMPORTED_MODULE_8__["getFloat"])(value);
        return !isNaN(numberValue);
    }
}
Options.OPTIONS_CLASS = "options";
Options.DEFAULT_TICKER_MESSAGE = "All the options! Click an option to show more information about it.";
function parseAccuracySettingsJson(accuracySettingsJson) {
    try {
        let accuracySettings = [];
        let jsonArray = JSON.parse(accuracySettingsJson);
        for (let i = 0; i < jsonArray.length; i++) {
            let accuracy = jsonArray[i];
            // this fails if the user gave the wrong input
            accuracySettings.push(new _accuracy_manager__WEBPACK_IMPORTED_MODULE_3__["Accuracy"](accuracy.name, accuracy.lowerBound, accuracy.upperBound));
        }
        return accuracySettings;
    }
    catch (e) {
    }
    return null;
}


/***/ }),

/***/ "./src/scripts/pages/play.ts":
/*!***********************************!*\
  !*** ./src/scripts/pages/play.ts ***!
  \***********************************/
/*! exports provided: Play */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Play", function() { return Play; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/scripts/index.ts");

class Play {
    static draw() {
        _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance.background("black");
        _index__WEBPACK_IMPORTED_MODULE_0__["global"].playingDisplay.draw();
    }
}


/***/ }),

/***/ "./src/scripts/pages/play_from_file.ts":
/*!*********************************************!*\
  !*** ./src/scripts/pages/play_from_file.ts ***!
  \*********************************************/
/*! exports provided: PlayFromFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayFromFile", function() { return PlayFromFile; });
/* harmony import */ var _ui_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui_util */ "./src/scripts/ui_util.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/scripts/index.ts");
/* harmony import */ var _stepfile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stepfile */ "./src/scripts/stepfile.ts");
/* harmony import */ var _audio_file__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../audio_file */ "./src/scripts/audio_file.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util */ "./src/scripts/util.ts");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../page_manager */ "./src/scripts/page_manager.ts");
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom_wrapper */ "./src/scripts/dom_wrapper.ts");







const playFromFileStepfile = new _stepfile__WEBPACK_IMPORTED_MODULE_2__["Stepfile"]();
const playFromFileAudioFile = new _audio_file__WEBPACK_IMPORTED_MODULE_3__["AudioFile"]();
class PlayFromFile {
    static draw() {
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["drawHeading"])();
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        p.background(_index__WEBPACK_IMPORTED_MODULE_1__["global"].playFromFileBackground);
        let stepfileInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["createFileInput"])(getStepfileInputLabel(), "Choose Stepfile (.sm)", "stepfileInput", loadStepfileAndUpdateModeOptions, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(stepfileInput, 0.43, 0.3, 268, 34);
        let audioFileInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["createFileInput"])(getAudioFileInputLabel(), "Choose Audio File (.mp3, .ogg)", "audioFileInput", playFromFileAudioFile.loadFile.bind(playFromFileAudioFile), PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(audioFileInput, 0.43, 0.45, 325, 34);
        let playButtonId = "playButton";
        if (Object(_util__WEBPACK_IMPORTED_MODULE_4__["isFilesReady"])(playFromFileStepfile, playFromFileAudioFile)) {
            let modeRadio = drawModeSelect(p, PlayFromFile.MODE_RADIO_ID);
            if (modeRadio.value() !== "") { // if user has selected a mode
                let playButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_6__["DOMWrapper"].create(() => {
                    return p.createButton("Play");
                }, playButtonId);
                Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(playButton.element, 0.5, 0.88, 60, 34);
                if (!playButton.alreadyExists) {
                    playButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass);
                    playButton.element.mouseClicked(() => {
                        let selectedMode = getSelectedMode(modeRadio);
                        playFromFileStepfile.finishParsing(selectedMode.id);
                        Object(_util__WEBPACK_IMPORTED_MODULE_4__["initPlayingDisplay"])(playFromFileStepfile.fullParse.tracks, playFromFileAudioFile);
                        _page_manager__WEBPACK_IMPORTED_MODULE_5__["PageManager"].setCurrentPage(_page_manager__WEBPACK_IMPORTED_MODULE_5__["PAGES"].PLAY);
                    });
                }
            }
            else {
                _dom_wrapper__WEBPACK_IMPORTED_MODULE_6__["DOMWrapper"].removeElementById(playButtonId);
            }
        }
        else {
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_6__["DOMWrapper"].removeElementById(PlayFromFile.MODE_RADIO_ID);
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_6__["DOMWrapper"].removeElementById(playButtonId);
        }
    }
}
PlayFromFile.PLAY_FROM_FILE_CLASS = "play-from-file";
PlayFromFile.MODE_RADIO_ID = "modeRadio";
function loadStepfileAndUpdateModeOptions(file) {
    playFromFileStepfile.loadFile.call(playFromFileStepfile, file);
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions = undefined;
    _dom_wrapper__WEBPACK_IMPORTED_MODULE_6__["DOMWrapper"].removeElementById(PlayFromFile.MODE_RADIO_ID);
}
function drawModeSelect(p, uniqueId) {
    p.push();
    if (_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions === undefined) {
        _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions = Object(_util__WEBPACK_IMPORTED_MODULE_4__["getModeOptionsForDisplay"])(playFromFileStepfile.partialParse.modes);
    }
    let modeRadioClass = "mode-radio";
    let modeRadioOptionClass = "mode-radio-option";
    let modeRadioCreateResult = _dom_wrapper__WEBPACK_IMPORTED_MODULE_6__["DOMWrapper"].create(() => {
        return p.createRadio();
    }, uniqueId);
    let modeRadio = modeRadioCreateResult.element;
    if (!modeRadioCreateResult.alreadyExists) {
        modeRadio.id("radio-div");
        for (let i = 0; i < _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions.length; i++) {
            let mode = _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions[i];
            let radioLabel = mode.type + ", " + mode.difficulty + ", " + mode.meter;
            // @ts-ignore
            let radioOption = modeRadio.option(radioLabel);
            // setting the value this way because the two-argument .option method wasn't working
            // setting the value is necessary so we can access the selected mode
            radioOption.value = i;
        }
        // This style is being set on the div containing the radio elements to make it a scrollable box
        modeRadio.addClass(modeRadioClass);
        modeRadio.addClass(_index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["encloseEachInputLabelPairIntoASubDiv"])(p, modeRadio);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["fixRadioDivElement"])(modeRadio);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["styleRadioOptions"])(p, modeRadio, [modeRadioOptionClass, _index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass]);
    }
    Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(modeRadio, 0.5, 0.7, 302, 120);
    p.pop();
    return modeRadio;
}
function getSelectedMode(modeRadio) {
    return _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions[modeRadio.value()];
}
function getStepfileInputLabel() {
    switch (playFromFileStepfile.state) {
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].NO_STEPFILE:
            return "No file chosen";
            break;
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].DONE_READING:
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].PARTIALLY_PARSED:
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].FULLY_PARSED:
            return truncateFileNameIfTooLong(playFromFileStepfile.file.name, 30);
            break;
        default:
            return "Error";
    }
}
function getAudioFileInputLabel() {
    switch (playFromFileAudioFile.state) {
        case _audio_file__WEBPACK_IMPORTED_MODULE_3__["AudioFileState"].NO_AUDIO_FILE:
            return "No file chosen";
            break;
        case _audio_file__WEBPACK_IMPORTED_MODULE_3__["AudioFileState"].DONE_READING:
        case _audio_file__WEBPACK_IMPORTED_MODULE_3__["AudioFileState"].BUFFERED:
            return truncateFileNameIfTooLong(playFromFileAudioFile.file.name, 30);
            break;
        default:
            return "Error";
    }
}
function truncateFileNameIfTooLong(fullFileName, maxLength) {
    if (fullFileName.length <= maxLength) {
        return fullFileName;
    }
    return fullFileName.substr(0, maxLength - 11) +
        "..." +
        fullFileName.substr(fullFileName.length - 10);
}


/***/ }),

/***/ "./src/scripts/pages/play_from_online.ts":
/*!***********************************************!*\
  !*** ./src/scripts/pages/play_from_online.ts ***!
  \***********************************************/
/*! exports provided: PlayFromOnline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayFromOnline", function() { return PlayFromOnline; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/scripts/index.ts");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! p5 */ "p5");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui_util */ "./src/scripts/ui_util.ts");
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom_wrapper */ "./src/scripts/dom_wrapper.ts");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../page_manager */ "./src/scripts/page_manager.ts");
/* harmony import */ var _online_playlist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../online_playlist */ "./src/scripts/online_playlist.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util */ "./src/scripts/util.ts");
/* harmony import */ var _stepfile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../stepfile */ "./src/scripts/stepfile.ts");
/* harmony import */ var _audio_file__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../audio_file */ "./src/scripts/audio_file.ts");









const playFromOnlineStepfile = new _stepfile__WEBPACK_IMPORTED_MODULE_7__["Stepfile"]();
const playFromOnlineAudioFile = new _audio_file__WEBPACK_IMPORTED_MODULE_8__["AudioFile"]();
// This prevents loading previous song upon returning to a loaded playlist
let isSwfLoadStarted = false;
class PlayFromOnline {
    static draw() {
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["drawHeading"])();
        let onlinePlaylist = _index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist;
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        p.background(_index__WEBPACK_IMPORTED_MODULE_0__["global"].playFromFileBackground);
        let urlInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledInput"])("Engine URL", "urlInput", onlinePlaylist.indexUrl, PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
        // @ts-ignore
        let urlInputDiv = new p5__WEBPACK_IMPORTED_MODULE_1__["Element"](urlInput.element.parent());
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["setElementCenterPositionRelative"])(urlInputDiv, 0.50, 0.21, 600, 38);
        let loadButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
            return p.createButton("Load");
        }, "loadButton");
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["setElementCenterPositionRelative"])(loadButton.element, 0.85, 0.215, 62, 33);
        if (!loadButton.alreadyExists) {
            loadButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
            loadButton.element.addClass(PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
            loadButton.element.mouseClicked(() => {
                let value = urlInput.element.value();
                if (typeof value === "string") {
                    loadButton.element.attribute('disabled', '');
                    onlinePlaylist.kickOffLoadPlaylist(value);
                }
            });
        }
        if (onlinePlaylist.state !== _online_playlist__WEBPACK_IMPORTED_MODULE_5__["OnlinePlaylistState"].LOADING_PLAYLIST) {
            loadButton.element.removeAttribute('disabled');
        }
        if (onlinePlaylist.state === _online_playlist__WEBPACK_IMPORTED_MODULE_5__["OnlinePlaylistState"].PLAYLIST_READY ||
            onlinePlaylist.state === _online_playlist__WEBPACK_IMPORTED_MODULE_5__["OnlinePlaylistState"].LOADING_SONG) {
            let playlistMenuId = "playlistMenu";
            let playlistMenu = drawRadioMenu(p, playlistMenuId, onlinePlaylist.displayedPlaylist);
            Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["setElementCenterPositionRelative"])(playlistMenu, 0.5, 0.62, 500, 200);
            drawPageControls(p, playlistMenuId);
            if (playlistMenu.value() !== "") {
                let loadAndPlayButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
                    return p.createButton("Load And Play");
                }, "loadAndPlayButton");
                Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["setElementCenterPositionRelative"])(loadAndPlayButton.element, 0.5, 0.88, 118, 34);
                if (!loadAndPlayButton.alreadyExists) {
                    loadAndPlayButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
                    loadAndPlayButton.element.mouseClicked(() => {
                        let value = playlistMenu.value();
                        if (typeof value === "string") {
                            value = parseInt(value);
                        }
                        if (Number.isInteger(value)) {
                            loadAndPlayButton.element.attribute('disabled', '');
                            onlinePlaylist.kickOffLoadSong(value, playFromOnlineStepfile, playFromOnlineAudioFile);
                            isSwfLoadStarted = true;
                        }
                    });
                }
                if (onlinePlaylist.state !== _online_playlist__WEBPACK_IMPORTED_MODULE_5__["OnlinePlaylistState"].LOADING_SONG) {
                    loadAndPlayButton.element.removeAttribute('disabled');
                }
                if (Object(_util__WEBPACK_IMPORTED_MODULE_6__["isFilesReady"])(playFromOnlineStepfile, playFromOnlineAudioFile) && isSwfLoadStarted) {
                    Object(_util__WEBPACK_IMPORTED_MODULE_6__["initPlayingDisplay"])(playFromOnlineStepfile.fullParse.tracks, playFromOnlineAudioFile);
                    _page_manager__WEBPACK_IMPORTED_MODULE_4__["PageManager"].setCurrentPage(_page_manager__WEBPACK_IMPORTED_MODULE_4__["PAGES"].PLAY);
                }
            }
            else {
                _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].removeElementById("loadAndPlayButton");
                isSwfLoadStarted = false;
            }
        }
        else {
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].removeElementById("playlistMenu");
        }
    }
}
PlayFromOnline.PLAY_FROM_ONLINE_CLASS = "play-from-online";
function drawRadioMenu(p, uniqueId, items) {
    let menuClass = "playlist-radio";
    let menuItemClass = "playlist-radio-option";
    let radioMenuCreateResult = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        return p.createRadio();
    }, uniqueId);
    let radioMenu = radioMenuCreateResult.element;
    if (!radioMenuCreateResult.alreadyExists) {
        radioMenu.id("radio-div");
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let radioLabel = item.toString();
            // @ts-ignore
            let radioOption = radioMenu.option(radioLabel);
            // setting the value this way because the two-argument .option method wasn't working
            // setting the value is necessary so we can access the selected mode
            radioOption.value = i;
        }
        // This style is being set on the div containing the radio elements to make it a scrollable box
        radioMenu.addClass(menuClass);
        radioMenu.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["encloseEachInputLabelPairIntoASubDiv"])(p, radioMenu);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["fixRadioDivElement"])(radioMenu);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["styleRadioOptions"])(p, radioMenu, [menuItemClass, _index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass]);
    }
    return radioMenu;
}
function drawPageControls(p, playlistMenuId) {
    let pageControlsDiv = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        return p.createDiv();
    }, "pageControlsDiv");
    if (!pageControlsDiv.alreadyExists) {
        pageControlsDiv.element.addClass("page-controls");
        pageControlsDiv.element.addClass(PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
        pageControlsDiv.element.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["setElementCenterPositionRelative"])(pageControlsDiv.element, 0.5, 0.383, 140, 30);
    }
    let pageNumberText = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        let textContainer = p.createElement("span");
        textContainer.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        return textContainer;
    }, "pageNumberText");
    let previousPageButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        return p.createButton("&#8249;");
    }, "previousPageButton");
    if (!previousPageButton.alreadyExists) {
        previousPageButton.element.mouseClicked(() => {
            _index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.previousPage();
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].removeElementById(playlistMenuId);
            pageNumberText.element.html("Page " + (_index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.getPage() + 1));
        });
        previousPageButton.element.addClass("page-control-button");
        pageControlsDiv.element.child(previousPageButton.element);
    }
    if (!pageNumberText.alreadyExists) {
        pageControlsDiv.element.child(pageNumberText.element);
        pageNumberText.element.html("Page " + (_index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.getPage() + 1));
    }
    let nextPageButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        return p.createButton("&#8250;");
    }, "nextPageButton");
    if (!nextPageButton.alreadyExists) {
        nextPageButton.element.mouseClicked(() => {
            _index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.nextPage();
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].removeElementById(playlistMenuId);
            pageNumberText.element.html("Page " + (_index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.getPage() + 1));
        });
        nextPageButton.element.addClass("page-control-button");
        pageControlsDiv.element.child(nextPageButton.element);
    }
}


/***/ }),

/***/ "./src/scripts/pages/results.ts":
/*!**************************************!*\
  !*** ./src/scripts/pages/results.ts ***!
  \**************************************/
/*! exports provided: Results */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Results", function() { return Results; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/scripts/index.ts");
/* harmony import */ var _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui_util */ "./src/scripts/ui_util.ts");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../page_manager */ "./src/scripts/page_manager.ts");
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom_wrapper */ "./src/scripts/dom_wrapper.ts");




class Results {
    static draw() {
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        p.background("black");
        _index__WEBPACK_IMPORTED_MODULE_0__["global"].resultsDisplay.draw();
        let returnButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
            return p.createButton("Return");
        }, "returnButton");
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setElementCenterPositionRelative"])(returnButton.element, 0.5, 0.9, 73, 34);
        if (!returnButton.alreadyExists) {
            returnButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
            returnButton.element.mouseClicked(() => {
                _page_manager__WEBPACK_IMPORTED_MODULE_2__["PageManager"].return();
            });
        }
    }
}


/***/ }),

/***/ "./src/scripts/parsing/byte_reader.ts":
/*!********************************************!*\
  !*** ./src/scripts/parsing/byte_reader.ts ***!
  \********************************************/
/*! exports provided: ByteReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ByteReader", function() { return ByteReader; });
/**
 * File contents originally from:
 * @author: Velocity
 * @github: https://github.com/flashflashrevolution/web-beatbox-editor
 */
const RECORDHEADER_LENGTH_FULL = 0x3f
// null-character
, EOS = 0x00, styleCountExt = 0xFF;
class ByteReader {
    constructor(buffer) {
        this.buffer_raw = buffer;
        this.buffer = new DataView(buffer);
        this.pointer = 0;
        this.position = 1;
        this.current = 0;
        this.length = buffer.byteLength;
    }
    /**
     * Reads unsigned 16 or 32 Little Endian Bits
     * and advance pointer to next bits / 8 bytes
     *
     * @param {Number} bits
     * @return {Number} Value read from buffer
     */
    readUIntLE(bits) {
        let value = 0;
        switch (bits) {
            case 8:
                // @ts-ignore: the second parameter might only exist in ES6, let's see if this causes an error
                value = this.buffer.getUint8(this.pointer, true);
                break;
            case 16:
                value = this.buffer.getUint16(this.pointer, true);
                break;
            case 32:
                value = this.buffer.getUint32(this.pointer, true);
                break;
            default:
                throw "Unexpected number of bits: '" + bits + "'";
        }
        this.pointer += bits / 8;
        return value;
    }
    /**
     * Reads unsigned 8 bit from the buffer
     *
     * @return {Number} Value read from buffer
     */
    readUInt8() {
        return this.buffer.getUint8(this.pointer++);
    }
    ;
    /**
     * Reads float from the buffer
     *
     * @return {Number} Value read from buffer
     */
    readFloat() {
        let value = 0;
        try {
            value = this.buffer.getFloat32(this.pointer, true);
            this.pointer += 4;
        }
        catch (e) {
            throw e;
        }
        return value;
    }
    ;
    /**
     * Reads double from the buffer
     *
     * @return {Number} Value read from buffer
     */
    readDouble() {
        let value = 0;
        try {
            value = this.buffer.getFloat64(this.pointer, true);
            this.pointer += 8;
        }
        catch (e) {
            throw e;
        }
        return value;
    }
    ;
    /**
     * Reads 32-bit unsigned integers value encoded (1-5 bytes)
     *
     * @return {Number} 32-bit unsigned integer
     */
    readEncodedU32() {
        let i = 5, result = 0, nb;
        do
            result += (nb = this.nextByte());
        while ((nb & 128) && --i);
        return result;
    }
    ;
    /**
     * Reads an encoded data from buffer and returns a
     * string using the specified character set.
     *
     * @returns {String} Decoded string
     */
    readString() {
        let str = "";
        while (true) {
            let read = this.readUInt8();
            if (read === EOS)
                break;
            str += String.fromCharCode(read);
        }
        return str;
    }
    ;
    /**
     * Reads an encoded data from buffer and returns a
     * string using the specified character set.
     *
     * @returns {String} Decoded string
     */
    readStringFixed(readLength) {
        let str = "";
        while (readLength-- > 0) {
            let read = this.readUInt8();
            if (read === EOS)
                break;
            str += String.fromCharCode(read);
        }
        return str;
    }
    ;
    /**
     * Reads RECORDHEADER from next tag in the buffer
     *
     * @return {Object} Tag code and length
     */
    readTagCodeAndLength() {
        let p = this.pointer;
        let n = this.readUIntLE(16), tagType = n >> 6, tagLength = n & RECORDHEADER_LENGTH_FULL;
        if (n === 0)
            return null;
        if (tagLength === RECORDHEADER_LENGTH_FULL)
            tagLength = this.readUIntLE(32);
        return { start: p, end: this.pointer + tagLength, code: tagType, length: tagLength, position: this.pointer };
    }
    ;
    /**
     * Reads RECORDHEADER from next tag in the buffer
     *
     * @return {Object} Tag code and length
     */
    readAction() {
        let s = this.pointer;
        let a = this.readUInt8();
        let l = (a & 0x80) ? this.readUIntLE(16) : 0;
        let p = this.pointer;
        return { start: s, action: a, length: l, position: p };
    }
    ;
    /**
     * Reads RECT format
     *
     * @return {Rect} x, y, width and height of the RECT
     */
    readRect() {
        this.start();
        let NBits = this.readBits(5), Xmin = this.readBits(NBits, true) / 20, Xmax = this.readBits(NBits, true) / 20, Ymin = this.readBits(NBits, true) / 20, Ymax = this.readBits(NBits, true) / 20;
        return {
            x: Xmin,
            y: Ymin,
            width: (Xmax > Xmin ? Xmax - Xmin : Xmin - Xmax),
            height: (Ymax > Ymin ? Ymax - Ymin : Ymin - Ymax)
        };
    }
    /**
     * Sets internal pointer to the specified position;
     *
     * @param {Number} pos
     */
    seek(pos) {
        this.pointer = pos % this.buffer.byteLength;
    }
    ;
    /**
     * Resets position and sets current to next Byte in buffer
     */
    start() {
        this.current = this.nextByte();
        this.position = 1;
    }
    ;
    /**
     * Gets next Byte in the buffer and Increment internal pointer
     *
     * @return {Number} Next byte in buffer
     */
    nextByte() {
        return this.pointer > this.buffer.byteLength ? null : this.buffer.getUint8(this.pointer++);
    }
    ;
    /**
     * Reads b bits from current byte in buffer
     *
     * @param {Number} b
     * @return {Number} Bits read from buffer
     */
    readBits(b, signed = false) {
        let n = 0, r = 0, sign = signed && ++n && ((this.current >> (8 - this.position++)) & 1) ? -1 : 1;
        while (n++ < b) {
            if (this.position > 8)
                this.start();
            r = (r << 1) + ((this.current >> (8 - this.position++)) & 1);
        }
        return sign * r;
    }
    ;
    /**
     * Replace bytes in the ArrayBuffer with the provided bytes.
     * This slices the from `0 -> pointer` and `position_end -> bufferlength`
     * and inserts the given bytes between them.
     *
     * @return {Number} Bits read from buffer
     */
    replaceBytes(new_bytes, postion_end) {
        let buffer1 = this.buffer_raw.slice(0, this.pointer);
        let buffer2 = new_bytes;
        let buffer3 = this.buffer_raw.slice(postion_end);
        let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength + buffer3.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        tmp.set(new Uint8Array(buffer3), buffer1.byteLength + buffer2.byteLength);
        this.buffer_raw = tmp.buffer;
        this.buffer = new DataView(this.buffer_raw);
        this.pointer = 0;
        this.position = 1;
        this.current = 0;
        this.length = this.buffer.byteLength;
    }
    ;
}


/***/ }),

/***/ "./src/scripts/parsing/parse_sm.ts":
/*!*****************************************!*\
  !*** ./src/scripts/parsing/parse_sm.ts ***!
  \*****************************************/
/*! exports provided: PartialParse, NoteType, stringToNoteType, NoteState, Mode, FullParse, getPartialParse, getFullParse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PartialParse", function() { return PartialParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteType", function() { return NoteType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToNoteType", function() { return stringToNoteType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteState", function() { return NoteState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mode", function() { return Mode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullParse", function() { return FullParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPartialParse", function() { return getPartialParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFullParse", function() { return getFullParse; });
class PartialParse {
}
var NoteType;
(function (NoteType) {
    NoteType["NONE"] = "0";
    NoteType["NORMAL"] = "1";
    NoteType["HOLD_HEAD"] = "2";
    NoteType["TAIL"] = "3";
    NoteType["ROLL_HEAD"] = "4";
    NoteType["MINE"] = "M";
    NoteType["UNKNOWN"] = "???";
})(NoteType || (NoteType = {}));
function stringToNoteType(string) {
    switch (string) {
        case "0":
            return NoteType.NONE;
        case "1":
            return NoteType.NORMAL;
        case "2":
            return NoteType.HOLD_HEAD;
        case "3":
            return NoteType.TAIL;
        case "4":
            return NoteType.ROLL_HEAD;
        case "M":
            return NoteType.MINE;
        default:
            return NoteType.UNKNOWN;
    }
}
var NoteState;
(function (NoteState) {
    NoteState[NoteState["DEFAULT"] = 0] = "DEFAULT";
    NoteState[NoteState["HIT"] = 1] = "HIT";
    NoteState[NoteState["MISSED"] = 2] = "MISSED";
    NoteState[NoteState["HELD"] = 3] = "HELD";
})(NoteState || (NoteState = {}));
class Mode {
}
class FullParse {
    constructor(partialParse) {
        this.metaData = partialParse.metaData;
        this.modes = partialParse.modes;
    }
}
/* Step One Of Parsing */
function getPartialParse(fileContents) {
    let partialParse = new PartialParse();
    partialParse.metaData = getTopMetaDataAsStrings(fileContents);
    partialParse.modes = getModesInfoAsStrings(fileContents);
    return partialParse;
}
function getTopMetaDataAsStrings(file) {
    // match any metadata tag excluding the "NOTES" tag (case-insensitive)
    let re = /#(?![nN][oO][tT][eE][sS])([^:]+):([^;]+);/g;
    let matches = [...file.matchAll(re)];
    let metaData = new Map();
    for (let i = 0; i < matches.length; i++) {
        let match = matches[i];
        metaData.set(cleanMetaDataString(match[1]).toUpperCase(), cleanMetaDataString(match[2]));
    }
    return metaData;
}
function getModesInfoAsStrings(fileContents) {
    // Get "NOTES" sections (case-insensitive). The first five values are postfixed with a colon.
    // Note data comes last, postfixed by a semicolon.
    let re = /#[nN][oO][tT][eE][sS]:([^:]*):([^:]*):([^:]*):([^:]*):([^:]*):([^;]+;)/g;
    let matches = [...fileContents.matchAll(re)];
    let modes = [];
    let fieldNames = ["type", "desc/author", "difficulty", "meter", "radar"];
    for (let i = 0; i < matches.length; i++) {
        let match = matches[i];
        let mode = new Map();
        for (let j = 1; j < match.length - 1; j++) {
            mode.set(fieldNames[j - 1], cleanMetaDataString(match[j]));
        }
        mode.set("notes", match[match.length - 1]);
        modes.push(mode);
    }
    return modes;
}
function cleanMetaDataString(string) {
    return string.trim().replace(/\n/g, "");
}
/* Step Two Of Parsing */
// TODO: actually return FullParse
function getFullParse(modeIndex, partialParse) {
    let fullParse = new FullParse(partialParse);
    let unparsedNotes = partialParse.modes[modeIndex].get("notes");
    let unparsedArray = unparsedNotes.split("\n");
    let measures = getMeasures(unparsedArray);
    let beatsAndLines = getBeatInfoByLine(measures);
    let cleanedBeatsAndLines = removeBlankLines(beatsAndLines);
    let offset = parseFloat(partialParse.metaData.get("OFFSET"));
    let bpms = parseBPMS(partialParse.metaData.get("BPMS"));
    let stops = parseStops(partialParse.metaData.get("STOPS"));
    let timesBeatsAndLines = getTimeInfoByLine(cleanedBeatsAndLines, offset, bpms, stops);
    fullParse.tracks = getTracksFromLines(timesBeatsAndLines);
    return fullParse;
}
function getMeasures(unparsedArray) {
    let measures = [];
    let state = 0;
    let i = 0;
    let currentMeasure = [];
    while (i < unparsedArray.length) {
        let currentLine = unparsedArray[i];
        switch (state) {
            case 0:
                if (!currentLine.includes("//") && currentLine.trim() !== "") {
                    state = 1;
                }
                else {
                    i++;
                }
                break;
            case 1:
                if (!currentLine.includes(",") && !currentLine.includes(";") && currentLine.trim() !== "") {
                    currentMeasure.push(currentLine.trim());
                    i++;
                }
                else {
                    state = 2;
                }
                break;
            case 2:
                measures.push(currentMeasure);
                currentMeasure = [];
                i++;
                state = 0;
                break;
        }
    }
    return measures;
}
// assumes 4/4 time signature
function getBeatInfoByLine(measures) {
    let beatsAndLines = [];
    let currentBeat = 0;
    for (let i = 0; i < measures.length; i++) {
        let measure = measures[i];
        for (let j = 0; j < measure.length; j++) {
            beatsAndLines.push({ beat: currentBeat, lineInfo: measure[j] });
            currentBeat += 4 / measure.length;
        }
    }
    return beatsAndLines;
}
function removeBlankLines(beatsAndLines) {
    let cleanedBeatsAndLines = [];
    for (let i = 0; i < beatsAndLines.length; i++) {
        let line = beatsAndLines[i];
        if (!isAllZeros(line.lineInfo)) {
            cleanedBeatsAndLines.push(line);
        }
    }
    return cleanedBeatsAndLines;
}
function isAllZeros(string) {
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) !== '0') {
            return false;
        }
    }
    return true;
}
function getTimeInfoByLine(infoByLine, offset, bpms, stops) {
    let infoByLineWithTime = [];
    let currentTime = -offset + getElapsedTime(0, infoByLine[0].beat, bpms, stops);
    infoByLineWithTime.push({ time: currentTime, beat: infoByLine[0].beat, lineInfo: infoByLine[0].lineInfo });
    for (let i = 1; i < infoByLine.length; i++) {
        let startBeat = infoByLine[i - 1].beat;
        let endBeat = infoByLine[i].beat;
        currentTime += getElapsedTime(startBeat, endBeat, bpms, stops);
        infoByLineWithTime.push({ time: currentTime, beat: infoByLine[i].beat, lineInfo: infoByLine[i].lineInfo });
    }
    return infoByLineWithTime;
}
function getElapsedTime(startBeat, endBeat, bpms, stops) {
    let currentBPMIndex = getStartBPMIndex(startBeat, bpms);
    let earliestBeat = startBeat;
    let elapsedTime = stops == null ? 0 : stoppedTime(startBeat, endBeat, stops);
    do {
        let nextBPMChange = getNextBPMChange(currentBPMIndex, bpms);
        let nextBeat = Math.min(endBeat, nextBPMChange);
        elapsedTime += (nextBeat - earliestBeat) / bpms[currentBPMIndex].bpm * 60;
        earliestBeat = nextBeat;
        currentBPMIndex++;
    } while (earliestBeat < endBeat);
    return elapsedTime;
}
function getStartBPMIndex(startBeat, bpms) {
    let startBPMIndex = 0;
    for (let i = 1; i < bpms.length; i++) {
        if (bpms[i].beat < startBeat) {
            startBPMIndex = i;
        }
    }
    return startBPMIndex;
}
// does NOT snap to nearest 1/192nd of beat
function stoppedTime(startBeat, endBeat, stops) {
    let time = 0;
    for (let i = 0; i < stops.length; i++) {
        let stopBeat = stops[i].beat;
        if (startBeat <= stopBeat && stopBeat < endBeat) {
            time += stops[i].stopDuration;
        }
    }
    return time;
}
function getNextBPMChange(currentBPMIndex, bpms) {
    if (currentBPMIndex + 1 < bpms.length) {
        return bpms[currentBPMIndex + 1].beat;
    }
    return Number.POSITIVE_INFINITY;
}
function getTracksFromLines(timesBeatsAndLines) {
    let numTracks = timesBeatsAndLines[0].lineInfo.length;
    let tracks = [];
    for (let i = 0; i < numTracks; i++) {
        tracks.push([]);
    }
    for (let i = 0; i < timesBeatsAndLines.length; i++) {
        let line = timesBeatsAndLines[i];
        for (let j = 0; j < line.lineInfo.length; j++) {
            let typeString = line.lineInfo.charAt(j);
            let noteType = stringToNoteType(typeString);
            if (noteType !== NoteType.NONE) {
                tracks[j].push({ type: noteType, typeString: typeString, timeInSeconds: line.time });
            }
        }
    }
    return tracks;
}
function parseBPMS(bpmString) {
    if (bpmString == null) {
        return [];
    }
    let bpmArray = parseFloatEqualsFloatPattern(bpmString);
    let bpms = [];
    for (let i = 0; i < bpmArray.length; i++) {
        bpms.push({ beat: bpmArray[i][0], bpm: bpmArray[i][1] });
    }
    return bpms;
}
function parseStops(stopsString) {
    if (stopsString == null) {
        return [];
    }
    let stopsArray = parseFloatEqualsFloatPattern(stopsString);
    let stops = [];
    for (let i = 0; i < stopsArray.length; i++) {
        stops.push({ beat: stopsArray[i][0], stopDuration: stopsArray[i][1] });
    }
    return stops;
}
function parseFloatEqualsFloatPattern(string) {
    let stringArray = string.split(",").map(e => e.trim().split("="));
    let array = [];
    for (let i = 0; i < stringArray.length; i++) {
        array.push([parseFloat(stringArray[i][0]), parseFloat(stringArray[i][1])]);
    }
    return array;
}


/***/ }),

/***/ "./src/scripts/parsing/parse_swf.ts":
/*!******************************************!*\
  !*** ./src/scripts/parsing/parse_swf.ts ***!
  \******************************************/
/*! exports provided: parseSwfFromArrayBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSwfFromArrayBuffer", function() { return parseSwfFromArrayBuffer; });
/* harmony import */ var _swf_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./swf-tags */ "./src/scripts/parsing/swf-tags.ts");
/* harmony import */ var _swf_reader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./swf-reader */ "./src/scripts/parsing/swf-reader.ts");


function parseSwfFromArrayBuffer(input) {
    return swfFile_Ready(input);
}
let swf_tags;
function swfFile_Ready(buffer) {
    swf_tags = Object(_swf_reader__WEBPACK_IMPORTED_MODULE_1__["uncompress"])(buffer);
    // Chart Data
    let chart_tag = getBeatBox();
    let chart_data = chart_tag["variables"]["_root"]["beatBox"];
    // Music Data
    let music_binary = getAudio();
    let blob = new Blob([music_binary], { type: 'audio/mpeg' });
    return { blob: blob, chartData: chart_data };
}
/**
 * Find Beatbox in the swf_tags.
 */
function getBeatBox() {
    let len = swf_tags.tags.length;
    let i = 0;
    let elm = null;
    for (i = 0; i < len; i++) {
        elm = swf_tags.tags[i];
        if (elm.header.code == _swf_tags__WEBPACK_IMPORTED_MODULE_0__["SWFTags"].DOACTION)
            return elm;
    }
    return null;
}
/**
 * Find Beatbox in the swf_tags.
 */
function getAudio() {
    let len = swf_tags.tags.length;
    let i = 0;
    let elm = null;
    let audioSize = 0;
    // Loop All Audio Tags, get Total Byte Size
    for (i = 0; i < len; i++) {
        elm = swf_tags.tags[i];
        if (elm.header.code == _swf_tags__WEBPACK_IMPORTED_MODULE_0__["SWFTags"].DEFINESOUND || elm.header.code == _swf_tags__WEBPACK_IMPORTED_MODULE_0__["SWFTags"].STREAMBLOCK)
            audioSize += elm.audio_bytes;
    }
    // Loop All Audio Tags, get Total Byte Size
    let writePosition = 0;
    let binary = new Uint8Array(audioSize);
    for (i = 0; i < len; i++) {
        elm = swf_tags.tags[i];
        if (elm.header.code == _swf_tags__WEBPACK_IMPORTED_MODULE_0__["SWFTags"].DEFINESOUND || elm.header.code == _swf_tags__WEBPACK_IMPORTED_MODULE_0__["SWFTags"].STREAMBLOCK) {
            binary.set(new Uint8Array(elm.data), writePosition);
            writePosition += elm.audio_bytes;
        }
    }
    return binary;
}


/***/ }),

/***/ "./src/scripts/parsing/swf-reader.ts":
/*!*******************************************!*\
  !*** ./src/scripts/parsing/swf-reader.ts ***!
  \*******************************************/
/*! exports provided: SWF, concatSWFHeader, uncompress, readSWFBuff, readSWFTags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWF", function() { return SWF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatSWFHeader", function() { return concatSWFHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uncompress", function() { return uncompress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSWFBuff", function() { return readSWFBuff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSWFTags", function() { return readSWFTags; });
/* harmony import */ var pako__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pako */ "pako");
/* harmony import */ var pako__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pako__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _swf_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./swf-tags */ "./src/scripts/parsing/swf-tags.ts");
/* harmony import */ var _byte_reader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./byte_reader */ "./src/scripts/parsing/byte_reader.ts");



/**
 * File contents originally from:
 * @author: Velocity
 * @github: https://github.com/flashflashrevolution/web-beatbox-editor
 */
class SWF {
}
/**
 * Concat SWF Header with uncompressed Buffer
 */
function concatSWFHeader(buff, swf) {
    let tmp = new Uint8Array(buff.byteLength + 8);
    tmp.set(new Uint8Array(swf.slice(0, 8)));
    tmp.set(new Uint8Array(buff), 8);
    return tmp.buffer;
}
/**
 * Decompress SWF if needed and Read SWF
 */
function uncompress(swf) {
    let swf_bytes = new Uint8Array(swf);
    let compressed_buff = swf.slice(8);
    // uncompress buffer
    switch (swf_bytes[0]) { // MAGIC
        case 0x43: // 'C' = zlib compressed
            let uncompressed_buff = concatSWFHeader(pako__WEBPACK_IMPORTED_MODULE_0__["inflate"](compressed_buff), swf);
            return readSWFBuff(new _byte_reader__WEBPACK_IMPORTED_MODULE_2__["ByteReader"](uncompressed_buff), swf);
            break;
        case 0x46: // 'F' = uncompressed
            return readSWFBuff(new _byte_reader__WEBPACK_IMPORTED_MODULE_2__["ByteReader"](swf), swf);
            break;
        case 0x5a: // LZMA compressed
            alert('Cannot handle LZMA SWF compressions');
            break;
        default:
            alert('Unknown SWF compressions');
            break;
    }
}
/**
 * Reads the SWF from uncompressed buffer.
 */
function readSWFBuff(buff, compressed_buff) {
    buff.seek(0); // start
    let swf = new SWF();
    swf.buffer = buff;
    swf.magic = buff.readStringFixed(3);
    swf.version = buff.readUInt8();
    swf.fileLength = {
        compressed: compressed_buff.byteLength,
        uncompressed: buff.readUIntLE(32)
    };
    swf.frameSize = buff.readRect();
    swf.frameRate = buff.readUIntLE(16) / 256;
    swf.frameCount = buff.readUIntLE(16);
    try {
        swf.tags = readSWFTags(buff);
    }
    catch (e) {
        console.log(e);
    }
    return swf;
}
/**
 * Parses the SWF TAG data structure, keeping only the tags
 * we are interested in.
 * - Audio Tags: Audio Samples
 * - Do Action Tag: Containing the beatBox variable.
 */
function readSWFTags(buff) {
    let tags = [];
    let tagHeader;
    let mp3Seek = 0;
    let mp3Samples = 0;
    let mp3Id = 0;
    let mp3Format = 0;
    let mp3Stream = false;
    /* Reads TagCodeAndLength from Tag's RECORDHEADER */
    while ((tagHeader = buff.readTagCodeAndLength()) !== null) {
        let tag = {};
        tag.header = tagHeader;
        tag.doInclude = false;
        switch (tagHeader.code) {
            // Sound Tags - MP3 Extraction
            case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTags"].STREAMBLOCK:
                if (!mp3Stream || ((tagHeader.length - 4) == 0))
                    break;
                mp3Samples += buff.readUIntLE(16); // frame samples
                buff.readUIntLE(16); // seek samples
                tag.data = buff.buffer_raw.slice(buff.pointer, buff.pointer + (tagHeader.length - 4));
                tag.audio_bytes = (tagHeader.length - 4);
                tag.doInclude = true;
                break;
            case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTags"].STREAMHEAD:
            case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTags"].STREAMHEAD2:
                buff.readUIntLE(8);
                mp3Format = buff.readUIntLE(8);
                buff.readUIntLE(16); // average frame samples
                mp3Seek = buff.readUIntLE(16);
                if (((mp3Format >>> 4) & 0xf) == _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFOtherTags"].CODEC_MP3)
                    mp3Stream = true;
                break;
            case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTags"].DEFINESOUND:
                if (!mp3Stream) {
                    let id = buff.readUIntLE(16);
                    let format = buff.readUIntLE(8);
                    if (((format >>> 4) & 0xf) == _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFOtherTags"].CODEC_MP3) {
                        mp3Id = id;
                        mp3Format = format;
                        mp3Samples = buff.readUIntLE(32);
                        mp3Seek = buff.readUIntLE(16);
                        tag.data = buff.buffer_raw.slice(buff.pointer, buff.pointer + (tagHeader.length - 9));
                        tag.audio_bytes = (tagHeader.length - 9);
                        tag.doInclude = true;
                    }
                }
                break;
            // DoAction - Where the Beatbox Lives
            case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTags"].DOACTION:
                let _finishedReading = false;
                let actionStack = [];
                let actionVariables = {};
                let actionRegisters = [null, null, null, null];
                let constantPool = [];
                while (!_finishedReading) {
                    let action = buff.readAction();
                    // Read Action Tag
                    switch (action.action) {
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].END:
                            _finishedReading = true;
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].CONSTANTPOOL:
                            constantPool = [];
                            let constantCount = buff.readUIntLE(16);
                            for (let i = 0; i < constantCount; i++) {
                                constantPool.push(buff.readString());
                            }
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].PUSH:
                            while (buff.pointer < action.position + action.length) {
                                let pushValue = undefined;
                                let pushType = buff.readUIntLE(8);
                                switch (pushType) {
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].STRING_LITERAL:
                                        pushValue = buff.readString();
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].FLOAT_LITERAL:
                                        pushValue = buff.readFloat();
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].NULL:
                                        pushValue = null;
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].UNDEFINED:
                                        pushValue = undefined;
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].REGISTER:
                                        pushValue = actionRegisters[buff.readUIntLE(8)];
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].BOOLEAN:
                                        pushValue = Boolean(buff.readUIntLE(8));
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].DOUBLE:
                                        pushValue = buff.readDouble();
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].INTEGER:
                                        pushValue = buff.readUIntLE(32);
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].CONSTANT8:
                                        pushValue = constantPool[buff.readUIntLE(8)];
                                        break;
                                    case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFTypeTags"].CONSTANT16:
                                        pushValue = constantPool[buff.readUIntLE(16)];
                                        break;
                                    default:
                                        console.log("FOUND UNSUPPORTED PUSHDATA TYPE: " + pushType);
                                        break;
                                }
                                actionStack.push(pushValue);
                            }
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].POP:
                            actionStack.pop();
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].DUPLICATE:
                            actionStack.push(actionStack[actionStack.length - 1]);
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].STORE_REGISTER:
                            actionRegisters[buff.readUIntLE(8)] = actionStack[actionStack.length - 1];
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].GET_VARIABLE:
                            let gvName = actionStack.pop();
                            if (!(gvName in actionVariables))
                                actionVariables[gvName] = {};
                            actionStack.push(actionVariables[gvName]);
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].SET_VARIABLE:
                            let svValue = actionStack.pop();
                            actionVariables[actionStack.pop()] = svValue;
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].INIT_ARRAY:
                            let arraySize = actionStack.pop();
                            let array = [];
                            for (let i = 0; i < arraySize; i++)
                                array.push(actionStack.pop());
                            actionStack.push(array);
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].GET_MEMBER:
                            let gmName = actionStack.pop();
                            let gmObject = actionStack.pop();
                            if (!(gmName in gmObject))
                                gmObject[gmName] = {};
                            actionStack.push(gmObject[gmName]);
                            break;
                        case _swf_tags__WEBPACK_IMPORTED_MODULE_1__["SWFActionTags"].SET_MEMBER:
                            let smValue = actionStack.pop();
                            let smName = actionStack.pop();
                            actionStack.pop()[smName] = smValue;
                            break;
                        case 7:
                            // this tag isn't supported, but it seems to be in every file, so I'm ignoring it
                            break;
                        default:
                            console.log("FOUND UNSUPPORTED ACTION TAG: " + action.action.toString(16));
                            break;
                    }
                }
                if (actionVariables["_root"] != undefined && actionVariables["_root"]["beatBox"])
                    tag.doInclude = true;
                tag.pool = constantPool;
                tag.variables = actionVariables;
                break;
            default:
                //tag.data = buff.buffer_raw.slice(buff.pointer, buff.pointer + tagHeader.length);
                break;
        }
        if (tag.doInclude) {
            delete tag.doInclude;
            tags.push(tag);
        }
        buff.seek(tagHeader.position + tagHeader.length);
    }
    return tags;
}


/***/ }),

/***/ "./src/scripts/parsing/swf-tags.ts":
/*!*****************************************!*\
  !*** ./src/scripts/parsing/swf-tags.ts ***!
  \*****************************************/
/*! exports provided: SWFTags, SWFActionTags, SWFTypeTags, SWFOtherTags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWFTags", function() { return SWFTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWFActionTags", function() { return SWFActionTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWFTypeTags", function() { return SWFTypeTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWFOtherTags", function() { return SWFOtherTags; });
/**
 * Collection of SWF tags and tag types to assist with reading and parsing a .swf file.
 *
 * File contents originally from:
 * @author: Velocity
 * @github: https://github.com/flashflashrevolution/web-beatbox-editor
 */
class SWFTags {
}
SWFTags.END = 0;
SWFTags.SHOWFRAME = 1;
SWFTags.DOACTION = 12;
SWFTags.DEFINESOUND = 14;
SWFTags.STREAMHEAD = 18;
SWFTags.STREAMBLOCK = 19;
SWFTags.STREAMHEAD2 = 45;
SWFTags.FILEATTRIBUTES = 69;
class SWFActionTags {
}
SWFActionTags.END = 0;
SWFActionTags.CONSTANTPOOL = 0x88;
SWFActionTags.PUSH = 0x96;
SWFActionTags.POP = 0x17;
SWFActionTags.DUPLICATE = 0x4C;
SWFActionTags.STORE_REGISTER = 0x87;
SWFActionTags.GET_VARIABLE = 0x1C;
SWFActionTags.SET_VARIABLE = 0x1D;
SWFActionTags.INIT_ARRAY = 0x42;
SWFActionTags.GET_MEMBER = 0x4E;
SWFActionTags.SET_MEMBER = 0x4F;
class SWFTypeTags {
}
SWFTypeTags.STRING_LITERAL = 0;
SWFTypeTags.FLOAT_LITERAL = 1;
SWFTypeTags.NULL = 2;
SWFTypeTags.UNDEFINED = 3;
SWFTypeTags.REGISTER = 4;
SWFTypeTags.BOOLEAN = 5;
SWFTypeTags.DOUBLE = 6;
SWFTypeTags.INTEGER = 7;
SWFTypeTags.CONSTANT8 = 8;
SWFTypeTags.CONSTANT16 = 9;
class SWFOtherTags {
}
SWFOtherTags.CODEC_MP3 = 2;


/***/ }),

/***/ "./src/scripts/particle.ts":
/*!*********************************!*\
  !*** ./src/scripts/particle.ts ***!
  \*********************************/
/*! exports provided: Particle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return Particle; });
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ "p5");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");


class Particle {
    constructor(initialPosition, initialVelocity, constantAcceleration, creationTimeInSeconds, color) {
        this.initialPosition = initialPosition;
        this.initialVelocity = initialVelocity;
        this.constantAcceleration = constantAcceleration;
        this.creationTimeInSeconds = creationTimeInSeconds;
        this.color = color;
    }
    draw(currentTimeInSeconds, color) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let elapsedTime = this.getElapsedTimeInSeconds(currentTimeInSeconds);
        let currentPosition = this.getPosition(p, elapsedTime);
        p.push();
        p.noStroke();
        p.fill(color);
        p.circle(currentPosition.x, currentPosition.y, Particle.particleSize);
        p.pop();
    }
    getPosition(p, elapsedTimeInSeconds) {
        let velocityComponent = p5__WEBPACK_IMPORTED_MODULE_0__["Vector"].mult(this.initialVelocity, elapsedTimeInSeconds);
        let accelerationComponent = p5__WEBPACK_IMPORTED_MODULE_0__["Vector"].mult(this.constantAcceleration, elapsedTimeInSeconds * elapsedTimeInSeconds / 2);
        return p5__WEBPACK_IMPORTED_MODULE_0__["Vector"].add(p5__WEBPACK_IMPORTED_MODULE_0__["Vector"].add(this.initialPosition, velocityComponent), accelerationComponent);
    }
    getElapsedTimeInSeconds(currentTimeInSeconds) {
        return currentTimeInSeconds - this.creationTimeInSeconds;
    }
}
Particle.particleSize = 2;


/***/ }),

/***/ "./src/scripts/particle_system.ts":
/*!****************************************!*\
  !*** ./src/scripts/particle_system.ts ***!
  \****************************************/
/*! exports provided: ParticleSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticleSystem", function() { return ParticleSystem; });
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./src/scripts/particle.ts");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! p5 */ "p5");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");



class ParticleSystem {
    constructor(particleLifetimeInSeconds, constantAcceleration) {
        this.particleLifetimeInSeconds = particleLifetimeInSeconds;
        this.constantAcceleration = constantAcceleration;
        this.particles = [];
    }
    draw(currentTimeInSeconds) {
        while (this.oldestParticleAge(currentTimeInSeconds) > this.particleLifetimeInSeconds) {
            this.removeOldestParticle();
        }
        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            let alphaAdjustedColor = this.getAlphaAdjustedColor(particle, currentTimeInSeconds);
            particle.draw(currentTimeInSeconds, alphaAdjustedColor);
        }
    }
    oldestParticleAge(currentTimeInSeconds) {
        if (this.particles.length > 0) {
            return this.particles[0].getElapsedTimeInSeconds(currentTimeInSeconds);
        }
        else {
            return -1;
        }
    }
    removeOldestParticle() {
        this.particles.shift();
    }
    getAlphaAdjustedColor(particle, currentTimeInSeconds) {
        let p = _index__WEBPACK_IMPORTED_MODULE_2__["global"].p5Scene.sketchInstance;
        let baseColor = particle.color;
        let particleAge = particle.getElapsedTimeInSeconds(currentTimeInSeconds);
        let lifeRemainingPercent = (this.particleLifetimeInSeconds - particleAge) / this.particleLifetimeInSeconds;
        let alpha = this.interpolate(0, 255, lifeRemainingPercent);
        let newColor = p.color(baseColor);
        newColor.setAlpha(alpha);
        return newColor;
    }
    interpolate(minValue, maxValue, ratio) {
        if (ratio <= 0) {
            return minValue;
        }
        else if (ratio > 0 && ratio < 1) {
            return minValue + (maxValue - minValue) * ratio;
        }
        else {
            return maxValue;
        }
    }
    addRandomizedParticles(initialPosition, initialVelocity, creationTimeInSeconds, numParticles, color) {
        let p = _index__WEBPACK_IMPORTED_MODULE_2__["global"].p5Scene.sketchInstance;
        for (let i = 0; i < numParticles; i++) {
            let newInitalVelocity = this.randomizeVector(p, initialVelocity);
            let newColor = this.randomizeColor(p, color);
            this.addParticle(initialPosition, newInitalVelocity, creationTimeInSeconds, newColor);
        }
    }
    randomizeVector(p, baseVector) {
        let directionRandomized = this.randomizeVectorDirection(p, baseVector);
        return this.randomizeVectorMagnitude(p, directionRandomized);
    }
    randomizeVectorDirection(p, baseVector) {
        p.push();
        p.angleMode(p.DEGREES);
        let angleInDegrees = baseVector.heading();
        let angleChangeInDegrees = p.random(-ParticleSystem.velocityAngleVariationInDegrees / 2, ParticleSystem.velocityAngleVariationInDegrees / 2);
        let finalAngleInRadians = p.radians(angleInDegrees + angleChangeInDegrees);
        let magnitude = baseVector.mag();
        p.pop();
        return p5__WEBPACK_IMPORTED_MODULE_1__["Vector"].fromAngle(finalAngleInRadians, magnitude);
    }
    randomizeVectorMagnitude(p, baseVector) {
        let magnitudeChangeInPercent = p.random(-ParticleSystem.velocityMagnitudeVariationInPercent / 2, ParticleSystem.velocityMagnitudeVariationInPercent / 2);
        let finalMagnitude = baseVector.mag() * (100 + magnitudeChangeInPercent) / 100;
        return baseVector.setMag(finalMagnitude);
    }
    randomizeColor(p, baseColor) {
        let newRed = this.boundedRandomize(p, p.red(baseColor), ParticleSystem.colorVariation, 0, 255);
        let newGreen = this.boundedRandomize(p, p.green(baseColor), ParticleSystem.colorVariation, 0, 255);
        let newBlue = this.boundedRandomize(p, p.blue(baseColor), ParticleSystem.colorVariation, 0, 255);
        return p.color(newRed, newGreen, newBlue);
    }
    boundedRandomize(p, value, variation, lowerBound, upperBound) {
        let newValue = value + p.random(-variation / 2, variation / 2);
        if (newValue <= lowerBound) {
            return lowerBound;
        }
        else if (lowerBound < newValue && newValue < upperBound) {
            return newValue;
        }
        else {
            return upperBound;
        }
    }
    addParticle(initialPosition, initialVelocity, creationTimeInSeconds, color) {
        this.particles.push(new _particle__WEBPACK_IMPORTED_MODULE_0__["Particle"](initialPosition, initialVelocity, this.constantAcceleration, creationTimeInSeconds, color));
    }
}
ParticleSystem.velocityAngleVariationInDegrees = 30;
ParticleSystem.velocityMagnitudeVariationInPercent = 30;
ParticleSystem.colorVariation = 30;


/***/ }),

/***/ "./src/scripts/player_key_action.ts":
/*!******************************************!*\
  !*** ./src/scripts/player_key_action.ts ***!
  \******************************************/
/*! exports provided: PlayerKeyAction, KeyState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerKeyAction", function() { return PlayerKeyAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyState", function() { return KeyState; });
class PlayerKeyAction {
    constructor(gameTime, track, keyState) {
        this.gameTime = gameTime;
        this.track = track;
        this.keyState = keyState;
    }
}
var KeyState;
(function (KeyState) {
    KeyState[KeyState["UP"] = 0] = "UP";
    KeyState[KeyState["DOWN"] = 1] = "DOWN";
})(KeyState || (KeyState = {}));


/***/ }),

/***/ "./src/scripts/playing_display.ts":
/*!****************************************!*\
  !*** ./src/scripts/playing_display.ts ***!
  \****************************************/
/*! exports provided: PlayingDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayingDisplay", function() { return PlayingDisplay; });
/* harmony import */ var _display_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display_manager */ "./src/scripts/display_manager.ts");
/* harmony import */ var _note_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./note_manager */ "./src/scripts/note_manager.ts");
/* harmony import */ var _time_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time_manager */ "./src/scripts/time_manager.ts");
/* harmony import */ var _miss_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./miss_manager */ "./src/scripts/miss_manager.ts");
/* harmony import */ var _accuracy_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accuracy_manager */ "./src/scripts/accuracy_manager.ts");
/* harmony import */ var _scroll_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scroll_manager */ "./src/scripts/scroll_manager.ts");
/* harmony import */ var _results_display__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./results_display */ "./src/scripts/results_display.ts");
/* harmony import */ var _hold_manager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hold_manager */ "./src/scripts/hold_manager.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _player_key_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./player_key_action */ "./src/scripts/player_key_action.ts");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./page_manager */ "./src/scripts/page_manager.ts");
/* harmony import */ var _accuracy_recording__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./accuracy_recording */ "./src/scripts/accuracy_recording.ts");
/* harmony import */ var _accuracy_feedback_text__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./accuracy_feedback_text */ "./src/scripts/accuracy_feedback_text.ts");
/* harmony import */ var _receptor_shrink_reaction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./receptor_shrink_reaction */ "./src/scripts/receptor_shrink_reaction.ts");
/* harmony import */ var _accuracy_feedback_flash__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./accuracy_feedback_flash */ "./src/scripts/accuracy_feedback_flash.ts");
/* harmony import */ var _accuracy_feedback_particles__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./accuracy_feedback_particles */ "./src/scripts/accuracy_feedback_particles.ts");
/* harmony import */ var _hold_particles__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./hold_particles */ "./src/scripts/hold_particles.ts");
/* harmony import */ var _hold_glow__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./hold_glow */ "./src/scripts/hold_glow.ts");



















class PlayingDisplay {
    constructor(tracks, audioFile, config, scene) {
        this.isDebugMode = false;
        this.showResultsScreen = false;
        this.audioFile = audioFile;
        this.config = config;
        this.scene = scene;
        // initialize the time manager and play the audio as close together as possible to synchronize the audio with the game
        if (!this.isDebugMode) {
            this.timeManager = new _time_manager__WEBPACK_IMPORTED_MODULE_2__["TimeManager"](performance.now(), this.config);
            this.audioFile.play(config.pauseAtStartInSeconds);
            // This is just for debugging
            this.timeDiffInterval = setInterval(() => {
                let audioTime = this.audioFile.getCurrentTimeInSeconds();
                console.log("Audio time: " + audioTime);
                let gameTime = this.timeManager.getGameTime(performance.now());
                console.log("Game time: " + gameTime);
                let timeDiff = audioTime - gameTime;
                console.log("Time diff: " + timeDiff);
            }, 5000);
        }
        this.noteManager = new _note_manager__WEBPACK_IMPORTED_MODULE_1__["NoteManager"](tracks);
        let numTracks = this.noteManager.tracks.length;
        this.accuracyRecording = new _accuracy_recording__WEBPACK_IMPORTED_MODULE_12__["AccuracyRecording"](numTracks);
        let width = 240;
        let height = 480;
        let topLeftX = (this.scene.sketchInstance.width - width) / 2;
        let topLeftY = (this.scene.sketchInstance.height - height) / 2;
        this.displayConfig = new PlayingConfig(this.config, numTracks);
        this.displayManager = new _display_manager__WEBPACK_IMPORTED_MODULE_0__["DisplayManager"](this.noteManager, this.displayConfig, this.scene.sketchInstance, topLeftX, topLeftY, width, height);
        this.holdParticles = new _hold_particles__WEBPACK_IMPORTED_MODULE_17__["HoldParticles"](this.config, numTracks, this.displayManager);
        this.holdGlow = new _hold_glow__WEBPACK_IMPORTED_MODULE_18__["HoldGlow"](this.config, numTracks, this.displayManager);
        this.holdManager = new _hold_manager__WEBPACK_IMPORTED_MODULE_7__["HoldManager"](numTracks, this.onTrackHold.bind(this), this.onTrackUnhold.bind(this));
        if (this.isDebugMode) {
            this.timeManager = new _scroll_manager__WEBPACK_IMPORTED_MODULE_5__["ScrollManager"](this.config, this.scene.sketchInstance);
        }
        this.gameEndTime = this.calculateGameEnd(this.audioFile.getDuration(), this.getNotesEndTime());
        this.accuracyManager = new _accuracy_manager__WEBPACK_IMPORTED_MODULE_4__["AccuracyManager"](this.noteManager, this.config, this.holdManager, this.handleAccuracyEvent.bind(this));
        this.missManager = new _miss_manager__WEBPACK_IMPORTED_MODULE_3__["MissManager"](this.config, this.noteManager, this.accuracyRecording, this.holdManager, this.handleAccuracyEvent.bind(this));
        this.accuracyFeedbackText = new _accuracy_feedback_text__WEBPACK_IMPORTED_MODULE_13__["AccuracyFeedbackText"](this.accuracyRecording, topLeftX + width / 2, topLeftY + height / 2, this.config);
        this.accuracyFeedbackFlash = new _accuracy_feedback_flash__WEBPACK_IMPORTED_MODULE_15__["AccuracyFeedbackFlash"](this.accuracyRecording, this.config, this.displayManager, numTracks);
        this.receptorShrinkReaction = new _receptor_shrink_reaction__WEBPACK_IMPORTED_MODULE_14__["ReceptorShrinkReaction"](this.config, this.displayConfig, numTracks);
        this.accuracyFeedbackParticles = new _accuracy_feedback_particles__WEBPACK_IMPORTED_MODULE_16__["AccuracyFeedbackParticles"](this.config, this.displayManager, numTracks);
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_8__["isKeyBindingsDefined"])(numTracks)) {
            Object(_util__WEBPACK_IMPORTED_MODULE_8__["initializeKeyBindings"])(numTracks);
        }
        this.bindKeyBindingsToActions();
        Object(_util__WEBPACK_IMPORTED_MODULE_8__["setAllNotesToDefaultState"])(this.noteManager.tracks);
        Object(_util__WEBPACK_IMPORTED_MODULE_8__["replaceNotYetImplementedNoteTypes"])(this.noteManager.tracks);
    }
    handleAccuracyEvent(accuracyEvent) {
        // console.log("Track #" + (accuracyEvent.trackNumber + 1) + " " + accuracyEvent.accuracyName +
        //     (Math.abs(accuracyEvent.accuracyMillis) == Infinity ?
        //         "" :
        //         " (" + Math.round(accuracyEvent.accuracyMillis) + " ms)"));
        this.accuracyRecording.recordAccuracyEvent(accuracyEvent);
        this.accuracyFeedbackParticles.addParticlesForAccuracyEvent(accuracyEvent);
    }
    draw() {
        let currentTimeInSeconds = this.timeManager.getGameTime(performance.now());
        if (currentTimeInSeconds >= this.gameEndTime && !this.showResultsScreen) {
            this.accuracyRecording.state = _accuracy_recording__WEBPACK_IMPORTED_MODULE_12__["AccuracyRecordingState"].READY;
            this.endSong();
        }
        this.missManager.update(currentTimeInSeconds);
        this.displayManager.draw(currentTimeInSeconds);
        this.receptorShrinkReaction.draw();
        if (this.config.isAccuracyTextEnabled) {
            this.accuracyFeedbackText.draw(currentTimeInSeconds);
        }
        if (this.config.isHoldGlowEnabled) {
            this.holdGlow.draw(currentTimeInSeconds);
        }
        if (this.config.isAccuracyFlashEnabled) {
            this.accuracyFeedbackFlash.draw(currentTimeInSeconds);
        }
        if (this.config.isAccuracyParticlesEnabled) {
            this.accuracyFeedbackParticles.draw(currentTimeInSeconds);
        }
        if (this.config.isHoldParticlesEnabled) {
            this.holdParticles.draw(currentTimeInSeconds);
        }
    }
    getNotesEndTime() {
        let earliestAccuracy;
        if (this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound != null) {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 1].upperBound;
        }
        else {
            earliestAccuracy = this.config.accuracySettings[this.config.accuracySettings.length - 2].upperBound;
        }
        return this.noteManager.getLatestNote().timeInSeconds + earliestAccuracy / 1000;
    }
    calculateGameEnd(audioDuration, notesEndTime) {
        if (audioDuration < notesEndTime) {
            return notesEndTime + 1;
        }
        return Math.min(notesEndTime + 5, audioDuration);
    }
    endSong() {
        this.audioFile.stop();
        _index__WEBPACK_IMPORTED_MODULE_9__["global"].resultsDisplay = new _results_display__WEBPACK_IMPORTED_MODULE_6__["ResultsDisplay"](this.config, this.noteManager, this.accuracyManager, this.scene.sketchInstance, this.accuracyRecording);
        _page_manager__WEBPACK_IMPORTED_MODULE_11__["PageManager"].setCurrentPage(_page_manager__WEBPACK_IMPORTED_MODULE_11__["PAGES"].RESULTS);
        this.unbindKeys();
        clearInterval(this.timeDiffInterval);
    }
    bindKeyBindingsToActions() {
        let keyBindings = _index__WEBPACK_IMPORTED_MODULE_9__["global"].config.keyBindings.get(this.noteManager.tracks.length);
        let isSpacebarBound = false;
        let spacebarKeyCode = 32;
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding = keyBindings[i];
            if (keyBinding.keyCode === spacebarKeyCode) {
                isSpacebarBound = true;
            }
            _index__WEBPACK_IMPORTED_MODULE_9__["global"].keyboardEventManager.bindKeyToAction(keyBinding.keyCode, () => {
                this.keyDownActionForTrack(keyBinding.trackNumber);
            }, () => {
                this.keyUpActionForTrack(keyBinding.trackNumber);
            });
        }
        _index__WEBPACK_IMPORTED_MODULE_9__["global"].keyboardEventManager.bindKeyToAction(_index__WEBPACK_IMPORTED_MODULE_9__["global"].config.quitKey, () => {
            this.endSong();
        });
        if (!isSpacebarBound) {
            // bind key to nothing to make sure the default behavior is prevented
            _index__WEBPACK_IMPORTED_MODULE_9__["global"].keyboardEventManager.bindKeyToAction(spacebarKeyCode, () => { });
        }
    }
    keyDownActionForTrack(trackNumber) {
        this.receptorShrinkReaction.holdTrack(trackNumber);
        let playerKeyAction = new _player_key_action__WEBPACK_IMPORTED_MODULE_10__["PlayerKeyAction"](this.timeManager.getGameTime(performance.now()), trackNumber, _player_key_action__WEBPACK_IMPORTED_MODULE_10__["KeyState"].DOWN);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }
    keyUpActionForTrack(trackNumber) {
        this.receptorShrinkReaction.releaseTrack(trackNumber);
        let playerKeyAction = new _player_key_action__WEBPACK_IMPORTED_MODULE_10__["PlayerKeyAction"](this.timeManager.getGameTime(performance.now()), trackNumber, _player_key_action__WEBPACK_IMPORTED_MODULE_10__["KeyState"].UP);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }
    onTrackHold(trackNumber, currentTimeInSeconds) {
        if (this.config.isHoldGlowEnabled) {
            this.holdGlow.holdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
        }
        if (this.config.isHoldParticlesEnabled) {
            this.holdParticles.holdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
        }
    }
    onTrackUnhold(trackNumber, currentTimeInSeconds) {
        if (this.config.isHoldGlowEnabled) {
            this.holdGlow.unholdTrack.call(this.holdGlow, trackNumber, currentTimeInSeconds);
        }
        if (this.config.isHoldParticlesEnabled) {
            this.holdParticles.unholdTrack.call(this.holdParticles, trackNumber, currentTimeInSeconds);
        }
    }
    unbindKeys() {
        _index__WEBPACK_IMPORTED_MODULE_9__["global"].keyboardEventManager.unbindKey(_index__WEBPACK_IMPORTED_MODULE_9__["global"].config.quitKey);
        let keyBindings = _index__WEBPACK_IMPORTED_MODULE_9__["global"].config.keyBindings.get(this.noteManager.tracks.length);
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding = keyBindings[i];
            _index__WEBPACK_IMPORTED_MODULE_9__["global"].keyboardEventManager.unbindKey(keyBinding.keyCode);
        }
    }
}
class PlayingConfig {
    constructor(config, numTracks) {
        this.noteSize = config.noteSize;
        this.pixelsPerSecond = config.pixelsPerSecond;
        this.receptorYPercent = config.receptorYPercent;
        this.scrollDirection = config.scrollDirection;
        this.receptorSizes = [];
        for (let i = 0; i < numTracks; i++) {
            this.receptorSizes.push(config.noteSize);
        }
    }
    getNoteSize() {
        return this.noteSize;
    }
    getPixelsPerSecond() {
        return this.pixelsPerSecond;
    }
    getReceptorSizes() {
        return this.receptorSizes;
    }
    getReceptorYPercent() {
        return this.receptorYPercent;
    }
    getScrollDirection() {
        return this.scrollDirection;
    }
    setReceptorSize(trackNumber, receptorSize) {
        this.receptorSizes[trackNumber] = receptorSize;
    }
}


/***/ }),

/***/ "./src/scripts/playlist_client/parsing_helper.ts":
/*!*******************************************************!*\
  !*** ./src/scripts/playlist_client/parsing_helper.ts ***!
  \*******************************************************/
/*! exports provided: ParsingHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParsingHelper", function() { return ParsingHelper; });
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");

class ParsingHelper {
    static beatmapToTrackArray(beatmap) {
        let tracks = [[], [], [], []];
        for (let i = 0; i < beatmap.length; i++) {
            let beatmapRow = beatmap[i];
            let trackNumber = this.trackNumberFromDirection(beatmapRow[1]);
            let note = this.noteFromBeatmapRow(beatmapRow);
            tracks[trackNumber].push(note);
        }
        return tracks;
    }
    static noteFromBeatmapRow(row) {
        let timeInSeconds = row[0] / 30;
        return { timeInSeconds: timeInSeconds, type: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL, state: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT, typeString: "N/A" };
    }
    static trackNumberFromDirection(direction) {
        switch (direction) {
            case "L":
                return 0;
                break;
            case "D":
                return 1;
                break;
            case "U":
                return 2;
                break;
            case "R":
                return 3;
                break;
            default:
                throw "Unknown track direction '" + direction + "'";
        }
    }
}


/***/ }),

/***/ "./src/scripts/playlist_client/playlist_client.ts":
/*!********************************************************!*\
  !*** ./src/scripts/playlist_client/playlist_client.ts ***!
  \********************************************************/
/*! exports provided: PlaylistClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistClient", function() { return PlaylistClient; });
/* harmony import */ var _song__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./song */ "./src/scripts/playlist_client/song.ts");
/* harmony import */ var _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist_client_state */ "./src/scripts/playlist_client/playlist_client_state.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/scripts/playlist_client/util.ts");
/* harmony import */ var _parsing_parse_swf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../parsing/parse_swf */ "./src/scripts/parsing/parse_swf.ts");




class PlaylistClient {
    constructor() {
        this.corsWorkaround = 'https://cors-anywhere.herokuapp.com/';
        this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].NO_APIS;
    }
    getState() {
        return this.state;
    }
    getPlaylist() {
        return this.playlist;
    }
    async initialize(indexUrl) {
        try {
            await this.loadApis(indexUrl);
            await this.loadPlaylist();
        }
        catch (e) { }
    }
    async loadApis(indexUrl) {
        try {
            this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].PROCESSING;
            await this.get(indexUrl)
                .then(request => this.saveApisFromPlaylistIndex(request));
        }
        catch (e) {
            this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].ERROR;
            this.handleError(e);
            throw e;
        }
    }
    saveApisFromPlaylistIndex(request) {
        let responseXml = request.responseXML;
        this.songUrl = Object(_util__WEBPACK_IMPORTED_MODULE_2__["getContentsByTagName"])(responseXml, "songURL");
        this.playlistUrl = Object(_util__WEBPACK_IMPORTED_MODULE_2__["getContentsByTagName"])(responseXml, "playlistURL");
        this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].APIS_LOADED;
    }
    async loadPlaylist() {
        try {
            this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].PROCESSING;
            await this.get(this.playlistUrl)
                .then(request => this.savePlaylist(request));
        }
        catch (e) {
            this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].ERROR;
            this.handleError(e);
            throw e;
        }
    }
    savePlaylist(request) {
        let playlistText = request.response;
        // replace ampersands because the DOMParser doesn't like them
        playlistText = playlistText.replace(/&/g, '&amp;');
        let playlistXml = new DOMParser().parseFromString(playlistText, "text/xml");
        let songs = this.getSongsFromPlaylistXml(playlistXml);
        this.saveSongsIfValid(songs);
    }
    getSongsFromPlaylistXml(playlistXml) {
        let songsXml = playlistXml.getElementsByTagName("song");
        let songs = [];
        for (let i = 0; i < songsXml.length; i++) {
            let songXml = songsXml.item(i);
            let song = _song__WEBPACK_IMPORTED_MODULE_0__["Song"].ofXml(songXml);
            songs.push(song);
        }
        return songs;
    }
    saveSongsIfValid(songs) {
        if (songs.length === 0) {
            throw "Loaded a playlist with no songs.";
        }
        else {
            this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].PLAYLIST_LOADED;
            this.playlist = songs;
        }
    }
    async getSwf(songIndex) {
        try {
            this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].PROCESSING;
            return await this.get(this.getLevelUrl(songIndex), "arraybuffer")
                .then(request => this.getParsedSwf(request));
        }
        catch (e) {
            this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].ERROR;
            this.handleError(e);
        }
        return null;
    }
    getLevelUrl(songIndex) {
        let song = this.playlist[songIndex];
        let level = song.level;
        return this.songUrl + "level_" + level + ".swf";
    }
    getParsedSwf(request) {
        let parsedSwf = Object(_parsing_parse_swf__WEBPACK_IMPORTED_MODULE_3__["parseSwfFromArrayBuffer"])(request.response);
        this.state = _playlist_client_state__WEBPACK_IMPORTED_MODULE_1__["PlaylistClientState"].PLAYLIST_LOADED;
        return parsedSwf;
    }
    async get(url, responseType) {
        let getUrl = this.corsWorkaround + url;
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET', getUrl, true);
            if (responseType !== undefined) {
                request.responseType = responseType;
            }
            // When the request loads, check whether it was successful
            request.onload = function () {
                if (request.status === 200) {
                    // If successful, resolve the promise by passing back the request
                    resolve(request);
                }
                else {
                    // If it fails, reject the promise with a error message
                    reject(Error("Get request failed with error code:" + request.statusText));
                }
            };
            request.onerror = function () {
                // Also deal with the case when the entire request fails to begin with
                // This is probably a network error, so reject the promise with an appropriate message
                reject(Error('There was a network error.'));
            };
            request.send();
        });
    }
    handleError(e) {
        console.error(e);
    }
}


/***/ }),

/***/ "./src/scripts/playlist_client/playlist_client_state.ts":
/*!**************************************************************!*\
  !*** ./src/scripts/playlist_client/playlist_client_state.ts ***!
  \**************************************************************/
/*! exports provided: PlaylistClientState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistClientState", function() { return PlaylistClientState; });
var PlaylistClientState;
(function (PlaylistClientState) {
    PlaylistClientState[PlaylistClientState["NO_APIS"] = 0] = "NO_APIS";
    PlaylistClientState[PlaylistClientState["APIS_LOADED"] = 1] = "APIS_LOADED";
    PlaylistClientState[PlaylistClientState["PLAYLIST_LOADED"] = 2] = "PLAYLIST_LOADED";
    PlaylistClientState[PlaylistClientState["PROCESSING"] = 3] = "PROCESSING";
    PlaylistClientState[PlaylistClientState["ERROR"] = 4] = "ERROR";
})(PlaylistClientState || (PlaylistClientState = {}));


/***/ }),

/***/ "./src/scripts/playlist_client/song.ts":
/*!*********************************************!*\
  !*** ./src/scripts/playlist_client/song.ts ***!
  \*********************************************/
/*! exports provided: Song */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Song", function() { return Song; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/playlist_client/util.ts");

class Song {
    constructor() { }
    static ofXml(xml) {
        let song = new Song();
        song.genre = parseInt(xml.getAttribute("genre"));
        song.songName = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getContentsByTagName"])(xml, "songname");
        song.songAuthor = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getContentsByTagName"])(xml, "songauthor");
        song.songAuthorUrl = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getContentsByTagName"])(xml, "songauthorurl");
        song.songDifficulty = parseInt(Object(_util__WEBPACK_IMPORTED_MODULE_0__["getContentsByTagName"])(xml, "songdifficulty"));
        song.songStyle = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getContentsByTagName"])(xml, "songstyle");
        song.songLength = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getContentsByTagName"])(xml, "songlength");
        song.songStepauthor = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getContentsByTagName"])(xml, "songstepauthor");
        song.level = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getContentsByTagName"])(xml, "level");
        return song;
    }
}


/***/ }),

/***/ "./src/scripts/playlist_client/util.ts":
/*!*********************************************!*\
  !*** ./src/scripts/playlist_client/util.ts ***!
  \*********************************************/
/*! exports provided: getContentsByTagName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContentsByTagName", function() { return getContentsByTagName; });
function getContentsByTagName(xml, tag) {
    return xml.getElementsByTagName(tag)[0].innerHTML;
}


/***/ }),

/***/ "./src/scripts/preview_display.ts":
/*!****************************************!*\
  !*** ./src/scripts/preview_display.ts ***!
  \****************************************/
/*! exports provided: PreviewDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewDisplay", function() { return PreviewDisplay; });
/* harmony import */ var _display_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display_manager */ "./src/scripts/display_manager.ts");
/* harmony import */ var _note_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./note_manager */ "./src/scripts/note_manager.ts");
/* harmony import */ var _scroll_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scroll_manager */ "./src/scripts/scroll_manager.ts");



class PreviewDisplay {
    constructor(tracks, config, scene) {
        this.topLeftX = 65;
        this.topLeftY = 46;
        this.width = 200;
        this.height = 400;
        this.config = config;
        this.scene = scene;
        this.noteManager = new _note_manager__WEBPACK_IMPORTED_MODULE_1__["NoteManager"](tracks);
        this.scrollManager = new _scroll_manager__WEBPACK_IMPORTED_MODULE_2__["ScrollManager"](this.config, this.scene.sketchInstance, this.getBounds());
        this.displayConfig = this.getDisplayConfig(this.config, this.noteManager.tracks.length);
        this.displayManager = new _display_manager__WEBPACK_IMPORTED_MODULE_0__["DisplayManager"](this.noteManager, this.displayConfig, this.scene.sketchInstance, this.topLeftX, this.topLeftY, this.width, this.height);
    }
    draw() {
        this.displayManager.draw(this.scrollManager.getGameTime());
    }
    getBounds() {
        return { topLeftX: this.topLeftX, topLeftY: this.topLeftY, width: this.width, height: this.height };
    }
    getDisplayConfig(config, numTracks) {
        let receptorSizes = [];
        for (let i = 0; i < numTracks; i++) {
            receptorSizes.push(config.noteSize);
        }
        return {
            getNoteSize: () => {
                return config.noteSize;
            },
            getPixelsPerSecond: () => {
                return config.pixelsPerSecond;
            },
            getReceptorYPercent: () => {
                return config.receptorYPercent;
            },
            getScrollDirection: () => {
                return config.scrollDirection;
            },
            getReceptorSizes: () => {
                return receptorSizes;
            },
            setReceptorSize: (trackNumber, receptorSize) => { }
        };
    }
}


/***/ }),

/***/ "./src/scripts/receptor_shrink_reaction.ts":
/*!*************************************************!*\
  !*** ./src/scripts/receptor_shrink_reaction.ts ***!
  \*************************************************/
/*! exports provided: ReceptorShrinkReaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceptorShrinkReaction", function() { return ReceptorShrinkReaction; });
class ReceptorShrinkReaction {
    constructor(config, displayConfig, numTracks) {
        this.config = config;
        this.displayConfig = displayConfig;
        this.numTracks = numTracks;
        this.trackHoldStates = [];
        for (let i = 0; i < numTracks; i++) {
            this.trackHoldStates.push(false);
        }
    }
    holdTrack(trackNumber) {
        this.trackHoldStates[trackNumber] = true;
    }
    releaseTrack(trackNumber) {
        this.trackHoldStates[trackNumber] = false;
    }
    draw() {
        let numReceptors = this.displayConfig.getReceptorSizes().length;
        let shrink = 0.7;
        for (let i = 0; i < numReceptors; i++) {
            let sizeRatio = this.isTrackHeld(i) ? shrink : 1.0;
            this.displayConfig.setReceptorSize(i, this.config.noteSize * sizeRatio);
        }
    }
    isTrackHeld(trackNumber) {
        return this.trackHoldStates[trackNumber];
    }
}


/***/ }),

/***/ "./src/scripts/results_display.ts":
/*!****************************************!*\
  !*** ./src/scripts/results_display.ts ***!
  \****************************************/
/*! exports provided: ResultsDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultsDisplay", function() { return ResultsDisplay; });
/* harmony import */ var _drawing_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawing_util */ "./src/scripts/drawing_util.ts");

class ResultsDisplay {
    constructor(config, noteManager, accuracyManager, p, accuracyRecording) {
        this.config = config;
        this.noteManager = noteManager;
        this.accuracyManager = accuracyManager;
        this.p = p;
        this.accuracyRecording = accuracyRecording;
    }
    draw() {
        this.drawAccuracyResults(this.p, this.config.accuracySettings, this.accuracyRecording, this.noteManager, this.accuracyManager);
    }
    drawAccuracyResults(p, accuracySettings, accuracyRecording, noteManager, accuracyManager) {
        let centerX = p.width / 2;
        let centerY = p.height / 2;
        let barWidth = p.width * 0.6;
        let barHeight = barWidth / 10;
        let leftLabelHeight = 0.8 * barHeight;
        let accuracyListForResults = this.getResultsAccuracyList(accuracySettings);
        Object(_drawing_util__WEBPACK_IMPORTED_MODULE_0__["drawAccuracyBars"])(p, accuracyListForResults, accuracyRecording, centerX, centerY, leftLabelHeight, barWidth, barHeight, noteManager, accuracyManager, accuracyManager.isConfiguredForBoos());
    }
    // return a list of unique accuracies sorted by the offset, with the best accuracy being first
    getResultsAccuracyList(accuracySettings) {
        let accuracyTable = accuracySettings.map(accuracy => {
            return {
                accuracyName: accuracy.name,
                sortValue: this.getAccuracySortingValue(accuracy.lowerBound, accuracy.upperBound)
            };
        });
        let mergedAccuracyTable = this.mergeAccuraciesWithSameName(accuracyTable);
        mergedAccuracyTable.sort(this.accuracyTableSortFunction);
        return mergedAccuracyTable.map(row => row.accuracyName);
    }
    getAccuracySortingValue(lowerBound, upperBound) {
        if (lowerBound == null) {
            return Math.abs(upperBound);
        }
        if (upperBound == null) {
            return Math.abs(lowerBound);
        }
        return Math.abs((upperBound + lowerBound) / 2);
    }
    mergeAccuraciesWithSameName(accuracyTable) {
        let mergedAccuracyTable = [];
        while (accuracyTable.length > 0) {
            let keyAccuracyName = accuracyTable[0].accuracyName;
            let matchedAccuracies = accuracyTable.filter(row => row.accuracyName === keyAccuracyName);
            let sortValueAverage = matchedAccuracies
                .reduce((sum, row) => sum + row.sortValue, 0)
                / matchedAccuracies.length;
            mergedAccuracyTable.push({ accuracyName: keyAccuracyName, sortValue: sortValueAverage });
            accuracyTable = accuracyTable.filter(row => row.accuracyName !== keyAccuracyName);
        }
        return mergedAccuracyTable;
    }
    accuracyTableSortFunction(a, b) {
        return a.sortValue - b.sortValue;
    }
}


/***/ }),

/***/ "./src/scripts/scroll_direction.ts":
/*!*****************************************!*\
  !*** ./src/scripts/scroll_direction.ts ***!
  \*****************************************/
/*! exports provided: ScrollDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollDirection", function() { return ScrollDirection; });
var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection[ScrollDirection["Up"] = 0] = "Up";
    ScrollDirection[ScrollDirection["Down"] = 1] = "Down";
})(ScrollDirection || (ScrollDirection = {}));


/***/ }),

/***/ "./src/scripts/scroll_manager.ts":
/*!***************************************!*\
  !*** ./src/scripts/scroll_manager.ts ***!
  \***************************************/
/*! exports provided: ScrollManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollManager", function() { return ScrollManager; });
/* harmony import */ var _time_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time_manager */ "./src/scripts/time_manager.ts");
/* harmony import */ var _scroll_direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scroll_direction */ "./src/scripts/scroll_direction.ts");


class ScrollManager {
    constructor(config, p, scrollBounds) {
        this.config = config;
        this.systemTimeMillis = 0;
        this.timeManager = new _time_manager__WEBPACK_IMPORTED_MODULE_0__["TimeManager"](0, this.config);
        this.scrollBounds = scrollBounds;
        p.mouseWheel = function (e) {
            let allowScroll = false;
            if (scrollBounds !== undefined) {
                if (this.mouseIsInBounds(p, this.scrollBounds)) {
                    allowScroll = true;
                }
            }
            else {
                allowScroll = true;
            }
            if (allowScroll) {
                let timeChangeMillis = e.deltaY * 0.2;
                if (this.config.scrollDirection === _scroll_direction__WEBPACK_IMPORTED_MODULE_1__["ScrollDirection"].Down) {
                    this.systemTimeMillis -= timeChangeMillis;
                }
                else {
                    this.systemTimeMillis += timeChangeMillis;
                }
                // Equivalent to event.preventDefault
                return false;
            }
        }.bind(this);
    }
    // Allow an ignored argument so it can be used in place of a TimeManager for debug mode
    getGameTime(ignoredArgument) {
        let time = this.timeManager.getGameTime(this.systemTimeMillis);
        return time;
    }
    mouseIsInBounds(p, bounds) {
        if (p.mouseX >= bounds.topLeftX && p.mouseX <= bounds.topLeftX + bounds.width &&
            p.mouseY >= bounds.topLeftY && p.mouseY <= bounds.topLeftY + bounds.height) {
            return true;
        }
        else {
            return false;
        }
    }
}


/***/ }),

/***/ "./src/scripts/stepfile.ts":
/*!*********************************!*\
  !*** ./src/scripts/stepfile.ts ***!
  \*********************************/
/*! exports provided: StepfileState, Stepfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StepfileState", function() { return StepfileState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stepfile", function() { return Stepfile; });
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");
/* harmony import */ var _playlist_client_parsing_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist_client/parsing_helper */ "./src/scripts/playlist_client/parsing_helper.ts");


var StepfileState;
(function (StepfileState) {
    StepfileState[StepfileState["NO_STEPFILE"] = 0] = "NO_STEPFILE";
    StepfileState[StepfileState["DONE_READING"] = 1] = "DONE_READING";
    StepfileState[StepfileState["PARTIALLY_PARSED"] = 2] = "PARTIALLY_PARSED";
    StepfileState[StepfileState["FULLY_PARSED"] = 3] = "FULLY_PARSED";
    StepfileState[StepfileState["ERROR"] = 4] = "ERROR";
})(StepfileState || (StepfileState = {}));
class Stepfile {
    constructor() {
        this.state = StepfileState.NO_STEPFILE;
    }
    loadFile(file) {
        this.file = file.file; // this unwraps the p5.File wrapper to get the original DOM file
        this.loadTextFile(this.file, ((event) => {
            this.state = StepfileState.DONE_READING;
            this.partialParse = Object(_parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["getPartialParse"])(event.target.result);
            if (this.partialParse.modes.length < 1) {
                this.state = StepfileState.ERROR;
            }
            else {
                this.state = StepfileState.PARTIALLY_PARSED;
            }
        }));
    }
    loadFfrBeatmap(beatmap) {
        let tracks = _playlist_client_parsing_helper__WEBPACK_IMPORTED_MODULE_1__["ParsingHelper"].beatmapToTrackArray(beatmap);
        let partialParse = new _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["PartialParse"]();
        partialParse.modes = [new Map()];
        partialParse.metaData = new Map();
        this.partialParse = partialParse;
        let fullParse = new _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["FullParse"](partialParse);
        fullParse.tracks = tracks;
        this.fullParse = fullParse;
        this.state = StepfileState.FULLY_PARSED;
    }
    finishParsing(modeIndex) {
        if (this.state === StepfileState.PARTIALLY_PARSED || this.state === StepfileState.FULLY_PARSED) {
            this.fullParse = Object(_parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["getFullParse"])(modeIndex, this.partialParse);
            this.state = StepfileState.FULLY_PARSED;
        }
    }
    loadTextFile(file, listener, options) {
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.addEventListener("loadend", listener, options);
    }
}


/***/ }),

/***/ "./src/scripts/ticker.ts":
/*!*******************************!*\
  !*** ./src/scripts/ticker.ts ***!
  \*******************************/
/*! exports provided: TickerState, Ticker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TickerState", function() { return TickerState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ticker", function() { return Ticker; });
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_wrapper */ "./src/scripts/dom_wrapper.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");


var TickerState;
(function (TickerState) {
    TickerState[TickerState["INFORMATION"] = 0] = "INFORMATION";
    TickerState[TickerState["ERROR"] = 1] = "ERROR";
})(TickerState || (TickerState = {}));
class Ticker {
    static create(defaultMessage, customClass) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let tickerSpan = _dom_wrapper__WEBPACK_IMPORTED_MODULE_0__["DOMWrapper"].create(() => {
            return p.createElement("span", defaultMessage);
        }, "tickerSpan");
        let tickerDiv = _dom_wrapper__WEBPACK_IMPORTED_MODULE_0__["DOMWrapper"].create(() => {
            return p.createDiv();
        }, "tickerDiv");
        if (this.isInitializing(tickerDiv, tickerSpan)) {
            this.initialize(tickerDiv.element, tickerSpan.element);
        }
        this.setStyle(customClass);
        return tickerDiv;
    }
    static isInitializing(element1, element2) {
        return !element1.alreadyExists || !element2.alreadyExists;
    }
    static initialize(div, span) {
        this.state = TickerState.INFORMATION;
        div.child(span);
        this.div = div;
        this.span = span;
    }
    static setMessage(message, tickerState) {
        this.span.html(message);
        this.state = tickerState;
    }
    static setStyle(customClass) {
        if (this.state === TickerState.INFORMATION) {
            setElementClasses(this.div, _index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass, customClass, this.informationClass);
        }
        else if (this.state === TickerState.ERROR) {
            setElementClasses(this.div, _index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass, customClass, this.errorClass);
        }
    }
}
Ticker.informationClass = "ticker-info";
Ticker.errorClass = "ticker-error";
function setElementClasses(element, ...classes) {
    element.class(classes.join(" "));
}


/***/ }),

/***/ "./src/scripts/time_manager.ts":
/*!*************************************!*\
  !*** ./src/scripts/time_manager.ts ***!
  \*************************************/
/*! exports provided: TimeManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeManager", function() { return TimeManager; });
class TimeManager {
    constructor(systemTimeWhenGameStarted, config) {
        this.systemTimeWhenGameStarted = systemTimeWhenGameStarted;
        this.config = config;
    }
    getElapsedTime(systemTimeMillis) {
        if (systemTimeMillis === undefined) {
            throw Error("Error: can't get elapsed time. Expected 1 argument: systemTime.");
        }
        return (systemTimeMillis - this.systemTimeWhenGameStarted) / 1000; // in seconds
    }
    // We want to keep this calculation in only one place
    getGameTime(systemTimeMillis) {
        return this.getElapsedTime(systemTimeMillis) + this.config.additionalOffsetInSeconds - this.config.pauseAtStartInSeconds;
    }
}


/***/ }),

/***/ "./src/scripts/ui_util.ts":
/*!********************************!*\
  !*** ./src/scripts/ui_util.ts ***!
  \********************************/
/*! exports provided: drawHeading, setElementCenterPositionRelative, setElementToBottom, createLabeledInput, createLabel, createLabeledSelect, createLabeledTextArea, createFileInput, createLabeledCheckbox, YesNo, booleanToYesNo, yesNoToBoolean, encloseEachInputLabelPairIntoASubDiv, fixRadioDivElement, styleRadioOptions, setOnInputUnlessItAlreadyExists, createUserInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawHeading", function() { return drawHeading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementCenterPositionRelative", function() { return setElementCenterPositionRelative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementToBottom", function() { return setElementToBottom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabeledInput", function() { return createLabeledInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabel", function() { return createLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabeledSelect", function() { return createLabeledSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabeledTextArea", function() { return createLabeledTextArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFileInput", function() { return createFileInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabeledCheckbox", function() { return createLabeledCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YesNo", function() { return YesNo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "booleanToYesNo", function() { return booleanToYesNo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yesNoToBoolean", function() { return yesNoToBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encloseEachInputLabelPairIntoASubDiv", function() { return encloseEachInputLabelPairIntoASubDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixRadioDivElement", function() { return fixRadioDivElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleRadioOptions", function() { return styleRadioOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOnInputUnlessItAlreadyExists", function() { return setOnInputUnlessItAlreadyExists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUserInput", function() { return createUserInput; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page_manager */ "./src/scripts/page_manager.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom_wrapper */ "./src/scripts/dom_wrapper.ts");




function drawHeading() {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let headingClass = "navigation-heading";
    let playFromFileButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        return p.createButton("Play From File");
    }, "playFromFileButton");
    setElementCenterPositionRelative(playFromFileButton.element, 0.25, 0.036, 130, 34);
    playFromFileButton.element.mousePressed(() => {
        _page_manager__WEBPACK_IMPORTED_MODULE_1__["PageManager"].setCurrentPage(_page_manager__WEBPACK_IMPORTED_MODULE_1__["PAGES"].PLAY_FROM_FILE);
    });
    if (!playFromFileButton.alreadyExists) {
        playFromFileButton.element.addClass(headingClass);
        playFromFileButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
    }
    let playFromOnlineButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        return p.createButton("Play From Online");
    }, "playFromOnlineButton");
    setElementCenterPositionRelative(playFromOnlineButton.element, 0.5, 0.036, 90, 34);
    playFromOnlineButton.element.mousePressed(() => {
        _page_manager__WEBPACK_IMPORTED_MODULE_1__["PageManager"].setCurrentPage(_page_manager__WEBPACK_IMPORTED_MODULE_1__["PAGES"].PLAY_FROM_ONLINE);
    });
    if (!playFromOnlineButton.alreadyExists) {
        playFromOnlineButton.element.addClass(headingClass);
        playFromOnlineButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
    }
    let optionsButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        return p.createButton("Options");
    }, "optionsButton");
    setElementCenterPositionRelative(optionsButton.element, 0.8, 0.036, 90, 34);
    optionsButton.element.mousePressed(() => {
        _page_manager__WEBPACK_IMPORTED_MODULE_1__["PageManager"].setCurrentPage(_page_manager__WEBPACK_IMPORTED_MODULE_1__["PAGES"].OPTIONS);
    });
    if (!optionsButton.alreadyExists) {
        optionsButton.element.addClass(headingClass);
        optionsButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
    }
}
// Expects relativeX and relative Y to be between 0 and 1
function setElementCenterPositionRelative(element, relativeX, relativeY, width, height) {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let canvasPosition = p._renderer.position();
    element.position(canvasPosition.x + (relativeX * p.width) - (width / 2), canvasPosition.y + (relativeY * p.height) - (height / 2));
}
function setElementToBottom(element, heightPercent, stylingWidth, stylingHeight) {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let canvasPosition = p._renderer.position();
    let elementHeight = heightPercent / 100 * p.height;
    element.position(canvasPosition.x, canvasPosition.y + (p.height - elementHeight - stylingHeight));
    element.style("width: " + (p.width - stylingWidth) + "px");
    element.style("height: " + elementHeight + "px");
}
function createLabeledInput(labelString, inputId, inputInitialValue, customClass) {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        let labeledInputClass = "labeled-input";
        let container = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledInputClass);
        container.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        let label = createLabel(p, labelString, inputId);
        label.addClass(customClass);
        label.addClass(labeledInputClass);
        label.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        label.parent(container);
        let input = p.createInput(inputInitialValue);
        input.addClass(customClass);
        input.addClass(labeledInputClass);
        input.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        input.parent(container);
        input.id(inputId);
        return container;
    }, inputId + "Container");
    let input = Object(_util__WEBPACK_IMPORTED_MODULE_2__["getFirstElementByTagName"])(container.element, "INPUT");
    return { element: input, alreadyExists: container.alreadyExists };
}
function createLabel(p, labelString, forId) {
    let label = p.createElement("label", labelString);
    if (forId !== undefined) {
        label.attribute("for", forId);
    }
    return label;
}
function createCheckbox(p, initialState) {
    let checkbox = p.createElement("checkbox");
    checkbox.elt.checked = initialState;
    return checkbox;
}
// TODO: check that optionsEnum is actually an Enum, and initialEnumValue is a value for that enum
function createLabeledSelect(labelString, selectId, OptionsEnum, initialEnumValue, customClass) {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let select;
    let labeledSelectClass = "labeled-select";
    let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        let container = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledSelectClass);
        container.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        let label = createLabel(p, labelString, selectId);
        label.addClass(customClass);
        label.addClass(labeledSelectClass);
        label.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        label.parent(container);
        select = p.createSelect();
        select.addClass(customClass);
        select.addClass(labeledSelectClass);
        select.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        select.parent(container);
        select.id(selectId);
        return container;
    }, selectId + "Container");
    if (!container.alreadyExists) {
        let initialOptions = Object(_util__WEBPACK_IMPORTED_MODULE_2__["enumToStringArray"])(OptionsEnum);
        for (let i = 0; i < initialOptions.length; i++) {
            // @ts-ignore
            select.option(initialOptions[i]);
        }
        // @ts-ignore
        select.selected(Object(_util__WEBPACK_IMPORTED_MODULE_2__["enumToString"])(OptionsEnum, initialEnumValue));
        let options = select.elt.children;
        for (let i = 0; i < options.length; i++) {
            options.item(i).setAttribute("class", customClass + " " + labeledSelectClass + " " + _index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        }
    }
    return { element: select, alreadyExists: container.alreadyExists };
}
function createLabeledTextArea(labelString, inputId, inputInitialValue, customClass, rows = 4, cols = 40) {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let textArea;
    let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        let labeledTextareaClass = "labeled-textarea";
        let container = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledTextareaClass);
        container.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        let label = createLabel(p, labelString, inputId);
        label.addClass(customClass);
        label.addClass(labeledTextareaClass);
        label.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        label.parent(container);
        textArea = p.createElement("textarea", inputInitialValue);
        textArea.addClass(customClass);
        textArea.addClass(labeledTextareaClass);
        textArea.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        textArea.parent(container);
        textArea.id(inputId);
        textArea.attribute("rows", rows.toString());
        textArea.attribute("cols", cols.toString());
        return container;
    }, inputId + "Container");
    return { element: textArea, alreadyExists: container.alreadyExists };
}
function createFileInput(labelString, buttonText, uniqueId, onFileLoad, customClass) {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let buttonId = uniqueId + "Button";
    let containerId = uniqueId + "Container";
    let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        let fileInputClass = "file-input";
        let container = p.createDiv();
        container.addClass(customClass);
        container.addClass(fileInputClass);
        container.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        let fileInput = p.createFileInput(onFileLoad, "false");
        fileInput.parent(container);
        fileInput.hide();
        let button = p.createButton(buttonText);
        button.parent(container);
        button.id(buttonId);
        button.mouseClicked(() => {
            fileInput.elt.click();
        });
        button.addClass(customClass);
        button.addClass(fileInputClass);
        button.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        let label = createLabel(p, labelString, buttonId);
        label.addClass(customClass);
        label.addClass(fileInputClass);
        label.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        label.parent(container);
        return container;
    }, containerId);
    let label = Object(_util__WEBPACK_IMPORTED_MODULE_2__["getFirstElementByTagName"])(container.element, "LABEL");
    label.html(labelString);
    return container;
}
function createLabeledCheckbox(labelString, checkboxId, isChecked, customClass) {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let checkbox;
    let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        let labeledCheckboxClass = "labeled-checkbox";
        let container = p.createDiv();
        container.addClass(customClass);
        container.addClass(labeledCheckboxClass);
        container.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        let label = createLabel(p, labelString, checkboxId);
        label.addClass(customClass);
        label.addClass(labeledCheckboxClass);
        label.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        label.parent(container);
        checkbox = createCheckbox(p, isChecked);
        checkbox.addClass(customClass);
        checkbox.addClass(labeledCheckboxClass);
        checkbox.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        checkbox.parent(container);
        checkbox.id(checkboxId);
        return container;
    }, checkboxId + "Container");
    return { element: checkbox, alreadyExists: container.alreadyExists };
}
var YesNo;
(function (YesNo) {
    YesNo[YesNo["Yes"] = 0] = "Yes";
    YesNo[YesNo["No"] = 1] = "No";
})(YesNo || (YesNo = {}));
function booleanToYesNo(boolean) {
    if (boolean) {
        return YesNo.Yes;
    }
    else {
        return YesNo.No;
    }
}
function yesNoToBoolean(yesNo) {
    if (yesNo === YesNo.Yes) {
        return true;
    }
    else {
        return false;
    }
}
// https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
function encloseEachInputLabelPairIntoASubDiv(p, radioDivP5Element) {
    const inputs = selectAll(p, 'input', radioDivP5Element);
    const labels = selectAll(p, 'label', radioDivP5Element);
    const len = inputs.length;
    for (let i = 0; i < len; ++i) {
        p.createDiv().parent(radioDivP5Element).child(inputs[i]).child(labels[i]);
    }
}
// https://discourse.processing.org/t/how-to-organize-radio-buttons-in-separate-lines/10041/5
function fixRadioDivElement(radioDivP5Element) {
    // @ts-ignore
    radioDivP5Element._getInputChildrenArray = function () {
        return this.elt.getElementsByTagName('input');
    };
}
function styleRadioOptions(p, radioDivP5Element, styleClasses) {
    let divs = selectAll(p, 'div', radioDivP5Element);
    for (let i = 0; i < divs.length; i++) {
        divs[i].addClass(styleClasses.join(" "));
    }
    let inputs = selectAll(p, 'input', radioDivP5Element);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addClass(styleClasses.join(" "));
    }
    let labels = selectAll(p, 'label', radioDivP5Element);
    for (let i = 0; i < inputs.length; i++) {
        labels[i].addClass(styleClasses.join(" "));
    }
}
function removeAllOccurrencesOfTag(html, tagName) {
    let tempDiv = document.createElement("div");
    let elements = tempDiv.getElementsByTagName(tagName);
    while (elements[0] !== undefined) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    return tempDiv.innerHTML;
}
function setOnInputUnlessItAlreadyExists(inputElement, onInput) {
    if (!inputElement.alreadyExists) {
        // @ts-ignore
        inputElement.element.input(onInput);
    }
}
function selectAll(p, tagName, container) {
    if (container.id() === "") {
        throw "error: container used with selectAll must have an id";
    }
    let id = "#" + container.id();
    return p.selectAll(tagName, id);
}
function createUserInput(create, isValidInput, showInfo, showError, onValidInput, parent) {
    let created = create();
    if (!created.alreadyExists) {
        let element = created.element;
        parent.child(element.parent());
        element.mouseClicked(() => {
            let value = element.value();
            if (isValidInput(value)) {
                showInfo();
            }
            else {
                showError();
            }
        });
        // @ts-ignore
        element.input(() => {
            let value = element.value();
            if (isValidInput(value)) {
                showInfo();
                onValidInput(value);
            }
            else {
                showError();
            }
        });
    }
    return created;
}


/***/ }),

/***/ "./src/scripts/util.ts":
/*!*****************************!*\
  !*** ./src/scripts/util.ts ***!
  \*****************************/
/*! exports provided: defaultIfUndefined, isUndefined, setAllNotesToDefaultState, replaceNotYetImplementedNoteTypes, getMissBoundary, isKeyBindingsDefined, initializeKeyBindings, setConfigKeyBinding, enumToStringArray, getKeyString, getModeOptionsForDisplay, compareModeOptions, getFirstElementByTagName, findBindingInfoForTrack, generatePreviewNotes, getAccuracyEventName, isFilesReady, initPlayingDisplay, enumToString, getFloat, getInt, getEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultIfUndefined", function() { return defaultIfUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllNotesToDefaultState", function() { return setAllNotesToDefaultState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceNotYetImplementedNoteTypes", function() { return replaceNotYetImplementedNoteTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMissBoundary", function() { return getMissBoundary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeyBindingsDefined", function() { return isKeyBindingsDefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeKeyBindings", function() { return initializeKeyBindings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfigKeyBinding", function() { return setConfigKeyBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumToStringArray", function() { return enumToStringArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKeyString", function() { return getKeyString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getModeOptionsForDisplay", function() { return getModeOptionsForDisplay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareModeOptions", function() { return compareModeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstElementByTagName", function() { return getFirstElementByTagName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findBindingInfoForTrack", function() { return findBindingInfoForTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePreviewNotes", function() { return generatePreviewNotes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccuracyEventName", function() { return getAccuracyEventName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFilesReady", function() { return isFilesReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPlayingDisplay", function() { return initPlayingDisplay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumToString", function() { return enumToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFloat", function() { return getFloat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInt", function() { return getInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEnum", function() { return getEnum; });
/* harmony import */ var _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing/parse_sm */ "./src/scripts/parsing/parse_sm.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! p5 */ "p5");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stepfile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stepfile */ "./src/scripts/stepfile.ts");
/* harmony import */ var _audio_file__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audio_file */ "./src/scripts/audio_file.ts");
/* harmony import */ var _playing_display__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./playing_display */ "./src/scripts/playing_display.ts");






function defaultIfUndefined(value, defaultValue) {
    return isUndefined(value) ? defaultValue : value;
}
function isUndefined(value) {
    return typeof value === "undefined";
}
function setAllNotesToDefaultState(tracks) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].length; j++) {
            tracks[i][j].state = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT;
        }
    }
}
function replaceNotYetImplementedNoteTypes(tracks) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].length; j++) {
            switch (tracks[i][j].type) {
                case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL:
                    break;
                case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].MINE:
                    tracks[i][j].type = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NONE; //TODO: implement mines
                    break;
                case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD:
                    break;
                case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NONE:
                    break;
                case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].ROLL_HEAD:
                    tracks[i][j].type = _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD; //TODO: implement rolls
                    break;
                case _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL:
                    break;
            }
        }
    }
}
function getMissBoundary(currentTime, config) {
    let missBoundary = currentTime + (config.accuracySettings[0].upperBound / 1000); //result is in seconds
    return missBoundary;
}
function isKeyBindingsDefined(numTracks) {
    return _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.keyBindings.get(numTracks) !== undefined;
}
function initializeKeyBindings(numTracks) {
    let mapping = [];
    if (numTracks <= 9) {
        let keySequence = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
        for (let i = 0; i < numTracks; i++) {
            let keyString = keySequence[i];
            mapping.push({ trackNumber: i, keyCode: keyString.charCodeAt(0), string: keyString });
        }
    }
    else {
        if (numTracks > 26) {
            console.error("Couldn't generate default key bindings for more than 26 tracks. Ran out of letters!");
            numTracks = 26;
        }
        for (let i = 0; i < numTracks; i++) {
            let characterCode = "A".charCodeAt(0) + i; // This is an ASCII character code
            mapping.push({ trackNumber: i, keyCode: characterCode, string: String.fromCharCode(characterCode) });
        }
    }
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.keyBindings.set(numTracks, mapping);
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.save();
}
function setConfigKeyBinding(trackNumber, numTracks, keyBinding) {
    let bindingIndex = getIndexOfTrackNumberBinding(trackNumber, _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.keyBindings.get(numTracks));
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.keyBindings.get(numTracks)[bindingIndex] = keyBinding;
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.save();
}
// Expects e to be an enum
function enumToStringArray(e) {
    return Object.values(e).filter((value) => typeof value === "string").map((value) => {
        return String(value);
    });
}
function getIndexOfTrackNumberBinding(trackNumber, bindings) {
    for (let i = 0; i < bindings.length; i++) {
        if (bindings[i].trackNumber === trackNumber) {
            return i;
        }
    }
    return -1;
}
function getKeyString(p) {
    return p.key.length == 1 ? p.key.toUpperCase() : p.key;
}
function getModeOptionsForDisplay(modesAsStrings) {
    let modeOptions = [];
    for (let i = 0; i < modesAsStrings.length; i++) {
        let mode = modesAsStrings[i];
        modeOptions.push({ type: mode.get("type"), difficulty: mode.get("difficulty"), meter: mode.get("meter"), id: i });
    }
    modeOptions.sort(compareModeOptions);
    return modeOptions;
}
function compareModeOptions(a, b) {
    let typeA = a.type.toUpperCase();
    let typeB = b.type.toUpperCase();
    if (typeA != typeB) {
        if (typeA < typeB) {
            return -1;
        }
        else {
            return 1;
        }
    }
    else {
        let difficultyA = a.difficulty.toUpperCase();
        let difficultyB = b.difficulty.toUpperCase();
        if (difficultyA != difficultyB) {
            return difficultyRank(difficultyA) - difficultyRank(difficultyB);
        }
        else {
            let meterA = parseFloat(a.meter);
            let meterB = parseFloat(b.meter);
            if (meterA != meterB) {
                return meterA - meterB;
            }
        }
    }
    return a.id = b.id;
}
function difficultyRank(difficulty) {
    switch (difficulty) {
        case "BEGINNER":
            return 0;
        case "EASY":
            return 1;
        case "MEDIUM":
            return 2;
        case "HARD":
            return 3;
        case "CHALLENGE":
            return 4;
        case "EDIT":
            return 5;
        default:
            return 6;
    }
}
function getFirstElementByTagName(div, tagName) {
    let childrenNodes = div.child();
    for (let i = 0; i < childrenNodes.length; i++) {
        let node = childrenNodes[i];
        // @ts-ignore
        if (node.tagName === tagName) {
            // @ts-ignore
            return new p5__WEBPACK_IMPORTED_MODULE_2__["Element"](node);
        }
    }
    return undefined;
}
function findBindingInfoForTrack(trackNumber, bindings) {
    for (let i = 0; i < bindings.length; i++) {
        if (bindings[i].trackNumber === trackNumber) {
            return bindings[i];
        }
    }
    return undefined;
}
function generatePreviewNotes(numTracks) {
    let notes = [];
    let isHold = false;
    let currentTime = 0.1;
    let timeIncrement = 0.3 / numTracks;
    for (let i = 0; i < numTracks; i++) {
        let track = [];
        if (isHold) {
            track.push({
                type: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD, typeString: "Don't Care", timeInSeconds: currentTime,
                state: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT
            });
            track.push({
                type: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL, typeString: "Don't Care", timeInSeconds: currentTime + 0.25,
                state: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT
            });
        }
        else {
            track.push({
                type: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL,
                typeString: "Don't Care",
                timeInSeconds: currentTime,
                state: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT
            });
        }
        notes.push(track);
        isHold = !isHold;
        currentTime += timeIncrement;
    }
    return notes;
}
function getAccuracyEventName(timeDifferenceInMilliseconds, config) {
    if (config.accuracySettings[0].lowerBound == null &&
        timeDifferenceInMilliseconds < config.accuracySettings[0].upperBound) {
        return config.accuracySettings[0].name; // Handle miss if it exists
    }
    if (config.accuracySettings[config.accuracySettings.length - 1].upperBound == null &&
        timeDifferenceInMilliseconds >= config.accuracySettings[config.accuracySettings.length - 1].lowerBound) {
        return config.accuracySettings[config.accuracySettings.length - 1].name; // Handle boo if it exists
    }
    for (let i = 0; i < config.accuracySettings.length; i++) {
        let accuracy = config.accuracySettings[i];
        if (accuracy.lowerBound != null && accuracy.upperBound != null) {
            if (accuracy.lowerBound < timeDifferenceInMilliseconds && timeDifferenceInMilliseconds <= accuracy.upperBound) {
                return accuracy.name;
            }
        }
    }
    return "ERROR: Unknown accuracy";
}
function isFilesReady(stepfile, audioFile) {
    let stepfileReady = stepfile.state === _stepfile__WEBPACK_IMPORTED_MODULE_3__["StepfileState"].PARTIALLY_PARSED ||
        stepfile.state === _stepfile__WEBPACK_IMPORTED_MODULE_3__["StepfileState"].FULLY_PARSED;
    let audioFileReady = audioFile.state === _audio_file__WEBPACK_IMPORTED_MODULE_4__["AudioFileState"].BUFFERED;
    return stepfileReady && audioFileReady;
}
function initPlayingDisplay(tracks, audioFile) {
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].playingDisplay = new _playing_display__WEBPACK_IMPORTED_MODULE_5__["PlayingDisplay"](tracks, audioFile, _index__WEBPACK_IMPORTED_MODULE_1__["global"].config, _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene);
}
function enumToString(TheEnum, value) {
    return TheEnum[value].toString();
}
function getFloat(value) {
    if (typeof value === "string") {
        return parseFloat(value);
    }
    return value;
}
function getInt(value) {
    if (typeof value === "string") {
        return parseInt(value);
    }
    return value;
}
function getEnum(value, EnumType) {
    let string = String(value);
    return EnumType[string];
}


/***/ }),

/***/ "p5":
/*!*********************!*\
  !*** external "p5" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = p5;

/***/ }),

/***/ "pako":
/*!***********************!*\
  !*** external "pako" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = pako;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaHl0aG1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja19mbGFzaC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja190ZXh0LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9yZWNvcmRpbmcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2F1ZGlvX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvZGVmYXVsdF9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RlZmF1bHRfbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kaXNwbGF5X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RvbV93cmFwcGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kcmF3aW5nX3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2hvbGRfZ2xvdy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaG9sZF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9ob2xkX3BhcnRpY2xlcy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2tleV9iaW5kaW5nX2hlbHBlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMva2V5X2JpbmRpbmdzX3VpLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9rZXlib2FyZF9ldmVudF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9taXNzX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL25vdGVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9vbmxpbmVfcGxheWxpc3QudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3A1X3NjZW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXkudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXlfZnJvbV9maWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5X2Zyb21fb25saW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9yZXN1bHRzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL2J5dGVfcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3NtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3N3Zi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9zd2YtcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3N3Zi10YWdzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFydGljbGVfc3lzdGVtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5ZXJfa2V5X2FjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGxheWluZ19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5bGlzdF9jbGllbnQvcGFyc2luZ19oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnRfc3RhdGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9zb25nLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5bGlzdF9jbGllbnQvdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcHJldmlld19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9yZWNlcHRvcl9zaHJpbmtfcmVhY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3Jlc3VsdHNfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX2RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3N0ZXBmaWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy90aWNrZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3RpbWVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvdWlfdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lL2V4dGVybmFsIFwicDVcIiIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lL2V4dGVybmFsIFwicGFrb1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiww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QUFDLGNBQWMsR0FBRyxJQUFJLCtEQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSw2Q0FBTSxDQUFDLE1BQU0sRUFBRSw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pHLENBQUM7QUFFTSxTQUFTLFlBQVksQ0FBQyxPQUFZLEVBQUUsS0FBVTtJQUNqRCxPQUFPLE9BQU8sQ0FBQyxLQUE2QixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDN0QsQ0FBQztBQUVNLFNBQVMsUUFBUSxDQUFDLEtBQXNCO0lBQzNDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVNLFNBQVMsTUFBTSxDQUFDLEtBQXNCO0lBQ3pDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVNLFNBQVMsT0FBTyxDQUFDLEtBQXNCLEVBQUUsUUFBYTtJQUN6RCxJQUFJLE1BQU0sR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsT0FBTyxRQUFRLENBQUMsTUFBK0IsQ0FBQyxDQUFDO0FBQ3JELENBQUM7Ozs7Ozs7Ozs7OztBQzNRRCxvQjs7Ozs7Ozs7Ozs7QUNBQSxzQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JpcHRzL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSwgQWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5RmVlZGJhY2tGbGFzaCB7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bUNvbG9yZWRBY2N1cmFjeVJhbmtzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBmbGFzaER1cmF0aW9uSW5TZWNvbmRzOiBudW1iZXIgPSAwLjE7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5Q29sb3JzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZywgY29uZmlnOiBDb25maWcsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IGRpc3BsYXlNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMubnVtQ29sb3JlZEFjY3VyYWN5UmFua3MgPSB0aGlzLmdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lDb2xvcnMgPSBbXHJcbiAgICAgICAgICAgIFsxNzgsIDk0LCAyNDcsIDE4MF0sXHJcbiAgICAgICAgICAgIFszMCwgMjE3LCAxMjQsIDE2MF0sXHJcbiAgICAgICAgICAgIFsxOTYsIDE5OSwgMzAsIDE0MF0sXHJcbiAgICAgICAgICAgIFsyNDUsIDIxMywgMjIxLCAxMjBdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB3aGlsZSAodGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA+IHRoaXMuYWNjdXJhY3lDb2xvcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdXJhY3lDb2xvcnMucHVzaChcclxuICAgICAgICAgICAgICAgIFt0aGlzLmdldFJhbmRvbUludCgyNTUpLCB0aGlzLmdldFJhbmRvbUludCgyNTUpLCB0aGlzLmdldFJhbmRvbUludCgyNTUpLCAxMDBdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmFuZG9tSW50KG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdGbGFzaEZvclRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0ZsYXNoRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSA9IHRoaXMuZ2V0VHJhY2tNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSh0cmFja051bWJlcik7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGbGFzaEhhcHBlbmluZyhjdXJyZW50VGltZUluU2Vjb25kcywgbW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpKSB7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY3VycmVudFRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgbGV0IGZsYXNoQ29sb3I6IHA1LkNvbG9yID0gdGhpcy5nZXRGbGFzaENvbG9yKG1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KTtcclxuICAgICAgICAgICAgbGV0IGVsYXBzZWRUaW1lSW5TZWNvbmRzID0gdGhpcy5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcywgbW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdGbGFzaChlbGFwc2VkVGltZUluU2Vjb25kcywgY2VudGVyWCwgY2VudGVyWSwgZmxhc2hDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNGbGFzaEhhcHBlbmluZyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5RXZlbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgYWNjdXJhY2llc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gSGFuZGxlIG1pc3MgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPj0gYWNjdXJhY2llc1thY2N1cmFjaWVzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVsYXBzZWRUaW1lSW5TZWNvbmRzID0gdGhpcy5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcywgYWNjdXJhY3lFdmVudCk7XHJcbiAgICAgICAgaWYgKGVsYXBzZWRUaW1lSW5TZWNvbmRzID4gQWNjdXJhY3lGZWVkYmFja0ZsYXNoLmZsYXNoRHVyYXRpb25JblNlY29uZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VHJhY2tNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSh0cmFja051bWJlcjogbnVtYmVyKTogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGlmICh0cmFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl1bdHJhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzc3VtZXMgc3ltbWV0cmljYWwgYWNjdXJhY3kgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgZ2V0Rmxhc2hDb2xvcihhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVJhbmsgPSB0aGlzLmdldEFjY3VyYWN5UmFuayhhY2N1cmFjeUV2ZW50LCBhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgY29sb3JWYWx1ZXMgPSB0aGlzLmFjY3VyYWN5Q29sb3JzW2FjY3VyYWN5UmFuayAtIDFdO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBwLmNvbG9yKGNvbG9yVmFsdWVzWzBdLCBjb2xvclZhbHVlc1sxXSwgY29sb3JWYWx1ZXNbMl0sIGNvbG9yVmFsdWVzWzNdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBudW1SYW5rcyA9IDE7IC8vIHN0YXJ0IHdpdGggMSBiZWNhdXNlIHdlIGF0IGxlYXN0IGhhdmUgdGhlIGJlc3QgcmFua1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleCArIDE7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPT0gdW5kZWZpbmVkICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbnVtUmFua3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtUmFua3NcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgMCAmJiAwIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgYSByYW5rIHdoZXJlIDEgaXMgdGhlIGJlc3RcclxuICAgIHByaXZhdGUgZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnksIGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8IDApIHtcclxuICAgICAgICAgICAgYWNjdXJhY2llcyA9IHRoaXMuZ2V0UmV2ZXJzZWQoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRSYW5rID0gMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXg7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAmJiBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UmFuaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50UmFuaysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJldmVyc2VkKGFycmF5OiBhbnlbXSkge1xyXG4gICAgICAgIGxldCBhcnJheUNvcHk6IGFueVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGFycmF5Q29weS5wdXNoKGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Q29weTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdGbGFzaChlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGZsYXNoU2l6ZTogbnVtYmVyID0gdGhpcy5nZXRGbGFzaFNpemUoZWxhcHNlZFRpbWVJblNlY29uZHMsIEFjY3VyYWN5RmVlZGJhY2tGbGFzaC5mbGFzaER1cmF0aW9uSW5TZWNvbmRzKTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICBwLmZpbGwoY29sb3IpO1xyXG4gICAgICAgIC8vIHAuZmlsbCgyNTUsIDI1NSwgMjU1LCAxNTApO1xyXG4gICAgICAgIHAubm9TdHJva2UoKTtcclxuICAgICAgICB0aGlzLmRyYXdTdGFyKHAsIDAsIDAsIGZsYXNoU2l6ZSwgZmxhc2hTaXplICogMC40LCA0KTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Rmxhc2hTaXplKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGZsYXNoRHVyYXRpb25JblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBmbGFzaENvbXBsZXRpb25SYXRpbyA9IGVsYXBzZWRUaW1lSW5TZWNvbmRzIC8gZmxhc2hEdXJhdGlvbkluU2Vjb25kcztcclxuICAgICAgICBsZXQgbWluU2l6ZSA9IDA7XHJcbiAgICAgICAgbGV0IG1heFNpemUgPSB0aGlzLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZShtaW5TaXplLCBtYXhTaXplLCBmbGFzaENvbXBsZXRpb25SYXRpbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnBvbGF0ZShtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWUgKyAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKiByYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1N0YXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCByYWRpdXMxOiBudW1iZXIsIHJhZGl1czI6IG51bWJlciwgbnBvaW50czogbnVtYmVyKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5hbmdsZU1vZGUocC5SQURJQU5TKTtcclxuICAgICAgICBsZXQgYW5nbGUgPSBwLlRXT19QSSAvIG5wb2ludHM7XHJcbiAgICAgICAgbGV0IGhhbGZBbmdsZSA9IGFuZ2xlIC8gMi4wO1xyXG4gICAgICAgIHAuYmVnaW5TaGFwZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgcC5UV09fUEk7IGEgKz0gYW5nbGUpIHtcclxuICAgICAgICAgICAgbGV0IHN4ID0gY2VudGVyWCArIHAuY29zKGEpICogcmFkaXVzMjtcclxuICAgICAgICAgICAgbGV0IHN5ID0gY2VudGVyWSArIHAuc2luKGEpICogcmFkaXVzMjtcclxuICAgICAgICAgICAgcC52ZXJ0ZXgoc3gsIHN5KTtcclxuICAgICAgICAgICAgc3ggPSBjZW50ZXJYICsgcC5jb3MoYSArIGhhbGZBbmdsZSkgKiByYWRpdXMxO1xyXG4gICAgICAgICAgICBzeSA9IGNlbnRlclkgKyBwLnNpbihhICsgaGFsZkFuZ2xlKSAqIHJhZGl1czE7XHJcbiAgICAgICAgICAgIHAudmVydGV4KHN4LCBzeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAuZW5kU2hhcGUocC5DTE9TRSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50fSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtQYXJ0aWNsZVN5c3RlbX0gZnJvbSBcIi4vcGFydGljbGVfc3lzdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcyB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1Db2xvcmVkQWNjdXJhY3lSYW5rczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGljbGVzTGlmZXRpbWVJblNlY29uZHM6IG51bWJlciA9IDEuNTtcclxuICAgIHByaXZhdGUgcGFydGljbGVTZXR0aW5nczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHByaXZhdGUgcGFydGljbGVTeXN0ZW1zOiBQYXJ0aWNsZVN5c3RlbVtdO1xyXG4gICAgcHJpdmF0ZSBncmF2aXR5RGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA9IHRoaXMuZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3ModGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMucGFydGljbGVTZXR0aW5ncyA9IFtcclxuICAgICAgICAgICAgWzE3OCwgOTQsIDI0NywgMzBdLFxyXG4gICAgICAgICAgICBbMzAsIDIxNywgMTI0LCAyNV0sXHJcbiAgICAgICAgICAgIFsxOTYsIDE5OSwgMzAsIDIwXSxcclxuICAgICAgICAgICAgWzI0NSwgMjEzLCAyMjEsIDE1XVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgd2hpbGUgKHRoaXMubnVtQ29sb3JlZEFjY3VyYWN5UmFua3MgPiB0aGlzLnBhcnRpY2xlU2V0dGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTZXR0aW5ncy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgW3RoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIDIwXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5RGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLkRvd24gPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IGdyYXZpdHk6IHA1LlZlY3RvciA9IHAuY3JlYXRlVmVjdG9yKDAsIDIwMDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zLnB1c2gobmV3IFBhcnRpY2xlU3lzdGVtKEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMucGFydGljbGVzTGlmZXRpbWVJblNlY29uZHMsIGdyYXZpdHkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW3RyYWNrTnVtYmVyXS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBhcnRpY2xlc0ZvckFjY3VyYWN5RXZlbnQoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRXZlbnRGb3JQYXJ0aWNsZXMoYWNjdXJhY3lFdmVudCkpIHtcclxuICAgICAgICAgICAgbGV0IHJlY2VwdG9yVGltZVBvc2l0aW9uID0gYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzIC0gYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAvIDEwMDA7XHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsUG9zaXRpb24gPSB0aGlzLmdldEluaXRpYWxQb3NpdGlvbihwLCBhY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyxcclxuICAgICAgICAgICAgICAgIHJlY2VwdG9yVGltZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGluaXRpYWxWZWxvY2l0eSA9IHAuY3JlYXRlVmVjdG9yKDAsIC01MDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGVTZXR0aW5nczoge2NvbG9yOiBwNS5Db2xvciwgbnVtUGFydGljbGVzOiBudW1iZXIgfSA9IHRoaXMuZ2V0UGFydGljbGVTZXR0aW5ncyhhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbYWNjdXJhY3lFdmVudC50cmFja051bWJlcl0uYWRkUmFuZG9taXplZFBhcnRpY2xlcyhpbml0aWFsUG9zaXRpb24sIGluaXRpYWxWZWxvY2l0eSxcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQudGltZUluU2Vjb25kcywgcGFydGljbGVTZXR0aW5ncy5udW1QYXJ0aWNsZXMsIHBhcnRpY2xlU2V0dGluZ3MuY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEluaXRpYWxQb3NpdGlvbihwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY2VudGVyVGltZUluU2Vjb25kcywgY2VudGVyVGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlVmVjdG9yKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNFdmVudEZvclBhcnRpY2xlcyhhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgYWNjdXJhY2llc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gSGFuZGxlIG1pc3MgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPj0gYWNjdXJhY2llc1thY2N1cmFjaWVzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXRQYXJ0aWNsZVNldHRpbmdzKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuayA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBwYXJ0aWNsZVNldHRpbmdzID0gdGhpcy5wYXJ0aWNsZVNldHRpbmdzW2FjY3VyYWN5UmFuayAtIDFdO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiB7Y29sb3I6IHAuY29sb3IocGFydGljbGVTZXR0aW5nc1swXSwgcGFydGljbGVTZXR0aW5nc1sxXSwgcGFydGljbGVTZXR0aW5nc1syXSksXHJcbiAgICAgICAgICAgIG51bVBhcnRpY2xlczogcGFydGljbGVTZXR0aW5nc1szXX07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXROdW1Db2xvcmVkQWNjdXJhY3lSYW5rcyhhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgbGV0IGJlc3RBY2N1cmFjeUluZGV4ID0gdGhpcy5nZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgbnVtUmFua3MgPSAxOyAvLyBzdGFydCB3aXRoIDEgYmVjYXVzZSB3ZSBhdCBsZWFzdCBoYXZlIHRoZSBiZXN0IHJhbmtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXggKyAxOyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgIT09IHVuZGVmaW5lZCAmJiBhY2N1cmFjeS51cHBlckJvdW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG51bVJhbmtzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bVJhbmtzXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IDAgJiYgMCA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIGEgcmFuayB3aGVyZSAxIGlzIHRoZSBiZXN0XHJcbiAgICBwcml2YXRlIGdldEFjY3VyYWN5UmFuayhhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50LCBhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCAwKSB7XHJcbiAgICAgICAgICAgIGFjY3VyYWNpZXMgPSB0aGlzLmdldFJldmVyc2VkKGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50UmFuayA9IDE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlc3RBY2N1cmFjeUluZGV4OyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgJiYgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFJhbms7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFJhbmsrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZXZlcnNlZChhcnJheTogYW55W10pIHtcclxuICAgICAgICBsZXQgYXJyYXlDb3B5OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBhcnJheUNvcHkucHVzaChhcnJheVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheUNvcHk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nLCBBY2N1cmFjeVJlY29yZGluZ0VudHJ5fSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dldEFjY3VyYWN5RXZlbnROYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja1RleHQge1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGNlbnRlclg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBsYXN0RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkgPSB0aGlzLmdldE1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KCk7XHJcbiAgICAgICAgaWYgKGxhc3RFdmVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0aW1lU2luY2VMYXN0RXZlbnQgPSBjdXJyZW50VGltZUluU2Vjb25kcyAtIGxhc3RFdmVudC50aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCB0ZXh0U2l6ZSA9IHRoaXMuZ2V0Rm9udFNpemUodGltZVNpbmNlTGFzdEV2ZW50KTtcclxuICAgICAgICBpZiAodGV4dFNpemUgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBldmVudE5hbWUgPSBnZXRBY2N1cmFjeUV2ZW50TmFtZShsYXN0RXZlbnQuYWNjdXJhY3lNaWxsaXMsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLmRyYXdFdmVudFRleHQoZXZlbnROYW1lLCB0ZXh0U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSgpOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgICAgICBsZXQgbW9zdFJlY2VudFRyYWNrOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5W10gPSBbXTtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZy5sZW5ndGg7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgICAgICBpZiAodHJhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RFdmVudFRpbWUgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl1bdHJhY2subGVuZ3RoIC0gMV0udGltZUluU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0RXZlbnRUaW1lID4gZ3JlYXRlc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlYXRlc3RUaW1lID0gbGFzdEV2ZW50VGltZTtcclxuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJhY2sgPSB0cmFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9zdFJlY2VudFRyYWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vc3RSZWNlbnRUcmFja1ttb3N0UmVjZW50VHJhY2subGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGb250U2l6ZSh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBtYXhGb250U2l6ZSA9IDMwO1xyXG4gICAgICAgIGlmICh0aW1lIDwgMC4xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lIC8gMC4xICogbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRpbWUgPj0gMC4xICYmIHRpbWUgPCAwLjQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEZvbnRTaXplO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aW1lID49IDAuNCAmJiB0aW1lIDwgMC43KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoMSAtICh0aW1lIC0gMC40KSAvICgwLjcgLSAwLjQpKSAqIG1heEZvbnRTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdFdmVudFRleHQodGV4dDogc3RyaW5nLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIsIHAuQ0VOVEVSKTtcclxuICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICBwLnRleHRTaXplKHRleHRTaXplKTtcclxuICAgICAgICBwLnRleHQodGV4dCwgdGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclkpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtLZXlTdGF0ZSwgUGxheWVyS2V5QWN0aW9ufSBmcm9tIFwiLi9wbGF5ZXJfa2V5X2FjdGlvblwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsb3dlckJvdW5kOiBudW1iZXI7XHJcbiAgICB1cHBlckJvdW5kOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sb3dlckJvdW5kID0gbG93ZXJCb3VuZDtcclxuICAgICAgICB0aGlzLnVwcGVyQm91bmQgPSB1cHBlckJvdW5kO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyO1xyXG4gICAgcHVibGljIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGNvbmZpZzogQ29uZmlnLCBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gaG9sZE1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50ID0gaGFuZGxlQWNjdXJhY3lFdmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlUGxheWVyQWN0aW9uKGFjdGlvbjogUGxheWVyS2V5QWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5rZXlTdGF0ZSA9PSBLZXlTdGF0ZS5ET1dOKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJ5VG9IaXROb3RlKGFjdGlvbi5nYW1lVGltZSwgYWN0aW9uLnRyYWNrKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5rZXlTdGF0ZSA9PT0gS2V5U3RhdGUuVVApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZE1hbmFnZXIuaXNUcmFja0hlbGQoYWN0aW9uLnRyYWNrKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci51bmhvbGRUcmFjayhhY3Rpb24udHJhY2ssIGFjdGlvbi5nYW1lVGltZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeVRvUmVsZWFzZU5vdGUoYWN0aW9uLmdhbWVUaW1lLCBhY3Rpb24udHJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJ5VG9IaXROb3RlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4ID0gdGhpcy5nZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHMsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAobm90ZUluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5vdGU6IE5vdGUgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1bbm90ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG5vdGUudHlwZSA9PT0gTm90ZVR5cGUuTk9STUFMKSB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhJVDtcclxuICAgICAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IChub3RlLnRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcykgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogbm90ZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSEVMRDsgLy8gc2V0IHRoZSBub3RlIHRvIGhlbGQgc28gaXQgd29uJ3QgY291bnQgYXMgYSBtaXNzXHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IG5vdGUudHlwZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci5ob2xkVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0NvbmZpZ3VyZWRGb3JCb29zKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogZ2V0QWNjdXJhY3lFdmVudE5hbWUoSW5maW5pdHksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBJbmZpbml0eSxcclxuICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgbm90ZVR5cGU6IE5vdGVUeXBlLk5PTkUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0gPSB0aGlzLmdldEFjY3VyYWN5UmFuZ2VJblNlY29uZHMoKTtcclxuICAgICAgICBsZXQgaGl0dGFibGVUaW1lUmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0gPVxyXG4gICAgICAgICAgICB0aGlzLmdldEhpdHRhYmxlUmFuZ2UoYWNjdXJhY3lSYW5nZSwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBoaXR0YWJsZUluZGV4UmFuZ2U6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0gPVxyXG4gICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLmdldE5vdGVzQnlUaW1lUmFuZ2UoaGl0dGFibGVUaW1lUmFuZ2UubGVhc3RUaW1lLCBoaXR0YWJsZVRpbWVSYW5nZS5ncmVhdGVzdFRpbWUsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFYXJsaWVzdFVuaGl0Tm90ZUluZGV4SW5SYW5nZSh0cmFja051bWJlciwgaGl0dGFibGVJbmRleFJhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY2N1cmFjeVJhbmdlSW5TZWNvbmRzKCkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVNldHRpbmdzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBsZXQgbnVtU2V0dGluZ3MgPSBhY2N1cmFjeVNldHRpbmdzLmxlbmd0aDtcclxuICAgICAgICBsZXQgbGVhc3RUaW1lID0gYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kID09IG51bGwgP1xyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzWzFdLmxvd2VyQm91bmQgOiBhY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQ7XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZTtcclxuICAgICAgICBpZiAoYWNjdXJhY3lTZXR0aW5nc1tudW1TZXR0aW5ncyAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMl0udXBwZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMV0udXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtsZWFzdFRpbWU6IGxlYXN0VGltZSAvIDEwMDAsIGdyZWF0ZXN0VGltZTogZ3JlYXRlc3RUaW1lIC8gMTAwMH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGl0dGFibGVSYW5nZShhY2N1cmFjeVJhbmdlOiB7IGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciB9LCByZWNlcHRvclRpbWVQb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVhc3RUaW1lOiByZWNlcHRvclRpbWVQb3NpdGlvbiArIGFjY3VyYWN5UmFuZ2UubGVhc3RUaW1lLFxyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWU6IHJlY2VwdG9yVGltZVBvc2l0aW9uICsgYWNjdXJhY3lSYW5nZS5ncmVhdGVzdFRpbWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWFybGllc3RVbmhpdE5vdGVJbmRleEluUmFuZ2UodHJhY2tOdW1iZXI6IG51bWJlciwgbm90ZUluZGV4UmFuZ2U6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gbm90ZUluZGV4UmFuZ2Uuc3RhcnRJbmRleDsgaSA8IG5vdGVJbmRleFJhbmdlLmVuZEluZGV4Tm90SW5jbHVzaXZlOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtpXS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb25maWd1cmVkRm9yQm9vcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0cnlUb1JlbGVhc2VOb3RlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4ID0gdGhpcy5nZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHMsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAobm90ZUluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1bbm90ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG5vdGUudHlwZSA9PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG9sZCA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXggLSAxXTsgLy8gZ2V0IHRoZSBob2xkIGJlbG9uZ2luZyB0byB0aGlzIHRhaWxcclxuICAgICAgICAgICAgICAgIGhvbGQuc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBjaGFuZ2UgdGhlIGhvbGQgc3RhdGUgZnJvbSBIRUxEIHRvIEhJVFxyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgdGFpbCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogXCJSZWxlYXNlIFwiICsgZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBub3RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IC8vIGxldCBnbyB0b28gZWFybHlcclxuICAgICAgICAgICAgLy8gQ291bGQgdGhpcyByZXR1cm4gLTE/XHJcbiAgICAgICAgICAgIGxldCBob2xkU3RhcnRJbmRleCA9IHRoaXMubm90ZU1hbmFnZXIuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoY3VycmVudFRpbWVJblNlY29uZHMsIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgICAgIGxldCBob2xkID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4IC0gMV07XHJcbiAgICAgICAgICAgIGxldCB0YWlsID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4XTtcclxuICAgICAgICAgICAgaWYgKGhvbGQudHlwZSA9PSBOb3RlVHlwZS5IT0xEX0hFQUQgJiYgdGFpbC50eXBlID09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtob2xkU3RhcnRJbmRleCAtIDFdLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSBzdGFydCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4XS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgdGFpbCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IFwiUmVsZWFzZSBcIiArIGdldEFjY3VyYWN5RXZlbnROYW1lKEluZmluaXR5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBJbmZpbml0eSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogTm90ZVR5cGUuTk9ORSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogSXQncyBwb3NzaWJsZSB0aGF0IHRoaXMgaXMgc29tZXRoaW5nIGxpa2UgYSByYWNlIGNvbmRpdGlvbiBiZXR3ZWVuIHRoZSBrZXkgZXZlbnQgYW5kIHRoZSBhbmltYXRpb24gbG9vcC4gRG9uJ3QgdGhyb3cgYW4gZXJyb3IgZm9yIG5vd1xyXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgXCJFcnJvcjogUmVsZWFzZSBtaXNzIGZhaWxlZCB0byB0cmlnZ2VyIG9uIG5vdGUgaW5kZXggXCIgKyAoaG9sZFN0YXJ0SW5kZXggLSAxKSArIFwiLCB0cmFjayBpbmRleCBcIiArIHRyYWNrTnVtYmVyICsgXCIgYXQgdGltZSBcIiArIGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZSB7XHJcbiAgICBJTkNPTVBMRVRFLFxyXG4gICAgUkVBRFksXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWNjdXJhY3lFdmVudCB7XHJcbiAgICBhY2N1cmFjeU5hbWU6IHN0cmluZyxcclxuICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICBhY2N1cmFjeU1pbGxpczogbnVtYmVyLFxyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSB7XHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICBhY2N1cmFjeU1pbGxpczogbnVtYmVyLFxyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeVJlY29yZGluZyB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGU7XHJcbiAgICBwdWJsaWMgcmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5W11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlLklOQ09NUExFVEU7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmcgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkaW5nLnB1c2goW10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb3JkQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmdbYWNjdXJhY3lFdmVudC50cmFja051bWJlcl0ucHVzaChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMsXHJcbiAgICAgICAgICAgICAgICBub3RlVHlwZTogYWNjdXJhY3lFdmVudC5ub3RlVHlwZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXVkaW9GaWxlU3RhdGUge1xyXG4gICAgTk9fQVVESU9fRklMRSxcclxuICAgIERPTkVfUkVBRElORyxcclxuICAgIEJVRkZFUkVELFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBdWRpb0ZpbGUge1xyXG4gICAgcHVibGljIHN0YXRlOiBBdWRpb0ZpbGVTdGF0ZTtcclxuICAgIHB1YmxpYyBmaWxlOiBGaWxlO1xyXG4gICAgcHVibGljIGJsb2I6IEJsb2JcclxuICAgIHB1YmxpYyBhdWRpb1NvdXJjZTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xyXG4gICAgcHVibGljIGF1ZGlvQ29udGV4dDogQXVkaW9Db250ZXh0O1xyXG4gICAgcHVibGljIGF1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcjtcclxuICAgIHByaXZhdGUgcGxheVN0YXJ0VGltZTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEZpbGUoZmlsZTogcDUuRmlsZSkge1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGUuZmlsZTsgLy8gdGhpcyB1bndyYXBzIHRoZSBwNS5GaWxlIHdyYXBwZXIgdG8gZ2V0IHRoZSBvcmlnaW5hbCBET00gZmlsZVxyXG4gICAgICAgIHRoaXMubG9hZEF1ZGlvRGF0YSh0aGlzLmZpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkQmxvYihibG9iOiBCbG9iKSB7XHJcbiAgICAgICAgdGhpcy5ibG9iID0gYmxvYjtcclxuICAgICAgICB0aGlzLmxvYWRBdWRpb0RhdGEodGhpcy5ibG9iKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRBdWRpb0RhdGEoYXVkaW9EYXRhOiBGaWxlIHwgQmxvYikge1xyXG4gICAgICAgIHRoaXMubG9hZFNvdW5kRmlsZShhdWRpb0RhdGEsICgob25GaWxlUmVhZDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5kZWNvZGVBdWRpb0RhdGEoPEFycmF5QnVmZmVyPm9uRmlsZVJlYWQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlQXVkaW9EYXRhKGF1ZGlvRGF0YTogQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYXVkaW9EYXRhKS50aGVuKCgoYnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0J1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2l0aCBkZWNvZGluZyBhdWRpbyBkYXRhXCIgKyBlLmVycik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREdXJhdGlvbigpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIuZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXkoZGVsYXlJblNlY29uZHM6IG51bWJlciA9IDApIHtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcclxuICAgICAgICB0aGlzLnBsYXlTdGFydFRpbWUgPSBjdXJyZW50VGltZTtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KGN1cnJlbnRUaW1lICsgZGVsYXlJblNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVTb3VyY2VOb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbnRUaW1lSW5TZWNvbmRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gdGhpcy5wbGF5U3RhcnRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjcmVhdGVTb3VyY2VOb2RlKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmJ1ZmZlciA9IHRoaXMuYXVkaW9CdWZmZXI7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU291bmRGaWxlKFxyXG4gICAgICAgIGZpbGU6IEJsb2IgfCBGaWxlLFxyXG4gICAgICAgIGxpc3RlbmVyOiAoZXZlbnQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IGFueSxcclxuICAgICAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcclxuICAgICAgICBmaWxlUmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge2RlZmF1bHRJZlVuZGVmaW5lZH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge0RFRkFVTFRfQ09ORklHfSBmcm9tIFwiLi9kZWZhdWx0X2NvbmZpZ1wiO1xyXG5pbXBvcnQge0tleUJpbmRpbmd9IGZyb20gXCIuL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5cclxuLyogU3RvcmVzIHVzZXIgc2V0dGluZ3MuIEV4cGVjdGVkIG5vdCB0byBjaGFuZ2UgZHVyaW5nIHBsYXkgKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcbiAgICBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuICAgIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuICAgIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXTtcclxuICAgIHBhdXNlQXRTdGFydEluU2Vjb25kczogbnVtYmVyO1xyXG4gICAga2V5QmluZGluZ3M6IE1hcDxudW1iZXIsIEtleUJpbmRpbmdbXT47XHJcbiAgICBnYW1lQXJlYUhlaWdodDogbnVtYmVyO1xyXG4gICAgZ2FtZUFyZWFXaWR0aDogbnVtYmVyO1xyXG4gICAgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHF1aXRLZXk6IG51bWJlcjtcclxuICAgIGlzQWNjdXJhY3lGbGFzaEVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzQWNjdXJhY3lUZXh0RW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzSG9sZFBhcnRpY2xlc0VuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpc0hvbGRHbG93RW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxzUGVyU2Vjb25kPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VwdG9yWVBlcmNlbnQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uPzogU2Nyb2xsRGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lTZXR0aW5ncz86IEFjY3VyYWN5W10sXHJcbiAgICAgICAgICAgICAgICAgICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleUJpbmRpbmdzPzogTWFwPG51bWJlciwgS2V5QmluZGluZ1tdPixcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYUhlaWdodD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYVdpZHRoPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTaXplPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1aXRLZXk/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeUZsYXNoRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWNjdXJhY3lUZXh0RW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNIb2xkUGFydGljbGVzRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNIb2xkR2xvd0VuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQXJlYUhlaWdodCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmdhbWVBcmVhSGVpZ2h0LCBERUZBVUxUX0NPTkZJRy5nYW1lQXJlYUhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5nYW1lQXJlYVdpZHRoID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuZ2FtZUFyZWFXaWR0aCwgREVGQVVMVF9DT05GSUcuZ2FtZUFyZWFXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5waXhlbHNQZXJTZWNvbmQsIERFRkFVTFRfQ09ORklHLnBpeGVsc1BlclNlY29uZCk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5zY3JvbGxEaXJlY3Rpb24sIERFRkFVTFRfQ09ORklHLnNjcm9sbERpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIC8vIE5PVEU6IFNjcm9sbCBkaXJlY3Rpb24gYW5kIGdhbWVBcmVhSGVpZ2h0IG11c3QgYmUgc2V0IEJFRk9SRSBzZXR0aW5nIHJlY2VwdG9yWVBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5yZWNlcHRvcllQZXJjZW50ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucmVjZXB0b3JZUGVyY2VudCwgREVGQVVMVF9DT05GSUcucmVjZXB0b3JZUGVyY2VudCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMsIERFRkFVTFRfQ09ORklHLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lTZXR0aW5ncyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmFjY3VyYWN5U2V0dGluZ3MsIERFRkFVTFRfQ09ORklHLmFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMucGF1c2VBdFN0YXJ0SW5TZWNvbmRzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucGF1c2VBdFN0YXJ0SW5TZWNvbmRzLCBERUZBVUxUX0NPTkZJRy5wYXVzZUF0U3RhcnRJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5ub3RlU2l6ZSwgREVGQVVMVF9DT05GSUcubm90ZVNpemUpO1xyXG4gICAgICAgIHRoaXMua2V5QmluZGluZ3MgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5rZXlCaW5kaW5ncywgREVGQVVMVF9DT05GSUcua2V5QmluZGluZ3MpO1xyXG4gICAgICAgIHRoaXMucXVpdEtleSA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnF1aXRLZXksIERFRkFVTFRfQ09ORklHLnF1aXRLZXkpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeVRleHRFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNBY2N1cmFjeVRleHRFbmFibGVkLFxyXG4gICAgICAgICAgICBERUZBVUxUX0NPTkZJRy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNIb2xkUGFydGljbGVzRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNIb2xkR2xvd0VuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0hvbGRHbG93RW5hYmxlZCwgREVGQVVMVF9DT05GSUcuaXNIb2xkR2xvd0VuYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZlKCkge1xyXG4gICAgICAgIGxldCBjb25maWdTdHJpbmcgPSB0aGlzLmdldENvbmZpZ0FzU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IGV4cGlyZXMgPSB0aGlzLmdldERhdGVPZk9uZVllYXJGcm9tTm93KCk7XHJcbiAgICAgICAgbGV0IHBhdGggPSAnLyc7XHJcbiAgICAgICAgbGV0IGNvb2tpZVN0cmluZyA9IFwiY29uZmlnPVwiICsgZXNjYXBlKGNvbmZpZ1N0cmluZylcclxuICAgICAgICAgICAgKyAnO3BhdGg9JyArIHBhdGhcclxuICAgICAgICAgICAgKyAnO2V4cGlyZXM9JyArIGV4cGlyZXMudG9VVENTdHJpbmcoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb29raWVTdHJpbmcpO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZVN0cmluZztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZyBzYXZlZCB0byBjb29raWUhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29uZmlnQXNTdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZzogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoJyxcImtleUJpbmRpbmdzXCI6e30sJyxcclxuICAgICAgICAgICAgJyxcImtleUJpbmRpbmdzXCI6JyArIHRoaXMuc3RyaW5naWZ5S2V5QmluZGluZ3MoKSArICcsJyk7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWQoKTogQ29uZmlnIHtcclxuICAgICAgICBsZXQgY29uZmlnQ29va2llID0gQ29uZmlnLmdldEZyb21Db29raWUoXCJjb25maWdcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29uZmlnQ29va2llKTtcclxuICAgICAgICBpZiAoY29uZmlnQ29va2llICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnSlNPTiA9IEpTT04ucGFyc2UodW5lc2NhcGUoY29uZmlnQ29va2llKSk7XHJcbiAgICAgICAgICAgICAgICBjb25maWdKU09OLmtleUJpbmRpbmdzID0gbmV3IE1hcChjb25maWdKU09OLmtleUJpbmRpbmdzKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWc6IENvbmZpZyA9IG5ldyBDb25maWcoY29uZmlnSlNPTik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZyBsb2FkZWQgZnJvbSBjb29raWUhXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge31cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyB2YWxpZCBjb29raWUgZm91bmQsIHJldHVybmluZyBkZWZhdWx0IGNvbmZpZyFcIik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb25maWcoe30pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGF0ZU9mT25lWWVhckZyb21Ob3coKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdHJpbmdpZnlLZXlCaW5kaW5ncygpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHJpbmcgPSBcIltcIjtcclxuICAgICAgICB0aGlzLmtleUJpbmRpbmdzLmZvckVhY2goKHZhbHVlOiBLZXlCaW5kaW5nW10sIGtleTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHN0cmluZyArPSBcIltcIisga2V5ICsgXCIsXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgK1wiXVwiO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3RyaW5nICs9IFwiXVwiO1xyXG4gICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RnJvbUNvb2tpZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiOyBcIilcclxuICAgICAgICAgICAgICAgIC5maW5kKHJvdyA9PiByb3cuc3RhcnRzV2l0aChrZXkpKVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiPVwiKVsxXTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBsZXQgREVGQVVMVF9DT05GSUcgPSB7XHJcbiAgICBwaXhlbHNQZXJTZWNvbmQ6IDU1MCxcclxuICAgIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uLkRvd24sXHJcbiAgICByZWNlcHRvcllQZXJjZW50OiAxNSxcclxuICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM6IDAsXHJcbiAgICAvLyBUaGlzIGlzIGEgc3ltbWV0cmljYWwgdmVyc2lvbiBvZiBGRlIncyBhY2N1cmFjeVxyXG4gICAgYWNjdXJhY3lTZXR0aW5nczogW1xyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIk1pc3NcIiwgbnVsbCwtMTE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBdmVyYWdlXCIsIC0xMTcsIC04MyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiR29vZFwiLCAtODMsIC01MCksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiUGVyZmVjdFwiLCAtNTAsIC0xNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQW1hemluZ1wiLCAtMTcsIDE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJQZXJmZWN0XCIsIDE3LCA1MCksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiR29vZFwiLCA1MCwgODMpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkF2ZXJhZ2VcIiwgODMsIDExNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQm9vXCIsIDExNywgbnVsbClcclxuICAgIF0sXHJcbiAgICBwYXVzZUF0U3RhcnRJblNlY29uZHM6IDAsXHJcbiAgICBrZXlCaW5kaW5nczogbmV3IE1hcCgpLFxyXG4gICAgZ2FtZUFyZWFIZWlnaHQ6IDYwMCxcclxuICAgIGdhbWVBcmVhV2lkdGg6IDQwMCxcclxuICAgIG5vdGVTaXplOiAzMCxcclxuICAgIHF1aXRLZXk6IDI3LCAvLyBRdWl0IGRlZmF1bHRzIHRvIGVzY2FwZSBrZXlcclxuICAgIGlzQWNjdXJhY3lGbGFzaEVuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZDogdHJ1ZSxcclxuICAgIGlzQWNjdXJhY3lUZXh0RW5hYmxlZDogdHJ1ZSxcclxuICAgIGlzSG9sZFBhcnRpY2xlc0VuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0hvbGRHbG93RW5hYmxlZDogdHJ1ZSxcclxufTsiLCJpbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEZWZhdWx0Tm90ZVNraW4ge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3Tm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBub3RlU2l6ZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICBzd2l0Y2ggKG5vdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLkhPTERfSEVBRDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwidlwiLCBjZW50ZXJYLCBjZW50ZXJZICsgNik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5ST0xMX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcInhcIiwgY2VudGVyWCwgY2VudGVyWSArIDYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTUlORTpcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC5jaXJjbGUoY2VudGVyWCwgY2VudGVyWSwgMjQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcIlhcIiwgY2VudGVyWCwgY2VudGVyWSArIDgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBwLm5vRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCI/XCIsIGNlbnRlclgsIGNlbnRlclkgKyA3KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd1JlY2VwdG9yKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBub3RlU2l6ZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLm5vRmlsbCgpO1xyXG4gICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdIb2xkQ29ubmVjdG9yKGNlbnRlclg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGVuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gbm90ZVNpemUgKiAwLjU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIHN0YXJ0WSwgd2lkdGgsIGVuZFkgLSBzdGFydFkpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtEZWZhdWx0Tm90ZVNraW59IGZyb20gXCIuL2RlZmF1bHRfbm90ZV9za2luXCI7XHJcblxyXG5jbGFzcyBOb3RlRGlzcGxheSB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGU7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIHByaXZhdGUgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdHJhY2tOdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSwgc2tldGNoSW5zdGFuY2U6IHA1LCBub3RlU2l6ZTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSBjZW50ZXJZO1xyXG4gICAgICAgIHRoaXMubm90ZVR5cGUgPSBub3RlVHlwZTtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gbm90ZVNpemU7XHJcbiAgICAgICAgdGhpcy50cmFja051bWJlciA9IHRyYWNrTnVtYmVyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzTm90ZURyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdOb3RlKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsXHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlVHlwZSwgdGhpcy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgaWYgKCFpc05vdGVEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd05vdGUodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCwgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVUeXBlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBIb2xkQ29ubmVjdG9yIHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIHN0YXJ0WTogbnVtYmVyO1xyXG4gICAgZW5kWTogbnVtYmVyO1xyXG4gICAgbm90ZVN0YXJ0WTogbnVtYmVyO1xyXG4gICAgbm90ZUVuZFk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGVuZFk6IG51bWJlciwgbm90ZVN0YXJ0WTogbnVtYmVyLCBub3RlRW5kWTogbnVtYmVyLCBza2V0Y2hJbnN0YW5jZTogcDUpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLnN0YXJ0WSA9IHN0YXJ0WTtcclxuICAgICAgICB0aGlzLmVuZFkgPSBlbmRZO1xyXG4gICAgICAgIHRoaXMubm90ZVN0YXJ0WSA9IG5vdGVTdGFydFk7XHJcbiAgICAgICAgdGhpcy5ub3RlRW5kWSA9IG5vdGVFbmRZO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzQ29ubmVjdG9yRHJhd1N1Y2Nlc3NmdWwgPSBnbG9iYWwubm90ZVNraW4uZHJhd0hvbGRDb25uZWN0b3IodGhpcy5jZW50ZXJYLCB0aGlzLnN0YXJ0WSwgdGhpcy5lbmRZLFxyXG4gICAgICAgICAgICB0aGlzLm5vdGVTdGFydFksIHRoaXMubm90ZUVuZFkpO1xyXG4gICAgICAgIGlmICghaXNDb25uZWN0b3JEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd0hvbGRDb25uZWN0b3IodGhpcy5jZW50ZXJYLCB0aGlzLnN0YXJ0WSwgdGhpcy5lbmRZKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlY2VwdG9yIHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIGNlbnRlclk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG4gICAgcHJpdmF0ZSBub3RlU2l6ZTogbnVtYmVyXHJcbiAgICBwcml2YXRlIHRyYWNrTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBza2V0Y2hJbnN0YW5jZTogcDUsIG5vdGVTaXplOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IG5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMudHJhY2tOdW1iZXIgPSB0cmFja051bWJlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc1JlY2VwdG9yRHJhd1N1Y2Nlc3NmdWwgPSBnbG9iYWwubm90ZVNraW4uZHJhd1JlY2VwdG9yKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsXHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgaWYgKCFpc1JlY2VwdG9yRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdSZWNlcHRvcih0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclksIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gZXhwb3J0IGNsYXNzIERpc3BsYXlDb25maWcge1xyXG4vLyAgICAgcHVibGljIG5vdGVTaXplOiBudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgcGl4ZWxzUGVyU2Vjb25kOiBudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgcmVjZXB0b3JZUGVyY2VudDogbnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uO1xyXG4vLyAgICAgcHVibGljIHJlY2VwdG9yU2l6ZXM6IG51bWJlcltdO1xyXG4vL1xyXG4vLyAgICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbi8vICAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGNvbmZpZy5ub3RlU2l6ZTtcclxuLy8gICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbi8vICAgICAgICAgdGhpcy5yZWNlcHRvcllQZXJjZW50ID0gY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbi8vICAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uO1xyXG4vLyAgICAgICAgIHRoaXMucmVjZXB0b3JTaXplcyA9IFtdO1xyXG4vLyAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzLnB1c2goY29uZmlnLm5vdGVTaXplKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbi8qIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBpbnRlcnNlY3Qgd2l0aCB0aGUgdXNlciBDb25maWcsIGJ1dCBhcmUgZXhwZWN0ZWQgdG8gYmUgY2hhbmdlZCBkdXJpbmcgcGxheSAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIERpc3BsYXlDb25maWcge1xyXG4gICAgZ2V0Tm90ZVNpemU6ICgpID0+IG51bWJlcjtcclxuICAgIGdldFBpeGVsc1BlclNlY29uZDogKCkgPT4gbnVtYmVyO1xyXG4gICAgZ2V0UmVjZXB0b3JZUGVyY2VudDogKCkgPT4gbnVtYmVyO1xyXG4gICAgZ2V0U2Nyb2xsRGlyZWN0aW9uOiAoKSA9PiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBnZXRSZWNlcHRvclNpemVzOiAoKSA9PiBudW1iZXJbXTtcclxuICAgIHNldFJlY2VwdG9yU2l6ZTogKHRyYWNrTnVtYmVyOiBudW1iZXIsIHJlY2VwdG9yU2l6ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzcGxheU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIHByaXZhdGUgdG9wTGVmdFg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdG9wTGVmdFk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnLCBza2V0Y2hJbnN0YW5jZTogcDUsIHRvcExlZnRYOiBudW1iZXIgPSAwLFxyXG4gICAgICAgICAgICAgICAgdG9wTGVmdFk6IG51bWJlciA9IDAsIHdpZHRoOiBudW1iZXIgPSAxODAsIGhlaWdodDogbnVtYmVyID0gNDAwKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnID0gZGlzcGxheUNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyA9IDA7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMudG9wTGVmdFggPSB0b3BMZWZ0WDtcclxuICAgICAgICB0aGlzLnRvcExlZnRZID0gdG9wTGVmdFk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IHRoaXMuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UucmVjdCh0aGlzLnRvcExlZnRYLCB0aGlzLnRvcExlZnRZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Tm90ZXNBbmRDb25uZWN0b3JzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmVjZXB0b3JzKCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3Rlc0FuZENvbm5lY3RvcnMoKSB7XHJcbiAgICAgICAgbGV0IGxlYXN0VGltZSA9IHRoaXMuZ2V0TGVhc3RUaW1lKHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBncmVhdGVzdFRpbWUgPSB0aGlzLmdldEdyZWF0ZXN0VGltZSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRyYXdBbGxDb25uZWN0b3JzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lKTtcclxuICAgICAgICB0aGlzLmRyYXdBbGxOb3RlcyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsTm90ZXMobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd05vdGVzSW5UcmFjayhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgaSwgbnVtVHJhY2tzLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZXNJblRyYWNrKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXhSYW5nZSA9IHRoaXMubm90ZU1hbmFnZXIuZ2V0Tm90ZXNCeVRpbWVSYW5nZShsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBub3RlcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXS5zbGljZShub3RlSW5kZXhSYW5nZS5zdGFydEluZGV4LCBub3RlSW5kZXhSYW5nZS5lbmRJbmRleE5vdEluY2x1c2l2ZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdOb3RlKG5vdGVzW2ldLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGUobm90ZTogTm90ZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAobm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgIGxldCB5ID0gdGhpcy5nZXROb3RlQ2VudGVyWShub3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgbmV3IE5vdGVEaXNwbGF5KHgsIHksIG5vdGUudHlwZSwgdGhpcy5za2V0Y2hJbnN0YW5jZSwgdGhpcy5kaXNwbGF5Q29uZmlnLmdldE5vdGVTaXplKCksIHRyYWNrTnVtYmVyLCBudW1UcmFja3MpLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZWFzdFRpbWUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0b3RhbERpc3BsYXlTZWNvbmRzID0gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLyB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UGl4ZWxzUGVyU2Vjb25kKCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lIC0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yWVBlcmNlbnQoKSAvIDEwMCAqIHRvdGFsRGlzcGxheVNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRHcmVhdGVzdFRpbWUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0b3RhbERpc3BsYXlTZWNvbmRzID0gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLyB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UGl4ZWxzUGVyU2Vjb25kKCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lICsgKDEgLSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JZUGVyY2VudCgpIC8gMTAwKSAqIHRvdGFsRGlzcGxheVNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJlY2VwdG9yU3BhY2luZyA9IHRoaXMuZ2V0RGlzcGxheVdpZHRoKCkgLyBudW1UcmFja3MgLSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0Tm90ZVNpemUoKTtcclxuICAgICAgICByZXR1cm4gKDIgKiB0cmFja051bWJlciArIDEpIC8gMiAqICh0aGlzLmRpc3BsYXlDb25maWcuZ2V0Tm90ZVNpemUoKSArIHJlY2VwdG9yU3BhY2luZykgKyB0aGlzLnRvcExlZnRYO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZXNzZW50aWFsbHkgZGVmaW5lcyBhIGNvbnZlcnNpb24gZnJvbSBzZWNvbmRzIHRvIHBpeGVsc1xyXG4gICAgcHVibGljIGdldE5vdGVDZW50ZXJZKG5vdGVUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZVlPZmZzZXQgPSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UGl4ZWxzUGVyU2Vjb25kKCkgKiAobm90ZVRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IHJlY2VwdG9yWU9mZnNldCA9IHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvcllQZXJjZW50KCkgLyAxMDAgKiB0aGlzLmdldERpc3BsYXlIZWlnaHQoKTtcclxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5Q29uZmlnLmdldFNjcm9sbERpcmVjdGlvbigpID09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjZXB0b3JZT2Zmc2V0ICsgbm90ZVlPZmZzZXQgKyB0aGlzLnRvcExlZnRZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERpc3BsYXlIZWlnaHQoKSAtIChyZWNlcHRvcllPZmZzZXQgKyBub3RlWU9mZnNldCkgKyB0aGlzLnRvcExlZnRZO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheUhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBbGxDb25uZWN0b3JzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0cmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdBbGxUcmFja0Nvbm5lY3RvcnMobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUsIHRyYWNrc1tpXSwgaSxcclxuICAgICAgICAgICAgICAgIHRyYWNrcy5sZW5ndGgsIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBbGxUcmFja0Nvbm5lY3RvcnMobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyLCB0cmFjazogTm90ZVtdLCB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVTdGFjazogTm90ZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudE5vdGU6IE5vdGUgPSB0cmFja1tpXTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnRpbWVJblNlY29uZHMgPCBsZWFzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQgfHwgY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuUk9MTF9IRUFEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVN0YWNrLnB1c2goY3VycmVudE5vdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnRpbWVJblNlY29uZHMgPCBncmVhdGVzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQgfHwgY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuUk9MTF9IRUFEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVN0YWNrLnB1c2goY3VycmVudE5vdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0Tm90ZSA9IG5vdGVTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kTm90ZSA9IGN1cnJlbnROb3RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydE5vdGUgIT0gdW5kZWZpbmVkICYmIGVuZE5vdGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUIHx8IHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuSEVMRCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0Nvbm5lY3RvcihzdGFydE5vdGUsIGVuZE5vdGUsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChub3RlU3RhY2subGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQgfHwgY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuUk9MTF9IRUFEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVN0YWNrLnB1c2goY3VycmVudE5vdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0Tm90ZSA9IG5vdGVTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kTm90ZSA9IGN1cnJlbnROb3RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydE5vdGUgIT0gdW5kZWZpbmVkICYmIGVuZE5vdGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUIHx8IHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuSEVMRCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0Nvbm5lY3RvcihzdGFydE5vdGUsIGVuZE5vdGUsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdDb25uZWN0b3Ioc3RhcnROb3RlOiBOb3RlLCBlbmROb3RlOiBOb3RlLCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBsZXQgbm90ZVN0YXJ0WSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkoc3RhcnROb3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICBsZXQgbm90ZUVuZFkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKGVuZE5vdGUudGltZUluU2Vjb25kcywgY3VycmVudFRpbWUpO1xyXG5cclxuICAgICAgICBsZXQgZHJhd1N0YXJ0WTtcclxuICAgICAgICBpZiAoc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5IRUxEKSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFydFkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKE1hdGgubWluKGN1cnJlbnRUaW1lLCBlbmROb3RlLnRpbWVJblNlY29uZHMpLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZHJhd1N0YXJ0WSA9IG5vdGVTdGFydFk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyYXdTdGFydFkgPSB0aGlzLmNsYW1wVmFsdWVUb1JhbmdlKGRyYXdTdGFydFksIHRoaXMudG9wTGVmdFksIHRoaXMudG9wTGVmdFkgKyB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCBkcmF3RW5kWSA9IG5vdGVFbmRZXHJcbiAgICAgICAgZHJhd0VuZFkgPSB0aGlzLmNsYW1wVmFsdWVUb1JhbmdlKGRyYXdFbmRZLCB0aGlzLnRvcExlZnRZLCB0aGlzLnRvcExlZnRZICsgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBuZXcgSG9sZENvbm5lY3RvcihjZW50ZXJYLCBkcmF3U3RhcnRZLCBkcmF3RW5kWSwgbm90ZVN0YXJ0WSwgbm90ZUVuZFksIHRoaXMuc2tldGNoSW5zdGFuY2UpLmRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsYW1wVmFsdWVUb1JhbmdlKHZhbHVlOiBudW1iZXIsIGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodmFsdWUgPCBsb3dlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb3dlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgPiB1cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UmVjZXB0b3JzKCkge1xyXG4gICAgICAgIGxldCBudW1UcmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBuZXcgUmVjZXB0b3IodGhpcy5nZXROb3RlQ2VudGVyWChpLCBudW1UcmFja3MpLCB0aGlzLmdldE5vdGVDZW50ZXJZKHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMsIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSwgdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yU2l6ZXMoKVtpXSwgaSwgbnVtVHJhY2tzKS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuLy8gTGV0cyB1cyBjb2RlIHRoZSBET00gVUkgZWxlbWVudHMgYXMgaWYgaXQgd2VyZSBcImltbWVkaWF0ZVwiLCBpLmUuIHN0YXRlbGVzcy5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERPTVdyYXBwZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVnaXN0cnk6IE1hcDxzdHJpbmcsIHA1LkVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIC8vIHVuaXF1ZUlEIHNob3VsZCBiZSB1bmlxdWUgd2l0aGluIGEgc2NlbmVcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGNyZWF0ZUNhbGw6ICgpID0+IHA1LkVsZW1lbnQsIHVuaXF1ZUlkOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0cnkuaGFzKHVuaXF1ZUlkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5yZWdpc3RyeS5nZXQodW5pcXVlSWQpLFxyXG4gICAgICAgICAgICAgICAgYWxyZWFkeUV4aXN0czogdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlQ2FsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJ5LnNldCh1bmlxdWVJZCwgZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgYWxyZWFkeUV4aXN0czogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGVhclJlZ2lzdHJ5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVnaXN0cnkuZm9yRWFjaCgodmFsdWUsIGtleSwgbWFwKSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVnaXN0cnkuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgcmVtb3ZlIHdhcyBzdWNjZXNzZnVsLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlRWxlbWVudEJ5SWQoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJ5LmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5nZXQoaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJ5LmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0aGUgZWxlbWVudCBpZiBmb3VuZCwgb3RoZXJ3aXNlIHJldHVybnMgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRFbGVtZW50QnlJZChpZDogc3RyaW5nKTogcDUuRWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0cnkuZ2V0KGlkKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtnZXRBY2N1cmFjeUV2ZW50TmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdBY2N1cmFjeUJhcnMocDogcDUsIGFjY3VyYWN5TGFiZWxzOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgdGV4dFNpemU6IG51bWJlciwgYmFyV2lkdGg6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFySGVpZ2h0OiBudW1iZXIsIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQm9vRm9yTGFzdEFjY3VyYWN5OiBib29sZWFuKSB7XHJcbiAgICBsZXQgbWF4VGV4dFdpZHRoID0gZ2V0TWF4VGV4dFdpZHRoKHAsIGFjY3VyYWN5TGFiZWxzLCB0ZXh0U2l6ZSk7XHJcbiAgICBsZXQgdG90YWxOb3RlcyA9IG5vdGVNYW5hZ2VyLmdldFRvdGFsTm90ZXMoKTtcclxuICAgIGxldCBiYXJTcGFjaW5nID0gMTA7XHJcbiAgICBsZXQgdG90YWxIZWlnaHQgPSBhY2N1cmFjeUxhYmVscy5sZW5ndGggKiBiYXJIZWlnaHQgKyAoYWNjdXJhY3lMYWJlbHMubGVuZ3RoIC0gMSkgKiBiYXJTcGFjaW5nO1xyXG4gICAgbGV0IHN0YXJ0WSA9IChwLmhlaWdodCAtIHRvdGFsSGVpZ2h0KSAvIDIgKyBiYXJIZWlnaHQgLyAyO1xyXG4gICAgc3RhcnRZICo9IDAuODsgLy8gc2hpZnQgdGhlIHJlc3VsdHMgdXAgdG8gbWFrZSByb29tIGZvciBleGl0IGJ1dHRvblxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjdXJhY3lMYWJlbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lMYWJlbCA9IGFjY3VyYWN5TGFiZWxzW2ldO1xyXG4gICAgICAgIGxldCBudW1BY2N1cmFjeUV2ZW50cyA9IGdldE51bUFjY3VyYWN5RXZlbnRzKGFjY3VyYWN5TGFiZWwsIGFjY3VyYWN5UmVjb3JkaW5nLCBhY2N1cmFjeU1hbmFnZXIpO1xyXG4gICAgICAgIGxldCBwZXJjZW50RmlsbGVkID0gbnVtQWNjdXJhY3lFdmVudHMgLyB0b3RhbE5vdGVzO1xyXG5cclxuICAgICAgICBpZiAoaXNCb29Gb3JMYXN0QWNjdXJhY3kgJiYgaSA9PT0gYWNjdXJhY3lMYWJlbHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBkcmF3QWNjdXJhY3lXaXRoTm9CYXIocCwgY2VudGVyWCwgc3RhcnRZICsgaSAqIChiYXJIZWlnaHQgKyBiYXJTcGFjaW5nKSwgYWNjdXJhY3lMYWJlbCxcclxuICAgICAgICAgICAgICAgIG51bUFjY3VyYWN5RXZlbnRzLnRvU3RyaW5nKCksIHRvdGFsTm90ZXMudG9TdHJpbmcoKSwgdGV4dFNpemUsIG1heFRleHRXaWR0aCwgYmFyV2lkdGgsIGJhckhlaWdodCwgcGVyY2VudEZpbGxlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZHJhd0FjY3VyYWN5QmFyKHAsIGNlbnRlclgsIHN0YXJ0WSArIGkgKiAoYmFySGVpZ2h0ICsgYmFyU3BhY2luZyksIGFjY3VyYWN5TGFiZWwsXHJcbiAgICAgICAgICAgICAgICBudW1BY2N1cmFjeUV2ZW50cy50b1N0cmluZygpLCB0b3RhbE5vdGVzLnRvU3RyaW5nKCksIHRleHRTaXplLCBtYXhUZXh0V2lkdGgsIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TnVtQWNjdXJhY3lFdmVudHMoYWNjdXJhY3lMYWJlbDogc3RyaW5nLCBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyKSB7XHJcbiAgICByZXR1cm4gYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nLnJlZHVjZSgoc3VtLCB0cmFja1JlY29yZGluZykgPT5cclxuICAgICAgICBzdW0gKyB0cmFja1JlY29yZGluZy5maWx0ZXIoYWNjdXJhY3lFdmVudCA9PlxyXG4gICAgICAgIGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMsIGFjY3VyYWN5TWFuYWdlci5jb25maWcpID09PSBhY2N1cmFjeUxhYmVsKS5sZW5ndGgsIDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNYXhUZXh0V2lkdGgocDogcDUsIHRleHRBcnJheTogc3RyaW5nW10sIHRleHRTaXplOiBudW1iZXIpIHtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgcC50ZXh0U2l6ZSh0ZXh0U2l6ZSk7XHJcbiAgICBsZXQgbWF4VGV4dFdpZHRoID0gdGV4dEFycmF5Lm1hcCgoc3RyaW5nKSA9PiBwLnRleHRXaWR0aChzdHJpbmcpKVxyXG4gICAgICAgIC5yZWR1Y2UoKG1heFdpZHRoLCB3aWR0aCkgPT4gTWF0aC5tYXgobWF4V2lkdGgsIHdpZHRoLCAtMSkpO1xyXG4gICAgcC5wb3AoKTtcclxuICAgIHJldHVybiBtYXhUZXh0V2lkdGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdBY2N1cmFjeUJhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGxhYmVsMTogc3RyaW5nLCBsYWJlbDI6IHN0cmluZywgbGFiZWwzOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNpemU6IG51bWJlciwgbGFyZ2VzdFRleHRXaWR0aDogbnVtYmVyLCBiYXJXaWR0aDogbnVtYmVyLCBiYXJIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIpIHtcclxuICAgIGxldCBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsID0gODtcclxuICAgIGxldCB0b3RhbFdpZHRoID0gbGFyZ2VzdFRleHRXaWR0aCArIHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgKyBiYXJXaWR0aDtcclxuICAgIGxldCBsYWJlbFJpZ2h0bW9zdFggPSBjZW50ZXJYIC0gdG90YWxXaWR0aCAvIDIgKyBsYXJnZXN0VGV4dFdpZHRoO1xyXG4gICAgZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHAsIGxhYmVsUmlnaHRtb3N0WCwgY2VudGVyWSwgbGFiZWwxLCB0ZXh0U2l6ZSk7XHJcblxyXG4gICAgbGV0IGJhclJpZ2h0WCA9IGNlbnRlclggKyB0b3RhbFdpZHRoIC8gMjtcclxuICAgIGxldCBiYXJMZWZ0WCA9IGJhclJpZ2h0WCAtIGJhcldpZHRoO1xyXG4gICAgbGV0IGJhckNlbnRlclggPSAoYmFyTGVmdFggKyBiYXJSaWdodFgpIC8gMjtcclxuICAgIGRyYXdQYXJ0aWFsbHlGaWxsZWRCYXIocCwgYmFyQ2VudGVyWCwgY2VudGVyWSwgYmFyV2lkdGgsIGJhckhlaWdodCwgcGVyY2VudEZpbGxlZCwgdGV4dFNpemUsIGxhYmVsMiwgbGFiZWwzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHA6IHA1LCByaWdodG1vc3RYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgdGV4dDogc3RyaW5nLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZSh0ZXh0U2l6ZSk7XHJcbiAgICBwLnRleHRBbGlnbihwLlJJR0hULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQodGV4dCwgcmlnaHRtb3N0WCwgY2VudGVyWSk7XHJcbiAgICBwLnBvcCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UGFydGlhbGx5RmlsbGVkQmFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRGaWxsZWQ6IG51bWJlciwgdGV4dFNpemU6IG51bWJlciwgc3RhcnRMYWJlbDogc3RyaW5nLCBlbmRMYWJlbDogc3RyaW5nKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAucmVjdE1vZGUocC5DRU5URVIpO1xyXG4gICAgcC5zdHJva2UoXCJ3aGl0ZVwiKTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBmaWxsZWQgcGFydCBvZiB0aGUgYmFyXHJcbiAgICBwLmZpbGwoXCJncmF5XCIpO1xyXG4gICAgcC5yZWN0KGNlbnRlclggLSAod2lkdGggKiAoMSAtIHBlcmNlbnRGaWxsZWQpIC8gMiksIGNlbnRlclksIHdpZHRoICogcGVyY2VudEZpbGxlZCwgaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBvdXRsaW5lIG9mIHRoZSBiYXJcclxuICAgIHAubm9GaWxsKCk7XHJcbiAgICBwLnJlY3QoY2VudGVyWCwgY2VudGVyWSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgbGFiZWxzIG9uIHRoZSBlbmRzIG9mIHRoZSBiYXJcclxuICAgIGxldCBsYWJlbFNpemUgPSAxLjUgKiB0ZXh0U2l6ZTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZShsYWJlbFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5MRUZULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQoc3RhcnRMYWJlbCwgY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSArIDIpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5SSUdIVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KGVuZExhYmVsLCBjZW50ZXJYICsgd2lkdGggLyAyLCBjZW50ZXJZICsgMik7XHJcbiAgICBwLnBvcCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3QWNjdXJhY3lXaXRoTm9CYXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBsYWJlbDE6IHN0cmluZywgbGFiZWwyOiBzdHJpbmcsIGxhYmVsMzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNpemU6IG51bWJlciwgbGFyZ2VzdFRleHRXaWR0aDogbnVtYmVyLCBiYXJXaWR0aDogbnVtYmVyLCBiYXJIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRGaWxsZWQ6IG51bWJlcikge1xyXG4gICAgbGV0IHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgPSA4O1xyXG4gICAgbGV0IHRvdGFsV2lkdGggPSBsYXJnZXN0VGV4dFdpZHRoICsgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCArIGJhcldpZHRoO1xyXG4gICAgbGV0IGxhYmVsUmlnaHRtb3N0WCA9IGNlbnRlclggLSB0b3RhbFdpZHRoIC8gMiArIGxhcmdlc3RUZXh0V2lkdGg7XHJcbiAgICBkcmF3UmlnaHRBbGlnbmVkTGFiZWwocCwgbGFiZWxSaWdodG1vc3RYLCBjZW50ZXJZLCBsYWJlbDEsIHRleHRTaXplKTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBhY2N1cmFjeSBjb3VudCBsYWJlbCBvbiB0aGUgbGVmdCBlbmQgb2YgdGhlIGJhclxyXG4gICAgbGV0IGxhYmVsU2l6ZSA9IDEuNSAqIHRleHRTaXplO1xyXG4gICAgbGV0IGJhclJpZ2h0WCA9IGNlbnRlclggKyB0b3RhbFdpZHRoIC8gMjtcclxuICAgIGxldCBiYXJMZWZ0WCA9IGJhclJpZ2h0WCAtIGJhcldpZHRoO1xyXG4gICAgbGV0IGJhckNlbnRlclggPSAoYmFyTGVmdFggKyBiYXJSaWdodFgpIC8gMjtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICBwLnRleHRTaXplKGxhYmVsU2l6ZSk7XHJcbiAgICBwLnRleHRBbGlnbihwLkxFRlQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChsYWJlbDIsIGJhckNlbnRlclggLSBiYXJXaWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAucG9wKCk7XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSG9sZEdsb3cge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgZ2xvd1N0YXJ0VGltZXM6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZG9udERyYXdGbGFnOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgc3RhdGljIGdsb3dQZXJpb2RJblNlY29uZHM6IG51bWJlciA9IDAuMztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuXHJcbiAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lcy5wdXNoKEhvbGRHbG93LmRvbnREcmF3RmxhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdICE9PSBIb2xkR2xvdy5kb250RHJhd0ZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsYXBzZWRUaW1lID0gY3VycmVudFRpbWVJblNlY29uZHMgLSB0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICAgICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbnRlclkgPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJZKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2xvd0FscGhhID0gdGhpcy5nZXRHbG93QWxwaGEoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdsb3dDb2xvciA9IHAuY29sb3IoMCwgMjU1LCAwLCBnbG93QWxwaGEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdsb3dTaXplID0gdGhpcy5nZXRHbG93U2l6ZShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdHbG93KHAsIGNlbnRlclgsIGNlbnRlclksIGdsb3dTaXplLCBnbG93U2l6ZSAvIDIsIGdsb3dDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3R2xvdyhwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLm5vU3Ryb2tlKCk7XHJcbiAgICAgICAgcC5maWxsKGNvbG9yKTtcclxuICAgICAgICBwLmVsbGlwc2UoY2VudGVyWCwgY2VudGVyWSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdsb3dBbHBoYShlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblRpbWUgPSBlbGFwc2VkVGltZUluU2Vjb25kcyAlIEhvbGRHbG93Lmdsb3dQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblJhdGlvID0gYW5pbWF0aW9uVGltZSAvIEhvbGRHbG93Lmdsb3dQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmlMZXJwKDAsIDUwLCBhbmltYXRpb25SYXRpbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRHbG93U2l6ZShlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblRpbWUgPSBlbGFwc2VkVGltZUluU2Vjb25kcyAlIEhvbGRHbG93Lmdsb3dQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblJhdGlvID0gYW5pbWF0aW9uVGltZSAvIEhvbGRHbG93Lmdsb3dQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IG1heFNpemUgPSB0aGlzLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5iaUxlcnAoMCwgbWF4U2l6ZSwgYW5pbWF0aW9uUmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmlMZXJwKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPCAwLjUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVycChtaW5WYWx1ZSwgbWF4VmFsdWUsIDEgLSByYXRpbyAvIDAuNSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVycChtaW5WYWx1ZSwgbWF4VmFsdWUsIDIgKiByYXRpbyAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxlcnAobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlciwgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyYXRpbyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGlvID4gMCAmJiByYXRpbyA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlICsgKG1heFZhbHVlIC0gbWluVmFsdWUpICogcmF0aW87XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXSA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl0gPSBIb2xkR2xvdy5kb250RHJhd0ZsYWc7XHJcbiAgICB9XHJcbn0iLCIvKiBUaGlzIGNsYXNzIGlzIGludGVuZGVkIG9ubHkgdG8gYmUgdXNlZCB0byBzdG9yZSB0aGUgaG9sZCBzdGF0ZSBmb3Igbm90ZXMgdGhhdCBjYW4gYmUgaGVsZC4gVGhpcyBzaG91bGRuJ3QgYmUgdXNlZFxyXG4gICBmb3Igbm9ybWFsIG5vdGVzIG9yIGdlbmVyYWwga2V5Ym9hcmQgc3RhdGUgKi9cclxuZXhwb3J0IGNsYXNzIEhvbGRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgaGVsZFRyYWNrczogYm9vbGVhbltdO1xyXG4gICAgcHJpdmF0ZSBvblRyYWNrSG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBvblRyYWNrVW5ob2xkOiAodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM/OiBudW1iZXIpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IobnVtVHJhY2tzOiBudW1iZXIsIG9uVHJhY2tIb2xkOiAodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM/OiBudW1iZXIpID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgICBvblRyYWNrVW5ob2xkOiAodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM/OiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVsZFRyYWNrcy5wdXNoKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vblRyYWNrSG9sZCA9IG9uVHJhY2tIb2xkO1xyXG4gICAgICAgIHRoaXMub25UcmFja1VuaG9sZCA9IG9uVHJhY2tVbmhvbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3NbdHJhY2tOdW1iZXJdID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uVHJhY2tIb2xkKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3NbdHJhY2tOdW1iZXJdID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vblRyYWNrVW5ob2xkKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1BhcnRpY2xlU3lzdGVtfSBmcm9tIFwiLi9wYXJ0aWNsZV9zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvbGRQYXJ0aWNsZXMge1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZVN5c3RlbXM6IFBhcnRpY2xlU3lzdGVtW107XHJcbiAgICBwcml2YXRlIHByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlc0xpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXIgPSAxLjU7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBkb250RHJhd0ZsYWc6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGljbGVQZXJpb2RJblNlY29uZHM6IG51bWJlciA9IDAuMDU7XHJcbiAgICBwcml2YXRlIGdyYXZpdHlEaXJlY3Rpb246IG51bWJlclxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlciwgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IGRpc3BsYXlNYW5hZ2VyO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eURpcmVjdGlvbiA9IGNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5Eb3duID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBncmF2aXR5OiBwNS5WZWN0b3IgPSBwLmNyZWF0ZVZlY3RvcigwLCAyMDAwICogdGhpcy5ncmF2aXR5RGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zLnB1c2gobmV3IFBhcnRpY2xlU3lzdGVtKEhvbGRQYXJ0aWNsZXMucGFydGljbGVzTGlmZXRpbWVJblNlY29uZHMsIGdyYXZpdHkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHMucHVzaChIb2xkUGFydGljbGVzLmRvbnREcmF3RmxhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRQYXJ0aWNsZXNUb1RyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW3RyYWNrTnVtYmVyXS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRQYXJ0aWNsZXNUb1RyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gIT09IEhvbGRQYXJ0aWNsZXMuZG9udERyYXdGbGFnKSB7XHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSArIEhvbGRQYXJ0aWNsZXMucGFydGljbGVQZXJpb2RJblNlY29uZHMgPCBjdXJyZW50VGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1RpbWVzdGFtcCA9IHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdICsgSG9sZFBhcnRpY2xlcy5wYXJ0aWNsZVBlcmlvZEluU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGxldCByZWNlcHRvclRpbWVQb3NpdGlvbiA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuZ2V0SW5pdGlhbFBvc2l0aW9uKHAsIHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgcmVjZXB0b3JUaW1lUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxWZWxvY2l0eSA9IHAuY3JlYXRlVmVjdG9yKDAsIC01MDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbdHJhY2tOdW1iZXJdLmFkZFJhbmRvbWl6ZWRQYXJ0aWNsZXMoaW5pdGlhbFBvc2l0aW9uLCBpbml0aWFsVmVsb2NpdHksIG5ld1RpbWVzdGFtcCxcclxuICAgICAgICAgICAgICAgICAgICAxLCBwLmNvbG9yKDAsIDI1NSwgMCwgMTUwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSA9IG5ld1RpbWVzdGFtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEluaXRpYWxQb3NpdGlvbihwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY2VudGVyVGltZUluU2Vjb25kcywgY2VudGVyVGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlVmVjdG9yKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSA9IEhvbGRQYXJ0aWNsZXMuZG9udERyYXdGbGFnO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge1N0ZXBmaWxlfSBmcm9tIFwiLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZX0gZnJvbSBcIi4vYXVkaW9fZmlsZVwiO1xyXG5pbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7T25saW5lUGxheWxpc3R9IGZyb20gXCIuL29ubGluZV9wbGF5bGlzdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbDogYW55ID0ge307XHJcbmdsb2JhbC5wNVNjZW5lID0gbmV3IFA1U2NlbmUoKTtcclxuZ2xvYmFsLmNvbmZpZyA9IENvbmZpZy5sb2FkKCk7XHJcbmdsb2JhbC5nbG9iYWxDbGFzcyA9IFwiZ2FtZVwiO1xyXG5nbG9iYWwub25saW5lUGxheWxpc3QgPSBuZXcgT25saW5lUGxheWxpc3QoKTsiLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnZXRLZXlTdHJpbmcsIHNldENvbmZpZ0tleUJpbmRpbmd9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ3NVaX0gZnJvbSBcIi4va2V5X2JpbmRpbmdzX3VpXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEtleUJpbmRpbmcge1xyXG4gICAgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgIGtleUNvZGU6IG51bWJlcixcclxuICAgIHN0cmluZzogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlCaW5kaW5nSGVscGVyIHtcclxuICAgIHByaXZhdGUgYmluZGluZ3NUb0FjcXVpcmU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3VycmVudEJpbmRpbmdOdW1iZXI6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiaW5kaW5nc1RvQWNxdWlyZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSA9IGJpbmRpbmdzVG9BY3F1aXJlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBiaW5kTmV4dChwOiBwNSwga2V5QmluZGluZ3NRdWlja3N0YXJ0SWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBrZXliaW5kaW5nOiBLZXlCaW5kaW5nID0ge1xyXG4gICAgICAgICAgICB0cmFja051bWJlcjogdGhpcy5jdXJyZW50QmluZGluZ051bWJlcixcclxuICAgICAgICAgICAga2V5Q29kZTogcC5rZXlDb2RlLFxyXG4gICAgICAgICAgICBzdHJpbmc6IGdldEtleVN0cmluZyhwKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2V0Q29uZmlnS2V5QmluZGluZyh0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyLCB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlLCBrZXliaW5kaW5nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyKys7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyID49IHRoaXMuYmluZGluZ3NUb0FjcXVpcmUpIHtcclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLnVuYmluZEtleSgtMSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGtleUJpbmRpbmdzUXVpY2tzdGFydElkKS5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgICAgICAgICBLZXlCaW5kaW5nc1VpLm5vTG9uZ2VyV2FpdGluZ0Zvckxhc3RLZXkocCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgS2V5QmluZGluZ3NVaS5zY3JvbGxLZXlCaW5kaW5nSW50b1ZpZXcodGhpcy5jdXJyZW50QmluZGluZ051bWJlcik7XHJcbiAgICAgICAgICAgIEtleUJpbmRpbmdzVWkuaW5kaWNhdGVXYWl0aW5nRm9yS2V5KHAsIHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nSGVscGVyfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrLCBnZW5lcmF0ZVByZXZpZXdOb3RlcywgZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lLCBnZXRJbnQsXHJcbiAgICBnZXRLZXlTdHJpbmcsXHJcbiAgICBpbml0aWFsaXplS2V5QmluZGluZ3MsXHJcbiAgICBpc0tleUJpbmRpbmdzRGVmaW5lZCxcclxuICAgIHNldENvbmZpZ0tleUJpbmRpbmdcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Y3JlYXRlTGFiZWwsIGNyZWF0ZUxhYmVsZWRJbnB1dCwgY3JlYXRlVXNlcklucHV0LCBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzfSBmcm9tIFwiLi91aV91dGlsXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuaW1wb3J0IHtUaWNrZXIsIFRpY2tlclN0YXRlfSBmcm9tIFwiLi90aWNrZXJcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBLZXlCaW5kaW5nc1VpIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVDogc3RyaW5nID0gXCJTZXRcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNFVF9CVVRUT05fQUNUSVZFX1RFWFQ6IHN0cmluZyA9IFwiUHJlc3MgQW55IEtleVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9OVU1fVFJBQ0tTOiBudW1iZXIgPSA0O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXNldE51bVRyYWNrcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IEtleUJpbmRpbmdzVWkuREVGQVVMVF9OVU1fVFJBQ0tTO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHBhcmVudEVsZW1lbnQ6IHA1LkVsZW1lbnQsIHBhZ2VTdHlsZUNsYXNzOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQga2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyID0gdGhpcy5jcmVhdGVLZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIoKTtcclxuICAgICAgICBpZiAoIWtleUJpbmRpbmdzU2VjdGlvbkhlYWRlci5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubnVtVHJhY2tzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm51bVRyYWNrcyA9IHRoaXMuREVGQVVMVF9OVU1fVFJBQ0tTO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjcmVhdGVVc2VySW5wdXQoICgpID0+IGNyZWF0ZUxhYmVsZWRJbnB1dChcIk51bWJlciBvZiBUcmFja3NcIiwgXCJwcmV2aWV3TnVtVHJhY2tzSW5wdXRcIixcclxuICAgICAgICAgICAgdGhpcy5udW1UcmFja3MudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTnVtYmVyT2ZUcmFja3MuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93TnVtYmVyT2ZUcmFja3NJbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd051bWJlck9mVHJhY2tzRXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIEtleUJpbmRpbmdzVWkucmVtb3ZlT2xkQmluZGluZ0J1dHRvbnModGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5udW1UcmFja3MgPSBnZXRJbnQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdlbmVyYXRlUHJldmlldygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiS2V5LUJpbmRpbmdzIFF1aWNrc3RhcnRcIik7XHJcbiAgICAgICAgfSwgXCJrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b25cIik7XHJcbiAgICAgICAgaWYgKCFrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZ3NRdWlja3N0YXJ0SWQgPSBcImtleWJpbmRpbmdzLXF1aWNrc3RhcnRcIjtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MocGFnZVN0eWxlQ2xhc3MpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhcImtleWJpbmRpbmdzLXF1aWNrc3RhcnRcIik7XHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50LmlkKGtleUJpbmRpbmdzUXVpY2tzdGFydElkKTtcclxuXHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5YmluZGluZ0hlbHBlciA9IG5ldyBLZXlCaW5kaW5nSGVscGVyKHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsS2V5QmluZGluZ0ludG9WaWV3KDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRpY2F0ZVdhaXRpbmdGb3JLZXkocCwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmluZCB0aGlzIGFjdGlvbiB0byB0aGUgXCItMVwiIGtleSBzbyB0aGF0IGl0IGhhcHBlbnMgb24gYW55IGtleSBwcmVzc1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbigtMSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSB0aGlzIGNvZGUgYmVjYXVzZSBpdCdzIHVzZWQgdG8gaW5kaWNhdGUgaW5wdXQgdGhhdCdzIG5vdCB5ZXQgZmluaXNoZWQgcHJvY2Vzc2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLmtleUNvZGUgIT09IDIyOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXliaW5kaW5nSGVscGVyLmJpbmROZXh0KHAsIGtleUJpbmRpbmdzUXVpY2tzdGFydElkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNoaWxkKGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNLZXlCaW5kaW5nc0RlZmluZWQodGhpcy5udW1UcmFja3MpKSB7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyh0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZ0lucHV0ID0gdGhpcy5jcmVhdGVLZXlCaW5kaW5nSW5wdXQodHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCBwYWdlU3R5bGVDbGFzcyk7XHJcbiAgICAgICAgICAgIGlmICgha2V5QmluZGluZ0lucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ0lucHV0LmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKFxyXG4gICAgICAgICAgICAgICAgJ0tleSBCaW5kaW5ncyA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxMnB4XCI+KHRyYWNrIDEgaXMgdGhlIGxlZnRtb3N0IHRyYWNrKTwvc3Bhbj4nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhcIm9wdGlvbnMtZnJlZS10ZXh0XCIpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfSwgXCJrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXJcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNWYWxpZE51bWJlck9mVHJhY2tzKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbnVtYmVyVmFsdWU6IG51bWJlciA9IGdldEludCh2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobnVtYmVyVmFsdWUpICYmIG51bWJlclZhbHVlID4gMCAmJiBudW1iZXJWYWx1ZSA8PSAyNjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dOdW1iZXJPZlRyYWNrc0luZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJTaG93IG9wdGlvbnMgZm9yIHRoZSBudW1iZXIgb2Ygbm90ZSB0cmFja3MgeW91J2xsIGJlIHBsYXlpbmcgd2l0aC5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd051bWJlck9mVHJhY2tzRXJyb3IoKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJFcnJvcjogbXVzdCBiZSBhbiBpbnRlZ2VyIG51bWJlciBiZXR3ZWVuIDEgYW5kIDI2LlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5FUlJPUik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlS2V5QmluZGluZ0lucHV0KHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjdXN0b21DbGFzczogc3RyaW5nKVxyXG4gICAgICAgIDogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgICAgICBsZXQgc2V0QnV0dG9uSWQgPSB0aGlzLmdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBsZXQga2V5YmluZGluZ0lucHV0Q2xhc3MgPSBcImtleWJpbmRpbmctaW5wdXRcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGtleWJpbmRpbmdJbnB1dENsYXNzKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBcIlwiKTtcclxuICAgICAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgICAgICBsYWJlbC5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNldEJ1dHRvbiA9IHAuY3JlYXRlQnV0dG9uKFwiU2V0XCIpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24ucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5pZChzZXRCdXR0b25JZCk7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRpY2F0ZVdhaXRpbmdGb3JLZXkocCwgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbigtMSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSB0aGlzIGNvZGUgYmVjYXVzZSBpdCdzIHVzZWQgdG8gaW5kaWNhdGUgaW5wdXQgdGhhdCdzIG5vdCB5ZXQgZmluaXNoZWQgcHJvY2Vzc2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLmtleUNvZGUgIT09IDIyOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maWdLZXlCaW5kaW5nKHRyYWNrTnVtYmVyLCBudW1UcmFja3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLCBrZXlDb2RlOiBwLmtleUNvZGUsIHN0cmluZzogZ2V0S2V5U3RyaW5nKHApfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9Mb25nZXJXYWl0aW5nRm9yS2V5KHNldEJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLmFkZENsYXNzKGtleWJpbmRpbmdJbnB1dENsYXNzKTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH0sIHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpKTtcclxuXHJcbiAgICAgICAgbGV0IHRyYWNrQmluZGluZ0luZm8gPSBmaW5kQmluZGluZ0luZm9Gb3JUcmFjayh0cmFja051bWJlciwgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSk7XHJcbiAgICAgICAgbGV0IGtleVN0cmluZyA9IHRyYWNrQmluZGluZ0luZm8uc3RyaW5nO1xyXG4gICAgICAgIGxldCBsYWJlbFN0cmluZyA9ICdUcmFjayAnICsgKHRyYWNrTnVtYmVyICsgMSkgKyAnOiA8c3BhbiBjbGFzcz1cIicgK1xyXG4gICAgICAgICAgICBrZXliaW5kaW5nSW5wdXRDbGFzcyArIFwiIFwiICsgY3VzdG9tQ2xhc3MgKyBcIiBcIiArIGdsb2JhbC5nbG9iYWxDbGFzcyArXHJcbiAgICAgICAgICAgICdcIj4nICsga2V5U3RyaW5nICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgIGxldCBsYWJlbEVsZW1lbnQgPSBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoY29udGFpbmVyLmVsZW1lbnQsIFwiTEFCRUxcIik7XHJcbiAgICAgICAgbGFiZWxFbGVtZW50Lmh0bWwobGFiZWxTdHJpbmcpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5kaWNhdGVXYWl0aW5nRm9yS2V5KHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHNldEJ1dHRvbnM6IHA1LkVsZW1lbnRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBzZXRCdXR0b25zLnB1c2godGhpcy5nZXRTZXRCdXR0b24ocCwgaSwgdGhpcy5udW1UcmFja3MpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2V0QnV0dG9uOiBwNS5FbGVtZW50ID0gc2V0QnV0dG9uc1tpXTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IHRyYWNrTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRCdXR0b24uaHRtbCh0aGlzLlNFVF9CVVRUT05fQUNUSVZFX1RFWFQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0QnV0dG9uLmh0bWwodGhpcy5TRVRfQlVUVE9OX0lOQUNUSVZFX1RFWFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFNldEJ1dHRvbihwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpOiBwNS5FbGVtZW50IHtcclxuICAgICAgICBsZXQgc2V0QnV0dG9uSWQgPSB0aGlzLmdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICByZXR1cm4gcC5zZWxlY3QoXCIjXCIgKyBzZXRCdXR0b25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbm9Mb25nZXJXYWl0aW5nRm9yS2V5KHNldEJ1dHRvbjogcDUuRWxlbWVudCkge1xyXG4gICAgICAgIHNldEJ1dHRvbi5odG1sKHRoaXMuU0VUX0JVVFRPTl9JTkFDVElWRV9URVhUKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG5vTG9uZ2VyV2FpdGluZ0Zvckxhc3RLZXkocDogcDUpIHtcclxuICAgICAgICBsZXQgc2V0QnV0dG9uOiBwNS5FbGVtZW50ID0gdGhpcy5nZXRTZXRCdXR0b24ocCwgdGhpcy5udW1UcmFja3MgLSAxLCB0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgc2V0QnV0dG9uLmh0bWwodGhpcy5TRVRfQlVUVE9OX0lOQUNUSVZFX1RFWFQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEtleUJpbmRpbmdVbmlxdWVJZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSArIFwiQnV0dG9uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0S2V5QmluZGluZ1VuaXF1ZUlkKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhY2tcIiArIHRyYWNrTnVtYmVyICsgXCJPZlwiICsgbnVtVHJhY2tzICsgXCJCaW5kaW5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzY3JvbGxLZXlCaW5kaW5nSW50b1ZpZXcodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5nQnV0dG9uSWQgPSB0aGlzLmdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGtleUJpbmRpbmdCdXR0b25JZCkucGFyZW50RWxlbWVudC5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlT2xkQmluZGluZ0J1dHRvbnMobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQodGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlZ2VuZXJhdGVQcmV2aWV3KCkge1xyXG4gICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyh0aGlzLm51bVRyYWNrcyksIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkRXZlbnRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgYWN0aW9uQmluZGluZ3M6IE1hcDxudW1iZXIsIHtrZXlEb3duQWN0aW9uOiAoKSA9PiB2b2lkLCBrZXlVcEFjdGlvbjogKCkgPT4gdm9pZH0+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHA6IHA1KSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25CaW5kaW5ncyA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAgICAgcC5rZXlQcmVzc2VkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIC0xIGlzIGEgc3BlY2lhbCBrZXlDb2RlIGZsYWcgdGhhdCBtZWFucyBcImFueVwiLiBUaGlzIGlzIGVzcGVjaWFsbHkgdXNlZnVsIGZvciBzZXR0aW5nIHVwIGtleSBiaW5kaW5ncy5cclxuICAgICAgICAgICAgbGV0IGdsb2JhbEFjdGlvbnMgPSB0aGlzLmFjdGlvbkJpbmRpbmdzLmdldCgtMSk7XHJcbiAgICAgICAgICAgIGlmIChnbG9iYWxBY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnbG9iYWxBY3Rpb25zLmtleURvd25BY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbEFjdGlvbnMua2V5RG93bkFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVxdWl2YWxlbnQgdG8gZXZlbnQucHJldmVudERlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KHAua2V5Q29kZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMua2V5RG93bkFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMua2V5RG93bkFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFcXVpdmFsZW50IHRvIGV2ZW50LnByZXZlbnREZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHAua2V5UmVsZWFzZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGFjdGlvbnMgPSB0aGlzLmFjdGlvbkJpbmRpbmdzLmdldChwLmtleUNvZGUpO1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucy5rZXlVcEFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5rZXlVcEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVxdWl2YWxlbnQgdG8gZXZlbnQucHJldmVudERlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEtleVRvQWN0aW9uKGtleUNvZGU6IG51bWJlciwga2V5RG93bkFjdGlvbjogKCkgPT4gdm9pZCwga2V5VXBBY3Rpb246ICgpID0+IHZvaWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbkJpbmRpbmdzLnNldChrZXlDb2RlLCB7a2V5RG93bkFjdGlvbjoga2V5RG93bkFjdGlvbiwga2V5VXBBY3Rpb246IGtleVVwQWN0aW9ufSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kS2V5KGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbkJpbmRpbmdzLmRlbGV0ZShrZXlDb2RlKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2V0TWlzc0JvdW5kYXJ5fSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0hvbGRNYW5hZ2VyfSBmcm9tIFwiLi9ob2xkX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWlzc01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBsYXN0Q2hlY2tlZE5vdGVJbmRpY2VzOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlciwgaGFuZGxlQWNjdXJhY3lFdmVudDogKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXMucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuaG9sZE1hbmFnZXIgPSBob2xkTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQgPSBoYW5kbGVBY2N1cmFjeUV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjsgLy8gQSBsb3dlckJvdW5kIGZvciBtaXNzZXMgaXMgaW5jb21wYXRpYmxlIHdpdGggdGhpcyB3YXkgb2YgZG9pbmcgbWlzc2VzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBudW1UcmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IG51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFsbE1pc3NlZE5vdGVzRm9yVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVBbGxNaXNzZWROb3Rlc0ZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSA9IHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUgPj0gdHJhY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY3VycmVudE5vdGUgPSB0cmFja1tpbmRleE9mTGFzdENoZWNrZWROb3RlXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb3RNaXNzYWJsZShjdXJyZW50Tm90ZSkpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUrKztcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTm90ZU1pc3NlZEFuZE5vdEhhbmRsZWQoY3VycmVudE5vdGUsIGN1cnJlbnRUaW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNaXNzZWROb3RlKHRyYWNrTnVtYmVyLCBpbmRleE9mTGFzdENoZWNrZWROb3RlLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICBpbmRleE9mTGFzdENoZWNrZWROb3RlKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXNbdHJhY2tOdW1iZXJdID0gaW5kZXhPZkxhc3RDaGVja2VkTm90ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGb3IgZXhhbXBsZTogbm90ZXMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBoaXQgYXJlIG5vdCBtaXNzYWJsZVxyXG4gICAgcHJpdmF0ZSBpc05vdE1pc3NhYmxlKG5vdGU6IE5vdGUpIHtcclxuICAgICAgICByZXR1cm4gbm90ZS5zdGF0ZSAhPT0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc05vdGVNaXNzZWRBbmROb3RIYW5kbGVkKG5vdGU6IE5vdGUsIGN1cnJlbnRUaW1lOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbWlzc0JvdW5kYXJ5ID0gZ2V0TWlzc0JvdW5kYXJ5KGN1cnJlbnRUaW1lLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIG5vdGUudGltZUluU2Vjb25kcyA8IG1pc3NCb3VuZGFyeSAmJiBub3RlLnN0YXRlID09PSBOb3RlU3RhdGUuREVGQVVMVDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU1pc3NlZE5vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgaW5kZXhPZk1pc3NlZE5vdGU6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0cmFjayA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgbWlzc2VkTm90ZSA9IHRyYWNrW2luZGV4T2ZNaXNzZWROb3RlXTtcclxuICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICBhY2N1cmFjeU5hbWU6IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0ubmFtZSxcclxuICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogLUluZmluaXR5LFxyXG4gICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgbm90ZVR5cGU6IG1pc3NlZE5vdGUudHlwZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1pc3NlZE5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuTUlTU0VEO1xyXG4gICAgICAgIGlmIChtaXNzZWROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZE1hbmFnZXIuaXNUcmFja0hlbGQodHJhY2tOdW1iZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLnVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcykgLy8gRm9yY2UgYSBob2xkIHJlbGVhc2UgdXBvbiBtaXNzaW5nIHRoZSB0YWlsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG1pc3NlZE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0Tm90ZSA9IHRyYWNrW2luZGV4T2ZNaXNzZWROb3RlICsgMV07XHJcbiAgICAgICAgICAgIGlmIChuZXh0Tm90ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHROb3RlLnN0YXRlID0gTm90ZVN0YXRlLk1JU1NFRDsgLy8gTWlzcyB0aGUgdGFpbCB3aGVuIHlvdSBtaXNzIHRoZSBoZWFkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90ZU1hbmFnZXIge1xyXG4gICAgdHJhY2tzOiBOb3RlW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3M6IE5vdGVbXVtdKSB7XHJcbiAgICAgICAgdGhpcy50cmFja3MgPSB0cmFja3M7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVVbnN1cHBvcnRlZE5vdGVUeXBlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlVW5zdXBwb3J0ZWROb3RlVHlwZXMoKSB7XHJcbiAgICAgICAgbGV0IHN1cHBvcnRlZE5vdGVUeXBlczogTm90ZVR5cGVbXSA9IFtOb3RlVHlwZS5UQUlMLCBOb3RlVHlwZS5IT0xEX0hFQUQsIE5vdGVUeXBlLk5PUk1BTF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLnRyYWNrcy5sZW5ndGg7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSB0aGlzLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5vdGVOdW1iZXIgPSAwOyBub3RlTnVtYmVyIDwgdHJhY2subGVuZ3RoOyBub3RlTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBub3RlOiBOb3RlID0gdHJhY2tbbm90ZU51bWJlcl07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN1cHBvcnRlZE5vdGVUeXBlcy5pbmNsdWRlcyhub3RlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2suc3BsaWNlKG5vdGVOdW1iZXIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVOdW1iZXItLTsgLy8gZGVjcmVtZW50IG5vdGUgbnVtYmVyIHNvIG5leHQgaXRlcmF0aW9uIGl0IHN0YXJ0cyBhdCB0aGUgcmlnaHQgbm90ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGVzQnlUaW1lUmFuZ2UobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCBmaXJzdEZpbmRSZXN1bHQgPSB0aGlzLmZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGxlYXN0VGltZSwgdHJhY2spO1xyXG4gICAgICAgIGlmIChmaXJzdEZpbmRSZXN1bHQgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogLTEsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiAtMX07IC8vIG5vIG5vdGVzIGxlZnQgYWZ0ZXIgbGVhc3QgdGltZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGFzdEZpbmRSZXN1bHQgPSB0aGlzLmZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGdyZWF0ZXN0VGltZSwgdHJhY2ssIGZpcnN0RmluZFJlc3VsdCk7XHJcbiAgICAgICAgaWYgKGxhc3RGaW5kUmVzdWx0IDwgMCkge1xyXG4gICAgICAgICAgICBsYXN0RmluZFJlc3VsdCA9IHRyYWNrLmxlbmd0aDsgLy8gZ3JlYXRlc3RUaW1lIGV4Y2VlZHMgdGhlIGVuZCBvZiB0aGUgbm90ZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpcnN0RmluZFJlc3VsdCA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAobGFzdEZpbmRSZXN1bHQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogLTEsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiAtMX07IC8vIGhhdmVuJ3Qgc2VlbiBmaXJzdCBub3RlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IDAsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBsYXN0RmluZFJlc3VsdH07IC8vIG5vdGVzIGFyZSBqdXN0IHN0YXJ0aW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiBmaXJzdEZpbmRSZXN1bHQsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBsYXN0RmluZFJlc3VsdH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgbm8gdHdvIG5vdGVzIHdpbGwgaGF2ZSB0aGUgc2FtZSB0aW1lIGluIHRoZSBzYW1lIHRyYWNrXHJcbiAgICBmaW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShrZXlUaW1lOiBudW1iZXIsIHRyYWNrOiBOb3RlW10sIHNlYXJjaFN0YXJ0ID0gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzZWFyY2hTdGFydDsgaSA8IHRyYWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFja1tpXS50aW1lSW5TZWNvbmRzID4ga2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVhcmxpZXN0Tm90ZSgpOiBOb3RlIHtcclxuICAgICAgICBsZXQgZWFybGllc3ROb3RlOiBOb3RlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tzW2ldLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFja0VhcmxpZXN0Tm90ZTogTm90ZSA9IHRoaXMudHJhY2tzW2ldWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVhcmxpZXN0Tm90ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXJsaWVzdE5vdGUgPSB0cmFja0VhcmxpZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWFybGllc3ROb3RlLnRpbWVJblNlY29uZHMgPiB0cmFja0VhcmxpZXN0Tm90ZS50aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFybGllc3ROb3RlID0gdHJhY2tFYXJsaWVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVhcmxpZXN0Tm90ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXRlc3ROb3RlKCk6IE5vdGUge1xyXG4gICAgICAgIGxldCBsYXRlc3ROb3RlOiBOb3RlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tzW2ldLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFja0xhdGVzdE5vdGU6IE5vdGUgPSB0aGlzLnRyYWNrc1tpXVt0aGlzLnRyYWNrc1tpXS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXRlc3ROb3RlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGUgPSB0cmFja0xhdGVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhdGVzdE5vdGUudGltZUluU2Vjb25kcyA8IHRyYWNrTGF0ZXN0Tm90ZS50aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90ZSA9IHRyYWNrTGF0ZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGF0ZXN0Tm90ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3RhbE5vdGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrcy5yZWR1Y2UoKHN1bSwgdHJhY2spID0+IHN1bSArIHRyYWNrLmxlbmd0aCwgMCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Tm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RlU2tpbiB7XHJcbiAgICBwdWJsaWMgbm90ZTogcDUuSW1hZ2U7XHJcbiAgICBwdWJsaWMgY29ubmVjdG9yVGlsZTogcDUuSW1hZ2U7XHJcbiAgICBwdWJsaWMgcmVjZXB0b3I6IHA1LkltYWdlO1xyXG5cclxuICAgIC8qIFJlcXVpcmVzIHRoYXQgdGhlIHRhaWwgYmUgaGFsZiB0aGUgaGVpZ2h0IGFuZCBzYW1lIHdpZHRoIGFzIG5vdGUgaW1hZ2UgKi9cclxuICAgIHB1YmxpYyB0YWlsOiBwNS5JbWFnZTtcclxuXHJcbiAgICBwcml2YXRlIHJvdGF0aW9uQW5nbGVzOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4gPSBuZXcgTWFwKFtcclxuICAgICAgICBbNCwgWzI3MCwgMTgwLCAwLCA5MF1dLFxyXG4gICAgICAgIFs2LCBbMjcwLCAzMTUsIDE4MCwgMCwgNDUsIDkwXV1cclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGU6IHA1LkltYWdlLCBjb25uZWN0b3I6IHA1LkltYWdlLCB0YWlsOiBwNS5JbWFnZSwgcmVjZXB0b3I6IHA1LkltYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlID0gbm90ZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclRpbGUgPSBjb25uZWN0b3I7XHJcbiAgICAgICAgdGhpcy50YWlsID0gdGFpbDtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yID0gcmVjZXB0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwdWJsaWMgZHJhd05vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHN3aXRjaCAobm90ZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3SW1hZ2VSb3RhdGVkKHRoaXMubm90ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY2VudGVyWCwgY2VudGVyWSwgbm90ZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RhaWwodHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwdWJsaWMgZHJhd1JlY2VwdG9yKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZHJhd0ltYWdlUm90YXRlZCh0aGlzLnJlY2VwdG9yLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwcml2YXRlIGRyYXdIb2xkQ29ubmVjdG9yKGNlbnRlclg6IG51bWJlciwgZHJhd1N0YXJ0WTogbnVtYmVyLCBkcmF3RW5kWTogbnVtYmVyLCBub3RlU3RhcnRZOiBudW1iZXIsIG5vdGVFbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGxldCBzb3VyY2VXaWR0aCA9IHRoaXMuY29ubmVjdG9yVGlsZS53aWR0aDtcclxuICAgICAgICBsZXQgc291cmNlSGVpZ2h0ID0gdGhpcy5jb25uZWN0b3JUaWxlLmhlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGVkV2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgc2NhbGVkSGVpZ2h0ID0gc2NhbGVkV2lkdGggLyBzb3VyY2VXaWR0aCAqIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBsZXQgY29ubmVjdG9ySGVpZ2h0ID0gTWF0aC5hYnMoZHJhd0VuZFkgLSBkcmF3U3RhcnRZKTtcclxuICAgICAgICBsZXQgZW5kWU9mZnNldCA9IHRoaXMuZ2V0Tm90ZUVuZE9mZnNldChub3RlRW5kWSwgZHJhd0VuZFkpO1xyXG5cclxuICAgICAgICBsZXQgZW5kUGFydGlhbFRpbGVIZWlnaHQgPSBzY2FsZWRIZWlnaHQgLSAoZW5kWU9mZnNldCAlIHNjYWxlZEhlaWdodCk7XHJcbiAgICAgICAgZW5kUGFydGlhbFRpbGVIZWlnaHQgPSBNYXRoLm1pbihlbmRQYXJ0aWFsVGlsZUhlaWdodCwgY29ubmVjdG9ySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQgPSAoY29ubmVjdG9ySGVpZ2h0IC0gZW5kUGFydGlhbFRpbGVIZWlnaHQpICUgc2NhbGVkSGVpZ2h0O1xyXG4gICAgICAgIGxldCBudW1Db21wbGV0ZVRpbGVzID0gTWF0aC5yb3VuZChcclxuICAgICAgICAgICAgKGNvbm5lY3RvckhlaWdodCAtIHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQgLSBlbmRQYXJ0aWFsVGlsZUhlaWdodCkgLyBzY2FsZWRIZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGJsb2NrIGFsbG93cyB1cyB0byB1c2UgdGhlIHNhbWUgZHJhd2luZyBtZXRob2QgZm9yIGJvdGggdXBzY3JvbGwgYW5kIGRvd25zY3JvbGxcclxuICAgICAgICBsZXQgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgdG9wUGFydGlhbFRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCA9IGVuZFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgICAgICB0b3BQYXJ0aWFsVGlsZUhlaWdodCA9IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQgPSBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgICAgICB0b3BQYXJ0aWFsVGlsZUhlaWdodCA9IGVuZFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZHJhd01pblkgPSBNYXRoLm1pbihkcmF3U3RhcnRZLCBkcmF3RW5kWSk7XHJcbiAgICAgICAgbGV0IGRyYXdNYXhZID0gTWF0aC5tYXgoZHJhd1N0YXJ0WSwgZHJhd0VuZFkpO1xyXG4gICAgICAgIGxldCBpc1JldmVyc2VkID0gZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcDtcclxuICAgICAgICBsZXQgaXNEcmF3bkZyb21Cb3R0b20gPSBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgIGlmIChlbmRQYXJ0aWFsVGlsZUhlaWdodCA9PT0gY29ubmVjdG9ySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGlzRHJhd25Gcm9tQm90dG9tID0gIWlzRHJhd25Gcm9tQm90dG9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcmF3UGFydGlhbFRpbGUoY2VudGVyWCwgZHJhd01pblksIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQsIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsXHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0IC8gc2NhbGVkSGVpZ2h0LCAhaXNEcmF3bkZyb21Cb3R0b20sIGlzUmV2ZXJzZWQsIHApO1xyXG4gICAgICAgIHRoaXMuZHJhd0NvbXBsZXRlVGlsZXMoY2VudGVyWCwgZHJhd01pblkgKyB0b3BQYXJ0aWFsVGlsZUhlaWdodCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCxcclxuICAgICAgICAgICAgbnVtQ29tcGxldGVUaWxlcywgaXNSZXZlcnNlZCwgcCk7XHJcbiAgICAgICAgdGhpcy5kcmF3UGFydGlhbFRpbGUoY2VudGVyWCwgZHJhd01heFkgLSBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCxcclxuICAgICAgICAgICAgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQgLyBzY2FsZWRIZWlnaHQsIGlzRHJhd25Gcm9tQm90dG9tLFxyXG4gICAgICAgICAgICBpc1JldmVyc2VkLCBwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdUYWlsKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgaWYgKGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSgxODApO1xyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMudGFpbCwgLW5vdGVTaXplIC8gMiwgLW5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplKTtcclxuICAgICAgICAgICAgLy8gcC5pbWFnZSh0aGlzLnRhaWwsIC1ub3RlU2l6ZSAvIDIsIC1ub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSAvIDIpO1xyXG4gICAgICAgICAgICBwLnBvcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy50YWlsLCBjZW50ZXJYIC0gbm90ZVNpemUgLyAyLCBjZW50ZXJZIC0gbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUpO1xyXG4gICAgICAgICAgICAvLyBwLmltYWdlKHRoaXMudGFpbCwgY2VudGVyWCAtIG5vdGVTaXplIC8gMiwgY2VudGVyWSAtIG5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplIC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Tm90ZUVuZE9mZnNldChub3RlRW5kWTogbnVtYmVyLCBkcmF3RW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IG5vdGVFbmRZIC0gZHJhd0VuZFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gZHJhd0VuZFkgLSBub3RlRW5kWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgdGhlIHBhcnRpYWwgdGlsZSB0ZXh0dXJlIGZyb20gc3RyZXRjaGluZyB3aGVuIHRoZSBwbGF5ZXIgaGl0cyBhIGhvbGQgZWFybHlcclxuICAgICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCBvZmZzZXQpO1xyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0NvbXBsZXRlVGlsZXMoY2VudGVyWDogbnVtYmVyLCBsZWFzdFk6IG51bWJlciwgc2NhbGVkV2lkdGg6IG51bWJlciwgc2NhbGVkSGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRpbGVzOiBudW1iZXIsIGlzUmV2ZXJzZWQ6IGJvb2xlYW4sIHA6IHA1KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UaWxlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IGxlYXN0WSArIGkgKiBzY2FsZWRIZWlnaHQgKyBzY2FsZWRIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgaWYgKGlzUmV2ZXJzZWQpIHtcclxuICAgICAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1zY2FsZWRIZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UGFydGlhbFRpbGUoY2VudGVyWDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCBzY2FsZWRXaWR0aDogbnVtYmVyLCBzY2FsZWRIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVdpZHRoOiBudW1iZXIsIHNvdXJjZUhlaWdodDogbnVtYmVyLCBoZWlnaHRQZXJjZW50OiBudW1iZXIsIGlzRHJhd25Gcm9tQm90dG9tOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JldmVyc2VkOiBib29sZWFuLCBwOiBwNSkge1xyXG4gICAgICAgIGlmIChoZWlnaHRQZXJjZW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uSGVpZ2h0ID0gaGVpZ2h0UGVyY2VudCAqIHNjYWxlZEhlaWdodDtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRvcExlZnRZICsgZGVzdGluYXRpb25IZWlnaHQgLyAyO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIGlmIChpc1JldmVyc2VkKSB7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0RyYXduRnJvbUJvdHRvbSkgeyAvLyBEcmF3IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1kZXN0aW5hdGlvbkhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25IZWlnaHQsIDAsIHNvdXJjZUhlaWdodCAtIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gRHJhdyBmcm9tIHRoZSB0b3Agb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtZGVzdGluYXRpb25IZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSGVpZ2h0LCAwLCAwLCBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3SW1hZ2VSb3RhdGVkKGltYWdlOiBwNS5JbWFnZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIHRoaXMucm90YXRlKHAsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHAuaW1hZ2UoaW1hZ2UsIC1ub3RlU2l6ZSAvIDIsIC1ub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJvdGF0ZShwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFuZ2xlcy5oYXMobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSh0aGlzLnJvdGF0aW9uQW5nbGVzLmdldChudW1UcmFja3MpW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC5yb3RhdGUodGhpcy5nZXREZWZhdWx0Um90YXRpb25BbmdsZUluRGVncmVlcyh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdFJvdGF0aW9uQW5nbGVJbkRlZ3JlZXModHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcm90YXRpb24gPSAtOTA7XHJcbiAgICAgICAgbGV0IHJvdGF0aW9uUGVyVHJhY2sgPSAzNjAgLyBudW1UcmFja3M7XHJcbiAgICAgICAgaWYgKHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzIC8gMikge1xyXG4gICAgICAgICAgICByb3RhdGlvbiAtPSB0cmFja051bWJlciAqIHJvdGF0aW9uUGVyVHJhY2s7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm90YXRpb24gKz0gKHRyYWNrTnVtYmVyIC0gbnVtVHJhY2tzIC8gMiArIDEpICogcm90YXRpb25QZXJUcmFjaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdGF0aW9uO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTdGVwZmlsZSwgU3RlcGZpbGVTdGF0ZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGUsIEF1ZGlvRmlsZVN0YXRlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcbmltcG9ydCB7UGxheWxpc3RDbGllbnR9IGZyb20gXCIuL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnRcIjtcclxuaW1wb3J0IHtTb25nfSBmcm9tIFwiLi9wbGF5bGlzdF9jbGllbnQvc29uZ1wiO1xyXG5pbXBvcnQge1N3ZlBhcnNlUmVzcG9uc2V9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc3dmXCI7XHJcblxyXG5leHBvcnQgZW51bSBPbmxpbmVQbGF5bGlzdFN0YXRlIHtcclxuICAgIE5PX1BMQVlMSVNULFxyXG4gICAgTE9BRElOR19QTEFZTElTVCxcclxuICAgIFBMQVlMSVNUX1JFQURZLFxyXG4gICAgUExBWUxJU1RfRVJST1IsXHJcbiAgICBMT0FESU5HX1NPTkcsXHJcbiAgICBTT05HX0VSUk9SLFxyXG59XHJcblxyXG5jbGFzcyBEaXNwbGF5YWJsZVNvbmcge1xyXG4gICAgcHJpdmF0ZSBzb25nOiBTb25nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvbmc6IFNvbmcpIHtcclxuICAgICAgICB0aGlzLnNvbmcgPSBzb25nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvbmcuc29uZ0RpZmZpY3VsdHkgKyBcIiBcIiArIHRoaXMuc29uZy5zb25nTmFtZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9ubGluZVBsYXlsaXN0IHtcclxuICAgIHB1YmxpYyBpbmRleFVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwbGF5bGlzdENsaWVudDogUGxheWxpc3RDbGllbnQ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX1BBR0VfU0laRTogbnVtYmVyID0gNTA7XHJcbiAgICBwdWJsaWMgc3RhdGU6IE9ubGluZVBsYXlsaXN0U3RhdGU7XHJcbiAgICBwdWJsaWMgZGlzcGxheWVkUGxheWxpc3Q6IERpc3BsYXlhYmxlU29uZ1tdO1xyXG4gICAgcHJpdmF0ZSBwYWdlTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHBhZ2VTaXplOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuTk9fUExBWUxJU1Q7XHJcbiAgICAgICAgdGhpcy5pbmRleFVybCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5bGlzdENsaWVudCA9IG5ldyBQbGF5bGlzdENsaWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBraWNrT2ZmTG9hZFBsYXlsaXN0KGluZGV4VXJsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1BMQVlMSVNUO1xyXG4gICAgICAgIHRoaXMucGxheWxpc3RDbGllbnQuaW5pdGlhbGl6ZShpbmRleFVybClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5pbml0aWFsaXplRGlzcGxheWVkUGxheWxpc3QoKSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHRoaXMuc3RhdGUgPSBPbmxpbmVQbGF5bGlzdFN0YXRlLlBMQVlMSVNUX0VSUk9SKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVEaXNwbGF5ZWRQbGF5bGlzdCgpIHtcclxuICAgICAgICB0aGlzLnNldFBhZ2UoMCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfUkVBRFlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMga2lja09mZkxvYWRTb25nKGRpc3BsYXllZFNvbmdJbmRleDogbnVtYmVyLCBzdGVwZmlsZTogU3RlcGZpbGUsIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuTE9BRElOR19TT05HO1xyXG4gICAgICAgIGF1ZGlvRmlsZS5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLk5PX0FVRElPX0ZJTEU7XHJcbiAgICAgICAgc3RlcGZpbGUuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLk5PX1NURVBGSUxFO1xyXG4gICAgICAgIHRoaXMucGxheWxpc3RDbGllbnQuZ2V0U3dmKHRoaXMuZ2V0U29uZ0luZGV4KGRpc3BsYXllZFNvbmdJbmRleCkpXHJcbiAgICAgICAgICAgIC50aGVuKChzd2ZQYXJzZVJlc3BvbnNlKSA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU3dmSW50b1N0ZXBmaWxlQW5kQXVkaW9GaWxlKHN3ZlBhcnNlUmVzcG9uc2UsIHN0ZXBmaWxlLCBhdWRpb0ZpbGUpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuU09OR19FUlJPUik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTb25nSW5kZXgoZGlzcGxheWVkU29uZ0luZGV4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gZGlzcGxheWVkU29uZ0luZGV4ICsgdGhpcy5wYWdlU2l6ZSAqIHRoaXMucGFnZU51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRTd2ZJbnRvU3RlcGZpbGVBbmRBdWRpb0ZpbGUoc3dmUGFyc2VSZXNwb25zZTogU3dmUGFyc2VSZXNwb25zZSwgc3RlcGZpbGU6IFN0ZXBmaWxlLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgICAgIHN0ZXBmaWxlLmxvYWRGZnJCZWF0bWFwKHN3ZlBhcnNlUmVzcG9uc2UuY2hhcnREYXRhKTtcclxuICAgICAgICBhdWRpb0ZpbGUubG9hZEJsb2Ioc3dmUGFyc2VSZXNwb25zZS5ibG9iKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0UGFnZSgpIHtcclxuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5wYWdlTnVtYmVyICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXZpb3VzUGFnZSgpIHtcclxuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5wYWdlTnVtYmVyIC0gMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQYWdlKHBhZ2VOdW1iZXI6IG51bWJlciwgcGFnZVNpemU/OiBudW1iZXIpIHtcclxuICAgICAgICBwYWdlU2l6ZSA9IHRoaXMuZ2V0VmFsaWRQYWdlU2l6ZShwYWdlU2l6ZSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRQYWdlTnVtYmVyKHBhZ2VOdW1iZXIsIHBhZ2VTaXplKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWluSW5kZXggPSBwYWdlTnVtYmVyICogcGFnZVNpemU7XHJcbiAgICAgICAgbGV0IG1heEluZGV4ID0gbWluSW5kZXggKyBwYWdlU2l6ZTtcclxuICAgICAgICB0aGlzLmRpc3BsYXllZFBsYXlsaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG1pbkluZGV4OyBpIDwgbWF4SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8IHRoaXMucGxheWxpc3RDbGllbnQuZ2V0UGxheWxpc3QoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkUGxheWxpc3QucHVzaCh0aGlzLmdldERpc3BsYXlhYmxlU29uZyhpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gcGFnZU51bWJlcjtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gcGFnZVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1ZhbGlkUGFnZU51bWJlcihwYWdlTnVtYmVyOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gMCA8PSBwYWdlTnVtYmVyICYmIHBhZ2VOdW1iZXIgPD0gdGhpcy5nZXRNYXhQYWdlTnVtYmVyKHBhZ2VTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlhYmxlU29uZyhzb25nSW5kZXg6IG51bWJlcik6IERpc3BsYXlhYmxlU29uZyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEaXNwbGF5YWJsZVNvbmcodGhpcy5wbGF5bGlzdENsaWVudC5nZXRQbGF5bGlzdCgpW3NvbmdJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VmFsaWRQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHBhZ2VTaXplID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9ubGluZVBsYXlsaXN0LkRFRkFVTFRfUEFHRV9TSVpFO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZVNpemUgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZVNpemUgPiAxMDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNYXhQYWdlTnVtYmVyKHBhZ2VTaXplOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnBsYXlsaXN0Q2xpZW50LmdldFBsYXlsaXN0KCkubGVuZ3RoIC8gcGFnZVNpemUpIC0gMTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtLZXlib2FyZEV2ZW50TWFuYWdlcn0gZnJvbSBcIi4va2V5Ym9hcmRfZXZlbnRfbWFuYWdlclwiO1xyXG5pbXBvcnQge1ByZXZpZXdEaXNwbGF5fSBmcm9tIFwiLi9wcmV2aWV3X2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlcn0gZnJvbSBcIi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge2dlbmVyYXRlUHJldmlld05vdGVzfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Tm90ZVNraW59IGZyb20gXCIuL25vdGVfc2tpblwiO1xyXG5cclxubGV0IHdpZHRoID0gNzIwO1xyXG5sZXQgaGVpZ2h0ID0gNDgwO1xyXG5cclxuZXhwb3J0IGNsYXNzIFA1U2NlbmUge1xyXG4gICAgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBuZXcgcDUoKHA6IHA1KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZW5kZXJlcjogcDUuUmVuZGVyZXI7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjZW50ZXJDYW52YXMoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW5kZXJlci5jZW50ZXIoKTsgLy8gRGlzYWJsZSB0aGlzIGZvciBub3cgdG8gbWFrZSBlbWJlZGRpbmcgd29ya1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwubm90ZVNraW4gPSBuZXcgTm90ZVNraW4oXHJcbiAgICAgICAgICAgICAgICAgICAgcC5sb2FkSW1hZ2UoXCIuLi9hc3NldHMvYXJyb3dfYmx1ZV92My5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcC5sb2FkSW1hZ2UoXCIuLi9hc3NldHMvY29ubmVjdG9yX3RpbGVfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy90YWlsX3NxdWFyZS5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcC5sb2FkSW1hZ2UoXCIuLi9hc3NldHMvYXJyb3dfcmVjZXB0b3IucG5nXCIpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQgPSBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9wbGF5X2Zyb21fZmlsZV9iYWNrZ3JvdW5kLmpwZ1wiKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5vcHRpb25zQmFja2dyb3VuZCA9IGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwLnNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIgPSBwLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIgPSBuZXcgS2V5Ym9hcmRFdmVudE1hbmFnZXIocCk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucHJldmlld0Rpc3BsYXkgPSBuZXcgUHJldmlld0Rpc3BsYXkoZ2VuZXJhdGVQcmV2aWV3Tm90ZXMoNCksIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7IC8vIE1ha2VzIHRoZSBjYW52YXMgYmUgYWJsZSB0byBmaWxsIHRoZSB3aG9sZSBicm93c2VyIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgY2VudGVyQ2FudmFzKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwLmRyYXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5kcmF3KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwLndpbmRvd1Jlc2l6ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge1BsYXlGcm9tRmlsZX0gZnJvbSBcIi4vcGFnZXMvcGxheV9mcm9tX2ZpbGVcIjtcclxuaW1wb3J0IHtPcHRpb25zfSBmcm9tIFwiLi9wYWdlcy9vcHRpb25zXCI7XHJcbmltcG9ydCB7UGxheX0gZnJvbSBcIi4vcGFnZXMvcGxheVwiO1xyXG5pbXBvcnQge1Jlc3VsdHN9IGZyb20gXCIuL3BhZ2VzL3Jlc3VsdHNcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge1BsYXlGcm9tT25saW5lfSBmcm9tIFwiLi9wYWdlcy9wbGF5X2Zyb21fb25saW5lXCI7XHJcblxyXG5leHBvcnQgZW51bSBQQUdFUyB7XHJcbiAgICBQTEFZX0ZST01fRklMRSxcclxuICAgIE9QVElPTlMsXHJcbiAgICBQTEFZLFxyXG4gICAgUkVTVUxUUyxcclxuICAgIFBMQVlfRlJPTV9PTkxJTkUsXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYWdlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjdXJyZW50UGFnZTogUEFHRVMgPSBQQUdFUy5QTEFZX0ZST01fRklMRTtcclxuICAgIHByaXZhdGUgc3RhdGljIHJldHVyblBhZ2U6IFBBR0VTO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0Q3VycmVudFBhZ2UocGFnZTogUEFHRVMpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSAhPT0gUEFHRVMuUExBWSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcclxuICAgICAgICBET01XcmFwcGVyLmNsZWFyUmVnaXN0cnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJldHVybigpIHtcclxuICAgICAgICB0aGlzLnNldEN1cnJlbnRQYWdlKHRoaXMucmV0dXJuUGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJyZW50UGFnZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVlfRlJPTV9GSUxFOlxyXG4gICAgICAgICAgICAgICAgUGxheUZyb21GaWxlLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLk9QVElPTlM6XHJcbiAgICAgICAgICAgICAgICBPcHRpb25zLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVk6XHJcbiAgICAgICAgICAgICAgICBQbGF5LmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlJFU1VMVFM6XHJcbiAgICAgICAgICAgICAgICBSZXN1bHRzLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVlfRlJPTV9PTkxJTkU6XHJcbiAgICAgICAgICAgICAgICBQbGF5RnJvbU9ubGluZS5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgcGFnZTogXCIgKyBnbG9iYWwuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4uL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtcclxuICAgIGJvb2xlYW5Ub1llc05vLFxyXG4gICAgY3JlYXRlTGFiZWxlZElucHV0LFxyXG4gICAgY3JlYXRlTGFiZWxlZFNlbGVjdCxcclxuICAgIGNyZWF0ZUxhYmVsZWRUZXh0QXJlYSwgY3JlYXRlVXNlcklucHV0LFxyXG4gICAgZHJhd0hlYWRpbmcsXHJcbiAgICBzZXRFbGVtZW50VG9Cb3R0b20sXHJcbiAgICBZZXNObywgeWVzTm9Ub0Jvb2xlYW5cclxufSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ3NVaX0gZnJvbSBcIi4uL2tleV9iaW5kaW5nc191aVwiO1xyXG5pbXBvcnQge1RpY2tlciwgVGlja2VyU3RhdGV9IGZyb20gXCIuLi90aWNrZXJcIjtcclxuaW1wb3J0IHtnZXRFbnVtLCBnZXRGbG9hdH0gZnJvbSBcIi4uL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPcHRpb25zIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgT1BUSU9OU19DTEFTUzogc3RyaW5nID0gXCJvcHRpb25zXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX1RJQ0tFUl9NRVNTQUdFID1cclxuICAgICAgICBcIkFsbCB0aGUgb3B0aW9ucyEgQ2xpY2sgYW4gb3B0aW9uIHRvIHNob3cgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBpdC5cIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5vcHRpb25zQmFja2dyb3VuZCk7XHJcbiAgICAgICAgZHJhd0hlYWRpbmcoKTtcclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbERpdiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgfSwgXCJzY3JvbGxEaXZcIik7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXYuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhcIm9wdGlvbnMtc2Nyb2xsLWRpdlwiKTtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuYWRkQ2xhc3MoT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGxldCBjYW52YXNQb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0gcC5fcmVuZGVyZXIucG9zaXRpb24oKTtcclxuICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5wb3NpdGlvbihjYW52YXNQb3NpdGlvbi54ICsgMzM1LCBjYW52YXNQb3NpdGlvbi55ICsgNDUpO1xyXG5cclxuICAgICAgICBsZXQgcmVzZXRDb25maWdCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlJlc2V0IFRvIERlZmF1bHRcIik7XHJcbiAgICAgICAgfSwgXCJyZXNldENvbmZpZ0J1dHRvblwiKTtcclxuICAgICAgICBpZiAoIXJlc2V0Q29uZmlnQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgcmVzZXRDb25maWdCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKFwicmVzZXQtY29uZmlnXCIpO1xyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnID0gbmV3IENvbmZpZyh7fSk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgICAgIEtleUJpbmRpbmdzVWkucmVzZXROdW1UcmFja3MoKTtcclxuICAgICAgICAgICAgICAgIEtleUJpbmRpbmdzVWkucmVnZW5lcmF0ZVByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgIERPTVdyYXBwZXIuY2xlYXJSZWdpc3RyeSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCgpID0+IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlBhdXNlIGF0IFN0YXJ0IChzZWMpXCIsXHJcbiAgICAgICAgICAgIFwicGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXRcIiwgZ2xvYmFsLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkUGF1c2VBdFN0YXJ0LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BhdXNlQXRTdGFydEluZm8uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93UGF1c2VBdFN0YXJ0RXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzID0gZ2V0RmxvYXQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCgpID0+IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlNjcm9sbCBTcGVlZCAocHgvc2VjKVwiLFxyXG4gICAgICAgICAgICBcInNjcm9sbFNwZWVkSW5wdXRcIiwgZ2xvYmFsLmNvbmZpZy5waXhlbHNQZXJTZWNvbmQudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkU2Nyb2xsU3BlZWQuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93U2Nyb2xsU3BlZWRJbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Njcm9sbFNwZWVkRXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGl4ZWxzUGVyU2Vjb25kID0gZ2V0RmxvYXQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCgpID0+IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJTY3JvbGwgRGlyZWN0aW9uXCIsXHJcbiAgICAgICAgICAgIFwic2Nyb2xsRGlyZWN0aW9uU2VsZWN0XCIsIFNjcm9sbERpcmVjdGlvbiwgZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24sIE9wdGlvbnMuT1BUSU9OU19DTEFTUyksXHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZFNjcm9sbERpcmVjdGlvbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dTY3JvbGxEaXJlY3Rpb25JbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Njcm9sbERpcmVjdGlvbkVycm9yLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9IGdldEVudW0oaW5wdXQsIFNjcm9sbERpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjcmVhdGVVc2VySW5wdXQoKCkgPT4gY3JlYXRlTGFiZWxlZElucHV0KFwiUmVjZXB0b3IgUG9zaXRpb24gKCUpXCIsXHJcbiAgICAgICAgICAgIFwicmVjZXB0b3JQb3NpdGlvbklucHV0XCIsIGdsb2JhbC5jb25maWcucmVjZXB0b3JZUGVyY2VudC50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpLFxyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRSZWNlcHRvclBvc2l0aW9uLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1JlY2VwdG9yUG9zaXRpb25JbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1JlY2VwdG9yUG9zaXRpb25FcnJvci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5yZWNlcHRvcllQZXJjZW50ID0gZ2V0RmxvYXQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCgpID0+IGNyZWF0ZUxhYmVsZWRJbnB1dChcIkFjY3VyYWN5IE9mZnNldCAobXMpXCIsXHJcbiAgICAgICAgICAgIFwiYWRkaXRpb25hbE9mZnNldElucHV0XCIsIChnbG9iYWwuY29uZmlnLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgKiAxMDAwKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBPcHRpb25zLk9QVElPTlNfQ0xBU1MpLFxyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRBZGRpdGlvbmFsT2Zmc2V0LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FkZGl0aW9uYWxPZmZzZXRJbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FkZGl0aW9uYWxPZmZzZXRFcnJvci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzID0gZ2V0RmxvYXQoaW5wdXQpIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGNyZWF0ZVVzZXJJbnB1dCgoKSA9PiBjcmVhdGVMYWJlbGVkVGV4dEFyZWEoXCJBY2N1cmFjeSBTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICBcImFjY3VyYWN5U2V0dGluZ3NJbnB1dFwiLCBKU09OLnN0cmluZ2lmeShnbG9iYWwuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MsIG51bGwsIDMpLFxyXG4gICAgICAgICAgICBPcHRpb25zLk9QVElPTlNfQ0xBU1MpLFxyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRBY2N1cmFjeVNldHRpbmdzLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FjY3VyYWN5U2V0dGluZ3NJbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FjY3VyYWN5U2V0dGluZ3NFcnJvci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzID0gcGFyc2VBY2N1cmFjeVNldHRpbmdzSnNvbihTdHJpbmcoaW5wdXQpKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGNyZWF0ZVVzZXJJbnB1dCgoKSA9PiBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiQWNjdXJhY3kgRmxhc2hcIixcclxuICAgICAgICAgICAgXCJhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdFwiLCBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkKSxcclxuICAgICAgICAgICAgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkQWNjdXJhY3lGbGFzaC5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dBY2N1cmFjeUZsYXNoSW5mby5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dBY2N1cmFjeUZsYXNoRXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCA9IHllc05vVG9Cb29sZWFuKGdldEVudW0oaW5wdXQsIFllc05vKSk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjcmVhdGVVc2VySW5wdXQoKCkgPT4gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IFBhcnRpY2xlc1wiLFxyXG4gICAgICAgICAgICBcImFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdFwiLCBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCksXHJcbiAgICAgICAgICAgIE9wdGlvbnMuT1BUSU9OU19DTEFTUyksXHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZEFjY3VyYWN5UGFydGljbGVzLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FjY3VyYWN5UGFydGljbGVzSW5mby5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dBY2N1cmFjeVBhcnRpY2xlc0Vycm9yLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkID0geWVzTm9Ub0Jvb2xlYW4oZ2V0RW51bShpbnB1dCwgWWVzTm8pKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGNyZWF0ZVVzZXJJbnB1dCgoKSA9PiBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiQWNjdXJhY3kgVGV4dFwiLFxyXG4gICAgICAgICAgICBcImFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3RcIiwgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVRleHRFbmFibGVkKSxcclxuICAgICAgICAgICAgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkQWNjdXJhY3lUZXh0LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FjY3VyYWN5VGV4dEluZm8uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93QWNjdXJhY3lUZXh0RXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVRleHRFbmFibGVkID0geWVzTm9Ub0Jvb2xlYW4oZ2V0RW51bShpbnB1dCwgWWVzTm8pKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGNyZWF0ZVVzZXJJbnB1dCgoKSA9PiBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiSG9sZCBQYXJ0aWNsZXNcIixcclxuICAgICAgICAgICAgXCJob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdFwiLCBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSxcclxuICAgICAgICAgICAgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkSG9sZFBhcnRpY2xlcy5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dIb2xkUGFydGljbGVzSW5mby5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dIb2xkUGFydGljbGVzRXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCA9IHllc05vVG9Cb29sZWFuKGdldEVudW0oaW5wdXQsIFllc05vKSk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjcmVhdGVVc2VySW5wdXQoKCkgPT4gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkhvbGQgR2xvd1wiLFxyXG4gICAgICAgICAgICBcImhvbGRHbG93RW5hYmxlZFNlbGVjdFwiLCBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyksXHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZEhvbGRHbG93LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hvbGRHbG93SW5mby5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dIb2xkR2xvd0Vycm9yLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkID0geWVzTm9Ub0Jvb2xlYW4oZ2V0RW51bShpbnB1dCwgWWVzTm8pKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIEtleUJpbmRpbmdzVWkuY3JlYXRlKHNjcm9sbERpdi5lbGVtZW50LCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG5cclxuICAgICAgICBnbG9iYWwucHJldmlld0Rpc3BsYXkuZHJhdygpO1xyXG5cclxuICAgICAgICBsZXQgdGlja2VyID0gVGlja2VyLmNyZWF0ZSh0aGlzLkRFRkFVTFRfVElDS0VSX01FU1NBR0UsIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0RWxlbWVudFRvQm90dG9tKHRpY2tlci5lbGVtZW50LCA0LjIsIDEyLCA4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkUGF1c2VBdFN0YXJ0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0Zsb2F0R3JlYXRlclRoYW5PckVxdWFsWmVybyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93UGF1c2VBdFN0YXJ0SW5mbygpOiB2b2lkIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIkRlbGF5IHRoZSBzdGFydCBvZiB0aGUgc29uZyB0byBnaXZlIHlvdXJzZWxmIG1vcmUgdGltZSB0byBnZXQgcmVhZHkuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dQYXVzZUF0U3RhcnRFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dOdW1iZXJOb3RHcmVhdGVyVGhhbk9yRXF1YWxaZXJvRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkU2Nyb2xsU3BlZWQodmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzRmxvYXRHcmVhdGVyVGhhbk9yRXF1YWxaZXJvKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dTY3JvbGxTcGVlZEluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJUaGUgbW92ZW1lbnQgc3BlZWQgb2YgdGhlIG5vdGVzLiBIaWdoZXIgdmFsdWVzIHdpbGwgbWFrZSB0aGUgbm90ZXMgbG9vayBmYXJ0aGVyIGFwYXJ0LlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93U2Nyb2xsU3BlZWRFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dOdW1iZXJOb3RHcmVhdGVyVGhhbk9yRXF1YWxaZXJvRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkU2Nyb2xsRGlyZWN0aW9uKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgZW51bVZhbHVlOiBTY3JvbGxEaXJlY3Rpb24gPSBnZXRFbnVtKHZhbHVlLCBTY3JvbGxEaXJlY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBlbnVtVmFsdWUgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dTY3JvbGxEaXJlY3Rpb25JbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiQ29udHJvbHMgd2hpY2ggd2F5IHRoZSBhcnJvd3MgZ28uXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dTY3JvbGxEaXJlY3Rpb25FcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dTZWxlY3RFcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRSZWNlcHRvclBvc2l0aW9uKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dSZWNlcHRvclBvc2l0aW9uSW5mbygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgb3Bwb3NpdGVEaXJlY3Rpb246IHN0cmluZztcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5Eb3duKSB7XHJcbiAgICAgICAgICAgIG9wcG9zaXRlRGlyZWN0aW9uID0gXCJ1cFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9wcG9zaXRlRGlyZWN0aW9uID0gXCJkb3duXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiSW5jcmVhc2UgdGhpcyB2YWx1ZSB0byBtb3ZlIHRoZSByZWNlcHRvcnMgXCIgKyBvcHBvc2l0ZURpcmVjdGlvbiArIFwiLlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93UmVjZXB0b3JQb3NpdGlvbkVycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd1ZhbHVlTm90TnVtYmVyRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkQWRkaXRpb25hbE9mZnNldCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93QWRkaXRpb25hbE9mZnNldEluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJTaGlmdHMgdGhlIHRpbWUgcG9zaXRpb24gb2YgYWxsIHRoZSBub3Rlcy4gVXNlIHRoaXMgdG8gaGVscCBzeW5jaHJvbml6ZSB0aGUgbXVzaWMuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dBZGRpdGlvbmFsT2Zmc2V0RXJyb3IoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93VmFsdWVOb3ROdW1iZXJFcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRBY2N1cmFjeVNldHRpbmdzKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgc3RyaW5nVmFsdWU6IHN0cmluZyA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24oc3RyaW5nVmFsdWUpICE9PSBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0FjY3VyYWN5U2V0dGluZ3NJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiQ29udHJvbHMgd2hhdCBoYXBwZW5zIHdoZW4geW91IGhpdCBhIG5vdGUgdG9vIGVhcmx5LCB0b28gbGF0ZSwgb3IgZXhhY3RseSByaWdodC5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0FjY3VyYWN5U2V0dGluZ3NFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIkVycm9yOiB1bmFibGUgdG8gcGFyc2UgdGhlIEpTT04gdGV4dC5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuRVJST1IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRBY2N1cmFjeUZsYXNoKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkWWVzTm8odmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0FjY3VyYWN5Rmxhc2hJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiQSBmbGFzaCBlZmZlY3QgdGhhdCBzaG93cyBvbiB0aGUgcmVjZXB0b3JzIHdoZW4geW91IGhpdCBhIG5vdGUuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dBY2N1cmFjeUZsYXNoRXJyb3IoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93U2VsZWN0RXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkQWNjdXJhY3lQYXJ0aWNsZXModmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRZZXNObyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93QWNjdXJhY3lQYXJ0aWNsZXNJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiUGFydGljbGVzIHRoYXQgc2hvb3Qgb3V0IG9mIHRoZSByZWNlcHRvcnMgd2hlbiB5b3UgaGl0IGEgbm90ZS5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0FjY3VyYWN5UGFydGljbGVzRXJyb3IoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93U2VsZWN0RXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkQWNjdXJhY3lUZXh0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkWWVzTm8odmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0FjY3VyYWN5VGV4dEluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJUZXh0IHRoYXQgcG9wcyB1cCB0ZWxsaW5nIHlvdSB3aGF0IGFjY3VyYWN5IHlvdSBoaXQgYSBub3RlIHdpdGguXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dBY2N1cmFjeVRleHRFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dTZWxlY3RFcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRIb2xkUGFydGljbGVzKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkWWVzTm8odmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0hvbGRQYXJ0aWNsZXNJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiUGFydGljbGVzIHRoYXQgc2hvb3Qgb3V0IHdoaWxlIHlvdSdyZSBob2xkaW5nIGEgbm90ZS5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0hvbGRQYXJ0aWNsZXNFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dTZWxlY3RFcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRIb2xkR2xvdyh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZFllc05vKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dIb2xkR2xvd0luZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJBIGdsb3cgZWZmZWN0IG9uIHRoZSByZWNlcHRvcnMgdGhhdCBzaG93cyB3aGVuIHlvdSdyZSBob2xkaW5nIGEgbm90ZS5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0hvbGRHbG93RXJyb3IoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93U2VsZWN0RXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc0Zsb2F0R3JlYXRlclRoYW5PckVxdWFsWmVybyh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG51bWJlclZhbHVlOiBudW1iZXIgPSBnZXRGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihudW1iZXJWYWx1ZSkgJiYgbnVtYmVyVmFsdWUgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93TnVtYmVyTm90R3JlYXRlclRoYW5PckVxdWFsWmVyb0Vycm9yKCkge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiRXJyb3I6IG11c3QgYmUgYSBudW1iZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8uXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLkVSUk9SKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkWWVzTm8odmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWU6IFllc05vID0gZ2V0RW51bSh2YWx1ZSwgWWVzTm8pO1xyXG4gICAgICAgIHJldHVybiBlbnVtVmFsdWUgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93U2VsZWN0RXJyb3IoKSB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJFcnJvcjogaHVoLi4uIG5vdCBzdXJlIGhvdyB5b3UgZGlkIHRoYXQuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLkVSUk9SKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93VmFsdWVOb3ROdW1iZXJFcnJvcigpIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIkVycm9yOiBtdXN0IGJlIGEgbnVtYmVyLlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5FUlJPUik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNGbG9hdCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG51bWJlclZhbHVlOiBudW1iZXIgPSBnZXRGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihudW1iZXJWYWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24oYWNjdXJhY3lTZXR0aW5nc0pzb246IHN0cmluZyk6IEFjY3VyYWN5W10ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IFtdXHJcbiAgICAgICAgbGV0IGpzb25BcnJheTogQWNjdXJhY3lbXSA9IEpTT04ucGFyc2UoYWNjdXJhY3lTZXR0aW5nc0pzb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGpzb25BcnJheVtpXTtcclxuICAgICAgICAgICAgLy8gdGhpcyBmYWlscyBpZiB0aGUgdXNlciBnYXZlIHRoZSB3cm9uZyBpbnB1dFxyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzLnB1c2gobmV3IEFjY3VyYWN5KGFjY3VyYWN5Lm5hbWUsIGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG4iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2UuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG4gICAgICAgIGdsb2JhbC5wbGF5aW5nRGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7XHJcbiAgICBkcmF3SGVhZGluZyxcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlLFxyXG4gICAgY3JlYXRlRmlsZUlucHV0LFxyXG4gICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2LCBmaXhSYWRpb0RpdkVsZW1lbnQsIHN0eWxlUmFkaW9PcHRpb25zXHJcbn0gZnJvbSBcIi4uL3VpX3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge1N0ZXBmaWxlLCBTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGUsIEF1ZGlvRmlsZVN0YXRlfSBmcm9tIFwiLi4vYXVkaW9fZmlsZVwiO1xyXG5pbXBvcnQge2dldE1vZGVPcHRpb25zRm9yRGlzcGxheSwgaW5pdFBsYXlpbmdEaXNwbGF5LCBpc0ZpbGVzUmVhZHl9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7TW9kZX0gZnJvbSBcIi4uL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IHBsYXlGcm9tRmlsZVN0ZXBmaWxlID0gbmV3IFN0ZXBmaWxlKCk7XHJcbmNvbnN0IHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF5RnJvbUZpbGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZX0ZST01fRklMRV9DTEFTUzogc3RyaW5nID0gXCJwbGF5LWZyb20tZmlsZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBNT0RFX1JBRElPX0lEOiBzdHJpbmcgPSBcIm1vZGVSYWRpb1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCk7XHJcblxyXG4gICAgICAgIGxldCBzdGVwZmlsZUlucHV0ID0gY3JlYXRlRmlsZUlucHV0KGdldFN0ZXBmaWxlSW5wdXRMYWJlbCgpLCBcIkNob29zZSBTdGVwZmlsZSAoLnNtKVwiLCBcInN0ZXBmaWxlSW5wdXRcIixcclxuICAgICAgICAgICAgbG9hZFN0ZXBmaWxlQW5kVXBkYXRlTW9kZU9wdGlvbnMsIFBsYXlGcm9tRmlsZS5QTEFZX0ZST01fRklMRV9DTEFTUykuZWxlbWVudDtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShzdGVwZmlsZUlucHV0LCAwLjQzLCAwLjMsIDI2OCwgMzQpO1xyXG5cclxuICAgICAgICBsZXQgYXVkaW9GaWxlSW5wdXQgPSBjcmVhdGVGaWxlSW5wdXQoZ2V0QXVkaW9GaWxlSW5wdXRMYWJlbCgpLCBcIkNob29zZSBBdWRpbyBGaWxlICgubXAzLCAub2dnKVwiLCBcImF1ZGlvRmlsZUlucHV0XCIsXHJcbiAgICAgICAgICAgIHBsYXlGcm9tRmlsZUF1ZGlvRmlsZS5sb2FkRmlsZS5iaW5kKHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSksIFBsYXlGcm9tRmlsZS5QTEFZX0ZST01fRklMRV9DTEFTUykuZWxlbWVudDtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShhdWRpb0ZpbGVJbnB1dCwgMC40MywgMC40NSwgMzI1LCAzNCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5QnV0dG9uSWQgPSBcInBsYXlCdXR0b25cIjtcclxuICAgICAgICBpZiAoaXNGaWxlc1JlYWR5KHBsYXlGcm9tRmlsZVN0ZXBmaWxlLCBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUpKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlUmFkaW8gPSBkcmF3TW9kZVNlbGVjdChwLCBQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RlUmFkaW8udmFsdWUoKSAhPT0gXCJcIikgeyAvLyBpZiB1c2VyIGhhcyBzZWxlY3RlZCBhIG1vZGVcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlBsYXlcIik7XHJcbiAgICAgICAgICAgICAgICB9LCBwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuODgsIDYwLCAzNCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RlOiBNb2RlID0gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZpbmlzaFBhcnNpbmcoc2VsZWN0ZWRNb2RlLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFBsYXlpbmdEaXNwbGF5KHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZ1bGxQYXJzZS50cmFja3MsIHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheUJ1dHRvbklkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRTdGVwZmlsZUFuZFVwZGF0ZU1vZGVPcHRpb25zKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgIHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmxvYWRGaWxlLmNhbGwocGxheUZyb21GaWxlU3RlcGZpbGUsIGZpbGUpO1xyXG4gICAgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMgPSB1bmRlZmluZWQ7XHJcbiAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFBsYXlGcm9tRmlsZS5NT0RFX1JBRElPX0lEKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd01vZGVTZWxlY3QocDogcDUsIHVuaXF1ZUlkOiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgaWYgKGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucyA9IGdldE1vZGVPcHRpb25zRm9yRGlzcGxheShwbGF5RnJvbUZpbGVTdGVwZmlsZS5wYXJ0aWFsUGFyc2UubW9kZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtb2RlUmFkaW9DbGFzcyA9IFwibW9kZS1yYWRpb1wiXHJcbiAgICBsZXQgbW9kZVJhZGlvT3B0aW9uQ2xhc3MgPSBcIm1vZGUtcmFkaW8tb3B0aW9uXCI7XHJcbiAgICBsZXQgbW9kZVJhZGlvQ3JlYXRlUmVzdWx0ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVJhZGlvKCk7XHJcbiAgICB9LCB1bmlxdWVJZCk7XHJcbiAgICBsZXQgbW9kZVJhZGlvID0gbW9kZVJhZGlvQ3JlYXRlUmVzdWx0LmVsZW1lbnQ7XHJcbiAgICBpZiAoIW1vZGVSYWRpb0NyZWF0ZVJlc3VsdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgbW9kZVJhZGlvLmlkKFwicmFkaW8tZGl2XCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vZGUgPSBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9uc1tpXTtcclxuICAgICAgICAgICAgbGV0IHJhZGlvTGFiZWwgPSBtb2RlLnR5cGUgKyBcIiwgXCIgKyBtb2RlLmRpZmZpY3VsdHkgKyBcIiwgXCIgKyBtb2RlLm1ldGVyO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCByYWRpb09wdGlvbiA9IG1vZGVSYWRpby5vcHRpb24ocmFkaW9MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSB0aGlzIHdheSBiZWNhdXNlIHRoZSB0d28tYXJndW1lbnQgLm9wdGlvbiBtZXRob2Qgd2Fzbid0IHdvcmtpbmdcclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBhY2Nlc3MgdGhlIHNlbGVjdGVkIG1vZGVcclxuICAgICAgICAgICAgcmFkaW9PcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBzdHlsZSBpcyBiZWluZyBzZXQgb24gdGhlIGRpdiBjb250YWluaW5nIHRoZSByYWRpbyBlbGVtZW50cyB0byBtYWtlIGl0IGEgc2Nyb2xsYWJsZSBib3hcclxuICAgICAgICBtb2RlUmFkaW8uYWRkQ2xhc3MobW9kZVJhZGlvQ2xhc3MpO1xyXG4gICAgICAgIG1vZGVSYWRpby5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocCwgbW9kZVJhZGlvKTtcclxuICAgICAgICBmaXhSYWRpb0RpdkVsZW1lbnQobW9kZVJhZGlvKTtcclxuICAgICAgICBzdHlsZVJhZGlvT3B0aW9ucyhwLCBtb2RlUmFkaW8sIFttb2RlUmFkaW9PcHRpb25DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShtb2RlUmFkaW8sIDAuNSwgMC43LCAzMDIsIDEyMCk7XHJcbiAgICBwLnBvcCgpO1xyXG4gICAgcmV0dXJuIG1vZGVSYWRpbztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbzogcDUuRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zW21vZGVSYWRpby52YWx1ZSgpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RlcGZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLk5PX1NURVBGSUxFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJObyBmaWxlIGNob3NlblwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFN0ZXBmaWxlU3RhdGUuRE9ORV9SRUFESU5HOlxyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEOlxyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBdWRpb0ZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKHBsYXlGcm9tRmlsZUF1ZGlvRmlsZS5zdGF0ZSkge1xyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTpcclxuICAgICAgICAgICAgcmV0dXJuIFwiTm8gZmlsZSBjaG9zZW5cIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5ET05FX1JFQURJTkc6XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcocGxheUZyb21GaWxlQXVkaW9GaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKGZ1bGxGaWxlTmFtZTogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlcikge1xyXG4gICAgaWYgKGZ1bGxGaWxlTmFtZS5sZW5ndGggPD0gbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bGxGaWxlTmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdWxsRmlsZU5hbWUuc3Vic3RyKDAsIG1heExlbmd0aCAtIDExKSArXHJcbiAgICAgICAgXCIuLi5cIiArXHJcbiAgICAgICAgZnVsbEZpbGVOYW1lLnN1YnN0cihmdWxsRmlsZU5hbWUubGVuZ3RoIC0gMTApO1xyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtcclxuICAgIGNyZWF0ZUxhYmVsZWRJbnB1dCxcclxuICAgIGRyYXdIZWFkaW5nLFxyXG4gICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2LFxyXG4gICAgZml4UmFkaW9EaXZFbGVtZW50LFxyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUsXHJcbiAgICBzdHlsZVJhZGlvT3B0aW9uc1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7T25saW5lUGxheWxpc3QsIE9ubGluZVBsYXlsaXN0U3RhdGV9IGZyb20gXCIuLi9vbmxpbmVfcGxheWxpc3RcIjtcclxuaW1wb3J0IHtpbml0UGxheWluZ0Rpc3BsYXksIGlzRmlsZXNSZWFkeX0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4uL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi4vYXVkaW9fZmlsZVwiO1xyXG5cclxuY29uc3QgcGxheUZyb21PbmxpbmVTdGVwZmlsZSA9IG5ldyBTdGVwZmlsZSgpO1xyXG5jb25zdCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuXHJcbi8vIFRoaXMgcHJldmVudHMgbG9hZGluZyBwcmV2aW91cyBzb25nIHVwb24gcmV0dXJuaW5nIHRvIGEgbG9hZGVkIHBsYXlsaXN0XHJcbmxldCBpc1N3ZkxvYWRTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheUZyb21PbmxpbmUge1xyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZX0ZST01fT05MSU5FX0NMQVNTOiBzdHJpbmcgPSBcInBsYXktZnJvbS1vbmxpbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZHJhd0hlYWRpbmcoKTtcclxuICAgICAgICBsZXQgb25saW5lUGxheWxpc3Q6IE9ubGluZVBsYXlsaXN0ID0gPE9ubGluZVBsYXlsaXN0PiBnbG9iYWwub25saW5lUGxheWxpc3Q7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHVybElucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiRW5naW5lIFVSTFwiLCBcInVybElucHV0XCIsIG9ubGluZVBsYXlsaXN0LmluZGV4VXJsLFxyXG4gICAgICAgICAgICBQbGF5RnJvbU9ubGluZS5QTEFZX0ZST01fT05MSU5FX0NMQVNTKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IHVybElucHV0RGl2ID0gbmV3IHA1LkVsZW1lbnQodXJsSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUodXJsSW5wdXREaXYsIDAuNTAsIDAuMjEsIDYwMCwgMzgpO1xyXG5cclxuICAgICAgICBsZXQgbG9hZEJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiTG9hZFwiKTtcclxuICAgICAgICB9LCBcImxvYWRCdXR0b25cIik7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUobG9hZEJ1dHRvbi5lbGVtZW50LCAwLjg1LCAwLjIxNSwgNjIsIDMzKTtcclxuICAgICAgICBpZiAoIWxvYWRCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKFBsYXlGcm9tT25saW5lLlBMQVlfRlJPTV9PTkxJTkVfQ0xBU1MpO1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gdXJsSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRCdXR0b24uZWxlbWVudC5hdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ubGluZVBsYXlsaXN0LmtpY2tPZmZMb2FkUGxheWxpc3QodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9ubGluZVBsYXlsaXN0LnN0YXRlICE9PSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfUExBWUxJU1QpIHtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvbmxpbmVQbGF5bGlzdC5zdGF0ZSA9PT0gT25saW5lUGxheWxpc3RTdGF0ZS5QTEFZTElTVF9SRUFEWSB8fFxyXG4gICAgICAgICAgICBvbmxpbmVQbGF5bGlzdC5zdGF0ZSA9PT0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkcpIHtcclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0TWVudUlkID0gXCJwbGF5bGlzdE1lbnVcIlxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RNZW51ID0gZHJhd1JhZGlvTWVudShwLCBwbGF5bGlzdE1lbnVJZCwgb25saW5lUGxheWxpc3QuZGlzcGxheWVkUGxheWxpc3QpO1xyXG4gICAgICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5bGlzdE1lbnUsIDAuNSwgMC42MiwgNTAwLCAyMDApO1xyXG5cclxuICAgICAgICAgICAgZHJhd1BhZ2VDb250cm9scyhwLCBwbGF5bGlzdE1lbnVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWxpc3RNZW51LnZhbHVlKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsb2FkQW5kUGxheUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJMb2FkIEFuZCBQbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgXCJsb2FkQW5kUGxheUJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQsIDAuNSwgMC44OCwgMTE4LCAzNCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFsb2FkQW5kUGxheUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwbGF5bGlzdE1lbnUudmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkQW5kUGxheUJ1dHRvbi5lbGVtZW50LmF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmxpbmVQbGF5bGlzdC5raWNrT2ZmTG9hZFNvbmcodmFsdWUsIHBsYXlGcm9tT25saW5lU3RlcGZpbGUsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU3dmTG9hZFN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob25saW5lUGxheWxpc3Quc3RhdGUgIT09IE9ubGluZVBsYXlsaXN0U3RhdGUuTE9BRElOR19TT05HKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRmlsZXNSZWFkeShwbGF5RnJvbU9ubGluZVN0ZXBmaWxlLCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSkgJiYgaXNTd2ZMb2FkU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRQbGF5aW5nRGlzcGxheShwbGF5RnJvbU9ubGluZVN0ZXBmaWxlLmZ1bGxQYXJzZS50cmFja3MsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5QTEFZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFwibG9hZEFuZFBsYXlCdXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBpc1N3ZkxvYWRTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChcInBsYXlsaXN0TWVudVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBNZW51SXRlbSB7XHJcbiAgICB0b1N0cmluZzogKCkgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UmFkaW9NZW51KHA6IHA1LCB1bmlxdWVJZDogc3RyaW5nLCBpdGVtczogTWVudUl0ZW1bXSk6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IG1lbnVDbGFzcyA9IFwicGxheWxpc3QtcmFkaW9cIlxyXG4gICAgbGV0IG1lbnVJdGVtQ2xhc3MgPSBcInBsYXlsaXN0LXJhZGlvLW9wdGlvblwiO1xyXG4gICAgbGV0IHJhZGlvTWVudUNyZWF0ZVJlc3VsdCA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVSYWRpbygpO1xyXG4gICAgfSwgdW5pcXVlSWQpO1xyXG4gICAgbGV0IHJhZGlvTWVudSA9IHJhZGlvTWVudUNyZWF0ZVJlc3VsdC5lbGVtZW50O1xyXG4gICAgaWYgKCFyYWRpb01lbnVDcmVhdGVSZXN1bHQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHJhZGlvTWVudS5pZChcInJhZGlvLWRpdlwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGxldCByYWRpb0xhYmVsID0gaXRlbS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCByYWRpb09wdGlvbiA9IHJhZGlvTWVudS5vcHRpb24ocmFkaW9MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSB0aGlzIHdheSBiZWNhdXNlIHRoZSB0d28tYXJndW1lbnQgLm9wdGlvbiBtZXRob2Qgd2Fzbid0IHdvcmtpbmdcclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBhY2Nlc3MgdGhlIHNlbGVjdGVkIG1vZGVcclxuICAgICAgICAgICAgcmFkaW9PcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBzdHlsZSBpcyBiZWluZyBzZXQgb24gdGhlIGRpdiBjb250YWluaW5nIHRoZSByYWRpbyBlbGVtZW50cyB0byBtYWtlIGl0IGEgc2Nyb2xsYWJsZSBib3hcclxuICAgICAgICByYWRpb01lbnUuYWRkQ2xhc3MobWVudUNsYXNzKTtcclxuICAgICAgICByYWRpb01lbnUuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2KHAsIHJhZGlvTWVudSk7XHJcbiAgICAgICAgZml4UmFkaW9EaXZFbGVtZW50KHJhZGlvTWVudSk7XHJcbiAgICAgICAgc3R5bGVSYWRpb09wdGlvbnMocCwgcmFkaW9NZW51LCBbbWVudUl0ZW1DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmFkaW9NZW51O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UGFnZUNvbnRyb2xzKHA6IHA1LCBwbGF5bGlzdE1lbnVJZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgcGFnZUNvbnRyb2xzRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZURpdigpO1xyXG4gICAgfSwgXCJwYWdlQ29udHJvbHNEaXZcIik7XHJcbiAgICBpZiAoIXBhZ2VDb250cm9sc0Rpdi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2xzXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmFkZENsYXNzKFBsYXlGcm9tT25saW5lLlBMQVlfRlJPTV9PTkxJTkVfQ0xBU1MpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQsIDAuNSwgMC4zODMsIDE0MCwgMzApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYWdlTnVtYmVyVGV4dCA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgdGV4dENvbnRhaW5lciA9IHAuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgdGV4dENvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHJldHVybiB0ZXh0Q29udGFpbmVyO1xyXG4gICAgfSwgXCJwYWdlTnVtYmVyVGV4dFwiKTtcclxuXHJcbiAgICBsZXQgcHJldmlvdXNQYWdlQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIiYjODI0OTtcIik7XHJcbiAgICB9LCBcInByZXZpb3VzUGFnZUJ1dHRvblwiKTtcclxuICAgIGlmICghcHJldmlvdXNQYWdlQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwcmV2aW91c1BhZ2VCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBnbG9iYWwub25saW5lUGxheWxpc3QucHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheWxpc3RNZW51SWQpO1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyVGV4dC5lbGVtZW50Lmh0bWwoXCJQYWdlIFwiICsgKGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5nZXRQYWdlKCkgKyAxKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJldmlvdXNQYWdlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2wtYnV0dG9uXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKHByZXZpb3VzUGFnZUJ1dHRvbi5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZighcGFnZU51bWJlclRleHQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQuaHRtbChcIlBhZ2UgXCIgKyAoZ2xvYmFsLm9ubGluZVBsYXlsaXN0LmdldFBhZ2UoKSArIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV4dFBhZ2VCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiJiM4MjUwO1wiKTtcclxuICAgIH0sIFwibmV4dFBhZ2VCdXR0b25cIik7XHJcbiAgICBpZiAoIW5leHRQYWdlQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBuZXh0UGFnZUJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHBsYXlsaXN0TWVudUlkKTtcclxuICAgICAgICAgICAgcGFnZU51bWJlclRleHQuZWxlbWVudC5odG1sKFwiUGFnZSBcIiArIChnbG9iYWwub25saW5lUGxheWxpc3QuZ2V0UGFnZSgpICsgMSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5leHRQYWdlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2wtYnV0dG9uXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKG5leHRQYWdlQnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge3NldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlfSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXN1bHRzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoXCJibGFja1wiKTtcclxuXHJcbiAgICAgICAgZ2xvYmFsLnJlc3VsdHNEaXNwbGF5LmRyYXcoKTtcclxuXHJcbiAgICAgICAgbGV0IHJldHVybkJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUmV0dXJuXCIpO1xyXG4gICAgICAgIH0sIFwicmV0dXJuQnV0dG9uXCIpO1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHJldHVybkJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuOSwgNzMsIDM0KTtcclxuICAgICAgICBpZiAoIXJldHVybkJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHJldHVybkJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybkJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5yZXR1cm4oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuY29uc3QgUkVDT1JESEVBREVSX0xFTkdUSF9GVUxMID0gMHgzZlxyXG4gICAgLy8gbnVsbC1jaGFyYWN0ZXJcclxuICAgICwgRU9TID0gMHgwMFxyXG4gICAgLCBzdHlsZUNvdW50RXh0ID0gMHhGRjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCeXRlUmVhZGVyIHtcclxuICAgIHB1YmxpYyBidWZmZXJfcmF3OiBBcnJheUJ1ZmZlckxpa2U7XHJcbiAgICBwdWJsaWMgYnVmZmVyOiBEYXRhVmlldztcclxuICAgIHB1YmxpYyBwb2ludGVyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcG9zaXRpb246IG51bWJlcjtcclxuICAgIHB1YmxpYyBjdXJyZW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlcl9yYXcgPSBidWZmZXI7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSAxO1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBidWZmZXIuYnl0ZUxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHVuc2lnbmVkIDE2IG9yIDMyIExpdHRsZSBFbmRpYW4gQml0c1xyXG4gICAgICogYW5kIGFkdmFuY2UgcG9pbnRlciB0byBuZXh0IGJpdHMgLyA4IGJ5dGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJpdHNcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFVJbnRMRShiaXRzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gMDtcclxuICAgICAgICBzd2l0Y2ggKGJpdHMpIHtcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogdGhlIHNlY29uZCBwYXJhbWV0ZXIgbWlnaHQgb25seSBleGlzdCBpbiBFUzYsIGxldCdzIHNlZSBpZiB0aGlzIGNhdXNlcyBhbiBlcnJvclxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRVaW50OCh0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTY6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldFVpbnQxNih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzI6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldFVpbnQzMih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVuZXhwZWN0ZWQgbnVtYmVyIG9mIGJpdHM6ICdcIiArIGJpdHMgKyBcIidcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb2ludGVyICs9IGJpdHMgLyA4O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHVuc2lnbmVkIDggYml0IGZyb20gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRVSW50OCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXIuZ2V0VWludDgodGhpcy5wb2ludGVyKyspO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGZsb2F0IGZyb20gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRGbG9hdCgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0RmxvYXQzMih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXIgKz0gNDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBkb3VibGUgZnJvbSB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZERvdWJsZSgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0RmxvYXQ2NCh0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXIgKz0gODtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyAzMi1iaXQgdW5zaWduZWQgaW50ZWdlcnMgdmFsdWUgZW5jb2RlZCAoMS01IGJ5dGVzKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gMzItYml0IHVuc2lnbmVkIGludGVnZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkRW5jb2RlZFUzMigpIHtcclxuICAgICAgICBsZXQgaSA9IDVcclxuICAgICAgICAgICAgLCByZXN1bHQgPSAwXHJcbiAgICAgICAgICAgICwgbmI7XHJcblxyXG4gICAgICAgIGRvXHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAobmIgPSB0aGlzLm5leHRCeXRlKCkpO1xyXG4gICAgICAgIHdoaWxlICgobmIgJiAxMjgpICYmIC0taSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYW4gZW5jb2RlZCBkYXRhIGZyb20gYnVmZmVyIGFuZCByZXR1cm5zIGFcclxuICAgICAqIHN0cmluZyB1c2luZyB0aGUgc3BlY2lmaWVkIGNoYXJhY3RlciBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gRGVjb2RlZCBzdHJpbmdcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkU3RyaW5nKCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCByZWFkID0gdGhpcy5yZWFkVUludDgoKTtcclxuICAgICAgICAgICAgaWYgKHJlYWQgPT09IEVPUylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyZWFkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhbiBlbmNvZGVkIGRhdGEgZnJvbSBidWZmZXIgYW5kIHJldHVybnMgYVxyXG4gICAgICogc3RyaW5nIHVzaW5nIHRoZSBzcGVjaWZpZWQgY2hhcmFjdGVyIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBEZWNvZGVkIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFN0cmluZ0ZpeGVkKHJlYWRMZW5ndGg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHdoaWxlIChyZWFkTGVuZ3RoLS0gPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCByZWFkID0gdGhpcy5yZWFkVUludDgoKTtcclxuICAgICAgICAgICAgaWYgKHJlYWQgPT09IEVPUylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyZWFkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBSRUNPUkRIRUFERVIgZnJvbSBuZXh0IHRhZyBpbiB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUYWcgY29kZSBhbmQgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkVGFnQ29kZUFuZExlbmd0aCgpOiBUYWdIZWFkZXIge1xyXG4gICAgICAgIGxldCBwID0gdGhpcy5wb2ludGVyO1xyXG4gICAgICAgIGxldCBuID0gdGhpcy5yZWFkVUludExFKDE2KVxyXG4gICAgICAgICAgICAsIHRhZ1R5cGUgPSBuID4+IDZcclxuICAgICAgICAgICAgLCB0YWdMZW5ndGggPSBuICYgUkVDT1JESEVBREVSX0xFTkdUSF9GVUxMO1xyXG5cclxuICAgICAgICBpZiAobiA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0YWdMZW5ndGggPT09IFJFQ09SREhFQURFUl9MRU5HVEhfRlVMTClcclxuICAgICAgICAgICAgdGFnTGVuZ3RoID0gdGhpcy5yZWFkVUludExFKDMyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtzdGFydDogcCwgZW5kOiB0aGlzLnBvaW50ZXIgKyB0YWdMZW5ndGgsIGNvZGU6IHRhZ1R5cGUsIGxlbmd0aDogdGFnTGVuZ3RoLCBwb3NpdGlvbjogdGhpcy5wb2ludGVyfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBSRUNPUkRIRUFERVIgZnJvbSBuZXh0IHRhZyBpbiB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUYWcgY29kZSBhbmQgbGVuZ3RoXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZEFjdGlvbigpIHtcclxuICAgICAgICBsZXQgcyA9IHRoaXMucG9pbnRlcjtcclxuICAgICAgICBsZXQgYSA9IHRoaXMucmVhZFVJbnQ4KCk7XHJcbiAgICAgICAgbGV0IGwgPSAoYSAmIDB4ODApID8gdGhpcy5yZWFkVUludExFKDE2KSA6IDA7XHJcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBvaW50ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiB7c3RhcnQ6IHMsIGFjdGlvbjogYSwgbGVuZ3RoOiBsLCBwb3NpdGlvbjogcH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgUkVDVCBmb3JtYXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fSB4LCB5LCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBSRUNUXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkUmVjdCgpOiBSZWN0IHtcclxuICAgICAgICB0aGlzLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGxldCBOQml0cyA9IHRoaXMucmVhZEJpdHMoNSlcclxuICAgICAgICAgICAgLCBYbWluID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMFxyXG4gICAgICAgICAgICAsIFhtYXggPSB0aGlzLnJlYWRCaXRzKE5CaXRzLCB0cnVlKSAvIDIwXHJcbiAgICAgICAgICAgICwgWW1pbiA9IHRoaXMucmVhZEJpdHMoTkJpdHMsIHRydWUpIC8gMjBcclxuICAgICAgICAgICAgLCBZbWF4ID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogWG1pbixcclxuICAgICAgICAgICAgeTogWW1pbixcclxuICAgICAgICAgICAgd2lkdGg6IChYbWF4ID4gWG1pbiA/IFhtYXggLSBYbWluIDogWG1pbiAtIFhtYXgpLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IChZbWF4ID4gWW1pbiA/IFltYXggLSBZbWluIDogWW1pbiAtIFltYXgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGludGVybmFsIHBvaW50ZXIgdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbjtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcG9zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWVrKHBvczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gcG9zICUgdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgcG9zaXRpb24gYW5kIHNldHMgY3VycmVudCB0byBuZXh0IEJ5dGUgaW4gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5leHRCeXRlKCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBuZXh0IEJ5dGUgaW4gdGhlIGJ1ZmZlciBhbmQgSW5jcmVtZW50IGludGVybmFsIHBvaW50ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IE5leHQgYnl0ZSBpbiBidWZmZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyBuZXh0Qnl0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludGVyID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCA/IG51bGwgOiB0aGlzLmJ1ZmZlci5nZXRVaW50OCh0aGlzLnBvaW50ZXIrKyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYiBiaXRzIGZyb20gY3VycmVudCBieXRlIGluIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEJpdHMgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZEJpdHMoYjogbnVtYmVyLCBzaWduZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBuID0gMFxyXG4gICAgICAgICAgICAsIHIgPSAwXHJcbiAgICAgICAgICAgICwgc2lnbiA9IHNpZ25lZCAmJiArK24gJiYgKCh0aGlzLmN1cnJlbnQgPj4gKDggLSB0aGlzLnBvc2l0aW9uKyspKSAmIDEpID8gLTEgOiAxO1xyXG5cclxuICAgICAgICB3aGlsZSAobisrIDwgYikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA+IDgpIHRoaXMuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIHIgPSAociA8PCAxKSArICgodGhpcy5jdXJyZW50ID4+ICg4IC0gdGhpcy5wb3NpdGlvbisrKSkgJiAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpZ24gKiByO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgYnl0ZXMgaW4gdGhlIEFycmF5QnVmZmVyIHdpdGggdGhlIHByb3ZpZGVkIGJ5dGVzLlxyXG4gICAgICogVGhpcyBzbGljZXMgdGhlIGZyb20gYDAgLT4gcG9pbnRlcmAgYW5kIGBwb3NpdGlvbl9lbmQgLT4gYnVmZmVybGVuZ3RoYFxyXG4gICAgICogYW5kIGluc2VydHMgdGhlIGdpdmVuIGJ5dGVzIGJldHdlZW4gdGhlbS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEJpdHMgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVwbGFjZUJ5dGVzKG5ld19ieXRlczogYW55LCBwb3N0aW9uX2VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcjEgPSB0aGlzLmJ1ZmZlcl9yYXcuc2xpY2UoMCwgdGhpcy5wb2ludGVyKTtcclxuICAgICAgICBsZXQgYnVmZmVyMiA9IG5ld19ieXRlcztcclxuICAgICAgICBsZXQgYnVmZmVyMyA9IHRoaXMuYnVmZmVyX3Jhdy5zbGljZShwb3N0aW9uX2VuZCk7XHJcblxyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgVWludDhBcnJheShidWZmZXIxLmJ5dGVMZW5ndGggKyBidWZmZXIyLmJ5dGVMZW5ndGggKyBidWZmZXIzLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyMSksIDApO1xyXG4gICAgICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyMiksIGJ1ZmZlcjEuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmZXIzKSwgYnVmZmVyMS5ieXRlTGVuZ3RoICsgYnVmZmVyMi5ieXRlTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWZmZXJfcmF3ID0gdG1wLmJ1ZmZlcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcl9yYXcpO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gMDtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlY3Qge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhZyB7XHJcbiAgICBwb29sPzogc3RyaW5nW107XHJcbiAgICB2YXJpYWJsZXM/OiBhbnk7XHJcbiAgICBoZWFkZXI/OiBUYWdIZWFkZXI7XHJcbiAgICBkb0luY2x1ZGU/OiBib29sZWFuO1xyXG4gICAgZGF0YT86IEFycmF5QnVmZmVyTGlrZVxyXG4gICAgYXVkaW9fYnl0ZXM/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnSGVhZGVyIHtcclxuICAgIHN0YXJ0OiBudW1iZXI7XHJcbiAgICBlbmQ6IG51bWJlcjtcclxuICAgIGNvZGU6IG51bWJlcjtcclxuICAgIGxlbmd0aDogbnVtYmVyO1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxufSIsImV4cG9ydCBjbGFzcyBQYXJ0aWFsUGFyc2Uge1xyXG4gICAgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbiAgICBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlVHlwZSB7XHJcbiAgICBOT05FID0gXCIwXCIsXHJcbiAgICBOT1JNQUwgPSBcIjFcIixcclxuICAgIEhPTERfSEVBRCA9IFwiMlwiLFxyXG4gICAgVEFJTCA9IFwiM1wiLFxyXG4gICAgUk9MTF9IRUFEID0gXCI0XCIsXHJcbiAgICBNSU5FID0gXCJNXCIsXHJcbiAgICBVTktOT1dOID0gXCI/Pz9cIixcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvTm90ZVR5cGUoc3RyaW5nOiBzdHJpbmcpOiBOb3RlVHlwZSB7XHJcbiAgICBzd2l0Y2ggKHN0cmluZykge1xyXG4gICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT05FO1xyXG4gICAgICAgIGNhc2UgXCIxXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT1JNQUw7XHJcbiAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLkhPTERfSEVBRDtcclxuICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuVEFJTDtcclxuICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuUk9MTF9IRUFEO1xyXG4gICAgICAgIGNhc2UgXCJNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5NSU5FO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5VTktOT1dOO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlU3RhdGUge1xyXG4gICAgREVGQVVMVCxcclxuICAgIEhJVCxcclxuICAgIE1JU1NFRCxcclxuICAgIEhFTEQsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZSB7XHJcbiAgICB0eXBlOiBOb3RlVHlwZTtcclxuICAgIHR5cGVTdHJpbmc6IHN0cmluZzsgLy8gdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZSBCRUZPUkUgaXQncyBpbnRlcnByZXRlZCBhcyBhIE5vdGVUeXBlXHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBzdGF0ZT86IE5vdGVTdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGUge1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBkaWZmaWN1bHR5OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbWV0ZXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRnVsbFBhcnNlIHtcclxuICAgIG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXTtcclxuICAgIG9mZnNldDogbnVtYmVyO1xyXG4gICAgYnBtczogW251bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgc3RvcHM6IFtudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UpIHtcclxuICAgICAgICB0aGlzLm1ldGFEYXRhID0gcGFydGlhbFBhcnNlLm1ldGFEYXRhO1xyXG4gICAgICAgIHRoaXMubW9kZXMgPSBwYXJ0aWFsUGFyc2UubW9kZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIFN0ZXAgT25lIE9mIFBhcnNpbmcgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpYWxQYXJzZShmaWxlQ29udGVudHM6IHN0cmluZykge1xyXG4gICAgbGV0IHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlID0gbmV3IFBhcnRpYWxQYXJzZSgpO1xyXG4gICAgcGFydGlhbFBhcnNlLm1ldGFEYXRhID0gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZUNvbnRlbnRzKTtcclxuICAgIHBhcnRpYWxQYXJzZS5tb2RlcyA9IGdldE1vZGVzSW5mb0FzU3RyaW5ncyhmaWxlQ29udGVudHMpO1xyXG4gICAgcmV0dXJuIHBhcnRpYWxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZTogc3RyaW5nKSB7XHJcbiAgICAvLyBtYXRjaCBhbnkgbWV0YWRhdGEgdGFnIGV4Y2x1ZGluZyB0aGUgXCJOT1RFU1wiIHRhZyAoY2FzZS1pbnNlbnNpdGl2ZSlcclxuICAgIGxldCByZSA9IC8jKD8hW25OXVtvT11bdFRdW2VFXVtzU10pKFteOl0rKTooW147XSspOy9nO1xyXG4gICAgbGV0IG1hdGNoZXMgPSBbLi4uZmlsZS5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWF0Y2hlc1tpXTtcclxuICAgICAgICBtZXRhRGF0YS5zZXQoY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsxXSkudG9VcHBlckNhc2UoKSwgY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsyXSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ldGFEYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNb2Rlc0luZm9Bc1N0cmluZ3MoZmlsZUNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIC8vIEdldCBcIk5PVEVTXCIgc2VjdGlvbnMgKGNhc2UtaW5zZW5zaXRpdmUpLiBUaGUgZmlyc3QgZml2ZSB2YWx1ZXMgYXJlIHBvc3RmaXhlZCB3aXRoIGEgY29sb24uXHJcbiAgICAvLyBOb3RlIGRhdGEgY29tZXMgbGFzdCwgcG9zdGZpeGVkIGJ5IGEgc2VtaWNvbG9uLlxyXG4gICAgbGV0IHJlID0gLyNbbk5dW29PXVt0VF1bZUVdW3NTXTooW146XSopOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjpdKik6KFteO10rOykvZztcclxuICAgIGxldCBtYXRjaGVzID0gWy4uLmZpbGVDb250ZW50cy5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W10gPSBbXTtcclxuICAgIGxldCBmaWVsZE5hbWVzID0gW1widHlwZVwiLCBcImRlc2MvYXV0aG9yXCIsIFwiZGlmZmljdWx0eVwiLCBcIm1ldGVyXCIsIFwicmFkYXJcIl07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaGVzW2ldO1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgbWF0Y2gubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgIG1vZGUuc2V0KGZpZWxkTmFtZXNbaiAtIDFdLCBjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoW2pdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGUuc2V0KFwibm90ZXNcIiwgbWF0Y2hbbWF0Y2gubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIG1vZGVzLnB1c2gobW9kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW9kZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFuTWV0YURhdGFTdHJpbmcoc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0cmluZy50cmltKCkucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG59XHJcblxyXG4vKiBTdGVwIFR3byBPZiBQYXJzaW5nICovXHJcblxyXG4vLyBUT0RPOiBhY3R1YWxseSByZXR1cm4gRnVsbFBhcnNlXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGdWxsUGFyc2UobW9kZUluZGV4OiBudW1iZXIsIHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlKTogRnVsbFBhcnNlIHtcclxuICAgIGxldCBmdWxsUGFyc2UgPSBuZXcgRnVsbFBhcnNlKHBhcnRpYWxQYXJzZSk7XHJcbiAgICBsZXQgdW5wYXJzZWROb3Rlczogc3RyaW5nID0gcGFydGlhbFBhcnNlLm1vZGVzW21vZGVJbmRleF0uZ2V0KFwibm90ZXNcIik7XHJcbiAgICBsZXQgdW5wYXJzZWRBcnJheTogc3RyaW5nW10gPSB1bnBhcnNlZE5vdGVzLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgbGV0IG1lYXN1cmVzOiBzdHJpbmdbXVtdID0gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheSk7XHJcbiAgICBsZXQgYmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXMpO1xyXG4gICAgbGV0IGNsZWFuZWRCZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSByZW1vdmVCbGFua0xpbmVzKGJlYXRzQW5kTGluZXMpO1xyXG4gICAgbGV0IG9mZnNldDogbnVtYmVyID0gcGFyc2VGbG9hdChwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiT0ZGU0VUXCIpKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gcGFyc2VCUE1TKHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJCUE1TXCIpKTtcclxuICAgIGxldCBzdG9wczogeyBzdG9wRHVyYXRpb246IG51bWJlcjsgYmVhdDogbnVtYmVyIH1bXSA9IHBhcnNlU3RvcHMocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIlNUT1BTXCIpKTtcclxuICAgIGxldCB0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0VGltZUluZm9CeUxpbmUoY2xlYW5lZEJlYXRzQW5kTGluZXMsIG9mZnNldCwgYnBtcywgc3RvcHMpO1xyXG4gICAgZnVsbFBhcnNlLnRyYWNrcyA9IGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXMpO1xyXG4gICAgcmV0dXJuIGZ1bGxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheTogc3RyaW5nW10pIHtcclxuICAgIGxldCBtZWFzdXJlczogc3RyaW5nW11bXSA9IFtdO1xyXG4gICAgbGV0IHN0YXRlID0gMDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBjdXJyZW50TWVhc3VyZTogc3RyaW5nW10gPSBbXTtcclxuICAgIHdoaWxlIChpIDwgdW5wYXJzZWRBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgY3VycmVudExpbmUgPSB1bnBhcnNlZEFycmF5W2ldO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50TGluZS5pbmNsdWRlcyhcIi8vXCIpICYmIGN1cnJlbnRMaW5lLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudExpbmUuaW5jbHVkZXMoXCIsXCIpICYmICFjdXJyZW50TGluZS5pbmNsdWRlcyhcIjtcIikgJiYgY3VycmVudExpbmUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUucHVzaChjdXJyZW50TGluZS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVzLnB1c2goY3VycmVudE1lYXN1cmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtZWFzdXJlcztcclxufVxyXG5cclxuLy8gYXNzdW1lcyA0LzQgdGltZSBzaWduYXR1cmVcclxuZnVuY3Rpb24gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXM6IHN0cmluZ1tdW10pIHtcclxuICAgIGxldCBiZWF0c0FuZExpbmVzID0gW107XHJcbiAgICBsZXQgY3VycmVudEJlYXQgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtZWFzdXJlID0gbWVhc3VyZXNbaV07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZWFzdXJlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGJlYXRzQW5kTGluZXMucHVzaCh7YmVhdDogY3VycmVudEJlYXQsIGxpbmVJbmZvOiBtZWFzdXJlW2pdfSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRCZWF0ICs9IDQgLyBtZWFzdXJlLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQmxhbmtMaW5lcyhiZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10pIHtcclxuICAgIGxldCBjbGVhbmVkQmVhdHNBbmRMaW5lcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZWF0c0FuZExpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBiZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGlmICghaXNBbGxaZXJvcyhsaW5lLmxpbmVJbmZvKSkge1xyXG4gICAgICAgICAgICBjbGVhbmVkQmVhdHNBbmRMaW5lcy5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbGVhbmVkQmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNBbGxaZXJvcyhzdHJpbmc6IHN0cmluZykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc3RyaW5nLmNoYXJBdChpKSAhPT0gJzAnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZUluZm9CeUxpbmUoaW5mb0J5TGluZTogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdLCBvZmZzZXQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W11cclxuKTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10ge1xyXG4gICAgbGV0IGluZm9CeUxpbmVXaXRoVGltZTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSBbXTtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IC1vZmZzZXQgKyBnZXRFbGFwc2VkVGltZSgwLCBpbmZvQnlMaW5lWzBdLmJlYXQsIGJwbXMsIHN0b3BzKTtcclxuICAgIGluZm9CeUxpbmVXaXRoVGltZS5wdXNoKHt0aW1lOiBjdXJyZW50VGltZSwgYmVhdDogaW5mb0J5TGluZVswXS5iZWF0LCBsaW5lSW5mbzogaW5mb0J5TGluZVswXS5saW5lSW5mb30pO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbmZvQnlMaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmVhdCA9IGluZm9CeUxpbmVbaSAtIDFdLmJlYXQ7XHJcbiAgICAgICAgbGV0IGVuZEJlYXQgPSBpbmZvQnlMaW5lW2ldLmJlYXQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gZ2V0RWxhcHNlZFRpbWUoc3RhcnRCZWF0LCBlbmRCZWF0LCBicG1zLCBzdG9wcyk7XHJcbiAgICAgICAgaW5mb0J5TGluZVdpdGhUaW1lLnB1c2goe3RpbWU6IGN1cnJlbnRUaW1lLCBiZWF0OiBpbmZvQnlMaW5lW2ldLmJlYXQsIGxpbmVJbmZvOiBpbmZvQnlMaW5lW2ldLmxpbmVJbmZvfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5mb0J5TGluZVdpdGhUaW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRFbGFwc2VkVGltZShzdGFydEJlYXQ6IG51bWJlciwgZW5kQmVhdDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IGN1cnJlbnRCUE1JbmRleDogbnVtYmVyID0gZ2V0U3RhcnRCUE1JbmRleChzdGFydEJlYXQsIGJwbXMpO1xyXG4gICAgbGV0IGVhcmxpZXN0QmVhdDogbnVtYmVyID0gc3RhcnRCZWF0O1xyXG4gICAgbGV0IGVsYXBzZWRUaW1lOiBudW1iZXIgPSBzdG9wcyA9PSBudWxsID8gMCA6IHN0b3BwZWRUaW1lKHN0YXJ0QmVhdCwgZW5kQmVhdCwgc3RvcHMpO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGxldCBuZXh0QlBNQ2hhbmdlOiBudW1iZXIgPSBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleCwgYnBtcyk7XHJcbiAgICAgICAgbGV0IG5leHRCZWF0OiBudW1iZXIgPSBNYXRoLm1pbihlbmRCZWF0LCBuZXh0QlBNQ2hhbmdlKTtcclxuICAgICAgICBlbGFwc2VkVGltZSArPSAobmV4dEJlYXQgLSBlYXJsaWVzdEJlYXQpIC8gYnBtc1tjdXJyZW50QlBNSW5kZXhdLmJwbSAqIDYwO1xyXG4gICAgICAgIGVhcmxpZXN0QmVhdCA9IG5leHRCZWF0O1xyXG4gICAgICAgIGN1cnJlbnRCUE1JbmRleCsrO1xyXG4gICAgfSB3aGlsZSAoZWFybGllc3RCZWF0IDwgZW5kQmVhdCk7XHJcbiAgICByZXR1cm4gZWxhcHNlZFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN0YXJ0QlBNSW5kZXgoc3RhcnRCZWF0OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10pIHtcclxuICAgIGxldCBzdGFydEJQTUluZGV4ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYnBtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChicG1zW2ldLmJlYXQgPCBzdGFydEJlYXQpIHtcclxuICAgICAgICAgICAgc3RhcnRCUE1JbmRleCA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXJ0QlBNSW5kZXg7XHJcbn1cclxuXHJcbi8vIGRvZXMgTk9UIHNuYXAgdG8gbmVhcmVzdCAxLzE5Mm5kIG9mIGJlYXRcclxuZnVuY3Rpb24gc3RvcHBlZFRpbWUoc3RhcnRCZWF0OiBudW1iZXIsIGVuZEJlYXQ6IG51bWJlciwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W10pIHtcclxuICAgIGxldCB0aW1lID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RvcEJlYXQgPSBzdG9wc1tpXS5iZWF0O1xyXG4gICAgICAgIGlmIChzdGFydEJlYXQgPD0gc3RvcEJlYXQgJiYgc3RvcEJlYXQgPCBlbmRCZWF0KSB7XHJcbiAgICAgICAgICAgIHRpbWUgKz0gc3RvcHNbaV0uc3RvcER1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdKSB7XHJcbiAgICBpZiAoY3VycmVudEJQTUluZGV4ICsgMSA8IGJwbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGJwbXNbY3VycmVudEJQTUluZGV4ICsgMV0uYmVhdDtcclxuICAgIH1cclxuICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmc7IH1bXSkge1xyXG4gICAgbGV0IG51bVRyYWNrczogbnVtYmVyID0gdGltZXNCZWF0c0FuZExpbmVzWzBdLmxpbmVJbmZvLmxlbmd0aDtcclxuICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgdHJhY2tzLnB1c2goW10pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lc0JlYXRzQW5kTGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbGluZTogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZyB9ID0gdGltZXNCZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZS5saW5lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZVN0cmluZyA9IGxpbmUubGluZUluZm8uY2hhckF0KGopO1xyXG4gICAgICAgICAgICBsZXQgbm90ZVR5cGU6IE5vdGVUeXBlID0gc3RyaW5nVG9Ob3RlVHlwZSh0eXBlU3RyaW5nKTtcclxuICAgICAgICAgICAgaWYgKG5vdGVUeXBlICE9PSBOb3RlVHlwZS5OT05FKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja3Nbal0ucHVzaCh7dHlwZTogbm90ZVR5cGUsIHR5cGVTdHJpbmc6IHR5cGVTdHJpbmcsIHRpbWVJblNlY29uZHM6IGxpbmUudGltZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyYWNrcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VCUE1TKGJwbVN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoYnBtU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgYnBtQXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oYnBtU3RyaW5nKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJwbUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnBtcy5wdXNoKHtiZWF0OiBicG1BcnJheVtpXVswXSwgYnBtOiBicG1BcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJwbXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlU3RvcHMoc3RvcHNTdHJpbmc6IHN0cmluZykge1xyXG4gICAgaWYgKHN0b3BzU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgc3RvcHNBcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihzdG9wc1N0cmluZyk7XHJcbiAgICBsZXQgc3RvcHM6IHsgc3RvcER1cmF0aW9uOiBudW1iZXI7IGJlYXQ6IG51bWJlciB9W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN0b3BzLnB1c2goe2JlYXQ6IHN0b3BzQXJyYXlbaV1bMF0sIHN0b3BEdXJhdGlvbjogc3RvcHNBcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0b3BzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKHN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBsZXQgc3RyaW5nQXJyYXk6IHN0cmluZ1tdW10gPSBzdHJpbmcuc3BsaXQoXCIsXCIpLm1hcChlID0+IGUudHJpbSgpLnNwbGl0KFwiPVwiKSk7XHJcbiAgICBsZXQgYXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmdBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5LnB1c2goW3BhcnNlRmxvYXQoc3RyaW5nQXJyYXlbaV1bMF0pLCBwYXJzZUZsb2F0KHN0cmluZ0FycmF5W2ldWzFdKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59IiwiaW1wb3J0IHtTV0ZUYWdzfSBmcm9tIFwiLi9zd2YtdGFnc1wiO1xyXG5pbXBvcnQge1NXRiwgdW5jb21wcmVzc30gZnJvbSBcIi4vc3dmLXJlYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTd2ZQYXJzZVJlc3BvbnNlIHtcclxuICAgIGNoYXJ0RGF0YTogW251bWJlciwgc3RyaW5nLCBzdHJpbmddW107XHJcbiAgICBibG9iOiBCbG9iO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTd2ZGcm9tQXJyYXlCdWZmZXIoaW5wdXQ6IEFycmF5QnVmZmVyKTogU3dmUGFyc2VSZXNwb25zZSB7XHJcbiAgICByZXR1cm4gc3dmRmlsZV9SZWFkeSg8VWludDhBcnJheT4gaW5wdXQpO1xyXG59XHJcblxyXG5sZXQgc3dmX3RhZ3M6IFNXRjtcclxuXHJcbmZ1bmN0aW9uIHN3ZkZpbGVfUmVhZHkoYnVmZmVyOiBVaW50OEFycmF5KTogU3dmUGFyc2VSZXNwb25zZSB7XHJcbiAgICBzd2ZfdGFncyA9IHVuY29tcHJlc3MoYnVmZmVyKTtcclxuICAgIFxyXG4gICAgLy8gQ2hhcnQgRGF0YVxyXG4gICAgbGV0IGNoYXJ0X3RhZyA9IGdldEJlYXRCb3goKTtcclxuICAgIGxldCBjaGFydF9kYXRhID0gY2hhcnRfdGFnW1widmFyaWFibGVzXCJdW1wiX3Jvb3RcIl1bXCJiZWF0Qm94XCJdO1xyXG5cclxuICAgIC8vIE11c2ljIERhdGFcclxuICAgIGxldCBtdXNpY19iaW5hcnkgPSBnZXRBdWRpbygpO1xyXG4gICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbbXVzaWNfYmluYXJ5XSwge3R5cGUgOiAnYXVkaW8vbXBlZyd9KTtcclxuXHJcbiAgICByZXR1cm4ge2Jsb2I6IGJsb2IsIGNoYXJ0RGF0YTogY2hhcnRfZGF0YX07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kIEJlYXRib3ggaW4gdGhlIHN3Zl90YWdzLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QmVhdEJveCgpIHtcclxuICAgIGxldCBsZW4gPSBzd2ZfdGFncy50YWdzLmxlbmd0aDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBlbG0gPSBudWxsO1xyXG5cclxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgZWxtID0gc3dmX3RhZ3MudGFnc1tpXTtcclxuICAgICAgICBpZihlbG0uaGVhZGVyLmNvZGUgPT0gU1dGVGFncy5ET0FDVElPTilcclxuICAgICAgICAgICAgcmV0dXJuIGVsbTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgQmVhdGJveCBpbiB0aGUgc3dmX3RhZ3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRBdWRpbygpIHtcclxuICAgIGxldCBsZW4gPSBzd2ZfdGFncy50YWdzLmxlbmd0aDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBlbG0gPSBudWxsO1xyXG5cclxuICAgIGxldCBhdWRpb1NpemUgPSAwXHJcblxyXG4gICAgLy8gTG9vcCBBbGwgQXVkaW8gVGFncywgZ2V0IFRvdGFsIEJ5dGUgU2l6ZVxyXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBlbG0gPSBzd2ZfdGFncy50YWdzW2ldO1xyXG4gICAgICAgIGlmKGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLkRFRklORVNPVU5EIHx8IGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLlNUUkVBTUJMT0NLKVxyXG4gICAgICAgICAgICBhdWRpb1NpemUgKz0gZWxtLmF1ZGlvX2J5dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExvb3AgQWxsIEF1ZGlvIFRhZ3MsIGdldCBUb3RhbCBCeXRlIFNpemVcclxuICAgIGxldCB3cml0ZVBvc2l0aW9uID0gMDtcclxuICAgIGxldCBiaW5hcnkgPSBuZXcgVWludDhBcnJheShhdWRpb1NpemUpO1xyXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBlbG0gPSBzd2ZfdGFncy50YWdzW2ldO1xyXG4gICAgICAgIGlmKGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLkRFRklORVNPVU5EIHx8IGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLlNUUkVBTUJMT0NLKSB7XHJcbiAgICAgICAgICAgIGJpbmFyeS5zZXQobmV3IFVpbnQ4QXJyYXkoZWxtLmRhdGEpLCB3cml0ZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgd3JpdGVQb3NpdGlvbiArPSBlbG0uYXVkaW9fYnl0ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJpbmFyeTtcclxufSIsImltcG9ydCAqIGFzIHBha28gZnJvbSBcInBha29cIjtcclxuaW1wb3J0IHtTV0ZBY3Rpb25UYWdzLCBTV0ZPdGhlclRhZ3MsIFNXRlRhZ3MsIFNXRlR5cGVUYWdzfSBmcm9tIFwiLi9zd2YtdGFnc1wiO1xyXG5pbXBvcnQge0J5dGVSZWFkZXIsIFJlY3QsIFRhZywgVGFnSGVhZGVyfSBmcm9tIFwiLi9ieXRlX3JlYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNXRiB7XHJcbiAgICBwdWJsaWMgYnVmZmVyOiBCeXRlUmVhZGVyO1xyXG4gICAgcHVibGljIG1hZ2ljOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdmVyc2lvbjogbnVtYmVyO1xyXG4gICAgcHVibGljIGZpbGVMZW5ndGg6IHsgY29tcHJlc3NlZDogbnVtYmVyLCB1bmNvbXByZXNzZWQ6IG51bWJlciB9O1xyXG4gICAgcHVibGljIGZyYW1lU2l6ZTogUmVjdDtcclxuICAgIHB1YmxpYyBmcmFtZVJhdGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmcmFtZUNvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGFnczogYW55W107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25jYXQgU1dGIEhlYWRlciB3aXRoIHVuY29tcHJlc3NlZCBCdWZmZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25jYXRTV0ZIZWFkZXIoYnVmZjogVWludDhBcnJheSwgc3dmOiBBcnJheUJ1ZmZlcikge1xyXG4gICAgbGV0IHRtcCA9IG5ldyBVaW50OEFycmF5KGJ1ZmYuYnl0ZUxlbmd0aCArIDgpO1xyXG4gICAgdG1wLnNldChuZXcgVWludDhBcnJheShzd2Yuc2xpY2UoMCwgOCkpKTtcclxuICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZiksIDgpO1xyXG4gICAgcmV0dXJuIHRtcC5idWZmZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNvbXByZXNzIFNXRiBpZiBuZWVkZWQgYW5kIFJlYWQgU1dGXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5jb21wcmVzcyhzd2Y6IFVpbnQ4QXJyYXkpIHtcclxuICAgIGxldCBzd2ZfYnl0ZXMgPSBuZXcgVWludDhBcnJheShzd2YpO1xyXG4gICAgbGV0IGNvbXByZXNzZWRfYnVmZjogVWludDhBcnJheSA9IHN3Zi5zbGljZSg4KTtcclxuXHJcbiAgICAvLyB1bmNvbXByZXNzIGJ1ZmZlclxyXG4gICAgc3dpdGNoIChzd2ZfYnl0ZXNbMF0pIHsgLy8gTUFHSUNcclxuICAgICAgICBjYXNlIDB4NDMgOiAvLyAnQycgPSB6bGliIGNvbXByZXNzZWRcclxuICAgICAgICAgICAgbGV0IHVuY29tcHJlc3NlZF9idWZmID0gY29uY2F0U1dGSGVhZGVyKHBha28uaW5mbGF0ZShjb21wcmVzc2VkX2J1ZmYpLCBzd2YpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVhZFNXRkJ1ZmYobmV3IEJ5dGVSZWFkZXIodW5jb21wcmVzc2VkX2J1ZmYpLCBzd2YpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAweDQ2IDogLy8gJ0YnID0gdW5jb21wcmVzc2VkXHJcbiAgICAgICAgICAgIHJldHVybiByZWFkU1dGQnVmZihuZXcgQnl0ZVJlYWRlcihzd2YpLCBzd2YpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAweDVhIDogLy8gTFpNQSBjb21wcmVzc2VkXHJcbiAgICAgICAgICAgIGFsZXJ0KCdDYW5ub3QgaGFuZGxlIExaTUEgU1dGIGNvbXByZXNzaW9ucycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgIGFsZXJ0KCdVbmtub3duIFNXRiBjb21wcmVzc2lvbnMnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyB0aGUgU1dGIGZyb20gdW5jb21wcmVzc2VkIGJ1ZmZlci5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkU1dGQnVmZihidWZmOiBCeXRlUmVhZGVyLCBjb21wcmVzc2VkX2J1ZmY6IEFycmF5QnVmZmVyKTogU1dGIHtcclxuICAgIGJ1ZmYuc2VlaygwKTsvLyBzdGFydFxyXG5cclxuICAgIGxldCBzd2YgPSBuZXcgU1dGKClcclxuICAgIHN3Zi5idWZmZXIgPSBidWZmO1xyXG4gICAgc3dmLm1hZ2ljID0gYnVmZi5yZWFkU3RyaW5nRml4ZWQoMyk7XHJcbiAgICBzd2YudmVyc2lvbiA9IGJ1ZmYucmVhZFVJbnQ4KCk7XHJcbiAgICBzd2YuZmlsZUxlbmd0aCA9IHtcclxuICAgICAgICBjb21wcmVzc2VkOiBjb21wcmVzc2VkX2J1ZmYuYnl0ZUxlbmd0aCxcclxuICAgICAgICB1bmNvbXByZXNzZWQ6IGJ1ZmYucmVhZFVJbnRMRSgzMilcclxuICAgIH07XHJcbiAgICBzd2YuZnJhbWVTaXplID0gYnVmZi5yZWFkUmVjdCgpO1xyXG4gICAgc3dmLmZyYW1lUmF0ZSA9IGJ1ZmYucmVhZFVJbnRMRSgxNikgLyAyNTY7XHJcbiAgICBzd2YuZnJhbWVDb3VudCA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHN3Zi50YWdzID0gcmVhZFNXRlRhZ3MoYnVmZik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3dmO1xyXG59XHJcblxyXG4vKipcclxuICogUGFyc2VzIHRoZSBTV0YgVEFHIGRhdGEgc3RydWN0dXJlLCBrZWVwaW5nIG9ubHkgdGhlIHRhZ3NcclxuICogd2UgYXJlIGludGVyZXN0ZWQgaW4uXHJcbiAqIC0gQXVkaW8gVGFnczogQXVkaW8gU2FtcGxlc1xyXG4gKiAtIERvIEFjdGlvbiBUYWc6IENvbnRhaW5pbmcgdGhlIGJlYXRCb3ggdmFyaWFibGUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVhZFNXRlRhZ3MoYnVmZjogQnl0ZVJlYWRlcikge1xyXG4gICAgbGV0IHRhZ3M6IFRhZ1tdID0gW107XHJcbiAgICBsZXQgdGFnSGVhZGVyOiBUYWdIZWFkZXI7XHJcblxyXG4gICAgbGV0IG1wM1NlZWsgPSAwO1xyXG4gICAgbGV0IG1wM1NhbXBsZXMgPSAwO1xyXG4gICAgbGV0IG1wM0lkID0gMDtcclxuICAgIGxldCBtcDNGb3JtYXQgPSAwO1xyXG4gICAgbGV0IG1wM1N0cmVhbSA9IGZhbHNlO1xyXG5cclxuICAgIC8qIFJlYWRzIFRhZ0NvZGVBbmRMZW5ndGggZnJvbSBUYWcncyBSRUNPUkRIRUFERVIgKi9cclxuICAgIHdoaWxlICgodGFnSGVhZGVyID0gYnVmZi5yZWFkVGFnQ29kZUFuZExlbmd0aCgpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGxldCB0YWc6IFRhZyA9IHt9O1xyXG4gICAgICAgIHRhZy5oZWFkZXIgPSB0YWdIZWFkZXI7XHJcbiAgICAgICAgdGFnLmRvSW5jbHVkZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRhZ0hlYWRlci5jb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIFNvdW5kIFRhZ3MgLSBNUDMgRXh0cmFjdGlvblxyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuU1RSRUFNQkxPQ0s6XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1wM1N0cmVhbSB8fCAoKHRhZ0hlYWRlci5sZW5ndGggLSA0KSA9PSAwKSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBtcDNTYW1wbGVzICs9IGJ1ZmYucmVhZFVJbnRMRSgxNik7IC8vIGZyYW1lIHNhbXBsZXNcclxuICAgICAgICAgICAgICAgIGJ1ZmYucmVhZFVJbnRMRSgxNik7IC8vIHNlZWsgc2FtcGxlc1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZy5kYXRhID0gYnVmZi5idWZmZXJfcmF3LnNsaWNlKGJ1ZmYucG9pbnRlciwgYnVmZi5wb2ludGVyICsgKHRhZ0hlYWRlci5sZW5ndGggLSA0KSk7XHJcbiAgICAgICAgICAgICAgICB0YWcuYXVkaW9fYnl0ZXMgPSAodGFnSGVhZGVyLmxlbmd0aCAtIDQpO1xyXG4gICAgICAgICAgICAgICAgdGFnLmRvSW5jbHVkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5TVFJFQU1IRUFEOlxyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuU1RSRUFNSEVBRDI6XHJcbiAgICAgICAgICAgICAgICBidWZmLnJlYWRVSW50TEUoOCk7XHJcbiAgICAgICAgICAgICAgICBtcDNGb3JtYXQgPSBidWZmLnJlYWRVSW50TEUoOCk7XHJcbiAgICAgICAgICAgICAgICBidWZmLnJlYWRVSW50TEUoMTYpOyAvLyBhdmVyYWdlIGZyYW1lIHNhbXBsZXNcclxuICAgICAgICAgICAgICAgIG1wM1NlZWsgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCgobXAzRm9ybWF0ID4+PiA0KSAmIDB4ZikgPT0gU1dGT3RoZXJUYWdzLkNPREVDX01QMylcclxuICAgICAgICAgICAgICAgICAgICBtcDNTdHJlYW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuREVGSU5FU09VTkQ6XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1wM1N0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZCA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1hdCA9IGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKChmb3JtYXQgPj4+IDQpICYgMHhmKSA9PSBTV0ZPdGhlclRhZ3MuQ09ERUNfTVAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1wM0lkID0gaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1wM0Zvcm1hdCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzU2FtcGxlcyA9IGJ1ZmYucmVhZFVJbnRMRSgzMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1wM1NlZWsgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuZGF0YSA9IGJ1ZmYuYnVmZmVyX3Jhdy5zbGljZShidWZmLnBvaW50ZXIsIGJ1ZmYucG9pbnRlciArICh0YWdIZWFkZXIubGVuZ3RoIC0gOSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuYXVkaW9fYnl0ZXMgPSAodGFnSGVhZGVyLmxlbmd0aCAtIDkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuZG9JbmNsdWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIERvQWN0aW9uIC0gV2hlcmUgdGhlIEJlYXRib3ggTGl2ZXNcclxuICAgICAgICAgICAgY2FzZSBTV0ZUYWdzLkRPQUNUSU9OIDpcclxuICAgICAgICAgICAgICAgIGxldCBfZmluaXNoZWRSZWFkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblN0YWNrOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblZhcmlhYmxlczogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uUmVnaXN0ZXJzOiBbYW55LCBhbnksIGFueSwgYW55XSA9IFtudWxsLCBudWxsLCBudWxsLCBudWxsXTtcclxuICAgICAgICAgICAgICAgIGxldCBjb25zdGFudFBvb2wgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIV9maW5pc2hlZFJlYWRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uID0gYnVmZi5yZWFkQWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlYWQgQWN0aW9uIFRhZ1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uLmFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuRU5EOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ZpbmlzaGVkUmVhZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5DT05TVEFOVFBPT0w6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudFBvb2wgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb25zdGFudENvdW50ID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uc3RhbnRDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRQb29sLnB1c2goYnVmZi5yZWFkU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuUFVTSDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChidWZmLnBvaW50ZXIgPCBhY3Rpb24ucG9zaXRpb24gKyBhY3Rpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHB1c2hWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHVzaFR5cGUgPSBidWZmLnJlYWRVSW50TEUoOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwdXNoVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLlNUUklOR19MSVRFUkFMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYnVmZi5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuRkxPQVRfTElURVJBTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGJ1ZmYucmVhZEZsb2F0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuTlVMTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuVU5ERUZJTkVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLlJFR0lTVEVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYWN0aW9uUmVnaXN0ZXJzW2J1ZmYucmVhZFVJbnRMRSg4KV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IEJvb2xlYW4oYnVmZi5yZWFkVUludExFKDgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5ET1VCTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWREb3VibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5JTlRFR0VSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYnVmZi5yZWFkVUludExFKDMyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5DT05TVEFOVDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBjb25zdGFudFBvb2xbYnVmZi5yZWFkVUludExFKDgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5DT05TVEFOVDE2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gY29uc3RhbnRQb29sW2J1ZmYucmVhZFVJbnRMRSgxNildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGT1VORCBVTlNVUFBPUlRFRCBQVVNIREFUQSBUWVBFOiBcIiArIHB1c2hUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wdXNoKHB1c2hWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5QT1A6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLkRVUExJQ0FURTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goYWN0aW9uU3RhY2tbYWN0aW9uU3RhY2subGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuU1RPUkVfUkVHSVNURVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25SZWdpc3RlcnNbYnVmZi5yZWFkVUludExFKDgpXSA9IGFjdGlvblN0YWNrW2FjdGlvblN0YWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuR0VUX1ZBUklBQkxFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGd2TmFtZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZ3ZOYW1lIGluIGFjdGlvblZhcmlhYmxlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uVmFyaWFibGVzW2d2TmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goYWN0aW9uVmFyaWFibGVzW2d2TmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuU0VUX1ZBUklBQkxFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN2VmFsdWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblZhcmlhYmxlc1thY3Rpb25TdGFjay5wb3AoKV0gPSBzdlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuSU5JVF9BUlJBWTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnJheVNpemUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheVNpemU7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGFjdGlvblN0YWNrLnBvcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuR0VUX01FTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnbU5hbWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnbU9iamVjdCA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZ21OYW1lIGluIGdtT2JqZWN0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbU9iamVjdFtnbU5hbWVdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wdXNoKGdtT2JqZWN0W2dtTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuU0VUX01FTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbVZhbHVlID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc21OYW1lID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wb3AoKVtzbU5hbWVdID0gc21WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB0YWcgaXNuJ3Qgc3VwcG9ydGVkLCBidXQgaXQgc2VlbXMgdG8gYmUgaW4gZXZlcnkgZmlsZSwgc28gSSdtIGlnbm9yaW5nIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZPVU5EIFVOU1VQUE9SVEVEIEFDVElPTiBUQUc6IFwiICsgYWN0aW9uLmFjdGlvbi50b1N0cmluZygxNikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvblZhcmlhYmxlc1tcIl9yb290XCJdICE9IHVuZGVmaW5lZCAmJiBhY3Rpb25WYXJpYWJsZXNbXCJfcm9vdFwiXVtcImJlYXRCb3hcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGFnLmRvSW5jbHVkZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFnLnBvb2wgPSBjb25zdGFudFBvb2w7XHJcbiAgICAgICAgICAgICAgICB0YWcudmFyaWFibGVzID0gYWN0aW9uVmFyaWFibGVzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgLy90YWcuZGF0YSA9IGJ1ZmYuYnVmZmVyX3Jhdy5zbGljZShidWZmLnBvaW50ZXIsIGJ1ZmYucG9pbnRlciArIHRhZ0hlYWRlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFnLmRvSW5jbHVkZSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGFnLmRvSW5jbHVkZTtcclxuICAgICAgICAgICAgdGFncy5wdXNoKHRhZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidWZmLnNlZWsodGFnSGVhZGVyLnBvc2l0aW9uICsgdGFnSGVhZGVyLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFncztcclxufVxyXG4iLCIvKipcclxuICogQ29sbGVjdGlvbiBvZiBTV0YgdGFncyBhbmQgdGFnIHR5cGVzIHRvIGFzc2lzdCB3aXRoIHJlYWRpbmcgYW5kIHBhcnNpbmcgYSAuc3dmIGZpbGUuXHJcbiAqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNXRlRhZ3Mge1xyXG4gICAgcHVibGljIHN0YXRpYyBFTkQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNIT1dGUkFNRTogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRE9BQ1RJT046IG51bWJlciA9IDEyO1xyXG4gICAgcHVibGljIHN0YXRpYyBERUZJTkVTT1VORDogbnVtYmVyID0gMTQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUkVBTUhFQUQ6IG51bWJlciA9IDE4O1xyXG4gICAgcHVibGljIHN0YXRpYyBTVFJFQU1CTE9DSzogbnVtYmVyID0gMTk7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUkVBTUhFQUQyOiBudW1iZXIgPSA0NTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRklMRUFUVFJJQlVURVM6IG51bWJlciA9IDY5O1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU1dGQWN0aW9uVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVORDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RBTlRQT09MOiBudW1iZXIgPSAweDg4O1xyXG4gICAgcHVibGljIHN0YXRpYyBQVVNIOiBudW1iZXIgPSAweDk2O1xyXG4gICAgcHVibGljIHN0YXRpYyBQT1A6IG51bWJlciA9IDB4MTc7XHJcbiAgICBwdWJsaWMgc3RhdGljIERVUExJQ0FURTogbnVtYmVyID0gMHg0QztcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RPUkVfUkVHSVNURVI6IG51bWJlciA9IDB4ODc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdFVF9WQVJJQUJMRTogbnVtYmVyID0gMHgxQztcclxuICAgIHB1YmxpYyBzdGF0aWMgU0VUX1ZBUklBQkxFOiBudW1iZXIgPSAweDFEO1xyXG4gICAgcHVibGljIHN0YXRpYyBJTklUX0FSUkFZOiBudW1iZXIgPSAweDQyO1xyXG4gICAgcHVibGljIHN0YXRpYyBHRVRfTUVNQkVSOiBudW1iZXIgPSAweDRFO1xyXG4gICAgcHVibGljIHN0YXRpYyBTRVRfTUVNQkVSOiBudW1iZXIgPSAweDRGO1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU1dGVHlwZVRhZ3Mge1xyXG4gICAgcHVibGljIHN0YXRpYyBTVFJJTkdfTElURVJBTDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgRkxPQVRfTElURVJBTDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0aWMgTlVMTDogbnVtYmVyID0gMjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVU5ERUZJTkVEOiBudW1iZXIgPSAzO1xyXG4gICAgcHVibGljIHN0YXRpYyBSRUdJU1RFUjogbnVtYmVyID0gNDtcclxuICAgIHB1YmxpYyBzdGF0aWMgQk9PTEVBTjogbnVtYmVyID0gNTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRE9VQkxFOiBudW1iZXIgPSA2O1xyXG4gICAgcHVibGljIHN0YXRpYyBJTlRFR0VSOiBudW1iZXIgPSA3O1xyXG4gICAgcHVibGljIHN0YXRpYyBDT05TVEFOVDg6IG51bWJlciA9IDg7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPTlNUQU5UMTY6IG51bWJlciA9IDk7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZPdGhlclRhZ3Mge1xyXG4gICAgcHVibGljIHN0YXRpYyBDT0RFQ19NUDM6IG51bWJlciA9IDI7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlIHtcclxuICAgIHByaXZhdGUgaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb2xvcjogcDUuQ29sb3I7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZVNpemU6IG51bWJlciA9IDI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRpb25UaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0gaW5pdGlhbFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFZlbG9jaXR5ID0gaW5pdGlhbFZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24gPSBjb25zdGFudEFjY2VsZXJhdGlvbjtcclxuICAgICAgICB0aGlzLmNyZWF0aW9uVGltZUluU2Vjb25kcyA9IGNyZWF0aW9uVGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgZWxhcHNlZFRpbWUgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uOiBwNS5WZWN0b3IgPSB0aGlzLmdldFBvc2l0aW9uKHAsIGVsYXBzZWRUaW1lKTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLm5vU3Ryb2tlKCk7XHJcbiAgICAgICAgcC5maWxsKGNvbG9yKTtcclxuICAgICAgICBwLmNpcmNsZShjdXJyZW50UG9zaXRpb24ueCwgY3VycmVudFBvc2l0aW9uLnksIFBhcnRpY2xlLnBhcnRpY2xlU2l6ZSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFBvc2l0aW9uKHA6IHA1LCBlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHZlbG9jaXR5Q29tcG9uZW50OiBwNS5WZWN0b3IgPSBwNS5WZWN0b3IubXVsdCh0aGlzLmluaXRpYWxWZWxvY2l0eSwgZWxhcHNlZFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBhY2NlbGVyYXRpb25Db21wb25lbnQ6IHA1LlZlY3RvciA9IHA1LlZlY3Rvci5tdWx0KHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24sXHJcbiAgICAgICAgICAgIGVsYXBzZWRUaW1lSW5TZWNvbmRzICogZWxhcHNlZFRpbWVJblNlY29uZHMgLyAyKTtcclxuICAgICAgICByZXR1cm4gcDUuVmVjdG9yLmFkZChwNS5WZWN0b3IuYWRkKHRoaXMuaW5pdGlhbFBvc2l0aW9uLCB2ZWxvY2l0eUNvbXBvbmVudCksIGFjY2VsZXJhdGlvbkNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWVJblNlY29uZHMgLSB0aGlzLmNyZWF0aW9uVGltZUluU2Vjb25kcztcclxuICAgIH1cclxufSIsImltcG9ydCB7UGFydGljbGV9IGZyb20gXCIuL3BhcnRpY2xlXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZVN5c3RlbSB7XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlczogUGFydGljbGVbXTtcclxuICAgIHByaXZhdGUgcGFydGljbGVMaWZldGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmVsb2NpdHlBbmdsZVZhcmlhdGlvbkluRGVncmVlczogbnVtYmVyID0gMzA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyB2ZWxvY2l0eU1hZ25pdHVkZVZhcmlhdGlvbkluUGVyY2VudDogbnVtYmVyID0gMzA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjb2xvclZhcmlhdGlvbjogbnVtYmVyID0gMzA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFydGljbGVMaWZldGltZUluU2Vjb25kczogbnVtYmVyLCBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzID0gcGFydGljbGVMaWZldGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLmNvbnN0YW50QWNjZWxlcmF0aW9uID0gY29uc3RhbnRBY2NlbGVyYXRpb247XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMub2xkZXN0UGFydGljbGVBZ2UoY3VycmVudFRpbWVJblNlY29uZHMpID4gdGhpcy5wYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlT2xkZXN0UGFydGljbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGU6IFBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBhbHBoYUFkanVzdGVkQ29sb3I6IHA1LkNvbG9yID0gdGhpcy5nZXRBbHBoYUFkanVzdGVkQ29sb3IocGFydGljbGUsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgcGFydGljbGUuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcywgYWxwaGFBZGp1c3RlZENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbGRlc3RQYXJ0aWNsZUFnZShjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFydGljbGVzWzBdLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlT2xkZXN0UGFydGljbGUoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc2hpZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFscGhhQWRqdXN0ZWRDb2xvcihwYXJ0aWNsZTogUGFydGljbGUsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgYmFzZUNvbG9yID0gcGFydGljbGUuY29sb3I7XHJcbiAgICAgICAgbGV0IHBhcnRpY2xlQWdlID0gcGFydGljbGUuZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBsaWZlUmVtYWluaW5nUGVyY2VudCA9ICh0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMgLSBwYXJ0aWNsZUFnZSkgLyB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IGFscGhhID0gdGhpcy5pbnRlcnBvbGF0ZSgwLCAyNTUsIGxpZmVSZW1haW5pbmdQZXJjZW50KTtcclxuICAgICAgICBsZXQgbmV3Q29sb3I6IHA1LkNvbG9yID0gcC5jb2xvcihiYXNlQ29sb3IpO1xyXG4gICAgICAgIG5ld0NvbG9yLnNldEFscGhhKGFscGhhKTtcclxuICAgICAgICByZXR1cm4gbmV3Q29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnBvbGF0ZShtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWUgKyAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKiByYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbjogcDUuVmVjdG9yLCBpbml0aWFsVmVsb2NpdHk6IHA1LlZlY3RvciwgY3JlYXRpb25UaW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1QYXJ0aWNsZXM6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXJ0aWNsZXM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbmV3SW5pdGFsVmVsb2NpdHkgPSB0aGlzLnJhbmRvbWl6ZVZlY3RvcihwLCBpbml0aWFsVmVsb2NpdHkpO1xyXG4gICAgICAgICAgICBsZXQgbmV3Q29sb3IgPSB0aGlzLnJhbmRvbWl6ZUNvbG9yKHAsIGNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRQYXJ0aWNsZShpbml0aWFsUG9zaXRpb24sIG5ld0luaXRhbFZlbG9jaXR5LCBjcmVhdGlvblRpbWVJblNlY29uZHMsIG5ld0NvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3IocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb25SYW5kb21pemVkOiBwNS5WZWN0b3IgPSB0aGlzLnJhbmRvbWl6ZVZlY3RvckRpcmVjdGlvbihwLCBiYXNlVmVjdG9yKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5kb21pemVWZWN0b3JNYWduaXR1ZGUocCwgZGlyZWN0aW9uUmFuZG9taXplZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3JEaXJlY3Rpb24ocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgbGV0IGFuZ2xlSW5EZWdyZWVzID0gYmFzZVZlY3Rvci5oZWFkaW5nKCk7XHJcbiAgICAgICAgbGV0IGFuZ2xlQ2hhbmdlSW5EZWdyZWVzID0gcC5yYW5kb20oLVBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5QW5nbGVWYXJpYXRpb25JbkRlZ3JlZXMgLyAyLFxyXG4gICAgICAgICAgICBQYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eUFuZ2xlVmFyaWF0aW9uSW5EZWdyZWVzIC8gMik7XHJcbiAgICAgICAgbGV0IGZpbmFsQW5nbGVJblJhZGlhbnMgPSBwLnJhZGlhbnMoYW5nbGVJbkRlZ3JlZXMgKyBhbmdsZUNoYW5nZUluRGVncmVlcyk7XHJcbiAgICAgICAgbGV0IG1hZ25pdHVkZSA9IGJhc2VWZWN0b3IubWFnKCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICByZXR1cm4gcDUuVmVjdG9yLmZyb21BbmdsZShmaW5hbEFuZ2xlSW5SYWRpYW5zLCBtYWduaXR1ZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9taXplVmVjdG9yTWFnbml0dWRlKHA6IHA1LCBiYXNlVmVjdG9yOiBwNS5WZWN0b3IpIHtcclxuICAgICAgICBsZXQgbWFnbml0dWRlQ2hhbmdlSW5QZXJjZW50ID0gcC5yYW5kb20oLVBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5TWFnbml0dWRlVmFyaWF0aW9uSW5QZXJjZW50IC8gMixcclxuICAgICAgICAgICAgUGFydGljbGVTeXN0ZW0udmVsb2NpdHlNYWduaXR1ZGVWYXJpYXRpb25JblBlcmNlbnQgLyAyKTtcclxuICAgICAgICBsZXQgZmluYWxNYWduaXR1ZGUgPSBiYXNlVmVjdG9yLm1hZygpICogKDEwMCArIG1hZ25pdHVkZUNoYW5nZUluUGVyY2VudCkgLyAxMDA7XHJcbiAgICAgICAgcmV0dXJuIGJhc2VWZWN0b3Iuc2V0TWFnKGZpbmFsTWFnbml0dWRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZUNvbG9yKHA6IHA1LCBiYXNlQ29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IG5ld1JlZCA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLnJlZChiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICBsZXQgbmV3R3JlZW4gPSB0aGlzLmJvdW5kZWRSYW5kb21pemUocCwgcC5ncmVlbihiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICBsZXQgbmV3Qmx1ZSA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLmJsdWUoYmFzZUNvbG9yKSwgUGFydGljbGVTeXN0ZW0uY29sb3JWYXJpYXRpb24sIDAsIDI1NSk7XHJcbiAgICAgICAgcmV0dXJuIHAuY29sb3IobmV3UmVkLCBuZXdHcmVlbiwgbmV3Qmx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBib3VuZGVkUmFuZG9taXplKHA6IHA1LCB2YWx1ZTogbnVtYmVyLCB2YXJpYXRpb246IG51bWJlciwgbG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZSArIHAucmFuZG9tKC12YXJpYXRpb24gLyAyLCB2YXJpYXRpb24gLyAyKTtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPD0gbG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyQm91bmQgPCBuZXdWYWx1ZSAmJiBuZXdWYWx1ZSA8IHVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGFydGljbGUoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgUGFydGljbGUoaW5pdGlhbFBvc2l0aW9uLCBpbml0aWFsVmVsb2NpdHksIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24sIGNyZWF0aW9uVGltZUluU2Vjb25kcywgY29sb3IpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBQbGF5ZXJLZXlBY3Rpb24ge1xyXG4gICAgZ2FtZVRpbWU6IG51bWJlcjtcclxuICAgIHRyYWNrOiBudW1iZXI7XHJcbiAgICBrZXlTdGF0ZTogS2V5U3RhdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZVRpbWU6IG51bWJlciwgdHJhY2s6IG51bWJlciwga2V5U3RhdGU6IEtleVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lVGltZSA9IGdhbWVUaW1lO1xyXG4gICAgICAgIHRoaXMudHJhY2sgPSB0cmFjaztcclxuICAgICAgICB0aGlzLmtleVN0YXRlID0ga2V5U3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEtleVN0YXRlIHtcclxuICAgIFVQLCBET1dOLFxyXG59IiwiaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge0Rpc3BsYXlDb25maWcsIERpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7VGltZU1hbmFnZXJ9IGZyb20gXCIuL3RpbWVfbWFuYWdlclwiO1xyXG5pbXBvcnQge01pc3NNYW5hZ2VyfSBmcm9tIFwiLi9taXNzX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxNYW5hZ2VyfSBmcm9tIFwiLi9zY3JvbGxfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Jlc3VsdHNEaXNwbGF5fSBmcm9tIFwiLi9yZXN1bHRzX2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7XHJcbiAgICBpbml0aWFsaXplS2V5QmluZGluZ3MsXHJcbiAgICBpc0tleUJpbmRpbmdzRGVmaW5lZCxcclxuICAgIHJlcGxhY2VOb3RZZXRJbXBsZW1lbnRlZE5vdGVUeXBlcyxcclxuICAgIHNldEFsbE5vdGVzVG9EZWZhdWx0U3RhdGVcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleVN0YXRlLCBQbGF5ZXJLZXlBY3Rpb259IGZyb20gXCIuL3BsYXllcl9rZXlfYWN0aW9uXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZywgQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZX0gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lGZWVkYmFja1RleHR9IGZyb20gXCIuL2FjY3VyYWN5X2ZlZWRiYWNrX3RleHRcIjtcclxuaW1wb3J0IHtSZWNlcHRvclNocmlua1JlYWN0aW9ufSBmcm9tIFwiLi9yZWNlcHRvcl9zaHJpbmtfcmVhY3Rpb25cIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrRmxhc2h9IGZyb20gXCIuL2FjY3VyYWN5X2ZlZWRiYWNrX2ZsYXNoXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlc30gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzXCI7XHJcbmltcG9ydCB7SG9sZFBhcnRpY2xlc30gZnJvbSBcIi4vaG9sZF9wYXJ0aWNsZXNcIjtcclxuaW1wb3J0IHtIb2xkR2xvd30gZnJvbSBcIi4vaG9sZF9nbG93XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWluZ0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogUDVTY2VuZTtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSB0aW1lTWFuYWdlcjogR2FtZVRpbWVQcm92aWRlcjtcclxuICAgIHByaXZhdGUgbWlzc01hbmFnZXI6IE1pc3NNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgZ2FtZUVuZFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2hvd1Jlc3VsdHNTY3JlZW46IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgaXNEZWJ1Z01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lGZWVkYmFja1RleHQ6IEFjY3VyYWN5RmVlZGJhY2tUZXh0O1xyXG4gICAgcHJpdmF0ZSBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcbiAgICBwcml2YXRlIHJlY2VwdG9yU2hyaW5rUmVhY3Rpb246IFJlY2VwdG9yU2hyaW5rUmVhY3Rpb247XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5RmVlZGJhY2tGbGFzaDogQWNjdXJhY3lGZWVkYmFja0ZsYXNoO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzOiBBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzO1xyXG4gICAgcHJpdmF0ZSBob2xkUGFydGljbGVzOiBIb2xkUGFydGljbGVzO1xyXG4gICAgcHJpdmF0ZSBob2xkR2xvdzogSG9sZEdsb3c7XHJcbiAgICBwcml2YXRlIGF1ZGlvRmlsZTogQXVkaW9GaWxlO1xyXG4gICAgcHJpdmF0ZSB0aW1lRGlmZkludGVydmFsOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUsIGNvbmZpZzogQ29uZmlnLCBzY2VuZTogUDVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdHNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1ZGlvRmlsZSA9IGF1ZGlvRmlsZTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRpbWUgbWFuYWdlciBhbmQgcGxheSB0aGUgYXVkaW8gYXMgY2xvc2UgdG9nZXRoZXIgYXMgcG9zc2libGUgdG8gc3luY2hyb25pemUgdGhlIGF1ZGlvIHdpdGggdGhlIGdhbWVcclxuICAgICAgICBpZiAoIXRoaXMuaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBUaW1lTWFuYWdlcihwZXJmb3JtYW5jZS5ub3coKSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvRmlsZS5wbGF5KGNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBqdXN0IGZvciBkZWJ1Z2dpbmdcclxuICAgICAgICAgICAgdGhpcy50aW1lRGlmZkludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF1ZGlvVGltZSA9IHRoaXMuYXVkaW9GaWxlLmdldEN1cnJlbnRUaW1lSW5TZWNvbmRzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1ZGlvIHRpbWU6IFwiICsgYXVkaW9UaW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBnYW1lVGltZSA9IHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIHRpbWU6IFwiICsgZ2FtZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVEaWZmID0gYXVkaW9UaW1lIC0gZ2FtZVRpbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRpbWUgZGlmZjogXCIgKyB0aW1lRGlmZik7XHJcbiAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5ldyBOb3RlTWFuYWdlcih0cmFja3MpO1xyXG4gICAgICAgIGxldCBudW1UcmFja3M6IG51bWJlciA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gbmV3IEFjY3VyYWN5UmVjb3JkaW5nKG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IDI0MDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gNDgwO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WCA9ICh0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLndpZHRoIC0gd2lkdGgpIC8gMjtcclxuICAgICAgICBsZXQgdG9wTGVmdFkgPSAodGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZS5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSBuZXcgUGxheWluZ0NvbmZpZyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuZGlzcGxheUNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSxcclxuICAgICAgICAgICAgdG9wTGVmdFgsIHRvcExlZnRZLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzID0gbmV3IEhvbGRQYXJ0aWNsZXModGhpcy5jb25maWcsIG51bVRyYWNrcywgdGhpcy5kaXNwbGF5TWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5ob2xkR2xvdyA9IG5ldyBIb2xkR2xvdyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzLCB0aGlzLmRpc3BsYXlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gbmV3IEhvbGRNYW5hZ2VyKG51bVRyYWNrcywgdGhpcy5vblRyYWNrSG9sZC5iaW5kKHRoaXMpLCB0aGlzLm9uVHJhY2tVbmhvbGQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZU1hbmFnZXIgPSBuZXcgU2Nyb2xsTWFuYWdlcih0aGlzLmNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdhbWVFbmRUaW1lID0gdGhpcy5jYWxjdWxhdGVHYW1lRW5kKHRoaXMuYXVkaW9GaWxlLmdldER1cmF0aW9uKCksIHRoaXMuZ2V0Tm90ZXNFbmRUaW1lKCkpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyID0gbmV3IEFjY3VyYWN5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmNvbmZpZywgdGhpcy5ob2xkTWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIgPSBuZXcgTWlzc01hbmFnZXIodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuaG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrVGV4dCA9IG5ldyBBY2N1cmFjeUZlZWRiYWNrVGV4dCh0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0b3BMZWZ0WCArIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgdG9wTGVmdFkgKyBoZWlnaHQgLyAyLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2ggPSBuZXcgQWNjdXJhY3lGZWVkYmFja0ZsYXNoKHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlNYW5hZ2VyLFxyXG4gICAgICAgICAgICBudW1UcmFja3MpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbiA9IG5ldyBSZWNlcHRvclNocmlua1JlYWN0aW9uKHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlDb25maWcsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzID0gbmV3IEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXModGhpcy5jb25maWcsIHRoaXMuZGlzcGxheU1hbmFnZXIsIG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGlmICghaXNLZXlCaW5kaW5nc0RlZmluZWQobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplS2V5QmluZGluZ3MobnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iaW5kS2V5QmluZGluZ3NUb0FjdGlvbnMoKTtcclxuICAgICAgICBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzKTtcclxuICAgICAgICByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXModGhpcy5ub3RlTWFuYWdlci50cmFja3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUcmFjayAjXCIgKyAoYWNjdXJhY3lFdmVudC50cmFja051bWJlciArIDEpICsgXCIgXCIgKyBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TmFtZSArXHJcbiAgICAgICAgLy8gICAgIChNYXRoLmFicyhhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzKSA9PSBJbmZpbml0eSA/XHJcbiAgICAgICAgLy8gICAgICAgICBcIlwiIDpcclxuICAgICAgICAvLyAgICAgICAgIFwiIChcIiArIE1hdGgucm91bmQoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcykgKyBcIiBtcylcIikpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuYWRkUGFydGljbGVzRm9yQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVJblNlY29uZHMgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJblNlY29uZHMgPj0gdGhpcy5nYW1lRW5kVGltZSAmJiAhdGhpcy5zaG93UmVzdWx0c1NjcmVlbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnN0YXRlID0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZS5SRUFEWTtcclxuICAgICAgICAgICAgdGhpcy5lbmRTb25nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIudXBkYXRlKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5kcmF3KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tUZXh0LmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2guZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3Rlc0VuZFRpbWUoKSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0QWNjdXJhY3k6IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlYXJsaWVzdEFjY3VyYWN5ID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWFybGllc3RBY2N1cmFjeSA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlTWFuYWdlci5nZXRMYXRlc3ROb3RlKCkudGltZUluU2Vjb25kcyArIGVhcmxpZXN0QWNjdXJhY3kgLyAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlR2FtZUVuZChhdWRpb0R1cmF0aW9uOiBudW1iZXIsIG5vdGVzRW5kVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGF1ZGlvRHVyYXRpb24gPCBub3Rlc0VuZFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vdGVzRW5kVGltZSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihub3Rlc0VuZFRpbWUgKyA1LCBhdWRpb0R1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuZFNvbmcoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb0ZpbGUuc3RvcCgpO1xyXG4gICAgICAgIGdsb2JhbC5yZXN1bHRzRGlzcGxheSA9IG5ldyBSZXN1bHRzRGlzcGxheSh0aGlzLmNvbmZpZywgdGhpcy5ub3RlTWFuYWdlciwgdGhpcy5hY2N1cmFjeU1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlJFU1VMVFMpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kS2V5cygpO1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lRGlmZkludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJpbmRLZXlCaW5kaW5nc1RvQWN0aW9ucygpIHtcclxuICAgICAgICBsZXQga2V5QmluZGluZ3MgPSBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldCh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGgpO1xyXG4gICAgICAgIGxldCBpc1NwYWNlYmFyQm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgc3BhY2ViYXJLZXlDb2RlOiBudW1iZXIgPSAzMjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nID0ga2V5QmluZGluZ3NbaV07XHJcbiAgICAgICAgICAgIGlmIChrZXlCaW5kaW5nLmtleUNvZGUgPT09IHNwYWNlYmFyS2V5Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgaXNTcGFjZWJhckJvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKGtleUJpbmRpbmcua2V5Q29kZSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleURvd25BY3Rpb25Gb3JUcmFjayhrZXlCaW5kaW5nLnRyYWNrTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVVwQWN0aW9uRm9yVHJhY2soa2V5QmluZGluZy50cmFja051bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKGdsb2JhbC5jb25maWcucXVpdEtleSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVuZFNvbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFpc1NwYWNlYmFyQm91bmQpIHtcclxuICAgICAgICAgICAgLy8gYmluZCBrZXkgdG8gbm90aGluZyB0byBtYWtlIHN1cmUgdGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgcHJldmVudGVkXHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oc3BhY2ViYXJLZXlDb2RlLCAoKSA9PiB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUga2V5RG93bkFjdGlvbkZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2hyaW5rUmVhY3Rpb24uaG9sZFRyYWNrKHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBsZXQgcGxheWVyS2V5QWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24gPVxyXG4gICAgICAgICAgICBuZXcgUGxheWVyS2V5QWN0aW9uKHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpLCB0cmFja051bWJlciwgS2V5U3RhdGUuRE9XTik7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIuaGFuZGxlUGxheWVyQWN0aW9uKHBsYXllcktleUFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBrZXlVcEFjdGlvbkZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2hyaW5rUmVhY3Rpb24ucmVsZWFzZVRyYWNrKHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBsZXQgcGxheWVyS2V5QWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24gPVxyXG4gICAgICAgICAgICBuZXcgUGxheWVyS2V5QWN0aW9uKHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpLCB0cmFja051bWJlciwgS2V5U3RhdGUuVVApO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyLmhhbmRsZVBsYXllckFjdGlvbihwbGF5ZXJLZXlBY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25UcmFja0hvbGQodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRHbG93LmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZEdsb3csIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy5ob2xkVHJhY2suY2FsbCh0aGlzLmhvbGRQYXJ0aWNsZXMsIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25UcmFja1VuaG9sZCh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZEdsb3cudW5ob2xkVHJhY2suY2FsbCh0aGlzLmhvbGRHbG93LCB0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRQYXJ0aWNsZXMudW5ob2xkVHJhY2suY2FsbCh0aGlzLmhvbGRQYXJ0aWNsZXMsIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5iaW5kS2V5cygpIHtcclxuICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KGdsb2JhbC5jb25maWcucXVpdEtleSk7XHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzID0gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQodGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nID0ga2V5QmluZGluZ3NbaV07XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoa2V5QmluZGluZy5rZXlDb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBsYXlpbmdDb25maWcgaW1wbGVtZW50cyBEaXNwbGF5Q29uZmlnIHtcclxuICAgIHB1YmxpYyBub3RlU2l6ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzY3JvbGxEaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbjtcclxuICAgIHB1YmxpYyByZWNlcHRvclNpemVzOiBudW1iZXJbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMucGl4ZWxzUGVyU2Vjb25kID0gY29uZmlnLnBpeGVsc1BlclNlY29uZDtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yWVBlcmNlbnQgPSBjb25maWcucmVjZXB0b3JZUGVyY2VudDtcclxuICAgICAgICB0aGlzLnNjcm9sbERpcmVjdGlvbiA9IGNvbmZpZy5zY3JvbGxEaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMucHVzaChjb25maWcubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXROb3RlU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vdGVTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBpeGVsc1BlclNlY29uZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpeGVsc1BlclNlY29uZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWNlcHRvclNpemVzKCk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWNlcHRvclNpemVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlY2VwdG9yWVBlcmNlbnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWNlcHRvcllQZXJjZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNjcm9sbERpcmVjdGlvbigpOiBTY3JvbGxEaXJlY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjcm9sbERpcmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSZWNlcHRvclNpemUodHJhY2tOdW1iZXI6IG51bWJlciwgcmVjZXB0b3JTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXNbdHJhY2tOdW1iZXJdID0gcmVjZXB0b3JTaXplO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhcnNpbmdIZWxwZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBiZWF0bWFwVG9UcmFja0FycmF5KGJlYXRtYXA6IFtudW1iZXIsIHN0cmluZywgc3RyaW5nXVtdKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrczogTm90ZVtdW10gPSBbW10sIFtdLCBbXSwgW11dO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmVhdG1hcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYmVhdG1hcFJvdyA9IGJlYXRtYXBbaV07XHJcbiAgICAgICAgICAgIGxldCB0cmFja051bWJlciA9IHRoaXMudHJhY2tOdW1iZXJGcm9tRGlyZWN0aW9uKGJlYXRtYXBSb3dbMV0pO1xyXG4gICAgICAgICAgICBsZXQgbm90ZSA9IHRoaXMubm90ZUZyb21CZWF0bWFwUm93KGJlYXRtYXBSb3cpO1xyXG4gICAgICAgICAgICB0cmFja3NbdHJhY2tOdW1iZXJdLnB1c2gobm90ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG5vdGVGcm9tQmVhdG1hcFJvdyhyb3c6IFtudW1iZXIsIHN0cmluZywgc3RyaW5nXSk6IE5vdGUge1xyXG4gICAgICAgIGxldCB0aW1lSW5TZWNvbmRzID0gcm93WzBdIC8gMzA7XHJcbiAgICAgICAgcmV0dXJuIHt0aW1lSW5TZWNvbmRzOiB0aW1lSW5TZWNvbmRzLCB0eXBlOiBOb3RlVHlwZS5OT1JNQUwsIHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVCwgdHlwZVN0cmluZzogXCJOL0FcIn07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHJhY2tOdW1iZXJGcm9tRGlyZWN0aW9uKGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiTFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJVXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiUlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IFwiVW5rbm93biB0cmFjayBkaXJlY3Rpb24gJ1wiICsgZGlyZWN0aW9uICsgXCInXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7U29uZ30gZnJvbSBcIi4vc29uZ1wiO1xyXG5pbXBvcnQge1BsYXlsaXN0Q2xpZW50U3RhdGV9IGZyb20gXCIuL3BsYXlsaXN0X2NsaWVudF9zdGF0ZVwiO1xyXG5pbXBvcnQge2dldENvbnRlbnRzQnlUYWdOYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7cGFyc2VTd2ZGcm9tQXJyYXlCdWZmZXIsIFN3ZlBhcnNlUmVzcG9uc2V9IGZyb20gXCIuLi9wYXJzaW5nL3BhcnNlX3N3ZlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXlsaXN0Q2xpZW50IHtcclxuICAgIHByaXZhdGUgc3RhdGU6IFBsYXlsaXN0Q2xpZW50U3RhdGU7XHJcbiAgICBwcml2YXRlIGNvcnNXb3JrYXJvdW5kOiBzdHJpbmcgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vJztcclxuICAgIHByaXZhdGUgc29uZ1VybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwbGF5bGlzdFVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwbGF5bGlzdDogU29uZ1tdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLk5PX0FQSVM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFN0YXRlKCk6IFBsYXlsaXN0Q2xpZW50U3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQbGF5bGlzdCgpOiBTb25nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXlsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBpbml0aWFsaXplKGluZGV4VXJsOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRBcGlzKGluZGV4VXJsKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkUGxheWxpc3QoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgbG9hZEFwaXMoaW5kZXhVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLlBST0NFU1NJTkc7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0KGluZGV4VXJsKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB0aGlzLnNhdmVBcGlzRnJvbVBsYXlsaXN0SW5kZXgocmVxdWVzdCkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZUFwaXNGcm9tUGxheWxpc3RJbmRleChyZXF1ZXN0OiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgICAgIGxldCByZXNwb25zZVhtbDogRG9jdW1lbnQgPSByZXF1ZXN0LnJlc3BvbnNlWE1MO1xyXG4gICAgICAgIHRoaXMuc29uZ1VybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHJlc3BvbnNlWG1sLCBcInNvbmdVUkxcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5bGlzdFVybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHJlc3BvbnNlWG1sLCBcInBsYXlsaXN0VVJMXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLkFQSVNfTE9BREVEO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgbG9hZFBsYXlsaXN0KCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLlBST0NFU1NJTkc7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0KHRoaXMucGxheWxpc3RVcmwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHRoaXMuc2F2ZVBsYXlsaXN0KHJlcXVlc3QpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGUpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVQbGF5bGlzdChyZXF1ZXN0OiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgICAgIGxldCBwbGF5bGlzdFRleHQ6IHN0cmluZyA9IHJlcXVlc3QucmVzcG9uc2U7XHJcblxyXG4gICAgICAgIC8vIHJlcGxhY2UgYW1wZXJzYW5kcyBiZWNhdXNlIHRoZSBET01QYXJzZXIgZG9lc24ndCBsaWtlIHRoZW1cclxuICAgICAgICBwbGF5bGlzdFRleHQgPSBwbGF5bGlzdFRleHQucmVwbGFjZSgvJi9nLCAnJmFtcDsnKTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXlsaXN0WG1sOiBEb2N1bWVudCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcocGxheWxpc3RUZXh0LCBcInRleHQveG1sXCIpO1xyXG4gICAgICAgIGxldCBzb25nczogU29uZ1tdID0gdGhpcy5nZXRTb25nc0Zyb21QbGF5bGlzdFhtbChwbGF5bGlzdFhtbCk7XHJcbiAgICAgICAgdGhpcy5zYXZlU29uZ3NJZlZhbGlkKHNvbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNvbmdzRnJvbVBsYXlsaXN0WG1sKHBsYXlsaXN0WG1sOiBEb2N1bWVudCk6IFNvbmdbXSB7XHJcbiAgICAgICAgbGV0IHNvbmdzWG1sOiBIVE1MQ29sbGVjdGlvbiA9IHBsYXlsaXN0WG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic29uZ1wiKTtcclxuICAgICAgICBsZXQgc29uZ3M6IFNvbmdbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29uZ3NYbWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNvbmdYbWw6IEVsZW1lbnQgPSBzb25nc1htbC5pdGVtKGkpO1xyXG4gICAgICAgICAgICBsZXQgc29uZzogU29uZyA9IFNvbmcub2ZYbWwoc29uZ1htbCk7XHJcbiAgICAgICAgICAgIHNvbmdzLnB1c2goc29uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzb25ncztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVTb25nc0lmVmFsaWQoc29uZ3M6IFNvbmdbXSkge1xyXG4gICAgICAgIGlmIChzb25ncy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJMb2FkZWQgYSBwbGF5bGlzdCB3aXRoIG5vIHNvbmdzLlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLlBMQVlMSVNUX0xPQURFRDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5bGlzdCA9IHNvbmdzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0U3dmKHNvbmdJbmRleDogbnVtYmVyKTogUHJvbWlzZTxTd2ZQYXJzZVJlc3BvbnNlPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuUFJPQ0VTU0lORztcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0KHRoaXMuZ2V0TGV2ZWxVcmwoc29uZ0luZGV4KSwgXCJhcnJheWJ1ZmZlclwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB0aGlzLmdldFBhcnNlZFN3ZihyZXF1ZXN0KSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZXZlbFVybChzb25nSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHNvbmc6IFNvbmcgPSB0aGlzLnBsYXlsaXN0W3NvbmdJbmRleF07XHJcbiAgICAgICAgbGV0IGxldmVsOiBzdHJpbmcgPSBzb25nLmxldmVsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvbmdVcmwgKyBcImxldmVsX1wiICsgbGV2ZWwgKyBcIi5zd2ZcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFBhcnNlZFN3ZihyZXF1ZXN0OiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgICAgIGxldCBwYXJzZWRTd2YgPSBwYXJzZVN3ZkZyb21BcnJheUJ1ZmZlcig8QXJyYXlCdWZmZXI+IHJlcXVlc3QucmVzcG9uc2UpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLlBMQVlMSVNUX0xPQURFRDtcclxuICAgICAgICByZXR1cm4gcGFyc2VkU3dmO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0KHVybDogc3RyaW5nLCByZXNwb25zZVR5cGU/OiBYTUxIdHRwUmVxdWVzdFJlc3BvbnNlVHlwZSk6IFByb21pc2U8WE1MSHR0cFJlcXVlc3Q+IHtcclxuICAgICAgICBsZXQgZ2V0VXJsID0gdGhpcy5jb3JzV29ya2Fyb3VuZCArIHVybDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdDogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBnZXRVcmwsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2VUeXBlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXaGVuIHRoZSByZXF1ZXN0IGxvYWRzLCBjaGVjayB3aGV0aGVyIGl0IHdhcyBzdWNjZXNzZnVsXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHN1Y2Nlc3NmdWwsIHJlc29sdmUgdGhlIHByb21pc2UgYnkgcGFzc2luZyBiYWNrIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgZmFpbHMsIHJlamVjdCB0aGUgcHJvbWlzZSB3aXRoIGEgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIkdldCByZXF1ZXN0IGZhaWxlZCB3aXRoIGVycm9yIGNvZGU6XCIgKyByZXF1ZXN0LnN0YXR1c1RleHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbHNvIGRlYWwgd2l0aCB0aGUgY2FzZSB3aGVuIHRoZSBlbnRpcmUgcmVxdWVzdCBmYWlscyB0byBiZWdpbiB3aXRoXHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGEgbmV0d29yayBlcnJvciwgc28gcmVqZWN0IHRoZSBwcm9taXNlIHdpdGggYW4gYXBwcm9wcmlhdGUgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKCdUaGVyZSB3YXMgYSBuZXR3b3JrIGVycm9yLicpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZTogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSBQbGF5bGlzdENsaWVudFN0YXRlIHtcclxuICAgIE5PX0FQSVMsXHJcbiAgICBBUElTX0xPQURFRCxcclxuICAgIFBMQVlMSVNUX0xPQURFRCxcclxuICAgIFBST0NFU1NJTkcsXHJcbiAgICBFUlJPUlxyXG59XHJcbiIsImltcG9ydCB7Z2V0Q29udGVudHNCeVRhZ05hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTb25nIHtcclxuICAgIHB1YmxpYyBnZW5yZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHNvbmdOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ0F1dGhvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdBdXRob3JVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nRGlmZmljdWx0eTogbnVtYmVyO1xyXG4gICAgcHVibGljIHNvbmdTdHlsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdMZW5ndGg6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nU3RlcGF1dGhvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGxldmVsOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBvZlhtbCh4bWw6IEVsZW1lbnQpOiBTb25nIHtcclxuICAgICAgICBsZXQgc29uZyA9IG5ldyBTb25nKCk7XHJcbiAgICAgICAgc29uZy5nZW5yZSA9IHBhcnNlSW50KHhtbC5nZXRBdHRyaWJ1dGUoXCJnZW5yZVwiKSk7XHJcbiAgICAgICAgc29uZy5zb25nTmFtZSA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nbmFtZVwiKTtcclxuICAgICAgICBzb25nLnNvbmdBdXRob3IgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ2F1dGhvclwiKTtcclxuICAgICAgICBzb25nLnNvbmdBdXRob3JVcmwgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ2F1dGhvcnVybFwiKTtcclxuICAgICAgICBzb25nLnNvbmdEaWZmaWN1bHR5ID0gcGFyc2VJbnQoZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdkaWZmaWN1bHR5XCIpKTtcclxuICAgICAgICBzb25nLnNvbmdTdHlsZSA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nc3R5bGVcIik7XHJcbiAgICAgICAgc29uZy5zb25nTGVuZ3RoID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdsZW5ndGhcIik7XHJcbiAgICAgICAgc29uZy5zb25nU3RlcGF1dGhvciA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nc3RlcGF1dGhvclwiKTtcclxuICAgICAgICBzb25nLmxldmVsID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcImxldmVsXCIpO1xyXG4gICAgICAgIHJldHVybiBzb25nO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sOiBFbGVtZW50IHwgRG9jdW1lbnQsIHRhZzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZylbMF0uaW5uZXJIVE1MO1xyXG59XHJcbiIsImltcG9ydCB7RGlzcGxheUNvbmZpZywgRGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge1Njcm9sbE1hbmFnZXJ9IGZyb20gXCIuL3Njcm9sbF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJldmlld0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogUDVTY2VuZTtcclxuICAgIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxNYW5hZ2VyOiBTY3JvbGxNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHRvcExlZnRYID0gNjU7XHJcbiAgICBwcml2YXRlIHRvcExlZnRZID0gNDY7XHJcbiAgICBwcml2YXRlIHdpZHRoID0gMjAwO1xyXG4gICAgcHJpdmF0ZSBoZWlnaHQgPSA0MDA7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSwgY29uZmlnOiBDb25maWcsIHNjZW5lOiBQNVNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBuZXcgTm90ZU1hbmFnZXIodHJhY2tzKTtcclxuICAgICAgICB0aGlzLnNjcm9sbE1hbmFnZXIgPSBuZXcgU2Nyb2xsTWFuYWdlcih0aGlzLmNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSwgdGhpcy5nZXRCb3VuZHMoKSk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnID0gdGhpcy5nZXREaXNwbGF5Q29uZmlnKHRoaXMuY29uZmlnLCB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBuZXcgRGlzcGxheU1hbmFnZXIodGhpcy5ub3RlTWFuYWdlciwgdGhpcy5kaXNwbGF5Q29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLFxyXG4gICAgICAgICAgICB0aGlzLnRvcExlZnRYLCB0aGlzLnRvcExlZnRZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcodGhpcy5zY3JvbGxNYW5hZ2VyLmdldEdhbWVUaW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Qm91bmRzKCkge1xyXG4gICAgICAgIHJldHVybiB7dG9wTGVmdFg6IHRoaXMudG9wTGVmdFgsIHRvcExlZnRZOiB0aGlzLnRvcExlZnRZLCB3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5Q29uZmlnKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlcik6IERpc3BsYXlDb25maWcge1xyXG4gICAgICAgIGxldCByZWNlcHRvclNpemVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgcmVjZXB0b3JTaXplcy5wdXNoKGNvbmZpZy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXROb3RlU2l6ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UGl4ZWxzUGVyU2Vjb25kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnBpeGVsc1BlclNlY29uZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UmVjZXB0b3JZUGVyY2VudDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5yZWNlcHRvcllQZXJjZW50O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRTY3JvbGxEaXJlY3Rpb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcuc2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZWNlcHRvclNpemVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZXB0b3JTaXplcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0UmVjZXB0b3JTaXplOiAodHJhY2tOdW1iZXI6IG51bWJlciwgcmVjZXB0b3JTaXplOiBudW1iZXIpID0+IHt9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7RGlzcGxheUNvbmZpZ30gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjZXB0b3JTaHJpbmtSZWFjdGlvbiB7XHJcbiAgICBwcml2YXRlIHRyYWNrSG9sZFN0YXRlczogYm9vbGVhbltdO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWcsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnID0gZGlzcGxheUNvbmZpZztcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXMucHVzaChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzW3RyYWNrTnVtYmVyXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbGVhc2VUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXNbdHJhY2tOdW1iZXJdID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IG51bVJlY2VwdG9ycyA9IHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvclNpemVzKCkubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzaHJpbmsgPSAwLjc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1SZWNlcHRvcnM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2l6ZVJhdGlvID0gdGhpcy5pc1RyYWNrSGVsZChpKSA/IHNocmluayA6IDEuMDtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnLnNldFJlY2VwdG9yU2l6ZShpLCB0aGlzLmNvbmZpZy5ub3RlU2l6ZSAqIHNpemVSYXRpbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNUcmFja0hlbGQodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrSG9sZFN0YXRlc1t0cmFja051bWJlcl07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtkcmF3QWNjdXJhY3lCYXJzfSBmcm9tIFwiLi9kcmF3aW5nX3V0aWxcIjtcclxuaW1wb3J0IHtBY2N1cmFjeSwgQWNjdXJhY3lNYW5hZ2VyfSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3VsdHNEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgcDogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIsIHA6IHA1LFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyID0gYWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3QWNjdXJhY3lSZXN1bHRzKHRoaXMucCwgdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncywgdGhpcy5hY2N1cmFjeVJlY29yZGluZywgdGhpcy5ub3RlTWFuYWdlciwgdGhpcy5hY2N1cmFjeU1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FjY3VyYWN5UmVzdWx0cyhwOiBwNSwgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gcC53aWR0aCAvIDI7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSBwLmhlaWdodCAvIDI7XHJcbiAgICAgICAgbGV0IGJhcldpZHRoID0gcC53aWR0aCAqIDAuNjtcclxuICAgICAgICBsZXQgYmFySGVpZ2h0ID0gYmFyV2lkdGggLyAxMDtcclxuICAgICAgICBsZXQgbGVmdExhYmVsSGVpZ2h0ID0gMC44ICogYmFySGVpZ2h0O1xyXG4gICAgICAgIGxldCBhY2N1cmFjeUxpc3RGb3JSZXN1bHRzID0gdGhpcy5nZXRSZXN1bHRzQWNjdXJhY3lMaXN0KGFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIGRyYXdBY2N1cmFjeUJhcnMocCwgYWNjdXJhY3lMaXN0Rm9yUmVzdWx0cywgYWNjdXJhY3lSZWNvcmRpbmcsIGNlbnRlclgsIGNlbnRlclksIGxlZnRMYWJlbEhlaWdodCwgYmFyV2lkdGgsXHJcbiAgICAgICAgICAgIGJhckhlaWdodCwgbm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyLmlzQ29uZmlndXJlZEZvckJvb3MoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJuIGEgbGlzdCBvZiB1bmlxdWUgYWNjdXJhY2llcyBzb3J0ZWQgYnkgdGhlIG9mZnNldCwgd2l0aCB0aGUgYmVzdCBhY2N1cmFjeSBiZWluZyBmaXJzdFxyXG4gICAgcHJpdmF0ZSBnZXRSZXN1bHRzQWNjdXJhY3lMaXN0KGFjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH1bXSA9IGFjY3VyYWN5U2V0dGluZ3MubWFwKGFjY3VyYWN5ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogYWNjdXJhY3kubmFtZSxcclxuICAgICAgICAgICAgICAgIHNvcnRWYWx1ZTogdGhpcy5nZXRBY2N1cmFjeVNvcnRpbmdWYWx1ZShhY2N1cmFjeS5sb3dlckJvdW5kLCBhY2N1cmFjeS51cHBlckJvdW5kKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtZXJnZWRBY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPVxyXG4gICAgICAgICAgICB0aGlzLm1lcmdlQWNjdXJhY2llc1dpdGhTYW1lTmFtZShhY2N1cmFjeVRhYmxlKTtcclxuICAgICAgICBtZXJnZWRBY2N1cmFjeVRhYmxlLnNvcnQodGhpcy5hY2N1cmFjeVRhYmxlU29ydEZ1bmN0aW9uKTtcclxuICAgICAgICByZXR1cm4gbWVyZ2VkQWNjdXJhY3lUYWJsZS5tYXAocm93ID0+IHJvdy5hY2N1cmFjeU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QWNjdXJhY3lTb3J0aW5nVmFsdWUobG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAobG93ZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyh1cHBlckJvdW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVwcGVyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMobG93ZXJCb3VuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLmFicygodXBwZXJCb3VuZCArIGxvd2VyQm91bmQpIC8gMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtZXJnZUFjY3VyYWNpZXNXaXRoU2FtZU5hbWUoYWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZzsgc29ydFZhbHVlOiBudW1iZXIgfVtdKSB7XHJcbiAgICAgICAgbGV0IG1lcmdlZEFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgIHdoaWxlIChhY2N1cmFjeVRhYmxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGtleUFjY3VyYWN5TmFtZSA9IGFjY3VyYWN5VGFibGVbMF0uYWNjdXJhY3lOYW1lO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZEFjY3VyYWNpZXMgPSBhY2N1cmFjeVRhYmxlLmZpbHRlcihyb3cgPT4gcm93LmFjY3VyYWN5TmFtZSA9PT0ga2V5QWNjdXJhY3lOYW1lKTtcclxuICAgICAgICAgICAgbGV0IHNvcnRWYWx1ZUF2ZXJhZ2UgPSBtYXRjaGVkQWNjdXJhY2llc1xyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHN1bSwgcm93KSA9PiBzdW0gKyByb3cuc29ydFZhbHVlLCAwKVxyXG4gICAgICAgICAgICAgICAgLyBtYXRjaGVkQWNjdXJhY2llcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIG1lcmdlZEFjY3VyYWN5VGFibGUucHVzaCh7YWNjdXJhY3lOYW1lOiBrZXlBY2N1cmFjeU5hbWUsIHNvcnRWYWx1ZTogc29ydFZhbHVlQXZlcmFnZX0pO1xyXG4gICAgICAgICAgICBhY2N1cmFjeVRhYmxlID0gYWNjdXJhY3lUYWJsZS5maWx0ZXIocm93ID0+IHJvdy5hY2N1cmFjeU5hbWUgIT09IGtleUFjY3VyYWN5TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXJnZWRBY2N1cmFjeVRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWNjdXJhY3lUYWJsZVNvcnRGdW5jdGlvbihhOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH0pIHtcclxuICAgICAgICByZXR1cm4gYS5zb3J0VmFsdWUgLSBiLnNvcnRWYWx1ZTtcclxuICAgIH1cclxufSIsImV4cG9ydCBlbnVtIFNjcm9sbERpcmVjdGlvbiB7XHJcbiAgICBVcCxcclxuICAgIERvd24sXHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtUaW1lTWFuYWdlcn0gZnJvbSBcIi4vdGltZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtHYW1lVGltZVByb3ZpZGVyfSBmcm9tIFwiLi9nYW1lX3RpbWVfcHJvdmlkZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JvbGxNYW5hZ2VyIGltcGxlbWVudHMgR2FtZVRpbWVQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBzeXN0ZW1UaW1lTWlsbGlzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRpbWVNYW5hZ2VyOiBUaW1lTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc2Nyb2xsQm91bmRzOiB7IHRvcExlZnRYOiBudW1iZXIsIHRvcExlZnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIHA6IHA1LCBzY3JvbGxCb3VuZHM/OiB7IHRvcExlZnRYOiBudW1iZXIsIHRvcExlZnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH0pIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnN5c3RlbVRpbWVNaWxsaXMgPSAwO1xyXG4gICAgICAgIHRoaXMudGltZU1hbmFnZXIgPSBuZXcgVGltZU1hbmFnZXIoMCwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsQm91bmRzID0gc2Nyb2xsQm91bmRzO1xyXG4gICAgICAgIHAubW91c2VXaGVlbCA9IGZ1bmN0aW9uIChlOiBXaGVlbEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxvd1Njcm9sbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsQm91bmRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlSXNJbkJvdW5kcyhwLCB0aGlzLnNjcm9sbEJvdW5kcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1Njcm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd1Njcm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFsbG93U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZUNoYW5nZU1pbGxpcyA9IGUuZGVsdGFZICogMC4yO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLkRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbVRpbWVNaWxsaXMgLT0gdGltZUNoYW5nZU1pbGxpcztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzICs9IHRpbWVDaGFuZ2VNaWxsaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBFcXVpdmFsZW50IHRvIGV2ZW50LnByZXZlbnREZWZhdWx0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWxsb3cgYW4gaWdub3JlZCBhcmd1bWVudCBzbyBpdCBjYW4gYmUgdXNlZCBpbiBwbGFjZSBvZiBhIFRpbWVNYW5hZ2VyIGZvciBkZWJ1ZyBtb2RlXHJcbiAgICBnZXRHYW1lVGltZShpZ25vcmVkQXJndW1lbnQ/OiBhbnkpIHtcclxuICAgICAgICBsZXQgdGltZSA9IHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUodGhpcy5zeXN0ZW1UaW1lTWlsbGlzKTtcclxuICAgICAgICByZXR1cm4gdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdXNlSXNJbkJvdW5kcyhwOiBwNSwgYm91bmRzOiB7IHRvcExlZnRYOiBudW1iZXIsIHRvcExlZnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH0pIHtcclxuICAgICAgICBpZiAocC5tb3VzZVggPj0gYm91bmRzLnRvcExlZnRYICYmIHAubW91c2VYIDw9IGJvdW5kcy50b3BMZWZ0WCArIGJvdW5kcy53aWR0aCAmJlxyXG4gICAgICAgICAgICBwLm1vdXNlWSA+PSBib3VuZHMudG9wTGVmdFkgJiYgcC5tb3VzZVkgPD0gYm91bmRzLnRvcExlZnRZICsgYm91bmRzLmhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0Z1bGxQYXJzZSwgZ2V0RnVsbFBhcnNlLCBnZXRQYXJ0aWFsUGFyc2UsIE5vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGUsIFBhcnRpYWxQYXJzZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge1BhcnNpbmdIZWxwZXJ9IGZyb20gXCIuL3BsYXlsaXN0X2NsaWVudC9wYXJzaW5nX2hlbHBlclwiO1xyXG5cclxuZXhwb3J0IGVudW0gU3RlcGZpbGVTdGF0ZSB7XHJcbiAgICBOT19TVEVQRklMRSxcclxuICAgIERPTkVfUkVBRElORyxcclxuICAgIFBBUlRJQUxMWV9QQVJTRUQsXHJcbiAgICBGVUxMWV9QQVJTRUQsXHJcbiAgICBFUlJPUixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXBmaWxlIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogU3RlcGZpbGVTdGF0ZTtcclxuICAgIHB1YmxpYyBmaWxlOiBGaWxlO1xyXG4gICAgcHVibGljIHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlO1xyXG4gICAgcHVibGljIGZ1bGxQYXJzZTogRnVsbFBhcnNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5OT19TVEVQRklMRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEZpbGUoZmlsZTogcDUuRmlsZSkge1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGUuZmlsZTsgLy8gdGhpcyB1bndyYXBzIHRoZSBwNS5GaWxlIHdyYXBwZXIgdG8gZ2V0IHRoZSBvcmlnaW5hbCBET00gZmlsZVxyXG4gICAgICAgIHRoaXMubG9hZFRleHRGaWxlKHRoaXMuZmlsZSwgKChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5ET05FX1JFQURJTkc7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGlhbFBhcnNlID0gZ2V0UGFydGlhbFBhcnNlKDxzdHJpbmc+ZXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpYWxQYXJzZS5tb2Rlcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRGZnJCZWF0bWFwKGJlYXRtYXA6IFtudW1iZXIsIHN0cmluZywgc3RyaW5nXVtdKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrczogTm90ZVtdW10gPSBQYXJzaW5nSGVscGVyLmJlYXRtYXBUb1RyYWNrQXJyYXkoYmVhdG1hcCk7XHJcblxyXG4gICAgICAgIGxldCBwYXJ0aWFsUGFyc2UgPSBuZXcgUGFydGlhbFBhcnNlKCk7XHJcbiAgICAgICAgcGFydGlhbFBhcnNlLm1vZGVzID0gW25ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCldO1xyXG4gICAgICAgIHBhcnRpYWxQYXJzZS5tZXRhRGF0YSA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWFsUGFyc2UgPSBwYXJ0aWFsUGFyc2U7XHJcblxyXG4gICAgICAgIGxldCBmdWxsUGFyc2UgPSBuZXcgRnVsbFBhcnNlKHBhcnRpYWxQYXJzZSk7XHJcbiAgICAgICAgZnVsbFBhcnNlLnRyYWNrcyA9IHRyYWNrcztcclxuICAgICAgICB0aGlzLmZ1bGxQYXJzZSA9IGZ1bGxQYXJzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5pc2hQYXJzaW5nKG1vZGVJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRCB8fCB0aGlzLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRCkge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxQYXJzZSA9IGdldEZ1bGxQYXJzZShtb2RlSW5kZXgsIHRoaXMucGFydGlhbFBhcnNlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRUZXh0RmlsZShcclxuICAgICAgICBmaWxlOiBGaWxlLFxyXG4gICAgICAgIGxpc3RlbmVyOiAoZXZlbnQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IGFueSxcclxuICAgICAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcblxyXG5leHBvcnQgZW51bSBUaWNrZXJTdGF0ZSB7XHJcbiAgICBJTkZPUk1BVElPTixcclxuICAgIEVSUk9SLFxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGlja2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGluZm9ybWF0aW9uQ2xhc3MgPSBcInRpY2tlci1pbmZvXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBlcnJvckNsYXNzID0gXCJ0aWNrZXItZXJyb3JcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIGRpdjogcDUuRWxlbWVudDtcclxuICAgIHByaXZhdGUgc3RhdGljIHNwYW46IHA1LkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzdGF0ZTogVGlja2VyU3RhdGU7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZGVmYXVsdE1lc3NhZ2U6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCB0aWNrZXJTcGFuID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBkZWZhdWx0TWVzc2FnZSk7XHJcbiAgICAgICAgfSwgXCJ0aWNrZXJTcGFuXCIpO1xyXG4gICAgICAgIGxldCB0aWNrZXJEaXYgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIH0sIFwidGlja2VyRGl2XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6aW5nKHRpY2tlckRpdiwgdGlja2VyU3BhbikpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKHRpY2tlckRpdi5lbGVtZW50LCB0aWNrZXJTcGFuLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0eWxlKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICByZXR1cm4gdGlja2VyRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzSW5pdGlhbGl6aW5nKGVsZW1lbnQxOiB7YWxyZWFkeUV4aXN0czogYm9vbGVhbn0sIGVsZW1lbnQyOiB7YWxyZWFkeUV4aXN0czogYm9vbGVhbn0pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWVsZW1lbnQxLmFscmVhZHlFeGlzdHMgfHwgIWVsZW1lbnQyLmFscmVhZHlFeGlzdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5pdGlhbGl6ZShkaXY6IHA1LkVsZW1lbnQsIHNwYW46IHA1LkVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gVGlja2VyU3RhdGUuSU5GT1JNQVRJT047XHJcbiAgICAgICAgZGl2LmNoaWxkKHNwYW4pO1xyXG4gICAgICAgIHRoaXMuZGl2ID0gZGl2O1xyXG4gICAgICAgIHRoaXMuc3BhbiA9IHNwYW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZywgdGlja2VyU3RhdGU6IFRpY2tlclN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5zcGFuLmh0bWwobWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRpY2tlclN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNldFN0eWxlKGN1c3RvbUNsYXNzOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pIHtcclxuICAgICAgICAgICAgc2V0RWxlbWVudENsYXNzZXModGhpcy5kaXYsIGdsb2JhbC5nbG9iYWxDbGFzcywgY3VzdG9tQ2xhc3MsIHRoaXMuaW5mb3JtYXRpb25DbGFzcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBUaWNrZXJTdGF0ZS5FUlJPUikge1xyXG4gICAgICAgICAgICBzZXRFbGVtZW50Q2xhc3Nlcyh0aGlzLmRpdiwgZ2xvYmFsLmdsb2JhbENsYXNzLCBjdXN0b21DbGFzcywgdGhpcy5lcnJvckNsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEVsZW1lbnRDbGFzc2VzKGVsZW1lbnQ6IHA1LkVsZW1lbnQsIC4uLmNsYXNzZXM6IHN0cmluZ1tdKSB7XHJcbiAgICBlbGVtZW50LmNsYXNzKGNsYXNzZXMuam9pbihcIiBcIikpO1xyXG59IiwiaW1wb3J0IHtHYW1lVGltZVByb3ZpZGVyfSBmcm9tIFwiLi9nYW1lX3RpbWVfcHJvdmlkZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVNYW5hZ2VyIGltcGxlbWVudHMgR2FtZVRpbWVQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZCA9IHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGFwc2VkVGltZShzeXN0ZW1UaW1lTWlsbGlzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChzeXN0ZW1UaW1lTWlsbGlzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJFcnJvcjogY2FuJ3QgZ2V0IGVsYXBzZWQgdGltZS4gRXhwZWN0ZWQgMSBhcmd1bWVudDogc3lzdGVtVGltZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoc3lzdGVtVGltZU1pbGxpcyAtIHRoaXMuc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZCkgLyAxMDAwOyAvLyBpbiBzZWNvbmRzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2Ugd2FudCB0byBrZWVwIHRoaXMgY2FsY3VsYXRpb24gaW4gb25seSBvbmUgcGxhY2VcclxuICAgIGdldEdhbWVUaW1lKHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsYXBzZWRUaW1lKHN5c3RlbVRpbWVNaWxsaXMpICsgdGhpcy5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyAtIHRoaXMuY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGVudW1Ub1N0cmluZyxcclxuICAgIGVudW1Ub1N0cmluZ0FycmF5LCBnZW5lcmF0ZVByZXZpZXdOb3RlcyxcclxuICAgIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSwgZ2V0SW50LFxyXG59IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuaW1wb3J0IHtQcmV2aWV3RGlzcGxheX0gZnJvbSBcIi4vcHJldmlld19kaXNwbGF5XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0hlYWRpbmcoKSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBoZWFkaW5nQ2xhc3MgPSBcIm5hdmlnYXRpb24taGVhZGluZ1wiO1xyXG5cclxuICAgIGxldCBwbGF5RnJvbUZpbGVCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheSBGcm9tIEZpbGVcIik7XHJcbiAgICB9LCBcInBsYXlGcm9tRmlsZUJ1dHRvblwiKTtcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LCAwLjI1LCAwLjAzNiwgMTMwLCAzNCk7XHJcbiAgICBwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVlfRlJPTV9GSUxFKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCFwbGF5RnJvbUZpbGVCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGxheUZyb21PbmxpbmVCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheSBGcm9tIE9ubGluZVwiKTtcclxuICAgIH0sIFwicGxheUZyb21PbmxpbmVCdXR0b25cIik7XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuMDM2LCA5MCwgMzQpO1xyXG4gICAgcGxheUZyb21PbmxpbmVCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVlfRlJPTV9PTkxJTkUpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXBsYXlGcm9tT25saW5lQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgcGxheUZyb21PbmxpbmVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBsZXQgb3B0aW9uc0J1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJPcHRpb25zXCIpO1xyXG4gICAgfSwgXCJvcHRpb25zQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUob3B0aW9uc0J1dHRvbi5lbGVtZW50LCAwLjgsIDAuMDM2LCA5MCwgMzQpO1xyXG4gICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuT1BUSU9OUyk7XHJcbiAgICB9KTtcclxuICAgIGlmICghb3B0aW9uc0J1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgcmVsYXRpdmVYIGFuZCByZWxhdGl2ZSBZIHRvIGJlIGJldHdlZW4gMCBhbmQgMVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoZWxlbWVudDogcDUuRWxlbWVudCwgcmVsYXRpdmVYOiBudW1iZXIsIHJlbGF0aXZlWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIGxldCBwID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICBsZXQgY2FudmFzUG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSA9IHAuX3JlbmRlcmVyLnBvc2l0aW9uKCk7XHJcbiAgICBlbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAocmVsYXRpdmVYICogcC53aWR0aCkgLSAod2lkdGggLyAyKSxcclxuICAgICAgICBjYW52YXNQb3NpdGlvbi55ICsgKHJlbGF0aXZlWSAqIHAuaGVpZ2h0KSAtIChoZWlnaHQgLyAyKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRFbGVtZW50VG9Cb3R0b20oZWxlbWVudDogcDUuRWxlbWVudCwgaGVpZ2h0UGVyY2VudDogbnVtYmVyLCBzdHlsaW5nV2lkdGg6IG51bWJlciwgc3R5bGluZ0hlaWdodDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcCA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgbGV0IGVsZW1lbnRIZWlnaHQgPSBoZWlnaHRQZXJjZW50IC8gMTAwICogcC5oZWlnaHQ7XHJcbiAgICBlbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLngsIGNhbnZhc1Bvc2l0aW9uLnkgKyAocC5oZWlnaHQgLSBlbGVtZW50SGVpZ2h0IC0gc3R5bGluZ0hlaWdodCkpO1xyXG4gICAgZWxlbWVudC5zdHlsZShcIndpZHRoOiBcIiArIChwLndpZHRoIC0gc3R5bGluZ1dpZHRoKSArIFwicHhcIik7XHJcbiAgICBlbGVtZW50LnN0eWxlKFwiaGVpZ2h0OiBcIiArIGVsZW1lbnRIZWlnaHQgKyBcInB4XCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZElucHV0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIGlucHV0SWQ6IHN0cmluZywgaW5wdXRJbml0aWFsVmFsdWU6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxhYmVsZWRJbnB1dENsYXNzID0gXCJsYWJlbGVkLWlucHV0XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZElucHV0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgaW5wdXRJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXQgPSBwLmNyZWF0ZUlucHV0KGlucHV0SW5pdGlhbFZhbHVlKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MobGFiZWxlZElucHV0Q2xhc3MpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgaW5wdXQucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgaW5wdXQuaWQoaW5wdXRJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBpbnB1dElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgbGV0IGlucHV0ID0gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGNvbnRhaW5lci5lbGVtZW50LCBcIklOUFVUXCIpO1xyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogaW5wdXQsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsKHA6IHA1LCBsYWJlbFN0cmluZzogc3RyaW5nLCBmb3JJZD86IHN0cmluZyk6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGxhYmVsID0gcC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbGFiZWxTdHJpbmcpO1xyXG4gICAgaWYgKGZvcklkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsYWJlbC5hdHRyaWJ1dGUoXCJmb3JcIiwgZm9ySWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDaGVja2JveChwOiBwNSwgaW5pdGlhbFN0YXRlOiBib29sZWFuKTogcDUuRWxlbWVudCB7XHJcbiAgICBsZXQgY2hlY2tib3ggPSBwLmNyZWF0ZUVsZW1lbnQoXCJjaGVja2JveFwiKTtcclxuICAgIGNoZWNrYm94LmVsdC5jaGVja2VkID0gaW5pdGlhbFN0YXRlO1xyXG4gICAgcmV0dXJuIGNoZWNrYm94O1xyXG59XHJcblxyXG4vLyBUT0RPOiBjaGVjayB0aGF0IG9wdGlvbnNFbnVtIGlzIGFjdHVhbGx5IGFuIEVudW0sIGFuZCBpbml0aWFsRW51bVZhbHVlIGlzIGEgdmFsdWUgZm9yIHRoYXQgZW51bVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZFNlbGVjdChsYWJlbFN0cmluZzogc3RyaW5nLCBzZWxlY3RJZDogc3RyaW5nLCBPcHRpb25zRW51bTogYW55LCBpbml0aWFsRW51bVZhbHVlOiBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgc2VsZWN0OiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGxhYmVsZWRTZWxlY3RDbGFzcyA9IFwibGFiZWxlZC1zZWxlY3RcIjtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZFNlbGVjdENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIHNlbGVjdElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZFNlbGVjdENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICBzZWxlY3QgPSBwLmNyZWF0ZVNlbGVjdCgpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIHNlbGVjdC5pZChzZWxlY3RJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBzZWxlY3RJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIGlmICghY29udGFpbmVyLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBsZXQgaW5pdGlhbE9wdGlvbnMgPSBlbnVtVG9TdHJpbmdBcnJheShPcHRpb25zRW51bSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsT3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHNlbGVjdC5vcHRpb24oaW5pdGlhbE9wdGlvbnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgc2VsZWN0LnNlbGVjdGVkKGVudW1Ub1N0cmluZyhPcHRpb25zRW51bSwgaW5pdGlhbEVudW1WYWx1ZSkpO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSFRNTENvbGxlY3Rpb24gPSBzZWxlY3QuZWx0LmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBvcHRpb25zLml0ZW0oaSkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzICsgXCIgXCIgKyBsYWJlbGVkU2VsZWN0Q2xhc3MgKyBcIiBcIiArIGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogc2VsZWN0LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkVGV4dEFyZWEobGFiZWxTdHJpbmc6IHN0cmluZywgaW5wdXRJZDogc3RyaW5nLCBpbnB1dEluaXRpYWxWYWx1ZTogc3RyaW5nLCBjdXN0b21DbGFzczogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IG51bWJlciA9IDQsIGNvbHM6IG51bWJlciA9IDQwKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IHRleHRBcmVhOiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgbGFiZWxlZFRleHRhcmVhQ2xhc3MgPSBcImxhYmVsZWQtdGV4dGFyZWFcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkVGV4dGFyZWFDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBpbnB1dElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHRleHRBcmVhID0gcC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwgaW5wdXRJbml0aWFsVmFsdWUpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhsYWJlbGVkVGV4dGFyZWFDbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICB0ZXh0QXJlYS5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICB0ZXh0QXJlYS5pZChpbnB1dElkKTtcclxuICAgICAgICB0ZXh0QXJlYS5hdHRyaWJ1dGUoXCJyb3dzXCIsIHJvd3MudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdGV4dEFyZWEuYXR0cmlidXRlKFwiY29sc1wiLCBjb2xzLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgaW5wdXRJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogdGV4dEFyZWEsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpbGVJbnB1dChsYWJlbFN0cmluZzogc3RyaW5nLCBidXR0b25UZXh0OiBzdHJpbmcsIHVuaXF1ZUlkOiBzdHJpbmcsIG9uRmlsZUxvYWQ6IChmaWxlOiBwNS5GaWxlKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgYnV0dG9uSWQgPSB1bmlxdWVJZCArIFwiQnV0dG9uXCI7XHJcbiAgICBsZXQgY29udGFpbmVySWQgPSB1bmlxdWVJZCArIFwiQ29udGFpbmVyXCI7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBmaWxlSW5wdXRDbGFzcyA9IFwiZmlsZS1pbnB1dFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGZpbGVJbnB1dENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVJbnB1dCA9IHAuY3JlYXRlRmlsZUlucHV0KG9uRmlsZUxvYWQsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgZmlsZUlucHV0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGZpbGVJbnB1dC5oaWRlKCk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b24gPSBwLmNyZWF0ZUJ1dHRvbihidXR0b25UZXh0KTtcclxuICAgICAgICBidXR0b24ucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgYnV0dG9uLmlkKGJ1dHRvbklkKTtcclxuICAgICAgICBidXR0b24ubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgZmlsZUlucHV0LmVsdC5jbGljaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGZpbGVJbnB1dENsYXNzKTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGJ1dHRvbklkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcylcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGNvbnRhaW5lcklkKTtcclxuXHJcbiAgICBsZXQgbGFiZWw6IHA1LkVsZW1lbnQgPSBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoY29udGFpbmVyLmVsZW1lbnQsIFwiTEFCRUxcIik7XHJcbiAgICBsYWJlbC5odG1sKGxhYmVsU3RyaW5nKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZENoZWNrYm94KGxhYmVsU3RyaW5nOiBzdHJpbmcsIGNoZWNrYm94SWQ6IHN0cmluZywgaXNDaGVja2VkOiBib29sZWFuLCBjdXN0b21DbGFzczogc3RyaW5nKTpcclxuICAgIHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBjaGVja2JveDogcDUuRWxlbWVudDtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxhYmVsZWRDaGVja2JveENsYXNzID0gXCJsYWJlbGVkLWNoZWNrYm94XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZENoZWNrYm94Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgY2hlY2tib3hJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRDaGVja2JveENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICBjaGVja2JveCA9IGNyZWF0ZUNoZWNrYm94KHAsIGlzQ2hlY2tlZCk7XHJcbiAgICAgICAgY2hlY2tib3guYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNoZWNrYm94LmFkZENsYXNzKGxhYmVsZWRDaGVja2JveENsYXNzKTtcclxuICAgICAgICBjaGVja2JveC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGNoZWNrYm94LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGNoZWNrYm94LmlkKGNoZWNrYm94SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgY2hlY2tib3hJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogY2hlY2tib3gsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gWWVzTm8ge1xyXG4gICAgWWVzLFxyXG4gICAgTm9cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW5Ub1llc05vKGJvb2xlYW46IGJvb2xlYW4pOiBZZXNObyB7XHJcbiAgICBpZiAoYm9vbGVhbikge1xyXG4gICAgICAgIHJldHVybiBZZXNOby5ZZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBZZXNOby5ObztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHllc05vVG9Cb29sZWFuKHllc05vOiBZZXNObyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHllc05vID09PSBZZXNOby5ZZXMpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL2Rpc2NvdXJzZS5wcm9jZXNzaW5nLm9yZy90L2hvdy10by1vcmdhbml6ZS1yYWRpby1idXR0b25zLWluLXNlcGFyYXRlLWxpbmVzLzEwMDQxLzVcclxuZXhwb3J0IGZ1bmN0aW9uIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdihwOiBwNSwgcmFkaW9EaXZQNUVsZW1lbnQ6IHA1LkVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGlucHV0czogcDUuRWxlbWVudFtdID0gc2VsZWN0QWxsKHAsICdpbnB1dCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGNvbnN0IGxhYmVsczogcDUuRWxlbWVudFtdID0gc2VsZWN0QWxsKHAsICdsYWJlbCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGNvbnN0IGxlbiA9IGlucHV0cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHAuY3JlYXRlRGl2KCkucGFyZW50KHJhZGlvRGl2UDVFbGVtZW50KS5jaGlsZChpbnB1dHNbaV0pLmNoaWxkKGxhYmVsc1tpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZGlzY291cnNlLnByb2Nlc3Npbmcub3JnL3QvaG93LXRvLW9yZ2FuaXplLXJhZGlvLWJ1dHRvbnMtaW4tc2VwYXJhdGUtbGluZXMvMTAwNDEvNVxyXG5leHBvcnQgZnVuY3Rpb24gZml4UmFkaW9EaXZFbGVtZW50KHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50KSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByYWRpb0RpdlA1RWxlbWVudC5fZ2V0SW5wdXRDaGlsZHJlbkFycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlUmFkaW9PcHRpb25zKHA6IHA1LCByYWRpb0RpdlA1RWxlbWVudDogcDUuRWxlbWVudCwgc3R5bGVDbGFzc2VzOiBzdHJpbmdbXSkge1xyXG4gICAgbGV0IGRpdnM6IHA1LkVsZW1lbnRbXSA9IHNlbGVjdEFsbChwLCAnZGl2JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRpdnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkaXZzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlucHV0czogcDUuRWxlbWVudFtdID0gc2VsZWN0QWxsKHAsICdpbnB1dCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbnB1dHNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbGFiZWxzOiBwNS5FbGVtZW50W10gID0gc2VsZWN0QWxsKHAsICdsYWJlbCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYWJlbHNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxsT2NjdXJyZW5jZXNPZlRhZyhodG1sOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZykge1xyXG4gICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbGV0IGVsZW1lbnRzID0gdGVtcERpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKTtcclxuICAgIHdoaWxlIChlbGVtZW50c1swXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50c1swXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVtcERpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGlucHV0RWxlbWVudDogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0sIG9uSW5wdXQ6ICgpID0+IHZvaWQpIHtcclxuICAgIGlmICghaW5wdXRFbGVtZW50LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmVsZW1lbnQuaW5wdXQob25JbnB1dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdEFsbChwOiBwNSwgdGFnTmFtZTogc3RyaW5nLCBjb250YWluZXI6IHA1LkVsZW1lbnQpOiBwNS5FbGVtZW50W10ge1xyXG4gICAgaWYgKGNvbnRhaW5lci5pZCgpID09PSBcIlwiKSB7XHJcbiAgICAgICAgdGhyb3cgXCJlcnJvcjogY29udGFpbmVyIHVzZWQgd2l0aCBzZWxlY3RBbGwgbXVzdCBoYXZlIGFuIGlkXCI7XHJcbiAgICB9XHJcbiAgICBsZXQgaWQgPSBcIiNcIiArIGNvbnRhaW5lci5pZCgpO1xyXG4gICAgcmV0dXJuIHAuc2VsZWN0QWxsKHRhZ05hbWUsIGlkKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVzZXJJbnB1dChjcmVhdGU6ICgpID0+IHtlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFufSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkSW5wdXQ6IChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dJbmZvOiAoKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dFcnJvcjogKCkgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblZhbGlkSW5wdXQ6IChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogcDUuRWxlbWVudFxyXG4pOiB7ZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbn0ge1xyXG4gICAgbGV0IGNyZWF0ZWQ6IHtlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFufSA9IGNyZWF0ZSgpO1xyXG4gICAgaWYgKCFjcmVhdGVkLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZWQuZWxlbWVudDtcclxuICAgICAgICBwYXJlbnQuY2hpbGQoZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IGVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKGlzVmFsaWRJbnB1dCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHNob3dJbmZvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaG93RXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBlbGVtZW50LmlucHV0KCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBlbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkSW5wdXQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93SW5mbygpO1xyXG4gICAgICAgICAgICAgICAgb25WYWxpZElucHV0KHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNob3dFcnJvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3JlYXRlZFxyXG59XHJcbiIsImltcG9ydCB7TW9kZSwgTm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmd9IGZyb20gXCIuL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1N0ZXBmaWxlLCBTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZSwgQXVkaW9GaWxlU3RhdGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQbGF5aW5nRGlzcGxheX0gZnJvbSBcIi4vcGxheWluZ19kaXNwbGF5XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdElmVW5kZWZpbmVkKHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnN0YXRlID0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0cmFja3NbaV1bal0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5NSU5FOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrc1tpXVtqXS50eXBlID0gTm90ZVR5cGUuTk9ORTsgLy9UT0RPOiBpbXBsZW1lbnQgbWluZXNcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT05FOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5ST0xMX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnR5cGUgPSBOb3RlVHlwZS5IT0xEX0hFQUQ7IC8vVE9ETzogaW1wbGVtZW50IHJvbGxzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pc3NCb3VuZGFyeShjdXJyZW50VGltZTogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgbGV0IG1pc3NCb3VuZGFyeSA9IGN1cnJlbnRUaW1lICsgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLnVwcGVyQm91bmQgLyAxMDAwKTsgLy9yZXN1bHQgaXMgaW4gc2Vjb25kc1xyXG4gICAgcmV0dXJuIG1pc3NCb3VuZGFyeTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5QmluZGluZ3NEZWZpbmVkKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUtleUJpbmRpbmdzKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICBsZXQgbWFwcGluZzogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgIGlmIChudW1UcmFja3MgPD0gOSkge1xyXG4gICAgICAgIGxldCBrZXlTZXF1ZW5jZSA9IFtcIkFcIiwgXCJTXCIsIFwiRFwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiLCBcIkpcIiwgXCJLXCIsIFwiTFwiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlTdHJpbmcgPSBrZXlTZXF1ZW5jZVtpXTtcclxuICAgICAgICAgICAgbWFwcGluZy5wdXNoKHt0cmFja051bWJlcjogaSwga2V5Q29kZToga2V5U3RyaW5nLmNoYXJDb2RlQXQoMCksIHN0cmluZzoga2V5U3RyaW5nfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobnVtVHJhY2tzID4gMjYpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkbid0IGdlbmVyYXRlIGRlZmF1bHQga2V5IGJpbmRpbmdzIGZvciBtb3JlIHRoYW4gMjYgdHJhY2tzLiBSYW4gb3V0IG9mIGxldHRlcnMhXCIpO1xyXG4gICAgICAgICAgICBudW1UcmFja3MgPSAyNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hhcmFjdGVyQ29kZSA9IFwiQVwiLmNoYXJDb2RlQXQoMCkgKyBpOyAvLyBUaGlzIGlzIGFuIEFTQ0lJIGNoYXJhY3RlciBjb2RlXHJcbiAgICAgICAgICAgIG1hcHBpbmcucHVzaCh7dHJhY2tOdW1iZXI6IGksIGtleUNvZGU6IGNoYXJhY3RlckNvZGUsIHN0cmluZzogU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyYWN0ZXJDb2RlKX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLnNldChudW1UcmFja3MsIG1hcHBpbmcpO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRDb25maWdLZXlCaW5kaW5nKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nKSB7XHJcbiAgICBsZXQgYmluZGluZ0luZGV4ID0gZ2V0SW5kZXhPZlRyYWNrTnVtYmVyQmluZGluZyh0cmFja051bWJlciwgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSk7XHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpW2JpbmRpbmdJbmRleF0gPSBrZXlCaW5kaW5nO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgZSB0byBiZSBhbiBlbnVtXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnVtVG9TdHJpbmdBcnJheShlOiBhbnkpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhlKS5maWx0ZXIoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEluZGV4T2ZUcmFja051bWJlckJpbmRpbmcodHJhY2tOdW1iZXI6IG51bWJlciwgYmluZGluZ3M6IHsgdHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZyB9W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmluZGluZ3NbaV0udHJhY2tOdW1iZXIgPT09IHRyYWNrTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEtleVN0cmluZyhwOiBwNSkge1xyXG4gICAgcmV0dXJuIHAua2V5Lmxlbmd0aCA9PSAxID8gcC5rZXkudG9VcHBlckNhc2UoKSA6IHAua2V5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kZU9wdGlvbnNGb3JEaXNwbGF5KG1vZGVzQXNTdHJpbmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W10pOiBNb2RlW10ge1xyXG4gICAgbGV0IG1vZGVPcHRpb25zOiBNb2RlW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZXNBc1N0cmluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbW9kZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG1vZGVzQXNTdHJpbmdzW2ldO1xyXG4gICAgICAgIG1vZGVPcHRpb25zLnB1c2goe3R5cGU6IG1vZGUuZ2V0KFwidHlwZVwiKSwgZGlmZmljdWx0eTogbW9kZS5nZXQoXCJkaWZmaWN1bHR5XCIpLCBtZXRlcjogbW9kZS5nZXQoXCJtZXRlclwiKSwgaWQ6IGl9KTtcclxuICAgIH1cclxuICAgIG1vZGVPcHRpb25zLnNvcnQoY29tcGFyZU1vZGVPcHRpb25zKTtcclxuICAgIHJldHVybiBtb2RlT3B0aW9ucztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVNb2RlT3B0aW9ucyhhOiBNb2RlLCBiOiBNb2RlKSB7XHJcbiAgICBsZXQgdHlwZUEgPSBhLnR5cGUudG9VcHBlckNhc2UoKTtcclxuICAgIGxldCB0eXBlQiA9IGIudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKHR5cGVBICE9IHR5cGVCKSB7XHJcbiAgICAgICAgaWYgKHR5cGVBIDwgdHlwZUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGRpZmZpY3VsdHlBID0gYS5kaWZmaWN1bHR5LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IGRpZmZpY3VsdHlCID0gYi5kaWZmaWN1bHR5LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKGRpZmZpY3VsdHlBICE9IGRpZmZpY3VsdHlCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5QSkgLSBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5Qik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG1ldGVyQSA9IHBhcnNlRmxvYXQoYS5tZXRlcik7XHJcbiAgICAgICAgICAgIGxldCBtZXRlckIgPSBwYXJzZUZsb2F0KGIubWV0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobWV0ZXJBICE9IG1ldGVyQikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGVyQSAtIG1ldGVyQjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhLmlkID0gYi5pZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZmljdWx0eVJhbmsoZGlmZmljdWx0eTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKGRpZmZpY3VsdHkpIHtcclxuICAgICAgICBjYXNlIFwiQkVHSU5ORVJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgY2FzZSBcIkVBU1lcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgY2FzZSBcIk1FRElVTVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICBjYXNlIFwiSEFSRFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICBjYXNlIFwiQ0hBTExFTkdFXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA0O1xyXG4gICAgICAgIGNhc2UgXCJFRElUXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA1O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiA2O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGRpdjogcDUuRWxlbWVudCwgdGFnTmFtZTogc3RyaW5nKTogcDUuRWxlbWVudCB7XHJcbiAgICBsZXQgY2hpbGRyZW5Ob2RlcyA9IGRpdi5jaGlsZCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbk5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG5vZGU6IE5vZGUgPSBjaGlsZHJlbk5vZGVzW2ldO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSB0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwNS5FbGVtZW50KG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQmluZGluZ0luZm9Gb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBiaW5kaW5nczogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChiaW5kaW5nc1tpXS50cmFja051bWJlciA9PT0gdHJhY2tOdW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVByZXZpZXdOb3RlcyhudW1UcmFja3M6IG51bWJlcik6IE5vdGVbXVtdIHtcclxuICAgIGxldCBub3RlczogTm90ZVtdW10gPSBbXTtcclxuICAgIGxldCBpc0hvbGQgPSBmYWxzZTtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IDAuMTtcclxuICAgIGxldCB0aW1lSW5jcmVtZW50ID0gMC4zIC8gbnVtVHJhY2tzO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgIGxldCB0cmFjazogTm90ZVtdID0gW107XHJcbiAgICAgICAgaWYgKGlzSG9sZCkge1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vdGVUeXBlLkhPTERfSEVBRCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IE5vdGVTdGF0ZS5ERUZBVUxUXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vdGVUeXBlLlRBSUwsIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLCB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZSArIDAuMjUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJhY2sucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBOb3RlVHlwZS5OT1JNQUwsXHJcbiAgICAgICAgICAgICAgICB0eXBlU3RyaW5nOiBcIkRvbid0IENhcmVcIixcclxuICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IE5vdGVTdGF0ZS5ERUZBVUxUXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3Rlcy5wdXNoKHRyYWNrKTtcclxuICAgICAgICBpc0hvbGQgPSAhaXNIb2xkO1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IHRpbWVJbmNyZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm90ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY2N1cmFjeUV2ZW50TmFtZSh0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKTogc3RyaW5nIHtcclxuICAgIGlmIChjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIDwgY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0udXBwZXJCb3VuZCkge1xyXG4gICAgICAgIHJldHVybiBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5uYW1lOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzID49IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICByZXR1cm4gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0ubmFtZTsgLy8gSGFuZGxlIGJvbyBpZiBpdCBleGlzdHNcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbaV07XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgIT0gbnVsbCAmJiBhY2N1cmFjeS51cHBlckJvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzICYmIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY3VyYWN5Lm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJFUlJPUjogVW5rbm93biBhY2N1cmFjeVwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNGaWxlc1JlYWR5KHN0ZXBmaWxlOiBTdGVwZmlsZSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUpIHtcclxuICAgIGxldCBzdGVwZmlsZVJlYWR5ID0gc3RlcGZpbGUuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRCB8fFxyXG4gICAgICAgIHN0ZXBmaWxlLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgIGxldCBhdWRpb0ZpbGVSZWFkeSA9IGF1ZGlvRmlsZS5zdGF0ZSA9PT0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ7XHJcbiAgICByZXR1cm4gc3RlcGZpbGVSZWFkeSAmJiBhdWRpb0ZpbGVSZWFkeTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRQbGF5aW5nRGlzcGxheSh0cmFja3M6IE5vdGVbXVtdLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgZ2xvYmFsLnBsYXlpbmdEaXNwbGF5ID0gbmV3IFBsYXlpbmdEaXNwbGF5KHRyYWNrcywgYXVkaW9GaWxlLCBnbG9iYWwuY29uZmlnLCBnbG9iYWwucDVTY2VuZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnVtVG9TdHJpbmcoVGhlRW51bTogYW55LCB2YWx1ZTogYW55KSB7XHJcbiAgICByZXR1cm4gVGhlRW51bVt2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgVGhlRW51bV0udG9TdHJpbmcoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZsb2F0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEludCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW51bSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBFbnVtVHlwZTogYW55KTogYW55IHtcclxuICAgIGxldCBzdHJpbmc6IHN0cmluZyA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICByZXR1cm4gRW51bVR5cGVbc3RyaW5nIGFzIGtleW9mIHR5cGVvZiBFbnVtVHlwZV07XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHA1OyIsIm1vZHVsZS5leHBvcnRzID0gcGFrbzsiXSwic291cmNlUm9vdCI6IiJ9