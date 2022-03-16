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
 * Complete the 'arrayManipulation' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function arrayManipulation(n, queries) {
    const arr = Array(n + 1);
    let maxValue = 0,
    currentNumber = 0;
    queries.forEach(([startRange, endRange, value]) => {
        arr[startRange] = arr[startRange] || { start: 0, end: 0 };
        arr[endRange] = arr[endRange] || { start: 0, end: 0 };
        arr[startRange].start += value;
        arr[endRange].end += value;
    });
    arr.forEach((cell) => {
        if (cell) {
            currentNumber += cell.start;
            if (currentNumber > maxValue) maxValue = currentNumber;
            currentNumber -= cell.end;
        }
    });
  return maxValue;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = arrayManipulation(n, queries);

    ws.write(result + '\n');

    ws.end();
}
