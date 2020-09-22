import {LocalStorage} from "../../local_storage";
import {Score, ScoreProvider} from "../../score_provider";
import {Config} from "../../config";
import {PaginatedList} from "../../paginated_list";

export enum StorageListState {
    NO_STORAGE,
    LOADING_STORAGE,
    STORAGE_READY,
    STORAGE_ERROR,
}

export class StorageList extends PaginatedList {
    public state: StorageListState;
    private storageClient: typeof LocalStorage;
    private readonly config: Config

    constructor(config: Config) {
        super();
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
        this.allContents = [];
        let storageEntries: { key: string, value: string }[] = this.storageClient.getEntries();
        for (let i = 0; i < storageEntries.length; i++) {
            let entry: { key: string, value: string } = storageEntries[i];
            let entryColumns: string[] = this.storageEntryToColumns(entry);
            this.allContents.push(entryColumns);
        }

        this.setPage(0);
        this.state = StorageListState.STORAGE_READY;
    }

    private storageEntryToColumns(entry: { key: string, value: string }): string[] {
        if (entry.key.length > 120) {
            let replays = this.storageClient.loadReplays(entry.key);
            let scoreProvider = new ScoreProvider(this.config, replays[0].numNotes);
            let bestReplay = this.storageClient.getBestReplay(replays, scoreProvider);
            let bestScore: Score = scoreProvider.score(bestReplay.entries);
            let storedSizeKb: number = JSON.stringify(replays).length / 1000;

            let songTitle: string = bestReplay.songTitle;
            let bestScoreString: string = bestScore.percentScore.toFixed(2) + "%";
            let numReplays: string = String(replays.length);
            let storedSize: string = storedSizeKb.toFixed(1) + " KB";

            return [songTitle, bestScoreString, numReplays, storedSize];
        } else {
            let item: string = this.storageClient.getItem(entry.key);
            let storedSizeKb: number = JSON.stringify(item).length / 1000;

            let storedSize: string = storedSizeKb.toFixed(1) + " KB";
            return [entry.key, "", "", storedSize];
        }
    }
}