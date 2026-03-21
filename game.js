const game = document.getElementById("game")
const scoreText = document.getElementById("score")
const timeText = document.getElementById("time")
const bgm = document.getElementById("bgm")

const startBtn = document.getElementById("startBtn")
const bgmBtn = document.getElementById("bgmBtn")

let score = 0
let time = 30
let timer
let moles = []
let gameRunning = false

// ボード作成
function createBoard(){

game.innerHTML=""
moles=[]

for(let i=0;i<9;i++){

const hole=document.createElement("div")
hole.className="hole"

const mole=document.createElement("div")
mole.className="mole"

hole.appendChild(mole)
game.appendChild(hole)

let hit=false

mole.addEventListener("pointerdown",()=>{

if(!gameRunning) return
if(!mole.classList.contains("up")) return
if(hit) return

hit=true

mole.classList.remove("up")
mole.classList.add("hit")

if(mole.dataset.type==="bomb"){
score-=5
}else{
score+=1
}

scoreText.textContent=score

setTimeout(()=>{
mole.classList.remove("hit")
hit=false
},200)

})

moles.push(mole)

}

}

// モグラ出現
function showMole(){

const index=Math.floor(Math.random()*moles.length)
const mole=moles[index]

if(mole.classList.contains("up")) return

if(Math.random()<0.2){
mole.textContent="💣"
mole.dataset.type="bomb"
}else{
mole.textContent="🐹"
mole.dataset.type="mole"
}

mole.classList.add("up")

setTimeout(()=>{
mole.classList.remove("up")
},800)

}

// ゲーム開始
function startGame(){

gameRunning = true

score=0
time=30

scoreText.textContent=score
timeText.textContent=time

createBoard()

// ★BGM（スマホ対応）
bgm.currentTime = 0
bgm.volume = 0.5

bgm.play().catch(()=>{
console.log("BGM再生ブロック")
})

clearInterval(timer)

timer=setInterval(()=>{

time--
timeText.textContent=time

showMole()

if(time<=0){
clearInterval(timer)
gameRunning = false
bgm.pause()
bgm.currentTime=0
alert("ゲーム終了！ スコア:"+score)
}

},700)

}

// BGM切り替え
function toggleBGM(){

if(bgm.paused){
bgm.play()
}else{
bgm.pause()
}

}

// イベント登録
startBtn.addEventListener("click", startGame)
bgmBtn.addEventListener("click", toggleBGM)

// 初期化
createBoard()
