
class ChessBoard {
    constructor() {
        //Board creates a new deck, deck creates and holds all the pieces
        this.deck = new DeckKernel();
        this.prepareBoard();
        this.turn = "White";
        
    }
    set_turn(turn){
        this.turn = turn;
    }
    get get_turn(){
        return this.turn
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
        
        
        console.log("White King: " + this.deck.findWhiteKing());
    }
    
    checkTurn(position1, position2){
        //Check to see if a piece is in pos1, if so check to see if it matches a turn
        //If turn does not match, alert
        var piece;
        var color;
        //Should check for check and check mate
        if(this.deck.findIfPosFilled(position1)){
            piece = this.deck.findByPos(position1)
            color = piece.get_color;
            if(color == this.get_turn){
                //swap turn color
                    this.flipTurn();
                    this.movePiece(position1,position2);
            }else{
                alert("Cannot play out of turn");
            }
        }

    }


    movePiece(position1, position2){
        
        console.log("Piece moved:     Start: "+ position1 + " Ending: " + position2);
        
       
        var validMoves = [];
        var temp = [];
        var validMoveBool = false;
        var deletePiece;
        var pieceID;

        if(this.deck.findIfPosFilled(position1)){
            var piece = this.deck.findByPos(position1);
            var type = piece.get_type;
            
            switch(type){
                case "King":
                    validMoves = this.movementKing(piece);
                    break;
                case "Queen":
                    validMoves = this.movementQueen(piece);
                    break;
                case "Rook":
                    validMoves = this.movementRook(piece);
                    break;
                case "Bishop":
                    validMoves = this.movementBishop(piece);
                    break;
                case "Pawn":
                    validMoves = this.movementPawn(piece);
                    break;
                case "Knight":
                    validMoves = this.movementKnight(piece);
                    break;
            }
            console.log(piece);
            for(let i = 0; i<validMoves.length; i++){
                temp = validMoves[i];
                
                if(position2[0] == temp[0] && position2[1] == temp[1]){
                    //update position, refresh board
                    validMoveBool = true;
                    //check to see if piece is already there
                    if(this.deck.findIfPosFilled(position2)){
                        deletePiece = this.deck.findByPos(position2);
                        pieceID = deletePiece.get_id;
                        if(deletePiece.get_color == "White"){
                            //delete from inUseWhitePieces
                            for(let i = 0; i<this.deck.inUseWhitePieces.length; i++){
                                if(this.deck.inUseWhitePieces[i].get_id == pieceID){
                                    this.deck.inUseWhitePieces.splice(i,1);
                                }
                            }
                        }else{
                            //delete from inUseBlackPieces
                            for(let i = 0; i<this.deck.inUseBlackPieces.length; i++){
                                if(this.deck.inUseBlackPieces[i].get_id == pieceID){
                                    this.deck.inUseBlackPieces.splice(i,1);
                                }
                            }
                        }
                    }
                    //delete piece if it is there
                    break;

                }
            }
            
            if(validMoveBool){
                piece.set_pos(position2);
                //Check if the new position puts the other king in check
                
                //Check to see if pawn promotes, remove it and call promoteQueen with it.
                if(piece.get_type == "Pawn"){
                    this.deck.checkPromotion(piece);
                }
                this.updateBoard();
                this.checkIfChecked(piece);
            }else{
                alert("Invalid Move");
                //Restore turn
                this.flipTurn();
            }
            
    }
    }

    flipTurn(){
        var color = this.get_turn;
        if(color == "White"){
            this.set_turn("Black");
        }else{
            this.set_turn("White");
        }
    }


