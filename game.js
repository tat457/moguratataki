const game = document.getElementById("game")
const scoreDisplay = document.getElementById("score")
const timeDisplay = document.getElementById("time")

const hitSound = document.getElementById("hitSound")
const bombSound = document.getElementById("bombSound")

let score = 0
let time = 30
let timer
let gameRunning = false

const holes = []
const moles = []

function createBoard(){

game.innerHTML = ""
holes.length = 0
moles.length = 0

for(let i=0;i<9;i++){

const hole = document.createElement("div")
hole.classList.add("hole")

const mole = document.createElement("img")
mole.classList.add("mole")

hole.appendChild(mole)
game.appendChild(hole)

holes.push(hole)
moles.push(mole)

let alreadyHit = false

mole.addEventListener("pointerdown", e => {

if(!gameRunning) return
if(!mole.classList.contains("up")) return
if(alreadyHit) return

alreadyHit = true
mole.classList.remove("up")
mole.classList.add("hit")

if(mole.dataset.type === "bomb"){
score -= 5
bombSound.currentTime = 0
bombSound.play()
}else{
score += 1
hitSound.currentTime = 0
hitSound.play()
}

scoreDisplay.textContent = score

setTimeout(()=>{
mole.classList.remove("hit")
alreadyHit = false
},200)

})

}

}

function showMole(){

const index = Math.floor(Math.random()*moles.length)
const mole = moles[index]

if(mole.classList.contains("up")) return

const bombChance = Math.random()

if(bombChance < 0.2){

mole.src = "bomb.png"
mole.dataset.type = "bomb"

}else{

mole.src = "mole.png"
mole.dataset.type = "mole"

}

mole.classList.add("up")

setTimeout(()=>{
mole.classList.remove("up")
},800)

}

function startGame(){

score=0
time=30

scoreText.textContent=score
timeText.textContent=time

createBoard()

// ★ここが重要
bgm.currentTime = 0
bgm.volume = 0.5

bgm.play().then(()=>{
bgmPlaying = true
}).catch(()=>{
console.log("再生ブロックされた")
})

clearInterval(timer)

timer=setInterval(()=>{

time--
timeText.textContent=time

showMole()

if(time<=0){
clearInterval(timer)
bgm.pause()
bgm.currentTime=0
alert("ゲーム終了！ スコア:"+score)
}

},700)

}

createBoard()
