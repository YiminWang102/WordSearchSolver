
class WordSolver {
  constructor(str, trie) {
    this.grid = [];
    this.trieNode = trie.node;
    if (str.length == 16) {
      for (let i = 0; i < 4; i++) {
        this.grid.push([]);
        for (let j = 0; j< 4; j++) {
          this.grid[i][j] = str[i * 4 + j];
        }
      }
    }
  }

  solve() {
    const words = [];
    const wordSet = {};
    const grid = this.grid;
    const visited = [];
    for (let i = 0; i < 4; i++) {
      visited.push([]);
      for (let j = 0; j < 4; j++) {
        visited[i][j] = 0;
      }
    }

    const isValid = function (i, j, trieNode) {
      if (i < 0 || i > 3) return false;
      if (j < 0 || j > 3) return false;
      const letter = grid[i][j];
      if (visited[i][j]) return false;
      if (!trieNode[letter]) return false;
      return true;
    };

    const traverse = function(i, j, str, visited, trieNode, points) {
      visited[i][j] = 1;
      const letter = grid[i][j];
      str += letter;
      points = points + 1;
      let newNode;
      if (trieNode[letter]) trieNode = trieNode[letter];
      else return;
      if (trieNode.isWord) {
        if (!wordSet[str]) {
          wordSet[str] = true;
          words.push({
            word: str,
            points: points,
            row: i,
            col: j
          });
        }
      }
      //for each neighbor, traverse there;
      const neighbors = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1], [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];

      neighbors.forEach(n => {
        if (isValid(n[0], n[1], trieNode)) {
          traverse(n[0], n[1], str, visited, trieNode, points);
        }
      });
      visited[i][j] = 0;
    };


    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        traverse(i, j, '', visited, this.trieNode, 0);
      }
    }

    words.sort((a, b) => a.points - b.points);
    words.forEach(word =>{
      console.log(word.word, word.points, word.row, word.col);
    });
  }
}

module.exports = WordSolver;
