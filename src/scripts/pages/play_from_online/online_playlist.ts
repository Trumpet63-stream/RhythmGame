import {Stepfile, StepfileState} from "../../stepfile";
import {AudioFile} from "../../audio/audio_file";
import {PlaylistClient} from "../../playlist_client/playlist_client";
import {Song} from "../../playlist_client/song";
import {SwfParseResponse} from "../../parsing/parse_swf";
import {PaginatedList} from "../../paginated_list";

export enum OnlinePlaylistState {
    NO_PLAYLIST,
    LOADING_PLAYLIST,
    PLAYLIST_READY,
    PLAYLIST_ERROR,
    LOADING_SONG,
    SONG_ERROR,
}

export class OnlinePlaylist extends PaginatedList {
    public indexUrl: string;
    private playlistClient: PlaylistClient;
    public state: OnlinePlaylistState;
    private loadedSongName: string;

    constructor() {
        super();
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
        this.allContents = [];
        let songs: Song[] = this.playlistClient.getPlaylist();
        for (let i = 0; i < songs.length; i++) {
            let song: Song = songs[i];
            let entryColumns: string[] = this.songToColumns(song);
            this.allContents.push(entryColumns);
        }

        this.setPage(0);
        this.state = OnlinePlaylistState.PLAYLIST_READY
    }

    public kickOffLoadSong(displayedSongIndex: number, stepfile: Stepfile, audioFile: AudioFile) {
        audioFile.reset();
        stepfile.state = StepfileState.NO_STEPFILE;
        this.loadedSongName = this.currentContents[displayedSongIndex];
        this.playlistClient.getSwf(this.getSongIndex(displayedSongIndex))
            .then((swfParseResponse) =>
                this.loadSwfIntoStepfileAndAudioFile(swfParseResponse, stepfile, audioFile))
            .catch(() => this.state = OnlinePlaylistState.SONG_ERROR);
    }

    private getSongIndex(displayedSongIndex: number) {
        return displayedSongIndex + this.pageSize * this.currentPage;
    }

    private loadSwfIntoStepfileAndAudioFile(swfParseResponse: SwfParseResponse, stepfile: Stepfile, audioFile: AudioFile) {
        stepfile.loadFfrBeatmap(swfParseResponse.chartData, this.loadedSongName);
        audioFile.loadBlob(swfParseResponse.blob);
    }

    private songToColumns(song: Song): string[] {
        return [String(song.songDifficulty), song.songName];
    }
}