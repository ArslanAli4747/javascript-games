const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

let cardname = []
let cardid = []
let result = []
cardArray.sort(()=>0.5 - Math.random())

const grid = document.querySelector(".gameField")
const score = document.querySelector(".score")
for(var i=0;i<cardArray.length;i++){
    const cardimage = document.createElement("img")
    cardimage.setAttribute("src","./images/blank.png")
    cardimage.setAttribute("data-id",i)
    cardimage.addEventListener("click",flipCard)
    grid.appendChild(cardimage)
    
}

function checkMatch(){
    const cards = document.querySelectorAll('img')
    const one = cardid[0]
    const two = cardid[1]

    if (one === two){
        cards[one].setAttribute('src',"./images/blank.png")
        cards[two].setAttribute('src',"./images/blank.png")
        alert("you have clicked the same image")
    }
    else if(cardname[0] === cardname[1]){
        alert("you found a match")
        cards[one].setAttribute('src',"/images/white.png")
        cards[two].setAttribute('src',"/images/white.png")
        cards[one].removeEventListener("click",flipCard)
        cards[two].removeEventListener("click",flipCard)
        result.push(cardname)
    }
    else{
        cards[one].setAttribute("src","/images/blank.png")
        cards[two].setAttribute("src","/images/blank.png")
        alert('Sorry, try again')
    }
    cardname = []
    cardid = []
    score.textContent = result.length
    if(result.length === cardArray.length/2){
        score.textContent = 'Congratulations! You found them all!'
    }
}

function flipCard(){
const cid = this.getAttribute("data-id")
cardname.push(cardArray[cid].name)
cardid.push(cid)
this.setAttribute("src",cardArray[cid].img)
if (cardname.length === 2){
    setTimeout(checkMatch,500)
}
}
