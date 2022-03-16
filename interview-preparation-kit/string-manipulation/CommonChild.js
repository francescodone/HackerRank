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
 * Complete the 'commonChild' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */

function commonChild(s1, s2) {
    //using dynamic programming
    const table = [new Array(s2.length + 1).fill(0)]
    for (let i = 0; i < s1.length; i++) table.push([0])
    for (let i = 1; i < s2.length + 1; i++) {
        for (let j = 1; j < s1.length + 1; j++) {
            if (s1.charAt(j - 1) === s2.charAt(i - 1)) {
                table[i][j] = table[i - 1][j - 1] + 1
            } else {
                table[i][j] = Math.max(table[i - 1][j], table[i][j - 1])
            }
        }
    }
  
    return table[s2.length][s1.length]
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    const result = commonChild(s1, s2);

    ws.write(result + '\n');

    ws.end();
}
