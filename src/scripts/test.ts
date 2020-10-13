import {compareModeOptions} from "./util";
import {Mode} from "./parsing/parse_sm";
import {Username} from "./database_client/username";
import {Password} from "./database_client/password";

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