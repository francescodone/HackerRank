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

// Complete the getMinimumCost function below.
function getMinimumCost(k, c) {
    c = c.sort((a, b) => a-b)
    let n = c.length
    let result = 0
    if(k >= n){
        // get the first n flowers
        for(let i=0; i<n; i++){
            result += c[i]
        }
    }else{
        // k < n
        let x = 0          
        while(n > 0){                
            for(let i=0; i<k; i++){
                result += c[n-1]*(x+1)
                n--
                if(n == 0){
                    break
                }
            }                
            x++
        }
    }
    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    const minimumCost = getMinimumCost(k, c);

    ws.write(minimumCost + '\n');

    ws.end();
}
