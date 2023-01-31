
const main=document.querySelector(".main")
const score=document.querySelector(".score")
let shooterindex = 217
let goingright = true
let direction = 1
let removedinvaders = []


for(let i=0;i<225;i++){
    const div = document.createElement("div")
    div.classList.add('boxes')
    main.appendChild(div)
}

let invaders=[
    15,16,17,18,19,20,21,22,23,24,25,
    30,31,32,33,34,35,36,37,38,39,40
]
let boxes = Array.from(document.querySelectorAll(".main div"))

function draw(){
    for(let j= 0;j<invaders.length;j++){
   if(!removedinvaders.includes(j)){
    boxes[invaders[j]].classList.add("invader")
   
   }
    }
    
}
function remove(){
    for(let j= 0;j<invaders.length;j++){
        boxes[invaders[j]].classList.remove("invader")
    }
    
}

draw()


boxes[shooterindex].classList.add("shooter")


function moveShooter(e) {
    boxes[shooterindex].classList.remove("shooter")
    switch(e.key){
        case "ArrowLeft":
            if(shooterindex%15!==0){
                console.log("hi");
                shooterindex = shooterindex - 1
            }
            break
        case "ArrowRight":
            if(shooterindex%15<14){
                shooterindex+=1
            }
            break
    }
    boxes[shooterindex].classList.add("shooter")
    

}

document.addEventListener("keydown",moveShooter)


function moveInvaders(){
    remove()
    let leftedge = invaders[0]%15===0
    let rightedge = invaders[invaders.length - 1]%15===14
    if(rightedge && goingright){
        for(let i=0;i<invaders.length;i++){
            invaders[i]+=15+1
            direction=-1

            goingright = false
        }
    }
    if(leftedge && !goingright){
        for(let i=0;i<invaders.length;i++){
            invaders[i]+=15-1
            direction=1

            goingright = true
        }
    }

    for(let i=0;i<invaders.length;i++){
            invaders[i]+=direction
        }  
    
    draw()
    
    for(let i=0;i<invaders.length;i++){
        
        if(invaders[i]>boxes.length-5){
            clearInterval(invaderid)
            alert("game over")
                
        }
    }
    if(boxes[shooterindex].classList.contains("invader","shooter")){
        clearInterval(invaderid)
        alert("game over")
    }
    
}


let invaderid = setInterval(moveInvaders,100)

function shoot(e){

    let laserid
    let laserindex = shooterindex
    function movelaser() {
        if (laserindex<0){
            return
        }
        boxes[laserindex].classList.remove("laser")
        laserindex-=15
        if(laserindex>-1){

            boxes[laserindex].classList.add("laser")

        }
  if(laserindex>-1){
    if(boxes[laserindex].classList.contains("invader")){
        boxes[laserindex].classList.remove("invader")
        boxes[laserindex].classList.remove("laser")
        boxes[laserindex].classList.add("boom")
        setTimeout(()=>{
            boxes[laserindex].classList.remove("boom")
       
        },300)
        clearInterval(laserid)  
        const rem = invaders.indexOf(laserindex)
        removedinvaders.push(rem)          
    }
  }
    }

    switch(e.key){
        case "ArrowUp":
          laserid = setInterval(movelaser, 100);
    }


}


document.addEventListener("keydown",shoot)
