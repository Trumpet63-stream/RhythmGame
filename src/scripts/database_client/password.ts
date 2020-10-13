export class Password {
    private static LENGTH: number = 60;
    private static VALID_CHARACTERS: RegExp = /^[\w+/]*$/;
    public keys: [string, string];

    private constructor(password: string) {
        this.keys = Password.parse(password);
    }

    public static of(password: string): Password | null {
        if (Password.isValid(password)) {
            return new Password(password);
        }
        return null;
    }

    private static isValid(password: string): boolean {
        if (password === undefined || password === null) {
            return false;
        }
        return Password.VALID_CHARACTERS.test(password) &&
            password.length === Password.LENGTH;
    }

    public static parse(password: string): [string, string] {
        let parsedString: string = Password.symmetricSwap(password);
        return [
            parsedString.substring(0, 20),
            parsedString.substring(20)
        ]
    }

    public static unparse(keys: [string, string]): string {
        let parsedString: string = keys[0] + keys[1];
        return Password.symmetricSwap(parsedString);
    }

    private static symmetricSwap(string: string): string {
        for (let i = 0; i < Math.floor(string.length / 2); i++) {
            if (i % 2 === 0) {
                string = Password.swapChars(string, i, string.length - i - 1);
            }
        }
        return string;
    }

    private static swapChars(string: string, index1: number, index2: number): string {
        let char1: string = string.charAt(index1);
        string = Password.setChar(string, index1, string.charAt(index2));
        return Password.setChar(string, index2, char1);
    }

    private static setChar(string: string, index: number, character: string): string {
        return string.substring(0, index) + character + string.substring(index + 1);
    }
}