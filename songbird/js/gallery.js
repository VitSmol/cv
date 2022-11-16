import { birdsData } from "./data.js";

const container = document.querySelector(`.description__gallery`)
const inner = document.getElementById(`inner`);

const prev = document.querySelector(`.left`)
const next = document.querySelector(`.right`);

let clone
let array = birdsData.flat(Infinity)
let currentIndex = 0;

export const timerChange = (currentTime, timer, duration) => {
  let second = Math.floor(currentTime);
  let minutes = Math.floor(currentTime / 60);
  if (second < 10) {
    timer.innerHTML = `0${minutes}:0${second}`
  }
  if (second >= 10) {
    timer.innerHTML = `0${minutes}:${second}`
  }
  if (second > 59 && (second - 60 * minutes) < 10) {
    timer.innerHTML = `0${minutes}:0${second - 60 * minutes}`
  }
  if (second > 59 && (second - 60 * minutes) >= 10) {
    timer.innerHTML = `0${minutes}:${second - 60 * minutes}`
  }
}

// изменение звука
const soundChange = (audio, sound) => {
  audio.volume = sound.value
  sound.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`
}
// обновление прогресса
const progressUpdate = (audio, progressElement, first, second, timer) => {
  const currentProgress = (audio.currentTime / audio.duration) * 100
  progressElement.value = currentProgress
  timerChange(audio.currentTime, timer, audio.duration)
  progressElement.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${currentProgress}%, rgb(61, 133, 140) ${currentProgress}%, rgb(115, 115, 115) ${currentProgress}%, rgb(115, 115, 115) ${currentProgress}%)`
  if (currentProgress == 100) {
    first.classList.add(`active`)
    second.classList.remove(`active`)
  }
}
// перемотка
const rewind = (audio, progressElement, timer) => {
  const currentProgress = progressElement.value;
  audio.currentTime = (currentProgress * audio.duration) / 100

  timerChange(audio.currentTime, timer, audio.duration)
  progressElement.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${currentProgress}%, rgb(61, 133, 140) ${currentProgress}%, rgb(115, 115, 115) ${currentProgress}%, rgb(115, 115, 115) ${currentProgress}%)`
}

// toogle active class by svg elements
const toggle = (first, second) => {
  first.classList.toggle(`active`)
  second.classList.toggle(`active`)
}
// start/stop function
const startStop = (audio, first, second) => {
  audio.paused ? audio[`play`]() : audio[`pause`]();
  toggle(first, second)
}

const clickFunc = (audio, first, second) => {
  if (first.classList.contains(`active`)) {
    startStop(audio, first, second)
  } else if (second.classList.contains(`active`)) {
    startStop(audio, first, second)
  }
}

class GalleryItem {
  constructor(container, object) {
    this.container = container;
    this.audio = object.audio;
    this.description = object.description;
    this.image = object.image;
    this.name = object.name;
    this.species = object.species;
  }
  createCard() {
    const img = document.getElementById(`bird-image`)
    const birdName = document.getElementById(`bird-name`)
    const birdLat = document.getElementById(`bird-lat`)
    const audio = document.querySelector(`.audio-file`)
    const description = document.querySelector(`.description-text`);
    img.src = this.image
    birdName.innerHTML = this.name
    birdLat.innerHTML = this.species
    audio.src = this.audio;
    description.innerHTML = this.description
  }
  cloneCurrentContainer() {
    clone = this.container.cloneNode(true)
  }
}

const startSlide = new GalleryItem(container, array[currentIndex]);

startSlide.createCard()
startSlide.cloneCurrentContainer()

const switchSlide = (sign) => {
  console.log(currentIndex);
  sign === `next` ? currentIndex++ : currentIndex--;
  currentIndex < 0 ? currentIndex = array.length - 1 :
    currentIndex > array.length - 1 ? currentIndex = 0 : null
  console.log(currentIndex);

  inner.innerHTML = '';
  inner.append(clone)
  const newElement = new GalleryItem(clone, array[currentIndex]);
  newElement.createCard()
  newElement.cloneCurrentContainer()
}

const getDuration = (duration, aud) => {
  aud.addEventListener('loadeddata', () => {
    let minutes = Math.floor(aud.duration / 60);
    let seconds = Math.ceil(aud.duration % 60);
    if (seconds < 10) {
      seconds = `0`+seconds
    } 
    if (minutes < 10) {
      minutes = `0`+minutes
    }
    let result = `${minutes}:${seconds}`
    duration.innerHTML = result
  })
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

  sound.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`
  
  audio.addEventListener('loadeddata', () => {
    progress.value = 0
  })

  getDuration(duration, audio)

  playButton.addEventListener(`click`, () => {
    clickFunc(audio, play, pause)
  })
  audio.addEventListener(`timeupdate`, () => {
    progressUpdate(audio, progress, play, pause, time)
  })
  progress.addEventListener(`input`, () => {
    rewind(audio, progress, time)
  })
  sound.addEventListener(`input`, () => {
    soundChange(audio, sound)
  })

}

addListeners()

next.addEventListener(`click`, () => {
  switchSlide(`next`)
  addListeners()
})
prev.addEventListener(`click`, () => {
  switchSlide(`down`)
  addListeners()
})