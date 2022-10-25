alert(`Привет!
Расскажу кратко про работу приложения:
1. Пятнахи можно двигать по клику, при помощи стрелок на клавиатуре (не NumPad) и перетаскиванием/
2. Чтобы игра началась - необходимо кликнуть по полю или нажать любую клавишу или перетащить эл-нт.Тогда пойдет счёт времени.
3. При выйгрыше появляется модалка, в которой предлагается ввести Твое имя и сохранить результат.
4. Если нажать escape или кнопку закрытия модалки - результат не сохраняется, окно просто закрывается
5. реализованы размеры поля от 3х3 до 8х8
5. Дизайн отзывчивый, но со стилями я не заморачивался, в ТЗ это не описано.
6. При нажатии на кнопку shuffle происходит перемешивание элементов и сброс счётчиков
т.е. игра начинается заново.
7. при нажатии на stop - сбрасываются счётчики времени/ходов но массив не перемешивается (не знаю зачем я так сделал, но в ТЗ про эту кнопку ничего не написано)
8. с кнопками звука думаю всё и так понятно.
9. При нажатии на save - фиксируется расположение элементов и при перезагрузке страницы они расположены в том же порядке 
Я работаю над этим, поэтому если не сложно, пожалуйста не выставляй оценку до вечера среды. К этому времени постараюсь закончить.
Спасибо! И успехов в обучении! 
`)

import * as app from "./app.js"

let currentSize = app.k;

if (localStorage.getItem(`saveCurrentSise`)) {
    currentSize = localStorage.getItem(`saveCurrentSise`)
}

// находим созданное игровое поле
let numberOfElements = app.k ** 2
let array = app.arr

