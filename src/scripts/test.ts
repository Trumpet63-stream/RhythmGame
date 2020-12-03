import {compareModeOptions} from "./util";
import {Username} from "./database_client/username";
import {Password} from "./database_client/password";
import {Mode} from "./stepfile";
import {RhythmClassifier} from "./rhythm_classifier";

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
export function modeTest() {
    let modes: Mode[] = [
        {type: "dance-solo", difficulty: "Easy", meter: "4", id: 1},
        {type: "dance-single", difficulty: "Easy", meter: "5", id: 2},
        {type: "dance-solo", difficulty: "Hard", meter: "15", id: 3},
        {type: "dance-single", difficulty: "Hard", meter: "8", id: 4},
        {type: "dance-solo", difficulty: "Medium", meter: "8", id: 5},
        {type: "dance-single", difficulty: "Medium", meter: "6", id: 6},
        {type: "dance-solo", difficulty: "Edit", meter: "20", id: 7},
        {type: "dance-single", difficulty: "Challenge", meter: "12", id: 8}
    ];
    console.log(modes.sort(compareModeOptions));
}

export function usernameTest() {
    let passCount: number = 0;

    if (Username.of("ab") === null) {
        passCount++;
    } else {
        throw new Error();
    }

    if (Username.of("0123456789012345678901234567890") === null) {
        passCount++;
    } else {
        throw new Error();
    }

    if (Username.of("abc123").value === "abc123") {
        passCount++;
    } else {
        throw new Error();
    }

    if (Username.of("123 AbC") === null) {
        passCount++;
    } else {
        throw new Error();
    }

    if (Username.of("123_AbC").value === "123_AbC") {
        passCount++;
    } else {
        throw new Error();
    }

    if (Username.of("<>!@%^$!") === null) {
        passCount++;
    } else {
        throw new Error();
    }

    console.log("username test pass count = " + passCount + "/6");
}

export function passwordTest() {
    let passCount: number = 0;

    if (Password.of("abc123") === null) {
        passCount++;
    } else {
        throw new Error();
    }

    if (arraysEqual(Password.of("000000000000000000000000000000000000000000000000000000000000").keys, [
        "00000000000000000000",
        "0000000000000000000000000000000000000000"
    ])) {
        passCount++;
    } else {
        throw new Error();
    }

    if (Password.of("-#$%^0000000000000000000000000000000000000000000000000000000") === null) {
        passCount++;
    } else {
        throw new Error();
    }

    if (arraysEqual(Password.of("1a2a3a4a5000000000000000000000000000000000000000000000000000").keys, [
        "0a0a0a0a000000000000",
        "0000000000000000000000000000000504030201"
    ])) {
        passCount++;
    } else {
        throw new Error();
    }

    console.log("password test pass count = " + passCount + "/4");
}

export function arraysEqual(a1: any[], a2: any[]): boolean {
    if (a1.length !== a2.length) {
        return false;
    }
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}

export function testRhythmClassifier() {
    let classifications: number[] = [];
    for (let i = 0; i < 192; i++) {
        classifications.push(RhythmClassifier.getBeatFraction(192, i));
    }
    let success: boolean = arraysEqual(classifications, [1, 192, 96, 64, 48, 192, 32, 192, 24, 64, 96, 192, 16, 192, 96, 64, 12, 192, 32, 192, 48, 64, 96, 192, 8, 192, 96, 64, 48, 192, 32, 192, 6, 64, 96, 192, 16, 192, 96, 64, 24, 192, 32, 192, 48, 64, 96, 192, 4, 192, 96, 64, 48, 192, 32, 192, 24, 64, 96, 192, 16, 192, 96, 64, 3, 192, 32, 192, 48, 64, 96, 192, 8, 192, 96, 64, 48, 192, 32, 192, 12, 64, 96, 192, 16, 192, 96, 64, 24, 192, 32, 192, 48, 64, 96, 192, 2, 192, 96, 64, 48, 192, 32, 192, 24, 64, 96, 192, 16, 192, 96, 64, 12, 192, 32, 192, 48, 64, 96, 192, 8, 192, 96, 64, 48, 192, 32, 192, 3, 64, 96, 192, 16, 192, 96, 64, 24, 192, 32, 192, 48, 64, 96, 192, 4, 192, 96, 64, 48, 192, 32, 192, 24, 64, 96, 192, 16, 192, 96, 64, 6, 192, 32, 192, 48, 64, 96, 192, 8, 192, 96, 64, 48, 192, 32, 192, 12, 64, 96, 192, 16, 192, 96, 64, 24, 192, 32, 192, 48, 64, 96, 192]);
    console.log("rhythm classifier test success = " + success);
}

export function checkEndian(): string {
    let arrayBuffer = new ArrayBuffer(2);
    let uint8Array = new Uint8Array(arrayBuffer);
    let uint16array = new Uint16Array(arrayBuffer);
    uint8Array[0] = 0xAA; // set first byte
    uint8Array[1] = 0xBB; // set second byte
    if (uint16array[0] === 0xBBAA) return "little endian";
    if (uint16array[0] === 0xAABB) return "big endian";
    else throw new Error("Something crazy just happened");
}
