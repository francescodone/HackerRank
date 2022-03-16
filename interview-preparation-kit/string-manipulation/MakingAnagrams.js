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
 * Complete the 'makeAnagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function makeAnagram(a, b) {
    const dic = getDictionaries(a, b)
    let counter = 0
    Object.keys(dic).forEach(el => {
        counter = counter + Math.abs(dic[el])
    })
    return counter
}

function getDictionaries(s1, s2) {
    const dic = {}
    for (let i = 0; i < s1.length; i++) {
        (dic[s1.charAt(i)] === undefined) ? (dic[s1.charAt(i)] = 1) : (dic[s1.charAt(i)]++)
    }
    for (let i = 0; i < s2.length; i++) {
        (dic[s2.charAt(i)] === undefined) ? (dic[s2.charAt(i)] = -1) : (dic[s2.charAt(i)]--)
    }
    return dic
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
