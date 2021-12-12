import fs from 'fs';
import BingoCard from './game';

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
    const inputs = splitInput[0].split(' ');
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
    inputs.forEach(input => {
        console.log(input);
        bingoCards.forEach(card => card.drawNumber(parseInt(input)));
        const winner = bingoCards.filter(card => card.isBingo());
        
        if (winner) {
            console.log('bingo!');
            console.log(number, card.sumUnmarked());
            return (card.sumUnmarked() * number).toString();
        }
        // for (let i = 0; i < bingoCards.length; i++) {
        //     const card = bingoCards[i];
        //     card.print();
        //     const number = parseInt(input);
        //     if (card.drawAndTestBingo(number) !== false) {
        //         console.log('bingo!');
        //         console.log(number, card.sumUnmarked());
        //         return (card.sumUnmarked() * number).toString();
        //     }
        // }
    })
    return "fail"
}

function solvePart2(input: string) {
    return "Not implemented yet";
}