    checkIfChecked(piece){
        var validMoves=[];
        var type;
        var compare;
        var whiteKingCheck = false;
        var blackKingCheck = false;
        type = piece.get_type;
        
        switch(type){
            case "King":
                validMoves = this.movementKing(piece);
                break;
            case "Queen":
                validMoves = this.movementQueen(piece);
                break;
            case "Rook":
                validMoves = this.movementRook(piece);
                break;
            case "Bishop":
                validMoves = this.movementBishop(piece);
                break;
            case "Pawn":
                validMoves = this.movementPawn(piece);
                break;
            case "Knight":
                validMoves = this.movementKnight(piece);
                break;
        }
        
        if(piece.get_color == "White"){
            //Check black king position against valid moves
            compare = this.deck.findBlackKing();
            for(let k = 0; k<validMoves.length; k++){
                if(arrayEquals(compare,validMoves[k])){
                    blackKingCheck = true;
                    if(blackKingCheck){
                        //Check if Mate
                        this.checkIfMate();
                    }
                    alert("Black King is in Check");
                }
            }
        }else{
            //Check White king position against valid moves
            compare = this.deck.findWhiteKing();
            for(let k = 0; k<validMoves.length; k++){
                if(arrayEquals(compare,validMoves[k])){
                    whiteKingCheck = true;
                    if(whiteKingCheck){
                        //Check if Mate
                        this.checkIfMate();
                    }
                    alert("White King is in Check");
                }
            }
        }
        

        

    }
    //Pos needs to be checked if its in the board.
    addValidSpot(pos,piece){
        var outcome = [];
        var hold;
        if(pos[0] >=1 && pos[0] <=8 && pos[1]<=8 && pos[1] >= 1){
            if(this.deck.findIfPosFilled([pos[0],pos[1]])){
                hold = this.deck.findByPos([pos[0],pos[1]]);
                if(hold.get_color != piece.get_color){
                    outcome.push([pos[0],pos[1]]);
                 }
            }else {
                outcome.push([pos[0],pos[1]]);
            }   
        }
        return outcome;

    }


