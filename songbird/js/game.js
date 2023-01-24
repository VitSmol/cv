import { birdsData } from "./data.js";
import * as data from "./data.js";

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

//! Listeners

// start/stop button
playButton.addEventListener(`click`, () => {
  if (!audioDescription.paused) {
    data.clickFunc(audioDescription, playDescription, pauseDescription)
  }
  data.clickFunc(audio, play, pause)
})
// for description block
playButtonDescription.addEventListener(`click`, () => {
  if (!audio.paused) {
    data.clickFunc(audio, play, pause)
  }
  data.clickFunc(audioDescription, playDescription, pauseDescription)
})

// On audio change
audio.addEventListener(`timeupdate`, () => {
  data.progressUpdate(audio, progress, play, pause, time)
})
audioDescription.addEventListener(`timeupdate`, () => {
 data.progressUpdate(audioDescription, progressDescription, playDescription, pauseDescription, timeDescription)
})

// On progress change
progress.addEventListener(`input`, () => {
  data.rewind(audio, progress, time)
})

// On progress change
progressDescription.addEventListener(`input`, () => {
  data.rewind(audioDescription, progressDescription, timeDescription)
})

soundDescription.addEventListener(`input`, () => {
  data.soundChange(audioDescription, soundDescription)
})

sound.addEventListener(`input`, () => {
  data.soundChange(audio, sound)
})

