Engine = Matter.Engine,
World = Matter.World,
Events = Matter.Events,
Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score = 0;
var plinkosnumber = 0;

var gamestate = 1;
var start = 1;
var end = 2;

var endsprite; 
var endspritei;

function preload()
{
   endspritei = loadImage("game over.png");
}
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
}
 


function draw() {
  Engine.update(engine);

  if(gamestate === start)
  {
   background("black");
   textSize(20);
   text("Score : "+score,20,30);
   //Not working(game end functionality).
   textSize(20);
   text("Plinkos count : "+plinkosnumber,600 ,30);
  
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
 
   for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   if(plinkosnumber === 5)
   {
     gamestate = end;
   }
  } 

  if(gamestate === end)
  {
    background("white");
    endsprite = createSprite(400, 400, 10, 10);
    endsprite.addImage("game over.png", endspritei);
    score.visible = true;
    plinkos.destroy();
    if(mousePressedOver(endsprite))
    {
      gamestate = start;
    }
    drawSprites();
  }
}


function keyPressed()
{
  particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
  score = score + Math.round(random(0, 100));
  plinkosnumber++;
}