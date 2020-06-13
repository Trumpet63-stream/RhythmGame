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


class KeyBindingHelper {
    constructor(bindingsToAcquire) {
        this.bindingsToAcquire = bindingsToAcquire;
        this.currentBindingNumber = 0;
    }
    bindNext(p) {
        let keybinding = {
            trackNumber: this.currentBindingNumber,
            keyCode: p.keyCode,
            string: Object(_util__WEBPACK_IMPORTED_MODULE_0__["getKeyString"])(p)
        };
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["setConfigKeyBinding"])(this.currentBindingNumber, this.bindingsToAcquire, keybinding);
        this.currentBindingNumber++;
        if (this.currentBindingNumber >= this.bindingsToAcquire) {
            _index__WEBPACK_IMPORTED_MODULE_1__["global"].keyboardEventManager.unbindKey(-1);
        }
    }
}


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
/* harmony import */ var _parsing_parse_swf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing/parse_swf */ "./src/scripts/parsing/parse_swf.ts");
/* harmony import */ var _stepfile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stepfile */ "./src/scripts/stepfile.ts");
/* harmony import */ var _audio_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio_file */ "./src/scripts/audio_file.ts");



class Song {
    constructor() {
    }
    static ofXml(xml) {
        let song = new Song();
        song.genre = parseInt(xml.getAttribute("genre"));
        song.songName = getContentsByTagName(xml, "songname");
        song.songAuthor = getContentsByTagName(xml, "songauthor");
        song.songAuthorUrl = getContentsByTagName(xml, "songauthorurl");
        song.songDifficulty = parseInt(getContentsByTagName(xml, "songdifficulty"));
        song.songStyle = getContentsByTagName(xml, "songstyle");
        song.songLength = getContentsByTagName(xml, "songlength");
        song.songStepauthor = getContentsByTagName(xml, "songstepauthor");
        song.level = getContentsByTagName(xml, "level");
        return song;
    }
    toString() {
        return this.songDifficulty + " " + this.songName;
    }
}
var OnlinePlaylistState;
(function (OnlinePlaylistState) {
    OnlinePlaylistState[OnlinePlaylistState["NO_PLAYLIST"] = 0] = "NO_PLAYLIST";
    OnlinePlaylistState[OnlinePlaylistState["LOADING_PLAYLIST"] = 1] = "LOADING_PLAYLIST";
    OnlinePlaylistState[OnlinePlaylistState["PLAYLIST_READY"] = 2] = "PLAYLIST_READY";
    OnlinePlaylistState[OnlinePlaylistState["PLAYLIST_ERROR"] = 3] = "PLAYLIST_ERROR";
    OnlinePlaylistState[OnlinePlaylistState["LOADING_SONG"] = 4] = "LOADING_SONG";
    OnlinePlaylistState[OnlinePlaylistState["SONG_ERROR"] = 5] = "SONG_ERROR";
})(OnlinePlaylistState || (OnlinePlaylistState = {}));
class OnlinePlaylist {
    constructor() {
        this.state = OnlinePlaylistState.NO_PLAYLIST;
        this.indexUrl = "";
    }
    kickOffLoadPlaylist(indexUrl) {
        this.state = OnlinePlaylistState.LOADING_PLAYLIST;
        this.indexUrl = indexUrl;
        this.get(this.indexUrl, this.parseIndexAndLoadPlaylist.bind(this));
    }
    parseIndexAndLoadPlaylist(event) {
        try {
            let playlistMetadata = event.target.responseXML;
            this.songUrl = getContentsByTagName(playlistMetadata, "songURL");
            this.playlistUrl = getContentsByTagName(playlistMetadata, "playlistURL");
            this.get(this.playlistUrl, this.loadPlaylist.bind(this));
        }
        catch (e) {
            this.state = OnlinePlaylistState.PLAYLIST_ERROR;
            console.error(e);
        }
    }
    loadPlaylist(event) {
        try {
            let playlistText = event.target.response;
            let parser = new DOMParser();
            // replace ampersands because the DOMParser doesn't like them
            let text = playlistText.replace(/&/g, '&amp;');
            let playlistXml = parser.parseFromString(text, "text/xml");
            this.parsePlaylist(playlistXml);
        }
        catch (e) {
            this.state = OnlinePlaylistState.PLAYLIST_ERROR;
            console.error(e);
        }
    }
    parsePlaylist(playlistXml) {
        try {
            let songs = playlistXml.getElementsByTagName("song");
            this.fullPlaylist = [];
            for (let i = 0; i < songs.length; i++) {
                let songXml = songs.item(i);
                if (i === 0) {
                }
                let song = Song.ofXml(songXml);
                if (i === 0) {
                }
                this.fullPlaylist.push(song);
            }
            if (this.fullPlaylist.length === 0) {
                this.state = OnlinePlaylistState.PLAYLIST_ERROR;
            }
            else {
                this.state = OnlinePlaylistState.PLAYLIST_READY;
                this.setPage(0);
            }
        }
        catch (e) {
            this.state = OnlinePlaylistState.PLAYLIST_ERROR;
            console.error(e);
        }
    }
    kickOffLoadSong(songIndex, stepfile, audioFile) {
        this.state = OnlinePlaylistState.LOADING_SONG;
        songIndex += this.pageSize * this.pageNumber;
        stepfile.state = _stepfile__WEBPACK_IMPORTED_MODULE_1__["StepfileState"].NO_SIMFILE;
        audioFile.state = _audio_file__WEBPACK_IMPORTED_MODULE_2__["AudioFileState"].NO_AUDIO_FILE;
        let song = this.fullPlaylist[songIndex];
        let level = song.level;
        let levelUrl = this.songUrl + "level_" + level + ".swf";
        this.get(levelUrl, (event) => {
            try {
                Object(_parsing_parse_swf__WEBPACK_IMPORTED_MODULE_0__["parseSwf"])(event.target.response, stepfile, audioFile);
            }
            catch (e) {
                this.state = OnlinePlaylistState.SONG_ERROR;
                console.error(e);
            }
        }, "arraybuffer");
    }
    get(url, onload, responseType) {
        let corsWorkaround = 'https://cors-anywhere.herokuapp.com/';
        let request = new XMLHttpRequest();
        request.addEventListener("load", onload);
        request.open('GET', corsWorkaround + url, true);
        if (responseType !== undefined) {
            // @ts-ignore
            request.responseType = responseType;
        }
        request.send();
    }
    getPage() {
        return this.pageNumber;
    }
    setPage(pageNumber, pageSize) {
        if (pageSize === undefined) {
            pageSize = OnlinePlaylist.DEFAULT_PAGE_SIZE;
        }
        else if (pageSize < 1) {
            pageSize = 1;
        }
        else if (pageSize > 100) {
            pageSize = 100;
        }
        if (pageNumber > this.getMaxPageNumber(pageSize) || pageNumber < 0) {
            return;
        }
        let minIndex = pageNumber * pageSize;
        let maxIndex = minIndex + pageSize;
        this.playlist = [];
        for (let i = minIndex; i < maxIndex; i++) {
            if (i < this.fullPlaylist.length) {
                this.playlist.push(this.fullPlaylist[i]);
            }
        }
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
    getMaxPageNumber(pageSize) {
        return Math.floor(this.fullPlaylist.length / pageSize) - 1;
    }
    nextPage() {
        this.setPage(this.pageNumber + 1);
    }
    previousPage() {
        this.setPage(this.pageNumber - 1);
    }
}
OnlinePlaylist.DEFAULT_PAGE_SIZE = 50;
function getContentsByTagName(xml, tag) {
    return xml.getElementsByTagName(tag)[0].innerHTML;
}


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
/* harmony import */ var _key_binding_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../key_binding_helper */ "./src/scripts/key_binding_helper.ts");
/* harmony import */ var _ui_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui_util */ "./src/scripts/ui_util.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index */ "./src/scripts/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util */ "./src/scripts/util.ts");
/* harmony import */ var _accuracy_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../accuracy_manager */ "./src/scripts/accuracy_manager.ts");
/* harmony import */ var _preview_display__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../preview_display */ "./src/scripts/preview_display.ts");
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dom_wrapper */ "./src/scripts/dom_wrapper.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../config */ "./src/scripts/config.ts");









class Options {
    static draw() {
        let p = _index__WEBPACK_IMPORTED_MODULE_3__["global"].p5Scene.sketchInstance;
        p.background(_index__WEBPACK_IMPORTED_MODULE_3__["global"].optionsBackground);
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["drawHeading"])();
        let scrollDiv = _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].create(() => {
            return p.createDiv();
        }, "scrollDiv");
        if (!scrollDiv.alreadyExists) {
            scrollDiv.element.addClass("options-scroll-div");
            scrollDiv.element.addClass(Options.OPTIONS_CLASS);
            scrollDiv.element.addClass(_index__WEBPACK_IMPORTED_MODULE_3__["global"].globalClass);
        }
        // @ts-ignore
        let canvasPosition = p._renderer.position();
        scrollDiv.element.position(canvasPosition.x + 335, canvasPosition.y + 45);
        let resetConfigButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].create(() => {
            return p.createButton("Reset To Default");
        }, "resetConfigButton");
        if (!resetConfigButton.alreadyExists) {
            resetConfigButton.element.addClass(Options.OPTIONS_CLASS);
            resetConfigButton.element.addClass("reset-config");
            resetConfigButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_3__["global"].globalClass);
            resetConfigButton.element.mousePressed(() => {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config = new _config__WEBPACK_IMPORTED_MODULE_8__["Config"]({});
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            });
            scrollDiv.element.child(resetConfigButton.element);
        }
        let pauseAtStartInSecondsInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledInput"])("Pause at Start (sec)", "pauseAtStartInSecondsInput", _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.pauseAtStartInSeconds.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(pauseAtStartInSecondsInput, () => {
            let value = pauseAtStartInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value >= 0) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.pauseAtStartInSeconds = value;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!pauseAtStartInSecondsInput.alreadyExists) {
            scrollDiv.element.child(pauseAtStartInSecondsInput.element.parent());
        }
        let scrollSpeedInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledInput"])("Scroll Speed (px/sec)", "scrollSpeedInput", _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.pixelsPerSecond.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(scrollSpeedInput, () => {
            let value = scrollSpeedInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value) && value > 0) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.pixelsPerSecond = value;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!scrollSpeedInput.alreadyExists) {
            scrollDiv.element.child(scrollSpeedInput.element.parent());
        }
        let scrollDirectionSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledSelect"])("Scroll Direction", "scrollDirectionSelect", _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"], _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.scrollDirection, Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(scrollDirectionSelect, () => {
            let value = String(scrollDirectionSelect.element.value());
            let enumOfValue = _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"][value];
            if (enumOfValue !== undefined) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.scrollDirection = enumOfValue;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(scrollDirectionSelect.element.parent());
        }
        let receptorPositionInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledInput"])("Receptor Position (%)", "receptorPositionInput", _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.receptorYPercent.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(receptorPositionInput, () => {
            let value = receptorPositionInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.receptorYPercent = value;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!receptorPositionInput.alreadyExists) {
            scrollDiv.element.child(receptorPositionInput.element.parent());
        }
        let additionalOffsetInSecondsInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledInput"])("Accuracy Offset (ms)", "additionalOffsetInSecondsInput", (_index__WEBPACK_IMPORTED_MODULE_3__["global"].config.additionalOffsetInSeconds * 1000).toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(additionalOffsetInSecondsInput, () => {
            let value = additionalOffsetInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.additionalOffsetInSeconds = value / 1000;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!additionalOffsetInSecondsInput.alreadyExists) {
            scrollDiv.element.child(additionalOffsetInSecondsInput.element.parent());
        }
        let accuracySettingsInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledTextArea"])("Accuracy Settings", "accuracySettingsInput", JSON.stringify(_index__WEBPACK_IMPORTED_MODULE_3__["global"].config.accuracySettings, null, 3), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracySettingsInput, () => {
            let value = accuracySettingsInput.element.value();
            if (typeof value === "string") {
                let newAccuracySettings = parseAccuracySettingsJson(value);
                if (newAccuracySettings !== null) {
                    _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.accuracySettings = newAccuracySettings;
                    _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
                }
            }
        });
        if (!accuracySettingsInput.alreadyExists) {
            scrollDiv.element.child(accuracySettingsInput.element.parent());
        }
        let accuracyFlashEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledSelect"])("Accuracy Flash", "accuracyFlashEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyFlashEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyFlashEnabledSelect, () => {
            let value = String(accuracyFlashEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyFlashEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyFlashEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyFlashEnabledSelect.element.parent());
        }
        let accuracyParticlesEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledSelect"])("Accuracy Particles", "accuracyParticlesEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyParticlesEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyParticlesEnabledSelect, () => {
            let value = String(accuracyParticlesEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyParticlesEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyParticlesEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyParticlesEnabledSelect.element.parent());
        }
        let accuracyTextEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledSelect"])("Accuracy Text", "accuracyTextEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyTextEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(accuracyTextEnabledSelect, () => {
            let value = String(accuracyTextEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyTextEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isAccuracyTextEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(accuracyTextEnabledSelect.element.parent());
        }
        let holdParticlesEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledSelect"])("Hold Particles", "holdParticlesEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isHoldParticlesEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(holdParticlesEnabledSelect, () => {
            let value = String(holdParticlesEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isHoldParticlesEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isHoldParticlesEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(holdParticlesEnabledSelect.element.parent());
        }
        let holdGlowEnabledSelect = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledSelect"])("Hold Glow", "holdGlowEnabledSelect", _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"], Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["booleanToYesNo"])(_index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isHoldGlowEnabled), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(holdGlowEnabledSelect, () => {
            let value = String(holdGlowEnabledSelect.element.value());
            let enumOfValue = _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"][value];
            if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].Yes) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isHoldGlowEnabled = true;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
            else if (enumOfValue === _ui_util__WEBPACK_IMPORTED_MODULE_2__["YesNo"].No) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.isHoldGlowEnabled = false;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.save();
            }
        });
        if (!scrollDirectionSelect.alreadyExists) {
            scrollDiv.element.child(holdGlowEnabledSelect.element.parent());
        }
        let keyBindingsSectionHeader = createKeyBindingsSectionHeader();
        if (!keyBindingsSectionHeader.alreadyExists) {
            scrollDiv.element.child(keyBindingsSectionHeader.element);
        }
        if (_index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks == undefined) {
            _index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks = 4;
        }
        let previewNumTracks = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledInput"])("Number of Tracks", "previewNumTracksInput", _index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks.toString(), Options.OPTIONS_CLASS);
        // @ts-ignore
        setOnInputUnlessItAlreadyExists(previewNumTracks, () => {
            let value = previewNumTracks.element.value();
            if (typeof value === "string") {
                value = parseInt(value);
            }
            if (Number.isInteger(value) && value > 0 && value <= 26) {
                removeOldBindingButtons(_index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks);
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks = value;
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].previewDisplay = new _preview_display__WEBPACK_IMPORTED_MODULE_6__["PreviewDisplay"](Object(_util__WEBPACK_IMPORTED_MODULE_4__["generatePreviewNotes"])(value), _index__WEBPACK_IMPORTED_MODULE_3__["global"].config, _index__WEBPACK_IMPORTED_MODULE_3__["global"].p5Scene);
            }
        });
        if (!previewNumTracks.alreadyExists) {
            scrollDiv.element.child(previewNumTracks.element.parent());
        }
        let keyBindingsQuickstartButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].create(() => {
            return p.createButton("KeyBindings Quickstart");
        }, "keyBindingsQuickstartButton");
        if (!keyBindingsQuickstartButton.alreadyExists) {
            keyBindingsQuickstartButton.element.addClass(Options.OPTIONS_CLASS);
            keyBindingsQuickstartButton.element.addClass("keybindings-quickstart");
            keyBindingsQuickstartButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_3__["global"].globalClass);
            keyBindingsQuickstartButton.element.mousePressed(() => {
                let keybindingHelper = new _key_binding_helper__WEBPACK_IMPORTED_MODULE_1__["KeyBindingHelper"](_index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks);
                // Bind this action to the "-1" key so that it happens on any key press
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].keyboardEventManager.bindKeyToAction(-1, () => {
                    // Ignore this code because it's used to indicate input that's not yet finished processing
                    if (p.keyCode !== 229) {
                        keybindingHelper.bindNext(p);
                    }
                });
            });
            scrollDiv.element.child(keyBindingsQuickstartButton.element);
        }
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_4__["isKeyBindingsDefined"])(_index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks)) {
            Object(_util__WEBPACK_IMPORTED_MODULE_4__["initializeKeyBindings"])(_index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks);
        }
        for (let trackNumber = 0; trackNumber < _index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks; trackNumber++) {
            let keyBindingInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createKeyBindingInput"])(trackNumber, _index__WEBPACK_IMPORTED_MODULE_3__["global"].previewNumTracks, Options.OPTIONS_CLASS);
            if (!keyBindingInput.alreadyExists) {
                scrollDiv.element.child(keyBindingInput.element);
            }
        }
        _index__WEBPACK_IMPORTED_MODULE_3__["global"].previewDisplay.draw();
    }
}
Options.OPTIONS_CLASS = "options";
function createKeyBindingsSectionHeader() {
    let p = _index__WEBPACK_IMPORTED_MODULE_3__["global"].p5Scene.sketchInstance;
    let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].create(() => {
        let container = p.createDiv();
        container.html('Key Bindings <span style="font-size:12px">(track 1 is the leftmost track)</span>');
        container.addClass("options-free-text");
        container.addClass(Options.OPTIONS_CLASS);
        container.addClass(_index__WEBPACK_IMPORTED_MODULE_3__["global"].globalClass);
        return container;
    }, "keyBindingsSectionHeader");
    return container;
}
function setOnInputUnlessItAlreadyExists(inputElement, onInput) {
    if (!inputElement.alreadyExists) {
        // @ts-ignore
        inputElement.element.input(onInput);
    }
}
function removeOldBindingButtons(numTracks) {
    for (let trackNumber = 0; trackNumber < numTracks; trackNumber++) {
        _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].removeElementById(Object(_util__WEBPACK_IMPORTED_MODULE_4__["getKeyBindingContainerId"])(trackNumber, numTracks));
    }
}
function parseAccuracySettingsJson(accuracySettingsJson) {
    try {
        let accuracySettings = [];
        let jsonArray = JSON.parse(accuracySettingsJson);
        for (let i = 0; i < jsonArray.length; i++) {
            let accuracy = jsonArray[i];
            // this fails if the user gave the wrong input
            accuracySettings.push(new _accuracy_manager__WEBPACK_IMPORTED_MODULE_5__["Accuracy"](accuracy.name, accuracy.lowerBound, accuracy.upperBound));
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
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].NO_SIMFILE:
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
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        p.background(_index__WEBPACK_IMPORTED_MODULE_0__["global"].playFromFileBackground);
        let urlInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledInput"])("Engine URL", "urlInput", _index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.indexUrl, PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
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
                    _index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.kickOffLoadPlaylist(value);
                }
            });
        }
        if (_index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.state !== _online_playlist__WEBPACK_IMPORTED_MODULE_5__["OnlinePlaylistState"].LOADING_PLAYLIST) {
            loadButton.element.removeAttribute('disabled');
        }
        if (_index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.state === _online_playlist__WEBPACK_IMPORTED_MODULE_5__["OnlinePlaylistState"].PLAYLIST_READY ||
            _index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.state === _online_playlist__WEBPACK_IMPORTED_MODULE_5__["OnlinePlaylistState"].LOADING_SONG) {
            let playlistMenuId = "playlistMenu";
            let playlistMenu = drawRadioMenu(p, playlistMenuId, _index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.playlist);
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
                            _index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.kickOffLoadSong(value, playFromOnlineStepfile, playFromOnlineAudioFile);
                            isSwfLoadStarted = true;
                        }
                    });
                }
                if (_index__WEBPACK_IMPORTED_MODULE_0__["global"].onlinePlaylist.state !== _online_playlist__WEBPACK_IMPORTED_MODULE_5__["OnlinePlaylistState"].LOADING_SONG) {
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
/*! exports provided: parseSwf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSwf", function() { return parseSwf; });
/* harmony import */ var _swf_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./swf-tags */ "./src/scripts/parsing/swf-tags.ts");
/* harmony import */ var _swf_reader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./swf-reader */ "./src/scripts/parsing/swf-reader.ts");


/**
 * File contents originally from:
 * @author: Velocity
 * @github: https://github.com/flashflashrevolution/web-beatbox-editor
 */
function parseSwf(input, stepfile, audioFile) {
    if (input.constructor === ArrayBuffer) {
        return swfFile_Ready(input, stepfile, audioFile);
    }
    let reader = new FileReader();
    reader.onload = function (event) {
        swfFile_Ready(event.target.result, stepfile, audioFile);
    };
    reader.onerror = function (event) {
        alert("I AM ERROR: " + event.target.error.code);
    };
    reader.readAsArrayBuffer(input);
}
let swf_tags;
function swfFile_Ready(buffer, stepfile, audioFile) {
    swf_tags = Object(_swf_reader__WEBPACK_IMPORTED_MODULE_1__["uncompress"])(buffer);
    // Chart Data
    let chart_tag = getBeatBox();
    let chart_data = chart_tag["variables"]["_root"]["beatBox"];
    stepfile.loadFfrBeatmap(chart_data);
    // Music Data
    let music_binary = getAudio();
    let blob = new Blob([music_binary], { type: 'audio/mpeg' });
    audioFile.loadBlob(blob);
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

var StepfileState;
(function (StepfileState) {
    StepfileState[StepfileState["NO_SIMFILE"] = 0] = "NO_SIMFILE";
    StepfileState[StepfileState["DONE_READING"] = 1] = "DONE_READING";
    StepfileState[StepfileState["PARTIALLY_PARSED"] = 2] = "PARTIALLY_PARSED";
    StepfileState[StepfileState["FULLY_PARSED"] = 3] = "FULLY_PARSED";
    StepfileState[StepfileState["ERROR"] = 4] = "ERROR";
})(StepfileState || (StepfileState = {}));
class Stepfile {
    constructor() {
        this.state = StepfileState.NO_SIMFILE;
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
        let tracks = this.beatmapToTrackArray(beatmap);
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
    beatmapToTrackArray(beatmap) {
        let tracks = [];
        for (let i = 0; i < 4; i++) {
            tracks.push([]);
        }
        for (let i = 0; i < beatmap.length; i++) {
            let beatmapRow = beatmap[i];
            let trackNumber = this.trackNumberFromDirection(beatmapRow[1]);
            let note = this.noteFromBeatmapRow(beatmapRow);
            tracks[trackNumber].push(note);
        }
        return tracks;
    }
    noteFromBeatmapRow(row) {
        let timeInSeconds = row[0] / 30;
        return { timeInSeconds: timeInSeconds, type: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL, state: _parsing_parse_sm__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT, typeString: "N/A" };
    }
    trackNumberFromDirection(direction) {
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
/*! exports provided: drawHeading, setElementCenterPositionRelative, createLabeledInput, createLabeledSelect, createKeyBindingInput, createLabeledTextArea, createFileInput, createLabeledCheckbox, YesNo, booleanToYesNo, encloseEachInputLabelPairIntoASubDiv, fixRadioDivElement, styleRadioOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawHeading", function() { return drawHeading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementCenterPositionRelative", function() { return setElementCenterPositionRelative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabeledInput", function() { return createLabeledInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabeledSelect", function() { return createLabeledSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createKeyBindingInput", function() { return createKeyBindingInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabeledTextArea", function() { return createLabeledTextArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFileInput", function() { return createFileInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLabeledCheckbox", function() { return createLabeledCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YesNo", function() { return YesNo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "booleanToYesNo", function() { return booleanToYesNo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encloseEachInputLabelPairIntoASubDiv", function() { return encloseEachInputLabelPairIntoASubDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixRadioDivElement", function() { return fixRadioDivElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleRadioOptions", function() { return styleRadioOptions; });
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
function createKeyBindingInput(trackNumber, numTracks, customClass) {
    let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
    let setButtonId = Object(_util__WEBPACK_IMPORTED_MODULE_2__["getKeyBindingButtonId"])(trackNumber, numTracks);
    let keybindingInputClass = "keybinding-input";
    let container = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        let container = p.createDiv();
        container.addClass(customClass);
        container.addClass(keybindingInputClass);
        container.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        let label = createLabel(p, "");
        label.addClass(customClass);
        label.addClass(keybindingInputClass);
        label.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        label.parent(container);
        let setButton = p.createButton("Set");
        setButton.parent(container);
        setButton.id(setButtonId);
        setButton.mousePressed(() => {
            _index__WEBPACK_IMPORTED_MODULE_0__["global"].keyboardEventManager.bindKeyToAction(-1, () => {
                // Ignore this code because it's used to indicate input that's not yet finished processing
                if (p.keyCode !== 229) {
                    Object(_util__WEBPACK_IMPORTED_MODULE_2__["setConfigKeyBinding"])(trackNumber, numTracks, { trackNumber: trackNumber, keyCode: p.keyCode, string: Object(_util__WEBPACK_IMPORTED_MODULE_2__["getKeyString"])(p) });
                    _index__WEBPACK_IMPORTED_MODULE_0__["global"].keyboardEventManager.unbindKey(-1);
                }
            });
        });
        setButton.addClass(customClass);
        setButton.addClass(keybindingInputClass);
        setButton.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        return container;
    }, Object(_util__WEBPACK_IMPORTED_MODULE_2__["getKeyBindingContainerId"])(trackNumber, numTracks));
    let trackBindingInfo = Object(_util__WEBPACK_IMPORTED_MODULE_2__["findBindingInfoForTrack"])(trackNumber, _index__WEBPACK_IMPORTED_MODULE_0__["global"].config.keyBindings.get(numTracks));
    let keyString = trackBindingInfo.string;
    let labelString = 'Track ' + (trackNumber + 1) + ': <span class="' +
        keybindingInputClass + " " + customClass + " " + _index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass +
        '">' + keyString + '</span>';
    let labelElement = Object(_util__WEBPACK_IMPORTED_MODULE_2__["getFirstElementByTagName"])(container.element, "LABEL");
    labelElement.html(labelString);
    return container;
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


/***/ }),

/***/ "./src/scripts/util.ts":
/*!*****************************!*\
  !*** ./src/scripts/util.ts ***!
  \*****************************/
/*! exports provided: defaultIfUndefined, isUndefined, setAllNotesToDefaultState, replaceNotYetImplementedNoteTypes, getMissBoundary, isKeyBindingsDefined, initializeKeyBindings, setConfigKeyBinding, enumToStringArray, getKeyBindingButtonId, getKeyBindingContainerId, getKeyString, getModeOptionsForDisplay, compareModeOptions, getFirstElementByTagName, findBindingInfoForTrack, generatePreviewNotes, getAccuracyEventName, isFilesReady, initPlayingDisplay */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKeyBindingButtonId", function() { return getKeyBindingButtonId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKeyBindingContainerId", function() { return getKeyBindingContainerId; });
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
function getKeyBindingButtonId(trackNumber, numTracks) {
    return getKeyBindingUniqueId(trackNumber, numTracks) + "Button";
}
function getKeyBindingContainerId(trackNumber, numTracks) {
    return getKeyBindingUniqueId(trackNumber, numTracks) + "Button";
}
function getKeyBindingUniqueId(trackNumber, numTracks) {
    return "track" + trackNumber + "Of" + numTracks + "Binding";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaHl0aG1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja19mbGFzaC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja190ZXh0LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9yZWNvcmRpbmcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2F1ZGlvX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvZGVmYXVsdF9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RlZmF1bHRfbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kaXNwbGF5X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RvbV93cmFwcGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kcmF3aW5nX3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2hvbGRfZ2xvdy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaG9sZF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9ob2xkX3BhcnRpY2xlcy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2tleV9iaW5kaW5nX2hlbHBlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMva2V5Ym9hcmRfZXZlbnRfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvbWlzc19tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9ub3RlX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL25vdGVfc2tpbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvb25saW5lX3BsYXlsaXN0LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wNV9zY2VuZS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFnZV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9vcHRpb25zLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5X2Zyb21fZmlsZS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFnZXMvcGxheV9mcm9tX29ubGluZS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFnZXMvcmVzdWx0cy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9ieXRlX3JlYWRlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9wYXJzZV9zbS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9wYXJzZV9zd2YudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhcnNpbmcvc3dmLXJlYWRlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9zd2YtdGFncy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhcnRpY2xlX3N5c3RlbS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGxheWVyX2tleV9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlpbmdfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcHJldmlld19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9yZWNlcHRvcl9zaHJpbmtfcmVhY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3Jlc3VsdHNfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX2RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3N0ZXBmaWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy90aW1lX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3VpX3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS9leHRlcm5hbCBcInA1XCIiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS9leHRlcm5hbCBcInBha29cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFBK0I7QUFHeEIsTUFBTSxxQkFBcUI7SUFTOUIsWUFBWSxpQkFBb0MsRUFBRSxNQUFjLEVBQUUsY0FBOEIsRUFBRSxTQUFpQjtRQUMvRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUNuQixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUNuQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztZQUNuQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN2QixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3BCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQ2hGLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFTyxZQUFZLENBQUMsR0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0sSUFBSSxDQUFDLG9CQUE0QjtRQUNwQyxLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBRU8saUJBQWlCLENBQUMsV0FBbUIsRUFBRSxvQkFBNEI7UUFDdkUsSUFBSSxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsd0NBQXdDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsZ0NBQWdDLENBQUMsRUFBRTtZQUMvRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDN0YsSUFBSSxVQUFVLEdBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ2hGLElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG9CQUFvQixFQUFFLGdDQUFnQyxDQUFDLENBQUM7WUFDaEgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUVPLGdCQUFnQixDQUFDLG9CQUE0QixFQUFFLGFBQXFDO1FBQ3hGLElBQUksYUFBYSxLQUFLLElBQUksRUFBRTtZQUN4QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDOUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUk7WUFDaEMsYUFBYSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFO1lBQ3pELE9BQU8sS0FBSyxDQUFDLENBQUMsMkJBQTJCO1NBQzVDO1FBQ0QsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSTtZQUNwRCxhQUFhLENBQUMsY0FBYyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRTtZQUM5RSxPQUFPLEtBQUssQ0FBQyxDQUFDLDBCQUEwQjtTQUMzQztRQUVELElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG9CQUFvQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzdGLElBQUksb0JBQW9CLEdBQUcscUJBQXFCLENBQUMsc0JBQXNCLEVBQUU7WUFDckUsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sdUJBQXVCLENBQUMsb0JBQTRCLEVBQUUsYUFBcUM7UUFDL0YsT0FBTyxvQkFBb0IsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQzlELENBQUM7SUFFTyx3Q0FBd0MsQ0FBQyxXQUFtQjtRQUNoRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUU7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQsd0NBQXdDO0lBQ2hDLGFBQWEsQ0FBQyxhQUFxQztRQUN2RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQzlDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ25FLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELHdDQUF3QztJQUNoQywwQkFBMEIsQ0FBQyxVQUFzQjtRQUNyRCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxzREFBc0Q7UUFDeEUsS0FBSyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUQsSUFBSSxRQUFRLEdBQWEsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7Z0JBQ3hFLFFBQVEsRUFBRSxDQUFDO2FBQ2Q7U0FDSjtRQUNELE9BQU8sUUFBUTtJQUNuQixDQUFDO0lBRU8sb0JBQW9CLENBQUMsVUFBc0I7UUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxRQUFRLEdBQWEsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3JELE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxxQ0FBcUM7SUFDN0IsZUFBZSxDQUFDLGFBQXFDLEVBQUUsVUFBc0I7UUFDakYsSUFBSSxhQUFhLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRTtZQUNsQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLGlCQUFpQixFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hELElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLFFBQVEsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLGNBQWMsSUFBSSxhQUFhLENBQUMsY0FBYyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzNHLE9BQU8sV0FBVyxDQUFDO2FBQ3RCO1lBQ0QsV0FBVyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBRU8sV0FBVyxDQUFDLEtBQVk7UUFDNUIsSUFBSSxTQUFTLEdBQVUsRUFBRSxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxvQkFBNEIsRUFBRSxPQUFlLEVBQUUsT0FBZSxFQUFFLEtBQWU7UUFDN0YsSUFBSSxDQUFDLEdBQU8sNkNBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM5RyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2QsOEJBQThCO1FBQzlCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVPLFlBQVksQ0FBQyxvQkFBNEIsRUFBRSxzQkFBOEI7UUFDN0UsSUFBSSxvQkFBb0IsR0FBRyxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQztRQUN6RSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU8sV0FBVyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxLQUFhO1FBQ2pFLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNaLE9BQU8sUUFBUSxDQUFDO1NBQ25CO2FBQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxRQUFRLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ25EO2FBQU07WUFDSCxPQUFPLFFBQVEsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFTyxRQUFRLENBQUMsQ0FBSyxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsT0FBZSxFQUFFLE9BQWUsRUFBRSxPQUFlO1FBQ3ZHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksU0FBUyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDNUIsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUN0QyxJQUFJLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDdEMsSUFBSSxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQzlDLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQzs7QUFwTGMsNENBQXNCLEdBQVcsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7O0FDVHhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFb0I7QUFDRjtBQUUxQyxNQUFNLHlCQUF5QjtJQVVsQyxZQUFZLE1BQWMsRUFBRSxjQUE4QixFQUFFLFNBQWlCO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTdGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUNwQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNsQixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNsQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNsQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUN0QixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUNoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUN0QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUMvRSxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxlQUFlLEtBQUssaUVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsSUFBSSxPQUFPLEdBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksK0RBQWMsQ0FBQyx5QkFBeUIsQ0FBQywwQkFBMEIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2hIO0lBQ0wsQ0FBQztJQUVPLFlBQVksQ0FBQyxHQUFXO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSxJQUFJLENBQUMsb0JBQTRCO1FBQ3BDLEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxFQUFFO1lBQ25FLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDaEU7SUFDTCxDQUFDO0lBRU0sNEJBQTRCLENBQUMsYUFBNEI7UUFDNUQsSUFBSSxDQUFDLEdBQU8sNkNBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pDLElBQUksb0JBQW9CLEdBQUcsYUFBYSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUM3RixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDdEYsb0JBQW9CLENBQUMsQ0FBQztZQUMxQixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0RSxJQUFJLGdCQUFnQixHQUE2QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDekcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsc0JBQXNCLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFDbkcsYUFBYSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0Y7SUFDTCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsQ0FBSyxFQUFFLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxtQkFBMkI7UUFDakcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDM0YsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sbUJBQW1CLENBQUMsYUFBNEI7UUFDcEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSTtZQUNoQyxhQUFhLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUU7WUFDekQsT0FBTyxLQUFLLENBQUMsQ0FBQywyQkFBMkI7U0FDNUM7UUFDRCxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJO1lBQ3BELGFBQWEsQ0FBQyxjQUFjLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFO1lBQzlFLE9BQU8sS0FBSyxDQUFDLENBQUMsMEJBQTBCO1NBQzNDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHdDQUF3QztJQUNoQyxtQkFBbUIsQ0FBQyxhQUE0QjtRQUNwRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQzlDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ25FLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDMUMsT0FBTyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCx3Q0FBd0M7SUFDaEMsMEJBQTBCLENBQUMsVUFBc0I7UUFDckQsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0RBQXNEO1FBQ3hFLEtBQUssSUFBSSxDQUFDLEdBQUcsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVELElBQUksUUFBUSxHQUFhLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO2dCQUN4RSxRQUFRLEVBQUUsQ0FBQzthQUNkO1NBQ0o7UUFDRCxPQUFPLFFBQVE7SUFDbkIsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFVBQXNCO1FBQy9DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksUUFBUSxHQUFhLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUNyRCxPQUFPLENBQUMsQ0FBQzthQUNaO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQscUNBQXFDO0lBQzdCLGVBQWUsQ0FBQyxhQUE0QixFQUFFLFVBQXNCO1FBQ3hFLElBQUksYUFBYSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUU7WUFDbEMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4RCxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxRQUFRLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxjQUFjLElBQUksYUFBYSxDQUFDLGNBQWMsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUMzRyxPQUFPLFdBQVcsQ0FBQzthQUN0QjtZQUNELFdBQVcsRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVPLFdBQVcsQ0FBQyxLQUFZO1FBQzVCLElBQUksU0FBUyxHQUFVLEVBQUUsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7O0FBbEljLG9EQUEwQixHQUFXLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2I1RDtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUdhO0FBRXJDLE1BQU0sb0JBQW9CO0lBTTdCLFlBQVksaUJBQW9DLEVBQUUsT0FBZSxFQUFFLE9BQWUsRUFBRSxNQUFjO1FBQzlGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU0sSUFBSSxDQUFDLG9CQUE0QjtRQUNwQyxJQUFJLFNBQVMsR0FBMkIsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLENBQUM7UUFDbkYsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUNELElBQUksa0JBQWtCLEdBQUcsb0JBQW9CLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUN4RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEQsSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBQ0QsSUFBSSxTQUFTLEdBQUcsa0VBQW9CLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLG1DQUFtQztRQUN2QyxJQUFJLGVBQWUsR0FBNkIsRUFBRSxDQUFDO1FBQ25ELElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztRQUM1QyxLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUU7WUFDNUYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO2dCQUNsRyxJQUFJLGFBQWEsR0FBRyxZQUFZLEVBQUU7b0JBQzlCLFlBQVksR0FBRyxhQUFhLENBQUM7b0JBQzdCLGVBQWUsR0FBRyxLQUFLLENBQUM7aUJBQzNCO2FBQ0o7U0FDSjtRQUNELElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sZUFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLFdBQVcsQ0FBQyxJQUFZO1FBQzVCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7WUFDWixPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDO1NBQ25DO2FBQU0sSUFBRyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7WUFDakMsT0FBTyxXQUFXLENBQUM7U0FDdEI7YUFBTSxJQUFHLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtZQUNqQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU8sYUFBYSxDQUFDLElBQVksRUFBRSxRQUFnQjtRQUNoRCxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDMUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDeEVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4RDtBQUdEO0FBRWpCO0FBRXJDLE1BQU0sUUFBUTtJQUtqQixZQUFZLElBQVksRUFBRSxVQUFrQixFQUFFLFVBQWtCO1FBQzVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7Q0FDSjtBQUVNLE1BQU0sZUFBZTtJQU14QixZQUFZLFdBQXdCLEVBQUUsTUFBYyxFQUFFLFdBQXdCLEVBQ2xFLG1CQUEyRDtRQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7SUFDbkQsQ0FBQztJQUVNLGtCQUFrQixDQUFDLE1BQXVCO1FBQzdDLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSwyREFBUSxDQUFDLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BEO2FBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLDJEQUFRLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hEO1NBQ0o7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUFDLG9CQUE0QixFQUFFLFdBQW1CO1FBQ2xFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxvQkFBb0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRixJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDbkIsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLDBEQUFRLENBQUMsTUFBTSxFQUFFO2dCQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLDJEQUFTLENBQUMsR0FBRyxDQUFDO2dCQUMzQixJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztvQkFDckIsWUFBWSxFQUFFLGtFQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUN6RCxXQUFXLEVBQUUsV0FBVztvQkFDeEIsY0FBYyxFQUFFLFFBQVE7b0JBQ3hCLGFBQWEsRUFBRSxvQkFBb0I7b0JBQ25DLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDdEIsQ0FBQyxDQUFDO2FBQ047aUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLDBEQUFRLENBQUMsU0FBUyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLDJEQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsbURBQW1EO2dCQUNoRixJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztvQkFDckIsWUFBWSxFQUFFLGtFQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUN6RCxXQUFXLEVBQUUsV0FBVztvQkFDeEIsY0FBYyxFQUFFLFFBQVE7b0JBQ3hCLGFBQWEsRUFBRSxvQkFBb0I7b0JBQ25DLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDdEIsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0o7YUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztnQkFDckIsWUFBWSxFQUFFLGtFQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN6RCxXQUFXLEVBQUUsV0FBVztnQkFDeEIsY0FBYyxFQUFFLFFBQVE7Z0JBQ3hCLGFBQWEsRUFBRSxvQkFBb0I7Z0JBQ25DLFFBQVEsRUFBRSwwREFBUSxDQUFDLElBQUk7YUFDMUIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU8saUNBQWlDLENBQUMsb0JBQTRCLEVBQUUsV0FBbUI7UUFDdkYsSUFBSSxhQUFhLEdBQWdELElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2xHLElBQUksaUJBQWlCLEdBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUMvRCxJQUFJLGtCQUFrQixHQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkgsT0FBTyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELHlCQUF5QjtRQUNyQixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDcEQsSUFBSSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQUksU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNwRCxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUNwRSxJQUFJLFlBQVksQ0FBQztRQUNqQixJQUFJLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RELFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1NBQy9EO2FBQU07WUFDSCxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztTQUMvRDtRQUNELE9BQU8sRUFBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxHQUFHLElBQUksRUFBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxhQUEwRCxFQUFFLG9CQUE0QjtRQUNyRyxPQUFPO1lBQ0gsU0FBUyxFQUFFLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyxTQUFTO1lBQ3pELFlBQVksRUFBRSxvQkFBb0IsR0FBRyxhQUFhLENBQUMsWUFBWTtTQUNsRSxDQUFDO0lBQ04sQ0FBQztJQUVPLGdDQUFnQyxDQUFDLFdBQW1CLEVBQUUsY0FBb0U7UUFDOUgsS0FBSyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEYsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksMkRBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BFLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQkFBbUI7UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQztJQUNwRyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsb0JBQTRCLEVBQUUsV0FBbUI7UUFDOUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLG9CQUFvQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFGLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtZQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksMERBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQzVCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztnQkFDdEcsSUFBSSxDQUFDLEtBQUssR0FBRywyREFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHlDQUF5QztnQkFDckUsSUFBSSxDQUFDLEtBQUssR0FBRywyREFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQjtnQkFDdkQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNsRSxJQUFJLENBQUMsbUJBQW1CLENBQUM7b0JBQ3JCLFlBQVksRUFBRSxVQUFVLEdBQUcsa0VBQW9CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3RFLFdBQVcsRUFBRSxXQUFXO29CQUN4QixjQUFjLEVBQUUsUUFBUTtvQkFDeEIsYUFBYSxFQUFFLG9CQUFvQjtvQkFDbkMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO2lCQUN0QixDQUFDLENBQUM7YUFDTjtTQUNKO2FBQU0sRUFBRSxtQkFBbUI7WUFDeEIsd0JBQXdCO1lBQ3hCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsNkJBQTZCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDaEUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLDBEQUFRLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksMERBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsMkRBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw0QkFBNEI7Z0JBQzVHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssR0FBRywyREFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQjtnQkFDdkcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO29CQUNyQixZQUFZLEVBQUUsVUFBVSxHQUFHLGtFQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUN0RSxXQUFXLEVBQUUsV0FBVztvQkFDeEIsY0FBYyxFQUFFLFFBQVE7b0JBQ3hCLGFBQWEsRUFBRSxvQkFBb0I7b0JBQ25DLFFBQVEsRUFBRSwwREFBUSxDQUFDLElBQUk7aUJBQzFCLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILDhJQUE4STtnQkFDOUksNkpBQTZKO2FBQ2hLO1NBQ0o7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNqS0Q7QUFBQTtBQUFBO0FBQUEsSUFBWSxzQkFHWDtBQUhELFdBQVksc0JBQXNCO0lBQzlCLCtFQUFVO0lBQ1YscUVBQUs7QUFDVCxDQUFDLEVBSFcsc0JBQXNCLEtBQXRCLHNCQUFzQixRQUdqQztBQWdCTSxNQUFNLGlCQUFpQjtJQUkxQixZQUFZLFNBQWlCO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUMsVUFBVSxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRU0sbUJBQW1CLENBQUMsYUFBNEI7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUMxQztZQUNJLGFBQWEsRUFBRSxhQUFhLENBQUMsYUFBYTtZQUMxQyxjQUFjLEVBQUUsYUFBYSxDQUFDLGNBQWM7WUFDNUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1NBQ25DLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3ZDRDtBQUFBO0FBQUE7QUFBQSxJQUFZLGNBS1g7QUFMRCxXQUFZLGNBQWM7SUFDdEIscUVBQWE7SUFDYixtRUFBWTtJQUNaLDJEQUFRO0lBQ1IscURBQUs7QUFDVCxDQUFDLEVBTFcsY0FBYyxLQUFkLGNBQWMsUUFLekI7QUFFTSxNQUFNLFNBQVM7SUFRbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFDOUMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFhO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGdFQUFnRTtRQUN2RixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sUUFBUSxDQUFDLElBQVU7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVPLGFBQWEsQ0FBQyxTQUFzQjtRQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsVUFBcUMsRUFBRSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztZQUN6QyxhQUFhO1lBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO1lBQzdFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFELElBQUksQ0FBQyxlQUFlLENBQWMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVPLGVBQWUsQ0FBQyxTQUFzQjtRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQW1CLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7UUFDekMsQ0FBQyxDQUFDLEVBQ0YsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDM0M7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0sSUFBSSxDQUFDLGlCQUF5QixDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSxJQUFJO1FBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTyxrQkFBa0I7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQztJQUN6QyxDQUFDO0lBRU8sYUFBYSxDQUNqQixJQUFpQixFQUNqQixRQUFtRCxFQUNuRCxPQUEyQztRQUUzQyxJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNyRkQ7QUFBQTtBQUFBO0FBQUE7QUFBMEM7QUFDTTtBQUdoRCw4REFBOEQ7QUFDdkQsTUFBTSxNQUFNO0lBa0JmLFlBQVksSUFpQkM7UUFFVCxJQUFJLENBQUMsY0FBYyxHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsOERBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsYUFBYSxHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsOERBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsZUFBZSxHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsOERBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsZUFBZSxHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsOERBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVoRyx5RkFBeUY7UUFDekYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSw4REFBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbkcsSUFBSSxDQUFDLHlCQUF5QixHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSw4REFBYyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDOUgsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSw4REFBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSw4REFBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbEgsSUFBSSxDQUFDLFFBQVEsR0FBRyxnRUFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLDhEQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxnRUFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLDhEQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxnRUFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLDhEQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFDeEUsOERBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxnRUFBa0IsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQ2hGLDhEQUFjLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsZ0VBQWtCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUN0RSw4REFBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFDeEUsOERBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnRUFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsOERBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTSxJQUFJO1FBQ1AsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxZQUFZLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7Y0FDN0MsUUFBUSxHQUFHLElBQUk7Y0FDZixXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUIsUUFBUSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFDeEMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUFJO1FBQ2QsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFCLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtZQUN2QixJQUFJO2dCQUNBLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLE1BQU0sR0FBVyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixPQUFPLE1BQU0sQ0FBQzthQUNqQjtZQUFDLE9BQU0sQ0FBQyxFQUFFLEdBQUU7U0FDaEI7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sdUJBQXVCO1FBQzNCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFtQixFQUFFLEdBQVcsRUFBRSxFQUFFO1lBQzFELE1BQU0sSUFBSSxHQUFHLEdBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFFLEdBQUcsQ0FBQztRQUMxRCxDQUFDLENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxDQUFDO1FBQ2QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBVztRQUNwQyxJQUFJO1lBQ0EsT0FBTyxRQUFRLENBQUMsTUFBTTtpQkFDakIsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNsSUQ7QUFBQTtBQUFBO0FBQUE7QUFBNEM7QUFDTztBQUU1QyxJQUFJLGNBQWMsR0FBRztJQUN4QixlQUFlLEVBQUUsR0FBRztJQUNwQixlQUFlLEVBQUUsaUVBQWUsQ0FBQyxJQUFJO0lBQ3JDLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIseUJBQXlCLEVBQUUsQ0FBQztJQUM1QixrREFBa0Q7SUFDbEQsMERBQTBEO0lBQzFELDBGQUEwRjtJQUMxRixnQkFBZ0IsRUFBRTtRQUNkLElBQUksMERBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9CLElBQUksMERBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbEMsSUFBSSwwREFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUM5QixJQUFJLDBEQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2pDLElBQUksMERBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ2hDLElBQUksMERBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUMvQixJQUFJLDBEQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDNUIsSUFBSSwwREFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO1FBQ2hDLElBQUksMERBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztLQUNqQztJQUNELHFCQUFxQixFQUFFLENBQUM7SUFDeEIsV0FBVyxFQUFFLElBQUksR0FBRyxFQUFFO0lBQ3RCLGNBQWMsRUFBRSxHQUFHO0lBQ25CLGFBQWEsRUFBRSxHQUFHO0lBQ2xCLFFBQVEsRUFBRSxFQUFFO0lBQ1osT0FBTyxFQUFFLEVBQUU7SUFDWCxzQkFBc0IsRUFBRSxJQUFJO0lBQzVCLDBCQUEwQixFQUFFLElBQUk7SUFDaEMscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixzQkFBc0IsRUFBRSxJQUFJO0lBQzVCLGlCQUFpQixFQUFFLElBQUk7Q0FDMUIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2pDRjtBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNiO0FBR3hCLE1BQWUsZUFBZTtJQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxPQUFlLEVBQUUsT0FBZSxFQUFFLFFBQWtCLEVBQzVGLFFBQWdCO1FBQ25DLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDckIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEIsUUFBUSxRQUFRLEVBQUU7WUFDZCxLQUFLLDBEQUFRLENBQUMsTUFBTTtnQkFDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU07WUFDVixLQUFLLDBEQUFRLENBQUMsU0FBUztnQkFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFDVixLQUFLLDBEQUFRLENBQUMsSUFBSTtnQkFDZCxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU07WUFDVixLQUFLLDBEQUFRLENBQUMsU0FBUztnQkFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFDVixLQUFLLDBEQUFRLENBQUMsSUFBSTtnQkFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFDVjtnQkFDSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07U0FDYjtRQUNELENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTSxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxPQUFlLEVBQUUsT0FBZSxFQUFFLFFBQWdCO1FBQ2pILElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDckIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBZSxFQUFFLE1BQWMsRUFBRSxJQUFZO1FBQ3pFLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxJQUFJLFFBQVEsR0FBRyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDdEMsSUFBSSxLQUFLLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUMzQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDMUVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtRDtBQUNVO0FBRTlCO0FBQ3FCO0FBRXBELE1BQU0sV0FBVztJQVNiLFlBQVksT0FBZSxFQUFFLE9BQWUsRUFBRSxRQUFrQixFQUFFLGNBQWtCLEVBQUUsUUFBZ0IsRUFDMUYsV0FBbUIsRUFBRSxTQUFpQjtRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksb0JBQW9CLEdBQUcsNkNBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUM5RixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUN2QixrRUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQ2hHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUM7Q0FDSjtBQUVELE1BQU0sYUFBYTtJQVFmLFlBQVksT0FBZSxFQUFFLE1BQWMsRUFBRSxJQUFZLEVBQUUsVUFBa0IsRUFBRSxRQUFnQixFQUFFLGNBQWtCO1FBQy9HLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSx5QkFBeUIsR0FBRyw2Q0FBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFDbEcsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQzVCLGtFQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7Q0FDSjtBQUVELE1BQU0sUUFBUTtJQVFWLFlBQVksT0FBZSxFQUFFLE9BQWUsRUFBRSxjQUFrQixFQUFFLFFBQWdCLEVBQUUsV0FBbUIsRUFDM0YsU0FBaUI7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLHdCQUF3QixHQUFHLDZDQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDdEcsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQzNCLGtFQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzdHO0lBQ0wsQ0FBQztDQUNKO0FBK0JNLE1BQU0sY0FBYztJQVV2QixZQUFZLFdBQXdCLEVBQUUsYUFBNEIsRUFBRSxjQUFrQixFQUFFLFdBQW1CLENBQUMsRUFDaEcsV0FBbUIsQ0FBQyxFQUFFLFFBQWdCLEdBQUcsRUFBRSxTQUFpQixHQUFHO1FBQ3ZFLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksQ0FBQyxvQkFBNEI7UUFDN0IsSUFBSSxDQUFDLEdBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNoQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTyxzQkFBc0I7UUFDMUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3RCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLFlBQVksQ0FBQyxTQUFpQixFQUFFLFlBQW9CO1FBQ3hELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDM0Y7SUFDTCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsU0FBaUIsRUFBRSxZQUFvQixFQUFFLFdBQW1CLEVBQzVELFNBQWlCLEVBQUUsV0FBbUI7UUFDM0QsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2hHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDaEU7SUFDTCxDQUFDO0lBRU8sUUFBUSxDQUFDLElBQVUsRUFBRSxXQUFtQixFQUFFLFNBQWlCLEVBQUUsV0FBbUI7UUFDcEYsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLDJEQUFTLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM3RCxJQUFJLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxSDtJQUNMLENBQUM7SUFFTyxZQUFZLENBQUMsV0FBbUI7UUFDcEMsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUYsT0FBTyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztJQUM5RixDQUFDO0lBRU8sZUFBZSxDQUFDLFdBQW1CO1FBQ3ZDLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVGLE9BQU8sV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsQ0FBQztJQUNwRyxDQUFDO0lBRU0sY0FBYyxDQUFDLFdBQW1CLEVBQUUsU0FBaUI7UUFDeEQsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVGLE9BQU8sQ0FBQyxDQUFDLEdBQUcsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLEdBQUcsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUM1RyxDQUFDO0lBRUQsK0RBQStEO0lBQ3hELGNBQWMsQ0FBQyxpQkFBeUIsRUFBRSxvQkFBNEI7UUFDekUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztRQUN2RyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9GLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLGlFQUFlLENBQUMsRUFBRSxFQUFFO1lBQy9ELE9BQU8sZUFBZSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3hEO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDcEY7SUFDTCxDQUFDO0lBRU8sZUFBZTtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVPLGdCQUFnQjtRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFNBQWlCLEVBQUUsWUFBb0I7UUFDN0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDN0QsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxTQUFpQixFQUFFLFlBQW9CLEVBQUUsS0FBYSxFQUFFLFdBQW1CLEVBQzNFLFNBQWlCLEVBQUUsV0FBbUI7UUFDakUsSUFBSSxTQUFTLEdBQVcsRUFBRSxDQUFDO1FBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksV0FBVyxHQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEdBQUcsU0FBUyxFQUFFO2dCQUN2QyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssMERBQVEsQ0FBQyxTQUFTLElBQUksV0FBVyxDQUFDLElBQUksS0FBSywwREFBUSxDQUFDLFNBQVMsRUFBRTtvQkFDcEYsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDL0I7cUJBQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLDBEQUFRLENBQUMsSUFBSSxFQUFFO29CQUMzQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ25CO2FBQ0o7aUJBQU0sSUFBSSxXQUFXLENBQUMsYUFBYSxHQUFHLFlBQVksRUFBRTtnQkFDakQsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLDBEQUFRLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssMERBQVEsQ0FBQyxTQUFTLEVBQUU7b0JBQ3BGLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQy9CO3FCQUFNLElBQUksV0FBVyxDQUFDLElBQUksS0FBSywwREFBUSxDQUFDLElBQUksRUFBRTtvQkFDM0MsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNoQyxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUM7b0JBQzFCLElBQUksU0FBUyxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksU0FBUyxFQUFFO3dCQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSwyREFBUyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLDJEQUFTLENBQUMsSUFBSSxDQUFDOzRCQUMzRSxPQUFPLENBQUMsS0FBSyxJQUFJLDJEQUFTLENBQUMsT0FBTyxFQUFFOzRCQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQzt5QkFDL0U7cUJBQ0o7aUJBQ0o7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUN2QixNQUFNO2lCQUNUO2dCQUNELElBQUksV0FBVyxDQUFDLElBQUksS0FBSywwREFBUSxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLDBEQUFRLENBQUMsU0FBUyxFQUFFO29CQUNwRixTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUMvQjtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssMERBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQzNDLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDaEMsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDO29CQUMxQixJQUFJLFNBQVMsSUFBSSxTQUFTLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRTt3QkFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksMkRBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLEtBQUssSUFBSSwyREFBUyxDQUFDLElBQUksQ0FBQzs0QkFDM0UsT0FBTyxDQUFDLEtBQUssSUFBSSwyREFBUyxDQUFDLE9BQU8sRUFBRTs0QkFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7eUJBQy9FO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFTyxhQUFhLENBQUMsU0FBZSxFQUFFLE9BQWEsRUFBRSxXQUFtQixFQUFFLFNBQWlCLEVBQUUsV0FBbUI7UUFDN0csSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV2RSxJQUFJLFVBQVUsQ0FBQztRQUNmLElBQUksU0FBUyxDQUFDLEtBQUssSUFBSSwyREFBUyxDQUFDLElBQUksRUFBRTtZQUNuQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDL0Y7YUFBTTtZQUNILFVBQVUsR0FBRyxVQUFVLENBQUM7U0FDM0I7UUFDRCxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVGLElBQUksUUFBUSxHQUFHLFFBQVE7UUFDdkIsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RixJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2RyxDQUFDO0lBRU8saUJBQWlCLENBQUMsS0FBYSxFQUFFLFVBQWtCLEVBQUUsVUFBa0I7UUFDM0UsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFO1lBQ3BCLE9BQU8sVUFBVSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFO1lBQ3BCLE9BQU8sVUFBVSxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQy9DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQ3JILElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMzRjtJQUNMLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ2pURDtBQUFBO0FBQUE7O0dBRUc7QUFDSSxNQUFlLFVBQVU7SUFHNUIsMkNBQTJDO0lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBNEIsRUFBRSxRQUFnQjtRQUMvRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdCLE9BQU87Z0JBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDcEMsYUFBYSxFQUFFLElBQUk7YUFDdEIsQ0FBQztTQUNMO2FBQU07WUFDSCxJQUFJLE9BQU8sR0FBRyxVQUFVLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckMsT0FBTztnQkFDSCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsYUFBYSxFQUFFLEtBQUs7YUFDdkIsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxhQUFhO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN0QyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxrRUFBa0U7SUFDM0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQVU7UUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQztTQUNmO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRCw2REFBNkQ7SUFDdEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFVO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7QUF4Q2MsbUJBQVEsR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ0RqRTtBQUFBO0FBQUE7QUFBNEM7QUFFckMsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFLLEVBQUUsY0FBd0IsRUFDL0IsaUJBQW9DLEVBQ3BDLE9BQWUsRUFBRSxPQUFlLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixFQUNwRSxTQUFpQixFQUFFLFdBQXdCLEVBQUUsZUFBZ0MsRUFDN0Usb0JBQTZCO0lBQzFELElBQUksWUFBWSxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hFLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDcEIsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLE1BQU0sR0FBRyxTQUFTLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUMvRixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDMUQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLG9EQUFvRDtJQUVuRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QyxJQUFJLGFBQWEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDaEcsSUFBSSxhQUFhLEdBQUcsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1FBRW5ELElBQUksb0JBQW9CLElBQUksQ0FBQyxLQUFLLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pELHFCQUFxQixDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsRUFBRSxhQUFhLEVBQ2xGLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDeEg7YUFBTTtZQUNILGVBQWUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEVBQUUsYUFBYSxFQUM1RSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ3hIO0tBQ0o7QUFDTCxDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxhQUFxQixFQUFFLGlCQUFvQyxFQUMzRCxlQUFnQztJQUMxRCxPQUFPLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLEVBQUUsQ0FDOUQsR0FBRyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FDNUMsa0VBQW9CLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pILENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxDQUFLLEVBQUUsU0FBbUIsRUFBRSxRQUFnQjtJQUNqRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JCLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUQsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDUixPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsQ0FBSyxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxNQUFjLEVBQ2hGLFFBQWdCLEVBQUUsZ0JBQXdCLEVBQUUsUUFBZ0IsRUFBRSxTQUFpQixFQUMvRSxhQUFxQjtJQUNqRCxJQUFJLHlCQUF5QixHQUFHLENBQUMsQ0FBQztJQUNsQyxJQUFJLFVBQVUsR0FBRyxnQkFBZ0IsR0FBRyx5QkFBeUIsR0FBRyxRQUFRLENBQUM7SUFDekUsSUFBSSxlQUFlLEdBQUcsT0FBTyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7SUFDbEUscUJBQXFCLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXJFLElBQUksU0FBUyxHQUFHLE9BQU8sR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLElBQUksUUFBUSxHQUFHLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDcEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLHNCQUFzQixDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDakgsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQUMsQ0FBSyxFQUFFLFVBQWtCLEVBQUUsT0FBZSxFQUFFLElBQVksRUFBRSxRQUFnQjtJQUNyRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQUMsQ0FBSyxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFDL0QsYUFBcUIsRUFBRSxRQUFnQixFQUFFLFVBQWtCLEVBQUUsUUFBZ0I7SUFDaEgsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsQixrQ0FBa0M7SUFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUcsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTVGLDhCQUE4QjtJQUM5QixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXhDLHlDQUF5QztJQUN6QyxJQUFJLFNBQVMsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDWixDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxDQUFLLEVBQUUsT0FBZSxFQUFFLE9BQWUsRUFBRSxNQUFjLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFDN0YsUUFBZ0IsRUFBRSxnQkFBd0IsRUFBRSxRQUFnQixFQUFFLFNBQWlCLEVBQy9FLGFBQXFCO0lBQzFDLElBQUkseUJBQXlCLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQUksVUFBVSxHQUFHLGdCQUFnQixHQUFHLHlCQUF5QixHQUFHLFFBQVEsQ0FBQztJQUN6RSxJQUFJLGVBQWUsR0FBRyxPQUFPLEdBQUcsVUFBVSxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztJQUNsRSxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFckUsMkRBQTJEO0lBQzNELElBQUksU0FBUyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDekMsSUFBSSxRQUFRLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUNwQyxJQUFJLFVBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFHLFFBQVEsR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNaLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNwSEQ7QUFBQTtBQUFBO0FBQStCO0FBSXhCLE1BQU0sUUFBUTtJQVFqQixZQUFZLE1BQWMsRUFBRSxTQUFpQixFQUFFLGNBQThCO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBRXJDLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUVNLElBQUksQ0FBQyxvQkFBNEI7UUFDcEMsS0FBSyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLEVBQUU7WUFDbkUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0JBQzVELElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztnQkFDMUMsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztnQkFDN0YsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN6RTtTQUNKO0lBQ0wsQ0FBQztJQUVPLFFBQVEsQ0FBQyxDQUFLLEVBQUUsT0FBZSxFQUFFLE9BQWUsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLEtBQWU7UUFDcEcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVPLFlBQVksQ0FBQyxvQkFBNEI7UUFDN0MsSUFBSSxhQUFhLEdBQUcsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1FBQ3hFLElBQUksY0FBYyxHQUFHLGFBQWEsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDbEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLFdBQVcsQ0FBQyxvQkFBNEI7UUFDNUMsSUFBSSxhQUFhLEdBQUcsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1FBQ3hFLElBQUksY0FBYyxHQUFHLGFBQWEsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDbEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsS0FBYTtRQUM1RCxJQUFJLEtBQUssR0FBRyxHQUFHLEVBQUU7WUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0wsQ0FBQztJQUVPLElBQUksQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsS0FBYTtRQUMxRCxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDWixPQUFPLFFBQVEsQ0FBQztTQUNuQjthQUFNLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sUUFBUSxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNuRDthQUFNO1lBQ0gsT0FBTyxRQUFRLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRU0sU0FBUyxDQUFDLFdBQW1CLEVBQUUsb0JBQTRCO1FBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsb0JBQW9CLENBQUM7SUFDNUQsQ0FBQztJQUVNLFdBQVcsQ0FBQyxXQUFtQjtRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFDN0QsQ0FBQzs7QUExRWMscUJBQVksR0FBVyxDQUFDLENBQUMsQ0FBQztBQUMxQiw0QkFBbUIsR0FBVyxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNYckQ7QUFBQTtBQUFBO2dEQUNnRDtBQUN6QyxNQUFNLFdBQVc7SUFLcEIsWUFBWSxTQUFpQixFQUFFLFdBQXlFLEVBQzVGLGFBQTJFO1FBQ25GLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRU0sV0FBVyxDQUFDLFdBQW1CO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sU0FBUyxDQUFDLFdBQW1CLEVBQUUsb0JBQTRCO1FBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLFdBQVcsQ0FBQyxXQUFtQixFQUFFLG9CQUE0QjtRQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQzlCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlEO0FBRWxCO0FBQ29CO0FBSTVDLE1BQU0sYUFBYTtJQVV0QixZQUFZLE1BQWMsRUFBRSxTQUFpQixFQUFFLGNBQThCO1FBQ3pFLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGVBQWUsS0FBSyxpRUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRixJQUFJLE9BQU8sR0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLCtEQUFjLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDcEc7UUFFRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEU7SUFDTCxDQUFDO0lBRU0sSUFBSSxDQUFDLG9CQUE0QjtRQUNwQyxLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxXQUFtQixFQUFFLG9CQUE0QjtRQUN6RSxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxDQUFDLEtBQUssYUFBYSxDQUFDLFlBQVksRUFBRTtZQUM3RSxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLENBQUMsR0FBRyxhQUFhLENBQUMsdUJBQXVCLEdBQUcsb0JBQW9CLEVBQUU7Z0JBQ2hILElBQUksWUFBWSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLENBQUMsR0FBRyxhQUFhLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3hHLElBQUksb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7Z0JBQ2hELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztnQkFDcEcsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3RFLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsc0JBQXNCLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQ25HLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLENBQUMsR0FBRyxZQUFZLENBQUM7YUFDL0Q7U0FDSjtJQUNMLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxDQUFLLEVBQUUsV0FBbUIsRUFBRSxTQUFpQixFQUFFLG1CQUEyQjtRQUNqRyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUMzRixPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxTQUFTLENBQUMsV0FBbUIsRUFBRSxvQkFBNEI7UUFDOUQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxHQUFHLG9CQUFvQixDQUFDO0lBQ3hFLENBQUM7SUFFTSxXQUFXLENBQUMsV0FBbUI7UUFDbEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7SUFDOUUsQ0FBQzs7QUF6RGMsd0NBQTBCLEdBQVcsR0FBRyxDQUFDO0FBQ3pDLDBCQUFZLEdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDMUIscUNBQXVCLEdBQVcsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDZDFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0M7QUFHRztBQUNjO0FBRTFDLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztBQUM5QixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksaURBQU8sRUFBRSxDQUFDO0FBQy9CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsOENBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QixNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUM1QixNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksK0RBQWMsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDVDdDO0FBQUE7QUFBQTtBQUFBO0FBQXlEO0FBQzFCO0FBUXhCLE1BQU0sZ0JBQWdCO0lBSXpCLFlBQVksaUJBQXlCO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxRQUFRLENBQUMsQ0FBSztRQUNqQixJQUFJLFVBQVUsR0FBZTtZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtZQUN0QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87WUFDbEIsTUFBTSxFQUFFLDBEQUFZLENBQUMsQ0FBQyxDQUFDO1NBQzFCLENBQUM7UUFDRixpRUFBbUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNyRCw2Q0FBTSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDOUJEO0FBQUE7QUFBTyxNQUFNLG9CQUFvQjtJQUc3QixZQUFZLENBQUs7UUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFFaEMsQ0FBQyxDQUFDLFVBQVUsR0FBRztZQUNYLHdHQUF3RztZQUN4RyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDN0IsSUFBSSxhQUFhLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtvQkFDM0MsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUM5QixxQ0FBcUM7b0JBQ3JDLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO2lCQUFNO2dCQUNILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakQsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUN2QixJQUFJLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO3dCQUNyQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3hCLHFDQUFxQzt3QkFDckMsT0FBTyxLQUFLLENBQUM7cUJBQ2hCO2lCQUNKO2FBQ0o7UUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWIsQ0FBQyxDQUFDLFdBQVcsR0FBRztZQUNaLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLElBQUksT0FBTyxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7b0JBQ25DLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDdEIscUNBQXFDO29CQUNyQyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7YUFDSjtRQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFlLEVBQUUsYUFBeUIsRUFBRSxjQUEwQixTQUFTO1FBQzNGLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUFlO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDOUNEO0FBQUE7QUFBQTtBQUFBO0FBQXVDO0FBQ3NCO0FBSXRELE1BQU0sV0FBVztJQVFwQixZQUFZLE1BQWMsRUFBRSxXQUF3QixFQUFFLGlCQUFvQyxFQUM5RSxXQUF3QixFQUFFLG1CQUEyRDtRQUM3RixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFtQjtRQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUNwRCxPQUFPLENBQUMsd0VBQXdFO1NBQ25GO1FBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQy9DLEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxTQUFTLEVBQUUsV0FBVyxFQUFFLEVBQUU7WUFDOUQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMvRDtJQUNMLENBQUM7SUFFTyw0QkFBNEIsQ0FBQyxXQUFtQixFQUFFLFdBQW1CO1FBQ3pFLElBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RFLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sSUFBSSxFQUFFO1lBQ1QsSUFBSSxzQkFBc0IsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUN4QyxNQUFNO2FBQ1Q7WUFDRCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNoRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2pDLHNCQUFzQixFQUFFLENBQUM7Z0JBQ3pCLFNBQVM7YUFDWjtZQUNELElBQUksSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDeEUsc0JBQXNCLEVBQUUsQ0FBQzthQUM1QjtpQkFBTTtnQkFDSCxNQUFNO2FBQ1Q7U0FDSjtRQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxzQkFBc0IsQ0FBQztJQUN0RSxDQUFDO0lBRUQsaUVBQWlFO0lBQ3pELGFBQWEsQ0FBQyxJQUFVO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSywyREFBUyxDQUFDLE9BQU8sQ0FBQztJQUM1QyxDQUFDO0lBRU8seUJBQXlCLENBQUMsSUFBVSxFQUFFLFdBQW1CO1FBQzdELElBQUksWUFBWSxHQUFHLDZEQUFlLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssMkRBQVMsQ0FBQyxPQUFPLENBQUM7SUFDakYsQ0FBQztJQUVPLGdCQUFnQixDQUFDLFdBQW1CLEVBQUUsaUJBQXlCLEVBQUUsb0JBQTRCO1FBQ2pHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUNyQixZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ2xELFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGNBQWMsRUFBRSxDQUFDLFFBQVE7WUFDekIsYUFBYSxFQUFFLG9CQUFvQjtZQUNuQyxRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUk7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLEtBQUssR0FBRywyREFBUyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssMERBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLEVBQUMsNkNBQTZDO2FBQ2hIO1NBQ0o7YUFBTSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssMERBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDL0MsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLDBEQUFRLENBQUMsSUFBSSxFQUFFO29CQUNqQyxRQUFRLENBQUMsS0FBSyxHQUFHLDJEQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsdUNBQXVDO2lCQUM3RTthQUNKO1NBQ0o7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUM5RkQ7QUFBQTtBQUFBO0FBQWtEO0FBRTNDLE1BQU0sV0FBVztJQUdwQixZQUFZLE1BQWdCO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTywwQkFBMEI7UUFDOUIsSUFBSSxrQkFBa0IsR0FBZSxDQUFDLDBEQUFRLENBQUMsSUFBSSxFQUFFLDBEQUFRLENBQUMsU0FBUyxFQUFFLDBEQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUYsS0FBSyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFO1lBQ3ZFLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsS0FBSyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUU7Z0JBQzlELElBQUksSUFBSSxHQUFTLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3pDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM1QixVQUFVLEVBQUUsQ0FBQyxDQUFDLHNFQUFzRTtpQkFDdkY7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELG1CQUFtQixDQUFDLFNBQWlCLEVBQUUsWUFBb0IsRUFBRSxXQUFtQjtRQUM1RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0UsSUFBSSxlQUFlLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sRUFBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGlDQUFpQztTQUN2RjtRQUNELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlGLElBQUksY0FBYyxHQUFHLENBQUMsRUFBRTtZQUNwQixjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLDRDQUE0QztTQUM5RTtRQUNELElBQUksZUFBZSxLQUFLLENBQUMsRUFBRTtZQUN2QixJQUFJLGNBQWMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU8sRUFBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLDBCQUEwQjthQUNoRjtpQkFBTTtnQkFDSCxPQUFPLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDLDBCQUEwQjthQUMzRjtTQUNKO1FBQ0QsT0FBTyxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELG9GQUFvRjtJQUNwRiw2QkFBNkIsQ0FBQyxPQUFlLEVBQUUsS0FBYSxFQUFFLFdBQVcsR0FBRyxDQUFDO1FBQ3pFLEtBQUssSUFBSSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxPQUFPLEVBQUU7Z0JBQ2xDLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksWUFBa0IsQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksaUJBQWlCLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxZQUFZLElBQUksU0FBUyxFQUFFO29CQUMzQixZQUFZLEdBQUcsaUJBQWlCLENBQUM7aUJBQ3BDO3FCQUFNLElBQUksWUFBWSxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUU7b0JBQ3JFLFlBQVksR0FBRyxpQkFBaUIsQ0FBQztpQkFDcEM7YUFDSjtTQUNKO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLFVBQWdCLENBQUM7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLGVBQWUsR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUU7b0JBQ3pCLFVBQVUsR0FBRyxlQUFlLENBQUM7aUJBQ2hDO3FCQUFNLElBQUksVUFBVSxDQUFDLGFBQWEsR0FBRyxlQUFlLENBQUMsYUFBYSxFQUFFO29CQUNqRSxVQUFVLEdBQUcsZUFBZSxDQUFDO2lCQUNoQzthQUNKO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN2RkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNhO0FBQ087QUFFNUMsTUFBTSxRQUFRO0lBYWpCLFlBQVksSUFBYyxFQUFFLFNBQW1CLEVBQUUsSUFBYyxFQUFFLFFBQWtCO1FBTDNFLG1CQUFjLEdBQTBCLElBQUksR0FBRyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUdDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRCxrRUFBa0U7SUFDM0QsUUFBUSxDQUFDLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxPQUFlLEVBQUUsT0FBZSxFQUFFLFFBQWtCLEVBQzVGLFFBQWdCO1FBQzVCLFFBQVEsUUFBUSxFQUFFO1lBQ2QsS0FBSywwREFBUSxDQUFDLE1BQU0sQ0FBQztZQUNyQixLQUFLLDBEQUFRLENBQUMsU0FBUztnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNyRixNQUFNO1lBQ1YsS0FBSywwREFBUSxDQUFDLElBQUk7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDeEQsTUFBTTtZQUNWO2dCQUNJLE9BQU8sS0FBSyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGtFQUFrRTtJQUMzRCxZQUFZLENBQUMsV0FBbUIsRUFBRSxTQUFpQixFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDMUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxrRUFBa0U7SUFDMUQsaUJBQWlCLENBQUMsT0FBZSxFQUFFLFVBQWtCLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQixFQUFFLFFBQWdCO1FBQ2pILElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxJQUFJLFFBQVEsR0FBRyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDdEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDM0MsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksWUFBWSxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcsWUFBWSxDQUFDO1FBQzVELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFM0QsSUFBSSxvQkFBb0IsR0FBRyxZQUFZLEdBQUcsQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDdEUsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUV2RSxJQUFJLHNCQUFzQixHQUFHLENBQUMsZUFBZSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsWUFBWSxDQUFDO1FBQ3JGLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDN0IsQ0FBQyxlQUFlLEdBQUcsc0JBQXNCLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUV0RixnR0FBZ0c7UUFDaEcsSUFBSSx1QkFBK0IsQ0FBQztRQUNwQyxJQUFJLG9CQUE0QixDQUFDO1FBQ2pDLElBQUksNkNBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxLQUFLLGlFQUFlLENBQUMsRUFBRSxFQUFFO1lBQ3RELHVCQUF1QixHQUFHLG9CQUFvQixDQUFDO1lBQy9DLG9CQUFvQixHQUFHLHNCQUFzQixDQUFDO1NBQ2pEO2FBQU07WUFDSCx1QkFBdUIsR0FBRyxzQkFBc0IsQ0FBQztZQUNqRCxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztTQUMvQztRQUNELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksVUFBVSxHQUFHLDZDQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxpRUFBZSxDQUFDLEVBQUUsQ0FBQztRQUN0RSxJQUFJLGlCQUFpQixHQUFHLDZDQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxpRUFBZSxDQUFDLEVBQUUsQ0FBQztRQUM3RSxJQUFJLG9CQUFvQixLQUFLLGVBQWUsRUFBRTtZQUMxQyxpQkFBaUIsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1NBQzFDO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFDeEYsb0JBQW9CLEdBQUcsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQ3RGLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFDdkYsV0FBVyxFQUFFLFlBQVksRUFBRSx1QkFBdUIsR0FBRyxZQUFZLEVBQUUsaUJBQWlCLEVBQ3BGLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVuQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sUUFBUSxDQUFDLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxPQUFlLEVBQUUsT0FBZTtRQUNwRixJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxRQUFRLEdBQUcsNkNBQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksNkNBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxLQUFLLGlFQUFlLENBQUMsRUFBRSxFQUFFO1lBQ3RELENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNYO2FBQU07WUFDSCxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLFFBQVEsR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5RjtJQUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxRQUFnQixFQUFFLFFBQWdCO1FBQ3ZELElBQUksTUFBYyxDQUFDO1FBQ25CLElBQUksNkNBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxLQUFLLGlFQUFlLENBQUMsRUFBRSxFQUFFO1lBQ3RELE1BQU0sR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQ2hDO2FBQU07WUFDSCxNQUFNLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUNoQztRQUVELDJGQUEyRjtRQUMzRixNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0IsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLGlCQUFpQixDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsV0FBbUIsRUFBRSxZQUFvQixFQUMxRSxRQUFnQixFQUFFLFVBQW1CLEVBQUUsQ0FBSztRQUNsRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLElBQUksT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQjtZQUNELENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM1RixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDWDtJQUNMLENBQUM7SUFFTyxlQUFlLENBQUMsT0FBZSxFQUFFLFFBQWdCLEVBQUUsV0FBbUIsRUFBRSxZQUFvQixFQUM1RSxXQUFtQixFQUFFLFlBQW9CLEVBQUUsYUFBcUIsRUFBRSxpQkFBMEIsRUFDN0YsVUFBbUIsRUFBRSxDQUFLO1FBQzdDLElBQUksYUFBYSxJQUFJLENBQUMsRUFBRTtZQUNwQixPQUFPO1NBQ1Y7UUFFRCxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVCxJQUFJLGlCQUFpQixHQUFHLGFBQWEsR0FBRyxZQUFZLENBQUM7UUFDckQsSUFBSSxPQUFPLEdBQUcsUUFBUSxHQUFHLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QixJQUFJLFVBQVUsRUFBRTtZQUNaLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakI7UUFDRCxJQUFJLGlCQUFpQixFQUFFLEVBQUUsb0NBQW9DO1lBQ3pELENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUM3RSxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsWUFBWSxHQUFHLGFBQWEsR0FBRyxZQUFZLEVBQ2pFLFdBQVcsRUFBRSxhQUFhLEdBQUcsWUFBWSxDQUFDLENBQUM7U0FDbEQ7YUFBTSxFQUFFLGlDQUFpQztZQUN0QyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFDN0UsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsYUFBYSxHQUFHLFlBQVksQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVPLGdCQUFnQixDQUFDLEtBQWUsRUFBRSxXQUFtQixFQUFFLFNBQWlCLEVBQUUsT0FBZSxFQUFFLE9BQWUsRUFDekYsUUFBZ0I7UUFDckMsSUFBSSxDQUFDLEdBQU8sNkNBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU8sTUFBTSxDQUFDLENBQUssRUFBRSxXQUFtQixFQUFFLFNBQWlCO1FBQ3hELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFFTyxnQ0FBZ0MsQ0FBQyxXQUFtQixFQUFFLFNBQWlCO1FBQzNFLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ25CLElBQUksZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLFFBQVEsSUFBSSxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7U0FDOUM7YUFBTTtZQUNILFFBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO1NBQ3BFO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDbE1EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNNO0FBQ0k7QUFFdkQsTUFBTSxJQUFJO0lBV047SUFDQSxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFZO1FBQzVCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyRCxDQUFDO0NBQ0o7QUFFRCxJQUFZLG1CQU9YO0FBUEQsV0FBWSxtQkFBbUI7SUFDM0IsMkVBQVc7SUFDWCxxRkFBZ0I7SUFDaEIsaUZBQWM7SUFDZCxpRkFBYztJQUNkLDZFQUFZO0lBQ1oseUVBQVU7QUFDZCxDQUFDLEVBUFcsbUJBQW1CLEtBQW5CLG1CQUFtQixRQU85QjtBQUVNLE1BQU0sY0FBYztJQVd2QjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxRQUFnQjtRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVPLHlCQUF5QixDQUFDLEtBQW9CO1FBQ2xELElBQUk7WUFDQSxJQUFJLGdCQUFnQixHQUE4QixLQUFLLENBQUMsTUFBTyxDQUFDLFdBQVcsQ0FBQztZQUM1RSxJQUFJLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsY0FBYyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUFDLEtBQW9CO1FBQ3JDLElBQUk7WUFDQSxJQUFJLFlBQVksR0FBNEIsS0FBSyxDQUFDLE1BQU8sQ0FBQyxRQUFRLENBQUM7WUFDbkUsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUU3Qiw2REFBNkQ7WUFDN0QsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFL0MsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7WUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTyxhQUFhLENBQUMsV0FBcUI7UUFDdkMsSUFBSTtZQUNBLElBQUksS0FBSyxHQUFtQixXQUFXLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksT0FBTyxHQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtpQkFDWjtnQkFDRCxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7aUJBQ1o7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEM7WUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7YUFDbkQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkI7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7WUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTSxlQUFlLENBQUMsU0FBaUIsRUFBRSxRQUFrQixFQUFFLFNBQW9CO1FBQzlFLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDO1FBQzlDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDN0MsUUFBUSxDQUFDLEtBQUssR0FBRyx1REFBYSxDQUFDLFVBQVUsQ0FBQztRQUMxQyxTQUFTLENBQUMsS0FBSyxHQUFHLDBEQUFjLENBQUMsYUFBYSxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBb0IsRUFBRSxFQUFFO1lBQ3hDLElBQUk7Z0JBQ0EsbUVBQVEsQ0FBa0IsS0FBSyxDQUFDLE1BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQzFFO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVPLEdBQUcsQ0FBQyxHQUFXLEVBQUUsTUFBc0MsRUFBRSxZQUFxQjtRQUNsRixJQUFJLGNBQWMsR0FBVyxzQ0FBc0MsQ0FBQztRQUNwRSxJQUFJLE9BQU8sR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNuRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGNBQWMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQzVCLGFBQWE7WUFDYixPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztTQUN2QztRQUNELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0sT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRU8sT0FBTyxDQUFDLFVBQWtCLEVBQUUsUUFBaUI7UUFDakQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ3hCLFFBQVEsR0FBRyxjQUFjLENBQUMsaUJBQWlCLENBQUM7U0FDL0M7YUFBTSxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDckIsUUFBUSxHQUFHLENBQUMsQ0FBQztTQUNoQjthQUFNLElBQUksUUFBUSxHQUFHLEdBQUcsRUFBRTtZQUN2QixRQUFRLEdBQUcsR0FBRyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDaEUsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUNyQyxJQUFJLFFBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QztTQUNKO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVPLGdCQUFnQixDQUFDLFFBQWdCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLFlBQVk7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7QUEzSWMsZ0NBQWlCLEdBQVcsRUFBRSxDQUFDO0FBOElsRCxTQUFTLG9CQUFvQixDQUFDLEdBQXVCLEVBQUUsR0FBVztJQUM5RCxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDdEQsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ25NRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF5QjtBQUNxQztBQUNiO0FBQ047QUFDWjtBQUNhO0FBQ1A7QUFFckMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUVWLE1BQU0sT0FBTztJQUdoQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSwrQkFBRSxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxRQUFxQixDQUFDO1lBRTFCLFNBQVMsWUFBWTtnQkFDakIsb0VBQW9FO1lBQ3hFLENBQUM7WUFFRCxDQUFDLENBQUMsT0FBTyxHQUFHO2dCQUNSLDZDQUFNLENBQUMsUUFBUSxHQUFHLElBQUksbURBQVEsQ0FDMUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxFQUMxQyxDQUFDLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLEVBQ2xELENBQUMsQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUMsRUFDeEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUM5QyxDQUFDO2dCQUNGLDZDQUFNLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2dCQUN2Riw2Q0FBTSxDQUFDLGlCQUFpQixHQUFHLDZDQUFNLENBQUMsc0JBQXNCLENBQUM7WUFDN0QsQ0FBQztZQUVELENBQUMsQ0FBQyxLQUFLLEdBQUc7Z0JBQ04sUUFBUSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RDLDZDQUFNLENBQUMsb0JBQW9CLEdBQUcsSUFBSSw0RUFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsNkNBQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSwrREFBYyxDQUFDLGtFQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLDZDQUFNLENBQUMsTUFBTSxFQUFFLDZDQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25HLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsNERBQTREO2dCQUNoRyxZQUFZLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUM7WUFFRixDQUFDLENBQUMsSUFBSSxHQUFHO2dCQUNMLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDVix5REFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQztZQUVGLENBQUMsQ0FBQyxhQUFhLEdBQUc7Z0JBQ2QsWUFBWSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNwREQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDcUI7QUFDWjtBQUNOO0FBQ007QUFDQztBQUNlO0FBRXhELElBQVksS0FNWDtBQU5ELFdBQVksS0FBSztJQUNiLHFEQUFjO0lBQ2QsdUNBQU87SUFDUCxpQ0FBSTtJQUNKLHVDQUFPO0lBQ1AseURBQWdCO0FBQ3BCLENBQUMsRUFOVyxLQUFLLEtBQUwsS0FBSyxRQU1oQjtBQUVNLE1BQWUsV0FBVztJQUl0QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQVc7UUFDcEMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsdURBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU07UUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUFJO1FBQ2QsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RCLEtBQUssS0FBSyxDQUFDLGNBQWM7Z0JBQ3JCLGtFQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLE1BQU07WUFDVixLQUFLLEtBQUssQ0FBQyxPQUFPO2dCQUNkLHNEQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2YsTUFBTTtZQUNWLEtBQUssS0FBSyxDQUFDLElBQUk7Z0JBQ1gsZ0RBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDWixNQUFNO1lBQ1YsS0FBSyxLQUFLLENBQUMsT0FBTztnQkFDZCxzREFBTyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNmLE1BQU07WUFDVixLQUFLLEtBQUssQ0FBQyxnQkFBZ0I7Z0JBQ3ZCLHNFQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLE1BQU07WUFDVjtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixHQUFHLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDOztBQW5DYyx1QkFBVyxHQUFVLEtBQUssQ0FBQyxjQUFjLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNoQjdEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0Q7QUFDRztBQVNuQztBQUNZO0FBQ29GO0FBQ3ZFO0FBQ0s7QUFDUjtBQUNUO0FBRTFCLE1BQWUsT0FBTztJQUdsQixNQUFNLENBQUMsSUFBSTtRQUNkLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxDQUFDLENBQUMsVUFBVSxDQUFDLDZDQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN2Qyw0REFBVyxFQUFFLENBQUM7UUFFZCxJQUFJLFNBQVMsR0FBRyx1REFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDbkMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFO1lBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDakQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxhQUFhO1FBQ2IsSUFBSSxjQUFjLEdBQTZCLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUUxRSxJQUFJLGlCQUFpQixHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUMzQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFO1lBQ2xDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbkQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXZELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO2dCQUN4Qyw2Q0FBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLDhDQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQy9CLDZDQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxJQUFJLDBCQUEwQixHQUFHLG1FQUFrQixDQUFDLHNCQUFzQixFQUFFLDRCQUE0QixFQUNwRyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0UsK0JBQStCLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO1lBQzdELElBQUksS0FBSyxHQUFvQiwwQkFBMEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEUsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLDZDQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztnQkFDNUMsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLEVBQUU7WUFDM0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDeEU7UUFFRCxJQUFJLGdCQUFnQixHQUFHLG1FQUFrQixDQUFDLHVCQUF1QixFQUFFLGtCQUFrQixFQUNqRiw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JFLCtCQUErQixDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtZQUNuRCxJQUFJLEtBQUssR0FBb0IsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzlELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMzQixLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUM1Qiw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUN0Qyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRTtZQUNqQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM5RDtRQUVELElBQUkscUJBQXFCLEdBQUcsb0VBQW1CLENBQUMsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQ3ZGLGlFQUFlLEVBQUUsNkNBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRSwrQkFBK0IsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7WUFDeEQsSUFBSSxLQUFLLEdBQVcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksV0FBVyxHQUFHLGlFQUFlLENBQUMsS0FBcUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtnQkFDM0IsNkNBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQztnQkFDNUMsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUU7WUFDdEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLHFCQUFxQixHQUFHLG1FQUFrQixDQUFDLHVCQUF1QixFQUFFLHVCQUF1QixFQUMzRiw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEUsK0JBQStCLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO1lBQ3hELElBQUksS0FBSyxHQUFvQixxQkFBcUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkUsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNmLDZDQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQkFDdkMsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUU7WUFDdEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLDhCQUE4QixHQUFHLG1FQUFrQixDQUFDLHNCQUFzQixFQUFFLGdDQUFnQyxFQUM1RyxDQUFDLDZDQUFNLENBQUMsTUFBTSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RiwrQkFBK0IsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7WUFDakUsSUFBSSxLQUFLLEdBQW9CLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1RSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsNkNBQU0sQ0FBQyxNQUFNLENBQUMseUJBQXlCLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDdkQsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxhQUFhLEVBQUU7WUFDL0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDNUU7UUFFRCxJQUFJLHFCQUFxQixHQUFHLHNFQUFxQixDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixFQUMxRixJQUFJLENBQUMsU0FBUyxDQUFDLDZDQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEYsK0JBQStCLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO1lBQ3hELElBQUksS0FBSyxHQUFvQixxQkFBcUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkUsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksbUJBQW1CLEdBQWUseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksbUJBQW1CLEtBQUssSUFBSSxFQUFFO29CQUM5Qiw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQztvQkFDckQsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ3hCO2FBQ0o7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFO1lBQ3RDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsSUFBSSwwQkFBMEIsR0FBRyxvRUFBbUIsQ0FBQyxnQkFBZ0IsRUFBQyw0QkFBNEIsRUFDOUYsOENBQUssRUFBRSwrREFBYyxDQUFDLDZDQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hGLCtCQUErQixDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtZQUM3RCxJQUFJLEtBQUssR0FBVyxNQUFNLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDdkUsSUFBSSxXQUFXLEdBQUcsOENBQUssQ0FBQyxLQUEyQixDQUFDLENBQUM7WUFDckQsSUFBSSxXQUFXLEtBQUssOENBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQzNCLDZDQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztnQkFDNUMsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7aUJBQU0sSUFBSSxXQUFXLEtBQUssOENBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLDZDQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztnQkFDN0MsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUU7WUFDdEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDeEU7UUFFRCxJQUFJLDhCQUE4QixHQUFHLG9FQUFtQixDQUFDLG9CQUFvQixFQUFFLGdDQUFnQyxFQUMzRyw4Q0FBSyxFQUFFLCtEQUFjLENBQUMsNkNBQU0sQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUYsK0JBQStCLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1lBQ2pFLElBQUksS0FBSyxHQUFXLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUMzRSxJQUFJLFdBQVcsR0FBRyw4Q0FBSyxDQUFDLEtBQTJCLENBQUMsQ0FBQztZQUNyRCxJQUFJLFdBQVcsS0FBSyw4Q0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDM0IsNkNBQU0sQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO2dCQUNoRCw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtpQkFBTSxJQUFJLFdBQVcsS0FBSyw4Q0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDakMsNkNBQU0sQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEdBQUcsS0FBSyxDQUFDO2dCQUNqRCw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRTtZQUN0QyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM1RTtRQUVELElBQUkseUJBQXlCLEdBQUcsb0VBQW1CLENBQUMsZUFBZSxFQUFDLDJCQUEyQixFQUMzRiw4Q0FBSyxFQUFFLCtEQUFjLENBQUMsNkNBQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkYsK0JBQStCLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1lBQzVELElBQUksS0FBSyxHQUFXLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLFdBQVcsR0FBRyw4Q0FBSyxDQUFDLEtBQTJCLENBQUMsQ0FBQztZQUNyRCxJQUFJLFdBQVcsS0FBSyw4Q0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDM0IsNkNBQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2dCQUMzQyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtpQkFBTSxJQUFJLFdBQVcsS0FBSyw4Q0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDakMsNkNBQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO2dCQUM1Qyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRTtZQUN0QyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN2RTtRQUVELElBQUksMEJBQTBCLEdBQUcsb0VBQW1CLENBQUMsZ0JBQWdCLEVBQUUsNEJBQTRCLEVBQy9GLDhDQUFLLEVBQUUsK0RBQWMsQ0FBQyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RiwrQkFBK0IsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7WUFDN0QsSUFBSSxLQUFLLEdBQVcsTUFBTSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksV0FBVyxHQUFHLDhDQUFLLENBQUMsS0FBMkIsQ0FBQyxDQUFDO1lBQ3JELElBQUksV0FBVyxLQUFLLDhDQUFLLENBQUMsR0FBRyxFQUFFO2dCQUMzQiw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7Z0JBQzVDLDZDQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO2lCQUFNLElBQUksV0FBVyxLQUFLLDhDQUFLLENBQUMsRUFBRSxFQUFFO2dCQUNqQyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7Z0JBQzdDLDZDQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFO1lBQ3RDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsSUFBSSxxQkFBcUIsR0FBRyxvRUFBbUIsQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLEVBQ2hGLDhDQUFLLEVBQUUsK0RBQWMsQ0FBQyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRiwrQkFBK0IsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7WUFDeEQsSUFBSSxLQUFLLEdBQVcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksV0FBVyxHQUFHLDhDQUFLLENBQUMsS0FBMkIsQ0FBQyxDQUFDO1lBQ3JELElBQUksV0FBVyxLQUFLLDhDQUFLLENBQUMsR0FBRyxFQUFFO2dCQUMzQiw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZDLDZDQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO2lCQUFNLElBQUksV0FBVyxLQUFLLDhDQUFLLENBQUMsRUFBRSxFQUFFO2dCQUNqQyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7Z0JBQ3hDLDZDQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFO1lBQ3RDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsSUFBSSx3QkFBd0IsR0FBRyw4QkFBOEIsRUFBRSxDQUFDO1FBQ2hFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLEVBQUU7WUFDekMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0Q7UUFFRCxJQUFJLDZDQUFNLENBQUMsZ0JBQWdCLElBQUksU0FBUyxFQUFFO1lBQ3RDLDZDQUFNLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxnQkFBZ0IsR0FBRyxtRUFBa0IsQ0FBQyxrQkFBa0IsRUFBRSx1QkFBdUIsRUFDakYsNkNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0QsYUFBYTtRQUNiLCtCQUErQixDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtZQUNuRCxJQUFJLEtBQUssR0FBb0IsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzlELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMzQixLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsRUFBRTtnQkFDckQsdUJBQXVCLENBQUMsNkNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNqRCw2Q0FBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQkFDaEMsNkNBQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSwrREFBYyxDQUFDLGtFQUFvQixDQUFDLEtBQUssQ0FBQyxFQUFFLDZDQUFNLENBQUMsTUFBTSxFQUFFLDZDQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUc7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUU7WUFDakMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDOUQ7UUFFRCxJQUFJLDJCQUEyQixHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNyRCxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNwRCxDQUFDLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsYUFBYSxFQUFFO1lBQzVDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BFLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2RSwyQkFBMkIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFHakUsMkJBQTJCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxvRUFBZ0IsQ0FBQyw2Q0FBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBRXJFLHVFQUF1RTtnQkFDdkUsNkNBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFO29CQUNqRCwwRkFBMEY7b0JBQzFGLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUU7d0JBQ25CLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDaEM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxDQUFDLGtFQUFvQixDQUFDLDZDQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNoRCxtRUFBcUIsQ0FBQyw2Q0FBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDbEQ7UUFDRCxLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsNkNBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsRUFBRTtZQUM1RSxJQUFJLGVBQWUsR0FBRyxzRUFBcUIsQ0FBQyxXQUFXLEVBQUUsNkNBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDekcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwRDtTQUNKO1FBRUQsNkNBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQzs7QUFuUmEscUJBQWEsR0FBVyxTQUFTLENBQUM7QUFzUnBELFNBQVMsOEJBQThCO0lBQ25DLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUMxQyxJQUFJLFNBQVMsR0FBRyx1REFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDbkMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLFNBQVMsQ0FBQyxJQUFJLENBQ1Ysa0ZBQWtGLENBQ3JGLENBQUM7UUFDRixTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxTQUFTLCtCQUErQixDQUFDLFlBQTZELEVBQUUsT0FBbUI7SUFDdkgsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7UUFDN0IsYUFBYTtRQUNiLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDO0FBQ0wsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsU0FBaUI7SUFDOUMsS0FBSyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRTtRQUM5RCx1REFBVSxDQUFDLGlCQUFpQixDQUFDLHNFQUF3QixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBQ2xGO0FBQ0wsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsb0JBQTRCO0lBQzNELElBQUk7UUFDQSxJQUFJLGdCQUFnQixHQUFlLEVBQUU7UUFDckMsSUFBSSxTQUFTLEdBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1Qiw4Q0FBOEM7WUFDOUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksMERBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDaEc7UUFDRCxPQUFPLGdCQUFnQixDQUFDO0tBQzNCO0lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtJQUNkLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNuVkQ7QUFBQTtBQUFBO0FBQWdDO0FBRXpCLE1BQWUsSUFBSTtJQUNmLE1BQU0sQ0FBQyxJQUFJO1FBQ2QsNkNBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCw2Q0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNORDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLb0I7QUFDWTtBQUNvQjtBQUNJO0FBQzJCO0FBRWhDO0FBQ1Q7QUFFMUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLGtEQUFRLEVBQUUsQ0FBQztBQUM1QyxNQUFNLHFCQUFxQixHQUFHLElBQUkscURBQVMsRUFBRSxDQUFDO0FBRXZDLE1BQWUsWUFBWTtJQUl2QixNQUFNLENBQUMsSUFBSTtRQUNkLDREQUFXLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxDQUFDLENBQUMsVUFBVSxDQUFDLDZDQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUU1QyxJQUFJLGFBQWEsR0FBRyxnRUFBZSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUNqRyxnQ0FBZ0MsRUFBRSxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDakYsaUZBQWdDLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLElBQUksY0FBYyxHQUFHLGdFQUFlLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxnQ0FBZ0MsRUFBRSxnQkFBZ0IsRUFDN0cscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUMzRyxpRkFBZ0MsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdEUsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLElBQUksMERBQVksQ0FBQyxvQkFBb0IsRUFBRSxxQkFBcUIsQ0FBQyxFQUFFO1lBQzNELElBQUksU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlELElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLDhCQUE4QjtnQkFDMUQsSUFBSSxVQUFVLEdBQUcsdURBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29CQUNwQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDakIsaUZBQWdDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7b0JBQzNCLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2hELFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTt3QkFDakMsSUFBSSxZQUFZLEdBQVMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRCxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRCxnRUFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUM7d0JBQ2pGLHlEQUFXLENBQUMsY0FBYyxDQUFDLG1EQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7aUJBQU07Z0JBQ0gsdURBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QztTQUNKO2FBQU07WUFDSCx1REFBVSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6RCx1REFBVSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQzs7QUF4Q2EsaUNBQW9CLEdBQVcsZ0JBQWdCLENBQUM7QUFDaEQsMEJBQWEsR0FBVyxXQUFXLENBQUM7QUEwQ3RELFNBQVMsZ0NBQWdDLENBQUMsSUFBYTtJQUNuRCxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELDZDQUFNLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO0lBQ3ZDLHVEQUFVLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxDQUFLLEVBQUUsUUFBZ0I7SUFDM0MsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1QsSUFBSSw2Q0FBTSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtRQUMxQyw2Q0FBTSxDQUFDLG1CQUFtQixHQUFHLHNFQUF3QixDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsRztJQUVELElBQUksY0FBYyxHQUFHLFlBQVk7SUFDakMsSUFBSSxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQztJQUMvQyxJQUFJLHFCQUFxQixHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUMvQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDYixJQUFJLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUM7SUFDOUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRTtRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsNkNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxJQUFJLEdBQUcsNkNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hFLGFBQWE7WUFDYixJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRS9DLG9GQUFvRjtZQUNwRixvRUFBb0U7WUFDcEUsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDekI7UUFFRCwrRkFBK0Y7UUFDL0YsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxTQUFTLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkMscUZBQW9DLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELG1FQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLGtFQUFpQixDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDL0U7SUFDRCxpRkFBZ0MsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1IsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLFNBQXFCO0lBQzFDLE9BQU8sNkNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQsU0FBUyxxQkFBcUI7SUFDMUIsUUFBTyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUU7UUFDL0IsS0FBSyx1REFBYSxDQUFDLFVBQVU7WUFDekIsT0FBTyxnQkFBZ0IsQ0FBQztZQUN4QixNQUFNO1FBQ1YsS0FBSyx1REFBYSxDQUFDLFlBQVksQ0FBQztRQUNoQyxLQUFLLHVEQUFhLENBQUMsZ0JBQWdCLENBQUM7UUFDcEMsS0FBSyx1REFBYSxDQUFDLFlBQVk7WUFDM0IsT0FBTyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLE1BQU07UUFDVjtZQUNJLE9BQU8sT0FBTyxDQUFDO0tBQ3RCO0FBQ0wsQ0FBQztBQUVELFNBQVMsc0JBQXNCO0lBQzNCLFFBQU8scUJBQXFCLENBQUMsS0FBSyxFQUFFO1FBQ2hDLEtBQUssMERBQWMsQ0FBQyxhQUFhO1lBQzdCLE9BQU8sZ0JBQWdCLENBQUM7WUFDeEIsTUFBTTtRQUNWLEtBQUssMERBQWMsQ0FBQyxZQUFZLENBQUM7UUFDakMsS0FBSywwREFBYyxDQUFDLFFBQVE7WUFDeEIsT0FBTyx5QkFBeUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLE1BQU07UUFDVjtZQUNJLE9BQU8sT0FBTyxDQUFDO0tBQ3RCO0FBQ0wsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsWUFBb0IsRUFBRSxTQUFpQjtJQUN0RSxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO1FBQ2xDLE9BQU8sWUFBWSxDQUFDO0tBQ3ZCO0lBQ0QsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLEtBQUs7UUFDTCxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDdEQsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2pKRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0M7QUFDUDtBQVFMO0FBQ3NCO0FBQ1M7QUFDSTtBQUNFO0FBQ3BCO0FBQ0c7QUFFeEMsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLGtEQUFRLEVBQUUsQ0FBQztBQUM5QyxNQUFNLHVCQUF1QixHQUFHLElBQUkscURBQVMsRUFBRSxDQUFDO0FBRWhELDBFQUEwRTtBQUMxRSxJQUFJLGdCQUFnQixHQUFZLEtBQUssQ0FBQztBQUUvQixNQUFlLGNBQWM7SUFHekIsTUFBTSxDQUFDLElBQUk7UUFDZCw0REFBVyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDMUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyw2Q0FBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFNUMsSUFBSSxRQUFRLEdBQUcsbUVBQWtCLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSw2Q0FBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQ3RGLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzNDLGFBQWE7UUFDYixJQUFJLFdBQVcsR0FBRyxJQUFJLDBDQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzVELGlGQUFnQyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVuRSxJQUFJLFVBQVUsR0FBRyx1REFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDcEMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqQixpRkFBZ0MsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQzNCLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDbkUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxJQUFJLEtBQUssR0FBb0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQzNCLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDN0MsNkNBQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3BEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELElBQUksNkNBQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxLQUFLLG9FQUFtQixDQUFDLGdCQUFnQixFQUFFO1lBQ3RFLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsSUFBSSw2Q0FBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssb0VBQW1CLENBQUMsY0FBYztZQUNsRSw2Q0FBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssb0VBQW1CLENBQUMsWUFBWSxFQUFFO1lBQ2xFLElBQUksY0FBYyxHQUFHLGNBQWM7WUFDbkMsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsNkNBQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEYsaUZBQWdDLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXBFLGdCQUFnQixDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUVwQyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksaUJBQWlCLEdBQUcsdURBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29CQUMzQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzNDLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN4QixpRkFBZ0MsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRWhGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUU7b0JBQ2xDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdkQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7d0JBQ3hDLElBQUksS0FBSyxHQUFvQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ2xELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUMzQixLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUMzQjt3QkFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3pCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUNwRCw2Q0FBTSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixDQUFDLENBQUM7NEJBQzlGLGdCQUFnQixHQUFHLElBQUksQ0FBQzt5QkFDM0I7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047Z0JBQ0QsSUFBSSw2Q0FBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssb0VBQW1CLENBQUMsWUFBWSxFQUFFO29CQUNsRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN6RDtnQkFFRCxJQUFJLDBEQUFZLENBQUMsc0JBQXNCLEVBQUUsdUJBQXVCLENBQUMsSUFBSSxnQkFBZ0IsRUFBRTtvQkFDbkYsZ0VBQWtCLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO29CQUNyRix5REFBVyxDQUFDLGNBQWMsQ0FBQyxtREFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMxQzthQUVKO2lCQUFNO2dCQUNILHVEQUFVLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDbEQsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1NBRUo7YUFBTTtZQUNILHVEQUFVLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDaEQ7SUFDTCxDQUFDOztBQTdFYSxxQ0FBc0IsR0FBVyxrQkFBa0IsQ0FBQztBQW9GdEUsU0FBUyxhQUFhLENBQUMsQ0FBSyxFQUFFLFFBQWdCLEVBQUUsS0FBaUI7SUFDN0QsSUFBSSxTQUFTLEdBQUcsZ0JBQWdCO0lBQ2hDLElBQUksYUFBYSxHQUFHLHVCQUF1QixDQUFDO0lBQzVDLElBQUkscUJBQXFCLEdBQUcsdURBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQy9DLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNiLElBQUksU0FBUyxHQUFHLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztJQUM5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFO1FBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakMsYUFBYTtZQUNiLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFL0Msb0ZBQW9GO1lBQ3BGLG9FQUFvRTtZQUNwRSxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUVELCtGQUErRjtRQUMvRixTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLFNBQVMsQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QyxxRkFBb0MsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkQsbUVBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsa0VBQWlCLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDeEU7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFLLEVBQUUsY0FBc0I7SUFDbkQsSUFBSSxlQUFlLEdBQUcsdURBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ3pDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pCLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFO1FBQ2hDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3hFLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsaUZBQWdDLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNsRjtJQUVELElBQUksY0FBYyxHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUN4QyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLGFBQWEsQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQyxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUVyQixJQUFJLGtCQUFrQixHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUM1QyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDekIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRTtRQUNuQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtZQUN6Qyw2Q0FBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQyx1REFBVSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLDZDQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsQ0FBQyxDQUFDLENBQUM7UUFDSCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDM0QsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDN0Q7SUFFRCxJQUFHLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTtRQUM5QixlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsNkNBQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoRjtJQUVELElBQUksY0FBYyxHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUN4QyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7UUFDL0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQ3JDLDZDQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pDLHVEQUFVLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDN0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsNkNBQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQztRQUNILGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdkQsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pEO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3pMRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0M7QUFDNEI7QUFFVDtBQUNUO0FBRW5DLE1BQWUsT0FBTztJQUNsQixNQUFNLENBQUMsSUFBSTtRQUNkLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRCLDZDQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTdCLElBQUksWUFBWSxHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUN0QyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ25CLGlGQUFnQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7WUFDN0IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsRCxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7Z0JBQ25DLHlEQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDO1NBQ0w7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN4QkQ7QUFBQTtBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLHdCQUF3QixHQUFHLElBQUk7QUFDakMsaUJBQWlCO0VBQ2YsR0FBRyxHQUFHLElBQUksRUFDVixhQUFhLEdBQUcsSUFBSSxDQUFDO0FBRXBCLE1BQU0sVUFBVTtJQVFuQixZQUFZLE1BQXVCO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxVQUFVLENBQUMsSUFBWTtRQUMxQixJQUFJLEtBQUssR0FBVyxDQUFDLENBQUM7UUFDdEIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLENBQUM7Z0JBQ0YsOEZBQThGO2dCQUM5RixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDakQsTUFBTTtZQUNWLEtBQUssRUFBRTtnQkFDSCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEQsTUFBTTtZQUNWLEtBQUssRUFBRTtnQkFDSCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEQsTUFBTTtZQUNWO2dCQUNJLE1BQU0sOEJBQThCLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUN6QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUVJLFNBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFBQSxDQUFDO0lBRUY7Ozs7T0FJRztJQUVJLFNBQVM7UUFDWixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7U0FDckI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE1BQU0sQ0FBQyxDQUFDO1NBQ1g7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQUEsQ0FBQztJQUVGOzs7O09BSUc7SUFFSSxVQUFVO1FBQ2IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSTtZQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1NBQ3JCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLENBQUMsQ0FBQztTQUNYO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUFBLENBQUM7SUFFRjs7OztPQUlHO0lBRUksY0FBYztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ0gsTUFBTSxHQUFHLENBQUMsRUFDVixFQUFFLENBQUM7UUFFVDtZQUNJLE1BQU0sSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztlQUM5QixDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUUxQixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQUEsQ0FBQztJQUVGOzs7OztPQUtHO0lBRUksVUFBVTtRQUNiLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxFQUFFO1lBQ1QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzVCLElBQUksSUFBSSxLQUFLLEdBQUc7Z0JBQ1osTUFBTTtZQUNWLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQUEsQ0FBQztJQUVGOzs7OztPQUtHO0lBQ0ksZUFBZSxDQUFDLFVBQWtCO1FBQ3JDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1QixJQUFJLElBQUksS0FBSyxHQUFHO2dCQUNaLE1BQU07WUFDVixHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUFBLENBQUM7SUFFRjs7OztPQUlHO0lBQ0ksb0JBQW9CO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFDckIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ2hCLFNBQVMsR0FBRyxDQUFDLEdBQUcsd0JBQXdCLENBQUM7UUFFL0MsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sSUFBSSxDQUFDO1FBRWhCLElBQUksU0FBUyxLQUFLLHdCQUF3QjtZQUN0QyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVwQyxPQUFPLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUM7SUFDL0csQ0FBQztJQUFBLENBQUM7SUFFRjs7OztPQUlHO0lBRUksVUFBVTtRQUNiLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVyQixPQUFPLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQ3pELENBQUM7SUFBQSxDQUFDO0lBRUY7Ozs7T0FJRztJQUNJLFFBQVE7UUFDWCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUN0QixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUN0QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUN0QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUN0QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTdDLE9BQU87WUFDSCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsS0FBSyxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoRCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3BELENBQUM7SUFFTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLElBQUksQ0FBQyxHQUFXO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ2hELENBQUM7SUFBQSxDQUFDO0lBRUY7O09BRUc7SUFDSSxLQUFLO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUFBLENBQUM7SUFFRjs7OztPQUlHO0lBRUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBQUEsQ0FBQztJQUVGOzs7OztPQUtHO0lBQ0ksUUFBUSxDQUFDLENBQVMsRUFBRSxTQUFrQixLQUFLO1FBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDSCxDQUFDLEdBQUcsQ0FBQyxFQUNMLElBQUksR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRixPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNaLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVwQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRTtRQUNELE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQUEsQ0FBQztJQUVGOzs7Ozs7T0FNRztJQUNJLFlBQVksQ0FBQyxTQUFjLEVBQUUsV0FBbUI7UUFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFakQsSUFBSSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDekMsQ0FBQztJQUFBLENBQUM7Q0FDTDs7Ozs7Ozs7Ozs7OztBQ3hSRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTyxNQUFNLFlBQVk7Q0FHeEI7QUFFRCxJQUFZLFFBUVg7QUFSRCxXQUFZLFFBQVE7SUFDaEIsc0JBQVU7SUFDVix3QkFBWTtJQUNaLDJCQUFlO0lBQ2Ysc0JBQVU7SUFDViwyQkFBZTtJQUNmLHNCQUFVO0lBQ1YsMkJBQWU7QUFDbkIsQ0FBQyxFQVJXLFFBQVEsS0FBUixRQUFRLFFBUW5CO0FBRU0sU0FBUyxnQkFBZ0IsQ0FBQyxNQUFjO0lBQzNDLFFBQVEsTUFBTSxFQUFFO1FBQ1osS0FBSyxHQUFHO1lBQ0osT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEtBQUssR0FBRztZQUNKLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMzQixLQUFLLEdBQUc7WUFDSixPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDOUIsS0FBSyxHQUFHO1lBQ0osT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEtBQUssR0FBRztZQUNKLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUM5QixLQUFLLEdBQUc7WUFDSixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDekI7WUFDSSxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7S0FDL0I7QUFDTCxDQUFDO0FBRUQsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ2pCLCtDQUFPO0lBQ1AsdUNBQUc7SUFDSCw2Q0FBTTtJQUNOLHlDQUFJO0FBQ1IsQ0FBQyxFQUxXLFNBQVMsS0FBVCxTQUFTLFFBS3BCO0FBU00sTUFBTSxJQUFJO0NBS2hCO0FBRU0sTUFBTSxTQUFTO0lBUWxCLFlBQVksWUFBMEI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNwQyxDQUFDO0NBQ0o7QUFFRCx5QkFBeUI7QUFDbEIsU0FBUyxlQUFlLENBQUMsWUFBb0I7SUFDaEQsSUFBSSxZQUFZLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDcEQsWUFBWSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5RCxZQUFZLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLElBQVk7SUFDekMsc0VBQXNFO0lBQ3RFLElBQUksRUFBRSxHQUFHLDRDQUE0QyxDQUFDO0lBQ3RELElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsSUFBSSxRQUFRLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7SUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1RjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLFlBQW9CO0lBQy9DLDZGQUE2RjtJQUM3RixrREFBa0Q7SUFDbEQsSUFBSSxFQUFFLEdBQUcseUVBQXlFLENBQUM7SUFDbkYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QyxJQUFJLEtBQUssR0FBMEIsRUFBRSxDQUFDO0lBQ3RDLElBQUksVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxNQUFjO0lBQ3ZDLE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELHlCQUF5QjtBQUV6QixrQ0FBa0M7QUFDM0IsU0FBUyxZQUFZLENBQUMsU0FBaUIsRUFBRSxZQUEwQjtJQUN0RSxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxJQUFJLGFBQWEsR0FBVyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RSxJQUFJLGFBQWEsR0FBYSxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hELElBQUksUUFBUSxHQUFlLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxJQUFJLGFBQWEsR0FBeUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEYsSUFBSSxvQkFBb0IsR0FBeUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakcsSUFBSSxNQUFNLEdBQVcsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckUsSUFBSSxJQUFJLEdBQW9DLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLElBQUksS0FBSyxHQUE2QyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyRyxJQUFJLGtCQUFrQixHQUF1RCxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsYUFBdUI7SUFDeEMsSUFBSSxRQUFRLEdBQWUsRUFBRSxDQUFDO0lBQzlCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksY0FBYyxHQUFhLEVBQUUsQ0FBQztJQUNsQyxPQUFPLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQzdCLElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxRQUFRLEtBQUssRUFBRTtZQUNYLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUMxRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO3FCQUFNO29CQUNILENBQUMsRUFBRSxDQUFDO2lCQUNQO2dCQUNELE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ3ZGLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3hDLENBQUMsRUFBRSxDQUFDO2lCQUNQO3FCQUFNO29CQUNILEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQ2I7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM5QixjQUFjLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixDQUFDLEVBQUUsQ0FBQztnQkFDSixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLE1BQU07U0FDYjtLQUNKO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUVELDZCQUE2QjtBQUM3QixTQUFTLGlCQUFpQixDQUFDLFFBQW9CO0lBQzNDLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUN2QixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQzlELFdBQVcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNyQztLQUNKO0lBQ0QsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsYUFBbUQ7SUFDekUsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztLQUNKO0lBQ0QsT0FBTyxvQkFBb0IsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsTUFBYztJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQzFCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0tBQ0o7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxVQUFnRCxFQUFFLE1BQWMsRUFDaEUsSUFBcUMsRUFBRSxLQUErQztJQUU3RyxJQUFJLGtCQUFrQixHQUF1RCxFQUFFLENBQUM7SUFDaEYsSUFBSSxXQUFXLEdBQUcsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUN6RyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pDLFdBQVcsSUFBSSxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0Qsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7S0FDNUc7SUFDRCxPQUFPLGtCQUFrQixDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxTQUFpQixFQUFFLE9BQWUsRUFBRSxJQUFxQyxFQUN6RSxLQUErQztJQUNuRSxJQUFJLGVBQWUsR0FBVyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsSUFBSSxZQUFZLEdBQVcsU0FBUyxDQUFDO0lBQ3JDLElBQUksV0FBVyxHQUFXLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckYsR0FBRztRQUNDLElBQUksYUFBYSxHQUFXLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxJQUFJLFFBQVEsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN4RCxXQUFXLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDMUUsWUFBWSxHQUFHLFFBQVEsQ0FBQztRQUN4QixlQUFlLEVBQUUsQ0FBQztLQUNyQixRQUFRLFlBQVksR0FBRyxPQUFPLEVBQUU7SUFDakMsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsU0FBaUIsRUFBRSxJQUFxQztJQUM5RSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsRUFBRTtZQUMxQixhQUFhLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO0tBQ0o7SUFDRCxPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDO0FBRUQsMkNBQTJDO0FBQzNDLFNBQVMsV0FBVyxDQUFDLFNBQWlCLEVBQUUsT0FBZSxFQUFFLEtBQStDO0lBQ3BHLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxTQUFTLElBQUksUUFBUSxJQUFJLFFBQVEsR0FBRyxPQUFPLEVBQUU7WUFDN0MsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7U0FDakM7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLGVBQXVCLEVBQUUsSUFBcUM7SUFDcEYsSUFBSSxlQUFlLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDbkMsT0FBTyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUN6QztJQUNELE9BQU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDO0FBQ3BDLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLGtCQUF1RTtJQUMvRixJQUFJLFNBQVMsR0FBVyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQzlELElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDbkI7SUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hELElBQUksSUFBSSxHQUFxRCxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxRQUFRLEdBQWEsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEQsSUFBSSxRQUFRLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7YUFDdEY7U0FDSjtLQUNKO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLFNBQWlCO0lBQ2hDLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtRQUNuQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBSSxRQUFRLEdBQXVCLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNFLElBQUksSUFBSSxHQUFvQyxFQUFFLENBQUM7SUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7S0FDMUQ7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsV0FBbUI7SUFDbkMsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxJQUFJLFVBQVUsR0FBdUIsNEJBQTRCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0UsSUFBSSxLQUFLLEdBQTZDLEVBQUUsQ0FBQztJQUN6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUN4RTtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLDRCQUE0QixDQUFDLE1BQWM7SUFDaEQsSUFBSSxXQUFXLEdBQWUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUUsSUFBSSxLQUFLLEdBQXVCLEVBQUUsQ0FBQztJQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUU7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7O0FDbFREO0FBQUE7QUFBQTtBQUFBO0FBQW1DO0FBQ1U7QUFJN0M7Ozs7R0FJRztBQUVJLFNBQVMsUUFBUSxDQUFDLEtBQXlCLEVBQUUsUUFBa0IsRUFBRSxTQUFvQjtJQUN4RixJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssV0FBVyxFQUFFO1FBQ25DLE9BQU8sYUFBYSxDQUFjLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDakU7SUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBUyxLQUFLO1FBQzFCLGFBQWEsQ0FBYyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDekUsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFTLEtBQUs7UUFDM0IsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUM7SUFDRixNQUFNLENBQUMsaUJBQWlCLENBQVEsS0FBSyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVELElBQUksUUFBYSxDQUFDO0FBRWxCLFNBQVMsYUFBYSxDQUFDLE1BQWtCLEVBQUUsUUFBa0IsRUFBRSxTQUFvQjtJQUMvRSxRQUFRLEdBQUcsOERBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5QixhQUFhO0lBQ2IsSUFBSSxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7SUFDN0IsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVELFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFcEMsYUFBYTtJQUNiLElBQUksWUFBWSxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQzlCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUcsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUMzRCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsVUFBVTtJQUNmLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztJQUVmLEtBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JCLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksaURBQU8sQ0FBQyxRQUFRO1lBQ2xDLE9BQU8sR0FBRyxDQUFDO0tBQ2xCO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxRQUFRO0lBQ2IsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBRWYsSUFBSSxTQUFTLEdBQUcsQ0FBQztJQUVqQiwyQ0FBMkM7SUFDM0MsS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxpREFBTyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxpREFBTyxDQUFDLFdBQVc7WUFDL0UsU0FBUyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUM7S0FDcEM7SUFFRCwyQ0FBMkM7SUFDM0MsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLEtBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JCLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksaURBQU8sQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksaURBQU8sQ0FBQyxXQUFXLEVBQUU7WUFDakYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDcEQsYUFBYSxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDcEM7S0FDSjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4RkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNkI7QUFDZ0Q7QUFDZDtBQUUvRDs7OztHQUlHO0FBRUksTUFBTSxHQUFHO0NBU2Y7QUFFRDs7R0FFRztBQUNJLFNBQVMsZUFBZSxDQUFDLElBQWdCLEVBQUUsR0FBZ0I7SUFDOUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUN0QixDQUFDO0FBRUQ7O0dBRUc7QUFDSSxTQUFTLFVBQVUsQ0FBQyxHQUFlO0lBQ3RDLElBQUksU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLElBQUksZUFBZSxHQUFlLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0Msb0JBQW9CO0lBQ3BCLFFBQVEsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUTtRQUM1QixLQUFLLElBQUksRUFBRyx3QkFBd0I7WUFDaEMsSUFBSSxpQkFBaUIsR0FBRyxlQUFlLENBQUMsNENBQVksQ0FBQyxlQUFlLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1RSxPQUFPLFdBQVcsQ0FBQyxJQUFJLHVEQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzRCxNQUFNO1FBRVYsS0FBSyxJQUFJLEVBQUcscUJBQXFCO1lBQzdCLE9BQU8sV0FBVyxDQUFDLElBQUksdURBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3QyxNQUFNO1FBRVYsS0FBSyxJQUFJLEVBQUcsa0JBQWtCO1lBQzFCLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU07UUFFVjtZQUNJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ2xDLE1BQU07S0FDYjtBQUNMLENBQUM7QUFFRDs7R0FFRztBQUNJLFNBQVMsV0FBVyxDQUFDLElBQWdCLEVBQUUsZUFBNEI7SUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFRO0lBRXJCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFO0lBQ25CLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMvQixHQUFHLENBQUMsVUFBVSxHQUFHO1FBQ2IsVUFBVSxFQUFFLGVBQWUsQ0FBQyxVQUFVO1FBQ3RDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztLQUNwQyxDQUFDO0lBQ0YsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMxQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsSUFBSTtRQUNBLEdBQUcsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxTQUFTLFdBQVcsQ0FBQyxJQUFnQjtJQUN4QyxJQUFJLElBQUksR0FBVSxFQUFFLENBQUM7SUFDckIsSUFBSSxTQUFvQixDQUFDO0lBRXpCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUV0QixvREFBb0Q7SUFDcEQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN2RCxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDdkIsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsUUFBUSxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ3BCLDhCQUE4QjtZQUM5QixLQUFLLGlEQUFPLENBQUMsV0FBVztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzNDLE1BQU07Z0JBRVYsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7Z0JBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlO2dCQUVwQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEYsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixNQUFNO1lBRVYsS0FBSyxpREFBTyxDQUFDLFVBQVUsQ0FBQztZQUN4QixLQUFLLGlEQUFPLENBQUMsV0FBVztnQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7Z0JBQzdDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksc0RBQVksQ0FBQyxTQUFTO29CQUNuRCxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixNQUFNO1lBRVYsS0FBSyxpREFBTyxDQUFDLFdBQVc7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ1osSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLHNEQUFZLENBQUMsU0FBUyxFQUFFO3dCQUNsRCxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUNYLFNBQVMsR0FBRyxNQUFNLENBQUM7d0JBQ25CLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNqQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDOUIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RGLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN6QyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztxQkFDeEI7aUJBQ0o7Z0JBQ0QsTUFBTTtZQUVWLHFDQUFxQztZQUNyQyxLQUFLLGlEQUFPLENBQUMsUUFBUTtnQkFDakIsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7Z0JBRTdCLElBQUksV0FBVyxHQUFVLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxlQUFlLEdBQVEsRUFBRSxDQUFDO2dCQUM5QixJQUFJLGVBQWUsR0FBeUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDckUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO2dCQUV0QixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3RCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFL0Isa0JBQWtCO29CQUNsQixRQUFRLE1BQU0sQ0FBQyxNQUFNLEVBQUU7d0JBQ25CLEtBQUssdURBQWEsQ0FBQyxHQUFHOzRCQUNsQixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7NEJBQ3hCLE1BQU07d0JBRVYsS0FBSyx1REFBYSxDQUFDLFlBQVk7NEJBQzNCLFlBQVksR0FBRyxFQUFFLENBQUM7NEJBQ2xCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0NBQ3BDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7NkJBQ3hDOzRCQUNELE1BQU07d0JBRVYsS0FBSyx1REFBYSxDQUFDLElBQUk7NEJBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0NBQ25ELElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQztnQ0FDMUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDbEMsUUFBUSxRQUFRLEVBQUU7b0NBQ2QsS0FBSyxxREFBVyxDQUFDLGNBQWM7d0NBQzNCLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0NBQzlCLE1BQU07b0NBRVYsS0FBSyxxREFBVyxDQUFDLGFBQWE7d0NBQzFCLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7d0NBQzdCLE1BQU07b0NBRVYsS0FBSyxxREFBVyxDQUFDLElBQUk7d0NBQ2pCLFNBQVMsR0FBRyxJQUFJLENBQUM7d0NBQ2pCLE1BQU07b0NBRVYsS0FBSyxxREFBVyxDQUFDLFNBQVM7d0NBQ3RCLFNBQVMsR0FBRyxTQUFTLENBQUM7d0NBQ3RCLE1BQU07b0NBRVYsS0FBSyxxREFBVyxDQUFDLFFBQVE7d0NBQ3JCLFNBQVMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNoRCxNQUFNO29DQUVWLEtBQUsscURBQVcsQ0FBQyxPQUFPO3dDQUNwQixTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3Q0FDeEMsTUFBTTtvQ0FFVixLQUFLLHFEQUFXLENBQUMsTUFBTTt3Q0FDbkIsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3Q0FDOUIsTUFBTTtvQ0FFVixLQUFLLHFEQUFXLENBQUMsT0FBTzt3Q0FDcEIsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7d0NBQ2hDLE1BQU07b0NBRVYsS0FBSyxxREFBVyxDQUFDLFNBQVM7d0NBQ3RCLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUM3QyxNQUFNO29DQUVWLEtBQUsscURBQVcsQ0FBQyxVQUFVO3dDQUN2QixTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3Q0FDOUMsTUFBTTtvQ0FFVjt3Q0FDSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO3dDQUM1RCxNQUFNO2lDQUNiO2dDQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7NkJBQy9COzRCQUNELE1BQU07d0JBRVYsS0FBSyx1REFBYSxDQUFDLEdBQUc7NEJBQ2xCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDbEIsTUFBTTt3QkFFVixLQUFLLHVEQUFhLENBQUMsU0FBUzs0QkFDeEIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0RCxNQUFNO3dCQUVWLEtBQUssdURBQWEsQ0FBQyxjQUFjOzRCQUM3QixlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMxRSxNQUFNO3dCQUVWLEtBQUssdURBQWEsQ0FBQyxZQUFZOzRCQUMzQixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQy9CLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxlQUFlLENBQUM7Z0NBQzVCLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQ2pDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQzFDLE1BQU07d0JBRVYsS0FBSyx1REFBYSxDQUFDLFlBQVk7NEJBQzNCLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDaEMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQzs0QkFDN0MsTUFBTTt3QkFFVixLQUFLLHVEQUFhLENBQUMsVUFBVTs0QkFDekIsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUNsQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7NEJBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUU7Z0NBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7NEJBQ2xDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ3hCLE1BQU07d0JBRVYsS0FBSyx1REFBYSxDQUFDLFVBQVU7NEJBQ3pCLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDL0IsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUNqQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDO2dDQUNyQixRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxNQUFNO3dCQUVWLEtBQUssdURBQWEsQ0FBQyxVQUFVOzRCQUN6QixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQ2hDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDL0IsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQzs0QkFDcEMsTUFBTTt3QkFFVixLQUFLLENBQUM7NEJBQ0YsaUZBQWlGOzRCQUNqRixNQUFNO3dCQUVWOzRCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDM0UsTUFBTTtxQkFDYjtpQkFDSjtnQkFDRCxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDNUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBRXpCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUN4QixHQUFHLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztnQkFDaEMsTUFBTTtZQUVWO2dCQUNJLGtGQUFrRjtnQkFDbEYsTUFBTTtTQUNiO1FBRUQsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ2YsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3BEO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzVTRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7OztHQU1HO0FBRUksTUFBZSxPQUFPOztBQUNYLFdBQUcsR0FBVyxDQUFDLENBQUM7QUFDaEIsaUJBQVMsR0FBVyxDQUFDLENBQUM7QUFDdEIsZ0JBQVEsR0FBVyxFQUFFLENBQUM7QUFDdEIsbUJBQVcsR0FBVyxFQUFFLENBQUM7QUFDekIsa0JBQVUsR0FBVyxFQUFFLENBQUM7QUFDeEIsbUJBQVcsR0FBVyxFQUFFLENBQUM7QUFDekIsbUJBQVcsR0FBVyxFQUFFLENBQUM7QUFDekIsc0JBQWMsR0FBVyxFQUFFLENBQUM7QUFHdkMsTUFBZSxhQUFhOztBQUNqQixpQkFBRyxHQUFXLENBQUMsQ0FBQztBQUNoQiwwQkFBWSxHQUFXLElBQUksQ0FBQztBQUM1QixrQkFBSSxHQUFXLElBQUksQ0FBQztBQUNwQixpQkFBRyxHQUFXLElBQUksQ0FBQztBQUNuQix1QkFBUyxHQUFXLElBQUksQ0FBQztBQUN6Qiw0QkFBYyxHQUFXLElBQUksQ0FBQztBQUM5QiwwQkFBWSxHQUFXLElBQUksQ0FBQztBQUM1QiwwQkFBWSxHQUFXLElBQUksQ0FBQztBQUM1Qix3QkFBVSxHQUFXLElBQUksQ0FBQztBQUMxQix3QkFBVSxHQUFXLElBQUksQ0FBQztBQUMxQix3QkFBVSxHQUFXLElBQUksQ0FBQztBQUdyQyxNQUFlLFdBQVc7O0FBQ2YsMEJBQWMsR0FBVyxDQUFDLENBQUM7QUFDM0IseUJBQWEsR0FBVyxDQUFDLENBQUM7QUFDMUIsZ0JBQUksR0FBVyxDQUFDLENBQUM7QUFDakIscUJBQVMsR0FBVyxDQUFDLENBQUM7QUFDdEIsb0JBQVEsR0FBVyxDQUFDLENBQUM7QUFDckIsbUJBQU8sR0FBVyxDQUFDLENBQUM7QUFDcEIsa0JBQU0sR0FBVyxDQUFDLENBQUM7QUFDbkIsbUJBQU8sR0FBVyxDQUFDLENBQUM7QUFDcEIscUJBQVMsR0FBVyxDQUFDLENBQUM7QUFDdEIsc0JBQVUsR0FBVyxDQUFDLENBQUM7QUFHbEMsTUFBZSxZQUFZOztBQUNoQixzQkFBUyxHQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQy9DeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF5QjtBQUNNO0FBRXhCLE1BQU0sUUFBUTtJQVFqQixZQUFZLGVBQTBCLEVBQUUsZUFBMEIsRUFBRSxvQkFBK0IsRUFDdkYscUJBQTZCLEVBQUUsS0FBZTtRQUN0RCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7UUFDakQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLENBQUMsb0JBQTRCLEVBQUUsS0FBZTtRQUM5QyxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDckUsSUFBSSxlQUFlLEdBQWMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU8sV0FBVyxDQUFDLENBQUssRUFBRSxvQkFBNEI7UUFDbkQsSUFBSSxpQkFBaUIsR0FBYyx5Q0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDOUYsSUFBSSxxQkFBcUIsR0FBYyx5Q0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQzNFLG9CQUFvQixHQUFHLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE9BQU8seUNBQVMsQ0FBQyxHQUFHLENBQUMseUNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVNLHVCQUF1QixDQUFDLG9CQUE0QjtRQUN2RCxPQUFPLG9CQUFvQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUM3RCxDQUFDOztBQS9CYyxxQkFBWSxHQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1Q1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0M7QUFDWDtBQUNNO0FBRXhCLE1BQU0sY0FBYztJQVF2QixZQUFZLHlCQUFpQyxFQUFFLG9CQUErQjtRQUMxRSxJQUFJLENBQUMseUJBQXlCLEdBQUcseUJBQXlCLENBQUM7UUFDM0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxJQUFJLENBQUMsb0JBQTRCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2xGLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQUksUUFBUSxHQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxrQkFBa0IsR0FBYSxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDOUYsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQzNEO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQixDQUFDLG9CQUE0QjtRQUNsRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUMxRTthQUFNO1lBQ0gsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxRQUFrQixFQUFFLG9CQUE0QjtRQUMxRSxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN6RSxJQUFJLG9CQUFvQixHQUFHLENBQUMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztRQUMzRyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUMzRCxJQUFJLFFBQVEsR0FBYSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVPLFdBQVcsQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsS0FBYTtRQUNqRSxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDWixPQUFPLFFBQVEsQ0FBQztTQUNuQjthQUFNLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sUUFBUSxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNuRDthQUFNO1lBQ0gsT0FBTyxRQUFRLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRU0sc0JBQXNCLENBQUMsZUFBMEIsRUFBRSxlQUEwQixFQUFFLHFCQUE2QixFQUNyRixZQUFvQixFQUFFLEtBQWU7UUFDL0QsSUFBSSxDQUFDLEdBQU8sNkNBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNqRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN6RjtJQUNMLENBQUM7SUFFTyxlQUFlLENBQUMsQ0FBSyxFQUFFLFVBQXFCO1FBQ2hELElBQUksbUJBQW1CLEdBQWMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU8sd0JBQXdCLENBQUMsQ0FBSyxFQUFFLFVBQXFCO1FBQ3pELENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsK0JBQStCLEdBQUcsQ0FBQyxFQUNuRixjQUFjLENBQUMsK0JBQStCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzNFLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDUixPQUFPLHlDQUFTLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxDQUFLLEVBQUUsVUFBcUI7UUFDekQsSUFBSSx3QkFBd0IsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLG1DQUFtQyxHQUFHLENBQUMsRUFDM0YsY0FBYyxDQUFDLG1DQUFtQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyx3QkFBd0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMvRSxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLGNBQWMsQ0FBQyxDQUFLLEVBQUUsU0FBbUI7UUFDN0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9GLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakcsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLGdCQUFnQixDQUFDLENBQUssRUFBRSxLQUFhLEVBQUUsU0FBaUIsRUFBRSxVQUFrQixFQUFFLFVBQWtCO1FBQ3BHLElBQUksUUFBUSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxRQUFRLElBQUksVUFBVSxFQUFFO1lBQ3hCLE9BQU8sVUFBVSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxVQUFVLEdBQUcsUUFBUSxJQUFJLFFBQVEsR0FBRyxVQUFVLEVBQUU7WUFDdkQsT0FBTyxRQUFRLENBQUM7U0FDbkI7YUFBTTtZQUNILE9BQU8sVUFBVSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVNLFdBQVcsQ0FBQyxlQUEwQixFQUFFLGVBQTBCLEVBQUUscUJBQTZCLEVBQ3JGLEtBQWU7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2YsSUFBSSxrREFBUSxDQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakgsQ0FBQzs7QUE5R2MsOENBQStCLEdBQVcsRUFBRSxDQUFDO0FBQzdDLGtEQUFtQyxHQUFXLEVBQUUsQ0FBQztBQUNqRCw2QkFBYyxHQUFXLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1YvQztBQUFBO0FBQUE7QUFBTyxNQUFNLGVBQWU7SUFLeEIsWUFBWSxRQUFnQixFQUFFLEtBQWEsRUFBRSxRQUFrQjtRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFFRCxJQUFZLFFBRVg7QUFGRCxXQUFZLFFBQVE7SUFDaEIsbUNBQUU7SUFBRSx1Q0FBSTtBQUNaLENBQUMsRUFGVyxRQUFRLEtBQVIsUUFBUSxRQUVuQjs7Ozs7Ozs7Ozs7OztBQ2JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFnRTtBQUNyQjtBQUNBO0FBQ0E7QUFDUTtBQUNKO0FBQ0U7QUFFTjtBQVEzQjtBQUNlO0FBQytCO0FBRVo7QUFDNEM7QUFDaEM7QUFDSTtBQUNGO0FBQ1E7QUFDekI7QUFDVjtBQUk5QixNQUFNLGNBQWM7SUFzQnZCLFlBQVksTUFBZ0IsRUFBRSxTQUFvQixFQUFFLE1BQWMsRUFBRSxLQUFjO1FBWDFFLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBWWpDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsc0hBQXNIO1FBQ3RILElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSx5REFBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseURBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksc0VBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFMUQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0RBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQ3BHLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw4REFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0RBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlEQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFMUcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSw2REFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNoRjtRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDL0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlFQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQ3RGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseURBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQ3RHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSw2RUFBb0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQzdGLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSwrRUFBcUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUMzRyxTQUFTLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLGlGQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSx1RkFBeUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFNUcsSUFBSSxDQUFDLGtFQUFvQixDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xDLG1FQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsdUVBQXlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCwrRUFBaUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxhQUE0QjtRQUNwRCwrRkFBK0Y7UUFDL0YsNERBQTREO1FBQzVELGVBQWU7UUFDZixzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyw0QkFBNEIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sSUFBSTtRQUNQLElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxvQkFBb0IsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3JFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsMkVBQXNCLENBQUMsS0FBSyxDQUFDO1lBQzVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFO1lBQ25DLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFO1lBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsRUFBRTtZQUN4QyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFTyxlQUFlO1FBQ25CLElBQUksZ0JBQXdCLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDMUYsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7U0FDdkc7YUFBTTtZQUNILGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1NBQ3ZHO1FBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDcEYsQ0FBQztJQUVPLGdCQUFnQixDQUFDLGFBQXFCLEVBQUUsWUFBb0I7UUFDaEUsSUFBSSxhQUFhLEdBQUcsWUFBWSxFQUFFO1lBQzlCLE9BQU8sWUFBWSxHQUFHLENBQUMsQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTyxPQUFPO1FBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0Qiw2Q0FBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLCtEQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQzFGLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZELDBEQUFXLENBQUMsY0FBYyxDQUFDLG9EQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyx3QkFBd0I7UUFDNUIsSUFBSSxXQUFXLEdBQUcsNkNBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRixJQUFJLGVBQWUsR0FBWSxLQUFLLENBQUM7UUFDckMsSUFBSSxlQUFlLEdBQVcsRUFBRSxDQUFDO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksVUFBVSxHQUFlLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEtBQUssZUFBZSxFQUFFO2dCQUN4QyxlQUFlLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1lBQ0QsNkNBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDMUQsR0FBRyxFQUFFO2dCQUNELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQ3RELENBQUMsRUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDcEQsQ0FBQyxDQUFDO1NBQ1Q7UUFFRCw2Q0FBTSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ3BFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDbEIscUVBQXFFO1lBQ3JFLDZDQUFNLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztTQUMxRTtJQUNMLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxXQUFtQjtRQUM3QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELElBQUksZUFBZSxHQUNmLElBQUksbUVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsNERBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxXQUFtQjtRQUMzQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RELElBQUksZUFBZSxHQUNmLElBQUksbUVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsNERBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTyxXQUFXLENBQUMsV0FBbUIsRUFBRSxvQkFBNEI7UUFDakUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2xGO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFO1lBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQzVGO0lBQ0wsQ0FBQztJQUVPLGFBQWEsQ0FBQyxXQUFtQixFQUFFLG9CQUE0QjtRQUNuRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7U0FDcEY7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7U0FDOUY7SUFDTCxDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksV0FBVyxHQUFHLDZDQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxVQUFVLEdBQWUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLDZDQUFNLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3RDtJQUNMLENBQUM7Q0FDSjtBQUVELE1BQU0sYUFBYTtJQU9mLFlBQVksTUFBYyxFQUFFLFNBQWlCO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELG1CQUFtQjtRQUNmLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxXQUFtQixFQUFFLFlBQW9CO1FBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsWUFBWSxDQUFDO0lBQ25ELENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3JSRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWdFO0FBQ3JCO0FBRUk7QUFJeEMsTUFBTSxjQUFjO0lBWXZCLFlBQVksTUFBZ0IsRUFBRSxNQUFjLEVBQUUsS0FBYztRQU5wRCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxHQUFHLENBQUM7UUFDWixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBSWpCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSx5REFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw2REFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0RBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQ3BHLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sU0FBUztRQUNiLE9BQU8sRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDO0lBQ3RHLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsU0FBaUI7UUFDdEQsSUFBSSxhQUFhLEdBQWEsRUFBRSxDQUFDO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7UUFFRCxPQUFPO1lBQ0gsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFDZCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDM0IsQ0FBQztZQUNELGtCQUFrQixFQUFFLEdBQUcsRUFBRTtnQkFDckIsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDO1lBQ2xDLENBQUM7WUFDRCxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RCLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDO1lBQ25DLENBQUM7WUFDRCxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JCLE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO2dCQUNuQixPQUFPLGFBQWEsQ0FBQztZQUN6QixDQUFDO1lBQ0QsZUFBZSxFQUFFLENBQUMsV0FBbUIsRUFBRSxZQUFvQixFQUFFLEVBQUUsR0FBRSxDQUFDO1NBQ3JFLENBQUM7SUFDTixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUMzREQ7QUFBQTtBQUFPLE1BQU0sc0JBQXNCO0lBTS9CLFlBQVksTUFBYyxFQUFFLGFBQTRCLEVBQUUsU0FBaUI7UUFDdkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFTSxTQUFTLENBQUMsV0FBbUI7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUVNLFlBQVksQ0FBQyxXQUFtQjtRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM5QyxDQUFDO0lBRU0sSUFBSTtRQUNQLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDaEUsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1NBQzNFO0lBQ0wsQ0FBQztJQUVPLFdBQVcsQ0FBQyxXQUFtQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDdENEO0FBQUE7QUFBQTtBQUFnRDtBQU16QyxNQUFNLGNBQWM7SUFPdkIsWUFBWSxNQUFjLEVBQUUsV0FBd0IsRUFBRSxlQUFnQyxFQUFFLENBQUssRUFDakYsaUJBQW9DO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkksQ0FBQztJQUVPLG1CQUFtQixDQUFDLENBQUssRUFBRSxnQkFBNEIsRUFDbkMsaUJBQW9DLEVBQ3BDLFdBQXdCLEVBQUUsZUFBZ0M7UUFDbEYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDN0IsSUFBSSxTQUFTLEdBQUcsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLGVBQWUsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLElBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0Usc0VBQWdCLENBQUMsQ0FBQyxFQUFFLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFDdEcsU0FBUyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQsOEZBQThGO0lBQ3RGLHNCQUFzQixDQUFDLGdCQUE0QjtRQUN2RCxJQUFJLGFBQWEsR0FBa0QsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQy9GLE9BQU87Z0JBQ0gsWUFBWSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQzthQUNwRixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLG1CQUFtQixHQUNuQixJQUFJLENBQUMsMkJBQTJCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sbUJBQW1CLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxVQUFrQixFQUFFLFVBQWtCO1FBQ2xFLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTywyQkFBMkIsQ0FBQyxhQUE0RDtRQUM1RixJQUFJLG1CQUFtQixHQUFrRCxFQUFFLENBQUM7UUFDNUUsT0FBTyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QixJQUFJLGVBQWUsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ3BELElBQUksaUJBQWlCLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssZUFBZSxDQUFDLENBQUM7WUFDMUYsSUFBSSxnQkFBZ0IsR0FBRyxpQkFBaUI7aUJBQy9CLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztrQkFDL0MsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQy9CLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQztZQUN2RixhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssZUFBZSxDQUFDLENBQUM7U0FDckY7UUFDRCxPQUFPLG1CQUFtQixDQUFDO0lBQy9CLENBQUM7SUFFTyx5QkFBeUIsQ0FBQyxDQUE4QyxFQUM5QyxDQUE4QztRQUM1RSxPQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNsRkQ7QUFBQTtBQUFBLElBQVksZUFHWDtBQUhELFdBQVksZUFBZTtJQUN2QixpREFBRTtJQUNGLHFEQUFJO0FBQ1IsQ0FBQyxFQUhXLGVBQWUsS0FBZixlQUFlLFFBRzFCOzs7Ozs7Ozs7Ozs7O0FDRkQ7QUFBQTtBQUFBO0FBQUE7QUFBMkM7QUFHUTtBQUU1QyxNQUFNLGFBQWE7SUFNdEIsWUFBWSxNQUFjLEVBQUUsQ0FBSyxFQUFFLFlBQW9GO1FBQ25ILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlEQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBYTtZQUNsQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUM1QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDNUMsV0FBVyxHQUFHLElBQUksQ0FBQztpQkFDdEI7YUFDSjtpQkFBTTtnQkFDSCxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDdEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxpRUFBZSxDQUFDLElBQUksRUFBRTtvQkFDdEQsSUFBSSxDQUFDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDO2lCQUM3QztxQkFBTTtvQkFDSCxJQUFJLENBQUMsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUM7aUJBQzdDO2dCQUNELHFDQUFxQztnQkFDckMsT0FBTyxLQUFLLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCx1RkFBdUY7SUFDdkYsV0FBVyxDQUFDLGVBQXFCO1FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxlQUFlLENBQUMsQ0FBSyxFQUFFLE1BQTZFO1FBQ3hHLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSztZQUN6RSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDNUUsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNwREQ7QUFBQTtBQUFBO0FBQUE7QUFBcUg7QUFFckgsSUFBWSxhQU1YO0FBTkQsV0FBWSxhQUFhO0lBQ3JCLDZEQUFVO0lBQ1YsaUVBQVk7SUFDWix5RUFBZ0I7SUFDaEIsaUVBQVk7SUFDWixtREFBSztBQUNULENBQUMsRUFOVyxhQUFhLEtBQWIsYUFBYSxRQU14QjtBQUVNLE1BQU0sUUFBUTtJQU1qQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sUUFBUSxDQUFDLElBQWE7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsZ0VBQWdFO1FBQ3ZGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBZ0MsRUFBRSxFQUFFO1lBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLHlFQUFlLENBQVMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQzthQUNwQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQzthQUMvQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRU0sY0FBYyxDQUFDLE9BQW1DO1FBQ3JELElBQUksTUFBTSxHQUFhLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6RCxJQUFJLFlBQVksR0FBRyxJQUFJLDhEQUFZLEVBQUUsQ0FBQztRQUN0QyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQWtCLENBQUMsQ0FBQztRQUNqRCxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBRWpDLElBQUksU0FBUyxHQUFHLElBQUksMkRBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7SUFDNUMsQ0FBQztJQUVNLGFBQWEsQ0FBQyxTQUFpQjtRQUNsQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDLFlBQVksRUFBRTtZQUM1RixJQUFJLENBQUMsU0FBUyxHQUFHLHNFQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7U0FDM0M7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUNoQixJQUFVLEVBQ1YsUUFBbUQsRUFDbkQsT0FBMkM7UUFFM0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNsQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxPQUFtQztRQUMzRCxJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25CO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxHQUE2QjtRQUNwRCxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSwwREFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsMkRBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDO0lBQzlHLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxTQUFpQjtRQUM5QyxRQUFRLFNBQVMsRUFBRTtZQUNmLEtBQUssR0FBRztnQkFDSixPQUFPLENBQUMsQ0FBQztnQkFDVCxNQUFNO1lBQ1YsS0FBSyxHQUFHO2dCQUNKLE9BQU8sQ0FBQyxDQUFDO2dCQUNULE1BQU07WUFDVixLQUFLLEdBQUc7Z0JBQ0osT0FBTyxDQUFDLENBQUM7Z0JBQ1QsTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixPQUFPLENBQUMsQ0FBQztnQkFDVCxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSwyQkFBMkIsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDO1NBQzNEO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDdEdEO0FBQUE7QUFBTyxNQUFNLFdBQVc7SUFJcEIsWUFBWSx5QkFBaUMsRUFBRSxNQUFjO1FBQ3pELElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU8sY0FBYyxDQUFDLGdCQUF3QjtRQUMzQyxJQUFJLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtZQUNoQyxNQUFNLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1NBQ2xGO1FBQ0QsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLGFBQWE7SUFDcEYsQ0FBQztJQUVELHFEQUFxRDtJQUNyRCxXQUFXLENBQUMsZ0JBQXdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUM3SCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN0QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ21CO0FBU2xDO0FBQ3lCO0FBRWxDLFNBQVMsV0FBVztJQUN2QixJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFDMUMsSUFBSSxZQUFZLEdBQUcsb0JBQW9CLENBQUM7SUFFeEMsSUFBSSxrQkFBa0IsR0FBRyx1REFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDNUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUMsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDekIsZ0NBQWdDLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1FBQ3pDLHlEQUFXLENBQUMsY0FBYyxDQUFDLG1EQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFO1FBQ25DLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzNEO0lBRUQsSUFBSSxvQkFBb0IsR0FBRyx1REFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDOUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUMsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7SUFDM0IsZ0NBQWdDLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1FBQzNDLHlEQUFXLENBQUMsY0FBYyxDQUFDLG1EQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUU7UUFDckMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDN0Q7SUFHRCxJQUFJLGFBQWEsR0FBRyx1REFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDdkMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNwQixnQ0FBZ0MsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtRQUNwQyx5REFBVyxDQUFDLGNBQWMsQ0FBQyxtREFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7UUFDOUIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN0RDtBQUNMLENBQUM7QUFFRCx5REFBeUQ7QUFDbEQsU0FBUyxnQ0FBZ0MsQ0FBQyxPQUFtQixFQUFFLFNBQWlCLEVBQUUsU0FBaUIsRUFDekQsS0FBYSxFQUFFLE1BQWM7SUFDMUUsSUFBSSxDQUFDLEdBQUcsNkNBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO0lBQ3RDLElBQUksY0FBYyxHQUE2QixDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RFLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQ25FLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUVNLFNBQVMsa0JBQWtCLENBQUMsV0FBbUIsRUFBRSxPQUFlLEVBQUUsaUJBQXlCLEVBQUUsV0FBbUI7SUFDbkgsSUFBSSxDQUFDLEdBQU8sNkNBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO0lBRTFDLElBQUksU0FBUyxHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNuQyxJQUFJLGlCQUFpQixHQUFHLGVBQWUsQ0FBQztRQUN4QyxJQUFJLFNBQVMsR0FBZSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNsQyxLQUFLLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxCLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUMsRUFBRSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFFMUIsSUFBSSxLQUFLLEdBQUcsc0VBQXdCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVqRSxPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLGFBQWEsRUFBQyxDQUFDO0FBQ3BFLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFLLEVBQUUsV0FBbUIsRUFBRSxLQUFjO0lBQzNELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUNyQixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNqQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxDQUFLLEVBQUUsWUFBcUI7SUFDaEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7SUFDcEMsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUVELGtHQUFrRztBQUMzRixTQUFTLG1CQUFtQixDQUFDLFdBQW1CLEVBQUUsUUFBZ0IsRUFBRSxXQUFnQixFQUFFLGdCQUFxQixFQUM5RSxXQUFtQjtJQUNuRCxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFFMUMsSUFBSSxNQUFrQixDQUFDO0lBQ3ZCLElBQUksa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUM7SUFDMUMsSUFBSSxTQUFTLEdBQUcsdURBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ25DLElBQUksU0FBUyxHQUFlLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2QyxTQUFTLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QixLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25DLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEIsTUFBTSxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBCLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUMsRUFBRSxRQUFRLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7UUFDMUIsSUFBSSxjQUFjLEdBQUcsK0RBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsYUFBYTtZQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxhQUFhO1FBQ2IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQTRDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRXRGLElBQUksT0FBTyxHQUFtQixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUNsRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQ2hDLFdBQVcsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDMUU7S0FDSjtJQUVELE9BQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsYUFBYSxFQUFDLENBQUM7QUFDckUsQ0FBQztBQUVNLFNBQVMscUJBQXFCLENBQUMsV0FBbUIsRUFBRSxTQUFpQixFQUFFLFdBQW1CO0lBQzdGLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUUxQyxJQUFJLFdBQVcsR0FBRyxtRUFBcUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEUsSUFBSSxvQkFBb0IsR0FBRyxrQkFBa0IsQ0FBQztJQUM5QyxJQUFJLFNBQVMsR0FBRyx1REFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDbkMsSUFBSSxTQUFTLEdBQWUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pDLFNBQVMsQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixTQUFTLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQ3hCLDZDQUFNLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRTtnQkFDakQsMEZBQTBGO2dCQUMxRixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO29CQUNuQixpRUFBbUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUN0QyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLDBEQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO29CQUM3RSw2Q0FBTSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3QztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN6QyxTQUFTLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkMsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQyxFQUFFLHNFQUF3QixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXJELElBQUksZ0JBQWdCLEdBQUcscUVBQXVCLENBQUMsV0FBVyxFQUFFLDZDQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN0RyxJQUFJLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7SUFDeEMsSUFBSSxXQUFXLEdBQUcsUUFBUSxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLGlCQUFpQjtRQUM5RCxvQkFBb0IsR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyw2Q0FBTSxDQUFDLFdBQVc7UUFDbkUsSUFBSSxHQUFHLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDakMsSUFBSSxZQUFZLEdBQUcsc0VBQXdCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RSxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFFTSxTQUFTLHFCQUFxQixDQUFDLFdBQW1CLEVBQUUsT0FBZSxFQUFFLGlCQUF5QixFQUFFLFdBQW1CLEVBQ3BGLE9BQWUsQ0FBQyxFQUFFLE9BQWUsRUFBRTtJQUNyRSxJQUFJLENBQUMsR0FBTyw2Q0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFFMUMsSUFBSSxRQUFvQixDQUFDO0lBQ3pCLElBQUksU0FBUyxHQUFHLHVEQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNuQyxJQUFJLG9CQUFvQixHQUFHLGtCQUFrQixDQUFDO1FBQzlDLElBQUksU0FBUyxHQUFlLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN6QyxTQUFTLENBQUMsUUFBUSxDQUFDLDZDQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QixLQUFLLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25DLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEIsUUFBUSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDMUQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixRQUFRLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDeEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0IsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM1QyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUU1QyxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDLEVBQUUsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBRTFCLE9BQU8sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsYUFBYSxFQUFDLENBQUM7QUFDdkUsQ0FBQztBQUVNLFNBQVMsZUFBZSxDQUFDLFdBQW1CLEVBQUUsVUFBa0IsRUFBRSxRQUFnQixFQUFFLFVBQW1DLEVBQzlGLFdBQW1CO0lBQy9DLElBQUksQ0FBQyxHQUFPLDZDQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUUxQyxJQUFJLFFBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ25DLElBQUksV0FBVyxHQUFHLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDekMsSUFBSSxTQUFTLEdBQUcsdURBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ25DLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLFNBQVMsR0FBZSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25DLFNBQVMsQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtZQUNyQixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUMzQixLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9CLEtBQUssQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhCLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUVoQixJQUFJLEtBQUssR0FBZSxzRUFBd0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdFLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFeEIsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVNLFNBQVMscUJBQXFCLENBQUMsV0FBbUIsRUFBRSxVQUFrQixFQUFFLFNBQWtCLEVBQUUsV0FBbUI7SUFFbEgsSUFBSSxDQUFDLEdBQU8sNkNBQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO0lBRTFDLElBQUksUUFBb0IsQ0FBQztJQUN6QixJQUFJLFNBQVMsR0FBRyx1REFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDbkMsSUFBSSxvQkFBb0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM5QyxJQUFJLFNBQVMsR0FBZSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDekMsU0FBUyxDQUFDLFFBQVEsQ0FBQyw2Q0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhCLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxRQUFRLENBQUMsNkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEIsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQyxFQUFFLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQztJQUU3QixPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLGFBQWEsRUFBQyxDQUFDO0FBQ3ZFLENBQUM7QUFFRCxJQUFZLEtBR1g7QUFIRCxXQUFZLEtBQUs7SUFDYiwrQkFBRztJQUNILDZCQUFFO0FBQ04sQ0FBQyxFQUhXLEtBQUssS0FBTCxLQUFLLFFBR2hCO0FBRU0sU0FBUyxjQUFjLENBQUMsT0FBZ0I7SUFDM0MsSUFBSSxPQUFPLEVBQUU7UUFDVCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDcEI7U0FBTTtRQUNILE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQztLQUNuQjtBQUNMLENBQUM7QUFFRCw2RkFBNkY7QUFDdEYsU0FBUyxvQ0FBb0MsQ0FBQyxDQUFLLEVBQUUsaUJBQTZCO0lBQ3JGLGFBQWE7SUFDYixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELGFBQWE7SUFDYixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFFMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUMxQixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3RTtBQUNMLENBQUM7QUFFRCw2RkFBNkY7QUFDdEYsU0FBUyxrQkFBa0IsQ0FBQyxpQkFBNkI7SUFDNUQsYUFBYTtJQUNiLGlCQUFpQixDQUFDLHNCQUFzQixHQUFHO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0FBQ0wsQ0FBQztBQUVNLFNBQVMsaUJBQWlCLENBQUMsQ0FBSyxFQUFFLGlCQUE2QixFQUFFLFlBQXNCO0lBQzFGLGFBQWE7SUFDYixJQUFJLElBQUksR0FBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMvRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUM1QztJQUVELGFBQWE7SUFDYixJQUFJLE1BQU0sR0FBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNuRSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUM5QztJQUVELGFBQWE7SUFDYixJQUFJLE1BQU0sR0FBa0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNwRSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUM5QztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM1V0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUU7QUFFcEM7QUFFTjtBQUUwQjtBQUNJO0FBQ047QUFFMUMsU0FBUyxrQkFBa0IsQ0FBQyxLQUFVLEVBQUUsWUFBaUI7SUFDNUQsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3JELENBQUM7QUFFTSxTQUFTLFdBQVcsQ0FBQyxLQUFVO0lBQ2xDLE9BQU8sT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDO0FBQ3hDLENBQUM7QUFFTSxTQUFTLHlCQUF5QixDQUFDLE1BQWdCO0lBQ3RELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsMkRBQVMsQ0FBQyxPQUFPLENBQUM7U0FDMUM7S0FDSjtBQUNMLENBQUM7QUFFTSxTQUFTLGlDQUFpQyxDQUFDLE1BQWdCO0lBQzlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLFFBQVEsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtnQkFDdkIsS0FBSywwREFBUSxDQUFDLElBQUk7b0JBQ2QsTUFBTTtnQkFDVixLQUFLLDBEQUFRLENBQUMsSUFBSTtvQkFDZCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLDBEQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsdUJBQXVCO29CQUMxRCxNQUFNO2dCQUNWLEtBQUssMERBQVEsQ0FBQyxTQUFTO29CQUNuQixNQUFNO2dCQUNWLEtBQUssMERBQVEsQ0FBQyxJQUFJO29CQUNkLE1BQU07Z0JBQ1YsS0FBSywwREFBUSxDQUFDLFNBQVM7b0JBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsMERBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyx1QkFBdUI7b0JBQy9ELE1BQU07Z0JBQ1YsS0FBSywwREFBUSxDQUFDLE1BQU07b0JBQ2hCLE1BQU07YUFDYjtTQUNKO0tBQ0o7QUFDTCxDQUFDO0FBRU0sU0FBUyxlQUFlLENBQUMsV0FBbUIsRUFBRSxNQUFjO0lBQy9ELElBQUksWUFBWSxHQUFHLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7SUFDdkcsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUVNLFNBQVMsb0JBQW9CLENBQUMsU0FBaUI7SUFDbEQsT0FBTyw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUNsRSxDQUFDO0FBRU0sU0FBUyxxQkFBcUIsQ0FBQyxTQUFpQjtJQUNuRCxJQUFJLE9BQU8sR0FBK0QsRUFBRSxDQUFDO0lBRTdFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRTtRQUNoQixJQUFJLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7U0FDdkY7S0FDSjtTQUFNO1FBQ0gsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMscUZBQXFGLENBQUMsQ0FBQztZQUNyRyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGtDQUFrQztZQUM3RSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUN0RztLQUNKO0lBRUQsNkNBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDekIsQ0FBQztBQUVNLFNBQVMsbUJBQW1CLENBQUMsV0FBbUIsRUFBRSxTQUFpQixFQUFFLFVBQXNCO0lBQzlGLElBQUksWUFBWSxHQUFHLDRCQUE0QixDQUFDLFdBQVcsRUFBRSw2Q0FBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkcsNkNBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDcEUsNkNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDekIsQ0FBQztBQUVELDBCQUEwQjtBQUNuQixTQUFTLGlCQUFpQixDQUFDLENBQU07SUFDcEMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDL0UsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFNBQVMsNEJBQTRCLENBQUMsV0FBbUIsRUFBRSxRQUFvRTtJQUMzSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEtBQUssV0FBVyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7S0FDSjtJQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDO0FBRU0sU0FBUyxxQkFBcUIsQ0FBQyxXQUFtQixFQUFFLFNBQWlCO0lBQ3hFLE9BQU8scUJBQXFCLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUNwRSxDQUFDO0FBRU0sU0FBUyx3QkFBd0IsQ0FBQyxXQUFtQixFQUFFLFNBQWlCO0lBQzNFLE9BQU8scUJBQXFCLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUNwRSxDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxXQUFtQixFQUFFLFNBQWlCO0lBQ2pFLE9BQU8sT0FBTyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUNoRSxDQUFDO0FBRU0sU0FBUyxZQUFZLENBQUMsQ0FBSztJQUM5QixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUMzRCxDQUFDO0FBRU0sU0FBUyx3QkFBd0IsQ0FBQyxjQUFxQztJQUMxRSxJQUFJLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxJQUFJLEdBQXdCLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7S0FDbkg7SUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDckMsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUVNLFNBQVMsa0JBQWtCLENBQUMsQ0FBTyxFQUFFLENBQU87SUFDL0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLElBQUksS0FBSyxJQUFJLEtBQUssRUFBRTtRQUNoQixJQUFJLEtBQUssR0FBRyxLQUFLLEVBQUU7WUFDZixPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2I7YUFBTTtZQUNILE9BQU8sQ0FBQyxDQUFDO1NBQ1o7S0FDSjtTQUFNO1FBQ0gsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRTtZQUM1QixPQUFPLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDcEU7YUFBTTtZQUNILElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7Z0JBQ2xCLE9BQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQzthQUMxQjtTQUNKO0tBQ0o7SUFDRCxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2QixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsVUFBa0I7SUFDdEMsUUFBUSxVQUFVLEVBQUU7UUFDaEIsS0FBSyxVQUFVO1lBQ1gsT0FBTyxDQUFDLENBQUM7UUFDYixLQUFLLE1BQU07WUFDUCxPQUFPLENBQUMsQ0FBQztRQUNiLEtBQUssUUFBUTtZQUNULE9BQU8sQ0FBQyxDQUFDO1FBQ2IsS0FBSyxNQUFNO1lBQ1AsT0FBTyxDQUFDLENBQUM7UUFDYixLQUFLLFdBQVc7WUFDWixPQUFPLENBQUMsQ0FBQztRQUNiLEtBQUssTUFBTTtZQUNQLE9BQU8sQ0FBQyxDQUFDO1FBQ2I7WUFDSSxPQUFPLENBQUMsQ0FBQztLQUNoQjtBQUNMLENBQUM7QUFFTSxTQUFTLHdCQUF3QixDQUFDLEdBQWUsRUFBRSxPQUFlO0lBQ3JFLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQyxJQUFJLElBQUksR0FBUyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDMUIsYUFBYTtZQUNiLE9BQU8sSUFBSSwwQ0FBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0tBQ0o7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRU0sU0FBUyx1QkFBdUIsQ0FBQyxXQUFtQixFQUFFLFFBQW9FO0lBQzdILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxXQUFXLEVBQUU7WUFDekMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7S0FDSjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFFTSxTQUFTLG9CQUFvQixDQUFDLFNBQWlCO0lBQ2xELElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUN6QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkIsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLElBQUksYUFBYSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7SUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxJQUFJLEtBQUssR0FBVyxFQUFFLENBQUM7UUFDdkIsSUFBSSxNQUFNLEVBQUU7WUFDUixLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNQLElBQUksRUFBRSwwREFBUSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXO2dCQUM5RSxLQUFLLEVBQUUsMkRBQVMsQ0FBQyxPQUFPO2FBQzNCLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLDBEQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsR0FBRyxJQUFJO2dCQUNoRixLQUFLLEVBQUUsMkRBQVMsQ0FBQyxPQUFPO2FBQzNCLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNQLElBQUksRUFBRSwwREFBUSxDQUFDLE1BQU07Z0JBQ3JCLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixhQUFhLEVBQUUsV0FBVztnQkFDMUIsS0FBSyxFQUFFLDJEQUFTLENBQUMsT0FBTzthQUMzQixDQUFDLENBQUM7U0FDTjtRQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2pCLFdBQVcsSUFBSSxhQUFhLENBQUM7S0FDaEM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRU0sU0FBUyxvQkFBb0IsQ0FBQyw0QkFBb0MsRUFBRSxNQUFjO0lBQ3JGLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJO1FBQzdDLDRCQUE0QixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUU7UUFDdEUsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsMkJBQTJCO0tBQ3RFO0lBQ0QsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSTtRQUM5RSw0QkFBNEIsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUU7UUFDeEcsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQywwQkFBMEI7S0FDdEc7SUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyRCxJQUFJLFFBQVEsR0FBYSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUM1RCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEdBQUcsNEJBQTRCLElBQUksNEJBQTRCLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDM0csT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7S0FDSjtJQUNELE9BQU8seUJBQXlCLENBQUM7QUFDckMsQ0FBQztBQUVNLFNBQVMsWUFBWSxDQUFDLFFBQWtCLEVBQUUsU0FBb0I7SUFDakUsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssS0FBSyx1REFBYSxDQUFDLGdCQUFnQjtRQUNqRSxRQUFRLENBQUMsS0FBSyxLQUFLLHVEQUFhLENBQUMsWUFBWSxDQUFDO0lBQ2xELElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEtBQUssMERBQWMsQ0FBQyxRQUFRLENBQUM7SUFDakUsT0FBTyxhQUFhLElBQUksY0FBYyxDQUFDO0FBQzNDLENBQUM7QUFFTSxTQUFTLGtCQUFrQixDQUFDLE1BQWdCLEVBQUUsU0FBb0I7SUFDckUsNkNBQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSwrREFBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsNkNBQU0sQ0FBQyxNQUFNLEVBQUUsNkNBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqRyxDQUFDOzs7Ozs7Ozs7Ozs7QUNoUUQsb0I7Ozs7Ozs7Ozs7O0FDQUEsc0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2NyaXB0cy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nRW50cnksIEFjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeUZlZWRiYWNrRmxhc2gge1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1Db2xvcmVkQWNjdXJhY3lSYW5rczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZmxhc2hEdXJhdGlvbkluU2Vjb25kczogbnVtYmVyID0gMC4xO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeUNvbG9yczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsIGNvbmZpZzogQ29uZmlnLCBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLm51bUNvbG9yZWRBY2N1cmFjeVJhbmtzID0gdGhpcy5nZXROdW1Db2xvcmVkQWNjdXJhY3lSYW5rcyh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5Q29sb3JzID0gW1xyXG4gICAgICAgICAgICBbMTc4LCA5NCwgMjQ3LCAxODBdLFxyXG4gICAgICAgICAgICBbMzAsIDIxNywgMTI0LCAxNjBdLFxyXG4gICAgICAgICAgICBbMTk2LCAxOTksIDMwLCAxNDBdLFxyXG4gICAgICAgICAgICBbMjQ1LCAyMTMsIDIyMSwgMTIwXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgd2hpbGUgKHRoaXMubnVtQ29sb3JlZEFjY3VyYWN5UmFua3MgPiB0aGlzLmFjY3VyYWN5Q29sb3JzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5Q29sb3JzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBbdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgMTAwXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJhbmRvbUludChtYXg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Rmxhc2hGb3JUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdGbGFzaEZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkgPSB0aGlzLmdldFRyYWNrTW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkodHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmxhc2hIYXBwZW5pbmcoY3VycmVudFRpbWVJblNlY29uZHMsIG1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSkge1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclkgPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJZKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgICAgIGxldCBmbGFzaENvbG9yOiBwNS5Db2xvciA9IHRoaXMuZ2V0Rmxhc2hDb2xvcihtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSk7XHJcbiAgICAgICAgICAgIGxldCBlbGFwc2VkVGltZUluU2Vjb25kcyA9IHRoaXMuZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMsIG1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Rmxhc2goZWxhcHNlZFRpbWVJblNlY29uZHMsIGNlbnRlclgsIGNlbnRlclksIGZsYXNoQ29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzRmxhc2hIYXBwZW5pbmcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgYWNjdXJhY3lFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSkge1xyXG4gICAgICAgIGlmIChhY2N1cmFjeUV2ZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjaWVzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBpZiAoYWNjdXJhY2llc1swXS5sb3dlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICAgICAgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8IGFjY3VyYWNpZXNbMF0udXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEhhbmRsZSBtaXNzIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWNjdXJhY2llc1thY2N1cmFjaWVzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzID49IGFjY3VyYWNpZXNbYWNjdXJhY2llcy5sZW5ndGggLSAxXS5sb3dlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gSGFuZGxlIGJvbyBpZiBpdCBleGlzdHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlbGFwc2VkVGltZUluU2Vjb25kcyA9IHRoaXMuZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMsIGFjY3VyYWN5RXZlbnQpO1xyXG4gICAgICAgIGlmIChlbGFwc2VkVGltZUluU2Vjb25kcyA+IEFjY3VyYWN5RmVlZGJhY2tGbGFzaC5mbGFzaER1cmF0aW9uSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgYWNjdXJhY3lFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZUluU2Vjb25kcyAtIGFjY3VyYWN5RXZlbnQudGltZUluU2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRyYWNrTW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkodHJhY2tOdW1iZXI6IG51bWJlcik6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkge1xyXG4gICAgICAgIGxldCB0cmFjayA9IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBpZiAodHJhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdW3RyYWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldEZsYXNoQ29sb3IoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjaWVzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBsZXQgYWNjdXJhY3lSYW5rID0gdGhpcy5nZXRBY2N1cmFjeVJhbmsoYWNjdXJhY3lFdmVudCwgYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IGNvbG9yVmFsdWVzID0gdGhpcy5hY2N1cmFjeUNvbG9yc1thY2N1cmFjeVJhbmsgLSAxXTtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICByZXR1cm4gcC5jb2xvcihjb2xvclZhbHVlc1swXSwgY29sb3JWYWx1ZXNbMV0sIGNvbG9yVmFsdWVzWzJdLCBjb2xvclZhbHVlc1szXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXROdW1Db2xvcmVkQWNjdXJhY3lSYW5rcyhhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgbGV0IGJlc3RBY2N1cmFjeUluZGV4ID0gdGhpcy5nZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgbnVtUmFua3MgPSAxOyAvLyBzdGFydCB3aXRoIDEgYmVjYXVzZSB3ZSBhdCBsZWFzdCBoYXZlIHRoZSBiZXN0IHJhbmtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXggKyAxOyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgIT09IHVuZGVmaW5lZCAmJiBhY2N1cmFjeS51cHBlckJvdW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG51bVJhbmtzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bVJhbmtzXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IDAgJiYgMCA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIGEgcmFuayB3aGVyZSAxIGlzIHRoZSBiZXN0XHJcbiAgICBwcml2YXRlIGdldEFjY3VyYWN5UmFuayhhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5LCBhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCAwKSB7XHJcbiAgICAgICAgICAgIGFjY3VyYWNpZXMgPSB0aGlzLmdldFJldmVyc2VkKGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50UmFuayA9IDE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlc3RBY2N1cmFjeUluZGV4OyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgJiYgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFJhbms7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFJhbmsrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZXZlcnNlZChhcnJheTogYW55W10pIHtcclxuICAgICAgICBsZXQgYXJyYXlDb3B5OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBhcnJheUNvcHkucHVzaChhcnJheVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheUNvcHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Rmxhc2goZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBmbGFzaFNpemU6IG51bWJlciA9IHRoaXMuZ2V0Rmxhc2hTaXplKGVsYXBzZWRUaW1lSW5TZWNvbmRzLCBBY2N1cmFjeUZlZWRiYWNrRmxhc2guZmxhc2hEdXJhdGlvbkluU2Vjb25kcyk7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgcC5maWxsKGNvbG9yKTtcclxuICAgICAgICAvLyBwLmZpbGwoMjU1LCAyNTUsIDI1NSwgMTUwKTtcclxuICAgICAgICBwLm5vU3Ryb2tlKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3U3RhcihwLCAwLCAwLCBmbGFzaFNpemUsIGZsYXNoU2l6ZSAqIDAuNCwgNCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEZsYXNoU2l6ZShlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyLCBmbGFzaER1cmF0aW9uSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZmxhc2hDb21wbGV0aW9uUmF0aW8gPSBlbGFwc2VkVGltZUluU2Vjb25kcyAvIGZsYXNoRHVyYXRpb25JblNlY29uZHM7XHJcbiAgICAgICAgbGV0IG1pblNpemUgPSAwO1xyXG4gICAgICAgIGxldCBtYXhTaXplID0gdGhpcy5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJwb2xhdGUobWluU2l6ZSwgbWF4U2l6ZSwgZmxhc2hDb21wbGV0aW9uUmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW50ZXJwb2xhdGUobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlciwgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyYXRpbyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGlvID4gMCAmJiByYXRpbyA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlICsgKG1heFZhbHVlIC0gbWluVmFsdWUpICogcmF0aW87XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdTdGFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgcmFkaXVzMTogbnVtYmVyLCByYWRpdXMyOiBudW1iZXIsIG5wb2ludHM6IG51bWJlcikge1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuYW5nbGVNb2RlKHAuUkFESUFOUyk7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gcC5UV09fUEkgLyBucG9pbnRzO1xyXG4gICAgICAgIGxldCBoYWxmQW5nbGUgPSBhbmdsZSAvIDIuMDtcclxuICAgICAgICBwLmJlZ2luU2hhcGUoKTtcclxuICAgICAgICBmb3IgKGxldCBhID0gMDsgYSA8IHAuVFdPX1BJOyBhICs9IGFuZ2xlKSB7XHJcbiAgICAgICAgICAgIGxldCBzeCA9IGNlbnRlclggKyBwLmNvcyhhKSAqIHJhZGl1czI7XHJcbiAgICAgICAgICAgIGxldCBzeSA9IGNlbnRlclkgKyBwLnNpbihhKSAqIHJhZGl1czI7XHJcbiAgICAgICAgICAgIHAudmVydGV4KHN4LCBzeSk7XHJcbiAgICAgICAgICAgIHN4ID0gY2VudGVyWCArIHAuY29zKGEgKyBoYWxmQW5nbGUpICogcmFkaXVzMTtcclxuICAgICAgICAgICAgc3kgPSBjZW50ZXJZICsgcC5zaW4oYSArIGhhbGZBbmdsZSkgKiByYWRpdXMxO1xyXG4gICAgICAgICAgICBwLnZlcnRleChzeCwgc3kpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwLmVuZFNoYXBlKHAuQ0xPU0UpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lFdmVudH0gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7UGFydGljbGVTeXN0ZW19IGZyb20gXCIuL3BhcnRpY2xlX3N5c3RlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtQ29sb3JlZEFjY3VyYWN5UmFua3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlc0xpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXIgPSAxLjU7XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlU2V0dGluZ3M6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdW107XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlU3lzdGVtczogUGFydGljbGVTeXN0ZW1bXTtcclxuICAgIHByaXZhdGUgZ3Jhdml0eURpcmVjdGlvbjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IGRpc3BsYXlNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMubnVtQ29sb3JlZEFjY3VyYWN5UmFua3MgPSB0aGlzLmdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLnBhcnRpY2xlU2V0dGluZ3MgPSBbXHJcbiAgICAgICAgICAgIFsxNzgsIDk0LCAyNDcsIDMwXSxcclxuICAgICAgICAgICAgWzMwLCAyMTcsIDEyNCwgMjVdLFxyXG4gICAgICAgICAgICBbMTk2LCAxOTksIDMwLCAyMF0sXHJcbiAgICAgICAgICAgIFsyNDUsIDIxMywgMjIxLCAxNV1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLm51bUNvbG9yZWRBY2N1cmFjeVJhbmtzID4gdGhpcy5wYXJ0aWNsZVNldHRpbmdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU2V0dGluZ3MucHVzaChcclxuICAgICAgICAgICAgICAgIFt0aGlzLmdldFJhbmRvbUludCgyNTUpLCB0aGlzLmdldFJhbmRvbUludCgyNTUpLCB0aGlzLmdldFJhbmRvbUludCgyNTUpLCAyMF1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eURpcmVjdGlvbiA9IGNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5Eb3duID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBncmF2aXR5OiBwNS5WZWN0b3IgPSBwLmNyZWF0ZVZlY3RvcigwLCAyMDAwICogdGhpcy5ncmF2aXR5RGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtcy5wdXNoKG5ldyBQYXJ0aWNsZVN5c3RlbShBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzLnBhcnRpY2xlc0xpZmV0aW1lSW5TZWNvbmRzLCBncmF2aXR5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmFuZG9tSW50KG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1t0cmFja051bWJlcl0uZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQYXJ0aWNsZXNGb3JBY2N1cmFjeUV2ZW50KGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBpZiAodGhpcy5pc0V2ZW50Rm9yUGFydGljbGVzKGFjY3VyYWN5RXZlbnQpKSB7XHJcbiAgICAgICAgICAgIGxldCByZWNlcHRvclRpbWVQb3NpdGlvbiA9IGFjY3VyYWN5RXZlbnQudGltZUluU2Vjb25kcyAtIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgLyAxMDAwO1xyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5nZXRJbml0aWFsUG9zaXRpb24ocCwgYWNjdXJhY3lFdmVudC50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsXHJcbiAgICAgICAgICAgICAgICByZWNlcHRvclRpbWVQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsVmVsb2NpdHkgPSBwLmNyZWF0ZVZlY3RvcigwLCAtNTAwICogdGhpcy5ncmF2aXR5RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHBhcnRpY2xlU2V0dGluZ3M6IHtjb2xvcjogcDUuQ29sb3IsIG51bVBhcnRpY2xlczogbnVtYmVyIH0gPSB0aGlzLmdldFBhcnRpY2xlU2V0dGluZ3MoYWNjdXJhY3lFdmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW2FjY3VyYWN5RXZlbnQudHJhY2tOdW1iZXJdLmFkZFJhbmRvbWl6ZWRQYXJ0aWNsZXMoaW5pdGlhbFBvc2l0aW9uLCBpbml0aWFsVmVsb2NpdHksXHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHMsIHBhcnRpY2xlU2V0dGluZ3MubnVtUGFydGljbGVzLCBwYXJ0aWNsZVNldHRpbmdzLmNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbml0aWFsUG9zaXRpb24ocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJZKGNlbnRlclRpbWVJblNlY29uZHMsIGNlbnRlclRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVZlY3RvcihjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzRXZlbnRGb3JQYXJ0aWNsZXMoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjaWVzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBpZiAoYWNjdXJhY2llc1swXS5sb3dlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICAgICAgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8IGFjY3VyYWNpZXNbMF0udXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEhhbmRsZSBtaXNzIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWNjdXJhY2llc1thY2N1cmFjaWVzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzID49IGFjY3VyYWNpZXNbYWNjdXJhY2llcy5sZW5ndGggLSAxXS5sb3dlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gSGFuZGxlIGJvbyBpZiBpdCBleGlzdHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzc3VtZXMgc3ltbWV0cmljYWwgYWNjdXJhY3kgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgZ2V0UGFydGljbGVTZXR0aW5ncyhhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVJhbmsgPSB0aGlzLmdldEFjY3VyYWN5UmFuayhhY2N1cmFjeUV2ZW50LCBhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgcGFydGljbGVTZXR0aW5ncyA9IHRoaXMucGFydGljbGVTZXR0aW5nc1thY2N1cmFjeVJhbmsgLSAxXTtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICByZXR1cm4ge2NvbG9yOiBwLmNvbG9yKHBhcnRpY2xlU2V0dGluZ3NbMF0sIHBhcnRpY2xlU2V0dGluZ3NbMV0sIHBhcnRpY2xlU2V0dGluZ3NbMl0pLFxyXG4gICAgICAgICAgICBudW1QYXJ0aWNsZXM6IHBhcnRpY2xlU2V0dGluZ3NbM119O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzc3VtZXMgc3ltbWV0cmljYWwgYWNjdXJhY3kgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3MoYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IG51bVJhbmtzID0gMTsgLy8gc3RhcnQgd2l0aCAxIGJlY2F1c2Ugd2UgYXQgbGVhc3QgaGF2ZSB0aGUgYmVzdCByYW5rXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlc3RBY2N1cmFjeUluZGV4ICsgMTsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kICE9PSB1bmRlZmluZWQgJiYgYWNjdXJhY3kudXBwZXJCb3VuZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBudW1SYW5rcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1SYW5rc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCAwICYmIDAgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyBhIHJhbmsgd2hlcmUgMSBpcyB0aGUgYmVzdFxyXG4gICAgcHJpdmF0ZSBnZXRBY2N1cmFjeVJhbmsoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCwgYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGlmIChhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgMCkge1xyXG4gICAgICAgICAgICBhY2N1cmFjaWVzID0gdGhpcy5nZXRSZXZlcnNlZChhY2N1cmFjaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJlc3RBY2N1cmFjeUluZGV4ID0gdGhpcy5nZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgY3VycmVudFJhbmsgPSAxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzICYmIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSYW5rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnRSYW5rKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmV2ZXJzZWQoYXJyYXk6IGFueVtdKSB7XHJcbiAgICAgICAgbGV0IGFycmF5Q29weTogYW55W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgYXJyYXlDb3B5LnB1c2goYXJyYXlbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlDb3B5O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZywgQWNjdXJhY3lSZWNvcmRpbmdFbnRyeX0gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnZXRBY2N1cmFjeUV2ZW50TmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5RmVlZGJhY2tUZXh0IHtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNlbnRlclk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgY29uZmlnOiBDb25maWcpIHtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSBjZW50ZXJZO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbGFzdEV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5ID0gdGhpcy5nZXRNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSgpO1xyXG4gICAgICAgIGlmIChsYXN0RXZlbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGltZVNpbmNlTGFzdEV2ZW50ID0gY3VycmVudFRpbWVJblNlY29uZHMgLSBsYXN0RXZlbnQudGltZUluU2Vjb25kcztcclxuICAgICAgICBsZXQgdGV4dFNpemUgPSB0aGlzLmdldEZvbnRTaXplKHRpbWVTaW5jZUxhc3RFdmVudCk7XHJcbiAgICAgICAgaWYgKHRleHRTaXplIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXZlbnROYW1lID0gZ2V0QWNjdXJhY3lFdmVudE5hbWUobGFzdEV2ZW50LmFjY3VyYWN5TWlsbGlzLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5kcmF3RXZlbnRUZXh0KGV2ZW50TmFtZSwgdGV4dFNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkoKTogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSB7XHJcbiAgICAgICAgbGV0IG1vc3RSZWNlbnRUcmFjazogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeVtdID0gW107XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmcubGVuZ3RoOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFjayA9IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICAgICAgaWYgKHRyYWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0RXZlbnRUaW1lID0gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdW3RyYWNrLmxlbmd0aCAtIDFdLnRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdEV2ZW50VGltZSA+IGdyZWF0ZXN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGxhc3RFdmVudFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vc3RSZWNlbnRUcmFjay5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb3N0UmVjZW50VHJhY2tbbW9zdFJlY2VudFRyYWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Rm9udFNpemUodGltZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbWF4Rm9udFNpemUgPSAzMDtcclxuICAgICAgICBpZiAodGltZSA8IDAuMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZSAvIDAuMSAqIG1heEZvbnRTaXplO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aW1lID49IDAuMSAmJiB0aW1lIDwgMC40KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhGb250U2l6ZTtcclxuICAgICAgICB9IGVsc2UgaWYodGltZSA+PSAwLjQgJiYgdGltZSA8IDAuNykge1xyXG4gICAgICAgICAgICByZXR1cm4gKDEgLSAodGltZSAtIDAuNCkgLyAoMC43IC0gMC40KSkgKiBtYXhGb250U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3RXZlbnRUZXh0KHRleHQ6IHN0cmluZywgdGV4dFNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSLCBwLkNFTlRFUik7XHJcbiAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgcC50ZXh0U2l6ZSh0ZXh0U2l6ZSk7XHJcbiAgICAgICAgcC50ZXh0KHRleHQsIHRoaXMuY2VudGVyWCwgdGhpcy5jZW50ZXJZKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7S2V5U3RhdGUsIFBsYXllcktleUFjdGlvbn0gZnJvbSBcIi4vcGxheWVyX2tleV9hY3Rpb25cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0hvbGRNYW5hZ2VyfSBmcm9tIFwiLi9ob2xkX21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lFdmVudCwgQWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge2dldEFjY3VyYWN5RXZlbnROYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3kge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbG93ZXJCb3VuZDogbnVtYmVyO1xyXG4gICAgdXBwZXJCb3VuZDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubG93ZXJCb3VuZCA9IGxvd2VyQm91bmQ7XHJcbiAgICAgICAgdGhpcy51cHBlckJvdW5kID0gdXBwZXJCb3VuZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuICAgIHB1YmxpYyBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudDogKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBjb25maWc6IENvbmZpZywgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlQWNjdXJhY3lFdmVudDogKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5ob2xkTWFuYWdlciA9IGhvbGRNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCA9IGhhbmRsZUFjY3VyYWN5RXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZVBsYXllckFjdGlvbihhY3Rpb246IFBsYXllcktleUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChhY3Rpb24ua2V5U3RhdGUgPT0gS2V5U3RhdGUuRE9XTikge1xyXG4gICAgICAgICAgICB0aGlzLnRyeVRvSGl0Tm90ZShhY3Rpb24uZ2FtZVRpbWUsIGFjdGlvbi50cmFjayk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ua2V5U3RhdGUgPT09IEtleVN0YXRlLlVQKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRNYW5hZ2VyLmlzVHJhY2tIZWxkKGFjdGlvbi50cmFjaykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZE1hbmFnZXIudW5ob2xkVHJhY2soYWN0aW9uLnRyYWNrLCBhY3Rpb24uZ2FtZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlUb1JlbGVhc2VOb3RlKGFjdGlvbi5nYW1lVGltZSwgYWN0aW9uLnRyYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyeVRvSGl0Tm90ZShjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVJbmRleCA9IHRoaXMuZ2V0RWFybGllc3RIaXR0YWJsZVVuaGl0Tm90ZUluZGV4KGN1cnJlbnRUaW1lSW5TZWNvbmRzLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgaWYgKG5vdGVJbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBub3RlOiBOb3RlID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW25vdGVJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChub3RlLnR5cGUgPT09IE5vdGVUeXBlLk5PUk1BTCkge1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IG5vdGUudHlwZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEKSB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhFTEQ7IC8vIHNldCB0aGUgbm90ZSB0byBoZWxkIHNvIGl0IHdvbid0IGNvdW50IGFzIGEgbWlzc1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBub3RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZE1hbmFnZXIuaG9sZFRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNDb25maWd1cmVkRm9yQm9vcygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGdldEFjY3VyYWN5RXZlbnROYW1lKEluZmluaXR5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogSW5maW5pdHksXHJcbiAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBOb3RlVHlwZS5OT05FLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVJhbmdlOiB7IGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciB9ID0gdGhpcy5nZXRBY2N1cmFjeVJhbmdlSW5TZWNvbmRzKCk7XHJcbiAgICAgICAgbGV0IGhpdHRhYmxlVGltZVJhbmdlOiB7IGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciB9ID1cclxuICAgICAgICAgICAgdGhpcy5nZXRIaXR0YWJsZVJhbmdlKGFjY3VyYWN5UmFuZ2UsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgaGl0dGFibGVJbmRleFJhbmdlOiB7IHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IG51bWJlciB9ID1cclxuICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci5nZXROb3Rlc0J5VGltZVJhbmdlKGhpdHRhYmxlVGltZVJhbmdlLmxlYXN0VGltZSwgaGl0dGFibGVUaW1lUmFuZ2UuZ3JlYXRlc3RUaW1lLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWFybGllc3RVbmhpdE5vdGVJbmRleEluUmFuZ2UodHJhY2tOdW1iZXIsIGhpdHRhYmxlSW5kZXhSYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWNjdXJhY3lSYW5nZUluU2Vjb25kcygpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5ncyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IG51bVNldHRpbmdzID0gYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGxlYXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZCA9PSBudWxsID9cclxuICAgICAgICAgICAgYWNjdXJhY3lTZXR0aW5nc1sxXS5sb3dlckJvdW5kIDogYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kO1xyXG4gICAgICAgIGxldCBncmVhdGVzdFRpbWU7XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAxXS51cHBlckJvdW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgZ3JlYXRlc3RUaW1lID0gYWNjdXJhY3lTZXR0aW5nc1tudW1TZXR0aW5ncyAtIDJdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JlYXRlc3RUaW1lID0gYWNjdXJhY3lTZXR0aW5nc1tudW1TZXR0aW5ncyAtIDFdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7bGVhc3RUaW1lOiBsZWFzdFRpbWUgLyAxMDAwLCBncmVhdGVzdFRpbWU6IGdyZWF0ZXN0VGltZSAvIDEwMDB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhpdHRhYmxlUmFuZ2UoYWNjdXJhY3lSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSwgcmVjZXB0b3JUaW1lUG9zaXRpb246IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxlYXN0VGltZTogcmVjZXB0b3JUaW1lUG9zaXRpb24gKyBhY2N1cmFjeVJhbmdlLmxlYXN0VGltZSxcclxuICAgICAgICAgICAgZ3JlYXRlc3RUaW1lOiByZWNlcHRvclRpbWVQb3NpdGlvbiArIGFjY3VyYWN5UmFuZ2UuZ3JlYXRlc3RUaW1lXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVhcmxpZXN0VW5oaXROb3RlSW5kZXhJblJhbmdlKHRyYWNrTnVtYmVyOiBudW1iZXIsIG5vdGVJbmRleFJhbmdlOiB7IHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG5vdGVJbmRleFJhbmdlLnN0YXJ0SW5kZXg7IGkgPCBub3RlSW5kZXhSYW5nZS5lbmRJbmRleE5vdEluY2x1c2l2ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baV0uc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ29uZmlndXJlZEZvckJvb3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5VG9SZWxlYXNlTm90ZShjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVJbmRleCA9IHRoaXMuZ2V0RWFybGllc3RIaXR0YWJsZVVuaGl0Tm90ZUluZGV4KGN1cnJlbnRUaW1lSW5TZWNvbmRzLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgaWYgKG5vdGVJbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBub3RlID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW25vdGVJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChub3RlLnR5cGUgPT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhvbGQgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1bbm90ZUluZGV4IC0gMV07IC8vIGdldCB0aGUgaG9sZCBiZWxvbmdpbmcgdG8gdGhpcyB0YWlsXHJcbiAgICAgICAgICAgICAgICBob2xkLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gY2hhbmdlIHRoZSBob2xkIHN0YXRlIGZyb20gSEVMRCB0byBISVRcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBoaXQgdGhlIHRhaWwgb2YgdGhlIGhvbGRcclxuICAgICAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IChub3RlLnRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcykgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IFwiUmVsZWFzZSBcIiArIGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogbm90ZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgeyAvLyBsZXQgZ28gdG9vIGVhcmx5XHJcbiAgICAgICAgICAgIC8vIENvdWxkIHRoaXMgcmV0dXJuIC0xP1xyXG4gICAgICAgICAgICBsZXQgaG9sZFN0YXJ0SW5kZXggPSB0aGlzLm5vdGVNYW5hZ2VyLmZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl0pO1xyXG4gICAgICAgICAgICBsZXQgaG9sZCA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtob2xkU3RhcnRJbmRleCAtIDFdO1xyXG4gICAgICAgICAgICBsZXQgdGFpbCA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtob2xkU3RhcnRJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChob2xkLnR5cGUgPT0gTm90ZVR5cGUuSE9MRF9IRUFEICYmIHRhaWwudHlwZSA9PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXggLSAxXS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgc3RhcnQgb2YgdGhlIGhvbGRcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtob2xkU3RhcnRJbmRleF0uc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBoaXQgdGhlIHRhaWwgb2YgdGhlIGhvbGRcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBcIlJlbGVhc2UgXCIgKyBnZXRBY2N1cmFjeUV2ZW50TmFtZShJbmZpbml0eSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogSW5maW5pdHksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IE5vdGVUeXBlLk5PTkUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IEl0J3MgcG9zc2libGUgdGhhdCB0aGlzIGlzIHNvbWV0aGluZyBsaWtlIGEgcmFjZSBjb25kaXRpb24gYmV0d2VlbiB0aGUga2V5IGV2ZW50IGFuZCB0aGUgYW5pbWF0aW9uIGxvb3AuIERvbid0IHRocm93IGFuIGVycm9yIGZvciBub3dcclxuICAgICAgICAgICAgICAgIC8vIHRocm93IFwiRXJyb3I6IFJlbGVhc2UgbWlzcyBmYWlsZWQgdG8gdHJpZ2dlciBvbiBub3RlIGluZGV4IFwiICsgKGhvbGRTdGFydEluZGV4IC0gMSkgKyBcIiwgdHJhY2sgaW5kZXggXCIgKyB0cmFja051bWJlciArIFwiIGF0IHRpbWUgXCIgKyBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuXHJcbmV4cG9ydCBlbnVtIEFjY3VyYWN5UmVjb3JkaW5nU3RhdGUge1xyXG4gICAgSU5DT01QTEVURSxcclxuICAgIFJFQURZLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFjY3VyYWN5RXZlbnQge1xyXG4gICAgYWNjdXJhY3lOYW1lOiBzdHJpbmcsXHJcbiAgICB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgdGltZUluU2Vjb25kczogbnVtYmVyLFxyXG4gICAgYWNjdXJhY3lNaWxsaXM6IG51bWJlcixcclxuICAgIG5vdGVUeXBlOiBOb3RlVHlwZVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFjY3VyYWN5UmVjb3JkaW5nRW50cnkge1xyXG4gICAgdGltZUluU2Vjb25kczogbnVtYmVyLFxyXG4gICAgYWNjdXJhY3lNaWxsaXM6IG51bWJlcixcclxuICAgIG5vdGVUeXBlOiBOb3RlVHlwZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lSZWNvcmRpbmcge1xyXG4gICAgcHVibGljIHN0YXRlOiBBY2N1cmFjeVJlY29yZGluZ1N0YXRlO1xyXG4gICAgcHVibGljIHJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZS5JTkNPTVBMRVRFO1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZGluZy5wdXNoKFtdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlY29yZEFjY3VyYWN5RXZlbnQoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nW2FjY3VyYWN5RXZlbnQudHJhY2tOdW1iZXJdLnB1c2goXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGFjY3VyYWN5RXZlbnQudGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzLFxyXG4gICAgICAgICAgICAgICAgbm90ZVR5cGU6IGFjY3VyYWN5RXZlbnQubm90ZVR5cGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEF1ZGlvRmlsZVN0YXRlIHtcclxuICAgIE5PX0FVRElPX0ZJTEUsXHJcbiAgICBET05FX1JFQURJTkcsXHJcbiAgICBCVUZGRVJFRCxcclxuICAgIEVSUk9SLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXVkaW9GaWxlIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogQXVkaW9GaWxlU3RhdGU7XHJcbiAgICBwdWJsaWMgZmlsZTogRmlsZTtcclxuICAgIHB1YmxpYyBibG9iOiBCbG9iXHJcbiAgICBwdWJsaWMgYXVkaW9Tb3VyY2U6IEF1ZGlvQnVmZmVyU291cmNlTm9kZTtcclxuICAgIHB1YmxpYyBhdWRpb0NvbnRleHQ6IEF1ZGlvQ29udGV4dDtcclxuICAgIHB1YmxpYyBhdWRpb0J1ZmZlcjogQXVkaW9CdWZmZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5OT19BVURJT19GSUxFO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkRmlsZShmaWxlOiBwNS5GaWxlKSB7XHJcbiAgICAgICAgdGhpcy5maWxlID0gZmlsZS5maWxlOyAvLyB0aGlzIHVud3JhcHMgdGhlIHA1LkZpbGUgd3JhcHBlciB0byBnZXQgdGhlIG9yaWdpbmFsIERPTSBmaWxlXHJcbiAgICAgICAgdGhpcy5sb2FkQXVkaW9EYXRhKHRoaXMuZmlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRCbG9iKGJsb2I6IEJsb2IpIHtcclxuICAgICAgICB0aGlzLmJsb2IgPSBibG9iO1xyXG4gICAgICAgIHRoaXMubG9hZEF1ZGlvRGF0YSh0aGlzLmJsb2IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZEF1ZGlvRGF0YShhdWRpb0RhdGE6IEZpbGUgfCBCbG9iKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkU291bmRGaWxlKGF1ZGlvRGF0YSwgKChvbkZpbGVSZWFkOiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5ET05FX1JFQURJTkc7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQgPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlY29kZUF1ZGlvRGF0YSg8QXJyYXlCdWZmZXI+b25GaWxlUmVhZC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNvZGVBdWRpb0RhdGEoYXVkaW9EYXRhOiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YShhdWRpb0RhdGEpLnRoZW4oKChidWZmZXI6IEF1ZGlvQnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvQnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aXRoIGRlY29kaW5nIGF1ZGlvIGRhdGFcIiArIGUuZXJyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldER1cmF0aW9uKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1ZGlvU291cmNlLmJ1ZmZlci5kdXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheShkZWxheUluU2Vjb25kczogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2Uuc3RhcnQodGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkZWxheUluU2Vjb25kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5zdG9wKDApO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5ET05FX1JFQURJTkc7XHJcbiAgICAgICAgdGhpcy5yZWNyZWF0ZVNvdXJjZU5vZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlY3JlYXRlU291cmNlTm9kZSgpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIgPSB0aGlzLmF1ZGlvQnVmZmVyO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFNvdW5kRmlsZShcclxuICAgICAgICBmaWxlOiBCbG9iIHwgRmlsZSxcclxuICAgICAgICBsaXN0ZW5lcjogKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiBhbnksXHJcbiAgICAgICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc1xyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XHJcbiAgICAgICAgZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCBsaXN0ZW5lciwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtkZWZhdWx0SWZVbmRlZmluZWR9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtERUZBVUxUX0NPTkZJR30gZnJvbSBcIi4vZGVmYXVsdF9jb25maWdcIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuXHJcbi8qIFN0b3JlcyB1c2VyIHNldHRpbmdzLiBFeHBlY3RlZCBub3QgdG8gY2hhbmdlIGR1cmluZyBwbGF5ICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWcge1xyXG4gICAgcGl4ZWxzUGVyU2Vjb25kOiBudW1iZXI7XHJcbiAgICByZWNlcHRvcllQZXJjZW50OiBudW1iZXI7XHJcbiAgICBzY3JvbGxEaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbjtcclxuICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM6IG51bWJlcjtcclxuICAgIGFjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W107XHJcbiAgICBwYXVzZUF0U3RhcnRJblNlY29uZHM6IG51bWJlcjtcclxuICAgIGtleUJpbmRpbmdzOiBNYXA8bnVtYmVyLCBLZXlCaW5kaW5nW10+O1xyXG4gICAgZ2FtZUFyZWFIZWlnaHQ6IG51bWJlcjtcclxuICAgIGdhbWVBcmVhV2lkdGg6IG51bWJlcjtcclxuICAgIG5vdGVTaXplOiBudW1iZXI7XHJcbiAgICBxdWl0S2V5OiBudW1iZXI7XHJcbiAgICBpc0FjY3VyYWN5Rmxhc2hFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpc0FjY3VyYWN5VGV4dEVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpc0hvbGRQYXJ0aWNsZXNFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaXNIb2xkR2xvd0VuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXJnczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsc1BlclNlY29uZD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICByZWNlcHRvcllQZXJjZW50PzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbERpcmVjdGlvbj86IFNjcm9sbERpcmVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5U2V0dGluZ3M/OiBBY2N1cmFjeVtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdXNlQXRTdGFydEluU2Vjb25kcz86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBrZXlCaW5kaW5ncz86IE1hcDxudW1iZXIsIEtleUJpbmRpbmdbXT4sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZUFyZWFIZWlnaHQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZUFyZWFXaWR0aD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBub3RlU2l6ZT86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBxdWl0S2V5PzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWNjdXJhY3lGbGFzaEVuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0FjY3VyYWN5VGV4dEVuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzSG9sZFBhcnRpY2xlc0VuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzSG9sZEdsb3dFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUFyZWFIZWlnaHQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5nYW1lQXJlYUhlaWdodCwgREVGQVVMVF9DT05GSUcuZ2FtZUFyZWFIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUFyZWFXaWR0aCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmdhbWVBcmVhV2lkdGgsIERFRkFVTFRfQ09ORklHLmdhbWVBcmVhV2lkdGgpO1xyXG4gICAgICAgIHRoaXMucGl4ZWxzUGVyU2Vjb25kID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucGl4ZWxzUGVyU2Vjb25kLCBERUZBVUxUX0NPTkZJRy5waXhlbHNQZXJTZWNvbmQpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsRGlyZWN0aW9uID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3Muc2Nyb2xsRGlyZWN0aW9uLCBERUZBVUxUX0NPTkZJRy5zY3JvbGxEaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAvLyBOT1RFOiBTY3JvbGwgZGlyZWN0aW9uIGFuZCBnYW1lQXJlYUhlaWdodCBtdXN0IGJlIHNldCBCRUZPUkUgc2V0dGluZyByZWNlcHRvcllQb3NpdGlvblxyXG4gICAgICAgIHRoaXMucmVjZXB0b3JZUGVyY2VudCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnJlY2VwdG9yWVBlcmNlbnQsIERFRkFVTFRfQ09ORklHLnJlY2VwdG9yWVBlcmNlbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzLCBERUZBVUxUX0NPTkZJRy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5U2V0dGluZ3MgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5hY2N1cmFjeVNldHRpbmdzLCBERUZBVUxUX0NPTkZJRy5hY2N1cmFjeVNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnBhdXNlQXRTdGFydEluU2Vjb25kcyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnBhdXNlQXRTdGFydEluU2Vjb25kcywgREVGQVVMVF9DT05GSUcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3Mubm90ZVNpemUsIERFRkFVTFRfQ09ORklHLm5vdGVTaXplKTtcclxuICAgICAgICB0aGlzLmtleUJpbmRpbmdzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3Mua2V5QmluZGluZ3MsIERFRkFVTFRfQ09ORklHLmtleUJpbmRpbmdzKTtcclxuICAgICAgICB0aGlzLnF1aXRLZXkgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5xdWl0S2V5LCBERUZBVUxUX0NPTkZJRy5xdWl0S2V5KTtcclxuICAgICAgICB0aGlzLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkLFxyXG4gICAgICAgICAgICBERUZBVUxUX0NPTkZJRy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkKTtcclxuICAgICAgICB0aGlzLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkKTtcclxuICAgICAgICB0aGlzLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNBY2N1cmFjeVRleHRFbmFibGVkKTtcclxuICAgICAgICB0aGlzLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkLFxyXG4gICAgICAgICAgICBERUZBVUxUX0NPTkZJRy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKTtcclxuICAgICAgICB0aGlzLmlzSG9sZEdsb3dFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNIb2xkR2xvd0VuYWJsZWQsIERFRkFVTFRfQ09ORklHLmlzSG9sZEdsb3dFbmFibGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZSgpIHtcclxuICAgICAgICBsZXQgY29uZmlnU3RyaW5nID0gdGhpcy5nZXRDb25maWdBc1N0cmluZygpO1xyXG4gICAgICAgIGxldCBleHBpcmVzID0gdGhpcy5nZXREYXRlT2ZPbmVZZWFyRnJvbU5vdygpO1xyXG4gICAgICAgIGxldCBwYXRoID0gJy8nO1xyXG4gICAgICAgIGxldCBjb29raWVTdHJpbmcgPSBcImNvbmZpZz1cIiArIGVzY2FwZShjb25maWdTdHJpbmcpXHJcbiAgICAgICAgICAgICsgJztwYXRoPScgKyBwYXRoXHJcbiAgICAgICAgICAgICsgJztleHBpcmVzPScgKyBleHBpcmVzLnRvVVRDU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29va2llU3RyaW5nKTtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWVTdHJpbmc7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25maWcgc2F2ZWQgdG8gY29va2llIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENvbmZpZ0FzU3RyaW5nKCkge1xyXG4gICAgICAgIGxldCBzdHJpbmc6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHRoaXMpO1xyXG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKCcsXCJrZXlCaW5kaW5nc1wiOnt9LCcsXHJcbiAgICAgICAgICAgICcsXCJrZXlCaW5kaW5nc1wiOicgKyB0aGlzLnN0cmluZ2lmeUtleUJpbmRpbmdzKCkgKyAnLCcpO1xyXG4gICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkKCk6IENvbmZpZyB7XHJcbiAgICAgICAgbGV0IGNvbmZpZ0Nvb2tpZSA9IENvbmZpZy5nZXRGcm9tQ29va2llKFwiY29uZmlnXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZ0Nvb2tpZSk7XHJcbiAgICAgICAgaWYgKGNvbmZpZ0Nvb2tpZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZ0pTT04gPSBKU09OLnBhcnNlKHVuZXNjYXBlKGNvbmZpZ0Nvb2tpZSkpO1xyXG4gICAgICAgICAgICAgICAgY29uZmlnSlNPTi5rZXlCaW5kaW5ncyA9IG5ldyBNYXAoY29uZmlnSlNPTi5rZXlCaW5kaW5ncyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnOiBDb25maWcgPSBuZXcgQ29uZmlnKGNvbmZpZ0pTT04pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25maWcgbG9hZGVkIGZyb20gY29va2llIVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gdmFsaWQgY29va2llIGZvdW5kLCByZXR1cm5pbmcgZGVmYXVsdCBjb25maWchXCIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29uZmlnKHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERhdGVPZk9uZVllYXJGcm9tTm93KCkge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIDEpO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RyaW5naWZ5S2V5QmluZGluZ3MoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgc3RyaW5nID0gXCJbXCI7XHJcbiAgICAgICAgdGhpcy5rZXlCaW5kaW5ncy5mb3JFYWNoKCh2YWx1ZTogS2V5QmluZGluZ1tdLCBrZXk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBzdHJpbmcgKz0gXCJbXCIrIGtleSArIFwiLFwiICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpICtcIl1cIjtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHN0cmluZyArPSBcIl1cIjtcclxuICAgICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEZyb21Db29raWUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jb29raWVcclxuICAgICAgICAgICAgICAgIC5zcGxpdChcIjsgXCIpXHJcbiAgICAgICAgICAgICAgICAuZmluZChyb3cgPT4gcm93LnN0YXJ0c1dpdGgoa2V5KSlcclxuICAgICAgICAgICAgICAgIC5zcGxpdChcIj1cIilbMV07XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgbGV0IERFRkFVTFRfQ09ORklHID0ge1xyXG4gICAgcGl4ZWxzUGVyU2Vjb25kOiA1NTAsXHJcbiAgICBzY3JvbGxEaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbi5Eb3duLFxyXG4gICAgcmVjZXB0b3JZUGVyY2VudDogMTUsXHJcbiAgICBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzOiAwLFxyXG4gICAgLy8gVGhpcyBpcyBhIHN5bW1ldHJpY2FsIHZlcnNpb24gb2YgRkZSJ3MgYWNjdXJhY3lcclxuICAgIC8vIFRPRE86IEFkZCBhIGxpc3Qgb2YgcHJlc2V0cyB0aGF0IGxpdmUgaW4gdGhlaXIgb3duIGZpbGVcclxuICAgIC8vIFRPRE86IHZhbGlkYXRpb24gb24gYWNjdXJhY3kgc2V0dGluZ3MgdGhhdCBleHBsYWlucyB3aHkgbWlzcyBzaG91bGRuJ3QgaGF2ZSBsb3dlciBib3VuZFxyXG4gICAgYWNjdXJhY3lTZXR0aW5nczogW1xyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIk1pc3NcIiwgbnVsbCwtMTE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBdmVyYWdlXCIsIC0xMTcsIC04MyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiR29vZFwiLCAtODMsIC01MCksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiUGVyZmVjdFwiLCAtNTAsIC0xNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQW1hemluZ1wiLCAtMTcsIDE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJQZXJmZWN0XCIsIDE3LCA1MCksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiR29vZFwiLCA1MCwgODMpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkF2ZXJhZ2VcIiwgODMsIDExNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQm9vXCIsIDExNywgbnVsbClcclxuICAgIF0sXHJcbiAgICBwYXVzZUF0U3RhcnRJblNlY29uZHM6IDAsXHJcbiAgICBrZXlCaW5kaW5nczogbmV3IE1hcCgpLFxyXG4gICAgZ2FtZUFyZWFIZWlnaHQ6IDYwMCxcclxuICAgIGdhbWVBcmVhV2lkdGg6IDQwMCxcclxuICAgIG5vdGVTaXplOiAzMCxcclxuICAgIHF1aXRLZXk6IDI3LCAvLyBRdWl0IGRlZmF1bHRzIHRvIGVzY2FwZSBrZXlcclxuICAgIGlzQWNjdXJhY3lGbGFzaEVuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZDogdHJ1ZSxcclxuICAgIGlzQWNjdXJhY3lUZXh0RW5hYmxlZDogdHJ1ZSxcclxuICAgIGlzSG9sZFBhcnRpY2xlc0VuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0hvbGRHbG93RW5hYmxlZDogdHJ1ZSxcclxufTsiLCJpbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEZWZhdWx0Tm90ZVNraW4ge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3Tm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBub3RlU2l6ZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICBzd2l0Y2ggKG5vdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLkhPTERfSEVBRDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwidlwiLCBjZW50ZXJYLCBjZW50ZXJZICsgNik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5ST0xMX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcInhcIiwgY2VudGVyWCwgY2VudGVyWSArIDYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTUlORTpcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC5jaXJjbGUoY2VudGVyWCwgY2VudGVyWSwgMjQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcIlhcIiwgY2VudGVyWCwgY2VudGVyWSArIDgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBwLm5vRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCI/XCIsIGNlbnRlclgsIGNlbnRlclkgKyA3KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd1JlY2VwdG9yKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBub3RlU2l6ZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLm5vRmlsbCgpO1xyXG4gICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdIb2xkQ29ubmVjdG9yKGNlbnRlclg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGVuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gbm90ZVNpemUgKiAwLjU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIHN0YXJ0WSwgd2lkdGgsIGVuZFkgLSBzdGFydFkpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtEZWZhdWx0Tm90ZVNraW59IGZyb20gXCIuL2RlZmF1bHRfbm90ZV9za2luXCI7XHJcblxyXG5jbGFzcyBOb3RlRGlzcGxheSB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGU7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIHByaXZhdGUgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdHJhY2tOdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSwgc2tldGNoSW5zdGFuY2U6IHA1LCBub3RlU2l6ZTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSBjZW50ZXJZO1xyXG4gICAgICAgIHRoaXMubm90ZVR5cGUgPSBub3RlVHlwZTtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gbm90ZVNpemU7XHJcbiAgICAgICAgdGhpcy50cmFja051bWJlciA9IHRyYWNrTnVtYmVyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzTm90ZURyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdOb3RlKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsXHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlVHlwZSwgdGhpcy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgaWYgKCFpc05vdGVEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd05vdGUodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCwgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVUeXBlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBIb2xkQ29ubmVjdG9yIHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIHN0YXJ0WTogbnVtYmVyO1xyXG4gICAgZW5kWTogbnVtYmVyO1xyXG4gICAgbm90ZVN0YXJ0WTogbnVtYmVyO1xyXG4gICAgbm90ZUVuZFk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGVuZFk6IG51bWJlciwgbm90ZVN0YXJ0WTogbnVtYmVyLCBub3RlRW5kWTogbnVtYmVyLCBza2V0Y2hJbnN0YW5jZTogcDUpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLnN0YXJ0WSA9IHN0YXJ0WTtcclxuICAgICAgICB0aGlzLmVuZFkgPSBlbmRZO1xyXG4gICAgICAgIHRoaXMubm90ZVN0YXJ0WSA9IG5vdGVTdGFydFk7XHJcbiAgICAgICAgdGhpcy5ub3RlRW5kWSA9IG5vdGVFbmRZO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzQ29ubmVjdG9yRHJhd1N1Y2Nlc3NmdWwgPSBnbG9iYWwubm90ZVNraW4uZHJhd0hvbGRDb25uZWN0b3IodGhpcy5jZW50ZXJYLCB0aGlzLnN0YXJ0WSwgdGhpcy5lbmRZLFxyXG4gICAgICAgICAgICB0aGlzLm5vdGVTdGFydFksIHRoaXMubm90ZUVuZFkpO1xyXG4gICAgICAgIGlmICghaXNDb25uZWN0b3JEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd0hvbGRDb25uZWN0b3IodGhpcy5jZW50ZXJYLCB0aGlzLnN0YXJ0WSwgdGhpcy5lbmRZKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlY2VwdG9yIHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIGNlbnRlclk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG4gICAgcHJpdmF0ZSBub3RlU2l6ZTogbnVtYmVyXHJcbiAgICBwcml2YXRlIHRyYWNrTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBza2V0Y2hJbnN0YW5jZTogcDUsIG5vdGVTaXplOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IG5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMudHJhY2tOdW1iZXIgPSB0cmFja051bWJlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc1JlY2VwdG9yRHJhd1N1Y2Nlc3NmdWwgPSBnbG9iYWwubm90ZVNraW4uZHJhd1JlY2VwdG9yKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsXHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgaWYgKCFpc1JlY2VwdG9yRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdSZWNlcHRvcih0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclksIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gZXhwb3J0IGNsYXNzIERpc3BsYXlDb25maWcge1xyXG4vLyAgICAgcHVibGljIG5vdGVTaXplOiBudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgcGl4ZWxzUGVyU2Vjb25kOiBudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgcmVjZXB0b3JZUGVyY2VudDogbnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uO1xyXG4vLyAgICAgcHVibGljIHJlY2VwdG9yU2l6ZXM6IG51bWJlcltdO1xyXG4vL1xyXG4vLyAgICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbi8vICAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGNvbmZpZy5ub3RlU2l6ZTtcclxuLy8gICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbi8vICAgICAgICAgdGhpcy5yZWNlcHRvcllQZXJjZW50ID0gY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbi8vICAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uO1xyXG4vLyAgICAgICAgIHRoaXMucmVjZXB0b3JTaXplcyA9IFtdO1xyXG4vLyAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzLnB1c2goY29uZmlnLm5vdGVTaXplKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbi8qIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBpbnRlcnNlY3Qgd2l0aCB0aGUgdXNlciBDb25maWcsIGJ1dCBhcmUgZXhwZWN0ZWQgdG8gYmUgY2hhbmdlZCBkdXJpbmcgcGxheSAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIERpc3BsYXlDb25maWcge1xyXG4gICAgZ2V0Tm90ZVNpemU6ICgpID0+IG51bWJlcjtcclxuICAgIGdldFBpeGVsc1BlclNlY29uZDogKCkgPT4gbnVtYmVyO1xyXG4gICAgZ2V0UmVjZXB0b3JZUGVyY2VudDogKCkgPT4gbnVtYmVyO1xyXG4gICAgZ2V0U2Nyb2xsRGlyZWN0aW9uOiAoKSA9PiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBnZXRSZWNlcHRvclNpemVzOiAoKSA9PiBudW1iZXJbXTtcclxuICAgIHNldFJlY2VwdG9yU2l6ZTogKHRyYWNrTnVtYmVyOiBudW1iZXIsIHJlY2VwdG9yU2l6ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzcGxheU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIHByaXZhdGUgdG9wTGVmdFg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdG9wTGVmdFk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnLCBza2V0Y2hJbnN0YW5jZTogcDUsIHRvcExlZnRYOiBudW1iZXIgPSAwLFxyXG4gICAgICAgICAgICAgICAgdG9wTGVmdFk6IG51bWJlciA9IDAsIHdpZHRoOiBudW1iZXIgPSAxODAsIGhlaWdodDogbnVtYmVyID0gNDAwKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnID0gZGlzcGxheUNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyA9IDA7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMudG9wTGVmdFggPSB0b3BMZWZ0WDtcclxuICAgICAgICB0aGlzLnRvcExlZnRZID0gdG9wTGVmdFk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IHRoaXMuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UucmVjdCh0aGlzLnRvcExlZnRYLCB0aGlzLnRvcExlZnRZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Tm90ZXNBbmRDb25uZWN0b3JzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmVjZXB0b3JzKCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3Rlc0FuZENvbm5lY3RvcnMoKSB7XHJcbiAgICAgICAgbGV0IGxlYXN0VGltZSA9IHRoaXMuZ2V0TGVhc3RUaW1lKHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBncmVhdGVzdFRpbWUgPSB0aGlzLmdldEdyZWF0ZXN0VGltZSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRyYXdBbGxDb25uZWN0b3JzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lKTtcclxuICAgICAgICB0aGlzLmRyYXdBbGxOb3RlcyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsTm90ZXMobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd05vdGVzSW5UcmFjayhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgaSwgbnVtVHJhY2tzLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZXNJblRyYWNrKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXhSYW5nZSA9IHRoaXMubm90ZU1hbmFnZXIuZ2V0Tm90ZXNCeVRpbWVSYW5nZShsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBub3RlcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXS5zbGljZShub3RlSW5kZXhSYW5nZS5zdGFydEluZGV4LCBub3RlSW5kZXhSYW5nZS5lbmRJbmRleE5vdEluY2x1c2l2ZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdOb3RlKG5vdGVzW2ldLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGUobm90ZTogTm90ZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAobm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgIGxldCB5ID0gdGhpcy5nZXROb3RlQ2VudGVyWShub3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgbmV3IE5vdGVEaXNwbGF5KHgsIHksIG5vdGUudHlwZSwgdGhpcy5za2V0Y2hJbnN0YW5jZSwgdGhpcy5kaXNwbGF5Q29uZmlnLmdldE5vdGVTaXplKCksIHRyYWNrTnVtYmVyLCBudW1UcmFja3MpLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZWFzdFRpbWUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0b3RhbERpc3BsYXlTZWNvbmRzID0gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLyB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UGl4ZWxzUGVyU2Vjb25kKCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lIC0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yWVBlcmNlbnQoKSAvIDEwMCAqIHRvdGFsRGlzcGxheVNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRHcmVhdGVzdFRpbWUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0b3RhbERpc3BsYXlTZWNvbmRzID0gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLyB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UGl4ZWxzUGVyU2Vjb25kKCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lICsgKDEgLSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JZUGVyY2VudCgpIC8gMTAwKSAqIHRvdGFsRGlzcGxheVNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJlY2VwdG9yU3BhY2luZyA9IHRoaXMuZ2V0RGlzcGxheVdpZHRoKCkgLyBudW1UcmFja3MgLSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0Tm90ZVNpemUoKTtcclxuICAgICAgICByZXR1cm4gKDIgKiB0cmFja051bWJlciArIDEpIC8gMiAqICh0aGlzLmRpc3BsYXlDb25maWcuZ2V0Tm90ZVNpemUoKSArIHJlY2VwdG9yU3BhY2luZykgKyB0aGlzLnRvcExlZnRYO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZXNzZW50aWFsbHkgZGVmaW5lcyBhIGNvbnZlcnNpb24gZnJvbSBzZWNvbmRzIHRvIHBpeGVsc1xyXG4gICAgcHVibGljIGdldE5vdGVDZW50ZXJZKG5vdGVUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZVlPZmZzZXQgPSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UGl4ZWxzUGVyU2Vjb25kKCkgKiAobm90ZVRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IHJlY2VwdG9yWU9mZnNldCA9IHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvcllQZXJjZW50KCkgLyAxMDAgKiB0aGlzLmdldERpc3BsYXlIZWlnaHQoKTtcclxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5Q29uZmlnLmdldFNjcm9sbERpcmVjdGlvbigpID09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjZXB0b3JZT2Zmc2V0ICsgbm90ZVlPZmZzZXQgKyB0aGlzLnRvcExlZnRZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERpc3BsYXlIZWlnaHQoKSAtIChyZWNlcHRvcllPZmZzZXQgKyBub3RlWU9mZnNldCkgKyB0aGlzLnRvcExlZnRZO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheUhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBbGxDb25uZWN0b3JzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0cmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdBbGxUcmFja0Nvbm5lY3RvcnMobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUsIHRyYWNrc1tpXSwgaSxcclxuICAgICAgICAgICAgICAgIHRyYWNrcy5sZW5ndGgsIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBbGxUcmFja0Nvbm5lY3RvcnMobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyLCB0cmFjazogTm90ZVtdLCB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVTdGFjazogTm90ZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudE5vdGU6IE5vdGUgPSB0cmFja1tpXTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnRpbWVJblNlY29uZHMgPCBsZWFzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQgfHwgY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuUk9MTF9IRUFEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVN0YWNrLnB1c2goY3VycmVudE5vdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnRpbWVJblNlY29uZHMgPCBncmVhdGVzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQgfHwgY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuUk9MTF9IRUFEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVN0YWNrLnB1c2goY3VycmVudE5vdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0Tm90ZSA9IG5vdGVTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kTm90ZSA9IGN1cnJlbnROb3RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydE5vdGUgIT0gdW5kZWZpbmVkICYmIGVuZE5vdGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUIHx8IHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuSEVMRCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0Nvbm5lY3RvcihzdGFydE5vdGUsIGVuZE5vdGUsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChub3RlU3RhY2subGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQgfHwgY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuUk9MTF9IRUFEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVN0YWNrLnB1c2goY3VycmVudE5vdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0Tm90ZSA9IG5vdGVTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kTm90ZSA9IGN1cnJlbnROb3RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydE5vdGUgIT0gdW5kZWZpbmVkICYmIGVuZE5vdGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUIHx8IHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuSEVMRCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0Nvbm5lY3RvcihzdGFydE5vdGUsIGVuZE5vdGUsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdDb25uZWN0b3Ioc3RhcnROb3RlOiBOb3RlLCBlbmROb3RlOiBOb3RlLCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBsZXQgbm90ZVN0YXJ0WSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkoc3RhcnROb3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICBsZXQgbm90ZUVuZFkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKGVuZE5vdGUudGltZUluU2Vjb25kcywgY3VycmVudFRpbWUpO1xyXG5cclxuICAgICAgICBsZXQgZHJhd1N0YXJ0WTtcclxuICAgICAgICBpZiAoc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5IRUxEKSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFydFkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKE1hdGgubWluKGN1cnJlbnRUaW1lLCBlbmROb3RlLnRpbWVJblNlY29uZHMpLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZHJhd1N0YXJ0WSA9IG5vdGVTdGFydFk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyYXdTdGFydFkgPSB0aGlzLmNsYW1wVmFsdWVUb1JhbmdlKGRyYXdTdGFydFksIHRoaXMudG9wTGVmdFksIHRoaXMudG9wTGVmdFkgKyB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCBkcmF3RW5kWSA9IG5vdGVFbmRZXHJcbiAgICAgICAgZHJhd0VuZFkgPSB0aGlzLmNsYW1wVmFsdWVUb1JhbmdlKGRyYXdFbmRZLCB0aGlzLnRvcExlZnRZLCB0aGlzLnRvcExlZnRZICsgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBuZXcgSG9sZENvbm5lY3RvcihjZW50ZXJYLCBkcmF3U3RhcnRZLCBkcmF3RW5kWSwgbm90ZVN0YXJ0WSwgbm90ZUVuZFksIHRoaXMuc2tldGNoSW5zdGFuY2UpLmRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsYW1wVmFsdWVUb1JhbmdlKHZhbHVlOiBudW1iZXIsIGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodmFsdWUgPCBsb3dlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb3dlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgPiB1cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UmVjZXB0b3JzKCkge1xyXG4gICAgICAgIGxldCBudW1UcmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBuZXcgUmVjZXB0b3IodGhpcy5nZXROb3RlQ2VudGVyWChpLCBudW1UcmFja3MpLCB0aGlzLmdldE5vdGVDZW50ZXJZKHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMsIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSwgdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yU2l6ZXMoKVtpXSwgaSwgbnVtVHJhY2tzKS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuLyogTGV0cyB1cyBjb2RlIHRoZSBET00gVUkgZWxlbWVudHMgYXMgaWYgaXQgd2VyZSBcImltbWVkaWF0ZVwiLCBpLmUuIHN0YXRlbGVzcy5cclxuICogQWxsIHJlZ2lzdGVyZWQgZWxlbWVudHMgYXJlIHJlbW92ZWQgd2hlbiB0aGUgcGFnZSBjaGFuZ2VzXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRE9NV3JhcHBlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWdpc3RyeTogTWFwPHN0cmluZywgcDUuRWxlbWVudD4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgLy8gdW5pcXVlSUQgc2hvdWxkIGJlIHVuaXF1ZSB3aXRoaW4gYSBzY2VuZVxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoY3JlYXRlQ2FsbDogKCkgPT4gcDUuRWxlbWVudCwgdW5pcXVlSWQ6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyeS5oYXModW5pcXVlSWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLnJlZ2lzdHJ5LmdldCh1bmlxdWVJZCksXHJcbiAgICAgICAgICAgICAgICBhbHJlYWR5RXhpc3RzOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVDYWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuc2V0KHVuaXF1ZUlkLCBlbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBhbHJlYWR5RXhpc3RzOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyUmVnaXN0cnkoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyeS5mb3JFYWNoKCh2YWx1ZSwga2V5LCBtYXApID0+IHtcclxuICAgICAgICAgICAgdmFsdWUucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyeS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiByZW1vdmUgd2FzIHN1Y2Nlc3NmdWwsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFbGVtZW50QnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0cnkuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJ5LmdldChpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuZGVsZXRlKGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRoZSBlbGVtZW50IGlmIGZvdW5kLCBvdGhlcndpc2UgcmV0dXJucyB1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZXQoaWQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lNYW5hZ2VyfSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge2dldEFjY3VyYWN5RXZlbnROYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0FjY3VyYWN5QmFycyhwOiBwNSwgYWNjdXJhY3lMYWJlbHM6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCB0ZXh0U2l6ZTogbnVtYmVyLCBiYXJXaWR0aDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXJIZWlnaHQ6IG51bWJlciwgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCb29Gb3JMYXN0QWNjdXJhY3k6IGJvb2xlYW4pIHtcclxuICAgIGxldCBtYXhUZXh0V2lkdGggPSBnZXRNYXhUZXh0V2lkdGgocCwgYWNjdXJhY3lMYWJlbHMsIHRleHRTaXplKTtcclxuICAgIGxldCB0b3RhbE5vdGVzID0gbm90ZU1hbmFnZXIuZ2V0VG90YWxOb3RlcygpO1xyXG4gICAgbGV0IGJhclNwYWNpbmcgPSAxMDtcclxuICAgIGxldCB0b3RhbEhlaWdodCA9IGFjY3VyYWN5TGFiZWxzLmxlbmd0aCAqIGJhckhlaWdodCArIChhY2N1cmFjeUxhYmVscy5sZW5ndGggLSAxKSAqIGJhclNwYWNpbmc7XHJcbiAgICBsZXQgc3RhcnRZID0gKHAuaGVpZ2h0IC0gdG90YWxIZWlnaHQpIC8gMiArIGJhckhlaWdodCAvIDI7XHJcbiAgICBzdGFydFkgKj0gMC44OyAvLyBzaGlmdCB0aGUgcmVzdWx0cyB1cCB0byBtYWtlIHJvb20gZm9yIGV4aXQgYnV0dG9uXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2N1cmFjeUxhYmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeUxhYmVsID0gYWNjdXJhY3lMYWJlbHNbaV07XHJcbiAgICAgICAgbGV0IG51bUFjY3VyYWN5RXZlbnRzID0gZ2V0TnVtQWNjdXJhY3lFdmVudHMoYWNjdXJhY3lMYWJlbCwgYWNjdXJhY3lSZWNvcmRpbmcsIGFjY3VyYWN5TWFuYWdlcik7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRGaWxsZWQgPSBudW1BY2N1cmFjeUV2ZW50cyAvIHRvdGFsTm90ZXM7XHJcblxyXG4gICAgICAgIGlmIChpc0Jvb0Zvckxhc3RBY2N1cmFjeSAmJiBpID09PSBhY2N1cmFjeUxhYmVscy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIGRyYXdBY2N1cmFjeVdpdGhOb0JhcihwLCBjZW50ZXJYLCBzdGFydFkgKyBpICogKGJhckhlaWdodCArIGJhclNwYWNpbmcpLCBhY2N1cmFjeUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgbnVtQWNjdXJhY3lFdmVudHMudG9TdHJpbmcoKSwgdG90YWxOb3Rlcy50b1N0cmluZygpLCB0ZXh0U2l6ZSwgbWF4VGV4dFdpZHRoLCBiYXJXaWR0aCwgYmFySGVpZ2h0LCBwZXJjZW50RmlsbGVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkcmF3QWNjdXJhY3lCYXIocCwgY2VudGVyWCwgc3RhcnRZICsgaSAqIChiYXJIZWlnaHQgKyBiYXJTcGFjaW5nKSwgYWNjdXJhY3lMYWJlbCxcclxuICAgICAgICAgICAgICAgIG51bUFjY3VyYWN5RXZlbnRzLnRvU3RyaW5nKCksIHRvdGFsTm90ZXMudG9TdHJpbmcoKSwgdGV4dFNpemUsIG1heFRleHRXaWR0aCwgYmFyV2lkdGgsIGJhckhlaWdodCwgcGVyY2VudEZpbGxlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROdW1BY2N1cmFjeUV2ZW50cyhhY2N1cmFjeUxhYmVsOiBzdHJpbmcsIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIpIHtcclxuICAgIHJldHVybiBhY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmcucmVkdWNlKChzdW0sIHRyYWNrUmVjb3JkaW5nKSA9PlxyXG4gICAgICAgIHN1bSArIHRyYWNrUmVjb3JkaW5nLmZpbHRlcihhY2N1cmFjeUV2ZW50ID0+XHJcbiAgICAgICAgZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcywgYWNjdXJhY3lNYW5hZ2VyLmNvbmZpZykgPT09IGFjY3VyYWN5TGFiZWwpLmxlbmd0aCwgMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1heFRleHRXaWR0aChwOiBwNSwgdGV4dEFycmF5OiBzdHJpbmdbXSwgdGV4dFNpemU6IG51bWJlcikge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLnRleHRTaXplKHRleHRTaXplKTtcclxuICAgIGxldCBtYXhUZXh0V2lkdGggPSB0ZXh0QXJyYXkubWFwKChzdHJpbmcpID0+IHAudGV4dFdpZHRoKHN0cmluZykpXHJcbiAgICAgICAgLnJlZHVjZSgobWF4V2lkdGgsIHdpZHRoKSA9PiBNYXRoLm1heChtYXhXaWR0aCwgd2lkdGgsIC0xKSk7XHJcbiAgICBwLnBvcCgpO1xyXG4gICAgcmV0dXJuIG1heFRleHRXaWR0aDtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0FjY3VyYWN5QmFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbGFiZWwxOiBzdHJpbmcsIGxhYmVsMjogc3RyaW5nLCBsYWJlbDM6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogbnVtYmVyLCBsYXJnZXN0VGV4dFdpZHRoOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsIGJhckhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRGaWxsZWQ6IG51bWJlcikge1xyXG4gICAgbGV0IHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgPSA4O1xyXG4gICAgbGV0IHRvdGFsV2lkdGggPSBsYXJnZXN0VGV4dFdpZHRoICsgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCArIGJhcldpZHRoO1xyXG4gICAgbGV0IGxhYmVsUmlnaHRtb3N0WCA9IGNlbnRlclggLSB0b3RhbFdpZHRoIC8gMiArIGxhcmdlc3RUZXh0V2lkdGg7XHJcbiAgICBkcmF3UmlnaHRBbGlnbmVkTGFiZWwocCwgbGFiZWxSaWdodG1vc3RYLCBjZW50ZXJZLCBsYWJlbDEsIHRleHRTaXplKTtcclxuXHJcbiAgICBsZXQgYmFyUmlnaHRYID0gY2VudGVyWCArIHRvdGFsV2lkdGggLyAyO1xyXG4gICAgbGV0IGJhckxlZnRYID0gYmFyUmlnaHRYIC0gYmFyV2lkdGg7XHJcbiAgICBsZXQgYmFyQ2VudGVyWCA9IChiYXJMZWZ0WCArIGJhclJpZ2h0WCkgLyAyO1xyXG4gICAgZHJhd1BhcnRpYWxseUZpbGxlZEJhcihwLCBiYXJDZW50ZXJYLCBjZW50ZXJZLCBiYXJXaWR0aCwgYmFySGVpZ2h0LCBwZXJjZW50RmlsbGVkLCB0ZXh0U2l6ZSwgbGFiZWwyLCBsYWJlbDMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UmlnaHRBbGlnbmVkTGFiZWwocDogcDUsIHJpZ2h0bW9zdFg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIHRleHRTaXplOiBudW1iZXIpIHtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICBwLnRleHRTaXplKHRleHRTaXplKTtcclxuICAgIHAudGV4dEFsaWduKHAuUklHSFQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dCh0ZXh0LCByaWdodG1vc3RYLCBjZW50ZXJZKTtcclxuICAgIHAucG9wKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdQYXJ0aWFsbHlGaWxsZWRCYXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudEZpbGxlZDogbnVtYmVyLCB0ZXh0U2l6ZTogbnVtYmVyLCBzdGFydExhYmVsOiBzdHJpbmcsIGVuZExhYmVsOiBzdHJpbmcpIHtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgcC5yZWN0TW9kZShwLkNFTlRFUik7XHJcbiAgICBwLnN0cm9rZShcIndoaXRlXCIpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIGZpbGxlZCBwYXJ0IG9mIHRoZSBiYXJcclxuICAgIHAuZmlsbChcImdyYXlcIik7XHJcbiAgICBwLnJlY3QoY2VudGVyWCAtICh3aWR0aCAqICgxIC0gcGVyY2VudEZpbGxlZCkgLyAyKSwgY2VudGVyWSwgd2lkdGggKiBwZXJjZW50RmlsbGVkLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIG91dGxpbmUgb2YgdGhlIGJhclxyXG4gICAgcC5ub0ZpbGwoKTtcclxuICAgIHAucmVjdChjZW50ZXJYLCBjZW50ZXJZLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBsYWJlbHMgb24gdGhlIGVuZHMgb2YgdGhlIGJhclxyXG4gICAgbGV0IGxhYmVsU2l6ZSA9IDEuNSAqIHRleHRTaXplO1xyXG4gICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICBwLnRleHRTaXplKGxhYmVsU2l6ZSk7XHJcbiAgICBwLnRleHRBbGlnbihwLkxFRlQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChzdGFydExhYmVsLCBjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZICsgMik7XHJcbiAgICBwLnRleHRBbGlnbihwLlJJR0hULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQoZW5kTGFiZWwsIGNlbnRlclggKyB3aWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAucG9wKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdBY2N1cmFjeVdpdGhOb0JhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGxhYmVsMTogc3RyaW5nLCBsYWJlbDI6IHN0cmluZywgbGFiZWwzOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogbnVtYmVyLCBsYXJnZXN0VGV4dFdpZHRoOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsIGJhckhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudEZpbGxlZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCA9IDg7XHJcbiAgICBsZXQgdG90YWxXaWR0aCA9IGxhcmdlc3RUZXh0V2lkdGggKyBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsICsgYmFyV2lkdGg7XHJcbiAgICBsZXQgbGFiZWxSaWdodG1vc3RYID0gY2VudGVyWCAtIHRvdGFsV2lkdGggLyAyICsgbGFyZ2VzdFRleHRXaWR0aDtcclxuICAgIGRyYXdSaWdodEFsaWduZWRMYWJlbChwLCBsYWJlbFJpZ2h0bW9zdFgsIGNlbnRlclksIGxhYmVsMSwgdGV4dFNpemUpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIGFjY3VyYWN5IGNvdW50IGxhYmVsIG9uIHRoZSBsZWZ0IGVuZCBvZiB0aGUgYmFyXHJcbiAgICBsZXQgbGFiZWxTaXplID0gMS41ICogdGV4dFNpemU7XHJcbiAgICBsZXQgYmFyUmlnaHRYID0gY2VudGVyWCArIHRvdGFsV2lkdGggLyAyO1xyXG4gICAgbGV0IGJhckxlZnRYID0gYmFyUmlnaHRYIC0gYmFyV2lkdGg7XHJcbiAgICBsZXQgYmFyQ2VudGVyWCA9IChiYXJMZWZ0WCArIGJhclJpZ2h0WCkgLyAyO1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUobGFiZWxTaXplKTtcclxuICAgIHAudGV4dEFsaWduKHAuTEVGVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KGxhYmVsMiwgYmFyQ2VudGVyWCAtIGJhcldpZHRoIC8gMiwgY2VudGVyWSArIDIpO1xyXG4gICAgcC5wb3AoKTtcclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb2xkR2xvdyB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBnbG93U3RhcnRUaW1lczogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIHN0YXRpYyBkb250RHJhd0ZsYWc6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2xvd1BlcmlvZEluU2Vjb25kczogbnVtYmVyID0gMC4zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlciwgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IGRpc3BsYXlNYW5hZ2VyO1xyXG5cclxuICAgICAgICB0aGlzLmdsb3dTdGFydFRpbWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdsb3dTdGFydFRpbWVzLnB1c2goSG9sZEdsb3cuZG9udERyYXdGbGFnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl0gIT09IEhvbGRHbG93LmRvbnREcmF3RmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxhcHNlZFRpbWUgPSBjdXJyZW50VGltZUluU2Vjb25kcyAtIHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY3VycmVudFRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgICAgIGxldCBnbG93QWxwaGEgPSB0aGlzLmdldEdsb3dBbHBoYShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2xvd0NvbG9yID0gcC5jb2xvcigwLCAyNTUsIDAsIGdsb3dBbHBoYSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2xvd1NpemUgPSB0aGlzLmdldEdsb3dTaXplKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0dsb3cocCwgY2VudGVyWCwgY2VudGVyWSwgZ2xvd1NpemUsIGdsb3dTaXplIC8gMiwgZ2xvd0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdHbG93KHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAubm9TdHJva2UoKTtcclxuICAgICAgICBwLmZpbGwoY29sb3IpO1xyXG4gICAgICAgIHAuZWxsaXBzZShjZW50ZXJYLCBjZW50ZXJZLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R2xvd0FscGhhKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uVGltZSA9IGVsYXBzZWRUaW1lSW5TZWNvbmRzICUgSG9sZEdsb3cuZ2xvd1BlcmlvZEluU2Vjb25kcztcclxuICAgICAgICBsZXQgYW5pbWF0aW9uUmF0aW8gPSBhbmltYXRpb25UaW1lIC8gSG9sZEdsb3cuZ2xvd1BlcmlvZEluU2Vjb25kcztcclxuICAgICAgICByZXR1cm4gdGhpcy5iaUxlcnAoMCwgNTAsIGFuaW1hdGlvblJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdsb3dTaXplKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uVGltZSA9IGVsYXBzZWRUaW1lSW5TZWNvbmRzICUgSG9sZEdsb3cuZ2xvd1BlcmlvZEluU2Vjb25kcztcclxuICAgICAgICBsZXQgYW5pbWF0aW9uUmF0aW8gPSBhbmltYXRpb25UaW1lIC8gSG9sZEdsb3cuZ2xvd1BlcmlvZEluU2Vjb25kcztcclxuICAgICAgICBsZXQgbWF4U2l6ZSA9IHRoaXMuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpTGVycCgwLCBtYXhTaXplLCBhbmltYXRpb25SYXRpbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiaUxlcnAobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlciwgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyYXRpbyA8IDAuNSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZXJwKG1pblZhbHVlLCBtYXhWYWx1ZSwgMSAtIHJhdGlvIC8gMC41KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZXJwKG1pblZhbHVlLCBtYXhWYWx1ZSwgMiAqIHJhdGlvIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGVycChtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWUgKyAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKiByYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXSA9IEhvbGRHbG93LmRvbnREcmF3RmxhZztcclxuICAgIH1cclxufSIsIi8qIFRoaXMgY2xhc3MgaXMgaW50ZW5kZWQgb25seSB0byBiZSB1c2VkIHRvIHN0b3JlIHRoZSBob2xkIHN0YXRlIGZvciBub3RlcyB0aGF0IGNhbiBiZSBoZWxkLiBUaGlzIHNob3VsZG4ndCBiZSB1c2VkXHJcbiAgIGZvciBub3JtYWwgbm90ZXMgb3IgZ2VuZXJhbCBrZXlib2FyZCBzdGF0ZSAqL1xyXG5leHBvcnQgY2xhc3MgSG9sZE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBoZWxkVHJhY2tzOiBib29sZWFuW107XHJcbiAgICBwcml2YXRlIG9uVHJhY2tIb2xkOiAodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM/OiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIG9uVHJhY2tVbmhvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihudW1UcmFja3M6IG51bWJlciwgb25UcmFja0hvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgIG9uVHJhY2tVbmhvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuaGVsZFRyYWNrcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxkVHJhY2tzLnB1c2goZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uVHJhY2tIb2xkID0gb25UcmFja0hvbGQ7XHJcbiAgICAgICAgdGhpcy5vblRyYWNrVW5ob2xkID0gb25UcmFja1VuaG9sZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNUcmFja0hlbGQodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlbGRUcmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl0gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25UcmFja0hvbGQodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5ob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl0gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uVHJhY2tVbmhvbGQodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7UGFydGljbGVTeXN0ZW19IGZyb20gXCIuL3BhcnRpY2xlX3N5c3RlbVwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSG9sZFBhcnRpY2xlcyB7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlU3lzdGVtczogUGFydGljbGVTeXN0ZW1bXTtcclxuICAgIHByaXZhdGUgcHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHM6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGljbGVzTGlmZXRpbWVJblNlY29uZHM6IG51bWJlciA9IDEuNTtcclxuICAgIHByaXZhdGUgc3RhdGljIGRvbnREcmF3RmxhZzogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZVBlcmlvZEluU2Vjb25kczogbnVtYmVyID0gMC4wNTtcclxuICAgIHByaXZhdGUgZ3Jhdml0eURpcmVjdGlvbjogbnVtYmVyXHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyLCBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5RGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLkRvd24gPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IGdyYXZpdHk6IHA1LlZlY3RvciA9IHAuY3JlYXRlVmVjdG9yKDAsIDIwMDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMucHVzaChuZXcgUGFydGljbGVTeXN0ZW0oSG9sZFBhcnRpY2xlcy5wYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kcywgZ3Jhdml0eSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wcy5wdXNoKEhvbGRQYXJ0aWNsZXMuZG9udERyYXdGbGFnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFBhcnRpY2xlc1RvVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbdHJhY2tOdW1iZXJdLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFBhcnRpY2xlc1RvVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSAhPT0gSG9sZFBhcnRpY2xlcy5kb250RHJhd0ZsYWcpIHtcclxuICAgICAgICAgICAgd2hpbGUgKHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdICsgSG9sZFBhcnRpY2xlcy5wYXJ0aWNsZVBlcmlvZEluU2Vjb25kcyA8IGN1cnJlbnRUaW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3VGltZXN0YW1wID0gdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gKyBIb2xkUGFydGljbGVzLnBhcnRpY2xlUGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY2VwdG9yVGltZVBvc2l0aW9uID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5nZXRJbml0aWFsUG9zaXRpb24ocCwgdHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCByZWNlcHRvclRpbWVQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFZlbG9jaXR5ID0gcC5jcmVhdGVWZWN0b3IoMCwgLTUwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1t0cmFja051bWJlcl0uYWRkUmFuZG9taXplZFBhcnRpY2xlcyhpbml0aWFsUG9zaXRpb24sIGluaXRpYWxWZWxvY2l0eSwgbmV3VGltZXN0YW1wLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsIHAuY29sb3IoMCwgMjU1LCAwLCAxNTApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdID0gbmV3VGltZXN0YW1wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW5pdGlhbFBvc2l0aW9uKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjZW50ZXJUaW1lSW5TZWNvbmRzLCBjZW50ZXJUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVWZWN0b3IoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5ob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdID0gSG9sZFBhcnRpY2xlcy5kb250RHJhd0ZsYWc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7U3RlcGZpbGV9IGZyb20gXCIuL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcbmltcG9ydCB7UDVTY2VuZX0gZnJvbSBcIi4vcDVfc2NlbmVcIjtcclxuaW1wb3J0IHtPbmxpbmVQbGF5bGlzdH0gZnJvbSBcIi4vb25saW5lX3BsYXlsaXN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2xvYmFsOiBhbnkgPSB7fTtcclxuZ2xvYmFsLnA1U2NlbmUgPSBuZXcgUDVTY2VuZSgpO1xyXG5nbG9iYWwuY29uZmlnID0gQ29uZmlnLmxvYWQoKTtcclxuZ2xvYmFsLmdsb2JhbENsYXNzID0gXCJnYW1lXCI7XHJcbmdsb2JhbC5vbmxpbmVQbGF5bGlzdCA9IG5ldyBPbmxpbmVQbGF5bGlzdCgpOyIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dldEtleVN0cmluZywgc2V0Q29uZmlnS2V5QmluZGluZ30gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS2V5QmluZGluZyB7XHJcbiAgICB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAga2V5Q29kZTogbnVtYmVyLFxyXG4gICAgc3RyaW5nOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtleUJpbmRpbmdIZWxwZXIge1xyXG4gICAgcHJpdmF0ZSBiaW5kaW5nc1RvQWNxdWlyZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50QmluZGluZ051bWJlcjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJpbmRpbmdzVG9BY3F1aXJlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlID0gYmluZGluZ3NUb0FjcXVpcmU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmluZGluZ051bWJlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJpbmROZXh0KHA6IHA1KSB7XHJcbiAgICAgICAgbGV0IGtleWJpbmRpbmc6IEtleUJpbmRpbmcgPSB7XHJcbiAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyLFxyXG4gICAgICAgICAgICBrZXlDb2RlOiBwLmtleUNvZGUsXHJcbiAgICAgICAgICAgIHN0cmluZzogZ2V0S2V5U3RyaW5nKHApXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXRDb25maWdLZXlCaW5kaW5nKHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIsIHRoaXMuYmluZGluZ3NUb0FjcXVpcmUsIGtleWJpbmRpbmcpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIrKztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIgPj0gdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSkge1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBhY3Rpb25CaW5kaW5nczogTWFwPG51bWJlciwge2tleURvd25BY3Rpb246ICgpID0+IHZvaWQsIGtleVVwQWN0aW9uOiAoKSA9PiB2b2lkfT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocDogcDUpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbkJpbmRpbmdzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBwLmtleVByZXNzZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gLTEgaXMgYSBzcGVjaWFsIGtleUNvZGUgZmxhZyB0aGF0IG1lYW5zIFwiYW55XCIuIFRoaXMgaXMgZXNwZWNpYWxseSB1c2VmdWwgZm9yIHNldHRpbmcgdXAga2V5IGJpbmRpbmdzLlxyXG4gICAgICAgICAgICBsZXQgZ2xvYmFsQWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KC0xKTtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMua2V5RG93bkFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQocC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucy5rZXlEb3duQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVxdWl2YWxlbnQgdG8gZXZlbnQucHJldmVudERlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgcC5rZXlSZWxlYXNlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KHAua2V5Q29kZSk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLmtleVVwQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmtleVVwQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5VG9BY3Rpb24oa2V5Q29kZTogbnVtYmVyLCBrZXlEb3duQWN0aW9uOiAoKSA9PiB2b2lkLCBrZXlVcEFjdGlvbjogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uQmluZGluZ3Muc2V0KGtleUNvZGUsIHtrZXlEb3duQWN0aW9uOiBrZXlEb3duQWN0aW9uLCBrZXlVcEFjdGlvbjoga2V5VXBBY3Rpb259KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRLZXkoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uQmluZGluZ3MuZGVsZXRlKGtleUNvZGUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnZXRNaXNzQm91bmRhcnl9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXNzTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGxhc3RDaGVja2VkTm90ZUluZGljZXM6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudDogKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyLCBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlcy5wdXNoKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5ob2xkTWFuYWdlciA9IGhvbGRNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCA9IGhhbmRsZUFjY3VyYWN5RXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyBBIGxvd2VyQm91bmQgZm9yIG1pc3NlcyBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGlzIHdheSBvZiBkb2luZyBtaXNzZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWxsTWlzc2VkTm90ZXNGb3JUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUFsbE1pc3NlZE5vdGVzRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBpbmRleE9mTGFzdENoZWNrZWROb3RlID0gdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhPZkxhc3RDaGVja2VkTm90ZSA+PSB0cmFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm90ZSA9IHRyYWNrW2luZGV4T2ZMYXN0Q2hlY2tlZE5vdGVdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05vdE1pc3NhYmxlKGN1cnJlbnROb3RlKSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSsrO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb3RlTWlzc2VkQW5kTm90SGFuZGxlZChjdXJyZW50Tm90ZSwgY3VycmVudFRpbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1pc3NlZE5vdGUodHJhY2tOdW1iZXIsIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlc1t0cmFja051bWJlcl0gPSBpbmRleE9mTGFzdENoZWNrZWROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvciBleGFtcGxlOiBub3RlcyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIGhpdCBhcmUgbm90IG1pc3NhYmxlXHJcbiAgICBwcml2YXRlIGlzTm90TWlzc2FibGUobm90ZTogTm90ZSkge1xyXG4gICAgICAgIHJldHVybiBub3RlLnN0YXRlICE9PSBOb3RlU3RhdGUuREVGQVVMVDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTm90ZU1pc3NlZEFuZE5vdEhhbmRsZWQobm90ZTogTm90ZSwgY3VycmVudFRpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBtaXNzQm91bmRhcnkgPSBnZXRNaXNzQm91bmRhcnkoY3VycmVudFRpbWUsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbm90ZS50aW1lSW5TZWNvbmRzIDwgbWlzc0JvdW5kYXJ5ICYmIG5vdGUuc3RhdGUgPT09IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlTWlzc2VkTm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBpbmRleE9mTWlzc2VkTm90ZTogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCBtaXNzZWROb3RlID0gdHJhY2tbaW5kZXhPZk1pc3NlZE5vdGVdO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5uYW1lLFxyXG4gICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiAtSW5maW5pdHksXHJcbiAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICBub3RlVHlwZTogbWlzc2VkTm90ZS50eXBlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWlzc2VkTm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5NSVNTRUQ7XHJcbiAgICAgICAgaWYgKG1pc3NlZE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkTWFuYWdlci5pc1RyYWNrSGVsZCh0cmFja051bWJlcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZE1hbmFnZXIudW5ob2xkVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAvLyBGb3JjZSBhIGhvbGQgcmVsZWFzZSB1cG9uIG1pc3NpbmcgdGhlIHRhaWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobWlzc2VkTm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQpIHtcclxuICAgICAgICAgICAgbGV0IG5leHROb3RlID0gdHJhY2tbaW5kZXhPZk1pc3NlZE5vdGUgKyAxXTtcclxuICAgICAgICAgICAgaWYgKG5leHROb3RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dE5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuTUlTU0VEOyAvLyBNaXNzIHRoZSB0YWlsIHdoZW4geW91IG1pc3MgdGhlIGhlYWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RlTWFuYWdlciB7XHJcbiAgICB0cmFja3M6IE5vdGVbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgICAgICB0aGlzLnRyYWNrcyA9IHRyYWNrcztcclxuICAgICAgICB0aGlzLnJlbW92ZVVuc3VwcG9ydGVkTm90ZVR5cGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVVbnN1cHBvcnRlZE5vdGVUeXBlcygpIHtcclxuICAgICAgICBsZXQgc3VwcG9ydGVkTm90ZVR5cGVzOiBOb3RlVHlwZVtdID0gW05vdGVUeXBlLlRBSUwsIE5vdGVUeXBlLkhPTERfSEVBRCwgTm90ZVR5cGUuTk9STUFMXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMudHJhY2tzLmxlbmd0aDsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IHRoaXMudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm90ZU51bWJlciA9IDA7IG5vdGVOdW1iZXIgPCB0cmFjay5sZW5ndGg7IG5vdGVOdW1iZXIrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdGU6IE5vdGUgPSB0cmFja1tub3RlTnVtYmVyXTtcclxuICAgICAgICAgICAgICAgIGlmICghc3VwcG9ydGVkTm90ZVR5cGVzLmluY2x1ZGVzKG5vdGUudHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjay5zcGxpY2Uobm90ZU51bWJlciwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZU51bWJlci0tOyAvLyBkZWNyZW1lbnQgbm90ZSBudW1iZXIgc28gbmV4dCBpdGVyYXRpb24gaXQgc3RhcnRzIGF0IHRoZSByaWdodCBub3RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90ZXNCeVRpbWVSYW5nZShsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpOiB7IHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IG51bWJlciB9IHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgbGV0IGZpcnN0RmluZFJlc3VsdCA9IHRoaXMuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUobGVhc3RUaW1lLCB0cmFjayk7XHJcbiAgICAgICAgaWYgKGZpcnN0RmluZFJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAtMSwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IC0xfTsgLy8gbm8gbm90ZXMgbGVmdCBhZnRlciBsZWFzdCB0aW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYXN0RmluZFJlc3VsdCA9IHRoaXMuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoZ3JlYXRlc3RUaW1lLCB0cmFjaywgZmlyc3RGaW5kUmVzdWx0KTtcclxuICAgICAgICBpZiAobGFzdEZpbmRSZXN1bHQgPCAwKSB7XHJcbiAgICAgICAgICAgIGxhc3RGaW5kUmVzdWx0ID0gdHJhY2subGVuZ3RoOyAvLyBncmVhdGVzdFRpbWUgZXhjZWVkcyB0aGUgZW5kIG9mIHRoZSBub3Rlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmlyc3RGaW5kUmVzdWx0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0RmluZFJlc3VsdCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAtMSwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IC0xfTsgLy8gaGF2ZW4ndCBzZWVuIGZpcnN0IG5vdGVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogMCwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IGxhc3RGaW5kUmVzdWx0fTsgLy8gbm90ZXMgYXJlIGp1c3Qgc3RhcnRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IGZpcnN0RmluZFJlc3VsdCwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IGxhc3RGaW5kUmVzdWx0fTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBubyB0d28gbm90ZXMgd2lsbCBoYXZlIHRoZSBzYW1lIHRpbWUgaW4gdGhlIHNhbWUgdHJhY2tcclxuICAgIGZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGtleVRpbWU6IG51bWJlciwgdHJhY2s6IE5vdGVbXSwgc2VhcmNoU3RhcnQgPSAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHNlYXJjaFN0YXJ0OyBpIDwgdHJhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRyYWNrW2ldLnRpbWVJblNlY29uZHMgPiBrZXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWFybGllc3ROb3RlKCk6IE5vdGUge1xyXG4gICAgICAgIGxldCBlYXJsaWVzdE5vdGU6IE5vdGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFja3NbaV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrRWFybGllc3ROb3RlOiBOb3RlID0gdGhpcy50cmFja3NbaV1bMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoZWFybGllc3ROb3RlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhcmxpZXN0Tm90ZSA9IHRyYWNrRWFybGllc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlYXJsaWVzdE5vdGUudGltZUluU2Vjb25kcyA+IHRyYWNrRWFybGllc3ROb3RlLnRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXJsaWVzdE5vdGUgPSB0cmFja0VhcmxpZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWFybGllc3ROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhdGVzdE5vdGUoKTogTm90ZSB7XHJcbiAgICAgICAgbGV0IGxhdGVzdE5vdGU6IE5vdGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFja3NbaV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrTGF0ZXN0Tm90ZTogTm90ZSA9IHRoaXMudHJhY2tzW2ldW3RoaXMudHJhY2tzW2ldLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhdGVzdE5vdGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90ZSA9IHRyYWNrTGF0ZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGF0ZXN0Tm90ZS50aW1lSW5TZWNvbmRzIDwgdHJhY2tMYXRlc3ROb3RlLnRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RlID0gdHJhY2tMYXRlc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYXRlc3ROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRvdGFsTm90ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLnJlZHVjZSgoc3VtLCB0cmFjaykgPT4gc3VtICsgdHJhY2subGVuZ3RoLCAwKTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGVTa2luIHtcclxuICAgIHB1YmxpYyBub3RlOiBwNS5JbWFnZTtcclxuICAgIHB1YmxpYyBjb25uZWN0b3JUaWxlOiBwNS5JbWFnZTtcclxuICAgIHB1YmxpYyByZWNlcHRvcjogcDUuSW1hZ2U7XHJcblxyXG4gICAgLyogUmVxdWlyZXMgdGhhdCB0aGUgdGFpbCBiZSBoYWxmIHRoZSBoZWlnaHQgYW5kIHNhbWUgd2lkdGggYXMgbm90ZSBpbWFnZSAqL1xyXG4gICAgcHVibGljIHRhaWw6IHA1LkltYWdlO1xyXG5cclxuICAgIHByaXZhdGUgcm90YXRpb25BbmdsZXM6IE1hcDxudW1iZXIsIG51bWJlcltdPiA9IG5ldyBNYXAoW1xyXG4gICAgICAgIFs0LCBbMjcwLCAxODAsIDAsIDkwXV0sXHJcbiAgICAgICAgWzYsIFsyNzAsIDMxNSwgMTgwLCAwLCA0NSwgOTBdXVxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm90ZTogcDUuSW1hZ2UsIGNvbm5lY3RvcjogcDUuSW1hZ2UsIHRhaWw6IHA1LkltYWdlLCByZWNlcHRvcjogcDUuSW1hZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGUgPSBub3RlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yVGlsZSA9IGNvbm5lY3RvcjtcclxuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3IgPSByZWNlcHRvcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHB1YmxpYyBkcmF3Tm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBub3RlU2l6ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgc3dpdGNoIChub3RlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZVJvdGF0ZWQodGhpcy5ub3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3VGFpbCh0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHB1YmxpYyBkcmF3UmVjZXB0b3IodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2VSb3RhdGVkKHRoaXMucmVjZXB0b3IsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclksIG5vdGVTaXplKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHByaXZhdGUgZHJhd0hvbGRDb25uZWN0b3IoY2VudGVyWDogbnVtYmVyLCBkcmF3U3RhcnRZOiBudW1iZXIsIGRyYXdFbmRZOiBudW1iZXIsIG5vdGVTdGFydFk6IG51bWJlciwgbm90ZUVuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHNvdXJjZVdpZHRoID0gdGhpcy5jb25uZWN0b3JUaWxlLndpZHRoO1xyXG4gICAgICAgIGxldCBzb3VyY2VIZWlnaHQgPSB0aGlzLmNvbm5lY3RvclRpbGUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY2FsZWRXaWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBzY2FsZWRIZWlnaHQgPSBzY2FsZWRXaWR0aCAvIHNvdXJjZVdpZHRoICogc291cmNlSGVpZ2h0O1xyXG4gICAgICAgIGxldCBjb25uZWN0b3JIZWlnaHQgPSBNYXRoLmFicyhkcmF3RW5kWSAtIGRyYXdTdGFydFkpO1xyXG4gICAgICAgIGxldCBlbmRZT2Zmc2V0ID0gdGhpcy5nZXROb3RlRW5kT2Zmc2V0KG5vdGVFbmRZLCBkcmF3RW5kWSk7XHJcblxyXG4gICAgICAgIGxldCBlbmRQYXJ0aWFsVGlsZUhlaWdodCA9IHNjYWxlZEhlaWdodCAtIChlbmRZT2Zmc2V0ICUgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICBlbmRQYXJ0aWFsVGlsZUhlaWdodCA9IE1hdGgubWluKGVuZFBhcnRpYWxUaWxlSGVpZ2h0LCBjb25uZWN0b3JIZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnRQYXJ0aWFsVGlsZUhlaWdodCA9IChjb25uZWN0b3JIZWlnaHQgLSBlbmRQYXJ0aWFsVGlsZUhlaWdodCkgJSBzY2FsZWRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IG51bUNvbXBsZXRlVGlsZXMgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAoY29ubmVjdG9ySGVpZ2h0IC0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodCAtIGVuZFBhcnRpYWxUaWxlSGVpZ2h0KSAvIHNjYWxlZEhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYmxvY2sgYWxsb3dzIHVzIHRvIHVzZSB0aGUgc2FtZSBkcmF3aW5nIG1ldGhvZCBmb3IgYm90aCB1cHNjcm9sbCBhbmQgZG93bnNjcm9sbFxyXG4gICAgICAgIGxldCBib3R0b21QYXJ0aWFsVGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0b3BQYXJ0aWFsVGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0ID0gZW5kUGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0ID0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCA9IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0ID0gZW5kUGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkcmF3TWluWSA9IE1hdGgubWluKGRyYXdTdGFydFksIGRyYXdFbmRZKTtcclxuICAgICAgICBsZXQgZHJhd01heFkgPSBNYXRoLm1heChkcmF3U3RhcnRZLCBkcmF3RW5kWSk7XHJcbiAgICAgICAgbGV0IGlzUmV2ZXJzZWQgPSBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgIGxldCBpc0RyYXduRnJvbUJvdHRvbSA9IGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXA7XHJcbiAgICAgICAgaWYgKGVuZFBhcnRpYWxUaWxlSGVpZ2h0ID09PSBjb25uZWN0b3JIZWlnaHQpIHtcclxuICAgICAgICAgICAgaXNEcmF3bkZyb21Cb3R0b20gPSAhaXNEcmF3bkZyb21Cb3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYLCBkcmF3TWluWSwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCxcclxuICAgICAgICAgICAgdG9wUGFydGlhbFRpbGVIZWlnaHQgLyBzY2FsZWRIZWlnaHQsICFpc0RyYXduRnJvbUJvdHRvbSwgaXNSZXZlcnNlZCwgcCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Q29tcGxldGVUaWxlcyhjZW50ZXJYLCBkcmF3TWluWSArIHRvcFBhcnRpYWxUaWxlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LFxyXG4gICAgICAgICAgICBudW1Db21wbGV0ZVRpbGVzLCBpc1JldmVyc2VkLCBwKTtcclxuICAgICAgICB0aGlzLmRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYLCBkcmF3TWF4WSAtIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LFxyXG4gICAgICAgICAgICBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCAvIHNjYWxlZEhlaWdodCwgaXNEcmF3bkZyb21Cb3R0b20sXHJcbiAgICAgICAgICAgIGlzUmV2ZXJzZWQsIHApO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd1RhaWwodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy50YWlsLCAtbm90ZVNpemUgLyAyLCAtbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUgLyAyKTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMudGFpbCwgY2VudGVyWCAtIG5vdGVTaXplIC8gMiwgY2VudGVyWSAtIG5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplIC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Tm90ZUVuZE9mZnNldChub3RlRW5kWTogbnVtYmVyLCBkcmF3RW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IG5vdGVFbmRZIC0gZHJhd0VuZFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gZHJhd0VuZFkgLSBub3RlRW5kWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgdGhlIHBhcnRpYWwgdGlsZSB0ZXh0dXJlIGZyb20gc3RyZXRjaGluZyB3aGVuIHRoZSBwbGF5ZXIgaGl0cyBhIGhvbGQgZWFybHlcclxuICAgICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCBvZmZzZXQpO1xyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0NvbXBsZXRlVGlsZXMoY2VudGVyWDogbnVtYmVyLCBsZWFzdFk6IG51bWJlciwgc2NhbGVkV2lkdGg6IG51bWJlciwgc2NhbGVkSGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRpbGVzOiBudW1iZXIsIGlzUmV2ZXJzZWQ6IGJvb2xlYW4sIHA6IHA1KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UaWxlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IGxlYXN0WSArIGkgKiBzY2FsZWRIZWlnaHQgKyBzY2FsZWRIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgaWYgKGlzUmV2ZXJzZWQpIHtcclxuICAgICAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1zY2FsZWRIZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UGFydGlhbFRpbGUoY2VudGVyWDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCBzY2FsZWRXaWR0aDogbnVtYmVyLCBzY2FsZWRIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVdpZHRoOiBudW1iZXIsIHNvdXJjZUhlaWdodDogbnVtYmVyLCBoZWlnaHRQZXJjZW50OiBudW1iZXIsIGlzRHJhd25Gcm9tQm90dG9tOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JldmVyc2VkOiBib29sZWFuLCBwOiBwNSkge1xyXG4gICAgICAgIGlmIChoZWlnaHRQZXJjZW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uSGVpZ2h0ID0gaGVpZ2h0UGVyY2VudCAqIHNjYWxlZEhlaWdodDtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRvcExlZnRZICsgZGVzdGluYXRpb25IZWlnaHQgLyAyO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIGlmIChpc1JldmVyc2VkKSB7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0RyYXduRnJvbUJvdHRvbSkgeyAvLyBEcmF3IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1kZXN0aW5hdGlvbkhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25IZWlnaHQsIDAsIHNvdXJjZUhlaWdodCAtIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gRHJhdyBmcm9tIHRoZSB0b3Agb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtZGVzdGluYXRpb25IZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSGVpZ2h0LCAwLCAwLCBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3SW1hZ2VSb3RhdGVkKGltYWdlOiBwNS5JbWFnZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIHRoaXMucm90YXRlKHAsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHAuaW1hZ2UoaW1hZ2UsIC1ub3RlU2l6ZSAvIDIsIC1ub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJvdGF0ZShwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFuZ2xlcy5oYXMobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSh0aGlzLnJvdGF0aW9uQW5nbGVzLmdldChudW1UcmFja3MpW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC5yb3RhdGUodGhpcy5nZXREZWZhdWx0Um90YXRpb25BbmdsZUluRGVncmVlcyh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdFJvdGF0aW9uQW5nbGVJbkRlZ3JlZXModHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcm90YXRpb24gPSAtOTA7XHJcbiAgICAgICAgbGV0IHJvdGF0aW9uUGVyVHJhY2sgPSAzNjAgLyBudW1UcmFja3M7XHJcbiAgICAgICAgaWYgKHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzIC8gMikge1xyXG4gICAgICAgICAgICByb3RhdGlvbiAtPSB0cmFja051bWJlciAqIHJvdGF0aW9uUGVyVHJhY2s7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm90YXRpb24gKz0gKHRyYWNrTnVtYmVyIC0gbnVtVHJhY2tzIC8gMiArIDEpICogcm90YXRpb25QZXJUcmFjaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdGF0aW9uO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtwYXJzZVN3Zn0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zd2ZcIjtcclxuaW1wb3J0IHtTdGVwZmlsZSwgU3RlcGZpbGVTdGF0ZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGUsIEF1ZGlvRmlsZVN0YXRlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcblxyXG5jbGFzcyBTb25nIHtcclxuICAgIHB1YmxpYyBnZW5yZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHNvbmdOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ0F1dGhvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdBdXRob3JVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nRGlmZmljdWx0eTogbnVtYmVyO1xyXG4gICAgcHVibGljIHNvbmdTdHlsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdMZW5ndGg6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nU3RlcGF1dGhvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGxldmVsOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG9mWG1sKHhtbDogRWxlbWVudCk6IFNvbmcge1xyXG4gICAgICAgIGxldCBzb25nID0gbmV3IFNvbmcoKTtcclxuICAgICAgICBzb25nLmdlbnJlID0gcGFyc2VJbnQoeG1sLmdldEF0dHJpYnV0ZShcImdlbnJlXCIpKTtcclxuICAgICAgICBzb25nLnNvbmdOYW1lID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmduYW1lXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0F1dGhvciA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nYXV0aG9yXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0F1dGhvclVybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nYXV0aG9ydXJsXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0RpZmZpY3VsdHkgPSBwYXJzZUludChnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ2RpZmZpY3VsdHlcIikpO1xyXG4gICAgICAgIHNvbmcuc29uZ1N0eWxlID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdzdHlsZVwiKTtcclxuICAgICAgICBzb25nLnNvbmdMZW5ndGggPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ2xlbmd0aFwiKTtcclxuICAgICAgICBzb25nLnNvbmdTdGVwYXV0aG9yID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdzdGVwYXV0aG9yXCIpO1xyXG4gICAgICAgIHNvbmcubGV2ZWwgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwibGV2ZWxcIik7XHJcbiAgICAgICAgcmV0dXJuIHNvbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29uZ0RpZmZpY3VsdHkgKyBcIiBcIiArIHRoaXMuc29uZ05hbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE9ubGluZVBsYXlsaXN0U3RhdGUge1xyXG4gICAgTk9fUExBWUxJU1QsXHJcbiAgICBMT0FESU5HX1BMQVlMSVNULFxyXG4gICAgUExBWUxJU1RfUkVBRFksXHJcbiAgICBQTEFZTElTVF9FUlJPUixcclxuICAgIExPQURJTkdfU09ORyxcclxuICAgIFNPTkdfRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPbmxpbmVQbGF5bGlzdCB7XHJcbiAgICBwdWJsaWMgaW5kZXhVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgc29uZ1VybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwbGF5bGlzdFVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBmdWxsUGxheWxpc3Q6IFNvbmdbXTtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfUEFHRV9TSVpFOiBudW1iZXIgPSA1MDtcclxuICAgIHB1YmxpYyBzdGF0ZTogT25saW5lUGxheWxpc3RTdGF0ZTtcclxuICAgIHB1YmxpYyBwbGF5bGlzdDogU29uZ1tdO1xyXG4gICAgcHJpdmF0ZSBwYWdlTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHBhZ2VTaXplOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuTk9fUExBWUxJU1Q7XHJcbiAgICAgICAgdGhpcy5pbmRleFVybCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtpY2tPZmZMb2FkUGxheWxpc3QoaW5kZXhVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfUExBWUxJU1Q7XHJcbiAgICAgICAgdGhpcy5pbmRleFVybCA9IGluZGV4VXJsO1xyXG4gICAgICAgIHRoaXMuZ2V0KHRoaXMuaW5kZXhVcmwsIHRoaXMucGFyc2VJbmRleEFuZExvYWRQbGF5bGlzdC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlSW5kZXhBbmRMb2FkUGxheWxpc3QoZXZlbnQ6IFByb2dyZXNzRXZlbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RNZXRhZGF0YTogRG9jdW1lbnQgPSAoPFhNTEh0dHBSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVzcG9uc2VYTUw7XHJcbiAgICAgICAgICAgIHRoaXMuc29uZ1VybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHBsYXlsaXN0TWV0YWRhdGEsIFwic29uZ1VSTFwiKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5bGlzdFVybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHBsYXlsaXN0TWV0YWRhdGEsIFwicGxheWxpc3RVUkxcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0KHRoaXMucGxheWxpc3RVcmwsIHRoaXMubG9hZFBsYXlsaXN0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1I7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFBsYXlsaXN0KGV2ZW50OiBQcm9ncmVzc0V2ZW50KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0VGV4dDogc3RyaW5nID0gKDxYTUxIdHRwUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlc3BvbnNlO1xyXG4gICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVwbGFjZSBhbXBlcnNhbmRzIGJlY2F1c2UgdGhlIERPTVBhcnNlciBkb2Vzbid0IGxpa2UgdGhlbVxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IHBsYXlsaXN0VGV4dC5yZXBsYWNlKC8mL2csICcmYW1wOycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0WG1sID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyh0ZXh0LCBcInRleHQveG1sXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnNlUGxheWxpc3QocGxheWxpc3RYbWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1I7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VQbGF5bGlzdChwbGF5bGlzdFhtbDogRG9jdW1lbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgc29uZ3M6IEhUTUxDb2xsZWN0aW9uID0gcGxheWxpc3RYbWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzb25nXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxQbGF5bGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29uZ1htbDogRWxlbWVudCA9IHNvbmdzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHNvbmc6IFNvbmcgPSBTb25nLm9mWG1sKHNvbmdYbWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFBsYXlsaXN0LnB1c2goc29uZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnVsbFBsYXlsaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1I7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5QTEFZTElTVF9SRUFEWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1I7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBraWNrT2ZmTG9hZFNvbmcoc29uZ0luZGV4OiBudW1iZXIsIHN0ZXBmaWxlOiBTdGVwZmlsZSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkc7XHJcbiAgICAgICAgc29uZ0luZGV4ICs9IHRoaXMucGFnZVNpemUgKiB0aGlzLnBhZ2VOdW1iZXI7XHJcbiAgICAgICAgc3RlcGZpbGUuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLk5PX1NJTUZJTEU7XHJcbiAgICAgICAgYXVkaW9GaWxlLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgICAgICBsZXQgc29uZzogU29uZyA9IHRoaXMuZnVsbFBsYXlsaXN0W3NvbmdJbmRleF07XHJcbiAgICAgICAgbGV0IGxldmVsOiBzdHJpbmcgPSBzb25nLmxldmVsO1xyXG4gICAgICAgIGxldCBsZXZlbFVybCA9IHRoaXMuc29uZ1VybCArIFwibGV2ZWxfXCIgKyBsZXZlbCArIFwiLnN3ZlwiO1xyXG4gICAgICAgIHRoaXMuZ2V0KGxldmVsVXJsLCAoZXZlbnQ6IFByb2dyZXNzRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHBhcnNlU3dmKCg8WE1MSHR0cFJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXNwb25zZSwgc3RlcGZpbGUsIGF1ZGlvRmlsZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBPbmxpbmVQbGF5bGlzdFN0YXRlLlNPTkdfRVJST1I7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXCJhcnJheWJ1ZmZlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCh1cmw6IHN0cmluZywgb25sb2FkOiAoZXZlbnQ6IFByb2dyZXNzRXZlbnQpID0+IHZvaWQsIHJlc3BvbnNlVHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjb3JzV29ya2Fyb3VuZDogc3RyaW5nID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tLyc7XHJcbiAgICAgICAgbGV0IHJlcXVlc3Q6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBvbmxvYWQpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgY29yc1dvcmthcm91bmQgKyB1cmwsIHRydWUpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZVR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0UGFnZShwYWdlTnVtYmVyOiBudW1iZXIsIHBhZ2VTaXplPzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHBhZ2VTaXplID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSBPbmxpbmVQbGF5bGlzdC5ERUZBVUxUX1BBR0VfU0laRTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2VTaXplIDwgMSkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlU2l6ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYWdlTnVtYmVyID4gdGhpcy5nZXRNYXhQYWdlTnVtYmVyKHBhZ2VTaXplKSB8fCBwYWdlTnVtYmVyIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWluSW5kZXggPSBwYWdlTnVtYmVyICogcGFnZVNpemU7XHJcbiAgICAgICAgbGV0IG1heEluZGV4ID0gbWluSW5kZXggKyBwYWdlU2l6ZTtcclxuICAgICAgICB0aGlzLnBsYXlsaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG1pbkluZGV4OyBpIDwgbWF4SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8IHRoaXMuZnVsbFBsYXlsaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5bGlzdC5wdXNoKHRoaXMuZnVsbFBsYXlsaXN0W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1heFBhZ2VOdW1iZXIocGFnZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZnVsbFBsYXlsaXN0Lmxlbmd0aCAvIHBhZ2VTaXplKSAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5leHRQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2VOdW1iZXIgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJldmlvdXNQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2VOdW1iZXIgLSAxKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sOiBFbGVtZW50IHwgRG9jdW1lbnQsIHRhZzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZylbMF0uaW5uZXJIVE1MO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0tleWJvYXJkRXZlbnRNYW5hZ2VyfSBmcm9tIFwiLi9rZXlib2FyZF9ldmVudF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVQcmV2aWV3Tm90ZXN9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlU2tpbn0gZnJvbSBcIi4vbm90ZV9za2luXCI7XHJcblxyXG5sZXQgd2lkdGggPSA3MjA7XHJcbmxldCBoZWlnaHQgPSA0ODA7XHJcblxyXG5leHBvcnQgY2xhc3MgUDVTY2VuZSB7XHJcbiAgICBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IG5ldyBwNSgocDogcDUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlbmRlcmVyOiBwNS5SZW5kZXJlcjtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNlbnRlckNhbnZhcygpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcmVyLmNlbnRlcigpOyAvLyBEaXNhYmxlIHRoaXMgZm9yIG5vdyB0byBtYWtlIGVtYmVkZGluZyB3b3JrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5ub3RlU2tpbiA9IG5ldyBOb3RlU2tpbihcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19ibHVlX3YzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9jb25uZWN0b3JfdGlsZV9yZXNpemUucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3RhaWxfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19yZWNlcHRvci5wbmdcIilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCA9IHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3BsYXlfZnJvbV9maWxlX2JhY2tncm91bmQuanBnXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kID0gZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlciA9IHAuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlciA9IG5ldyBLZXlib2FyZEV2ZW50TWFuYWdlcihwKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyg0KSwgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTsgLy8gTWFrZXMgdGhlIGNhbnZhcyBiZSBhYmxlIHRvIGZpbGwgdGhlIHdob2xlIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHAuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLmRyYXcoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAud2luZG93UmVzaXplZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlckNhbnZhcygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGxheUZyb21GaWxlfSBmcm9tIFwiLi9wYWdlcy9wbGF5X2Zyb21fZmlsZVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuaW1wb3J0IHtQbGF5fSBmcm9tIFwiLi9wYWdlcy9wbGF5XCI7XHJcbmltcG9ydCB7UmVzdWx0c30gZnJvbSBcIi4vcGFnZXMvcmVzdWx0c1wiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7UGxheUZyb21PbmxpbmV9IGZyb20gXCIuL3BhZ2VzL3BsYXlfZnJvbV9vbmxpbmVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFBBR0VTIHtcclxuICAgIFBMQVlfRlJPTV9GSUxFLFxyXG4gICAgT1BUSU9OUyxcclxuICAgIFBMQVksXHJcbiAgICBSRVNVTFRTLFxyXG4gICAgUExBWV9GUk9NX09OTElORSxcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbnRQYWdlOiBQQUdFUyA9IFBBR0VTLlBMQVlfRlJPTV9GSUxFO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0dXJuUGFnZTogUEFHRVM7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRDdXJyZW50UGFnZShwYWdlOiBQQUdFUykge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlICE9PSBQQUdFUy5QTEFZKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuUGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xyXG4gICAgICAgIERPTVdyYXBwZXIuY2xlYXJSZWdpc3RyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmV0dXJuKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFBhZ2UodGhpcy5yZXR1cm5QYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWV9GUk9NX0ZJTEU6XHJcbiAgICAgICAgICAgICAgICBQbGF5RnJvbUZpbGUuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuT1BUSU9OUzpcclxuICAgICAgICAgICAgICAgIE9wdGlvbnMuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWTpcclxuICAgICAgICAgICAgICAgIFBsYXkuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUkVTVUxUUzpcclxuICAgICAgICAgICAgICAgIFJlc3VsdHMuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWV9GUk9NX09OTElORTpcclxuICAgICAgICAgICAgICAgIFBsYXlGcm9tT25saW5lLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBwYWdlOiBcIiArIGdsb2JhbC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmdIZWxwZXJ9IGZyb20gXCIuLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGJvb2xlYW5Ub1llc05vLFxyXG4gICAgY3JlYXRlS2V5QmluZGluZ0lucHV0LFxyXG4gICAgY3JlYXRlTGFiZWxlZElucHV0LFxyXG4gICAgY3JlYXRlTGFiZWxlZFNlbGVjdCxcclxuICAgIGNyZWF0ZUxhYmVsZWRUZXh0QXJlYSxcclxuICAgIGRyYXdIZWFkaW5nLFxyXG4gICAgWWVzTm9cclxufSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVQcmV2aWV3Tm90ZXMsIGdldEtleUJpbmRpbmdDb250YWluZXJJZCwgaW5pdGlhbGl6ZUtleUJpbmRpbmdzLCBpc0tleUJpbmRpbmdzRGVmaW5lZH0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4uL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtQcmV2aWV3RGlzcGxheX0gZnJvbSBcIi4uL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9wdGlvbnMge1xyXG4gICAgcHVibGljIHN0YXRpYyBPUFRJT05TX0NMQVNTOiBzdHJpbmcgPSBcIm9wdGlvbnNcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5vcHRpb25zQmFja2dyb3VuZCk7XHJcbiAgICAgICAgZHJhd0hlYWRpbmcoKTtcclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbERpdiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgfSwgXCJzY3JvbGxEaXZcIik7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXYuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhcIm9wdGlvbnMtc2Nyb2xsLWRpdlwiKTtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuYWRkQ2xhc3MoT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGxldCBjYW52YXNQb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0gcC5fcmVuZGVyZXIucG9zaXRpb24oKTtcclxuICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5wb3NpdGlvbihjYW52YXNQb3NpdGlvbi54ICsgMzM1LCBjYW52YXNQb3NpdGlvbi55ICsgNDUpO1xyXG5cclxuICAgICAgICBsZXQgcmVzZXRDb25maWdCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlJlc2V0IFRvIERlZmF1bHRcIik7XHJcbiAgICAgICAgfSwgXCJyZXNldENvbmZpZ0J1dHRvblwiKTtcclxuICAgICAgICBpZiAoIXJlc2V0Q29uZmlnQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgcmVzZXRDb25maWdCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKFwicmVzZXQtY29uZmlnXCIpO1xyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnID0gbmV3IENvbmZpZyh7fSk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChyZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlBhdXNlIGF0IFN0YXJ0IChzZWMpXCIsIFwicGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gcGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpICYmIHZhbHVlID49IDApIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxTcGVlZElucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiU2Nyb2xsIFNwZWVkIChweC9zZWMpXCIsIFwic2Nyb2xsU3BlZWRJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBpeGVsc1BlclNlY29uZC50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoc2Nyb2xsU3BlZWRJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHNjcm9sbFNwZWVkSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpICYmIHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5waXhlbHNQZXJTZWNvbmQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxTcGVlZElucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoc2Nyb2xsU3BlZWRJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxEaXJlY3Rpb25TZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiU2Nyb2xsIERpcmVjdGlvblwiLCBcInNjcm9sbERpcmVjdGlvblNlbGVjdFwiLFxyXG4gICAgICAgICAgICBTY3JvbGxEaXJlY3Rpb24sIGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKHNjcm9sbERpcmVjdGlvblNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBTY3JvbGxEaXJlY3Rpb25bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFNjcm9sbERpcmVjdGlvbl07XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9IGVudW1PZlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHNjcm9sbERpcmVjdGlvblNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNlcHRvclBvc2l0aW9uSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJSZWNlcHRvciBQb3NpdGlvbiAoJSlcIiwgXCJyZWNlcHRvclBvc2l0aW9uSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5yZWNlcHRvcllQZXJjZW50LnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhyZWNlcHRvclBvc2l0aW9uSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSByZWNlcHRvclBvc2l0aW9uSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFyZWNlcHRvclBvc2l0aW9uSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChyZWNlcHRvclBvc2l0aW9uSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiQWNjdXJhY3kgT2Zmc2V0IChtcylcIiwgXCJhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXRcIixcclxuICAgICAgICAgICAgKGdsb2JhbC5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyAqIDEwMDApLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgPSB2YWx1ZSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWN5U2V0dGluZ3NJbnB1dCA9IGNyZWF0ZUxhYmVsZWRUZXh0QXJlYShcIkFjY3VyYWN5IFNldHRpbmdzXCIsIFwiYWNjdXJhY3lTZXR0aW5nc0lucHV0XCIsXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGdsb2JhbC5jb25maWcuYWNjdXJhY3lTZXR0aW5ncywgbnVsbCwgMyksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeVNldHRpbmdzSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBhY2N1cmFjeVNldHRpbmdzSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3QWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24odmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0FjY3VyYWN5U2V0dGluZ3MgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MgPSBuZXdBY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoIWFjY3VyYWN5U2V0dGluZ3NJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGFjY3VyYWN5U2V0dGluZ3NJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJBY2N1cmFjeSBGbGFzaFwiLFwiYWNjdXJhY3lGbGFzaEVuYWJsZWRTZWxlY3RcIixcclxuICAgICAgICAgICAgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBZZXNOb1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgWWVzTm9dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLlllcykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lGbGFzaEVuYWJsZWRTZWxlY3QuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IFBhcnRpY2xlc1wiLCBcImFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWRTZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjeVRleHRFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IFRleHRcIixcImFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3RcIixcclxuICAgICAgICAgICAgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVRleHRFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBZZXNOb1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgWWVzTm9dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLlllcykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3QuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaG9sZFBhcnRpY2xlc0VuYWJsZWRTZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiSG9sZCBQYXJ0aWNsZXNcIiwgXCJob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKGhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXJlY3Rpb25TZWxlY3QuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBob2xkR2xvd0VuYWJsZWRTZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiSG9sZCBHbG93XCIsIFwiaG9sZEdsb3dFbmFibGVkU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGhvbGRHbG93RW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhob2xkR2xvd0VuYWJsZWRTZWxlY3QuZWxlbWVudC52YWx1ZSgpKTtcclxuICAgICAgICAgICAgbGV0IGVudW1PZlZhbHVlID0gWWVzTm9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFllc05vXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5ZZXMpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoaG9sZEdsb3dFbmFibGVkU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzU2VjdGlvbkhlYWRlciA9IGNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBnbG9iYWwucHJldmlld051bVRyYWNrcyA9IDQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcmV2aWV3TnVtVHJhY2tzID0gY3JlYXRlTGFiZWxlZElucHV0KFwiTnVtYmVyIG9mIFRyYWNrc1wiLCBcInByZXZpZXdOdW1UcmFja3NJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwucHJldmlld051bVRyYWNrcy50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHByZXZpZXdOdW1UcmFja3MsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwcmV2aWV3TnVtVHJhY2tzLmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpICYmIHZhbHVlID4gMCAmJiB2YWx1ZSA8PSAyNikge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlT2xkQmluZGluZ0J1dHRvbnMoZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyh2YWx1ZSksIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcHJldmlld051bVRyYWNrcy5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHByZXZpZXdOdW1UcmFja3MuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJLZXlCaW5kaW5ncyBRdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgIH0sIFwia2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uXCIpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJrZXliaW5kaW5ncy1xdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5YmluZGluZ0hlbHBlciA9IG5ldyBLZXlCaW5kaW5nSGVscGVyKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRoaXMgYWN0aW9uIHRvIHRoZSBcIi0xXCIga2V5IHNvIHRoYXQgaXQgaGFwcGVucyBvbiBhbnkga2V5IHByZXNzXHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKC0xLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoaXMgY29kZSBiZWNhdXNlIGl0J3MgdXNlZCB0byBpbmRpY2F0ZSBpbnB1dCB0aGF0J3Mgbm90IHlldCBmaW5pc2hlZCBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAua2V5Q29kZSAhPT0gMjI5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleWJpbmRpbmdIZWxwZXIuYmluZE5leHQocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0tleUJpbmRpbmdzRGVmaW5lZChnbG9iYWwucHJldmlld051bVRyYWNrcykpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nSW5wdXQgPSBjcmVhdGVLZXlCaW5kaW5nSW5wdXQodHJhY2tOdW1iZXIsIGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBpZiAoIWtleUJpbmRpbmdJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChrZXlCaW5kaW5nSW5wdXQuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmh0bWwoXHJcbiAgICAgICAgICAgICdLZXkgQmluZGluZ3MgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTJweFwiPih0cmFjayAxIGlzIHRoZSBsZWZ0bW9zdCB0cmFjayk8L3NwYW4+J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwib3B0aW9ucy1mcmVlLXRleHRcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIFwia2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyXCIpO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoaW5wdXRFbGVtZW50OiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSwgb25JbnB1dDogKCkgPT4gdm9pZCkge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpbnB1dEVsZW1lbnQuZWxlbWVudC5pbnB1dChvbklucHV0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlT2xkQmluZGluZ0J1dHRvbnMobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBudW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKGdldEtleUJpbmRpbmdDb250YWluZXJJZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24oYWNjdXJhY3lTZXR0aW5nc0pzb246IHN0cmluZyk6IEFjY3VyYWN5W10ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IFtdXHJcbiAgICAgICAgbGV0IGpzb25BcnJheTogQWNjdXJhY3lbXSA9IEpTT04ucGFyc2UoYWNjdXJhY3lTZXR0aW5nc0pzb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGpzb25BcnJheVtpXTtcclxuICAgICAgICAgICAgLy8gdGhpcyBmYWlscyBpZiB0aGUgdXNlciBnYXZlIHRoZSB3cm9uZyBpbnB1dFxyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzLnB1c2gobmV3IEFjY3VyYWN5KGFjY3VyYWN5Lm5hbWUsIGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2UuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG4gICAgICAgIGdsb2JhbC5wbGF5aW5nRGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7XHJcbiAgICBkcmF3SGVhZGluZyxcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlLFxyXG4gICAgY3JlYXRlRmlsZUlucHV0LFxyXG4gICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2LCBmaXhSYWRpb0RpdkVsZW1lbnQsIHN0eWxlUmFkaW9PcHRpb25zXHJcbn0gZnJvbSBcIi4uL3VpX3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge1N0ZXBmaWxlLCBTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGUsIEF1ZGlvRmlsZVN0YXRlfSBmcm9tIFwiLi4vYXVkaW9fZmlsZVwiO1xyXG5pbXBvcnQge2dldE1vZGVPcHRpb25zRm9yRGlzcGxheSwgaW5pdFBsYXlpbmdEaXNwbGF5LCBpc0ZpbGVzUmVhZHl9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7TW9kZX0gZnJvbSBcIi4uL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmNvbnN0IHBsYXlGcm9tRmlsZVN0ZXBmaWxlID0gbmV3IFN0ZXBmaWxlKCk7XHJcbmNvbnN0IHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF5RnJvbUZpbGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZX0ZST01fRklMRV9DTEFTUzogc3RyaW5nID0gXCJwbGF5LWZyb20tZmlsZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBNT0RFX1JBRElPX0lEOiBzdHJpbmcgPSBcIm1vZGVSYWRpb1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCk7XHJcblxyXG4gICAgICAgIGxldCBzdGVwZmlsZUlucHV0ID0gY3JlYXRlRmlsZUlucHV0KGdldFN0ZXBmaWxlSW5wdXRMYWJlbCgpLCBcIkNob29zZSBTdGVwZmlsZSAoLnNtKVwiLCBcInN0ZXBmaWxlSW5wdXRcIixcclxuICAgICAgICAgICAgbG9hZFN0ZXBmaWxlQW5kVXBkYXRlTW9kZU9wdGlvbnMsIFBsYXlGcm9tRmlsZS5QTEFZX0ZST01fRklMRV9DTEFTUykuZWxlbWVudDtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShzdGVwZmlsZUlucHV0LCAwLjQzLCAwLjMsIDI2OCwgMzQpO1xyXG5cclxuICAgICAgICBsZXQgYXVkaW9GaWxlSW5wdXQgPSBjcmVhdGVGaWxlSW5wdXQoZ2V0QXVkaW9GaWxlSW5wdXRMYWJlbCgpLCBcIkNob29zZSBBdWRpbyBGaWxlICgubXAzLCAub2dnKVwiLCBcImF1ZGlvRmlsZUlucHV0XCIsXHJcbiAgICAgICAgICAgIHBsYXlGcm9tRmlsZUF1ZGlvRmlsZS5sb2FkRmlsZS5iaW5kKHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSksIFBsYXlGcm9tRmlsZS5QTEFZX0ZST01fRklMRV9DTEFTUykuZWxlbWVudDtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShhdWRpb0ZpbGVJbnB1dCwgMC40MywgMC40NSwgMzI1LCAzNCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5QnV0dG9uSWQgPSBcInBsYXlCdXR0b25cIjtcclxuICAgICAgICBpZiAoaXNGaWxlc1JlYWR5KHBsYXlGcm9tRmlsZVN0ZXBmaWxlLCBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUpKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlUmFkaW8gPSBkcmF3TW9kZVNlbGVjdChwLCBQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RlUmFkaW8udmFsdWUoKSAhPT0gXCJcIikgeyAvLyBpZiB1c2VyIGhhcyBzZWxlY3RlZCBhIG1vZGVcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlBsYXlcIik7XHJcbiAgICAgICAgICAgICAgICB9LCBwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuODgsIDYwLCAzNCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RlOiBNb2RlID0gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZpbmlzaFBhcnNpbmcoc2VsZWN0ZWRNb2RlLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFBsYXlpbmdEaXNwbGF5KHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmZ1bGxQYXJzZS50cmFja3MsIHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheUJ1dHRvbklkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRTdGVwZmlsZUFuZFVwZGF0ZU1vZGVPcHRpb25zKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgIHBsYXlGcm9tRmlsZVN0ZXBmaWxlLmxvYWRGaWxlLmNhbGwocGxheUZyb21GaWxlU3RlcGZpbGUsIGZpbGUpO1xyXG4gICAgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMgPSB1bmRlZmluZWQ7XHJcbiAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFBsYXlGcm9tRmlsZS5NT0RFX1JBRElPX0lEKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd01vZGVTZWxlY3QocDogcDUsIHVuaXF1ZUlkOiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgaWYgKGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucyA9IGdldE1vZGVPcHRpb25zRm9yRGlzcGxheShwbGF5RnJvbUZpbGVTdGVwZmlsZS5wYXJ0aWFsUGFyc2UubW9kZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtb2RlUmFkaW9DbGFzcyA9IFwibW9kZS1yYWRpb1wiXHJcbiAgICBsZXQgbW9kZVJhZGlvT3B0aW9uQ2xhc3MgPSBcIm1vZGUtcmFkaW8tb3B0aW9uXCI7XHJcbiAgICBsZXQgbW9kZVJhZGlvQ3JlYXRlUmVzdWx0ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVJhZGlvKCk7XHJcbiAgICB9LCB1bmlxdWVJZCk7XHJcbiAgICBsZXQgbW9kZVJhZGlvID0gbW9kZVJhZGlvQ3JlYXRlUmVzdWx0LmVsZW1lbnQ7XHJcbiAgICBpZiAoIW1vZGVSYWRpb0NyZWF0ZVJlc3VsdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9kZSA9IGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zW2ldO1xyXG4gICAgICAgICAgICBsZXQgcmFkaW9MYWJlbCA9IG1vZGUudHlwZSArIFwiLCBcIiArIG1vZGUuZGlmZmljdWx0eSArIFwiLCBcIiArIG1vZGUubWV0ZXI7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGV0IHJhZGlvT3B0aW9uID0gbW9kZVJhZGlvLm9wdGlvbihyYWRpb0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHZhbHVlIHRoaXMgd2F5IGJlY2F1c2UgdGhlIHR3by1hcmd1bWVudCAub3B0aW9uIG1ldGhvZCB3YXNuJ3Qgd29ya2luZ1xyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSBpcyBuZWNlc3Nhcnkgc28gd2UgY2FuIGFjY2VzcyB0aGUgc2VsZWN0ZWQgbW9kZVxyXG4gICAgICAgICAgICByYWRpb09wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIHN0eWxlIGlzIGJlaW5nIHNldCBvbiB0aGUgZGl2IGNvbnRhaW5pbmcgdGhlIHJhZGlvIGVsZW1lbnRzIHRvIG1ha2UgaXQgYSBzY3JvbGxhYmxlIGJveFxyXG4gICAgICAgIG1vZGVSYWRpby5hZGRDbGFzcyhtb2RlUmFkaW9DbGFzcyk7XHJcbiAgICAgICAgbW9kZVJhZGlvLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdihwLCBtb2RlUmFkaW8pO1xyXG4gICAgICAgIGZpeFJhZGlvRGl2RWxlbWVudChtb2RlUmFkaW8pO1xyXG4gICAgICAgIHN0eWxlUmFkaW9PcHRpb25zKHAsIG1vZGVSYWRpbywgW21vZGVSYWRpb09wdGlvbkNsYXNzLCBnbG9iYWwuZ2xvYmFsQ2xhc3NdKTtcclxuICAgIH1cclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKG1vZGVSYWRpbywgMC41LCAwLjcsIDMwMiwgMTIwKTtcclxuICAgIHAucG9wKCk7XHJcbiAgICByZXR1cm4gbW9kZVJhZGlvO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RlZE1vZGUobW9kZVJhZGlvOiBwNS5FbGVtZW50KSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnNbbW9kZVJhZGlvLnZhbHVlKCldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdGVwZmlsZUlucHV0TGFiZWwoKSB7XHJcbiAgICBzd2l0Y2gocGxheUZyb21GaWxlU3RlcGZpbGUuc3RhdGUpIHtcclxuICAgICAgICBjYXNlIFN0ZXBmaWxlU3RhdGUuTk9fU0lNRklMRTpcclxuICAgICAgICAgICAgcmV0dXJuIFwiTm8gZmlsZSBjaG9zZW5cIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLkRPTkVfUkVBRElORzpcclxuICAgICAgICBjYXNlIFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRDpcclxuICAgICAgICBjYXNlIFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1bmNhdGVGaWxlTmFtZUlmVG9vTG9uZyhwbGF5RnJvbUZpbGVTdGVwZmlsZS5maWxlLm5hbWUsIDMwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3JcIjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXVkaW9GaWxlSW5wdXRMYWJlbCgpIHtcclxuICAgIHN3aXRjaChwbGF5RnJvbUZpbGVBdWRpb0ZpbGUuc3RhdGUpIHtcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLk5PX0FVRElPX0ZJTEU6XHJcbiAgICAgICAgICAgIHJldHVybiBcIk5vIGZpbGUgY2hvc2VuXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HOlxyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKHBsYXlGcm9tRmlsZUF1ZGlvRmlsZS5maWxlLm5hbWUsIDMwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3JcIjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdHJ1bmNhdGVGaWxlTmFtZUlmVG9vTG9uZyhmdWxsRmlsZU5hbWU6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIGlmIChmdWxsRmlsZU5hbWUubGVuZ3RoIDw9IG1heExlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmdWxsRmlsZU5hbWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVsbEZpbGVOYW1lLnN1YnN0cigwLCBtYXhMZW5ndGggLSAxMSkgK1xyXG4gICAgICAgIFwiLi4uXCIgK1xyXG4gICAgICAgIGZ1bGxGaWxlTmFtZS5zdWJzdHIoZnVsbEZpbGVOYW1lLmxlbmd0aCAtIDEwKTtcclxufSIsImltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7XHJcbiAgICBjcmVhdGVMYWJlbGVkSW5wdXQsXHJcbiAgICBkcmF3SGVhZGluZyxcclxuICAgIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdixcclxuICAgIGZpeFJhZGlvRGl2RWxlbWVudCxcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlLFxyXG4gICAgc3R5bGVSYWRpb09wdGlvbnNcclxufSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4uL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge09ubGluZVBsYXlsaXN0U3RhdGV9IGZyb20gXCIuLi9vbmxpbmVfcGxheWxpc3RcIjtcclxuaW1wb3J0IHtpbml0UGxheWluZ0Rpc3BsYXksIGlzRmlsZXNSZWFkeX0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4uL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi4vYXVkaW9fZmlsZVwiO1xyXG5cclxuY29uc3QgcGxheUZyb21PbmxpbmVTdGVwZmlsZSA9IG5ldyBTdGVwZmlsZSgpO1xyXG5jb25zdCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuXHJcbi8vIFRoaXMgcHJldmVudHMgbG9hZGluZyBwcmV2aW91cyBzb25nIHVwb24gcmV0dXJuaW5nIHRvIGEgbG9hZGVkIHBsYXlsaXN0XHJcbmxldCBpc1N3ZkxvYWRTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheUZyb21PbmxpbmUge1xyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZX0ZST01fT05MSU5FX0NMQVNTOiBzdHJpbmcgPSBcInBsYXktZnJvbS1vbmxpbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZHJhd0hlYWRpbmcoKTtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQpO1xyXG5cclxuICAgICAgICBsZXQgdXJsSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJFbmdpbmUgVVJMXCIsIFwidXJsSW5wdXRcIiwgZ2xvYmFsLm9ubGluZVBsYXlsaXN0LmluZGV4VXJsLFxyXG4gICAgICAgICAgICBQbGF5RnJvbU9ubGluZS5QTEFZX0ZST01fT05MSU5FX0NMQVNTKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IHVybElucHV0RGl2ID0gbmV3IHA1LkVsZW1lbnQodXJsSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUodXJsSW5wdXREaXYsIDAuNTAsIDAuMjEsIDYwMCwgMzgpO1xyXG5cclxuICAgICAgICBsZXQgbG9hZEJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiTG9hZFwiKTtcclxuICAgICAgICB9LCBcImxvYWRCdXR0b25cIik7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUobG9hZEJ1dHRvbi5lbGVtZW50LCAwLjg1LCAwLjIxNSwgNjIsIDMzKTtcclxuICAgICAgICBpZiAoIWxvYWRCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKFBsYXlGcm9tT25saW5lLlBMQVlfRlJPTV9PTkxJTkVfQ0xBU1MpO1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gdXJsSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRCdXR0b24uZWxlbWVudC5hdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5raWNrT2ZmTG9hZFBsYXlsaXN0KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnbG9iYWwub25saW5lUGxheWxpc3Quc3RhdGUgIT09IE9ubGluZVBsYXlsaXN0U3RhdGUuTE9BRElOR19QTEFZTElTVCkge1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5zdGF0ZSA9PT0gT25saW5lUGxheWxpc3RTdGF0ZS5QTEFZTElTVF9SRUFEWSB8fFxyXG4gICAgICAgICAgICBnbG9iYWwub25saW5lUGxheWxpc3Quc3RhdGUgPT09IE9ubGluZVBsYXlsaXN0U3RhdGUuTE9BRElOR19TT05HKSB7XHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdE1lbnVJZCA9IFwicGxheWxpc3RNZW51XCJcclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0TWVudSA9IGRyYXdSYWRpb01lbnUocCwgcGxheWxpc3RNZW51SWQsIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5wbGF5bGlzdCk7XHJcbiAgICAgICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlsaXN0TWVudSwgMC41LCAwLjYyLCA1MDAsIDIwMCk7XHJcblxyXG4gICAgICAgICAgICBkcmF3UGFnZUNvbnRyb2xzKHAsIHBsYXlsaXN0TWVudUlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5bGlzdE1lbnUudmFsdWUoKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvYWRBbmRQbGF5QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIkxvYWQgQW5kIFBsYXlcIik7XHJcbiAgICAgICAgICAgICAgICB9LCBcImxvYWRBbmRQbGF5QnV0dG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUobG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudCwgMC41LCAwLjg4LCAxMTgsIDM0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWxvYWRBbmRQbGF5QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkQW5kUGxheUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHBsYXlsaXN0TWVudS52YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQuYXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5raWNrT2ZmTG9hZFNvbmcodmFsdWUsIHBsYXlGcm9tT25saW5lU3RlcGZpbGUsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU3dmTG9hZFN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsLm9ubGluZVBsYXlsaXN0LnN0YXRlICE9PSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfU09ORykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0ZpbGVzUmVhZHkocGxheUZyb21PbmxpbmVTdGVwZmlsZSwgcGxheUZyb21PbmxpbmVBdWRpb0ZpbGUpICYmIGlzU3dmTG9hZFN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0UGxheWluZ0Rpc3BsYXkocGxheUZyb21PbmxpbmVTdGVwZmlsZS5mdWxsUGFyc2UudHJhY2tzLCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuUExBWSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChcImxvYWRBbmRQbGF5QnV0dG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgaXNTd2ZMb2FkU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQoXCJwbGF5bGlzdE1lbnVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgTWVudUl0ZW0ge1xyXG4gICAgdG9TdHJpbmc6ICgpID0+IHN0cmluZztcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1JhZGlvTWVudShwOiBwNSwgdW5pcXVlSWQ6IHN0cmluZywgaXRlbXM6IE1lbnVJdGVtW10pOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBtZW51Q2xhc3MgPSBcInBsYXlsaXN0LXJhZGlvXCJcclxuICAgIGxldCBtZW51SXRlbUNsYXNzID0gXCJwbGF5bGlzdC1yYWRpby1vcHRpb25cIjtcclxuICAgIGxldCByYWRpb01lbnVDcmVhdGVSZXN1bHQgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlUmFkaW8oKTtcclxuICAgIH0sIHVuaXF1ZUlkKTtcclxuICAgIGxldCByYWRpb01lbnUgPSByYWRpb01lbnVDcmVhdGVSZXN1bHQuZWxlbWVudDtcclxuICAgIGlmICghcmFkaW9NZW51Q3JlYXRlUmVzdWx0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGxldCByYWRpb0xhYmVsID0gaXRlbS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCByYWRpb09wdGlvbiA9IHJhZGlvTWVudS5vcHRpb24ocmFkaW9MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSB0aGlzIHdheSBiZWNhdXNlIHRoZSB0d28tYXJndW1lbnQgLm9wdGlvbiBtZXRob2Qgd2Fzbid0IHdvcmtpbmdcclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBhY2Nlc3MgdGhlIHNlbGVjdGVkIG1vZGVcclxuICAgICAgICAgICAgcmFkaW9PcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBzdHlsZSBpcyBiZWluZyBzZXQgb24gdGhlIGRpdiBjb250YWluaW5nIHRoZSByYWRpbyBlbGVtZW50cyB0byBtYWtlIGl0IGEgc2Nyb2xsYWJsZSBib3hcclxuICAgICAgICByYWRpb01lbnUuYWRkQ2xhc3MobWVudUNsYXNzKTtcclxuICAgICAgICByYWRpb01lbnUuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2KHAsIHJhZGlvTWVudSk7XHJcbiAgICAgICAgZml4UmFkaW9EaXZFbGVtZW50KHJhZGlvTWVudSk7XHJcbiAgICAgICAgc3R5bGVSYWRpb09wdGlvbnMocCwgcmFkaW9NZW51LCBbbWVudUl0ZW1DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmFkaW9NZW51O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UGFnZUNvbnRyb2xzKHA6IHA1LCBwbGF5bGlzdE1lbnVJZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgcGFnZUNvbnRyb2xzRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZURpdigpO1xyXG4gICAgfSwgXCJwYWdlQ29udHJvbHNEaXZcIik7XHJcbiAgICBpZiAoIXBhZ2VDb250cm9sc0Rpdi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2xzXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmFkZENsYXNzKFBsYXlGcm9tT25saW5lLlBMQVlfRlJPTV9PTkxJTkVfQ0xBU1MpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQsIDAuNSwgMC4zODMsIDE0MCwgMzApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYWdlTnVtYmVyVGV4dCA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgdGV4dENvbnRhaW5lciA9IHAuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgdGV4dENvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHJldHVybiB0ZXh0Q29udGFpbmVyO1xyXG4gICAgfSwgXCJwYWdlTnVtYmVyVGV4dFwiKTtcclxuXHJcbiAgICBsZXQgcHJldmlvdXNQYWdlQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIiYjODI0OTtcIik7XHJcbiAgICB9LCBcInByZXZpb3VzUGFnZUJ1dHRvblwiKTtcclxuICAgIGlmICghcHJldmlvdXNQYWdlQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwcmV2aW91c1BhZ2VCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBnbG9iYWwub25saW5lUGxheWxpc3QucHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheWxpc3RNZW51SWQpO1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyVGV4dC5lbGVtZW50Lmh0bWwoXCJQYWdlIFwiICsgKGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5nZXRQYWdlKCkgKyAxKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJldmlvdXNQYWdlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2wtYnV0dG9uXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKHByZXZpb3VzUGFnZUJ1dHRvbi5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZighcGFnZU51bWJlclRleHQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQuaHRtbChcIlBhZ2UgXCIgKyAoZ2xvYmFsLm9ubGluZVBsYXlsaXN0LmdldFBhZ2UoKSArIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV4dFBhZ2VCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiJiM4MjUwO1wiKTtcclxuICAgIH0sIFwibmV4dFBhZ2VCdXR0b25cIik7XHJcbiAgICBpZiAoIW5leHRQYWdlQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBuZXh0UGFnZUJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHBsYXlsaXN0TWVudUlkKTtcclxuICAgICAgICAgICAgcGFnZU51bWJlclRleHQuZWxlbWVudC5odG1sKFwiUGFnZSBcIiArIChnbG9iYWwub25saW5lUGxheWxpc3QuZ2V0UGFnZSgpICsgMSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5leHRQYWdlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLWNvbnRyb2wtYnV0dG9uXCIpO1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmNoaWxkKG5leHRQYWdlQnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge3NldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlfSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXN1bHRzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoXCJibGFja1wiKTtcclxuXHJcbiAgICAgICAgZ2xvYmFsLnJlc3VsdHNEaXNwbGF5LmRyYXcoKTtcclxuXHJcbiAgICAgICAgbGV0IHJldHVybkJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUmV0dXJuXCIpO1xyXG4gICAgICAgIH0sIFwicmV0dXJuQnV0dG9uXCIpO1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHJldHVybkJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuOSwgNzMsIDM0KTtcclxuICAgICAgICBpZiAoIXJldHVybkJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHJldHVybkJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybkJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5yZXR1cm4oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZpbGUgY29udGVudHMgb3JpZ2luYWxseSBmcm9tOlxyXG4gKiBAYXV0aG9yOiBWZWxvY2l0eVxyXG4gKiBAZ2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vZmxhc2hmbGFzaHJldm9sdXRpb24vd2ViLWJlYXRib3gtZWRpdG9yXHJcbiAqL1xyXG5cclxuY29uc3QgUkVDT1JESEVBREVSX0xFTkdUSF9GVUxMID0gMHgzZlxyXG4gICAgLy8gbnVsbC1jaGFyYWN0ZXJcclxuICAgICwgRU9TID0gMHgwMFxyXG4gICAgLCBzdHlsZUNvdW50RXh0ID0gMHhGRjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCeXRlUmVhZGVyIHtcclxuICAgIHB1YmxpYyBidWZmZXJfcmF3OiBBcnJheUJ1ZmZlckxpa2U7XHJcbiAgICBwdWJsaWMgYnVmZmVyOiBEYXRhVmlldztcclxuICAgIHB1YmxpYyBwb2ludGVyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcG9zaXRpb246IG51bWJlcjtcclxuICAgIHB1YmxpYyBjdXJyZW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlcl9yYXcgPSBidWZmZXI7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSAxO1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBidWZmZXIuYnl0ZUxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHVuc2lnbmVkIDE2IG9yIDMyIExpdHRsZSBFbmRpYW4gQml0c1xyXG4gICAgICogYW5kIGFkdmFuY2UgcG9pbnRlciB0byBuZXh0IGJpdHMgLyA4IGJ5dGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJpdHNcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFVJbnRMRShiaXRzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gMDtcclxuICAgICAgICBzd2l0Y2ggKGJpdHMpIHtcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogdGhlIHNlY29uZCBwYXJhbWV0ZXIgbWlnaHQgb25seSBleGlzdCBpbiBFUzYsIGxldCdzIHNlZSBpZiB0aGlzIGNhdXNlcyBhbiBlcnJvclxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRVaW50OCh0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTY6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldFVpbnQxNih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzI6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldFVpbnQzMih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVuZXhwZWN0ZWQgbnVtYmVyIG9mIGJpdHM6ICdcIiArIGJpdHMgKyBcIidcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb2ludGVyICs9IGJpdHMgLyA4O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHVuc2lnbmVkIDggYml0IGZyb20gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRVSW50OCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXIuZ2V0VWludDgodGhpcy5wb2ludGVyKyspO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGZsb2F0IGZyb20gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRGbG9hdCgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0RmxvYXQzMih0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXIgKz0gNDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBkb3VibGUgZnJvbSB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZERvdWJsZSgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0RmxvYXQ2NCh0aGlzLnBvaW50ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50ZXIgKz0gODtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyAzMi1iaXQgdW5zaWduZWQgaW50ZWdlcnMgdmFsdWUgZW5jb2RlZCAoMS01IGJ5dGVzKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gMzItYml0IHVuc2lnbmVkIGludGVnZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkRW5jb2RlZFUzMigpIHtcclxuICAgICAgICBsZXQgaSA9IDVcclxuICAgICAgICAgICAgLCByZXN1bHQgPSAwXHJcbiAgICAgICAgICAgICwgbmI7XHJcblxyXG4gICAgICAgIGRvXHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAobmIgPSB0aGlzLm5leHRCeXRlKCkpO1xyXG4gICAgICAgIHdoaWxlICgobmIgJiAxMjgpICYmIC0taSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYW4gZW5jb2RlZCBkYXRhIGZyb20gYnVmZmVyIGFuZCByZXR1cm5zIGFcclxuICAgICAqIHN0cmluZyB1c2luZyB0aGUgc3BlY2lmaWVkIGNoYXJhY3RlciBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gRGVjb2RlZCBzdHJpbmdcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkU3RyaW5nKCkge1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCByZWFkID0gdGhpcy5yZWFkVUludDgoKTtcclxuICAgICAgICAgICAgaWYgKHJlYWQgPT09IEVPUylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyZWFkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhbiBlbmNvZGVkIGRhdGEgZnJvbSBidWZmZXIgYW5kIHJldHVybnMgYVxyXG4gICAgICogc3RyaW5nIHVzaW5nIHRoZSBzcGVjaWZpZWQgY2hhcmFjdGVyIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBEZWNvZGVkIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFN0cmluZ0ZpeGVkKHJlYWRMZW5ndGg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHdoaWxlIChyZWFkTGVuZ3RoLS0gPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCByZWFkID0gdGhpcy5yZWFkVUludDgoKTtcclxuICAgICAgICAgICAgaWYgKHJlYWQgPT09IEVPUylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyZWFkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBSRUNPUkRIRUFERVIgZnJvbSBuZXh0IHRhZyBpbiB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUYWcgY29kZSBhbmQgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkVGFnQ29kZUFuZExlbmd0aCgpOiBUYWdIZWFkZXIge1xyXG4gICAgICAgIGxldCBwID0gdGhpcy5wb2ludGVyO1xyXG4gICAgICAgIGxldCBuID0gdGhpcy5yZWFkVUludExFKDE2KVxyXG4gICAgICAgICAgICAsIHRhZ1R5cGUgPSBuID4+IDZcclxuICAgICAgICAgICAgLCB0YWdMZW5ndGggPSBuICYgUkVDT1JESEVBREVSX0xFTkdUSF9GVUxMO1xyXG5cclxuICAgICAgICBpZiAobiA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0YWdMZW5ndGggPT09IFJFQ09SREhFQURFUl9MRU5HVEhfRlVMTClcclxuICAgICAgICAgICAgdGFnTGVuZ3RoID0gdGhpcy5yZWFkVUludExFKDMyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtzdGFydDogcCwgZW5kOiB0aGlzLnBvaW50ZXIgKyB0YWdMZW5ndGgsIGNvZGU6IHRhZ1R5cGUsIGxlbmd0aDogdGFnTGVuZ3RoLCBwb3NpdGlvbjogdGhpcy5wb2ludGVyfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBSRUNPUkRIRUFERVIgZnJvbSBuZXh0IHRhZyBpbiB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUYWcgY29kZSBhbmQgbGVuZ3RoXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZEFjdGlvbigpIHtcclxuICAgICAgICBsZXQgcyA9IHRoaXMucG9pbnRlcjtcclxuICAgICAgICBsZXQgYSA9IHRoaXMucmVhZFVJbnQ4KCk7XHJcbiAgICAgICAgbGV0IGwgPSAoYSAmIDB4ODApID8gdGhpcy5yZWFkVUludExFKDE2KSA6IDA7XHJcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBvaW50ZXI7XHJcblxyXG4gICAgICAgIHJldHVybiB7c3RhcnQ6IHMsIGFjdGlvbjogYSwgbGVuZ3RoOiBsLCBwb3NpdGlvbjogcH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgUkVDVCBmb3JtYXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fSB4LCB5LCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBSRUNUXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkUmVjdCgpOiBSZWN0IHtcclxuICAgICAgICB0aGlzLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGxldCBOQml0cyA9IHRoaXMucmVhZEJpdHMoNSlcclxuICAgICAgICAgICAgLCBYbWluID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMFxyXG4gICAgICAgICAgICAsIFhtYXggPSB0aGlzLnJlYWRCaXRzKE5CaXRzLCB0cnVlKSAvIDIwXHJcbiAgICAgICAgICAgICwgWW1pbiA9IHRoaXMucmVhZEJpdHMoTkJpdHMsIHRydWUpIC8gMjBcclxuICAgICAgICAgICAgLCBZbWF4ID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogWG1pbixcclxuICAgICAgICAgICAgeTogWW1pbixcclxuICAgICAgICAgICAgd2lkdGg6IChYbWF4ID4gWG1pbiA/IFhtYXggLSBYbWluIDogWG1pbiAtIFhtYXgpLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IChZbWF4ID4gWW1pbiA/IFltYXggLSBZbWluIDogWW1pbiAtIFltYXgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGludGVybmFsIHBvaW50ZXIgdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbjtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcG9zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWVrKHBvczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gcG9zICUgdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgcG9zaXRpb24gYW5kIHNldHMgY3VycmVudCB0byBuZXh0IEJ5dGUgaW4gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5leHRCeXRlKCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBuZXh0IEJ5dGUgaW4gdGhlIGJ1ZmZlciBhbmQgSW5jcmVtZW50IGludGVybmFsIHBvaW50ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IE5leHQgYnl0ZSBpbiBidWZmZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyBuZXh0Qnl0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludGVyID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCA/IG51bGwgOiB0aGlzLmJ1ZmZlci5nZXRVaW50OCh0aGlzLnBvaW50ZXIrKyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYiBiaXRzIGZyb20gY3VycmVudCBieXRlIGluIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEJpdHMgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZEJpdHMoYjogbnVtYmVyLCBzaWduZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBuID0gMFxyXG4gICAgICAgICAgICAsIHIgPSAwXHJcbiAgICAgICAgICAgICwgc2lnbiA9IHNpZ25lZCAmJiArK24gJiYgKCh0aGlzLmN1cnJlbnQgPj4gKDggLSB0aGlzLnBvc2l0aW9uKyspKSAmIDEpID8gLTEgOiAxO1xyXG5cclxuICAgICAgICB3aGlsZSAobisrIDwgYikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA+IDgpIHRoaXMuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIHIgPSAociA8PCAxKSArICgodGhpcy5jdXJyZW50ID4+ICg4IC0gdGhpcy5wb3NpdGlvbisrKSkgJiAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpZ24gKiByO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcGxhY2UgYnl0ZXMgaW4gdGhlIEFycmF5QnVmZmVyIHdpdGggdGhlIHByb3ZpZGVkIGJ5dGVzLlxyXG4gICAgICogVGhpcyBzbGljZXMgdGhlIGZyb20gYDAgLT4gcG9pbnRlcmAgYW5kIGBwb3NpdGlvbl9lbmQgLT4gYnVmZmVybGVuZ3RoYFxyXG4gICAgICogYW5kIGluc2VydHMgdGhlIGdpdmVuIGJ5dGVzIGJldHdlZW4gdGhlbS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEJpdHMgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVwbGFjZUJ5dGVzKG5ld19ieXRlczogYW55LCBwb3N0aW9uX2VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcjEgPSB0aGlzLmJ1ZmZlcl9yYXcuc2xpY2UoMCwgdGhpcy5wb2ludGVyKTtcclxuICAgICAgICBsZXQgYnVmZmVyMiA9IG5ld19ieXRlcztcclxuICAgICAgICBsZXQgYnVmZmVyMyA9IHRoaXMuYnVmZmVyX3Jhdy5zbGljZShwb3N0aW9uX2VuZCk7XHJcblxyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgVWludDhBcnJheShidWZmZXIxLmJ5dGVMZW5ndGggKyBidWZmZXIyLmJ5dGVMZW5ndGggKyBidWZmZXIzLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyMSksIDApO1xyXG4gICAgICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyMiksIGJ1ZmZlcjEuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmZXIzKSwgYnVmZmVyMS5ieXRlTGVuZ3RoICsgYnVmZmVyMi5ieXRlTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWZmZXJfcmF3ID0gdG1wLmJ1ZmZlcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcl9yYXcpO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gMDtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlY3Qge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhZyB7XHJcbiAgICBwb29sPzogc3RyaW5nW107XHJcbiAgICB2YXJpYWJsZXM/OiBhbnk7XHJcbiAgICBoZWFkZXI/OiBUYWdIZWFkZXI7XHJcbiAgICBkb0luY2x1ZGU/OiBib29sZWFuO1xyXG4gICAgZGF0YT86IEFycmF5QnVmZmVyTGlrZVxyXG4gICAgYXVkaW9fYnl0ZXM/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnSGVhZGVyIHtcclxuICAgIHN0YXJ0OiBudW1iZXI7XHJcbiAgICBlbmQ6IG51bWJlcjtcclxuICAgIGNvZGU6IG51bWJlcjtcclxuICAgIGxlbmd0aDogbnVtYmVyO1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxufSIsImV4cG9ydCBjbGFzcyBQYXJ0aWFsUGFyc2Uge1xyXG4gICAgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbiAgICBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlVHlwZSB7XHJcbiAgICBOT05FID0gXCIwXCIsXHJcbiAgICBOT1JNQUwgPSBcIjFcIixcclxuICAgIEhPTERfSEVBRCA9IFwiMlwiLFxyXG4gICAgVEFJTCA9IFwiM1wiLFxyXG4gICAgUk9MTF9IRUFEID0gXCI0XCIsXHJcbiAgICBNSU5FID0gXCJNXCIsXHJcbiAgICBVTktOT1dOID0gXCI/Pz9cIixcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvTm90ZVR5cGUoc3RyaW5nOiBzdHJpbmcpOiBOb3RlVHlwZSB7XHJcbiAgICBzd2l0Y2ggKHN0cmluZykge1xyXG4gICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT05FO1xyXG4gICAgICAgIGNhc2UgXCIxXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT1JNQUw7XHJcbiAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLkhPTERfSEVBRDtcclxuICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuVEFJTDtcclxuICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuUk9MTF9IRUFEO1xyXG4gICAgICAgIGNhc2UgXCJNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5NSU5FO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5VTktOT1dOO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlU3RhdGUge1xyXG4gICAgREVGQVVMVCxcclxuICAgIEhJVCxcclxuICAgIE1JU1NFRCxcclxuICAgIEhFTEQsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZSB7XHJcbiAgICB0eXBlOiBOb3RlVHlwZTtcclxuICAgIHR5cGVTdHJpbmc6IHN0cmluZzsgLy8gdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZSBCRUZPUkUgaXQncyBpbnRlcnByZXRlZCBhcyBhIE5vdGVUeXBlXHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBzdGF0ZT86IE5vdGVTdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGUge1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBkaWZmaWN1bHR5OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbWV0ZXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRnVsbFBhcnNlIHtcclxuICAgIG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXTtcclxuICAgIG9mZnNldDogbnVtYmVyO1xyXG4gICAgYnBtczogW251bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgc3RvcHM6IFtudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UpIHtcclxuICAgICAgICB0aGlzLm1ldGFEYXRhID0gcGFydGlhbFBhcnNlLm1ldGFEYXRhO1xyXG4gICAgICAgIHRoaXMubW9kZXMgPSBwYXJ0aWFsUGFyc2UubW9kZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIFN0ZXAgT25lIE9mIFBhcnNpbmcgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpYWxQYXJzZShmaWxlQ29udGVudHM6IHN0cmluZykge1xyXG4gICAgbGV0IHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlID0gbmV3IFBhcnRpYWxQYXJzZSgpO1xyXG4gICAgcGFydGlhbFBhcnNlLm1ldGFEYXRhID0gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZUNvbnRlbnRzKTtcclxuICAgIHBhcnRpYWxQYXJzZS5tb2RlcyA9IGdldE1vZGVzSW5mb0FzU3RyaW5ncyhmaWxlQ29udGVudHMpO1xyXG4gICAgcmV0dXJuIHBhcnRpYWxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZTogc3RyaW5nKSB7XHJcbiAgICAvLyBtYXRjaCBhbnkgbWV0YWRhdGEgdGFnIGV4Y2x1ZGluZyB0aGUgXCJOT1RFU1wiIHRhZyAoY2FzZS1pbnNlbnNpdGl2ZSlcclxuICAgIGxldCByZSA9IC8jKD8hW25OXVtvT11bdFRdW2VFXVtzU10pKFteOl0rKTooW147XSspOy9nO1xyXG4gICAgbGV0IG1hdGNoZXMgPSBbLi4uZmlsZS5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWF0Y2hlc1tpXTtcclxuICAgICAgICBtZXRhRGF0YS5zZXQoY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsxXSkudG9VcHBlckNhc2UoKSwgY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsyXSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ldGFEYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNb2Rlc0luZm9Bc1N0cmluZ3MoZmlsZUNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIC8vIEdldCBcIk5PVEVTXCIgc2VjdGlvbnMgKGNhc2UtaW5zZW5zaXRpdmUpLiBUaGUgZmlyc3QgZml2ZSB2YWx1ZXMgYXJlIHBvc3RmaXhlZCB3aXRoIGEgY29sb24uXHJcbiAgICAvLyBOb3RlIGRhdGEgY29tZXMgbGFzdCwgcG9zdGZpeGVkIGJ5IGEgc2VtaWNvbG9uLlxyXG4gICAgbGV0IHJlID0gLyNbbk5dW29PXVt0VF1bZUVdW3NTXTooW146XSopOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjpdKik6KFteO10rOykvZztcclxuICAgIGxldCBtYXRjaGVzID0gWy4uLmZpbGVDb250ZW50cy5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W10gPSBbXTtcclxuICAgIGxldCBmaWVsZE5hbWVzID0gW1widHlwZVwiLCBcImRlc2MvYXV0aG9yXCIsIFwiZGlmZmljdWx0eVwiLCBcIm1ldGVyXCIsIFwicmFkYXJcIl07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaGVzW2ldO1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgbWF0Y2gubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgIG1vZGUuc2V0KGZpZWxkTmFtZXNbaiAtIDFdLCBjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoW2pdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGUuc2V0KFwibm90ZXNcIiwgbWF0Y2hbbWF0Y2gubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIG1vZGVzLnB1c2gobW9kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW9kZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFuTWV0YURhdGFTdHJpbmcoc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0cmluZy50cmltKCkucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG59XHJcblxyXG4vKiBTdGVwIFR3byBPZiBQYXJzaW5nICovXHJcblxyXG4vLyBUT0RPOiBhY3R1YWxseSByZXR1cm4gRnVsbFBhcnNlXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGdWxsUGFyc2UobW9kZUluZGV4OiBudW1iZXIsIHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlKTogRnVsbFBhcnNlIHtcclxuICAgIGxldCBmdWxsUGFyc2UgPSBuZXcgRnVsbFBhcnNlKHBhcnRpYWxQYXJzZSk7XHJcbiAgICBsZXQgdW5wYXJzZWROb3Rlczogc3RyaW5nID0gcGFydGlhbFBhcnNlLm1vZGVzW21vZGVJbmRleF0uZ2V0KFwibm90ZXNcIik7XHJcbiAgICBsZXQgdW5wYXJzZWRBcnJheTogc3RyaW5nW10gPSB1bnBhcnNlZE5vdGVzLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgbGV0IG1lYXN1cmVzOiBzdHJpbmdbXVtdID0gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheSk7XHJcbiAgICBsZXQgYmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXMpO1xyXG4gICAgbGV0IGNsZWFuZWRCZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSByZW1vdmVCbGFua0xpbmVzKGJlYXRzQW5kTGluZXMpO1xyXG4gICAgbGV0IG9mZnNldDogbnVtYmVyID0gcGFyc2VGbG9hdChwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiT0ZGU0VUXCIpKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gcGFyc2VCUE1TKHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJCUE1TXCIpKTtcclxuICAgIGxldCBzdG9wczogeyBzdG9wRHVyYXRpb246IG51bWJlcjsgYmVhdDogbnVtYmVyIH1bXSA9IHBhcnNlU3RvcHMocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIlNUT1BTXCIpKTtcclxuICAgIGxldCB0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0VGltZUluZm9CeUxpbmUoY2xlYW5lZEJlYXRzQW5kTGluZXMsIG9mZnNldCwgYnBtcywgc3RvcHMpO1xyXG4gICAgZnVsbFBhcnNlLnRyYWNrcyA9IGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXMpO1xyXG4gICAgcmV0dXJuIGZ1bGxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheTogc3RyaW5nW10pIHtcclxuICAgIGxldCBtZWFzdXJlczogc3RyaW5nW11bXSA9IFtdO1xyXG4gICAgbGV0IHN0YXRlID0gMDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBjdXJyZW50TWVhc3VyZTogc3RyaW5nW10gPSBbXTtcclxuICAgIHdoaWxlIChpIDwgdW5wYXJzZWRBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgY3VycmVudExpbmUgPSB1bnBhcnNlZEFycmF5W2ldO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50TGluZS5pbmNsdWRlcyhcIi8vXCIpICYmIGN1cnJlbnRMaW5lLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudExpbmUuaW5jbHVkZXMoXCIsXCIpICYmICFjdXJyZW50TGluZS5pbmNsdWRlcyhcIjtcIikgJiYgY3VycmVudExpbmUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUucHVzaChjdXJyZW50TGluZS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVzLnB1c2goY3VycmVudE1lYXN1cmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtZWFzdXJlcztcclxufVxyXG5cclxuLy8gYXNzdW1lcyA0LzQgdGltZSBzaWduYXR1cmVcclxuZnVuY3Rpb24gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXM6IHN0cmluZ1tdW10pIHtcclxuICAgIGxldCBiZWF0c0FuZExpbmVzID0gW107XHJcbiAgICBsZXQgY3VycmVudEJlYXQgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtZWFzdXJlID0gbWVhc3VyZXNbaV07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZWFzdXJlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGJlYXRzQW5kTGluZXMucHVzaCh7YmVhdDogY3VycmVudEJlYXQsIGxpbmVJbmZvOiBtZWFzdXJlW2pdfSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRCZWF0ICs9IDQgLyBtZWFzdXJlLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQmxhbmtMaW5lcyhiZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10pIHtcclxuICAgIGxldCBjbGVhbmVkQmVhdHNBbmRMaW5lcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZWF0c0FuZExpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBiZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGlmICghaXNBbGxaZXJvcyhsaW5lLmxpbmVJbmZvKSkge1xyXG4gICAgICAgICAgICBjbGVhbmVkQmVhdHNBbmRMaW5lcy5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbGVhbmVkQmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNBbGxaZXJvcyhzdHJpbmc6IHN0cmluZykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc3RyaW5nLmNoYXJBdChpKSAhPT0gJzAnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZUluZm9CeUxpbmUoaW5mb0J5TGluZTogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdLCBvZmZzZXQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W11cclxuKTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10ge1xyXG4gICAgbGV0IGluZm9CeUxpbmVXaXRoVGltZTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSBbXTtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IC1vZmZzZXQgKyBnZXRFbGFwc2VkVGltZSgwLCBpbmZvQnlMaW5lWzBdLmJlYXQsIGJwbXMsIHN0b3BzKTtcclxuICAgIGluZm9CeUxpbmVXaXRoVGltZS5wdXNoKHt0aW1lOiBjdXJyZW50VGltZSwgYmVhdDogaW5mb0J5TGluZVswXS5iZWF0LCBsaW5lSW5mbzogaW5mb0J5TGluZVswXS5saW5lSW5mb30pO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbmZvQnlMaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmVhdCA9IGluZm9CeUxpbmVbaSAtIDFdLmJlYXQ7XHJcbiAgICAgICAgbGV0IGVuZEJlYXQgPSBpbmZvQnlMaW5lW2ldLmJlYXQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gZ2V0RWxhcHNlZFRpbWUoc3RhcnRCZWF0LCBlbmRCZWF0LCBicG1zLCBzdG9wcyk7XHJcbiAgICAgICAgaW5mb0J5TGluZVdpdGhUaW1lLnB1c2goe3RpbWU6IGN1cnJlbnRUaW1lLCBiZWF0OiBpbmZvQnlMaW5lW2ldLmJlYXQsIGxpbmVJbmZvOiBpbmZvQnlMaW5lW2ldLmxpbmVJbmZvfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5mb0J5TGluZVdpdGhUaW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRFbGFwc2VkVGltZShzdGFydEJlYXQ6IG51bWJlciwgZW5kQmVhdDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IGN1cnJlbnRCUE1JbmRleDogbnVtYmVyID0gZ2V0U3RhcnRCUE1JbmRleChzdGFydEJlYXQsIGJwbXMpO1xyXG4gICAgbGV0IGVhcmxpZXN0QmVhdDogbnVtYmVyID0gc3RhcnRCZWF0O1xyXG4gICAgbGV0IGVsYXBzZWRUaW1lOiBudW1iZXIgPSBzdG9wcyA9PSBudWxsID8gMCA6IHN0b3BwZWRUaW1lKHN0YXJ0QmVhdCwgZW5kQmVhdCwgc3RvcHMpO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGxldCBuZXh0QlBNQ2hhbmdlOiBudW1iZXIgPSBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleCwgYnBtcyk7XHJcbiAgICAgICAgbGV0IG5leHRCZWF0OiBudW1iZXIgPSBNYXRoLm1pbihlbmRCZWF0LCBuZXh0QlBNQ2hhbmdlKTtcclxuICAgICAgICBlbGFwc2VkVGltZSArPSAobmV4dEJlYXQgLSBlYXJsaWVzdEJlYXQpIC8gYnBtc1tjdXJyZW50QlBNSW5kZXhdLmJwbSAqIDYwO1xyXG4gICAgICAgIGVhcmxpZXN0QmVhdCA9IG5leHRCZWF0O1xyXG4gICAgICAgIGN1cnJlbnRCUE1JbmRleCsrO1xyXG4gICAgfSB3aGlsZSAoZWFybGllc3RCZWF0IDwgZW5kQmVhdCk7XHJcbiAgICByZXR1cm4gZWxhcHNlZFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN0YXJ0QlBNSW5kZXgoc3RhcnRCZWF0OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10pIHtcclxuICAgIGxldCBzdGFydEJQTUluZGV4ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYnBtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChicG1zW2ldLmJlYXQgPCBzdGFydEJlYXQpIHtcclxuICAgICAgICAgICAgc3RhcnRCUE1JbmRleCA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXJ0QlBNSW5kZXg7XHJcbn1cclxuXHJcbi8vIGRvZXMgTk9UIHNuYXAgdG8gbmVhcmVzdCAxLzE5Mm5kIG9mIGJlYXRcclxuZnVuY3Rpb24gc3RvcHBlZFRpbWUoc3RhcnRCZWF0OiBudW1iZXIsIGVuZEJlYXQ6IG51bWJlciwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W10pIHtcclxuICAgIGxldCB0aW1lID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RvcEJlYXQgPSBzdG9wc1tpXS5iZWF0O1xyXG4gICAgICAgIGlmIChzdGFydEJlYXQgPD0gc3RvcEJlYXQgJiYgc3RvcEJlYXQgPCBlbmRCZWF0KSB7XHJcbiAgICAgICAgICAgIHRpbWUgKz0gc3RvcHNbaV0uc3RvcER1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdKSB7XHJcbiAgICBpZiAoY3VycmVudEJQTUluZGV4ICsgMSA8IGJwbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGJwbXNbY3VycmVudEJQTUluZGV4ICsgMV0uYmVhdDtcclxuICAgIH1cclxuICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmc7IH1bXSkge1xyXG4gICAgbGV0IG51bVRyYWNrczogbnVtYmVyID0gdGltZXNCZWF0c0FuZExpbmVzWzBdLmxpbmVJbmZvLmxlbmd0aDtcclxuICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgdHJhY2tzLnB1c2goW10pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lc0JlYXRzQW5kTGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbGluZTogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZyB9ID0gdGltZXNCZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZS5saW5lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZVN0cmluZyA9IGxpbmUubGluZUluZm8uY2hhckF0KGopO1xyXG4gICAgICAgICAgICBsZXQgbm90ZVR5cGU6IE5vdGVUeXBlID0gc3RyaW5nVG9Ob3RlVHlwZSh0eXBlU3RyaW5nKTtcclxuICAgICAgICAgICAgaWYgKG5vdGVUeXBlICE9PSBOb3RlVHlwZS5OT05FKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja3Nbal0ucHVzaCh7dHlwZTogbm90ZVR5cGUsIHR5cGVTdHJpbmc6IHR5cGVTdHJpbmcsIHRpbWVJblNlY29uZHM6IGxpbmUudGltZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyYWNrcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VCUE1TKGJwbVN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoYnBtU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgYnBtQXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oYnBtU3RyaW5nKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJwbUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnBtcy5wdXNoKHtiZWF0OiBicG1BcnJheVtpXVswXSwgYnBtOiBicG1BcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJwbXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlU3RvcHMoc3RvcHNTdHJpbmc6IHN0cmluZykge1xyXG4gICAgaWYgKHN0b3BzU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgc3RvcHNBcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihzdG9wc1N0cmluZyk7XHJcbiAgICBsZXQgc3RvcHM6IHsgc3RvcER1cmF0aW9uOiBudW1iZXI7IGJlYXQ6IG51bWJlciB9W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN0b3BzLnB1c2goe2JlYXQ6IHN0b3BzQXJyYXlbaV1bMF0sIHN0b3BEdXJhdGlvbjogc3RvcHNBcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0b3BzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKHN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBsZXQgc3RyaW5nQXJyYXk6IHN0cmluZ1tdW10gPSBzdHJpbmcuc3BsaXQoXCIsXCIpLm1hcChlID0+IGUudHJpbSgpLnNwbGl0KFwiPVwiKSk7XHJcbiAgICBsZXQgYXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmdBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5LnB1c2goW3BhcnNlRmxvYXQoc3RyaW5nQXJyYXlbaV1bMF0pLCBwYXJzZUZsb2F0KHN0cmluZ0FycmF5W2ldWzFdKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge1NXRlRhZ3N9IGZyb20gXCIuL3N3Zi10YWdzXCI7XHJcbmltcG9ydCB7U1dGLCB1bmNvbXByZXNzfSBmcm9tIFwiLi9zd2YtcmVhZGVyXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi4vYXVkaW9fZmlsZVwiO1xyXG5pbXBvcnQge1N0ZXBmaWxlfSBmcm9tIFwiLi4vc3RlcGZpbGVcIjtcclxuXHJcbi8qKlxyXG4gKiBGaWxlIGNvbnRlbnRzIG9yaWdpbmFsbHkgZnJvbTpcclxuICogQGF1dGhvcjogVmVsb2NpdHlcclxuICogQGdpdGh1YjogaHR0cHM6Ly9naXRodWIuY29tL2ZsYXNoZmxhc2hyZXZvbHV0aW9uL3dlYi1iZWF0Ym94LWVkaXRvclxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN3ZihpbnB1dDogRmlsZSB8IEFycmF5QnVmZmVyLCBzdGVwZmlsZTogU3RlcGZpbGUsIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICBpZiAoaW5wdXQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHN3ZkZpbGVfUmVhZHkoPFVpbnQ4QXJyYXk+IGlucHV0LCBzdGVwZmlsZSwgYXVkaW9GaWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHN3ZkZpbGVfUmVhZHkoPFVpbnQ4QXJyYXk+IGV2ZW50LnRhcmdldC5yZXN1bHQsIHN0ZXBmaWxlLCBhdWRpb0ZpbGUpO1xyXG4gICAgfTtcclxuICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBhbGVydChcIkkgQU0gRVJST1I6IFwiICsgZXZlbnQudGFyZ2V0LmVycm9yLmNvZGUpO1xyXG4gICAgfTtcclxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcig8RmlsZT4gaW5wdXQpO1xyXG59XHJcblxyXG5sZXQgc3dmX3RhZ3M6IFNXRjtcclxuXHJcbmZ1bmN0aW9uIHN3ZkZpbGVfUmVhZHkoYnVmZmVyOiBVaW50OEFycmF5LCBzdGVwZmlsZTogU3RlcGZpbGUsIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICBzd2ZfdGFncyA9IHVuY29tcHJlc3MoYnVmZmVyKTtcclxuICAgIFxyXG4gICAgLy8gQ2hhcnQgRGF0YVxyXG4gICAgbGV0IGNoYXJ0X3RhZyA9IGdldEJlYXRCb3goKTtcclxuICAgIGxldCBjaGFydF9kYXRhID0gY2hhcnRfdGFnW1widmFyaWFibGVzXCJdW1wiX3Jvb3RcIl1bXCJiZWF0Qm94XCJdO1xyXG4gICAgc3RlcGZpbGUubG9hZEZmckJlYXRtYXAoY2hhcnRfZGF0YSk7XHJcblxyXG4gICAgLy8gTXVzaWMgRGF0YVxyXG4gICAgbGV0IG11c2ljX2JpbmFyeSA9IGdldEF1ZGlvKCk7XHJcbiAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFttdXNpY19iaW5hcnldLCB7dHlwZSA6ICdhdWRpby9tcGVnJ30pO1xyXG4gICAgYXVkaW9GaWxlLmxvYWRCbG9iKGJsb2IpO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZCBCZWF0Ym94IGluIHRoZSBzd2ZfdGFncy5cclxuICovXHJcbmZ1bmN0aW9uIGdldEJlYXRCb3goKSB7XHJcbiAgICBsZXQgbGVuID0gc3dmX3RhZ3MudGFncy5sZW5ndGg7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgZWxtID0gbnVsbDtcclxuXHJcbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGVsbSA9IHN3Zl90YWdzLnRhZ3NbaV07XHJcbiAgICAgICAgaWYoZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuRE9BQ1RJT04pXHJcbiAgICAgICAgICAgIHJldHVybiBlbG07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kIEJlYXRib3ggaW4gdGhlIHN3Zl90YWdzLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QXVkaW8oKSB7XHJcbiAgICBsZXQgbGVuID0gc3dmX3RhZ3MudGFncy5sZW5ndGg7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgZWxtID0gbnVsbDtcclxuXHJcbiAgICBsZXQgYXVkaW9TaXplID0gMFxyXG5cclxuICAgIC8vIExvb3AgQWxsIEF1ZGlvIFRhZ3MsIGdldCBUb3RhbCBCeXRlIFNpemVcclxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgZWxtID0gc3dmX3RhZ3MudGFnc1tpXTtcclxuICAgICAgICBpZihlbG0uaGVhZGVyLmNvZGUgPT0gU1dGVGFncy5ERUZJTkVTT1VORCB8fCBlbG0uaGVhZGVyLmNvZGUgPT0gU1dGVGFncy5TVFJFQU1CTE9DSylcclxuICAgICAgICAgICAgYXVkaW9TaXplICs9IGVsbS5hdWRpb19ieXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBMb29wIEFsbCBBdWRpbyBUYWdzLCBnZXQgVG90YWwgQnl0ZSBTaXplXHJcbiAgICBsZXQgd3JpdGVQb3NpdGlvbiA9IDA7XHJcbiAgICBsZXQgYmluYXJ5ID0gbmV3IFVpbnQ4QXJyYXkoYXVkaW9TaXplKTtcclxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgZWxtID0gc3dmX3RhZ3MudGFnc1tpXTtcclxuICAgICAgICBpZihlbG0uaGVhZGVyLmNvZGUgPT0gU1dGVGFncy5ERUZJTkVTT1VORCB8fCBlbG0uaGVhZGVyLmNvZGUgPT0gU1dGVGFncy5TVFJFQU1CTE9DSykge1xyXG4gICAgICAgICAgICBiaW5hcnkuc2V0KG5ldyBVaW50OEFycmF5KGVsbS5kYXRhKSwgd3JpdGVQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHdyaXRlUG9zaXRpb24gKz0gZWxtLmF1ZGlvX2J5dGVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBiaW5hcnk7XHJcbn0iLCJpbXBvcnQgKiBhcyBwYWtvIGZyb20gXCJwYWtvXCI7XHJcbmltcG9ydCB7U1dGQWN0aW9uVGFncywgU1dGT3RoZXJUYWdzLCBTV0ZUYWdzLCBTV0ZUeXBlVGFnc30gZnJvbSBcIi4vc3dmLXRhZ3NcIjtcclxuaW1wb3J0IHtCeXRlUmVhZGVyLCBSZWN0LCBUYWcsIFRhZ0hlYWRlcn0gZnJvbSBcIi4vYnl0ZV9yZWFkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBGaWxlIGNvbnRlbnRzIG9yaWdpbmFsbHkgZnJvbTpcclxuICogQGF1dGhvcjogVmVsb2NpdHlcclxuICogQGdpdGh1YjogaHR0cHM6Ly9naXRodWIuY29tL2ZsYXNoZmxhc2hyZXZvbHV0aW9uL3dlYi1iZWF0Ym94LWVkaXRvclxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTV0Yge1xyXG4gICAgcHVibGljIGJ1ZmZlcjogQnl0ZVJlYWRlcjtcclxuICAgIHB1YmxpYyBtYWdpYzogc3RyaW5nO1xyXG4gICAgcHVibGljIHZlcnNpb246IG51bWJlcjtcclxuICAgIHB1YmxpYyBmaWxlTGVuZ3RoOiB7IGNvbXByZXNzZWQ6IG51bWJlciwgdW5jb21wcmVzc2VkOiBudW1iZXIgfTtcclxuICAgIHB1YmxpYyBmcmFtZVNpemU6IFJlY3Q7XHJcbiAgICBwdWJsaWMgZnJhbWVSYXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZnJhbWVDb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRhZ3M6IGFueVtdO1xyXG59XHJcblxyXG4vKipcclxuICogQ29uY2F0IFNXRiBIZWFkZXIgd2l0aCB1bmNvbXByZXNzZWQgQnVmZmVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0U1dGSGVhZGVyKGJ1ZmY6IFVpbnQ4QXJyYXksIHN3ZjogQXJyYXlCdWZmZXIpIHtcclxuICAgIGxldCB0bXAgPSBuZXcgVWludDhBcnJheShidWZmLmJ5dGVMZW5ndGggKyA4KTtcclxuICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoc3dmLnNsaWNlKDAsIDgpKSk7XHJcbiAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmYpLCA4KTtcclxuICAgIHJldHVybiB0bXAuYnVmZmVyO1xyXG59XHJcblxyXG4vKipcclxuICogRGVjb21wcmVzcyBTV0YgaWYgbmVlZGVkIGFuZCBSZWFkIFNXRlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVuY29tcHJlc3Moc3dmOiBVaW50OEFycmF5KSB7XHJcbiAgICBsZXQgc3dmX2J5dGVzID0gbmV3IFVpbnQ4QXJyYXkoc3dmKTtcclxuICAgIGxldCBjb21wcmVzc2VkX2J1ZmY6IFVpbnQ4QXJyYXkgPSBzd2Yuc2xpY2UoOCk7XHJcblxyXG4gICAgLy8gdW5jb21wcmVzcyBidWZmZXJcclxuICAgIHN3aXRjaCAoc3dmX2J5dGVzWzBdKSB7IC8vIE1BR0lDXHJcbiAgICAgICAgY2FzZSAweDQzIDogLy8gJ0MnID0gemxpYiBjb21wcmVzc2VkXHJcbiAgICAgICAgICAgIGxldCB1bmNvbXByZXNzZWRfYnVmZiA9IGNvbmNhdFNXRkhlYWRlcihwYWtvLmluZmxhdGUoY29tcHJlc3NlZF9idWZmKSwgc3dmKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRTV0ZCdWZmKG5ldyBCeXRlUmVhZGVyKHVuY29tcHJlc3NlZF9idWZmKSwgc3dmKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMHg0NiA6IC8vICdGJyA9IHVuY29tcHJlc3NlZFxyXG4gICAgICAgICAgICByZXR1cm4gcmVhZFNXRkJ1ZmYobmV3IEJ5dGVSZWFkZXIoc3dmKSwgc3dmKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMHg1YSA6IC8vIExaTUEgY29tcHJlc3NlZFxyXG4gICAgICAgICAgICBhbGVydCgnQ2Fubm90IGhhbmRsZSBMWk1BIFNXRiBjb21wcmVzc2lvbnMnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICBhbGVydCgnVW5rbm93biBTV0YgY29tcHJlc3Npb25zJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVhZHMgdGhlIFNXRiBmcm9tIHVuY29tcHJlc3NlZCBidWZmZXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVhZFNXRkJ1ZmYoYnVmZjogQnl0ZVJlYWRlciwgY29tcHJlc3NlZF9idWZmOiBBcnJheUJ1ZmZlcik6IFNXRiB7XHJcbiAgICBidWZmLnNlZWsoMCk7Ly8gc3RhcnRcclxuXHJcbiAgICBsZXQgc3dmID0gbmV3IFNXRigpXHJcbiAgICBzd2YuYnVmZmVyID0gYnVmZjtcclxuICAgIHN3Zi5tYWdpYyA9IGJ1ZmYucmVhZFN0cmluZ0ZpeGVkKDMpO1xyXG4gICAgc3dmLnZlcnNpb24gPSBidWZmLnJlYWRVSW50OCgpO1xyXG4gICAgc3dmLmZpbGVMZW5ndGggPSB7XHJcbiAgICAgICAgY29tcHJlc3NlZDogY29tcHJlc3NlZF9idWZmLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkOiBidWZmLnJlYWRVSW50TEUoMzIpXHJcbiAgICB9O1xyXG4gICAgc3dmLmZyYW1lU2l6ZSA9IGJ1ZmYucmVhZFJlY3QoKTtcclxuICAgIHN3Zi5mcmFtZVJhdGUgPSBidWZmLnJlYWRVSW50TEUoMTYpIC8gMjU2O1xyXG4gICAgc3dmLmZyYW1lQ291bnQgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBzd2YudGFncyA9IHJlYWRTV0ZUYWdzKGJ1ZmYpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN3ZjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyB0aGUgU1dGIFRBRyBkYXRhIHN0cnVjdHVyZSwga2VlcGluZyBvbmx5IHRoZSB0YWdzXHJcbiAqIHdlIGFyZSBpbnRlcmVzdGVkIGluLlxyXG4gKiAtIEF1ZGlvIFRhZ3M6IEF1ZGlvIFNhbXBsZXNcclxuICogLSBEbyBBY3Rpb24gVGFnOiBDb250YWluaW5nIHRoZSBiZWF0Qm94IHZhcmlhYmxlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRTV0ZUYWdzKGJ1ZmY6IEJ5dGVSZWFkZXIpIHtcclxuICAgIGxldCB0YWdzOiBUYWdbXSA9IFtdO1xyXG4gICAgbGV0IHRhZ0hlYWRlcjogVGFnSGVhZGVyO1xyXG5cclxuICAgIGxldCBtcDNTZWVrID0gMDtcclxuICAgIGxldCBtcDNTYW1wbGVzID0gMDtcclxuICAgIGxldCBtcDNJZCA9IDA7XHJcbiAgICBsZXQgbXAzRm9ybWF0ID0gMDtcclxuICAgIGxldCBtcDNTdHJlYW0gPSBmYWxzZTtcclxuXHJcbiAgICAvKiBSZWFkcyBUYWdDb2RlQW5kTGVuZ3RoIGZyb20gVGFnJ3MgUkVDT1JESEVBREVSICovXHJcbiAgICB3aGlsZSAoKHRhZ0hlYWRlciA9IGJ1ZmYucmVhZFRhZ0NvZGVBbmRMZW5ndGgoKSkgIT09IG51bGwpIHtcclxuICAgICAgICBsZXQgdGFnOiBUYWcgPSB7fTtcclxuICAgICAgICB0YWcuaGVhZGVyID0gdGFnSGVhZGVyO1xyXG4gICAgICAgIHRhZy5kb0luY2x1ZGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0YWdIZWFkZXIuY29kZSkge1xyXG4gICAgICAgICAgICAvLyBTb3VuZCBUYWdzIC0gTVAzIEV4dHJhY3Rpb25cclxuICAgICAgICAgICAgY2FzZSBTV0ZUYWdzLlNUUkVBTUJMT0NLOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFtcDNTdHJlYW0gfHwgKCh0YWdIZWFkZXIubGVuZ3RoIC0gNCkgPT0gMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgbXAzU2FtcGxlcyArPSBidWZmLnJlYWRVSW50TEUoMTYpOyAvLyBmcmFtZSBzYW1wbGVzXHJcbiAgICAgICAgICAgICAgICBidWZmLnJlYWRVSW50TEUoMTYpOyAvLyBzZWVrIHNhbXBsZXNcclxuXHJcbiAgICAgICAgICAgICAgICB0YWcuZGF0YSA9IGJ1ZmYuYnVmZmVyX3Jhdy5zbGljZShidWZmLnBvaW50ZXIsIGJ1ZmYucG9pbnRlciArICh0YWdIZWFkZXIubGVuZ3RoIC0gNCkpO1xyXG4gICAgICAgICAgICAgICAgdGFnLmF1ZGlvX2J5dGVzID0gKHRhZ0hlYWRlci5sZW5ndGggLSA0KTtcclxuICAgICAgICAgICAgICAgIHRhZy5kb0luY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuU1RSRUFNSEVBRDpcclxuICAgICAgICAgICAgY2FzZSBTV0ZUYWdzLlNUUkVBTUhFQUQyOlxyXG4gICAgICAgICAgICAgICAgYnVmZi5yZWFkVUludExFKDgpO1xyXG4gICAgICAgICAgICAgICAgbXAzRm9ybWF0ID0gYnVmZi5yZWFkVUludExFKDgpO1xyXG4gICAgICAgICAgICAgICAgYnVmZi5yZWFkVUludExFKDE2KTsgLy8gYXZlcmFnZSBmcmFtZSBzYW1wbGVzXHJcbiAgICAgICAgICAgICAgICBtcDNTZWVrID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgICAgICAgICAgICAgIGlmICgoKG1wM0Zvcm1hdCA+Pj4gNCkgJiAweGYpID09IFNXRk90aGVyVGFncy5DT0RFQ19NUDMpXHJcbiAgICAgICAgICAgICAgICAgICAgbXAzU3RyZWFtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBTV0ZUYWdzLkRFRklORVNPVU5EOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFtcDNTdHJlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtYXQgPSBidWZmLnJlYWRVSW50TEUoOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgoZm9ybWF0ID4+PiA0KSAmIDB4ZikgPT0gU1dGT3RoZXJUYWdzLkNPREVDX01QMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcDNJZCA9IGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcDNGb3JtYXQgPSBmb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1wM1NhbXBsZXMgPSBidWZmLnJlYWRVSW50TEUoMzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcDNTZWVrID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnLmRhdGEgPSBidWZmLmJ1ZmZlcl9yYXcuc2xpY2UoYnVmZi5wb2ludGVyLCBidWZmLnBvaW50ZXIgKyAodGFnSGVhZGVyLmxlbmd0aCAtIDkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnLmF1ZGlvX2J5dGVzID0gKHRhZ0hlYWRlci5sZW5ndGggLSA5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnLmRvSW5jbHVkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBEb0FjdGlvbiAtIFdoZXJlIHRoZSBCZWF0Ym94IExpdmVzXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5ET0FDVElPTiA6XHJcbiAgICAgICAgICAgICAgICBsZXQgX2ZpbmlzaGVkUmVhZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25TdGFjazogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25WYXJpYWJsZXM6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblJlZ2lzdGVyczogW2FueSwgYW55LCBhbnksIGFueV0gPSBbbnVsbCwgbnVsbCwgbnVsbCwgbnVsbF07XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uc3RhbnRQb29sID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCFfZmluaXNoZWRSZWFkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGJ1ZmYucmVhZEFjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWFkIEFjdGlvbiBUYWdcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLkVORDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9maW5pc2hlZFJlYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuQ09OU1RBTlRQT09MOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRQb29sID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29uc3RhbnRDb3VudCA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnN0YW50Q291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50UG9vbC5wdXNoKGJ1ZmYucmVhZFN0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLlBVU0g6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYnVmZi5wb2ludGVyIDwgYWN0aW9uLnBvc2l0aW9uICsgYWN0aW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwdXNoVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHB1c2hUeXBlID0gYnVmZi5yZWFkVUludExFKDgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHVzaFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5TVFJJTkdfTElURVJBTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGJ1ZmYucmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkZMT0FUX0xJVEVSQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWRGbG9hdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLk5VTEw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLlVOREVGSU5FRDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5SRUdJU1RFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGFjdGlvblJlZ2lzdGVyc1tidWZmLnJlYWRVSW50TEUoOCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBCb29sZWFuKGJ1ZmYucmVhZFVJbnRMRSg4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuRE9VQkxFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYnVmZi5yZWFkRG91YmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuSU5URUdFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGJ1ZmYucmVhZFVJbnRMRSgzMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuQ09OU1RBTlQ4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gY29uc3RhbnRQb29sW2J1ZmYucmVhZFVJbnRMRSg4KV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuQ09OU1RBTlQxNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGNvbnN0YW50UG9vbFtidWZmLnJlYWRVSW50TEUoMTYpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9VTkQgVU5TVVBQT1JURUQgUFVTSERBVEEgVFlQRTogXCIgKyBwdXNoVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChwdXNoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuUE9QOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5EVVBMSUNBVEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wdXNoKGFjdGlvblN0YWNrW2FjdGlvblN0YWNrLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLlNUT1JFX1JFR0lTVEVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uUmVnaXN0ZXJzW2J1ZmYucmVhZFVJbnRMRSg4KV0gPSBhY3Rpb25TdGFja1thY3Rpb25TdGFjay5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLkdFVF9WQVJJQUJMRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBndk5hbWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGd2TmFtZSBpbiBhY3Rpb25WYXJpYWJsZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblZhcmlhYmxlc1tndk5hbWVdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wdXNoKGFjdGlvblZhcmlhYmxlc1tndk5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLlNFVF9WQVJJQUJMRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdlZhbHVlID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25WYXJpYWJsZXNbYWN0aW9uU3RhY2sucG9wKCldID0gc3ZWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLklOSVRfQVJSQVk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXlTaXplID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlTaXplOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChhY3Rpb25TdGFjay5wb3AoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25TdGFjay5wdXNoKGFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLkdFVF9NRU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ21OYW1lID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ21PYmplY3QgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGdtTmFtZSBpbiBnbU9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ21PYmplY3RbZ21OYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChnbU9iamVjdFtnbU5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLlNFVF9NRU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc21WYWx1ZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNtTmFtZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucG9wKClbc21OYW1lXSA9IHNtVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgdGFnIGlzbid0IHN1cHBvcnRlZCwgYnV0IGl0IHNlZW1zIHRvIGJlIGluIGV2ZXJ5IGZpbGUsIHNvIEknbSBpZ25vcmluZyBpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGT1VORCBVTlNVUFBPUlRFRCBBQ1RJT04gVEFHOiBcIiArIGFjdGlvbi5hY3Rpb24udG9TdHJpbmcoMTYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25WYXJpYWJsZXNbXCJfcm9vdFwiXSAhPSB1bmRlZmluZWQgJiYgYWN0aW9uVmFyaWFibGVzW1wiX3Jvb3RcIl1bXCJiZWF0Qm94XCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIHRhZy5kb0luY2x1ZGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZy5wb29sID0gY29uc3RhbnRQb29sO1xyXG4gICAgICAgICAgICAgICAgdGFnLnZhcmlhYmxlcyA9IGFjdGlvblZhcmlhYmxlcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vdGFnLmRhdGEgPSBidWZmLmJ1ZmZlcl9yYXcuc2xpY2UoYnVmZi5wb2ludGVyLCBidWZmLnBvaW50ZXIgKyB0YWdIZWFkZXIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhZy5kb0luY2x1ZGUpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRhZy5kb0luY2x1ZGU7XHJcbiAgICAgICAgICAgIHRhZ3MucHVzaCh0YWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnVmZi5zZWVrKHRhZ0hlYWRlci5wb3NpdGlvbiArIHRhZ0hlYWRlci5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhZ3M7XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvbGxlY3Rpb24gb2YgU1dGIHRhZ3MgYW5kIHRhZyB0eXBlcyB0byBhc3Npc3Qgd2l0aCByZWFkaW5nIGFuZCBwYXJzaW5nIGEgLnN3ZiBmaWxlLlxyXG4gKlxyXG4gKiBGaWxlIGNvbnRlbnRzIG9yaWdpbmFsbHkgZnJvbTpcclxuICogQGF1dGhvcjogVmVsb2NpdHlcclxuICogQGdpdGh1YjogaHR0cHM6Ly9naXRodWIuY29tL2ZsYXNoZmxhc2hyZXZvbHV0aW9uL3dlYi1iZWF0Ym94LWVkaXRvclxyXG4gKi9cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZUYWdzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgRU5EOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBTSE9XRlJBTUU6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc3RhdGljIERPQUNUSU9OOiBudW1iZXIgPSAxMjtcclxuICAgIHB1YmxpYyBzdGF0aWMgREVGSU5FU09VTkQ6IG51bWJlciA9IDE0O1xyXG4gICAgcHVibGljIHN0YXRpYyBTVFJFQU1IRUFEOiBudW1iZXIgPSAxODtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RSRUFNQkxPQ0s6IG51bWJlciA9IDE5O1xyXG4gICAgcHVibGljIHN0YXRpYyBTVFJFQU1IRUFEMjogbnVtYmVyID0gNDU7XHJcbiAgICBwdWJsaWMgc3RhdGljIEZJTEVBVFRSSUJVVEVTOiBudW1iZXIgPSA2OTtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNXRkFjdGlvblRhZ3Mge1xyXG4gICAgcHVibGljIHN0YXRpYyBFTkQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPTlNUQU5UUE9PTDogbnVtYmVyID0gMHg4ODtcclxuICAgIHB1YmxpYyBzdGF0aWMgUFVTSDogbnVtYmVyID0gMHg5NjtcclxuICAgIHB1YmxpYyBzdGF0aWMgUE9QOiBudW1iZXIgPSAweDE3O1xyXG4gICAgcHVibGljIHN0YXRpYyBEVVBMSUNBVEU6IG51bWJlciA9IDB4NEM7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUT1JFX1JFR0lTVEVSOiBudW1iZXIgPSAweDg3O1xyXG4gICAgcHVibGljIHN0YXRpYyBHRVRfVkFSSUFCTEU6IG51bWJlciA9IDB4MUM7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNFVF9WQVJJQUJMRTogbnVtYmVyID0gMHgxRDtcclxuICAgIHB1YmxpYyBzdGF0aWMgSU5JVF9BUlJBWTogbnVtYmVyID0gMHg0MjtcclxuICAgIHB1YmxpYyBzdGF0aWMgR0VUX01FTUJFUjogbnVtYmVyID0gMHg0RTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU0VUX01FTUJFUjogbnVtYmVyID0gMHg0RjtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNXRlR5cGVUYWdzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RSSU5HX0xJVEVSQUw6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIEZMT0FUX0xJVEVSQUw6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc3RhdGljIE5VTEw6IG51bWJlciA9IDI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVOREVGSU5FRDogbnVtYmVyID0gMztcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVHSVNURVI6IG51bWJlciA9IDQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJPT0xFQU46IG51bWJlciA9IDU7XHJcbiAgICBwdWJsaWMgc3RhdGljIERPVUJMRTogbnVtYmVyID0gNjtcclxuICAgIHB1YmxpYyBzdGF0aWMgSU5URUdFUjogbnVtYmVyID0gNztcclxuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RBTlQ4OiBudW1iZXIgPSA4O1xyXG4gICAgcHVibGljIHN0YXRpYyBDT05TVEFOVDE2OiBudW1iZXIgPSA5O1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU1dGT3RoZXJUYWdzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ09ERUNfTVAzOiBudW1iZXIgPSAyO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZSB7XHJcbiAgICBwcml2YXRlIGluaXRpYWxQb3NpdGlvbjogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsVmVsb2NpdHk6IHA1LlZlY3RvcjtcclxuICAgIHByaXZhdGUgY29uc3RhbnRBY2NlbGVyYXRpb246IHA1LlZlY3RvcjtcclxuICAgIHByaXZhdGUgY3JlYXRpb25UaW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29sb3I6IHA1LkNvbG9yO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGljbGVTaXplOiBudW1iZXIgPSAyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxQb3NpdGlvbjogcDUuVmVjdG9yLCBpbml0aWFsVmVsb2NpdHk6IHA1LlZlY3RvciwgY29uc3RhbnRBY2NlbGVyYXRpb246IHA1LlZlY3RvcixcclxuICAgICAgICAgICAgICAgIGNyZWF0aW9uVGltZUluU2Vjb25kczogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxQb3NpdGlvbiA9IGluaXRpYWxQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmluaXRpYWxWZWxvY2l0eSA9IGluaXRpYWxWZWxvY2l0eTtcclxuICAgICAgICB0aGlzLmNvbnN0YW50QWNjZWxlcmF0aW9uID0gY29uc3RhbnRBY2NlbGVyYXRpb247XHJcbiAgICAgICAgdGhpcy5jcmVhdGlvblRpbWVJblNlY29uZHMgPSBjcmVhdGlvblRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGVsYXBzZWRUaW1lID0gdGhpcy5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbjogcDUuVmVjdG9yID0gdGhpcy5nZXRQb3NpdGlvbihwLCBlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5ub1N0cm9rZSgpO1xyXG4gICAgICAgIHAuZmlsbChjb2xvcik7XHJcbiAgICAgICAgcC5jaXJjbGUoY3VycmVudFBvc2l0aW9uLngsIGN1cnJlbnRQb3NpdGlvbi55LCBQYXJ0aWNsZS5wYXJ0aWNsZVNpemUpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQb3NpdGlvbihwOiBwNSwgZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB2ZWxvY2l0eUNvbXBvbmVudDogcDUuVmVjdG9yID0gcDUuVmVjdG9yLm11bHQodGhpcy5pbml0aWFsVmVsb2NpdHksIGVsYXBzZWRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgYWNjZWxlcmF0aW9uQ29tcG9uZW50OiBwNS5WZWN0b3IgPSBwNS5WZWN0b3IubXVsdCh0aGlzLmNvbnN0YW50QWNjZWxlcmF0aW9uLFxyXG4gICAgICAgICAgICBlbGFwc2VkVGltZUluU2Vjb25kcyAqIGVsYXBzZWRUaW1lSW5TZWNvbmRzIC8gMik7XHJcbiAgICAgICAgcmV0dXJuIHA1LlZlY3Rvci5hZGQocDUuVmVjdG9yLmFkZCh0aGlzLmluaXRpYWxQb3NpdGlvbiwgdmVsb2NpdHlDb21wb25lbnQpLCBhY2NlbGVyYXRpb25Db21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gdGhpcy5jcmVhdGlvblRpbWVJblNlY29uZHM7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1BhcnRpY2xlfSBmcm9tIFwiLi9wYXJ0aWNsZVwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFydGljbGVTeXN0ZW0ge1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZXM6IFBhcnRpY2xlW107XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY29uc3RhbnRBY2NlbGVyYXRpb246IHA1LlZlY3RvcjtcclxuICAgIHByaXZhdGUgc3RhdGljIHZlbG9jaXR5QW5nbGVWYXJpYXRpb25JbkRlZ3JlZXM6IG51bWJlciA9IDMwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmVsb2NpdHlNYWduaXR1ZGVWYXJpYXRpb25JblBlcmNlbnQ6IG51bWJlciA9IDMwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY29sb3JWYXJpYXRpb246IG51bWJlciA9IDMwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHM6IG51bWJlciwgY29uc3RhbnRBY2NlbGVyYXRpb246IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVMaWZldGltZUluU2Vjb25kcyA9IHBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgdGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbiA9IGNvbnN0YW50QWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLm9sZGVzdFBhcnRpY2xlQWdlKGN1cnJlbnRUaW1lSW5TZWNvbmRzKSA+IHRoaXMucGFydGljbGVMaWZldGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9sZGVzdFBhcnRpY2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBhcnRpY2xlOiBQYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xyXG4gICAgICAgICAgICBsZXQgYWxwaGFBZGp1c3RlZENvbG9yOiBwNS5Db2xvciA9IHRoaXMuZ2V0QWxwaGFBZGp1c3RlZENvbG9yKHBhcnRpY2xlLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMsIGFscGhhQWRqdXN0ZWRDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb2xkZXN0UGFydGljbGVBZ2UoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcnRpY2xlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnRpY2xlc1swXS5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU9sZGVzdFBhcnRpY2xlKCkge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzLnNoaWZ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBbHBoYUFkanVzdGVkQ29sb3IocGFydGljbGU6IFBhcnRpY2xlLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGJhc2VDb2xvciA9IHBhcnRpY2xlLmNvbG9yO1xyXG4gICAgICAgIGxldCBwYXJ0aWNsZUFnZSA9IHBhcnRpY2xlLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgbGlmZVJlbWFpbmluZ1BlcmNlbnQgPSAodGhpcy5wYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzIC0gcGFydGljbGVBZ2UpIC8gdGhpcy5wYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBhbHBoYSA9IHRoaXMuaW50ZXJwb2xhdGUoMCwgMjU1LCBsaWZlUmVtYWluaW5nUGVyY2VudCk7XHJcbiAgICAgICAgbGV0IG5ld0NvbG9yOiBwNS5Db2xvciA9IHAuY29sb3IoYmFzZUNvbG9yKTtcclxuICAgICAgICBuZXdDb2xvci5zZXRBbHBoYShhbHBoYSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW50ZXJwb2xhdGUobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlciwgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyYXRpbyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJhdGlvID4gMCAmJiByYXRpbyA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlICsgKG1heFZhbHVlIC0gbWluVmFsdWUpICogcmF0aW87XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUmFuZG9taXplZFBhcnRpY2xlcyhpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvciwgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3IsIGNyZWF0aW9uVGltZUluU2Vjb25kczogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtUGFydGljbGVzOiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGFydGljbGVzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5ld0luaXRhbFZlbG9jaXR5ID0gdGhpcy5yYW5kb21pemVWZWN0b3IocCwgaW5pdGlhbFZlbG9jaXR5KTtcclxuICAgICAgICAgICAgbGV0IG5ld0NvbG9yID0gdGhpcy5yYW5kb21pemVDb2xvcihwLCBjb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFydGljbGUoaW5pdGlhbFBvc2l0aW9uLCBuZXdJbml0YWxWZWxvY2l0eSwgY3JlYXRpb25UaW1lSW5TZWNvbmRzLCBuZXdDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9taXplVmVjdG9yKHA6IHA1LCBiYXNlVmVjdG9yOiBwNS5WZWN0b3IpIHtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uUmFuZG9taXplZDogcDUuVmVjdG9yID0gdGhpcy5yYW5kb21pemVWZWN0b3JEaXJlY3Rpb24ocCwgYmFzZVZlY3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZG9taXplVmVjdG9yTWFnbml0dWRlKHAsIGRpcmVjdGlvblJhbmRvbWl6ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9taXplVmVjdG9yRGlyZWN0aW9uKHA6IHA1LCBiYXNlVmVjdG9yOiBwNS5WZWN0b3IpIHtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgIGxldCBhbmdsZUluRGVncmVlcyA9IGJhc2VWZWN0b3IuaGVhZGluZygpO1xyXG4gICAgICAgIGxldCBhbmdsZUNoYW5nZUluRGVncmVlcyA9IHAucmFuZG9tKC1QYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eUFuZ2xlVmFyaWF0aW9uSW5EZWdyZWVzIC8gMixcclxuICAgICAgICAgICAgUGFydGljbGVTeXN0ZW0udmVsb2NpdHlBbmdsZVZhcmlhdGlvbkluRGVncmVlcyAvIDIpO1xyXG4gICAgICAgIGxldCBmaW5hbEFuZ2xlSW5SYWRpYW5zID0gcC5yYWRpYW5zKGFuZ2xlSW5EZWdyZWVzICsgYW5nbGVDaGFuZ2VJbkRlZ3JlZXMpO1xyXG4gICAgICAgIGxldCBtYWduaXR1ZGUgPSBiYXNlVmVjdG9yLm1hZygpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICAgICAgcmV0dXJuIHA1LlZlY3Rvci5mcm9tQW5nbGUoZmluYWxBbmdsZUluUmFkaWFucywgbWFnbml0dWRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZVZlY3Rvck1hZ25pdHVkZShwOiBwNSwgYmFzZVZlY3RvcjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IG1hZ25pdHVkZUNoYW5nZUluUGVyY2VudCA9IHAucmFuZG9tKC1QYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eU1hZ25pdHVkZVZhcmlhdGlvbkluUGVyY2VudCAvIDIsXHJcbiAgICAgICAgICAgIFBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5TWFnbml0dWRlVmFyaWF0aW9uSW5QZXJjZW50IC8gMik7XHJcbiAgICAgICAgbGV0IGZpbmFsTWFnbml0dWRlID0gYmFzZVZlY3Rvci5tYWcoKSAqICgxMDAgKyBtYWduaXR1ZGVDaGFuZ2VJblBlcmNlbnQpIC8gMTAwO1xyXG4gICAgICAgIHJldHVybiBiYXNlVmVjdG9yLnNldE1hZyhmaW5hbE1hZ25pdHVkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVDb2xvcihwOiBwNSwgYmFzZUNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIGxldCBuZXdSZWQgPSB0aGlzLmJvdW5kZWRSYW5kb21pemUocCwgcC5yZWQoYmFzZUNvbG9yKSwgUGFydGljbGVTeXN0ZW0uY29sb3JWYXJpYXRpb24sIDAsIDI1NSk7XHJcbiAgICAgICAgbGV0IG5ld0dyZWVuID0gdGhpcy5ib3VuZGVkUmFuZG9taXplKHAsIHAuZ3JlZW4oYmFzZUNvbG9yKSwgUGFydGljbGVTeXN0ZW0uY29sb3JWYXJpYXRpb24sIDAsIDI1NSk7XHJcbiAgICAgICAgbGV0IG5ld0JsdWUgPSB0aGlzLmJvdW5kZWRSYW5kb21pemUocCwgcC5ibHVlKGJhc2VDb2xvciksIFBhcnRpY2xlU3lzdGVtLmNvbG9yVmFyaWF0aW9uLCAwLCAyNTUpO1xyXG4gICAgICAgIHJldHVybiBwLmNvbG9yKG5ld1JlZCwgbmV3R3JlZW4sIG5ld0JsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYm91bmRlZFJhbmRvbWl6ZShwOiBwNSwgdmFsdWU6IG51bWJlciwgdmFyaWF0aW9uOiBudW1iZXIsIGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdmFsdWUgKyBwLnJhbmRvbSgtdmFyaWF0aW9uIC8gMiwgdmFyaWF0aW9uIC8gMik7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlIDw9IGxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvd2VyQm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb3dlckJvdW5kIDwgbmV3VmFsdWUgJiYgbmV3VmFsdWUgPCB1cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBhcnRpY2xlKGluaXRpYWxQb3NpdGlvbjogcDUuVmVjdG9yLCBpbml0aWFsVmVsb2NpdHk6IHA1LlZlY3RvciwgY3JlYXRpb25UaW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMucHVzaChcclxuICAgICAgICAgICAgbmV3IFBhcnRpY2xlKGluaXRpYWxQb3NpdGlvbiwgaW5pdGlhbFZlbG9jaXR5LCB0aGlzLmNvbnN0YW50QWNjZWxlcmF0aW9uLCBjcmVhdGlvblRpbWVJblNlY29uZHMsIGNvbG9yKSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUGxheWVyS2V5QWN0aW9uIHtcclxuICAgIGdhbWVUaW1lOiBudW1iZXI7XHJcbiAgICB0cmFjazogbnVtYmVyO1xyXG4gICAga2V5U3RhdGU6IEtleVN0YXRlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdhbWVUaW1lOiBudW1iZXIsIHRyYWNrOiBudW1iZXIsIGtleVN0YXRlOiBLZXlTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZVRpbWUgPSBnYW1lVGltZTtcclxuICAgICAgICB0aGlzLnRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgdGhpcy5rZXlTdGF0ZSA9IGtleVN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBLZXlTdGF0ZSB7XHJcbiAgICBVUCwgRE9XTixcclxufSIsImltcG9ydCB7UDVTY2VuZX0gZnJvbSBcIi4vcDVfc2NlbmVcIjtcclxuaW1wb3J0IHtEaXNwbGF5Q29uZmlnLCBEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge1RpbWVNYW5hZ2VyfSBmcm9tIFwiLi90aW1lX21hbmFnZXJcIjtcclxuaW1wb3J0IHtNaXNzTWFuYWdlcn0gZnJvbSBcIi4vbWlzc19tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lNYW5hZ2VyfSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7U2Nyb2xsTWFuYWdlcn0gZnJvbSBcIi4vc2Nyb2xsX21hbmFnZXJcIjtcclxuaW1wb3J0IHtSZXN1bHRzRGlzcGxheX0gZnJvbSBcIi4vcmVzdWx0c19kaXNwbGF5XCI7XHJcbmltcG9ydCB7Tm90ZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0hvbGRNYW5hZ2VyfSBmcm9tIFwiLi9ob2xkX21hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lVGltZVByb3ZpZGVyfSBmcm9tIFwiLi9nYW1lX3RpbWVfcHJvdmlkZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge1xyXG4gICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzLFxyXG4gICAgaXNLZXlCaW5kaW5nc0RlZmluZWQsXHJcbiAgICByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXMsXHJcbiAgICBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlXHJcbn0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtLZXlTdGF0ZSwgUGxheWVyS2V5QWN0aW9ufSBmcm9tIFwiLi9wbGF5ZXJfa2V5X2FjdGlvblwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmd9IGZyb20gXCIuL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lFdmVudCwgQWNjdXJhY3lSZWNvcmRpbmcsIEFjY3VyYWN5UmVjb3JkaW5nU3RhdGV9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0FjY3VyYWN5RmVlZGJhY2tUZXh0fSBmcm9tIFwiLi9hY2N1cmFjeV9mZWVkYmFja190ZXh0XCI7XHJcbmltcG9ydCB7UmVjZXB0b3JTaHJpbmtSZWFjdGlvbn0gZnJvbSBcIi4vcmVjZXB0b3Jfc2hyaW5rX3JlYWN0aW9uXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lGZWVkYmFja0ZsYXNofSBmcm9tIFwiLi9hY2N1cmFjeV9mZWVkYmFja19mbGFzaFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXN9IGZyb20gXCIuL2FjY3VyYWN5X2ZlZWRiYWNrX3BhcnRpY2xlc1wiO1xyXG5pbXBvcnQge0hvbGRQYXJ0aWNsZXN9IGZyb20gXCIuL2hvbGRfcGFydGljbGVzXCI7XHJcbmltcG9ydCB7SG9sZEdsb3d9IGZyb20gXCIuL2hvbGRfZ2xvd1wiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZX0gZnJvbSBcIi4vYXVkaW9fZmlsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXlpbmdEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgc2NlbmU6IFA1U2NlbmU7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgdGltZU1hbmFnZXI6IEdhbWVUaW1lUHJvdmlkZXI7XHJcbiAgICBwcml2YXRlIG1pc3NNYW5hZ2VyOiBNaXNzTWFuYWdlcjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGdhbWVFbmRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNob3dSZXN1bHRzU2NyZWVuOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGlzRGVidWdNb2RlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5RmVlZGJhY2tUZXh0OiBBY2N1cmFjeUZlZWRiYWNrVGV4dDtcclxuICAgIHByaXZhdGUgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSByZWNlcHRvclNocmlua1JlYWN0aW9uOiBSZWNlcHRvclNocmlua1JlYWN0aW9uO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeUZlZWRiYWNrRmxhc2g6IEFjY3VyYWN5RmVlZGJhY2tGbGFzaDtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlczogQWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcztcclxuICAgIHByaXZhdGUgaG9sZFBhcnRpY2xlczogSG9sZFBhcnRpY2xlcztcclxuICAgIHByaXZhdGUgaG9sZEdsb3c6IEhvbGRHbG93O1xyXG4gICAgcHJpdmF0ZSBhdWRpb0ZpbGU6IEF1ZGlvRmlsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3M6IE5vdGVbXVtdLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSwgY29uZmlnOiBDb25maWcsIHNjZW5lOiBQNVNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0c1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXVkaW9GaWxlID0gYXVkaW9GaWxlO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgdGltZSBtYW5hZ2VyIGFuZCBwbGF5IHRoZSBhdWRpbyBhcyBjbG9zZSB0b2dldGhlciBhcyBwb3NzaWJsZSB0byBzeW5jaHJvbml6ZSB0aGUgYXVkaW8gd2l0aCB0aGUgZ2FtZVxyXG4gICAgICAgIGlmICghdGhpcy5pc0RlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFRpbWVNYW5hZ2VyKHBlcmZvcm1hbmNlLm5vdygpLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9GaWxlLnBsYXkoY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbmV3IE5vdGVNYW5hZ2VyKHRyYWNrcyk7XHJcbiAgICAgICAgbGV0IG51bVRyYWNrczogbnVtYmVyID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBuZXcgQWNjdXJhY3lSZWNvcmRpbmcobnVtVHJhY2tzKTtcclxuXHJcbiAgICAgICAgbGV0IHdpZHRoID0gMjQwO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSA0ODA7XHJcbiAgICAgICAgbGV0IHRvcExlZnRYID0gKHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2Uud2lkdGggLSB3aWR0aCkgLyAyO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WSA9ICh0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLmhlaWdodCAtIGhlaWdodCkgLyAyO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IG5ldyBQbGF5aW5nQ29uZmlnKHRoaXMuY29uZmlnLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBuZXcgRGlzcGxheU1hbmFnZXIodGhpcy5ub3RlTWFuYWdlciwgdGhpcy5kaXNwbGF5Q29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLFxyXG4gICAgICAgICAgICB0b3BMZWZ0WCwgdG9wTGVmdFksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLmhvbGRQYXJ0aWNsZXMgPSBuZXcgSG9sZFBhcnRpY2xlcyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzLCB0aGlzLmRpc3BsYXlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmhvbGRHbG93ID0gbmV3IEhvbGRHbG93KHRoaXMuY29uZmlnLCBudW1UcmFja3MsIHRoaXMuZGlzcGxheU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuaG9sZE1hbmFnZXIgPSBuZXcgSG9sZE1hbmFnZXIobnVtVHJhY2tzLCB0aGlzLm9uVHJhY2tIb2xkLmJpbmQodGhpcyksIHRoaXMub25UcmFja1VuaG9sZC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBTY3JvbGxNYW5hZ2VyKHRoaXMuY29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUVuZFRpbWUgPSB0aGlzLmNhbGN1bGF0ZUdhbWVFbmQodGhpcy5hdWRpb0ZpbGUuZ2V0RHVyYXRpb24oKSwgdGhpcy5nZXROb3Rlc0VuZFRpbWUoKSk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIgPSBuZXcgQWNjdXJhY3lNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuY29uZmlnLCB0aGlzLmhvbGRNYW5hZ2VyLFxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5taXNzTWFuYWdlciA9IG5ldyBNaXNzTWFuYWdlcih0aGlzLmNvbmZpZywgdGhpcy5ub3RlTWFuYWdlciwgdGhpcy5hY2N1cmFjeVJlY29yZGluZywgdGhpcy5ob2xkTWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tUZXh0ID0gbmV3IEFjY3VyYWN5RmVlZGJhY2tUZXh0KHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRvcExlZnRYICsgd2lkdGggLyAyLFxyXG4gICAgICAgICAgICB0b3BMZWZ0WSArIGhlaWdodCAvIDIsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tGbGFzaCA9IG5ldyBBY2N1cmFjeUZlZWRiYWNrRmxhc2godGhpcy5hY2N1cmFjeVJlY29yZGluZywgdGhpcy5jb25maWcsIHRoaXMuZGlzcGxheU1hbmFnZXIsXHJcbiAgICAgICAgICAgIG51bVRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNocmlua1JlYWN0aW9uID0gbmV3IFJlY2VwdG9yU2hyaW5rUmVhY3Rpb24odGhpcy5jb25maWcsIHRoaXMuZGlzcGxheUNvbmZpZywgbnVtVHJhY2tzKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMgPSBuZXcgQWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcyh0aGlzLmNvbmZpZywgdGhpcy5kaXNwbGF5TWFuYWdlciwgbnVtVHJhY2tzKTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0tleUJpbmRpbmdzRGVmaW5lZChudW1UcmFja3MpKSB7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyhudW1UcmFja3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJpbmRLZXlCaW5kaW5nc1RvQWN0aW9ucygpO1xyXG4gICAgICAgIHNldEFsbE5vdGVzVG9EZWZhdWx0U3RhdGUodGhpcy5ub3RlTWFuYWdlci50cmFja3MpO1xyXG4gICAgICAgIHJlcGxhY2VOb3RZZXRJbXBsZW1lbnRlZE5vdGVUeXBlcyh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVBY2N1cmFjeUV2ZW50KGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRyYWNrICNcIiArIChhY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyICsgMSkgKyBcIiBcIiArIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lOYW1lICtcclxuICAgICAgICAvLyAgICAgKE1hdGguYWJzKGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMpID09IEluZmluaXR5ID9cclxuICAgICAgICAvLyAgICAgICAgIFwiXCIgOlxyXG4gICAgICAgIC8vICAgICAgICAgXCIgKFwiICsgTWF0aC5yb3VuZChhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzKSArIFwiIG1zKVwiKSk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRBY2N1cmFjeUV2ZW50KGFjY3VyYWN5RXZlbnQpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcy5hZGRQYXJ0aWNsZXNGb3JBY2N1cmFjeUV2ZW50KGFjY3VyYWN5RXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZUluU2Vjb25kcyA9IHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VGltZUluU2Vjb25kcyA+PSB0aGlzLmdhbWVFbmRUaW1lICYmICF0aGlzLnNob3dSZXN1bHRzU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcuc3RhdGUgPSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlLlJFQURZO1xyXG4gICAgICAgICAgICB0aGlzLmVuZFNvbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5taXNzTWFuYWdlci51cGRhdGUoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNocmlua1JlYWN0aW9uLmRyYXcoKTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNBY2N1cmFjeVRleHRFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja1RleHQuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRHbG93LmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tGbGFzaC5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5vdGVzRW5kVGltZSgpIHtcclxuICAgICAgICBsZXQgZWFybGllc3RBY2N1cmFjeTogbnVtYmVyO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGVhcmxpZXN0QWNjdXJhY3kgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlYXJsaWVzdEFjY3VyYWN5ID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDJdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm5vdGVNYW5hZ2VyLmdldExhdGVzdE5vdGUoKS50aW1lSW5TZWNvbmRzICsgZWFybGllc3RBY2N1cmFjeSAvIDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVHYW1lRW5kKGF1ZGlvRHVyYXRpb246IG51bWJlciwgbm90ZXNFbmRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoYXVkaW9EdXJhdGlvbiA8IG5vdGVzRW5kVGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbm90ZXNFbmRUaW1lICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKG5vdGVzRW5kVGltZSArIDUsIGF1ZGlvRHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5kU29uZygpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvRmlsZS5zdG9wKCk7XHJcbiAgICAgICAgZ2xvYmFsLnJlc3VsdHNEaXNwbGF5ID0gbmV3IFJlc3VsdHNEaXNwbGF5KHRoaXMuY29uZmlnLCB0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmFjY3VyYWN5TWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSwgdGhpcy5hY2N1cmFjeVJlY29yZGluZyk7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuUkVTVUxUUyk7XHJcbiAgICAgICAgdGhpcy51bmJpbmRLZXlzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiaW5kS2V5QmluZGluZ3NUb0FjdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzID0gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQodGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICBsZXQgaXNTcGFjZWJhckJvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNwYWNlYmFyS2V5Q29kZTogbnVtYmVyID0gMzI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlCaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZzogS2V5QmluZGluZyA9IGtleUJpbmRpbmdzW2ldO1xyXG4gICAgICAgICAgICBpZiAoa2V5QmluZGluZy5rZXlDb2RlID09PSBzcGFjZWJhcktleUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGlzU3BhY2ViYXJCb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbihrZXlCaW5kaW5nLmtleUNvZGUsXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlEb3duQWN0aW9uRm9yVHJhY2soa2V5QmluZGluZy50cmFja051bWJlcilcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlVcEFjdGlvbkZvclRyYWNrKGtleUJpbmRpbmcudHJhY2tOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbihnbG9iYWwuY29uZmlnLnF1aXRLZXksICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbmRTb25nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghaXNTcGFjZWJhckJvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIGJpbmQga2V5IHRvIG5vdGhpbmcgdG8gbWFrZSBzdXJlIHRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIHByZXZlbnRlZFxyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKHNwYWNlYmFyS2V5Q29kZSwgKCkgPT4ge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGtleURvd25BY3Rpb25Gb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNocmlua1JlYWN0aW9uLmhvbGRUcmFjayh0cmFja051bWJlcik7XHJcbiAgICAgICAgbGV0IHBsYXllcktleUFjdGlvbjogUGxheWVyS2V5QWN0aW9uID1cclxuICAgICAgICAgICAgbmV3IFBsYXllcktleUFjdGlvbih0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKSwgdHJhY2tOdW1iZXIsIEtleVN0YXRlLkRPV04pO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyLmhhbmRsZVBsYXllckFjdGlvbihwbGF5ZXJLZXlBY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUga2V5VXBBY3Rpb25Gb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNocmlua1JlYWN0aW9uLnJlbGVhc2VUcmFjayh0cmFja051bWJlcik7XHJcbiAgICAgICAgbGV0IHBsYXllcktleUFjdGlvbjogUGxheWVyS2V5QWN0aW9uID1cclxuICAgICAgICAgICAgbmV3IFBsYXllcktleUFjdGlvbih0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKSwgdHJhY2tOdW1iZXIsIEtleVN0YXRlLlVQKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlci5oYW5kbGVQbGF5ZXJBY3Rpb24ocGxheWVyS2V5QWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVHJhY2tIb2xkKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy5ob2xkVHJhY2suY2FsbCh0aGlzLmhvbGRHbG93LCB0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRQYXJ0aWNsZXMuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkUGFydGljbGVzLCB0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVHJhY2tVbmhvbGQodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRHbG93LnVuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkR2xvdywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzLnVuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkUGFydGljbGVzLCB0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVuYmluZEtleXMoKSB7XHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzID0gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQodGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nID0ga2V5QmluZGluZ3NbaV07XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoa2V5QmluZGluZy5rZXlDb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBsYXlpbmdDb25maWcgaW1wbGVtZW50cyBEaXNwbGF5Q29uZmlnIHtcclxuICAgIHB1YmxpYyBub3RlU2l6ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzY3JvbGxEaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbjtcclxuICAgIHB1YmxpYyByZWNlcHRvclNpemVzOiBudW1iZXJbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMucGl4ZWxzUGVyU2Vjb25kID0gY29uZmlnLnBpeGVsc1BlclNlY29uZDtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yWVBlcmNlbnQgPSBjb25maWcucmVjZXB0b3JZUGVyY2VudDtcclxuICAgICAgICB0aGlzLnNjcm9sbERpcmVjdGlvbiA9IGNvbmZpZy5zY3JvbGxEaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMucHVzaChjb25maWcubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXROb3RlU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vdGVTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBpeGVsc1BlclNlY29uZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpeGVsc1BlclNlY29uZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWNlcHRvclNpemVzKCk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWNlcHRvclNpemVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlY2VwdG9yWVBlcmNlbnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWNlcHRvcllQZXJjZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNjcm9sbERpcmVjdGlvbigpOiBTY3JvbGxEaXJlY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjcm9sbERpcmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSZWNlcHRvclNpemUodHJhY2tOdW1iZXI6IG51bWJlciwgcmVjZXB0b3JTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXNbdHJhY2tOdW1iZXJdID0gcmVjZXB0b3JTaXplO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtEaXNwbGF5Q29uZmlnLCBEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7U2Nyb2xsTWFuYWdlcn0gZnJvbSBcIi4vc2Nyb2xsX21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQcmV2aWV3RGlzcGxheSB7XHJcbiAgICBwcml2YXRlIHNjZW5lOiBQNVNjZW5lO1xyXG4gICAgY29uZmlnOiBDb25maWc7XHJcbiAgICBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHNjcm9sbE1hbmFnZXI6IFNjcm9sbE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgdG9wTGVmdFggPSA2NTtcclxuICAgIHByaXZhdGUgdG9wTGVmdFkgPSA1NTtcclxuICAgIHByaXZhdGUgd2lkdGggPSAyMDA7XHJcbiAgICBwcml2YXRlIGhlaWdodCA9IDQwMDtcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3M6IE5vdGVbXVtdLCBjb25maWc6IENvbmZpZywgc2NlbmU6IFA1U2NlbmUpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5ldyBOb3RlTWFuYWdlcih0cmFja3MpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsTWFuYWdlciA9IG5ldyBTY3JvbGxNYW5hZ2VyKHRoaXMuY29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLCB0aGlzLmdldEJvdW5kcygpKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSB0aGlzLmdldERpc3BsYXlDb25maWcodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IG5ldyBEaXNwbGF5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmRpc3BsYXlDb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsXHJcbiAgICAgICAgICAgIHRoaXMudG9wTGVmdFgsIHRoaXMudG9wTGVmdFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIuZHJhdyh0aGlzLnNjcm9sbE1hbmFnZXIuZ2V0R2FtZVRpbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCb3VuZHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHt0b3BMZWZ0WDogdGhpcy50b3BMZWZ0WCwgdG9wTGVmdFk6IHRoaXMudG9wTGVmdFksIHdpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0fTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlDb25maWcoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyKTogRGlzcGxheUNvbmZpZyB7XHJcbiAgICAgICAgbGV0IHJlY2VwdG9yU2l6ZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICByZWNlcHRvclNpemVzLnB1c2goY29uZmlnLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldE5vdGVTaXplOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaXhlbHNQZXJTZWNvbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcucGl4ZWxzUGVyU2Vjb25kO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZWNlcHRvcllQZXJjZW50OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFNjcm9sbERpcmVjdGlvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5zY3JvbGxEaXJlY3Rpb247XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFJlY2VwdG9yU2l6ZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWNlcHRvclNpemVzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRSZWNlcHRvclNpemU6ICh0cmFja051bWJlcjogbnVtYmVyLCByZWNlcHRvclNpemU6IG51bWJlcikgPT4ge31cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtEaXNwbGF5Q29uZmlnfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWNlcHRvclNocmlua1JlYWN0aW9uIHtcclxuICAgIHByaXZhdGUgdHJhY2tIb2xkU3RhdGVzOiBib29sZWFuW107XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSBkaXNwbGF5Q29uZmlnO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlcy5wdXNoKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXNbdHJhY2tOdW1iZXJdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZVRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlc1t0cmFja051bWJlcl0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgbnVtUmVjZXB0b3JzID0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yU2l6ZXMoKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHNocmluayA9IDAuNztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJlY2VwdG9yczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXplUmF0aW8gPSB0aGlzLmlzVHJhY2tIZWxkKGkpID8gc2hyaW5rIDogMS4wO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcuc2V0UmVjZXB0b3JTaXplKGksIHRoaXMuY29uZmlnLm5vdGVTaXplICogc2l6ZVJhdGlvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1RyYWNrSGVsZCh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tIb2xkU3RhdGVzW3RyYWNrTnVtYmVyXTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2RyYXdBY2N1cmFjeUJhcnN9IGZyb20gXCIuL2RyYXdpbmdfdXRpbFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5LCBBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzdWx0c0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBwOiBwNTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlciwgcDogcDUsXHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIgPSBhY2N1cmFjeU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5wID0gcDtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICB0aGlzLmRyYXdBY2N1cmFjeVJlc3VsdHModGhpcy5wLCB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmFjY3VyYWN5TWFuYWdlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWNjdXJhY3lSZXN1bHRzKHA6IHA1LCBhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSBwLndpZHRoIC8gMjtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHAuaGVpZ2h0IC8gMjtcclxuICAgICAgICBsZXQgYmFyV2lkdGggPSBwLndpZHRoICogMC42O1xyXG4gICAgICAgIGxldCBiYXJIZWlnaHQgPSBiYXJXaWR0aCAvIDEwO1xyXG4gICAgICAgIGxldCBsZWZ0TGFiZWxIZWlnaHQgPSAwLjggKiBiYXJIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5TGlzdEZvclJlc3VsdHMgPSB0aGlzLmdldFJlc3VsdHNBY2N1cmFjeUxpc3QoYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgZHJhd0FjY3VyYWN5QmFycyhwLCBhY2N1cmFjeUxpc3RGb3JSZXN1bHRzLCBhY2N1cmFjeVJlY29yZGluZywgY2VudGVyWCwgY2VudGVyWSwgbGVmdExhYmVsSGVpZ2h0LCBiYXJXaWR0aCxcclxuICAgICAgICAgICAgYmFySGVpZ2h0LCBub3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXIuaXNDb25maWd1cmVkRm9yQm9vcygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4gYSBsaXN0IG9mIHVuaXF1ZSBhY2N1cmFjaWVzIHNvcnRlZCBieSB0aGUgb2Zmc2V0LCB3aXRoIHRoZSBiZXN0IGFjY3VyYWN5IGJlaW5nIGZpcnN0XHJcbiAgICBwcml2YXRlIGdldFJlc3VsdHNBY2N1cmFjeUxpc3QoYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID0gYWNjdXJhY3lTZXR0aW5ncy5tYXAoYWNjdXJhY3kgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBhY2N1cmFjeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgc29ydFZhbHVlOiB0aGlzLmdldEFjY3VyYWN5U29ydGluZ1ZhbHVlKGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG1lcmdlZEFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH1bXSA9XHJcbiAgICAgICAgICAgIHRoaXMubWVyZ2VBY2N1cmFjaWVzV2l0aFNhbWVOYW1lKGFjY3VyYWN5VGFibGUpO1xyXG4gICAgICAgIG1lcmdlZEFjY3VyYWN5VGFibGUuc29ydCh0aGlzLmFjY3VyYWN5VGFibGVTb3J0RnVuY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBtZXJnZWRBY2N1cmFjeVRhYmxlLm1hcChyb3cgPT4gcm93LmFjY3VyYWN5TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBY2N1cmFjeVNvcnRpbmdWYWx1ZShsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChsb3dlckJvdW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHVwcGVyQm91bmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXBwZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhsb3dlckJvdW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKCh1cHBlckJvdW5kICsgbG93ZXJCb3VuZCkgLyAyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lcmdlQWNjdXJhY2llc1dpdGhTYW1lTmFtZShhY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nOyBzb3J0VmFsdWU6IG51bWJlciB9W10pIHtcclxuICAgICAgICBsZXQgbWVyZ2VkQWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgd2hpbGUgKGFjY3VyYWN5VGFibGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQga2V5QWNjdXJhY3lOYW1lID0gYWNjdXJhY3lUYWJsZVswXS5hY2N1cmFjeU5hbWU7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVkQWNjdXJhY2llcyA9IGFjY3VyYWN5VGFibGUuZmlsdGVyKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lID09PSBrZXlBY2N1cmFjeU5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgc29ydFZhbHVlQXZlcmFnZSA9IG1hdGNoZWRBY2N1cmFjaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoc3VtLCByb3cpID0+IHN1bSArIHJvdy5zb3J0VmFsdWUsIDApXHJcbiAgICAgICAgICAgICAgICAvIG1hdGNoZWRBY2N1cmFjaWVzLmxlbmd0aDtcclxuICAgICAgICAgICAgbWVyZ2VkQWNjdXJhY3lUYWJsZS5wdXNoKHthY2N1cmFjeU5hbWU6IGtleUFjY3VyYWN5TmFtZSwgc29ydFZhbHVlOiBzb3J0VmFsdWVBdmVyYWdlfSk7XHJcbiAgICAgICAgICAgIGFjY3VyYWN5VGFibGUgPSBhY2N1cmFjeVRhYmxlLmZpbHRlcihyb3cgPT4gcm93LmFjY3VyYWN5TmFtZSAhPT0ga2V5QWNjdXJhY3lOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZEFjY3VyYWN5VGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVRhYmxlU29ydEZ1bmN0aW9uKGE6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfSkge1xyXG4gICAgICAgIHJldHVybiBhLnNvcnRWYWx1ZSAtIGIuc29ydFZhbHVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGVudW0gU2Nyb2xsRGlyZWN0aW9uIHtcclxuICAgIFVwLFxyXG4gICAgRG93bixcclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1RpbWVNYW5hZ2VyfSBmcm9tIFwiLi90aW1lX21hbmFnZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcm9sbE1hbmFnZXIgaW1wbGVtZW50cyBHYW1lVGltZVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGltZU1hbmFnZXI6IFRpbWVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxCb3VuZHM6IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgcDogcDUsIHNjcm9sbEJvdW5kcz86IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBUaW1lTWFuYWdlcigwLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxCb3VuZHMgPSBzY3JvbGxCb3VuZHM7XHJcbiAgICAgICAgcC5tb3VzZVdoZWVsID0gZnVuY3Rpb24gKGU6IFdoZWVsRXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGFsbG93U2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxCb3VuZHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2VJc0luQm91bmRzKHAsIHRoaXMuc2Nyb2xsQm91bmRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93U2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsbG93U2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxsb3dTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lQ2hhbmdlTWlsbGlzID0gZS5kZWx0YVkgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyAtPSB0aW1lQ2hhbmdlTWlsbGlzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbVRpbWVNaWxsaXMgKz0gdGltZUNoYW5nZU1pbGxpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEVxdWl2YWxlbnQgdG8gZXZlbnQucHJldmVudERlZmF1bHRcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBbGxvdyBhbiBpZ25vcmVkIGFyZ3VtZW50IHNvIGl0IGNhbiBiZSB1c2VkIGluIHBsYWNlIG9mIGEgVGltZU1hbmFnZXIgZm9yIGRlYnVnIG1vZGVcclxuICAgIGdldEdhbWVUaW1lKGlnbm9yZWRBcmd1bWVudD86IGFueSkge1xyXG4gICAgICAgIGxldCB0aW1lID0gdGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZSh0aGlzLnN5c3RlbVRpbWVNaWxsaXMpO1xyXG4gICAgICAgIHJldHVybiB0aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW91c2VJc0luQm91bmRzKHA6IHA1LCBib3VuZHM6IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSkge1xyXG4gICAgICAgIGlmIChwLm1vdXNlWCA+PSBib3VuZHMudG9wTGVmdFggJiYgcC5tb3VzZVggPD0gYm91bmRzLnRvcExlZnRYICsgYm91bmRzLndpZHRoICYmXHJcbiAgICAgICAgICAgIHAubW91c2VZID49IGJvdW5kcy50b3BMZWZ0WSAmJiBwLm1vdXNlWSA8PSBib3VuZHMudG9wTGVmdFkgKyBib3VuZHMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7RnVsbFBhcnNlLCBnZXRGdWxsUGFyc2UsIGdldFBhcnRpYWxQYXJzZSwgTm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZSwgUGFydGlhbFBhcnNlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcblxyXG5leHBvcnQgZW51bSBTdGVwZmlsZVN0YXRlIHtcclxuICAgIE5PX1NJTUZJTEUsXHJcbiAgICBET05FX1JFQURJTkcsXHJcbiAgICBQQVJUSUFMTFlfUEFSU0VELFxyXG4gICAgRlVMTFlfUEFSU0VELFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGVwZmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IFN0ZXBmaWxlU3RhdGU7XHJcbiAgICBwdWJsaWMgZmlsZTogRmlsZTtcclxuICAgIHB1YmxpYyBwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZTtcclxuICAgIHB1YmxpYyBmdWxsUGFyc2U6IEZ1bGxQYXJzZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuTk9fU0lNRklMRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEZpbGUoZmlsZTogcDUuRmlsZSkge1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGUuZmlsZTsgLy8gdGhpcyB1bndyYXBzIHRoZSBwNS5GaWxlIHdyYXBwZXIgdG8gZ2V0IHRoZSBvcmlnaW5hbCBET00gZmlsZVxyXG4gICAgICAgIHRoaXMubG9hZFRleHRGaWxlKHRoaXMuZmlsZSwgKChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5ET05FX1JFQURJTkc7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGlhbFBhcnNlID0gZ2V0UGFydGlhbFBhcnNlKDxzdHJpbmc+ZXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpYWxQYXJzZS5tb2Rlcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRGZnJCZWF0bWFwKGJlYXRtYXA6IFtudW1iZXIsIHN0cmluZywgc3RyaW5nXVtdKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrczogTm90ZVtdW10gPSB0aGlzLmJlYXRtYXBUb1RyYWNrQXJyYXkoYmVhdG1hcCk7XHJcblxyXG4gICAgICAgIGxldCBwYXJ0aWFsUGFyc2UgPSBuZXcgUGFydGlhbFBhcnNlKCk7XHJcbiAgICAgICAgcGFydGlhbFBhcnNlLm1vZGVzID0gW25ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCldO1xyXG4gICAgICAgIHBhcnRpYWxQYXJzZS5tZXRhRGF0YSA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWFsUGFyc2UgPSBwYXJ0aWFsUGFyc2U7XHJcblxyXG4gICAgICAgIGxldCBmdWxsUGFyc2UgPSBuZXcgRnVsbFBhcnNlKHBhcnRpYWxQYXJzZSk7XHJcbiAgICAgICAgZnVsbFBhcnNlLnRyYWNrcyA9IHRyYWNrcztcclxuICAgICAgICB0aGlzLmZ1bGxQYXJzZSA9IGZ1bGxQYXJzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5pc2hQYXJzaW5nKG1vZGVJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRCB8fCB0aGlzLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRCkge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxQYXJzZSA9IGdldEZ1bGxQYXJzZShtb2RlSW5kZXgsIHRoaXMucGFydGlhbFBhcnNlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRUZXh0RmlsZShcclxuICAgICAgICBmaWxlOiBGaWxlLFxyXG4gICAgICAgIGxpc3RlbmVyOiAoZXZlbnQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IGFueSxcclxuICAgICAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmVhdG1hcFRvVHJhY2tBcnJheShiZWF0bWFwOiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ11bXSkge1xyXG4gICAgICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgdHJhY2tzLnB1c2goW10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZWF0bWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBiZWF0bWFwUm93ID0gYmVhdG1hcFtpXTtcclxuICAgICAgICAgICAgbGV0IHRyYWNrTnVtYmVyID0gdGhpcy50cmFja051bWJlckZyb21EaXJlY3Rpb24oYmVhdG1hcFJvd1sxXSk7XHJcbiAgICAgICAgICAgIGxldCBub3RlID0gdGhpcy5ub3RlRnJvbUJlYXRtYXBSb3coYmVhdG1hcFJvdyk7XHJcbiAgICAgICAgICAgIHRyYWNrc1t0cmFja051bWJlcl0ucHVzaChub3RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBub3RlRnJvbUJlYXRtYXBSb3cocm93OiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ10pOiBOb3RlIHtcclxuICAgICAgICBsZXQgdGltZUluU2Vjb25kcyA9IHJvd1swXSAvIDMwO1xyXG4gICAgICAgIHJldHVybiB7dGltZUluU2Vjb25kczogdGltZUluU2Vjb25kcywgdHlwZTogTm90ZVR5cGUuTk9STUFMLCBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFQsIHR5cGVTdHJpbmc6IFwiTi9BXCJ9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhY2tOdW1iZXJGcm9tRGlyZWN0aW9uKGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiTFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJVXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiUlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IFwiVW5rbm93biB0cmFjayBkaXJlY3Rpb24gJ1wiICsgZGlyZWN0aW9uICsgXCInXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtHYW1lVGltZVByb3ZpZGVyfSBmcm9tIFwiLi9nYW1lX3RpbWVfcHJvdmlkZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVNYW5hZ2VyIGltcGxlbWVudHMgR2FtZVRpbWVQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZCA9IHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGFwc2VkVGltZShzeXN0ZW1UaW1lTWlsbGlzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChzeXN0ZW1UaW1lTWlsbGlzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJFcnJvcjogY2FuJ3QgZ2V0IGVsYXBzZWQgdGltZS4gRXhwZWN0ZWQgMSBhcmd1bWVudDogc3lzdGVtVGltZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoc3lzdGVtVGltZU1pbGxpcyAtIHRoaXMuc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZCkgLyAxMDAwOyAvLyBpbiBzZWNvbmRzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2Ugd2FudCB0byBrZWVwIHRoaXMgY2FsY3VsYXRpb24gaW4gb25seSBvbmUgcGxhY2VcclxuICAgIGdldEdhbWVUaW1lKHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsYXBzZWRUaW1lKHN5c3RlbVRpbWVNaWxsaXMpICsgdGhpcy5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyAtIHRoaXMuY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGVudW1Ub1N0cmluZ0FycmF5LFxyXG4gICAgZmluZEJpbmRpbmdJbmZvRm9yVHJhY2ssXHJcbiAgICBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUsXHJcbiAgICBnZXRLZXlCaW5kaW5nQnV0dG9uSWQsXHJcbiAgICBnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQsXHJcbiAgICBnZXRLZXlTdHJpbmcsXHJcbiAgICBzZXRDb25maWdLZXlCaW5kaW5nXHJcbn0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0hlYWRpbmcoKSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBoZWFkaW5nQ2xhc3MgPSBcIm5hdmlnYXRpb24taGVhZGluZ1wiO1xyXG5cclxuICAgIGxldCBwbGF5RnJvbUZpbGVCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheSBGcm9tIEZpbGVcIik7XHJcbiAgICB9LCBcInBsYXlGcm9tRmlsZUJ1dHRvblwiKTtcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LCAwLjI1LCAwLjAzNiwgMTMwLCAzNCk7XHJcbiAgICBwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVlfRlJPTV9GSUxFKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCFwbGF5RnJvbUZpbGVCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGxheUZyb21PbmxpbmVCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheSBGcm9tIE9ubGluZVwiKTtcclxuICAgIH0sIFwicGxheUZyb21PbmxpbmVCdXR0b25cIik7XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuMDM2LCA5MCwgMzQpO1xyXG4gICAgcGxheUZyb21PbmxpbmVCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVlfRlJPTV9PTkxJTkUpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXBsYXlGcm9tT25saW5lQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgcGxheUZyb21PbmxpbmVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBsZXQgb3B0aW9uc0J1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJPcHRpb25zXCIpO1xyXG4gICAgfSwgXCJvcHRpb25zQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUob3B0aW9uc0J1dHRvbi5lbGVtZW50LCAwLjgsIDAuMDM2LCA5MCwgMzQpO1xyXG4gICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuT1BUSU9OUyk7XHJcbiAgICB9KTtcclxuICAgIGlmICghb3B0aW9uc0J1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgcmVsYXRpdmVYIGFuZCByZWxhdGl2ZSBZIHRvIGJlIGJldHdlZW4gMCBhbmQgMVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoZWxlbWVudDogcDUuRWxlbWVudCwgcmVsYXRpdmVYOiBudW1iZXIsIHJlbGF0aXZlWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIGxldCBwID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICBsZXQgY2FudmFzUG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSA9IHAuX3JlbmRlcmVyLnBvc2l0aW9uKCk7XHJcbiAgICBlbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAocmVsYXRpdmVYICogcC53aWR0aCkgLSAod2lkdGggLyAyKSxcclxuICAgICAgICBjYW52YXNQb3NpdGlvbi55ICsgKHJlbGF0aXZlWSAqIHAuaGVpZ2h0KSAtIChoZWlnaHQgLyAyKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkSW5wdXQobGFiZWxTdHJpbmc6IHN0cmluZywgaW5wdXRJZDogc3RyaW5nLCBpbnB1dEluaXRpYWxWYWx1ZTogc3RyaW5nLCBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgbGFiZWxlZElucHV0Q2xhc3MgPSBcImxhYmVsZWQtaW5wdXRcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBpbnB1dElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZElucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dCA9IHAuY3JlYXRlSW5wdXQoaW5wdXRJbml0aWFsVmFsdWUpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhsYWJlbGVkSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBpbnB1dC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBpbnB1dC5pZChpbnB1dElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGlucHV0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBsZXQgaW5wdXQgPSBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoY29udGFpbmVyLmVsZW1lbnQsIFwiSU5QVVRcIik7XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiBpbnB1dCwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMYWJlbChwOiBwNSwgbGFiZWxTdHJpbmc6IHN0cmluZywgZm9ySWQ/OiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBsYWJlbCA9IHAuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIGxhYmVsU3RyaW5nKTtcclxuICAgIGlmIChmb3JJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGFiZWwuYXR0cmlidXRlKFwiZm9yXCIsIGZvcklkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2hlY2tib3gocDogcDUsIGluaXRpYWxTdGF0ZTogYm9vbGVhbik6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGNoZWNrYm94ID0gcC5jcmVhdGVFbGVtZW50KFwiY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5lbHQuY2hlY2tlZCA9IGluaXRpYWxTdGF0ZTtcclxuICAgIHJldHVybiBjaGVja2JveDtcclxufVxyXG5cclxuLy8gVE9ETzogY2hlY2sgdGhhdCBvcHRpb25zRW51bSBpcyBhY3R1YWxseSBhbiBFbnVtLCBhbmQgaW5pdGlhbEVudW1WYWx1ZSBpcyBhIHZhbHVlIGZvciB0aGF0IGVudW1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRTZWxlY3QobGFiZWxTdHJpbmc6IHN0cmluZywgc2VsZWN0SWQ6IHN0cmluZywgb3B0aW9uc0VudW06IGFueSwgaW5pdGlhbEVudW1WYWx1ZTogYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IHNlbGVjdDogcDUuRWxlbWVudDtcclxuICAgIGxldCBsYWJlbGVkU2VsZWN0Q2xhc3MgPSBcImxhYmVsZWQtc2VsZWN0XCI7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBzZWxlY3RJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgc2VsZWN0ID0gcC5jcmVhdGVTZWxlY3QoKTtcclxuICAgICAgICBzZWxlY3QuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhsYWJlbGVkU2VsZWN0Q2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBzZWxlY3QuaWQoc2VsZWN0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgc2VsZWN0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lci5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgbGV0IGluaXRpYWxPcHRpb25zID0gZW51bVRvU3RyaW5nQXJyYXkob3B0aW9uc0VudW0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBzZWxlY3Qub3B0aW9uKGluaXRpYWxPcHRpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHNlbGVjdC5zZWxlY3RlZChvcHRpb25zRW51bVtpbml0aWFsRW51bVZhbHVlIGFzIGtleW9mIHR5cGVvZiBvcHRpb25zRW51bV0udG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zOiBIVE1MQ29sbGVjdGlvbiA9IHNlbGVjdC5lbHQuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuaXRlbShpKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3MgKyBcIiBcIiArIGxhYmVsZWRTZWxlY3RDbGFzcyArIFwiIFwiICsgZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiBzZWxlY3QsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUtleUJpbmRpbmdJbnB1dCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBzZXRCdXR0b25JZCA9IGdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgIGxldCBrZXliaW5kaW5nSW5wdXRDbGFzcyA9IFwia2V5YmluZGluZy1pbnB1dFwiO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIFwiXCIpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgbGV0IHNldEJ1dHRvbiA9IHAuY3JlYXRlQnV0dG9uKFwiU2V0XCIpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBzZXRCdXR0b24uaWQoc2V0QnV0dG9uSWQpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKC0xLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhpcyBjb2RlIGJlY2F1c2UgaXQncyB1c2VkIHRvIGluZGljYXRlIGlucHV0IHRoYXQncyBub3QgeWV0IGZpbmlzaGVkIHByb2Nlc3NpbmdcclxuICAgICAgICAgICAgICAgIGlmIChwLmtleUNvZGUgIT09IDIyOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldENvbmZpZ0tleUJpbmRpbmcodHJhY2tOdW1iZXIsIG51bVRyYWNrcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYWNrTnVtYmVyOiB0cmFja051bWJlciwga2V5Q29kZTogcC5rZXlDb2RlLCBzdHJpbmc6IGdldEtleVN0cmluZyhwKX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoLTEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgc2V0QnV0dG9uLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykpO1xyXG5cclxuICAgIGxldCB0cmFja0JpbmRpbmdJbmZvID0gZmluZEJpbmRpbmdJbmZvRm9yVHJhY2sodHJhY2tOdW1iZXIsIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcykpO1xyXG4gICAgbGV0IGtleVN0cmluZyA9IHRyYWNrQmluZGluZ0luZm8uc3RyaW5nO1xyXG4gICAgbGV0IGxhYmVsU3RyaW5nID0gJ1RyYWNrICcgKyAodHJhY2tOdW1iZXIgKyAxKSArICc6IDxzcGFuIGNsYXNzPVwiJyArXHJcbiAgICAgICAga2V5YmluZGluZ0lucHV0Q2xhc3MgKyBcIiBcIiArIGN1c3RvbUNsYXNzICsgXCIgXCIgKyBnbG9iYWwuZ2xvYmFsQ2xhc3MgK1xyXG4gICAgICAgICdcIj4nICsga2V5U3RyaW5nICsgJzwvc3Bhbj4nO1xyXG4gICAgbGV0IGxhYmVsRWxlbWVudCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJMQUJFTFwiKTtcclxuICAgIGxhYmVsRWxlbWVudC5odG1sKGxhYmVsU3RyaW5nKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZFRleHRBcmVhKGxhYmVsU3RyaW5nOiBzdHJpbmcsIGlucHV0SWQ6IHN0cmluZywgaW5wdXRJbml0aWFsVmFsdWU6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBudW1iZXIgPSA0LCBjb2xzOiBudW1iZXIgPSA0MCk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCB0ZXh0QXJlYTogcDUuRWxlbWVudDtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxhYmVsZWRUZXh0YXJlYUNsYXNzID0gXCJsYWJlbGVkLXRleHRhcmVhXCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgaW5wdXRJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICB0ZXh0QXJlYSA9IHAuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIGlucHV0SW5pdGlhbFZhbHVlKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgdGV4dEFyZWEuaWQoaW5wdXRJZCk7XHJcbiAgICAgICAgdGV4dEFyZWEuYXR0cmlidXRlKFwicm93c1wiLCByb3dzLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHRleHRBcmVhLmF0dHJpYnV0ZShcImNvbHNcIiwgY29scy50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGlucHV0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IHRleHRBcmVhLCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWxlSW5wdXQobGFiZWxTdHJpbmc6IHN0cmluZywgYnV0dG9uVGV4dDogc3RyaW5nLCB1bmlxdWVJZDogc3RyaW5nLCBvbkZpbGVMb2FkOiAoZmlsZTogcDUuRmlsZSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGJ1dHRvbklkID0gdW5pcXVlSWQgKyBcIkJ1dHRvblwiO1xyXG4gICAgbGV0IGNvbnRhaW5lcklkID0gdW5pcXVlSWQgKyBcIkNvbnRhaW5lclwiO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgZmlsZUlucHV0Q2xhc3MgPSBcImZpbGUtaW5wdXRcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBmaWxlSW5wdXQgPSBwLmNyZWF0ZUZpbGVJbnB1dChvbkZpbGVMb2FkLCBcImZhbHNlXCIpO1xyXG4gICAgICAgIGZpbGVJbnB1dC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBmaWxlSW5wdXQuaGlkZSgpO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uID0gcC5jcmVhdGVCdXR0b24oYnV0dG9uVGV4dCk7XHJcbiAgICAgICAgYnV0dG9uLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGJ1dHRvbi5pZChidXR0b25JZCk7XHJcbiAgICAgICAgYnV0dG9uLm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbGVJbnB1dC5lbHQuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBidXR0b25JZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpXHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBjb250YWluZXJJZCk7XHJcblxyXG4gICAgbGV0IGxhYmVsOiBwNS5FbGVtZW50ID0gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGNvbnRhaW5lci5lbGVtZW50LCBcIkxBQkVMXCIpO1xyXG4gICAgbGFiZWwuaHRtbChsYWJlbFN0cmluZyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRDaGVja2JveChsYWJlbFN0cmluZzogc3RyaW5nLCBjaGVja2JveElkOiBzdHJpbmcsIGlzQ2hlY2tlZDogYm9vbGVhbiwgY3VzdG9tQ2xhc3M6IHN0cmluZyk6XHJcbiAgICB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgY2hlY2tib3g6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkQ2hlY2tib3hDbGFzcyA9IFwibGFiZWxlZC1jaGVja2JveFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRDaGVja2JveENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGNoZWNrYm94SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgY2hlY2tib3ggPSBjcmVhdGVDaGVja2JveChwLCBpc0NoZWNrZWQpO1xyXG4gICAgICAgIGNoZWNrYm94LmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjaGVja2JveC5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3guYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBjaGVja2JveC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBjaGVja2JveC5pZChjaGVja2JveElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGNoZWNrYm94SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IGNoZWNrYm94LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFllc05vIHtcclxuICAgIFllcyxcclxuICAgIE5vXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib29sZWFuVG9ZZXNObyhib29sZWFuOiBib29sZWFuKTogWWVzTm8ge1xyXG4gICAgaWYgKGJvb2xlYW4pIHtcclxuICAgICAgICByZXR1cm4gWWVzTm8uWWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gWWVzTm8uTm87XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZGlzY291cnNlLnByb2Nlc3Npbmcub3JnL3QvaG93LXRvLW9yZ2FuaXplLXJhZGlvLWJ1dHRvbnMtaW4tc2VwYXJhdGUtbGluZXMvMTAwNDEvNVxyXG5leHBvcnQgZnVuY3Rpb24gZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2KHA6IHA1LCByYWRpb0RpdlA1RWxlbWVudDogcDUuRWxlbWVudCkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgaW5wdXRzID0gcC5zZWxlY3RBbGwoJ2lucHV0JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgbGFiZWxzID0gcC5zZWxlY3RBbGwoJ2xhYmVsJywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgY29uc3QgbGVuID0gaW5wdXRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgcC5jcmVhdGVEaXYoKS5wYXJlbnQocmFkaW9EaXZQNUVsZW1lbnQpLmNoaWxkKGlucHV0c1tpXSkuY2hpbGQobGFiZWxzW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gaHR0cHM6Ly9kaXNjb3Vyc2UucHJvY2Vzc2luZy5vcmcvdC9ob3ctdG8tb3JnYW5pemUtcmFkaW8tYnV0dG9ucy1pbi1zZXBhcmF0ZS1saW5lcy8xMDA0MS81XHJcbmV4cG9ydCBmdW5jdGlvbiBmaXhSYWRpb0RpdkVsZW1lbnQocmFkaW9EaXZQNUVsZW1lbnQ6IHA1LkVsZW1lbnQpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJhZGlvRGl2UDVFbGVtZW50Ll9nZXRJbnB1dENoaWxkcmVuQXJyYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWx0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVSYWRpb09wdGlvbnMocDogcDUsIHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50LCBzdHlsZUNsYXNzZXM6IHN0cmluZ1tdKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBsZXQgZGl2czogcDUuRWxlbWVudFtdID0gcC5zZWxlY3RBbGwoJ2RpdicsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkaXZzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGl2c1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGxldCBpbnB1dHM6IHA1LkVsZW1lbnRbXSA9IHAuc2VsZWN0QWxsKCdpbnB1dCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbnB1dHNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBsZXQgbGFiZWxzOiBwNS5FbGVtZW50W10gID0gcC5zZWxlY3RBbGwoJ2xhYmVsJywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxhYmVsc1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7TW9kZSwgTm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmd9IGZyb20gXCIuL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1N0ZXBmaWxlLCBTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZSwgQXVkaW9GaWxlU3RhdGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQbGF5aW5nRGlzcGxheX0gZnJvbSBcIi4vcGxheWluZ19kaXNwbGF5XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdElmVW5kZWZpbmVkKHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnN0YXRlID0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0cmFja3NbaV1bal0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5NSU5FOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrc1tpXVtqXS50eXBlID0gTm90ZVR5cGUuTk9ORTsgLy9UT0RPOiBpbXBsZW1lbnQgbWluZXNcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT05FOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5ST0xMX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnR5cGUgPSBOb3RlVHlwZS5IT0xEX0hFQUQ7IC8vVE9ETzogaW1wbGVtZW50IHJvbGxzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pc3NCb3VuZGFyeShjdXJyZW50VGltZTogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgbGV0IG1pc3NCb3VuZGFyeSA9IGN1cnJlbnRUaW1lICsgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLnVwcGVyQm91bmQgLyAxMDAwKTsgLy9yZXN1bHQgaXMgaW4gc2Vjb25kc1xyXG4gICAgcmV0dXJuIG1pc3NCb3VuZGFyeTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5QmluZGluZ3NEZWZpbmVkKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUtleUJpbmRpbmdzKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICBsZXQgbWFwcGluZzogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgIGlmIChudW1UcmFja3MgPD0gOSkge1xyXG4gICAgICAgIGxldCBrZXlTZXF1ZW5jZSA9IFtcIkFcIiwgXCJTXCIsIFwiRFwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiLCBcIkpcIiwgXCJLXCIsIFwiTFwiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlTdHJpbmcgPSBrZXlTZXF1ZW5jZVtpXTtcclxuICAgICAgICAgICAgbWFwcGluZy5wdXNoKHt0cmFja051bWJlcjogaSwga2V5Q29kZToga2V5U3RyaW5nLmNoYXJDb2RlQXQoMCksIHN0cmluZzoga2V5U3RyaW5nfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobnVtVHJhY2tzID4gMjYpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkbid0IGdlbmVyYXRlIGRlZmF1bHQga2V5IGJpbmRpbmdzIGZvciBtb3JlIHRoYW4gMjYgdHJhY2tzLiBSYW4gb3V0IG9mIGxldHRlcnMhXCIpO1xyXG4gICAgICAgICAgICBudW1UcmFja3MgPSAyNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hhcmFjdGVyQ29kZSA9IFwiQVwiLmNoYXJDb2RlQXQoMCkgKyBpOyAvLyBUaGlzIGlzIGFuIEFTQ0lJIGNoYXJhY3RlciBjb2RlXHJcbiAgICAgICAgICAgIG1hcHBpbmcucHVzaCh7dHJhY2tOdW1iZXI6IGksIGtleUNvZGU6IGNoYXJhY3RlckNvZGUsIHN0cmluZzogU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyYWN0ZXJDb2RlKX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLnNldChudW1UcmFja3MsIG1hcHBpbmcpO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRDb25maWdLZXlCaW5kaW5nKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nKSB7XHJcbiAgICBsZXQgYmluZGluZ0luZGV4ID0gZ2V0SW5kZXhPZlRyYWNrTnVtYmVyQmluZGluZyh0cmFja051bWJlciwgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSk7XHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpW2JpbmRpbmdJbmRleF0gPSBrZXlCaW5kaW5nO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgZSB0byBiZSBhbiBlbnVtXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnVtVG9TdHJpbmdBcnJheShlOiBhbnkpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhlKS5maWx0ZXIoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEluZGV4T2ZUcmFja051bWJlckJpbmRpbmcodHJhY2tOdW1iZXI6IG51bWJlciwgYmluZGluZ3M6IHsgdHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZyB9W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmluZGluZ3NbaV0udHJhY2tOdW1iZXIgPT09IHRyYWNrTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGdldEtleUJpbmRpbmdVbmlxdWVJZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSArIFwiQnV0dG9uXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBnZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykgKyBcIkJ1dHRvblwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBcInRyYWNrXCIgKyB0cmFja051bWJlciArIFwiT2ZcIiArIG51bVRyYWNrcyArIFwiQmluZGluZ1wiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5U3RyaW5nKHA6IHA1KSB7XHJcbiAgICByZXR1cm4gcC5rZXkubGVuZ3RoID09IDEgPyBwLmtleS50b1VwcGVyQ2FzZSgpIDogcC5rZXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkobW9kZXNBc1N0cmluZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz5bXSk6IE1vZGVbXSB7XHJcbiAgICBsZXQgbW9kZU9wdGlvbnM6IE1vZGVbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2Rlc0FzU3RyaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbW9kZXNBc1N0cmluZ3NbaV07XHJcbiAgICAgICAgbW9kZU9wdGlvbnMucHVzaCh7dHlwZTogbW9kZS5nZXQoXCJ0eXBlXCIpLCBkaWZmaWN1bHR5OiBtb2RlLmdldChcImRpZmZpY3VsdHlcIiksIG1ldGVyOiBtb2RlLmdldChcIm1ldGVyXCIpLCBpZDogaX0pO1xyXG4gICAgfVxyXG4gICAgbW9kZU9wdGlvbnMuc29ydChjb21wYXJlTW9kZU9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIG1vZGVPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZU1vZGVPcHRpb25zKGE6IE1vZGUsIGI6IE1vZGUpIHtcclxuICAgIGxldCB0eXBlQSA9IGEudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgbGV0IHR5cGVCID0gYi50eXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAodHlwZUEgIT0gdHlwZUIpIHtcclxuICAgICAgICBpZiAodHlwZUEgPCB0eXBlQikge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUEgPSBhLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUIgPSBiLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAoZGlmZmljdWx0eUEgIT0gZGlmZmljdWx0eUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlBKSAtIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlCKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbWV0ZXJBID0gcGFyc2VGbG9hdChhLm1ldGVyKTtcclxuICAgICAgICAgICAgbGV0IG1ldGVyQiA9IHBhcnNlRmxvYXQoYi5tZXRlcik7XHJcbiAgICAgICAgICAgIGlmIChtZXRlckEgIT0gbWV0ZXJCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0ZXJBIC0gbWV0ZXJCO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGEuaWQgPSBiLmlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5OiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAoZGlmZmljdWx0eSkge1xyXG4gICAgICAgIGNhc2UgXCJCRUdJTk5FUlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBjYXNlIFwiRUFTWVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICBjYXNlIFwiTUVESVVNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIGNhc2UgXCJIQVJEXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIGNhc2UgXCJDSEFMTEVOR0VcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgY2FzZSBcIkVESVRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoZGl2OiBwNS5FbGVtZW50LCB0YWdOYW1lOiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBjaGlsZHJlbk5vZGVzID0gZGl2LmNoaWxkKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbm9kZTogTm9kZSA9IGNoaWxkcmVuTm9kZXNbaV07XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHA1LkVsZW1lbnQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGJpbmRpbmdzOiB7IHRyYWNrTnVtYmVyOiBudW1iZXIsIGtleUNvZGU6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcgfVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJpbmRpbmdzW2ldLnRyYWNrTnVtYmVyID09PSB0cmFja051bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZGluZ3NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUHJldmlld05vdGVzKG51bVRyYWNrczogbnVtYmVyKTogTm90ZVtdW10ge1xyXG4gICAgbGV0IG5vdGVzOiBOb3RlW11bXSA9IFtdO1xyXG4gICAgbGV0IGlzSG9sZCA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMC4xO1xyXG4gICAgbGV0IHRpbWVJbmNyZW1lbnQgPSAwLjMgLyBudW1UcmFja3M7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSBbXTtcclxuICAgICAgICBpZiAoaXNIb2xkKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuSE9MRF9IRUFELCB0eXBlU3RyaW5nOiBcIkRvbid0IENhcmVcIiwgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuVEFJTCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lICsgMC4yNSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vdGVUeXBlLk5PUk1BTCxcclxuICAgICAgICAgICAgICAgIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLFxyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdGVzLnB1c2godHJhY2spO1xyXG4gICAgICAgIGlzSG9sZCA9ICFpc0hvbGQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gdGltZUluY3JlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBub3RlcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjY3VyYWN5RXZlbnROYW1lKHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHM6IG51bWJlciwgY29uZmlnOiBDb25maWcpOiBzdHJpbmcge1xyXG4gICAgaWYgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPCBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLm5hbWU7IC8vIEhhbmRsZSBtaXNzIGlmIGl0IGV4aXN0c1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPj0gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgIHJldHVybiBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS5uYW1lOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tpXTtcclxuICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPSBudWxsICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgJiYgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdXJhY3kubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBcIkVSUk9SOiBVbmtub3duIGFjY3VyYWN5XCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZpbGVzUmVhZHkoc3RlcGZpbGU6IFN0ZXBmaWxlLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgbGV0IHN0ZXBmaWxlUmVhZHkgPSBzdGVwZmlsZS5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEIHx8XHJcbiAgICAgICAgc3RlcGZpbGUuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEO1xyXG4gICAgbGV0IGF1ZGlvRmlsZVJlYWR5ID0gYXVkaW9GaWxlLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIHJldHVybiBzdGVwZmlsZVJlYWR5ICYmIGF1ZGlvRmlsZVJlYWR5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFBsYXlpbmdEaXNwbGF5KHRyYWNrczogTm90ZVtdW10sIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICBnbG9iYWwucGxheWluZ0Rpc3BsYXkgPSBuZXcgUGxheWluZ0Rpc3BsYXkodHJhY2tzLCBhdWRpb0ZpbGUsIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHA1OyIsIm1vZHVsZS5leHBvcnRzID0gcGFrbzsiXSwic291cmNlUm9vdCI6IiJ9