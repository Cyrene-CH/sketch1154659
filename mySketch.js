let dspa= false
let dspts = false
let balls = [];
let slider;
let x = 1;
let y = 1;
let easing = 0.05;
let c1, c2
let c = 500
let dsp = false
let o2 = []
let ts = []
let r = 30
let d = 1
var speed = 0.5
let lb = true
let fish=true
let tx=[]
//fishgroup
var bigSpeed = 0.11;
var bigSpeedy = 0;
var fishyArray = [];
var bigSize = 5;
let o=0

function preload(){
	song = loadSound("ie.wav")
}

function setup() {
	song.play();
 // frameRate(25);
  createCanvas(windowHeight / 0.75, windowHeight);
  angleMode(DEGREES);
  pg = createGraphics(windowHeight / 0.75, windowHeight);
  pg.clear();
  pg.angleMode(DEGREES);
  pg.push()
  pg.translate(width / 2, height)
  pg.scale(1.3)
  branch(70)
  pg.pop()
  push()
 pg1 = createGraphics(windowHeight / 0.75, windowHeight);
  pg1.clear();
  pg1.angleMode(DEGREES);
  pg1.push()
  pg1.translate(width / 2, height)
  pg1.scale(1.3)
  brancha(70)
  pg1.pop()
   pop()
  //o2
  for (let i = 0; i < 1; i++) {
    o2.push(new Ox(random(200, width - 100), random(300, 600), random(30, 40)))
  }
  setInterval(function() {
    for (let i = 0; i < random(4); i++) {
      o2.push(new Ox(random(200, width), random(200, 400), random(30, 40)))
    }
  }, 3000);
  //toxic
  for (let i = 0; i <1; i++) {
    tx.push(new To(random(200, 500), random(height + 20, height +30), random(30, 40)))
  }
  setInterval(function() {
    for (let i = 0; i < 2; i++) {
      tx.push(new To(random(200, width - 200), random(height + 20, height +30), random(30, 40)))
    }
  }, 2500);
  //trash
  for (let i = 0; i < 3; i++) {
    ts.push(new Trash(random(200, 650), random(height - 80, height - 150), random(30, 40)))
  }
  setInterval(function() {
    for (let i = 0; i < 2; i++) {
      ts.push(new Trash(random(200, 650), random(height - 60, height - 150), random(30, 40)))
    }
  }, 2000);
  //mousepressed
  slider = createSlider(0, 300, 30, 40);
//fishgroup
   for(var i =0; i<100; i++){
    var fishy = new FishyBit();
    fishyArray.push(fishy);
  }
   
}

function draw() {
  c1 = color(5, 67, 105);
  c2 = color(44, 185, 143);
  for (let y = 0; y < height; y++) {
    n = map(y, 0, height, 0, 1.8);
    let newc = lerpColor(c2, c1, n);
    stroke(newc);
    line(0, y, width, y);
  }

  C4()
  C3()
  C2()
  C1()
  push()
  image(pg, 0, 0)
  pop()
  push();
  if (fish==true){
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;
  noStroke()
  translate(x, y);
  drawFish(0, 0, d);
  }
  pop();

  for (let i = 0; i < o2.length; i++) {
    o2[i].show()
  }
  //life bar
  if (frameCount % 5 == 0 && lb == true && c > 1) c = c - 1;
  fill(191, 223, 175)
  noStroke()

  rect(0, 0, c, 10)


  for (let i = 0; i < ts.length; i++) {
    ts[i].show()


  }
  for (var a = 0; a < balls.length; a++) {
    balls[a].update();
    balls[a].render();
    if (balls[a].ballisFinished()) {
      balls.splice(a, 1);
    }
  }
  //winning
for(var i =0; i<fishyArray.length; i++){
    fishyArray[i].move();
    fishyArray[i].display();
  }
  bigSpeed = map(mouseX, 0,width, -5,18);
  bigSpeedy = map(mouseY, 0,height, -5,18);
  //ending
  if (c <1) {
  
  
    dsp = true
    dspts = true
   // lb = false
    fish =false
    fill(0, 84, 84,o)
    o=o+2
    rect(0, 0, width, height)
    //ellipse(50,50,100)
    fill(255)
    textFont('Georgia')
    textSize(20)
    text("Welcome to the only ending of this game.\n\nThe illusion of symbiosis between nature and humans is not respected by the latter.\n\nPlastic debris is thrown to the ocean at an exponential rate - 8 million pieces every day.\nIf we continue with our ruthless consumption, all species are doomed to extinction.\n\nStream <Seaspiracy> on Netflix.",35,70)
//branch(60)
  }
  //toxic
     for (let i = 0; i < tx.length; i++) {
    tx[i].show()
       
  }
  if(c<1){
      image(pg1, 0, 0)
    
  }

  //fishg
   
}

