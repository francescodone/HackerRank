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
 * Complete the 'hourglassSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function hourglassSum(arr) {
    // Write your code here
    let max = -Infinity
    let current = -Infinity
    for (let i=0; i<arr[0].length-2; i++) {
        for (let j=0; j<arr.length-2; j++) {
            current = calculateHourglass(arr, j, i)
            if (current>max) {
                max = current
            }
        }
    }
    return max
}

/**
 * @param {arr} is the 6x6 array
 * @param {r} is the starting row
 * @param {c} is the starting column
 * @return the sum of the elements of hourglass in [r,c]
 */
function calculateHourglass(arr, r, c) {
    let counter = 0;
    const pattern = [
        [0,0], [0,1], [0,2], 
               [1,1],
        [2,0], [2,1], [2,2]  
    ]
    pattern.forEach(coordinate => {
        counter = counter + arr[r+coordinate[0]][c+coordinate[1]]
    })
    return counter
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = hourglassSum(arr);

    ws.write(result + '\n');

    ws.end();
}
