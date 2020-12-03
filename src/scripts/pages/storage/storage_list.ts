import {OfflineStorageClient} from "../../offline_storage_client/offline_storage_client";
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
    private storageClient: typeof OfflineStorageClient;
    private readonly config: Config;

    constructor(config: Config) {
        super();
        this.config = config;
        this.state = StorageListState.NO_STORAGE;
        this.storageClient = OfflineStorageClient;
    }

    public kickOffLoadStorageList() {
        this.state = StorageListState.LOADING_STORAGE;
        this.allContents = [];
        this.storageClient.iterate((value: string, key: string) => {
            let entryColumns: string[] = this.storageEntryToColumns(key, value);
            this.allContents.push(entryColumns);
        })
            .then(() => {
                this.setPage(0);
                this.state = StorageListState.STORAGE_READY;
            })
            .catch(() => this.state = StorageListState.STORAGE_ERROR);
    }

    private storageEntryToColumns(key: string, value: string): string[] {
        if (key.length > 120) {
            let replays = this.storageClient.stringToReplays(value);
            let scoreProvider = new ScoreProvider(this.config, replays[0].numNotes);
            let bestReplay = this.storageClient.getBestReplay(replays, scoreProvider);
            let bestScore: Score = scoreProvider.score(bestReplay.entries);
            let storedSizeKb: number = value.length / 1000;

            let songTitle: string = bestReplay.songTitle;
            let bestScoreString: string = bestScore.percentScore.toFixed(2) + "%";
            let numReplays: string = String(replays.length);
            let storedSize: string = storedSizeKb.toFixed(1) + " KB";

            return [songTitle, bestScoreString, numReplays, storedSize];
        } else {
            let item: string = value;
            let storedSizeKb: number = JSON.stringify(item).length / 1000;

            let storedSize: string = storedSizeKb.toFixed(1) + " KB";
            return [key, "", "", storedSize];
        }
    }
}