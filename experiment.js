import { isWinner, play } from './app.js';

const N = 100000;

let wins = 0;

for (let i = 0; i < N; i++) {
  const result = play();
  if (isWinner(result)) {
    wins++;
  }
}

console.log(`Number of games: ${N}, Number of wins: ${wins}`);
console.log(`Ratio: ${(wins/N)}`);