 class Trie {
  constructor() {
    this.node = {};
    this.ab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  add(word) {
    let curr = this.node;
    word.split('').forEach((letter, i) => {
      if (curr[letter]) curr = curr[letter];
      else {
        curr[letter] = {};
        curr = curr[letter];
      }

      if (i === word.length - 1) curr.isWord = true;
    });
  }

  printWords() {
    let curr = this.node;
    const ab = this.ab;

    const helper = function(node, str) {
      if (node.isWord) console.log(str);
      else {
        ab.split('').forEach(letter => {
          if (node[letter]) helper(node[letter], str + letter);
        });
      }
    };

    helper(curr, '');
  }
}

module.exports = Trie;
