function insertarEnColumna(columnaActual, colorFicha){
    console.log("columna es ", columnaActual);
    switch (columnaActual){
      case 1:
          verificarColumna(1, colorFicha);
          break;
      case 2:
          verificarColumna(7, colorFicha);
          break;
      case 3:
          verificarColumna(13, colorFicha);
          break;
      case 4:
          console.log("asdfg");
          verificarColumna(19, colorFicha);
          break;
      case 5:
          verificarColumna(25, colorFicha);
          break;
      case 6:
          verificarColumna(31, colorFicha);
          break;
      case 7:
          verificarColumna(37, colorFicha);
          break;
      }

}

//devuelve false si esta llena, o cambia el color del casillero cuando encuentra lugar desde abajo hacia arriba
function verificarColumna(id, color){
      posicion = id-1;

      let limite = posicion+5;

      console.log(arregloCasilleros[posicion].getColor());
      if (((arregloCasilleros[posicion]).getColor()) != "white"){
          console.log ("la columna esta llena");
      }
      else {
        console.log("columna con espacio disponible");
        while ((((arregloCasilleros[posicion]).getColor()) == "white") && (posicion <= limite)) {
           posicion++;
           }
        //llego al primer casillero disponible
        if ((posicion == limite) && (((arregloCasilleros[posicion]).getColor()) == "white")){              // si es el ultimo de la columna y es blanco
              arregloCasilleros[posicion].setColor(color);
        }
        else {
              arregloCasilleros[posicion-1].setColor(color);
        }
      }
      arregloCasilleros.forEach(circle => {
          console.log('casillero numero ', circle.id, ' de color ', circle.color);
      });
      for(var i=0; i<arregloFichasJug1.length; i++){
        if (arregloFichasJug1[i]){
            console.log("la ficha ", i, " existe");
        }
        else {
            console.log("la ficha ", i, " no existe");
        }
      }
}

function cambiarTurno(){
    if (jugador1){
      jugador1 = false;
      jugador2 = true;
      document.getElementById("jugadorActual").innerHTML = "Jugador 2, es su turno, coloque una ficha roja sobre el tablero";
    }
    else {
      jugador2 = false;
      jugador1 = true;
      document.getElementById("jugadorActual").innerHTML = "Jugador 1, es su turno, coloque una ficha amarilla sobre el tablero";
    }

}
