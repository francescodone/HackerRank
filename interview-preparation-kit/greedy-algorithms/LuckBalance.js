'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'luckBalance' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. 2D_INTEGER_ARRAY contests
 */

function luckBalance(k, contests) {
    const importants = contests.filter(contest => contest[1] === 1).flat().filter((x, i) => i%2 === 0)
    const unimportants = contests.filter(contest => contest[1] === 0)
    let score = unimportants.flat().reduce((a, b) => a+b, 0)
    return score+getLucky(k, importants)
}

function getLucky(k, contests) {
    const sorted = contests.sort((a, b) => a-b)
    if (k < sorted.length) return (-1*(sorted.slice(0, sorted.length-k).reduce((a,b) => a+b, 0)))+(sorted.slice(sorted.length-k).reduce((a,b) => a+b, 0))
    else return (sorted.reduce((a,b) => a+b, 0))
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    let contests = Array(n);

    for (let i = 0; i < n; i++) {
        contests[i] = readLine().replace(/\s+$/g, '').split(' ').map(contestsTemp => parseInt(contestsTemp, 10));
    }

    const result = luckBalance(k, contests);

    ws.write(result + '\n');

    ws.end();
}
