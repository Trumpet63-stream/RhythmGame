import {LocalStorage} from "../../local_storage";
import {Score, ScoreProvider} from "../../score_provider";
import {Config} from "../../config";

export enum StorageListState {
    NO_STORAGE,
    LOADING_STORAGE,
    STORAGE_READY,
    STORAGE_ERROR,
}

export class StorageList {
    public displayedList: string[];
    private static DEFAULT_PAGE_SIZE: number = 50;
    public state: StorageListState;
    private pageNumber: number;
    private pageSize: number;
    private storageClient: typeof LocalStorage;
    private readonly config: Config

    constructor(config: Config) {
        this.config = config;
        this.state = StorageListState.NO_STORAGE;
        this.storageClient = LocalStorage;
    }

    public kickOffLoadStorageList() {
        this.state = StorageListState.LOADING_STORAGE;
        this.storageClient.loadAllEntries()
            .then(() => this.initializeDisplayedList())
            .catch(() => this.state = StorageListState.STORAGE_ERROR);
    }

    public initializeDisplayedList() {
        this.setPage(0)
        this.state = StorageListState.STORAGE_READY
    }

    public getPage() {
        return this.pageNumber;
    }

    public nextPage() {
        this.setPage(this.pageNumber + 1);
    }

    public previousPage() {
        this.setPage(this.pageNumber - 1);
    }

    private setPage(pageNumber: number, pageSize?: number) {
        pageSize = this.getValidPageSize(pageSize);
        if (!this.isValidPageNumber(pageNumber, pageSize)) {
            return;
        }

        let minIndex = pageNumber * pageSize;
        let maxIndex = minIndex + pageSize;
        this.displayedList = [];
        for (let i = minIndex; i < maxIndex; i++) {
            if (i < this.storageClient.getNumEntries()) {
                this.displayedList.push(this.getDisplayableEntry(i));
            }
        }
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    private isValidPageNumber(pageNumber: number, pageSize: number) {
        return 0 <= pageNumber && pageNumber <= this.getMaxPageNumber(pageSize);
    }

    private getDisplayableEntry(index: number): string {
        let entry = this.storageClient.getEntries()[index];
        if (entry.key.length > 120) {
            let replays = this.storageClient.loadReplays(index);
            let scoreProvider = new ScoreProvider(this.config, replays[0].numNotes);
            let bestReplay = this.storageClient.getBestReplay(replays, scoreProvider);
            let bestScore: Score = scoreProvider.score(bestReplay.entries);
            return bestReplay.songTitle +
                ", " +
                bestScore.percentScore.toFixed(2) +
                "%, " +
                replays.length +
                " " +
                (replays.length > 1 ? "plays" : "play") +
                ", " +
                (JSON.stringify(replays).length / 1000).toFixed(1) +
                "KB";
        } else {
            return entry.key;
        }
    }

    private getValidPageSize(pageSize: number) {
        if (pageSize === undefined) {
            return StorageList.DEFAULT_PAGE_SIZE;
        } else if (pageSize < 1) {
            return 1;
        } else if (pageSize > 100) {
            return 100;
        }
    }

    private getMaxPageNumber(pageSize: number) {
        return Math.floor(this.storageClient.getNumEntries() / pageSize);
    }
}