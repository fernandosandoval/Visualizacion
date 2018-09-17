var width = 520;
var height = 400;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fileInput = document.getElementById('boton-cargar-archivo');
var imageData;
var imagenOriginal;
var imageDataCopia;
//var imageDataQueEstaAhora;
var click = false;
var pintando = true;
var colorPintura;
var lastX = -1;
var lastY = -1;
var image = new Image();
var imageCopy = new Image();


fileInput.onchange = function(event) {
      var url = window.URL.createObjectURL(event.target.files[0]);
      cargarImagen(url);
    };


function cargarImagen(src) {
      image.src = src;
      imageCopy.src = src;
//      console.log(image);
      image.onload = drawImage;
}


function drawImage(event) {
      var image = event.target;
      var imagenOriginal = event.target;
//      console.log("imagen",image);
      context.drawImage(image, 0, 0, width, height);
      imageData = context.getImageData(0, 0, width, height);
      imageDataCopia = context.getImageData(0, 0, width, height);
  //    imageDataQueEstaAhora = context.getImageData(0, 0, width, height);
      // imageDataOriginal = clonarOriginal();
    }


// la copia de la imagen nos va a servir para poder volver a la imagen inicial sin modificar
// Los filtros se aplican sobre la imagen inicial para que no se pisen entre si

function setPixel(imageData, x, y, r, g , b, a){
      var index = (x + y * imageData.width) * 4;
      imageData.data[index+0] = r;
      imageData.data[index+1] = g;
      imageData.data[index+2] = b;
      imageData.data[index+3] = a;
      }

function getRed (imageData, x, y){
       index = (x + y*imageData.width)*4;
       return imageData.data[index+0];
   }

function getGreen (imageData, x, y){
       index = (x + y*imageData.width)*4;
       return imageData.data[index+1];
   }

function getBlue (imageData, x, y){
       index = (x + y*imageData.width)*4;
       return imageData.data[index+2];
   }

function clonarImageData(){
      let ArregloCopia = new Uint8ClampedArray(imageData.data);
      imageDataCopia.data.set(ArregloCopia);
      return imageDataCopia;
}

// function clonarOriginal(){
//       let OtroArregloCopia = new Uint8ClampedArray(imageData.data);
//       imageDataOriginal.data.set(OtroArregloCopia);
//       return imageDataOriginal;
// }


function negativo(){
     console.log("neg");
     imageDataCopia = clonarImageData();
     for (x=0; x < width; x++){
       for (y=0; y< height; y++){
         var red = 255 - getRed(imageDataCopia, x, y);
         var green = 255 - getGreen(imageDataCopia, x, y);
         var blue = 255 - getBlue(imageDataCopia, x, y);
         setPixel(imageDataCopia, x, y, red, green, blue, 255);
       }
     }
     context.putImageData(imageDataCopia,0,0);
   }

function imagenOriginal(){
        console.log("original");
    // //    imageDataOriginal = clonarOriginal();
    //     for (x=0; x < width; x++){
    //       for (y=0; y< height; y++){
    //         var red = getRed(imageData, x, y);
    //         var green = getGreen(imageData, x, y);
    //         var blue = getBlue(imageData, x, y);
    //         setPixel(imageDataOriginal, x, y, red, green, blue, 255);
    //       }
    //     }
        context.putImageData(imageData,0,0);
      }



function escalaGrises(){
     console.log("gris");
     imageDataCopia = clonarImageData();
     for (x=0; x < width; x++){
       for (y=0; y< height; y++){
         var red = getRed(imageDataCopia, x, y);
         var green = getGreen(imageDataCopia, x, y);
         var blue = getBlue(imageDataCopia, x, y);
         var byn = (red + blue + green) / 3;
         setPixel(imageDataCopia, x, y, byn, byn, byn, 255);
       }
     }
    context.putImageData(imageDataCopia,0,0);
   }

function binarizar(){
        console.log("bin");
        imageDataCopia = clonarImageData();
        threshold = 128;   //el valor de threshold determina si la imagen queda mas tirando al negro o al blanco
        const d = imageDataCopia.data;
        var v,i = 0;
        while (i < d.length) {
          v = (d[i++] + d[i++] + d[i]) < (threshold * 3) ? 0 : 255;
          i -= 2;
          d[i++] = d[i++] = d[i++] = v;
          i++;
        }
        context.putImageData(imageDataCopia,0,0);
}

function sepia(){
     console.log("sepia");
     imageDataCopia = clonarImageData();
     for (x=0; x < width; x++){
       for (y=0; y< height; y++){
         var red = getRed(imageDataCopia, x, y);
         var green = getGreen(imageDataCopia, x, y);
         var blue = getBlue(imageDataCopia, x, y);
         var avg = ((0.3 * red) + (0.59 * green) + (0.11 * blue));
         setPixel(imageDataCopia, x, y, avg + 100, avg + 50, avg, 255);
       }
     }
    context.putImageData(imageDataCopia,0,0);
   }

