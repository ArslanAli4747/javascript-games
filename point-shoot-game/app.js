/** @type {HTMLCanvasElement} */

const c  = document.getElementById("mycanvas");
const cx = c.getContext("2d")
c.width = window.innerWidth;
c.height = window.innerHeight;

const cbounding = c.getBoundingClientRect();
console.log(cbounding);

const c2  = document.getElementById("ccanvas");
const cx2 = c2.getContext("2d")
c2.width = window.innerWidth;
c2.height = window.innerHeight;

let revens = []

const revenImg = new Image();
revenImg.src = "./raven.png";
let lasttime = 0
let timetonextraven = 0;
let ravenintervel = 1000;
let score = 0;
cx.font = "50px impact";

const boom = new Image()
boom.src = "./boom.png"
let explotion = []
let particals = []
class Explotions{
    constructor(x,y,size){
        this.spriteWidth = 200;
        this.SpriteHeight = 179;
        this.size = size;
        this.x= x;
        this.y = y;
        this.frame = 0;
        this.timeSinceLastFrame = 0;
        this.frameIntervel = 200;
        this.MarkedForDeletion = false
        this.audio = new Audio()
        this.audio.src = "./audio.wav"
    }
    update(deltatime){
        if (this.frame===0) this.audio.play()
        this.timeSinceLastFrame+=deltatime;
        if(this.timeSinceLastFrame>this.frameIntervel){
            this.frame++
            if (this.frame > 5) this.MarkedForDeletion=true
        }
    }
    draw(){
        cx.drawImage(boom,this.spriteWidth*this.frame,0,this.spriteWidth,this.SpriteHeight,this.x,this.y-this.size/8,this.size,this.size)
    }
}

class Reven{
    constructor(){
        this.frame = 0
        this.spriteWidth = 270;
        this.SpriteHeight = 194;
        this.size = Math.random()*0.6+0.4;
        this.width = this.spriteWidth*this.size;
        this.height = this.SpriteHeight*this.size ;
        this.cx2width = 200;
        this.cx2height = 200;
        this.x =c.width;
        this.y = Math.random()*(c.height-this.height);
        this.directionX = Math.random()*5 + 3;
        this.directionY = Math.random()*5+3;
        this.speed = 0;
        this.MarkedForDeletion = false
        this.flapIntervel = 100
        this.timeSinceFlap = Math.random()*50+50
        this.randomColor = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]
        this.color = 'rgb('+this.randomColor[0]+','+this.randomColor[1]+','+this.randomColor[2]+')'
        this.hasTail = Math.random()>0.6;
    }
    update(deltatime){
    this.x-=this.directionX
    if(this.y<0 || this.y>c.height-this.height/2){
        this.directionY =this.directionY *(-1)
    }
     this.y +=this.directionY
     
    if (this.x<0-this.width)this.MarkedForDeletion=true;
    
    this.timeSinceFlap+=deltatime;
    
    if(this.timeSinceFlap>this.flapIntervel){
        if(this.frame>4)this.frame = 0;
        else this.frame++;
        this.timeSinceFlap=0
        if(this.hasTail){
            for(var j=0;j<3;j++){
                particals.push(new Partical(this.x,this.y,this.width,this.color))
        
            }
        }
    }
    this.speed++
    }
    draw(){
        cx2.fillStyle = this.color
        cx2.fillRect(this.x,this.y,this.cx2width,this.cx2height)
        cx.drawImage(revenImg,this.spriteWidth*this.frame,0,this.spriteWidth,this.SpriteHeight,this.x,this.y,this.width,this.height)
    }
}

class Partical{
    constructor(x,y,size,color){
      
        this.size = size;
        this.x = x + this.size/2+Math.random()*100 - 50;
        this.y = y + this.size/3 +Math.random()*100 - 50;
        this.color = color;
        this.maxRadius = Math.random()*20+35
        this.radius = Math.random()* this.size/10;
        this.MarkedForDeletion = false;
        this.speedX = Math.random()*1 +0.5;

    }
    update(){
        this.x +=this.speedX;
        this.radius+=0.5;
        if(this.radius>this.maxRadius - 5)this.MarkedForDeletion=true;
    }
    draw(){
        cx.save()
        cx.globalAlpha = 1 - this.radius/this.maxRadius
        cx.beginPath();
        cx.fillStyle = this.color;
        cx.arc(this.x,this.y,this.radius,0,Math.PI*2)
        cx.fill();
        cx.restore()

    }

}

function drawScore(){
    cx.fillStyle="black";
    cx.fillText("Score :  "+score,400,70)
    cx.fillStyle="blue";
    cx.fillText("Score :  "+score,403,73)
}

window.addEventListener("click",(e)=>{
    
    const imgdetect = cx2.getImageData(e.x,e.y,1,1)
    console.log(e.y,e.x);
    const pcolor = imgdetect.data;
    revens.forEach(r=>{
        if(r.randomColor[0] === pcolor[0] &&
             r.randomColor[1] === pcolor[1] && 
            r.randomColor[2] === pcolor[2]
            
            ){
                r.MarkedForDeletion = true;
                score++
                explotion.push(new Explotions(r.x,r.y,r.width))
            }
    })
})

function animate(timestamp){
    cx.clearRect(0,0,c.width,c.height);
    cx2.clearRect(0,0,c2.width,c2.height)
    let deltatime = timestamp - lasttime;
    lasttime = timestamp;
    timetonextraven+=deltatime
    if(timetonextraven > ravenintervel){
        revens.push(new Reven())
        timetonextraven = 0
        revens.sort((a,b)=>{
            return a.width - b.width
        })
    };
    [...particals,...revens,...explotion].forEach(r=>{
        r.update(deltatime)
        r.draw()
    })
    drawScore()
    revens = revens.filter(r=>!r.MarkedForDeletion);
    explotion = explotion.filter(e=>!e.MarkedForDeletion);
    particals = particals.filter(p=>!p.MarkedForDeletion);
    console.log(particals);
    requestAnimationFrame(animate)
}
 animate(0)
