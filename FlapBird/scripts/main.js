/////////////////////////////////////////////////////////////
////////////////////////////P5.JS////////////////////////////
/////////////////////////////////////////////////////////////
let backGroundImg;
let gameOverBackGround;


let cHeight = 600;
let cWidth = 800;
function setup() {
	//backGroundImg.crossOrigin = loadImage('assets/BackGround.png');
	backGroundImg = loadImage('https://mir-s3-cdn-cf.behance.net/project_modules/disp/dd1c3d16532917.562ad5374e593.png');
	gameOverBackGround = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfKyYaE3jzK3Lx6vnn-9E_uGSrv6wid2QMdg&usqp=CAU');
	createCanvas(cWidth, cHeight);
	Init();
}

function draw() {
	if(birdIsAlive){	
		background(backGroundImg);
		bird.Draw();
		for(it in barriers){
			if(it<=3){
				if(barriers[it].IntersectionOnX(bird)){
					++score;	//как 
					birdIsAlive = !barriers[it].IntersectionOnY(bird);
					if(!birdIsAlive) break;
				}				
			}
			barriers[it].Draw();
			barriers[it].OffsetX(-1);			
		}
		bird.Move(0, 1);
		BarrierLife();

		DisplayInfo();

		birdIsAlive &= !bird.OutsideTheScreen(cWidth, cHeight);
	}
	else{
		background(gameOverBackGround);
		GameOverInfo();
		DisplayInfo();
	}
}
function keyPressed(){	
	if (keyCode == 32) {
		bird.Fly();
		/*
		 Can make a version
		 where the barrier is generated 
		 by pressing the space button 
		*/
		//distanceBetweenBarrrier = getRandomInt(100, 200);
	}	
}
/////////////////////////////////////////////////////////////
////////////////////////////Logic////////////////////////////
/////////////////////////////////////////////////////////////
function Init(){
	barriers.push(new Barrier(cWidth, 0, 150, cHeight - 300, cHeight, barrier_width));
	birdIsAlive = true;
	score = 0;
}

let bird = new Bird(200,1);
let birdIsAlive = false;

let barrier_width = 10;
let barriers = [];

//Barriers generator
let timer = 0;
distanceBetweenBarrrier = 130;
const magicNumber = 150;
const minHole = 90;
function BarrierLife(){
	if(++timer%distanceBetweenBarrrier == 0){
		//When appear newxt barrier
    	distanceBetweenBarrrier = getRandomInt(100,200);
    	let h1d = getRandomInt(30, (cHeight-magicNumber)/2);
    	let hole_size = getRandomInt(minHole, (cHeight-magicNumber)/2);
    	barriers.push( new Barrier(cWidth, 0, h1d, h1d+hole_size, cHeight, barrier_width));

    	//remove the old barrier that has lived
    	timer = 0;
    }
    if(barriers[0].X < 0)
    		barriers.shift();
}

//RandomGenerator
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

/////////////////////////////////////////////////////////////
/////////////////////////DisplayInfo/////////////////////////
/////////////////////////////////////////////////////////////
//Display information about game over
const GOTextSize = 50;
const GOText = "Press to F5";
function GameOverInfo(){
	stroke(100, 100, 100);
	strokeWeight(1);
	fill(0, 255, 255);
	textSize(50);
	text(GOText, (cWidth - 200)/2, cHeight/2);
	textSize(GOTextSize/2);
	text("to reset", (cWidth - 100)/2, cHeight/2 + 30);
}
//Print data
function DisplayInfo(){
	PrintScore();
}

let score = 0;
const ScoreTextSize = 20;
function PrintScore(){	
	stroke(100, 100, 100);
	strokeWeight(1);
	fill(128, 128, 128);
	textSize(ScoreTextSize);
	text(`Score: ${Math.ceil(score/11)}`, ScoreTextSize, ScoreTextSize); //TODO: Пиииииздец костыль!!!!
}

