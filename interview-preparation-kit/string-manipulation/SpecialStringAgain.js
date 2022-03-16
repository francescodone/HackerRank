'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the substrCount function below.
function substrCount(n, s) {
    let count = n

    let [seq3, seq3_c] = [0, '']
    let [seq2, seq2_c] = [0, '']
    let [seq1, seq1_c] = [1, s[0]]

    for (let i = 1; i < n; i++) {
        const char = s[i]

        if (char === s[i - 1]) {
            count += seq1++
        } else {
            [seq3, seq3_c] = [seq2, seq2_c];
            [seq2, seq2_c] = [seq1, seq1_c];
            [seq1, seq1_c] = [1, char];
        }

        if (seq2 === 1 && seq3 >= seq1 && seq3_c === seq1_c) {
            count++
        }
    }

    return count
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
