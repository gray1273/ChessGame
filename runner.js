this.board = new ChessBoard();

function space(position){
	var squareID = position[0] + "" + position[1];
	var nameClass = document.getElementById(squareID).className;
	if(nameClass.includes("selected")){
		nameClass = nameClass.substring(0,5);
		document.getElementById(squareID).className = nameClass;
	}else{
		document.getElementById(squareID).className +=  " selected";
}
}
function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
