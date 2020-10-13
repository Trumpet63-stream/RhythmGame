import {Credentials, DynamoDB} from "aws-sdk";
import {Password} from "./password";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Username} from "./username";
import {QueryRequest} from "./query_request";
import {QueryResponse} from "./query_response";
import {PutRequest} from "./put_request";
import {PutResponse} from "./put_response";
import {QueryResponseEntry} from "./query_response_entry";
import AttributeMap = DocumentClient.AttributeMap;

export class DatabaseClient {
    private readonly username: Username;
    private static region: string = "us-east-1";
    private static apiVersion: string = "2012-08-10";
    private readonly documentClient: DocumentClient;

    constructor(u: string, p: string) {
        let username: Username | null = Username.of(u);
        let password: Password | null = Password.of(p);
        if (username === null || password === null) {
            throw new Error("Invalid username or password");
        }

        this.username = username;
        let credentials: Credentials = new Credentials(password.keys[0], password.keys[1]);
        this.documentClient = new DynamoDB.DocumentClient({
            apiVersion: DatabaseClient.apiVersion,
            region: DatabaseClient.region,
            credentials: credentials
        });
    }

    public async query(request: QueryRequest): Promise<QueryResponse> {
        let params = {
            TableName: "rhythm-scores",
            IndexName: "leaderboard",
            KeyConditionExpression: 'songhash = :hash',
            ExpressionAttributeValues: {
                ":hash": request.songhash
            },
            ScanIndexForward: false
        };

        return this.documentClient.query(params).promise()
            .then((result) => {
                let entries: QueryResponseEntry[] = [];
                let items = result.Items;
                for (let i = 0; i < items.length; i++) {
                    let entry: QueryResponseEntry = this.getEntry(items[i]);
                    entries.push(entry);
                }
                console.log("scores loaded");
                return {entries: entries};
            });
    }

    private getEntry(item: AttributeMap): QueryResponseEntry {
        return {
            score: parseFloat(item.score),
            user: item.user,
            timestamp: this.timestampToDate(item.timestamp)
        };
    }

    private timestampToDate(timestamp: string): Date | null {
        if (timestamp === undefined) {
            return null;
        }
        return new Date(timestamp);
    }

    public async putIfBetterScore(request: PutRequest): Promise<PutResponse> {
        let key: string = this.username.value + "_" + request.songhash;

        let params = {
            TableName: 'rhythm-scores',
            Item: {
                "user_songhash": key,
                "user": this.username.value,
                "songhash": request.songhash,
                "songname": request.songname,
                "score": request.score,
                "timestamp": this.getNowTimestamp()
            },
            ConditionExpression: "attribute_not_exists(user_songhash) OR score < :newScore",
            ExpressionAttributeValues: {
                ":newScore": request.score
            }
        };

        return this.documentClient.put(params).promise()
            .then((result) => {
                console.log("score submitted");
                return <PutResponse>{}
            })
            .catch(reason => {
                if (reason.code === "ConditionalCheckFailedException") {
                    console.log("Score submission skipped: new score is lower than saved score");
                    return <PutResponse>{};
                }
                throw new Error(reason);
            });
    }

    private getNowTimestamp(): string {
        return new Date().toISOString();
    }
}