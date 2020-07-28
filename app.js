const NUMBER_OF_REELS = 3;

// Generates a random number
function getRandomInt(max) {
    return function () {
        return Math.floor(Math.random() * max);
    }
}

function allElementsTheSame(arr) {
    const [head, ...tail] = arr;
    return tail.every((x) => head === x);
}

function arraysTheSame(arr0, arr1) {
    return JSON.stringify(arr0) === JSON.stringify(arr1);
}

// Uses the getRandomInt function to get a number based on the Symbols array length 
export function play() {
    const getRandom = getRandomInt(NUMBER_OF_REELS);
    const slots = [];
    for(let i = 0; i < NUMBER_OF_REELS; i++) {
        slots.push(getRandom());
    }
    return slots;
}

function calculateNewBalance(slots, balance) {
    let newBalance;
    if(allElementsTheSame(slots)) {
        newBalance = balance + 2;
    } else if(arraysTheSame(slots.slice(0, 2), [0,0])) {
        newBalance = balance + 1;
    } else if(arraysTheSame(slots.slice(0, 2), [1,1])) {
        newBalance = balance;
    } else {
        newBalance = balance - 1;
    }
    return newBalance;
}

export function getResult(slots, balance) {
    const newBalance = calculateNewBalance(slots, balance);
    const win = newBalance >= balance;
    return {
        win,
        balance: newBalance
    }
}