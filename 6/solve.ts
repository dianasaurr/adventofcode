import fs from 'fs';

const totalAges = 9;

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
    console.log(filename);
    try {
        return fs.readFileSync(filename, 'utf8');
    } catch (err) {
        console.error(err);
        return '';
    }
}

function transformInput(inputString: string) {
    return inputString.split(',').map(x => parseInt(x));
}

function solvePart1(input: string) {
    let state = transformInput(input);
    console.log(state);
    for (let day = 0; day < 80; day++) {
        console.log(`Day ${day+1}`);
        state = updateState(state);
    }
    return state.length.toString();
}

function solvePart2(input: string) {
    const state = transformInput(input);
    let ageCounts = []; // each index = age, element = count of age
    for (let age = 0; age < totalAges; age++) {
        ageCounts.push(state.filter(fishAge => fishAge === age).length);
    }

    for (let day = 0; day < 256; day++) {
        console.log(`Day ${day+1}`);
        ageCounts = breedFaster(ageCounts);
    }

    return ageCounts.reduce((a,c) => a+c, 0).toString();
}

function updateState(state: number[]): number[] {
    const updatedState = [];
    const newborns = [];

    for (const age of state) {
        if (age == 0) {
            updatedState.push(6);
            newborns.push(8);
        } else {
            updatedState.push(age - 1);
        }
    }

    return [...updatedState, ...newborns];
}

function breedFaster(ageCounts: number[]): number[] {
    const newAgeCount = new Array(totalAges).fill(0);

    for (let age = 1; age < totalAges; age++) {
        newAgeCount[age-1] = ageCounts[age];
    }

    newAgeCount[6] += ageCounts[0]; // just had a baby!
    newAgeCount[8] += ageCounts[0]; // new babies!
    return newAgeCount;
}