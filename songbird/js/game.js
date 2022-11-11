import { birdsData } from "./data.js";

const gameContainer = document.querySelector(`.game__container`);

setTimeout(() => {
  gameContainer.classList.add(`start`)
}, 1100);

// Elements in question section
const playButton = document.querySelector(`.play-button`)
const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const audio = document.querySelector(`.audio-file`)
const progress = document.querySelector(`.progress`)
const sound = document.querySelector(`.sound`)

sound.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`

// изменение звука
const soundChange = (audio, sound) => {
  audio.volume = sound.value
  sound.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`
}

// обновление прогресса
const progressUpdate = (audio, progressElement, first, second) => {
  const currentProgress = (audio.currentTime / audio.duration) * 100
  progressElement.value = currentProgress
  progressElement.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${currentProgress}%, rgb(61, 133, 140) ${currentProgress}%, rgb(115, 115, 115) ${currentProgress}%, rgb(115, 115, 115) ${currentProgress}%)`
  if (currentProgress == 100) {
    first.classList.add(`active`)
    second.classList.remove(`active`)
  }
}

// перемотка
const rewind = (audio, progressElement) => {
  const currentProgress = progress.value;
  audio.currentTime = (currentProgress * audio.duration) / 100
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





//! Listeners
// start/stop button
playButton.addEventListener(`click`, () => {
  clickFunc(audio, play, pause)
})

// On audio change
audio.addEventListener(`timeupdate`, () => {
  progressUpdate(audio, progress, play, pause)
})
// On progress change
progress.addEventListener(`input`, () => {
  rewind(audio, progress)
})

sound.addEventListener(`input`, () => {
  soundChange(audio, sound)
})