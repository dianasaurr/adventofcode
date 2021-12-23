// import chalk from 'chalk';

const size = 5;
const unpickedValues = [
    [ false, false, false, false, false ],
    [ false, false, false, false, false ],
    [ false, false, false, false, false ],
    [ false, false, false, false, false ],
    [ false, false, false, false, false ]
]

export default class BingoCard {

    constructor(private values: number[][], private picked: boolean[][] = JSON.parse(JSON.stringify(unpickedValues))) {}

    display(): void {
        console.log(JSON.stringify(this.values));
        console.log(JSON.stringify(this.picked));

        // this.values.forEach((r, ri) => {
        //     let row = '|';
        // })
        // function isPicked() {
        // }
    }

    drawAndTestBingo(num: number): boolean {
        const location = this.drawNumber(num);
        if (location) {
            return this.isBingo(location);
        }
        return false;
    }

    drawNumber(num: number): location | void {
        // console.log(num);
        this.values.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value === num) {
                    // console.log(num, i, j)
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
            || this.isHorizontalBingo(pos.row);
        } else {
            return this.isVerticalBingo()
            || this.isHorizontalBingo();
        }
    }

    sumUnmarked(): number {
        let count = 0;
        this.values.forEach((row, i) => {
            row.forEach((_, j) => {
                console.log(this.values[i][j], this.picked[i][j], count);
                count = this.picked[i][j] ? count: count + this.values[i][j];
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
        if (row) {
            return this.picked[row].every(col => col === true);
        } else {
            for (const row of this.picked) {
                if (row.every(col => col === true)) {
                    return true;
                }
            };
            return false;
        }
    }

    // print(): void {
    //     this.values.forEach((row,i) => {
    //         console.log(row);
    //         console.log(`[${row.forEach((_,j) => {
    //             this.picked[i][j] ? chalk.green(this.values[i][j]) : this.values[i][j];
    //         })}]`);
    //     });
    //     console.log(this.picked);
    //     console.log('\n');
    // }
}

interface location {
    row: number;
    col: number;
}