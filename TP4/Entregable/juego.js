
var hero = {
			x: 300,
			y: 500
	}

var enemies = [
			{x:50, y:50},
			{x:150, y:150},
			{x:250, y:75},
			{x:350, y:250},
			{x:450, y:125},
			{x:650, y:75},
			{x:750, y:50},
	];

var specialenemies = [
			{x:400, y: 1},
			{x:100, y: 30},
			{x:700, y: 80}
	]

var bullets = [];
var score = 0;
var explosion_i = 0;


	function displayEnemies(){
			var output = '';
			for(var i=0; i<enemies.length; i++){
					output += "<div class='enemy1' style='top:"+enemies[i].y+"px; left:"+enemies[i].x+"px;'></div>";
			}
			document.getElementById('enemies').innerHTML = output;
	}

	function displaySpecialEnemies(){
			var output = '';
			for(var i=0; i<specialenemies.length; i++){
					output += "<div class='specialenemies1' style='top:"+specialenemies[i].y+"px; left:"+specialenemies[i].x+"px;'></div>";
			}
			document.getElementById('specialenemies').innerHTML = output;
	}


	function displayHero(){
			document.getElementById('hero').style['top'] = hero.y + "px";
			document.getElementById('hero').style['left'] = hero.x + "px";
	}


	function moveEnemies(){
			for(var i=0; i<enemies.length; i++){
					enemies[i].y += 5;

					if(enemies[i].y > 540){
							enemies[i].y = 0;
							enemies[i].x = Math.random()*700;
					}
			}
	}


	function moveSpecialEnemies(){
			for(var i=0; i<specialenemies.length; i++){
					specialenemies[i].y += 7;

					if(specialenemies[i].y > 540){
							specialenemies[i].y = 0;
							specialenemies[i].x = Math.random()*700;
					}
			}
	}


	function displayBullets(){
			var output = '';
			for(var i=0; i<bullets.length; i++){
					output += "<div class='bullets' style='top:"+bullets[i].y+"px; left:"+bullets[i].x+"px;'></div>";
			}
			document.getElementById('bullets').innerHTML = output;
	}

	function moveBullets(){
			for(var i=0; i<bullets.length; i++){
					bullets[i].y -= 5;

					if(bullets[i].y<0){
							bullets[i] = bullets[bullets.length-1];
							bullets.pop();
					}
			}
	}

//    movimiento de avion
	document.onkeydown = function(a) {
			if(a.keyCode == 37){
					hero.x -= 15;
					
			}else if(a.keyCode == 39){
					hero.x +=15;
			}else if(a.keyCode == 38){
					hero.y -=15;
			}else if(a.keyCode == 40){
					hero.y +=15;
			} else if(a.keyCode == 32){
					bullets.push({x: hero.x+8, y: hero.y-15});
			}
			displayHero();
	}

//    EXPLOSIONS
	function createExplosion(){
			enemies[i]
	}


//    COLLISION DETECTION
//    ENEMIES & BULLETS
	function detectCollision(){
			for(var i=0; i<bullets.length; i++){
					for(var j=0; j<enemies.length; j++){
							if( Math.abs(bullets[i].x - enemies[j].x) < 10 && Math.abs(bullets[i].y - enemies[j].y) < 10){
									score += 10;
									var mydiv = document.createElement("div");
									mydiv.style.top = enemies[j].y+"px";
									mydiv.style.left = enemies[j].x+"px";
									mydiv.className = "explosions1";

									document.getElementById('explosions').appendChild(mydiv);

									setTimeout(function() {
											mydiv.parentNode.removeChild(mydiv);
									}, 800);
									enemies.splice(j, 1);
							}
					}
					for(var j=0; j<specialenemies.length; j++){
							if( Math.abs(bullets[i].x - specialenemies[j].x) < 10 && Math.abs(bullets[i].y - specialenemies[j].y) < 10){
									score += 10;
									var mydiv = document.createElement("div");
									mydiv.style.top = specialenemies[j].y+"px";
									mydiv.style.left = specialenemies[j].x+"px";
									mydiv.className = "explosions1";

									document.getElementById('explosions').appendChild(mydiv);

									setTimeout(function() {
											mydiv.parentNode.removeChild(mydiv);
									}, 800);
									specialenemies.splice(j, 1);
							}
					}
			}

//        ENEMIES & HERO
			for(var i=0; i<enemies.length; i++){
					if(Math.abs(enemies[i].x - hero.x) < 10 && Math.abs(enemies[i].y - hero.y) < 10){
							score = "GAME OVER";
							var mydiv = document.createElement("div");
							mydiv.style.top = enemies[i].y+"px";
							mydiv.style.left = enemies[i].x+"px";
							mydiv.className = "explosions1";

							document.getElementById('explosions').appendChild(mydiv);

							setTimeout(function() {
									mydiv.parentNode.removeChild(mydiv);
							}, 800);
							enemies.splice(i, 1);
							document.getElementById('hero').remove();
							stopGame();
					}
			}

			for(var i=0; i<specialenemies.length; i++){
					if(Math.abs(specialenemies[i].x - hero.x) < 10 && Math.abs(specialenemies[i].y - hero.y) < 10){
							score -= 500;
							var mydiv = document.createElement("div");
							mydiv.style.top = specialenemies[i].y+"px";
							mydiv.style.left = specialenemies[i].x+"px";
							mydiv.className = "explosions1";

							document.getElementById('explosions').appendChild(mydiv);

							setTimeout(function() {
									mydiv.parentNode.removeChild(mydiv);
							}, 800);
							specialenemies.splice(i, 1);
							document.getElementById('hero').remove();
							stopGame();
					}
			}
	}

	function explosionRemoval(){
			return;
			if(explosions.length>0){
					var elem = document.getElementById(explosions[explosions.length-1]);
					console.log(explosions);
					console.log(elem);
					explosions.pop();
					setTimeout(function(){ elem.remove(); }, 800);
			}
	}




	function displayScore(){
			document.getElementById('score').innerHTML = score;
	}



	function gameLoop(){
			displayHero();
			moveEnemies();
			moveSpecialEnemies();
			displayEnemies();
			displaySpecialEnemies();
			moveBullets();
			displayBullets();
			detectCollision();
			displayScore();
			explosionRemoval();
	}


	var myGame = setInterval(gameLoop, 30);
	myGame();


	function stopGame() {
			clearInterval(myGame);
	}
