/* Track for change in type 
 * HTML onchange cannot track functions in .ready(). Must be outside.
*/
var changeType = "rain";
function getType(type){
	var getVal = type.options[type.selectedIndex];
	changeType = getVal.value;
}	
	
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

 /* Rain
 * DrawRain- Gets initial point of each particle, then calls move
  * MoveRain- Move rain calculates the next position of the particle to get to
  * these two points make the particle
  * 
  *
 */
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
    //move the particle back to the top
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
 
 /* 
  * Wind directions are stored in an 
  * array and the index is changed incrementally 
 */
	var driftVal = [1,1,2,2,3,3,5,7,7,5,4,2,-2,1,,-2,-3,-4,-5,-3,-2,1,2,5,6,6,5,3,2,1]
	var driftIndex = -1;
/* Change drift index every 3 seconds */
	setInterval(function(){
		driftIndex++;
		if(driftIndex >= driftVal.length){
			driftIndex = 0;
		}	
	},1000*3);
	var counter = 0;
	var windBlowCount = 0;
/* Snow
 * drawSnow()- Gets initial point of each particle, then calls move
  * drawSnow()- Move rain calculates the next position of the particle to get to
  * these two points make the particle
  * Unlike rain, it uses a drift value to have particles drift in the same directions
  * to simulate wind
 */
    function drawSnow() {
	    canvasCT.strokeStyle = 'rgba(255,255,255,0.9)';
		canvasCT.clearRect(0, 0, w, h);
		for(var c = 0; c < particles.length; c++){
			var p = particles[c];
			canvasCT.beginPath();
			//Snow needs to fall slower, choose a smaller ys
			p.ys = Math.random() *  2 + 1;
			canvasCT.moveTo(p.x, p.y);
			canvasCT.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
			canvasCT.stroke();
		}
		moveSnow();
    }
    
    function moveSnow() {
		for(var b = 0; b < particles.length; b++) {
			var p = particles[b];
			p.x += p.xs + driftVal[driftIndex];
			p.y += p.ys;
			//move the particles back to the top
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
/*
 * Changes css class to show play pause button. Also dictates which
 * Animation is played
 */
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
//Play the animation snow or rain
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