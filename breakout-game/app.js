const conn = document.querySelector(".con")

let width = 80
let height = 20
const connwidth = 460
const connheight = 400
let balldiameter = 20
let currentpos = [190,10]
let ballpos = [225,32]
let intervelid = null
let xdirection = 2
let ydirection = 2

class Blocks{
    constructor(xpos,ypos){
        this.bottomleft = [xpos,ypos]
        this.bottomright = [xpos+width,ypos]
        this.topleft = [xpos,ypos+height]
        this.topright = [xpos+width,ypos+height]
    }
}


const blocks = [
    new Blocks(10,360),
    new Blocks(100,360),
    new Blocks(190,360),
    new Blocks(280,360),
    new Blocks(370,360),

    new Blocks(10,330),
    new Blocks(100,330),
    new Blocks(190,330),
    new Blocks(280,330),
    new Blocks(370,330),

    new Blocks(10,300),
    new Blocks(100,300),
    new Blocks(190,300),
    new Blocks(280,300),
    new Blocks(370,300),

    new Blocks(10,270),
    new Blocks(100,270),
    new Blocks(190,270),
    new Blocks(280,270),
    new Blocks(370,270),
        
    new Blocks(10,240),
    new Blocks(100,240),
    new Blocks(190,240),
    new Blocks(280,240),
    new Blocks(370,240),


    new Blocks(10,210),
    new Blocks(100,210),
    new Blocks(190,210),
    new Blocks(280,210),
    new Blocks(370,210),
]

function displaybloack(){

    for(let i=0;i<blocks.length;i++){
        const blck = document.createElement("div")
        blck.classList.add("block")
        blck.style.left = blocks[i].bottomleft[0]+'px'
        blck.style.bottom = blocks[i].bottomleft[1]+'px'
        conn.appendChild(blck)
        
    }
}
displaybloack()

const ball = document.createElement("div")
ball.classList.add("ball")
conn.appendChild(ball)

const user = document.createElement("div")
user.classList.add("user")
conn.appendChild(user)

function drawuser(){
   
    user.style.left = currentpos[0]+'px'
    user.style.bottom = currentpos[1]+'px'
    
}

function drawball(){
  
   
    ball.style.left = ballpos[0]+'px'
    ball.style.bottom = ballpos[1]+'px'
  
}
drawuser()

function moveUser(e) {
    switch (e.key) {
      case 'ArrowLeft':
        if (currentpos[0] > 0) {
            currentpos[0] -= 10
          console.log(currentpos[0] > 0)
          drawuser()   
        }
        break
      case 'ArrowRight':
        if (currentpos[0] < (connwidth - width)) {
            currentpos[0] += 10
          console.log(currentpos[0])
          drawuser()   
        }
        break
    }
  }
  document.addEventListener('keydown', moveUser)



function movetheball(){
    ballpos[0]+=xdirection
    ballpos[1]+=ydirection
    drawball()
    checkCollison()
}

intervelid = setInterval(movetheball,20)


function checkCollison(){
 for (let index = 0; index < blocks.length; index++) {

    if (
        ((ballpos[0]>blocks[index].bottomleft[0]) && 
        (ballpos[0]<blocks[index].bottomright[0]) )&&
        ((ballpos[1]+balldiameter>blocks[index].bottomleft[1]) && 
        (ballpos[1]<blocks[index].topleft[1]) )
        ){
            const allblock = Array.from(document.querySelectorAll(".block"))
            allblock[index].classList.remove('block')
            blocks.splice(index,1)
            changedirection()
            break

        }
    
 } 
     if 
    (
       ( ballpos[0]>currentpos[0] && ballpos[0] < currentpos[0] + width) &&
       (ballpos[1]>currentpos[1] && ballpos [1] < currentpos [1]+height)
    ){
        changedirection()
    } 
 if (ballpos[0] >= (connwidth - balldiameter) || ballpos[0]<= 0 || ballpos[1]>=(connheight-balldiameter)
 ){
    changedirection()

    
}
if( ballpos[1]<=0){ 
alert("game over")
clearInterval(intervelid)
ballpos = [225,32]
drawball()
intervelid = setInterval(movetheball,20)
}
}

function changedirection(){
    if (xdirection === 2 && ydirection === 2){
        ydirection = -2
        return
    }
    if (xdirection === 2 && ydirection === -2){
        xdirection = -2
        return
    }
    if (xdirection === -2 && ydirection === -2){
        ydirection = 2
        return
    }
    if(xdirection === -2 && ydirection === 2){
         xdirection = 2
        return
    }

}