// la funcion limite verifica que el valor utilizado para los valores rgg no se pase de 0 o 255
function limite(p) {
  	if (p < 0)
  		p = 0;
  	if (p > 255)
  		p = 255;
  	return p;
}

function saturacion() {
    console.log("sat");
    imageDataCopia = clonarImageData();
  	var contraste = Math.tan(160 * Math.PI / 180.0);
  	var factor = ( 259 * ( contraste + 255 ) ) / ( 255 * ( 259 - contraste ) );
  	for (var x = 0; x < width; x++) {
  		  for (var y = 0; y < height; y++) {
  			   setPixel(imageDataCopia,x,y,limite(128 + (getRed(imageDataCopia,x,y) - 128) * factor),limite(128 + (getGreen(imageDataCopia,x,y) - 128) * factor),limite(128 + (getBlue(imageData,x,y) - 128) * factor),255)
  		}
  	}
  	context.putImageData(imageDataCopia, 0, 0);
}

function blur(){
    imageDataCopia = clonarImageData();
    console.log("blur");
    var valR = 0;
    var valG = 0;
    var valB = 0;
    var arr = [1,1,1,1,1,1,1,1,1];

    for (x=0; x < width; x++){
        for (y=0; y < height; y++){
            valR = multiplicarColor(imageDataCopia,arr,getRed)/9;
            valG = multiplicarColor(imageDataCopia,arr,getGreen)/9;
            valB = multiplicarColor(imageDataCopia,arr,getBlue)/9;
            setPixel(imageData, x, y, valR,valG,valB, 255);
        }

    }
    context.putImageData(imageDataCopia, 0, 0);
}


function multiplicarColor(imageData,arrPos,getColor){
    console.log("multi");
    var valor = (getColor(imageData,x-1,y-1)*arrPos[0] +  getColor(imageData,x-1,y)*arrPos[1] +  getColor(imageData,x-1,y+1)*arrPos[2] +
                 getColor(imageData,x,y-1)*arrPos[3] + getColor(imageData,x,y)*arrPos[4]  + getColor(imageData,x,y+1)*arrPos[5] +
                 getColor(imageData,x+1,y-1)*arrPos[6] +  getColor(imageData,x+1,y)*arrPos[7] +  getColor(imageData,x+1,y+1)*arrPos[8]);

    return valor;
}


function guardar() {
    var link = window.document.createElement('a'),
    url = canvas.toDataURL(),
    filename = 'imagenModificada.png';
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.setAttribute( 'text', 'Descargar' );
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
};

// funciones para modo paint

let dibuja = document.getElementById("boton-dibujar");
let borra = document.getElementById("boton-borrar");
let limpia = document.getElementById("boton-limpiar");

dibuja.addEventListener("click", function(){
//    let imagenActual = canvas.getContext('2d');

    pintando = true;
});

borra.addEventListener("click", function(){

    pintando = false;   // borrar dibujando la imagen anterior
});

limpia.addEventListener("click", function(){
    let ca = document.getElementById('canvas');
    let co = ca.getContext('2d');
    console.log("limpia");
    ca.width = ca.width;
    console.log("limpia1");
    co.clearRect(0, 0, width, height);
    console.log("limpia2");
    co.drawImage(imageCopy, 0, 0, width, height);
//    co.drawImage(imagenOriginal, 0, 0, width, height);
    pintando = false;
});


canvas.addEventListener("mousedown",function(){
    click = true;
})

canvas.addEventListener("mouseup",function(){
    click = false;
    lastX = -1;
    lastY = -1;
    image.src = canvas.toDataURL();
})

canvas.addEventListener("mouseup",function(){
    click = false;
    lastX = -1;
    lastY = -1;
    image.src = canvas.toDataURL();
})

canvas.addEventListener("mousemove",function(event){
    if(click){
        if(pintando){
            colorPintura = "#ff0000";
            pintar(event);

        }else if(!pintando){
                colorPintura = "#ffffff";          // preguntar como hacer para volver al estado anterior
            pintar(event);
        }
    }
});

function pintar(event) {
    console.log("pintando");
    context.lineWidth = 6;
    context.strokeStyle = colorPintura ;
    context.lineCap = "round";
    let x = event.layerX - 1;
    let y = event.layerY;

    context.beginPath();
    if(lastX != -1){
        context.moveTo(lastX, lastY);
    }else{
        context.moveTo(x,y);
    }
    context.lineTo(x, y);
    context.stroke();

    lastX = x;
    lastY = y;
}
