import {getContentsByTagName} from "./util";

export class Song {
    public genre: number;
    public songName: string;
    public songAuthor: string;
    public songAuthorUrl: string;
    public songDifficulty: number;
    public songStyle: string;
    public songLength: string;
    public songStepauthor: string;
    public level: string;

    private constructor() {}

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
