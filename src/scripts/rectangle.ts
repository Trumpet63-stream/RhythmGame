export class Rectangle {
    public width: number;
    public height: number;
    public topLeftX: number;
    public topLeftY: number;
    public centerX: number;
    public centerY: number;

    private constructor() {
    }

    public static fromTopLeft(x: number, y: number, width: number, height: number): Rectangle {
        let rect = new Rectangle();
        rect.width = width;
        rect.height = height;
        rect.topLeftX = x;
        rect.topLeftY = y;
        rect.centerX = x + width / 2;
        rect.centerY = y + height / 2;
        return rect;
    }

    public static fromCenter(x: number, y: number, width: number, height: number): Rectangle {
        let rect = new Rectangle();
        rect.width = width;
        rect.height = height;
        rect.topLeftX = x - width / 2;
        rect.topLeftY = y - height / 2;
        rect.centerX = x;
        rect.centerY = y;
        return rect;
    }
}
