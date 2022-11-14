import { birdsData } from "./data.js";

import * as game from "./game.js";

const descriptionBlock = document.querySelector(`.hidden-description`);
const startDescription = document.querySelector(`.start-text`)
const listOfQuestions = document.querySelector(`.lists`);

let questions;

let currentIndex = 0;
let score = 0;
let showQuestions = false
let currentArray

const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

const createQuestionsList = (arr, index) => {
  currentArray = [...arr[index]]
  let rightQuestion = random(0, arr.length - 1)

  currentArray.forEach((el,ind) => {
    const li = document.createElement(`li`);
    li.classList.add(`questions__list__item`);
    li.setAttribute(`data-matrix-id`, `${el.id}`)
    const div = document.createElement(`div`)
    div.classList.add(`point`)
    li.append(div, el.name)
    listOfQuestions.append(li)
    
    if (ind === rightQuestion) {
      // todo при загрузке изменяется src но ползунок становится на середину на середине
      el.isTrue = true
      game.audio.src = el.audio
      game.audio.addEventListener('loadeddata', () => {
        game.progress.value = 0
      })
    }
  });
  questions = document.querySelectorAll(`.questions__list__item`);
  console.log(questions);
}

createQuestionsList(birdsData, currentIndex)

questions.forEach(el => {
  el.addEventListener(`click`, () => {
    clickByQuestions(el)
  })
})

function clickByQuestions(el) {
  if (!showQuestions) {
    showQuestions = true
    descriptionBlock.classList.toggle(`hidden`)
    startDescription.classList.toggle(`hidden`)
  }
  if (!game.audioDescription.paused) {
    game.playDescription.classList.add(`active`)
    game.pauseDescription.classList.remove(`active`)
  }
  const image = document.getElementById(`bird-image`);
  const name = document.getElementById(`bird-name`);
  const nameLat = document.getElementById(`bird-lat`);
  const text = document.querySelector(`.description-text`);
  let currentId = el.dataset.matrixId
  let obj = currentArray.find(el => {
    return el.id == currentId
  })
  console.log(obj);
  // game.soundDescription.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${game.soundDescription.value * 100}%, rgb(61, 133, 140) ${game.soundDescription.value * 100}%, rgb(115, 115, 115) ${game.soundDescription.value * 100}%, rgb(115, 115, 115) ${game.soundDescription.value * 100}%)`
    image.src = obj.image;
    name.innerHTML = obj.name;
    nameLat.innerHTML = obj.species;
    text.innerHTML = `${obj.description}`
    game.audioDescription.src = obj.audio
    game.audioDescription.addEventListener('loadeddata', () => {
      game.progressDescription.value = 0
    })
    game.progressDescription.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 0%)`
    
  if (obj.isTrue) {
    console.log(`You win`);
  }
}
