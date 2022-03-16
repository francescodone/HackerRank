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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
  // key for each unique letter in the string and the value is how many times it appears
  const stringCounts = {};

  // key for all letter counts in the string and how many times the count occurs
  const countOccurence = {};

  for (let i = 0; i < s.length; i++) {
    const letter = s[i];
    stringCounts[letter] = (stringCounts[letter] || 0) + 1;
  }

  for (const key in stringCounts) {
    const letterCount = stringCounts[key];
    countOccurence[letterCount] = (countOccurence[letterCount] || 0) + 1;
  }

  const counts = Object.keys(countOccurence);

  if (counts.length > 2) return "NO";
  if (counts.length === 1) return "YES";

  const singleCount = counts.find(count => count === "1");

  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  // if only one character has a count of one it can be removed and all other letters will have equal counts
  // if only one character appears one more time than all the other characters one occurance of it can be removed
  // and all characters will have equal counts
  return (singleCount && countOccurence[singleCount] === 1) ||
    (maxCount - minCount === 1 && countOccurence[maxCount] === 1)
    ? "YES"
    : "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
