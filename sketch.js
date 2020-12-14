var Mario,brick,coin,coinImg,brickg,MarioImg,brickImg;
var score = 0;
var bgImg,edges,coing,ghost,ghostImg,gameOverImg,gameOver;
var gameState = "play";

function preload(){
  MarioImg = loadAnimation("mario 4.png","mario 3.png");
  
  brickImg = loadImage("brick.png")
  bgImg = loadImage("Mario backkground image.png");
  
  coinImg = loadAnimation("Mario coin1.png","Mario coin2.png","Mario coin3.png","Mario coin4.png","Mario coin5.png","Mario coin6.png");
  ghostImg = loadAnimation("Mario ghost1.png","Mario ghost2.png","Mario ghost3.png","Mario ghost4.png")
  gameOverImg = loadImage("Mario game over.png")
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  background = createSprite(0,0,width,height);
  background.addImage(bgImg);
  background.scale = 7.5;
  
  Mario = createSprite(20,200,20,20);
  Mario.addAnimation("MarioImg",MarioImg)
 Mario.scale = 0.5;
  
  edges = createEdgeSprites()
  brickg = new Group();
  coing = new Group();
  ghostg = new Group();
}

function draw() {

  if (gameState === "play") {

  
  background.velocityX = -3;
  //background(bgImg);
  if (background.x < 0) {
    background.x = background.width/2;
  }
  
  //text(mouseX + "," + mouseY,mouseX,mouseY)
  if (keyDown("space")) {
    Mario.velocityY = -10;
   }
  if (keyDown("left_arrow")) {
    Mario.velocityX = -2;
  }
  
  if (keyDown("right_arrow")) {
    Mario.velocityX = 2;
  }
  
  Mario.velocityY = Mario.velocityY + 0.08;
  Mario.bounceOff(edges);
  if (Mario.collide(brickg)) {
    Mario.velocityY = 0;
    score=score+1;
  }
  bricks();
  Coins();
  Ghost();
  
 for(var i = 0; i<coing.length; i++){
if (coing.get(i).isTouching(Mario)) {
  coing.get(i).destroy();
  score = score+5;
}
 }

 for(var i = 0;i<ghostg.length;i ++){
  if(ghostg.get(i).isTouching(Mario)){
    Mario.destroy();
    gameState = "end";
       }
}  
}
 

if(gameState === "end"){
 
  background = createSprite(width/2,height/2,width,height);
  background.shapeColor = "black";
  ghostg.destroyEach();
  coing.destroyEach();
  brickg.destroyEach();
 score =0;

  
}
  Mario.bounceOff(edges[0]);
  drawSprites();
  textSize(25);
  fill("white")
  text("Score :"+ score,width/2,20)
}

function bricks() {
  if (frameCount % 100 === 0 ){
     brick = createSprite(width,Math.round(random(50,height)),50,10);
  brick.velocityX = -3;
  brickg.add(brick);     
  brick.addImage("brickImg",brickImg)
    brick.scale = 1;
    
  }
 
}

function Coins() {
  if (frameCount % 30 === 0 ){
 coin = createSprite(Math.round(random(10,width)),Math.round(random(20,height)),50,10);
  coin.velocityX = Math.round(random(-3,3));
  //brick.add(brick);     
  coin.addAnimation("coinImg",coinImg)
  coin.scale = 0.5;
  coin.lifetime = 200;
  coing.add(coin);
    
  }
 
}

function Ghost() {
  if (frameCount % 100 === 0 ){
 ghost = createSprite(Math.round(random(10,width)),Math.round(random(20,height)),50,50);
  ghost.velocityX = Math.round(random(-3,3));
  //brick.add(brick);     
  ghost.addAnimation("ghostImg",ghostImg)
  ghost.scale = 2;
  //ghost.lifetime = 100;
  ghostg.add(ghost);
  
    
  }
 
}
