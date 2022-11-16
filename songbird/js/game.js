import { birdsData } from "./data.js";

export const gameContainer = document.querySelector(`.game__container`);
export const resultContainer = document.querySelector(`.result__container`);

setTimeout(() => {
  if (gameContainer) {
    gameContainer.classList.add(`start`)
  }
}, 300);

// First group of control elements
export const playButton = document.querySelectorAll(`.play-button`)[0]
export const play = document.querySelectorAll('.play')[0]
export const pause = document.querySelectorAll('.pause')[0]
export const audio = document.querySelectorAll(`.audio-file`)[0]
export const progress = document.querySelectorAll(`.progress`)[0]
export const sound = document.querySelectorAll(`.sound`)[0]

// Second group of control elements
export const playButtonDescription = document.querySelectorAll(`.play-button`)[1]
export const playDescription = document.querySelectorAll('.play')[1]
export const pauseDescription = document.querySelectorAll('.pause')[1]
export const audioDescription = document.querySelectorAll(`.audio-file`)[1]
export const progressDescription = document.querySelectorAll(`.progress`)[1]
export const soundDescription = document.querySelectorAll(`.sound`)[1]



const time = document.getElementById(`current-time`);
const timeDescription = document.getElementById(`current-time-description`);

sound.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`
soundDescription.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`

// изменение таймера

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
export const soundChange = (audio, sound) => {
  audio.volume = sound.value
  sound.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${sound.value * 100}%, rgb(61, 133, 140) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%, rgb(115, 115, 115) ${sound.value * 100}%)`
}

// обновление прогресса
export const progressUpdate = (audio, progressElement, first, second, timer) => {
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
export const rewind = (audio, progressElement, timer) => {
  const currentProgress = progressElement.value;
  audio.currentTime = (currentProgress * audio.duration) / 100

  timerChange(audio.currentTime, timer, audio.duration)
  progressElement.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${currentProgress}%, rgb(61, 133, 140) ${currentProgress}%, rgb(115, 115, 115) ${currentProgress}%, rgb(115, 115, 115) ${currentProgress}%)`
}

// toogle active class by svg elements
export const toggle = (first, second) => {
  first.classList.toggle(`active`)
  second.classList.toggle(`active`)
}
// start/stop function
export const startStop = (audio, first, second) => {
  audio.paused ? audio[`play`]() : audio[`pause`]();
  toggle(first, second)
}

export const clickFunc = (audio, first, second) => {
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
  progressUpdate(audio, progress, play, pause, time)
})
audioDescription.addEventListener(`timeupdate`, () => {
  progressUpdate(audioDescription, progressDescription, playDescription, pauseDescription, timeDescription)
})

// On progress change
progress.addEventListener(`input`, () => {
  rewind(audio, progress, time)
})

// On progress change
progressDescription.addEventListener(`input`, () => {
  rewind(audioDescription, progressDescription, timeDescription)
})

soundDescription.addEventListener(`input`, () => {
  soundChange(audioDescription, soundDescription)
})

sound.addEventListener(`input`, () => {
  soundChange(audio, sound)
})

