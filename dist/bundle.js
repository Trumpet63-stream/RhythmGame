var simparser =
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
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");
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
            if (note.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NORMAL) {
                note.state = _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT;
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                this.handleAccuracyEvent({
                    accuracyName: Object(_util__WEBPACK_IMPORTED_MODULE_2__["getAccuracyEventName"])(accuracy, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: accuracy,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: note.type,
                });
            }
            else if (note.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD) {
                note.state = _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HELD; // set the note to held so it won't count as a miss
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
                noteType: _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NONE,
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
            if (this.noteManager.tracks[trackNumber][i].state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT) {
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
            if (note.type == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                let hold = this.noteManager.tracks[trackNumber][noteIndex - 1]; // get the hold belonging to this tail
                hold.state = _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT; // change the hold state from HELD to HIT
                note.state = _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT; // hit the tail of the hold
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
            if (hold.type == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD && tail.type == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                this.noteManager.tracks[trackNumber][holdStartIndex - 1].state = _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT; // hit the start of the hold
                this.noteManager.tracks[trackNumber][holdStartIndex].state = _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HIT; // hit the tail of the hold
                this.handleAccuracyEvent({
                    accuracyName: "Release " + Object(_util__WEBPACK_IMPORTED_MODULE_2__["getAccuracyEventName"])(Infinity, this.config),
                    trackNumber: trackNumber,
                    accuracyMillis: Infinity,
                    timeInSeconds: currentTimeInSeconds,
                    noteType: _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NONE,
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
    load(file) {
        this.file = file.file; // this unwraps the p5.File wrapper to get the original DOM file
        loadSoundFile(this.file, ((onFileRead) => {
            this.state = AudioFileState.DONE_READING;
            // @ts-ignore
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioSource = this.audioContext.createBufferSource();
            this.audioContext.decodeAudioData(onFileRead.target.result).then(((buffer) => {
                this.audioBuffer = buffer;
                this.audioSource.buffer = buffer;
                this.audioSource.connect(this.audioContext.destination);
                this.state = AudioFileState.BUFFERED;
            }), (e) => {
                console.log("Error with decoding audio data" + e.err);
                this.state = AudioFileState.ERROR;
            });
        }));
    }
    getDuration() {
        if (this.state === AudioFileState.BUFFERED) {
            return this.audioSource.buffer.duration;
        }
        return undefined;
    }
    // TODO: Failed to execute 'start' on 'AudioBufferSourceNode': cannot call start more than once.
    play(delayInSeconds = 0) {
        this.audioSource.start(this.audioContext.currentTime + delayInSeconds);
    }
    stop() {
        this.audioSource.stop(0);
        AudioFileState.DONE_READING;
        this.recreateSourceNode();
    }
    recreateSourceNode() {
        this.audioSource = this.audioContext.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;
        this.audioSource.connect(this.audioContext.destination);
        AudioFileState.BUFFERED;
    }
}
function loadSoundFile(file, listener, options) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.addEventListener("loadend", listener, options);
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
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");


class DefaultNoteSkin {
    static drawNote(trackNumber, numTracks, centerX, centerY, noteType, noteSize) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let width = noteSize;
        let height = noteSize;
        p.push();
        p.fill("black");
        switch (noteType) {
            case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                break;
            case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("white");
                p.text("v", centerX, centerY + 6);
                break;
            case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL:
                p.noFill();
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                break;
            case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].ROLL_HEAD:
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("white");
                p.text("x", centerX, centerY + 6);
                break;
            case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].MINE:
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
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");
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
        if (note.state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT) {
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
                if (currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD || currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].ROLL_HEAD) {
                    noteStack.push(currentNote);
                }
                else if (currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                    noteStack.pop();
                }
            }
            else if (currentNote.timeInSeconds < greatestTime) {
                if (currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD || currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].ROLL_HEAD) {
                    noteStack.push(currentNote);
                }
                else if (currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                    let startNote = noteStack.pop();
                    let endNote = currentNote;
                    if (startNote != undefined && endNote != undefined) {
                        if ((startNote.state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT || startNote.state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HELD) &&
                            endNote.state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT) {
                            this.drawConnector(startNote, endNote, trackNumber, numTracks, currentTime);
                        }
                    }
                }
            }
            else {
                if (noteStack.length == 0) {
                    break;
                }
                if (currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD || currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].ROLL_HEAD) {
                    noteStack.push(currentNote);
                }
                else if (currentNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                    let startNote = noteStack.pop();
                    let endNote = currentNote;
                    if (startNote != undefined && endNote != undefined) {
                        if ((startNote.state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT || startNote.state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HELD) &&
                            endNote.state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT) {
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
        if (startNote.state == _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].HELD) {
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
/*! exports provided: drawAccuracyBars, drawAccuracyBar, drawRightAlignedLabel, drawPartiallyFilledBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawAccuracyBars", function() { return drawAccuracyBars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawAccuracyBar", function() { return drawAccuracyBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawRightAlignedLabel", function() { return drawRightAlignedLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawPartiallyFilledBar", function() { return drawPartiallyFilledBar; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");

function drawAccuracyBars(p, accuracyLabels, accuracyRecording, centerX, centerY, textSize, barWidth, barHeight, noteManager, accuracyManager) {
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
        drawAccuracyBar(p, centerX, startY + i * (barHeight + barSpacing), accuracyLabel, numAccuracyEvents.toString(), totalNotes.toString(), textSize, maxTextWidth, barWidth, barHeight, percentFilled);
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
/* harmony import */ var _stepfile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stepfile */ "./src/scripts/stepfile.ts");
/* harmony import */ var _audio_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio_file */ "./src/scripts/audio_file.ts");
/* harmony import */ var _p5_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./p5_scene */ "./src/scripts/p5_scene.ts");




const global = {};
global.p5Scene = new _p5_scene__WEBPACK_IMPORTED_MODULE_3__["P5Scene"]();
global.config = _config__WEBPACK_IMPORTED_MODULE_0__["Config"].load();
global.stepfile = new _stepfile__WEBPACK_IMPORTED_MODULE_1__["Stepfile"]();
global.audioFile = new _audio_file__WEBPACK_IMPORTED_MODULE_2__["AudioFile"]();
global.globalClass = "game";


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
                }
            }
            else {
                let actions = this.actionBindings.get(p.keyCode);
                if (actions !== undefined) {
                    if (actions.keyDownAction !== undefined) {
                        actions.keyDownAction();
                    }
                }
            }
        }.bind(this);
        p.keyReleased = function () {
            let actions = this.actionBindings.get(p.keyCode);
            if (actions !== undefined) {
                if (actions.keyUpAction !== undefined) {
                    actions.keyUpAction();
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
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");


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
        return note.state !== _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT;
    }
    isNoteMissedAndNotHandled(note, currentTime) {
        let missBoundary = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getMissBoundary"])(currentTime, this.config);
        return note.timeInSeconds < missBoundary && note.state === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].DEFAULT;
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
        missedNote.state = _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].MISSED;
        if (missedNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
            if (this.holdManager.isTrackHeld(trackNumber)) {
                this.holdManager.unholdTrack(trackNumber, currentTimeInSeconds); // Force a hold release upon missing the tail
            }
        }
        else if (missedNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD) {
            let nextNote = track[indexOfMissedNote + 1];
            if (nextNote !== undefined) {
                if (nextNote.type === _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL) {
                    nextNote.state = _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteState"].MISSED; // Miss the tail when you miss the head
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
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");

class NoteManager {
    constructor(tracks) {
        this.tracks = tracks;
        this.removeUnsupportedNoteTypes();
    }
    removeUnsupportedNoteTypes() {
        let supportedNoteTypes = [_parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL, _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD, _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL];
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
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");
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
            case _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NORMAL:
            case _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD:
                this.drawImageRotated(this.note, trackNumber, numTracks, centerX, centerY, noteSize);
                break;
            case _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].TAIL:
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






var PAGES;
(function (PAGES) {
    PAGES[PAGES["PLAY_FROM_FILE"] = 0] = "PLAY_FROM_FILE";
    PAGES[PAGES["OPTIONS"] = 1] = "OPTIONS";
    PAGES[PAGES["PLAY"] = 2] = "PLAY";
    PAGES[PAGES["RESULTS"] = 3] = "RESULTS";
})(PAGES || (PAGES = {}));
class PageManager {
    static getCurrentScene() {
        return this.currentScene;
    }
    static setCurrentScene(scene) {
        this.currentScene = scene;
        _dom_wrapper__WEBPACK_IMPORTED_MODULE_5__["DOMWrapper"].clearRegistry();
    }
    static draw() {
        switch (this.currentScene) {
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
            default:
                throw new Error("Unexpected scene: " + _index__WEBPACK_IMPORTED_MODULE_0__["global"].currentScene);
        }
    }
}
PageManager.currentScene = PAGES.PLAY_FROM_FILE;


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
/* harmony import */ var _playing_display__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../playing_display */ "./src/scripts/playing_display.ts");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../page_manager */ "./src/scripts/page_manager.ts");
/* harmony import */ var _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dom_wrapper */ "./src/scripts/dom_wrapper.ts");








class PlayFromFile {
    static draw() {
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["drawHeading"])();
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        p.background(_index__WEBPACK_IMPORTED_MODULE_1__["global"].playFromFileBackground);
        let stepfileInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["createFileInput"])(getStepfileInputLabel(), "Choose Stepfile (.sm)", "stepfileInput", loadStepfileAndUpdateModeOptions, PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(stepfileInput, 0.43, 0.3, 268, 34);
        let audioFileInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["createFileInput"])(getAudioFileInputLabel(), "Choose Audio File (.mp3, .ogg)", "audioFileInput", _index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile.load.bind(_index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile), PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(audioFileInput, 0.43, 0.45, 325, 34);
        let playButtonId = "playButton";
        if (isFilesReady()) {
            let modeRadio = drawModeSelect(p, PlayFromFile.MODE_RADIO_ID);
            if (modeRadio.value() !== "") { // if user has selected a mode
                let playButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].create(() => {
                    return p.createButton("Play");
                }, playButtonId);
                Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(playButton.element, 0.5, 0.88, 60, 34);
                if (!playButton.alreadyExists) {
                    playButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass);
                    playButton.element.mouseClicked(() => {
                        let selectedMode = getSelectedMode(modeRadio);
                        _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.finishParsing(selectedMode.id);
                        initPlayingDisplay(_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.fullParse.tracks);
                        _page_manager__WEBPACK_IMPORTED_MODULE_6__["PageManager"].setCurrentScene(_page_manager__WEBPACK_IMPORTED_MODULE_6__["PAGES"].PLAY);
                    });
                }
            }
            else {
                _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].removeElementById(playButtonId);
            }
        }
        else {
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].removeElementById(PlayFromFile.MODE_RADIO_ID);
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].removeElementById(playButtonId);
        }
    }
}
PlayFromFile.PLAY_FROM_FILE_CLASS = "play-from-file";
PlayFromFile.MODE_RADIO_ID = "modeRadio";
function loadStepfileAndUpdateModeOptions(file) {
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.load.call(_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile, file);
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions = undefined;
    _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].removeElementById(PlayFromFile.MODE_RADIO_ID);
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
function styleModeOptions(p, radioDivP5Element, styleClasses) {
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
function drawModeSelect(p, uniqueId) {
    p.push();
    if (_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions === undefined) {
        _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions = Object(_util__WEBPACK_IMPORTED_MODULE_4__["getModeOptionsForDisplay"])(_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.partialParse.modes);
    }
    let modeRadioClass = "mode-radio";
    let modeRadioOptionClass = "mode-radio-option";
    let modeRadioCreateResult = _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].create(() => {
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
        encloseEachInputLabelPairIntoASubDiv(p, modeRadio);
        fixRadioDivElement(modeRadio);
        styleModeOptions(p, modeRadio, [modeRadioOptionClass, _index__WEBPACK_IMPORTED_MODULE_1__["global"].globalClass]);
    }
    Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(modeRadio, 0.5, 0.7, 302, 120);
    p.pop();
    return modeRadio;
}
function isFilesReady() {
    let stepfileReady = _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.state === _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].PARTIALLY_PARSED ||
        _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.state === _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].FULLY_PARSED;
    let audioFileReady = _index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile.state === _audio_file__WEBPACK_IMPORTED_MODULE_3__["AudioFileState"].BUFFERED;
    return stepfileReady && audioFileReady;
}
function initPlayingDisplay(tracks) {
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].playingDisplay = new _playing_display__WEBPACK_IMPORTED_MODULE_5__["PlayingDisplay"](tracks, _index__WEBPACK_IMPORTED_MODULE_1__["global"].config, _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene);
}
function getSelectedMode(modeRadio) {
    return _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfileModeOptions[modeRadio.value()];
}
function getStepfileInputLabel() {
    switch (_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.state) {
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].NO_SIMFILE:
            return "No file chosen";
            break;
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].DONE_READING:
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].PARTIALLY_PARSED:
        case _stepfile__WEBPACK_IMPORTED_MODULE_2__["StepfileState"].FULLY_PARSED:
            return truncateFileNameIfTooLong(_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.file.name, 30);
            break;
        default:
            return "Error";
    }
}
function getAudioFileInputLabel() {
    switch (_index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile.state) {
        case _audio_file__WEBPACK_IMPORTED_MODULE_3__["AudioFileState"].NO_AUDIO_FILE:
            return "No file chosen";
            break;
        case _audio_file__WEBPACK_IMPORTED_MODULE_3__["AudioFileState"].DONE_READING:
        case _audio_file__WEBPACK_IMPORTED_MODULE_3__["AudioFileState"].BUFFERED:
            return truncateFileNameIfTooLong(_index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile.file.name, 30);
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
                _page_manager__WEBPACK_IMPORTED_MODULE_2__["PageManager"].setCurrentScene(_page_manager__WEBPACK_IMPORTED_MODULE_2__["PAGES"].PLAY_FROM_FILE);
            });
        }
    }
}


/***/ }),

/***/ "./src/scripts/parsing.ts":
/*!********************************!*\
  !*** ./src/scripts/parsing.ts ***!
  \********************************/
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
    constructor(tracks, config, scene) {
        this.isDebugMode = false;
        this.showResultsScreen = false;
        this.config = config;
        this.scene = scene;
        // initialize the time manager and play the audio as close together as possible to synchronize the audio with the game
        if (!this.isDebugMode) {
            this.timeManager = new _time_manager__WEBPACK_IMPORTED_MODULE_2__["TimeManager"](performance.now(), this.config);
            _index__WEBPACK_IMPORTED_MODULE_9__["global"].audioFile.play(config.pauseAtStartInSeconds);
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
        this.gameEndTime = this.calculateGameEnd(_index__WEBPACK_IMPORTED_MODULE_9__["global"].audioFile.getDuration(), this.getNotesEndTime());
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
        console.log("Track #" + (accuracyEvent.trackNumber + 1) + " " + accuracyEvent.accuracyName +
            (Math.abs(accuracyEvent.accuracyMillis) == Infinity ?
                "" :
                " (" + Math.round(accuracyEvent.accuracyMillis) + " ms)"));
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
        _index__WEBPACK_IMPORTED_MODULE_9__["global"].audioFile.stop();
        _index__WEBPACK_IMPORTED_MODULE_9__["global"].resultsDisplay = new _results_display__WEBPACK_IMPORTED_MODULE_6__["ResultsDisplay"](this.config, this.noteManager, this.accuracyManager, this.scene.sketchInstance, this.accuracyRecording);
        _page_manager__WEBPACK_IMPORTED_MODULE_11__["PageManager"].setCurrentScene(_page_manager__WEBPACK_IMPORTED_MODULE_11__["PAGES"].RESULTS);
    }
    bindKeyBindingsToActions() {
        let keyBindings = _index__WEBPACK_IMPORTED_MODULE_9__["global"].config.keyBindings.get(this.noteManager.tracks.length);
        for (let i = 0; i < keyBindings.length; i++) {
            let keyBinding = keyBindings[i];
            _index__WEBPACK_IMPORTED_MODULE_9__["global"].keyboardEventManager.bindKeyToAction(keyBinding.keyCode, () => {
                this.keyDownActionForTrack(keyBinding.trackNumber);
            }, () => {
                this.keyUpActionForTrack(keyBinding.trackNumber);
            });
        }
        _index__WEBPACK_IMPORTED_MODULE_9__["global"].keyboardEventManager.bindKeyToAction(_index__WEBPACK_IMPORTED_MODULE_9__["global"].config.quitKey, () => {
            this.endSong();
        });
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

//TODO: take holds and releases into account
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
        Object(_drawing_util__WEBPACK_IMPORTED_MODULE_0__["drawAccuracyBars"])(p, accuracyListForResults, accuracyRecording, centerX, centerY, leftLabelHeight, barWidth, barHeight, noteManager, accuracyManager);
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
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");

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
    load(file) {
        this.file = file.file; // this unwraps the p5.File wrapper to get the original DOM file
        loadTextFile(this.file, ((event) => {
            this.state = StepfileState.DONE_READING;
            this.partialParse = Object(_parsing__WEBPACK_IMPORTED_MODULE_0__["getPartialParse"])(event.target.result);
            if (this.partialParse.modes.length < 1) {
                this.state = StepfileState.ERROR;
            }
            else {
                this.state = StepfileState.PARTIALLY_PARSED;
            }
        }));
    }
    finishParsing(modeIndex) {
        if (this.state === StepfileState.PARTIALLY_PARSED || this.state === StepfileState.FULLY_PARSED) {
            this.fullParse = Object(_parsing__WEBPACK_IMPORTED_MODULE_0__["getFullParse"])(modeIndex, this.partialParse);
            this.state = StepfileState.FULLY_PARSED;
        }
    }
}
function loadTextFile(file, listener, options) {
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener("loadend", listener, options);
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
/*! exports provided: drawHeading, setElementCenterPositionRelative, createLabeledInput, createLabeledSelect, createKeyBindingInput, createLabeledTextArea, createFileInput, createLabeledCheckbox, YesNo, booleanToYesNo */
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
    setElementCenterPositionRelative(playFromFileButton.element, 0.3, 0.036, 130, 34);
    playFromFileButton.element.mousePressed(() => {
        _page_manager__WEBPACK_IMPORTED_MODULE_1__["PageManager"].setCurrentScene(_page_manager__WEBPACK_IMPORTED_MODULE_1__["PAGES"].PLAY_FROM_FILE);
    });
    if (!playFromFileButton.alreadyExists) {
        playFromFileButton.element.addClass(headingClass);
        playFromFileButton.element.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
    }
    let optionsButton = _dom_wrapper__WEBPACK_IMPORTED_MODULE_3__["DOMWrapper"].create(() => {
        return p.createButton("Options");
    }, "optionsButton");
    setElementCenterPositionRelative(optionsButton.element, 0.7, 0.036, 90, 34);
    optionsButton.element.mousePressed(() => {
        _page_manager__WEBPACK_IMPORTED_MODULE_1__["PageManager"].setCurrentScene(_page_manager__WEBPACK_IMPORTED_MODULE_1__["PAGES"].OPTIONS);
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
    let input;
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
        input = p.createInput(inputInitialValue);
        input.addClass(customClass);
        input.addClass(labeledInputClass);
        input.addClass(_index__WEBPACK_IMPORTED_MODULE_0__["global"].globalClass);
        input.parent(container);
        input.id(inputId);
        return container;
    }, inputId + "Container");
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


/***/ }),

/***/ "./src/scripts/util.ts":
/*!*****************************!*\
  !*** ./src/scripts/util.ts ***!
  \*****************************/
/*! exports provided: defaultIfUndefined, isUndefined, setAllNotesToDefaultState, replaceNotYetImplementedNoteTypes, getMissBoundary, isKeyBindingsDefined, initializeKeyBindings, setConfigKeyBinding, enumToStringArray, getKeyBindingButtonId, getKeyBindingContainerId, getKeyString, getModeOptionsForDisplay, compareModeOptions, getFirstElementByTagName, findBindingInfoForTrack, generatePreviewNotes, getAccuracyEventName */
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
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! p5 */ "p5");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_2__);



