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

// Uses the getRandomInt function to get a number based on the Symbols array length 
export function play() {
    const getRandom = getRandomInt(NUMBER_OF_REELS);
    const slots = [];
    for(let i = 0; i < NUMBER_OF_REELS; i++) {
        slots.push(getRandom());
    }
    return slots;
}

export function isWinner(slots) {
    return allElementsTheSame(slots);
}