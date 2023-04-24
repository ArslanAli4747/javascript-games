/** @type {HTMLCanvasElement} */

const c = document.getElementById("canvas")
const cx = c.getContext("2d")
c.width=window.innerWidth;
c.height = window.innerHeight;
const bounding = c.getBoundingClientRect()

class MouseEffect{
    constructor(x,y){
        this.x=x;
        this.y = y;
        this.angle = Math.PI*2;
        this.radius = 5;
        this.minRadius = 3;
        this.MarkForDeletation = false
        this.intervel = 100
        this.timeSinceStart = 0
        // this.color = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')'
        this.color = "blue"
    }
    update(deltatime){
        if(this.radius<=this.minRadius){
            this.MarkForDeletation = true;

        }
        else{
            if(this.timeSinceStart>this.intervel - 20){
                this.radius-=1
                this.timeSinceStart = 0
            }
            else{
                this.timeSinceStart+=deltatime
            }

        }
    }
    draw(){
        cx.save()
        cx.globalAlpha = 1 - 0.9
        cx.fillStyle = this.color
        cx.beginPath();

        cx.arc(this.x,this.y,this.radius,0,this.angle)
        cx.fill()
        cx.restore();

    }
}

let cricles = []

window.addEventListener("mousemove",(e)=>{
// console.log(e);
// console.log(bounding);
const positionX = e.x - bounding.x;
const positionY = e.y - bounding.y;
cricles.push(new MouseEffect(positionX,positionY))
})

let  lasttime = 0;
let deltatime = 0;
let interval = 1000;
let nextCircle = 0;
function animate(timestap){

    cx.clearRect(0,0,c.width,c.height)
    deltatime = timestap - lasttime
    lasttime = timestap
    
    cricles.forEach(e=>{
        e.update(deltatime);
      

    })
    cricles.forEach(E=>{
        E.draw()
    })

    console.log(cricles);
   cricles =  cricles.filter(e=>!e.MarkForDeletation)

// console.log(deltatime);
    requestAnimationFrame(animate)
}

animate(0)