// define all need elements
const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeLeft = document.querySelector('#time')
const board = document.querySelector('#board')
// define colors, default time and score
const colors = ['#e23737', '#cecb10', '#46ce10', '#102dce', '#810b7b']
let time = 0
let score = 0

// add listener for first button "Начать игру"
startButton.addEventListener('click', (event) => {
    // every step of the app is divided for screens
    // screen first is only visible first, that we add class that get's screen margin top -100vh
    screens[0].classList.add('up')
    // prevent all default events if exists on button
    event.preventDefault()
})

// add listener for board
board.addEventListener('click', (event) => {
    // board spawn circles in item every time user click on circle and clicked one gone, if we click on circle in board we get our score increase (hoisting)
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

// add listener for timeList, if we click on button in the timeList, we get its attribute 'data-time' and puts it in time variable, than we start game
timeList.addEventListener('click', (event) => {

    if (event.target.classList.contains('time-btn')) {
        time = +event.target.getAttribute('data-time')
        startGame()
    }
})

// define function startGame()
function startGame() {
    // get timeList class up, margin top -100
    screens[1].classList.add('up')
    // create first circle
    createRandomCircle()
    // starts game, and starts decreaseTime function for 1 second interval 
    setInterval(decreasesTime, 1000)
    setTime(time)
}

// decreasesTime function, gets time decrease and finish game if the time is over
function decreasesTime() {
    if (time === 0) finishGame()
    else {
        let current = --time
        if (current < 10) current = `0${current}`
        setTime(current)

    }
}

// show the time over the board
function setTime(value) {
    timeLeft.innerHTML = `00:${value}`
}

// create random circle function
function createRandomCircle() {
    // define size of the circle
    const size = randomNumber(8, 60)
    // defined size of the board
    const { height, width } = board.getBoundingClientRect()
    // get random positionX and positionY from 0 to width and height
    const positionX = randomNumber(0, width - size)
    const positionY = randomNumber(0, height - size)
    // create circle
    const circle = document.createElement('div')
    // in just created element define styles
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${positionX}px`
    circle.style.top = `${positionY}px`
    setColor(circle)
    // put circle element in board
    board.append(circle)
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function finishGame() {
    // when the game is over, we turn board in flex and replace all elements in the board by finish message and restart button
    board.style.display = 'flex'
    board.style.flexDirection = 'column'
    board.innerHTML = `<h2>Ваш счет: <span class="primary">${score}</span></h2>
    <button class='restart-btn' id='restart'>Начать заново</button>`
    timeLeft.parentNode.classList.add('hide')
    const restartButton = document.querySelector('#restart')
    restartButton.addEventListener('click', () => { document.location.reload() })
}

// generate random color function
const setColor = (element) => {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

const getRandomColor = () => {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}