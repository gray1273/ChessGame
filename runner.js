this.board = new ChessBoard();
var white = this.board.deck.inUseWhitePieces;
var black = this.board.deck.inUseBlackPieces;
var selected = this.board.deck.selectedPieces;

function space(position){
	var startingPos = [];
	var squareID = position[0] + "" + position[1];
	var nameClass = document.getElementById(squareID).className;
	if(nameClass.includes("selected")){
		nameClass = nameClass.substring(0,5);
		document.getElementById(squareID).className = nameClass;
	}else{
		document.getElementById(squareID).className +=  " selected";
	}
	if(selected.length == 0){
		//Add the first position into selected
		selected.push(position);
	}else if(selected.length == 1 && arrayEquals(selected[0], position)){
		selected = [];
	}else if(selected.length == 1){
		//Clear the board of orange selectors.
		for(let i = 1; i<=8; i++){
			for(let k = 1; k<= 8; k++){
				squareID = i + "" + k;
				var nameClass = document.getElementById(squareID).className;
				if(nameClass.includes("selected")){
					nameClass = nameClass.substring(0,5);
					document.getElementById(squareID).className = nameClass;
				}
			}
		}
		startingPos = selected[0];
		selected = [];
		this.board.checkTurn.call(this.board,startingPos,position);
		
		
	}
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
