'use strict';

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
 * Complete the 'whatFlavors' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY cost
 *  2. INTEGER money
 */

function whatFlavors(cost, money) {
    const indexes = []
    const min = Math.min(...cost)
    const costMin = cost.filter(flavour => (flavour + min) <= money)
    
    let found = false
    for (let i = 0; i < costMin.length - 1 && !found; i++) {
        for (let j = i + 1; j < costMin.length && !found; j++) {
            if (costMin[i] + costMin[j] === money) {
                indexes.push(cost.indexOf(costMin[i]) + 1)
                cost[indexes[0] - 1] = -1
                indexes.push(cost.indexOf(costMin[j]) + 1)
                found = true
            }
        }
    }
    console.log(indexes.join(' '))
}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const money = parseInt(readLine().trim(), 10);

        const n = parseInt(readLine().trim(), 10);

        const cost = readLine().replace(/\s+$/g, '').split(' ').map(costTemp => parseInt(costTemp, 10));

        whatFlavors(cost, money);
    }
}
