class ChessBoard {
    constructor() {
        //Board creates a new deck, deck creates and holds all the pieces
        this.deck = new DeckKernel();
        this.prepareBoard();
        
    }

    prepareBoard() {
        //Create the HTML chess board squares
        var strDiv = "<table class = \"center\">";
        var temp = 0;
        var color = "";

        for(let i = 8; i>=1; i--){
            strDiv += "<tr>";
            for(let k = 1; k<=8; k++){
                if(((k+i)%2)== 1){
                    color = "white";
                }else{
                    color = "black";
                }
                //Create each column for each row with a class, an embedded image, and onlick method
                strDiv += "<td class = \""+color+"\"onclick=\"space(["+i+","+k+"])\"id=\""+i+""+k+"\"><img id = \"i"+i+k+"\" src = \"\" class = \"centerPiece\"></img></td>";
            }
            strDiv += "</tr>";
        }
    strDiv += "</table>"
    //Add the rows and columns to the html body.
    document.getElementById("theBoard").innerHTML = strDiv;
    //Update the board with the pieces
    this.updateBoard();
    }


    //Update board resets all spots on the board and then adds the correct pieces to the correct spot.
    updateBoard(){
        for(let i = 1; i <=8; i++){
            for(let k = 1; k <=8; k++){
                var squareID = "i"+i+""+k;
                //console.log(squareID);
                document.getElementById(squareID).src = "";
            }
        }
        //Adds the black pieces to the spot they belong
        for(let i = 0; i < this.deck.inUseBlackPieces.length; i++){
            //Set pieces on board
            var temp = this.deck.inUseBlackPieces[i].get_pos;
            var squareID = "i" + temp[0] + temp[1];
            document.getElementById(squareID).src = this.deck.inUseBlackPieces[i].get_source;
        }
        //Adds the white pieces to the spot that they belong
        for(let i = 0; i < this.deck.inUseWhitePieces.length; i++){
            var temp = this.deck.inUseWhitePieces[i].get_pos;
            
            var squareID = "i"+ temp[0] + temp[1];
            //console.log(squareID);
            document.getElementById(squareID).src = this.deck.inUseWhitePieces[i].get_source;
        }
        
        this.movementBishop(this.deck.inUseWhitePieces[4]);
    }








    //Movement logic
    movementRook(piece){
        
        var outcome = [];
        //outcome to be filled with all legal moves
        //Rooks can move vertically or horizontally
        var startingPos = piece.get_pos;
        var temp;
        //Check Column
        
        for(let i = 1; i<= 8; i++){
            
                if(this.deck.findIfPosFilled([i,startingPos[1]])){
                    if(piece.get_id != this.deck.findByPos([i,startingPos[1]]).get_id){   
                        //Check to see if position filled by same or other piece
                        temp = this.deck.findByPos([i,startingPos[1]]);
                        if(temp.get_color == piece.get_color){
                            
                            break;
                        }else{
                            //put a spot of an opposite color into the movable spot.
                            outcome.push([i,startingPos[1]]);
                            
                            break;
                        }
                    }      
                }else{
                    outcome.push([i,startingPos[1]]);
                    
                }
            
        }
        //Check Row
        for(let i = 1; i<= 8; i++){
            if(this.deck.findIfPosFilled([startingPos[0],i])){
                if(piece.get_id != this.deck.findByPos([startingPos[0],i]).get_id){   
                    //Check to see if position filled by same or other piece
                    temp = this.deck.findByPos([startingPos[0],i]);
                    if(temp.get_color == piece.get_color){
                        break;
                    }else{
                        //put a spot of an opposite color into the movable spot.
                        outcome.push([startingPos[0],i]);
                        break;
                    }
                }
             }else{
                outcome.push([startingPos[0],i]);
            }
            
        }
        console.log(outcome);
        return outcome;
    }







