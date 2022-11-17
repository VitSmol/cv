import { birdsData } from "./data.js";
import { birdsDataEn } from "./data.js";
import { lang } from "./translate.js";
import * as data from "./data.js";
import * as game from "./game.js";
const langLinks = document.querySelectorAll(`.lang-link`)

const descriptionBlock = document.querySelector(`.hidden-description`);
const startDescription = document.querySelector(`.start-text`)
const listOfQuestions = document.querySelector(`.lists`);
const scoreCount = document.getElementById(`score-count`)

const defaultSrc = `assets/img/bird.jpg`

const questionImage = document.getElementById(`question-img`)
const questionName = document.querySelector(`.question-name`)

const image = document.getElementById(`bird-image`);
const name = document.getElementById(`bird-name`);
const nameLat = document.getElementById(`bird-lat`);
const text = document.querySelector(`.description-text`);

const nexLevelBtn = document.querySelector(`.next-level`)
const birdsListItems = document.querySelectorAll(`.birds__list__item`)
nexLevelBtn.disabled = true

const wrong = `./assets/sound/wrong.mp3`
const win = `./assets/sound/win.mp3`

const sound = (src) => {
  let audio = new Audio(src)
  audio.autoplay = true
}

// TODO при прохождение последнего теста выводить страницу 
    // TODO результатом, добавить условие при макс кол-ве балло

    // TODO реализовать галерею
// TODO реализовать два языка

//* resolved реализовать: 1.таймер времени
//* resolved реализовать: 2.общая продолжительность времени
//* resolved реализовать: 4.звук правильного/не правильного ответа
//* resolved реализовать: 3.клик по кнопке с обнулением и переходом к следующему разделу
//* resolved реализовать: 5.исправить счетчик: при клике на не правильный вопрос (повторном) счётчик продолжает уменьшаться

const duration = document.getElementById(`duration`)

const durationDescription = document.getElementById(`duration-description`)

data.getDuration(duration, game.audio)
data.getDuration(durationDescription, game.audioDescription)

let questions;
let currentIndex = 0;
let showQuestions = false
let currentArray;

const makePlayButtonDefault = (play, pause) => {
  play.classList.add(`active`)
  pause.classList.remove(`active`)
}

const activeChapter = (ind, arr) => {
  arr.forEach(el => {
    el.classList.remove(`active`)
  })
  arr[ind].classList.add(`active`)
}

const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

const createQuestionsList = (arr, arrEn, index) => {
  if (lang == `ru`) {
    currentArray = [...arr[index]]
  } else {
    currentArray = [...arrEn[index]]
  } 
  let rightQuestion = random(0, arr.length - 1)

  currentArray.forEach((el, ind) => {
    const li = document.createElement(`li`);
    li.classList.add(`questions__list__item`);
    li.setAttribute(`data-matrix-id`, `${el.id}`)
    const div = document.createElement(`div`)
    div.classList.add(`point`)
    li.append(div, el.name)
    listOfQuestions.append(li)

    if (ind === rightQuestion) {
      el.isTrue = true
      game.audio.src = el.audio
      game.audio.addEventListener('loadeddata', () => {
        game.progress.value = 0
      })
    }
  });
  questions = document.querySelectorAll(`.questions__list__item`);
}

createQuestionsList(birdsData, birdsDataEn, currentIndex)

questions.forEach(el => {
  el.addEventListener(`click`, () => {
    clickByQuestions(el)
  })
})

// Переменная определеят решен ли текущий таск
let resolve = false
let score = 0;
let step = 0;

