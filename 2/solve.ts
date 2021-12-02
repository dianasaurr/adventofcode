import { dir } from 'console';
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
    const commands = input
        .map(line => line.split(' '))
        .map(line => { return { dir: line[0], delta: parseInt(line[1])}; })

    let depth = 0;
    let horizontal = 0;
    commands.forEach(cmd => {
        switch(cmd.dir) {
            case 'forward':
                horizontal += cmd.delta;
                break;
            case 'up':
                depth -= cmd.delta;
                break;
            case 'down':
                depth += cmd.delta;
                break;
            default:
                throw new Error('unexpected command');
        }
    })

    return (depth * horizontal).toString();
}

function solvePart2(input: string[]) {
    const commands = input
        .map(line => line.split(' '))
        .map(line => { return { dir: line[0], delta: parseInt(line[1])}; })

    let aim = 0;
    let depth = 0;
    let horizontal = 0;
    commands.forEach(cmd => {
        switch(cmd.dir) {
            case 'forward':
                horizontal += cmd.delta;
                depth += aim*cmd.delta;
                break;
            case 'up':
                aim -= cmd.delta;
                break;
            case 'down':
                aim += cmd.delta;
                break;
            default:
                throw new Error('unexpected command');
        }
    })

    return (depth * horizontal).toString();
}