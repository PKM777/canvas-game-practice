import './style.css'

window.addEventListener('load', loadApp())

function loadApp(){
  const canvas1 = document.getElementById('smallcan')
  const ctx = canvas1.getContext('2d')
 
 
  canvas1.width = window.innerWidth
  canvas1.height = window.innerHeight/1.25

  class Inputs{
    constructor(game){
      this.game = game
      window.addEventListener('keydown', (e)=>{
        this.game.lastKey = `P` +  e.key
        // console.log(this.game.lastKey)
      })
      window.addEventListener('keyup', (e)=>{
        this.game.lastKey = `R` +  e.key
        // console.log(this.game.key)
      })
    }
     
     
  }

  

  class FirstChar{
    constructor(game){
      this.game = game
      this.spWidth = 200
      this.spHeight = 200
      this.width = this.spWidth
      this.height = this.spHeight
      this.frameX = 0
      this.frameY = 0
      this.maxFrame =30
      this.x = this.game.width/2 - this.width/2
      this.y = this.game.height/2 - this.height/2
      this.dirX = 0
      this.dirY = 0
      this.maxSpeed = 5
      this.image = document.getElementById('thebear')
      this.fps = 30
      this.frameInterval = 1000/this.fps
      this.frameTimer = 0
    }
    draw(context){
      // context.fillRect(this.x, this.y, this.width, this.height)
      context.drawImage(this.image,this.frameX*this.spWidth,this.frameY*this.spHeight,this.spWidth, this.spHeight, this.x, this.y, this.width, this.height)
    }

    setSpeed(speedx,speedy){
      this.dirX = speedx
      this.dirY = speedy
    }

    update(deltatime){

      if(this.game.lastKey == 'PArrowLeft'){
        this.setSpeed(-this.maxSpeed,0)
        this.frameY = 3
        }else if(this.game.lastKey == 'RArrowLeft' && this.dirX < 0){
        this.setSpeed(0,0)
        this.frameY = 2
        }else if(this.game.lastKey == 'PArrowRight'){
         this.setSpeed(this.maxSpeed,0)
         this.frameY = 5
        }else if(this.game.lastKey == 'RArrowRight' && this.dirX > 0){
        this.setSpeed(0,0)
        this.frameY = 4
        }else if(this.game.lastKey == 'PArrowUp' ){
        this.setSpeed(0,-this.maxSpeed*0.6)
        this.frameY = 7
        }else if(this.game.lastKey == 'RArrowUp' && this.dirY < 0){
        this.setSpeed(0,0)
        this.frameY = 6
        }else if(this.game.lastKey == 'RArrowDown' && this.dirY > 0){
        this.frameY = 0
        this.setSpeed(0,0)
        }else if(this.game.lastKey == 'PArrowDown'){
        this.setSpeed(0,this.maxSpeed*0.6)
        this.frameY = 1
        }else{
        this.setSpeed(0,0)
        }
      this.x += this.dirX
      this.y += this.dirY
     //  x boundary
      if(this.x<0){this.x=0
      }else if(this.x> this.game.width-this.width){
        this.x = this.game.width-this.width
      }
      // y boundary
      if(this.y < 0){this.y = 0
      }else if(this.y> this.game.height-this.height){
        this.y = this.game.height-this.height
      }

      if(this.frameTimer > this.frameInterval){
        if(this.frameX < this.maxFrame){
          this.frameX++
        }else{
          this.frameX = 0
        }
        this.frameTimer = 0
      }else{
        this.frameTimer += deltatime
      }

      
    }
  }

  class SecondChar{
    constructor(game){
      this.game = game
      this.spriteWidth = 385/4
      this.spriteHeight = 101
      this.width = this.spriteWidth
      this.height = this.spriteHeight
      this.x = this.game.width-100
      this.y = 10
      this.maxFrame = 3
      this.frameX = 0
      this.image = document.getElementById('theant')
      this.fps = 30
      this.frameInterval = 1000/this.fps
      this.frameTimer = 0
    }

    draw(context){
       context.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x, this.y, this.width, this.height)
    }

    update(deltatime){
      this.x-=2
      if(this.x<0){
        this.x = this.game.width
      }
      if(this.frameTimer > this.frameInterval){
      if(this.frameX < this.maxFrame){
        this.frameX++
      }else{
        this.frameX = 0
      }
      this.frameTimer = 0
    
    }else{
        this.frameTimer += deltatime
      }
    }
  }

  class Game{
    constructor(width, height){
      this.width = width
      this.height = height
      this.lastKey = undefined
      this.input = new Inputs(this)
      this.obj1 = new FirstChar(this)
      this.obj2 = new SecondChar(this)
    }

    render(context, deltatime){

      this.obj1.draw(context)
      this.obj2.draw(context)
      this.obj1.update(deltatime)
      this.obj2.update(deltatime)
    }

    
  }

  const game = new Game(canvas1.width, canvas1.height)

  let lastTime = 0
  function animation(timestamp){
    const deltatime = timestamp - lastTime
    lastTime = timestamp
    ctx.clearRect(0, 0, canvas1.width, canvas1.height)
    game.render(ctx, deltatime)
    requestAnimationFrame(animation)
  }
  animation(0)
  
}



