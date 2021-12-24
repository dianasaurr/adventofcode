import fs from 'fs';
import Vents from './vent'

export default function solve(problem: number, part: number) {
    const input = getInput(problem);
    if (part === 1) {
        return solvePart1(input);
    } else {
        return solvePart2(input);
    }
}

function getInput(problem: number) {
    const filename = `${process.cwd()}/${problem}/input.txt`;
    try {
        return fs.readFileSync(filename, 'utf8');
    } catch (err) {
        console.error(err);
        return '';
    }
}

function transformInput(inputString: string, includeDiagonals: boolean = false) {
    const stringRows = inputString.split('\n');
    const lines = stringRows.map(row => {
        const coords = row
            .split(' -> ')
            .map(coord => coord
                .split(',')
                .map(c => parseInt(c))
            );

            return {
            x1: coords[0][0],
            y1: coords[0][1],
            x2: coords[1][0],
            y2: coords[1][1]
        }
    })
    
    return new Vents(lines, includeDiagonals);
}

function solvePart1(input: string) {
    const vents = transformInput(input);
    const count = vents.countOverlaps();
    return count.toString();
}

function solvePart2(input: string) {
    const vents = transformInput(input, true);
    const count = vents.countOverlaps();
    return count.toString();
}