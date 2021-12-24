import fs from 'fs';

export default function solve(problem: number, part: number) {
    const input = getInput(problem);
    let solution = '';
    if (part === 1) {
        solution = solvePart1(input);
    } else {
        solution = solvePart2(input);
    }
    return solution;
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

function transformInput(inputString: string) {
    return;
}

function solvePart1(input: string) {
    return "Not implemented yet";
}

function solvePart2(input: string) {
    return "Not implemented yet";
}