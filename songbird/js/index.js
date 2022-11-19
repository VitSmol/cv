import { birds } from "./data.js";
import { lang } from "./translate.js";
import * as data from "./data.js";
import * as game from "./game.js";

const langLinks = document.querySelectorAll(`.lang-link`)

const descriptionBlock = document.querySelector(`.hidden-description`);
const startDescription = document.querySelector(`.start-text`)
const listOfQuestions = document.querySelector(`.lists`);
const scoreCount = document.getElementById(`score-count`)
const scoreText = document.getElementById(`score-text`)

const defaultSrc = `assets/img/bird.jpg`
console.log(scoreText);
const questionImage = document.getElementById(`question-img`)
const questionName = document.querySelector(`.question-name`)

const image = document.getElementById(`bird-image`);
const name = document.getElementById(`bird-name`);
const nameLat = document.getElementById(`bird-lat`);
const text = document.querySelector(`.description-text`);

const startText = document.querySelector(`.start-text`)
const nexLevelBtn = document.querySelector(`.next-level`)
const birdsListItems = document.querySelectorAll(`.birds__list__item`)

const menuArray = {
    ru: [`Разминка`, `Воробьиные`, `Лестные птицы`, `Певчие Птицы`, `Хищные птицы`, `Морские птицы`],
    en: [`Warm-up`, `Sparrows`, `Fairy Birds`, `Songbirds`, `Predator Birds`, `Sea Birds`]
  }

const btnScore = {
  ru: {
    button: `Далее`,
    score: `Счёт: `,
    startText: `Послушайте плеер. Выберите птицу из списка`
  },
  en: {
    button: `Next Level`,
    score: `Score: `,
    startText: `Listen to the player. Select a bird from the list`
  }
}

const translateBtn = (lang) => {
  nexLevelBtn.innerHTML = btnScore[lang].button
  scoreText.innerHTML = btnScore[lang].score
  startText.innerHTML = btnScore[lang].startText
}

translateBtn(lang)

const translateMenu = (arr, lang) => {
  birdsListItems.forEach((el, ind) => {
    el.innerHTML = arr[lang][ind]
  })
}
translateMenu(menuArray, lang)

nexLevelBtn.disabled = true

const wrong = `./assets/sound/wrong.mp3`
const win = `./assets/sound/win.mp3`

const sound = (src) => {
  let audio = new Audio(src)
  audio.autoplay = true
}

// TODO добавить условие при макс кол-ве балло

// TODO реализовать галерею 
// TODO реализовать два языка

// TODO исправить стили на странице с игрой (при мобильном отображении)


const duration = document.getElementById(`duration`)
const durationDescription = document.getElementById(`duration-description`)

data.getDuration(duration, game.audio)
data.getDuration(durationDescription, game.audioDescription)

let questions;
let currentIndex = 0;
let showQuestions = false
let currentArray;

export const makePlayButtonDefault = (play, pause) => {
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

const createQuestionsList = (arr, index) => {
  currentArray = [...arr[index]]
  let rightQuestion = random(0, arr.length - 1)

  currentArray.forEach((el, ind) => {
    const li = document.createElement(`li`);
    li.classList.add(`questions__list__item`);
    li.setAttribute(`data-matrix-id`, `${el.id}`)
    const div = document.createElement(`div`)
    div.classList.add(`point`)


    if (lang === `ru`) {
      li.append(div, el.name)
    } else if (lang === `en`) {
      li.append(div, el.enName)
    }

    listOfQuestions.append(li)

    if (ind === rightQuestion) {
      el.isTrue = true
      console.log(el);
      game.audio.src = el.audio
      game.audio.addEventListener('loadeddata', () => {
        game.progress.value = 0
      })
    }
  });
  questions = document.querySelectorAll(`.questions__list__item`);
}

createQuestionsList(birds, currentIndex)

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

  if (lang === `ru`) {
    name.innerHTML = obj.name;
    text.innerHTML = obj.description
  } else if (lang === `en`) {
    name.innerHTML = obj.enName;
    text.innerHTML = obj.enDescription
  }

  image.src = obj.image;
  image.setAttribute(`data-matrix-id`, `${obj.id}`)
  name.setAttribute(`data-matrix-id`, `${obj.id}`)
  nameLat.innerHTML = obj.species;
  nameLat.setAttribute(`data-matrix-id`, `${obj.id}`)
  text.setAttribute(`data-matrix-id`, `${obj.id}`)
  game.audioDescription.src = obj.audio
  game.audioDescription.addEventListener('loadeddata', () => {
    game.progressDescription.value = 0
  })

  game.progressDescription.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 0%)`

  if (el.firstChild.classList.contains(`wrong`)) {
    // sound(wrong)
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
    if (lang === `ru`) {
      questionName.innerHTML = obj.name
    } else if (lang === `en`) {
      questionName.innerHTML = obj.enName
    }
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
  createQuestionsList(birds, currentIndex)
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
    if (score === 30) {
      document.querySelector(`.if-not-max-score`).style.display = `none`
      document.querySelector(`.lang-zero`).style.display = `none`
    } else if (score < 30 && score > 0) {
      document.querySelector(`.if-max`).style.display = `none`
      document.querySelector(`.lang-zero`).style.display = `none`
    } else {
      document.querySelector(`.lang-win`).style.display = `none`
      document.querySelector(`.winner`).style.display = `none`
      document.querySelector(`.if-max`).style.display = `none`
      console.log(document.querySelector(`.win`));
    }
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
  el.addEventListener(`click`, function () {
    let lang = this.dataset.matrixId
    const items = document.querySelectorAll(`.questions__list__item`);
    
    translateMenu(menuArray, lang)
    translateBtn(lang)

    items.forEach((el, i) => {
      el.removeChild(el.lastChild);
      if (lang === `ru`) {
        el.append(birds[currentIndex][i].name)
      } else if (lang === `en`) {
        el.append(birds[currentIndex][i].enName)
      }
    })

    let matrixId = name.dataset.matrixId

    if (matrixId) {
      let obj = birds[currentIndex].find(el => {
        return el.id == matrixId
      })
      if (lang === `ru`) {
        name.innerHTML = obj.name
        text.innerHTML = obj.description

      } else if (lang === `en`) {
        name.innerHTML = obj.enName
        text.innerHTML = obj.enDescription
      }
    }

    let questionIndex = questionName.dataset.matrixId
    console.log(resolve);
    if (questionIndex && resolve) {
      let question = birds[currentIndex].find(el => {
        return el.id == questionIndex
      })
      if (lang === `ru`) {
        questionName.innerHTML = question.name
      } else if (lang === `en`) {
        questionName.innerHTML = question.enName
      }
    }

  })
})