function FishyBit(){
  this.distance = random(0,100);
  this.x = random(0,width);
  this.y = random(0,height);
  this.d = map(this.distance,0,100,0.2,3)
  this.sizeIncr= random(0,0.03);
  this.rotationAngle = 0

  this.relativeSpeed = this.distance/100*bigSpeed;
  this.move = function(){
    this.x = (this.x+this.relativeSpeed*bigSpeed)%width;
    this.y = (this.y+this.relativeSpeed*bigSpeedy)%height;
  }
  this.display = function(){
    push()
    scale(1.3)
    fill(212, 250, 249,60);
    noStroke();
    ellipse(this.x, this.y, 6*this.d*(map(noise(this.x, this.y,0.01*frameCount),0,1,0.2,1)), 5*this.d*(map(noise(this.x, this.y,0.01*frameCount),0,1,0.2,1)));
    triangle(this.x-4,this.y-1,this.x-10,this.y-8,this.x-10,this.y+8);
    pop()
  }
}

class To {
  constructor(x, y, r) {

    this.x = x
    this.y = y
    this.r = r
    this.dspa=dspa
  }
  show() {
     var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.r-10) {
      this.dspa = true;
      //fill(255)
        for (var i = 0; i < 1; i++) {
      balls.push(new Ball((mouseX + random(-30, 30)), mouseY + random(-30, 30)));
    }
      c = c - 5
    }

    if (this.dspa == false&& millis()/1000>8) {
      noStroke() 
      fill(171, 186, 87,160)
      ellipse(this.x, this.y, this.r);
      fill(255, 255, 255, 200)
      ellipse(this.x + 5, this.y - 6, this.r / 3)
    }
    this.x += random(-1, 1);
    this.y -= 2;
  }
}


function mousePressed() {
  if (mouseY < height) {
    for (var i = 0; i < slider.value(); i++) {
      balls.push(new Ball((mouseX + random(-30, 30)), mouseY + random(-30, 30)));
    }
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.gravity = 0.1;
    this.diameter = (dist(x, y, mouseX, mouseY)) * 0.8;

    this.ax = random(-this.speed, this.speed);
    this.ay = random(-this.speed, this.speed);
    this.r = 125
    this.g = random(233, 245)
    this.b = random(199, 235)

  }

  update() {
    this.diameter = this.diameter - 0.15;
    this.x += this.ax / 2;
    this.y += this.ay / 2;

    this.x += random(-this.speed / 2, this.speed / 2);
    this.y += random(-this.speed / 2, this.speed / 2);
  }

  ballisFinished() {
    if (this.diameter < 0) {
      return true;
    }
  }

  render() {
    noStroke();
    if (this.diameter > 0) {
      fill(this.r, this.g, this.b, 140);
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }

  }
}

class Ox {
  constructor(x, y, r) {

    this.x = x
    this.y = y
    this.r = r
    this.dsp = dsp
  }

  show() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.r) {
      this.dsp = true;
      c = c + 1
    }

    if (this.dsp == false) {
      noStroke()
      fill(179, 232, 232, 180)
      ellipse(this.x, this.y, this.r);
      fill(255, 255, 255, 200)
      ellipse(this.x + 5, this.y - 6, this.r / 3)
    }
    this.x += random(-1, 1);
    this.y -= 1;
  }


}

class Trash {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.dspts = dspts
  }

  show() {
    let d = dist(mouseX, mouseY, this.x - 20, this.y)
    if (d < this.r && mouseIsPressed) {
      this.dspts = true;
      c=c+3
    }

    if (this.dspts == false) {
      c = c - 0.11
      noStroke(0);
      fill(255, 255, 255, 100);
      rect(this.x - this.r / 2, this.y, this.r, this.r + 20);
      fill(255, 255, 255, 125);
      ellipse(this.x, this.y, this.r, this.r / 4);
      ellipse(this.x, this.y + 50, this.r, this.r / 4);
    this.y+= sin(frameCount)*noise(0.9,0.95)
    }
  }


}