function clickByQuestions(el) {
  if (!showQuestions) {
    showQuestions = true
    descriptionBlock.classList.toggle(`hidden`)
    startDescription.classList.toggle(`hidden`)
  }
  if (!game.audioDescription.paused) {
    makePlayButtonDefault(game.playDescription, game.pauseDescription)
  }

  let currentId = el.dataset.matrixId
  let obj = currentArray.find(el => {
    return el.id == currentId
  })
  image.src = obj.image;
  image.setAttribute(`data-matrix-id`, `${obj.id}`)
  name.innerHTML = obj.name;
  name.setAttribute(`data-matrix-id`, `${obj.id}`)
  nameLat.innerHTML = obj.species;
  nameLat.setAttribute(`data-matrix-id`, `${obj.id}`)
  text.innerHTML = `${obj.description}`
  text.setAttribute(`data-matrix-id`, `${obj.id}`)
  game.audioDescription.src = obj.audio
  game.audioDescription.addEventListener('loadeddata', () => {
    game.progressDescription.value = 0
  })

  game.progressDescription.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 0%)`
  if (el.firstChild.classList.contains(`wrong`)) {
    sound(wrong)
    return
  }
  if (!obj.isTrue && !resolve) {
    sound(wrong)
    el.firstChild.classList.add(`wrong`)
    step++
  }
  if (obj.isTrue && !resolve) {
    sound(win)
    game.audioDescription[`pause`]()
    game.audio[`pause`]()
    el.firstChild.classList.add(`win`)
    score += 5 - step
    resolve = true
    scoreCount.innerHTML = score
    questionImage.src = obj.image
    questionName.innerHTML = obj.name
    nexLevelBtn.disabled = false
    questionName.setAttribute(`data-matrix-id`, `${obj.id}`)
  }
}

const toNext = () => {
  makePlayButtonDefault(game.play, game.pause)
  game.audioDescription[`pause`]()
  game.audio.addEventListener('loadeddata', () => {
    game.progress.value = 0
  })
  game.audioDescription.addEventListener('loadeddata', () => {
    game.progressDescription.value = 0
  })
  game.progressDescription.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 0%)`
  game.progress.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 0%)`

  descriptionBlock.classList.toggle(`hidden`)
  startDescription.classList.toggle(`hidden`)
  showQuestions = false
  resolve = false
  step = 0;
  currentIndex++
  listOfQuestions.innerHTML = ``
  questionImage.src = defaultSrc
  questionName.innerHTML = `******`
  activeChapter(currentIndex, birdsListItems)
  createQuestionsList(birdsData, birdsDataEn, currentIndex)
}

nexLevelBtn.addEventListener(`click`, () => {
  if (currentIndex < currentArray.length - 1) {
    toNext();
  } else {
    game.gameContainer.classList.remove(`start`)
    game.resultContainer.classList.add(`start`)
    document.querySelector(`.score-count`).innerHTML = score
    game.audioDescription[`pause`]()
    game.audio[`pause`]()
  }

  questions.forEach(el => {
    el.addEventListener(`click`, () => {
      clickByQuestions(el)
    })
  })
  nexLevelBtn.disabled = true
})


//! УУУХХ бляя
langLinks.forEach(el => {
  el.addEventListener(`click`, function() {
    let lang = this.dataset.matrixId
    if (lang == `ru`) {
      currentArray = [...birdsData[currentIndex]]
    } else {
      currentArray = [...birdsDataEn[currentIndex]]
    } 
    let matrixId = name.dataset.matrixId
    if (matrixId) {

      let obj = currentArray.find(el => {
        return el.id == matrixId
      })
      // console.log(obj);
      name.innerHTML = obj.name
      nameLat.innerHTML = obj.species
      text.innerHTML = obj.description
    }

    const items = document.querySelectorAll(`.questions__list__item`);
    console.log(currentIndex);
    items.forEach((el, ind) => {
      if (lang == `ru`) {
        el.removeChild(el.lastChild);
        let ruText = birdsData[currentIndex][ind].name
        el.append(ruText)
        console.log(ruText);
      } else {
        el.removeChild(el.lastChild);
        let enText = birdsDataEn[currentIndex][ind].name
        el.append(enText)
        // console.log(enText);
      }
      // console.log(el.dataset.matrixId);
    })
  })
})