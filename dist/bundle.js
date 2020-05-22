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
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(stepfileInput, 0.43, 0.3, 268, 34);
        let audioFileInput = Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["createFileInput"])(getAudioFileInputLabel(), "Choose Audio File (.mp3, .ogg)", "audioFileInput", _index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile.load.bind(_index__WEBPACK_IMPORTED_MODULE_1__["global"].audioFile), PlayFromFile.PLAY_FROM_FILE_CLASS).element;
        Object(_ui_util__WEBPACK_IMPORTED_MODULE_0__["setElementCenterPositionRelative"])(audioFileInput, 0.43, 0.45, 325, 34);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wYXJzZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvYWNjdXJhY3lfZmVlZGJhY2tfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9hY2N1cmFjeV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2FjY3VyYWN5X3JlY29yZGluZy50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9hdWRpb19maWxlLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9kZWZhdWx0X2NvbmZpZy50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9kZWZhdWx0X25vdGVfc2tpbi50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9kaXNwbGF5X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvZG9tX3dyYXBwZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvZHJhd2luZ191dGlsLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2hhbmRsZV9hY2N1cmFjeV9ldmVudC50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9ob2xkX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMva2V5X2JpbmRpbmdfaGVscGVyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL2tleWJvYXJkX2V2ZW50X21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvbWlzc19tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL25vdGVfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9ub3RlX3NraW4udHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcDVfc2NlbmUudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGFnZV9tYW5hZ2VyLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3BhZ2VzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGFnZXMvcGxheS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9wYWdlcy9wbGF5X2Zyb21fZmlsZS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9wYWdlcy9yZXN1bHRzLnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3BhcnNpbmcudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGxheWVyX2tleV9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvcGxheWluZ19kaXNwbGF5LnRzIiwid2VicGFjazovL3NpbXBhcnNlci8uL3NyYy9zY3JpcHRzL3ByZXZpZXdfZGlzcGxheS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9yZXN1bHRzX2Rpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvc2Nyb2xsX2RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9zY3JvbGxfbWFuYWdlci50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy9zdGVwZmlsZS50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy90aW1lX21hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGFyc2VyLy4vc3JjL3NjcmlwdHMvdWlfdXRpbC50cyIsIndlYnBhY2s6Ly9zaW1wYXJzZXIvLi9zcmMvc2NyaXB0cy91dGlsLnRzIiwid2VicGFjazovL3NpbXBhcnNlci9leHRlcm5hbCBcInA1XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqRkE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFHYTtBQUVyQyxNQUFNLHVCQUF1QjtJQU1oQyxZQUFZLGlCQUFvQyxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsTUFBYztRQUM5RixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxD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T0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQywwQkFBMEI7S0FDdEc7SUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyRCxJQUFJLFFBQVEsR0FBYSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUM1RCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEdBQUcsNEJBQTRCLElBQUksNEJBQTRCLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDM0csT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7S0FDSjtJQUNELE9BQU8seUJBQXlCLENBQUM7QUFDckMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdk9ELG9CIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjcmlwdHMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7QWNjdXJhY3lFdmVudCwgQWNjdXJhY3lSZWNvcmRpbmd9IGZyb20gXCIuL2FjY3VyYWN5X3JlY29yZGluZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeUZlZWRiYWNrRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuICAgIHByaXZhdGUgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZywgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGxhc3RFdmVudDogQWNjdXJhY3lFdmVudCA9IHRoaXMuZ2V0TW9zdFJlY2VudEFjY3VyYWN5RXZlbnQoKTtcclxuICAgICAgICBpZiAobGFzdEV2ZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbWVTaW5jZUxhc3RFdmVudCA9IGN1cnJlbnRUaW1lSW5TZWNvbmRzIC0gbGFzdEV2ZW50LnRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgbGV0IHRleHRTaXplID0gdGhpcy5nZXRGb250U2l6ZSh0aW1lU2luY2VMYXN0RXZlbnQpO1xyXG4gICAgICAgIGlmICh0ZXh0U2l6ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGdldEFjY3VyYWN5RXZlbnROYW1lKGxhc3RFdmVudC5hY2N1cmFjeU1pbGxpcywgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHRoaXMuZHJhd0V2ZW50VGV4dChldmVudE5hbWUsIHRleHRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1vc3RSZWNlbnRBY2N1cmFjeUV2ZW50KCk6IEFjY3VyYWN5RXZlbnQge1xyXG4gICAgICAgIGxldCBtb3N0UmVjZW50VHJhY2s6IEFjY3VyYWN5RXZlbnRbXSA9IFtdO1xyXG4gICAgICAgIGxldCBncmVhdGVzdFRpbWUgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2tOdW1iZXIgPSAwOyB0cmFja051bWJlciA8IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nLmxlbmd0aDsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZ1t0cmFja051bWJlcl07XHJcbiAgICAgICAgICAgIGlmICh0cmFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEV2ZW50VGltZSA9IHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcucmVjb3JkaW5nW3RyYWNrTnVtYmVyXVt0cmFjay5sZW5ndGggLSAxXS50aW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RFdmVudFRpbWUgPiBncmVhdGVzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBsYXN0RXZlbnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmFjayA9IHRyYWNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb3N0UmVjZW50VHJhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9zdFJlY2VudFRyYWNrW21vc3RSZWNlbnRUcmFjay5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEZvbnRTaXplKHRpbWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG1heEZvbnRTaXplID0gMzA7XHJcbiAgICAgICAgaWYgKHRpbWUgPCAwLjEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWUgLyAwLjEgKiBtYXhGb250U2l6ZTtcclxuICAgICAgICB9IGVsc2UgaWYodGltZSA+PSAwLjEgJiYgdGltZSA8IDAuNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRpbWUgPj0gMC40ICYmIHRpbWUgPCAwLjcpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgxIC0gKHRpbWUgLSAwLjQpIC8gKDAuNyAtIDAuNCkpICogbWF4Rm9udFNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0V2ZW50VGV4dCh0ZXh0OiBzdHJpbmcsIHRleHRTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUiwgcC5DRU5URVIpO1xyXG4gICAgICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgICAgIHAudGV4dCh0ZXh0LCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge0tleVN0YXRlLCBQbGF5ZXJLZXlBY3Rpb259IGZyb20gXCIuL3BsYXllcl9rZXlfYWN0aW9uXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtoYW5kbGVBY2N1cmFjeUV2ZW50fSBmcm9tIFwiLi9oYW5kbGVfYWNjdXJhY3lfZXZlbnRcIjtcclxuaW1wb3J0IHtIb2xkTWFuYWdlcn0gZnJvbSBcIi4vaG9sZF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuaW1wb3J0IHtnZXRBY2N1cmFjeUV2ZW50TmFtZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjY3VyYWN5IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxvd2VyQm91bmQ6IG51bWJlcjtcclxuICAgIHVwcGVyQm91bmQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGxvd2VyQm91bmQ6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxvd2VyQm91bmQgPSBsb3dlckJvdW5kO1xyXG4gICAgICAgIHRoaXMudXBwZXJCb3VuZCA9IHVwcGVyQm91bmQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXI7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGNvbmZpZzogQ29uZmlnLCBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuaG9sZE1hbmFnZXIgPSBob2xkTWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVQbGF5ZXJBY3Rpb24oYWN0aW9uOiBQbGF5ZXJLZXlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoYWN0aW9uLmtleVN0YXRlID09IEtleVN0YXRlLkRPV04pIHtcclxuICAgICAgICAgICAgdGhpcy50cnlUb0hpdE5vdGUoYWN0aW9uLmdhbWVUaW1lLCBhY3Rpb24udHJhY2spO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLmtleVN0YXRlID09IEtleVN0YXRlLlVQKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRNYW5hZ2VyLmlzVHJhY2tIZWxkKGFjdGlvbi50cmFjaykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZE1hbmFnZXIudW5ob2xkVHJhY2soYWN0aW9uLnRyYWNrKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5VG9SZWxlYXNlTm90ZShhY3Rpb24uZ2FtZVRpbWUsIGFjdGlvbi50cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cnlUb0hpdE5vdGUoY3VycmVudFRpbWVJblNlY29uZHM6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlSW5kZXggPSB0aGlzLmdldEVhcmxpZXN0SGl0dGFibGVVbmhpdE5vdGVJbmRleChjdXJyZW50VGltZUluU2Vjb25kcywgdHJhY2tOdW1iZXIpO1xyXG4gICAgICAgIGlmIChub3RlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgbm90ZTogTm90ZSA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobm90ZS50eXBlID09PSBOb3RlVHlwZS5OT1JNQUwpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuSElUO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVBY2N1cmFjeUV2ZW50KGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksIHRyYWNrTnVtYmVyLCBhY2N1cmFjeSwgY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZS50eXBlLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChub3RlLnR5cGUgPT0gTm90ZVR5cGUuSE9MRF9IRUFEKSB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnN0YXRlID0gTm90ZVN0YXRlLkhFTEQ7IC8vIHNldCB0aGUgbm90ZSB0byBoZWxkIHNvIGl0IHdvbid0IGNvdW50IGFzIGEgbWlzc1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVBY2N1cmFjeUV2ZW50KGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksIHRyYWNrTnVtYmVyLCBhY2N1cmFjeSwgY3VycmVudFRpbWVJblNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm90ZS50eXBlLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZE1hbmFnZXIuaG9sZFRyYWNrKHRyYWNrTnVtYmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0NvbmZpZ3VyZWRGb3JCb29zKCkpIHtcclxuICAgICAgICAgICAgaGFuZGxlQWNjdXJhY3lFdmVudChnZXRBY2N1cmFjeUV2ZW50TmFtZShJbmZpbml0eSwgdGhpcy5jb25maWcpLCB0cmFja051bWJlciwgSW5maW5pdHksIGN1cnJlbnRUaW1lSW5TZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgTm90ZVR5cGUuTk9ORSwgdGhpcy5hY2N1cmFjeVJlY29yZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWFybGllc3RIaXR0YWJsZVVuaGl0Tm90ZUluZGV4KGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSA9IHRoaXMuZ2V0QWNjdXJhY3lSYW5nZUluU2Vjb25kcygpO1xyXG4gICAgICAgIGxldCBoaXR0YWJsZVRpbWVSYW5nZTogeyBsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIgfSA9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SGl0dGFibGVSYW5nZShhY2N1cmFjeVJhbmdlLCBjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGhpdHRhYmxlSW5kZXhSYW5nZToge3N0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhOb3RJbmNsdXNpdmU6IG51bWJlcn0gPVxyXG4gICAgICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyLmdldE5vdGVzQnlUaW1lUmFuZ2UoaGl0dGFibGVUaW1lUmFuZ2UubGVhc3RUaW1lLCBoaXR0YWJsZVRpbWVSYW5nZS5ncmVhdGVzdFRpbWUsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFYXJsaWVzdFVuaGl0Tm90ZUluZGV4SW5SYW5nZSh0cmFja051bWJlciwgaGl0dGFibGVJbmRleFJhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY2N1cmFjeVJhbmdlSW5TZWNvbmRzKCkge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeVNldHRpbmdzID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncztcclxuICAgICAgICBsZXQgbnVtU2V0dGluZ3MgPSBhY2N1cmFjeVNldHRpbmdzLmxlbmd0aDtcclxuICAgICAgICBsZXQgbGVhc3RUaW1lID0gYWNjdXJhY3lTZXR0aW5nc1swXS5sb3dlckJvdW5kID09IG51bGwgP1xyXG4gICAgICAgICAgICBhY2N1cmFjeVNldHRpbmdzWzFdLmxvd2VyQm91bmQgOiBhY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQ7XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZTtcclxuICAgICAgICBpZiAoYWNjdXJhY3lTZXR0aW5nc1tudW1TZXR0aW5ncyAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMl0udXBwZXJCb3VuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWUgPSBhY2N1cmFjeVNldHRpbmdzW251bVNldHRpbmdzIC0gMV0udXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtsZWFzdFRpbWU6IGxlYXN0VGltZSAvIDEwMDAsIGdyZWF0ZXN0VGltZTogZ3JlYXRlc3RUaW1lIC8gMTAwMH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGl0dGFibGVSYW5nZShhY2N1cmFjeVJhbmdlOiB7IGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciB9LCByZWNlcHRvclRpbWVQb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVhc3RUaW1lOiByZWNlcHRvclRpbWVQb3NpdGlvbiArIGFjY3VyYWN5UmFuZ2UubGVhc3RUaW1lLFxyXG4gICAgICAgICAgICBncmVhdGVzdFRpbWU6IHJlY2VwdG9yVGltZVBvc2l0aW9uICsgYWNjdXJhY3lSYW5nZS5ncmVhdGVzdFRpbWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWFybGllc3RVbmhpdE5vdGVJbmRleEluUmFuZ2UodHJhY2tOdW1iZXI6IG51bWJlciwgbm90ZUluZGV4UmFuZ2U6IHtzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4Tm90SW5jbHVzaXZlOiBudW1iZXJ9KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG5vdGVJbmRleFJhbmdlLnN0YXJ0SW5kZXg7IGkgPCBub3RlSW5kZXhSYW5nZS5lbmRJbmRleE5vdEluY2x1c2l2ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1baV0uc3RhdGUgPT0gTm90ZVN0YXRlLkRFRkFVTFQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgaXNDb25maWd1cmVkRm9yQm9vcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgPT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0cnlUb1JlbGVhc2VOb3RlKGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm90ZUluZGV4ID0gdGhpcy5nZXRFYXJsaWVzdEhpdHRhYmxlVW5oaXROb3RlSW5kZXgoY3VycmVudFRpbWVJblNlY29uZHMsIHRyYWNrTnVtYmVyKTtcclxuICAgICAgICBpZiAobm90ZUluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl1bbm90ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG5vdGUudHlwZSA9PSBOb3RlVHlwZS5UQUlMKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG9sZCA9IHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtub3RlSW5kZXggLSAxXTsgLy8gZ2V0IHRoZSBob2xkIGJlbG9uZ2luZyB0byB0aGlzIHRhaWxcclxuICAgICAgICAgICAgICAgIGhvbGQuc3RhdGUgPSBOb3RlU3RhdGUuSElUOyAvLyBjaGFuZ2UgdGhlIGhvbGQgc3RhdGUgZnJvbSBIRUxEIHRvIEhJVFxyXG4gICAgICAgICAgICAgICAgbm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgdGFpbCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjY3VyYWN5ID0gKG5vdGUudGltZUluU2Vjb25kcyAtIGN1cnJlbnRUaW1lSW5TZWNvbmRzKSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVBY2N1cmFjeUV2ZW50KFwiUmVsZWFzZSBcIiArIGdldEFjY3VyYWN5RXZlbnROYW1lKGFjY3VyYWN5LCB0aGlzLmNvbmZpZyksIHRyYWNrTnVtYmVyLCBhY2N1cmFjeSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGltZUluU2Vjb25kcywgbm90ZS50eXBlLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IC8vIGxldCBnbyB0b28gZWFybHlcclxuICAgICAgICAgICAgLy8gQ291bGQgdGhpcyByZXR1cm4gLTE/XHJcbiAgICAgICAgICAgIGxldCBob2xkU3RhcnRJbmRleCA9IHRoaXMubm90ZU1hbmFnZXIuZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoY3VycmVudFRpbWVJblNlY29uZHMsIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXSk7XHJcbiAgICAgICAgICAgIGxldCBob2xkID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4IC0gMV07XHJcbiAgICAgICAgICAgIGxldCB0YWlsID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4XTtcclxuICAgICAgICAgICAgaWYgKGhvbGQudHlwZSA9PSBOb3RlVHlwZS5IT0xEX0hFQUQgJiYgdGFpbC50eXBlID09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZU1hbmFnZXIudHJhY2tzW3RyYWNrTnVtYmVyXVtob2xkU3RhcnRJbmRleCAtIDFdLnN0YXRlID0gTm90ZVN0YXRlLkhJVDsgLy8gaGl0IHRoZSBzdGFydCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdW2hvbGRTdGFydEluZGV4XS5zdGF0ZSA9IE5vdGVTdGF0ZS5ISVQ7IC8vIGhpdCB0aGUgdGFpbCBvZiB0aGUgaG9sZFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlQWNjdXJhY3lFdmVudChcIlJlbGVhc2UgXCIgKyBnZXRBY2N1cmFjeUV2ZW50TmFtZShJbmZpbml0eSwgdGhpcy5jb25maWcpLCB0cmFja051bWJlciwgSW5maW5pdHksXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRpbWVJblNlY29uZHMsIE5vdGVUeXBlLk5PTkUsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogSXQncyBwb3NzaWJsZSB0aGF0IHRoaXMgaXMgc29tZXRoaW5nIGxpa2UgYSByYWNlIGNvbmRpdGlvbiBiZXR3ZWVuIHRoZSBrZXkgZXZlbnQgYW5kIHRoZSBhbmltYXRpb24gbG9vcC4gRG9uJ3QgdGhyb3cgYW4gZXJyb3IgZm9yIG5vd1xyXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgXCJFcnJvcjogUmVsZWFzZSBtaXNzIGZhaWxlZCB0byB0cmlnZ2VyIG9uIG5vdGUgaW5kZXggXCIgKyAoaG9sZFN0YXJ0SW5kZXggLSAxKSArIFwiLCB0cmFjayBpbmRleCBcIiArIHRyYWNrTnVtYmVyICsgXCIgYXQgdGltZSBcIiArIGN1cnJlbnRUaW1lSW5TZWNvbmRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5cclxuZXhwb3J0IGVudW0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZSB7XHJcbiAgICBJTkNPTVBMRVRFLFxyXG4gICAgUkVBRFksXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWNjdXJhY3lFdmVudCB7XHJcbiAgICB0aW1lSW5TZWNvbmRzOiBudW1iZXIsXHJcbiAgICBhY2N1cmFjeU1pbGxpczogbnVtYmVyLFxyXG4gICAgbm90ZVR5cGU6IE5vdGVUeXBlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2N1cmFjeVJlY29yZGluZyB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IEFjY3VyYWN5UmVjb3JkaW5nU3RhdGU7XHJcbiAgICBwdWJsaWMgcmVjb3JkaW5nOiBBY2N1cmFjeUV2ZW50W11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBY2N1cmFjeVJlY29yZGluZ1N0YXRlLklOQ09NUExFVEU7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmcgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkaW5nLnB1c2goW10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb3JkQWNjdXJhY3lFdmVudCh0cmFja051bWJlcjogbnVtYmVyLCBhY2N1cmFjeU1pbGxpczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUpIHtcclxuICAgICAgICB0aGlzLnJlY29yZGluZ1t0cmFja051bWJlcl0ucHVzaChcclxuICAgICAgICAgICAge3RpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lLCBhY2N1cmFjeU1pbGxpczogYWNjdXJhY3lNaWxsaXMsIG5vdGVUeXBlOiBub3RlVHlwZX0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5leHBvcnQgZW51bSBBdWRpb0ZpbGVTdGF0ZSB7XHJcbiAgICBOT19BVURJT19GSUxFLFxyXG4gICAgRE9ORV9SRUFESU5HLFxyXG4gICAgQlVGRkVSRUQsXHJcbiAgICBFUlJPUixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1ZGlvRmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IEF1ZGlvRmlsZVN0YXRlO1xyXG4gICAgcHVibGljIGZpbGU6IEZpbGU7XHJcbiAgICBwdWJsaWMgYXVkaW9Tb3VyY2U6IEF1ZGlvQnVmZmVyU291cmNlTm9kZTtcclxuICAgIHB1YmxpYyBhdWRpb0NvbnRleHQ6IEF1ZGlvQ29udGV4dDtcclxuICAgIHB1YmxpYyBhdWRpb0J1ZmZlcjogQXVkaW9CdWZmZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5OT19BVURJT19GSUxFO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKGZpbGU6IHA1LkZpbGUpIHtcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlLmZpbGU7IC8vIHRoaXMgdW53cmFwcyB0aGUgcDUuRmlsZSB3cmFwcGVyIHRvIGdldCB0aGUgb3JpZ2luYWwgRE9NIGZpbGVcclxuICAgICAgICBsb2FkU291bmRGaWxlKHRoaXMuZmlsZSwgKChvbkZpbGVSZWFkOiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBBdWRpb0ZpbGVTdGF0ZS5ET05FX1JFQURJTkc7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQgPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoPEFycmF5QnVmZmVyPm9uRmlsZVJlYWQudGFyZ2V0LnJlc3VsdCkudGhlbigoKGJ1ZmZlcjogQXVkaW9CdWZmZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvQnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aXRoIGRlY29kaW5nIGF1ZGlvIGRhdGFcIiArIGUuZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQXVkaW9GaWxlU3RhdGUuRVJST1I7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldER1cmF0aW9uKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1ZGlvU291cmNlLmJ1ZmZlci5kdXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBGYWlsZWQgdG8gZXhlY3V0ZSAnc3RhcnQnIG9uICdBdWRpb0J1ZmZlclNvdXJjZU5vZGUnOiBjYW5ub3QgY2FsbCBzdGFydCBtb3JlIHRoYW4gb25jZS5cclxuICAgIHB1YmxpYyBwbGF5KGRlbGF5SW5TZWNvbmRzOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZS5zdGFydCh0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGRlbGF5SW5TZWNvbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLnN0b3AoMCk7XHJcbiAgICAgICAgQXVkaW9GaWxlU3RhdGUuRE9ORV9SRUFESU5HO1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVTb3VyY2VOb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWNyZWF0ZVNvdXJjZU5vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gdGhpcy5hdWRpb0J1ZmZlcjtcclxuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkU291bmRGaWxlKFxyXG4gICAgZmlsZTogRmlsZSxcclxuICAgIGxpc3RlbmVyOiAoZXZlbnQ6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IGFueSxcclxuICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnNcclxuKSB7XHJcbiAgICBsZXQgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xyXG4gICAgZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCBsaXN0ZW5lciwgb3B0aW9ucyk7XHJcbn0iLCJpbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi9hY2N1cmFjeV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7ZGVmYXVsdElmVW5kZWZpbmVkfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7REVGQVVMVF9DT05GSUd9IGZyb20gXCIuL2RlZmF1bHRfY29uZmlnXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcblxyXG4vLyBFc3NlbnRpYWwgY29uZmlnOiBzY3JvbGwgc3BlZWQsIHNjcm9sbCBkaXJlY3Rpb24sIGdhbWUgd2lkdGgvaGVpZ2h0LCBhZGRpdGlvbmFsIG9mZnNldCwgcGF1c2UgYXQgc3RhcnRcclxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcbiAgICBwaXhlbHNQZXJTZWNvbmQ6IG51bWJlcjtcclxuICAgIHJlY2VwdG9yWVBlcmNlbnQ6IG51bWJlcjtcclxuICAgIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uO1xyXG4gICAgYWRkaXRpb25hbE9mZnNldEluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXTtcclxuICAgIHBhdXNlQXRTdGFydEluU2Vjb25kczogbnVtYmVyO1xyXG4gICAga2V5QmluZGluZ3M6IE1hcDxudW1iZXIsIEtleUJpbmRpbmdbXT47XHJcbiAgICBnYW1lQXJlYUhlaWdodDogbnVtYmVyO1xyXG4gICAgZ2FtZUFyZWFXaWR0aDogbnVtYmVyO1xyXG4gICAgbm90ZVNpemU6IG51bWJlcjtcclxuICAgIHF1aXRLZXk6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxzUGVyU2Vjb25kPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VwdG9yWVBlcmNlbnQ/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uPzogU2Nyb2xsRGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lTZXR0aW5ncz86IEFjY3VyYWN5W10sXHJcbiAgICAgICAgICAgICAgICAgICAgcGF1c2VBdFN0YXJ0SW5TZWNvbmRzPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleUJpbmRpbmdzPzogTWFwPG51bWJlciwgS2V5QmluZGluZ1tdPixcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYUhlaWdodD86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYVdpZHRoPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTaXplPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1aXRLZXk/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmdhbWVBcmVhSGVpZ2h0ID0gZGVmYXVsdElmVW5kZWZpbmVkKGFyZ3MuZ2FtZUFyZWFIZWlnaHQsIERFRkFVTFRfQ09ORklHLmdhbWVBcmVhSGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmdhbWVBcmVhV2lkdGggPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5nYW1lQXJlYVdpZHRoLCBERUZBVUxUX0NPTkZJRy5nYW1lQXJlYVdpZHRoKTtcclxuXHJcbiAgICAgICAgdGhpcy5waXhlbHNQZXJTZWNvbmQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5waXhlbHNQZXJTZWNvbmQsIERFRkFVTFRfQ09ORklHLnBpeGVsc1BlclNlY29uZCk7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRTZWNvbmRzUGVyUGl4ZWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY3JvbGxEaXJlY3Rpb24gPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5zY3JvbGxEaXJlY3Rpb24sIERFRkFVTFRfQ09ORklHLnNjcm9sbERpcmVjdGlvbik7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRTY3JvbGxEaXJlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgLy8gTk9URTogU2Nyb2xsIGRpcmVjdGlvbiBhbmQgZ2FtZUFyZWFIZWlnaHQgbXVzdCBiZSBzZXQgQkVGT1JFIHNldHRpbmcgcmVjZXB0b3JZUG9zaXRpb25cclxuICAgICAgICB0aGlzLnJlY2VwdG9yWVBlcmNlbnQgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5yZWNlcHRvcllQZXJjZW50LCBERUZBVUxUX0NPTkZJRy5yZWNlcHRvcllQZXJjZW50KTtcclxuICAgICAgICAvLyB0aGlzLnNldFJlY2VwdG9yWVBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMsIERFRkFVTFRfQ09ORklHLmFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHMpO1xyXG4gICAgICAgIC8vIHRoaXMuc2V0QWRkaXRpb25hbE9mZnNldEluU2Vjb25kcygpO1xyXG5cclxuICAgICAgICB0aGlzLmFjY3VyYWN5U2V0dGluZ3MgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5hY2N1cmFjeVNldHRpbmdzLCBERUZBVUxUX0NPTkZJRy5hY2N1cmFjeVNldHRpbmdzKTtcclxuICAgICAgICAvLyB0aGlzLnNldEFjY3VyYWN5U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZUF0U3RhcnRJblNlY29uZHMgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5wYXVzZUF0U3RhcnRJblNlY29uZHMsIERFRkFVTFRfQ09ORklHLnBhdXNlQXRTdGFydEluU2Vjb25kcyk7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRQYXVzZUF0U3RhcnRJblNlY29uZHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IGRlZmF1bHRJZlVuZGVmaW5lZChhcmdzLm5vdGVTaXplLCBERUZBVUxUX0NPTkZJRy5ub3RlU2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMua2V5QmluZGluZ3MgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5rZXlCaW5kaW5ncywgREVGQVVMVF9DT05GSUcua2V5QmluZGluZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLnF1aXRLZXkgPSBkZWZhdWx0SWZVbmRlZmluZWQoYXJncy5xdWl0S2V5LCBERUZBVUxUX0NPTkZJRy5xdWl0S2V5KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7QWNjdXJhY3l9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gXCIuL3Njcm9sbF9kaXJlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBsZXQgREVGQVVMVF9DT05GSUcgPSB7XHJcbiAgICBwaXhlbHNQZXJTZWNvbmQ6IDU1MCxcclxuICAgIHNjcm9sbERpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uLkRvd24sXHJcbiAgICByZWNlcHRvcllQZXJjZW50OiAxNSxcclxuICAgIGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHM6IDAsXHJcbiAgICAvLyBUaGlzIGlzIGEgc3ltbWV0cmljYWwgdmVyc2lvbiBvZiBGRlIncyBhY2N1cmFjeVxyXG4gICAgLy8gVE9ETzogQWRkIGEgbGlzdCBvZiBwcmVzZXRzIHRoYXQgbGl2ZSBpbiB0aGVpciBvd24gZmlsZVxyXG4gICAgLy8gVE9ETzogdmFsaWRhdGlvbiBvbiBhY2N1cmFjeSBzZXR0aW5ncyB0aGF0IGV4cGxhaW5zIHdoeSBtaXNzIHNob3VsZG4ndCBoYXZlIGxvd2VyIGJvdW5kXHJcbiAgICBhY2N1cmFjeVNldHRpbmdzOiBbXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiTWlzc1wiLCBudWxsLC0xMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIkF2ZXJhZ2VcIiwgLTExNywgLTgzKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJHb29kXCIsIC04MywgLTUwKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJQZXJmZWN0XCIsIC01MCwgLTE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJBbWF6aW5nXCIsIC0xNywgMTcpLFxyXG4gICAgICAgIG5ldyBBY2N1cmFjeShcIlBlcmZlY3RcIiwgMTcsIDUwKSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJHb29kXCIsIDUwLCA4MyksXHJcbiAgICAgICAgbmV3IEFjY3VyYWN5KFwiQXZlcmFnZVwiLCA4MywgMTE3KSxcclxuICAgICAgICBuZXcgQWNjdXJhY3koXCJCb29cIiwgMTE3LCBudWxsKVxyXG4gICAgXSxcclxuICAgIHBhdXNlQXRTdGFydEluU2Vjb25kczogMCxcclxuICAgIGtleUJpbmRpbmdzOiBuZXcgTWFwKCksXHJcbiAgICBnYW1lQXJlYUhlaWdodDogNjAwLFxyXG4gICAgZ2FtZUFyZWFXaWR0aDogNDAwLFxyXG4gICAgbm90ZVNpemU6IDMwLFxyXG4gICAgcXVpdEtleTogMjcsIC8vIFF1aXQgZGVmYXVsdHMgdG8gZXNjYXBlIGtleVxyXG59OyIsImltcG9ydCB7Tm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZmF1bHROb3RlU2tpbiB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdOb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVR5cGU6IE5vdGVUeXBlKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IG5vdGVTaXplID0gZ2xvYmFsLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gbm90ZVNpemU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgc3dpdGNoIChub3RlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0U2l6ZSgyMCk7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRGb250KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHRBbGlnbihwLkNFTlRFUik7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dChcInZcIiwgY2VudGVyWCwgY2VudGVyWSArIDYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgIHAubm9GaWxsKCk7XHJcbiAgICAgICAgICAgICAgICBwLnJlY3QoY2VudGVyWCAtIHdpZHRoIC8gMiwgY2VudGVyWSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuUk9MTF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJ4XCIsIGNlbnRlclgsIGNlbnRlclkgKyA2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk1JTkU6XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAuY2lyY2xlKGNlbnRlclgsIGNlbnRlclksIDI0KTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgICAgICAgICBwLnRleHQoXCJYXCIsIGNlbnRlclgsIGNlbnRlclkgKyA4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcC5ub0ZpbGwoKTtcclxuICAgICAgICAgICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHAudGV4dFNpemUoMjApO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0Rm9udChcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0QWxpZ24ocC5DRU5URVIpO1xyXG4gICAgICAgICAgICAgICAgcC50ZXh0KFwiP1wiLCBjZW50ZXJYLCBjZW50ZXJZICsgNyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdSZWNlcHRvcih0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vdGVTaXplO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBub3RlU2l6ZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLm5vRmlsbCgpO1xyXG4gICAgICAgIHAucmVjdChjZW50ZXJYIC0gd2lkdGggLyAyLCBjZW50ZXJZIC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgcC5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRyYXdIb2xkQ29ubmVjdG9yKGNlbnRlclg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGVuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gbm90ZVNpemUgKiAwLjU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5maWxsKFwiYmxhY2tcIik7XHJcbiAgICAgICAgcC5yZWN0KGNlbnRlclggLSB3aWR0aCAvIDIsIHN0YXJ0WSwgd2lkdGgsIGVuZFkgLSBzdGFydFkpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmltcG9ydCB7Tm90ZU1hbmFnZXJ9IGZyb20gXCIuL25vdGVfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge05vdGUsIE5vdGVTdGF0ZSwgTm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtEZWZhdWx0Tm90ZVNraW59IGZyb20gXCIuL2RlZmF1bHRfbm90ZV9za2luXCI7XHJcblxyXG5jbGFzcyBOb3RlRGlzcGxheSB7XHJcbiAgICBjZW50ZXJYOiBudW1iZXI7XHJcbiAgICBjZW50ZXJZOiBudW1iZXI7XHJcbiAgICBub3RlVHlwZTogTm90ZVR5cGU7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIG5vdGVTaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRyYWNrTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBub3RlVHlwZTogTm90ZVR5cGUsIHNrZXRjaEluc3RhbmNlOiBwNSwgbm90ZVNpemU6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IHNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWCA9IGNlbnRlclg7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gY2VudGVyWTtcclxuICAgICAgICB0aGlzLm5vdGVUeXBlID0gbm90ZVR5cGU7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IG5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMudHJhY2tOdW1iZXIgPSB0cmFja051bWJlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc05vdGVEcmF3U3VjY2Vzc2Z1bCA9IGdsb2JhbC5ub3RlU2tpbi5kcmF3Tm90ZSh0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLFxyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclksIHRoaXMubm90ZVR5cGUpO1xyXG4gICAgICAgIGlmICghaXNOb3RlRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdOb3RlKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsIHRoaXMuY2VudGVyWSwgdGhpcy5ub3RlVHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBIb2xkQ29ubmVjdG9yIHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIHN0YXJ0WTogbnVtYmVyO1xyXG4gICAgZW5kWTogbnVtYmVyO1xyXG4gICAgbm90ZVN0YXJ0WTogbnVtYmVyO1xyXG4gICAgbm90ZUVuZFk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGVuZFk6IG51bWJlciwgbm90ZVN0YXJ0WTogbnVtYmVyLCBub3RlRW5kWTogbnVtYmVyLCBza2V0Y2hJbnN0YW5jZTogcDUpIHtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gY2VudGVyWDtcclxuICAgICAgICB0aGlzLnN0YXJ0WSA9IHN0YXJ0WTtcclxuICAgICAgICB0aGlzLmVuZFkgPSBlbmRZO1xyXG4gICAgICAgIHRoaXMubm90ZVN0YXJ0WSA9IG5vdGVTdGFydFk7XHJcbiAgICAgICAgdGhpcy5ub3RlRW5kWSA9IG5vdGVFbmRZO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgbGV0IGlzQ29ubmVjdG9yRHJhd1N1Y2Nlc3NmdWwgPSBnbG9iYWwubm90ZVNraW4uZHJhd0hvbGRDb25uZWN0b3IodGhpcy5jZW50ZXJYLCB0aGlzLnN0YXJ0WSwgdGhpcy5lbmRZLFxyXG4gICAgICAgICAgICB0aGlzLm5vdGVTdGFydFksIHRoaXMubm90ZUVuZFkpO1xyXG4gICAgICAgIGlmICghaXNDb25uZWN0b3JEcmF3U3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgICAgICBEZWZhdWx0Tm90ZVNraW4uZHJhd0hvbGRDb25uZWN0b3IodGhpcy5jZW50ZXJYLCB0aGlzLnN0YXJ0WSwgdGhpcy5lbmRZKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlY2VwdG9yIHtcclxuICAgIGNlbnRlclg6IG51bWJlcjtcclxuICAgIGNlbnRlclk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2tldGNoSW5zdGFuY2U6IHA1O1xyXG4gICAgcHJpdmF0ZSBub3RlU2l6ZTogbnVtYmVyXHJcbiAgICBwcml2YXRlIHRyYWNrTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG51bVRyYWNrczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCBza2V0Y2hJbnN0YW5jZTogcDUsIG5vdGVTaXplOiBudW1iZXIsIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UgPSBza2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmNlbnRlclggPSBjZW50ZXJYO1xyXG4gICAgICAgIHRoaXMuY2VudGVyWSA9IGNlbnRlclk7XHJcbiAgICAgICAgdGhpcy5ub3RlU2l6ZSA9IG5vdGVTaXplO1xyXG4gICAgICAgIHRoaXMudHJhY2tOdW1iZXIgPSB0cmFja051bWJlcjtcclxuICAgICAgICB0aGlzLm51bVRyYWNrcyA9IG51bVRyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGxldCBpc1JlY2VwdG9yRHJhd1N1Y2Nlc3NmdWwgPSBnbG9iYWwubm90ZVNraW4uZHJhd1JlY2VwdG9yKHRoaXMudHJhY2tOdW1iZXIsIHRoaXMubnVtVHJhY2tzLCB0aGlzLmNlbnRlclgsXHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyWSk7XHJcbiAgICAgICAgaWYgKCFpc1JlY2VwdG9yRHJhd1N1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgRGVmYXVsdE5vdGVTa2luLmRyYXdSZWNlcHRvcih0aGlzLnRyYWNrTnVtYmVyLCB0aGlzLm51bVRyYWNrcywgdGhpcy5jZW50ZXJYLCB0aGlzLmNlbnRlclkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERpc3BsYXlNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lSW5TZWNvbmRzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNrZXRjaEluc3RhbmNlOiBwNTtcclxuICAgIHByaXZhdGUgdG9wTGVmdFg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdG9wTGVmdFk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBjb25maWc6IENvbmZpZywgc2tldGNoSW5zdGFuY2U6IHA1LCB0b3BMZWZ0WDogbnVtYmVyID0gMCxcclxuICAgICAgICAgICAgICAgIHRvcExlZnRZOiBudW1iZXIgPSAwLCB3aWR0aDogbnVtYmVyID0gMTgwLCBoZWlnaHQ6IG51bWJlciA9IDQwMCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBub3RlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzID0gMDtcclxuICAgICAgICB0aGlzLnNrZXRjaEluc3RhbmNlID0gc2tldGNoSW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy50b3BMZWZ0WCA9IHRvcExlZnRYO1xyXG4gICAgICAgIHRoaXMudG9wTGVmdFkgPSB0b3BMZWZ0WTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdXJyZW50VGltZUluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHA6IHA1ID0gdGhpcy5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICBwLmZpbGwoXCJibGFja1wiKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzID0gY3VycmVudFRpbWVJblNlY29uZHM7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZS5yZWN0KHRoaXMudG9wTGVmdFgsIHRoaXMudG9wTGVmdFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRyYXdOb3Rlc0FuZENvbm5lY3RvcnMoKTtcclxuICAgICAgICB0aGlzLmRyYXdSZWNlcHRvcnMoKTtcclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd05vdGVzQW5kQ29ubmVjdG9ycygpIHtcclxuICAgICAgICBsZXQgbGVhc3RUaW1lID0gdGhpcy5nZXRMZWFzdFRpbWUodGhpcy5jdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IGdyZWF0ZXN0VGltZSA9IHRoaXMuZ2V0R3JlYXRlc3RUaW1lKHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuZHJhd0FsbENvbm5lY3RvcnMobGVhc3RUaW1lLCBncmVhdGVzdFRpbWUpO1xyXG4gICAgICAgIHRoaXMuZHJhd0FsbE5vdGVzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdBbGxOb3RlcyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Tm90ZXNJblRyYWNrKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCBpLCBudW1UcmFja3MsIHRoaXMuY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdOb3Rlc0luVHJhY2sobGVhc3RUaW1lOiBudW1iZXIsIGdyZWF0ZXN0VGltZTogbnVtYmVyLCB0cmFja051bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRyYWNrczogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVJbmRleFJhbmdlID0gdGhpcy5ub3RlTWFuYWdlci5nZXROb3Rlc0J5VGltZVJhbmdlKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCB0cmFja051bWJlcik7XHJcbiAgICAgICAgbGV0IG5vdGVzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdLnNsaWNlKG5vdGVJbmRleFJhbmdlLnN0YXJ0SW5kZXgsIG5vdGVJbmRleFJhbmdlLmVuZEluZGV4Tm90SW5jbHVzaXZlKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd05vdGUobm90ZXNbaV0sIHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Tm90ZShub3RlOiBOb3RlLCB0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChub3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5nZXROb3RlQ2VudGVyWCh0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKG5vdGUudGltZUluU2Vjb25kcywgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICBuZXcgTm90ZURpc3BsYXkoeCwgeSwgbm90ZS50eXBlLCB0aGlzLnNrZXRjaEluc3RhbmNlLCB0aGlzLmNvbmZpZy5ub3RlU2l6ZSwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcykuZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExlYXN0VGltZShjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsRGlzcGxheVNlY29uZHMgPSB0aGlzLmdldERpc3BsYXlIZWlnaHQoKSAvIHRoaXMuY29uZmlnLnBpeGVsc1BlclNlY29uZDtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWUgLSB0aGlzLmNvbmZpZy5yZWNlcHRvcllQZXJjZW50IC8gMTAwICogdG90YWxEaXNwbGF5U2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdyZWF0ZXN0VGltZShjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsRGlzcGxheVNlY29uZHMgPSB0aGlzLmdldERpc3BsYXlIZWlnaHQoKSAvIHRoaXMuY29uZmlnLnBpeGVsc1BlclNlY29uZDtcclxuICAgICAgICByZXR1cm4gY3VycmVudFRpbWUgKyAoMSAtIHRoaXMuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQgLyAxMDApICogdG90YWxEaXNwbGF5U2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5vdGVDZW50ZXJYKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJlY2VwdG9yU3BhY2luZyA9IHRoaXMuZ2V0RGlzcGxheVdpZHRoKCkgLyBudW1UcmFja3MgLSB0aGlzLmNvbmZpZy5ub3RlU2l6ZTtcclxuICAgICAgICByZXR1cm4gKDIgKiB0cmFja051bWJlciArIDEpIC8gMiAqICh0aGlzLmNvbmZpZy5ub3RlU2l6ZSArIHJlY2VwdG9yU3BhY2luZykgKyB0aGlzLnRvcExlZnRYO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZXNzZW50aWFsbHkgZGVmaW5lcyBhIGNvbnZlcnNpb24gZnJvbSBzZWNvbmRzIHRvIHBpeGVsc1xyXG4gICAgcHJpdmF0ZSBnZXROb3RlQ2VudGVyWShub3RlVGltZTogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vdGVZT2Zmc2V0ID0gdGhpcy5jb25maWcucGl4ZWxzUGVyU2Vjb25kICogKG5vdGVUaW1lIC0gY3VycmVudFRpbWUpO1xyXG4gICAgICAgIGxldCByZWNlcHRvcllPZmZzZXQgPSB0aGlzLmNvbmZpZy5yZWNlcHRvcllQZXJjZW50IC8gMTAwICogdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY2VwdG9yWU9mZnNldCArIG5vdGVZT2Zmc2V0ICsgdGhpcy50b3BMZWZ0WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNwbGF5SGVpZ2h0KCkgLSAocmVjZXB0b3JZT2Zmc2V0ICsgbm90ZVlPZmZzZXQpICsgdGhpcy50b3BMZWZ0WTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXNwbGF5V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc3BsYXlIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsQ29ubmVjdG9ycyhsZWFzdFRpbWU6IG51bWJlciwgZ3JlYXRlc3RUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3QWxsVHJhY2tDb25uZWN0b3JzKGxlYXN0VGltZSwgZ3JlYXRlc3RUaW1lLCB0cmFja3NbaV0sIGksXHJcbiAgICAgICAgICAgICAgICB0cmFja3MubGVuZ3RoLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWxsVHJhY2tDb25uZWN0b3JzKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2s6IE5vdGVbXSwgdHJhY2tOdW1iZXI6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UcmFja3M6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub3RlU3RhY2s6IE5vdGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb3RlOiBOb3RlID0gdHJhY2tbaV07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Tm90ZS50aW1lSW5TZWNvbmRzIDwgbGVhc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Tm90ZS50aW1lSW5TZWNvbmRzIDwgZ3JlYXRlc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE5vdGUgPSBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZE5vdGUgPSBjdXJyZW50Tm90ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnROb3RlICE9IHVuZGVmaW5lZCAmJiBlbmROb3RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCB8fCBzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDb25uZWN0b3Ioc3RhcnROb3RlLCBlbmROb3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm90ZVN0YWNrLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuSE9MRF9IRUFEIHx8IGN1cnJlbnROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlJPTExfSEVBRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGVTdGFjay5wdXNoKGN1cnJlbnROb3RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE5vdGUudHlwZSA9PT0gTm90ZVR5cGUuVEFJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydE5vdGUgPSBub3RlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZE5vdGUgPSBjdXJyZW50Tm90ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnROb3RlICE9IHVuZGVmaW5lZCAmJiBlbmROb3RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuREVGQVVMVCB8fCBzdGFydE5vdGUuc3RhdGUgPT0gTm90ZVN0YXRlLkhFTEQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmROb3RlLnN0YXRlID09IE5vdGVTdGF0ZS5ERUZBVUxUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDb25uZWN0b3Ioc3RhcnROb3RlLCBlbmROb3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3Q29ubmVjdG9yKHN0YXJ0Tm90ZTogTm90ZSwgZW5kTm90ZTogTm90ZSwgdHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VudGVyWCA9IHRoaXMuZ2V0Tm90ZUNlbnRlclgodHJhY2tOdW1iZXIsIG51bVRyYWNrcyk7XHJcbiAgICAgICAgbGV0IG5vdGVTdGFydFkgPSB0aGlzLmdldE5vdGVDZW50ZXJZKHN0YXJ0Tm90ZS50aW1lSW5TZWNvbmRzLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgbGV0IG5vdGVFbmRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShlbmROb3RlLnRpbWVJblNlY29uZHMsIGN1cnJlbnRUaW1lKTtcclxuXHJcbiAgICAgICAgbGV0IGRyYXdTdGFydFk7XHJcbiAgICAgICAgaWYgKHN0YXJ0Tm90ZS5zdGF0ZSA9PSBOb3RlU3RhdGUuSEVMRCkge1xyXG4gICAgICAgICAgICBkcmF3U3RhcnRZID0gdGhpcy5nZXROb3RlQ2VudGVyWShNYXRoLm1pbihjdXJyZW50VGltZSwgZW5kTm90ZS50aW1lSW5TZWNvbmRzKSwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFydFkgPSBub3RlU3RhcnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcmF3U3RhcnRZID0gdGhpcy5jbGFtcFZhbHVlVG9SYW5nZShkcmF3U3RhcnRZLCB0aGlzLnRvcExlZnRZLCB0aGlzLnRvcExlZnRZICsgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgZHJhd0VuZFkgPSBub3RlRW5kWVxyXG4gICAgICAgIGRyYXdFbmRZID0gdGhpcy5jbGFtcFZhbHVlVG9SYW5nZShkcmF3RW5kWSwgdGhpcy50b3BMZWZ0WSwgdGhpcy50b3BMZWZ0WSArIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbmV3IEhvbGRDb25uZWN0b3IoY2VudGVyWCwgZHJhd1N0YXJ0WSwgZHJhd0VuZFksIG5vdGVTdGFydFksIG5vdGVFbmRZLCB0aGlzLnNrZXRjaEluc3RhbmNlKS5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGFtcFZhbHVlVG9SYW5nZSh2YWx1ZTogbnVtYmVyLCBsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgbG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlID4gdXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXBwZXJCb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1JlY2VwdG9ycygpIHtcclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbmV3IFJlY2VwdG9yKHRoaXMuZ2V0Tm90ZUNlbnRlclgoaSwgbnVtVHJhY2tzKSwgdGhpcy5nZXROb3RlQ2VudGVyWSh0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzLCB0aGlzLmN1cnJlbnRUaW1lSW5TZWNvbmRzKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoSW5zdGFuY2UsIHRoaXMuY29uZmlnLm5vdGVTaXplLCBpLCBudW1UcmFja3MpLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG4vKiBMZXRzIHVzIGNvZGUgdGhlIERPTSBVSSBlbGVtZW50cyBhcyBpZiBpdCB3ZXJlIFwiaW1tZWRpYXRlXCIsIGkuZS4gc3RhdGVsZXNzLlxyXG4gKiBBbGwgcmVnaXN0ZXJlZCBlbGVtZW50cyBhcmUgcmVtb3ZlZCB3aGVuIHRoZSBwYWdlIGNoYW5nZXNcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBET01XcmFwcGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlZ2lzdHJ5OiBNYXA8c3RyaW5nLCBwNS5FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvLyB1bmlxdWVJRCBzaG91bGQgYmUgdW5pcXVlIHdpdGhpbiBhIHNjZW5lXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShjcmVhdGVDYWxsOiAoKSA9PiBwNS5FbGVtZW50LCB1bmlxdWVJZDogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJ5Lmhhcyh1bmlxdWVJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMucmVnaXN0cnkuZ2V0KHVuaXF1ZUlkKSxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUNhbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5zZXQodW5pcXVlSWQsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIGFscmVhZHlFeGlzdHM6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJSZWdpc3RyeSgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmZvckVhY2goKHZhbHVlLCBrZXksIG1hcCkgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIHJlbW92ZSB3YXMgc3VjY2Vzc2Z1bCwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyeS5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cnkuZ2V0KGlkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGVsZW1lbnQgaWYgZm91bmQsIG90aGVyd2lzZSByZXR1cm5zIHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChpZCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcblxyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7Z2V0QWNjdXJhY3lFdmVudE5hbWV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3QWNjdXJhY3lCYXJzKHA6IHA1LCBhY2N1cmFjeUxhYmVsczogc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhckhlaWdodDogbnVtYmVyLCBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyKSB7XHJcbiAgICBsZXQgbWF4VGV4dFdpZHRoID0gZ2V0TWF4VGV4dFdpZHRoKHAsIGFjY3VyYWN5TGFiZWxzLCB0ZXh0U2l6ZSk7XHJcbiAgICBsZXQgdG90YWxOb3RlcyA9IG5vdGVNYW5hZ2VyLmdldFRvdGFsTm90ZXMoKTtcclxuICAgIGxldCBiYXJTcGFjaW5nID0gMTA7XHJcbiAgICBsZXQgdG90YWxIZWlnaHQgPSBhY2N1cmFjeUxhYmVscy5sZW5ndGggKiBiYXJIZWlnaHQgKyAoYWNjdXJhY3lMYWJlbHMubGVuZ3RoIC0gMSkgKiBiYXJTcGFjaW5nO1xyXG4gICAgbGV0IHN0YXJ0WSA9IChwLmhlaWdodCAtIHRvdGFsSGVpZ2h0KSAvIDIgKyBiYXJIZWlnaHQgLyAyO1xyXG4gICAgc3RhcnRZICo9IDAuODsgLy8gc2hpZnQgdGhlIHJlc3VsdHMgdXAgdG8gbWFrZSByb29tIGZvciBleGl0IGJ1dHRvblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2N1cmFjeUxhYmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBhY2N1cmFjeUxhYmVsID0gYWNjdXJhY3lMYWJlbHNbaV07XHJcbiAgICAgICAgbGV0IG51bUFjY3VyYWN5RXZlbnRzID0gZ2V0TnVtQWNjdXJhY3lFdmVudHMoYWNjdXJhY3lMYWJlbCwgYWNjdXJhY3lSZWNvcmRpbmcsIGFjY3VyYWN5TWFuYWdlcik7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRGaWxsZWQgPSBudW1BY2N1cmFjeUV2ZW50cyAvIHRvdGFsTm90ZXM7XHJcbiAgICAgICAgZHJhd0FjY3VyYWN5QmFyKHAsIGNlbnRlclgsIHN0YXJ0WSArIGkgKiAoYmFySGVpZ2h0ICsgYmFyU3BhY2luZyksIGFjY3VyYWN5TGFiZWwsIG51bUFjY3VyYWN5RXZlbnRzLnRvU3RyaW5nKCksIHRvdGFsTm90ZXMudG9TdHJpbmcoKSwgdGV4dFNpemUsIG1heFRleHRXaWR0aCwgYmFyV2lkdGgsIGJhckhlaWdodCwgcGVyY2VudEZpbGxlZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE51bUFjY3VyYWN5RXZlbnRzKGFjY3VyYWN5TGFiZWw6IHN0cmluZywgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcikge1xyXG4gICAgcmV0dXJuIGFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZGluZy5yZWR1Y2UoKHN1bSwgdHJhY2tSZWNvcmRpbmcpID0+XHJcbiAgICAgICAgc3VtICsgdHJhY2tSZWNvcmRpbmcuZmlsdGVyKGFjY3VyYWN5RXZlbnQgPT5cclxuICAgICAgICBnZXRBY2N1cmFjeUV2ZW50TmFtZShhY2N1cmFjeUV2ZW50LmFjY3VyYWN5TWlsbGlzLCBhY2N1cmFjeU1hbmFnZXIuY29uZmlnKSA9PT0gYWNjdXJhY3lMYWJlbCkubGVuZ3RoLCAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWF4VGV4dFdpZHRoKHA6IHA1LCB0ZXh0QXJyYXk6IHN0cmluZ1tdLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAudGV4dFNpemUodGV4dFNpemUpO1xyXG4gICAgbGV0IG1heFRleHRXaWR0aCA9IHRleHRBcnJheS5tYXAoKHN0cmluZykgPT4gcC50ZXh0V2lkdGgoc3RyaW5nKSlcclxuICAgICAgICAucmVkdWNlKChtYXhXaWR0aCwgd2lkdGgpID0+IE1hdGgubWF4KG1heFdpZHRoLCB3aWR0aCwgLTEpKTtcclxuICAgIHAucG9wKCk7XHJcbiAgICByZXR1cm4gbWF4VGV4dFdpZHRoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0FjY3VyYWN5QmFyKHA6IHA1LCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbGFiZWwxOiBzdHJpbmcsIGxhYmVsMjogc3RyaW5nLCBsYWJlbDM6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogbnVtYmVyLCBsYXJnZXN0VGV4dFdpZHRoOiBudW1iZXIsIGJhcldpZHRoOiBudW1iZXIsIGJhckhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRGaWxsZWQ6IG51bWJlcikge1xyXG4gICAgbGV0IHNwYWNpbmdCZXR3ZWVuQmFyQW5kTGFiZWwgPSA4O1xyXG4gICAgbGV0IHRvdGFsV2lkdGggPSBsYXJnZXN0VGV4dFdpZHRoICsgc3BhY2luZ0JldHdlZW5CYXJBbmRMYWJlbCArIGJhcldpZHRoO1xyXG4gICAgbGV0IGxhYmVsUmlnaHRtb3N0WCA9IGNlbnRlclggLSB0b3RhbFdpZHRoIC8gMiArIGxhcmdlc3RUZXh0V2lkdGg7XHJcbiAgICBkcmF3UmlnaHRBbGlnbmVkTGFiZWwocCwgbGFiZWxSaWdodG1vc3RYLCBjZW50ZXJZLCBsYWJlbDEsIHRleHRTaXplKTtcclxuXHJcbiAgICBsZXQgYmFyUmlnaHRYID0gY2VudGVyWCArIHRvdGFsV2lkdGggLyAyO1xyXG4gICAgbGV0IGJhckxlZnRYID0gYmFyUmlnaHRYIC0gYmFyV2lkdGg7XHJcbiAgICBsZXQgYmFyQ2VudGVyWCA9IChiYXJMZWZ0WCArIGJhclJpZ2h0WCkgLyAyO1xyXG4gICAgZHJhd1BhcnRpYWxseUZpbGxlZEJhcihwLCBiYXJDZW50ZXJYLCBjZW50ZXJZLCBiYXJXaWR0aCwgYmFySGVpZ2h0LCBwZXJjZW50RmlsbGVkLCB0ZXh0U2l6ZSwgbGFiZWwyLCBsYWJlbDMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd1JpZ2h0QWxpZ25lZExhYmVsKHA6IHA1LCByaWdodG1vc3RYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgdGV4dDogc3RyaW5nLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICBwLnB1c2goKTtcclxuICAgIHAuZmlsbChcIndoaXRlXCIpO1xyXG4gICAgcC50ZXh0U2l6ZSh0ZXh0U2l6ZSk7XHJcbiAgICBwLnRleHRBbGlnbihwLlJJR0hULCBwLkNFTlRFUik7XHJcbiAgICBwLnRleHQodGV4dCwgcmlnaHRtb3N0WCwgY2VudGVyWSk7XHJcbiAgICBwLnBvcCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd1BhcnRpYWxseUZpbGxlZEJhcihwOiBwNSwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50RmlsbGVkOiBudW1iZXIsIHRleHRTaXplOiBudW1iZXIsIHN0YXJ0TGFiZWw6IHN0cmluZywgZW5kTGFiZWw6IHN0cmluZykge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBwLnJlY3RNb2RlKHAuQ0VOVEVSKTtcclxuICAgIHAuc3Ryb2tlKFwid2hpdGVcIik7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgZmlsbGVkIHBhcnQgb2YgdGhlIGJhclxyXG4gICAgcC5maWxsKFwiZ3JheVwiKTtcclxuICAgIHAucmVjdChjZW50ZXJYIC0gKHdpZHRoICogKDEgLSBwZXJjZW50RmlsbGVkKSAvIDIpLCBjZW50ZXJZLCB3aWR0aCAqIHBlcmNlbnRGaWxsZWQsIGhlaWdodCk7XHJcblxyXG4gICAgLy8gZHJhdyB0aGUgb3V0bGluZSBvZiB0aGUgYmFyXHJcbiAgICBwLm5vRmlsbCgpO1xyXG4gICAgcC5yZWN0KGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vIGRyYXcgdGhlIGxhYmVscyBvbiB0aGUgZW5kcyBvZiB0aGUgYmFyXHJcbiAgICBsZXQgbGFiZWxTaXplID0gMS41ICogdGV4dFNpemU7XHJcbiAgICBwLmZpbGwoXCJ3aGl0ZVwiKTtcclxuICAgIHAudGV4dFNpemUobGFiZWxTaXplKTtcclxuICAgIHAudGV4dEFsaWduKHAuTEVGVCwgcC5DRU5URVIpO1xyXG4gICAgcC50ZXh0KHN0YXJ0TGFiZWwsIGNlbnRlclggLSB3aWR0aCAvIDIsIGNlbnRlclkgKyAyKTtcclxuICAgIHAudGV4dEFsaWduKHAuUklHSFQsIHAuQ0VOVEVSKTtcclxuICAgIHAudGV4dChlbmRMYWJlbCwgY2VudGVyWCArIHdpZHRoIC8gMiwgY2VudGVyWSArIDIpO1xyXG4gICAgcC5wb3AoKTtcclxufSIsImltcG9ydCB7Tm90ZVR5cGV9IGZyb20gXCIuL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcblxyXG4vL1RPRE86IGFuaW1hdGlvbnMgZm9yIGFjY3VyYWN5IGV2ZW50c1xyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQWNjdXJhY3lFdmVudChhY2N1cmFjeU5hbWU6IHN0cmluZywgdHJhY2tOdW1iZXI6IG51bWJlciwgYWNjdXJhY3k6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90ZVR5cGU6IE5vdGVUeXBlLCBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcpIHtcclxuICAgIGFjY3VyYWN5UmVjb3JkaW5nLnJlY29yZEFjY3VyYWN5RXZlbnQodHJhY2tOdW1iZXIsIGFjY3VyYWN5LCBjdXJyZW50VGltZSwgbm90ZVR5cGUpO1xyXG4gICAgY29uc29sZS5sb2coXCJUcmFjayAjXCIgKyAodHJhY2tOdW1iZXIgKyAxKSArIFwiIFwiICsgYWNjdXJhY3lOYW1lICtcclxuICAgICAgICAoTWF0aC5hYnMoYWNjdXJhY3kpID09IEluZmluaXR5ID8gXCJcIiA6IFwiIChcIiArIE1hdGgucm91bmQoYWNjdXJhY3kpICsgXCIgbXMpXCIpKTtcclxufVxyXG4iLCJcclxuLyogVGhpcyBjbGFzcyBpcyBpbnRlbmRlZCBvbmx5IHRvIGJlIHVzZWQgdG8gc3RvcmUgdGhlIGhvbGQgc3RhdGUgb2Yga2V5IGV2ZW50cyBmb3Igbm90ZXMgdGhhdCBjYW4gYmUgaGVsZC4gVGhpc1xyXG4gICAgc2hvdWxkbid0IGJlIHVzZWQgZm9yIG5vcm1hbCBub3RlcyAqL1xyXG5leHBvcnQgY2xhc3MgSG9sZE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBoZWxkVHJhY2tzOiBib29sZWFuW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVsZFRyYWNrcy5wdXNoKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzVHJhY2tIZWxkKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWxkVHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9sZFRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmhlbGRUcmFja3NbdHJhY2tOdW1iZXJdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5ob2xkVHJhY2sodHJhY2tOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidW5ob2xkIHRyYWNrIFwiICsgKHRyYWNrTnVtYmVyICsgMSkpO1xyXG4gICAgICAgIHRoaXMuaGVsZFRyYWNrc1t0cmFja051bWJlcl0gPSBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtTdGVwZmlsZX0gZnJvbSBcIi4vc3RlcGZpbGVcIjtcclxuaW1wb3J0IHtBdWRpb0ZpbGV9IGZyb20gXCIuL2F1ZGlvX2ZpbGVcIjtcclxuaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbDogYW55ID0ge307XHJcbmdsb2JhbC5wNVNjZW5lID0gbmV3IFA1U2NlbmUoKTtcclxuZ2xvYmFsLmNvbmZpZyA9IG5ldyBDb25maWcoe30pO1xyXG5nbG9iYWwuc3RlcGZpbGUgPSBuZXcgU3RlcGZpbGUoKTtcclxuZ2xvYmFsLmF1ZGlvRmlsZSA9IG5ldyBBdWRpb0ZpbGUoKTtcclxuZ2xvYmFsLmdsb2JhbENsYXNzID0gXCJnYW1lXCI7IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2V0S2V5U3RyaW5nLCBzZXRDb25maWdLZXlCaW5kaW5nfSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXlCaW5kaW5nIHtcclxuICAgIHRyYWNrTnVtYmVyOiBudW1iZXIsXHJcbiAgICBrZXlDb2RlOiBudW1iZXIsXHJcbiAgICBzdHJpbmc6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5QmluZGluZ0hlbHBlciB7XHJcbiAgICBwcml2YXRlIGJpbmRpbmdzVG9BY3F1aXJlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRCaW5kaW5nTnVtYmVyOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmluZGluZ3NUb0FjcXVpcmU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3NUb0FjcXVpcmUgPSBiaW5kaW5nc1RvQWNxdWlyZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCaW5kaW5nTnVtYmVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYmluZE5leHQocDogcDUpIHtcclxuICAgICAgICBsZXQga2V5YmluZGluZzogS2V5QmluZGluZyA9IHtcclxuICAgICAgICAgICAgdHJhY2tOdW1iZXI6IHRoaXMuY3VycmVudEJpbmRpbmdOdW1iZXIsXHJcbiAgICAgICAgICAgIGtleUNvZGU6IHAua2V5Q29kZSxcclxuICAgICAgICAgICAgc3RyaW5nOiBnZXRLZXlTdHJpbmcocClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldENvbmZpZ0tleUJpbmRpbmcodGhpcy5jdXJyZW50QmluZGluZ051bWJlciwgdGhpcy5iaW5kaW5nc1RvQWNxdWlyZSwga2V5YmluZGluZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmluZGluZ051bWJlcisrO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QmluZGluZ051bWJlciA+PSB0aGlzLmJpbmRpbmdzVG9BY3F1aXJlKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci51bmJpbmRLZXkoLTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEV2ZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGFjdGlvbkJpbmRpbmdzOiBNYXA8bnVtYmVyLCB7a2V5RG93bkFjdGlvbjogKCkgPT4gdm9pZCwga2V5VXBBY3Rpb246ICgpID0+IHZvaWR9PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwOiBwNSkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uQmluZGluZ3MgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgICAgIHAua2V5UHJlc3NlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyAtMSBpcyBhIHNwZWNpYWwga2V5Q29kZSBmbGFnIHRoYXQgbWVhbnMgXCJhbnlcIi4gVGhpcyBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBmb3Igc2V0dGluZyB1cCBrZXkgYmluZGluZ3MuXHJcbiAgICAgICAgICAgIGxldCBnbG9iYWxBY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQoLTEpO1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFsQWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsQWN0aW9ucy5rZXlEb3duQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxBY3Rpb25zLmtleURvd25BY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQocC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucy5rZXlEb3duQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5rZXlEb3duQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICBwLmtleVJlbGVhc2VkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5hY3Rpb25CaW5kaW5ncy5nZXQocC5rZXlDb2RlKTtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMua2V5VXBBY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMua2V5VXBBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5VG9BY3Rpb24oa2V5Q29kZTogbnVtYmVyLCBrZXlEb3duQWN0aW9uOiAoKSA9PiB2b2lkLCBrZXlVcEFjdGlvbjogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uQmluZGluZ3Muc2V0KGtleUNvZGUsIHtrZXlEb3duQWN0aW9uOiBrZXlEb3duQWN0aW9uLCBrZXlVcEFjdGlvbjoga2V5VXBBY3Rpb259KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRLZXkoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uQmluZGluZ3MuZGVsZXRlKGtleUNvZGUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtoYW5kbGVBY2N1cmFjeUV2ZW50fSBmcm9tIFwiLi9oYW5kbGVfYWNjdXJhY3lfZXZlbnRcIjtcclxuaW1wb3J0IHtnZXRNaXNzQm91bmRhcnl9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlLCBOb3RlU3RhdGUsIE5vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge0FjY3VyYWN5UmVjb3JkaW5nfSBmcm9tIFwiLi9hY2N1cmFjeV9yZWNvcmRpbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXNzTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIGxhc3RDaGVja2VkTm90ZUluZGljZXM6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICBwcml2YXRlIGhvbGRNYW5hZ2VyOiBIb2xkTWFuYWdlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcsXHJcbiAgICAgICAgICAgICAgICBob2xkTWFuYWdlcjogSG9sZE1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXMucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeVJlY29yZGluZyA9IGFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgICAgIHRoaXMuaG9sZE1hbmFnZXIgPSBob2xkTWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoY3VycmVudFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLmxvd2VyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47IC8vIEEgbG93ZXJCb3VuZCBmb3IgbWlzc2VzIGlzIGluY29tcGF0aWJsZSB3aXRoIHRoaXMgd2F5IG9mIGRvaW5nIG1pc3Nlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtVHJhY2tzID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBudW1UcmFja3M7IHRyYWNrTnVtYmVyKyspIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBbGxNaXNzZWROb3Rlc0ZvclRyYWNrKHRyYWNrTnVtYmVyLCBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQWxsTWlzc2VkTm90ZXNGb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyLCBjdXJyZW50VGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGUgPSB0aGlzLmxhc3RDaGVja2VkTm90ZUluZGljZXNbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIGxldCB0cmFjazogTm90ZVtdID0gdGhpcy5ub3RlTWFuYWdlci50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleE9mTGFzdENoZWNrZWROb3RlID49IHRyYWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb3RlID0gdHJhY2tbaW5kZXhPZkxhc3RDaGVja2VkTm90ZV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTm90TWlzc2FibGUoY3VycmVudE5vdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleE9mTGFzdENoZWNrZWROb3RlKys7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc05vdGVNaXNzZWRBbmROb3RIYW5kbGVkKGN1cnJlbnROb3RlLCBjdXJyZW50VGltZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTWlzc2VkTm90ZSh0cmFja051bWJlciwgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZkxhc3RDaGVja2VkTm90ZSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2tlZE5vdGVJbmRpY2VzW3RyYWNrTnVtYmVyXSA9IGluZGV4T2ZMYXN0Q2hlY2tlZE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRm9yIGV4YW1wbGU6IG5vdGVzIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gaGl0IGFyZSBub3QgbWlzc2FibGVcclxuICAgIHByaXZhdGUgaXNOb3RNaXNzYWJsZShub3RlOiBOb3RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vdGUuc3RhdGUgIT09IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNOb3RlTWlzc2VkQW5kTm90SGFuZGxlZChub3RlOiBOb3RlLCBjdXJyZW50VGltZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IG1pc3NCb3VuZGFyeSA9IGdldE1pc3NCb3VuZGFyeShjdXJyZW50VGltZSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBub3RlLnRpbWVJblNlY29uZHMgPCBtaXNzQm91bmRhcnkgJiYgbm90ZS5zdGF0ZSA9PT0gTm90ZVN0YXRlLkRFRkFVTFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVNaXNzZWROb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIGluZGV4T2ZNaXNzZWROb3RlOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrc1t0cmFja051bWJlcl07XHJcbiAgICAgICAgbGV0IG1pc3NlZE5vdGUgPSB0cmFja1tpbmRleE9mTWlzc2VkTm90ZV07XHJcbiAgICAgICAgaGFuZGxlQWNjdXJhY3lFdmVudCh0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLm5hbWUsIHRyYWNrTnVtYmVyLCAtSW5maW5pdHksIGN1cnJlbnRUaW1lLCBtaXNzZWROb3RlLnR5cGUsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcpO1xyXG4gICAgICAgIG1pc3NlZE5vdGUuc3RhdGUgPSBOb3RlU3RhdGUuTUlTU0VEO1xyXG4gICAgICAgIGlmIChtaXNzZWROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZE1hbmFnZXIuaXNUcmFja0hlbGQodHJhY2tOdW1iZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRNYW5hZ2VyLnVuaG9sZFRyYWNrKHRyYWNrTnVtYmVyKSAvLyBGb3JjZSBhIGhvbGQgcmVsZWFzZSB1cG9uIG1pc3NpbmcgdGhlIHRhaWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZihtaXNzZWROb3RlLnR5cGUgPT09IE5vdGVUeXBlLkhPTERfSEVBRCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dE5vdGUgPSB0cmFja1tpbmRleE9mTWlzc2VkTm90ZSArIDFdO1xyXG4gICAgICAgICAgICBpZiAobmV4dE5vdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHROb3RlLnR5cGUgPT09IE5vdGVUeXBlLlRBSUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0Tm90ZS5zdGF0ZSA9IE5vdGVTdGF0ZS5NSVNTRUQ7IC8vIE1pc3MgdGhlIHRhaWwgd2hlbiB5b3UgbWlzcyB0aGUgaGVhZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtOb3RlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGVNYW5hZ2VyIHtcclxuICAgIHRyYWNrczogTm90ZVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSkge1xyXG4gICAgICAgIHRoaXMudHJhY2tzID0gdHJhY2tzO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlVW5zdXBwb3J0ZWROb3RlVHlwZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVVuc3VwcG9ydGVkTm90ZVR5cGVzKCkge1xyXG4gICAgICAgIGxldCBzdXBwb3J0ZWROb3RlVHlwZXM6IE5vdGVUeXBlW10gPSBbTm90ZVR5cGUuVEFJTCwgTm90ZVR5cGUuSE9MRF9IRUFELCBOb3RlVHlwZS5OT1JNQUxdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgdGhpcy50cmFja3MubGVuZ3RoOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFjazogTm90ZVtdID0gdGhpcy50cmFja3NbdHJhY2tOdW1iZXJdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub3RlTnVtYmVyID0gMDsgbm90ZU51bWJlciA8IHRyYWNrLmxlbmd0aDsgbm90ZU51bWJlcisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90ZTogTm90ZSA9IHRyYWNrW25vdGVOdW1iZXJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdXBwb3J0ZWROb3RlVHlwZXMuaW5jbHVkZXMobm90ZS50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrLnNwbGljZShub3RlTnVtYmVyLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBub3RlTnVtYmVyLS07IC8vIGRlY3JlbWVudCBub3RlIG51bWJlciBzbyBuZXh0IGl0ZXJhdGlvbiBpdCBzdGFydHMgYXQgdGhlIHJpZ2h0IG5vdGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXROb3Rlc0J5VGltZVJhbmdlKGxlYXN0VGltZTogbnVtYmVyLCBncmVhdGVzdFRpbWU6IG51bWJlciwgdHJhY2tOdW1iZXI6IG51bWJlcik6IHsgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbnVtYmVyIH0ge1xyXG4gICAgICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzW3RyYWNrTnVtYmVyXTtcclxuICAgICAgICBsZXQgZmlyc3RGaW5kUmVzdWx0ID0gdGhpcy5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShsZWFzdFRpbWUsIHRyYWNrKTtcclxuICAgICAgICBpZiAoZmlyc3RGaW5kUmVzdWx0IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IC0xLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogLTF9OyAvLyBubyBub3RlcyBsZWZ0IGFmdGVyIGxlYXN0IHRpbWVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxhc3RGaW5kUmVzdWx0ID0gdGhpcy5maW5kSW5kZXhPZkZpcnN0Tm90ZUFmdGVyVGltZShncmVhdGVzdFRpbWUsIHRyYWNrLCBmaXJzdEZpbmRSZXN1bHQpO1xyXG4gICAgICAgIGlmIChsYXN0RmluZFJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgbGFzdEZpbmRSZXN1bHQgPSB0cmFjay5sZW5ndGg7IC8vIGdyZWF0ZXN0VGltZSBleGNlZWRzIHRoZSBlbmQgb2YgdGhlIG5vdGVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaXJzdEZpbmRSZXN1bHQgPT09IDApIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGaW5kUmVzdWx0ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge3N0YXJ0SW5kZXg6IC0xLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogLTF9OyAvLyBoYXZlbid0IHNlZW4gZmlyc3Qgbm90ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtzdGFydEluZGV4OiAwLCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbGFzdEZpbmRSZXN1bHR9OyAvLyBub3RlcyBhcmUganVzdCBzdGFydGluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7c3RhcnRJbmRleDogZmlyc3RGaW5kUmVzdWx0LCBlbmRJbmRleE5vdEluY2x1c2l2ZTogbGFzdEZpbmRSZXN1bHR9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IG5vIHR3byBub3RlcyB3aWxsIGhhdmUgdGhlIHNhbWUgdGltZSBpbiB0aGUgc2FtZSB0cmFja1xyXG4gICAgZmluZEluZGV4T2ZGaXJzdE5vdGVBZnRlclRpbWUoa2V5VGltZTogbnVtYmVyLCB0cmFjazogTm90ZVtdLCBzZWFyY2hTdGFydCA9IDApIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gc2VhcmNoU3RhcnQ7IGkgPCB0cmFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHJhY2tbaV0udGltZUluU2Vjb25kcyA+IGtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFYXJsaWVzdE5vdGUoKTogTm90ZSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0Tm90ZTogTm90ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrc1tpXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tFYXJsaWVzdE5vdGU6IE5vdGUgPSB0aGlzLnRyYWNrc1tpXVswXTtcclxuICAgICAgICAgICAgICAgIGlmIChlYXJsaWVzdE5vdGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFybGllc3ROb3RlID0gdHJhY2tFYXJsaWVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVhcmxpZXN0Tm90ZS50aW1lSW5TZWNvbmRzID4gdHJhY2tFYXJsaWVzdE5vdGUudGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhcmxpZXN0Tm90ZSA9IHRyYWNrRWFybGllc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlYXJsaWVzdE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGF0ZXN0Tm90ZSgpOiBOb3RlIHtcclxuICAgICAgICBsZXQgbGF0ZXN0Tm90ZTogTm90ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrc1tpXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tMYXRlc3ROb3RlOiBOb3RlID0gdGhpcy50cmFja3NbaV1bdGhpcy50cmFja3NbaV0ubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobGF0ZXN0Tm90ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRlc3ROb3RlID0gdHJhY2tMYXRlc3ROb3RlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXRlc3ROb3RlLnRpbWVJblNlY29uZHMgPCB0cmFja0xhdGVzdE5vdGUudGltZUluU2Vjb25kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdE5vdGUgPSB0cmFja0xhdGVzdE5vdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhdGVzdE5vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWxOb3RlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFja3MucmVkdWNlKChzdW0sIHRyYWNrKSA9PiBzdW0gKyB0cmFjay5sZW5ndGgsIDApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge05vdGVUeXBlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi9zY3JvbGxfZGlyZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90ZVNraW4ge1xyXG4gICAgcHVibGljIG5vdGU6IHA1LkltYWdlO1xyXG4gICAgcHVibGljIGNvbm5lY3RvclRpbGU6IHA1LkltYWdlO1xyXG4gICAgcHVibGljIHJlY2VwdG9yOiBwNS5JbWFnZTtcclxuXHJcbiAgICAvKiBSZXF1aXJlcyB0aGF0IHRoZSB0YWlsIGJlIGhhbGYgdGhlIGhlaWdodCBhbmQgc2FtZSB3aWR0aCBhcyBub3RlIGltYWdlICovXHJcbiAgICBwdWJsaWMgdGFpbDogcDUuSW1hZ2U7XHJcblxyXG4gICAgcHJpdmF0ZSByb3RhdGlvbkFuZ2xlczogTWFwPG51bWJlciwgbnVtYmVyW10+ID0gbmV3IE1hcChbXHJcbiAgICAgICAgWzQsIFsyNzAsIDE4MCwgMCwgOTBdXSxcclxuICAgICAgICBbNiwgWzI3MCwgMzE1LCAxODAsIDAsIDQ1LCA5MF1dXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlOiBwNS5JbWFnZSwgY29ubmVjdG9yOiBwNS5JbWFnZSwgdGFpbDogcDUuSW1hZ2UsIHJlY2VwdG9yOiBwNS5JbWFnZSkge1xyXG4gICAgICAgIHRoaXMubm90ZSA9IG5vdGU7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JUaWxlID0gY29ubmVjdG9yO1xyXG4gICAgICAgIHRoaXMudGFpbCA9IHRhaWw7XHJcbiAgICAgICAgdGhpcy5yZWNlcHRvciA9IHJlY2VwdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiBhYmxlIHRvIGRyYXcgbm90ZSB0eXBlLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxyXG4gICAgcHVibGljIGRyYXdOb3RlKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgbm90ZVR5cGU6IE5vdGVUeXBlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgc3dpdGNoIChub3RlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5IT0xEX0hFQUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZVJvdGF0ZWQodGhpcy5ub3RlLCB0cmFja051bWJlciwgbnVtVHJhY2tzLCBjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGVUeXBlLlRBSUw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUYWlsKHRyYWNrTnVtYmVyLCBudW1UcmFja3MsIGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiBhYmxlIHRvIGRyYXcgbm90ZSB0eXBlLCBvdGhlcndpc2UgcmV0dXJucyBmYWxzZVxyXG4gICAgcHVibGljIGRyYXdSZWNlcHRvcih0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlciwgY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmRyYXdJbWFnZVJvdGF0ZWQodGhpcy5yZWNlcHRvciwgdHJhY2tOdW1iZXIsIG51bVRyYWNrcywgY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIGFibGUgdG8gZHJhdyBub3RlIHR5cGUsIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgICBwcml2YXRlIGRyYXdIb2xkQ29ubmVjdG9yKGNlbnRlclg6IG51bWJlciwgZHJhd1N0YXJ0WTogbnVtYmVyLCBkcmF3RW5kWTogbnVtYmVyLCBub3RlU3RhcnRZOiBudW1iZXIsIG5vdGVFbmRZOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBsZXQgbm90ZVNpemUgPSBnbG9iYWwuY29uZmlnLm5vdGVTaXplO1xyXG4gICAgICAgIGxldCBzb3VyY2VXaWR0aCA9IHRoaXMuY29ubmVjdG9yVGlsZS53aWR0aDtcclxuICAgICAgICBsZXQgc291cmNlSGVpZ2h0ID0gdGhpcy5jb25uZWN0b3JUaWxlLmhlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGVkV2lkdGggPSBub3RlU2l6ZTtcclxuICAgICAgICBsZXQgc2NhbGVkSGVpZ2h0ID0gc2NhbGVkV2lkdGggLyBzb3VyY2VXaWR0aCAqIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBsZXQgY29ubmVjdG9ySGVpZ2h0ID0gTWF0aC5hYnMoZHJhd0VuZFkgLSBkcmF3U3RhcnRZKTtcclxuICAgICAgICBsZXQgZW5kWU9mZnNldCA9IHRoaXMuZ2V0Tm90ZUVuZE9mZnNldChub3RlRW5kWSwgZHJhd0VuZFkpO1xyXG5cclxuICAgICAgICBsZXQgZW5kUGFydGlhbFRpbGVIZWlnaHQgPSBzY2FsZWRIZWlnaHQgLSAoZW5kWU9mZnNldCAlIHNjYWxlZEhlaWdodCk7XHJcbiAgICAgICAgZW5kUGFydGlhbFRpbGVIZWlnaHQgPSBNYXRoLm1pbihlbmRQYXJ0aWFsVGlsZUhlaWdodCwgY29ubmVjdG9ySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQgPSAoY29ubmVjdG9ySGVpZ2h0IC0gZW5kUGFydGlhbFRpbGVIZWlnaHQpICUgc2NhbGVkSGVpZ2h0O1xyXG4gICAgICAgIGxldCBudW1Db21wbGV0ZVRpbGVzID0gTWF0aC5yb3VuZChcclxuICAgICAgICAgICAgKGNvbm5lY3RvckhlaWdodCAtIHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQgLSBlbmRQYXJ0aWFsVGlsZUhlaWdodCkgLyBzY2FsZWRIZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGJsb2NrIGFsbG93cyB1cyB0byB1c2UgdGhlIHNhbWUgZHJhd2luZyBtZXRob2QgZm9yIGJvdGggdXBzY3JvbGwgYW5kIGRvd25zY3JvbGxcclxuICAgICAgICBsZXQgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgdG9wUGFydGlhbFRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCA9IGVuZFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgICAgICB0b3BQYXJ0aWFsVGlsZUhlaWdodCA9IHN0YXJ0UGFydGlhbFRpbGVIZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQgPSBzdGFydFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgICAgICB0b3BQYXJ0aWFsVGlsZUhlaWdodCA9IGVuZFBhcnRpYWxUaWxlSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZHJhd01pblkgPSBNYXRoLm1pbihkcmF3U3RhcnRZLCBkcmF3RW5kWSk7XHJcbiAgICAgICAgbGV0IGRyYXdNYXhZID0gTWF0aC5tYXgoZHJhd1N0YXJ0WSwgZHJhd0VuZFkpO1xyXG4gICAgICAgIGxldCBpc1JldmVyc2VkID0gZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcDtcclxuICAgICAgICBsZXQgaXNEcmF3bkZyb21Cb3R0b20gPSBnbG9iYWwuY29uZmlnLnNjcm9sbERpcmVjdGlvbiA9PT0gU2Nyb2xsRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgIGlmIChlbmRQYXJ0aWFsVGlsZUhlaWdodCA9PT0gY29ubmVjdG9ySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGlzRHJhd25Gcm9tQm90dG9tID0gIWlzRHJhd25Gcm9tQm90dG9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcmF3UGFydGlhbFRpbGUoY2VudGVyWCwgZHJhd01pblksIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQsIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsXHJcbiAgICAgICAgICAgIHRvcFBhcnRpYWxUaWxlSGVpZ2h0IC8gc2NhbGVkSGVpZ2h0LCAhaXNEcmF3bkZyb21Cb3R0b20sIGlzUmV2ZXJzZWQsIHApO1xyXG4gICAgICAgIHRoaXMuZHJhd0NvbXBsZXRlVGlsZXMoY2VudGVyWCwgZHJhd01pblkgKyB0b3BQYXJ0aWFsVGlsZUhlaWdodCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCxcclxuICAgICAgICAgICAgbnVtQ29tcGxldGVUaWxlcywgaXNSZXZlcnNlZCwgcCk7XHJcbiAgICAgICAgdGhpcy5kcmF3UGFydGlhbFRpbGUoY2VudGVyWCwgZHJhd01heFkgLSBib3R0b21QYXJ0aWFsVGlsZUhlaWdodCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCxcclxuICAgICAgICAgICAgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgYm90dG9tUGFydGlhbFRpbGVIZWlnaHQgLyBzY2FsZWRIZWlnaHQsIGlzRHJhd25Gcm9tQm90dG9tLFxyXG4gICAgICAgICAgICBpc1JldmVyc2VkLCBwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdUYWlsKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgaWYgKGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgICAgIHAuYW5nbGVNb2RlKHAuREVHUkVFUyk7XHJcbiAgICAgICAgICAgIHAudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSgxODApO1xyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMudGFpbCwgLW5vdGVTaXplIC8gMiwgLW5vdGVTaXplIC8gMiwgbm90ZVNpemUsIG5vdGVTaXplIC8gMik7XHJcbiAgICAgICAgICAgIHAucG9wKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC5pbWFnZSh0aGlzLnRhaWwsIGNlbnRlclggLSBub3RlU2l6ZSAvIDIsIGNlbnRlclkgLSBub3RlU2l6ZSAvIDIsIG5vdGVTaXplLCBub3RlU2l6ZSAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5vdGVFbmRPZmZzZXQobm90ZUVuZFk6IG51bWJlciwgZHJhd0VuZFk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlcjtcclxuICAgICAgICBpZiAoZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24gPT09IFNjcm9sbERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBub3RlRW5kWSAtIGRyYXdFbmRZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IGRyYXdFbmRZIC0gbm90ZUVuZFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIHByZXZlbnRzIHRoZSBwYXJ0aWFsIHRpbGUgdGV4dHVyZSBmcm9tIHN0cmV0Y2hpbmcgd2hlbiB0aGUgcGxheWVyIGhpdHMgYSBob2xkIGVhcmx5XHJcbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoMCwgb2Zmc2V0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdDb21wbGV0ZVRpbGVzKGNlbnRlclg6IG51bWJlciwgbGVhc3RZOiBudW1iZXIsIHNjYWxlZFdpZHRoOiBudW1iZXIsIHNjYWxlZEhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1UaWxlczogbnVtYmVyLCBpc1JldmVyc2VkOiBib29sZWFuLCBwOiBwNSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVGlsZXM7IGkrKykge1xyXG4gICAgICAgICAgICBwLnB1c2goKTtcclxuICAgICAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclkgPSBsZWFzdFkgKyBpICogc2NhbGVkSGVpZ2h0ICsgc2NhbGVkSGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgcC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgICAgIGlmIChpc1JldmVyc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBwLnJvdGF0ZSgxODApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtc2NhbGVkSGVpZ2h0IC8gMiwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCk7XHJcbiAgICAgICAgICAgIHAucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1BhcnRpYWxUaWxlKGNlbnRlclg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgc2NhbGVkV2lkdGg6IG51bWJlciwgc2NhbGVkSGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aDogbnVtYmVyLCBzb3VyY2VIZWlnaHQ6IG51bWJlciwgaGVpZ2h0UGVyY2VudDogbnVtYmVyLCBpc0RyYXduRnJvbUJvdHRvbTogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXZlcnNlZDogYm9vbGVhbiwgcDogcDUpIHtcclxuICAgICAgICBpZiAoaGVpZ2h0UGVyY2VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHAucHVzaCgpO1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbkhlaWdodCA9IGhlaWdodFBlcmNlbnQgKiBzY2FsZWRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSB0b3BMZWZ0WSArIGRlc3RpbmF0aW9uSGVpZ2h0IC8gMjtcclxuICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICBpZiAoaXNSZXZlcnNlZCkge1xyXG4gICAgICAgICAgICBwLmFuZ2xlTW9kZShwLkRFR1JFRVMpO1xyXG4gICAgICAgICAgICBwLnJvdGF0ZSgxODApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNEcmF3bkZyb21Cb3R0b20pIHsgLy8gRHJhdyBmcm9tIHRoZSBib3R0b20gb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgIHAuaW1hZ2UodGhpcy5jb25uZWN0b3JUaWxlLCAtc2NhbGVkV2lkdGggLyAyLCAtZGVzdGluYXRpb25IZWlnaHQgLyAyLCBzY2FsZWRXaWR0aCxcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSGVpZ2h0LCAwLCBzb3VyY2VIZWlnaHQgLSBoZWlnaHRQZXJjZW50ICogc291cmNlSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgc291cmNlV2lkdGgsIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIERyYXcgZnJvbSB0aGUgdG9wIG9mIHRoZSBpbWFnZVxyXG4gICAgICAgICAgICBwLmltYWdlKHRoaXMuY29ubmVjdG9yVGlsZSwgLXNjYWxlZFdpZHRoIC8gMiwgLWRlc3RpbmF0aW9uSGVpZ2h0IC8gMiwgc2NhbGVkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkhlaWdodCwgMCwgMCwgc291cmNlV2lkdGgsIGhlaWdodFBlcmNlbnQgKiBzb3VyY2VIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0ltYWdlUm90YXRlZChpbWFnZTogcDUuSW1hZ2UsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIGxldCBub3RlU2l6ZSA9IGdsb2JhbC5jb25maWcubm90ZVNpemU7XHJcbiAgICAgICAgcC5wdXNoKCk7XHJcbiAgICAgICAgcC5hbmdsZU1vZGUocC5ERUdSRUVTKTtcclxuICAgICAgICBwLnRyYW5zbGF0ZShjZW50ZXJYLCBjZW50ZXJZKTtcclxuICAgICAgICB0aGlzLnJvdGF0ZShwLCB0cmFja051bWJlciwgbnVtVHJhY2tzKTtcclxuICAgICAgICBwLmltYWdlKGltYWdlLCAtbm90ZVNpemUgLyAyLCAtbm90ZVNpemUgLyAyLCBub3RlU2l6ZSwgbm90ZVNpemUpO1xyXG4gICAgICAgIHAucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByb3RhdGUocDogcDUsIHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BbmdsZXMuaGFzKG51bVRyYWNrcykpIHtcclxuICAgICAgICAgICAgcC5yb3RhdGUodGhpcy5yb3RhdGlvbkFuZ2xlcy5nZXQobnVtVHJhY2tzKVt0cmFja051bWJlcl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAucm90YXRlKHRoaXMuZ2V0RGVmYXVsdFJvdGF0aW9uQW5nbGVJbkRlZ3JlZXModHJhY2tOdW1iZXIsIG51bVRyYWNrcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRSb3RhdGlvbkFuZ2xlSW5EZWdyZWVzKHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJvdGF0aW9uID0gLTkwO1xyXG4gICAgICAgIGxldCByb3RhdGlvblBlclRyYWNrID0gMzYwIC8gbnVtVHJhY2tzO1xyXG4gICAgICAgIGlmICh0cmFja051bWJlciA8IG51bVRyYWNrcyAvIDIpIHtcclxuICAgICAgICAgICAgcm90YXRpb24gLT0gdHJhY2tOdW1iZXIgKiByb3RhdGlvblBlclRyYWNrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uICs9ICh0cmFja051bWJlciAtIG51bVRyYWNrcyAvIDIgKyAxKSAqIHJvdGF0aW9uUGVyVHJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3RhdGlvbjtcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge0tleWJvYXJkRXZlbnRNYW5hZ2VyfSBmcm9tIFwiLi9rZXlib2FyZF9ldmVudF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7UHJldmlld0Rpc3BsYXl9IGZyb20gXCIuL3ByZXZpZXdfZGlzcGxheVwiO1xyXG5pbXBvcnQge1BhZ2VNYW5hZ2VyfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVQcmV2aWV3Tm90ZXN9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHtOb3RlU2tpbn0gZnJvbSBcIi4vbm90ZV9za2luXCI7XHJcblxyXG5sZXQgd2lkdGggPSA3MjA7XHJcbmxldCBoZWlnaHQgPSA0ODA7XHJcblxyXG5leHBvcnQgY2xhc3MgUDVTY2VuZSB7XHJcbiAgICBza2V0Y2hJbnN0YW5jZTogcDU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5za2V0Y2hJbnN0YW5jZSA9IG5ldyBwNSgocDogcDUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlbmRlcmVyOiBwNS5SZW5kZXJlcjtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNlbnRlckNhbnZhcygpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcmVyLmNlbnRlcigpOyAvLyBEaXNhYmxlIHRoaXMgZm9yIG5vdyB0byBtYWtlIGVtYmVkZGluZyB3b3JrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHAucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5ub3RlU2tpbiA9IG5ldyBOb3RlU2tpbihcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9hcnJvd19ibHVlX3Jlc2l6ZS5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcC5sb2FkSW1hZ2UoXCIuLi9hc3NldHMvY29ubmVjdG9yX3RpbGVfcmVzaXplLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy90YWlsX3Jlc2l6ZS5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcC5sb2FkSW1hZ2UoXCIuLi9hc3NldHMvYXJyb3dfcmVjZXB0b3IucG5nXCIpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLnBsYXlGcm9tRmlsZUJhY2tncm91bmQgPSBwLmxvYWRJbWFnZShcIi4uL2Fzc2V0cy9wbGF5X2Zyb21fZmlsZV9iYWNrZ3JvdW5kLmpwZ1wiKTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5vcHRpb25zQmFja2dyb3VuZCA9IGdsb2JhbC5wbGF5RnJvbUZpbGVCYWNrZ3JvdW5kO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwLnNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIgPSBwLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIgPSBuZXcgS2V5Ym9hcmRFdmVudE1hbmFnZXIocCk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwucHJldmlld0Rpc3BsYXkgPSBuZXcgUHJldmlld0Rpc3BsYXkoZ2VuZXJhdGVQcmV2aWV3Tm90ZXMoNCksIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7IC8vIE1ha2VzIHRoZSBjYW52YXMgYmUgYWJsZSB0byBmaWxsIHRoZSB3aG9sZSBicm93c2VyIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgY2VudGVyQ2FudmFzKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwLmRyYXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5kcmF3KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwLndpbmRvd1Jlc2l6ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJDYW52YXMoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge1BsYXlGcm9tRmlsZX0gZnJvbSBcIi4vcGFnZXMvcGxheV9mcm9tX2ZpbGVcIjtcclxuaW1wb3J0IHtPcHRpb25zfSBmcm9tIFwiLi9wYWdlcy9vcHRpb25zXCI7XHJcbmltcG9ydCB7UGxheX0gZnJvbSBcIi4vcGFnZXMvcGxheVwiO1xyXG5pbXBvcnQge1Jlc3VsdHN9IGZyb20gXCIuL3BhZ2VzL3Jlc3VsdHNcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi9kb21fd3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGVudW0gUEFHRVMge1xyXG4gICAgUExBWV9GUk9NX0ZJTEUsXHJcbiAgICBPUFRJT05TLFxyXG4gICAgUExBWSxcclxuICAgIFJFU1VMVFMsXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYWdlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjdXJyZW50U2NlbmU6IFBBR0VTID0gUEFHRVMuUExBWV9GUk9NX0ZJTEU7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDdXJyZW50U2NlbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0Q3VycmVudFNjZW5lKHNjZW5lOiBQQUdFUykge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgRE9NV3JhcHBlci5jbGVhclJlZ2lzdHJ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJyZW50U2NlbmUpIHtcclxuICAgICAgICAgICAgY2FzZSBQQUdFUy5QTEFZX0ZST01fRklMRTpcclxuICAgICAgICAgICAgICAgIFBsYXlGcm9tRmlsZS5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQQUdFUy5PUFRJT05TOlxyXG4gICAgICAgICAgICAgICAgT3B0aW9ucy5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQQUdFUy5QTEFZOlxyXG4gICAgICAgICAgICAgICAgUGxheS5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQQUdFUy5SRVNVTFRTOlxyXG4gICAgICAgICAgICAgICAgUmVzdWx0cy5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgc2NlbmU6IFwiICsgZ2xvYmFsLmN1cnJlbnRTY2VuZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7U2Nyb2xsRGlyZWN0aW9ufSBmcm9tIFwiLi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmdIZWxwZXJ9IGZyb20gXCIuLi9rZXlfYmluZGluZ19oZWxwZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGNyZWF0ZUtleUJpbmRpbmdJbnB1dCwgY3JlYXRlTGFiZWxlZElucHV0LCBjcmVhdGVMYWJlbGVkU2VsZWN0LCBjcmVhdGVMYWJlbGVkVGV4dEFyZWEsXHJcbiAgICBkcmF3SGVhZGluZ1xyXG59IGZyb20gXCIuLi91aV91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHtcclxuICAgIGdlbmVyYXRlUHJldmlld05vdGVzLFxyXG4gICAgZ2V0S2V5QmluZGluZ0NvbnRhaW5lcklkLFxyXG4gICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzLFxyXG4gICAgaXNLZXlCaW5kaW5nc0RlZmluZWRcclxufSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwiLi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5pbXBvcnQge1ByZXZpZXdEaXNwbGF5fSBmcm9tIFwiLi4vcHJldmlld19kaXNwbGF5XCI7XHJcbmltcG9ydCB7RE9NV3JhcHBlcn0gZnJvbSBcIi4uL2RvbV93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3B0aW9ucyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIE9QVElPTlNfQ0xBU1M6IHN0cmluZyA9IFwib3B0aW9uc1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoZ2xvYmFsLm9wdGlvbnNCYWNrZ3JvdW5kKTtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsRGl2ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICB9LCBcInNjcm9sbERpdlwiKTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpdi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmFkZENsYXNzKFwib3B0aW9ucy1zY3JvbGwtZGl2XCIpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgICAgIHNjcm9sbERpdi5lbGVtZW50LnBvc2l0aW9uKGNhbnZhc1Bvc2l0aW9uLnggKyAzMzUsIGNhbnZhc1Bvc2l0aW9uLnkgKyA0NSk7XHJcblxyXG4gICAgICAgIGxldCBwYXVzZUF0U3RhcnRJblNlY29uZHNJbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlBhdXNlIGF0IFN0YXJ0IChzZWMpXCIsIFwicGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gcGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpICYmIHZhbHVlID49IDApIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGF1c2VBdFN0YXJ0SW5TZWNvbmRzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXBhdXNlQXRTdGFydEluU2Vjb25kc0lucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQocGF1c2VBdFN0YXJ0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsU3BlZWRJbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIlNjcm9sbCBTcGVlZCAocHgvc2VjKVwiLCBcInNjcm9sbFNwZWVkSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5waXhlbHNQZXJTZWNvbmQudG9TdHJpbmcoKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHNjcm9sbFNwZWVkSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBzY3JvbGxTcGVlZElucHV0LmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHZhbHVlKSAmJiB2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcucGl4ZWxzUGVyU2Vjb25kID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbFNwZWVkSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChzY3JvbGxTcGVlZElucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbERpcmVjdGlvblNlbGVjdCA9IGNyZWF0ZUxhYmVsZWRTZWxlY3QoXCJTY3JvbGwgRGlyZWN0aW9uXCIsIFwic2Nyb2xsRGlyZWN0aW9uU2VsZWN0XCIsXHJcbiAgICAgICAgICAgIFNjcm9sbERpcmVjdGlvbiwgZ2xvYmFsLmNvbmZpZy5zY3JvbGxEaXJlY3Rpb24sIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhzY3JvbGxEaXJlY3Rpb25TZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoc2Nyb2xsRGlyZWN0aW9uU2VsZWN0LmVsZW1lbnQudmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGxldCBlbnVtT2ZWYWx1ZSA9IFNjcm9sbERpcmVjdGlvblt2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgU2Nyb2xsRGlyZWN0aW9uXTtcclxuICAgICAgICAgICAgaWYgKGVudW1PZlZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID0gZW51bU9mVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXNjcm9sbERpcmVjdGlvblNlbGVjdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHNjcm9sbERpcmVjdGlvblNlbGVjdC5lbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNlcHRvclBvc2l0aW9uSW5wdXQgPSBjcmVhdGVMYWJlbGVkSW5wdXQoXCJSZWNlcHRvciBQb3NpdGlvbiAoJSlcIiwgXCJyZWNlcHRvclBvc2l0aW9uSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5yZWNlcHRvcllQZXJjZW50LnRvU3RyaW5nKCksIE9wdGlvbnMuT1BUSU9OU19DTEFTUyk7XHJcbiAgICAgICAgc2V0T25JbnB1dFVubGVzc0l0QWxyZWFkeUV4aXN0cyhyZWNlcHRvclBvc2l0aW9uSW5wdXQsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSByZWNlcHRvclBvc2l0aW9uSW5wdXQuZWxlbWVudC52YWx1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwuY29uZmlnLnJlY2VwdG9yWVBlcmNlbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcmVjZXB0b3JQb3NpdGlvbklucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQocmVjZXB0b3JQb3NpdGlvbklucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFkZGl0aW9uYWxPZmZzZXRJblNlY29uZHNJbnB1dCA9IGNyZWF0ZUxhYmVsZWRJbnB1dChcIkFjY3VyYWN5IE9mZnNldCAobXMpXCIsIFwiYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0XCIsXHJcbiAgICAgICAgICAgIGdsb2JhbC5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcy50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIHNldE9uSW5wdXRVbmxlc3NJdEFscmVhZHlFeGlzdHMoYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gYWRkaXRpb25hbE9mZnNldEluU2Vjb25kc0lucHV0LmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNvbmZpZy5hZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzID0gdmFsdWUgLyAxMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICBzY3JvbGxEaXYuZWxlbWVudC5jaGlsZChhZGRpdGlvbmFsT2Zmc2V0SW5TZWNvbmRzSW5wdXQuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWNjdXJhY3lTZXR0aW5nc0lucHV0ID0gY3JlYXRlTGFiZWxlZFRleHRBcmVhKFwiQWNjdXJhY3kgU2V0dGluZ3NcIiwgXCJhY2N1cmFjeVNldHRpbmdzSW5wdXRcIixcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2xvYmFsLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLCBudWxsLCAzKSwgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGFjY3VyYWN5U2V0dGluZ3NJbnB1dCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bWJlciA9IGFjY3VyYWN5U2V0dGluZ3NJbnB1dC5lbGVtZW50LnZhbHVlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdID0gcGFyc2VBY2N1cmFjeVNldHRpbmdzSnNvbih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3QWNjdXJhY3lTZXR0aW5ncyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5jb25maWcuYWNjdXJhY3lTZXR0aW5ncyA9IG5ld0FjY3VyYWN5U2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmICghYWNjdXJhY3lTZXR0aW5nc0lucHV0LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoYWNjdXJhY3lTZXR0aW5nc0lucHV0LmVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGtleUJpbmRpbmdzU2VjdGlvbkhlYWRlciA9IGNyZWF0ZUtleUJpbmRpbmdzU2VjdGlvbkhlYWRlcigpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ3NTZWN0aW9uSGVhZGVyLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBnbG9iYWwucHJldmlld051bVRyYWNrcyA9IDQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcmV2aWV3TnVtVHJhY2tzID0gY3JlYXRlTGFiZWxlZElucHV0KFwiTnVtYmVyIG9mIFRyYWNrc1wiLCBcInByZXZpZXdOdW1UcmFja3NJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwucHJldmlld051bVRyYWNrcy50b1N0cmluZygpLCBPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKHByZXZpZXdOdW1UcmFja3MsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSBwcmV2aWV3TnVtVHJhY2tzLmVsZW1lbnQudmFsdWUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpICYmIHZhbHVlID4gMCAmJiB2YWx1ZSA8PSAyNikge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlT2xkQmluZGluZ0J1dHRvbnMoZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MpO1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbC5wcmV2aWV3RGlzcGxheSA9IG5ldyBQcmV2aWV3RGlzcGxheShnZW5lcmF0ZVByZXZpZXdOb3Rlcyh2YWx1ZSksIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcHJldmlld051bVRyYWNrcy5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKHByZXZpZXdOdW1UcmFja3MuZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJLZXlCaW5kaW5ncyBRdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgIH0sIFwia2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uXCIpO1xyXG4gICAgICAgIGlmICgha2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAgICAga2V5QmluZGluZ3NRdWlja3N0YXJ0QnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoXCJrZXliaW5kaW5ncy1xdWlja3N0YXJ0XCIpO1xyXG4gICAgICAgICAgICBrZXlCaW5kaW5nc1F1aWNrc3RhcnRCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5YmluZGluZ0hlbHBlciA9IG5ldyBLZXlCaW5kaW5nSGVscGVyKGdsb2JhbC5wcmV2aWV3TnVtVHJhY2tzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRoaXMgYWN0aW9uIHRvIHRoZSBcIi0xXCIga2V5IHNvIHRoYXQgaXQgaGFwcGVucyBvbiBhbnkga2V5IHByZXNzXHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKC0xLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5YmluZGluZ0hlbHBlci5iaW5kTmV4dChwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5lbGVtZW50LmNoaWxkKGtleUJpbmRpbmdzUXVpY2tzdGFydEJ1dHRvbi5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNLZXlCaW5kaW5nc0RlZmluZWQoZ2xvYmFsLnByZXZpZXdOdW1UcmFja3MpKSB7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVLZXlCaW5kaW5ncyhnbG9iYWwucHJldmlld051bVRyYWNrcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHRyYWNrTnVtYmVyID0gMDsgdHJhY2tOdW1iZXIgPCBnbG9iYWwucHJldmlld051bVRyYWNrczsgdHJhY2tOdW1iZXIrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZ0lucHV0ID0gY3JlYXRlS2V5QmluZGluZ0lucHV0KHRyYWNrTnVtYmVyLCBnbG9iYWwucHJldmlld051bVRyYWNrcywgT3B0aW9ucy5PUFRJT05TX0NMQVNTKTtcclxuICAgICAgICAgICAgaWYgKCFrZXlCaW5kaW5nSW5wdXQuYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsRGl2LmVsZW1lbnQuY2hpbGQoa2V5QmluZGluZ0lucHV0LmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbG9iYWwucHJldmlld0Rpc3BsYXkuZHJhdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVLZXlCaW5kaW5nc1NlY3Rpb25IZWFkZXIoKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5odG1sKFxyXG4gICAgICAgICAgICAnS2V5IEJpbmRpbmdzIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjEycHhcIj4odHJhY2sgMSBpcyB0aGUgbGVmdG1vc3QgdHJhY2spPC9zcGFuPidcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhcIm9wdGlvbnMtZnJlZS10ZXh0XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhPcHRpb25zLk9QVElPTlNfQ0xBU1MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBcImtleUJpbmRpbmdzU2VjdGlvbkhlYWRlclwiKTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRPbklucHV0VW5sZXNzSXRBbHJlYWR5RXhpc3RzKGlucHV0RWxlbWVudDogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0sIG9uSW5wdXQ6ICgpID0+IHZvaWQpIHtcclxuICAgIGlmICghaW5wdXRFbGVtZW50LmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmVsZW1lbnQuaW5wdXQob25JbnB1dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZU9sZEJpbmRpbmdCdXR0b25zKG51bVRyYWNrczogbnVtYmVyKSB7XHJcbiAgICBmb3IgKGxldCB0cmFja051bWJlciA9IDA7IHRyYWNrTnVtYmVyIDwgbnVtVHJhY2tzOyB0cmFja051bWJlcisrKSB7XHJcbiAgICAgICAgRE9NV3JhcHBlci5yZW1vdmVFbGVtZW50QnlJZChnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUFjY3VyYWN5U2V0dGluZ3NKc29uKGFjY3VyYWN5U2V0dGluZ3NKc29uOiBzdHJpbmcpOiBBY2N1cmFjeVtdIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5U2V0dGluZ3M6IEFjY3VyYWN5W10gPSBbXVxyXG4gICAgICAgIGxldCBqc29uQXJyYXk6IEFjY3VyYWN5W10gPSBKU09OLnBhcnNlKGFjY3VyYWN5U2V0dGluZ3NKc29uKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpzb25BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWNjdXJhY3kgPSBqc29uQXJyYXlbaV07XHJcbiAgICAgICAgICAgIC8vIHRoaXMgZmFpbHMgaWYgdGhlIHVzZXIgZ2F2ZSB0aGUgd3JvbmcgaW5wdXRcclxuICAgICAgICAgICAgYWNjdXJhY3lTZXR0aW5ncy5wdXNoKG5ldyBBY2N1cmFjeShhY2N1cmFjeS5uYW1lLCBhY2N1cmFjeS5sb3dlckJvdW5kLCBhY2N1cmFjeS51cHBlckJvdW5kKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2N1cmFjeVNldHRpbmdzO1xyXG4gICAgfSBjYXRjaCAoZSkge31cclxuICAgIHJldHVybiBudWxsO1xyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsYXkge1xyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KCkge1xyXG4gICAgICAgIGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlLmJhY2tncm91bmQoXCJibGFja1wiKTtcclxuICAgICAgICBnbG9iYWwucGxheWluZ0Rpc3BsYXkuZHJhdygpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2RyYXdIZWFkaW5nLCBzZXRFbGVtZW50Q2VudGVyUG9zaXRpb25SZWxhdGl2ZSwgY3JlYXRlRmlsZUlucHV0fSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQge2dsb2JhbH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7U3RlcGZpbGVTdGF0ZX0gZnJvbSBcIi4uL3N0ZXBmaWxlXCI7XHJcbmltcG9ydCB7QXVkaW9GaWxlU3RhdGV9IGZyb20gXCIuLi9hdWRpb19maWxlXCI7XHJcbmltcG9ydCB7Z2V0TW9kZU9wdGlvbnNGb3JEaXNwbGF5fSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQge1BsYXlpbmdEaXNwbGF5fSBmcm9tIFwiLi4vcGxheWluZ19kaXNwbGF5XCI7XHJcbmltcG9ydCB7TW9kZSwgTm90ZX0gZnJvbSBcIi4uL3BhcnNpbmdcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF5RnJvbUZpbGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBQTEFZX0ZST01fRklMRV9DTEFTUzogc3RyaW5nID0gXCJwbGF5LWZyb20tZmlsZVwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBkcmF3SGVhZGluZygpO1xyXG4gICAgICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgICAgIHAuYmFja2dyb3VuZChnbG9iYWwucGxheUZyb21GaWxlQmFja2dyb3VuZCk7XHJcblxyXG4gICAgICAgIGxldCBzdGVwZmlsZUlucHV0ID0gY3JlYXRlRmlsZUlucHV0KGdldFN0ZXBmaWxlSW5wdXRMYWJlbCgpLCBcIkNob29zZSBTdGVwZmlsZSAoLnNtKVwiLCBcInN0ZXBmaWxlSW5wdXRcIixcclxuICAgICAgICAgICAgZ2xvYmFsLnN0ZXBmaWxlLmxvYWQuYmluZChnbG9iYWwuc3RlcGZpbGUpLCBQbGF5RnJvbUZpbGUuUExBWV9GUk9NX0ZJTEVfQ0xBU1MpLmVsZW1lbnQ7XHJcbiAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUoc3RlcGZpbGVJbnB1dCwgMC40MywgMC4zLCAyNjgsIDM0KTtcclxuXHJcbiAgICAgICAgbGV0IGF1ZGlvRmlsZUlucHV0ID0gY3JlYXRlRmlsZUlucHV0KGdldEF1ZGlvRmlsZUlucHV0TGFiZWwoKSwgXCJDaG9vc2UgQXVkaW8gRmlsZSAoLm1wMywgLm9nZylcIiwgXCJhdWRpb0ZpbGVJbnB1dFwiLFxyXG4gICAgICAgICAgICBnbG9iYWwuYXVkaW9GaWxlLmxvYWQuYmluZChnbG9iYWwuYXVkaW9GaWxlKSwgUGxheUZyb21GaWxlLlBMQVlfRlJPTV9GSUxFX0NMQVNTKS5lbGVtZW50O1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGF1ZGlvRmlsZUlucHV0LCAwLjQzLCAwLjQ1LCAzMjUsIDM0KTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXlCdXR0b25JZCA9IFwicGxheUJ1dHRvblwiO1xyXG4gICAgICAgIGxldCBtb2RlUmFkaW9JZCA9IFwibW9kZVJhZGlvXCI7XHJcbiAgICAgICAgaWYgKGlzRmlsZXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlUmFkaW8gPSBkcmF3TW9kZVNlbGVjdChwLCBtb2RlUmFkaW9JZCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RlUmFkaW8udmFsdWUoKSAhPT0gXCJcIikgeyAvLyB1c2VyIGhhcyBzZWxlY3RlZCBhIG1vZGVcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5QnV0dG9uID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmNyZWF0ZUJ1dHRvbihcIlBsYXlcIik7XHJcbiAgICAgICAgICAgICAgICB9LCBwbGF5QnV0dG9uSWQpO1xyXG4gICAgICAgICAgICAgICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUocGxheUJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuODgsIDYwLCAzNCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdXR0b24uZWxlbWVudC5tb3VzZUNsaWNrZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RlOiBNb2RlID0gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5zdGVwZmlsZS5maW5pc2hQYXJzaW5nKHNlbGVjdGVkTW9kZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRQbGF5aW5nRGlzcGxheShnbG9iYWwuc3RlcGZpbGUuZnVsbFBhcnNlLnRyYWNrcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2VNYW5hZ2VyLnNldEN1cnJlbnRTY2VuZShQQUdFUy5QTEFZKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQocGxheUJ1dHRvbklkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTVdyYXBwZXIucmVtb3ZlRWxlbWVudEJ5SWQobW9kZVJhZGlvSWQpO1xyXG4gICAgICAgICAgICBET01XcmFwcGVyLnJlbW92ZUVsZW1lbnRCeUlkKHBsYXlCdXR0b25JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL2Rpc2NvdXJzZS5wcm9jZXNzaW5nLm9yZy90L2hvdy10by1vcmdhbml6ZS1yYWRpby1idXR0b25zLWluLXNlcGFyYXRlLWxpbmVzLzEwMDQxLzVcclxuZnVuY3Rpb24gZW5jbG9zZUVhY2hJbnB1dExhYmVsUGFpckludG9BU3ViRGl2KHA6IHA1LCByYWRpb0RpdlA1RWxlbWVudDogcDUuRWxlbWVudCkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgaW5wdXRzID0gcC5zZWxlY3RBbGwoJ2lucHV0JywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgbGFiZWxzID0gcC5zZWxlY3RBbGwoJ2xhYmVsJywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgY29uc3QgbGVuID0gaW5wdXRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgcC5jcmVhdGVEaXYoKS5wYXJlbnQocmFkaW9EaXZQNUVsZW1lbnQpLmNoaWxkKGlucHV0c1tpXSkuY2hpbGQobGFiZWxzW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gaHR0cHM6Ly9kaXNjb3Vyc2UucHJvY2Vzc2luZy5vcmcvdC9ob3ctdG8tb3JnYW5pemUtcmFkaW8tYnV0dG9ucy1pbi1zZXBhcmF0ZS1saW5lcy8xMDA0MS81XHJcbmZ1bmN0aW9uIGZpeFJhZGlvRGl2RWxlbWVudChyYWRpb0RpdlA1RWxlbWVudDogcDUuRWxlbWVudCkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgcmFkaW9EaXZQNUVsZW1lbnQuX2dldElucHV0Q2hpbGRyZW5BcnJheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0eWxlTW9kZU9wdGlvbnMocDogcDUsIHJhZGlvRGl2UDVFbGVtZW50OiBwNS5FbGVtZW50LCBzdHlsZUNsYXNzZXM6IHN0cmluZ1tdKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBsZXQgZGl2czogcDUuRWxlbWVudFtdID0gcC5zZWxlY3RBbGwoJ2RpdicsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkaXZzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGl2c1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGxldCBpbnB1dHM6IHA1LkVsZW1lbnRbXSA9IHAuc2VsZWN0QWxsKCdpbnB1dCcsIHJhZGlvRGl2UDVFbGVtZW50KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbnB1dHNbaV0uYWRkQ2xhc3Moc3R5bGVDbGFzc2VzLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBsZXQgbGFiZWxzOiBwNS5FbGVtZW50W10gID0gcC5zZWxlY3RBbGwoJ2xhYmVsJywgcmFkaW9EaXZQNUVsZW1lbnQpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxhYmVsc1tpXS5hZGRDbGFzcyhzdHlsZUNsYXNzZXMuam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3TW9kZVNlbGVjdChwOiBwNSwgdW5pcXVlSWQ6IHN0cmluZyk6IHA1LkVsZW1lbnQge1xyXG4gICAgcC5wdXNoKCk7XHJcbiAgICBpZiAoZ2xvYmFsLnBhZ2UxTW9kZU9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGdsb2JhbC5wYWdlMU1vZGVPcHRpb25zID0gZ2V0TW9kZU9wdGlvbnNGb3JEaXNwbGF5KGdsb2JhbC5zdGVwZmlsZS5wYXJ0aWFsUGFyc2UubW9kZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtb2RlUmFkaW9DbGFzcyA9IFwibW9kZS1yYWRpb1wiXHJcbiAgICBsZXQgbW9kZVJhZGlvT3B0aW9uQ2xhc3MgPSBcIm1vZGUtcmFkaW8tb3B0aW9uXCI7XHJcbiAgICBsZXQgbW9kZVJhZGlvQ3JlYXRlUmVzdWx0ID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwLmNyZWF0ZVJhZGlvKCk7XHJcbiAgICB9LCB1bmlxdWVJZCk7XHJcbiAgICBsZXQgbW9kZVJhZGlvID0gbW9kZVJhZGlvQ3JlYXRlUmVzdWx0LmVsZW1lbnQ7XHJcbiAgICBpZiAoIW1vZGVSYWRpb0NyZWF0ZVJlc3VsdC5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnbG9iYWwucGFnZTFNb2RlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9kZSA9IGdsb2JhbC5wYWdlMU1vZGVPcHRpb25zW2ldO1xyXG4gICAgICAgICAgICBsZXQgcmFkaW9MYWJlbCA9IG1vZGUudHlwZSArIFwiLCBcIiArIG1vZGUuZGlmZmljdWx0eSArIFwiLCBcIiArIG1vZGUubWV0ZXI7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGV0IHJhZGlvT3B0aW9uID0gbW9kZVJhZGlvLm9wdGlvbihyYWRpb0xhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHZhbHVlIHRoaXMgd2F5IGJlY2F1c2UgdGhlIHR3by1hcmd1bWVudCAub3B0aW9uIG1ldGhvZCB3YXNuJ3Qgd29ya2luZ1xyXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSB2YWx1ZSBpcyBuZWNlc3Nhcnkgc28gd2UgY2FuIGFjY2VzcyB0aGUgc2VsZWN0ZWQgbW9kZVxyXG4gICAgICAgICAgICByYWRpb09wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIHN0eWxlIGlzIGJlaW5nIHNldCBvbiB0aGUgZGl2IGNvbnRhaW5pbmcgdGhlIHJhZGlvIGVsZW1lbnRzIHRvIG1ha2UgaXQgYSBzY3JvbGxhYmxlIGJveFxyXG4gICAgICAgIG1vZGVSYWRpby5hZGRDbGFzcyhtb2RlUmFkaW9DbGFzcyk7XHJcbiAgICAgICAgbW9kZVJhZGlvLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGVuY2xvc2VFYWNoSW5wdXRMYWJlbFBhaXJJbnRvQVN1YkRpdihwLCBtb2RlUmFkaW8pO1xyXG4gICAgICAgIGZpeFJhZGlvRGl2RWxlbWVudChtb2RlUmFkaW8pO1xyXG4gICAgICAgIHN0eWxlTW9kZU9wdGlvbnMocCwgbW9kZVJhZGlvLCBbbW9kZVJhZGlvT3B0aW9uQ2xhc3MsIGdsb2JhbC5nbG9iYWxDbGFzc10pO1xyXG4gICAgfVxyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUobW9kZVJhZGlvLCAwLjUsIDAuNywgMzAyLCAxMjApO1xyXG4gICAgcC5wb3AoKTtcclxuICAgIHJldHVybiBtb2RlUmFkaW87XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRmlsZXNSZWFkeSgpIHtcclxuICAgIGxldCBzdGVwZmlsZVJlYWR5ID0gZ2xvYmFsLnN0ZXBmaWxlLnN0YXRlID09PSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQgfHxcclxuICAgICAgICBnbG9iYWwuc3RlcGZpbGUuc3RhdGUgPT09IFN0ZXBmaWxlU3RhdGUuRlVMTFlfUEFSU0VEO1xyXG4gICAgbGV0IGF1ZGlvRmlsZVJlYWR5ID0gZ2xvYmFsLmF1ZGlvRmlsZS5zdGF0ZSA9PT0gQXVkaW9GaWxlU3RhdGUuQlVGRkVSRUQ7XHJcbiAgICByZXR1cm4gc3RlcGZpbGVSZWFkeSAmJiBhdWRpb0ZpbGVSZWFkeTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFBsYXlpbmdEaXNwbGF5KHRyYWNrczogTm90ZVtdW10pIHtcclxuICAgIGdsb2JhbC5wbGF5aW5nRGlzcGxheSA9IG5ldyBQbGF5aW5nRGlzcGxheSh0cmFja3MsIGdsb2JhbC5jb25maWcsIGdsb2JhbC5wNVNjZW5lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0ZWRNb2RlKG1vZGVSYWRpbzogcDUuRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGdsb2JhbC5wYWdlMU1vZGVPcHRpb25zW21vZGVSYWRpby52YWx1ZSgpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RlcGZpbGVJbnB1dExhYmVsKCkge1xyXG4gICAgc3dpdGNoKGdsb2JhbC5zdGVwZmlsZS5zdGF0ZSkge1xyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5OT19TSU1GSUxFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJObyBmaWxlIGNob3NlblwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFN0ZXBmaWxlU3RhdGUuRE9ORV9SRUFESU5HOlxyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEOlxyXG4gICAgICAgIGNhc2UgU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKGdsb2JhbC5zdGVwZmlsZS5maWxlLm5hbWUsIDMwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3JcIjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXVkaW9GaWxlSW5wdXRMYWJlbCgpIHtcclxuICAgIHN3aXRjaChnbG9iYWwuYXVkaW9GaWxlLnN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBBdWRpb0ZpbGVTdGF0ZS5OT19BVURJT19GSUxFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJObyBmaWxlIGNob3NlblwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLkRPTkVfUkVBRElORzpcclxuICAgICAgICBjYXNlIEF1ZGlvRmlsZVN0YXRlLkJVRkZFUkVEOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1bmNhdGVGaWxlTmFtZUlmVG9vTG9uZyhnbG9iYWwuYXVkaW9GaWxlLmZpbGUubmFtZSwgMzApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0cnVuY2F0ZUZpbGVOYW1lSWZUb29Mb25nKGZ1bGxGaWxlTmFtZTogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlcikge1xyXG4gICAgaWYgKGZ1bGxGaWxlTmFtZS5sZW5ndGggPD0gbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bGxGaWxlTmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdWxsRmlsZU5hbWUuc3Vic3RyKDAsIG1heExlbmd0aCAtIDExKSArXHJcbiAgICAgICAgXCIuLi5cIiArXHJcbiAgICAgICAgZnVsbEZpbGVOYW1lLnN1YnN0cihmdWxsRmlsZU5hbWUubGVuZ3RoIC0gMTApO1xyXG59IiwiaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge3NldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlfSBmcm9tIFwiLi4vdWlfdXRpbFwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtQYWdlTWFuYWdlciwgUEFHRVN9IGZyb20gXCIuLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtET01XcmFwcGVyfSBmcm9tIFwiLi4vZG9tX3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXN1bHRzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgICAgICBwLmJhY2tncm91bmQoXCJibGFja1wiKTtcclxuXHJcbiAgICAgICAgZ2xvYmFsLnJlc3VsdHNEaXNwbGF5LmRyYXcoKTtcclxuXHJcbiAgICAgICAgbGV0IHJldHVybkJ1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUmV0dXJuXCIpO1xyXG4gICAgICAgIH0sIFwicmV0dXJuQnV0dG9uXCIpO1xyXG4gICAgICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHJldHVybkJ1dHRvbi5lbGVtZW50LCAwLjUsIDAuOSwgNzMsIDM0KTtcclxuICAgICAgICBpZiAoIXJldHVybkJ1dHRvbi5hbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHJldHVybkJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybkJ1dHRvbi5lbGVtZW50Lm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBQYWdlTWFuYWdlci5zZXRDdXJyZW50U2NlbmUoUEFHRVMuUExBWV9GUk9NX0ZJTEUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUGFydGlhbFBhcnNlIHtcclxuICAgIG1ldGFEYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgbW9kZXM6IE1hcDxzdHJpbmcsIHN0cmluZz5bXTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTm90ZVR5cGUge1xyXG4gICAgTk9ORSA9IFwiMFwiLFxyXG4gICAgTk9STUFMID0gXCIxXCIsXHJcbiAgICBIT0xEX0hFQUQgPSBcIjJcIixcclxuICAgIFRBSUwgPSBcIjNcIixcclxuICAgIFJPTExfSEVBRCA9IFwiNFwiLFxyXG4gICAgTUlORSA9IFwiTVwiLFxyXG4gICAgVU5LTk9XTiA9IFwiPz8/XCIsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb05vdGVUeXBlKHN0cmluZzogc3RyaW5nKTogTm90ZVR5cGUge1xyXG4gICAgc3dpdGNoIChzdHJpbmcpIHtcclxuICAgICAgICBjYXNlIFwiMFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuTk9ORTtcclxuICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuTk9STUFMO1xyXG4gICAgICAgIGNhc2UgXCIyXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBOb3RlVHlwZS5IT0xEX0hFQUQ7XHJcbiAgICAgICAgY2FzZSBcIjNcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLlRBSUw7XHJcbiAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIE5vdGVUeXBlLlJPTExfSEVBRDtcclxuICAgICAgICBjYXNlIFwiTVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuTUlORTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gTm90ZVR5cGUuVU5LTk9XTjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTm90ZVN0YXRlIHtcclxuICAgIERFRkFVTFQsXHJcbiAgICBISVQsXHJcbiAgICBNSVNTRUQsXHJcbiAgICBIRUxELFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGUge1xyXG4gICAgdHlwZTogTm90ZVR5cGU7XHJcbiAgICB0eXBlU3RyaW5nOiBzdHJpbmc7IC8vIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUgQkVGT1JFIGl0J3MgaW50ZXJwcmV0ZWQgYXMgYSBOb3RlVHlwZVxyXG4gICAgdGltZUluU2Vjb25kczogbnVtYmVyO1xyXG4gICAgc3RhdGU/OiBOb3RlU3RhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RlIHtcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGlmZmljdWx0eTogc3RyaW5nO1xyXG4gICAgcHVibGljIG1ldGVyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZ1bGxQYXJzZSB7XHJcbiAgICBtZXRhRGF0YTogTWFwPHN0cmluZywgc3RyaW5nPjtcclxuICAgIG1vZGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+W107XHJcbiAgICBvZmZzZXQ6IG51bWJlcjtcclxuICAgIGJwbXM6IFtudW1iZXIsIG51bWJlcl1bXTtcclxuICAgIHN0b3BzOiBbbnVtYmVyLCBudW1iZXJdW107XHJcbiAgICB0cmFja3M6IE5vdGVbXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcnRpYWxQYXJzZTogUGFydGlhbFBhcnNlKSB7XHJcbiAgICAgICAgdGhpcy5tZXRhRGF0YSA9IHBhcnRpYWxQYXJzZS5tZXRhRGF0YTtcclxuICAgICAgICB0aGlzLm1vZGVzID0gcGFydGlhbFBhcnNlLm1vZGVzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiBTdGVwIE9uZSBPZiBQYXJzaW5nICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJ0aWFsUGFyc2UoZmlsZUNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIGxldCBwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZSA9IG5ldyBQYXJ0aWFsUGFyc2UoKTtcclxuICAgIHBhcnRpYWxQYXJzZS5tZXRhRGF0YSA9IGdldFRvcE1ldGFEYXRhQXNTdHJpbmdzKGZpbGVDb250ZW50cyk7XHJcbiAgICBwYXJ0aWFsUGFyc2UubW9kZXMgPSBnZXRNb2Rlc0luZm9Bc1N0cmluZ3MoZmlsZUNvbnRlbnRzKTtcclxuICAgIHJldHVybiBwYXJ0aWFsUGFyc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvcE1ldGFEYXRhQXNTdHJpbmdzKGZpbGU6IHN0cmluZykge1xyXG4gICAgLy8gbWF0Y2ggYW55IG1ldGFkYXRhIHRhZyBleGNsdWRpbmcgdGhlIFwiTk9URVNcIiB0YWcgKGNhc2UtaW5zZW5zaXRpdmUpXHJcbiAgICBsZXQgcmUgPSAvIyg/IVtuTl1bb09dW3RUXVtlRV1bc1NdKShbXjpdKyk6KFteO10rKTsvZztcclxuICAgIGxldCBtYXRjaGVzID0gWy4uLmZpbGUubWF0Y2hBbGwocmUpXTtcclxuICAgIGxldCBtZXRhRGF0YTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtYXRjaCA9IG1hdGNoZXNbaV07XHJcbiAgICAgICAgbWV0YURhdGEuc2V0KGNsZWFuTWV0YURhdGFTdHJpbmcobWF0Y2hbMV0pLnRvVXBwZXJDYXNlKCksIGNsZWFuTWV0YURhdGFTdHJpbmcobWF0Y2hbMl0pKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtZXRhRGF0YTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TW9kZXNJbmZvQXNTdHJpbmdzKGZpbGVDb250ZW50czogc3RyaW5nKSB7XHJcbiAgICAvLyBHZXQgXCJOT1RFU1wiIHNlY3Rpb25zIChjYXNlLWluc2Vuc2l0aXZlKS4gVGhlIGZpcnN0IGZpdmUgdmFsdWVzIGFyZSBwb3N0Zml4ZWQgd2l0aCBhIGNvbG9uLlxyXG4gICAgLy8gTm90ZSBkYXRhIGNvbWVzIGxhc3QsIHBvc3RmaXhlZCBieSBhIHNlbWljb2xvbi5cclxuICAgIGxldCByZSA9IC8jW25OXVtvT11bdFRdW2VFXVtzU106KFteOl0qKTooW146XSopOihbXjpdKik6KFteOl0qKTooW146XSopOihbXjtdKzspL2c7XHJcbiAgICBsZXQgbWF0Y2hlcyA9IFsuLi5maWxlQ29udGVudHMubWF0Y2hBbGwocmUpXTtcclxuICAgIGxldCBtb2RlczogTWFwPHN0cmluZywgc3RyaW5nPltdID0gW107XHJcbiAgICBsZXQgZmllbGROYW1lcyA9IFtcInR5cGVcIiwgXCJkZXNjL2F1dGhvclwiLCBcImRpZmZpY3VsdHlcIiwgXCJtZXRlclwiLCBcInJhZGFyXCJdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWF0Y2hlc1tpXTtcclxuICAgICAgICBsZXQgbW9kZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IG1hdGNoLmxlbmd0aCAtIDE7IGorKykge1xyXG4gICAgICAgICAgICBtb2RlLnNldChmaWVsZE5hbWVzW2ogLSAxXSwgY2xlYW5NZXRhRGF0YVN0cmluZyhtYXRjaFtqXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb2RlLnNldChcIm5vdGVzXCIsIG1hdGNoW21hdGNoLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICBtb2Rlcy5wdXNoKG1vZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vZGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhbk1ldGFEYXRhU3RyaW5nKHN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHJpbmcudHJpbSgpLnJlcGxhY2UoL1xcbi9nLCBcIlwiKTtcclxufVxyXG5cclxuLyogU3RlcCBUd28gT2YgUGFyc2luZyAqL1xyXG5cclxuLy8gVE9ETzogYWN0dWFsbHkgcmV0dXJuIEZ1bGxQYXJzZVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbFBhcnNlKG1vZGVJbmRleDogbnVtYmVyLCBwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZSk6IEZ1bGxQYXJzZSB7XHJcbiAgICBsZXQgZnVsbFBhcnNlID0gbmV3IEZ1bGxQYXJzZShwYXJ0aWFsUGFyc2UpO1xyXG4gICAgbGV0IHVucGFyc2VkTm90ZXM6IHN0cmluZyA9IHBhcnRpYWxQYXJzZS5tb2Rlc1ttb2RlSW5kZXhdLmdldChcIm5vdGVzXCIpO1xyXG4gICAgbGV0IHVucGFyc2VkQXJyYXk6IHN0cmluZ1tdID0gdW5wYXJzZWROb3Rlcy5zcGxpdChcIlxcblwiKTtcclxuICAgIGxldCBtZWFzdXJlczogc3RyaW5nW11bXSA9IGdldE1lYXN1cmVzKHVucGFyc2VkQXJyYXkpO1xyXG4gICAgbGV0IGJlYXRzQW5kTGluZXM6IHsgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSA9IGdldEJlYXRJbmZvQnlMaW5lKG1lYXN1cmVzKTtcclxuICAgIGxldCBjbGVhbmVkQmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gcmVtb3ZlQmxhbmtMaW5lcyhiZWF0c0FuZExpbmVzKTtcclxuICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IHBhcnNlRmxvYXQocGFydGlhbFBhcnNlLm1ldGFEYXRhLmdldChcIk9GRlNFVFwiKSk7XHJcbiAgICBsZXQgYnBtczogeyBiZWF0OiBudW1iZXI7IGJwbTogbnVtYmVyIH1bXSA9IHBhcnNlQlBNUyhwYXJ0aWFsUGFyc2UubWV0YURhdGEuZ2V0KFwiQlBNU1wiKSk7XHJcbiAgICBsZXQgc3RvcHM6IHsgc3RvcER1cmF0aW9uOiBudW1iZXI7IGJlYXQ6IG51bWJlciB9W10gPSBwYXJzZVN0b3BzKHBhcnRpYWxQYXJzZS5tZXRhRGF0YS5nZXQoXCJTVE9QU1wiKSk7XHJcbiAgICBsZXQgdGltZXNCZWF0c0FuZExpbmVzOiB7IHRpbWU6IG51bWJlcjsgYmVhdDogbnVtYmVyOyBsaW5lSW5mbzogc3RyaW5nIH1bXSA9IGdldFRpbWVJbmZvQnlMaW5lKGNsZWFuZWRCZWF0c0FuZExpbmVzLCBvZmZzZXQsIGJwbXMsIHN0b3BzKTtcclxuICAgIGZ1bGxQYXJzZS50cmFja3MgPSBnZXRUcmFja3NGcm9tTGluZXModGltZXNCZWF0c0FuZExpbmVzKTtcclxuICAgIHJldHVybiBmdWxsUGFyc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1lYXN1cmVzKHVucGFyc2VkQXJyYXk6IHN0cmluZ1tdKSB7XHJcbiAgICBsZXQgbWVhc3VyZXM6IHN0cmluZ1tdW10gPSBbXTtcclxuICAgIGxldCBzdGF0ZSA9IDA7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgY3VycmVudE1lYXN1cmU6IHN0cmluZ1tdID0gW107XHJcbiAgICB3aGlsZSAoaSA8IHVucGFyc2VkQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lID0gdW5wYXJzZWRBcnJheVtpXTtcclxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudExpbmUuaW5jbHVkZXMoXCIvL1wiKSAmJiBjdXJyZW50TGluZS50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRMaW5lLmluY2x1ZGVzKFwiLFwiKSAmJiAhY3VycmVudExpbmUuaW5jbHVkZXMoXCI7XCIpICYmIGN1cnJlbnRMaW5lLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRNZWFzdXJlLnB1c2goY3VycmVudExpbmUudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlcy5wdXNoKGN1cnJlbnRNZWFzdXJlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRNZWFzdXJlID0gW107XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVhc3VyZXM7XHJcbn1cclxuXHJcbi8vIGFzc3VtZXMgNC80IHRpbWUgc2lnbmF0dXJlXHJcbmZ1bmN0aW9uIGdldEJlYXRJbmZvQnlMaW5lKG1lYXN1cmVzOiBzdHJpbmdbXVtdKSB7XHJcbiAgICBsZXQgYmVhdHNBbmRMaW5lcyA9IFtdO1xyXG4gICAgbGV0IGN1cnJlbnRCZWF0ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVhc3VyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbWVhc3VyZSA9IG1lYXN1cmVzW2ldO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWVhc3VyZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBiZWF0c0FuZExpbmVzLnB1c2goe2JlYXQ6IGN1cnJlbnRCZWF0LCBsaW5lSW5mbzogbWVhc3VyZVtqXX0pO1xyXG4gICAgICAgICAgICBjdXJyZW50QmVhdCArPSA0IC8gbWVhc3VyZS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJlYXRzQW5kTGluZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUJsYW5rTGluZXMoYmVhdHNBbmRMaW5lczogeyBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdKSB7XHJcbiAgICBsZXQgY2xlYW5lZEJlYXRzQW5kTGluZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmVhdHNBbmRMaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBsaW5lID0gYmVhdHNBbmRMaW5lc1tpXTtcclxuICAgICAgICBpZiAoIWlzQWxsWmVyb3MobGluZS5saW5lSW5mbykpIHtcclxuICAgICAgICAgICAgY2xlYW5lZEJlYXRzQW5kTGluZXMucHVzaChsaW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2xlYW5lZEJlYXRzQW5kTGluZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQWxsWmVyb3Moc3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHN0cmluZy5jaGFyQXQoaSkgIT09ICcwJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRpbWVJbmZvQnlMaW5lKGluZm9CeUxpbmU6IHsgYmVhdDogbnVtYmVyLCBsaW5lSW5mbzogc3RyaW5nIH1bXSwgb2Zmc2V0OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGJwbXM6IHsgYmVhdDogbnVtYmVyLCBicG06IG51bWJlciB9W10sIHN0b3BzOiB7IGJlYXQ6IG51bWJlciwgc3RvcER1cmF0aW9uOiBudW1iZXIgfVtdXHJcbik6IHsgdGltZTogbnVtYmVyLCBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdIHtcclxuICAgIGxldCBpbmZvQnlMaW5lV2l0aFRpbWU6IHsgdGltZTogbnVtYmVyLCBiZWF0OiBudW1iZXIsIGxpbmVJbmZvOiBzdHJpbmcgfVtdID0gW107XHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAtb2Zmc2V0ICsgZ2V0RWxhcHNlZFRpbWUoMCwgaW5mb0J5TGluZVswXS5iZWF0LCBicG1zLCBzdG9wcyk7XHJcbiAgICBpbmZvQnlMaW5lV2l0aFRpbWUucHVzaCh7dGltZTogY3VycmVudFRpbWUsIGJlYXQ6IGluZm9CeUxpbmVbMF0uYmVhdCwgbGluZUluZm86IGluZm9CeUxpbmVbMF0ubGluZUluZm99KTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaW5mb0J5TGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzdGFydEJlYXQgPSBpbmZvQnlMaW5lW2kgLSAxXS5iZWF0O1xyXG4gICAgICAgIGxldCBlbmRCZWF0ID0gaW5mb0J5TGluZVtpXS5iZWF0O1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IGdldEVsYXBzZWRUaW1lKHN0YXJ0QmVhdCwgZW5kQmVhdCwgYnBtcywgc3RvcHMpO1xyXG4gICAgICAgIGluZm9CeUxpbmVXaXRoVGltZS5wdXNoKHt0aW1lOiBjdXJyZW50VGltZSwgYmVhdDogaW5mb0J5TGluZVtpXS5iZWF0LCBsaW5lSW5mbzogaW5mb0J5TGluZVtpXS5saW5lSW5mb30pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZm9CeUxpbmVXaXRoVGltZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RWxhcHNlZFRpbWUoc3RhcnRCZWF0OiBudW1iZXIsIGVuZEJlYXQ6IG51bWJlciwgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHM6IHsgYmVhdDogbnVtYmVyLCBzdG9wRHVyYXRpb246IG51bWJlciB9W10pIHtcclxuICAgIGxldCBjdXJyZW50QlBNSW5kZXg6IG51bWJlciA9IGdldFN0YXJ0QlBNSW5kZXgoc3RhcnRCZWF0LCBicG1zKTtcclxuICAgIGxldCBlYXJsaWVzdEJlYXQ6IG51bWJlciA9IHN0YXJ0QmVhdDtcclxuICAgIGxldCBlbGFwc2VkVGltZTogbnVtYmVyID0gc3RvcHMgPT0gbnVsbCA/IDAgOiBzdG9wcGVkVGltZShzdGFydEJlYXQsIGVuZEJlYXQsIHN0b3BzKTtcclxuICAgIGRvIHtcclxuICAgICAgICBsZXQgbmV4dEJQTUNoYW5nZTogbnVtYmVyID0gZ2V0TmV4dEJQTUNoYW5nZShjdXJyZW50QlBNSW5kZXgsIGJwbXMpO1xyXG4gICAgICAgIGxldCBuZXh0QmVhdDogbnVtYmVyID0gTWF0aC5taW4oZW5kQmVhdCwgbmV4dEJQTUNoYW5nZSk7XHJcbiAgICAgICAgZWxhcHNlZFRpbWUgKz0gKG5leHRCZWF0IC0gZWFybGllc3RCZWF0KSAvIGJwbXNbY3VycmVudEJQTUluZGV4XS5icG0gKiA2MDtcclxuICAgICAgICBlYXJsaWVzdEJlYXQgPSBuZXh0QmVhdDtcclxuICAgICAgICBjdXJyZW50QlBNSW5kZXgrKztcclxuICAgIH0gd2hpbGUgKGVhcmxpZXN0QmVhdCA8IGVuZEJlYXQpO1xyXG4gICAgcmV0dXJuIGVsYXBzZWRUaW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdGFydEJQTUluZGV4KHN0YXJ0QmVhdDogbnVtYmVyLCBicG1zOiB7IGJlYXQ6IG51bWJlciwgYnBtOiBudW1iZXIgfVtdKSB7XHJcbiAgICBsZXQgc3RhcnRCUE1JbmRleCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGJwbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYnBtc1tpXS5iZWF0IDwgc3RhcnRCZWF0KSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QlBNSW5kZXggPSBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdGFydEJQTUluZGV4O1xyXG59XHJcblxyXG4vLyBkb2VzIE5PVCBzbmFwIHRvIG5lYXJlc3QgMS8xOTJuZCBvZiBiZWF0XHJcbmZ1bmN0aW9uIHN0b3BwZWRUaW1lKHN0YXJ0QmVhdDogbnVtYmVyLCBlbmRCZWF0OiBudW1iZXIsIHN0b3BzOiB7IGJlYXQ6IG51bWJlciwgc3RvcER1cmF0aW9uOiBudW1iZXIgfVtdKSB7XHJcbiAgICBsZXQgdGltZSA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3BzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHN0b3BCZWF0ID0gc3RvcHNbaV0uYmVhdDtcclxuICAgICAgICBpZiAoc3RhcnRCZWF0IDw9IHN0b3BCZWF0ICYmIHN0b3BCZWF0IDwgZW5kQmVhdCkge1xyXG4gICAgICAgICAgICB0aW1lICs9IHN0b3BzW2ldLnN0b3BEdXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGltZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TmV4dEJQTUNoYW5nZShjdXJyZW50QlBNSW5kZXg6IG51bWJlciwgYnBtczogeyBiZWF0OiBudW1iZXIsIGJwbTogbnVtYmVyIH1bXSkge1xyXG4gICAgaWYgKGN1cnJlbnRCUE1JbmRleCArIDEgPCBicG1zLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBicG1zW2N1cnJlbnRCUE1JbmRleCArIDFdLmJlYXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUcmFja3NGcm9tTGluZXModGltZXNCZWF0c0FuZExpbmVzOiB7IHRpbWU6IG51bWJlcjsgYmVhdDogbnVtYmVyOyBsaW5lSW5mbzogc3RyaW5nOyB9W10pIHtcclxuICAgIGxldCBudW1UcmFja3M6IG51bWJlciA9IHRpbWVzQmVhdHNBbmRMaW5lc1swXS5saW5lSW5mby5sZW5ndGg7XHJcbiAgICBsZXQgdHJhY2tzOiBOb3RlW11bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgIHRyYWNrcy5wdXNoKFtdKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZXNCZWF0c0FuZExpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGxpbmU6IHsgdGltZTogbnVtYmVyOyBiZWF0OiBudW1iZXI7IGxpbmVJbmZvOiBzdHJpbmcgfSA9IHRpbWVzQmVhdHNBbmRMaW5lc1tpXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUubGluZUluZm8ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHR5cGVTdHJpbmcgPSBsaW5lLmxpbmVJbmZvLmNoYXJBdChqKTtcclxuICAgICAgICAgICAgbGV0IG5vdGVUeXBlOiBOb3RlVHlwZSA9IHN0cmluZ1RvTm90ZVR5cGUodHlwZVN0cmluZyk7XHJcbiAgICAgICAgICAgIGlmIChub3RlVHlwZSAhPT0gTm90ZVR5cGUuTk9ORSkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tzW2pdLnB1c2goe3R5cGU6IG5vdGVUeXBlLCB0eXBlU3RyaW5nOiB0eXBlU3RyaW5nLCB0aW1lSW5TZWNvbmRzOiBsaW5lLnRpbWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cmFja3M7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQlBNUyhicG1TdHJpbmc6IHN0cmluZykge1xyXG4gICAgaWYgKGJwbVN0cmluZyA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgbGV0IGJwbUFycmF5OiBbbnVtYmVyLCBudW1iZXJdW10gPSBwYXJzZUZsb2F0RXF1YWxzRmxvYXRQYXR0ZXJuKGJwbVN0cmluZyk7XHJcbiAgICBsZXQgYnBtczogeyBiZWF0OiBudW1iZXI7IGJwbTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBicG1BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGJwbXMucHVzaCh7YmVhdDogYnBtQXJyYXlbaV1bMF0sIGJwbTogYnBtQXJyYXlbaV1bMV19KTtcclxuICAgIH1cclxuICAgIHJldHVybiBicG1zO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVN0b3BzKHN0b3BzU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGlmIChzdG9wc1N0cmluZyA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgbGV0IHN0b3BzQXJyYXk6IFtudW1iZXIsIG51bWJlcl1bXSA9IHBhcnNlRmxvYXRFcXVhbHNGbG9hdFBhdHRlcm4oc3RvcHNTdHJpbmcpO1xyXG4gICAgbGV0IHN0b3BzOiB7IHN0b3BEdXJhdGlvbjogbnVtYmVyOyBiZWF0OiBudW1iZXIgfVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3BzQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzdG9wcy5wdXNoKHtiZWF0OiBzdG9wc0FycmF5W2ldWzBdLCBzdG9wRHVyYXRpb246IHN0b3BzQXJyYXlbaV1bMV19KTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdG9wcztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VGbG9hdEVxdWFsc0Zsb2F0UGF0dGVybihzdHJpbmc6IHN0cmluZykge1xyXG4gICAgbGV0IHN0cmluZ0FycmF5OiBzdHJpbmdbXVtdID0gc3RyaW5nLnNwbGl0KFwiLFwiKS5tYXAoZSA9PiBlLnRyaW0oKS5zcGxpdChcIj1cIikpO1xyXG4gICAgbGV0IGFycmF5OiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5nQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBhcnJheS5wdXNoKFtwYXJzZUZsb2F0KHN0cmluZ0FycmF5W2ldWzBdKSwgcGFyc2VGbG9hdChzdHJpbmdBcnJheVtpXVsxXSldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxufSIsImV4cG9ydCBjbGFzcyBQbGF5ZXJLZXlBY3Rpb24ge1xyXG4gICAgZ2FtZVRpbWU6IG51bWJlcjtcclxuICAgIHRyYWNrOiBudW1iZXI7XHJcbiAgICBrZXlTdGF0ZTogS2V5U3RhdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZVRpbWU6IG51bWJlciwgdHJhY2s6IG51bWJlciwga2V5U3RhdGU6IEtleVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lVGltZSA9IGdhbWVUaW1lO1xyXG4gICAgICAgIHRoaXMudHJhY2sgPSB0cmFjaztcclxuICAgICAgICB0aGlzLmtleVN0YXRlID0ga2V5U3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEtleVN0YXRlIHtcclxuICAgIFVQLCBET1dOLFxyXG59IiwiaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge0Rpc3BsYXlNYW5hZ2VyfSBmcm9tIFwiLi9kaXNwbGF5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtOb3RlTWFuYWdlcn0gZnJvbSBcIi4vbm90ZV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7VGltZU1hbmFnZXJ9IGZyb20gXCIuL3RpbWVfbWFuYWdlclwiO1xyXG5pbXBvcnQge01pc3NNYW5hZ2VyfSBmcm9tIFwiLi9taXNzX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtTY3JvbGxNYW5hZ2VyfSBmcm9tIFwiLi9zY3JvbGxfbWFuYWdlclwiO1xyXG5pbXBvcnQge1Jlc3VsdHNEaXNwbGF5fSBmcm9tIFwiLi9yZXN1bHRzX2Rpc3BsYXlcIjtcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcbmltcG9ydCB7SG9sZE1hbmFnZXJ9IGZyb20gXCIuL2hvbGRfbWFuYWdlclwiO1xyXG5pbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7XHJcbiAgICBpbml0aWFsaXplS2V5QmluZGluZ3MsXHJcbiAgICBpc0tleUJpbmRpbmdzRGVmaW5lZCxcclxuICAgIHJlcGxhY2VOb3RZZXRJbXBsZW1lbnRlZE5vdGVUeXBlcyxcclxuICAgIHNldEFsbE5vdGVzVG9EZWZhdWx0U3RhdGVcclxufSBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleVN0YXRlLCBQbGF5ZXJLZXlBY3Rpb259IGZyb20gXCIuL3BsYXllcl9rZXlfYWN0aW9uXCI7XHJcbmltcG9ydCB7S2V5QmluZGluZ30gZnJvbSBcIi4va2V5X2JpbmRpbmdfaGVscGVyXCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZywgQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZX0gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcbmltcG9ydCB7QWNjdXJhY3lGZWVkYmFja0Rpc3BsYXl9IGZyb20gXCIuL2FjY3VyYWN5X2ZlZWRiYWNrX2Rpc3BsYXlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5aW5nRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIHNjZW5lOiBQNVNjZW5lO1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHRpbWVNYW5hZ2VyOiBHYW1lVGltZVByb3ZpZGVyO1xyXG4gICAgcHJpdmF0ZSBtaXNzTWFuYWdlcjogTWlzc01hbmFnZXI7XHJcbiAgICBwcml2YXRlIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBnYW1lRW5kVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzaG93UmVzdWx0c1NjcmVlbjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBpc0RlYnVnTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGFjY3VyYWN5RmVlZGJhY2tEaXNwbGF5OiBBY2N1cmFjeUZlZWRiYWNrRGlzcGxheTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3M6IE5vdGVbXVtdLCBjb25maWc6IENvbmZpZywgc2NlbmU6IFA1U2NlbmUpIHtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHRzU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG5cclxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB0aW1lIG1hbmFnZXIgYW5kIHBsYXkgdGhlIGF1ZGlvIGFzIGNsb3NlIHRvZ2V0aGVyIGFzIHBvc3NpYmxlIHRvIHN5bmNocm9uaXplIHRoZSBhdWRpbyB3aXRoIHRoZSBnYW1lXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZU1hbmFnZXIgPSBuZXcgVGltZU1hbmFnZXIocGVyZm9ybWFuY2Uubm93KCksIHRoaXMuY29uZmlnKTtcclxuICAgICAgICAgICAgZ2xvYmFsLmF1ZGlvRmlsZS5wbGF5KGNvbmZpZy5wYXVzZUF0U3RhcnRJblNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RlTWFuYWdlciA9IG5ldyBOb3RlTWFuYWdlcih0cmFja3MpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcgPSBuZXcgQWNjdXJhY3lSZWNvcmRpbmcodGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuICAgICAgICBsZXQgaG9sZE1hbmFnZXIgPSBuZXcgSG9sZE1hbmFnZXIodGhpcy5ub3RlTWFuYWdlci50cmFja3MubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBTY3JvbGxNYW5hZ2VyKHRoaXMuY29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUVuZFRpbWUgPSB0aGlzLmNhbGN1bGF0ZUdhbWVFbmQoZ2xvYmFsLmF1ZGlvRmlsZS5nZXREdXJhdGlvbigpLCB0aGlzLmdldE5vdGVzRW5kVGltZSgpKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlciA9IG5ldyBBY2N1cmFjeU1hbmFnZXIodGhpcy5ub3RlTWFuYWdlciwgdGhpcy5jb25maWcsIHRoaXMuYWNjdXJhY3lSZWNvcmRpbmcsIGhvbGRNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLm1pc3NNYW5hZ2VyID0gbmV3IE1pc3NNYW5hZ2VyKHRoaXMuY29uZmlnLCB0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCBob2xkTWFuYWdlcik7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IDI0MDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gNDgwO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WCA9ICh0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLndpZHRoIC0gd2lkdGgpIC8gMjtcclxuICAgICAgICBsZXQgdG9wTGVmdFkgPSAodGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZS5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyID0gbmV3IERpc3BsYXlNYW5hZ2VyKHRoaXMubm90ZU1hbmFnZXIsIHRoaXMuY29uZmlnLCB0aGlzLnNjZW5lLnNrZXRjaEluc3RhbmNlLFxyXG4gICAgICAgICAgICB0b3BMZWZ0WCwgdG9wTGVmdFksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja0Rpc3BsYXkgPSBuZXcgQWNjdXJhY3lGZWVkYmFja0Rpc3BsYXkodGhpcy5hY2N1cmFjeVJlY29yZGluZywgdG9wTGVmdFggKyB3aWR0aCAvIDIsXHJcbiAgICAgICAgICAgIHRvcExlZnRZICsgaGVpZ2h0IC8gMiwgdGhpcy5jb25maWcpO1xyXG5cclxuICAgICAgICBpZiAoIWlzS2V5QmluZGluZ3NEZWZpbmVkKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUtleUJpbmRpbmdzKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmluZEtleUJpbmRpbmdzVG9BY3Rpb25zKCk7XHJcbiAgICAgICAgc2V0QWxsTm90ZXNUb0RlZmF1bHRTdGF0ZSh0aGlzLm5vdGVNYW5hZ2VyLnRyYWNrcyk7XHJcbiAgICAgICAgcmVwbGFjZU5vdFlldEltcGxlbWVudGVkTm90ZVR5cGVzKHRoaXMubm90ZU1hbmFnZXIudHJhY2tzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdygpIHtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWVJblNlY29uZHMgPSB0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWVJblNlY29uZHMgPj0gdGhpcy5nYW1lRW5kVGltZSAmJiAhdGhpcy5zaG93UmVzdWx0c1NjcmVlbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLnN0YXRlID0gQWNjdXJhY3lSZWNvcmRpbmdTdGF0ZS5SRUFEWTtcclxuICAgICAgICAgICAgdGhpcy5lbmRTb25nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWlzc01hbmFnZXIudXBkYXRlKGN1cnJlbnRUaW1lSW5TZWNvbmRzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlNYW5hZ2VyLmRyYXcoY3VycmVudFRpbWVJblNlY29uZHMpO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lGZWVkYmFja0Rpc3BsYXkuZHJhdyhjdXJyZW50VGltZUluU2Vjb25kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3Rlc0VuZFRpbWUoKSB7XHJcbiAgICAgICAgbGV0IGVhcmxpZXN0QWNjdXJhY3k6IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlYXJsaWVzdEFjY3VyYWN5ID0gdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5nc1t0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLnVwcGVyQm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWFybGllc3RBY2N1cmFjeSA9IHRoaXMuY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbdGhpcy5jb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAyXS51cHBlckJvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ub3RlTWFuYWdlci5nZXRMYXRlc3ROb3RlKCkudGltZUluU2Vjb25kcyArIGVhcmxpZXN0QWNjdXJhY3kgLyAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlR2FtZUVuZChhdWRpb0R1cmF0aW9uOiBudW1iZXIsIG5vdGVzRW5kVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGF1ZGlvRHVyYXRpb24gPCBub3Rlc0VuZFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vdGVzRW5kVGltZSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihub3Rlc0VuZFRpbWUgKyA1LCBhdWRpb0R1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuZFNvbmcoKSB7XHJcbiAgICAgICAgZ2xvYmFsLmF1ZGlvRmlsZS5zdG9wKCk7XHJcbiAgICAgICAgZ2xvYmFsLnJlc3VsdHNEaXNwbGF5ID0gbmV3IFJlc3VsdHNEaXNwbGF5KHRoaXMuY29uZmlnLCB0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmFjY3VyYWN5TWFuYWdlcixcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSwgdGhpcy5hY2N1cmFjeVJlY29yZGluZyk7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFNjZW5lKFBBR0VTLlJFU1VMVFMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmluZEtleUJpbmRpbmdzVG9BY3Rpb25zKCkge1xyXG4gICAgICAgIGxldCBrZXlCaW5kaW5ncyA9IGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KHRoaXMubm90ZU1hbmFnZXIudHJhY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlCaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5QmluZGluZzogS2V5QmluZGluZyA9IGtleUJpbmRpbmdzW2ldO1xyXG4gICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKGtleUJpbmRpbmcua2V5Q29kZSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleURvd25BY3Rpb25Gb3JUcmFjayhrZXlCaW5kaW5nLnRyYWNrTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVVwQWN0aW9uRm9yVHJhY2soa2V5QmluZGluZy50cmFja051bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIuYmluZEtleVRvQWN0aW9uKGdsb2JhbC5jb25maWcucXVpdEtleSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVuZFNvbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGtleURvd25BY3Rpb25Gb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBsYXllcktleUFjdGlvbjogUGxheWVyS2V5QWN0aW9uID1cclxuICAgICAgICAgICAgbmV3IFBsYXllcktleUFjdGlvbih0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKSwgdHJhY2tOdW1iZXIsIEtleVN0YXRlLkRPV04pO1xyXG4gICAgICAgIHRoaXMuYWNjdXJhY3lNYW5hZ2VyLmhhbmRsZVBsYXllckFjdGlvbihwbGF5ZXJLZXlBY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUga2V5VXBBY3Rpb25Gb3JUcmFjayh0cmFja051bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBsYXllcktleUFjdGlvbjogUGxheWVyS2V5QWN0aW9uID1cclxuICAgICAgICAgICAgbmV3IFBsYXllcktleUFjdGlvbih0aGlzLnRpbWVNYW5hZ2VyLmdldEdhbWVUaW1lKHBlcmZvcm1hbmNlLm5vdygpKSwgdHJhY2tOdW1iZXIsIEtleVN0YXRlLlVQKTtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5TWFuYWdlci5oYW5kbGVQbGF5ZXJBY3Rpb24ocGxheWVyS2V5QWN0aW9uKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7RGlzcGxheU1hbmFnZXJ9IGZyb20gXCIuL2Rpc3BsYXlfbWFuYWdlclwiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtQNVNjZW5lfSBmcm9tIFwiLi9wNV9zY2VuZVwiO1xyXG5pbXBvcnQge1Njcm9sbE1hbmFnZXJ9IGZyb20gXCIuL3Njcm9sbF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Tm90ZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJldmlld0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogUDVTY2VuZTtcclxuICAgIGNvbmZpZzogQ29uZmlnO1xyXG4gICAgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxNYW5hZ2VyOiBTY3JvbGxNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5TWFuYWdlcjogRGlzcGxheU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHRvcExlZnRYID0gNjU7XHJcbiAgICBwcml2YXRlIHRvcExlZnRZID0gNTU7XHJcbiAgICBwcml2YXRlIHdpZHRoID0gMjAwO1xyXG4gICAgcHJpdmF0ZSBoZWlnaHQgPSA0MDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHJhY2tzOiBOb3RlW11bXSwgY29uZmlnOiBDb25maWcsIHNjZW5lOiBQNVNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMubm90ZU1hbmFnZXIgPSBuZXcgTm90ZU1hbmFnZXIodHJhY2tzKTtcclxuICAgICAgICB0aGlzLnNjcm9sbE1hbmFnZXIgPSBuZXcgU2Nyb2xsTWFuYWdlcih0aGlzLmNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSwgdGhpcy5nZXRCb3VuZHMoKSk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlciA9IG5ldyBEaXNwbGF5TWFuYWdlcih0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmNvbmZpZywgdGhpcy5zY2VuZS5za2V0Y2hJbnN0YW5jZSxcclxuICAgICAgICAgICAgdGhpcy50b3BMZWZ0WCwgdGhpcy50b3BMZWZ0WSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TWFuYWdlci5kcmF3KHRoaXMuc2Nyb2xsTWFuYWdlci5nZXRHYW1lVGltZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJvdW5kcygpIHtcclxuICAgICAgICByZXR1cm4ge3RvcExlZnRYOiB0aGlzLnRvcExlZnRYLCB0b3BMZWZ0WTogdGhpcy50b3BMZWZ0WSwgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge2RyYXdBY2N1cmFjeUJhcnN9IGZyb20gXCIuL2RyYXdpbmdfdXRpbFwiO1xyXG5pbXBvcnQge0FjY3VyYWN5LCBBY2N1cmFjeU1hbmFnZXJ9IGZyb20gXCIuL2FjY3VyYWN5X21hbmFnZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge05vdGVNYW5hZ2VyfSBmcm9tIFwiLi9ub3RlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtBY2N1cmFjeVJlY29yZGluZ30gZnJvbSBcIi4vYWNjdXJhY3lfcmVjb3JkaW5nXCI7XHJcblxyXG4vL1RPRE86IHRha2UgaG9sZHMgYW5kIHJlbGVhc2VzIGludG8gYWNjb3VudFxyXG5leHBvcnQgY2xhc3MgUmVzdWx0c0Rpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZztcclxuICAgIHByaXZhdGUgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlcjtcclxuICAgIHByaXZhdGUgYWNjdXJhY3lSZWNvcmRpbmc6IEFjY3VyYWN5UmVjb3JkaW5nO1xyXG4gICAgcHJpdmF0ZSBwOiBwNTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgbm90ZU1hbmFnZXI6IE5vdGVNYW5hZ2VyLCBhY2N1cmFjeU1hbmFnZXI6IEFjY3VyYWN5TWFuYWdlciwgcDogcDUsXHJcbiAgICAgICAgICAgICAgICBhY2N1cmFjeVJlY29yZGluZzogQWNjdXJhY3lSZWNvcmRpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm5vdGVNYW5hZ2VyID0gbm90ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5hY2N1cmFjeU1hbmFnZXIgPSBhY2N1cmFjeU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5wID0gcDtcclxuICAgICAgICB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nID0gYWNjdXJhY3lSZWNvcmRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICB0aGlzLmRyYXdBY2N1cmFjeVJlc3VsdHModGhpcy5wLCB0aGlzLmNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLCB0aGlzLmFjY3VyYWN5UmVjb3JkaW5nLCB0aGlzLm5vdGVNYW5hZ2VyLCB0aGlzLmFjY3VyYWN5TWFuYWdlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QWNjdXJhY3lSZXN1bHRzKHA6IHA1LCBhY2N1cmFjeVNldHRpbmdzOiBBY2N1cmFjeVtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5UmVjb3JkaW5nOiBBY2N1cmFjeVJlY29yZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlTWFuYWdlcjogTm90ZU1hbmFnZXIsIGFjY3VyYWN5TWFuYWdlcjogQWNjdXJhY3lNYW5hZ2VyKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSBwLndpZHRoIC8gMjtcclxuICAgICAgICBsZXQgY2VudGVyWSA9IHAuaGVpZ2h0IC8gMjtcclxuICAgICAgICBsZXQgYmFyV2lkdGggPSBwLndpZHRoICogMC42O1xyXG4gICAgICAgIGxldCBiYXJIZWlnaHQgPSBiYXJXaWR0aCAvIDEwO1xyXG4gICAgICAgIGxldCBsZWZ0TGFiZWxIZWlnaHQgPSAwLjggKiBiYXJIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5TGlzdEZvclJlc3VsdHMgPSB0aGlzLmdldFJlc3VsdHNBY2N1cmFjeUxpc3QoYWNjdXJhY3lTZXR0aW5ncyk7XHJcbiAgICAgICAgZHJhd0FjY3VyYWN5QmFycyhwLCBhY2N1cmFjeUxpc3RGb3JSZXN1bHRzLCBhY2N1cmFjeVJlY29yZGluZywgY2VudGVyWCwgY2VudGVyWSwgbGVmdExhYmVsSGVpZ2h0LCBiYXJXaWR0aCxcclxuICAgICAgICAgICAgYmFySGVpZ2h0LCBub3RlTWFuYWdlciwgYWNjdXJhY3lNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4gYSBsaXN0IG9mIHVuaXF1ZSBhY2N1cmFjaWVzIHNvcnRlZCBieSB0aGUgb2Zmc2V0LCB3aXRoIHRoZSBiZXN0IGFjY3VyYWN5IGJlaW5nIGZpcnN0XHJcbiAgICBwcml2YXRlIGdldFJlc3VsdHNBY2N1cmFjeUxpc3QoYWNjdXJhY3lTZXR0aW5nczogQWNjdXJhY3lbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgYWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID0gYWNjdXJhY3lTZXR0aW5ncy5tYXAoYWNjdXJhY3kgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYWNjdXJhY3lOYW1lOiBhY2N1cmFjeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgc29ydFZhbHVlOiB0aGlzLmdldEFjY3VyYWN5U29ydGluZ1ZhbHVlKGFjY3VyYWN5Lmxvd2VyQm91bmQsIGFjY3VyYWN5LnVwcGVyQm91bmQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG1lcmdlZEFjY3VyYWN5VGFibGU6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH1bXSA9XHJcbiAgICAgICAgICAgIHRoaXMubWVyZ2VBY2N1cmFjaWVzV2l0aFNhbWVOYW1lKGFjY3VyYWN5VGFibGUpO1xyXG4gICAgICAgIG1lcmdlZEFjY3VyYWN5VGFibGUuc29ydCh0aGlzLmFjY3VyYWN5VGFibGVTb3J0RnVuY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBtZXJnZWRBY2N1cmFjeVRhYmxlLm1hcChyb3cgPT4gcm93LmFjY3VyYWN5TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBY2N1cmFjeVNvcnRpbmdWYWx1ZShsb3dlckJvdW5kOiBudW1iZXIsIHVwcGVyQm91bmQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChsb3dlckJvdW5kID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHVwcGVyQm91bmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXBwZXJCb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhsb3dlckJvdW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKCh1cHBlckJvdW5kICsgbG93ZXJCb3VuZCkgLyAyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lcmdlQWNjdXJhY2llc1dpdGhTYW1lTmFtZShhY2N1cmFjeVRhYmxlOiB7IGFjY3VyYWN5TmFtZTogc3RyaW5nOyBzb3J0VmFsdWU6IG51bWJlciB9W10pIHtcclxuICAgICAgICBsZXQgbWVyZ2VkQWNjdXJhY3lUYWJsZTogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgd2hpbGUgKGFjY3VyYWN5VGFibGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQga2V5QWNjdXJhY3lOYW1lID0gYWNjdXJhY3lUYWJsZVswXS5hY2N1cmFjeU5hbWU7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVkQWNjdXJhY2llcyA9IGFjY3VyYWN5VGFibGUuZmlsdGVyKHJvdyA9PiByb3cuYWNjdXJhY3lOYW1lID09PSBrZXlBY2N1cmFjeU5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgc29ydFZhbHVlQXZlcmFnZSA9IG1hdGNoZWRBY2N1cmFjaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoc3VtLCByb3cpID0+IHN1bSArIHJvdy5zb3J0VmFsdWUsIDApXHJcbiAgICAgICAgICAgICAgICAvIG1hdGNoZWRBY2N1cmFjaWVzLmxlbmd0aDtcclxuICAgICAgICAgICAgbWVyZ2VkQWNjdXJhY3lUYWJsZS5wdXNoKHthY2N1cmFjeU5hbWU6IGtleUFjY3VyYWN5TmFtZSwgc29ydFZhbHVlOiBzb3J0VmFsdWVBdmVyYWdlfSk7XHJcbiAgICAgICAgICAgIGFjY3VyYWN5VGFibGUgPSBhY2N1cmFjeVRhYmxlLmZpbHRlcihyb3cgPT4gcm93LmFjY3VyYWN5TmFtZSAhPT0ga2V5QWNjdXJhY3lOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZEFjY3VyYWN5VGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhY2N1cmFjeVRhYmxlU29ydEZ1bmN0aW9uKGE6IHsgYWNjdXJhY3lOYW1lOiBzdHJpbmcsIHNvcnRWYWx1ZTogbnVtYmVyIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogeyBhY2N1cmFjeU5hbWU6IHN0cmluZywgc29ydFZhbHVlOiBudW1iZXIgfSkge1xyXG4gICAgICAgIHJldHVybiBhLnNvcnRWYWx1ZSAtIGIuc29ydFZhbHVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGVudW0gU2Nyb2xsRGlyZWN0aW9uIHtcclxuICAgIFVwLFxyXG4gICAgRG93bixcclxufSIsImltcG9ydCAqIGFzIHA1IGZyb20gXCJwNVwiO1xyXG5pbXBvcnQge1RpbWVNYW5hZ2VyfSBmcm9tIFwiLi90aW1lX21hbmFnZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0dhbWVUaW1lUHJvdmlkZXJ9IGZyb20gXCIuL2dhbWVfdGltZV9wcm92aWRlclwiO1xyXG5pbXBvcnQge1Njcm9sbERpcmVjdGlvbn0gZnJvbSBcIi4vc2Nyb2xsX2RpcmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcm9sbE1hbmFnZXIgaW1wbGVtZW50cyBHYW1lVGltZVByb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcbiAgICBwcml2YXRlIHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGltZU1hbmFnZXI6IFRpbWVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxCb3VuZHM6IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZywgcDogcDUsIHNjcm9sbEJvdW5kcz86IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lTWFuYWdlciA9IG5ldyBUaW1lTWFuYWdlcigwLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxCb3VuZHMgPSBzY3JvbGxCb3VuZHM7XHJcbiAgICAgICAgcC5tb3VzZVdoZWVsID0gZnVuY3Rpb24gKGU6IFdoZWVsRXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGFsbG93U2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxCb3VuZHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2VJc0luQm91bmRzKHAsIHRoaXMuc2Nyb2xsQm91bmRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93U2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsbG93U2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxsb3dTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lQ2hhbmdlTWlsbGlzID0gZS5kZWx0YVkgKiAwLjI7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2Nyb2xsRGlyZWN0aW9uID09PSBTY3JvbGxEaXJlY3Rpb24uRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtVGltZU1pbGxpcyAtPSB0aW1lQ2hhbmdlTWlsbGlzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbVRpbWVNaWxsaXMgKz0gdGltZUNoYW5nZU1pbGxpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBbGxvdyBhbiBpZ25vcmVkIGFyZ3VtZW50IHNvIGl0IGNhbiBiZSB1c2VkIGluIHBsYWNlIG9mIGEgVGltZU1hbmFnZXIgZm9yIGRlYnVnIG1vZGVcclxuICAgIGdldEdhbWVUaW1lKGlnbm9yZWRBcmd1bWVudD86IGFueSkge1xyXG4gICAgICAgIGxldCB0aW1lID0gdGhpcy50aW1lTWFuYWdlci5nZXRHYW1lVGltZSh0aGlzLnN5c3RlbVRpbWVNaWxsaXMpO1xyXG4gICAgICAgIHJldHVybiB0aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW91c2VJc0luQm91bmRzKHA6IHA1LCBib3VuZHM6IHsgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSkge1xyXG4gICAgICAgIGlmIChwLm1vdXNlWCA+PSBib3VuZHMudG9wTGVmdFggJiYgcC5tb3VzZVggPD0gYm91bmRzLnRvcExlZnRYICsgYm91bmRzLndpZHRoICYmXHJcbiAgICAgICAgICAgIHAubW91c2VZID49IGJvdW5kcy50b3BMZWZ0WSAmJiBwLm1vdXNlWSA8PSBib3VuZHMudG9wTGVmdFkgKyBib3VuZHMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcDUgZnJvbSBcInA1XCI7XHJcbmltcG9ydCB7RnVsbFBhcnNlLCBnZXRGdWxsUGFyc2UsIGdldFBhcnRpYWxQYXJzZSwgUGFydGlhbFBhcnNlfSBmcm9tIFwiLi9wYXJzaW5nXCI7XHJcblxyXG5leHBvcnQgZW51bSBTdGVwZmlsZVN0YXRlIHtcclxuICAgIE5PX1NJTUZJTEUsXHJcbiAgICBET05FX1JFQURJTkcsXHJcbiAgICBQQVJUSUFMTFlfUEFSU0VELFxyXG4gICAgRlVMTFlfUEFSU0VELFxyXG4gICAgRVJST1IsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGVwZmlsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IFN0ZXBmaWxlU3RhdGU7XHJcbiAgICBwdWJsaWMgZmlsZTogRmlsZTtcclxuICAgIHB1YmxpYyBwYXJ0aWFsUGFyc2U6IFBhcnRpYWxQYXJzZTtcclxuICAgIHB1YmxpYyBmdWxsUGFyc2U6IEZ1bGxQYXJzZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0ZXBmaWxlU3RhdGUuTk9fU0lNRklMRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZChmaWxlOiBwNS5GaWxlKSB7XHJcbiAgICAgICAgdGhpcy5maWxlID0gZmlsZS5maWxlOyAvLyB0aGlzIHVud3JhcHMgdGhlIHA1LkZpbGUgd3JhcHBlciB0byBnZXQgdGhlIG9yaWdpbmFsIERPTSBmaWxlXHJcbiAgICAgICAgbG9hZFRleHRGaWxlKHRoaXMuZmlsZSwgKChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5ET05FX1JFQURJTkc7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGlhbFBhcnNlID0gZ2V0UGFydGlhbFBhcnNlKDxzdHJpbmc+ZXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpYWxQYXJzZS5tb2Rlcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5FUlJPUjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGVwZmlsZVN0YXRlLlBBUlRJQUxMWV9QQVJTRUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbmlzaFBhcnNpbmcobW9kZUluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU3RlcGZpbGVTdGF0ZS5QQVJUSUFMTFlfUEFSU0VEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnVsbFBhcnNlID0gZ2V0RnVsbFBhcnNlKG1vZGVJbmRleCwgdGhpcy5wYXJ0aWFsUGFyc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RlcGZpbGVTdGF0ZS5GVUxMWV9QQVJTRUQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkVGV4dEZpbGUoXHJcbiAgICBmaWxlOiBGaWxlLFxyXG4gICAgbGlzdGVuZXI6IChldmVudDogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4gYW55LFxyXG4gICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc1xyXG4pIHtcclxuICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgIGZpbGVSZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcclxuICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG59IiwiaW1wb3J0IHtHYW1lVGltZVByb3ZpZGVyfSBmcm9tIFwiLi9nYW1lX3RpbWVfcHJvdmlkZXJcIjtcclxuaW1wb3J0IHtDb25maWd9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVNYW5hZ2VyIGltcGxlbWVudHMgR2FtZVRpbWVQcm92aWRlciB7XHJcbiAgICBwcml2YXRlIHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZDogbnVtYmVyLCBjb25maWc6IENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZCA9IHN5c3RlbVRpbWVXaGVuR2FtZVN0YXJ0ZWQ7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGFwc2VkVGltZShzeXN0ZW1UaW1lTWlsbGlzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChzeXN0ZW1UaW1lTWlsbGlzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJFcnJvcjogY2FuJ3QgZ2V0IGVsYXBzZWQgdGltZS4gRXhwZWN0ZWQgMSBhcmd1bWVudDogc3lzdGVtVGltZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoc3lzdGVtVGltZU1pbGxpcyAtIHRoaXMuc3lzdGVtVGltZVdoZW5HYW1lU3RhcnRlZCkgLyAxMDAwOyAvLyBpbiBzZWNvbmRzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2Ugd2FudCB0byBrZWVwIHRoaXMgY2FsY3VsYXRpb24gaW4gb25seSBvbmUgcGxhY2VcclxuICAgIGdldEdhbWVUaW1lKHN5c3RlbVRpbWVNaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsYXBzZWRUaW1lKHN5c3RlbVRpbWVNaWxsaXMpICsgdGhpcy5jb25maWcuYWRkaXRpb25hbE9mZnNldEluU2Vjb25kcyAtIHRoaXMuY29uZmlnLnBhdXNlQXRTdGFydEluU2Vjb25kcztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtnbG9iYWx9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7UGFnZU1hbmFnZXIsIFBBR0VTfSBmcm9tIFwiLi9wYWdlX21hbmFnZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGVudW1Ub1N0cmluZ0FycmF5LFxyXG4gICAgZmluZEJpbmRpbmdJbmZvRm9yVHJhY2ssXHJcbiAgICBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUsXHJcbiAgICBnZXRLZXlCaW5kaW5nQnV0dG9uSWQsXHJcbiAgICBnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQsXHJcbiAgICBnZXRLZXlTdHJpbmcsXHJcbiAgICBzZXRDb25maWdLZXlCaW5kaW5nXHJcbn0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQge0RPTVdyYXBwZXJ9IGZyb20gXCIuL2RvbV93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0hlYWRpbmcoKSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuICAgIGxldCBoZWFkaW5nQ2xhc3MgPSBcIm5hdmlnYXRpb24taGVhZGluZ1wiO1xyXG5cclxuICAgIGxldCBwbGF5RnJvbUZpbGVCdXR0b24gPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHAuY3JlYXRlQnV0dG9uKFwiUGxheSBGcm9tIEZpbGVcIik7XHJcbiAgICB9LCBcInBsYXlGcm9tRmlsZUJ1dHRvblwiKTtcclxuICAgIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LCAwLjMsIDAuMDM2LCAxMzAsIDM0KTtcclxuICAgIHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFNjZW5lKFBBR0VTLlBMQVlfRlJPTV9GSUxFKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCFwbGF5RnJvbUZpbGVCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHBsYXlGcm9tRmlsZUJ1dHRvbi5lbGVtZW50LmFkZENsYXNzKGhlYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgcGxheUZyb21GaWxlQnV0dG9uLmVsZW1lbnQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb3B0aW9uc0J1dHRvbiA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gcC5jcmVhdGVCdXR0b24oXCJPcHRpb25zXCIpO1xyXG4gICAgfSwgXCJvcHRpb25zQnV0dG9uXCIpO1xyXG4gICAgc2V0RWxlbWVudENlbnRlclBvc2l0aW9uUmVsYXRpdmUob3B0aW9uc0J1dHRvbi5lbGVtZW50LCAwLjcsIDAuMDM2LCA5MCwgMzQpO1xyXG4gICAgb3B0aW9uc0J1dHRvbi5lbGVtZW50Lm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgUGFnZU1hbmFnZXIuc2V0Q3VycmVudFNjZW5lKFBBR0VTLk9QVElPTlMpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIW9wdGlvbnNCdXR0b24uYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIG9wdGlvbnNCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhoZWFkaW5nQ2xhc3MpO1xyXG4gICAgICAgIG9wdGlvbnNCdXR0b24uZWxlbWVudC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBFeHBlY3RzIHJlbGF0aXZlWCBhbmQgcmVsYXRpdmUgWSB0byBiZSBiZXR3ZWVuIDAgYW5kIDFcclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVsZW1lbnRDZW50ZXJQb3NpdGlvblJlbGF0aXZlKGVsZW1lbnQ6IHA1LkVsZW1lbnQsIHJlbGF0aXZlWDogbnVtYmVyLCByZWxhdGl2ZVk6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcCA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG4gICAgbGV0IGNhbnZhc1Bvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0gPSBwLl9yZW5kZXJlci5wb3NpdGlvbigpO1xyXG4gICAgZWxlbWVudC5wb3NpdGlvbihjYW52YXNQb3NpdGlvbi54ICsgKHJlbGF0aXZlWCAqIHAud2lkdGgpIC0gKHdpZHRoIC8gMiksXHJcbiAgICAgICAgY2FudmFzUG9zaXRpb24ueSArIChyZWxhdGl2ZVkgKiBwLmhlaWdodCkgLSAoaGVpZ2h0IC8gMikpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZElucHV0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIGlucHV0SWQ6IHN0cmluZywgaW5wdXRJbml0aWFsVmFsdWU6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZyk6IHsgZWxlbWVudDogcDUuRWxlbWVudCwgYWxyZWFkeUV4aXN0czogYm9vbGVhbiB9IHtcclxuICAgIGxldCBwOiBwNSA9IGdsb2JhbC5wNVNjZW5lLnNrZXRjaEluc3RhbmNlO1xyXG5cclxuICAgIGxldCBpbnB1dDogcDUuRWxlbWVudDtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGxhYmVsZWRJbnB1dENsYXNzID0gXCJsYWJlbGVkLWlucHV0XCI7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZElucHV0Q2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICBsZXQgbGFiZWwgPSBjcmVhdGVMYWJlbChwLCBsYWJlbFN0cmluZywgaW5wdXRJZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGxhYmVsZWRJbnB1dENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICBpbnB1dCA9IHAuY3JlYXRlSW5wdXQoaW5wdXRJbml0aWFsVmFsdWUpO1xyXG4gICAgICAgIGlucHV0LmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBpbnB1dC5hZGRDbGFzcyhsYWJlbGVkSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBpbnB1dC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBpbnB1dC5pZChpbnB1dElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH0sIGlucHV0SWQgKyBcIkNvbnRhaW5lclwiKTtcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IGlucHV0LCBhbHJlYWR5RXhpc3RzOiBjb250YWluZXIuYWxyZWFkeUV4aXN0c307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxhYmVsKHA6IHA1LCBsYWJlbFN0cmluZzogc3RyaW5nLCBmb3JJZD86IHN0cmluZyk6IHA1LkVsZW1lbnQge1xyXG4gICAgbGV0IGxhYmVsID0gcC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbGFiZWxTdHJpbmcpO1xyXG4gICAgaWYgKGZvcklkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsYWJlbC5hdHRyaWJ1dGUoXCJmb3JcIiwgZm9ySWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG4vLyBUT0RPOiBjaGVjayB0aGF0IG9wdGlvbnNFbnVtIGlzIGFjdHVhbGx5IGFuIEVudW0sIGFuZCBpbml0aWFsRW51bVZhbHVlIGlzIGEgdmFsdWUgZm9yIHRoYXQgZW51bVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZFNlbGVjdChsYWJlbFN0cmluZzogc3RyaW5nLCBzZWxlY3RJZDogc3RyaW5nLCBvcHRpb25zRW51bTogYW55LCBpbml0aWFsRW51bVZhbHVlOiBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBzdHJpbmcpOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgc2VsZWN0OiBwNS5FbGVtZW50O1xyXG4gICAgbGV0IGxhYmVsZWRTZWxlY3RDbGFzcyA9IFwibGFiZWxlZC1zZWxlY3RcIjtcclxuICAgIGxldCBjb250YWluZXIgPSBET01XcmFwcGVyLmNyZWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogcDUuRWxlbWVudCA9IHAuY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MobGFiZWxlZFNlbGVjdENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIHNlbGVjdElkKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MobGFiZWxlZFNlbGVjdENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICBzZWxlY3QgPSBwLmNyZWF0ZVNlbGVjdCgpO1xyXG4gICAgICAgIHNlbGVjdC5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LmFkZENsYXNzKGxhYmVsZWRTZWxlY3RDbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgc2VsZWN0LnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIHNlbGVjdC5pZChzZWxlY3RJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBzZWxlY3RJZCArIFwiQ29udGFpbmVyXCIpO1xyXG5cclxuICAgIGlmICghY29udGFpbmVyLmFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBsZXQgaW5pdGlhbE9wdGlvbnMgPSBlbnVtVG9TdHJpbmdBcnJheShvcHRpb25zRW51bSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsT3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHNlbGVjdC5vcHRpb24oaW5pdGlhbE9wdGlvbnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgc2VsZWN0LnNlbGVjdGVkKG9wdGlvbnNFbnVtW2luaXRpYWxFbnVtVmFsdWUgYXMga2V5b2YgdHlwZW9mIG9wdGlvbnNFbnVtXS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IEhUTUxDb2xsZWN0aW9uID0gc2VsZWN0LmVsdC5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5pdGVtKGkpLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzcyArIFwiIFwiICsgbGFiZWxlZFNlbGVjdENsYXNzICsgXCIgXCIgKyBnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnQ6IHNlbGVjdCwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlS2V5QmluZGluZ0lucHV0KHRyYWNrTnVtYmVyOiBudW1iZXIsIG51bVRyYWNrczogbnVtYmVyLCBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IHNldEJ1dHRvbklkID0gZ2V0S2V5QmluZGluZ0J1dHRvbklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpO1xyXG4gICAgbGV0IGtleWJpbmRpbmdJbnB1dENsYXNzID0gXCJrZXliaW5kaW5nLWlucHV0XCI7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGtleWJpbmRpbmdJbnB1dENsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgXCJcIik7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGtleWJpbmRpbmdJbnB1dENsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLnBhcmVudChjb250YWluZXIpO1xyXG5cclxuICAgICAgICBsZXQgc2V0QnV0dG9uID0gcC5jcmVhdGVCdXR0b24oXCJTZXRcIik7XHJcbiAgICAgICAgc2V0QnV0dG9uLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5pZChzZXRCdXR0b25JZCk7XHJcbiAgICAgICAgc2V0QnV0dG9uLm1vdXNlUHJlc3NlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5rZXlib2FyZEV2ZW50TWFuYWdlci5iaW5kS2V5VG9BY3Rpb24oLTEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldENvbmZpZ0tleUJpbmRpbmcodHJhY2tOdW1iZXIsIG51bVRyYWNrcyxcclxuICAgICAgICAgICAgICAgICAgICB7dHJhY2tOdW1iZXI6IHRyYWNrTnVtYmVyLCBrZXlDb2RlOiBwLmtleUNvZGUsIHN0cmluZzogZ2V0S2V5U3RyaW5nKHApfSk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWwua2V5Ym9hcmRFdmVudE1hbmFnZXIudW5iaW5kS2V5KC0xKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0QnV0dG9uLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBzZXRCdXR0b24uYWRkQ2xhc3Moa2V5YmluZGluZ0lucHV0Q2xhc3MpO1xyXG4gICAgICAgIHNldEJ1dHRvbi5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfSwgZ2V0S2V5QmluZGluZ0NvbnRhaW5lcklkKHRyYWNrTnVtYmVyLCBudW1UcmFja3MpKTtcclxuXHJcbiAgICBsZXQgdHJhY2tCaW5kaW5nSW5mbyA9IGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyLCBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpKTtcclxuICAgIGxldCBrZXlTdHJpbmcgPSB0cmFja0JpbmRpbmdJbmZvLnN0cmluZztcclxuICAgIGxldCBsYWJlbFN0cmluZyA9ICdUcmFjayAnICsgKHRyYWNrTnVtYmVyICsgMSkgKyAnOiA8c3BhbiBjbGFzcz1cIicgK1xyXG4gICAgICAgIGtleWJpbmRpbmdJbnB1dENsYXNzICsgXCIgXCIgKyBjdXN0b21DbGFzcyArIFwiIFwiICsgZ2xvYmFsLmdsb2JhbENsYXNzICtcclxuICAgICAgICAnXCI+JyArIGtleVN0cmluZyArICc8L3NwYW4+JztcclxuICAgIGxldCBsYWJlbEVsZW1lbnQgPSBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoY29udGFpbmVyLmVsZW1lbnQsIFwiTEFCRUxcIik7XHJcbiAgICBsYWJlbEVsZW1lbnQuaHRtbChsYWJlbFN0cmluZyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRUZXh0QXJlYShsYWJlbFN0cmluZzogc3RyaW5nLCBpbnB1dElkOiBzdHJpbmcsIGlucHV0SW5pdGlhbFZhbHVlOiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyID0gNCwgY29sczogbnVtYmVyID0gNDApOiB7IGVsZW1lbnQ6IHA1LkVsZW1lbnQsIGFscmVhZHlFeGlzdHM6IGJvb2xlYW4gfSB7XHJcbiAgICBsZXQgcDogcDUgPSBnbG9iYWwucDVTY2VuZS5za2V0Y2hJbnN0YW5jZTtcclxuXHJcbiAgICBsZXQgdGV4dEFyZWE6IHA1LkVsZW1lbnQ7XHJcbiAgICBsZXQgY29udGFpbmVyID0gRE9NV3JhcHBlci5jcmVhdGUoKCkgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbGVkVGV4dGFyZWFDbGFzcyA9IFwibGFiZWxlZC10ZXh0YXJlYVwiO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IHA1LkVsZW1lbnQgPSBwLmNyZWF0ZURpdigpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhjdXN0b21DbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGxhYmVsID0gY3JlYXRlTGFiZWwocCwgbGFiZWxTdHJpbmcsIGlucHV0SWQpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGN1c3RvbUNsYXNzKTtcclxuICAgICAgICBsYWJlbC5hZGRDbGFzcyhsYWJlbGVkVGV4dGFyZWFDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZ2xvYmFsLmdsb2JhbENsYXNzKTtcclxuICAgICAgICBsYWJlbC5wYXJlbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgdGV4dEFyZWEgPSBwLmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCBpbnB1dEluaXRpYWxWYWx1ZSk7XHJcbiAgICAgICAgdGV4dEFyZWEuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLmFkZENsYXNzKGxhYmVsZWRUZXh0YXJlYUNsYXNzKTtcclxuICAgICAgICB0ZXh0QXJlYS5hZGRDbGFzcyhnbG9iYWwuZ2xvYmFsQ2xhc3MpO1xyXG4gICAgICAgIHRleHRBcmVhLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIHRleHRBcmVhLmlkKGlucHV0SWQpO1xyXG4gICAgICAgIHRleHRBcmVhLmF0dHJpYnV0ZShcInJvd3NcIiwgcm93cy50b1N0cmluZygpKTtcclxuICAgICAgICB0ZXh0QXJlYS5hdHRyaWJ1dGUoXCJjb2xzXCIsIGNvbHMudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBpbnB1dElkICsgXCJDb250YWluZXJcIik7XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50OiB0ZXh0QXJlYSwgYWxyZWFkeUV4aXN0czogY29udGFpbmVyLmFscmVhZHlFeGlzdHN9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsZUlucHV0KGxhYmVsU3RyaW5nOiBzdHJpbmcsIGJ1dHRvblRleHQ6IHN0cmluZywgdW5pcXVlSWQ6IHN0cmluZywgb25GaWxlTG9hZDogKCkgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogc3RyaW5nKTogeyBlbGVtZW50OiBwNS5FbGVtZW50LCBhbHJlYWR5RXhpc3RzOiBib29sZWFuIH0ge1xyXG4gICAgbGV0IHA6IHA1ID0gZ2xvYmFsLnA1U2NlbmUuc2tldGNoSW5zdGFuY2U7XHJcblxyXG4gICAgbGV0IGJ1dHRvbklkID0gdW5pcXVlSWQgKyBcIkJ1dHRvblwiO1xyXG4gICAgbGV0IGNvbnRhaW5lcklkID0gdW5pcXVlSWQgKyBcIkNvbnRhaW5lclwiO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IERPTVdyYXBwZXIuY3JlYXRlKCgpID0+IHtcclxuICAgICAgICBsZXQgZmlsZUlucHV0Q2xhc3MgPSBcImZpbGUtaW5wdXRcIjtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBwNS5FbGVtZW50ID0gcC5jcmVhdGVEaXYoKTtcclxuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBmaWxlSW5wdXQgPSBwLmNyZWF0ZUZpbGVJbnB1dChvbkZpbGVMb2FkLCBcImZhbHNlXCIpO1xyXG4gICAgICAgIGZpbGVJbnB1dC5wYXJlbnQoY29udGFpbmVyKTtcclxuICAgICAgICBmaWxlSW5wdXQuaGlkZSgpO1xyXG5cclxuICAgICAgICBsZXQgYnV0dG9uID0gcC5jcmVhdGVCdXR0b24oYnV0dG9uVGV4dCk7XHJcbiAgICAgICAgYnV0dG9uLnBhcmVudChjb250YWluZXIpO1xyXG4gICAgICAgIGJ1dHRvbi5pZChidXR0b25JZCk7XHJcbiAgICAgICAgYnV0dG9uLm1vdXNlQ2xpY2tlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbGVJbnB1dC5lbHQuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBidXR0b24uYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRDbGFzcyhmaWxlSW5wdXRDbGFzcyk7XHJcbiAgICAgICAgYnV0dG9uLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IGNyZWF0ZUxhYmVsKHAsIGxhYmVsU3RyaW5nLCBidXR0b25JZCk7XHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoY3VzdG9tQ2xhc3MpXHJcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoZmlsZUlucHV0Q2xhc3MpO1xyXG4gICAgICAgIGxhYmVsLmFkZENsYXNzKGdsb2JhbC5nbG9iYWxDbGFzcyk7XHJcbiAgICAgICAgbGFiZWwucGFyZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9LCBjb250YWluZXJJZCk7XHJcblxyXG4gICAgbGV0IGxhYmVsOiBwNS5FbGVtZW50ID0gZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKGNvbnRhaW5lci5lbGVtZW50LCBcIkxBQkVMXCIpO1xyXG4gICAgbGFiZWwuaHRtbChsYWJlbFN0cmluZyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufSIsImltcG9ydCB7TW9kZSwgTm90ZSwgTm90ZVN0YXRlLCBOb3RlVHlwZX0gZnJvbSBcIi4vcGFyc2luZ1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7Z2xvYmFsfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0tleUJpbmRpbmd9IGZyb20gXCIuL2tleV9iaW5kaW5nX2hlbHBlclwiO1xyXG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwicDVcIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcIi4vYWNjdXJhY3lfbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRJZlVuZGVmaW5lZCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQodmFsdWUpID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWxsTm90ZXNUb0RlZmF1bHRTdGF0ZSh0cmFja3M6IE5vdGVbXVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdHJhY2tzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHRyYWNrc1tpXVtqXS5zdGF0ZSA9IE5vdGVTdGF0ZS5ERUZBVUxUO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VOb3RZZXRJbXBsZW1lbnRlZE5vdGVUeXBlcyh0cmFja3M6IE5vdGVbXVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdHJhY2tzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHJhY2tzW2ldW2pdLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuVEFJTDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTUlORTpcclxuICAgICAgICAgICAgICAgICAgICB0cmFja3NbaV1bal0udHlwZSA9IE5vdGVUeXBlLk5PTkU7IC8vVE9ETzogaW1wbGVtZW50IG1pbmVzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5vdGVUeXBlLkhPTERfSEVBRDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuTk9ORTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTm90ZVR5cGUuUk9MTF9IRUFEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrc1tpXVtqXS50eXBlID0gTm90ZVR5cGUuSE9MRF9IRUFEOyAvL1RPRE86IGltcGxlbWVudCByb2xsc1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOb3RlVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNaXNzQm91bmRhcnkoY3VycmVudFRpbWU6IG51bWJlciwgY29uZmlnOiBDb25maWcpIHtcclxuICAgIGxldCBtaXNzQm91bmRhcnkgPSBjdXJyZW50VGltZSArIChjb25maWcuYWNjdXJhY3lTZXR0aW5nc1swXS51cHBlckJvdW5kIC8gMTAwMCk7IC8vcmVzdWx0IGlzIGluIHNlY29uZHNcclxuICAgIHJldHVybiBtaXNzQm91bmRhcnk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tleUJpbmRpbmdzRGVmaW5lZChudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcykgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVLZXlCaW5kaW5ncyhudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgbGV0IG1hcHBpbmc6IHsgdHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZyB9W10gPSBbXTtcclxuXHJcbiAgICBpZiAobnVtVHJhY2tzIDw9IDkpIHtcclxuICAgICAgICBsZXQga2V5U2VxdWVuY2UgPSBbXCJBXCIsIFwiU1wiLCBcIkRcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJKXCIsIFwiS1wiLCBcIkxcIl07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UcmFja3M7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5U3RyaW5nID0ga2V5U2VxdWVuY2VbaV07XHJcbiAgICAgICAgICAgIG1hcHBpbmcucHVzaCh7dHJhY2tOdW1iZXI6IGksIGtleUNvZGU6IGtleVN0cmluZy5jaGFyQ29kZUF0KDApLCBzdHJpbmc6IGtleVN0cmluZ30pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKG51bVRyYWNrcyA+IDI2KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZG4ndCBnZW5lcmF0ZSBkZWZhdWx0IGtleSBiaW5kaW5ncyBmb3IgbW9yZSB0aGFuIDI2IHRyYWNrcy4gUmFuIG91dCBvZiBsZXR0ZXJzIVwiKTtcclxuICAgICAgICAgICAgbnVtVHJhY2tzID0gMjY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVHJhY2tzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJhY3RlckNvZGUgPSBcIkFcIi5jaGFyQ29kZUF0KDApICsgaTsgLy8gVGhpcyBpcyBhbiBBU0NJSSBjaGFyYWN0ZXIgY29kZVxyXG4gICAgICAgICAgICBtYXBwaW5nLnB1c2goe3RyYWNrTnVtYmVyOiBpLCBrZXlDb2RlOiBjaGFyYWN0ZXJDb2RlLCBzdHJpbmc6IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcmFjdGVyQ29kZSl9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2xvYmFsLmNvbmZpZy5rZXlCaW5kaW5ncy5zZXQobnVtVHJhY2tzLCBtYXBwaW5nKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbmZpZ0tleUJpbmRpbmcodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIsIGtleUJpbmRpbmc6IEtleUJpbmRpbmcpIHtcclxuICAgIGxldCBiaW5kaW5nSW5kZXggPSBnZXRJbmRleE9mVHJhY2tOdW1iZXJCaW5kaW5nKHRyYWNrTnVtYmVyLCBnbG9iYWwuY29uZmlnLmtleUJpbmRpbmdzLmdldChudW1UcmFja3MpKTtcclxuICAgIGdsb2JhbC5jb25maWcua2V5QmluZGluZ3MuZ2V0KG51bVRyYWNrcylbYmluZGluZ0luZGV4XSA9IGtleUJpbmRpbmc7XHJcbn1cclxuXHJcbi8vIEV4cGVjdHMgZSB0byBiZSBhbiBlbnVtXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnVtVG9TdHJpbmdBcnJheShlOiBhbnkpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhlKS5maWx0ZXIoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEluZGV4T2ZUcmFja051bWJlckJpbmRpbmcodHJhY2tOdW1iZXI6IG51bWJlciwgYmluZGluZ3M6IHsgdHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZyB9W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmluZGluZ3NbaV0udHJhY2tOdW1iZXIgPT09IHRyYWNrTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEtleUJpbmRpbmdCdXR0b25JZCh0cmFja051bWJlcjogbnVtYmVyLCBudW1UcmFja3M6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGdldEtleUJpbmRpbmdVbmlxdWVJZCh0cmFja051bWJlciwgbnVtVHJhY2tzKSArIFwiQnV0dG9uXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXlCaW5kaW5nQ29udGFpbmVySWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBnZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXIsIG51bVRyYWNrcykgKyBcIkJ1dHRvblwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRLZXlCaW5kaW5nVW5pcXVlSWQodHJhY2tOdW1iZXI6IG51bWJlciwgbnVtVHJhY2tzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBcInRyYWNrXCIgKyB0cmFja051bWJlciArIFwiT2ZcIiArIG51bVRyYWNrcyArIFwiQmluZGluZ1wiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5U3RyaW5nKHA6IHA1KSB7XHJcbiAgICByZXR1cm4gcC5rZXkubGVuZ3RoID09IDEgPyBwLmtleS50b1VwcGVyQ2FzZSgpIDogcC5rZXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RlT3B0aW9uc0ZvckRpc3BsYXkobW9kZXNBc1N0cmluZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz5bXSk6IE1vZGVbXSB7XHJcbiAgICBsZXQgbW9kZU9wdGlvbnM6IE1vZGVbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2Rlc0FzU3RyaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtb2RlOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbW9kZXNBc1N0cmluZ3NbaV07XHJcbiAgICAgICAgbW9kZU9wdGlvbnMucHVzaCh7dHlwZTogbW9kZS5nZXQoXCJ0eXBlXCIpLCBkaWZmaWN1bHR5OiBtb2RlLmdldChcImRpZmZpY3VsdHlcIiksIG1ldGVyOiBtb2RlLmdldChcIm1ldGVyXCIpLCBpZDogaX0pO1xyXG4gICAgfVxyXG4gICAgbW9kZU9wdGlvbnMuc29ydChjb21wYXJlTW9kZU9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIG1vZGVPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZU1vZGVPcHRpb25zKGE6IE1vZGUsIGI6IE1vZGUpIHtcclxuICAgIGxldCB0eXBlQSA9IGEudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgbGV0IHR5cGVCID0gYi50eXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAodHlwZUEgIT0gdHlwZUIpIHtcclxuICAgICAgICBpZiAodHlwZUEgPCB0eXBlQikge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUEgPSBhLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBsZXQgZGlmZmljdWx0eUIgPSBiLmRpZmZpY3VsdHkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAoZGlmZmljdWx0eUEgIT0gZGlmZmljdWx0eUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlBKSAtIGRpZmZpY3VsdHlSYW5rKGRpZmZpY3VsdHlCKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbWV0ZXJBID0gcGFyc2VGbG9hdChhLm1ldGVyKTtcclxuICAgICAgICAgICAgbGV0IG1ldGVyQiA9IHBhcnNlRmxvYXQoYi5tZXRlcik7XHJcbiAgICAgICAgICAgIGlmIChtZXRlckEgIT0gbWV0ZXJCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0ZXJBIC0gbWV0ZXJCO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGEuaWQgPSBiLmlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmaWN1bHR5UmFuayhkaWZmaWN1bHR5OiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAoZGlmZmljdWx0eSkge1xyXG4gICAgICAgIGNhc2UgXCJCRUdJTk5FUlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBjYXNlIFwiRUFTWVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICBjYXNlIFwiTUVESVVNXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIGNhc2UgXCJIQVJEXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIGNhc2UgXCJDSEFMTEVOR0VcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgY2FzZSBcIkVESVRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUoZGl2OiBwNS5FbGVtZW50LCB0YWdOYW1lOiBzdHJpbmcpOiBwNS5FbGVtZW50IHtcclxuICAgIGxldCBjaGlsZHJlbk5vZGVzID0gZGl2LmNoaWxkKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbm9kZTogTm9kZSA9IGNoaWxkcmVuTm9kZXNbaV07XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHA1LkVsZW1lbnQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCaW5kaW5nSW5mb0ZvclRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIsIGJpbmRpbmdzOiB7dHJhY2tOdW1iZXI6IG51bWJlciwga2V5Q29kZTogbnVtYmVyLCBzdHJpbmc6IHN0cmluZ31bXSkge1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJpbmRpbmdzW2ldLnRyYWNrTnVtYmVyID09PSB0cmFja051bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZGluZ3NbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUHJldmlld05vdGVzKG51bVRyYWNrczogbnVtYmVyKTogTm90ZVtdW10ge1xyXG4gICAgbGV0IG5vdGVzOiBOb3RlW11bXSA9IFtdO1xyXG4gICAgbGV0IGlzSG9sZCA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMC4xO1xyXG4gICAgbGV0IHRpbWVJbmNyZW1lbnQgPSAwLjMgLyBudW1UcmFja3M7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRyYWNrczsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrOiBOb3RlW10gPSBbXTtcclxuICAgICAgICBpZiAoaXNIb2xkKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe3R5cGU6IE5vdGVUeXBlLkhPTERfSEVBRCwgdHlwZVN0cmluZzogXCJEb24ndCBDYXJlXCIsIHRpbWVJblNlY29uZHM6IGN1cnJlbnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IE5vdGVTdGF0ZS5ERUZBVUxUfSk7XHJcbiAgICAgICAgICAgIHRyYWNrLnB1c2goe3R5cGU6IE5vdGVUeXBlLlRBSUwsIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLCB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZSArIDAuMjUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFR9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmFjay5wdXNoKHt0eXBlOiBOb3RlVHlwZS5OT1JNQUwsIHR5cGVTdHJpbmc6IFwiRG9uJ3QgQ2FyZVwiLCB0aW1lSW5TZWNvbmRzOiBjdXJyZW50VGltZSxzdGF0ZTogTm90ZVN0YXRlLkRFRkFVTFR9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm90ZXMucHVzaCh0cmFjayk7XHJcbiAgICAgICAgaXNIb2xkID0gIWlzSG9sZDtcclxuICAgICAgICBjdXJyZW50VGltZSArPSB0aW1lSW5jcmVtZW50O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vdGVzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWNjdXJhY3lFdmVudE5hbWUodGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kczogbnVtYmVyLCBjb25maWc6IENvbmZpZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0ubG93ZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA8IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzWzBdLnVwcGVyQm91bmQpIHtcclxuICAgICAgICByZXR1cm4gY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbMF0ubmFtZTsgLy8gSGFuZGxlIG1pc3MgaWYgaXQgZXhpc3RzXHJcbiAgICB9XHJcbiAgICBpZiAoY29uZmlnLmFjY3VyYWN5U2V0dGluZ3NbY29uZmlnLmFjY3VyYWN5U2V0dGluZ3MubGVuZ3RoIC0gMV0udXBwZXJCb3VuZCA9PSBudWxsICYmXHJcbiAgICAgICAgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA+PSBjb25maWcuYWNjdXJhY3lTZXR0aW5nc1tjb25maWcuYWNjdXJhY3lTZXR0aW5ncy5sZW5ndGggLSAxXS5sb3dlckJvdW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2NvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aCAtIDFdLm5hbWU7IC8vIEhhbmRsZSBib28gaWYgaXQgZXhpc3RzXHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGFjY3VyYWN5OiBBY2N1cmFjeSA9IGNvbmZpZy5hY2N1cmFjeVNldHRpbmdzW2ldO1xyXG4gICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kICE9IG51bGwgJiYgYWNjdXJhY3kudXBwZXJCb3VuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChhY2N1cmFjeS5sb3dlckJvdW5kIDwgdGltZURpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyAmJiB0aW1lRGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIDw9IGFjY3VyYWN5LnVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1cmFjeS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiRVJST1I6IFVua25vd24gYWNjdXJhY3lcIjtcclxufSIsIm1vZHVsZS5leHBvcnRzID0gcDU7Il0sInNvdXJjZVJvb3QiOiIifQ==