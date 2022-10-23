// import { createAll } from "./app.js";
import * as app from "./app.js"

let currentSize = app.k;
let numberOfElements = app.k ** 2
// перемешиваем исходный массив
let array = app.arr
// app.shuffle(app.arr)
// создаем базовую разметку, без игрового поля
app.createMarkup()
// создаем игровое поле, где app.k - размер матрицы kxk
app.createField(array, currentSize)
// находим созданное игровое поле
let containerNode = document.querySelector(`.fifteen`);
//находим все кнопки и делаем из них массив
let itemNodes = Array.from(containerNode.querySelectorAll(`.item`))
let startTime = false
let minute = document.querySelector(`.min`)
let seconds = document.querySelector(`.sec`)
let minVal = 0
let secVal = 0


let interval;



function createAll(containerNode, itemNodes) {
let resultBtn = document.querySelector("body > div > div.buttons__container > button:nth-child(4)")
let stopBtn = document.querySelector("body > div > div.buttons__container > button:nth-child(2)");

stopBtn.addEventListener(`click`, ()=> {
    resetValues()
    startShuffle()
})

let soundOn = false
const inputElement = document.getElementById(`checkbox`)

inputElement.addEventListener(`click`, function() {
    this.checked ? soundOn = true : soundOn = false
    console.log(soundOn);
})

    function startTimer() {
        secVal++
        if (secVal < 9) {
            seconds.innerText = `0${secVal}`
        }
        if (secVal > 9) {
            seconds.innerText = secVal
        }
        if (secVal > 59) {
            minVal++;
            minute.innerText = `0${minVal}`
            secVal = 0
            seconds.innerText = `0${secVal}`
        }
    }
    function start() {
        clearInterval(interval);
        interval = (setInterval(startTimer, 1000))
    }
// создаем счетчик
let countSpan = document.querySelector(`.moves`);

let count = 0;
countSpan.innerHTML = `Moves: ${count}`

function startShuffle() {
    count = 0;
    countSpan.innerHTML = `Moves: ${count}`
    const flatMatrix = matrix.flat();
    const shuffledArr = shuffle(flatMatrix)
    matrix = getMatrix(shuffledArr, currentSize);
    setPositionItems(matrix, itemNodes)
    resetValues()
}
//! 1. Position
itemNodes[numberOfElements - 1].style.display = `none`;

let matrix = getMatrix(
    itemNodes.map(el => Number(el.dataset.matrixId)), 
    currentSize
    );

startShuffle()

function getMatrix(arr, k) {
    const matrix = createMatrix(k)
    let y = 0, x = 0;
    for (let i = 0; i < arr.length; i++) {
        if (x >= k) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i]
        x++
    }
    return matrix
}
// функция создания матрицы, в зависимости от app.k
function createMatrix(k) {
    let result = []
    for (let i = 0; i < k; i++) {
        const tesArr = new Array(k);
        result.push(tesArr)
    }
    return result;
}

function setPositionItems(matrix, nodes) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = nodes[value - 1]
            setNodeStyles(node, x , y)
        }
    }
}
// функция установки стилей для каждой ячейки по умолчанию
function setNodeStyles(node, x , y) {
    if (!node) {
        throw new Error(`Ошибка`)
    }
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

//! 2. Shuffle
let shuffleBtn = document.querySelector("body > div > div.buttons__container > button:nth-child(1)")

shuffleBtn.addEventListener(`click`, startShuffle)

function shuffle(arr) {
    return arr
    .map(value => ({value, sort : Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({value}) => value)
}

//! 3. Изменение позиции по клику
const blankNumber = numberOfElements
function changePosition(e) {
    
}

containerNode.addEventListener(`click`, (e) => {
    if (!startTime) {
        start()
        startTime = true
    }
    const buttonNode = e.target.closest('button');
    if (!buttonNode) {
        return
    }
    const buttonNumber = Number(buttonNode.dataset.matrixId)
    // находим координаты кнопки, по которой совершается клик
    const buttonCoords = findCoordsByNumber(buttonNumber, matrix)
    // находим координаты пустого элемента
    const blankCoords = findCoordsByNumber(blankNumber, matrix)
    // Проверка валидности для перемещения
    const isValid = isValidForSwap(buttonCoords, blankCoords);
    if (isValid) {
        if (soundOn) {
            sound()
        }
        swap(blankCoords, buttonCoords, matrix);
        setPositionItems(matrix, itemNodes)
        count++
        countSpan.innerHTML = `Moves: ${count}`
    }
    // console.log(isValid);
})
function findCoordsByNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number) {
                return {x,y}
            }
        }
    }
    return null
}
function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x)
    const diffY = Math.abs(coords1.y - coords2.y)
    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

