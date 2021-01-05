var  dog, happyDog, database, foodS, foodStock, dogImg, happyDogImg, milk, milkImg, bgImg;
var addFood, feedDog, foodObj, lastfed, feed;
var foodCount = 0;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png");
  bgImg = loadImage("images/bg.png");
}

function setup() {
  foodObj = new Foods();
  createCanvas(1000, 500);

  database = firebase.database();
  
  dog = createSprite(700, 350);
  dog.addImage(dogImg);
  dog.scale = 0.6;

  milk = createSprite(600, 375);
  milk.addImage(milkImg);
  milk.scale = 0.017

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(bgImg);
  
  if(foodS !== 0){
    dog.addImage(happyDogImg)
    dog.scale = 0.3;
    milk.visible = true;
  }
  else{
    dog.addImage(dogImg);
    dog.scale = 0.6;
    milk.visible = false;
  }

  if(foodS === undefined){
    foodS = 0
  }

  textSize(25)
  fill("black")
  stroke(3)
  feed = database.ref('lastFed')
  feed.on("value", (data)=>{
    lastfed = data.val();
  })
  console.log(lastfed)
  //lastfed=hour();
  if(lastfed!=undefined){
  if(lastfed>12){
    text("Last Feed: "+lastfed%12 + " PM", 350, 80);
  }
  else if(lastfed===0){
    text("Last Feed: 12 AM", 350, 80);
  }

  else if(lastfed===12){
    text("Last Feed: 12 PM", 350, 80);
  }
  else{
    text("Last Feed: "+lastfed + " AM", 350, 80);
  }}

  drawSprites();
  foodObj.display();
  foodCount = foodS
  textSize(25)
  fill("black")
  stroke(3)
  text("Food Remaining: "+foodS, 350, 50);
}


function readStock(data){
  foodS = data.val();
}




