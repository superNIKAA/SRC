//Control punkter
let P0 = {x: 50, y: 300, relativX: undefined, relativY: undefined};
let P1 = {x: 200, y: 300, relativX: undefined, relativY: undefined};
let P2 = {x: 400, y: 300, relativX: undefined, relativY: undefined};
let P3 = {x: 750, y: 300, relativX: undefined, relativY: undefined};
let P4 = {x: 100, y: 500, relativX: undefined, relativY: undefined};
//Sekundere punkter
let A = {x: undefined, y: undefined};
let B = {x: undefined, y: undefined};
let C = {x: undefined, y: undefined};
let D = {x: undefined, y: undefined};
//3 punkter
let E = {x: undefined, y: undefined};
let F = {x: undefined, y: undefined};
let G = {x: undefined, y: undefined};
//4 punkter
let H = {x: undefined, y: undefined};
let I = {x: undefined, y: undefined};

let P = {x: undefined, y: undefined};


let t=1;
let t_bil=0;
let pd=10;
//bezier curvens tykkelse
let cs=50;

let bezierPoints = [P0,P1,P2,P3,P4]


function setup() {
  createCanvas(800, 600);
  randomizePoints();

}

function randomizePoints() {
  for (let i = 0; i < bezierPoints.length; i++) {
    bezierPoints[i].x = random(width);
    bezierPoints[i].y = random(height);
    
  }
}

function draw() {
  background(120,200,255);
  rectMode(CENTER)
  
  fill(170);
  noStroke();
  for(let t=0; t<1; t+=0.001){
    calcBezier(t);
    drawBezier();
  }
  fill(255);
  stroke(1);
  drawPoints()
  textSize(12)
  text("P0",P0.x, P0.y, - 10)
  text("P1",P1.x, P1.y, - 10)
  text("P2",P2.x, P2.y, - 10)
  text("P3",P3.x, P3.y, - 10)
  text("P4",P4.x, P4.y, - 10)
  

  //Bil
  angleMode(DEGREES)
  calcBezier(t_bil);
  translate(P.x,P.y);

  //Regning af bil vinkel
  angleX=-P.x;
  angleY=-P.y;

  calcBezier(t_bil+0.01);

  angleX+=P.x;
  angleY+=P.y;

  rotate(-atan(angleX/angleY));
  fill (250,200,120)
  rect(0,0,10,20);
  t_bil+=0.006
  if(t_bil>=1){
    t_bil=0;

    randomizePoints();
  }
  rotate(atan(angleX/angleY));
  translate(-P.x,-P.y)

  
}

function calcBezier(t){
  //Sekundere punkter
  lerp2D(A,P0,P1,t)
  lerp2D(B,P1,P2,t)
  lerp2D(C,P2,P3,t)
  lerp2D(D,P3,P4,t)
  //3
  lerp2D(E,A,B,t)
  lerp2D(F,B,C,t)
  lerp2D(G,C,D,t)
  //4
  lerp2D(H,E,F,t)
  lerp2D(I,F,G,t)
  //P
  lerp2D(P,H,I,t);
}

function lerp2D(newPoint,p_1,p_2,time){
  newPoint.x=lerp(p_1.x,p_2.x,time)
  newPoint.y=lerp(p_1.y,p_2.y,time)
}


function supportLines(){
  line(P0.x,P0.y,P1.x,P1.y);
  line(P1.x,P1.y,P2.x,P2.y);
  line(P2.x,P2.y,P3.x,P3.y);
  line(P3.x,P3.y,P4.x,P4.y);
}

function drawBezier(){
  circle(P.x,P.y,cs);
}

function drawPoints(){
  circle(P0.x,P0.y,pd);
  circle(P1.x,P1.y,pd);
  circle(P2.x,P2.y,pd);
  circle(P3.x,P3.y,pd);
  circle(P4.x,P4.y,pd);
}

