export default class Vents {
    map: number[][] = [];
    width: number = 0;
    height: number = 0;

    constructor(lines: line[], includeDiagonals: boolean = false) {
        const allX = lines.map(line => { return line.x1 > line.x2 ? line.x1 : line.x2; })
        const allY = lines.map(line => { return line.y1 > line.y2 ? line.y1 : line.y2; })
        this.width = Math.max(...allX);
        this.height = Math.max(...allY);

        this.initializeMap(this.width, this.height);
        const horizontalLines = lines.filter(line => line.y1 === line.y2);
        horizontalLines.forEach(line => this.addHorizontalLine(line));
        const verticalLines = lines.filter(line => line.x1 === line.x2);
        verticalLines.forEach(line => this.addVerticalLine(line));

        if (includeDiagonals) {
            const diagonalLines = lines.filter(line => this.isValidDiagonal(line));
            diagonalLines.forEach(line => this.addDiagonalLine(line));
        }
    }

    private initializeMap(width: number, height: number): void {
        // fill map with zeros based on the width/height
        const row = new Array(width+1).fill(0);
        for (let i = 0; i < height+1; i++) {
            this.map.push(JSON.parse(JSON.stringify(row)));
        }
    }

    private addHorizontalLine(line: line): void {
        if (line.y1 !== line.y2) {
            throw new Error("Expected y1 == y2 for horizontal line");
        }

        const {x1, x2, y1: y} = line;
        const row = this.map[y];
        const start = x1 < x2 ? x1 : x2;
        const end = x1 > x2 ? x1 : x2;

        for (let x = start; x <= end; x++) {
            row[x] += 1;
        }

        this.map[y] = row;
    }

    private addVerticalLine(line: line): void {
        if (line.x1 !== line.x2) {
            throw new Error("Expected x1 == x2 for vertical lines");
        }

        const {y1, y2, x1: x} = line;
        const start = y1 < y2 ? y1 : y2;
        const end = y1 > y2 ? y1 : y2;

        for (let y = start; y <= end; y++) {
            this.map[y][x] += 1;
        }
    }

    private addDiagonalLine(line: line): void {
        if (!this.isValidDiagonal(line)) {
            throw new Error("Invalid diagonal line");
        }

        const {x1, x2, y1, y2} = line;
        const xDelta = x1 - x2;
        const yDelta = y1 - y2;
        const topLeftToBottomRight = xDelta === yDelta;

        const xStart = x1 < x2 ? x1 : x2;
        const xEnd = x1 > x2 ? x1 : x2;
        const yStart = y1 < y2 ? y1 : y2;

        if (topLeftToBottomRight) {
            for (let i = 0; i <= Math.abs(xDelta); i++) {
                this.map[yStart + i][xStart + i] += 1;
            }
        } else {
            for (let i = 0; i <= Math.abs(xDelta); i++) {
                this.map[yStart + i][xEnd - i] += 1;
            }
        }
    }

    private isValidDiagonal(line: line): boolean {
        const {x1, x2, y1, y2} = line;
        if (x1 == x2 || y1 == y2) {
            return false;
        }

        const xDelta = x1 - x2;
        const yDelta = y1 - y2;
        return Math.abs(xDelta) === Math.abs(yDelta);
    }

    show() {
        this.map.forEach(row => console.log(JSON.stringify(row)));
        console.log('----------------------------------');
    }

    countOverlaps(): number {
        let count = 0;
        this.map.forEach(row => {
            row.forEach(x => {
                count = x >= 2 ? count + 1 : count;
            })
        })
        return count;
    }
}

interface line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}