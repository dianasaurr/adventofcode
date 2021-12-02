import fs from 'fs';

export default function solve(problem: number, part: number) {
    const input = getInput(problem, part);
    let solution = '';
    if (part === 1) {
        solution = solvePart1(input);
    } else {
        solution = solvePart2(input);
    }
    return solution;
}

function getInput(problem: number, part: number): string[] {
    const filename = `./${problem}/input${part}.txt`;
    try {
        return fs.readFileSync(filename, 'utf8').split('\n');
    } catch (err) {
        console.error(err);
        return [];
    }
}

function solvePart1(input: string[]) {
    const depths = input.map(d => parseInt(d));
    return countIncreases(depths).toString();
}

function solvePart2(input: string[]) {
    const depths = input.map(d => parseInt(d));
    const summedDepths = [];
    for (let i = 0; i < depths.length-2; i++) {
        const sum = depths[i] + depths[i+1] + depths[i+2];
        // console.log(`${depths[i]} + ${depths[i+1]} + ${depths[i+2]} = ${sum}`)
        summedDepths.push(sum);
    }
    // console.log(summedDepths);
    return countIncreases(summedDepths).toString();
}

function countIncreases(input: number[]): number {
    let numIncreases = 0;
    for (let i = 0; i < input.length-1; i++) {
        if (input[i+1] > input[i]) {
            numIncreases++;
        }
    }
    return numIncreases;
}