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
var dragok;
var startX;
var startY;

canvas.onmousedown = presionandoMouse;
canvas.onmouseup = soltandoMouse;
canvas.onmousemove = moviendoMouse;

dibujarTablero();
dibujarFichas();

function dibujarTablero(){
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

}


function limpiar() {
     ctx.clearRect(0, 0, 900, 600);
}

function dibujarFichas(){

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
}


function isIntersect(point, circle) {
           return Math.sqrt((point.x-circle.posX) ** 2 + (point.y - circle.posY) ** 2) < circle.radio;
      }

function presionandoMouse(e){

              e.preventDefault();
              e.stopPropagation();

              // obtengo posicion actual del mouse
              var rect = canvas.getBoundingClientRect();
              scaleX = canvas.width / rect.width,
              scaleY = canvas.height / rect.height;
              const pos = {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
              };

              // verifico para cada ficha si estoy haciendo click adentro

              dragok=false;
              arregloFichasJug1.forEach(circle => {
                if (isIntersect(pos, circle)) {
                  console.log('ud esta presionando una ficha amarilla');
                  dragok=true;
                  circle.dragging=true;
                }
              });

            //  dragok = false;
              arregloFichasJug2.forEach(circle => {
                if (isIntersect(pos, circle)) {
                  console.log('ud esta presionando una ficha roja');
                  dragok=true;
                  circle.dragging=true;
                }
              });

              // guardamos la posicion del mouse
              startX = pos.x;
              startY = pos.y;
          }

function soltandoMouse(e){
          e.preventDefault();
          e.stopPropagation();

              // ponemos todas las variables de drag en false
          dragok = false;
          for (var i=0; i<arregloFichasJug1.length; i++){
                      arregloFichasJug1[i].dragging = false;
                  }
          for (var i=0; i<arregloFichasJug2.length; i++){
                      arregloFichasJug2[i].dragging = false;
                          }

}

function moviendoMouse(e){

        if (dragok){
          e.preventDefault();
          e.stopPropagation();
          var rect = canvas.getBoundingClientRect();
          scaleX = canvas.width / rect.width,
          scaleY = canvas.height / rect.height;
          const pos = {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
          };

          // calculo la distancia que se movio el mouse

          var dx = pos.x-startX;
          var dy = pos.y-startY;

          // muevo cada ficha que tenga dragging en true

          for(var i=0; i<arregloFichasJug1.length; i++){
              var f1 = arregloFichasJug1[i];
              if(f1.dragging){
                  f1.posX+=dx;
                  f1.posY+=dy;
                  redibujar(ctx);
              }
          }

          for(var i=0; i<arregloFichasJug2.length; i++){
              var f2 = arregloFichasJug2[i];
              if(f2.dragging){
                  f2.posX+=dx;
                  f2.posY+=dy;
                  redibujar(ctx);
              }
          }



          // seteo nueva posicion inicial
          startX = pos.x;
          startY = pos.y;

        }
    }

function redibujar(ctx){
  limpiar();
  // redibujo fichas amarillas
  for(var i=0; i<arregloFichasJug1.length; i++){
      var f = arregloFichasJug1[i];
      f.draw(ctx);
  }
  // redibujo fichas rojas
  for(var i=0; i<arregloFichasJug2.length; i++){
      var f = arregloFichasJug2[i];
      f.draw(ctx);
  }
  // redibujo tablero
  ctx.fillStyle="blue";
  ctx.fillRect(225,160,450,380);
  for(var i=0; i<arregloCasilleros.length; i++){
      var f = arregloCasilleros[i];
      f.draw(ctx);
  }

}
