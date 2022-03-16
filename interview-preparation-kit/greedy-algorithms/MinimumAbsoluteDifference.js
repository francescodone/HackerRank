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
 * Complete the 'minimumAbsoluteDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function minimumAbsoluteDifference(arr) {
    const n = arr.length
    let min = Infinity
    for(let i=0; i<n-1; i++) {
        min = Math.min(Math.min(...arr.slice(i+1, n).map(x => Math.abs(arr[i] - x))), min)
    }
    return min
}

function minimumAbsoluteDifferenceOpt(arr) {
    const n = arr.length
    let min = Infinity
    
    //sort it and then check only adiacent elements
    const sorted = arr.sort((a, b) => a-b)
    for(let i=0; i<n-2; i++) {
        min = Math.min(min, Math.abs(sorted[i] - sorted[i+1]))
    }
    return min
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = minimumAbsoluteDifferenceOpt(arr);

    ws.write(result + '\n');

    ws.end();
}
