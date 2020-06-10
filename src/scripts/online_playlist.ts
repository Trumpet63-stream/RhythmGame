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
}

function getContentsByTagName(xml: Element | Document, tag) {
    return xml.getElementsByTagName(tag)[0].innerHTML;
}

export class OnlinePlaylist {
    private indexUrl: string;
    private songUrl: string;
    private playlistUrl: string;
    public playlist: Song[];

    constructor() { }

    public kickOffLoadPlaylist(indexUrl: string) {
        this.indexUrl = indexUrl;
        this.get(this.indexUrl, this.parseIndexAndLoadPlaylist.bind(this));
    }

    private parseIndexAndLoadPlaylist(event: ProgressEvent) {
        let playlistMetadata: Document = (<XMLHttpRequest> event.target).responseXML;
        console.log(playlistMetadata);
        this.songUrl = getContentsByTagName(playlistMetadata, "songURL");
        console.log(this.songUrl);
        this.playlistUrl = getContentsByTagName(playlistMetadata, "playlistURL");
        console.log(this.playlistUrl);
        this.get(this.playlistUrl, this.loadPlaylist.bind(this));
    }

    private loadPlaylist(event: ProgressEvent) {
        let playlistText: string = (<XMLHttpRequest> event.target).response;
        let parser = new DOMParser();

        // replace ampersands because the DOMParser doesn't like them
        let text = playlistText.replace(/&/g, '&amp;');

        let playlistXml = parser.parseFromString(text, "text/xml");
        console.log(playlistXml);
        this.parsePlaylist(playlistXml);
        this.kickOffLoadSong(0);
    }

    private parsePlaylist(playlistXml: Document) {
        let songs: HTMLCollection = playlistXml.getElementsByTagName("song");
        this.playlist = [];
        for (let i = 0; i < songs.length; i++) {
            let songXml: Element = songs.item(i);
            if (i === 0) {
                console.log(songXml);
            }
            let song: Song = Song.ofXml(songXml);
            if (i === 0) {
                console.log(song);
            }
            this.playlist.push(song);
        }
    }

    private kickOffLoadSong(songIndex: number) {
        let song: Song = this.playlist[songIndex];
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
}