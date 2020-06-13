import {parseSwf} from "./parsing/parse_swf";
import {Stepfile, StepfileState} from "./stepfile";
import {AudioFile, AudioFileState} from "./audio_file";

class Song {
    public genre: number;
    public songName: string;
    public songAuthor: string;
    public songAuthorUrl: string;
    public songDifficulty: number;
    public songStyle: string;
    public songLength: string;
    public songStepauthor: string;
    public level: string;

    private constructor() {
    }

    public static ofXml(xml: Element): Song {
        let song = new Song();
        song.genre = parseInt(xml.getAttribute("genre"));
        song.songName = getContentsByTagName(xml, "songname");
        song.songAuthor = getContentsByTagName(xml, "songauthor");
        song.songAuthorUrl = getContentsByTagName(xml, "songauthorurl");
        song.songDifficulty = parseInt(getContentsByTagName(xml, "songdifficulty"));
        song.songStyle = getContentsByTagName(xml, "songstyle");
        song.songLength = getContentsByTagName(xml, "songlength");
        song.songStepauthor = getContentsByTagName(xml, "songstepauthor");
        song.level = getContentsByTagName(xml, "level");
        return song;
    }

    public toString(): string {
        return this.songDifficulty + " " + this.songName;
    }
}

export enum OnlinePlaylistState {
    NO_PLAYLIST,
    LOADING_PLAYLIST,
    PLAYLIST_READY,
    PLAYLIST_ERROR,
    LOADING_SONG,
    SONG_ERROR,
}

export class OnlinePlaylist {
    public indexUrl: string;
    private songUrl: string;
    private playlistUrl: string;
    private fullPlaylist: Song[];
    private static DEFAULT_PAGE_SIZE: number = 50;
    public state: OnlinePlaylistState;
    public playlist: Song[];
    private pageNumber: number;
    private pageSize: number;

    constructor() {
        this.state = OnlinePlaylistState.NO_PLAYLIST;
        this.indexUrl = "";
    }

    public kickOffLoadPlaylist(indexUrl: string) {
        this.state = OnlinePlaylistState.LOADING_PLAYLIST;
        this.indexUrl = indexUrl;
        this.get(this.indexUrl, this.parseIndexAndLoadPlaylist.bind(this));
    }

    private parseIndexAndLoadPlaylist(event: ProgressEvent) {
        try {
            let playlistMetadata: Document = (<XMLHttpRequest>event.target).responseXML;
            this.songUrl = getContentsByTagName(playlistMetadata, "songURL");
            this.playlistUrl = getContentsByTagName(playlistMetadata, "playlistURL");
            this.get(this.playlistUrl, this.loadPlaylist.bind(this));
        } catch (e) {
            this.state = OnlinePlaylistState.PLAYLIST_ERROR;
            console.error(e);
        }
    }

    private loadPlaylist(event: ProgressEvent) {
        try {
            let playlistText: string = (<XMLHttpRequest>event.target).response;
            let parser = new DOMParser();

            // replace ampersands because the DOMParser doesn't like them
            let text = playlistText.replace(/&/g, '&amp;');

            let playlistXml = parser.parseFromString(text, "text/xml");
            this.parsePlaylist(playlistXml);
        } catch (e) {
            this.state = OnlinePlaylistState.PLAYLIST_ERROR;
            console.error(e);
        }
    }

    private parsePlaylist(playlistXml: Document) {
        try {
            let songs: HTMLCollection = playlistXml.getElementsByTagName("song");
            this.fullPlaylist = [];
            for (let i = 0; i < songs.length; i++) {
                let songXml: Element = songs.item(i);
                if (i === 0) {
                }
                let song: Song = Song.ofXml(songXml);
                if (i === 0) {
                }
                this.fullPlaylist.push(song);
            }
            if (this.fullPlaylist.length === 0) {
                this.state = OnlinePlaylistState.PLAYLIST_ERROR;
            } else {
                this.state = OnlinePlaylistState.PLAYLIST_READY;
                this.setPage(0);
            }
        } catch (e) {
            this.state = OnlinePlaylistState.PLAYLIST_ERROR;
            console.error(e);
        }
    }

    public kickOffLoadSong(songIndex: number, stepfile: Stepfile, audioFile: AudioFile) {
        this.state = OnlinePlaylistState.LOADING_SONG;
        songIndex += this.pageSize * this.pageNumber;
        stepfile.state = StepfileState.NO_SIMFILE;
        audioFile.state = AudioFileState.NO_AUDIO_FILE;
        let song: Song = this.fullPlaylist[songIndex];
        let level: string = song.level;
        let levelUrl = this.songUrl + "level_" + level + ".swf";
        this.get(levelUrl, (event: ProgressEvent) => {
            try {
                parseSwf((<XMLHttpRequest>event.target).response, stepfile, audioFile);
            } catch (e) {
                this.state = OnlinePlaylistState.SONG_ERROR;
                console.error(e);
            }
        }, "arraybuffer");
    }

    private get(url: string, onload: (event: ProgressEvent) => void, responseType?: string) {
        let corsWorkaround: string = 'https://cors-anywhere.herokuapp.com/';
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.addEventListener("load", onload);
        request.open('GET', corsWorkaround + url, true);
        if (responseType !== undefined) {
            // @ts-ignore
            request.responseType = responseType;
        }
        request.send();
    }

    public getPage() {
        return this.pageNumber;
    }

    private setPage(pageNumber: number, pageSize?: number) {
        if (pageSize === undefined) {
            pageSize = OnlinePlaylist.DEFAULT_PAGE_SIZE;
        } else if (pageSize < 1) {
            pageSize = 1;
        } else if (pageSize > 100) {
            pageSize = 100;
        }

        if (pageNumber > this.getMaxPageNumber(pageSize) || pageNumber < 0) {
            return;
        }

        let minIndex = pageNumber * pageSize;
        let maxIndex = minIndex + pageSize;
        this.playlist = [];
        for (let i = minIndex; i < maxIndex; i++) {
            if (i < this.fullPlaylist.length) {
                this.playlist.push(this.fullPlaylist[i]);
            }
        }
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    private getMaxPageNumber(pageSize: number) {
        return Math.floor(this.fullPlaylist.length / pageSize) - 1;
    }

    public nextPage() {
        this.setPage(this.pageNumber + 1);
    }

    public previousPage() {
        this.setPage(this.pageNumber - 1);
    }
}

function getContentsByTagName(xml: Element | Document, tag: string) {
    return xml.getElementsByTagName(tag)[0].innerHTML;
}
