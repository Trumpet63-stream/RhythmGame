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

/***/ "./src/scripts/accuracy_feedback_display.ts":
/*!**************************************************!*\
  !*** ./src/scripts/accuracy_feedback_display.ts ***!
  \**************************************************/
/*! exports provided: AccuracyFeedbackDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccuracyFeedbackDisplay", function() { return AccuracyFeedbackDisplay; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");


class AccuracyFeedbackDisplay {
    constructor(accuracyRecording, centerX, centerY, config) {
        this.accuracyRecording = accuracyRecording;
        this.centerX = centerX;
        this.centerY = centerY;
        this.config = config;
    }
    draw(currentTimeInSeconds) {
        let lastEvent = this.getMostRecentAccuracyEvent();
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
    getMostRecentAccuracyEvent() {
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
/* harmony import */ var _handle_accuracy_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handle_accuracy_event */ "./src/scripts/handle_accuracy_event.ts");
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");




class Accuracy {
    constructor(name, lowerBound, upperBound) {
        this.name = name;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }
}
class AccuracyManager {
    constructor(noteManager, config, accuracyRecording, holdManager) {
        this.noteManager = noteManager;
        this.config = config;
        this.accuracyRecording = accuracyRecording;
        this.holdManager = holdManager;
    }
    handlePlayerAction(action) {
        if (action.keyState == _player_key_action__WEBPACK_IMPORTED_MODULE_0__["KeyState"].DOWN) {
            this.tryToHitNote(action.gameTime, action.track);
        }
        else if (action.keyState == _player_key_action__WEBPACK_IMPORTED_MODULE_0__["KeyState"].UP) {
            if (this.holdManager.isTrackHeld(action.track)) {
                this.holdManager.unholdTrack(action.track);
                this.tryToReleaseNote(action.gameTime, action.track);
            }
        }
    }
    tryToHitNote(currentTimeInSeconds, trackNumber) {
        let noteIndex = this.getEarliestHittableUnhitNoteIndex(currentTimeInSeconds, trackNumber);
        if (noteIndex != null) {
            let note = this.noteManager.tracks[trackNumber][noteIndex];
            if (note.type === _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].NORMAL) {
                note.state = _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].HIT;
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                Object(_handle_accuracy_event__WEBPACK_IMPORTED_MODULE_1__["handleAccuracyEvent"])(Object(_util__WEBPACK_IMPORTED_MODULE_3__["getAccuracyEventName"])(accuracy, this.config), trackNumber, accuracy, currentTimeInSeconds, note.type, this.accuracyRecording);
            }
            else if (note.type == _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].HOLD_HEAD) {
                note.state = _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].HELD; // set the note to held so it won't count as a miss
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                Object(_handle_accuracy_event__WEBPACK_IMPORTED_MODULE_1__["handleAccuracyEvent"])(Object(_util__WEBPACK_IMPORTED_MODULE_3__["getAccuracyEventName"])(accuracy, this.config), trackNumber, accuracy, currentTimeInSeconds, note.type, this.accuracyRecording);
                this.holdManager.holdTrack(trackNumber);
            }
        }
        else if (this.isConfiguredForBoos()) {
            Object(_handle_accuracy_event__WEBPACK_IMPORTED_MODULE_1__["handleAccuracyEvent"])(Object(_util__WEBPACK_IMPORTED_MODULE_3__["getAccuracyEventName"])(Infinity, this.config), trackNumber, Infinity, currentTimeInSeconds, _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].NONE, this.accuracyRecording);
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
            if (this.noteManager.tracks[trackNumber][i].state == _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].DEFAULT) {
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
            if (note.type == _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].TAIL) {
                let hold = this.noteManager.tracks[trackNumber][noteIndex - 1]; // get the hold belonging to this tail
                hold.state = _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].HIT; // change the hold state from HELD to HIT
                note.state = _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].HIT; // hit the tail of the hold
                let accuracy = (note.timeInSeconds - currentTimeInSeconds) * 1000;
                Object(_handle_accuracy_event__WEBPACK_IMPORTED_MODULE_1__["handleAccuracyEvent"])("Release " + Object(_util__WEBPACK_IMPORTED_MODULE_3__["getAccuracyEventName"])(accuracy, this.config), trackNumber, accuracy, currentTimeInSeconds, note.type, this.accuracyRecording);
            }
        }
        else { // let go too early
            // Could this return -1?
            let holdStartIndex = this.noteManager.findIndexOfFirstNoteAfterTime(currentTimeInSeconds, this.noteManager.tracks[trackNumber]);
            let hold = this.noteManager.tracks[trackNumber][holdStartIndex - 1];
            let tail = this.noteManager.tracks[trackNumber][holdStartIndex];
            if (hold.type == _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].HOLD_HEAD && tail.type == _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].TAIL) {
                this.noteManager.tracks[trackNumber][holdStartIndex - 1].state = _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].HIT; // hit the start of the hold
                this.noteManager.tracks[trackNumber][holdStartIndex].state = _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].HIT; // hit the tail of the hold
                Object(_handle_accuracy_event__WEBPACK_IMPORTED_MODULE_1__["handleAccuracyEvent"])("Release " + Object(_util__WEBPACK_IMPORTED_MODULE_3__["getAccuracyEventName"])(Infinity, this.config), trackNumber, Infinity, currentTimeInSeconds, _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].NONE, this.accuracyRecording);
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
    recordAccuracyEvent(trackNumber, accuracyMillis, currentTime, noteType) {
        this.recording[trackNumber].push({ timeInSeconds: currentTime, accuracyMillis: accuracyMillis, noteType: noteType });
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


// Essential config: scroll speed, scroll direction, game width/height, additional offset, pause at start
class Config {
    constructor(args) {
        this.gameAreaHeight = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.gameAreaHeight, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].gameAreaHeight);
        this.gameAreaWidth = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.gameAreaWidth, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].gameAreaWidth);
        this.pixelsPerSecond = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.pixelsPerSecond, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].pixelsPerSecond);
        // this.setSecondsPerPixel();
        this.scrollDirection = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.scrollDirection, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].scrollDirection);
        // this.setScrollDirection();
        // NOTE: Scroll direction and gameAreaHeight must be set BEFORE setting receptorYPosition
        this.receptorYPercent = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.receptorYPercent, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].receptorYPercent);
        // this.setReceptorYPosition();
        this.additionalOffsetInSeconds = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.additionalOffsetInSeconds, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].additionalOffsetInSeconds);
        // this.setAdditionalOffsetInSeconds();
        this.accuracySettings = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.accuracySettings, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].accuracySettings);
        // this.setAccuracySettings();
        this.pauseAtStartInSeconds = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.pauseAtStartInSeconds, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].pauseAtStartInSeconds);
        // this.setPauseAtStartInSeconds();
        this.noteSize = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.noteSize, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].noteSize);
        this.keyBindings = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.keyBindings, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].keyBindings);
        this.quitKey = Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaultIfUndefined"])(args.quitKey, _default_config__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CONFIG"].quitKey);
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
    static drawNote(trackNumber, numTracks, centerX, centerY, noteType) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let noteSize = _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.noteSize;
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
                p.fill("black");
                p.circle(centerX, centerY, 24);
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.fill("white");
                p.text("X", centerX, centerY + 8);
                break;
            default:
                p.noFill();
                p.rect(centerX - width / 2, centerY - height / 2, width, height);
                p.fill("black");
                p.textSize(20);
                p.textFont("Arial");
                p.textAlign(p.CENTER);
                p.text("?", centerX, centerY + 7);
                break;
        }
        p.pop();
    }
    static drawReceptor(trackNumber, numTracks, centerX, centerY) {
        let p = _index__WEBPACK_IMPORTED_MODULE_1__["global"].p5Scene.sketchInstance;
        let noteSize = _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.noteSize;
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
        let isNoteDrawSuccessful = _index__WEBPACK_IMPORTED_MODULE_2__["global"].noteSkin.drawNote(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteType);
        if (!isNoteDrawSuccessful) {
            _default_note_skin__WEBPACK_IMPORTED_MODULE_3__["DefaultNoteSkin"].drawNote(this.trackNumber, this.numTracks, this.centerX, this.centerY, this.noteType);
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
        let isReceptorDrawSuccessful = _index__WEBPACK_IMPORTED_MODULE_2__["global"].noteSkin.drawReceptor(this.trackNumber, this.numTracks, this.centerX, this.centerY);
        if (!isReceptorDrawSuccessful) {
            _default_note_skin__WEBPACK_IMPORTED_MODULE_3__["DefaultNoteSkin"].drawReceptor(this.trackNumber, this.numTracks, this.centerX, this.centerY);
        }
    }
}
//TODO: Display missed notes differently than hit notes
class DisplayManager {
    constructor(noteManager, config, sketchInstance, topLeftX = 0, topLeftY = 0, width = 180, height = 400) {
        this.config = config;
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
            new NoteDisplay(x, y, note.type, this.sketchInstance, this.config.noteSize, trackNumber, numTracks).draw();
        }
    }
    getLeastTime(currentTime) {
        let totalDisplaySeconds = this.getDisplayHeight() / this.config.pixelsPerSecond;
        return currentTime - this.config.receptorYPercent / 100 * totalDisplaySeconds;
    }
    getGreatestTime(currentTime) {
        let totalDisplaySeconds = this.getDisplayHeight() / this.config.pixelsPerSecond;
        return currentTime + (1 - this.config.receptorYPercent / 100) * totalDisplaySeconds;
    }
    getNoteCenterX(trackNumber, numTracks) {
        let receptorSpacing = this.getDisplayWidth() / numTracks - this.config.noteSize;
        return (2 * trackNumber + 1) / 2 * (this.config.noteSize + receptorSpacing) + this.topLeftX;
    }
    // This essentially defines a conversion from seconds to pixels
    getNoteCenterY(noteTime, currentTime) {
        let noteYOffset = this.config.pixelsPerSecond * (noteTime - currentTime);
        let receptorYOffset = this.config.receptorYPercent / 100 * this.getDisplayHeight();
        if (this.config.scrollDirection == _scroll_direction__WEBPACK_IMPORTED_MODULE_0__["ScrollDirection"].Up) {
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
            new Receptor(this.getNoteCenterX(i, numTracks), this.getNoteCenterY(this.currentTimeInSeconds, this.currentTimeInSeconds), this.sketchInstance, this.config.noteSize, i, numTracks).draw();
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

/***/ "./src/scripts/handle_accuracy_event.ts":
/*!**********************************************!*\
  !*** ./src/scripts/handle_accuracy_event.ts ***!
  \**********************************************/
/*! exports provided: handleAccuracyEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleAccuracyEvent", function() { return handleAccuracyEvent; });
//TODO: animations for accuracy events
function handleAccuracyEvent(accuracyName, trackNumber, accuracy, currentTime, noteType, accuracyRecording) {
    accuracyRecording.recordAccuracyEvent(trackNumber, accuracy, currentTime, noteType);
    console.log("Track #" + (trackNumber + 1) + " " + accuracyName +
        (Math.abs(accuracy) == Infinity ? "" : " (" + Math.round(accuracy) + " ms)"));
}


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
/* This class is intended only to be used to store the hold state of key events for notes that can be held. This
    shouldn't be used for normal notes */
class HoldManager {
    constructor(numTracks) {
        this.heldTracks = [];
        for (let i = 0; i < numTracks; i++) {
            this.heldTracks.push(false);
        }
    }
    isTrackHeld(trackNumber) {
        return this.heldTracks[trackNumber];
    }
    holdTrack(trackNumber) {
        this.heldTracks[trackNumber] = true;
    }
    unholdTrack(trackNumber) {
        console.log("unhold track " + (trackNumber + 1));
        this.heldTracks[trackNumber] = false;
    }
}


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
global.config = new _config__WEBPACK_IMPORTED_MODULE_0__["Config"]({});
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
/* harmony import */ var _handle_accuracy_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handle_accuracy_event */ "./src/scripts/handle_accuracy_event.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/scripts/util.ts");
/* harmony import */ var _parsing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parsing */ "./src/scripts/parsing.ts");



