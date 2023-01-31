let currentindex = 76
const squares = document.querySelectorAll(".main div")
const leftlog=document.querySelectorAll(".log-left")
const righttlog=document.querySelectorAll(".log-right")
const carleft=document.querySelectorAll(".car-left")
const carright=document.querySelectorAll(".car-right")
const btn = document.querySelector('.btn')
console.log(squares);
let inervelid
let winlossid

squares[currentindex].classList.add("frog")


function movefrog(e){
    squares[currentindex].classList.remove("frog")
    switch(e.key){
        case "ArrowUp":
          if(currentindex-9>=0){
            currentindex-=9}
            break
        case "ArrowDown":
            if(currentindex + 9 < 81){
            currentindex+=9
            }
            break
        case 'ArrowLeft':
            if(currentindex % 9 !==0){
            currentindex-=1
        }
            break
        case 'ArrowRight':
            if(currentindex%9<9-1){
            currentindex+=1
        }
        break
    
}
console.log(currentindex);
squares[currentindex].classList.add("frog")

}

function moveAuto(){
    console.log("auto");
    leftlog.forEach(element=>moveleft(element))
    righttlog.forEach(element=>moveright(element))
    carleft.forEach(element=>carmoveleft(element))
    carright.forEach(element=>carmoveright(element))
    

}

function moveleft(element){
    console.log("auto2");
    switch (true) {
        case element.classList.contains("l1"):
            element.classList.remove("l1")
            element.classList.add("l2")
            break;
        case element.classList.contains("l2"):
            element.classList.remove("l2")
            element.classList.add("l3")
            break;
        case element.classList.contains("l3"):
            element.classList.remove("l3")
            element.classList.add("l4")
            break;
        case element.classList.contains("l4"):
            element.classList.remove("l4")
            element.classList.add("l5")
            break;
        case element.classList.contains("l5"):
            element.classList.remove("l5")
            element.classList.add("l1")
            break;
                            
        default:
            break;
    }
}

function moveright(element){
    switch (true) {
        case element.classList.contains("l1"):
            element.classList.remove("l1")
            element.classList.add("l5")
            break;
        case element.classList.contains("l2"):
            element.classList.remove("l2")
            element.classList.add("l1")
            break;
        case element.classList.contains("l3"):
            element.classList.remove("l3")
            element.classList.add("l2")
            break;
        case element.classList.contains("l4"):
            element.classList.remove("l4")
            element.classList.add("l3")
            break;
        case element.classList.contains("l5"):
            element.classList.remove("l5")
            element.classList.add("l4")
            break;
                            
        default:
            break;
    }
}

function carmoveleft(element){
    switch (true) {
        case element.classList.contains("c1"):
            element.classList.remove("c1")
            element.classList.add("c2")
            break;
        case element.classList.contains("c2"):
            element.classList.remove("c2")
            element.classList.add("c3")
            break;
        case element.classList.contains("c3"):
            element.classList.remove("c3")
            element.classList.add("c1")
            break;

        default:
            break;
    }
}

function carmoveright(element){
    switch (true) {
        case element.classList.contains("c1"):
            element.classList.remove("c1")
            element.classList.add("c3")
            break;
        case element.classList.contains("c2"):
            element.classList.remove("c2")
            element.classList.add("c1")
            break;
        case element.classList.contains("c3"):
            element.classList.remove("c3")
            element.classList.add("c2")
            break;

        default:
            break;
    }
}

function win(){
    if(squares[currentindex].classList.contains("end")){
        
        clearInterval(inervelid)
        clearInterval(winlossid)
        document.removeEventListener("keydown",movefrog)
        alert("you win")
        
        squares[currentindex].classList.remove('frog')
        currentindex = 76
        squares[currentindex].classList.add("frog")

    }
}
function loss(){
    if(
        squares[currentindex].classList.contains("c1")||
        squares[currentindex].classList.contains("l4")||
        squares[currentindex].classList.contains("l5")
    ){
        clearInterval(inervelid)
        clearInterval(winlossid)
        document.removeEventListener("keydown",movefrog)

        alert("you lose")
        squares[currentindex].classList.remove('frog')
        currentindex = 76
        squares[currentindex].classList.add("frog")

    }
}

function checkforwinloss(){
    win()
    loss()
}
btn.addEventListener('click',()=>{
    if(inervelid){
        clearInterval(inervelid)
        clearInterval(winlossid)
        inervelid = null
        winlossid = null
        
        document.removeEventListener("keydown",movefrog)
        
    }
    else{
        inervelid = setInterval(moveAuto,1000)
        winlossid = setInterval(checkforwinloss,50)
        document.addEventListener('keydown', movefrog)
    }
})

