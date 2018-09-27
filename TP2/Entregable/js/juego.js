function insertarEnColumna(columna, color){
    console.log("columna es ", columna);
    switch (columna){
      case 1:
          verificarColumna(1, color);
          break;
      case 2:
          verificarColumna(7, color);
          break;
      case 3:
          verificarColumna(13, color);
          break;
      case 4:
          console.log("asdfg");
          verificarColumna(19, color);
          break;
      case 5:
          verificarColumna(25, color);
          break;
      case 6:
          verificarColumna(31, color);
          break;
      case 7:
          verificarColumna(37, color);
          break;
      }

}
//devuelve false si esta llena, o cambia el color del casillero cuando encuentra lugar desde abajo hacia arriba
function verificarColumna(id, color){
      arregloCasilleros.forEach(circle => {
          console.log('ud esta presionando el casillero numero ', circle.id, ' de color ', circle.color, 'y posicion en arreglo ', j);
        }
        j++;
      });
      let limite = posicion+5;
      console.log(arregloCasilleros[posicion-1]).getColor);
      if (((arregloCasilleros[posicion-1]).getColor) != "white"){
          console.log ("la columna esta llena");
      }
      else {
        console.log("dsjfnj");
        while ((((arregloCasilleros[posicion]).getColor) == "white") && (posicion < limite)) {
           posicion++;
           }
        //llego al primer casillero disponible
        if (posicion == limite){              // si es el ultimo de la columna
              arregloCasilleros[posicion].setColor(color);
        }
        else {
              arregloCasilleros[posicion-1].setColor(color);
        }
      }
}