class MissManager {
    constructor(config, noteManager, accuracyRecording, holdManager) {
        this.config = config;
        this.noteManager = noteManager;
        this.lastCheckedNoteIndices = [];
        for (let i = 0; i < this.noteManager.tracks.length; i++) {
            this.lastCheckedNoteIndices.push(0);
        }
        this.accuracyRecording = accuracyRecording;
        this.holdManager = holdManager;
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
        return note.state !== _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].DEFAULT;
    }
    isNoteMissedAndNotHandled(note, currentTime) {
        let missBoundary = Object(_util__WEBPACK_IMPORTED_MODULE_1__["getMissBoundary"])(currentTime, this.config);
        return note.timeInSeconds < missBoundary && note.state === _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].DEFAULT;
    }
    handleMissedNote(trackNumber, indexOfMissedNote, currentTime) {
        let track = this.noteManager.tracks[trackNumber];
        let missedNote = track[indexOfMissedNote];
        Object(_handle_accuracy_event__WEBPACK_IMPORTED_MODULE_0__["handleAccuracyEvent"])(this.config.accuracySettings[0].name, trackNumber, -Infinity, currentTime, missedNote.type, this.accuracyRecording);
        missedNote.state = _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].MISSED;
        if (missedNote.type === _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].TAIL) {
            if (this.holdManager.isTrackHeld(trackNumber)) {
                this.holdManager.unholdTrack(trackNumber); // Force a hold release upon missing the tail
            }
        }
        else if (missedNote.type === _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].HOLD_HEAD) {
            let nextNote = track[indexOfMissedNote + 1];
            if (nextNote !== undefined) {
                if (nextNote.type === _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteType"].TAIL) {
                    nextNote.state = _parsing__WEBPACK_IMPORTED_MODULE_2__["NoteState"].MISSED; // Miss the tail when you miss the head
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
class NoteManager {
    constructor(tracks) {
        this.tracks = tracks;
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
    drawNote(trackNumber, numTracks, centerX, centerY, noteType) {
        switch (noteType) {
            case _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].NORMAL:
            case _parsing__WEBPACK_IMPORTED_MODULE_1__["NoteType"].HOLD_HEAD:
                this.drawImageRotated(this.note, trackNumber, numTracks, centerX, centerY);
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
    drawReceptor(trackNumber, numTracks, centerX, centerY) {
        this.drawImageRotated(this.receptor, trackNumber, numTracks, centerX, centerY);
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
    drawImageRotated(image, trackNumber, numTracks, centerX, centerY) {
        let p = _index__WEBPACK_IMPORTED_MODULE_0__["global"].p5Scene.sketchInstance;
        let noteSize = _index__WEBPACK_IMPORTED_MODULE_0__["global"].config.noteSize;
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
                _index__WEBPACK_IMPORTED_MODULE_4__["global"].noteSkin = new _note_skin__WEBPACK_IMPORTED_MODULE_6__["NoteSkin"](p.loadImage("../assets/arrow_blue_resize.png"), p.loadImage("../assets/connector_tile_resize.png"), p.loadImage("../assets/tail_resize.png"), p.loadImage("../assets/arrow_receptor.png"));
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
            }
        });
        if (!receptorPositionInput.alreadyExists) {
            scrollDiv.element.child(receptorPositionInput.element.parent());
        }
        let additionalOffsetInSecondsInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_2__["createLabeledInput"])("Accuracy Offset (ms)", "additionalOffsetInSecondsInput", _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.additionalOffsetInSeconds.toString(), Options.OPTIONS_CLASS);
        setOnInputUnlessItAlreadyExists(additionalOffsetInSecondsInput, () => {
            let value = additionalOffsetInSecondsInput.element.value();
            if (typeof value === "string") {
                value = parseFloat(value);
            }
            if (!isNaN(value)) {
                _index__WEBPACK_IMPORTED_MODULE_3__["global"].config.additionalOffsetInSeconds = value / 1000;
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
                }
            }
        });
        if (!accuracySettingsInput.alreadyExists) {
            scrollDiv.element.child(accuracySettingsInput.element.parent());
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
                    keybindingHelper.bindNext(p);
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
        let stepfileInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["createFileInput"])(getStepfileInputLabel(), "Choose Stepfile (.sm)", "stepfileInput", _index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.load.bind(_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile), PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(stepfileInput, 0.43, 0.3, 344, 34);
        let audioFileInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["createFileInput"])(getAudioFileInputLabel(), "Choose Audio File (.mp3)", "audioFileInput", _index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile.load.bind(_index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile), PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(audioFileInput, 0.43, 0.45, 368, 34);
        let playButtonId = "playButton";
        let modeRadioId = "modeRadio";
        if (isFilesReady()) {
            let modeRadio = drawModeSelect(p, modeRadioId);
            if (modeRadio.value() !== "") { // user has selected a mode
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
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].removeElementById(modeRadioId);
            _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].removeElementById(playButtonId);
        }
    }
}
PlayFromFile.PLAY_FROM_FILE_CLASS = "play-from-file";
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
    if (_index__WEBPACK_IMPORTED_MODULE_1__["global"].page1ModeOptions === undefined) {
        _index__WEBPACK_IMPORTED_MODULE_1__["global"].page1ModeOptions = Object(_util__WEBPACK_IMPORTED_MODULE_4__["getModeOptionsForDisplay"])(_index__WEBPACK_IMPORTED_MODULE_1__["global"].stepfile.partialParse.modes);
    }
    let modeRadioClass = "mode-radio";
    let modeRadioOptionClass = "mode-radio-option";
    let modeRadioCreateResult = _dom_wrapper__WEBPACK_IMPORTED_MODULE_7__["DOMWrapper"].create(() => {
        return p.createRadio();
    }, uniqueId);
    let modeRadio = modeRadioCreateResult.element;
    if (!modeRadioCreateResult.alreadyExists) {
        for (let i = 0; i < _index__WEBPACK_IMPORTED_MODULE_1__["global"].page1ModeOptions.length; i++) {
            let mode = _index__WEBPACK_IMPORTED_MODULE_1__["global"].page1ModeOptions[i];
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
    return _index__WEBPACK_IMPORTED_MODULE_1__["global"].page1ModeOptions[modeRadio.value()];
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
/* harmony import */ var _accuracy_feedback_display__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./accuracy_feedback_display */ "./src/scripts/accuracy_feedback_display.ts");














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
        this.accuracyRecording = new _accuracy_recording__WEBPACK_IMPORTED_MODULE_12__["AccuracyRecording"](this.noteManager.tracks.length);
        let holdManager = new _hold_manager__WEBPACK_IMPORTED_MODULE_7__["HoldManager"](this.noteManager.tracks.length);
        if (this.isDebugMode) {
            this.timeManager = new _scroll_manager__WEBPACK_IMPORTED_MODULE_5__["ScrollManager"](this.config, this.scene.sketchInstance);
        }
        this.gameEndTime = this.calculateGameEnd(_index__WEBPACK_IMPORTED_MODULE_9__["global"].audioFile.getDuration(), this.getNotesEndTime());
        this.accuracyManager = new _accuracy_manager__WEBPACK_IMPORTED_MODULE_4__["AccuracyManager"](this.noteManager, this.config, this.accuracyRecording, holdManager);
        this.missManager = new _miss_manager__WEBPACK_IMPORTED_MODULE_3__["MissManager"](this.config, this.noteManager, this.accuracyRecording, holdManager);
        let width = 240;
        let height = 480;
        let topLeftX = (this.scene.sketchInstance.width - width) / 2;
        let topLeftY = (this.scene.sketchInstance.height - height) / 2;
        this.displayManager = new _display_manager__WEBPACK_IMPORTED_MODULE_0__["DisplayManager"](this.noteManager, this.config, this.scene.sketchInstance, topLeftX, topLeftY, width, height);
        this.accuracyFeedbackDisplay = new _accuracy_feedback_display__WEBPACK_IMPORTED_MODULE_13__["AccuracyFeedbackDisplay"](this.accuracyRecording, topLeftX + width / 2, topLeftY + height / 2, this.config);
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_8__["isKeyBindingsDefined"])(this.noteManager.tracks.length)) {
            Object(_util__WEBPACK_IMPORTED_MODULE_8__["initializeKeyBindings"])(this.noteManager.tracks.length);
        }
        this.bindKeyBindingsToActions();
        Object(_util__WEBPACK_IMPORTED_MODULE_8__["setAllNotesToDefaultState"])(this.noteManager.tracks);
        Object(_util__WEBPACK_IMPORTED_MODULE_8__["replaceNotYetImplementedNoteTypes"])(this.noteManager.tracks);
    }
    draw() {
        let currentTimeInSeconds = this.timeManager.getGameTime(performance.now());
        if (currentTimeInSeconds >= this.gameEndTime && !this.showResultsScreen) {
            this.accuracyRecording.state = _accuracy_recording__WEBPACK_IMPORTED_MODULE_12__["AccuracyRecordingState"].READY;
            this.endSong();
        }
        this.missManager.update(currentTimeInSeconds);
        this.displayManager.draw(currentTimeInSeconds);
        this.accuracyFeedbackDisplay.draw(currentTimeInSeconds);
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
        let playerKeyAction = new _player_key_action__WEBPACK_IMPORTED_MODULE_10__["PlayerKeyAction"](this.timeManager.getGameTime(performance.now()), trackNumber, _player_key_action__WEBPACK_IMPORTED_MODULE_10__["KeyState"].DOWN);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
    }
    keyUpActionForTrack(trackNumber) {
        let playerKeyAction = new _player_key_action__WEBPACK_IMPORTED_MODULE_10__["PlayerKeyAction"](this.timeManager.getGameTime(performance.now()), trackNumber, _player_key_action__WEBPACK_IMPORTED_MODULE_10__["KeyState"].UP);
        this.accuracyManager.handlePlayerAction(playerKeyAction);
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
        this.displayManager = new _display_manager__WEBPACK_IMPORTED_MODULE_0__["DisplayManager"](this.noteManager, this.config, this.scene.sketchInstance, this.topLeftX, this.topLeftY, this.width, this.height);
    }
    draw() {
        this.displayManager.draw(this.scrollManager.getGameTime());
    }
    getBounds() {
        return { topLeftX: this.topLeftX, topLeftY: this.topLeftY, width: this.width, height: this.height };
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
        if (this.state === StepfileState.PARTIALLY_PARSED) {
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
/*! exports provided: drawHeading, setElementCenterPositionRelative, createLabeledInput, createLabeledSelect, createKeyBindingInput, createLabeledTextArea, createFileInput */
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
                Object(_util__WEBPACK_IMPORTED_MODULE_2__["setConfigKeyBinding"])(trackNumber, numTracks, { trackNumber: trackNumber, keyCode: p.keyCode, string: Object(_util__WEBPACK_IMPORTED_MODULE_2__["getKeyString"])(p) });
                _index__WEBPACK_IMPORTED_MODULE_0__["global"].keyboardEventManager.unbindKey(-1);
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
}
function setConfigKeyBinding(trackNumber, numTracks, keyBinding) {
    let bindingIndex = getIndexOfTrackNumberBinding(trackNumber, _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.keyBindings.get(numTracks));
    _index__WEBPACK_IMPORTED_MODULE_1__["global"].config.keyBindings.get(numTracks)[bindingIndex] = keyBinding;
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
            track.push({ type: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].HOLD_HEAD, typeString: "Don't Care", timeInSeconds: currentTime,
                state: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT });
            track.push({ type: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].TAIL, typeString: "Don't Care", timeInSeconds: currentTime + 0.25,
                state: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT });
        }
        else {
            track.push({ type: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteType"].NORMAL, typeString: "Don't Care", timeInSeconds: currentTime, state: _parsing__WEBPACK_IMPORTED_MODULE_0__["NoteState"].DEFAULT });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wYXJzZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2FjY3VyYWN5X3JlY29yZGluZy50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9hdWRpb19maWxlLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9kZWZhdWx0X2NvbmZpZy50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9kZWZhdWx0X25vdGVfc2tpbi50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9kaXNwbGF5X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvZG9tX3dyYXBwZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvZHJhd2luZ191dGlsLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2hhbmRsZV9hY2N1cmFjeV9ldmVudC50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9ob2xkX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMva2V5X2JpbmRpbmdfaGVscGVyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2tleWJvYXJkX2V2ZW50X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvbWlzc19tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL25vdGVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9ub3RlX3NraW4udHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcDVfc2NlbmUudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGFnZV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3BhZ2VzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGFnZXMvcGxheS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5X2Zyb21fZmlsZS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9wYWdlcy9yZXN1bHRzLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3BhcnNpbmcudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGxheWVyX2tleV9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGxheWluZ19kaXNwbGF5LnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3ByZXZpZXdfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9yZXN1bHRzX2Rpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX2RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9zY3JvbGxfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9zdGVwZmlsZS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy90aW1lX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvdWlfdXRpbC50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy91dGlsLnRzIiwid2VicGFjazovL3NpbXBhcnNlci9leHRlcm5hbCBcInA1XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqRkE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFHYTtBQUVyQyxNQUFNLHVCQUF1QjtJQU1oQyxZQUFZLGlCQUFvQyxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsTUFBYztRQUM5RixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxD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QUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRTtRQUN0RSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQywyQkFBMkI7S0FDdEU7SUFDRCxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJO1FBQzlFLDRCQUE0QixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRTtRQUN4RyxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLDBCQUEwQjtLQUN0RztJQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JELElBQUksUUFBUSxHQUFhLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzVELElBQUksUUFBUSxDQUFDLFVBQVUsR0FBRyw0QkFBNEIsSUFBSSw0QkFBNEIsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUMzRyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDeEI7U0FDSjtLQUNKO0lBQ0QsT0FBTyx5QkFBeUIsQ0FBQztBQUNyQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN2T0Qsb0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2NyaXB0cy9pbmRleC50c1wiKTtcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUV2ZW50LCBBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnZXRBY2N1cmFjeUV2ZW50TmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5RmVlZGJhY2tEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNlbnRlclk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgY29uZmlnOiBDb25maWcpIHtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSBjZW50ZXJZO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbGFzdEV2ZW50OiBBY2N1cmFjeUV2ZW50ID0gdGhpcy5nZXRNb3N0UmVjZW50QWNjdXJhY3lFdmVudCgpO1xyXG4gICAgICAgIGlmIChsYXN0RXZlbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGltZVNpbmNlTGFzdEV2ZW50ID0gY3VycmVudFRpbWVJblNlY29uZHMgLSBsYXN0RXZlbnQudGltZUluU2Vjb25kcztcclxuICAgICAgICBsZXQgdGV4dFNpemUgPSB0aGlzLmdldEZvbnRTaXplKHRpbWVTaW5jZUxhc3RFdmVudCk7XHJcbiAgICAgICAgaWYgKHRleHRTaXplIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXZlbnROYW1lID0gZ2V0QWNjdXJhY3lFdmVudE5hbWUobGFzdEV2ZW50LmFjY3VyYWN5TWlsbGlzLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5kcmF3RXZlbnRUZXh0KGV2ZW50TmFtZSwgdGV4dFNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TW9zdFJlY2VudEFjY3VyYWN5RXZlbnQoKTogQWNjdXJhY3lFdmVudCB7XHJcbiAgICAgICAgbGV0IG1vc3RSZWNlbnRUcmFjazogQWNjdXJhY3lFdmVudFtdID0gW107XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmcubGVuZ3RoOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFjayA9IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICAgICAgaWYgKHRyYWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0RXZlbnRUaW1lID0gdGhpcy5hY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmdbdHJhY2tOdW1iZXJdW3RyYWNrLmxlbmd0aCAtIDFdLnRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdEV2ZW50VGltZSA+IGdyZWF0ZXN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGxhc3RFdmVudFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vc3RSZWNlbnRUcmFjay5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb3N0UmVjZW50VHJhY2tbbW9zdFJlY2VudFRyYWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Rm9udFNpemUodGltZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbWF4Rm9udFNpemUgPSAzMDtcclxuICAgICAgICBpZiAodGltZSA8IDAuMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZSAvIDAuMSAqIG1heEZvbnRTaXplO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aW1lID49IDAuMSAmJiB0aW1lIDwgMC40KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhGb250U2l6ZTtcclxuICAgICAgICB9IGVsc2UgaWYodGltZSA+PSAwLjQgJiYgdGltZSA8IDAuNykge1xyXG4gICAgICAgICAgICByZXR1cm4gKDEgLSAodGltZSAtIDAuNCkgLyAoMC43IC0gMC40KSkgKiBtYXhGb250U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3RXZlbnRUZXh0KHRleHQ6IHN0cmluZywgdGV4dFNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSLCBwLkNFTlRFUik7XHJcbiAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgcC50ZXh0U2l6ZSh0ZXh0U2l6ZSk7XHJcbiAgICAgICAgcC50ZXh0KHRleHQsIHRoaXMuY2VudGVyWCwgdGhpcy5jZW50ZXJZKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7S2V5U3RhdGUsIFBsYXllcktleUFjdGlvbn0gZnJvbSBcIi4vcGxheWVyX2tleV9hY3Rpb25cIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2hhbmRsZUFjY3VyYWN5RXZlbnR9IGZyb20gXCIuL2hhbmRsZV9hY2N1cmFjeV9ldmVudFwiO1xyXG5pbXBvcnQge0hvbGRNYW5hZ2VyfSBmcm9tIFwiLi9ob2xkX21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge2dldEFjY3VyYWN5RXZlbnROYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjdXJhY3kge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbG93ZXJCb3VuZDogbnVtYmVyO1xyXG4gICAgdXBwZXJCb3VuZDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubG93ZXJCb3VuZCA9IGxvd2VyQm91bmQ7XHJcbiAgICAgICAgdGhpcy51cHBlckJvdW5kID0gdXBwZXJCb3VuZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlcjtcclxuICAgIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuICAgIHB1YmxpYyBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgY29uZmlnOiBDb25maWcsIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICAgICAgdGhpcy5ob2xkTWFuYWdlciA9IGhvbGRNYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVBsYXllckFjdGlvbihhY3Rpb246IFBsYXllcktleUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChhY3Rpb24ua2V5U3RhdGUgPT0gS2V5U3RhdGUuRE9XTikge1xyXG4gICAgICAgICAgICB0aGlzLnRyeVRvSGl0Tm90ZShhY3Rpb24uZ2FtZVRpbWUsIGFjdGlvbi50cmFjayk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ua2V5U3RhdGUgPT0gS2V5U3RhdGUuVVApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZE1hbmFnZXIuaXNUcmFja0hlbGQoYWN0aW9uLnRyYWNrKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci51bmhvbGRUcmFjayhhY3Rpb24udHJhY2spO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlUb1JlbGVhc2VOb3RlKGFjdGlvbi5nYW1lVGltZSwgYWN0aW9uLnRyYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyeVRvSGl0Tm90ZShjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVJbmRleCA9IHRoaXMuZ2V0RWFybGllc3RIaXR0YWJsZVVuaGl0Tm90ZUluZGV4KGN1cnJlbnRUaW1lSW5TZWNvbmRzLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgaWYgKG5vdGVJbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBub3RlOiBOb3RlID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW25vdGVJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChub3RlLnR5cGUgPT09IE5vdGVUeXBlLk5PUk1BTCkge1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUFjY3VyYWN5RXZlbnQoZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSwgdHJhY2tOdW1iZXIsIGFjY3VyYWN5LCBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlLnR5cGUsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vdGUudHlwZSA9PSBOb3RlVHlwZS5IT0xEX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSEVMRDsgLy8gc2V0IHRoZSBub3RlIHRvIGhlbGQgc28gaXQgd29uJ3QgY291bnQgYXMgYSBtaXNzXHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUFjY3VyYWN5RXZlbnQoZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSwgdHJhY2tOdW1iZXIsIGFjY3VyYWN5LCBjdXJyZW50VGltZUluU2Vjb25kcyxcclxuICAgICAgICAgICAgICAgICAgICBub3RlLnR5cGUsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci5ob2xkVHJhY2sodHJhY2tOdW1iZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQ29uZmlndXJlZEZvckJvb3MoKSkge1xyXG4gICAgICAgICAgICBoYW5kbGVBY2N1cmFjeUV2ZW50KGdldEFjY3VyYWN5RXZlbnROYW1lKEluZmluaXR5LCB0aGlzLmNvbmZpZyksIHRyYWNrTnVtYmVyLCBJbmZpbml0eSwgY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBOb3RlVHlwZS5OT05FLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVJhbmdlOiB7IGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciB9ID0gdGhpcy5nZXRBY2N1cmFjeVJhbmdlSW5TZWNvbmRzKCk7XHJcbiAgICAgICAgbGV0IGhpdHRhYmxlVGltZVJhbmdlOiB7IGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciB9ID1cclxuICAgICAgICAgICAgdGhpcy5nZXRIaXR0YWJsZVJhbmdlKGFjY3VyYWN5UmFuZ2UsIGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICBsZXQgaGl0dGFibGVJbmRleFJhbmdlOiB7c3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyfSA9XHJcbiAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIuZ2V0Tm90ZXNCeVRpbWVSYW5nZShoaXR0YWJsZVRpbWVSYW5nZS5sZWFzdFRpbWUsIGhpdHRhYmxlVGltZVJhbmdlLmdyZWF0ZXN0VGltZSwgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVhcmxpZXN0VW5oaXROb3RlSW5kZXhJblJhbmdlKHRyYWNrTnVtYmVyLCBoaXR0YWJsZUluZGV4UmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjY3VyYWN5UmFuZ2VJblNlY29uZHMoKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5U2V0dGluZ3MgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgICAgIGxldCBudW1TZXR0aW5ncyA9IGFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoO1xyXG4gICAgICAgIGxldCBsZWFzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgIGFjY3VyYWN5U2V0dGluZ3NbMV0ubG93ZXJCb3VuZCA6IGFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZDtcclxuICAgICAgICBsZXQgZ3JlYXRlc3RUaW1lO1xyXG4gICAgICAgIGlmIChhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZSA9IGFjY3VyYWN5U2V0dGluZ3NbbnVtU2V0dGluZ3MgLSAxXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge2xlYXN0VGltZTogbGVhc3RUaW1lIC8gMTAwMCwgZ3JlYXRlc3RUaW1lOiBncmVhdGVzdFRpbWUgLyAxMDAwfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIaXR0YWJsZVJhbmdlKGFjY3VyYWN5UmFuZ2U6IHsgbGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyIH0sIHJlY2VwdG9yVGltZVBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZWFzdFRpbWU6IHJlY2VwdG9yVGltZVBvc2l0aW9uICsgYWNjdXJhY3lSYW5nZS5sZWFzdFRpbWUsXHJcbiAgICAgICAgICAgIGdyZWF0ZXN0VGltZTogcmVjZXB0b3JUaW1lUG9zaXRpb24gKyBhY2N1cmFjeVJhbmdlLmdyZWF0ZXN0VGltZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFYXJsaWVzdFVuaGl0Tm90ZUluZGV4SW5SYW5nZSh0cmFja051bWJlcjogbnVtYmVyLCBub3RlSW5kZXhSYW5nZToge3N0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IG51bWJlcn0pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gbm90ZUluZGV4UmFuZ2Uuc3RhcnRJbmRleDsgaSA8IG5vdGVJbmRleFJhbmdlLmVuZEluZGV4Tm90SW5jbHVzaXZlOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtpXS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpc0NvbmZpZ3VyZWRGb3JCb29zKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeVRvUmVsZWFzZU5vdGUoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXggPSB0aGlzLmdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kcywgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmIChub3RlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbm90ZSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobm90ZS50eXBlID09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBob2xkID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW25vdGVJbmRleCAtIDFdOyAvLyBnZXQgdGhlIGhvbGQgYmVsb25naW5nIHRvIHRoaXMgdGFpbFxyXG4gICAgICAgICAgICAgICAgaG9sZC5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGNoYW5nZSB0aGUgaG9sZCBzdGF0ZSBmcm9tIEhFTEQgdG8gSElUXHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSB0YWlsIG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSAobm90ZS50aW1lSW5TZWNvbmRzIC0gY3VycmVudFRpbWVJblNlY29uZHMpICogMTAwMDtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUFjY3VyYWN5RXZlbnQoXCJSZWxlYXNlIFwiICsgZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3ksIHRoaXMuY29uZmlnKSwgdHJhY2tOdW1iZXIsIGFjY3VyYWN5LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lSW5TZWNvbmRzLCBub3RlLnR5cGUsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gbGV0IGdvIHRvbyBlYXJseVxyXG4gICAgICAgICAgICAvLyBDb3VsZCB0aGlzIHJldHVybiAtMT9cclxuICAgICAgICAgICAgbGV0IGhvbGRTdGFydEluZGV4ID0gdGhpcy5ub3RlTWFuYWdlci5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShjdXJyZW50VGltZUluU2Vjb25kcywgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdKTtcclxuICAgICAgICAgICAgbGV0IGhvbGQgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXggLSAxXTtcclxuICAgICAgICAgICAgbGV0IHRhaWwgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoaG9sZC50eXBlID09IE5vdGVUeXBlLkhPTERfSEVBRCAmJiB0YWlsLnR5cGUgPT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4IC0gMV0uc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBoaXQgdGhlIHN0YXJ0IG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baG9sZFN0YXJ0SW5kZXhdLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSB0YWlsIG9mIHRoZSBob2xkXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVBY2N1cmFjeUV2ZW50KFwiUmVsZWFzZSBcIiArIGdldEFjY3VyYWN5RXZlbnROYW1lKEluZmluaXR5LCB0aGlzLmNvbmZpZyksIHRyYWNrTnVtYmVyLCBJbmZpbml0eSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGltZUluU2Vjb25kcywgTm90ZVR5cGUuTk9ORSwgdGhpcy5hY2N1cmFjeVJlY29yZGluZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBJdCdzIHBvc3NpYmxlIHRoYXQgdGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIHJhY2UgY29uZGl0aW9uIGJldHdlZW4gdGhlIGtleSBldmVudCBhbmQgdGhlIGFuaW1hdGlvbiBsb29wLiBEb24ndCB0aHJvdyBhbiBlcnJvciBmb3Igbm93XHJcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBcIkVycm9yOiBSZWxlYXNlIG1pc3MgZmFpbGVkIHRvIHRyaWdnZXIgb24gbm90ZSBpbmRleCBcIiArIChob2xkU3RhcnRJbmRleCAtIDEpICsgXCIsIHRyYWNrIGluZGV4IFwiICsgdHJhY2tOdW1iZXIgKyBcIiBhdCB0aW1lIFwiICsgY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcblxyXG5leHBvcnQgZW51bSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlIHtcclxuICAgIElOQ09NUExFVEUsXHJcbiAgICBSRUFEWSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY2N1cmFjeUV2ZW50IHtcclxuICAgIHRpbWVJblNlY29uZHM6IG51bWJlcixcclxuICAgIGFjY3VyYWN5TWlsbGlzOiBudW1iZXIsXHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5UmVjb3JkaW5nIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZTtcclxuICAgIHB1YmxpYyByZWNvcmRpbmc6IEFjY3VyYWN5RXZlbnRbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGUuSU5DT01QTEVURTtcclxuICAgICAgICB0aGlzLnJlY29yZGluZyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRpbmcucHVzaChbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvcmRBY2N1cmFjeUV2ZW50KHRyYWNrTnVtYmVyOiBudW1iZXIsIGFjY3VyYWN5TWlsbGlzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSkge1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nW3RyYWNrTnVtYmVyXS5wdXNoKFxyXG4gICAgICAgICAgICB7dGltZUluU2Vjb25kczogY3VycmVudFRpbWUsIGFjY3VyYWN5TWlsbGlzOiBhY2N1cmFjeU1pbGxpcywgbm90ZVR5cGU6IG5vdGVUeXBlfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEF1ZGlvRmlsZVN0YXRlIHtcclxuICAgIE5PX0FVRElPX0ZJTEUsXHJcbiAgICBET05FX1JFQURJTkcsXHJcbiAgICBCVUZGRVJFRCxcclxuICAgIEVSUk9SLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXVkaW9GaWxlIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogQXVkaW9GaWxlU3RhdGU7XHJcbiAgICBwdWJsaWMgZmlsZTogRmlsZTtcclxuICAgIHB1YmxpYyBhdWRpb1NvdXJjZTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xyXG4gICAgcHVibGljIGF1ZGlvQ29udGV4dDogQXVkaW9Db250ZXh0O1xyXG4gICAgcHVibGljIGF1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLk5PX0FVRElPX0ZJTEU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWQoZmlsZTogcDUuRmlsZSkge1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGUuZmlsZTsgLy8gdGhpcyB1bndyYXBzIHRoZSBwNS5GaWxlIHdyYXBwZXIgdG8gZ2V0IHRoZSBvcmlnaW5hbCBET00gZmlsZVxyXG4gICAgICAgIGxvYWRTb3VuZEZpbGUodGhpcy5maWxlLCAoKG9uRmlsZVJlYWQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLkRPTkVfUkVBRElORztcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvU291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YSg8QXJyYXlCdWZmZXI+b25GaWxlUmVhZC50YXJnZXQucmVzdWx0KS50aGVuKCgoYnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9CdWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdpdGggZGVjb2RpbmcgYXVkaW8gZGF0YVwiICsgZS5lcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyLmR1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IEZhaWxlZCB0byBleGVjdXRlICdzdGFydCcgb24gJ0F1ZGlvQnVmZmVyU291cmNlTm9kZSc6IGNhbm5vdCBjYWxsIHN0YXJ0IG1vcmUgdGhhbiBvbmNlLlxyXG4gICAgcHVibGljIHBsYXkoZGVsYXlJblNlY29uZHM6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZGVsYXlJblNlY29uZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuICAgICAgICBBdWRpb0ZpbGVTdGF0ZS5ET05FX1JFQURJTkc7XHJcbiAgICAgICAgdGhpcy5yZWNyZWF0ZVNvdXJjZU5vZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlY3JlYXRlU291cmNlTm9kZSgpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5idWZmZXIgPSB0aGlzLmF1ZGlvQnVmZmVyO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRTb3VuZEZpbGUoXHJcbiAgICBmaWxlOiBGaWxlLFxyXG4gICAgbGlzdGVuZXI6IChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4gYW55LFxyXG4gICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc1xyXG4pIHtcclxuICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgIGZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XHJcbiAgICBmaWxlUmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIGxpc3RlbmVyLCBvcHRpb25zKTtcclxufSIsImltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtkZWZhdWx0SWZVbmRlZmluZWR9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtERUZBVUxUX0NPTkZJR30gZnJvbSBcIi4vZGVmYXVsdF9jb25maWdcIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuXHJcbi8vIEVzc2VudGlhbCBjb25maWc6IHNjcm9sbCBzcGVlZCwgc2Nyb2xsIGRpcmVjdGlvbiwgZ2FtZSB3aWR0aC9oZWlnaHQsIGFkZGl0aW9uYWwgb2Zmc2V0LCBwYXVzZSBhdCBzdGFydFxyXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuICAgIHBpeGVsc1BlclNlY29uZDogbnVtYmVyO1xyXG4gICAgcmVjZXB0b3JZUGVyY2VudDogbnVtYmVyO1xyXG4gICAgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb247XHJcbiAgICBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdO1xyXG4gICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBrZXlCaW5kaW5nczogTWFwPG51bWJlciwgS2V5QmluZGluZ1tdPjtcclxuICAgIGdhbWVBcmVhSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBnYW1lQXJlYVdpZHRoOiBudW1iZXI7XHJcbiAgICBub3RlU2l6ZTogbnVtYmVyO1xyXG4gICAgcXVpdEtleTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBwaXhlbHNQZXJTZWNvbmQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZXB0b3JZUGVyY2VudD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxEaXJlY3Rpb24/OiBTY3JvbGxEaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcz86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzPzogQWNjdXJhY3lbXSxcclxuICAgICAgICAgICAgICAgICAgICBwYXVzZUF0U3RhcnRJblNlY29uZHM/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5QmluZGluZ3M/OiBNYXA8bnVtYmVyLCBLZXlCaW5kaW5nW10+LFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVBcmVhSGVpZ2h0PzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVBcmVhV2lkdGg/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZVNpemU/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpdEtleT86IG51bWJlcixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUFyZWFIZWlnaHQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5nYW1lQXJlYUhlaWdodCwgREVGQVVMVF9DT05GSUcuZ2FtZUFyZWFIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUFyZWFXaWR0aCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmdhbWVBcmVhV2lkdGgsIERFRkFVTFRfQ09ORklHLmdhbWVBcmVhV2lkdGgpO1xyXG5cclxuICAgICAgICB0aGlzLnBpeGVsc1BlclNlY29uZCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnBpeGVsc1BlclNlY29uZCwgREVGQVVMVF9DT05GSUcucGl4ZWxzUGVyU2Vjb25kKTtcclxuICAgICAgICAvLyB0aGlzLnNldFNlY29uZHNQZXJQaXhlbCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbERpcmVjdGlvbiA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnNjcm9sbERpcmVjdGlvbiwgREVGQVVMVF9DT05GSUcuc2Nyb2xsRGlyZWN0aW9uKTtcclxuICAgICAgICAvLyB0aGlzLnNldFNjcm9sbERpcmVjdGlvbigpO1xyXG5cclxuICAgICAgICAvLyBOT1RFOiBTY3JvbGwgZGlyZWN0aW9uIGFuZCBnYW1lQXJlYUhlaWdodCBtdXN0IGJlIHNldCBCRUZPUkUgc2V0dGluZyByZWNlcHRvcllQb3NpdGlvblxyXG4gICAgICAgIHRoaXMucmVjZXB0b3JZUGVyY2VudCA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnJlY2VwdG9yWVBlcmNlbnQsIERFRkFVTFRfQ09ORklHLnJlY2VwdG9yWVBlcmNlbnQpO1xyXG4gICAgICAgIC8vIHRoaXMuc2V0UmVjZXB0b3JZUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcywgREVGQVVMVF9DT05GSUcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyk7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRBZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lTZXR0aW5ncyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmFjY3VyYWN5U2V0dGluZ3MsIERFRkFVTFRfQ09ORklHLmFjY3VyYWN5U2V0dGluZ3MpO1xyXG4gICAgICAgIC8vIHRoaXMuc2V0QWNjdXJhY3lTZXR0aW5ncygpO1xyXG5cclxuICAgICAgICB0aGlzLnBhdXNlQXRTdGFydEluU2Vjb25kcyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnBhdXNlQXRTdGFydEluU2Vjb25kcywgREVGQVVMVF9DT05GSUcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzKTtcclxuICAgICAgICAvLyB0aGlzLnNldFBhdXNlQXRTdGFydEluU2Vjb25kcygpO1xyXG5cclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3Mubm90ZVNpemUsIERFRkFVTFRfQ09ORklHLm5vdGVTaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5rZXlCaW5kaW5ncyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmtleUJpbmRpbmdzLCBERUZBVUxUX0NPTkZJRy5rZXlCaW5kaW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMucXVpdEtleSA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLnF1aXRLZXksIERFRkFVTFRfQ09ORklHLnF1aXRLZXkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGxldCBERUZBVUxUX0NPTkZJRyA9IHtcclxuICAgIHBpeGVsc1BlclNlY29uZDogNTUwLFxyXG4gICAgc2Nyb2xsRGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24uRG93bixcclxuICAgIHJlY2VwdG9yWVBlcmNlbnQ6IDE1LFxyXG4gICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kczogMCxcclxuICAgIC8vIFRoaXMgaXMgYSBzeW1tZXRyaWNhbCB2ZXJzaW9uIG9mIEZGUidzIGFjY3VyYWN5XHJcbiAgICAvLyBUT0RPOiBBZGQgYSBsaXN0IG9mIHByZXNldHMgdGhhdCBsaXZlIGluIHRoZWlyIG93biBmaWxlXHJcbiAgICAvLyBUT0RPOiB2YWxpZGF0aW9uIG9uIGFjY3VyYWN5IHNldHRpbmdzIHRoYXQgZXhwbGFpbnMgd2h5IG1pc3Mgc2hvdWxkbid0IGhhdmUgbG93ZXIgYm91bmRcclxuICAgIGFjY3VyYWN5U2V0dGluZ3M6IFtcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJNaXNzXCIsIG51bGwsLTExNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQXZlcmFnZVwiLCAtMTE3LCAtODMpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkdvb2RcIiwgLTgzLCAtNTApLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIlBlcmZlY3RcIiwgLTUwLCAtMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkFtYXppbmdcIiwgLTE3LCAxNyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiUGVyZmVjdFwiLCAxNywgNTApLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkdvb2RcIiwgNTAsIDgzKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBdmVyYWdlXCIsIDgzLCAxMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkJvb1wiLCAxMTcsIG51bGwpXHJcbiAgICBdLFxyXG4gICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzOiAwLFxyXG4gICAga2V5QmluZGluZ3M6IG5ldyBNYXAoKSxcclxuICAgIGdhbWVBcmVhSGVpZ2h0OiA2MDAsXHJcbiAgICBnYW1lQXJlYVdpZHRoOiA0MDAsXHJcbiAgICBub3RlU2l6ZTogMzAsXHJcbiAgICBxdWl0S2V5OiAyNywgLy8gUXVpdCBkZWZhdWx0cyB0byBlc2NhcGUga2V5XHJcbn07IiwiaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVmYXVsdE5vdGVTa2luIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd05vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBub3RlU2l6ZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICBzd2l0Y2ggKG5vdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLkhPTERfSEVBRDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRTaXplKDIwKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEZvbnQoXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dEFsaWduKHAuQ0VOVEVSKTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwidlwiLCBjZW50ZXJYLCBjZW50ZXJZICsgNik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5ST0xMX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcInhcIiwgY2VudGVyWCwgY2VudGVyWSArIDYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTUlORTpcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgcC5jaXJjbGUoY2VudGVyWCwgY2VudGVyWSwgMjQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcIlhcIiwgY2VudGVyWCwgY2VudGVyWSArIDgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBwLm5vRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAuZmlsbChcImJsYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCI/XCIsIGNlbnRlclgsIGNlbnRlclkgKyA3KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd1JlY2VwdG9yKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gbm90ZVNpemU7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IG5vdGVTaXplO1xyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhd0hvbGRDb25uZWN0b3IoY2VudGVyWDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZSAqIDAuNTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgc3RhcnRZLCB3aWR0aCwgZW5kWSAtIHN0YXJ0WSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0RlZmF1bHROb3RlU2tpbn0gZnJvbSBcIi4vZGVmYXVsdF9ub3RlX3NraW5cIjtcclxuXHJcbmNsYXNzIE5vdGVEaXNwbGF5IHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIGNlbnRlclk6IG51bWJlcjtcclxuICAgIG5vdGVUeXBlOiBOb3RlVHlwZTtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG4gICAgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdHJhY2tOdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIG5vdGVUeXBlOiBOb3RlVHlwZSwgc2tldGNoSW5zdGFuY2U6IHA1LCBub3RlU2l6ZTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLmNlbnRlclkgPSBjZW50ZXJZO1xyXG4gICAgICAgIHRoaXMubm90ZVR5cGUgPSBub3RlVHlwZTtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gbm90ZVNpemU7XHJcbiAgICAgICAgdGhpcy50cmFja051bWJlciA9IHRyYWNrTnVtYmVyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzTm90ZURyYXdTdWNjZXNzZnVsID0gZ2xvYmFsLm5vdGVTa2luLmRyYXdOb3RlKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsXHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlVHlwZSk7XHJcbiAgICAgICAgaWYgKCFpc05vdGVEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd05vdGUodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCwgdGhpcy5jZW50ZXJZLCB0aGlzLm5vdGVUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEhvbGRDb25uZWN0b3Ige1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgc3RhcnRZOiBudW1iZXI7XHJcbiAgICBlbmRZOiBudW1iZXI7XHJcbiAgICBub3RlU3RhcnRZOiBudW1iZXI7XHJcbiAgICBub3RlRW5kWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZW5kWTogbnVtYmVyLCBub3RlU3RhcnRZOiBudW1iZXIsIG5vdGVFbmRZOiBudW1iZXIsIHNrZXRjaEluc3RhbmNlOiBwNSkge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuc3RhcnRZID0gc3RhcnRZO1xyXG4gICAgICAgIHRoaXMuZW5kWSA9IGVuZFk7XHJcbiAgICAgICAgdGhpcy5ub3RlU3RhcnRZID0gbm90ZVN0YXJ0WTtcclxuICAgICAgICB0aGlzLm5vdGVFbmRZID0gbm90ZUVuZFk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgaXNDb25uZWN0b3JEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3SG9sZENvbm5lY3Rvcih0aGlzLmNlbnRlclgsIHRoaXMuc3RhcnRZLCB0aGlzLmVuZFksXHJcbiAgICAgICAgICAgIHRoaXMubm90ZVN0YXJ0WSwgdGhpcy5ub3RlRW5kWSk7XHJcbiAgICAgICAgaWYgKCFpc0Nvbm5lY3RvckRyYXdTdWNjZXNzZnVsKSB7XHJcbiAgICAgICAgICAgIERlZmF1bHROb3RlU2tpbi5kcmF3SG9sZENvbm5lY3Rvcih0aGlzLmNlbnRlclgsIHRoaXMuc3RhcnRZLCB0aGlzLmVuZFkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUmVjZXB0b3Ige1xyXG4gICAgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgY2VudGVyWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIG5vdGVTaXplOiBudW1iZXJcclxuICAgIHByaXZhdGUgdHJhY2tOdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbnVtVHJhY2tzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHNrZXRjaEluc3RhbmNlOiBwNSwgbm90ZVNpemU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLm5vdGVTaXplID0gbm90ZVNpemU7XHJcbiAgICAgICAgdGhpcy50cmFja051bWJlciA9IHRyYWNrTnVtYmVyO1xyXG4gICAgICAgIHRoaXMubnVtVHJhY2tzID0gbnVtVHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzUmVjZXB0b3JEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3UmVjZXB0b3IodGhpcy50cmFja051bWJlciwgdGhpcy5udW1UcmFja3MsIHRoaXMuY2VudGVyWCxcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJZKTtcclxuICAgICAgICBpZiAoIWlzUmVjZXB0b3JEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd1JlY2VwdG9yKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL1RPRE86IERpc3BsYXkgbWlzc2VkIG5vdGVzIGRpZmZlcmVudGx5IHRoYW4gaGl0IG5vdGVzXHJcbmV4cG9ydCBjbGFzcyBEaXNwbGF5TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBza2V0Y2hJbnN0YW5jZTogcDU7XHJcbiAgICBwcml2YXRlIHRvcExlZnRYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRvcExlZnRZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgY29uZmlnOiBDb25maWcsIHNrZXRjaEluc3RhbmNlOiBwNSwgdG9wTGVmdFg6IG51bWJlciA9IDAsXHJcbiAgICAgICAgICAgICAgICB0b3BMZWZ0WTogbnVtYmVyID0gMCwgd2lkdGg6IG51bWJlciA9IDE4MCwgaGVpZ2h0OiBudW1iZXIgPSA0MDApIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyA9IDA7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMudG9wTGVmdFggPSB0b3BMZWZ0WDtcclxuICAgICAgICB0aGlzLnRvcExlZnRZID0gdG9wTGVmdFk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IHRoaXMuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UucmVjdCh0aGlzLnRvcExlZnRYLCB0aGlzLnRvcExlZnRZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Tm90ZXNBbmRDb25uZWN0b3JzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3UmVjZXB0b3JzKCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3Rlc0FuZENvbm5lY3RvcnMoKSB7XHJcbiAgICAgICAgbGV0IGxlYXN0VGltZSA9IHRoaXMuZ2V0TGVhc3RUaW1lKHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIGxldCBncmVhdGVzdFRpbWUgPSB0aGlzLmdldEdyZWF0ZXN0VGltZSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRyYXdBbGxDb25uZWN0b3JzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lKTtcclxuICAgICAgICB0aGlzLmRyYXdBbGxOb3RlcyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsTm90ZXMobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd05vdGVzSW5UcmFjayhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgaSwgbnVtVHJhY2tzLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZXNJblRyYWNrKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXhSYW5nZSA9IHRoaXMubm90ZU1hbmFnZXIuZ2V0Tm90ZXNCeVRpbWVSYW5nZShsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGxldCBub3RlcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXS5zbGljZShub3RlSW5kZXhSYW5nZS5zdGFydEluZGV4LCBub3RlSW5kZXhSYW5nZS5lbmRJbmRleE5vdEluY2x1c2l2ZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdOb3RlKG5vdGVzW2ldLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGUobm90ZTogTm90ZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAobm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgICAgIGxldCB5ID0gdGhpcy5nZXROb3RlQ2VudGVyWShub3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgbmV3IE5vdGVEaXNwbGF5KHgsIHksIG5vdGUudHlwZSwgdGhpcy5za2V0Y2hJbnN0YW5jZSwgdGhpcy5jb25maWcubm90ZVNpemUsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MpLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZWFzdFRpbWUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0b3RhbERpc3BsYXlTZWNvbmRzID0gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLyB0aGlzLmNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lIC0gdGhpcy5jb25maWcucmVjZXB0b3JZUGVyY2VudCAvIDEwMCAqIHRvdGFsRGlzcGxheVNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRHcmVhdGVzdFRpbWUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0b3RhbERpc3BsYXlTZWNvbmRzID0gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLyB0aGlzLmNvbmZpZy5waXhlbHNQZXJTZWNvbmQ7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lICsgKDEgLSB0aGlzLmNvbmZpZy5yZWNlcHRvcllQZXJjZW50IC8gMTAwKSAqIHRvdGFsRGlzcGxheVNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3RlQ2VudGVyWCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByZWNlcHRvclNwYWNpbmcgPSB0aGlzLmdldERpc3BsYXlXaWR0aCgpIC8gbnVtVHJhY2tzIC0gdGhpcy5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgcmV0dXJuICgyICogdHJhY2tOdW1iZXIgKyAxKSAvIDIgKiAodGhpcy5jb25maWcubm90ZVNpemUgKyByZWNlcHRvclNwYWNpbmcpICsgdGhpcy50b3BMZWZ0WDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGVzc2VudGlhbGx5IGRlZmluZXMgYSBjb252ZXJzaW9uIGZyb20gc2Vjb25kcyB0byBwaXhlbHNcclxuICAgIHByaXZhdGUgZ2V0Tm90ZUNlbnRlclkobm90ZVRpbWU6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlWU9mZnNldCA9IHRoaXMuY29uZmlnLnBpeGVsc1BlclNlY29uZCAqIChub3RlVGltZSAtIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICBsZXQgcmVjZXB0b3JZT2Zmc2V0ID0gdGhpcy5jb25maWcucmVjZXB0b3JZUGVyY2VudCAvIDEwMCAqIHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNlcHRvcllPZmZzZXQgKyBub3RlWU9mZnNldCArIHRoaXMudG9wTGVmdFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzcGxheUhlaWdodCgpIC0gKHJlY2VwdG9yWU9mZnNldCArIG5vdGVZT2Zmc2V0KSArIHRoaXMudG9wTGVmdFk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheVdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbENvbm5lY3RvcnMobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0FsbFRyYWNrQ29ubmVjdG9ycyhsZWFzdFRpbWUsIGdyZWF0ZXN0VGltZSwgdHJhY2tzW2ldLCBpLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzLmxlbmd0aCwgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0FsbFRyYWNrQ29ubmVjdG9ycyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIsIHRyYWNrOiBOb3RlW10sIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZVN0YWNrOiBOb3RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm90ZTogTm90ZSA9IHRyYWNrW2ldO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudGltZUluU2Vjb25kcyA8IGxlYXN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudGltZUluU2Vjb25kcyA8IGdyZWF0ZXN0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnROb3RlID0gbm90ZVN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmROb3RlID0gY3VycmVudE5vdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0Tm90ZSAhPSB1bmRlZmluZWQgJiYgZW5kTm90ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQgfHwgc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5IRUxEKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kTm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZSwgZW5kTm90ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vdGVTdGFjay5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCB8fCBjdXJyZW50Tm90ZS50eXBlID09PSBOb3RlVHlwZS5ST0xMX0hFQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RlU3RhY2sucHVzaChjdXJyZW50Tm90ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnROb3RlID0gbm90ZVN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmROb3RlID0gY3VycmVudE5vdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0Tm90ZSAhPSB1bmRlZmluZWQgJiYgZW5kTm90ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQgfHwgc3RhcnROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5IRUxEKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kTm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZSwgZW5kTm90ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0Nvbm5lY3RvcihzdGFydE5vdGU6IE5vdGUsIGVuZE5vdGU6IE5vdGUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIGxldCBub3RlU3RhcnRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShzdGFydE5vdGUudGltZUluU2Vjb25kcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIGxldCBub3RlRW5kWSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkoZW5kTm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcblxyXG4gICAgICAgIGxldCBkcmF3U3RhcnRZO1xyXG4gICAgICAgIGlmIChzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpIHtcclxuICAgICAgICAgICAgZHJhd1N0YXJ0WSA9IHRoaXMuZ2V0Tm90ZUNlbnRlclkoTWF0aC5taW4oY3VycmVudFRpbWUsIGVuZE5vdGUudGltZUluU2Vjb25kcyksIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkcmF3U3RhcnRZID0gbm90ZVN0YXJ0WTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJhd1N0YXJ0WSA9IHRoaXMuY2xhbXBWYWx1ZVRvUmFuZ2UoZHJhd1N0YXJ0WSwgdGhpcy50b3BMZWZ0WSwgdGhpcy50b3BMZWZ0WSArIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IGRyYXdFbmRZID0gbm90ZUVuZFlcclxuICAgICAgICBkcmF3RW5kWSA9IHRoaXMuY2xhbXBWYWx1ZVRvUmFuZ2UoZHJhd0VuZFksIHRoaXMudG9wTGVmdFksIHRoaXMudG9wTGVmdFkgKyB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIG5ldyBIb2xkQ29ubmVjdG9yKGNlbnRlclgsIGRyYXdTdGFydFksIGRyYXdFbmRZLCBub3RlU3RhcnRZLCBub3RlRW5kWSwgdGhpcy5za2V0Y2hJbnN0YW5jZSkuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xhbXBWYWx1ZVRvUmFuZ2UodmFsdWU6IG51bWJlciwgbG93ZXJCb3VuZDogbnVtYmVyLCB1cHBlckJvdW5kOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IGxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvd2VyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSA+IHVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdSZWNlcHRvcnMoKSB7XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ldyBSZWNlcHRvcih0aGlzLmdldE5vdGVDZW50ZXJYKGksIG51bVRyYWNrcyksIHRoaXMuZ2V0Tm90ZUNlbnRlclkodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcywgdGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlLCB0aGlzLmNvbmZpZy5ub3RlU2l6ZSwgaSwgbnVtVHJhY2tzKS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuLyogTGV0cyB1cyBjb2RlIHRoZSBET00gVUkgZWxlbWVudHMgYXMgaWYgaXQgd2VyZSBcImltbWVkaWF0ZVwiLCBpLmUuIHN0YXRlbGVzcy5cclxuICogQWxsIHJlZ2lzdGVyZWQgZWxlbWVudHMgYXJlIHJlbW92ZWQgd2hlbiB0aGUgcGFnZSBjaGFuZ2VzXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRE9NV3JhcHBlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWdpc3RyeTogTWFwPHN0cmluZywgcDUuRWxlbWVudD4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgLy8gdW5pcXVlSUQgc2hvdWxkIGJlIHVuaXF1ZSB3aXRoaW4gYSBzY2VuZVxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoY3JlYXRlQ2FsbDogKCkgPT4gcDUuRWxlbWVudCwgdW5pcXVlSWQ6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyeS5oYXModW5pcXVlSWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLnJlZ2lzdHJ5LmdldCh1bmlxdWVJZCksXHJcbiAgICAgICAgICAgICAgICBhbHJlYWR5RXhpc3RzOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVDYWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuc2V0KHVuaXF1ZUlkLCBlbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBhbHJlYWR5RXhpc3RzOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyUmVnaXN0cnkoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyeS5mb3JFYWNoKCh2YWx1ZSwga2V5LCBtYXApID0+IHtcclxuICAgICAgICAgICAgdmFsdWUucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyeS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiByZW1vdmUgd2FzIHN1Y2Nlc3NmdWwsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFbGVtZW50QnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0cnkuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJ5LmdldChpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuZGVsZXRlKGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRoZSBlbGVtZW50IGlmIGZvdW5kLCBvdGhlcndpc2UgcmV0dXJucyB1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZXQoaWQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lNYW5hZ2VyfSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge2dldEFjY3VyYWN5RXZlbnROYW1lfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0FjY3VyYWN5QmFycyhwOiBwNSwgYWNjdXJhY3lMYWJlbHM6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCB0ZXh0U2l6ZTogbnVtYmVyLCBiYXJXaWR0aDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXJIZWlnaHQ6IG51bWJlciwgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcikge1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IGdldE1heFRleHRXaWR0aChwLCBhY2N1cmFjeUxhYmVscywgdGV4dFNpemUpO1xyXG4gICAgbGV0IHRvdGFsTm90ZXMgPSBub3RlTWFuYWdlci5nZXRUb3RhbE5vdGVzKCk7XHJcbiAgICBsZXQgYmFyU3BhY2luZyA9IDEwO1xyXG4gICAgbGV0IHRvdGFsSGVpZ2h0ID0gYWNjdXJhY3lMYWJlbHMubGVuZ3RoICogYmFySGVpZ2h0ICsgKGFjY3VyYWN5TGFiZWxzLmxlbmd0aCAtIDEpICogYmFyU3BhY2luZztcclxuICAgIGxldCBzdGFydFkgPSAocC5oZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyICsgYmFySGVpZ2h0IC8gMjtcclxuICAgIHN0YXJ0WSAqPSAwLjg7IC8vIHNoaWZ0IHRoZSByZXN1bHRzIHVwIHRvIG1ha2Ugcm9vbSBmb3IgZXhpdCBidXR0b25cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjdXJhY3lMYWJlbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lMYWJlbCA9IGFjY3VyYWN5TGFiZWxzW2ldO1xyXG4gICAgICAgIGxldCBudW1BY2N1cmFjeUV2ZW50cyA9IGdldE51bUFjY3VyYWN5RXZlbnRzKGFjY3VyYWN5TGFiZWwsIGFjY3VyYWN5UmVjb3JkaW5nLCBhY2N1cmFjeU1hbmFnZXIpO1xyXG4gICAgICAgIGxldCBwZXJjZW50RmlsbGVkID0gbnVtQWNjdXJhY3lFdmVudHMgLyB0b3RhbE5vdGVzO1xyXG4gICAgICAgIGRyYXdBY2N1cmFjeUJhcihwLCBjZW50ZXJYLCBzdGFydFkgKyBpICogKGJhckhlaWdodCArIGJhclNwYWNpbmcpLCBhY2N1cmFjeUxhYmVsLCBudW1BY2N1cmFjeUV2ZW50cy50b1N0cmluZygpLCB0b3RhbE5vdGVzLnRvU3RyaW5nKCksIHRleHRTaXplLCBtYXhUZXh0V2lkdGgsIGJhcldpZHRoLCBiYXJIZWlnaHQsIHBlcmNlbnRGaWxsZWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROdW1BY2N1cmFjeUV2ZW50cyhhY2N1cmFjeUxhYmVsOiBzdHJpbmcsIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIpIHtcclxuICAgIHJldHVybiBhY2N1cmFjeVJlY29yZGluZy5yZWNvcmRpbmcucmVkdWNlKChzdW0sIHRyYWNrUmVjb3JkaW5nKSA9PlxyXG4gICAgICAgIHN1bSArIHRyYWNrUmVjb3JkaW5nLmZpbHRlcihhY2N1cmFjeUV2ZW50ID0+XHJcbiAgICAgICAgZ2V0QWNjdXJhY3lFdmVudE5hbWUoYWNjdXJhY3lFdmVudC5hY2N1cmFjeU1pbGxpcywgYWNjdXJhY3lNYW5hZ2VyLmNvbmZpZykgPT09IGFjY3VyYWN5TGFiZWwpLmxlbmd0aCwgMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1heFRleHRXaWR0aChwOiBwNSwgdGV4dEFycmF5OiBzdHJpbmdbXSwgdGV4dFNpemU6IG51bWJlcikge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLnRleHRTaXplKHRleHRTaXplKTtcclxuICAgIGxldCBtYXhUZXh0V2lkdGggPSB0ZXh0QXJyYXkubWFwKChzdHJpbmcpID0+IHAudGV4dFdpZHRoKHN0cmluZykpXHJcbiAgICAgICAgLnJlZHVjZSgobWF4V2lkdGgsIHdpZHRoKSA9PiBNYXRoLm1heChtYXhXaWR0aCwgd2lkdGgsIC0xKSk7XHJcbiAgICBwLnBvcCgpO1xyXG4gICAgcmV0dXJuIG1heFRleHRXaWR0aDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdBY2N1cmFjeUJhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGxhYmVsMTogc3RyaW5nLCBsYWJlbDI6IHN0cmluZywgbGFiZWwzOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNpemU6IG51bWJlciwgbGFyZ2VzdFRleHRXaWR0aDogbnVtYmVyLCBiYXJXaWR0aDogbnVtYmVyLCBiYXJIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIpIHtcclxuICAgIGxldCBzcGFjaW5nQmV0d2VlbkJhckFuZExhYmVsID0gODtcclxuICAgIGxldCB0b3RhbFdpZHRoID0gbGFyZ2VzdFRleHRXaWR0aCArIHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgKyBiYXJXaWR0aDtcclxuICAgIGxldCBsYWJlbFJpZ2h0bW9zdFggPSBjZW50ZXJYIC0gdG90YWxXaWR0aCAvIDIgKyBsYXJnZXN0VGV4dFdpZHRoO1xyXG4gICAgZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHAsIGxhYmVsUmlnaHRtb3N0WCwgY2VudGVyWSwgbGFiZWwxLCB0ZXh0U2l6ZSk7XHJcblxyXG4gICAgbGV0IGJhclJpZ2h0WCA9IGNlbnRlclggKyB0b3RhbFdpZHRoIC8gMjtcclxuICAgIGxldCBiYXJMZWZ0WCA9IGJhclJpZ2h0WCAtIGJhcldpZHRoO1xyXG4gICAgbGV0IGJhckNlbnRlclggPSAoYmFyTGVmdFggKyBiYXJSaWdodFgpIC8gMjtcclxuICAgIGRyYXdQYXJ0aWFsbHlGaWxsZWRCYXIocCwgYmFyQ2VudGVyWCwgY2VudGVyWSwgYmFyV2lkdGgsIGJhckhlaWdodCwgcGVyY2VudEZpbGxlZCwgdGV4dFNpemUsIGxhYmVsMiwgbGFiZWwzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdSaWdodEFsaWduZWRMYWJlbChwOiBwNSwgcmlnaHRtb3N0WDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHQ6IHN0cmluZywgdGV4dFNpemU6IG51bWJlcikge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgcC50ZXh0QWxpZ24ocC5SSUdIVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHRleHQsIHJpZ2h0bW9zdFgsIGNlbnRlclkpO1xyXG4gICAgcC5wb3AoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdQYXJ0aWFsbHlGaWxsZWRCYXIocDogcDUsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudEZpbGxlZDogbnVtYmVyLCB0ZXh0U2l6ZTogbnVtYmVyLCBzdGFydExhYmVsOiBzdHJpbmcsIGVuZExhYmVsOiBzdHJpbmcpIHtcclxuICAgIHAucHVzaCgpO1xyXG4gICAgcC5yZWN0TW9kZShwLkNFTlRFUik7XHJcbiAgICBwLnN0cm9rZShcIndoaXRlXCIpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIGZpbGxlZCBwYXJ0IG9mIHRoZSBiYXJcclxuICAgIHAuZmlsbChcImdyYXlcIik7XHJcbiAgICBwLnJlY3QoY2VudGVyWCAtICh3aWR0aCAqICgxIC0gcGVyY2VudEZpbGxlZCkgLyAyKSwgY2VudGVyWSwgd2lkdGggKiBwZXJjZW50RmlsbGVkLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIG91dGxpbmUgb2YgdGhlIGJhclxyXG4gICAgcC5ub0ZpbGwoKTtcclxuICAgIHAucmVjdChjZW50ZXJYLCBjZW50ZXJZLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBsYWJlbHMgb24gdGhlIGVuZHMgb2YgdGhlIGJhclxyXG4gICAgbGV0IGxhYmVsU2l6ZSA9IDEuNSAqIHRleHRTaXplO1xyXG4gICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICBwLnRleHRTaXplKGxhYmVsU2l6ZSk7XHJcbiAgICBwLnRleHRBbGlnbihwLkxFRlQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChzdGFydExhYmVsLCBjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZICsgMik7XHJcbiAgICBwLnRleHRBbGlnbihwLlJJR0hULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQoZW5kTGFiZWwsIGNlbnRlclggKyB3aWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAucG9wKCk7XHJcbn0iLCJpbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5cclxuLy9UT0RPOiBhbmltYXRpb25zIGZvciBhY2N1cmFjeSBldmVudHNcclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFjY3VyYWN5RXZlbnQoYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHRyYWNrTnVtYmVyOiBudW1iZXIsIGFjY3VyYWN5OiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVUeXBlOiBOb3RlVHlwZSwgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nKSB7XHJcbiAgICBhY2N1cmFjeVJlY29yZGluZy5yZWNvcmRBY2N1cmFjeUV2ZW50KHRyYWNrTnVtYmVyLCBhY2N1cmFjeSwgY3VycmVudFRpbWUsIG5vdGVUeXBlKTtcclxuICAgIGNvbnNvbGUubG9nKFwiVHJhY2sgI1wiICsgKHRyYWNrTnVtYmVyICsgMSkgKyBcIiBcIiArIGFjY3VyYWN5TmFtZSArXHJcbiAgICAgICAgKE1hdGguYWJzKGFjY3VyYWN5KSA9PSBJbmZpbml0eSA/IFwiXCIgOiBcIiAoXCIgKyBNYXRoLnJvdW5kKGFjY3VyYWN5KSArIFwiIG1zKVwiKSk7XHJcbn1cclxuIiwiXHJcbi8qIFRoaXMgY2xhc3MgaXMgaW50ZW5kZWQgb25seSB0byBiZSB1c2VkIHRvIHN0b3JlIHRoZSBob2xkIHN0YXRlIG9mIGtleSBldmVudHMgZm9yIG5vdGVzIHRoYXQgY2FuIGJlIGhlbGQuIFRoaXNcclxuICAgIHNob3VsZG4ndCBiZSB1c2VkIGZvciBub3JtYWwgbm90ZXMgKi9cclxuZXhwb3J0IGNsYXNzIEhvbGRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgaGVsZFRyYWNrczogYm9vbGVhbltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmhlbGRUcmFja3MucHVzaChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1RyYWNrSGVsZCh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhvbGRUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVuaG9sZCB0cmFjayBcIiArICh0cmFja051bWJlciArIDEpKTtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3NbdHJhY2tOdW1iZXJdID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7U3RlcGZpbGV9IGZyb20gXCIuL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlfSBmcm9tIFwiLi9hdWRpb19maWxlXCI7XHJcbmltcG9ydCB7UDVTY2VuZX0gZnJvbSBcIi4vcDVfc2NlbmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWw6IGFueSA9IHt9O1xyXG5nbG9iYWwucDVTY2VuZSA9IG5ldyBQNVNjZW5lKCk7XHJcbmdsb2JhbC5jb25maWcgPSBuZXcgQ29uZmlnKHt9KTtcclxuZ2xvYmFsLnN0ZXBmaWxlID0gbmV3IFN0ZXBmaWxlKCk7XHJcbmdsb2JhbC5hdWRpb0ZpbGUgPSBuZXcgQXVkaW9GaWxlKCk7XHJcbmdsb2JhbC5nbG9iYWxDbGFzcyA9IFwiZ2FtZVwiOyIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dldEtleVN0cmluZywgc2V0Q29uZmlnS2V5QmluZGluZ30gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS2V5QmluZGluZyB7XHJcbiAgICB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAga2V5Q29kZTogbnVtYmVyLFxyXG4gICAgc3RyaW5nOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtleUJpbmRpbmdIZWxwZXIge1xyXG4gICAgcHJpdmF0ZSBiaW5kaW5nc1RvQWNxdWlyZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50QmluZGluZ051bWJlcjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJpbmRpbmdzVG9BY3F1aXJlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlID0gYmluZGluZ3NUb0FjcXVpcmU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmluZGluZ051bWJlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJpbmROZXh0KHA6IHA1KSB7XHJcbiAgICAgICAgbGV0IGtleWJpbmRpbmc6IEtleUJpbmRpbmcgPSB7XHJcbiAgICAgICAgICAgIHRyYWNrTnVtYmVyOiB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyLFxyXG4gICAgICAgICAgICBrZXlDb2RlOiBwLmtleUNvZGUsXHJcbiAgICAgICAgICAgIHN0cmluZzogZ2V0S2V5U3RyaW5nKHApXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXRDb25maWdLZXlCaW5kaW5nKHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIsIHRoaXMuYmluZGluZ3NUb0FjcXVpcmUsIGtleWJpbmRpbmcpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIrKztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIgPj0gdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSkge1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBhY3Rpb25CaW5kaW5nczogTWFwPG51bWJlciwge2tleURvd25BY3Rpb246ICgpID0+IHZvaWQsIGtleVVwQWN0aW9uOiAoKSA9PiB2b2lkfT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocDogcDUpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbkJpbmRpbmdzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgICAgICBwLmtleVByZXNzZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gLTEgaXMgYSBzcGVjaWFsIGtleUNvZGUgZmxhZyB0aGF0IG1lYW5zIFwiYW55XCIuIFRoaXMgaXMgZXNwZWNpYWxseSB1c2VmdWwgZm9yIHNldHRpbmcgdXAga2V5IGJpbmRpbmdzLlxyXG4gICAgICAgICAgICBsZXQgZ2xvYmFsQWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KC0xKTtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbEFjdGlvbnMua2V5RG93bkFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KHAua2V5Q29kZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMua2V5RG93bkFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMua2V5RG93bkFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgcC5rZXlSZWxlYXNlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuYWN0aW9uQmluZGluZ3MuZ2V0KHAua2V5Q29kZSk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLmtleVVwQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmtleVVwQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEtleVRvQWN0aW9uKGtleUNvZGU6IG51bWJlciwga2V5RG93bkFjdGlvbjogKCkgPT4gdm9pZCwga2V5VXBBY3Rpb246ICgpID0+IHZvaWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbkJpbmRpbmdzLnNldChrZXlDb2RlLCB7a2V5RG93bkFjdGlvbjoga2V5RG93bkFjdGlvbiwga2V5VXBBY3Rpb246IGtleVVwQWN0aW9ufSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kS2V5KGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbkJpbmRpbmdzLmRlbGV0ZShrZXlDb2RlKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7aGFuZGxlQWNjdXJhY3lFdmVudH0gZnJvbSBcIi4vaGFuZGxlX2FjY3VyYWN5X2V2ZW50XCI7XHJcbmltcG9ydCB7Z2V0TWlzc0JvdW5kYXJ5fSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge0hvbGRNYW5hZ2VyfSBmcm9tIFwiLi9ob2xkX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWlzc01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBsYXN0Q2hlY2tlZE5vdGVJbmRpY2VzOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcsIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgaG9sZE1hbmFnZXI6IEhvbGRNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5vdGVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzLnB1c2goMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyID0gaG9sZE1hbmFnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyBBIGxvd2VyQm91bmQgZm9yIG1pc3NlcyBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGlzIHdheSBvZiBkb2luZyBtaXNzZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bVRyYWNrcyA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWxsTWlzc2VkTm90ZXNGb3JUcmFjayh0cmFja051bWJlciwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUFsbE1pc3NlZE5vdGVzRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBpbmRleE9mTGFzdENoZWNrZWROb3RlID0gdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhPZkxhc3RDaGVja2VkTm90ZSA+PSB0cmFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm90ZSA9IHRyYWNrW2luZGV4T2ZMYXN0Q2hlY2tlZE5vdGVdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05vdE1pc3NhYmxlKGN1cnJlbnROb3RlKSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSsrO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb3RlTWlzc2VkQW5kTm90SGFuZGxlZChjdXJyZW50Tm90ZSwgY3VycmVudFRpbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1pc3NlZE5vdGUodHJhY2tOdW1iZXIsIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdENoZWNrZWROb3RlSW5kaWNlc1t0cmFja051bWJlcl0gPSBpbmRleE9mTGFzdENoZWNrZWROb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvciBleGFtcGxlOiBub3RlcyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIGhpdCBhcmUgbm90IG1pc3NhYmxlXHJcbiAgICBwcml2YXRlIGlzTm90TWlzc2FibGUobm90ZTogTm90ZSkge1xyXG4gICAgICAgIHJldHVybiBub3RlLnN0YXRlICE9PSBOb3RlU3RhdGUuREVGQVVMVDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTm90ZU1pc3NlZEFuZE5vdEhhbmRsZWQobm90ZTogTm90ZSwgY3VycmVudFRpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBtaXNzQm91bmRhcnkgPSBnZXRNaXNzQm91bmRhcnkoY3VycmVudFRpbWUsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbm90ZS50aW1lSW5TZWNvbmRzIDwgbWlzc0JvdW5kYXJ5ICYmIG5vdGUuc3RhdGUgPT09IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlTWlzc2VkTm90ZSh0cmFja051bWJlcjogbnVtYmVyLCBpbmRleE9mTWlzc2VkTm90ZTogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCBtaXNzZWROb3RlID0gdHJhY2tbaW5kZXhPZk1pc3NlZE5vdGVdO1xyXG4gICAgICAgIGhhbmRsZUFjY3VyYWN5RXZlbnQodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5uYW1lLCB0cmFja051bWJlciwgLUluZmluaXR5LCBjdXJyZW50VGltZSwgbWlzc2VkTm90ZS50eXBlLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nKTtcclxuICAgICAgICBtaXNzZWROb3RlLnN0YXRlID0gTm90ZVN0YXRlLk1JU1NFRDtcclxuICAgICAgICBpZiAobWlzc2VkTm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRNYW5hZ2VyLmlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkTWFuYWdlci51bmhvbGRUcmFjayh0cmFja051bWJlcikgLy8gRm9yY2UgYSBob2xkIHJlbGVhc2UgdXBvbiBtaXNzaW5nIHRoZSB0YWlsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYobWlzc2VkTm90ZS50eXBlID09PSBOb3RlVHlwZS5IT0xEX0hFQUQpIHtcclxuICAgICAgICAgICAgbGV0IG5leHROb3RlID0gdHJhY2tbaW5kZXhPZk1pc3NlZE5vdGUgKyAxXTtcclxuICAgICAgICAgICAgaWYgKG5leHROb3RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Tm90ZS50eXBlID09PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dE5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuTUlTU0VEOyAvLyBNaXNzIHRoZSB0YWlsIHdoZW4geW91IG1pc3MgdGhlIGhlYWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGVNYW5hZ2VyIHtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgICAgIHRoaXMudHJhY2tzID0gdHJhY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGVzQnlUaW1lUmFuZ2UobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyKTogeyBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXIgfSB7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCBmaXJzdEZpbmRSZXN1bHQgPSB0aGlzLmZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGxlYXN0VGltZSwgdHJhY2spO1xyXG4gICAgICAgIGlmIChmaXJzdEZpbmRSZXN1bHQgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogLTEsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiAtMX07IC8vIG5vIG5vdGVzIGxlZnQgYWZ0ZXIgbGVhc3QgdGltZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGFzdEZpbmRSZXN1bHQgPSB0aGlzLmZpbmRJbmRleE9mRmlyc3ROb3RlQWZ0ZXJUaW1lKGdyZWF0ZXN0VGltZSwgdHJhY2ssIGZpcnN0RmluZFJlc3VsdCk7XHJcbiAgICAgICAgaWYgKGxhc3RGaW5kUmVzdWx0IDwgMCkge1xyXG4gICAgICAgICAgICBsYXN0RmluZFJlc3VsdCA9IHRyYWNrLmxlbmd0aDsgLy8gZ3JlYXRlc3RUaW1lIGV4Y2VlZHMgdGhlIGVuZCBvZiB0aGUgbm90ZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpcnN0RmluZFJlc3VsdCA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAobGFzdEZpbmRSZXN1bHQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogLTEsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiAtMX07IC8vIGhhdmVuJ3Qgc2VlbiBmaXJzdCBub3RlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IDAsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBsYXN0RmluZFJlc3VsdH07IC8vIG5vdGVzIGFyZSBqdXN0IHN0YXJ0aW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiBmaXJzdEZpbmRSZXN1bHQsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBsYXN0RmluZFJlc3VsdH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgbm8gdHdvIG5vdGVzIHdpbGwgaGF2ZSB0aGUgc2FtZSB0aW1lIGluIHRoZSBzYW1lIHRyYWNrXHJcbiAgICBmaW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShrZXlUaW1lOiBudW1iZXIsIHRyYWNrOiBOb3RlW10sIHNlYXJjaFN0YXJ0ID0gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzZWFyY2hTdGFydDsgaSA8IHRyYWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFja1tpXS50aW1lSW5TZWNvbmRzID4ga2V5VGltZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVhcmxpZXN0Tm90ZSgpOiBOb3RlIHtcclxuICAgICAgICBsZXQgZWFybGllc3ROb3RlOiBOb3RlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tzW2ldLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFja0VhcmxpZXN0Tm90ZTogTm90ZSA9IHRoaXMudHJhY2tzW2ldWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVhcmxpZXN0Tm90ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXJsaWVzdE5vdGUgPSB0cmFja0VhcmxpZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWFybGllc3ROb3RlLnRpbWVJblNlY29uZHMgPiB0cmFja0VhcmxpZXN0Tm90ZS50aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFybGllc3ROb3RlID0gdHJhY2tFYXJsaWVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVhcmxpZXN0Tm90ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXRlc3ROb3RlKCk6IE5vdGUge1xyXG4gICAgICAgIGxldCBsYXRlc3ROb3RlOiBOb3RlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tzW2ldLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFja0xhdGVzdE5vdGU6IE5vdGUgPSB0aGlzLnRyYWNrc1tpXVt0aGlzLnRyYWNrc1tpXS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXRlc3ROb3RlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGUgPSB0cmFja0xhdGVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhdGVzdE5vdGUudGltZUluU2Vjb25kcyA8IHRyYWNrTGF0ZXN0Tm90ZS50aW1lSW5TZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Tm90ZSA9IHRyYWNrTGF0ZXN0Tm90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGF0ZXN0Tm90ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3RhbE5vdGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrcy5yZWR1Y2UoKHN1bSwgdHJhY2spID0+IHN1bSArIHRyYWNrLmxlbmd0aCwgMCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Tm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RlU2tpbiB7XHJcbiAgICBwdWJsaWMgbm90ZTogcDUuSW1hZ2U7XHJcbiAgICBwdWJsaWMgY29ubmVjdG9yVGlsZTogcDUuSW1hZ2U7XHJcbiAgICBwdWJsaWMgcmVjZXB0b3I6IHA1LkltYWdlO1xyXG5cclxuICAgIC8qIFJlcXVpcmVzIHRoYXQgdGhlIHRhaWwgYmUgaGFsZiB0aGUgaGVpZ2h0IGFuZCBzYW1lIHdpZHRoIGFzIG5vdGUgaW1hZ2UgKi9cclxuICAgIHB1YmxpYyB0YWlsOiBwNS5JbWFnZTtcclxuXHJcbiAgICBwcml2YXRlIHJvdGF0aW9uQW5nbGVzOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4gPSBuZXcgTWFwKFtcclxuICAgICAgICBbNCwgWzI3MCwgMTgwLCAwLCA5MF1dLFxyXG4gICAgICAgIFs2LCBbMjcwLCAzMTUsIDE4MCwgMCwgNDUsIDkwXV1cclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vdGU6IHA1LkltYWdlLCBjb25uZWN0b3I6IHA1LkltYWdlLCB0YWlsOiBwNS5JbWFnZSwgcmVjZXB0b3I6IHA1LkltYWdlKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlID0gbm90ZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclRpbGUgPSBjb25uZWN0b3I7XHJcbiAgICAgICAgdGhpcy50YWlsID0gdGFpbDtcclxuICAgICAgICB0aGlzLnJlY2VwdG9yID0gcmVjZXB0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwdWJsaWMgZHJhd05vdGUodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKG5vdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLkhPTERfSEVBRDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ltYWdlUm90YXRlZCh0aGlzLm5vdGUsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RhaWwodHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwdWJsaWMgZHJhd1JlY2VwdG9yKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZHJhd0ltYWdlUm90YXRlZCh0aGlzLnJlY2VwdG9yLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgYWJsZSB0byBkcmF3IG5vdGUgdHlwZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcclxuICAgIHByaXZhdGUgZHJhd0hvbGRDb25uZWN0b3IoY2VudGVyWDogbnVtYmVyLCBkcmF3U3RhcnRZOiBudW1iZXIsIGRyYXdFbmRZOiBudW1iZXIsIG5vdGVTdGFydFk6IG51bWJlciwgbm90ZUVuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHNvdXJjZVdpZHRoID0gdGhpcy5jb25uZWN0b3JUaWxlLndpZHRoO1xyXG4gICAgICAgIGxldCBzb3VyY2VIZWlnaHQgPSB0aGlzLmNvbm5lY3RvclRpbGUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY2FsZWRXaWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBzY2FsZWRIZWlnaHQgPSBzY2FsZWRXaWR0aCAvIHNvdXJjZVdpZHRoICogc291cmNlSGVpZ2h0O1xyXG4gICAgICAgIGxldCBjb25uZWN0b3JIZWlnaHQgPSBNYXRoLmFicyhkcmF3RW5kWSAtIGRyYXdTdGFydFkpO1xyXG4gICAgICAgIGxldCBlbmRZT2Zmc2V0ID0gdGhpcy5nZXROb3RlRW5kT2Zmc2V0KG5vdGVFbmRZLCBkcmF3RW5kWSk7XHJcblxyXG4gICAgICAgIGxldCBlbmRQYXJ0aWFsVGlsZUhlaWdodCA9IHNjYWxlZEhlaWdodCAtIChlbmRZT2Zmc2V0ICUgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICBlbmRQYXJ0aWFsVGlsZUhlaWdodCA9IE1hdGgubWluKGVuZFBhcnRpYWxUaWxlSGVpZ2h0LCBjb25uZWN0b3JIZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnRQYXJ0aWFsVGlsZUhlaWdodCA9IChjb25uZWN0b3JIZWlnaHQgLSBlbmRQYXJ0aWFsVGlsZUhlaWdodCkgJSBzY2FsZWRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IG51bUNvbXBsZXRlVGlsZXMgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAoY29ubmVjdG9ySGVpZ2h0IC0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodCAtIGVuZFBhcnRpYWxUaWxlSGVpZ2h0KSAvIHNjYWxlZEhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYmxvY2sgYWxsb3dzIHVzIHRvIHVzZSB0aGUgc2FtZSBkcmF3aW5nIG1ldGhvZCBmb3IgYm90aCB1cHNjcm9sbCBhbmQgZG93bnNjcm9sbFxyXG4gICAgICAgIGxldCBib3R0b21QYXJ0aWFsVGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0b3BQYXJ0aWFsVGlsZUhlaWdodDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0ID0gZW5kUGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0ID0gc3RhcnRQYXJ0aWFsVGlsZUhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCA9IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0ID0gZW5kUGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkcmF3TWluWSA9IE1hdGgubWluKGRyYXdTdGFydFksIGRyYXdFbmRZKTtcclxuICAgICAgICBsZXQgZHJhd01heFkgPSBNYXRoLm1heChkcmF3U3RhcnRZLCBkcmF3RW5kWSk7XHJcbiAgICAgICAgbGV0IGlzUmV2ZXJzZWQgPSBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgIGxldCBpc0RyYXduRnJvbUJvdHRvbSA9IGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXA7XHJcbiAgICAgICAgaWYgKGVuZFBhcnRpYWxUaWxlSGVpZ2h0ID09PSBjb25uZWN0b3JIZWlnaHQpIHtcclxuICAgICAgICAgICAgaXNEcmF3bkZyb21Cb3R0b20gPSAhaXNEcmF3bkZyb21Cb3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYLCBkcmF3TWluWSwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCxcclxuICAgICAgICAgICAgdG9wUGFydGlhbFRpbGVIZWlnaHQgLyBzY2FsZWRIZWlnaHQsICFpc0RyYXduRnJvbUJvdHRvbSwgaXNSZXZlcnNlZCwgcCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Q29tcGxldGVUaWxlcyhjZW50ZXJYLCBkcmF3TWluWSArIHRvcFBhcnRpYWxUaWxlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LFxyXG4gICAgICAgICAgICBudW1Db21wbGV0ZVRpbGVzLCBpc1JldmVyc2VkLCBwKTtcclxuICAgICAgICB0aGlzLmRyYXdQYXJ0aWFsVGlsZShjZW50ZXJYLCBkcmF3TWF4WSAtIGJvdHRvbVBhcnRpYWxUaWxlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LFxyXG4gICAgICAgICAgICBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCAvIHNjYWxlZEhlaWdodCwgaXNEcmF3bkZyb21Cb3R0b20sXHJcbiAgICAgICAgICAgIGlzUmV2ZXJzZWQsIHApO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd1RhaWwodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy50YWlsLCAtbm90ZVNpemUgLyAyLCAtbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUgLyAyKTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMudGFpbCwgY2VudGVyWCAtIG5vdGVTaXplIC8gMiwgY2VudGVyWSAtIG5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplIC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Tm90ZUVuZE9mZnNldChub3RlRW5kWTogbnVtYmVyLCBkcmF3RW5kWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyO1xyXG4gICAgICAgIGlmIChnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IG5vdGVFbmRZIC0gZHJhd0VuZFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gZHJhd0VuZFkgLSBub3RlRW5kWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgdGhlIHBhcnRpYWwgdGlsZSB0ZXh0dXJlIGZyb20gc3RyZXRjaGluZyB3aGVuIHRoZSBwbGF5ZXIgaGl0cyBhIGhvbGQgZWFybHlcclxuICAgICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCBvZmZzZXQpO1xyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0NvbXBsZXRlVGlsZXMoY2VudGVyWDogbnVtYmVyLCBsZWFzdFk6IG51bWJlciwgc2NhbGVkV2lkdGg6IG51bWJlciwgc2NhbGVkSGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRpbGVzOiBudW1iZXIsIGlzUmV2ZXJzZWQ6IGJvb2xlYW4sIHA6IHA1KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UaWxlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IGxlYXN0WSArIGkgKiBzY2FsZWRIZWlnaHQgKyBzY2FsZWRIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgaWYgKGlzUmV2ZXJzZWQpIHtcclxuICAgICAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1zY2FsZWRIZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0KTtcclxuICAgICAgICAgICAgcC5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UGFydGlhbFRpbGUoY2VudGVyWDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCBzY2FsZWRXaWR0aDogbnVtYmVyLCBzY2FsZWRIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVdpZHRoOiBudW1iZXIsIHNvdXJjZUhlaWdodDogbnVtYmVyLCBoZWlnaHRQZXJjZW50OiBudW1iZXIsIGlzRHJhd25Gcm9tQm90dG9tOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JldmVyc2VkOiBib29sZWFuLCBwOiBwNSkge1xyXG4gICAgICAgIGlmIChoZWlnaHRQZXJjZW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uSGVpZ2h0ID0gaGVpZ2h0UGVyY2VudCAqIHNjYWxlZEhlaWdodDtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHRvcExlZnRZICsgZGVzdGluYXRpb25IZWlnaHQgLyAyO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIGlmIChpc1JldmVyc2VkKSB7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIHAucm90YXRlKDE4MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0RyYXduRnJvbUJvdHRvbSkgeyAvLyBEcmF3IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLmNvbm5lY3RvclRpbGUsIC1zY2FsZWRXaWR0aCAvIDIsIC1kZXN0aW5hdGlvbkhlaWdodCAvIDIsIHNjYWxlZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25IZWlnaHQsIDAsIHNvdXJjZUhlaWdodCAtIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gRHJhdyBmcm9tIHRoZSB0b3Agb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtZGVzdGluYXRpb25IZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSGVpZ2h0LCAwLCAwLCBzb3VyY2VXaWR0aCwgaGVpZ2h0UGVyY2VudCAqIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3SW1hZ2VSb3RhdGVkKGltYWdlOiBwNS5JbWFnZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIHRoaXMucm90YXRlKHAsIHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgICAgIHAuaW1hZ2UoaW1hZ2UsIC1ub3RlU2l6ZSAvIDIsIC1ub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJvdGF0ZShwOiBwNSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFuZ2xlcy5oYXMobnVtVHJhY2tzKSkge1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSh0aGlzLnJvdGF0aW9uQW5nbGVzLmdldChudW1UcmFja3MpW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC5yb3RhdGUodGhpcy5nZXREZWZhdWx0Um90YXRpb25BbmdsZUluRGVncmVlcyh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdFJvdGF0aW9uQW5nbGVJbkRlZ3JlZXModHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcm90YXRpb24gPSAtOTA7XHJcbiAgICAgICAgbGV0IHJvdGF0aW9uUGVyVHJhY2sgPSAzNjAgLyBudW1UcmFja3M7XHJcbiAgICAgICAgaWYgKHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzIC8gMikge1xyXG4gICAgICAgICAgICByb3RhdGlvbiAtPSB0cmFja051bWJlciAqIHJvdGF0aW9uUGVyVHJhY2s7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm90YXRpb24gKz0gKHRyYWNrTnVtYmVyIC0gbnVtVHJhY2tzIC8gMiArIDEpICogcm90YXRpb25QZXJUcmFjaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdGF0aW9uO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7S2V5Ym9hcmRFdmVudE1hbmFnZXJ9IGZyb20gXCIuL2tleWJvYXJkX2V2ZW50X21hbmFnZXJcIjtcclxuaW1wb3J0IHtQcmV2aWV3RGlzcGxheX0gZnJvbSBcIi4vcHJldmlld19kaXNwbGF5XCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXJ9IGZyb20gXCIuL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtnZW5lcmF0ZVByZXZpZXdOb3Rlc30gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge05vdGVTa2lufSBmcm9tIFwiLi9ub3RlX3NraW5cIjtcclxuXHJcbmxldCB3aWR0aCA9IDcyMDtcclxubGV0IGhlaWdodCA9IDQ4MDtcclxuXHJcbmV4cG9ydCBjbGFzcyBQNVNjZW5lIHtcclxuICAgIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gbmV3IHA1KChwOiBwNSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVuZGVyZXI6IHA1LlJlbmRlcmVyO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2VudGVyQ2FudmFzKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVuZGVyZXIuY2VudGVyKCk7IC8vIERpc2FibGUgdGhpcyBmb3Igbm93IHRvIG1ha2UgZW1iZWRkaW5nIHdvcmtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcC5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLm5vdGVTa2luID0gbmV3IE5vdGVTa2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL2Fycm93X2JsdWVfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9jb25uZWN0b3JfdGlsZV9yZXNpemUucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3RhaWxfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19yZWNlcHRvci5wbmdcIilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCA9IHAubG9hZEltYWdlKFwiLi4vYXNzZXRzL3BsYXlfZnJvbV9maWxlX2JhY2tncm91bmQuanBnXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kID0gZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlciA9IHAuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlciA9IG5ldyBLZXlib2FyZEV2ZW50TWFuYWdlcihwKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyg0KSwgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTsgLy8gTWFrZXMgdGhlIGNhbnZhcyBiZSBhYmxlIHRvIGZpbGwgdGhlIHdob2xlIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHAuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLmRyYXcoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHAud2luZG93UmVzaXplZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlckNhbnZhcygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGxheUZyb21GaWxlfSBmcm9tIFwiLi9wYWdlcy9wbGF5X2Zyb21fZmlsZVwiO1xyXG5pbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL3BhZ2VzL29wdGlvbnNcIjtcclxuaW1wb3J0IHtQbGF5fSBmcm9tIFwiLi9wYWdlcy9wbGF5XCI7XHJcbmltcG9ydCB7UmVzdWx0c30gZnJvbSBcIi4vcGFnZXMvcmVzdWx0c1wiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgZW51bSBQQUdFUyB7XHJcbiAgICBQTEFZX0ZST01fRklMRSxcclxuICAgIE9QVElPTlMsXHJcbiAgICBQTEFZLFxyXG4gICAgUkVTVUxUUyxcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbnRTY2VuZTogUEFHRVMgPSBQQUdFUy5QTEFZX0ZST01fRklMRTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEN1cnJlbnRTY2VuZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRDdXJyZW50U2NlbmUoc2NlbmU6IFBBR0VTKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSBzY2VuZTtcclxuICAgICAgICBET01XcmFwcGVyLmNsZWFyUmVnaXN0cnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRTY2VuZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVlfRlJPTV9GSUxFOlxyXG4gICAgICAgICAgICAgICAgUGxheUZyb21GaWxlLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLk9QVElPTlM6XHJcbiAgICAgICAgICAgICAgICBPcHRpb25zLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlBMQVk6XHJcbiAgICAgICAgICAgICAgICBQbGF5LmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBBR0VTLlJFU1VMVFM6XHJcbiAgICAgICAgICAgICAgICBSZXN1bHRzLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBzY2VuZTogXCIgKyBnbG9iYWwuY3VycmVudFNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ0hlbHBlcn0gZnJvbSBcIi4uL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgY3JlYXRlS2V5QmluZGluZ0lucHV0LCBjcmVhdGVMYWJlbGVkSW5wdXQsIGNyZWF0ZUxhYmVsZWRTZWxlY3QsIGNyZWF0ZUxhYmVsZWRUZXh0QXJlYSxcclxuICAgIGRyYXdIZWFkaW5nXHJcbn0gZnJvbSBcIi4uL3VpX3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge1xyXG4gICAgZ2VuZXJhdGVQcmV2aWV3Tm90ZXMsXHJcbiAgICBnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQsXHJcbiAgICBpbml0aWFsaXplS2V5QmluZGluZ3MsXHJcbiAgICBpc0tleUJpbmRpbmdzRGVmaW5lZFxyXG59IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuLi9wcmV2aWV3X2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPcHRpb25zIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgT1BUSU9OU19DTEFTUzogc3RyaW5nID0gXCJvcHRpb25zXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChnbG9iYWwub3B0aW9uc0JhY2tncm91bmQpO1xyXG4gICAgICAgIGRyYXdIZWFkaW5nKCk7XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxEaXYgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIH0sIFwic2Nyb2xsRGl2XCIpO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGl2LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuYWRkQ2xhc3MoXCJvcHRpb25zLXNjcm9sbC1kaXZcIik7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBsZXQgY2FudmFzUG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSA9IHAuX3JlbmRlcmVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQucG9zaXRpb24oY2FudmFzUG9zaXRpb24ueCArIDMzNSwgY2FudmFzUG9zaXRpb24ueSArIDQ1KTtcclxuXHJcbiAgICAgICAgbGV0IHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiUGF1c2UgYXQgU3RhcnQgKHNlYylcIiwgXCJwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcy50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMocGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkgJiYgdmFsdWUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxTcGVlZElucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiU2Nyb2xsIFNwZWVkIChweC9zZWMpXCIsIFwic2Nyb2xsU3BlZWRJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnBpeGVsc1BlclNlY29uZC50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoc2Nyb2xsU3BlZWRJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHNjcm9sbFNwZWVkSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpICYmIHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5waXhlbHNQZXJTZWNvbmQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsU3BlZWRJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHNjcm9sbFNwZWVkSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsRGlyZWN0aW9uU2VsZWN0ID0gY3JlYXRlTGFiZWxlZFNlbGVjdChcIlNjcm9sbCBEaXJlY3Rpb25cIiwgXCJzY3JvbGxEaXJlY3Rpb25TZWxlY3RcIixcclxuICAgICAgICAgICAgU2Nyb2xsRGlyZWN0aW9uLCBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHNjcm9sbERpcmVjdGlvblNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IFN0cmluZyhzY3JvbGxEaXJlY3Rpb25TZWxlY3QuZWxlbWVudC52YWx1ZSgpKTtcclxuICAgICAgICAgICAgbGV0IGVudW1PZlZhbHVlID0gU2Nyb2xsRGlyZWN0aW9uW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBTY3JvbGxEaXJlY3Rpb25dO1xyXG4gICAgICAgICAgICBpZiAoZW51bU9mVmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPSBlbnVtT2ZWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY2VwdG9yUG9zaXRpb25JbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlJlY2VwdG9yIFBvc2l0aW9uICglKVwiLCBcInJlY2VwdG9yUG9zaXRpb25JbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHJlY2VwdG9yUG9zaXRpb25JbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHJlY2VwdG9yUG9zaXRpb25JbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucmVjZXB0b3JZUGVyY2VudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFyZWNlcHRvclBvc2l0aW9uSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChyZWNlcHRvclBvc2l0aW9uSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0ID0gY3JlYXRlTGFiZWxlZElucHV0KFwiQWNjdXJhY3kgT2Zmc2V0IChtcylcIiwgXCJhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMgPSB2YWx1ZSAvIDEwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhY2N1cmFjeVNldHRpbmdzSW5wdXQgPSBjcmVhdGVMYWJlbGVkVGV4dEFyZWEoXCJBY2N1cmFjeSBTZXR0aW5nc1wiLCBcImFjY3VyYWN5U2V0dGluZ3NJbnB1dFwiLFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShnbG9iYWwuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MsIG51bGwsIDMpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoYWNjdXJhY3lTZXR0aW5nc0lucHV0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gYWNjdXJhY3lTZXR0aW5nc0lucHV0LmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0FjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W10gPSBwYXJzZUFjY3VyYWN5U2V0dGluZ3NKc29uKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdBY2N1cmFjeVNldHRpbmdzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzID0gbmV3QWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKCFhY2N1cmFjeVNldHRpbmdzSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChhY2N1cmFjeVNldHRpbmdzSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyID0gY3JlYXRlS2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyKCk7XHJcbiAgICAgICAgaWYgKCFrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChrZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIuZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzID0gNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByZXZpZXdOdW1UcmFja3MgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJOdW1iZXIgb2YgVHJhY2tzXCIsIFwicHJldmlld051bVRyYWNrc0lucHV0XCIsXHJcbiAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzLnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMocHJldmlld051bVRyYWNrcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IHByZXZpZXdOdW1UcmFja3MuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgJiYgdmFsdWUgPiAwICYmIHZhbHVlIDw9IDI2KSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVPbGRCaW5kaW5nQnV0dG9ucyhnbG9iYWwucHJldmlld051bVRyYWNrcyk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucHJldmlld051bVRyYWNrcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLnByZXZpZXdEaXNwbGF5ID0gbmV3IFByZXZpZXdEaXNwbGF5KGdlbmVyYXRlUHJldmlld05vdGVzKHZhbHVlKSwgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFwcmV2aWV3TnVtVHJhY2tzLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQocHJldmlld051bVRyYWNrcy5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIktleUJpbmRpbmdzIFF1aWNrc3RhcnRcIik7XHJcbiAgICAgICAgfSwgXCJrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b25cIik7XHJcbiAgICAgICAgaWYgKCFrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhcImtleWJpbmRpbmdzLXF1aWNrc3RhcnRcIik7XHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG5cclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXliaW5kaW5nSGVscGVyID0gbmV3IEtleUJpbmRpbmdIZWxwZXIoZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJpbmQgdGhpcyBhY3Rpb24gdG8gdGhlIFwiLTFcIiBrZXkgc28gdGhhdCBpdCBoYXBwZW5zIG9uIGFueSBrZXkgcHJlc3NcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oLTEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBrZXliaW5kaW5nSGVscGVyLmJpbmROZXh0KHApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0tleUJpbmRpbmdzRGVmaW5lZChnbG9iYWwucHJldmlld051bVRyYWNrcykpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nSW5wdXQgPSBjcmVhdGVLZXlCaW5kaW5nSW5wdXQodHJhY2tOdW1iZXIsIGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBpZiAoIWtleUJpbmRpbmdJbnB1dC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChrZXlCaW5kaW5nSW5wdXQuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmh0bWwoXHJcbiAgICAgICAgICAgICdLZXkgQmluZGluZ3MgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTJweFwiPih0cmFjayAxIGlzIHRoZSBsZWZ0bW9zdCB0cmFjayk8L3NwYW4+J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwib3B0aW9ucy1mcmVlLXRleHRcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIFwia2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyXCIpO1xyXG5cclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoaW5wdXRFbGVtZW50OiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSwgb25JbnB1dDogKCkgPT4gdm9pZCkge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpbnB1dEVsZW1lbnQuZWxlbWVudC5pbnB1dChvbklucHV0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlT2xkQmluZGluZ0J1dHRvbnMobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBudW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKGdldEtleUJpbmRpbmdDb250YWluZXJJZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQWNjdXJhY3lTZXR0aW5nc0pzb24oYWNjdXJhY3lTZXR0aW5nc0pzb246IHN0cmluZyk6IEFjY3VyYWN5W10ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSA9IFtdXHJcbiAgICAgICAgbGV0IGpzb25BcnJheTogQWNjdXJhY3lbXSA9IEpTT04ucGFyc2UoYWNjdXJhY3lTZXR0aW5nc0pzb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2N1cmFjeSA9IGpzb25BcnJheVtpXTtcclxuICAgICAgICAgICAgLy8gdGhpcyBmYWlscyBpZiB0aGUgdXNlciBnYXZlIHRoZSB3cm9uZyBpbnB1dFxyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzLnB1c2gobmV3IEFjY3VyYWN5KGFjY3VyYWN5Lm5hbWUsIGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxheSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXcoKSB7XHJcbiAgICAgICAgZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2UuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG4gICAgICAgIGdsb2JhbC5wbGF5aW5nRGlzcGxheS5kcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7ZHJhd0hlYWRpbmcsIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlLCBjcmVhdGVGaWxlSW5wdXR9IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtTdGVwZmlsZVN0YXRlfSBmcm9tIFwiLi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGVTdGF0ZX0gZnJvbSBcIi4uL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXl9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7UGxheWluZ0Rpc3BsYXl9IGZyb20gXCIuLi9wbGF5aW5nX2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtNb2RlLCBOb3RlfSBmcm9tIFwiLi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4uL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsYXlGcm9tRmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBMQVlfRlJPTV9GSUxFX0NMQVNTOiBzdHJpbmcgPSBcInBsYXktZnJvbS1maWxlXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGRyYXdIZWFkaW5nKCk7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgcC5iYWNrZ3JvdW5kKGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kKTtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXBmaWxlSW5wdXQgPSBjcmVhdGVGaWxlSW5wdXQoZ2V0U3RlcGZpbGVJbnB1dExhYmVsKCksIFwiQ2hvb3NlIFN0ZXBmaWxlICguc20pXCIsIFwic3RlcGZpbGVJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuc3RlcGZpbGUubG9hZC5iaW5kKGdsb2JhbC5zdGVwZmlsZSksIFBsYXlGcm9tRmlsZS5QTEFZX0ZST01fRklMRV9DTEFTUykuZWxlbWVudDtcclxuICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShzdGVwZmlsZUlucHV0LCAwLjQzLCAwLjMsIDM0NCwgMzQpO1xyXG5cclxuICAgICAgICBsZXQgYXVkaW9GaWxlSW5wdXQgPSBjcmVhdGVGaWxlSW5wdXQoZ2V0QXVkaW9GaWxlSW5wdXRMYWJlbCgpLCBcIkNob29zZSBBdWRpbyBGaWxlICgubXAzKVwiLCBcImF1ZGlvRmlsZUlucHV0XCIsXHJcbiAgICAgICAgICAgIGdsb2JhbC5hdWRpb0ZpbGUubG9hZC5iaW5kKGdsb2JhbC5hdWRpb0ZpbGUpLCBQbGF5RnJvbUZpbGUuUExBWV9GUk9NX0ZJTEVfQ0xBU1MpLmVsZW1lbnQ7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoYXVkaW9GaWxlSW5wdXQsIDAuNDMsIDAuNDUsIDM2OCwgMzQpO1xyXG5cclxuICAgICAgICBsZXQgcGxheUJ1dHRvbklkID0gXCJwbGF5QnV0dG9uXCI7XHJcbiAgICAgICAgbGV0IG1vZGVSYWRpb0lkID0gXCJtb2RlUmFkaW9cIjtcclxuICAgICAgICBpZiAoaXNGaWxlc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgbGV0IG1vZGVSYWRpbyA9IGRyYXdNb2RlU2VsZWN0KHAsIG1vZGVSYWRpb0lkKTtcclxuICAgICAgICAgICAgaWYgKG1vZGVSYWRpby52YWx1ZSgpICE9PSBcIlwiKSB7IC8vIHVzZXIgaGFzIHNlbGVjdGVkIGEgbW9kZVxyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXlCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheVwiKTtcclxuICAgICAgICAgICAgICAgIH0sIHBsYXlCdXR0b25JZCk7XHJcbiAgICAgICAgICAgICAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShwbGF5QnV0dG9uLmVsZW1lbnQsIDAuNSwgMC44OCwgNjAsIDM0KTtcclxuICAgICAgICAgICAgICAgIGlmICghcGxheUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZE1vZGU6IE1vZGUgPSBnZXRTZWxlY3RlZE1vZGUobW9kZVJhZGlvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLnN0ZXBmaWxlLmZpbmlzaFBhcnNpbmcoc2VsZWN0ZWRNb2RlLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFBsYXlpbmdEaXNwbGF5KGdsb2JhbC5zdGVwZmlsZS5mdWxsUGFyc2UudHJhY2tzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFNjZW5lKFBBR0VTLlBMQVkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChtb2RlUmFkaW9JZCk7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheUJ1dHRvbklkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZGlzY291cnNlLnByb2Nlc3Npbmcub3JnL3QvaG93LXRvLW9yZ2FuaXplLXJhZGlvLWJ1dHRvbnMtaW4tc2VwYXJhdGUtbGluZXMvMTAwNDEvNVxyXG5mdW5jdGlvbiBlbmNsb3NlRWFjaElucHV0TGFiZWxQYWlySW50b0FTdWJEaXYocDogcDUsIHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50KSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBpbnB1dHMgPSBwLnNlbGVjdEFsbCgnaW5wdXQnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBsYWJlbHMgPSBwLnNlbGVjdEFsbCgnbGFiZWwnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBjb25zdCBsZW4gPSBpbnB1dHMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICBwLmNyZWF0ZURpdigpLnBhcmVudChyYWRpb0RpdlA1RWxlbWVudCkuY2hpbGQoaW5wdXRzW2ldKS5jaGlsZChsYWJlbHNbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL2Rpc2NvdXJzZS5wcm9jZXNzaW5nLm9yZy90L2hvdy10by1vcmdhbml6ZS1yYWRpby1idXR0b25zLWluLXNlcGFyYXRlLWxpbmVzLzEwMDQxLzVcclxuZnVuY3Rpb24gZml4UmFkaW9EaXZFbGVtZW50KHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50KSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByYWRpb0RpdlA1RWxlbWVudC5fZ2V0SW5wdXRDaGlsZHJlbkFycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3R5bGVNb2RlT3B0aW9ucyhwOiBwNSwgcmFkaW9EaXZQNUVsZW1lbnQ6IHA1LkVsZW1lbnQsIHN0eWxlQ2xhc3Nlczogc3RyaW5nW10pIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGxldCBkaXZzOiBwNS5FbGVtZW50W10gPSBwLnNlbGVjdEFsbCgnZGl2JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRpdnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkaXZzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgbGV0IGlucHV0czogcDUuRWxlbWVudFtdID0gcC5zZWxlY3RBbGwoJ2lucHV0JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlucHV0c1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGxldCBsYWJlbHM6IHA1LkVsZW1lbnRbXSAgPSBwLnNlbGVjdEFsbCgnbGFiZWwnLCByYWRpb0RpdlA1RWxlbWVudCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGFiZWxzW2ldLmFkZENsYXNzKHN0eWxlQ2xhc3Nlcy5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdNb2RlU2VsZWN0KHA6IHA1LCB1bmlxdWVJZDogc3RyaW5nKTogcDUuRWxlbWVudCB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIGlmIChnbG9iYWwucGFnZTFNb2RlT3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZ2xvYmFsLnBhZ2UxTW9kZU9wdGlvbnMgPSBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkoZ2xvYmFsLnN0ZXBmaWxlLnBhcnRpYWxQYXJzZS5tb2Rlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1vZGVSYWRpb0NsYXNzID0gXCJtb2RlLXJhZGlvXCJcclxuICAgIGxldCBtb2RlUmFkaW9PcHRpb25DbGFzcyA9IFwibW9kZS1yYWRpby1vcHRpb25cIjtcclxuICAgIGxldCBtb2RlUmFkaW9DcmVhdGVSZXN1bHQgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlUmFkaW8oKTtcclxuICAgIH0sIHVuaXF1ZUlkKTtcclxuICAgIGxldCBtb2RlUmFkaW8gPSBtb2RlUmFkaW9DcmVhdGVSZXN1bHQuZWxlbWVudDtcclxuICAgIGlmICghbW9kZVJhZGlvQ3JlYXRlUmVzdWx0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdsb2JhbC5wYWdlMU1vZGVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlID0gZ2xvYmFsLnBhZ2UxTW9kZU9wdGlvbnNbaV07XHJcbiAgICAgICAgICAgIGxldCByYWRpb0xhYmVsID0gbW9kZS50eXBlICsgXCIsIFwiICsgbW9kZS5kaWZmaWN1bHR5ICsgXCIsIFwiICsgbW9kZS5tZXRlcjtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBsZXQgcmFkaW9PcHRpb24gPSBtb2RlUmFkaW8ub3B0aW9uKHJhZGlvTGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0dGluZyB0aGUgdmFsdWUgdGhpcyB3YXkgYmVjYXVzZSB0aGUgdHdvLWFyZ3VtZW50IC5vcHRpb24gbWV0aG9kIHdhc24ndCB3b3JraW5nXHJcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHZhbHVlIGlzIG5lY2Vzc2FyeSBzbyB3ZSBjYW4gYWNjZXNzIHRoZSBzZWxlY3RlZCBtb2RlXHJcbiAgICAgICAgICAgIHJhZGlvT3B0aW9uLnZhbHVlID0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgc3R5bGUgaXMgYmVpbmcgc2V0IG9uIHRoZSBkaXYgY29udGFpbmluZyB0aGUgcmFkaW8gZWxlbWVudHMgdG8gbWFrZSBpdCBhIHNjcm9sbGFibGUgYm94XHJcbiAgICAgICAgbW9kZVJhZGlvLmFkZENsYXNzKG1vZGVSYWRpb0NsYXNzKTtcclxuICAgICAgICBtb2RlUmFkaW8uYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2KHAsIG1vZGVSYWRpbyk7XHJcbiAgICAgICAgZml4UmFkaW9EaXZFbGVtZW50KG1vZGVSYWRpbyk7XHJcbiAgICAgICAgc3R5bGVNb2RlT3B0aW9ucyhwLCBtb2RlUmFkaW8sIFttb2RlUmFkaW9PcHRpb25DbGFzcywgZ2xvYmFsLmdsb2JhbENsYXNzXSk7XHJcbiAgICB9XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShtb2RlUmFkaW8sIDAuNSwgMC43LCAzMDIsIDEyMCk7XHJcbiAgICBwLnBvcCgpO1xyXG4gICAgcmV0dXJuIG1vZGVSYWRpbztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNGaWxlc1JlYWR5KCkge1xyXG4gICAgbGV0IHN0ZXBmaWxlUmVhZHkgPSBnbG9iYWwuc3RlcGZpbGUuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRCB8fFxyXG4gICAgICAgIGdsb2JhbC5zdGVwZmlsZS5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ7XHJcbiAgICBsZXQgYXVkaW9GaWxlUmVhZHkgPSBnbG9iYWwuYXVkaW9GaWxlLnN0YXRlID09PSBBdWRpb0ZpbGVTdGF0ZS5CVUZGRVJFRDtcclxuICAgIHJldHVybiBzdGVwZmlsZVJlYWR5ICYmIGF1ZGlvRmlsZVJlYWR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UGxheWluZ0Rpc3BsYXkodHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgZ2xvYmFsLnBsYXlpbmdEaXNwbGF5ID0gbmV3IFBsYXlpbmdEaXNwbGF5KHRyYWNrcywgZ2xvYmFsLmNvbmZpZywgZ2xvYmFsLnA1U2NlbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RlZE1vZGUobW9kZVJhZGlvOiBwNS5FbGVtZW50KSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLnBhZ2UxTW9kZU9wdGlvbnNbbW9kZVJhZGlvLnZhbHVlKCldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdGVwZmlsZUlucHV0TGFiZWwoKSB7XHJcbiAgICBzd2l0Y2goZ2xvYmFsLnN0ZXBmaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLk5PX1NJTUZJTEU6XHJcbiAgICAgICAgICAgIHJldHVybiBcIk5vIGZpbGUgY2hvc2VuXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5ET05FX1JFQURJTkc6XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQ6XHJcbiAgICAgICAgY2FzZSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcoZ2xvYmFsLnN0ZXBmaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBdWRpb0ZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKGdsb2JhbC5hdWRpb0ZpbGUuc3RhdGUpIHtcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLk5PX0FVRElPX0ZJTEU6XHJcbiAgICAgICAgICAgIHJldHVybiBcIk5vIGZpbGUgY2hvc2VuXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HOlxyXG4gICAgICAgIGNhc2UgQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKGdsb2JhbC5hdWRpb0ZpbGUuZmlsZS5uYW1lLCAzMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIkVycm9yXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRydW5jYXRlRmlsZU5hbWVJZlRvb0xvbmcoZnVsbEZpbGVOYW1lOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBpZiAoZnVsbEZpbGVOYW1lLmxlbmd0aCA8PSBtYXhMZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZnVsbEZpbGVOYW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bGxGaWxlTmFtZS5zdWJzdHIoMCwgbWF4TGVuZ3RoIC0gMTEpICtcclxuICAgICAgICBcIi4uLlwiICtcclxuICAgICAgICBmdWxsRmlsZU5hbWUuc3Vic3RyKGZ1bGxGaWxlTmFtZS5sZW5ndGggLSAxMCk7XHJcbn0iLCJpbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7c2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmV9IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyLCBQQUdFU30gZnJvbSBcIi4uL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuLi9kb21fd3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc3VsdHMge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChcImJsYWNrXCIpO1xyXG5cclxuICAgICAgICBnbG9iYWwucmVzdWx0c0Rpc3BsYXkuZHJhdygpO1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJSZXR1cm5cIik7XHJcbiAgICAgICAgfSwgXCJyZXR1cm5CdXR0b25cIik7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocmV0dXJuQnV0dG9uLmVsZW1lbnQsIDAuNSwgMC45LCA3MywgMzQpO1xyXG4gICAgICAgIGlmICghcmV0dXJuQnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuQnV0dG9uLmVsZW1lbnQubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRTY2VuZShQQUdFUy5QTEFZX0ZST01fRklMRSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBQYXJ0aWFsUGFyc2Uge1xyXG4gICAgbWV0YURhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbiAgICBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlVHlwZSB7XHJcbiAgICBOT05FID0gXCIwXCIsXHJcbiAgICBOT1JNQUwgPSBcIjFcIixcclxuICAgIEhPTERfSEVBRCA9IFwiMlwiLFxyXG4gICAgVEFJTCA9IFwiM1wiLFxyXG4gICAgUk9MTF9IRUFEID0gXCI0XCIsXHJcbiAgICBNSU5FID0gXCJNXCIsXHJcbiAgICBVTktOT1dOID0gXCI/Pz9cIixcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvTm90ZVR5cGUoc3RyaW5nOiBzdHJpbmcpOiBOb3RlVHlwZSB7XHJcbiAgICBzd2l0Y2ggKHN0cmluZykge1xyXG4gICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT05FO1xyXG4gICAgICAgIGNhc2UgXCIxXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5OT1JNQUw7XHJcbiAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLkhPTERfSEVBRDtcclxuICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuVEFJTDtcclxuICAgICAgICBjYXNlIFwiNFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuUk9MTF9IRUFEO1xyXG4gICAgICAgIGNhc2UgXCJNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5NSU5FO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5VTktOT1dOO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBOb3RlU3RhdGUge1xyXG4gICAgREVGQVVMVCxcclxuICAgIEhJVCxcclxuICAgIE1JU1NFRCxcclxuICAgIEhFTEQsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZSB7XHJcbiAgICB0eXBlOiBOb3RlVHlwZTtcclxuICAgIHR5cGVTdHJpbmc6IHN0cmluZzsgLy8gdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZSBCRUZPUkUgaXQncyBpbnRlcnByZXRlZCBhcyBhIE5vdGVUeXBlXHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBzdGF0ZT86IE5vdGVTdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGUge1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBkaWZmaWN1bHR5OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbWV0ZXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRnVsbFBhcnNlIHtcclxuICAgIG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXTtcclxuICAgIG9mZnNldDogbnVtYmVyO1xyXG4gICAgYnBtczogW251bWJlciwgbnVtYmVyXVtdO1xyXG4gICAgc3RvcHM6IFtudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFydGlhbFBhcnNlOiBQYXJ0aWFsUGFyc2UpIHtcclxuICAgICAgICB0aGlzLm1ldGFEYXRhID0gcGFydGlhbFBhcnNlLm1ldGFEYXRhO1xyXG4gICAgICAgIHRoaXMubW9kZXMgPSBwYXJ0aWFsUGFyc2UubW9kZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIFN0ZXAgT25lIE9mIFBhcnNpbmcgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpYWxQYXJzZShmaWxlQ29udGVudHM6IHN0cmluZykge1xyXG4gICAgbGV0IHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlID0gbmV3IFBhcnRpYWxQYXJzZSgpO1xyXG4gICAgcGFydGlhbFBhcnNlLm1ldGFEYXRhID0gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZUNvbnRlbnRzKTtcclxuICAgIHBhcnRpYWxQYXJzZS5tb2RlcyA9IGdldE1vZGVzSW5mb0FzU3RyaW5ncyhmaWxlQ29udGVudHMpO1xyXG4gICAgcmV0dXJuIHBhcnRpYWxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9wTWV0YURhdGFBc1N0cmluZ3MoZmlsZTogc3RyaW5nKSB7XHJcbiAgICAvLyBtYXRjaCBhbnkgbWV0YWRhdGEgdGFnIGV4Y2x1ZGluZyB0aGUgXCJOT1RFU1wiIHRhZyAoY2FzZS1pbnNlbnNpdGl2ZSlcclxuICAgIGxldCByZSA9IC8jKD8hW25OXVtvT11bdFRdW2VFXVtzU10pKFteOl0rKTooW147XSspOy9nO1xyXG4gICAgbGV0IG1hdGNoZXMgPSBbLi4uZmlsZS5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWF0Y2hlc1tpXTtcclxuICAgICAgICBtZXRhRGF0YS5zZXQoY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsxXSkudG9VcHBlckNhc2UoKSwgY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFsyXSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ldGFEYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNb2Rlc0luZm9Bc1N0cmluZ3MoZmlsZUNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIC8vIEdldCBcIk5PVEVTXCIgc2VjdGlvbnMgKGNhc2UtaW5zZW5zaXRpdmUpLiBUaGUgZmlyc3QgZml2ZSB2YWx1ZXMgYXJlIHBvc3RmaXhlZCB3aXRoIGEgY29sb24uXHJcbiAgICAvLyBOb3RlIGRhdGEgY29tZXMgbGFzdCwgcG9zdGZpeGVkIGJ5IGEgc2VtaWNvbG9uLlxyXG4gICAgbGV0IHJlID0gLyNbbk5dW29PXVt0VF1bZUVdW3NTXTooW146XSopOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjpdKik6KFteO10rOykvZztcclxuICAgIGxldCBtYXRjaGVzID0gWy4uLmZpbGVDb250ZW50cy5tYXRjaEFsbChyZSldO1xyXG4gICAgbGV0IG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W10gPSBbXTtcclxuICAgIGxldCBmaWVsZE5hbWVzID0gW1widHlwZVwiLCBcImRlc2MvYXV0aG9yXCIsIFwiZGlmZmljdWx0eVwiLCBcIm1ldGVyXCIsIFwicmFkYXJcIl07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaGVzW2ldO1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgbWF0Y2gubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgIG1vZGUuc2V0KGZpZWxkTmFtZXNbaiAtIDFdLCBjbGVhbk1ldGFEYXRhU3RyaW5nKG1hdGNoW2pdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGUuc2V0KFwibm90ZXNcIiwgbWF0Y2hbbWF0Y2gubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIG1vZGVzLnB1c2gobW9kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW9kZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFuTWV0YURhdGFTdHJpbmcoc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0cmluZy50cmltKCkucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG59XHJcblxyXG4vKiBTdGVwIFR3byBPZiBQYXJzaW5nICovXHJcblxyXG4vLyBUT0RPOiBhY3R1YWxseSByZXR1cm4gRnVsbFBhcnNlXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGdWxsUGFyc2UobW9kZUluZGV4OiBudW1iZXIsIHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlKTogRnVsbFBhcnNlIHtcclxuICAgIGxldCBmdWxsUGFyc2UgPSBuZXcgRnVsbFBhcnNlKHBhcnRpYWxQYXJzZSk7XHJcbiAgICBsZXQgdW5wYXJzZWROb3Rlczogc3RyaW5nID0gcGFydGlhbFBhcnNlLm1vZGVzW21vZGVJbmRleF0uZ2V0KFwibm90ZXNcIik7XHJcbiAgICBsZXQgdW5wYXJzZWRBcnJheTogc3RyaW5nW10gPSB1bnBhcnNlZE5vdGVzLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgbGV0IG1lYXN1cmVzOiBzdHJpbmdbXVtdID0gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheSk7XHJcbiAgICBsZXQgYmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXMpO1xyXG4gICAgbGV0IGNsZWFuZWRCZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSByZW1vdmVCbGFua0xpbmVzKGJlYXRzQW5kTGluZXMpO1xyXG4gICAgbGV0IG9mZnNldDogbnVtYmVyID0gcGFyc2VGbG9hdChwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiT0ZGU0VUXCIpKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gcGFyc2VCUE1TKHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJCUE1TXCIpKTtcclxuICAgIGxldCBzdG9wczogeyBzdG9wRHVyYXRpb246IG51bWJlcjsgYmVhdDogbnVtYmVyIH1bXSA9IHBhcnNlU3RvcHMocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIlNUT1BTXCIpKTtcclxuICAgIGxldCB0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gZ2V0VGltZUluZm9CeUxpbmUoY2xlYW5lZEJlYXRzQW5kTGluZXMsIG9mZnNldCwgYnBtcywgc3RvcHMpO1xyXG4gICAgZnVsbFBhcnNlLnRyYWNrcyA9IGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXMpO1xyXG4gICAgcmV0dXJuIGZ1bGxQYXJzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWVhc3VyZXModW5wYXJzZWRBcnJheTogc3RyaW5nW10pIHtcclxuICAgIGxldCBtZWFzdXJlczogc3RyaW5nW11bXSA9IFtdO1xyXG4gICAgbGV0IHN0YXRlID0gMDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBjdXJyZW50TWVhc3VyZTogc3RyaW5nW10gPSBbXTtcclxuICAgIHdoaWxlIChpIDwgdW5wYXJzZWRBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgY3VycmVudExpbmUgPSB1bnBhcnNlZEFycmF5W2ldO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50TGluZS5pbmNsdWRlcyhcIi8vXCIpICYmIGN1cnJlbnRMaW5lLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudExpbmUuaW5jbHVkZXMoXCIsXCIpICYmICFjdXJyZW50TGluZS5pbmNsdWRlcyhcIjtcIikgJiYgY3VycmVudExpbmUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUucHVzaChjdXJyZW50TGluZS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVzLnB1c2goY3VycmVudE1lYXN1cmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE1lYXN1cmUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtZWFzdXJlcztcclxufVxyXG5cclxuLy8gYXNzdW1lcyA0LzQgdGltZSBzaWduYXR1cmVcclxuZnVuY3Rpb24gZ2V0QmVhdEluZm9CeUxpbmUobWVhc3VyZXM6IHN0cmluZ1tdW10pIHtcclxuICAgIGxldCBiZWF0c0FuZExpbmVzID0gW107XHJcbiAgICBsZXQgY3VycmVudEJlYXQgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtZWFzdXJlID0gbWVhc3VyZXNbaV07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZWFzdXJlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGJlYXRzQW5kTGluZXMucHVzaCh7YmVhdDogY3VycmVudEJlYXQsIGxpbmVJbmZvOiBtZWFzdXJlW2pdfSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRCZWF0ICs9IDQgLyBtZWFzdXJlLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQmxhbmtMaW5lcyhiZWF0c0FuZExpbmVzOiB7IGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10pIHtcclxuICAgIGxldCBjbGVhbmVkQmVhdHNBbmRMaW5lcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZWF0c0FuZExpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBiZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGlmICghaXNBbGxaZXJvcyhsaW5lLmxpbmVJbmZvKSkge1xyXG4gICAgICAgICAgICBjbGVhbmVkQmVhdHNBbmRMaW5lcy5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbGVhbmVkQmVhdHNBbmRMaW5lcztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNBbGxaZXJvcyhzdHJpbmc6IHN0cmluZykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoc3RyaW5nLmNoYXJBdChpKSAhPT0gJzAnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZUluZm9CeUxpbmUoaW5mb0J5TGluZTogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdLCBvZmZzZXQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W11cclxuKTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10ge1xyXG4gICAgbGV0IGluZm9CeUxpbmVXaXRoVGltZTogeyB0aW1lOiBudW1iZXIsIGJlYXQ6IG51bWJlciwgbGluZUluZm86IHN0cmluZyB9W10gPSBbXTtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IC1vZmZzZXQgKyBnZXRFbGFwc2VkVGltZSgwLCBpbmZvQnlMaW5lWzBdLmJlYXQsIGJwbXMsIHN0b3BzKTtcclxuICAgIGluZm9CeUxpbmVXaXRoVGltZS5wdXNoKHt0aW1lOiBjdXJyZW50VGltZSwgYmVhdDogaW5mb0J5TGluZVswXS5iZWF0LCBsaW5lSW5mbzogaW5mb0J5TGluZVswXS5saW5lSW5mb30pO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbmZvQnlMaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmVhdCA9IGluZm9CeUxpbmVbaSAtIDFdLmJlYXQ7XHJcbiAgICAgICAgbGV0IGVuZEJlYXQgPSBpbmZvQnlMaW5lW2ldLmJlYXQ7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gZ2V0RWxhcHNlZFRpbWUoc3RhcnRCZWF0LCBlbmRCZWF0LCBicG1zLCBzdG9wcyk7XHJcbiAgICAgICAgaW5mb0J5TGluZVdpdGhUaW1lLnB1c2goe3RpbWU6IGN1cnJlbnRUaW1lLCBiZWF0OiBpbmZvQnlMaW5lW2ldLmJlYXQsIGxpbmVJbmZvOiBpbmZvQnlMaW5lW2ldLmxpbmVJbmZvfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5mb0J5TGluZVdpdGhUaW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRFbGFwc2VkVGltZShzdGFydEJlYXQ6IG51bWJlciwgZW5kQmVhdDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wczogeyBiZWF0OiBudW1iZXIsIHN0b3BEdXJhdGlvbjogbnVtYmVyIH1bXSkge1xyXG4gICAgbGV0IGN1cnJlbnRCUE1JbmRleDogbnVtYmVyID0gZ2V0U3RhcnRCUE1JbmRleChzdGFydEJlYXQsIGJwbXMpO1xyXG4gICAgbGV0IGVhcmxpZXN0QmVhdDogbnVtYmVyID0gc3RhcnRCZWF0O1xyXG4gICAgbGV0IGVsYXBzZWRUaW1lOiBudW1iZXIgPSBzdG9wcyA9PSBudWxsID8gMCA6IHN0b3BwZWRUaW1lKHN0YXJ0QmVhdCwgZW5kQmVhdCwgc3RvcHMpO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGxldCBuZXh0QlBNQ2hhbmdlOiBudW1iZXIgPSBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleCwgYnBtcyk7XHJcbiAgICAgICAgbGV0IG5leHRCZWF0OiBudW1iZXIgPSBNYXRoLm1pbihlbmRCZWF0LCBuZXh0QlBNQ2hhbmdlKTtcclxuICAgICAgICBlbGFwc2VkVGltZSArPSAobmV4dEJlYXQgLSBlYXJsaWVzdEJlYXQpIC8gYnBtc1tjdXJyZW50QlBNSW5kZXhdLmJwbSAqIDYwO1xyXG4gICAgICAgIGVhcmxpZXN0QmVhdCA9IG5leHRCZWF0O1xyXG4gICAgICAgIGN1cnJlbnRCUE1JbmRleCsrO1xyXG4gICAgfSB3aGlsZSAoZWFybGllc3RCZWF0IDwgZW5kQmVhdCk7XHJcbiAgICByZXR1cm4gZWxhcHNlZFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN0YXJ0QlBNSW5kZXgoc3RhcnRCZWF0OiBudW1iZXIsIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10pIHtcclxuICAgIGxldCBzdGFydEJQTUluZGV4ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYnBtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChicG1zW2ldLmJlYXQgPCBzdGFydEJlYXQpIHtcclxuICAgICAgICAgICAgc3RhcnRCUE1JbmRleCA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXJ0QlBNSW5kZXg7XHJcbn1cclxuXHJcbi8vIGRvZXMgTk9UIHNuYXAgdG8gbmVhcmVzdCAxLzE5Mm5kIG9mIGJlYXRcclxuZnVuY3Rpb24gc3RvcHBlZFRpbWUoc3RhcnRCZWF0OiBudW1iZXIsIGVuZEJlYXQ6IG51bWJlciwgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W10pIHtcclxuICAgIGxldCB0aW1lID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RvcEJlYXQgPSBzdG9wc1tpXS5iZWF0O1xyXG4gICAgICAgIGlmIChzdGFydEJlYXQgPD0gc3RvcEJlYXQgJiYgc3RvcEJlYXQgPCBlbmRCZWF0KSB7XHJcbiAgICAgICAgICAgIHRpbWUgKz0gc3RvcHNbaV0uc3RvcER1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXh0QlBNQ2hhbmdlKGN1cnJlbnRCUE1JbmRleDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdKSB7XHJcbiAgICBpZiAoY3VycmVudEJQTUluZGV4ICsgMSA8IGJwbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGJwbXNbY3VycmVudEJQTUluZGV4ICsgMV0uYmVhdDtcclxuICAgIH1cclxuICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRyYWNrc0Zyb21MaW5lcyh0aW1lc0JlYXRzQW5kTGluZXM6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmc7IH1bXSkge1xyXG4gICAgbGV0IG51bVRyYWNrczogbnVtYmVyID0gdGltZXNCZWF0c0FuZExpbmVzWzBdLmxpbmVJbmZvLmxlbmd0aDtcclxuICAgIGxldCB0cmFja3M6IE5vdGVbXVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgdHJhY2tzLnB1c2goW10pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lc0JlYXRzQW5kTGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbGluZTogeyB0aW1lOiBudW1iZXI7IGJlYXQ6IG51bWJlcjsgbGluZUluZm86IHN0cmluZyB9ID0gdGltZXNCZWF0c0FuZExpbmVzW2ldO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZS5saW5lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZVN0cmluZyA9IGxpbmUubGluZUluZm8uY2hhckF0KGopO1xyXG4gICAgICAgICAgICBsZXQgbm90ZVR5cGU6IE5vdGVUeXBlID0gc3RyaW5nVG9Ob3RlVHlwZSh0eXBlU3RyaW5nKTtcclxuICAgICAgICAgICAgaWYgKG5vdGVUeXBlICE9PSBOb3RlVHlwZS5OT05FKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja3Nbal0ucHVzaCh7dHlwZTogbm90ZVR5cGUsIHR5cGVTdHJpbmc6IHR5cGVTdHJpbmcsIHRpbWVJblNlY29uZHM6IGxpbmUudGltZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyYWNrcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VCUE1TKGJwbVN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoYnBtU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgYnBtQXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oYnBtU3RyaW5nKTtcclxuICAgIGxldCBicG1zOiB7IGJlYXQ6IG51bWJlcjsgYnBtOiBudW1iZXIgfVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJwbUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnBtcy5wdXNoKHtiZWF0OiBicG1BcnJheVtpXVswXSwgYnBtOiBicG1BcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJwbXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlU3RvcHMoc3RvcHNTdHJpbmc6IHN0cmluZykge1xyXG4gICAgaWYgKHN0b3BzU3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBsZXQgc3RvcHNBcnJheTogW251bWJlciwgbnVtYmVyXVtdID0gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihzdG9wc1N0cmluZyk7XHJcbiAgICBsZXQgc3RvcHM6IHsgc3RvcER1cmF0aW9uOiBudW1iZXI7IGJlYXQ6IG51bWJlciB9W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcHNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN0b3BzLnB1c2goe2JlYXQ6IHN0b3BzQXJyYXlbaV1bMF0sIHN0b3BEdXJhdGlvbjogc3RvcHNBcnJheVtpXVsxXX0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0b3BzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKHN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBsZXQgc3RyaW5nQXJyYXk6IHN0cmluZ1tdW10gPSBzdHJpbmcuc3BsaXQoXCIsXCIpLm1hcChlID0+IGUudHJpbSgpLnNwbGl0KFwiPVwiKSk7XHJcbiAgICBsZXQgYXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmdBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5LnB1c2goW3BhcnNlRmxvYXQoc3RyaW5nQXJyYXlbaV1bMF0pLCBwYXJzZUZsb2F0KHN0cmluZ0FycmF5W2ldWzFdKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59IiwiZXhwb3J0IGNsYXNzIFBsYXllcktleUFjdGlvbiB7XHJcbiAgICBnYW1lVGltZTogbnVtYmVyO1xyXG4gICAgdHJhY2s6IG51bWJlcjtcclxuICAgIGtleVN0YXRlOiBLZXlTdGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lVGltZTogbnVtYmVyLCB0cmFjazogbnVtYmVyLCBrZXlTdGF0ZTogS2V5U3RhdGUpIHtcclxuICAgICAgICB0aGlzLmdhbWVUaW1lID0gZ2FtZVRpbWU7XHJcbiAgICAgICAgdGhpcy50cmFjayA9IHRyYWNrO1xyXG4gICAgICAgIHRoaXMua2V5U3RhdGUgPSBrZXlTdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gS2V5U3RhdGUge1xyXG4gICAgVVAsIERPV04sXHJcbn0iLCJpbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtUaW1lTWFuYWdlcn0gZnJvbSBcIi4vdGltZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7TWlzc01hbmFnZXJ9IGZyb20gXCIuL21pc3NfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbE1hbmFnZXJ9IGZyb20gXCIuL3Njcm9sbF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UmVzdWx0c0Rpc3BsYXl9IGZyb20gXCIuL3Jlc3VsdHNfZGlzcGxheVwiO1xyXG5pbXBvcnQge05vdGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtcclxuICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyxcclxuICAgIGlzS2V5QmluZGluZ3NEZWZpbmVkLFxyXG4gICAgcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzLFxyXG4gICAgc2V0QWxsTm90ZXNUb0RlZmF1bHRTdGF0ZVxyXG59IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5U3RhdGUsIFBsYXllcktleUFjdGlvbn0gZnJvbSBcIi4vcGxheWVyX2tleV9hY3Rpb25cIjtcclxuaW1wb3J0IHtLZXlCaW5kaW5nfSBmcm9tIFwiLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nLCBBY2N1cmFjeVJlY29yZGluZ1N0YXRlfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtBY2N1cmFjeUZlZWRiYWNrRGlzcGxheX0gZnJvbSBcIi4vYWNjdXJhY3lfZmVlZGJhY2tfZGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXlpbmdEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgc2NlbmU6IFA1U2NlbmU7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgdGltZU1hbmFnZXI6IEdhbWVUaW1lUHJvdmlkZXI7XHJcbiAgICBwcml2YXRlIG1pc3NNYW5hZ2VyOiBNaXNzTWFuYWdlcjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGdhbWVFbmRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNob3dSZXN1bHRzU2NyZWVuOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGlzRGVidWdNb2RlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgYWNjdXJhY3lGZWVkYmFja0Rpc3BsYXk6IEFjY3VyYWN5RmVlZGJhY2tEaXNwbGF5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyYWNrczogTm90ZVtdW10sIGNvbmZpZzogQ29uZmlnLCBzY2VuZTogUDVTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdHNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRpbWUgbWFuYWdlciBhbmQgcGxheSB0aGUgYXVkaW8gYXMgY2xvc2UgdG9nZXRoZXIgYXMgcG9zc2libGUgdG8gc3luY2hyb25pemUgdGhlIGF1ZGlvIHdpdGggdGhlIGdhbWVcclxuICAgICAgICBpZiAoIXRoaXMuaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBUaW1lTWFuYWdlcihwZXJmb3JtYW5jZS5ub3coKSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgICAgICBnbG9iYWwuYXVkaW9GaWxlLnBsYXkoY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbmV3IE5vdGVNYW5hZ2VyKHRyYWNrcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IG5ldyBBY2N1cmFjeVJlY29yZGluZyh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGgpO1xyXG4gICAgICAgIGxldCBob2xkTWFuYWdlciA9IG5ldyBIb2xkTWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0RlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFNjcm9sbE1hbmFnZXIodGhpcy5jb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nYW1lRW5kVGltZSA9IHRoaXMuY2FsY3VsYXRlR2FtZUVuZChnbG9iYWwuYXVkaW9GaWxlLmdldER1cmF0aW9uKCksIHRoaXMuZ2V0Tm90ZXNFbmRUaW1lKCkpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyID0gbmV3IEFjY3VyYWN5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmNvbmZpZywgdGhpcy5hY2N1cmFjeVJlY29yZGluZywgaG9sZE1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIgPSBuZXcgTWlzc01hbmFnZXIodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIGhvbGRNYW5hZ2VyKTtcclxuXHJcbiAgICAgICAgbGV0IHdpZHRoID0gMjQwO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSA0ODA7XHJcbiAgICAgICAgbGV0IHRvcExlZnRYID0gKHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2Uud2lkdGggLSB3aWR0aCkgLyAyO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WSA9ICh0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLmhlaWdodCAtIGhlaWdodCkgLyAyO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIgPSBuZXcgRGlzcGxheU1hbmFnZXIodGhpcy5ub3RlTWFuYWdlciwgdGhpcy5jb25maWcsIHRoaXMuc2NlbmUuc2tldGNoSW5zdGFuY2UsXHJcbiAgICAgICAgICAgIHRvcExlZnRYLCB0b3BMZWZ0WSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRGlzcGxheSA9IG5ldyBBY2N1cmFjeUZlZWRiYWNrRGlzcGxheSh0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0b3BMZWZ0WCArIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgdG9wTGVmdFkgKyBoZWlnaHQgLyAyLCB0aGlzLmNvbmZpZyk7XHJcblxyXG4gICAgICAgIGlmICghaXNLZXlCaW5kaW5nc0RlZmluZWQodGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplS2V5QmluZGluZ3ModGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iaW5kS2V5QmluZGluZ3NUb0FjdGlvbnMoKTtcclxuICAgICAgICBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzKTtcclxuICAgICAgICByZXBsYWNlTm90WWV0SW1wbGVtZW50ZWROb3RlVHlwZXModGhpcy5ub3RlTWFuYWdlci50cmFja3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50VGltZUluU2Vjb25kcyA9IHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VGltZUluU2Vjb25kcyA+PSB0aGlzLmdhbWVFbmRUaW1lICYmICF0aGlzLnNob3dSZXN1bHRzU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcuc3RhdGUgPSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlLlJFQURZO1xyXG4gICAgICAgICAgICB0aGlzLmVuZFNvbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5taXNzTWFuYWdlci51cGRhdGUoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU1hbmFnZXIuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeUZlZWRiYWNrRGlzcGxheS5kcmF3KGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5vdGVzRW5kVGltZSgpIHtcclxuICAgICAgICBsZXQgZWFybGllc3RBY2N1cmFjeTogbnVtYmVyO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGVhcmxpZXN0QWNjdXJhY3kgPSB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW3RoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlYXJsaWVzdEFjY3VyYWN5ID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDJdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm5vdGVNYW5hZ2VyLmdldExhdGVzdE5vdGUoKS50aW1lSW5TZWNvbmRzICsgZWFybGllc3RBY2N1cmFjeSAvIDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVHYW1lRW5kKGF1ZGlvRHVyYXRpb246IG51bWJlciwgbm90ZXNFbmRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoYXVkaW9EdXJhdGlvbiA8IG5vdGVzRW5kVGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbm90ZXNFbmRUaW1lICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKG5vdGVzRW5kVGltZSArIDUsIGF1ZGlvRHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5kU29uZygpIHtcclxuICAgICAgICBnbG9iYWwuYXVkaW9GaWxlLnN0b3AoKTtcclxuICAgICAgICBnbG9iYWwucmVzdWx0c0Rpc3BsYXkgPSBuZXcgUmVzdWx0c0Rpc3BsYXkodGhpcy5jb25maWcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lNYW5hZ2VyLFxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nKTtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50U2NlbmUoUEFHRVMuUkVTVUxUUyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiaW5kS2V5QmluZGluZ3NUb0FjdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzID0gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQodGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlCaW5kaW5nOiBLZXlCaW5kaW5nID0ga2V5QmluZGluZ3NbaV07XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oa2V5QmluZGluZy5rZXlDb2RlLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5RG93bkFjdGlvbkZvclRyYWNrKGtleUJpbmRpbmcudHJhY2tOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5VXBBY3Rpb25Gb3JUcmFjayhrZXlCaW5kaW5nLnRyYWNrTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oZ2xvYmFsLmNvbmZpZy5xdWl0S2V5LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kU29uZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUga2V5RG93bkFjdGlvbkZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcGxheWVyS2V5QWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24gPVxyXG4gICAgICAgICAgICBuZXcgUGxheWVyS2V5QWN0aW9uKHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpLCB0cmFja051bWJlciwgS2V5U3RhdGUuRE9XTik7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIuaGFuZGxlUGxheWVyQWN0aW9uKHBsYXllcktleUFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBrZXlVcEFjdGlvbkZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcGxheWVyS2V5QWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24gPVxyXG4gICAgICAgICAgICBuZXcgUGxheWVyS2V5QWN0aW9uKHRoaXMudGltZU1hbmFnZXIuZ2V0R2FtZVRpbWUocGVyZm9ybWFuY2Uubm93KCkpLCB0cmFja051bWJlciwgS2V5U3RhdGUuVVApO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyLmhhbmRsZVBsYXllckFjdGlvbihwbGF5ZXJLZXlBY3Rpb24pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtEaXNwbGF5TWFuYWdlcn0gZnJvbSBcIi4vZGlzcGxheV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge1A1U2NlbmV9IGZyb20gXCIuL3A1X3NjZW5lXCI7XHJcbmltcG9ydCB7U2Nyb2xsTWFuYWdlcn0gZnJvbSBcIi4vc2Nyb2xsX21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQcmV2aWV3RGlzcGxheSB7XHJcbiAgICBwcml2YXRlIHNjZW5lOiBQNVNjZW5lO1xyXG4gICAgY29uZmlnOiBDb25maWc7XHJcbiAgICBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHNjcm9sbE1hbmFnZXI6IFNjcm9sbE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGRpc3BsYXlNYW5hZ2VyOiBEaXNwbGF5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgdG9wTGVmdFggPSA2NTtcclxuICAgIHByaXZhdGUgdG9wTGVmdFkgPSA1NTtcclxuICAgIHByaXZhdGUgd2lkdGggPSAyMDA7XHJcbiAgICBwcml2YXRlIGhlaWdodCA9IDQwMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3M6IE5vdGVbXVtdLCBjb25maWc6IENvbmZpZywgc2NlbmU6IFA1U2NlbmUpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5ldyBOb3RlTWFuYWdlcih0cmFja3MpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsTWFuYWdlciA9IG5ldyBTY3JvbGxNYW5hZ2VyKHRoaXMuY29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLCB0aGlzLmdldEJvdW5kcygpKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuY29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLFxyXG4gICAgICAgICAgICB0aGlzLnRvcExlZnRYLCB0aGlzLnRvcExlZnRZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcodGhpcy5zY3JvbGxNYW5hZ2VyLmdldEdhbWVUaW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Qm91bmRzKCkge1xyXG4gICAgICAgIHJldHVybiB7dG9wTGVmdFg6IHRoaXMudG9wTGVmdFgsIHRvcExlZnRZOiB0aGlzLnRvcExlZnRZLCB3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodH07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7ZHJhd0FjY3VyYWN5QmFyc30gZnJvbSBcIi4vZHJhd2luZ191dGlsXCI7XHJcbmltcG9ydCB7QWNjdXJhY3ksIEFjY3VyYWN5TWFuYWdlcn0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuXHJcbi8vVE9ETzogdGFrZSBob2xkcyBhbmQgcmVsZWFzZXMgaW50byBhY2NvdW50XHJcbmV4cG9ydCBjbGFzcyBSZXN1bHRzRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIHA6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyLCBwOiBwNSxcclxuICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlciA9IGFjY3VyYWN5TWFuYWdlcjtcclxuICAgICAgICB0aGlzLnAgPSBwO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBhY2N1cmFjeVJlY29yZGluZztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0FjY3VyYWN5UmVzdWx0cyh0aGlzLnAsIHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuYWNjdXJhY3lNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBY2N1cmFjeVJlc3VsdHMocDogcDUsIGFjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVNYW5hZ2VyOiBOb3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyOiBBY2N1cmFjeU1hbmFnZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHAud2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gcC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIGxldCBiYXJXaWR0aCA9IHAud2lkdGggKiAwLjY7XHJcbiAgICAgICAgbGV0IGJhckhlaWdodCA9IGJhcldpZHRoIC8gMTA7XHJcbiAgICAgICAgbGV0IGxlZnRMYWJlbEhlaWdodCA9IDAuOCAqIGJhckhlaWdodDtcclxuICAgICAgICBsZXQgYWNjdXJhY3lMaXN0Rm9yUmVzdWx0cyA9IHRoaXMuZ2V0UmVzdWx0c0FjY3VyYWN5TGlzdChhY2N1cmFjeVNldHRpbmdzKTtcclxuICAgICAgICBkcmF3QWNjdXJhY3lCYXJzKHAsIGFjY3VyYWN5TGlzdEZvclJlc3VsdHMsIGFjY3VyYWN5UmVjb3JkaW5nLCBjZW50ZXJYLCBjZW50ZXJZLCBsZWZ0TGFiZWxIZWlnaHQsIGJhcldpZHRoLFxyXG4gICAgICAgICAgICBiYXJIZWlnaHQsIG5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybiBhIGxpc3Qgb2YgdW5pcXVlIGFjY3VyYWNpZXMgc29ydGVkIGJ5IHRoZSBvZmZzZXQsIHdpdGggdGhlIGJlc3QgYWNjdXJhY3kgYmVpbmcgZmlyc3RcclxuICAgIHByaXZhdGUgZ2V0UmVzdWx0c0FjY3VyYWN5TGlzdChhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPSBhY2N1cmFjeVNldHRpbmdzLm1hcChhY2N1cmFjeSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeU5hbWU6IGFjY3VyYWN5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICBzb3J0VmFsdWU6IHRoaXMuZ2V0QWNjdXJhY3lTb3J0aW5nVmFsdWUoYWNjdXJhY3kubG93ZXJCb3VuZCwgYWNjdXJhY3kudXBwZXJCb3VuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWVyZ2VkQWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID1cclxuICAgICAgICAgICAgdGhpcy5tZXJnZUFjY3VyYWNpZXNXaXRoU2FtZU5hbWUoYWNjdXJhY3lUYWJsZSk7XHJcbiAgICAgICAgbWVyZ2VkQWNjdXJhY3lUYWJsZS5zb3J0KHRoaXMuYWNjdXJhY3lUYWJsZVNvcnRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZEFjY3VyYWN5VGFibGUubWFwKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFjY3VyYWN5U29ydGluZ1ZhbHVlKGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGxvd2VyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModXBwZXJCb3VuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cHBlckJvdW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKGxvd2VyQm91bmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoKHVwcGVyQm91bmQgKyBsb3dlckJvdW5kKSAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWVyZ2VBY2N1cmFjaWVzV2l0aFNhbWVOYW1lKGFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmc7IHNvcnRWYWx1ZTogbnVtYmVyIH1bXSkge1xyXG4gICAgICAgIGxldCBtZXJnZWRBY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9W10gPSBbXTtcclxuICAgICAgICB3aGlsZSAoYWNjdXJhY3lUYWJsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlBY2N1cmFjeU5hbWUgPSBhY2N1cmFjeVRhYmxlWzBdLmFjY3VyYWN5TmFtZTtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRBY2N1cmFjaWVzID0gYWNjdXJhY3lUYWJsZS5maWx0ZXIocm93ID0+IHJvdy5hY2N1cmFjeU5hbWUgPT09IGtleUFjY3VyYWN5TmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBzb3J0VmFsdWVBdmVyYWdlID0gbWF0Y2hlZEFjY3VyYWNpZXNcclxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChzdW0sIHJvdykgPT4gc3VtICsgcm93LnNvcnRWYWx1ZSwgMClcclxuICAgICAgICAgICAgICAgIC8gbWF0Y2hlZEFjY3VyYWNpZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBtZXJnZWRBY2N1cmFjeVRhYmxlLnB1c2goe2FjY3VyYWN5TmFtZToga2V5QWNjdXJhY3lOYW1lLCBzb3J0VmFsdWU6IHNvcnRWYWx1ZUF2ZXJhZ2V9KTtcclxuICAgICAgICAgICAgYWNjdXJhY3lUYWJsZSA9IGFjY3VyYWN5VGFibGUuZmlsdGVyKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lICE9PSBrZXlBY2N1cmFjeU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVyZ2VkQWNjdXJhY3lUYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFjY3VyYWN5VGFibGVTb3J0RnVuY3Rpb24oYTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nLCBzb3J0VmFsdWU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgcmV0dXJuIGEuc29ydFZhbHVlIC0gYi5zb3J0VmFsdWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZW51bSBTY3JvbGxEaXJlY3Rpb24ge1xyXG4gICAgVXAsXHJcbiAgICBEb3duLFxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7VGltZU1hbmFnZXJ9IGZyb20gXCIuL3RpbWVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7R2FtZVRpbWVQcm92aWRlcn0gZnJvbSBcIi4vZ2FtZV90aW1lX3Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsTWFuYWdlciBpbXBsZW1lbnRzIEdhbWVUaW1lUHJvdmlkZXIge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgc3lzdGVtVGltZU1pbGxpczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0aW1lTWFuYWdlcjogVGltZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHNjcm9sbEJvdW5kczogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnLCBwOiBwNSwgc2Nyb2xsQm91bmRzPzogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVNYW5hZ2VyID0gbmV3IFRpbWVNYW5hZ2VyKDAsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLnNjcm9sbEJvdW5kcyA9IHNjcm9sbEJvdW5kcztcclxuICAgICAgICBwLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiAoZTogV2hlZWxFdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgYWxsb3dTY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbEJvdW5kcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3VzZUlzSW5Cb3VuZHMocCwgdGhpcy5zY3JvbGxCb3VuZHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1Njcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVDaGFuZ2VNaWxsaXMgPSBlLmRlbHRhWSAqIDAuMjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1UaW1lTWlsbGlzIC09IHRpbWVDaGFuZ2VNaWxsaXM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyArPSB0aW1lQ2hhbmdlTWlsbGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFsbG93IGFuIGlnbm9yZWQgYXJndW1lbnQgc28gaXQgY2FuIGJlIHVzZWQgaW4gcGxhY2Ugb2YgYSBUaW1lTWFuYWdlciBmb3IgZGVidWcgbW9kZVxyXG4gICAgZ2V0R2FtZVRpbWUoaWdub3JlZEFyZ3VtZW50PzogYW55KSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHRoaXMuc3lzdGVtVGltZU1pbGxpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3VzZUlzSW5Cb3VuZHMocDogcDUsIGJvdW5kczogeyB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSB7XHJcbiAgICAgICAgaWYgKHAubW91c2VYID49IGJvdW5kcy50b3BMZWZ0WCAmJiBwLm1vdXNlWCA8PSBib3VuZHMudG9wTGVmdFggKyBib3VuZHMud2lkdGggJiZcclxuICAgICAgICAgICAgcC5tb3VzZVkgPj0gYm91bmRzLnRvcExlZnRZICYmIHAubW91c2VZIDw9IGJvdW5kcy50b3BMZWZ0WSArIGJvdW5kcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtGdWxsUGFyc2UsIGdldEZ1bGxQYXJzZSwgZ2V0UGFydGlhbFBhcnNlLCBQYXJ0aWFsUGFyc2V9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0ZXBmaWxlU3RhdGUge1xyXG4gICAgTk9fU0lNRklMRSxcclxuICAgIERPTkVfUkVBRElORyxcclxuICAgIFBBUlRJQUxMWV9QQVJTRUQsXHJcbiAgICBGVUxMWV9QQVJTRUQsXHJcbiAgICBFUlJPUixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXBmaWxlIHtcclxuICAgIHB1YmxpYyBzdGF0ZTogU3RlcGZpbGVTdGF0ZTtcclxuICAgIHB1YmxpYyBmaWxlOiBGaWxlO1xyXG4gICAgcHVibGljIHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlO1xyXG4gICAgcHVibGljIGZ1bGxQYXJzZTogRnVsbFBhcnNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5OT19TSU1GSUxFO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlLmZpbGU7IC8vIHRoaXMgdW53cmFwcyB0aGUgcDUuRmlsZSB3cmFwcGVyIHRvIGdldCB0aGUgb3JpZ2luYWwgRE9NIGZpbGVcclxuICAgICAgICBsb2FkVGV4dEZpbGUodGhpcy5maWxlLCAoKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkRPTkVfUkVBRElORztcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsUGFyc2UgPSBnZXRQYXJ0aWFsUGFyc2UoPHN0cmluZz5ldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGlhbFBhcnNlLm1vZGVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkVSUk9SO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuUEFSVElBTExZX1BBUlNFRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluaXNoUGFyc2luZyhtb2RlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5mdWxsUGFyc2UgPSBnZXRGdWxsUGFyc2UobW9kZUluZGV4LCB0aGlzLnBhcnRpYWxQYXJzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLkZVTExZX1BBUlNFRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRUZXh0RmlsZShcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBsaXN0ZW5lcjogKGV2ZW50OiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiBhbnksXHJcbiAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXHJcbikge1xyXG4gICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgZmlsZVJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xyXG4gICAgZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCBsaXN0ZW5lciwgb3B0aW9ucyk7XHJcbn0iLCJpbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZU1hbmFnZXIgaW1wbGVtZW50cyBHYW1lVGltZVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkID0gc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVsYXBzZWRUaW1lKHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHN5c3RlbVRpbWVNaWxsaXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIkVycm9yOiBjYW4ndCBnZXQgZWxhcHNlZCB0aW1lLiBFeHBlY3RlZCAxIGFyZ3VtZW50OiBzeXN0ZW1UaW1lLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChzeXN0ZW1UaW1lTWlsbGlzIC0gdGhpcy5zeXN0ZW1UaW1lV2hlbkdhbWVTdGFydGVkKSAvIDEwMDA7IC8vIGluIHNlY29uZHNcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSB3YW50IHRvIGtlZXAgdGhpcyBjYWxjdWxhdGlvbiBpbiBvbmx5IG9uZSBwbGFjZVxyXG4gICAgZ2V0R2FtZVRpbWUoc3lzdGVtVGltZU1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxhcHNlZFRpbWUoc3lzdGVtVGltZU1pbGxpcykgKyB0aGlzLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzIC0gdGhpcy5jb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuL3BhZ2VfbWFuYWdlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgZW51bVRvU3RyaW5nQXJyYXksXHJcbiAgICBmaW5kQmluZGluZ0luZm9Gb3JUcmFjayxcclxuICAgIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSxcclxuICAgIGdldEtleUJpbmRpbmdCdXR0b25JZCxcclxuICAgIGdldEtleUJpbmRpbmdDb250YWluZXJJZCxcclxuICAgIGdldEtleVN0cmluZyxcclxuICAgIHNldENvbmZpZ0tleUJpbmRpbmdcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3SGVhZGluZygpIHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgbGV0IGhlYWRpbmdDbGFzcyA9IFwibmF2aWdhdGlvbi1oZWFkaW5nXCI7XHJcblxyXG4gICAgbGV0IHBsYXlGcm9tRmlsZUJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJQbGF5IEZyb20gRmlsZVwiKTtcclxuICAgIH0sIFwicGxheUZyb21GaWxlQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQsIDAuMywgMC4wMzYsIDEzMCwgMzQpO1xyXG4gICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50U2NlbmUoUEFHRVMuUExBWV9GUk9NX0ZJTEUpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXBsYXlGcm9tRmlsZUJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoaGVhZGluZ0NsYXNzKTtcclxuICAgICAgICBwbGF5RnJvbUZpbGVCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvcHRpb25zQnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIk9wdGlvbnNcIik7XHJcbiAgICB9LCBcIm9wdGlvbnNCdXR0b25cIik7XHJcbiAgICBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZShvcHRpb25zQnV0dG9uLmVsZW1lbnQsIDAuNywgMC4wMzYsIDkwLCAzNCk7XHJcbiAgICBvcHRpb25zQnV0dG9uLmVsZW1lbnQubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50U2NlbmUoUEFHRVMuT1BUSU9OUyk7XHJcbiAgICB9KTtcclxuICAgIGlmICghb3B0aW9uc0J1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgcmVsYXRpdmVYIGFuZCByZWxhdGl2ZSBZIHRvIGJlIGJldHdlZW4gMCBhbmQgMVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoZWxlbWVudDogcDUuRWxlbWVudCwgcmVsYXRpdmVYOiBudW1iZXIsIHJlbGF0aXZlWTogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIGxldCBwID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICBsZXQgY2FudmFzUG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSA9IHAuX3JlbmRlcmVyLnBvc2l0aW9uKCk7XHJcbiAgICBlbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAocmVsYXRpdmVYICogcC53aWR0aCkgLSAod2lkdGggLyAyKSxcclxuICAgICAgICBjYW52YXNQb3NpdGlvbi55ICsgKHJlbGF0aXZlWSAqIHAuaGVpZ2h0KSAtIChoZWlnaHQgLyAyKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkSW5wdXQobGFiZWxTdHJpbmc6IHN0cmluZywgaW5wdXRJZDogc3RyaW5nLCBpbnB1dEluaXRpYWxWYWx1ZTogc3RyaW5nLCBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGlucHV0OiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgbGFiZWxlZElucHV0Q2xhc3MgPSBcImxhYmVsZWQtaW5wdXRcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBpbnB1dElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZElucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGlucHV0ID0gcC5jcmVhdGVJbnB1dChpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGlucHV0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGlucHV0LmlkKGlucHV0SWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgaW5wdXRJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogaW5wdXQsIGFscmVhZHlFeGlzdHM6IGNvbnRhaW5lci5hbHJlYWR5RXhpc3RzfTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGFiZWwocDogcDUsIGxhYmVsU3RyaW5nOiBzdHJpbmcsIGZvcklkPzogc3RyaW5nKTogcDUuRWxlbWVudCB7XHJcbiAgICBsZXQgbGFiZWwgPSBwLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBsYWJlbFN0cmluZyk7XHJcbiAgICBpZiAoZm9ySWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxhYmVsLmF0dHJpYnV0ZShcImZvclwiLCBmb3JJZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbi8vIFRPRE86IGNoZWNrIHRoYXQgb3B0aW9uc0VudW0gaXMgYWN0dWFsbHkgYW4gRW51bSwgYW5kIGluaXRpYWxFbnVtVmFsdWUgaXMgYSB2YWx1ZSBmb3IgdGhhdCBlbnVtXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYWJlbGVkU2VsZWN0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIHNlbGVjdElkOiBzdHJpbmcsIG9wdGlvbnNFbnVtOiBhbnksIGluaXRpYWxFbnVtVmFsdWU6IGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBzZWxlY3Q6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgbGFiZWxlZFNlbGVjdENsYXNzID0gXCJsYWJlbGVkLXNlbGVjdFwiO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhsYWJlbGVkU2VsZWN0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgc2VsZWN0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkU2VsZWN0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHNlbGVjdCA9IHAuY3JlYXRlU2VsZWN0KCk7XHJcbiAgICAgICAgc2VsZWN0LmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBzZWxlY3QuYWRkQ2xhc3MobGFiZWxlZFNlbGVjdENsYXNzKTtcclxuICAgICAgICBzZWxlY3QuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBzZWxlY3QucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgc2VsZWN0LmlkKHNlbGVjdElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIHNlbGVjdElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIGxldCBpbml0aWFsT3B0aW9ucyA9IGVudW1Ub1N0cmluZ0FycmF5KG9wdGlvbnNFbnVtKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRpYWxPcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgc2VsZWN0Lm9wdGlvbihpbml0aWFsT3B0aW9uc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBzZWxlY3Quc2VsZWN0ZWQob3B0aW9uc0VudW1baW5pdGlhbEVudW1WYWx1ZSBhcyBrZXlvZiB0eXBlb2Ygb3B0aW9uc0VudW1dLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSFRNTENvbGxlY3Rpb24gPSBzZWxlY3QuZWx0LmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBvcHRpb25zLml0ZW0oaSkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzICsgXCIgXCIgKyBsYWJlbGVkU2VsZWN0Q2xhc3MgKyBcIiBcIiArIGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudDogc2VsZWN0LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVLZXlCaW5kaW5nSW5wdXQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgc2V0QnV0dG9uSWQgPSBnZXRLZXlCaW5kaW5nQnV0dG9uSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICBsZXQga2V5YmluZGluZ0lucHV0Q2xhc3MgPSBcImtleWJpbmRpbmctaW5wdXRcIjtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBcIlwiKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGxldCBzZXRCdXR0b24gPSBwLmNyZWF0ZUJ1dHRvbihcIlNldFwiKTtcclxuICAgICAgICBzZXRCdXR0b24ucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgc2V0QnV0dG9uLmlkKHNldEJ1dHRvbklkKTtcclxuICAgICAgICBzZXRCdXR0b24ubW91c2VQcmVzc2VkKCgpID0+IHtcclxuICAgICAgICAgICAgZ2xvYmFsLmtleWJvYXJkRXZlbnRNYW5hZ2VyLmJpbmRLZXlUb0FjdGlvbigtMSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0Q29uZmlnS2V5QmluZGluZyh0cmFja051bWJlciwgbnVtVHJhY2tzLFxyXG4gICAgICAgICAgICAgICAgICAgIHt0cmFja051bWJlcjogdHJhY2tOdW1iZXIsIGtleUNvZGU6IHAua2V5Q29kZSwgc3RyaW5nOiBnZXRLZXlTdHJpbmcocCl9KTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoLTEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhrZXliaW5kaW5nSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgc2V0QnV0dG9uLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykpO1xyXG5cclxuICAgIGxldCB0cmFja0JpbmRpbmdJbmZvID0gZmluZEJpbmRpbmdJbmZvRm9yVHJhY2sodHJhY2tOdW1iZXIsIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcykpO1xyXG4gICAgbGV0IGtleVN0cmluZyA9IHRyYWNrQmluZGluZ0luZm8uc3RyaW5nO1xyXG4gICAgbGV0IGxhYmVsU3RyaW5nID0gJ1RyYWNrICcgKyAodHJhY2tOdW1iZXIgKyAxKSArICc6IDxzcGFuIGNsYXNzPVwiJyArXHJcbiAgICAgICAga2V5YmluZGluZ0lucHV0Q2xhc3MgKyBcIiBcIiArIGN1c3RvbUNsYXNzICsgXCIgXCIgKyBnbG9iYWwuZ2xvYmFsQ2xhc3MgK1xyXG4gICAgICAgICdcIj4nICsga2V5U3RyaW5nICsgJzwvc3Bhbj4nO1xyXG4gICAgbGV0IGxhYmVsRWxlbWVudCA9IGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShjb250YWluZXIuZWxlbWVudCwgXCJMQUJFTFwiKTtcclxuICAgIGxhYmVsRWxlbWVudC5odG1sKGxhYmVsU3RyaW5nKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZFRleHRBcmVhKGxhYmVsU3RyaW5nOiBzdHJpbmcsIGlucHV0SWQ6IHN0cmluZywgaW5wdXRJbml0aWFsVmFsdWU6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBudW1iZXIgPSA0LCBjb2xzOiBudW1iZXIgPSA0MCk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCB0ZXh0QXJlYTogcDUuRWxlbWVudDtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxhYmVsZWRUZXh0YXJlYUNsYXNzID0gXCJsYWJlbGVkLXRleHRhcmVhXCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgaW5wdXRJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICB0ZXh0QXJlYSA9IHAuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIGlucHV0SW5pdGlhbFZhbHVlKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MobGFiZWxlZFRleHRhcmVhQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgdGV4dEFyZWEucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgdGV4dEFyZWEuaWQoaW5wdXRJZCk7XHJcbiAgICAgICAgdGV4dEFyZWEuYXR0cmlidXRlKFwicm93c1wiLCByb3dzLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHRleHRBcmVhLmF0dHJpYnV0ZShcImNvbHNcIiwgY29scy50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGlucHV0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IHRleHRBcmVhLCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWxlSW5wdXQobGFiZWxTdHJpbmc6IHN0cmluZywgYnV0dG9uVGV4dDogc3RyaW5nLCB1bmlxdWVJZDogc3RyaW5nLCBvbkZpbGVMb2FkOiAoKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgYnV0dG9uSWQgPSB1bmlxdWVJZCArIFwiQnV0dG9uXCI7XHJcbiAgICBsZXQgY29udGFpbmVySWQgPSB1bmlxdWVJZCArIFwiQ29udGFpbmVyXCI7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBmaWxlSW5wdXRDbGFzcyA9IFwiZmlsZS1pbnB1dFwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGZpbGVJbnB1dENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVJbnB1dCA9IHAuY3JlYXRlRmlsZUlucHV0KG9uRmlsZUxvYWQsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgZmlsZUlucHV0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGZpbGVJbnB1dC5oaWRlKCk7XHJcblxyXG4gICAgICAgIGxldCBidXR0b24gPSBwLmNyZWF0ZUJ1dHRvbihidXR0b25UZXh0KTtcclxuICAgICAgICBidXR0b24ucGFyZW50KGNvbnRhaW5lcik7XHJcbiAgICAgICAgYnV0dG9uLmlkKGJ1dHRvbklkKTtcclxuICAgICAgICBidXR0b24ubW91c2VDbGlja2VkKCgpID0+IHtcclxuICAgICAgICAgICAgZmlsZUlucHV0LmVsdC5jbGljaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGZpbGVJbnB1dENsYXNzKTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGJ1dHRvbklkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcylcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGNvbnRhaW5lcklkKTtcclxuXHJcbiAgICBsZXQgbGFiZWw6IHA1LkVsZW1lbnQgPSBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoY29udGFpbmVyLmVsZW1lbnQsIFwiTEFCRUxcIik7XHJcbiAgICBsYWJlbC5odG1sKGxhYmVsU3RyaW5nKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59IiwiaW1wb3J0IHtNb2RlLCBOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdElmVW5kZWZpbmVkKHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgPyBkZWZhdWx0VmFsdWUgOiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxOb3Rlc1RvRGVmYXVsdFN0YXRlKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnN0YXRlID0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzKHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0cmFja3NbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0cmFja3NbaV1bal0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5UQUlMOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5NSU5FOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrc1tpXVtqXS50eXBlID0gTm90ZVR5cGUuTk9ORTsgLy9UT0RPOiBpbXBsZW1lbnQgbWluZXNcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuSE9MRF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT05FOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5ST0xMX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzW2ldW2pdLnR5cGUgPSBOb3RlVHlwZS5IT0xEX0hFQUQ7IC8vVE9ETzogaW1wbGVtZW50IHJvbGxzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pc3NCb3VuZGFyeShjdXJyZW50VGltZTogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgbGV0IG1pc3NCb3VuZGFyeSA9IGN1cnJlbnRUaW1lICsgKGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLnVwcGVyQm91bmQgLyAxMDAwKTsgLy9yZXN1bHQgaXMgaW4gc2Vjb25kc1xyXG4gICAgcmV0dXJuIG1pc3NCb3VuZGFyeTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5QmluZGluZ3NEZWZpbmVkKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUtleUJpbmRpbmdzKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICBsZXQgbWFwcGluZzogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgIGlmIChudW1UcmFja3MgPD0gOSkge1xyXG4gICAgICAgIGxldCBrZXlTZXF1ZW5jZSA9IFtcIkFcIiwgXCJTXCIsIFwiRFwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiLCBcIkpcIiwgXCJLXCIsIFwiTFwiXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlTdHJpbmcgPSBrZXlTZXF1ZW5jZVtpXTtcclxuICAgICAgICAgICAgbWFwcGluZy5wdXNoKHt0cmFja051bWJlcjogaSwga2V5Q29kZToga2V5U3RyaW5nLmNoYXJDb2RlQXQoMCksIHN0cmluZzoga2V5U3RyaW5nfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobnVtVHJhY2tzID4gMjYpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkbid0IGdlbmVyYXRlIGRlZmF1bHQga2V5IGJpbmRpbmdzIGZvciBtb3JlIHRoYW4gMjYgdHJhY2tzLiBSYW4gb3V0IG9mIGxldHRlcnMhXCIpO1xyXG4gICAgICAgICAgICBudW1UcmFja3MgPSAyNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hhcmFjdGVyQ29kZSA9IFwiQVwiLmNoYXJDb2RlQXQoMCkgKyBpOyAvLyBUaGlzIGlzIGFuIEFTQ0lJIGNoYXJhY3RlciBjb2RlXHJcbiAgICAgICAgICAgIG1hcHBpbmcucHVzaCh7dHJhY2tOdW1iZXI6IGksIGtleUNvZGU6IGNoYXJhY3RlckNvZGUsIHN0cmluZzogU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyYWN0ZXJDb2RlKX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLnNldChudW1UcmFja3MsIG1hcHBpbmcpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29uZmlnS2V5QmluZGluZyh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwga2V5QmluZGluZzogS2V5QmluZGluZykge1xyXG4gICAgbGV0IGJpbmRpbmdJbmRleCA9IGdldEluZGV4T2ZUcmFja051bWJlckJpbmRpbmcodHJhY2tOdW1iZXIsIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcykpO1xyXG4gICAgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5nZXQobnVtVHJhY2tzKVtiaW5kaW5nSW5kZXhdID0ga2V5QmluZGluZztcclxufVxyXG5cclxuLy8gRXhwZWN0cyBlIHRvIGJlIGFuIGVudW1cclxuZXhwb3J0IGZ1bmN0aW9uIGVudW1Ub1N0cmluZ0FycmF5KGU6IGFueSk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKGUpLmZpbHRlcigodmFsdWUpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SW5kZXhPZlRyYWNrTnVtYmVyQmluZGluZyh0cmFja051bWJlcjogbnVtYmVyLCBiaW5kaW5nczogeyB0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nIH1bXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChiaW5kaW5nc1tpXS50cmFja051bWJlciA9PT0gdHJhY2tOdW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gZ2V0S2V5QmluZGluZ1VuaXF1ZUlkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpICsgXCJCdXR0b25cIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEtleUJpbmRpbmdDb250YWluZXJJZCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGdldEtleUJpbmRpbmdVbmlxdWVJZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSArIFwiQnV0dG9uXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEtleUJpbmRpbmdVbmlxdWVJZCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIFwidHJhY2tcIiArIHRyYWNrTnVtYmVyICsgXCJPZlwiICsgbnVtVHJhY2tzICsgXCJCaW5kaW5nXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXlTdHJpbmcocDogcDUpIHtcclxuICAgIHJldHVybiBwLmtleS5sZW5ndGggPT0gMSA/IHAua2V5LnRvVXBwZXJDYXNlKCkgOiBwLmtleTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZGVPcHRpb25zRm9yRGlzcGxheShtb2Rlc0FzU3RyaW5nczogTWFwPHN0cmluZywgc3RyaW5nPltdKTogTW9kZVtdIHtcclxuICAgIGxldCBtb2RlT3B0aW9uczogTW9kZVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVzQXNTdHJpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1vZGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBtb2Rlc0FzU3RyaW5nc1tpXTtcclxuICAgICAgICBtb2RlT3B0aW9ucy5wdXNoKHt0eXBlOiBtb2RlLmdldChcInR5cGVcIiksIGRpZmZpY3VsdHk6IG1vZGUuZ2V0KFwiZGlmZmljdWx0eVwiKSwgbWV0ZXI6IG1vZGUuZ2V0KFwibWV0ZXJcIiksIGlkOiBpfSk7XHJcbiAgICB9XHJcbiAgICBtb2RlT3B0aW9ucy5zb3J0KGNvbXBhcmVNb2RlT3B0aW9ucyk7XHJcbiAgICByZXR1cm4gbW9kZU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlTW9kZU9wdGlvbnMoYTogTW9kZSwgYjogTW9kZSkge1xyXG4gICAgbGV0IHR5cGVBID0gYS50eXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBsZXQgdHlwZUIgPSBiLnR5cGUudG9VcHBlckNhc2UoKTtcclxuICAgIGlmICh0eXBlQSAhPSB0eXBlQikge1xyXG4gICAgICAgIGlmICh0eXBlQSA8IHR5cGVCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBkaWZmaWN1bHR5QSA9IGEuZGlmZmljdWx0eS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBkaWZmaWN1bHR5QiA9IGIuZGlmZmljdWx0eS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChkaWZmaWN1bHR5QSAhPSBkaWZmaWN1bHR5Qikge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlmZmljdWx0eVJhbmsoZGlmZmljdWx0eUEpIC0gZGlmZmljdWx0eVJhbmsoZGlmZmljdWx0eUIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRlckEgPSBwYXJzZUZsb2F0KGEubWV0ZXIpO1xyXG4gICAgICAgICAgICBsZXQgbWV0ZXJCID0gcGFyc2VGbG9hdChiLm1ldGVyKTtcclxuICAgICAgICAgICAgaWYgKG1ldGVyQSAhPSBtZXRlckIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXRlckEgLSBtZXRlckI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYS5pZCA9IGIuaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHk6IHN0cmluZykge1xyXG4gICAgc3dpdGNoIChkaWZmaWN1bHR5KSB7XHJcbiAgICAgICAgY2FzZSBcIkJFR0lOTkVSXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIGNhc2UgXCJFQVNZXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIGNhc2UgXCJNRURJVU1cIjpcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgY2FzZSBcIkhBUkRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgY2FzZSBcIkNIQUxMRU5HRVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICBjYXNlIFwiRURJVFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gNTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gNjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShkaXY6IHA1LkVsZW1lbnQsIHRhZ05hbWU6IHN0cmluZyk6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGNoaWxkcmVuTm9kZXMgPSBkaXYuY2hpbGQoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5Ob2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBub2RlOiBOb2RlID0gY2hpbGRyZW5Ob2Rlc1tpXTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gdGFnTmFtZSkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcDUuRWxlbWVudChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEJpbmRpbmdJbmZvRm9yVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlciwgYmluZGluZ3M6IHt0cmFja051bWJlcjogbnVtYmVyLCBrZXlDb2RlOiBudW1iZXIsIHN0cmluZzogc3RyaW5nfVtdKSB7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmluZGluZ3NbaV0udHJhY2tOdW1iZXIgPT09IHRyYWNrTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiaW5kaW5nc1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQcmV2aWV3Tm90ZXMobnVtVHJhY2tzOiBudW1iZXIpOiBOb3RlW11bXSB7XHJcbiAgICBsZXQgbm90ZXM6IE5vdGVbXVtdID0gW107XHJcbiAgICBsZXQgaXNIb2xkID0gZmFsc2U7XHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwLjE7XHJcbiAgICBsZXQgdGltZUluY3JlbWVudCA9IDAuMyAvIG51bVRyYWNrcztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICBsZXQgdHJhY2s6IE5vdGVbXSA9IFtdO1xyXG4gICAgICAgIGlmIChpc0hvbGQpIHtcclxuICAgICAgICAgICAgdHJhY2sucHVzaCh7dHlwZTogTm90ZVR5cGUuSE9MRF9IRUFELCB0eXBlU3RyaW5nOiBcIkRvbid0IENhcmVcIiwgdGltZUluU2Vjb25kczogY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFR9KTtcclxuICAgICAgICAgICAgdHJhY2sucHVzaCh7dHlwZTogTm90ZVR5cGUuVEFJTCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lICsgMC4yNSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe3R5cGU6IE5vdGVUeXBlLk5PUk1BTCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lLHN0YXRlOiBOb3RlU3RhdGUuREVGQVVMVH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3Rlcy5wdXNoKHRyYWNrKTtcclxuICAgICAgICBpc0hvbGQgPSAhaXNIb2xkO1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IHRpbWVJbmNyZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm90ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY2N1cmFjeUV2ZW50TmFtZSh0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKTogc3RyaW5nIHtcclxuICAgIGlmIChjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIDwgY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0udXBwZXJCb3VuZCkge1xyXG4gICAgICAgIHJldHVybiBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS5uYW1lOyAvLyBIYW5kbGUgbWlzcyBpZiBpdCBleGlzdHNcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS51cHBlckJvdW5kID09IG51bGwgJiZcclxuICAgICAgICB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzID49IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLmxvd2VyQm91bmQpIHtcclxuICAgICAgICByZXR1cm4gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0ubmFtZTsgLy8gSGFuZGxlIGJvbyBpZiBpdCBleGlzdHNcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3k6IEFjY3VyYWN5ID0gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbaV07XHJcbiAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgIT0gbnVsbCAmJiBhY2N1cmFjeS51cHBlckJvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGFjY3VyYWN5Lmxvd2VyQm91bmQgPCB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzICYmIHRpbWVEaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPD0gYWNjdXJhY3kudXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY3VyYWN5Lm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJFUlJPUjogVW5rbm93biBhY2N1cmFjeVwiO1xyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBwNTsiXSwic291cmNlUm9vdCI6IiJ9