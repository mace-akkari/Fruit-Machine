import { getResult, play } from './app.js';

const N = 100000;

let wins = 0;

for (let i = 0; i < N; i++) {
  const slots = play();
  const balance = 1;
  const result = getResult(slots, balance)
  if(result.win) {
    wins++;
  }
}

console.log(`Number of games: ${N}, Number of wins: ${wins}`);
console.log(`Ratio: ${((wins/N)* 100)}%`);


function playTillBust() {
  const HARD_LIMIT = 1000;
  let balance = 10;
  let plays = 0;
  while(balance && plays !== HARD_LIMIT) {
    const slots = play();
    plays++;
    const result = getResult(slots, balance);
    balance = result.balance;
  }
  return plays;
}

const n = 100000;
const results = [];
for(let i = 0; i < n; i++) {
  results.push(playTillBust());
}
const sum = results.reduce((a,c) => a + c ,0);
console.log(`games played beofre you are broke ${Math.floor(sum/n)}`)