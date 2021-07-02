//DeckKernal populates the inUsePieces array with the objects of all the pieces
class DeckKernel {
	//Setup the board
	constructor(){
		this.selectedPieces = [];
		this.inUseWhitePieces = [];
		this.inUseBlackPieces = [];

		this.reset();
		
	}
	//Reset the board on game restart
	reset(){
		this.selectedPieces = [];
		this.inUseWhitePieces = [];
		this.inUseBlackPieces = [];
		
			for(let i = 1; i <= 8; i++){
				this.inUseWhitePieces.push(new Piece("Pawn",(i),[2,i],"White","./images/white_pawn.png"));
			}
			
			
			this.inUseWhitePieces.push(new Piece ("Knight",9,[1,7],"White","./images/white_knight.png"));
			this.inUseWhitePieces.push(new Piece ("Knight",10,[1,2],"White","./images/white_knight.png"));
			this.inUseWhitePieces.push(new Piece ("Bishop",11,[1,6],"White","./images/white_bishop.png"));
			this.inUseWhitePieces.push(new Piece ("Bishop",12,[1,3],"White","./images/white_bishop.png"));
			this.inUseWhitePieces.push(new Piece ("Rook",13,[1,8],"White","./images/white_rook.png"));
			this.inUseWhitePieces.push(new Piece ("Rook",14,[1,1],"White","./images/white_rook.png"));
			
			
			this.inUseWhitePieces.push(new Piece ("King",15,[1,5],"White","./images/white_king.png"));
			this.inUseWhitePieces.push(new Piece ("Queen",16,[1,4],"White","./images/white_queen.png"));
			//Create other type of pieces
			for(let i = 1; i <= 8; i++){
				this.inUseBlackPieces.push(new Piece("Pawn",(i+16),[7,i],"Black","./images/black_pawn.png"));
			}
			
			this.inUseBlackPieces.push(new Piece ("Knight",25,[8,7],"Black","./images/black_knight.png"));
			this.inUseBlackPieces.push(new Piece ("Knight",26,[8,2],"Black","./images/black_knight.png"));
			this.inUseBlackPieces.push(new Piece ("Bishop",27,[8,6],"Black","./images/black_bishop.png"));
			this.inUseBlackPieces.push(new Piece ("Bishop",28,[8,3],"Black","./images/black_bishop.png"));
			this.inUseBlackPieces.push(new Piece ("Rook",29,[8,8],"Black","./images/black_rook.png"));
			this.inUseBlackPieces.push(new Piece ("Rook",30,[8,1],"Black","./images/black_rook.png"));
			

			this.inUseBlackPieces.push(new Piece ("King",31,[8,5],"Black","./images/black_king.png"));
			this.inUseBlackPieces.push(new Piece ("Queen",32,[8,4],"Black","./images/black_queen.png"));
	}
	
	resetSelected(){
		this.selectedPieces = [];
	}
	findIfPosFilled(pos){
		var test = false;
		for(let i = 0; i<this.inUseBlackPieces.length; i++){
				if(pos[0] == this.inUseBlackPieces[i].get_pos[0] && pos[1] == this.inUseBlackPieces[i].get_pos[1]){
					test = true;
				}
		}
		for(let i = 0; i<this.inUseWhitePieces.length; i++){
			if(pos[0] == this.inUseWhitePieces[i].get_pos[0] && pos[1] == this.inUseWhitePieces[i].get_pos[1]){
				test = true;
			}
		}

		return test;
	}
	findByPos(pos){
		var temp;
		for(let i = 0; i<this.inUseBlackPieces.length; i++){
			if(pos[0] == this.inUseBlackPieces[i].get_pos[0] && pos[1] == this.inUseBlackPieces[i].get_pos[1]){
				
				return this.inUseBlackPieces[i];
			}
		}
		for(let i = 0; i<this.inUseWhitePieces.length; i++){
			if(pos[0] == this.inUseWhitePieces[i].get_pos[0] && pos[1] == this.inUseWhitePieces[i].get_pos[1]){

				
				return this.inUseWhitePieces[i];
		}
	}
	
		
	}
}