function drawFish(x1, y1, dir) {
  push()

  strokeWeight(0);
  //tail
  push()
  scale(1.5)
  fill(234, 191, 255, 180);
  arc(dir * (x1 - 14), y1, random(r - 7, r - 10), r - 10, random(dir * 90 + 45, dir * 90 + 50), random(dir * 90 + 130, dir * 90 + 135));
  pop()
  //body
  fill(235, 225, 127, 230)
  ellipse(x1, y1, r + 16, r + 2);

  pop()
}

function C1() {
  push()
  fill(0)
  beginShape();
  let xoff = 0;
  for (let x = 0; x <= width; x += 28) {
    let y = map(noise(xoff + 100), 0.5, 1, height - 50, height);
    curveVertex(x, y);
    xoff += 0.1;
  }
  curveVertex(width, height);
  curveVertex(0, height);
  endShape(CLOSE);
  pop()
}

function C2() {
  push()
  noStroke()
  fill(0, 54, 92)
  beginShape();
  let xoff = 0;
  for (let x = 0; x <= width; x += 28) {
    let y = map(noise(xoff + 100), 0.5, 1, height - 100, height - 60);
    curveVertex(x, y);
    xoff += 0.2;
  }
  curveVertex(width, height);
  curveVertex(0, height);
  endShape(CLOSE);
  pop()

}

function C3() {
  //translate(0,0)
  push()
  fill(7, 96, 128)
  noStroke()
  beginShape();
  curveVertex(0, height - 500);
  curveVertex(0, height - 500);
  curveVertex(30, height - 450);
  curveVertex(30, height - 400);
  curveVertex(80, height - 330);
  curveVertex(70, height - 250);
  curveVertex(90, height - 200);
  curveVertex(110, height - 150);
  curveVertex(0, height);
  curveVertex(0, height);
  endShape();
  pop()
  push()
  fill(7, 96, 128)
  noStroke()
  beginShape();
  curveVertex(width, height - 350);
  curveVertex(width, height - 350);
  curveVertex(width - 30, height - 300);
  curveVertex(width - 30, height - 250);
  curveVertex(width - 80, height - 180);
  curveVertex(width - 50, height - 100);
  curveVertex(width, height);
  curveVertex(width, height);
  endShape();
  pop()

  push()
  noStroke()
  fill(7, 96, 128)
  beginShape();
  let xoff = 0;
  for (let x = 0; x <= width; x += 28) {
    let y = map(noise(xoff), 0.5, 1, height - 200, height - 150);
    curveVertex(x, y);
    xoff += 0.3;
  }
  curveVertex(width, height);
  curveVertex(0, height);
  endShape(CLOSE);
  pop()

}

function C4() {
  push()
  noStroke()
  fill(56, 162, 173, 200)
  beginShape();
  let xoff = 0;
  for (let x = 20; x <= width - 18; x += 28) {
    let y = map(noise(xoff), 0.5, 1, height - 280, height - 200);
    curveVertex(x, y);
    xoff += 0.1;
  }
  curveVertex(width, height);
  curveVertex(0, height);
  endShape(CLOSE);
  pop()
}

function branch(len) {
  pg.push()
  if (len > 10) {
    pg.strokeWeight(map(len, 10, 100, 1, 15));
    pg.stroke(16, 27, 50);
    pg.line(0, 0, 0, -len);
    pg.translate(0, -len);
    pg.rotate(30);
    branch(len * random(0.7, 0.9));
    pg.rotate(-60);
    branch(len * random(0.7, 0.9))
  } else {
    let r = 161 + random(-20, 20);
    let g = 203 + random(-20, 20);
    let b = 195 + random(-20, 20);
    pg.fill(r, g, b, 180);
    pg.noStroke();
    pg.beginShape();
    for (let i = 45; i < 135; i++) {
      let rad = 15;
      let x = rad * cos(i);
      let y = rad * sin(i);
      pg.vertex(x, y);
    }
    for (let i = 135; i > 40; i--) {
      let rad = 15;
      let x = rad * cos(i);
      let y = rad * sin(-i) + 20;
      pg.vertex(x, y);
    }
    pg.endShape(CLOSE);
  }
  pg.pop();
}

function brancha(len) {
  pg1.push()
  if (len > 10) {
    pg1.strokeWeight(map(len, 10, 100, 1, 15));
    pg1.stroke(16, 27, 50,180);
    pg1.line(0, 0, 0, -len);
    pg1.translate(0, -len);
    pg1.rotate(30);
    brancha(len * random(0.7, 0.9));
    pg1.rotate(-60);
    brancha(len * random(0.7, 0.9))
  } 
  pg1.pop()
}