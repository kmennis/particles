/* Track for change in type */
var changeType = "rain";
	function getType(type){
		var getVal = type.options[type.selectedIndex];
		changeType = getVal.value;
	}	
	
/****/
	
$(document).ready(function() {
/* Prepare canvas */
  var canvas = $('#canvas')[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
    var paused = true;

  if(canvas.getContext) {
    var canvasCT = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
   
    canvasCT.lineWidth = 1;
    canvasCT.lineCap = 'round';
    
    /*Max of 1000 particles */
    var init = [];
    var maxParts = 1000;

/* Initialize particles */
    for(var a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * w,
        y: Math.random() * h,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10
      })
    }
    
    var particles = [];
    for(var b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }

/*Finish Initializing particles */

 /* Rain */
    function drawRain() {
	 canvasCT.strokeStyle = 'rgba(174,194,224,0.5)';
      canvasCT.clearRect(0, 0, w, h);
      for(var c = 0; c < particles.length; c++) {
        var p = particles[c];
		p.ys = Math.random() * 10 + 10;
		p.xs = -4 + Math.random() * 4 + 2;
		//p.x = Math.random() * w;
		//p.y = -20;
        canvasCT.beginPath();
        canvasCT.moveTo(p.x, p.y);
        canvasCT.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        canvasCT.stroke();
      }
      moveRain();
    }
    
    function moveRain() {
      for(var b = 0; b < particles.length; b++) {
        var p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if(p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -20;
        }
      }
    }
 /* end Rain */
 /*Start Snow */

	var counter = 0;
	var windBlow = false;
	var windBlowCount = 0;
    function drawSnow() {
	      canvasCT.strokeStyle = 'rgba(255,255,255,0.9)';
		
      canvasCT.clearRect(0, 0, w, h);
      for(var c = 0; c < particles.length; c++){
        var p = particles[c];
        canvasCT.beginPath();
		var randBlow = Math.floor(Math.random() * 100000 + 1 );
		if(( randBlow % 2) == 0  && counter > 100 ){
			windBlow == true;
		}
		if(windBlow == true){	
			//alert("BLOW");
			p.ys = Math.random() * 100 + 2;
			//p.xs = Math.random() * 100 + 10;
			windBlowCount++;
			//p.x = Math.random() * w;
			if(windBlowCount == 100){
				windBlow = false;
				windBlowCount = 0;
			}
			counter = 0;
		}else{
			counter++;
			p.ys = Math.random() * 1 + 2;
			//p.x = Math.random() * w;
			//p.xs = -4 + Math.random() * 4 + 2;

		}
        canvasCT.moveTo(p.x, p.y);
        canvasCT.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        canvasCT.stroke();
      }
      moveSnow();
    }
    
    function moveSnow() {
      for(var b = 0; b < particles.length; b++) {
        var p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if(p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -1;
        }
      }
    }
/* End snow*/
   
    
  }
/* Change type of animation */  
var startButton = document.getElementById('start');
var bttnCtnr = document.getElementById('animationControls');
var clickFlip = 0;

startButton.onclick = function(){
		if(clickFlip == 0){
			bttnCtnr.setAttribute('class','play');
			paused = false;
			clickFlip = 1;
		}else{
			bttnCtnr.setAttribute('class','pause');
			paused = true;
			clickFlip = 0;
		}
	};
	
	 setInterval(function(){
		if(paused == false){
			if(changeType == "rain"){
				drawRain();
			}else{
				drawSnow();
			}
		}
	
	}, 30);
});