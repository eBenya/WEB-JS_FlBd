var grav = 0.2;
//let birdImg = loadImage('https://img2.freepng.ru/20180418/eww/kisspng-flappy-bird-tap-bird-2d-spike-bird-angry-birds-5ad6f4cd100313.7707300815240368130656.jpg');

class Bird{
	constructor(x, y){
		this.X = x;
		this.Y = y;
		this.Vy = 0;
		//this.isAlive = true;
	}
	Draw(){
		stroke(123, 123, 0);
		strokeWeight(3);
		fill(100, 150, 100);
		ellipse(this.X, this.Y, 20, 20);
		
	}
	Move(dx,dy){
		this.X += dx;
		if (this.Vy >= 0) {
		this.Vy += grav*2;
		}
		else{
			this.Vy +=grav;
		}
		this.Y += this.Vy;
	}
	Fly(){
		this.Vy = -5;
	}
	OutsideTheScreen(scrW, scrH){
		if(this.Y >= scrH || this.Y <= 0)
			return true;
		return false;
	}
}

class Barrier{
	constructor(x, h1u, h1b, h2u, h2b, width){
		this.X = x;
		this.TopUp = h1u;		//HTop (h1) - height relative to top
		this.TopDwn = h1b;
		this.BotUp = h2u;		//HBot (h2) - height relative to bottom
		this.BotDwn = h2b;
		this.width = width;
	}
	Draw(){
		rectMode(CORNERS);
		stroke(250,100,0);
		strokeWeight(10);
		fill(250,100,0);

		rect(this.X, this.TopUp, this.X+10, this.TopDwn);
		rect(this.X, this.BotUp, this.X+10, this.BotDwn);
	}
	OffsetX(x){
		this.X += x;
	}
	IntersectionOnX(obj){
		if (obj.X >= this.X && obj.X <= this.X+this.width)
			return true;
		return false;
	}
	IntersectionOnY(obj){
		if (obj.Y <= this.TopDwn || obj.Y >= this.BotUp)
			return true;
		return false;
	}
	IntersectionOnObj(obj){
		if(this.IntersectionOnX(obj))
			if (this.IntersectionOnY(obj))
				return true;
		return false;
	}
}