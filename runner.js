this.board = new ChessBoard();
var white = this.board.deck.inUseWhitePieces;
var black = this.board.deck.inUseBlackPieces;
var selected = this.board.deck.selectedPieces;

function space(position){
	this.board.processClick.call(this.board,position);	
	}


function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
