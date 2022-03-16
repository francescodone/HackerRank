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

function countInversions(arr) {
    return sortAndCount(arr);
}

function sortAndCount(arr) {
    if (arr.length < 2) {
        return 0;
    }

    var mid = Math.floor(arr.length / 2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid);

    return sortAndCount(left) + sortAndCount(right) + mergeSortAndCount(arr, left, right);
}

function mergeSortAndCount(arr, left, right) {
    var i = 0, leftIndex = 0, rightIndex = 0, inversions = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            arr[i] = left[leftIndex];
            leftIndex++;
        } else {
            arr[i] = right[rightIndex];
            rightIndex++;
            inversions += (left.length - leftIndex);
        }

        i++;
    }

    while (leftIndex < left.length) {
        arr[i] = left[leftIndex];
        leftIndex++;
        i++;
    }

    while (rightIndex < right.length) {
        arr[i] = right[rightIndex];
        rightIndex++;
        i++;
    }

    return inversions;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = countInversions(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