function swap(coords1, coords2, matrix) {
    const coords1Number = matrix[coords1.y][coords1.x]
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Number;

    let result = isWon(matrix, array) 
    if (result) {
        addWonClass()
    } else {
        // console.log(false);
    }
}

//! 4. change position by keyUP
window.addEventListener(`keydown`, (e) => {
    if (!startTime && e.key !== `Escape`) {
        start()
        startTime = true
    }
    if (!e.key.includes(`Arrow`)) {
        return
    }
    const blankCoords = findCoordsByNumber(blankNumber, matrix);
    const buttonCoords = {
        x: blankCoords.x,
        y: blankCoords.y

    }
    const direction = e.key.split(`Arrow`)[1].toLowerCase();
    const maxIndexMatrix = matrix.length;

    switch (direction) {
        case `up`:
            buttonCoords.y +=1
            break;
        case `down`:
            buttonCoords.y -=1
            break;
        case `left`:
            buttonCoords.x +=1
            break;
        case `right`:
            buttonCoords.x -=1
            break;
    }

    if (buttonCoords.y >= maxIndexMatrix || buttonCoords.y < 0 || buttonCoords.x >= maxIndexMatrix || buttonCoords.x < 0) {
        return
    }

    swap(blankCoords, buttonCoords, matrix);
    setPositionItems(matrix, itemNodes)
    count++
    countSpan.innerHTML = `Moves: ${count}`
    if (soundOn) {
        sound()
    }
    // console.log(direction);
})


//! 5. Show won
// функция isWon включена в функцию swap 
function isWon(matrix, array) {
    const flatMatrix = matrix.flat()
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== flatMatrix[i]) {
            console.log(`not won`);
            return false
        } 
    }
    console.log(`won`);
    return true
}    
function addWonClass() {
    setTimeout(() => {
        let result = 'Movies:' + count + '; Time:' + minVal + ' minute ' + secVal + ' seconds'  
        // console.log(result);
        resetValues()
        addWonModal(result)
        alert(`won`)
        startShuffle()
        clearInterval(interval);
    }, 200);
}
    function resetValues() {
        clearInterval(interval);
        count = 0
        minVal = 0
        secVal = 0;
        countSpan.innerHTML = `Moves: ${count}`
        minute.innerHTML = `00`
        seconds.innerHTML = `00`
        startTime = false
    }

    function sound() {
        let audio = new Audio();
        audio.src = `sound.mp3`;
        audio.autoplay = true
    }
    // sound()
    function addWonModal(result) {
        const modal = document.querySelector(`.modal`)
        modal.classList.add(`modal__active`)
        const modalContent = document.querySelector(`.modal__content`)
        modalContent.classList.add(`active`)
        window.addEventListener(`keydown`, (e)=> {
            if (e.key === `Escape`) {
                modal.classList.remove(`modal__active`)
                modalContent.classList.remove(`active`)
            }
        })
        modalContent.innerHTML = result
    }

    resultBtn.addEventListener(`click`, ()=> {
        addWonModal()
    })
}

createAll(containerNode, itemNodes)
//! Функционал выбора размера

let links = document.querySelectorAll(`.size__link`)
let currentSizeView = document.querySelector("body > div > div.frame__container > div.current__size > p > span")

links.forEach(el => {
    el.addEventListener(`click`, (e) => {
        e.preventDefault()
        for (let link of links) {
            link.classList.remove(`active`)
        }
        el.classList.add(`active`)

        currentSize = el.dataset.matrixId 
        numberOfElements = currentSize ** 2

        let container = document.querySelector(`.fifteen`);
        // console.log(currentSize);
        // стираем игровое поле
        app.destroyField(container)
        // создаем новый массив с новым размером
        array = app.createArray(currentSize)
        // на его основе снова создаем поле
        app.createField(array, currentSize)
        let containerNode = document.querySelector(`.fifteen`);
        let itemNodes = Array.from(containerNode.querySelectorAll(`.item`))
        
        createAll(containerNode, itemNodes)
      })
})

