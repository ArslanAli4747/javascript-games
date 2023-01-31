let score = document.querySelector(".score")
let timeleft = document.querySelector(".time-left")
let squre = document.querySelectorAll(".sq")

console.log(squre);
let result = 0
let intervelId
let hit 
let timere = 60

function randomGen(){

    squre.forEach(element => {
        element.classList.remove("mole")
    });
    const random = squre[ Math.floor(Math.random()*9)]
    console.log(random);
    random.classList.add("mole")
    hit = random.id
    
}

squre.forEach(element=>{

    element.addEventListener("click",()=>{
        if(element.id == hit){
            result++
            hit = null
            score.textContent = result
        }
    })
})


function moveImage(){
    intervelId = setInterval(randomGen,1000)
}
moveImage()

function timer(){
    timere--
    timeleft.textContent = timere
    if (timere === 0){
        alert(`timer over your score is : ${result}`)
        clearInterval(intervelId)
        clearInterval(intervelId2)
    }
}

let intervelId2 = setInterval(timer,1000)
