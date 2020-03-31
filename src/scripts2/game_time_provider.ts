export interface GameTimeSupplier {
    getGameTime(argument?: number): number;
}