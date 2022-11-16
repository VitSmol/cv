import { birdsData } from "./data.js";
import * as data from "./data.js";

const container = document.querySelector(`.description__gallery`)
const inner = document.getElementById(`inner`);

const prev = document.querySelector(`.left`)
const next = document.querySelector(`.right`);

let clone
let array = birdsData.flat(Infinity)
let currentIndex = 0;

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
  sign === `next` ? currentIndex++ : currentIndex--;
  currentIndex < 0 ? currentIndex = array.length - 1 :
  currentIndex > array.length - 1 ? currentIndex = 0 : null
    inner.innerHTML = '';
    inner.append(clone)
    
  const newElement = new GalleryItem(clone, array[currentIndex]);
  newElement.createCard()
  newElement.cloneCurrentContainer()
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

addListeners()

next.addEventListener(`click`, () => {
  switchSlide(`next`)
  addListeners()
})

prev.addEventListener(`click`, () => {
  switchSlide(`down`)
  addListeners()
})