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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaHl0aG1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja19mbGFzaC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja190ZXh0LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9yZWNvcmRpbmcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2F1ZGlvX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvZGVmYXVsdF9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RlZmF1bHRfbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kaXNwbGF5X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RvbV93cmFwcGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kcmF3aW5nX3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2hvbGRfZ2xvdy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaG9sZF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9ob2xkX3BhcnRpY2xlcy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2tleV9iaW5kaW5nX2hlbHBlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMva2V5X2JpbmRpbmdzX3VpLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9rZXlib2FyZF9ldmVudF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9taXNzX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL25vdGVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9vbmxpbmVfcGxheWxpc3QudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3A1X3NjZW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXkudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXlfZnJvbV9maWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5X2Zyb21fb25saW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9yZXN1bHRzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL2J5dGVfcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3NtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3N3Zi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9zd2YtcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3N3Zi10YWdzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFydGljbGVfc3lzdGVtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5ZXJfa2V5X2FjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGxheWluZ19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5bGlzdF9jbGllbnQvcGFyc2luZ19oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9wbGF5bGlzdF9jbGllbnRfc3RhdGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BsYXlsaXN0X2NsaWVudC9zb25nLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5bGlzdF9jbGllbnQvdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcHJldmlld19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9yZWNlcHRvcl9zaHJpbmtfcmVhY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3Jlc3VsdHNfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX2RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3N0ZXBmaWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy90aWNrZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3RpbWVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvdWlfdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lL2V4dGVybmFsIFwicDVcIiIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lL2V4dGVybmFsIFwicGFrb1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiww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IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ0VudHJ5LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja0ZsYXNoIHtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtQ29sb3JlZEFjY3VyYWN5UmFua3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGZsYXNoRHVyYXRpb25JblNlY29uZHM6IG51bWJlciA9IDAuMTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lDb2xvcnM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLCBjb25maWc6IENvbmZpZywgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA9IHRoaXMuZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3ModGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUNvbG9ycyA9IFtcclxuICAgICAgICAgICAgWzE3OCwgOTQsIDI0NywgMTgwXSxcclxuICAgICAgICAgICAgWzMwLCAyMTcsIDEyNCwgMTYwXSxcclxuICAgICAgICAgICAgWzE5NiwgMTk5LCAzMCwgMTQwXSxcclxuICAgICAgICAgICAgWzI0NSwgMjEzLCAyMjEsIDEyMF1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLm51bUNvbG9yZWRBY2N1cmFjeVJhbmtzID4gdGhpcy5hY2N1cmFjeUNvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUNvbG9ycy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgW3RoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIDEwMF1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZsYXNoRm9yVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Rmxhc2hGb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5ID0gdGhpcy5nZXRUcmFja01vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAodGhpcy5pc0ZsYXNoSGFwcGVuaW5nKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSkpIHtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjdXJyZW50VGltZUluU2Vjb25kcywgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICBsZXQgZmxhc2hDb2xvcjogcDUuQ29sb3IgPSB0aGlzLmdldEZsYXNoQ29sb3IobW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpO1xyXG4gICAgICAgICAgICBsZXQgZWxhcHNlZFRpbWVJblNlY29uZHMgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZsYXNoKGVsYXBzZWRUaW1lSW5TZWNvbmRzLCBjZW50ZXJYLCBjZW50ZXJZLCBmbGFzaENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0ZsYXNoSGFwcGVuaW5nKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbMF0ubG93ZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCBhY2N1cmFjaWVzWzBdLnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbYWNjdXJhY2llcy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICAgICAgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA+PSBhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEhhbmRsZSBib28gaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWxhcHNlZFRpbWVJblNlY29uZHMgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICBpZiAoZWxhcHNlZFRpbWVJblNlY29uZHMgPiBBY2N1cmFjeUZlZWRiYWNrRmxhc2guZmxhc2hEdXJhdGlvbkluU2Vjb25kcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWVJblNlY29uZHMgLSBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUcmFja01vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KHRyYWNrTnVtYmVyOiBudW1iZXIpOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl07XHJcbiAgICAgICAgaWYgKHRyYWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXVt0cmFjay5sZW5ndGggLSAxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXRGbGFzaENvbG9yKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuayA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBjb2xvclZhbHVlcyA9IHRoaXMuYWNjdXJhY3lDb2xvcnNbYWNjdXJhY3lSYW5rIC0gMV07XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIHAuY29sb3IoY29sb3JWYWx1ZXNbMF0sIGNvbG9yVmFsdWVzWzFdLCBjb2xvclZhbHVlc1syXSwgY29sb3JWYWx1ZXNbM10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzc3VtZXMgc3ltbWV0cmljYWwgYWNjdXJhY3kgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3MoYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IG51bVJhbmtzID0gMTsgLy8gc3RhcnQgd2l0aCAxIGJlY2F1c2Ugd2UgYXQgbGVhc3QgaGF2ZSB0aGUgYmVzdCByYW5rXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlc3RBY2N1cmFjeUluZGV4ICsgMTsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kICE9PSB1bmRlZmluZWQgJiYgYWNjdXJhY3kudXBwZXJCb3VuZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBudW1SYW5rcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1SYW5rc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCAwICYmIDAgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyBhIHJhbmsgd2hlcmUgMSBpcyB0aGUgYmVzdFxyXG4gICAgcHJpdmF0ZSBnZXRBY2N1cmFjeVJhbmsoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSwgYWNjdXJhY2llczogQWNjdXJhY3lbXSkge1xyXG4gICAgICAgIGlmIChhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgMCkge1xyXG4gICAgICAgICAgICBhY2N1cmFjaWVzID0gdGhpcy5nZXRSZXZlcnNlZChhY2N1cmFjaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJlc3RBY2N1cmFjeUluZGV4ID0gdGhpcy5nZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgY3VycmVudFJhbmsgPSAxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzICYmIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSYW5rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnRSYW5rKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmV2ZXJzZWQoYXJyYXk6IGFueVtdKSB7XHJcbiAgICAgICAgbGV0IGFycmF5Q29weTogYW55W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgYXJyYXlDb3B5LnB1c2goYXJyYXlbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlDb3B5O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0ZsYXNoKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgZmxhc2hTaXplOiBudW1iZXIgPSB0aGlzLmdldEZsYXNoU2l6ZShlbGFwc2VkVGltZUluU2Vjb25kcywgQWNjdXJhY3lGZWVkYmFja0ZsYXNoLmZsYXNoRHVyYXRpb25JblNlY29uZHMpO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIHAuZmlsbChjb2xvcik7XHJcbiAgICAgICAgLy8gcC5maWxsKDI1NSwgMjU1LCAyNTUsIDE1MCk7XHJcbiAgICAgICAgcC5ub1N0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuZHJhd1N0YXIocCwgMCwgMCwgZmxhc2hTaXplLCBmbGFzaFNpemUgKiAwLjQsIDQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGbGFzaFNpemUoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlciwgZmxhc2hEdXJhdGlvbkluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZsYXNoQ29tcGxldGlvblJhdGlvID0gZWxhcHNlZFRpbWVJblNlY29uZHMgLyBmbGFzaER1cmF0aW9uSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBtaW5TaXplID0gMDtcclxuICAgICAgICBsZXQgbWF4U2l6ZSA9IHRoaXMuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmludGVycG9sYXRlKG1pblNpemUsIG1heFNpemUsIGZsYXNoQ29tcGxldGlvblJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVycG9sYXRlKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3U3RhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHJhZGl1czE6IG51bWJlciwgcmFkaXVzMjogbnVtYmVyLCBucG9pbnRzOiBudW1iZXIpIHtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLlJBRElBTlMpO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHAuVFdPX1BJIC8gbnBvaW50cztcclxuICAgICAgICBsZXQgaGFsZkFuZ2xlID0gYW5nbGUgLyAyLjA7XHJcbiAgICAgICAgcC5iZWdpblNoYXBlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCBwLlRXT19QSTsgYSArPSBhbmdsZSkge1xyXG4gICAgICAgICAgICBsZXQgc3ggPSBjZW50ZXJYICsgcC5jb3MoYSkgKiByYWRpdXMyO1xyXG4gICAgICAgICAgICBsZXQgc3kgPSBjZW50ZXJZICsgcC5zaW4oYSkgKiByYWRpdXMyO1xyXG4gICAgICAgICAgICBwLnZlcnRleChzeCwgc3kpO1xyXG4gICAgICAgICAgICBzeCA9IGNlbnRlclggKyBwLmNvcyhhICsgaGFsZkFuZ2xlKSAqIHJhZGl1czE7XHJcbiAgICAgICAgICAgIHN5ID0gY2VudGVyWSArIHAuc2luKGEgKyBoYWxmQW5nbGUpICogcmFkaXVzMTtcclxuICAgICAgICAgICAgcC52ZXJ0ZXgoc3gsIHN5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5lbmRTaGFwZShwLkNMT1NFKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnR9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge1BhcnRpY2xlU3lzdGVtfSBmcm9tIFwiLi9wYXJ0aWNsZV9zeXN0ZW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bUNvbG9yZWRBY2N1cmFjeVJhbmtzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kczogbnVtYmVyID0gMS41O1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZVNldHRpbmdzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZVN5c3RlbXM6IFBhcnRpY2xlU3lzdGVtW107XHJcbiAgICBwcml2YXRlIGdyYXZpdHlEaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLm51bUNvbG9yZWRBY2N1cmFjeVJhbmtzID0gdGhpcy5nZXROdW1Db2xvcmVkQWNjdXJhY3lSYW5rcyh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZVNldHRpbmdzID0gW1xyXG4gICAgICAgICAgICBbMTc4LCA5NCwgMjQ3LCAzMF0sXHJcbiAgICAgICAgICAgIFszMCwgMjE3LCAxMjQsIDI1XSxcclxuICAgICAgICAgICAgWzE5NiwgMTk5LCAzMCwgMjBdLFxyXG4gICAgICAgICAgICBbMjQ1LCAyMTMsIDIyMSwgMTVdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB3aGlsZSAodGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA+IHRoaXMucGFydGljbGVTZXR0aW5ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVNldHRpbmdzLnB1c2goXHJcbiAgICAgICAgICAgICAgICBbdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgdGhpcy5nZXRSYW5kb21JbnQoMjU1KSwgMjBdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmdyYXZpdHlEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93biA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgZ3Jhdml0eTogcDUuVmVjdG9yID0gcC5jcmVhdGVWZWN0b3IoMCwgMjAwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMucHVzaChuZXcgUGFydGljbGVTeXN0ZW0oQWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcy5wYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kcywgZ3Jhdml0eSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJhbmRvbUludChtYXg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbdHJhY2tOdW1iZXJdLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGFydGljbGVzRm9yQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFdmVudEZvclBhcnRpY2xlcyhhY2N1cmFjeUV2ZW50KSkge1xyXG4gICAgICAgICAgICBsZXQgcmVjZXB0b3JUaW1lUG9zaXRpb24gPSBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHMgLSBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIC8gMTAwMDtcclxuICAgICAgICAgICAgbGV0IGluaXRpYWxQb3NpdGlvbiA9IHRoaXMuZ2V0SW5pdGlhbFBvc2l0aW9uKHAsIGFjY3VyYWN5RXZlbnQudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLFxyXG4gICAgICAgICAgICAgICAgcmVjZXB0b3JUaW1lUG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbFZlbG9jaXR5ID0gcC5jcmVhdGVWZWN0b3IoMCwgLTUwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZVNldHRpbmdzOiB7Y29sb3I6IHA1LkNvbG9yLCBudW1QYXJ0aWNsZXM6IG51bWJlciB9ID0gdGhpcy5nZXRQYXJ0aWNsZVNldHRpbmdzKGFjY3VyYWN5RXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1thY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyXS5hZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbiwgaW5pdGlhbFZlbG9jaXR5LFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzLCBwYXJ0aWNsZVNldHRpbmdzLm51bVBhcnRpY2xlcywgcGFydGljbGVTZXR0aW5ncy5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW5pdGlhbFBvc2l0aW9uKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjZW50ZXJUaW1lSW5TZWNvbmRzLCBjZW50ZXJUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVWZWN0b3IoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0V2ZW50Rm9yUGFydGljbGVzKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbMF0ubG93ZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCBhY2N1cmFjaWVzWzBdLnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjY3VyYWNpZXNbYWNjdXJhY2llcy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICAgICAgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA+PSBhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEhhbmRsZSBib28gaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldFBhcnRpY2xlU2V0dGluZ3MoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjaWVzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBsZXQgYWNjdXJhY3lSYW5rID0gdGhpcy5nZXRBY2N1cmFjeVJhbmsoYWNjdXJhY3lFdmVudCwgYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IHBhcnRpY2xlU2V0dGluZ3MgPSB0aGlzLnBhcnRpY2xlU2V0dGluZ3NbYWNjdXJhY3lSYW5rIC0gMV07XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIHtjb2xvcjogcC5jb2xvcihwYXJ0aWNsZVNldHRpbmdzWzBdLCBwYXJ0aWNsZVNldHRpbmdzWzFdLCBwYXJ0aWNsZVNldHRpbmdzWzJdKSxcclxuICAgICAgICAgICAgbnVtUGFydGljbGVzOiBwYXJ0aWNsZVNldHRpbmdzWzNdfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBudW1SYW5rcyA9IDE7IC8vIHN0YXJ0IHdpdGggMSBiZWNhdXNlIHdlIGF0IGxlYXN0IGhhdmUgdGhlIGJlc3QgcmFua1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleCArIDE7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPT0gdW5kZWZpbmVkICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbnVtUmFua3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtUmFua3NcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgMCAmJiAwIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgYSByYW5rIHdoZXJlIDEgaXMgdGhlIGJlc3RcclxuICAgIHByaXZhdGUgZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8IDApIHtcclxuICAgICAgICAgICAgYWNjdXJhY2llcyA9IHRoaXMuZ2V0UmV2ZXJzZWQoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRSYW5rID0gMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXg7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAmJiBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UmFuaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50UmFuaysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJldmVyc2VkKGFycmF5OiBhbnlbXSkge1xyXG4gICAgICAgIGxldCBhcnJheUNvcHk6IGFueVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGFycmF5Q29weS5wdXNoKGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Q29weTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmcsIEFjY3VyYWN5UmVjb3JkaW5nRW50cnl9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeUZlZWRiYWNrVGV4dCB7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZywgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGxhc3RFdmVudDogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSA9IHRoaXMuZ2V0TW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkoKTtcclxuICAgICAgICBpZiAobGFzdEV2ZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbWVTaW5jZUxhc3RFdmVudCA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gbGFzdEV2ZW50LnRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IHRleHRTaXplID0gdGhpcy5nZXRGb250U2l6ZSh0aW1lU2luY2VMYXN0RXZlbnQpO1xyXG4gICAgICAgIGlmICh0ZXh0U2l6ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGdldEFjY3VyYWN5RXZlbnROYW1lKGxhc3RFdmVudC5hY2N1cmFjeU1pbGxpcywgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHRoaXMuZHJhd0V2ZW50VGV4dChldmVudE5hbWUsIHRleHRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KCk6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkge1xyXG4gICAgICAgIGxldCBtb3N0UmVjZW50VHJhY2s6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnlbXSA9IFtdO1xyXG4gICAgICAgIGxldCBncmVhdGVzdFRpbWUgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nLmxlbmd0aDsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgIGlmICh0cmFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEV2ZW50VGltZSA9IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXVt0cmFjay5sZW5ndGggLSAxXS50aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RFdmVudFRpbWUgPiBncmVhdGVzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBsYXN0RXZlbnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmFjayA9IHRyYWNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb3N0UmVjZW50VHJhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9zdFJlY2VudFRyYWNrW21vc3RSZWNlbnRUcmFjay5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEZvbnRTaXplKHRpbWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG1heEZvbnRTaXplID0gMzA7XHJcbiAgICAgICAgaWYgKHRpbWUgPCAwLjEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWUgLyAwLjEgKiBtYXhGb250U2l6ZTtcclxuICAgICAgICB9IGVsc2UgaWYodGltZSA+PSAwLjEgJiYgdGltZSA8IDAuNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRpbWUgPj0gMC40ICYmIHRpbWUgPCAwLjcpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgxIC0gKHRpbWUgLSAwLjQpIC8gKDAuNyAtIDAuNCkpICogbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0V2ZW50VGV4dCh0ZXh0OiBzdHJpbmcsIHRleHRTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUiwgcC5DRU5URVIpO1xyXG4gICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgICAgIHAudGV4dCh0ZXh0LCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0tleVN0YXRlLCBQbGF5ZXJLZXlBY3Rpb259IGZyb20gXCIuL3BsYXllcl9rZXlfYWN0aW9uXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtnZXRBY2N1cmFjeUV2ZW50TmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxvd2VyQm91bmQ6IG51bWJlcjtcclxuICAgIHVwcGVyQm91bmQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxvd2VyQm91bmQgPSBsb3dlckJvdW5kO1xyXG4gICAgICAgIHRoaXMudXBwZXJCb3VuZCA9IHVwcGVyQm91bmQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgY29uZmlnOiBDb25maWcsIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcixcclxuICAgICAgICAgICAgICAgIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuaG9sZE1hbmFnZXIgPSBob2xkTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQgPSBoYW5kbGVBY2N1cmFjeUV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVQbGF5ZXJBY3Rpb24oYWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoYWN0aW9uLmtleVN0YXRlID09IEtleVN0YXRlLkRPV04pIHtcclxuICAgICAgICAgICAgdGhpcy50cnlUb0hpdE5vdGUoYWN0aW9uLmdhbWVUaW1lLCBhY3Rpb24udHJhY2spO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLmtleVN0YXRlID09PSBLZXlTdGF0ZS5VUCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkTWFuYWdlci5pc1RyYWNrSGVsZChhY3Rpb24udHJhY2spKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLnVuaG9sZFRyYWNrKGFjdGlvbi50cmFjaywgYWN0aW9uLmdhbWVUaW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5VG9SZWxlYXNlTm90ZShhY3Rpb24uZ2FtZVRpbWUsIGFjdGlvbi50cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cnlUb0hpdE5vdGUoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXggPSB0aGlzLmdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kcywgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmIChub3RlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbm90ZTogTm90ZSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobm90ZS50eXBlID09PSBOb3RlVHlwZS5OT1JNQUwpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSElUO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBub3RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChub3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5IRUxEOyAvLyBzZXQgdGhlIG5vdGUgdG8gaGVsZCBzbyBpdCB3b24ndCBjb3VudCBhcyBhIG1pc3NcclxuICAgICAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IChub3RlLnRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcykgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogbm90ZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLmhvbGRUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQ29uZmlndXJlZEZvckJvb3MoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBnZXRBY2N1cmFjeUV2ZW50TmFtZShJbmZpbml0eSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IEluZmluaXR5LFxyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBub3RlVHlwZTogTm90ZVR5cGUuTk9ORSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWFybGllc3RIaXR0YWJsZVVuaGl0Tm90ZUluZGV4KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5nZUluU2Vjb25kcygpO1xyXG4gICAgICAgIGxldCBoaXR0YWJsZVRpbWVSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSA9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SGl0dGFibGVSYW5nZShhY2N1cmFjeVJhbmdlLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGhpdHRhYmxlSW5kZXhSYW5nZTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSA9XHJcbiAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIuZ2V0Tm90ZXNCeVRpbWVSYW5nZShoaXR0YWJsZVRpbWVSYW5nZS5sZWFzdFRpbWUsIGhpdHRhYmxlVGltZVJhbmdlLmdyZWF0ZXN0VGltZSwgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVhcmxpZXN0VW5oaXROb3RlSW5kZXhJblJhbmdlKHRyYWNrTnVtYmVyLCBoaXR0YWJsZUluZGV4UmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjY3VyYWN5UmFuZ2VJblNlY29uZHMoKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5U2V0dGluZ3MgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGxldCBudW1TZXR0aW5ncyA9IGFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoO1xyXG4gICAgICAgIGxldCBsZWFzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgIGFjY3VyYWN5U2V0dGluZ3NbMV0ubG93ZXJCb3VuZCA6IGFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZDtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lO1xyXG4gICAgICAgIGlmIChhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAxXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge2xlYXN0VGltZTogbGVhc3RUaW1lIC8gMTAwMCwgZ3JlYXRlc3RUaW1lOiBncmVhdGVzdFRpbWUgLyAxMDAwfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIaXR0YWJsZVJhbmdlKGFjY3VyYWN5UmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0sIHJlY2VwdG9yVGltZVBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZWFzdFRpbWU6IHJlY2VwdG9yVGltZVBvc2l0aW9uICsgYWNjdXJhY3lSYW5nZS5sZWFzdFRpbWUsXHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZTogcmVjZXB0b3JUaW1lUG9zaXRpb24gKyBhY2N1cmFjeVJhbmdlLmdyZWF0ZXN0VGltZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFYXJsaWVzdFVuaGl0Tm90ZUluZGV4SW5SYW5nZSh0cmFja051bWJlcjogbnVtYmVyLCBub3RlSW5kZXhSYW5nZTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBub3RlSW5kZXhSYW5nZS5zdGFydEluZGV4OyBpIDwgbm90ZUluZGV4UmFuZ2UuZW5kSW5kZXhOb3RJbmNsdXNpdmU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2ldLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc0NvbmZpZ3VyZWRGb3JCb29zKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeVRvUmVsZWFzZU5vdGUoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXggPSB0aGlzLmdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kcywgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmIChub3RlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbm90ZSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobm90ZS50eXBlID09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBob2xkID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW25vdGVJbmRleCAtIDFdOyAvLyBnZXQgdGhlIGhvbGQgYmVsb25naW5nIHRvIHRoaXMgdGFpbFxyXG4gICAgICAgICAgICAgICAgaG9sZC5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGNoYW5nZSB0aGUgaG9sZCBzdGF0ZSBmcm9tIEhFTEQgdG8gSElUXHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSB0YWlsIG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBcIlJlbGVhc2UgXCIgKyBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IG5vdGUudHlwZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gbGV0IGdvIHRvbyBlYXJseVxyXG4gICAgICAgICAgICAvLyBDb3VsZCB0aGlzIHJldHVybiAtMT9cclxuICAgICAgICAgICAgbGV0IGhvbGRTdGFydEluZGV4ID0gdGhpcy5ub3RlTWFuYWdlci5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShjdXJyZW50VGltZUluU2Vjb25kcywgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdKTtcclxuICAgICAgICAgICAgbGV0IGhvbGQgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXggLSAxXTtcclxuICAgICAgICAgICAgbGV0IHRhaWwgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoaG9sZC50eXBlID09IE5vdGVUeXBlLkhPTERfSEVBRCAmJiB0YWlsLnR5cGUgPT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4IC0gMV0uc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBoaXQgdGhlIHN0YXJ0IG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXhdLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSB0YWlsIG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogXCJSZWxlYXNlIFwiICsgZ2V0QWNjdXJhY3lFdmVudE5hbWUoSW5maW5pdHksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IEluZmluaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBOb3RlVHlwZS5OT05FLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBJdCdzIHBvc3NpYmxlIHRoYXQgdGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIHJhY2UgY29uZGl0aW9uIGJldHdlZW4gdGhlIGtleSBldmVudCBhbmQgdGhlIGFuaW1hdGlvbiBsb29wLiBEb24ndCB0aHJvdyBhbiBlcnJvciBmb3Igbm93XHJcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBcIkVycm9yOiBSZWxlYXNlIG1pc3MgZmFpbGVkIHRvIHRyaWdnZXIgb24gbm90ZSBpbmRleCBcIiArIChob2xkU3RhcnRJbmRleCAtIDEpICsgXCIsIHRyYWNrIGluZGV4IFwiICsgdHJhY2tOdW1iZXIgKyBcIiBhdCB0aW1lIFwiICsgY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcblxyXG5leHBvcnQgZW51bSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlIHtcclxuICAgIElOQ09NUExFVEUsXHJcbiAgICBSRUFEWSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY2N1cmFjeUV2ZW50IHtcclxuICAgIGFjY3VyYWN5TmFtZTogc3RyaW5nLFxyXG4gICAgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgIGFjY3VyYWN5TWlsbGlzOiBudW1iZXIsXHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGVcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgIGFjY3VyYWN5TWlsbGlzOiBudW1iZXIsXHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5UmVjb3JkaW5nIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZTtcclxuICAgIHB1YmxpYyByZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnlbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGUuSU5DT01QTEVURTtcclxuICAgICAgICB0aGlzLnJlY29yZGluZyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRpbmcucHVzaChbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvcmRBY2N1cmFjeUV2ZW50KGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnJlY29yZGluZ1thY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyXS5wdXNoKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBhY2N1cmFjeUV2ZW50LnRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyxcclxuICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBhY2N1cmFjeUV2ZW50Lm5vdGVUeXBlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgZW51bSBBdWRpb0ZpbGVTdGF0ZSB7XHJcbiAgICBOT19BVURJT19GSUxFLFxyXG4gICAgRE9ORV9SRUFESU5HLFxyXG4gICAgQlVGRkVSRUQsXHJcbiAgICBFUlJPUixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1ZGlvRmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IEF1ZGlvRmlsZVN0YXRlO1xyXG4gICAgcHVibGljIGZpbGU6IEZpbGU7XHJcbiAgICBwdWJsaWMgYmxvYjogQmxvYlxyXG4gICAgcHVibGljIGF1ZGlvU291cmNlOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGU7XHJcbiAgICBwdWJsaWMgYXVkaW9Db250ZXh0OiBBdWRpb0NvbnRleHQ7XHJcbiAgICBwdWJsaWMgYXVkaW9CdWZmZXI6IEF1ZGlvQnVmZmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEZpbGUoZmlsZTogcDUuRmlsZSkge1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGUuZmlsZTsgLy8gdGhpcyB1bndyYXBzIHRoZSBwNS5GaWxlIHdyYXBwZXIgdG8gZ2V0IHRoZSBvcmlnaW5hbCBET00gZmlsZVxyXG4gICAgICAgIHRoaXMubG9hZEF1ZGlvRGF0YSh0aGlzLmZpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkQmxvYihibG9iOiBCbG9iKSB7XHJcbiAgICAgICAgdGhpcy5ibG9iID0gYmxvYjtcclxuICAgICAgICB0aGlzLmxvYWRBdWRpb0RhdGEodGhpcy5ibG9iKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRBdWRpb0RhdGEoYXVkaW9EYXRhOiBGaWxlIHwgQmxvYikge1xyXG4gICAgICAgIHRoaXMubG9hZFNvdW5kRmlsZShhdWRpb0RhdGEsICgob25GaWxlUmVhZDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5kZWNvZGVBdWRpb0RhdGEoPEFycmF5QnVmZmVyPm9uRmlsZVJlYWQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlQXVkaW9EYXRhKGF1ZGlvRGF0YTogQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYXVkaW9EYXRhKS50aGVuKCgoYnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0J1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2l0aCBkZWNvZGluZyBhdWRpbyBkYXRhXCIgKyBlLmVycik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREdXJhdGlvbigpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIuZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXkoZGVsYXlJblNlY29uZHM6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZGVsYXlJblNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVTb3VyY2VOb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWNyZWF0ZVNvdXJjZU5vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gdGhpcy5hdWRpb0J1ZmZlcjtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRTb3VuZEZpbGUoXHJcbiAgICAgICAgZmlsZTogQmxvYiB8IEZpbGUsXHJcbiAgICAgICAgbGlzdGVuZXI6IChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4gYW55LFxyXG4gICAgICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnNcclxuICAgICkge1xyXG4gICAgICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7ZGVmYXVsdElmVW5kZWZpbmVkfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7REVGQVVMVF9DT05GSUd9IGZyb20gXCIuL2RlZmF1bHRfY29uZmlnXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcblxyXG4vKiBTdG9yZXMgdXNlciBzZXR0aW5ncy4gRXhwZWN0ZWQgbm90IHRvIGNoYW5nZSBkdXJpbmcgcGxheSAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuICAgIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4gICAgcmVjZXB0b3JZUGVyY2VudDogbnVtYmVyO1xyXG4gICAgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdO1xyXG4gICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBrZXlCaW5kaW5nczogTWFwPG51bWJlciwgS2V5QmluZGluZ1tdPjtcclxuICAgIGdhbWVBcmVhSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBnYW1lQXJlYVdpZHRoOiBudW1iZXI7XHJcbiAgICBub3RlU2l6ZTogbnVtYmVyO1xyXG4gICAgcXVpdEtleTogbnVtYmVyO1xyXG4gICAgaXNBY2N1cmFjeUZsYXNoRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaXNBY2N1cmFjeVRleHRFbmFibGVkOiBib29sZWFuO1xyXG4gICAgaXNIb2xkUGFydGljbGVzRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzSG9sZEdsb3dFbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBwaXhlbHNQZXJTZWNvbmQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZXB0b3JZUGVyY2VudD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxEaXJlY3Rpb24/OiBTY3JvbGxEaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcz86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzPzogQWNjdXJhY3lbXSxcclxuICAgICAgICAgICAgICAgICAgICBwYXVzZUF0U3RhcnRJblNlY29uZHM/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5QmluZGluZ3M/OiBNYXA8bnVtYmVyLCBLZXlCaW5kaW5nW10+LFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVBcmVhSGVpZ2h0PzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVBcmVhV2lkdGg/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpdEtleT86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBpc0FjY3VyYWN5Rmxhc2hFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeVRleHRFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0hvbGRQYXJ0aWNsZXNFbmFibGVkPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBpc0hvbGRHbG93RW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmdhbWVBcmVhSGVpZ2h0ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuZ2FtZUFyZWFIZWlnaHQsIERFRkFVTFRfQ09ORklHLmdhbWVBcmVhSGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmdhbWVBcmVhV2lkdGggPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5nYW1lQXJlYVdpZHRoLCBERUZBVUxUX0NPTkZJRy5nYW1lQXJlYVdpZHRoKTtcclxuICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnBpeGVsc1BlclNlY29uZCwgREVGQVVMVF9DT05GSUcucGl4ZWxzUGVyU2Vjb25kKTtcclxuICAgICAgICB0aGlzLnNjcm9sbERpcmVjdGlvbiA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnNjcm9sbERpcmVjdGlvbiwgREVGQVVMVF9DT05GSUcuc2Nyb2xsRGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gTk9URTogU2Nyb2xsIGRpcmVjdGlvbiBhbmQgZ2FtZUFyZWFIZWlnaHQgbXVzdCBiZSBzZXQgQkVGT1JFIHNldHRpbmcgcmVjZXB0b3JZUG9zaXRpb25cclxuICAgICAgICB0aGlzLnJlY2VwdG9yWVBlcmNlbnQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5yZWNlcHRvcllQZXJjZW50LCBERUZBVUxUX0NPTkZJRy5yZWNlcHRvcllQZXJjZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcywgREVGQVVMVF9DT05GSUcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVNldHRpbmdzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuYWNjdXJhY3lTZXR0aW5ncywgREVGQVVMVF9DT05GSUcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5wYXVzZUF0U3RhcnRJblNlY29uZHMgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5wYXVzZUF0U3RhcnRJblNlY29uZHMsIERFRkFVTFRfQ09ORklHLnBhdXNlQXRTdGFydEluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLm5vdGVTaXplLCBERUZBVUxUX0NPTkZJRy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5rZXlCaW5kaW5ncyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmtleUJpbmRpbmdzLCBERUZBVUxUX0NPTkZJRy5rZXlCaW5kaW5ncyk7XHJcbiAgICAgICAgdGhpcy5xdWl0S2V5ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucXVpdEtleSwgREVGQVVMVF9DT05GSUcucXVpdEtleSk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkLFxyXG4gICAgICAgICAgICBERUZBVUxUX0NPTkZJRy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNIb2xkUGFydGljbGVzRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5pc0hvbGRHbG93RW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzSG9sZEdsb3dFbmFibGVkLCBERUZBVUxUX0NPTkZJRy5pc0hvbGRHbG93RW5hYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmUoKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZ1N0cmluZyA9IHRoaXMuZ2V0Q29uZmlnQXNTdHJpbmcoKTtcclxuICAgICAgICBsZXQgZXhwaXJlcyA9IHRoaXMuZ2V0RGF0ZU9mT25lWWVhckZyb21Ob3coKTtcclxuICAgICAgICBsZXQgcGF0aCA9ICcvJztcclxuICAgICAgICBsZXQgY29va2llU3RyaW5nID0gXCJjb25maWc9XCIgKyBlc2NhcGUoY29uZmlnU3RyaW5nKVxyXG4gICAgICAgICAgICArICc7cGF0aD0nICsgcGF0aFxyXG4gICAgICAgICAgICArICc7ZXhwaXJlcz0nICsgZXhwaXJlcy50b1VUQ1N0cmluZygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvb2tpZVN0cmluZyk7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llU3RyaW5nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZmlnIHNhdmVkIHRvIGNvb2tpZSFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb25maWdBc1N0cmluZygpIHtcclxuICAgICAgICBsZXQgc3RyaW5nOiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzKTtcclxuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgnLFwia2V5QmluZGluZ3NcIjp7fSwnLFxyXG4gICAgICAgICAgICAnLFwia2V5QmluZGluZ3NcIjonICsgdGhpcy5zdHJpbmdpZnlLZXlCaW5kaW5ncygpICsgJywnKTtcclxuICAgICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZCgpOiBDb25maWcge1xyXG4gICAgICAgIGxldCBjb25maWdDb29raWUgPSBDb25maWcuZ2V0RnJvbUNvb2tpZShcImNvbmZpZ1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb25maWdDb29raWUpO1xyXG4gICAgICAgIGlmIChjb25maWdDb29raWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdKU09OID0gSlNPTi5wYXJzZSh1bmVzY2FwZShjb25maWdDb29raWUpKTtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ0pTT04ua2V5QmluZGluZ3MgPSBuZXcgTWFwKGNvbmZpZ0pTT04ua2V5QmluZGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZzogQ29uZmlnID0gbmV3IENvbmZpZyhjb25maWdKU09OKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZmlnIGxvYWRlZCBmcm9tIGNvb2tpZSFcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICAgICAgfSBjYXRjaChlKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHZhbGlkIGNvb2tpZSBmb3VuZCwgcmV0dXJuaW5nIGRlZmF1bHQgY29uZmlnIVwiKTtcclxuICAgICAgICByZXR1cm4gbmV3IENvbmZpZyh7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXRlT2ZPbmVZZWFyRnJvbU5vdygpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0cmluZ2lmeUtleUJpbmRpbmdzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHN0cmluZyA9IFwiW1wiO1xyXG4gICAgICAgIHRoaXMua2V5QmluZGluZ3MuZm9yRWFjaCgodmFsdWU6IEtleUJpbmRpbmdbXSwga2V5OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgc3RyaW5nICs9IFwiW1wiKyBrZXkgKyBcIixcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArXCJdXCI7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBzdHJpbmcgKz0gXCJdXCI7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRGcm9tQ29va2llKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY29va2llXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCI7IFwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQocm93ID0+IHJvdy5zdGFydHNXaXRoKGtleSkpXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCI9XCIpWzFdO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGxldCBERUZBVUxUX0NPTkZJRyA9IHtcclxuICAgIHBpeGVsc1BlclNlY29uZDogNTUwLFxyXG4gICAgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24uRG93bixcclxuICAgIHJlY2VwdG9yWVBlcmNlbnQ6IDE1LFxyXG4gICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kczogMCxcclxuICAgIC8vIFRoaXMgaXMgYSBzeW1tZXRyaWNhbCB2ZXJzaW9uIG9mIEZGUidzIGFjY3VyYWN5XHJcbiAgICAvLyBUT0RPOiBBZGQgYSBsaXN0IG9mIHByZXNldHMgdGhhdCBsaXZlIGluIHRoZWlyIG93biBmaWxlXHJcbiAgICAvLyBUT0RPOiB2YWxpZGF0aW9uIG9uIGFjY3VyYWN5IHNldHRpbmdzIHRoYXQgZXhwbGFpbnMgd2h5IG1pc3Mgc2hvdWxkbid0IGhhdmUgbG93ZXIgYm91bmRcclxuICAgIGFjY3VyYWN5U2V0dGluZ3M6IFtcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJNaXNzXCIsIG51bGwsLTExNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQXZlcmFnZVwiLCAtMTE3LCAtODMpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkdvb2RcIiwgLTgzLCAtNTApLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIlBlcmZlY3RcIiwgLTUwLCAtMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkFtYXppbmdcIiwgLTE3LCAxNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiUGVyZmVjdFwiLCAxNywgNTApLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkdvb2RcIiwgNTAsIDgzKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBdmVyYWdlXCIsIDgzLCAxMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkJvb1wiLCAxMTcsIG51bGwpXHJcbiAgICBdLFxyXG4gICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzOiAwLFxyXG4gICAga2V5QmluZGluZ3M6IG5ldyBNYXAoKSxcclxuICAgIGdhbWVBcmVhSGVpZ2h0OiA2MDAsXHJcbiAgICBnYW1lQXJlYVdpZHRoOiA0MDAsXHJcbiAgICBub3RlU2l6ZTogMzAsXHJcbiAgICBxdWl0S2V5OiAyNywgLy8gUXVpdCBkZWZhdWx0cyB0byBlc2NhcGUga2V5XHJcbiAgICBpc0FjY3VyYWN5Rmxhc2hFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0FjY3VyYWN5VGV4dEVuYWJsZWQ6IHRydWUsXHJcbiAgICBpc0hvbGRQYXJ0aWNsZXNFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNIb2xkR2xvd0VuYWJsZWQ6IHRydWUsXHJcbn07IiwiaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVmYXVsdE5vdGVTa2luIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd05vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gbm90ZVNpemU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgc3dpdGNoIChub3RlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcInZcIiwgY2VudGVyWCwgY2VudGVyWSArIDYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuUk9MTF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJ4XCIsIGNlbnRlclgsIGNlbnRlclkgKyA2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk1JTkU6XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAuY2lyY2xlKGNlbnRlclgsIGNlbnRlclksIDI0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJYXCIsIGNlbnRlclgsIGNlbnRlclkgKyA4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwiP1wiLCBjZW50ZXJYLCBjZW50ZXJZICsgNyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdSZWNlcHRvcih0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gbm90ZVNpemU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3SG9sZENvbm5lY3RvcihjZW50ZXJYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCBlbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplICogMC41O1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBzdGFydFksIHdpZHRoLCBlbmRZIC0gc3RhcnRZKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7RGVmYXVsdE5vdGVTa2lufSBmcm9tIFwiLi9kZWZhdWx0X25vdGVfc2tpblwiO1xyXG5cclxuY2xhc3MgTm90ZURpc3BsYXkge1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIG5vdGVTaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRyYWNrTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsIHNrZXRjaEluc3RhbmNlOiBwNSwgbm90ZVNpemU6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLm5vdGVUeXBlID0gbm90ZVR5cGU7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IG5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMudHJhY2tOdW1iZXIgPSB0cmFja051bWJlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc05vdGVEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3Tm90ZSh0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLFxyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclksIHRoaXMubm90ZVR5cGUsIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIGlmICghaXNOb3RlRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdOb3RlKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlVHlwZSxcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSG9sZENvbm5lY3RvciB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBzdGFydFk6IG51bWJlcjtcclxuICAgIGVuZFk6IG51bWJlcjtcclxuICAgIG5vdGVTdGFydFk6IG51bWJlcjtcclxuICAgIG5vdGVFbmRZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjZW50ZXJYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCBlbmRZOiBudW1iZXIsIG5vdGVTdGFydFk6IG51bWJlciwgbm90ZUVuZFk6IG51bWJlciwgc2tldGNoSW5zdGFuY2U6IHA1KSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5zdGFydFkgPSBzdGFydFk7XHJcbiAgICAgICAgdGhpcy5lbmRZID0gZW5kWTtcclxuICAgICAgICB0aGlzLm5vdGVTdGFydFkgPSBub3RlU3RhcnRZO1xyXG4gICAgICAgIHRoaXMubm90ZUVuZFkgPSBub3RlRW5kWTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc0Nvbm5lY3RvckRyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdIb2xkQ29ubmVjdG9yKHRoaXMuY2VudGVyWCwgdGhpcy5zdGFydFksIHRoaXMuZW5kWSxcclxuICAgICAgICAgICAgdGhpcy5ub3RlU3RhcnRZLCB0aGlzLm5vdGVFbmRZKTtcclxuICAgICAgICBpZiAoIWlzQ29ubmVjdG9yRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdIb2xkQ29ubmVjdG9yKHRoaXMuY2VudGVyWCwgdGhpcy5zdGFydFksIHRoaXMuZW5kWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBSZWNlcHRvciB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIHByaXZhdGUgbm90ZVNpemU6IG51bWJlclxyXG4gICAgcHJpdmF0ZSB0cmFja051bWJlcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgc2tldGNoSW5zdGFuY2U6IHA1LCBub3RlU2l6ZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSBjZW50ZXJZO1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBub3RlU2l6ZTtcclxuICAgICAgICB0aGlzLnRyYWNrTnVtYmVyID0gdHJhY2tOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaXNSZWNlcHRvckRyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdSZWNlcHRvcih0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLFxyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclksIHRoaXMubm90ZVNpemUpO1xyXG4gICAgICAgIGlmICghaXNSZWNlcHRvckRyYXdTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgIERlZmF1bHROb3RlU2tpbi5kcmF3UmVjZXB0b3IodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCwgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBEaXNwbGF5Q29uZmlnIHtcclxuLy8gICAgIHB1YmxpYyBub3RlU2l6ZTogbnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuLy8gICAgIHB1YmxpYyBzY3JvbGxEaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbjtcclxuLy8gICAgIHB1YmxpYyByZWNlcHRvclNpemVzOiBudW1iZXJbXTtcclxuLy9cclxuLy8gICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4vLyAgICAgICAgIHRoaXMubm90ZVNpemUgPSBjb25maWcubm90ZVNpemU7XHJcbi8vICAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBjb25maWcucGl4ZWxzUGVyU2Vjb25kO1xyXG4vLyAgICAgICAgIHRoaXMucmVjZXB0b3JZUGVyY2VudCA9IGNvbmZpZy5yZWNlcHRvcllQZXJjZW50O1xyXG4vLyAgICAgICAgIHRoaXMuc2Nyb2xsRGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbjtcclxuLy8gICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMgPSBbXTtcclxuLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMucmVjZXB0b3JTaXplcy5wdXNoKGNvbmZpZy5ub3RlU2l6ZSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vKiBBIHNldCBvZiBvcHRpb25zIHRoYXQgaW50ZXJzZWN0IHdpdGggdGhlIHVzZXIgQ29uZmlnLCBidXQgYXJlIGV4cGVjdGVkIHRvIGJlIGNoYW5nZWQgZHVyaW5nIHBsYXkgKi9cclxuZXhwb3J0IGludGVyZmFjZSBEaXNwbGF5Q29uZmlnIHtcclxuICAgIGdldE5vdGVTaXplOiAoKSA9PiBudW1iZXI7XHJcbiAgICBnZXRQaXhlbHNQZXJTZWNvbmQ6ICgpID0+IG51bWJlcjtcclxuICAgIGdldFJlY2VwdG9yWVBlcmNlbnQ6ICgpID0+IG51bWJlcjtcclxuICAgIGdldFNjcm9sbERpcmVjdGlvbjogKCkgPT4gU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgZ2V0UmVjZXB0b3JTaXplczogKCkgPT4gbnVtYmVyW107XHJcbiAgICBzZXRSZWNlcHRvclNpemU6ICh0cmFja051bWJlcjogbnVtYmVyLCByZWNlcHRvclNpemU6IG51bWJlcikgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERpc3BsYXlNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIHRvcExlZnRYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRvcExlZnRZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZywgc2tldGNoSW5zdGFuY2U6IHA1LCB0b3BMZWZ0WDogbnVtYmVyID0gMCxcclxuICAgICAgICAgICAgICAgIHRvcExlZnRZOiBudW1iZXIgPSAwLCB3aWR0aDogbnVtYmVyID0gMTgwLCBoZWlnaHQ6IG51bWJlciA9IDQwMCkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IGRpc3BsYXlDb25maWc7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMgPSAwO1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLnRvcExlZnRYID0gdG9wTGVmdFg7XHJcbiAgICAgICAgdGhpcy50b3BMZWZ0WSA9IHRvcExlZnRZO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSB0aGlzLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMgPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlLnJlY3QodGhpcy50b3BMZWZ0WCwgdGhpcy50b3BMZWZ0WSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuZHJhd05vdGVzQW5kQ29ubmVjdG9ycygpO1xyXG4gICAgICAgIHRoaXMuZHJhd1JlY2VwdG9ycygpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZXNBbmRDb25uZWN0b3JzKCkge1xyXG4gICAgICAgIGxldCBsZWFzdFRpbWUgPSB0aGlzLmdldExlYXN0VGltZSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lID0gdGhpcy5nZXRHcmVhdGVzdFRpbWUodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5kcmF3QWxsQ29ubmVjdG9ycyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSk7XHJcbiAgICAgICAgdGhpcy5kcmF3QWxsTm90ZXMobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbE5vdGVzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBudW1UcmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdOb3Rlc0luVHJhY2sobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUsIGksIG51bVRyYWNrcywgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGVzSW5UcmFjayhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4UmFuZ2UgPSB0aGlzLm5vdGVNYW5hZ2VyLmdldE5vdGVzQnlUaW1lUmFuZ2UobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBsZXQgbm90ZXMgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl0uc2xpY2Uobm90ZUluZGV4UmFuZ2Uuc3RhcnRJbmRleCwgbm90ZUluZGV4UmFuZ2UuZW5kSW5kZXhOb3RJbmNsdXNpdmUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Tm90ZShub3Rlc1tpXSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3RlKG5vdGU6IE5vdGUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgICAgICBsZXQgeSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkobm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgIG5ldyBOb3RlRGlzcGxheSh4LCB5LCBub3RlLnR5cGUsIHRoaXMuc2tldGNoSW5zdGFuY2UsIHRoaXMuZGlzcGxheUNvbmZpZy5nZXROb3RlU2l6ZSgpLCB0cmFja051bWJlciwgbnVtVHJhY2tzKS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGVhc3RUaW1lKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdG90YWxEaXNwbGF5U2Vjb25kcyA9IHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC8gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZSAtIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvcllQZXJjZW50KCkgLyAxMDAgKiB0b3RhbERpc3BsYXlTZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R3JlYXRlc3RUaW1lKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdG90YWxEaXNwbGF5U2Vjb25kcyA9IHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC8gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZSArICgxIC0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yWVBlcmNlbnQoKSAvIDEwMCkgKiB0b3RhbERpc3BsYXlTZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROb3RlQ2VudGVyWCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByZWNlcHRvclNwYWNpbmcgPSB0aGlzLmdldERpc3BsYXlXaWR0aCgpIC8gbnVtVHJhY2tzIC0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldE5vdGVTaXplKCk7XHJcbiAgICAgICAgcmV0dXJuICgyICogdHJhY2tOdW1iZXIgKyAxKSAvIDIgKiAodGhpcy5kaXNwbGF5Q29uZmlnLmdldE5vdGVTaXplKCkgKyByZWNlcHRvclNwYWNpbmcpICsgdGhpcy50b3BMZWZ0WDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGVzc2VudGlhbGx5IGRlZmluZXMgYSBjb252ZXJzaW9uIGZyb20gc2Vjb25kcyB0byBwaXhlbHNcclxuICAgIHB1YmxpYyBnZXROb3RlQ2VudGVyWShub3RlVGltZUluU2Vjb25kczogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVZT2Zmc2V0ID0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFBpeGVsc1BlclNlY29uZCgpICogKG5vdGVUaW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCByZWNlcHRvcllPZmZzZXQgPSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JZUGVyY2VudCgpIC8gMTAwICogdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheUNvbmZpZy5nZXRTY3JvbGxEaXJlY3Rpb24oKSA9PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY2VwdG9yWU9mZnNldCArIG5vdGVZT2Zmc2V0ICsgdGhpcy50b3BMZWZ0WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLSAocmVjZXB0b3JZT2Zmc2V0ICsgbm90ZVlPZmZzZXQpICsgdGhpcy50b3BMZWZ0WTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsQ29ubmVjdG9ycyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3QWxsVHJhY2tDb25uZWN0b3JzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCB0cmFja3NbaV0sIGksXHJcbiAgICAgICAgICAgICAgICB0cmFja3MubGVuZ3RoLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsVHJhY2tDb25uZWN0b3JzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2s6IE5vdGVbXSwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlU3RhY2s6IE5vdGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb3RlOiBOb3RlID0gdHJhY2tbaV07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50aW1lSW5TZWNvbmRzIDwgbGVhc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50aW1lSW5TZWNvbmRzIDwgZ3JlYXRlc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE5vdGUgPSBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZE5vdGUgPSBjdXJyZW50Tm90ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnROb3RlICE9IHVuZGVmaW5lZCAmJiBlbmROb3RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCB8fCBzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDb25uZWN0b3Ioc3RhcnROb3RlLCBlbmROb3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm90ZVN0YWNrLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE5vdGUgPSBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZE5vdGUgPSBjdXJyZW50Tm90ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnROb3RlICE9IHVuZGVmaW5lZCAmJiBlbmROb3RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCB8fCBzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDb25uZWN0b3Ioc3RhcnROb3RlLCBlbmROb3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZTogTm90ZSwgZW5kTm90ZTogTm90ZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IG5vdGVTdGFydFkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKHN0YXJ0Tm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgbGV0IG5vdGVFbmRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShlbmROb3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuXHJcbiAgICAgICAgbGV0IGRyYXdTdGFydFk7XHJcbiAgICAgICAgaWYgKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuSEVMRCkge1xyXG4gICAgICAgICAgICBkcmF3U3RhcnRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShNYXRoLm1pbihjdXJyZW50VGltZSwgZW5kTm90ZS50aW1lSW5TZWNvbmRzKSwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFydFkgPSBub3RlU3RhcnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcmF3U3RhcnRZID0gdGhpcy5jbGFtcFZhbHVlVG9SYW5nZShkcmF3U3RhcnRZLCB0aGlzLnRvcExlZnRZLCB0aGlzLnRvcExlZnRZICsgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgZHJhd0VuZFkgPSBub3RlRW5kWVxyXG4gICAgICAgIGRyYXdFbmRZID0gdGhpcy5jbGFtcFZhbHVlVG9SYW5nZShkcmF3RW5kWSwgdGhpcy50b3BMZWZ0WSwgdGhpcy50b3BMZWZ0WSArIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbmV3IEhvbGRDb25uZWN0b3IoY2VudGVyWCwgZHJhd1N0YXJ0WSwgZHJhd0VuZFksIG5vdGVTdGFydFksIG5vdGVFbmRZLCB0aGlzLnNrZXRjaEluc3RhbmNlKS5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGFtcFZhbHVlVG9SYW5nZSh2YWx1ZTogbnVtYmVyLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgbG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlID4gdXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1JlY2VwdG9ycygpIHtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbmV3IFJlY2VwdG9yKHRoaXMuZ2V0Tm90ZUNlbnRlclgoaSwgbnVtVHJhY2tzKSwgdGhpcy5nZXROb3RlQ2VudGVyWSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UsIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvclNpemVzKClbaV0sIGksIG51bVRyYWNrcykuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbi8vIExldHMgdXMgY29kZSB0aGUgRE9NIFVJIGVsZW1lbnRzIGFzIGlmIGl0IHdlcmUgXCJpbW1lZGlhdGVcIiwgaS5lLiBzdGF0ZWxlc3MuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBET01XcmFwcGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlZ2lzdHJ5OiBNYXA8c3RyaW5nLCBwNS5FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvLyB1bmlxdWVJRCBzaG91bGQgYmUgdW5pcXVlIHdpdGhpbiBhIHNjZW5lXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShjcmVhdGVDYWxsOiAoKSA9PiBwNS5FbGVtZW50LCB1bmlxdWVJZDogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJ5Lmhhcyh1bmlxdWVJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMucmVnaXN0cnkuZ2V0KHVuaXF1ZUlkKSxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUNhbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5zZXQodW5pcXVlSWQsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJSZWdpc3RyeSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmZvckVhY2goKHZhbHVlLCBrZXksIG1hcCkgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIHJlbW92ZSB3YXMgc3VjY2Vzc2Z1bCwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyeS5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuZ2V0KGlkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGVsZW1lbnQgaWYgZm91bmQsIG90aGVyd2lzZSByZXR1cm5zIHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudEJ5SWQoaWQ6IHN0cmluZyk6IHA1LkVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChpZCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3QWNjdXJhY3lCYXJzKHA6IHA1LCBhY2N1cmFjeUxhYmVsczogc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhckhlaWdodDogbnVtYmVyLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Jvb0Zvckxhc3RBY2N1cmFjeTogYm9vbGVhbikge1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IGdldE1heFRleHRXaWR0aChwLCBhY2N1cmFjeUxhYmVscywgdGV4dFNpemUpO1xyXG4gICAgbGV0IHRvdGFsTm90ZXMgPSBub3RlTWFuYWdlci5nZXRUb3RhbE5vdGVzKCk7XHJcbiAgICBsZXQgYmFyU3BhY2luZyA9IDEwO1xyXG4gICAgbGV0IHRvdGFsSGVpZ2h0ID0gYWNjdXJhY3lMYWJlbHMubGVuZ3RoICogYmFySGVpZ2h0ICsgKGFjY3VyYWN5TGFiZWxzLmxlbmd0aCAtIDEpICogYmFyU3BhY2luZztcclxuICAgIGxldCBzdGFydFkgPSAocC5oZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyICsgYmFySGVpZ2h0IC8gMjtcclxuICAgIHN0YXJ0WSAqPSAwLjg7IC8vIHNoaWZ0IHRoZSByZXN1bHRzIHVwIHRvIG1ha2Ugcm9vbSBmb3IgZXhpdCBidXR0b25cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWN5TGFiZWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5TGFiZWwgPSBhY2N1cmFjeUxhYmVsc1tpXTtcclxuICAgICAgICBsZXQgbnVtQWNjdXJhY3lFdmVudHMgPSBnZXROdW1BY2N1cmFjeUV2ZW50cyhhY2N1cmFjeUxhYmVsLCBhY2N1cmFjeVJlY29yZGluZywgYWNjdXJhY3lNYW5hZ2VyKTtcclxuICAgICAgICBsZXQgcGVyY2VudEZpbGxlZCA9IG51bUFjY3VyYWN5RXZlbnRzIC8gdG90YWxOb3RlcztcclxuXHJcbiAgICAgICAgaWYgKGlzQm9vRm9yTGFzdEFjY3VyYWN5ICYmIGkgPT09IGFjY3VyYWN5TGFiZWxzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgZHJhd0FjY3VyYWN5V2l0aE5vQmFyKHAsIGNlbnRlclgsIHN0YXJ0WSArIGkgKiAoYmFySGVpZ2h0ICsgYmFyU3BhY2luZyksIGFjY3VyYWN5TGFiZWwsXHJcbiAgICAgICAgICAgICAgICBudW1BY2N1cmFjeUV2ZW50cy50b1N0cmluZygpLCB0b3RhbE5vdGVzLnRvU3RyaW5nKCksIHRleHRTaXplLCBtYXhUZXh0V2lkdGgsIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdBY2N1cmFjeUJhcihwLCBjZW50ZXJYLCBzdGFydFkgKyBpICogKGJhckhlaWdodCArIGJhclNwYWNpbmcpLCBhY2N1cmFjeUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgbnVtQWNjdXJhY3lFdmVudHMudG9TdHJpbmcoKSwgdG90YWxOb3Rlcy50b1N0cmluZygpLCB0ZXh0U2l6ZSwgbWF4VGV4dFdpZHRoLCBiYXJXaWR0aCwgYmFySGVpZ2h0LCBwZXJjZW50RmlsbGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE51bUFjY3VyYWN5RXZlbnRzKGFjY3VyYWN5TGFiZWw6IHN0cmluZywgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcikge1xyXG4gICAgcmV0dXJuIGFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZy5yZWR1Y2UoKHN1bSwgdHJhY2tSZWNvcmRpbmcpID0+XHJcbiAgICAgICAgc3VtICsgdHJhY2tSZWNvcmRpbmcuZmlsdGVyKGFjY3VyYWN5RXZlbnQgPT5cclxuICAgICAgICBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzLCBhY2N1cmFjeU1hbmFnZXIuY29uZmlnKSA9PT0gYWNjdXJhY3lMYWJlbCkubGVuZ3RoLCAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWF4VGV4dFdpZHRoKHA6IHA1LCB0ZXh0QXJyYXk6IHN0cmluZ1tdLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IHRleHRBcnJheS5tYXAoKHN0cmluZykgPT4gcC50ZXh0V2lkdGgoc3RyaW5nKSlcclxuICAgICAgICAucmVkdWNlKChtYXhXaWR0aCwgd2lkdGgpID0+IE1hdGgubWF4KG1heFdpZHRoLCB3aWR0aCwgLTEpKTtcclxuICAgIHAucG9wKCk7XHJcbiAgICByZXR1cm4gbWF4VGV4dFdpZHRoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3QWNjdXJhY3lCYXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBsYWJlbDE6IHN0cmluZywgbGFiZWwyOiBzdHJpbmcsIGxhYmVsMzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTaXplOiBudW1iZXIsIGxhcmdlc3RUZXh0V2lkdGg6IG51bWJlciwgYmFyV2lkdGg6IG51bWJlciwgYmFySGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudEZpbGxlZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCA9IDg7XHJcbiAgICBsZXQgdG90YWxXaWR0aCA9IGxhcmdlc3RUZXh0V2lkdGggKyBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsICsgYmFyV2lkdGg7XHJcbiAgICBsZXQgbGFiZWxSaWdodG1vc3RYID0gY2VudGVyWCAtIHRvdGFsV2lkdGggLyAyICsgbGFyZ2VzdFRleHRXaWR0aDtcclxuICAgIGRyYXdSaWdodEFsaWduZWRMYWJlbChwLCBsYWJlbFJpZ2h0bW9zdFgsIGNlbnRlclksIGxhYmVsMSwgdGV4dFNpemUpO1xyXG5cclxuICAgIGxldCBiYXJSaWdodFggPSBjZW50ZXJYICsgdG90YWxXaWR0aCAvIDI7XHJcbiAgICBsZXQgYmFyTGVmdFggPSBiYXJSaWdodFggLSBiYXJXaWR0aDtcclxuICAgIGxldCBiYXJDZW50ZXJYID0gKGJhckxlZnRYICsgYmFyUmlnaHRYKSAvIDI7XHJcbiAgICBkcmF3UGFydGlhbGx5RmlsbGVkQmFyKHAsIGJhckNlbnRlclgsIGNlbnRlclksIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQsIHRleHRTaXplLCBsYWJlbDIsIGxhYmVsMyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdSaWdodEFsaWduZWRMYWJlbChwOiBwNSwgcmlnaHRtb3N0WDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHQ6IHN0cmluZywgdGV4dFNpemU6IG51bWJlcikge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5SSUdIVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHRleHQsIHJpZ2h0bW9zdFgsIGNlbnRlclkpO1xyXG4gICAgcC5wb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1BhcnRpYWxseUZpbGxlZEJhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIHN0YXJ0TGFiZWw6IHN0cmluZywgZW5kTGFiZWw6IHN0cmluZykge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLnJlY3RNb2RlKHAuQ0VOVEVSKTtcclxuICAgIHAuc3Ryb2tlKFwid2hpdGVcIik7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgZmlsbGVkIHBhcnQgb2YgdGhlIGJhclxyXG4gICAgcC5maWxsKFwiZ3JheVwiKTtcclxuICAgIHAucmVjdChjZW50ZXJYIC0gKHdpZHRoICogKDEgLSBwZXJjZW50RmlsbGVkKSAvIDIpLCBjZW50ZXJZLCB3aWR0aCAqIHBlcmNlbnRGaWxsZWQsIGhlaWdodCk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgb3V0bGluZSBvZiB0aGUgYmFyXHJcbiAgICBwLm5vRmlsbCgpO1xyXG4gICAgcC5yZWN0KGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIGxhYmVscyBvbiB0aGUgZW5kcyBvZiB0aGUgYmFyXHJcbiAgICBsZXQgbGFiZWxTaXplID0gMS41ICogdGV4dFNpemU7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUobGFiZWxTaXplKTtcclxuICAgIHAudGV4dEFsaWduKHAuTEVGVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHN0YXJ0TGFiZWwsIGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAudGV4dEFsaWduKHAuUklHSFQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChlbmRMYWJlbCwgY2VudGVyWCArIHdpZHRoIC8gMiwgY2VudGVyWSArIDIpO1xyXG4gICAgcC5wb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0FjY3VyYWN5V2l0aE5vQmFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbGFiZWwxOiBzdHJpbmcsIGxhYmVsMjogc3RyaW5nLCBsYWJlbDM6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTaXplOiBudW1iZXIsIGxhcmdlc3RUZXh0V2lkdGg6IG51bWJlciwgYmFyV2lkdGg6IG51bWJlciwgYmFySGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIpIHtcclxuICAgIGxldCBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsID0gODtcclxuICAgIGxldCB0b3RhbFdpZHRoID0gbGFyZ2VzdFRleHRXaWR0aCArIHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgKyBiYXJXaWR0aDtcclxuICAgIGxldCBsYWJlbFJpZ2h0bW9zdFggPSBjZW50ZXJYIC0gdG90YWxXaWR0aCAvIDIgKyBsYXJnZXN0VGV4dFdpZHRoO1xyXG4gICAgZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHAsIGxhYmVsUmlnaHRtb3N0WCwgY2VudGVyWSwgbGFiZWwxLCB0ZXh0U2l6ZSk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgYWNjdXJhY3kgY291bnQgbGFiZWwgb24gdGhlIGxlZnQgZW5kIG9mIHRoZSBiYXJcclxuICAgIGxldCBsYWJlbFNpemUgPSAxLjUgKiB0ZXh0U2l6ZTtcclxuICAgIGxldCBiYXJSaWdodFggPSBjZW50ZXJYICsgdG90YWxXaWR0aCAvIDI7XHJcbiAgICBsZXQgYmFyTGVmdFggPSBiYXJSaWdodFggLSBiYXJXaWR0aDtcclxuICAgIGxldCBiYXJDZW50ZXJYID0gKGJhckxlZnRYICsgYmFyUmlnaHRYKSAvIDI7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZShsYWJlbFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5MRUZULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQobGFiZWwyLCBiYXJDZW50ZXJYIC0gYmFyV2lkdGggLyAyLCBjZW50ZXJZICsgMik7XHJcbiAgICBwLnBvcCgpO1xyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvbGRHbG93IHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGdsb3dTdGFydFRpbWVzOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgc3RhdGljIGRvbnREcmF3RmxhZzogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnbG93UGVyaW9kSW5TZWNvbmRzOiBudW1iZXIgPSAwLjM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyLCBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXMucHVzaChIb2xkR2xvdy5kb250RHJhd0ZsYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXSAhPT0gSG9sZEdsb3cuZG9udERyYXdGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGFwc2VkVGltZSA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gdGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjdXJyZW50VGltZUluU2Vjb25kcywgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdsb3dBbHBoYSA9IHRoaXMuZ2V0R2xvd0FscGhhKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBnbG93Q29sb3IgPSBwLmNvbG9yKDAsIDI1NSwgMCwgZ2xvd0FscGhhKTtcclxuICAgICAgICAgICAgICAgIGxldCBnbG93U2l6ZSA9IHRoaXMuZ2V0R2xvd1NpemUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R2xvdyhwLCBjZW50ZXJYLCBjZW50ZXJZLCBnbG93U2l6ZSwgZ2xvd1NpemUgLyAyLCBnbG93Q29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dsb3cocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5ub1N0cm9rZSgpO1xyXG4gICAgICAgIHAuZmlsbChjb2xvcik7XHJcbiAgICAgICAgcC5lbGxpcHNlKGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRHbG93QWxwaGEoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmltYXRpb25UaW1lID0gZWxhcHNlZFRpbWVJblNlY29uZHMgJSBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25SYXRpbyA9IGFuaW1hdGlvblRpbWUgLyBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpTGVycCgwLCA1MCwgYW5pbWF0aW9uUmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R2xvd1NpemUoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmltYXRpb25UaW1lID0gZWxhcHNlZFRpbWVJblNlY29uZHMgJSBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25SYXRpbyA9IGFuaW1hdGlvblRpbWUgLyBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBtYXhTaXplID0gdGhpcy5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmlMZXJwKDAsIG1heFNpemUsIGFuaW1hdGlvblJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJpTGVycChtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDwgMC41KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlcnAobWluVmFsdWUsIG1heFZhbHVlLCAxIC0gcmF0aW8gLyAwLjUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlcnAobWluVmFsdWUsIG1heFZhbHVlLCAyICogcmF0aW8gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsZXJwKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl0gPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5ob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdID0gSG9sZEdsb3cuZG9udERyYXdGbGFnO1xyXG4gICAgfVxyXG59IiwiLyogVGhpcyBjbGFzcyBpcyBpbnRlbmRlZCBvbmx5IHRvIGJlIHVzZWQgdG8gc3RvcmUgdGhlIGhvbGQgc3RhdGUgZm9yIG5vdGVzIHRoYXQgY2FuIGJlIGhlbGQuIFRoaXMgc2hvdWxkbid0IGJlIHVzZWRcclxuICAgZm9yIG5vcm1hbCBub3RlcyBvciBnZW5lcmFsIGtleWJvYXJkIHN0YXRlICovXHJcbmV4cG9ydCBjbGFzcyBIb2xkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGhlbGRUcmFja3M6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgb25UcmFja0hvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgb25UcmFja1VuaG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG51bVRyYWNrczogbnVtYmVyLCBvblRyYWNrSG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgICAgb25UcmFja1VuaG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbGRUcmFja3MucHVzaChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25UcmFja0hvbGQgPSBvblRyYWNrSG9sZDtcclxuICAgICAgICB0aGlzLm9uVHJhY2tVbmhvbGQgPSBvblRyYWNrVW5ob2xkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1RyYWNrSGVsZCh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblRyYWNrSG9sZCh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25UcmFja1VuaG9sZCh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtQYXJ0aWNsZVN5c3RlbX0gZnJvbSBcIi4vcGFydGljbGVfc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb2xkUGFydGljbGVzIHtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgcGFydGljbGVTeXN0ZW1zOiBQYXJ0aWNsZVN5c3RlbVtdO1xyXG4gICAgcHJpdmF0ZSBwcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wczogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kczogbnVtYmVyID0gMS41O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZG9udERyYXdGbGFnOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlUGVyaW9kSW5TZWNvbmRzOiBudW1iZXIgPSAwLjA1O1xyXG4gICAgcHJpdmF0ZSBncmF2aXR5RGlyZWN0aW9uOiBudW1iZXJcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmdyYXZpdHlEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93biA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgZ3Jhdml0eTogcDUuVmVjdG9yID0gcC5jcmVhdGVWZWN0b3IoMCwgMjAwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtcy5wdXNoKG5ldyBQYXJ0aWNsZVN5c3RlbShIb2xkUGFydGljbGVzLnBhcnRpY2xlc0xpZmV0aW1lSW5TZWNvbmRzLCBncmF2aXR5KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzLnB1c2goSG9sZFBhcnRpY2xlcy5kb250RHJhd0ZsYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFydGljbGVzVG9UcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1t0cmFja051bWJlcl0uZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkUGFydGljbGVzVG9UcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdICE9PSBIb2xkUGFydGljbGVzLmRvbnREcmF3RmxhZykge1xyXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gKyBIb2xkUGFydGljbGVzLnBhcnRpY2xlUGVyaW9kSW5TZWNvbmRzIDwgY3VycmVudFRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdUaW1lc3RhbXAgPSB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSArIEhvbGRQYXJ0aWNsZXMucGFydGljbGVQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjZXB0b3JUaW1lUG9zaXRpb24gPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsUG9zaXRpb24gPSB0aGlzLmdldEluaXRpYWxQb3NpdGlvbihwLCB0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHJlY2VwdG9yVGltZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsVmVsb2NpdHkgPSBwLmNyZWF0ZVZlY3RvcigwLCAtNTAwICogdGhpcy5ncmF2aXR5RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW3RyYWNrTnVtYmVyXS5hZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbiwgaW5pdGlhbFZlbG9jaXR5LCBuZXdUaW1lc3RhbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgMSwgcC5jb2xvcigwLCAyNTUsIDAsIDE1MCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gPSBuZXdUaW1lc3RhbXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbml0aWFsUG9zaXRpb24ocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJZKGNlbnRlclRpbWVJblNlY29uZHMsIGNlbnRlclRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVZlY3RvcihjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gPSBIb2xkUGFydGljbGVzLmRvbnREcmF3RmxhZztcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge09ubGluZVBsYXlsaXN0fSBmcm9tIFwiLi9vbmxpbmVfcGxheWxpc3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWw6IGFueSA9IHt9O1xyXG5nbG9iYWwucDVTY2VuZSA9IG5ldyBQNVNjZW5lKCk7XHJcbmdsb2JhbC5jb25maWcgPSBDb25maWcubG9hZCgpO1xyXG5nbG9iYWwuZ2xvYmFsQ2xhc3MgPSBcImdhbWVcIjtcclxuZ2xvYmFsLm9ubGluZVBsYXlsaXN0ID0gbmV3IE9ubGluZVBsYXlsaXN0KCk7IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2V0S2V5U3RyaW5nLCBzZXRDb25maWdLZXlCaW5kaW5nfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmdzVWl9IGZyb20gXCIuL2tleV9iaW5kaW5nc191aVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXlCaW5kaW5nIHtcclxuICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICBrZXlDb2RlOiBudW1iZXIsXHJcbiAgICBzdHJpbmc6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5QmluZGluZ0hlbHBlciB7XHJcbiAgICBwcml2YXRlIGJpbmRpbmdzVG9BY3F1aXJlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRCaW5kaW5nTnVtYmVyOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmluZGluZ3NUb0FjcXVpcmU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3NUb0FjcXVpcmUgPSBiaW5kaW5nc1RvQWNxdWlyZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYmluZE5leHQocDogcDUsIGtleUJpbmRpbmdzUXVpY2tzdGFydElkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQga2V5YmluZGluZzogS2V5QmluZGluZyA9IHtcclxuICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIsXHJcbiAgICAgICAgICAgIGtleUNvZGU6IHAua2V5Q29kZSxcclxuICAgICAgICAgICAgc3RyaW5nOiBnZXRLZXlTdHJpbmcocClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldENvbmZpZ0tleUJpbmRpbmcodGhpcy5jdXJyZW50QmluZGluZ051bWJlciwgdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSwga2V5YmluZGluZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmluZGluZ051bWJlcisrO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QmluZGluZ051bWJlciA+PSB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoLTEpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCkuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgS2V5QmluZGluZ3NVaS5ub0xvbmdlcldhaXRpbmdGb3JMYXN0S2V5KHApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEtleUJpbmRpbmdzVWkuc2Nyb2xsS2V5QmluZGluZ0ludG9WaWV3KHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIpO1xyXG4gICAgICAgICAgICBLZXlCaW5kaW5nc1VpLmluZGljYXRlV2FpdGluZ0ZvcktleShwLCB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ0hlbHBlcn0gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBmaW5kQmluZGluZ0luZm9Gb3JUcmFjaywgZ2VuZXJhdGVQcmV2aWV3Tm90ZXMsIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSwgZ2V0SW50LFxyXG4gICAgZ2V0S2V5U3RyaW5nLFxyXG4gICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzLFxyXG4gICAgaXNLZXlCaW5kaW5nc0RlZmluZWQsXHJcbiAgICBzZXRDb25maWdLZXlCaW5kaW5nXHJcbn0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge2NyZWF0ZUxhYmVsLCBjcmVhdGVMYWJlbGVkSW5wdXQsIGNyZWF0ZVVzZXJJbnB1dCwgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0c30gZnJvbSBcIi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQge1ByZXZpZXdEaXNwbGF5fSBmcm9tIFwiLi9wcmV2aWV3X2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtPcHRpb25zfSBmcm9tIFwiLi9wYWdlcy9vcHRpb25zXCI7XHJcbmltcG9ydCB7VGlja2VyLCBUaWNrZXJTdGF0ZX0gZnJvbSBcIi4vdGlja2VyXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgS2V5QmluZGluZ3NVaSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBTRVRfQlVUVE9OX0lOQUNUSVZFX1RFWFQ6IHN0cmluZyA9IFwiU2V0XCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBTRVRfQlVUVE9OX0FDVElWRV9URVhUOiBzdHJpbmcgPSBcIlByZXNzIEFueSBLZXlcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfTlVNX1RSQUNLUzogbnVtYmVyID0gNDtcclxuICAgIHByaXZhdGUgc3RhdGljIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVzZXROdW1UcmFja3MoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBLZXlCaW5kaW5nc1VpLkRFRkFVTFRfTlVNX1RSQUNLUztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXJlbnRFbGVtZW50OiBwNS5FbGVtZW50LCBwYWdlU3R5bGVDbGFzczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzU2VjdGlvbkhlYWRlciA9IHRoaXMuY3JlYXRlS2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyKCk7XHJcbiAgICAgICAgaWYgKCFrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNoaWxkKGtleUJpbmRpbmdzU2VjdGlvbkhlYWRlci5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm51bVRyYWNrcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5udW1UcmFja3MgPSB0aGlzLkRFRkFVTFRfTlVNX1RSQUNLUztcclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCAoKSA9PiBjcmVhdGVMYWJlbGVkSW5wdXQoXCJOdW1iZXIgb2YgVHJhY2tzXCIsIFwicHJldmlld051bVRyYWNrc0lucHV0XCIsXHJcbiAgICAgICAgICAgIHRoaXMubnVtVHJhY2tzLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyksXHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZE51bWJlck9mVHJhY2tzLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd051bWJlck9mVHJhY2tzSW5mby5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dOdW1iZXJPZlRyYWNrc0Vycm9yLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBLZXlCaW5kaW5nc1VpLnJlbW92ZU9sZEJpbmRpbmdCdXR0b25zKHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubnVtVHJhY2tzID0gZ2V0SW50KGlucHV0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVnZW5lcmF0ZVByZXZpZXcoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFyZW50RWxlbWVudCk7XHJcblxyXG4gICAgICAgIGxldCBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIktleS1CaW5kaW5ncyBRdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgIH0sIFwia2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uXCIpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgbGV0IGtleUJpbmRpbmdzUXVpY2tzdGFydElkID0gXCJrZXliaW5kaW5ncy1xdWlja3N0YXJ0XCI7XHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKHBhZ2VTdHlsZUNsYXNzKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJrZXliaW5kaW5ncy1xdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5pZChrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCk7XHJcblxyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleWJpbmRpbmdIZWxwZXIgPSBuZXcgS2V5QmluZGluZ0hlbHBlcih0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEtleUJpbmRpbmdJbnRvVmlldygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdGVXYWl0aW5nRm9yS2V5KHAsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJpbmQgdGhpcyBhY3Rpb24gdG8gdGhlIFwiLTFcIiBrZXkgc28gdGhhdCBpdCBoYXBwZW5zIG9uIGFueSBrZXkgcHJlc3NcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oLTEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhpcyBjb2RlIGJlY2F1c2UgaXQncyB1c2VkIHRvIGluZGljYXRlIGlucHV0IHRoYXQncyBub3QgeWV0IGZpbmlzaGVkIHByb2Nlc3NpbmdcclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5rZXlDb2RlICE9PSAyMjkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5YmluZGluZ0hlbHBlci5iaW5kTmV4dChwLCBrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGlsZChrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzS2V5QmluZGluZ3NEZWZpbmVkKHRoaXMubnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplS2V5QmluZGluZ3ModGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5udW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleUJpbmRpbmdJbnB1dCA9IHRoaXMuY3JlYXRlS2V5QmluZGluZ0lucHV0KHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgcGFnZVN0eWxlQ2xhc3MpO1xyXG4gICAgICAgICAgICBpZiAoIWtleUJpbmRpbmdJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNoaWxkKGtleUJpbmRpbmdJbnB1dC5lbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVLZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIoKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuaHRtbChcclxuICAgICAgICAgICAgICAgICdLZXkgQmluZGluZ3MgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTJweFwiPih0cmFjayAxIGlzIHRoZSBsZWZ0bW9zdCB0cmFjayk8L3NwYW4+J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoXCJvcHRpb25zLWZyZWUtdGV4dFwiKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH0sIFwia2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWROdW1iZXJPZlRyYWNrcyh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG51bWJlclZhbHVlOiBudW1iZXIgPSBnZXRJbnQodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKG51bWJlclZhbHVlKSAmJiBudW1iZXJWYWx1ZSA+IDAgJiYgbnVtYmVyVmFsdWUgPD0gMjY7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93TnVtYmVyT2ZUcmFja3NJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiU2hvdyBvcHRpb25zIGZvciB0aGUgbnVtYmVyIG9mIG5vdGUgdHJhY2tzIHlvdSdsbCBiZSBwbGF5aW5nIHdpdGguXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dOdW1iZXJPZlRyYWNrc0Vycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiRXJyb3I6IG11c3QgYmUgYW4gaW50ZWdlciBudW1iZXIgYmV0d2VlbiAxIGFuZCAyNi5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuRVJST1IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUtleUJpbmRpbmdJbnB1dCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY3VzdG9tQ2xhc3M6IHN0cmluZylcclxuICAgICAgICA6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgbGV0IHNldEJ1dHRvbklkID0gdGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IGtleWJpbmRpbmdJbnB1dENsYXNzID0gXCJrZXliaW5kaW5nLWlucHV0XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgXCJcIik7XHJcbiAgICAgICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICAgICAgbGFiZWwuYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXRCdXR0b24gPSBwLmNyZWF0ZUJ1dHRvbihcIlNldFwiKTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24uaWQoc2V0QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24ubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdGVXYWl0aW5nRm9yS2V5KHAsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oLTEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhpcyBjb2RlIGJlY2F1c2UgaXQncyB1c2VkIHRvIGluZGljYXRlIGlucHV0IHRoYXQncyBub3QgeWV0IGZpbmlzaGVkIHByb2Nlc3NpbmdcclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5rZXlDb2RlICE9PSAyMjkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlnS2V5QmluZGluZyh0cmFja051bWJlciwgbnVtVHJhY2tzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RyYWNrTnVtYmVyOiB0cmFja051bWJlciwga2V5Q29kZTogcC5rZXlDb2RlLCBzdHJpbmc6IGdldEtleVN0cmluZyhwKX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vTG9uZ2VyV2FpdGluZ0ZvcktleShzZXRCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KC0xKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9LCB0aGlzLmdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcblxyXG4gICAgICAgIGxldCB0cmFja0JpbmRpbmdJbmZvID0gZmluZEJpbmRpbmdJbmZvRm9yVHJhY2sodHJhY2tOdW1iZXIsIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcykpO1xyXG4gICAgICAgIGxldCBrZXlTdHJpbmcgPSB0cmFja0JpbmRpbmdJbmZvLnN0cmluZztcclxuICAgICAgICBsZXQgbGFiZWxTdHJpbmcgPSAnVHJhY2sgJyArICh0cmFja051bWJlciArIDEpICsgJzogPHNwYW4gY2xhc3M9XCInICtcclxuICAgICAgICAgICAga2V5YmluZGluZ0lucHV0Q2xhc3MgKyBcIiBcIiArIGN1c3RvbUNsYXNzICsgXCIgXCIgKyBnbG9iYWwuZ2xvYmFsQ2xhc3MgK1xyXG4gICAgICAgICAgICAnXCI+JyArIGtleVN0cmluZyArICc8L3NwYW4+JztcclxuICAgICAgICBsZXQgbGFiZWxFbGVtZW50ID0gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGNvbnRhaW5lci5lbGVtZW50LCBcIkxBQkVMXCIpO1xyXG4gICAgICAgIGxhYmVsRWxlbWVudC5odG1sKGxhYmVsU3RyaW5nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZGljYXRlV2FpdGluZ0ZvcktleShwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZXRCdXR0b25zOiBwNS5FbGVtZW50W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgc2V0QnV0dG9ucy5wdXNoKHRoaXMuZ2V0U2V0QnV0dG9uKHAsIGksIHRoaXMubnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNldEJ1dHRvbjogcDUuRWxlbWVudCA9IHNldEJ1dHRvbnNbaV07XHJcbiAgICAgICAgICAgIGlmIChpID09PSB0cmFja051bWJlcikge1xyXG4gICAgICAgICAgICAgICAgc2V0QnV0dG9uLmh0bWwodGhpcy5TRVRfQlVUVE9OX0FDVElWRV9URVhUKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldEJ1dHRvbi5odG1sKHRoaXMuU0VUX0JVVFRPTl9JTkFDVElWRV9URVhUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRTZXRCdXR0b24ocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKTogcDUuRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHNldEJ1dHRvbklkID0gdGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgcmV0dXJuIHAuc2VsZWN0KFwiI1wiICsgc2V0QnV0dG9uSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG5vTG9uZ2VyV2FpdGluZ0ZvcktleShzZXRCdXR0b246IHA1LkVsZW1lbnQpIHtcclxuICAgICAgICBzZXRCdXR0b24uaHRtbCh0aGlzLlNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBub0xvbmdlcldhaXRpbmdGb3JMYXN0S2V5KHA6IHA1KSB7XHJcbiAgICAgICAgbGV0IHNldEJ1dHRvbjogcDUuRWxlbWVudCA9IHRoaXMuZ2V0U2V0QnV0dG9uKHAsIHRoaXMubnVtVHJhY2tzIC0gMSwgdGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5odG1sKHRoaXMuU0VUX0JVVFRPTl9JTkFDVElWRV9URVhUKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykgKyBcIkJ1dHRvblwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEtleUJpbmRpbmdVbmlxdWVJZCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBcInRyYWNrXCIgKyB0cmFja051bWJlciArIFwiT2ZcIiArIG51bVRyYWNrcyArIFwiQmluZGluZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2Nyb2xsS2V5QmluZGluZ0ludG9WaWV3KHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQga2V5QmluZGluZ0J1dHRvbklkID0gdGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXlCaW5kaW5nQnV0dG9uSWQpLnBhcmVudEVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZU9sZEJpbmRpbmdCdXR0b25zKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IG51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWdlbmVyYXRlUHJldmlldygpIHtcclxuICAgICAgICBnbG9iYWwucHJldmlld0Rpc3BsYXkgPSBuZXcgUHJldmlld0Rpc3BsYXkoZ2VuZXJhdGVQcmV2aWV3Tm90ZXModGhpcy5udW1UcmFja3MpLCBnbG9iYWwuY29uZmlnLCBnbG9iYWwucDVTY2VuZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEV2ZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGFjdGlvbkJpbmRpbmdzOiBNYXA8bnVtYmVyLCB7a2V5RG93bkFjdGlvbjogKCkgPT4gdm9pZCwga2V5VXBBY3Rpb246ICgpID0+IHZvaWR9PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwOiBwNSkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uQmluZGluZ3MgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgICAgIHAua2V5UHJlc3NlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyAtMSBpcyBhIHNwZWNpYWwga2V5Q29kZSBmbGFnIHRoYXQgbWVhbnMgXCJhbnlcIi4gVGhpcyBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBmb3Igc2V0dGluZyB1cCBrZXkgYmluZGluZ3MuXHJcbiAgICAgICAgICAgIGxldCBnbG9iYWxBY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQoLTEpO1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFsQWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsQWN0aW9ucy5rZXlEb3duQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxBY3Rpb25zLmtleURvd25BY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBFcXVpdmFsZW50IHRvIGV2ZW50LnByZXZlbnREZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbnMgPSB0aGlzLmFjdGlvbkJpbmRpbmdzLmdldChwLmtleUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLmtleURvd25BY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmtleURvd25BY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICBwLmtleVJlbGVhc2VkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQocC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMua2V5VXBBY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMua2V5VXBBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBFcXVpdmFsZW50IHRvIGV2ZW50LnByZXZlbnREZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRLZXlUb0FjdGlvbihrZXlDb2RlOiBudW1iZXIsIGtleURvd25BY3Rpb246ICgpID0+IHZvaWQsIGtleVVwQWN0aW9uOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25CaW5kaW5ncy5zZXQoa2V5Q29kZSwge2tleURvd25BY3Rpb246IGtleURvd25BY3Rpb24sIGtleVVwQWN0aW9uOiBrZXlVcEFjdGlvbn0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEtleShrZXlDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25CaW5kaW5ncy5kZWxldGUoa2V5Q29kZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dldE1pc3NCb3VuZGFyeX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lFdmVudCwgQWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pc3NNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgbGFzdENoZWNrZWROb3RlSW5kaWNlczogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXIsIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzLnB1c2goMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gaG9sZE1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50ID0gaGFuZGxlQWNjdXJhY3lFdmVudDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47IC8vIEEgbG93ZXJCb3VuZCBmb3IgbWlzc2VzIGlzIGluY29tcGF0aWJsZSB3aXRoIHRoaXMgd2F5IG9mIGRvaW5nIG1pc3Nlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBudW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBbGxNaXNzZWROb3Rlc0ZvclRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQWxsTWlzc2VkTm90ZXNGb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUgPSB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXNbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCB0cmFjazogTm90ZVtdID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleE9mTGFzdENoZWNrZWROb3RlID49IHRyYWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb3RlID0gdHJhY2tbaW5kZXhPZkxhc3RDaGVja2VkTm90ZV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTm90TWlzc2FibGUoY3VycmVudE5vdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleE9mTGFzdENoZWNrZWROb3RlKys7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05vdGVNaXNzZWRBbmROb3RIYW5kbGVkKGN1cnJlbnROb3RlLCBjdXJyZW50VGltZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTWlzc2VkTm90ZSh0cmFja051bWJlciwgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzW3RyYWNrTnVtYmVyXSA9IGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRm9yIGV4YW1wbGU6IG5vdGVzIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gaGl0IGFyZSBub3QgbWlzc2FibGVcclxuICAgIHByaXZhdGUgaXNOb3RNaXNzYWJsZShub3RlOiBOb3RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vdGUuc3RhdGUgIT09IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNOb3RlTWlzc2VkQW5kTm90SGFuZGxlZChub3RlOiBOb3RlLCBjdXJyZW50VGltZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG1pc3NCb3VuZGFyeSA9IGdldE1pc3NCb3VuZGFyeShjdXJyZW50VGltZSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBub3RlLnRpbWVJblNlY29uZHMgPCBtaXNzQm91bmRhcnkgJiYgbm90ZS5zdGF0ZSA9PT0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVNaXNzZWROb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIGluZGV4T2ZNaXNzZWROb3RlOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgbGV0IG1pc3NlZE5vdGUgPSB0cmFja1tpbmRleE9mTWlzc2VkTm90ZV07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLm5hbWUsXHJcbiAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IC1JbmZpbml0eSxcclxuICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgIG5vdGVUeXBlOiBtaXNzZWROb3RlLnR5cGVcclxuICAgICAgICB9KTtcclxuICAgICAgICBtaXNzZWROb3RlLnN0YXRlID0gTm90ZVN0YXRlLk1JU1NFRDtcclxuICAgICAgICBpZiAobWlzc2VkTm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRNYW5hZ2VyLmlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci51bmhvbGRUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpIC8vIEZvcmNlIGEgaG9sZCByZWxlYXNlIHVwb24gbWlzc2luZyB0aGUgdGFpbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChtaXNzZWROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dE5vdGUgPSB0cmFja1tpbmRleE9mTWlzc2VkTm90ZSArIDFdO1xyXG4gICAgICAgICAgICBpZiAobmV4dE5vdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0Tm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5NSVNTRUQ7IC8vIE1pc3MgdGhlIHRhaWwgd2hlbiB5b3UgbWlzcyB0aGUgaGVhZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGVNYW5hZ2VyIHtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgICAgIHRoaXMudHJhY2tzID0gdHJhY2tzO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlVW5zdXBwb3J0ZWROb3RlVHlwZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVVuc3VwcG9ydGVkTm90ZVR5cGVzKCkge1xyXG4gICAgICAgIGxldCBzdXBwb3J0ZWROb3RlVHlwZXM6IE5vdGVUeXBlW10gPSBbTm90ZVR5cGUuVEFJTCwgTm90ZVR5cGUuSE9MRF9IRUFELCBOb3RlVHlwZS5OT1JNQUxdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy50cmFja3MubGVuZ3RoOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFjazogTm90ZVtdID0gdGhpcy50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub3RlTnVtYmVyID0gMDsgbm90ZU51bWJlciA8IHRyYWNrLmxlbmd0aDsgbm90ZU51bWJlcisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90ZTogTm90ZSA9IHRyYWNrW25vdGVOdW1iZXJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdXBwb3J0ZWROb3RlVHlwZXMuaW5jbHVkZXMobm90ZS50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrLnNwbGljZShub3RlTnVtYmVyLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBub3RlTnVtYmVyLS07IC8vIGRlY3JlbWVudCBub3RlIG51bWJlciBzbyBuZXh0IGl0ZXJhdGlvbiBpdCBzdGFydHMgYXQgdGhlIHJpZ2h0IG5vdGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXROb3Rlc0J5VGltZVJhbmdlKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcik6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0ge1xyXG4gICAgICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgZmlyc3RGaW5kUmVzdWx0ID0gdGhpcy5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShsZWFzdFRpbWUsIHRyYWNrKTtcclxuICAgICAgICBpZiAoZmlyc3RGaW5kUmVzdWx0IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IC0xLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogLTF9OyAvLyBubyBub3RlcyBsZWZ0IGFmdGVyIGxlYXN0IHRpbWVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxhc3RGaW5kUmVzdWx0ID0gdGhpcy5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShncmVhdGVzdFRpbWUsIHRyYWNrLCBmaXJzdEZpbmRSZXN1bHQpO1xyXG4gICAgICAgIGlmIChsYXN0RmluZFJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgbGFzdEZpbmRSZXN1bHQgPSB0cmFjay5sZW5ndGg7IC8vIGdyZWF0ZXN0VGltZSBleGNlZWRzIHRoZSBlbmQgb2YgdGhlIG5vdGVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaXJzdEZpbmRSZXN1bHQgPT09IDApIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGaW5kUmVzdWx0ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IC0xLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogLTF9OyAvLyBoYXZlbid0IHNlZW4gZmlyc3Qgbm90ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAwLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbGFzdEZpbmRSZXN1bHR9OyAvLyBub3RlcyBhcmUganVzdCBzdGFydGluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogZmlyc3RGaW5kUmVzdWx0LCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbGFzdEZpbmRSZXN1bHR9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IG5vIHR3byBub3RlcyB3aWxsIGhhdmUgdGhlIHNhbWUgdGltZSBpbiB0aGUgc2FtZSB0cmFja1xyXG4gICAgZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoa2V5VGltZTogbnVtYmVyLCB0cmFjazogTm90ZVtdLCBzZWFyY2hTdGFydCA9IDApIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gc2VhcmNoU3RhcnQ7IGkgPCB0cmFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHJhY2tbaV0udGltZUluU2Vjb25kcyA+IGtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFYXJsaWVzdE5vdGUoKTogTm90ZSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0Tm90ZTogTm90ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrc1tpXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tFYXJsaWVzdE5vdGU6IE5vdGUgPSB0aGlzLnRyYWNrc1tpXVswXTtcclxuICAgICAgICAgICAgICAgIGlmIChlYXJsaWVzdE5vdGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFybGllc3ROb3RlID0gdHJhY2tFYXJsaWVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVhcmxpZXN0Tm90ZS50aW1lSW5TZWNvbmRzID4gdHJhY2tFYXJsaWVzdE5vdGUudGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhcmxpZXN0Tm90ZSA9IHRyYWNrRWFybGllc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlYXJsaWVzdE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGF0ZXN0Tm90ZSgpOiBOb3RlIHtcclxuICAgICAgICBsZXQgbGF0ZXN0Tm90ZTogTm90ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrc1tpXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tMYXRlc3ROb3RlOiBOb3RlID0gdGhpcy50cmFja3NbaV1bdGhpcy50cmFja3NbaV0ubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobGF0ZXN0Tm90ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RlID0gdHJhY2tMYXRlc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXRlc3ROb3RlLnRpbWVJblNlY29uZHMgPCB0cmFja0xhdGVzdE5vdGUudGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGUgPSB0cmFja0xhdGVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhdGVzdE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWxOb3RlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3MucmVkdWNlKChzdW0sIHRyYWNrKSA9PiBzdW0gKyB0cmFjay5sZW5ndGgsIDApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90ZVNraW4ge1xyXG4gICAgcHVibGljIG5vdGU6IHA1LkltYWdlO1xyXG4gICAgcHVibGljIGNvbm5lY3RvclRpbGU6IHA1LkltYWdlO1xyXG4gICAgcHVibGljIHJlY2VwdG9yOiBwNS5JbWFnZTtcclxuXHJcbiAgICAvKiBSZXF1aXJlcyB0aGF0IHRoZSB0YWlsIGJlIGhhbGYgdGhlIGhlaWdodCBhbmQgc2FtZSB3aWR0aCBhcyBub3RlIGltYWdlICovXHJcbiAgICBwdWJsaWMgdGFpbDogcDUuSW1hZ2U7XHJcblxyXG4gICAgcHJpdmF0ZSByb3RhdGlvbkFuZ2xlczogTWFwPG51bWJlciwgbnVtYmVyW10+ID0gbmV3IE1hcChbXHJcbiAgICAgICAgWzQsIFsyNzAsIDE4MCwgMCwgOTBdXSxcclxuICAgICAgICBbNiwgWzI3MCwgMzE1LCAxODAsIDAsIDQ1LCA5MF1dXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlOiBwNS5JbWFnZSwgY29ubmVjdG9yOiBwNS5JbWFnZSwgdGFpbDogcDUuSW1hZ2UsIHJlY2VwdG9yOiBwNS5JbWFnZSkge1xyXG4gICAgICAgIHRoaXMubm90ZSA9IG5vdGU7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JUaWxlID0gY29ubmVjdG9yO1xyXG4gICAgICAgIHRoaXMudGFpbCA9IHRhaWw7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvciA9IHJlY2VwdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiBhYmxlIHRvIGRyYXcgbm90ZSB0eXBlLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxyXG4gICAgcHVibGljIGRyYXdOb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVR5cGU6IE5vdGVUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKG5vdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLkhPTERfSEVBRDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ltYWdlUm90YXRlZCh0aGlzLm5vdGUsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclksIG5vdGVTaXplKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlRBSUw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUYWlsKHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiBhYmxlIHRvIGRyYXcgbm90ZSB0eXBlLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxyXG4gICAgcHVibGljIGRyYXdSZWNlcHRvcih0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmRyYXdJbWFnZVJvdGF0ZWQodGhpcy5yZWNlcHRvciwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY2VudGVyWCwgY2VudGVyWSwgbm90ZVNpemUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiBhYmxlIHRvIGRyYXcgbm90ZSB0eXBlLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxyXG4gICAgcHJpdmF0ZSBkcmF3SG9sZENvbm5lY3RvcihjZW50ZXJYOiBudW1iZXIsIGRyYXdTdGFydFk6IG51bWJlciwgZHJhd0VuZFk6IG51bWJlciwgbm90ZVN0YXJ0WTogbnVtYmVyLCBub3RlRW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBsZXQgc291cmNlV2lkdGggPSB0aGlzLmNvbm5lY3RvclRpbGUud2lkdGg7XHJcbiAgICAgICAgbGV0IHNvdXJjZUhlaWdodCA9IHRoaXMuY29ubmVjdG9yVGlsZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHNjYWxlZFdpZHRoID0gbm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHNjYWxlZEhlaWdodCA9IHNjYWxlZFdpZHRoIC8gc291cmNlV2lkdGggKiBzb3VyY2VIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGNvbm5lY3RvckhlaWdodCA9IE1hdGguYWJzKGRyYXdFbmRZIC0gZHJhd1N0YXJ0WSk7XHJcbiAgICAgICAgbGV0IGVuZFlPZmZzZXQgPSB0aGlzLmdldE5vdGVFbmRPZmZzZXQobm90ZUVuZFksIGRyYXdFbmRZKTtcclxuXHJcbiAgICAgICAgbGV0IGVuZFBhcnRpYWxUaWxlSGVpZ2h0ID0gc2NhbGVkSGVpZ2h0IC0gKGVuZFlPZmZzZXQgJSBzY2FsZWRIZWlnaHQpO1xyXG4gICAgICAgIGVuZFBhcnRpYWxUaWxlSGVpZ2h0ID0gTWF0aC5taW4oZW5kUGFydGlhbFRpbGVIZWlnaHQsIGNvbm5lY3RvckhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0ID0gKGNvbm5lY3RvckhlaWdodCAtIGVuZFBhcnRpYWxUaWxlSGVpZ2h0KSAlIHNjYWxlZEhlaWdodDtcclxuICAgICAgICBsZXQgbnVtQ29tcGxldGVUaWxlcyA9IE1hdGgucm91bmQoXHJcbiAgICAgICAgICAgIChjb25uZWN0b3JIZWlnaHQgLSBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0IC0gZW5kUGFydGlhbFRpbGVIZWlnaHQpIC8gc2NhbGVkSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBibG9jayBhbGxvd3MgdXMgdG8gdXNlIHRoZSBzYW1lIGRyYXdpbmcgbWV0aG9kIGZvciBib3RoIHVwc2Nyb2xsIGFuZCBkb3duc2Nyb2xsXHJcbiAgICAgICAgbGV0IGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRvcFBhcnRpYWxUaWxlSGVpZ2h0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQgPSBlbmRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICAgICAgdG9wUGFydGlhbFRpbGVIZWlnaHQgPSBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0ID0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICAgICAgdG9wUGFydGlhbFRpbGVIZWlnaHQgPSBlbmRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRyYXdNaW5ZID0gTWF0aC5taW4oZHJhd1N0YXJ0WSwgZHJhd0VuZFkpO1xyXG4gICAgICAgIGxldCBkcmF3TWF4WSA9IE1hdGgubWF4KGRyYXdTdGFydFksIGRyYXdFbmRZKTtcclxuICAgICAgICBsZXQgaXNSZXZlcnNlZCA9IGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXA7XHJcbiAgICAgICAgbGV0IGlzRHJhd25Gcm9tQm90dG9tID0gZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcDtcclxuICAgICAgICBpZiAoZW5kUGFydGlhbFRpbGVIZWlnaHQgPT09IGNvbm5lY3RvckhlaWdodCkge1xyXG4gICAgICAgICAgICBpc0RyYXduRnJvbUJvdHRvbSA9ICFpc0RyYXduRnJvbUJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd1BhcnRpYWxUaWxlKGNlbnRlclgsIGRyYXdNaW5ZLCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LFxyXG4gICAgICAgICAgICB0b3BQYXJ0aWFsVGlsZUhlaWdodCAvIHNjYWxlZEhlaWdodCwgIWlzRHJhd25Gcm9tQm90dG9tLCBpc1JldmVyc2VkLCBwKTtcclxuICAgICAgICB0aGlzLmRyYXdDb21wbGV0ZVRpbGVzKGNlbnRlclgsIGRyYXdNaW5ZICsgdG9wUGFydGlhbFRpbGVIZWlnaHQsIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQsXHJcbiAgICAgICAgICAgIG51bUNvbXBsZXRlVGlsZXMsIGlzUmV2ZXJzZWQsIHApO1xyXG4gICAgICAgIHRoaXMuZHJhd1BhcnRpYWxUaWxlKGNlbnRlclgsIGRyYXdNYXhZIC0gYm90dG9tUGFydGlhbFRpbGVIZWlnaHQsIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQsXHJcbiAgICAgICAgICAgIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0IC8gc2NhbGVkSGVpZ2h0LCBpc0RyYXduRnJvbUJvdHRvbSxcclxuICAgICAgICAgICAgaXNSZXZlcnNlZCwgcCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3VGFpbCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgcC5yb3RhdGUoMTgwKTtcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLnRhaWwsIC1ub3RlU2l6ZSAvIDIsIC1ub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSAvIDIpO1xyXG4gICAgICAgICAgICBwLnBvcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy50YWlsLCBjZW50ZXJYIC0gbm90ZVNpemUgLyAyLCBjZW50ZXJZIC0gbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3RlRW5kT2Zmc2V0KG5vdGVFbmRZOiBudW1iZXIsIGRyYXdFbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gbm90ZUVuZFkgLSBkcmF3RW5kWTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBkcmF3RW5kWSAtIG5vdGVFbmRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBwcmV2ZW50cyB0aGUgcGFydGlhbCB0aWxlIHRleHR1cmUgZnJvbSBzdHJldGNoaW5nIHdoZW4gdGhlIHBsYXllciBoaXRzIGEgaG9sZCBlYXJseVxyXG4gICAgICAgIG9mZnNldCA9IE1hdGgubWF4KDAsIG9mZnNldCk7XHJcblxyXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Q29tcGxldGVUaWxlcyhjZW50ZXJYOiBudW1iZXIsIGxlYXN0WTogbnVtYmVyLCBzY2FsZWRXaWR0aDogbnVtYmVyLCBzY2FsZWRIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVGlsZXM6IG51bWJlciwgaXNSZXZlcnNlZDogYm9vbGVhbiwgcDogcDUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRpbGVzOyBpKyspIHtcclxuICAgICAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0gbGVhc3RZICsgaSAqIHNjYWxlZEhlaWdodCArIHNjYWxlZEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICBpZiAoaXNSZXZlcnNlZCkge1xyXG4gICAgICAgICAgICAgICAgcC5yb3RhdGUoMTgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMuY29ubmVjdG9yVGlsZSwgLXNjYWxlZFdpZHRoIC8gMiwgLXNjYWxlZEhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQpO1xyXG4gICAgICAgICAgICBwLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYOiBudW1iZXIsIHRvcExlZnRZOiBudW1iZXIsIHNjYWxlZFdpZHRoOiBudW1iZXIsIHNjYWxlZEhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlV2lkdGg6IG51bWJlciwgc291cmNlSGVpZ2h0OiBudW1iZXIsIGhlaWdodFBlcmNlbnQ6IG51bWJlciwgaXNEcmF3bkZyb21Cb3R0b206IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUmV2ZXJzZWQ6IGJvb2xlYW4sIHA6IHA1KSB7XHJcbiAgICAgICAgaWYgKGhlaWdodFBlcmNlbnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBsZXQgZGVzdGluYXRpb25IZWlnaHQgPSBoZWlnaHRQZXJjZW50ICogc2NhbGVkSGVpZ2h0O1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gdG9wTGVmdFkgKyBkZXN0aW5hdGlvbkhlaWdodCAvIDI7XHJcbiAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgaWYgKGlzUmV2ZXJzZWQpIHtcclxuICAgICAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICAgICAgcC5yb3RhdGUoMTgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRHJhd25Gcm9tQm90dG9tKSB7IC8vIERyYXcgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBpbWFnZVxyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMuY29ubmVjdG9yVGlsZSwgLXNjYWxlZFdpZHRoIC8gMiwgLWRlc3RpbmF0aW9uSGVpZ2h0IC8gMiwgc2NhbGVkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkhlaWdodCwgMCwgc291cmNlSGVpZ2h0IC0gaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCxcclxuICAgICAgICAgICAgICAgIHNvdXJjZVdpZHRoLCBoZWlnaHRQZXJjZW50ICogc291cmNlSGVpZ2h0KTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBEcmF3IGZyb20gdGhlIHRvcCBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1kZXN0aW5hdGlvbkhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25IZWlnaHQsIDAsIDAsIHNvdXJjZVdpZHRoLCBoZWlnaHRQZXJjZW50ICogc291cmNlSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdJbWFnZVJvdGF0ZWQoaW1hZ2U6IHA1LkltYWdlLCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgdGhpcy5yb3RhdGUocCwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgcC5pbWFnZShpbWFnZSwgLW5vdGVTaXplIC8gMiwgLW5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcm90YXRlKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQW5nbGVzLmhhcyhudW1UcmFja3MpKSB7XHJcbiAgICAgICAgICAgIHAucm90YXRlKHRoaXMucm90YXRpb25BbmdsZXMuZ2V0KG51bVRyYWNrcylbdHJhY2tOdW1iZXJdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSh0aGlzLmdldERlZmF1bHRSb3RhdGlvbkFuZ2xlSW5EZWdyZWVzKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0Um90YXRpb25BbmdsZUluRGVncmVlcyh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByb3RhdGlvbiA9IC05MDtcclxuICAgICAgICBsZXQgcm90YXRpb25QZXJUcmFjayA9IDM2MCAvIG51bVRyYWNrcztcclxuICAgICAgICBpZiAodHJhY2tOdW1iZXIgPCBudW1UcmFja3MgLyAyKSB7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uIC09IHRyYWNrTnVtYmVyICogcm90YXRpb25QZXJUcmFjaztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByb3RhdGlvbiArPSAodHJhY2tOdW1iZXIgLSBudW1UcmFja3MgLyAyICsgMSkgKiByb3RhdGlvblBlclRyYWNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm90YXRpb247XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1N0ZXBmaWxlLCBTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZSwgQXVkaW9GaWxlU3RhdGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQbGF5bGlzdENsaWVudH0gZnJvbSBcIi4vcGxheWxpc3RfY2xpZW50L3BsYXlsaXN0X2NsaWVudFwiO1xyXG5pbXBvcnQge1Nvbmd9IGZyb20gXCIuL3BsYXlsaXN0X2NsaWVudC9zb25nXCI7XHJcbmltcG9ydCB7U3dmUGFyc2VSZXNwb25zZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zd2ZcIjtcclxuXHJcbmV4cG9ydCBlbnVtIE9ubGluZVBsYXlsaXN0U3RhdGUge1xyXG4gICAgTk9fUExBWUxJU1QsXHJcbiAgICBMT0FESU5HX1BMQVlMSVNULFxyXG4gICAgUExBWUxJU1RfUkVBRFksXHJcbiAgICBQTEFZTElTVF9FUlJPUixcclxuICAgIExPQURJTkdfU09ORyxcclxuICAgIFNPTkdfRVJST1IsXHJcbn1cclxuXHJcbmNsYXNzIERpc3BsYXlhYmxlU29uZyB7XHJcbiAgICBwcml2YXRlIHNvbmc6IFNvbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc29uZzogU29uZykge1xyXG4gICAgICAgIHRoaXMuc29uZyA9IHNvbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29uZy5zb25nRGlmZmljdWx0eSArIFwiIFwiICsgdGhpcy5zb25nLnNvbmdOYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT25saW5lUGxheWxpc3Qge1xyXG4gICAgcHVibGljIGluZGV4VXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHBsYXlsaXN0Q2xpZW50OiBQbGF5bGlzdENsaWVudDtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfUEFHRV9TSVpFOiBudW1iZXIgPSA1MDtcclxuICAgIHB1YmxpYyBzdGF0ZTogT25saW5lUGxheWxpc3RTdGF0ZTtcclxuICAgIHB1YmxpYyBkaXNwbGF5ZWRQbGF5bGlzdDogRGlzcGxheWFibGVTb25nW107XHJcbiAgICBwcml2YXRlIHBhZ2VOdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcGFnZVNpemU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5OT19QTEFZTElTVDtcclxuICAgICAgICB0aGlzLmluZGV4VXJsID0gXCJcIjtcclxuICAgICAgICB0aGlzLnBsYXlsaXN0Q2xpZW50ID0gbmV3IFBsYXlsaXN0Q2xpZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtpY2tPZmZMb2FkUGxheWxpc3QoaW5kZXhVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfUExBWUxJU1Q7XHJcbiAgICAgICAgdGhpcy5wbGF5bGlzdENsaWVudC5pbml0aWFsaXplKGluZGV4VXJsKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmluaXRpYWxpemVEaXNwbGF5ZWRQbGF5bGlzdCgpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZURpc3BsYXllZFBsYXlsaXN0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5QTEFZTElTVF9SRUFEWVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBraWNrT2ZmTG9hZFNvbmcoZGlzcGxheWVkU29uZ0luZGV4OiBudW1iZXIsIHN0ZXBmaWxlOiBTdGVwZmlsZSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkc7XHJcbiAgICAgICAgYXVkaW9GaWxlLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgICAgICBzdGVwZmlsZS5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuTk9fU1RFUEZJTEU7XHJcbiAgICAgICAgdGhpcy5wbGF5bGlzdENsaWVudC5nZXRTd2YodGhpcy5nZXRTb25nSW5kZXgoZGlzcGxheWVkU29uZ0luZGV4KSlcclxuICAgICAgICAgICAgLnRoZW4oKHN3ZlBhcnNlUmVzcG9uc2UpID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTd2ZJbnRvU3RlcGZpbGVBbmRBdWRpb0ZpbGUoc3dmUGFyc2VSZXNwb25zZSwgc3RlcGZpbGUsIGF1ZGlvRmlsZSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5TT05HX0VSUk9SKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNvbmdJbmRleChkaXNwbGF5ZWRTb25nSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBkaXNwbGF5ZWRTb25nSW5kZXggKyB0aGlzLnBhZ2VTaXplICogdGhpcy5wYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFN3ZkludG9TdGVwZmlsZUFuZEF1ZGlvRmlsZShzd2ZQYXJzZVJlc3BvbnNlOiBTd2ZQYXJzZVJlc3BvbnNlLCBzdGVwZmlsZTogU3RlcGZpbGUsIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICAgICAgc3RlcGZpbGUubG9hZEZmckJlYXRtYXAoc3dmUGFyc2VSZXNwb25zZS5jaGFydERhdGEpO1xyXG4gICAgICAgIGF1ZGlvRmlsZS5sb2FkQmxvYihzd2ZQYXJzZVJlc3BvbnNlLmJsb2IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VOdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5leHRQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2VOdW1iZXIgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJldmlvdXNQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2VOdW1iZXIgLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFBhZ2UocGFnZU51bWJlcjogbnVtYmVyLCBwYWdlU2l6ZT86IG51bWJlcikge1xyXG4gICAgICAgIHBhZ2VTaXplID0gdGhpcy5nZXRWYWxpZFBhZ2VTaXplKHBhZ2VTaXplKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZFBhZ2VOdW1iZXIocGFnZU51bWJlciwgcGFnZVNpemUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtaW5JbmRleCA9IHBhZ2VOdW1iZXIgKiBwYWdlU2l6ZTtcclxuICAgICAgICBsZXQgbWF4SW5kZXggPSBtaW5JbmRleCArIHBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheWVkUGxheWxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbWluSW5kZXg7IGkgPCBtYXhJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDwgdGhpcy5wbGF5bGlzdENsaWVudC5nZXRQbGF5bGlzdCgpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRQbGF5bGlzdC5wdXNoKHRoaXMuZ2V0RGlzcGxheWFibGVTb25nKGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzVmFsaWRQYWdlTnVtYmVyKHBhZ2VOdW1iZXI6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiAwIDw9IHBhZ2VOdW1iZXIgJiYgcGFnZU51bWJlciA8PSB0aGlzLmdldE1heFBhZ2VOdW1iZXIocGFnZVNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheWFibGVTb25nKHNvbmdJbmRleDogbnVtYmVyKTogRGlzcGxheWFibGVTb25nIHtcclxuICAgICAgICByZXR1cm4gbmV3IERpc3BsYXlhYmxlU29uZyh0aGlzLnBsYXlsaXN0Q2xpZW50LmdldFBsYXlsaXN0KClbc29uZ0luZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZFBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocGFnZVNpemUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gT25saW5lUGxheWxpc3QuREVGQVVMVF9QQUdFX1NJWkU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlU2l6ZSA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlU2l6ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1heFBhZ2VOdW1iZXIocGFnZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMucGxheWxpc3RDbGllbnQuZ2V0UGxheWxpc3QoKS5sZW5ndGggLyBwYWdlU2l6ZSkgLSAxO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0tleWJvYXJkRXZlbnRNYW5hZ2VyfSBmcm9tIFwiLi9rZXlib2FyZF9ldmVudF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVQcmV2aWV3Tm90ZXN9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlU2tpbn0gZnJvbSBcIi4vbm90ZV9za2luXCI7XHJcblxyXG5sZXQgd2lkdGggPSA3MjA7XHJcbmxldCBoZWlnaHQgPSA0ODA7XHJcblxyXG5leHBvcnQgY2xhc3MgUDVTY2VuZSB7XHJcbiAgICBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IG5ldyBwNSgocDogcDUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlbmRlcmVyOiBwNS5SZW5kZXJlcjtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNlbnRlckNhbnZhcygpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcmVyLmNlbnRlcigpOyAvLyBEaXNhYmxlIHRoaXMgZm9yIG5vdyB0byBtYWtlIGVtYmVkZGluZyB3b3JrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5ub3RlU2tpbiA9IG5ldyBOb3RlU2tpbihcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19ibHVlX3YzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9jb25uZWN0b3JfdGlsZV9yZXNpemUucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3RhaWxfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19yZWNlcHRvci5wbmdcIilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCA9IHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3BsYXlfZnJvbV9maWxlX2JhY2tncm91bmQuanBnXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kID0gZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlciA9IHAuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlciA9IG5ldyBLZXlib2FyZEV2ZW50TWFuYWdlcihwKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyg0KSwgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTsgLy8gTWFrZXMgdGhlIGNhbnZhcyBiZSBhYmxlIHRvIGZpbGwgdGhlIHdob2xlIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHAuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLmRyYXcoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAud2luZG93UmVzaXplZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlckNhbnZhcygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGxheUZyb21GaWxlfSBmcm9tIFwiLi9wYWdlcy9wbGF5X2Zyb21fZmlsZVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuaW1wb3J0IHtQbGF5fSBmcm9tIFwiLi9wYWdlcy9wbGF5XCI7XHJcbmltcG9ydCB7UmVzdWx0c30gZnJvbSBcIi4vcGFnZXMvcmVzdWx0c1wiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7UGxheUZyb21PbmxpbmV9IGZyb20gXCIuL3BhZ2VzL3BsYXlfZnJvbV9vbmxpbmVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFBBR0VTIHtcclxuICAgIFBMQVlfRlJPTV9GSUxFLFxyXG4gICAgT1BUSU9OUyxcclxuICAgIFBMQVksXHJcbiAgICBSRVNVTFRTLFxyXG4gICAgUExBWV9GUk9NX09OTElORSxcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbnRQYWdlOiBQQUdFUyA9IFBBR0VTLlBMQVlfRlJPTV9GSUxFO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0dXJuUGFnZTogUEFHRVM7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRDdXJyZW50UGFnZShwYWdlOiBQQUdFUykge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlICE9PSBQQUdFUy5QTEFZKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuUGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xyXG4gICAgICAgIERPTVdyYXBwZXIuY2xlYXJSZWdpc3RyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmV0dXJuKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFBhZ2UodGhpcy5yZXR1cm5QYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWV9GUk9NX0ZJTEU6XHJcbiAgICAgICAgICAgICAgICBQbGF5RnJvbUZpbGUuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuT1BUSU9OUzpcclxuICAgICAgICAgICAgICAgIE9wdGlvbnMuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWTpcclxuICAgICAgICAgICAgICAgIFBsYXkuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUkVTVUxUUzpcclxuICAgICAgICAgICAgICAgIFJlc3VsdHMuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWV9GUk9NX09OTElORTpcclxuICAgICAgICAgICAgICAgIFBsYXlGcm9tT25saW5lLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBwYWdlOiBcIiArIGdsb2JhbC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge1xyXG4gICAgYm9vbGVhblRvWWVzTm8sXHJcbiAgICBjcmVhdGVMYWJlbGVkSW5wdXQsXHJcbiAgICBjcmVhdGVMYWJlbGVkU2VsZWN0LFxyXG4gICAgY3JlYXRlTGFiZWxlZFRleHRBcmVhLCBjcmVhdGVVc2VySW5wdXQsXHJcbiAgICBkcmF3SGVhZGluZyxcclxuICAgIHNldEVsZW1lbnRUb0JvdHRvbSxcclxuICAgIFllc05vLCB5ZXNOb1RvQm9vbGVhblxyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4uL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nc1VpfSBmcm9tIFwiLi4va2V5X2JpbmRpbmdzX3VpXCI7XHJcbmltcG9ydCB7VGlja2VyLCBUaWNrZXJTdGF0ZX0gZnJvbSBcIi4uL3RpY2tlclwiO1xyXG5pbXBvcnQge2dldEVudW0sIGdldEZsb2F0fSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9wdGlvbnMge1xyXG4gICAgcHVibGljIHN0YXRpYyBPUFRJT05TX0NMQVNTOiBzdHJpbmcgPSBcIm9wdGlvbnNcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfVElDS0VSX01FU1NBR0UgPVxyXG4gICAgICAgIFwiQWxsIHRoZSBvcHRpb25zISBDbGljayBhbiBvcHRpb24gdG8gc2hvdyBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGl0LlwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kKTtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICB9LCBcInNjcm9sbERpdlwiKTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpdi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKFwib3B0aW9ucy1zY3JvbGwtZGl2XCIpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgICAgIHNjcm9sbERpdi5lbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAzMzUsIGNhbnZhc1Bvc2l0aW9uLnkgKyA0NSk7XHJcblxyXG4gICAgICAgIGxldCByZXNldENvbmZpZ0J1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUmVzZXQgVG8gRGVmYXVsdFwiKTtcclxuICAgICAgICB9LCBcInJlc2V0Q29uZmlnQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmICghcmVzZXRDb25maWdCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJyZXNldC1jb25maWdcIik7XHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcgPSBuZXcgQ29uZmlnKHt9KTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgS2V5QmluZGluZ3NVaS5yZXNldE51bVRyYWNrcygpO1xyXG4gICAgICAgICAgICAgICAgS2V5QmluZGluZ3NVaS5yZWdlbmVyYXRlUHJldmlldygpO1xyXG4gICAgICAgICAgICAgICAgRE9NV3JhcHBlci5jbGVhclJlZ2lzdHJ5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQocmVzZXRDb25maWdCdXR0b24uZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVVc2VySW5wdXQoKCkgPT4gY3JlYXRlTGFiZWxlZElucHV0KFwiUGF1c2UgYXQgU3RhcnQgKHNlYylcIixcclxuICAgICAgICAgICAgXCJwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dFwiLCBnbG9iYWwuY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcy50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpLFxyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRQYXVzZUF0U3RhcnQuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93UGF1c2VBdFN0YXJ0SW5mby5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dQYXVzZUF0U3RhcnRFcnJvci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMgPSBnZXRGbG9hdChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjcmVhdGVVc2VySW5wdXQoKCkgPT4gY3JlYXRlTGFiZWxlZElucHV0KFwiU2Nyb2xsIFNwZWVkIChweC9zZWMpXCIsXHJcbiAgICAgICAgICAgIFwic2Nyb2xsU3BlZWRJbnB1dFwiLCBnbG9iYWwuY29uZmlnLnBpeGVsc1BlclNlY29uZC50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpLFxyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRTY3JvbGxTcGVlZC5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dTY3JvbGxTcGVlZEluZm8uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93U2Nyb2xsU3BlZWRFcnJvci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5waXhlbHNQZXJTZWNvbmQgPSBnZXRGbG9hdChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjcmVhdGVVc2VySW5wdXQoKCkgPT4gY3JlYXRlTGFiZWxlZFNlbGVjdChcIlNjcm9sbCBEaXJlY3Rpb25cIixcclxuICAgICAgICAgICAgXCJzY3JvbGxEaXJlY3Rpb25TZWxlY3RcIiwgU2Nyb2xsRGlyZWN0aW9uLCBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkU2Nyb2xsRGlyZWN0aW9uLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Njcm9sbERpcmVjdGlvbkluZm8uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93U2Nyb2xsRGlyZWN0aW9uRXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID0gZ2V0RW51bShpbnB1dCwgU2Nyb2xsRGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGNyZWF0ZVVzZXJJbnB1dCgoKSA9PiBjcmVhdGVMYWJlbGVkSW5wdXQoXCJSZWNlcHRvciBQb3NpdGlvbiAoJSlcIixcclxuICAgICAgICAgICAgXCJyZWNlcHRvclBvc2l0aW9uSW5wdXRcIiwgZ2xvYmFsLmNvbmZpZy5yZWNlcHRvcllQZXJjZW50LnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyksXHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZFJlY2VwdG9yUG9zaXRpb24uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjZXB0b3JQb3NpdGlvbkluZm8uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVjZXB0b3JQb3NpdGlvbkVycm9yLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQgPSBnZXRGbG9hdChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjcmVhdGVVc2VySW5wdXQoKCkgPT4gY3JlYXRlTGFiZWxlZElucHV0KFwiQWNjdXJhY3kgT2Zmc2V0IChtcylcIixcclxuICAgICAgICAgICAgXCJhZGRpdGlvbmFsT2Zmc2V0SW5wdXRcIiwgKGdsb2JhbC5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyAqIDEwMDApLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIE9wdGlvbnMuT1BUSU9OU19DTEFTUyksXHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZEFkZGl0aW9uYWxPZmZzZXQuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93QWRkaXRpb25hbE9mZnNldEluZm8uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93QWRkaXRpb25hbE9mZnNldEVycm9yLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgPSBnZXRGbG9hdChpbnB1dCkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCgpID0+IGNyZWF0ZUxhYmVsZWRUZXh0QXJlYShcIkFjY3VyYWN5IFNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIFwiYWNjdXJhY3lTZXR0aW5nc0lucHV0XCIsIEpTT04uc3RyaW5naWZ5KGdsb2JhbC5jb25maWcuYWNjdXJhY3lTZXR0aW5ncywgbnVsbCwgMyksXHJcbiAgICAgICAgICAgIE9wdGlvbnMuT1BUSU9OU19DTEFTUyksXHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZEFjY3VyYWN5U2V0dGluZ3MuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93QWNjdXJhY3lTZXR0aW5nc0luZm8uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93QWNjdXJhY3lTZXR0aW5nc0Vycm9yLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIChpbnB1dDogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MgPSBwYXJzZUFjY3VyYWN5U2V0dGluZ3NKc29uKFN0cmluZyhpbnB1dCkpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCgpID0+IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJBY2N1cmFjeSBGbGFzaFwiLFxyXG4gICAgICAgICAgICBcImFjY3VyYWN5Rmxhc2hFbmFibGVkU2VsZWN0XCIsIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpLFxyXG4gICAgICAgICAgICBPcHRpb25zLk9QVElPTlNfQ0xBU1MpLFxyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRBY2N1cmFjeUZsYXNoLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FjY3VyYWN5Rmxhc2hJbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FjY3VyYWN5Rmxhc2hFcnJvci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0geWVzTm9Ub0Jvb2xlYW4oZ2V0RW51bShpbnB1dCwgWWVzTm8pKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGNyZWF0ZVVzZXJJbnB1dCgoKSA9PiBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiQWNjdXJhY3kgUGFydGljbGVzXCIsXHJcbiAgICAgICAgICAgIFwiYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0XCIsIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkKSxcclxuICAgICAgICAgICAgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkQWNjdXJhY3lQYXJ0aWNsZXMuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93QWNjdXJhY3lQYXJ0aWNsZXNJbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FjY3VyYWN5UGFydGljbGVzRXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQgPSB5ZXNOb1RvQm9vbGVhbihnZXRFbnVtKGlucHV0LCBZZXNObykpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCgpID0+IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJBY2N1cmFjeSBUZXh0XCIsXHJcbiAgICAgICAgICAgIFwiYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdFwiLCBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQpLFxyXG4gICAgICAgICAgICBPcHRpb25zLk9QVElPTlNfQ0xBU1MpLFxyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRBY2N1cmFjeVRleHQuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93QWNjdXJhY3lUZXh0SW5mby5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB0aGlzLnNob3dBY2N1cmFjeVRleHRFcnJvci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQgPSB5ZXNOb1RvQm9vbGVhbihnZXRFbnVtKGlucHV0LCBZZXNObykpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgY3JlYXRlVXNlcklucHV0KCgpID0+IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJIb2xkIFBhcnRpY2xlc1wiLFxyXG4gICAgICAgICAgICBcImhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0XCIsIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpLFxyXG4gICAgICAgICAgICBPcHRpb25zLk9QVElPTlNfQ0xBU1MpLFxyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRIb2xkUGFydGljbGVzLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hvbGRQYXJ0aWNsZXNJbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hvbGRQYXJ0aWNsZXNFcnJvci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkID0geWVzTm9Ub0Jvb2xlYW4oZ2V0RW51bShpbnB1dCwgWWVzTm8pKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGNyZWF0ZVVzZXJJbnB1dCgoKSA9PiBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiSG9sZCBHbG93XCIsXHJcbiAgICAgICAgICAgIFwiaG9sZEdsb3dFbmFibGVkU2VsZWN0XCIsIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKSxcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkSG9sZEdsb3cuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgdGhpcy5zaG93SG9sZEdsb3dJbmZvLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hvbGRHbG93RXJyb3IuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgKGlucHV0OiBudW1iZXIgfCBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQgPSB5ZXNOb1RvQm9vbGVhbihnZXRFbnVtKGlucHV0LCBZZXNObykpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgS2V5QmluZGluZ3NVaS5jcmVhdGUoc2Nyb2xsRGl2LmVsZW1lbnQsIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcblxyXG4gICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheS5kcmF3KCk7XHJcblxyXG4gICAgICAgIGxldCB0aWNrZXIgPSBUaWNrZXIuY3JlYXRlKHRoaXMuREVGQVVMVF9USUNLRVJfTUVTU0FHRSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRFbGVtZW50VG9Cb3R0b20odGlja2VyLmVsZW1lbnQsIDQuMiwgMTIsIDgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRQYXVzZUF0U3RhcnQodmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzRmxvYXRHcmVhdGVyVGhhbk9yRXF1YWxaZXJvKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dQYXVzZUF0U3RhcnRJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiRGVsYXkgdGhlIHN0YXJ0IG9mIHRoZSBzb25nIHRvIGdpdmUgeW91cnNlbGYgbW9yZSB0aW1lIHRvIGdldCByZWFkeS5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd1BhdXNlQXRTdGFydEVycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd051bWJlck5vdEdyZWF0ZXJUaGFuT3JFcXVhbFplcm9FcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRTY3JvbGxTcGVlZCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGbG9hdEdyZWF0ZXJUaGFuT3JFcXVhbFplcm8odmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd1Njcm9sbFNwZWVkSW5mbygpOiB2b2lkIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIlRoZSBtb3ZlbWVudCBzcGVlZCBvZiB0aGUgbm90ZXMuIEhpZ2hlciB2YWx1ZXMgd2lsbCBtYWtlIHRoZSBub3RlcyBsb29rIGZhcnRoZXIgYXBhcnQuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dTY3JvbGxTcGVlZEVycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd051bWJlck5vdEdyZWF0ZXJUaGFuT3JFcXVhbFplcm9FcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRTY3JvbGxEaXJlY3Rpb24odmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWU6IFNjcm9sbERpcmVjdGlvbiA9IGdldEVudW0odmFsdWUsIFNjcm9sbERpcmVjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd1Njcm9sbERpcmVjdGlvbkluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJDb250cm9scyB3aGljaCB3YXkgdGhlIGFycm93cyBnby5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd1Njcm9sbERpcmVjdGlvbkVycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd1NlbGVjdEVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNWYWxpZFJlY2VwdG9yUG9zaXRpb24odmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzRmxvYXQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd1JlY2VwdG9yUG9zaXRpb25JbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBvcHBvc2l0ZURpcmVjdGlvbjogc3RyaW5nO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLkRvd24pIHtcclxuICAgICAgICAgICAgb3Bwb3NpdGVEaXJlY3Rpb24gPSBcInVwXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3Bwb3NpdGVEaXJlY3Rpb24gPSBcImRvd25cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJJbmNyZWFzZSB0aGlzIHZhbHVlIHRvIG1vdmUgdGhlIHJlY2VwdG9ycyBcIiArIG9wcG9zaXRlRGlyZWN0aW9uICsgXCIuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLklORk9STUFUSU9OKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dSZWNlcHRvclBvc2l0aW9uRXJyb3IoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93VmFsdWVOb3ROdW1iZXJFcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRBZGRpdGlvbmFsT2Zmc2V0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dBZGRpdGlvbmFsT2Zmc2V0SW5mbygpOiB2b2lkIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIlNoaWZ0cyB0aGUgdGltZSBwb3NpdGlvbiBvZiBhbGwgdGhlIG5vdGVzLiBVc2UgdGhpcyB0byBoZWxwIHN5bmNocm9uaXplIHRoZSBtdXNpYy5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0FkZGl0aW9uYWxPZmZzZXRFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dWYWx1ZU5vdE51bWJlckVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNWYWxpZEFjY3VyYWN5U2V0dGluZ3ModmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBzdHJpbmdWYWx1ZTogc3RyaW5nID0gU3RyaW5nKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gcGFyc2VBY2N1cmFjeVNldHRpbmdzSnNvbihzdHJpbmdWYWx1ZSkgIT09IG51bGw7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93QWNjdXJhY3lTZXR0aW5nc0luZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJDb250cm9scyB3aGF0IGhhcHBlbnMgd2hlbiB5b3UgaGl0IGEgbm90ZSB0b28gZWFybHksIHRvbyBsYXRlLCBvciBleGFjdGx5IHJpZ2h0LlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93QWNjdXJhY3lTZXR0aW5nc0Vycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiRXJyb3I6IHVuYWJsZSB0byBwYXJzZSB0aGUgSlNPTiB0ZXh0LlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5FUlJPUik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNWYWxpZEFjY3VyYWN5Rmxhc2godmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRZZXNObyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93QWNjdXJhY3lGbGFzaEluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJBIGZsYXNoIGVmZmVjdCB0aGF0IHNob3dzIG9uIHRoZSByZWNlcHRvcnMgd2hlbiB5b3UgaGl0IGEgbm90ZS5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0FjY3VyYWN5Rmxhc2hFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dTZWxlY3RFcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRBY2N1cmFjeVBhcnRpY2xlcyh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZFllc05vKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dBY2N1cmFjeVBhcnRpY2xlc0luZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJQYXJ0aWNsZXMgdGhhdCBzaG9vdCBvdXQgb2YgdGhlIHJlY2VwdG9ycyB3aGVuIHlvdSBoaXQgYSBub3RlLlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93QWNjdXJhY3lQYXJ0aWNsZXNFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dTZWxlY3RFcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRBY2N1cmFjeVRleHQodmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRZZXNObyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93QWNjdXJhY3lUZXh0SW5mbygpOiB2b2lkIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIlRleHQgdGhhdCBwb3BzIHVwIHRlbGxpbmcgeW91IHdoYXQgYWNjdXJhY3kgeW91IGhpdCBhIG5vdGUgd2l0aC5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuSU5GT1JNQVRJT04pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0FjY3VyYWN5VGV4dEVycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd1NlbGVjdEVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNWYWxpZEhvbGRQYXJ0aWNsZXModmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRZZXNObyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93SG9sZFBhcnRpY2xlc0luZm8oKTogdm9pZCB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJQYXJ0aWNsZXMgdGhhdCBzaG9vdCBvdXQgd2hpbGUgeW91J3JlIGhvbGRpbmcgYSBub3RlLlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93SG9sZFBhcnRpY2xlc0Vycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd1NlbGVjdEVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNWYWxpZEhvbGRHbG93KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkWWVzTm8odmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd0hvbGRHbG93SW5mbygpOiB2b2lkIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIkEgZ2xvdyBlZmZlY3Qgb24gdGhlIHJlY2VwdG9ycyB0aGF0IHNob3dzIHdoZW4geW91J3JlIGhvbGRpbmcgYSBub3RlLlwiLFxyXG4gICAgICAgICAgICBUaWNrZXJTdGF0ZS5JTkZPUk1BVElPTik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93SG9sZEdsb3dFcnJvcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3dTZWxlY3RFcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzRmxvYXRHcmVhdGVyVGhhbk9yRXF1YWxaZXJvKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbnVtYmVyVmFsdWU6IG51bWJlciA9IGdldEZsb2F0KHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG51bWJlclZhbHVlKSAmJiBudW1iZXJWYWx1ZSA+PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dOdW1iZXJOb3RHcmVhdGVyVGhhbk9yRXF1YWxaZXJvRXJyb3IoKSB7XHJcbiAgICAgICAgVGlja2VyLnNldE1lc3NhZ2UoXCJFcnJvcjogbXVzdCBiZSBhIG51bWJlciBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gemVyby5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuRVJST1IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVmFsaWRZZXNObyh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGVudW1WYWx1ZTogWWVzTm8gPSBnZXRFbnVtKHZhbHVlLCBZZXNObyk7XHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dTZWxlY3RFcnJvcigpIHtcclxuICAgICAgICBUaWNrZXIuc2V0TWVzc2FnZShcIkVycm9yOiBodWguLi4gbm90IHN1cmUgaG93IHlvdSBkaWQgdGhhdC5cIixcclxuICAgICAgICAgICAgVGlja2VyU3RhdGUuRVJST1IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNob3dWYWx1ZU5vdE51bWJlckVycm9yKCkge1xyXG4gICAgICAgIFRpY2tlci5zZXRNZXNzYWdlKFwiRXJyb3I6IG11c3QgYmUgYSBudW1iZXIuXCIsXHJcbiAgICAgICAgICAgIFRpY2tlclN0YXRlLkVSUk9SKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc0Zsb2F0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbnVtYmVyVmFsdWU6IG51bWJlciA9IGdldEZsb2F0KHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKG51bWJlclZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VBY2N1cmFjeVNldHRpbmdzSnNvbihhY2N1cmFjeVNldHRpbmdzSnNvbjogc3RyaW5nKTogQWNjdXJhY3lbXSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdID0gW11cclxuICAgICAgICBsZXQganNvbkFycmF5OiBBY2N1cmFjeVtdID0gSlNPTi5wYXJzZShhY2N1cmFjeVNldHRpbmdzSnNvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBqc29uQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0ganNvbkFycmF5W2ldO1xyXG4gICAgICAgICAgICAvLyB0aGlzIGZhaWxzIGlmIHRoZSB1c2VyIGdhdmUgdGhlIHdyb25nIGlucHV0XHJcbiAgICAgICAgICAgIGFjY3VyYWN5U2V0dGluZ3MucHVzaChuZXcgQWNjdXJhY3koYWNjdXJhY3kubmFtZSwgYWNjdXJhY3kubG93ZXJCb3VuZCwgYWNjdXJhY3kudXBwZXJCb3VuZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjdXJhY3lTZXR0aW5ncztcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbiIsImltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF5IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZS5iYWNrZ3JvdW5kKFwiYmxhY2tcIik7XHJcbiAgICAgICAgZ2xvYmFsLnBsYXlpbmdEaXNwbGF5LmRyYXcoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtcclxuICAgIGRyYXdIZWFkaW5nLFxyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUsXHJcbiAgICBjcmVhdGVGaWxlSW5wdXQsXHJcbiAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYsIGZpeFJhZGlvRGl2RWxlbWVudCwgc3R5bGVSYWRpb09wdGlvbnNcclxufSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7U3RlcGZpbGUsIFN0ZXBmaWxlU3RhdGV9IGZyb20gXCIuLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZSwgQXVkaW9GaWxlU3RhdGV9IGZyb20gXCIuLi9hdWRpb19maWxlXCI7XHJcbmltcG9ydCB7Z2V0TW9kZU9wdGlvbnNGb3JEaXNwbGF5LCBpbml0UGxheWluZ0Rpc3BsYXksIGlzRmlsZXNSZWFkeX0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHtNb2RlfSBmcm9tIFwiLi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4uL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5cclxuY29uc3QgcGxheUZyb21GaWxlU3RlcGZpbGUgPSBuZXcgU3RlcGZpbGUoKTtcclxuY29uc3QgcGxheUZyb21GaWxlQXVkaW9GaWxlID0gbmV3IEF1ZGlvRmlsZSgpO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsYXlGcm9tRmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBMQVlfRlJPTV9GSUxFX0NMQVNTOiBzdHJpbmcgPSBcInBsYXktZnJvbS1maWxlXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1PREVfUkFESU9fSUQ6IHN0cmluZyA9IFwibW9kZVJhZGlvXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGRyYXdIZWFkaW5nKCk7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXBmaWxlSW5wdXQgPSBjcmVhdGVGaWxlSW5wdXQoZ2V0U3RlcGZpbGVJbnB1dExhYmVsKCksIFwiQ2hvb3NlIFN0ZXBmaWxlICguc20pXCIsIFwic3RlcGZpbGVJbnB1dFwiLFxyXG4gICAgICAgICAgICBsb2FkU3RlcGZpbGVBbmRVcGRhdGVNb2RlT3B0aW9ucywgUGxheUZyb21GaWxlLlBMQVlfRlJPTV9GSUxFX0NMQVNTKS5lbGVtZW50O1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHN0ZXBmaWxlSW5wdXQsIDAuNDMsIDAuMywgMjY4LCAzNCk7XHJcblxyXG4gICAgICAgIGxldCBhdWRpb0ZpbGVJbnB1dCA9IGNyZWF0ZUZpbGVJbnB1dChnZXRBdWRpb0ZpbGVJbnB1dExhYmVsKCksIFwiQ2hvb3NlIEF1ZGlvIEZpbGUgKC5tcDMsIC5vZ2cpXCIsIFwiYXVkaW9GaWxlSW5wdXRcIixcclxuICAgICAgICAgICAgcGxheUZyb21GaWxlQXVkaW9GaWxlLmxvYWRGaWxlLmJpbmQocGxheUZyb21GaWxlQXVkaW9GaWxlKSwgUGxheUZyb21GaWxlLlBMQVlfRlJPTV9GSUxFX0NMQVNTKS5lbGVtZW50O1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGF1ZGlvRmlsZUlucHV0LCAwLjQzLCAwLjQ1LCAzMjUsIDM0KTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXlCdXR0b25JZCA9IFwicGxheUJ1dHRvblwiO1xyXG4gICAgICAgIGlmIChpc0ZpbGVzUmVhZHkocGxheUZyb21GaWxlU3RlcGZpbGUsIHBsYXlGcm9tRmlsZUF1ZGlvRmlsZSkpIHtcclxuICAgICAgICAgICAgbGV0IG1vZGVSYWRpbyA9IGRyYXdNb2RlU2VsZWN0KHAsIFBsYXlGcm9tRmlsZS5NT0RFX1JBRElPX0lEKTtcclxuICAgICAgICAgICAgaWYgKG1vZGVSYWRpby52YWx1ZSgpICE9PSBcIlwiKSB7IC8vIGlmIHVzZXIgaGFzIHNlbGVjdGVkIGEgbW9kZVxyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXlCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheVwiKTtcclxuICAgICAgICAgICAgICAgIH0sIHBsYXlCdXR0b25JZCk7XHJcbiAgICAgICAgICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5QnV0dG9uLmVsZW1lbnQsIDAuNSwgMC44OCwgNjAsIDM0KTtcclxuICAgICAgICAgICAgICAgIGlmICghcGxheUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZE1vZGU6IE1vZGUgPSBnZXRTZWxlY3RlZE1vZGUobW9kZVJhZGlvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheUZyb21GaWxlU3RlcGZpbGUuZmluaXNoUGFyc2luZyhzZWxlY3RlZE1vZGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0UGxheWluZ0Rpc3BsYXkocGxheUZyb21GaWxlU3RlcGZpbGUuZnVsbFBhcnNlLnRyYWNrcywgcGxheUZyb21GaWxlQXVkaW9GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuUExBWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHBsYXlCdXR0b25JZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFBsYXlGcm9tRmlsZS5NT0RFX1JBRElPX0lEKTtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFN0ZXBmaWxlQW5kVXBkYXRlTW9kZU9wdGlvbnMoZmlsZTogcDUuRmlsZSkge1xyXG4gICAgcGxheUZyb21GaWxlU3RlcGZpbGUubG9hZEZpbGUuY2FsbChwbGF5RnJvbUZpbGVTdGVwZmlsZSwgZmlsZSk7XHJcbiAgICBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucyA9IHVuZGVmaW5lZDtcclxuICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQoUGxheUZyb21GaWxlLk1PREVfUkFESU9fSUQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3TW9kZVNlbGVjdChwOiBwNSwgdW5pcXVlSWQ6IHN0cmluZyk6IHA1LkVsZW1lbnQge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBpZiAoZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zID0gZ2V0TW9kZU9wdGlvbnNGb3JEaXNwbGF5KHBsYXlGcm9tRmlsZVN0ZXBmaWxlLnBhcnRpYWxQYXJzZS5tb2Rlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1vZGVSYWRpb0NsYXNzID0gXCJtb2RlLXJhZGlvXCJcclxuICAgIGxldCBtb2RlUmFkaW9PcHRpb25DbGFzcyA9IFwibW9kZS1yYWRpby1vcHRpb25cIjtcclxuICAgIGxldCBtb2RlUmFkaW9DcmVhdGVSZXN1bHQgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlUmFkaW8oKTtcclxuICAgIH0sIHVuaXF1ZUlkKTtcclxuICAgIGxldCBtb2RlUmFkaW8gPSBtb2RlUmFkaW9DcmVhdGVSZXN1bHQuZWxlbWVudDtcclxuICAgIGlmICghbW9kZVJhZGlvQ3JlYXRlUmVzdWx0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBtb2RlUmFkaW8uaWQoXCJyYWRpby1kaXZcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9kZSA9IGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zW2ldO1xyXG4gICAgICAgICAgICBsZXQgcmFkaW9MYWJlbCA9IG1vZGUudHlwZSArIFwiLCBcIiArIG1vZGUuZGlmZmljdWx0eSArIFwiLCBcIiArIG1vZGUubWV0ZXI7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGV0IHJhZGlvT3B0aW9uID0gbW9kZVJhZGlvLm9wdGlvbihyYWRpb0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHZhbHVlIHRoaXMgd2F5IGJlY2F1c2UgdGhlIHR3by1hcmd1bWVudCAub3B0aW9uIG1ldGhvZCB3YXNuJ3Qgd29ya2luZ1xyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSBpcyBuZWNlc3Nhcnkgc28gd2UgY2FuIGFjY2VzcyB0aGUgc2VsZWN0ZWQgbW9kZVxyXG4gICAgICAgICAgICByYWRpb09wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIHN0eWxlIGlzIGJlaW5nIHNldCBvbiB0aGUgZGl2IGNvbnRhaW5pbmcgdGhlIHJhZGlvIGVsZW1lbnRzIHRvIG1ha2UgaXQgYSBzY3JvbGxhYmxlIGJveFxyXG4gICAgICAgIG1vZGVSYWRpby5hZGRDbGFzcyhtb2RlUmFkaW9DbGFzcyk7XHJcbiAgICAgICAgbW9kZVJhZGlvLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdihwLCBtb2RlUmFkaW8pO1xyXG4gICAgICAgIGZpeFJhZGlvRGl2RWxlbWVudChtb2RlUmFkaW8pO1xyXG4gICAgICAgIHN0eWxlUmFkaW9PcHRpb25zKHAsIG1vZGVSYWRpbywgW21vZGVSYWRpb09wdGlvbkNsYXNzLCBnbG9iYWwuZ2xvYmFsQ2xhc3NdKTtcclxuICAgIH1cclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKG1vZGVSYWRpbywgMC41LCAwLjcsIDMwMiwgMTIwKTtcclxuICAgIHAucG9wKCk7XHJcbiAgICByZXR1cm4gbW9kZVJhZGlvO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RlZE1vZGUobW9kZVJhZGlvOiBwNS5FbGVtZW50KSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnNbbW9kZVJhZGlvLnZhbHVlKCldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdGVwZmlsZUlucHV0TGFiZWwoKSB7XHJcbiAgICBzd2l0Y2gocGxheUZyb21GaWxlU3RlcGZpbGUuc3RhdGUpIHtcclxuICAgICAgICBjYXNlIFN0ZXBmaWxlU3RhdGUuTk9fU1RFUEZJTEU6XHJcbiAgICAgICAgICAgIHJldHVybiBcIk5vIGZpbGUgY2hvc2VuXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5ET05FX1JFQURJTkc6XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQ6XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcocGxheUZyb21GaWxlU3RlcGZpbGUuZmlsZS5uYW1lLCAzMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIkVycm9yXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEF1ZGlvRmlsZUlucHV0TGFiZWwoKSB7XHJcbiAgICBzd2l0Y2gocGxheUZyb21GaWxlQXVkaW9GaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5OT19BVURJT19GSUxFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJObyBmaWxlIGNob3NlblwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLkRPTkVfUkVBRElORzpcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1bmNhdGVGaWxlTmFtZUlmVG9vTG9uZyhwbGF5RnJvbUZpbGVBdWRpb0ZpbGUuZmlsZS5uYW1lLCAzMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIkVycm9yXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcoZnVsbEZpbGVOYW1lOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBpZiAoZnVsbEZpbGVOYW1lLmxlbmd0aCA8PSBtYXhMZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZnVsbEZpbGVOYW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bGxGaWxlTmFtZS5zdWJzdHIoMCwgbWF4TGVuZ3RoIC0gMTEpICtcclxuICAgICAgICBcIi4uLlwiICtcclxuICAgICAgICBmdWxsRmlsZU5hbWUuc3Vic3RyKGZ1bGxGaWxlTmFtZS5sZW5ndGggLSAxMCk7XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1xyXG4gICAgY3JlYXRlTGFiZWxlZElucHV0LFxyXG4gICAgZHJhd0hlYWRpbmcsXHJcbiAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYsXHJcbiAgICBmaXhSYWRpb0RpdkVsZW1lbnQsXHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZSxcclxuICAgIHN0eWxlUmFkaW9PcHRpb25zXHJcbn0gZnJvbSBcIi4uL3VpX3V0aWxcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtPbmxpbmVQbGF5bGlzdCwgT25saW5lUGxheWxpc3RTdGF0ZX0gZnJvbSBcIi4uL29ubGluZV9wbGF5bGlzdFwiO1xyXG5pbXBvcnQge2luaXRQbGF5aW5nRGlzcGxheSwgaXNGaWxlc1JlYWR5fSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQge1N0ZXBmaWxlfSBmcm9tIFwiLi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGV9IGZyb20gXCIuLi9hdWRpb19maWxlXCI7XHJcblxyXG5jb25zdCBwbGF5RnJvbU9ubGluZVN0ZXBmaWxlID0gbmV3IFN0ZXBmaWxlKCk7XHJcbmNvbnN0IHBsYXlGcm9tT25saW5lQXVkaW9GaWxlID0gbmV3IEF1ZGlvRmlsZSgpO1xyXG5cclxuLy8gVGhpcyBwcmV2ZW50cyBsb2FkaW5nIHByZXZpb3VzIHNvbmcgdXBvbiByZXR1cm5pbmcgdG8gYSBsb2FkZWQgcGxheWxpc3RcclxubGV0IGlzU3dmTG9hZFN0YXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF5RnJvbU9ubGluZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBMQVlfRlJPTV9PTkxJTkVfQ0xBU1M6IHN0cmluZyA9IFwicGxheS1mcm9tLW9ubGluZVwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG4gICAgICAgIGxldCBvbmxpbmVQbGF5bGlzdDogT25saW5lUGxheWxpc3QgPSA8T25saW5lUGxheWxpc3Q+IGdsb2JhbC5vbmxpbmVQbGF5bGlzdDtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQpO1xyXG5cclxuICAgICAgICBsZXQgdXJsSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJFbmdpbmUgVVJMXCIsIFwidXJsSW5wdXRcIiwgb25saW5lUGxheWxpc3QuaW5kZXhVcmwsXHJcbiAgICAgICAgICAgIFBsYXlGcm9tT25saW5lLlBMQVlfRlJPTV9PTkxJTkVfQ0xBU1MpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBsZXQgdXJsSW5wdXREaXYgPSBuZXcgcDUuRWxlbWVudCh1cmxJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZSh1cmxJbnB1dERpdiwgMC41MCwgMC4yMSwgNjAwLCAzOCk7XHJcblxyXG4gICAgICAgIGxldCBsb2FkQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJMb2FkXCIpO1xyXG4gICAgICAgIH0sIFwibG9hZEJ1dHRvblwiKTtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShsb2FkQnV0dG9uLmVsZW1lbnQsIDAuODUsIDAuMjE1LCA2MiwgMzMpO1xyXG4gICAgICAgIGlmICghbG9hZEJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIGxvYWRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoUGxheUZyb21PbmxpbmUuUExBWV9GUk9NX09OTElORV9DTEFTUyk7XHJcbiAgICAgICAgICAgIGxvYWRCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSB1cmxJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LmF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb25saW5lUGxheWxpc3Qua2lja09mZkxvYWRQbGF5bGlzdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob25saW5lUGxheWxpc3Quc3RhdGUgIT09IE9ubGluZVBsYXlsaXN0U3RhdGUuTE9BRElOR19QTEFZTElTVCkge1xyXG4gICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9ubGluZVBsYXlsaXN0LnN0YXRlID09PSBPbmxpbmVQbGF5bGlzdFN0YXRlLlBMQVlMSVNUX1JFQURZIHx8XHJcbiAgICAgICAgICAgIG9ubGluZVBsYXlsaXN0LnN0YXRlID09PSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfU09ORykge1xyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RNZW51SWQgPSBcInBsYXlsaXN0TWVudVwiXHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdE1lbnUgPSBkcmF3UmFkaW9NZW51KHAsIHBsYXlsaXN0TWVudUlkLCBvbmxpbmVQbGF5bGlzdC5kaXNwbGF5ZWRQbGF5bGlzdCk7XHJcbiAgICAgICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlsaXN0TWVudSwgMC41LCAwLjYyLCA1MDAsIDIwMCk7XHJcblxyXG4gICAgICAgICAgICBkcmF3UGFnZUNvbnRyb2xzKHAsIHBsYXlsaXN0TWVudUlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5bGlzdE1lbnUudmFsdWUoKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvYWRBbmRQbGF5QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIkxvYWQgQW5kIFBsYXlcIik7XHJcbiAgICAgICAgICAgICAgICB9LCBcImxvYWRBbmRQbGF5QnV0dG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUobG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudCwgMC41LCAwLjg4LCAxMTgsIDM0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWxvYWRBbmRQbGF5QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkQW5kUGxheUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHBsYXlsaXN0TWVudS52YWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQuYXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ubGluZVBsYXlsaXN0LmtpY2tPZmZMb2FkU29uZyh2YWx1ZSwgcGxheUZyb21PbmxpbmVTdGVwZmlsZSwgcGxheUZyb21PbmxpbmVBdWRpb0ZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTd2ZMb2FkU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvbmxpbmVQbGF5bGlzdC5zdGF0ZSAhPT0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkcpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkQW5kUGxheUJ1dHRvbi5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGaWxlc1JlYWR5KHBsYXlGcm9tT25saW5lU3RlcGZpbGUsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKSAmJiBpc1N3ZkxvYWRTdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdFBsYXlpbmdEaXNwbGF5KHBsYXlGcm9tT25saW5lU3RlcGZpbGUuZnVsbFBhcnNlLnRyYWNrcywgcGxheUZyb21PbmxpbmVBdWRpb0ZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQoXCJsb2FkQW5kUGxheUJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIGlzU3dmTG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFwicGxheWxpc3RNZW51XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIE1lbnVJdGVtIHtcclxuICAgIHRvU3RyaW5nOiAoKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdSYWRpb01lbnUocDogcDUsIHVuaXF1ZUlkOiBzdHJpbmcsIGl0ZW1zOiBNZW51SXRlbVtdKTogcDUuRWxlbWVudCB7XHJcbiAgICBsZXQgbWVudUNsYXNzID0gXCJwbGF5bGlzdC1yYWRpb1wiXHJcbiAgICBsZXQgbWVudUl0ZW1DbGFzcyA9IFwicGxheWxpc3QtcmFkaW8tb3B0aW9uXCI7XHJcbiAgICBsZXQgcmFkaW9NZW51Q3JlYXRlUmVzdWx0ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVJhZGlvKCk7XHJcbiAgICB9LCB1bmlxdWVJZCk7XHJcbiAgICBsZXQgcmFkaW9NZW51ID0gcmFkaW9NZW51Q3JlYXRlUmVzdWx0LmVsZW1lbnQ7XHJcbiAgICBpZiAoIXJhZGlvTWVudUNyZWF0ZVJlc3VsdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcmFkaW9NZW51LmlkKFwicmFkaW8tZGl2XCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXTtcclxuICAgICAgICAgICAgbGV0IHJhZGlvTGFiZWwgPSBpdGVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGV0IHJhZGlvT3B0aW9uID0gcmFkaW9NZW51Lm9wdGlvbihyYWRpb0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHZhbHVlIHRoaXMgd2F5IGJlY2F1c2UgdGhlIHR3by1hcmd1bWVudCAub3B0aW9uIG1ldGhvZCB3YXNuJ3Qgd29ya2luZ1xyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSBpcyBuZWNlc3Nhcnkgc28gd2UgY2FuIGFjY2VzcyB0aGUgc2VsZWN0ZWQgbW9kZVxyXG4gICAgICAgICAgICByYWRpb09wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIHN0eWxlIGlzIGJlaW5nIHNldCBvbiB0aGUgZGl2IGNvbnRhaW5pbmcgdGhlIHJhZGlvIGVsZW1lbnRzIHRvIG1ha2UgaXQgYSBzY3JvbGxhYmxlIGJveFxyXG4gICAgICAgIHJhZGlvTWVudS5hZGRDbGFzcyhtZW51Q2xhc3MpO1xyXG4gICAgICAgIHJhZGlvTWVudS5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocCwgcmFkaW9NZW51KTtcclxuICAgICAgICBmaXhSYWRpb0RpdkVsZW1lbnQocmFkaW9NZW51KTtcclxuICAgICAgICBzdHlsZVJhZGlvT3B0aW9ucyhwLCByYWRpb01lbnUsIFttZW51SXRlbUNsYXNzLCBnbG9iYWwuZ2xvYmFsQ2xhc3NdKTtcclxuICAgIH1cclxuICAgIHJldHVybiByYWRpb01lbnU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdQYWdlQ29udHJvbHMocDogcDUsIHBsYXlsaXN0TWVudUlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBwYWdlQ29udHJvbHNEaXYgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlRGl2KCk7XHJcbiAgICB9LCBcInBhZ2VDb250cm9sc0RpdlwiKTtcclxuICAgIGlmICghcGFnZUNvbnRyb2xzRGl2LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwYWdlQ29udHJvbHNEaXYuZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtY29udHJvbHNcIik7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuYWRkQ2xhc3MoUGxheUZyb21PbmxpbmUuUExBWV9GUk9NX09OTElORV9DTEFTUyk7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwYWdlQ29udHJvbHNEaXYuZWxlbWVudCwgMC41LCAwLjM4MywgMTQwLCAzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhZ2VOdW1iZXJUZXh0ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCB0ZXh0Q29udGFpbmVyID0gcC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICB0ZXh0Q29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIHRleHRDb250YWluZXI7XHJcbiAgICB9LCBcInBhZ2VOdW1iZXJUZXh0XCIpO1xyXG5cclxuICAgIGxldCBwcmV2aW91c1BhZ2VCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiJiM4MjQ5O1wiKTtcclxuICAgIH0sIFwicHJldmlvdXNQYWdlQnV0dG9uXCIpO1xyXG4gICAgaWYgKCFwcmV2aW91c1BhZ2VCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHByZXZpb3VzUGFnZUJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5wcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5bGlzdE1lbnVJZCk7XHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQuaHRtbChcIlBhZ2UgXCIgKyAoZ2xvYmFsLm9ubGluZVBsYXlsaXN0LmdldFBhZ2UoKSArIDEpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwcmV2aW91c1BhZ2VCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtY29udHJvbC1idXR0b25cIik7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuY2hpbGQocHJldmlvdXNQYWdlQnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFwYWdlTnVtYmVyVGV4dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuY2hpbGQocGFnZU51bWJlclRleHQuZWxlbWVudCk7XHJcbiAgICAgICAgcGFnZU51bWJlclRleHQuZWxlbWVudC5odG1sKFwiUGFnZSBcIiArIChnbG9iYWwub25saW5lUGxheWxpc3QuZ2V0UGFnZSgpICsgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBuZXh0UGFnZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCImIzgyNTA7XCIpO1xyXG4gICAgfSwgXCJuZXh0UGFnZUJ1dHRvblwiKTtcclxuICAgIGlmICghbmV4dFBhZ2VCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIG5leHRQYWdlQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgZ2xvYmFsLm9ubGluZVBsYXlsaXN0Lm5leHRQYWdlKCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheWxpc3RNZW51SWQpO1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyVGV4dC5lbGVtZW50Lmh0bWwoXCJQYWdlIFwiICsgKGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5nZXRQYWdlKCkgKyAxKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmV4dFBhZ2VCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtY29udHJvbC1idXR0b25cIik7XHJcbiAgICAgICAgcGFnZUNvbnRyb2xzRGl2LmVsZW1lbnQuY2hpbGQobmV4dFBhZ2VCdXR0b24uZWxlbWVudCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7c2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmV9IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4uL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc3VsdHMge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG5cclxuICAgICAgICBnbG9iYWwucmVzdWx0c0Rpc3BsYXkuZHJhdygpO1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJSZXR1cm5cIik7XHJcbiAgICAgICAgfSwgXCJyZXR1cm5CdXR0b25cIik7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocmV0dXJuQnV0dG9uLmVsZW1lbnQsIDAuNSwgMC45LCA3MywgMzQpO1xyXG4gICAgICAgIGlmICghcmV0dXJuQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnJldHVybigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5jb25zdCBSRUNPUkRIRUFERVJfTEVOR1RIX0ZVTEwgPSAweDNmXHJcbiAgICAvLyBudWxsLWNoYXJhY3RlclxyXG4gICAgLCBFT1MgPSAweDAwXHJcbiAgICAsIHN0eWxlQ291bnRFeHQgPSAweEZGO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ5dGVSZWFkZXIge1xyXG4gICAgcHVibGljIGJ1ZmZlcl9yYXc6IEFycmF5QnVmZmVyTGlrZTtcclxuICAgIHB1YmxpYyBidWZmZXI6IERhdGFWaWV3O1xyXG4gICAgcHVibGljIHBvaW50ZXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgcHVibGljIGN1cnJlbnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBsZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihidWZmZXI6IEFycmF5QnVmZmVyTGlrZSkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyX3JhdyA9IGJ1ZmZlcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gMDtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdW5zaWduZWQgMTYgb3IgMzIgTGl0dGxlIEVuZGlhbiBCaXRzXHJcbiAgICAgKiBhbmQgYWR2YW5jZSBwb2ludGVyIHRvIG5leHQgYml0cyAvIDggYnl0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYml0c1xyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkVUludExFKGJpdHM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAoYml0cykge1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlOiB0aGUgc2Vjb25kIHBhcmFtZXRlciBtaWdodCBvbmx5IGV4aXN0IGluIEVTNiwgbGV0J3Mgc2VlIGlmIHRoaXMgY2F1c2VzIGFuIGVycm9yXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldFVpbnQ4KHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxNjpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0VWludDE2KHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0VWludDMyKHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IFwiVW5leHBlY3RlZCBudW1iZXIgb2YgYml0czogJ1wiICsgYml0cyArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvaW50ZXIgKz0gYml0cyAvIDg7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdW5zaWduZWQgOCBiaXQgZnJvbSB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZFVJbnQ4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlci5nZXRVaW50OCh0aGlzLnBvaW50ZXIrKyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgZmxvYXQgZnJvbSB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBWYWx1ZSByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZEZsb2F0KCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRGbG9hdDMyKHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRlciArPSA0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGRvdWJsZSBmcm9tIHRoZSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFZhbHVlIHJlYWQgZnJvbSBidWZmZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkRG91YmxlKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRGbG9hdDY0KHRoaXMucG9pbnRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRlciArPSA4O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIDMyLWJpdCB1bnNpZ25lZCBpbnRlZ2VycyB2YWx1ZSBlbmNvZGVkICgxLTUgYnl0ZXMpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAzMi1iaXQgdW5zaWduZWQgaW50ZWdlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRFbmNvZGVkVTMyKCkge1xyXG4gICAgICAgIGxldCBpID0gNVxyXG4gICAgICAgICAgICAsIHJlc3VsdCA9IDBcclxuICAgICAgICAgICAgLCBuYjtcclxuXHJcbiAgICAgICAgZG9cclxuICAgICAgICAgICAgcmVzdWx0ICs9IChuYiA9IHRoaXMubmV4dEJ5dGUoKSk7XHJcbiAgICAgICAgd2hpbGUgKChuYiAmIDEyOCkgJiYgLS1pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhbiBlbmNvZGVkIGRhdGEgZnJvbSBidWZmZXIgYW5kIHJldHVybnMgYVxyXG4gICAgICogc3RyaW5nIHVzaW5nIHRoZSBzcGVjaWZpZWQgY2hhcmFjdGVyIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBEZWNvZGVkIHN0cmluZ1xyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRTdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IHJlYWQgPSB0aGlzLnJlYWRVSW50OCgpO1xyXG4gICAgICAgICAgICBpZiAocmVhZCA9PT0gRU9TKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHJlYWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGFuIGVuY29kZWQgZGF0YSBmcm9tIGJ1ZmZlciBhbmQgcmV0dXJucyBhXHJcbiAgICAgKiBzdHJpbmcgdXNpbmcgdGhlIHNwZWNpZmllZCBjaGFyYWN0ZXIgc2V0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IERlY29kZWQgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkU3RyaW5nRml4ZWQocmVhZExlbmd0aDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgd2hpbGUgKHJlYWRMZW5ndGgtLSA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHJlYWQgPSB0aGlzLnJlYWRVSW50OCgpO1xyXG4gICAgICAgICAgICBpZiAocmVhZCA9PT0gRU9TKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHJlYWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIFJFQ09SREhFQURFUiBmcm9tIG5leHQgdGFnIGluIHRoZSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRhZyBjb2RlIGFuZCBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRUYWdDb2RlQW5kTGVuZ3RoKCk6IFRhZ0hlYWRlciB7XHJcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBvaW50ZXI7XHJcbiAgICAgICAgbGV0IG4gPSB0aGlzLnJlYWRVSW50TEUoMTYpXHJcbiAgICAgICAgICAgICwgdGFnVHlwZSA9IG4gPj4gNlxyXG4gICAgICAgICAgICAsIHRhZ0xlbmd0aCA9IG4gJiBSRUNPUkRIRUFERVJfTEVOR1RIX0ZVTEw7XHJcblxyXG4gICAgICAgIGlmIChuID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHRhZ0xlbmd0aCA9PT0gUkVDT1JESEVBREVSX0xFTkdUSF9GVUxMKVxyXG4gICAgICAgICAgICB0YWdMZW5ndGggPSB0aGlzLnJlYWRVSW50TEUoMzIpO1xyXG5cclxuICAgICAgICByZXR1cm4ge3N0YXJ0OiBwLCBlbmQ6IHRoaXMucG9pbnRlciArIHRhZ0xlbmd0aCwgY29kZTogdGFnVHlwZSwgbGVuZ3RoOiB0YWdMZW5ndGgsIHBvc2l0aW9uOiB0aGlzLnBvaW50ZXJ9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIFJFQ09SREhFQURFUiBmcm9tIG5leHQgdGFnIGluIHRoZSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRhZyBjb2RlIGFuZCBsZW5ndGhcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkQWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzID0gdGhpcy5wb2ludGVyO1xyXG4gICAgICAgIGxldCBhID0gdGhpcy5yZWFkVUludDgoKTtcclxuICAgICAgICBsZXQgbCA9IChhICYgMHg4MCkgPyB0aGlzLnJlYWRVSW50TEUoMTYpIDogMDtcclxuICAgICAgICBsZXQgcCA9IHRoaXMucG9pbnRlcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtzdGFydDogcywgYWN0aW9uOiBhLCBsZW5ndGg6IGwsIHBvc2l0aW9uOiBwfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBSRUNUIGZvcm1hdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1JlY3R9IHgsIHksIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIFJFQ1RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRSZWN0KCk6IFJlY3Qge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgbGV0IE5CaXRzID0gdGhpcy5yZWFkQml0cyg1KVxyXG4gICAgICAgICAgICAsIFhtaW4gPSB0aGlzLnJlYWRCaXRzKE5CaXRzLCB0cnVlKSAvIDIwXHJcbiAgICAgICAgICAgICwgWG1heCA9IHRoaXMucmVhZEJpdHMoTkJpdHMsIHRydWUpIC8gMjBcclxuICAgICAgICAgICAgLCBZbWluID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMFxyXG4gICAgICAgICAgICAsIFltYXggPSB0aGlzLnJlYWRCaXRzKE5CaXRzLCB0cnVlKSAvIDIwO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBYbWluLFxyXG4gICAgICAgICAgICB5OiBZbWluLFxyXG4gICAgICAgICAgICB3aWR0aDogKFhtYXggPiBYbWluID8gWG1heCAtIFhtaW4gOiBYbWluIC0gWG1heCksXHJcbiAgICAgICAgICAgIGhlaWdodDogKFltYXggPiBZbWluID8gWW1heCAtIFltaW4gOiBZbWluIC0gWW1heClcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgaW50ZXJuYWwgcG9pbnRlciB0byB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwb3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlZWsocG9zOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSBwb3MgJSB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyBwb3NpdGlvbiBhbmQgc2V0cyBjdXJyZW50IHRvIG5leHQgQnl0ZSBpbiBidWZmZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV4dEJ5dGUoKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gMTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG5leHQgQnl0ZSBpbiB0aGUgYnVmZmVyIGFuZCBJbmNyZW1lbnQgaW50ZXJuYWwgcG9pbnRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gTmV4dCBieXRlIGluIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIG5leHRCeXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50ZXIgPiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoID8gbnVsbCA6IHRoaXMuYnVmZmVyLmdldFVpbnQ4KHRoaXMucG9pbnRlcisrKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBiIGJpdHMgZnJvbSBjdXJyZW50IGJ5dGUgaW4gYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gQml0cyByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkQml0cyhiOiBudW1iZXIsIHNpZ25lZDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IG4gPSAwXHJcbiAgICAgICAgICAgICwgciA9IDBcclxuICAgICAgICAgICAgLCBzaWduID0gc2lnbmVkICYmICsrbiAmJiAoKHRoaXMuY3VycmVudCA+PiAoOCAtIHRoaXMucG9zaXRpb24rKykpICYgMSkgPyAtMSA6IDE7XHJcblxyXG4gICAgICAgIHdoaWxlIChuKysgPCBiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID4gOCkgdGhpcy5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgciA9IChyIDw8IDEpICsgKCh0aGlzLmN1cnJlbnQgPj4gKDggLSB0aGlzLnBvc2l0aW9uKyspKSAmIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2lnbiAqIHI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVwbGFjZSBieXRlcyBpbiB0aGUgQXJyYXlCdWZmZXIgd2l0aCB0aGUgcHJvdmlkZWQgYnl0ZXMuXHJcbiAgICAgKiBUaGlzIHNsaWNlcyB0aGUgZnJvbSBgMCAtPiBwb2ludGVyYCBhbmQgYHBvc2l0aW9uX2VuZCAtPiBidWZmZXJsZW5ndGhgXHJcbiAgICAgKiBhbmQgaW5zZXJ0cyB0aGUgZ2l2ZW4gYnl0ZXMgYmV0d2VlbiB0aGVtLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gQml0cyByZWFkIGZyb20gYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBsYWNlQnl0ZXMobmV3X2J5dGVzOiBhbnksIHBvc3Rpb25fZW5kOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYnVmZmVyMSA9IHRoaXMuYnVmZmVyX3Jhdy5zbGljZSgwLCB0aGlzLnBvaW50ZXIpO1xyXG4gICAgICAgIGxldCBidWZmZXIyID0gbmV3X2J5dGVzO1xyXG4gICAgICAgIGxldCBidWZmZXIzID0gdGhpcy5idWZmZXJfcmF3LnNsaWNlKHBvc3Rpb25fZW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHRtcCA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcjEuYnl0ZUxlbmd0aCArIGJ1ZmZlcjIuYnl0ZUxlbmd0aCArIGJ1ZmZlcjMuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmZXIxKSwgMCk7XHJcbiAgICAgICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmZXIyKSwgYnVmZmVyMS5ieXRlTGVuZ3RoKTtcclxuICAgICAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlcjMpLCBidWZmZXIxLmJ5dGVMZW5ndGggKyBidWZmZXIyLmJ5dGVMZW5ndGgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1ZmZlcl9yYXcgPSB0bXAuYnVmZmVyO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gbmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyX3Jhdyk7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gMDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gMTtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVjdCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnIHtcclxuICAgIHBvb2w/OiBzdHJpbmdbXTtcclxuICAgIHZhcmlhYmxlcz86IGFueTtcclxuICAgIGhlYWRlcj86IFRhZ0hlYWRlcjtcclxuICAgIGRvSW5jbHVkZT86IGJvb2xlYW47XHJcbiAgICBkYXRhPzogQXJyYXlCdWZmZXJMaWtlXHJcbiAgICBhdWRpb19ieXRlcz86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWdIZWFkZXIge1xyXG4gICAgc3RhcnQ6IG51bWJlcjtcclxuICAgIGVuZDogbnVtYmVyO1xyXG4gICAgY29kZTogbnVtYmVyO1xyXG4gICAgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG59IiwiZXhwb3J0IGNsYXNzIFBhcnRpYWxQYXJzZSB7XHJcbiAgICBtZXRhRGF0YTogTWFwPHN0cmluZywgc3RyaW5nPjtcclxuICAgIG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W107XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE5vdGVUeXBlIHtcclxuICAgIE5PTkUgPSBcIjBcIixcclxuICAgIE5PUk1BTCA9IFwiMVwiLFxyXG4gICAgSE9MRF9IRUFEID0gXCIyXCIsXHJcbiAgICBUQUlMID0gXCIzXCIsXHJcbiAgICBST0xMX0hFQUQgPSBcIjRcIixcclxuICAgIE1JTkUgPSBcIk1cIixcclxuICAgIFVOS05PV04gPSBcIj8/P1wiLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9Ob3RlVHlwZShzdHJpbmc6IHN0cmluZyk6IE5vdGVUeXBlIHtcclxuICAgIHN3aXRjaCAoc3RyaW5nKSB7XHJcbiAgICAgICAgY2FzZSBcIjBcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLk5PTkU7XHJcbiAgICAgICAgY2FzZSBcIjFcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLk5PUk1BTDtcclxuICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuSE9MRF9IRUFEO1xyXG4gICAgICAgIGNhc2UgXCIzXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5UQUlMO1xyXG4gICAgICAgIGNhc2UgXCI0XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5ST0xMX0hFQUQ7XHJcbiAgICAgICAgY2FzZSBcIk1cIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLk1JTkU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLlVOS05PV047XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE5vdGVTdGF0ZSB7XHJcbiAgICBERUZBVUxULFxyXG4gICAgSElULFxyXG4gICAgTUlTU0VELFxyXG4gICAgSEVMRCxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3RlIHtcclxuICAgIHR5cGU6IE5vdGVUeXBlO1xyXG4gICAgdHlwZVN0cmluZzogc3RyaW5nOyAvLyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlIEJFRk9SRSBpdCdzIGludGVycHJldGVkIGFzIGEgTm90ZVR5cGVcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcjtcclxuICAgIHN0YXRlPzogTm90ZVN0YXRlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kZSB7XHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGRpZmZpY3VsdHk6IHN0cmluZztcclxuICAgIHB1YmxpYyBtZXRlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGdWxsUGFyc2Uge1xyXG4gICAgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbiAgICBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdO1xyXG4gICAgb2Zmc2V0OiBudW1iZXI7XHJcbiAgICBicG1zOiBbbnVtYmVyLCBudW1iZXJdW107XHJcbiAgICBzdG9wczogW251bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgdHJhY2tzOiBOb3RlW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZSkge1xyXG4gICAgICAgIHRoaXMubWV0YURhdGEgPSBwYXJ0aWFsUGFyc2UubWV0YURhdGE7XHJcbiAgICAgICAgdGhpcy5tb2RlcyA9IHBhcnRpYWxQYXJzZS5tb2RlcztcclxuICAgIH1cclxufVxyXG5cclxuLyogU3RlcCBPbmUgT2YgUGFyc2luZyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFydGlhbFBhcnNlKGZpbGVDb250ZW50czogc3RyaW5nKSB7XHJcbiAgICBsZXQgcGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UgPSBuZXcgUGFydGlhbFBhcnNlKCk7XHJcbiAgICBwYXJ0aWFsUGFyc2UubWV0YURhdGEgPSBnZXRUb3BNZXRhRGF0YUFzU3RyaW5ncyhmaWxlQ29udGVudHMpO1xyXG4gICAgcGFydGlhbFBhcnNlLm1vZGVzID0gZ2V0TW9kZXNJbmZvQXNTdHJpbmdzKGZpbGVDb250ZW50cyk7XHJcbiAgICByZXR1cm4gcGFydGlhbFBhcnNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb3BNZXRhRGF0YUFzU3RyaW5ncyhmaWxlOiBzdHJpbmcpIHtcclxuICAgIC8vIG1hdGNoIGFueSBtZXRhZGF0YSB0YWcgZXhjbHVkaW5nIHRoZSBcIk5PVEVTXCIgdGFnIChjYXNlLWluc2Vuc2l0aXZlKVxyXG4gICAgbGV0IHJlID0gLyMoPyFbbk5dW29PXVt0VF1bZUVdW3NTXSkoW146XSspOihbXjtdKyk7L2c7XHJcbiAgICBsZXQgbWF0Y2hlcyA9IFsuLi5maWxlLm1hdGNoQWxsKHJlKV07XHJcbiAgICBsZXQgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaGVzW2ldO1xyXG4gICAgICAgIG1ldGFEYXRhLnNldChjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoWzFdKS50b1VwcGVyQ2FzZSgpLCBjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoWzJdKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWV0YURhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1vZGVzSW5mb0FzU3RyaW5ncyhmaWxlQ29udGVudHM6IHN0cmluZykge1xyXG4gICAgLy8gR2V0IFwiTk9URVNcIiBzZWN0aW9ucyAoY2FzZS1pbnNlbnNpdGl2ZSkuIFRoZSBmaXJzdCBmaXZlIHZhbHVlcyBhcmUgcG9zdGZpeGVkIHdpdGggYSBjb2xvbi5cclxuICAgIC8vIE5vdGUgZGF0YSBjb21lcyBsYXN0LCBwb3N0Zml4ZWQgYnkgYSBzZW1pY29sb24uXHJcbiAgICBsZXQgcmUgPSAvI1tuTl1bb09dW3RUXVtlRV1bc1NdOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjpdKik6KFteOl0qKTooW147XSs7KS9nO1xyXG4gICAgbGV0IG1hdGNoZXMgPSBbLi4uZmlsZUNvbnRlbnRzLm1hdGNoQWxsKHJlKV07XHJcbiAgICBsZXQgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXSA9IFtdO1xyXG4gICAgbGV0IGZpZWxkTmFtZXMgPSBbXCJ0eXBlXCIsIFwiZGVzYy9hdXRob3JcIiwgXCJkaWZmaWN1bHR5XCIsIFwibWV0ZXJcIiwgXCJyYWRhclwiXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtYXRjaCA9IG1hdGNoZXNbaV07XHJcbiAgICAgICAgbGV0IG1vZGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBtYXRjaC5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICAgICAgbW9kZS5zZXQoZmllbGROYW1lc1tqIC0gMV0sIGNsZWFuTWV0YURhdGFTdHJpbmcobWF0Y2hbal0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbW9kZS5zZXQoXCJub3Rlc1wiLCBtYXRjaFttYXRjaC5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgbW9kZXMucHVzaChtb2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtb2RlcztcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYW5NZXRhRGF0YVN0cmluZyhzdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnRyaW0oKS5yZXBsYWNlKC9cXG4vZywgXCJcIik7XHJcbn1cclxuXHJcbi8qIFN0ZXAgVHdvIE9mIFBhcnNpbmcgKi9cclxuXHJcbi8vIFRPRE86IGFjdHVhbGx5IHJldHVybiBGdWxsUGFyc2VcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxQYXJzZShtb2RlSW5kZXg6IG51bWJlciwgcGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UpOiBGdWxsUGFyc2Uge1xyXG4gICAgbGV0IGZ1bGxQYXJzZSA9IG5ldyBGdWxsUGFyc2UocGFydGlhbFBhcnNlKTtcclxuICAgIGxldCB1bnBhcnNlZE5vdGVzOiBzdHJpbmcgPSBwYXJ0aWFsUGFyc2UubW9kZXNbbW9kZUluZGV4XS5nZXQoXCJub3Rlc1wiKTtcclxuICAgIGxldCB1bnBhcnNlZEFycmF5OiBzdHJpbmdbXSA9IHVucGFyc2VkTm90ZXMuc3BsaXQoXCJcXG5cIik7XHJcbiAgICBsZXQgbWVhc3VyZXM6IHN0cmluZ1tdW10gPSBnZXRNZWFzdXJlcyh1bnBhcnNlZEFycmF5KTtcclxuICAgIGxldCBiZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSBnZXRCZWF0SW5mb0J5TGluZShtZWFzdXJlcyk7XHJcbiAgICBsZXQgY2xlYW5lZEJlYXRzQW5kTGluZXM6IHsgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSA9IHJlbW92ZUJsYW5rTGluZXMoYmVhdHNBbmRMaW5lcyk7XHJcbiAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSBwYXJzZUZsb2F0KHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJPRkZTRVRcIikpO1xyXG4gICAgbGV0IGJwbXM6IHsgYmVhdDogbnVtYmVyOyBicG06IG51bWJlciB9W10gPSBwYXJzZUJQTVMocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIkJQTVNcIikpO1xyXG4gICAgbGV0IHN0b3BzOiB7IHN0b3BEdXJhdGlvbjogbnVtYmVyOyBiZWF0OiBudW1iZXIgfVtdID0gcGFyc2VTdG9wcyhwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiU1RPUFNcIikpO1xyXG4gICAgbGV0IHRpbWVzQmVhdHNBbmRMaW5lczogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZyB9W10gPSBnZXRUaW1lSW5mb0J5TGluZShjbGVhbmVkQmVhdHNBbmRMaW5lcywgb2Zmc2V0LCBicG1zLCBzdG9wcyk7XHJcbiAgICBmdWxsUGFyc2UudHJhY2tzID0gZ2V0VHJhY2tzRnJvbUxpbmVzKHRpbWVzQmVhdHNBbmRMaW5lcyk7XHJcbiAgICByZXR1cm4gZnVsbFBhcnNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNZWFzdXJlcyh1bnBhcnNlZEFycmF5OiBzdHJpbmdbXSkge1xyXG4gICAgbGV0IG1lYXN1cmVzOiBzdHJpbmdbXVtdID0gW107XHJcbiAgICBsZXQgc3RhdGUgPSAwO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGN1cnJlbnRNZWFzdXJlOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgd2hpbGUgKGkgPCB1bnBhcnNlZEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50TGluZSA9IHVucGFyc2VkQXJyYXlbaV07XHJcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRMaW5lLmluY2x1ZGVzKFwiLy9cIikgJiYgY3VycmVudExpbmUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50TGluZS5pbmNsdWRlcyhcIixcIikgJiYgIWN1cnJlbnRMaW5lLmluY2x1ZGVzKFwiO1wiKSAmJiBjdXJyZW50TGluZS50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50TWVhc3VyZS5wdXNoKGN1cnJlbnRMaW5lLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZXMucHVzaChjdXJyZW50TWVhc3VyZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TWVhc3VyZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lYXN1cmVzO1xyXG59XHJcblxyXG4vLyBhc3N1bWVzIDQvNCB0aW1lIHNpZ25hdHVyZVxyXG5mdW5jdGlvbiBnZXRCZWF0SW5mb0J5TGluZShtZWFzdXJlczogc3RyaW5nW11bXSkge1xyXG4gICAgbGV0IGJlYXRzQW5kTGluZXMgPSBbXTtcclxuICAgIGxldCBjdXJyZW50QmVhdCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lYXN1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1lYXN1cmUgPSBtZWFzdXJlc1tpXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1lYXN1cmUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgYmVhdHNBbmRMaW5lcy5wdXNoKHtiZWF0OiBjdXJyZW50QmVhdCwgbGluZUluZm86IG1lYXN1cmVbal19KTtcclxuICAgICAgICAgICAgY3VycmVudEJlYXQgKz0gNCAvIG1lYXN1cmUubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBiZWF0c0FuZExpbmVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVCbGFua0xpbmVzKGJlYXRzQW5kTGluZXM6IHsgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSkge1xyXG4gICAgbGV0IGNsZWFuZWRCZWF0c0FuZExpbmVzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJlYXRzQW5kTGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbGluZSA9IGJlYXRzQW5kTGluZXNbaV07XHJcbiAgICAgICAgaWYgKCFpc0FsbFplcm9zKGxpbmUubGluZUluZm8pKSB7XHJcbiAgICAgICAgICAgIGNsZWFuZWRCZWF0c0FuZExpbmVzLnB1c2gobGluZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNsZWFuZWRCZWF0c0FuZExpbmVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FsbFplcm9zKHN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzdHJpbmcuY2hhckF0KGkpICE9PSAnMCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lSW5mb0J5TGluZShpbmZvQnlMaW5lOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10sIG9mZnNldDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdLCBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXVxyXG4pOiB7IHRpbWU6IG51bWJlciwgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSB7XHJcbiAgICBsZXQgaW5mb0J5TGluZVdpdGhUaW1lOiB7IHRpbWU6IG51bWJlciwgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSA9IFtdO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gLW9mZnNldCArIGdldEVsYXBzZWRUaW1lKDAsIGluZm9CeUxpbmVbMF0uYmVhdCwgYnBtcywgc3RvcHMpO1xyXG4gICAgaW5mb0J5TGluZVdpdGhUaW1lLnB1c2goe3RpbWU6IGN1cnJlbnRUaW1lLCBiZWF0OiBpbmZvQnlMaW5lWzBdLmJlYXQsIGxpbmVJbmZvOiBpbmZvQnlMaW5lWzBdLmxpbmVJbmZvfSk7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGluZm9CeUxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RhcnRCZWF0ID0gaW5mb0J5TGluZVtpIC0gMV0uYmVhdDtcclxuICAgICAgICBsZXQgZW5kQmVhdCA9IGluZm9CeUxpbmVbaV0uYmVhdDtcclxuICAgICAgICBjdXJyZW50VGltZSArPSBnZXRFbGFwc2VkVGltZShzdGFydEJlYXQsIGVuZEJlYXQsIGJwbXMsIHN0b3BzKTtcclxuICAgICAgICBpbmZvQnlMaW5lV2l0aFRpbWUucHVzaCh7dGltZTogY3VycmVudFRpbWUsIGJlYXQ6IGluZm9CeUxpbmVbaV0uYmVhdCwgbGluZUluZm86IGluZm9CeUxpbmVbaV0ubGluZUluZm99KTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbmZvQnlMaW5lV2l0aFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEVsYXBzZWRUaW1lKHN0YXJ0QmVhdDogbnVtYmVyLCBlbmRCZWF0OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BzOiB7IGJlYXQ6IG51bWJlciwgc3RvcER1cmF0aW9uOiBudW1iZXIgfVtdKSB7XHJcbiAgICBsZXQgY3VycmVudEJQTUluZGV4OiBudW1iZXIgPSBnZXRTdGFydEJQTUluZGV4KHN0YXJ0QmVhdCwgYnBtcyk7XHJcbiAgICBsZXQgZWFybGllc3RCZWF0OiBudW1iZXIgPSBzdGFydEJlYXQ7XHJcbiAgICBsZXQgZWxhcHNlZFRpbWU6IG51bWJlciA9IHN0b3BzID09IG51bGwgPyAwIDogc3RvcHBlZFRpbWUoc3RhcnRCZWF0LCBlbmRCZWF0LCBzdG9wcyk7XHJcbiAgICBkbyB7XHJcbiAgICAgICAgbGV0IG5leHRCUE1DaGFuZ2U6IG51bWJlciA9IGdldE5leHRCUE1DaGFuZ2UoY3VycmVudEJQTUluZGV4LCBicG1zKTtcclxuICAgICAgICBsZXQgbmV4dEJlYXQ6IG51bWJlciA9IE1hdGgubWluKGVuZEJlYXQsIG5leHRCUE1DaGFuZ2UpO1xyXG4gICAgICAgIGVsYXBzZWRUaW1lICs9IChuZXh0QmVhdCAtIGVhcmxpZXN0QmVhdCkgLyBicG1zW2N1cnJlbnRCUE1JbmRleF0uYnBtICogNjA7XHJcbiAgICAgICAgZWFybGllc3RCZWF0ID0gbmV4dEJlYXQ7XHJcbiAgICAgICAgY3VycmVudEJQTUluZGV4Kys7XHJcbiAgICB9IHdoaWxlIChlYXJsaWVzdEJlYXQgPCBlbmRCZWF0KTtcclxuICAgIHJldHVybiBlbGFwc2VkVGltZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RhcnRCUE1JbmRleChzdGFydEJlYXQ6IG51bWJlciwgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IHN0YXJ0QlBNSW5kZXggPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBicG1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJwbXNbaV0uYmVhdCA8IHN0YXJ0QmVhdCkge1xyXG4gICAgICAgICAgICBzdGFydEJQTUluZGV4ID0gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhcnRCUE1JbmRleDtcclxufVxyXG5cclxuLy8gZG9lcyBOT1Qgc25hcCB0byBuZWFyZXN0IDEvMTkybmQgb2YgYmVhdFxyXG5mdW5jdGlvbiBzdG9wcGVkVGltZShzdGFydEJlYXQ6IG51bWJlciwgZW5kQmVhdDogbnVtYmVyLCBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IHRpbWUgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzdG9wQmVhdCA9IHN0b3BzW2ldLmJlYXQ7XHJcbiAgICAgICAgaWYgKHN0YXJ0QmVhdCA8PSBzdG9wQmVhdCAmJiBzdG9wQmVhdCA8IGVuZEJlYXQpIHtcclxuICAgICAgICAgICAgdGltZSArPSBzdG9wc1tpXS5zdG9wRHVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5leHRCUE1DaGFuZ2UoY3VycmVudEJQTUluZGV4OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10pIHtcclxuICAgIGlmIChjdXJyZW50QlBNSW5kZXggKyAxIDwgYnBtcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gYnBtc1tjdXJyZW50QlBNSW5kZXggKyAxXS5iZWF0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VHJhY2tzRnJvbUxpbmVzKHRpbWVzQmVhdHNBbmRMaW5lczogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZzsgfVtdKSB7XHJcbiAgICBsZXQgbnVtVHJhY2tzOiBudW1iZXIgPSB0aW1lc0JlYXRzQW5kTGluZXNbMF0ubGluZUluZm8ubGVuZ3RoO1xyXG4gICAgbGV0IHRyYWNrczogTm90ZVtdW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICB0cmFja3MucHVzaChbXSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVzQmVhdHNBbmRMaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBsaW5lOiB7IHRpbWU6IG51bWJlcjsgYmVhdDogbnVtYmVyOyBsaW5lSW5mbzogc3RyaW5nIH0gPSB0aW1lc0JlYXRzQW5kTGluZXNbaV07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsaW5lLmxpbmVJbmZvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlU3RyaW5nID0gbGluZS5saW5lSW5mby5jaGFyQXQoaik7XHJcbiAgICAgICAgICAgIGxldCBub3RlVHlwZTogTm90ZVR5cGUgPSBzdHJpbmdUb05vdGVUeXBlKHR5cGVTdHJpbmcpO1xyXG4gICAgICAgICAgICBpZiAobm90ZVR5cGUgIT09IE5vdGVUeXBlLk5PTkUpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrc1tqXS5wdXNoKHt0eXBlOiBub3RlVHlwZSwgdHlwZVN0cmluZzogdHlwZVN0cmluZywgdGltZUluU2Vjb25kczogbGluZS50aW1lfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJhY2tzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUJQTVMoYnBtU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGlmIChicG1TdHJpbmcgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGxldCBicG1BcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihicG1TdHJpbmcpO1xyXG4gICAgbGV0IGJwbXM6IHsgYmVhdDogbnVtYmVyOyBicG06IG51bWJlciB9W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnBtQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBicG1zLnB1c2goe2JlYXQ6IGJwbUFycmF5W2ldWzBdLCBicG06IGJwbUFycmF5W2ldWzFdfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnBtcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VTdG9wcyhzdG9wc1N0cmluZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoc3RvcHNTdHJpbmcgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGxldCBzdG9wc0FycmF5OiBbbnVtYmVyLCBudW1iZXJdW10gPSBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKHN0b3BzU3RyaW5nKTtcclxuICAgIGxldCBzdG9wczogeyBzdG9wRHVyYXRpb246IG51bWJlcjsgYmVhdDogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9wc0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3RvcHMucHVzaCh7YmVhdDogc3RvcHNBcnJheVtpXVswXSwgc3RvcER1cmF0aW9uOiBzdG9wc0FycmF5W2ldWzFdfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RvcHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oc3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGxldCBzdHJpbmdBcnJheTogc3RyaW5nW11bXSA9IHN0cmluZy5zcGxpdChcIixcIikubWFwKGUgPT4gZS50cmltKCkuc3BsaXQoXCI9XCIpKTtcclxuICAgIGxldCBhcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYXJyYXkucHVzaChbcGFyc2VGbG9hdChzdHJpbmdBcnJheVtpXVswXSksIHBhcnNlRmxvYXQoc3RyaW5nQXJyYXlbaV1bMV0pXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn0iLCJpbXBvcnQge1NXRlRhZ3N9IGZyb20gXCIuL3N3Zi10YWdzXCI7XHJcbmltcG9ydCB7U1dGLCB1bmNvbXByZXNzfSBmcm9tIFwiLi9zd2YtcmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN3ZlBhcnNlUmVzcG9uc2Uge1xyXG4gICAgY2hhcnREYXRhOiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ11bXTtcclxuICAgIGJsb2I6IEJsb2I7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN3ZkZyb21BcnJheUJ1ZmZlcihpbnB1dDogQXJyYXlCdWZmZXIpOiBTd2ZQYXJzZVJlc3BvbnNlIHtcclxuICAgIHJldHVybiBzd2ZGaWxlX1JlYWR5KDxVaW50OEFycmF5PiBpbnB1dCk7XHJcbn1cclxuXHJcbmxldCBzd2ZfdGFnczogU1dGO1xyXG5cclxuZnVuY3Rpb24gc3dmRmlsZV9SZWFkeShidWZmZXI6IFVpbnQ4QXJyYXkpOiBTd2ZQYXJzZVJlc3BvbnNlIHtcclxuICAgIHN3Zl90YWdzID0gdW5jb21wcmVzcyhidWZmZXIpO1xyXG4gICAgXHJcbiAgICAvLyBDaGFydCBEYXRhXHJcbiAgICBsZXQgY2hhcnRfdGFnID0gZ2V0QmVhdEJveCgpO1xyXG4gICAgbGV0IGNoYXJ0X2RhdGEgPSBjaGFydF90YWdbXCJ2YXJpYWJsZXNcIl1bXCJfcm9vdFwiXVtcImJlYXRCb3hcIl07XHJcblxyXG4gICAgLy8gTXVzaWMgRGF0YVxyXG4gICAgbGV0IG11c2ljX2JpbmFyeSA9IGdldEF1ZGlvKCk7XHJcbiAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFttdXNpY19iaW5hcnldLCB7dHlwZSA6ICdhdWRpby9tcGVnJ30pO1xyXG5cclxuICAgIHJldHVybiB7YmxvYjogYmxvYiwgY2hhcnREYXRhOiBjaGFydF9kYXRhfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgQmVhdGJveCBpbiB0aGUgc3dmX3RhZ3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCZWF0Qm94KCkge1xyXG4gICAgbGV0IGxlbiA9IHN3Zl90YWdzLnRhZ3MubGVuZ3RoO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGVsbSA9IG51bGw7XHJcblxyXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBlbG0gPSBzd2ZfdGFncy50YWdzW2ldO1xyXG4gICAgICAgIGlmKGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLkRPQUNUSU9OKVxyXG4gICAgICAgICAgICByZXR1cm4gZWxtO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZCBCZWF0Ym94IGluIHRoZSBzd2ZfdGFncy5cclxuICovXHJcbmZ1bmN0aW9uIGdldEF1ZGlvKCkge1xyXG4gICAgbGV0IGxlbiA9IHN3Zl90YWdzLnRhZ3MubGVuZ3RoO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGVsbSA9IG51bGw7XHJcblxyXG4gICAgbGV0IGF1ZGlvU2l6ZSA9IDBcclxuXHJcbiAgICAvLyBMb29wIEFsbCBBdWRpbyBUYWdzLCBnZXQgVG90YWwgQnl0ZSBTaXplXHJcbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGVsbSA9IHN3Zl90YWdzLnRhZ3NbaV07XHJcbiAgICAgICAgaWYoZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuREVGSU5FU09VTkQgfHwgZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuU1RSRUFNQkxPQ0spXHJcbiAgICAgICAgICAgIGF1ZGlvU2l6ZSArPSBlbG0uYXVkaW9fYnl0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTG9vcCBBbGwgQXVkaW8gVGFncywgZ2V0IFRvdGFsIEJ5dGUgU2l6ZVxyXG4gICAgbGV0IHdyaXRlUG9zaXRpb24gPSAwO1xyXG4gICAgbGV0IGJpbmFyeSA9IG5ldyBVaW50OEFycmF5KGF1ZGlvU2l6ZSk7XHJcbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGVsbSA9IHN3Zl90YWdzLnRhZ3NbaV07XHJcbiAgICAgICAgaWYoZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuREVGSU5FU09VTkQgfHwgZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuU1RSRUFNQkxPQ0spIHtcclxuICAgICAgICAgICAgYmluYXJ5LnNldChuZXcgVWludDhBcnJheShlbG0uZGF0YSksIHdyaXRlUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB3cml0ZVBvc2l0aW9uICs9IGVsbS5hdWRpb19ieXRlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmluYXJ5O1xyXG59IiwiaW1wb3J0ICogYXMgcGFrbyBmcm9tIFwicGFrb1wiO1xyXG5pbXBvcnQge1NXRkFjdGlvblRhZ3MsIFNXRk90aGVyVGFncywgU1dGVGFncywgU1dGVHlwZVRhZ3N9IGZyb20gXCIuL3N3Zi10YWdzXCI7XHJcbmltcG9ydCB7Qnl0ZVJlYWRlciwgUmVjdCwgVGFnLCBUYWdIZWFkZXJ9IGZyb20gXCIuL2J5dGVfcmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU1dGIHtcclxuICAgIHB1YmxpYyBidWZmZXI6IEJ5dGVSZWFkZXI7XHJcbiAgICBwdWJsaWMgbWFnaWM6IHN0cmluZztcclxuICAgIHB1YmxpYyB2ZXJzaW9uOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZmlsZUxlbmd0aDogeyBjb21wcmVzc2VkOiBudW1iZXIsIHVuY29tcHJlc3NlZDogbnVtYmVyIH07XHJcbiAgICBwdWJsaWMgZnJhbWVTaXplOiBSZWN0O1xyXG4gICAgcHVibGljIGZyYW1lUmF0ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0YWdzOiBhbnlbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmNhdCBTV0YgSGVhZGVyIHdpdGggdW5jb21wcmVzc2VkIEJ1ZmZlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdFNXRkhlYWRlcihidWZmOiBVaW50OEFycmF5LCBzd2Y6IEFycmF5QnVmZmVyKSB7XHJcbiAgICBsZXQgdG1wID0gbmV3IFVpbnQ4QXJyYXkoYnVmZi5ieXRlTGVuZ3RoICsgOCk7XHJcbiAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KHN3Zi5zbGljZSgwLCA4KSkpO1xyXG4gICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmKSwgOCk7XHJcbiAgICByZXR1cm4gdG1wLmJ1ZmZlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlY29tcHJlc3MgU1dGIGlmIG5lZWRlZCBhbmQgUmVhZCBTV0ZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmNvbXByZXNzKHN3ZjogVWludDhBcnJheSkge1xyXG4gICAgbGV0IHN3Zl9ieXRlcyA9IG5ldyBVaW50OEFycmF5KHN3Zik7XHJcbiAgICBsZXQgY29tcHJlc3NlZF9idWZmOiBVaW50OEFycmF5ID0gc3dmLnNsaWNlKDgpO1xyXG5cclxuICAgIC8vIHVuY29tcHJlc3MgYnVmZmVyXHJcbiAgICBzd2l0Y2ggKHN3Zl9ieXRlc1swXSkgeyAvLyBNQUdJQ1xyXG4gICAgICAgIGNhc2UgMHg0MyA6IC8vICdDJyA9IHpsaWIgY29tcHJlc3NlZFxyXG4gICAgICAgICAgICBsZXQgdW5jb21wcmVzc2VkX2J1ZmYgPSBjb25jYXRTV0ZIZWFkZXIocGFrby5pbmZsYXRlKGNvbXByZXNzZWRfYnVmZiksIHN3Zik7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkU1dGQnVmZihuZXcgQnl0ZVJlYWRlcih1bmNvbXByZXNzZWRfYnVmZiksIHN3Zik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDB4NDYgOiAvLyAnRicgPSB1bmNvbXByZXNzZWRcclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRTV0ZCdWZmKG5ldyBCeXRlUmVhZGVyKHN3ZiksIHN3Zik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDB4NWEgOiAvLyBMWk1BIGNvbXByZXNzZWRcclxuICAgICAgICAgICAgYWxlcnQoJ0Nhbm5vdCBoYW5kbGUgTFpNQSBTV0YgY29tcHJlc3Npb25zJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgYWxlcnQoJ1Vua25vd24gU1dGIGNvbXByZXNzaW9ucycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlYWRzIHRoZSBTV0YgZnJvbSB1bmNvbXByZXNzZWQgYnVmZmVyLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRTV0ZCdWZmKGJ1ZmY6IEJ5dGVSZWFkZXIsIGNvbXByZXNzZWRfYnVmZjogQXJyYXlCdWZmZXIpOiBTV0Yge1xyXG4gICAgYnVmZi5zZWVrKDApOy8vIHN0YXJ0XHJcblxyXG4gICAgbGV0IHN3ZiA9IG5ldyBTV0YoKVxyXG4gICAgc3dmLmJ1ZmZlciA9IGJ1ZmY7XHJcbiAgICBzd2YubWFnaWMgPSBidWZmLnJlYWRTdHJpbmdGaXhlZCgzKTtcclxuICAgIHN3Zi52ZXJzaW9uID0gYnVmZi5yZWFkVUludDgoKTtcclxuICAgIHN3Zi5maWxlTGVuZ3RoID0ge1xyXG4gICAgICAgIGNvbXByZXNzZWQ6IGNvbXByZXNzZWRfYnVmZi5ieXRlTGVuZ3RoLFxyXG4gICAgICAgIHVuY29tcHJlc3NlZDogYnVmZi5yZWFkVUludExFKDMyKVxyXG4gICAgfTtcclxuICAgIHN3Zi5mcmFtZVNpemUgPSBidWZmLnJlYWRSZWN0KCk7XHJcbiAgICBzd2YuZnJhbWVSYXRlID0gYnVmZi5yZWFkVUludExFKDE2KSAvIDI1NjtcclxuICAgIHN3Zi5mcmFtZUNvdW50ID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgc3dmLnRhZ3MgPSByZWFkU1dGVGFncyhidWZmKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzd2Y7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgdGhlIFNXRiBUQUcgZGF0YSBzdHJ1Y3R1cmUsIGtlZXBpbmcgb25seSB0aGUgdGFnc1xyXG4gKiB3ZSBhcmUgaW50ZXJlc3RlZCBpbi5cclxuICogLSBBdWRpbyBUYWdzOiBBdWRpbyBTYW1wbGVzXHJcbiAqIC0gRG8gQWN0aW9uIFRhZzogQ29udGFpbmluZyB0aGUgYmVhdEJveCB2YXJpYWJsZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkU1dGVGFncyhidWZmOiBCeXRlUmVhZGVyKSB7XHJcbiAgICBsZXQgdGFnczogVGFnW10gPSBbXTtcclxuICAgIGxldCB0YWdIZWFkZXI6IFRhZ0hlYWRlcjtcclxuXHJcbiAgICBsZXQgbXAzU2VlayA9IDA7XHJcbiAgICBsZXQgbXAzU2FtcGxlcyA9IDA7XHJcbiAgICBsZXQgbXAzSWQgPSAwO1xyXG4gICAgbGV0IG1wM0Zvcm1hdCA9IDA7XHJcbiAgICBsZXQgbXAzU3RyZWFtID0gZmFsc2U7XHJcblxyXG4gICAgLyogUmVhZHMgVGFnQ29kZUFuZExlbmd0aCBmcm9tIFRhZydzIFJFQ09SREhFQURFUiAqL1xyXG4gICAgd2hpbGUgKCh0YWdIZWFkZXIgPSBidWZmLnJlYWRUYWdDb2RlQW5kTGVuZ3RoKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHRhZzogVGFnID0ge307XHJcbiAgICAgICAgdGFnLmhlYWRlciA9IHRhZ0hlYWRlcjtcclxuICAgICAgICB0YWcuZG9JbmNsdWRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGFnSGVhZGVyLmNvZGUpIHtcclxuICAgICAgICAgICAgLy8gU291bmQgVGFncyAtIE1QMyBFeHRyYWN0aW9uXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5TVFJFQU1CTE9DSzpcclxuICAgICAgICAgICAgICAgIGlmICghbXAzU3RyZWFtIHx8ICgodGFnSGVhZGVyLmxlbmd0aCAtIDQpID09IDApKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIG1wM1NhbXBsZXMgKz0gYnVmZi5yZWFkVUludExFKDE2KTsgLy8gZnJhbWUgc2FtcGxlc1xyXG4gICAgICAgICAgICAgICAgYnVmZi5yZWFkVUludExFKDE2KTsgLy8gc2VlayBzYW1wbGVzXHJcblxyXG4gICAgICAgICAgICAgICAgdGFnLmRhdGEgPSBidWZmLmJ1ZmZlcl9yYXcuc2xpY2UoYnVmZi5wb2ludGVyLCBidWZmLnBvaW50ZXIgKyAodGFnSGVhZGVyLmxlbmd0aCAtIDQpKTtcclxuICAgICAgICAgICAgICAgIHRhZy5hdWRpb19ieXRlcyA9ICh0YWdIZWFkZXIubGVuZ3RoIC0gNCk7XHJcbiAgICAgICAgICAgICAgICB0YWcuZG9JbmNsdWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBTV0ZUYWdzLlNUUkVBTUhFQUQ6XHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5TVFJFQU1IRUFEMjpcclxuICAgICAgICAgICAgICAgIGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgIG1wM0Zvcm1hdCA9IGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgIGJ1ZmYucmVhZFVJbnRMRSgxNik7IC8vIGF2ZXJhZ2UgZnJhbWUgc2FtcGxlc1xyXG4gICAgICAgICAgICAgICAgbXAzU2VlayA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICBpZiAoKChtcDNGb3JtYXQgPj4+IDQpICYgMHhmKSA9PSBTV0ZPdGhlclRhZ3MuQ09ERUNfTVAzKVxyXG4gICAgICAgICAgICAgICAgICAgIG1wM1N0cmVhbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5ERUZJTkVTT1VORDpcclxuICAgICAgICAgICAgICAgIGlmICghbXAzU3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybWF0ID0gYnVmZi5yZWFkVUludExFKDgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoKGZvcm1hdCA+Pj4gNCkgJiAweGYpID09IFNXRk90aGVyVGFncy5DT0RFQ19NUDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzSWQgPSBpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzRm9ybWF0ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcDNTYW1wbGVzID0gYnVmZi5yZWFkVUludExFKDMyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzU2VlayA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5kYXRhID0gYnVmZi5idWZmZXJfcmF3LnNsaWNlKGJ1ZmYucG9pbnRlciwgYnVmZi5wb2ludGVyICsgKHRhZ0hlYWRlci5sZW5ndGggLSA5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5hdWRpb19ieXRlcyA9ICh0YWdIZWFkZXIubGVuZ3RoIC0gOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5kb0luY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gRG9BY3Rpb24gLSBXaGVyZSB0aGUgQmVhdGJveCBMaXZlc1xyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuRE9BQ1RJT04gOlxyXG4gICAgICAgICAgICAgICAgbGV0IF9maW5pc2hlZFJlYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uU3RhY2s6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uVmFyaWFibGVzOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25SZWdpc3RlcnM6IFthbnksIGFueSwgYW55LCBhbnldID0gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnN0YW50UG9vbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlICghX2ZpbmlzaGVkUmVhZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb24gPSBidWZmLnJlYWRBY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVhZCBBY3Rpb24gVGFnXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZmluaXNoZWRSZWFkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLkNPTlNUQU5UUE9PTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50UG9vbCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnN0YW50Q291bnQgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25zdGFudENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudFBvb2wucHVzaChidWZmLnJlYWRTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5QVVNIOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGJ1ZmYucG9pbnRlciA8IGFjdGlvbi5wb3NpdGlvbiArIGFjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHVzaFZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwdXNoVHlwZSA9IGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHB1c2hUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuU1RSSU5HX0xJVEVSQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5GTE9BVF9MSVRFUkFMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYnVmZi5yZWFkRmxvYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5OVUxMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5VTkRFRklORUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuUkVHSVNURVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBhY3Rpb25SZWdpc3RlcnNbYnVmZi5yZWFkVUludExFKDgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5CT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gQm9vbGVhbihidWZmLnJlYWRVSW50TEUoOCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkRPVUJMRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGJ1ZmYucmVhZERvdWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLklOVEVHRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWRVSW50TEUoMzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkNPTlNUQU5UODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGNvbnN0YW50UG9vbFtidWZmLnJlYWRVSW50TEUoOCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkNPTlNUQU5UMTY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBjb25zdGFudFBvb2xbYnVmZi5yZWFkVUludExFKDE2KV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZPVU5EIFVOU1VQUE9SVEVEIFBVU0hEQVRBIFRZUEU6IFwiICsgcHVzaFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2gocHVzaFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLlBPUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuRFVQTElDQVRFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhY3Rpb25TdGFja1thY3Rpb25TdGFjay5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TVE9SRV9SRUdJU1RFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblJlZ2lzdGVyc1tidWZmLnJlYWRVSW50TEUoOCldID0gYWN0aW9uU3RhY2tbYWN0aW9uU3RhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5HRVRfVkFSSUFCTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3ZOYW1lID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShndk5hbWUgaW4gYWN0aW9uVmFyaWFibGVzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25WYXJpYWJsZXNbZ3ZOYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhY3Rpb25WYXJpYWJsZXNbZ3ZOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TRVRfVkFSSUFCTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ZWYWx1ZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uVmFyaWFibGVzW2FjdGlvblN0YWNrLnBvcCgpXSA9IHN2VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5JTklUX0FSUkFZOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5U2l6ZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5U2l6ZTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goYWN0aW9uU3RhY2sucG9wKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5HRVRfTUVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdtTmFtZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdtT2JqZWN0ID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShnbU5hbWUgaW4gZ21PYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtT2JqZWN0W2dtTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goZ21PYmplY3RbZ21OYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TRVRfTUVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNtVmFsdWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbU5hbWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnBvcCgpW3NtTmFtZV0gPSBzbVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHRhZyBpc24ndCBzdXBwb3J0ZWQsIGJ1dCBpdCBzZWVtcyB0byBiZSBpbiBldmVyeSBmaWxlLCBzbyBJJ20gaWdub3JpbmcgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9VTkQgVU5TVVBQT1JURUQgQUNUSU9OIFRBRzogXCIgKyBhY3Rpb24uYWN0aW9uLnRvU3RyaW5nKDE2KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uVmFyaWFibGVzW1wiX3Jvb3RcIl0gIT0gdW5kZWZpbmVkICYmIGFjdGlvblZhcmlhYmxlc1tcIl9yb290XCJdW1wiYmVhdEJveFwiXSlcclxuICAgICAgICAgICAgICAgICAgICB0YWcuZG9JbmNsdWRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWcucG9vbCA9IGNvbnN0YW50UG9vbDtcclxuICAgICAgICAgICAgICAgIHRhZy52YXJpYWJsZXMgPSBhY3Rpb25WYXJpYWJsZXM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL3RhZy5kYXRhID0gYnVmZi5idWZmZXJfcmF3LnNsaWNlKGJ1ZmYucG9pbnRlciwgYnVmZi5wb2ludGVyICsgdGFnSGVhZGVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YWcuZG9JbmNsdWRlKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0YWcuZG9JbmNsdWRlO1xyXG4gICAgICAgICAgICB0YWdzLnB1c2godGFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1ZmYuc2Vlayh0YWdIZWFkZXIucG9zaXRpb24gKyB0YWdIZWFkZXIubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YWdzO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDb2xsZWN0aW9uIG9mIFNXRiB0YWdzIGFuZCB0YWcgdHlwZXMgdG8gYXNzaXN0IHdpdGggcmVhZGluZyBhbmQgcGFyc2luZyBhIC5zd2YgZmlsZS5cclxuICpcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU1dGVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVORDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgU0hPV0ZSQU1FOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyBET0FDVElPTjogbnVtYmVyID0gMTI7XHJcbiAgICBwdWJsaWMgc3RhdGljIERFRklORVNPVU5EOiBudW1iZXIgPSAxNDtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RSRUFNSEVBRDogbnVtYmVyID0gMTg7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUkVBTUJMT0NLOiBudW1iZXIgPSAxOTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RSRUFNSEVBRDI6IG51bWJlciA9IDQ1O1xyXG4gICAgcHVibGljIHN0YXRpYyBGSUxFQVRUUklCVVRFUzogbnVtYmVyID0gNjk7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZBY3Rpb25UYWdzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgRU5EOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBDT05TVEFOVFBPT0w6IG51bWJlciA9IDB4ODg7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBVU0g6IG51bWJlciA9IDB4OTY7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBPUDogbnVtYmVyID0gMHgxNztcclxuICAgIHB1YmxpYyBzdGF0aWMgRFVQTElDQVRFOiBudW1iZXIgPSAweDRDO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVE9SRV9SRUdJU1RFUjogbnVtYmVyID0gMHg4NztcclxuICAgIHB1YmxpYyBzdGF0aWMgR0VUX1ZBUklBQkxFOiBudW1iZXIgPSAweDFDO1xyXG4gICAgcHVibGljIHN0YXRpYyBTRVRfVkFSSUFCTEU6IG51bWJlciA9IDB4MUQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIElOSVRfQVJSQVk6IG51bWJlciA9IDB4NDI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdFVF9NRU1CRVI6IG51bWJlciA9IDB4NEU7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNFVF9NRU1CRVI6IG51bWJlciA9IDB4NEY7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZUeXBlVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUklOR19MSVRFUkFMOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBGTE9BVF9MSVRFUkFMOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyBOVUxMOiBudW1iZXIgPSAyO1xyXG4gICAgcHVibGljIHN0YXRpYyBVTkRFRklORUQ6IG51bWJlciA9IDM7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJFR0lTVEVSOiBudW1iZXIgPSA0O1xyXG4gICAgcHVibGljIHN0YXRpYyBCT09MRUFOOiBudW1iZXIgPSA1O1xyXG4gICAgcHVibGljIHN0YXRpYyBET1VCTEU6IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIElOVEVHRVI6IG51bWJlciA9IDc7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPTlNUQU5UODogbnVtYmVyID0gODtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RBTlQxNjogbnVtYmVyID0gOTtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNXRk90aGVyVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPREVDX01QMzogbnVtYmVyID0gMjtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFydGljbGUge1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvcjtcclxuICAgIHByaXZhdGUgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGNyZWF0aW9uVGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbG9yOiBwNS5Db2xvcjtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlU2l6ZTogbnVtYmVyID0gMjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvciwgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3IsIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3IsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24gPSBpbml0aWFsUG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5pbml0aWFsVmVsb2NpdHkgPSBpbml0aWFsVmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbiA9IGNvbnN0YW50QWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIHRoaXMuY3JlYXRpb25UaW1lSW5TZWNvbmRzID0gY3JlYXRpb25UaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBlbGFwc2VkVGltZSA9IHRoaXMuZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50UG9zaXRpb246IHA1LlZlY3RvciA9IHRoaXMuZ2V0UG9zaXRpb24ocCwgZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAubm9TdHJva2UoKTtcclxuICAgICAgICBwLmZpbGwoY29sb3IpO1xyXG4gICAgICAgIHAuY2lyY2xlKGN1cnJlbnRQb3NpdGlvbi54LCBjdXJyZW50UG9zaXRpb24ueSwgUGFydGljbGUucGFydGljbGVTaXplKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb24ocDogcDUsIGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdmVsb2NpdHlDb21wb25lbnQ6IHA1LlZlY3RvciA9IHA1LlZlY3Rvci5tdWx0KHRoaXMuaW5pdGlhbFZlbG9jaXR5LCBlbGFwc2VkVGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGFjY2VsZXJhdGlvbkNvbXBvbmVudDogcDUuVmVjdG9yID0gcDUuVmVjdG9yLm11bHQodGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbixcclxuICAgICAgICAgICAgZWxhcHNlZFRpbWVJblNlY29uZHMgKiBlbGFwc2VkVGltZUluU2Vjb25kcyAvIDIpO1xyXG4gICAgICAgIHJldHVybiBwNS5WZWN0b3IuYWRkKHA1LlZlY3Rvci5hZGQodGhpcy5pbml0aWFsUG9zaXRpb24sIHZlbG9jaXR5Q29tcG9uZW50KSwgYWNjZWxlcmF0aW9uQ29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZUluU2Vjb25kcyAtIHRoaXMuY3JlYXRpb25UaW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtQYXJ0aWNsZX0gZnJvbSBcIi4vcGFydGljbGVcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlU3lzdGVtIHtcclxuICAgIHByaXZhdGUgcGFydGljbGVzOiBQYXJ0aWNsZVtdO1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIHN0YXRpYyB2ZWxvY2l0eUFuZ2xlVmFyaWF0aW9uSW5EZWdyZWVzOiBudW1iZXIgPSAzMDtcclxuICAgIHByaXZhdGUgc3RhdGljIHZlbG9jaXR5TWFnbml0dWRlVmFyaWF0aW9uSW5QZXJjZW50OiBudW1iZXIgPSAzMDtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvbG9yVmFyaWF0aW9uOiBudW1iZXIgPSAzMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMgPSBwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24gPSBjb25zdGFudEFjY2VsZXJhdGlvbjtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5vbGRlc3RQYXJ0aWNsZUFnZShjdXJyZW50VGltZUluU2Vjb25kcykgPiB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVPbGRlc3RQYXJ0aWNsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZTogUGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpXTtcclxuICAgICAgICAgICAgbGV0IGFscGhhQWRqdXN0ZWRDb2xvcjogcDUuQ29sb3IgPSB0aGlzLmdldEFscGhhQWRqdXN0ZWRDb2xvcihwYXJ0aWNsZSwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICBwYXJ0aWNsZS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBhbHBoYUFkanVzdGVkQ29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9sZGVzdFBhcnRpY2xlQWdlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJ0aWNsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJ0aWNsZXNbMF0uZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVPbGRlc3RQYXJ0aWNsZSgpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zaGlmdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QWxwaGFBZGp1c3RlZENvbG9yKHBhcnRpY2xlOiBQYXJ0aWNsZSwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBiYXNlQ29sb3IgPSBwYXJ0aWNsZS5jb2xvcjtcclxuICAgICAgICBsZXQgcGFydGljbGVBZ2UgPSBwYXJ0aWNsZS5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGxpZmVSZW1haW5pbmdQZXJjZW50ID0gKHRoaXMucGFydGljbGVMaWZldGltZUluU2Vjb25kcyAtIHBhcnRpY2xlQWdlKSAvIHRoaXMucGFydGljbGVMaWZldGltZUluU2Vjb25kcztcclxuICAgICAgICBsZXQgYWxwaGEgPSB0aGlzLmludGVycG9sYXRlKDAsIDI1NSwgbGlmZVJlbWFpbmluZ1BlcmNlbnQpO1xyXG4gICAgICAgIGxldCBuZXdDb2xvcjogcDUuQ29sb3IgPSBwLmNvbG9yKGJhc2VDb2xvcik7XHJcbiAgICAgICAgbmV3Q29sb3Iuc2V0QWxwaGEoYWxwaGEpO1xyXG4gICAgICAgIHJldHVybiBuZXdDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVycG9sYXRlKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFJhbmRvbWl6ZWRQYXJ0aWNsZXMoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVBhcnRpY2xlczogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVBhcnRpY2xlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdJbml0YWxWZWxvY2l0eSA9IHRoaXMucmFuZG9taXplVmVjdG9yKHAsIGluaXRpYWxWZWxvY2l0eSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdDb2xvciA9IHRoaXMucmFuZG9taXplQ29sb3IocCwgY29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFBhcnRpY2xlKGluaXRpYWxQb3NpdGlvbiwgbmV3SW5pdGFsVmVsb2NpdHksIGNyZWF0aW9uVGltZUluU2Vjb25kcywgbmV3Q29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZVZlY3RvcihwOiBwNSwgYmFzZVZlY3RvcjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvblJhbmRvbWl6ZWQ6IHA1LlZlY3RvciA9IHRoaXMucmFuZG9taXplVmVjdG9yRGlyZWN0aW9uKHAsIGJhc2VWZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbWl6ZVZlY3Rvck1hZ25pdHVkZShwLCBkaXJlY3Rpb25SYW5kb21pemVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZVZlY3RvckRpcmVjdGlvbihwOiBwNSwgYmFzZVZlY3RvcjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICBsZXQgYW5nbGVJbkRlZ3JlZXMgPSBiYXNlVmVjdG9yLmhlYWRpbmcoKTtcclxuICAgICAgICBsZXQgYW5nbGVDaGFuZ2VJbkRlZ3JlZXMgPSBwLnJhbmRvbSgtUGFydGljbGVTeXN0ZW0udmVsb2NpdHlBbmdsZVZhcmlhdGlvbkluRGVncmVlcyAvIDIsXHJcbiAgICAgICAgICAgIFBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5QW5nbGVWYXJpYXRpb25JbkRlZ3JlZXMgLyAyKTtcclxuICAgICAgICBsZXQgZmluYWxBbmdsZUluUmFkaWFucyA9IHAucmFkaWFucyhhbmdsZUluRGVncmVlcyArIGFuZ2xlQ2hhbmdlSW5EZWdyZWVzKTtcclxuICAgICAgICBsZXQgbWFnbml0dWRlID0gYmFzZVZlY3Rvci5tYWcoKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgICAgIHJldHVybiBwNS5WZWN0b3IuZnJvbUFuZ2xlKGZpbmFsQW5nbGVJblJhZGlhbnMsIG1hZ25pdHVkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3JNYWduaXR1ZGUocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIGxldCBtYWduaXR1ZGVDaGFuZ2VJblBlcmNlbnQgPSBwLnJhbmRvbSgtUGFydGljbGVTeXN0ZW0udmVsb2NpdHlNYWduaXR1ZGVWYXJpYXRpb25JblBlcmNlbnQgLyAyLFxyXG4gICAgICAgICAgICBQYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eU1hZ25pdHVkZVZhcmlhdGlvbkluUGVyY2VudCAvIDIpO1xyXG4gICAgICAgIGxldCBmaW5hbE1hZ25pdHVkZSA9IGJhc2VWZWN0b3IubWFnKCkgKiAoMTAwICsgbWFnbml0dWRlQ2hhbmdlSW5QZXJjZW50KSAvIDEwMDtcclxuICAgICAgICByZXR1cm4gYmFzZVZlY3Rvci5zZXRNYWcoZmluYWxNYWduaXR1ZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9taXplQ29sb3IocDogcDUsIGJhc2VDb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgbmV3UmVkID0gdGhpcy5ib3VuZGVkUmFuZG9taXplKHAsIHAucmVkKGJhc2VDb2xvciksIFBhcnRpY2xlU3lzdGVtLmNvbG9yVmFyaWF0aW9uLCAwLCAyNTUpO1xyXG4gICAgICAgIGxldCBuZXdHcmVlbiA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLmdyZWVuKGJhc2VDb2xvciksIFBhcnRpY2xlU3lzdGVtLmNvbG9yVmFyaWF0aW9uLCAwLCAyNTUpO1xyXG4gICAgICAgIGxldCBuZXdCbHVlID0gdGhpcy5ib3VuZGVkUmFuZG9taXplKHAsIHAuYmx1ZShiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICByZXR1cm4gcC5jb2xvcihuZXdSZWQsIG5ld0dyZWVuLCBuZXdCbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJvdW5kZWRSYW5kb21pemUocDogcDUsIHZhbHVlOiBudW1iZXIsIHZhcmlhdGlvbjogbnVtYmVyLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlICsgcC5yYW5kb20oLXZhcmlhdGlvbiAvIDIsIHZhcmlhdGlvbiAvIDIpO1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA8PSBsb3dlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb3dlckJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJCb3VuZCA8IG5ld1ZhbHVlICYmIG5ld1ZhbHVlIDwgdXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQYXJ0aWNsZShpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvciwgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3IsIGNyZWF0aW9uVGltZUluU2Vjb25kczogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBQYXJ0aWNsZShpbml0aWFsUG9zaXRpb24sIGluaXRpYWxWZWxvY2l0eSwgdGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbiwgY3JlYXRpb25UaW1lSW5TZWNvbmRzLCBjb2xvcikpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFBsYXllcktleUFjdGlvbiB7XHJcbiAgICBnYW1lVGltZTogbnVtYmVyO1xyXG4gICAgdHJhY2s6IG51bWJlcjtcclxuICAgIGtleVN0YXRlOiBLZXlTdGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lVGltZTogbnVtYmVyLCB0cmFjazogbnVtYmVyLCBrZXlTdGF0ZTogS2V5U3RhdGUpIHtcclxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gZ2FtZVRpbWU7XHJcbiAgICAgICAgdGhpcy50cmFjayA9IHRyYWNrO1xyXG4gICAgICAgIHRoaXMua2V5U3RhdGUgPSBrZXlTdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gS2V5U3RhdGUge1xyXG4gICAgVVAsIERPV04sXHJcbn0iLCJpbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7RGlzcGxheUNvbmZpZywgRGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtUaW1lTWFuYWdlcn0gZnJvbSBcIi4vdGltZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7TWlzc01hbmFnZXJ9IGZyb20gXCIuL21pc3NfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbE1hbmFnZXJ9IGZyb20gXCIuL3Njcm9sbF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UmVzdWx0c0Rpc3BsYXl9IGZyb20gXCIuL3Jlc3VsdHNfZGlzcGxheVwiO1xyXG5pbXBvcnQge05vdGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyxcclxuICAgIGlzS2V5QmluZGluZ3NEZWZpbmVkLFxyXG4gICAgcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzLFxyXG4gICAgc2V0QWxsTm90ZXNUb0RlZmF1bHRTdGF0ZVxyXG59IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5U3RhdGUsIFBsYXllcktleUFjdGlvbn0gZnJvbSBcIi4vcGxheWVyX2tleV9hY3Rpb25cIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nLCBBY2N1cmFjeVJlY29yZGluZ1N0YXRlfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrVGV4dH0gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfdGV4dFwiO1xyXG5pbXBvcnQge1JlY2VwdG9yU2hyaW5rUmVhY3Rpb259IGZyb20gXCIuL3JlY2VwdG9yX3Nocmlua19yZWFjdGlvblwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RmVlZGJhY2tGbGFzaH0gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfZmxhc2hcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzfSBmcm9tIFwiLi9hY2N1cmFjeV9mZWVkYmFja19wYXJ0aWNsZXNcIjtcclxuaW1wb3J0IHtIb2xkUGFydGljbGVzfSBmcm9tIFwiLi9ob2xkX3BhcnRpY2xlc1wiO1xyXG5pbXBvcnQge0hvbGRHbG93fSBmcm9tIFwiLi9ob2xkX2dsb3dcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5aW5nRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIHNjZW5lOiBQNVNjZW5lO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHRpbWVNYW5hZ2VyOiBHYW1lVGltZVByb3ZpZGVyO1xyXG4gICAgcHJpdmF0ZSBtaXNzTWFuYWdlcjogTWlzc01hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBnYW1lRW5kVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzaG93UmVzdWx0c1NjcmVlbjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBpc0RlYnVnTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeUZlZWRiYWNrVGV4dDogQWNjdXJhY3lGZWVkYmFja1RleHQ7XHJcbiAgICBwcml2YXRlIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuICAgIHByaXZhdGUgcmVjZXB0b3JTaHJpbmtSZWFjdGlvbjogUmVjZXB0b3JTaHJpbmtSZWFjdGlvbjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lGZWVkYmFja0ZsYXNoOiBBY2N1cmFjeUZlZWRiYWNrRmxhc2g7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXM6IEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXM7XHJcbiAgICBwcml2YXRlIGhvbGRQYXJ0aWNsZXM6IEhvbGRQYXJ0aWNsZXM7XHJcbiAgICBwcml2YXRlIGhvbGRHbG93OiBIb2xkR2xvdztcclxuICAgIHByaXZhdGUgYXVkaW9GaWxlOiBBdWRpb0ZpbGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUsIGNvbmZpZzogQ29uZmlnLCBzY2VuZTogUDVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdHNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1ZGlvRmlsZSA9IGF1ZGlvRmlsZTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRpbWUgbWFuYWdlciBhbmQgcGxheSB0aGUgYXVkaW8gYXMgY2xvc2UgdG9nZXRoZXIgYXMgcG9zc2libGUgdG8gc3luY2hyb25pemUgdGhlIGF1ZGlvIHdpdGggdGhlIGdhbWVcclxuICAgICAgICBpZiAoIXRoaXMuaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBUaW1lTWFuYWdlcihwZXJmb3JtYW5jZS5ub3coKSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvRmlsZS5wbGF5KGNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5ldyBOb3RlTWFuYWdlcih0cmFja3MpO1xyXG4gICAgICAgIGxldCBudW1UcmFja3M6IG51bWJlciA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gbmV3IEFjY3VyYWN5UmVjb3JkaW5nKG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IDI0MDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gNDgwO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WCA9ICh0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLndpZHRoIC0gd2lkdGgpIC8gMjtcclxuICAgICAgICBsZXQgdG9wTGVmdFkgPSAodGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZS5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSBuZXcgUGxheWluZ0NvbmZpZyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuZGlzcGxheUNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSxcclxuICAgICAgICAgICAgdG9wTGVmdFgsIHRvcExlZnRZLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzID0gbmV3IEhvbGRQYXJ0aWNsZXModGhpcy5jb25maWcsIG51bVRyYWNrcywgdGhpcy5kaXNwbGF5TWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5ob2xkR2xvdyA9IG5ldyBIb2xkR2xvdyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzLCB0aGlzLmRpc3BsYXlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gbmV3IEhvbGRNYW5hZ2VyKG51bVRyYWNrcywgdGhpcy5vblRyYWNrSG9sZC5iaW5kKHRoaXMpLCB0aGlzLm9uVHJhY2tVbmhvbGQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZU1hbmFnZXIgPSBuZXcgU2Nyb2xsTWFuYWdlcih0aGlzLmNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdhbWVFbmRUaW1lID0gdGhpcy5jYWxjdWxhdGVHYW1lRW5kKHRoaXMuYXVkaW9GaWxlLmdldER1cmF0aW9uKCksIHRoaXMuZ2V0Tm90ZXNFbmRUaW1lKCkpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyID0gbmV3IEFjY3VyYWN5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmNvbmZpZywgdGhpcy5ob2xkTWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIgPSBuZXcgTWlzc01hbmFnZXIodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuaG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrVGV4dCA9IG5ldyBBY2N1cmFjeUZlZWRiYWNrVGV4dCh0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0b3BMZWZ0WCArIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgdG9wTGVmdFkgKyBoZWlnaHQgLyAyLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2ggPSBuZXcgQWNjdXJhY3lGZWVkYmFja0ZsYXNoKHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlNYW5hZ2VyLFxyXG4gICAgICAgICAgICBudW1UcmFja3MpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbiA9IG5ldyBSZWNlcHRvclNocmlua1JlYWN0aW9uKHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlDb25maWcsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzID0gbmV3IEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXModGhpcy5jb25maWcsIHRoaXMuZGlzcGxheU1hbmFnZXIsIG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGlmICghaXNLZXlCaW5kaW5nc0RlZmluZWQobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplS2V5QmluZGluZ3MobnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iaW5kS2V5QmluZGluZ3NUb0FjdGlvbnMoKTtcclxuICAgICAgICBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzKTtcclxuICAgICAgICByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXModGhpcy5ub3RlTWFuYWdlci50cmFja3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUcmFjayAjXCIgKyAoYWNjdXJhY3lFdmVudC50cmFja051bWJlciArIDEpICsgXCIgXCIgKyBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TmFtZSArXHJcbiAgICAgICAgLy8gICAgIChNYXRoLmFicyhhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzKSA9PSBJbmZpbml0eSA/XHJcbiAgICAgICAgLy8gICAgICAgICBcIlwiIDpcclxuICAgICAgICAvLyAgICAgICAgIFwiIChcIiArIE1hdGgucm91bmQoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcykgKyBcIiBtcylcIikpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuYWRkUGFydGljbGVzRm9yQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVJblNlY29uZHMgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJblNlY29uZHMgPj0gdGhpcy5nYW1lRW5kVGltZSAmJiAhdGhpcy5zaG93UmVzdWx0c1NjcmVlbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnN0YXRlID0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZS5SRUFEWTtcclxuICAgICAgICAgICAgdGhpcy5lbmRTb25nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIudXBkYXRlKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5kcmF3KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tUZXh0LmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2guZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3Rlc0VuZFRpbWUoKSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0QWNjdXJhY3k6IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlYXJsaWVzdEFjY3VyYWN5ID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWFybGllc3RBY2N1cmFjeSA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlTWFuYWdlci5nZXRMYXRlc3ROb3RlKCkudGltZUluU2Vjb25kcyArIGVhcmxpZXN0QWNjdXJhY3kgLyAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlR2FtZUVuZChhdWRpb0R1cmF0aW9uOiBudW1iZXIsIG5vdGVzRW5kVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGF1ZGlvRHVyYXRpb24gPCBub3Rlc0VuZFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vdGVzRW5kVGltZSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihub3Rlc0VuZFRpbWUgKyA1LCBhdWRpb0R1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuZFNvbmcoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb0ZpbGUuc3RvcCgpO1xyXG4gICAgICAgIGdsb2JhbC5yZXN1bHRzRGlzcGxheSA9IG5ldyBSZXN1bHRzRGlzcGxheSh0aGlzLmNvbmZpZywgdGhpcy5ub3RlTWFuYWdlciwgdGhpcy5hY2N1cmFjeU1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlJFU1VMVFMpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kS2V5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmluZEtleUJpbmRpbmdzVG9BY3Rpb25zKCkge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5ncyA9IGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgbGV0IGlzU3BhY2ViYXJCb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBzcGFjZWJhcktleUNvZGU6IG51bWJlciA9IDMyO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5QmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleUJpbmRpbmc6IEtleUJpbmRpbmcgPSBrZXlCaW5kaW5nc1tpXTtcclxuICAgICAgICAgICAgaWYgKGtleUJpbmRpbmcua2V5Q29kZSA9PT0gc3BhY2ViYXJLZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpc1NwYWNlYmFyQm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oa2V5QmluZGluZy5rZXlDb2RlLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5RG93bkFjdGlvbkZvclRyYWNrKGtleUJpbmRpbmcudHJhY2tOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5VXBBY3Rpb25Gb3JUcmFjayhrZXlCaW5kaW5nLnRyYWNrTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oZ2xvYmFsLmNvbmZpZy5xdWl0S2V5LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kU29uZygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWlzU3BhY2ViYXJCb3VuZCkge1xyXG4gICAgICAgICAgICAvLyBiaW5kIGtleSB0byBub3RoaW5nIHRvIG1ha2Ugc3VyZSB0aGUgZGVmYXVsdCBiZWhhdmlvciBpcyBwcmV2ZW50ZWRcclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbihzcGFjZWJhcktleUNvZGUsICgpID0+IHt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBrZXlEb3duQWN0aW9uRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5ob2xkVHJhY2sodHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJLZXlBY3Rpb246IFBsYXllcktleUFjdGlvbiA9XHJcbiAgICAgICAgICAgIG5ldyBQbGF5ZXJLZXlBY3Rpb24odGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZShwZXJmb3JtYW5jZS5ub3coKSksIHRyYWNrTnVtYmVyLCBLZXlTdGF0ZS5ET1dOKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlci5oYW5kbGVQbGF5ZXJBY3Rpb24ocGxheWVyS2V5QWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGtleVVwQWN0aW9uRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5yZWxlYXNlVHJhY2sodHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJLZXlBY3Rpb246IFBsYXllcktleUFjdGlvbiA9XHJcbiAgICAgICAgICAgIG5ldyBQbGF5ZXJLZXlBY3Rpb24odGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZShwZXJmb3JtYW5jZS5ub3coKSksIHRyYWNrTnVtYmVyLCBLZXlTdGF0ZS5VUCk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIuaGFuZGxlUGxheWVyQWN0aW9uKHBsYXllcktleUFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNrSG9sZCh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZEdsb3cuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkR2xvdywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzLmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZFBhcnRpY2xlcywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNrVW5ob2xkKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy51bmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZEdsb3csIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy51bmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZFBhcnRpY2xlcywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmJpbmRLZXlzKCkge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5ncyA9IGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlCaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZzogS2V5QmluZGluZyA9IGtleUJpbmRpbmdzW2ldO1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KGtleUJpbmRpbmcua2V5Q29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQbGF5aW5nQ29uZmlnIGltcGxlbWVudHMgRGlzcGxheUNvbmZpZyB7XHJcbiAgICBwdWJsaWMgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWNlcHRvcllQZXJjZW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBwdWJsaWMgcmVjZXB0b3JTaXplczogbnVtYmVyW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvcllQZXJjZW50ID0gY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaXplcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzLnB1c2goY29uZmlnLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90ZVNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaXhlbHNQZXJTZWNvbmQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVjZXB0b3JTaXplcygpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZXB0b3JTaXplcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWNlcHRvcllQZXJjZW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZXB0b3JZUGVyY2VudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY3JvbGxEaXJlY3Rpb24oKTogU2Nyb2xsRGlyZWN0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxEaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UmVjZXB0b3JTaXplKHRyYWNrTnVtYmVyOiBudW1iZXIsIHJlY2VwdG9yU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzW3RyYWNrTnVtYmVyXSA9IHJlY2VwdG9yU2l6ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4uL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXJzaW5nSGVscGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgYmVhdG1hcFRvVHJhY2tBcnJheShiZWF0bWFwOiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ11bXSkge1xyXG4gICAgICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gW1tdLCBbXSwgW10sIFtdXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJlYXRtYXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJlYXRtYXBSb3cgPSBiZWF0bWFwW2ldO1xyXG4gICAgICAgICAgICBsZXQgdHJhY2tOdW1iZXIgPSB0aGlzLnRyYWNrTnVtYmVyRnJvbURpcmVjdGlvbihiZWF0bWFwUm93WzFdKTtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSB0aGlzLm5vdGVGcm9tQmVhdG1hcFJvdyhiZWF0bWFwUm93KTtcclxuICAgICAgICAgICAgdHJhY2tzW3RyYWNrTnVtYmVyXS5wdXNoKG5vdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBub3RlRnJvbUJlYXRtYXBSb3cocm93OiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ10pOiBOb3RlIHtcclxuICAgICAgICBsZXQgdGltZUluU2Vjb25kcyA9IHJvd1swXSAvIDMwO1xyXG4gICAgICAgIHJldHVybiB7dGltZUluU2Vjb25kczogdGltZUluU2Vjb25kcywgdHlwZTogTm90ZVR5cGUuTk9STUFMLCBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFQsIHR5cGVTdHJpbmc6IFwiTi9BXCJ9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHRyYWNrTnVtYmVyRnJvbURpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcIkxcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVua25vd24gdHJhY2sgZGlyZWN0aW9uICdcIiArIGRpcmVjdGlvbiArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge1Nvbmd9IGZyb20gXCIuL3NvbmdcIjtcclxuaW1wb3J0IHtQbGF5bGlzdENsaWVudFN0YXRlfSBmcm9tIFwiLi9wbGF5bGlzdF9jbGllbnRfc3RhdGVcIjtcclxuaW1wb3J0IHtnZXRDb250ZW50c0J5VGFnTmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge3BhcnNlU3dmRnJvbUFycmF5QnVmZmVyLCBTd2ZQYXJzZVJlc3BvbnNlfSBmcm9tIFwiLi4vcGFyc2luZy9wYXJzZV9zd2ZcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5bGlzdENsaWVudCB7XHJcbiAgICBwcml2YXRlIHN0YXRlOiBQbGF5bGlzdENsaWVudFN0YXRlO1xyXG4gICAgcHJpdmF0ZSBjb3JzV29ya2Fyb3VuZDogc3RyaW5nID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tLyc7XHJcbiAgICBwcml2YXRlIHNvbmdVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgcGxheWxpc3RVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgcGxheWxpc3Q6IFNvbmdbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5OT19BUElTO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTdGF0ZSgpOiBQbGF5bGlzdENsaWVudFN0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGxheWxpc3QoKTogU29uZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5bGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShpbmRleFVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkQXBpcyhpbmRleFVybCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFBsYXlsaXN0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGxvYWRBcGlzKGluZGV4VXJsOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QUk9DRVNTSU5HO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldChpbmRleFVybClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4gdGhpcy5zYXZlQXBpc0Zyb21QbGF5bGlzdEluZGV4KHJlcXVlc3QpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGUpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVBcGlzRnJvbVBsYXlsaXN0SW5kZXgocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgcmVzcG9uc2VYbWw6IERvY3VtZW50ID0gcmVxdWVzdC5yZXNwb25zZVhNTDtcclxuICAgICAgICB0aGlzLnNvbmdVcmwgPSBnZXRDb250ZW50c0J5VGFnTmFtZShyZXNwb25zZVhtbCwgXCJzb25nVVJMXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWxpc3RVcmwgPSBnZXRDb250ZW50c0J5VGFnTmFtZShyZXNwb25zZVhtbCwgXCJwbGF5bGlzdFVSTFwiKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5BUElTX0xPQURFRDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGxvYWRQbGF5bGlzdCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QUk9DRVNTSU5HO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldCh0aGlzLnBsYXlsaXN0VXJsKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB0aGlzLnNhdmVQbGF5bGlzdChyZXF1ZXN0KSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlKTtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlUGxheWxpc3QocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgcGxheWxpc3RUZXh0OiBzdHJpbmcgPSByZXF1ZXN0LnJlc3BvbnNlO1xyXG5cclxuICAgICAgICAvLyByZXBsYWNlIGFtcGVyc2FuZHMgYmVjYXVzZSB0aGUgRE9NUGFyc2VyIGRvZXNuJ3QgbGlrZSB0aGVtXHJcbiAgICAgICAgcGxheWxpc3RUZXh0ID0gcGxheWxpc3RUZXh0LnJlcGxhY2UoLyYvZywgJyZhbXA7Jyk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5bGlzdFhtbDogRG9jdW1lbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHBsYXlsaXN0VGV4dCwgXCJ0ZXh0L3htbFwiKTtcclxuICAgICAgICBsZXQgc29uZ3M6IFNvbmdbXSA9IHRoaXMuZ2V0U29uZ3NGcm9tUGxheWxpc3RYbWwocGxheWxpc3RYbWwpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVNvbmdzSWZWYWxpZChzb25ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTb25nc0Zyb21QbGF5bGlzdFhtbChwbGF5bGlzdFhtbDogRG9jdW1lbnQpOiBTb25nW10ge1xyXG4gICAgICAgIGxldCBzb25nc1htbDogSFRNTENvbGxlY3Rpb24gPSBwbGF5bGlzdFhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNvbmdcIik7XHJcbiAgICAgICAgbGV0IHNvbmdzOiBTb25nW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvbmdzWG1sLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzb25nWG1sOiBFbGVtZW50ID0gc29uZ3NYbWwuaXRlbShpKTtcclxuICAgICAgICAgICAgbGV0IHNvbmc6IFNvbmcgPSBTb25nLm9mWG1sKHNvbmdYbWwpO1xyXG4gICAgICAgICAgICBzb25ncy5wdXNoKHNvbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc29uZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlU29uZ3NJZlZhbGlkKHNvbmdzOiBTb25nW10pIHtcclxuICAgICAgICBpZiAoc29uZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IFwiTG9hZGVkIGEgcGxheWxpc3Qgd2l0aCBubyBzb25ncy5cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QTEFZTElTVF9MT0FERUQ7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWxpc3QgPSBzb25ncztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFN3Zihzb25nSW5kZXg6IG51bWJlcik6IFByb21pc2U8U3dmUGFyc2VSZXNwb25zZT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBQbGF5bGlzdENsaWVudFN0YXRlLlBST0NFU1NJTkc7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldCh0aGlzLmdldExldmVsVXJsKHNvbmdJbmRleCksIFwiYXJyYXlidWZmZXJcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4gdGhpcy5nZXRQYXJzZWRTd2YocmVxdWVzdCkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlsaXN0Q2xpZW50U3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGV2ZWxVcmwoc29uZ0luZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzb25nOiBTb25nID0gdGhpcy5wbGF5bGlzdFtzb25nSW5kZXhdO1xyXG4gICAgICAgIGxldCBsZXZlbDogc3RyaW5nID0gc29uZy5sZXZlbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb25nVXJsICsgXCJsZXZlbF9cIiArIGxldmVsICsgXCIuc3dmXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQYXJzZWRTd2YocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgcGFyc2VkU3dmID0gcGFyc2VTd2ZGcm9tQXJyYXlCdWZmZXIoPEFycmF5QnVmZmVyPiByZXF1ZXN0LnJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUGxheWxpc3RDbGllbnRTdGF0ZS5QTEFZTElTVF9MT0FERUQ7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlZFN3ZjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldCh1cmw6IHN0cmluZywgcmVzcG9uc2VUeXBlPzogWE1MSHR0cFJlcXVlc3RSZXNwb25zZVR5cGUpOiBQcm9taXNlPFhNTEh0dHBSZXF1ZXN0PiB7XHJcbiAgICAgICAgbGV0IGdldFVybCA9IHRoaXMuY29yc1dvcmthcm91bmQgKyB1cmw7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3Q6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgZ2V0VXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB0aGUgcmVxdWVzdCBsb2FkcywgY2hlY2sgd2hldGhlciBpdCB3YXMgc3VjY2Vzc2Z1bFxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBzdWNjZXNzZnVsLCByZXNvbHZlIHRoZSBwcm9taXNlIGJ5IHBhc3NpbmcgYmFjayB0aGUgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGZhaWxzLCByZWplY3QgdGhlIHByb21pc2Ugd2l0aCBhIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IoXCJHZXQgcmVxdWVzdCBmYWlsZWQgd2l0aCBlcnJvciBjb2RlOlwiICsgcmVxdWVzdC5zdGF0dXNUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxzbyBkZWFsIHdpdGggdGhlIGNhc2Ugd2hlbiB0aGUgZW50aXJlIHJlcXVlc3QgZmFpbHMgdG8gYmVnaW4gd2l0aFxyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBhIG5ldHdvcmsgZXJyb3IsIHNvIHJlamVjdCB0aGUgcHJvbWlzZSB3aXRoIGFuIGFwcHJvcHJpYXRlIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcignVGhlcmUgd2FzIGEgbmV0d29yayBlcnJvci4nKSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGU6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gUGxheWxpc3RDbGllbnRTdGF0ZSB7XHJcbiAgICBOT19BUElTLFxyXG4gICAgQVBJU19MT0FERUQsXHJcbiAgICBQTEFZTElTVF9MT0FERUQsXHJcbiAgICBQUk9DRVNTSU5HLFxyXG4gICAgRVJST1JcclxufVxyXG4iLCJpbXBvcnQge2dldENvbnRlbnRzQnlUYWdOYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU29uZyB7XHJcbiAgICBwdWJsaWMgZ2VucmU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzb25nTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdBdXRob3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nQXV0aG9yVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ0RpZmZpY3VsdHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzb25nU3R5bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nTGVuZ3RoOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ1N0ZXBhdXRob3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBsZXZlbDogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgb2ZYbWwoeG1sOiBFbGVtZW50KTogU29uZyB7XHJcbiAgICAgICAgbGV0IHNvbmcgPSBuZXcgU29uZygpO1xyXG4gICAgICAgIHNvbmcuZ2VucmUgPSBwYXJzZUludCh4bWwuZ2V0QXR0cmlidXRlKFwiZ2VucmVcIikpO1xyXG4gICAgICAgIHNvbmcuc29uZ05hbWUgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ25hbWVcIik7XHJcbiAgICAgICAgc29uZy5zb25nQXV0aG9yID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdhdXRob3JcIik7XHJcbiAgICAgICAgc29uZy5zb25nQXV0aG9yVXJsID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdhdXRob3J1cmxcIik7XHJcbiAgICAgICAgc29uZy5zb25nRGlmZmljdWx0eSA9IHBhcnNlSW50KGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nZGlmZmljdWx0eVwiKSk7XHJcbiAgICAgICAgc29uZy5zb25nU3R5bGUgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ3N0eWxlXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0xlbmd0aCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nbGVuZ3RoXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ1N0ZXBhdXRob3IgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ3N0ZXBhdXRob3JcIik7XHJcbiAgICAgICAgc29uZy5sZXZlbCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJsZXZlbFwiKTtcclxuICAgICAgICByZXR1cm4gc29uZztcclxuICAgIH1cclxufVxyXG4iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbDogRWxlbWVudCB8IERvY3VtZW50LCB0YWc6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpWzBdLmlubmVySFRNTDtcclxufVxyXG4iLCJpbXBvcnQge0Rpc3BsYXlDb25maWcsIERpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UDVTY2VuZX0gZnJvbSBcIi4vcDVfc2NlbmVcIjtcclxuaW1wb3J0IHtTY3JvbGxNYW5hZ2VyfSBmcm9tIFwiLi9zY3JvbGxfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByZXZpZXdEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgc2NlbmU6IFA1U2NlbmU7XHJcbiAgICBjb25maWc6IENvbmZpZztcclxuICAgIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc2Nyb2xsTWFuYWdlcjogU2Nyb2xsTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WCA9IDY1O1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WSA9IDQ2O1xyXG4gICAgcHJpdmF0ZSB3aWR0aCA9IDIwMDtcclxuICAgIHByaXZhdGUgaGVpZ2h0ID0gNDAwO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNrczogTm90ZVtdW10sIGNvbmZpZzogQ29uZmlnLCBzY2VuZTogUDVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbmV3IE5vdGVNYW5hZ2VyKHRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxNYW5hZ2VyID0gbmV3IFNjcm9sbE1hbmFnZXIodGhpcy5jb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsIHRoaXMuZ2V0Qm91bmRzKCkpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IHRoaXMuZ2V0RGlzcGxheUNvbmZpZyh0aGlzLmNvbmZpZywgdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuZGlzcGxheUNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSxcclxuICAgICAgICAgICAgdGhpcy50b3BMZWZ0WCwgdGhpcy50b3BMZWZ0WSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlci5kcmF3KHRoaXMuc2Nyb2xsTWFuYWdlci5nZXRHYW1lVGltZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJvdW5kcygpIHtcclxuICAgICAgICByZXR1cm4ge3RvcExlZnRYOiB0aGlzLnRvcExlZnRYLCB0b3BMZWZ0WTogdGhpcy50b3BMZWZ0WSwgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheUNvbmZpZyhjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpOiBEaXNwbGF5Q29uZmlnIHtcclxuICAgICAgICBsZXQgcmVjZXB0b3JTaXplczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlY2VwdG9yU2l6ZXMucHVzaChjb25maWcubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0Tm90ZVNpemU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBpeGVsc1BlclNlY29uZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFJlY2VwdG9yWVBlcmNlbnQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcucmVjZXB0b3JZUGVyY2VudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0U2Nyb2xsRGlyZWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnNjcm9sbERpcmVjdGlvbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UmVjZXB0b3JTaXplczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VwdG9yU2l6ZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJlY2VwdG9yU2l6ZTogKHRyYWNrTnVtYmVyOiBudW1iZXIsIHJlY2VwdG9yU2l6ZTogbnVtYmVyKSA9PiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Rpc3BsYXlDb25maWd9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlY2VwdG9yU2hyaW5rUmVhY3Rpb24ge1xyXG4gICAgcHJpdmF0ZSB0cmFja0hvbGRTdGF0ZXM6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IGRpc3BsYXlDb25maWc7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzLnB1c2goZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlc1t0cmFja051bWJlcl0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzW3RyYWNrTnVtYmVyXSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBudW1SZWNlcHRvcnMgPSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JTaXplcygpLmxlbmd0aDtcclxuICAgICAgICBsZXQgc2hyaW5rID0gMC43O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUmVjZXB0b3JzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpemVSYXRpbyA9IHRoaXMuaXNUcmFja0hlbGQoaSkgPyBzaHJpbmsgOiAxLjA7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZy5zZXRSZWNlcHRvclNpemUoaSwgdGhpcy5jb25maWcubm90ZVNpemUgKiBzaXplUmF0aW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFja0hvbGRTdGF0ZXNbdHJhY2tOdW1iZXJdO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7ZHJhd0FjY3VyYWN5QmFyc30gZnJvbSBcIi4vZHJhd2luZ191dGlsXCI7XHJcbmltcG9ydCB7QWNjdXJhY3ksIEFjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bHRzRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIHA6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyLCBwOiBwNSxcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlciA9IGFjY3VyYWN5TWFuYWdlcjtcclxuICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0FjY3VyYWN5UmVzdWx0cyh0aGlzLnAsIHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBY2N1cmFjeVJlc3VsdHMocDogcDUsIGFjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHAud2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gcC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIGxldCBiYXJXaWR0aCA9IHAud2lkdGggKiAwLjY7XHJcbiAgICAgICAgbGV0IGJhckhlaWdodCA9IGJhcldpZHRoIC8gMTA7XHJcbiAgICAgICAgbGV0IGxlZnRMYWJlbEhlaWdodCA9IDAuOCAqIGJhckhlaWdodDtcclxuICAgICAgICBsZXQgYWNjdXJhY3lMaXN0Rm9yUmVzdWx0cyA9IHRoaXMuZ2V0UmVzdWx0c0FjY3VyYWN5TGlzdChhY2N1cmFjeVNldHRpbmdzKTtcclxuICAgICAgICBkcmF3QWNjdXJhY3lCYXJzKHAsIGFjY3VyYWN5TGlzdEZvclJlc3VsdHMsIGFjY3VyYWN5UmVjb3JkaW5nLCBjZW50ZXJYLCBjZW50ZXJZLCBsZWZ0TGFiZWxIZWlnaHQsIGJhcldpZHRoLFxyXG4gICAgICAgICAgICBiYXJIZWlnaHQsIG5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlci5pc0NvbmZpZ3VyZWRGb3JCb29zKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybiBhIGxpc3Qgb2YgdW5pcXVlIGFjY3VyYWNpZXMgc29ydGVkIGJ5IHRoZSBvZmZzZXQsIHdpdGggdGhlIGJlc3QgYWNjdXJhY3kgYmVpbmcgZmlyc3RcclxuICAgIHByaXZhdGUgZ2V0UmVzdWx0c0FjY3VyYWN5TGlzdChhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPSBhY2N1cmFjeVNldHRpbmdzLm1hcChhY2N1cmFjeSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGFjY3VyYWN5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICBzb3J0VmFsdWU6IHRoaXMuZ2V0QWNjdXJhY3lTb3J0aW5nVmFsdWUoYWNjdXJhY3kubG93ZXJCb3VuZCwgYWNjdXJhY3kudXBwZXJCb3VuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWVyZ2VkQWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID1cclxuICAgICAgICAgICAgdGhpcy5tZXJnZUFjY3VyYWNpZXNXaXRoU2FtZU5hbWUoYWNjdXJhY3lUYWJsZSk7XHJcbiAgICAgICAgbWVyZ2VkQWNjdXJhY3lUYWJsZS5zb3J0KHRoaXMuYWNjdXJhY3lUYWJsZVNvcnRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZEFjY3VyYWN5VGFibGUubWFwKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFjY3VyYWN5U29ydGluZ1ZhbHVlKGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGxvd2VyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModXBwZXJCb3VuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cHBlckJvdW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKGxvd2VyQm91bmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoKHVwcGVyQm91bmQgKyBsb3dlckJvdW5kKSAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWVyZ2VBY2N1cmFjaWVzV2l0aFNhbWVOYW1lKGFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmc7IHNvcnRWYWx1ZTogbnVtYmVyIH1bXSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRBY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPSBbXTtcclxuICAgICAgICB3aGlsZSAoYWNjdXJhY3lUYWJsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlBY2N1cmFjeU5hbWUgPSBhY2N1cmFjeVRhYmxlWzBdLmFjY3VyYWN5TmFtZTtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRBY2N1cmFjaWVzID0gYWNjdXJhY3lUYWJsZS5maWx0ZXIocm93ID0+IHJvdy5hY2N1cmFjeU5hbWUgPT09IGtleUFjY3VyYWN5TmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBzb3J0VmFsdWVBdmVyYWdlID0gbWF0Y2hlZEFjY3VyYWNpZXNcclxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChzdW0sIHJvdykgPT4gc3VtICsgcm93LnNvcnRWYWx1ZSwgMClcclxuICAgICAgICAgICAgICAgIC8gbWF0Y2hlZEFjY3VyYWNpZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBtZXJnZWRBY2N1cmFjeVRhYmxlLnB1c2goe2FjY3VyYWN5TmFtZToga2V5QWNjdXJhY3lOYW1lLCBzb3J0VmFsdWU6IHNvcnRWYWx1ZUF2ZXJhZ2V9KTtcclxuICAgICAgICAgICAgYWNjdXJhY3lUYWJsZSA9IGFjY3VyYWN5VGFibGUuZmlsdGVyKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lICE9PSBrZXlBY2N1cmFjeU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVyZ2VkQWNjdXJhY3lUYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFjY3VyYWN5VGFibGVTb3J0RnVuY3Rpb24oYTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgcmV0dXJuIGEuc29ydFZhbHVlIC0gYi5zb3J0VmFsdWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZW51bSBTY3JvbGxEaXJlY3Rpb24ge1xyXG4gICAgVXAsXHJcbiAgICBEb3duLFxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7VGltZU1hbmFnZXJ9IGZyb20gXCIuL3RpbWVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsTWFuYWdlciBpbXBsZW1lbnRzIEdhbWVUaW1lUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgc3lzdGVtVGltZU1pbGxpczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0aW1lTWFuYWdlcjogVGltZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHNjcm9sbEJvdW5kczogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBwOiBwNSwgc2Nyb2xsQm91bmRzPzogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFRpbWVNYW5hZ2VyKDAsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLnNjcm9sbEJvdW5kcyA9IHNjcm9sbEJvdW5kcztcclxuICAgICAgICBwLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiAoZTogV2hlZWxFdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgYWxsb3dTY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbEJvdW5kcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3VzZUlzSW5Cb3VuZHMocCwgdGhpcy5zY3JvbGxCb3VuZHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1Njcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVDaGFuZ2VNaWxsaXMgPSBlLmRlbHRhWSAqIDAuMjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzIC09IHRpbWVDaGFuZ2VNaWxsaXM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyArPSB0aW1lQ2hhbmdlTWlsbGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFsbG93IGFuIGlnbm9yZWQgYXJndW1lbnQgc28gaXQgY2FuIGJlIHVzZWQgaW4gcGxhY2Ugb2YgYSBUaW1lTWFuYWdlciBmb3IgZGVidWcgbW9kZVxyXG4gICAgZ2V0R2FtZVRpbWUoaWdub3JlZEFyZ3VtZW50PzogYW55KSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHRoaXMuc3lzdGVtVGltZU1pbGxpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3VzZUlzSW5Cb3VuZHMocDogcDUsIGJvdW5kczogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSB7XHJcbiAgICAgICAgaWYgKHAubW91c2VYID49IGJvdW5kcy50b3BMZWZ0WCAmJiBwLm1vdXNlWCA8PSBib3VuZHMudG9wTGVmdFggKyBib3VuZHMud2lkdGggJiZcclxuICAgICAgICAgICAgcC5tb3VzZVkgPj0gYm91bmRzLnRvcExlZnRZICYmIHAubW91c2VZIDw9IGJvdW5kcy50b3BMZWZ0WSArIGJvdW5kcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtGdWxsUGFyc2UsIGdldEZ1bGxQYXJzZSwgZ2V0UGFydGlhbFBhcnNlLCBOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlLCBQYXJ0aWFsUGFyc2V9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtQYXJzaW5nSGVscGVyfSBmcm9tIFwiLi9wbGF5bGlzdF9jbGllbnQvcGFyc2luZ19oZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0ZXBmaWxlU3RhdGUge1xyXG4gICAgTk9fU1RFUEZJTEUsXHJcbiAgICBET05FX1JFQURJTkcsXHJcbiAgICBQQVJUSUFMTFlfUEFSU0VELFxyXG4gICAgRlVMTFlfUEFSU0VELFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGVwZmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IFN0ZXBmaWxlU3RhdGU7XHJcbiAgICBwdWJsaWMgZmlsZTogRmlsZTtcclxuICAgIHB1YmxpYyBwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZTtcclxuICAgIHB1YmxpYyBmdWxsUGFyc2U6IEZ1bGxQYXJzZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuTk9fU1RFUEZJTEU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRGaWxlKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlLmZpbGU7IC8vIHRoaXMgdW53cmFwcyB0aGUgcDUuRmlsZSB3cmFwcGVyIHRvIGdldCB0aGUgb3JpZ2luYWwgRE9NIGZpbGVcclxuICAgICAgICB0aGlzLmxvYWRUZXh0RmlsZSh0aGlzLmZpbGUsICgoZXZlbnQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpYWxQYXJzZSA9IGdldFBhcnRpYWxQYXJzZSg8c3RyaW5nPmV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0aWFsUGFyc2UubW9kZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkRmZyQmVhdG1hcChiZWF0bWFwOiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ11bXSkge1xyXG4gICAgICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gUGFyc2luZ0hlbHBlci5iZWF0bWFwVG9UcmFja0FycmF5KGJlYXRtYXApO1xyXG5cclxuICAgICAgICBsZXQgcGFydGlhbFBhcnNlID0gbmV3IFBhcnRpYWxQYXJzZSgpO1xyXG4gICAgICAgIHBhcnRpYWxQYXJzZS5tb2RlcyA9IFtuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpXTtcclxuICAgICAgICBwYXJ0aWFsUGFyc2UubWV0YURhdGEgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMucGFydGlhbFBhcnNlID0gcGFydGlhbFBhcnNlO1xyXG5cclxuICAgICAgICBsZXQgZnVsbFBhcnNlID0gbmV3IEZ1bGxQYXJzZShwYXJ0aWFsUGFyc2UpO1xyXG4gICAgICAgIGZ1bGxQYXJzZS50cmFja3MgPSB0cmFja3M7XHJcbiAgICAgICAgdGhpcy5mdWxsUGFyc2UgPSBmdWxsUGFyc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluaXNoUGFyc2luZyhtb2RlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQgfHwgdGhpcy5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5mdWxsUGFyc2UgPSBnZXRGdWxsUGFyc2UobW9kZUluZGV4LCB0aGlzLnBhcnRpYWxQYXJzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkVGV4dEZpbGUoXHJcbiAgICAgICAgZmlsZTogRmlsZSxcclxuICAgICAgICBsaXN0ZW5lcjogKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiBhbnksXHJcbiAgICAgICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc1xyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcclxuICAgICAgICBmaWxlUmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGVudW0gVGlja2VyU3RhdGUge1xyXG4gICAgSU5GT1JNQVRJT04sXHJcbiAgICBFUlJPUixcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRpY2tlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBpbmZvcm1hdGlvbkNsYXNzID0gXCJ0aWNrZXItaW5mb1wiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZXJyb3JDbGFzcyA9IFwidGlja2VyLWVycm9yXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBkaXY6IHA1LkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBzcGFuOiBwNS5FbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3RhdGU6IFRpY2tlclN0YXRlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGRlZmF1bHRNZXNzYWdlOiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgdGlja2VyU3BhbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgZGVmYXVsdE1lc3NhZ2UpO1xyXG4gICAgICAgIH0sIFwidGlja2VyU3BhblwiKTtcclxuICAgICAgICBsZXQgdGlja2VyRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICB9LCBcInRpY2tlckRpdlwiKTtcclxuICAgICAgICBpZiAodGhpcy5pc0luaXRpYWxpemluZyh0aWNrZXJEaXYsIHRpY2tlclNwYW4pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSh0aWNrZXJEaXYuZWxlbWVudCwgdGlja2VyU3Bhbi5lbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZShjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIHRpY2tlckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc0luaXRpYWxpemluZyhlbGVtZW50MToge2FscmVhZHlFeGlzdHM6IGJvb2xlYW59LCBlbGVtZW50Mjoge2FscmVhZHlFeGlzdHM6IGJvb2xlYW59KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFlbGVtZW50MS5hbHJlYWR5RXhpc3RzIHx8ICFlbGVtZW50Mi5hbHJlYWR5RXhpc3RzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluaXRpYWxpemUoZGl2OiBwNS5FbGVtZW50LCBzcGFuOiBwNS5FbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFRpY2tlclN0YXRlLklORk9STUFUSU9OO1xyXG4gICAgICAgIGRpdi5jaGlsZChzcGFuKTtcclxuICAgICAgICB0aGlzLmRpdiA9IGRpdjtcclxuICAgICAgICB0aGlzLnNwYW4gPSBzcGFuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcsIHRpY2tlclN0YXRlOiBUaWNrZXJTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc3Bhbi5odG1sKG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aWNrZXJTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXRTdHlsZShjdXN0b21DbGFzczogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFRpY2tlclN0YXRlLklORk9STUFUSU9OKSB7XHJcbiAgICAgICAgICAgIHNldEVsZW1lbnRDbGFzc2VzKHRoaXMuZGl2LCBnbG9iYWwuZ2xvYmFsQ2xhc3MsIGN1c3RvbUNsYXNzLCB0aGlzLmluZm9ybWF0aW9uQ2xhc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gVGlja2VyU3RhdGUuRVJST1IpIHtcclxuICAgICAgICAgICAgc2V0RWxlbWVudENsYXNzZXModGhpcy5kaXYsIGdsb2JhbC5nbG9iYWxDbGFzcywgY3VzdG9tQ2xhc3MsIHRoaXMuZXJyb3JDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRFbGVtZW50Q2xhc3NlcyhlbGVtZW50OiBwNS5FbGVtZW50LCAuLi5jbGFzc2VzOiBzdHJpbmdbXSkge1xyXG4gICAgZWxlbWVudC5jbGFzcyhjbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxufSIsImltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lTWFuYWdlciBpbXBsZW1lbnRzIEdhbWVUaW1lUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ6IG51bWJlciwgY29uZmlnOiBDb25maWcpIHtcclxuICAgICAgICB0aGlzLnN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQgPSBzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWxhcHNlZFRpbWUoc3lzdGVtVGltZU1pbGxpczogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoc3lzdGVtVGltZU1pbGxpcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiRXJyb3I6IGNhbid0IGdldCBlbGFwc2VkIHRpbWUuIEV4cGVjdGVkIDEgYXJndW1lbnQ6IHN5c3RlbVRpbWUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHN5c3RlbVRpbWVNaWxsaXMgLSB0aGlzLnN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQpIC8gMTAwMDsgLy8gaW4gc2Vjb25kc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIHdhbnQgdG8ga2VlcCB0aGlzIGNhbGN1bGF0aW9uIGluIG9ubHkgb25lIHBsYWNlXHJcbiAgICBnZXRHYW1lVGltZShzeXN0ZW1UaW1lTWlsbGlzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGFwc2VkVGltZShzeXN0ZW1UaW1lTWlsbGlzKSArIHRoaXMuY29uZmlnLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgLSB0aGlzLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBlbnVtVG9TdHJpbmcsXHJcbiAgICBlbnVtVG9TdHJpbmdBcnJheSwgZ2VuZXJhdGVQcmV2aWV3Tm90ZXMsXHJcbiAgICBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUsIGdldEludCxcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtPcHRpb25zfSBmcm9tIFwiLi9wYWdlcy9vcHRpb25zXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdIZWFkaW5nKCkge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICBsZXQgaGVhZGluZ0NsYXNzID0gXCJuYXZpZ2F0aW9uLWhlYWRpbmdcIjtcclxuXHJcbiAgICBsZXQgcGxheUZyb21GaWxlQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlBsYXkgRnJvbSBGaWxlXCIpO1xyXG4gICAgfSwgXCJwbGF5RnJvbUZpbGVCdXR0b25cIik7XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudCwgMC4yNSwgMC4wMzYsIDEzMCwgMzQpO1xyXG4gICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5QTEFZX0ZST01fRklMRSk7XHJcbiAgICB9KTtcclxuICAgIGlmICghcGxheUZyb21GaWxlQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhoZWFkaW5nQ2xhc3MpO1xyXG4gICAgICAgIHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBsYXlGcm9tT25saW5lQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlBsYXkgRnJvbSBPbmxpbmVcIik7XHJcbiAgICB9LCBcInBsYXlGcm9tT25saW5lQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUZyb21PbmxpbmVCdXR0b24uZWxlbWVudCwgMC41LCAwLjAzNiwgOTAsIDM0KTtcclxuICAgIHBsYXlGcm9tT25saW5lQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5QTEFZX0ZST01fT05MSU5FKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCFwbGF5RnJvbU9ubGluZUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGxheUZyb21PbmxpbmVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhoZWFkaW5nQ2xhc3MpO1xyXG4gICAgICAgIHBsYXlGcm9tT25saW5lQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbGV0IG9wdGlvbnNCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiT3B0aW9uc1wiKTtcclxuICAgIH0sIFwib3B0aW9uc0J1dHRvblwiKTtcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKG9wdGlvbnNCdXR0b24uZWxlbWVudCwgMC44LCAwLjAzNiwgOTAsIDM0KTtcclxuICAgIG9wdGlvbnNCdXR0b24uZWxlbWVudC5tb3VzZVByZXNzZWQoKCkgPT4ge1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLk9QVElPTlMpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIW9wdGlvbnNCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIG9wdGlvbnNCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhoZWFkaW5nQ2xhc3MpO1xyXG4gICAgICAgIG9wdGlvbnNCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBFeHBlY3RzIHJlbGF0aXZlWCBhbmQgcmVsYXRpdmUgWSB0byBiZSBiZXR3ZWVuIDAgYW5kIDFcclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGVsZW1lbnQ6IHA1LkVsZW1lbnQsIHJlbGF0aXZlWDogbnVtYmVyLCByZWxhdGl2ZVk6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcCA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgZWxlbWVudC5wb3NpdGlvbihjYW52YXNQb3NpdGlvbi54ICsgKHJlbGF0aXZlWCAqIHAud2lkdGgpIC0gKHdpZHRoIC8gMiksXHJcbiAgICAgICAgY2FudmFzUG9zaXRpb24ueSArIChyZWxhdGl2ZVkgKiBwLmhlaWdodCkgLSAoaGVpZ2h0IC8gMikpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RWxlbWVudFRvQm90dG9tKGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGhlaWdodFBlcmNlbnQ6IG51bWJlciwgc3R5bGluZ1dpZHRoOiBudW1iZXIsIHN0eWxpbmdIZWlnaHQ6IG51bWJlcikge1xyXG4gICAgbGV0IHAgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBjYW52YXNQb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0gcC5fcmVuZGVyZXIucG9zaXRpb24oKTtcclxuICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gaGVpZ2h0UGVyY2VudCAvIDEwMCAqIHAuaGVpZ2h0O1xyXG4gICAgZWxlbWVudC5wb3NpdGlvbihjYW52YXNQb3NpdGlvbi54LCBjYW52YXNQb3NpdGlvbi55ICsgKHAuaGVpZ2h0IC0gZWxlbWVudEhlaWdodCAtIHN0eWxpbmdIZWlnaHQpKTtcclxuICAgIGVsZW1lbnQuc3R5bGUoXCJ3aWR0aDogXCIgKyAocC53aWR0aCAtIHN0eWxpbmdXaWR0aCkgKyBcInB4XCIpO1xyXG4gICAgZWxlbWVudC5zdHlsZShcImhlaWdodDogXCIgKyBlbGVtZW50SGVpZ2h0ICsgXCJweFwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRJbnB1dChsYWJlbFN0cmluZzogc3RyaW5nLCBpbnB1dElkOiBzdHJpbmcsIGlucHV0SW5pdGlhbFZhbHVlOiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkSW5wdXRDbGFzcyA9IFwibGFiZWxlZC1pbnB1dFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGlucHV0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0ID0gcC5jcmVhdGVJbnB1dChpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGlucHV0LmlkKGlucHV0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgaW5wdXRJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJJTlBVVFwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IGlucHV0LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbChwOiBwNSwgbGFiZWxTdHJpbmc6IHN0cmluZywgZm9ySWQ/OiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBsYWJlbCA9IHAuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIGxhYmVsU3RyaW5nKTtcclxuICAgIGlmIChmb3JJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGFiZWwuYXR0cmlidXRlKFwiZm9yXCIsIGZvcklkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2hlY2tib3gocDogcDUsIGluaXRpYWxTdGF0ZTogYm9vbGVhbik6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGNoZWNrYm94ID0gcC5jcmVhdGVFbGVtZW50KFwiY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5lbHQuY2hlY2tlZCA9IGluaXRpYWxTdGF0ZTtcclxuICAgIHJldHVybiBjaGVja2JveDtcclxufVxyXG5cclxuLy8gVE9ETzogY2hlY2sgdGhhdCBvcHRpb25zRW51bSBpcyBhY3R1YWxseSBhbiBFbnVtLCBhbmQgaW5pdGlhbEVudW1WYWx1ZSBpcyBhIHZhbHVlIGZvciB0aGF0IGVudW1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRTZWxlY3QobGFiZWxTdHJpbmc6IHN0cmluZywgc2VsZWN0SWQ6IHN0cmluZywgT3B0aW9uc0VudW06IGFueSwgaW5pdGlhbEVudW1WYWx1ZTogYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IHNlbGVjdDogcDUuRWxlbWVudDtcclxuICAgIGxldCBsYWJlbGVkU2VsZWN0Q2xhc3MgPSBcImxhYmVsZWQtc2VsZWN0XCI7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBzZWxlY3RJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgc2VsZWN0ID0gcC5jcmVhdGVTZWxlY3QoKTtcclxuICAgICAgICBzZWxlY3QuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhsYWJlbGVkU2VsZWN0Q2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBzZWxlY3QuaWQoc2VsZWN0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgc2VsZWN0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lci5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgbGV0IGluaXRpYWxPcHRpb25zID0gZW51bVRvU3RyaW5nQXJyYXkoT3B0aW9uc0VudW0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBzZWxlY3Qub3B0aW9uKGluaXRpYWxPcHRpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHNlbGVjdC5zZWxlY3RlZChlbnVtVG9TdHJpbmcoT3B0aW9uc0VudW0sIGluaXRpYWxFbnVtVmFsdWUpKTtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IEhUTUxDb2xsZWN0aW9uID0gc2VsZWN0LmVsdC5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5pdGVtKGkpLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzcyArIFwiIFwiICsgbGFiZWxlZFNlbGVjdENsYXNzICsgXCIgXCIgKyBnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IHNlbGVjdCwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZFRleHRBcmVhKGxhYmVsU3RyaW5nOiBzdHJpbmcsIGlucHV0SWQ6IHN0cmluZywgaW5wdXRJbml0aWFsVmFsdWU6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBudW1iZXIgPSA0LCBjb2xzOiBudW1iZXIgPSA0MCk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCB0ZXh0QXJlYTogcDUuRWxlbWVudDtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxhYmVsZWRUZXh0YXJlYUNsYXNzID0gXCJsYWJlbGVkLXRleHRhcmVhXCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgaW5wdXRJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICB0ZXh0QXJlYSA9IHAuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIGlucHV0SW5pdGlhbFZhbHVlKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgdGV4dEFyZWEuaWQoaW5wdXRJZCk7XHJcbiAgICAgICAgdGV4dEFyZWEuYXR0cmlidXRlKFwicm93c1wiLCByb3dzLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHRleHRBcmVhLmF0dHJpYnV0ZShcImNvbHNcIiwgY29scy50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGlucHV0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IHRleHRBcmVhLCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWxlSW5wdXQobGFiZWxTdHJpbmc6IHN0cmluZywgYnV0dG9uVGV4dDogc3RyaW5nLCB1bmlxdWVJZDogc3RyaW5nLCBvbkZpbGVMb2FkOiAoZmlsZTogcDUuRmlsZSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGJ1dHRvbklkID0gdW5pcXVlSWQgKyBcIkJ1dHRvblwiO1xyXG4gICAgbGV0IGNvbnRhaW5lcklkID0gdW5pcXVlSWQgKyBcIkNvbnRhaW5lclwiO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgZmlsZUlucHV0Q2xhc3MgPSBcImZpbGUtaW5wdXRcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBmaWxlSW5wdXQgPSBwLmNyZWF0ZUZpbGVJbnB1dChvbkZpbGVMb2FkLCBcImZhbHNlXCIpO1xyXG4gICAgICAgIGZpbGVJbnB1dC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBmaWxlSW5wdXQuaGlkZSgpO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uID0gcC5jcmVhdGVCdXR0b24oYnV0dG9uVGV4dCk7XHJcbiAgICAgICAgYnV0dG9uLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGJ1dHRvbi5pZChidXR0b25JZCk7XHJcbiAgICAgICAgYnV0dG9uLm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbGVJbnB1dC5lbHQuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBidXR0b25JZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpXHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBjb250YWluZXJJZCk7XHJcblxyXG4gICAgbGV0IGxhYmVsOiBwNS5FbGVtZW50ID0gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGNvbnRhaW5lci5lbGVtZW50LCBcIkxBQkVMXCIpO1xyXG4gICAgbGFiZWwuaHRtbChsYWJlbFN0cmluZyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRDaGVja2JveChsYWJlbFN0cmluZzogc3RyaW5nLCBjaGVja2JveElkOiBzdHJpbmcsIGlzQ2hlY2tlZDogYm9vbGVhbiwgY3VzdG9tQ2xhc3M6IHN0cmluZyk6XHJcbiAgICB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgY2hlY2tib3g6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkQ2hlY2tib3hDbGFzcyA9IFwibGFiZWxlZC1jaGVja2JveFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRDaGVja2JveENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGNoZWNrYm94SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgY2hlY2tib3ggPSBjcmVhdGVDaGVja2JveChwLCBpc0NoZWNrZWQpO1xyXG4gICAgICAgIGNoZWNrYm94LmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjaGVja2JveC5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3guYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBjaGVja2JveC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBjaGVja2JveC5pZChjaGVja2JveElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGNoZWNrYm94SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IGNoZWNrYm94LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFllc05vIHtcclxuICAgIFllcyxcclxuICAgIE5vXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib29sZWFuVG9ZZXNObyhib29sZWFuOiBib29sZWFuKTogWWVzTm8ge1xyXG4gICAgaWYgKGJvb2xlYW4pIHtcclxuICAgICAgICByZXR1cm4gWWVzTm8uWWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gWWVzTm8uTm87XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB5ZXNOb1RvQm9vbGVhbih5ZXNObzogWWVzTm8pOiBib29sZWFuIHtcclxuICAgIGlmICh5ZXNObyA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gaHR0cHM6Ly9kaXNjb3Vyc2UucHJvY2Vzc2luZy5vcmcvdC9ob3ctdG8tb3JnYW5pemUtcmFkaW8tYnV0dG9ucy1pbi1zZXBhcmF0ZS1saW5lcy8xMDA0MS81XHJcbmV4cG9ydCBmdW5jdGlvbiBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocDogcDUsIHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50KSB7XHJcbiAgICBjb25zdCBpbnB1dHM6IHA1LkVsZW1lbnRbXSA9IHNlbGVjdEFsbChwLCAnaW5wdXQnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBjb25zdCBsYWJlbHM6IHA1LkVsZW1lbnRbXSA9IHNlbGVjdEFsbChwLCAnbGFiZWwnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBjb25zdCBsZW4gPSBpbnB1dHMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICBwLmNyZWF0ZURpdigpLnBhcmVudChyYWRpb0RpdlA1RWxlbWVudCkuY2hpbGQoaW5wdXRzW2ldKS5jaGlsZChsYWJlbHNbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL2Rpc2NvdXJzZS5wcm9jZXNzaW5nLm9yZy90L2hvdy10by1vcmdhbml6ZS1yYWRpby1idXR0b25zLWluLXNlcGFyYXRlLWxpbmVzLzEwMDQxLzVcclxuZXhwb3J0IGZ1bmN0aW9uIGZpeFJhZGlvRGl2RWxlbWVudChyYWRpb0RpdlA1RWxlbWVudDogcDUuRWxlbWVudCkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgcmFkaW9EaXZQNUVsZW1lbnQuX2dldElucHV0Q2hpbGRyZW5BcnJheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVJhZGlvT3B0aW9ucyhwOiBwNSwgcmFkaW9EaXZQNUVsZW1lbnQ6IHA1LkVsZW1lbnQsIHN0eWxlQ2xhc3Nlczogc3RyaW5nW10pIHtcclxuICAgIGxldCBkaXZzOiBwNS5FbGVtZW50W10gPSBzZWxlY3RBbGwocCwgJ2RpdicsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkaXZzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGl2c1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpbnB1dHM6IHA1LkVsZW1lbnRbXSA9IHNlbGVjdEFsbChwLCAnaW5wdXQnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW5wdXRzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxhYmVsczogcDUuRWxlbWVudFtdICA9IHNlbGVjdEFsbChwLCAnbGFiZWwnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUFsbE9jY3VycmVuY2VzT2ZUYWcoaHRtbDogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcpIHtcclxuICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGxldCBlbGVtZW50cyA9IHRlbXBEaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSk7XHJcbiAgICB3aGlsZSAoZWxlbWVudHNbMF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGVsZW1lbnRzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudHNbMF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlbXBEaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhpbnB1dEVsZW1lbnQ6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9LCBvbklucHV0OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBpZiAoIWlucHV0RWxlbWVudC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlucHV0RWxlbWVudC5lbGVtZW50LmlucHV0KG9uSW5wdXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RBbGwocDogcDUsIHRhZ05hbWU6IHN0cmluZywgY29udGFpbmVyOiBwNS5FbGVtZW50KTogcDUuRWxlbWVudFtdIHtcclxuICAgIGlmIChjb250YWluZXIuaWQoKSA9PT0gXCJcIikge1xyXG4gICAgICAgIHRocm93IFwiZXJyb3I6IGNvbnRhaW5lciB1c2VkIHdpdGggc2VsZWN0QWxsIG11c3QgaGF2ZSBhbiBpZFwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGlkID0gXCIjXCIgKyBjb250YWluZXIuaWQoKTtcclxuICAgIHJldHVybiBwLnNlbGVjdEFsbCh0YWdOYW1lLCBpZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVc2VySW5wdXQoY3JlYXRlOiAoKSA9PiB7ZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZElucHV0OiAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4gYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93SW5mbzogKCkgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93RXJyb3I6ICgpID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25WYWxpZElucHV0OiAoaW5wdXQ6IG51bWJlciB8IHN0cmluZykgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHA1LkVsZW1lbnRcclxuKToge2VsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW59IHtcclxuICAgIGxldCBjcmVhdGVkOiB7ZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbn0gPSBjcmVhdGUoKTtcclxuICAgIGlmICghY3JlYXRlZC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVkLmVsZW1lbnQ7XHJcbiAgICAgICAgcGFyZW50LmNoaWxkKGVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIGVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBlbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkSW5wdXQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93SW5mbygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2hvd0Vycm9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZWxlbWVudC5pbnB1dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAoaXNWYWxpZElucHV0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgc2hvd0luZm8oKTtcclxuICAgICAgICAgICAgICAgIG9uVmFsaWRJbnB1dCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaG93RXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNyZWF0ZWRcclxufVxyXG4iLCJpbXBvcnQge01vZGUsIE5vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTdGVwZmlsZSwgU3RlcGZpbGVTdGF0ZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGUsIEF1ZGlvRmlsZVN0YXRlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcbmltcG9ydCB7UGxheWluZ0Rpc3BsYXl9IGZyb20gXCIuL3BsYXlpbmdfZGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRJZlVuZGVmaW5lZCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQodmFsdWUpID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWxsTm90ZXNUb0RlZmF1bHRTdGF0ZSh0cmFja3M6IE5vdGVbXVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdHJhY2tzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHRyYWNrc1tpXVtqXS5zdGF0ZSA9IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VOb3RZZXRJbXBsZW1lbnRlZE5vdGVUeXBlcyh0cmFja3M6IE5vdGVbXVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdHJhY2tzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHJhY2tzW2ldW2pdLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTUlORTpcclxuICAgICAgICAgICAgICAgICAgICB0cmFja3NbaV1bal0udHlwZSA9IE5vdGVUeXBlLk5PTkU7IC8vVE9ETzogaW1wbGVtZW50IG1pbmVzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLkhPTERfSEVBRDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9ORTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuUk9MTF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrc1tpXVtqXS50eXBlID0gTm90ZVR5cGUuSE9MRF9IRUFEOyAvL1RPRE86IGltcGxlbWVudCByb2xsc1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNaXNzQm91bmRhcnkoY3VycmVudFRpbWU6IG51bWJlciwgY29uZmlnOiBDb25maWcpIHtcclxuICAgIGxldCBtaXNzQm91bmRhcnkgPSBjdXJyZW50VGltZSArIChjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS51cHBlckJvdW5kIC8gMTAwMCk7IC8vcmVzdWx0IGlzIGluIHNlY29uZHNcclxuICAgIHJldHVybiBtaXNzQm91bmRhcnk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tleUJpbmRpbmdzRGVmaW5lZChudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcykgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVLZXlCaW5kaW5ncyhudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgbGV0IG1hcHBpbmc6IHsgdHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZyB9W10gPSBbXTtcclxuXHJcbiAgICBpZiAobnVtVHJhY2tzIDw9IDkpIHtcclxuICAgICAgICBsZXQga2V5U2VxdWVuY2UgPSBbXCJBXCIsIFwiU1wiLCBcIkRcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJKXCIsIFwiS1wiLCBcIkxcIl07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5U3RyaW5nID0ga2V5U2VxdWVuY2VbaV07XHJcbiAgICAgICAgICAgIG1hcHBpbmcucHVzaCh7dHJhY2tOdW1iZXI6IGksIGtleUNvZGU6IGtleVN0cmluZy5jaGFyQ29kZUF0KDApLCBzdHJpbmc6IGtleVN0cmluZ30pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKG51bVRyYWNrcyA+IDI2KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZG4ndCBnZW5lcmF0ZSBkZWZhdWx0IGtleSBiaW5kaW5ncyBmb3IgbW9yZSB0aGFuIDI2IHRyYWNrcy4gUmFuIG91dCBvZiBsZXR0ZXJzIVwiKTtcclxuICAgICAgICAgICAgbnVtVHJhY2tzID0gMjY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJhY3RlckNvZGUgPSBcIkFcIi5jaGFyQ29kZUF0KDApICsgaTsgLy8gVGhpcyBpcyBhbiBBU0NJSSBjaGFyYWN0ZXIgY29kZVxyXG4gICAgICAgICAgICBtYXBwaW5nLnB1c2goe3RyYWNrTnVtYmVyOiBpLCBrZXlDb2RlOiBjaGFyYWN0ZXJDb2RlLCBzdHJpbmc6IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcmFjdGVyQ29kZSl9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5zZXQobnVtVHJhY2tzLCBtYXBwaW5nKTtcclxuICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29uZmlnS2V5QmluZGluZyh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwga2V5QmluZGluZzogS2V5QmluZGluZykge1xyXG4gICAgbGV0IGJpbmRpbmdJbmRleCA9IGdldEluZGV4T2ZUcmFja051bWJlckJpbmRpbmcodHJhY2tOdW1iZXIsIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcykpO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKVtiaW5kaW5nSW5kZXhdID0ga2V5QmluZGluZztcclxuICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG59XHJcblxyXG4vLyBFeHBlY3RzIGUgdG8gYmUgYW4gZW51bVxyXG5leHBvcnQgZnVuY3Rpb24gZW51bVRvU3RyaW5nQXJyYXkoZTogYW55KTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoZSkuZmlsdGVyKCh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKS5tYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRJbmRleE9mVHJhY2tOdW1iZXJCaW5kaW5nKHRyYWNrTnVtYmVyOiBudW1iZXIsIGJpbmRpbmdzOiB7IHRyYWNrTnVtYmVyOiBudW1iZXIsIGtleUNvZGU6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcgfVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJpbmRpbmdzW2ldLnRyYWNrTnVtYmVyID09PSB0cmFja051bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXlTdHJpbmcocDogcDUpIHtcclxuICAgIHJldHVybiBwLmtleS5sZW5ndGggPT0gMSA/IHAua2V5LnRvVXBwZXJDYXNlKCkgOiBwLmtleTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZGVPcHRpb25zRm9yRGlzcGxheShtb2Rlc0FzU3RyaW5nczogTWFwPHN0cmluZywgc3RyaW5nPltdKTogTW9kZVtdIHtcclxuICAgIGxldCBtb2RlT3B0aW9uczogTW9kZVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVzQXNTdHJpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1vZGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBtb2Rlc0FzU3RyaW5nc1tpXTtcclxuICAgICAgICBtb2RlT3B0aW9ucy5wdXNoKHt0eXBlOiBtb2RlLmdldChcInR5cGVcIiksIGRpZmZpY3VsdHk6IG1vZGUuZ2V0KFwiZGlmZmljdWx0eVwiKSwgbWV0ZXI6IG1vZGUuZ2V0KFwibWV0ZXJcIiksIGlkOiBpfSk7XHJcbiAgICB9XHJcbiAgICBtb2RlT3B0aW9ucy5zb3J0KGNvbXBhcmVNb2RlT3B0aW9ucyk7XHJcbiAgICByZXR1cm4gbW9kZU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlTW9kZU9wdGlvbnMoYTogTW9kZSwgYjogTW9kZSkge1xyXG4gICAgbGV0IHR5cGVBID0gYS50eXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBsZXQgdHlwZUIgPSBiLnR5cGUudG9VcHBlckNhc2UoKTtcclxuICAgIGlmICh0eXBlQSAhPSB0eXBlQikge1xyXG4gICAgICAgIGlmICh0eXBlQSA8IHR5cGVCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBkaWZmaWN1bHR5QSA9IGEuZGlmZmljdWx0eS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBkaWZmaWN1bHR5QiA9IGIuZGlmZmljdWx0eS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChkaWZmaWN1bHR5QSAhPSBkaWZmaWN1bHR5Qikge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlmZmljdWx0eVJhbmsoZGlmZmljdWx0eUEpIC0gZGlmZmljdWx0eVJhbmsoZGlmZmljdWx0eUIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRlckEgPSBwYXJzZUZsb2F0KGEubWV0ZXIpO1xyXG4gICAgICAgICAgICBsZXQgbWV0ZXJCID0gcGFyc2VGbG9hdChiLm1ldGVyKTtcclxuICAgICAgICAgICAgaWYgKG1ldGVyQSAhPSBtZXRlckIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXRlckEgLSBtZXRlckI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYS5pZCA9IGIuaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHk6IHN0cmluZykge1xyXG4gICAgc3dpdGNoIChkaWZmaWN1bHR5KSB7XHJcbiAgICAgICAgY2FzZSBcIkJFR0lOTkVSXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIGNhc2UgXCJFQVNZXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIGNhc2UgXCJNRURJVU1cIjpcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgY2FzZSBcIkhBUkRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgY2FzZSBcIkNIQUxMRU5HRVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICBjYXNlIFwiRURJVFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gNTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gNjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShkaXY6IHA1LkVsZW1lbnQsIHRhZ05hbWU6IHN0cmluZyk6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGNoaWxkcmVuTm9kZXMgPSBkaXYuY2hpbGQoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5Ob2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBub2RlOiBOb2RlID0gY2hpbGRyZW5Ob2Rlc1tpXTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gdGFnTmFtZSkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcDUuRWxlbWVudChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJpbmRpbmdJbmZvRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgYmluZGluZ3M6IHsgdHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZyB9W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmluZGluZ3NbaV0udHJhY2tOdW1iZXIgPT09IHRyYWNrTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiaW5kaW5nc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQcmV2aWV3Tm90ZXMobnVtVHJhY2tzOiBudW1iZXIpOiBOb3RlW11bXSB7XHJcbiAgICBsZXQgbm90ZXM6IE5vdGVbXVtdID0gW107XHJcbiAgICBsZXQgaXNIb2xkID0gZmFsc2U7XHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwLjE7XHJcbiAgICBsZXQgdGltZUluY3JlbWVudCA9IDAuMyAvIG51bVRyYWNrcztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IFtdO1xyXG4gICAgICAgIGlmIChpc0hvbGQpIHtcclxuICAgICAgICAgICAgdHJhY2sucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBOb3RlVHlwZS5IT0xEX0hFQUQsIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLCB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdHJhY2sucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBOb3RlVHlwZS5UQUlMLCB0eXBlU3RyaW5nOiBcIkRvbid0IENhcmVcIiwgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUgKyAwLjI1LFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IE5vdGVTdGF0ZS5ERUZBVUxUXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuTk9STUFMLFxyXG4gICAgICAgICAgICAgICAgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsXHJcbiAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm90ZXMucHVzaCh0cmFjayk7XHJcbiAgICAgICAgaXNIb2xkID0gIWlzSG9sZDtcclxuICAgICAgICBjdXJyZW50VGltZSArPSB0aW1lSW5jcmVtZW50O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vdGVzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWNjdXJhY3lFdmVudE5hbWUodGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kczogbnVtYmVyLCBjb25maWc6IENvbmZpZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA8IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLnVwcGVyQm91bmQpIHtcclxuICAgICAgICByZXR1cm4gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0ubmFtZTsgLy8gSGFuZGxlIG1pc3MgaWYgaXQgZXhpc3RzXHJcbiAgICB9XHJcbiAgICBpZiAoY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA+PSBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS5sb3dlckJvdW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLm5hbWU7IC8vIEhhbmRsZSBib28gaWYgaXQgZXhpc3RzXHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2ldO1xyXG4gICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kICE9IG51bGwgJiYgYWNjdXJhY3kudXBwZXJCb3VuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyAmJiB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1cmFjeS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiRVJST1I6IFVua25vd24gYWNjdXJhY3lcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlsZXNSZWFkeShzdGVwZmlsZTogU3RlcGZpbGUsIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICBsZXQgc3RlcGZpbGVSZWFkeSA9IHN0ZXBmaWxlLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQgfHxcclxuICAgICAgICBzdGVwZmlsZS5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ7XHJcbiAgICBsZXQgYXVkaW9GaWxlUmVhZHkgPSBhdWRpb0ZpbGUuc3RhdGUgPT09IEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEO1xyXG4gICAgcmV0dXJuIHN0ZXBmaWxlUmVhZHkgJiYgYXVkaW9GaWxlUmVhZHk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0UGxheWluZ0Rpc3BsYXkodHJhY2tzOiBOb3RlW11bXSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUpIHtcclxuICAgIGdsb2JhbC5wbGF5aW5nRGlzcGxheSA9IG5ldyBQbGF5aW5nRGlzcGxheSh0cmFja3MsIGF1ZGlvRmlsZSwgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW51bVRvU3RyaW5nKFRoZUVudW06IGFueSwgdmFsdWU6IGFueSkge1xyXG4gICAgcmV0dXJuIFRoZUVudW1bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFRoZUVudW1dLnRvU3RyaW5nKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGbG9hdCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnQodmFsdWU6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudW0odmFsdWU6IHN0cmluZyB8IG51bWJlciwgRW51bVR5cGU6IGFueSk6IGFueSB7XHJcbiAgICBsZXQgc3RyaW5nOiBzdHJpbmcgPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgcmV0dXJuIEVudW1UeXBlW3N0cmluZyBhcyBrZXlvZiB0eXBlb2YgRW51bVR5cGVdO1xyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBwNTsiLCJtb2R1bGUuZXhwb3J0cyA9IHBha287Il0sInNvdXJjZVJvb3QiOiIifQ==