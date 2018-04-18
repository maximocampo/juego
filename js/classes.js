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
    this.x-=7;
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
    ctx.drawImage(this.imgMountainsOrange,this.x * 2,this.y + 70,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange2,this.x*2 +this.width,this.y + 70,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange,this.x*2 + this.width * 2,this.y + 70,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange2,this.x*2 + this.width * 3,this.y + 70,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange,this.x*2 + this.width * 4,this.y + 70,this.width,this.height)
  }
  this.drawMountain2 = function(){
    ctx.drawImage(this.imgMountainsPurple,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.imgMountainsPurple2,this.x + this.width,this.y,this.width,this.height)
    ctx.drawImage(this.imgMountainsPurple,this.x + this.width * 2,this.y,this.width,this.height)
  }
}
function Block(x,y){
  this.x = x ? x : canvas.width
  this.y = y;
  this.width = 32;
  this.height = 32;
  this.img = new Image()
  this.img.src = 'assets/block.png'

  this.draw = function(){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    this.x -= 1
  }
}
function Structure(){
  this.x                  = canvas.width
  this.y                  = canvas.height - 64
  this.structureSelector  = [
                              [ new Block(this.x + 160,this.y),
                                new Block(this.x,this.y -32),
                                new Block(this.x+32,this.y -32),                               
                                new Block(this.x + 160,this.y -32),
                                new Block(this.x,this.y -64),
                                new Block(this.x + 128,this.y -64),
                                new Block(this.x + 160,this.y -64),
                                new Block(this.x,this.y -96),
                                new Block(this.x,this.y -128),
                                new Block(this.x,this.y -160),
                                new Block(this.x + 32,this.y -160),
                                new Block(this.x + 64,this.y -160),
                                new Block(this.x + 96,this.y -160),
                                new Block(this.x + 128,this.y -160),
                                new Block(this.x + 160,this.y -160),
                              ],
                              [ new Block(this.x,this.y),
                                new Block(this.x + 32,this.y),
                                new Block(this.x + 64,this.y),
                                new Block(this.x + 224,this.y),
                                new Block(this.x + 256,this.y),
                                new Block(this.x + 32,this.y - 32),
                                new Block(this.x + 64,this.y - 32),
                                new Block(this.x + 128,this.y - 32),
                                new Block(this.x + 160,this.y - 32),
                                new Block(this.x + 256,this.y - 32),
                                new Block(this.x + 64,this.y - 64),
                                new Block(this.x + 128,this.y - 64),
                                new Block(this.x + 128,this.y - 96),
                                new Block(this.x + 160,this.y - 96),
                                new Block(this.x + 192,this.y - 96),
                                new Block(this.x + 224,this.y - 96),
                                new Block(this.x + 256,this.y - 96)
                              ],
                              [ new Block(this.x,this.y),
                                new Block(this.x + 128,this.y),
                                new Block(this.x + 160,this.y),
                                new Block(this.x + 192,this.y),
                                new Block(this.x + 64,this.y - 32),
                                new Block(this.x + 160,this.y - 32),
                                new Block(this.x + 192,this.y - 32),
                                new Block(this.x + 32,this.y - 64),
                                new Block(this.x + 64,this.y - 64),
                                new Block(this.x + 96,this.y - 64),
                                new Block(this.x + 192,this.y - 64),
                                new Block(this.x + 32,this.y - 96),
                                new Block(this.x + 192,this.y - 96),
                                new Block(this.x + 96,this.y - 128),
                                new Block(this.x + 128,this.y - 128),
                                new Block(this.x + 160,this.y - 128),
                                new Block(this.x + 192,this.y - 128),

                              ]
                            ]
  this.img = new Image()
  this.img.src = 'assets/block.png'

  this.draw = function(){
    structures.push(this.structureSelector[structureNumber])
  this.x -= 1
}
}
function Player(image){
  this.which     = true;
  this.x         = canvas.width - 32;
  this.y         = 50;
  this.width     = 18;
  this.height    = 28;
  this.frame     = 2;
  this.jumping   = false;
  this.canMove   = true;
  this.right     = true;
  this.sheet     = new Image()
  this.sheet.src = image
 

  this.runAnimation = function () {
    this.x --
    if(this.jumping){
      this.frame = 5
      this.y-=10
    }else{
      this.y+=5
    }
    ctx.drawImage(this.sheet,this.frame * 21 ,0,this.width,this.height + 2, this.x, this.y,this.width,this.height)
  }

  this.moveRight = function(){
    this.right = true;
    this.x += 15
    if(!this.jumping){
      if (this.frame <3){
        this.frame = 3;
       } else {
        this.frame = 2
    }
  }
  }
  this.moveLeft = function(){
    this.right = false;
    this.x -= 15
    if(!this.jumping){
    if (this.frame >0){
      this.frame = 0;
    } else {
      this.frame = 1
    }    
  }
  }
  this.jump = function(){
    if(!this.jumping){
      this.jumping = true
      setTimeout(this.fall,150);
    } 
    
  }
  this.fall = function(){
    this.frame = 4
    this.jumping = false;
  }.bind(this)

  this.isTouching = function(block){
      return (this.x < block.x + block.width) &&
        (this.x + this.width > block.x) &&
        (this.y + this.height > block.y) &&
        (this.y < block.height + block.y);
    }


 
}