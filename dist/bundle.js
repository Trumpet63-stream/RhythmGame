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
/* Lets us code the DOM UI elements as if it were "immediate", i.e. stateless.
 * All registered elements are removed when the page changes
 */
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
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(pauseAtStartInSecondsInput, () => {
            let value = pauseAtStartInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value >= 0) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.pauseAtStartInSeconds = value;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!pauseAtStartInSecondsInput.alreadyExists) {
            scrollDiv.element.child(pauseAtStartInSecondsInput.element.parent());
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
        }
        let scrollDirectionSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["createLabeledSelect"])("Scroll Direction", "scrollDirectionSelect", _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"], _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.scrollDirection, Options.OPTIONS_CLASS);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_1__["setOnInputUnlessItAlreadyExists"])(scrollDirectionSelect, () => {
            let value = String(scrollDirectionSelect.element.value());
            let enumOfValue = _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"][value];
            if (enumOfValue !== undefined) {
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.scrollDirection = enumOfValue;
                _index__WEBPACK_IMPORTED_MODULE_2__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(scrollDirectionSelect.element.parent());
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
    }
}
Options.OPTIONS_CLASS = "options";
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
    catch (e) { }
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
        this.topLeftY = 55;
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
/*! exports provided: drawHeading, setElementCenterPositionRelative, createLabeledInput, createLabel, createLabeledSelect, createLabeledTextArea, createFileInput, createLabeledCheckbox, YesNo, booleanToYesNo, encloseEachInputLabelPairIntoASubDiv, fixRadioDivElement, styleRadioOptions, setOnInputUnlessItAlreadyExists */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawHeading", function() { return drawHeading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementCenterPositionRelative", function() { return setElementCenterPositionRelative; });
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
    // @ts-ignore
    const inputs = p.selectAll('input', radioDivP5Element);
    // @ts-ignore
    const labels = p.selectAll('label', radioDivP5Element);
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
    // @ts-ignore
    let divs = p.selectAll('div', radioDivP5Element);
    for (let i = 0; i < divs.length; i++) {
        divs[i].addClass(styleClasses.join(" "));
    }
    // @ts-ignore
    let inputs = p.selectAll('input', radioDivP5Element);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addClass(styleClasses.join(" "));
    }
    // @ts-ignore
    let labels = p.selectAll('label', radioDivP5Element);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaHl0aG1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja19mbGFzaC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja190ZXh0LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9yZWNvcmRpbmcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2F1ZGlvX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvZGVmYXVsdF9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RlZmF1bHRfbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kaXNwbGF5X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RvbV93cmFwcGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kcmF3aW5nX3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2hvbGRfZ2xvdy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaG9sZF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9ob2xkX3BhcnRpY2xlcy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2tleV9iaW5kaW5nX2hlbHBlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMva2V5X2JpbmRpbmdzX3VpLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9rZXlib2FyZF9ldmVudF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9taXNzX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL25vdGVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9vbmxpbmVfcGxheWxpc3QudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3A1X3NjZW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXkudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXlfZnJvbV9maWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5X2Zyb21fb25saW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9yZXN1bHRzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL2J5dGVfcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3NtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3N3Zi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9zd2YtcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3N3Zi10YWdzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFydGljbGVfc3lzdGVtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5ZXJfa2V5X2FjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGxheWluZ19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5bGlzdF9jbGllbnQvcGFyc2luZ19oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnRfc3RhdGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9zb25nLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5bGlzdF9jbGllbnQvdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcHJldmlld19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9yZWNlcHRvcl9zaHJpbmtfcmVhY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3Jlc3VsdHNfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX2RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3N0ZXBmaWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy90aW1lX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3VpX3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS9leHRlcm5hbCBcInA1XCIiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS9leHRlcm5hbCBcInBha29cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztR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QUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDNUQsSUFBSSxRQUFRLENBQUMsVUFBVSxHQUFHLDRCQUE0QixJQUFJLDRCQUE0QixJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzNHLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQzthQUN4QjtTQUNKO0tBQ0o7SUFDRCxPQUFPLHlCQUF5QixDQUFDO0FBQ3JDLENBQUM7QUFFTSxTQUFTLFlBQVksQ0FBQyxRQUFrQixFQUFFLFNBQW9CO0lBQ2pFLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEtBQUssdURBQWEsQ0FBQyxnQkFBZ0I7UUFDakUsUUFBUSxDQUFDLEtBQUssS0FBSyx1REFBYSxDQUFDLFlBQVksQ0FBQztJQUNsRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsS0FBSyxLQUFLLDBEQUFjLENBQUMsUUFBUSxDQUFDO0lBQ2pFLE9BQU8sYUFBYSxJQUFJLGNBQWMsQ0FBQztBQUMzQyxDQUFDO0FBRU0sU0FBUyxrQkFBa0IsQ0FBQyxNQUFnQixFQUFFLFNBQW9CO0lBQ3JFLDZDQUFNLENBQUMsY0FBYyxHQUFHLElBQUksK0RBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLDZDQUFNLENBQUMsTUFBTSxFQUFFLDZDQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakcsQ0FBQzs7Ozs7Ozs7Ozs7O0FDcFBELG9COzs7Ozs7Ozs7OztBQ0FBLHNCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ0VudHJ5LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja0ZsYXNoIHtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtQ29sb3JlZEFjY3VyYWN5UmFua3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGZsYXNoRHVyYXRpb25JblNlY29uZHM6IG51bWJlciA9IDAuMTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lDb2xvcnM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLCBjb25maWc6IENvbmZpZywgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA9IHRoaXMuZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3ModGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUNvbG9ycyA9IFtcclxuICAgICAgICAgICAgWzE3OCwgOTQsIDI0NywgMTgwXSxcclxuICAgICAgICAgICAgWzMwLCAyMTcsIDEyNCwgMTYwXSxcclxuICAgICAgICAgICAgWzE5NiwgMTk5LCAzMCwgMTQwXSxcclxuICAgICAgICAgICAgWzI0NSwgMjEzLCAyMjEsIDEyMF1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLm51bUNvbG9yZWRBY2N1cmFjeVJhbmtzID4gdGhpcy5hY2N1cmFjeUNvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUNvbG9ycy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgW3RoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIDEwMF1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZsYXNoRm9yVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Rmxhc2hGb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5ID0gdGhpcy5nZXRUcmFja01vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAodGhpcy5pc0ZsYXNoSGFwcGVuaW5nKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSkpIHtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjdXJyZW50VGltZUluU2Vjb25kcywgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICBsZXQgZmxhc2hDb2xvcjogcDUuQ29sb3IgPSB0aGlzLmdldEZsYXNoQ29sb3IobW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpO1xyXG4gICAgICAgICAgICBsZXQgZWxhcHNlZFRpbWVJblNlY29uZHMgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZsYXNoKGVsYXBzZWRUaW1lSW5TZWNvbmRzLCBjZW50ZXJYLCBjZW50ZXJZLCBmbGFzaENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0ZsYXNoSGFwcGVuaW5nKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbMF0ubG93ZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCBhY2N1cmFjaWVzWzBdLnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbYWNjdXJhY2llcy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICAgICAgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA+PSBhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEhhbmRsZSBib28gaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWxhcHNlZFRpbWVJblNlY29uZHMgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICBpZiAoZWxhcHNlZFRpbWVJblNlY29uZHMgPiBBY2N1cmFjeUZlZWRiYWNrRmxhc2guZmxhc2hEdXJhdGlvbkluU2Vjb25kcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWVJblNlY29uZHMgLSBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUcmFja01vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KHRyYWNrTnVtYmVyOiBudW1iZXIpOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl07XHJcbiAgICAgICAgaWYgKHRyYWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXVt0cmFjay5sZW5ndGggLSAxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXRGbGFzaENvbG9yKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuayA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBjb2xvclZhbHVlcyA9IHRoaXMuYWNjdXJhY3lDb2xvcnNbYWNjdXJhY3lSYW5rIC0gMV07XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIHAuY29sb3IoY29sb3JWYWx1ZXNbMF0sIGNvbG9yVmFsdWVzWzFdLCBjb2xvclZhbHVlc1syXSwgY29sb3JWYWx1ZXNbM10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzc3VtZXMgc3ltbWV0cmljYWwgYWNjdXJhY3kgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3MoYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IG51bVJhbmtzID0gMTsgLy8gc3RhcnQgd2l0aCAxIGJlY2F1c2Ugd2UgYXQgbGVhc3QgaGF2ZSB0aGUgYmVzdCByYW5rXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlc3RBY2N1cmFjeUluZGV4ICsgMTsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kICE9PSB1bmRlZmluZWQgJiYgYWNjdXJhY3kudXBwZXJCb3VuZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBudW1SYW5rcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1SYW5rc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCAwICYmIDAgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyBhIHJhbmsgd2hlcmUgMSBpcyB0aGUgYmVzdFxyXG4gICAgcHJpdmF0ZSBnZXRBY2N1cmFjeVJhbmsoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSwgYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGlmIChhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgMCkge1xyXG4gICAgICAgICAgICBhY2N1cmFjaWVzID0gdGhpcy5nZXRSZXZlcnNlZChhY2N1cmFjaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJlc3RBY2N1cmFjeUluZGV4ID0gdGhpcy5nZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgY3VycmVudFJhbmsgPSAxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzICYmIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSYW5rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnRSYW5rKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmV2ZXJzZWQoYXJyYXk6IGFueVtdKSB7XHJcbiAgICAgICAgbGV0IGFycmF5Q29weTogYW55W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgYXJyYXlDb3B5LnB1c2goYXJyYXlbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlDb3B5O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0ZsYXNoKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgZmxhc2hTaXplOiBudW1iZXIgPSB0aGlzLmdldEZsYXNoU2l6ZShlbGFwc2VkVGltZUluU2Vjb25kcywgQWNjdXJhY3lGZWVkYmFja0ZsYXNoLmZsYXNoRHVyYXRpb25JblNlY29uZHMpO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIHAuZmlsbChjb2xvcik7XHJcbiAgICAgICAgLy8gcC5maWxsKDI1NSwgMjU1LCAyNTUsIDE1MCk7XHJcbiAgICAgICAgcC5ub1N0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuZHJhd1N0YXIocCwgMCwgMCwgZmxhc2hTaXplLCBmbGFzaFNpemUgKiAwLjQsIDQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGbGFzaFNpemUoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlciwgZmxhc2hEdXJhdGlvbkluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZsYXNoQ29tcGxldGlvblJhdGlvID0gZWxhcHNlZFRpbWVJblNlY29uZHMgLyBmbGFzaER1cmF0aW9uSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBtaW5TaXplID0gMDtcclxuICAgICAgICBsZXQgbWF4U2l6ZSA9IHRoaXMuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmludGVycG9sYXRlKG1pblNpemUsIG1heFNpemUsIGZsYXNoQ29tcGxldGlvblJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVycG9sYXRlKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3U3RhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHJhZGl1czE6IG51bWJlciwgcmFkaXVzMjogbnVtYmVyLCBucG9pbnRzOiBudW1iZXIpIHtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLlJBRElBTlMpO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHAuVFdPX1BJIC8gbnBvaW50cztcclxuICAgICAgICBsZXQgaGFsZkFuZ2xlID0gYW5nbGUgLyAyLjA7XHJcbiAgICAgICAgcC5iZWdpblNoYXBlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCBwLlRXT19QSTsgYSArPSBhbmdsZSkge1xyXG4gICAgICAgICAgICBsZXQgc3ggPSBjZW50ZXJYICsgcC5jb3MoYSkgKiByYWRpdXMyO1xyXG4gICAgICAgICAgICBsZXQgc3kgPSBjZW50ZXJZICsgcC5zaW4oYSkgKiByYWRpdXMyO1xyXG4gICAgICAgICAgICBwLnZlcnRleChzeCwgc3kpO1xyXG4gICAgICAgICAgICBzeCA9IGNlbnRlclggKyBwLmNvcyhhICsgaGFsZkFuZ2xlKSAqIHJhZGl1czE7XHJcbiAgICAgICAgICAgIHN5ID0gY2VudGVyWSArIHAuc2luKGEgKyBoYWxmQW5nbGUpICogcmFkaXVzMTtcclxuICAgICAgICAgICAgcC52ZXJ0ZXgoc3gsIHN5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5lbmRTaGFwZShwLkNMT1NFKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnR9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge1BhcnRpY2xlU3lzdGVtfSBmcm9tIFwiLi9wYXJ0aWNsZV9zeXN0ZW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bUNvbG9yZWRBY2N1cmFjeVJhbmtzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kczogbnVtYmVyID0gMS41O1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZVNldHRpbmdzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZVN5c3RlbXM6IFBhcnRpY2xlU3lzdGVtW107XHJcbiAgICBwcml2YXRlIGdyYXZpdHlEaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLm51bUNvbG9yZWRBY2N1cmFjeVJhbmtzID0gdGhpcy5nZXROdW1Db2xvcmVkQWNjdXJhY3lSYW5rcyh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZVNldHRpbmdzID0gW1xyXG4gICAgICAgICAgICBbMTc4LCA5NCwgMjQ3LCAzMF0sXHJcbiAgICAgICAgICAgIFszMCwgMjE3LCAxMjQsIDI1XSxcclxuICAgICAgICAgICAgWzE5NiwgMTk5LCAzMCwgMjBdLFxyXG4gICAgICAgICAgICBbMjQ1LCAyMTMsIDIyMSwgMTVdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB3aGlsZSAodGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA+IHRoaXMucGFydGljbGVTZXR0aW5ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVNldHRpbmdzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBbdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgMjBdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmdyYXZpdHlEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93biA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgZ3Jhdml0eTogcDUuVmVjdG9yID0gcC5jcmVhdGVWZWN0b3IoMCwgMjAwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMucHVzaChuZXcgUGFydGljbGVTeXN0ZW0oQWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcy5wYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kcywgZ3Jhdml0eSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJhbmRvbUludChtYXg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbdHJhY2tOdW1iZXJdLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGFydGljbGVzRm9yQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFdmVudEZvclBhcnRpY2xlcyhhY2N1cmFjeUV2ZW50KSkge1xyXG4gICAgICAgICAgICBsZXQgcmVjZXB0b3JUaW1lUG9zaXRpb24gPSBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHMgLSBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIC8gMTAwMDtcclxuICAgICAgICAgICAgbGV0IGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuZ2V0SW5pdGlhbFBvc2l0aW9uKHAsIGFjY3VyYWN5RXZlbnQudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLFxyXG4gICAgICAgICAgICAgICAgcmVjZXB0b3JUaW1lUG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbFZlbG9jaXR5ID0gcC5jcmVhdGVWZWN0b3IoMCwgLTUwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZVNldHRpbmdzOiB7Y29sb3I6IHA1LkNvbG9yLCBudW1QYXJ0aWNsZXM6IG51bWJlciB9ID0gdGhpcy5nZXRQYXJ0aWNsZVNldHRpbmdzKGFjY3VyYWN5RXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1thY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyXS5hZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbiwgaW5pdGlhbFZlbG9jaXR5LFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzLCBwYXJ0aWNsZVNldHRpbmdzLm51bVBhcnRpY2xlcywgcGFydGljbGVTZXR0aW5ncy5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW5pdGlhbFBvc2l0aW9uKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjZW50ZXJUaW1lSW5TZWNvbmRzLCBjZW50ZXJUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVWZWN0b3IoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0V2ZW50Rm9yUGFydGljbGVzKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbMF0ubG93ZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCBhY2N1cmFjaWVzWzBdLnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbYWNjdXJhY2llcy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICAgICAgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA+PSBhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEhhbmRsZSBib28gaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldFBhcnRpY2xlU2V0dGluZ3MoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjaWVzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBsZXQgYWNjdXJhY3lSYW5rID0gdGhpcy5nZXRBY2N1cmFjeVJhbmsoYWNjdXJhY3lFdmVudCwgYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IHBhcnRpY2xlU2V0dGluZ3MgPSB0aGlzLnBhcnRpY2xlU2V0dGluZ3NbYWNjdXJhY3lSYW5rIC0gMV07XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIHtjb2xvcjogcC5jb2xvcihwYXJ0aWNsZVNldHRpbmdzWzBdLCBwYXJ0aWNsZVNldHRpbmdzWzFdLCBwYXJ0aWNsZVNldHRpbmdzWzJdKSxcclxuICAgICAgICAgICAgbnVtUGFydGljbGVzOiBwYXJ0aWNsZVNldHRpbmdzWzNdfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBudW1SYW5rcyA9IDE7IC8vIHN0YXJ0IHdpdGggMSBiZWNhdXNlIHdlIGF0IGxlYXN0IGhhdmUgdGhlIGJlc3QgcmFua1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleCArIDE7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPT0gdW5kZWZpbmVkICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbnVtUmFua3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtUmFua3NcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgMCAmJiAwIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgYSByYW5rIHdoZXJlIDEgaXMgdGhlIGJlc3RcclxuICAgIHByaXZhdGUgZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8IDApIHtcclxuICAgICAgICAgICAgYWNjdXJhY2llcyA9IHRoaXMuZ2V0UmV2ZXJzZWQoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRSYW5rID0gMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXg7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAmJiBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UmFuaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50UmFuaysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJldmVyc2VkKGFycmF5OiBhbnlbXSkge1xyXG4gICAgICAgIGxldCBhcnJheUNvcHk6IGFueVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGFycmF5Q29weS5wdXNoKGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Q29weTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmcsIEFjY3VyYWN5UmVjb3JkaW5nRW50cnl9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeUZlZWRiYWNrVGV4dCB7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZywgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGxhc3RFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSA9IHRoaXMuZ2V0TW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkoKTtcclxuICAgICAgICBpZiAobGFzdEV2ZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbWVTaW5jZUxhc3RFdmVudCA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gbGFzdEV2ZW50LnRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IHRleHRTaXplID0gdGhpcy5nZXRGb250U2l6ZSh0aW1lU2luY2VMYXN0RXZlbnQpO1xyXG4gICAgICAgIGlmICh0ZXh0U2l6ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGdldEFjY3VyYWN5RXZlbnROYW1lKGxhc3RFdmVudC5hY2N1cmFjeU1pbGxpcywgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHRoaXMuZHJhd0V2ZW50VGV4dChldmVudE5hbWUsIHRleHRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KCk6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkge1xyXG4gICAgICAgIGxldCBtb3N0UmVjZW50VHJhY2s6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnlbXSA9IFtdO1xyXG4gICAgICAgIGxldCBncmVhdGVzdFRpbWUgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nLmxlbmd0aDsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgIGlmICh0cmFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEV2ZW50VGltZSA9IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXVt0cmFjay5sZW5ndGggLSAxXS50aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RFdmVudFRpbWUgPiBncmVhdGVzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBsYXN0RXZlbnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmFjayA9IHRyYWNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb3N0UmVjZW50VHJhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9zdFJlY2VudFRyYWNrW21vc3RSZWNlbnRUcmFjay5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEZvbnRTaXplKHRpbWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG1heEZvbnRTaXplID0gMzA7XHJcbiAgICAgICAgaWYgKHRpbWUgPCAwLjEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWUgLyAwLjEgKiBtYXhGb250U2l6ZTtcclxuICAgICAgICB9IGVsc2UgaWYodGltZSA+PSAwLjEgJiYgdGltZSA8IDAuNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRpbWUgPj0gMC40ICYmIHRpbWUgPCAwLjcpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgxIC0gKHRpbWUgLSAwLjQpIC8gKDAuNyAtIDAuNCkpICogbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0V2ZW50VGV4dCh0ZXh0OiBzdHJpbmcsIHRleHRTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUiwgcC5DRU5URVIpO1xyXG4gICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgICAgIHAudGV4dCh0ZXh0LCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0tleVN0YXRlLCBQbGF5ZXJLZXlBY3Rpb259IGZyb20gXCIuL3BsYXllcl9rZXlfYWN0aW9uXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtnZXRBY2N1cmFjeUV2ZW50TmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxvd2VyQm91bmQ6IG51bWJlcjtcclxuICAgIHVwcGVyQm91bmQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxvd2VyQm91bmQgPSBsb3dlckJvdW5kO1xyXG4gICAgICAgIHRoaXMudXBwZXJCb3VuZCA9IHVwcGVyQm91bmQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgY29uZmlnOiBDb25maWcsIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcixcclxuICAgICAgICAgICAgICAgIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuaG9sZE1hbmFnZXIgPSBob2xkTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQgPSBoYW5kbGVBY2N1cmFjeUV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVQbGF5ZXJBY3Rpb24oYWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoYWN0aW9uLmtleVN0YXRlID09IEtleVN0YXRlLkRPV04pIHtcclxuICAgICAgICAgICAgdGhpcy50cnlUb0hpdE5vdGUoYWN0aW9uLmdhbWVUaW1lLCBhY3Rpb24udHJhY2spO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLmtleVN0YXRlID09PSBLZXlTdGF0ZS5VUCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkTWFuYWdlci5pc1RyYWNrSGVsZChhY3Rpb24udHJhY2spKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLnVuaG9sZFRyYWNrKGFjdGlvbi50cmFjaywgYWN0aW9uLmdhbWVUaW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5VG9SZWxlYXNlTm90ZShhY3Rpb24uZ2FtZVRpbWUsIGFjdGlvbi50cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cnlUb0hpdE5vdGUoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXggPSB0aGlzLmdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kcywgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmIChub3RlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbm90ZTogTm90ZSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobm90ZS50eXBlID09PSBOb3RlVHlwZS5OT1JNQUwpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSElUO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBub3RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChub3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5IRUxEOyAvLyBzZXQgdGhlIG5vdGUgdG8gaGVsZCBzbyBpdCB3b24ndCBjb3VudCBhcyBhIG1pc3NcclxuICAgICAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IChub3RlLnRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcykgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogbm90ZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLmhvbGRUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQ29uZmlndXJlZEZvckJvb3MoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBnZXRBY2N1cmFjeUV2ZW50TmFtZShJbmZpbml0eSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IEluZmluaXR5LFxyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBub3RlVHlwZTogTm90ZVR5cGUuTk9ORSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWFybGllc3RIaXR0YWJsZVVuaGl0Tm90ZUluZGV4KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5nZUluU2Vjb25kcygpO1xyXG4gICAgICAgIGxldCBoaXR0YWJsZVRpbWVSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSA9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SGl0dGFibGVSYW5nZShhY2N1cmFjeVJhbmdlLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGhpdHRhYmxlSW5kZXhSYW5nZTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSA9XHJcbiAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIuZ2V0Tm90ZXNCeVRpbWVSYW5nZShoaXR0YWJsZVRpbWVSYW5nZS5sZWFzdFRpbWUsIGhpdHRhYmxlVGltZVJhbmdlLmdyZWF0ZXN0VGltZSwgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVhcmxpZXN0VW5oaXROb3RlSW5kZXhJblJhbmdlKHRyYWNrTnVtYmVyLCBoaXR0YWJsZUluZGV4UmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjY3VyYWN5UmFuZ2VJblNlY29uZHMoKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5U2V0dGluZ3MgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGxldCBudW1TZXR0aW5ncyA9IGFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoO1xyXG4gICAgICAgIGxldCBsZWFzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgIGFjY3VyYWN5U2V0dGluZ3NbMV0ubG93ZXJCb3VuZCA6IGFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZDtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lO1xyXG4gICAgICAgIGlmIChhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAxXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge2xlYXN0VGltZTogbGVhc3RUaW1lIC8gMTAwMCwgZ3JlYXRlc3RUaW1lOiBncmVhdGVzdFRpbWUgLyAxMDAwfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIaXR0YWJsZVJhbmdlKGFjY3VyYWN5UmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0sIHJlY2VwdG9yVGltZVBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZWFzdFRpbWU6IHJlY2VwdG9yVGltZVBvc2l0aW9uICsgYWNjdXJhY3lSYW5nZS5sZWFzdFRpbWUsXHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZTogcmVjZXB0b3JUaW1lUG9zaXRpb24gKyBhY2N1cmFjeVJhbmdlLmdyZWF0ZXN0VGltZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFYXJsaWVzdFVuaGl0Tm90ZUluZGV4SW5SYW5nZSh0cmFja051bWJlcjogbnVtYmVyLCBub3RlSW5kZXhSYW5nZTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBub3RlSW5kZXhSYW5nZS5zdGFydEluZGV4OyBpIDwgbm90ZUluZGV4UmFuZ2UuZW5kSW5kZXhOb3RJbmNsdXNpdmU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2ldLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc0NvbmZpZ3VyZWRGb3JCb29zKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeVRvUmVsZWFzZU5vdGUoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXggPSB0aGlzLmdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kcywgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmIChub3RlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbm90ZSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobm90ZS50eXBlID09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBob2xkID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW25vdGVJbmRleCAtIDFdOyAvLyBnZXQgdGhlIGhvbGQgYmVsb25naW5nIHRvIHRoaXMgdGFpbFxyXG4gICAgICAgICAgICAgICAgaG9sZC5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGNoYW5nZSB0aGUgaG9sZCBzdGF0ZSBmcm9tIEhFTEQgdG8gSElUXHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSB0YWlsIG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBcIlJlbGVhc2UgXCIgKyBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IG5vdGUudHlwZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gbGV0IGdvIHRvbyBlYXJseVxyXG4gICAgICAgICAgICAvLyBDb3VsZCB0aGlzIHJldHVybiAtMT9cclxuICAgICAgICAgICAgbGV0IGhvbGRTdGFydEluZGV4ID0gdGhpcy5ub3RlTWFuYWdlci5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShjdXJyZW50VGltZUluU2Vjb25kcywgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdKTtcclxuICAgICAgICAgICAgbGV0IGhvbGQgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXggLSAxXTtcclxuICAgICAgICAgICAgbGV0IHRhaWwgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoaG9sZC50eXBlID09IE5vdGVUeXBlLkhPTERfSEVBRCAmJiB0YWlsLnR5cGUgPT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4IC0gMV0uc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBoaXQgdGhlIHN0YXJ0IG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXhdLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSB0YWlsIG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogXCJSZWxlYXNlIFwiICsgZ2V0QWNjdXJhY3lFdmVudE5hbWUoSW5maW5pdHksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IEluZmluaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBOb3RlVHlwZS5OT05FLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBJdCdzIHBvc3NpYmxlIHRoYXQgdGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIHJhY2UgY29uZGl0aW9uIGJldHdlZW4gdGhlIGtleSBldmVudCBhbmQgdGhlIGFuaW1hdGlvbiBsb29wLiBEb24ndCB0aHJvdyBhbiBlcnJvciBmb3Igbm93XHJcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBcIkVycm9yOiBSZWxlYXNlIG1pc3MgZmFpbGVkIHRvIHRyaWdnZXIgb24gbm90ZSBpbmRleCBcIiArIChob2xkU3RhcnRJbmRleCAtIDEpICsgXCIsIHRyYWNrIGluZGV4IFwiICsgdHJhY2tOdW1iZXIgKyBcIiBhdCB0aW1lIFwiICsgY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcblxyXG5leHBvcnQgZW51bSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlIHtcclxuICAgIElOQ09NUExFVEUsXHJcbiAgICBSRUFEWSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY2N1cmFjeUV2ZW50IHtcclxuICAgIGFjY3VyYWN5TmFtZTogc3RyaW5nLFxyXG4gICAgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgIGFjY3VyYWN5TWlsbGlzOiBudW1iZXIsXHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGVcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgIGFjY3VyYWN5TWlsbGlzOiBudW1iZXIsXHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5UmVjb3JkaW5nIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZTtcclxuICAgIHB1YmxpYyByZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnlbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGUuSU5DT01QTEVURTtcclxuICAgICAgICB0aGlzLnJlY29yZGluZyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRpbmcucHVzaChbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvcmRBY2N1cmFjeUV2ZW50KGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnJlY29yZGluZ1thY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyXS5wdXNoKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyxcclxuICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBhY2N1cmFjeUV2ZW50Lm5vdGVUeXBlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgZW51bSBBdWRpb0ZpbGVTdGF0ZSB7XHJcbiAgICBOT19BVURJT19GSUxFLFxyXG4gICAgRE9ORV9SRUFESU5HLFxyXG4gICAgQlVGRkVSRUQsXHJcbiAgICBFUlJPUixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1ZGlvRmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IEF1ZGlvRmlsZVN0YXRlO1xyXG4gICAgcHVibGljIGZpbGU6IEZpbGU7XHJcbiAgICBwdWJsaWMgYmxvYjogQmxvYlxyXG4gICAgcHVibGljIGF1ZGlvU291cmNlOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGU7XHJcbiAgICBwdWJsaWMgYXVkaW9Db250ZXh0OiBBdWRpb0NvbnRleHQ7XHJcbiAgICBwdWJsaWMgYXVkaW9CdWZmZXI6IEF1ZGlvQnVmZmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEZpbGUoZmlsZTogcDUuRmlsZSkge1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGUuZmlsZTsgLy8gdGhpcyB1bndyYXBzIHRoZSBwNS5GaWxlIHdyYXBwZXIgdG8gZ2V0IHRoZSBvcmlnaW5hbCBET00gZmlsZVxyXG4gICAgICAgIHRoaXMubG9hZEF1ZGlvRGF0YSh0aGlzLmZpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkQmxvYihibG9iOiBCbG9iKSB7XHJcbiAgICAgICAgdGhpcy5ibG9iID0gYmxvYjtcclxuICAgICAgICB0aGlzLmxvYWRBdWRpb0RhdGEodGhpcy5ibG9iKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRBdWRpb0RhdGEoYXVkaW9EYXRhOiBGaWxlIHwgQmxvYikge1xyXG4gICAgICAgIHRoaXMubG9hZFNvdW5kRmlsZShhdWRpb0RhdGEsICgob25GaWxlUmVhZDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5kZWNvZGVBdWRpb0RhdGEoPEFycmF5QnVmZmVyPm9uRmlsZVJlYWQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlQXVkaW9EYXRhKGF1ZGlvRGF0YTogQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYXVkaW9EYXRhKS50aGVuKCgoYnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0J1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2l0aCBkZWNvZGluZyBhdWRpbyBkYXRhXCIgKyBlLmVycik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREdXJhdGlvbigpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIuZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXkoZGVsYXlJblNlY29uZHM6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZGVsYXlJblNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVTb3VyY2VOb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWNyZWF0ZVNvdXJjZU5vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gdGhpcy5hdWRpb0J1ZmZlcjtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRTb3VuZEZpbGUoXHJcbiAgICAgICAgZmlsZTogQmxvYiB8IEZpbGUsXHJcbiAgICAgICAgbGlzdGVuZXI6IChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4gYW55LFxyXG4gICAgICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnNcclxuICAgICkge1xyXG4gICAgICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7ZGVmYXVsdElmVW5kZWZpbmVkfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7REVGQVVMVF9DT05GSUd9IGZyb20gXCIuL2RlZmF1bHRfY29uZmlnXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcblxyXG4vKiBTdG9yZXMgdXNlciBzZXR0aW5ncy4gRXhwZWN0ZWQgbm90IHRvIGNoYW5nZSBkdXJpbmcgcGxheSAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuICAgIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4gICAgcmVjZXB0b3JZUGVyY2VudDogbnVtYmVyO1xyXG4gICAgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdO1xyXG4gICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBrZXlCaW5kaW5nczogTWFwPG51bWJlciwgS2V5QmluZGluZ1tdPjtcclxuICAgIGdhbWVBcmVhSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBnYW1lQXJlYVdpZHRoOiBudW1iZXI7XHJcbiAgICBub3RlU2l6ZTogbnVtYmVyO1xyXG4gICAgcXVpdEtleTogbnVtYmVyO1xyXG4gICAgaXNBY2N1cmFjeUZsYXNoRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaXNBY2N1cmFjeVRleHRFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaXNIb2xkUGFydGljbGVzRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzSG9sZEdsb3dFbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBwaXhlbHNQZXJTZWNvbmQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZXB0b3JZUGVyY2VudD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxEaXJlY3Rpb24/OiBTY3JvbGxEaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcz86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzPzogQWNjdXJhY3lbXSxcclxuICAgICAgICAgICAgICAgICAgICBwYXVzZUF0U3RhcnRJblNlY29uZHM/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5QmluZGluZ3M/OiBNYXA8bnVtYmVyLCBLZXlCaW5kaW5nW10+LFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVBcmVhSGVpZ2h0PzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVBcmVhV2lkdGg/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpdEtleT86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBpc0FjY3VyYWN5Rmxhc2hFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeVRleHRFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0hvbGRQYXJ0aWNsZXNFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0hvbGRHbG93RW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmdhbWVBcmVhSGVpZ2h0ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuZ2FtZUFyZWFIZWlnaHQsIERFRkFVTFRfQ09ORklHLmdhbWVBcmVhSGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmdhbWVBcmVhV2lkdGggPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5nYW1lQXJlYVdpZHRoLCBERUZBVUxUX0NPTkZJRy5nYW1lQXJlYVdpZHRoKTtcclxuICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnBpeGVsc1BlclNlY29uZCwgREVGQVVMVF9DT05GSUcucGl4ZWxzUGVyU2Vjb25kKTtcclxuICAgICAgICB0aGlzLnNjcm9sbERpcmVjdGlvbiA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnNjcm9sbERpcmVjdGlvbiwgREVGQVVMVF9DT05GSUcuc2Nyb2xsRGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gTk9URTogU2Nyb2xsIGRpcmVjdGlvbiBhbmQgZ2FtZUFyZWFIZWlnaHQgbXVzdCBiZSBzZXQgQkVGT1JFIHNldHRpbmcgcmVjZXB0b3JZUG9zaXRpb25cclxuICAgICAgICB0aGlzLnJlY2VwdG9yWVBlcmNlbnQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5yZWNlcHRvcllQZXJjZW50LCBERUZBVUxUX0NPTkZJRy5yZWNlcHRvcllQZXJjZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcywgREVGQVVMVF9DT05GSUcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVNldHRpbmdzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuYWNjdXJhY3lTZXR0aW5ncywgREVGQVVMVF9DT05GSUcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5wYXVzZUF0U3RhcnRJblNlY29uZHMgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5wYXVzZUF0U3RhcnRJblNlY29uZHMsIERFRkFVTFRfQ09ORklHLnBhdXNlQXRTdGFydEluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLm5vdGVTaXplLCBERUZBVUxUX0NPTkZJRy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5rZXlCaW5kaW5ncyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmtleUJpbmRpbmdzLCBERUZBVUxUX0NPTkZJRy5rZXlCaW5kaW5ncyk7XHJcbiAgICAgICAgdGhpcy5xdWl0S2V5ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucXVpdEtleSwgREVGQVVMVF9DT05GSUcucXVpdEtleSk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkLFxyXG4gICAgICAgICAgICBERUZBVUxUX0NPTkZJRy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNIb2xkUGFydGljbGVzRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0hvbGRHbG93RW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzSG9sZEdsb3dFbmFibGVkLCBERUZBVUxUX0NPTkZJRy5pc0hvbGRHbG93RW5hYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmUoKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZ1N0cmluZyA9IHRoaXMuZ2V0Q29uZmlnQXNTdHJpbmcoKTtcclxuICAgICAgICBsZXQgZXhwaXJlcyA9IHRoaXMuZ2V0RGF0ZU9mT25lWWVhckZyb21Ob3coKTtcclxuICAgICAgICBsZXQgcGF0aCA9ICcvJztcclxuICAgICAgICBsZXQgY29va2llU3RyaW5nID0gXCJjb25maWc9XCIgKyBlc2NhcGUoY29uZmlnU3RyaW5nKVxyXG4gICAgICAgICAgICArICc7cGF0aD0nICsgcGF0aFxyXG4gICAgICAgICAgICArICc7ZXhwaXJlcz0nICsgZXhwaXJlcy50b1VUQ1N0cmluZygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvb2tpZVN0cmluZyk7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llU3RyaW5nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZmlnIHNhdmVkIHRvIGNvb2tpZSFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb25maWdBc1N0cmluZygpIHtcclxuICAgICAgICBsZXQgc3RyaW5nOiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzKTtcclxuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgnLFwia2V5QmluZGluZ3NcIjp7fSwnLFxyXG4gICAgICAgICAgICAnLFwia2V5QmluZGluZ3NcIjonICsgdGhpcy5zdHJpbmdpZnlLZXlCaW5kaW5ncygpICsgJywnKTtcclxuICAgICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZCgpOiBDb25maWcge1xyXG4gICAgICAgIGxldCBjb25maWdDb29raWUgPSBDb25maWcuZ2V0RnJvbUNvb2tpZShcImNvbmZpZ1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb25maWdDb29raWUpO1xyXG4gICAgICAgIGlmIChjb25maWdDb29raWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdKU09OID0gSlNPTi5wYXJzZSh1bmVzY2FwZShjb25maWdDb29raWUpKTtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ0pTT04ua2V5QmluZGluZ3MgPSBuZXcgTWFwKGNvbmZpZ0pTT04ua2V5QmluZGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZzogQ29uZmlnID0gbmV3IENvbmZpZyhjb25maWdKU09OKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZmlnIGxvYWRlZCBmcm9tIGNvb2tpZSFcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICAgICAgfSBjYXRjaChlKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHZhbGlkIGNvb2tpZSBmb3VuZCwgcmV0dXJuaW5nIGRlZmF1bHQgY29uZmlnIVwiKTtcclxuICAgICAgICByZXR1cm4gbmV3IENvbmZpZyh7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXRlT2ZPbmVZZWFyRnJvbU5vdygpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0cmluZ2lmeUtleUJpbmRpbmdzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHN0cmluZyA9IFwiW1wiO1xyXG4gICAgICAgIHRoaXMua2V5QmluZGluZ3MuZm9yRWFjaCgodmFsdWU6IEtleUJpbmRpbmdbXSwga2V5OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgc3RyaW5nICs9IFwiW1wiKyBrZXkgKyBcIixcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArXCJdXCI7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBzdHJpbmcgKz0gXCJdXCI7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRGcm9tQ29va2llKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY29va2llXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCI7IFwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQocm93ID0+IHJvdy5zdGFydHNXaXRoKGtleSkpXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCI9XCIpWzFdO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGxldCBERUZBVUxUX0NPTkZJRyA9IHtcclxuICAgIHBpeGVsc1BlclNlY29uZDogNTUwLFxyXG4gICAgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24uRG93bixcclxuICAgIHJlY2VwdG9yWVBlcmNlbnQ6IDE1LFxyXG4gICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kczogMCxcclxuICAgIC8vIFRoaXMgaXMgYSBzeW1tZXRyaWNhbCB2ZXJzaW9uIG9mIEZGUidzIGFjY3VyYWN5XHJcbiAgICAvLyBUT0RPOiBBZGQgYSBsaXN0IG9mIHByZXNldHMgdGhhdCBsaXZlIGluIHRoZWlyIG93biBmaWxlXHJcbiAgICAvLyBUT0RPOiB2YWxpZGF0aW9uIG9uIGFjY3VyYWN5IHNldHRpbmdzIHRoYXQgZXhwbGFpbnMgd2h5IG1pc3Mgc2hvdWxkbid0IGhhdmUgbG93ZXIgYm91bmRcclxuICAgIGFjY3VyYWN5U2V0dGluZ3M6IFtcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJNaXNzXCIsIG51bGwsLTExNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQXZlcmFnZVwiLCAtMTE3LCAtODMpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkdvb2RcIiwgLTgzLCAtNTApLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIlBlcmZlY3RcIiwgLTUwLCAtMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkFtYXppbmdcIiwgLTE3LCAxNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiUGVyZmVjdFwiLCAxNywgNTApLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkdvb2RcIiwgNTAsIDgzKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBdmVyYWdlXCIsIDgzLCAxMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkJvb1wiLCAxMTcsIG51bGwpXHJcbiAgICBdLFxyXG4gICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzOiAwLFxyXG4gICAga2V5QmluZGluZ3M6IG5ldyBNYXAoKSxcclxuICAgIGdhbWVBcmVhSGVpZ2h0OiA2MDAsXHJcbiAgICBnYW1lQXJlYVdpZHRoOiA0MDAsXHJcbiAgICBub3RlU2l6ZTogMzAsXHJcbiAgICBxdWl0S2V5OiAyNywgLy8gUXVpdCBkZWZhdWx0cyB0byBlc2NhcGUga2V5XHJcbiAgICBpc0FjY3VyYWN5Rmxhc2hFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0FjY3VyYWN5VGV4dEVuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0hvbGRQYXJ0aWNsZXNFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNIb2xkR2xvd0VuYWJsZWQ6IHRydWUsXHJcbn07IiwiaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVmYXVsdE5vdGVTa2luIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd05vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gbm90ZVNpemU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgc3dpdGNoIChub3RlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcInZcIiwgY2VudGVyWCwgY2VudGVyWSArIDYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuUk9MTF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJ4XCIsIGNlbnRlclgsIGNlbnRlclkgKyA2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk1JTkU6XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAuY2lyY2xlKGNlbnRlclgsIGNlbnRlclksIDI0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJYXCIsIGNlbnRlclgsIGNlbnRlclkgKyA4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwiP1wiLCBjZW50ZXJYLCBjZW50ZXJZICsgNyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdSZWNlcHRvcih0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gbm90ZVNpemU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3SG9sZENvbm5lY3RvcihjZW50ZXJYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCBlbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplICogMC41O1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBzdGFydFksIHdpZHRoLCBlbmRZIC0gc3RhcnRZKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7RGVmYXVsdE5vdGVTa2lufSBmcm9tIFwiLi9kZWZhdWx0X25vdGVfc2tpblwiO1xyXG5cclxuY2xhc3MgTm90ZURpc3BsYXkge1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIG5vdGVTaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRyYWNrTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsIHNrZXRjaEluc3RhbmNlOiBwNSwgbm90ZVNpemU6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLm5vdGVUeXBlID0gbm90ZVR5cGU7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IG5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMudHJhY2tOdW1iZXIgPSB0cmFja051bWJlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc05vdGVEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3Tm90ZSh0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLFxyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclksIHRoaXMubm90ZVR5cGUsIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIGlmICghaXNOb3RlRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdOb3RlKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlVHlwZSxcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSG9sZENvbm5lY3RvciB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBzdGFydFk6IG51bWJlcjtcclxuICAgIGVuZFk6IG51bWJlcjtcclxuICAgIG5vdGVTdGFydFk6IG51bWJlcjtcclxuICAgIG5vdGVFbmRZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjZW50ZXJYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCBlbmRZOiBudW1iZXIsIG5vdGVTdGFydFk6IG51bWJlciwgbm90ZUVuZFk6IG51bWJlciwgc2tldGNoSW5zdGFuY2U6IHA1KSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5zdGFydFkgPSBzdGFydFk7XHJcbiAgICAgICAgdGhpcy5lbmRZID0gZW5kWTtcclxuICAgICAgICB0aGlzLm5vdGVTdGFydFkgPSBub3RlU3RhcnRZO1xyXG4gICAgICAgIHRoaXMubm90ZUVuZFkgPSBub3RlRW5kWTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc0Nvbm5lY3RvckRyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdIb2xkQ29ubmVjdG9yKHRoaXMuY2VudGVyWCwgdGhpcy5zdGFydFksIHRoaXMuZW5kWSxcclxuICAgICAgICAgICAgdGhpcy5ub3RlU3RhcnRZLCB0aGlzLm5vdGVFbmRZKTtcclxuICAgICAgICBpZiAoIWlzQ29ubmVjdG9yRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdIb2xkQ29ubmVjdG9yKHRoaXMuY2VudGVyWCwgdGhpcy5zdGFydFksIHRoaXMuZW5kWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBSZWNlcHRvciB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIHByaXZhdGUgbm90ZVNpemU6IG51bWJlclxyXG4gICAgcHJpdmF0ZSB0cmFja051bWJlcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgc2tldGNoSW5zdGFuY2U6IHA1LCBub3RlU2l6ZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSBjZW50ZXJZO1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBub3RlU2l6ZTtcclxuICAgICAgICB0aGlzLnRyYWNrTnVtYmVyID0gdHJhY2tOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaXNSZWNlcHRvckRyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdSZWNlcHRvcih0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLFxyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclksIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIGlmICghaXNSZWNlcHRvckRyYXdTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgIERlZmF1bHROb3RlU2tpbi5kcmF3UmVjZXB0b3IodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCwgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBEaXNwbGF5Q29uZmlnIHtcclxuLy8gICAgIHB1YmxpYyBub3RlU2l6ZTogbnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuLy8gICAgIHB1YmxpYyBzY3JvbGxEaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbjtcclxuLy8gICAgIHB1YmxpYyByZWNlcHRvclNpemVzOiBudW1iZXJbXTtcclxuLy9cclxuLy8gICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4vLyAgICAgICAgIHRoaXMubm90ZVNpemUgPSBjb25maWcubm90ZVNpemU7XHJcbi8vICAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBjb25maWcucGl4ZWxzUGVyU2Vjb25kO1xyXG4vLyAgICAgICAgIHRoaXMucmVjZXB0b3JZUGVyY2VudCA9IGNvbmZpZy5yZWNlcHRvcllQZXJjZW50O1xyXG4vLyAgICAgICAgIHRoaXMuc2Nyb2xsRGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbjtcclxuLy8gICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMgPSBbXTtcclxuLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMucmVjZXB0b3JTaXplcy5wdXNoKGNvbmZpZy5ub3RlU2l6ZSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vKiBBIHNldCBvZiBvcHRpb25zIHRoYXQgaW50ZXJzZWN0IHdpdGggdGhlIHVzZXIgQ29uZmlnLCBidXQgYXJlIGV4cGVjdGVkIHRvIGJlIGNoYW5nZWQgZHVyaW5nIHBsYXkgKi9cclxuZXhwb3J0IGludGVyZmFjZSBEaXNwbGF5Q29uZmlnIHtcclxuICAgIGdldE5vdGVTaXplOiAoKSA9PiBudW1iZXI7XHJcbiAgICBnZXRQaXhlbHNQZXJTZWNvbmQ6ICgpID0+IG51bWJlcjtcclxuICAgIGdldFJlY2VwdG9yWVBlcmNlbnQ6ICgpID0+IG51bWJlcjtcclxuICAgIGdldFNjcm9sbERpcmVjdGlvbjogKCkgPT4gU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgZ2V0UmVjZXB0b3JTaXplczogKCkgPT4gbnVtYmVyW107XHJcbiAgICBzZXRSZWNlcHRvclNpemU6ICh0cmFja051bWJlcjogbnVtYmVyLCByZWNlcHRvclNpemU6IG51bWJlcikgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERpc3BsYXlNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIHRvcExlZnRYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRvcExlZnRZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZywgc2tldGNoSW5zdGFuY2U6IHA1LCB0b3BMZWZ0WDogbnVtYmVyID0gMCxcclxuICAgICAgICAgICAgICAgIHRvcExlZnRZOiBudW1iZXIgPSAwLCB3aWR0aDogbnVtYmVyID0gMTgwLCBoZWlnaHQ6IG51bWJlciA9IDQwMCkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IGRpc3BsYXlDb25maWc7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMgPSAwO1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLnRvcExlZnRYID0gdG9wTGVmdFg7XHJcbiAgICAgICAgdGhpcy50b3BMZWZ0WSA9IHRvcExlZnRZO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSB0aGlzLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMgPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlLnJlY3QodGhpcy50b3BMZWZ0WCwgdGhpcy50b3BMZWZ0WSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuZHJhd05vdGVzQW5kQ29ubmVjdG9ycygpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JlY2VwdG9ycygpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZXNBbmRDb25uZWN0b3JzKCkge1xyXG4gICAgICAgIGxldCBsZWFzdFRpbWUgPSB0aGlzLmdldExlYXN0VGltZSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lID0gdGhpcy5nZXRHcmVhdGVzdFRpbWUodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5kcmF3QWxsQ29ubmVjdG9ycyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3QWxsTm90ZXMobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbE5vdGVzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBudW1UcmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdOb3Rlc0luVHJhY2sobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUsIGksIG51bVRyYWNrcywgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGVzSW5UcmFjayhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4UmFuZ2UgPSB0aGlzLm5vdGVNYW5hZ2VyLmdldE5vdGVzQnlUaW1lUmFuZ2UobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBsZXQgbm90ZXMgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl0uc2xpY2Uobm90ZUluZGV4UmFuZ2Uuc3RhcnRJbmRleCwgbm90ZUluZGV4UmFuZ2UuZW5kSW5kZXhOb3RJbmNsdXNpdmUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Tm90ZShub3Rlc1tpXSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3RlKG5vdGU6IE5vdGUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgICAgICBsZXQgeSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkobm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgIG5ldyBOb3RlRGlzcGxheSh4LCB5LCBub3RlLnR5cGUsIHRoaXMuc2tldGNoSW5zdGFuY2UsIHRoaXMuZGlzcGxheUNvbmZpZy5nZXROb3RlU2l6ZSgpLCB0cmFja051bWJlciwgbnVtVHJhY2tzKS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGVhc3RUaW1lKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdG90YWxEaXNwbGF5U2Vjb25kcyA9IHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC8gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZSAtIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvcllQZXJjZW50KCkgLyAxMDAgKiB0b3RhbERpc3BsYXlTZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R3JlYXRlc3RUaW1lKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdG90YWxEaXNwbGF5U2Vjb25kcyA9IHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC8gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZSArICgxIC0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yWVBlcmNlbnQoKSAvIDEwMCkgKiB0b3RhbERpc3BsYXlTZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROb3RlQ2VudGVyWCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByZWNlcHRvclNwYWNpbmcgPSB0aGlzLmdldERpc3BsYXlXaWR0aCgpIC8gbnVtVHJhY2tzIC0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldE5vdGVTaXplKCk7XHJcbiAgICAgICAgcmV0dXJuICgyICogdHJhY2tOdW1iZXIgKyAxKSAvIDIgKiAodGhpcy5kaXNwbGF5Q29uZmlnLmdldE5vdGVTaXplKCkgKyByZWNlcHRvclNwYWNpbmcpICsgdGhpcy50b3BMZWZ0WDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGVzc2VudGlhbGx5IGRlZmluZXMgYSBjb252ZXJzaW9uIGZyb20gc2Vjb25kcyB0byBwaXhlbHNcclxuICAgIHB1YmxpYyBnZXROb3RlQ2VudGVyWShub3RlVGltZUluU2Vjb25kczogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVZT2Zmc2V0ID0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpICogKG5vdGVUaW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCByZWNlcHRvcllPZmZzZXQgPSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JZUGVyY2VudCgpIC8gMTAwICogdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheUNvbmZpZy5nZXRTY3JvbGxEaXJlY3Rpb24oKSA9PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY2VwdG9yWU9mZnNldCArIG5vdGVZT2Zmc2V0ICsgdGhpcy50b3BMZWZ0WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLSAocmVjZXB0b3JZT2Zmc2V0ICsgbm90ZVlPZmZzZXQpICsgdGhpcy50b3BMZWZ0WTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsQ29ubmVjdG9ycyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3QWxsVHJhY2tDb25uZWN0b3JzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCB0cmFja3NbaV0sIGksXHJcbiAgICAgICAgICAgICAgICB0cmFja3MubGVuZ3RoLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsVHJhY2tDb25uZWN0b3JzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2s6IE5vdGVbXSwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlU3RhY2s6IE5vdGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb3RlOiBOb3RlID0gdHJhY2tbaV07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50aW1lSW5TZWNvbmRzIDwgbGVhc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50aW1lSW5TZWNvbmRzIDwgZ3JlYXRlc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE5vdGUgPSBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZE5vdGUgPSBjdXJyZW50Tm90ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnROb3RlICE9IHVuZGVmaW5lZCAmJiBlbmROb3RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCB8fCBzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDb25uZWN0b3Ioc3RhcnROb3RlLCBlbmROb3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm90ZVN0YWNrLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE5vdGUgPSBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZE5vdGUgPSBjdXJyZW50Tm90ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnROb3RlICE9IHVuZGVmaW5lZCAmJiBlbmROb3RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCB8fCBzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDb25uZWN0b3Ioc3RhcnROb3RlLCBlbmROb3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZTogTm90ZSwgZW5kTm90ZTogTm90ZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IG5vdGVTdGFydFkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKHN0YXJ0Tm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgbGV0IG5vdGVFbmRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShlbmROb3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuXHJcbiAgICAgICAgbGV0IGRyYXdTdGFydFk7XHJcbiAgICAgICAgaWYgKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuSEVMRCkge1xyXG4gICAgICAgICAgICBkcmF3U3RhcnRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShNYXRoLm1pbihjdXJyZW50VGltZSwgZW5kTm90ZS50aW1lSW5TZWNvbmRzKSwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFydFkgPSBub3RlU3RhcnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcmF3U3RhcnRZID0gdGhpcy5jbGFtcFZhbHVlVG9SYW5nZShkcmF3U3RhcnRZLCB0aGlzLnRvcExlZnRZLCB0aGlzLnRvcExlZnRZICsgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgZHJhd0VuZFkgPSBub3RlRW5kWVxyXG4gICAgICAgIGRyYXdFbmRZID0gdGhpcy5jbGFtcFZhbHVlVG9SYW5nZShkcmF3RW5kWSwgdGhpcy50b3BMZWZ0WSwgdGhpcy50b3BMZWZ0WSArIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbmV3IEhvbGRDb25uZWN0b3IoY2VudGVyWCwgZHJhd1N0YXJ0WSwgZHJhd0VuZFksIG5vdGVTdGFydFksIG5vdGVFbmRZLCB0aGlzLnNrZXRjaEluc3RhbmNlKS5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGFtcFZhbHVlVG9SYW5nZSh2YWx1ZTogbnVtYmVyLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgbG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlID4gdXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1JlY2VwdG9ycygpIHtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbmV3IFJlY2VwdG9yKHRoaXMuZ2V0Tm90ZUNlbnRlclgoaSwgbnVtVHJhY2tzKSwgdGhpcy5nZXROb3RlQ2VudGVyWSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UsIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvclNpemVzKClbaV0sIGksIG51bVRyYWNrcykuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbi8qIExldHMgdXMgY29kZSB0aGUgRE9NIFVJIGVsZW1lbnRzIGFzIGlmIGl0IHdlcmUgXCJpbW1lZGlhdGVcIiwgaS5lLiBzdGF0ZWxlc3MuXHJcbiAqIEFsbCByZWdpc3RlcmVkIGVsZW1lbnRzIGFyZSByZW1vdmVkIHdoZW4gdGhlIHBhZ2UgY2hhbmdlc1xyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERPTVdyYXBwZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVnaXN0cnk6IE1hcDxzdHJpbmcsIHA1LkVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIC8vIHVuaXF1ZUlEIHNob3VsZCBiZSB1bmlxdWUgd2l0aGluIGEgc2NlbmVcclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGNyZWF0ZUNhbGw6ICgpID0+IHA1LkVsZW1lbnQsIHVuaXF1ZUlkOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0cnkuaGFzKHVuaXF1ZUlkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5yZWdpc3RyeS5nZXQodW5pcXVlSWQpLFxyXG4gICAgICAgICAgICAgICAgYWxyZWFkeUV4aXN0czogdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlQ2FsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJ5LnNldCh1bmlxdWVJZCwgZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgYWxyZWFkeUV4aXN0czogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGVhclJlZ2lzdHJ5KCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0cnkuZm9yRWFjaCgodmFsdWUsIGtleSwgbWFwKSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVnaXN0cnkuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgcmVtb3ZlIHdhcyBzdWNjZXNzZnVsLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlRWxlbWVudEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJ5LmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5nZXQoaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJ5LmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0aGUgZWxlbWVudCBpZiBmb3VuZCwgb3RoZXJ3aXNlIHJldHVybnMgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRFbGVtZW50QnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0cnkuZ2V0KGlkKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtnZXRBY2N1cmFjeUV2ZW50TmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdBY2N1cmFjeUJhcnMocDogcDUsIGFjY3VyYWN5TGFiZWxzOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgdGV4dFNpemU6IG51bWJlciwgYmFyV2lkdGg6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFySGVpZ2h0OiBudW1iZXIsIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQm9vRm9yTGFzdEFjY3VyYWN5OiBib29sZWFuKSB7XHJcbiAgICBsZXQgbWF4VGV4dFdpZHRoID0gZ2V0TWF4VGV4dFdpZHRoKHAsIGFjY3VyYWN5TGFiZWxzLCB0ZXh0U2l6ZSk7XHJcbiAgICBsZXQgdG90YWxOb3RlcyA9IG5vdGVNYW5hZ2VyLmdldFRvdGFsTm90ZXMoKTtcclxuICAgIGxldCBiYXJTcGFjaW5nID0gMTA7XHJcbiAgICBsZXQgdG90YWxIZWlnaHQgPSBhY2N1cmFjeUxhYmVscy5sZW5ndGggKiBiYXJIZWlnaHQgKyAoYWNjdXJhY3lMYWJlbHMubGVuZ3RoIC0gMSkgKiBiYXJTcGFjaW5nO1xyXG4gICAgbGV0IHN0YXJ0WSA9IChwLmhlaWdodCAtIHRvdGFsSGVpZ2h0KSAvIDIgKyBiYXJIZWlnaHQgLyAyO1xyXG4gICAgc3RhcnRZICo9IDAuODsgLy8gc2hpZnQgdGhlIHJlc3VsdHMgdXAgdG8gbWFrZSByb29tIGZvciBleGl0IGJ1dHRvblxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjdXJhY3lMYWJlbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lMYWJlbCA9IGFjY3VyYWN5TGFiZWxzW2ldO1xyXG4gICAgICAgIGxldCBudW1BY2N1cmFjeUV2ZW50cyA9IGdldE51bUFjY3VyYWN5RXZlbnRzKGFjY3VyYWN5TGFiZWwsIGFjY3VyYWN5UmVjb3JkaW5nLCBhY2N1cmFjeU1hbmFnZXIpO1xyXG4gICAgICAgIGxldCBwZXJjZW50RmlsbGVkID0gbnVtQWNjdXJhY3lFdmVudHMgLyB0b3RhbE5vdGVzO1xyXG5cclxuICAgICAgICBpZiAoaXNCb29Gb3JMYXN0QWNjdXJhY3kgJiYgaSA9PT0gYWNjdXJhY3lMYWJlbHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBkcmF3QWNjdXJhY3lXaXRoTm9CYXIocCwgY2VudGVyWCwgc3RhcnRZICsgaSAqIChiYXJIZWlnaHQgKyBiYXJTcGFjaW5nKSwgYWNjdXJhY3lMYWJlbCxcclxuICAgICAgICAgICAgICAgIG51bUFjY3VyYWN5RXZlbnRzLnRvU3RyaW5nKCksIHRvdGFsTm90ZXMudG9TdHJpbmcoKSwgdGV4dFNpemUsIG1heFRleHRXaWR0aCwgYmFyV2lkdGgsIGJhckhlaWdodCwgcGVyY2VudEZpbGxlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZHJhd0FjY3VyYWN5QmFyKHAsIGNlbnRlclgsIHN0YXJ0WSArIGkgKiAoYmFySGVpZ2h0ICsgYmFyU3BhY2luZyksIGFjY3VyYWN5TGFiZWwsXHJcbiAgICAgICAgICAgICAgICBudW1BY2N1cmFjeUV2ZW50cy50b1N0cmluZygpLCB0b3RhbE5vdGVzLnRvU3RyaW5nKCksIHRleHRTaXplLCBtYXhUZXh0V2lkdGgsIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TnVtQWNjdXJhY3lFdmVudHMoYWNjdXJhY3lMYWJlbDogc3RyaW5nLCBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyKSB7XHJcbiAgICByZXR1cm4gYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nLnJlZHVjZSgoc3VtLCB0cmFja1JlY29yZGluZykgPT5cclxuICAgICAgICBzdW0gKyB0cmFja1JlY29yZGluZy5maWx0ZXIoYWNjdXJhY3lFdmVudCA9PlxyXG4gICAgICAgIGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMsIGFjY3VyYWN5TWFuYWdlci5jb25maWcpID09PSBhY2N1cmFjeUxhYmVsKS5sZW5ndGgsIDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNYXhUZXh0V2lkdGgocDogcDUsIHRleHRBcnJheTogc3RyaW5nW10sIHRleHRTaXplOiBudW1iZXIpIHtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgcC50ZXh0U2l6ZSh0ZXh0U2l6ZSk7XHJcbiAgICBsZXQgbWF4VGV4dFdpZHRoID0gdGV4dEFycmF5Lm1hcCgoc3RyaW5nKSA9PiBwLnRleHRXaWR0aChzdHJpbmcpKVxyXG4gICAgICAgIC5yZWR1Y2UoKG1heFdpZHRoLCB3aWR0aCkgPT4gTWF0aC5tYXgobWF4V2lkdGgsIHdpZHRoLCAtMSkpO1xyXG4gICAgcC5wb3AoKTtcclxuICAgIHJldHVybiBtYXhUZXh0V2lkdGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdBY2N1cmFjeUJhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGxhYmVsMTogc3RyaW5nLCBsYWJlbDI6IHN0cmluZywgbGFiZWwzOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNpemU6IG51bWJlciwgbGFyZ2VzdFRleHRXaWR0aDogbnVtYmVyLCBiYXJXaWR0aDogbnVtYmVyLCBiYXJIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIpIHtcclxuICAgIGxldCBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsID0gODtcclxuICAgIGxldCB0b3RhbFdpZHRoID0gbGFyZ2VzdFRleHRXaWR0aCArIHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgKyBiYXJXaWR0aDtcclxuICAgIGxldCBsYWJlbFJpZ2h0bW9zdFggPSBjZW50ZXJYIC0gdG90YWxXaWR0aCAvIDIgKyBsYXJnZXN0VGV4dFdpZHRoO1xyXG4gICAgZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHAsIGxhYmVsUmlnaHRtb3N0WCwgY2VudGVyWSwgbGFiZWwxLCB0ZXh0U2l6ZSk7XHJcblxyXG4gICAgbGV0IGJhclJpZ2h0WCA9IGNlbnRlclggKyB0b3RhbFdpZHRoIC8gMjtcclxuICAgIGxldCBiYXJMZWZ0WCA9IGJhclJpZ2h0WCAtIGJhcldpZHRoO1xyXG4gICAgbGV0IGJhckNlbnRlclggPSAoYmFyTGVmdFggKyBiYXJSaWdodFgpIC8gMjtcclxuICAgIGRyYXdQYXJ0aWFsbHlGaWxsZWRCYXIocCwgYmFyQ2VudGVyWCwgY2VudGVyWSwgYmFyV2lkdGgsIGJhckhlaWdodCwgcGVyY2VudEZpbGxlZCwgdGV4dFNpemUsIGxhYmVsMiwgbGFiZWwzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHA6IHA1LCByaWdodG1vc3RYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgdGV4dDogc3RyaW5nLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZSh0ZXh0U2l6ZSk7XHJcbiAgICBwLnRleHRBbGlnbihwLlJJR0hULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQodGV4dCwgcmlnaHRtb3N0WCwgY2VudGVyWSk7XHJcbiAgICBwLnBvcCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UGFydGlhbGx5RmlsbGVkQmFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRGaWxsZWQ6IG51bWJlciwgdGV4dFNpemU6IG51bWJlciwgc3RhcnRMYWJlbDogc3RyaW5nLCBlbmRMYWJlbDogc3RyaW5nKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAucmVjdE1vZGUocC5DRU5URVIpO1xyXG4gICAgcC5zdHJva2UoXCJ3aGl0ZVwiKTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBmaWxsZWQgcGFydCBvZiB0aGUgYmFyXHJcbiAgICBwLmZpbGwoXCJncmF5XCIpO1xyXG4gICAgcC5yZWN0KGNlbnRlclggLSAod2lkdGggKiAoMSAtIHBlcmNlbnRGaWxsZWQpIC8gMiksIGNlbnRlclksIHdpZHRoICogcGVyY2VudEZpbGxlZCwgaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBvdXRsaW5lIG9mIHRoZSBiYXJcclxuICAgIHAubm9GaWxsKCk7XHJcbiAgICBwLnJlY3QoY2VudGVyWCwgY2VudGVyWSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgbGFiZWxzIG9uIHRoZSBlbmRzIG9mIHRoZSBiYXJcclxuICAgIGxldCBsYWJlbFNpemUgPSAxLjUgKiB0ZXh0U2l6ZTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZShsYWJlbFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5MRUZULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQoc3RhcnRMYWJlbCwgY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSArIDIpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5SSUdIVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KGVuZExhYmVsLCBjZW50ZXJYICsgd2lkdGggLyAyLCBjZW50ZXJZICsgMik7XHJcbiAgICBwLnBvcCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3QWNjdXJhY3lXaXRoTm9CYXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBsYWJlbDE6IHN0cmluZywgbGFiZWwyOiBzdHJpbmcsIGxhYmVsMzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNpemU6IG51bWJlciwgbGFyZ2VzdFRleHRXaWR0aDogbnVtYmVyLCBiYXJXaWR0aDogbnVtYmVyLCBiYXJIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRGaWxsZWQ6IG51bWJlcikge1xyXG4gICAgbGV0IHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgPSA4O1xyXG4gICAgbGV0IHRvdGFsV2lkdGggPSBsYXJnZXN0VGV4dFdpZHRoICsgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCArIGJhcldpZHRoO1xyXG4gICAgbGV0IGxhYmVsUmlnaHRtb3N0WCA9IGNlbnRlclggLSB0b3RhbFdpZHRoIC8gMiArIGxhcmdlc3RUZXh0V2lkdGg7XHJcbiAgICBkcmF3UmlnaHRBbGlnbmVkTGFiZWwocCwgbGFiZWxSaWdodG1vc3RYLCBjZW50ZXJZLCBsYWJlbDEsIHRleHRTaXplKTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBhY2N1cmFjeSBjb3VudCBsYWJlbCBvbiB0aGUgbGVmdCBlbmQgb2YgdGhlIGJhclxyXG4gICAgbGV0IGxhYmVsU2l6ZSA9IDEuNSAqIHRleHRTaXplO1xyXG4gICAgbGV0IGJhclJpZ2h0WCA9IGNlbnRlclggKyB0b3RhbFdpZHRoIC8gMjtcclxuICAgIGxldCBiYXJMZWZ0WCA9IGJhclJpZ2h0WCAtIGJhcldpZHRoO1xyXG4gICAgbGV0IGJhckNlbnRlclggPSAoYmFyTGVmdFggKyBiYXJSaWdodFgpIC8gMjtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICBwLnRleHRTaXplKGxhYmVsU2l6ZSk7XHJcbiAgICBwLnRleHRBbGlnbihwLkxFRlQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChsYWJlbDIsIGJhckNlbnRlclggLSBiYXJXaWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAucG9wKCk7XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSG9sZEdsb3cge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgZ2xvd1N0YXJ0VGltZXM6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZG9udERyYXdGbGFnOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgc3RhdGljIGdsb3dQZXJpb2RJblNlY29uZHM6IG51bWJlciA9IDAuMztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuXHJcbiAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lcy5wdXNoKEhvbGRHbG93LmRvbnREcmF3RmxhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdICE9PSBIb2xkR2xvdy5kb250RHJhd0ZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsYXBzZWRUaW1lID0gY3VycmVudFRpbWVJblNlY29uZHMgLSB0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICAgICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbnRlclkgPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJZKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2xvd0FscGhhID0gdGhpcy5nZXRHbG93QWxwaGEoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdsb3dDb2xvciA9IHAuY29sb3IoMCwgMjU1LCAwLCBnbG93QWxwaGEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdsb3dTaXplID0gdGhpcy5nZXRHbG93U2l6ZShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdHbG93KHAsIGNlbnRlclgsIGNlbnRlclksIGdsb3dTaXplLCBnbG93U2l6ZSAvIDIsIGdsb3dDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3R2xvdyhwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLm5vU3Ryb2tlKCk7XHJcbiAgICAgICAgcC5maWxsKGNvbG9yKTtcclxuICAgICAgICBwLmVsbGlwc2UoY2VudGVyWCwgY2VudGVyWSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdsb3dBbHBoYShlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblRpbWUgPSBlbGFwc2VkVGltZUluU2Vjb25kcyAlIEhvbGRHbG93Lmdsb3dQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblJhdGlvID0gYW5pbWF0aW9uVGltZSAvIEhvbGRHbG93Lmdsb3dQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmlMZXJwKDAsIDUwLCBhbmltYXRpb25SYXRpbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRHbG93U2l6ZShlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblRpbWUgPSBlbGFwc2VkVGltZUluU2Vjb25kcyAlIEhvbGRHbG93Lmdsb3dQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblJhdGlvID0gYW5pbWF0aW9uVGltZSAvIEhvbGRHbG93Lmdsb3dQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IG1heFNpemUgPSB0aGlzLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5iaUxlcnAoMCwgbWF4U2l6ZSwgYW5pbWF0aW9uUmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmlMZXJwKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPCAwLjUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVycChtaW5WYWx1ZSwgbWF4VmFsdWUsIDEgLSByYXRpbyAvIDAuNSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVycChtaW5WYWx1ZSwgbWF4VmFsdWUsIDIgKiByYXRpbyAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxlcnAobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlciwgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyYXRpbyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGlvID4gMCAmJiByYXRpbyA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlICsgKG1heFZhbHVlIC0gbWluVmFsdWUpICogcmF0aW87XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXSA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl0gPSBIb2xkR2xvdy5kb250RHJhd0ZsYWc7XHJcbiAgICB9XHJcbn0iLCIvKiBUaGlzIGNsYXNzIGlzIGludGVuZGVkIG9ubHkgdG8gYmUgdXNlZCB0byBzdG9yZSB0aGUgaG9sZCBzdGF0ZSBmb3Igbm90ZXMgdGhhdCBjYW4gYmUgaGVsZC4gVGhpcyBzaG91bGRuJ3QgYmUgdXNlZFxyXG4gICBmb3Igbm9ybWFsIG5vdGVzIG9yIGdlbmVyYWwga2V5Ym9hcmQgc3RhdGUgKi9cclxuZXhwb3J0IGNsYXNzIEhvbGRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgaGVsZFRyYWNrczogYm9vbGVhbltdO1xyXG4gICAgcHJpdmF0ZSBvblRyYWNrSG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBvblRyYWNrVW5ob2xkOiAodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM/OiBudW1iZXIpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IobnVtVHJhY2tzOiBudW1iZXIsIG9uVHJhY2tIb2xkOiAodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM/OiBudW1iZXIpID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgICBvblRyYWNrVW5ob2xkOiAodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM/OiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVsZFRyYWNrcy5wdXNoKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vblRyYWNrSG9sZCA9IG9uVHJhY2tIb2xkO1xyXG4gICAgICAgIHRoaXMub25UcmFja1VuaG9sZCA9IG9uVHJhY2tVbmhvbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3NbdHJhY2tOdW1iZXJdID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uVHJhY2tIb2xkKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3NbdHJhY2tOdW1iZXJdID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vblRyYWNrVW5ob2xkKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1BhcnRpY2xlU3lzdGVtfSBmcm9tIFwiLi9wYXJ0aWNsZV9zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvbGRQYXJ0aWNsZXMge1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZVN5c3RlbXM6IFBhcnRpY2xlU3lzdGVtW107XHJcbiAgICBwcml2YXRlIHByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlc0xpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXIgPSAxLjU7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBkb250RHJhd0ZsYWc6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGljbGVQZXJpb2RJblNlY29uZHM6IG51bWJlciA9IDAuMDU7XHJcbiAgICBwcml2YXRlIGdyYXZpdHlEaXJlY3Rpb246IG51bWJlclxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlciwgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IGRpc3BsYXlNYW5hZ2VyO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eURpcmVjdGlvbiA9IGNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5Eb3duID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBncmF2aXR5OiBwNS5WZWN0b3IgPSBwLmNyZWF0ZVZlY3RvcigwLCAyMDAwICogdGhpcy5ncmF2aXR5RGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zLnB1c2gobmV3IFBhcnRpY2xlU3lzdGVtKEhvbGRQYXJ0aWNsZXMucGFydGljbGVzTGlmZXRpbWVJblNlY29uZHMsIGdyYXZpdHkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHMucHVzaChIb2xkUGFydGljbGVzLmRvbnREcmF3RmxhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRQYXJ0aWNsZXNUb1RyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW3RyYWNrTnVtYmVyXS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRQYXJ0aWNsZXNUb1RyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gIT09IEhvbGRQYXJ0aWNsZXMuZG9udERyYXdGbGFnKSB7XHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSArIEhvbGRQYXJ0aWNsZXMucGFydGljbGVQZXJpb2RJblNlY29uZHMgPCBjdXJyZW50VGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1RpbWVzdGFtcCA9IHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdICsgSG9sZFBhcnRpY2xlcy5wYXJ0aWNsZVBlcmlvZEluU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGxldCByZWNlcHRvclRpbWVQb3NpdGlvbiA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuZ2V0SW5pdGlhbFBvc2l0aW9uKHAsIHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgcmVjZXB0b3JUaW1lUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxWZWxvY2l0eSA9IHAuY3JlYXRlVmVjdG9yKDAsIC01MDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbdHJhY2tOdW1iZXJdLmFkZFJhbmRvbWl6ZWRQYXJ0aWNsZXMoaW5pdGlhbFBvc2l0aW9uLCBpbml0aWFsVmVsb2NpdHksIG5ld1RpbWVzdGFtcCxcclxuICAgICAgICAgICAgICAgICAgICAxLCBwLmNvbG9yKDAsIDI1NSwgMCwgMTUwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSA9IG5ld1RpbWVzdGFtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEluaXRpYWxQb3NpdGlvbihwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY2VudGVyVGltZUluU2Vjb25kcywgY2VudGVyVGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlVmVjdG9yKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSA9IEhvbGRQYXJ0aWNsZXMuZG9udERyYXdGbGFnO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge1N0ZXBmaWxlfSBmcm9tIFwiLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZX0gZnJvbSBcIi4vYXVkaW9fZmlsZVwiO1xyXG5pbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7T25saW5lUGxheWxpc3R9IGZyb20gXCIuL29ubGluZV9wbGF5bGlzdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbDogYW55ID0ge307XHJcbmdsb2JhbC5wNVNjZW5lID0gbmV3IFA1U2NlbmUoKTtcclxuZ2xvYmFsLmNvbmZpZyA9IENvbmZpZy5sb2FkKCk7XHJcbmdsb2JhbC5nbG9iYWxDbGFzcyA9IFwiZ2FtZVwiO1xyXG5nbG9iYWwub25saW5lUGxheWxpc3QgPSBuZXcgT25saW5lUGxheWxpc3QoKTsiLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnZXRLZXlTdHJpbmcsIHNldENvbmZpZ0tleUJpbmRpbmd9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ3NVaX0gZnJvbSBcIi4va2V5X2JpbmRpbmdzX3VpXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEtleUJpbmRpbmcge1xyXG4gICAgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgIGtleUNvZGU6IG51bWJlcixcclxuICAgIHN0cmluZzogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlCaW5kaW5nSGVscGVyIHtcclxuICAgIHByaXZhdGUgYmluZGluZ3NUb0FjcXVpcmU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY3VycmVudEJpbmRpbmdOdW1iZXI6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiaW5kaW5nc1RvQWNxdWlyZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSA9IGJpbmRpbmdzVG9BY3F1aXJlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBiaW5kTmV4dChwOiBwNSwga2V5QmluZGluZ3NRdWlja3N0YXJ0SWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBrZXliaW5kaW5nOiBLZXlCaW5kaW5nID0ge1xyXG4gICAgICAgICAgICB0cmFja051bWJlcjogdGhpcy5jdXJyZW50QmluZGluZ051bWJlcixcclxuICAgICAgICAgICAga2V5Q29kZTogcC5rZXlDb2RlLFxyXG4gICAgICAgICAgICBzdHJpbmc6IGdldEtleVN0cmluZyhwKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2V0Q29uZmlnS2V5QmluZGluZyh0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyLCB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlLCBrZXliaW5kaW5nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyKys7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyID49IHRoaXMuYmluZGluZ3NUb0FjcXVpcmUpIHtcclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLnVuYmluZEtleSgtMSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGtleUJpbmRpbmdzUXVpY2tzdGFydElkKS5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgICAgICAgICBLZXlCaW5kaW5nc1VpLm5vTG9uZ2VyV2FpdGluZ0Zvckxhc3RLZXkocCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgS2V5QmluZGluZ3NVaS5zY3JvbGxLZXlCaW5kaW5nSW50b1ZpZXcodGhpcy5jdXJyZW50QmluZGluZ051bWJlcik7XHJcbiAgICAgICAgICAgIEtleUJpbmRpbmdzVWkuaW5kaWNhdGVXYWl0aW5nRm9yS2V5KHAsIHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nSGVscGVyfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrLCBnZW5lcmF0ZVByZXZpZXdOb3RlcywgZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lLFxyXG4gICAgZ2V0S2V5U3RyaW5nLFxyXG4gICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzLFxyXG4gICAgaXNLZXlCaW5kaW5nc0RlZmluZWQsXHJcbiAgICBzZXRDb25maWdLZXlCaW5kaW5nXHJcbn0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge2NyZWF0ZUxhYmVsLCBjcmVhdGVMYWJlbGVkSW5wdXQsIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHN9IGZyb20gXCIuL3VpX3V0aWxcIjtcclxuaW1wb3J0IHtQcmV2aWV3RGlzcGxheX0gZnJvbSBcIi4vcHJldmlld19kaXNwbGF5XCI7XHJcbmltcG9ydCB7T3B0aW9uc30gZnJvbSBcIi4vcGFnZXMvb3B0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEtleUJpbmRpbmdzVWkge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgU0VUX0JVVFRPTl9JTkFDVElWRV9URVhUOiBzdHJpbmcgPSBcIlNldFwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgU0VUX0JVVFRPTl9BQ1RJVkVfVEVYVDogc3RyaW5nID0gXCJQcmVzcyBBbnkgS2V5XCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBudW1UcmFja3M6IG51bWJlciA9IDQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KHA6IHA1LCBwYXJlbnRFbGVtZW50OiBwNS5FbGVtZW50LCBwYWdlU3R5bGVDbGFzczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzU2VjdGlvbkhlYWRlciA9IHRoaXMuY3JlYXRlS2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyKCk7XHJcbiAgICAgICAgaWYgKCFrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNoaWxkKGtleUJpbmRpbmdzU2VjdGlvbkhlYWRlci5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm51bVRyYWNrcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5udW1UcmFja3MgPSA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJldmlld051bVRyYWNrcyA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIk51bWJlciBvZiBUcmFja3NcIiwgXCJwcmV2aWV3TnVtVHJhY2tzSW5wdXRcIixcclxuICAgICAgICAgICAgdGhpcy5udW1UcmFja3MudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhwcmV2aWV3TnVtVHJhY2tzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gcHJldmlld051bVRyYWNrcy5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSAmJiB2YWx1ZSA+IDAgJiYgdmFsdWUgPD0gMjYpIHtcclxuICAgICAgICAgICAgICAgIEtleUJpbmRpbmdzVWkucmVtb3ZlT2xkQmluZGluZ0J1dHRvbnModGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5udW1UcmFja3MgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyh2YWx1ZSksIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcHJldmlld051bVRyYWNrcy5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hpbGQocHJldmlld051bVRyYWNrcy5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIktleS1CaW5kaW5ncyBRdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgIH0sIFwia2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uXCIpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgbGV0IGtleUJpbmRpbmdzUXVpY2tzdGFydElkID0gXCJrZXliaW5kaW5ncy1xdWlja3N0YXJ0XCI7XHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKHBhZ2VTdHlsZUNsYXNzKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJrZXliaW5kaW5ncy1xdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5pZChrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCk7XHJcblxyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleWJpbmRpbmdIZWxwZXIgPSBuZXcgS2V5QmluZGluZ0hlbHBlcih0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEtleUJpbmRpbmdJbnRvVmlldygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdGVXYWl0aW5nRm9yS2V5KHAsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJpbmQgdGhpcyBhY3Rpb24gdG8gdGhlIFwiLTFcIiBrZXkgc28gdGhhdCBpdCBoYXBwZW5zIG9uIGFueSBrZXkgcHJlc3NcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oLTEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhpcyBjb2RlIGJlY2F1c2UgaXQncyB1c2VkIHRvIGluZGljYXRlIGlucHV0IHRoYXQncyBub3QgeWV0IGZpbmlzaGVkIHByb2Nlc3NpbmdcclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5rZXlDb2RlICE9PSAyMjkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5YmluZGluZ0hlbHBlci5iaW5kTmV4dChwLCBrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGlsZChrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzS2V5QmluZGluZ3NEZWZpbmVkKHRoaXMubnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplS2V5QmluZGluZ3ModGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleUJpbmRpbmdJbnB1dCA9IHRoaXMuY3JlYXRlS2V5QmluZGluZ0lucHV0KHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgcGFnZVN0eWxlQ2xhc3MpO1xyXG4gICAgICAgICAgICBpZiAoIWtleUJpbmRpbmdJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNoaWxkKGtleUJpbmRpbmdJbnB1dC5lbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVLZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIoKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuaHRtbChcclxuICAgICAgICAgICAgICAgICdLZXkgQmluZGluZ3MgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTJweFwiPih0cmFjayAxIGlzIHRoZSBsZWZ0bW9zdCB0cmFjayk8L3NwYW4+J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoXCJvcHRpb25zLWZyZWUtdGV4dFwiKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH0sIFwia2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUtleUJpbmRpbmdJbnB1dCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY3VzdG9tQ2xhc3M6IHN0cmluZylcclxuICAgICAgICA6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgbGV0IHNldEJ1dHRvbklkID0gdGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IGtleWJpbmRpbmdJbnB1dENsYXNzID0gXCJrZXliaW5kaW5nLWlucHV0XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgXCJcIik7XHJcbiAgICAgICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICAgICAgbGFiZWwuYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXRCdXR0b24gPSBwLmNyZWF0ZUJ1dHRvbihcIlNldFwiKTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24uaWQoc2V0QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24ubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdGVXYWl0aW5nRm9yS2V5KHAsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oLTEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhpcyBjb2RlIGJlY2F1c2UgaXQncyB1c2VkIHRvIGluZGljYXRlIGlucHV0IHRoYXQncyBub3QgeWV0IGZpbmlzaGVkIHByb2Nlc3NpbmdcclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5rZXlDb2RlICE9PSAyMjkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlnS2V5QmluZGluZyh0cmFja051bWJlciwgbnVtVHJhY2tzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RyYWNrTnVtYmVyOiB0cmFja051bWJlciwga2V5Q29kZTogcC5rZXlDb2RlLCBzdHJpbmc6IGdldEtleVN0cmluZyhwKX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vTG9uZ2VyV2FpdGluZ0ZvcktleShzZXRCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KC0xKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9LCB0aGlzLmdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcblxyXG4gICAgICAgIGxldCB0cmFja0JpbmRpbmdJbmZvID0gZmluZEJpbmRpbmdJbmZvRm9yVHJhY2sodHJhY2tOdW1iZXIsIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcykpO1xyXG4gICAgICAgIGxldCBrZXlTdHJpbmcgPSB0cmFja0JpbmRpbmdJbmZvLnN0cmluZztcclxuICAgICAgICBsZXQgbGFiZWxTdHJpbmcgPSAnVHJhY2sgJyArICh0cmFja051bWJlciArIDEpICsgJzogPHNwYW4gY2xhc3M9XCInICtcclxuICAgICAgICAgICAga2V5YmluZGluZ0lucHV0Q2xhc3MgKyBcIiBcIiArIGN1c3RvbUNsYXNzICsgXCIgXCIgKyBnbG9iYWwuZ2xvYmFsQ2xhc3MgK1xyXG4gICAgICAgICAgICAnXCI+JyArIGtleVN0cmluZyArICc8L3NwYW4+JztcclxuICAgICAgICBsZXQgbGFiZWxFbGVtZW50ID0gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGNvbnRhaW5lci5lbGVtZW50LCBcIkxBQkVMXCIpO1xyXG4gICAgICAgIGxhYmVsRWxlbWVudC5odG1sKGxhYmVsU3RyaW5nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZGljYXRlV2FpdGluZ0ZvcktleShwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZXRCdXR0b25zOiBwNS5FbGVtZW50W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgc2V0QnV0dG9ucy5wdXNoKHRoaXMuZ2V0U2V0QnV0dG9uKHAsIGksIHRoaXMubnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNldEJ1dHRvbjogcDUuRWxlbWVudCA9IHNldEJ1dHRvbnNbaV07XHJcbiAgICAgICAgICAgIGlmIChpID09PSB0cmFja051bWJlcikge1xyXG4gICAgICAgICAgICAgICAgc2V0QnV0dG9uLmh0bWwodGhpcy5TRVRfQlVUVE9OX0FDVElWRV9URVhUKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldEJ1dHRvbi5odG1sKHRoaXMuU0VUX0JVVFRPTl9JTkFDVElWRV9URVhUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRTZXRCdXR0b24ocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKTogcDUuRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHNldEJ1dHRvbklkID0gdGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgcmV0dXJuIHAuc2VsZWN0KFwiI1wiICsgc2V0QnV0dG9uSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG5vTG9uZ2VyV2FpdGluZ0ZvcktleShzZXRCdXR0b246IHA1LkVsZW1lbnQpIHtcclxuICAgICAgICBzZXRCdXR0b24uaHRtbCh0aGlzLlNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBub0xvbmdlcldhaXRpbmdGb3JMYXN0S2V5KHA6IHA1KSB7XHJcbiAgICAgICAgbGV0IHNldEJ1dHRvbjogcDUuRWxlbWVudCA9IHRoaXMuZ2V0U2V0QnV0dG9uKHAsIHRoaXMubnVtVHJhY2tzIC0gMSwgdGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5odG1sKHRoaXMuU0VUX0JVVFRPTl9JTkFDVElWRV9URVhUKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykgKyBcIkJ1dHRvblwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEtleUJpbmRpbmdVbmlxdWVJZCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBcInRyYWNrXCIgKyB0cmFja051bWJlciArIFwiT2ZcIiArIG51bVRyYWNrcyArIFwiQmluZGluZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2Nyb2xsS2V5QmluZGluZ0ludG9WaWV3KHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQga2V5QmluZGluZ0J1dHRvbklkID0gdGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXlCaW5kaW5nQnV0dG9uSWQpLnBhcmVudEVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZU9sZEJpbmRpbmdCdXR0b25zKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IG51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEV2ZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGFjdGlvbkJpbmRpbmdzOiBNYXA8bnVtYmVyLCB7a2V5RG93bkFjdGlvbjogKCkgPT4gdm9pZCwga2V5VXBBY3Rpb246ICgpID0+IHZvaWR9PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwOiBwNSkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uQmluZGluZ3MgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgICAgIHAua2V5UHJlc3NlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyAtMSBpcyBhIHNwZWNpYWwga2V5Q29kZSBmbGFnIHRoYXQgbWVhbnMgXCJhbnlcIi4gVGhpcyBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBmb3Igc2V0dGluZyB1cCBrZXkgYmluZGluZ3MuXHJcbiAgICAgICAgICAgIGxldCBnbG9iYWxBY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQoLTEpO1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFsQWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsQWN0aW9ucy5rZXlEb3duQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxBY3Rpb25zLmtleURvd25BY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBFcXVpdmFsZW50IHRvIGV2ZW50LnByZXZlbnREZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbnMgPSB0aGlzLmFjdGlvbkJpbmRpbmdzLmdldChwLmtleUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLmtleURvd25BY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmtleURvd25BY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICBwLmtleVJlbGVhc2VkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQocC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMua2V5VXBBY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMua2V5VXBBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBFcXVpdmFsZW50IHRvIGV2ZW50LnByZXZlbnREZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRLZXlUb0FjdGlvbihrZXlDb2RlOiBudW1iZXIsIGtleURvd25BY3Rpb246ICgpID0+IHZvaWQsIGtleVVwQWN0aW9uOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25CaW5kaW5ncy5zZXQoa2V5Q29kZSwge2tleURvd25BY3Rpb246IGtleURvd25BY3Rpb24sIGtleVVwQWN0aW9uOiBrZXlVcEFjdGlvbn0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEtleShrZXlDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25CaW5kaW5ncy5kZWxldGUoa2V5Q29kZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dldE1pc3NCb3VuZGFyeX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lFdmVudCwgQWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pc3NNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgbGFzdENoZWNrZWROb3RlSW5kaWNlczogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXIsIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzLnB1c2goMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gaG9sZE1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50ID0gaGFuZGxlQWNjdXJhY3lFdmVudDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47IC8vIEEgbG93ZXJCb3VuZCBmb3IgbWlzc2VzIGlzIGluY29tcGF0aWJsZSB3aXRoIHRoaXMgd2F5IG9mIGRvaW5nIG1pc3Nlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBudW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBbGxNaXNzZWROb3Rlc0ZvclRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQWxsTWlzc2VkTm90ZXNGb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUgPSB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXNbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCB0cmFjazogTm90ZVtdID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleE9mTGFzdENoZWNrZWROb3RlID49IHRyYWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb3RlID0gdHJhY2tbaW5kZXhPZkxhc3RDaGVja2VkTm90ZV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTm90TWlzc2FibGUoY3VycmVudE5vdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleE9mTGFzdENoZWNrZWROb3RlKys7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05vdGVNaXNzZWRBbmROb3RIYW5kbGVkKGN1cnJlbnROb3RlLCBjdXJyZW50VGltZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTWlzc2VkTm90ZSh0cmFja051bWJlciwgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzW3RyYWNrTnVtYmVyXSA9IGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRm9yIGV4YW1wbGU6IG5vdGVzIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gaGl0IGFyZSBub3QgbWlzc2FibGVcclxuICAgIHByaXZhdGUgaXNOb3RNaXNzYWJsZShub3RlOiBOb3RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vdGUuc3RhdGUgIT09IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNOb3RlTWlzc2VkQW5kTm90SGFuZGxlZChub3RlOiBOb3RlLCBjdXJyZW50VGltZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG1pc3NCb3VuZGFyeSA9IGdldE1pc3NCb3VuZGFyeShjdXJyZW50VGltZSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBub3RlLnRpbWVJblNlY29uZHMgPCBtaXNzQm91bmRhcnkgJiYgbm90ZS5zdGF0ZSA9PT0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVNaXNzZWROb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIGluZGV4T2ZNaXNzZWROb3RlOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgbGV0IG1pc3NlZE5vdGUgPSB0cmFja1tpbmRleE9mTWlzc2VkTm90ZV07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLm5hbWUsXHJcbiAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IC1JbmZpbml0eSxcclxuICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgIG5vdGVUeXBlOiBtaXNzZWROb3RlLnR5cGVcclxuICAgICAgICB9KTtcclxuICAgICAgICBtaXNzZWROb3RlLnN0YXRlID0gTm90ZVN0YXRlLk1JU1NFRDtcclxuICAgICAgICBpZiAobWlzc2VkTm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRNYW5hZ2VyLmlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci51bmhvbGRUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpIC8vIEZvcmNlIGEgaG9sZCByZWxlYXNlIHVwb24gbWlzc2luZyB0aGUgdGFpbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChtaXNzZWROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dE5vdGUgPSB0cmFja1tpbmRleE9mTWlzc2VkTm90ZSArIDFdO1xyXG4gICAgICAgICAgICBpZiAobmV4dE5vdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0Tm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5NSVNTRUQ7IC8vIE1pc3MgdGhlIHRhaWwgd2hlbiB5b3UgbWlzcyB0aGUgaGVhZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGVNYW5hZ2VyIHtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgICAgIHRoaXMudHJhY2tzID0gdHJhY2tzO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlVW5zdXBwb3J0ZWROb3RlVHlwZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVVuc3VwcG9ydGVkTm90ZVR5cGVzKCkge1xyXG4gICAgICAgIGxldCBzdXBwb3J0ZWROb3RlVHlwZXM6IE5vdGVUeXBlW10gPSBbTm90ZVR5cGUuVEFJTCwgTm90ZVR5cGUuSE9MRF9IRUFELCBOb3RlVHlwZS5OT1JNQUxdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy50cmFja3MubGVuZ3RoOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFjazogTm90ZVtdID0gdGhpcy50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub3RlTnVtYmVyID0gMDsgbm90ZU51bWJlciA8IHRyYWNrLmxlbmd0aDsgbm90ZU51bWJlcisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90ZTogTm90ZSA9IHRyYWNrW25vdGVOdW1iZXJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdXBwb3J0ZWROb3RlVHlwZXMuaW5jbHVkZXMobm90ZS50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrLnNwbGljZShub3RlTnVtYmVyLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBub3RlTnVtYmVyLS07IC8vIGRlY3JlbWVudCBub3RlIG51bWJlciBzbyBuZXh0IGl0ZXJhdGlvbiBpdCBzdGFydHMgYXQgdGhlIHJpZ2h0IG5vdGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXROb3Rlc0J5VGltZVJhbmdlKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcik6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0ge1xyXG4gICAgICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgZmlyc3RGaW5kUmVzdWx0ID0gdGhpcy5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShsZWFzdFRpbWUsIHRyYWNrKTtcclxuICAgICAgICBpZiAoZmlyc3RGaW5kUmVzdWx0IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IC0xLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogLTF9OyAvLyBubyBub3RlcyBsZWZ0IGFmdGVyIGxlYXN0IHRpbWVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxhc3RGaW5kUmVzdWx0ID0gdGhpcy5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShncmVhdGVzdFRpbWUsIHRyYWNrLCBmaXJzdEZpbmRSZXN1bHQpO1xyXG4gICAgICAgIGlmIChsYXN0RmluZFJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgbGFzdEZpbmRSZXN1bHQgPSB0cmFjay5sZW5ndGg7IC8vIGdyZWF0ZXN0VGltZSBleGNlZWRzIHRoZSBlbmQgb2YgdGhlIG5vdGVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaXJzdEZpbmRSZXN1bHQgPT09IDApIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGaW5kUmVzdWx0ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IC0xLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogLTF9OyAvLyBoYXZlbid0IHNlZW4gZmlyc3Qgbm90ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAwLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbGFzdEZpbmRSZXN1bHR9OyAvLyBub3RlcyBhcmUganVzdCBzdGFydGluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogZmlyc3RGaW5kUmVzdWx0LCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbGFzdEZpbmRSZXN1bHR9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IG5vIHR3byBub3RlcyB3aWxsIGhhdmUgdGhlIHNhbWUgdGltZSBpbiB0aGUgc2FtZSB0cmFja1xyXG4gICAgZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoa2V5VGltZTogbnVtYmVyLCB0cmFjazogTm90ZVtdLCBzZWFyY2hTdGFydCA9IDApIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gc2VhcmNoU3RhcnQ7IGkgPCB0cmFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHJhY2tbaV0udGltZUluU2Vjb25kcyA+IGtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFYXJsaWVzdE5vdGUoKTogTm90ZSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0Tm90ZTogTm90ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrc1tpXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tFYXJsaWVzdE5vdGU6IE5vdGUgPSB0aGlzLnRyYWNrc1tpXVswXTtcclxuICAgICAgICAgICAgICAgIGlmIChlYXJsaWVzdE5vdGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFybGllc3ROb3RlID0gdHJhY2tFYXJsaWVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVhcmxpZXN0Tm90ZS50aW1lSW5TZWNvbmRzID4gdHJhY2tFYXJsaWVzdE5vdGUudGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhcmxpZXN0Tm90ZSA9IHRyYWNrRWFybGllc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlYXJsaWVzdE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGF0ZXN0Tm90ZSgpOiBOb3RlIHtcclxuICAgICAgICBsZXQgbGF0ZXN0Tm90ZTogTm90ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrc1tpXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tMYXRlc3ROb3RlOiBOb3RlID0gdGhpcy50cmFja3NbaV1bdGhpcy50cmFja3NbaV0ubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobGF0ZXN0Tm90ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RlID0gdHJhY2tMYXRlc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXRlc3ROb3RlLnRpbWVJblNlY29uZHMgPCB0cmFja0xhdGVzdE5vdGUudGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGUgPSB0cmFja0xhdGVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhdGVzdE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWxOb3RlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3MucmVkdWNlKChzdW0sIHRyYWNrKSA9PiBzdW0gKyB0cmFjay5sZW5ndGgsIDApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90ZVNraW4ge1xyXG4gICAgcHVibGljIG5vdGU6IHA1LkltYWdlO1xyXG4gICAgcHVibGljIGNvbm5lY3RvclRpbGU6IHA1LkltYWdlO1xyXG4gICAgcHVibGljIHJlY2VwdG9yOiBwNS5JbWFnZTtcclxuXHJcbiAgICAvKiBSZXF1aXJlcyB0aGF0IHRoZSB0YWlsIGJlIGhhbGYgdGhlIGhlaWdodCBhbmQgc2FtZSB3aWR0aCBhcyBub3RlIGltYWdlICovXHJcbiAgICBwdWJsaWMgdGFpbDogcDUuSW1hZ2U7XHJcblxyXG4gICAgcHJpdmF0ZSByb3RhdGlvbkFuZ2xlczogTWFwPG51bWJlciwgbnVtYmVyW10+ID0gbmV3IE1hcChbXHJcbiAgICAgICAgWzQsIFsyNzAsIDE4MCwgMCwgOTBdXSxcclxuICAgICAgICBbNiwgWzI3MCwgMzE1LCAxODAsIDAsIDQ1LCA5MF1dXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlOiBwNS5JbWFnZSwgY29ubmVjdG9yOiBwNS5JbWFnZSwgdGFpbDogcDUuSW1hZ2UsIHJlY2VwdG9yOiBwNS5JbWFnZSkge1xyXG4gICAgICAgIHRoaXMubm90ZSA9IG5vdGU7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JUaWxlID0gY29ubmVjdG9yO1xyXG4gICAgICAgIHRoaXMudGFpbCA9IHRhaWw7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvciA9IHJlY2VwdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiBhYmxlIHRvIGRyYXcgbm90ZSB0eXBlLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxyXG4gICAgcHVibGljIGRyYXdOb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVR5cGU6IE5vdGVUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKG5vdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLkhPTERfSEVBRDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ltYWdlUm90YXRlZCh0aGlzLm5vdGUsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclksIG5vdGVTaXplKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlRBSUw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUYWlsKHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiBhYmxlIHRvIGRyYXcgbm90ZSB0eXBlLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxyXG4gICAgcHVibGljIGRyYXdSZWNlcHRvcih0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmRyYXdJbWFnZVJvdGF0ZWQodGhpcy5yZWNlcHRvciwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY2VudGVyWCwgY2VudGVyWSwgbm90ZVNpemUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiBhYmxlIHRvIGRyYXcgbm90ZSB0eXBlLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxyXG4gICAgcHJpdmF0ZSBkcmF3SG9sZENvbm5lY3RvcihjZW50ZXJYOiBudW1iZXIsIGRyYXdTdGFydFk6IG51bWJlciwgZHJhd0VuZFk6IG51bWJlciwgbm90ZVN0YXJ0WTogbnVtYmVyLCBub3RlRW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBsZXQgc291cmNlV2lkdGggPSB0aGlzLmNvbm5lY3RvclRpbGUud2lkdGg7XHJcbiAgICAgICAgbGV0IHNvdXJjZUhlaWdodCA9IHRoaXMuY29ubmVjdG9yVGlsZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHNjYWxlZFdpZHRoID0gbm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHNjYWxlZEhlaWdodCA9IHNjYWxlZFdpZHRoIC8gc291cmNlV2lkdGggKiBzb3VyY2VIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGNvbm5lY3RvckhlaWdodCA9IE1hdGguYWJzKGRyYXdFbmRZIC0gZHJhd1N0YXJ0WSk7XHJcbiAgICAgICAgbGV0IGVuZFlPZmZzZXQgPSB0aGlzLmdldE5vdGVFbmRPZmZzZXQobm90ZUVuZFksIGRyYXdFbmRZKTtcclxuXHJcbiAgICAgICAgbGV0IGVuZFBhcnRpYWxUaWxlSGVpZ2h0ID0gc2NhbGVkSGVpZ2h0IC0gKGVuZFlPZmZzZXQgJSBzY2FsZWRIZWlnaHQpO1xyXG4gICAgICAgIGVuZFBhcnRpYWxUaWxlSGVpZ2h0ID0gTWF0aC5taW4oZW5kUGFydGlhbFRpbGVIZWlnaHQsIGNvbm5lY3RvckhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0ID0gKGNvbm5lY3RvckhlaWdodCAtIGVuZFBhcnRpYWxUaWxlSGVpZ2h0KSAlIHNjYWxlZEhlaWdodDtcclxuICAgICAgICBsZXQgbnVtQ29tcGxldGVUaWxlcyA9IE1hdGgucm91bmQoXHJcbiAgICAgICAgICAgIChjb25uZWN0b3JIZWlnaHQgLSBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0IC0gZW5kUGFydGlhbFRpbGVIZWlnaHQpIC8gc2NhbGVkSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBibG9jayBhbGxvd3MgdXMgdG8gdXNlIHRoZSBzYW1lIGRyYXdpbmcgbWV0aG9kIGZvciBib3RoIHVwc2Nyb2xsIGFuZCBkb3duc2Nyb2xsXHJcbiAgICAgICAgbGV0IGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRvcFBhcnRpYWxUaWxlSGVpZ2h0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQgPSBlbmRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICAgICAgdG9wUGFydGlhbFRpbGVIZWlnaHQgPSBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0ID0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICAgICAgdG9wUGFydGlhbFRpbGVIZWlnaHQgPSBlbmRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRyYXdNaW5ZID0gTWF0aC5taW4oZHJhd1N0YXJ0WSwgZHJhd0VuZFkpO1xyXG4gICAgICAgIGxldCBkcmF3TWF4WSA9IE1hdGgubWF4KGRyYXdTdGFydFksIGRyYXdFbmRZKTtcclxuICAgICAgICBsZXQgaXNSZXZlcnNlZCA9IGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXA7XHJcbiAgICAgICAgbGV0IGlzRHJhd25Gcm9tQm90dG9tID0gZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcDtcclxuICAgICAgICBpZiAoZW5kUGFydGlhbFRpbGVIZWlnaHQgPT09IGNvbm5lY3RvckhlaWdodCkge1xyXG4gICAgICAgICAgICBpc0RyYXduRnJvbUJvdHRvbSA9ICFpc0RyYXduRnJvbUJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd1BhcnRpYWxUaWxlKGNlbnRlclgsIGRyYXdNaW5ZLCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LFxyXG4gICAgICAgICAgICB0b3BQYXJ0aWFsVGlsZUhlaWdodCAvIHNjYWxlZEhlaWdodCwgIWlzRHJhd25Gcm9tQm90dG9tLCBpc1JldmVyc2VkLCBwKTtcclxuICAgICAgICB0aGlzLmRyYXdDb21wbGV0ZVRpbGVzKGNlbnRlclgsIGRyYXdNaW5ZICsgdG9wUGFydGlhbFRpbGVIZWlnaHQsIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQsXHJcbiAgICAgICAgICAgIG51bUNvbXBsZXRlVGlsZXMsIGlzUmV2ZXJzZWQsIHApO1xyXG4gICAgICAgIHRoaXMuZHJhd1BhcnRpYWxUaWxlKGNlbnRlclgsIGRyYXdNYXhZIC0gYm90dG9tUGFydGlhbFRpbGVIZWlnaHQsIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQsXHJcbiAgICAgICAgICAgIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0IC8gc2NhbGVkSGVpZ2h0LCBpc0RyYXduRnJvbUJvdHRvbSxcclxuICAgICAgICAgICAgaXNSZXZlcnNlZCwgcCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3VGFpbCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgcC5yb3RhdGUoMTgwKTtcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLnRhaWwsIC1ub3RlU2l6ZSAvIDIsIC1ub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSAvIDIpO1xyXG4gICAgICAgICAgICBwLnBvcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy50YWlsLCBjZW50ZXJYIC0gbm90ZVNpemUgLyAyLCBjZW50ZXJZIC0gbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3RlRW5kT2Zmc2V0KG5vdGVFbmRZOiBudW1iZXIsIGRyYXdFbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gbm90ZUVuZFkgLSBkcmF3RW5kWTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBkcmF3RW5kWSAtIG5vdGVFbmRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBwcmV2ZW50cyB0aGUgcGFydGlhbCB0aWxlIHRleHR1cmUgZnJvbSBzdHJldGNoaW5nIHdoZW4gdGhlIHBsYXllciBoaXRzIGEgaG9sZCBlYXJseVxyXG4gICAgICAgIG9mZnNldCA9IE1hdGgubWF4KDAsIG9mZnNldCk7XHJcblxyXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Q29tcGxldGVUaWxlcyhjZW50ZXJYOiBudW1iZXIsIGxlYXN0WTogbnVtYmVyLCBzY2FsZWRXaWR0aDogbnVtYmVyLCBzY2FsZWRIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVGlsZXM6IG51bWJlciwgaXNSZXZlcnNlZDogYm9vbGVhbiwgcDogcDUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRpbGVzOyBpKyspIHtcclxuICAgICAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0gbGVhc3RZICsgaSAqIHNjYWxlZEhlaWdodCArIHNjYWxlZEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICBpZiAoaXNSZXZlcnNlZCkge1xyXG4gICAgICAgICAgICAgICAgcC5yb3RhdGUoMTgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMuY29ubmVjdG9yVGlsZSwgLXNjYWxlZFdpZHRoIC8gMiwgLXNjYWxlZEhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQpO1xyXG4gICAgICAgICAgICBwLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYOiBudW1iZXIsIHRvcExlZnRZOiBudW1iZXIsIHNjYWxlZFdpZHRoOiBudW1iZXIsIHNjYWxlZEhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlV2lkdGg6IG51bWJlciwgc291cmNlSGVpZ2h0OiBudW1iZXIsIGhlaWdodFBlcmNlbnQ6IG51bWJlciwgaXNEcmF3bkZyb21Cb3R0b206IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUmV2ZXJzZWQ6IGJvb2xlYW4sIHA6IHA1KSB7XHJcbiAgICAgICAgaWYgKGhlaWdodFBlcmNlbnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBsZXQgZGVzdGluYXRpb25IZWlnaHQgPSBoZWlnaHRQZXJjZW50ICogc2NhbGVkSGVpZ2h0O1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gdG9wTGVmdFkgKyBkZXN0aW5hdGlvbkhlaWdodCAvIDI7XHJcbiAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgaWYgKGlzUmV2ZXJzZWQpIHtcclxuICAgICAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICAgICAgcC5yb3RhdGUoMTgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRHJhd25Gcm9tQm90dG9tKSB7IC8vIERyYXcgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBpbWFnZVxyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMuY29ubmVjdG9yVGlsZSwgLXNjYWxlZFdpZHRoIC8gMiwgLWRlc3RpbmF0aW9uSGVpZ2h0IC8gMiwgc2NhbGVkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkhlaWdodCwgMCwgc291cmNlSGVpZ2h0IC0gaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCxcclxuICAgICAgICAgICAgICAgIHNvdXJjZVdpZHRoLCBoZWlnaHRQZXJjZW50ICogc291cmNlSGVpZ2h0KTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBEcmF3IGZyb20gdGhlIHRvcCBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1kZXN0aW5hdGlvbkhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25IZWlnaHQsIDAsIDAsIHNvdXJjZVdpZHRoLCBoZWlnaHRQZXJjZW50ICogc291cmNlSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdJbWFnZVJvdGF0ZWQoaW1hZ2U6IHA1LkltYWdlLCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgdGhpcy5yb3RhdGUocCwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgcC5pbWFnZShpbWFnZSwgLW5vdGVTaXplIC8gMiwgLW5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcm90YXRlKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQW5nbGVzLmhhcyhudW1UcmFja3MpKSB7XHJcbiAgICAgICAgICAgIHAucm90YXRlKHRoaXMucm90YXRpb25BbmdsZXMuZ2V0KG51bVRyYWNrcylbdHJhY2tOdW1iZXJdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSh0aGlzLmdldERlZmF1bHRSb3RhdGlvbkFuZ2xlSW5EZWdyZWVzKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0Um90YXRpb25BbmdsZUluRGVncmVlcyh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByb3RhdGlvbiA9IC05MDtcclxuICAgICAgICBsZXQgcm90YXRpb25QZXJUcmFjayA9IDM2MCAvIG51bVRyYWNrcztcclxuICAgICAgICBpZiAodHJhY2tOdW1iZXIgPCBudW1UcmFja3MgLyAyKSB7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uIC09IHRyYWNrTnVtYmVyICogcm90YXRpb25QZXJUcmFjaztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByb3RhdGlvbiArPSAodHJhY2tOdW1iZXIgLSBudW1UcmFja3MgLyAyICsgMSkgKiByb3RhdGlvblBlclRyYWNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm90YXRpb247XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0ZXBmaWxlLCBTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZSwgQXVkaW9GaWxlU3RhdGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQbGF5bGlzdENsaWVudH0gZnJvbSBcIi4vcGxheWxpc3RfY2xpZW50L3BsYXlsaXN0X2NsaWVudFwiO1xyXG5pbXBvcnQge1Nvbmd9IGZyb20gXCIuL3BsYXlsaXN0X2NsaWVudC9zb25nXCI7XHJcbmltcG9ydCB7U3dmUGFyc2VSZXNwb25zZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zd2ZcIjtcclxuXHJcbmV4cG9ydCBlbnVtIE9ubGluZVBsYXlsaXN0U3RhdGUge1xyXG4gICAgTk9fUExBWUxJU1QsXHJcbiAgICBMT0FESU5HX1BMQVlMSVNULFxyXG4gICAgUExBWUxJU1RfUkVBRFksXHJcbiAgICBQTEFZTElTVF9FUlJPUixcclxuICAgIExPQURJTkdfU09ORyxcclxuICAgIFNPTkdfRVJST1IsXHJcbn1cclxuXHJcbmNsYXNzIERpc3BsYXlhYmxlU29uZyB7XHJcbiAgICBwcml2YXRlIHNvbmc6IFNvbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc29uZzogU29uZykge1xyXG4gICAgICAgIHRoaXMuc29uZyA9IHNvbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29uZy5zb25nRGlmZmljdWx0eSArIFwiIFwiICsgdGhpcy5zb25nLnNvbmdOYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT25saW5lUGxheWxpc3Qge1xyXG4gICAgcHVibGljIGluZGV4VXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHBsYXlsaXN0Q2xpZW50OiBQbGF5bGlzdENsaWVudDtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfUEFHRV9TSVpFOiBudW1iZXIgPSA1MDtcclxuICAgIHB1YmxpYyBzdGF0ZTogT25saW5lUGxheWxpc3RTdGF0ZTtcclxuICAgIHB1YmxpYyBkaXNwbGF5ZWRQbGF5bGlzdDogRGlzcGxheWFibGVTb25nW107XHJcbiAgICBwcml2YXRlIHBhZ2VOdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcGFnZVNpemU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5OT19QTEFZTElTVDtcclxuICAgICAgICB0aGlzLmluZGV4VXJsID0gXCJcIjtcclxuICAgICAgICB0aGlzLnBsYXlsaXN0Q2xpZW50ID0gbmV3IFBsYXlsaXN0Q2xpZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtpY2tPZmZMb2FkUGxheWxpc3QoaW5kZXhVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfUExBWUxJU1Q7XHJcbiAgICAgICAgdGhpcy5wbGF5bGlzdENsaWVudC5pbml0aWFsaXplKGluZGV4VXJsKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmluaXRpYWxpemVEaXNwbGF5ZWRQbGF5bGlzdCgpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZURpc3BsYXllZFBsYXlsaXN0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5QTEFZTElTVF9SRUFEWVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBraWNrT2ZmTG9hZFNvbmcoZGlzcGxheWVkU29uZ0luZGV4OiBudW1iZXIsIHN0ZXBmaWxlOiBTdGVwZmlsZSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkc7XHJcbiAgICAgICAgYXVkaW9GaWxlLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgICAgICBzdGVwZmlsZS5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuTk9fU1RFUEZJTEU7XHJcbiAgICAgICAgdGhpcy5wbGF5bGlzdENsaWVudC5nZXRTd2YodGhpcy5nZXRTb25nSW5kZXgoZGlzcGxheWVkU29uZ0luZGV4KSlcclxuICAgICAgICAgICAgLnRoZW4oKHN3ZlBhcnNlUmVzcG9uc2UpID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTd2ZJbnRvU3RlcGZpbGVBbmRBdWRpb0ZpbGUoc3dmUGFyc2VSZXNwb25zZSwgc3RlcGZpbGUsIGF1ZGlvRmlsZSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5TT05HX0VSUk9SKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNvbmdJbmRleChkaXNwbGF5ZWRTb25nSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBkaXNwbGF5ZWRTb25nSW5kZXggKyB0aGlzLnBhZ2VTaXplICogdGhpcy5wYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFN3ZkludG9TdGVwZmlsZUFuZEF1ZGlvRmlsZShzd2ZQYXJzZVJlc3BvbnNlOiBTd2ZQYXJzZVJlc3BvbnNlLCBzdGVwZmlsZTogU3RlcGZpbGUsIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICAgICAgc3RlcGZpbGUubG9hZEZmckJlYXRtYXAoc3dmUGFyc2VSZXNwb25zZS5jaGFydERhdGEpO1xyXG4gICAgICAgIGF1ZGlvRmlsZS5sb2FkQmxvYihzd2ZQYXJzZVJlc3BvbnNlLmJsb2IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VOdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5leHRQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2VOdW1iZXIgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJldmlvdXNQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2VOdW1iZXIgLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFBhZ2UocGFnZU51bWJlcjogbnVtYmVyLCBwYWdlU2l6ZT86IG51bWJlcikge1xyXG4gICAgICAgIHBhZ2VTaXplID0gdGhpcy5nZXRWYWxpZFBhZ2VTaXplKHBhZ2VTaXplKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZFBhZ2VOdW1iZXIocGFnZU51bWJlciwgcGFnZVNpemUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtaW5JbmRleCA9IHBhZ2VOdW1iZXIgKiBwYWdlU2l6ZTtcclxuICAgICAgICBsZXQgbWF4SW5kZXggPSBtaW5JbmRleCArIHBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheWVkUGxheWxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbWluSW5kZXg7IGkgPCBtYXhJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDwgdGhpcy5wbGF5bGlzdENsaWVudC5nZXRQbGF5bGlzdCgpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRQbGF5bGlzdC5wdXNoKHRoaXMuZ2V0RGlzcGxheWFibGVTb25nKGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzVmFsaWRQYWdlTnVtYmVyKHBhZ2VOdW1iZXI6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiAwIDw9IHBhZ2VOdW1iZXIgJiYgcGFnZU51bWJlciA8PSB0aGlzLmdldE1heFBhZ2VOdW1iZXIocGFnZVNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheWFibGVTb25nKHNvbmdJbmRleDogbnVtYmVyKTogRGlzcGxheWFibGVTb25nIHtcclxuICAgICAgICByZXR1cm4gbmV3IERpc3BsYXlhYmxlU29uZyh0aGlzLnBsYXlsaXN0Q2xpZW50LmdldFBsYXlsaXN0KClbc29uZ0luZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZFBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocGFnZVNpemUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gT25saW5lUGxheWxpc3QuREVGQVVMVF9QQUdFX1NJWkU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlU2l6ZSA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlU2l6ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1heFBhZ2VOdW1iZXIocGFnZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMucGxheWxpc3RDbGllbnQuZ2V0UGxheWxpc3QoKS5sZW5ndGggLyBwYWdlU2l6ZSkgLSAxO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0tleWJvYXJkRXZlbnRNYW5hZ2VyfSBmcm9tIFwiLi9rZXlib2FyZF9ldmVudF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVQcmV2aWV3Tm90ZXN9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlU2tpbn0gZnJvbSBcIi4vbm90ZV9za2luXCI7XHJcblxyXG5sZXQgd2lkdGggPSA3MjA7XHJcbmxldCBoZWlnaHQgPSA0ODA7XHJcblxyXG5leHBvcnQgY2xhc3MgUDVTY2VuZSB7XHJcbiAgICBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IG5ldyBwNSgocDogcDUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlbmRlcmVyOiBwNS5SZW5kZXJlcjtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNlbnRlckNhbnZhcygpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcmVyLmNlbnRlcigpOyAvLyBEaXNhYmxlIHRoaXMgZm9yIG5vdyB0byBtYWtlIGVtYmVkZGluZyB3b3JrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5ub3RlU2tpbiA9IG5ldyBOb3RlU2tpbihcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19ibHVlX3YzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9jb25uZWN0b3JfdGlsZV9yZXNpemUucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3RhaWxfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19yZWNlcHRvci5wbmdcIilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCA9IHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3BsYXlfZnJvbV9maWxlX2JhY2tncm91bmQuanBnXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kID0gZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlciA9IHAuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlciA9IG5ldyBLZXlib2FyZEV2ZW50TWFuYWdlcihwKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyg0KSwgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTsgLy8gTWFrZXMgdGhlIGNhbnZhcyBiZSBhYmxlIHRvIGZpbGwgdGhlIHdob2xlIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHAuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLmRyYXcoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAud2luZG93UmVzaXplZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlckNhbnZhcygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGxheUZyb21GaWxlfSBmcm9tIFwiLi9wYWdlcy9wbGF5X2Zyb21fZmlsZVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuaW1wb3J0IHtQbGF5fSBmcm9tIFwiLi9wYWdlcy9wbGF5XCI7XHJcbmltcG9ydCB7UmVzdWx0c30gZnJvbSBcIi4vcGFnZXMvcmVzdWx0c1wiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7UGxheUZyb21PbmxpbmV9IGZyb20gXCIuL3BhZ2VzL3BsYXlfZnJvbV9vbmxpbmVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFBBR0VTIHtcclxuICAgIFBMQVlfRlJPTV9GSUxFLFxyXG4gICAgT1BUSU9OUyxcclxuICAgIFBMQVksXHJcbiAgICBSRVNVTFRTLFxyXG4gICAgUExBWV9GUk9NX09OTElORSxcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbnRQYWdlOiBQQUdFUyA9IFBBR0VTLlBMQVlfRlJPTV9GSUxFO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0dXJuUGFnZTogUEFHRVM7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRDdXJyZW50UGFnZShwYWdlOiBQQUdFUykge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlICE9PSBQQUdFUy5QTEFZKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuUGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xyXG4gICAgICAgIERPTVdyYXBwZXIuY2xlYXJSZWdpc3RyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmV0dXJuKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFBhZ2UodGhpcy5yZXR1cm5QYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWV9GUk9NX0ZJTEU6XHJcbiAgICAgICAgICAgICAgICBQbGF5RnJvbUZpbGUuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuT1BUSU9OUzpcclxuICAgICAgICAgICAgICAgIE9wdGlvbnMuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWTpcclxuICAgICAgICAgICAgICAgIFBsYXkuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUkVTVUxUUzpcclxuICAgICAgICAgICAgICAgIFJlc3VsdHMuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWV9GUk9NX09OTElORTpcclxuICAgICAgICAgICAgICAgIFBsYXlGcm9tT25saW5lLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBwYWdlOiBcIiArIGdsb2JhbC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge1xyXG4gICAgYm9vbGVhblRvWWVzTm8sXHJcbiAgICBjcmVhdGVMYWJlbGVkSW5wdXQsXHJcbiAgICBjcmVhdGVMYWJlbGVkU2VsZWN0LFxyXG4gICAgY3JlYXRlTGFiZWxlZFRleHRBcmVhLFxyXG4gICAgZHJhd0hlYWRpbmcsIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMsXHJcbiAgICBZZXNOb1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4uL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nc1VpfSBmcm9tIFwiLi4va2V5X2JpbmRpbmdzX3VpXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3B0aW9ucyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIE9QVElPTlNfQ0xBU1M6IHN0cmluZyA9IFwib3B0aW9uc1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kKTtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICB9LCBcInNjcm9sbERpdlwiKTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpdi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKFwib3B0aW9ucy1zY3JvbGwtZGl2XCIpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgICAgIHNjcm9sbERpdi5lbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAzMzUsIGNhbnZhc1Bvc2l0aW9uLnkgKyA0NSk7XHJcblxyXG4gICAgICAgIGxldCByZXNldENvbmZpZ0J1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUmVzZXQgVG8gRGVmYXVsdFwiKTtcclxuICAgICAgICB9LCBcInJlc2V0Q29uZmlnQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmICghcmVzZXRDb25maWdCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJyZXNldC1jb25maWdcIik7XHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcgPSBuZXcgQ29uZmlnKHt9KTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiUGF1c2UgYXQgU3RhcnQgKHNlYylcIiwgXCJwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcy50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMocGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkgJiYgdmFsdWUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbFNwZWVkSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJTY3JvbGwgU3BlZWQgKHB4L3NlYylcIiwgXCJzY3JvbGxTcGVlZElucHV0XCIsXHJcbiAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGl4ZWxzUGVyU2Vjb25kLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhzY3JvbGxTcGVlZElucHV0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gc2Nyb2xsU3BlZWRJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkgJiYgdmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBpeGVsc1BlclNlY29uZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbFNwZWVkSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChzY3JvbGxTcGVlZElucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbERpcmVjdGlvblNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJTY3JvbGwgRGlyZWN0aW9uXCIsIFwic2Nyb2xsRGlyZWN0aW9uU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFNjcm9sbERpcmVjdGlvbiwgZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24sIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhzY3JvbGxEaXJlY3Rpb25TZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFNjcm9sbERpcmVjdGlvblt2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgU2Nyb2xsRGlyZWN0aW9uXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID0gZW51bU9mVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY2VwdG9yUG9zaXRpb25JbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlJlY2VwdG9yIFBvc2l0aW9uICglKVwiLCBcInJlY2VwdG9yUG9zaXRpb25JbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHJlY2VwdG9yUG9zaXRpb25JbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHJlY2VwdG9yUG9zaXRpb25JbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucmVjZXB0b3JZUGVyY2VudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXJlY2VwdG9yUG9zaXRpb25JbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHJlY2VwdG9yUG9zaXRpb25JbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJBY2N1cmFjeSBPZmZzZXQgKG1zKVwiLCBcImFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dFwiLFxyXG4gICAgICAgICAgICAoZ2xvYmFsLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzICogMTAwMCkudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyA9IHZhbHVlIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nc0lucHV0ID0gY3JlYXRlTGFiZWxlZFRleHRBcmVhKFwiQWNjdXJhY3kgU2V0dGluZ3NcIiwgXCJhY2N1cmFjeVNldHRpbmdzSW5wdXRcIixcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2xvYmFsLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLCBudWxsLCAzKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5U2V0dGluZ3NJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IGFjY3VyYWN5U2V0dGluZ3NJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdID0gcGFyc2VBY2N1cmFjeVNldHRpbmdzSnNvbih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3QWNjdXJhY3lTZXR0aW5ncyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyA9IG5ld0FjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmICghYWNjdXJhY3lTZXR0aW5nc0lucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lTZXR0aW5nc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWN5Rmxhc2hFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IEZsYXNoXCIsXCJhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5Rmxhc2hFbmFibGVkU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKGFjY3VyYWN5Rmxhc2hFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXJlY3Rpb25TZWxlY3QuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWRTZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiQWNjdXJhY3kgUGFydGljbGVzXCIsIFwiYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhhY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWRTZWxlY3QuZWxlbWVudC52YWx1ZSgpKTtcclxuICAgICAgICAgICAgbGV0IGVudW1PZlZhbHVlID0gWWVzTm9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFllc05vXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5ZZXMpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiQWNjdXJhY3kgVGV4dFwiLFwiYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhhY2N1cmFjeVRleHRFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uTm8pIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVRleHRFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJIb2xkIFBhcnRpY2xlc1wiLCBcImhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoaG9sZFBhcnRpY2xlc0VuYWJsZWRTZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoaG9sZFBhcnRpY2xlc0VuYWJsZWRTZWxlY3QuZWxlbWVudC52YWx1ZSgpKTtcclxuICAgICAgICAgICAgbGV0IGVudW1PZlZhbHVlID0gWWVzTm9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFllc05vXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5ZZXMpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uTm8pIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhvbGRHbG93RW5hYmxlZFNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJIb2xkIEdsb3dcIiwgXCJob2xkR2xvd0VuYWJsZWRTZWxlY3RcIixcclxuICAgICAgICAgICAgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoaG9sZEdsb3dFbmFibGVkU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKGhvbGRHbG93RW5hYmxlZFNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBZZXNOb1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgWWVzTm9dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLlllcykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uTm8pIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXJlY3Rpb25TZWxlY3QuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChob2xkR2xvd0VuYWJsZWRTZWxlY3QuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBLZXlCaW5kaW5nc1VpLmRyYXcocCwgc2Nyb2xsRGl2LmVsZW1lbnQsIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcblxyXG4gICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24oYWNjdXJhY3lTZXR0aW5nc0pzb246IHN0cmluZyk6IEFjY3VyYWN5W10ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IFtdXHJcbiAgICAgICAgbGV0IGpzb25BcnJheTogQWNjdXJhY3lbXSA9IEpTT04ucGFyc2UoYWNjdXJhY3lTZXR0aW5nc0pzb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGpzb25BcnJheVtpXTtcclxuICAgICAgICAgICAgLy8gdGhpcyBmYWlscyBpZiB0aGUgdXNlciBnYXZlIHRoZSB3cm9uZyBpbnB1dFxyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzLnB1c2gobmV3IEFjY3VyYWN5KGFjY3VyYWN5Lm5hbWUsIGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsYXkge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlLmJhY2tncm91bmQoXCJibGFja1wiKTtcclxuICAgICAgICBnbG9iYWwucGxheWluZ0Rpc3BsYXkuZHJhdygpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1xyXG4gICAgZHJhd0hlYWRpbmcsXHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZSxcclxuICAgIGNyZWF0ZUZpbGVJbnB1dCxcclxuICAgIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdiwgZml4UmFkaW9EaXZFbGVtZW50LCBzdHlsZVJhZGlvT3B0aW9uc1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtTdGVwZmlsZSwgU3RlcGZpbGVTdGF0ZX0gZnJvbSBcIi4uL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlLCBBdWRpb0ZpbGVTdGF0ZX0gZnJvbSBcIi4uL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXksIGluaXRQbGF5aW5nRGlzcGxheSwgaXNGaWxlc1JlYWR5fSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQge01vZGV9IGZyb20gXCIuLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcblxyXG5jb25zdCBwbGF5RnJvbUZpbGVTdGVwZmlsZSA9IG5ldyBTdGVwZmlsZSgpO1xyXG5jb25zdCBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUgPSBuZXcgQXVkaW9GaWxlKCk7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheUZyb21GaWxlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgUExBWV9GUk9NX0ZJTEVfQ0xBU1M6IHN0cmluZyA9IFwicGxheS1mcm9tLWZpbGVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTU9ERV9SQURJT19JRDogc3RyaW5nID0gXCJtb2RlUmFkaW9cIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZHJhd0hlYWRpbmcoKTtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQpO1xyXG5cclxuICAgICAgICBsZXQgc3RlcGZpbGVJbnB1dCA9IGNyZWF0ZUZpbGVJbnB1dChnZXRTdGVwZmlsZUlucHV0TGFiZWwoKSwgXCJDaG9vc2UgU3RlcGZpbGUgKC5zbSlcIiwgXCJzdGVwZmlsZUlucHV0XCIsXHJcbiAgICAgICAgICAgIGxvYWRTdGVwZmlsZUFuZFVwZGF0ZU1vZGVPcHRpb25zLCBQbGF5RnJvbUZpbGUuUExBWV9GUk9NX0ZJTEVfQ0xBU1MpLmVsZW1lbnQ7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoc3RlcGZpbGVJbnB1dCwgMC40MywgMC4zLCAyNjgsIDM0KTtcclxuXHJcbiAgICAgICAgbGV0IGF1ZGlvRmlsZUlucHV0ID0gY3JlYXRlRmlsZUlucHV0KGdldEF1ZGlvRmlsZUlucHV0TGFiZWwoKSwgXCJDaG9vc2UgQXVkaW8gRmlsZSAoLm1wMywgLm9nZylcIiwgXCJhdWRpb0ZpbGVJbnB1dFwiLFxyXG4gICAgICAgICAgICBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUubG9hZEZpbGUuYmluZChwbGF5RnJvbUZpbGVBdWRpb0ZpbGUpLCBQbGF5RnJvbUZpbGUuUExBWV9GUk9NX0ZJTEVfQ0xBU1MpLmVsZW1lbnQ7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoYXVkaW9GaWxlSW5wdXQsIDAuNDMsIDAuNDUsIDMyNSwgMzQpO1xyXG5cclxuICAgICAgICBsZXQgcGxheUJ1dHRvbklkID0gXCJwbGF5QnV0dG9uXCI7XHJcbiAgICAgICAgaWYgKGlzRmlsZXNSZWFkeShwbGF5RnJvbUZpbGVTdGVwZmlsZSwgcGxheUZyb21GaWxlQXVkaW9GaWxlKSkge1xyXG4gICAgICAgICAgICBsZXQgbW9kZVJhZGlvID0gZHJhd01vZGVTZWxlY3QocCwgUGxheUZyb21GaWxlLk1PREVfUkFESU9fSUQpO1xyXG4gICAgICAgICAgICBpZiAobW9kZVJhZGlvLnZhbHVlKCkgIT09IFwiXCIpIHsgLy8gaWYgdXNlciBoYXMgc2VsZWN0ZWQgYSBtb2RlXHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJQbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgcGxheUJ1dHRvbklkKTtcclxuICAgICAgICAgICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlCdXR0b24uZWxlbWVudCwgMC41LCAwLjg4LCA2MCwgMzQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5QnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTW9kZTogTW9kZSA9IGdldFNlbGVjdGVkTW9kZShtb2RlUmFkaW8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5RnJvbUZpbGVTdGVwZmlsZS5maW5pc2hQYXJzaW5nKHNlbGVjdGVkTW9kZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRQbGF5aW5nRGlzcGxheShwbGF5RnJvbUZpbGVTdGVwZmlsZS5mdWxsUGFyc2UudHJhY2tzLCBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5QTEFZKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheUJ1dHRvbklkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQoUGxheUZyb21GaWxlLk1PREVfUkFESU9fSUQpO1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHBsYXlCdXR0b25JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkU3RlcGZpbGVBbmRVcGRhdGVNb2RlT3B0aW9ucyhmaWxlOiBwNS5GaWxlKSB7XHJcbiAgICBwbGF5RnJvbUZpbGVTdGVwZmlsZS5sb2FkRmlsZS5jYWxsKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLCBmaWxlKTtcclxuICAgIGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zID0gdW5kZWZpbmVkO1xyXG4gICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdNb2RlU2VsZWN0KHA6IHA1LCB1bmlxdWVJZDogc3RyaW5nKTogcDUuRWxlbWVudCB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIGlmIChnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMgPSBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkocGxheUZyb21GaWxlU3RlcGZpbGUucGFydGlhbFBhcnNlLm1vZGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbW9kZVJhZGlvQ2xhc3MgPSBcIm1vZGUtcmFkaW9cIlxyXG4gICAgbGV0IG1vZGVSYWRpb09wdGlvbkNsYXNzID0gXCJtb2RlLXJhZGlvLW9wdGlvblwiO1xyXG4gICAgbGV0IG1vZGVSYWRpb0NyZWF0ZVJlc3VsdCA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVSYWRpbygpO1xyXG4gICAgfSwgdW5pcXVlSWQpO1xyXG4gICAgbGV0IG1vZGVSYWRpbyA9IG1vZGVSYWRpb0NyZWF0ZVJlc3VsdC5lbGVtZW50O1xyXG4gICAgaWYgKCFtb2RlUmFkaW9DcmVhdGVSZXN1bHQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vZGUgPSBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9uc1tpXTtcclxuICAgICAgICAgICAgbGV0IHJhZGlvTGFiZWwgPSBtb2RlLnR5cGUgKyBcIiwgXCIgKyBtb2RlLmRpZmZpY3VsdHkgKyBcIiwgXCIgKyBtb2RlLm1ldGVyO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCByYWRpb09wdGlvbiA9IG1vZGVSYWRpby5vcHRpb24ocmFkaW9MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSB0aGlzIHdheSBiZWNhdXNlIHRoZSB0d28tYXJndW1lbnQgLm9wdGlvbiBtZXRob2Qgd2Fzbid0IHdvcmtpbmdcclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBhY2Nlc3MgdGhlIHNlbGVjdGVkIG1vZGVcclxuICAgICAgICAgICAgcmFkaW9PcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBzdHlsZSBpcyBiZWluZyBzZXQgb24gdGhlIGRpdiBjb250YWluaW5nIHRoZSByYWRpbyBlbGVtZW50cyB0byBtYWtlIGl0IGEgc2Nyb2xsYWJsZSBib3hcclxuICAgICAgICBtb2RlUmFkaW8uYWRkQ2xhc3MobW9kZVJhZGlvQ2xhc3MpO1xyXG4gICAgICAgIG1vZGVSYWRpby5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocCwgbW9kZVJhZGlvKTtcclxuICAgICAgICBmaXhSYWRpb0RpdkVsZW1lbnQobW9kZVJhZGlvKTtcclxuICAgICAgICBzdHlsZVJhZGlvT3B0aW9ucyhwLCBtb2RlUmFkaW8sIFttb2RlUmFkaW9PcHRpb25DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShtb2RlUmFkaW8sIDAuNSwgMC43LCAzMDIsIDEyMCk7XHJcbiAgICBwLnBvcCgpO1xyXG4gICAgcmV0dXJuIG1vZGVSYWRpbztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbzogcDUuRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zW21vZGVSYWRpby52YWx1ZSgpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RlcGZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLk5PX1NURVBGSUxFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJObyBmaWxlIGNob3NlblwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFN0ZXBmaWxlU3RhdGUuRE9ORV9SRUFESU5HOlxyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEOlxyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBdWRpb0ZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKHBsYXlGcm9tRmlsZUF1ZGlvRmlsZS5zdGF0ZSkge1xyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTpcclxuICAgICAgICAgICAgcmV0dXJuIFwiTm8gZmlsZSBjaG9zZW5cIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5ET05FX1JFQURJTkc6XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcocGxheUZyb21GaWxlQXVkaW9GaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKGZ1bGxGaWxlTmFtZTogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlcikge1xyXG4gICAgaWYgKGZ1bGxGaWxlTmFtZS5sZW5ndGggPD0gbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bGxGaWxlTmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdWxsRmlsZU5hbWUuc3Vic3RyKDAsIG1heExlbmd0aCAtIDExKSArXHJcbiAgICAgICAgXCIuLi5cIiArXHJcbiAgICAgICAgZnVsbEZpbGVOYW1lLnN1YnN0cihmdWxsRmlsZU5hbWUubGVuZ3RoIC0gMTApO1xyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtcclxuICAgIGNyZWF0ZUxhYmVsZWRJbnB1dCxcclxuICAgIGRyYXdIZWFkaW5nLFxyXG4gICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2LFxyXG4gICAgZml4UmFkaW9EaXZFbGVtZW50LFxyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUsXHJcbiAgICBzdHlsZVJhZGlvT3B0aW9uc1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7T25saW5lUGxheWxpc3QsIE9ubGluZVBsYXlsaXN0U3RhdGV9IGZyb20gXCIuLi9vbmxpbmVfcGxheWxpc3RcIjtcclxuaW1wb3J0IHtpbml0UGxheWluZ0Rpc3BsYXksIGlzRmlsZXNSZWFkeX0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4uL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi4vYXVkaW9fZmlsZVwiO1xyXG5cclxuY29uc3QgcGxheUZyb21PbmxpbmVTdGVwZmlsZSA9IG5ldyBTdGVwZmlsZSgpO1xyXG5jb25zdCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuXHJcbi8vIFRoaXMgcHJldmVudHMgbG9hZGluZyBwcmV2aW91cyBzb25nIHVwb24gcmV0dXJuaW5nIHRvIGEgbG9hZGVkIHBsYXlsaXN0XHJcbmxldCBpc1N3ZkxvYWRTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheUZyb21PbmxpbmUge1xyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZX0ZST01fT05MSU5FX0NMQVNTOiBzdHJpbmcgPSBcInBsYXktZnJvbS1vbmxpbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZHJhd0hlYWRpbmcoKTtcclxuICAgICAgICBsZXQgb25saW5lUGxheWxpc3Q6IE9ubGluZVBsYXlsaXN0ID0gPE9ubGluZVBsYXlsaXN0PiBnbG9iYWwub25saW5lUGxheWxpc3Q7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHVybElucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiRW5naW5lIFVSTFwiLCBcInVybElucHV0XCIsIG9ubGluZVBsYXlsaXN0LmluZGV4VXJsLFxyXG4gICAgICAgICAgICBQbGF5RnJvbU9ubGluZS5QTEFZX0ZST01fT05MSU5FX0NMQVNTKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IHVybElucHV0RGl2ID0gbmV3IHA1LkVsZW1lbnQodXJsSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUodXJsSW5wdXREaXYsIDAuNTAsIDAuMjEsIDYwMCwgMzgpO1xyXG5cclxuICAgICAgICBsZXQgbG9hZEJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiTG9hZFwiKTtcclxuICAgICAgICB9LCBcImxvYWRCdXR0b25cIik7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUobG9hZEJ1dHRvbi5lbGVtZW50LCAwLjg1LCAwLjIxNSwgNjIsIDMzKTtcclxuICAgICAgICBpZiAoIWxvYWRCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKFBsYXlGcm9tT25saW5lLlBMQVlfRlJPTV9PTkxJTkVfQ0xBU1MpO1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gdXJsSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRCdXR0b24uZWxlbWVudC5hdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ubGluZVBsYXlsaXN0LmtpY2tPZmZMb2FkUGxheWxpc3QodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9ubGluZVBsYXlsaXN0LnN0YXRlICE9PSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfUExBWUxJU1QpIHtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvbmxpbmVQbGF5bGlzdC5zdGF0ZSA9PT0gT25saW5lUGxheWxpc3RTdGF0ZS5QTEFZTElTVF9SRUFEWSB8fFxyXG4gICAgICAgICAgICBvbmxpbmVQbGF5bGlzdC5zdGF0ZSA9PT0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkcpIHtcclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0TWVudUlkID0gXCJwbGF5bGlzdE1lbnVcIlxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RNZW51ID0gZHJhd1JhZGlvTWVudShwLCBwbGF5bGlzdE1lbnVJZCwgb25saW5lUGxheWxpc3QuZGlzcGxheWVkUGxheWxpc3QpO1xyXG4gICAgICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5bGlzdE1lbnUsIDAuNSwgMC42MiwgNTAwLCAyMDApO1xyXG5cclxuICAgICAgICAgICAgZHJhd1BhZ2VDb250cm9scyhwLCBwbGF5bGlzdE1lbnVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWxpc3RNZW51LnZhbHVlKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsb2FkQW5kUGxheUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJMb2FkIEFuZCBQbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgXCJsb2FkQW5kUGxheUJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQsIDAuNSwgMC44OCwgMTE4LCAzNCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFsb2FkQW5kUGxheUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwbGF5bGlzdE1lbnUudmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkQW5kUGxheUJ1dHRvbi5lbGVtZW50LmF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmxpbmVQbGF5bGlzdC5raWNrT2ZmTG9hZFNvbmcodmFsdWUsIHBsYXlGcm9tT25saW5lU3RlcGZpbGUsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU3dmTG9hZFN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob25saW5lUGxheWxpc3Quc3RhdGUgIT09IE9ubGluZVBsYXlsaXN0U3RhdGUuTE9BRElOR19TT05HKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRmlsZXNSZWFkeShwbGF5RnJvbU9ubGluZVN0ZXBmaWxlLCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSkgJiYgaXNTd2ZMb2FkU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRQbGF5aW5nRGlzcGxheShwbGF5RnJvbU9ubGluZVN0ZXBmaWxlLmZ1bGxQYXJzZS50cmFja3MsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5QTEFZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFwibG9hZEFuZFBsYXlCdXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBpc1N3ZkxvYWRTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChcInBsYXlsaXN0TWVudVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBNZW51SXRlbSB7XHJcbiAgICB0b1N0cmluZzogKCkgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UmFkaW9NZW51KHA6IHA1LCB1bmlxdWVJZDogc3RyaW5nLCBpdGVtczogTWVudUl0ZW1bXSk6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IG1lbnVDbGFzcyA9IFwicGxheWxpc3QtcmFkaW9cIlxyXG4gICAgbGV0IG1lbnVJdGVtQ2xhc3MgPSBcInBsYXlsaXN0LXJhZGlvLW9wdGlvblwiO1xyXG4gICAgbGV0IHJhZGlvTWVudUNyZWF0ZVJlc3VsdCA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVSYWRpbygpO1xyXG4gICAgfSwgdW5pcXVlSWQpO1xyXG4gICAgbGV0IHJhZGlvTWVudSA9IHJhZGlvTWVudUNyZWF0ZVJlc3VsdC5lbGVtZW50O1xyXG4gICAgaWYgKCFyYWRpb01lbnVDcmVhdGVSZXN1bHQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXTtcclxuICAgICAgICAgICAgbGV0IHJhZGlvTGFiZWwgPSBpdGVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGV0IHJhZGlvT3B0aW9uID0gcmFkaW9NZW51Lm9wdGlvbihyYWRpb0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHZhbHVlIHRoaXMgd2F5IGJlY2F1c2UgdGhlIHR3by1hcmd1bWVudCAub3B0aW9uIG1ldGhvZCB3YXNuJ3Qgd29ya2luZ1xyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSBpcyBuZWNlc3Nhcnkgc28gd2UgY2FuIGFjY2VzcyB0aGUgc2VsZWN0ZWQgbW9kZVxyXG4gICAgICAgICAgICByYWRpb09wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIHN0eWxlIGlzIGJlaW5nIHNldCBvbiB0aGUgZGl2IGNvbnRhaW5pbmcgdGhlIHJhZGlvIGVsZW1lbnRzIHRvIG1ha2UgaXQgYSBzY3JvbGxhYmxlIGJveFxyXG4gICAgICAgIHJhZGlvTWVudS5hZGRDbGFzcyhtZW51Q2xhc3MpO1xyXG4gICAgICAgIHJhZGlvTWVudS5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocCwgcmFkaW9NZW51KTtcclxuICAgICAgICBmaXhSYWRpb0RpdkVsZW1lbnQocmFkaW9NZW51KTtcclxuICAgICAgICBzdHlsZVJhZGlvT3B0aW9ucyhwLCByYWRpb01lbnUsIFttZW51SXRlbUNsYXNzLCBnbG9iYWwuZ2xvYmFsQ2xhc3NdKTtcclxuICAgIH1cclxuICAgIHJldHVybiByYWRpb01lbnU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdQYWdlQ29udHJvbHMocDogcDUsIHBsYXlsaXN0TWVudUlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBwYWdlQ29udHJvbHNEaXYgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlRGl2KCk7XHJcbiAgICB9LCBcInBhZ2VDb250cm9sc0RpdlwiKTtcclxuICAgIGlmICghcGFnZUNvbnRyb2xzRGl2LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwYWdlQ29udHJvbHNEaXYuZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtY29udHJvbHNcIik7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuYWRkQ2xhc3MoUGxheUZyb21PbmxpbmUuUExBWV9GUk9NX09OTElORV9DTEFTUyk7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwYWdlQ29udHJvbHNEaXYuZWxlbWVudCwgMC41LCAwLjM4MywgMTQwLCAzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhZ2VOdW1iZXJUZXh0ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCB0ZXh0Q29udGFpbmVyID0gcC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICB0ZXh0Q29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIHRleHRDb250YWluZXI7XHJcbiAgICB9LCBcInBhZ2VOdW1iZXJUZXh0XCIpO1xyXG5cclxuICAgIGxldCBwcmV2aW91c1BhZ2VCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiJiM4MjQ5O1wiKTtcclxuICAgIH0sIFwicHJldmlvdXNQYWdlQnV0dG9uXCIpO1xyXG4gICAgaWYgKCFwcmV2aW91c1BhZ2VCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHByZXZpb3VzUGFnZUJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5wcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5bGlzdE1lbnVJZCk7XHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQuaHRtbChcIlBhZ2UgXCIgKyAoZ2xvYmFsLm9ubGluZVBsYXlsaXN0LmdldFBhZ2UoKSArIDEpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwcmV2aW91c1BhZ2VCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtY29udHJvbC1idXR0b25cIik7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuY2hpbGQocHJldmlvdXNQYWdlQnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFwYWdlTnVtYmVyVGV4dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuY2hpbGQocGFnZU51bWJlclRleHQuZWxlbWVudCk7XHJcbiAgICAgICAgcGFnZU51bWJlclRleHQuZWxlbWVudC5odG1sKFwiUGFnZSBcIiArIChnbG9iYWwub25saW5lUGxheWxpc3QuZ2V0UGFnZSgpICsgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBuZXh0UGFnZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCImIzgyNTA7XCIpO1xyXG4gICAgfSwgXCJuZXh0UGFnZUJ1dHRvblwiKTtcclxuICAgIGlmICghbmV4dFBhZ2VCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIG5leHRQYWdlQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgZ2xvYmFsLm9ubGluZVBsYXlsaXN0Lm5leHRQYWdlKCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheWxpc3RNZW51SWQpO1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyVGV4dC5lbGVtZW50Lmh0bWwoXCJQYWdlIFwiICsgKGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5nZXRQYWdlKCkgKyAxKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmV4dFBhZ2VCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtY29udHJvbC1idXR0b25cIik7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuY2hpbGQobmV4dFBhZ2VCdXR0b24uZWxlbWVudCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7c2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmV9IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4uL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc3VsdHMge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG5cclxuICAgICAgICBnbG9iYWwucmVzdWx0c0Rpc3BsYXkuZHJhdygpO1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJSZXR1cm5cIik7XHJcbiAgICAgICAgfSwgXCJyZXR1cm5CdXR0b25cIik7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocmV0dXJuQnV0dG9uLmVsZW1lbnQsIDAuNSwgMC45LCA3MywgMzQpO1xyXG4gICAgICAgIGlmICghcmV0dXJuQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnJldHVybigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5jb25zdCBSRUNPUkRIRUFERVJfTEVOR1RIX0ZVTEwgPSAweDNmXHJcbiAgICAvLyBudWxsLWNoYXJhY3RlclxyXG4gICAgLCBFT1MgPSAweDAwXHJcbiAgICAsIHN0eWxlQ291bnRFeHQgPSAweEZGO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ5dGVSZWFkZXIge1xyXG4gICAgcHVibGljIGJ1ZmZlcl9yYXc6IEFycmF5QnVmZmVyTGlrZTtcclxuICAgIHB1YmxpYyBidWZmZXI6IERhdGFWaWV3O1xyXG4gICAgcHVibGljIHBvaW50ZXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgcHVibGljIGN1cnJlbnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBsZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihidWZmZXI6IEFycmF5QnVmZmVyTGlrZSkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyX3JhdyA9IGJ1ZmZlcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gMDtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdW5zaWduZWQgMTYgb3IgMzIgTGl0dGxlIEVuZGlhbiBCaXRzXHJcbiAgICAgKiBhbmQgYWR2YW5jZSBwb2ludGVyIHRvIG5leHQgYml0cyAvIDggYnl0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYml0c1xyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkVUludExFKGJpdHM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAoYml0cykge1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlOiB0aGUgc2Vjb25kIHBhcmFtZXRlciBtaWdodCBvbmx5IGV4aXN0IGluIEVTNiwgbGV0J3Mgc2VlIGlmIHRoaXMgY2F1c2VzIGFuIGVycm9yXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldFVpbnQ4KHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxNjpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0VWludDE2KHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0VWludDMyKHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IFwiVW5leHBlY3RlZCBudW1iZXIgb2YgYml0czogJ1wiICsgYml0cyArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvaW50ZXIgKz0gYml0cyAvIDg7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdW5zaWduZWQgOCBiaXQgZnJvbSB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZFVJbnQ4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlci5nZXRVaW50OCh0aGlzLnBvaW50ZXIrKyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgZmxvYXQgZnJvbSB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZEZsb2F0KCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRGbG9hdDMyKHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRlciArPSA0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGRvdWJsZSBmcm9tIHRoZSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFZhbHVlIHJlYWQgZnJvbSBidWZmZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkRG91YmxlKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRGbG9hdDY0KHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRlciArPSA4O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIDMyLWJpdCB1bnNpZ25lZCBpbnRlZ2VycyB2YWx1ZSBlbmNvZGVkICgxLTUgYnl0ZXMpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAzMi1iaXQgdW5zaWduZWQgaW50ZWdlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRFbmNvZGVkVTMyKCkge1xyXG4gICAgICAgIGxldCBpID0gNVxyXG4gICAgICAgICAgICAsIHJlc3VsdCA9IDBcclxuICAgICAgICAgICAgLCBuYjtcclxuXHJcbiAgICAgICAgZG9cclxuICAgICAgICAgICAgcmVzdWx0ICs9IChuYiA9IHRoaXMubmV4dEJ5dGUoKSk7XHJcbiAgICAgICAgd2hpbGUgKChuYiAmIDEyOCkgJiYgLS1pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhbiBlbmNvZGVkIGRhdGEgZnJvbSBidWZmZXIgYW5kIHJldHVybnMgYVxyXG4gICAgICogc3RyaW5nIHVzaW5nIHRoZSBzcGVjaWZpZWQgY2hhcmFjdGVyIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBEZWNvZGVkIHN0cmluZ1xyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRTdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IHJlYWQgPSB0aGlzLnJlYWRVSW50OCgpO1xyXG4gICAgICAgICAgICBpZiAocmVhZCA9PT0gRU9TKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHJlYWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGFuIGVuY29kZWQgZGF0YSBmcm9tIGJ1ZmZlciBhbmQgcmV0dXJucyBhXHJcbiAgICAgKiBzdHJpbmcgdXNpbmcgdGhlIHNwZWNpZmllZCBjaGFyYWN0ZXIgc2V0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IERlY29kZWQgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkU3RyaW5nRml4ZWQocmVhZExlbmd0aDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgd2hpbGUgKHJlYWRMZW5ndGgtLSA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHJlYWQgPSB0aGlzLnJlYWRVSW50OCgpO1xyXG4gICAgICAgICAgICBpZiAocmVhZCA9PT0gRU9TKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHJlYWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIFJFQ09SREhFQURFUiBmcm9tIG5leHQgdGFnIGluIHRoZSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRhZyBjb2RlIGFuZCBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRUYWdDb2RlQW5kTGVuZ3RoKCk6IFRhZ0hlYWRlciB7XHJcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBvaW50ZXI7XHJcbiAgICAgICAgbGV0IG4gPSB0aGlzLnJlYWRVSW50TEUoMTYpXHJcbiAgICAgICAgICAgICwgdGFnVHlwZSA9IG4gPj4gNlxyXG4gICAgICAgICAgICAsIHRhZ0xlbmd0aCA9IG4gJiBSRUNPUkRIRUFERVJfTEVOR1RIX0ZVTEw7XHJcblxyXG4gICAgICAgIGlmIChuID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHRhZ0xlbmd0aCA9PT0gUkVDT1JESEVBREVSX0xFTkdUSF9GVUxMKVxyXG4gICAgICAgICAgICB0YWdMZW5ndGggPSB0aGlzLnJlYWRVSW50TEUoMzIpO1xyXG5cclxuICAgICAgICByZXR1cm4ge3N0YXJ0OiBwLCBlbmQ6IHRoaXMucG9pbnRlciArIHRhZ0xlbmd0aCwgY29kZTogdGFnVHlwZSwgbGVuZ3RoOiB0YWdMZW5ndGgsIHBvc2l0aW9uOiB0aGlzLnBvaW50ZXJ9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIFJFQ09SREhFQURFUiBmcm9tIG5leHQgdGFnIGluIHRoZSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRhZyBjb2RlIGFuZCBsZW5ndGhcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkQWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzID0gdGhpcy5wb2ludGVyO1xyXG4gICAgICAgIGxldCBhID0gdGhpcy5yZWFkVUludDgoKTtcclxuICAgICAgICBsZXQgbCA9IChhICYgMHg4MCkgPyB0aGlzLnJlYWRVSW50TEUoMTYpIDogMDtcclxuICAgICAgICBsZXQgcCA9IHRoaXMucG9pbnRlcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtzdGFydDogcywgYWN0aW9uOiBhLCBsZW5ndGg6IGwsIHBvc2l0aW9uOiBwfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBSRUNUIGZvcm1hdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1JlY3R9IHgsIHksIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIFJFQ1RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRSZWN0KCk6IFJlY3Qge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgbGV0IE5CaXRzID0gdGhpcy5yZWFkQml0cyg1KVxyXG4gICAgICAgICAgICAsIFhtaW4gPSB0aGlzLnJlYWRCaXRzKE5CaXRzLCB0cnVlKSAvIDIwXHJcbiAgICAgICAgICAgICwgWG1heCA9IHRoaXMucmVhZEJpdHMoTkJpdHMsIHRydWUpIC8gMjBcclxuICAgICAgICAgICAgLCBZbWluID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMFxyXG4gICAgICAgICAgICAsIFltYXggPSB0aGlzLnJlYWRCaXRzKE5CaXRzLCB0cnVlKSAvIDIwO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBYbWluLFxyXG4gICAgICAgICAgICB5OiBZbWluLFxyXG4gICAgICAgICAgICB3aWR0aDogKFhtYXggPiBYbWluID8gWG1heCAtIFhtaW4gOiBYbWluIC0gWG1heCksXHJcbiAgICAgICAgICAgIGhlaWdodDogKFltYXggPiBZbWluID8gWW1heCAtIFltaW4gOiBZbWluIC0gWW1heClcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgaW50ZXJuYWwgcG9pbnRlciB0byB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwb3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlZWsocG9zOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSBwb3MgJSB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyBwb3NpdGlvbiBhbmQgc2V0cyBjdXJyZW50IHRvIG5leHQgQnl0ZSBpbiBidWZmZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV4dEJ5dGUoKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gMTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG5leHQgQnl0ZSBpbiB0aGUgYnVmZmVyIGFuZCBJbmNyZW1lbnQgaW50ZXJuYWwgcG9pbnRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gTmV4dCBieXRlIGluIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIG5leHRCeXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50ZXIgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoID8gbnVsbCA6IHRoaXMuYnVmZmVyLmdldFVpbnQ4KHRoaXMucG9pbnRlcisrKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBiIGJpdHMgZnJvbSBjdXJyZW50IGJ5dGUgaW4gYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gQml0cyByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkQml0cyhiOiBudW1iZXIsIHNpZ25lZDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IG4gPSAwXHJcbiAgICAgICAgICAgICwgciA9IDBcclxuICAgICAgICAgICAgLCBzaWduID0gc2lnbmVkICYmICsrbiAmJiAoKHRoaXMuY3VycmVudCA+PiAoOCAtIHRoaXMucG9zaXRpb24rKykpICYgMSkgPyAtMSA6IDE7XHJcblxyXG4gICAgICAgIHdoaWxlIChuKysgPCBiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID4gOCkgdGhpcy5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgciA9IChyIDw8IDEpICsgKCh0aGlzLmN1cnJlbnQgPj4gKDggLSB0aGlzLnBvc2l0aW9uKyspKSAmIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2lnbiAqIHI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVwbGFjZSBieXRlcyBpbiB0aGUgQXJyYXlCdWZmZXIgd2l0aCB0aGUgcHJvdmlkZWQgYnl0ZXMuXHJcbiAgICAgKiBUaGlzIHNsaWNlcyB0aGUgZnJvbSBgMCAtPiBwb2ludGVyYCBhbmQgYHBvc2l0aW9uX2VuZCAtPiBidWZmZXJsZW5ndGhgXHJcbiAgICAgKiBhbmQgaW5zZXJ0cyB0aGUgZ2l2ZW4gYnl0ZXMgYmV0d2VlbiB0aGVtLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gQml0cyByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBsYWNlQnl0ZXMobmV3X2J5dGVzOiBhbnksIHBvc3Rpb25fZW5kOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYnVmZmVyMSA9IHRoaXMuYnVmZmVyX3Jhdy5zbGljZSgwLCB0aGlzLnBvaW50ZXIpO1xyXG4gICAgICAgIGxldCBidWZmZXIyID0gbmV3X2J5dGVzO1xyXG4gICAgICAgIGxldCBidWZmZXIzID0gdGhpcy5idWZmZXJfcmF3LnNsaWNlKHBvc3Rpb25fZW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHRtcCA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcjEuYnl0ZUxlbmd0aCArIGJ1ZmZlcjIuYnl0ZUxlbmd0aCArIGJ1ZmZlcjMuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmZXIxKSwgMCk7XHJcbiAgICAgICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmZXIyKSwgYnVmZmVyMS5ieXRlTGVuZ3RoKTtcclxuICAgICAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlcjMpLCBidWZmZXIxLmJ5dGVMZW5ndGggKyBidWZmZXIyLmJ5dGVMZW5ndGgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1ZmZlcl9yYXcgPSB0bXAuYnVmZmVyO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gbmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyX3Jhdyk7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gMDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gMTtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVjdCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnIHtcclxuICAgIHBvb2w/OiBzdHJpbmdbXTtcclxuICAgIHZhcmlhYmxlcz86IGFueTtcclxuICAgIGhlYWRlcj86IFRhZ0hlYWRlcjtcclxuICAgIGRvSW5jbHVkZT86IGJvb2xlYW47XHJcbiAgICBkYXRhPzogQXJyYXlCdWZmZXJMaWtlXHJcbiAgICBhdWRpb19ieXRlcz86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWdIZWFkZXIge1xyXG4gICAgc3RhcnQ6IG51bWJlcjtcclxuICAgIGVuZDogbnVtYmVyO1xyXG4gICAgY29kZTogbnVtYmVyO1xyXG4gICAgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG59IiwiZXhwb3J0IGNsYXNzIFBhcnRpYWxQYXJzZSB7XHJcbiAgICBtZXRhRGF0YTogTWFwPHN0cmluZywgc3RyaW5nPjtcclxuICAgIG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W107XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE5vdGVUeXBlIHtcclxuICAgIE5PTkUgPSBcIjBcIixcclxuICAgIE5PUk1BTCA9IFwiMVwiLFxyXG4gICAgSE9MRF9IRUFEID0gXCIyXCIsXHJcbiAgICBUQUlMID0gXCIzXCIsXHJcbiAgICBST0xMX0hFQUQgPSBcIjRcIixcclxuICAgIE1JTkUgPSBcIk1cIixcclxuICAgIFVOS05PV04gPSBcIj8/P1wiLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9Ob3RlVHlwZShzdHJpbmc6IHN0cmluZyk6IE5vdGVUeXBlIHtcclxuICAgIHN3aXRjaCAoc3RyaW5nKSB7XHJcbiAgICAgICAgY2FzZSBcIjBcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLk5PTkU7XHJcbiAgICAgICAgY2FzZSBcIjFcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLk5PUk1BTDtcclxuICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuSE9MRF9IRUFEO1xyXG4gICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5UQUlMO1xyXG4gICAgICAgIGNhc2UgXCI0XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5ST0xMX0hFQUQ7XHJcbiAgICAgICAgY2FzZSBcIk1cIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLk1JTkU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLlVOS05PV047XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE5vdGVTdGF0ZSB7XHJcbiAgICBERUZBVUxULFxyXG4gICAgSElULFxyXG4gICAgTUlTU0VELFxyXG4gICAgSEVMRCxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3RlIHtcclxuICAgIHR5cGU6IE5vdGVUeXBlO1xyXG4gICAgdHlwZVN0cmluZzogc3RyaW5nOyAvLyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlIEJFRk9SRSBpdCdzIGludGVycHJldGVkIGFzIGEgTm90ZVR5cGVcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcjtcclxuICAgIHN0YXRlPzogTm90ZVN0YXRlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kZSB7XHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGRpZmZpY3VsdHk6IHN0cmluZztcclxuICAgIHB1YmxpYyBtZXRlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGdWxsUGFyc2Uge1xyXG4gICAgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbiAgICBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdO1xyXG4gICAgb2Zmc2V0OiBudW1iZXI7XHJcbiAgICBicG1zOiBbbnVtYmVyLCBudW1iZXJdW107XHJcbiAgICBzdG9wczogW251bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgdHJhY2tzOiBOb3RlW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZSkge1xyXG4gICAgICAgIHRoaXMubWV0YURhdGEgPSBwYXJ0aWFsUGFyc2UubWV0YURhdGE7XHJcbiAgICAgICAgdGhpcy5tb2RlcyA9IHBhcnRpYWxQYXJzZS5tb2RlcztcclxuICAgIH1cclxufVxyXG5cclxuLyogU3RlcCBPbmUgT2YgUGFyc2luZyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFydGlhbFBhcnNlKGZpbGVDb250ZW50czogc3RyaW5nKSB7XHJcbiAgICBsZXQgcGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UgPSBuZXcgUGFydGlhbFBhcnNlKCk7XHJcbiAgICBwYXJ0aWFsUGFyc2UubWV0YURhdGEgPSBnZXRUb3BNZXRhRGF0YUFzU3RyaW5ncyhmaWxlQ29udGVudHMpO1xyXG4gICAgcGFydGlhbFBhcnNlLm1vZGVzID0gZ2V0TW9kZXNJbmZvQXNTdHJpbmdzKGZpbGVDb250ZW50cyk7XHJcbiAgICByZXR1cm4gcGFydGlhbFBhcnNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb3BNZXRhRGF0YUFzU3RyaW5ncyhmaWxlOiBzdHJpbmcpIHtcclxuICAgIC8vIG1hdGNoIGFueSBtZXRhZGF0YSB0YWcgZXhjbHVkaW5nIHRoZSBcIk5PVEVTXCIgdGFnIChjYXNlLWluc2Vuc2l0aXZlKVxyXG4gICAgbGV0IHJlID0gLyMoPyFbbk5dW29PXVt0VF1bZUVdW3NTXSkoW146XSspOihbXjtdKyk7L2c7XHJcbiAgICBsZXQgbWF0Y2hlcyA9IFsuLi5maWxlLm1hdGNoQWxsKHJlKV07XHJcbiAgICBsZXQgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaGVzW2ldO1xyXG4gICAgICAgIG1ldGFEYXRhLnNldChjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoWzFdKS50b1VwcGVyQ2FzZSgpLCBjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoWzJdKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWV0YURhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1vZGVzSW5mb0FzU3RyaW5ncyhmaWxlQ29udGVudHM6IHN0cmluZykge1xyXG4gICAgLy8gR2V0IFwiTk9URVNcIiBzZWN0aW9ucyAoY2FzZS1pbnNlbnNpdGl2ZSkuIFRoZSBmaXJzdCBmaXZlIHZhbHVlcyBhcmUgcG9zdGZpeGVkIHdpdGggYSBjb2xvbi5cclxuICAgIC8vIE5vdGUgZGF0YSBjb21lcyBsYXN0LCBwb3N0Zml4ZWQgYnkgYSBzZW1pY29sb24uXHJcbiAgICBsZXQgcmUgPSAvI1tuTl1bb09dW3RUXVtlRV1bc1NdOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjpdKik6KFteOl0qKTooW147XSs7KS9nO1xyXG4gICAgbGV0IG1hdGNoZXMgPSBbLi4uZmlsZUNvbnRlbnRzLm1hdGNoQWxsKHJlKV07XHJcbiAgICBsZXQgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXSA9IFtdO1xyXG4gICAgbGV0IGZpZWxkTmFtZXMgPSBbXCJ0eXBlXCIsIFwiZGVzYy9hdXRob3JcIiwgXCJkaWZmaWN1bHR5XCIsIFwibWV0ZXJcIiwgXCJyYWRhclwiXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtYXRjaCA9IG1hdGNoZXNbaV07XHJcbiAgICAgICAgbGV0IG1vZGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBtYXRjaC5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgbW9kZS5zZXQoZmllbGROYW1lc1tqIC0gMV0sIGNsZWFuTWV0YURhdGFTdHJpbmcobWF0Y2hbal0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbW9kZS5zZXQoXCJub3Rlc1wiLCBtYXRjaFttYXRjaC5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgbW9kZXMucHVzaChtb2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtb2RlcztcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYW5NZXRhRGF0YVN0cmluZyhzdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnRyaW0oKS5yZXBsYWNlKC9cXG4vZywgXCJcIik7XHJcbn1cclxuXHJcbi8qIFN0ZXAgVHdvIE9mIFBhcnNpbmcgKi9cclxuXHJcbi8vIFRPRE86IGFjdHVhbGx5IHJldHVybiBGdWxsUGFyc2VcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxQYXJzZShtb2RlSW5kZXg6IG51bWJlciwgcGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UpOiBGdWxsUGFyc2Uge1xyXG4gICAgbGV0IGZ1bGxQYXJzZSA9IG5ldyBGdWxsUGFyc2UocGFydGlhbFBhcnNlKTtcclxuICAgIGxldCB1bnBhcnNlZE5vdGVzOiBzdHJpbmcgPSBwYXJ0aWFsUGFyc2UubW9kZXNbbW9kZUluZGV4XS5nZXQoXCJub3Rlc1wiKTtcclxuICAgIGxldCB1bnBhcnNlZEFycmF5OiBzdHJpbmdbXSA9IHVucGFyc2VkTm90ZXMuc3BsaXQoXCJcXG5cIik7XHJcbiAgICBsZXQgbWVhc3VyZXM6IHN0cmluZ1tdW10gPSBnZXRNZWFzdXJlcyh1bnBhcnNlZEFycmF5KTtcclxuICAgIGxldCBiZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSBnZXRCZWF0SW5mb0J5TGluZShtZWFzdXJlcyk7XHJcbiAgICBsZXQgY2xlYW5lZEJlYXRzQW5kTGluZXM6IHsgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSA9IHJlbW92ZUJsYW5rTGluZXMoYmVhdHNBbmRMaW5lcyk7XHJcbiAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSBwYXJzZUZsb2F0KHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJPRkZTRVRcIikpO1xyXG4gICAgbGV0IGJwbXM6IHsgYmVhdDogbnVtYmVyOyBicG06IG51bWJlciB9W10gPSBwYXJzZUJQTVMocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIkJQTVNcIikpO1xyXG4gICAgbGV0IHN0b3BzOiB7IHN0b3BEdXJhdGlvbjogbnVtYmVyOyBiZWF0OiBudW1iZXIgfVtdID0gcGFyc2VTdG9wcyhwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiU1RPUFNcIikpO1xyXG4gICAgbGV0IHRpbWVzQmVhdHNBbmRMaW5lczogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZyB9W10gPSBnZXRUaW1lSW5mb0J5TGluZShjbGVhbmVkQmVhdHNBbmRMaW5lcywgb2Zmc2V0LCBicG1zLCBzdG9wcyk7XHJcbiAgICBmdWxsUGFyc2UudHJhY2tzID0gZ2V0VHJhY2tzRnJvbUxpbmVzKHRpbWVzQmVhdHNBbmRMaW5lcyk7XHJcbiAgICByZXR1cm4gZnVsbFBhcnNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNZWFzdXJlcyh1bnBhcnNlZEFycmF5OiBzdHJpbmdbXSkge1xyXG4gICAgbGV0IG1lYXN1cmVzOiBzdHJpbmdbXVtdID0gW107XHJcbiAgICBsZXQgc3RhdGUgPSAwO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGN1cnJlbnRNZWFzdXJlOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgd2hpbGUgKGkgPCB1bnBhcnNlZEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50TGluZSA9IHVucGFyc2VkQXJyYXlbaV07XHJcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRMaW5lLmluY2x1ZGVzKFwiLy9cIikgJiYgY3VycmVudExpbmUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50TGluZS5pbmNsdWRlcyhcIixcIikgJiYgIWN1cnJlbnRMaW5lLmluY2x1ZGVzKFwiO1wiKSAmJiBjdXJyZW50TGluZS50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50TWVhc3VyZS5wdXNoKGN1cnJlbnRMaW5lLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZXMucHVzaChjdXJyZW50TWVhc3VyZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TWVhc3VyZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lYXN1cmVzO1xyXG59XHJcblxyXG4vLyBhc3N1bWVzIDQvNCB0aW1lIHNpZ25hdHVyZVxyXG5mdW5jdGlvbiBnZXRCZWF0SW5mb0J5TGluZShtZWFzdXJlczogc3RyaW5nW11bXSkge1xyXG4gICAgbGV0IGJlYXRzQW5kTGluZXMgPSBbXTtcclxuICAgIGxldCBjdXJyZW50QmVhdCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lYXN1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1lYXN1cmUgPSBtZWFzdXJlc1tpXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1lYXN1cmUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgYmVhdHNBbmRMaW5lcy5wdXNoKHtiZWF0OiBjdXJyZW50QmVhdCwgbGluZUluZm86IG1lYXN1cmVbal19KTtcclxuICAgICAgICAgICAgY3VycmVudEJlYXQgKz0gNCAvIG1lYXN1cmUubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBiZWF0c0FuZExpbmVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVCbGFua0xpbmVzKGJlYXRzQW5kTGluZXM6IHsgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSkge1xyXG4gICAgbGV0IGNsZWFuZWRCZWF0c0FuZExpbmVzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJlYXRzQW5kTGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbGluZSA9IGJlYXRzQW5kTGluZXNbaV07XHJcbiAgICAgICAgaWYgKCFpc0FsbFplcm9zKGxpbmUubGluZUluZm8pKSB7XHJcbiAgICAgICAgICAgIGNsZWFuZWRCZWF0c0FuZExpbmVzLnB1c2gobGluZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNsZWFuZWRCZWF0c0FuZExpbmVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FsbFplcm9zKHN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzdHJpbmcuY2hhckF0KGkpICE9PSAnMCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lSW5mb0J5TGluZShpbmZvQnlMaW5lOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10sIG9mZnNldDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdLCBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXVxyXG4pOiB7IHRpbWU6IG51bWJlciwgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSB7XHJcbiAgICBsZXQgaW5mb0J5TGluZVdpdGhUaW1lOiB7IHRpbWU6IG51bWJlciwgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSA9IFtdO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gLW9mZnNldCArIGdldEVsYXBzZWRUaW1lKDAsIGluZm9CeUxpbmVbMF0uYmVhdCwgYnBtcywgc3RvcHMpO1xyXG4gICAgaW5mb0J5TGluZVdpdGhUaW1lLnB1c2goe3RpbWU6IGN1cnJlbnRUaW1lLCBiZWF0OiBpbmZvQnlMaW5lWzBdLmJlYXQsIGxpbmVJbmZvOiBpbmZvQnlMaW5lWzBdLmxpbmVJbmZvfSk7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGluZm9CeUxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RhcnRCZWF0ID0gaW5mb0J5TGluZVtpIC0gMV0uYmVhdDtcclxuICAgICAgICBsZXQgZW5kQmVhdCA9IGluZm9CeUxpbmVbaV0uYmVhdDtcclxuICAgICAgICBjdXJyZW50VGltZSArPSBnZXRFbGFwc2VkVGltZShzdGFydEJlYXQsIGVuZEJlYXQsIGJwbXMsIHN0b3BzKTtcclxuICAgICAgICBpbmZvQnlMaW5lV2l0aFRpbWUucHVzaCh7dGltZTogY3VycmVudFRpbWUsIGJlYXQ6IGluZm9CeUxpbmVbaV0uYmVhdCwgbGluZUluZm86IGluZm9CeUxpbmVbaV0ubGluZUluZm99KTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbmZvQnlMaW5lV2l0aFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEVsYXBzZWRUaW1lKHN0YXJ0QmVhdDogbnVtYmVyLCBlbmRCZWF0OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BzOiB7IGJlYXQ6IG51bWJlciwgc3RvcER1cmF0aW9uOiBudW1iZXIgfVtdKSB7XHJcbiAgICBsZXQgY3VycmVudEJQTUluZGV4OiBudW1iZXIgPSBnZXRTdGFydEJQTUluZGV4KHN0YXJ0QmVhdCwgYnBtcyk7XHJcbiAgICBsZXQgZWFybGllc3RCZWF0OiBudW1iZXIgPSBzdGFydEJlYXQ7XHJcbiAgICBsZXQgZWxhcHNlZFRpbWU6IG51bWJlciA9IHN0b3BzID09IG51bGwgPyAwIDogc3RvcHBlZFRpbWUoc3RhcnRCZWF0LCBlbmRCZWF0LCBzdG9wcyk7XHJcbiAgICBkbyB7XHJcbiAgICAgICAgbGV0IG5leHRCUE1DaGFuZ2U6IG51bWJlciA9IGdldE5leHRCUE1DaGFuZ2UoY3VycmVudEJQTUluZGV4LCBicG1zKTtcclxuICAgICAgICBsZXQgbmV4dEJlYXQ6IG51bWJlciA9IE1hdGgubWluKGVuZEJlYXQsIG5leHRCUE1DaGFuZ2UpO1xyXG4gICAgICAgIGVsYXBzZWRUaW1lICs9IChuZXh0QmVhdCAtIGVhcmxpZXN0QmVhdCkgLyBicG1zW2N1cnJlbnRCUE1JbmRleF0uYnBtICogNjA7XHJcbiAgICAgICAgZWFybGllc3RCZWF0ID0gbmV4dEJlYXQ7XHJcbiAgICAgICAgY3VycmVudEJQTUluZGV4Kys7XHJcbiAgICB9IHdoaWxlIChlYXJsaWVzdEJlYXQgPCBlbmRCZWF0KTtcclxuICAgIHJldHVybiBlbGFwc2VkVGltZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RhcnRCUE1JbmRleChzdGFydEJlYXQ6IG51bWJlciwgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IHN0YXJ0QlBNSW5kZXggPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBicG1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJwbXNbaV0uYmVhdCA8IHN0YXJ0QmVhdCkge1xyXG4gICAgICAgICAgICBzdGFydEJQTUluZGV4ID0gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhcnRCUE1JbmRleDtcclxufVxyXG5cclxuLy8gZG9lcyBOT1Qgc25hcCB0byBuZWFyZXN0IDEvMTkybmQgb2YgYmVhdFxyXG5mdW5jdGlvbiBzdG9wcGVkVGltZShzdGFydEJlYXQ6IG51bWJlciwgZW5kQmVhdDogbnVtYmVyLCBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IHRpbWUgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzdG9wQmVhdCA9IHN0b3BzW2ldLmJlYXQ7XHJcbiAgICAgICAgaWYgKHN0YXJ0QmVhdCA8PSBzdG9wQmVhdCAmJiBzdG9wQmVhdCA8IGVuZEJlYXQpIHtcclxuICAgICAgICAgICAgdGltZSArPSBzdG9wc1tpXS5zdG9wRHVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5leHRCUE1DaGFuZ2UoY3VycmVudEJQTUluZGV4OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10pIHtcclxuICAgIGlmIChjdXJyZW50QlBNSW5kZXggKyAxIDwgYnBtcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gYnBtc1tjdXJyZW50QlBNSW5kZXggKyAxXS5iZWF0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VHJhY2tzRnJvbUxpbmVzKHRpbWVzQmVhdHNBbmRMaW5lczogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZzsgfVtdKSB7XHJcbiAgICBsZXQgbnVtVHJhY2tzOiBudW1iZXIgPSB0aW1lc0JlYXRzQW5kTGluZXNbMF0ubGluZUluZm8ubGVuZ3RoO1xyXG4gICAgbGV0IHRyYWNrczogTm90ZVtdW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICB0cmFja3MucHVzaChbXSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVzQmVhdHNBbmRMaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBsaW5lOiB7IHRpbWU6IG51bWJlcjsgYmVhdDogbnVtYmVyOyBsaW5lSW5mbzogc3RyaW5nIH0gPSB0aW1lc0JlYXRzQW5kTGluZXNbaV07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsaW5lLmxpbmVJbmZvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlU3RyaW5nID0gbGluZS5saW5lSW5mby5jaGFyQXQoaik7XHJcbiAgICAgICAgICAgIGxldCBub3RlVHlwZTogTm90ZVR5cGUgPSBzdHJpbmdUb05vdGVUeXBlKHR5cGVTdHJpbmcpO1xyXG4gICAgICAgICAgICBpZiAobm90ZVR5cGUgIT09IE5vdGVUeXBlLk5PTkUpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrc1tqXS5wdXNoKHt0eXBlOiBub3RlVHlwZSwgdHlwZVN0cmluZzogdHlwZVN0cmluZywgdGltZUluU2Vjb25kczogbGluZS50aW1lfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJhY2tzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUJQTVMoYnBtU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGlmIChicG1TdHJpbmcgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGxldCBicG1BcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihicG1TdHJpbmcpO1xyXG4gICAgbGV0IGJwbXM6IHsgYmVhdDogbnVtYmVyOyBicG06IG51bWJlciB9W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnBtQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBicG1zLnB1c2goe2JlYXQ6IGJwbUFycmF5W2ldWzBdLCBicG06IGJwbUFycmF5W2ldWzFdfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnBtcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VTdG9wcyhzdG9wc1N0cmluZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoc3RvcHNTdHJpbmcgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGxldCBzdG9wc0FycmF5OiBbbnVtYmVyLCBudW1iZXJdW10gPSBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKHN0b3BzU3RyaW5nKTtcclxuICAgIGxldCBzdG9wczogeyBzdG9wRHVyYXRpb246IG51bWJlcjsgYmVhdDogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9wc0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3RvcHMucHVzaCh7YmVhdDogc3RvcHNBcnJheVtpXVswXSwgc3RvcER1cmF0aW9uOiBzdG9wc0FycmF5W2ldWzFdfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RvcHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oc3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGxldCBzdHJpbmdBcnJheTogc3RyaW5nW11bXSA9IHN0cmluZy5zcGxpdChcIixcIikubWFwKGUgPT4gZS50cmltKCkuc3BsaXQoXCI9XCIpKTtcclxuICAgIGxldCBhcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYXJyYXkucHVzaChbcGFyc2VGbG9hdChzdHJpbmdBcnJheVtpXVswXSksIHBhcnNlRmxvYXQoc3RyaW5nQXJyYXlbaV1bMV0pXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn0iLCJpbXBvcnQge1NXRlRhZ3N9IGZyb20gXCIuL3N3Zi10YWdzXCI7XHJcbmltcG9ydCB7U1dGLCB1bmNvbXByZXNzfSBmcm9tIFwiLi9zd2YtcmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN3ZlBhcnNlUmVzcG9uc2Uge1xyXG4gICAgY2hhcnREYXRhOiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ11bXTtcclxuICAgIGJsb2I6IEJsb2I7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN3ZkZyb21BcnJheUJ1ZmZlcihpbnB1dDogQXJyYXlCdWZmZXIpOiBTd2ZQYXJzZVJlc3BvbnNlIHtcclxuICAgIHJldHVybiBzd2ZGaWxlX1JlYWR5KDxVaW50OEFycmF5PiBpbnB1dCk7XHJcbn1cclxuXHJcbmxldCBzd2ZfdGFnczogU1dGO1xyXG5cclxuZnVuY3Rpb24gc3dmRmlsZV9SZWFkeShidWZmZXI6IFVpbnQ4QXJyYXkpOiBTd2ZQYXJzZVJlc3BvbnNlIHtcclxuICAgIHN3Zl90YWdzID0gdW5jb21wcmVzcyhidWZmZXIpO1xyXG4gICAgXHJcbiAgICAvLyBDaGFydCBEYXRhXHJcbiAgICBsZXQgY2hhcnRfdGFnID0gZ2V0QmVhdEJveCgpO1xyXG4gICAgbGV0IGNoYXJ0X2RhdGEgPSBjaGFydF90YWdbXCJ2YXJpYWJsZXNcIl1bXCJfcm9vdFwiXVtcImJlYXRCb3hcIl07XHJcblxyXG4gICAgLy8gTXVzaWMgRGF0YVxyXG4gICAgbGV0IG11c2ljX2JpbmFyeSA9IGdldEF1ZGlvKCk7XHJcbiAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFttdXNpY19iaW5hcnldLCB7dHlwZSA6ICdhdWRpby9tcGVnJ30pO1xyXG5cclxuICAgIHJldHVybiB7YmxvYjogYmxvYiwgY2hhcnREYXRhOiBjaGFydF9kYXRhfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgQmVhdGJveCBpbiB0aGUgc3dmX3RhZ3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCZWF0Qm94KCkge1xyXG4gICAgbGV0IGxlbiA9IHN3Zl90YWdzLnRhZ3MubGVuZ3RoO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGVsbSA9IG51bGw7XHJcblxyXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBlbG0gPSBzd2ZfdGFncy50YWdzW2ldO1xyXG4gICAgICAgIGlmKGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLkRPQUNUSU9OKVxyXG4gICAgICAgICAgICByZXR1cm4gZWxtO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZCBCZWF0Ym94IGluIHRoZSBzd2ZfdGFncy5cclxuICovXHJcbmZ1bmN0aW9uIGdldEF1ZGlvKCkge1xyXG4gICAgbGV0IGxlbiA9IHN3Zl90YWdzLnRhZ3MubGVuZ3RoO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGVsbSA9IG51bGw7XHJcblxyXG4gICAgbGV0IGF1ZGlvU2l6ZSA9IDBcclxuXHJcbiAgICAvLyBMb29wIEFsbCBBdWRpbyBUYWdzLCBnZXQgVG90YWwgQnl0ZSBTaXplXHJcbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGVsbSA9IHN3Zl90YWdzLnRhZ3NbaV07XHJcbiAgICAgICAgaWYoZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuREVGSU5FU09VTkQgfHwgZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuU1RSRUFNQkxPQ0spXHJcbiAgICAgICAgICAgIGF1ZGlvU2l6ZSArPSBlbG0uYXVkaW9fYnl0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTG9vcCBBbGwgQXVkaW8gVGFncywgZ2V0IFRvdGFsIEJ5dGUgU2l6ZVxyXG4gICAgbGV0IHdyaXRlUG9zaXRpb24gPSAwO1xyXG4gICAgbGV0IGJpbmFyeSA9IG5ldyBVaW50OEFycmF5KGF1ZGlvU2l6ZSk7XHJcbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGVsbSA9IHN3Zl90YWdzLnRhZ3NbaV07XHJcbiAgICAgICAgaWYoZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuREVGSU5FU09VTkQgfHwgZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuU1RSRUFNQkxPQ0spIHtcclxuICAgICAgICAgICAgYmluYXJ5LnNldChuZXcgVWludDhBcnJheShlbG0uZGF0YSksIHdyaXRlUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB3cml0ZVBvc2l0aW9uICs9IGVsbS5hdWRpb19ieXRlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmluYXJ5O1xyXG59IiwiaW1wb3J0ICogYXMgcGFrbyBmcm9tIFwicGFrb1wiO1xyXG5pbXBvcnQge1NXRkFjdGlvblRhZ3MsIFNXRk90aGVyVGFncywgU1dGVGFncywgU1dGVHlwZVRhZ3N9IGZyb20gXCIuL3N3Zi10YWdzXCI7XHJcbmltcG9ydCB7Qnl0ZVJlYWRlciwgUmVjdCwgVGFnLCBUYWdIZWFkZXJ9IGZyb20gXCIuL2J5dGVfcmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU1dGIHtcclxuICAgIHB1YmxpYyBidWZmZXI6IEJ5dGVSZWFkZXI7XHJcbiAgICBwdWJsaWMgbWFnaWM6IHN0cmluZztcclxuICAgIHB1YmxpYyB2ZXJzaW9uOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZmlsZUxlbmd0aDogeyBjb21wcmVzc2VkOiBudW1iZXIsIHVuY29tcHJlc3NlZDogbnVtYmVyIH07XHJcbiAgICBwdWJsaWMgZnJhbWVTaXplOiBSZWN0O1xyXG4gICAgcHVibGljIGZyYW1lUmF0ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0YWdzOiBhbnlbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmNhdCBTV0YgSGVhZGVyIHdpdGggdW5jb21wcmVzc2VkIEJ1ZmZlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdFNXRkhlYWRlcihidWZmOiBVaW50OEFycmF5LCBzd2Y6IEFycmF5QnVmZmVyKSB7XHJcbiAgICBsZXQgdG1wID0gbmV3IFVpbnQ4QXJyYXkoYnVmZi5ieXRlTGVuZ3RoICsgOCk7XHJcbiAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KHN3Zi5zbGljZSgwLCA4KSkpO1xyXG4gICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmKSwgOCk7XHJcbiAgICByZXR1cm4gdG1wLmJ1ZmZlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlY29tcHJlc3MgU1dGIGlmIG5lZWRlZCBhbmQgUmVhZCBTV0ZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmNvbXByZXNzKHN3ZjogVWludDhBcnJheSkge1xyXG4gICAgbGV0IHN3Zl9ieXRlcyA9IG5ldyBVaW50OEFycmF5KHN3Zik7XHJcbiAgICBsZXQgY29tcHJlc3NlZF9idWZmOiBVaW50OEFycmF5ID0gc3dmLnNsaWNlKDgpO1xyXG5cclxuICAgIC8vIHVuY29tcHJlc3MgYnVmZmVyXHJcbiAgICBzd2l0Y2ggKHN3Zl9ieXRlc1swXSkgeyAvLyBNQUdJQ1xyXG4gICAgICAgIGNhc2UgMHg0MyA6IC8vICdDJyA9IHpsaWIgY29tcHJlc3NlZFxyXG4gICAgICAgICAgICBsZXQgdW5jb21wcmVzc2VkX2J1ZmYgPSBjb25jYXRTV0ZIZWFkZXIocGFrby5pbmZsYXRlKGNvbXByZXNzZWRfYnVmZiksIHN3Zik7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkU1dGQnVmZihuZXcgQnl0ZVJlYWRlcih1bmNvbXByZXNzZWRfYnVmZiksIHN3Zik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDB4NDYgOiAvLyAnRicgPSB1bmNvbXByZXNzZWRcclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRTV0ZCdWZmKG5ldyBCeXRlUmVhZGVyKHN3ZiksIHN3Zik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDB4NWEgOiAvLyBMWk1BIGNvbXByZXNzZWRcclxuICAgICAgICAgICAgYWxlcnQoJ0Nhbm5vdCBoYW5kbGUgTFpNQSBTV0YgY29tcHJlc3Npb25zJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgYWxlcnQoJ1Vua25vd24gU1dGIGNvbXByZXNzaW9ucycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlYWRzIHRoZSBTV0YgZnJvbSB1bmNvbXByZXNzZWQgYnVmZmVyLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRTV0ZCdWZmKGJ1ZmY6IEJ5dGVSZWFkZXIsIGNvbXByZXNzZWRfYnVmZjogQXJyYXlCdWZmZXIpOiBTV0Yge1xyXG4gICAgYnVmZi5zZWVrKDApOy8vIHN0YXJ0XHJcblxyXG4gICAgbGV0IHN3ZiA9IG5ldyBTV0YoKVxyXG4gICAgc3dmLmJ1ZmZlciA9IGJ1ZmY7XHJcbiAgICBzd2YubWFnaWMgPSBidWZmLnJlYWRTdHJpbmdGaXhlZCgzKTtcclxuICAgIHN3Zi52ZXJzaW9uID0gYnVmZi5yZWFkVUludDgoKTtcclxuICAgIHN3Zi5maWxlTGVuZ3RoID0ge1xyXG4gICAgICAgIGNvbXByZXNzZWQ6IGNvbXByZXNzZWRfYnVmZi5ieXRlTGVuZ3RoLFxyXG4gICAgICAgIHVuY29tcHJlc3NlZDogYnVmZi5yZWFkVUludExFKDMyKVxyXG4gICAgfTtcclxuICAgIHN3Zi5mcmFtZVNpemUgPSBidWZmLnJlYWRSZWN0KCk7XHJcbiAgICBzd2YuZnJhbWVSYXRlID0gYnVmZi5yZWFkVUludExFKDE2KSAvIDI1NjtcclxuICAgIHN3Zi5mcmFtZUNvdW50ID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgc3dmLnRhZ3MgPSByZWFkU1dGVGFncyhidWZmKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzd2Y7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgdGhlIFNXRiBUQUcgZGF0YSBzdHJ1Y3R1cmUsIGtlZXBpbmcgb25seSB0aGUgdGFnc1xyXG4gKiB3ZSBhcmUgaW50ZXJlc3RlZCBpbi5cclxuICogLSBBdWRpbyBUYWdzOiBBdWRpbyBTYW1wbGVzXHJcbiAqIC0gRG8gQWN0aW9uIFRhZzogQ29udGFpbmluZyB0aGUgYmVhdEJveCB2YXJpYWJsZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkU1dGVGFncyhidWZmOiBCeXRlUmVhZGVyKSB7XHJcbiAgICBsZXQgdGFnczogVGFnW10gPSBbXTtcclxuICAgIGxldCB0YWdIZWFkZXI6IFRhZ0hlYWRlcjtcclxuXHJcbiAgICBsZXQgbXAzU2VlayA9IDA7XHJcbiAgICBsZXQgbXAzU2FtcGxlcyA9IDA7XHJcbiAgICBsZXQgbXAzSWQgPSAwO1xyXG4gICAgbGV0IG1wM0Zvcm1hdCA9IDA7XHJcbiAgICBsZXQgbXAzU3RyZWFtID0gZmFsc2U7XHJcblxyXG4gICAgLyogUmVhZHMgVGFnQ29kZUFuZExlbmd0aCBmcm9tIFRhZydzIFJFQ09SREhFQURFUiAqL1xyXG4gICAgd2hpbGUgKCh0YWdIZWFkZXIgPSBidWZmLnJlYWRUYWdDb2RlQW5kTGVuZ3RoKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHRhZzogVGFnID0ge307XHJcbiAgICAgICAgdGFnLmhlYWRlciA9IHRhZ0hlYWRlcjtcclxuICAgICAgICB0YWcuZG9JbmNsdWRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGFnSGVhZGVyLmNvZGUpIHtcclxuICAgICAgICAgICAgLy8gU291bmQgVGFncyAtIE1QMyBFeHRyYWN0aW9uXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5TVFJFQU1CTE9DSzpcclxuICAgICAgICAgICAgICAgIGlmICghbXAzU3RyZWFtIHx8ICgodGFnSGVhZGVyLmxlbmd0aCAtIDQpID09IDApKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIG1wM1NhbXBsZXMgKz0gYnVmZi5yZWFkVUludExFKDE2KTsgLy8gZnJhbWUgc2FtcGxlc1xyXG4gICAgICAgICAgICAgICAgYnVmZi5yZWFkVUludExFKDE2KTsgLy8gc2VlayBzYW1wbGVzXHJcblxyXG4gICAgICAgICAgICAgICAgdGFnLmRhdGEgPSBidWZmLmJ1ZmZlcl9yYXcuc2xpY2UoYnVmZi5wb2ludGVyLCBidWZmLnBvaW50ZXIgKyAodGFnSGVhZGVyLmxlbmd0aCAtIDQpKTtcclxuICAgICAgICAgICAgICAgIHRhZy5hdWRpb19ieXRlcyA9ICh0YWdIZWFkZXIubGVuZ3RoIC0gNCk7XHJcbiAgICAgICAgICAgICAgICB0YWcuZG9JbmNsdWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBTV0ZUYWdzLlNUUkVBTUhFQUQ6XHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5TVFJFQU1IRUFEMjpcclxuICAgICAgICAgICAgICAgIGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgIG1wM0Zvcm1hdCA9IGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgIGJ1ZmYucmVhZFVJbnRMRSgxNik7IC8vIGF2ZXJhZ2UgZnJhbWUgc2FtcGxlc1xyXG4gICAgICAgICAgICAgICAgbXAzU2VlayA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICBpZiAoKChtcDNGb3JtYXQgPj4+IDQpICYgMHhmKSA9PSBTV0ZPdGhlclRhZ3MuQ09ERUNfTVAzKVxyXG4gICAgICAgICAgICAgICAgICAgIG1wM1N0cmVhbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5ERUZJTkVTT1VORDpcclxuICAgICAgICAgICAgICAgIGlmICghbXAzU3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybWF0ID0gYnVmZi5yZWFkVUludExFKDgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoKGZvcm1hdCA+Pj4gNCkgJiAweGYpID09IFNXRk90aGVyVGFncy5DT0RFQ19NUDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzSWQgPSBpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzRm9ybWF0ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcDNTYW1wbGVzID0gYnVmZi5yZWFkVUludExFKDMyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzU2VlayA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5kYXRhID0gYnVmZi5idWZmZXJfcmF3LnNsaWNlKGJ1ZmYucG9pbnRlciwgYnVmZi5wb2ludGVyICsgKHRhZ0hlYWRlci5sZW5ndGggLSA5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5hdWRpb19ieXRlcyA9ICh0YWdIZWFkZXIubGVuZ3RoIC0gOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5kb0luY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gRG9BY3Rpb24gLSBXaGVyZSB0aGUgQmVhdGJveCBMaXZlc1xyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuRE9BQ1RJT04gOlxyXG4gICAgICAgICAgICAgICAgbGV0IF9maW5pc2hlZFJlYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uU3RhY2s6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uVmFyaWFibGVzOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25SZWdpc3RlcnM6IFthbnksIGFueSwgYW55LCBhbnldID0gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnN0YW50UG9vbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlICghX2ZpbmlzaGVkUmVhZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb24gPSBidWZmLnJlYWRBY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVhZCBBY3Rpb24gVGFnXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZmluaXNoZWRSZWFkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLkNPTlNUQU5UUE9PTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50UG9vbCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnN0YW50Q291bnQgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25zdGFudENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudFBvb2wucHVzaChidWZmLnJlYWRTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5QVVNIOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGJ1ZmYucG9pbnRlciA8IGFjdGlvbi5wb3NpdGlvbiArIGFjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHVzaFZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwdXNoVHlwZSA9IGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHB1c2hUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuU1RSSU5HX0xJVEVSQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5GTE9BVF9MSVRFUkFMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYnVmZi5yZWFkRmxvYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5OVUxMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5VTkRFRklORUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuUkVHSVNURVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBhY3Rpb25SZWdpc3RlcnNbYnVmZi5yZWFkVUludExFKDgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5CT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gQm9vbGVhbihidWZmLnJlYWRVSW50TEUoOCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkRPVUJMRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGJ1ZmYucmVhZERvdWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLklOVEVHRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWRVSW50TEUoMzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkNPTlNUQU5UODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGNvbnN0YW50UG9vbFtidWZmLnJlYWRVSW50TEUoOCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkNPTlNUQU5UMTY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBjb25zdGFudFBvb2xbYnVmZi5yZWFkVUludExFKDE2KV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZPVU5EIFVOU1VQUE9SVEVEIFBVU0hEQVRBIFRZUEU6IFwiICsgcHVzaFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2gocHVzaFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLlBPUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuRFVQTElDQVRFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhY3Rpb25TdGFja1thY3Rpb25TdGFjay5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TVE9SRV9SRUdJU1RFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblJlZ2lzdGVyc1tidWZmLnJlYWRVSW50TEUoOCldID0gYWN0aW9uU3RhY2tbYWN0aW9uU3RhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5HRVRfVkFSSUFCTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3ZOYW1lID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShndk5hbWUgaW4gYWN0aW9uVmFyaWFibGVzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25WYXJpYWJsZXNbZ3ZOYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhY3Rpb25WYXJpYWJsZXNbZ3ZOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TRVRfVkFSSUFCTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ZWYWx1ZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uVmFyaWFibGVzW2FjdGlvblN0YWNrLnBvcCgpXSA9IHN2VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5JTklUX0FSUkFZOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5U2l6ZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5U2l6ZTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goYWN0aW9uU3RhY2sucG9wKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5HRVRfTUVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdtTmFtZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdtT2JqZWN0ID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShnbU5hbWUgaW4gZ21PYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtT2JqZWN0W2dtTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goZ21PYmplY3RbZ21OYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TRVRfTUVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNtVmFsdWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbU5hbWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnBvcCgpW3NtTmFtZV0gPSBzbVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHRhZyBpc24ndCBzdXBwb3J0ZWQsIGJ1dCBpdCBzZWVtcyB0byBiZSBpbiBldmVyeSBmaWxlLCBzbyBJJ20gaWdub3JpbmcgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9VTkQgVU5TVVBQT1JURUQgQUNUSU9OIFRBRzogXCIgKyBhY3Rpb24uYWN0aW9uLnRvU3RyaW5nKDE2KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uVmFyaWFibGVzW1wiX3Jvb3RcIl0gIT0gdW5kZWZpbmVkICYmIGFjdGlvblZhcmlhYmxlc1tcIl9yb290XCJdW1wiYmVhdEJveFwiXSlcclxuICAgICAgICAgICAgICAgICAgICB0YWcuZG9JbmNsdWRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWcucG9vbCA9IGNvbnN0YW50UG9vbDtcclxuICAgICAgICAgICAgICAgIHRhZy52YXJpYWJsZXMgPSBhY3Rpb25WYXJpYWJsZXM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL3RhZy5kYXRhID0gYnVmZi5idWZmZXJfcmF3LnNsaWNlKGJ1ZmYucG9pbnRlciwgYnVmZi5wb2ludGVyICsgdGFnSGVhZGVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YWcuZG9JbmNsdWRlKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0YWcuZG9JbmNsdWRlO1xyXG4gICAgICAgICAgICB0YWdzLnB1c2godGFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1ZmYuc2Vlayh0YWdIZWFkZXIucG9zaXRpb24gKyB0YWdIZWFkZXIubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YWdzO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDb2xsZWN0aW9uIG9mIFNXRiB0YWdzIGFuZCB0YWcgdHlwZXMgdG8gYXNzaXN0IHdpdGggcmVhZGluZyBhbmQgcGFyc2luZyBhIC5zd2YgZmlsZS5cclxuICpcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU1dGVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVORDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgU0hPV0ZSQU1FOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyBET0FDVElPTjogbnVtYmVyID0gMTI7XHJcbiAgICBwdWJsaWMgc3RhdGljIERFRklORVNPVU5EOiBudW1iZXIgPSAxNDtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RSRUFNSEVBRDogbnVtYmVyID0gMTg7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUkVBTUJMT0NLOiBudW1iZXIgPSAxOTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RSRUFNSEVBRDI6IG51bWJlciA9IDQ1O1xyXG4gICAgcHVibGljIHN0YXRpYyBGSUxFQVRUUklCVVRFUzogbnVtYmVyID0gNjk7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZBY3Rpb25UYWdzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgRU5EOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBDT05TVEFOVFBPT0w6IG51bWJlciA9IDB4ODg7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBVU0g6IG51bWJlciA9IDB4OTY7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBPUDogbnVtYmVyID0gMHgxNztcclxuICAgIHB1YmxpYyBzdGF0aWMgRFVQTElDQVRFOiBudW1iZXIgPSAweDRDO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVE9SRV9SRUdJU1RFUjogbnVtYmVyID0gMHg4NztcclxuICAgIHB1YmxpYyBzdGF0aWMgR0VUX1ZBUklBQkxFOiBudW1iZXIgPSAweDFDO1xyXG4gICAgcHVibGljIHN0YXRpYyBTRVRfVkFSSUFCTEU6IG51bWJlciA9IDB4MUQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIElOSVRfQVJSQVk6IG51bWJlciA9IDB4NDI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdFVF9NRU1CRVI6IG51bWJlciA9IDB4NEU7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNFVF9NRU1CRVI6IG51bWJlciA9IDB4NEY7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZUeXBlVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUklOR19MSVRFUkFMOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBGTE9BVF9MSVRFUkFMOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyBOVUxMOiBudW1iZXIgPSAyO1xyXG4gICAgcHVibGljIHN0YXRpYyBVTkRFRklORUQ6IG51bWJlciA9IDM7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJFR0lTVEVSOiBudW1iZXIgPSA0O1xyXG4gICAgcHVibGljIHN0YXRpYyBCT09MRUFOOiBudW1iZXIgPSA1O1xyXG4gICAgcHVibGljIHN0YXRpYyBET1VCTEU6IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIElOVEVHRVI6IG51bWJlciA9IDc7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPTlNUQU5UODogbnVtYmVyID0gODtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RBTlQxNjogbnVtYmVyID0gOTtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNXRk90aGVyVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPREVDX01QMzogbnVtYmVyID0gMjtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFydGljbGUge1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvcjtcclxuICAgIHByaXZhdGUgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGNyZWF0aW9uVGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbG9yOiBwNS5Db2xvcjtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlU2l6ZTogbnVtYmVyID0gMjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvciwgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3IsIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3IsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24gPSBpbml0aWFsUG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5pbml0aWFsVmVsb2NpdHkgPSBpbml0aWFsVmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbiA9IGNvbnN0YW50QWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIHRoaXMuY3JlYXRpb25UaW1lSW5TZWNvbmRzID0gY3JlYXRpb25UaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBlbGFwc2VkVGltZSA9IHRoaXMuZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50UG9zaXRpb246IHA1LlZlY3RvciA9IHRoaXMuZ2V0UG9zaXRpb24ocCwgZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAubm9TdHJva2UoKTtcclxuICAgICAgICBwLmZpbGwoY29sb3IpO1xyXG4gICAgICAgIHAuY2lyY2xlKGN1cnJlbnRQb3NpdGlvbi54LCBjdXJyZW50UG9zaXRpb24ueSwgUGFydGljbGUucGFydGljbGVTaXplKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb24ocDogcDUsIGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdmVsb2NpdHlDb21wb25lbnQ6IHA1LlZlY3RvciA9IHA1LlZlY3Rvci5tdWx0KHRoaXMuaW5pdGlhbFZlbG9jaXR5LCBlbGFwc2VkVGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGFjY2VsZXJhdGlvbkNvbXBvbmVudDogcDUuVmVjdG9yID0gcDUuVmVjdG9yLm11bHQodGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbixcclxuICAgICAgICAgICAgZWxhcHNlZFRpbWVJblNlY29uZHMgKiBlbGFwc2VkVGltZUluU2Vjb25kcyAvIDIpO1xyXG4gICAgICAgIHJldHVybiBwNS5WZWN0b3IuYWRkKHA1LlZlY3Rvci5hZGQodGhpcy5pbml0aWFsUG9zaXRpb24sIHZlbG9jaXR5Q29tcG9uZW50KSwgYWNjZWxlcmF0aW9uQ29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZUluU2Vjb25kcyAtIHRoaXMuY3JlYXRpb25UaW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtQYXJ0aWNsZX0gZnJvbSBcIi4vcGFydGljbGVcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlU3lzdGVtIHtcclxuICAgIHByaXZhdGUgcGFydGljbGVzOiBQYXJ0aWNsZVtdO1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIHN0YXRpYyB2ZWxvY2l0eUFuZ2xlVmFyaWF0aW9uSW5EZWdyZWVzOiBudW1iZXIgPSAzMDtcclxuICAgIHByaXZhdGUgc3RhdGljIHZlbG9jaXR5TWFnbml0dWRlVmFyaWF0aW9uSW5QZXJjZW50OiBudW1iZXIgPSAzMDtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvbG9yVmFyaWF0aW9uOiBudW1iZXIgPSAzMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMgPSBwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24gPSBjb25zdGFudEFjY2VsZXJhdGlvbjtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5vbGRlc3RQYXJ0aWNsZUFnZShjdXJyZW50VGltZUluU2Vjb25kcykgPiB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVPbGRlc3RQYXJ0aWNsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZTogUGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpXTtcclxuICAgICAgICAgICAgbGV0IGFscGhhQWRqdXN0ZWRDb2xvcjogcDUuQ29sb3IgPSB0aGlzLmdldEFscGhhQWRqdXN0ZWRDb2xvcihwYXJ0aWNsZSwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICBwYXJ0aWNsZS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBhbHBoYUFkanVzdGVkQ29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9sZGVzdFBhcnRpY2xlQWdlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJ0aWNsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJ0aWNsZXNbMF0uZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVPbGRlc3RQYXJ0aWNsZSgpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zaGlmdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QWxwaGFBZGp1c3RlZENvbG9yKHBhcnRpY2xlOiBQYXJ0aWNsZSwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBiYXNlQ29sb3IgPSBwYXJ0aWNsZS5jb2xvcjtcclxuICAgICAgICBsZXQgcGFydGljbGVBZ2UgPSBwYXJ0aWNsZS5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGxpZmVSZW1haW5pbmdQZXJjZW50ID0gKHRoaXMucGFydGljbGVMaWZldGltZUluU2Vjb25kcyAtIHBhcnRpY2xlQWdlKSAvIHRoaXMucGFydGljbGVMaWZldGltZUluU2Vjb25kcztcclxuICAgICAgICBsZXQgYWxwaGEgPSB0aGlzLmludGVycG9sYXRlKDAsIDI1NSwgbGlmZVJlbWFpbmluZ1BlcmNlbnQpO1xyXG4gICAgICAgIGxldCBuZXdDb2xvcjogcDUuQ29sb3IgPSBwLmNvbG9yKGJhc2VDb2xvcik7XHJcbiAgICAgICAgbmV3Q29sb3Iuc2V0QWxwaGEoYWxwaGEpO1xyXG4gICAgICAgIHJldHVybiBuZXdDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVycG9sYXRlKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFJhbmRvbWl6ZWRQYXJ0aWNsZXMoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVBhcnRpY2xlczogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVBhcnRpY2xlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdJbml0YWxWZWxvY2l0eSA9IHRoaXMucmFuZG9taXplVmVjdG9yKHAsIGluaXRpYWxWZWxvY2l0eSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdDb2xvciA9IHRoaXMucmFuZG9taXplQ29sb3IocCwgY29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFBhcnRpY2xlKGluaXRpYWxQb3NpdGlvbiwgbmV3SW5pdGFsVmVsb2NpdHksIGNyZWF0aW9uVGltZUluU2Vjb25kcywgbmV3Q29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZVZlY3RvcihwOiBwNSwgYmFzZVZlY3RvcjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvblJhbmRvbWl6ZWQ6IHA1LlZlY3RvciA9IHRoaXMucmFuZG9taXplVmVjdG9yRGlyZWN0aW9uKHAsIGJhc2VWZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbWl6ZVZlY3Rvck1hZ25pdHVkZShwLCBkaXJlY3Rpb25SYW5kb21pemVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZVZlY3RvckRpcmVjdGlvbihwOiBwNSwgYmFzZVZlY3RvcjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICBsZXQgYW5nbGVJbkRlZ3JlZXMgPSBiYXNlVmVjdG9yLmhlYWRpbmcoKTtcclxuICAgICAgICBsZXQgYW5nbGVDaGFuZ2VJbkRlZ3JlZXMgPSBwLnJhbmRvbSgtUGFydGljbGVTeXN0ZW0udmVsb2NpdHlBbmdsZVZhcmlhdGlvbkluRGVncmVlcyAvIDIsXHJcbiAgICAgICAgICAgIFBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5QW5nbGVWYXJpYXRpb25JbkRlZ3JlZXMgLyAyKTtcclxuICAgICAgICBsZXQgZmluYWxBbmdsZUluUmFkaWFucyA9IHAucmFkaWFucyhhbmdsZUluRGVncmVlcyArIGFuZ2xlQ2hhbmdlSW5EZWdyZWVzKTtcclxuICAgICAgICBsZXQgbWFnbml0dWRlID0gYmFzZVZlY3Rvci5tYWcoKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgICAgIHJldHVybiBwNS5WZWN0b3IuZnJvbUFuZ2xlKGZpbmFsQW5nbGVJblJhZGlhbnMsIG1hZ25pdHVkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3JNYWduaXR1ZGUocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIGxldCBtYWduaXR1ZGVDaGFuZ2VJblBlcmNlbnQgPSBwLnJhbmRvbSgtUGFydGljbGVTeXN0ZW0udmVsb2NpdHlNYWduaXR1ZGVWYXJpYXRpb25JblBlcmNlbnQgLyAyLFxyXG4gICAgICAgICAgICBQYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eU1hZ25pdHVkZVZhcmlhdGlvbkluUGVyY2VudCAvIDIpO1xyXG4gICAgICAgIGxldCBmaW5hbE1hZ25pdHVkZSA9IGJhc2VWZWN0b3IubWFnKCkgKiAoMTAwICsgbWFnbml0dWRlQ2hhbmdlSW5QZXJjZW50KSAvIDEwMDtcclxuICAgICAgICByZXR1cm4gYmFzZVZlY3Rvci5zZXRNYWcoZmluYWxNYWduaXR1ZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9taXplQ29sb3IocDogcDUsIGJhc2VDb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgbmV3UmVkID0gdGhpcy5ib3VuZGVkUmFuZG9taXplKHAsIHAucmVkKGJhc2VDb2xvciksIFBhcnRpY2xlU3lzdGVtLmNvbG9yVmFyaWF0aW9uLCAwLCAyNTUpO1xyXG4gICAgICAgIGxldCBuZXdHcmVlbiA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLmdyZWVuKGJhc2VDb2xvciksIFBhcnRpY2xlU3lzdGVtLmNvbG9yVmFyaWF0aW9uLCAwLCAyNTUpO1xyXG4gICAgICAgIGxldCBuZXdCbHVlID0gdGhpcy5ib3VuZGVkUmFuZG9taXplKHAsIHAuYmx1ZShiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICByZXR1cm4gcC5jb2xvcihuZXdSZWQsIG5ld0dyZWVuLCBuZXdCbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJvdW5kZWRSYW5kb21pemUocDogcDUsIHZhbHVlOiBudW1iZXIsIHZhcmlhdGlvbjogbnVtYmVyLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlICsgcC5yYW5kb20oLXZhcmlhdGlvbiAvIDIsIHZhcmlhdGlvbiAvIDIpO1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA8PSBsb3dlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb3dlckJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJCb3VuZCA8IG5ld1ZhbHVlICYmIG5ld1ZhbHVlIDwgdXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQYXJ0aWNsZShpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvciwgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3IsIGNyZWF0aW9uVGltZUluU2Vjb25kczogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBQYXJ0aWNsZShpbml0aWFsUG9zaXRpb24sIGluaXRpYWxWZWxvY2l0eSwgdGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbiwgY3JlYXRpb25UaW1lSW5TZWNvbmRzLCBjb2xvcikpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFBsYXllcktleUFjdGlvbiB7XHJcbiAgICBnYW1lVGltZTogbnVtYmVyO1xyXG4gICAgdHJhY2s6IG51bWJlcjtcclxuICAgIGtleVN0YXRlOiBLZXlTdGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lVGltZTogbnVtYmVyLCB0cmFjazogbnVtYmVyLCBrZXlTdGF0ZTogS2V5U3RhdGUpIHtcclxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gZ2FtZVRpbWU7XHJcbiAgICAgICAgdGhpcy50cmFjayA9IHRyYWNrO1xyXG4gICAgICAgIHRoaXMua2V5U3RhdGUgPSBrZXlTdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gS2V5U3RhdGUge1xyXG4gICAgVVAsIERPV04sXHJcbn0iLCJpbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7RGlzcGxheUNvbmZpZywgRGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtUaW1lTWFuYWdlcn0gZnJvbSBcIi4vdGltZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7TWlzc01hbmFnZXJ9IGZyb20gXCIuL21pc3NfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbE1hbmFnZXJ9IGZyb20gXCIuL3Njcm9sbF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UmVzdWx0c0Rpc3BsYXl9IGZyb20gXCIuL3Jlc3VsdHNfZGlzcGxheVwiO1xyXG5pbXBvcnQge05vdGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyxcclxuICAgIGlzS2V5QmluZGluZ3NEZWZpbmVkLFxyXG4gICAgcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzLFxyXG4gICAgc2V0QWxsTm90ZXNUb0RlZmF1bHRTdGF0ZVxyXG59IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5U3RhdGUsIFBsYXllcktleUFjdGlvbn0gZnJvbSBcIi4vcGxheWVyX2tleV9hY3Rpb25cIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nLCBBY2N1cmFjeVJlY29yZGluZ1N0YXRlfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrVGV4dH0gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfdGV4dFwiO1xyXG5pbXBvcnQge1JlY2VwdG9yU2hyaW5rUmVhY3Rpb259IGZyb20gXCIuL3JlY2VwdG9yX3Nocmlua19yZWFjdGlvblwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RmVlZGJhY2tGbGFzaH0gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfZmxhc2hcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzfSBmcm9tIFwiLi9hY2N1cmFjeV9mZWVkYmFja19wYXJ0aWNsZXNcIjtcclxuaW1wb3J0IHtIb2xkUGFydGljbGVzfSBmcm9tIFwiLi9ob2xkX3BhcnRpY2xlc1wiO1xyXG5pbXBvcnQge0hvbGRHbG93fSBmcm9tIFwiLi9ob2xkX2dsb3dcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5aW5nRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIHNjZW5lOiBQNVNjZW5lO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHRpbWVNYW5hZ2VyOiBHYW1lVGltZVByb3ZpZGVyO1xyXG4gICAgcHJpdmF0ZSBtaXNzTWFuYWdlcjogTWlzc01hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBnYW1lRW5kVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzaG93UmVzdWx0c1NjcmVlbjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBpc0RlYnVnTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeUZlZWRiYWNrVGV4dDogQWNjdXJhY3lGZWVkYmFja1RleHQ7XHJcbiAgICBwcml2YXRlIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuICAgIHByaXZhdGUgcmVjZXB0b3JTaHJpbmtSZWFjdGlvbjogUmVjZXB0b3JTaHJpbmtSZWFjdGlvbjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lGZWVkYmFja0ZsYXNoOiBBY2N1cmFjeUZlZWRiYWNrRmxhc2g7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXM6IEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXM7XHJcbiAgICBwcml2YXRlIGhvbGRQYXJ0aWNsZXM6IEhvbGRQYXJ0aWNsZXM7XHJcbiAgICBwcml2YXRlIGhvbGRHbG93OiBIb2xkR2xvdztcclxuICAgIHByaXZhdGUgYXVkaW9GaWxlOiBBdWRpb0ZpbGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUsIGNvbmZpZzogQ29uZmlnLCBzY2VuZTogUDVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdHNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1ZGlvRmlsZSA9IGF1ZGlvRmlsZTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRpbWUgbWFuYWdlciBhbmQgcGxheSB0aGUgYXVkaW8gYXMgY2xvc2UgdG9nZXRoZXIgYXMgcG9zc2libGUgdG8gc3luY2hyb25pemUgdGhlIGF1ZGlvIHdpdGggdGhlIGdhbWVcclxuICAgICAgICBpZiAoIXRoaXMuaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBUaW1lTWFuYWdlcihwZXJmb3JtYW5jZS5ub3coKSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvRmlsZS5wbGF5KGNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5ldyBOb3RlTWFuYWdlcih0cmFja3MpO1xyXG4gICAgICAgIGxldCBudW1UcmFja3M6IG51bWJlciA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gbmV3IEFjY3VyYWN5UmVjb3JkaW5nKG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IDI0MDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gNDgwO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WCA9ICh0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLndpZHRoIC0gd2lkdGgpIC8gMjtcclxuICAgICAgICBsZXQgdG9wTGVmdFkgPSAodGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZS5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSBuZXcgUGxheWluZ0NvbmZpZyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuZGlzcGxheUNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSxcclxuICAgICAgICAgICAgdG9wTGVmdFgsIHRvcExlZnRZLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzID0gbmV3IEhvbGRQYXJ0aWNsZXModGhpcy5jb25maWcsIG51bVRyYWNrcywgdGhpcy5kaXNwbGF5TWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5ob2xkR2xvdyA9IG5ldyBIb2xkR2xvdyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzLCB0aGlzLmRpc3BsYXlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gbmV3IEhvbGRNYW5hZ2VyKG51bVRyYWNrcywgdGhpcy5vblRyYWNrSG9sZC5iaW5kKHRoaXMpLCB0aGlzLm9uVHJhY2tVbmhvbGQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZU1hbmFnZXIgPSBuZXcgU2Nyb2xsTWFuYWdlcih0aGlzLmNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdhbWVFbmRUaW1lID0gdGhpcy5jYWxjdWxhdGVHYW1lRW5kKHRoaXMuYXVkaW9GaWxlLmdldER1cmF0aW9uKCksIHRoaXMuZ2V0Tm90ZXNFbmRUaW1lKCkpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyID0gbmV3IEFjY3VyYWN5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmNvbmZpZywgdGhpcy5ob2xkTWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIgPSBuZXcgTWlzc01hbmFnZXIodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuaG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrVGV4dCA9IG5ldyBBY2N1cmFjeUZlZWRiYWNrVGV4dCh0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0b3BMZWZ0WCArIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgdG9wTGVmdFkgKyBoZWlnaHQgLyAyLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2ggPSBuZXcgQWNjdXJhY3lGZWVkYmFja0ZsYXNoKHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlNYW5hZ2VyLFxyXG4gICAgICAgICAgICBudW1UcmFja3MpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbiA9IG5ldyBSZWNlcHRvclNocmlua1JlYWN0aW9uKHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlDb25maWcsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzID0gbmV3IEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXModGhpcy5jb25maWcsIHRoaXMuZGlzcGxheU1hbmFnZXIsIG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGlmICghaXNLZXlCaW5kaW5nc0RlZmluZWQobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplS2V5QmluZGluZ3MobnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iaW5kS2V5QmluZGluZ3NUb0FjdGlvbnMoKTtcclxuICAgICAgICBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzKTtcclxuICAgICAgICByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXModGhpcy5ub3RlTWFuYWdlci50cmFja3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUcmFjayAjXCIgKyAoYWNjdXJhY3lFdmVudC50cmFja051bWJlciArIDEpICsgXCIgXCIgKyBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TmFtZSArXHJcbiAgICAgICAgLy8gICAgIChNYXRoLmFicyhhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzKSA9PSBJbmZpbml0eSA/XHJcbiAgICAgICAgLy8gICAgICAgICBcIlwiIDpcclxuICAgICAgICAvLyAgICAgICAgIFwiIChcIiArIE1hdGgucm91bmQoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcykgKyBcIiBtcylcIikpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuYWRkUGFydGljbGVzRm9yQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVJblNlY29uZHMgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJblNlY29uZHMgPj0gdGhpcy5nYW1lRW5kVGltZSAmJiAhdGhpcy5zaG93UmVzdWx0c1NjcmVlbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnN0YXRlID0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZS5SRUFEWTtcclxuICAgICAgICAgICAgdGhpcy5lbmRTb25nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIudXBkYXRlKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5kcmF3KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tUZXh0LmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2guZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3Rlc0VuZFRpbWUoKSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0QWNjdXJhY3k6IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlYXJsaWVzdEFjY3VyYWN5ID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWFybGllc3RBY2N1cmFjeSA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlTWFuYWdlci5nZXRMYXRlc3ROb3RlKCkudGltZUluU2Vjb25kcyArIGVhcmxpZXN0QWNjdXJhY3kgLyAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlR2FtZUVuZChhdWRpb0R1cmF0aW9uOiBudW1iZXIsIG5vdGVzRW5kVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGF1ZGlvRHVyYXRpb24gPCBub3Rlc0VuZFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vdGVzRW5kVGltZSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihub3Rlc0VuZFRpbWUgKyA1LCBhdWRpb0R1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuZFNvbmcoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb0ZpbGUuc3RvcCgpO1xyXG4gICAgICAgIGdsb2JhbC5yZXN1bHRzRGlzcGxheSA9IG5ldyBSZXN1bHRzRGlzcGxheSh0aGlzLmNvbmZpZywgdGhpcy5ub3RlTWFuYWdlciwgdGhpcy5hY2N1cmFjeU1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlJFU1VMVFMpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kS2V5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmluZEtleUJpbmRpbmdzVG9BY3Rpb25zKCkge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5ncyA9IGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgbGV0IGlzU3BhY2ViYXJCb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBzcGFjZWJhcktleUNvZGU6IG51bWJlciA9IDMyO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5QmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleUJpbmRpbmc6IEtleUJpbmRpbmcgPSBrZXlCaW5kaW5nc1tpXTtcclxuICAgICAgICAgICAgaWYgKGtleUJpbmRpbmcua2V5Q29kZSA9PT0gc3BhY2ViYXJLZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpc1NwYWNlYmFyQm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oa2V5QmluZGluZy5rZXlDb2RlLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5RG93bkFjdGlvbkZvclRyYWNrKGtleUJpbmRpbmcudHJhY2tOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5VXBBY3Rpb25Gb3JUcmFjayhrZXlCaW5kaW5nLnRyYWNrTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oZ2xvYmFsLmNvbmZpZy5xdWl0S2V5LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kU29uZygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWlzU3BhY2ViYXJCb3VuZCkge1xyXG4gICAgICAgICAgICAvLyBiaW5kIGtleSB0byBub3RoaW5nIHRvIG1ha2Ugc3VyZSB0aGUgZGVmYXVsdCBiZWhhdmlvciBpcyBwcmV2ZW50ZWRcclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbihzcGFjZWJhcktleUNvZGUsICgpID0+IHt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBrZXlEb3duQWN0aW9uRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5ob2xkVHJhY2sodHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJLZXlBY3Rpb246IFBsYXllcktleUFjdGlvbiA9XHJcbiAgICAgICAgICAgIG5ldyBQbGF5ZXJLZXlBY3Rpb24odGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZShwZXJmb3JtYW5jZS5ub3coKSksIHRyYWNrTnVtYmVyLCBLZXlTdGF0ZS5ET1dOKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlci5oYW5kbGVQbGF5ZXJBY3Rpb24ocGxheWVyS2V5QWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGtleVVwQWN0aW9uRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5yZWxlYXNlVHJhY2sodHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJLZXlBY3Rpb246IFBsYXllcktleUFjdGlvbiA9XHJcbiAgICAgICAgICAgIG5ldyBQbGF5ZXJLZXlBY3Rpb24odGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZShwZXJmb3JtYW5jZS5ub3coKSksIHRyYWNrTnVtYmVyLCBLZXlTdGF0ZS5VUCk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIuaGFuZGxlUGxheWVyQWN0aW9uKHBsYXllcktleUFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNrSG9sZCh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZEdsb3cuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkR2xvdywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzLmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZFBhcnRpY2xlcywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNrVW5ob2xkKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy51bmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZEdsb3csIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy51bmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZFBhcnRpY2xlcywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmJpbmRLZXlzKCkge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5ncyA9IGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlCaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZzogS2V5QmluZGluZyA9IGtleUJpbmRpbmdzW2ldO1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KGtleUJpbmRpbmcua2V5Q29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQbGF5aW5nQ29uZmlnIGltcGxlbWVudHMgRGlzcGxheUNvbmZpZyB7XHJcbiAgICBwdWJsaWMgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWNlcHRvcllQZXJjZW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBwdWJsaWMgcmVjZXB0b3JTaXplczogbnVtYmVyW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvcllQZXJjZW50ID0gY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaXplcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzLnB1c2goY29uZmlnLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90ZVNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaXhlbHNQZXJTZWNvbmQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVjZXB0b3JTaXplcygpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZXB0b3JTaXplcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWNlcHRvcllQZXJjZW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZXB0b3JZUGVyY2VudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY3JvbGxEaXJlY3Rpb24oKTogU2Nyb2xsRGlyZWN0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxEaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UmVjZXB0b3JTaXplKHRyYWNrTnVtYmVyOiBudW1iZXIsIHJlY2VwdG9yU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzW3RyYWNrTnVtYmVyXSA9IHJlY2VwdG9yU2l6ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4uL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXJzaW5nSGVscGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgYmVhdG1hcFRvVHJhY2tBcnJheShiZWF0bWFwOiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ11bXSkge1xyXG4gICAgICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gW1tdLCBbXSwgW10sIFtdXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJlYXRtYXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJlYXRtYXBSb3cgPSBiZWF0bWFwW2ldO1xyXG4gICAgICAgICAgICBsZXQgdHJhY2tOdW1iZXIgPSB0aGlzLnRyYWNrTnVtYmVyRnJvbURpcmVjdGlvbihiZWF0bWFwUm93WzFdKTtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSB0aGlzLm5vdGVGcm9tQmVhdG1hcFJvdyhiZWF0bWFwUm93KTtcclxuICAgICAgICAgICAgdHJhY2tzW3RyYWNrTnVtYmVyXS5wdXNoKG5vdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBub3RlRnJvbUJlYXRtYXBSb3cocm93OiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ10pOiBOb3RlIHtcclxuICAgICAgICBsZXQgdGltZUluU2Vjb25kcyA9IHJvd1swXSAvIDMwO1xyXG4gICAgICAgIHJldHVybiB7dGltZUluU2Vjb25kczogdGltZUluU2Vjb25kcywgdHlwZTogTm90ZVR5cGUuTk9STUFMLCBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFQsIHR5cGVTdHJpbmc6IFwiTi9BXCJ9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHRyYWNrTnVtYmVyRnJvbURpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcIkxcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVua25vd24gdHJhY2sgZGlyZWN0aW9uICdcIiArIGRpcmVjdGlvbiArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge1Nvbmd9IGZyb20gXCIuL3NvbmdcIjtcclxuaW1wb3J0IHtQbGF5bGlzdENsaWVudFN0YXRlfSBmcm9tIFwiLi9wbGF5bGlzdF9jbGllbnRfc3RhdGVcIjtcclxuaW1wb3J0IHtnZXRDb250ZW50c0J5VGFnTmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge3BhcnNlU3dmRnJvbUFycmF5QnVmZmVyLCBTd2ZQYXJzZVJlc3BvbnNlfSBmcm9tIFwiLi4vcGFyc2luZy9wYXJzZV9zd2ZcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5bGlzdENsaWVudCB7XHJcbiAgICBwcml2YXRlIHN0YXRlOiBQbGF5bGlzdENsaWVudFN0YXRlO1xyXG4gICAgcHJpdmF0ZSBjb3JzV29ya2Fyb3VuZDogc3RyaW5nID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tLyc7XHJcbiAgICBwcml2YXRlIHNvbmdVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgcGxheWxpc3RVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgcGxheWxpc3Q6IFNvbmdbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5OT19BUElTO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTdGF0ZSgpOiBQbGF5bGlzdENsaWVudFN0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGxheWxpc3QoKTogU29uZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5bGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShpbmRleFVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkQXBpcyhpbmRleFVybCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFBsYXlsaXN0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGxvYWRBcGlzKGluZGV4VXJsOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QUk9DRVNTSU5HO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldChpbmRleFVybClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4gdGhpcy5zYXZlQXBpc0Zyb21QbGF5bGlzdEluZGV4KHJlcXVlc3QpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGUpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVBcGlzRnJvbVBsYXlsaXN0SW5kZXgocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgcmVzcG9uc2VYbWw6IERvY3VtZW50ID0gcmVxdWVzdC5yZXNwb25zZVhNTDtcclxuICAgICAgICB0aGlzLnNvbmdVcmwgPSBnZXRDb250ZW50c0J5VGFnTmFtZShyZXNwb25zZVhtbCwgXCJzb25nVVJMXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWxpc3RVcmwgPSBnZXRDb250ZW50c0J5VGFnTmFtZShyZXNwb25zZVhtbCwgXCJwbGF5bGlzdFVSTFwiKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5BUElTX0xPQURFRDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGxvYWRQbGF5bGlzdCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QUk9DRVNTSU5HO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldCh0aGlzLnBsYXlsaXN0VXJsKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB0aGlzLnNhdmVQbGF5bGlzdChyZXF1ZXN0KSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlKTtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlUGxheWxpc3QocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgcGxheWxpc3RUZXh0OiBzdHJpbmcgPSByZXF1ZXN0LnJlc3BvbnNlO1xyXG5cclxuICAgICAgICAvLyByZXBsYWNlIGFtcGVyc2FuZHMgYmVjYXVzZSB0aGUgRE9NUGFyc2VyIGRvZXNuJ3QgbGlrZSB0aGVtXHJcbiAgICAgICAgcGxheWxpc3RUZXh0ID0gcGxheWxpc3RUZXh0LnJlcGxhY2UoLyYvZywgJyZhbXA7Jyk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5bGlzdFhtbDogRG9jdW1lbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHBsYXlsaXN0VGV4dCwgXCJ0ZXh0L3htbFwiKTtcclxuICAgICAgICBsZXQgc29uZ3M6IFNvbmdbXSA9IHRoaXMuZ2V0U29uZ3NGcm9tUGxheWxpc3RYbWwocGxheWxpc3RYbWwpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVNvbmdzSWZWYWxpZChzb25ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTb25nc0Zyb21QbGF5bGlzdFhtbChwbGF5bGlzdFhtbDogRG9jdW1lbnQpOiBTb25nW10ge1xyXG4gICAgICAgIGxldCBzb25nc1htbDogSFRNTENvbGxlY3Rpb24gPSBwbGF5bGlzdFhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNvbmdcIik7XHJcbiAgICAgICAgbGV0IHNvbmdzOiBTb25nW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvbmdzWG1sLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzb25nWG1sOiBFbGVtZW50ID0gc29uZ3NYbWwuaXRlbShpKTtcclxuICAgICAgICAgICAgbGV0IHNvbmc6IFNvbmcgPSBTb25nLm9mWG1sKHNvbmdYbWwpO1xyXG4gICAgICAgICAgICBzb25ncy5wdXNoKHNvbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc29uZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlU29uZ3NJZlZhbGlkKHNvbmdzOiBTb25nW10pIHtcclxuICAgICAgICBpZiAoc29uZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IFwiTG9hZGVkIGEgcGxheWxpc3Qgd2l0aCBubyBzb25ncy5cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QTEFZTElTVF9MT0FERUQ7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWxpc3QgPSBzb25ncztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFN3Zihzb25nSW5kZXg6IG51bWJlcik6IFByb21pc2U8U3dmUGFyc2VSZXNwb25zZT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLlBST0NFU1NJTkc7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldCh0aGlzLmdldExldmVsVXJsKHNvbmdJbmRleCksIFwiYXJyYXlidWZmZXJcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4gdGhpcy5nZXRQYXJzZWRTd2YocmVxdWVzdCkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGV2ZWxVcmwoc29uZ0luZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzb25nOiBTb25nID0gdGhpcy5wbGF5bGlzdFtzb25nSW5kZXhdO1xyXG4gICAgICAgIGxldCBsZXZlbDogc3RyaW5nID0gc29uZy5sZXZlbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb25nVXJsICsgXCJsZXZlbF9cIiArIGxldmVsICsgXCIuc3dmXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQYXJzZWRTd2YocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgcGFyc2VkU3dmID0gcGFyc2VTd2ZGcm9tQXJyYXlCdWZmZXIoPEFycmF5QnVmZmVyPiByZXF1ZXN0LnJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QTEFZTElTVF9MT0FERUQ7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlZFN3ZjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldCh1cmw6IHN0cmluZywgcmVzcG9uc2VUeXBlPzogWE1MSHR0cFJlcXVlc3RSZXNwb25zZVR5cGUpOiBQcm9taXNlPFhNTEh0dHBSZXF1ZXN0PiB7XHJcbiAgICAgICAgbGV0IGdldFVybCA9IHRoaXMuY29yc1dvcmthcm91bmQgKyB1cmw7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3Q6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgZ2V0VXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB0aGUgcmVxdWVzdCBsb2FkcywgY2hlY2sgd2hldGhlciBpdCB3YXMgc3VjY2Vzc2Z1bFxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBzdWNjZXNzZnVsLCByZXNvbHZlIHRoZSBwcm9taXNlIGJ5IHBhc3NpbmcgYmFjayB0aGUgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGZhaWxzLCByZWplY3QgdGhlIHByb21pc2Ugd2l0aCBhIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IoXCJHZXQgcmVxdWVzdCBmYWlsZWQgd2l0aCBlcnJvciBjb2RlOlwiICsgcmVxdWVzdC5zdGF0dXNUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxzbyBkZWFsIHdpdGggdGhlIGNhc2Ugd2hlbiB0aGUgZW50aXJlIHJlcXVlc3QgZmFpbHMgdG8gYmVnaW4gd2l0aFxyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBhIG5ldHdvcmsgZXJyb3IsIHNvIHJlamVjdCB0aGUgcHJvbWlzZSB3aXRoIGFuIGFwcHJvcHJpYXRlIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcignVGhlcmUgd2FzIGEgbmV0d29yayBlcnJvci4nKSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGU6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gUGxheWxpc3RDbGllbnRTdGF0ZSB7XHJcbiAgICBOT19BUElTLFxyXG4gICAgQVBJU19MT0FERUQsXHJcbiAgICBQTEFZTElTVF9MT0FERUQsXHJcbiAgICBQUk9DRVNTSU5HLFxyXG4gICAgRVJST1JcclxufVxyXG4iLCJpbXBvcnQge2dldENvbnRlbnRzQnlUYWdOYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU29uZyB7XHJcbiAgICBwdWJsaWMgZ2VucmU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzb25nTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdBdXRob3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nQXV0aG9yVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ0RpZmZpY3VsdHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzb25nU3R5bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nTGVuZ3RoOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ1N0ZXBhdXRob3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBsZXZlbDogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgb2ZYbWwoeG1sOiBFbGVtZW50KTogU29uZyB7XHJcbiAgICAgICAgbGV0IHNvbmcgPSBuZXcgU29uZygpO1xyXG4gICAgICAgIHNvbmcuZ2VucmUgPSBwYXJzZUludCh4bWwuZ2V0QXR0cmlidXRlKFwiZ2VucmVcIikpO1xyXG4gICAgICAgIHNvbmcuc29uZ05hbWUgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ25hbWVcIik7XHJcbiAgICAgICAgc29uZy5zb25nQXV0aG9yID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdhdXRob3JcIik7XHJcbiAgICAgICAgc29uZy5zb25nQXV0aG9yVXJsID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdhdXRob3J1cmxcIik7XHJcbiAgICAgICAgc29uZy5zb25nRGlmZmljdWx0eSA9IHBhcnNlSW50KGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nZGlmZmljdWx0eVwiKSk7XHJcbiAgICAgICAgc29uZy5zb25nU3R5bGUgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ3N0eWxlXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0xlbmd0aCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nbGVuZ3RoXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ1N0ZXBhdXRob3IgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ3N0ZXBhdXRob3JcIik7XHJcbiAgICAgICAgc29uZy5sZXZlbCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJsZXZlbFwiKTtcclxuICAgICAgICByZXR1cm4gc29uZztcclxuICAgIH1cclxufVxyXG4iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbDogRWxlbWVudCB8IERvY3VtZW50LCB0YWc6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpWzBdLmlubmVySFRNTDtcclxufVxyXG4iLCJpbXBvcnQge0Rpc3BsYXlDb25maWcsIERpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UDVTY2VuZX0gZnJvbSBcIi4vcDVfc2NlbmVcIjtcclxuaW1wb3J0IHtTY3JvbGxNYW5hZ2VyfSBmcm9tIFwiLi9zY3JvbGxfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByZXZpZXdEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgc2NlbmU6IFA1U2NlbmU7XHJcbiAgICBjb25maWc6IENvbmZpZztcclxuICAgIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc2Nyb2xsTWFuYWdlcjogU2Nyb2xsTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WCA9IDY1O1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WSA9IDU1O1xyXG4gICAgcHJpdmF0ZSB3aWR0aCA9IDIwMDtcclxuICAgIHByaXZhdGUgaGVpZ2h0ID0gNDAwO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNrczogTm90ZVtdW10sIGNvbmZpZzogQ29uZmlnLCBzY2VuZTogUDVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbmV3IE5vdGVNYW5hZ2VyKHRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxNYW5hZ2VyID0gbmV3IFNjcm9sbE1hbmFnZXIodGhpcy5jb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsIHRoaXMuZ2V0Qm91bmRzKCkpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IHRoaXMuZ2V0RGlzcGxheUNvbmZpZyh0aGlzLmNvbmZpZywgdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuZGlzcGxheUNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSxcclxuICAgICAgICAgICAgdGhpcy50b3BMZWZ0WCwgdGhpcy50b3BMZWZ0WSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlci5kcmF3KHRoaXMuc2Nyb2xsTWFuYWdlci5nZXRHYW1lVGltZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJvdW5kcygpIHtcclxuICAgICAgICByZXR1cm4ge3RvcExlZnRYOiB0aGlzLnRvcExlZnRYLCB0b3BMZWZ0WTogdGhpcy50b3BMZWZ0WSwgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheUNvbmZpZyhjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpOiBEaXNwbGF5Q29uZmlnIHtcclxuICAgICAgICBsZXQgcmVjZXB0b3JTaXplczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlY2VwdG9yU2l6ZXMucHVzaChjb25maWcubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0Tm90ZVNpemU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBpeGVsc1BlclNlY29uZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFJlY2VwdG9yWVBlcmNlbnQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcucmVjZXB0b3JZUGVyY2VudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0U2Nyb2xsRGlyZWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnNjcm9sbERpcmVjdGlvbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UmVjZXB0b3JTaXplczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VwdG9yU2l6ZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJlY2VwdG9yU2l6ZTogKHRyYWNrTnVtYmVyOiBudW1iZXIsIHJlY2VwdG9yU2l6ZTogbnVtYmVyKSA9PiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Rpc3BsYXlDb25maWd9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlY2VwdG9yU2hyaW5rUmVhY3Rpb24ge1xyXG4gICAgcHJpdmF0ZSB0cmFja0hvbGRTdGF0ZXM6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IGRpc3BsYXlDb25maWc7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzLnB1c2goZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlc1t0cmFja051bWJlcl0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzW3RyYWNrTnVtYmVyXSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBudW1SZWNlcHRvcnMgPSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JTaXplcygpLmxlbmd0aDtcclxuICAgICAgICBsZXQgc2hyaW5rID0gMC43O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUmVjZXB0b3JzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpemVSYXRpbyA9IHRoaXMuaXNUcmFja0hlbGQoaSkgPyBzaHJpbmsgOiAxLjA7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZy5zZXRSZWNlcHRvclNpemUoaSwgdGhpcy5jb25maWcubm90ZVNpemUgKiBzaXplUmF0aW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFja0hvbGRTdGF0ZXNbdHJhY2tOdW1iZXJdO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7ZHJhd0FjY3VyYWN5QmFyc30gZnJvbSBcIi4vZHJhd2luZ191dGlsXCI7XHJcbmltcG9ydCB7QWNjdXJhY3ksIEFjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bHRzRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIHA6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyLCBwOiBwNSxcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlciA9IGFjY3VyYWN5TWFuYWdlcjtcclxuICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0FjY3VyYWN5UmVzdWx0cyh0aGlzLnAsIHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBY2N1cmFjeVJlc3VsdHMocDogcDUsIGFjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHAud2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gcC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIGxldCBiYXJXaWR0aCA9IHAud2lkdGggKiAwLjY7XHJcbiAgICAgICAgbGV0IGJhckhlaWdodCA9IGJhcldpZHRoIC8gMTA7XHJcbiAgICAgICAgbGV0IGxlZnRMYWJlbEhlaWdodCA9IDAuOCAqIGJhckhlaWdodDtcclxuICAgICAgICBsZXQgYWNjdXJhY3lMaXN0Rm9yUmVzdWx0cyA9IHRoaXMuZ2V0UmVzdWx0c0FjY3VyYWN5TGlzdChhY2N1cmFjeVNldHRpbmdzKTtcclxuICAgICAgICBkcmF3QWNjdXJhY3lCYXJzKHAsIGFjY3VyYWN5TGlzdEZvclJlc3VsdHMsIGFjY3VyYWN5UmVjb3JkaW5nLCBjZW50ZXJYLCBjZW50ZXJZLCBsZWZ0TGFiZWxIZWlnaHQsIGJhcldpZHRoLFxyXG4gICAgICAgICAgICBiYXJIZWlnaHQsIG5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlci5pc0NvbmZpZ3VyZWRGb3JCb29zKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybiBhIGxpc3Qgb2YgdW5pcXVlIGFjY3VyYWNpZXMgc29ydGVkIGJ5IHRoZSBvZmZzZXQsIHdpdGggdGhlIGJlc3QgYWNjdXJhY3kgYmVpbmcgZmlyc3RcclxuICAgIHByaXZhdGUgZ2V0UmVzdWx0c0FjY3VyYWN5TGlzdChhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPSBhY2N1cmFjeVNldHRpbmdzLm1hcChhY2N1cmFjeSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGFjY3VyYWN5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICBzb3J0VmFsdWU6IHRoaXMuZ2V0QWNjdXJhY3lTb3J0aW5nVmFsdWUoYWNjdXJhY3kubG93ZXJCb3VuZCwgYWNjdXJhY3kudXBwZXJCb3VuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWVyZ2VkQWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID1cclxuICAgICAgICAgICAgdGhpcy5tZXJnZUFjY3VyYWNpZXNXaXRoU2FtZU5hbWUoYWNjdXJhY3lUYWJsZSk7XHJcbiAgICAgICAgbWVyZ2VkQWNjdXJhY3lUYWJsZS5zb3J0KHRoaXMuYWNjdXJhY3lUYWJsZVNvcnRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZEFjY3VyYWN5VGFibGUubWFwKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFjY3VyYWN5U29ydGluZ1ZhbHVlKGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGxvd2VyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModXBwZXJCb3VuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cHBlckJvdW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKGxvd2VyQm91bmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoKHVwcGVyQm91bmQgKyBsb3dlckJvdW5kKSAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWVyZ2VBY2N1cmFjaWVzV2l0aFNhbWVOYW1lKGFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmc7IHNvcnRWYWx1ZTogbnVtYmVyIH1bXSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRBY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPSBbXTtcclxuICAgICAgICB3aGlsZSAoYWNjdXJhY3lUYWJsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlBY2N1cmFjeU5hbWUgPSBhY2N1cmFjeVRhYmxlWzBdLmFjY3VyYWN5TmFtZTtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRBY2N1cmFjaWVzID0gYWNjdXJhY3lUYWJsZS5maWx0ZXIocm93ID0+IHJvdy5hY2N1cmFjeU5hbWUgPT09IGtleUFjY3VyYWN5TmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBzb3J0VmFsdWVBdmVyYWdlID0gbWF0Y2hlZEFjY3VyYWNpZXNcclxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChzdW0sIHJvdykgPT4gc3VtICsgcm93LnNvcnRWYWx1ZSwgMClcclxuICAgICAgICAgICAgICAgIC8gbWF0Y2hlZEFjY3VyYWNpZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBtZXJnZWRBY2N1cmFjeVRhYmxlLnB1c2goe2FjY3VyYWN5TmFtZToga2V5QWNjdXJhY3lOYW1lLCBzb3J0VmFsdWU6IHNvcnRWYWx1ZUF2ZXJhZ2V9KTtcclxuICAgICAgICAgICAgYWNjdXJhY3lUYWJsZSA9IGFjY3VyYWN5VGFibGUuZmlsdGVyKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lICE9PSBrZXlBY2N1cmFjeU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVyZ2VkQWNjdXJhY3lUYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFjY3VyYWN5VGFibGVTb3J0RnVuY3Rpb24oYTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgcmV0dXJuIGEuc29ydFZhbHVlIC0gYi5zb3J0VmFsdWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZW51bSBTY3JvbGxEaXJlY3Rpb24ge1xyXG4gICAgVXAsXHJcbiAgICBEb3duLFxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7VGltZU1hbmFnZXJ9IGZyb20gXCIuL3RpbWVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsTWFuYWdlciBpbXBsZW1lbnRzIEdhbWVUaW1lUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgc3lzdGVtVGltZU1pbGxpczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0aW1lTWFuYWdlcjogVGltZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHNjcm9sbEJvdW5kczogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBwOiBwNSwgc2Nyb2xsQm91bmRzPzogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFRpbWVNYW5hZ2VyKDAsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLnNjcm9sbEJvdW5kcyA9IHNjcm9sbEJvdW5kcztcclxuICAgICAgICBwLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiAoZTogV2hlZWxFdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgYWxsb3dTY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbEJvdW5kcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3VzZUlzSW5Cb3VuZHMocCwgdGhpcy5zY3JvbGxCb3VuZHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1Njcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVDaGFuZ2VNaWxsaXMgPSBlLmRlbHRhWSAqIDAuMjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzIC09IHRpbWVDaGFuZ2VNaWxsaXM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyArPSB0aW1lQ2hhbmdlTWlsbGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFsbG93IGFuIGlnbm9yZWQgYXJndW1lbnQgc28gaXQgY2FuIGJlIHVzZWQgaW4gcGxhY2Ugb2YgYSBUaW1lTWFuYWdlciBmb3IgZGVidWcgbW9kZVxyXG4gICAgZ2V0R2FtZVRpbWUoaWdub3JlZEFyZ3VtZW50PzogYW55KSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHRoaXMuc3lzdGVtVGltZU1pbGxpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3VzZUlzSW5Cb3VuZHMocDogcDUsIGJvdW5kczogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSB7XHJcbiAgICAgICAgaWYgKHAubW91c2VYID49IGJvdW5kcy50b3BMZWZ0WCAmJiBwLm1vdXNlWCA8PSBib3VuZHMudG9wTGVmdFggKyBib3VuZHMud2lkdGggJiZcclxuICAgICAgICAgICAgcC5tb3VzZVkgPj0gYm91bmRzLnRvcExlZnRZICYmIHAubW91c2VZIDw9IGJvdW5kcy50b3BMZWZ0WSArIGJvdW5kcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtGdWxsUGFyc2UsIGdldEZ1bGxQYXJzZSwgZ2V0UGFydGlhbFBhcnNlLCBOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlLCBQYXJ0aWFsUGFyc2V9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtQYXJzaW5nSGVscGVyfSBmcm9tIFwiLi9wbGF5bGlzdF9jbGllbnQvcGFyc2luZ19oZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0ZXBmaWxlU3RhdGUge1xyXG4gICAgTk9fU1RFUEZJTEUsXHJcbiAgICBET05FX1JFQURJTkcsXHJcbiAgICBQQVJUSUFMTFlfUEFSU0VELFxyXG4gICAgRlVMTFlfUEFSU0VELFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGVwZmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IFN0ZXBmaWxlU3RhdGU7XHJcbiAgICBwdWJsaWMgZmlsZTogRmlsZTtcclxuICAgIHB1YmxpYyBwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZTtcclxuICAgIHB1YmxpYyBmdWxsUGFyc2U6IEZ1bGxQYXJzZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuTk9fU1RFUEZJTEU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRGaWxlKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlLmZpbGU7IC8vIHRoaXMgdW53cmFwcyB0aGUgcDUuRmlsZSB3cmFwcGVyIHRvIGdldCB0aGUgb3JpZ2luYWwgRE9NIGZpbGVcclxuICAgICAgICB0aGlzLmxvYWRUZXh0RmlsZSh0aGlzLmZpbGUsICgoZXZlbnQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpYWxQYXJzZSA9IGdldFBhcnRpYWxQYXJzZSg8c3RyaW5nPmV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0aWFsUGFyc2UubW9kZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkRmZyQmVhdG1hcChiZWF0bWFwOiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ11bXSkge1xyXG4gICAgICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gUGFyc2luZ0hlbHBlci5iZWF0bWFwVG9UcmFja0FycmF5KGJlYXRtYXApO1xyXG5cclxuICAgICAgICBsZXQgcGFydGlhbFBhcnNlID0gbmV3IFBhcnRpYWxQYXJzZSgpO1xyXG4gICAgICAgIHBhcnRpYWxQYXJzZS5tb2RlcyA9IFtuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpXTtcclxuICAgICAgICBwYXJ0aWFsUGFyc2UubWV0YURhdGEgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMucGFydGlhbFBhcnNlID0gcGFydGlhbFBhcnNlO1xyXG5cclxuICAgICAgICBsZXQgZnVsbFBhcnNlID0gbmV3IEZ1bGxQYXJzZShwYXJ0aWFsUGFyc2UpO1xyXG4gICAgICAgIGZ1bGxQYXJzZS50cmFja3MgPSB0cmFja3M7XHJcbiAgICAgICAgdGhpcy5mdWxsUGFyc2UgPSBmdWxsUGFyc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluaXNoUGFyc2luZyhtb2RlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQgfHwgdGhpcy5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5mdWxsUGFyc2UgPSBnZXRGdWxsUGFyc2UobW9kZUluZGV4LCB0aGlzLnBhcnRpYWxQYXJzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkVGV4dEZpbGUoXHJcbiAgICAgICAgZmlsZTogRmlsZSxcclxuICAgICAgICBsaXN0ZW5lcjogKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiBhbnksXHJcbiAgICAgICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc1xyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcclxuICAgICAgICBmaWxlUmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lTWFuYWdlciBpbXBsZW1lbnRzIEdhbWVUaW1lUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ6IG51bWJlciwgY29uZmlnOiBDb25maWcpIHtcclxuICAgICAgICB0aGlzLnN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQgPSBzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWxhcHNlZFRpbWUoc3lzdGVtVGltZU1pbGxpczogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoc3lzdGVtVGltZU1pbGxpcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiRXJyb3I6IGNhbid0IGdldCBlbGFwc2VkIHRpbWUuIEV4cGVjdGVkIDEgYXJndW1lbnQ6IHN5c3RlbVRpbWUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHN5c3RlbVRpbWVNaWxsaXMgLSB0aGlzLnN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQpIC8gMTAwMDsgLy8gaW4gc2Vjb25kc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIHdhbnQgdG8ga2VlcCB0aGlzIGNhbGN1bGF0aW9uIGluIG9ubHkgb25lIHBsYWNlXHJcbiAgICBnZXRHYW1lVGltZShzeXN0ZW1UaW1lTWlsbGlzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGFwc2VkVGltZShzeXN0ZW1UaW1lTWlsbGlzKSArIHRoaXMuY29uZmlnLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgLSB0aGlzLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBlbnVtVG9TdHJpbmdBcnJheSxcclxuICAgIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSxcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3SGVhZGluZygpIHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgbGV0IGhlYWRpbmdDbGFzcyA9IFwibmF2aWdhdGlvbi1oZWFkaW5nXCI7XHJcblxyXG4gICAgbGV0IHBsYXlGcm9tRmlsZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJQbGF5IEZyb20gRmlsZVwiKTtcclxuICAgIH0sIFwicGxheUZyb21GaWxlQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQsIDAuMjUsIDAuMDM2LCAxMzAsIDM0KTtcclxuICAgIHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuUExBWV9GUk9NX0ZJTEUpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXBsYXlGcm9tRmlsZUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoaGVhZGluZ0NsYXNzKTtcclxuICAgICAgICBwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwbGF5RnJvbU9ubGluZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJQbGF5IEZyb20gT25saW5lXCIpO1xyXG4gICAgfSwgXCJwbGF5RnJvbU9ubGluZUJ1dHRvblwiKTtcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlGcm9tT25saW5lQnV0dG9uLmVsZW1lbnQsIDAuNSwgMC4wMzYsIDkwLCAzNCk7XHJcbiAgICBwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuUExBWV9GUk9NX09OTElORSk7XHJcbiAgICB9KTtcclxuICAgIGlmICghcGxheUZyb21PbmxpbmVCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBsYXlGcm9tT25saW5lQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoaGVhZGluZ0NsYXNzKTtcclxuICAgICAgICBwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGxldCBvcHRpb25zQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIk9wdGlvbnNcIik7XHJcbiAgICB9LCBcIm9wdGlvbnNCdXR0b25cIik7XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShvcHRpb25zQnV0dG9uLmVsZW1lbnQsIDAuOCwgMC4wMzYsIDkwLCAzNCk7XHJcbiAgICBvcHRpb25zQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5PUFRJT05TKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCFvcHRpb25zQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBvcHRpb25zQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoaGVhZGluZ0NsYXNzKTtcclxuICAgICAgICBvcHRpb25zQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gRXhwZWN0cyByZWxhdGl2ZVggYW5kIHJlbGF0aXZlIFkgdG8gYmUgYmV0d2VlbiAwIGFuZCAxXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShlbGVtZW50OiBwNS5FbGVtZW50LCByZWxhdGl2ZVg6IG51bWJlciwgcmVsYXRpdmVZOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgbGV0IHAgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBjYW52YXNQb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0gcC5fcmVuZGVyZXIucG9zaXRpb24oKTtcclxuICAgIGVsZW1lbnQucG9zaXRpb24oY2FudmFzUG9zaXRpb24ueCArIChyZWxhdGl2ZVggKiBwLndpZHRoKSAtICh3aWR0aCAvIDIpLFxyXG4gICAgICAgIGNhbnZhc1Bvc2l0aW9uLnkgKyAocmVsYXRpdmVZICogcC5oZWlnaHQpIC0gKGhlaWdodCAvIDIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRJbnB1dChsYWJlbFN0cmluZzogc3RyaW5nLCBpbnB1dElkOiBzdHJpbmcsIGlucHV0SW5pdGlhbFZhbHVlOiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkSW5wdXRDbGFzcyA9IFwibGFiZWxlZC1pbnB1dFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGlucHV0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0ID0gcC5jcmVhdGVJbnB1dChpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGlucHV0LmlkKGlucHV0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgaW5wdXRJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJJTlBVVFwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IGlucHV0LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbChwOiBwNSwgbGFiZWxTdHJpbmc6IHN0cmluZywgZm9ySWQ/OiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBsYWJlbCA9IHAuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIGxhYmVsU3RyaW5nKTtcclxuICAgIGlmIChmb3JJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGFiZWwuYXR0cmlidXRlKFwiZm9yXCIsIGZvcklkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2hlY2tib3gocDogcDUsIGluaXRpYWxTdGF0ZTogYm9vbGVhbik6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGNoZWNrYm94ID0gcC5jcmVhdGVFbGVtZW50KFwiY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5lbHQuY2hlY2tlZCA9IGluaXRpYWxTdGF0ZTtcclxuICAgIHJldHVybiBjaGVja2JveDtcclxufVxyXG5cclxuLy8gVE9ETzogY2hlY2sgdGhhdCBvcHRpb25zRW51bSBpcyBhY3R1YWxseSBhbiBFbnVtLCBhbmQgaW5pdGlhbEVudW1WYWx1ZSBpcyBhIHZhbHVlIGZvciB0aGF0IGVudW1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRTZWxlY3QobGFiZWxTdHJpbmc6IHN0cmluZywgc2VsZWN0SWQ6IHN0cmluZywgb3B0aW9uc0VudW06IGFueSwgaW5pdGlhbEVudW1WYWx1ZTogYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IHNlbGVjdDogcDUuRWxlbWVudDtcclxuICAgIGxldCBsYWJlbGVkU2VsZWN0Q2xhc3MgPSBcImxhYmVsZWQtc2VsZWN0XCI7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBzZWxlY3RJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgc2VsZWN0ID0gcC5jcmVhdGVTZWxlY3QoKTtcclxuICAgICAgICBzZWxlY3QuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhsYWJlbGVkU2VsZWN0Q2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBzZWxlY3QuaWQoc2VsZWN0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgc2VsZWN0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lci5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgbGV0IGluaXRpYWxPcHRpb25zID0gZW51bVRvU3RyaW5nQXJyYXkob3B0aW9uc0VudW0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBzZWxlY3Qub3B0aW9uKGluaXRpYWxPcHRpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHNlbGVjdC5zZWxlY3RlZChvcHRpb25zRW51bVtpbml0aWFsRW51bVZhbHVlIGFzIGtleW9mIHR5cGVvZiBvcHRpb25zRW51bV0udG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zOiBIVE1MQ29sbGVjdGlvbiA9IHNlbGVjdC5lbHQuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuaXRlbShpKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3MgKyBcIiBcIiArIGxhYmVsZWRTZWxlY3RDbGFzcyArIFwiIFwiICsgZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiBzZWxlY3QsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRUZXh0QXJlYShsYWJlbFN0cmluZzogc3RyaW5nLCBpbnB1dElkOiBzdHJpbmcsIGlucHV0SW5pdGlhbFZhbHVlOiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyID0gNCwgY29sczogbnVtYmVyID0gNDApOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgdGV4dEFyZWE6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkVGV4dGFyZWFDbGFzcyA9IFwibGFiZWxlZC10ZXh0YXJlYVwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGlucHV0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkVGV4dGFyZWFDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgdGV4dEFyZWEgPSBwLmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCBpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIHRleHRBcmVhLmlkKGlucHV0SWQpO1xyXG4gICAgICAgIHRleHRBcmVhLmF0dHJpYnV0ZShcInJvd3NcIiwgcm93cy50b1N0cmluZygpKTtcclxuICAgICAgICB0ZXh0QXJlYS5hdHRyaWJ1dGUoXCJjb2xzXCIsIGNvbHMudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBpbnB1dElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiB0ZXh0QXJlYSwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsZUlucHV0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIGJ1dHRvblRleHQ6IHN0cmluZywgdW5pcXVlSWQ6IHN0cmluZywgb25GaWxlTG9hZDogKGZpbGU6IHA1LkZpbGUpID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBidXR0b25JZCA9IHVuaXF1ZUlkICsgXCJCdXR0b25cIjtcclxuICAgIGxldCBjb250YWluZXJJZCA9IHVuaXF1ZUlkICsgXCJDb250YWluZXJcIjtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGZpbGVJbnB1dENsYXNzID0gXCJmaWxlLWlucHV0XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgZmlsZUlucHV0ID0gcC5jcmVhdGVGaWxlSW5wdXQob25GaWxlTG9hZCwgXCJmYWxzZVwiKTtcclxuICAgICAgICBmaWxlSW5wdXQucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgZmlsZUlucHV0LmhpZGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHAuY3JlYXRlQnV0dG9uKGJ1dHRvblRleHQpO1xyXG4gICAgICAgIGJ1dHRvbi5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBidXR0b24uaWQoYnV0dG9uSWQpO1xyXG4gICAgICAgIGJ1dHRvbi5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmaWxlSW5wdXQuZWx0LmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgYnV0dG9uSWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKVxyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGZpbGVJbnB1dENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgY29udGFpbmVySWQpO1xyXG5cclxuICAgIGxldCBsYWJlbDogcDUuRWxlbWVudCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJMQUJFTFwiKTtcclxuICAgIGxhYmVsLmh0bWwobGFiZWxTdHJpbmcpO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkQ2hlY2tib3gobGFiZWxTdHJpbmc6IHN0cmluZywgY2hlY2tib3hJZDogc3RyaW5nLCBpc0NoZWNrZWQ6IGJvb2xlYW4sIGN1c3RvbUNsYXNzOiBzdHJpbmcpOlxyXG4gICAgeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGNoZWNrYm94OiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgbGFiZWxlZENoZWNrYm94Q2xhc3MgPSBcImxhYmVsZWQtY2hlY2tib3hcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBjaGVja2JveElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZENoZWNrYm94Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGNoZWNrYm94ID0gY3JlYXRlQ2hlY2tib3gocCwgaXNDaGVja2VkKTtcclxuICAgICAgICBjaGVja2JveC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3guYWRkQ2xhc3MobGFiZWxlZENoZWNrYm94Q2xhc3MpO1xyXG4gICAgICAgIGNoZWNrYm94LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3gucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgY2hlY2tib3guaWQoY2hlY2tib3hJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBjaGVja2JveElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiBjaGVja2JveCwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBZZXNObyB7XHJcbiAgICBZZXMsXHJcbiAgICBOb1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhblRvWWVzTm8oYm9vbGVhbjogYm9vbGVhbik6IFllc05vIHtcclxuICAgIGlmIChib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIFllc05vLlllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFllc05vLk5vO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL2Rpc2NvdXJzZS5wcm9jZXNzaW5nLm9yZy90L2hvdy10by1vcmdhbml6ZS1yYWRpby1idXR0b25zLWluLXNlcGFyYXRlLWxpbmVzLzEwMDQxLzVcclxuZXhwb3J0IGZ1bmN0aW9uIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdihwOiBwNSwgcmFkaW9EaXZQNUVsZW1lbnQ6IHA1LkVsZW1lbnQpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGNvbnN0IGlucHV0cyA9IHAuc2VsZWN0QWxsKCdpbnB1dCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGNvbnN0IGxhYmVscyA9IHAuc2VsZWN0QWxsKCdsYWJlbCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGNvbnN0IGxlbiA9IGlucHV0cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHAuY3JlYXRlRGl2KCkucGFyZW50KHJhZGlvRGl2UDVFbGVtZW50KS5jaGlsZChpbnB1dHNbaV0pLmNoaWxkKGxhYmVsc1tpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZGlzY291cnNlLnByb2Nlc3Npbmcub3JnL3QvaG93LXRvLW9yZ2FuaXplLXJhZGlvLWJ1dHRvbnMtaW4tc2VwYXJhdGUtbGluZXMvMTAwNDEvNVxyXG5leHBvcnQgZnVuY3Rpb24gZml4UmFkaW9EaXZFbGVtZW50KHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50KSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByYWRpb0RpdlA1RWxlbWVudC5fZ2V0SW5wdXRDaGlsZHJlbkFycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlUmFkaW9PcHRpb25zKHA6IHA1LCByYWRpb0RpdlA1RWxlbWVudDogcDUuRWxlbWVudCwgc3R5bGVDbGFzc2VzOiBzdHJpbmdbXSkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgbGV0IGRpdnM6IHA1LkVsZW1lbnRbXSA9IHAuc2VsZWN0QWxsKCdkaXYnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGl2cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRpdnNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBsZXQgaW5wdXRzOiBwNS5FbGVtZW50W10gPSBwLnNlbGVjdEFsbCgnaW5wdXQnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW5wdXRzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgbGV0IGxhYmVsczogcDUuRWxlbWVudFtdICA9IHAuc2VsZWN0QWxsKCdsYWJlbCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYWJlbHNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxsT2NjdXJyZW5jZXNPZlRhZyhodG1sOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZykge1xyXG4gICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbGV0IGVsZW1lbnRzID0gdGVtcERpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKTtcclxuICAgIHdoaWxlIChlbGVtZW50c1swXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50c1swXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVtcERpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGlucHV0RWxlbWVudDogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0sIG9uSW5wdXQ6ICgpID0+IHZvaWQpIHtcclxuICAgIGlmICghaW5wdXRFbGVtZW50LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmVsZW1lbnQuaW5wdXQob25JbnB1dCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtNb2RlLCBOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7U3RlcGZpbGUsIFN0ZXBmaWxlU3RhdGV9IGZyb20gXCIuL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlLCBBdWRpb0ZpbGVTdGF0ZX0gZnJvbSBcIi4vYXVkaW9fZmlsZVwiO1xyXG5pbXBvcnQge1BsYXlpbmdEaXNwbGF5fSBmcm9tIFwiLi9wbGF5aW5nX2Rpc3BsYXlcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0SWZVbmRlZmluZWQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhbHVlKSA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbE5vdGVzVG9EZWZhdWx0U3RhdGUodHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRyYWNrc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICB0cmFja3NbaV1bal0uc3RhdGUgPSBOb3RlU3RhdGUuREVGQVVMVDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXModHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRyYWNrc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRyYWNrc1tpXVtqXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlRBSUw6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk1JTkU6XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnR5cGUgPSBOb3RlVHlwZS5OT05FOyAvL1RPRE86IGltcGxlbWVudCBtaW5lc1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PTkU6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlJPTExfSEVBRDpcclxuICAgICAgICAgICAgICAgICAgICB0cmFja3NbaV1bal0udHlwZSA9IE5vdGVUeXBlLkhPTERfSEVBRDsgLy9UT0RPOiBpbXBsZW1lbnQgcm9sbHNcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWlzc0JvdW5kYXJ5KGN1cnJlbnRUaW1lOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICBsZXQgbWlzc0JvdW5kYXJ5ID0gY3VycmVudFRpbWUgKyAoY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0udXBwZXJCb3VuZCAvIDEwMDApOyAvL3Jlc3VsdCBpcyBpbiBzZWNvbmRzXHJcbiAgICByZXR1cm4gbWlzc0JvdW5kYXJ5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNLZXlCaW5kaW5nc0RlZmluZWQobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplS2V5QmluZGluZ3MobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIGxldCBtYXBwaW5nOiB7IHRyYWNrTnVtYmVyOiBudW1iZXIsIGtleUNvZGU6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcgfVtdID0gW107XHJcblxyXG4gICAgaWYgKG51bVRyYWNrcyA8PSA5KSB7XHJcbiAgICAgICAgbGV0IGtleVNlcXVlbmNlID0gW1wiQVwiLCBcIlNcIiwgXCJEXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsIFwiSlwiLCBcIktcIiwgXCJMXCJdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleVN0cmluZyA9IGtleVNlcXVlbmNlW2ldO1xyXG4gICAgICAgICAgICBtYXBwaW5nLnB1c2goe3RyYWNrTnVtYmVyOiBpLCBrZXlDb2RlOiBrZXlTdHJpbmcuY2hhckNvZGVBdCgwKSwgc3RyaW5nOiBrZXlTdHJpbmd9KTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChudW1UcmFja3MgPiAyNikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ291bGRuJ3QgZ2VuZXJhdGUgZGVmYXVsdCBrZXkgYmluZGluZ3MgZm9yIG1vcmUgdGhhbiAyNiB0cmFja3MuIFJhbiBvdXQgb2YgbGV0dGVycyFcIik7XHJcbiAgICAgICAgICAgIG51bVRyYWNrcyA9IDI2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFyYWN0ZXJDb2RlID0gXCJBXCIuY2hhckNvZGVBdCgwKSArIGk7IC8vIFRoaXMgaXMgYW4gQVNDSUkgY2hhcmFjdGVyIGNvZGVcclxuICAgICAgICAgICAgbWFwcGluZy5wdXNoKHt0cmFja051bWJlcjogaSwga2V5Q29kZTogY2hhcmFjdGVyQ29kZSwgc3RyaW5nOiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJhY3RlckNvZGUpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3Muc2V0KG51bVRyYWNrcywgbWFwcGluZyk7XHJcbiAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbmZpZ0tleUJpbmRpbmcodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGtleUJpbmRpbmc6IEtleUJpbmRpbmcpIHtcclxuICAgIGxldCBiaW5kaW5nSW5kZXggPSBnZXRJbmRleE9mVHJhY2tOdW1iZXJCaW5kaW5nKHRyYWNrTnVtYmVyLCBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpKTtcclxuICAgIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcylbYmluZGluZ0luZGV4XSA9IGtleUJpbmRpbmc7XHJcbiAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxufVxyXG5cclxuLy8gRXhwZWN0cyBlIHRvIGJlIGFuIGVudW1cclxuZXhwb3J0IGZ1bmN0aW9uIGVudW1Ub1N0cmluZ0FycmF5KGU6IGFueSk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKGUpLmZpbHRlcigodmFsdWUpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SW5kZXhPZlRyYWNrTnVtYmVyQmluZGluZyh0cmFja051bWJlcjogbnVtYmVyLCBiaW5kaW5nczogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChiaW5kaW5nc1tpXS50cmFja051bWJlciA9PT0gdHJhY2tOdW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5U3RyaW5nKHA6IHA1KSB7XHJcbiAgICByZXR1cm4gcC5rZXkubGVuZ3RoID09IDEgPyBwLmtleS50b1VwcGVyQ2FzZSgpIDogcC5rZXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkobW9kZXNBc1N0cmluZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz5bXSk6IE1vZGVbXSB7XHJcbiAgICBsZXQgbW9kZU9wdGlvbnM6IE1vZGVbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2Rlc0FzU3RyaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbW9kZXNBc1N0cmluZ3NbaV07XHJcbiAgICAgICAgbW9kZU9wdGlvbnMucHVzaCh7dHlwZTogbW9kZS5nZXQoXCJ0eXBlXCIpLCBkaWZmaWN1bHR5OiBtb2RlLmdldChcImRpZmZpY3VsdHlcIiksIG1ldGVyOiBtb2RlLmdldChcIm1ldGVyXCIpLCBpZDogaX0pO1xyXG4gICAgfVxyXG4gICAgbW9kZU9wdGlvbnMuc29ydChjb21wYXJlTW9kZU9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIG1vZGVPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZU1vZGVPcHRpb25zKGE6IE1vZGUsIGI6IE1vZGUpIHtcclxuICAgIGxldCB0eXBlQSA9IGEudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgbGV0IHR5cGVCID0gYi50eXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAodHlwZUEgIT0gdHlwZUIpIHtcclxuICAgICAgICBpZiAodHlwZUEgPCB0eXBlQikge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUEgPSBhLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUIgPSBiLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAoZGlmZmljdWx0eUEgIT0gZGlmZmljdWx0eUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlBKSAtIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlCKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbWV0ZXJBID0gcGFyc2VGbG9hdChhLm1ldGVyKTtcclxuICAgICAgICAgICAgbGV0IG1ldGVyQiA9IHBhcnNlRmxvYXQoYi5tZXRlcik7XHJcbiAgICAgICAgICAgIGlmIChtZXRlckEgIT0gbWV0ZXJCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0ZXJBIC0gbWV0ZXJCO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGEuaWQgPSBiLmlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5OiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAoZGlmZmljdWx0eSkge1xyXG4gICAgICAgIGNhc2UgXCJCRUdJTk5FUlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBjYXNlIFwiRUFTWVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICBjYXNlIFwiTUVESVVNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIGNhc2UgXCJIQVJEXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIGNhc2UgXCJDSEFMTEVOR0VcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgY2FzZSBcIkVESVRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoZGl2OiBwNS5FbGVtZW50LCB0YWdOYW1lOiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBjaGlsZHJlbk5vZGVzID0gZGl2LmNoaWxkKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbm9kZTogTm9kZSA9IGNoaWxkcmVuTm9kZXNbaV07XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHA1LkVsZW1lbnQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGJpbmRpbmdzOiB7IHRyYWNrTnVtYmVyOiBudW1iZXIsIGtleUNvZGU6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcgfVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJpbmRpbmdzW2ldLnRyYWNrTnVtYmVyID09PSB0cmFja051bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZGluZ3NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUHJldmlld05vdGVzKG51bVRyYWNrczogbnVtYmVyKTogTm90ZVtdW10ge1xyXG4gICAgbGV0IG5vdGVzOiBOb3RlW11bXSA9IFtdO1xyXG4gICAgbGV0IGlzSG9sZCA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMC4xO1xyXG4gICAgbGV0IHRpbWVJbmNyZW1lbnQgPSAwLjMgLyBudW1UcmFja3M7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSBbXTtcclxuICAgICAgICBpZiAoaXNIb2xkKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuSE9MRF9IRUFELCB0eXBlU3RyaW5nOiBcIkRvbid0IENhcmVcIiwgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuVEFJTCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lICsgMC4yNSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vdGVUeXBlLk5PUk1BTCxcclxuICAgICAgICAgICAgICAgIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLFxyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdGVzLnB1c2godHJhY2spO1xyXG4gICAgICAgIGlzSG9sZCA9ICFpc0hvbGQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gdGltZUluY3JlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBub3RlcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjY3VyYWN5RXZlbnROYW1lKHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHM6IG51bWJlciwgY29uZmlnOiBDb25maWcpOiBzdHJpbmcge1xyXG4gICAgaWYgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPCBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLm5hbWU7IC8vIEhhbmRsZSBtaXNzIGlmIGl0IGV4aXN0c1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPj0gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgIHJldHVybiBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS5uYW1lOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tpXTtcclxuICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPSBudWxsICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgJiYgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdXJhY3kubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBcIkVSUk9SOiBVbmtub3duIGFjY3VyYWN5XCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZpbGVzUmVhZHkoc3RlcGZpbGU6IFN0ZXBmaWxlLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgbGV0IHN0ZXBmaWxlUmVhZHkgPSBzdGVwZmlsZS5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEIHx8XHJcbiAgICAgICAgc3RlcGZpbGUuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEO1xyXG4gICAgbGV0IGF1ZGlvRmlsZVJlYWR5ID0gYXVkaW9GaWxlLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIHJldHVybiBzdGVwZmlsZVJlYWR5ICYmIGF1ZGlvRmlsZVJlYWR5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFBsYXlpbmdEaXNwbGF5KHRyYWNrczogTm90ZVtdW10sIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICBnbG9iYWwucGxheWluZ0Rpc3BsYXkgPSBuZXcgUGxheWluZ0Rpc3BsYXkodHJhY2tzLCBhdWRpb0ZpbGUsIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxufSIsIm1vZHVsZS5leHBvcnRzID0gcDU7IiwibW9kdWxlLmV4cG9ydHMgPSBwYWtvOyJdLCJzb3VyY2VSb290IjoiIn0=