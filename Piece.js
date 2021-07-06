class Piece{
//Type of piece and the Id is the numbered piece. Duplicate numbers allowed, pieces found with type and Id.
  constructor(type, id, position,color,source) {
	this.pieceID = id;
    this.pieceType = type;
	this.position = position;
  this.color = color;
  this.source = source;
  }
  //Accessor methods to get attributes from cards
  get get_type(){
  	return this.pieceType;
  }
  get get_pos(){
	  return this.position;
  }
  get get_id(){
	  return this.pieceID;
  }
  get get_color(){
    return this.color;
  }
  get get_source(){
    return this.source;
  }

  
  set_pos(update){
		this.position = update;
  }
 
}
