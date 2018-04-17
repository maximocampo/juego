var canvas = document.getElementById('main-game');
var ctx = canvas.getContext('2d')

var red = 255
var green;
var redDir = true;
var color = 'rgb('+red+green+',145)'

//controles

var run = false

//constructores
function Background(){
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.imgMountainsOrange = new Image()
  this.imgMountainsOrange.src = 'assets/montañasNaranja.png'
  this.imgMountainsPurple = new Image()
  this.imgMountainsPurple.src = 'assets/montañasRosa.png'
  this.imgMountainsOrange2 = new Image()
  this.imgMountainsOrange2.src = 'assets/montañasNaranja2.png'
  this.imgMountainsPurple2 = new Image()
  this.imgMountainsPurple2.src = 'assets/montañasRosa2.png'

  this.move = function(){
    if(this.x < -this.width * 2) this.x = 0;
    this.x-=2;
  }
  this.draw = function(){
    this.move()
    this.drawSky(color);
    this.drawMountain2(this.x)
    this.drawMountain1(this.x)

  }

  this.drawSky = function(x){
      ctx.fillStyle = x
      ctx.fillRect(this.x,this.y,this.width * 3,this.height)
  }

  this.drawMountain1 = function(){
    ctx.drawImage(this.imgMountainsOrange,this.x,this.y + 30,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange2,this.x +this.width,this.y + 30,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange,this.x + this.width * 2,this.y + 30,this.width,this.height)
  }
  this.drawMountain2 = function(){
    var x = this.x /2
    ctx.drawImage(this.imgMountainsPurple,x - 300,this.y,this.width,this.height)
    ctx.drawImage(this.imgMountainsPurple2,x - 300 + this.width,this.y,this.width,this.height)
    ctx.drawImage(this.imgMountainsPurple,x - 300 + this.width * 2,this.y,this.width,this.height)
  }
}
function Block(y){
  this.x = 0;
  this.y = y;
  this.width = 32;
  this.height = 32;
  this.img = new Image()
  this.img.src = 'assets/block.png'

  this.draw = function(){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    this.x += 1
  }
}
function Player(){
  this.which     = true;
  this.x         = 50;
  this.y         = 50;
  this.width     = 21;
  this.height    = 36;
  this.frame     = 2;
  this.jumping   = false;
  this.sheet     = new Image()
  this.sheet.src = 'assets/player/running.png'
 

  this.runAnimation = function () {
    if(this.jumping){
      this.frame = 5
      this.y-=7
    }else{
      this.y+=5
    }
    ctx.drawImage(this.sheet,this.frame * 21 ,0,this.width,this.height, this.x, this.y,this.width,this.height)
  }

  this.moveRight = function(){
    if (this.frame <3){
      this.frame = 3;
    } else {
      this.frame = 2
    }
    this.x += 10
  }
  this.moveLeft = function(){
    if (this.frame >0){
      this.frame = 0;
    } else {
      this.frame = 1
    }
    this.x -= 10
  }
  this.jump = function(){
    if(!this.jumping && this.isTouching){
      setTimeout(this.fall,300);
      this.jumping = true
    } 
    
  }
  this.fall = function(){
    this.frame = 4
    this.jumping = false;
  }.bind(this)
  this.isTouching = function(block){
      return (this.x < block.x + block.width) &&
        (this.x + this.width > block.x) &&
        (this.y < block.y + block.height) &&
        (this.y + this.height > block.y);
    }
}




var background = new Background
var player = new Player()
var blocks = []
var interval;
var frames = 0


function changeColor(){
  if(redDir){
    red-=.25 
  }
  if(!redDir){
    red+=.25
  }
  if(red === 255)redDir = true
  if(red === 0)redDir = false
  green = red - 50
  color = 'rgb('+red+','+green+',145)';
  console.log(color)
}
function generateBlocks(){
  if(!(frames % 32 === 0)) return
  var randomY = Math.floor(Math.random()*300)+300
  var block = new Block(canvas.height - 32)
  blocks.push(block)
}

function drawBlocks(){
  blocks.forEach(function(block){
    block.draw()
  })
}

function checkCollision(block){
    blocks.forEach(function(block){
    if(player.isTouching(block))player.y-=5
  })
}

function start(){
  if(interval > 0)return
  interval = setInterval(function(){
    update()
  },1000/60)
}

function update(){

  changeColor()
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  background.draw();
  generateBlocks()
  drawBlocks()
  player.runAnimation()
  checkCollision()
  
}

document.getElementById('start').addEventListener('click',start)
addEventListener('keydown', function(e){
  if(e.keyCode === 39) player.moveRight();
  if(e.keyCode === 37) player.moveLeft();
  if(e.keyCode === 38) player.jump()
})
 