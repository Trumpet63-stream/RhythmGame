import {Stepfile, StepfileState} from "../../stepfile";
import {AudioFile} from "../../audio/audio_file";
import {PlaylistClient} from "../../playlist_client/playlist_client";
import {Song} from "../../playlist_client/song";
import {SwfParseResponse} from "../../parsing/parse_swf";

export enum OnlinePlaylistState {
    NO_PLAYLIST,
    LOADING_PLAYLIST,
    PLAYLIST_READY,
    PLAYLIST_ERROR,
    LOADING_SONG,
    SONG_ERROR,
}

class DisplayableSong {
    private song: Song;

    constructor(song: Song) {
        this.song = song;
    }

    public toString(): string {
        return this.song.songDifficulty + " " + this.song.songName;
    }
}

export class OnlinePlaylist {
    public indexUrl: string;
    private playlistClient: PlaylistClient;
    private static DEFAULT_PAGE_SIZE: number = 50;
    public state: OnlinePlaylistState;
    public displayedPlaylist: DisplayableSong[];
    private pageNumber: number;
    private pageSize: number;
    private loadedSongName: string;

    constructor() {
        this.state = OnlinePlaylistState.NO_PLAYLIST;
        this.indexUrl = "";
        this.playlistClient = new PlaylistClient();
    }

    public kickOffLoadPlaylist(indexUrl: string) {
        this.indexUrl = indexUrl;
        this.state = OnlinePlaylistState.LOADING_PLAYLIST;
        this.playlistClient.initialize(indexUrl)
            .then(() => this.initializeDisplayedPlaylist())
            .catch(() => this.state = OnlinePlaylistState.PLAYLIST_ERROR);
    }

    private initializeDisplayedPlaylist() {
        this.setPage(0);
        this.state = OnlinePlaylistState.PLAYLIST_READY
    }

    public kickOffLoadSong(displayedSongIndex: number, stepfile: Stepfile, audioFile: AudioFile) {
        audioFile.reset();
        stepfile.state = StepfileState.NO_STEPFILE;
        this.loadedSongName = this.displayedPlaylist[displayedSongIndex].toString();
        this.playlistClient.getSwf(this.getSongIndex(displayedSongIndex))
            .then((swfParseResponse) =>
                this.loadSwfIntoStepfileAndAudioFile(swfParseResponse, stepfile, audioFile))
            .catch(() => this.state = OnlinePlaylistState.SONG_ERROR);
    }

    private getSongIndex(displayedSongIndex: number) {
        return displayedSongIndex + this.pageSize * this.pageNumber;
    }

    private loadSwfIntoStepfileAndAudioFile(swfParseResponse: SwfParseResponse, stepfile: Stepfile, audioFile: AudioFile) {
        stepfile.loadFfrBeatmap(swfParseResponse.chartData, this.loadedSongName);
        audioFile.loadBlob(swfParseResponse.blob);
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
        pageSize = OnlinePlaylist.getValidPageSize(pageSize);
        if (!this.isValidPageNumber(pageNumber, pageSize)) {
            return;
        }

        let minIndex = pageNumber * pageSize;
        let maxIndex = minIndex + pageSize;
        this.displayedPlaylist = [];
        for (let i = minIndex; i < maxIndex; i++) {
            if (i < this.playlistClient.getPlaylist().length) {
                this.displayedPlaylist.push(this.getDisplayableSong(i));
            }
        }
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    private isValidPageNumber(pageNumber: number, pageSize: number) {
        return 0 <= pageNumber && pageNumber <= this.getMaxPageNumber(pageSize);
    }

    private getDisplayableSong(songIndex: number): DisplayableSong {
        return new DisplayableSong(this.playlistClient.getPlaylist()[songIndex]);
    }

    private static getValidPageSize(pageSize: number) {
        if (pageSize === undefined) {
            return OnlinePlaylist.DEFAULT_PAGE_SIZE;
        } else if (pageSize < 1) {
            return 1;
        } else if (pageSize > 100) {
            return 100;
        }
    }

    private getMaxPageNumber(pageSize: number) {
        return Math.floor(this.playlistClient.getPlaylist().length / pageSize);
    }
}
