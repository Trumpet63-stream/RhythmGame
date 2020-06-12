import {parseSwf} from "./parse_swf";

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

    private constructor() { }

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
    LOADING,
    PLAYLIST_READY,
    ERROR,
}

export class OnlinePlaylist {
    private indexUrl: string;
    private songUrl: string;
    private playlistUrl: string;
    private fullPlaylist: Song[];
    private static DEFAULT_PAGE_SIZE: number = 50;
    public state: OnlinePlaylistState;
    public playlist: Song[];

    constructor() {
        this.state = OnlinePlaylistState.NO_PLAYLIST;
    }

    public kickOffLoadPlaylist(indexUrl: string) {
        this.state = OnlinePlaylistState.LOADING;
        this.indexUrl = indexUrl;
        this.get(this.indexUrl, this.parseIndexAndLoadPlaylist.bind(this));
    }

    private parseIndexAndLoadPlaylist(event: ProgressEvent) {
        let playlistMetadata: Document = (<XMLHttpRequest> event.target).responseXML;
        this.songUrl = getContentsByTagName(playlistMetadata, "songURL");
        this.playlistUrl = getContentsByTagName(playlistMetadata, "playlistURL");
        this.get(this.playlistUrl, this.loadPlaylist.bind(this));
    }

    private loadPlaylist(event: ProgressEvent) {
        let playlistText: string = (<XMLHttpRequest> event.target).response;
        let parser = new DOMParser();

        // replace ampersands because the DOMParser doesn't like them
        let text = playlistText.replace(/&/g, '&amp;');

        let playlistXml = parser.parseFromString(text, "text/xml");
        this.parsePlaylist(playlistXml);
    }

    private parsePlaylist(playlistXml: Document) {
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
        this.state = OnlinePlaylistState.PLAYLIST_READY;
        this.setPage(0);
    }

    public kickOffLoadSong(songIndex: number) {
        let song: Song = this.fullPlaylist[songIndex];
        let level: string = song.level;
        let levelUrl = this.songUrl + "level_" + level + ".swf";
        this.get(levelUrl, this.loadSong.bind(this), "arraybuffer");
    }

    private loadSong(event: ProgressEvent) {
        let songData: ArrayBuffer = (<XMLHttpRequest> event.target).response;
        parseSwf(songData);
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

    public setPage(pageNumber: number, pageSize?: number) {
        if (pageSize === undefined) {
            pageSize = OnlinePlaylist.DEFAULT_PAGE_SIZE;
        }
        let minIndex = pageNumber * pageSize;
        let maxIndex = minIndex + pageSize;
        this.playlist = [];
        for (let i = minIndex; i < maxIndex; i++) {
            this.playlist.push(this.fullPlaylist[i]);
        }
    }
}

function getContentsByTagName(xml: Element | Document, tag: string) {
    return xml.getElementsByTagName(tag)[0].innerHTML;
}
