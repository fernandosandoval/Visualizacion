var mapa = [
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0]
           ];

function insertarEnColumna(columnaActual, colorFicha){
    console.log("columna es ", columnaActual);
    let estado;
    switch (columnaActual){
      case 1:
          estado = verificarColumna(1, colorFicha);
          break;
      case 2:
          estado = verificarColumna(2, colorFicha);
          break;
      case 3:
          estado = verificarColumna(3, colorFicha);
          break;
      case 4:
          estado = verificarColumna(4, colorFicha);
          break;
      case 5:
          estado = verificarColumna(5, colorFicha);
          break;
      case 6:
          estado = verificarColumna(6, colorFicha);
          break;
      case 7:
          estado = verificarColumna(7, colorFicha);
          break;
      }
    return estado;
}


//devuelve false si esta llena, o cambia el color del casillero cuando encuentra lugar desde abajo hacia arriba
function verificarColumna(id, color){
      posicion = id-1;

      let limite = posicion+35;

      console.log(arregloCasilleros[posicion].getColor());
      if (((arregloCasilleros[posicion]).getColor()) != "white"){
          console.log ("la columna esta llena");
          return false;
      }
      else {
        console.log("columna con espacio disponible");
        let actual = arregloCasilleros[posicion].getColor();
        while ((actual == "white") && (posicion < limite)) {
           posicion = posicion + 7;
           actual = arregloCasilleros[posicion].getColor();
           }
        console.log("columna con ficha ",arregloCasilleros[posicion].getColor());
        //llego al primer casillero disponible
        if ((posicion >= limite) && (((arregloCasilleros[posicion]).getColor()) == "white")){              // si es el ultimo de la columna y es blanco
              arregloCasilleros[posicion].setColor(color);
        }
        else {
              console.log("retrocedo a posicion ", posicion-7);
              arregloCasilleros[posicion-7].setColor(color);
        }
      }
      return true;

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

function armarMapaTablero(){
  let indice= 0;

  for (i = 0; i<= 5; i++){
    for (j = 0; j<= 6; j++){
        mapa [i][j] = arregloCasilleros[indice].getColor();
        indice++;
    }
  }
  console.log(mapa);
  return mapa;
}

function verificarJuegoTerminado(mapa){
  for (i = 0; i<= 5; i++){
    for (j = 0; j<= 6; j++){
        if(verificarLineaHorizontal(i, j)){
            return true;
        }
        if(verificarLineaVertical(i, j)){
            return true;
      }
    }
  }
}

function verificarLineaHorizontal(i, j){
  let actual = mapa[i][j];
  let suma = 0;
  if (actual!="white"){
    while ((j<=6)){
      console.log("actual ", actual, "mapa ", mapa[i][j]);
      if (actual == mapa[i][j]){
        suma++;
        if (suma==4){
          return true;
        }
      }
      else{
        suma = 0;
      }
      j++;
    }
    return false;
  }
}

function verificarLineaVertical(i, j){
  let actual = mapa[i][j];
  let suma = 0;
  if (actual!="white"){
        while ((i<=5)){
          if (actual == mapa[i][j]){
            suma++;
            if (suma==4){
              return true;
            }
          }
          else{
            suma = 0;
          }
          i++;
        }
      return false;
  }
}
