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


// TODO эксперимент с функцией
// TODO при переходе на другой размер - работает сдвиг по клику, но не по кнопкам.
// TODO попробовать запихнуть весь код кроме линков в функцию 
// todo и вызывать её при клике на каждую кнопку

function createAll(containerNode, itemNodes) {

function startShuffle() {
    const flatMatrix = matrix.flat();
    const shuffledArr = shuffle(flatMatrix)
    matrix = getMatrix(shuffledArr, currentSize);
    setPositionItems(matrix, itemNodes)
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
        swap(blankCoords, buttonCoords, matrix);
        setPositionItems(matrix, itemNodes)
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
    if (!e.key.includes(`Arrow`)) {
        return
    }
    const blankCoords = findCoordsByNumber(blankNumber, matrix);
    const buttonCoords = {
        x: blankCoords.x,
        y: blankCoords.y

    }
    const direction = event.key.split(`Arrow`)[1].toLowerCase();
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

const wonClass = `fifteen`
function addWonClass() {
    setTimeout(() => {
        alert(`won`)
    }, 200);
}
//* Helpers:

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
        // // на его основе снова создаем поле
        app.createField(array, currentSize)
        // // находим поле и кнопки заново
        let containerNode = document.querySelector(`.fifteen`);
        // console.log(containerNode);
        let itemNodes = Array.from(containerNode.querySelectorAll(`.item`))
        // console.log(itemNodes);
        // itemNodes[numberOfElements - 1].style.display = `none`;


        createAll(containerNode, itemNodes)
        console.log();
        // let matrix = getMatrix(
        //     itemNodes.map(el => Number(el.dataset.matrixId)), 
        //     currentSize
        //     );
        // // startShuffle()
        // setPositionItems(matrix, itemNodes)
        // startShuffle()
        // function startShuffle() {
        //     const flatMatrix = matrix.flat();
        //     const shuffledArr = shuffle(flatMatrix)
        //     matrix = getMatrix(shuffledArr, currentSize);
        //     setPositionItems(matrix, itemNodes)
        // }
        // const blankNumber = numberOfElements

        // containerNode.addEventListener(`click`, (e) => {
        //     const buttonNode = e.target.closest('button');
        //     if (!buttonNode) {
        //         return
        //     }
        //     const buttonNumber = Number(buttonNode.dataset.matrixId)
        //     // находим координаты кнопки, по которой совершается клик
        //     const buttonCoords = findCoordsByNumber(buttonNumber, matrix)
        //     // находим координаты пустого элемента
        //     const blankCoords = findCoordsByNumber(blankNumber, matrix)
        //     // Проверка валидности для перемещения
        //     const isValid = isValidForSwap(buttonCoords, blankCoords);
        //     if (isValid) {
        //         swap(blankCoords, buttonCoords, matrix);
        //         setPositionItems(matrix, itemNodes)
        //     }
        //     // console.log(isValid);
        // })

    })
})




// createMatrix(5)
// const newArr = new Array(3).fill([])
// console.log(newArr);