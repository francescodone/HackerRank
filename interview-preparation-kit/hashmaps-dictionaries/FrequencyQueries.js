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

// Complete the freqQuery function below.
function freqQuery(queries) {
    const frequencies = [];
    const frequencyTracker = [];
    const result = [];

    for (const query of queries) {
        const action = query[0];
        const value = query[1];
        let index;

        if (action === 1 || action === 2) {
            index = frequencies[value];
            frequencyTracker[index] ? --frequencyTracker[index] : null;
        }

        if (action === 1) {
            typeof frequencies[value] === 'undefined' ? frequencies[value] = 1 : ++frequencies[value];
        }

        if (action === 2 && frequencies[value]) {
            --frequencies[value];
        }

        if (action === 1 || action === 2) {
            index = frequencies[value];
            frequencyTracker[index] ? ++frequencyTracker[index] : frequencyTracker[index] = 1;
        }

        if (action === 3) {
            result.push(frequencyTracker[value] > 0 ? 1 : 0);
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