app.createMarkup()
//находим все кнопки и делаем из них массив
app.createField(array, currentSize)
let startTime = false
let minute = document.querySelector(`.min`)
let seconds = document.querySelector(`.sec`)
let minVal = 0
let secVal = 0
let interval;
const MAX_SHUFFLE = 100;
function createAll() {
    let containerNode = document.querySelector(`.fifteen`);
    let itemNodes = Array.from(containerNode.querySelectorAll(`.item`))
    const modalContent = document.querySelector(`.modal__content`)
    const modal = document.querySelector(`.modal`)
    const closeBtn = document.querySelector(`.m-menu`);
    const saveBtn = document.querySelector("body > div > div.buttons__container > button:nth-child(4)")
    let resultBtn = document.querySelector("body > div > div.buttons__container > button:nth-child(3)")
    let stopBtn = document.querySelector("body > div > div.buttons__container > button:nth-child(2)");
    let soundOn = false
    const inputElement = document.getElementById(`checkbox`)
    // создаем счетчик
    let countSpan = document.querySelector(`.moves`);

    stopBtn.addEventListener(`click`, ()=> {
        resetValues()
    })

    inputElement.addEventListener(`click`, function() {
        this.checked ? soundOn = true : soundOn = false
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

let count = 0;
countSpan.innerHTML = `Moves: ${count}`
const blankNumber = numberOfElements


let blockedCoords = null
function randomSwap(matrix) {
    const blankCoords = findCoordsByNumber(blankNumber, matrix);
    const validCoords = findValidCoords({
        blankCoords,
        matrix,
        blockedCoords
    })
    const swapCoords = validCoords[
        Math.floor(Math.random() * validCoords.length)
    ]
    swap(blankCoords, swapCoords, matrix);
    blockedCoords = blankCoords
}

function findValidCoords({blankCoords, matrix, blockedCoords}) {
    const validCoords = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (isValidForSwap({x,y}, blankCoords)) {
                if (!blockedCoords || !(
                    blockedCoords.x == x && blockedCoords.y == y
                )) {
                    validCoords.push({x,y})
                }
            }
        }
    }
    return validCoords
}
function startShuffle() {
    let timer;
    let shuffleCount = 0;
    clearInterval(timer)
    
    if (localStorage.getItem(`saveGame`)) {
        matrix = JSON.parse(localStorage.getItem(`saveGame`))
        setPositionItems(matrix, itemNodes)
    } else {
        if (shuffleCount === 0) {
            timer = setInterval(()=> {
                randomSwap(matrix)
                setPositionItems(matrix, itemNodes)
                shuffleCount++
                if (shuffleCount >= MAX_SHUFFLE) {
                    shuffleCount = 0;
                    clearInterval(timer)
                }
            }, 70)
        }
  
    }
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

shuffleBtn.addEventListener(`click`, () => {
    localStorage.removeItem(`saveGame`);
    localStorage.removeItem(`saveCurrentSise`);
    localStorage.removeItem(`saveNumberOfElements`);
    startShuffle()
})

function shuffle(arr) {
    return arr
    .map(value => ({value, sort : Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({value}) => value)
}



let dragX
let dragY
let currentTarget
let buttonNode
function drag(e) {
    let isValid
    let buttonNumber
    let buttonCoords
    let blankCoords
    if (e.type === `dragstart`){
        e.target.classList.add(`selected`)
        currentTarget = e.target
        // console.dir(currentTarget);
        dragX = e.clientX;
        dragY = e.clientY;
        if (!startTime) {
            start()
            startTime = true
        }
        buttonNode = e.target.closest('button');
    } else if (e.type == `dragover`) {
        if (e.target == containerNode) {
           e.preventDefault()
           containerNode.ondrop = function (e) {
            buttonNumber = Number(buttonNode.dataset.matrixId)
            buttonCoords = findCoordsByNumber(buttonNumber, matrix)
            blankCoords = findCoordsByNumber(blankNumber, matrix)
            isValid = isValidForSwap(buttonCoords, blankCoords);
            if (!isValid) {
                currentTarget.classList.remove(`selected`)
                return
            }
            currentTarget.classList.remove(`selected`)
            swap(blankCoords, buttonCoords, matrix);
            setPositionItems(matrix, itemNodes)
            count++
            countSpan.innerHTML = `Moves: ${count}`
           }
        }
}
currentTarget.classList.remove(`selected`)
}
containerNode.addEventListener(`dragstart`, drag)
containerNode.addEventListener(`dragend`, drag)
containerNode.addEventListener(`dragover`, drag)

//! 3. Изменение позиции по клику
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
})

//! 5. Show won
// функция isWon включена в функцию swap 
function isWon(matrix, array) {
    const flatMatrix = matrix.flat()
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== flatMatrix[i]) {
            return false
        } 
    }
    return true
}    
function addWonClass() {
    setTimeout(() => {
        let result = `
        Hooraa! You are win! 
        Your result is: ${count} moves!
        Your time is: ${minVal} minutes and ${secVal} seconds!
        `
        let gameInfo = {
            count,
            minVal,
            secVal
        }
        
        const div = document.createElement(`div`)
        const saveBtn = document.createElement(`button`);
        const inputName = document.createElement(`input`)
        
        saveBtn.setAttribute(`type`, `button`);
        saveBtn.classList.add(`save`)
        saveBtn.innerText = `Save`
        inputName.setAttribute(`type`, `text`)
        inputName.setAttribute(`placeholder`, `Enter Your name:`)
        div.classList.add(`form`)
        div.append(inputName, saveBtn)
        modalContent.append(div)

        saveBtn.addEventListener(`click`, ()=> {
            if (inputName.value === ``) {
                return 
            }
            saveResult(gameInfo, inputName.value)
        })

        addWonModal(result)
        resetValues()
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

    function addWonModal(result) {
        modal.classList.add(`modal__active`)
        modalContent.classList.add(`active`)

        let form = document.querySelector(`.form`)
        let paragraph = document.createElement(`p`);
        paragraph.innerText = result
        form.append(paragraph)
    }

    resultBtn.addEventListener(`click`, ()=> {
        if (document.querySelector(`.results`)) {
                modalContent.removeChild(document.querySelector(`.results`))
        }
        
        let result = JSON.parse(localStorage.getItem(`resultArray`));
        modal.classList.add(`modal__active`)
        modalContent.classList.add(`active`)

        let div = document.createElement(`div`);
        div.classList.add(`results`)
        let header = document.createElement(`h2`);

        header.innerText = `Last 10 results`
        div.append(header)

        result.forEach((el, ind) => {
            let paragraph = document.createElement(`p`);
            paragraph.innerText = `${ind+1}. Name: ${el.name}; Moves: ${el.count}; Time: ${el.minVal}:${el.secVal}  `
            div.append(paragraph)
        } )
        modalContent.append(div)

    })
    // функция записи в local storage
    function saveResult(obj, name) {
        let result = {
            count: obj.count,
            minVal: obj.minVal,
            secVal: obj.secVal,
            name: name
        }
        let resultArray = []
        resultArray.push(result)

        if (!localStorage.getItem(`resultArray`)) {
            localStorage.setItem(`resultArray`, JSON.stringify(resultArray))
        } else {
            let tempRes = localStorage.getItem(`resultArray`);
            tempRes = JSON.parse(tempRes)
            tempRes.push(result)
            localStorage.setItem(`resultArray`, JSON.stringify(tempRes))
        }
        let show = JSON.parse(localStorage.getItem(`resultArray`));
    }


    window.addEventListener(`keydown`, (e)=> {
        if (e.key === `Escape`) {
            if (document.querySelector(`.results`)) {
                modalContent.removeChild(document.querySelector(`.results`))
            }
            modal.classList.remove(`modal__active`)
            modalContent.classList.remove(`active`)
        }
    })
    
    closeBtn.addEventListener(`click`, (e)=> {
        if (document.querySelector(`.results`)) {
            modalContent.removeChild(document.querySelector(`.results`))
        }
        if (document.querySelector(`.form`)) {
            modalContent.removeChild(document.querySelector(`.form`))
        }
        modal.classList.remove(`modal__active`)
        modalContent.classList.remove(`active`)
    })
    saveBtn.addEventListener(`click`, ()=> {
        alert(`You game is saved`)
        localStorage.setItem(`saveGame`, JSON.stringify(matrix))
        localStorage.setItem(`saveNumberOfElements`, JSON.stringify(numberOfElements))
        localStorage.setItem(`saveCurrentSise`, currentSize)
    })

    function save() {

    }
}

createAll()
if (!localStorage.getItem(`clearStorage`)) {
    localStorage.clear()
    localStorage.setItem(`clearStorage`, `true`)
}

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
        currentSizeView.innerText = el.innerText
        if (localStorage.getItem(`saveCurrentSise`) != el.dataset.matrixId) {
            localStorage.removeItem(`saveGame`);
            localStorage.removeItem(`saveCurrentSise`);
            localStorage.removeItem(`saveNumberOfElements`);
        }
        if (el.dataset.matrixId != 4) {
            document.querySelector("body > div > div.buttons__container > button:nth-child(4)").setAttribute(`disabled`, `true`)
        } else if (el.dataset.matrixId == 4) {
            document.querySelector("body > div > div.buttons__container > button:nth-child(4)").removeAttribute(`disabled`)
        }
        currentSize = el.dataset.matrixId 
        numberOfElements = currentSize ** 2

        let container = document.querySelector(`.fifteen`);

        app.destroyField(container)
        // создаем новый массив с новым размером
        array = app.createArray(currentSize)
        // на его основе снова создаем поле
        app.createField(array, currentSize)
        let containerNode = document.querySelector(`.fifteen`);
        let itemNodes = Array.from(containerNode.querySelectorAll(`.item`))
        createAll()
      })
})