function defaultIfUndefined(value, defaultValue) {
    return isUndefined(value) ? defaultValue : value;
}
function isUndefined(value) {
    return typeof value === "undefined";
}
function setAllNotesToDefaultState(tracks) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].length; j++) {
            tracks[i][j].state = _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT;
        }
    }
}
function replaceNotYetImplementedNoteTypes(tracks) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].length; j++) {
            switch (tracks[i][j].type) {
                case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL:
                    break;
                case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].MINE:
                    tracks[i][j].type = _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NONE; //TODO: implement mines
                    break;
                case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD:
                    break;
                case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NONE:
                    break;
                case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].ROLL_HEAD:
                    tracks[i][j].type = _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD; //TODO: implement rolls
                    break;
                case _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL:
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
                type: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD, typeString: "Don't Care", timeInSeconds: currentTime,
                state: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT
            });
            track.push({
                type: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL, typeString: "Don't Care", timeInSeconds: currentTime + 0.25,
                state: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT
            });
        }
        else {
            track.push({
                type: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL,
                typeString: "Don't Care",
                timeInSeconds: currentTime,
                state: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT
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


/***/ }),

/***/ "p5":
/*!*********************!*\
  !*** external "p5" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = p5;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wYXJzZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfZmxhc2gudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2FjY3VyYWN5X2ZlZWRiYWNrX3RleHQudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9yZWNvcmRpbmcudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvYXVkaW9fZmlsZS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvZGVmYXVsdF9jb25maWcudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvZGVmYXVsdF9ub3RlX3NraW4udHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvZGlzcGxheV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2RvbV93cmFwcGVyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2RyYXdpbmdfdXRpbC50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9ob2xkX2dsb3cudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvaG9sZF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2hvbGRfcGFydGljbGVzLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2tleV9iaW5kaW5nX2hlbHBlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9rZXlib2FyZF9ldmVudF9tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL21pc3NfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9ub3RlX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvbm90ZV9za2luLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3A1X3NjZW5lLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3BhZ2VfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9wYWdlcy9vcHRpb25zLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3BhZ2VzL3BsYXkudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGFnZXMvcGxheV9mcm9tX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGFnZXMvcmVzdWx0cy50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9wYXJzaW5nLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3BhcnRpY2xlLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3BhcnRpY2xlX3N5c3RlbS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9wbGF5ZXJfa2V5X2FjdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9wbGF5aW5nX2Rpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcHJldmlld19kaXNwbGF5LnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3JlY2VwdG9yX3Nocmlua19yZWFjdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9yZXN1bHRzX2Rpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX2RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9zY3JvbGxfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9zdGVwZmlsZS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy90aW1lX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvdWlfdXRpbC50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy91dGlsLnRzIiwid2VicGFjazovL3NpbXBhcnNlci9leHRlcm5hbCBcInA1XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Es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bGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JpcHRzL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSwgQWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5RmVlZGJhY2tGbGFzaCB7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bUNvbG9yZWRBY2N1cmFjeVJhbmtzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBmbGFzaER1cmF0aW9uSW5TZWNvbmRzOiBudW1iZXIgPSAwLjE7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5Q29sb3JzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZywgY29uZmlnOiBDb25maWcsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IGRpc3BsYXlNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgICAgIHRoaXMubnVtQ29sb3JlZEFjY3VyYWN5UmFua3MgPSB0aGlzLmdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lDb2xvcnMgPSBbXHJcbiAgICAgICAgICAgIFsxNzgsIDk0LCAyNDcsIDE4MF0sXHJcbiAgICAgICAgICAgIFszMCwgMjE3LCAxMjQsIDE2MF0sXHJcbiAgICAgICAgICAgIFsxOTYsIDE5OSwgMzAsIDE0MF0sXHJcbiAgICAgICAgICAgIFsyNDUsIDIxMywgMjIxLCAxMjBdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB3aGlsZSAodGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA+IHRoaXMuYWNjdXJhY3lDb2xvcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdXJhY3lDb2xvcnMucHVzaChcclxuICAgICAgICAgICAgICAgIFt0aGlzLmdldFJhbmRvbUludCgyNTUpLCB0aGlzLmdldFJhbmRvbUludCgyNTUpLCB0aGlzLmdldFJhbmRvbUludCgyNTUpLCAxMDBdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmFuZG9tSW50KG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdGbGFzaEZvclRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0ZsYXNoRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBtb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSA9IHRoaXMuZ2V0VHJhY2tNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSh0cmFja051bWJlcik7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGbGFzaEhhcHBlbmluZyhjdXJyZW50VGltZUluU2Vjb25kcywgbW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpKSB7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgdGhpcy5udW1UcmFja3MpO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY3VycmVudFRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgbGV0IGZsYXNoQ29sb3I6IHA1LkNvbG9yID0gdGhpcy5nZXRGbGFzaENvbG9yKG1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KTtcclxuICAgICAgICAgICAgbGV0IGVsYXBzZWRUaW1lSW5TZWNvbmRzID0gdGhpcy5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcywgbW9zdFJlY2VudEFjY3VyYWN5UmVjb3JkaW5nRW50cnkpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdGbGFzaChlbGFwc2VkVGltZUluU2Vjb25kcywgY2VudGVyWCwgY2VudGVyWSwgZmxhc2hDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNGbGFzaEhhcHBlbmluZyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5RXZlbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgYWNjdXJhY2llc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gSGFuZGxlIG1pc3MgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPj0gYWNjdXJhY2llc1thY2N1cmFjaWVzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVsYXBzZWRUaW1lSW5TZWNvbmRzID0gdGhpcy5nZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kcywgYWNjdXJhY3lFdmVudCk7XHJcbiAgICAgICAgaWYgKGVsYXBzZWRUaW1lSW5TZWNvbmRzID4gQWNjdXJhY3lGZWVkYmFja0ZsYXNoLmZsYXNoRHVyYXRpb25JblNlY29uZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGFwc2VkVGltZUluU2Vjb25kcyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VHJhY2tNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSh0cmFja051bWJlcjogbnVtYmVyKTogQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGlmICh0cmFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl1bdHJhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzc3VtZXMgc3ltbWV0cmljYWwgYWNjdXJhY3kgc2V0dGluZ3NcclxuICAgIHByaXZhdGUgZ2V0Rmxhc2hDb2xvcihhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5KSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVJhbmsgPSB0aGlzLmdldEFjY3VyYWN5UmFuayhhY2N1cmFjeUV2ZW50LCBhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgY29sb3JWYWx1ZXMgPSB0aGlzLmFjY3VyYWN5Q29sb3JzW2FjY3VyYWN5UmFuayAtIDFdO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBwLmNvbG9yKGNvbG9yVmFsdWVzWzBdLCBjb2xvclZhbHVlc1sxXSwgY29sb3JWYWx1ZXNbMl0sIGNvbG9yVmFsdWVzWzNdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBc3N1bWVzIHN5bW1ldHJpY2FsIGFjY3VyYWN5IHNldHRpbmdzXHJcbiAgICBwcml2YXRlIGdldE51bUNvbG9yZWRBY2N1cmFjeVJhbmtzKGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBudW1SYW5rcyA9IDE7IC8vIHN0YXJ0IHdpdGggMSBiZWNhdXNlIHdlIGF0IGxlYXN0IGhhdmUgdGhlIGJlc3QgcmFua1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBiZXN0QWNjdXJhY3lJbmRleCArIDE7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPT0gdW5kZWZpbmVkICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbnVtUmFua3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtUmFua3NcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY3VyYWNpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgMCAmJiAwIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgYSByYW5rIHdoZXJlIDEgaXMgdGhlIGJlc3RcclxuICAgIHByaXZhdGUgZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnksIGFjY3VyYWNpZXM6IEFjY3VyYWN5W10pIHtcclxuICAgICAgICBpZiAoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8IDApIHtcclxuICAgICAgICAgICAgYWNjdXJhY2llcyA9IHRoaXMuZ2V0UmV2ZXJzZWQoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiZXN0QWNjdXJhY3lJbmRleCA9IHRoaXMuZ2V0QmVzdEFjY3VyYWN5SW5kZXgoYWNjdXJhY2llcyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRSYW5rID0gMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXg7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGFjY3VyYWNpZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAmJiBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UmFuaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50UmFuaysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJldmVyc2VkKGFycmF5OiBhbnlbXSkge1xyXG4gICAgICAgIGxldCBhcnJheUNvcHk6IGFueVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGFycmF5Q29weS5wdXNoKGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Q29weTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdGbGFzaChlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGZsYXNoU2l6ZTogbnVtYmVyID0gdGhpcy5nZXRGbGFzaFNpemUoZWxhcHNlZFRpbWVJblNlY29uZHMsIEFjY3VyYWN5RmVlZGJhY2tGbGFzaC5mbGFzaER1cmF0aW9uSW5TZWNvbmRzKTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICBwLmZpbGwoY29sb3IpO1xyXG4gICAgICAgIC8vIHAuZmlsbCgyNTUsIDI1NSwgMjU1LCAxNTApO1xyXG4gICAgICAgIHAubm9TdHJva2UoKTtcclxuICAgICAgICB0aGlzLmRyYXdTdGFyKHAsIDAsIDAsIGZsYXNoU2l6ZSwgZmxhc2hTaXplICogMC40LCA0KTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Rmxhc2hTaXplKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIGZsYXNoRHVyYXRpb25JblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBmbGFzaENvbXBsZXRpb25SYXRpbyA9IGVsYXBzZWRUaW1lSW5TZWNvbmRzIC8gZmxhc2hEdXJhdGlvbkluU2Vjb25kcztcclxuICAgICAgICBsZXQgbWluU2l6ZSA9IDA7XHJcbiAgICAgICAgbGV0IG1heFNpemUgPSB0aGlzLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZShtaW5TaXplLCBtYXhTaXplLCBmbGFzaENvbXBsZXRpb25SYXRpbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnBvbGF0ZShtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWUgKyAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKiByYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1N0YXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCByYWRpdXMxOiBudW1iZXIsIHJhZGl1czI6IG51bWJlciwgbnBvaW50czogbnVtYmVyKSB7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5hbmdsZU1vZGUocC5SQURJQU5TKTtcclxuICAgICAgICBsZXQgYW5nbGUgPSBwLlRXT19QSSAvIG5wb2ludHM7XHJcbiAgICAgICAgbGV0IGhhbGZBbmdsZSA9IGFuZ2xlIC8gMi4wO1xyXG4gICAgICAgIHAuYmVnaW5TaGFwZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgcC5UV09fUEk7IGEgKz0gYW5nbGUpIHtcclxuICAgICAgICAgICAgbGV0IHN4ID0gY2VudGVyWCArIHAuY29zKGEpICogcmFkaXVzMjtcclxuICAgICAgICAgICAgbGV0IHN5ID0gY2VudGVyWSArIHAuc2luKGEpICogcmFkaXVzMjtcclxuICAgICAgICAgICAgcC52ZXJ0ZXgoc3gsIHN5KTtcclxuICAgICAgICAgICAgc3ggPSBjZW50ZXJYICsgcC5jb3MoYSArIGhhbGZBbmdsZSkgKiByYWRpdXMxO1xyXG4gICAgICAgICAgICBzeSA9IGNlbnRlclkgKyBwLnNpbihhICsgaGFsZkFuZ2xlKSAqIHJhZGl1czE7XHJcbiAgICAgICAgICAgIHAudmVydGV4KHN4LCBzeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAuZW5kU2hhcGUocC5DTE9TRSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50fSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtQYXJ0aWNsZVN5c3RlbX0gZnJvbSBcIi4vcGFydGljbGVfc3lzdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlcyB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1Db2xvcmVkQWNjdXJhY3lSYW5rczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGljbGVzTGlmZXRpbWVJblNlY29uZHM6IG51bWJlciA9IDEuNTtcclxuICAgIHByaXZhdGUgcGFydGljbGVTZXR0aW5nczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHByaXZhdGUgcGFydGljbGVTeXN0ZW1zOiBQYXJ0aWNsZVN5c3RlbVtdO1xyXG4gICAgcHJpdmF0ZSBncmF2aXR5RGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5udW1Db2xvcmVkQWNjdXJhY3lSYW5rcyA9IHRoaXMuZ2V0TnVtQ29sb3JlZEFjY3VyYWN5UmFua3ModGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMucGFydGljbGVTZXR0aW5ncyA9IFtcclxuICAgICAgICAgICAgWzE3OCwgOTQsIDI0NywgMzBdLFxyXG4gICAgICAgICAgICBbMzAsIDIxNywgMTI0LCAyNV0sXHJcbiAgICAgICAgICAgIFsxOTYsIDE5OSwgMzAsIDIwXSxcclxuICAgICAgICAgICAgWzI0NSwgMjEzLCAyMjEsIDE1XVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgd2hpbGUgKHRoaXMubnVtQ29sb3JlZEFjY3VyYWN5UmFua3MgPiB0aGlzLnBhcnRpY2xlU2V0dGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTZXR0aW5ncy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgW3RoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIHRoaXMuZ2V0UmFuZG9tSW50KDI1NSksIDIwXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5RGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLkRvd24gPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IGdyYXZpdHk6IHA1LlZlY3RvciA9IHAuY3JlYXRlVmVjdG9yKDAsIDIwMDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zLnB1c2gobmV3IFBhcnRpY2xlU3lzdGVtKEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMucGFydGljbGVzTGlmZXRpbWVJblNlY29uZHMsIGdyYXZpdHkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMubnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zW3RyYWNrTnVtYmVyXS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBhcnRpY2xlc0ZvckFjY3VyYWN5RXZlbnQoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRXZlbnRGb3JQYXJ0aWNsZXMoYWNjdXJhY3lFdmVudCkpIHtcclxuICAgICAgICAgICAgbGV0IHJlY2VwdG9yVGltZVBvc2l0aW9uID0gYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzIC0gYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyAvIDEwMDA7XHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsUG9zaXRpb24gPSB0aGlzLmdldEluaXRpYWxQb3NpdGlvbihwLCBhY2N1cmFjeUV2ZW50LnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyxcclxuICAgICAgICAgICAgICAgIHJlY2VwdG9yVGltZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGluaXRpYWxWZWxvY2l0eSA9IHAuY3JlYXRlVmVjdG9yKDAsIC01MDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGVTZXR0aW5nczoge2NvbG9yOiBwNS5Db2xvciwgbnVtUGFydGljbGVzOiBudW1iZXIgfSA9IHRoaXMuZ2V0UGFydGljbGVTZXR0aW5ncyhhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbYWNjdXJhY3lFdmVudC50cmFja051bWJlcl0uYWRkUmFuZG9taXplZFBhcnRpY2xlcyhpbml0aWFsUG9zaXRpb24sIGluaXRpYWxWZWxvY2l0eSxcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQudGltZUluU2Vjb25kcywgcGFydGljbGVTZXR0aW5ncy5udW1QYXJ0aWNsZXMsIHBhcnRpY2xlU2V0dGluZ3MuY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEluaXRpYWxQb3NpdGlvbihwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY2VudGVyVGltZUluU2Vjb25kcywgY2VudGVyVGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlVmVjdG9yKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNFdmVudEZvclBhcnRpY2xlcyhhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWNpZXMgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzIDwgYWNjdXJhY2llc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gSGFuZGxlIG1pc3MgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY2N1cmFjaWVzW2FjY3VyYWNpZXMubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgICAgIGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPj0gYWNjdXJhY2llc1thY2N1cmFjaWVzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXRQYXJ0aWNsZVNldHRpbmdzKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY2llcyA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuayA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5rKGFjY3VyYWN5RXZlbnQsIGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBwYXJ0aWNsZVNldHRpbmdzID0gdGhpcy5wYXJ0aWNsZVNldHRpbmdzW2FjY3VyYWN5UmFuayAtIDFdO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiB7Y29sb3I6IHAuY29sb3IocGFydGljbGVTZXR0aW5nc1swXSwgcGFydGljbGVTZXR0aW5nc1sxXSwgcGFydGljbGVTZXR0aW5nc1syXSksXHJcbiAgICAgICAgICAgIG51bVBhcnRpY2xlczogcGFydGljbGVTZXR0aW5nc1szXX07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXNzdW1lcyBzeW1tZXRyaWNhbCBhY2N1cmFjeSBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSBnZXROdW1Db2xvcmVkQWNjdXJhY3lSYW5rcyhhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgbGV0IGJlc3RBY2N1cmFjeUluZGV4ID0gdGhpcy5nZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzKTtcclxuICAgICAgICBsZXQgbnVtUmFua3MgPSAxOyAvLyBzdGFydCB3aXRoIDEgYmVjYXVzZSB3ZSBhdCBsZWFzdCBoYXZlIHRoZSBiZXN0IHJhbmtcclxuICAgICAgICBmb3IgKGxldCBpID0gYmVzdEFjY3VyYWN5SW5kZXggKyAxOyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gYWNjdXJhY2llc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgIT09IHVuZGVmaW5lZCAmJiBhY2N1cmFjeS51cHBlckJvdW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG51bVJhbmtzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bVJhbmtzXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCZXN0QWNjdXJhY3lJbmRleChhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2N1cmFjaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IDAgJiYgMCA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIGEgcmFuayB3aGVyZSAxIGlzIHRoZSBiZXN0XHJcbiAgICBwcml2YXRlIGdldEFjY3VyYWN5UmFuayhhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50LCBhY2N1cmFjaWVzOiBBY2N1cmFjeVtdKSB7XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgPCAwKSB7XHJcbiAgICAgICAgICAgIGFjY3VyYWNpZXMgPSB0aGlzLmdldFJldmVyc2VkKGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmVzdEFjY3VyYWN5SW5kZXggPSB0aGlzLmdldEJlc3RBY2N1cmFjeUluZGV4KGFjY3VyYWNpZXMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50UmFuayA9IDE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJlc3RBY2N1cmFjeUluZGV4OyBpIDwgYWNjdXJhY2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSBhY2N1cmFjaWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMgJiYgYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcyA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFJhbms7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFJhbmsrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZXZlcnNlZChhcnJheTogYW55W10pIHtcclxuICAgICAgICBsZXQgYXJyYXlDb3B5OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBhcnJheUNvcHkucHVzaChhcnJheVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheUNvcHk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nLCBBY2N1cmFjeVJlY29yZGluZ0VudHJ5fSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dldEFjY3VyYWN5RXZlbnROYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lGZWVkYmFja1RleHQge1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGNlbnRlclg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBsYXN0RXZlbnQ6IEFjY3VyYWN5UmVjb3JkaW5nRW50cnkgPSB0aGlzLmdldE1vc3RSZWNlbnRBY2N1cmFjeVJlY29yZGluZ0VudHJ5KCk7XHJcbiAgICAgICAgaWYgKGxhc3RFdmVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0aW1lU2luY2VMYXN0RXZlbnQgPSBjdXJyZW50VGltZUluU2Vjb25kcyAtIGxhc3RFdmVudC50aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIGxldCB0ZXh0U2l6ZSA9IHRoaXMuZ2V0Rm9udFNpemUodGltZVNpbmNlTGFzdEV2ZW50KTtcclxuICAgICAgICBpZiAodGV4dFNpemUgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBldmVudE5hbWUgPSBnZXRBY2N1cmFjeUV2ZW50TmFtZShsYXN0RXZlbnQuYWNjdXJhY3lNaWxsaXMsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLmRyYXdFdmVudFRleHQoZXZlbnROYW1lLCB0ZXh0U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNb3N0UmVjZW50QWNjdXJhY3lSZWNvcmRpbmdFbnRyeSgpOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5IHtcclxuICAgICAgICBsZXQgbW9zdFJlY2VudFRyYWNrOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5W10gPSBbXTtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZy5sZW5ndGg7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgICAgICBpZiAodHJhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RFdmVudFRpbWUgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl1bdHJhY2subGVuZ3RoIC0gMV0udGltZUluU2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0RXZlbnRUaW1lID4gZ3JlYXRlc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlYXRlc3RUaW1lID0gbGFzdEV2ZW50VGltZTtcclxuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJhY2sgPSB0cmFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9zdFJlY2VudFRyYWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vc3RSZWNlbnRUcmFja1ttb3N0UmVjZW50VHJhY2subGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGb250U2l6ZSh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBtYXhGb250U2l6ZSA9IDMwO1xyXG4gICAgICAgIGlmICh0aW1lIDwgMC4xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lIC8gMC4xICogbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRpbWUgPj0gMC4xICYmIHRpbWUgPCAwLjQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEZvbnRTaXplO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aW1lID49IDAuNCAmJiB0aW1lIDwgMC43KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoMSAtICh0aW1lIC0gMC40KSAvICgwLjcgLSAwLjQpKSAqIG1heEZvbnRTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdFdmVudFRleHQodGV4dDogc3RyaW5nLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIsIHAuQ0VOVEVSKTtcclxuICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICBwLnRleHRTaXplKHRleHRTaXplKTtcclxuICAgICAgICBwLnRleHQodGV4dCwgdGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclkpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtLZXlTdGF0ZSwgUGxheWVyS2V5QWN0aW9ufSBmcm9tIFwiLi9wbGF5ZXJfa2V5X2FjdGlvblwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsb3dlckJvdW5kOiBudW1iZXI7XHJcbiAgICB1cHBlckJvdW5kOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sb3dlckJvdW5kID0gbG93ZXJCb3VuZDtcclxuICAgICAgICB0aGlzLnVwcGVyQm91bmQgPSB1cHBlckJvdW5kO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3lNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyO1xyXG4gICAgcHVibGljIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGNvbmZpZzogQ29uZmlnLCBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVBY2N1cmFjeUV2ZW50OiAoYWNjdXJhY3lFdmVudDogQWNjdXJhY3lFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gaG9sZE1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50ID0gaGFuZGxlQWNjdXJhY3lFdmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlUGxheWVyQWN0aW9uKGFjdGlvbjogUGxheWVyS2V5QWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5rZXlTdGF0ZSA9PSBLZXlTdGF0ZS5ET1dOKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJ5VG9IaXROb3RlKGFjdGlvbi5nYW1lVGltZSwgYWN0aW9uLnRyYWNrKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5rZXlTdGF0ZSA9PT0gS2V5U3RhdGUuVVApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZE1hbmFnZXIuaXNUcmFja0hlbGQoYWN0aW9uLnRyYWNrKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci51bmhvbGRUcmFjayhhY3Rpb24udHJhY2ssIGFjdGlvbi5nYW1lVGltZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeVRvUmVsZWFzZU5vdGUoYWN0aW9uLmdhbWVUaW1lLCBhY3Rpb24udHJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJ5VG9IaXROb3RlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4ID0gdGhpcy5nZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHMsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAobm90ZUluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5vdGU6IE5vdGUgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1bbm90ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG5vdGUudHlwZSA9PT0gTm90ZVR5cGUuTk9STUFMKSB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhJVDtcclxuICAgICAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IChub3RlLnRpbWVJblNlY29uZHMgLSBjdXJyZW50VGltZUluU2Vjb25kcykgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogbm90ZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSEVMRDsgLy8gc2V0IHRoZSBub3RlIHRvIGhlbGQgc28gaXQgd29uJ3QgY291bnQgYXMgYSBtaXNzXHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeSwgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3ksXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IG5vdGUudHlwZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci5ob2xkVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0NvbmZpZ3VyZWRGb3JCb29zKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogZ2V0QWNjdXJhY3lFdmVudE5hbWUoSW5maW5pdHksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0cmFja051bWJlcixcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBJbmZpbml0eSxcclxuICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgbm90ZVR5cGU6IE5vdGVUeXBlLk5PTkUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5UmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0gPSB0aGlzLmdldEFjY3VyYWN5UmFuZ2VJblNlY29uZHMoKTtcclxuICAgICAgICBsZXQgaGl0dGFibGVUaW1lUmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0gPVxyXG4gICAgICAgICAgICB0aGlzLmdldEhpdHRhYmxlUmFuZ2UoYWNjdXJhY3lSYW5nZSwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBoaXR0YWJsZUluZGV4UmFuZ2U6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0gPVxyXG4gICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLmdldE5vdGVzQnlUaW1lUmFuZ2UoaGl0dGFibGVUaW1lUmFuZ2UubGVhc3RUaW1lLCBoaXR0YWJsZVRpbWVSYW5nZS5ncmVhdGVzdFRpbWUsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFYXJsaWVzdFVuaGl0Tm90ZUluZGV4SW5SYW5nZSh0cmFja051bWJlciwgaGl0dGFibGVJbmRleFJhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY2N1cmFjeVJhbmdlSW5TZWNvbmRzKCkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVNldHRpbmdzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBsZXQgbnVtU2V0dGluZ3MgPSBhY2N1cmFjeVNldHRpbmdzLmxlbmd0aDtcclxuICAgICAgICBsZXQgbGVhc3RUaW1lID0gYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kID09IG51bGwgP1xyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzWzFdLmxvd2VyQm91bmQgOiBhY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQ7XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZTtcclxuICAgICAgICBpZiAoYWNjdXJhY3lTZXR0aW5nc1tudW1TZXR0aW5ncyAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMl0udXBwZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMV0udXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtsZWFzdFRpbWU6IGxlYXN0VGltZSAvIDEwMDAsIGdyZWF0ZXN0VGltZTogZ3JlYXRlc3RUaW1lIC8gMTAwMH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGl0dGFibGVSYW5nZShhY2N1cmFjeVJhbmdlOiB7IGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciB9LCByZWNlcHRvclRpbWVQb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVhc3RUaW1lOiByZWNlcHRvclRpbWVQb3NpdGlvbiArIGFjY3VyYWN5UmFuZ2UubGVhc3RUaW1lLFxyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWU6IHJlY2VwdG9yVGltZVBvc2l0aW9uICsgYWNjdXJhY3lSYW5nZS5ncmVhdGVzdFRpbWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWFybGllc3RVbmhpdE5vdGVJbmRleEluUmFuZ2UodHJhY2tOdW1iZXI6IG51bWJlciwgbm90ZUluZGV4UmFuZ2U6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gbm90ZUluZGV4UmFuZ2Uuc3RhcnRJbmRleDsgaSA8IG5vdGVJbmRleFJhbmdlLmVuZEluZGV4Tm90SW5jbHVzaXZlOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtpXS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb25maWd1cmVkRm9yQm9vcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0cnlUb1JlbGVhc2VOb3RlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4ID0gdGhpcy5nZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHMsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAobm90ZUluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1bbm90ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG5vdGUudHlwZSA9PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG9sZCA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXggLSAxXTsgLy8gZ2V0IHRoZSBob2xkIGJlbG9uZ2luZyB0byB0aGlzIHRhaWxcclxuICAgICAgICAgICAgICAgIGhvbGQuc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBjaGFuZ2UgdGhlIGhvbGQgc3RhdGUgZnJvbSBIRUxEIHRvIEhJVFxyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgdGFpbCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TmFtZTogXCJSZWxlYXNlIFwiICsgZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFja051bWJlcjogdHJhY2tOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBub3RlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IC8vIGxldCBnbyB0b28gZWFybHlcclxuICAgICAgICAgICAgLy8gQ291bGQgdGhpcyByZXR1cm4gLTE/XHJcbiAgICAgICAgICAgIGxldCBob2xkU3RhcnRJbmRleCA9IHRoaXMubm90ZU1hbmFnZXIuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoY3VycmVudFRpbWVJblNlY29uZHMsIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgICAgIGxldCBob2xkID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4IC0gMV07XHJcbiAgICAgICAgICAgIGxldCB0YWlsID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4XTtcclxuICAgICAgICAgICAgaWYgKGhvbGQudHlwZSA9PSBOb3RlVHlwZS5IT0xEX0hFQUQgJiYgdGFpbC50eXBlID09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtob2xkU3RhcnRJbmRleCAtIDFdLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSBzdGFydCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4XS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgdGFpbCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50KHtcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IFwiUmVsZWFzZSBcIiArIGdldEFjY3VyYWN5RXZlbnROYW1lKEluZmluaXR5LCB0aGlzLmNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5TWlsbGlzOiBJbmZpbml0eSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlVHlwZTogTm90ZVR5cGUuTk9ORSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogSXQncyBwb3NzaWJsZSB0aGF0IHRoaXMgaXMgc29tZXRoaW5nIGxpa2UgYSByYWNlIGNvbmRpdGlvbiBiZXR3ZWVuIHRoZSBrZXkgZXZlbnQgYW5kIHRoZSBhbmltYXRpb24gbG9vcC4gRG9uJ3QgdGhyb3cgYW4gZXJyb3IgZm9yIG5vd1xyXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgXCJFcnJvcjogUmVsZWFzZSBtaXNzIGZhaWxlZCB0byB0cmlnZ2VyIG9uIG5vdGUgaW5kZXggXCIgKyAoaG9sZFN0YXJ0SW5kZXggLSAxKSArIFwiLCB0cmFjayBpbmRleCBcIiArIHRyYWNrTnVtYmVyICsgXCIgYXQgdGltZSBcIiArIGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5cclxuZXhwb3J0IGVudW0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZSB7XHJcbiAgICBJTkNPTVBMRVRFLFxyXG4gICAgUkVBRFksXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWNjdXJhY3lFdmVudCB7XHJcbiAgICBhY2N1cmFjeU5hbWU6IHN0cmluZyxcclxuICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICBhY2N1cmFjeU1pbGxpczogbnVtYmVyLFxyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWNjdXJhY3lSZWNvcmRpbmdFbnRyeSB7XHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICBhY2N1cmFjeU1pbGxpczogbnVtYmVyLFxyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeVJlY29yZGluZyB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGU7XHJcbiAgICBwdWJsaWMgcmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZ0VudHJ5W11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlLklOQ09NUExFVEU7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmcgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkaW5nLnB1c2goW10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb3JkQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmdbYWNjdXJhY3lFdmVudC50cmFja051bWJlcl0ucHVzaChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogYWNjdXJhY3lFdmVudC50aW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lNaWxsaXM6IGFjY3VyYWN5RXZlbnQuYWNjdXJhY3lNaWxsaXMsXHJcbiAgICAgICAgICAgICAgICBub3RlVHlwZTogYWNjdXJhY3lFdmVudC5ub3RlVHlwZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQXVkaW9GaWxlU3RhdGUge1xyXG4gICAgTk9fQVVESU9fRklMRSxcclxuICAgIERPTkVfUkVBRElORyxcclxuICAgIEJVRkZFUkVELFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBdWRpb0ZpbGUge1xyXG4gICAgcHVibGljIHN0YXRlOiBBdWRpb0ZpbGVTdGF0ZTtcclxuICAgIHB1YmxpYyBmaWxlOiBGaWxlO1xyXG4gICAgcHVibGljIGF1ZGlvU291cmNlOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGU7XHJcbiAgICBwdWJsaWMgYXVkaW9Db250ZXh0OiBBdWRpb0NvbnRleHQ7XHJcbiAgICBwdWJsaWMgYXVkaW9CdWZmZXI6IEF1ZGlvQnVmZmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuTk9fQVVESU9fRklMRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZChmaWxlOiBwNS5GaWxlKSB7XHJcbiAgICAgICAgdGhpcy5maWxlID0gZmlsZS5maWxlOyAvLyB0aGlzIHVud3JhcHMgdGhlIHA1LkZpbGUgd3JhcHBlciB0byBnZXQgdGhlIG9yaWdpbmFsIERPTSBmaWxlXHJcbiAgICAgICAgbG9hZFNvdW5kRmlsZSh0aGlzLmZpbGUsICgob25GaWxlUmVhZDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKDxBcnJheUJ1ZmZlcj5vbkZpbGVSZWFkLnRhcmdldC5yZXN1bHQpLnRoZW4oKChidWZmZXI6IEF1ZGlvQnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpb0J1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2l0aCBkZWNvZGluZyBhdWRpbyBkYXRhXCIgKyBlLmVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREdXJhdGlvbigpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIuZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogRmFpbGVkIHRvIGV4ZWN1dGUgJ3N0YXJ0JyBvbiAnQXVkaW9CdWZmZXJTb3VyY2VOb2RlJzogY2Fubm90IGNhbGwgc3RhcnQgbW9yZSB0aGFuIG9uY2UuXHJcbiAgICBwdWJsaWMgcGxheShkZWxheUluU2Vjb25kczogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2Uuc3RhcnQodGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkZWxheUluU2Vjb25kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5zdG9wKDApO1xyXG4gICAgICAgIEF1ZGlvRmlsZVN0YXRlLkRPTkVfUkVBRElORztcclxuICAgICAgICB0aGlzLnJlY3JlYXRlU291cmNlTm9kZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjcmVhdGVTb3VyY2VOb2RlKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmJ1ZmZlciA9IHRoaXMuYXVkaW9CdWZmZXI7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFNvdW5kRmlsZShcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBsaXN0ZW5lcjogKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiBhbnksXHJcbiAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXHJcbikge1xyXG4gICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcclxuICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG59IiwiaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge2RlZmF1bHRJZlVuZGVmaW5lZH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge0RFRkFVTFRfQ09ORklHfSBmcm9tIFwiLi9kZWZhdWx0X2NvbmZpZ1wiO1xyXG5pbXBvcnQge0tleUJpbmRpbmd9IGZyb20gXCIuL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5cclxuLyogU3RvcmVzIHVzZXIgc2V0dGluZ3MuIEV4cGVjdGVkIG5vdCB0byBjaGFuZ2UgZHVyaW5nIHBsYXkgKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcbiAgICBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuICAgIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuICAgIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXTtcclxuICAgIHBhdXNlQXRTdGFydEluU2Vjb25kczogbnVtYmVyO1xyXG4gICAga2V5QmluZGluZ3M6IE1hcDxudW1iZXIsIEtleUJpbmRpbmdbXT47XHJcbiAgICBnYW1lQXJlYUhlaWdodDogbnVtYmVyO1xyXG4gICAgZ2FtZUFyZWFXaWR0aDogbnVtYmVyO1xyXG4gICAgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHF1aXRLZXk6IG51bWJlcjtcclxuICAgIGlzQWNjdXJhY3lGbGFzaEVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzQWNjdXJhY3lUZXh0RW5hYmxlZDogYm9vbGVhbjtcclxuICAgIGlzSG9sZFBhcnRpY2xlc0VuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpc0hvbGRHbG93RW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxzUGVyU2Vjb25kPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VwdG9yWVBlcmNlbnQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uPzogU2Nyb2xsRGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lTZXR0aW5ncz86IEFjY3VyYWN5W10sXHJcbiAgICAgICAgICAgICAgICAgICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleUJpbmRpbmdzPzogTWFwPG51bWJlciwgS2V5QmluZGluZ1tdPixcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYUhlaWdodD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYVdpZHRoPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTaXplPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1aXRLZXk/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeUZsYXNoRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWNjdXJhY3lUZXh0RW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNIb2xkUGFydGljbGVzRW5hYmxlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNIb2xkR2xvd0VuYWJsZWQ/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQXJlYUhlaWdodCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmdhbWVBcmVhSGVpZ2h0LCBERUZBVUxUX0NPTkZJRy5nYW1lQXJlYUhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5nYW1lQXJlYVdpZHRoID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuZ2FtZUFyZWFXaWR0aCwgREVGQVVMVF9DT05GSUcuZ2FtZUFyZWFXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5waXhlbHNQZXJTZWNvbmQsIERFRkFVTFRfQ09ORklHLnBpeGVsc1BlclNlY29uZCk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5zY3JvbGxEaXJlY3Rpb24sIERFRkFVTFRfQ09ORklHLnNjcm9sbERpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIC8vIE5PVEU6IFNjcm9sbCBkaXJlY3Rpb24gYW5kIGdhbWVBcmVhSGVpZ2h0IG11c3QgYmUgc2V0IEJFRk9SRSBzZXR0aW5nIHJlY2VwdG9yWVBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5yZWNlcHRvcllQZXJjZW50ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucmVjZXB0b3JZUGVyY2VudCwgREVGQVVMVF9DT05GSUcucmVjZXB0b3JZUGVyY2VudCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMsIERFRkFVTFRfQ09ORklHLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lTZXR0aW5ncyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmFjY3VyYWN5U2V0dGluZ3MsIERFRkFVTFRfQ09ORklHLmFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMucGF1c2VBdFN0YXJ0SW5TZWNvbmRzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MucGF1c2VBdFN0YXJ0SW5TZWNvbmRzLCBERUZBVUxUX0NPTkZJRy5wYXVzZUF0U3RhcnRJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5ub3RlU2l6ZSwgREVGQVVMVF9DT05GSUcubm90ZVNpemUpO1xyXG4gICAgICAgIHRoaXMua2V5QmluZGluZ3MgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5rZXlCaW5kaW5ncywgREVGQVVMVF9DT05GSUcua2V5QmluZGluZ3MpO1xyXG4gICAgICAgIHRoaXMucXVpdEtleSA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnF1aXRLZXksIERFRkFVTFRfQ09ORklHLnF1aXRLZXkpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCxcclxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUcuaXNBY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNBY2N1cmFjeVRleHRFbmFibGVkID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuaXNBY2N1cmFjeVRleHRFbmFibGVkLFxyXG4gICAgICAgICAgICBERUZBVUxUX0NPTkZJRy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNIb2xkUGFydGljbGVzRW5hYmxlZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMuaXNIb2xkR2xvd0VuYWJsZWQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5pc0hvbGRHbG93RW5hYmxlZCwgREVGQVVMVF9DT05GSUcuaXNIb2xkR2xvd0VuYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZlKCkge1xyXG4gICAgICAgIGxldCBjb25maWdTdHJpbmcgPSB0aGlzLmdldENvbmZpZ0FzU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IGV4cGlyZXMgPSB0aGlzLmdldERhdGVPZk9uZVllYXJGcm9tTm93KCk7XHJcbiAgICAgICAgbGV0IHBhdGggPSAnLyc7XHJcbiAgICAgICAgbGV0IGNvb2tpZVN0cmluZyA9IFwiY29uZmlnPVwiICsgZXNjYXBlKGNvbmZpZ1N0cmluZylcclxuICAgICAgICAgICAgKyAnO3BhdGg9JyArIHBhdGhcclxuICAgICAgICAgICAgKyAnO2V4cGlyZXM9JyArIGV4cGlyZXMudG9VVENTdHJpbmcoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb29raWVTdHJpbmcpO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZVN0cmluZztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZyBzYXZlZCB0byBjb29raWUhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29uZmlnQXNTdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZzogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoJyxcImtleUJpbmRpbmdzXCI6e30sJyxcclxuICAgICAgICAgICAgJyxcImtleUJpbmRpbmdzXCI6JyArIHRoaXMuc3RyaW5naWZ5S2V5QmluZGluZ3MoKSArICcsJyk7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWQoKTogQ29uZmlnIHtcclxuICAgICAgICBsZXQgY29uZmlnQ29va2llID0gQ29uZmlnLmdldEZyb21Db29raWUoXCJjb25maWdcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29uZmlnQ29va2llKTtcclxuICAgICAgICBpZiAoY29uZmlnQ29va2llICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnSlNPTiA9IEpTT04ucGFyc2UodW5lc2NhcGUoY29uZmlnQ29va2llKSk7XHJcbiAgICAgICAgICAgICAgICBjb25maWdKU09OLmtleUJpbmRpbmdzID0gbmV3IE1hcChjb25maWdKU09OLmtleUJpbmRpbmdzKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWc6IENvbmZpZyA9IG5ldyBDb25maWcoY29uZmlnSlNPTik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZyBsb2FkZWQgZnJvbSBjb29raWUhXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge31cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyB2YWxpZCBjb29raWUgZm91bmQsIHJldHVybmluZyBkZWZhdWx0IGNvbmZpZyFcIik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb25maWcoe30pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGF0ZU9mT25lWWVhckZyb21Ob3coKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdHJpbmdpZnlLZXlCaW5kaW5ncygpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHJpbmcgPSBcIltcIjtcclxuICAgICAgICB0aGlzLmtleUJpbmRpbmdzLmZvckVhY2goKHZhbHVlOiBLZXlCaW5kaW5nW10sIGtleTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHN0cmluZyArPSBcIltcIisga2V5ICsgXCIsXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgK1wiXVwiO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3RyaW5nICs9IFwiXVwiO1xyXG4gICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RnJvbUNvb2tpZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiOyBcIilcclxuICAgICAgICAgICAgICAgIC5maW5kKHJvdyA9PiByb3cuc3RhcnRzV2l0aChrZXkpKVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiPVwiKVsxXTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBsZXQgREVGQVVMVF9DT05GSUcgPSB7XHJcbiAgICBwaXhlbHNQZXJTZWNvbmQ6IDU1MCxcclxuICAgIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uLkRvd24sXHJcbiAgICByZWNlcHRvcllQZXJjZW50OiAxNSxcclxuICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM6IDAsXHJcbiAgICAvLyBUaGlzIGlzIGEgc3ltbWV0cmljYWwgdmVyc2lvbiBvZiBGRlIncyBhY2N1cmFjeVxyXG4gICAgLy8gVE9ETzogQWRkIGEgbGlzdCBvZiBwcmVzZXRzIHRoYXQgbGl2ZSBpbiB0aGVpciBvd24gZmlsZVxyXG4gICAgLy8gVE9ETzogdmFsaWRhdGlvbiBvbiBhY2N1cmFjeSBzZXR0aW5ncyB0aGF0IGV4cGxhaW5zIHdoeSBtaXNzIHNob3VsZG4ndCBoYXZlIGxvd2VyIGJvdW5kXHJcbiAgICBhY2N1cmFjeVNldHRpbmdzOiBbXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiTWlzc1wiLCBudWxsLC0xMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkF2ZXJhZ2VcIiwgLTExNywgLTgzKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJHb29kXCIsIC04MywgLTUwKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJQZXJmZWN0XCIsIC01MCwgLTE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBbWF6aW5nXCIsIC0xNywgMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIlBlcmZlY3RcIiwgMTcsIDUwKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJHb29kXCIsIDUwLCA4MyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQXZlcmFnZVwiLCA4MywgMTE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJCb29cIiwgMTE3LCBudWxsKVxyXG4gICAgXSxcclxuICAgIHBhdXNlQXRTdGFydEluU2Vjb25kczogMCxcclxuICAgIGtleUJpbmRpbmdzOiBuZXcgTWFwKCksXHJcbiAgICBnYW1lQXJlYUhlaWdodDogNjAwLFxyXG4gICAgZ2FtZUFyZWFXaWR0aDogNDAwLFxyXG4gICAgbm90ZVNpemU6IDMwLFxyXG4gICAgcXVpdEtleTogMjcsIC8vIFF1aXQgZGVmYXVsdHMgdG8gZXNjYXBlIGtleVxyXG4gICAgaXNBY2N1cmFjeUZsYXNoRW5hYmxlZDogdHJ1ZSxcclxuICAgIGlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNBY2N1cmFjeVRleHRFbmFibGVkOiB0cnVlLFxyXG4gICAgaXNIb2xkUGFydGljbGVzRW5hYmxlZDogdHJ1ZSxcclxuICAgIGlzSG9sZEdsb3dFbmFibGVkOiB0cnVlLFxyXG59OyIsImltcG9ydCB7Tm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZmF1bHROb3RlU2tpbiB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdOb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVR5cGU6IE5vdGVUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gbm90ZVNpemU7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IG5vdGVTaXplO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgIHN3aXRjaCAobm90ZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJ2XCIsIGNlbnRlclgsIGNlbnRlclkgKyA2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlRBSUw6XHJcbiAgICAgICAgICAgICAgICBwLm5vRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlJPTExfSEVBRDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwieFwiLCBjZW50ZXJYLCBjZW50ZXJZICsgNik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5NSU5FOlxyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLmNpcmNsZShjZW50ZXJYLCBjZW50ZXJZLCAyNCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwiWFwiLCBjZW50ZXJYLCBjZW50ZXJZICsgOCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcIj9cIiwgY2VudGVyWCwgY2VudGVyWSArIDcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3UmVjZXB0b3IodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gbm90ZVNpemU7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IG5vdGVTaXplO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd0hvbGRDb25uZWN0b3IoY2VudGVyWDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZSAqIDAuNTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgc3RhcnRZLCB3aWR0aCwgZW5kWSAtIHN0YXJ0WSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0RlZmF1bHROb3RlU2tpbn0gZnJvbSBcIi4vZGVmYXVsdF9ub3RlX3NraW5cIjtcclxuXHJcbmNsYXNzIE5vdGVEaXNwbGF5IHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIGNlbnRlclk6IG51bWJlcjtcclxuICAgIG5vdGVUeXBlOiBOb3RlVHlwZTtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG4gICAgcHJpdmF0ZSBub3RlU2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0cmFja051bWJlcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVR5cGU6IE5vdGVUeXBlLCBza2V0Y2hJbnN0YW5jZTogcDUsIG5vdGVTaXplOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcbiAgICAgICAgdGhpcy5ub3RlVHlwZSA9IG5vdGVUeXBlO1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBub3RlU2l6ZTtcclxuICAgICAgICB0aGlzLnRyYWNrTnVtYmVyID0gdHJhY2tOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaXNOb3RlRHJhd1N1Y2Nlc3NmdWwgPSBnbG9iYWwubm90ZVNraW4uZHJhd05vdGUodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCxcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVUeXBlLCB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICBpZiAoIWlzTm90ZURyYXdTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgIERlZmF1bHROb3RlU2tpbi5kcmF3Tm90ZSh0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclksIHRoaXMubm90ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEhvbGRDb25uZWN0b3Ige1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgc3RhcnRZOiBudW1iZXI7XHJcbiAgICBlbmRZOiBudW1iZXI7XHJcbiAgICBub3RlU3RhcnRZOiBudW1iZXI7XHJcbiAgICBub3RlRW5kWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZW5kWTogbnVtYmVyLCBub3RlU3RhcnRZOiBudW1iZXIsIG5vdGVFbmRZOiBudW1iZXIsIHNrZXRjaEluc3RhbmNlOiBwNSkge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuc3RhcnRZID0gc3RhcnRZO1xyXG4gICAgICAgIHRoaXMuZW5kWSA9IGVuZFk7XHJcbiAgICAgICAgdGhpcy5ub3RlU3RhcnRZID0gbm90ZVN0YXJ0WTtcclxuICAgICAgICB0aGlzLm5vdGVFbmRZID0gbm90ZUVuZFk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaXNDb25uZWN0b3JEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3SG9sZENvbm5lY3Rvcih0aGlzLmNlbnRlclgsIHRoaXMuc3RhcnRZLCB0aGlzLmVuZFksXHJcbiAgICAgICAgICAgIHRoaXMubm90ZVN0YXJ0WSwgdGhpcy5ub3RlRW5kWSk7XHJcbiAgICAgICAgaWYgKCFpc0Nvbm5lY3RvckRyYXdTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgIERlZmF1bHROb3RlU2tpbi5kcmF3SG9sZENvbm5lY3Rvcih0aGlzLmNlbnRlclgsIHRoaXMuc3RhcnRZLCB0aGlzLmVuZFkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUmVjZXB0b3Ige1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIG5vdGVTaXplOiBudW1iZXJcclxuICAgIHByaXZhdGUgdHJhY2tOdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHNrZXRjaEluc3RhbmNlOiBwNSwgbm90ZVNpemU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gbm90ZVNpemU7XHJcbiAgICAgICAgdGhpcy50cmFja051bWJlciA9IHRyYWNrTnVtYmVyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzUmVjZXB0b3JEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3UmVjZXB0b3IodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCxcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVTaXplKTtcclxuICAgICAgICBpZiAoIWlzUmVjZXB0b3JEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd1JlY2VwdG9yKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBleHBvcnQgY2xhc3MgRGlzcGxheUNvbmZpZyB7XHJcbi8vICAgICBwdWJsaWMgbm90ZVNpemU6IG51bWJlcjtcclxuLy8gICAgIHB1YmxpYyBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuLy8gICAgIHB1YmxpYyByZWNlcHRvcllQZXJjZW50OiBudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbi8vICAgICBwdWJsaWMgcmVjZXB0b3JTaXplczogbnVtYmVyW107XHJcbi8vXHJcbi8vICAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuLy8gICAgICAgICB0aGlzLm5vdGVTaXplID0gY29uZmlnLm5vdGVTaXplO1xyXG4vLyAgICAgICAgIHRoaXMucGl4ZWxzUGVyU2Vjb25kID0gY29uZmlnLnBpeGVsc1BlclNlY29uZDtcclxuLy8gICAgICAgICB0aGlzLnJlY2VwdG9yWVBlcmNlbnQgPSBjb25maWcucmVjZXB0b3JZUGVyY2VudDtcclxuLy8gICAgICAgICB0aGlzLnNjcm9sbERpcmVjdGlvbiA9IGNvbmZpZy5zY3JvbGxEaXJlY3Rpb247XHJcbi8vICAgICAgICAgdGhpcy5yZWNlcHRvclNpemVzID0gW107XHJcbi8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4vLyAgICAgICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMucHVzaChjb25maWcubm90ZVNpemUpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLyogQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGludGVyc2VjdCB3aXRoIHRoZSB1c2VyIENvbmZpZywgYnV0IGFyZSBleHBlY3RlZCB0byBiZSBjaGFuZ2VkIGR1cmluZyBwbGF5ICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGxheUNvbmZpZyB7XHJcbiAgICBnZXROb3RlU2l6ZTogKCkgPT4gbnVtYmVyO1xyXG4gICAgZ2V0UGl4ZWxzUGVyU2Vjb25kOiAoKSA9PiBudW1iZXI7XHJcbiAgICBnZXRSZWNlcHRvcllQZXJjZW50OiAoKSA9PiBudW1iZXI7XHJcbiAgICBnZXRTY3JvbGxEaXJlY3Rpb246ICgpID0+IFNjcm9sbERpcmVjdGlvbjtcclxuICAgIGdldFJlY2VwdG9yU2l6ZXM6ICgpID0+IG51bWJlcltdO1xyXG4gICAgc2V0UmVjZXB0b3JTaXplOiAodHJhY2tOdW1iZXI6IG51bWJlciwgcmVjZXB0b3JTaXplOiBudW1iZXIpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEaXNwbGF5TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWcsIHNrZXRjaEluc3RhbmNlOiBwNSwgdG9wTGVmdFg6IG51bWJlciA9IDAsXHJcbiAgICAgICAgICAgICAgICB0b3BMZWZ0WTogbnVtYmVyID0gMCwgd2lkdGg6IG51bWJlciA9IDE4MCwgaGVpZ2h0OiBudW1iZXIgPSA0MDApIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlDb25maWcgPSBkaXNwbGF5Q29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzID0gMDtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy50b3BMZWZ0WCA9IHRvcExlZnRYO1xyXG4gICAgICAgIHRoaXMudG9wTGVmdFkgPSB0b3BMZWZ0WTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gdGhpcy5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZS5yZWN0KHRoaXMudG9wTGVmdFgsIHRoaXMudG9wTGVmdFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRyYXdOb3Rlc0FuZENvbm5lY3RvcnMoKTtcclxuICAgICAgICB0aGlzLmRyYXdSZWNlcHRvcnMoKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGVzQW5kQ29ubmVjdG9ycygpIHtcclxuICAgICAgICBsZXQgbGVhc3RUaW1lID0gdGhpcy5nZXRMZWFzdFRpbWUodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZSA9IHRoaXMuZ2V0R3JlYXRlc3RUaW1lKHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuZHJhd0FsbENvbm5lY3RvcnMobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0FsbE5vdGVzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBbGxOb3RlcyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Tm90ZXNJblRyYWNrKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCBpLCBudW1UcmFja3MsIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3Rlc0luVHJhY2sobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVJbmRleFJhbmdlID0gdGhpcy5ub3RlTWFuYWdlci5nZXROb3Rlc0J5VGltZVJhbmdlKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgbGV0IG5vdGVzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdLnNsaWNlKG5vdGVJbmRleFJhbmdlLnN0YXJ0SW5kZXgsIG5vdGVJbmRleFJhbmdlLmVuZEluZGV4Tm90SW5jbHVzaXZlKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd05vdGUobm90ZXNbaV0sIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZShub3RlOiBOb3RlLCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChub3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKG5vdGUudGltZUluU2Vjb25kcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICBuZXcgTm90ZURpc3BsYXkoeCwgeSwgbm90ZS50eXBlLCB0aGlzLnNrZXRjaEluc3RhbmNlLCB0aGlzLmRpc3BsYXlDb25maWcuZ2V0Tm90ZVNpemUoKSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcykuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExlYXN0VGltZShjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsRGlzcGxheVNlY29uZHMgPSB0aGlzLmdldERpc3BsYXlIZWlnaHQoKSAvIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRQaXhlbHNQZXJTZWNvbmQoKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWUgLSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JZUGVyY2VudCgpIC8gMTAwICogdG90YWxEaXNwbGF5U2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdyZWF0ZXN0VGltZShjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsRGlzcGxheVNlY29uZHMgPSB0aGlzLmdldERpc3BsYXlIZWlnaHQoKSAvIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRQaXhlbHNQZXJTZWNvbmQoKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWUgKyAoMSAtIHRoaXMuZGlzcGxheUNvbmZpZy5nZXRSZWNlcHRvcllQZXJjZW50KCkgLyAxMDApICogdG90YWxEaXNwbGF5U2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcmVjZXB0b3JTcGFjaW5nID0gdGhpcy5nZXREaXNwbGF5V2lkdGgoKSAvIG51bVRyYWNrcyAtIHRoaXMuZGlzcGxheUNvbmZpZy5nZXROb3RlU2l6ZSgpO1xyXG4gICAgICAgIHJldHVybiAoMiAqIHRyYWNrTnVtYmVyICsgMSkgLyAyICogKHRoaXMuZGlzcGxheUNvbmZpZy5nZXROb3RlU2l6ZSgpICsgcmVjZXB0b3JTcGFjaW5nKSArIHRoaXMudG9wTGVmdFg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBlc3NlbnRpYWxseSBkZWZpbmVzIGEgY29udmVyc2lvbiBmcm9tIHNlY29uZHMgdG8gcGl4ZWxzXHJcbiAgICBwdWJsaWMgZ2V0Tm90ZUNlbnRlclkobm90ZVRpbWVJblNlY29uZHM6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlWU9mZnNldCA9IHRoaXMuZGlzcGxheUNvbmZpZy5nZXRQaXhlbHNQZXJTZWNvbmQoKSAqIChub3RlVGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgcmVjZXB0b3JZT2Zmc2V0ID0gdGhpcy5kaXNwbGF5Q29uZmlnLmdldFJlY2VwdG9yWVBlcmNlbnQoKSAvIDEwMCAqIHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlDb25maWcuZ2V0U2Nyb2xsRGlyZWN0aW9uKCkgPT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNlcHRvcllPZmZzZXQgKyBub3RlWU9mZnNldCArIHRoaXMudG9wTGVmdFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC0gKHJlY2VwdG9yWU9mZnNldCArIG5vdGVZT2Zmc2V0KSArIHRoaXMudG9wTGVmdFk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheVdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbENvbm5lY3RvcnMobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0FsbFRyYWNrQ29ubmVjdG9ycyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgdHJhY2tzW2ldLCBpLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzLmxlbmd0aCwgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbFRyYWNrQ29ubmVjdG9ycyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrOiBOb3RlW10sIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZVN0YWNrOiBOb3RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm90ZTogTm90ZSA9IHRyYWNrW2ldO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudGltZUluU2Vjb25kcyA8IGxlYXN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudGltZUluU2Vjb25kcyA8IGdyZWF0ZXN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnROb3RlID0gbm90ZVN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmROb3RlID0gY3VycmVudE5vdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0Tm90ZSAhPSB1bmRlZmluZWQgJiYgZW5kTm90ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQgfHwgc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5IRUxEKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kTm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZSwgZW5kTm90ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vdGVTdGFjay5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnROb3RlID0gbm90ZVN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmROb3RlID0gY3VycmVudE5vdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0Tm90ZSAhPSB1bmRlZmluZWQgJiYgZW5kTm90ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQgfHwgc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5IRUxEKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kTm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZSwgZW5kTm90ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0Nvbm5lY3RvcihzdGFydE5vdGU6IE5vdGUsIGVuZE5vdGU6IE5vdGUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBub3RlU3RhcnRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShzdGFydE5vdGUudGltZUluU2Vjb25kcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIGxldCBub3RlRW5kWSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkoZW5kTm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcblxyXG4gICAgICAgIGxldCBkcmF3U3RhcnRZO1xyXG4gICAgICAgIGlmIChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpIHtcclxuICAgICAgICAgICAgZHJhd1N0YXJ0WSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkoTWF0aC5taW4oY3VycmVudFRpbWUsIGVuZE5vdGUudGltZUluU2Vjb25kcyksIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkcmF3U3RhcnRZID0gbm90ZVN0YXJ0WTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJhd1N0YXJ0WSA9IHRoaXMuY2xhbXBWYWx1ZVRvUmFuZ2UoZHJhd1N0YXJ0WSwgdGhpcy50b3BMZWZ0WSwgdGhpcy50b3BMZWZ0WSArIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IGRyYXdFbmRZID0gbm90ZUVuZFlcclxuICAgICAgICBkcmF3RW5kWSA9IHRoaXMuY2xhbXBWYWx1ZVRvUmFuZ2UoZHJhd0VuZFksIHRoaXMudG9wTGVmdFksIHRoaXMudG9wTGVmdFkgKyB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIG5ldyBIb2xkQ29ubmVjdG9yKGNlbnRlclgsIGRyYXdTdGFydFksIGRyYXdFbmRZLCBub3RlU3RhcnRZLCBub3RlRW5kWSwgdGhpcy5za2V0Y2hJbnN0YW5jZSkuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xhbXBWYWx1ZVRvUmFuZ2UodmFsdWU6IG51bWJlciwgbG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IGxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvd2VyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSA+IHVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdSZWNlcHRvcnMoKSB7XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ldyBSZWNlcHRvcih0aGlzLmdldE5vdGVDZW50ZXJYKGksIG51bVRyYWNrcyksIHRoaXMuZ2V0Tm90ZUNlbnRlclkodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcywgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlLCB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JTaXplcygpW2ldLCBpLCBudW1UcmFja3MpLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG4vKiBMZXRzIHVzIGNvZGUgdGhlIERPTSBVSSBlbGVtZW50cyBhcyBpZiBpdCB3ZXJlIFwiaW1tZWRpYXRlXCIsIGkuZS4gc3RhdGVsZXNzLlxyXG4gKiBBbGwgcmVnaXN0ZXJlZCBlbGVtZW50cyBhcmUgcmVtb3ZlZCB3aGVuIHRoZSBwYWdlIGNoYW5nZXNcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBET01XcmFwcGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlZ2lzdHJ5OiBNYXA8c3RyaW5nLCBwNS5FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvLyB1bmlxdWVJRCBzaG91bGQgYmUgdW5pcXVlIHdpdGhpbiBhIHNjZW5lXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShjcmVhdGVDYWxsOiAoKSA9PiBwNS5FbGVtZW50LCB1bmlxdWVJZDogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJ5Lmhhcyh1bmlxdWVJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMucmVnaXN0cnkuZ2V0KHVuaXF1ZUlkKSxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUNhbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5zZXQodW5pcXVlSWQsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJSZWdpc3RyeSgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmZvckVhY2goKHZhbHVlLCBrZXksIG1hcCkgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIHJlbW92ZSB3YXMgc3VjY2Vzc2Z1bCwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyeS5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuZ2V0KGlkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGVsZW1lbnQgaWYgZm91bmQsIG90aGVyd2lzZSByZXR1cm5zIHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChpZCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3QWNjdXJhY3lCYXJzKHA6IHA1LCBhY2N1cmFjeUxhYmVsczogc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhckhlaWdodDogbnVtYmVyLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyKSB7XHJcbiAgICBsZXQgbWF4VGV4dFdpZHRoID0gZ2V0TWF4VGV4dFdpZHRoKHAsIGFjY3VyYWN5TGFiZWxzLCB0ZXh0U2l6ZSk7XHJcbiAgICBsZXQgdG90YWxOb3RlcyA9IG5vdGVNYW5hZ2VyLmdldFRvdGFsTm90ZXMoKTtcclxuICAgIGxldCBiYXJTcGFjaW5nID0gMTA7XHJcbiAgICBsZXQgdG90YWxIZWlnaHQgPSBhY2N1cmFjeUxhYmVscy5sZW5ndGggKiBiYXJIZWlnaHQgKyAoYWNjdXJhY3lMYWJlbHMubGVuZ3RoIC0gMSkgKiBiYXJTcGFjaW5nO1xyXG4gICAgbGV0IHN0YXJ0WSA9IChwLmhlaWdodCAtIHRvdGFsSGVpZ2h0KSAvIDIgKyBiYXJIZWlnaHQgLyAyO1xyXG4gICAgc3RhcnRZICo9IDAuODsgLy8gc2hpZnQgdGhlIHJlc3VsdHMgdXAgdG8gbWFrZSByb29tIGZvciBleGl0IGJ1dHRvblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2N1cmFjeUxhYmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeUxhYmVsID0gYWNjdXJhY3lMYWJlbHNbaV07XHJcbiAgICAgICAgbGV0IG51bUFjY3VyYWN5RXZlbnRzID0gZ2V0TnVtQWNjdXJhY3lFdmVudHMoYWNjdXJhY3lMYWJlbCwgYWNjdXJhY3lSZWNvcmRpbmcsIGFjY3VyYWN5TWFuYWdlcik7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRGaWxsZWQgPSBudW1BY2N1cmFjeUV2ZW50cyAvIHRvdGFsTm90ZXM7XHJcbiAgICAgICAgZHJhd0FjY3VyYWN5QmFyKHAsIGNlbnRlclgsIHN0YXJ0WSArIGkgKiAoYmFySGVpZ2h0ICsgYmFyU3BhY2luZyksIGFjY3VyYWN5TGFiZWwsIG51bUFjY3VyYWN5RXZlbnRzLnRvU3RyaW5nKCksIHRvdGFsTm90ZXMudG9TdHJpbmcoKSwgdGV4dFNpemUsIG1heFRleHRXaWR0aCwgYmFyV2lkdGgsIGJhckhlaWdodCwgcGVyY2VudEZpbGxlZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE51bUFjY3VyYWN5RXZlbnRzKGFjY3VyYWN5TGFiZWw6IHN0cmluZywgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcikge1xyXG4gICAgcmV0dXJuIGFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZy5yZWR1Y2UoKHN1bSwgdHJhY2tSZWNvcmRpbmcpID0+XHJcbiAgICAgICAgc3VtICsgdHJhY2tSZWNvcmRpbmcuZmlsdGVyKGFjY3VyYWN5RXZlbnQgPT5cclxuICAgICAgICBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzLCBhY2N1cmFjeU1hbmFnZXIuY29uZmlnKSA9PT0gYWNjdXJhY3lMYWJlbCkubGVuZ3RoLCAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWF4VGV4dFdpZHRoKHA6IHA1LCB0ZXh0QXJyYXk6IHN0cmluZ1tdLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IHRleHRBcnJheS5tYXAoKHN0cmluZykgPT4gcC50ZXh0V2lkdGgoc3RyaW5nKSlcclxuICAgICAgICAucmVkdWNlKChtYXhXaWR0aCwgd2lkdGgpID0+IE1hdGgubWF4KG1heFdpZHRoLCB3aWR0aCwgLTEpKTtcclxuICAgIHAucG9wKCk7XHJcbiAgICByZXR1cm4gbWF4VGV4dFdpZHRoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0FjY3VyYWN5QmFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbGFiZWwxOiBzdHJpbmcsIGxhYmVsMjogc3RyaW5nLCBsYWJlbDM6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogbnVtYmVyLCBsYXJnZXN0VGV4dFdpZHRoOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsIGJhckhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRGaWxsZWQ6IG51bWJlcikge1xyXG4gICAgbGV0IHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgPSA4O1xyXG4gICAgbGV0IHRvdGFsV2lkdGggPSBsYXJnZXN0VGV4dFdpZHRoICsgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCArIGJhcldpZHRoO1xyXG4gICAgbGV0IGxhYmVsUmlnaHRtb3N0WCA9IGNlbnRlclggLSB0b3RhbFdpZHRoIC8gMiArIGxhcmdlc3RUZXh0V2lkdGg7XHJcbiAgICBkcmF3UmlnaHRBbGlnbmVkTGFiZWwocCwgbGFiZWxSaWdodG1vc3RYLCBjZW50ZXJZLCBsYWJlbDEsIHRleHRTaXplKTtcclxuXHJcbiAgICBsZXQgYmFyUmlnaHRYID0gY2VudGVyWCArIHRvdGFsV2lkdGggLyAyO1xyXG4gICAgbGV0IGJhckxlZnRYID0gYmFyUmlnaHRYIC0gYmFyV2lkdGg7XHJcbiAgICBsZXQgYmFyQ2VudGVyWCA9IChiYXJMZWZ0WCArIGJhclJpZ2h0WCkgLyAyO1xyXG4gICAgZHJhd1BhcnRpYWxseUZpbGxlZEJhcihwLCBiYXJDZW50ZXJYLCBjZW50ZXJZLCBiYXJXaWR0aCwgYmFySGVpZ2h0LCBwZXJjZW50RmlsbGVkLCB0ZXh0U2l6ZSwgbGFiZWwyLCBsYWJlbDMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHA6IHA1LCByaWdodG1vc3RYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgdGV4dDogc3RyaW5nLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZSh0ZXh0U2l6ZSk7XHJcbiAgICBwLnRleHRBbGlnbihwLlJJR0hULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQodGV4dCwgcmlnaHRtb3N0WCwgY2VudGVyWSk7XHJcbiAgICBwLnBvcCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd1BhcnRpYWxseUZpbGxlZEJhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIHN0YXJ0TGFiZWw6IHN0cmluZywgZW5kTGFiZWw6IHN0cmluZykge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLnJlY3RNb2RlKHAuQ0VOVEVSKTtcclxuICAgIHAuc3Ryb2tlKFwid2hpdGVcIik7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgZmlsbGVkIHBhcnQgb2YgdGhlIGJhclxyXG4gICAgcC5maWxsKFwiZ3JheVwiKTtcclxuICAgIHAucmVjdChjZW50ZXJYIC0gKHdpZHRoICogKDEgLSBwZXJjZW50RmlsbGVkKSAvIDIpLCBjZW50ZXJZLCB3aWR0aCAqIHBlcmNlbnRGaWxsZWQsIGhlaWdodCk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgb3V0bGluZSBvZiB0aGUgYmFyXHJcbiAgICBwLm5vRmlsbCgpO1xyXG4gICAgcC5yZWN0KGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIGxhYmVscyBvbiB0aGUgZW5kcyBvZiB0aGUgYmFyXHJcbiAgICBsZXQgbGFiZWxTaXplID0gMS41ICogdGV4dFNpemU7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUobGFiZWxTaXplKTtcclxuICAgIHAudGV4dEFsaWduKHAuTEVGVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHN0YXJ0TGFiZWwsIGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAudGV4dEFsaWduKHAuUklHSFQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChlbmRMYWJlbCwgY2VudGVyWCArIHdpZHRoIC8gMiwgY2VudGVyWSArIDIpO1xyXG4gICAgcC5wb3AoKTtcclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb2xkR2xvdyB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBudW1UcmFja3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBnbG93U3RhcnRUaW1lczogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIHN0YXRpYyBkb250RHJhd0ZsYWc6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2xvd1BlcmlvZEluU2Vjb25kczogbnVtYmVyID0gMC4zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlciwgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IGRpc3BsYXlNYW5hZ2VyO1xyXG5cclxuICAgICAgICB0aGlzLmdsb3dTdGFydFRpbWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdsb3dTdGFydFRpbWVzLnB1c2goSG9sZEdsb3cuZG9udERyYXdGbGFnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG93U3RhcnRUaW1lc1t0cmFja051bWJlcl0gIT09IEhvbGRHbG93LmRvbnREcmF3RmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxhcHNlZFRpbWUgPSBjdXJyZW50VGltZUluU2Vjb25kcyAtIHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2VudGVyWSA9IHRoaXMuZGlzcGxheU1hbmFnZXIuZ2V0Tm90ZUNlbnRlclkoY3VycmVudFRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgICAgIGxldCBnbG93QWxwaGEgPSB0aGlzLmdldEdsb3dBbHBoYShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2xvd0NvbG9yID0gcC5jb2xvcigwLCAyNTUsIDAsIGdsb3dBbHBoYSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2xvd1NpemUgPSB0aGlzLmdldEdsb3dTaXplKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0dsb3cocCwgY2VudGVyWCwgY2VudGVyWSwgZ2xvd1NpemUsIGdsb3dTaXplIC8gMiwgZ2xvd0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdHbG93KHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAubm9TdHJva2UoKTtcclxuICAgICAgICBwLmZpbGwoY29sb3IpO1xyXG4gICAgICAgIHAuZWxsaXBzZShjZW50ZXJYLCBjZW50ZXJZLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R2xvd0FscGhhKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uVGltZSA9IGVsYXBzZWRUaW1lSW5TZWNvbmRzICUgSG9sZEdsb3cuZ2xvd1BlcmlvZEluU2Vjb25kcztcclxuICAgICAgICBsZXQgYW5pbWF0aW9uUmF0aW8gPSBhbmltYXRpb25UaW1lIC8gSG9sZEdsb3cuZ2xvd1BlcmlvZEluU2Vjb25kcztcclxuICAgICAgICByZXR1cm4gdGhpcy5iaUxlcnAoMCwgNTAsIGFuaW1hdGlvblJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdsb3dTaXplKGVsYXBzZWRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uVGltZSA9IGVsYXBzZWRUaW1lSW5TZWNvbmRzICUgSG9sZEdsb3cuZ2xvd1BlcmlvZEluU2Vjb25kcztcclxuICAgICAgICBsZXQgYW5pbWF0aW9uUmF0aW8gPSBhbmltYXRpb25UaW1lIC8gSG9sZEdsb3cuZ2xvd1BlcmlvZEluU2Vjb25kcztcclxuICAgICAgICBsZXQgbWF4U2l6ZSA9IHRoaXMuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpTGVycCgwLCBtYXhTaXplLCBhbmltYXRpb25SYXRpbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiaUxlcnAobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlciwgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyYXRpbyA8IDAuNSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZXJwKG1pblZhbHVlLCBtYXhWYWx1ZSwgMSAtIHJhdGlvIC8gMC41KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZXJwKG1pblZhbHVlLCBtYXhWYWx1ZSwgMiAqIHJhdGlvIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGVycChtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWUgKyAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKiByYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ2xvd1N0YXJ0VGltZXNbdHJhY2tOdW1iZXJdID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdsb3dTdGFydFRpbWVzW3RyYWNrTnVtYmVyXSA9IEhvbGRHbG93LmRvbnREcmF3RmxhZztcclxuICAgIH1cclxufSIsIi8qIFRoaXMgY2xhc3MgaXMgaW50ZW5kZWQgb25seSB0byBiZSB1c2VkIHRvIHN0b3JlIHRoZSBob2xkIHN0YXRlIGZvciBub3RlcyB0aGF0IGNhbiBiZSBoZWxkLiBUaGlzIHNob3VsZG4ndCBiZSB1c2VkXHJcbiAgIGZvciBub3JtYWwgbm90ZXMgb3IgZ2VuZXJhbCBrZXlib2FyZCBzdGF0ZSAqL1xyXG5leHBvcnQgY2xhc3MgSG9sZE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBoZWxkVHJhY2tzOiBib29sZWFuW107XHJcbiAgICBwcml2YXRlIG9uVHJhY2tIb2xkOiAodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM/OiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIG9uVHJhY2tVbmhvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihudW1UcmFja3M6IG51bWJlciwgb25UcmFja0hvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgIG9uVHJhY2tVbmhvbGQ6ICh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcz86IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuaGVsZFRyYWNrcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5oZWxkVHJhY2tzLnB1c2goZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uVHJhY2tIb2xkID0gb25UcmFja0hvbGQ7XHJcbiAgICAgICAgdGhpcy5vblRyYWNrVW5ob2xkID0gb25UcmFja1VuaG9sZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNUcmFja0hlbGQodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlbGRUcmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl0gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25UcmFja0hvbGQodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5ob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl0gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uVHJhY2tVbmhvbGQodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7UGFydGljbGVTeXN0ZW19IGZyb20gXCIuL3BhcnRpY2xlX3N5c3RlbVwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSG9sZFBhcnRpY2xlcyB7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlU3lzdGVtczogUGFydGljbGVTeXN0ZW1bXTtcclxuICAgIHByaXZhdGUgcHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHM6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGljbGVzTGlmZXRpbWVJblNlY29uZHM6IG51bWJlciA9IDEuNTtcclxuICAgIHByaXZhdGUgc3RhdGljIGRvbnREcmF3RmxhZzogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZVBlcmlvZEluU2Vjb25kczogbnVtYmVyID0gMC4wNTtcclxuICAgIHByaXZhdGUgZ3Jhdml0eURpcmVjdGlvbjogbnVtYmVyXHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG51bVRyYWNrczogbnVtYmVyLCBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gZGlzcGxheU1hbmFnZXI7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5RGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLkRvd24gPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IGdyYXZpdHk6IHA1LlZlY3RvciA9IHAuY3JlYXRlVmVjdG9yKDAsIDIwMDAgKiB0aGlzLmdyYXZpdHlEaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXMucHVzaChuZXcgUGFydGljbGVTeXN0ZW0oSG9sZFBhcnRpY2xlcy5wYXJ0aWNsZXNMaWZldGltZUluU2Vjb25kcywgZ3Jhdml0eSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wcy5wdXNoKEhvbGRQYXJ0aWNsZXMuZG9udERyYXdGbGFnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLm51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFBhcnRpY2xlc1RvVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVN5c3RlbXNbdHJhY2tOdW1iZXJdLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFBhcnRpY2xlc1RvVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzUGFydGljbGVUaW1lc3RhbXBzW3RyYWNrTnVtYmVyXSAhPT0gSG9sZFBhcnRpY2xlcy5kb250RHJhd0ZsYWcpIHtcclxuICAgICAgICAgICAgd2hpbGUgKHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdICsgSG9sZFBhcnRpY2xlcy5wYXJ0aWNsZVBlcmlvZEluU2Vjb25kcyA8IGN1cnJlbnRUaW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3VGltZXN0YW1wID0gdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gKyBIb2xkUGFydGljbGVzLnBhcnRpY2xlUGVyaW9kSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY2VwdG9yVGltZVBvc2l0aW9uID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5nZXRJbml0aWFsUG9zaXRpb24ocCwgdHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCByZWNlcHRvclRpbWVQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFZlbG9jaXR5ID0gcC5jcmVhdGVWZWN0b3IoMCwgLTUwMCAqIHRoaXMuZ3Jhdml0eURpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtc1t0cmFja051bWJlcl0uYWRkUmFuZG9taXplZFBhcnRpY2xlcyhpbml0aWFsUG9zaXRpb24sIGluaXRpYWxWZWxvY2l0eSwgbmV3VGltZXN0YW1wLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsIHAuY29sb3IoMCwgMjU1LCAwLCAxNTApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdID0gbmV3VGltZXN0YW1wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW5pdGlhbFBvc2l0aW9uKHA6IHA1LCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRpc3BsYXlNYW5hZ2VyLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kaXNwbGF5TWFuYWdlci5nZXROb3RlQ2VudGVyWShjZW50ZXJUaW1lSW5TZWNvbmRzLCBjZW50ZXJUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVWZWN0b3IoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1BhcnRpY2xlVGltZXN0YW1wc1t0cmFja051bWJlcl0gPSBjdXJyZW50VGltZUluU2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5ob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNQYXJ0aWNsZVRpbWVzdGFtcHNbdHJhY2tOdW1iZXJdID0gSG9sZFBhcnRpY2xlcy5kb250RHJhd0ZsYWc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7U3RlcGZpbGV9IGZyb20gXCIuL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcbmltcG9ydCB7UDVTY2VuZX0gZnJvbSBcIi4vcDVfc2NlbmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWw6IGFueSA9IHt9O1xyXG5nbG9iYWwucDVTY2VuZSA9IG5ldyBQNVNjZW5lKCk7XHJcbmdsb2JhbC5jb25maWcgPSBDb25maWcubG9hZCgpO1xyXG5nbG9iYWwuc3RlcGZpbGUgPSBuZXcgU3RlcGZpbGUoKTtcclxuZ2xvYmFsLmF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuZ2xvYmFsLmdsb2JhbENsYXNzID0gXCJnYW1lXCI7XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dldEtleVN0cmluZywgc2V0Q29uZmlnS2V5QmluZGluZ30gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS2V5QmluZGluZyB7XHJcbiAgICB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAga2V5Q29kZTogbnVtYmVyLFxyXG4gICAgc3RyaW5nOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtleUJpbmRpbmdIZWxwZXIge1xyXG4gICAgcHJpdmF0ZSBiaW5kaW5nc1RvQWNxdWlyZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50QmluZGluZ051bWJlcjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJpbmRpbmdzVG9BY3F1aXJlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlID0gYmluZGluZ3NUb0FjcXVpcmU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmluZGluZ051bWJlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJpbmROZXh0KHA6IHA1KSB7XHJcbiAgICAgICAgbGV0IGtleWJpbmRpbmc6IEtleUJpbmRpbmcgPSB7XHJcbiAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyLFxyXG4gICAgICAgICAgICBrZXlDb2RlOiBwLmtleUNvZGUsXHJcbiAgICAgICAgICAgIHN0cmluZzogZ2V0S2V5U3RyaW5nKHApXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXRDb25maWdLZXlCaW5kaW5nKHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIsIHRoaXMuYmluZGluZ3NUb0FjcXVpcmUsIGtleWJpbmRpbmcpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIrKztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIgPj0gdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSkge1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBhY3Rpb25CaW5kaW5nczogTWFwPG51bWJlciwge2tleURvd25BY3Rpb246ICgpID0+IHZvaWQsIGtleVVwQWN0aW9uOiAoKSA9PiB2b2lkfT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocDogcDUpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbkJpbmRpbmdzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBwLmtleVByZXNzZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gLTEgaXMgYSBzcGVjaWFsIGtleUNvZGUgZmxhZyB0aGF0IG1lYW5zIFwiYW55XCIuIFRoaXMgaXMgZXNwZWNpYWxseSB1c2VmdWwgZm9yIHNldHRpbmcgdXAga2V5IGJpbmRpbmdzLlxyXG4gICAgICAgICAgICBsZXQgZ2xvYmFsQWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KC0xKTtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMua2V5RG93bkFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KHAua2V5Q29kZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMua2V5RG93bkFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMua2V5RG93bkFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgcC5rZXlSZWxlYXNlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KHAua2V5Q29kZSk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLmtleVVwQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmtleVVwQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEtleVRvQWN0aW9uKGtleUNvZGU6IG51bWJlciwga2V5RG93bkFjdGlvbjogKCkgPT4gdm9pZCwga2V5VXBBY3Rpb246ICgpID0+IHZvaWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbkJpbmRpbmdzLnNldChrZXlDb2RlLCB7a2V5RG93bkFjdGlvbjoga2V5RG93bkFjdGlvbiwga2V5VXBBY3Rpb246IGtleVVwQWN0aW9ufSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kS2V5KGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbkJpbmRpbmdzLmRlbGV0ZShrZXlDb2RlKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2V0TWlzc0JvdW5kYXJ5fSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge0hvbGRNYW5hZ2VyfSBmcm9tIFwiLi9ob2xkX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWlzc01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBsYXN0Q2hlY2tlZE5vdGVJbmRpY2VzOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGhhbmRsZUFjY3VyYWN5RXZlbnQ6IChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlciwgaGFuZGxlQWNjdXJhY3lFdmVudDogKGFjY3VyYWN5RXZlbnQ6IEFjY3VyYWN5RXZlbnQpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXMucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuaG9sZE1hbmFnZXIgPSBob2xkTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQgPSBoYW5kbGVBY2N1cmFjeUV2ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjsgLy8gQSBsb3dlckJvdW5kIGZvciBtaXNzZXMgaXMgaW5jb21wYXRpYmxlIHdpdGggdGhpcyB3YXkgb2YgZG9pbmcgbWlzc2VzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBudW1UcmFja3MgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IG51bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFsbE1pc3NlZE5vdGVzRm9yVHJhY2sodHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVBbGxNaXNzZWROb3Rlc0ZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSA9IHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUgPj0gdHJhY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY3VycmVudE5vdGUgPSB0cmFja1tpbmRleE9mTGFzdENoZWNrZWROb3RlXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb3RNaXNzYWJsZShjdXJyZW50Tm90ZSkpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUrKztcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTm90ZU1pc3NlZEFuZE5vdEhhbmRsZWQoY3VycmVudE5vdGUsIGN1cnJlbnRUaW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNaXNzZWROb3RlKHRyYWNrTnVtYmVyLCBpbmRleE9mTGFzdENoZWNrZWROb3RlLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICBpbmRleE9mTGFzdENoZWNrZWROb3RlKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXNbdHJhY2tOdW1iZXJdID0gaW5kZXhPZkxhc3RDaGVja2VkTm90ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGb3IgZXhhbXBsZTogbm90ZXMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBoaXQgYXJlIG5vdCBtaXNzYWJsZVxyXG4gICAgcHJpdmF0ZSBpc05vdE1pc3NhYmxlKG5vdGU6IE5vdGUpIHtcclxuICAgICAgICByZXR1cm4gbm90ZS5zdGF0ZSAhPT0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc05vdGVNaXNzZWRBbmROb3RIYW5kbGVkKG5vdGU6IE5vdGUsIGN1cnJlbnRUaW1lOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbWlzc0JvdW5kYXJ5ID0gZ2V0TWlzc0JvdW5kYXJ5KGN1cnJlbnRUaW1lLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIG5vdGUudGltZUluU2Vjb25kcyA8IG1pc3NCb3VuZGFyeSAmJiBub3RlLnN0YXRlID09PSBOb3RlU3RhdGUuREVGQVVMVDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU1pc3NlZE5vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgaW5kZXhPZk1pc3NlZE5vdGU6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0cmFjayA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgbWlzc2VkTm90ZSA9IHRyYWNrW2luZGV4T2ZNaXNzZWROb3RlXTtcclxuICAgICAgICB0aGlzLmhhbmRsZUFjY3VyYWN5RXZlbnQoe1xyXG4gICAgICAgICAgICBhY2N1cmFjeU5hbWU6IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0ubmFtZSxcclxuICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLFxyXG4gICAgICAgICAgICBhY2N1cmFjeU1pbGxpczogLUluZmluaXR5LFxyXG4gICAgICAgICAgICB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgbm90ZVR5cGU6IG1pc3NlZE5vdGUudHlwZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1pc3NlZE5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuTUlTU0VEO1xyXG4gICAgICAgIGlmIChtaXNzZWROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZE1hbmFnZXIuaXNUcmFja0hlbGQodHJhY2tOdW1iZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLnVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZUluU2Vjb25kcykgLy8gRm9yY2UgYSBob2xkIHJlbGVhc2UgdXBvbiBtaXNzaW5nIHRoZSB0YWlsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG1pc3NlZE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXh0Tm90ZSA9IHRyYWNrW2luZGV4T2ZNaXNzZWROb3RlICsgMV07XHJcbiAgICAgICAgICAgIGlmIChuZXh0Tm90ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHROb3RlLnN0YXRlID0gTm90ZVN0YXRlLk1JU1NFRDsgLy8gTWlzcyB0aGUgdGFpbCB3aGVuIHlvdSBtaXNzIHRoZSBoZWFkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90ZU1hbmFnZXIge1xyXG4gICAgdHJhY2tzOiBOb3RlW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3M6IE5vdGVbXVtdKSB7XHJcbiAgICAgICAgdGhpcy50cmFja3MgPSB0cmFja3M7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVVbnN1cHBvcnRlZE5vdGVUeXBlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlVW5zdXBwb3J0ZWROb3RlVHlwZXMoKSB7XHJcbiAgICAgICAgbGV0IHN1cHBvcnRlZE5vdGVUeXBlczogTm90ZVR5cGVbXSA9IFtOb3RlVHlwZS5UQUlMLCBOb3RlVHlwZS5IT0xEX0hFQUQsIE5vdGVUeXBlLk5PUk1BTF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCB0aGlzLnRyYWNrcy5sZW5ndGg7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSB0aGlzLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5vdGVOdW1iZXIgPSAwOyBub3RlTnVtYmVyIDwgdHJhY2subGVuZ3RoOyBub3RlTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBub3RlOiBOb3RlID0gdHJhY2tbbm90ZU51bWJlcl07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN1cHBvcnRlZE5vdGVUeXBlcy5pbmNsdWRlcyhub3RlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2suc3BsaWNlKG5vdGVOdW1iZXIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVOdW1iZXItLTsgLy8gZGVjcmVtZW50IG5vdGUgbnVtYmVyIHNvIG5leHQgaXRlcmF0aW9uIGl0IHN0YXJ0cyBhdCB0aGUgcmlnaHQgbm90ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGVzQnlUaW1lUmFuZ2UobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCBmaXJzdEZpbmRSZXN1bHQgPSB0aGlzLmZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGxlYXN0VGltZSwgdHJhY2spO1xyXG4gICAgICAgIGlmIChmaXJzdEZpbmRSZXN1bHQgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogLTEsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiAtMX07IC8vIG5vIG5vdGVzIGxlZnQgYWZ0ZXIgbGVhc3QgdGltZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGFzdEZpbmRSZXN1bHQgPSB0aGlzLmZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGdyZWF0ZXN0VGltZSwgdHJhY2ssIGZpcnN0RmluZFJlc3VsdCk7XHJcbiAgICAgICAgaWYgKGxhc3RGaW5kUmVzdWx0IDwgMCkge1xyXG4gICAgICAgICAgICBsYXN0RmluZFJlc3VsdCA9IHRyYWNrLmxlbmd0aDsgLy8gZ3JlYXRlc3RUaW1lIGV4Y2VlZHMgdGhlIGVuZCBvZiB0aGUgbm90ZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpcnN0RmluZFJlc3VsdCA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAobGFzdEZpbmRSZXN1bHQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogLTEsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiAtMX07IC8vIGhhdmVuJ3Qgc2VlbiBmaXJzdCBub3RlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IDAsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBsYXN0RmluZFJlc3VsdH07IC8vIG5vdGVzIGFyZSBqdXN0IHN0YXJ0aW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiBmaXJzdEZpbmRSZXN1bHQsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBsYXN0RmluZFJlc3VsdH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgbm8gdHdvIG5vdGVzIHdpbGwgaGF2ZSB0aGUgc2FtZSB0aW1lIGluIHRoZSBzYW1lIHRyYWNrXHJcbiAgICBmaW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShrZXlUaW1lOiBudW1iZXIsIHRyYWNrOiBOb3RlW10sIHNlYXJjaFN0YXJ0ID0gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzZWFyY2hTdGFydDsgaSA8IHRyYWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFja1tpXS50aW1lSW5TZWNvbmRzID4ga2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVhcmxpZXN0Tm90ZSgpOiBOb3RlIHtcclxuICAgICAgICBsZXQgZWFybGllc3ROb3RlOiBOb3RlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tzW2ldLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFja0VhcmxpZXN0Tm90ZTogTm90ZSA9IHRoaXMudHJhY2tzW2ldWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVhcmxpZXN0Tm90ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXJsaWVzdE5vdGUgPSB0cmFja0VhcmxpZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWFybGllc3ROb3RlLnRpbWVJblNlY29uZHMgPiB0cmFja0VhcmxpZXN0Tm90ZS50aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFybGllc3ROb3RlID0gdHJhY2tFYXJsaWVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVhcmxpZXN0Tm90ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXRlc3ROb3RlKCk6IE5vdGUge1xyXG4gICAgICAgIGxldCBsYXRlc3ROb3RlOiBOb3RlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tzW2ldLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFja0xhdGVzdE5vdGU6IE5vdGUgPSB0aGlzLnRyYWNrc1tpXVt0aGlzLnRyYWNrc1tpXS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXRlc3ROb3RlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGUgPSB0cmFja0xhdGVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhdGVzdE5vdGUudGltZUluU2Vjb25kcyA8IHRyYWNrTGF0ZXN0Tm90ZS50aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90ZSA9IHRyYWNrTGF0ZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGF0ZXN0Tm90ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3RhbE5vdGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrcy5yZWR1Y2UoKHN1bSwgdHJhY2spID0+IHN1bSArIHRyYWNrLmxlbmd0aCwgMCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Tm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RlU2tpbiB7XHJcbiAgICBwdWJsaWMgbm90ZTogcDUuSW1hZ2U7XHJcbiAgICBwdWJsaWMgY29ubmVjdG9yVGlsZTogcDUuSW1hZ2U7XHJcbiAgICBwdWJsaWMgcmVjZXB0b3I6IHA1LkltYWdlO1xyXG5cclxuICAgIC8qIFJlcXVpcmVzIHRoYXQgdGhlIHRhaWwgYmUgaGFsZiB0aGUgaGVpZ2h0IGFuZCBzYW1lIHdpZHRoIGFzIG5vdGUgaW1hZ2UgKi9cclxuICAgIHB1YmxpYyB0YWlsOiBwNS5JbWFnZTtcclxuXHJcbiAgICBwcml2YXRlIHJvdGF0aW9uQW5nbGVzOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4gPSBuZXcgTWFwKFtcclxuICAgICAgICBbNCwgWzI3MCwgMTgwLCAwLCA5MF1dLFxyXG4gICAgICAgIFs2LCBbMjcwLCAzMTUsIDE4MCwgMCwgNDUsIDkwXV1cclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGU6IHA1LkltYWdlLCBjb25uZWN0b3I6IHA1LkltYWdlLCB0YWlsOiBwNS5JbWFnZSwgcmVjZXB0b3I6IHA1LkltYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlID0gbm90ZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclRpbGUgPSBjb25uZWN0b3I7XHJcbiAgICAgICAgdGhpcy50YWlsID0gdGFpbDtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yID0gcmVjZXB0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwdWJsaWMgZHJhd05vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHN3aXRjaCAobm90ZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3SW1hZ2VSb3RhdGVkKHRoaXMubm90ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY2VudGVyWCwgY2VudGVyWSwgbm90ZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RhaWwodHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwdWJsaWMgZHJhd1JlY2VwdG9yKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZHJhd0ltYWdlUm90YXRlZCh0aGlzLnJlY2VwdG9yLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwcml2YXRlIGRyYXdIb2xkQ29ubmVjdG9yKGNlbnRlclg6IG51bWJlciwgZHJhd1N0YXJ0WTogbnVtYmVyLCBkcmF3RW5kWTogbnVtYmVyLCBub3RlU3RhcnRZOiBudW1iZXIsIG5vdGVFbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGxldCBzb3VyY2VXaWR0aCA9IHRoaXMuY29ubmVjdG9yVGlsZS53aWR0aDtcclxuICAgICAgICBsZXQgc291cmNlSGVpZ2h0ID0gdGhpcy5jb25uZWN0b3JUaWxlLmhlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGVkV2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgc2NhbGVkSGVpZ2h0ID0gc2NhbGVkV2lkdGggLyBzb3VyY2VXaWR0aCAqIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBsZXQgY29ubmVjdG9ySGVpZ2h0ID0gTWF0aC5hYnMoZHJhd0VuZFkgLSBkcmF3U3RhcnRZKTtcclxuICAgICAgICBsZXQgZW5kWU9mZnNldCA9IHRoaXMuZ2V0Tm90ZUVuZE9mZnNldChub3RlRW5kWSwgZHJhd0VuZFkpO1xyXG5cclxuICAgICAgICBsZXQgZW5kUGFydGlhbFRpbGVIZWlnaHQgPSBzY2FsZWRIZWlnaHQgLSAoZW5kWU9mZnNldCAlIHNjYWxlZEhlaWdodCk7XHJcbiAgICAgICAgZW5kUGFydGlhbFRpbGVIZWlnaHQgPSBNYXRoLm1pbihlbmRQYXJ0aWFsVGlsZUhlaWdodCwgY29ubmVjdG9ySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQgPSAoY29ubmVjdG9ySGVpZ2h0IC0gZW5kUGFydGlhbFRpbGVIZWlnaHQpICUgc2NhbGVkSGVpZ2h0O1xyXG4gICAgICAgIGxldCBudW1Db21wbGV0ZVRpbGVzID0gTWF0aC5yb3VuZChcclxuICAgICAgICAgICAgKGNvbm5lY3RvckhlaWdodCAtIHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQgLSBlbmRQYXJ0aWFsVGlsZUhlaWdodCkgLyBzY2FsZWRIZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGJsb2NrIGFsbG93cyB1cyB0byB1c2UgdGhlIHNhbWUgZHJhd2luZyBtZXRob2QgZm9yIGJvdGggdXBzY3JvbGwgYW5kIGRvd25zY3JvbGxcclxuICAgICAgICBsZXQgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgdG9wUGFydGlhbFRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCA9IGVuZFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgICAgICB0b3BQYXJ0aWFsVGlsZUhlaWdodCA9IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQgPSBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgICAgICB0b3BQYXJ0aWFsVGlsZUhlaWdodCA9IGVuZFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZHJhd01pblkgPSBNYXRoLm1pbihkcmF3U3RhcnRZLCBkcmF3RW5kWSk7XHJcbiAgICAgICAgbGV0IGRyYXdNYXhZID0gTWF0aC5tYXgoZHJhd1N0YXJ0WSwgZHJhd0VuZFkpO1xyXG4gICAgICAgIGxldCBpc1JldmVyc2VkID0gZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcDtcclxuICAgICAgICBsZXQgaXNEcmF3bkZyb21Cb3R0b20gPSBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgIGlmIChlbmRQYXJ0aWFsVGlsZUhlaWdodCA9PT0gY29ubmVjdG9ySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGlzRHJhd25Gcm9tQm90dG9tID0gIWlzRHJhd25Gcm9tQm90dG9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcmF3UGFydGlhbFRpbGUoY2VudGVyWCwgZHJhd01pblksIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQsIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsXHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0IC8gc2NhbGVkSGVpZ2h0LCAhaXNEcmF3bkZyb21Cb3R0b20sIGlzUmV2ZXJzZWQsIHApO1xyXG4gICAgICAgIHRoaXMuZHJhd0NvbXBsZXRlVGlsZXMoY2VudGVyWCwgZHJhd01pblkgKyB0b3BQYXJ0aWFsVGlsZUhlaWdodCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCxcclxuICAgICAgICAgICAgbnVtQ29tcGxldGVUaWxlcywgaXNSZXZlcnNlZCwgcCk7XHJcbiAgICAgICAgdGhpcy5kcmF3UGFydGlhbFRpbGUoY2VudGVyWCwgZHJhd01heFkgLSBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCxcclxuICAgICAgICAgICAgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQgLyBzY2FsZWRIZWlnaHQsIGlzRHJhd25Gcm9tQm90dG9tLFxyXG4gICAgICAgICAgICBpc1JldmVyc2VkLCBwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdUYWlsKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgaWYgKGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSgxODApO1xyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMudGFpbCwgLW5vdGVTaXplIC8gMiwgLW5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplIC8gMik7XHJcbiAgICAgICAgICAgIHAucG9wKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLnRhaWwsIGNlbnRlclggLSBub3RlU2l6ZSAvIDIsIGNlbnRlclkgLSBub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5vdGVFbmRPZmZzZXQobm90ZUVuZFk6IG51bWJlciwgZHJhd0VuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlcjtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBub3RlRW5kWSAtIGRyYXdFbmRZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IGRyYXdFbmRZIC0gbm90ZUVuZFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIHByZXZlbnRzIHRoZSBwYXJ0aWFsIHRpbGUgdGV4dHVyZSBmcm9tIHN0cmV0Y2hpbmcgd2hlbiB0aGUgcGxheWVyIGhpdHMgYSBob2xkIGVhcmx5XHJcbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoMCwgb2Zmc2V0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdDb21wbGV0ZVRpbGVzKGNlbnRlclg6IG51bWJlciwgbGVhc3RZOiBudW1iZXIsIHNjYWxlZFdpZHRoOiBudW1iZXIsIHNjYWxlZEhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UaWxlczogbnVtYmVyLCBpc1JldmVyc2VkOiBib29sZWFuLCBwOiBwNSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVGlsZXM7IGkrKykge1xyXG4gICAgICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclkgPSBsZWFzdFkgKyBpICogc2NhbGVkSGVpZ2h0ICsgc2NhbGVkSGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgIGlmIChpc1JldmVyc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBwLnJvdGF0ZSgxODApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtc2NhbGVkSGVpZ2h0IC8gMiwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCk7XHJcbiAgICAgICAgICAgIHAucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1BhcnRpYWxUaWxlKGNlbnRlclg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgc2NhbGVkV2lkdGg6IG51bWJlciwgc2NhbGVkSGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aDogbnVtYmVyLCBzb3VyY2VIZWlnaHQ6IG51bWJlciwgaGVpZ2h0UGVyY2VudDogbnVtYmVyLCBpc0RyYXduRnJvbUJvdHRvbTogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXZlcnNlZDogYm9vbGVhbiwgcDogcDUpIHtcclxuICAgICAgICBpZiAoaGVpZ2h0UGVyY2VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbkhlaWdodCA9IGhlaWdodFBlcmNlbnQgKiBzY2FsZWRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSB0b3BMZWZ0WSArIGRlc3RpbmF0aW9uSGVpZ2h0IC8gMjtcclxuICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICBpZiAoaXNSZXZlcnNlZCkge1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSgxODApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNEcmF3bkZyb21Cb3R0b20pIHsgLy8gRHJhdyBmcm9tIHRoZSBib3R0b20gb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtZGVzdGluYXRpb25IZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSGVpZ2h0LCAwLCBzb3VyY2VIZWlnaHQgLSBoZWlnaHRQZXJjZW50ICogc291cmNlSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgc291cmNlV2lkdGgsIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIERyYXcgZnJvbSB0aGUgdG9wIG9mIHRoZSBpbWFnZVxyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMuY29ubmVjdG9yVGlsZSwgLXNjYWxlZFdpZHRoIC8gMiwgLWRlc3RpbmF0aW9uSGVpZ2h0IC8gMiwgc2NhbGVkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkhlaWdodCwgMCwgMCwgc291cmNlV2lkdGgsIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0ltYWdlUm90YXRlZChpbWFnZTogcDUuSW1hZ2UsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICB0aGlzLnJvdGF0ZShwLCB0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBwLmltYWdlKGltYWdlLCAtbm90ZVNpemUgLyAyLCAtbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByb3RhdGUocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BbmdsZXMuaGFzKG51bVRyYWNrcykpIHtcclxuICAgICAgICAgICAgcC5yb3RhdGUodGhpcy5yb3RhdGlvbkFuZ2xlcy5nZXQobnVtVHJhY2tzKVt0cmFja051bWJlcl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAucm90YXRlKHRoaXMuZ2V0RGVmYXVsdFJvdGF0aW9uQW5nbGVJbkRlZ3JlZXModHJhY2tOdW1iZXIsIG51bVRyYWNrcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRSb3RhdGlvbkFuZ2xlSW5EZWdyZWVzKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJvdGF0aW9uID0gLTkwO1xyXG4gICAgICAgIGxldCByb3RhdGlvblBlclRyYWNrID0gMzYwIC8gbnVtVHJhY2tzO1xyXG4gICAgICAgIGlmICh0cmFja051bWJlciA8IG51bVRyYWNrcyAvIDIpIHtcclxuICAgICAgICAgICAgcm90YXRpb24gLT0gdHJhY2tOdW1iZXIgKiByb3RhdGlvblBlclRyYWNrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uICs9ICh0cmFja051bWJlciAtIG51bVRyYWNrcyAvIDIgKyAxKSAqIHJvdGF0aW9uUGVyVHJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3RhdGlvbjtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0tleWJvYXJkRXZlbnRNYW5hZ2VyfSBmcm9tIFwiLi9rZXlib2FyZF9ldmVudF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVQcmV2aWV3Tm90ZXN9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlU2tpbn0gZnJvbSBcIi4vbm90ZV9za2luXCI7XHJcblxyXG5sZXQgd2lkdGggPSA3MjA7XHJcbmxldCBoZWlnaHQgPSA0ODA7XHJcblxyXG5leHBvcnQgY2xhc3MgUDVTY2VuZSB7XHJcbiAgICBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IG5ldyBwNSgocDogcDUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlbmRlcmVyOiBwNS5SZW5kZXJlcjtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNlbnRlckNhbnZhcygpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcmVyLmNlbnRlcigpOyAvLyBEaXNhYmxlIHRoaXMgZm9yIG5vdyB0byBtYWtlIGVtYmVkZGluZyB3b3JrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5ub3RlU2tpbiA9IG5ldyBOb3RlU2tpbihcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19ibHVlX3YzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9jb25uZWN0b3JfdGlsZV9yZXNpemUucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3RhaWxfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19yZWNlcHRvci5wbmdcIilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCA9IHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3BsYXlfZnJvbV9maWxlX2JhY2tncm91bmQuanBnXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kID0gZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlciA9IHAuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlciA9IG5ldyBLZXlib2FyZEV2ZW50TWFuYWdlcihwKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyg0KSwgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTsgLy8gTWFrZXMgdGhlIGNhbnZhcyBiZSBhYmxlIHRvIGZpbGwgdGhlIHdob2xlIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHAuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLmRyYXcoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAud2luZG93UmVzaXplZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlckNhbnZhcygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGxheUZyb21GaWxlfSBmcm9tIFwiLi9wYWdlcy9wbGF5X2Zyb21fZmlsZVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuaW1wb3J0IHtQbGF5fSBmcm9tIFwiLi9wYWdlcy9wbGF5XCI7XHJcbmltcG9ydCB7UmVzdWx0c30gZnJvbSBcIi4vcGFnZXMvcmVzdWx0c1wiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgZW51bSBQQUdFUyB7XHJcbiAgICBQTEFZX0ZST01fRklMRSxcclxuICAgIE9QVElPTlMsXHJcbiAgICBQTEFZLFxyXG4gICAgUkVTVUxUUyxcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbnRTY2VuZTogUEFHRVMgPSBQQUdFUy5QTEFZX0ZST01fRklMRTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEN1cnJlbnRTY2VuZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRDdXJyZW50U2NlbmUoc2NlbmU6IFBBR0VTKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSBzY2VuZTtcclxuICAgICAgICBET01XcmFwcGVyLmNsZWFyUmVnaXN0cnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRTY2VuZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVlfRlJPTV9GSUxFOlxyXG4gICAgICAgICAgICAgICAgUGxheUZyb21GaWxlLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLk9QVElPTlM6XHJcbiAgICAgICAgICAgICAgICBPcHRpb25zLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVk6XHJcbiAgICAgICAgICAgICAgICBQbGF5LmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlJFU1VMVFM6XHJcbiAgICAgICAgICAgICAgICBSZXN1bHRzLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBzY2VuZTogXCIgKyBnbG9iYWwuY3VycmVudFNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ0hlbHBlcn0gZnJvbSBcIi4uL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgYm9vbGVhblRvWWVzTm8sXHJcbiAgICBjcmVhdGVLZXlCaW5kaW5nSW5wdXQsXHJcbiAgICBjcmVhdGVMYWJlbGVkSW5wdXQsXHJcbiAgICBjcmVhdGVMYWJlbGVkU2VsZWN0LFxyXG4gICAgY3JlYXRlTGFiZWxlZFRleHRBcmVhLFxyXG4gICAgZHJhd0hlYWRpbmcsXHJcbiAgICBZZXNOb1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtnZW5lcmF0ZVByZXZpZXdOb3RlcywgZ2V0S2V5QmluZGluZ0NvbnRhaW5lcklkLCBpbml0aWFsaXplS2V5QmluZGluZ3MsIGlzS2V5QmluZGluZ3NEZWZpbmVkfSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1ByZXZpZXdEaXNwbGF5fSBmcm9tIFwiLi4vcHJldmlld19kaXNwbGF5XCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3B0aW9ucyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIE9QVElPTlNfQ0xBU1M6IHN0cmluZyA9IFwib3B0aW9uc1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kKTtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICB9LCBcInNjcm9sbERpdlwiKTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpdi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKFwib3B0aW9ucy1zY3JvbGwtZGl2XCIpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgICAgIHNjcm9sbERpdi5lbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAzMzUsIGNhbnZhc1Bvc2l0aW9uLnkgKyA0NSk7XHJcblxyXG4gICAgICAgIGxldCBwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlBhdXNlIGF0IFN0YXJ0IChzZWMpXCIsIFwicGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gcGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpICYmIHZhbHVlID49IDApIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxTcGVlZElucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiU2Nyb2xsIFNwZWVkIChweC9zZWMpXCIsIFwic2Nyb2xsU3BlZWRJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBpeGVsc1BlclNlY29uZC50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoc2Nyb2xsU3BlZWRJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHNjcm9sbFNwZWVkSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpICYmIHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5waXhlbHNQZXJTZWNvbmQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxTcGVlZElucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoc2Nyb2xsU3BlZWRJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxEaXJlY3Rpb25TZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiU2Nyb2xsIERpcmVjdGlvblwiLCBcInNjcm9sbERpcmVjdGlvblNlbGVjdFwiLFxyXG4gICAgICAgICAgICBTY3JvbGxEaXJlY3Rpb24sIGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKHNjcm9sbERpcmVjdGlvblNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBTY3JvbGxEaXJlY3Rpb25bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFNjcm9sbERpcmVjdGlvbl07XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9IGVudW1PZlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHNjcm9sbERpcmVjdGlvblNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNlcHRvclBvc2l0aW9uSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJSZWNlcHRvciBQb3NpdGlvbiAoJSlcIiwgXCJyZWNlcHRvclBvc2l0aW9uSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5yZWNlcHRvcllQZXJjZW50LnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhyZWNlcHRvclBvc2l0aW9uSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSByZWNlcHRvclBvc2l0aW9uSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFyZWNlcHRvclBvc2l0aW9uSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChyZWNlcHRvclBvc2l0aW9uSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiQWNjdXJhY3kgT2Zmc2V0IChtcylcIiwgXCJhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXRcIixcclxuICAgICAgICAgICAgKGdsb2JhbC5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyAqIDEwMDApLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgPSB2YWx1ZSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjY3VyYWN5U2V0dGluZ3NJbnB1dCA9IGNyZWF0ZUxhYmVsZWRUZXh0QXJlYShcIkFjY3VyYWN5IFNldHRpbmdzXCIsIFwiYWNjdXJhY3lTZXR0aW5nc0lucHV0XCIsXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGdsb2JhbC5jb25maWcuYWNjdXJhY3lTZXR0aW5ncywgbnVsbCwgMyksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeVNldHRpbmdzSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBhY2N1cmFjeVNldHRpbmdzSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3QWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24odmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0FjY3VyYWN5U2V0dGluZ3MgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MgPSBuZXdBY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoIWFjY3VyYWN5U2V0dGluZ3NJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGFjY3VyYWN5U2V0dGluZ3NJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJBY2N1cmFjeSBGbGFzaFwiLFwiYWNjdXJhY3lGbGFzaEVuYWJsZWRTZWxlY3RcIixcclxuICAgICAgICAgICAgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeUZsYXNoRW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhhY2N1cmFjeUZsYXNoRW5hYmxlZFNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBZZXNOb1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgWWVzTm9dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLlllcykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5Rmxhc2hFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lGbGFzaEVuYWJsZWRTZWxlY3QuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IFBhcnRpY2xlc1wiLCBcImFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhY2N1cmFjeVBhcnRpY2xlc0VuYWJsZWRTZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoYWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lQYXJ0aWNsZXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5Obykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGFjY3VyYWN5UGFydGljbGVzRW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjeVRleHRFbmFibGVkU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIkFjY3VyYWN5IFRleHRcIixcImFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3RcIixcclxuICAgICAgICAgICAgWWVzTm8sIGJvb2xlYW5Ub1llc05vKGdsb2JhbC5jb25maWcuaXNBY2N1cmFjeVRleHRFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoYWNjdXJhY3lUZXh0RW5hYmxlZFNlbGVjdC5lbGVtZW50LnZhbHVlKCkpO1xyXG4gICAgICAgICAgICBsZXQgZW51bU9mVmFsdWUgPSBZZXNOb1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgWWVzTm9dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLlllcykge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5pc0FjY3VyYWN5VGV4dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGFjY3VyYWN5VGV4dEVuYWJsZWRTZWxlY3QuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaG9sZFBhcnRpY2xlc0VuYWJsZWRTZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiSG9sZCBQYXJ0aWNsZXNcIiwgXCJob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICBZZXNObywgYm9vbGVhblRvWWVzTm8oZ2xvYmFsLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gU3RyaW5nKGhvbGRQYXJ0aWNsZXNFbmFibGVkU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFllc05vW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBZZXNOb107XHJcbiAgICAgICAgICAgIGlmIChlbnVtT2ZWYWx1ZSA9PT0gWWVzTm8uWWVzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFzY3JvbGxEaXJlY3Rpb25TZWxlY3QuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChob2xkUGFydGljbGVzRW5hYmxlZFNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBob2xkR2xvd0VuYWJsZWRTZWxlY3QgPSBjcmVhdGVMYWJlbGVkU2VsZWN0KFwiSG9sZCBHbG93XCIsIFwiaG9sZEdsb3dFbmFibGVkU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFllc05vLCBib29sZWFuVG9ZZXNObyhnbG9iYWwuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGhvbGRHbG93RW5hYmxlZFNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhob2xkR2xvd0VuYWJsZWRTZWxlY3QuZWxlbWVudC52YWx1ZSgpKTtcclxuICAgICAgICAgICAgbGV0IGVudW1PZlZhbHVlID0gWWVzTm9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIFllc05vXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlID09PSBZZXNOby5ZZXMpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW51bU9mVmFsdWUgPT09IFllc05vLk5vKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmlzSG9sZEdsb3dFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoaG9sZEdsb3dFbmFibGVkU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzU2VjdGlvbkhlYWRlciA9IGNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBnbG9iYWwucHJldmlld051bVRyYWNrcyA9IDQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcmV2aWV3TnVtVHJhY2tzID0gY3JlYXRlTGFiZWxlZElucHV0KFwiTnVtYmVyIG9mIFRyYWNrc1wiLCBcInByZXZpZXdOdW1UcmFja3NJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwucHJldmlld051bVRyYWNrcy50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHByZXZpZXdOdW1UcmFja3MsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwcmV2aWV3TnVtVHJhY2tzLmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpICYmIHZhbHVlID4gMCAmJiB2YWx1ZSA8PSAyNikge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlT2xkQmluZGluZ0J1dHRvbnMoZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyh2YWx1ZSksIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcHJldmlld051bVRyYWNrcy5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHByZXZpZXdOdW1UcmFja3MuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJLZXlCaW5kaW5ncyBRdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgIH0sIFwia2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uXCIpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJrZXliaW5kaW5ncy1xdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5YmluZGluZ0hlbHBlciA9IG5ldyBLZXlCaW5kaW5nSGVscGVyKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRoaXMgYWN0aW9uIHRvIHRoZSBcIi0xXCIga2V5IHNvIHRoYXQgaXQgaGFwcGVucyBvbiBhbnkga2V5IHByZXNzXHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKC0xLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoaXMgY29kZSBiZWNhdXNlIGl0J3MgdXNlZCB0byBpbmRpY2F0ZSBpbnB1dCB0aGF0J3Mgbm90IHlldCBmaW5pc2hlZCBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAua2V5Q29kZSAhPT0gMjI5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleWJpbmRpbmdIZWxwZXIuYmluZE5leHQocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0tleUJpbmRpbmdzRGVmaW5lZChnbG9iYWwucHJldmlld051bVRyYWNrcykpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nSW5wdXQgPSBjcmVhdGVLZXlCaW5kaW5nSW5wdXQodHJhY2tOdW1iZXIsIGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBpZiAoIWtleUJpbmRpbmdJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChrZXlCaW5kaW5nSW5wdXQuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmh0bWwoXHJcbiAgICAgICAgICAgICdLZXkgQmluZGluZ3MgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTJweFwiPih0cmFjayAxIGlzIHRoZSBsZWZ0bW9zdCB0cmFjayk8L3NwYW4+J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwib3B0aW9ucy1mcmVlLXRleHRcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIFwia2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyXCIpO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoaW5wdXRFbGVtZW50OiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSwgb25JbnB1dDogKCkgPT4gdm9pZCkge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpbnB1dEVsZW1lbnQuZWxlbWVudC5pbnB1dChvbklucHV0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlT2xkQmluZGluZ0J1dHRvbnMobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBudW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKGdldEtleUJpbmRpbmdDb250YWluZXJJZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24oYWNjdXJhY3lTZXR0aW5nc0pzb246IHN0cmluZyk6IEFjY3VyYWN5W10ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IFtdXHJcbiAgICAgICAgbGV0IGpzb25BcnJheTogQWNjdXJhY3lbXSA9IEpTT04ucGFyc2UoYWNjdXJhY3lTZXR0aW5nc0pzb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGpzb25BcnJheVtpXTtcclxuICAgICAgICAgICAgLy8gdGhpcyBmYWlscyBpZiB0aGUgdXNlciBnYXZlIHRoZSB3cm9uZyBpbnB1dFxyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzLnB1c2gobmV3IEFjY3VyYWN5KGFjY3VyYWN5Lm5hbWUsIGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2UuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG4gICAgICAgIGdsb2JhbC5wbGF5aW5nRGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7ZHJhd0hlYWRpbmcsIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlLCBjcmVhdGVGaWxlSW5wdXR9IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGVTdGF0ZX0gZnJvbSBcIi4uL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXl9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7UGxheWluZ0Rpc3BsYXl9IGZyb20gXCIuLi9wbGF5aW5nX2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtNb2RlLCBOb3RlfSBmcm9tIFwiLi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4uL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsYXlGcm9tRmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBMQVlfRlJPTV9GSUxFX0NMQVNTOiBzdHJpbmcgPSBcInBsYXktZnJvbS1maWxlXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1PREVfUkFESU9fSUQ6IHN0cmluZyA9IFwibW9kZVJhZGlvXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGRyYXdIZWFkaW5nKCk7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXBmaWxlSW5wdXQgPSBjcmVhdGVGaWxlSW5wdXQoZ2V0U3RlcGZpbGVJbnB1dExhYmVsKCksIFwiQ2hvb3NlIFN0ZXBmaWxlICguc20pXCIsIFwic3RlcGZpbGVJbnB1dFwiLFxyXG4gICAgICAgICAgICBsb2FkU3RlcGZpbGVBbmRVcGRhdGVNb2RlT3B0aW9ucywgUGxheUZyb21GaWxlLlBMQVlfRlJPTV9GSUxFX0NMQVNTKS5lbGVtZW50O1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHN0ZXBmaWxlSW5wdXQsIDAuNDMsIDAuMywgMjY4LCAzNCk7XHJcblxyXG4gICAgICAgIGxldCBhdWRpb0ZpbGVJbnB1dCA9IGNyZWF0ZUZpbGVJbnB1dChnZXRBdWRpb0ZpbGVJbnB1dExhYmVsKCksIFwiQ2hvb3NlIEF1ZGlvIEZpbGUgKC5tcDMsIC5vZ2cpXCIsIFwiYXVkaW9GaWxlSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmF1ZGlvRmlsZS5sb2FkLmJpbmQoZ2xvYmFsLmF1ZGlvRmlsZSksIFBsYXlGcm9tRmlsZS5QTEFZX0ZST01fRklMRV9DTEFTUykuZWxlbWVudDtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShhdWRpb0ZpbGVJbnB1dCwgMC40MywgMC40NSwgMzI1LCAzNCk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5QnV0dG9uSWQgPSBcInBsYXlCdXR0b25cIjtcclxuICAgICAgICBpZiAoaXNGaWxlc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgbGV0IG1vZGVSYWRpbyA9IGRyYXdNb2RlU2VsZWN0KHAsIFBsYXlGcm9tRmlsZS5NT0RFX1JBRElPX0lEKTtcclxuICAgICAgICAgICAgaWYgKG1vZGVSYWRpby52YWx1ZSgpICE9PSBcIlwiKSB7IC8vIGlmIHVzZXIgaGFzIHNlbGVjdGVkIGEgbW9kZVxyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXlCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheVwiKTtcclxuICAgICAgICAgICAgICAgIH0sIHBsYXlCdXR0b25JZCk7XHJcbiAgICAgICAgICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5QnV0dG9uLmVsZW1lbnQsIDAuNSwgMC44OCwgNjAsIDM0KTtcclxuICAgICAgICAgICAgICAgIGlmICghcGxheUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZE1vZGU6IE1vZGUgPSBnZXRTZWxlY3RlZE1vZGUobW9kZVJhZGlvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLnN0ZXBmaWxlLmZpbmlzaFBhcnNpbmcoc2VsZWN0ZWRNb2RlLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFBsYXlpbmdEaXNwbGF5KGdsb2JhbC5zdGVwZmlsZS5mdWxsUGFyc2UudHJhY2tzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFNjZW5lKFBBR0VTLlBMQVkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheUJ1dHRvbklkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRTdGVwZmlsZUFuZFVwZGF0ZU1vZGVPcHRpb25zKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgIGdsb2JhbC5zdGVwZmlsZS5sb2FkLmNhbGwoZ2xvYmFsLnN0ZXBmaWxlLCBmaWxlKTtcclxuICAgIGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zID0gdW5kZWZpbmVkO1xyXG4gICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChQbGF5RnJvbUZpbGUuTU9ERV9SQURJT19JRCk7XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZGlzY291cnNlLnByb2Nlc3Npbmcub3JnL3QvaG93LXRvLW9yZ2FuaXplLXJhZGlvLWJ1dHRvbnMtaW4tc2VwYXJhdGUtbGluZXMvMTAwNDEvNVxyXG5mdW5jdGlvbiBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocDogcDUsIHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50KSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBpbnB1dHMgPSBwLnNlbGVjdEFsbCgnaW5wdXQnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBsYWJlbHMgPSBwLnNlbGVjdEFsbCgnbGFiZWwnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBjb25zdCBsZW4gPSBpbnB1dHMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICBwLmNyZWF0ZURpdigpLnBhcmVudChyYWRpb0RpdlA1RWxlbWVudCkuY2hpbGQoaW5wdXRzW2ldKS5jaGlsZChsYWJlbHNbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL2Rpc2NvdXJzZS5wcm9jZXNzaW5nLm9yZy90L2hvdy10by1vcmdhbml6ZS1yYWRpby1idXR0b25zLWluLXNlcGFyYXRlLWxpbmVzLzEwMDQxLzVcclxuZnVuY3Rpb24gZml4UmFkaW9EaXZFbGVtZW50KHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50KSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByYWRpb0RpdlA1RWxlbWVudC5fZ2V0SW5wdXRDaGlsZHJlbkFycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3R5bGVNb2RlT3B0aW9ucyhwOiBwNSwgcmFkaW9EaXZQNUVsZW1lbnQ6IHA1LkVsZW1lbnQsIHN0eWxlQ2xhc3Nlczogc3RyaW5nW10pIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGxldCBkaXZzOiBwNS5FbGVtZW50W10gPSBwLnNlbGVjdEFsbCgnZGl2JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRpdnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkaXZzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgbGV0IGlucHV0czogcDUuRWxlbWVudFtdID0gcC5zZWxlY3RBbGwoJ2lucHV0JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlucHV0c1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGxldCBsYWJlbHM6IHA1LkVsZW1lbnRbXSAgPSBwLnNlbGVjdEFsbCgnbGFiZWwnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdNb2RlU2VsZWN0KHA6IHA1LCB1bmlxdWVJZDogc3RyaW5nKTogcDUuRWxlbWVudCB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIGlmIChnbG9iYWwuc3RlcGZpbGVNb2RlT3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnMgPSBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkoZ2xvYmFsLnN0ZXBmaWxlLnBhcnRpYWxQYXJzZS5tb2Rlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1vZGVSYWRpb0NsYXNzID0gXCJtb2RlLXJhZGlvXCJcclxuICAgIGxldCBtb2RlUmFkaW9PcHRpb25DbGFzcyA9IFwibW9kZS1yYWRpby1vcHRpb25cIjtcclxuICAgIGxldCBtb2RlUmFkaW9DcmVhdGVSZXN1bHQgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlUmFkaW8oKTtcclxuICAgIH0sIHVuaXF1ZUlkKTtcclxuICAgIGxldCBtb2RlUmFkaW8gPSBtb2RlUmFkaW9DcmVhdGVSZXN1bHQuZWxlbWVudDtcclxuICAgIGlmICghbW9kZVJhZGlvQ3JlYXRlUmVzdWx0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdsb2JhbC5zdGVwZmlsZU1vZGVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlID0gZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnNbaV07XHJcbiAgICAgICAgICAgIGxldCByYWRpb0xhYmVsID0gbW9kZS50eXBlICsgXCIsIFwiICsgbW9kZS5kaWZmaWN1bHR5ICsgXCIsIFwiICsgbW9kZS5tZXRlcjtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBsZXQgcmFkaW9PcHRpb24gPSBtb2RlUmFkaW8ub3B0aW9uKHJhZGlvTGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgdGhpcyB3YXkgYmVjYXVzZSB0aGUgdHdvLWFyZ3VtZW50IC5vcHRpb24gbWV0aG9kIHdhc24ndCB3b3JraW5nXHJcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHZhbHVlIGlzIG5lY2Vzc2FyeSBzbyB3ZSBjYW4gYWNjZXNzIHRoZSBzZWxlY3RlZCBtb2RlXHJcbiAgICAgICAgICAgIHJhZGlvT3B0aW9uLnZhbHVlID0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgc3R5bGUgaXMgYmVpbmcgc2V0IG9uIHRoZSBkaXYgY29udGFpbmluZyB0aGUgcmFkaW8gZWxlbWVudHMgdG8gbWFrZSBpdCBhIHNjcm9sbGFibGUgYm94XHJcbiAgICAgICAgbW9kZVJhZGlvLmFkZENsYXNzKG1vZGVSYWRpb0NsYXNzKTtcclxuICAgICAgICBtb2RlUmFkaW8uYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2KHAsIG1vZGVSYWRpbyk7XHJcbiAgICAgICAgZml4UmFkaW9EaXZFbGVtZW50KG1vZGVSYWRpbyk7XHJcbiAgICAgICAgc3R5bGVNb2RlT3B0aW9ucyhwLCBtb2RlUmFkaW8sIFttb2RlUmFkaW9PcHRpb25DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShtb2RlUmFkaW8sIDAuNSwgMC43LCAzMDIsIDEyMCk7XHJcbiAgICBwLnBvcCgpO1xyXG4gICAgcmV0dXJuIG1vZGVSYWRpbztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNGaWxlc1JlYWR5KCkge1xyXG4gICAgbGV0IHN0ZXBmaWxlUmVhZHkgPSBnbG9iYWwuc3RlcGZpbGUuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRCB8fFxyXG4gICAgICAgIGdsb2JhbC5zdGVwZmlsZS5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ7XHJcbiAgICBsZXQgYXVkaW9GaWxlUmVhZHkgPSBnbG9iYWwuYXVkaW9GaWxlLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIHJldHVybiBzdGVwZmlsZVJlYWR5ICYmIGF1ZGlvRmlsZVJlYWR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UGxheWluZ0Rpc3BsYXkodHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgZ2xvYmFsLnBsYXlpbmdEaXNwbGF5ID0gbmV3IFBsYXlpbmdEaXNwbGF5KHRyYWNrcywgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RlZE1vZGUobW9kZVJhZGlvOiBwNS5FbGVtZW50KSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLnN0ZXBmaWxlTW9kZU9wdGlvbnNbbW9kZVJhZGlvLnZhbHVlKCldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdGVwZmlsZUlucHV0TGFiZWwoKSB7XHJcbiAgICBzd2l0Y2goZ2xvYmFsLnN0ZXBmaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLk5PX1NJTUZJTEU6XHJcbiAgICAgICAgICAgIHJldHVybiBcIk5vIGZpbGUgY2hvc2VuXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5ET05FX1JFQURJTkc6XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQ6XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcoZ2xvYmFsLnN0ZXBmaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBdWRpb0ZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKGdsb2JhbC5hdWRpb0ZpbGUuc3RhdGUpIHtcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLk5PX0FVRElPX0ZJTEU6XHJcbiAgICAgICAgICAgIHJldHVybiBcIk5vIGZpbGUgY2hvc2VuXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HOlxyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKGdsb2JhbC5hdWRpb0ZpbGUuZmlsZS5uYW1lLCAzMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIkVycm9yXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcoZnVsbEZpbGVOYW1lOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBpZiAoZnVsbEZpbGVOYW1lLmxlbmd0aCA8PSBtYXhMZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZnVsbEZpbGVOYW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bGxGaWxlTmFtZS5zdWJzdHIoMCwgbWF4TGVuZ3RoIC0gMTEpICtcclxuICAgICAgICBcIi4uLlwiICtcclxuICAgICAgICBmdWxsRmlsZU5hbWUuc3Vic3RyKGZ1bGxGaWxlTmFtZS5sZW5ndGggLSAxMCk7XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7c2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmV9IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4uL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc3VsdHMge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG5cclxuICAgICAgICBnbG9iYWwucmVzdWx0c0Rpc3BsYXkuZHJhdygpO1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJSZXR1cm5cIik7XHJcbiAgICAgICAgfSwgXCJyZXR1cm5CdXR0b25cIik7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocmV0dXJuQnV0dG9uLmVsZW1lbnQsIDAuNSwgMC45LCA3MywgMzQpO1xyXG4gICAgICAgIGlmICghcmV0dXJuQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRTY2VuZShQQUdFUy5QTEFZX0ZST01fRklMRSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBQYXJ0aWFsUGFyc2Uge1xyXG4gICAgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbiAgICBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlVHlwZSB7XHJcbiAgICBOT05FID0gXCIwXCIsXHJcbiAgICBOT1JNQUwgPSBcIjFcIixcclxuICAgIEhPTERfSEVBRCA9IFwiMlwiLFxyXG4gICAgVEFJTCA9IFwiM1wiLFxyXG4gICAgUk9MTF9IRUFEID0gXCI0XCIsXHJcbiAgICBNSU5FID0gXCJNXCIsXHJcbiAgICBVTktOT1dOID0gXCI/Pz9cIixcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvTm90ZVR5cGUoc3RyaW5nOiBzdHJpbmcpOiBOb3RlVHlwZSB7XHJcbiAgICBzd2l0Y2ggKHN0cmluZykge1xyXG4gICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT05FO1xyXG4gICAgICAgIGNhc2UgXCIxXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT1JNQUw7XHJcbiAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLkhPTERfSEVBRDtcclxuICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuVEFJTDtcclxuICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuUk9MTF9IRUFEO1xyXG4gICAgICAgIGNhc2UgXCJNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5NSU5FO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5VTktOT1dOO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlU3RhdGUge1xyXG4gICAgREVGQVVMVCxcclxuICAgIEhJVCxcclxuICAgIE1JU1NFRCxcclxuICAgIEhFTEQsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZSB7XHJcbiAgICB0eXBlOiBOb3RlVHlwZTtcclxuICAgIHR5cGVTdHJpbmc6IHN0cmluZzsgLy8gdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZSBCRUZPUkUgaXQncyBpbnRlcnByZXRlZCBhcyBhIE5vdGVUeXBlXHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBzdGF0ZT86IE5vdGVTdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGUge1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBkaWZmaWN1bHR5OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbWV0ZXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRnVsbFBhcnNlIHtcclxuICAgIG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXTtcclxuICAgIG9mZnNldDogbnVtYmVyO1xyXG4gICAgYnBtczogW251bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgc3RvcHM6IFtudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UpIHtcclxuICAgICAgICB0aGlzLm1ldGFEYXRhID0gcGFydGlhbFBhcnNlLm1ldGFEYXRhO1xyXG4gICAgICAgIHRoaXMubW9kZXMgPSBwYXJ0aWFsUGFyc2UubW9kZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIFN0ZXAgT25lIE9mIFBhcnNpbmcgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpYWxQYXJzZShmaWxlQ29udGVudHM6IHN0cmluZykge1xyXG4gICAgbGV0IHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlID0gbmV3IFBhcnRpYWxQYXJzZSgpO1xyXG4gICAgcGFydGlhbFBhcnNlLm1ldGFEYXRhID0gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZUNvbnRlbnRzKTtcclxuICAgIHBhcnRpYWxQYXJzZS5tb2RlcyA9IGdldE1vZGVzSW5mb0FzU3RyaW5ncyhmaWxlQ29udGVudHMpO1xyXG4gICAgcmV0dXJuIHBhcnRpYWxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZTogc3RyaW5nKSB7XHJcbiAgICAvLyBtYXRjaCBhbnkgbWV0YWRhdGEgdGFnIGV4Y2x1ZGluZyB0aGUgXCJOT1RFU1wiIHRhZyAoY2FzZS1pbnNlbnNpdGl2ZSlcclxuICAgIGxldCByZSA9IC8jKD8hW25OXVtvT11bdFRdW2VFXVtzU10pKFteOl0rKTooW147XSspOy9nO1xyXG4gICAgbGV0IG1hdGNoZXMgPSBbLi4uZmlsZS5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWF0Y2hlc1tpXTtcclxuICAgICAgICBtZXRhRGF0YS5zZXQoY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsxXSkudG9VcHBlckNhc2UoKSwgY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsyXSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ldGFEYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNb2Rlc0luZm9Bc1N0cmluZ3MoZmlsZUNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIC8vIEdldCBcIk5PVEVTXCIgc2VjdGlvbnMgKGNhc2UtaW5zZW5zaXRpdmUpLiBUaGUgZmlyc3QgZml2ZSB2YWx1ZXMgYXJlIHBvc3RmaXhlZCB3aXRoIGEgY29sb24uXHJcbiAgICAvLyBOb3RlIGRhdGEgY29tZXMgbGFzdCwgcG9zdGZpeGVkIGJ5IGEgc2VtaWNvbG9uLlxyXG4gICAgbGV0IHJlID0gLyNbbk5dW29PXVt0VF1bZUVdW3NTXTooW146XSopOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjpdKik6KFteO10rOykvZztcclxuICAgIGxldCBtYXRjaGVzID0gWy4uLmZpbGVDb250ZW50cy5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W10gPSBbXTtcclxuICAgIGxldCBmaWVsZE5hbWVzID0gW1widHlwZVwiLCBcImRlc2MvYXV0aG9yXCIsIFwiZGlmZmljdWx0eVwiLCBcIm1ldGVyXCIsIFwicmFkYXJcIl07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaGVzW2ldO1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgbWF0Y2gubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgIG1vZGUuc2V0KGZpZWxkTmFtZXNbaiAtIDFdLCBjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoW2pdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGUuc2V0KFwibm90ZXNcIiwgbWF0Y2hbbWF0Y2gubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIG1vZGVzLnB1c2gobW9kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW9kZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFuTWV0YURhdGFTdHJpbmcoc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0cmluZy50cmltKCkucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG59XHJcblxyXG4vKiBTdGVwIFR3byBPZiBQYXJzaW5nICovXHJcblxyXG4vLyBUT0RPOiBhY3R1YWxseSByZXR1cm4gRnVsbFBhcnNlXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGdWxsUGFyc2UobW9kZUluZGV4OiBudW1iZXIsIHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlKTogRnVsbFBhcnNlIHtcclxuICAgIGxldCBmdWxsUGFyc2UgPSBuZXcgRnVsbFBhcnNlKHBhcnRpYWxQYXJzZSk7XHJcbiAgICBsZXQgdW5wYXJzZWROb3Rlczogc3RyaW5nID0gcGFydGlhbFBhcnNlLm1vZGVzW21vZGVJbmRleF0uZ2V0KFwibm90ZXNcIik7XHJcbiAgICBsZXQgdW5wYXJzZWRBcnJheTogc3RyaW5nW10gPSB1bnBhcnNlZE5vdGVzLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgbGV0IG1lYXN1cmVzOiBzdHJpbmdbXVtdID0gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheSk7XHJcbiAgICBsZXQgYmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXMpO1xyXG4gICAgbGV0IGNsZWFuZWRCZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSByZW1vdmVCbGFua0xpbmVzKGJlYXRzQW5kTGluZXMpO1xyXG4gICAgbGV0IG9mZnNldDogbnVtYmVyID0gcGFyc2VGbG9hdChwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiT0ZGU0VUXCIpKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gcGFyc2VCUE1TKHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJCUE1TXCIpKTtcclxuICAgIGxldCBzdG9wczogeyBzdG9wRHVyYXRpb246IG51bWJlcjsgYmVhdDogbnVtYmVyIH1bXSA9IHBhcnNlU3RvcHMocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIlNUT1BTXCIpKTtcclxuICAgIGxldCB0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0VGltZUluZm9CeUxpbmUoY2xlYW5lZEJlYXRzQW5kTGluZXMsIG9mZnNldCwgYnBtcywgc3RvcHMpO1xyXG4gICAgZnVsbFBhcnNlLnRyYWNrcyA9IGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXMpO1xyXG4gICAgcmV0dXJuIGZ1bGxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheTogc3RyaW5nW10pIHtcclxuICAgIGxldCBtZWFzdXJlczogc3RyaW5nW11bXSA9IFtdO1xyXG4gICAgbGV0IHN0YXRlID0gMDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBjdXJyZW50TWVhc3VyZTogc3RyaW5nW10gPSBbXTtcclxuICAgIHdoaWxlIChpIDwgdW5wYXJzZWRBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgY3VycmVudExpbmUgPSB1bnBhcnNlZEFycmF5W2ldO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50TGluZS5pbmNsdWRlcyhcIi8vXCIpICYmIGN1cnJlbnRMaW5lLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudExpbmUuaW5jbHVkZXMoXCIsXCIpICYmICFjdXJyZW50TGluZS5pbmNsdWRlcyhcIjtcIikgJiYgY3VycmVudExpbmUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUucHVzaChjdXJyZW50TGluZS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVzLnB1c2goY3VycmVudE1lYXN1cmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtZWFzdXJlcztcclxufVxyXG5cclxuLy8gYXNzdW1lcyA0LzQgdGltZSBzaWduYXR1cmVcclxuZnVuY3Rpb24gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXM6IHN0cmluZ1tdW10pIHtcclxuICAgIGxldCBiZWF0c0FuZExpbmVzID0gW107XHJcbiAgICBsZXQgY3VycmVudEJlYXQgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtZWFzdXJlID0gbWVhc3VyZXNbaV07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZWFzdXJlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGJlYXRzQW5kTGluZXMucHVzaCh7YmVhdDogY3VycmVudEJlYXQsIGxpbmVJbmZvOiBtZWFzdXJlW2pdfSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRCZWF0ICs9IDQgLyBtZWFzdXJlLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQmxhbmtMaW5lcyhiZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10pIHtcclxuICAgIGxldCBjbGVhbmVkQmVhdHNBbmRMaW5lcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZWF0c0FuZExpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBiZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGlmICghaXNBbGxaZXJvcyhsaW5lLmxpbmVJbmZvKSkge1xyXG4gICAgICAgICAgICBjbGVhbmVkQmVhdHNBbmRMaW5lcy5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbGVhbmVkQmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNBbGxaZXJvcyhzdHJpbmc6IHN0cmluZykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc3RyaW5nLmNoYXJBdChpKSAhPT0gJzAnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZUluZm9CeUxpbmUoaW5mb0J5TGluZTogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdLCBvZmZzZXQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W11cclxuKTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10ge1xyXG4gICAgbGV0IGluZm9CeUxpbmVXaXRoVGltZTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSBbXTtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IC1vZmZzZXQgKyBnZXRFbGFwc2VkVGltZSgwLCBpbmZvQnlMaW5lWzBdLmJlYXQsIGJwbXMsIHN0b3BzKTtcclxuICAgIGluZm9CeUxpbmVXaXRoVGltZS5wdXNoKHt0aW1lOiBjdXJyZW50VGltZSwgYmVhdDogaW5mb0J5TGluZVswXS5iZWF0LCBsaW5lSW5mbzogaW5mb0J5TGluZVswXS5saW5lSW5mb30pO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbmZvQnlMaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmVhdCA9IGluZm9CeUxpbmVbaSAtIDFdLmJlYXQ7XHJcbiAgICAgICAgbGV0IGVuZEJlYXQgPSBpbmZvQnlMaW5lW2ldLmJlYXQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gZ2V0RWxhcHNlZFRpbWUoc3RhcnRCZWF0LCBlbmRCZWF0LCBicG1zLCBzdG9wcyk7XHJcbiAgICAgICAgaW5mb0J5TGluZVdpdGhUaW1lLnB1c2goe3RpbWU6IGN1cnJlbnRUaW1lLCBiZWF0OiBpbmZvQnlMaW5lW2ldLmJlYXQsIGxpbmVJbmZvOiBpbmZvQnlMaW5lW2ldLmxpbmVJbmZvfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5mb0J5TGluZVdpdGhUaW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRFbGFwc2VkVGltZShzdGFydEJlYXQ6IG51bWJlciwgZW5kQmVhdDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IGN1cnJlbnRCUE1JbmRleDogbnVtYmVyID0gZ2V0U3RhcnRCUE1JbmRleChzdGFydEJlYXQsIGJwbXMpO1xyXG4gICAgbGV0IGVhcmxpZXN0QmVhdDogbnVtYmVyID0gc3RhcnRCZWF0O1xyXG4gICAgbGV0IGVsYXBzZWRUaW1lOiBudW1iZXIgPSBzdG9wcyA9PSBudWxsID8gMCA6IHN0b3BwZWRUaW1lKHN0YXJ0QmVhdCwgZW5kQmVhdCwgc3RvcHMpO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGxldCBuZXh0QlBNQ2hhbmdlOiBudW1iZXIgPSBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleCwgYnBtcyk7XHJcbiAgICAgICAgbGV0IG5leHRCZWF0OiBudW1iZXIgPSBNYXRoLm1pbihlbmRCZWF0LCBuZXh0QlBNQ2hhbmdlKTtcclxuICAgICAgICBlbGFwc2VkVGltZSArPSAobmV4dEJlYXQgLSBlYXJsaWVzdEJlYXQpIC8gYnBtc1tjdXJyZW50QlBNSW5kZXhdLmJwbSAqIDYwO1xyXG4gICAgICAgIGVhcmxpZXN0QmVhdCA9IG5leHRCZWF0O1xyXG4gICAgICAgIGN1cnJlbnRCUE1JbmRleCsrO1xyXG4gICAgfSB3aGlsZSAoZWFybGllc3RCZWF0IDwgZW5kQmVhdCk7XHJcbiAgICByZXR1cm4gZWxhcHNlZFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN0YXJ0QlBNSW5kZXgoc3RhcnRCZWF0OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10pIHtcclxuICAgIGxldCBzdGFydEJQTUluZGV4ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYnBtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChicG1zW2ldLmJlYXQgPCBzdGFydEJlYXQpIHtcclxuICAgICAgICAgICAgc3RhcnRCUE1JbmRleCA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXJ0QlBNSW5kZXg7XHJcbn1cclxuXHJcbi8vIGRvZXMgTk9UIHNuYXAgdG8gbmVhcmVzdCAxLzE5Mm5kIG9mIGJlYXRcclxuZnVuY3Rpb24gc3RvcHBlZFRpbWUoc3RhcnRCZWF0OiBudW1iZXIsIGVuZEJlYXQ6IG51bWJlciwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W10pIHtcclxuICAgIGxldCB0aW1lID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RvcEJlYXQgPSBzdG9wc1tpXS5iZWF0O1xyXG4gICAgICAgIGlmIChzdGFydEJlYXQgPD0gc3RvcEJlYXQgJiYgc3RvcEJlYXQgPCBlbmRCZWF0KSB7XHJcbiAgICAgICAgICAgIHRpbWUgKz0gc3RvcHNbaV0uc3RvcER1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdKSB7XHJcbiAgICBpZiAoY3VycmVudEJQTUluZGV4ICsgMSA8IGJwbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGJwbXNbY3VycmVudEJQTUluZGV4ICsgMV0uYmVhdDtcclxuICAgIH1cclxuICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmc7IH1bXSkge1xyXG4gICAgbGV0IG51bVRyYWNrczogbnVtYmVyID0gdGltZXNCZWF0c0FuZExpbmVzWzBdLmxpbmVJbmZvLmxlbmd0aDtcclxuICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgdHJhY2tzLnB1c2goW10pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lc0JlYXRzQW5kTGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbGluZTogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZyB9ID0gdGltZXNCZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZS5saW5lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZVN0cmluZyA9IGxpbmUubGluZUluZm8uY2hhckF0KGopO1xyXG4gICAgICAgICAgICBsZXQgbm90ZVR5cGU6IE5vdGVUeXBlID0gc3RyaW5nVG9Ob3RlVHlwZSh0eXBlU3RyaW5nKTtcclxuICAgICAgICAgICAgaWYgKG5vdGVUeXBlICE9PSBOb3RlVHlwZS5OT05FKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja3Nbal0ucHVzaCh7dHlwZTogbm90ZVR5cGUsIHR5cGVTdHJpbmc6IHR5cGVTdHJpbmcsIHRpbWVJblNlY29uZHM6IGxpbmUudGltZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyYWNrcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VCUE1TKGJwbVN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoYnBtU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgYnBtQXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oYnBtU3RyaW5nKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJwbUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnBtcy5wdXNoKHtiZWF0OiBicG1BcnJheVtpXVswXSwgYnBtOiBicG1BcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJwbXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlU3RvcHMoc3RvcHNTdHJpbmc6IHN0cmluZykge1xyXG4gICAgaWYgKHN0b3BzU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgc3RvcHNBcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihzdG9wc1N0cmluZyk7XHJcbiAgICBsZXQgc3RvcHM6IHsgc3RvcER1cmF0aW9uOiBudW1iZXI7IGJlYXQ6IG51bWJlciB9W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN0b3BzLnB1c2goe2JlYXQ6IHN0b3BzQXJyYXlbaV1bMF0sIHN0b3BEdXJhdGlvbjogc3RvcHNBcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0b3BzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKHN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBsZXQgc3RyaW5nQXJyYXk6IHN0cmluZ1tdW10gPSBzdHJpbmcuc3BsaXQoXCIsXCIpLm1hcChlID0+IGUudHJpbSgpLnNwbGl0KFwiPVwiKSk7XHJcbiAgICBsZXQgYXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmdBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5LnB1c2goW3BhcnNlRmxvYXQoc3RyaW5nQXJyYXlbaV1bMF0pLCBwYXJzZUZsb2F0KHN0cmluZ0FycmF5W2ldWzFdKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlIHtcclxuICAgIHByaXZhdGUgaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3I7XHJcbiAgICBwcml2YXRlIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb2xvcjogcDUuQ29sb3I7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYXJ0aWNsZVNpemU6IG51bWJlciA9IDI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRpb25UaW1lSW5TZWNvbmRzOiBudW1iZXIsIGNvbG9yOiBwNS5Db2xvcikge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0gaW5pdGlhbFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFZlbG9jaXR5ID0gaW5pdGlhbFZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24gPSBjb25zdGFudEFjY2VsZXJhdGlvbjtcclxuICAgICAgICB0aGlzLmNyZWF0aW9uVGltZUluU2Vjb25kcyA9IGNyZWF0aW9uVGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgZWxhcHNlZFRpbWUgPSB0aGlzLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uOiBwNS5WZWN0b3IgPSB0aGlzLmdldFBvc2l0aW9uKHAsIGVsYXBzZWRUaW1lKTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLm5vU3Ryb2tlKCk7XHJcbiAgICAgICAgcC5maWxsKGNvbG9yKTtcclxuICAgICAgICBwLmNpcmNsZShjdXJyZW50UG9zaXRpb24ueCwgY3VycmVudFBvc2l0aW9uLnksIFBhcnRpY2xlLnBhcnRpY2xlU2l6ZSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFBvc2l0aW9uKHA6IHA1LCBlbGFwc2VkVGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHZlbG9jaXR5Q29tcG9uZW50OiBwNS5WZWN0b3IgPSBwNS5WZWN0b3IubXVsdCh0aGlzLmluaXRpYWxWZWxvY2l0eSwgZWxhcHNlZFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBhY2NlbGVyYXRpb25Db21wb25lbnQ6IHA1LlZlY3RvciA9IHA1LlZlY3Rvci5tdWx0KHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24sXHJcbiAgICAgICAgICAgIGVsYXBzZWRUaW1lSW5TZWNvbmRzICogZWxhcHNlZFRpbWVJblNlY29uZHMgLyAyKTtcclxuICAgICAgICByZXR1cm4gcDUuVmVjdG9yLmFkZChwNS5WZWN0b3IuYWRkKHRoaXMuaW5pdGlhbFBvc2l0aW9uLCB2ZWxvY2l0eUNvbXBvbmVudCksIGFjY2VsZXJhdGlvbkNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWVJblNlY29uZHMgLSB0aGlzLmNyZWF0aW9uVGltZUluU2Vjb25kcztcclxuICAgIH1cclxufSIsImltcG9ydCB7UGFydGljbGV9IGZyb20gXCIuL3BhcnRpY2xlXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZVN5c3RlbSB7XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlczogUGFydGljbGVbXTtcclxuICAgIHByaXZhdGUgcGFydGljbGVMaWZldGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmVsb2NpdHlBbmdsZVZhcmlhdGlvbkluRGVncmVlczogbnVtYmVyID0gMzA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyB2ZWxvY2l0eU1hZ25pdHVkZVZhcmlhdGlvbkluUGVyY2VudDogbnVtYmVyID0gMzA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjb2xvclZhcmlhdGlvbjogbnVtYmVyID0gMzA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFydGljbGVMaWZldGltZUluU2Vjb25kczogbnVtYmVyLCBjb25zdGFudEFjY2VsZXJhdGlvbjogcDUuVmVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzID0gcGFydGljbGVMaWZldGltZUluU2Vjb25kcztcclxuICAgICAgICB0aGlzLmNvbnN0YW50QWNjZWxlcmF0aW9uID0gY29uc3RhbnRBY2NlbGVyYXRpb247XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMub2xkZXN0UGFydGljbGVBZ2UoY3VycmVudFRpbWVJblNlY29uZHMpID4gdGhpcy5wYXJ0aWNsZUxpZmV0aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlT2xkZXN0UGFydGljbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGU6IFBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBhbHBoYUFkanVzdGVkQ29sb3I6IHA1LkNvbG9yID0gdGhpcy5nZXRBbHBoYUFkanVzdGVkQ29sb3IocGFydGljbGUsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICAgICAgcGFydGljbGUuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcywgYWxwaGFBZGp1c3RlZENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbGRlc3RQYXJ0aWNsZUFnZShjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFydGljbGVzWzBdLmdldEVsYXBzZWRUaW1lSW5TZWNvbmRzKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlT2xkZXN0UGFydGljbGUoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc2hpZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFscGhhQWRqdXN0ZWRDb2xvcihwYXJ0aWNsZTogUGFydGljbGUsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgYmFzZUNvbG9yID0gcGFydGljbGUuY29sb3I7XHJcbiAgICAgICAgbGV0IHBhcnRpY2xlQWdlID0gcGFydGljbGUuZ2V0RWxhcHNlZFRpbWVJblNlY29uZHMoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBsaWZlUmVtYWluaW5nUGVyY2VudCA9ICh0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHMgLSBwYXJ0aWNsZUFnZSkgLyB0aGlzLnBhcnRpY2xlTGlmZXRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IGFscGhhID0gdGhpcy5pbnRlcnBvbGF0ZSgwLCAyNTUsIGxpZmVSZW1haW5pbmdQZXJjZW50KTtcclxuICAgICAgICBsZXQgbmV3Q29sb3I6IHA1LkNvbG9yID0gcC5jb2xvcihiYXNlQ29sb3IpO1xyXG4gICAgICAgIG5ld0NvbG9yLnNldEFscGhhKGFscGhhKTtcclxuICAgICAgICByZXR1cm4gbmV3Q29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnBvbGF0ZShtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pblZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluVmFsdWUgKyAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKiByYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRSYW5kb21pemVkUGFydGljbGVzKGluaXRpYWxQb3NpdGlvbjogcDUuVmVjdG9yLCBpbml0aWFsVmVsb2NpdHk6IHA1LlZlY3RvciwgY3JlYXRpb25UaW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1QYXJ0aWNsZXM6IG51bWJlciwgY29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXJ0aWNsZXM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbmV3SW5pdGFsVmVsb2NpdHkgPSB0aGlzLnJhbmRvbWl6ZVZlY3RvcihwLCBpbml0aWFsVmVsb2NpdHkpO1xyXG4gICAgICAgICAgICBsZXQgbmV3Q29sb3IgPSB0aGlzLnJhbmRvbWl6ZUNvbG9yKHAsIGNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRQYXJ0aWNsZShpbml0aWFsUG9zaXRpb24sIG5ld0luaXRhbFZlbG9jaXR5LCBjcmVhdGlvblRpbWVJblNlY29uZHMsIG5ld0NvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3IocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb25SYW5kb21pemVkOiBwNS5WZWN0b3IgPSB0aGlzLnJhbmRvbWl6ZVZlY3RvckRpcmVjdGlvbihwLCBiYXNlVmVjdG9yKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5kb21pemVWZWN0b3JNYWduaXR1ZGUocCwgZGlyZWN0aW9uUmFuZG9taXplZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5kb21pemVWZWN0b3JEaXJlY3Rpb24ocDogcDUsIGJhc2VWZWN0b3I6IHA1LlZlY3Rvcikge1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgbGV0IGFuZ2xlSW5EZWdyZWVzID0gYmFzZVZlY3Rvci5oZWFkaW5nKCk7XHJcbiAgICAgICAgbGV0IGFuZ2xlQ2hhbmdlSW5EZWdyZWVzID0gcC5yYW5kb20oLVBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5QW5nbGVWYXJpYXRpb25JbkRlZ3JlZXMgLyAyLFxyXG4gICAgICAgICAgICBQYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eUFuZ2xlVmFyaWF0aW9uSW5EZWdyZWVzIC8gMik7XHJcbiAgICAgICAgbGV0IGZpbmFsQW5nbGVJblJhZGlhbnMgPSBwLnJhZGlhbnMoYW5nbGVJbkRlZ3JlZXMgKyBhbmdsZUNoYW5nZUluRGVncmVlcyk7XHJcbiAgICAgICAgbGV0IG1hZ25pdHVkZSA9IGJhc2VWZWN0b3IubWFnKCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICByZXR1cm4gcDUuVmVjdG9yLmZyb21BbmdsZShmaW5hbEFuZ2xlSW5SYWRpYW5zLCBtYWduaXR1ZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9taXplVmVjdG9yTWFnbml0dWRlKHA6IHA1LCBiYXNlVmVjdG9yOiBwNS5WZWN0b3IpIHtcclxuICAgICAgICBsZXQgbWFnbml0dWRlQ2hhbmdlSW5QZXJjZW50ID0gcC5yYW5kb20oLVBhcnRpY2xlU3lzdGVtLnZlbG9jaXR5TWFnbml0dWRlVmFyaWF0aW9uSW5QZXJjZW50IC8gMixcclxuICAgICAgICAgICAgUGFydGljbGVTeXN0ZW0udmVsb2NpdHlNYWduaXR1ZGVWYXJpYXRpb25JblBlcmNlbnQgLyAyKTtcclxuICAgICAgICBsZXQgZmluYWxNYWduaXR1ZGUgPSBiYXNlVmVjdG9yLm1hZygpICogKDEwMCArIG1hZ25pdHVkZUNoYW5nZUluUGVyY2VudCkgLyAxMDA7XHJcbiAgICAgICAgcmV0dXJuIGJhc2VWZWN0b3Iuc2V0TWFnKGZpbmFsTWFnbml0dWRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZUNvbG9yKHA6IHA1LCBiYXNlQ29sb3I6IHA1LkNvbG9yKSB7XHJcbiAgICAgICAgbGV0IG5ld1JlZCA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLnJlZChiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICBsZXQgbmV3R3JlZW4gPSB0aGlzLmJvdW5kZWRSYW5kb21pemUocCwgcC5ncmVlbihiYXNlQ29sb3IpLCBQYXJ0aWNsZVN5c3RlbS5jb2xvclZhcmlhdGlvbiwgMCwgMjU1KTtcclxuICAgICAgICBsZXQgbmV3Qmx1ZSA9IHRoaXMuYm91bmRlZFJhbmRvbWl6ZShwLCBwLmJsdWUoYmFzZUNvbG9yKSwgUGFydGljbGVTeXN0ZW0uY29sb3JWYXJpYXRpb24sIDAsIDI1NSk7XHJcbiAgICAgICAgcmV0dXJuIHAuY29sb3IobmV3UmVkLCBuZXdHcmVlbiwgbmV3Qmx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBib3VuZGVkUmFuZG9taXplKHA6IHA1LCB2YWx1ZTogbnVtYmVyLCB2YXJpYXRpb246IG51bWJlciwgbG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZSArIHAucmFuZG9tKC12YXJpYXRpb24gLyAyLCB2YXJpYXRpb24gLyAyKTtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPD0gbG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyQm91bmQgPCBuZXdWYWx1ZSAmJiBuZXdWYWx1ZSA8IHVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGFydGljbGUoaW5pdGlhbFBvc2l0aW9uOiBwNS5WZWN0b3IsIGluaXRpYWxWZWxvY2l0eTogcDUuVmVjdG9yLCBjcmVhdGlvblRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcDUuQ29sb3IpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgUGFydGljbGUoaW5pdGlhbFBvc2l0aW9uLCBpbml0aWFsVmVsb2NpdHksIHRoaXMuY29uc3RhbnRBY2NlbGVyYXRpb24sIGNyZWF0aW9uVGltZUluU2Vjb25kcywgY29sb3IpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBQbGF5ZXJLZXlBY3Rpb24ge1xyXG4gICAgZ2FtZVRpbWU6IG51bWJlcjtcclxuICAgIHRyYWNrOiBudW1iZXI7XHJcbiAgICBrZXlTdGF0ZTogS2V5U3RhdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZVRpbWU6IG51bWJlciwgdHJhY2s6IG51bWJlciwga2V5U3RhdGU6IEtleVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lVGltZSA9IGdhbWVUaW1lO1xyXG4gICAgICAgIHRoaXMudHJhY2sgPSB0cmFjaztcclxuICAgICAgICB0aGlzLmtleVN0YXRlID0ga2V5U3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEtleVN0YXRlIHtcclxuICAgIFVQLCBET1dOLFxyXG59IiwiaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge0Rpc3BsYXlDb25maWcsIERpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7VGltZU1hbmFnZXJ9IGZyb20gXCIuL3RpbWVfbWFuYWdlclwiO1xyXG5pbXBvcnQge01pc3NNYW5hZ2VyfSBmcm9tIFwiLi9taXNzX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxNYW5hZ2VyfSBmcm9tIFwiLi9zY3JvbGxfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Jlc3VsdHNEaXNwbGF5fSBmcm9tIFwiLi9yZXN1bHRzX2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7XHJcbiAgICBpbml0aWFsaXplS2V5QmluZGluZ3MsXHJcbiAgICBpc0tleUJpbmRpbmdzRGVmaW5lZCxcclxuICAgIHJlcGxhY2VOb3RZZXRJbXBsZW1lbnRlZE5vdGVUeXBlcyxcclxuICAgIHNldEFsbE5vdGVzVG9EZWZhdWx0U3RhdGVcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleVN0YXRlLCBQbGF5ZXJLZXlBY3Rpb259IGZyb20gXCIuL3BsYXllcl9rZXlfYWN0aW9uXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZywgQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZX0gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lGZWVkYmFja1RleHR9IGZyb20gXCIuL2FjY3VyYWN5X2ZlZWRiYWNrX3RleHRcIjtcclxuaW1wb3J0IHtSZWNlcHRvclNocmlua1JlYWN0aW9ufSBmcm9tIFwiLi9yZWNlcHRvcl9zaHJpbmtfcmVhY3Rpb25cIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrRmxhc2h9IGZyb20gXCIuL2FjY3VyYWN5X2ZlZWRiYWNrX2ZsYXNoXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lGZWVkYmFja1BhcnRpY2xlc30gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfcGFydGljbGVzXCI7XHJcbmltcG9ydCB7SG9sZFBhcnRpY2xlc30gZnJvbSBcIi4vaG9sZF9wYXJ0aWNsZXNcIjtcclxuaW1wb3J0IHtIb2xkR2xvd30gZnJvbSBcIi4vaG9sZF9nbG93XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWluZ0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogUDVTY2VuZTtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSB0aW1lTWFuYWdlcjogR2FtZVRpbWVQcm92aWRlcjtcclxuICAgIHByaXZhdGUgbWlzc01hbmFnZXI6IE1pc3NNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgZ2FtZUVuZFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2hvd1Jlc3VsdHNTY3JlZW46IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgaXNEZWJ1Z01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lGZWVkYmFja1RleHQ6IEFjY3VyYWN5RmVlZGJhY2tUZXh0O1xyXG4gICAgcHJpdmF0ZSBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcbiAgICBwcml2YXRlIHJlY2VwdG9yU2hyaW5rUmVhY3Rpb246IFJlY2VwdG9yU2hyaW5rUmVhY3Rpb247XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5RmVlZGJhY2tGbGFzaDogQWNjdXJhY3lGZWVkYmFja0ZsYXNoO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzOiBBY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzO1xyXG4gICAgcHJpdmF0ZSBob2xkUGFydGljbGVzOiBIb2xkUGFydGljbGVzO1xyXG4gICAgcHJpdmF0ZSBob2xkR2xvdzogSG9sZEdsb3c7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSwgY29uZmlnOiBDb25maWcsIHNjZW5lOiBQNVNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0c1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgdGltZSBtYW5hZ2VyIGFuZCBwbGF5IHRoZSBhdWRpbyBhcyBjbG9zZSB0b2dldGhlciBhcyBwb3NzaWJsZSB0byBzeW5jaHJvbml6ZSB0aGUgYXVkaW8gd2l0aCB0aGUgZ2FtZVxyXG4gICAgICAgIGlmICghdGhpcy5pc0RlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFRpbWVNYW5hZ2VyKHBlcmZvcm1hbmNlLm5vdygpLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgICAgIGdsb2JhbC5hdWRpb0ZpbGUucGxheShjb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBuZXcgTm90ZU1hbmFnZXIodHJhY2tzKTtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzOiBudW1iZXIgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IG5ldyBBY2N1cmFjeVJlY29yZGluZyhudW1UcmFja3MpO1xyXG5cclxuICAgICAgICBsZXQgd2lkdGggPSAyNDA7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IDQ4MDtcclxuICAgICAgICBsZXQgdG9wTGVmdFggPSAodGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZS53aWR0aCAtIHdpZHRoKSAvIDI7XHJcbiAgICAgICAgbGV0IHRvcExlZnRZID0gKHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UuaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmlnID0gbmV3IFBsYXlpbmdDb25maWcodGhpcy5jb25maWcsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IG5ldyBEaXNwbGF5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmRpc3BsYXlDb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsXHJcbiAgICAgICAgICAgIHRvcExlZnRYLCB0b3BMZWZ0WSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcyA9IG5ldyBIb2xkUGFydGljbGVzKHRoaXMuY29uZmlnLCBudW1UcmFja3MsIHRoaXMuZGlzcGxheU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuaG9sZEdsb3cgPSBuZXcgSG9sZEdsb3codGhpcy5jb25maWcsIG51bVRyYWNrcywgdGhpcy5kaXNwbGF5TWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5ob2xkTWFuYWdlciA9IG5ldyBIb2xkTWFuYWdlcihudW1UcmFja3MsIHRoaXMub25UcmFja0hvbGQuYmluZCh0aGlzKSwgdGhpcy5vblRyYWNrVW5ob2xkLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0RlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFNjcm9sbE1hbmFnZXIodGhpcy5jb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nYW1lRW5kVGltZSA9IHRoaXMuY2FsY3VsYXRlR2FtZUVuZChnbG9iYWwuYXVkaW9GaWxlLmdldER1cmF0aW9uKCksIHRoaXMuZ2V0Tm90ZXNFbmRUaW1lKCkpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyID0gbmV3IEFjY3VyYWN5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmNvbmZpZywgdGhpcy5ob2xkTWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBY2N1cmFjeUV2ZW50LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIgPSBuZXcgTWlzc01hbmFnZXIodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuaG9sZE1hbmFnZXIsXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWNjdXJhY3lFdmVudC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrVGV4dCA9IG5ldyBBY2N1cmFjeUZlZWRiYWNrVGV4dCh0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0b3BMZWZ0WCArIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgdG9wTGVmdFkgKyBoZWlnaHQgLyAyLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2ggPSBuZXcgQWNjdXJhY3lGZWVkYmFja0ZsYXNoKHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlNYW5hZ2VyLFxyXG4gICAgICAgICAgICBudW1UcmFja3MpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbiA9IG5ldyBSZWNlcHRvclNocmlua1JlYWN0aW9uKHRoaXMuY29uZmlnLCB0aGlzLmRpc3BsYXlDb25maWcsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrUGFydGljbGVzID0gbmV3IEFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXModGhpcy5jb25maWcsIHRoaXMuZGlzcGxheU1hbmFnZXIsIG51bVRyYWNrcyk7XHJcblxyXG4gICAgICAgIGlmICghaXNLZXlCaW5kaW5nc0RlZmluZWQobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplS2V5QmluZGluZ3MobnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iaW5kS2V5QmluZGluZ3NUb0FjdGlvbnMoKTtcclxuICAgICAgICBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzKTtcclxuICAgICAgICByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXModGhpcy5ub3RlTWFuYWdlci50cmFja3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50OiBBY2N1cmFjeUV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUcmFjayAjXCIgKyAoYWNjdXJhY3lFdmVudC50cmFja051bWJlciArIDEpICsgXCIgXCIgKyBhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TmFtZSArXHJcbiAgICAgICAgICAgIChNYXRoLmFicyhhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzKSA9PSBJbmZpbml0eSA/XHJcbiAgICAgICAgICAgICAgICBcIlwiIDpcclxuICAgICAgICAgICAgICAgIFwiIChcIiArIE1hdGgucm91bmQoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcykgKyBcIiBtcylcIikpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuYWRkUGFydGljbGVzRm9yQWNjdXJhY3lFdmVudChhY2N1cmFjeUV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVJblNlY29uZHMgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJblNlY29uZHMgPj0gdGhpcy5nYW1lRW5kVGltZSAmJiAhdGhpcy5zaG93UmVzdWx0c1NjcmVlbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnN0YXRlID0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZS5SRUFEWTtcclxuICAgICAgICAgICAgdGhpcy5lbmRTb25nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIudXBkYXRlKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaHJpbmtSZWFjdGlvbi5kcmF3KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lUZXh0RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tUZXh0LmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQWNjdXJhY3lGbGFzaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRmxhc2guZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0FjY3VyYWN5UGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5RmVlZGJhY2tQYXJ0aWNsZXMuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRQYXJ0aWNsZXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZFBhcnRpY2xlcy5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3Rlc0VuZFRpbWUoKSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0QWNjdXJhY3k6IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlYXJsaWVzdEFjY3VyYWN5ID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWFybGllc3RBY2N1cmFjeSA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlTWFuYWdlci5nZXRMYXRlc3ROb3RlKCkudGltZUluU2Vjb25kcyArIGVhcmxpZXN0QWNjdXJhY3kgLyAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlR2FtZUVuZChhdWRpb0R1cmF0aW9uOiBudW1iZXIsIG5vdGVzRW5kVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGF1ZGlvRHVyYXRpb24gPCBub3Rlc0VuZFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vdGVzRW5kVGltZSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihub3Rlc0VuZFRpbWUgKyA1LCBhdWRpb0R1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuZFNvbmcoKSB7XHJcbiAgICAgICAgZ2xvYmFsLmF1ZGlvRmlsZS5zdG9wKCk7XHJcbiAgICAgICAgZ2xvYmFsLnJlc3VsdHNEaXNwbGF5ID0gbmV3IFJlc3VsdHNEaXNwbGF5KHRoaXMuY29uZmlnLCB0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmFjY3VyYWN5TWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSwgdGhpcy5hY2N1cmFjeVJlY29yZGluZyk7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFNjZW5lKFBBR0VTLlJFU1VMVFMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmluZEtleUJpbmRpbmdzVG9BY3Rpb25zKCkge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5ncyA9IGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlCaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZzogS2V5QmluZGluZyA9IGtleUJpbmRpbmdzW2ldO1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKGtleUJpbmRpbmcua2V5Q29kZSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleURvd25BY3Rpb25Gb3JUcmFjayhrZXlCaW5kaW5nLnRyYWNrTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVVwQWN0aW9uRm9yVHJhY2soa2V5QmluZGluZy50cmFja051bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKGdsb2JhbC5jb25maWcucXVpdEtleSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVuZFNvbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGtleURvd25BY3Rpb25Gb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNocmlua1JlYWN0aW9uLmhvbGRUcmFjayh0cmFja051bWJlcik7XHJcbiAgICAgICAgbGV0IHBsYXllcktleUFjdGlvbjogUGxheWVyS2V5QWN0aW9uID1cclxuICAgICAgICAgICAgbmV3IFBsYXllcktleUFjdGlvbih0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKSwgdHJhY2tOdW1iZXIsIEtleVN0YXRlLkRPV04pO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyLmhhbmRsZVBsYXllckFjdGlvbihwbGF5ZXJLZXlBY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUga2V5VXBBY3Rpb25Gb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvclNocmlua1JlYWN0aW9uLnJlbGVhc2VUcmFjayh0cmFja051bWJlcik7XHJcbiAgICAgICAgbGV0IHBsYXllcktleUFjdGlvbjogUGxheWVyS2V5QWN0aW9uID1cclxuICAgICAgICAgICAgbmV3IFBsYXllcktleUFjdGlvbih0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKSwgdHJhY2tOdW1iZXIsIEtleVN0YXRlLlVQKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlci5oYW5kbGVQbGF5ZXJBY3Rpb24ocGxheWVyS2V5QWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVHJhY2tIb2xkKHRyYWNrTnVtYmVyOiBudW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkR2xvd0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkR2xvdy5ob2xkVHJhY2suY2FsbCh0aGlzLmhvbGRHbG93LCB0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNIb2xkUGFydGljbGVzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRQYXJ0aWNsZXMuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkUGFydGljbGVzLCB0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVHJhY2tVbmhvbGQodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0hvbGRHbG93RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRHbG93LnVuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkR2xvdywgdHJhY2tOdW1iZXIsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSG9sZFBhcnRpY2xlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkUGFydGljbGVzLnVuaG9sZFRyYWNrLmNhbGwodGhpcy5ob2xkUGFydGljbGVzLCB0cmFja051bWJlciwgY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGxheWluZ0NvbmZpZyBpbXBsZW1lbnRzIERpc3BsYXlDb25maWcge1xyXG4gICAgcHVibGljIG5vdGVTaXplOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGl4ZWxzUGVyU2Vjb25kOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVjZXB0b3JZUGVyY2VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgcHVibGljIHJlY2VwdG9yU2l6ZXM6IG51bWJlcltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubm90ZVNpemUgPSBjb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBjb25maWcucGl4ZWxzUGVyU2Vjb25kO1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JZUGVyY2VudCA9IGNvbmZpZy5yZWNlcHRvcllQZXJjZW50O1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsRGlyZWN0aW9uID0gY29uZmlnLnNjcm9sbERpcmVjdGlvbjtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yU2l6ZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjZXB0b3JTaXplcy5wdXNoKGNvbmZpZy5ub3RlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGVTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm90ZVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGl4ZWxzUGVyU2Vjb25kKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGl4ZWxzUGVyU2Vjb25kO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlY2VwdG9yU2l6ZXMoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlY2VwdG9yU2l6ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVjZXB0b3JZUGVyY2VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlY2VwdG9yWVBlcmNlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2Nyb2xsRGlyZWN0aW9uKCk6IFNjcm9sbERpcmVjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJlY2VwdG9yU2l6ZSh0cmFja051bWJlcjogbnVtYmVyLCByZWNlcHRvclNpemU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjZXB0b3JTaXplc1t0cmFja051bWJlcl0gPSByZWNlcHRvclNpemU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0Rpc3BsYXlDb25maWcsIERpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UDVTY2VuZX0gZnJvbSBcIi4vcDVfc2NlbmVcIjtcclxuaW1wb3J0IHtTY3JvbGxNYW5hZ2VyfSBmcm9tIFwiLi9zY3JvbGxfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByZXZpZXdEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgc2NlbmU6IFA1U2NlbmU7XHJcbiAgICBjb25maWc6IENvbmZpZztcclxuICAgIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc2Nyb2xsTWFuYWdlcjogU2Nyb2xsTWFuYWdlcjtcclxuICAgIHByaXZhdGUgZGlzcGxheU1hbmFnZXI6IERpc3BsYXlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WCA9IDY1O1xyXG4gICAgcHJpdmF0ZSB0b3BMZWZ0WSA9IDU1O1xyXG4gICAgcHJpdmF0ZSB3aWR0aCA9IDIwMDtcclxuICAgIHByaXZhdGUgaGVpZ2h0ID0gNDAwO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNrczogTm90ZVtdW10sIGNvbmZpZzogQ29uZmlnLCBzY2VuZTogUDVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbmV3IE5vdGVNYW5hZ2VyKHRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxNYW5hZ2VyID0gbmV3IFNjcm9sbE1hbmFnZXIodGhpcy5jb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsIHRoaXMuZ2V0Qm91bmRzKCkpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IHRoaXMuZ2V0RGlzcGxheUNvbmZpZyh0aGlzLmNvbmZpZywgdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuZGlzcGxheUNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSxcclxuICAgICAgICAgICAgdGhpcy50b3BMZWZ0WCwgdGhpcy50b3BMZWZ0WSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlci5kcmF3KHRoaXMuc2Nyb2xsTWFuYWdlci5nZXRHYW1lVGltZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJvdW5kcygpIHtcclxuICAgICAgICByZXR1cm4ge3RvcExlZnRYOiB0aGlzLnRvcExlZnRYLCB0b3BMZWZ0WTogdGhpcy50b3BMZWZ0WSwgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheUNvbmZpZyhjb25maWc6IENvbmZpZywgbnVtVHJhY2tzOiBudW1iZXIpOiBEaXNwbGF5Q29uZmlnIHtcclxuICAgICAgICBsZXQgcmVjZXB0b3JTaXplczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlY2VwdG9yU2l6ZXMucHVzaChjb25maWcubm90ZVNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0Tm90ZVNpemU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBpeGVsc1BlclNlY29uZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFJlY2VwdG9yWVBlcmNlbnQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcucmVjZXB0b3JZUGVyY2VudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0U2Nyb2xsRGlyZWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLnNjcm9sbERpcmVjdGlvbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UmVjZXB0b3JTaXplczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VwdG9yU2l6ZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJlY2VwdG9yU2l6ZTogKHRyYWNrTnVtYmVyOiBudW1iZXIsIHJlY2VwdG9yU2l6ZTogbnVtYmVyKSA9PiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0Rpc3BsYXlDb25maWd9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlY2VwdG9yU2hyaW5rUmVhY3Rpb24ge1xyXG4gICAgcHJpdmF0ZSB0cmFja0hvbGRTdGF0ZXM6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlDb25maWc6IERpc3BsYXlDb25maWc7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBkaXNwbGF5Q29uZmlnOiBEaXNwbGF5Q29uZmlnLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZyA9IGRpc3BsYXlDb25maWc7XHJcbiAgICAgICAgdGhpcy5udW1UcmFja3MgPSBudW1UcmFja3M7XHJcbiAgICAgICAgdGhpcy50cmFja0hvbGRTdGF0ZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzLnB1c2goZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnRyYWNrSG9sZFN0YXRlc1t0cmFja051bWJlcl0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudHJhY2tIb2xkU3RhdGVzW3RyYWNrTnVtYmVyXSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBudW1SZWNlcHRvcnMgPSB0aGlzLmRpc3BsYXlDb25maWcuZ2V0UmVjZXB0b3JTaXplcygpLmxlbmd0aDtcclxuICAgICAgICBsZXQgc2hyaW5rID0gMC43O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUmVjZXB0b3JzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpemVSYXRpbyA9IHRoaXMuaXNUcmFja0hlbGQoaSkgPyBzaHJpbmsgOiAxLjA7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvbmZpZy5zZXRSZWNlcHRvclNpemUoaSwgdGhpcy5jb25maWcubm90ZVNpemUgKiBzaXplUmF0aW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFja0hvbGRTdGF0ZXNbdHJhY2tOdW1iZXJdO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7ZHJhd0FjY3VyYWN5QmFyc30gZnJvbSBcIi4vZHJhd2luZ191dGlsXCI7XHJcbmltcG9ydCB7QWNjdXJhY3ksIEFjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuXHJcbi8vVE9ETzogdGFrZSBob2xkcyBhbmQgcmVsZWFzZXMgaW50byBhY2NvdW50XHJcbmV4cG9ydCBjbGFzcyBSZXN1bHRzRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIHA6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyLCBwOiBwNSxcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlciA9IGFjY3VyYWN5TWFuYWdlcjtcclxuICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0FjY3VyYWN5UmVzdWx0cyh0aGlzLnAsIHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBY2N1cmFjeVJlc3VsdHMocDogcDUsIGFjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHAud2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gcC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIGxldCBiYXJXaWR0aCA9IHAud2lkdGggKiAwLjY7XHJcbiAgICAgICAgbGV0IGJhckhlaWdodCA9IGJhcldpZHRoIC8gMTA7XHJcbiAgICAgICAgbGV0IGxlZnRMYWJlbEhlaWdodCA9IDAuOCAqIGJhckhlaWdodDtcclxuICAgICAgICBsZXQgYWNjdXJhY3lMaXN0Rm9yUmVzdWx0cyA9IHRoaXMuZ2V0UmVzdWx0c0FjY3VyYWN5TGlzdChhY2N1cmFjeVNldHRpbmdzKTtcclxuICAgICAgICBkcmF3QWNjdXJhY3lCYXJzKHAsIGFjY3VyYWN5TGlzdEZvclJlc3VsdHMsIGFjY3VyYWN5UmVjb3JkaW5nLCBjZW50ZXJYLCBjZW50ZXJZLCBsZWZ0TGFiZWxIZWlnaHQsIGJhcldpZHRoLFxyXG4gICAgICAgICAgICBiYXJIZWlnaHQsIG5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybiBhIGxpc3Qgb2YgdW5pcXVlIGFjY3VyYWNpZXMgc29ydGVkIGJ5IHRoZSBvZmZzZXQsIHdpdGggdGhlIGJlc3QgYWNjdXJhY3kgYmVpbmcgZmlyc3RcclxuICAgIHByaXZhdGUgZ2V0UmVzdWx0c0FjY3VyYWN5TGlzdChhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPSBhY2N1cmFjeVNldHRpbmdzLm1hcChhY2N1cmFjeSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGFjY3VyYWN5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICBzb3J0VmFsdWU6IHRoaXMuZ2V0QWNjdXJhY3lTb3J0aW5nVmFsdWUoYWNjdXJhY3kubG93ZXJCb3VuZCwgYWNjdXJhY3kudXBwZXJCb3VuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWVyZ2VkQWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID1cclxuICAgICAgICAgICAgdGhpcy5tZXJnZUFjY3VyYWNpZXNXaXRoU2FtZU5hbWUoYWNjdXJhY3lUYWJsZSk7XHJcbiAgICAgICAgbWVyZ2VkQWNjdXJhY3lUYWJsZS5zb3J0KHRoaXMuYWNjdXJhY3lUYWJsZVNvcnRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZEFjY3VyYWN5VGFibGUubWFwKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFjY3VyYWN5U29ydGluZ1ZhbHVlKGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGxvd2VyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModXBwZXJCb3VuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cHBlckJvdW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKGxvd2VyQm91bmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoKHVwcGVyQm91bmQgKyBsb3dlckJvdW5kKSAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWVyZ2VBY2N1cmFjaWVzV2l0aFNhbWVOYW1lKGFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmc7IHNvcnRWYWx1ZTogbnVtYmVyIH1bXSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRBY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPSBbXTtcclxuICAgICAgICB3aGlsZSAoYWNjdXJhY3lUYWJsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlBY2N1cmFjeU5hbWUgPSBhY2N1cmFjeVRhYmxlWzBdLmFjY3VyYWN5TmFtZTtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRBY2N1cmFjaWVzID0gYWNjdXJhY3lUYWJsZS5maWx0ZXIocm93ID0+IHJvdy5hY2N1cmFjeU5hbWUgPT09IGtleUFjY3VyYWN5TmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBzb3J0VmFsdWVBdmVyYWdlID0gbWF0Y2hlZEFjY3VyYWNpZXNcclxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChzdW0sIHJvdykgPT4gc3VtICsgcm93LnNvcnRWYWx1ZSwgMClcclxuICAgICAgICAgICAgICAgIC8gbWF0Y2hlZEFjY3VyYWNpZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBtZXJnZWRBY2N1cmFjeVRhYmxlLnB1c2goe2FjY3VyYWN5TmFtZToga2V5QWNjdXJhY3lOYW1lLCBzb3J0VmFsdWU6IHNvcnRWYWx1ZUF2ZXJhZ2V9KTtcclxuICAgICAgICAgICAgYWNjdXJhY3lUYWJsZSA9IGFjY3VyYWN5VGFibGUuZmlsdGVyKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lICE9PSBrZXlBY2N1cmFjeU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVyZ2VkQWNjdXJhY3lUYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFjY3VyYWN5VGFibGVTb3J0RnVuY3Rpb24oYTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgcmV0dXJuIGEuc29ydFZhbHVlIC0gYi5zb3J0VmFsdWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZW51bSBTY3JvbGxEaXJlY3Rpb24ge1xyXG4gICAgVXAsXHJcbiAgICBEb3duLFxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7VGltZU1hbmFnZXJ9IGZyb20gXCIuL3RpbWVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsTWFuYWdlciBpbXBsZW1lbnRzIEdhbWVUaW1lUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgc3lzdGVtVGltZU1pbGxpczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0aW1lTWFuYWdlcjogVGltZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHNjcm9sbEJvdW5kczogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBwOiBwNSwgc2Nyb2xsQm91bmRzPzogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFRpbWVNYW5hZ2VyKDAsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLnNjcm9sbEJvdW5kcyA9IHNjcm9sbEJvdW5kcztcclxuICAgICAgICBwLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiAoZTogV2hlZWxFdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgYWxsb3dTY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbEJvdW5kcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3VzZUlzSW5Cb3VuZHMocCwgdGhpcy5zY3JvbGxCb3VuZHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1Njcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVDaGFuZ2VNaWxsaXMgPSBlLmRlbHRhWSAqIDAuMjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzIC09IHRpbWVDaGFuZ2VNaWxsaXM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyArPSB0aW1lQ2hhbmdlTWlsbGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFsbG93IGFuIGlnbm9yZWQgYXJndW1lbnQgc28gaXQgY2FuIGJlIHVzZWQgaW4gcGxhY2Ugb2YgYSBUaW1lTWFuYWdlciBmb3IgZGVidWcgbW9kZVxyXG4gICAgZ2V0R2FtZVRpbWUoaWdub3JlZEFyZ3VtZW50PzogYW55KSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHRoaXMuc3lzdGVtVGltZU1pbGxpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3VzZUlzSW5Cb3VuZHMocDogcDUsIGJvdW5kczogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSB7XHJcbiAgICAgICAgaWYgKHAubW91c2VYID49IGJvdW5kcy50b3BMZWZ0WCAmJiBwLm1vdXNlWCA8PSBib3VuZHMudG9wTGVmdFggKyBib3VuZHMud2lkdGggJiZcclxuICAgICAgICAgICAgcC5tb3VzZVkgPj0gYm91bmRzLnRvcExlZnRZICYmIHAubW91c2VZIDw9IGJvdW5kcy50b3BMZWZ0WSArIGJvdW5kcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtGdWxsUGFyc2UsIGdldEZ1bGxQYXJzZSwgZ2V0UGFydGlhbFBhcnNlLCBQYXJ0aWFsUGFyc2V9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0ZXBmaWxlU3RhdGUge1xyXG4gICAgTk9fU0lNRklMRSxcclxuICAgIERPTkVfUkVBRElORyxcclxuICAgIFBBUlRJQUxMWV9QQVJTRUQsXHJcbiAgICBGVUxMWV9QQVJTRUQsXHJcbiAgICBFUlJPUixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXBmaWxlIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogU3RlcGZpbGVTdGF0ZTtcclxuICAgIHB1YmxpYyBmaWxlOiBGaWxlO1xyXG4gICAgcHVibGljIHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlO1xyXG4gICAgcHVibGljIGZ1bGxQYXJzZTogRnVsbFBhcnNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5OT19TSU1GSUxFO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlLmZpbGU7IC8vIHRoaXMgdW53cmFwcyB0aGUgcDUuRmlsZSB3cmFwcGVyIHRvIGdldCB0aGUgb3JpZ2luYWwgRE9NIGZpbGVcclxuICAgICAgICBsb2FkVGV4dEZpbGUodGhpcy5maWxlLCAoKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkRPTkVfUkVBRElORztcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsUGFyc2UgPSBnZXRQYXJ0aWFsUGFyc2UoPHN0cmluZz5ldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGlhbFBhcnNlLm1vZGVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluaXNoUGFyc2luZyhtb2RlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQgfHwgdGhpcy5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5mdWxsUGFyc2UgPSBnZXRGdWxsUGFyc2UobW9kZUluZGV4LCB0aGlzLnBhcnRpYWxQYXJzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRUZXh0RmlsZShcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBsaXN0ZW5lcjogKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiBhbnksXHJcbiAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXHJcbikge1xyXG4gICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgZmlsZVJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xyXG4gICAgZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCBsaXN0ZW5lciwgb3B0aW9ucyk7XHJcbn0iLCJpbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZU1hbmFnZXIgaW1wbGVtZW50cyBHYW1lVGltZVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkID0gc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVsYXBzZWRUaW1lKHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHN5c3RlbVRpbWVNaWxsaXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIkVycm9yOiBjYW4ndCBnZXQgZWxhcHNlZCB0aW1lLiBFeHBlY3RlZCAxIGFyZ3VtZW50OiBzeXN0ZW1UaW1lLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChzeXN0ZW1UaW1lTWlsbGlzIC0gdGhpcy5zeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkKSAvIDEwMDA7IC8vIGluIHNlY29uZHNcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSB3YW50IHRvIGtlZXAgdGhpcyBjYWxjdWxhdGlvbiBpbiBvbmx5IG9uZSBwbGFjZVxyXG4gICAgZ2V0R2FtZVRpbWUoc3lzdGVtVGltZU1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxhcHNlZFRpbWUoc3lzdGVtVGltZU1pbGxpcykgKyB0aGlzLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzIC0gdGhpcy5jb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgZW51bVRvU3RyaW5nQXJyYXksXHJcbiAgICBmaW5kQmluZGluZ0luZm9Gb3JUcmFjayxcclxuICAgIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSxcclxuICAgIGdldEtleUJpbmRpbmdCdXR0b25JZCxcclxuICAgIGdldEtleUJpbmRpbmdDb250YWluZXJJZCxcclxuICAgIGdldEtleVN0cmluZyxcclxuICAgIHNldENvbmZpZ0tleUJpbmRpbmdcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3SGVhZGluZygpIHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgbGV0IGhlYWRpbmdDbGFzcyA9IFwibmF2aWdhdGlvbi1oZWFkaW5nXCI7XHJcblxyXG4gICAgbGV0IHBsYXlGcm9tRmlsZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJQbGF5IEZyb20gRmlsZVwiKTtcclxuICAgIH0sIFwicGxheUZyb21GaWxlQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQsIDAuMywgMC4wMzYsIDEzMCwgMzQpO1xyXG4gICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50U2NlbmUoUEFHRVMuUExBWV9GUk9NX0ZJTEUpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXBsYXlGcm9tRmlsZUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoaGVhZGluZ0NsYXNzKTtcclxuICAgICAgICBwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvcHRpb25zQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIk9wdGlvbnNcIik7XHJcbiAgICB9LCBcIm9wdGlvbnNCdXR0b25cIik7XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShvcHRpb25zQnV0dG9uLmVsZW1lbnQsIDAuNywgMC4wMzYsIDkwLCAzNCk7XHJcbiAgICBvcHRpb25zQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50U2NlbmUoUEFHRVMuT1BUSU9OUyk7XHJcbiAgICB9KTtcclxuICAgIGlmICghb3B0aW9uc0J1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgcmVsYXRpdmVYIGFuZCByZWxhdGl2ZSBZIHRvIGJlIGJldHdlZW4gMCBhbmQgMVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoZWxlbWVudDogcDUuRWxlbWVudCwgcmVsYXRpdmVYOiBudW1iZXIsIHJlbGF0aXZlWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIGxldCBwID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICBsZXQgY2FudmFzUG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSA9IHAuX3JlbmRlcmVyLnBvc2l0aW9uKCk7XHJcbiAgICBlbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAocmVsYXRpdmVYICogcC53aWR0aCkgLSAod2lkdGggLyAyKSxcclxuICAgICAgICBjYW52YXNQb3NpdGlvbi55ICsgKHJlbGF0aXZlWSAqIHAuaGVpZ2h0KSAtIChoZWlnaHQgLyAyKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkSW5wdXQobGFiZWxTdHJpbmc6IHN0cmluZywgaW5wdXRJZDogc3RyaW5nLCBpbnB1dEluaXRpYWxWYWx1ZTogc3RyaW5nLCBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGlucHV0OiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgbGFiZWxlZElucHV0Q2xhc3MgPSBcImxhYmVsZWQtaW5wdXRcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBpbnB1dElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZElucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGlucHV0ID0gcC5jcmVhdGVJbnB1dChpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGlucHV0LmlkKGlucHV0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgaW5wdXRJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogaW5wdXQsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGFiZWwocDogcDUsIGxhYmVsU3RyaW5nOiBzdHJpbmcsIGZvcklkPzogc3RyaW5nKTogcDUuRWxlbWVudCB7XHJcbiAgICBsZXQgbGFiZWwgPSBwLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBsYWJlbFN0cmluZyk7XHJcbiAgICBpZiAoZm9ySWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxhYmVsLmF0dHJpYnV0ZShcImZvclwiLCBmb3JJZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNoZWNrYm94KHA6IHA1LCBpbml0aWFsU3RhdGU6IGJvb2xlYW4pOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBjaGVja2JveCA9IHAuY3JlYXRlRWxlbWVudChcImNoZWNrYm94XCIpO1xyXG4gICAgY2hlY2tib3guZWx0LmNoZWNrZWQgPSBpbml0aWFsU3RhdGU7XHJcbiAgICByZXR1cm4gY2hlY2tib3g7XHJcbn1cclxuXHJcbi8vIFRPRE86IGNoZWNrIHRoYXQgb3B0aW9uc0VudW0gaXMgYWN0dWFsbHkgYW4gRW51bSwgYW5kIGluaXRpYWxFbnVtVmFsdWUgaXMgYSB2YWx1ZSBmb3IgdGhhdCBlbnVtXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkU2VsZWN0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIHNlbGVjdElkOiBzdHJpbmcsIG9wdGlvbnNFbnVtOiBhbnksIGluaXRpYWxFbnVtVmFsdWU6IGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBzZWxlY3Q6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgbGFiZWxlZFNlbGVjdENsYXNzID0gXCJsYWJlbGVkLXNlbGVjdFwiO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkU2VsZWN0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgc2VsZWN0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkU2VsZWN0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHNlbGVjdCA9IHAuY3JlYXRlU2VsZWN0KCk7XHJcbiAgICAgICAgc2VsZWN0LmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBzZWxlY3QuYWRkQ2xhc3MobGFiZWxlZFNlbGVjdENsYXNzKTtcclxuICAgICAgICBzZWxlY3QuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBzZWxlY3QucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgc2VsZWN0LmlkKHNlbGVjdElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIHNlbGVjdElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIGxldCBpbml0aWFsT3B0aW9ucyA9IGVudW1Ub1N0cmluZ0FycmF5KG9wdGlvbnNFbnVtKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRpYWxPcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgc2VsZWN0Lm9wdGlvbihpbml0aWFsT3B0aW9uc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBzZWxlY3Quc2VsZWN0ZWQob3B0aW9uc0VudW1baW5pdGlhbEVudW1WYWx1ZSBhcyBrZXlvZiB0eXBlb2Ygb3B0aW9uc0VudW1dLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSFRNTENvbGxlY3Rpb24gPSBzZWxlY3QuZWx0LmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBvcHRpb25zLml0ZW0oaSkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzICsgXCIgXCIgKyBsYWJlbGVkU2VsZWN0Q2xhc3MgKyBcIiBcIiArIGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogc2VsZWN0LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVLZXlCaW5kaW5nSW5wdXQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgc2V0QnV0dG9uSWQgPSBnZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICBsZXQga2V5YmluZGluZ0lucHV0Q2xhc3MgPSBcImtleWJpbmRpbmctaW5wdXRcIjtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBcIlwiKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGxldCBzZXRCdXR0b24gPSBwLmNyZWF0ZUJ1dHRvbihcIlNldFwiKTtcclxuICAgICAgICBzZXRCdXR0b24ucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgc2V0QnV0dG9uLmlkKHNldEJ1dHRvbklkKTtcclxuICAgICAgICBzZXRCdXR0b24ubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbigtMSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoaXMgY29kZSBiZWNhdXNlIGl0J3MgdXNlZCB0byBpbmRpY2F0ZSBpbnB1dCB0aGF0J3Mgbm90IHlldCBmaW5pc2hlZCBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICBpZiAocC5rZXlDb2RlICE9PSAyMjkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRDb25maWdLZXlCaW5kaW5nKHRyYWNrTnVtYmVyLCBudW1UcmFja3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFja051bWJlcjogdHJhY2tOdW1iZXIsIGtleUNvZGU6IHAua2V5Q29kZSwgc3RyaW5nOiBnZXRLZXlTdHJpbmcocCl9KTtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KC0xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0QnV0dG9uLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgZ2V0S2V5QmluZGluZ0NvbnRhaW5lcklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpKTtcclxuXHJcbiAgICBsZXQgdHJhY2tCaW5kaW5nSW5mbyA9IGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyLCBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpKTtcclxuICAgIGxldCBrZXlTdHJpbmcgPSB0cmFja0JpbmRpbmdJbmZvLnN0cmluZztcclxuICAgIGxldCBsYWJlbFN0cmluZyA9ICdUcmFjayAnICsgKHRyYWNrTnVtYmVyICsgMSkgKyAnOiA8c3BhbiBjbGFzcz1cIicgK1xyXG4gICAgICAgIGtleWJpbmRpbmdJbnB1dENsYXNzICsgXCIgXCIgKyBjdXN0b21DbGFzcyArIFwiIFwiICsgZ2xvYmFsLmdsb2JhbENsYXNzICtcclxuICAgICAgICAnXCI+JyArIGtleVN0cmluZyArICc8L3NwYW4+JztcclxuICAgIGxldCBsYWJlbEVsZW1lbnQgPSBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoY29udGFpbmVyLmVsZW1lbnQsIFwiTEFCRUxcIik7XHJcbiAgICBsYWJlbEVsZW1lbnQuaHRtbChsYWJlbFN0cmluZyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRUZXh0QXJlYShsYWJlbFN0cmluZzogc3RyaW5nLCBpbnB1dElkOiBzdHJpbmcsIGlucHV0SW5pdGlhbFZhbHVlOiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyID0gNCwgY29sczogbnVtYmVyID0gNDApOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgdGV4dEFyZWE6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkVGV4dGFyZWFDbGFzcyA9IFwibGFiZWxlZC10ZXh0YXJlYVwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGlucHV0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkVGV4dGFyZWFDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgdGV4dEFyZWEgPSBwLmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCBpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIHRleHRBcmVhLmlkKGlucHV0SWQpO1xyXG4gICAgICAgIHRleHRBcmVhLmF0dHJpYnV0ZShcInJvd3NcIiwgcm93cy50b1N0cmluZygpKTtcclxuICAgICAgICB0ZXh0QXJlYS5hdHRyaWJ1dGUoXCJjb2xzXCIsIGNvbHMudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBpbnB1dElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiB0ZXh0QXJlYSwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsZUlucHV0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIGJ1dHRvblRleHQ6IHN0cmluZywgdW5pcXVlSWQ6IHN0cmluZywgb25GaWxlTG9hZDogKGZpbGU6IHA1LkZpbGUpID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBidXR0b25JZCA9IHVuaXF1ZUlkICsgXCJCdXR0b25cIjtcclxuICAgIGxldCBjb250YWluZXJJZCA9IHVuaXF1ZUlkICsgXCJDb250YWluZXJcIjtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGZpbGVJbnB1dENsYXNzID0gXCJmaWxlLWlucHV0XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgZmlsZUlucHV0ID0gcC5jcmVhdGVGaWxlSW5wdXQob25GaWxlTG9hZCwgXCJmYWxzZVwiKTtcclxuICAgICAgICBmaWxlSW5wdXQucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgZmlsZUlucHV0LmhpZGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHAuY3JlYXRlQnV0dG9uKGJ1dHRvblRleHQpO1xyXG4gICAgICAgIGJ1dHRvbi5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBidXR0b24uaWQoYnV0dG9uSWQpO1xyXG4gICAgICAgIGJ1dHRvbi5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmaWxlSW5wdXQuZWx0LmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgYnV0dG9uSWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKVxyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGZpbGVJbnB1dENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgY29udGFpbmVySWQpO1xyXG5cclxuICAgIGxldCBsYWJlbDogcDUuRWxlbWVudCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJMQUJFTFwiKTtcclxuICAgIGxhYmVsLmh0bWwobGFiZWxTdHJpbmcpO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkQ2hlY2tib3gobGFiZWxTdHJpbmc6IHN0cmluZywgY2hlY2tib3hJZDogc3RyaW5nLCBpc0NoZWNrZWQ6IGJvb2xlYW4sIGN1c3RvbUNsYXNzOiBzdHJpbmcpOlxyXG4gICAgeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGNoZWNrYm94OiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgbGFiZWxlZENoZWNrYm94Q2xhc3MgPSBcImxhYmVsZWQtY2hlY2tib3hcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkQ2hlY2tib3hDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBjaGVja2JveElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZENoZWNrYm94Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGNoZWNrYm94ID0gY3JlYXRlQ2hlY2tib3gocCwgaXNDaGVja2VkKTtcclxuICAgICAgICBjaGVja2JveC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3guYWRkQ2xhc3MobGFiZWxlZENoZWNrYm94Q2xhc3MpO1xyXG4gICAgICAgIGNoZWNrYm94LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgY2hlY2tib3gucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgY2hlY2tib3guaWQoY2hlY2tib3hJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBjaGVja2JveElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiBjaGVja2JveCwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBZZXNObyB7XHJcbiAgICBZZXMsXHJcbiAgICBOb1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhblRvWWVzTm8oYm9vbGVhbjogYm9vbGVhbik6IFllc05vIHtcclxuICAgIGlmIChib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIFllc05vLlllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFllc05vLk5vO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtNb2RlLCBOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdElmVW5kZWZpbmVkKHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnN0YXRlID0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0cmFja3NbaV1bal0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5NSU5FOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrc1tpXVtqXS50eXBlID0gTm90ZVR5cGUuTk9ORTsgLy9UT0RPOiBpbXBsZW1lbnQgbWluZXNcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT05FOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5ST0xMX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnR5cGUgPSBOb3RlVHlwZS5IT0xEX0hFQUQ7IC8vVE9ETzogaW1wbGVtZW50IHJvbGxzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pc3NCb3VuZGFyeShjdXJyZW50VGltZTogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgbGV0IG1pc3NCb3VuZGFyeSA9IGN1cnJlbnRUaW1lICsgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLnVwcGVyQm91bmQgLyAxMDAwKTsgLy9yZXN1bHQgaXMgaW4gc2Vjb25kc1xyXG4gICAgcmV0dXJuIG1pc3NCb3VuZGFyeTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5QmluZGluZ3NEZWZpbmVkKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUtleUJpbmRpbmdzKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICBsZXQgbWFwcGluZzogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgIGlmIChudW1UcmFja3MgPD0gOSkge1xyXG4gICAgICAgIGxldCBrZXlTZXF1ZW5jZSA9IFtcIkFcIiwgXCJTXCIsIFwiRFwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiLCBcIkpcIiwgXCJLXCIsIFwiTFwiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlTdHJpbmcgPSBrZXlTZXF1ZW5jZVtpXTtcclxuICAgICAgICAgICAgbWFwcGluZy5wdXNoKHt0cmFja051bWJlcjogaSwga2V5Q29kZToga2V5U3RyaW5nLmNoYXJDb2RlQXQoMCksIHN0cmluZzoga2V5U3RyaW5nfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobnVtVHJhY2tzID4gMjYpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkbid0IGdlbmVyYXRlIGRlZmF1bHQga2V5IGJpbmRpbmdzIGZvciBtb3JlIHRoYW4gMjYgdHJhY2tzLiBSYW4gb3V0IG9mIGxldHRlcnMhXCIpO1xyXG4gICAgICAgICAgICBudW1UcmFja3MgPSAyNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hhcmFjdGVyQ29kZSA9IFwiQVwiLmNoYXJDb2RlQXQoMCkgKyBpOyAvLyBUaGlzIGlzIGFuIEFTQ0lJIGNoYXJhY3RlciBjb2RlXHJcbiAgICAgICAgICAgIG1hcHBpbmcucHVzaCh7dHJhY2tOdW1iZXI6IGksIGtleUNvZGU6IGNoYXJhY3RlckNvZGUsIHN0cmluZzogU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyYWN0ZXJDb2RlKX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLnNldChudW1UcmFja3MsIG1hcHBpbmcpO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRDb25maWdLZXlCaW5kaW5nKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nKSB7XHJcbiAgICBsZXQgYmluZGluZ0luZGV4ID0gZ2V0SW5kZXhPZlRyYWNrTnVtYmVyQmluZGluZyh0cmFja051bWJlciwgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSk7XHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpW2JpbmRpbmdJbmRleF0gPSBrZXlCaW5kaW5nO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5zYXZlKCk7XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgZSB0byBiZSBhbiBlbnVtXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnVtVG9TdHJpbmdBcnJheShlOiBhbnkpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhlKS5maWx0ZXIoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEluZGV4T2ZUcmFja051bWJlckJpbmRpbmcodHJhY2tOdW1iZXI6IG51bWJlciwgYmluZGluZ3M6IHsgdHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZyB9W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmluZGluZ3NbaV0udHJhY2tOdW1iZXIgPT09IHRyYWNrTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGdldEtleUJpbmRpbmdVbmlxdWVJZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSArIFwiQnV0dG9uXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBnZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykgKyBcIkJ1dHRvblwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBcInRyYWNrXCIgKyB0cmFja051bWJlciArIFwiT2ZcIiArIG51bVRyYWNrcyArIFwiQmluZGluZ1wiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5U3RyaW5nKHA6IHA1KSB7XHJcbiAgICByZXR1cm4gcC5rZXkubGVuZ3RoID09IDEgPyBwLmtleS50b1VwcGVyQ2FzZSgpIDogcC5rZXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkobW9kZXNBc1N0cmluZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz5bXSk6IE1vZGVbXSB7XHJcbiAgICBsZXQgbW9kZU9wdGlvbnM6IE1vZGVbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2Rlc0FzU3RyaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbW9kZXNBc1N0cmluZ3NbaV07XHJcbiAgICAgICAgbW9kZU9wdGlvbnMucHVzaCh7dHlwZTogbW9kZS5nZXQoXCJ0eXBlXCIpLCBkaWZmaWN1bHR5OiBtb2RlLmdldChcImRpZmZpY3VsdHlcIiksIG1ldGVyOiBtb2RlLmdldChcIm1ldGVyXCIpLCBpZDogaX0pO1xyXG4gICAgfVxyXG4gICAgbW9kZU9wdGlvbnMuc29ydChjb21wYXJlTW9kZU9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIG1vZGVPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZU1vZGVPcHRpb25zKGE6IE1vZGUsIGI6IE1vZGUpIHtcclxuICAgIGxldCB0eXBlQSA9IGEudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgbGV0IHR5cGVCID0gYi50eXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAodHlwZUEgIT0gdHlwZUIpIHtcclxuICAgICAgICBpZiAodHlwZUEgPCB0eXBlQikge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUEgPSBhLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUIgPSBiLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAoZGlmZmljdWx0eUEgIT0gZGlmZmljdWx0eUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlBKSAtIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlCKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbWV0ZXJBID0gcGFyc2VGbG9hdChhLm1ldGVyKTtcclxuICAgICAgICAgICAgbGV0IG1ldGVyQiA9IHBhcnNlRmxvYXQoYi5tZXRlcik7XHJcbiAgICAgICAgICAgIGlmIChtZXRlckEgIT0gbWV0ZXJCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0ZXJBIC0gbWV0ZXJCO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGEuaWQgPSBiLmlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5OiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAoZGlmZmljdWx0eSkge1xyXG4gICAgICAgIGNhc2UgXCJCRUdJTk5FUlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBjYXNlIFwiRUFTWVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICBjYXNlIFwiTUVESVVNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIGNhc2UgXCJIQVJEXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIGNhc2UgXCJDSEFMTEVOR0VcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgY2FzZSBcIkVESVRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoZGl2OiBwNS5FbGVtZW50LCB0YWdOYW1lOiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBjaGlsZHJlbk5vZGVzID0gZGl2LmNoaWxkKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbm9kZTogTm9kZSA9IGNoaWxkcmVuTm9kZXNbaV07XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHA1LkVsZW1lbnQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGJpbmRpbmdzOiB7IHRyYWNrTnVtYmVyOiBudW1iZXIsIGtleUNvZGU6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcgfVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJpbmRpbmdzW2ldLnRyYWNrTnVtYmVyID09PSB0cmFja051bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZGluZ3NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUHJldmlld05vdGVzKG51bVRyYWNrczogbnVtYmVyKTogTm90ZVtdW10ge1xyXG4gICAgbGV0IG5vdGVzOiBOb3RlW11bXSA9IFtdO1xyXG4gICAgbGV0IGlzSG9sZCA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMC4xO1xyXG4gICAgbGV0IHRpbWVJbmNyZW1lbnQgPSAwLjMgLyBudW1UcmFja3M7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSBbXTtcclxuICAgICAgICBpZiAoaXNIb2xkKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuSE9MRF9IRUFELCB0eXBlU3RyaW5nOiBcIkRvbid0IENhcmVcIiwgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTm90ZVR5cGUuVEFJTCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lICsgMC4yNSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vdGVUeXBlLk5PUk1BTCxcclxuICAgICAgICAgICAgICAgIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLFxyXG4gICAgICAgICAgICAgICAgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdGVzLnB1c2godHJhY2spO1xyXG4gICAgICAgIGlzSG9sZCA9ICFpc0hvbGQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gdGltZUluY3JlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBub3RlcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjY3VyYWN5RXZlbnROYW1lKHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHM6IG51bWJlciwgY29uZmlnOiBDb25maWcpOiBzdHJpbmcge1xyXG4gICAgaWYgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPCBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLm5hbWU7IC8vIEhhbmRsZSBtaXNzIGlmIGl0IGV4aXN0c1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCAmJlxyXG4gICAgICAgIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPj0gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0ubG93ZXJCb3VuZCkge1xyXG4gICAgICAgIHJldHVybiBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS5uYW1lOyAvLyBIYW5kbGUgYm9vIGlmIGl0IGV4aXN0c1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeTogQWNjdXJhY3kgPSBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tpXTtcclxuICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCAhPSBudWxsICYmIGFjY3VyYWN5LnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoYWNjdXJhY3kubG93ZXJCb3VuZCA8IHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgJiYgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA8PSBhY2N1cmFjeS51cHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdXJhY3kubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBcIkVSUk9SOiBVbmtub3duIGFjY3VyYWN5XCI7XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBwNTsiXSwic291cmNlUm9vdCI6IiJ9