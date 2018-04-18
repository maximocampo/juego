var canvas = document.getElementById('main-game');
var ctx = canvas.getContext('2d')
var images =['assets/player/running.png','assets/player/runningp2.png']

var red = 255
var green;
var redDir = true;
var color = 'rgb('+red+green+',145)'

//controles

var run = false


var background = new Background();
var player = new Player(images[0]);
var player2 = new Player(images[1]);
var blocks = [];
var structures = [];
var interval;
var frames = 0;

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
}

function generateBlocks(){
  if(!(frames % 32 === 0)) return
  var randomY = Math.floor(Math.random()*300)+300
  var block = new Block(null,canvas.height - 32)
  blocks.push(block)
}

function generateStructures(){
  if(!(frames % 320 === 0)) return
  var randomStructure = Math.floor(Math.random()*3)
  var structure = new Structure()
  structures.push(structure.structureSelector[randomStructure])
}

// function generateRandomBlocks(){
//   if(!(frames % 32 === 0)) return
//   var randomY = Math.floor(Math.random()*300)+236
//   var block = new Block(randomY)
//   blocks.push(block)
// }



function drawBlocks(){
  blocks.forEach(function(block){
    block.draw()
  })
    structures.forEach(function(st){
      st.forEach(function(block){
        block.draw()
      });
    })
  
}
function deleteBlocks(){
  blocks.forEach(function(block){
    if(block.x < -32){
      blocks.shift(block)
    }
  })
  structures.forEach(function(st){
    st.forEach(function(block){
        if(block.x < -300){
          st.shift(block)
        }
      });
  })
}

function checkCollision(){
    blocks.forEach(function(block){
    if(player.isTouching(block))player.y-=5
    if(player2.isTouching(block))player2.y-=5
  });
    structures.forEach(function(st){
      st.forEach(function(block){
        //izquierda
        if(player.isTouching(block) && player.x<block.x)player.x = block.x - player.width
        if(player2.isTouching(block) && player2.x<block.x)player2.x = block.x - player2.width
        //derecha
        if(player.isTouching(block) && player.x+player.width>block.x+block.width)player.x = block.x + block.width
        if(player2.isTouching(block) && player2.x+player2.width>block.x+block.width)player2.x = block.x + block.width

        //top
        if(player.isTouching(block) && player.y<block.y){
          player.y-=5;  
        }
        if(player2.isTouching(block) && player2.y<block.y){
          player2.y-=5;  
        }
        //abajo
        if(player.isTouching(block) && player.y+player.height>block.y+block.height){
          player.y = block.y + block.height
        }
        if(player2.isTouching(block) && player2.y+player2.height>block.y+block.height){
          player2.y = block.y + block.height
        }
    // })
})
})
}
function start(){
  if(interval > 0)return
  interval = setInterval(function(){
    update()
  },1000/60)
}
function pause(){
  clearInterval(interval)
}

function update(){
  changeColor()
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  background.draw();
  generateBlocks();
  // generateRandomBlocks()
  generateStructures();
  drawBlocks();
  deleteBlocks();
  player.runAnimation();
  player2.runAnimation();
  checkCollision()

}

document.getElementById('start').addEventListener('click',start)
addEventListener('keydown', function(e){
  if(e.keyCode === 39) player.moveRight();
  if(e.keyCode === 37) player.moveLeft();
  if(e.keyCode === 38) player.jump()

  if(e.keyCode === 68) player2.moveRight();
  if(e.keyCode === 65) player2.moveLeft();
  if(e.keyCode === 87) player2.jump()
})
 