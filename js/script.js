var hand=$("#hand");
var gameArea = $("#game-area");
var scoreArea = $("#score");
var playButton = $("#play-button");
var menu = $(".play");
var scoreSection = $(".score-section");
var lastScoreSection = $(".last-score");
var lastScore = $("#final-score");
var curHighScore = $("#high-score");
var finalHighScore = $("#overall-hi-score");
var count = $(".game-area:after");

var rotatingDegree=270;
var rotateSpeed = 10;
var rotater = null;
var score = 0;
var colors=[{"colValue":"#3C6D4F","startAngle":46},
			{"colValue":"#14B3F7","startAngle":136},
			{"colValue":"#FF0A42","startAngle":226},
			{"colValue":"#F8E819","startAngle":316}];
var curColor = 0;
var clockWise = true;
var entered =false;
var highScore = 0;

var angle = 0 ;
var cirlceRotater=null;

var changeDirection =function(){
	clockWise = (clockWise == true ? false:true);
}
var rotateCircle =function(){
	cirlceRotater=setTimeout(function(){
		rotateCircle();
	},200);
	gameArea.style.transform = "rotateZ("+(angle++)+"deg)";
	for(i=0;i<colors.length;i++){		
		colors[i].startAngle=(colors[i].startAngle+1)%360;
	}
}
var rotateHand = function() {
	
	rotater = setTimeout(function() {
		rotateHand();
	},rotateSpeed);
	hand.style.transform = "rotateZ("+rotatingDegree+"deg)";
	if(clockWise){
		rotatingDegree=(rotatingDegree+1)%360;
	}
	else{
		rotatingDegree=(rotatingDegree-1);	
		if(rotatingDegree <= 0){
			rotatingDegree = 360;
		}
	}
	checkPosition();
}

var checkPosition = function(){
	var colorObj = colors[curColor];
	var tempRotatingDegree = Math.abs(rotatingDegree);
	if(tempRotatingDegree > 316){
		tempRotatingDegree+=45;
	}
	if(tempRotatingDegree < 45){
		tempRotatingDegree+=360;
	}
	if(tempRotatingDegree >= colorObj.startAngle && tempRotatingDegree < (colorObj.startAngle+90)){
		entered = true;
		
	}
	else{
		if(entered){
			gameOver();
		}
	}
}
var getUpdate = function(){
	if(entered) {
		entered = false;
		updateScore();
		nextColor();
		changeDirection();
	}
	else{
		gameOver();
	}
}
var gameOver = function(){
	stopRotate();
	hide(hand);
	setFinalValue();
	show(lastScoreSection);
	show(menu);
	localStorage.setItem("colorgamehighscore",highScore);
	setHighScore();
}
var setFinalValue = function(){
	lastScore.innerHTML = score;
}
var increaseSpeed = function(){
	if(rotateSpeed > 6)
		rotateSpeed -= 2;
	console.log(rotateSpeed);
}
var updateScore = function(){
	score++;
	scoreArea.innerHTML = score;
	if(score>highScore){
		highScore=score;
		curHighScore.innerHTML=highScore;
	}
	if(score%3 == 0){
		increaseSpeed();
	}
}

var nextColor = function(){
	do{
		var randomNumber = Math.floor(Math.random()*4);
	}while(curColor == randomNumber);
	curColor = randomNumber;
	console.log(curColor);
	hand.style.backgroundColor = colors[curColor].colValue;
}

var bindEvents = function(){
	gameArea.addEventListener("click",getUpdate);
	playButton.addEventListener("click",startGame);
}
var startGame = function(event){
	event.stopPropagation();
	intialize();
	hide(menu);
	show(hand);
	scoreSection.style.visibility = "visible";
	show(lastScoreSection);
	//getComputedStyle(gameArea,":before").setProperty("animation","changeLetter 3s linear");
	//setTimeout(function(){rotateHand()},0);
	rotateHand();
	//rotateCircle();
}
var hide = function(element){
	element.classList.add("hide");
}
var show = function(element){
	element.classList.remove("hide");
}
var stopRotate = function(){
	clearTimeout(rotater);
}

function $(){
	return document.querySelector(arguments[0]);
}

var intialize =function(){
	rotatingDegree=270;
	rotateSpeed = 20;
	rotater = null;
	score = 0;
	colors=[{"colValue":"#3C6D4F","startAngle":46},
			{"colValue":"#14B3F7","startAngle":136},
			{"colValue":"#FF0A42","startAngle":226},
			{"colValue":"#F8E819","startAngle":316}];
	curColor = 0;
	clockWise = true;
	entered =false;
	hand.style.backgroundColor=colors[0].colValue;
	scoreArea.innerHTML =0;
}
var initializeElement = function(){
	show(menu);
	hide(hand);
	scoreSection.style.visibility = "hidden";
	hide(lastScoreSection);
}
var init = function(){
	initializeElement();
	bindEvents();
	fetchHighScore();
	setHighScore();
}
var setHighScore =function(){
	finalHighScore.innerHTML=highScore;
	curHighScore.innerHTML=highScore;
}
var fetchHighScore = function(){
	var high=Number(localStorage.getItem("colorgamehighscore"));
	if(!isNaN(high))
		highScore=high;
}
window.onload=function(){
	init();
}