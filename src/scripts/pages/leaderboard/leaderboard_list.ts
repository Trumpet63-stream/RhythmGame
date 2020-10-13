import {PaginatedList} from "../../paginated_list";
import {DatabaseClient} from "../../database_client/database_client";
import {QueryResponse} from "../../database_client/query_response";
import {QueryResponseEntry} from "../../database_client/query_response_entry";
import {Config} from "../../config";

export enum LeaderboardListState {
    NO_SCORES,
    LOADING,
    READY,
    ERROR,
}

export class LeaderboardList extends PaginatedList {
    public state: LeaderboardListState;
    private databaseClient: DatabaseClient;
    public songhash: string;

    constructor() {
        super();
        this.songhash = "";
        this.state = LeaderboardListState.NO_SCORES;
    }

    private initializeClient(config: Config) {
        try {
            this.databaseClient = new DatabaseClient(config.username, config.password);
        } catch (error) {
            this.databaseClientError();
        }
    }

    private databaseClientError() {
        this.state = LeaderboardListState.ERROR;
        console.error("Failed to initialize database client.");
    }

    private clientInitialized() {
        return this.databaseClient !== undefined;
    }

    public kickOffLoadLeaderboard(config: Config, songhash: string) {
        if (!this.clientInitialized()) {
            this.initializeClient(config);
        }
        if (this.clientInitialized()) {
            this.songhash = songhash;
            this.state = LeaderboardListState.LOADING;
            this.databaseClient.query({songhash: songhash})
                .then((response) => this.initializeDisplayedList(response))
                .catch((err) => this.displayedListError(err));
        }
    }

    private displayedListError(err: any) {
        this.state = LeaderboardListState.ERROR
        console.log("Encountered an error while preparing leaderboard.");
        console.log(err);
    }

    public initializeDisplayedList(response: QueryResponse) {
        this.allContents = [];
        let entries: QueryResponseEntry[] = response.entries;
        for (let i = 0; i < entries.length; i++) {
            let entry: QueryResponseEntry = entries[i];
            let entryColumns: string[] = this.entryToColumns(entry, i);
            this.allContents.push(entryColumns);
        }

        this.setPage(0);
        this.state = LeaderboardListState.READY;
    }

    private entryToColumns(entry: QueryResponseEntry, index: number): string[] {
        let score: string = entry.score.toFixed(2) + "%";
        let rank: string = (index + 1).toString();
        return [rank, entry.user, score];
    }
}