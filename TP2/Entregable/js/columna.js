class AreaSobreColumna{

    	constructor(x, y, width, height, name){
    		this.posX = x;
    		this.posY = y;
    		this.width = width;
        this.height = height;
        this.name = name;
      }


    	draw(ctx) {
        console.log("dibuja area sobre columna");
    		ctx.fillRect(this.posX, this.posY, this.width, this.height);
    	}


}
