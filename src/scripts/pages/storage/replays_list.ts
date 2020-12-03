import {OfflineStorageClient} from "../../offline_storage_client/offline_storage_client";
import {Score, ScoreProvider} from "../../score_provider";
import {Config} from "../../config";
import {PaginatedList} from "../../paginated_list";
import {CompressedReplay, Replay} from "../../accuracy_recording";

export enum ReplaysListState {
    NO_STORAGE,
    LOADING_STORAGE,
    STORAGE_READY,
    STORAGE_ERROR,
}

export class ReplaysList extends PaginatedList {
    public state: ReplaysListState;
    private storageClient: typeof OfflineStorageClient;
    private readonly config: Config;
    private compressedReplays: CompressedReplay[];

    constructor(config: Config) {
        super();
        this.config = config;
        this.state = ReplaysListState.NO_STORAGE;
        this.storageClient = OfflineStorageClient;
    }

    public kickOffLoadReplaysList(key: string) {
        this.state = ReplaysListState.LOADING_STORAGE;
        this.allContents = [];
        this.storageClient.loadReplaysCompressed(key)
            .then((replays: CompressedReplay[]) => {
                this.compressedReplays = replays;
                for (let i = replays.length - 1; i >= 0; i--) {
                    let entryColumns: string[] = this.storageEntryToColumns(replays[i]);
                    this.allContents.push(entryColumns);
                }
            })
            .then(() => {
                this.setPage(0);
                this.state = ReplaysListState.STORAGE_READY;
            })
            .catch(() => this.state = ReplaysListState.STORAGE_ERROR);
    }

    private storageEntryToColumns(compressedReplay: CompressedReplay): string[] {
        let replay: Replay = this.storageClient.getUncompressedReplay(compressedReplay);
        let scoreProvider = new ScoreProvider(this.config, replay.numNotes);
        let score: Score = scoreProvider.score(replay.entries);
        let storedSizeKb: number = JSON.stringify(compressedReplay).length / 1000;

        let timestamp: string = replay.timestamp;
        let scoreString: string = score.percentScore.toFixed(2) + "%";
        let storedSize: string = storedSizeKb.toFixed(1) + " KB";

        return [timestamp, scoreString, storedSize];
    }

    public getReplay(indexOnCurrentPage: number): Replay {
        let index = this.currentPage * this.pageSize + indexOnCurrentPage;
        let reversedIndex = this.allContents.length - index - 1;
        let compressedReplay: CompressedReplay = this.compressedReplays[reversedIndex];
        return this.storageClient.getUncompressedReplay(compressedReplay);
    }
}