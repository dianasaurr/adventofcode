// import chalk from 'chalk';

const size = 0;
const unpickedValues = [
    [ false, false, false, false, false ],
    [ false, false, false, false, false ],
    [ false, false, false, false, false ],
    [ false, false, false, false, false ],
    [ false, false, false, false, false ]
]

export default class BingoCard {

    constructor(private values: number[][], private picked: boolean[][] = unpickedValues) {}

    drawAndTestBingo(num: number): boolean {
        const location = this.drawNumber(num);
        if (location) {
            return this.isBingo(location);
        }
        return false;
    }

    drawNumber(num: number): location | void {
        this.values.forEach((row, i) => {
            row.forEach((_, j) => {
                if (this.values[i][j] === num) {
                    this.picked[i][j] = true;
                    return { row: i, col: j };
                }
            })
        })

        return;
    }

    isBingo(pos: location | void): boolean {
        if (pos) {
            return this.isVerticalBingo(pos.col)
            || this.isHorizontalBingo(pos.row)
            || this.isDiagonalBingo();
        } else {
            return this.isVerticalBingo()
            || this.isHorizontalBingo()
            || this.isDiagonalBingo();
        }
    }

    sumUnmarked(): number {
        let count = 0;
        this.values.forEach((row, i) => {
            row.forEach((_, j) => {
                count = this.picked[i][j] ? count + this.values[i][j] : count;
            })
        })
        return count;
    }

    isVerticalBingo(column: number | void): boolean {
        if (column) {
            this.picked.forEach(row => {
                if (!row[column]) { return false; }
            })
            return true;
        } else {
            for (let col = 0; col < size; col++) {
                for (let row = 0; row < size; row++) {
                    if (!this.picked[row][col]) {
                        break;
                    } else if (row === size - 1) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    isHorizontalBingo(row: number | void): boolean {
        return row
            ? this.picked[row].every(col => col)
            : this.picked.find(row => row.every(col => col)) !== null;
    }

    isDiagonalBingo(): boolean {
        const topLeftDiag = this.picked[0][0] && this.picked[1][1] && this.picked[2][2] && this.picked[3][3] && this.picked[4][4];
        const topRightDiag = this.picked[0][4] && this.picked[1][3] && this.picked[2][2] && this.picked[3][1] && this.picked[4][0];
        return topLeftDiag || topRightDiag;
    }

    print(): void {
        // this.values.forEach((row,i) => {
        //     console.log(row);
        //     // console.log(`[${row.forEach((_,j) => {
        //     //     this.picked[i][j] ? chalk.green(this.values[i][j]) : this.values[i][j];
        //     // })}]`);
        // });
        console.log(this.picked);
        console.log('\n');
    }
}

interface location {
    row: number;
    col: number;
}