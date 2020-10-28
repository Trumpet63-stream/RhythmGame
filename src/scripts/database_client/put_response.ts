export enum PutResponseCode {
    SUCCESS,
    SCORE_TOO_LOW
}

export interface PutResponse {
    code: PutResponseCode;
    message: string;
}