    movementPawn(piece){
        var outcome = [];
        var startingPos = piece.get_pos;
        var color = piece.get_color == "White";
        var temp = piece.get_pos[0];
        var col = piece.get_pos[1];
        var hold;
        //Black pawn can move -1, White can move +1. Can take diagonally
        if((temp+1) != 9 && (temp-1) != 0){
            if(color){
                if(this.deck.findIfPosFilled([startingPos[0]+1,startingPos[1]])){
                    //Pawn is stuck
                }else{
                    outcome.push([startingPos[0]+1,startingPos[1]]);
                }
                //Check to see if can take diagonally to the right if its in col 1
                if(col == 1){
                    
                    if(this.deck.findIfPosFilled([startingPos[0]+1,startingPos[1]+1])){
                         hold = this.deck.findByPos([startingPos[0]+1,startingPos[1]+1]);
                        
                        if(hold.get_color == "Black"){
                            outcome.push([startingPos[0]+1,startingPos[1]+1]);
                            
                        }
                    }
                    //Check diagonally to the left if its in col 8.
                }else if(col == 8){
                    if(this.deck.findIfPosFilled([startingPos[0]+1,startingPos[1]-1])){
                        hold = this.deck.findByPos([startingPos[0]+1,startingPos[1]-1]);
                        if(hold.get_color == "Black"){
                            outcome.push([startingPos[0]+1,startingPos[1]-1])
                        }
                    }
                    //If its in the middle check both sides.
                }else{
                    if(this.deck.findIfPosFilled([startingPos[0]+1,startingPos[1]-1])){
                        hold = this.deck.findByPos([startingPos[0]+1,startingPos[1]-1]);
                        if(hold.get_color == "Black"){
                            outcome.push([startingPos[0]+1,startingPos[1]-1])
                        }
                    }
                    if(this.deck.findIfPosFilled([startingPos[0]+1,startingPos[1]+1])){
                        hold = this.deck.findByPos([startingPos[0]+1,startingPos[1]+1]);
                        if(hold.get_color == "Black"){
                            outcome.push([startingPos[0]+1,startingPos[1]+1])
                        }
                    }
                }
            }
            else{
                if(this.deck.findIfPosFilled([startingPos[0]-1,startingPos[1]])){
                    //Pawn is stuck
                }else{
                    outcome.push([startingPos[0]-1,startingPos[1]]);
                }
                if(col == 1){
                    if(this.deck.findIfPosFilled([startingPos[0]-1,startingPos[1]+1])){
                        hold = this.deck.findByPos([startingPos[0]-1,startingPos[1]+1]);
                        if(hold.get_color == "White"){
                            outcome.push([startingPos[0]-1,startingPos[1]+1])
                        }
                    }
                    //Check diagonally to the left if its in col 8.
                }else if(col == 8){
                    if(this.deck.findIfPosFilled([startingPos[0]-1,startingPos[1]-1])){
                        hold = this.deck.findByPos([startingPos[0]-1,startingPos[1]-1]);
                        if(hold.get_color == "White"){
                            outcome.push([startingPos[0]-1,startingPos[1]-1])
                        }
                    }
                    //If its in the middle check both sides.
                }else{
                    if(this.deck.findIfPosFilled([startingPos[0]-1,startingPos[1]-1])){
                        hold = this.deck.findByPos([startingPos[0]-1,startingPos[1]-1]);
                        if(hold.get_color == "White"){
                            outcome.push([startingPos[0]-1,startingPos[1]-1])
                        }
                    }
                    if(this.deck.findIfPosFilled([startingPos[0]-1,startingPos[1]+1])){
                        hold = this.deck.findByPos([startingPos[0]-1,startingPos[1]+1]);
                        if(hold.get_color == "White"){
                            outcome.push([startingPos[0]-1,startingPos[1]+1])
                        }
                    }
                }
            }
            //Check to see if pawn can move 2, other wise only forward.
            if(piece.get_pos[0] == 2 && piece.get_color == "White"){
                //Potential to move 2 for white
                if(this.deck.findIfPosFilled([startingPos[0]+2,startingPos[1]])){
                    //Pawn is stuck
                }else{
                    outcome.push([startingPos[0]+2,startingPos[1]]);
                }
            }else if (piece.get_pos[0] == 7 && piece.get_color == "Black"){
                //Potential to move 2 for black
                if(this.deck.findIfPosFilled([startingPos[0]-2,startingPos[1]])){
                    //Pawn is stuck
                }else{
                    outcome.push([startingPos[0]-2,startingPos[1]]);
                }
            }

            //Check to see if can take diagonally
            
        }else{
            //Promote to the queen here.
        }
        console.log(outcome);
        return outcome;

    }





    movementKing(piece){
        var outcome = [];

        return outcome;
    }






    movementQueen(piece){
        var outcome = [];
        //Queen follows same rules as bishop and rook
        //Check for duplicates
        return outcome;
    }






    movementKnight(piece){
        var outcome = [];

        return outcome;
    }
    
    movementBishop(piece){
        var outcome = [];
        var startingPos = piece.get_pos;
        var topRight = true;
        var topLeft = true;
        var bottomRight = true;
        var bottomLeft = true;
        var hold;
        //two diagonals, split into fours RIGHT SIDE
        for(let i = startingPos[0]+1; i<=8; i++){
            for(let k = startingPos[1]+1; k <= 8; k++){
                console.log("Hello")
                if(this.deck.findIfPosFilled([i,k]) && topRight){
                    hold = this.deck.findByPos([i,k]);
                    if(hold.get_color != piece.get_color){
                        outcome.push([i,k]);
                    }else{
                        topRight = false;
                    }
                }else if(topRight){
                    outcome.push([i,k]);
                }
            }
            for(let j = startingPos[1]-1; j >= 1; j--){
                if(this.deck.findIfPosFilled([i,j]) && bottomRight){
                    hold = this.deck.findByPos([i,j]);
                    if(hold.get_color != piece.get_color){
                        outcome.push([i,j]);
                    }else{
                        bottomRight = false;
                    }
                }
                else if (bottomRight){
                    outcome.push([i,j]);
                }
            }

        }
        //LEFT SIDE
        for(let i = startingPos[0]-1; i>=1; i--){
            for(let k = startingPos[1]+1; k <= 8; k++){
                if(this.deck.findIfPosFilled([i,k]) && topLeft){
                    hold = this.deck.findByPos([i,k]);
                    if(hold.get_color != piece.get_color){
                        outcome.push([i,k]);
                    }else{
                        topLeft = false;
                    }
                }else if(topLeft){
                    outcome.push([i,k]);
                }
            }
            for(let j = startingPos[1]-1; j>= 1; j--){
                if(this.deck.findIfPosFilled([i,j]) && bottomLeft){
                    hold = this.deck.findByPos([i,j]);
                    if(hold.get_color != piece.get_color){
                        outcome.push([i,j]);
                    }else{
                        bottomLeft = false;
                    }
                }
                else if (bottomLeft){
                    outcome.push([i,j]);
                }
            }

        }



        console.log(outcome);
        return outcome;
    }
    

   
    
}



   
    /* var length = this.deck.inUsePieces.length;
    if(this.deck.selectedPieces.length == 0){
        for(let i = 0; i<length; i++){
            if(arrayEquals(this.deck.inUsePieces[i].get_pos, position)){
                this.deck.selectedPieces.push(this.deck.inUsePieces[i]);
            }
        }
    }else if(this.deck.selectedPieces.length == 1){
        //Check here in another method if position wanting to move is an acceptable location
        this.deck.selectedPieces[0].set_pos(position);
    }
    
    console.log(position); */


