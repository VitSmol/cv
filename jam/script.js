// import { createAll } from "./app.js";
import * as app from "./app.js"

let array = app.shuffle(app.arr)
// создаем базовую разметку
app.createMarkup()

// создаем игровое поле
app.createField(array)

// находим созданное игровое поле
let containerNode = document.querySelector(`.fifteen`);
//находим все кнопки и делаем из них массив
let itemNodes = Array.from(containerNode.querySelectorAll(`.item`))

let countItems = 16

if (itemNodes.length !== 16) {
    throw new Error (`Должно быть ровно 16 элементов`)
}
//! 1. Position
console.log(
    itemNodes.map(el => Number(el.dataset.matrixId))
    );
// let matrix = getMatrix

//! 2. Shuffle

//! 3. Изменение позиции по клику

//! 4. change position by keyUP

// console.log(containerNode);
// console.log(itemNodes);


