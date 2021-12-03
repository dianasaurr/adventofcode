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
    const { ones, zeros, length } = countOnesAndZeros(input);
    // console.log(ones, zeros, length);
    let gammaBinaryString = '';
    let epsilonBinaryString = '';

    for (var i = 0; i < length; i++) {
        const oneCount = ones[i];
        const zeroCount = zeros[i];

        if (oneCount >= zeroCount) {
            gammaBinaryString += '1';
            epsilonBinaryString += '0';
        } else {
            gammaBinaryString += '0';
            epsilonBinaryString += '1';
        }
    }

    // console.log(gammaBinaryString, epsilonBinaryString);
    const gamma = convertToBinary(gammaBinaryString);
    const epsilon = convertToBinary(epsilonBinaryString);
    // console.log(gamma, epsilon);
    return (gamma * epsilon).toString();
}

function solvePart2(input: string[]) {
    const oxygenBinaryString = getOxygenRating(input);
    const c02ratingBinaryString = getC02Rating(input);

    const oxygen = convertToBinary(oxygenBinaryString);
    const c02 = convertToBinary(c02ratingBinaryString);
    return (oxygen * c02).toString();
}

function getOxygenRating(input: string[]): string {
    let eligible = Array.from(input);
    for (var i = 0; i < input[0].length; i++) {
        let ones = 0;
        let zeros = 0;
        eligible.forEach(line => {
            const c = line.charAt(i);
            c == '0' ? zeros++ : ones++;
        })

        eligible = ones >= zeros 
            ? eligible.filter(x => x[i] === '1') 
            : eligible.filter(x => x[i] === '0');

        if (eligible.length == 1) { break; }
    }
    
    if (eligible.length !== 1) {
        throw new Error("Expected 1 value but got " + eligible.length);
    }
    
    return eligible[0];
}

function countOnesAndZeros(input: string[]) {
    const length = input[0].length;
    let ones = new Array(length).fill(0);
    let zeros = new Array(length).fill(0);

    input.forEach(line => {
        for (var i = 0; i < length; i++) {
            const c = line.charAt(i);
            c == '0' ? zeros[i]++ : ones[i]++;
        }
    })

    return { ones, zeros, length };
}

function convertToBinary(string: string) {
    return parseInt(string, 2);
}

function getC02Rating(input: string[]): string {
    let eligible = Array.from(input);
    for (var i = 0; i < input[0].length; i++) {
        let ones = 0;
        let zeros = 0;
        eligible.forEach(line => {
            const c = line.charAt(i);
            c == '0' ? zeros++ : ones++;
        })

        eligible = ones >= zeros 
            ? eligible.filter(x => x[i] === '0') 
            : eligible.filter(x => x[i] === '1');

        if (eligible.length == 1) { break; }
    }
    
    if (eligible.length !== 1) {
        throw new Error("Expected 1 value but got " + eligible.length);
    }
    
    return eligible[0];
}