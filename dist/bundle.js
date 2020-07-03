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
        this.audioSource.start(this.audioContext.currentTime + delayInSeconds);
    }
    stop() {
        this.audioSource.stop(0);
        this.state = AudioFileState.DONE_READING;
        this.recreateSourceNode();
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
    // TODO: Add a list of presets that live in their own file
    // TODO: validation on accuracy settings that explains why miss shouldn't have lower bound
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







class KeyBindingsUi {
    static draw(p, parentElement, pageStyleClass) {
        let keyBindingsSectionHeader = this.createKeyBindingsSectionHeader();
        if (!keyBindingsSectionHeader.alreadyExists) {
            parentElement.child(keyBindingsSectionHeader.element);
        }
        if (this.numTracks == undefined) {
            this.numTracks = 4;
        }
        let previewNumTracks = Object(_ui_util__WEBPACK_IMPORTED_MODULE_4__["createLabeledInput"])("Number of Tracks", "previewNumTracksInput", this.numTracks.toString(), _pages_options__WEBPACK_IMPORTED_MODULE_6__["Options"].OPTIONS_CLASS);
        // @ts-ignore
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_4__["setOnInputUnlessItAlreadyExists"])(previewNumTracks, () => {
            let value = previewNumTracks.element.value();
            if (typeof value === "string") {
                value = parseInt(value);
            }
            if (Number.isInteger(value) && value > 0 && value <= 26) {
                KeyBindingsUi.removeOldBindingButtons(this.numTracks);
                this.numTracks = value;
                _index__WEBPACK_IMPORTED_MODULE_1__["global"].previewDisplay = new _preview_display__WEBPACK_IMPORTED_MODULE_5__["PreviewDisplay"](Object(_util__WEBPACK_IMPORTED_MODULE_3__["generatePreviewNotes"])(value), _index__WEBPACK_IMPORTED_MODULE_1__["global"].config, _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene);
            }
        });
        if (!previewNumTracks.alreadyExists) {
            parentElement.child(previewNumTracks.element.parent());
        }
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
}
KeyBindingsUi.SET_BUTTON_INACTIVE_TEXT = "Set";
KeyBindingsUi.SET_BUTTON_ACTIVE_TEXT = "Press Any Key";
KeyBindingsUi.numTracks = 4;


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
            p.image(this.tail, -noteSize / 2, -noteSize / 2, noteSize, noteSize / 2);
            p.pop();
        }
        else {
            p.image(this.tail, centerX - noteSize / 2, centerY - noteSize / 2, noteSize, noteSize / 2);
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
                _index__WEBPACK_IMPORTED_MODULE_4__["global"].noteSkin = new _note_skin__WEBPACK_IMPORTED_MODULE_6__["NoteSkin"](p.loadImage("../assets/arrow_blue_v3.png"), p.loadImage("../assets/connector_tile_resize.png"), p.loadImage("../assets/tail_resize.png"), p.loadImage("../assets/arrow_receptor.png"));
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
            });
            scrollDiv.element.child(resetConfigButton.element);
        }
        let pauseAtStartInSecondsInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledInput"])("Pause at Start (sec)", "pauseAtStartInSecondsInput", _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pauseAtStartInSeconds.toString(), Options.OPTIONS_CLASS);
        if (!pauseAtStartInSecondsInput.alreadyExists) {
            scrollDiv.element.child(pauseAtStartInSecondsInput.element.parent());
            pauseAtStartInSecondsInput.element.mouseClicked(() => {
                let value = pauseAtStartInSecondsInput.element.value();
                if (this.isValidPauseAtStart(value)) {
                    this.showPauseAtStartInfo();
                }
                else {
                    this.showPauseAtStartError();
                }
            });
            // @ts-ignore
            pauseAtStartInSecondsInput.element.input(() => {
                let value = pauseAtStartInSecondsInput.element.value();
                if (this.isValidPauseAtStart(value)) {
                    this.showPauseAtStartInfo();
                    _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pauseAtStartInSeconds = getNumber(value);
                    _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
                }
                else {
                    this.showPauseAtStartError();
                }
            });
        }
        let scrollSpeedInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledInput"])("Scroll Speed (px/sec)", "scrollSpeedInput", _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pixelsPerSecond.toString(), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(scrollSpeedInput, () => {
            let value = scrollSpeedInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value > 0) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pixelsPerSecond = value;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!scrollSpeedInput.alreadyExists) {
            scrollDiv.element.child(scrollSpeedInput.element.parent());
            scrollSpeedInput.element.mouseClicked(() => {
                let value = scrollSpeedInput.element.value();
                if (this.isValidScrollSpeed(value)) {
                    this.showScrollSpeedInfo();
                }
                else {
                    this.showScrollSpeedError();
                }
            });
            // @ts-ignore
            scrollSpeedInput.element.input(() => {
                let value = scrollSpeedInput.element.value();
                if (this.isValidScrollSpeed(value)) {
                    this.showScrollSpeedInfo();
                    _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pixelsPerSecond = value;
                    _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
                }
                else {
                    this.showScrollSpeedError();
                }
            });
        }
        let scrollDirectionSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Scroll Direction", "scrollDirectionSelect", _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"], _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.scrollDirection, Options.OPTIONS_CLASS);
        // setOnInputUnlessItAlreadyExists(scrollDirectionSelect, () => {
        //     let value: string = String(scrollDirectionSelect.element.value());
        //     let enumOfValue = ScrollDirection[value as keyof typeof ScrollDirection];
        //     if (enumOfValue !== undefined) {
        //         global.config.scrollDirection = enumOfValue;
        //         global.config.save();
        //     }
        // });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(scrollDirectionSelect.element.parent());
            scrollDirectionSelect.element.mouseClicked(() => {
                let value = scrollDirectionSelect.element.value();
                if (this.isValidScrollDirection(value)) {
                    this.showScrollDirectionInfo();
                }
                else {
                    this.showScrollDirectionError();
                }
            });
            // @ts-ignore
            scrollDirectionSelect.element.input(() => {
                let value = scrollDirectionSelect.element.value();
                if (this.isValidScrollDirection(value)) {
                    this.showScrollDirectionInfo();
                    _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.scrollDirection = getEnum(value, _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"]);
                    _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
                }
                else {
                    this.showScrollDirectionError();
                }
            });
        }
        let receptorPositionInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledInput"])("Receptor Position (%)", "receptorPositionInput", _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.receptorYPercent.toString(), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(receptorPositionInput, () => {
            let value = receptorPositionInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.receptorYPercent = value;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!receptorPositionInput.alreadyExists) {
            scrollDiv.element.child(receptorPositionInput.element.parent());
        }
        let additionalOffsetInSecondsInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledInput"])("Accuracy Offset (ms)", "additionalOffsetInSecondsInput", (_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.additionalOffsetInSeconds * 1000).toString(), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(additionalOffsetInSecondsInput, () => {
            let value = additionalOffsetInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.additionalOffsetInSeconds = value / 1000;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!additionalOffsetInSecondsInput.alreadyExists) {
            scrollDiv.element.child(additionalOffsetInSecondsInput.element.parent());
        }
        let accuracySettingsInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledTextArea"])("Accuracy Settings", "accuracySettingsInput", JSON.stringify(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.accuracySettings, null, 3), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(accuracySettingsInput, () => {
            let value = accuracySettingsInput.element.value();
            if (typeof value === "string") {
                let newAccuracySettings = parseAccuracySettingsJson(value);
                if (newAccuracySettings !== null) {
                    _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.accuracySettings = newAccuracySettings;
                    _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
                }
            }
        });
        if (!accuracySettingsInput.alreadyExists) {
            scrollDiv.element.child(accuracySettingsInput.element.parent());
        }
        let accuracyFlashEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Accuracy Flash", "accuracyFlashEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyFlashEnabled), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(accuracyFlashEnabledSelect, () => {
            let value = String(accuracyFlashEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyFlashEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyFlashEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyFlashEnabledSelect.element.parent());
        }
        let accuracyParticlesEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Accuracy Particles", "accuracyParticlesEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyParticlesEnabled), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(accuracyParticlesEnabledSelect, () => {
            let value = String(accuracyParticlesEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyParticlesEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyParticlesEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyParticlesEnabledSelect.element.parent());
        }
        let accuracyTextEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Accuracy Text", "accuracyTextEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyTextEnabled), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(accuracyTextEnabledSelect, () => {
            let value = String(accuracyTextEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyTextEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isAccuracyTextEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyTextEnabledSelect.element.parent());
        }
        let holdParticlesEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Hold Particles", "holdParticlesEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldParticlesEnabled), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(holdParticlesEnabledSelect, () => {
            let value = String(holdParticlesEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldParticlesEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldParticlesEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(holdParticlesEnabledSelect.element.parent());
        }
        let holdGlowEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Hold Glow", "holdGlowEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldGlowEnabled), Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(holdGlowEnabledSelect, () => {
            let value = String(holdGlowEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldGlowEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_1__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.isHoldGlowEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(holdGlowEnabledSelect.element.parent());
        }
        _key_bindings_ui__WEBPACK_IMPORTED_MODULE_6__["KeyBindingsUi"].draw(p, scrollDiv.element, Options.OPTIONS_CLASS);
        _index__WEBPACK_IMPORTED_MODULE_2__["global"].previewDisplay.draw();
        let ticker = _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].create(this.DEFAULT_TICKER_MESSAGE, Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setElementToBottom"])(ticker.element, 4.2, 12, 8);
    }
    static isValidPauseAtStart(value) {
        return this.isNumberGreaterThanOrEqualZero(value);
    }
    static showPauseAtStartInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Delay the start of the song to give yourself more time to get ready.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static isValidScrollSpeed(value) {
        return this.isNumberGreaterThanOrEqualZero(value);
    }
    static showPauseAtStartError() {
        this.showNumberNotGreaterThanOrEqualZeroError();
    }
    static showScrollSpeedInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("The movement speed of the notes. Higher values will make the notes look farther apart.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static isValidScrollDirection(value) {
        let enumOfValue = getEnum(value, _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"]);
        return enumOfValue !== undefined;
    }
    static showScrollDirectionInfo() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Controls which way the arrows go.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].INFORMATION);
    }
    static showScrollDirectionError() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Error: huh... not sure how you did that.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].ERROR);
    }
    static showScrollSpeedError() {
        this.showNumberNotGreaterThanOrEqualZeroError();
    }
    static isNumberGreaterThanOrEqualZero(value) {
        let numberValue = getNumber(value);
        if (!isNaN(numberValue) && numberValue >= 0) {
            return true;
        }
        return false;
    }
    static showNumberNotGreaterThanOrEqualZeroError() {
        _ticker__WEBPACK_IMPORTED_MODULE_7__["Ticker"].setMessage("Error: must be a number greater than or equal to zero.", _ticker__WEBPACK_IMPORTED_MODULE_7__["TickerState"].ERROR);
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
function getNumber(value) {
    if (typeof value === "string") {
        return parseFloat(value);
    }
    return value;
}
function getEnum(value, EnumType) {
    let string = String(value);
    return EnumType[string];
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
/*! exports provided: drawHeading, setElementCenterPositionRelative, setElementToBottom, createLabeledInput, createLabel, createLabeledSelect, createLabeledTextArea, createFileInput, createLabeledCheckbox, YesNo, booleanToYesNo, encloseEachInputLabelPairIntoASubDiv, fixRadioDivElement, styleRadioOptions, setOnInputUnlessItAlreadyExists */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encloseEachInputLabelPairIntoASubDiv", function() { return encloseEachInputLabelPairIntoASubDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixRadioDivElement", function() { return fixRadioDivElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleRadioOptions", function() { return styleRadioOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOnInputUnlessItAlreadyExists", function() { return setOnInputUnlessItAlreadyExists; });
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
function createLabeledSelect(labelString, selectId, optionsEnum, initialEnumValue, customClass) {
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
        let initialOptions = Object(_util__WEBPACK_IMPORTED_MODULE_2__["enumToStringArray"])(optionsEnum);
        for (let i = 0; i < initialOptions.length; i++) {
            // @ts-ignore
            select.option(initialOptions[i]);
        }
        // @ts-ignore
        select.selected(optionsEnum[initialEnumValue].toString());
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


/***/ }),

/***/ "./src/scripts/util.ts":
/*!*****************************!*\
  !*** ./src/scripts/util.ts ***!
  \*****************************/
/*! exports provided: defaultIfUndefined, isUndefined, setAllNotesToDefaultState, replaceNotYetImplementedNoteTypes, getMissBoundary, isKeyBindingsDefined, initializeKeyBindings, setConfigKeyBinding, enumToStringArray, getKeyString, getModeOptionsForDisplay, compareModeOptions, getFirstElementByTagName, findBindingInfoForTrack, generatePreviewNotes, getAccuracyEventName, isFilesReady, initPlayingDisplay */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaHl0aG1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja19mbGFzaC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja190ZXh0LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9yZWNvcmRpbmcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2F1ZGlvX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvZGVmYXVsdF9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RlZmF1bHRfbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kaXNwbGF5X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RvbV93cmFwcGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kcmF3aW5nX3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2hvbGRfZ2xvdy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaG9sZF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9ob2xkX3BhcnRpY2xlcy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2tleV9iaW5kaW5nX2hlbHBlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMva2V5X2JpbmRpbmdzX3VpLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9rZXlib2FyZF9ldmVudF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9taXNzX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL25vdGVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9vbmxpbmVfcGxheWxpc3QudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3A1X3NjZW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXkudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXlfZnJvbV9maWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5X2Zyb21fb25saW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9yZXN1bHRzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL2J5dGVfcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3NtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3N3Zi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9zd2YtcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3N3Zi10YWdzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFydGljbGVfc3lzdGVtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5ZXJfa2V5X2FjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGxheWluZ19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5bGlzdF9jbGllbnQvcGFyc2luZ19oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnRfc3RhdGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9zb25nLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5bGlzdF9jbGllbnQvdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcHJldmlld19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9yZWNlcHRvcl9zaHJpbmtfcmVhY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3Jlc3VsdHNfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX2RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3N0ZXBmaWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy90aWNrZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3RpbWVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvdWlfdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lL2V4dGVybmFsIFwicDVcIiIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lL2V4dGVybmFsIFwicGFrb1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiww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QUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckQsSUFBSSxRQUFRLEdBQWEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDNUQsSUFBSSxRQUFRLENBQUMsVUFBVSxHQUFHLDRCQUE0QixJQUFJLDRCQUE0QixJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzNHLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQzthQUN4QjtTQUNKO0tBQ0o7SUFDRCxPQUFPLHlCQUF5QixDQUFDO0FBQ3JDLENBQUM7QUFFTSxTQUFTLFlBQVksQ0FBQyxRQUFrQixFQUFFLFNBQW9CO0lBQ2pFLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEtBQUssdURBQWEsQ0FBQyxnQkFBZ0I7UUFDakUsUUFBUSxDQUFDLEtBQUssS0FBSyx1REFBYSxDQUFDLFlBQVksQ0FBQztJQUNsRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsS0FBSyxLQUFLLDBEQUFjLENBQUMsUUFBUSxDQUFDO0lBQ2pFLE9BQU8sYUFBYSxJQUFJLGNBQWMsQ0FBQztBQUMzQyxDQUFDO0FBRU0sU0FBUyxrQkFBa0IsQ0FBQyxNQUFnQixFQUFFLFNBQW9CO0lBQ3JFLDZDQUFNLENBQUMsY0FBYyxHQUFHLElBQUksK0RBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLDZDQUFNLENBQUMsTUFBTSxFQUFFLDZDQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakcsQ0FBQzs7Ozs7Ozs7Ozs7O0FDcFBELG9COzs7Ozs7Ozs7OztBQ0FBLHNCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ0VudHJ5LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja0ZsYXNoIHtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtQ29sb3JlZEFjY3VyYWN5UmFua3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGZsYXNoRHVyYXRpb25JblNlY29uZHM6IG51bWJlciA9IDAuMTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lDb2xvcnM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLCBjb25maWc6IENvbmZpZywgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA9IHRoaXMuZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3ModGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUNvbG9ycyA9IFtcclxuICAgICAgICAgICAgWzE3OCwgOTQsIDI0NywgMTgwXSxcclxuICAgICAgICAgICAgWzMwLCAyMTcsIDEyNCwgMTYwXSxcclxuICAgICAgICAgICAgWzE5NiwgMTk5LCAzMCwgMTQwXSxcclxuICAgICAgICAgICAgWzI0NSwgMjEzLCAyMjEsIDEyMF1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLm51bUNvbG9yZWRBY2N1cmFjeVJhbmtzID4gdGhpcy5hY2N1cmFjeUNvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUNvbG9ycy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgW3RoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIDEwMF1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZsYXNoRm9yVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Rmxhc2hGb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5ID0gdGhpcy5nZXRUcmFja01vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAodGhpcy5pc0ZsYXNoSGFwcGVuaW5nKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSkpIHtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjdXJyZW50VGltZUluU2Vjb25kcywgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICBsZXQgZmxhc2hDb2xvcjogcDUuQ29sb3IgPSB0aGlzLmdldEZsYXNoQ29sb3IobW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpO1xyXG4gICAgICAgICAgICBsZXQgZWxhcHNlZFRpbWVJblNlY29uZHMgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZsYXNoKGVsYXBzZWRUaW1lSW5TZWNvbmRzLCBjZW50ZXJYLCBjZW50ZXJZLCBmbGFzaENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0ZsYXNoSGFwcGVuaW5nKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbMF0ubG93ZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCBhY2N1cmFjaWVzWzBdLnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbYWNjdXJhY2llcy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICAgICAgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA+PSBhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEhhbmRsZSBib28gaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWxhcHNlZFRpbWVJblNlY29uZHMgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICBpZiAoZWxhcHNlZFRpbWVJblNlY29uZHMgPiBBY2N1cmFjeUZlZWRiYWNrRmxhc2guZmxhc2hEdXJhdGlvbkluU2Vjb25kcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWVJblNlY29uZHMgLSBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUcmFja01vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KHRyYWNrTnVtYmVyOiBudW1iZXIpOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl07XHJcbiAgICAgICAgaWYgKHRyYWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXVt0cmFjay5sZW5ndGggLSAxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXRGbGFzaENvbG9yKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuayA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBjb2xvclZhbHVlcyA9IHRoaXMuYWNjdXJhY3lDb2xvcnNbYWNjdXJhY3lSYW5rIC0gMV07XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIHAuY29sb3IoY29sb3JWYWx1ZXNbMF0sIGNvbG9yVmFsdWVzWzFdLCBjb2xvclZhbHVlc1syXSwgY29sb3JWYWx1ZXNbM10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzc3VtZXMgc3ltbWV0cmljYWwgYWNjdXJhY3kgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3MoYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IG51bVJhbmtzID0gMTsgLy8gc3RhcnQgd2l0aCAxIGJlY2F1c2Ugd2UgYXQgbGVhc3QgaGF2ZSB0aGUgYmVzdCByYW5rXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlc3RBY2N1cmFjeUluZGV4ICsgMTsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kICE9PSB1bmRlZmluZWQgJiYgYWNjdXJhY3kudXBwZXJCb3VuZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBudW1SYW5rcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1SYW5rc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCAwICYmIDAgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyBhIHJhbmsgd2hlcmUgMSBpcyB0aGUgYmVzdFxyXG4gICAgcHJpdmF0ZSBnZXRBY2N1cmFjeVJhbmsoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSwgYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGlmIChhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgMCkge1xyXG4gICAgICAgICAgICBhY2N1cmFjaWVzID0gdGhpcy5nZXRSZXZlcnNlZChhY2N1cmFjaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJlc3RBY2N1cmFjeUluZGV4ID0gdGhpcy5nZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgY3VycmVudFJhbmsgPSAxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzICYmIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSYW5rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnRSYW5rKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmV2ZXJzZWQoYXJyYXk6IGFueVtdKSB7XHJcbiAgICAgICAgbGV0IGFycmF5Q29weTogYW55W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgYXJyYXlDb3B5LnB1c2goYXJyYXlbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlDb3B5O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0ZsYXNoKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgZmxhc2hTaXplOiBudW1iZXIgPSB0aGlzLmdldEZsYXNoU2l6ZShlbGFwc2VkVGltZUluU2Vjb25kcywgQWNjdXJhY3lGZWVkYmFja0ZsYXNoLmZsYXNoRHVyYXRpb25JblNlY29uZHMpO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIHAuZmlsbChjb2xvcik7XHJcbiAgICAgICAgLy8gcC5maWxsKDI1NSwgMjU1LCAyNTUsIDE1MCk7XHJcbiAgICAgICAgcC5ub1N0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuZHJhd1N0YXIocCwgMCwgMCwgZmxhc2hTaXplLCBmbGFzaFNpemUgKiAwLjQsIDQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGbGFzaFNpemUoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlciwgZmxhc2hEdXJhdGlvbkluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZsYXNoQ29tcGxldGlvblJhdGlvID0gZWxhcHNlZFRpbWVJblNlY29uZHMgLyBmbGFzaER1cmF0aW9uSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBtaW5TaXplID0gMDtcclxuICAgICAgICBsZXQgbWF4U2l6ZSA9IHRoaXMuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmludGVycG9sYXRlKG1pblNpemUsIG1heFNpemUsIGZsYXNoQ29tcGxldGlvblJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVycG9sYXRlKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3U3RhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHJhZGl1czE6IG51bWJlciwgcmFkaXVzMjogbnVtYmVyLCBucG9pbnRzOiBudW1iZXIpIHtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLlJBRElBTlMpO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHAuVFdPX1BJIC8gbnBvaW50cztcclxuICAgICAgICBsZXQgaGFsZkFuZ2xlID0gYW5nbGUgLyAyLjA7XHJcbiAgICAgICAgcC5iZWdpblNoYXBlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCBwLlRXT19QSTsgYSArPSBhbmdsZSkge1xyXG4gICAgICAgICAgICBsZXQgc3ggPSBjZW50ZXJYICsgcC5jb3MoYSkgKiByYWRpdXMyO1xyXG4gICAgICAgICAgICBsZXQgc3kgPSBjZW50ZXJZICsgcC5zaW4oYSkgKiByYWRpdXMyO1xyXG4gICAgICAgICAgICBwLnZlcnRleChzeCwgc3kpO1xyXG4gICAgICAgICAgICBzeCA9IGNlbnRlclggKyBwLmNvcyhhICsgaGFsZkFuZ2xlKSAqIHJhZGl1czE7XHJcbiAgICAgICAgICAgIHN5ID0gY2VudGVyWSArIHAuc2luKGEgKyBoYWxmQW5nbGUpICogcmFkaXVzMTtcclxuICAgICAgICAgICAgcC52ZXJ0ZXgoc3gsIHN5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5lbmRTaGFwZShwLkNMT1NFKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnR9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge1BhcnRpY2xlU3lzdGVtfSBmcm9tIFwiLi9wYXJ0aWNsZV9zeXN0ZW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bUNvbG9yZWRBY2N1cmFjeVJhbmtzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kczogbnVtYmVyID0gMS41O1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZVNldHRpbmdzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZVN5c3RlbXM6IFBhcnRpY2xlU3lzdGVtW107XHJcbiAgICBwcml2YXRlIGdyYXZpdHlEaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLm51bUNvbG9yZWRBY2N1cmFjeVJhbmtzID0gdGhpcy5nZXROdW1Db2xvcmVkQWNjdXJhY3lSYW5rcyh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZVNldHRpbmdzID0gW1xyXG4gICAgICAgICAgICBbMTc4LCA5NCwgMjQ3LCAzMF0sXHJcbiAgICAgICAgICAgIFszMCwgMjE3LCAxMjQsIDI1XSxcclxuICAgICAgICAgICAgWzE5NiwgMTk5LCAzMCwgMjBdLFxyXG4gICAgICAgICAgICBbMjQ1LCAyMTMsIDIyMSwgMTVdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB3aGlsZSAodGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA+IHRoaXMucGFydGljbGVTZXR0aW5ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVNldHRpbmdzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBbdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgMjBdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmdyYXZpdHlEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93biA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgZ3Jhdml0eTogcDUuVmVjdG9yID0gcC5jcmVhdGVWZWN0b3IoMCwgMjAwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMucHVzaChuZXcgUGFydGljbGVTeXN0ZW0oQWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcy5wYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kcywgZ3Jhdml0eSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJhbmRvbUludChtYXg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbdHJhY2tOdW1iZXJdLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGFydGljbGVzRm9yQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFdmVudEZvclBhcnRpY2xlcyhhY2N1cmFjeUV2ZW50KSkge1xyXG4gICAgICAgICAgICBsZXQgcmVjZXB0b3JUaW1lUG9zaXRpb24gPSBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHMgLSBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIC8gMTAwMDtcclxuICAgICAgICAgICAgbGV0IGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuZ2V0SW5pdGlhbFBvc2l0aW9uKHAsIGFjY3VyYWN5RXZlbnQudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLFxyXG4gICAgICAgICAgICAgICAgcmVjZXB0b3JUaW1lUG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbFZlbG9jaXR5ID0gcC5jcmVhdGVWZWN0b3IoMCwgLTUwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZVNldHRpbmdzOiB7Y29sb3I6IHA1LkNvbG9yLCBudW1QYXJ0aWNsZXM6IG51bWJlciB9ID0gdGhpcy5nZXRQYXJ0aWNsZVNldHRpbmdzKGFjY3VyYWN5RXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1thY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyXS5hZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbiwgaW5pdGlhbFZlbG9jaXR5LFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzLCBwYXJ0aWNsZVNldHRpbmdzLm51bVBhcnRpY2xlcywgcGFydGljbGVTZXR0aW5ncy5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW5pdGlhbFBvc2l0aW9uKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjZW50ZXJUaW1lSW5TZWNvbmRzLCBjZW50ZXJUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVWZWN0b3IoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0V2ZW50Rm9yUGFydGljbGVzKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbMF0ubG93ZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCBhY2N1cmFjaWVzWzBdLnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbYWNjdXJhY2llcy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICAgICAgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA+PSBhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEhhbmRsZSBib28gaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldFBhcnRpY2xlU2V0dGluZ3MoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjaWVzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBsZXQgYWNjdXJhY3lSYW5rID0gdGhpcy5nZXRBY2N1cmFjeVJhbmsoYWNjdXJhY3lFdmVudCwgYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IHBhcnRpY2xlU2V0dGluZ3MgPSB0aGlzLnBhcnRpY2xlU2V0dGluZ3NbYWNjdXJhY3lSYW5rIC0gMV07XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIHtjb2xvcjogcC5jb2xvcihwYXJ0aWNsZVNldHRpbmdzWzBdLCBwYXJ0aWNsZVNldHRpbmdzWzFdLCBwYXJ0aWNsZVNldHRpbmdzWzJdKSxcclxuICAgICAgICAgICAgbnVtUGFydGljbGVzOiBwYXJ0aWNsZVNldHRpbmdzWzNdfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBudW1SYW5rcyA9IDE7IC8vIHN0YXJ0IHdpdGggMSBiZWNhdXNlIHdlIGF0IGxlYXN0IGhhdmUgdGhlIGJlc3QgcmFua1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleCArIDE7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPT0gdW5kZWZpbmVkICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbnVtUmFua3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtUmFua3NcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgMCAmJiAwIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgYSByYW5rIHdoZXJlIDEgaXMgdGhlIGJlc3RcclxuICAgIHByaXZhdGUgZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8IDApIHtcclxuICAgICAgICAgICAgYWNjdXJhY2llcyA9IHRoaXMuZ2V0UmV2ZXJzZWQoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRSYW5rID0gMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXg7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAmJiBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UmFuaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50UmFuaysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJldmVyc2VkKGFycmF5OiBhbnlbXSkge1xyXG4gICAgICAgIGxldCBhcnJheUNvcHk6IGFueVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGFycmF5Q29weS5wdXNoKGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Q29weTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmcsIEFjY3VyYWN5UmVjb3JkaW5nRW50cnl9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeUZlZWRiYWNrVGV4dCB7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZywgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGxhc3RFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSA9IHRoaXMuZ2V0TW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkoKTtcclxuICAgICAgICBpZiAobGFzdEV2ZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbWVTaW5jZUxhc3RFdmVudCA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gbGFzdEV2ZW50LnRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IHRleHRTaXplID0gdGhpcy5nZXRGb250U2l6ZSh0aW1lU2luY2VMYXN0RXZlbnQpO1xyXG4gICAgICAgIGlmICh0ZXh0U2l6ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGdldEFjY3VyYWN5RXZlbnROYW1lKGxhc3RFdmVudC5hY2N1cmFjeU1pbGxpcywgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHRoaXMuZHJhd0V2ZW50VGV4dChldmVudE5hbWUsIHRleHRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KCk6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkge1xyXG4gICAgICAgIGxldCBtb3N0UmVjZW50VHJhY2s6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnlbXSA9IFtdO1xyXG4gICAgICAgIGxldCBncmVhdGVzdFRpbWUgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nLmxlbmd0aDsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgIGlmICh0cmFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEV2ZW50VGltZSA9IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXVt0cmFjay5sZW5ndGggLSAxXS50aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RFdmVudFRpbWUgPiBncmVhdGVzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBsYXN0RXZlbnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmFjayA9IHRyYWNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb3N0UmVjZW50VHJhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9zdFJlY2VudFRyYWNrW21vc3RSZWNlbnRUcmFjay5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEZvbnRTaXplKHRpbWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG1heEZvbnRTaXplID0gMzA7XHJcbiAgICAgICAgaWYgKHRpbWUgPCAwLjEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWUgLyAwLjEgKiBtYXhGb250U2l6ZTtcclxuICAgICAgICB9IGVsc2UgaWYodGltZSA+PSAwLjEgJiYgdGltZSA8IDAuNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRpbWUgPj0gMC40ICYmIHRpbWUgPCAwLjcpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgxIC0gKHRpbWUgLSAwLjQpIC8gKDAuNyAtIDAuNCkpICogbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0V2ZW50VGV4dCh0ZXh0OiBzdHJpbmcsIHRleHRTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUiwgcC5DRU5URVIpO1xyXG4gICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgICAgIHAudGV4dCh0ZXh0LCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0tleVN0YXRlLCBQbGF5ZXJLZXlBY3Rpb259IGZyb20gXCIuL3BsYXllcl9rZXlfYWN0aW9uXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtnZXRBY2N1cmFjeUV2ZW50TmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxvd2VyQm91bmQ6IG51bWJlcjtcclxuICAgIHVwcGVyQm91bmQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxvd2VyQm91bmQgPSBsb3dlckJvdW5kO1xyXG4gICAgICAgIHRoaXMudXBwZXJCb3VuZCA9IHVwcGVyQm91bmQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgY29uZmlnOiBDb25maWcsIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcixcclxuICAgICAgICAgICAgICAgIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuaG9sZE1hbmFnZXIgPSBob2xkTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQgPSBoYW5kbGVBY2N1cmFjeUV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVQbGF5ZXJBY3Rpb24oYWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoYWN0aW9uLmtleVN0YXRlID09IEtleVN0YXRlLkRPV04pIHtcclxuICAgICAgICAgICAgdGhpcy50cnlUb0hpdE5vdGUoYWN0aW9uLmdhbWVUaW1lLCBhY3Rpb24udHJhY2spO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLmtleVN0YXRlID09PSBLZXlTdGF0ZS5VUCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkTWFuYWdlci5pc1RyYWNrSGVsZChhY3Rpb24udHJhY2spKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLnVuaG9sZFRyYWNrKGFjdGlvbi50cmFjaywgYWN0aW9uLmdhbWVUaW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5VG9SZWxlYXNlTm90ZShhY3Rpb24uZ2FtZVRpbWUsIGFjdGlvbi50cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cnlUb0hpdE5vdGUoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXggPSB0aGlzLmdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kcywgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmIChub3RlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbm90ZTogTm90ZSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobm90ZS50eXBlID09PSBOb3RlVHlwZS5OT1JNQUwpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSElUO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBub3RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChub3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5IRUxEOyAvLyBzZXQgdGhlIG5vdGUgdG8gaGVsZCBzbyBpdCB3b24ndCBjb3VudCBhcyBhIG1pc3NcclxuICAgICAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IChub3RlLnRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcykgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogbm90ZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLmhvbGRUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQ29uZmlndXJlZEZvckJvb3MoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBnZXRBY2N1cmFjeUV2ZW50TmFtZShJbmZpbml0eSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IEluZmluaXR5LFxyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBub3RlVHlwZTogTm90ZVR5cGUuTk9ORSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWFybGllc3RIaXR0YWJsZVVuaGl0Tm90ZUluZGV4KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5nZUluU2Vjb25kcygpO1xyXG4gICAgICAgIGxldCBoaXR0YWJsZVRpbWVSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSA9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SGl0dGFibGVSYW5nZShhY2N1cmFjeVJhbmdlLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGhpdHRhYmxlSW5kZXhSYW5nZTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSA9XHJcbiAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIuZ2V0Tm90ZXNCeVRpbWVSYW5nZShoaXR0YWJsZVRpbWVSYW5nZS5sZWFzdFRpbWUsIGhpdHRhYmxlVGltZVJhbmdlLmdyZWF0ZXN0VGltZSwgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVhcmxpZXN0VW5oaXROb3RlSW5kZXhJblJhbmdlKHRyYWNrTnVtYmVyLCBoaXR0YWJsZUluZGV4UmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjY3VyYWN5UmFuZ2VJblNlY29uZHMoKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5U2V0dGluZ3MgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGxldCBudW1TZXR0aW5ncyA9IGFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoO1xyXG4gICAgICAgIGxldCBsZWFzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgIGFjY3VyYWN5U2V0dGluZ3NbMV0ubG93ZXJCb3VuZCA6IGFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZDtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lO1xyXG4gICAgICAgIGlmIChhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAxXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge2xlYXN0VGltZTogbGVhc3RUaW1lIC8gMTAwMCwgZ3JlYXRlc3RUaW1lOiBncmVhdGVzdFRpbWUgLyAxMDAwfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIaXR0YWJsZVJhbmdlKGFjY3VyYWN5UmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0sIHJlY2VwdG9yVGltZVBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZWFzdFRpbWU6IHJlY2VwdG9yVGltZVBvc2l0aW9uICsgYWNjdXJhY3lSYW5nZS5sZWFzdFRpbWUsXHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZTogcmVjZXB0b3JUaW1lUG9zaXRpb24gKyBhY2N1cmFjeVJhbmdlLmdyZWF0ZXN0VGltZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFYXJsaWVzdFVuaGl0Tm90ZUluZGV4SW5SYW5nZSh0cmFja051bWJlcjogbnVtYmVyLCBub3RlSW5kZXhSYW5nZTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBub3RlSW5kZXhSYW5nZS5zdGFydEluZGV4OyBpIDwgbm90ZUluZGV4UmFuZ2UuZW5kSW5kZXhOb3RJbmNsdXNpdmU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2ldLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc0NvbmZpZ3VyZWRGb3JCb29zKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeVRvUmVsZWFzZU5vdGUoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXggPSB0aGlzLmdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kcywgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmIChub3RlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbm90ZSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobm90ZS50eXBlID09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBob2xkID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW25vdGVJbmRleCAtIDFdOyAvLyBnZXQgdGhlIGhvbGQgYmVsb25naW5nIHRvIHRoaXMgdGFpbFxyXG4gICAgICAgICAgICAgICAgaG9sZC5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGNoYW5nZSB0aGUgaG9sZCBzdGF0ZSBmcm9tIEhFTEQgdG8gSElUXHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSB0YWlsIG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBcIlJlbGVhc2UgXCIgKyBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IG5vdGUudHlwZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gbGV0IGdvIHRvbyBlYXJseVxyXG4gICAgICAgICAgICAvLyBDb3VsZCB0aGlzIHJldHVybiAtMT9cclxuICAgICAgICAgICAgbGV0IGhvbGRTdGFydEluZGV4ID0gdGhpcy5ub3RlTWFuYWdlci5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShjdXJyZW50VGltZUluU2Vjb25kcywgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdKTtcclxuICAgICAgICAgICAgbGV0IGhvbGQgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXggLSAxXTtcclxuICAgICAgICAgICAgbGV0IHRhaWwgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoaG9sZC50eXBlID09IE5vdGVUeXBlLkhPTERfSEVBRCAmJiB0YWlsLnR5cGUgPT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4IC0gMV0uc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBoaXQgdGhlIHN0YXJ0IG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXhdLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSB0YWlsIG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogXCJSZWxlYXNlIFwiICsgZ2V0QWNjdXJhY3lFdmVudE5hbWUoSW5maW5pdHksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IEluZmluaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBOb3RlVHlwZS5OT05FLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBJdCdzIHBvc3NpYmxlIHRoYXQgdGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIHJhY2UgY29uZGl0aW9uIGJldHdlZW4gdGhlIGtleSBldmVudCBhbmQgdGhlIGFuaW1hdGlvbiBsb29wLiBEb24ndCB0aHJvdyBhbiBlcnJvciBmb3Igbm93XHJcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBcIkVycm9yOiBSZWxlYXNlIG1pc3MgZmFpbGVkIHRvIHRyaWdnZXIgb24gbm90ZSBpbmRleCBcIiArIChob2xkU3RhcnRJbmRleCAtIDEpICsgXCIsIHRyYWNrIGluZGV4IFwiICsgdHJhY2tOdW1iZXIgKyBcIiBhdCB0aW1lIFwiICsgY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcblxyXG5leHBvcnQgZW51bSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlIHtcclxuICAgIElOQ09NUExFVEUsXHJcbiAgICBSRUFEWSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY2N1cmFjeUV2ZW50IHtcclxuICAgIGFjY3VyYWN5TmFtZTogc3RyaW5nLFxyXG4gICAgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgIGFjY3VyYWN5TWlsbGlzOiBudW1iZXIsXHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGVcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgIGFjY3VyYWN5TWlsbGlzOiBudW1iZXIsXHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5UmVjb3JkaW5nIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZTtcclxuICAgIHB1YmxpYyByZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnlbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGUuSU5DT01QTEVURTtcclxuICAgICAgICB0aGlzLnJlY29yZGluZyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRpbmcucHVzaChbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvcmRBY2N1cmFjeUV2ZW50KGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnJlY29yZGluZ1thY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyXS5wdXNoKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyxcclxuICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBhY2N1cmFjeUV2ZW50Lm5vdGVUeXBlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgZW51bSBBdWRpb0ZpbGVTdGF0ZSB7XHJcbiAgICBOT19BVURJT19GSUxFLFxyXG4gICAgRE9ORV9SRUFESU5HLFxyXG4gICAgQlVGRkVSRUQsXHJcbiAgICBFUlJPUixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1ZGlvRmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IEF1ZGlvRmlsZVN0YXRlO1xyXG4gICAgcHVibGljIGZpbGU6IEZpbGU7XHJcbiAgICBwdWJsaWMgYmxvYjogQmxvYlxyXG4gICAgcHVibGljIGF1ZGlvU291cmNlOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGU7XHJcbiAgICBwdWJsaWMgYXVkaW9Db250ZXh0OiBBdWRpb0NvbnRleHQ7XHJcbiAgICBwdWJsaWMgYXVkaW9CdWZmZXI6IEF1ZGlvQnVmZmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEZpbGUoZmlsZTogcDUuRmlsZSkge1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGUuZmlsZTsgLy8gdGhpcyB1bndyYXBzIHRoZSBwNS5GaWxlIHdyYXBwZXIgdG8gZ2V0IHRoZSBvcmlnaW5hbCBET00gZmlsZVxyXG4gICAgICAgIHRoaXMubG9hZEF1ZGlvRGF0YSh0aGlzLmZpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkQmxvYihibG9iOiBCbG9iKSB7XHJcbiAgICAgICAgdGhpcy5ibG9iID0gYmxvYjtcclxuICAgICAgICB0aGlzLmxvYWRBdWRpb0RhdGEodGhpcy5ibG9iKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRBdWRpb0RhdGEoYXVkaW9EYXRhOiBGaWxlIHwgQmxvYikge1xyXG4gICAgICAgIHRoaXMubG9hZFNvdW5kRmlsZShhdWRpb0RhdGEsICgob25GaWxlUmVhZDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5kZWNvZGVBdWRpb0RhdGEoPEFycmF5QnVmZmVyPm9uRmlsZVJlYWQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlQXVkaW9EYXRhKGF1ZGlvRGF0YTogQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYXVkaW9EYXRhKS50aGVuKCgoYnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0J1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2l0aCBkZWNvZGluZyBhdWRpbyBkYXRhXCIgKyBlLmVycik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREdXJhdGlvbigpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIuZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXkoZGVsYXlJblNlY29uZHM6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZGVsYXlJblNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVTb3VyY2VOb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWNyZWF0ZVNvdXJjZU5vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gdGhpcy5hdWRpb0J1ZmZlcjtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRTb3VuZEZpbGUoXHJcbiAgICAgICAgZmlsZTogQmxvYiB8IEZpbGUsXHJcbiAgICAgICAgbGlzdGVuZXI6IChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4gYW55LFxyXG4gICAgICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnNcclxuICAgICkge1xyXG4gICAgICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7ZGVmYXVsdElmVW5kZWZpbmVkfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7REVGQVVMVF9DT05GSUd9IGZyb20gXCIuL2RlZmF1bHRfY29uZmlnXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcblxyXG4vKiBTdG9yZXMgdXNlciBzZXR0aW5ncy4gRXhwZWN0ZWQgbm90IHRvIGNoYW5nZSBkdXJpbmcgcGxheSAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuICAgIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4gICAgcmVjZXB0b3JZUGVyY2VudDogbnVtYmVyO1xyXG4gICAgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdO1xyXG4gICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBrZXlCaW5kaW5nczogTWFwPG51bWJlciwgS2V5QmluZGluZ1tdPjtcclxuICAgIGdhbWVBcmVhSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBnYW1lQXJlYVdpZHRoOiBudW1iZXI7XHJcbiAgICBub3RlU2l6ZTogbnVtYmVyO1xyXG4gICAgcXVpdEtleTogbnVtYmVyO1xyXG4gICAgaXNBY2N1cmFjeUZsYXNoRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaXNBY2N1cmFjeVRleHRFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaXNIb2xkUGFydGljbGVzRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzSG9sZEdsb3dFbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBwaXhlbHNQZXJTZWNvbmQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZXB0b3JZUGVyY2VudD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxEaXJlY3Rpb24/OiBTY3JvbGxEaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcz86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzPzogQWNjdXJhY3lbXSxcclxuICAgICAgICAgICAgICAgICAgICBwYXVzZUF0U3RhcnRJblNlY29uZHM/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5QmluZGluZ3M/OiBNYXA8bnVtYmVyLCBLZXlCaW5kaW5nW10+LFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVBcmVhSGVpZ2h0PzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVBcmVhV2lkdGg/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpdEtleT86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBpc0FjY3VyYWN5Rmxhc2hFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeVRleHRFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0hvbGRQYXJ0aWNsZXNFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0hvbGRHbG93RW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmdhbWVBcmVhSGVpZ2h0ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuZ2FtZUFyZWFIZWlnaHQsIERFRkFVTFRfQ09ORklHLmdhbWVBcmVhSGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmdhbWVBcmVhV2lkdGggPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5nYW1lQXJlYVdpZHRoLCBERUZBVUxUX0NPTkZJRy5nYW1lQXJlYVdpZHRoKTtcclxuICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnBpeGVsc1BlclNlY29uZCwgREVGQVVMVF9DT05GSUcucGl4ZWxzUGVyU2Vjb25kKTtcclxuICAgICAgICB0aGlzLnNjcm9sbERpcmVjdGlvbiA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnNjcm9sbERpcmVjdGlvbiwgREVGQVVMVF9DT05GSUcuc2Nyb2xsRGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gTk9URTogU2Nyb2xsIGRpcmVjdGlvbiBhbmQgZ2FtZUFyZWFIZWlnaHQgbXVzdCBiZSBzZXQgQkVGT1JFIHNldHRpbmcgcmVjZXB0b3JZUG9zaXRpb25cclxuICAgICAgICB0aGlzLnJlY2VwdG9yWVBlcmNlbnQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5yZWNlcHRvcllQZXJjZW50LCBERUZBVUxUX0NPTkZJRy5yZWNlcHRvcllQZXJjZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcywgREVGQVVMVF9DT05GSUcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVNldHRpbmdzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuYWNjdXJhY3lTZXR0aW5ncywgREVGQVVMVF9DT05GSUcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5wYXVzZUF0U3RhcnRJblNlY29uZHMgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5wYXVzZUF0U3RhcnRJblNlY29uZHMsIERFRkFVTFRfQ09ORklHLnBhdXNlQXRTdGFydEluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLm5vdGVTaXplLCBERUZBVUxUX0NPTkZJRy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5rZXlCaW5kaW5ncyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmtleUJpbmRpbmdzLCBERUZBVUxUX0NPTkZJRy5rZXlCaW5kaW5ncyk7XHJcbiAgICAgICAgdGhpcy5xdWl0S2V5ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucXVpdEtleSwgREVGQVVMVF9DT05GSUcucXVpdEtleSk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkLFxyXG4gICAgICAgICAgICBERUZBVUxUX0NPTkZJRy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNIb2xkUGFydGljbGVzRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0hvbGRHbG93RW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzSG9sZEdsb3dFbmFibGVkLCBERUZBVUxUX0NPTkZJRy5pc0hvbGRHbG93RW5hYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmUoKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZ1N0cmluZyA9IHRoaXMuZ2V0Q29uZmlnQXNTdHJpbmcoKTtcclxuICAgICAgICBsZXQgZXhwaXJlcyA9IHRoaXMuZ2V0RGF0ZU9mT25lWWVhckZyb21Ob3coKTtcclxuICAgICAgICBsZXQgcGF0aCA9ICcvJztcclxuICAgICAgICBsZXQgY29va2llU3RyaW5nID0gXCJjb25maWc9XCIgKyBlc2NhcGUoY29uZmlnU3RyaW5nKVxyXG4gICAgICAgICAgICArICc7cGF0aD0nICsgcGF0aFxyXG4gICAgICAgICAgICArICc7ZXhwaXJlcz0nICsgZXhwaXJlcy50b1VUQ1N0cmluZygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvb2tpZVN0cmluZyk7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llU3RyaW5nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZmlnIHNhdmVkIHRvIGNvb2tpZSFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb25maWdBc1N0cmluZygpIHtcclxuICAgICAgICBsZXQgc3RyaW5nOiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzKTtcclxuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgnLFwia2V5QmluZGluZ3NcIjp7fSwnLFxyXG4gICAgICAgICAgICAnLFwia2V5QmluZGluZ3NcIjonICsgdGhpcy5zdHJpbmdpZnlLZXlCaW5kaW5ncygpICsgJywnKTtcclxuICAgICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZCgpOiBDb25maWcge1xyXG4gICAgICAgIGxldCBjb25maWdDb29raWUgPSBDb25maWcuZ2V0RnJvbUNvb2tpZShcImNvbmZpZ1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb25maWdDb29raWUpO1xyXG4gICAgICAgIGlmIChjb25maWdDb29raWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdKU09OID0gSlNPTi5wYXJzZSh1bmVzY2FwZShjb25maWdDb29raWUpKTtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ0pTT04ua2V5QmluZGluZ3MgPSBuZXcgTWFwKGNvbmZpZ0pTT04ua2V5QmluZGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZzogQ29uZmlnID0gbmV3IENvbmZpZyhjb25maWdKU09OKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZmlnIGxvYWRlZCBmcm9tIGNvb2tpZSFcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICAgICAgfSBjYXRjaChlKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHZhbGlkIGNvb2tpZSBmb3VuZCwgcmV0dXJuaW5nIGRlZmF1bHQgY29uZmlnIVwiKTtcclxuICAgICAgICByZXR1cm4gbmV3IENvbmZpZyh7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXRlT2ZPbmVZZWFyRnJvbU5vdygpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0cmluZ2lmeUtleUJpbmRpbmdzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHN0cmluZyA9IFwiW1wiO1xyXG4gICAgICAgIHRoaXMua2V5QmluZGluZ3MuZm9yRWFjaCgodmFsdWU6IEtleUJpbmRpbmdbXSwga2V5OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgc3RyaW5nICs9IFwiW1wiKyBrZXkgKyBcIixcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArXCJdXCI7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBzdHJpbmcgKz0gXCJdXCI7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRGcm9tQ29va2llKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY29va2llXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCI7IFwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQocm93ID0+IHJvdy5zdGFydHNXaXRoKGtleSkpXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCI9XCIpWzFdO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGxldCBERUZBVUxUX0NPTkZJRyA9IHtcclxuICAgIHBpeGVsc1BlclNlY29uZDogNTUwLFxyXG4gICAgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24uRG93bixcclxuICAgIHJlY2VwdG9yWVBlcmNlbnQ6IDE1LFxyXG4gICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kczogMCxcclxuICAgIC8vIFRoaXMgaXMgYSBzeW1tZXRyaWNhbCB2ZXJzaW9uIG9mIEZGUidzIGFjY3VyYWN5XHJcbiAgICAvLyBUT0RPOiBBZGQgYSBsaXN0IG9mIHByZXNldHMgdGhhdCBsaXZlIGluIHRoZWlyIG93biBmaWxlXHJcbiAgICAvLyBUT0RPOiB2YWxpZGF0aW9uIG9uIGFjY3VyYWN5IHNldHRpbmdzIHRoYXQgZXhwbGFpbnMgd2h5IG1pc3Mgc2hvdWxkbid0IGhhdmUgbG93ZXIgYm91bmRcclxuICAgIGFjY3VyYWN5U2V0dGluZ3M6IFtcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJNaXNzXCIsIG51bGwsLTExNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQXZlcmFnZVwiLCAtMTE3LCAtODMpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkdvb2RcIiwgLTgzLCAtNTApLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIlBlcmZlY3RcIiwgLTUwLCAtMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkFtYXppbmdcIiwgLTE3LCAxNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiUGVyZmVjdFwiLCAxNywgNTApLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkdvb2RcIiwgNTAsIDgzKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBdmVyYWdlXCIsIDgzLCAxMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkJvb1wiLCAxMTcsIG51bGwpXHJcbiAgICBdLFxyXG4gICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzOiAwLFxyXG4gICAga2V5QmluZGluZ3M6IG5ldyBNYXAoKSxcclxuICAgIGdhbWVBcmVhSGVpZ2h0OiA2MDAsXHJcbiAgICBnYW1lQXJlYVdpZHRoOiA0MDAsXHJcbiAgICBub3RlU2l6ZTogMzAsXHJcbiAgICBxdWl0S2V5OiAyNywgLy8gUXVpdCBkZWZhdWx0cyB0byBlc2NhcGUga2V5XHJcbiAgICBpc0FjY3VyYWN5Rmxhc2hFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0FjY3VyYWN5VGV4dEVuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0hvbGRQYXJ0aWNsZXNFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNIb2xkR2xvd0VuYWJsZWQ6IHRydWUsXHJcbn07IiwiaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVmYXVsdE5vdGVTa2luIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd05vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gbm90ZVNpemU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgc3dpdGNoIChub3RlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcInZcIiwgY2VudGVyWCwgY2VudGVyWSArIDYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuUk9MTF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJ4XCIsIGNlbnRlclgsIGNlbnRlclkgKyA2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk1JTkU6XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAuY2lyY2xlKGNlbnRlclgsIGNlbnRlclksIDI0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJYXCIsIGNlbnRlclgsIGNlbnRlclkgKyA4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwiP1wiLCBjZW50ZXJYLCBjZW50ZXJZICsgNyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdSZWNlcHRvcih0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gbm90ZVNpemU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3SG9sZENvbm5lY3RvcihjZW50ZXJYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCBlbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplICogMC41O1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBzdGFydFksIHdpZHRoLCBlbmRZIC0gc3RhcnRZKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7RGVmYXVsdE5vdGVTa2lufSBmcm9tIFwiLi9kZWZhdWx0X25vdGVfc2tpblwiO1xyXG5cclxuY2xhc3MgTm90ZURpc3BsYXkge1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIG5vdGVTaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRyYWNrTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsIHNrZXRjaEluc3RhbmNlOiBwNSwgbm90ZVNpemU6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLm5vdGVUeXBlID0gbm90ZVR5cGU7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IG5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMudHJhY2tOdW1iZXIgPSB0cmFja051bWJlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc05vdGVEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3Tm90ZSh0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLFxyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclksIHRoaXMubm90ZVR5cGUsIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIGlmICghaXNOb3RlRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdOb3RlKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlVHlwZSxcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSG9sZENvbm5lY3RvciB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBzdGFydFk6IG51bWJlcjtcclxuICAgIGVuZFk6IG51bWJlcjtcclxuICAgIG5vdGVTdGFydFk6IG51bWJlcjtcclxuICAgIG5vdGVFbmRZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjZW50ZXJYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCBlbmRZOiBudW1iZXIsIG5vdGVTdGFydFk6IG51bWJlciwgbm90ZUVuZFk6IG51bWJlciwgc2tldGNoSW5zdGFuY2U6IHA1KSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5zdGFydFkgPSBzdGFydFk7XHJcbiAgICAgICAgdGhpcy5lbmRZID0gZW5kWTtcclxuICAgICAgICB0aGlzLm5vdGVTdGFydFkgPSBub3RlU3RhcnRZO1xyXG4gICAgICAgIHRoaXMubm90ZUVuZFkgPSBub3RlRW5kWTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc0Nvbm5lY3RvckRyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdIb2xkQ29ubmVjdG9yKHRoaXMuY2VudGVyWCwgdGhpcy5zdGFydFksIHRoaXMuZW5kWSxcclxuICAgICAgICAgICAgdGhpcy5ub3RlU3RhcnRZLCB0aGlzLm5vdGVFbmRZKTtcclxuICAgICAgICBpZiAoIWlzQ29ubmVjdG9yRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdIb2xkQ29ubmVjdG9yKHRoaXMuY2VudGVyWCwgdGhpcy5zdGFydFksIHRoaXMuZW5kWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBSZWNlcHRvciB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIHByaXZhdGUgbm90ZVNpemU6IG51bWJlclxyXG4gICAgcHJpdmF0ZSB0cmFja051bWJlcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgc2tldGNoSW5zdGFuY2U6IHA1LCBub3RlU2l6ZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSBjZW50ZXJZO1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBub3RlU2l6ZTtcclxuICAgICAgICB0aGlzLnRyYWNrTnVtYmVyID0gdHJhY2tOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaXNSZWNlcHRvckRyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdSZWNlcHRvcih0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLFxyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclksIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIGlmICghaXNSZWNlcHRvckRyYXdTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgIERlZmF1bHROb3RlU2tpbi5kcmF3UmVjZXB0b3IodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCwgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBEaXNwbGF5Q29uZmlnIHtcclxuLy8gICAgIHB1YmxpYyBub3RlU2l6ZTogbnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuLy8gICAgIHB1YmxpYyBzY3JvbGxEaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbjtcclxuLy8gICAgIHB1YmxpYyByZWNlcHRvclNpemVzOiBudW1iZXJbXTtcclxuLy9cclxuLy8gICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4vLyAgICAgICAgIHRoaXMubm90ZVNpemUgPSBjb25maWcubm90ZVNpemU7XHJcbi8vICAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBjb25maWcucGl4ZWxzUGVyU2Vjb25kO1xyXG4vLyAgICAgICAgIHRoaXMucmVjZXB0b3JZUGVyY2VudCA9IGNvbmZpZy5yZWNlcHRvcllQZXJjZW50O1xyXG4vLyAgICAgICAgIHRoaXMuc2Nyb2xsRGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbjtcclxuLy8gICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMgPSBbXTtcclxuLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMucmVjZXB0b3JTaXplcy5wdXNoKGNvbmZpZy5ub3RlU2l6ZSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vKiBBIHNldCBvZiBvcHRpb25zIHRoYXQgaW50ZXJzZWN0IHdpdGggdGhlIHVzZXIgQ29uZmlnLCBidXQgYXJlIGV4cGVjdGVkIHRvIGJlIGNoYW5nZWQgZHVyaW5nIHBsYXkgKi9cclxuZXhwb3J0IGludGVyZmFjZSBEaXNwbGF5Q29uZmlnIHtcclxuICAgIGdldE5vdGVTaXplOiAoKSA9PiBudW1iZXI7XHJcbiAgICBnZXRQaXhlbHNQZXJTZWNvbmQ6ICgpID0+IG51bWJlcjtcclxuICAgIGdldFJlY2VwdG9yWVBlcmNlbnQ6ICgpID0+IG51bWJlcjtcclxuICAgIGdldFNjcm9sbERpcmVjdGlvbjogKCkgPT4gU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgZ2V0UmVjZXB0b3JTaXplczogKCkgPT4gbnVtYmVyW107XHJcbiAgICBzZXRSZWNlcHRvclNpemU6ICh0cmFja051bWJlcjogbnVtYmVyLCByZWNlcHRvclNpemU6IG51bWJlcikgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERpc3BsYXlNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIHRvcExlZnRYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRvcExlZnRZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZywgc2tldGNoSW5zdGFuY2U6IHA1LCB0b3BMZWZ0WDogbnVtYmVyID0gMCxcclxuICAgICAgICAgICAgICAgIHRvcExlZnRZOiBudW1iZXIgPSAwLCB3aWR0aDogbnVtYmVyID0gMTgwLCBoZWlnaHQ6IG51bWJlciA9IDQwMCkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IGRpc3BsYXlDb25maWc7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMgPSAwO1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLnRvcExlZnRYID0gdG9wTGVmdFg7XHJcbiAgICAgICAgdGhpcy50b3BMZWZ0WSA9IHRvcExlZnRZO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSB0aGlzLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMgPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlLnJlY3QodGhpcy50b3BMZWZ0WCwgdGhpcy50b3BMZWZ0WSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuZHJhd05vdGVzQW5kQ29ubmVjdG9ycygpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JlY2VwdG9ycygpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZXNBbmRDb25uZWN0b3JzKCkge1xyXG4gICAgICAgIGxldCBsZWFzdFRpbWUgPSB0aGlzLmdldExlYXN0VGltZSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lID0gdGhpcy5nZXRHcmVhdGVzdFRpbWUodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5kcmF3QWxsQ29ubmVjdG9ycyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3QWxsTm90ZXMobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbE5vdGVzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBudW1UcmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdOb3Rlc0luVHJhY2sobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUsIGksIG51bVRyYWNrcywgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGVzSW5UcmFjayhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4UmFuZ2UgPSB0aGlzLm5vdGVNYW5hZ2VyLmdldE5vdGVzQnlUaW1lUmFuZ2UobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBsZXQgbm90ZXMgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl0uc2xpY2Uobm90ZUluZGV4UmFuZ2Uuc3RhcnRJbmRleCwgbm90ZUluZGV4UmFuZ2UuZW5kSW5kZXhOb3RJbmNsdXNpdmUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Tm90ZShub3Rlc1tpXSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3RlKG5vdGU6IE5vdGUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgICAgICBsZXQgeSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkobm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgIG5ldyBOb3RlRGlzcGxheSh4LCB5LCBub3RlLnR5cGUsIHRoaXMuc2tldGNoSW5zdGFuY2UsIHRoaXMuZGlzcGxheUNvbmZpZy5nZXROb3RlU2l6ZSgpLCB0cmFja051bWJlciwgbnVtVHJhY2tzKS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGVhc3RUaW1lKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdG90YWxEaXNwbGF5U2Vjb25kcyA9IHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC8gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZSAtIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvcllQZXJjZW50KCkgLyAxMDAgKiB0b3RhbERpc3BsYXlTZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R3JlYXRlc3RUaW1lKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdG90YWxEaXNwbGF5U2Vjb25kcyA9IHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC8gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZSArICgxIC0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yWVBlcmNlbnQoKSAvIDEwMCkgKiB0b3RhbERpc3BsYXlTZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROb3RlQ2VudGVyWCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByZWNlcHRvclNwYWNpbmcgPSB0aGlzLmdldERpc3BsYXlXaWR0aCgpIC8gbnVtVHJhY2tzIC0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldE5vdGVTaXplKCk7XHJcbiAgICAgICAgcmV0dXJuICgyICogdHJhY2tOdW1iZXIgKyAxKSAvIDIgKiAodGhpcy5kaXNwbGF5Q29uZmlnLmdldE5vdGVTaXplKCkgKyByZWNlcHRvclNwYWNpbmcpICsgdGhpcy50b3BMZWZ0WDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGVzc2VudGlhbGx5IGRlZmluZXMgYSBjb252ZXJzaW9uIGZyb20gc2Vjb25kcyB0byBwaXhlbHNcclxuICAgIHB1YmxpYyBnZXROb3RlQ2VudGVyWShub3RlVGltZUluU2Vjb25kczogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVZT2Zmc2V0ID0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpICogKG5vdGVUaW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCByZWNlcHRvcllPZmZzZXQgPSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JZUGVyY2VudCgpIC8gMTAwICogdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheUNvbmZpZy5nZXRTY3JvbGxEaXJlY3Rpb24oKSA9PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY2VwdG9yWU9mZnNldCArIG5vdGVZT2Zmc2V0ICsgdGhpcy50b3BMZWZ0WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLSAocmVjZXB0b3JZT2Zmc2V0ICsgbm90ZVlPZmZzZXQpICsgdGhpcy50b3BMZWZ0WTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsQ29ubmVjdG9ycyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3QWxsVHJhY2tDb25uZWN0b3JzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCB0cmFja3NbaV0sIGksXHJcbiAgICAgICAgICAgICAgICB0cmFja3MubGVuZ3RoLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsVHJhY2tDb25uZWN0b3JzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2s6IE5vdGVbXSwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlU3RhY2s6IE5vdGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb3RlOiBOb3RlID0gdHJhY2tbaV07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50aW1lSW5TZWNvbmRzIDwgbGVhc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50aW1lSW5TZWNvbmRzIDwgZ3JlYXRlc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE5vdGUgPSBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZE5vdGUgPSBjdXJyZW50Tm90ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnROb3RlICE9IHVuZGVmaW5lZCAmJiBlbmROb3RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCB8fCBzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDb25uZWN0b3Ioc3RhcnROb3RlLCBlbmROb3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm90ZVN0YWNrLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE5vdGUgPSBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZE5vdGUgPSBjdXJyZW50Tm90ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnROb3RlICE9IHVuZGVmaW5lZCAmJiBlbmROb3RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCB8fCBzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDb25uZWN0b3Ioc3RhcnROb3RlLCBlbmROb3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZTogTm90ZSwgZW5kTm90ZTogTm90ZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IG5vdGVTdGFydFkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKHN0YXJ0Tm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgbGV0IG5vdGVFbmRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShlbmROb3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuXHJcbiAgICAgICAgbGV0IGRyYXdTdGFydFk7XHJcbiAgICAgICAgaWYgKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuSEVMRCkge1xyXG4gICAgICAgICAgICBkcmF3U3RhcnRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShNYXRoLm1pbihjdXJyZW50VGltZSwgZW5kTm90ZS50aW1lSW5TZWNvbmRzKSwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFydFkgPSBub3RlU3RhcnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcmF3U3RhcnRZID0gdGhpcy5jbGFtcFZhbHVlVG9SYW5nZShkcmF3U3RhcnRZLCB0aGlzLnRvcExlZnRZLCB0aGlzLnRvcExlZnRZICsgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgZHJhd0VuZFkgPSBub3RlRW5kWVxyXG4gICAgICAgIGRyYXdFbmRZID0gdGhpcy5jbGFtcFZhbHVlVG9SYW5nZShkcmF3RW5kWSwgdGhpcy50b3BMZWZ0WSwgdGhpcy50b3BMZWZ0WSArIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbmV3IEhvbGRDb25uZWN0b3IoY2VudGVyWCwgZHJhd1N0YXJ0WSwgZHJhd0VuZFksIG5vdGVTdGFydFksIG5vdGVFbmRZLCB0aGlzLnNrZXRjaEluc3RhbmNlKS5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGFtcFZhbHVlVG9SYW5nZSh2YWx1ZTogbnVtYmVyLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgbG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlID4gdXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1JlY2VwdG9ycygpIHtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbmV3IFJlY2VwdG9yKHRoaXMuZ2V0Tm90ZUNlbnRlclgoaSwgbnVtVHJhY2tzKSwgdGhpcy5nZXROb3RlQ2VudGVyWSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UsIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvclNpemVzKClbaV0sIGksIG51bVRyYWNrcykuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbi8vIExldHMgdXMgY29kZSB0aGUgRE9NIFVJIGVsZW1lbnRzIGFzIGlmIGl0IHdlcmUgXCJpbW1lZGlhdGVcIiwgaS5lLiBzdGF0ZWxlc3MuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBET01XcmFwcGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlZ2lzdHJ5OiBNYXA8c3RyaW5nLCBwNS5FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvLyB1bmlxdWVJRCBzaG91bGQgYmUgdW5pcXVlIHdpdGhpbiBhIHNjZW5lXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShjcmVhdGVDYWxsOiAoKSA9PiBwNS5FbGVtZW50LCB1bmlxdWVJZDogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJ5Lmhhcyh1bmlxdWVJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMucmVnaXN0cnkuZ2V0KHVuaXF1ZUlkKSxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUNhbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5zZXQodW5pcXVlSWQsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJSZWdpc3RyeSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmZvckVhY2goKHZhbHVlLCBrZXksIG1hcCkgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIHJlbW92ZSB3YXMgc3VjY2Vzc2Z1bCwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyeS5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuZ2V0KGlkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGVsZW1lbnQgaWYgZm91bmQsIG90aGVyd2lzZSByZXR1cm5zIHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudEJ5SWQoaWQ6IHN0cmluZyk6IHA1LkVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChpZCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3QWNjdXJhY3lCYXJzKHA6IHA1LCBhY2N1cmFjeUxhYmVsczogc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhckhlaWdodDogbnVtYmVyLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Jvb0Zvckxhc3RBY2N1cmFjeTogYm9vbGVhbikge1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IGdldE1heFRleHRXaWR0aChwLCBhY2N1cmFjeUxhYmVscywgdGV4dFNpemUpO1xyXG4gICAgbGV0IHRvdGFsTm90ZXMgPSBub3RlTWFuYWdlci5nZXRUb3RhbE5vdGVzKCk7XHJcbiAgICBsZXQgYmFyU3BhY2luZyA9IDEwO1xyXG4gICAgbGV0IHRvdGFsSGVpZ2h0ID0gYWNjdXJhY3lMYWJlbHMubGVuZ3RoICogYmFySGVpZ2h0ICsgKGFjY3VyYWN5TGFiZWxzLmxlbmd0aCAtIDEpICogYmFyU3BhY2luZztcclxuICAgIGxldCBzdGFydFkgPSAocC5oZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyICsgYmFySGVpZ2h0IC8gMjtcclxuICAgIHN0YXJ0WSAqPSAwLjg7IC8vIHNoaWZ0IHRoZSByZXN1bHRzIHVwIHRvIG1ha2Ugcm9vbSBmb3IgZXhpdCBidXR0b25cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWN5TGFiZWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5TGFiZWwgPSBhY2N1cmFjeUxhYmVsc1tpXTtcclxuICAgICAgICBsZXQgbnVtQWNjdXJhY3lFdmVudHMgPSBnZXROdW1BY2N1cmFjeUV2ZW50cyhhY2N1cmFjeUxhYmVsLCBhY2N1cmFjeVJlY29yZGluZywgYWNjdXJhY3lNYW5hZ2VyKTtcclxuICAgICAgICBsZXQgcGVyY2VudEZpbGxlZCA9IG51bUFjY3VyYWN5RXZlbnRzIC8gdG90YWxOb3RlcztcclxuXHJcbiAgICAgICAgaWYgKGlzQm9vRm9yTGFzdEFjY3VyYWN5ICYmIGkgPT09IGFjY3VyYWN5TGFiZWxzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgZHJhd0FjY3VyYWN5V2l0aE5vQmFyKHAsIGNlbnRlclgsIHN0YXJ0WSArIGkgKiAoYmFySGVpZ2h0ICsgYmFyU3BhY2luZyksIGFjY3VyYWN5TGFiZWwsXHJcbiAgICAgICAgICAgICAgICBudW1BY2N1cmFjeUV2ZW50cy50b1N0cmluZygpLCB0b3RhbE5vdGVzLnRvU3RyaW5nKCksIHRleHRTaXplLCBtYXhUZXh0V2lkdGgsIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdBY2N1cmFjeUJhcihwLCBjZW50ZXJYLCBzdGFydFkgKyBpICogKGJhckhlaWdodCArIGJhclNwYWNpbmcpLCBhY2N1cmFjeUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgbnVtQWNjdXJhY3lFdmVudHMudG9TdHJpbmcoKSwgdG90YWxOb3Rlcy50b1N0cmluZygpLCB0ZXh0U2l6ZSwgbWF4VGV4dFdpZHRoLCBiYXJXaWR0aCwgYmFySGVpZ2h0LCBwZXJjZW50RmlsbGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE51bUFjY3VyYWN5RXZlbnRzKGFjY3VyYWN5TGFiZWw6IHN0cmluZywgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcikge1xyXG4gICAgcmV0dXJuIGFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZy5yZWR1Y2UoKHN1bSwgdHJhY2tSZWNvcmRpbmcpID0+XHJcbiAgICAgICAgc3VtICsgdHJhY2tSZWNvcmRpbmcuZmlsdGVyKGFjY3VyYWN5RXZlbnQgPT5cclxuICAgICAgICBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzLCBhY2N1cmFjeU1hbmFnZXIuY29uZmlnKSA9PT0gYWNjdXJhY3lMYWJlbCkubGVuZ3RoLCAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWF4VGV4dFdpZHRoKHA6IHA1LCB0ZXh0QXJyYXk6IHN0cmluZ1tdLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IHRleHRBcnJheS5tYXAoKHN0cmluZykgPT4gcC50ZXh0V2lkdGgoc3RyaW5nKSlcclxuICAgICAgICAucmVkdWNlKChtYXhXaWR0aCwgd2lkdGgpID0+IE1hdGgubWF4KG1heFdpZHRoLCB3aWR0aCwgLTEpKTtcclxuICAgIHAucG9wKCk7XHJcbiAgICByZXR1cm4gbWF4VGV4dFdpZHRoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3QWNjdXJhY3lCYXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBsYWJlbDE6IHN0cmluZywgbGFiZWwyOiBzdHJpbmcsIGxhYmVsMzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTaXplOiBudW1iZXIsIGxhcmdlc3RUZXh0V2lkdGg6IG51bWJlciwgYmFyV2lkdGg6IG51bWJlciwgYmFySGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudEZpbGxlZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCA9IDg7XHJcbiAgICBsZXQgdG90YWxXaWR0aCA9IGxhcmdlc3RUZXh0V2lkdGggKyBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsICsgYmFyV2lkdGg7XHJcbiAgICBsZXQgbGFiZWxSaWdodG1vc3RYID0gY2VudGVyWCAtIHRvdGFsV2lkdGggLyAyICsgbGFyZ2VzdFRleHRXaWR0aDtcclxuICAgIGRyYXdSaWdodEFsaWduZWRMYWJlbChwLCBsYWJlbFJpZ2h0bW9zdFgsIGNlbnRlclksIGxhYmVsMSwgdGV4dFNpemUpO1xyXG5cclxuICAgIGxldCBiYXJSaWdodFggPSBjZW50ZXJYICsgdG90YWxXaWR0aCAvIDI7XHJcbiAgICBsZXQgYmFyTGVmdFggPSBiYXJSaWdodFggLSBiYXJXaWR0aDtcclxuICAgIGxldCBiYXJDZW50ZXJYID0gKGJhckxlZnRYICsgYmFyUmlnaHRYKSAvIDI7XHJcbiAgICBkcmF3UGFydGlhbGx5RmlsbGVkQmFyKHAsIGJhckNlbnRlclgsIGNlbnRlclksIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQsIHRleHRTaXplLCBsYWJlbDIsIGxhYmVsMyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdSaWdodEFsaWduZWRMYWJlbChwOiBwNSwgcmlnaHRtb3N0WDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHQ6IHN0cmluZywgdGV4dFNpemU6IG51bWJlcikge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5SSUdIVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHRleHQsIHJpZ2h0bW9zdFgsIGNlbnRlclkpO1xyXG4gICAgcC5wb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1BhcnRpYWxseUZpbGxlZEJhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIHN0YXJ0TGFiZWw6IHN0cmluZywgZW5kTGFiZWw6IHN0cmluZykge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLnJlY3RNb2RlKHAuQ0VOVEVSKTtcclxuICAgIHAuc3Ryb2tlKFwid2hpdGVcIik7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgZmlsbGVkIHBhcnQgb2YgdGhlIGJhclxyXG4gICAgcC5maWxsKFwiZ3JheVwiKTtcclxuICAgIHAucmVjdChjZW50ZXJYIC0gKHdpZHRoICogKDEgLSBwZXJjZW50RmlsbGVkKSAvIDIpLCBjZW50ZXJZLCB3aWR0aCAqIHBlcmNlbnRGaWxsZWQsIGhlaWdodCk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgb3V0bGluZSBvZiB0aGUgYmFyXHJcbiAgICBwLm5vRmlsbCgpO1xyXG4gICAgcC5yZWN0KGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIGxhYmVscyBvbiB0aGUgZW5kcyBvZiB0aGUgYmFyXHJcbiAgICBsZXQgbGFiZWxTaXplID0gMS41ICogdGV4dFNpemU7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUobGFiZWxTaXplKTtcclxuICAgIHAudGV4dEFsaWduKHAuTEVGVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHN0YXJ0TGFiZWwsIGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAudGV4dEFsaWduKHAuUklHSFQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChlbmRMYWJlbCwgY2VudGVyWCArIHdpZHRoIC8gMiwgY2VudGVyWSArIDIpO1xyXG4gICAgcC5wb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0FjY3VyYWN5V2l0aE5vQmFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbGFiZWwxOiBzdHJpbmcsIGxhYmVsMjogc3RyaW5nLCBsYWJlbDM6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTaXplOiBudW1iZXIsIGxhcmdlc3RUZXh0V2lkdGg6IG51bWJlciwgYmFyV2lkdGg6IG51bWJlciwgYmFySGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIpIHtcclxuICAgIGxldCBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsID0gODtcclxuICAgIGxldCB0b3RhbFdpZHRoID0gbGFyZ2VzdFRleHRXaWR0aCArIHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgKyBiYXJXaWR0aDtcclxuICAgIGxldCBsYWJlbFJpZ2h0bW9zdFggPSBjZW50ZXJYIC0gdG90YWxXaWR0aCAvIDIgKyBsYXJnZXN0VGV4dFdpZHRoO1xyXG4gICAgZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHAsIGxhYmVsUmlnaHRtb3N0WCwgY2VudGVyWSwgbGFiZWwxLCB0ZXh0U2l6ZSk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgYWNjdXJhY3kgY291bnQgbGFiZWwgb24gdGhlIGxlZnQgZW5kIG9mIHRoZSBiYXJcclxuICAgIGxldCBsYWJlbFNpemUgPSAxLjUgKiB0ZXh0U2l6ZTtcclxuICAgIGxldCBiYXJSaWdodFggPSBjZW50ZXJYICsgdG90YWxXaWR0aCAvIDI7XHJcbiAgICBsZXQgYmFyTGVmdFggPSBiYXJSaWdodFggLSBiYXJXaWR0aDtcclxuICAgIGxldCBiYXJDZW50ZXJYID0gKGJhckxlZnRYICsgYmFyUmlnaHRYKSAvIDI7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZShsYWJlbFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5MRUZULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQobGFiZWwyLCBiYXJDZW50ZXJYIC0gYmFyV2lkdGggLyAyLCBjZW50ZXJZICsgMik7XHJcbiAgICBwLnBvcCgpO1xyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvbGRHbG93IHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGdsb3dTdGFydFRpbWVzOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgc3RhdGljIGRvbnREcmF3RmxhZzogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnbG93UGVyaW9kSW5TZWNvbmRzOiBudW1iZXIgPSAwLjM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyLCBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXMucHVzaChIb2xkR2xvdy5kb250RHJhd0ZsYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXSAhPT0gSG9sZEdsb3cuZG9udERyYXdGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGFwc2VkVGltZSA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gdGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjdXJyZW50VGltZUluU2Vjb25kcywgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdsb3dBbHBoYSA9IHRoaXMuZ2V0R2xvd0FscGhhKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBnbG93Q29sb3IgPSBwLmNvbG9yKDAsIDI1NSwgMCwgZ2xvd0FscGhhKTtcclxuICAgICAgICAgICAgICAgIGxldCBnbG93U2l6ZSA9IHRoaXMuZ2V0R2xvd1NpemUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R2xvdyhwLCBjZW50ZXJYLCBjZW50ZXJZLCBnbG93U2l6ZSwgZ2xvd1NpemUgLyAyLCBnbG93Q29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dsb3cocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5ub1N0cm9rZSgpO1xyXG4gICAgICAgIHAuZmlsbChjb2xvcik7XHJcbiAgICAgICAgcC5lbGxpcHNlKGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRHbG93QWxwaGEoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmltYXRpb25UaW1lID0gZWxhcHNlZFRpbWVJblNlY29uZHMgJSBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25SYXRpbyA9IGFuaW1hdGlvblRpbWUgLyBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpTGVycCgwLCA1MCwgYW5pbWF0aW9uUmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R2xvd1NpemUoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmltYXRpb25UaW1lID0gZWxhcHNlZFRpbWVJblNlY29uZHMgJSBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25SYXRpbyA9IGFuaW1hdGlvblRpbWUgLyBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBtYXhTaXplID0gdGhpcy5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmlMZXJwKDAsIG1heFNpemUsIGFuaW1hdGlvblJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJpTGVycChtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDwgMC41KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlcnAobWluVmFsdWUsIG1heFZhbHVlLCAxIC0gcmF0aW8gLyAwLjUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlcnAobWluVmFsdWUsIG1heFZhbHVlLCAyICogcmF0aW8gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsZXJwKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl0gPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5ob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdID0gSG9sZEdsb3cuZG9udERyYXdGbGFnO1xyXG4gICAgfVxyXG59IiwiLyogVGhpcyBjbGFzcyBpcyBpbnRlbmRlZCBvbmx5IHRvIGJlIHVzZWQgdG8gc3RvcmUgdGhlIGhvbGQgc3RhdGUgZm9yIG5vdGVzIHRoYXQgY2FuIGJlIGhlbGQuIFRoaXMgc2hvdWxkbid0IGJlIHVzZWRcclxuICAgZm9yIG5vcm1hbCBub3RlcyBvciBnZW5lcmFsIGtleWJvYXJkIHN0YXRlICovXHJcbmV4cG9ydCBjbGFzcyBIb2xkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGhlbGRUcmFja3M6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgb25UcmFja0hvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgb25UcmFja1VuaG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG51bVRyYWNrczogbnVtYmVyLCBvblRyYWNrSG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgICAgb25UcmFja1VuaG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbGRUcmFja3MucHVzaChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25UcmFja0hvbGQgPSBvblRyYWNrSG9sZDtcclxuICAgICAgICB0aGlzLm9uVHJhY2tVbmhvbGQgPSBvblRyYWNrVW5ob2xkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1RyYWNrSGVsZCh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblRyYWNrSG9sZCh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25UcmFja1VuaG9sZCh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtQYXJ0aWNsZVN5c3RlbX0gZnJvbSBcIi4vcGFydGljbGVfc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb2xkUGFydGljbGVzIHtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgcGFydGljbGVTeXN0ZW1zOiBQYXJ0aWNsZVN5c3RlbVtdO1xyXG4gICAgcHJpdmF0ZSBwcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wczogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kczogbnVtYmVyID0gMS41O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZG9udERyYXdGbGFnOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlUGVyaW9kSW5TZWNvbmRzOiBudW1iZXIgPSAwLjA1O1xyXG4gICAgcHJpdmF0ZSBncmF2aXR5RGlyZWN0aW9uOiBudW1iZXJcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmdyYXZpdHlEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93biA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgZ3Jhdml0eTogcDUuVmVjdG9yID0gcC5jcmVhdGVWZWN0b3IoMCwgMjAwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtcy5wdXNoKG5ldyBQYXJ0aWNsZVN5c3RlbShIb2xkUGFydGljbGVzLnBhcnRpY2xlc0xpZmV0aW1lSW5TZWNvbmRzLCBncmF2aXR5KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzLnB1c2goSG9sZFBhcnRpY2xlcy5kb250RHJhd0ZsYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFydGljbGVzVG9UcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1t0cmFja051bWJlcl0uZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkUGFydGljbGVzVG9UcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdICE9PSBIb2xkUGFydGljbGVzLmRvbnREcmF3RmxhZykge1xyXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gKyBIb2xkUGFydGljbGVzLnBhcnRpY2xlUGVyaW9kSW5TZWNvbmRzIDwgY3VycmVudFRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdUaW1lc3RhbXAgPSB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSArIEhvbGRQYXJ0aWNsZXMucGFydGljbGVQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjZXB0b3JUaW1lUG9zaXRpb24gPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsUG9zaXRpb24gPSB0aGlzLmdldEluaXRpYWxQb3NpdGlvbihwLCB0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHJlY2VwdG9yVGltZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsVmVsb2NpdHkgPSBwLmNyZWF0ZVZlY3RvcigwLCAtNTAwICogdGhpcy5ncmF2aXR5RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW3RyYWNrTnVtYmVyXS5hZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbiwgaW5pdGlhbFZlbG9jaXR5LCBuZXdUaW1lc3RhbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgMSwgcC5jb2xvcigwLCAyNTUsIDAsIDE1MCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gPSBuZXdUaW1lc3RhbXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbml0aWFsUG9zaXRpb24ocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJZKGNlbnRlclRpbWVJblNlY29uZHMsIGNlbnRlclRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVZlY3RvcihjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gPSBIb2xkUGFydGljbGVzLmRvbnREcmF3RmxhZztcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge09ubGluZVBsYXlsaXN0fSBmcm9tIFwiLi9vbmxpbmVfcGxheWxpc3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWw6IGFueSA9IHt9O1xyXG5nbG9iYWwucDVTY2VuZSA9IG5ldyBQNVNjZW5lKCk7XHJcbmdsb2JhbC5jb25maWcgPSBDb25maWcubG9hZCgpO1xyXG5nbG9iYWwuZ2xvYmFsQ2xhc3MgPSBcImdhbWVcIjtcclxuZ2xvYmFsLm9ubGluZVBsYXlsaXN0ID0gbmV3IE9ubGluZVBsYXlsaXN0KCk7IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2V0S2V5U3RyaW5nLCBzZXRDb25maWdLZXlCaW5kaW5nfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmdzVWl9IGZyb20gXCIuL2tleV9iaW5kaW5nc191aVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXlCaW5kaW5nIHtcclxuICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICBrZXlDb2RlOiBudW1iZXIsXHJcbiAgICBzdHJpbmc6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5QmluZGluZ0hlbHBlciB7XHJcbiAgICBwcml2YXRlIGJpbmRpbmdzVG9BY3F1aXJlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRCaW5kaW5nTnVtYmVyOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmluZGluZ3NUb0FjcXVpcmU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3NUb0FjcXVpcmUgPSBiaW5kaW5nc1RvQWNxdWlyZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYmluZE5leHQocDogcDUsIGtleUJpbmRpbmdzUXVpY2tzdGFydElkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQga2V5YmluZGluZzogS2V5QmluZGluZyA9IHtcclxuICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIsXHJcbiAgICAgICAgICAgIGtleUNvZGU6IHAua2V5Q29kZSxcclxuICAgICAgICAgICAgc3RyaW5nOiBnZXRLZXlTdHJpbmcocClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldENvbmZpZ0tleUJpbmRpbmcodGhpcy5jdXJyZW50QmluZGluZ051bWJlciwgdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSwga2V5YmluZGluZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmluZGluZ051bWJlcisrO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QmluZGluZ051bWJlciA+PSB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoLTEpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCkuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgS2V5QmluZGluZ3NVaS5ub0xvbmdlcldhaXRpbmdGb3JMYXN0S2V5KHApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEtleUJpbmRpbmdzVWkuc2Nyb2xsS2V5QmluZGluZ0ludG9WaWV3KHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIpO1xyXG4gICAgICAgICAgICBLZXlCaW5kaW5nc1VpLmluZGljYXRlV2FpdGluZ0ZvcktleShwLCB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ0hlbHBlcn0gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBmaW5kQmluZGluZ0luZm9Gb3JUcmFjaywgZ2VuZXJhdGVQcmV2aWV3Tm90ZXMsIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSxcclxuICAgIGdldEtleVN0cmluZyxcclxuICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyxcclxuICAgIGlzS2V5QmluZGluZ3NEZWZpbmVkLFxyXG4gICAgc2V0Q29uZmlnS2V5QmluZGluZ1xyXG59IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtjcmVhdGVMYWJlbCwgY3JlYXRlTGFiZWxlZElucHV0LCBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzfSBmcm9tIFwiLi91aV91dGlsXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBLZXlCaW5kaW5nc1VpIHtcclxuICAgIHByaXZhdGUgc3RhdGljIFNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVDogc3RyaW5nID0gXCJTZXRcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIFNFVF9CVVRUT05fQUNUSVZFX1RFWFQ6IHN0cmluZyA9IFwiUHJlc3MgQW55IEtleVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbnVtVHJhY2tzOiBudW1iZXIgPSA0O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdyhwOiBwNSwgcGFyZW50RWxlbWVudDogcDUuRWxlbWVudCwgcGFnZVN0eWxlQ2xhc3M6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIgPSB0aGlzLmNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGlsZChrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIuZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5udW1UcmFja3MgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubnVtVHJhY2tzID0gNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByZXZpZXdOdW1UcmFja3MgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJOdW1iZXIgb2YgVHJhY2tzXCIsIFwicHJldmlld051bVRyYWNrc0lucHV0XCIsXHJcbiAgICAgICAgICAgIHRoaXMubnVtVHJhY2tzLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMocHJldmlld051bVRyYWNrcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHByZXZpZXdOdW1UcmFja3MuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgJiYgdmFsdWUgPiAwICYmIHZhbHVlIDw9IDI2KSB7XHJcbiAgICAgICAgICAgICAgICBLZXlCaW5kaW5nc1VpLnJlbW92ZU9sZEJpbmRpbmdCdXR0b25zKHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubnVtVHJhY2tzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucHJldmlld0Rpc3BsYXkgPSBuZXcgUHJldmlld0Rpc3BsYXkoZ2VuZXJhdGVQcmV2aWV3Tm90ZXModmFsdWUpLCBnbG9iYWwuY29uZmlnLCBnbG9iYWwucDVTY2VuZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXByZXZpZXdOdW1UcmFja3MuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNoaWxkKHByZXZpZXdOdW1UcmFja3MuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJLZXktQmluZGluZ3MgUXVpY2tzdGFydFwiKTtcclxuICAgICAgICB9LCBcImtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvblwiKTtcclxuICAgICAgICBpZiAoIWtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCA9IFwia2V5YmluZGluZ3MtcXVpY2tzdGFydFwiO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhwYWdlU3R5bGVDbGFzcyk7XHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKFwia2V5YmluZGluZ3MtcXVpY2tzdGFydFwiKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuaWQoa2V5QmluZGluZ3NRdWlja3N0YXJ0SWQpO1xyXG5cclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXliaW5kaW5nSGVscGVyID0gbmV3IEtleUJpbmRpbmdIZWxwZXIodGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxLZXlCaW5kaW5nSW50b1ZpZXcoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRlV2FpdGluZ0ZvcktleShwLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRoaXMgYWN0aW9uIHRvIHRoZSBcIi0xXCIga2V5IHNvIHRoYXQgaXQgaGFwcGVucyBvbiBhbnkga2V5IHByZXNzXHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKC0xLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoaXMgY29kZSBiZWNhdXNlIGl0J3MgdXNlZCB0byBpbmRpY2F0ZSBpbnB1dCB0aGF0J3Mgbm90IHlldCBmaW5pc2hlZCBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAua2V5Q29kZSAhPT0gMjI5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleWJpbmRpbmdIZWxwZXIuYmluZE5leHQocCwga2V5QmluZGluZ3NRdWlja3N0YXJ0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0tleUJpbmRpbmdzRGVmaW5lZCh0aGlzLm51bVRyYWNrcykpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzKHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nSW5wdXQgPSB0aGlzLmNyZWF0ZUtleUJpbmRpbmdJbnB1dCh0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHBhZ2VTdHlsZUNsYXNzKTtcclxuICAgICAgICAgICAgaWYgKCFrZXlCaW5kaW5nSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGlsZChrZXlCaW5kaW5nSW5wdXQuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlS2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyKCk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmh0bWwoXHJcbiAgICAgICAgICAgICAgICAnS2V5IEJpbmRpbmdzIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjEycHhcIj4odHJhY2sgMSBpcyB0aGUgbGVmdG1vc3QgdHJhY2spPC9zcGFuPidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwib3B0aW9ucy1mcmVlLXRleHRcIik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9LCBcImtleUJpbmRpbmdzU2VjdGlvbkhlYWRlclwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVLZXlCaW5kaW5nSW5wdXQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1c3RvbUNsYXNzOiBzdHJpbmcpXHJcbiAgICAgICAgOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgICAgIGxldCBzZXRCdXR0b25JZCA9IHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBrZXliaW5kaW5nSW5wdXRDbGFzcyA9IFwia2V5YmluZGluZy1pbnB1dFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIFwiXCIpO1xyXG4gICAgICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgICAgIGxhYmVsLmFkZENsYXNzKGtleWJpbmRpbmdJbnB1dENsYXNzKTtcclxuICAgICAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2V0QnV0dG9uID0gcC5jcmVhdGVCdXR0b24oXCJTZXRcIik7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLmlkKHNldEJ1dHRvbklkKTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRlV2FpdGluZ0ZvcktleShwLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKC0xLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoaXMgY29kZSBiZWNhdXNlIGl0J3MgdXNlZCB0byBpbmRpY2F0ZSBpbnB1dCB0aGF0J3Mgbm90IHlldCBmaW5pc2hlZCBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAua2V5Q29kZSAhPT0gMjI5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmZpZ0tleUJpbmRpbmcodHJhY2tOdW1iZXIsIG51bVRyYWNrcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFja051bWJlcjogdHJhY2tOdW1iZXIsIGtleUNvZGU6IHAua2V5Q29kZSwgc3RyaW5nOiBnZXRLZXlTdHJpbmcocCl9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub0xvbmdlcldhaXRpbmdGb3JLZXkoc2V0QnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLnVuYmluZEtleSgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfSwgdGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykpO1xyXG5cclxuICAgICAgICBsZXQgdHJhY2tCaW5kaW5nSW5mbyA9IGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyLCBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpKTtcclxuICAgICAgICBsZXQga2V5U3RyaW5nID0gdHJhY2tCaW5kaW5nSW5mby5zdHJpbmc7XHJcbiAgICAgICAgbGV0IGxhYmVsU3RyaW5nID0gJ1RyYWNrICcgKyAodHJhY2tOdW1iZXIgKyAxKSArICc6IDxzcGFuIGNsYXNzPVwiJyArXHJcbiAgICAgICAgICAgIGtleWJpbmRpbmdJbnB1dENsYXNzICsgXCIgXCIgKyBjdXN0b21DbGFzcyArIFwiIFwiICsgZ2xvYmFsLmdsb2JhbENsYXNzICtcclxuICAgICAgICAgICAgJ1wiPicgKyBrZXlTdHJpbmcgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJMQUJFTFwiKTtcclxuICAgICAgICBsYWJlbEVsZW1lbnQuaHRtbChsYWJlbFN0cmluZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbmRpY2F0ZVdhaXRpbmdGb3JLZXkocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2V0QnV0dG9uczogcDUuRWxlbWVudFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbnMucHVzaCh0aGlzLmdldFNldEJ1dHRvbihwLCBpLCB0aGlzLm51bVRyYWNrcykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXRCdXR0b246IHA1LkVsZW1lbnQgPSBzZXRCdXR0b25zW2ldO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gdHJhY2tOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHNldEJ1dHRvbi5odG1sKHRoaXMuU0VUX0JVVFRPTl9BQ1RJVkVfVEVYVCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRCdXR0b24uaHRtbCh0aGlzLlNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U2V0QnV0dG9uKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcik6IHA1LkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBzZXRCdXR0b25JZCA9IHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHJldHVybiBwLnNlbGVjdChcIiNcIiArIHNldEJ1dHRvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBub0xvbmdlcldhaXRpbmdGb3JLZXkoc2V0QnV0dG9uOiBwNS5FbGVtZW50KSB7XHJcbiAgICAgICAgc2V0QnV0dG9uLmh0bWwodGhpcy5TRVRfQlVUVE9OX0lOQUNUSVZFX1RFWFQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbm9Mb25nZXJXYWl0aW5nRm9yTGFzdEtleShwOiBwNSkge1xyXG4gICAgICAgIGxldCBzZXRCdXR0b246IHA1LkVsZW1lbnQgPSB0aGlzLmdldFNldEJ1dHRvbihwLCB0aGlzLm51bVRyYWNrcyAtIDEsIHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICBzZXRCdXR0b24uaHRtbCh0aGlzLlNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5QmluZGluZ1VuaXF1ZUlkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpICsgXCJCdXR0b25cIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFja1wiICsgdHJhY2tOdW1iZXIgKyBcIk9mXCIgKyBudW1UcmFja3MgKyBcIkJpbmRpbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNjcm9sbEtleUJpbmRpbmdJbnRvVmlldyh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdCdXR0b25JZCA9IHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoa2V5QmluZGluZ0J1dHRvbklkKS5wYXJlbnRFbGVtZW50LnNjcm9sbEludG9WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVPbGRCaW5kaW5nQnV0dG9ucyhudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBudW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZCh0aGlzLmdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBhY3Rpb25CaW5kaW5nczogTWFwPG51bWJlciwge2tleURvd25BY3Rpb246ICgpID0+IHZvaWQsIGtleVVwQWN0aW9uOiAoKSA9PiB2b2lkfT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocDogcDUpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbkJpbmRpbmdzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBwLmtleVByZXNzZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gLTEgaXMgYSBzcGVjaWFsIGtleUNvZGUgZmxhZyB0aGF0IG1lYW5zIFwiYW55XCIuIFRoaXMgaXMgZXNwZWNpYWxseSB1c2VmdWwgZm9yIHNldHRpbmcgdXAga2V5IGJpbmRpbmdzLlxyXG4gICAgICAgICAgICBsZXQgZ2xvYmFsQWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KC0xKTtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMua2V5RG93bkFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQocC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucy5rZXlEb3duQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVxdWl2YWxlbnQgdG8gZXZlbnQucHJldmVudERlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgcC5rZXlSZWxlYXNlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KHAua2V5Q29kZSk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLmtleVVwQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmtleVVwQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5VG9BY3Rpb24oa2V5Q29kZTogbnVtYmVyLCBrZXlEb3duQWN0aW9uOiAoKSA9PiB2b2lkLCBrZXlVcEFjdGlvbjogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uQmluZGluZ3Muc2V0KGtleUNvZGUsIHtrZXlEb3duQWN0aW9uOiBrZXlEb3duQWN0aW9uLCBrZXlVcEFjdGlvbjoga2V5VXBBY3Rpb259KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRLZXkoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uQmluZGluZ3MuZGVsZXRlKGtleUNvZGUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnZXRNaXNzQm91bmRhcnl9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXNzTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGxhc3RDaGVja2VkTm90ZUluZGljZXM6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudDogKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyLCBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlcy5wdXNoKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5ob2xkTWFuYWdlciA9IGhvbGRNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCA9IGhhbmRsZUFjY3VyYWN5RXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyBBIGxvd2VyQm91bmQgZm9yIG1pc3NlcyBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGlzIHdheSBvZiBkb2luZyBtaXNzZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWxsTWlzc2VkTm90ZXNGb3JUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUFsbE1pc3NlZE5vdGVzRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBpbmRleE9mTGFzdENoZWNrZWROb3RlID0gdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhPZkxhc3RDaGVja2VkTm90ZSA+PSB0cmFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm90ZSA9IHRyYWNrW2luZGV4T2ZMYXN0Q2hlY2tlZE5vdGVdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05vdE1pc3NhYmxlKGN1cnJlbnROb3RlKSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSsrO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb3RlTWlzc2VkQW5kTm90SGFuZGxlZChjdXJyZW50Tm90ZSwgY3VycmVudFRpbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1pc3NlZE5vdGUodHJhY2tOdW1iZXIsIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlc1t0cmFja051bWJlcl0gPSBpbmRleE9mTGFzdENoZWNrZWROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvciBleGFtcGxlOiBub3RlcyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIGhpdCBhcmUgbm90IG1pc3NhYmxlXHJcbiAgICBwcml2YXRlIGlzTm90TWlzc2FibGUobm90ZTogTm90ZSkge1xyXG4gICAgICAgIHJldHVybiBub3RlLnN0YXRlICE9PSBOb3RlU3RhdGUuREVGQVVMVDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTm90ZU1pc3NlZEFuZE5vdEhhbmRsZWQobm90ZTogTm90ZSwgY3VycmVudFRpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBtaXNzQm91bmRhcnkgPSBnZXRNaXNzQm91bmRhcnkoY3VycmVudFRpbWUsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbm90ZS50aW1lSW5TZWNvbmRzIDwgbWlzc0JvdW5kYXJ5ICYmIG5vdGUuc3RhdGUgPT09IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlTWlzc2VkTm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBpbmRleE9mTWlzc2VkTm90ZTogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCBtaXNzZWROb3RlID0gdHJhY2tbaW5kZXhPZk1pc3NlZE5vdGVdO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5uYW1lLFxyXG4gICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiAtSW5maW5pdHksXHJcbiAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICBub3RlVHlwZTogbWlzc2VkTm90ZS50eXBlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWlzc2VkTm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5NSVNTRUQ7XHJcbiAgICAgICAgaWYgKG1pc3NlZE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkTWFuYWdlci5pc1RyYWNrSGVsZCh0cmFja051bWJlcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZE1hbmFnZXIudW5ob2xkVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAvLyBGb3JjZSBhIGhvbGQgcmVsZWFzZSB1cG9uIG1pc3NpbmcgdGhlIHRhaWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobWlzc2VkTm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQpIHtcclxuICAgICAgICAgICAgbGV0IG5leHROb3RlID0gdHJhY2tbaW5kZXhPZk1pc3NlZE5vdGUgKyAxXTtcclxuICAgICAgICAgICAgaWYgKG5leHROb3RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dE5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuTUlTU0VEOyAvLyBNaXNzIHRoZSB0YWlsIHdoZW4geW91IG1pc3MgdGhlIGhlYWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RlTWFuYWdlciB7XHJcbiAgICB0cmFja3M6IE5vdGVbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgICAgICB0aGlzLnRyYWNrcyA9IHRyYWNrcztcclxuICAgICAgICB0aGlzLnJlbW92ZVVuc3VwcG9ydGVkTm90ZVR5cGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVVbnN1cHBvcnRlZE5vdGVUeXBlcygpIHtcclxuICAgICAgICBsZXQgc3VwcG9ydGVkTm90ZVR5cGVzOiBOb3RlVHlwZVtdID0gW05vdGVUeXBlLlRBSUwsIE5vdGVUeXBlLkhPTERfSEVBRCwgTm90ZVR5cGUuTk9STUFMXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMudHJhY2tzLmxlbmd0aDsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IHRoaXMudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm90ZU51bWJlciA9IDA7IG5vdGVOdW1iZXIgPCB0cmFjay5sZW5ndGg7IG5vdGVOdW1iZXIrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdGU6IE5vdGUgPSB0cmFja1tub3RlTnVtYmVyXTtcclxuICAgICAgICAgICAgICAgIGlmICghc3VwcG9ydGVkTm90ZVR5cGVzLmluY2x1ZGVzKG5vdGUudHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjay5zcGxpY2Uobm90ZU51bWJlciwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZU51bWJlci0tOyAvLyBkZWNyZW1lbnQgbm90ZSBudW1iZXIgc28gbmV4dCBpdGVyYXRpb24gaXQgc3RhcnRzIGF0IHRoZSByaWdodCBub3RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90ZXNCeVRpbWVSYW5nZShsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpOiB7IHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IG51bWJlciB9IHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgbGV0IGZpcnN0RmluZFJlc3VsdCA9IHRoaXMuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUobGVhc3RUaW1lLCB0cmFjayk7XHJcbiAgICAgICAgaWYgKGZpcnN0RmluZFJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAtMSwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IC0xfTsgLy8gbm8gbm90ZXMgbGVmdCBhZnRlciBsZWFzdCB0aW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYXN0RmluZFJlc3VsdCA9IHRoaXMuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoZ3JlYXRlc3RUaW1lLCB0cmFjaywgZmlyc3RGaW5kUmVzdWx0KTtcclxuICAgICAgICBpZiAobGFzdEZpbmRSZXN1bHQgPCAwKSB7XHJcbiAgICAgICAgICAgIGxhc3RGaW5kUmVzdWx0ID0gdHJhY2subGVuZ3RoOyAvLyBncmVhdGVzdFRpbWUgZXhjZWVkcyB0aGUgZW5kIG9mIHRoZSBub3Rlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmlyc3RGaW5kUmVzdWx0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0RmluZFJlc3VsdCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAtMSwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IC0xfTsgLy8gaGF2ZW4ndCBzZWVuIGZpcnN0IG5vdGVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogMCwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IGxhc3RGaW5kUmVzdWx0fTsgLy8gbm90ZXMgYXJlIGp1c3Qgc3RhcnRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IGZpcnN0RmluZFJlc3VsdCwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IGxhc3RGaW5kUmVzdWx0fTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBubyB0d28gbm90ZXMgd2lsbCBoYXZlIHRoZSBzYW1lIHRpbWUgaW4gdGhlIHNhbWUgdHJhY2tcclxuICAgIGZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGtleVRpbWU6IG51bWJlciwgdHJhY2s6IE5vdGVbXSwgc2VhcmNoU3RhcnQgPSAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHNlYXJjaFN0YXJ0OyBpIDwgdHJhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRyYWNrW2ldLnRpbWVJblNlY29uZHMgPiBrZXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWFybGllc3ROb3RlKCk6IE5vdGUge1xyXG4gICAgICAgIGxldCBlYXJsaWVzdE5vdGU6IE5vdGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFja3NbaV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrRWFybGllc3ROb3RlOiBOb3RlID0gdGhpcy50cmFja3NbaV1bMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoZWFybGllc3ROb3RlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhcmxpZXN0Tm90ZSA9IHRyYWNrRWFybGllc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlYXJsaWVzdE5vdGUudGltZUluU2Vjb25kcyA+IHRyYWNrRWFybGllc3ROb3RlLnRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXJsaWVzdE5vdGUgPSB0cmFja0VhcmxpZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWFybGllc3ROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhdGVzdE5vdGUoKTogTm90ZSB7XHJcbiAgICAgICAgbGV0IGxhdGVzdE5vdGU6IE5vdGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFja3NbaV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrTGF0ZXN0Tm90ZTogTm90ZSA9IHRoaXMudHJhY2tzW2ldW3RoaXMudHJhY2tzW2ldLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhdGVzdE5vdGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90ZSA9IHRyYWNrTGF0ZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGF0ZXN0Tm90ZS50aW1lSW5TZWNvbmRzIDwgdHJhY2tMYXRlc3ROb3RlLnRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RlID0gdHJhY2tMYXRlc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYXRlc3ROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRvdGFsTm90ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLnJlZHVjZSgoc3VtLCB0cmFjaykgPT4gc3VtICsgdHJhY2subGVuZ3RoLCAwKTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGVTa2luIHtcclxuICAgIHB1YmxpYyBub3RlOiBwNS5JbWFnZTtcclxuICAgIHB1YmxpYyBjb25uZWN0b3JUaWxlOiBwNS5JbWFnZTtcclxuICAgIHB1YmxpYyByZWNlcHRvcjogcDUuSW1hZ2U7XHJcblxyXG4gICAgLyogUmVxdWlyZXMgdGhhdCB0aGUgdGFpbCBiZSBoYWxmIHRoZSBoZWlnaHQgYW5kIHNhbWUgd2lkdGggYXMgbm90ZSBpbWFnZSAqL1xyXG4gICAgcHVibGljIHRhaWw6IHA1LkltYWdlO1xyXG5cclxuICAgIHByaXZhdGUgcm90YXRpb25BbmdsZXM6IE1hcDxudW1iZXIsIG51bWJlcltdPiA9IG5ldyBNYXAoW1xyXG4gICAgICAgIFs0LCBbMjcwLCAxODAsIDAsIDkwXV0sXHJcbiAgICAgICAgWzYsIFsyNzAsIDMxNSwgMTgwLCAwLCA0NSwgOTBdXVxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm90ZTogcDUuSW1hZ2UsIGNvbm5lY3RvcjogcDUuSW1hZ2UsIHRhaWw6IHA1LkltYWdlLCByZWNlcHRvcjogcDUuSW1hZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGUgPSBub3RlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yVGlsZSA9IGNvbm5lY3RvcjtcclxuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3IgPSByZWNlcHRvcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHB1YmxpYyBkcmF3Tm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBub3RlU2l6ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgc3dpdGNoIChub3RlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZVJvdGF0ZWQodGhpcy5ub3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3VGFpbCh0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHB1YmxpYyBkcmF3UmVjZXB0b3IodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2VSb3RhdGVkKHRoaXMucmVjZXB0b3IsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclksIG5vdGVTaXplKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHByaXZhdGUgZHJhd0hvbGRDb25uZWN0b3IoY2VudGVyWDogbnVtYmVyLCBkcmF3U3RhcnRZOiBudW1iZXIsIGRyYXdFbmRZOiBudW1iZXIsIG5vdGVTdGFydFk6IG51bWJlciwgbm90ZUVuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHNvdXJjZVdpZHRoID0gdGhpcy5jb25uZWN0b3JUaWxlLndpZHRoO1xyXG4gICAgICAgIGxldCBzb3VyY2VIZWlnaHQgPSB0aGlzLmNvbm5lY3RvclRpbGUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY2FsZWRXaWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBzY2FsZWRIZWlnaHQgPSBzY2FsZWRXaWR0aCAvIHNvdXJjZVdpZHRoICogc291cmNlSGVpZ2h0O1xyXG4gICAgICAgIGxldCBjb25uZWN0b3JIZWlnaHQgPSBNYXRoLmFicyhkcmF3RW5kWSAtIGRyYXdTdGFydFkpO1xyXG4gICAgICAgIGxldCBlbmRZT2Zmc2V0ID0gdGhpcy5nZXROb3RlRW5kT2Zmc2V0KG5vdGVFbmRZLCBkcmF3RW5kWSk7XHJcblxyXG4gICAgICAgIGxldCBlbmRQYXJ0aWFsVGlsZUhlaWdodCA9IHNjYWxlZEhlaWdodCAtIChlbmRZT2Zmc2V0ICUgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICBlbmRQYXJ0aWFsVGlsZUhlaWdodCA9IE1hdGgubWluKGVuZFBhcnRpYWxUaWxlSGVpZ2h0LCBjb25uZWN0b3JIZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnRQYXJ0aWFsVGlsZUhlaWdodCA9IChjb25uZWN0b3JIZWlnaHQgLSBlbmRQYXJ0aWFsVGlsZUhlaWdodCkgJSBzY2FsZWRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IG51bUNvbXBsZXRlVGlsZXMgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAoY29ubmVjdG9ySGVpZ2h0IC0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodCAtIGVuZFBhcnRpYWxUaWxlSGVpZ2h0KSAvIHNjYWxlZEhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYmxvY2sgYWxsb3dzIHVzIHRvIHVzZSB0aGUgc2FtZSBkcmF3aW5nIG1ldGhvZCBmb3IgYm90aCB1cHNjcm9sbCBhbmQgZG93bnNjcm9sbFxyXG4gICAgICAgIGxldCBib3R0b21QYXJ0aWFsVGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0b3BQYXJ0aWFsVGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0ID0gZW5kUGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0ID0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCA9IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0ID0gZW5kUGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkcmF3TWluWSA9IE1hdGgubWluKGRyYXdTdGFydFksIGRyYXdFbmRZKTtcclxuICAgICAgICBsZXQgZHJhd01heFkgPSBNYXRoLm1heChkcmF3U3RhcnRZLCBkcmF3RW5kWSk7XHJcbiAgICAgICAgbGV0IGlzUmV2ZXJzZWQgPSBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgIGxldCBpc0RyYXduRnJvbUJvdHRvbSA9IGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXA7XHJcbiAgICAgICAgaWYgKGVuZFBhcnRpYWxUaWxlSGVpZ2h0ID09PSBjb25uZWN0b3JIZWlnaHQpIHtcclxuICAgICAgICAgICAgaXNEcmF3bkZyb21Cb3R0b20gPSAhaXNEcmF3bkZyb21Cb3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYLCBkcmF3TWluWSwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCxcclxuICAgICAgICAgICAgdG9wUGFydGlhbFRpbGVIZWlnaHQgLyBzY2FsZWRIZWlnaHQsICFpc0RyYXduRnJvbUJvdHRvbSwgaXNSZXZlcnNlZCwgcCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Q29tcGxldGVUaWxlcyhjZW50ZXJYLCBkcmF3TWluWSArIHRvcFBhcnRpYWxUaWxlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LFxyXG4gICAgICAgICAgICBudW1Db21wbGV0ZVRpbGVzLCBpc1JldmVyc2VkLCBwKTtcclxuICAgICAgICB0aGlzLmRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYLCBkcmF3TWF4WSAtIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LFxyXG4gICAgICAgICAgICBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCAvIHNjYWxlZEhlaWdodCwgaXNEcmF3bkZyb21Cb3R0b20sXHJcbiAgICAgICAgICAgIGlzUmV2ZXJzZWQsIHApO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd1RhaWwodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy50YWlsLCAtbm90ZVNpemUgLyAyLCAtbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUgLyAyKTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMudGFpbCwgY2VudGVyWCAtIG5vdGVTaXplIC8gMiwgY2VudGVyWSAtIG5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplIC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Tm90ZUVuZE9mZnNldChub3RlRW5kWTogbnVtYmVyLCBkcmF3RW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IG5vdGVFbmRZIC0gZHJhd0VuZFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gZHJhd0VuZFkgLSBub3RlRW5kWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgdGhlIHBhcnRpYWwgdGlsZSB0ZXh0dXJlIGZyb20gc3RyZXRjaGluZyB3aGVuIHRoZSBwbGF5ZXIgaGl0cyBhIGhvbGQgZWFybHlcclxuICAgICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCBvZmZzZXQpO1xyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0NvbXBsZXRlVGlsZXMoY2VudGVyWDogbnVtYmVyLCBsZWFzdFk6IG51bWJlciwgc2NhbGVkV2lkdGg6IG51bWJlciwgc2NhbGVkSGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRpbGVzOiBudW1iZXIsIGlzUmV2ZXJzZWQ6IGJvb2xlYW4sIHA6IHA1KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UaWxlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IGxlYXN0WSArIGkgKiBzY2FsZWRIZWlnaHQgKyBzY2FsZWRIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgaWYgKGlzUmV2ZXJzZWQpIHtcclxuICAgICAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1zY2FsZWRIZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UGFydGlhbFRpbGUoY2VudGVyWDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCBzY2FsZWRXaWR0aDogbnVtYmVyLCBzY2FsZWRIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVdpZHRoOiBudW1iZXIsIHNvdXJjZUhlaWdodDogbnVtYmVyLCBoZWlnaHRQZXJjZW50OiBudW1iZXIsIGlzRHJhd25Gcm9tQm90dG9tOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JldmVyc2VkOiBib29sZWFuLCBwOiBwNSkge1xyXG4gICAgICAgIGlmIChoZWlnaHRQZXJjZW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uSGVpZ2h0ID0gaGVpZ2h0UGVyY2VudCAqIHNjYWxlZEhlaWdodDtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRvcExlZnRZICsgZGVzdGluYXRpb25IZWlnaHQgLyAyO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIGlmIChpc1JldmVyc2VkKSB7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0RyYXduRnJvbUJvdHRvbSkgeyAvLyBEcmF3IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1kZXN0aW5hdGlvbkhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25IZWlnaHQsIDAsIHNvdXJjZUhlaWdodCAtIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gRHJhdyBmcm9tIHRoZSB0b3Agb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtZGVzdGluYXRpb25IZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSGVpZ2h0LCAwLCAwLCBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3SW1hZ2VSb3RhdGVkKGltYWdlOiBwNS5JbWFnZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIHRoaXMucm90YXRlKHAsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHAuaW1hZ2UoaW1hZ2UsIC1ub3RlU2l6ZSAvIDIsIC1ub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJvdGF0ZShwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFuZ2xlcy5oYXMobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSh0aGlzLnJvdGF0aW9uQW5nbGVzLmdldChudW1UcmFja3MpW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC5yb3RhdGUodGhpcy5nZXREZWZhdWx0Um90YXRpb25BbmdsZUluRGVncmVlcyh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdFJvdGF0aW9uQW5nbGVJbkRlZ3JlZXModHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcm90YXRpb24gPSAtOTA7XHJcbiAgICAgICAgbGV0IHJvdGF0aW9uUGVyVHJhY2sgPSAzNjAgLyBudW1UcmFja3M7XHJcbiAgICAgICAgaWYgKHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzIC8gMikge1xyXG4gICAgICAgICAgICByb3RhdGlvbiAtPSB0cmFja051bWJlciAqIHJvdGF0aW9uUGVyVHJhY2s7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm90YXRpb24gKz0gKHRyYWNrTnVtYmVyIC0gbnVtVHJhY2tzIC8gMiArIDEpICogcm90YXRpb25QZXJUcmFjaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdGF0aW9uO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTdGVwZmlsZSwgU3RlcGZpbGVTdGF0ZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGUsIEF1ZGlvRmlsZVN0YXRlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcbmltcG9ydCB7UGxheWxpc3RDbGllbnR9IGZyb20gXCIuL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnRcIjtcclxuaW1wb3J0IHtTb25nfSBmcm9tIFwiLi9wbGF5bGlzdF9jbGllbnQvc29uZ1wiO1xyXG5pbXBvcnQge1N3ZlBhcnNlUmVzcG9uc2V9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc3dmXCI7XHJcblxyXG5leHBvcnQgZW51bSBPbmxpbmVQbGF5bGlzdFN0YXRlIHtcclxuICAgIE5PX1BMQVlMSVNULFxyXG4gICAgTE9BRElOR19QTEFZTElTVCxcclxuICAgIFBMQVlMSVNUX1JFQURZLFxyXG4gICAgUExBWUxJU1RfRVJST1IsXHJcbiAgICBMT0FESU5HX1NPTkcsXHJcbiAgICBTT05HX0VSUk9SLFxyXG59XHJcblxyXG5jbGFzcyBEaXNwbGF5YWJsZVNvbmcge1xyXG4gICAgcHJpdmF0ZSBzb25nOiBTb25nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvbmc6IFNvbmcpIHtcclxuICAgICAgICB0aGlzLnNvbmcgPSBzb25nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvbmcuc29uZ0RpZmZpY3VsdHkgKyBcIiBcIiArIHRoaXMuc29uZy5zb25nTmFtZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9ubGluZVBsYXlsaXN0IHtcclxuICAgIHB1YmxpYyBpbmRleFVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwbGF5bGlzdENsaWVudDogUGxheWxpc3RDbGllbnQ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX1BBR0VfU0laRTogbnVtYmVyID0gNTA7XHJcbiAgICBwdWJsaWMgc3RhdGU6IE9ubGluZVBsYXlsaXN0U3RhdGU7XHJcbiAgICBwdWJsaWMgZGlzcGxheWVkUGxheWxpc3Q6IERpc3BsYXlhYmxlU29uZ1tdO1xyXG4gICAgcHJpdmF0ZSBwYWdlTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHBhZ2VTaXplOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuTk9fUExBWUxJU1Q7XHJcbiAgICAgICAgdGhpcy5pbmRleFVybCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5bGlzdENsaWVudCA9IG5ldyBQbGF5bGlzdENsaWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBraWNrT2ZmTG9hZFBsYXlsaXN0KGluZGV4VXJsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1BMQVlMSVNUO1xyXG4gICAgICAgIHRoaXMucGxheWxpc3RDbGllbnQuaW5pdGlhbGl6ZShpbmRleFVybClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5pbml0aWFsaXplRGlzcGxheWVkUGxheWxpc3QoKSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHRoaXMuc3RhdGUgPSBPbmxpbmVQbGF5bGlzdFN0YXRlLlBMQVlMSVNUX0VSUk9SKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVEaXNwbGF5ZWRQbGF5bGlzdCgpIHtcclxuICAgICAgICB0aGlzLnNldFBhZ2UoMCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfUkVBRFlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMga2lja09mZkxvYWRTb25nKGRpc3BsYXllZFNvbmdJbmRleDogbnVtYmVyLCBzdGVwZmlsZTogU3RlcGZpbGUsIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuTE9BRElOR19TT05HO1xyXG4gICAgICAgIGF1ZGlvRmlsZS5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLk5PX0FVRElPX0ZJTEU7XHJcbiAgICAgICAgc3RlcGZpbGUuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLk5PX1NURVBGSUxFO1xyXG4gICAgICAgIHRoaXMucGxheWxpc3RDbGllbnQuZ2V0U3dmKHRoaXMuZ2V0U29uZ0luZGV4KGRpc3BsYXllZFNvbmdJbmRleCkpXHJcbiAgICAgICAgICAgIC50aGVuKChzd2ZQYXJzZVJlc3BvbnNlKSA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU3dmSW50b1N0ZXBmaWxlQW5kQXVkaW9GaWxlKHN3ZlBhcnNlUmVzcG9uc2UsIHN0ZXBmaWxlLCBhdWRpb0ZpbGUpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuU09OR19FUlJPUik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTb25nSW5kZXgoZGlzcGxheWVkU29uZ0luZGV4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gZGlzcGxheWVkU29uZ0luZGV4ICsgdGhpcy5wYWdlU2l6ZSAqIHRoaXMucGFnZU51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRTd2ZJbnRvU3RlcGZpbGVBbmRBdWRpb0ZpbGUoc3dmUGFyc2VSZXNwb25zZTogU3dmUGFyc2VSZXNwb25zZSwgc3RlcGZpbGU6IFN0ZXBmaWxlLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgICAgIHN0ZXBmaWxlLmxvYWRGZnJCZWF0bWFwKHN3ZlBhcnNlUmVzcG9uc2UuY2hhcnREYXRhKTtcclxuICAgICAgICBhdWRpb0ZpbGUubG9hZEJsb2Ioc3dmUGFyc2VSZXNwb25zZS5ibG9iKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0UGFnZSgpIHtcclxuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5wYWdlTnVtYmVyICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXZpb3VzUGFnZSgpIHtcclxuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5wYWdlTnVtYmVyIC0gMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQYWdlKHBhZ2VOdW1iZXI6IG51bWJlciwgcGFnZVNpemU/OiBudW1iZXIpIHtcclxuICAgICAgICBwYWdlU2l6ZSA9IHRoaXMuZ2V0VmFsaWRQYWdlU2l6ZShwYWdlU2l6ZSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRQYWdlTnVtYmVyKHBhZ2VOdW1iZXIsIHBhZ2VTaXplKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWluSW5kZXggPSBwYWdlTnVtYmVyICogcGFnZVNpemU7XHJcbiAgICAgICAgbGV0IG1heEluZGV4ID0gbWluSW5kZXggKyBwYWdlU2l6ZTtcclxuICAgICAgICB0aGlzLmRpc3BsYXllZFBsYXlsaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG1pbkluZGV4OyBpIDwgbWF4SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8IHRoaXMucGxheWxpc3RDbGllbnQuZ2V0UGxheWxpc3QoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkUGxheWxpc3QucHVzaCh0aGlzLmdldERpc3BsYXlhYmxlU29uZyhpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gcGFnZU51bWJlcjtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gcGFnZVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1ZhbGlkUGFnZU51bWJlcihwYWdlTnVtYmVyOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gMCA8PSBwYWdlTnVtYmVyICYmIHBhZ2VOdW1iZXIgPD0gdGhpcy5nZXRNYXhQYWdlTnVtYmVyKHBhZ2VTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlhYmxlU29uZyhzb25nSW5kZXg6IG51bWJlcik6IERpc3BsYXlhYmxlU29uZyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEaXNwbGF5YWJsZVNvbmcodGhpcy5wbGF5bGlzdENsaWVudC5nZXRQbGF5bGlzdCgpW3NvbmdJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VmFsaWRQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHBhZ2VTaXplID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9ubGluZVBsYXlsaXN0LkRFRkFVTFRfUEFHRV9TSVpFO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZVNpemUgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZVNpemUgPiAxMDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNYXhQYWdlTnVtYmVyKHBhZ2VTaXplOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnBsYXlsaXN0Q2xpZW50LmdldFBsYXlsaXN0KCkubGVuZ3RoIC8gcGFnZVNpemUpIC0gMTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtLZXlib2FyZEV2ZW50TWFuYWdlcn0gZnJvbSBcIi4va2V5Ym9hcmRfZXZlbnRfbWFuYWdlclwiO1xyXG5pbXBvcnQge1ByZXZpZXdEaXNwbGF5fSBmcm9tIFwiLi9wcmV2aWV3X2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlcn0gZnJvbSBcIi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge2dlbmVyYXRlUHJldmlld05vdGVzfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Tm90ZVNraW59IGZyb20gXCIuL25vdGVfc2tpblwiO1xyXG5cclxubGV0IHdpZHRoID0gNzIwO1xyXG5sZXQgaGVpZ2h0ID0gNDgwO1xyXG5cclxuZXhwb3J0IGNsYXNzIFA1U2NlbmUge1xyXG4gICAgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBuZXcgcDUoKHA6IHA1KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZW5kZXJlcjogcDUuUmVuZGVyZXI7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjZW50ZXJDYW52YXMoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW5kZXJlci5jZW50ZXIoKTsgLy8gRGlzYWJsZSB0aGlzIGZvciBub3cgdG8gbWFrZSBlbWJlZGRpbmcgd29ya1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwubm90ZVNraW4gPSBuZXcgTm90ZVNraW4oXHJcbiAgICAgICAgICAgICAgICAgICAgcC5sb2FkSW1hZ2UoXCIuLi9hc3NldHMvYXJyb3dfYmx1ZV92My5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcC5sb2FkSW1hZ2UoXCIuLi9hc3NldHMvY29ubmVjdG9yX3RpbGVfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy90YWlsX3Jlc2l6ZS5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcC5sb2FkSW1hZ2UoXCIuLi9hc3NldHMvYXJyb3dfcmVjZXB0b3IucG5nXCIpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQgPSBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9wbGF5X2Zyb21fZmlsZV9iYWNrZ3JvdW5kLmpwZ1wiKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5vcHRpb25zQmFja2dyb3VuZCA9IGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwLnNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIgPSBwLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIgPSBuZXcgS2V5Ym9hcmRFdmVudE1hbmFnZXIocCk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucHJldmlld0Rpc3BsYXkgPSBuZXcgUHJldmlld0Rpc3BsYXkoZ2VuZXJhdGVQcmV2aWV3Tm90ZXMoNCksIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7IC8vIE1ha2VzIHRoZSBjYW52YXMgYmUgYWJsZSB0byBmaWxsIHRoZSB3aG9sZSBicm93c2VyIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgY2VudGVyQ2FudmFzKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwLmRyYXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5kcmF3KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwLndpbmRvd1Jlc2l6ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge1BsYXlGcm9tRmlsZX0gZnJvbSBcIi4vcGFnZXMvcGxheV9mcm9tX2ZpbGVcIjtcclxuaW1wb3J0IHtPcHRpb25zfSBmcm9tIFwiLi9wYWdlcy9vcHRpb25zXCI7XHJcbmltcG9ydCB7UGxheX0gZnJvbSBcIi4vcGFnZXMvcGxheVwiO1xyXG5pbXBvcnQge1Jlc3VsdHN9IGZyb20gXCIuL3BhZ2VzL3Jlc3VsdHNcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge1BsYXlGcm9tT25saW5lfSBmcm9tIFwiLi9wYWdlcy9wbGF5X2Zyb21fb25saW5lXCI7XHJcblxyXG5leHBvcnQgZW51bSBQQUdFUyB7XHJcbiAgICBQTEFZX0ZST01fRklMRSxcclxuICAgIE9QVElPTlMsXHJcbiAgICBQTEFZLFxyXG4gICAgUkVTVUxUUyxcclxuICAgIFBMQVlfRlJPTV9PTkxJTkUsXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYWdlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjdXJyZW50UGFnZTogUEFHRVMgPSBQQUdFUy5QTEFZX0ZST01fRklMRTtcclxuICAgIHByaXZhdGUgc3RhdGljIHJldHVyblBhZ2U6IFBBR0VTO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0Q3VycmVudFBhZ2UocGFnZTogUEFHRVMpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSAhPT0gUEFHRVMuUExBWSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcclxuICAgICAgICBET01XcmFwcGVyLmNsZWFyUmVnaXN0cnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJldHVybigpIHtcclxuICAgICAgICB0aGlzLnNldEN1cnJlbnRQYWdlKHRoaXMucmV0dXJuUGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJyZW50UGFnZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVlfRlJPTV9GSUxFOlxyXG4gICAgICAgICAgICAgICAgUGxheUZyb21GaWxlLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLk9QVElPTlM6XHJcbiAgICAgICAgICAgICAgICBPcHRpb25zLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVk6XHJcbiAgICAgICAgICAgICAgICBQbGF5LmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlJFU1VMVFM6XHJcbiAgICAgICAgICAgICAgICBSZXN1bHRzLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVlfRlJPTV9PTkxJTkU6XHJcbiAgICAgICAgICAgICAgICBQbGF5RnJvbU9ubGluZS5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgcGFnZTogXCIgKyBnbG9iYWwuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4uL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtcclxuICAgIGJvb2xlYW5Ub1llc05vLFxyXG4gICAgY3JlYXRlTGFiZWxlZElucHV0LFxyXG4gICAgY3JlYXRlTGFiZWxlZFNlbGVjdCxcclxuICAgIGNyZWF0ZUxhYmVsZWRUZXh0QXJlYSxcclxuICAgIGRyYXdIZWFkaW5nLFxyXG4gICAgc2V0RWxlbWVudFRvQm90dG9tLFxyXG4gICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyxcclxuICAgIFllc05vXHJcbn0gZnJvbSBcIi4uL3VpX3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0tleUJpbmRpbmdzVWl9IGZyb20gXCIuLi9rZXlfYmluZGluZ3NfdWlcIjtcclxuaW1wb3J0IHtUaWNrZXIsIFRpY2tlclN0YXRlfSBmcm9tIFwiLi4vdGlja2VyXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3B0aW9ucyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIE9QVElPTlNfQ0xBU1M6IHN0cmluZyA9IFwib3B0aW9uc1wiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9USUNLRVJfTUVTU0FHRSA9XHJcbiAgICAgICAgXCJBbGwgdGhlIG9wdGlvbnMhIENsaWNrIGFuIG9wdGlvbiB0byBzaG93IG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgaXQuXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChnbG9iYWwub3B0aW9uc0JhY2tncm91bmQpO1xyXG4gICAgICAgIGRyYXdIZWFkaW5nKCk7XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxEaXYgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIH0sIFwic2Nyb2xsRGl2XCIpO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGl2LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuYWRkQ2xhc3MoXCJvcHRpb25zLXNjcm9sbC1kaXZcIik7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBsZXQgY2FudmFzUG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSA9IHAuX3JlbmRlcmVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQucG9zaXRpb24oY2FudmFzUG9zaXRpb24ueCArIDMzNSwgY2FudmFzUG9zaXRpb24ueSArIDQ1KTtcclxuXHJcbiAgICAgICAgbGV0IHJlc2V0Q29uZmlnQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJSZXNldCBUbyBEZWZhdWx0XCIpO1xyXG4gICAgICAgIH0sIFwicmVzZXRDb25maWdCdXR0b25cIik7XHJcbiAgICAgICAgaWYgKCFyZXNldENvbmZpZ0J1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAgICAgcmVzZXRDb25maWdCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhcInJlc2V0LWNvbmZpZ1wiKTtcclxuICAgICAgICAgICAgcmVzZXRDb25maWdCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgcmVzZXRDb25maWdCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZyA9IG5ldyBDb25maWcoe30pO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQocmVzZXRDb25maWdCdXR0b24uZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJQYXVzZSBhdCBTdGFydCAoc2VjKVwiLCBcInBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0XCIsXHJcbiAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgaWYgKCFwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgICAgICBwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRQYXVzZUF0U3RhcnQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UGF1c2VBdFN0YXJ0SW5mbygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYXVzZUF0U3RhcnRFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LmVsZW1lbnQuaW5wdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkUGF1c2VBdFN0YXJ0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhdXNlQXRTdGFydEluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcyA9IGdldE51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhdXNlQXRTdGFydEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbFNwZWVkSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJTY3JvbGwgU3BlZWQgKHB4L3NlYylcIiwgXCJzY3JvbGxTcGVlZElucHV0XCIsXHJcbiAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGl4ZWxzUGVyU2Vjb25kLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhzY3JvbGxTcGVlZElucHV0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gc2Nyb2xsU3BlZWRJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkgJiYgdmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBpeGVsc1BlclNlY29uZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbFNwZWVkSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChzY3JvbGxTcGVlZElucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgICAgICBzY3JvbGxTcGVlZElucHV0LmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gc2Nyb2xsU3BlZWRJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU2Nyb2xsU3BlZWQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2Nyb2xsU3BlZWRJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Njcm9sbFNwZWVkRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBzY3JvbGxTcGVlZElucHV0LmVsZW1lbnQuaW5wdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBzY3JvbGxTcGVlZElucHV0LmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTY3JvbGxTcGVlZCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTY3JvbGxTcGVlZEluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBpeGVsc1BlclNlY29uZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTY3JvbGxTcGVlZEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbERpcmVjdGlvblNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJTY3JvbGwgRGlyZWN0aW9uXCIsIFwic2Nyb2xsRGlyZWN0aW9uU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFNjcm9sbERpcmVjdGlvbiwgZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24sIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgLy8gc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhzY3JvbGxEaXJlY3Rpb25TZWxlY3QsICgpID0+IHtcclxuICAgICAgICAvLyAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgLy8gICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFNjcm9sbERpcmVjdGlvblt2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgU2Nyb2xsRGlyZWN0aW9uXTtcclxuICAgICAgICAvLyAgICAgaWYgKGVudW1PZlZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyAgICAgICAgIGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID0gZW51bU9mVmFsdWU7XHJcbiAgICAgICAgLy8gICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXJlY3Rpb25TZWxlY3QuZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBzY3JvbGxEaXJlY3Rpb25TZWxlY3QuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNjcm9sbERpcmVjdGlvbih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTY3JvbGxEaXJlY3Rpb25JbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Njcm9sbERpcmVjdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQuaW5wdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBzY3JvbGxEaXJlY3Rpb25TZWxlY3QuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNjcm9sbERpcmVjdGlvbih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTY3JvbGxEaXJlY3Rpb25JbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPSBnZXRFbnVtKHZhbHVlLCBTY3JvbGxEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Njcm9sbERpcmVjdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY2VwdG9yUG9zaXRpb25JbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlJlY2VwdG9yIFBvc2l0aW9uICglKVwiLCBcInJlY2VwdG9yUG9zaXRpb25JbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHJlY2VwdG9yUG9zaXRpb25JbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHJlY2VwdG9yUG9zaXRpb25JbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucmVjZXB0b3JZUGVyY2VudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXJlY2VwdG9yUG9zaXRpb25JbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHJlY2VwdG9yUG9zaXRpb25JbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJBY2N1cmFjeSBPZmZzZXQgKG1zKVwiLCBcImFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dFwiLFxyXG4gICAgICAgICAgICAoZ2xvYmFsLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzICogMTAwMCkudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyA9IHZhbHVlIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nc0lucHV0ID0gY3JlYXRlTGFiZWxlZFRleHRBcmVhKFwiQWNjdXJhY3kgU2V0dGluZ3NcIiwgXCJhY2N1cmFjeVNldHRpbmdzSW5wdXRcIixcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2xvYmFsLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLCBudWxsLCAzKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5U2V0dGluZ3NJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IGFjY3VyYWN5U2V0dGluZ3NJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdID0gcGFyc2VBY2N1cmFjeVNldHRpbmdzSnNvbih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3QWNjdXJhY3lTZXR0aW5ncyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyA9IG5ld0FjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmICghYWNjdXJhY3lTZXR0aW5nc0lucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lTZXR0aW5nc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWN5Rmxhc2hFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IEZsYXNoXCIsIFwiYWNjdXJhY3lGbGFzaEVuYWJsZWRTZWxlY3RcIixcclxuICAgICAgICAgICAgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBZZXNOb1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgWWVzTm9dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLlllcykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lGbGFzaEVuYWJsZWRTZWxlY3QuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IFBhcnRpY2xlc1wiLCBcImFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWRTZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjeVRleHRFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IFRleHRcIiwgXCJhY2N1cmFjeVRleHRFbmFibGVkU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeVRleHRFbmFibGVkU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKGFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3QuZWxlbWVudC52YWx1ZSgpKTtcclxuICAgICAgICAgICAgbGV0IGVudW1PZlZhbHVlID0gWWVzTm9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFllc05vXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5ZZXMpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVRleHRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXJlY3Rpb25TZWxlY3QuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChhY2N1cmFjeVRleHRFbmFibGVkU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkhvbGQgUGFydGljbGVzXCIsIFwiaG9sZFBhcnRpY2xlc0VuYWJsZWRTZWxlY3RcIixcclxuICAgICAgICAgICAgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBZZXNOb1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgWWVzTm9dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLlllcykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoaG9sZFBhcnRpY2xlc0VuYWJsZWRTZWxlY3QuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaG9sZEdsb3dFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkhvbGQgR2xvd1wiLCBcImhvbGRHbG93RW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhob2xkR2xvd0VuYWJsZWRTZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoaG9sZEdsb3dFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGhvbGRHbG93RW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEtleUJpbmRpbmdzVWkuZHJhdyhwLCBzY3JvbGxEaXYuZWxlbWVudCwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuXHJcbiAgICAgICAgZ2xvYmFsLnByZXZpZXdEaXNwbGF5LmRyYXcoKTtcclxuXHJcbiAgICAgICAgbGV0IHRpY2tlciA9IFRpY2tlci5jcmVhdGUodGhpcy5ERUZBVUxUX1RJQ0tFUl9NRVNTQUdFLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldEVsZW1lbnRUb0JvdHRvbSh0aWNrZXIuZWxlbWVudCwgNC4yLCAxMiwgOCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNWYWxpZFBhdXNlQXRTdGFydCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNOdW1iZXJHcmVhdGVyVGhhbk9yRXF1YWxaZXJvKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93UGF1c2VBdFN0YXJ0SW5mbygpOiB2b2lkIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIkRlbGF5IHRoZSBzdGFydCBvZiB0aGUgc29uZyB0byBnaXZlIHlvdXJzZWxmIG1vcmUgdGltZSB0byBnZXQgcmVhZHkuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkU2Nyb2xsU3BlZWQodmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzTnVtYmVyR3JlYXRlclRoYW5PckVxdWFsWmVybyh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd1BhdXNlQXRTdGFydEVycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd051bWJlck5vdEdyZWF0ZXJUaGFuT3JFcXVhbFplcm9FcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dTY3JvbGxTcGVlZEluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJUaGUgbW92ZW1lbnQgc3BlZWQgb2YgdGhlIG5vdGVzLiBIaWdoZXIgdmFsdWVzIHdpbGwgbWFrZSB0aGUgbm90ZXMgbG9vayBmYXJ0aGVyIGFwYXJ0LlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNWYWxpZFNjcm9sbERpcmVjdGlvbih2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGVudW1PZlZhbHVlOiBTY3JvbGxEaXJlY3Rpb24gPSBnZXRFbnVtKHZhbHVlLCBTY3JvbGxEaXJlY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBlbnVtT2ZWYWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dTY3JvbGxEaXJlY3Rpb25JbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiQ29udHJvbHMgd2hpY2ggd2F5IHRoZSBhcnJvd3MgZ28uXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93U2Nyb2xsRGlyZWN0aW9uRXJyb3IoKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJFcnJvcjogaHVoLi4uIG5vdCBzdXJlIGhvdyB5b3UgZGlkIHRoYXQuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLkVSUk9SKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93U2Nyb2xsU3BlZWRFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dOdW1iZXJOb3RHcmVhdGVyVGhhbk9yRXF1YWxaZXJvRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc051bWJlckdyZWF0ZXJUaGFuT3JFcXVhbFplcm8odmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgICAgIGxldCBudW1iZXJWYWx1ZTogbnVtYmVyID0gZ2V0TnVtYmVyKHZhbHVlKTtcclxuICAgICAgICBpZiAoIWlzTmFOKG51bWJlclZhbHVlKSAmJiBudW1iZXJWYWx1ZSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd051bWJlck5vdEdyZWF0ZXJUaGFuT3JFcXVhbFplcm9FcnJvcigpIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIkVycm9yOiBtdXN0IGJlIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB6ZXJvLlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5FUlJPUik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24oYWNjdXJhY3lTZXR0aW5nc0pzb246IHN0cmluZyk6IEFjY3VyYWN5W10ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IFtdXHJcbiAgICAgICAgbGV0IGpzb25BcnJheTogQWNjdXJhY3lbXSA9IEpTT04ucGFyc2UoYWNjdXJhY3lTZXR0aW5nc0pzb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGpzb25BcnJheVtpXTtcclxuICAgICAgICAgICAgLy8gdGhpcyBmYWlscyBpZiB0aGUgdXNlciBnYXZlIHRoZSB3cm9uZyBpbnB1dFxyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzLnB1c2gobmV3IEFjY3VyYWN5KGFjY3VyYWN5Lm5hbWUsIGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TnVtYmVyKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RW51bSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBFbnVtVHlwZTogYW55KTogYW55IHtcclxuICAgIGxldCBzdHJpbmc6IHN0cmluZyA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICByZXR1cm4gRW51bVR5cGVbc3RyaW5nIGFzIGtleW9mIHR5cGVvZiBFbnVtVHlwZV07XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2UuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG4gICAgICAgIGdsb2JhbC5wbGF5aW5nRGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7XHJcbiAgICBkcmF3SGVhZGluZyxcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlLFxyXG4gICAgY3JlYXRlRmlsZUlucHV0LFxyXG4gICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2LCBmaXhSYWRpb0RpdkVsZW1lbnQsIHN0eWxlUmFkaW9PcHRpb25zXHJcbn0gZnJvbSBcIi4uL3VpX3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge1N0ZXBmaWxlLCBTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGUsIEF1ZGlvRmlsZVN0YXRlfSBmcm9tIFwiLi4vYXVkaW9fZmlsZVwiO1xyXG5pbXBvcnQge2dldE1vZGVPcHRpb25zRm9yRGlzcGxheSwgaW5pdFBsYXlpbmdEaXNwbGF5LCBpc0ZpbGVzUmVhZHl9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7TW9kZX0gZnJvbSBcIi4uL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IHBsYXlGcm9tRmlsZVN0ZXBmaWxlID0gbmV3IFN0ZXBmaWxlKCk7XHJcbmNvbnN0IHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF5RnJvbUZpbGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZX0ZST01fRklMRV9DTEFTUzogc3RyaW5nID0gXCJwbGF5LWZyb20tZmlsZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBNT0RFX1JBRElPX0lEOiBzdHJpbmcgPSBcIm1vZGVSYWRpb1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCk7XHJcblxyXG4gICAgICAgIGxldCBzdGVwZmlsZUlucHV0ID0gY3JlYXRlRmlsZUlucHV0KGdldFN0ZXBmaWxlSW5wdXRMYWJlbCgpLCBcIkNob29zZSBTdGVwZmlsZSAoLnNtKVwiLCBcInN0ZXBmaWxlSW5wdXRcIixcclxuICAgICAgICAgICAgbG9hZFN0ZXBmaWxlQW5kVXBkYXRlTW9kZU9wdGlvbnMsIFBsYXlGcm9tRmlsZS5QTEFZX0ZST01fRklMRV9DTEFTUykuZWxlbWVudDtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShzdGVwZmlsZUlucHV0LCAwLjQzLCAwLjMsIDI2OCwgMzQpO1xyXG5cclxuICAgICAgICBsZXQgYXVkaW9GaWxlSW5wdXQgPSBjcmVhdGVGaWxlSW5wdXQoZ2V0QXVkaW9GaWxlSW5wdXRMYWJlbCgpLCBcIkNob29zZSBBdWRpbyBGaWxlICgubXAzLCAub2dnKVwiLCBcImF1ZGlvRmlsZUlucHV0XCIsXHJcbiAgICAgICAgICAgIHBsYXlGcm9tRmlsZUF1ZGlvRmlsZS5sb2FkRmlsZS5iaW5kKHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSksIFBsYXlGcm9tRmlsZS5QTEFZX0ZST01fRklMRV9DTEFTUykuZWxlbWVudDtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShhdWRpb0ZpbGVJbnB1dCwgMC40MywgMC40NSwgMzI1LCAzNCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5QnV0dG9uSWQgPSBcInBsYXlCdXR0b25cIjtcclxuICAgICAgICBpZiAoaXNGaWxlc1JlYWR5KHBsYXlGcm9tRmlsZVN0ZXBmaWxlLCBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUpKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlUmFkaW8gPSBkcmF3TW9kZVNlbGVjdChwLCBQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RlUmFkaW8udmFsdWUoKSAhPT0gXCJcIikgeyAvLyBpZiB1c2VyIGhhcyBzZWxlY3RlZCBhIG1vZGVcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlBsYXlcIik7XHJcbiAgICAgICAgICAgICAgICB9LCBwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuODgsIDYwLCAzNCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RlOiBNb2RlID0gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZpbmlzaFBhcnNpbmcoc2VsZWN0ZWRNb2RlLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFBsYXlpbmdEaXNwbGF5KHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZ1bGxQYXJzZS50cmFja3MsIHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheUJ1dHRvbklkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRTdGVwZmlsZUFuZFVwZGF0ZU1vZGVPcHRpb25zKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgIHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmxvYWRGaWxlLmNhbGwocGxheUZyb21GaWxlU3RlcGZpbGUsIGZpbGUpO1xyXG4gICAgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMgPSB1bmRlZmluZWQ7XHJcbiAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFBsYXlGcm9tRmlsZS5NT0RFX1JBRElPX0lEKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd01vZGVTZWxlY3QocDogcDUsIHVuaXF1ZUlkOiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgaWYgKGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucyA9IGdldE1vZGVPcHRpb25zRm9yRGlzcGxheShwbGF5RnJvbUZpbGVTdGVwZmlsZS5wYXJ0aWFsUGFyc2UubW9kZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtb2RlUmFkaW9DbGFzcyA9IFwibW9kZS1yYWRpb1wiXHJcbiAgICBsZXQgbW9kZVJhZGlvT3B0aW9uQ2xhc3MgPSBcIm1vZGUtcmFkaW8tb3B0aW9uXCI7XHJcbiAgICBsZXQgbW9kZVJhZGlvQ3JlYXRlUmVzdWx0ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVJhZGlvKCk7XHJcbiAgICB9LCB1bmlxdWVJZCk7XHJcbiAgICBsZXQgbW9kZVJhZGlvID0gbW9kZVJhZGlvQ3JlYXRlUmVzdWx0LmVsZW1lbnQ7XHJcbiAgICBpZiAoIW1vZGVSYWRpb0NyZWF0ZVJlc3VsdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgbW9kZVJhZGlvLmlkKFwicmFkaW8tZGl2XCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vZGUgPSBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9uc1tpXTtcclxuICAgICAgICAgICAgbGV0IHJhZGlvTGFiZWwgPSBtb2RlLnR5cGUgKyBcIiwgXCIgKyBtb2RlLmRpZmZpY3VsdHkgKyBcIiwgXCIgKyBtb2RlLm1ldGVyO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCByYWRpb09wdGlvbiA9IG1vZGVSYWRpby5vcHRpb24ocmFkaW9MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSB0aGlzIHdheSBiZWNhdXNlIHRoZSB0d28tYXJndW1lbnQgLm9wdGlvbiBtZXRob2Qgd2Fzbid0IHdvcmtpbmdcclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBhY2Nlc3MgdGhlIHNlbGVjdGVkIG1vZGVcclxuICAgICAgICAgICAgcmFkaW9PcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBzdHlsZSBpcyBiZWluZyBzZXQgb24gdGhlIGRpdiBjb250YWluaW5nIHRoZSByYWRpbyBlbGVtZW50cyB0byBtYWtlIGl0IGEgc2Nyb2xsYWJsZSBib3hcclxuICAgICAgICBtb2RlUmFkaW8uYWRkQ2xhc3MobW9kZVJhZGlvQ2xhc3MpO1xyXG4gICAgICAgIG1vZGVSYWRpby5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocCwgbW9kZVJhZGlvKTtcclxuICAgICAgICBmaXhSYWRpb0RpdkVsZW1lbnQobW9kZVJhZGlvKTtcclxuICAgICAgICBzdHlsZVJhZGlvT3B0aW9ucyhwLCBtb2RlUmFkaW8sIFttb2RlUmFkaW9PcHRpb25DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShtb2RlUmFkaW8sIDAuNSwgMC43LCAzMDIsIDEyMCk7XHJcbiAgICBwLnBvcCgpO1xyXG4gICAgcmV0dXJuIG1vZGVSYWRpbztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbzogcDUuRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zW21vZGVSYWRpby52YWx1ZSgpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RlcGZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLk5PX1NURVBGSUxFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJObyBmaWxlIGNob3NlblwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFN0ZXBmaWxlU3RhdGUuRE9ORV9SRUFESU5HOlxyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEOlxyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBdWRpb0ZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKHBsYXlGcm9tRmlsZUF1ZGlvRmlsZS5zdGF0ZSkge1xyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTpcclxuICAgICAgICAgICAgcmV0dXJuIFwiTm8gZmlsZSBjaG9zZW5cIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5ET05FX1JFQURJTkc6XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcocGxheUZyb21GaWxlQXVkaW9GaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKGZ1bGxGaWxlTmFtZTogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlcikge1xyXG4gICAgaWYgKGZ1bGxGaWxlTmFtZS5sZW5ndGggPD0gbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bGxGaWxlTmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdWxsRmlsZU5hbWUuc3Vic3RyKDAsIG1heExlbmd0aCAtIDExKSArXHJcbiAgICAgICAgXCIuLi5cIiArXHJcbiAgICAgICAgZnVsbEZpbGVOYW1lLnN1YnN0cihmdWxsRmlsZU5hbWUubGVuZ3RoIC0gMTApO1xyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtcclxuICAgIGNyZWF0ZUxhYmVsZWRJbnB1dCxcclxuICAgIGRyYXdIZWFkaW5nLFxyXG4gICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2LFxyXG4gICAgZml4UmFkaW9EaXZFbGVtZW50LFxyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUsXHJcbiAgICBzdHlsZVJhZGlvT3B0aW9uc1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7T25saW5lUGxheWxpc3QsIE9ubGluZVBsYXlsaXN0U3RhdGV9IGZyb20gXCIuLi9vbmxpbmVfcGxheWxpc3RcIjtcclxuaW1wb3J0IHtpbml0UGxheWluZ0Rpc3BsYXksIGlzRmlsZXNSZWFkeX0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4uL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi4vYXVkaW9fZmlsZVwiO1xyXG5cclxuY29uc3QgcGxheUZyb21PbmxpbmVTdGVwZmlsZSA9IG5ldyBTdGVwZmlsZSgpO1xyXG5jb25zdCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuXHJcbi8vIFRoaXMgcHJldmVudHMgbG9hZGluZyBwcmV2aW91cyBzb25nIHVwb24gcmV0dXJuaW5nIHRvIGEgbG9hZGVkIHBsYXlsaXN0XHJcbmxldCBpc1N3ZkxvYWRTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheUZyb21PbmxpbmUge1xyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZX0ZST01fT05MSU5FX0NMQVNTOiBzdHJpbmcgPSBcInBsYXktZnJvbS1vbmxpbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZHJhd0hlYWRpbmcoKTtcclxuICAgICAgICBsZXQgb25saW5lUGxheWxpc3Q6IE9ubGluZVBsYXlsaXN0ID0gPE9ubGluZVBsYXlsaXN0PiBnbG9iYWwub25saW5lUGxheWxpc3Q7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHVybElucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiRW5naW5lIFVSTFwiLCBcInVybElucHV0XCIsIG9ubGluZVBsYXlsaXN0LmluZGV4VXJsLFxyXG4gICAgICAgICAgICBQbGF5RnJvbU9ubGluZS5QTEFZX0ZST01fT05MSU5FX0NMQVNTKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IHVybElucHV0RGl2ID0gbmV3IHA1LkVsZW1lbnQodXJsSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUodXJsSW5wdXREaXYsIDAuNTAsIDAuMjEsIDYwMCwgMzgpO1xyXG5cclxuICAgICAgICBsZXQgbG9hZEJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiTG9hZFwiKTtcclxuICAgICAgICB9LCBcImxvYWRCdXR0b25cIik7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUobG9hZEJ1dHRvbi5lbGVtZW50LCAwLjg1LCAwLjIxNSwgNjIsIDMzKTtcclxuICAgICAgICBpZiAoIWxvYWRCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKFBsYXlGcm9tT25saW5lLlBMQVlfRlJPTV9PTkxJTkVfQ0xBU1MpO1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gdXJsSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRCdXR0b24uZWxlbWVudC5hdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ubGluZVBsYXlsaXN0LmtpY2tPZmZMb2FkUGxheWxpc3QodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9ubGluZVBsYXlsaXN0LnN0YXRlICE9PSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfUExBWUxJU1QpIHtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvbmxpbmVQbGF5bGlzdC5zdGF0ZSA9PT0gT25saW5lUGxheWxpc3RTdGF0ZS5QTEFZTElTVF9SRUFEWSB8fFxyXG4gICAgICAgICAgICBvbmxpbmVQbGF5bGlzdC5zdGF0ZSA9PT0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkcpIHtcclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0TWVudUlkID0gXCJwbGF5bGlzdE1lbnVcIlxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RNZW51ID0gZHJhd1JhZGlvTWVudShwLCBwbGF5bGlzdE1lbnVJZCwgb25saW5lUGxheWxpc3QuZGlzcGxheWVkUGxheWxpc3QpO1xyXG4gICAgICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5bGlzdE1lbnUsIDAuNSwgMC42MiwgNTAwLCAyMDApO1xyXG5cclxuICAgICAgICAgICAgZHJhd1BhZ2VDb250cm9scyhwLCBwbGF5bGlzdE1lbnVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWxpc3RNZW51LnZhbHVlKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsb2FkQW5kUGxheUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJMb2FkIEFuZCBQbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgXCJsb2FkQW5kUGxheUJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQsIDAuNSwgMC44OCwgMTE4LCAzNCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFsb2FkQW5kUGxheUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwbGF5bGlzdE1lbnUudmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkQW5kUGxheUJ1dHRvbi5lbGVtZW50LmF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmxpbmVQbGF5bGlzdC5raWNrT2ZmTG9hZFNvbmcodmFsdWUsIHBsYXlGcm9tT25saW5lU3RlcGZpbGUsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU3dmTG9hZFN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob25saW5lUGxheWxpc3Quc3RhdGUgIT09IE9ubGluZVBsYXlsaXN0U3RhdGUuTE9BRElOR19TT05HKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRmlsZXNSZWFkeShwbGF5RnJvbU9ubGluZVN0ZXBmaWxlLCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSkgJiYgaXNTd2ZMb2FkU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRQbGF5aW5nRGlzcGxheShwbGF5RnJvbU9ubGluZVN0ZXBmaWxlLmZ1bGxQYXJzZS50cmFja3MsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5QTEFZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFwibG9hZEFuZFBsYXlCdXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBpc1N3ZkxvYWRTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChcInBsYXlsaXN0TWVudVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBNZW51SXRlbSB7XHJcbiAgICB0b1N0cmluZzogKCkgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UmFkaW9NZW51KHA6IHA1LCB1bmlxdWVJZDogc3RyaW5nLCBpdGVtczogTWVudUl0ZW1bXSk6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IG1lbnVDbGFzcyA9IFwicGxheWxpc3QtcmFkaW9cIlxyXG4gICAgbGV0IG1lbnVJdGVtQ2xhc3MgPSBcInBsYXlsaXN0LXJhZGlvLW9wdGlvblwiO1xyXG4gICAgbGV0IHJhZGlvTWVudUNyZWF0ZVJlc3VsdCA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVSYWRpbygpO1xyXG4gICAgfSwgdW5pcXVlSWQpO1xyXG4gICAgbGV0IHJhZGlvTWVudSA9IHJhZGlvTWVudUNyZWF0ZVJlc3VsdC5lbGVtZW50O1xyXG4gICAgaWYgKCFyYWRpb01lbnVDcmVhdGVSZXN1bHQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHJhZGlvTWVudS5pZChcInJhZGlvLWRpdlwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGxldCByYWRpb0xhYmVsID0gaXRlbS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCByYWRpb09wdGlvbiA9IHJhZGlvTWVudS5vcHRpb24ocmFkaW9MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSB0aGlzIHdheSBiZWNhdXNlIHRoZSB0d28tYXJndW1lbnQgLm9wdGlvbiBtZXRob2Qgd2Fzbid0IHdvcmtpbmdcclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBhY2Nlc3MgdGhlIHNlbGVjdGVkIG1vZGVcclxuICAgICAgICAgICAgcmFkaW9PcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBzdHlsZSBpcyBiZWluZyBzZXQgb24gdGhlIGRpdiBjb250YWluaW5nIHRoZSByYWRpbyBlbGVtZW50cyB0byBtYWtlIGl0IGEgc2Nyb2xsYWJsZSBib3hcclxuICAgICAgICByYWRpb01lbnUuYWRkQ2xhc3MobWVudUNsYXNzKTtcclxuICAgICAgICByYWRpb01lbnUuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2KHAsIHJhZGlvTWVudSk7XHJcbiAgICAgICAgZml4UmFkaW9EaXZFbGVtZW50KHJhZGlvTWVudSk7XHJcbiAgICAgICAgc3R5bGVSYWRpb09wdGlvbnMocCwgcmFkaW9NZW51LCBbbWVudUl0ZW1DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmFkaW9NZW51O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UGFnZUNvbnRyb2xzKHA6IHA1LCBwbGF5bGlzdE1lbnVJZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgcGFnZUNvbnRyb2xzRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZURpdigpO1xyXG4gICAgfSwgXCJwYWdlQ29udHJvbHNEaXZcIik7XHJcbiAgICBpZiAoIXBhZ2VDb250cm9sc0Rpdi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2xzXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmFkZENsYXNzKFBsYXlGcm9tT25saW5lLlBMQVlfRlJPTV9PTkxJTkVfQ0xBU1MpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQsIDAuNSwgMC4zODMsIDE0MCwgMzApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYWdlTnVtYmVyVGV4dCA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgdGV4dENvbnRhaW5lciA9IHAuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgdGV4dENvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHJldHVybiB0ZXh0Q29udGFpbmVyO1xyXG4gICAgfSwgXCJwYWdlTnVtYmVyVGV4dFwiKTtcclxuXHJcbiAgICBsZXQgcHJldmlvdXNQYWdlQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIiYjODI0OTtcIik7XHJcbiAgICB9LCBcInByZXZpb3VzUGFnZUJ1dHRvblwiKTtcclxuICAgIGlmICghcHJldmlvdXNQYWdlQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwcmV2aW91c1BhZ2VCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBnbG9iYWwub25saW5lUGxheWxpc3QucHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheWxpc3RNZW51SWQpO1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyVGV4dC5lbGVtZW50Lmh0bWwoXCJQYWdlIFwiICsgKGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5nZXRQYWdlKCkgKyAxKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJldmlvdXNQYWdlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2wtYnV0dG9uXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKHByZXZpb3VzUGFnZUJ1dHRvbi5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZighcGFnZU51bWJlclRleHQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQuaHRtbChcIlBhZ2UgXCIgKyAoZ2xvYmFsLm9ubGluZVBsYXlsaXN0LmdldFBhZ2UoKSArIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV4dFBhZ2VCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiJiM4MjUwO1wiKTtcclxuICAgIH0sIFwibmV4dFBhZ2VCdXR0b25cIik7XHJcbiAgICBpZiAoIW5leHRQYWdlQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBuZXh0UGFnZUJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHBsYXlsaXN0TWVudUlkKTtcclxuICAgICAgICAgICAgcGFnZU51bWJlclRleHQuZWxlbWVudC5odG1sKFwiUGFnZSBcIiArIChnbG9iYWwub25saW5lUGxheWxpc3QuZ2V0UGFnZSgpICsgMSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5leHRQYWdlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2wtYnV0dG9uXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKG5leHRQYWdlQnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge3NldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlfSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXN1bHRzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoXCJibGFja1wiKTtcclxuXHJcbiAgICAgICAgZ2xvYmFsLnJlc3VsdHNEaXNwbGF5LmRyYXcoKTtcclxuXHJcbiAgICAgICAgbGV0IHJldHVybkJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUmV0dXJuXCIpO1xyXG4gICAgICAgIH0sIFwicmV0dXJuQnV0dG9uXCIpO1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHJldHVybkJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuOSwgNzMsIDM0KTtcclxuICAgICAgICBpZiAoIXJldHVybkJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHJldHVybkJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybkJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5yZXR1cm4oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuY29uc3QgUkVDT1JESEVBREVSX0xFTkdUSF9GVUxMID0gMHgzZlxyXG4gICAgLy8gbnVsbC1jaGFyYWN0ZXJcclxuICAgICwgRU9TID0gMHgwMFxyXG4gICAgLCBzdHlsZUNvdW50RXh0ID0gMHhGRjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCeXRlUmVhZGVyIHtcclxuICAgIHB1YmxpYyBidWZmZXJfcmF3OiBBcnJheUJ1ZmZlckxpa2U7XHJcbiAgICBwdWJsaWMgYnVmZmVyOiBEYXRhVmlldztcclxuICAgIHB1YmxpYyBwb2ludGVyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcG9zaXRpb246IG51bWJlcjtcclxuICAgIHB1YmxpYyBjdXJyZW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlcl9yYXcgPSBidWZmZXI7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSAxO1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBidWZmZXIuYnl0ZUxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHVuc2lnbmVkIDE2IG9yIDMyIExpdHRsZSBFbmRpYW4gQml0c1xyXG4gICAgICogYW5kIGFkdmFuY2UgcG9pbnRlciB0byBuZXh0IGJpdHMgLyA4IGJ5dGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJpdHNcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFVJbnRMRShiaXRzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gMDtcclxuICAgICAgICBzd2l0Y2ggKGJpdHMpIHtcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogdGhlIHNlY29uZCBwYXJhbWV0ZXIgbWlnaHQgb25seSBleGlzdCBpbiBFUzYsIGxldCdzIHNlZSBpZiB0aGlzIGNhdXNlcyBhbiBlcnJvclxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRVaW50OCh0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTY6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldFVpbnQxNih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzI6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldFVpbnQzMih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVuZXhwZWN0ZWQgbnVtYmVyIG9mIGJpdHM6ICdcIiArIGJpdHMgKyBcIidcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb2ludGVyICs9IGJpdHMgLyA4O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHVuc2lnbmVkIDggYml0IGZyb20gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRVSW50OCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXIuZ2V0VWludDgodGhpcy5wb2ludGVyKyspO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGZsb2F0IGZyb20gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRGbG9hdCgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0RmxvYXQzMih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXIgKz0gNDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBkb3VibGUgZnJvbSB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZERvdWJsZSgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0RmxvYXQ2NCh0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXIgKz0gODtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyAzMi1iaXQgdW5zaWduZWQgaW50ZWdlcnMgdmFsdWUgZW5jb2RlZCAoMS01IGJ5dGVzKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gMzItYml0IHVuc2lnbmVkIGludGVnZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkRW5jb2RlZFUzMigpIHtcclxuICAgICAgICBsZXQgaSA9IDVcclxuICAgICAgICAgICAgLCByZXN1bHQgPSAwXHJcbiAgICAgICAgICAgICwgbmI7XHJcblxyXG4gICAgICAgIGRvXHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAobmIgPSB0aGlzLm5leHRCeXRlKCkpO1xyXG4gICAgICAgIHdoaWxlICgobmIgJiAxMjgpICYmIC0taSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYW4gZW5jb2RlZCBkYXRhIGZyb20gYnVmZmVyIGFuZCByZXR1cm5zIGFcclxuICAgICAqIHN0cmluZyB1c2luZyB0aGUgc3BlY2lmaWVkIGNoYXJhY3RlciBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gRGVjb2RlZCBzdHJpbmdcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkU3RyaW5nKCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCByZWFkID0gdGhpcy5yZWFkVUludDgoKTtcclxuICAgICAgICAgICAgaWYgKHJlYWQgPT09IEVPUylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyZWFkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhbiBlbmNvZGVkIGRhdGEgZnJvbSBidWZmZXIgYW5kIHJldHVybnMgYVxyXG4gICAgICogc3RyaW5nIHVzaW5nIHRoZSBzcGVjaWZpZWQgY2hhcmFjdGVyIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBEZWNvZGVkIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFN0cmluZ0ZpeGVkKHJlYWRMZW5ndGg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHdoaWxlIChyZWFkTGVuZ3RoLS0gPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCByZWFkID0gdGhpcy5yZWFkVUludDgoKTtcclxuICAgICAgICAgICAgaWYgKHJlYWQgPT09IEVPUylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyZWFkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBSRUNPUkRIRUFERVIgZnJvbSBuZXh0IHRhZyBpbiB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUYWcgY29kZSBhbmQgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkVGFnQ29kZUFuZExlbmd0aCgpOiBUYWdIZWFkZXIge1xyXG4gICAgICAgIGxldCBwID0gdGhpcy5wb2ludGVyO1xyXG4gICAgICAgIGxldCBuID0gdGhpcy5yZWFkVUludExFKDE2KVxyXG4gICAgICAgICAgICAsIHRhZ1R5cGUgPSBuID4+IDZcclxuICAgICAgICAgICAgLCB0YWdMZW5ndGggPSBuICYgUkVDT1JESEVBREVSX0xFTkdUSF9GVUxMO1xyXG5cclxuICAgICAgICBpZiAobiA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0YWdMZW5ndGggPT09IFJFQ09SREhFQURFUl9MRU5HVEhfRlVMTClcclxuICAgICAgICAgICAgdGFnTGVuZ3RoID0gdGhpcy5yZWFkVUludExFKDMyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtzdGFydDogcCwgZW5kOiB0aGlzLnBvaW50ZXIgKyB0YWdMZW5ndGgsIGNvZGU6IHRhZ1R5cGUsIGxlbmd0aDogdGFnTGVuZ3RoLCBwb3NpdGlvbjogdGhpcy5wb2ludGVyfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBSRUNPUkRIRUFERVIgZnJvbSBuZXh0IHRhZyBpbiB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUYWcgY29kZSBhbmQgbGVuZ3RoXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZEFjdGlvbigpIHtcclxuICAgICAgICBsZXQgcyA9IHRoaXMucG9pbnRlcjtcclxuICAgICAgICBsZXQgYSA9IHRoaXMucmVhZFVJbnQ4KCk7XHJcbiAgICAgICAgbGV0IGwgPSAoYSAmIDB4ODApID8gdGhpcy5yZWFkVUludExFKDE2KSA6IDA7XHJcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBvaW50ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiB7c3RhcnQ6IHMsIGFjdGlvbjogYSwgbGVuZ3RoOiBsLCBwb3NpdGlvbjogcH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgUkVDVCBmb3JtYXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fSB4LCB5LCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBSRUNUXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkUmVjdCgpOiBSZWN0IHtcclxuICAgICAgICB0aGlzLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGxldCBOQml0cyA9IHRoaXMucmVhZEJpdHMoNSlcclxuICAgICAgICAgICAgLCBYbWluID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMFxyXG4gICAgICAgICAgICAsIFhtYXggPSB0aGlzLnJlYWRCaXRzKE5CaXRzLCB0cnVlKSAvIDIwXHJcbiAgICAgICAgICAgICwgWW1pbiA9IHRoaXMucmVhZEJpdHMoTkJpdHMsIHRydWUpIC8gMjBcclxuICAgICAgICAgICAgLCBZbWF4ID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogWG1pbixcclxuICAgICAgICAgICAgeTogWW1pbixcclxuICAgICAgICAgICAgd2lkdGg6IChYbWF4ID4gWG1pbiA/IFhtYXggLSBYbWluIDogWG1pbiAtIFhtYXgpLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IChZbWF4ID4gWW1pbiA/IFltYXggLSBZbWluIDogWW1pbiAtIFltYXgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGludGVybmFsIHBvaW50ZXIgdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbjtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcG9zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWVrKHBvczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gcG9zICUgdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgcG9zaXRpb24gYW5kIHNldHMgY3VycmVudCB0byBuZXh0IEJ5dGUgaW4gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5leHRCeXRlKCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBuZXh0IEJ5dGUgaW4gdGhlIGJ1ZmZlciBhbmQgSW5jcmVtZW50IGludGVybmFsIHBvaW50ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IE5leHQgYnl0ZSBpbiBidWZmZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyBuZXh0Qnl0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludGVyID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCA/IG51bGwgOiB0aGlzLmJ1ZmZlci5nZXRVaW50OCh0aGlzLnBvaW50ZXIrKyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYiBiaXRzIGZyb20gY3VycmVudCBieXRlIGluIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEJpdHMgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZEJpdHMoYjogbnVtYmVyLCBzaWduZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBuID0gMFxyXG4gICAgICAgICAgICAsIHIgPSAwXHJcbiAgICAgICAgICAgICwgc2lnbiA9IHNpZ25lZCAmJiArK24gJiYgKCh0aGlzLmN1cnJlbnQgPj4gKDggLSB0aGlzLnBvc2l0aW9uKyspKSAmIDEpID8gLTEgOiAxO1xyXG5cclxuICAgICAgICB3aGlsZSAobisrIDwgYikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA+IDgpIHRoaXMuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIHIgPSAociA8PCAxKSArICgodGhpcy5jdXJyZW50ID4+ICg4IC0gdGhpcy5wb3NpdGlvbisrKSkgJiAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpZ24gKiByO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgYnl0ZXMgaW4gdGhlIEFycmF5QnVmZmVyIHdpdGggdGhlIHByb3ZpZGVkIGJ5dGVzLlxyXG4gICAgICogVGhpcyBzbGljZXMgdGhlIGZyb20gYDAgLT4gcG9pbnRlcmAgYW5kIGBwb3NpdGlvbl9lbmQgLT4gYnVmZmVybGVuZ3RoYFxyXG4gICAgICogYW5kIGluc2VydHMgdGhlIGdpdmVuIGJ5dGVzIGJldHdlZW4gdGhlbS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEJpdHMgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVwbGFjZUJ5dGVzKG5ld19ieXRlczogYW55LCBwb3N0aW9uX2VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcjEgPSB0aGlzLmJ1ZmZlcl9yYXcuc2xpY2UoMCwgdGhpcy5wb2ludGVyKTtcclxuICAgICAgICBsZXQgYnVmZmVyMiA9IG5ld19ieXRlcztcclxuICAgICAgICBsZXQgYnVmZmVyMyA9IHRoaXMuYnVmZmVyX3Jhdy5zbGljZShwb3N0aW9uX2VuZCk7XHJcblxyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgVWludDhBcnJheShidWZmZXIxLmJ5dGVMZW5ndGggKyBidWZmZXIyLmJ5dGVMZW5ndGggKyBidWZmZXIzLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyMSksIDApO1xyXG4gICAgICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyMiksIGJ1ZmZlcjEuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmZXIzKSwgYnVmZmVyMS5ieXRlTGVuZ3RoICsgYnVmZmVyMi5ieXRlTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWZmZXJfcmF3ID0gdG1wLmJ1ZmZlcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcl9yYXcpO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gMDtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlY3Qge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhZyB7XHJcbiAgICBwb29sPzogc3RyaW5nW107XHJcbiAgICB2YXJpYWJsZXM/OiBhbnk7XHJcbiAgICBoZWFkZXI/OiBUYWdIZWFkZXI7XHJcbiAgICBkb0luY2x1ZGU/OiBib29sZWFuO1xyXG4gICAgZGF0YT86IEFycmF5QnVmZmVyTGlrZVxyXG4gICAgYXVkaW9fYnl0ZXM/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnSGVhZGVyIHtcclxuICAgIHN0YXJ0OiBudW1iZXI7XHJcbiAgICBlbmQ6IG51bWJlcjtcclxuICAgIGNvZGU6IG51bWJlcjtcclxuICAgIGxlbmd0aDogbnVtYmVyO1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxufSIsImV4cG9ydCBjbGFzcyBQYXJ0aWFsUGFyc2Uge1xyXG4gICAgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbiAgICBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlVHlwZSB7XHJcbiAgICBOT05FID0gXCIwXCIsXHJcbiAgICBOT1JNQUwgPSBcIjFcIixcclxuICAgIEhPTERfSEVBRCA9IFwiMlwiLFxyXG4gICAgVEFJTCA9IFwiM1wiLFxyXG4gICAgUk9MTF9IRUFEID0gXCI0XCIsXHJcbiAgICBNSU5FID0gXCJNXCIsXHJcbiAgICBVTktOT1dOID0gXCI/Pz9cIixcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvTm90ZVR5cGUoc3RyaW5nOiBzdHJpbmcpOiBOb3RlVHlwZSB7XHJcbiAgICBzd2l0Y2ggKHN0cmluZykge1xyXG4gICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT05FO1xyXG4gICAgICAgIGNhc2UgXCIxXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT1JNQUw7XHJcbiAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLkhPTERfSEVBRDtcclxuICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuVEFJTDtcclxuICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuUk9MTF9IRUFEO1xyXG4gICAgICAgIGNhc2UgXCJNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5NSU5FO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5VTktOT1dOO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlU3RhdGUge1xyXG4gICAgREVGQVVMVCxcclxuICAgIEhJVCxcclxuICAgIE1JU1NFRCxcclxuICAgIEhFTEQsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZSB7XHJcbiAgICB0eXBlOiBOb3RlVHlwZTtcclxuICAgIHR5cGVTdHJpbmc6IHN0cmluZzsgLy8gdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZSBCRUZPUkUgaXQncyBpbnRlcnByZXRlZCBhcyBhIE5vdGVUeXBlXHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBzdGF0ZT86IE5vdGVTdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGUge1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBkaWZmaWN1bHR5OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbWV0ZXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRnVsbFBhcnNlIHtcclxuICAgIG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXTtcclxuICAgIG9mZnNldDogbnVtYmVyO1xyXG4gICAgYnBtczogW251bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgc3RvcHM6IFtudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UpIHtcclxuICAgICAgICB0aGlzLm1ldGFEYXRhID0gcGFydGlhbFBhcnNlLm1ldGFEYXRhO1xyXG4gICAgICAgIHRoaXMubW9kZXMgPSBwYXJ0aWFsUGFyc2UubW9kZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIFN0ZXAgT25lIE9mIFBhcnNpbmcgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpYWxQYXJzZShmaWxlQ29udGVudHM6IHN0cmluZykge1xyXG4gICAgbGV0IHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlID0gbmV3IFBhcnRpYWxQYXJzZSgpO1xyXG4gICAgcGFydGlhbFBhcnNlLm1ldGFEYXRhID0gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZUNvbnRlbnRzKTtcclxuICAgIHBhcnRpYWxQYXJzZS5tb2RlcyA9IGdldE1vZGVzSW5mb0FzU3RyaW5ncyhmaWxlQ29udGVudHMpO1xyXG4gICAgcmV0dXJuIHBhcnRpYWxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZTogc3RyaW5nKSB7XHJcbiAgICAvLyBtYXRjaCBhbnkgbWV0YWRhdGEgdGFnIGV4Y2x1ZGluZyB0aGUgXCJOT1RFU1wiIHRhZyAoY2FzZS1pbnNlbnNpdGl2ZSlcclxuICAgIGxldCByZSA9IC8jKD8hW25OXVtvT11bdFRdW2VFXVtzU10pKFteOl0rKTooW147XSspOy9nO1xyXG4gICAgbGV0IG1hdGNoZXMgPSBbLi4uZmlsZS5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWF0Y2hlc1tpXTtcclxuICAgICAgICBtZXRhRGF0YS5zZXQoY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsxXSkudG9VcHBlckNhc2UoKSwgY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsyXSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ldGFEYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNb2Rlc0luZm9Bc1N0cmluZ3MoZmlsZUNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIC8vIEdldCBcIk5PVEVTXCIgc2VjdGlvbnMgKGNhc2UtaW5zZW5zaXRpdmUpLiBUaGUgZmlyc3QgZml2ZSB2YWx1ZXMgYXJlIHBvc3RmaXhlZCB3aXRoIGEgY29sb24uXHJcbiAgICAvLyBOb3RlIGRhdGEgY29tZXMgbGFzdCwgcG9zdGZpeGVkIGJ5IGEgc2VtaWNvbG9uLlxyXG4gICAgbGV0IHJlID0gLyNbbk5dW29PXVt0VF1bZUVdW3NTXTooW146XSopOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjpdKik6KFteO10rOykvZztcclxuICAgIGxldCBtYXRjaGVzID0gWy4uLmZpbGVDb250ZW50cy5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W10gPSBbXTtcclxuICAgIGxldCBmaWVsZE5hbWVzID0gW1widHlwZVwiLCBcImRlc2MvYXV0aG9yXCIsIFwiZGlmZmljdWx0eVwiLCBcIm1ldGVyXCIsIFwicmFkYXJcIl07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaGVzW2ldO1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgbWF0Y2gubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgIG1vZGUuc2V0KGZpZWxkTmFtZXNbaiAtIDFdLCBjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoW2pdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGUuc2V0KFwibm90ZXNcIiwgbWF0Y2hbbWF0Y2gubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIG1vZGVzLnB1c2gobW9kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW9kZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFuTWV0YURhdGFTdHJpbmcoc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0cmluZy50cmltKCkucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG59XHJcblxyXG4vKiBTdGVwIFR3byBPZiBQYXJzaW5nICovXHJcblxyXG4vLyBUT0RPOiBhY3R1YWxseSByZXR1cm4gRnVsbFBhcnNlXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGdWxsUGFyc2UobW9kZUluZGV4OiBudW1iZXIsIHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlKTogRnVsbFBhcnNlIHtcclxuICAgIGxldCBmdWxsUGFyc2UgPSBuZXcgRnVsbFBhcnNlKHBhcnRpYWxQYXJzZSk7XHJcbiAgICBsZXQgdW5wYXJzZWROb3Rlczogc3RyaW5nID0gcGFydGlhbFBhcnNlLm1vZGVzW21vZGVJbmRleF0uZ2V0KFwibm90ZXNcIik7XHJcbiAgICBsZXQgdW5wYXJzZWRBcnJheTogc3RyaW5nW10gPSB1bnBhcnNlZE5vdGVzLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgbGV0IG1lYXN1cmVzOiBzdHJpbmdbXVtdID0gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheSk7XHJcbiAgICBsZXQgYmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXMpO1xyXG4gICAgbGV0IGNsZWFuZWRCZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSByZW1vdmVCbGFua0xpbmVzKGJlYXRzQW5kTGluZXMpO1xyXG4gICAgbGV0IG9mZnNldDogbnVtYmVyID0gcGFyc2VGbG9hdChwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiT0ZGU0VUXCIpKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gcGFyc2VCUE1TKHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJCUE1TXCIpKTtcclxuICAgIGxldCBzdG9wczogeyBzdG9wRHVyYXRpb246IG51bWJlcjsgYmVhdDogbnVtYmVyIH1bXSA9IHBhcnNlU3RvcHMocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIlNUT1BTXCIpKTtcclxuICAgIGxldCB0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0VGltZUluZm9CeUxpbmUoY2xlYW5lZEJlYXRzQW5kTGluZXMsIG9mZnNldCwgYnBtcywgc3RvcHMpO1xyXG4gICAgZnVsbFBhcnNlLnRyYWNrcyA9IGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXMpO1xyXG4gICAgcmV0dXJuIGZ1bGxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheTogc3RyaW5nW10pIHtcclxuICAgIGxldCBtZWFzdXJlczogc3RyaW5nW11bXSA9IFtdO1xyXG4gICAgbGV0IHN0YXRlID0gMDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBjdXJyZW50TWVhc3VyZTogc3RyaW5nW10gPSBbXTtcclxuICAgIHdoaWxlIChpIDwgdW5wYXJzZWRBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgY3VycmVudExpbmUgPSB1bnBhcnNlZEFycmF5W2ldO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50TGluZS5pbmNsdWRlcyhcIi8vXCIpICYmIGN1cnJlbnRMaW5lLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudExpbmUuaW5jbHVkZXMoXCIsXCIpICYmICFjdXJyZW50TGluZS5pbmNsdWRlcyhcIjtcIikgJiYgY3VycmVudExpbmUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUucHVzaChjdXJyZW50TGluZS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVzLnB1c2goY3VycmVudE1lYXN1cmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtZWFzdXJlcztcclxufVxyXG5cclxuLy8gYXNzdW1lcyA0LzQgdGltZSBzaWduYXR1cmVcclxuZnVuY3Rpb24gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXM6IHN0cmluZ1tdW10pIHtcclxuICAgIGxldCBiZWF0c0FuZExpbmVzID0gW107XHJcbiAgICBsZXQgY3VycmVudEJlYXQgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtZWFzdXJlID0gbWVhc3VyZXNbaV07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZWFzdXJlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGJlYXRzQW5kTGluZXMucHVzaCh7YmVhdDogY3VycmVudEJlYXQsIGxpbmVJbmZvOiBtZWFzdXJlW2pdfSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRCZWF0ICs9IDQgLyBtZWFzdXJlLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQmxhbmtMaW5lcyhiZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10pIHtcclxuICAgIGxldCBjbGVhbmVkQmVhdHNBbmRMaW5lcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZWF0c0FuZExpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBiZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGlmICghaXNBbGxaZXJvcyhsaW5lLmxpbmVJbmZvKSkge1xyXG4gICAgICAgICAgICBjbGVhbmVkQmVhdHNBbmRMaW5lcy5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbGVhbmVkQmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNBbGxaZXJvcyhzdHJpbmc6IHN0cmluZykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc3RyaW5nLmNoYXJBdChpKSAhPT0gJzAnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZUluZm9CeUxpbmUoaW5mb0J5TGluZTogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdLCBvZmZzZXQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W11cclxuKTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10ge1xyXG4gICAgbGV0IGluZm9CeUxpbmVXaXRoVGltZTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSBbXTtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IC1vZmZzZXQgKyBnZXRFbGFwc2VkVGltZSgwLCBpbmZvQnlMaW5lWzBdLmJlYXQsIGJwbXMsIHN0b3BzKTtcclxuICAgIGluZm9CeUxpbmVXaXRoVGltZS5wdXNoKHt0aW1lOiBjdXJyZW50VGltZSwgYmVhdDogaW5mb0J5TGluZVswXS5iZWF0LCBsaW5lSW5mbzogaW5mb0J5TGluZVswXS5saW5lSW5mb30pO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbmZvQnlMaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmVhdCA9IGluZm9CeUxpbmVbaSAtIDFdLmJlYXQ7XHJcbiAgICAgICAgbGV0IGVuZEJlYXQgPSBpbmZvQnlMaW5lW2ldLmJlYXQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gZ2V0RWxhcHNlZFRpbWUoc3RhcnRCZWF0LCBlbmRCZWF0LCBicG1zLCBzdG9wcyk7XHJcbiAgICAgICAgaW5mb0J5TGluZVdpdGhUaW1lLnB1c2goe3RpbWU6IGN1cnJlbnRUaW1lLCBiZWF0OiBpbmZvQnlMaW5lW2ldLmJlYXQsIGxpbmVJbmZvOiBpbmZvQnlMaW5lW2ldLmxpbmVJbmZvfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5mb0J5TGluZVdpdGhUaW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRFbGFwc2VkVGltZShzdGFydEJlYXQ6IG51bWJlciwgZW5kQmVhdDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IGN1cnJlbnRCUE1JbmRleDogbnVtYmVyID0gZ2V0U3RhcnRCUE1JbmRleChzdGFydEJlYXQsIGJwbXMpO1xyXG4gICAgbGV0IGVhcmxpZXN0QmVhdDogbnVtYmVyID0gc3RhcnRCZWF0O1xyXG4gICAgbGV0IGVsYXBzZWRUaW1lOiBudW1iZXIgPSBzdG9wcyA9PSBudWxsID8gMCA6IHN0b3BwZWRUaW1lKHN0YXJ0QmVhdCwgZW5kQmVhdCwgc3RvcHMpO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGxldCBuZXh0QlBNQ2hhbmdlOiBudW1iZXIgPSBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleCwgYnBtcyk7XHJcbiAgICAgICAgbGV0IG5leHRCZWF0OiBudW1iZXIgPSBNYXRoLm1pbihlbmRCZWF0LCBuZXh0QlBNQ2hhbmdlKTtcclxuICAgICAgICBlbGFwc2VkVGltZSArPSAobmV4dEJlYXQgLSBlYXJsaWVzdEJlYXQpIC8gYnBtc1tjdXJyZW50QlBNSW5kZXhdLmJwbSAqIDYwO1xyXG4gICAgICAgIGVhcmxpZXN0QmVhdCA9IG5leHRCZWF0O1xyXG4gICAgICAgIGN1cnJlbnRCUE1JbmRleCsrO1xyXG4gICAgfSB3aGlsZSAoZWFybGllc3RCZWF0IDwgZW5kQmVhdCk7XHJcbiAgICByZXR1cm4gZWxhcHNlZFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN0YXJ0QlBNSW5kZXgoc3RhcnRCZWF0OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10pIHtcclxuICAgIGxldCBzdGFydEJQTUluZGV4ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYnBtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChicG1zW2ldLmJlYXQgPCBzdGFydEJlYXQpIHtcclxuICAgICAgICAgICAgc3RhcnRCUE1JbmRleCA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXJ0QlBNSW5kZXg7XHJcbn1cclxuXHJcbi8vIGRvZXMgTk9UIHNuYXAgdG8gbmVhcmVzdCAxLzE5Mm5kIG9mIGJlYXRcclxuZnVuY3Rpb24gc3RvcHBlZFRpbWUoc3RhcnRCZWF0OiBudW1iZXIsIGVuZEJlYXQ6IG51bWJlciwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W10pIHtcclxuICAgIGxldCB0aW1lID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RvcEJlYXQgPSBzdG9wc1tpXS5iZWF0O1xyXG4gICAgICAgIGlmIChzdGFydEJlYXQgPD0gc3RvcEJlYXQgJiYgc3RvcEJlYXQgPCBlbmRCZWF0KSB7XHJcbiAgICAgICAgICAgIHRpbWUgKz0gc3RvcHNbaV0uc3RvcER1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdKSB7XHJcbiAgICBpZiAoY3VycmVudEJQTUluZGV4ICsgMSA8IGJwbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGJwbXNbY3VycmVudEJQTUluZGV4ICsgMV0uYmVhdDtcclxuICAgIH1cclxuICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmc7IH1bXSkge1xyXG4gICAgbGV0IG51bVRyYWNrczogbnVtYmVyID0gdGltZXNCZWF0c0FuZExpbmVzWzBdLmxpbmVJbmZvLmxlbmd0aDtcclxuICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgdHJhY2tzLnB1c2goW10pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lc0JlYXRzQW5kTGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbGluZTogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZyB9ID0gdGltZXNCZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZS5saW5lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZVN0cmluZyA9IGxpbmUubGluZUluZm8uY2hhckF0KGopO1xyXG4gICAgICAgICAgICBsZXQgbm90ZVR5cGU6IE5vdGVUeXBlID0gc3RyaW5nVG9Ob3RlVHlwZSh0eXBlU3RyaW5nKTtcclxuICAgICAgICAgICAgaWYgKG5vdGVUeXBlICE9PSBOb3RlVHlwZS5OT05FKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja3Nbal0ucHVzaCh7dHlwZTogbm90ZVR5cGUsIHR5cGVTdHJpbmc6IHR5cGVTdHJpbmcsIHRpbWVJblNlY29uZHM6IGxpbmUudGltZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyYWNrcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VCUE1TKGJwbVN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoYnBtU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgYnBtQXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oYnBtU3RyaW5nKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJwbUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnBtcy5wdXNoKHtiZWF0OiBicG1BcnJheVtpXVswXSwgYnBtOiBicG1BcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJwbXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlU3RvcHMoc3RvcHNTdHJpbmc6IHN0cmluZykge1xyXG4gICAgaWYgKHN0b3BzU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgc3RvcHNBcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihzdG9wc1N0cmluZyk7XHJcbiAgICBsZXQgc3RvcHM6IHsgc3RvcER1cmF0aW9uOiBudW1iZXI7IGJlYXQ6IG51bWJlciB9W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN0b3BzLnB1c2goe2JlYXQ6IHN0b3BzQXJyYXlbaV1bMF0sIHN0b3BEdXJhdGlvbjogc3RvcHNBcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0b3BzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKHN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBsZXQgc3RyaW5nQXJyYXk6IHN0cmluZ1tdW10gPSBzdHJpbmcuc3BsaXQoXCIsXCIpLm1hcChlID0+IGUudHJpbSgpLnNwbGl0KFwiPVwiKSk7XHJcbiAgICBsZXQgYXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmdBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5LnB1c2goW3BhcnNlRmxvYXQoc3RyaW5nQXJyYXlbaV1bMF0pLCBwYXJzZUZsb2F0KHN0cmluZ0FycmF5W2ldWzFdKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59IiwiaW1wb3J0IHtTV0ZUYWdzfSBmcm9tIFwiLi9zd2YtdGFnc1wiO1xyXG5pbXBvcnQge1NXRiwgdW5jb21wcmVzc30gZnJvbSBcIi4vc3dmLXJlYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTd2ZQYXJzZVJlc3BvbnNlIHtcclxuICAgIGNoYXJ0RGF0YTogW251bWJlciwgc3RyaW5nLCBzdHJpbmddW107XHJcbiAgICBibG9iOiBCbG9iO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTd2ZGcm9tQXJyYXlCdWZmZXIoaW5wdXQ6IEFycmF5QnVmZmVyKTogU3dmUGFyc2VSZXNwb25zZSB7XHJcbiAgICByZXR1cm4gc3dmRmlsZV9SZWFkeSg8VWludDhBcnJheT4gaW5wdXQpO1xyXG59XHJcblxyXG5sZXQgc3dmX3RhZ3M6IFNXRjtcclxuXHJcbmZ1bmN0aW9uIHN3ZkZpbGVfUmVhZHkoYnVmZmVyOiBVaW50OEFycmF5KTogU3dmUGFyc2VSZXNwb25zZSB7XHJcbiAgICBzd2ZfdGFncyA9IHVuY29tcHJlc3MoYnVmZmVyKTtcclxuICAgIFxyXG4gICAgLy8gQ2hhcnQgRGF0YVxyXG4gICAgbGV0IGNoYXJ0X3RhZyA9IGdldEJlYXRCb3goKTtcclxuICAgIGxldCBjaGFydF9kYXRhID0gY2hhcnRfdGFnW1widmFyaWFibGVzXCJdW1wiX3Jvb3RcIl1bXCJiZWF0Qm94XCJdO1xyXG5cclxuICAgIC8vIE11c2ljIERhdGFcclxuICAgIGxldCBtdXNpY19iaW5hcnkgPSBnZXRBdWRpbygpO1xyXG4gICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbbXVzaWNfYmluYXJ5XSwge3R5cGUgOiAnYXVkaW8vbXBlZyd9KTtcclxuXHJcbiAgICByZXR1cm4ge2Jsb2I6IGJsb2IsIGNoYXJ0RGF0YTogY2hhcnRfZGF0YX07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kIEJlYXRib3ggaW4gdGhlIHN3Zl90YWdzLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QmVhdEJveCgpIHtcclxuICAgIGxldCBsZW4gPSBzd2ZfdGFncy50YWdzLmxlbmd0aDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBlbG0gPSBudWxsO1xyXG5cclxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgZWxtID0gc3dmX3RhZ3MudGFnc1tpXTtcclxuICAgICAgICBpZihlbG0uaGVhZGVyLmNvZGUgPT0gU1dGVGFncy5ET0FDVElPTilcclxuICAgICAgICAgICAgcmV0dXJuIGVsbTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgQmVhdGJveCBpbiB0aGUgc3dmX3RhZ3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRBdWRpbygpIHtcclxuICAgIGxldCBsZW4gPSBzd2ZfdGFncy50YWdzLmxlbmd0aDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBlbG0gPSBudWxsO1xyXG5cclxuICAgIGxldCBhdWRpb1NpemUgPSAwXHJcblxyXG4gICAgLy8gTG9vcCBBbGwgQXVkaW8gVGFncywgZ2V0IFRvdGFsIEJ5dGUgU2l6ZVxyXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBlbG0gPSBzd2ZfdGFncy50YWdzW2ldO1xyXG4gICAgICAgIGlmKGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLkRFRklORVNPVU5EIHx8IGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLlNUUkVBTUJMT0NLKVxyXG4gICAgICAgICAgICBhdWRpb1NpemUgKz0gZWxtLmF1ZGlvX2J5dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExvb3AgQWxsIEF1ZGlvIFRhZ3MsIGdldCBUb3RhbCBCeXRlIFNpemVcclxuICAgIGxldCB3cml0ZVBvc2l0aW9uID0gMDtcclxuICAgIGxldCBiaW5hcnkgPSBuZXcgVWludDhBcnJheShhdWRpb1NpemUpO1xyXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBlbG0gPSBzd2ZfdGFncy50YWdzW2ldO1xyXG4gICAgICAgIGlmKGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLkRFRklORVNPVU5EIHx8IGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLlNUUkVBTUJMT0NLKSB7XHJcbiAgICAgICAgICAgIGJpbmFyeS5zZXQobmV3IFVpbnQ4QXJyYXkoZWxtLmRhdGEpLCB3cml0ZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgd3JpdGVQb3NpdGlvbiArPSBlbG0uYXVkaW9fYnl0ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJpbmFyeTtcclxufSIsImltcG9ydCAqIGFzIHBha28gZnJvbSBcInBha29cIjtcclxuaW1wb3J0IHtTV0ZBY3Rpb25UYWdzLCBTV0ZPdGhlclRhZ3MsIFNXRlRhZ3MsIFNXRlR5cGVUYWdzfSBmcm9tIFwiLi9zd2YtdGFnc1wiO1xyXG5pbXBvcnQge0J5dGVSZWFkZXIsIFJlY3QsIFRhZywgVGFnSGVhZGVyfSBmcm9tIFwiLi9ieXRlX3JlYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNXRiB7XHJcbiAgICBwdWJsaWMgYnVmZmVyOiBCeXRlUmVhZGVyO1xyXG4gICAgcHVibGljIG1hZ2ljOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdmVyc2lvbjogbnVtYmVyO1xyXG4gICAgcHVibGljIGZpbGVMZW5ndGg6IHsgY29tcHJlc3NlZDogbnVtYmVyLCB1bmNvbXByZXNzZWQ6IG51bWJlciB9O1xyXG4gICAgcHVibGljIGZyYW1lU2l6ZTogUmVjdDtcclxuICAgIHB1YmxpYyBmcmFtZVJhdGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmcmFtZUNvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGFnczogYW55W107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25jYXQgU1dGIEhlYWRlciB3aXRoIHVuY29tcHJlc3NlZCBCdWZmZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25jYXRTV0ZIZWFkZXIoYnVmZjogVWludDhBcnJheSwgc3dmOiBBcnJheUJ1ZmZlcikge1xyXG4gICAgbGV0IHRtcCA9IG5ldyBVaW50OEFycmF5KGJ1ZmYuYnl0ZUxlbmd0aCArIDgpO1xyXG4gICAgdG1wLnNldChuZXcgVWludDhBcnJheShzd2Yuc2xpY2UoMCwgOCkpKTtcclxuICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZiksIDgpO1xyXG4gICAgcmV0dXJuIHRtcC5idWZmZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNvbXByZXNzIFNXRiBpZiBuZWVkZWQgYW5kIFJlYWQgU1dGXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5jb21wcmVzcyhzd2Y6IFVpbnQ4QXJyYXkpIHtcclxuICAgIGxldCBzd2ZfYnl0ZXMgPSBuZXcgVWludDhBcnJheShzd2YpO1xyXG4gICAgbGV0IGNvbXByZXNzZWRfYnVmZjogVWludDhBcnJheSA9IHN3Zi5zbGljZSg4KTtcclxuXHJcbiAgICAvLyB1bmNvbXByZXNzIGJ1ZmZlclxyXG4gICAgc3dpdGNoIChzd2ZfYnl0ZXNbMF0pIHsgLy8gTUFHSUNcclxuICAgICAgICBjYXNlIDB4NDMgOiAvLyAnQycgPSB6bGliIGNvbXByZXNzZWRcclxuICAgICAgICAgICAgbGV0IHVuY29tcHJlc3NlZF9idWZmID0gY29uY2F0U1dGSGVhZGVyKHBha28uaW5mbGF0ZShjb21wcmVzc2VkX2J1ZmYpLCBzd2YpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVhZFNXRkJ1ZmYobmV3IEJ5dGVSZWFkZXIodW5jb21wcmVzc2VkX2J1ZmYpLCBzd2YpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAweDQ2IDogLy8gJ0YnID0gdW5jb21wcmVzc2VkXHJcbiAgICAgICAgICAgIHJldHVybiByZWFkU1dGQnVmZihuZXcgQnl0ZVJlYWRlcihzd2YpLCBzd2YpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAweDVhIDogLy8gTFpNQSBjb21wcmVzc2VkXHJcbiAgICAgICAgICAgIGFsZXJ0KCdDYW5ub3QgaGFuZGxlIExaTUEgU1dGIGNvbXByZXNzaW9ucycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgIGFsZXJ0KCdVbmtub3duIFNXRiBjb21wcmVzc2lvbnMnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyB0aGUgU1dGIGZyb20gdW5jb21wcmVzc2VkIGJ1ZmZlci5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkU1dGQnVmZihidWZmOiBCeXRlUmVhZGVyLCBjb21wcmVzc2VkX2J1ZmY6IEFycmF5QnVmZmVyKTogU1dGIHtcclxuICAgIGJ1ZmYuc2VlaygwKTsvLyBzdGFydFxyXG5cclxuICAgIGxldCBzd2YgPSBuZXcgU1dGKClcclxuICAgIHN3Zi5idWZmZXIgPSBidWZmO1xyXG4gICAgc3dmLm1hZ2ljID0gYnVmZi5yZWFkU3RyaW5nRml4ZWQoMyk7XHJcbiAgICBzd2YudmVyc2lvbiA9IGJ1ZmYucmVhZFVJbnQ4KCk7XHJcbiAgICBzd2YuZmlsZUxlbmd0aCA9IHtcclxuICAgICAgICBjb21wcmVzc2VkOiBjb21wcmVzc2VkX2J1ZmYuYnl0ZUxlbmd0aCxcclxuICAgICAgICB1bmNvbXByZXNzZWQ6IGJ1ZmYucmVhZFVJbnRMRSgzMilcclxuICAgIH07XHJcbiAgICBzd2YuZnJhbWVTaXplID0gYnVmZi5yZWFkUmVjdCgpO1xyXG4gICAgc3dmLmZyYW1lUmF0ZSA9IGJ1ZmYucmVhZFVJbnRMRSgxNikgLyAyNTY7XHJcbiAgICBzd2YuZnJhbWVDb3VudCA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHN3Zi50YWdzID0gcmVhZFNXRlRhZ3MoYnVmZik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3dmO1xyXG59XHJcblxyXG4vKipcclxuICogUGFyc2VzIHRoZSBTV0YgVEFHIGRhdGEgc3RydWN0dXJlLCBrZWVwaW5nIG9ubHkgdGhlIHRhZ3NcclxuICogd2UgYXJlIGludGVyZXN0ZWQgaW4uXHJcbiAqIC0gQXVkaW8gVGFnczogQXVkaW8gU2FtcGxlc1xyXG4gKiAtIERvIEFjdGlvbiBUYWc6IENvbnRhaW5pbmcgdGhlIGJlYXRCb3ggdmFyaWFibGUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVhZFNXRlRhZ3MoYnVmZjogQnl0ZVJlYWRlcikge1xyXG4gICAgbGV0IHRhZ3M6IFRhZ1tdID0gW107XHJcbiAgICBsZXQgdGFnSGVhZGVyOiBUYWdIZWFkZXI7XHJcblxyXG4gICAgbGV0IG1wM1NlZWsgPSAwO1xyXG4gICAgbGV0IG1wM1NhbXBsZXMgPSAwO1xyXG4gICAgbGV0IG1wM0lkID0gMDtcclxuICAgIGxldCBtcDNGb3JtYXQgPSAwO1xyXG4gICAgbGV0IG1wM1N0cmVhbSA9IGZhbHNlO1xyXG5cclxuICAgIC8qIFJlYWRzIFRhZ0NvZGVBbmRMZW5ndGggZnJvbSBUYWcncyBSRUNPUkRIRUFERVIgKi9cclxuICAgIHdoaWxlICgodGFnSGVhZGVyID0gYnVmZi5yZWFkVGFnQ29kZUFuZExlbmd0aCgpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGxldCB0YWc6IFRhZyA9IHt9O1xyXG4gICAgICAgIHRhZy5oZWFkZXIgPSB0YWdIZWFkZXI7XHJcbiAgICAgICAgdGFnLmRvSW5jbHVkZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRhZ0hlYWRlci5jb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIFNvdW5kIFRhZ3MgLSBNUDMgRXh0cmFjdGlvblxyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuU1RSRUFNQkxPQ0s6XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1wM1N0cmVhbSB8fCAoKHRhZ0hlYWRlci5sZW5ndGggLSA0KSA9PSAwKSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBtcDNTYW1wbGVzICs9IGJ1ZmYucmVhZFVJbnRMRSgxNik7IC8vIGZyYW1lIHNhbXBsZXNcclxuICAgICAgICAgICAgICAgIGJ1ZmYucmVhZFVJbnRMRSgxNik7IC8vIHNlZWsgc2FtcGxlc1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZy5kYXRhID0gYnVmZi5idWZmZXJfcmF3LnNsaWNlKGJ1ZmYucG9pbnRlciwgYnVmZi5wb2ludGVyICsgKHRhZ0hlYWRlci5sZW5ndGggLSA0KSk7XHJcbiAgICAgICAgICAgICAgICB0YWcuYXVkaW9fYnl0ZXMgPSAodGFnSGVhZGVyLmxlbmd0aCAtIDQpO1xyXG4gICAgICAgICAgICAgICAgdGFnLmRvSW5jbHVkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5TVFJFQU1IRUFEOlxyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuU1RSRUFNSEVBRDI6XHJcbiAgICAgICAgICAgICAgICBidWZmLnJlYWRVSW50TEUoOCk7XHJcbiAgICAgICAgICAgICAgICBtcDNGb3JtYXQgPSBidWZmLnJlYWRVSW50TEUoOCk7XHJcbiAgICAgICAgICAgICAgICBidWZmLnJlYWRVSW50TEUoMTYpOyAvLyBhdmVyYWdlIGZyYW1lIHNhbXBsZXNcclxuICAgICAgICAgICAgICAgIG1wM1NlZWsgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCgobXAzRm9ybWF0ID4+PiA0KSAmIDB4ZikgPT0gU1dGT3RoZXJUYWdzLkNPREVDX01QMylcclxuICAgICAgICAgICAgICAgICAgICBtcDNTdHJlYW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuREVGSU5FU09VTkQ6XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1wM1N0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZCA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1hdCA9IGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKChmb3JtYXQgPj4+IDQpICYgMHhmKSA9PSBTV0ZPdGhlclRhZ3MuQ09ERUNfTVAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1wM0lkID0gaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1wM0Zvcm1hdCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzU2FtcGxlcyA9IGJ1ZmYucmVhZFVJbnRMRSgzMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1wM1NlZWsgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuZGF0YSA9IGJ1ZmYuYnVmZmVyX3Jhdy5zbGljZShidWZmLnBvaW50ZXIsIGJ1ZmYucG9pbnRlciArICh0YWdIZWFkZXIubGVuZ3RoIC0gOSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuYXVkaW9fYnl0ZXMgPSAodGFnSGVhZGVyLmxlbmd0aCAtIDkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuZG9JbmNsdWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIERvQWN0aW9uIC0gV2hlcmUgdGhlIEJlYXRib3ggTGl2ZXNcclxuICAgICAgICAgICAgY2FzZSBTV0ZUYWdzLkRPQUNUSU9OIDpcclxuICAgICAgICAgICAgICAgIGxldCBfZmluaXNoZWRSZWFkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblN0YWNrOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblZhcmlhYmxlczogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uUmVnaXN0ZXJzOiBbYW55LCBhbnksIGFueSwgYW55XSA9IFtudWxsLCBudWxsLCBudWxsLCBudWxsXTtcclxuICAgICAgICAgICAgICAgIGxldCBjb25zdGFudFBvb2wgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIV9maW5pc2hlZFJlYWRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uID0gYnVmZi5yZWFkQWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlYWQgQWN0aW9uIFRhZ1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uLmFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuRU5EOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ZpbmlzaGVkUmVhZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5DT05TVEFOVFBPT0w6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudFBvb2wgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb25zdGFudENvdW50ID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uc3RhbnRDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRQb29sLnB1c2goYnVmZi5yZWFkU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuUFVTSDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChidWZmLnBvaW50ZXIgPCBhY3Rpb24ucG9zaXRpb24gKyBhY3Rpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHB1c2hWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHVzaFR5cGUgPSBidWZmLnJlYWRVSW50TEUoOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwdXNoVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLlNUUklOR19MSVRFUkFMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYnVmZi5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuRkxPQVRfTElURVJBTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGJ1ZmYucmVhZEZsb2F0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuTlVMTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuVU5ERUZJTkVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLlJFR0lTVEVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYWN0aW9uUmVnaXN0ZXJzW2J1ZmYucmVhZFVJbnRMRSg4KV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IEJvb2xlYW4oYnVmZi5yZWFkVUludExFKDgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5ET1VCTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWREb3VibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5JTlRFR0VSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYnVmZi5yZWFkVUludExFKDMyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5DT05TVEFOVDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBjb25zdGFudFBvb2xbYnVmZi5yZWFkVUludExFKDgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5DT05TVEFOVDE2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gY29uc3RhbnRQb29sW2J1ZmYucmVhZFVJbnRMRSgxNildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGT1VORCBVTlNVUFBPUlRFRCBQVVNIREFUQSBUWVBFOiBcIiArIHB1c2hUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wdXNoKHB1c2hWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5QT1A6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLkRVUExJQ0FURTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goYWN0aW9uU3RhY2tbYWN0aW9uU3RhY2subGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuU1RPUkVfUkVHSVNURVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25SZWdpc3RlcnNbYnVmZi5yZWFkVUludExFKDgpXSA9IGFjdGlvblN0YWNrW2FjdGlvblN0YWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuR0VUX1ZBUklBQkxFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGd2TmFtZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZ3ZOYW1lIGluIGFjdGlvblZhcmlhYmxlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uVmFyaWFibGVzW2d2TmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goYWN0aW9uVmFyaWFibGVzW2d2TmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuU0VUX1ZBUklBQkxFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN2VmFsdWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblZhcmlhYmxlc1thY3Rpb25TdGFjay5wb3AoKV0gPSBzdlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuSU5JVF9BUlJBWTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnJheVNpemUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheVNpemU7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGFjdGlvblN0YWNrLnBvcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuR0VUX01FTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnbU5hbWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnbU9iamVjdCA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZ21OYW1lIGluIGdtT2JqZWN0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbU9iamVjdFtnbU5hbWVdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wdXNoKGdtT2JqZWN0W2dtTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuU0VUX01FTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbVZhbHVlID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc21OYW1lID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wb3AoKVtzbU5hbWVdID0gc21WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB0YWcgaXNuJ3Qgc3VwcG9ydGVkLCBidXQgaXQgc2VlbXMgdG8gYmUgaW4gZXZlcnkgZmlsZSwgc28gSSdtIGlnbm9yaW5nIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZPVU5EIFVOU1VQUE9SVEVEIEFDVElPTiBUQUc6IFwiICsgYWN0aW9uLmFjdGlvbi50b1N0cmluZygxNikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvblZhcmlhYmxlc1tcIl9yb290XCJdICE9IHVuZGVmaW5lZCAmJiBhY3Rpb25WYXJpYWJsZXNbXCJfcm9vdFwiXVtcImJlYXRCb3hcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGFnLmRvSW5jbHVkZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFnLnBvb2wgPSBjb25zdGFudFBvb2w7XHJcbiAgICAgICAgICAgICAgICB0YWcudmFyaWFibGVzID0gYWN0aW9uVmFyaWFibGVzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgLy90YWcuZGF0YSA9IGJ1ZmYuYnVmZmVyX3Jhdy5zbGljZShidWZmLnBvaW50ZXIsIGJ1ZmYucG9pbnRlciArIHRhZ0hlYWRlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFnLmRvSW5jbHVkZSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGFnLmRvSW5jbHVkZTtcclxuICAgICAgICAgICAgdGFncy5wdXNoKHRhZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidWZmLnNlZWsodGFnSGVhZGVyLnBvc2l0aW9uICsgdGFnSGVhZGVyLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFncztcclxufVxyXG4iLCIvKipcclxuICogQ29sbGVjdGlvbiBvZiBTV0YgdGFncyBhbmQgdGFnIHR5cGVzIHRvIGFzc2lzdCB3aXRoIHJlYWRpbmcgYW5kIHBhcnNpbmcgYSAuc3dmIGZpbGUuXHJcbiAqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNXRlRhZ3Mge1xyXG4gICAgcHVibGljIHN0YXRpYyBFTkQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNIT1dGUkFNRTogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRE9BQ1RJT046IG51bWJlciA9IDEyO1xyXG4gICAgcHVibGljIHN0YXRpYyBERUZJTkVTT1VORDogbnVtYmVyID0gMTQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUkVBTUhFQUQ6IG51bWJlciA9IDE4O1xyXG4gICAgcHVibGljIHN0YXRpYyBTVFJFQU1CTE9DSzogbnVtYmVyID0gMTk7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUkVBTUhFQUQyOiBudW1iZXIgPSA0NTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRklMRUFUVFJJQlVURVM6IG51bWJlciA9IDY5O1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU1dGQWN0aW9uVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVORDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RBTlRQT09MOiBudW1iZXIgPSAweDg4O1xyXG4gICAgcHVibGljIHN0YXRpYyBQVVNIOiBudW1iZXIgPSAweDk2O1xyXG4gICAgcHVibGljIHN0YXRpYyBQT1A6IG51bWJlciA9IDB4MTc7XHJcbiAgICBwdWJsaWMgc3RhdGljIERVUExJQ0FURTogbnVtYmVyID0gMHg0QztcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RPUkVfUkVHSVNURVI6IG51bWJlciA9IDB4ODc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdFVF9WQVJJQUJMRTogbnVtYmVyID0gMHgxQztcclxuICAgIHB1YmxpYyBzdGF0aWMgU0VUX1ZBUklBQkxFOiBudW1iZXIgPSAweDFEO1xyXG4gICAgcHVibGljIHN0YXRpYyBJTklUX0FSUkFZOiBudW1iZXIgPSAweDQyO1xyXG4gICAgcHVibGljIHN0YXRpYyBHRVRfTUVNQkVSOiBudW1iZXIgPSAweDRFO1xyXG4gICAgcHVibGljIHN0YXRpYyBTRVRfTUVNQkVSOiBudW1iZXIgPSAweDRGO1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU1dGVHlwZVRhZ3Mge1xyXG4gICAgcHVibGljIHN0YXRpYyBTVFJJTkdfTElURVJBTDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgRkxPQVRfTElURVJBTDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0aWMgTlVMTDogbnVtYmVyID0gMjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVU5ERUZJTkVEOiBudW1iZXIgPSAzO1xyXG4gICAgcHVibGljIHN0YXRpYyBSRUdJU1RFUjogbnVtYmVyID0gNDtcclxuICAgIHB1YmxpYyBzdGF0aWMgQk9PTEVBTjogbnVtYmVyID0gNTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRE9VQkxFOiBudW1iZXIgPSA2O1xyXG4gICAgcHVibGljIHN0YXRpYyBJTlRFR0VSOiBudW1iZXIgPSA3O1xyXG4gICAgcHVibGljIHN0YXRpYyBDT05TVEFOVDg6IG51bWJlciA9IDg7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPTlNUQU5UMTY6IG51bWJlciA9IDk7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZPdGhlclRhZ3Mge1xyXG4gICAgcHVibGljIHN0YXRpYyBDT0RFQ19NUDM6IG51bWJlciA9IDI7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlIHtcclxuICAgIHByaXZhdGUgaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb2xvcjogcDUuQ29sb3I7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZVNpemU6IG51bWJlciA9IDI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRpb25UaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0gaW5pdGlhbFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFZlbG9jaXR5ID0gaW5pdGlhbFZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24gPSBjb25zdGFudEFjY2VsZXJhdGlvbjtcclxuICAgICAgICB0aGlzLmNyZWF0aW9uVGltZUluU2Vjb25kcyA9IGNyZWF0aW9uVGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgZWxhcHNlZFRpbWUgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uOiBwNS5WZWN0b3IgPSB0aGlzLmdldFBvc2l0aW9uKHAsIGVsYXBzZWRUaW1lKTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLm5vU3Ryb2tlKCk7XHJcbiAgICAgICAgcC5maWxsKGNvbG9yKTtcclxuICAgICAgICBwLmNpcmNsZShjdXJyZW50UG9zaXRpb24ueCwgY3VycmVudFBvc2l0aW9uLnksIFBhcnRpY2xlLnBhcnRpY2xlU2l6ZSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFBvc2l0aW9uKHA6IHA1LCBlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHZlbG9jaXR5Q29tcG9uZW50OiBwNS5WZWN0b3IgPSBwNS5WZWN0b3IubXVsdCh0aGlzLmluaXRpYWxWZWxvY2l0eSwgZWxhcHNlZFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBhY2NlbGVyYXRpb25Db21wb25lbnQ6IHA1LlZlY3RvciA9IHA1LlZlY3Rvci5tdWx0KHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24sXHJcbiAgICAgICAgICAgIGVsYXBzZWRUaW1lSW5TZWNvbmRzICogZWxhcHNlZFRpbWVJblNlY29uZHMgLyAyKTtcclxuICAgICAgICByZXR1cm4gcDUuVmVjdG9yLmFkZChwNS5WZWN0b3IuYWRkKHRoaXMuaW5pdGlhbFBvc2l0aW9uLCB2ZWxvY2l0eUNvbXBvbmVudCksIGFjY2VsZXJhdGlvbkNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWVJblNlY29uZHMgLSB0aGlzLmNyZWF0aW9uVGltZUluU2Vjb25kcztcclxuICAgIH1cclxufSIsImltcG9ydCB7UGFydGljbGV9IGZyb20gXCIuL3BhcnRpY2xlXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZVN5c3RlbSB7XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlczogUGFydGljbGVbXTtcclxuICAgIHByaXZhdGUgcGFydGljbGVMaWZldGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmVsb2NpdHlBbmdsZVZhcmlhdGlvbkluRGVncmVlczogbnVtYmVyID0gMzA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyB2ZWxvY2l0eU1hZ25pdHVkZVZhcmlhdGlvbkluUGVyY2VudDogbnVtYmVyID0gMzA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjb2xvclZhcmlhdGlvbjogbnVtYmVyID0gMzA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFydGljbGVMaWZldGltZUluU2Vjb25kczogbnVtYmVyLCBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzID0gcGFydGljbGVMaWZldGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLmNvbnN0YW50QWNjZWxlcmF0aW9uID0gY29uc3RhbnRBY2NlbGVyYXRpb247XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMub2xkZXN0UGFydGljbGVBZ2UoY3VycmVudFRpbWVJblNlY29uZHMpID4gdGhpcy5wYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlT2xkZXN0UGFydGljbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGU6IFBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBhbHBoYUFkanVzdGVkQ29sb3I6IHA1LkNvbG9yID0gdGhpcy5nZXRBbHBoYUFkanVzdGVkQ29sb3IocGFydGljbGUsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgcGFydGljbGUuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcywgYWxwaGFBZGp1c3RlZENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbGRlc3RQYXJ0aWNsZUFnZShjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFydGljbGVzWzBdLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlT2xkZXN0UGFydGljbGUoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc2hpZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFscGhhQWRqdXN0ZWRDb2xvcihwYXJ0aWNsZTogUGFydGljbGUsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgYmFzZUNvbG9yID0gcGFydGljbGUuY29sb3I7XHJcbiAgICAgICAgbGV0IHBhcnRpY2xlQWdlID0gcGFydGljbGUuZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBsaWZlUmVtYWluaW5nUGVyY2VudCA9ICh0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMgLSBwYXJ0aWNsZUFnZSkgLyB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IGFscGhhID0gdGhpcy5pbnRlcnBvbGF0ZSgwLCAyNTUsIGxpZmVSZW1haW5pbmdQZXJjZW50KTtcclxuICAgICAgICBsZXQgbmV3Q29sb3I6IHA1LkNvbG9yID0gcC5jb2xvcihiYXNlQ29sb3IpO1xyXG4gICAgICAgIG5ld0NvbG9yLnNldEFscGhhKGFscGhhKTtcclxuICAgICAgICByZXR1cm4gbmV3Q29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnBvbGF0ZShtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWUgKyAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKiByYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbjogcDUuVmVjdG9yLCBpbml0aWFsVmVsb2NpdHk6IHA1LlZlY3RvciwgY3JlYXRpb25UaW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1QYXJ0aWNsZXM6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXJ0aWNsZXM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbmV3SW5pdGFsVmVsb2NpdHkgPSB0aGlzLnJhbmRvbWl6ZVZlY3RvcihwLCBpbml0aWFsVmVsb2NpdHkpO1xyXG4gICAgICAgICAgICBsZXQgbmV3Q29sb3IgPSB0aGlzLnJhbmRvbWl6ZUNvbG9yKHAsIGNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRQYXJ0aWNsZShpbml0aWFsUG9zaXRpb24sIG5ld0luaXRhbFZlbG9jaXR5LCBjcmVhdGlvblRpbWVJblNlY29uZHMsIG5ld0NvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3IocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb25SYW5kb21pemVkOiBwNS5WZWN0b3IgPSB0aGlzLnJhbmRvbWl6ZVZlY3RvckRpcmVjdGlvbihwLCBiYXNlVmVjdG9yKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5kb21pemVWZWN0b3JNYWduaXR1ZGUocCwgZGlyZWN0aW9uUmFuZG9taXplZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3JEaXJlY3Rpb24ocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgbGV0IGFuZ2xlSW5EZWdyZWVzID0gYmFzZVZlY3Rvci5oZWFkaW5nKCk7XHJcbiAgICAgICAgbGV0IGFuZ2xlQ2hhbmdlSW5EZWdyZWVzID0gcC5yYW5kb20oLVBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5QW5nbGVWYXJpYXRpb25JbkRlZ3JlZXMgLyAyLFxyXG4gICAgICAgICAgICBQYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eUFuZ2xlVmFyaWF0aW9uSW5EZWdyZWVzIC8gMik7XHJcbiAgICAgICAgbGV0IGZpbmFsQW5nbGVJblJhZGlhbnMgPSBwLnJhZGlhbnMoYW5nbGVJbkRlZ3JlZXMgKyBhbmdsZUNoYW5nZUluRGVncmVlcyk7XHJcbiAgICAgICAgbGV0IG1hZ25pdHVkZSA9IGJhc2VWZWN0b3IubWFnKCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICByZXR1cm4gcDUuVmVjdG9yLmZyb21BbmdsZShmaW5hbEFuZ2xlSW5SYWRpYW5zLCBtYWduaXR1ZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9taXplVmVjdG9yTWFnbml0dWRlKHA6IHA1LCBiYXNlVmVjdG9yOiBwNS5WZWN0b3IpIHtcclxuICAgICAgICBsZXQgbWFnbml0dWRlQ2hhbmdlSW5QZXJjZW50ID0gcC5yYW5kb20oLVBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5TWFnbml0dWRlVmFyaWF0aW9uSW5QZXJjZW50IC8gMixcclxuICAgICAgICAgICAgUGFydGljbGVTeXN0ZW0udmVsb2NpdHlNYWduaXR1ZGVWYXJpYXRpb25JblBlcmNlbnQgLyAyKTtcclxuICAgICAgICBsZXQgZmluYWxNYWduaXR1ZGUgPSBiYXNlVmVjdG9yLm1hZygpICogKDEwMCArIG1hZ25pdHVkZUNoYW5nZUluUGVyY2VudCkgLyAxMDA7XHJcbiAgICAgICAgcmV0dXJuIGJhc2VWZWN0b3Iuc2V0TWFnKGZpbmFsTWFnbml0dWRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZUNvbG9yKHA6IHA1LCBiYXNlQ29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IG5ld1JlZCA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLnJlZChiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICBsZXQgbmV3R3JlZW4gPSB0aGlzLmJvdW5kZWRSYW5kb21pemUocCwgcC5ncmVlbihiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICBsZXQgbmV3Qmx1ZSA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLmJsdWUoYmFzZUNvbG9yKSwgUGFydGljbGVTeXN0ZW0uY29sb3JWYXJpYXRpb24sIDAsIDI1NSk7XHJcbiAgICAgICAgcmV0dXJuIHAuY29sb3IobmV3UmVkLCBuZXdHcmVlbiwgbmV3Qmx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBib3VuZGVkUmFuZG9taXplKHA6IHA1LCB2YWx1ZTogbnVtYmVyLCB2YXJpYXRpb246IG51bWJlciwgbG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZSArIHAucmFuZG9tKC12YXJpYXRpb24gLyAyLCB2YXJpYXRpb24gLyAyKTtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPD0gbG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyQm91bmQgPCBuZXdWYWx1ZSAmJiBuZXdWYWx1ZSA8IHVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGFydGljbGUoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgUGFydGljbGUoaW5pdGlhbFBvc2l0aW9uLCBpbml0aWFsVmVsb2NpdHksIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24sIGNyZWF0aW9uVGltZUluU2Vjb25kcywgY29sb3IpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBQbGF5ZXJLZXlBY3Rpb24ge1xyXG4gICAgZ2FtZVRpbWU6IG51bWJlcjtcclxuICAgIHRyYWNrOiBudW1iZXI7XHJcbiAgICBrZXlTdGF0ZTogS2V5U3RhdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZVRpbWU6IG51bWJlciwgdHJhY2s6IG51bWJlciwga2V5U3RhdGU6IEtleVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lVGltZSA9IGdhbWVUaW1lO1xyXG4gICAgICAgIHRoaXMudHJhY2sgPSB0cmFjaztcclxuICAgICAgICB0aGlzLmtleVN0YXRlID0ga2V5U3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEtleVN0YXRlIHtcclxuICAgIFVQLCBET1dOLFxyXG59IiwiaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge0Rpc3BsYXlDb25maWcsIERpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7VGltZU1hbmFnZXJ9IGZyb20gXCIuL3RpbWVfbWFuYWdlclwiO1xyXG5pbXBvcnQge01pc3NNYW5hZ2VyfSBmcm9tIFwiLi9taXNzX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxNYW5hZ2VyfSBmcm9tIFwiLi9zY3JvbGxfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Jlc3VsdHNEaXNwbGF5fSBmcm9tIFwiLi9yZXN1bHRzX2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7XHJcbiAgICBpbml0aWFsaXplS2V5QmluZGluZ3MsXHJcbiAgICBpc0tleUJpbmRpbmdzRGVmaW5lZCxcclxuICAgIHJlcGxhY2VOb3RZZXRJbXBsZW1lbnRlZE5vdGVUeXBlcyxcclxuICAgIHNldEFsbE5vdGVzVG9EZWZhdWx0U3RhdGVcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleVN0YXRlLCBQbGF5ZXJLZXlBY3Rpb259IGZyb20gXCIuL3BsYXllcl9rZXlfYWN0aW9uXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZywgQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZX0gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lGZWVkYmFja1RleHR9IGZyb20gXCIuL2FjY3VyYWN5X2ZlZWRiYWNrX3RleHRcIjtcclxuaW1wb3J0IHtSZWNlcHRvclNocmlua1JlYWN0aW9ufSBmcm9tIFwiLi9yZWNlcHRvcl9zaHJpbmtfcmVhY3Rpb25cIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrRmxhc2h9IGZyb20gXCIuL2FjY3VyYWN5X2ZlZWRiYWNrX2ZsYXNoXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlc30gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzXCI7XHJcbmltcG9ydCB7SG9sZFBhcnRpY2xlc30gZnJvbSBcIi4vaG9sZF9wYXJ0aWNsZXNcIjtcclxuaW1wb3J0IHtIb2xkR2xvd30gZnJvbSBcIi4vaG9sZF9nbG93XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWluZ0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogUDVTY2VuZTtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSB0aW1lTWFuYWdlcjogR2FtZVRpbWVQcm92aWRlcjtcclxuICAgIHByaXZhdGUgbWlzc01hbmFnZXI6IE1pc3NNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgZ2FtZUVuZFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2hvd1Jlc3VsdHNTY3JlZW46IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgaXNEZWJ1Z01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lGZWVkYmFja1RleHQ6IEFjY3VyYWN5RmVlZGJhY2tUZXh0O1xyXG4gICAgcHJpdmF0ZSBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcbiAgICBwcml2YXRlIHJlY2VwdG9yU2hyaW5rUmVhY3Rpb246IFJlY2VwdG9yU2hyaW5rUmVhY3Rpb247XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5RmVlZGJhY2tGbGFzaDogQWNjdXJhY3lGZWVkYmFja0ZsYXNoO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzOiBBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzO1xyXG4gICAgcHJpdmF0ZSBob2xkUGFydGljbGVzOiBIb2xkUGFydGljbGVzO1xyXG4gICAgcHJpdmF0ZSBob2xkR2xvdzogSG9sZEdsb3c7XHJcbiAgICBwcml2YXRlIGF1ZGlvRmlsZTogQXVkaW9GaWxlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNrczogTm90ZVtdW10sIGF1ZGlvRmlsZTogQXVkaW9GaWxlLCBjb25maWc6IENvbmZpZywgc2NlbmU6IFA1U2NlbmUpIHtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHRzU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdWRpb0ZpbGUgPSBhdWRpb0ZpbGU7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG5cclxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB0aW1lIG1hbmFnZXIgYW5kIHBsYXkgdGhlIGF1ZGlvIGFzIGNsb3NlIHRvZ2V0aGVyIGFzIHBvc3NpYmxlIHRvIHN5bmNocm9uaXplIHRoZSBhdWRpbyB3aXRoIHRoZSBnYW1lXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZU1hbmFnZXIgPSBuZXcgVGltZU1hbmFnZXIocGVyZm9ybWFuY2Uubm93KCksIHRoaXMuY29uZmlnKTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0ZpbGUucGxheShjb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBuZXcgTm90ZU1hbmFnZXIodHJhY2tzKTtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzOiBudW1iZXIgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IG5ldyBBY2N1cmFjeVJlY29yZGluZyhudW1UcmFja3MpO1xyXG5cclxuICAgICAgICBsZXQgd2lkdGggPSAyNDA7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IDQ4MDtcclxuICAgICAgICBsZXQgdG9wTGVmdFggPSAodGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZS53aWR0aCAtIHdpZHRoKSAvIDI7XHJcbiAgICAgICAgbGV0IHRvcExlZnRZID0gKHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UuaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnID0gbmV3IFBsYXlpbmdDb25maWcodGhpcy5jb25maWcsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IG5ldyBEaXNwbGF5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmRpc3BsYXlDb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsXHJcbiAgICAgICAgICAgIHRvcExlZnRYLCB0b3BMZWZ0WSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcyA9IG5ldyBIb2xkUGFydGljbGVzKHRoaXMuY29uZmlnLCBudW1UcmFja3MsIHRoaXMuZGlzcGxheU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuaG9sZEdsb3cgPSBuZXcgSG9sZEdsb3codGhpcy5jb25maWcsIG51bVRyYWNrcywgdGhpcy5kaXNwbGF5TWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5ob2xkTWFuYWdlciA9IG5ldyBIb2xkTWFuYWdlcihudW1UcmFja3MsIHRoaXMub25UcmFja0hvbGQuYmluZCh0aGlzKSwgdGhpcy5vblRyYWNrVW5ob2xkLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0RlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFNjcm9sbE1hbmFnZXIodGhpcy5jb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nYW1lRW5kVGltZSA9IHRoaXMuY2FsY3VsYXRlR2FtZUVuZCh0aGlzLmF1ZGlvRmlsZS5nZXREdXJhdGlvbigpLCB0aGlzLmdldE5vdGVzRW5kVGltZSgpKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlciA9IG5ldyBBY2N1cmFjeU1hbmFnZXIodGhpcy5ub3RlTWFuYWdlciwgdGhpcy5jb25maWcsIHRoaXMuaG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLm1pc3NNYW5hZ2VyID0gbmV3IE1pc3NNYW5hZ2VyKHRoaXMuY29uZmlnLCB0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0aGlzLmhvbGRNYW5hZ2VyLFxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja1RleHQgPSBuZXcgQWNjdXJhY3lGZWVkYmFja1RleHQodGhpcy5hY2N1cmFjeVJlY29yZGluZywgdG9wTGVmdFggKyB3aWR0aCAvIDIsXHJcbiAgICAgICAgICAgIHRvcExlZnRZICsgaGVpZ2h0IC8gMiwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja0ZsYXNoID0gbmV3IEFjY3VyYWN5RmVlZGJhY2tGbGFzaCh0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0aGlzLmNvbmZpZywgdGhpcy5kaXNwbGF5TWFuYWdlcixcclxuICAgICAgICAgICAgbnVtVHJhY2tzKTtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2hyaW5rUmVhY3Rpb24gPSBuZXcgUmVjZXB0b3JTaHJpbmtSZWFjdGlvbih0aGlzLmNvbmZpZywgdGhpcy5kaXNwbGF5Q29uZmlnLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcyA9IG5ldyBBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzKHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlNYW5hZ2VyLCBudW1UcmFja3MpO1xyXG5cclxuICAgICAgICBpZiAoIWlzS2V5QmluZGluZ3NEZWZpbmVkKG51bVRyYWNrcykpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzKG51bVRyYWNrcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmluZEtleUJpbmRpbmdzVG9BY3Rpb25zKCk7XHJcbiAgICAgICAgc2V0QWxsTm90ZXNUb0RlZmF1bHRTdGF0ZSh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcyk7XHJcbiAgICAgICAgcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUFjY3VyYWN5RXZlbnQoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVHJhY2sgI1wiICsgKGFjY3VyYWN5RXZlbnQudHJhY2tOdW1iZXIgKyAxKSArIFwiIFwiICsgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU5hbWUgK1xyXG4gICAgICAgIC8vICAgICAoTWF0aC5hYnMoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcykgPT0gSW5maW5pdHkgP1xyXG4gICAgICAgIC8vICAgICAgICAgXCJcIiA6XHJcbiAgICAgICAgLy8gICAgICAgICBcIiAoXCIgKyBNYXRoLnJvdW5kKGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMpICsgXCIgbXMpXCIpKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZEFjY3VyYWN5RXZlbnQoYWNjdXJhY3lFdmVudCk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzLmFkZFBhcnRpY2xlc0ZvckFjY3VyYWN5RXZlbnQoYWNjdXJhY3lFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lSW5TZWNvbmRzID0gdGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZShwZXJmb3JtYW5jZS5ub3coKSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lSW5TZWNvbmRzID49IHRoaXMuZ2FtZUVuZFRpbWUgJiYgIXRoaXMuc2hvd1Jlc3VsdHNTY3JlZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZy5zdGF0ZSA9IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGUuUkVBRFk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kU29uZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1pc3NNYW5hZ2VyLnVwZGF0ZShjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlci5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2hyaW5rUmVhY3Rpb24uZHJhdygpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrVGV4dC5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZEdsb3cuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja0ZsYXNoLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRQYXJ0aWNsZXMuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Tm90ZXNFbmRUaW1lKCkge1xyXG4gICAgICAgIGxldCBlYXJsaWVzdEFjY3VyYWN5OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS51cHBlckJvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZWFybGllc3RBY2N1cmFjeSA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVhcmxpZXN0QWNjdXJhY3kgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMl0udXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm90ZU1hbmFnZXIuZ2V0TGF0ZXN0Tm90ZSgpLnRpbWVJblNlY29uZHMgKyBlYXJsaWVzdEFjY3VyYWN5IC8gMTAwMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUdhbWVFbmQoYXVkaW9EdXJhdGlvbjogbnVtYmVyLCBub3Rlc0VuZFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChhdWRpb0R1cmF0aW9uIDwgbm90ZXNFbmRUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub3Rlc0VuZFRpbWUgKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aC5taW4obm90ZXNFbmRUaW1lICsgNSwgYXVkaW9EdXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbmRTb25nKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9GaWxlLnN0b3AoKTtcclxuICAgICAgICBnbG9iYWwucmVzdWx0c0Rpc3BsYXkgPSBuZXcgUmVzdWx0c0Rpc3BsYXkodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lNYW5hZ2VyLFxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nKTtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5SRVNVTFRTKTtcclxuICAgICAgICB0aGlzLnVuYmluZEtleXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJpbmRLZXlCaW5kaW5nc1RvQWN0aW9ucygpIHtcclxuICAgICAgICBsZXQga2V5QmluZGluZ3MgPSBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldCh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGgpO1xyXG4gICAgICAgIGxldCBpc1NwYWNlYmFyQm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgc3BhY2ViYXJLZXlDb2RlOiBudW1iZXIgPSAzMjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nID0ga2V5QmluZGluZ3NbaV07XHJcbiAgICAgICAgICAgIGlmIChrZXlCaW5kaW5nLmtleUNvZGUgPT09IHNwYWNlYmFyS2V5Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgaXNTcGFjZWJhckJvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKGtleUJpbmRpbmcua2V5Q29kZSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleURvd25BY3Rpb25Gb3JUcmFjayhrZXlCaW5kaW5nLnRyYWNrTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVVwQWN0aW9uRm9yVHJhY2soa2V5QmluZGluZy50cmFja051bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKGdsb2JhbC5jb25maWcucXVpdEtleSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVuZFNvbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFpc1NwYWNlYmFyQm91bmQpIHtcclxuICAgICAgICAgICAgLy8gYmluZCBrZXkgdG8gbm90aGluZyB0byBtYWtlIHN1cmUgdGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgcHJldmVudGVkXHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oc3BhY2ViYXJLZXlDb2RlLCAoKSA9PiB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUga2V5RG93bkFjdGlvbkZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2hyaW5rUmVhY3Rpb24uaG9sZFRyYWNrKHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBsZXQgcGxheWVyS2V5QWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24gPVxyXG4gICAgICAgICAgICBuZXcgUGxheWVyS2V5QWN0aW9uKHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpLCB0cmFja051bWJlciwgS2V5U3RhdGUuRE9XTik7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIuaGFuZGxlUGxheWVyQWN0aW9uKHBsYXllcktleUFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBrZXlVcEFjdGlvbkZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2hyaW5rUmVhY3Rpb24ucmVsZWFzZVRyYWNrKHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBsZXQgcGxheWVyS2V5QWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24gPVxyXG4gICAgICAgICAgICBuZXcgUGxheWVyS2V5QWN0aW9uKHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpLCB0cmFja051bWJlciwgS2V5U3RhdGUuVVApO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyLmhhbmRsZVBsYXllckFjdGlvbihwbGF5ZXJLZXlBY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25UcmFja0hvbGQodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRHbG93LmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZEdsb3csIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy5ob2xkVHJhY2suY2FsbCh0aGlzLmhvbGRQYXJ0aWNsZXMsIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25UcmFja1VuaG9sZCh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZEdsb3cudW5ob2xkVHJhY2suY2FsbCh0aGlzLmhvbGRHbG93LCB0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRQYXJ0aWNsZXMudW5ob2xkVHJhY2suY2FsbCh0aGlzLmhvbGRQYXJ0aWNsZXMsIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5iaW5kS2V5cygpIHtcclxuICAgICAgICBsZXQga2V5QmluZGluZ3MgPSBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldCh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5QmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleUJpbmRpbmc6IEtleUJpbmRpbmcgPSBrZXlCaW5kaW5nc1tpXTtcclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLnVuYmluZEtleShrZXlCaW5kaW5nLmtleUNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGxheWluZ0NvbmZpZyBpbXBsZW1lbnRzIERpc3BsYXlDb25maWcge1xyXG4gICAgcHVibGljIG5vdGVTaXplOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGl4ZWxzUGVyU2Vjb25kOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVjZXB0b3JZUGVyY2VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgcHVibGljIHJlY2VwdG9yU2l6ZXM6IG51bWJlcltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBjb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBjb25maWcucGl4ZWxzUGVyU2Vjb25kO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JZUGVyY2VudCA9IGNvbmZpZy5yZWNlcHRvcllQZXJjZW50O1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsRGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbjtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjZXB0b3JTaXplcy5wdXNoKGNvbmZpZy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGVTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm90ZVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGl4ZWxzUGVyU2Vjb25kKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGl4ZWxzUGVyU2Vjb25kO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlY2VwdG9yU2l6ZXMoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlY2VwdG9yU2l6ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVjZXB0b3JZUGVyY2VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2Nyb2xsRGlyZWN0aW9uKCk6IFNjcm9sbERpcmVjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJlY2VwdG9yU2l6ZSh0cmFja051bWJlcjogbnVtYmVyLCByZWNlcHRvclNpemU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaXplc1t0cmFja051bWJlcl0gPSByZWNlcHRvclNpemU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFyc2luZ0hlbHBlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGJlYXRtYXBUb1RyYWNrQXJyYXkoYmVhdG1hcDogW251bWJlciwgc3RyaW5nLCBzdHJpbmddW10pIHtcclxuICAgICAgICBsZXQgdHJhY2tzOiBOb3RlW11bXSA9IFtbXSwgW10sIFtdLCBbXV07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZWF0bWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBiZWF0bWFwUm93ID0gYmVhdG1hcFtpXTtcclxuICAgICAgICAgICAgbGV0IHRyYWNrTnVtYmVyID0gdGhpcy50cmFja051bWJlckZyb21EaXJlY3Rpb24oYmVhdG1hcFJvd1sxXSk7XHJcbiAgICAgICAgICAgIGxldCBub3RlID0gdGhpcy5ub3RlRnJvbUJlYXRtYXBSb3coYmVhdG1hcFJvdyk7XHJcbiAgICAgICAgICAgIHRyYWNrc1t0cmFja051bWJlcl0ucHVzaChub3RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbm90ZUZyb21CZWF0bWFwUm93KHJvdzogW251bWJlciwgc3RyaW5nLCBzdHJpbmddKTogTm90ZSB7XHJcbiAgICAgICAgbGV0IHRpbWVJblNlY29uZHMgPSByb3dbMF0gLyAzMDtcclxuICAgICAgICByZXR1cm4ge3RpbWVJblNlY29uZHM6IHRpbWVJblNlY29uZHMsIHR5cGU6IE5vdGVUeXBlLk5PUk1BTCwgc3RhdGU6IE5vdGVTdGF0ZS5ERUZBVUxULCB0eXBlU3RyaW5nOiBcIk4vQVwifTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0cmFja051bWJlckZyb21EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJSXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJVbmtub3duIHRyYWNrIGRpcmVjdGlvbiAnXCIgKyBkaXJlY3Rpb24gKyBcIidcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtTb25nfSBmcm9tIFwiLi9zb25nXCI7XHJcbmltcG9ydCB7UGxheWxpc3RDbGllbnRTdGF0ZX0gZnJvbSBcIi4vcGxheWxpc3RfY2xpZW50X3N0YXRlXCI7XHJcbmltcG9ydCB7Z2V0Q29udGVudHNCeVRhZ05hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtwYXJzZVN3ZkZyb21BcnJheUJ1ZmZlciwgU3dmUGFyc2VSZXNwb25zZX0gZnJvbSBcIi4uL3BhcnNpbmcvcGFyc2Vfc3dmXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWxpc3RDbGllbnQge1xyXG4gICAgcHJpdmF0ZSBzdGF0ZTogUGxheWxpc3RDbGllbnRTdGF0ZTtcclxuICAgIHByaXZhdGUgY29yc1dvcmthcm91bmQ6IHN0cmluZyA9ICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS8nO1xyXG4gICAgcHJpdmF0ZSBzb25nVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHBsYXlsaXN0VXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHBsYXlsaXN0OiBTb25nW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuTk9fQVBJUztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3RhdGUoKTogUGxheWxpc3RDbGllbnRTdGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBsYXlsaXN0KCk6IFNvbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGluaXRpYWxpemUoaW5kZXhVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFwaXMoaW5kZXhVcmwpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRQbGF5bGlzdCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBsb2FkQXBpcyhpbmRleFVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuUFJPQ0VTU0lORztcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXQoaW5kZXhVcmwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHRoaXMuc2F2ZUFwaXNGcm9tUGxheWxpc3RJbmRleChyZXF1ZXN0KSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlKTtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlQXBpc0Zyb21QbGF5bGlzdEluZGV4KHJlcXVlc3Q6IFhNTEh0dHBSZXF1ZXN0KSB7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlWG1sOiBEb2N1bWVudCA9IHJlcXVlc3QucmVzcG9uc2VYTUw7XHJcbiAgICAgICAgdGhpcy5zb25nVXJsID0gZ2V0Q29udGVudHNCeVRhZ05hbWUocmVzcG9uc2VYbWwsIFwic29uZ1VSTFwiKTtcclxuICAgICAgICB0aGlzLnBsYXlsaXN0VXJsID0gZ2V0Q29udGVudHNCeVRhZ05hbWUocmVzcG9uc2VYbWwsIFwicGxheWxpc3RVUkxcIik7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuQVBJU19MT0FERUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBsb2FkUGxheWxpc3QoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuUFJPQ0VTU0lORztcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXQodGhpcy5wbGF5bGlzdFVybClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4gdGhpcy5zYXZlUGxheWxpc3QocmVxdWVzdCkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZVBsYXlsaXN0KHJlcXVlc3Q6IFhNTEh0dHBSZXF1ZXN0KSB7XHJcbiAgICAgICAgbGV0IHBsYXlsaXN0VGV4dDogc3RyaW5nID0gcmVxdWVzdC5yZXNwb25zZTtcclxuXHJcbiAgICAgICAgLy8gcmVwbGFjZSBhbXBlcnNhbmRzIGJlY2F1c2UgdGhlIERPTVBhcnNlciBkb2Vzbid0IGxpa2UgdGhlbVxyXG4gICAgICAgIHBsYXlsaXN0VGV4dCA9IHBsYXlsaXN0VGV4dC5yZXBsYWNlKC8mL2csICcmYW1wOycpO1xyXG5cclxuICAgICAgICBsZXQgcGxheWxpc3RYbWw6IERvY3VtZW50ID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhwbGF5bGlzdFRleHQsIFwidGV4dC94bWxcIik7XHJcbiAgICAgICAgbGV0IHNvbmdzOiBTb25nW10gPSB0aGlzLmdldFNvbmdzRnJvbVBsYXlsaXN0WG1sKHBsYXlsaXN0WG1sKTtcclxuICAgICAgICB0aGlzLnNhdmVTb25nc0lmVmFsaWQoc29uZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U29uZ3NGcm9tUGxheWxpc3RYbWwocGxheWxpc3RYbWw6IERvY3VtZW50KTogU29uZ1tdIHtcclxuICAgICAgICBsZXQgc29uZ3NYbWw6IEhUTUxDb2xsZWN0aW9uID0gcGxheWxpc3RYbWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzb25nXCIpO1xyXG4gICAgICAgIGxldCBzb25nczogU29uZ1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb25nc1htbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc29uZ1htbDogRWxlbWVudCA9IHNvbmdzWG1sLml0ZW0oaSk7XHJcbiAgICAgICAgICAgIGxldCBzb25nOiBTb25nID0gU29uZy5vZlhtbChzb25nWG1sKTtcclxuICAgICAgICAgICAgc29uZ3MucHVzaChzb25nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZVNvbmdzSWZWYWxpZChzb25nczogU29uZ1tdKSB7XHJcbiAgICAgICAgaWYgKHNvbmdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBcIkxvYWRlZCBhIHBsYXlsaXN0IHdpdGggbm8gc29uZ3MuXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuUExBWUxJU1RfTE9BREVEO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlsaXN0ID0gc29uZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRTd2Yoc29uZ0luZGV4OiBudW1iZXIpOiBQcm9taXNlPFN3ZlBhcnNlUmVzcG9uc2U+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QUk9DRVNTSU5HO1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXQodGhpcy5nZXRMZXZlbFVybChzb25nSW5kZXgpLCBcImFycmF5YnVmZmVyXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHRoaXMuZ2V0UGFyc2VkU3dmKHJlcXVlc3QpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExldmVsVXJsKHNvbmdJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgc29uZzogU29uZyA9IHRoaXMucGxheWxpc3Rbc29uZ0luZGV4XTtcclxuICAgICAgICBsZXQgbGV2ZWw6IHN0cmluZyA9IHNvbmcubGV2ZWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29uZ1VybCArIFwibGV2ZWxfXCIgKyBsZXZlbCArIFwiLnN3ZlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UGFyc2VkU3dmKHJlcXVlc3Q6IFhNTEh0dHBSZXF1ZXN0KSB7XHJcbiAgICAgICAgbGV0IHBhcnNlZFN3ZiA9IHBhcnNlU3dmRnJvbUFycmF5QnVmZmVyKDxBcnJheUJ1ZmZlcj4gcmVxdWVzdC5yZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuUExBWUxJU1RfTE9BREVEO1xyXG4gICAgICAgIHJldHVybiBwYXJzZWRTd2Y7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXQodXJsOiBzdHJpbmcsIHJlc3BvbnNlVHlwZT86IFhNTEh0dHBSZXF1ZXN0UmVzcG9uc2VUeXBlKTogUHJvbWlzZTxYTUxIdHRwUmVxdWVzdD4ge1xyXG4gICAgICAgIGxldCBnZXRVcmwgPSB0aGlzLmNvcnNXb3JrYXJvdW5kICsgdXJsO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0OiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIGdldFVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZVR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFdoZW4gdGhlIHJlcXVlc3QgbG9hZHMsIGNoZWNrIHdoZXRoZXIgaXQgd2FzIHN1Y2Nlc3NmdWxcclxuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgc3VjY2Vzc2Z1bCwgcmVzb2x2ZSB0aGUgcHJvbWlzZSBieSBwYXNzaW5nIGJhY2sgdGhlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBpdCBmYWlscywgcmVqZWN0IHRoZSBwcm9taXNlIHdpdGggYSBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiR2V0IHJlcXVlc3QgZmFpbGVkIHdpdGggZXJyb3IgY29kZTpcIiArIHJlcXVlc3Quc3RhdHVzVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFsc28gZGVhbCB3aXRoIHRoZSBjYXNlIHdoZW4gdGhlIGVudGlyZSByZXF1ZXN0IGZhaWxzIHRvIGJlZ2luIHdpdGhcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgYSBuZXR3b3JrIGVycm9yLCBzbyByZWplY3QgdGhlIHByb21pc2Ugd2l0aCBhbiBhcHByb3ByaWF0ZSBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IoJ1RoZXJlIHdhcyBhIG5ldHdvcmsgZXJyb3IuJykpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIFBsYXlsaXN0Q2xpZW50U3RhdGUge1xyXG4gICAgTk9fQVBJUyxcclxuICAgIEFQSVNfTE9BREVELFxyXG4gICAgUExBWUxJU1RfTE9BREVELFxyXG4gICAgUFJPQ0VTU0lORyxcclxuICAgIEVSUk9SXHJcbn1cclxuIiwiaW1wb3J0IHtnZXRDb250ZW50c0J5VGFnTmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNvbmcge1xyXG4gICAgcHVibGljIGdlbnJlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc29uZ05hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nQXV0aG9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ0F1dGhvclVybDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdEaWZmaWN1bHR5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc29uZ1N0eWxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ0xlbmd0aDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdTdGVwYXV0aG9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbGV2ZWw6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG9mWG1sKHhtbDogRWxlbWVudCk6IFNvbmcge1xyXG4gICAgICAgIGxldCBzb25nID0gbmV3IFNvbmcoKTtcclxuICAgICAgICBzb25nLmdlbnJlID0gcGFyc2VJbnQoeG1sLmdldEF0dHJpYnV0ZShcImdlbnJlXCIpKTtcclxuICAgICAgICBzb25nLnNvbmdOYW1lID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmduYW1lXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0F1dGhvciA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nYXV0aG9yXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0F1dGhvclVybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nYXV0aG9ydXJsXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0RpZmZpY3VsdHkgPSBwYXJzZUludChnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ2RpZmZpY3VsdHlcIikpO1xyXG4gICAgICAgIHNvbmcuc29uZ1N0eWxlID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdzdHlsZVwiKTtcclxuICAgICAgICBzb25nLnNvbmdMZW5ndGggPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ2xlbmd0aFwiKTtcclxuICAgICAgICBzb25nLnNvbmdTdGVwYXV0aG9yID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdzdGVwYXV0aG9yXCIpO1xyXG4gICAgICAgIHNvbmcubGV2ZWwgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwibGV2ZWxcIik7XHJcbiAgICAgICAgcmV0dXJuIHNvbmc7XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWw6IEVsZW1lbnQgfCBEb2N1bWVudCwgdGFnOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKVswXS5pbm5lckhUTUw7XHJcbn1cclxuIiwiaW1wb3J0IHtEaXNwbGF5Q29uZmlnLCBEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7U2Nyb2xsTWFuYWdlcn0gZnJvbSBcIi4vc2Nyb2xsX21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQcmV2aWV3RGlzcGxheSB7XHJcbiAgICBwcml2YXRlIHNjZW5lOiBQNVNjZW5lO1xyXG4gICAgY29uZmlnOiBDb25maWc7XHJcbiAgICBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHNjcm9sbE1hbmFnZXI6IFNjcm9sbE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgdG9wTGVmdFggPSA2NTtcclxuICAgIHByaXZhdGUgdG9wTGVmdFkgPSA0NjtcclxuICAgIHByaXZhdGUgd2lkdGggPSAyMDA7XHJcbiAgICBwcml2YXRlIGhlaWdodCA9IDQwMDtcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3M6IE5vdGVbXVtdLCBjb25maWc6IENvbmZpZywgc2NlbmU6IFA1U2NlbmUpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5ldyBOb3RlTWFuYWdlcih0cmFja3MpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsTWFuYWdlciA9IG5ldyBTY3JvbGxNYW5hZ2VyKHRoaXMuY29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLCB0aGlzLmdldEJvdW5kcygpKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSB0aGlzLmdldERpc3BsYXlDb25maWcodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IG5ldyBEaXNwbGF5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmRpc3BsYXlDb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsXHJcbiAgICAgICAgICAgIHRoaXMudG9wTGVmdFgsIHRoaXMudG9wTGVmdFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIuZHJhdyh0aGlzLnNjcm9sbE1hbmFnZXIuZ2V0R2FtZVRpbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCb3VuZHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHt0b3BMZWZ0WDogdGhpcy50b3BMZWZ0WCwgdG9wTGVmdFk6IHRoaXMudG9wTGVmdFksIHdpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0fTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlDb25maWcoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyKTogRGlzcGxheUNvbmZpZyB7XHJcbiAgICAgICAgbGV0IHJlY2VwdG9yU2l6ZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICByZWNlcHRvclNpemVzLnB1c2goY29uZmlnLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldE5vdGVTaXplOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaXhlbHNQZXJTZWNvbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcucGl4ZWxzUGVyU2Vjb25kO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZWNlcHRvcllQZXJjZW50OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFNjcm9sbERpcmVjdGlvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5zY3JvbGxEaXJlY3Rpb247XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFJlY2VwdG9yU2l6ZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWNlcHRvclNpemVzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRSZWNlcHRvclNpemU6ICh0cmFja051bWJlcjogbnVtYmVyLCByZWNlcHRvclNpemU6IG51bWJlcikgPT4ge31cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtEaXNwbGF5Q29uZmlnfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWNlcHRvclNocmlua1JlYWN0aW9uIHtcclxuICAgIHByaXZhdGUgdHJhY2tIb2xkU3RhdGVzOiBib29sZWFuW107XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSBkaXNwbGF5Q29uZmlnO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlcy5wdXNoKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXNbdHJhY2tOdW1iZXJdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZVRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlc1t0cmFja051bWJlcl0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgbnVtUmVjZXB0b3JzID0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yU2l6ZXMoKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHNocmluayA9IDAuNztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJlY2VwdG9yczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXplUmF0aW8gPSB0aGlzLmlzVHJhY2tIZWxkKGkpID8gc2hyaW5rIDogMS4wO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcuc2V0UmVjZXB0b3JTaXplKGksIHRoaXMuY29uZmlnLm5vdGVTaXplICogc2l6ZVJhdGlvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1RyYWNrSGVsZCh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tIb2xkU3RhdGVzW3RyYWNrTnVtYmVyXTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2RyYXdBY2N1cmFjeUJhcnN9IGZyb20gXCIuL2RyYXdpbmdfdXRpbFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5LCBBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzdWx0c0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBwOiBwNTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlciwgcDogcDUsXHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIgPSBhY2N1cmFjeU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5wID0gcDtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICB0aGlzLmRyYXdBY2N1cmFjeVJlc3VsdHModGhpcy5wLCB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmFjY3VyYWN5TWFuYWdlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWNjdXJhY3lSZXN1bHRzKHA6IHA1LCBhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSBwLndpZHRoIC8gMjtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHAuaGVpZ2h0IC8gMjtcclxuICAgICAgICBsZXQgYmFyV2lkdGggPSBwLndpZHRoICogMC42O1xyXG4gICAgICAgIGxldCBiYXJIZWlnaHQgPSBiYXJXaWR0aCAvIDEwO1xyXG4gICAgICAgIGxldCBsZWZ0TGFiZWxIZWlnaHQgPSAwLjggKiBiYXJIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5TGlzdEZvclJlc3VsdHMgPSB0aGlzLmdldFJlc3VsdHNBY2N1cmFjeUxpc3QoYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgZHJhd0FjY3VyYWN5QmFycyhwLCBhY2N1cmFjeUxpc3RGb3JSZXN1bHRzLCBhY2N1cmFjeVJlY29yZGluZywgY2VudGVyWCwgY2VudGVyWSwgbGVmdExhYmVsSGVpZ2h0LCBiYXJXaWR0aCxcclxuICAgICAgICAgICAgYmFySGVpZ2h0LCBub3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXIuaXNDb25maWd1cmVkRm9yQm9vcygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4gYSBsaXN0IG9mIHVuaXF1ZSBhY2N1cmFjaWVzIHNvcnRlZCBieSB0aGUgb2Zmc2V0LCB3aXRoIHRoZSBiZXN0IGFjY3VyYWN5IGJlaW5nIGZpcnN0XHJcbiAgICBwcml2YXRlIGdldFJlc3VsdHNBY2N1cmFjeUxpc3QoYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID0gYWNjdXJhY3lTZXR0aW5ncy5tYXAoYWNjdXJhY3kgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBhY2N1cmFjeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgc29ydFZhbHVlOiB0aGlzLmdldEFjY3VyYWN5U29ydGluZ1ZhbHVlKGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG1lcmdlZEFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH1bXSA9XHJcbiAgICAgICAgICAgIHRoaXMubWVyZ2VBY2N1cmFjaWVzV2l0aFNhbWVOYW1lKGFjY3VyYWN5VGFibGUpO1xyXG4gICAgICAgIG1lcmdlZEFjY3VyYWN5VGFibGUuc29ydCh0aGlzLmFjY3VyYWN5VGFibGVTb3J0RnVuY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBtZXJnZWRBY2N1cmFjeVRhYmxlLm1hcChyb3cgPT4gcm93LmFjY3VyYWN5TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBY2N1cmFjeVNvcnRpbmdWYWx1ZShsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChsb3dlckJvdW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHVwcGVyQm91bmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXBwZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhsb3dlckJvdW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKCh1cHBlckJvdW5kICsgbG93ZXJCb3VuZCkgLyAyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lcmdlQWNjdXJhY2llc1dpdGhTYW1lTmFtZShhY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nOyBzb3J0VmFsdWU6IG51bWJlciB9W10pIHtcclxuICAgICAgICBsZXQgbWVyZ2VkQWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgd2hpbGUgKGFjY3VyYWN5VGFibGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQga2V5QWNjdXJhY3lOYW1lID0gYWNjdXJhY3lUYWJsZVswXS5hY2N1cmFjeU5hbWU7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVkQWNjdXJhY2llcyA9IGFjY3VyYWN5VGFibGUuZmlsdGVyKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lID09PSBrZXlBY2N1cmFjeU5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgc29ydFZhbHVlQXZlcmFnZSA9IG1hdGNoZWRBY2N1cmFjaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoc3VtLCByb3cpID0+IHN1bSArIHJvdy5zb3J0VmFsdWUsIDApXHJcbiAgICAgICAgICAgICAgICAvIG1hdGNoZWRBY2N1cmFjaWVzLmxlbmd0aDtcclxuICAgICAgICAgICAgbWVyZ2VkQWNjdXJhY3lUYWJsZS5wdXNoKHthY2N1cmFjeU5hbWU6IGtleUFjY3VyYWN5TmFtZSwgc29ydFZhbHVlOiBzb3J0VmFsdWVBdmVyYWdlfSk7XHJcbiAgICAgICAgICAgIGFjY3VyYWN5VGFibGUgPSBhY2N1cmFjeVRhYmxlLmZpbHRlcihyb3cgPT4gcm93LmFjY3VyYWN5TmFtZSAhPT0ga2V5QWNjdXJhY3lOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZEFjY3VyYWN5VGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVRhYmxlU29ydEZ1bmN0aW9uKGE6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfSkge1xyXG4gICAgICAgIHJldHVybiBhLnNvcnRWYWx1ZSAtIGIuc29ydFZhbHVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGVudW0gU2Nyb2xsRGlyZWN0aW9uIHtcclxuICAgIFVwLFxyXG4gICAgRG93bixcclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1RpbWVNYW5hZ2VyfSBmcm9tIFwiLi90aW1lX21hbmFnZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcm9sbE1hbmFnZXIgaW1wbGVtZW50cyBHYW1lVGltZVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGltZU1hbmFnZXI6IFRpbWVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxCb3VuZHM6IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgcDogcDUsIHNjcm9sbEJvdW5kcz86IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBUaW1lTWFuYWdlcigwLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxCb3VuZHMgPSBzY3JvbGxCb3VuZHM7XHJcbiAgICAgICAgcC5tb3VzZVdoZWVsID0gZnVuY3Rpb24gKGU6IFdoZWVsRXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGFsbG93U2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxCb3VuZHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2VJc0luQm91bmRzKHAsIHRoaXMuc2Nyb2xsQm91bmRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93U2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsbG93U2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxsb3dTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lQ2hhbmdlTWlsbGlzID0gZS5kZWx0YVkgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyAtPSB0aW1lQ2hhbmdlTWlsbGlzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbVRpbWVNaWxsaXMgKz0gdGltZUNoYW5nZU1pbGxpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEVxdWl2YWxlbnQgdG8gZXZlbnQucHJldmVudERlZmF1bHRcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBbGxvdyBhbiBpZ25vcmVkIGFyZ3VtZW50IHNvIGl0IGNhbiBiZSB1c2VkIGluIHBsYWNlIG9mIGEgVGltZU1hbmFnZXIgZm9yIGRlYnVnIG1vZGVcclxuICAgIGdldEdhbWVUaW1lKGlnbm9yZWRBcmd1bWVudD86IGFueSkge1xyXG4gICAgICAgIGxldCB0aW1lID0gdGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZSh0aGlzLnN5c3RlbVRpbWVNaWxsaXMpO1xyXG4gICAgICAgIHJldHVybiB0aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW91c2VJc0luQm91bmRzKHA6IHA1LCBib3VuZHM6IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSkge1xyXG4gICAgICAgIGlmIChwLm1vdXNlWCA+PSBib3VuZHMudG9wTGVmdFggJiYgcC5tb3VzZVggPD0gYm91bmRzLnRvcExlZnRYICsgYm91bmRzLndpZHRoICYmXHJcbiAgICAgICAgICAgIHAubW91c2VZID49IGJvdW5kcy50b3BMZWZ0WSAmJiBwLm1vdXNlWSA8PSBib3VuZHMudG9wTGVmdFkgKyBib3VuZHMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7RnVsbFBhcnNlLCBnZXRGdWxsUGFyc2UsIGdldFBhcnRpYWxQYXJzZSwgTm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZSwgUGFydGlhbFBhcnNlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7UGFyc2luZ0hlbHBlcn0gZnJvbSBcIi4vcGxheWxpc3RfY2xpZW50L3BhcnNpbmdfaGVscGVyXCI7XHJcblxyXG5leHBvcnQgZW51bSBTdGVwZmlsZVN0YXRlIHtcclxuICAgIE5PX1NURVBGSUxFLFxyXG4gICAgRE9ORV9SRUFESU5HLFxyXG4gICAgUEFSVElBTExZX1BBUlNFRCxcclxuICAgIEZVTExZX1BBUlNFRCxcclxuICAgIEVSUk9SLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RlcGZpbGUge1xyXG4gICAgcHVibGljIHN0YXRlOiBTdGVwZmlsZVN0YXRlO1xyXG4gICAgcHVibGljIGZpbGU6IEZpbGU7XHJcbiAgICBwdWJsaWMgcGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2U7XHJcbiAgICBwdWJsaWMgZnVsbFBhcnNlOiBGdWxsUGFyc2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLk5PX1NURVBGSUxFO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkRmlsZShmaWxlOiBwNS5GaWxlKSB7XHJcbiAgICAgICAgdGhpcy5maWxlID0gZmlsZS5maWxlOyAvLyB0aGlzIHVud3JhcHMgdGhlIHA1LkZpbGUgd3JhcHBlciB0byBnZXQgdGhlIG9yaWdpbmFsIERPTSBmaWxlXHJcbiAgICAgICAgdGhpcy5sb2FkVGV4dEZpbGUodGhpcy5maWxlLCAoKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkRPTkVfUkVBRElORztcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsUGFyc2UgPSBnZXRQYXJ0aWFsUGFyc2UoPHN0cmluZz5ldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGlhbFBhcnNlLm1vZGVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEZmckJlYXRtYXAoYmVhdG1hcDogW251bWJlciwgc3RyaW5nLCBzdHJpbmddW10pIHtcclxuICAgICAgICBsZXQgdHJhY2tzOiBOb3RlW11bXSA9IFBhcnNpbmdIZWxwZXIuYmVhdG1hcFRvVHJhY2tBcnJheShiZWF0bWFwKTtcclxuXHJcbiAgICAgICAgbGV0IHBhcnRpYWxQYXJzZSA9IG5ldyBQYXJ0aWFsUGFyc2UoKTtcclxuICAgICAgICBwYXJ0aWFsUGFyc2UubW9kZXMgPSBbbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKV07XHJcbiAgICAgICAgcGFydGlhbFBhcnNlLm1ldGFEYXRhID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgICAgICB0aGlzLnBhcnRpYWxQYXJzZSA9IHBhcnRpYWxQYXJzZTtcclxuXHJcbiAgICAgICAgbGV0IGZ1bGxQYXJzZSA9IG5ldyBGdWxsUGFyc2UocGFydGlhbFBhcnNlKTtcclxuICAgICAgICBmdWxsUGFyc2UudHJhY2tzID0gdHJhY2tzO1xyXG4gICAgICAgIHRoaXMuZnVsbFBhcnNlID0gZnVsbFBhcnNlO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbmlzaFBhcnNpbmcobW9kZUluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEIHx8IHRoaXMuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnVsbFBhcnNlID0gZ2V0RnVsbFBhcnNlKG1vZGVJbmRleCwgdGhpcy5wYXJ0aWFsUGFyc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFRleHRGaWxlKFxyXG4gICAgICAgIGZpbGU6IEZpbGUsXHJcbiAgICAgICAgbGlzdGVuZXI6IChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4gYW55LFxyXG4gICAgICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnNcclxuICAgICkge1xyXG4gICAgICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XHJcbiAgICAgICAgZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCBsaXN0ZW5lciwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFRpY2tlclN0YXRlIHtcclxuICAgIElORk9STUFUSU9OLFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUaWNrZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgaW5mb3JtYXRpb25DbGFzcyA9IFwidGlja2VyLWluZm9cIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGVycm9yQ2xhc3MgPSBcInRpY2tlci1lcnJvclwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGl2OiBwNS5FbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3BhbjogcDUuRWxlbWVudDtcclxuICAgIHByaXZhdGUgc3RhdGljIHN0YXRlOiBUaWNrZXJTdGF0ZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkZWZhdWx0TWVzc2FnZTogc3RyaW5nLCBjdXN0b21DbGFzczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IHRpY2tlclNwYW4gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGRlZmF1bHRNZXNzYWdlKTtcclxuICAgICAgICB9LCBcInRpY2tlclNwYW5cIik7XHJcbiAgICAgICAgbGV0IHRpY2tlckRpdiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgfSwgXCJ0aWNrZXJEaXZcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXppbmcodGlja2VyRGl2LCB0aWNrZXJTcGFuKSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUodGlja2VyRGl2LmVsZW1lbnQsIHRpY2tlclNwYW4uZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHJldHVybiB0aWNrZXJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNJbml0aWFsaXppbmcoZWxlbWVudDE6IHthbHJlYWR5RXhpc3RzOiBib29sZWFufSwgZWxlbWVudDI6IHthbHJlYWR5RXhpc3RzOiBib29sZWFufSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhZWxlbWVudDEuYWxyZWFkeUV4aXN0cyB8fCAhZWxlbWVudDIuYWxyZWFkeUV4aXN0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbml0aWFsaXplKGRpdjogcDUuRWxlbWVudCwgc3BhbjogcDUuRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTjtcclxuICAgICAgICBkaXYuY2hpbGQoc3Bhbik7XHJcbiAgICAgICAgdGhpcy5kaXYgPSBkaXY7XHJcbiAgICAgICAgdGhpcy5zcGFuID0gc3BhbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nLCB0aWNrZXJTdGF0ZTogVGlja2VyU3RhdGUpIHtcclxuICAgICAgICB0aGlzLnNwYW4uaHRtbChtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gdGlja2VyU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2V0U3R5bGUoY3VzdG9tQ2xhc3M6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTikge1xyXG4gICAgICAgICAgICBzZXRFbGVtZW50Q2xhc3Nlcyh0aGlzLmRpdiwgZ2xvYmFsLmdsb2JhbENsYXNzLCBjdXN0b21DbGFzcywgdGhpcy5pbmZvcm1hdGlvbkNsYXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IFRpY2tlclN0YXRlLkVSUk9SKSB7XHJcbiAgICAgICAgICAgIHNldEVsZW1lbnRDbGFzc2VzKHRoaXMuZGl2LCBnbG9iYWwuZ2xvYmFsQ2xhc3MsIGN1c3RvbUNsYXNzLCB0aGlzLmVycm9yQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RWxlbWVudENsYXNzZXMoZWxlbWVudDogcDUuRWxlbWVudCwgLi4uY2xhc3Nlczogc3RyaW5nW10pIHtcclxuICAgIGVsZW1lbnQuY2xhc3MoY2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbn0iLCJpbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZU1hbmFnZXIgaW1wbGVtZW50cyBHYW1lVGltZVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkID0gc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVsYXBzZWRUaW1lKHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHN5c3RlbVRpbWVNaWxsaXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIkVycm9yOiBjYW4ndCBnZXQgZWxhcHNlZCB0aW1lLiBFeHBlY3RlZCAxIGFyZ3VtZW50OiBzeXN0ZW1UaW1lLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChzeXN0ZW1UaW1lTWlsbGlzIC0gdGhpcy5zeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkKSAvIDEwMDA7IC8vIGluIHNlY29uZHNcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSB3YW50IHRvIGtlZXAgdGhpcyBjYWxjdWxhdGlvbiBpbiBvbmx5IG9uZSBwbGFjZVxyXG4gICAgZ2V0R2FtZVRpbWUoc3lzdGVtVGltZU1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxhcHNlZFRpbWUoc3lzdGVtVGltZU1pbGxpcykgKyB0aGlzLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzIC0gdGhpcy5jb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgZW51bVRvU3RyaW5nQXJyYXksXHJcbiAgICBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUsXHJcbn0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0hlYWRpbmcoKSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBoZWFkaW5nQ2xhc3MgPSBcIm5hdmlnYXRpb24taGVhZGluZ1wiO1xyXG5cclxuICAgIGxldCBwbGF5RnJvbUZpbGVCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheSBGcm9tIEZpbGVcIik7XHJcbiAgICB9LCBcInBsYXlGcm9tRmlsZUJ1dHRvblwiKTtcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LCAwLjI1LCAwLjAzNiwgMTMwLCAzNCk7XHJcbiAgICBwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVlfRlJPTV9GSUxFKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCFwbGF5RnJvbUZpbGVCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGxheUZyb21PbmxpbmVCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheSBGcm9tIE9ubGluZVwiKTtcclxuICAgIH0sIFwicGxheUZyb21PbmxpbmVCdXR0b25cIik7XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuMDM2LCA5MCwgMzQpO1xyXG4gICAgcGxheUZyb21PbmxpbmVCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVlfRlJPTV9PTkxJTkUpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXBsYXlGcm9tT25saW5lQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgcGxheUZyb21PbmxpbmVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBsZXQgb3B0aW9uc0J1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJPcHRpb25zXCIpO1xyXG4gICAgfSwgXCJvcHRpb25zQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUob3B0aW9uc0J1dHRvbi5lbGVtZW50LCAwLjgsIDAuMDM2LCA5MCwgMzQpO1xyXG4gICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuT1BUSU9OUyk7XHJcbiAgICB9KTtcclxuICAgIGlmICghb3B0aW9uc0J1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgcmVsYXRpdmVYIGFuZCByZWxhdGl2ZSBZIHRvIGJlIGJldHdlZW4gMCBhbmQgMVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoZWxlbWVudDogcDUuRWxlbWVudCwgcmVsYXRpdmVYOiBudW1iZXIsIHJlbGF0aXZlWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIGxldCBwID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICBsZXQgY2FudmFzUG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSA9IHAuX3JlbmRlcmVyLnBvc2l0aW9uKCk7XHJcbiAgICBlbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAocmVsYXRpdmVYICogcC53aWR0aCkgLSAod2lkdGggLyAyKSxcclxuICAgICAgICBjYW52YXNQb3NpdGlvbi55ICsgKHJlbGF0aXZlWSAqIHAuaGVpZ2h0KSAtIChoZWlnaHQgLyAyKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRFbGVtZW50VG9Cb3R0b20oZWxlbWVudDogcDUuRWxlbWVudCwgaGVpZ2h0UGVyY2VudDogbnVtYmVyLCBzdHlsaW5nV2lkdGg6IG51bWJlciwgc3R5bGluZ0hlaWdodDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcCA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgbGV0IGVsZW1lbnRIZWlnaHQgPSBoZWlnaHRQZXJjZW50IC8gMTAwICogcC5oZWlnaHQ7XHJcbiAgICBlbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLngsIGNhbnZhc1Bvc2l0aW9uLnkgKyAocC5oZWlnaHQgLSBlbGVtZW50SGVpZ2h0IC0gc3R5bGluZ0hlaWdodCkpO1xyXG4gICAgZWxlbWVudC5zdHlsZShcIndpZHRoOiBcIiArIChwLndpZHRoIC0gc3R5bGluZ1dpZHRoKSArIFwicHhcIik7XHJcbiAgICBlbGVtZW50LnN0eWxlKFwiaGVpZ2h0OiBcIiArIGVsZW1lbnRIZWlnaHQgKyBcInB4XCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZElucHV0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIGlucHV0SWQ6IHN0cmluZywgaW5wdXRJbml0aWFsVmFsdWU6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxhYmVsZWRJbnB1dENsYXNzID0gXCJsYWJlbGVkLWlucHV0XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZElucHV0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgaW5wdXRJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXQgPSBwLmNyZWF0ZUlucHV0KGlucHV0SW5pdGlhbFZhbHVlKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MobGFiZWxlZElucHV0Q2xhc3MpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgaW5wdXQucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgaW5wdXQuaWQoaW5wdXRJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBpbnB1dElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgbGV0IGlucHV0ID0gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGNvbnRhaW5lci5lbGVtZW50LCBcIklOUFVUXCIpO1xyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogaW5wdXQsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsKHA6IHA1LCBsYWJlbFN0cmluZzogc3RyaW5nLCBmb3JJZD86IHN0cmluZyk6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGxhYmVsID0gcC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbGFiZWxTdHJpbmcpO1xyXG4gICAgaWYgKGZvcklkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsYWJlbC5hdHRyaWJ1dGUoXCJmb3JcIiwgZm9ySWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDaGVja2JveChwOiBwNSwgaW5pdGlhbFN0YXRlOiBib29sZWFuKTogcDUuRWxlbWVudCB7XHJcbiAgICBsZXQgY2hlY2tib3ggPSBwLmNyZWF0ZUVsZW1lbnQoXCJjaGVja2JveFwiKTtcclxuICAgIGNoZWNrYm94LmVsdC5jaGVja2VkID0gaW5pdGlhbFN0YXRlO1xyXG4gICAgcmV0dXJuIGNoZWNrYm94O1xyXG59XHJcblxyXG4vLyBUT0RPOiBjaGVjayB0aGF0IG9wdGlvbnNFbnVtIGlzIGFjdHVhbGx5IGFuIEVudW0sIGFuZCBpbml0aWFsRW51bVZhbHVlIGlzIGEgdmFsdWUgZm9yIHRoYXQgZW51bVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZFNlbGVjdChsYWJlbFN0cmluZzogc3RyaW5nLCBzZWxlY3RJZDogc3RyaW5nLCBvcHRpb25zRW51bTogYW55LCBpbml0aWFsRW51bVZhbHVlOiBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgc2VsZWN0OiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGxhYmVsZWRTZWxlY3RDbGFzcyA9IFwibGFiZWxlZC1zZWxlY3RcIjtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZFNlbGVjdENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIHNlbGVjdElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZFNlbGVjdENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICBzZWxlY3QgPSBwLmNyZWF0ZVNlbGVjdCgpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIHNlbGVjdC5pZChzZWxlY3RJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBzZWxlY3RJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIGlmICghY29udGFpbmVyLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBsZXQgaW5pdGlhbE9wdGlvbnMgPSBlbnVtVG9TdHJpbmdBcnJheShvcHRpb25zRW51bSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsT3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHNlbGVjdC5vcHRpb24oaW5pdGlhbE9wdGlvbnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgc2VsZWN0LnNlbGVjdGVkKG9wdGlvbnNFbnVtW2luaXRpYWxFbnVtVmFsdWUgYXMga2V5b2YgdHlwZW9mIG9wdGlvbnNFbnVtXS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IEhUTUxDb2xsZWN0aW9uID0gc2VsZWN0LmVsdC5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5pdGVtKGkpLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzcyArIFwiIFwiICsgbGFiZWxlZFNlbGVjdENsYXNzICsgXCIgXCIgKyBnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IHNlbGVjdCwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZFRleHRBcmVhKGxhYmVsU3RyaW5nOiBzdHJpbmcsIGlucHV0SWQ6IHN0cmluZywgaW5wdXRJbml0aWFsVmFsdWU6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBudW1iZXIgPSA0LCBjb2xzOiBudW1iZXIgPSA0MCk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCB0ZXh0QXJlYTogcDUuRWxlbWVudDtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxhYmVsZWRUZXh0YXJlYUNsYXNzID0gXCJsYWJlbGVkLXRleHRhcmVhXCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgaW5wdXRJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICB0ZXh0QXJlYSA9IHAuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIGlucHV0SW5pdGlhbFZhbHVlKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgdGV4dEFyZWEuaWQoaW5wdXRJZCk7XHJcbiAgICAgICAgdGV4dEFyZWEuYXR0cmlidXRlKFwicm93c1wiLCByb3dzLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHRleHRBcmVhLmF0dHJpYnV0ZShcImNvbHNcIiwgY29scy50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGlucHV0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IHRleHRBcmVhLCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWxlSW5wdXQobGFiZWxTdHJpbmc6IHN0cmluZywgYnV0dG9uVGV4dDogc3RyaW5nLCB1bmlxdWVJZDogc3RyaW5nLCBvbkZpbGVMb2FkOiAoZmlsZTogcDUuRmlsZSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGJ1dHRvbklkID0gdW5pcXVlSWQgKyBcIkJ1dHRvblwiO1xyXG4gICAgbGV0IGNvbnRhaW5lcklkID0gdW5pcXVlSWQgKyBcIkNvbnRhaW5lclwiO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgZmlsZUlucHV0Q2xhc3MgPSBcImZpbGUtaW5wdXRcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBmaWxlSW5wdXQgPSBwLmNyZWF0ZUZpbGVJbnB1dChvbkZpbGVMb2FkLCBcImZhbHNlXCIpO1xyXG4gICAgICAgIGZpbGVJbnB1dC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBmaWxlSW5wdXQuaGlkZSgpO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uID0gcC5jcmVhdGVCdXR0b24oYnV0dG9uVGV4dCk7XHJcbiAgICAgICAgYnV0dG9uLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGJ1dHRvbi5pZChidXR0b25JZCk7XHJcbiAgICAgICAgYnV0dG9uLm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbGVJbnB1dC5lbHQuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBidXR0b25JZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpXHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBjb250YWluZXJJZCk7XHJcblxyXG4gICAgbGV0IGxhYmVsOiBwNS5FbGVtZW50ID0gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGNvbnRhaW5lci5lbGVtZW50LCBcIkxBQkVMXCIpO1xyXG4gICAgbGFiZWwuaHRtbChsYWJlbFN0cmluZyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRDaGVja2JveChsYWJlbFN0cmluZzogc3RyaW5nLCBjaGVja2JveElkOiBzdHJpbmcsIGlzQ2hlY2tlZDogYm9vbGVhbiwgY3VzdG9tQ2xhc3M6IHN0cmluZyk6XHJcbiAgICB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgY2hlY2tib3g6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkQ2hlY2tib3hDbGFzcyA9IFwibGFiZWxlZC1jaGVja2JveFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRDaGVja2JveENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGNoZWNrYm94SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgY2hlY2tib3ggPSBjcmVhdGVDaGVja2JveChwLCBpc0NoZWNrZWQpO1xyXG4gICAgICAgIGNoZWNrYm94LmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjaGVja2JveC5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3guYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBjaGVja2JveC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBjaGVja2JveC5pZChjaGVja2JveElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGNoZWNrYm94SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IGNoZWNrYm94LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFllc05vIHtcclxuICAgIFllcyxcclxuICAgIE5vXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib29sZWFuVG9ZZXNObyhib29sZWFuOiBib29sZWFuKTogWWVzTm8ge1xyXG4gICAgaWYgKGJvb2xlYW4pIHtcclxuICAgICAgICByZXR1cm4gWWVzTm8uWWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gWWVzTm8uTm87XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZGlzY291cnNlLnByb2Nlc3Npbmcub3JnL3QvaG93LXRvLW9yZ2FuaXplLXJhZGlvLWJ1dHRvbnMtaW4tc2VwYXJhdGUtbGluZXMvMTAwNDEvNVxyXG5leHBvcnQgZnVuY3Rpb24gZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2KHA6IHA1LCByYWRpb0RpdlA1RWxlbWVudDogcDUuRWxlbWVudCkge1xyXG4gICAgY29uc3QgaW5wdXRzOiBwNS5FbGVtZW50W10gPSBzZWxlY3RBbGwocCwgJ2lucHV0JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgY29uc3QgbGFiZWxzOiBwNS5FbGVtZW50W10gPSBzZWxlY3RBbGwocCwgJ2xhYmVsJywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgY29uc3QgbGVuID0gaW5wdXRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgcC5jcmVhdGVEaXYoKS5wYXJlbnQocmFkaW9EaXZQNUVsZW1lbnQpLmNoaWxkKGlucHV0c1tpXSkuY2hpbGQobGFiZWxzW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gaHR0cHM6Ly9kaXNjb3Vyc2UucHJvY2Vzc2luZy5vcmcvdC9ob3ctdG8tb3JnYW5pemUtcmFkaW8tYnV0dG9ucy1pbi1zZXBhcmF0ZS1saW5lcy8xMDA0MS81XHJcbmV4cG9ydCBmdW5jdGlvbiBmaXhSYWRpb0RpdkVsZW1lbnQocmFkaW9EaXZQNUVsZW1lbnQ6IHA1LkVsZW1lbnQpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJhZGlvRGl2UDVFbGVtZW50Ll9nZXRJbnB1dENoaWxkcmVuQXJyYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWx0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVSYWRpb09wdGlvbnMocDogcDUsIHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50LCBzdHlsZUNsYXNzZXM6IHN0cmluZ1tdKSB7XHJcbiAgICBsZXQgZGl2czogcDUuRWxlbWVudFtdID0gc2VsZWN0QWxsKHAsICdkaXYnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGl2cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRpdnNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaW5wdXRzOiBwNS5FbGVtZW50W10gPSBzZWxlY3RBbGwocCwgJ2lucHV0JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlucHV0c1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYWJlbHM6IHA1LkVsZW1lbnRbXSAgPSBzZWxlY3RBbGwocCwgJ2xhYmVsJywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxhYmVsc1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVBbGxPY2N1cnJlbmNlc09mVGFnKGh0bWw6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBsZXQgZWxlbWVudHMgPSB0ZW1wRGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xyXG4gICAgd2hpbGUgKGVsZW1lbnRzWzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBlbGVtZW50c1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnRzWzBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZW1wRGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoaW5wdXRFbGVtZW50OiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSwgb25JbnB1dDogKCkgPT4gdm9pZCkge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpbnB1dEVsZW1lbnQuZWxlbWVudC5pbnB1dChvbklucHV0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0QWxsKHA6IHA1LCB0YWdOYW1lOiBzdHJpbmcsIGNvbnRhaW5lcjogcDUuRWxlbWVudCk6IHA1LkVsZW1lbnRbXSB7XHJcbiAgICBpZiAoY29udGFpbmVyLmlkKCkgPT09IFwiXCIpIHtcclxuICAgICAgICB0aHJvdyBcImVycm9yOiBjb250YWluZXIgdXNlZCB3aXRoIHNlbGVjdEFsbCBtdXN0IGhhdmUgYW4gaWRcIjtcclxuICAgIH1cclxuICAgIGxldCBpZCA9IFwiI1wiICsgY29udGFpbmVyLmlkKCk7XHJcbiAgICByZXR1cm4gcC5zZWxlY3RBbGwodGFnTmFtZSwgaWQpO1xyXG59XHJcbiIsImltcG9ydCB7TW9kZSwgTm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmd9IGZyb20gXCIuL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1N0ZXBmaWxlLCBTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZSwgQXVkaW9GaWxlU3RhdGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQbGF5aW5nRGlzcGxheX0gZnJvbSBcIi4vcGxheWluZ19kaXNwbGF5XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdElmVW5kZWZpbmVkKHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnN0YXRlID0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0cmFja3NbaV1bal0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5NSU5FOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrc1tpXVtqXS50eXBlID0gTm90ZVR5cGUuTk9ORTsgLy9UT0RPOiBpbXBsZW1lbnQgbWluZXNcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT05FOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5ST0xMX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnR5cGUgPSBOb3RlVHlwZS5IT0xEX0hFQUQ7IC8vVE9ETzogaW1wbGVtZW50IHJvbGxzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pc3NCb3VuZGFyeShjdXJyZW50VGltZTogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgbGV0IG1pc3NCb3VuZGFyeSA9IGN1cnJlbnRUaW1lICsgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLnVwcGVyQm91bmQgLyAxMDAwKTsgLy9yZXN1bHQgaXMgaW4gc2Vjb25kc1xyXG4gICAgcmV0dXJuIG1pc3NCb3VuZGFyeTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5QmluZGluZ3NEZWZpbmVkKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUtleUJpbmRpbmdzKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICBsZXQgbWFwcGluZzogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgIGlmIChudW1UcmFja3MgPD0gOSkge1xyXG4gICAgICAgIGxldCBrZXlTZXF1ZW5jZSA9IFtcIkFcIiwgXCJTXCIsIFwiRFwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiLCBcIkpcIiwgXCJLXCIsIFwiTFwiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlTdHJpbmcgPSBrZXlTZXF1ZW5jZVtpXTtcclxuICAgICAgICAgICAgbWFwcGluZy5wdXNoKHt0cmFja051bWJlcjogaSwga2V5Q29kZToga2V5U3RyaW5nLmNoYXJDb2RlQXQoMCksIHN0cmluZzoga2V5U3RyaW5nfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobnVtVHJhY2tzID4gMjYpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkbid0IGdlbmVyYXRlIGRlZmF1bHQga2V5IGJpbmRpbmdzIGZvciBtb3JlIHRoYW4gMjYgdHJhY2tzLiBSYW4gb3V0IG9mIGxldHRlcnMhXCIpO1xyXG4gICAgICAgICAgICBudW1UcmFja3MgPSAyNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hhcmFjdGVyQ29kZSA9IFwiQVwiLmNoYXJDb2RlQXQoMCkgKyBpOyAvLyBUaGlzIGlzIGFuIEFTQ0lJIGNoYXJhY3RlciBjb2RlXHJcbiAgICAgICAgICAgIG1hcHBpbmcucHVzaCh7dHJhY2tOdW1iZXI6IGksIGtleUNvZGU6IGNoYXJhY3RlckNvZGUsIHN0cmluZzogU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyYWN0ZXJDb2RlKX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLnNldChudW1UcmFja3MsIG1hcHBpbmcpO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRDb25maWdLZXlCaW5kaW5nKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nKSB7XHJcbiAgICBsZXQgYmluZGluZ0luZGV4ID0gZ2V0SW5kZXhPZlRyYWNrTnVtYmVyQmluZGluZyh0cmFja051bWJlciwgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSk7XHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpW2JpbmRpbmdJbmRleF0gPSBrZXlCaW5kaW5nO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgZSB0byBiZSBhbiBlbnVtXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnVtVG9TdHJpbmdBcnJheShlOiBhbnkpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhlKS5maWx0ZXIoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEluZGV4T2ZUcmFja051bWJlckJpbmRpbmcodHJhY2tOdW1iZXI6IG51bWJlciwgYmluZGluZ3M6IHsgdHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZyB9W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmluZGluZ3NbaV0udHJhY2tOdW1iZXIgPT09IHRyYWNrTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEtleVN0cmluZyhwOiBwNSkge1xyXG4gICAgcmV0dXJuIHAua2V5Lmxlbmd0aCA9PSAxID8gcC5rZXkudG9VcHBlckNhc2UoKSA6IHAua2V5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kZU9wdGlvbnNGb3JEaXNwbGF5KG1vZGVzQXNTdHJpbmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W10pOiBNb2RlW10ge1xyXG4gICAgbGV0IG1vZGVPcHRpb25zOiBNb2RlW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZXNBc1N0cmluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbW9kZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG1vZGVzQXNTdHJpbmdzW2ldO1xyXG4gICAgICAgIG1vZGVPcHRpb25zLnB1c2goe3R5cGU6IG1vZGUuZ2V0KFwidHlwZVwiKSwgZGlmZmljdWx0eTogbW9kZS5nZXQoXCJkaWZmaWN1bHR5XCIpLCBtZXRlcjogbW9kZS5nZXQoXCJtZXRlclwiKSwgaWQ6IGl9KTtcclxuICAgIH1cclxuICAgIG1vZGVPcHRpb25zLnNvcnQoY29tcGFyZU1vZGVPcHRpb25zKTtcclxuICAgIHJldHVybiBtb2RlT3B0aW9ucztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVNb2RlT3B0aW9ucyhhOiBNb2RlLCBiOiBNb2RlKSB7XHJcbiAgICBsZXQgdHlwZUEgPSBhLnR5cGUudG9VcHBlckNhc2UoKTtcclxuICAgIGxldCB0eXBlQiA9IGIudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKHR5cGVBICE9IHR5cGVCKSB7XHJcbiAgICAgICAgaWYgKHR5cGVBIDwgdHlwZUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGRpZmZpY3VsdHlBID0gYS5kaWZmaWN1bHR5LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IGRpZmZpY3VsdHlCID0gYi5kaWZmaWN1bHR5LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKGRpZmZpY3VsdHlBICE9IGRpZmZpY3VsdHlCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5QSkgLSBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5Qik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG1ldGVyQSA9IHBhcnNlRmxvYXQoYS5tZXRlcik7XHJcbiAgICAgICAgICAgIGxldCBtZXRlckIgPSBwYXJzZUZsb2F0KGIubWV0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobWV0ZXJBICE9IG1ldGVyQikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGVyQSAtIG1ldGVyQjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhLmlkID0gYi5pZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZmljdWx0eVJhbmsoZGlmZmljdWx0eTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKGRpZmZpY3VsdHkpIHtcclxuICAgICAgICBjYXNlIFwiQkVHSU5ORVJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgY2FzZSBcIkVBU1lcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgY2FzZSBcIk1FRElVTVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICBjYXNlIFwiSEFSRFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICBjYXNlIFwiQ0hBTExFTkdFXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA0O1xyXG4gICAgICAgIGNhc2UgXCJFRElUXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA1O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiA2O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGRpdjogcDUuRWxlbWVudCwgdGFnTmFtZTogc3RyaW5nKTogcDUuRWxlbWVudCB7XHJcbiAgICBsZXQgY2hpbGRyZW5Ob2RlcyA9IGRpdi5jaGlsZCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbk5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG5vZGU6IE5vZGUgPSBjaGlsZHJlbk5vZGVzW2ldO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSB0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwNS5FbGVtZW50KG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQmluZGluZ0luZm9Gb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBiaW5kaW5nczogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChiaW5kaW5nc1tpXS50cmFja051bWJlciA9PT0gdHJhY2tOdW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVByZXZpZXdOb3RlcyhudW1UcmFja3M6IG51bWJlcik6IE5vdGVbXVtdIHtcclxuICAgIGxldCBub3RlczogTm90ZVtdW10gPSBbXTtcclxuICAgIGxldCBpc0hvbGQgPSBmYWxzZTtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IDAuMTtcclxuICAgIGxldCB0aW1lSW5jcmVtZW50ID0gMC4zIC8gbnVtVHJhY2tzO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgIGxldCB0cmFjazogTm90ZVtdID0gW107XHJcbiAgICAgICAgaWYgKGlzSG9sZCkge1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vdGVUeXBlLkhPTERfSEVBRCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IE5vdGVTdGF0ZS5ERUZBVUxUXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vdGVUeXBlLlRBSUwsIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLCB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZSArIDAuMjUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJhY2sucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBOb3RlVHlwZS5OT1JNQUwsXHJcbiAgICAgICAgICAgICAgICB0eXBlU3RyaW5nOiBcIkRvbid0IENhcmVcIixcclxuICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IE5vdGVTdGF0ZS5ERUZBVUxUXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3Rlcy5wdXNoKHRyYWNrKTtcclxuICAgICAgICBpc0hvbGQgPSAhaXNIb2xkO1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IHRpbWVJbmNyZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm90ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY2N1cmFjeUV2ZW50TmFtZSh0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKTogc3RyaW5nIHtcclxuICAgIGlmIChjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIDwgY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0udXBwZXJCb3VuZCkge1xyXG4gICAgICAgIHJldHVybiBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5uYW1lOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzID49IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICByZXR1cm4gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0ubmFtZTsgLy8gSGFuZGxlIGJvbyBpZiBpdCBleGlzdHNcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbaV07XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgIT0gbnVsbCAmJiBhY2N1cmFjeS51cHBlckJvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzICYmIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY3VyYWN5Lm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJFUlJPUjogVW5rbm93biBhY2N1cmFjeVwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNGaWxlc1JlYWR5KHN0ZXBmaWxlOiBTdGVwZmlsZSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUpIHtcclxuICAgIGxldCBzdGVwZmlsZVJlYWR5ID0gc3RlcGZpbGUuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRCB8fFxyXG4gICAgICAgIHN0ZXBmaWxlLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgIGxldCBhdWRpb0ZpbGVSZWFkeSA9IGF1ZGlvRmlsZS5zdGF0ZSA9PT0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ7XHJcbiAgICByZXR1cm4gc3RlcGZpbGVSZWFkeSAmJiBhdWRpb0ZpbGVSZWFkeTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRQbGF5aW5nRGlzcGxheSh0cmFja3M6IE5vdGVbXVtdLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgZ2xvYmFsLnBsYXlpbmdEaXNwbGF5ID0gbmV3IFBsYXlpbmdEaXNwbGF5KHRyYWNrcywgYXVkaW9GaWxlLCBnbG9iYWwuY29uZmlnLCBnbG9iYWwucDVTY2VuZSk7XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHA1OyIsIm1vZHVsZS5leHBvcnRzID0gcGFrbzsiXSwic291cmNlUm9vdCI6IiJ9