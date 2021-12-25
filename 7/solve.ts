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
    const positions = inputString.split(',').map(x => parseInt(x));
    return {
        positions,
        minPos: Math.min(...positions),
        maxPos: Math.max(...positions)
    };
}

function solvePart1(input: string) {
    const { positions, minPos, maxPos } = transformInput(input);
    let minFuel = Number.MAX_VALUE;

    for (let finalPos = minPos; finalPos <= maxPos; finalPos++) {
        const fuelCost = positions.reduce((totalFuel, currentPos) => {
            return totalFuel + calculateFuel(currentPos, finalPos, x => x);
        }, 0);
        minFuel = Math.min(minFuel, fuelCost);
    };

    return JSON.stringify(minFuel);
}

function solvePart2(input: string) {
    const { positions, minPos, maxPos } = transformInput(input);
    let minFuel = Number.MAX_VALUE;

    for (let finalPos = minPos; finalPos <= maxPos; finalPos++) {
        const fuelCost = positions.reduce((totalFuel, currentPos) => {
            return totalFuel + calculateFuel(
                currentPos, 
                finalPos, 
                x => ((x+1)*(x/2)))
        }, 0);
        minFuel = Math.min(minFuel, fuelCost);
    };

    return JSON.stringify(minFuel);
}

function calculateFuel(
    startPos: number, 
    endPos: number, 
    costFunction: (steps : number) => number): number {
        const steps = Math.abs(startPos - endPos);
        return costFunction(steps);
}