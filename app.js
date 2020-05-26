const SYMBOLS = [
    "bell",
    "pear",
    "cherry"
];

// Generates a random number
function getRandomInt(max) {
    return function() {
        return Math.floor(Math.random() * max);
    }
}

// Uses the getRandomInt function to get a number based on the Symbols array length 
function play() {
    const getRandom = getRandomInt(SYMBOLS.length);
    const slots = [];
    for(let i = 0; i < SYMBOLS.length; i++) {
        slots.push(getRandom());
    }
    return slots;
}

// Maps over a paremeter, for each iteration in the (slots) it goes over the SYMBOLS array.
function display(slots) {
    const formatted = slots.map(slot => SYMBOLS[slot]);
    console.log(formatted);
}

// Calling the display() using play() as the parameter 
function main() {
    display(play());
}

main();  