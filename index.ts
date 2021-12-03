import solve from './3/solve';

const problem = 3;
const part = 2;

export function start() {
    console.log(`Solving problem ${problem}, part ${part}`);
    console.log(solve(problem, part));
}

start();