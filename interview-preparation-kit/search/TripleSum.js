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

// Complete the triplets function below.
function triplets(a, b, c) {
    let counter = 0
    a = [...new Set(a)]
    b = [...new Set(b)].filter(el => el >= Math.min(...a))
    c = [...new Set(c)].filter(el => el <= Math.max(...b))

    const memoize = {}
    for (let p = 0; p < a.length; p++) {
        for (let q = 0; q < b.length; q++) {
            if (a[p] > b[q]) continue
            else if (!memoize[q]) {
                memoize[q] = 0
                for (let r = 0; r < c.length; r++) {
                    if (b[q] < c[r]) continue
                    memoize[q]++
                }
            }
            counter += memoize[q]    
        }
    }
    
    return counter
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const lenaLenbLenc = readLine().split(' ');

    const lena = parseInt(lenaLenbLenc[0], 10);

    const lenb = parseInt(lenaLenbLenc[1], 10);

    const lenc = parseInt(lenaLenbLenc[2], 10);

    const arra = readLine().split(' ').map(arraTemp => parseInt(arraTemp, 10));

    const arrb = readLine().split(' ').map(arrbTemp => parseInt(arrbTemp, 10));

    const arrc = readLine().split(' ').map(arrcTemp => parseInt(arrcTemp, 10));

    const ans = triplets(arra, arrb, arrc);

    ws.write(ans + '\n');

    ws.end();
}
