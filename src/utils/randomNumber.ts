export function randomNumber(min: number, max: number): number {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    return num
}