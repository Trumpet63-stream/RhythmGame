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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaHl0aG1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja19mbGFzaC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9mZWVkYmFja190ZXh0LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9yZWNvcmRpbmcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2F1ZGlvX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvZGVmYXVsdF9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RlZmF1bHRfbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kaXNwbGF5X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2RvbV93cmFwcGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9kcmF3aW5nX3V0aWwudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2hvbGRfZ2xvdy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaG9sZF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9ob2xkX3BhcnRpY2xlcy50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL2tleV9iaW5kaW5nX2hlbHBlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMva2V5X2JpbmRpbmdzX3VpLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9rZXlib2FyZF9ldmVudF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9taXNzX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL25vdGVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvbm90ZV9za2luLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9vbmxpbmVfcGxheWxpc3QudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3A1X3NjZW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXkudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXlfZnJvbV9maWxlLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5X2Zyb21fb25saW5lLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9yZXN1bHRzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL2J5dGVfcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3NtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3BhcnNlX3N3Zi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFyc2luZy9zd2YtcmVhZGVyLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJzaW5nL3N3Zi10YWdzLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGFydGljbGVfc3lzdGVtLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wbGF5ZXJfa2V5X2FjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcGxheWluZ19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9wcmV2aWV3X2Rpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3JlY2VwdG9yX3Nocmlua19yZWFjdGlvbi50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvcmVzdWx0c19kaXNwbGF5LnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9zY3JvbGxfZGlyZWN0aW9uLnRzIiwid2VicGFjazovL3JoeXRobWdhbWUvLi9zcmMvc2NyaXB0cy9zY3JvbGxfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvc3RlcGZpbGUudHMiLCJ3ZWJwYWNrOi8vcmh5dGhtZ2FtZS8uL3NyYy9zY3JpcHRzL3RpbWVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvdWlfdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lLy4vc3JjL3NjcmlwdHMvdXRpbC50cyIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lL2V4dGVybmFsIFwicDVcIiIsIndlYnBhY2s6Ly9yaHl0aG1nYW1lL2V4dGVybmFsIFwicGFrb1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQUE7QUFBQTtBQUErQjtBQUd4QixNQUFNLHFCQUFxQjtJQVM5QixZQUFZLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxjQUE4QixFQUFFLFNBQWlCO1FBQy9HLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixD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Y2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JpcHRzL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSwgQWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5RmVlZGJhY2tGbGFzaCB7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bUNvbG9yZWRBY2N1cmFjeVJhbmtzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBmbGFzaER1cmF0aW9uSW5TZWNvbmRzOiBudW1iZXIgPSAwLjE7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5Q29sb3JzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZywgY29uZmlnOiBDb25maWcsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IGRpc3BsYXlNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMubnVtQ29sb3JlZEFjY3VyYWN5UmFua3MgPSB0aGlzLmdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lDb2xvcnMgPSBbXHJcbiAgICAgICAgICAgIFsxNzgsIDk0LCAyNDcsIDE4MF0sXHJcbiAgICAgICAgICAgIFszMCwgMjE3LCAxMjQsIDE2MF0sXHJcbiAgICAgICAgICAgIFsxOTYsIDE5OSwgMzAsIDE0MF0sXHJcbiAgICAgICAgICAgIFsyNDUsIDIxMywgMjIxLCAxMjBdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB3aGlsZSAodGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA+IHRoaXMuYWNjdXJhY3lDb2xvcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdXJhY3lDb2xvcnMucHVzaChcclxuICAgICAgICAgICAgICAgIFt0aGlzLmdldFJhbmRvbUludCgyNTUpLCB0aGlzLmdldFJhbmRvbUludCgyNTUpLCB0aGlzLmdldFJhbmRvbUludCgyNTUpLCAxMDBdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmFuZG9tSW50KG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdGbGFzaEZvclRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0ZsYXNoRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSA9IHRoaXMuZ2V0VHJhY2tNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSh0cmFja051bWJlcik7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGbGFzaEhhcHBlbmluZyhjdXJyZW50VGltZUluU2Vjb25kcywgbW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpKSB7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY3VycmVudFRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgbGV0IGZsYXNoQ29sb3I6IHA1LkNvbG9yID0gdGhpcy5nZXRGbGFzaENvbG9yKG1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KTtcclxuICAgICAgICAgICAgbGV0IGVsYXBzZWRUaW1lSW5TZWNvbmRzID0gdGhpcy5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcywgbW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdGbGFzaChlbGFwc2VkVGltZUluU2Vjb25kcywgY2VudGVyWCwgY2VudGVyWSwgZmxhc2hDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNGbGFzaEhhcHBlbmluZyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5RXZlbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgYWNjdXJhY2llc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gSGFuZGxlIG1pc3MgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPj0gYWNjdXJhY2llc1thY2N1cmFjaWVzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVsYXBzZWRUaW1lSW5TZWNvbmRzID0gdGhpcy5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcywgYWNjdXJhY3lFdmVudCk7XHJcbiAgICAgICAgaWYgKGVsYXBzZWRUaW1lSW5TZWNvbmRzID4gQWNjdXJhY3lGZWVkYmFja0ZsYXNoLmZsYXNoRHVyYXRpb25JblNlY29uZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VHJhY2tNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSh0cmFja051bWJlcjogbnVtYmVyKTogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGlmICh0cmFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl1bdHJhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzc3VtZXMgc3ltbWV0cmljYWwgYWNjdXJhY3kgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgZ2V0Rmxhc2hDb2xvcihhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVJhbmsgPSB0aGlzLmdldEFjY3VyYWN5UmFuayhhY2N1cmFjeUV2ZW50LCBhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgY29sb3JWYWx1ZXMgPSB0aGlzLmFjY3VyYWN5Q29sb3JzW2FjY3VyYWN5UmFuayAtIDFdO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBwLmNvbG9yKGNvbG9yVmFsdWVzWzBdLCBjb2xvclZhbHVlc1sxXSwgY29sb3JWYWx1ZXNbMl0sIGNvbG9yVmFsdWVzWzNdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBudW1SYW5rcyA9IDE7IC8vIHN0YXJ0IHdpdGggMSBiZWNhdXNlIHdlIGF0IGxlYXN0IGhhdmUgdGhlIGJlc3QgcmFua1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleCArIDE7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPT0gdW5kZWZpbmVkICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbnVtUmFua3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtUmFua3NcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgMCAmJiAwIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgYSByYW5rIHdoZXJlIDEgaXMgdGhlIGJlc3RcclxuICAgIHByaXZhdGUgZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnksIGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8IDApIHtcclxuICAgICAgICAgICAgYWNjdXJhY2llcyA9IHRoaXMuZ2V0UmV2ZXJzZWQoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRSYW5rID0gMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXg7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAmJiBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UmFuaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50UmFuaysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJldmVyc2VkKGFycmF5OiBhbnlbXSkge1xyXG4gICAgICAgIGxldCBhcnJheUNvcHk6IGFueVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGFycmF5Q29weS5wdXNoKGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Q29weTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdGbGFzaChlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGZsYXNoU2l6ZTogbnVtYmVyID0gdGhpcy5nZXRGbGFzaFNpemUoZWxhcHNlZFRpbWVJblNlY29uZHMsIEFjY3VyYWN5RmVlZGJhY2tGbGFzaC5mbGFzaER1cmF0aW9uSW5TZWNvbmRzKTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICBwLmZpbGwoY29sb3IpO1xyXG4gICAgICAgIC8vIHAuZmlsbCgyNTUsIDI1NSwgMjU1LCAxNTApO1xyXG4gICAgICAgIHAubm9TdHJva2UoKTtcclxuICAgICAgICB0aGlzLmRyYXdTdGFyKHAsIDAsIDAsIGZsYXNoU2l6ZSwgZmxhc2hTaXplICogMC40LCA0KTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Rmxhc2hTaXplKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGZsYXNoRHVyYXRpb25JblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBmbGFzaENvbXBsZXRpb25SYXRpbyA9IGVsYXBzZWRUaW1lSW5TZWNvbmRzIC8gZmxhc2hEdXJhdGlvbkluU2Vjb25kcztcclxuICAgICAgICBsZXQgbWluU2l6ZSA9IDA7XHJcbiAgICAgICAgbGV0IG1heFNpemUgPSB0aGlzLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZShtaW5TaXplLCBtYXhTaXplLCBmbGFzaENvbXBsZXRpb25SYXRpbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnBvbGF0ZShtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWUgKyAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKiByYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1N0YXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCByYWRpdXMxOiBudW1iZXIsIHJhZGl1czI6IG51bWJlciwgbnBvaW50czogbnVtYmVyKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5hbmdsZU1vZGUocC5SQURJQU5TKTtcclxuICAgICAgICBsZXQgYW5nbGUgPSBwLlRXT19QSSAvIG5wb2ludHM7XHJcbiAgICAgICAgbGV0IGhhbGZBbmdsZSA9IGFuZ2xlIC8gMi4wO1xyXG4gICAgICAgIHAuYmVnaW5TaGFwZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgcC5UV09fUEk7IGEgKz0gYW5nbGUpIHtcclxuICAgICAgICAgICAgbGV0IHN4ID0gY2VudGVyWCArIHAuY29zKGEpICogcmFkaXVzMjtcclxuICAgICAgICAgICAgbGV0IHN5ID0gY2VudGVyWSArIHAuc2luKGEpICogcmFkaXVzMjtcclxuICAgICAgICAgICAgcC52ZXJ0ZXgoc3gsIHN5KTtcclxuICAgICAgICAgICAgc3ggPSBjZW50ZXJYICsgcC5jb3MoYSArIGhhbGZBbmdsZSkgKiByYWRpdXMxO1xyXG4gICAgICAgICAgICBzeSA9IGNlbnRlclkgKyBwLnNpbihhICsgaGFsZkFuZ2xlKSAqIHJhZGl1czE7XHJcbiAgICAgICAgICAgIHAudmVydGV4KHN4LCBzeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAuZW5kU2hhcGUocC5DTE9TRSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50fSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtQYXJ0aWNsZVN5c3RlbX0gZnJvbSBcIi4vcGFydGljbGVfc3lzdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcyB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1Db2xvcmVkQWNjdXJhY3lSYW5rczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGljbGVzTGlmZXRpbWVJblNlY29uZHM6IG51bWJlciA9IDEuNTtcclxuICAgIHByaXZhdGUgcGFydGljbGVTZXR0aW5nczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHByaXZhdGUgcGFydGljbGVTeXN0ZW1zOiBQYXJ0aWNsZVN5c3RlbVtdO1xyXG4gICAgcHJpdmF0ZSBncmF2aXR5RGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA9IHRoaXMuZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3ModGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMucGFydGljbGVTZXR0aW5ncyA9IFtcclxuICAgICAgICAgICAgWzE3OCwgOTQsIDI0NywgMzBdLFxyXG4gICAgICAgICAgICBbMzAsIDIxNywgMTI0LCAyNV0sXHJcbiAgICAgICAgICAgIFsxOTYsIDE5OSwgMzAsIDIwXSxcclxuICAgICAgICAgICAgWzI0NSwgMjEzLCAyMjEsIDE1XVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgd2hpbGUgKHRoaXMubnVtQ29sb3JlZEFjY3VyYWN5UmFua3MgPiB0aGlzLnBhcnRpY2xlU2V0dGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTZXR0aW5ncy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgW3RoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIDIwXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5RGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLkRvd24gPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IGdyYXZpdHk6IHA1LlZlY3RvciA9IHAuY3JlYXRlVmVjdG9yKDAsIDIwMDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zLnB1c2gobmV3IFBhcnRpY2xlU3lzdGVtKEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMucGFydGljbGVzTGlmZXRpbWVJblNlY29uZHMsIGdyYXZpdHkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW3RyYWNrTnVtYmVyXS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBhcnRpY2xlc0ZvckFjY3VyYWN5RXZlbnQoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRXZlbnRGb3JQYXJ0aWNsZXMoYWNjdXJhY3lFdmVudCkpIHtcclxuICAgICAgICAgICAgbGV0IHJlY2VwdG9yVGltZVBvc2l0aW9uID0gYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzIC0gYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAvIDEwMDA7XHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsUG9zaXRpb24gPSB0aGlzLmdldEluaXRpYWxQb3NpdGlvbihwLCBhY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyxcclxuICAgICAgICAgICAgICAgIHJlY2VwdG9yVGltZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGluaXRpYWxWZWxvY2l0eSA9IHAuY3JlYXRlVmVjdG9yKDAsIC01MDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGVTZXR0aW5nczoge2NvbG9yOiBwNS5Db2xvciwgbnVtUGFydGljbGVzOiBudW1iZXIgfSA9IHRoaXMuZ2V0UGFydGljbGVTZXR0aW5ncyhhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbYWNjdXJhY3lFdmVudC50cmFja051bWJlcl0uYWRkUmFuZG9taXplZFBhcnRpY2xlcyhpbml0aWFsUG9zaXRpb24sIGluaXRpYWxWZWxvY2l0eSxcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQudGltZUluU2Vjb25kcywgcGFydGljbGVTZXR0aW5ncy5udW1QYXJ0aWNsZXMsIHBhcnRpY2xlU2V0dGluZ3MuY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEluaXRpYWxQb3NpdGlvbihwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY2VudGVyVGltZUluU2Vjb25kcywgY2VudGVyVGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlVmVjdG9yKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNFdmVudEZvclBhcnRpY2xlcyhhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgYWNjdXJhY2llc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gSGFuZGxlIG1pc3MgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPj0gYWNjdXJhY2llc1thY2N1cmFjaWVzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXRQYXJ0aWNsZVNldHRpbmdzKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuayA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBwYXJ0aWNsZVNldHRpbmdzID0gdGhpcy5wYXJ0aWNsZVNldHRpbmdzW2FjY3VyYWN5UmFuayAtIDFdO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiB7Y29sb3I6IHAuY29sb3IocGFydGljbGVTZXR0aW5nc1swXSwgcGFydGljbGVTZXR0aW5nc1sxXSwgcGFydGljbGVTZXR0aW5nc1syXSksXHJcbiAgICAgICAgICAgIG51bVBhcnRpY2xlczogcGFydGljbGVTZXR0aW5nc1szXX07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXROdW1Db2xvcmVkQWNjdXJhY3lSYW5rcyhhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgbGV0IGJlc3RBY2N1cmFjeUluZGV4ID0gdGhpcy5nZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgbnVtUmFua3MgPSAxOyAvLyBzdGFydCB3aXRoIDEgYmVjYXVzZSB3ZSBhdCBsZWFzdCBoYXZlIHRoZSBiZXN0IHJhbmtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXggKyAxOyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgIT09IHVuZGVmaW5lZCAmJiBhY2N1cmFjeS51cHBlckJvdW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG51bVJhbmtzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bVJhbmtzXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IDAgJiYgMCA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIGEgcmFuayB3aGVyZSAxIGlzIHRoZSBiZXN0XHJcbiAgICBwcml2YXRlIGdldEFjY3VyYWN5UmFuayhhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50LCBhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCAwKSB7XHJcbiAgICAgICAgICAgIGFjY3VyYWNpZXMgPSB0aGlzLmdldFJldmVyc2VkKGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50UmFuayA9IDE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlc3RBY2N1cmFjeUluZGV4OyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgJiYgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFJhbms7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFJhbmsrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZXZlcnNlZChhcnJheTogYW55W10pIHtcclxuICAgICAgICBsZXQgYXJyYXlDb3B5OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBhcnJheUNvcHkucHVzaChhcnJheVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheUNvcHk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nLCBBY2N1cmFjeVJlY29yZGluZ0VudHJ5fSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dldEFjY3VyYWN5RXZlbnROYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja1RleHQge1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGNlbnRlclg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBsYXN0RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkgPSB0aGlzLmdldE1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KCk7XHJcbiAgICAgICAgaWYgKGxhc3RFdmVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0aW1lU2luY2VMYXN0RXZlbnQgPSBjdXJyZW50VGltZUluU2Vjb25kcyAtIGxhc3RFdmVudC50aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCB0ZXh0U2l6ZSA9IHRoaXMuZ2V0Rm9udFNpemUodGltZVNpbmNlTGFzdEV2ZW50KTtcclxuICAgICAgICBpZiAodGV4dFNpemUgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBldmVudE5hbWUgPSBnZXRBY2N1cmFjeUV2ZW50TmFtZShsYXN0RXZlbnQuYWNjdXJhY3lNaWxsaXMsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLmRyYXdFdmVudFRleHQoZXZlbnROYW1lLCB0ZXh0U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSgpOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgICAgICBsZXQgbW9zdFJlY2VudFRyYWNrOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5W10gPSBbXTtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZy5sZW5ndGg7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgICAgICBpZiAodHJhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RFdmVudFRpbWUgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl1bdHJhY2subGVuZ3RoIC0gMV0udGltZUluU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0RXZlbnRUaW1lID4gZ3JlYXRlc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlYXRlc3RUaW1lID0gbGFzdEV2ZW50VGltZTtcclxuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJhY2sgPSB0cmFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9zdFJlY2VudFRyYWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vc3RSZWNlbnRUcmFja1ttb3N0UmVjZW50VHJhY2subGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGb250U2l6ZSh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBtYXhGb250U2l6ZSA9IDMwO1xyXG4gICAgICAgIGlmICh0aW1lIDwgMC4xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lIC8gMC4xICogbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRpbWUgPj0gMC4xICYmIHRpbWUgPCAwLjQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEZvbnRTaXplO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aW1lID49IDAuNCAmJiB0aW1lIDwgMC43KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoMSAtICh0aW1lIC0gMC40KSAvICgwLjcgLSAwLjQpKSAqIG1heEZvbnRTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdFdmVudFRleHQodGV4dDogc3RyaW5nLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIsIHAuQ0VOVEVSKTtcclxuICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICBwLnRleHRTaXplKHRleHRTaXplKTtcclxuICAgICAgICBwLnRleHQodGV4dCwgdGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclkpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtLZXlTdGF0ZSwgUGxheWVyS2V5QWN0aW9ufSBmcm9tIFwiLi9wbGF5ZXJfa2V5X2FjdGlvblwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsb3dlckJvdW5kOiBudW1iZXI7XHJcbiAgICB1cHBlckJvdW5kOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sb3dlckJvdW5kID0gbG93ZXJCb3VuZDtcclxuICAgICAgICB0aGlzLnVwcGVyQm91bmQgPSB1cHBlckJvdW5kO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyO1xyXG4gICAgcHVibGljIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGNvbmZpZzogQ29uZmlnLCBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gaG9sZE1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50ID0gaGFuZGxlQWNjdXJhY3lFdmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlUGxheWVyQWN0aW9uKGFjdGlvbjogUGxheWVyS2V5QWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5rZXlTdGF0ZSA9PSBLZXlTdGF0ZS5ET1dOKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJ5VG9IaXROb3RlKGFjdGlvbi5nYW1lVGltZSwgYWN0aW9uLnRyYWNrKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5rZXlTdGF0ZSA9PT0gS2V5U3RhdGUuVVApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZE1hbmFnZXIuaXNUcmFja0hlbGQoYWN0aW9uLnRyYWNrKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci51bmhvbGRUcmFjayhhY3Rpb24udHJhY2ssIGFjdGlvbi5nYW1lVGltZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeVRvUmVsZWFzZU5vdGUoYWN0aW9uLmdhbWVUaW1lLCBhY3Rpb24udHJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJ5VG9IaXROb3RlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4ID0gdGhpcy5nZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHMsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAobm90ZUluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5vdGU6IE5vdGUgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1bbm90ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG5vdGUudHlwZSA9PT0gTm90ZVR5cGUuTk9STUFMKSB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhJVDtcclxuICAgICAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IChub3RlLnRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcykgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogbm90ZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSEVMRDsgLy8gc2V0IHRoZSBub3RlIHRvIGhlbGQgc28gaXQgd29uJ3QgY291bnQgYXMgYSBtaXNzXHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IG5vdGUudHlwZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci5ob2xkVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0NvbmZpZ3VyZWRGb3JCb29zKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogZ2V0QWNjdXJhY3lFdmVudE5hbWUoSW5maW5pdHksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBJbmZpbml0eSxcclxuICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgbm90ZVR5cGU6IE5vdGVUeXBlLk5PTkUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0gPSB0aGlzLmdldEFjY3VyYWN5UmFuZ2VJblNlY29uZHMoKTtcclxuICAgICAgICBsZXQgaGl0dGFibGVUaW1lUmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0gPVxyXG4gICAgICAgICAgICB0aGlzLmdldEhpdHRhYmxlUmFuZ2UoYWNjdXJhY3lSYW5nZSwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBoaXR0YWJsZUluZGV4UmFuZ2U6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0gPVxyXG4gICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLmdldE5vdGVzQnlUaW1lUmFuZ2UoaGl0dGFibGVUaW1lUmFuZ2UubGVhc3RUaW1lLCBoaXR0YWJsZVRpbWVSYW5nZS5ncmVhdGVzdFRpbWUsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFYXJsaWVzdFVuaGl0Tm90ZUluZGV4SW5SYW5nZSh0cmFja051bWJlciwgaGl0dGFibGVJbmRleFJhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY2N1cmFjeVJhbmdlSW5TZWNvbmRzKCkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVNldHRpbmdzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBsZXQgbnVtU2V0dGluZ3MgPSBhY2N1cmFjeVNldHRpbmdzLmxlbmd0aDtcclxuICAgICAgICBsZXQgbGVhc3RUaW1lID0gYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kID09IG51bGwgP1xyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzWzFdLmxvd2VyQm91bmQgOiBhY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQ7XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZTtcclxuICAgICAgICBpZiAoYWNjdXJhY3lTZXR0aW5nc1tudW1TZXR0aW5ncyAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMl0udXBwZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMV0udXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtsZWFzdFRpbWU6IGxlYXN0VGltZSAvIDEwMDAsIGdyZWF0ZXN0VGltZTogZ3JlYXRlc3RUaW1lIC8gMTAwMH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGl0dGFibGVSYW5nZShhY2N1cmFjeVJhbmdlOiB7IGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciB9LCByZWNlcHRvclRpbWVQb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVhc3RUaW1lOiByZWNlcHRvclRpbWVQb3NpdGlvbiArIGFjY3VyYWN5UmFuZ2UubGVhc3RUaW1lLFxyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWU6IHJlY2VwdG9yVGltZVBvc2l0aW9uICsgYWNjdXJhY3lSYW5nZS5ncmVhdGVzdFRpbWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWFybGllc3RVbmhpdE5vdGVJbmRleEluUmFuZ2UodHJhY2tOdW1iZXI6IG51bWJlciwgbm90ZUluZGV4UmFuZ2U6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gbm90ZUluZGV4UmFuZ2Uuc3RhcnRJbmRleDsgaSA8IG5vdGVJbmRleFJhbmdlLmVuZEluZGV4Tm90SW5jbHVzaXZlOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtpXS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb25maWd1cmVkRm9yQm9vcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0cnlUb1JlbGVhc2VOb3RlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4ID0gdGhpcy5nZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHMsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAobm90ZUluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1bbm90ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG5vdGUudHlwZSA9PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG9sZCA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXggLSAxXTsgLy8gZ2V0IHRoZSBob2xkIGJlbG9uZ2luZyB0byB0aGlzIHRhaWxcclxuICAgICAgICAgICAgICAgIGhvbGQuc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBjaGFuZ2UgdGhlIGhvbGQgc3RhdGUgZnJvbSBIRUxEIHRvIEhJVFxyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgdGFpbCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogXCJSZWxlYXNlIFwiICsgZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBub3RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IC8vIGxldCBnbyB0b28gZWFybHlcclxuICAgICAgICAgICAgLy8gQ291bGQgdGhpcyByZXR1cm4gLTE/XHJcbiAgICAgICAgICAgIGxldCBob2xkU3RhcnRJbmRleCA9IHRoaXMubm90ZU1hbmFnZXIuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoY3VycmVudFRpbWVJblNlY29uZHMsIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgICAgIGxldCBob2xkID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4IC0gMV07XHJcbiAgICAgICAgICAgIGxldCB0YWlsID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4XTtcclxuICAgICAgICAgICAgaWYgKGhvbGQudHlwZSA9PSBOb3RlVHlwZS5IT0xEX0hFQUQgJiYgdGFpbC50eXBlID09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtob2xkU3RhcnRJbmRleCAtIDFdLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSBzdGFydCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4XS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgdGFpbCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IFwiUmVsZWFzZSBcIiArIGdldEFjY3VyYWN5RXZlbnROYW1lKEluZmluaXR5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBJbmZpbml0eSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogTm90ZVR5cGUuTk9ORSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogSXQncyBwb3NzaWJsZSB0aGF0IHRoaXMgaXMgc29tZXRoaW5nIGxpa2UgYSByYWNlIGNvbmRpdGlvbiBiZXR3ZWVuIHRoZSBrZXkgZXZlbnQgYW5kIHRoZSBhbmltYXRpb24gbG9vcC4gRG9uJ3QgdGhyb3cgYW4gZXJyb3IgZm9yIG5vd1xyXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgXCJFcnJvcjogUmVsZWFzZSBtaXNzIGZhaWxlZCB0byB0cmlnZ2VyIG9uIG5vdGUgaW5kZXggXCIgKyAoaG9sZFN0YXJ0SW5kZXggLSAxKSArIFwiLCB0cmFjayBpbmRleCBcIiArIHRyYWNrTnVtYmVyICsgXCIgYXQgdGltZSBcIiArIGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZSB7XHJcbiAgICBJTkNPTVBMRVRFLFxyXG4gICAgUkVBRFksXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWNjdXJhY3lFdmVudCB7XHJcbiAgICBhY2N1cmFjeU5hbWU6IHN0cmluZyxcclxuICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICBhY2N1cmFjeU1pbGxpczogbnVtYmVyLFxyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSB7XHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICBhY2N1cmFjeU1pbGxpczogbnVtYmVyLFxyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeVJlY29yZGluZyB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGU7XHJcbiAgICBwdWJsaWMgcmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5W11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlLklOQ09NUExFVEU7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmcgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkaW5nLnB1c2goW10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb3JkQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmdbYWNjdXJhY3lFdmVudC50cmFja051bWJlcl0ucHVzaChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMsXHJcbiAgICAgICAgICAgICAgICBub3RlVHlwZTogYWNjdXJhY3lFdmVudC5ub3RlVHlwZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXVkaW9GaWxlU3RhdGUge1xyXG4gICAgTk9fQVVESU9fRklMRSxcclxuICAgIERPTkVfUkVBRElORyxcclxuICAgIEJVRkZFUkVELFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBdWRpb0ZpbGUge1xyXG4gICAgcHVibGljIHN0YXRlOiBBdWRpb0ZpbGVTdGF0ZTtcclxuICAgIHB1YmxpYyBmaWxlOiBGaWxlO1xyXG4gICAgcHVibGljIGJsb2I6IEJsb2JcclxuICAgIHB1YmxpYyBhdWRpb1NvdXJjZTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xyXG4gICAgcHVibGljIGF1ZGlvQ29udGV4dDogQXVkaW9Db250ZXh0O1xyXG4gICAgcHVibGljIGF1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLk5PX0FVRElPX0ZJTEU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRGaWxlKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlLmZpbGU7IC8vIHRoaXMgdW53cmFwcyB0aGUgcDUuRmlsZSB3cmFwcGVyIHRvIGdldCB0aGUgb3JpZ2luYWwgRE9NIGZpbGVcclxuICAgICAgICB0aGlzLmxvYWRBdWRpb0RhdGEodGhpcy5maWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEJsb2IoYmxvYjogQmxvYikge1xyXG4gICAgICAgIHRoaXMuYmxvYiA9IGJsb2I7XHJcbiAgICAgICAgdGhpcy5sb2FkQXVkaW9EYXRhKHRoaXMuYmxvYik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQXVkaW9EYXRhKGF1ZGlvRGF0YTogRmlsZSB8IEJsb2IpIHtcclxuICAgICAgICB0aGlzLmxvYWRTb3VuZEZpbGUoYXVkaW9EYXRhLCAoKG9uRmlsZVJlYWQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLkRPTkVfUkVBRElORztcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvU291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVjb2RlQXVkaW9EYXRhKDxBcnJheUJ1ZmZlcj5vbkZpbGVSZWFkLnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlY29kZUF1ZGlvRGF0YShhdWRpb0RhdGE6IEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKGF1ZGlvRGF0YSkudGhlbigoKGJ1ZmZlcjogQXVkaW9CdWZmZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9CdWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdpdGggZGVjb2RpbmcgYXVkaW8gZGF0YVwiICsgZS5lcnIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyLmR1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5KGRlbGF5SW5TZWNvbmRzOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5zdGFydCh0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGRlbGF5SW5TZWNvbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLnN0b3AoMCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLkRPTkVfUkVBRElORztcclxuICAgICAgICB0aGlzLnJlY3JlYXRlU291cmNlTm9kZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjcmVhdGVTb3VyY2VOb2RlKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmJ1ZmZlciA9IHRoaXMuYXVkaW9CdWZmZXI7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU291bmRGaWxlKFxyXG4gICAgICAgIGZpbGU6IEJsb2IgfCBGaWxlLFxyXG4gICAgICAgIGxpc3RlbmVyOiAoZXZlbnQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IGFueSxcclxuICAgICAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcclxuICAgICAgICBmaWxlUmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge2RlZmF1bHRJZlVuZGVmaW5lZH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge0RFRkFVTFRfQ09ORklHfSBmcm9tIFwiLi9kZWZhdWx0X2NvbmZpZ1wiO1xyXG5pbXBvcnQge0tleUJpbmRpbmd9IGZyb20gXCIuL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5cclxuLyogU3RvcmVzIHVzZXIgc2V0dGluZ3MuIEV4cGVjdGVkIG5vdCB0byBjaGFuZ2UgZHVyaW5nIHBsYXkgKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcbiAgICBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuICAgIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuICAgIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXTtcclxuICAgIHBhdXNlQXRTdGFydEluU2Vjb25kczogbnVtYmVyO1xyXG4gICAga2V5QmluZGluZ3M6IE1hcDxudW1iZXIsIEtleUJpbmRpbmdbXT47XHJcbiAgICBnYW1lQXJlYUhlaWdodDogbnVtYmVyO1xyXG4gICAgZ2FtZUFyZWFXaWR0aDogbnVtYmVyO1xyXG4gICAgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHF1aXRLZXk6IG51bWJlcjtcclxuICAgIGlzQWNjdXJhY3lGbGFzaEVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzQWNjdXJhY3lUZXh0RW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzSG9sZFBhcnRpY2xlc0VuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpc0hvbGRHbG93RW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxzUGVyU2Vjb25kPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VwdG9yWVBlcmNlbnQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uPzogU2Nyb2xsRGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lTZXR0aW5ncz86IEFjY3VyYWN5W10sXHJcbiAgICAgICAgICAgICAgICAgICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleUJpbmRpbmdzPzogTWFwPG51bWJlciwgS2V5QmluZGluZ1tdPixcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYUhlaWdodD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYVdpZHRoPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTaXplPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1aXRLZXk/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeUZsYXNoRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWNjdXJhY3lUZXh0RW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNIb2xkUGFydGljbGVzRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNIb2xkR2xvd0VuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQXJlYUhlaWdodCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmdhbWVBcmVhSGVpZ2h0LCBERUZBVUxUX0NPTkZJRy5nYW1lQXJlYUhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5nYW1lQXJlYVdpZHRoID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuZ2FtZUFyZWFXaWR0aCwgREVGQVVMVF9DT05GSUcuZ2FtZUFyZWFXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5waXhlbHNQZXJTZWNvbmQsIERFRkFVTFRfQ09ORklHLnBpeGVsc1BlclNlY29uZCk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5zY3JvbGxEaXJlY3Rpb24sIERFRkFVTFRfQ09ORklHLnNjcm9sbERpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIC8vIE5PVEU6IFNjcm9sbCBkaXJlY3Rpb24gYW5kIGdhbWVBcmVhSGVpZ2h0IG11c3QgYmUgc2V0IEJFRk9SRSBzZXR0aW5nIHJlY2VwdG9yWVBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5yZWNlcHRvcllQZXJjZW50ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucmVjZXB0b3JZUGVyY2VudCwgREVGQVVMVF9DT05GSUcucmVjZXB0b3JZUGVyY2VudCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMsIERFRkFVTFRfQ09ORklHLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lTZXR0aW5ncyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmFjY3VyYWN5U2V0dGluZ3MsIERFRkFVTFRfQ09ORklHLmFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMucGF1c2VBdFN0YXJ0SW5TZWNvbmRzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucGF1c2VBdFN0YXJ0SW5TZWNvbmRzLCBERUZBVUxUX0NPTkZJRy5wYXVzZUF0U3RhcnRJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5ub3RlU2l6ZSwgREVGQVVMVF9DT05GSUcubm90ZVNpemUpO1xyXG4gICAgICAgIHRoaXMua2V5QmluZGluZ3MgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5rZXlCaW5kaW5ncywgREVGQVVMVF9DT05GSUcua2V5QmluZGluZ3MpO1xyXG4gICAgICAgIHRoaXMucXVpdEtleSA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnF1aXRLZXksIERFRkFVTFRfQ09ORklHLnF1aXRLZXkpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeVRleHRFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNBY2N1cmFjeVRleHRFbmFibGVkLFxyXG4gICAgICAgICAgICBERUZBVUxUX0NPTkZJRy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNIb2xkUGFydGljbGVzRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNIb2xkR2xvd0VuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0hvbGRHbG93RW5hYmxlZCwgREVGQVVMVF9DT05GSUcuaXNIb2xkR2xvd0VuYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZlKCkge1xyXG4gICAgICAgIGxldCBjb25maWdTdHJpbmcgPSB0aGlzLmdldENvbmZpZ0FzU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IGV4cGlyZXMgPSB0aGlzLmdldERhdGVPZk9uZVllYXJGcm9tTm93KCk7XHJcbiAgICAgICAgbGV0IHBhdGggPSAnLyc7XHJcbiAgICAgICAgbGV0IGNvb2tpZVN0cmluZyA9IFwiY29uZmlnPVwiICsgZXNjYXBlKGNvbmZpZ1N0cmluZylcclxuICAgICAgICAgICAgKyAnO3BhdGg9JyArIHBhdGhcclxuICAgICAgICAgICAgKyAnO2V4cGlyZXM9JyArIGV4cGlyZXMudG9VVENTdHJpbmcoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb29raWVTdHJpbmcpO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZVN0cmluZztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZyBzYXZlZCB0byBjb29raWUhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29uZmlnQXNTdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZzogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoJyxcImtleUJpbmRpbmdzXCI6e30sJyxcclxuICAgICAgICAgICAgJyxcImtleUJpbmRpbmdzXCI6JyArIHRoaXMuc3RyaW5naWZ5S2V5QmluZGluZ3MoKSArICcsJyk7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWQoKTogQ29uZmlnIHtcclxuICAgICAgICBsZXQgY29uZmlnQ29va2llID0gQ29uZmlnLmdldEZyb21Db29raWUoXCJjb25maWdcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29uZmlnQ29va2llKTtcclxuICAgICAgICBpZiAoY29uZmlnQ29va2llICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnSlNPTiA9IEpTT04ucGFyc2UodW5lc2NhcGUoY29uZmlnQ29va2llKSk7XHJcbiAgICAgICAgICAgICAgICBjb25maWdKU09OLmtleUJpbmRpbmdzID0gbmV3IE1hcChjb25maWdKU09OLmtleUJpbmRpbmdzKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWc6IENvbmZpZyA9IG5ldyBDb25maWcoY29uZmlnSlNPTik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZyBsb2FkZWQgZnJvbSBjb29raWUhXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge31cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyB2YWxpZCBjb29raWUgZm91bmQsIHJldHVybmluZyBkZWZhdWx0IGNvbmZpZyFcIik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb25maWcoe30pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGF0ZU9mT25lWWVhckZyb21Ob3coKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdHJpbmdpZnlLZXlCaW5kaW5ncygpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHJpbmcgPSBcIltcIjtcclxuICAgICAgICB0aGlzLmtleUJpbmRpbmdzLmZvckVhY2goKHZhbHVlOiBLZXlCaW5kaW5nW10sIGtleTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHN0cmluZyArPSBcIltcIisga2V5ICsgXCIsXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgK1wiXVwiO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3RyaW5nICs9IFwiXVwiO1xyXG4gICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RnJvbUNvb2tpZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiOyBcIilcclxuICAgICAgICAgICAgICAgIC5maW5kKHJvdyA9PiByb3cuc3RhcnRzV2l0aChrZXkpKVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiPVwiKVsxXTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBsZXQgREVGQVVMVF9DT05GSUcgPSB7XHJcbiAgICBwaXhlbHNQZXJTZWNvbmQ6IDU1MCxcclxuICAgIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uLkRvd24sXHJcbiAgICByZWNlcHRvcllQZXJjZW50OiAxNSxcclxuICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM6IDAsXHJcbiAgICAvLyBUaGlzIGlzIGEgc3ltbWV0cmljYWwgdmVyc2lvbiBvZiBGRlIncyBhY2N1cmFjeVxyXG4gICAgLy8gVE9ETzogQWRkIGEgbGlzdCBvZiBwcmVzZXRzIHRoYXQgbGl2ZSBpbiB0aGVpciBvd24gZmlsZVxyXG4gICAgLy8gVE9ETzogdmFsaWRhdGlvbiBvbiBhY2N1cmFjeSBzZXR0aW5ncyB0aGF0IGV4cGxhaW5zIHdoeSBtaXNzIHNob3VsZG4ndCBoYXZlIGxvd2VyIGJvdW5kXHJcbiAgICBhY2N1cmFjeVNldHRpbmdzOiBbXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiTWlzc1wiLCBudWxsLC0xMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkF2ZXJhZ2VcIiwgLTExNywgLTgzKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJHb29kXCIsIC04MywgLTUwKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJQZXJmZWN0XCIsIC01MCwgLTE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBbWF6aW5nXCIsIC0xNywgMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIlBlcmZlY3RcIiwgMTcsIDUwKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJHb29kXCIsIDUwLCA4MyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQXZlcmFnZVwiLCA4MywgMTE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJCb29cIiwgMTE3LCBudWxsKVxyXG4gICAgXSxcclxuICAgIHBhdXNlQXRTdGFydEluU2Vjb25kczogMCxcclxuICAgIGtleUJpbmRpbmdzOiBuZXcgTWFwKCksXHJcbiAgICBnYW1lQXJlYUhlaWdodDogNjAwLFxyXG4gICAgZ2FtZUFyZWFXaWR0aDogNDAwLFxyXG4gICAgbm90ZVNpemU6IDMwLFxyXG4gICAgcXVpdEtleTogMjcsIC8vIFF1aXQgZGVmYXVsdHMgdG8gZXNjYXBlIGtleVxyXG4gICAgaXNBY2N1cmFjeUZsYXNoRW5hYmxlZDogdHJ1ZSxcclxuICAgIGlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNBY2N1cmFjeVRleHRFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNIb2xkUGFydGljbGVzRW5hYmxlZDogdHJ1ZSxcclxuICAgIGlzSG9sZEdsb3dFbmFibGVkOiB0cnVlLFxyXG59OyIsImltcG9ydCB7Tm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZmF1bHROb3RlU2tpbiB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdOb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVR5cGU6IE5vdGVUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gbm90ZVNpemU7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IG5vdGVTaXplO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgIHN3aXRjaCAobm90ZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJ2XCIsIGNlbnRlclgsIGNlbnRlclkgKyA2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlRBSUw6XHJcbiAgICAgICAgICAgICAgICBwLm5vRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlJPTExfSEVBRDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwieFwiLCBjZW50ZXJYLCBjZW50ZXJZICsgNik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5NSU5FOlxyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLmNpcmNsZShjZW50ZXJYLCBjZW50ZXJZLCAyNCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwiWFwiLCBjZW50ZXJYLCBjZW50ZXJZICsgOCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcIj9cIiwgY2VudGVyWCwgY2VudGVyWSArIDcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3UmVjZXB0b3IodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gbm90ZVNpemU7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IG5vdGVTaXplO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd0hvbGRDb25uZWN0b3IoY2VudGVyWDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZSAqIDAuNTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgc3RhcnRZLCB3aWR0aCwgZW5kWSAtIHN0YXJ0WSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0RlZmF1bHROb3RlU2tpbn0gZnJvbSBcIi4vZGVmYXVsdF9ub3RlX3NraW5cIjtcclxuXHJcbmNsYXNzIE5vdGVEaXNwbGF5IHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIGNlbnRlclk6IG51bWJlcjtcclxuICAgIG5vdGVUeXBlOiBOb3RlVHlwZTtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG4gICAgcHJpdmF0ZSBub3RlU2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0cmFja051bWJlcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVR5cGU6IE5vdGVUeXBlLCBza2V0Y2hJbnN0YW5jZTogcDUsIG5vdGVTaXplOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcbiAgICAgICAgdGhpcy5ub3RlVHlwZSA9IG5vdGVUeXBlO1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBub3RlU2l6ZTtcclxuICAgICAgICB0aGlzLnRyYWNrTnVtYmVyID0gdHJhY2tOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaXNOb3RlRHJhd1N1Y2Nlc3NmdWwgPSBnbG9iYWwubm90ZVNraW4uZHJhd05vdGUodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCxcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVUeXBlLCB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICBpZiAoIWlzTm90ZURyYXdTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgIERlZmF1bHROb3RlU2tpbi5kcmF3Tm90ZSh0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclksIHRoaXMubm90ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEhvbGRDb25uZWN0b3Ige1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgc3RhcnRZOiBudW1iZXI7XHJcbiAgICBlbmRZOiBudW1iZXI7XHJcbiAgICBub3RlU3RhcnRZOiBudW1iZXI7XHJcbiAgICBub3RlRW5kWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZW5kWTogbnVtYmVyLCBub3RlU3RhcnRZOiBudW1iZXIsIG5vdGVFbmRZOiBudW1iZXIsIHNrZXRjaEluc3RhbmNlOiBwNSkge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuc3RhcnRZID0gc3RhcnRZO1xyXG4gICAgICAgIHRoaXMuZW5kWSA9IGVuZFk7XHJcbiAgICAgICAgdGhpcy5ub3RlU3RhcnRZID0gbm90ZVN0YXJ0WTtcclxuICAgICAgICB0aGlzLm5vdGVFbmRZID0gbm90ZUVuZFk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaXNDb25uZWN0b3JEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3SG9sZENvbm5lY3Rvcih0aGlzLmNlbnRlclgsIHRoaXMuc3RhcnRZLCB0aGlzLmVuZFksXHJcbiAgICAgICAgICAgIHRoaXMubm90ZVN0YXJ0WSwgdGhpcy5ub3RlRW5kWSk7XHJcbiAgICAgICAgaWYgKCFpc0Nvbm5lY3RvckRyYXdTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgIERlZmF1bHROb3RlU2tpbi5kcmF3SG9sZENvbm5lY3Rvcih0aGlzLmNlbnRlclgsIHRoaXMuc3RhcnRZLCB0aGlzLmVuZFkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUmVjZXB0b3Ige1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIG5vdGVTaXplOiBudW1iZXJcclxuICAgIHByaXZhdGUgdHJhY2tOdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHNrZXRjaEluc3RhbmNlOiBwNSwgbm90ZVNpemU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gbm90ZVNpemU7XHJcbiAgICAgICAgdGhpcy50cmFja051bWJlciA9IHRyYWNrTnVtYmVyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzUmVjZXB0b3JEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3UmVjZXB0b3IodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCxcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICBpZiAoIWlzUmVjZXB0b3JEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd1JlY2VwdG9yKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBleHBvcnQgY2xhc3MgRGlzcGxheUNvbmZpZyB7XHJcbi8vICAgICBwdWJsaWMgbm90ZVNpemU6IG51bWJlcjtcclxuLy8gICAgIHB1YmxpYyBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuLy8gICAgIHB1YmxpYyByZWNlcHRvcllQZXJjZW50OiBudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbi8vICAgICBwdWJsaWMgcmVjZXB0b3JTaXplczogbnVtYmVyW107XHJcbi8vXHJcbi8vICAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuLy8gICAgICAgICB0aGlzLm5vdGVTaXplID0gY29uZmlnLm5vdGVTaXplO1xyXG4vLyAgICAgICAgIHRoaXMucGl4ZWxzUGVyU2Vjb25kID0gY29uZmlnLnBpeGVsc1BlclNlY29uZDtcclxuLy8gICAgICAgICB0aGlzLnJlY2VwdG9yWVBlcmNlbnQgPSBjb25maWcucmVjZXB0b3JZUGVyY2VudDtcclxuLy8gICAgICAgICB0aGlzLnNjcm9sbERpcmVjdGlvbiA9IGNvbmZpZy5zY3JvbGxEaXJlY3Rpb247XHJcbi8vICAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzID0gW107XHJcbi8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4vLyAgICAgICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMucHVzaChjb25maWcubm90ZVNpemUpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLyogQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGludGVyc2VjdCB3aXRoIHRoZSB1c2VyIENvbmZpZywgYnV0IGFyZSBleHBlY3RlZCB0byBiZSBjaGFuZ2VkIGR1cmluZyBwbGF5ICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGxheUNvbmZpZyB7XHJcbiAgICBnZXROb3RlU2l6ZTogKCkgPT4gbnVtYmVyO1xyXG4gICAgZ2V0UGl4ZWxzUGVyU2Vjb25kOiAoKSA9PiBudW1iZXI7XHJcbiAgICBnZXRSZWNlcHRvcllQZXJjZW50OiAoKSA9PiBudW1iZXI7XHJcbiAgICBnZXRTY3JvbGxEaXJlY3Rpb246ICgpID0+IFNjcm9sbERpcmVjdGlvbjtcclxuICAgIGdldFJlY2VwdG9yU2l6ZXM6ICgpID0+IG51bWJlcltdO1xyXG4gICAgc2V0UmVjZXB0b3JTaXplOiAodHJhY2tOdW1iZXI6IG51bWJlciwgcmVjZXB0b3JTaXplOiBudW1iZXIpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEaXNwbGF5TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWcsIHNrZXRjaEluc3RhbmNlOiBwNSwgdG9wTGVmdFg6IG51bWJlciA9IDAsXHJcbiAgICAgICAgICAgICAgICB0b3BMZWZ0WTogbnVtYmVyID0gMCwgd2lkdGg6IG51bWJlciA9IDE4MCwgaGVpZ2h0OiBudW1iZXIgPSA0MDApIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSBkaXNwbGF5Q29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzID0gMDtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy50b3BMZWZ0WCA9IHRvcExlZnRYO1xyXG4gICAgICAgIHRoaXMudG9wTGVmdFkgPSB0b3BMZWZ0WTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gdGhpcy5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZS5yZWN0KHRoaXMudG9wTGVmdFgsIHRoaXMudG9wTGVmdFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRyYXdOb3Rlc0FuZENvbm5lY3RvcnMoKTtcclxuICAgICAgICB0aGlzLmRyYXdSZWNlcHRvcnMoKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGVzQW5kQ29ubmVjdG9ycygpIHtcclxuICAgICAgICBsZXQgbGVhc3RUaW1lID0gdGhpcy5nZXRMZWFzdFRpbWUodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZSA9IHRoaXMuZ2V0R3JlYXRlc3RUaW1lKHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuZHJhd0FsbENvbm5lY3RvcnMobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0FsbE5vdGVzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBbGxOb3RlcyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Tm90ZXNJblRyYWNrKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCBpLCBudW1UcmFja3MsIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3Rlc0luVHJhY2sobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVJbmRleFJhbmdlID0gdGhpcy5ub3RlTWFuYWdlci5nZXROb3Rlc0J5VGltZVJhbmdlKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgbGV0IG5vdGVzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdLnNsaWNlKG5vdGVJbmRleFJhbmdlLnN0YXJ0SW5kZXgsIG5vdGVJbmRleFJhbmdlLmVuZEluZGV4Tm90SW5jbHVzaXZlKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd05vdGUobm90ZXNbaV0sIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZShub3RlOiBOb3RlLCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChub3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKG5vdGUudGltZUluU2Vjb25kcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICBuZXcgTm90ZURpc3BsYXkoeCwgeSwgbm90ZS50eXBlLCB0aGlzLnNrZXRjaEluc3RhbmNlLCB0aGlzLmRpc3BsYXlDb25maWcuZ2V0Tm90ZVNpemUoKSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcykuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExlYXN0VGltZShjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsRGlzcGxheVNlY29uZHMgPSB0aGlzLmdldERpc3BsYXlIZWlnaHQoKSAvIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRQaXhlbHNQZXJTZWNvbmQoKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWUgLSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JZUGVyY2VudCgpIC8gMTAwICogdG90YWxEaXNwbGF5U2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdyZWF0ZXN0VGltZShjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsRGlzcGxheVNlY29uZHMgPSB0aGlzLmdldERpc3BsYXlIZWlnaHQoKSAvIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRQaXhlbHNQZXJTZWNvbmQoKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWUgKyAoMSAtIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvcllQZXJjZW50KCkgLyAxMDApICogdG90YWxEaXNwbGF5U2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcmVjZXB0b3JTcGFjaW5nID0gdGhpcy5nZXREaXNwbGF5V2lkdGgoKSAvIG51bVRyYWNrcyAtIHRoaXMuZGlzcGxheUNvbmZpZy5nZXROb3RlU2l6ZSgpO1xyXG4gICAgICAgIHJldHVybiAoMiAqIHRyYWNrTnVtYmVyICsgMSkgLyAyICogKHRoaXMuZGlzcGxheUNvbmZpZy5nZXROb3RlU2l6ZSgpICsgcmVjZXB0b3JTcGFjaW5nKSArIHRoaXMudG9wTGVmdFg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBlc3NlbnRpYWxseSBkZWZpbmVzIGEgY29udmVyc2lvbiBmcm9tIHNlY29uZHMgdG8gcGl4ZWxzXHJcbiAgICBwdWJsaWMgZ2V0Tm90ZUNlbnRlclkobm90ZVRpbWVJblNlY29uZHM6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlWU9mZnNldCA9IHRoaXMuZGlzcGxheUNvbmZpZy5nZXRQaXhlbHNQZXJTZWNvbmQoKSAqIChub3RlVGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgcmVjZXB0b3JZT2Zmc2V0ID0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yWVBlcmNlbnQoKSAvIDEwMCAqIHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlDb25maWcuZ2V0U2Nyb2xsRGlyZWN0aW9uKCkgPT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNlcHRvcllPZmZzZXQgKyBub3RlWU9mZnNldCArIHRoaXMudG9wTGVmdFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC0gKHJlY2VwdG9yWU9mZnNldCArIG5vdGVZT2Zmc2V0KSArIHRoaXMudG9wTGVmdFk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheVdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbENvbm5lY3RvcnMobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0FsbFRyYWNrQ29ubmVjdG9ycyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgdHJhY2tzW2ldLCBpLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzLmxlbmd0aCwgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbFRyYWNrQ29ubmVjdG9ycyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrOiBOb3RlW10sIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZVN0YWNrOiBOb3RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm90ZTogTm90ZSA9IHRyYWNrW2ldO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudGltZUluU2Vjb25kcyA8IGxlYXN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudGltZUluU2Vjb25kcyA8IGdyZWF0ZXN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnROb3RlID0gbm90ZVN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmROb3RlID0gY3VycmVudE5vdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0Tm90ZSAhPSB1bmRlZmluZWQgJiYgZW5kTm90ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQgfHwgc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5IRUxEKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kTm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZSwgZW5kTm90ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vdGVTdGFjay5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnROb3RlID0gbm90ZVN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmROb3RlID0gY3VycmVudE5vdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0Tm90ZSAhPSB1bmRlZmluZWQgJiYgZW5kTm90ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQgfHwgc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5IRUxEKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kTm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZSwgZW5kTm90ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0Nvbm5lY3RvcihzdGFydE5vdGU6IE5vdGUsIGVuZE5vdGU6IE5vdGUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBub3RlU3RhcnRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShzdGFydE5vdGUudGltZUluU2Vjb25kcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIGxldCBub3RlRW5kWSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkoZW5kTm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcblxyXG4gICAgICAgIGxldCBkcmF3U3RhcnRZO1xyXG4gICAgICAgIGlmIChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpIHtcclxuICAgICAgICAgICAgZHJhd1N0YXJ0WSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkoTWF0aC5taW4oY3VycmVudFRpbWUsIGVuZE5vdGUudGltZUluU2Vjb25kcyksIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkcmF3U3RhcnRZID0gbm90ZVN0YXJ0WTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJhd1N0YXJ0WSA9IHRoaXMuY2xhbXBWYWx1ZVRvUmFuZ2UoZHJhd1N0YXJ0WSwgdGhpcy50b3BMZWZ0WSwgdGhpcy50b3BMZWZ0WSArIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IGRyYXdFbmRZID0gbm90ZUVuZFlcclxuICAgICAgICBkcmF3RW5kWSA9IHRoaXMuY2xhbXBWYWx1ZVRvUmFuZ2UoZHJhd0VuZFksIHRoaXMudG9wTGVmdFksIHRoaXMudG9wTGVmdFkgKyB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIG5ldyBIb2xkQ29ubmVjdG9yKGNlbnRlclgsIGRyYXdTdGFydFksIGRyYXdFbmRZLCBub3RlU3RhcnRZLCBub3RlRW5kWSwgdGhpcy5za2V0Y2hJbnN0YW5jZSkuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xhbXBWYWx1ZVRvUmFuZ2UodmFsdWU6IG51bWJlciwgbG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IGxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvd2VyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSA+IHVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdSZWNlcHRvcnMoKSB7XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ldyBSZWNlcHRvcih0aGlzLmdldE5vdGVDZW50ZXJYKGksIG51bVRyYWNrcyksIHRoaXMuZ2V0Tm90ZUNlbnRlclkodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcywgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlLCB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JTaXplcygpW2ldLCBpLCBudW1UcmFja3MpLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG4vKiBMZXRzIHVzIGNvZGUgdGhlIERPTSBVSSBlbGVtZW50cyBhcyBpZiBpdCB3ZXJlIFwiaW1tZWRpYXRlXCIsIGkuZS4gc3RhdGVsZXNzLlxyXG4gKiBBbGwgcmVnaXN0ZXJlZCBlbGVtZW50cyBhcmUgcmVtb3ZlZCB3aGVuIHRoZSBwYWdlIGNoYW5nZXNcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBET01XcmFwcGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlZ2lzdHJ5OiBNYXA8c3RyaW5nLCBwNS5FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvLyB1bmlxdWVJRCBzaG91bGQgYmUgdW5pcXVlIHdpdGhpbiBhIHNjZW5lXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShjcmVhdGVDYWxsOiAoKSA9PiBwNS5FbGVtZW50LCB1bmlxdWVJZDogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJ5Lmhhcyh1bmlxdWVJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMucmVnaXN0cnkuZ2V0KHVuaXF1ZUlkKSxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUNhbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5zZXQodW5pcXVlSWQsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJSZWdpc3RyeSgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmZvckVhY2goKHZhbHVlLCBrZXksIG1hcCkgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIHJlbW92ZSB3YXMgc3VjY2Vzc2Z1bCwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyeS5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuZ2V0KGlkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGVsZW1lbnQgaWYgZm91bmQsIG90aGVyd2lzZSByZXR1cm5zIHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChpZCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3QWNjdXJhY3lCYXJzKHA6IHA1LCBhY2N1cmFjeUxhYmVsczogc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhckhlaWdodDogbnVtYmVyLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Jvb0Zvckxhc3RBY2N1cmFjeTogYm9vbGVhbikge1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IGdldE1heFRleHRXaWR0aChwLCBhY2N1cmFjeUxhYmVscywgdGV4dFNpemUpO1xyXG4gICAgbGV0IHRvdGFsTm90ZXMgPSBub3RlTWFuYWdlci5nZXRUb3RhbE5vdGVzKCk7XHJcbiAgICBsZXQgYmFyU3BhY2luZyA9IDEwO1xyXG4gICAgbGV0IHRvdGFsSGVpZ2h0ID0gYWNjdXJhY3lMYWJlbHMubGVuZ3RoICogYmFySGVpZ2h0ICsgKGFjY3VyYWN5TGFiZWxzLmxlbmd0aCAtIDEpICogYmFyU3BhY2luZztcclxuICAgIGxldCBzdGFydFkgPSAocC5oZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyICsgYmFySGVpZ2h0IC8gMjtcclxuICAgIHN0YXJ0WSAqPSAwLjg7IC8vIHNoaWZ0IHRoZSByZXN1bHRzIHVwIHRvIG1ha2Ugcm9vbSBmb3IgZXhpdCBidXR0b25cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWN5TGFiZWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5TGFiZWwgPSBhY2N1cmFjeUxhYmVsc1tpXTtcclxuICAgICAgICBsZXQgbnVtQWNjdXJhY3lFdmVudHMgPSBnZXROdW1BY2N1cmFjeUV2ZW50cyhhY2N1cmFjeUxhYmVsLCBhY2N1cmFjeVJlY29yZGluZywgYWNjdXJhY3lNYW5hZ2VyKTtcclxuICAgICAgICBsZXQgcGVyY2VudEZpbGxlZCA9IG51bUFjY3VyYWN5RXZlbnRzIC8gdG90YWxOb3RlcztcclxuXHJcbiAgICAgICAgaWYgKGlzQm9vRm9yTGFzdEFjY3VyYWN5ICYmIGkgPT09IGFjY3VyYWN5TGFiZWxzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgZHJhd0FjY3VyYWN5V2l0aE5vQmFyKHAsIGNlbnRlclgsIHN0YXJ0WSArIGkgKiAoYmFySGVpZ2h0ICsgYmFyU3BhY2luZyksIGFjY3VyYWN5TGFiZWwsXHJcbiAgICAgICAgICAgICAgICBudW1BY2N1cmFjeUV2ZW50cy50b1N0cmluZygpLCB0b3RhbE5vdGVzLnRvU3RyaW5nKCksIHRleHRTaXplLCBtYXhUZXh0V2lkdGgsIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdBY2N1cmFjeUJhcihwLCBjZW50ZXJYLCBzdGFydFkgKyBpICogKGJhckhlaWdodCArIGJhclNwYWNpbmcpLCBhY2N1cmFjeUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgbnVtQWNjdXJhY3lFdmVudHMudG9TdHJpbmcoKSwgdG90YWxOb3Rlcy50b1N0cmluZygpLCB0ZXh0U2l6ZSwgbWF4VGV4dFdpZHRoLCBiYXJXaWR0aCwgYmFySGVpZ2h0LCBwZXJjZW50RmlsbGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE51bUFjY3VyYWN5RXZlbnRzKGFjY3VyYWN5TGFiZWw6IHN0cmluZywgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcikge1xyXG4gICAgcmV0dXJuIGFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZy5yZWR1Y2UoKHN1bSwgdHJhY2tSZWNvcmRpbmcpID0+XHJcbiAgICAgICAgc3VtICsgdHJhY2tSZWNvcmRpbmcuZmlsdGVyKGFjY3VyYWN5RXZlbnQgPT5cclxuICAgICAgICBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzLCBhY2N1cmFjeU1hbmFnZXIuY29uZmlnKSA9PT0gYWNjdXJhY3lMYWJlbCkubGVuZ3RoLCAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWF4VGV4dFdpZHRoKHA6IHA1LCB0ZXh0QXJyYXk6IHN0cmluZ1tdLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IHRleHRBcnJheS5tYXAoKHN0cmluZykgPT4gcC50ZXh0V2lkdGgoc3RyaW5nKSlcclxuICAgICAgICAucmVkdWNlKChtYXhXaWR0aCwgd2lkdGgpID0+IE1hdGgubWF4KG1heFdpZHRoLCB3aWR0aCwgLTEpKTtcclxuICAgIHAucG9wKCk7XHJcbiAgICByZXR1cm4gbWF4VGV4dFdpZHRoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3QWNjdXJhY3lCYXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBsYWJlbDE6IHN0cmluZywgbGFiZWwyOiBzdHJpbmcsIGxhYmVsMzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTaXplOiBudW1iZXIsIGxhcmdlc3RUZXh0V2lkdGg6IG51bWJlciwgYmFyV2lkdGg6IG51bWJlciwgYmFySGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudEZpbGxlZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCA9IDg7XHJcbiAgICBsZXQgdG90YWxXaWR0aCA9IGxhcmdlc3RUZXh0V2lkdGggKyBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsICsgYmFyV2lkdGg7XHJcbiAgICBsZXQgbGFiZWxSaWdodG1vc3RYID0gY2VudGVyWCAtIHRvdGFsV2lkdGggLyAyICsgbGFyZ2VzdFRleHRXaWR0aDtcclxuICAgIGRyYXdSaWdodEFsaWduZWRMYWJlbChwLCBsYWJlbFJpZ2h0bW9zdFgsIGNlbnRlclksIGxhYmVsMSwgdGV4dFNpemUpO1xyXG5cclxuICAgIGxldCBiYXJSaWdodFggPSBjZW50ZXJYICsgdG90YWxXaWR0aCAvIDI7XHJcbiAgICBsZXQgYmFyTGVmdFggPSBiYXJSaWdodFggLSBiYXJXaWR0aDtcclxuICAgIGxldCBiYXJDZW50ZXJYID0gKGJhckxlZnRYICsgYmFyUmlnaHRYKSAvIDI7XHJcbiAgICBkcmF3UGFydGlhbGx5RmlsbGVkQmFyKHAsIGJhckNlbnRlclgsIGNlbnRlclksIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQsIHRleHRTaXplLCBsYWJlbDIsIGxhYmVsMyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdSaWdodEFsaWduZWRMYWJlbChwOiBwNSwgcmlnaHRtb3N0WDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHQ6IHN0cmluZywgdGV4dFNpemU6IG51bWJlcikge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5SSUdIVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHRleHQsIHJpZ2h0bW9zdFgsIGNlbnRlclkpO1xyXG4gICAgcC5wb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1BhcnRpYWxseUZpbGxlZEJhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIHN0YXJ0TGFiZWw6IHN0cmluZywgZW5kTGFiZWw6IHN0cmluZykge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLnJlY3RNb2RlKHAuQ0VOVEVSKTtcclxuICAgIHAuc3Ryb2tlKFwid2hpdGVcIik7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgZmlsbGVkIHBhcnQgb2YgdGhlIGJhclxyXG4gICAgcC5maWxsKFwiZ3JheVwiKTtcclxuICAgIHAucmVjdChjZW50ZXJYIC0gKHdpZHRoICogKDEgLSBwZXJjZW50RmlsbGVkKSAvIDIpLCBjZW50ZXJZLCB3aWR0aCAqIHBlcmNlbnRGaWxsZWQsIGhlaWdodCk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgb3V0bGluZSBvZiB0aGUgYmFyXHJcbiAgICBwLm5vRmlsbCgpO1xyXG4gICAgcC5yZWN0KGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIGxhYmVscyBvbiB0aGUgZW5kcyBvZiB0aGUgYmFyXHJcbiAgICBsZXQgbGFiZWxTaXplID0gMS41ICogdGV4dFNpemU7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUobGFiZWxTaXplKTtcclxuICAgIHAudGV4dEFsaWduKHAuTEVGVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHN0YXJ0TGFiZWwsIGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAudGV4dEFsaWduKHAuUklHSFQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChlbmRMYWJlbCwgY2VudGVyWCArIHdpZHRoIC8gMiwgY2VudGVyWSArIDIpO1xyXG4gICAgcC5wb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0FjY3VyYWN5V2l0aE5vQmFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbGFiZWwxOiBzdHJpbmcsIGxhYmVsMjogc3RyaW5nLCBsYWJlbDM6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTaXplOiBudW1iZXIsIGxhcmdlc3RUZXh0V2lkdGg6IG51bWJlciwgYmFyV2lkdGg6IG51bWJlciwgYmFySGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIpIHtcclxuICAgIGxldCBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsID0gODtcclxuICAgIGxldCB0b3RhbFdpZHRoID0gbGFyZ2VzdFRleHRXaWR0aCArIHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgKyBiYXJXaWR0aDtcclxuICAgIGxldCBsYWJlbFJpZ2h0bW9zdFggPSBjZW50ZXJYIC0gdG90YWxXaWR0aCAvIDIgKyBsYXJnZXN0VGV4dFdpZHRoO1xyXG4gICAgZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHAsIGxhYmVsUmlnaHRtb3N0WCwgY2VudGVyWSwgbGFiZWwxLCB0ZXh0U2l6ZSk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgYWNjdXJhY3kgY291bnQgbGFiZWwgb24gdGhlIGxlZnQgZW5kIG9mIHRoZSBiYXJcclxuICAgIGxldCBsYWJlbFNpemUgPSAxLjUgKiB0ZXh0U2l6ZTtcclxuICAgIGxldCBiYXJSaWdodFggPSBjZW50ZXJYICsgdG90YWxXaWR0aCAvIDI7XHJcbiAgICBsZXQgYmFyTGVmdFggPSBiYXJSaWdodFggLSBiYXJXaWR0aDtcclxuICAgIGxldCBiYXJDZW50ZXJYID0gKGJhckxlZnRYICsgYmFyUmlnaHRYKSAvIDI7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZShsYWJlbFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5MRUZULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQobGFiZWwyLCBiYXJDZW50ZXJYIC0gYmFyV2lkdGggLyAyLCBjZW50ZXJZICsgMik7XHJcbiAgICBwLnBvcCgpO1xyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvbGRHbG93IHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGdsb3dTdGFydFRpbWVzOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgc3RhdGljIGRvbnREcmF3RmxhZzogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnbG93UGVyaW9kSW5TZWNvbmRzOiBudW1iZXIgPSAwLjM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyLCBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXMucHVzaChIb2xkR2xvdy5kb250RHJhd0ZsYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXSAhPT0gSG9sZEdsb3cuZG9udERyYXdGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGFwc2VkVGltZSA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gdGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjdXJyZW50VGltZUluU2Vjb25kcywgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdsb3dBbHBoYSA9IHRoaXMuZ2V0R2xvd0FscGhhKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBnbG93Q29sb3IgPSBwLmNvbG9yKDAsIDI1NSwgMCwgZ2xvd0FscGhhKTtcclxuICAgICAgICAgICAgICAgIGxldCBnbG93U2l6ZSA9IHRoaXMuZ2V0R2xvd1NpemUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R2xvdyhwLCBjZW50ZXJYLCBjZW50ZXJZLCBnbG93U2l6ZSwgZ2xvd1NpemUgLyAyLCBnbG93Q29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dsb3cocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5ub1N0cm9rZSgpO1xyXG4gICAgICAgIHAuZmlsbChjb2xvcik7XHJcbiAgICAgICAgcC5lbGxpcHNlKGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRHbG93QWxwaGEoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmltYXRpb25UaW1lID0gZWxhcHNlZFRpbWVJblNlY29uZHMgJSBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25SYXRpbyA9IGFuaW1hdGlvblRpbWUgLyBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpTGVycCgwLCA1MCwgYW5pbWF0aW9uUmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R2xvd1NpemUoZWxhcHNlZFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmltYXRpb25UaW1lID0gZWxhcHNlZFRpbWVJblNlY29uZHMgJSBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25SYXRpbyA9IGFuaW1hdGlvblRpbWUgLyBIb2xkR2xvdy5nbG93UGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCBtYXhTaXplID0gdGhpcy5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmlMZXJwKDAsIG1heFNpemUsIGFuaW1hdGlvblJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJpTGVycChtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDwgMC41KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlcnAobWluVmFsdWUsIG1heFZhbHVlLCAxIC0gcmF0aW8gLyAwLjUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlcnAobWluVmFsdWUsIG1heFZhbHVlLCAyICogcmF0aW8gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsZXJwKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl0gPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5ob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdID0gSG9sZEdsb3cuZG9udERyYXdGbGFnO1xyXG4gICAgfVxyXG59IiwiLyogVGhpcyBjbGFzcyBpcyBpbnRlbmRlZCBvbmx5IHRvIGJlIHVzZWQgdG8gc3RvcmUgdGhlIGhvbGQgc3RhdGUgZm9yIG5vdGVzIHRoYXQgY2FuIGJlIGhlbGQuIFRoaXMgc2hvdWxkbid0IGJlIHVzZWRcclxuICAgZm9yIG5vcm1hbCBub3RlcyBvciBnZW5lcmFsIGtleWJvYXJkIHN0YXRlICovXHJcbmV4cG9ydCBjbGFzcyBIb2xkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGhlbGRUcmFja3M6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgb25UcmFja0hvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgb25UcmFja1VuaG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG51bVRyYWNrczogbnVtYmVyLCBvblRyYWNrSG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgICAgb25UcmFja1VuaG9sZDogKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzPzogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbGRUcmFja3MucHVzaChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25UcmFja0hvbGQgPSBvblRyYWNrSG9sZDtcclxuICAgICAgICB0aGlzLm9uVHJhY2tVbmhvbGQgPSBvblRyYWNrVW5ob2xkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1RyYWNrSGVsZCh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblRyYWNrSG9sZCh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25UcmFja1VuaG9sZCh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtQYXJ0aWNsZVN5c3RlbX0gZnJvbSBcIi4vcGFydGljbGVfc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb2xkUGFydGljbGVzIHtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgcGFydGljbGVTeXN0ZW1zOiBQYXJ0aWNsZVN5c3RlbVtdO1xyXG4gICAgcHJpdmF0ZSBwcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wczogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kczogbnVtYmVyID0gMS41O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZG9udERyYXdGbGFnOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlUGVyaW9kSW5TZWNvbmRzOiBudW1iZXIgPSAwLjA1O1xyXG4gICAgcHJpdmF0ZSBncmF2aXR5RGlyZWN0aW9uOiBudW1iZXJcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBkaXNwbGF5TWFuYWdlcjtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmdyYXZpdHlEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93biA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgZ3Jhdml0eTogcDUuVmVjdG9yID0gcC5jcmVhdGVWZWN0b3IoMCwgMjAwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtcy5wdXNoKG5ldyBQYXJ0aWNsZVN5c3RlbShIb2xkUGFydGljbGVzLnBhcnRpY2xlc0xpZmV0aW1lSW5TZWNvbmRzLCBncmF2aXR5KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzLnB1c2goSG9sZFBhcnRpY2xlcy5kb250RHJhd0ZsYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFydGljbGVzVG9UcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1t0cmFja051bWJlcl0uZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkUGFydGljbGVzVG9UcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdICE9PSBIb2xkUGFydGljbGVzLmRvbnREcmF3RmxhZykge1xyXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gKyBIb2xkUGFydGljbGVzLnBhcnRpY2xlUGVyaW9kSW5TZWNvbmRzIDwgY3VycmVudFRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdUaW1lc3RhbXAgPSB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSArIEhvbGRQYXJ0aWNsZXMucGFydGljbGVQZXJpb2RJblNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjZXB0b3JUaW1lUG9zaXRpb24gPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsUG9zaXRpb24gPSB0aGlzLmdldEluaXRpYWxQb3NpdGlvbihwLCB0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHJlY2VwdG9yVGltZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsVmVsb2NpdHkgPSBwLmNyZWF0ZVZlY3RvcigwLCAtNTAwICogdGhpcy5ncmF2aXR5RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW3RyYWNrTnVtYmVyXS5hZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbiwgaW5pdGlhbFZlbG9jaXR5LCBuZXdUaW1lc3RhbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgMSwgcC5jb2xvcigwLCAyNTUsIDAsIDE1MCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gPSBuZXdUaW1lc3RhbXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbml0aWFsUG9zaXRpb24ocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJZKGNlbnRlclRpbWVJblNlY29uZHMsIGNlbnRlclRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVZlY3RvcihjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gPSBIb2xkUGFydGljbGVzLmRvbnREcmF3RmxhZztcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge09ubGluZVBsYXlsaXN0fSBmcm9tIFwiLi9vbmxpbmVfcGxheWxpc3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWw6IGFueSA9IHt9O1xyXG5nbG9iYWwucDVTY2VuZSA9IG5ldyBQNVNjZW5lKCk7XHJcbmdsb2JhbC5jb25maWcgPSBDb25maWcubG9hZCgpO1xyXG5nbG9iYWwuZ2xvYmFsQ2xhc3MgPSBcImdhbWVcIjtcclxuZ2xvYmFsLm9ubGluZVBsYXlsaXN0ID0gbmV3IE9ubGluZVBsYXlsaXN0KCk7IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2V0S2V5U3RyaW5nLCBzZXRDb25maWdLZXlCaW5kaW5nfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmdzVWl9IGZyb20gXCIuL2tleV9iaW5kaW5nc191aVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXlCaW5kaW5nIHtcclxuICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICBrZXlDb2RlOiBudW1iZXIsXHJcbiAgICBzdHJpbmc6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5QmluZGluZ0hlbHBlciB7XHJcbiAgICBwcml2YXRlIGJpbmRpbmdzVG9BY3F1aXJlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRCaW5kaW5nTnVtYmVyOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmluZGluZ3NUb0FjcXVpcmU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3NUb0FjcXVpcmUgPSBiaW5kaW5nc1RvQWNxdWlyZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYmluZE5leHQocDogcDUsIGtleUJpbmRpbmdzUXVpY2tzdGFydElkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQga2V5YmluZGluZzogS2V5QmluZGluZyA9IHtcclxuICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIsXHJcbiAgICAgICAgICAgIGtleUNvZGU6IHAua2V5Q29kZSxcclxuICAgICAgICAgICAgc3RyaW5nOiBnZXRLZXlTdHJpbmcocClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldENvbmZpZ0tleUJpbmRpbmcodGhpcy5jdXJyZW50QmluZGluZ051bWJlciwgdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSwga2V5YmluZGluZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmluZGluZ051bWJlcisrO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QmluZGluZ051bWJlciA+PSB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoLTEpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCkuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgICAgICAgICAgS2V5QmluZGluZ3NVaS5ub0xvbmdlcldhaXRpbmdGb3JMYXN0S2V5KHApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEtleUJpbmRpbmdzVWkuc2Nyb2xsS2V5QmluZGluZ0ludG9WaWV3KHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIpO1xyXG4gICAgICAgICAgICBLZXlCaW5kaW5nc1VpLmluZGljYXRlV2FpdGluZ0ZvcktleShwLCB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ0hlbHBlcn0gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBmaW5kQmluZGluZ0luZm9Gb3JUcmFjaywgZ2VuZXJhdGVQcmV2aWV3Tm90ZXMsIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSxcclxuICAgIGdldEtleVN0cmluZyxcclxuICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyxcclxuICAgIGlzS2V5QmluZGluZ3NEZWZpbmVkLFxyXG4gICAgc2V0Q29uZmlnS2V5QmluZGluZ1xyXG59IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtjcmVhdGVMYWJlbCwgY3JlYXRlTGFiZWxlZElucHV0LCBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzfSBmcm9tIFwiLi91aV91dGlsXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBLZXlCaW5kaW5nc1VpIHtcclxuICAgIHByaXZhdGUgc3RhdGljIFNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVDogc3RyaW5nID0gXCJTZXRcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIFNFVF9CVVRUT05fQUNUSVZFX1RFWFQ6IHN0cmluZyA9IFwiUHJlc3MgQW55IEtleVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbnVtVHJhY2tzOiBudW1iZXIgPSA0O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdyhwOiBwNSwgcGFyZW50RWxlbWVudDogcDUuRWxlbWVudCwgcGFnZVN0eWxlQ2xhc3M6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIgPSB0aGlzLmNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGlsZChrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIuZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5udW1UcmFja3MgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubnVtVHJhY2tzID0gNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByZXZpZXdOdW1UcmFja3MgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJOdW1iZXIgb2YgVHJhY2tzXCIsIFwicHJldmlld051bVRyYWNrc0lucHV0XCIsXHJcbiAgICAgICAgICAgIHRoaXMubnVtVHJhY2tzLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMocHJldmlld051bVRyYWNrcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHByZXZpZXdOdW1UcmFja3MuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgJiYgdmFsdWUgPiAwICYmIHZhbHVlIDw9IDI2KSB7XHJcbiAgICAgICAgICAgICAgICBLZXlCaW5kaW5nc1VpLnJlbW92ZU9sZEJpbmRpbmdCdXR0b25zKHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubnVtVHJhY2tzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucHJldmlld0Rpc3BsYXkgPSBuZXcgUHJldmlld0Rpc3BsYXkoZ2VuZXJhdGVQcmV2aWV3Tm90ZXModmFsdWUpLCBnbG9iYWwuY29uZmlnLCBnbG9iYWwucDVTY2VuZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXByZXZpZXdOdW1UcmFja3MuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNoaWxkKHByZXZpZXdOdW1UcmFja3MuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJLZXktQmluZGluZ3MgUXVpY2tzdGFydFwiKTtcclxuICAgICAgICB9LCBcImtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvblwiKTtcclxuICAgICAgICBpZiAoIWtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nc1F1aWNrc3RhcnRJZCA9IFwia2V5YmluZGluZ3MtcXVpY2tzdGFydFwiO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhwYWdlU3R5bGVDbGFzcyk7XHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKFwia2V5YmluZGluZ3MtcXVpY2tzdGFydFwiKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuaWQoa2V5QmluZGluZ3NRdWlja3N0YXJ0SWQpO1xyXG5cclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXliaW5kaW5nSGVscGVyID0gbmV3IEtleUJpbmRpbmdIZWxwZXIodGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxLZXlCaW5kaW5nSW50b1ZpZXcoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRlV2FpdGluZ0ZvcktleShwLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRoaXMgYWN0aW9uIHRvIHRoZSBcIi0xXCIga2V5IHNvIHRoYXQgaXQgaGFwcGVucyBvbiBhbnkga2V5IHByZXNzXHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKC0xLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoaXMgY29kZSBiZWNhdXNlIGl0J3MgdXNlZCB0byBpbmRpY2F0ZSBpbnB1dCB0aGF0J3Mgbm90IHlldCBmaW5pc2hlZCBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAua2V5Q29kZSAhPT0gMjI5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleWJpbmRpbmdIZWxwZXIuYmluZE5leHQocCwga2V5QmluZGluZ3NRdWlja3N0YXJ0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0tleUJpbmRpbmdzRGVmaW5lZCh0aGlzLm51bVRyYWNrcykpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzKHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nSW5wdXQgPSB0aGlzLmNyZWF0ZUtleUJpbmRpbmdJbnB1dCh0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHBhZ2VTdHlsZUNsYXNzKTtcclxuICAgICAgICAgICAgaWYgKCFrZXlCaW5kaW5nSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGlsZChrZXlCaW5kaW5nSW5wdXQuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlS2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyKCk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmh0bWwoXHJcbiAgICAgICAgICAgICAgICAnS2V5IEJpbmRpbmdzIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjEycHhcIj4odHJhY2sgMSBpcyB0aGUgbGVmdG1vc3QgdHJhY2spPC9zcGFuPidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwib3B0aW9ucy1mcmVlLXRleHRcIik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9LCBcImtleUJpbmRpbmdzU2VjdGlvbkhlYWRlclwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVLZXlCaW5kaW5nSW5wdXQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1c3RvbUNsYXNzOiBzdHJpbmcpXHJcbiAgICAgICAgOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgICAgIGxldCBzZXRCdXR0b25JZCA9IHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBrZXliaW5kaW5nSW5wdXRDbGFzcyA9IFwia2V5YmluZGluZy1pbnB1dFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIFwiXCIpO1xyXG4gICAgICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgICAgIGxhYmVsLmFkZENsYXNzKGtleWJpbmRpbmdJbnB1dENsYXNzKTtcclxuICAgICAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2V0QnV0dG9uID0gcC5jcmVhdGVCdXR0b24oXCJTZXRcIik7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbi5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLmlkKHNldEJ1dHRvbklkKTtcclxuICAgICAgICAgICAgc2V0QnV0dG9uLm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRlV2FpdGluZ0ZvcktleShwLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKC0xLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoaXMgY29kZSBiZWNhdXNlIGl0J3MgdXNlZCB0byBpbmRpY2F0ZSBpbnB1dCB0aGF0J3Mgbm90IHlldCBmaW5pc2hlZCBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAua2V5Q29kZSAhPT0gMjI5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmZpZ0tleUJpbmRpbmcodHJhY2tOdW1iZXIsIG51bVRyYWNrcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFja051bWJlcjogdHJhY2tOdW1iZXIsIGtleUNvZGU6IHAua2V5Q29kZSwgc3RyaW5nOiBnZXRLZXlTdHJpbmcocCl9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub0xvbmdlcldhaXRpbmdGb3JLZXkoc2V0QnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLnVuYmluZEtleSgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfSwgdGhpcy5nZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykpO1xyXG5cclxuICAgICAgICBsZXQgdHJhY2tCaW5kaW5nSW5mbyA9IGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyLCBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpKTtcclxuICAgICAgICBsZXQga2V5U3RyaW5nID0gdHJhY2tCaW5kaW5nSW5mby5zdHJpbmc7XHJcbiAgICAgICAgbGV0IGxhYmVsU3RyaW5nID0gJ1RyYWNrICcgKyAodHJhY2tOdW1iZXIgKyAxKSArICc6IDxzcGFuIGNsYXNzPVwiJyArXHJcbiAgICAgICAgICAgIGtleWJpbmRpbmdJbnB1dENsYXNzICsgXCIgXCIgKyBjdXN0b21DbGFzcyArIFwiIFwiICsgZ2xvYmFsLmdsb2JhbENsYXNzICtcclxuICAgICAgICAgICAgJ1wiPicgKyBrZXlTdHJpbmcgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJMQUJFTFwiKTtcclxuICAgICAgICBsYWJlbEVsZW1lbnQuaHRtbChsYWJlbFN0cmluZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbmRpY2F0ZVdhaXRpbmdGb3JLZXkocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2V0QnV0dG9uczogcDUuRWxlbWVudFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNldEJ1dHRvbnMucHVzaCh0aGlzLmdldFNldEJ1dHRvbihwLCBpLCB0aGlzLm51bVRyYWNrcykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXRCdXR0b246IHA1LkVsZW1lbnQgPSBzZXRCdXR0b25zW2ldO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gdHJhY2tOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHNldEJ1dHRvbi5odG1sKHRoaXMuU0VUX0JVVFRPTl9BQ1RJVkVfVEVYVCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRCdXR0b24uaHRtbCh0aGlzLlNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U2V0QnV0dG9uKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcik6IHA1LkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBzZXRCdXR0b25JZCA9IHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHJldHVybiBwLnNlbGVjdChcIiNcIiArIHNldEJ1dHRvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBub0xvbmdlcldhaXRpbmdGb3JLZXkoc2V0QnV0dG9uOiBwNS5FbGVtZW50KSB7XHJcbiAgICAgICAgc2V0QnV0dG9uLmh0bWwodGhpcy5TRVRfQlVUVE9OX0lOQUNUSVZFX1RFWFQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbm9Mb25nZXJXYWl0aW5nRm9yTGFzdEtleShwOiBwNSkge1xyXG4gICAgICAgIGxldCBzZXRCdXR0b246IHA1LkVsZW1lbnQgPSB0aGlzLmdldFNldEJ1dHRvbihwLCB0aGlzLm51bVRyYWNrcyAtIDEsIHRoaXMubnVtVHJhY2tzKTtcclxuICAgICAgICBzZXRCdXR0b24uaHRtbCh0aGlzLlNFVF9CVVRUT05fSU5BQ1RJVkVfVEVYVCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5QmluZGluZ1VuaXF1ZUlkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpICsgXCJCdXR0b25cIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gXCJ0cmFja1wiICsgdHJhY2tOdW1iZXIgKyBcIk9mXCIgKyBudW1UcmFja3MgKyBcIkJpbmRpbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNjcm9sbEtleUJpbmRpbmdJbnRvVmlldyh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdCdXR0b25JZCA9IHRoaXMuZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoa2V5QmluZGluZ0J1dHRvbklkKS5wYXJlbnRFbGVtZW50LnNjcm9sbEludG9WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVPbGRCaW5kaW5nQnV0dG9ucyhudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBudW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZCh0aGlzLmdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBhY3Rpb25CaW5kaW5nczogTWFwPG51bWJlciwge2tleURvd25BY3Rpb246ICgpID0+IHZvaWQsIGtleVVwQWN0aW9uOiAoKSA9PiB2b2lkfT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocDogcDUpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbkJpbmRpbmdzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBwLmtleVByZXNzZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gLTEgaXMgYSBzcGVjaWFsIGtleUNvZGUgZmxhZyB0aGF0IG1lYW5zIFwiYW55XCIuIFRoaXMgaXMgZXNwZWNpYWxseSB1c2VmdWwgZm9yIHNldHRpbmcgdXAga2V5IGJpbmRpbmdzLlxyXG4gICAgICAgICAgICBsZXQgZ2xvYmFsQWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KC0xKTtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMua2V5RG93bkFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQocC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucy5rZXlEb3duQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVxdWl2YWxlbnQgdG8gZXZlbnQucHJldmVudERlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgcC5rZXlSZWxlYXNlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KHAua2V5Q29kZSk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLmtleVVwQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmtleVVwQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXF1aXZhbGVudCB0byBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5VG9BY3Rpb24oa2V5Q29kZTogbnVtYmVyLCBrZXlEb3duQWN0aW9uOiAoKSA9PiB2b2lkLCBrZXlVcEFjdGlvbjogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uQmluZGluZ3Muc2V0KGtleUNvZGUsIHtrZXlEb3duQWN0aW9uOiBrZXlEb3duQWN0aW9uLCBrZXlVcEFjdGlvbjoga2V5VXBBY3Rpb259KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRLZXkoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uQmluZGluZ3MuZGVsZXRlKGtleUNvZGUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnZXRNaXNzQm91bmRhcnl9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXNzTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGxhc3RDaGVja2VkTm90ZUluZGljZXM6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudDogKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyLCBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlcy5wdXNoKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5ob2xkTWFuYWdlciA9IGhvbGRNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCA9IGhhbmRsZUFjY3VyYWN5RXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyBBIGxvd2VyQm91bmQgZm9yIG1pc3NlcyBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGlzIHdheSBvZiBkb2luZyBtaXNzZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWxsTWlzc2VkTm90ZXNGb3JUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUFsbE1pc3NlZE5vdGVzRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBpbmRleE9mTGFzdENoZWNrZWROb3RlID0gdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhPZkxhc3RDaGVja2VkTm90ZSA+PSB0cmFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm90ZSA9IHRyYWNrW2luZGV4T2ZMYXN0Q2hlY2tlZE5vdGVdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05vdE1pc3NhYmxlKGN1cnJlbnROb3RlKSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSsrO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb3RlTWlzc2VkQW5kTm90SGFuZGxlZChjdXJyZW50Tm90ZSwgY3VycmVudFRpbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1pc3NlZE5vdGUodHJhY2tOdW1iZXIsIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlc1t0cmFja051bWJlcl0gPSBpbmRleE9mTGFzdENoZWNrZWROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvciBleGFtcGxlOiBub3RlcyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIGhpdCBhcmUgbm90IG1pc3NhYmxlXHJcbiAgICBwcml2YXRlIGlzTm90TWlzc2FibGUobm90ZTogTm90ZSkge1xyXG4gICAgICAgIHJldHVybiBub3RlLnN0YXRlICE9PSBOb3RlU3RhdGUuREVGQVVMVDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTm90ZU1pc3NlZEFuZE5vdEhhbmRsZWQobm90ZTogTm90ZSwgY3VycmVudFRpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBtaXNzQm91bmRhcnkgPSBnZXRNaXNzQm91bmRhcnkoY3VycmVudFRpbWUsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbm90ZS50aW1lSW5TZWNvbmRzIDwgbWlzc0JvdW5kYXJ5ICYmIG5vdGUuc3RhdGUgPT09IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlTWlzc2VkTm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBpbmRleE9mTWlzc2VkTm90ZTogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCBtaXNzZWROb3RlID0gdHJhY2tbaW5kZXhPZk1pc3NlZE5vdGVdO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5uYW1lLFxyXG4gICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiAtSW5maW5pdHksXHJcbiAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICBub3RlVHlwZTogbWlzc2VkTm90ZS50eXBlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWlzc2VkTm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5NSVNTRUQ7XHJcbiAgICAgICAgaWYgKG1pc3NlZE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkTWFuYWdlci5pc1RyYWNrSGVsZCh0cmFja051bWJlcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZE1hbmFnZXIudW5ob2xkVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAvLyBGb3JjZSBhIGhvbGQgcmVsZWFzZSB1cG9uIG1pc3NpbmcgdGhlIHRhaWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobWlzc2VkTm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQpIHtcclxuICAgICAgICAgICAgbGV0IG5leHROb3RlID0gdHJhY2tbaW5kZXhPZk1pc3NlZE5vdGUgKyAxXTtcclxuICAgICAgICAgICAgaWYgKG5leHROb3RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dE5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuTUlTU0VEOyAvLyBNaXNzIHRoZSB0YWlsIHdoZW4geW91IG1pc3MgdGhlIGhlYWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RlTWFuYWdlciB7XHJcbiAgICB0cmFja3M6IE5vdGVbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgICAgICB0aGlzLnRyYWNrcyA9IHRyYWNrcztcclxuICAgICAgICB0aGlzLnJlbW92ZVVuc3VwcG9ydGVkTm90ZVR5cGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVVbnN1cHBvcnRlZE5vdGVUeXBlcygpIHtcclxuICAgICAgICBsZXQgc3VwcG9ydGVkTm90ZVR5cGVzOiBOb3RlVHlwZVtdID0gW05vdGVUeXBlLlRBSUwsIE5vdGVUeXBlLkhPTERfSEVBRCwgTm90ZVR5cGUuTk9STUFMXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMudHJhY2tzLmxlbmd0aDsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IHRoaXMudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm90ZU51bWJlciA9IDA7IG5vdGVOdW1iZXIgPCB0cmFjay5sZW5ndGg7IG5vdGVOdW1iZXIrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdGU6IE5vdGUgPSB0cmFja1tub3RlTnVtYmVyXTtcclxuICAgICAgICAgICAgICAgIGlmICghc3VwcG9ydGVkTm90ZVR5cGVzLmluY2x1ZGVzKG5vdGUudHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjay5zcGxpY2Uobm90ZU51bWJlciwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZU51bWJlci0tOyAvLyBkZWNyZW1lbnQgbm90ZSBudW1iZXIgc28gbmV4dCBpdGVyYXRpb24gaXQgc3RhcnRzIGF0IHRoZSByaWdodCBub3RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90ZXNCeVRpbWVSYW5nZShsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpOiB7IHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IG51bWJlciB9IHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgbGV0IGZpcnN0RmluZFJlc3VsdCA9IHRoaXMuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUobGVhc3RUaW1lLCB0cmFjayk7XHJcbiAgICAgICAgaWYgKGZpcnN0RmluZFJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAtMSwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IC0xfTsgLy8gbm8gbm90ZXMgbGVmdCBhZnRlciBsZWFzdCB0aW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYXN0RmluZFJlc3VsdCA9IHRoaXMuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoZ3JlYXRlc3RUaW1lLCB0cmFjaywgZmlyc3RGaW5kUmVzdWx0KTtcclxuICAgICAgICBpZiAobGFzdEZpbmRSZXN1bHQgPCAwKSB7XHJcbiAgICAgICAgICAgIGxhc3RGaW5kUmVzdWx0ID0gdHJhY2subGVuZ3RoOyAvLyBncmVhdGVzdFRpbWUgZXhjZWVkcyB0aGUgZW5kIG9mIHRoZSBub3Rlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmlyc3RGaW5kUmVzdWx0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0RmluZFJlc3VsdCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAtMSwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IC0xfTsgLy8gaGF2ZW4ndCBzZWVuIGZpcnN0IG5vdGVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogMCwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IGxhc3RGaW5kUmVzdWx0fTsgLy8gbm90ZXMgYXJlIGp1c3Qgc3RhcnRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IGZpcnN0RmluZFJlc3VsdCwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IGxhc3RGaW5kUmVzdWx0fTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBubyB0d28gbm90ZXMgd2lsbCBoYXZlIHRoZSBzYW1lIHRpbWUgaW4gdGhlIHNhbWUgdHJhY2tcclxuICAgIGZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGtleVRpbWU6IG51bWJlciwgdHJhY2s6IE5vdGVbXSwgc2VhcmNoU3RhcnQgPSAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHNlYXJjaFN0YXJ0OyBpIDwgdHJhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRyYWNrW2ldLnRpbWVJblNlY29uZHMgPiBrZXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWFybGllc3ROb3RlKCk6IE5vdGUge1xyXG4gICAgICAgIGxldCBlYXJsaWVzdE5vdGU6IE5vdGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFja3NbaV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrRWFybGllc3ROb3RlOiBOb3RlID0gdGhpcy50cmFja3NbaV1bMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoZWFybGllc3ROb3RlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhcmxpZXN0Tm90ZSA9IHRyYWNrRWFybGllc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlYXJsaWVzdE5vdGUudGltZUluU2Vjb25kcyA+IHRyYWNrRWFybGllc3ROb3RlLnRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXJsaWVzdE5vdGUgPSB0cmFja0VhcmxpZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWFybGllc3ROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExhdGVzdE5vdGUoKTogTm90ZSB7XHJcbiAgICAgICAgbGV0IGxhdGVzdE5vdGU6IE5vdGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFja3NbaV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrTGF0ZXN0Tm90ZTogTm90ZSA9IHRoaXMudHJhY2tzW2ldW3RoaXMudHJhY2tzW2ldLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhdGVzdE5vdGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90ZSA9IHRyYWNrTGF0ZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGF0ZXN0Tm90ZS50aW1lSW5TZWNvbmRzIDwgdHJhY2tMYXRlc3ROb3RlLnRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RlID0gdHJhY2tMYXRlc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYXRlc3ROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRvdGFsTm90ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLnJlZHVjZSgoc3VtLCB0cmFjaykgPT4gc3VtICsgdHJhY2subGVuZ3RoLCAwKTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGVTa2luIHtcclxuICAgIHB1YmxpYyBub3RlOiBwNS5JbWFnZTtcclxuICAgIHB1YmxpYyBjb25uZWN0b3JUaWxlOiBwNS5JbWFnZTtcclxuICAgIHB1YmxpYyByZWNlcHRvcjogcDUuSW1hZ2U7XHJcblxyXG4gICAgLyogUmVxdWlyZXMgdGhhdCB0aGUgdGFpbCBiZSBoYWxmIHRoZSBoZWlnaHQgYW5kIHNhbWUgd2lkdGggYXMgbm90ZSBpbWFnZSAqL1xyXG4gICAgcHVibGljIHRhaWw6IHA1LkltYWdlO1xyXG5cclxuICAgIHByaXZhdGUgcm90YXRpb25BbmdsZXM6IE1hcDxudW1iZXIsIG51bWJlcltdPiA9IG5ldyBNYXAoW1xyXG4gICAgICAgIFs0LCBbMjcwLCAxODAsIDAsIDkwXV0sXHJcbiAgICAgICAgWzYsIFsyNzAsIDMxNSwgMTgwLCAwLCA0NSwgOTBdXVxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm90ZTogcDUuSW1hZ2UsIGNvbm5lY3RvcjogcDUuSW1hZ2UsIHRhaWw6IHA1LkltYWdlLCByZWNlcHRvcjogcDUuSW1hZ2UpIHtcclxuICAgICAgICB0aGlzLm5vdGUgPSBub3RlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yVGlsZSA9IGNvbm5lY3RvcjtcclxuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3IgPSByZWNlcHRvcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHB1YmxpYyBkcmF3Tm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBub3RlU2l6ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgc3dpdGNoIChub3RlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZVJvdGF0ZWQodGhpcy5ub3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3VGFpbCh0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHB1YmxpYyBkcmF3UmVjZXB0b3IodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2VSb3RhdGVkKHRoaXMucmVjZXB0b3IsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclksIG5vdGVTaXplKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHByaXZhdGUgZHJhd0hvbGRDb25uZWN0b3IoY2VudGVyWDogbnVtYmVyLCBkcmF3U3RhcnRZOiBudW1iZXIsIGRyYXdFbmRZOiBudW1iZXIsIG5vdGVTdGFydFk6IG51bWJlciwgbm90ZUVuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHNvdXJjZVdpZHRoID0gdGhpcy5jb25uZWN0b3JUaWxlLndpZHRoO1xyXG4gICAgICAgIGxldCBzb3VyY2VIZWlnaHQgPSB0aGlzLmNvbm5lY3RvclRpbGUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY2FsZWRXaWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBzY2FsZWRIZWlnaHQgPSBzY2FsZWRXaWR0aCAvIHNvdXJjZVdpZHRoICogc291cmNlSGVpZ2h0O1xyXG4gICAgICAgIGxldCBjb25uZWN0b3JIZWlnaHQgPSBNYXRoLmFicyhkcmF3RW5kWSAtIGRyYXdTdGFydFkpO1xyXG4gICAgICAgIGxldCBlbmRZT2Zmc2V0ID0gdGhpcy5nZXROb3RlRW5kT2Zmc2V0KG5vdGVFbmRZLCBkcmF3RW5kWSk7XHJcblxyXG4gICAgICAgIGxldCBlbmRQYXJ0aWFsVGlsZUhlaWdodCA9IHNjYWxlZEhlaWdodCAtIChlbmRZT2Zmc2V0ICUgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICBlbmRQYXJ0aWFsVGlsZUhlaWdodCA9IE1hdGgubWluKGVuZFBhcnRpYWxUaWxlSGVpZ2h0LCBjb25uZWN0b3JIZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnRQYXJ0aWFsVGlsZUhlaWdodCA9IChjb25uZWN0b3JIZWlnaHQgLSBlbmRQYXJ0aWFsVGlsZUhlaWdodCkgJSBzY2FsZWRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IG51bUNvbXBsZXRlVGlsZXMgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAoY29ubmVjdG9ySGVpZ2h0IC0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodCAtIGVuZFBhcnRpYWxUaWxlSGVpZ2h0KSAvIHNjYWxlZEhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYmxvY2sgYWxsb3dzIHVzIHRvIHVzZSB0aGUgc2FtZSBkcmF3aW5nIG1ldGhvZCBmb3IgYm90aCB1cHNjcm9sbCBhbmQgZG93bnNjcm9sbFxyXG4gICAgICAgIGxldCBib3R0b21QYXJ0aWFsVGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0b3BQYXJ0aWFsVGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0ID0gZW5kUGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0ID0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCA9IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0ID0gZW5kUGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkcmF3TWluWSA9IE1hdGgubWluKGRyYXdTdGFydFksIGRyYXdFbmRZKTtcclxuICAgICAgICBsZXQgZHJhd01heFkgPSBNYXRoLm1heChkcmF3U3RhcnRZLCBkcmF3RW5kWSk7XHJcbiAgICAgICAgbGV0IGlzUmV2ZXJzZWQgPSBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgIGxldCBpc0RyYXduRnJvbUJvdHRvbSA9IGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXA7XHJcbiAgICAgICAgaWYgKGVuZFBhcnRpYWxUaWxlSGVpZ2h0ID09PSBjb25uZWN0b3JIZWlnaHQpIHtcclxuICAgICAgICAgICAgaXNEcmF3bkZyb21Cb3R0b20gPSAhaXNEcmF3bkZyb21Cb3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYLCBkcmF3TWluWSwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCxcclxuICAgICAgICAgICAgdG9wUGFydGlhbFRpbGVIZWlnaHQgLyBzY2FsZWRIZWlnaHQsICFpc0RyYXduRnJvbUJvdHRvbSwgaXNSZXZlcnNlZCwgcCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Q29tcGxldGVUaWxlcyhjZW50ZXJYLCBkcmF3TWluWSArIHRvcFBhcnRpYWxUaWxlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LFxyXG4gICAgICAgICAgICBudW1Db21wbGV0ZVRpbGVzLCBpc1JldmVyc2VkLCBwKTtcclxuICAgICAgICB0aGlzLmRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYLCBkcmF3TWF4WSAtIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LFxyXG4gICAgICAgICAgICBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCAvIHNjYWxlZEhlaWdodCwgaXNEcmF3bkZyb21Cb3R0b20sXHJcbiAgICAgICAgICAgIGlzUmV2ZXJzZWQsIHApO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd1RhaWwodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy50YWlsLCAtbm90ZVNpemUgLyAyLCAtbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUgLyAyKTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMudGFpbCwgY2VudGVyWCAtIG5vdGVTaXplIC8gMiwgY2VudGVyWSAtIG5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplIC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Tm90ZUVuZE9mZnNldChub3RlRW5kWTogbnVtYmVyLCBkcmF3RW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IG5vdGVFbmRZIC0gZHJhd0VuZFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gZHJhd0VuZFkgLSBub3RlRW5kWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgdGhlIHBhcnRpYWwgdGlsZSB0ZXh0dXJlIGZyb20gc3RyZXRjaGluZyB3aGVuIHRoZSBwbGF5ZXIgaGl0cyBhIGhvbGQgZWFybHlcclxuICAgICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCBvZmZzZXQpO1xyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0NvbXBsZXRlVGlsZXMoY2VudGVyWDogbnVtYmVyLCBsZWFzdFk6IG51bWJlciwgc2NhbGVkV2lkdGg6IG51bWJlciwgc2NhbGVkSGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRpbGVzOiBudW1iZXIsIGlzUmV2ZXJzZWQ6IGJvb2xlYW4sIHA6IHA1KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UaWxlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IGxlYXN0WSArIGkgKiBzY2FsZWRIZWlnaHQgKyBzY2FsZWRIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgaWYgKGlzUmV2ZXJzZWQpIHtcclxuICAgICAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1zY2FsZWRIZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UGFydGlhbFRpbGUoY2VudGVyWDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCBzY2FsZWRXaWR0aDogbnVtYmVyLCBzY2FsZWRIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVdpZHRoOiBudW1iZXIsIHNvdXJjZUhlaWdodDogbnVtYmVyLCBoZWlnaHRQZXJjZW50OiBudW1iZXIsIGlzRHJhd25Gcm9tQm90dG9tOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JldmVyc2VkOiBib29sZWFuLCBwOiBwNSkge1xyXG4gICAgICAgIGlmIChoZWlnaHRQZXJjZW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uSGVpZ2h0ID0gaGVpZ2h0UGVyY2VudCAqIHNjYWxlZEhlaWdodDtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRvcExlZnRZICsgZGVzdGluYXRpb25IZWlnaHQgLyAyO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIGlmIChpc1JldmVyc2VkKSB7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0RyYXduRnJvbUJvdHRvbSkgeyAvLyBEcmF3IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1kZXN0aW5hdGlvbkhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25IZWlnaHQsIDAsIHNvdXJjZUhlaWdodCAtIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gRHJhdyBmcm9tIHRoZSB0b3Agb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtZGVzdGluYXRpb25IZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSGVpZ2h0LCAwLCAwLCBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3SW1hZ2VSb3RhdGVkKGltYWdlOiBwNS5JbWFnZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIHRoaXMucm90YXRlKHAsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHAuaW1hZ2UoaW1hZ2UsIC1ub3RlU2l6ZSAvIDIsIC1ub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJvdGF0ZShwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFuZ2xlcy5oYXMobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSh0aGlzLnJvdGF0aW9uQW5nbGVzLmdldChudW1UcmFja3MpW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC5yb3RhdGUodGhpcy5nZXREZWZhdWx0Um90YXRpb25BbmdsZUluRGVncmVlcyh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdFJvdGF0aW9uQW5nbGVJbkRlZ3JlZXModHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcm90YXRpb24gPSAtOTA7XHJcbiAgICAgICAgbGV0IHJvdGF0aW9uUGVyVHJhY2sgPSAzNjAgLyBudW1UcmFja3M7XHJcbiAgICAgICAgaWYgKHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzIC8gMikge1xyXG4gICAgICAgICAgICByb3RhdGlvbiAtPSB0cmFja051bWJlciAqIHJvdGF0aW9uUGVyVHJhY2s7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm90YXRpb24gKz0gKHRyYWNrTnVtYmVyIC0gbnVtVHJhY2tzIC8gMiArIDEpICogcm90YXRpb25QZXJUcmFjaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdGF0aW9uO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtwYXJzZVN3Zn0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zd2ZcIjtcclxuaW1wb3J0IHtTdGVwZmlsZSwgU3RlcGZpbGVTdGF0ZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGUsIEF1ZGlvRmlsZVN0YXRlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcblxyXG5jbGFzcyBTb25nIHtcclxuICAgIHB1YmxpYyBnZW5yZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHNvbmdOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc29uZ0F1dGhvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdBdXRob3JVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nRGlmZmljdWx0eTogbnVtYmVyO1xyXG4gICAgcHVibGljIHNvbmdTdHlsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNvbmdMZW5ndGg6IHN0cmluZztcclxuICAgIHB1YmxpYyBzb25nU3RlcGF1dGhvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGxldmVsOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG9mWG1sKHhtbDogRWxlbWVudCk6IFNvbmcge1xyXG4gICAgICAgIGxldCBzb25nID0gbmV3IFNvbmcoKTtcclxuICAgICAgICBzb25nLmdlbnJlID0gcGFyc2VJbnQoeG1sLmdldEF0dHJpYnV0ZShcImdlbnJlXCIpKTtcclxuICAgICAgICBzb25nLnNvbmdOYW1lID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmduYW1lXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0F1dGhvciA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nYXV0aG9yXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0F1dGhvclVybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHhtbCwgXCJzb25nYXV0aG9ydXJsXCIpO1xyXG4gICAgICAgIHNvbmcuc29uZ0RpZmZpY3VsdHkgPSBwYXJzZUludChnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ2RpZmZpY3VsdHlcIikpO1xyXG4gICAgICAgIHNvbmcuc29uZ1N0eWxlID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdzdHlsZVwiKTtcclxuICAgICAgICBzb25nLnNvbmdMZW5ndGggPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwic29uZ2xlbmd0aFwiKTtcclxuICAgICAgICBzb25nLnNvbmdTdGVwYXV0aG9yID0gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sLCBcInNvbmdzdGVwYXV0aG9yXCIpO1xyXG4gICAgICAgIHNvbmcubGV2ZWwgPSBnZXRDb250ZW50c0J5VGFnTmFtZSh4bWwsIFwibGV2ZWxcIik7XHJcbiAgICAgICAgcmV0dXJuIHNvbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29uZ0RpZmZpY3VsdHkgKyBcIiBcIiArIHRoaXMuc29uZ05hbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE9ubGluZVBsYXlsaXN0U3RhdGUge1xyXG4gICAgTk9fUExBWUxJU1QsXHJcbiAgICBMT0FESU5HX1BMQVlMSVNULFxyXG4gICAgUExBWUxJU1RfUkVBRFksXHJcbiAgICBQTEFZTElTVF9FUlJPUixcclxuICAgIExPQURJTkdfU09ORyxcclxuICAgIFNPTkdfRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPbmxpbmVQbGF5bGlzdCB7XHJcbiAgICBwdWJsaWMgaW5kZXhVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgc29uZ1VybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwbGF5bGlzdFVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBmdWxsUGxheWxpc3Q6IFNvbmdbXTtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfUEFHRV9TSVpFOiBudW1iZXIgPSA1MDtcclxuICAgIHB1YmxpYyBzdGF0ZTogT25saW5lUGxheWxpc3RTdGF0ZTtcclxuICAgIHB1YmxpYyBwbGF5bGlzdDogU29uZ1tdO1xyXG4gICAgcHJpdmF0ZSBwYWdlTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHBhZ2VTaXplOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuTk9fUExBWUxJU1Q7XHJcbiAgICAgICAgdGhpcy5pbmRleFVybCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtpY2tPZmZMb2FkUGxheWxpc3QoaW5kZXhVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfUExBWUxJU1Q7XHJcbiAgICAgICAgdGhpcy5pbmRleFVybCA9IGluZGV4VXJsO1xyXG4gICAgICAgIHRoaXMuZ2V0KHRoaXMuaW5kZXhVcmwsIHRoaXMucGFyc2VJbmRleEFuZExvYWRQbGF5bGlzdC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlSW5kZXhBbmRMb2FkUGxheWxpc3QoZXZlbnQ6IFByb2dyZXNzRXZlbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RNZXRhZGF0YTogRG9jdW1lbnQgPSAoPFhNTEh0dHBSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVzcG9uc2VYTUw7XHJcbiAgICAgICAgICAgIHRoaXMuc29uZ1VybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHBsYXlsaXN0TWV0YWRhdGEsIFwic29uZ1VSTFwiKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5bGlzdFVybCA9IGdldENvbnRlbnRzQnlUYWdOYW1lKHBsYXlsaXN0TWV0YWRhdGEsIFwicGxheWxpc3RVUkxcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0KHRoaXMucGxheWxpc3RVcmwsIHRoaXMubG9hZFBsYXlsaXN0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1I7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFBsYXlsaXN0KGV2ZW50OiBQcm9ncmVzc0V2ZW50KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0VGV4dDogc3RyaW5nID0gKDxYTUxIdHRwUmVxdWVzdD5ldmVudC50YXJnZXQpLnJlc3BvbnNlO1xyXG4gICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVwbGFjZSBhbXBlcnNhbmRzIGJlY2F1c2UgdGhlIERPTVBhcnNlciBkb2Vzbid0IGxpa2UgdGhlbVxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IHBsYXlsaXN0VGV4dC5yZXBsYWNlKC8mL2csICcmYW1wOycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0WG1sID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyh0ZXh0LCBcInRleHQveG1sXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnNlUGxheWxpc3QocGxheWxpc3RYbWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1I7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VQbGF5bGlzdChwbGF5bGlzdFhtbDogRG9jdW1lbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgc29uZ3M6IEhUTUxDb2xsZWN0aW9uID0gcGxheWxpc3RYbWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzb25nXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxQbGF5bGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29uZ1htbDogRWxlbWVudCA9IHNvbmdzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHNvbmc6IFNvbmcgPSBTb25nLm9mWG1sKHNvbmdYbWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFBsYXlsaXN0LnB1c2goc29uZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnVsbFBsYXlsaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1I7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5QTEFZTElTVF9SRUFEWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfRVJST1I7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBraWNrT2ZmTG9hZFNvbmcoc29uZ0luZGV4OiBudW1iZXIsIHN0ZXBmaWxlOiBTdGVwZmlsZSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkc7XHJcbiAgICAgICAgc29uZ0luZGV4ICs9IHRoaXMucGFnZVNpemUgKiB0aGlzLnBhZ2VOdW1iZXI7XHJcbiAgICAgICAgc3RlcGZpbGUuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLk5PX1NJTUZJTEU7XHJcbiAgICAgICAgYXVkaW9GaWxlLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgICAgICBsZXQgc29uZzogU29uZyA9IHRoaXMuZnVsbFBsYXlsaXN0W3NvbmdJbmRleF07XHJcbiAgICAgICAgbGV0IGxldmVsOiBzdHJpbmcgPSBzb25nLmxldmVsO1xyXG4gICAgICAgIGxldCBsZXZlbFVybCA9IHRoaXMuc29uZ1VybCArIFwibGV2ZWxfXCIgKyBsZXZlbCArIFwiLnN3ZlwiO1xyXG4gICAgICAgIHRoaXMuZ2V0KGxldmVsVXJsLCAoZXZlbnQ6IFByb2dyZXNzRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHBhcnNlU3dmKCg8WE1MSHR0cFJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXNwb25zZSwgc3RlcGZpbGUsIGF1ZGlvRmlsZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBPbmxpbmVQbGF5bGlzdFN0YXRlLlNPTkdfRVJST1I7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgXCJhcnJheWJ1ZmZlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCh1cmw6IHN0cmluZywgb25sb2FkOiAoZXZlbnQ6IFByb2dyZXNzRXZlbnQpID0+IHZvaWQsIHJlc3BvbnNlVHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjb3JzV29ya2Fyb3VuZDogc3RyaW5nID0gJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tLyc7XHJcbiAgICAgICAgbGV0IHJlcXVlc3Q6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBvbmxvYWQpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgY29yc1dvcmthcm91bmQgKyB1cmwsIHRydWUpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZVR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0UGFnZShwYWdlTnVtYmVyOiBudW1iZXIsIHBhZ2VTaXplPzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHBhZ2VTaXplID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSBPbmxpbmVQbGF5bGlzdC5ERUZBVUxUX1BBR0VfU0laRTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2VTaXplIDwgMSkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlU2l6ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYWdlTnVtYmVyID4gdGhpcy5nZXRNYXhQYWdlTnVtYmVyKHBhZ2VTaXplKSB8fCBwYWdlTnVtYmVyIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWluSW5kZXggPSBwYWdlTnVtYmVyICogcGFnZVNpemU7XHJcbiAgICAgICAgbGV0IG1heEluZGV4ID0gbWluSW5kZXggKyBwYWdlU2l6ZTtcclxuICAgICAgICB0aGlzLnBsYXlsaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG1pbkluZGV4OyBpIDwgbWF4SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8IHRoaXMuZnVsbFBsYXlsaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5bGlzdC5wdXNoKHRoaXMuZnVsbFBsYXlsaXN0W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1heFBhZ2VOdW1iZXIocGFnZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZnVsbFBsYXlsaXN0Lmxlbmd0aCAvIHBhZ2VTaXplKSAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5leHRQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2VOdW1iZXIgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJldmlvdXNQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2VOdW1iZXIgLSAxKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29udGVudHNCeVRhZ05hbWUoeG1sOiBFbGVtZW50IHwgRG9jdW1lbnQsIHRhZzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZylbMF0uaW5uZXJIVE1MO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0tleWJvYXJkRXZlbnRNYW5hZ2VyfSBmcm9tIFwiLi9rZXlib2FyZF9ldmVudF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVQcmV2aWV3Tm90ZXN9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlU2tpbn0gZnJvbSBcIi4vbm90ZV9za2luXCI7XHJcblxyXG5sZXQgd2lkdGggPSA3MjA7XHJcbmxldCBoZWlnaHQgPSA0ODA7XHJcblxyXG5leHBvcnQgY2xhc3MgUDVTY2VuZSB7XHJcbiAgICBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IG5ldyBwNSgocDogcDUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlbmRlcmVyOiBwNS5SZW5kZXJlcjtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNlbnRlckNhbnZhcygpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcmVyLmNlbnRlcigpOyAvLyBEaXNhYmxlIHRoaXMgZm9yIG5vdyB0byBtYWtlIGVtYmVkZGluZyB3b3JrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5ub3RlU2tpbiA9IG5ldyBOb3RlU2tpbihcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19ibHVlX3YzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9jb25uZWN0b3JfdGlsZV9yZXNpemUucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3RhaWxfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19yZWNlcHRvci5wbmdcIilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCA9IHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3BsYXlfZnJvbV9maWxlX2JhY2tncm91bmQuanBnXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kID0gZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlciA9IHAuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlciA9IG5ldyBLZXlib2FyZEV2ZW50TWFuYWdlcihwKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyg0KSwgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTsgLy8gTWFrZXMgdGhlIGNhbnZhcyBiZSBhYmxlIHRvIGZpbGwgdGhlIHdob2xlIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHAuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLmRyYXcoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAud2luZG93UmVzaXplZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlckNhbnZhcygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGxheUZyb21GaWxlfSBmcm9tIFwiLi9wYWdlcy9wbGF5X2Zyb21fZmlsZVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuaW1wb3J0IHtQbGF5fSBmcm9tIFwiLi9wYWdlcy9wbGF5XCI7XHJcbmltcG9ydCB7UmVzdWx0c30gZnJvbSBcIi4vcGFnZXMvcmVzdWx0c1wiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcbmltcG9ydCB7UGxheUZyb21PbmxpbmV9IGZyb20gXCIuL3BhZ2VzL3BsYXlfZnJvbV9vbmxpbmVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFBBR0VTIHtcclxuICAgIFBMQVlfRlJPTV9GSUxFLFxyXG4gICAgT1BUSU9OUyxcclxuICAgIFBMQVksXHJcbiAgICBSRVNVTFRTLFxyXG4gICAgUExBWV9GUk9NX09OTElORSxcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbnRQYWdlOiBQQUdFUyA9IFBBR0VTLlBMQVlfRlJPTV9GSUxFO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0dXJuUGFnZTogUEFHRVM7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRDdXJyZW50UGFnZShwYWdlOiBQQUdFUykge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlICE9PSBQQUdFUy5QTEFZKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuUGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xyXG4gICAgICAgIERPTVdyYXBwZXIuY2xlYXJSZWdpc3RyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmV0dXJuKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFBhZ2UodGhpcy5yZXR1cm5QYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWV9GUk9NX0ZJTEU6XHJcbiAgICAgICAgICAgICAgICBQbGF5RnJvbUZpbGUuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuT1BUSU9OUzpcclxuICAgICAgICAgICAgICAgIE9wdGlvbnMuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWTpcclxuICAgICAgICAgICAgICAgIFBsYXkuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUkVTVUxUUzpcclxuICAgICAgICAgICAgICAgIFJlc3VsdHMuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUEFHRVMuUExBWV9GUk9NX09OTElORTpcclxuICAgICAgICAgICAgICAgIFBsYXlGcm9tT25saW5lLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBwYWdlOiBcIiArIGdsb2JhbC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge1xyXG4gICAgYm9vbGVhblRvWWVzTm8sXHJcbiAgICBjcmVhdGVMYWJlbGVkSW5wdXQsXHJcbiAgICBjcmVhdGVMYWJlbGVkU2VsZWN0LFxyXG4gICAgY3JlYXRlTGFiZWxlZFRleHRBcmVhLFxyXG4gICAgZHJhd0hlYWRpbmcsIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMsXHJcbiAgICBZZXNOb1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4uL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nc1VpfSBmcm9tIFwiLi4va2V5X2JpbmRpbmdzX3VpXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3B0aW9ucyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIE9QVElPTlNfQ0xBU1M6IHN0cmluZyA9IFwib3B0aW9uc1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kKTtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICB9LCBcInNjcm9sbERpdlwiKTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpdi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKFwib3B0aW9ucy1zY3JvbGwtZGl2XCIpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgICAgIHNjcm9sbERpdi5lbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAzMzUsIGNhbnZhc1Bvc2l0aW9uLnkgKyA0NSk7XHJcblxyXG4gICAgICAgIGxldCByZXNldENvbmZpZ0J1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUmVzZXQgVG8gRGVmYXVsdFwiKTtcclxuICAgICAgICB9LCBcInJlc2V0Q29uZmlnQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmICghcmVzZXRDb25maWdCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICByZXNldENvbmZpZ0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJyZXNldC1jb25maWdcIik7XHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcgPSBuZXcgQ29uZmlnKHt9KTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHJlc2V0Q29uZmlnQnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiUGF1c2UgYXQgU3RhcnQgKHNlYylcIiwgXCJwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcy50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMocGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkgJiYgdmFsdWUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbFNwZWVkSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJTY3JvbGwgU3BlZWQgKHB4L3NlYylcIiwgXCJzY3JvbGxTcGVlZElucHV0XCIsXHJcbiAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGl4ZWxzUGVyU2Vjb25kLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhzY3JvbGxTcGVlZElucHV0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gc2Nyb2xsU3BlZWRJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkgJiYgdmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBpeGVsc1BlclNlY29uZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbFNwZWVkSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChzY3JvbGxTcGVlZElucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbERpcmVjdGlvblNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJTY3JvbGwgRGlyZWN0aW9uXCIsIFwic2Nyb2xsRGlyZWN0aW9uU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFNjcm9sbERpcmVjdGlvbiwgZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24sIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhzY3JvbGxEaXJlY3Rpb25TZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFNjcm9sbERpcmVjdGlvblt2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgU2Nyb2xsRGlyZWN0aW9uXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID0gZW51bU9mVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY2VwdG9yUG9zaXRpb25JbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlJlY2VwdG9yIFBvc2l0aW9uICglKVwiLCBcInJlY2VwdG9yUG9zaXRpb25JbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHJlY2VwdG9yUG9zaXRpb25JbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHJlY2VwdG9yUG9zaXRpb25JbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucmVjZXB0b3JZUGVyY2VudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXJlY2VwdG9yUG9zaXRpb25JbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHJlY2VwdG9yUG9zaXRpb25JbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJBY2N1cmFjeSBPZmZzZXQgKG1zKVwiLCBcImFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dFwiLFxyXG4gICAgICAgICAgICAoZ2xvYmFsLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzICogMTAwMCkudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyA9IHZhbHVlIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nc0lucHV0ID0gY3JlYXRlTGFiZWxlZFRleHRBcmVhKFwiQWNjdXJhY3kgU2V0dGluZ3NcIiwgXCJhY2N1cmFjeVNldHRpbmdzSW5wdXRcIixcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2xvYmFsLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLCBudWxsLCAzKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5U2V0dGluZ3NJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IGFjY3VyYWN5U2V0dGluZ3NJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdID0gcGFyc2VBY2N1cmFjeVNldHRpbmdzSnNvbih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3QWNjdXJhY3lTZXR0aW5ncyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyA9IG5ld0FjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmICghYWNjdXJhY3lTZXR0aW5nc0lucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lTZXR0aW5nc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWN5Rmxhc2hFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IEZsYXNoXCIsXCJhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5Rmxhc2hFbmFibGVkU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKGFjY3VyYWN5Rmxhc2hFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXJlY3Rpb25TZWxlY3QuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWRTZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiQWNjdXJhY3kgUGFydGljbGVzXCIsIFwiYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhhY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWRTZWxlY3QuZWxlbWVudC52YWx1ZSgpKTtcclxuICAgICAgICAgICAgbGV0IGVudW1PZlZhbHVlID0gWWVzTm9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFllc05vXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5ZZXMpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiQWNjdXJhY3kgVGV4dFwiLFwiYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhhY2N1cmFjeVRleHRFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uTm8pIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVRleHRFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJIb2xkIFBhcnRpY2xlc1wiLCBcImhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoaG9sZFBhcnRpY2xlc0VuYWJsZWRTZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoaG9sZFBhcnRpY2xlc0VuYWJsZWRTZWxlY3QuZWxlbWVudC52YWx1ZSgpKTtcclxuICAgICAgICAgICAgbGV0IGVudW1PZlZhbHVlID0gWWVzTm9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFllc05vXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5ZZXMpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uTm8pIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhvbGRHbG93RW5hYmxlZFNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJIb2xkIEdsb3dcIiwgXCJob2xkR2xvd0VuYWJsZWRTZWxlY3RcIixcclxuICAgICAgICAgICAgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoaG9sZEdsb3dFbmFibGVkU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKGhvbGRHbG93RW5hYmxlZFNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBZZXNOb1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgWWVzTm9dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLlllcykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uTm8pIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXJlY3Rpb25TZWxlY3QuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChob2xkR2xvd0VuYWJsZWRTZWxlY3QuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBLZXlCaW5kaW5nc1VpLmRyYXcocCwgc2Nyb2xsRGl2LmVsZW1lbnQsIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcblxyXG4gICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24oYWNjdXJhY3lTZXR0aW5nc0pzb246IHN0cmluZyk6IEFjY3VyYWN5W10ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IFtdXHJcbiAgICAgICAgbGV0IGpzb25BcnJheTogQWNjdXJhY3lbXSA9IEpTT04ucGFyc2UoYWNjdXJhY3lTZXR0aW5nc0pzb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGpzb25BcnJheVtpXTtcclxuICAgICAgICAgICAgLy8gdGhpcyBmYWlscyBpZiB0aGUgdXNlciBnYXZlIHRoZSB3cm9uZyBpbnB1dFxyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzLnB1c2gobmV3IEFjY3VyYWN5KGFjY3VyYWN5Lm5hbWUsIGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsYXkge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlLmJhY2tncm91bmQoXCJibGFja1wiKTtcclxuICAgICAgICBnbG9iYWwucGxheWluZ0Rpc3BsYXkuZHJhdygpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1xyXG4gICAgZHJhd0hlYWRpbmcsXHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZSxcclxuICAgIGNyZWF0ZUZpbGVJbnB1dCxcclxuICAgIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdiwgZml4UmFkaW9EaXZFbGVtZW50LCBzdHlsZVJhZGlvT3B0aW9uc1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtTdGVwZmlsZSwgU3RlcGZpbGVTdGF0ZX0gZnJvbSBcIi4uL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlLCBBdWRpb0ZpbGVTdGF0ZX0gZnJvbSBcIi4uL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXksIGluaXRQbGF5aW5nRGlzcGxheSwgaXNGaWxlc1JlYWR5fSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQge01vZGV9IGZyb20gXCIuLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcblxyXG5jb25zdCBwbGF5RnJvbUZpbGVTdGVwZmlsZSA9IG5ldyBTdGVwZmlsZSgpO1xyXG5jb25zdCBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUgPSBuZXcgQXVkaW9GaWxlKCk7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheUZyb21GaWxlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgUExBWV9GUk9NX0ZJTEVfQ0xBU1M6IHN0cmluZyA9IFwicGxheS1mcm9tLWZpbGVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTU9ERV9SQURJT19JRDogc3RyaW5nID0gXCJtb2RlUmFkaW9cIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZHJhd0hlYWRpbmcoKTtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQpO1xyXG5cclxuICAgICAgICBsZXQgc3RlcGZpbGVJbnB1dCA9IGNyZWF0ZUZpbGVJbnB1dChnZXRTdGVwZmlsZUlucHV0TGFiZWwoKSwgXCJDaG9vc2UgU3RlcGZpbGUgKC5zbSlcIiwgXCJzdGVwZmlsZUlucHV0XCIsXHJcbiAgICAgICAgICAgIGxvYWRTdGVwZmlsZUFuZFVwZGF0ZU1vZGVPcHRpb25zLCBQbGF5RnJvbUZpbGUuUExBWV9GUk9NX0ZJTEVfQ0xBU1MpLmVsZW1lbnQ7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoc3RlcGZpbGVJbnB1dCwgMC40MywgMC4zLCAyNjgsIDM0KTtcclxuXHJcbiAgICAgICAgbGV0IGF1ZGlvRmlsZUlucHV0ID0gY3JlYXRlRmlsZUlucHV0KGdldEF1ZGlvRmlsZUlucHV0TGFiZWwoKSwgXCJDaG9vc2UgQXVkaW8gRmlsZSAoLm1wMywgLm9nZylcIiwgXCJhdWRpb0ZpbGVJbnB1dFwiLFxyXG4gICAgICAgICAgICBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUubG9hZEZpbGUuYmluZChwbGF5RnJvbUZpbGVBdWRpb0ZpbGUpLCBQbGF5RnJvbUZpbGUuUExBWV9GUk9NX0ZJTEVfQ0xBU1MpLmVsZW1lbnQ7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoYXVkaW9GaWxlSW5wdXQsIDAuNDMsIDAuNDUsIDMyNSwgMzQpO1xyXG5cclxuICAgICAgICBsZXQgcGxheUJ1dHRvbklkID0gXCJwbGF5QnV0dG9uXCI7XHJcbiAgICAgICAgaWYgKGlzRmlsZXNSZWFkeShwbGF5RnJvbUZpbGVTdGVwZmlsZSwgcGxheUZyb21GaWxlQXVkaW9GaWxlKSkge1xyXG4gICAgICAgICAgICBsZXQgbW9kZVJhZGlvID0gZHJhd01vZGVTZWxlY3QocCwgUGxheUZyb21GaWxlLk1PREVfUkFESU9fSUQpO1xyXG4gICAgICAgICAgICBpZiAobW9kZVJhZGlvLnZhbHVlKCkgIT09IFwiXCIpIHsgLy8gaWYgdXNlciBoYXMgc2VsZWN0ZWQgYSBtb2RlXHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJQbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgcGxheUJ1dHRvbklkKTtcclxuICAgICAgICAgICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlCdXR0b24uZWxlbWVudCwgMC41LCAwLjg4LCA2MCwgMzQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5QnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTW9kZTogTW9kZSA9IGdldFNlbGVjdGVkTW9kZShtb2RlUmFkaW8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5RnJvbUZpbGVTdGVwZmlsZS5maW5pc2hQYXJzaW5nKHNlbGVjdGVkTW9kZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRQbGF5aW5nRGlzcGxheShwbGF5RnJvbUZpbGVTdGVwZmlsZS5mdWxsUGFyc2UudHJhY2tzLCBwbGF5RnJvbUZpbGVBdWRpb0ZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5QTEFZKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheUJ1dHRvbklkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQoUGxheUZyb21GaWxlLk1PREVfUkFESU9fSUQpO1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHBsYXlCdXR0b25JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkU3RlcGZpbGVBbmRVcGRhdGVNb2RlT3B0aW9ucyhmaWxlOiBwNS5GaWxlKSB7XHJcbiAgICBwbGF5RnJvbUZpbGVTdGVwZmlsZS5sb2FkRmlsZS5jYWxsKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLCBmaWxlKTtcclxuICAgIGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zID0gdW5kZWZpbmVkO1xyXG4gICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdNb2RlU2VsZWN0KHA6IHA1LCB1bmlxdWVJZDogc3RyaW5nKTogcDUuRWxlbWVudCB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIGlmIChnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMgPSBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkocGxheUZyb21GaWxlU3RlcGZpbGUucGFydGlhbFBhcnNlLm1vZGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbW9kZVJhZGlvQ2xhc3MgPSBcIm1vZGUtcmFkaW9cIlxyXG4gICAgbGV0IG1vZGVSYWRpb09wdGlvbkNsYXNzID0gXCJtb2RlLXJhZGlvLW9wdGlvblwiO1xyXG4gICAgbGV0IG1vZGVSYWRpb0NyZWF0ZVJlc3VsdCA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVSYWRpbygpO1xyXG4gICAgfSwgdW5pcXVlSWQpO1xyXG4gICAgbGV0IG1vZGVSYWRpbyA9IG1vZGVSYWRpb0NyZWF0ZVJlc3VsdC5lbGVtZW50O1xyXG4gICAgaWYgKCFtb2RlUmFkaW9DcmVhdGVSZXN1bHQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vZGUgPSBnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9uc1tpXTtcclxuICAgICAgICAgICAgbGV0IHJhZGlvTGFiZWwgPSBtb2RlLnR5cGUgKyBcIiwgXCIgKyBtb2RlLmRpZmZpY3VsdHkgKyBcIiwgXCIgKyBtb2RlLm1ldGVyO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCByYWRpb09wdGlvbiA9IG1vZGVSYWRpby5vcHRpb24ocmFkaW9MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSB0aGlzIHdheSBiZWNhdXNlIHRoZSB0d28tYXJndW1lbnQgLm9wdGlvbiBtZXRob2Qgd2Fzbid0IHdvcmtpbmdcclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBhY2Nlc3MgdGhlIHNlbGVjdGVkIG1vZGVcclxuICAgICAgICAgICAgcmFkaW9PcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBzdHlsZSBpcyBiZWluZyBzZXQgb24gdGhlIGRpdiBjb250YWluaW5nIHRoZSByYWRpbyBlbGVtZW50cyB0byBtYWtlIGl0IGEgc2Nyb2xsYWJsZSBib3hcclxuICAgICAgICBtb2RlUmFkaW8uYWRkQ2xhc3MobW9kZVJhZGlvQ2xhc3MpO1xyXG4gICAgICAgIG1vZGVSYWRpby5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocCwgbW9kZVJhZGlvKTtcclxuICAgICAgICBmaXhSYWRpb0RpdkVsZW1lbnQobW9kZVJhZGlvKTtcclxuICAgICAgICBzdHlsZVJhZGlvT3B0aW9ucyhwLCBtb2RlUmFkaW8sIFttb2RlUmFkaW9PcHRpb25DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShtb2RlUmFkaW8sIDAuNSwgMC43LCAzMDIsIDEyMCk7XHJcbiAgICBwLnBvcCgpO1xyXG4gICAgcmV0dXJuIG1vZGVSYWRpbztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbzogcDUuRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zW21vZGVSYWRpby52YWx1ZSgpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RlcGZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKHBsYXlGcm9tRmlsZVN0ZXBmaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLk5PX1NJTUZJTEU6XHJcbiAgICAgICAgICAgIHJldHVybiBcIk5vIGZpbGUgY2hvc2VuXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5ET05FX1JFQURJTkc6XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQ6XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcocGxheUZyb21GaWxlU3RlcGZpbGUuZmlsZS5uYW1lLCAzMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIkVycm9yXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEF1ZGlvRmlsZUlucHV0TGFiZWwoKSB7XHJcbiAgICBzd2l0Y2gocGxheUZyb21GaWxlQXVkaW9GaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5OT19BVURJT19GSUxFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJObyBmaWxlIGNob3NlblwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLkRPTkVfUkVBRElORzpcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1bmNhdGVGaWxlTmFtZUlmVG9vTG9uZyhwbGF5RnJvbUZpbGVBdWRpb0ZpbGUuZmlsZS5uYW1lLCAzMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIkVycm9yXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcoZnVsbEZpbGVOYW1lOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBpZiAoZnVsbEZpbGVOYW1lLmxlbmd0aCA8PSBtYXhMZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZnVsbEZpbGVOYW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bGxGaWxlTmFtZS5zdWJzdHIoMCwgbWF4TGVuZ3RoIC0gMTEpICtcclxuICAgICAgICBcIi4uLlwiICtcclxuICAgICAgICBmdWxsRmlsZU5hbWUuc3Vic3RyKGZ1bGxGaWxlTmFtZS5sZW5ndGggLSAxMCk7XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1xyXG4gICAgY3JlYXRlTGFiZWxlZElucHV0LFxyXG4gICAgZHJhd0hlYWRpbmcsXHJcbiAgICBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYsXHJcbiAgICBmaXhSYWRpb0RpdkVsZW1lbnQsXHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZSxcclxuICAgIHN0eWxlUmFkaW9PcHRpb25zXHJcbn0gZnJvbSBcIi4uL3VpX3V0aWxcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtPbmxpbmVQbGF5bGlzdFN0YXRlfSBmcm9tIFwiLi4vb25saW5lX3BsYXlsaXN0XCI7XHJcbmltcG9ydCB7aW5pdFBsYXlpbmdEaXNwbGF5LCBpc0ZpbGVzUmVhZHl9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7U3RlcGZpbGV9IGZyb20gXCIuLi9zdGVwZmlsZVwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZX0gZnJvbSBcIi4uL2F1ZGlvX2ZpbGVcIjtcclxuXHJcbmNvbnN0IHBsYXlGcm9tT25saW5lU3RlcGZpbGUgPSBuZXcgU3RlcGZpbGUoKTtcclxuY29uc3QgcGxheUZyb21PbmxpbmVBdWRpb0ZpbGUgPSBuZXcgQXVkaW9GaWxlKCk7XHJcblxyXG4vLyBUaGlzIHByZXZlbnRzIGxvYWRpbmcgcHJldmlvdXMgc29uZyB1cG9uIHJldHVybmluZyB0byBhIGxvYWRlZCBwbGF5bGlzdFxyXG5sZXQgaXNTd2ZMb2FkU3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsYXlGcm9tT25saW5lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgUExBWV9GUk9NX09OTElORV9DTEFTUzogc3RyaW5nID0gXCJwbGF5LWZyb20tb25saW5lXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGRyYXdIZWFkaW5nKCk7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHVybElucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiRW5naW5lIFVSTFwiLCBcInVybElucHV0XCIsIGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5pbmRleFVybCxcclxuICAgICAgICAgICAgUGxheUZyb21PbmxpbmUuUExBWV9GUk9NX09OTElORV9DTEFTUyk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGxldCB1cmxJbnB1dERpdiA9IG5ldyBwNS5FbGVtZW50KHVybElucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHVybElucHV0RGl2LCAwLjUwLCAwLjIxLCA2MDAsIDM4KTtcclxuXHJcbiAgICAgICAgbGV0IGxvYWRCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIkxvYWRcIik7XHJcbiAgICAgICAgfSwgXCJsb2FkQnV0dG9uXCIpO1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGxvYWRCdXR0b24uZWxlbWVudCwgMC44NSwgMC4yMTUsIDYyLCAzMyk7XHJcbiAgICAgICAgaWYgKCFsb2FkQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgIGxvYWRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhQbGF5RnJvbU9ubGluZS5QTEFZX0ZST01fT05MSU5FX0NMQVNTKTtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHVybElucHV0LmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkQnV0dG9uLmVsZW1lbnQuYXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWwub25saW5lUGxheWxpc3Qua2lja09mZkxvYWRQbGF5bGlzdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ2xvYmFsLm9ubGluZVBsYXlsaXN0LnN0YXRlICE9PSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfUExBWUxJU1QpIHtcclxuICAgICAgICAgICAgbG9hZEJ1dHRvbi5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChnbG9iYWwub25saW5lUGxheWxpc3Quc3RhdGUgPT09IE9ubGluZVBsYXlsaXN0U3RhdGUuUExBWUxJU1RfUkVBRFkgfHxcclxuICAgICAgICAgICAgZ2xvYmFsLm9ubGluZVBsYXlsaXN0LnN0YXRlID09PSBPbmxpbmVQbGF5bGlzdFN0YXRlLkxPQURJTkdfU09ORykge1xyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RNZW51SWQgPSBcInBsYXlsaXN0TWVudVwiXHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdE1lbnUgPSBkcmF3UmFkaW9NZW51KHAsIHBsYXlsaXN0TWVudUlkLCBnbG9iYWwub25saW5lUGxheWxpc3QucGxheWxpc3QpO1xyXG4gICAgICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5bGlzdE1lbnUsIDAuNSwgMC42MiwgNTAwLCAyMDApO1xyXG5cclxuICAgICAgICAgICAgZHJhd1BhZ2VDb250cm9scyhwLCBwbGF5bGlzdE1lbnVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWxpc3RNZW51LnZhbHVlKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsb2FkQW5kUGxheUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJMb2FkIEFuZCBQbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgXCJsb2FkQW5kUGxheUJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQsIDAuNSwgMC44OCwgMTE4LCAzNCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFsb2FkQW5kUGxheUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEFuZFBsYXlCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRBbmRQbGF5QnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwbGF5bGlzdE1lbnUudmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkQW5kUGxheUJ1dHRvbi5lbGVtZW50LmF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWwub25saW5lUGxheWxpc3Qua2lja09mZkxvYWRTb25nKHZhbHVlLCBwbGF5RnJvbU9ubGluZVN0ZXBmaWxlLCBwbGF5RnJvbU9ubGluZUF1ZGlvRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1N3ZkxvYWRTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5zdGF0ZSAhPT0gT25saW5lUGxheWxpc3RTdGF0ZS5MT0FESU5HX1NPTkcpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkQW5kUGxheUJ1dHRvbi5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGaWxlc1JlYWR5KHBsYXlGcm9tT25saW5lU3RlcGZpbGUsIHBsYXlGcm9tT25saW5lQXVkaW9GaWxlKSAmJiBpc1N3ZkxvYWRTdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdFBsYXlpbmdEaXNwbGF5KHBsYXlGcm9tT25saW5lU3RlcGZpbGUuZnVsbFBhcnNlLnRyYWNrcywgcGxheUZyb21PbmxpbmVBdWRpb0ZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlBMQVkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQoXCJsb2FkQW5kUGxheUJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIGlzU3dmTG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKFwicGxheWxpc3RNZW51XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIE1lbnVJdGVtIHtcclxuICAgIHRvU3RyaW5nOiAoKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdSYWRpb01lbnUocDogcDUsIHVuaXF1ZUlkOiBzdHJpbmcsIGl0ZW1zOiBNZW51SXRlbVtdKTogcDUuRWxlbWVudCB7XHJcbiAgICBsZXQgbWVudUNsYXNzID0gXCJwbGF5bGlzdC1yYWRpb1wiXHJcbiAgICBsZXQgbWVudUl0ZW1DbGFzcyA9IFwicGxheWxpc3QtcmFkaW8tb3B0aW9uXCI7XHJcbiAgICBsZXQgcmFkaW9NZW51Q3JlYXRlUmVzdWx0ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVJhZGlvKCk7XHJcbiAgICB9LCB1bmlxdWVJZCk7XHJcbiAgICBsZXQgcmFkaW9NZW51ID0gcmFkaW9NZW51Q3JlYXRlUmVzdWx0LmVsZW1lbnQ7XHJcbiAgICBpZiAoIXJhZGlvTWVudUNyZWF0ZVJlc3VsdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldO1xyXG4gICAgICAgICAgICBsZXQgcmFkaW9MYWJlbCA9IGl0ZW0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBsZXQgcmFkaW9PcHRpb24gPSByYWRpb01lbnUub3B0aW9uKHJhZGlvTGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgdGhpcyB3YXkgYmVjYXVzZSB0aGUgdHdvLWFyZ3VtZW50IC5vcHRpb24gbWV0aG9kIHdhc24ndCB3b3JraW5nXHJcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHZhbHVlIGlzIG5lY2Vzc2FyeSBzbyB3ZSBjYW4gYWNjZXNzIHRoZSBzZWxlY3RlZCBtb2RlXHJcbiAgICAgICAgICAgIHJhZGlvT3B0aW9uLnZhbHVlID0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgc3R5bGUgaXMgYmVpbmcgc2V0IG9uIHRoZSBkaXYgY29udGFpbmluZyB0aGUgcmFkaW8gZWxlbWVudHMgdG8gbWFrZSBpdCBhIHNjcm9sbGFibGUgYm94XHJcbiAgICAgICAgcmFkaW9NZW51LmFkZENsYXNzKG1lbnVDbGFzcyk7XHJcbiAgICAgICAgcmFkaW9NZW51LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdihwLCByYWRpb01lbnUpO1xyXG4gICAgICAgIGZpeFJhZGlvRGl2RWxlbWVudChyYWRpb01lbnUpO1xyXG4gICAgICAgIHN0eWxlUmFkaW9PcHRpb25zKHAsIHJhZGlvTWVudSwgW21lbnVJdGVtQ2xhc3MsIGdsb2JhbC5nbG9iYWxDbGFzc10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJhZGlvTWVudTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1BhZ2VDb250cm9scyhwOiBwNSwgcGxheWxpc3RNZW51SWQ6IHN0cmluZykge1xyXG4gICAgbGV0IHBhZ2VDb250cm9sc0RpdiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVEaXYoKTtcclxuICAgIH0sIFwicGFnZUNvbnRyb2xzRGl2XCIpO1xyXG4gICAgaWYgKCFwYWdlQ29udHJvbHNEaXYuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LmFkZENsYXNzKFwicGFnZS1jb250cm9sc1wiKTtcclxuICAgICAgICBwYWdlQ29udHJvbHNEaXYuZWxlbWVudC5hZGRDbGFzcyhQbGF5RnJvbU9ubGluZS5QTEFZX0ZST01fT05MSU5FX0NMQVNTKTtcclxuICAgICAgICBwYWdlQ29udHJvbHNEaXYuZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBhZ2VDb250cm9sc0Rpdi5lbGVtZW50LCAwLjUsIDAuMzgzLCAxNDAsIDMwKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFnZU51bWJlclRleHQgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IHRleHRDb250YWluZXIgPSBwLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHRleHRDb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICByZXR1cm4gdGV4dENvbnRhaW5lcjtcclxuICAgIH0sIFwicGFnZU51bWJlclRleHRcIik7XHJcblxyXG4gICAgbGV0IHByZXZpb3VzUGFnZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCImIzgyNDk7XCIpO1xyXG4gICAgfSwgXCJwcmV2aW91c1BhZ2VCdXR0b25cIik7XHJcbiAgICBpZiAoIXByZXZpb3VzUGFnZUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcHJldmlvdXNQYWdlQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgZ2xvYmFsLm9ubGluZVBsYXlsaXN0LnByZXZpb3VzUGFnZSgpO1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHBsYXlsaXN0TWVudUlkKTtcclxuICAgICAgICAgICAgcGFnZU51bWJlclRleHQuZWxlbWVudC5odG1sKFwiUGFnZSBcIiArIChnbG9iYWwub25saW5lUGxheWxpc3QuZ2V0UGFnZSgpICsgMSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByZXZpb3VzUGFnZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKFwicGFnZS1jb250cm9sLWJ1dHRvblwiKTtcclxuICAgICAgICBwYWdlQ29udHJvbHNEaXYuZWxlbWVudC5jaGlsZChwcmV2aW91c1BhZ2VCdXR0b24uZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIXBhZ2VOdW1iZXJUZXh0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBwYWdlQ29udHJvbHNEaXYuZWxlbWVudC5jaGlsZChwYWdlTnVtYmVyVGV4dC5lbGVtZW50KTtcclxuICAgICAgICBwYWdlTnVtYmVyVGV4dC5lbGVtZW50Lmh0bWwoXCJQYWdlIFwiICsgKGdsb2JhbC5vbmxpbmVQbGF5bGlzdC5nZXRQYWdlKCkgKyAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5leHRQYWdlQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIiYjODI1MDtcIik7XHJcbiAgICB9LCBcIm5leHRQYWdlQnV0dG9uXCIpO1xyXG4gICAgaWYgKCFuZXh0UGFnZUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgbmV4dFBhZ2VCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBnbG9iYWwub25saW5lUGxheWxpc3QubmV4dFBhZ2UoKTtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5bGlzdE1lbnVJZCk7XHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXJUZXh0LmVsZW1lbnQuaHRtbChcIlBhZ2UgXCIgKyAoZ2xvYmFsLm9ubGluZVBsYXlsaXN0LmdldFBhZ2UoKSArIDEpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuZXh0UGFnZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKFwicGFnZS1jb250cm9sLWJ1dHRvblwiKTtcclxuICAgICAgICBwYWdlQ29udHJvbHNEaXYuZWxlbWVudC5jaGlsZChuZXh0UGFnZUJ1dHRvbi5lbGVtZW50KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZX0gZnJvbSBcIi4uL3VpX3V0aWxcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVzdWx0cyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKFwiYmxhY2tcIik7XHJcblxyXG4gICAgICAgIGdsb2JhbC5yZXN1bHRzRGlzcGxheS5kcmF3KCk7XHJcblxyXG4gICAgICAgIGxldCByZXR1cm5CdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlJldHVyblwiKTtcclxuICAgICAgICB9LCBcInJldHVybkJ1dHRvblwiKTtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShyZXR1cm5CdXR0b24uZWxlbWVudCwgMC41LCAwLjksIDczLCAzNCk7XHJcbiAgICAgICAgaWYgKCFyZXR1cm5CdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICByZXR1cm5CdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICByZXR1cm5CdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgUGFnZU1hbmFnZXIucmV0dXJuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGaWxlIGNvbnRlbnRzIG9yaWdpbmFsbHkgZnJvbTpcclxuICogQGF1dGhvcjogVmVsb2NpdHlcclxuICogQGdpdGh1YjogaHR0cHM6Ly9naXRodWIuY29tL2ZsYXNoZmxhc2hyZXZvbHV0aW9uL3dlYi1iZWF0Ym94LWVkaXRvclxyXG4gKi9cclxuXHJcbmNvbnN0IFJFQ09SREhFQURFUl9MRU5HVEhfRlVMTCA9IDB4M2ZcclxuICAgIC8vIG51bGwtY2hhcmFjdGVyXHJcbiAgICAsIEVPUyA9IDB4MDBcclxuICAgICwgc3R5bGVDb3VudEV4dCA9IDB4RkY7XHJcblxyXG5leHBvcnQgY2xhc3MgQnl0ZVJlYWRlciB7XHJcbiAgICBwdWJsaWMgYnVmZmVyX3JhdzogQXJyYXlCdWZmZXJMaWtlO1xyXG4gICAgcHVibGljIGJ1ZmZlcjogRGF0YVZpZXc7XHJcbiAgICBwdWJsaWMgcG9pbnRlcjogbnVtYmVyO1xyXG4gICAgcHVibGljIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY3VycmVudDogbnVtYmVyO1xyXG4gICAgcHVibGljIGxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJfcmF3ID0gYnVmZmVyO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gMDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gMTtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gYnVmZmVyLmJ5dGVMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB1bnNpZ25lZCAxNiBvciAzMiBMaXR0bGUgRW5kaWFuIEJpdHNcclxuICAgICAqIGFuZCBhZHZhbmNlIHBvaW50ZXIgdG8gbmV4dCBiaXRzIC8gOCBieXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiaXRzXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFZhbHVlIHJlYWQgZnJvbSBidWZmZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRVSW50TEUoYml0czogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChiaXRzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmU6IHRoZSBzZWNvbmQgcGFyYW1ldGVyIG1pZ2h0IG9ubHkgZXhpc3QgaW4gRVM2LCBsZXQncyBzZWUgaWYgdGhpcyBjYXVzZXMgYW4gZXJyb3JcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5idWZmZXIuZ2V0VWludDgodGhpcy5wb2ludGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE2OlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRVaW50MTYodGhpcy5wb2ludGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMyOlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmJ1ZmZlci5nZXRVaW50MzIodGhpcy5wb2ludGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJVbmV4cGVjdGVkIG51bWJlciBvZiBiaXRzOiAnXCIgKyBiaXRzICsgXCInXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucG9pbnRlciArPSBiaXRzIC8gODtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB1bnNpZ25lZCA4IGJpdCBmcm9tIHRoZSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFZhbHVlIHJlYWQgZnJvbSBidWZmZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkVUludDgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyLmdldFVpbnQ4KHRoaXMucG9pbnRlcisrKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBmbG9hdCBmcm9tIHRoZSBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFZhbHVlIHJlYWQgZnJvbSBidWZmZXJcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyByZWFkRmxvYXQoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gMDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldEZsb2F0MzIodGhpcy5wb2ludGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludGVyICs9IDQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgZG91YmxlIGZyb20gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVmFsdWUgcmVhZCBmcm9tIGJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWREb3VibGUoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gMDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYnVmZmVyLmdldEZsb2F0NjQodGhpcy5wb2ludGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludGVyICs9IDg7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgMzItYml0IHVuc2lnbmVkIGludGVnZXJzIHZhbHVlIGVuY29kZWQgKDEtNSBieXRlcylcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IDMyLWJpdCB1bnNpZ25lZCBpbnRlZ2VyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZEVuY29kZWRVMzIoKSB7XHJcbiAgICAgICAgbGV0IGkgPSA1XHJcbiAgICAgICAgICAgICwgcmVzdWx0ID0gMFxyXG4gICAgICAgICAgICAsIG5iO1xyXG5cclxuICAgICAgICBkb1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gKG5iID0gdGhpcy5uZXh0Qnl0ZSgpKTtcclxuICAgICAgICB3aGlsZSAoKG5iICYgMTI4KSAmJiAtLWkpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGFuIGVuY29kZWQgZGF0YSBmcm9tIGJ1ZmZlciBhbmQgcmV0dXJucyBhXHJcbiAgICAgKiBzdHJpbmcgdXNpbmcgdGhlIHNwZWNpZmllZCBjaGFyYWN0ZXIgc2V0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IERlY29kZWQgc3RyaW5nXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVhZFN0cmluZygpIHtcclxuICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgcmVhZCA9IHRoaXMucmVhZFVJbnQ4KCk7XHJcbiAgICAgICAgICAgIGlmIChyZWFkID09PSBFT1MpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocmVhZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYW4gZW5jb2RlZCBkYXRhIGZyb20gYnVmZmVyIGFuZCByZXR1cm5zIGFcclxuICAgICAqIHN0cmluZyB1c2luZyB0aGUgc3BlY2lmaWVkIGNoYXJhY3RlciBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gRGVjb2RlZCBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRTdHJpbmdGaXhlZChyZWFkTGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICB3aGlsZSAocmVhZExlbmd0aC0tID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcmVhZCA9IHRoaXMucmVhZFVJbnQ4KCk7XHJcbiAgICAgICAgICAgIGlmIChyZWFkID09PSBFT1MpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocmVhZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgUkVDT1JESEVBREVSIGZyb20gbmV4dCB0YWcgaW4gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGFnIGNvZGUgYW5kIGxlbmd0aFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFRhZ0NvZGVBbmRMZW5ndGgoKTogVGFnSGVhZGVyIHtcclxuICAgICAgICBsZXQgcCA9IHRoaXMucG9pbnRlcjtcclxuICAgICAgICBsZXQgbiA9IHRoaXMucmVhZFVJbnRMRSgxNilcclxuICAgICAgICAgICAgLCB0YWdUeXBlID0gbiA+PiA2XHJcbiAgICAgICAgICAgICwgdGFnTGVuZ3RoID0gbiAmIFJFQ09SREhFQURFUl9MRU5HVEhfRlVMTDtcclxuXHJcbiAgICAgICAgaWYgKG4gPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGFnTGVuZ3RoID09PSBSRUNPUkRIRUFERVJfTEVOR1RIX0ZVTEwpXHJcbiAgICAgICAgICAgIHRhZ0xlbmd0aCA9IHRoaXMucmVhZFVJbnRMRSgzMik7XHJcblxyXG4gICAgICAgIHJldHVybiB7c3RhcnQ6IHAsIGVuZDogdGhpcy5wb2ludGVyICsgdGFnTGVuZ3RoLCBjb2RlOiB0YWdUeXBlLCBsZW5ndGg6IHRhZ0xlbmd0aCwgcG9zaXRpb246IHRoaXMucG9pbnRlcn07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgUkVDT1JESEVBREVSIGZyb20gbmV4dCB0YWcgaW4gdGhlIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGFnIGNvZGUgYW5kIGxlbmd0aFxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHJlYWRBY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHMgPSB0aGlzLnBvaW50ZXI7XHJcbiAgICAgICAgbGV0IGEgPSB0aGlzLnJlYWRVSW50OCgpO1xyXG4gICAgICAgIGxldCBsID0gKGEgJiAweDgwKSA/IHRoaXMucmVhZFVJbnRMRSgxNikgOiAwO1xyXG4gICAgICAgIGxldCBwID0gdGhpcy5wb2ludGVyO1xyXG5cclxuICAgICAgICByZXR1cm4ge3N0YXJ0OiBzLCBhY3Rpb246IGEsIGxlbmd0aDogbCwgcG9zaXRpb246IHB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIFJFQ1QgZm9ybWF0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7UmVjdH0geCwgeSwgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgUkVDVFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFJlY3QoKTogUmVjdCB7XHJcbiAgICAgICAgdGhpcy5zdGFydCgpO1xyXG5cclxuICAgICAgICBsZXQgTkJpdHMgPSB0aGlzLnJlYWRCaXRzKDUpXHJcbiAgICAgICAgICAgICwgWG1pbiA9IHRoaXMucmVhZEJpdHMoTkJpdHMsIHRydWUpIC8gMjBcclxuICAgICAgICAgICAgLCBYbWF4ID0gdGhpcy5yZWFkQml0cyhOQml0cywgdHJ1ZSkgLyAyMFxyXG4gICAgICAgICAgICAsIFltaW4gPSB0aGlzLnJlYWRCaXRzKE5CaXRzLCB0cnVlKSAvIDIwXHJcbiAgICAgICAgICAgICwgWW1heCA9IHRoaXMucmVhZEJpdHMoTkJpdHMsIHRydWUpIC8gMjA7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IFhtaW4sXHJcbiAgICAgICAgICAgIHk6IFltaW4sXHJcbiAgICAgICAgICAgIHdpZHRoOiAoWG1heCA+IFhtaW4gPyBYbWF4IC0gWG1pbiA6IFhtaW4gLSBYbWF4KSxcclxuICAgICAgICAgICAgaGVpZ2h0OiAoWW1heCA+IFltaW4gPyBZbWF4IC0gWW1pbiA6IFltaW4gLSBZbWF4KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBpbnRlcm5hbCBwb2ludGVyIHRvIHRoZSBzcGVjaWZpZWQgcG9zaXRpb247XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBvc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2Vlayhwb3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IHBvcyAlIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHBvc2l0aW9uIGFuZCBzZXRzIGN1cnJlbnQgdG8gbmV4dCBCeXRlIGluIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5uZXh0Qnl0ZSgpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSAxO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgbmV4dCBCeXRlIGluIHRoZSBidWZmZXIgYW5kIEluY3JlbWVudCBpbnRlcm5hbCBwb2ludGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBOZXh0IGJ5dGUgaW4gYnVmZmVyXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgbmV4dEJ5dGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRlciA+IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGggPyBudWxsIDogdGhpcy5idWZmZXIuZ2V0VWludDgodGhpcy5wb2ludGVyKyspO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGIgYml0cyBmcm9tIGN1cnJlbnQgYnl0ZSBpbiBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBCaXRzIHJlYWQgZnJvbSBidWZmZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRCaXRzKGI6IG51bWJlciwgc2lnbmVkOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgbiA9IDBcclxuICAgICAgICAgICAgLCByID0gMFxyXG4gICAgICAgICAgICAsIHNpZ24gPSBzaWduZWQgJiYgKytuICYmICgodGhpcy5jdXJyZW50ID4+ICg4IC0gdGhpcy5wb3NpdGlvbisrKSkgJiAxKSA/IC0xIDogMTtcclxuXHJcbiAgICAgICAgd2hpbGUgKG4rKyA8IGIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPiA4KSB0aGlzLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgICAgICByID0gKHIgPDwgMSkgKyAoKHRoaXMuY3VycmVudCA+PiAoOCAtIHRoaXMucG9zaXRpb24rKykpICYgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaWduICogcjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBsYWNlIGJ5dGVzIGluIHRoZSBBcnJheUJ1ZmZlciB3aXRoIHRoZSBwcm92aWRlZCBieXRlcy5cclxuICAgICAqIFRoaXMgc2xpY2VzIHRoZSBmcm9tIGAwIC0+IHBvaW50ZXJgIGFuZCBgcG9zaXRpb25fZW5kIC0+IGJ1ZmZlcmxlbmd0aGBcclxuICAgICAqIGFuZCBpbnNlcnRzIHRoZSBnaXZlbiBieXRlcyBiZXR3ZWVuIHRoZW0uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBCaXRzIHJlYWQgZnJvbSBidWZmZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcGxhY2VCeXRlcyhuZXdfYnl0ZXM6IGFueSwgcG9zdGlvbl9lbmQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBidWZmZXIxID0gdGhpcy5idWZmZXJfcmF3LnNsaWNlKDAsIHRoaXMucG9pbnRlcik7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcjIgPSBuZXdfYnl0ZXM7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcjMgPSB0aGlzLmJ1ZmZlcl9yYXcuc2xpY2UocG9zdGlvbl9lbmQpO1xyXG5cclxuICAgICAgICBsZXQgdG1wID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyMS5ieXRlTGVuZ3RoICsgYnVmZmVyMi5ieXRlTGVuZ3RoICsgYnVmZmVyMy5ieXRlTGVuZ3RoKTtcclxuICAgICAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlcjEpLCAwKTtcclxuICAgICAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlcjIpLCBidWZmZXIxLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyMyksIGJ1ZmZlcjEuYnl0ZUxlbmd0aCArIGJ1ZmZlcjIuYnl0ZUxlbmd0aCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVmZmVyX3JhdyA9IHRtcC5idWZmZXI7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBuZXcgRGF0YVZpZXcodGhpcy5idWZmZXJfcmF3KTtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSAxO1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWN0IHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWcge1xyXG4gICAgcG9vbD86IHN0cmluZ1tdO1xyXG4gICAgdmFyaWFibGVzPzogYW55O1xyXG4gICAgaGVhZGVyPzogVGFnSGVhZGVyO1xyXG4gICAgZG9JbmNsdWRlPzogYm9vbGVhbjtcclxuICAgIGRhdGE/OiBBcnJheUJ1ZmZlckxpa2VcclxuICAgIGF1ZGlvX2J5dGVzPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhZ0hlYWRlciB7XHJcbiAgICBzdGFydDogbnVtYmVyO1xyXG4gICAgZW5kOiBudW1iZXI7XHJcbiAgICBjb2RlOiBudW1iZXI7XHJcbiAgICBsZW5ndGg6IG51bWJlcjtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbn0iLCJleHBvcnQgY2xhc3MgUGFydGlhbFBhcnNlIHtcclxuICAgIG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTm90ZVR5cGUge1xyXG4gICAgTk9ORSA9IFwiMFwiLFxyXG4gICAgTk9STUFMID0gXCIxXCIsXHJcbiAgICBIT0xEX0hFQUQgPSBcIjJcIixcclxuICAgIFRBSUwgPSBcIjNcIixcclxuICAgIFJPTExfSEVBRCA9IFwiNFwiLFxyXG4gICAgTUlORSA9IFwiTVwiLFxyXG4gICAgVU5LTk9XTiA9IFwiPz8/XCIsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb05vdGVUeXBlKHN0cmluZzogc3RyaW5nKTogTm90ZVR5cGUge1xyXG4gICAgc3dpdGNoIChzdHJpbmcpIHtcclxuICAgICAgICBjYXNlIFwiMFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuTk9ORTtcclxuICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuTk9STUFMO1xyXG4gICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5IT0xEX0hFQUQ7XHJcbiAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLlRBSUw7XHJcbiAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLlJPTExfSEVBRDtcclxuICAgICAgICBjYXNlIFwiTVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuTUlORTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuVU5LTk9XTjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTm90ZVN0YXRlIHtcclxuICAgIERFRkFVTFQsXHJcbiAgICBISVQsXHJcbiAgICBNSVNTRUQsXHJcbiAgICBIRUxELFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGUge1xyXG4gICAgdHlwZTogTm90ZVR5cGU7XHJcbiAgICB0eXBlU3RyaW5nOiBzdHJpbmc7IC8vIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUgQkVGT1JFIGl0J3MgaW50ZXJwcmV0ZWQgYXMgYSBOb3RlVHlwZVxyXG4gICAgdGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgc3RhdGU/OiBOb3RlU3RhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RlIHtcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGlmZmljdWx0eTogc3RyaW5nO1xyXG4gICAgcHVibGljIG1ldGVyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZ1bGxQYXJzZSB7XHJcbiAgICBtZXRhRGF0YTogTWFwPHN0cmluZywgc3RyaW5nPjtcclxuICAgIG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W107XHJcbiAgICBvZmZzZXQ6IG51bWJlcjtcclxuICAgIGJwbXM6IFtudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHN0b3BzOiBbbnVtYmVyLCBudW1iZXJdW107XHJcbiAgICB0cmFja3M6IE5vdGVbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlKSB7XHJcbiAgICAgICAgdGhpcy5tZXRhRGF0YSA9IHBhcnRpYWxQYXJzZS5tZXRhRGF0YTtcclxuICAgICAgICB0aGlzLm1vZGVzID0gcGFydGlhbFBhcnNlLm1vZGVzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiBTdGVwIE9uZSBPZiBQYXJzaW5nICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJ0aWFsUGFyc2UoZmlsZUNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIGxldCBwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZSA9IG5ldyBQYXJ0aWFsUGFyc2UoKTtcclxuICAgIHBhcnRpYWxQYXJzZS5tZXRhRGF0YSA9IGdldFRvcE1ldGFEYXRhQXNTdHJpbmdzKGZpbGVDb250ZW50cyk7XHJcbiAgICBwYXJ0aWFsUGFyc2UubW9kZXMgPSBnZXRNb2Rlc0luZm9Bc1N0cmluZ3MoZmlsZUNvbnRlbnRzKTtcclxuICAgIHJldHVybiBwYXJ0aWFsUGFyc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvcE1ldGFEYXRhQXNTdHJpbmdzKGZpbGU6IHN0cmluZykge1xyXG4gICAgLy8gbWF0Y2ggYW55IG1ldGFkYXRhIHRhZyBleGNsdWRpbmcgdGhlIFwiTk9URVNcIiB0YWcgKGNhc2UtaW5zZW5zaXRpdmUpXHJcbiAgICBsZXQgcmUgPSAvIyg/IVtuTl1bb09dW3RUXVtlRV1bc1NdKShbXjpdKyk6KFteO10rKTsvZztcclxuICAgIGxldCBtYXRjaGVzID0gWy4uLmZpbGUubWF0Y2hBbGwocmUpXTtcclxuICAgIGxldCBtZXRhRGF0YTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtYXRjaCA9IG1hdGNoZXNbaV07XHJcbiAgICAgICAgbWV0YURhdGEuc2V0KGNsZWFuTWV0YURhdGFTdHJpbmcobWF0Y2hbMV0pLnRvVXBwZXJDYXNlKCksIGNsZWFuTWV0YURhdGFTdHJpbmcobWF0Y2hbMl0pKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtZXRhRGF0YTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TW9kZXNJbmZvQXNTdHJpbmdzKGZpbGVDb250ZW50czogc3RyaW5nKSB7XHJcbiAgICAvLyBHZXQgXCJOT1RFU1wiIHNlY3Rpb25zIChjYXNlLWluc2Vuc2l0aXZlKS4gVGhlIGZpcnN0IGZpdmUgdmFsdWVzIGFyZSBwb3N0Zml4ZWQgd2l0aCBhIGNvbG9uLlxyXG4gICAgLy8gTm90ZSBkYXRhIGNvbWVzIGxhc3QsIHBvc3RmaXhlZCBieSBhIHNlbWljb2xvbi5cclxuICAgIGxldCByZSA9IC8jW25OXVtvT11bdFRdW2VFXVtzU106KFteOl0qKTooW146XSopOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjtdKzspL2c7XHJcbiAgICBsZXQgbWF0Y2hlcyA9IFsuLi5maWxlQ29udGVudHMubWF0Y2hBbGwocmUpXTtcclxuICAgIGxldCBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdID0gW107XHJcbiAgICBsZXQgZmllbGROYW1lcyA9IFtcInR5cGVcIiwgXCJkZXNjL2F1dGhvclwiLCBcImRpZmZpY3VsdHlcIiwgXCJtZXRlclwiLCBcInJhZGFyXCJdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWF0Y2hlc1tpXTtcclxuICAgICAgICBsZXQgbW9kZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IG1hdGNoLmxlbmd0aCAtIDE7IGorKykge1xyXG4gICAgICAgICAgICBtb2RlLnNldChmaWVsZE5hbWVzW2ogLSAxXSwgY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFtqXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb2RlLnNldChcIm5vdGVzXCIsIG1hdGNoW21hdGNoLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICBtb2Rlcy5wdXNoKG1vZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vZGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhbk1ldGFEYXRhU3RyaW5nKHN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHJpbmcudHJpbSgpLnJlcGxhY2UoL1xcbi9nLCBcIlwiKTtcclxufVxyXG5cclxuLyogU3RlcCBUd28gT2YgUGFyc2luZyAqL1xyXG5cclxuLy8gVE9ETzogYWN0dWFsbHkgcmV0dXJuIEZ1bGxQYXJzZVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbFBhcnNlKG1vZGVJbmRleDogbnVtYmVyLCBwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZSk6IEZ1bGxQYXJzZSB7XHJcbiAgICBsZXQgZnVsbFBhcnNlID0gbmV3IEZ1bGxQYXJzZShwYXJ0aWFsUGFyc2UpO1xyXG4gICAgbGV0IHVucGFyc2VkTm90ZXM6IHN0cmluZyA9IHBhcnRpYWxQYXJzZS5tb2Rlc1ttb2RlSW5kZXhdLmdldChcIm5vdGVzXCIpO1xyXG4gICAgbGV0IHVucGFyc2VkQXJyYXk6IHN0cmluZ1tdID0gdW5wYXJzZWROb3Rlcy5zcGxpdChcIlxcblwiKTtcclxuICAgIGxldCBtZWFzdXJlczogc3RyaW5nW11bXSA9IGdldE1lYXN1cmVzKHVucGFyc2VkQXJyYXkpO1xyXG4gICAgbGV0IGJlYXRzQW5kTGluZXM6IHsgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSA9IGdldEJlYXRJbmZvQnlMaW5lKG1lYXN1cmVzKTtcclxuICAgIGxldCBjbGVhbmVkQmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gcmVtb3ZlQmxhbmtMaW5lcyhiZWF0c0FuZExpbmVzKTtcclxuICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IHBhcnNlRmxvYXQocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIk9GRlNFVFwiKSk7XHJcbiAgICBsZXQgYnBtczogeyBiZWF0OiBudW1iZXI7IGJwbTogbnVtYmVyIH1bXSA9IHBhcnNlQlBNUyhwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiQlBNU1wiKSk7XHJcbiAgICBsZXQgc3RvcHM6IHsgc3RvcER1cmF0aW9uOiBudW1iZXI7IGJlYXQ6IG51bWJlciB9W10gPSBwYXJzZVN0b3BzKHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJTVE9QU1wiKSk7XHJcbiAgICBsZXQgdGltZXNCZWF0c0FuZExpbmVzOiB7IHRpbWU6IG51bWJlcjsgYmVhdDogbnVtYmVyOyBsaW5lSW5mbzogc3RyaW5nIH1bXSA9IGdldFRpbWVJbmZvQnlMaW5lKGNsZWFuZWRCZWF0c0FuZExpbmVzLCBvZmZzZXQsIGJwbXMsIHN0b3BzKTtcclxuICAgIGZ1bGxQYXJzZS50cmFja3MgPSBnZXRUcmFja3NGcm9tTGluZXModGltZXNCZWF0c0FuZExpbmVzKTtcclxuICAgIHJldHVybiBmdWxsUGFyc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1lYXN1cmVzKHVucGFyc2VkQXJyYXk6IHN0cmluZ1tdKSB7XHJcbiAgICBsZXQgbWVhc3VyZXM6IHN0cmluZ1tdW10gPSBbXTtcclxuICAgIGxldCBzdGF0ZSA9IDA7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgY3VycmVudE1lYXN1cmU6IHN0cmluZ1tdID0gW107XHJcbiAgICB3aGlsZSAoaSA8IHVucGFyc2VkQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lID0gdW5wYXJzZWRBcnJheVtpXTtcclxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudExpbmUuaW5jbHVkZXMoXCIvL1wiKSAmJiBjdXJyZW50TGluZS50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRMaW5lLmluY2x1ZGVzKFwiLFwiKSAmJiAhY3VycmVudExpbmUuaW5jbHVkZXMoXCI7XCIpICYmIGN1cnJlbnRMaW5lLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRNZWFzdXJlLnB1c2goY3VycmVudExpbmUudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlcy5wdXNoKGN1cnJlbnRNZWFzdXJlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRNZWFzdXJlID0gW107XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVhc3VyZXM7XHJcbn1cclxuXHJcbi8vIGFzc3VtZXMgNC80IHRpbWUgc2lnbmF0dXJlXHJcbmZ1bmN0aW9uIGdldEJlYXRJbmZvQnlMaW5lKG1lYXN1cmVzOiBzdHJpbmdbXVtdKSB7XHJcbiAgICBsZXQgYmVhdHNBbmRMaW5lcyA9IFtdO1xyXG4gICAgbGV0IGN1cnJlbnRCZWF0ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVhc3VyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWVhc3VyZSA9IG1lYXN1cmVzW2ldO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWVhc3VyZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBiZWF0c0FuZExpbmVzLnB1c2goe2JlYXQ6IGN1cnJlbnRCZWF0LCBsaW5lSW5mbzogbWVhc3VyZVtqXX0pO1xyXG4gICAgICAgICAgICBjdXJyZW50QmVhdCArPSA0IC8gbWVhc3VyZS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJlYXRzQW5kTGluZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUJsYW5rTGluZXMoYmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdKSB7XHJcbiAgICBsZXQgY2xlYW5lZEJlYXRzQW5kTGluZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmVhdHNBbmRMaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBsaW5lID0gYmVhdHNBbmRMaW5lc1tpXTtcclxuICAgICAgICBpZiAoIWlzQWxsWmVyb3MobGluZS5saW5lSW5mbykpIHtcclxuICAgICAgICAgICAgY2xlYW5lZEJlYXRzQW5kTGluZXMucHVzaChsaW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2xlYW5lZEJlYXRzQW5kTGluZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQWxsWmVyb3Moc3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHN0cmluZy5jaGFyQXQoaSkgIT09ICcwJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRpbWVJbmZvQnlMaW5lKGluZm9CeUxpbmU6IHsgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSwgb2Zmc2V0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10sIHN0b3BzOiB7IGJlYXQ6IG51bWJlciwgc3RvcER1cmF0aW9uOiBudW1iZXIgfVtdXHJcbik6IHsgdGltZTogbnVtYmVyLCBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdIHtcclxuICAgIGxldCBpbmZvQnlMaW5lV2l0aFRpbWU6IHsgdGltZTogbnVtYmVyLCBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gW107XHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAtb2Zmc2V0ICsgZ2V0RWxhcHNlZFRpbWUoMCwgaW5mb0J5TGluZVswXS5iZWF0LCBicG1zLCBzdG9wcyk7XHJcbiAgICBpbmZvQnlMaW5lV2l0aFRpbWUucHVzaCh7dGltZTogY3VycmVudFRpbWUsIGJlYXQ6IGluZm9CeUxpbmVbMF0uYmVhdCwgbGluZUluZm86IGluZm9CeUxpbmVbMF0ubGluZUluZm99KTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaW5mb0J5TGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzdGFydEJlYXQgPSBpbmZvQnlMaW5lW2kgLSAxXS5iZWF0O1xyXG4gICAgICAgIGxldCBlbmRCZWF0ID0gaW5mb0J5TGluZVtpXS5iZWF0O1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IGdldEVsYXBzZWRUaW1lKHN0YXJ0QmVhdCwgZW5kQmVhdCwgYnBtcywgc3RvcHMpO1xyXG4gICAgICAgIGluZm9CeUxpbmVXaXRoVGltZS5wdXNoKHt0aW1lOiBjdXJyZW50VGltZSwgYmVhdDogaW5mb0J5TGluZVtpXS5iZWF0LCBsaW5lSW5mbzogaW5mb0J5TGluZVtpXS5saW5lSW5mb30pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZm9CeUxpbmVXaXRoVGltZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RWxhcHNlZFRpbWUoc3RhcnRCZWF0OiBudW1iZXIsIGVuZEJlYXQ6IG51bWJlciwgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W10pIHtcclxuICAgIGxldCBjdXJyZW50QlBNSW5kZXg6IG51bWJlciA9IGdldFN0YXJ0QlBNSW5kZXgoc3RhcnRCZWF0LCBicG1zKTtcclxuICAgIGxldCBlYXJsaWVzdEJlYXQ6IG51bWJlciA9IHN0YXJ0QmVhdDtcclxuICAgIGxldCBlbGFwc2VkVGltZTogbnVtYmVyID0gc3RvcHMgPT0gbnVsbCA/IDAgOiBzdG9wcGVkVGltZShzdGFydEJlYXQsIGVuZEJlYXQsIHN0b3BzKTtcclxuICAgIGRvIHtcclxuICAgICAgICBsZXQgbmV4dEJQTUNoYW5nZTogbnVtYmVyID0gZ2V0TmV4dEJQTUNoYW5nZShjdXJyZW50QlBNSW5kZXgsIGJwbXMpO1xyXG4gICAgICAgIGxldCBuZXh0QmVhdDogbnVtYmVyID0gTWF0aC5taW4oZW5kQmVhdCwgbmV4dEJQTUNoYW5nZSk7XHJcbiAgICAgICAgZWxhcHNlZFRpbWUgKz0gKG5leHRCZWF0IC0gZWFybGllc3RCZWF0KSAvIGJwbXNbY3VycmVudEJQTUluZGV4XS5icG0gKiA2MDtcclxuICAgICAgICBlYXJsaWVzdEJlYXQgPSBuZXh0QmVhdDtcclxuICAgICAgICBjdXJyZW50QlBNSW5kZXgrKztcclxuICAgIH0gd2hpbGUgKGVhcmxpZXN0QmVhdCA8IGVuZEJlYXQpO1xyXG4gICAgcmV0dXJuIGVsYXBzZWRUaW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdGFydEJQTUluZGV4KHN0YXJ0QmVhdDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdKSB7XHJcbiAgICBsZXQgc3RhcnRCUE1JbmRleCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGJwbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYnBtc1tpXS5iZWF0IDwgc3RhcnRCZWF0KSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QlBNSW5kZXggPSBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdGFydEJQTUluZGV4O1xyXG59XHJcblxyXG4vLyBkb2VzIE5PVCBzbmFwIHRvIG5lYXJlc3QgMS8xOTJuZCBvZiBiZWF0XHJcbmZ1bmN0aW9uIHN0b3BwZWRUaW1lKHN0YXJ0QmVhdDogbnVtYmVyLCBlbmRCZWF0OiBudW1iZXIsIHN0b3BzOiB7IGJlYXQ6IG51bWJlciwgc3RvcER1cmF0aW9uOiBudW1iZXIgfVtdKSB7XHJcbiAgICBsZXQgdGltZSA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3BzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHN0b3BCZWF0ID0gc3RvcHNbaV0uYmVhdDtcclxuICAgICAgICBpZiAoc3RhcnRCZWF0IDw9IHN0b3BCZWF0ICYmIHN0b3BCZWF0IDwgZW5kQmVhdCkge1xyXG4gICAgICAgICAgICB0aW1lICs9IHN0b3BzW2ldLnN0b3BEdXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGltZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TmV4dEJQTUNoYW5nZShjdXJyZW50QlBNSW5kZXg6IG51bWJlciwgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSkge1xyXG4gICAgaWYgKGN1cnJlbnRCUE1JbmRleCArIDEgPCBicG1zLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBicG1zW2N1cnJlbnRCUE1JbmRleCArIDFdLmJlYXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUcmFja3NGcm9tTGluZXModGltZXNCZWF0c0FuZExpbmVzOiB7IHRpbWU6IG51bWJlcjsgYmVhdDogbnVtYmVyOyBsaW5lSW5mbzogc3RyaW5nOyB9W10pIHtcclxuICAgIGxldCBudW1UcmFja3M6IG51bWJlciA9IHRpbWVzQmVhdHNBbmRMaW5lc1swXS5saW5lSW5mby5sZW5ndGg7XHJcbiAgICBsZXQgdHJhY2tzOiBOb3RlW11bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgIHRyYWNrcy5wdXNoKFtdKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZXNCZWF0c0FuZExpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGxpbmU6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmcgfSA9IHRpbWVzQmVhdHNBbmRMaW5lc1tpXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUubGluZUluZm8ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHR5cGVTdHJpbmcgPSBsaW5lLmxpbmVJbmZvLmNoYXJBdChqKTtcclxuICAgICAgICAgICAgbGV0IG5vdGVUeXBlOiBOb3RlVHlwZSA9IHN0cmluZ1RvTm90ZVR5cGUodHlwZVN0cmluZyk7XHJcbiAgICAgICAgICAgIGlmIChub3RlVHlwZSAhPT0gTm90ZVR5cGUuTk9ORSkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tzW2pdLnB1c2goe3R5cGU6IG5vdGVUeXBlLCB0eXBlU3RyaW5nOiB0eXBlU3RyaW5nLCB0aW1lSW5TZWNvbmRzOiBsaW5lLnRpbWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cmFja3M7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQlBNUyhicG1TdHJpbmc6IHN0cmluZykge1xyXG4gICAgaWYgKGJwbVN0cmluZyA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgbGV0IGJwbUFycmF5OiBbbnVtYmVyLCBudW1iZXJdW10gPSBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKGJwbVN0cmluZyk7XHJcbiAgICBsZXQgYnBtczogeyBiZWF0OiBudW1iZXI7IGJwbTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBicG1BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGJwbXMucHVzaCh7YmVhdDogYnBtQXJyYXlbaV1bMF0sIGJwbTogYnBtQXJyYXlbaV1bMV19KTtcclxuICAgIH1cclxuICAgIHJldHVybiBicG1zO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVN0b3BzKHN0b3BzU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGlmIChzdG9wc1N0cmluZyA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgbGV0IHN0b3BzQXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oc3RvcHNTdHJpbmcpO1xyXG4gICAgbGV0IHN0b3BzOiB7IHN0b3BEdXJhdGlvbjogbnVtYmVyOyBiZWF0OiBudW1iZXIgfVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3BzQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzdG9wcy5wdXNoKHtiZWF0OiBzdG9wc0FycmF5W2ldWzBdLCBzdG9wRHVyYXRpb246IHN0b3BzQXJyYXlbaV1bMV19KTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdG9wcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihzdHJpbmc6IHN0cmluZykge1xyXG4gICAgbGV0IHN0cmluZ0FycmF5OiBzdHJpbmdbXVtdID0gc3RyaW5nLnNwbGl0KFwiLFwiKS5tYXAoZSA9PiBlLnRyaW0oKS5zcGxpdChcIj1cIikpO1xyXG4gICAgbGV0IGFycmF5OiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5nQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBhcnJheS5wdXNoKFtwYXJzZUZsb2F0KHN0cmluZ0FycmF5W2ldWzBdKSwgcGFyc2VGbG9hdChzdHJpbmdBcnJheVtpXVsxXSldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxufSIsImltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtTV0ZUYWdzfSBmcm9tIFwiLi9zd2YtdGFnc1wiO1xyXG5pbXBvcnQge1NXRiwgdW5jb21wcmVzc30gZnJvbSBcIi4vc3dmLXJlYWRlclwiO1xyXG5pbXBvcnQge0F1ZGlvRmlsZX0gZnJvbSBcIi4uL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4uL3N0ZXBmaWxlXCI7XHJcblxyXG4vKipcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTd2YoaW5wdXQ6IEZpbGUgfCBBcnJheUJ1ZmZlciwgc3RlcGZpbGU6IFN0ZXBmaWxlLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgaWYgKGlucHV0LmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIHJldHVybiBzd2ZGaWxlX1JlYWR5KDxVaW50OEFycmF5PiBpbnB1dCwgc3RlcGZpbGUsIGF1ZGlvRmlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBzd2ZGaWxlX1JlYWR5KDxVaW50OEFycmF5PiBldmVudC50YXJnZXQucmVzdWx0LCBzdGVwZmlsZSwgYXVkaW9GaWxlKTtcclxuICAgIH07XHJcbiAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgYWxlcnQoXCJJIEFNIEVSUk9SOiBcIiArIGV2ZW50LnRhcmdldC5lcnJvci5jb2RlKTtcclxuICAgIH07XHJcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoPEZpbGU+IGlucHV0KTtcclxufVxyXG5cclxubGV0IHN3Zl90YWdzOiBTV0Y7XHJcblxyXG5mdW5jdGlvbiBzd2ZGaWxlX1JlYWR5KGJ1ZmZlcjogVWludDhBcnJheSwgc3RlcGZpbGU6IFN0ZXBmaWxlLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgc3dmX3RhZ3MgPSB1bmNvbXByZXNzKGJ1ZmZlcik7XHJcbiAgICBcclxuICAgIC8vIENoYXJ0IERhdGFcclxuICAgIGxldCBjaGFydF90YWcgPSBnZXRCZWF0Qm94KCk7XHJcbiAgICBsZXQgY2hhcnRfZGF0YSA9IGNoYXJ0X3RhZ1tcInZhcmlhYmxlc1wiXVtcIl9yb290XCJdW1wiYmVhdEJveFwiXTtcclxuICAgIHN0ZXBmaWxlLmxvYWRGZnJCZWF0bWFwKGNoYXJ0X2RhdGEpO1xyXG5cclxuICAgIC8vIE11c2ljIERhdGFcclxuICAgIGxldCBtdXNpY19iaW5hcnkgPSBnZXRBdWRpbygpO1xyXG4gICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbbXVzaWNfYmluYXJ5XSwge3R5cGUgOiAnYXVkaW8vbXBlZyd9KTtcclxuICAgIGF1ZGlvRmlsZS5sb2FkQmxvYihibG9iKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgQmVhdGJveCBpbiB0aGUgc3dmX3RhZ3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCZWF0Qm94KCkge1xyXG4gICAgbGV0IGxlbiA9IHN3Zl90YWdzLnRhZ3MubGVuZ3RoO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGVsbSA9IG51bGw7XHJcblxyXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBlbG0gPSBzd2ZfdGFncy50YWdzW2ldO1xyXG4gICAgICAgIGlmKGVsbS5oZWFkZXIuY29kZSA9PSBTV0ZUYWdzLkRPQUNUSU9OKVxyXG4gICAgICAgICAgICByZXR1cm4gZWxtO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZCBCZWF0Ym94IGluIHRoZSBzd2ZfdGFncy5cclxuICovXHJcbmZ1bmN0aW9uIGdldEF1ZGlvKCkge1xyXG4gICAgbGV0IGxlbiA9IHN3Zl90YWdzLnRhZ3MubGVuZ3RoO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGVsbSA9IG51bGw7XHJcblxyXG4gICAgbGV0IGF1ZGlvU2l6ZSA9IDBcclxuXHJcbiAgICAvLyBMb29wIEFsbCBBdWRpbyBUYWdzLCBnZXQgVG90YWwgQnl0ZSBTaXplXHJcbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGVsbSA9IHN3Zl90YWdzLnRhZ3NbaV07XHJcbiAgICAgICAgaWYoZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuREVGSU5FU09VTkQgfHwgZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuU1RSRUFNQkxPQ0spXHJcbiAgICAgICAgICAgIGF1ZGlvU2l6ZSArPSBlbG0uYXVkaW9fYnl0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTG9vcCBBbGwgQXVkaW8gVGFncywgZ2V0IFRvdGFsIEJ5dGUgU2l6ZVxyXG4gICAgbGV0IHdyaXRlUG9zaXRpb24gPSAwO1xyXG4gICAgbGV0IGJpbmFyeSA9IG5ldyBVaW50OEFycmF5KGF1ZGlvU2l6ZSk7XHJcbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGVsbSA9IHN3Zl90YWdzLnRhZ3NbaV07XHJcbiAgICAgICAgaWYoZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuREVGSU5FU09VTkQgfHwgZWxtLmhlYWRlci5jb2RlID09IFNXRlRhZ3MuU1RSRUFNQkxPQ0spIHtcclxuICAgICAgICAgICAgYmluYXJ5LnNldChuZXcgVWludDhBcnJheShlbG0uZGF0YSksIHdyaXRlUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB3cml0ZVBvc2l0aW9uICs9IGVsbS5hdWRpb19ieXRlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmluYXJ5O1xyXG59IiwiaW1wb3J0ICogYXMgcGFrbyBmcm9tIFwicGFrb1wiO1xyXG5pbXBvcnQge1NXRkFjdGlvblRhZ3MsIFNXRk90aGVyVGFncywgU1dGVGFncywgU1dGVHlwZVRhZ3N9IGZyb20gXCIuL3N3Zi10YWdzXCI7XHJcbmltcG9ydCB7Qnl0ZVJlYWRlciwgUmVjdCwgVGFnLCBUYWdIZWFkZXJ9IGZyb20gXCIuL2J5dGVfcmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU1dGIHtcclxuICAgIHB1YmxpYyBidWZmZXI6IEJ5dGVSZWFkZXI7XHJcbiAgICBwdWJsaWMgbWFnaWM6IHN0cmluZztcclxuICAgIHB1YmxpYyB2ZXJzaW9uOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZmlsZUxlbmd0aDogeyBjb21wcmVzc2VkOiBudW1iZXIsIHVuY29tcHJlc3NlZDogbnVtYmVyIH07XHJcbiAgICBwdWJsaWMgZnJhbWVTaXplOiBSZWN0O1xyXG4gICAgcHVibGljIGZyYW1lUmF0ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0YWdzOiBhbnlbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmNhdCBTV0YgSGVhZGVyIHdpdGggdW5jb21wcmVzc2VkIEJ1ZmZlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdFNXRkhlYWRlcihidWZmOiBVaW50OEFycmF5LCBzd2Y6IEFycmF5QnVmZmVyKSB7XHJcbiAgICBsZXQgdG1wID0gbmV3IFVpbnQ4QXJyYXkoYnVmZi5ieXRlTGVuZ3RoICsgOCk7XHJcbiAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KHN3Zi5zbGljZSgwLCA4KSkpO1xyXG4gICAgdG1wLnNldChuZXcgVWludDhBcnJheShidWZmKSwgOCk7XHJcbiAgICByZXR1cm4gdG1wLmJ1ZmZlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlY29tcHJlc3MgU1dGIGlmIG5lZWRlZCBhbmQgUmVhZCBTV0ZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmNvbXByZXNzKHN3ZjogVWludDhBcnJheSkge1xyXG4gICAgbGV0IHN3Zl9ieXRlcyA9IG5ldyBVaW50OEFycmF5KHN3Zik7XHJcbiAgICBsZXQgY29tcHJlc3NlZF9idWZmOiBVaW50OEFycmF5ID0gc3dmLnNsaWNlKDgpO1xyXG5cclxuICAgIC8vIHVuY29tcHJlc3MgYnVmZmVyXHJcbiAgICBzd2l0Y2ggKHN3Zl9ieXRlc1swXSkgeyAvLyBNQUdJQ1xyXG4gICAgICAgIGNhc2UgMHg0MyA6IC8vICdDJyA9IHpsaWIgY29tcHJlc3NlZFxyXG4gICAgICAgICAgICBsZXQgdW5jb21wcmVzc2VkX2J1ZmYgPSBjb25jYXRTV0ZIZWFkZXIocGFrby5pbmZsYXRlKGNvbXByZXNzZWRfYnVmZiksIHN3Zik7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkU1dGQnVmZihuZXcgQnl0ZVJlYWRlcih1bmNvbXByZXNzZWRfYnVmZiksIHN3Zik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDB4NDYgOiAvLyAnRicgPSB1bmNvbXByZXNzZWRcclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRTV0ZCdWZmKG5ldyBCeXRlUmVhZGVyKHN3ZiksIHN3Zik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDB4NWEgOiAvLyBMWk1BIGNvbXByZXNzZWRcclxuICAgICAgICAgICAgYWxlcnQoJ0Nhbm5vdCBoYW5kbGUgTFpNQSBTV0YgY29tcHJlc3Npb25zJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgYWxlcnQoJ1Vua25vd24gU1dGIGNvbXByZXNzaW9ucycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlYWRzIHRoZSBTV0YgZnJvbSB1bmNvbXByZXNzZWQgYnVmZmVyLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRTV0ZCdWZmKGJ1ZmY6IEJ5dGVSZWFkZXIsIGNvbXByZXNzZWRfYnVmZjogQXJyYXlCdWZmZXIpOiBTV0Yge1xyXG4gICAgYnVmZi5zZWVrKDApOy8vIHN0YXJ0XHJcblxyXG4gICAgbGV0IHN3ZiA9IG5ldyBTV0YoKVxyXG4gICAgc3dmLmJ1ZmZlciA9IGJ1ZmY7XHJcbiAgICBzd2YubWFnaWMgPSBidWZmLnJlYWRTdHJpbmdGaXhlZCgzKTtcclxuICAgIHN3Zi52ZXJzaW9uID0gYnVmZi5yZWFkVUludDgoKTtcclxuICAgIHN3Zi5maWxlTGVuZ3RoID0ge1xyXG4gICAgICAgIGNvbXByZXNzZWQ6IGNvbXByZXNzZWRfYnVmZi5ieXRlTGVuZ3RoLFxyXG4gICAgICAgIHVuY29tcHJlc3NlZDogYnVmZi5yZWFkVUludExFKDMyKVxyXG4gICAgfTtcclxuICAgIHN3Zi5mcmFtZVNpemUgPSBidWZmLnJlYWRSZWN0KCk7XHJcbiAgICBzd2YuZnJhbWVSYXRlID0gYnVmZi5yZWFkVUludExFKDE2KSAvIDI1NjtcclxuICAgIHN3Zi5mcmFtZUNvdW50ID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgc3dmLnRhZ3MgPSByZWFkU1dGVGFncyhidWZmKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzd2Y7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgdGhlIFNXRiBUQUcgZGF0YSBzdHJ1Y3R1cmUsIGtlZXBpbmcgb25seSB0aGUgdGFnc1xyXG4gKiB3ZSBhcmUgaW50ZXJlc3RlZCBpbi5cclxuICogLSBBdWRpbyBUYWdzOiBBdWRpbyBTYW1wbGVzXHJcbiAqIC0gRG8gQWN0aW9uIFRhZzogQ29udGFpbmluZyB0aGUgYmVhdEJveCB2YXJpYWJsZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkU1dGVGFncyhidWZmOiBCeXRlUmVhZGVyKSB7XHJcbiAgICBsZXQgdGFnczogVGFnW10gPSBbXTtcclxuICAgIGxldCB0YWdIZWFkZXI6IFRhZ0hlYWRlcjtcclxuXHJcbiAgICBsZXQgbXAzU2VlayA9IDA7XHJcbiAgICBsZXQgbXAzU2FtcGxlcyA9IDA7XHJcbiAgICBsZXQgbXAzSWQgPSAwO1xyXG4gICAgbGV0IG1wM0Zvcm1hdCA9IDA7XHJcbiAgICBsZXQgbXAzU3RyZWFtID0gZmFsc2U7XHJcblxyXG4gICAgLyogUmVhZHMgVGFnQ29kZUFuZExlbmd0aCBmcm9tIFRhZydzIFJFQ09SREhFQURFUiAqL1xyXG4gICAgd2hpbGUgKCh0YWdIZWFkZXIgPSBidWZmLnJlYWRUYWdDb2RlQW5kTGVuZ3RoKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHRhZzogVGFnID0ge307XHJcbiAgICAgICAgdGFnLmhlYWRlciA9IHRhZ0hlYWRlcjtcclxuICAgICAgICB0YWcuZG9JbmNsdWRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGFnSGVhZGVyLmNvZGUpIHtcclxuICAgICAgICAgICAgLy8gU291bmQgVGFncyAtIE1QMyBFeHRyYWN0aW9uXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5TVFJFQU1CTE9DSzpcclxuICAgICAgICAgICAgICAgIGlmICghbXAzU3RyZWFtIHx8ICgodGFnSGVhZGVyLmxlbmd0aCAtIDQpID09IDApKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIG1wM1NhbXBsZXMgKz0gYnVmZi5yZWFkVUludExFKDE2KTsgLy8gZnJhbWUgc2FtcGxlc1xyXG4gICAgICAgICAgICAgICAgYnVmZi5yZWFkVUludExFKDE2KTsgLy8gc2VlayBzYW1wbGVzXHJcblxyXG4gICAgICAgICAgICAgICAgdGFnLmRhdGEgPSBidWZmLmJ1ZmZlcl9yYXcuc2xpY2UoYnVmZi5wb2ludGVyLCBidWZmLnBvaW50ZXIgKyAodGFnSGVhZGVyLmxlbmd0aCAtIDQpKTtcclxuICAgICAgICAgICAgICAgIHRhZy5hdWRpb19ieXRlcyA9ICh0YWdIZWFkZXIubGVuZ3RoIC0gNCk7XHJcbiAgICAgICAgICAgICAgICB0YWcuZG9JbmNsdWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBTV0ZUYWdzLlNUUkVBTUhFQUQ6XHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5TVFJFQU1IRUFEMjpcclxuICAgICAgICAgICAgICAgIGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgIG1wM0Zvcm1hdCA9IGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgIGJ1ZmYucmVhZFVJbnRMRSgxNik7IC8vIGF2ZXJhZ2UgZnJhbWUgc2FtcGxlc1xyXG4gICAgICAgICAgICAgICAgbXAzU2VlayA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICBpZiAoKChtcDNGb3JtYXQgPj4+IDQpICYgMHhmKSA9PSBTV0ZPdGhlclRhZ3MuQ09ERUNfTVAzKVxyXG4gICAgICAgICAgICAgICAgICAgIG1wM1N0cmVhbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgU1dGVGFncy5ERUZJTkVTT1VORDpcclxuICAgICAgICAgICAgICAgIGlmICghbXAzU3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gYnVmZi5yZWFkVUludExFKDE2KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybWF0ID0gYnVmZi5yZWFkVUludExFKDgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoKGZvcm1hdCA+Pj4gNCkgJiAweGYpID09IFNXRk90aGVyVGFncy5DT0RFQ19NUDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzSWQgPSBpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzRm9ybWF0ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcDNTYW1wbGVzID0gYnVmZi5yZWFkVUludExFKDMyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXAzU2VlayA9IGJ1ZmYucmVhZFVJbnRMRSgxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5kYXRhID0gYnVmZi5idWZmZXJfcmF3LnNsaWNlKGJ1ZmYucG9pbnRlciwgYnVmZi5wb2ludGVyICsgKHRhZ0hlYWRlci5sZW5ndGggLSA5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5hdWRpb19ieXRlcyA9ICh0YWdIZWFkZXIubGVuZ3RoIC0gOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5kb0luY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gRG9BY3Rpb24gLSBXaGVyZSB0aGUgQmVhdGJveCBMaXZlc1xyXG4gICAgICAgICAgICBjYXNlIFNXRlRhZ3MuRE9BQ1RJT04gOlxyXG4gICAgICAgICAgICAgICAgbGV0IF9maW5pc2hlZFJlYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uU3RhY2s6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uVmFyaWFibGVzOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25SZWdpc3RlcnM6IFthbnksIGFueSwgYW55LCBhbnldID0gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnN0YW50UG9vbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlICghX2ZpbmlzaGVkUmVhZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb24gPSBidWZmLnJlYWRBY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVhZCBBY3Rpb24gVGFnXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZmluaXNoZWRSZWFkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLkNPTlNUQU5UUE9PTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50UG9vbCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnN0YW50Q291bnQgPSBidWZmLnJlYWRVSW50TEUoMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25zdGFudENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudFBvb2wucHVzaChidWZmLnJlYWRTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5QVVNIOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGJ1ZmYucG9pbnRlciA8IGFjdGlvbi5wb3NpdGlvbiArIGFjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHVzaFZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwdXNoVHlwZSA9IGJ1ZmYucmVhZFVJbnRMRSg4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHB1c2hUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuU1RSSU5HX0xJVEVSQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5GTE9BVF9MSVRFUkFMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gYnVmZi5yZWFkRmxvYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5OVUxMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5VTkRFRklORUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGVHlwZVRhZ3MuUkVHSVNURVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBhY3Rpb25SZWdpc3RlcnNbYnVmZi5yZWFkVUludExFKDgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZUeXBlVGFncy5CT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFZhbHVlID0gQm9vbGVhbihidWZmLnJlYWRVSW50TEUoOCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkRPVUJMRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGJ1ZmYucmVhZERvdWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLklOVEVHRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBidWZmLnJlYWRVSW50TEUoMzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkNPTlNUQU5UODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hWYWx1ZSA9IGNvbnN0YW50UG9vbFtidWZmLnJlYWRVSW50TEUoOCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRlR5cGVUYWdzLkNPTlNUQU5UMTY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVmFsdWUgPSBjb25zdGFudFBvb2xbYnVmZi5yZWFkVUludExFKDE2KV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZPVU5EIFVOU1VQUE9SVEVEIFBVU0hEQVRBIFRZUEU6IFwiICsgcHVzaFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2gocHVzaFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTV0ZBY3Rpb25UYWdzLlBPUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNXRkFjdGlvblRhZ3MuRFVQTElDQVRFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhY3Rpb25TdGFja1thY3Rpb25TdGFjay5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TVE9SRV9SRUdJU1RFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblJlZ2lzdGVyc1tidWZmLnJlYWRVSW50TEUoOCldID0gYWN0aW9uU3RhY2tbYWN0aW9uU3RhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5HRVRfVkFSSUFCTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3ZOYW1lID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShndk5hbWUgaW4gYWN0aW9uVmFyaWFibGVzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25WYXJpYWJsZXNbZ3ZOYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhY3Rpb25WYXJpYWJsZXNbZ3ZOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TRVRfVkFSSUFCTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ZWYWx1ZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uVmFyaWFibGVzW2FjdGlvblN0YWNrLnBvcCgpXSA9IHN2VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5JTklUX0FSUkFZOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5U2l6ZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5U2l6ZTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goYWN0aW9uU3RhY2sucG9wKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uU3RhY2sucHVzaChhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5HRVRfTUVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdtTmFtZSA9IGFjdGlvblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdtT2JqZWN0ID0gYWN0aW9uU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShnbU5hbWUgaW4gZ21PYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtT2JqZWN0W2dtTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnB1c2goZ21PYmplY3RbZ21OYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU1dGQWN0aW9uVGFncy5TRVRfTUVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNtVmFsdWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbU5hbWUgPSBhY3Rpb25TdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblN0YWNrLnBvcCgpW3NtTmFtZV0gPSBzbVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHRhZyBpc24ndCBzdXBwb3J0ZWQsIGJ1dCBpdCBzZWVtcyB0byBiZSBpbiBldmVyeSBmaWxlLCBzbyBJJ20gaWdub3JpbmcgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9VTkQgVU5TVVBQT1JURUQgQUNUSU9OIFRBRzogXCIgKyBhY3Rpb24uYWN0aW9uLnRvU3RyaW5nKDE2KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uVmFyaWFibGVzW1wiX3Jvb3RcIl0gIT0gdW5kZWZpbmVkICYmIGFjdGlvblZhcmlhYmxlc1tcIl9yb290XCJdW1wiYmVhdEJveFwiXSlcclxuICAgICAgICAgICAgICAgICAgICB0YWcuZG9JbmNsdWRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWcucG9vbCA9IGNvbnN0YW50UG9vbDtcclxuICAgICAgICAgICAgICAgIHRhZy52YXJpYWJsZXMgPSBhY3Rpb25WYXJpYWJsZXM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL3RhZy5kYXRhID0gYnVmZi5idWZmZXJfcmF3LnNsaWNlKGJ1ZmYucG9pbnRlciwgYnVmZi5wb2ludGVyICsgdGFnSGVhZGVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YWcuZG9JbmNsdWRlKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0YWcuZG9JbmNsdWRlO1xyXG4gICAgICAgICAgICB0YWdzLnB1c2godGFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1ZmYuc2Vlayh0YWdIZWFkZXIucG9zaXRpb24gKyB0YWdIZWFkZXIubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YWdzO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDb2xsZWN0aW9uIG9mIFNXRiB0YWdzIGFuZCB0YWcgdHlwZXMgdG8gYXNzaXN0IHdpdGggcmVhZGluZyBhbmQgcGFyc2luZyBhIC5zd2YgZmlsZS5cclxuICpcclxuICogRmlsZSBjb250ZW50cyBvcmlnaW5hbGx5IGZyb206XHJcbiAqIEBhdXRob3I6IFZlbG9jaXR5XHJcbiAqIEBnaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGFzaGZsYXNocmV2b2x1dGlvbi93ZWItYmVhdGJveC1lZGl0b3JcclxuICovXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU1dGVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVORDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgU0hPV0ZSQU1FOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyBET0FDVElPTjogbnVtYmVyID0gMTI7XHJcbiAgICBwdWJsaWMgc3RhdGljIERFRklORVNPVU5EOiBudW1iZXIgPSAxNDtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RSRUFNSEVBRDogbnVtYmVyID0gMTg7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUkVBTUJMT0NLOiBudW1iZXIgPSAxOTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RSRUFNSEVBRDI6IG51bWJlciA9IDQ1O1xyXG4gICAgcHVibGljIHN0YXRpYyBGSUxFQVRUUklCVVRFUzogbnVtYmVyID0gNjk7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZBY3Rpb25UYWdzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgRU5EOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBDT05TVEFOVFBPT0w6IG51bWJlciA9IDB4ODg7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBVU0g6IG51bWJlciA9IDB4OTY7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBPUDogbnVtYmVyID0gMHgxNztcclxuICAgIHB1YmxpYyBzdGF0aWMgRFVQTElDQVRFOiBudW1iZXIgPSAweDRDO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVE9SRV9SRUdJU1RFUjogbnVtYmVyID0gMHg4NztcclxuICAgIHB1YmxpYyBzdGF0aWMgR0VUX1ZBUklBQkxFOiBudW1iZXIgPSAweDFDO1xyXG4gICAgcHVibGljIHN0YXRpYyBTRVRfVkFSSUFCTEU6IG51bWJlciA9IDB4MUQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIElOSVRfQVJSQVk6IG51bWJlciA9IDB4NDI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdFVF9NRU1CRVI6IG51bWJlciA9IDB4NEU7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNFVF9NRU1CRVI6IG51bWJlciA9IDB4NEY7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTV0ZUeXBlVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUUklOR19MSVRFUkFMOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBGTE9BVF9MSVRFUkFMOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyBOVUxMOiBudW1iZXIgPSAyO1xyXG4gICAgcHVibGljIHN0YXRpYyBVTkRFRklORUQ6IG51bWJlciA9IDM7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJFR0lTVEVSOiBudW1iZXIgPSA0O1xyXG4gICAgcHVibGljIHN0YXRpYyBCT09MRUFOOiBudW1iZXIgPSA1O1xyXG4gICAgcHVibGljIHN0YXRpYyBET1VCTEU6IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIElOVEVHRVI6IG51bWJlciA9IDc7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPTlNUQU5UODogbnVtYmVyID0gODtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RBTlQxNjogbnVtYmVyID0gOTtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNXRk90aGVyVGFncyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPREVDX01QMzogbnVtYmVyID0gMjtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFydGljbGUge1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvcjtcclxuICAgIHByaXZhdGUgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGNyZWF0aW9uVGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbG9yOiBwNS5Db2xvcjtcclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnRpY2xlU2l6ZTogbnVtYmVyID0gMjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvciwgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3IsIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3IsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24gPSBpbml0aWFsUG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5pbml0aWFsVmVsb2NpdHkgPSBpbml0aWFsVmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbiA9IGNvbnN0YW50QWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIHRoaXMuY3JlYXRpb25UaW1lSW5TZWNvbmRzID0gY3JlYXRpb25UaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBlbGFwc2VkVGltZSA9IHRoaXMuZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50UG9zaXRpb246IHA1LlZlY3RvciA9IHRoaXMuZ2V0UG9zaXRpb24ocCwgZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAubm9TdHJva2UoKTtcclxuICAgICAgICBwLmZpbGwoY29sb3IpO1xyXG4gICAgICAgIHAuY2lyY2xlKGN1cnJlbnRQb3NpdGlvbi54LCBjdXJyZW50UG9zaXRpb24ueSwgUGFydGljbGUucGFydGljbGVTaXplKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb24ocDogcDUsIGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdmVsb2NpdHlDb21wb25lbnQ6IHA1LlZlY3RvciA9IHA1LlZlY3Rvci5tdWx0KHRoaXMuaW5pdGlhbFZlbG9jaXR5LCBlbGFwc2VkVGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGFjY2VsZXJhdGlvbkNvbXBvbmVudDogcDUuVmVjdG9yID0gcDUuVmVjdG9yLm11bHQodGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbixcclxuICAgICAgICAgICAgZWxhcHNlZFRpbWVJblNlY29uZHMgKiBlbGFwc2VkVGltZUluU2Vjb25kcyAvIDIpO1xyXG4gICAgICAgIHJldHVybiBwNS5WZWN0b3IuYWRkKHA1LlZlY3Rvci5hZGQodGhpcy5pbml0aWFsUG9zaXRpb24sIHZlbG9jaXR5Q29tcG9uZW50KSwgYWNjZWxlcmF0aW9uQ29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VGltZUluU2Vjb25kcyAtIHRoaXMuY3JlYXRpb25UaW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtQYXJ0aWNsZX0gZnJvbSBcIi4vcGFydGljbGVcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlU3lzdGVtIHtcclxuICAgIHByaXZhdGUgcGFydGljbGVzOiBQYXJ0aWNsZVtdO1xyXG4gICAgcHJpdmF0ZSBwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIHN0YXRpYyB2ZWxvY2l0eUFuZ2xlVmFyaWF0aW9uSW5EZWdyZWVzOiBudW1iZXIgPSAzMDtcclxuICAgIHByaXZhdGUgc3RhdGljIHZlbG9jaXR5TWFnbml0dWRlVmFyaWF0aW9uSW5QZXJjZW50OiBudW1iZXIgPSAzMDtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvbG9yVmFyaWF0aW9uOiBudW1iZXIgPSAzMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbnN0YW50QWNjZWxlcmF0aW9uOiBwNS5WZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMgPSBwYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24gPSBjb25zdGFudEFjY2VsZXJhdGlvbjtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5vbGRlc3RQYXJ0aWNsZUFnZShjdXJyZW50VGltZUluU2Vjb25kcykgPiB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVPbGRlc3RQYXJ0aWNsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZTogUGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpXTtcclxuICAgICAgICAgICAgbGV0IGFscGhhQWRqdXN0ZWRDb2xvcjogcDUuQ29sb3IgPSB0aGlzLmdldEFscGhhQWRqdXN0ZWRDb2xvcihwYXJ0aWNsZSwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgICAgICBwYXJ0aWNsZS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBhbHBoYUFkanVzdGVkQ29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9sZGVzdFBhcnRpY2xlQWdlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJ0aWNsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJ0aWNsZXNbMF0uZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVPbGRlc3RQYXJ0aWNsZSgpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zaGlmdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QWxwaGFBZGp1c3RlZENvbG9yKHBhcnRpY2xlOiBQYXJ0aWNsZSwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBiYXNlQ29sb3IgPSBwYXJ0aWNsZS5jb2xvcjtcclxuICAgICAgICBsZXQgcGFydGljbGVBZ2UgPSBwYXJ0aWNsZS5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGxpZmVSZW1haW5pbmdQZXJjZW50ID0gKHRoaXMucGFydGljbGVMaWZldGltZUluU2Vjb25kcyAtIHBhcnRpY2xlQWdlKSAvIHRoaXMucGFydGljbGVMaWZldGltZUluU2Vjb25kcztcclxuICAgICAgICBsZXQgYWxwaGEgPSB0aGlzLmludGVycG9sYXRlKDAsIDI1NSwgbGlmZVJlbWFpbmluZ1BlcmNlbnQpO1xyXG4gICAgICAgIGxldCBuZXdDb2xvcjogcDUuQ29sb3IgPSBwLmNvbG9yKGJhc2VDb2xvcik7XHJcbiAgICAgICAgbmV3Q29sb3Iuc2V0QWxwaGEoYWxwaGEpO1xyXG4gICAgICAgIHJldHVybiBuZXdDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVycG9sYXRlKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocmF0aW8gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyYXRpbyA+IDAgJiYgcmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW5WYWx1ZSArIChtYXhWYWx1ZSAtIG1pblZhbHVlKSAqIHJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFJhbmRvbWl6ZWRQYXJ0aWNsZXMoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVBhcnRpY2xlczogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVBhcnRpY2xlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdJbml0YWxWZWxvY2l0eSA9IHRoaXMucmFuZG9taXplVmVjdG9yKHAsIGluaXRpYWxWZWxvY2l0eSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdDb2xvciA9IHRoaXMucmFuZG9taXplQ29sb3IocCwgY29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFBhcnRpY2xlKGluaXRpYWxQb3NpdGlvbiwgbmV3SW5pdGFsVmVsb2NpdHksIGNyZWF0aW9uVGltZUluU2Vjb25kcywgbmV3Q29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZVZlY3RvcihwOiBwNSwgYmFzZVZlY3RvcjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvblJhbmRvbWl6ZWQ6IHA1LlZlY3RvciA9IHRoaXMucmFuZG9taXplVmVjdG9yRGlyZWN0aW9uKHAsIGJhc2VWZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbWl6ZVZlY3Rvck1hZ25pdHVkZShwLCBkaXJlY3Rpb25SYW5kb21pemVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZVZlY3RvckRpcmVjdGlvbihwOiBwNSwgYmFzZVZlY3RvcjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICBsZXQgYW5nbGVJbkRlZ3JlZXMgPSBiYXNlVmVjdG9yLmhlYWRpbmcoKTtcclxuICAgICAgICBsZXQgYW5nbGVDaGFuZ2VJbkRlZ3JlZXMgPSBwLnJhbmRvbSgtUGFydGljbGVTeXN0ZW0udmVsb2NpdHlBbmdsZVZhcmlhdGlvbkluRGVncmVlcyAvIDIsXHJcbiAgICAgICAgICAgIFBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5QW5nbGVWYXJpYXRpb25JbkRlZ3JlZXMgLyAyKTtcclxuICAgICAgICBsZXQgZmluYWxBbmdsZUluUmFkaWFucyA9IHAucmFkaWFucyhhbmdsZUluRGVncmVlcyArIGFuZ2xlQ2hhbmdlSW5EZWdyZWVzKTtcclxuICAgICAgICBsZXQgbWFnbml0dWRlID0gYmFzZVZlY3Rvci5tYWcoKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgICAgIHJldHVybiBwNS5WZWN0b3IuZnJvbUFuZ2xlKGZpbmFsQW5nbGVJblJhZGlhbnMsIG1hZ25pdHVkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3JNYWduaXR1ZGUocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIGxldCBtYWduaXR1ZGVDaGFuZ2VJblBlcmNlbnQgPSBwLnJhbmRvbSgtUGFydGljbGVTeXN0ZW0udmVsb2NpdHlNYWduaXR1ZGVWYXJpYXRpb25JblBlcmNlbnQgLyAyLFxyXG4gICAgICAgICAgICBQYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eU1hZ25pdHVkZVZhcmlhdGlvbkluUGVyY2VudCAvIDIpO1xyXG4gICAgICAgIGxldCBmaW5hbE1hZ25pdHVkZSA9IGJhc2VWZWN0b3IubWFnKCkgKiAoMTAwICsgbWFnbml0dWRlQ2hhbmdlSW5QZXJjZW50KSAvIDEwMDtcclxuICAgICAgICByZXR1cm4gYmFzZVZlY3Rvci5zZXRNYWcoZmluYWxNYWduaXR1ZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9taXplQ29sb3IocDogcDUsIGJhc2VDb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgbmV3UmVkID0gdGhpcy5ib3VuZGVkUmFuZG9taXplKHAsIHAucmVkKGJhc2VDb2xvciksIFBhcnRpY2xlU3lzdGVtLmNvbG9yVmFyaWF0aW9uLCAwLCAyNTUpO1xyXG4gICAgICAgIGxldCBuZXdHcmVlbiA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLmdyZWVuKGJhc2VDb2xvciksIFBhcnRpY2xlU3lzdGVtLmNvbG9yVmFyaWF0aW9uLCAwLCAyNTUpO1xyXG4gICAgICAgIGxldCBuZXdCbHVlID0gdGhpcy5ib3VuZGVkUmFuZG9taXplKHAsIHAuYmx1ZShiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICByZXR1cm4gcC5jb2xvcihuZXdSZWQsIG5ld0dyZWVuLCBuZXdCbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJvdW5kZWRSYW5kb21pemUocDogcDUsIHZhbHVlOiBudW1iZXIsIHZhcmlhdGlvbjogbnVtYmVyLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlICsgcC5yYW5kb20oLXZhcmlhdGlvbiAvIDIsIHZhcmlhdGlvbiAvIDIpO1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA8PSBsb3dlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb3dlckJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJCb3VuZCA8IG5ld1ZhbHVlICYmIG5ld1ZhbHVlIDwgdXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQYXJ0aWNsZShpbml0aWFsUG9zaXRpb246IHA1LlZlY3RvciwgaW5pdGlhbFZlbG9jaXR5OiBwNS5WZWN0b3IsIGNyZWF0aW9uVGltZUluU2Vjb25kczogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBQYXJ0aWNsZShpbml0aWFsUG9zaXRpb24sIGluaXRpYWxWZWxvY2l0eSwgdGhpcy5jb25zdGFudEFjY2VsZXJhdGlvbiwgY3JlYXRpb25UaW1lSW5TZWNvbmRzLCBjb2xvcikpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFBsYXllcktleUFjdGlvbiB7XHJcbiAgICBnYW1lVGltZTogbnVtYmVyO1xyXG4gICAgdHJhY2s6IG51bWJlcjtcclxuICAgIGtleVN0YXRlOiBLZXlTdGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lVGltZTogbnVtYmVyLCB0cmFjazogbnVtYmVyLCBrZXlTdGF0ZTogS2V5U3RhdGUpIHtcclxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gZ2FtZVRpbWU7XHJcbiAgICAgICAgdGhpcy50cmFjayA9IHRyYWNrO1xyXG4gICAgICAgIHRoaXMua2V5U3RhdGUgPSBrZXlTdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gS2V5U3RhdGUge1xyXG4gICAgVVAsIERPV04sXHJcbn0iLCJpbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7RGlzcGxheUNvbmZpZywgRGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtUaW1lTWFuYWdlcn0gZnJvbSBcIi4vdGltZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7TWlzc01hbmFnZXJ9IGZyb20gXCIuL21pc3NfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbE1hbmFnZXJ9IGZyb20gXCIuL3Njcm9sbF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UmVzdWx0c0Rpc3BsYXl9IGZyb20gXCIuL3Jlc3VsdHNfZGlzcGxheVwiO1xyXG5pbXBvcnQge05vdGV9IGZyb20gXCIuL3BhcnNpbmcvcGFyc2Vfc21cIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyxcclxuICAgIGlzS2V5QmluZGluZ3NEZWZpbmVkLFxyXG4gICAgcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzLFxyXG4gICAgc2V0QWxsTm90ZXNUb0RlZmF1bHRTdGF0ZVxyXG59IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5U3RhdGUsIFBsYXllcktleUFjdGlvbn0gZnJvbSBcIi4vcGxheWVyX2tleV9hY3Rpb25cIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RXZlbnQsIEFjY3VyYWN5UmVjb3JkaW5nLCBBY2N1cmFjeVJlY29yZGluZ1N0YXRlfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrVGV4dH0gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfdGV4dFwiO1xyXG5pbXBvcnQge1JlY2VwdG9yU2hyaW5rUmVhY3Rpb259IGZyb20gXCIuL3JlY2VwdG9yX3Nocmlua19yZWFjdGlvblwiO1xyXG5pbXBvcnQge0FjY3VyYWN5RmVlZGJhY2tGbGFzaH0gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfZmxhc2hcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzfSBmcm9tIFwiLi9hY2N1cmFjeV9mZWVkYmFja19wYXJ0aWNsZXNcIjtcclxuaW1wb3J0IHtIb2xkUGFydGljbGVzfSBmcm9tIFwiLi9ob2xkX3BhcnRpY2xlc1wiO1xyXG5pbXBvcnQge0hvbGRHbG93fSBmcm9tIFwiLi9ob2xkX2dsb3dcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5aW5nRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIHNjZW5lOiBQNVNjZW5lO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHRpbWVNYW5hZ2VyOiBHYW1lVGltZVByb3ZpZGVyO1xyXG4gICAgcHJpdmF0ZSBtaXNzTWFuYWdlcjogTWlzc01hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBnYW1lRW5kVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzaG93UmVzdWx0c1NjcmVlbjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBpc0RlYnVnTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeUZlZWRiYWNrVGV4dDogQWNjdXJhY3lGZWVkYmFja1RleHQ7XHJcbiAgICBwcml2YXRlIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuICAgIHByaXZhdGUgcmVjZXB0b3JTaHJpbmtSZWFjdGlvbjogUmVjZXB0b3JTaHJpbmtSZWFjdGlvbjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lGZWVkYmFja0ZsYXNoOiBBY2N1cmFjeUZlZWRiYWNrRmxhc2g7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXM6IEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXM7XHJcbiAgICBwcml2YXRlIGhvbGRQYXJ0aWNsZXM6IEhvbGRQYXJ0aWNsZXM7XHJcbiAgICBwcml2YXRlIGhvbGRHbG93OiBIb2xkR2xvdztcclxuICAgIHByaXZhdGUgYXVkaW9GaWxlOiBBdWRpb0ZpbGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSwgYXVkaW9GaWxlOiBBdWRpb0ZpbGUsIGNvbmZpZzogQ29uZmlnLCBzY2VuZTogUDVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdHNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1ZGlvRmlsZSA9IGF1ZGlvRmlsZTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRpbWUgbWFuYWdlciBhbmQgcGxheSB0aGUgYXVkaW8gYXMgY2xvc2UgdG9nZXRoZXIgYXMgcG9zc2libGUgdG8gc3luY2hyb25pemUgdGhlIGF1ZGlvIHdpdGggdGhlIGdhbWVcclxuICAgICAgICBpZiAoIXRoaXMuaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBUaW1lTWFuYWdlcihwZXJmb3JtYW5jZS5ub3coKSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvRmlsZS5wbGF5KGNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5ldyBOb3RlTWFuYWdlcih0cmFja3MpO1xyXG4gICAgICAgIGxldCBudW1UcmFja3M6IG51bWJlciA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gbmV3IEFjY3VyYWN5UmVjb3JkaW5nKG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IDI0MDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gNDgwO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WCA9ICh0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLndpZHRoIC0gd2lkdGgpIC8gMjtcclxuICAgICAgICBsZXQgdG9wTGVmdFkgPSAodGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZS5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSBuZXcgUGxheWluZ0NvbmZpZyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuZGlzcGxheUNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSxcclxuICAgICAgICAgICAgdG9wTGVmdFgsIHRvcExlZnRZLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzID0gbmV3IEhvbGRQYXJ0aWNsZXModGhpcy5jb25maWcsIG51bVRyYWNrcywgdGhpcy5kaXNwbGF5TWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5ob2xkR2xvdyA9IG5ldyBIb2xkR2xvdyh0aGlzLmNvbmZpZywgbnVtVHJhY2tzLCB0aGlzLmRpc3BsYXlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gbmV3IEhvbGRNYW5hZ2VyKG51bVRyYWNrcywgdGhpcy5vblRyYWNrSG9sZC5iaW5kKHRoaXMpLCB0aGlzLm9uVHJhY2tVbmhvbGQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZU1hbmFnZXIgPSBuZXcgU2Nyb2xsTWFuYWdlcih0aGlzLmNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdhbWVFbmRUaW1lID0gdGhpcy5jYWxjdWxhdGVHYW1lRW5kKHRoaXMuYXVkaW9GaWxlLmdldER1cmF0aW9uKCksIHRoaXMuZ2V0Tm90ZXNFbmRUaW1lKCkpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyID0gbmV3IEFjY3VyYWN5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmNvbmZpZywgdGhpcy5ob2xkTWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIgPSBuZXcgTWlzc01hbmFnZXIodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuaG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrVGV4dCA9IG5ldyBBY2N1cmFjeUZlZWRiYWNrVGV4dCh0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0b3BMZWZ0WCArIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgdG9wTGVmdFkgKyBoZWlnaHQgLyAyLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2ggPSBuZXcgQWNjdXJhY3lGZWVkYmFja0ZsYXNoKHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlNYW5hZ2VyLFxyXG4gICAgICAgICAgICBudW1UcmFja3MpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbiA9IG5ldyBSZWNlcHRvclNocmlua1JlYWN0aW9uKHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlDb25maWcsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzID0gbmV3IEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXModGhpcy5jb25maWcsIHRoaXMuZGlzcGxheU1hbmFnZXIsIG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGlmICghaXNLZXlCaW5kaW5nc0RlZmluZWQobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplS2V5QmluZGluZ3MobnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iaW5kS2V5QmluZGluZ3NUb0FjdGlvbnMoKTtcclxuICAgICAgICBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzKTtcclxuICAgICAgICByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXModGhpcy5ub3RlTWFuYWdlci50cmFja3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUcmFjayAjXCIgKyAoYWNjdXJhY3lFdmVudC50cmFja051bWJlciArIDEpICsgXCIgXCIgKyBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TmFtZSArXHJcbiAgICAgICAgLy8gICAgIChNYXRoLmFicyhhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzKSA9PSBJbmZpbml0eSA/XHJcbiAgICAgICAgLy8gICAgICAgICBcIlwiIDpcclxuICAgICAgICAvLyAgICAgICAgIFwiIChcIiArIE1hdGgucm91bmQoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcykgKyBcIiBtcylcIikpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuYWRkUGFydGljbGVzRm9yQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVJblNlY29uZHMgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJblNlY29uZHMgPj0gdGhpcy5nYW1lRW5kVGltZSAmJiAhdGhpcy5zaG93UmVzdWx0c1NjcmVlbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnN0YXRlID0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZS5SRUFEWTtcclxuICAgICAgICAgICAgdGhpcy5lbmRTb25nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIudXBkYXRlKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5kcmF3KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tUZXh0LmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2guZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3Rlc0VuZFRpbWUoKSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0QWNjdXJhY3k6IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlYXJsaWVzdEFjY3VyYWN5ID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWFybGllc3RBY2N1cmFjeSA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlTWFuYWdlci5nZXRMYXRlc3ROb3RlKCkudGltZUluU2Vjb25kcyArIGVhcmxpZXN0QWNjdXJhY3kgLyAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlR2FtZUVuZChhdWRpb0R1cmF0aW9uOiBudW1iZXIsIG5vdGVzRW5kVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGF1ZGlvRHVyYXRpb24gPCBub3Rlc0VuZFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vdGVzRW5kVGltZSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihub3Rlc0VuZFRpbWUgKyA1LCBhdWRpb0R1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuZFNvbmcoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb0ZpbGUuc3RvcCgpO1xyXG4gICAgICAgIGdsb2JhbC5yZXN1bHRzRGlzcGxheSA9IG5ldyBSZXN1bHRzRGlzcGxheSh0aGlzLmNvbmZpZywgdGhpcy5ub3RlTWFuYWdlciwgdGhpcy5hY2N1cmFjeU1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRQYWdlKFBBR0VTLlJFU1VMVFMpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kS2V5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmluZEtleUJpbmRpbmdzVG9BY3Rpb25zKCkge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5ncyA9IGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgbGV0IGlzU3BhY2ViYXJCb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBzcGFjZWJhcktleUNvZGU6IG51bWJlciA9IDMyO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5QmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleUJpbmRpbmc6IEtleUJpbmRpbmcgPSBrZXlCaW5kaW5nc1tpXTtcclxuICAgICAgICAgICAgaWYgKGtleUJpbmRpbmcua2V5Q29kZSA9PT0gc3BhY2ViYXJLZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpc1NwYWNlYmFyQm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oa2V5QmluZGluZy5rZXlDb2RlLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5RG93bkFjdGlvbkZvclRyYWNrKGtleUJpbmRpbmcudHJhY2tOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5VXBBY3Rpb25Gb3JUcmFjayhrZXlCaW5kaW5nLnRyYWNrTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oZ2xvYmFsLmNvbmZpZy5xdWl0S2V5LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kU29uZygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWlzU3BhY2ViYXJCb3VuZCkge1xyXG4gICAgICAgICAgICAvLyBiaW5kIGtleSB0byBub3RoaW5nIHRvIG1ha2Ugc3VyZSB0aGUgZGVmYXVsdCBiZWhhdmlvciBpcyBwcmV2ZW50ZWRcclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbihzcGFjZWJhcktleUNvZGUsICgpID0+IHt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBrZXlEb3duQWN0aW9uRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5ob2xkVHJhY2sodHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJLZXlBY3Rpb246IFBsYXllcktleUFjdGlvbiA9XHJcbiAgICAgICAgICAgIG5ldyBQbGF5ZXJLZXlBY3Rpb24odGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZShwZXJmb3JtYW5jZS5ub3coKSksIHRyYWNrTnVtYmVyLCBLZXlTdGF0ZS5ET1dOKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlci5oYW5kbGVQbGF5ZXJBY3Rpb24ocGxheWVyS2V5QWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGtleVVwQWN0aW9uRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5yZWxlYXNlVHJhY2sodHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJLZXlBY3Rpb246IFBsYXllcktleUFjdGlvbiA9XHJcbiAgICAgICAgICAgIG5ldyBQbGF5ZXJLZXlBY3Rpb24odGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZShwZXJmb3JtYW5jZS5ub3coKSksIHRyYWNrTnVtYmVyLCBLZXlTdGF0ZS5VUCk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIuaGFuZGxlUGxheWVyQWN0aW9uKHBsYXllcktleUFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNrSG9sZCh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZEdsb3cuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkR2xvdywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzLmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZFBhcnRpY2xlcywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyYWNrVW5ob2xkKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy51bmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZEdsb3csIHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy51bmhvbGRUcmFjay5jYWxsKHRoaXMuaG9sZFBhcnRpY2xlcywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmJpbmRLZXlzKCkge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5ncyA9IGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlCaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZzogS2V5QmluZGluZyA9IGtleUJpbmRpbmdzW2ldO1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KGtleUJpbmRpbmcua2V5Q29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQbGF5aW5nQ29uZmlnIGltcGxlbWVudHMgRGlzcGxheUNvbmZpZyB7XHJcbiAgICBwdWJsaWMgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWNlcHRvcllQZXJjZW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBwdWJsaWMgcmVjZXB0b3JTaXplczogbnVtYmVyW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvcllQZXJjZW50ID0gY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBjb25maWcuc2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaXplcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzLnB1c2goY29uZmlnLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90ZVNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQaXhlbHNQZXJTZWNvbmQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVjZXB0b3JTaXplcygpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZXB0b3JTaXplcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWNlcHRvcllQZXJjZW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZXB0b3JZUGVyY2VudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY3JvbGxEaXJlY3Rpb24oKTogU2Nyb2xsRGlyZWN0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxEaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UmVjZXB0b3JTaXplKHRyYWNrTnVtYmVyOiBudW1iZXIsIHJlY2VwdG9yU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzW3RyYWNrTnVtYmVyXSA9IHJlY2VwdG9yU2l6ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7RGlzcGxheUNvbmZpZywgRGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge1Njcm9sbE1hbmFnZXJ9IGZyb20gXCIuL3Njcm9sbF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJldmlld0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogUDVTY2VuZTtcclxuICAgIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxNYW5hZ2VyOiBTY3JvbGxNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHRvcExlZnRYID0gNjU7XHJcbiAgICBwcml2YXRlIHRvcExlZnRZID0gNTU7XHJcbiAgICBwcml2YXRlIHdpZHRoID0gMjAwO1xyXG4gICAgcHJpdmF0ZSBoZWlnaHQgPSA0MDA7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSwgY29uZmlnOiBDb25maWcsIHNjZW5lOiBQNVNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBuZXcgTm90ZU1hbmFnZXIodHJhY2tzKTtcclxuICAgICAgICB0aGlzLnNjcm9sbE1hbmFnZXIgPSBuZXcgU2Nyb2xsTWFuYWdlcih0aGlzLmNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSwgdGhpcy5nZXRCb3VuZHMoKSk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnID0gdGhpcy5nZXREaXNwbGF5Q29uZmlnKHRoaXMuY29uZmlnLCB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBuZXcgRGlzcGxheU1hbmFnZXIodGhpcy5ub3RlTWFuYWdlciwgdGhpcy5kaXNwbGF5Q29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLFxyXG4gICAgICAgICAgICB0aGlzLnRvcExlZnRYLCB0aGlzLnRvcExlZnRZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcodGhpcy5zY3JvbGxNYW5hZ2VyLmdldEdhbWVUaW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Qm91bmRzKCkge1xyXG4gICAgICAgIHJldHVybiB7dG9wTGVmdFg6IHRoaXMudG9wTGVmdFgsIHRvcExlZnRZOiB0aGlzLnRvcExlZnRZLCB3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5Q29uZmlnKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlcik6IERpc3BsYXlDb25maWcge1xyXG4gICAgICAgIGxldCByZWNlcHRvclNpemVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgcmVjZXB0b3JTaXplcy5wdXNoKGNvbmZpZy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXROb3RlU2l6ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UGl4ZWxzUGVyU2Vjb25kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnBpeGVsc1BlclNlY29uZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UmVjZXB0b3JZUGVyY2VudDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5yZWNlcHRvcllQZXJjZW50O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRTY3JvbGxEaXJlY3Rpb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcuc2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZWNlcHRvclNpemVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZXB0b3JTaXplcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0UmVjZXB0b3JTaXplOiAodHJhY2tOdW1iZXI6IG51bWJlciwgcmVjZXB0b3JTaXplOiBudW1iZXIpID0+IHt9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7RGlzcGxheUNvbmZpZ30gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjZXB0b3JTaHJpbmtSZWFjdGlvbiB7XHJcbiAgICBwcml2YXRlIHRyYWNrSG9sZFN0YXRlczogYm9vbGVhbltdO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgZGlzcGxheUNvbmZpZzogRGlzcGxheUNvbmZpZztcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWcsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnID0gZGlzcGxheUNvbmZpZztcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXMucHVzaChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzW3RyYWNrTnVtYmVyXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbGVhc2VUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXNbdHJhY2tOdW1iZXJdID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IG51bVJlY2VwdG9ycyA9IHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvclNpemVzKCkubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzaHJpbmsgPSAwLjc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1SZWNlcHRvcnM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2l6ZVJhdGlvID0gdGhpcy5pc1RyYWNrSGVsZChpKSA/IHNocmluayA6IDEuMDtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnLnNldFJlY2VwdG9yU2l6ZShpLCB0aGlzLmNvbmZpZy5ub3RlU2l6ZSAqIHNpemVSYXRpbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNUcmFja0hlbGQodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrSG9sZFN0YXRlc1t0cmFja051bWJlcl07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtkcmF3QWNjdXJhY3lCYXJzfSBmcm9tIFwiLi9kcmF3aW5nX3V0aWxcIjtcclxuaW1wb3J0IHtBY2N1cmFjeSwgQWNjdXJhY3lNYW5hZ2VyfSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3VsdHNEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgcDogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIsIHA6IHA1LFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyID0gYWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMucCA9IHA7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3QWNjdXJhY3lSZXN1bHRzKHRoaXMucCwgdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncywgdGhpcy5hY2N1cmFjeVJlY29yZGluZywgdGhpcy5ub3RlTWFuYWdlciwgdGhpcy5hY2N1cmFjeU1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FjY3VyYWN5UmVzdWx0cyhwOiBwNSwgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gcC53aWR0aCAvIDI7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSBwLmhlaWdodCAvIDI7XHJcbiAgICAgICAgbGV0IGJhcldpZHRoID0gcC53aWR0aCAqIDAuNjtcclxuICAgICAgICBsZXQgYmFySGVpZ2h0ID0gYmFyV2lkdGggLyAxMDtcclxuICAgICAgICBsZXQgbGVmdExhYmVsSGVpZ2h0ID0gMC44ICogYmFySGVpZ2h0O1xyXG4gICAgICAgIGxldCBhY2N1cmFjeUxpc3RGb3JSZXN1bHRzID0gdGhpcy5nZXRSZXN1bHRzQWNjdXJhY3lMaXN0KGFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIGRyYXdBY2N1cmFjeUJhcnMocCwgYWNjdXJhY3lMaXN0Rm9yUmVzdWx0cywgYWNjdXJhY3lSZWNvcmRpbmcsIGNlbnRlclgsIGNlbnRlclksIGxlZnRMYWJlbEhlaWdodCwgYmFyV2lkdGgsXHJcbiAgICAgICAgICAgIGJhckhlaWdodCwgbm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyLmlzQ29uZmlndXJlZEZvckJvb3MoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJuIGEgbGlzdCBvZiB1bmlxdWUgYWNjdXJhY2llcyBzb3J0ZWQgYnkgdGhlIG9mZnNldCwgd2l0aCB0aGUgYmVzdCBhY2N1cmFjeSBiZWluZyBmaXJzdFxyXG4gICAgcHJpdmF0ZSBnZXRSZXN1bHRzQWNjdXJhY3lMaXN0KGFjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH1bXSA9IGFjY3VyYWN5U2V0dGluZ3MubWFwKGFjY3VyYWN5ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogYWNjdXJhY3kubmFtZSxcclxuICAgICAgICAgICAgICAgIHNvcnRWYWx1ZTogdGhpcy5nZXRBY2N1cmFjeVNvcnRpbmdWYWx1ZShhY2N1cmFjeS5sb3dlckJvdW5kLCBhY2N1cmFjeS51cHBlckJvdW5kKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBtZXJnZWRBY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPVxyXG4gICAgICAgICAgICB0aGlzLm1lcmdlQWNjdXJhY2llc1dpdGhTYW1lTmFtZShhY2N1cmFjeVRhYmxlKTtcclxuICAgICAgICBtZXJnZWRBY2N1cmFjeVRhYmxlLnNvcnQodGhpcy5hY2N1cmFjeVRhYmxlU29ydEZ1bmN0aW9uKTtcclxuICAgICAgICByZXR1cm4gbWVyZ2VkQWNjdXJhY3lUYWJsZS5tYXAocm93ID0+IHJvdy5hY2N1cmFjeU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QWNjdXJhY3lTb3J0aW5nVmFsdWUobG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAobG93ZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyh1cHBlckJvdW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVwcGVyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMobG93ZXJCb3VuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLmFicygodXBwZXJCb3VuZCArIGxvd2VyQm91bmQpIC8gMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtZXJnZUFjY3VyYWNpZXNXaXRoU2FtZU5hbWUoYWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZzsgc29ydFZhbHVlOiBudW1iZXIgfVtdKSB7XHJcbiAgICAgICAgbGV0IG1lcmdlZEFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgIHdoaWxlIChhY2N1cmFjeVRhYmxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGtleUFjY3VyYWN5TmFtZSA9IGFjY3VyYWN5VGFibGVbMF0uYWNjdXJhY3lOYW1lO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZEFjY3VyYWNpZXMgPSBhY2N1cmFjeVRhYmxlLmZpbHRlcihyb3cgPT4gcm93LmFjY3VyYWN5TmFtZSA9PT0ga2V5QWNjdXJhY3lOYW1lKTtcclxuICAgICAgICAgICAgbGV0IHNvcnRWYWx1ZUF2ZXJhZ2UgPSBtYXRjaGVkQWNjdXJhY2llc1xyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHN1bSwgcm93KSA9PiBzdW0gKyByb3cuc29ydFZhbHVlLCAwKVxyXG4gICAgICAgICAgICAgICAgLyBtYXRjaGVkQWNjdXJhY2llcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIG1lcmdlZEFjY3VyYWN5VGFibGUucHVzaCh7YWNjdXJhY3lOYW1lOiBrZXlBY2N1cmFjeU5hbWUsIHNvcnRWYWx1ZTogc29ydFZhbHVlQXZlcmFnZX0pO1xyXG4gICAgICAgICAgICBhY2N1cmFjeVRhYmxlID0gYWNjdXJhY3lUYWJsZS5maWx0ZXIocm93ID0+IHJvdy5hY2N1cmFjeU5hbWUgIT09IGtleUFjY3VyYWN5TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXJnZWRBY2N1cmFjeVRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWNjdXJhY3lUYWJsZVNvcnRGdW5jdGlvbihhOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH0pIHtcclxuICAgICAgICByZXR1cm4gYS5zb3J0VmFsdWUgLSBiLnNvcnRWYWx1ZTtcclxuICAgIH1cclxufSIsImV4cG9ydCBlbnVtIFNjcm9sbERpcmVjdGlvbiB7XHJcbiAgICBVcCxcclxuICAgIERvd24sXHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtUaW1lTWFuYWdlcn0gZnJvbSBcIi4vdGltZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtHYW1lVGltZVByb3ZpZGVyfSBmcm9tIFwiLi9nYW1lX3RpbWVfcHJvdmlkZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JvbGxNYW5hZ2VyIGltcGxlbWVudHMgR2FtZVRpbWVQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBzeXN0ZW1UaW1lTWlsbGlzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRpbWVNYW5hZ2VyOiBUaW1lTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc2Nyb2xsQm91bmRzOiB7IHRvcExlZnRYOiBudW1iZXIsIHRvcExlZnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIHA6IHA1LCBzY3JvbGxCb3VuZHM/OiB7IHRvcExlZnRYOiBudW1iZXIsIHRvcExlZnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH0pIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnN5c3RlbVRpbWVNaWxsaXMgPSAwO1xyXG4gICAgICAgIHRoaXMudGltZU1hbmFnZXIgPSBuZXcgVGltZU1hbmFnZXIoMCwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsQm91bmRzID0gc2Nyb2xsQm91bmRzO1xyXG4gICAgICAgIHAubW91c2VXaGVlbCA9IGZ1bmN0aW9uIChlOiBXaGVlbEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxvd1Njcm9sbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsQm91bmRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlSXNJbkJvdW5kcyhwLCB0aGlzLnNjcm9sbEJvdW5kcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1Njcm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd1Njcm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFsbG93U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZUNoYW5nZU1pbGxpcyA9IGUuZGVsdGFZICogMC4yO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLkRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbVRpbWVNaWxsaXMgLT0gdGltZUNoYW5nZU1pbGxpcztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzICs9IHRpbWVDaGFuZ2VNaWxsaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBFcXVpdmFsZW50IHRvIGV2ZW50LnByZXZlbnREZWZhdWx0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWxsb3cgYW4gaWdub3JlZCBhcmd1bWVudCBzbyBpdCBjYW4gYmUgdXNlZCBpbiBwbGFjZSBvZiBhIFRpbWVNYW5hZ2VyIGZvciBkZWJ1ZyBtb2RlXHJcbiAgICBnZXRHYW1lVGltZShpZ25vcmVkQXJndW1lbnQ/OiBhbnkpIHtcclxuICAgICAgICBsZXQgdGltZSA9IHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUodGhpcy5zeXN0ZW1UaW1lTWlsbGlzKTtcclxuICAgICAgICByZXR1cm4gdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdXNlSXNJbkJvdW5kcyhwOiBwNSwgYm91bmRzOiB7IHRvcExlZnRYOiBudW1iZXIsIHRvcExlZnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH0pIHtcclxuICAgICAgICBpZiAocC5tb3VzZVggPj0gYm91bmRzLnRvcExlZnRYICYmIHAubW91c2VYIDw9IGJvdW5kcy50b3BMZWZ0WCArIGJvdW5kcy53aWR0aCAmJlxyXG4gICAgICAgICAgICBwLm1vdXNlWSA+PSBib3VuZHMudG9wTGVmdFkgJiYgcC5tb3VzZVkgPD0gYm91bmRzLnRvcExlZnRZICsgYm91bmRzLmhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0Z1bGxQYXJzZSwgZ2V0RnVsbFBhcnNlLCBnZXRQYXJ0aWFsUGFyc2UsIE5vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGUsIFBhcnRpYWxQYXJzZX0gZnJvbSBcIi4vcGFyc2luZy9wYXJzZV9zbVwiO1xyXG5cclxuZXhwb3J0IGVudW0gU3RlcGZpbGVTdGF0ZSB7XHJcbiAgICBOT19TSU1GSUxFLFxyXG4gICAgRE9ORV9SRUFESU5HLFxyXG4gICAgUEFSVElBTExZX1BBUlNFRCxcclxuICAgIEZVTExZX1BBUlNFRCxcclxuICAgIEVSUk9SLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RlcGZpbGUge1xyXG4gICAgcHVibGljIHN0YXRlOiBTdGVwZmlsZVN0YXRlO1xyXG4gICAgcHVibGljIGZpbGU6IEZpbGU7XHJcbiAgICBwdWJsaWMgcGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2U7XHJcbiAgICBwdWJsaWMgZnVsbFBhcnNlOiBGdWxsUGFyc2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLk5PX1NJTUZJTEU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRGaWxlKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlLmZpbGU7IC8vIHRoaXMgdW53cmFwcyB0aGUgcDUuRmlsZSB3cmFwcGVyIHRvIGdldCB0aGUgb3JpZ2luYWwgRE9NIGZpbGVcclxuICAgICAgICB0aGlzLmxvYWRUZXh0RmlsZSh0aGlzLmZpbGUsICgoZXZlbnQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpYWxQYXJzZSA9IGdldFBhcnRpYWxQYXJzZSg8c3RyaW5nPmV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0aWFsUGFyc2UubW9kZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkRmZyQmVhdG1hcChiZWF0bWFwOiBbbnVtYmVyLCBzdHJpbmcsIHN0cmluZ11bXSkge1xyXG4gICAgICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gdGhpcy5iZWF0bWFwVG9UcmFja0FycmF5KGJlYXRtYXApO1xyXG5cclxuICAgICAgICBsZXQgcGFydGlhbFBhcnNlID0gbmV3IFBhcnRpYWxQYXJzZSgpO1xyXG4gICAgICAgIHBhcnRpYWxQYXJzZS5tb2RlcyA9IFtuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpXTtcclxuICAgICAgICBwYXJ0aWFsUGFyc2UubWV0YURhdGEgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMucGFydGlhbFBhcnNlID0gcGFydGlhbFBhcnNlO1xyXG5cclxuICAgICAgICBsZXQgZnVsbFBhcnNlID0gbmV3IEZ1bGxQYXJzZShwYXJ0aWFsUGFyc2UpO1xyXG4gICAgICAgIGZ1bGxQYXJzZS50cmFja3MgPSB0cmFja3M7XHJcbiAgICAgICAgdGhpcy5mdWxsUGFyc2UgPSBmdWxsUGFyc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluaXNoUGFyc2luZyhtb2RlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQgfHwgdGhpcy5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5mdWxsUGFyc2UgPSBnZXRGdWxsUGFyc2UobW9kZUluZGV4LCB0aGlzLnBhcnRpYWxQYXJzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkVGV4dEZpbGUoXHJcbiAgICAgICAgZmlsZTogRmlsZSxcclxuICAgICAgICBsaXN0ZW5lcjogKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiBhbnksXHJcbiAgICAgICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc1xyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcclxuICAgICAgICBmaWxlUmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJlYXRtYXBUb1RyYWNrQXJyYXkoYmVhdG1hcDogW251bWJlciwgc3RyaW5nLCBzdHJpbmddW10pIHtcclxuICAgICAgICBsZXQgdHJhY2tzOiBOb3RlW11bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyYWNrcy5wdXNoKFtdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmVhdG1hcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYmVhdG1hcFJvdyA9IGJlYXRtYXBbaV07XHJcbiAgICAgICAgICAgIGxldCB0cmFja051bWJlciA9IHRoaXMudHJhY2tOdW1iZXJGcm9tRGlyZWN0aW9uKGJlYXRtYXBSb3dbMV0pO1xyXG4gICAgICAgICAgICBsZXQgbm90ZSA9IHRoaXMubm90ZUZyb21CZWF0bWFwUm93KGJlYXRtYXBSb3cpO1xyXG4gICAgICAgICAgICB0cmFja3NbdHJhY2tOdW1iZXJdLnB1c2gobm90ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbm90ZUZyb21CZWF0bWFwUm93KHJvdzogW251bWJlciwgc3RyaW5nLCBzdHJpbmddKTogTm90ZSB7XHJcbiAgICAgICAgbGV0IHRpbWVJblNlY29uZHMgPSByb3dbMF0gLyAzMDtcclxuICAgICAgICByZXR1cm4ge3RpbWVJblNlY29uZHM6IHRpbWVJblNlY29uZHMsIHR5cGU6IE5vdGVUeXBlLk5PUk1BTCwgc3RhdGU6IE5vdGVTdGF0ZS5ERUZBVUxULCB0eXBlU3RyaW5nOiBcIk4vQVwifTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYWNrTnVtYmVyRnJvbURpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcIkxcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVua25vd24gdHJhY2sgZGlyZWN0aW9uICdcIiArIGRpcmVjdGlvbiArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lTWFuYWdlciBpbXBsZW1lbnRzIEdhbWVUaW1lUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ6IG51bWJlciwgY29uZmlnOiBDb25maWcpIHtcclxuICAgICAgICB0aGlzLnN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQgPSBzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWxhcHNlZFRpbWUoc3lzdGVtVGltZU1pbGxpczogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoc3lzdGVtVGltZU1pbGxpcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiRXJyb3I6IGNhbid0IGdldCBlbGFwc2VkIHRpbWUuIEV4cGVjdGVkIDEgYXJndW1lbnQ6IHN5c3RlbVRpbWUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHN5c3RlbVRpbWVNaWxsaXMgLSB0aGlzLnN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQpIC8gMTAwMDsgLy8gaW4gc2Vjb25kc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIHdhbnQgdG8ga2VlcCB0aGlzIGNhbGN1bGF0aW9uIGluIG9ubHkgb25lIHBsYWNlXHJcbiAgICBnZXRHYW1lVGltZShzeXN0ZW1UaW1lTWlsbGlzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGFwc2VkVGltZShzeXN0ZW1UaW1lTWlsbGlzKSArIHRoaXMuY29uZmlnLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgLSB0aGlzLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4vcGFnZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBlbnVtVG9TdHJpbmdBcnJheSxcclxuICAgIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSxcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3SGVhZGluZygpIHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgbGV0IGhlYWRpbmdDbGFzcyA9IFwibmF2aWdhdGlvbi1oZWFkaW5nXCI7XHJcblxyXG4gICAgbGV0IHBsYXlGcm9tRmlsZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJQbGF5IEZyb20gRmlsZVwiKTtcclxuICAgIH0sIFwicGxheUZyb21GaWxlQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQsIDAuMjUsIDAuMDM2LCAxMzAsIDM0KTtcclxuICAgIHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuUExBWV9GUk9NX0ZJTEUpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXBsYXlGcm9tRmlsZUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoaGVhZGluZ0NsYXNzKTtcclxuICAgICAgICBwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwbGF5RnJvbU9ubGluZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJQbGF5IEZyb20gT25saW5lXCIpO1xyXG4gICAgfSwgXCJwbGF5RnJvbU9ubGluZUJ1dHRvblwiKTtcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlGcm9tT25saW5lQnV0dG9uLmVsZW1lbnQsIDAuNSwgMC4wMzYsIDkwLCAzNCk7XHJcbiAgICBwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFBhZ2UoUEFHRVMuUExBWV9GUk9NX09OTElORSk7XHJcbiAgICB9KTtcclxuICAgIGlmICghcGxheUZyb21PbmxpbmVCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBsYXlGcm9tT25saW5lQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoaGVhZGluZ0NsYXNzKTtcclxuICAgICAgICBwbGF5RnJvbU9ubGluZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGxldCBvcHRpb25zQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIk9wdGlvbnNcIik7XHJcbiAgICB9LCBcIm9wdGlvbnNCdXR0b25cIik7XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShvcHRpb25zQnV0dG9uLmVsZW1lbnQsIDAuOCwgMC4wMzYsIDkwLCAzNCk7XHJcbiAgICBvcHRpb25zQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50UGFnZShQQUdFUy5PUFRJT05TKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCFvcHRpb25zQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBvcHRpb25zQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoaGVhZGluZ0NsYXNzKTtcclxuICAgICAgICBvcHRpb25zQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gRXhwZWN0cyByZWxhdGl2ZVggYW5kIHJlbGF0aXZlIFkgdG8gYmUgYmV0d2VlbiAwIGFuZCAxXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShlbGVtZW50OiBwNS5FbGVtZW50LCByZWxhdGl2ZVg6IG51bWJlciwgcmVsYXRpdmVZOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgbGV0IHAgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBjYW52YXNQb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9ID0gcC5fcmVuZGVyZXIucG9zaXRpb24oKTtcclxuICAgIGVsZW1lbnQucG9zaXRpb24oY2FudmFzUG9zaXRpb24ueCArIChyZWxhdGl2ZVggKiBwLndpZHRoKSAtICh3aWR0aCAvIDIpLFxyXG4gICAgICAgIGNhbnZhc1Bvc2l0aW9uLnkgKyAocmVsYXRpdmVZICogcC5oZWlnaHQpIC0gKGhlaWdodCAvIDIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRJbnB1dChsYWJlbFN0cmluZzogc3RyaW5nLCBpbnB1dElkOiBzdHJpbmcsIGlucHV0SW5pdGlhbFZhbHVlOiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkSW5wdXRDbGFzcyA9IFwibGFiZWxlZC1pbnB1dFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGlucHV0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0ID0gcC5jcmVhdGVJbnB1dChpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGlucHV0LmlkKGlucHV0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgaW5wdXRJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIGxldCBpbnB1dCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJJTlBVVFwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IGlucHV0LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbChwOiBwNSwgbGFiZWxTdHJpbmc6IHN0cmluZywgZm9ySWQ/OiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBsYWJlbCA9IHAuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIGxhYmVsU3RyaW5nKTtcclxuICAgIGlmIChmb3JJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGFiZWwuYXR0cmlidXRlKFwiZm9yXCIsIGZvcklkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYWJlbDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2hlY2tib3gocDogcDUsIGluaXRpYWxTdGF0ZTogYm9vbGVhbik6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGNoZWNrYm94ID0gcC5jcmVhdGVFbGVtZW50KFwiY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5lbHQuY2hlY2tlZCA9IGluaXRpYWxTdGF0ZTtcclxuICAgIHJldHVybiBjaGVja2JveDtcclxufVxyXG5cclxuLy8gVE9ETzogY2hlY2sgdGhhdCBvcHRpb25zRW51bSBpcyBhY3R1YWxseSBhbiBFbnVtLCBhbmQgaW5pdGlhbEVudW1WYWx1ZSBpcyBhIHZhbHVlIGZvciB0aGF0IGVudW1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRTZWxlY3QobGFiZWxTdHJpbmc6IHN0cmluZywgc2VsZWN0SWQ6IHN0cmluZywgb3B0aW9uc0VudW06IGFueSwgaW5pdGlhbEVudW1WYWx1ZTogYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IHNlbGVjdDogcDUuRWxlbWVudDtcclxuICAgIGxldCBsYWJlbGVkU2VsZWN0Q2xhc3MgPSBcImxhYmVsZWQtc2VsZWN0XCI7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBzZWxlY3RJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgc2VsZWN0ID0gcC5jcmVhdGVTZWxlY3QoKTtcclxuICAgICAgICBzZWxlY3QuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhsYWJlbGVkU2VsZWN0Q2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHNlbGVjdC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBzZWxlY3QuaWQoc2VsZWN0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgc2VsZWN0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lci5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgbGV0IGluaXRpYWxPcHRpb25zID0gZW51bVRvU3RyaW5nQXJyYXkob3B0aW9uc0VudW0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBzZWxlY3Qub3B0aW9uKGluaXRpYWxPcHRpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHNlbGVjdC5zZWxlY3RlZChvcHRpb25zRW51bVtpbml0aWFsRW51bVZhbHVlIGFzIGtleW9mIHR5cGVvZiBvcHRpb25zRW51bV0udG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zOiBIVE1MQ29sbGVjdGlvbiA9IHNlbGVjdC5lbHQuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuaXRlbShpKS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3MgKyBcIiBcIiArIGxhYmVsZWRTZWxlY3RDbGFzcyArIFwiIFwiICsgZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiBzZWxlY3QsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRUZXh0QXJlYShsYWJlbFN0cmluZzogc3RyaW5nLCBpbnB1dElkOiBzdHJpbmcsIGlucHV0SW5pdGlhbFZhbHVlOiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyID0gNCwgY29sczogbnVtYmVyID0gNDApOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgdGV4dEFyZWE6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkVGV4dGFyZWFDbGFzcyA9IFwibGFiZWxlZC10ZXh0YXJlYVwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGlucHV0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkVGV4dGFyZWFDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgdGV4dEFyZWEgPSBwLmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCBpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIHRleHRBcmVhLmlkKGlucHV0SWQpO1xyXG4gICAgICAgIHRleHRBcmVhLmF0dHJpYnV0ZShcInJvd3NcIiwgcm93cy50b1N0cmluZygpKTtcclxuICAgICAgICB0ZXh0QXJlYS5hdHRyaWJ1dGUoXCJjb2xzXCIsIGNvbHMudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBpbnB1dElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiB0ZXh0QXJlYSwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsZUlucHV0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIGJ1dHRvblRleHQ6IHN0cmluZywgdW5pcXVlSWQ6IHN0cmluZywgb25GaWxlTG9hZDogKGZpbGU6IHA1LkZpbGUpID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBidXR0b25JZCA9IHVuaXF1ZUlkICsgXCJCdXR0b25cIjtcclxuICAgIGxldCBjb250YWluZXJJZCA9IHVuaXF1ZUlkICsgXCJDb250YWluZXJcIjtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGZpbGVJbnB1dENsYXNzID0gXCJmaWxlLWlucHV0XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgZmlsZUlucHV0ID0gcC5jcmVhdGVGaWxlSW5wdXQob25GaWxlTG9hZCwgXCJmYWxzZVwiKTtcclxuICAgICAgICBmaWxlSW5wdXQucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgZmlsZUlucHV0LmhpZGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHAuY3JlYXRlQnV0dG9uKGJ1dHRvblRleHQpO1xyXG4gICAgICAgIGJ1dHRvbi5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBidXR0b24uaWQoYnV0dG9uSWQpO1xyXG4gICAgICAgIGJ1dHRvbi5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmaWxlSW5wdXQuZWx0LmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgYnV0dG9uSWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKVxyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGZpbGVJbnB1dENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgY29udGFpbmVySWQpO1xyXG5cclxuICAgIGxldCBsYWJlbDogcDUuRWxlbWVudCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJMQUJFTFwiKTtcclxuICAgIGxhYmVsLmh0bWwobGFiZWxTdHJpbmcpO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkQ2hlY2tib3gobGFiZWxTdHJpbmc6IHN0cmluZywgY2hlY2tib3hJZDogc3RyaW5nLCBpc0NoZWNrZWQ6IGJvb2xlYW4sIGN1c3RvbUNsYXNzOiBzdHJpbmcpOlxyXG4gICAgeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGNoZWNrYm94OiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgbGFiZWxlZENoZWNrYm94Q2xhc3MgPSBcImxhYmVsZWQtY2hlY2tib3hcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBjaGVja2JveElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZENoZWNrYm94Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGNoZWNrYm94ID0gY3JlYXRlQ2hlY2tib3gocCwgaXNDaGVja2VkKTtcclxuICAgICAgICBjaGVja2JveC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3guYWRkQ2xhc3MobGFiZWxlZENoZWNrYm94Q2xhc3MpO1xyXG4gICAgICAgIGNoZWNrYm94LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3gucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgY2hlY2tib3guaWQoY2hlY2tib3hJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBjaGVja2JveElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiBjaGVja2JveCwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBZZXNObyB7XHJcbiAgICBZZXMsXHJcbiAgICBOb1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhblRvWWVzTm8oYm9vbGVhbjogYm9vbGVhbik6IFllc05vIHtcclxuICAgIGlmIChib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIFllc05vLlllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFllc05vLk5vO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL2Rpc2NvdXJzZS5wcm9jZXNzaW5nLm9yZy90L2hvdy10by1vcmdhbml6ZS1yYWRpby1idXR0b25zLWluLXNlcGFyYXRlLWxpbmVzLzEwMDQxLzVcclxuZXhwb3J0IGZ1bmN0aW9uIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdihwOiBwNSwgcmFkaW9EaXZQNUVsZW1lbnQ6IHA1LkVsZW1lbnQpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGNvbnN0IGlucHV0cyA9IHAuc2VsZWN0QWxsKCdpbnB1dCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGNvbnN0IGxhYmVscyA9IHAuc2VsZWN0QWxsKCdsYWJlbCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGNvbnN0IGxlbiA9IGlucHV0cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHAuY3JlYXRlRGl2KCkucGFyZW50KHJhZGlvRGl2UDVFbGVtZW50KS5jaGlsZChpbnB1dHNbaV0pLmNoaWxkKGxhYmVsc1tpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZGlzY291cnNlLnByb2Nlc3Npbmcub3JnL3QvaG93LXRvLW9yZ2FuaXplLXJhZGlvLWJ1dHRvbnMtaW4tc2VwYXJhdGUtbGluZXMvMTAwNDEvNVxyXG5leHBvcnQgZnVuY3Rpb24gZml4UmFkaW9EaXZFbGVtZW50KHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50KSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByYWRpb0RpdlA1RWxlbWVudC5fZ2V0SW5wdXRDaGlsZHJlbkFycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlUmFkaW9PcHRpb25zKHA6IHA1LCByYWRpb0RpdlA1RWxlbWVudDogcDUuRWxlbWVudCwgc3R5bGVDbGFzc2VzOiBzdHJpbmdbXSkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgbGV0IGRpdnM6IHA1LkVsZW1lbnRbXSA9IHAuc2VsZWN0QWxsKCdkaXYnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGl2cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRpdnNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBsZXQgaW5wdXRzOiBwNS5FbGVtZW50W10gPSBwLnNlbGVjdEFsbCgnaW5wdXQnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW5wdXRzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgbGV0IGxhYmVsczogcDUuRWxlbWVudFtdICA9IHAuc2VsZWN0QWxsKCdsYWJlbCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYWJlbHNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxsT2NjdXJyZW5jZXNPZlRhZyhodG1sOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZykge1xyXG4gICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbGV0IGVsZW1lbnRzID0gdGVtcERpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKTtcclxuICAgIHdoaWxlIChlbGVtZW50c1swXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50c1swXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVtcERpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGlucHV0RWxlbWVudDogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0sIG9uSW5wdXQ6ICgpID0+IHZvaWQpIHtcclxuICAgIGlmICghaW5wdXRFbGVtZW50LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmVsZW1lbnQuaW5wdXQob25JbnB1dCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtNb2RlLCBOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nL3BhcnNlX3NtXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7U3RlcGZpbGUsIFN0ZXBmaWxlU3RhdGV9IGZyb20gXCIuL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlLCBBdWRpb0ZpbGVTdGF0ZX0gZnJvbSBcIi4vYXVkaW9fZmlsZVwiO1xyXG5pbXBvcnQge1BsYXlpbmdEaXNwbGF5fSBmcm9tIFwiLi9wbGF5aW5nX2Rpc3BsYXlcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0SWZVbmRlZmluZWQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhbHVlKSA/IGRlZmF1bHRWYWx1ZSA6IHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbE5vdGVzVG9EZWZhdWx0U3RhdGUodHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRyYWNrc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICB0cmFja3NbaV1bal0uc3RhdGUgPSBOb3RlU3RhdGUuREVGQVVMVDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXModHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRyYWNrc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRyYWNrc1tpXVtqXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlRBSUw6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk1JTkU6XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnR5cGUgPSBOb3RlVHlwZS5OT05FOyAvL1RPRE86IGltcGxlbWVudCBtaW5lc1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PTkU6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlJPTExfSEVBRDpcclxuICAgICAgICAgICAgICAgICAgICB0cmFja3NbaV1bal0udHlwZSA9IE5vdGVUeXBlLkhPTERfSEVBRDsgLy9UT0RPOiBpbXBsZW1lbnQgcm9sbHNcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWlzc0JvdW5kYXJ5KGN1cnJlbnRUaW1lOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICBsZXQgbWlzc0JvdW5kYXJ5ID0gY3VycmVudFRpbWUgKyAoY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0udXBwZXJCb3VuZCAvIDEwMDApOyAvL3Jlc3VsdCBpcyBpbiBzZWNvbmRzXHJcbiAgICByZXR1cm4gbWlzc0JvdW5kYXJ5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNLZXlCaW5kaW5nc0RlZmluZWQobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplS2V5QmluZGluZ3MobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIGxldCBtYXBwaW5nOiB7IHRyYWNrTnVtYmVyOiBudW1iZXIsIGtleUNvZGU6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcgfVtdID0gW107XHJcblxyXG4gICAgaWYgKG51bVRyYWNrcyA8PSA5KSB7XHJcbiAgICAgICAgbGV0IGtleVNlcXVlbmNlID0gW1wiQVwiLCBcIlNcIiwgXCJEXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsIFwiSlwiLCBcIktcIiwgXCJMXCJdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleVN0cmluZyA9IGtleVNlcXVlbmNlW2ldO1xyXG4gICAgICAgICAgICBtYXBwaW5nLnB1c2goe3RyYWNrTnVtYmVyOiBpLCBrZXlDb2RlOiBrZXlTdHJpbmcuY2hhckNvZGVBdCgwKSwgc3RyaW5nOiBrZXlTdHJpbmd9KTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChudW1UcmFja3MgPiAyNikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ291bGRuJ3QgZ2VuZXJhdGUgZGVmYXVsdCBrZXkgYmluZGluZ3MgZm9yIG1vcmUgdGhhbiAyNiB0cmFja3MuIFJhbiBvdXQgb2YgbGV0dGVycyFcIik7XHJcbiAgICAgICAgICAgIG51bVRyYWNrcyA9IDI2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFyYWN0ZXJDb2RlID0gXCJBXCIuY2hhckNvZGVBdCgwKSArIGk7IC8vIFRoaXMgaXMgYW4gQVNDSUkgY2hhcmFjdGVyIGNvZGVcclxuICAgICAgICAgICAgbWFwcGluZy5wdXNoKHt0cmFja051bWJlcjogaSwga2V5Q29kZTogY2hhcmFjdGVyQ29kZSwgc3RyaW5nOiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJhY3RlckNvZGUpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3Muc2V0KG51bVRyYWNrcywgbWFwcGluZyk7XHJcbiAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbmZpZ0tleUJpbmRpbmcodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGtleUJpbmRpbmc6IEtleUJpbmRpbmcpIHtcclxuICAgIGxldCBiaW5kaW5nSW5kZXggPSBnZXRJbmRleE9mVHJhY2tOdW1iZXJCaW5kaW5nKHRyYWNrTnVtYmVyLCBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpKTtcclxuICAgIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcylbYmluZGluZ0luZGV4XSA9IGtleUJpbmRpbmc7XHJcbiAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxufVxyXG5cclxuLy8gRXhwZWN0cyBlIHRvIGJlIGFuIGVudW1cclxuZXhwb3J0IGZ1bmN0aW9uIGVudW1Ub1N0cmluZ0FycmF5KGU6IGFueSk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKGUpLmZpbHRlcigodmFsdWUpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SW5kZXhPZlRyYWNrTnVtYmVyQmluZGluZyh0cmFja051bWJlcjogbnVtYmVyLCBiaW5kaW5nczogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChiaW5kaW5nc1tpXS50cmFja051bWJlciA9PT0gdHJhY2tOdW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5U3RyaW5nKHA6IHA1KSB7XHJcbiAgICByZXR1cm4gcC5rZXkubGVuZ3RoID09IDEgPyBwLmtleS50b1VwcGVyQ2FzZSgpIDogcC5rZXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkobW9kZXNBc1N0cmluZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz5bXSk6IE1vZGVbXSB7XHJcbiAgICBsZXQgbW9kZU9wdGlvbnM6IE1vZGVbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2Rlc0FzU3RyaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbW9kZXNBc1N0cmluZ3NbaV07XHJcbiAgICAgICAgbW9kZU9wdGlvbnMucHVzaCh7dHlwZTogbW9kZS5nZXQoXCJ0eXBlXCIpLCBkaWZmaWN1bHR5OiBtb2RlLmdldChcImRpZmZpY3VsdHlcIiksIG1ldGVyOiBtb2RlLmdldChcIm1ldGVyXCIpLCBpZDogaX0pO1xyXG4gICAgfVxyXG4gICAgbW9kZU9wdGlvbnMuc29ydChjb21wYXJlTW9kZU9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIG1vZGVPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZU1vZGVPcHRpb25zKGE6IE1vZGUsIGI6IE1vZGUpIHtcclxuICAgIGxldCB0eXBlQSA9IGEudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgbGV0IHR5cGVCID0gYi50eXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAodHlwZUEgIT0gdHlwZUIpIHtcclxuICAgICAgICBpZiAodHlwZUEgPCB0eXBlQikge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUEgPSBhLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUIgPSBiLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAoZGlmZmljdWx0eUEgIT0gZGlmZmljdWx0eUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlBKSAtIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlCKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbWV0ZXJBID0gcGFyc2VGbG9hdChhLm1ldGVyKTtcclxuICAgICAgICAgICAgbGV0IG1ldGVyQiA9IHBhcnNlRmxvYXQoYi5tZXRlcik7XHJcbiAgICAgICAgICAgIGlmIChtZXRlckEgIT0gbWV0ZXJCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0ZXJBIC0gbWV0ZXJCO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGEuaWQgPSBiLmlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5OiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAoZGlmZmljdWx0eSkge1xyXG4gICAgICAgIGNhc2UgXCJCRUdJTk5FUlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBjYXNlIFwiRUFTWVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICBjYXNlIFwiTUVESVVNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIGNhc2UgXCJIQVJEXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIGNhc2UgXCJDSEFMTEVOR0VcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgY2FzZSBcIkVESVRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoZGl2OiBwNS5FbGVtZW50LCB0YWdOYW1lOiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBjaGlsZHJlbk5vZGVzID0gZGl2LmNoaWxkKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbm9kZTogTm9kZSA9IGNoaWxkcmVuTm9kZXNbaV07XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHA1LkVsZW1lbnQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGJpbmRpbmdzOiB7IHRyYWNrTnVtYmVyOiBudW1iZXIsIGtleUNvZGU6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcgfVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJpbmRpbmdzW2ldLnRyYWNrTnVtYmVyID09PSB0cmFja051bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZGluZ3NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUHJldmlld05vdGVzKG51bVRyYWNrczogbnVtYmVyKTogTm90ZVtdW10ge1xyXG4gICAgbGV0IG5vdGVzOiBOb3RlW11bXSA9IFtdO1xyXG4gICAgbGV0IGlzSG9sZCA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMC4xO1xyXG4gICAgbGV0IHRpbWVJbmNyZW1lbnQgPSAwLjMgLyBudW1UcmFja3M7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSBbXTtcclxuICAgICAgICBpZiAoaXNIb2xkKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuSE9MRF9IRUFELCB0eXBlU3RyaW5nOiBcIkRvbid0IENhcmVcIiwgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuVEFJTCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lICsgMC4yNSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vdGVUeXBlLk5PUk1BTCxcclxuICAgICAgICAgICAgICAgIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLFxyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdGVzLnB1c2godHJhY2spO1xyXG4gICAgICAgIGlzSG9sZCA9ICFpc0hvbGQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gdGltZUluY3JlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBub3RlcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjY3VyYWN5RXZlbnROYW1lKHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHM6IG51bWJlciwgY29uZmlnOiBDb25maWcpOiBzdHJpbmcge1xyXG4gICAgaWYgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPCBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLm5hbWU7IC8vIEhhbmRsZSBtaXNzIGlmIGl0IGV4aXN0c1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPj0gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgIHJldHVybiBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS5uYW1lOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tpXTtcclxuICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPSBudWxsICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgJiYgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdXJhY3kubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBcIkVSUk9SOiBVbmtub3duIGFjY3VyYWN5XCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZpbGVzUmVhZHkoc3RlcGZpbGU6IFN0ZXBmaWxlLCBhdWRpb0ZpbGU6IEF1ZGlvRmlsZSkge1xyXG4gICAgbGV0IHN0ZXBmaWxlUmVhZHkgPSBzdGVwZmlsZS5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEIHx8XHJcbiAgICAgICAgc3RlcGZpbGUuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEO1xyXG4gICAgbGV0IGF1ZGlvRmlsZVJlYWR5ID0gYXVkaW9GaWxlLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIHJldHVybiBzdGVwZmlsZVJlYWR5ICYmIGF1ZGlvRmlsZVJlYWR5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFBsYXlpbmdEaXNwbGF5KHRyYWNrczogTm90ZVtdW10sIGF1ZGlvRmlsZTogQXVkaW9GaWxlKSB7XHJcbiAgICBnbG9iYWwucGxheWluZ0Rpc3BsYXkgPSBuZXcgUGxheWluZ0Rpc3BsYXkodHJhY2tzLCBhdWRpb0ZpbGUsIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxufSIsIm1vZHVsZS5leHBvcnRzID0gcDU7IiwibW9kdWxlLmV4cG9ydHMgPSBwYWtvOyJdLCJzb3VyY2VSb290IjoiIn0=