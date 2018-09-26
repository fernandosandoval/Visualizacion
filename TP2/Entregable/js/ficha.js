class Ficha{

    	constructor(x, y, radio, color){
    		this.posX = x;
    		this.posY = y;
        this.radio = radio;
    		this.color = color;
        let dragging = false;
    	}

    	draw(ctx) {
    		ctx.fillStyle = this.color;
    		ctx.beginPath();
    		ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
    		ctx.fill();
    		ctx.closePath();
    	}

      undraw(ctx){
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2, false);
        ctx.clip();
        ctx.clearRect(this.posX - this.radio - 1, this.posY - this.radio - 1,
                      this.radio * 2 + 2, this.radio * 2 + 2);
      }


}
