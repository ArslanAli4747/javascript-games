/**@type {HTMLCanvasElement}*/

const c = document.getElementById("mycanvas");
const cx = c.getContext("2d");
const canvaPosition  = c.getBoundingClientRect();

// c.width = window.innerWidth - 50;
// c.height = window.innerHeight - 50;
c.width = 500;
c.height = 700


const expoltion = []


const boom = new Image();
boom.src = "./boom.png"

class Explosion{
    constructor(x,y,speed){
    
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x 
        
        this.y = y 
        this.frame = 0;
        this.speed = speed
        this.angle = Math.random() * 6.2
    }
    update(){
        this.speed++
        if (this.speed % 25 === 0){
            this.frame++;
        }
       
    }
    draw(){
        cx.save()
        cx.translate(this.x,this.y)
        cx.rotate(this.angle)
        cx.drawImage(boom,this.spriteWidth*this.frame,0,this.spriteWidth,this.spriteHeight,0-this.width/2,0-this.height/2,this.width,this.height)
        cx.restore()
    }
}


let s = 0
function createAnimation(e){
    console.log(canvaPosition);
    // console.log(e);
    const positionX =e.x - canvaPosition.left;
    const positionY =e.y - canvaPosition.top;
    expoltion.push(new Explosion(positionX,positionY,s))
    s = s+10
    // cx.fillRect(e.x- canvaPosition.x - 25 , e.y - canvaPosition.y - 25 , 50, 50)
// console.log(expoltion)
}
window.addEventListener("click",(e)=>{
    createAnimation(e)
})
window.addEventListener("mousemove",(e)=>{
    createAnimation(e)
})
function animate(){
    cx.clearRect(0,0,c.width,c.height)
    for(var i=0;i<expoltion.length;i++){
        expoltion[i].update();
        expoltion[i].draw();
        if(expoltion[i].frame>5){
            expoltion.splice(i,1)
            i--;
        }

    }
    requestAnimationFrame(animate)
}
animate()