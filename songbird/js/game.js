import { birdsData } from "./data.js";

const gameContainer = document.querySelector(`.game__container`);

setTimeout(() => {
  gameContainer.classList.add(`start`)
}, 300);

// First group of control elements
const playButton = document.querySelectorAll(`.play-button`)[0]
const play = document.querySelectorAll('.play')[0]
const pause = document.querySelectorAll('.pause')[0]
const audio = document.querySelectorAll(`.audio-file`)[0]
const progress = document.querySelectorAll(`.progress`)[0]
const sound = document.querySelectorAll(`.sound`)[0]

const playButtonDescription = document.querySelectorAll(`.play-button`)[1]
const playDescription = document.querySelectorAll('.play')[1]
const pauseDescription = document.querySelectorAll('.pause')[1]
const audioDescription = document.querySelectorAll(`.audio-file`)[1]
const progressDescription = document.querySelectorAll(`.progress`)[1]
const soundDescription = document.querySelectorAll(`.sound`)[1]

sound.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`
soundDescription.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`

console.log(sound);
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
  const currentProgress = progressElement.value;
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
  if (!audioDescription.paused) {
    clickFunc(audioDescription, playDescription, pauseDescription)
  }
  clickFunc(audio, play, pause)
})
// for description block
playButtonDescription.addEventListener(`click`, () => {
  if (!audio.paused) {
    clickFunc(audio, play, pause)
  }
  clickFunc(audioDescription, playDescription, pauseDescription)
})

// On audio change
audio.addEventListener(`timeupdate`, () => {
  progressUpdate(audio, progress, play, pause)
})
audioDescription.addEventListener(`timeupdate`, () => {
  progressUpdate(audioDescription, progressDescription, playDescription, pauseDescription)
})

// On progress change
progress.addEventListener(`input`, () => {
  rewind(audio, progress)
})

// On progress change
progressDescription.addEventListener(`input`, () => {
  rewind(audioDescription, progressDescription)
})

soundDescription.addEventListener(`input`, () => {
  soundChange(audioDescription, soundDescription)
})

sound.addEventListener(`input`, () => {
  soundChange(audio, sound)
})