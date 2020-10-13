export class Username {
    private static MAX_LENGTH: number = 30;
    private static MIN_LENGTH: number = 3;
    private static VALID_CHARACTERS: RegExp = /^\w*$/;
    public readonly value: string;

    private constructor(username: string) {
        this.value = username;
    }

    public static of(username: string): Username | null {
        if (Username.isValid(username)) {
            return new Username(username);
        }
        return null;
    }

    private static isValid(username: string): boolean {
        if (username === undefined || username === null) {
            return false;
        }
        return Username.VALID_CHARACTERS.test(username) &&
            Username.MIN_LENGTH <= username.length &&
            username.length <= Username.MAX_LENGTH;
    }
}