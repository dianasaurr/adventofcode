import fs from 'fs';
import BingoCard from './bingocard';

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

function getInput(problem: number, part: number) {
    const filename = `${process.cwd()}/${problem}/input${part}.txt`;
    try {
        return fs.readFileSync(filename, 'utf8');
    } catch (err) {
        console.error(err);
        return '';
    }
}

function transformInput(inputString: string) {
    const splitInput = inputString.split('\n\n');
    const inputs = splitInput[0].split(',').map(x => parseInt(x));

    const bingoCards = splitInput.slice(1).map(cardString => {
        const card: number[][] = [];
        cardString.split('\n').forEach(rowString => {
            const row = Array.from(rowString.split(' ').map(value => parseInt(value)).filter(value => value >= 0));
            card.push(row);
        });
        return new BingoCard(card);
    })
    
    return { inputs, bingoCards };
}

function solvePart1(input: string) {
    const { inputs, bingoCards } = transformInput(input);
    for (const input of inputs) {
        bingoCards.forEach(card => {
            card.drawNumber(input);
            // card.display();
        });
        const winner = bingoCards.filter(card => card.isBingo());
        
        if (winner.length !== 0) {
            winner[0].display();
            // console.log(input, winner[0].sumUnmarked());
            return (winner[0].sumUnmarked() * input).toString();
        }
    }
    return "fail";
}

function solvePart2(input: string) {
    const { inputs, bingoCards } = transformInput(input);
    let lastLoser = null;

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        bingoCards.forEach(card => {
            card.drawNumber(input);
            // card.display();
        });
        const losers = bingoCards.filter(card => !card.isBingo());
        
        if (losers.length == 1) {
            lastLoser = losers[0];
            lastLoser.display();
        } else if (losers.length == 0) {
            // keep picking until the last one wins
            const sum = lastLoser?.sumUnmarked() ?? 0;
            // console.log(input, sum);
            return (sum * input).toString();
        }
    }

    return "fail";
}