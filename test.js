const Trie = require('./Trie');
//const fs = require('fs');
const Promise = require('bluebird');
const readFile = Promise.promisify(require("fs").readFile);

const WordSolver = require('./WordSolver.js');

console.log('here');

const dict = new Trie();

function parseWords(text) {
  text.split('\n').forEach(word => {
    dict.add(word.toUpperCase());
  });
}

const letters = 'seadersmlaozbntc'.toUpperCase();

test = './test.txt';
file = './words.txt';
readFile(file, 'utf8')
  .then(res => {
    parseWords(res);
    dict.printWords();
    //console.log(dict);
    const ws = new WordSolver(letters, dict);
    //console.log(ws.trieNode);
    ws.solve();
  });
