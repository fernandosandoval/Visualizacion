class Casillero{

    	constructor(x, y, color, radio, id){
    		this.posX = x;
    		this.posY = y;
    		this.color = color;
        this.radio = radio;
        this.id = id;
    	}


    	draw(ctx) {
        console.log("dibuja casillero");
    		ctx.fillStyle = this.color;
    		ctx.beginPath();
    		ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
    		ctx.fill();
    		ctx.closePath();
    	}

      getColor(){
        return this.color;
      }

      setColor(color){
        this.color = color;
      }

}
