var avion = {
	x: 500,
	y: 500
}

var enemigo = [{x: 150, y: 20}, {x:250, y: 40}, {x:350, y:60}, {x: 500, y:80}, {x: 650, y: 60}, {x: 750, y: 40}, {x: 850, y: 20}]

var otroenemigo = [{x: 425, y: 10},  {x:500, y:5}, {x: 575, y: 10}]

var balas = [];

var puntos = 0;


function mostrarAvion(){
	document.getElementById('avion').style['top'] = avion.y + "px";
	document.getElementById('avion').style['left'] = avion.x + "px";
}

function mostrarAvionEnemigo(){
	var output = '';
	for(var i=0; i<enemigo.length; i++){
		output += "<div class='enemigo1' style='top:"+enemigo[i].y+"px; left:"+enemigo[i].x+"px;'></div>"
	}
	for(var i=0; i<otroenemigo.length; i++){
		output += "<div class='otroenemigo' style='top:"+otroenemigo[i].y+"px; left:"+otroenemigo[i].x+"px;'></div>"
	}
	document.getElementById('enemigos').innerHTML = output;
}

function mostrarBalas(){
	var output = '';
	for (var i=0; i<balas.length; i++){
		output += "<div class='bala' style='top:"+balas[i].y+"px; left:"+balas[i].x+"px;'></div>"
	}
	document.getElementById('balas').innerHTML = output;
}

function moverBalas(){
	for(var i=0; i<balas.length; i++){
		balas[i].y -= 5;

		if(balas[i].y < 0){
			balas[i] = balas[balas.length-1];
			balas.pop();
			console.log(balas);
		}
	}
}

function mostrarPuntaje(){
	document.getElementById('puntos').innerHTML = puntos;
}

function detectarColision(){
	for(var i=0; i<balas.length; i++){
		for(var j=0; j<enemigo.length; j++){

			if(Math.abs(balas[i].x - enemigo[j].x) < 10 &&
			Math.abs(balas[i].y - enemigo[j].y) < 10) {
				console.log('bala', i, 'y enemigo', j, 'coinciden');
				puntos += 20;
				}
			}
		for(var k=0; k<otroenemigo.length; k++){

			if(Math.abs(balas[i].x - otroenemigo[k].x) < 10 &&
			Math.abs(balas[i].y - otroenemigo[k].y) < 10) {
				console.log('bala', i, 'y enemigo B', k, 'coinciden');
				puntos += 50;
			}
		}
	}
}

 function choqueAvion(){
	 	for(var j=0; j<enemigo.length; j++){

 		if(Math.abs(avion.x - enemigo[j].x) < 10 &&
	 		Math.abs(avion.y - enemigo[j].y) < 10) {
	 			console.log('avion y enemigo', j, 'chocaron');
	 			puntos -= 1000;
	 		}
	 	}
	 	for(var k=0; k<otroenemigo.length; k++){

	 		if(Math.abs(avion.x - otroenemigo[k].x) < 10 &&
	 		Math.abs(avion.y - otroenemigo[k].y) < 10) {
	 			console.log('avion y otroenemigo', k, 'chocaron');
	 			score -= 1500;
	   	}
	   }
	 }

function moverEnemigo(){
	for(var i=0; i<enemigo.length; i++){
		enemigo[i].y += 5;

		if(enemigo[i].y > 540){
			enemigo[i].y = 0;
			enemigo[i].x = Math.random()*500;
		}
	}
	for(var j=0; j<otroenemigo.length; j++){
		otroenemigo[j].y += 5;

		if(otroenemigo[j].y > 540){
			otroenemigo[j].y = 0;
			otroenemigo[j].x = Math.random()*500;
		}
	}
}

function juego(){
		mostrarAvionEnemigo();
		moverEnemigo();
		mostrarAvion();
		moverBalas();
		mostrarBalas();
		detectarColision();
		mostrarPuntaje();
		choqueAvion();
}

setInterval(juego, 50);

document.onkeydown = function(a){
	if(a.keyCode == 37){
		avion.x -= 10;
	}
	else if(a.keyCode == 39){
		avion.x += 10;
	}
	if(a.keyCode == 38){
		avion.y -= 10;
	}
	else if(a.keyCode == 40){
		avion.y += 10;
	}
	if(a.keyCode == 32){
		balas.push({x: avion.x+8 , y: avion.y-15  });
	  console.log(balas);
		mostrarBalas();
	}
	mostrarAvion();
	console.log(avion);
}
mostrarAvionEnemigo();
mostrarAvion();
