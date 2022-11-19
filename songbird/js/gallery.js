import { birds } from "./data.js";
import { lang } from "./translate.js";
import * as data from "./data.js";

const img = document.getElementById(`bird-image`)
const birdName = document.getElementById(`bird-name`)
const birdLat = document.getElementById(`bird-lat`)
const audio = document.querySelector(`.audio-file`)
const description = document.querySelector(`.description-text`);

const container = document.querySelector(`.description__gallery`)
const inner = document.getElementById(`inner-wrapper`);

const prev = document.querySelector(`.left`)
const next = document.querySelector(`.right`);

const langLinks = document.querySelectorAll(`.lang-link`)

let clone
let array = birds.flat(Infinity)
let currentIndex = 0;

class GalleryItem {
  constructor(container, object, lang) {
    this.container = container;
    this.audio = object.audio;
    this.description = object.description;
    this.image = object.image;
    this.name = object.name;
    this.species = object.species;
    this.lang = lang;
    this.enName = object.enName;
    this.enDescription = object.enDescription
  }
  createCard() {
    // const audio = await fetch(this.audio)
    // console.log(audio);
    img.src = this.image
    birdLat.innerHTML = this.species
    audio.src = this.audio;
    if (lang === `ru`) {
      birdName.innerHTML = this.name
      description.innerHTML = this.description
    } else if (lang === `en`) {
      birdName.innerHTML = this.enName
      description.innerHTML = this.enDescription

    }
    // container.parentNode.append(container)
    // let parent = this.container.parentNode
    // parent.append(this.container)
  }
  cloneCurrentContainer() {
    clone = this.container.cloneNode(true)
  }
}

const startSlide = new GalleryItem(container, array[currentIndex], lang);

startSlide.createCard()
startSlide.cloneCurrentContainer()
console.log(clone);

const switchSlide = (sign) => {
  if (sign === `next`) {
    currentIndex++
  } else {
    currentIndex--
  }
  if (currentIndex < 0) {
    currentIndex = array.length - 1;
  } else if (currentIndex > array.length - 1) {
    currentIndex = 0
  }
  //TODO добавить плавность анимации КОДИТЬ ТУТ!!11
  console.log(currentIndex);
  let newElement = new GalleryItem(clone, array[currentIndex], lang)
  newElement.createCard()
  newElement.cloneCurrentContainer()
  inner.append(clone)
  inner.removeChild(inner.lastChild)

  console.log(newElement);
}

function addListeners() {
  const playButton = document.querySelector(`.play-button`)
  const play = document.querySelectorAll('.play')[0]
  const pause = document.querySelectorAll('.pause')[0]
  const audio = document.querySelector(`.audio-file`)
  const progress = document.querySelector(`.progress`)
  const sound = document.querySelector(`.sound`)
  const time = document.getElementById(`current-time-description`);
  const duration = document.getElementById(`duration-description`);

  const makePlayButtonDefault = (play, pause) => {
    play.classList.add(`active`)
    pause.classList.remove(`active`)
  }

  makePlayButtonDefault(play,pause)

  progress.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 0%)`
  sound.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`

  audio.addEventListener('loadeddata', () => {
    progress.value = 0
  })

  data.getDuration(duration, audio)

  playButton.addEventListener(`click`, () => {
    data.clickFunc(audio, play, pause)
  })
  audio.addEventListener(`timeupdate`, () => {
    data.progressUpdate(audio, progress, play, pause, time)
  })
  progress.addEventListener(`input`, () => {
    data.rewind(audio, progress, time)
  })
  sound.addEventListener(`input`, () => {
    data.soundChange(audio, sound)
  })

}
next.addEventListener(`click`, () => {
  switchSlide(`next`)
  addListeners()
})

prev.addEventListener(`click`, () => {
  switchSlide(`down`)
  addListeners()
})

addListeners()


langLinks.forEach(el => {
  el.addEventListener(`click`, function() {
    let lang = this.dataset.matrixId;
    console.log(array[currentIndex]);
    if (lang === `ru`) {
      birdName.innerHTML = array[currentIndex].name
      description.innerHTML = array[currentIndex].description
    } else if (lang === `en`) {
      birdName.innerHTML = array[currentIndex].enName
      description.innerHTML = array[currentIndex].enDescription
    }
  })
})

// async function getSrc(src) {
//   const data = await fetch(src, {
//     method: `GET`,
//     mode: `no-cors`,
//     cache: `no-cache`,
//   }).then(data => {

//   })
// }

// getSrc(array[0].audio)