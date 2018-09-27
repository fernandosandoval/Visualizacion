var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fila = 0;
var col = 0;
var cant = 0;
var arregloFichasJug1 = [];
var arregloFichasJug2 = [];
var arregloCasilleros = [];
var arregloColumnas = [];
var posx = 270;
var posy = 200;
var click = false;
var jugador1 = true;                   // inicia con turno para el jugador 1
var jugador2 = false;
var dragok;
var startX;
var startY;
var minX;
var maxX;
var minY;
var maxY;
var columnaActual;
var initX;
var initY;
var indice = 0;

canvas.onmousedown = presionandoMouse;
canvas.onmouseup = soltandoMouse;
canvas.onmousemove = moviendoMouse;


dibujarTablero();
dibujarFichas();
dibujarColumnas();

function dibujarTablero(){
      ctx.fillStyle = "blue";
      ctx.fillRect(225,160,450,380);
      let id = 1;
      for (fila=1; fila<=7; fila++){
          for (col=1; col<=6; col++){
                casillero = new Casillero (posx, posy,'white', 25, id);
                posy += 60;
                arregloCasilleros.push(casillero);
                casillero.draw(ctx);
                id++;
              }
          posy = 200;
          posx+= 60;
      }

}

function dibujarColumnas(){
      ctx.fillStyle = "white";
      posx = 240;
      posy = 100;
      for (col=1; col<=7; col++){
                columna = new AreaSobreColumna (posx, posy, 59, 60, col);
      //          console.log(columna.name)
                posx += 60;
                arregloColumnas.push(columna);
                columna.draw(ctx);
              }

}


function limpiar() {
     ctx.clearRect(0, 0, 900, 600);
}

function dibujarFichas(){

        posx = 30;
        posy = 170;
        for (fila=1; fila<=3; fila++){
            for (col=1; col<=7; col++){
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
            for (col=1; col<=7; col++){
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

function redibujarAreaSobreTablero(){
            ctx.clearRect (200,90,450,70);
            ctx.fillStyle = "white";
            posx = 240;
            posy = 100;
            for (col=1; col<arregloColumnas.length; col++){
                      var c = arregloColumnas[col];
                      c.draw(ctx);
                      posx += 60;
                      }
}

function redibujarTablero(){
      ctx.fillStyle = "blue";
      ctx.fillRect(225,160,450,380);
      for (col=0; col<arregloCasilleros.length; col++){
                var c = arregloCasilleros[col];
                c.draw(ctx);
                }
}

function isIntersect(point, circle) {
           return Math.sqrt((point.x-circle.posX) ** 2 + (point.y - circle.posY) ** 2) < circle.radio;
      }

function isInsideColumn(point, column) {
           minX = column.posX;
           minY = column.posY;
           maxX = column.posX + column.width;
           maxY = column.posY + column.height;
      //     console.log("xmin=",minX, " ymin=", minY, "xmax=", maxX, " ymax=", maxY, " px=",point.x, " py=", point.y);
           if ((point.x >= minX) && (point.y >= minY) && (point.x <= maxX) && (point.y <=maxY)){
    //          console.log("adentro");
              return true;
           }
           else{
      //        console.log("afuera");
              return false;
           }
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
                  initX = pos.x;
                  initY = pos.y;
                  dragok=true;
                  circle.dragging=true;
                }
              });

            //  dragok = false;
              arregloFichasJug2.forEach(circle => {
                if (isIntersect(pos, circle)) {
                  console.log('ud esta presionando una ficha roja');
                  initX = pos.x;
                  initY = pos.y;
                  dragok=true;
                  circle.dragging=true;
                }
              });

              arregloCasilleros.forEach(circle => {
                let j = 0;
                if (isIntersect(pos, circle)) {
                  console.log('ud esta presionando el casillero numero ', circle.id, ' de color ', circle.color);
                }
                j++;
              });

              arregloColumnas.forEach(column => {
                if (isInsideColumn(pos, column)) {
                  console.log('ud esta haciendo click sobre la columna ', column.name );
                }
              });

              arregloFichasJug2.forEach(circle => {
                if (isIntersect(pos, circle)) {
                  console.log('ud esta presionando una ficha roja');
                  initX = pos.x;
                  initY = pos.y;
                  dragok=true;
                  circle.dragging=true;
                }
              });

              // guardamos la posicion del mouse
              startX = pos.x;
              startY = pos.y;
          }

function verificarUbicacionFicha(posActual){
          arregloColumnas.forEach(column => {
            if (isInsideColumn(posActual, column)) {
              console.log('ud esta haciendo click sobre la columna ', column.name );
              columnaActual = column.name;
              console.log(columnaActual);
            }
          });
}

function soltandoMouse(e){
          e.preventDefault();
          e.stopPropagation();
          if (dragok==true) {
                const posActual = {
                  x: startX,
                  y: startY
                };
                verificarUbicacionFicha(posActual);
                console.log(columnaActual);
                if (columnaActual != 0){
                   console.log("puse la ficha en la columna ", columnaActual);
                   console.log("indice del arreglo:", indice);


                   console.log("color de la ficha: ", colorFicha);
                   if (jugador1){
                           var colorFicha = arregloFichasJug1[indice].getColor();
                           arregloFichasJug1[indice].setPosX = initX;
                           arregloFichasJug1[indice].setPosY = initY;
                           delete arregloFichasJug1[indice];
                         }
                   else {
                           var colorFicha = arregloFichasJug2[indice].getColor();
                           arregloFichasJug2[indice].setPosX = initX;
                           arregloFichasJug2[indice].setPosY = initY;
                           delete arregloFichasJug2[indice];
                   }
                   insertarEnColumna(columnaActual, colorFicha);
                   redibujarAreaSobreTablero();
                   redibujarTablero();
                   columnaActual = 0;

          //         actualizarTablero(columnaActual);
                }
          }
              // ponemos todas las variables de drag en false
          dragok = false;
          for (var i=0; i<arregloFichasJug1.length; i++){
                    if (arregloFichasJug1[i]){
                      arregloFichasJug1[i].dragging = false;
                    }
          }
          for (var i=0; i<arregloFichasJug2.length; i++){
                   if (arregloFichasJug2[i]){
                      arregloFichasJug2[i].dragging = false;
                  }
          }
          cambiarTurno();

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
            if (arregloFichasJug1[i]){
              var f1 = arregloFichasJug1[i];
              if(f1.dragging){
                  indice = i;
                  f1.posX+=dx;
                  f1.posY+=dy;
                  redibujar(ctx);
              }
            }
          }

          for(var i=0; i<arregloFichasJug2.length; i++){
            if (arregloFichasJug2[i]){
              var f2 = arregloFichasJug2[i];
              if(f2.dragging){
                  indice = i;
                  f2.posX+=dx;
                  f2.posY+=dy;
                  redibujar(ctx);
              }
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
    if (arregloFichasJug1[i]){
      let f = arregloFichasJug1[i];
      console.log(f);
      f.draw(ctx);
    }
  }
  // redibujo fichas rojas
  for(var i=0; i<arregloFichasJug2.length; i++){
     if (arregloFichasJug2[i]){
          var f = arregloFichasJug2[i];
          f.draw(ctx);
     }
  }
  // redibujo tablero
  ctx.fillStyle="blue";
  ctx.fillRect(225,160,450,380);
  for(var i=0; i<arregloCasilleros.length; i++){
      var f = arregloCasilleros[i];
      f.draw(ctx);
  }
  for(var i=0; i<arregloCasilleros.length; i++){
      var f = arregloCasilleros[i];
      f.draw(ctx);
  }


}
