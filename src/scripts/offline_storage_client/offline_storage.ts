import * as localforage from "localforage";

localforage.config({name: "rhythm_game"})

// What if the user is in incognito mode?
export abstract class OfflineStorage {
    public static getItem(key: string): Promise<string> {
        return localforage.getItem(key);
    }

    public static setItem(key: string, value: string): Promise<void> {
        // Return a Promise of type void even though the API returns a Promise of type string
        return localforage.setItem(key, value).then(() => {
        });
    }

    public static key(index: number): Promise<string> {
        return localforage.key(index);
    }

    public static iterate(iteratee: (value: string, key: string, iterationNumber: number) => void): Promise<void> {
        return localforage.iterate(iteratee);
    }
}