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
var p1 = 0;
var p2 = 0;
var p3 = 0;
var er = 0;
var eg = 0;
var eb = 0;
var iBlurRate = 0;

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

function resetToBlur() {
    console.log("reset to blur");
    p1 = 1;
    p2 = 1;
    p3 = 1;
    er = eg = eb = 0;
    iBlurRate = 1;
    blur();
}

function Color() {
    imageDataCopia = clonarImageData();
    var data = imageDataCopia.data;
    for (var i = 0, n = data.length; i < n; i += 4) {
        data[i]   = data[i]*p1+er; // red
        data[i+1] = data[i+1]*p2+eg; // green
        data[i+2] = data[i+2]*p3+eb; // blue
    }
    context.putImageData(imageDataCopia, 0, 0);
}

function blur() {
    console.log("blur");
    imageDataCopia = clonarImageData();
    console.log(iBlurRate);
    var data = imageDataCopia.data;
    for (br = 0; br < iBlurRate; br += 1) {
        for (var i = 0, n = data.length; i < n; i += 4) {
            iMW = 4 * width;
            iSumOpacity = iSumRed = iSumGreen = iSumBlue = 0;
            iCnt = 0;
            // data of close pixels (from all 8 surrounding pixels)
            aCloseData = [
                i - iMW - 4, i - iMW, i - iMW + 4, // top pixels
                i - 4, i + 4, // middle pixels
                i + iMW - 4, i + iMW, i + iMW + 4 // bottom pixels
            ];
            // calculating Sum value of all close pixels
            for (e = 0; e < aCloseData.length; e += 1) {
                if (aCloseData[e] >= 0 && aCloseData[e] <= data.length - 3) {
                    iSumOpacity += data[aCloseData[e]];
                    iSumRed += data[aCloseData[e] + 1];
                    iSumGreen += data[aCloseData[e] + 2];
                    iSumBlue += data[aCloseData[e] + 3];
                    iCnt += 1;
                }
            }
            // apply average values
            data[i] = (iSumOpacity / iCnt)*p1+er;
            data[i+1] = (iSumRed / iCnt)*p2+eg;
            data[i+2] = (iSumGreen / iCnt)*p3+eb;
            data[i+3] = (iSumBlue / iCnt);
        }
    }
    context.putImageData(imageDataCopia, 0, 0);
}

function contraste (rango) {
    console.log("funcion contraste");
    imageDataCopia = clonarImageData();
    pixels = imageDataCopia.data,
    numPixels = imageDataCopia.width * imageDataCopia.height,
    //var factor;

    rango || ( contraste = 100 );  // valor por defecto

    var factor = ( 259 * ( rango + 255 ) ) / ( 255 * ( 259 - rango ) );

    for ( var i = 0; i < numPixels; i++ ) {
        var r = pixels[ i * 4 ];
        var g = pixels[ i * 4 + 1 ];
        var b = pixels[ i * 4 + 2 ];

        pixels[ i * 4 ] = factor * ( r - 128 ) + 128;
        pixels[ i * 4 + 1 ] = factor * ( g - 128 ) + 128;
        pixels[ i * 4 + 2 ] = factor * ( b - 128 ) + 128;
    }

    context.putImageData(imageDataCopia, 0, 0 );
};

botonContraste();

function botonContraste(){
    console.log("modo contraste");
    var contrast = document.getElementById("boton-contraste");
    contrast.addEventListener("click", function(){
        console.log("modo contraste2");
        var rangoC = document.getElementById("rangoContraste");
        rangoC.addEventListener("change", function(){
            console.log("cambia rango");
            contraste(this.value-49.7);

        });
    });
}

botonBlur();

function botonBlur(){
    console.log("modo blur");
    var blurBoton = document.getElementById("boton-blur");
    blurBoton.addEventListener("click", function(){
        console.log("modo blur2");
        var rango = document.getElementById("rangoBlur");
        rango.addEventListener("change", function(){
            console.log("cambia rango blur");
            console.log(this.value);
            iBlurRate = this.value;
            if (iBlurRate == 0)
                imagenOriginal();
            else
                blur();
        });
    });
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
//let borra = document.getElementById("boton-borrar");
let limpia = document.getElementById("boton-limpiar");

dibuja.addEventListener("click", function(){
//    let imagenActual = canvas.getContext('2d');

    pintando = true;
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

canvas.addEventListener("mousemove",function(event){
    if(click){
        if(pintando){
            colorPintura = "#ff0000";
            pintar(event);
          }
        // } else if(!pintando){
        //         colorPintura = "#FFffffff";          // preguntar como hacer para volver al estado anterior
        //     pintar(event);
        // }
    }
});

function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;
        return {
           x: (event.clientX - rect.left) * scaleX,
           y: (event.clientY - rect.top) * scaleY
               };
      }

  function pintar(event) {
      console.log("pintando");
      context.lineWidth = 6;
      context.strokeStyle = colorPintura ;
      context.lineCap = "round";
      var pos = getMousePos(canvas, event);
      console.log(pos.x);
      console.log(pos.y);
        // let x = event.pageX - canvas.offsetLeft;
        // let y = event.pageY - canvas.offsetTop;
        // console.log(event.pageX - canvas.offsetLeft);
        // console.log(event.pageY - canvas.offsetTop);

      context.beginPath();
      if(lastX != -1){
          context.moveTo(lastX, lastY);
      }else{
          context.moveTo(pos.x,pos.y);
      }
      context.lineTo(pos.x, pos.y);
      context.stroke();
      context.closePath();
      lastX = pos.x;
      lastY = pos.y;
  }
