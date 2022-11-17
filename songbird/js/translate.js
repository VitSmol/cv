const langLinks = document.querySelectorAll(`.lang-link`)

const translateArr = {
  ru: {
    "caption": "угадай птицу по голосу",
    "begin": "Начнем",
    "main": `главная`,
    "gallery": "галерея",
    "game": "играть",
  },
  en: {
    "caption": "guess the bird by voice",
    "begin": "Let's begin",
    "main": `main`,
    "gallery": "gallery",
    "game": "game",
  }
}

export let lang = localStorage.getItem(`lang`) || `en`;

const translate = (lang, arr, cb) => {
  for (let key in arr[lang]) {
    let elements = document.querySelectorAll(`.lang-${key}`);
    elements.forEach(el => {
      el.innerHTML = arr[lang][key]
    })
  }
  localStorage.setItem(`lang`, lang)
}

translate(lang, translateArr)

langLinks.forEach(el => {
  el.addEventListener(`click`, function() {
    lang = this.dataset.matrixId
    translate(lang, translateArr)
  })
})
