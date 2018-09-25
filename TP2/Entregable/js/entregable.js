var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fila = 0;
var columna = 0;
var cant = 0;
var arregloFichasJug1 = [];
var arregloFichasJug2 = [];
var arregloCasilleros = [];
var posx = 270;
var posy = 200;
var click = false;
var jugador1 = true;                   // inicia con turno para el jugador 1
var jugador2 = false;

ctx.fillStyle="blue";
ctx.fillRect(225,160,450,380);

for (fila=1; fila<=7; fila++){
    for (columna=1; columna<=6; columna++){
          casillero = new Casillero (posx, posy,'white', 25);
          posy += 60;
          arregloCasilleros.push(casillero);
          casillero.draw(ctx);
        }
    posy = 200;
    posx+= 60;
}

posx = 30;
posy = 170;
for (fila=1; fila<=3; fila++){
    for (columna=1; columna<=7; columna++){
          ficha = new Ficha (posx, posy, 25,'yellow');
          posy += 60;
          arregloFichasJug1.push(ficha);
          ficha.draw(ctx);
          console.log("Se ha creado una ficha amarilla con posicion x=",posx," y=",posy);
        }
    posy = 170;
    posx+= 60;
}

posx = 750;
posy = 170;
for (fila=1; fila<=3; fila++){
    for (columna=1; columna<=7; columna++){
          ficha = new Ficha (posx, posy, 25, 'red');
          posy += 60;
          arregloFichasJug2.push(ficha);
          ficha.draw(ctx);
          console.log("Se ha creado una ficha roja con posicion x=",posx," y=",posy);
        }
    posy = 170;
    posx+= 60;

}

function isIntersect(point, circle) {
           return Math.sqrt((point.x-circle.posX) ** 2 + (point.y - circle.posY) ** 2) < circle.radio;
      }

canvas.addEventListener('mousedown', (e) => {
        var rect = canvas.getBoundingClientRect();
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;
        const pos = {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        };
        arregloFichasJug1.forEach(circle => {
          if (isIntersect(pos, circle)) {
            console.log('ud esta presionando una ficha amarilla');
          }
        });
        arregloFichasJug2.forEach(circle => {
          if (isIntersect(pos, circle)) {
            console.log('ud esta presionando una ficha roja');
          }
        });
        arregloCasilleros.forEach(circle => {
          if (isIntersect(pos, circle)) {
            console.log('ud esta presionando un casillero');
          }

        });
      });


// canvas.addEventListener("mousedown",function(){
//         presionando = true;
//         if (jugador1)
//          for (i=0; i<arregloFichasJug1.length; i++){
//             if(arregloFichasJug1[i].isClicked())
//                console.log("Ud esta presionando la ficha")
//          }
//       })
//
// canvas.addEventListener("mouseup",function(){
//         presionando = false;
//       })
//
// canvas.addEventListener("mousemove",function(event){
//         if(presionando){
//                        hacerDrag(event);
//                        }
// }
