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

//! 1. Position
itemNodes[numberOfElements - 1].style.display = `none`;

let matrix = getMatrix(
    itemNodes.map(el => Number(el.dataset.matrixId)), 
    currentSize
    );
setPositionItems(matrix)

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

function setPositionItems(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = itemNodes[value - 1]
            setNodeStyles(node, x , y)
        }
    }
}
// функция установки стилей для каждой ячейки по умолчанию
function setNodeStyles(node, x , y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

//! 2. Shuffle
let shuffleBtn = document.querySelector("body > div > div.buttons__container > button:nth-child(1)")

shuffleBtn.addEventListener(`click`, () => {
    const flatMatrix = matrix.flat();
    const shuffledArr = shuffle(flatMatrix)
    matrix = getMatrix(shuffledArr, currentSize);
    setPositionItems(matrix)
    console.log(flatMatrix);
})

function shuffle(arr) {
    return arr
    .map(value => ({value, sort : Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({value}) => value)
}
//! 3. Изменение позиции по клику

//! 4. change position by keyUP

//! 5. Show won
// console.log(containerNode);
// console.log(itemNodes);


//* Helpers:








// createMatrix(5)
// const newArr = new Array(3).fill([])
// console.log(newArr);