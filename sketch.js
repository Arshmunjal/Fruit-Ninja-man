var PLAY = 1;
var END = 2;
var gameState = PLAY;


var sword,swordimg;

var fruit1,fruit2,fruit3,fruit4

var fruitGroup

var Monster,MonsterIMG,enemyGroup

var score = 0;

var GameoverIMG

var swordSound,GameoverSound

function preload(){
  
 swordimg=loadImage("sword.png");
  fruit1= loadImage("fruit1.png");
  fruit2 =loadImage("fruit2.png")
  fruit3 =loadImage("fruit3.png")
  fruit4 =loadImage("fruit4.png")
  
  MonsterIMG = loadAnimation("alien1.png","alien2.png")
  
  GameoverIMG = loadImage("gameover.png");
  
  swordSound = loadSound("knifeSwoosh.mp3");
  GameoverSound = loadSound("gameover.mp3");
}
function setup(){

  createCanvas(400,400)
  sword=createSprite(0,0,20,20);
  sword.addImage(swordimg);
  sword.scale=0.7;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
}

function draw(){
background(220);
  if(gameState === PLAY){
 text("score: "+score,200,50);
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    swordSound.play();
    score = score + 2
  }
  sword.y = World.mouseY
  sword.x = World.mouseX
  }
  if(enemyGroup.isTouching(sword)){
    GameoverSound.play();
     gameState=END;
  }
     
  
  if(gameState === END){
    
    sword.addImage(GameoverIMG);
    sword.x = 200;
    sword.y = 200;
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    
    fruitGroup.destroyEach();
    
    enemyGroup.destroyEach();
    
  }
  fruits();
  Enemy();
  drawSprites();
}
function fruits(){
    if(World.frameCount%80===0){
      position =Math.round(random(1,2));
      fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
      if(position ==1){
        fruit.x = 400;
        fruit.velocityX = -(7+(score/4));
      }
      else
      {
        if(position ==2){
          fruit.x = 0;
          fruit.velocityX = (7+(score/4));
        }
          
      }
      r=Math.round(random(1,4));
      if(r==1){
        fruit.addImage(fruit1);
      }else if (r==2){
      fruit.addImage(fruit2);
      }else if (r==3){
        fruit.addImage(fruit3);
      }else {
      fruit.addImage(fruit4);
      }
    fruit.y = Math.round(random(50,340));
      
     
      fruit.setLifetime = 100;
      
      fruitGroup.add(fruit);
   
  }
  }
function Enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",MonsterIMG);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}