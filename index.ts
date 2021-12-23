import solve from './4/solve';

const problem = 4;
const part = 2;

export function start() {
    console.log(`Solving problem ${problem}, part ${part}`);
    console.log(solve(problem, part));
}

start();