    //Movement logic
    movementRook(piece){
        
        var outcome = [];
        //outcome to be filled with all legal moves
        //Rooks can move vertically or horizontally
        var startingPos = piece.get_pos;
        var temp;
        //Check Column
        //check up
        for(let i = startingPos[0]+1; i<= 8; i++){
            
                if(this.deck.findIfPosFilled([i,startingPos[1]])){
                     
                        //Check to see if position filled by same or other piece
                        temp = this.deck.findByPos([i,startingPos[1]]);
                        if(temp.get_color != piece.get_color){
                            outcome.push([i,startingPos[1]]);
                            break;
                        }
                       
                }else{
                    outcome.push([i,startingPos[1]]);
                    
                }
            
        }
        //check down
        for(let i = startingPos[0]-1; i>= 1; i--){
            
            if(this.deck.findIfPosFilled([i,startingPos[1]])){
                
                    //Check to see if position filled by same or other piece
                    temp = this.deck.findByPos([i,startingPos[1]]);
                    if(temp.get_color != piece.get_color){
                        outcome.push([i,startingPos[1]]);
                        break;
                    }
                      
            }else{
                outcome.push([i,startingPos[1]]);
                
            }
        
    }
        //Check Right
        for(let i = startingPos[1]+1; i<= 8; i++){
            if(this.deck.findIfPosFilled([startingPos[0],i])){
                  
                    //Check to see if position filled by same or other piece
                    temp = this.deck.findByPos([startingPos[0],i]);
                    if(temp.get_color != piece.get_color){
                        outcome.push([startingPos[0],i]);
                        break;
                    }
                
             }else{
                outcome.push([startingPos[0],i]);
            }
            
        }
        //Check Left
        for(let i = startingPos[1]-1; i>=1; i--){
            if(this.deck.findIfPosFilled([startingPos[0],i])){
                
                    //Check to see if position filled by same or other piece
                    temp = this.deck.findByPos([startingPos[0],i]);
                    if(temp.get_color != piece.get_color){
                        outcome.push([startingPos[0],i]);
                        break;
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
        var hold;
        var startingPos = piece.get_pos;
        var potentialMoves = [];
        var temp;
        //King can move 8 spots
        //Check above row
        
        //Need arrays of potential movement
        //Iterate through arrays and call method.
        for(let i = -1; i<2; i++){
            potentialMoves.push([startingPos[0]+1,startingPos[1]+i]);
            potentialMoves.push([startingPos[0]-1,startingPos[1]+i]);
            if(i != 0){
                potentialMoves.push([startingPos[0],startingPos[1]+i]);
            }
        }
        for(let k =0; k<potentialMoves.length; k++){
            temp = this.addValidSpot(potentialMoves[k],piece);
            
            if(temp.length > 0){
                outcome = outcome.concat(temp);
                console.log("Adding a valid spot");
            }
        }
        console.log(outcome);
        return outcome;
    }






    movementQueen(piece){
        var outcome = [];
        //Queen follows same rules as bishop and rook
       
        outcome = this.movementBishop(piece).concat(this.movementRook(piece));
        console.log(outcome);
        return outcome;
    }






    movementKnight(piece){
        var outcome = [];
        var hold;
        var startingPos = piece.get_pos;
        var potentialMoves = [];
        var temp;
        //Every knight can move up to 8 spots
        //Up and Right
        //Create array of potential valid movement spots

        //Up and right/left
        potentialMoves.push([startingPos[0]+2,startingPos[1]+1]);
        potentialMoves.push([startingPos[0]+2,startingPos[1]-1]);
        //Down and right/left
        potentialMoves.push([startingPos[0]-2,startingPos[1]+1]);
        potentialMoves.push([startingPos[0]-2,startingPos[1]-1]);
        //Right and up/down
        potentialMoves.push([startingPos[0]+1,startingPos[1]+2]);
        potentialMoves.push([startingPos[0]-1,startingPos[1]+2]);
        //Left and up/down
        potentialMoves.push([startingPos[0]+1,startingPos[1]-2]);
        potentialMoves.push([startingPos[0]-1,startingPos[1]-2]);
        //Check the spots
        for(let k =0; k<potentialMoves.length; k++){
            temp = this.addValidSpot(potentialMoves[k],piece);
            
            if(temp.length > 0){
                outcome = outcome.concat(temp);
                console.log("Adding a valid spot");
            }
        }

        
        console.log(outcome);
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
        var k;
        var j;
        var count = 1;
        //two diagonals, split into fours RIGHT SIDE
        for(let i = startingPos[0]+1; i<=8; i++){
                console.log("Hello")
                k = startingPos[1]+count;
                if(this.deck.findIfPosFilled([i,k]) && topRight && k<=8){
                    hold = this.deck.findByPos([i,k]);
                    if(hold.get_color != piece.get_color){
                        outcome.push([i,k]);
                        break;
                    }else{
                        topRight = false;
                        break;
                    }
                }else if(topRight && k<=8){
                    outcome.push([i,k]);
                }
                count++;
        } 
        count = 1;  
        for(let i = startingPos[0]+1; i<=8; i++){
                j = startingPos[1]-count;
                if(this.deck.findIfPosFilled([i,j]) && bottomRight && j >= 1){
                    hold = this.deck.findByPos([i,j]);
                    if(hold.get_color != piece.get_color){
                        outcome.push([i,j]);
                        break;
                    }else{
                        bottomRight = false;
                        break;
                    }
                }
                else if (bottomRight && j>=1){
                    outcome.push([i,j]);
                }
        
            count++;
        }
        //LEFT SIDE
        count = 1;
        for(let i = startingPos[0]-1; i>=1; i--){
                k = startingPos[1]+count;
                if(this.deck.findIfPosFilled([i,k]) && topLeft && k<=8){
                    hold = this.deck.findByPos([i,k]);
                    if(hold.get_color != piece.get_color){
                        outcome.push([i,k]);
                    }else{
                        topLeft = false;
                    }
                }else if(topLeft && k<=8){
                    outcome.push([i,k]);
                }
            count++;
        }
        count =1;
        for(let i = startingPos[0]-1; i>=1; i--){   
                j = startingPos[1]-count;
                if(this.deck.findIfPosFilled([i,j]) && bottomLeft && j >=1){
                    hold = this.deck.findByPos([i,j]);
                    if(hold.get_color != piece.get_color){
                        outcome.push([i,j]);
                    }else{
                        bottomLeft = false;
                    }
                }
                else if (bottomLeft && j>=1){
                    outcome.push([i,j]);
                }
            
            count++;
        }
        console.log(outcome);
        return outcome;
    }   
}


