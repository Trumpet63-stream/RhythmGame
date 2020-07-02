import {Song} from "./song";
import {PlaylistClientState} from "./playlist_client_state";
import {getContentsByTagName} from "./util";
import {parseSwfFromArrayBuffer, SwfParseResponse} from "../parsing/parse_swf";

export class PlaylistClient {
    private state: PlaylistClientState;
    private corsWorkaround: string = 'https://cors-anywhere.herokuapp.com/';
    private songUrl: string;
    private playlistUrl: string;
    private playlist: Song[];

    constructor() {
        this.state = PlaylistClientState.NO_APIS;
    }

    public getState(): PlaylistClientState {
        return this.state;
    }

    public getPlaylist(): Song[] {
        return this.playlist;
    }

    public async initialize(indexUrl: string) {
        try {
            await this.loadApis(indexUrl);
            await this.loadPlaylist();
        } catch (e) {}
    }

    private async loadApis(indexUrl: string) {
        try {
            this.state = PlaylistClientState.PROCESSING;
            await this.get(indexUrl)
                .then(request => this.saveApisFromPlaylistIndex(request));
        } catch (e) {
            this.state = PlaylistClientState.ERROR;
            this.handleError(e);
            throw e;
        }
    }

    private saveApisFromPlaylistIndex(request: XMLHttpRequest) {
        let responseXml: Document = request.responseXML;
        this.songUrl = getContentsByTagName(responseXml, "songURL");
        this.playlistUrl = getContentsByTagName(responseXml, "playlistURL");
        this.state = PlaylistClientState.APIS_LOADED;
    }

    private async loadPlaylist() {
        try {
            this.state = PlaylistClientState.PROCESSING;
            await this.get(this.playlistUrl)
                .then(request => this.savePlaylist(request));
        } catch (e) {
            this.state = PlaylistClientState.ERROR;
            this.handleError(e);
            throw e;
        }
    }

    private savePlaylist(request: XMLHttpRequest) {
        let playlistText: string = request.response;

        // replace ampersands because the DOMParser doesn't like them
        playlistText = playlistText.replace(/&/g, '&amp;');

        let playlistXml: Document = new DOMParser().parseFromString(playlistText, "text/xml");
        let songs: Song[] = this.getSongsFromPlaylistXml(playlistXml);
        this.saveSongsIfValid(songs);
    }

    private getSongsFromPlaylistXml(playlistXml: Document): Song[] {
        let songsXml: HTMLCollection = playlistXml.getElementsByTagName("song");
        let songs: Song[] = [];
        for (let i = 0; i < songsXml.length; i++) {
            let songXml: Element = songsXml.item(i);
            let song: Song = Song.ofXml(songXml);
            songs.push(song);
        }
        return songs;
    }

    private saveSongsIfValid(songs: Song[]) {
        if (songs.length === 0) {
            throw "Loaded a playlist with no songs.";
        } else {
            this.state = PlaylistClientState.PLAYLIST_LOADED;
            this.playlist = songs;
        }
    }

    public async getSwf(songIndex: number): Promise<SwfParseResponse> {
        try {
            this.state = PlaylistClientState.PROCESSING;
            return await this.get(this.getLevelUrl(songIndex), "arraybuffer")
                .then(request => this.getParsedSwf(request));
        } catch (e) {
            this.state = PlaylistClientState.ERROR;
            this.handleError(e);
        }
        return null;
    }

    private getLevelUrl(songIndex: number): string {
        let song: Song = this.playlist[songIndex];
        let level: string = song.level;
        return this.songUrl + "level_" + level + ".swf";
    }

    private getParsedSwf(request: XMLHttpRequest) {
        let parsedSwf = parseSwfFromArrayBuffer(<ArrayBuffer> request.response);
        this.state = PlaylistClientState.PLAYLIST_LOADED;
        return parsedSwf;
    }

    private async get(url: string, responseType?: XMLHttpRequestResponseType): Promise<XMLHttpRequest> {
        let getUrl = this.corsWorkaround + url;

        return new Promise(function(resolve, reject) {
            let request: XMLHttpRequest = new XMLHttpRequest();
            request.open('GET', getUrl, true);
            if (responseType !== undefined) {
                request.responseType = responseType;
            }

            // When the request loads, check whether it was successful
            request.onload = function() {
                if (request.status === 200) {
                    // If successful, resolve the promise by passing back the request
                    resolve(request);
                } else {
                    // If it fails, reject the promise with a error message
                    reject(Error("Get request failed with error code:" + request.statusText));
                }
            };
            request.onerror = function() {
                // Also deal with the case when the entire request fails to begin with
                // This is probably a network error, so reject the promise with an appropriate message
                reject(Error('There was a network error.'));
            };

            request.send();
        });
    }

    private handleError(e: any) {
        console.error(e);
    }
}
