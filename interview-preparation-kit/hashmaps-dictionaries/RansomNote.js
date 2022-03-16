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
 * Complete the 'checkMagazine' function below.
 *
 * The function accepts following parameters:
 *  1. STRING_ARRAY magazine
 *  2. STRING_ARRAY note
 */

function checkMagazine(magazine, note) {
    const response = {
        yes: 'Yes',
        no: 'No'
    }
    if (note.length <= magazine.length) {
        let isFitting = true
        const words = {}
        magazine.forEach(word => {
            (words[word] === undefined) ? words[word] = 1 : words[word]++;
        })
        note.forEach(word => {
            if (words[word] === undefined || words[word] <= 0) {
                isFitting = false
            } else if (words[word] > 0){
                words[word]--
            }
        })
        if (isFitting === true) {
            console.log(response.yes);
        } else {
            console.log(response.no);
        }
    } else {
        console.log(response.no);
    }
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);

    const n = parseInt(firstMultipleInput[1], 10);

    const magazine = readLine().replace(/\s+$/g, '').split(' ');

    const note = readLine().replace(/\s+$/g, '').split(' ');

    checkMagazine(magazine, note);
}
