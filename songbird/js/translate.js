const langLinks = document.querySelectorAll(`.lang-link`)

const translateArr = {
  ru: {
    "caption": "угадай птицу по голосу",
    "begin": "Начнем",
    "main": `главная`,
    "gallery": "галерея",
    "game": "играть",
    "win": "Поздравляем!",
    "first-text": "Вы выйграли со счётом: ",
    "score": "очков",
    "new-game": "Хотите начать игру заново?",
    "no": "Нет",
    "yes": "Да",
    "zero": "К сожалению Вы не набрали ни одного очка",
    "max": "Вы набрали максимальное количество очков!",
    "back": "Вернуться",
  },
  en: {
    "caption": "guess the bird by voice",
    "begin": "Let's begin",
    "main": `main`,
    "gallery": "gallery",
    "game": "game",
    "win": "Сongratulations!",
    "first-text": "You won with a ",
    "score": "points",
    "new-game": "Do you want to restart the game?",
    "no": "No",
    "yes": "Yes",
    "zero": "Sorry, you didn't get any points.",
    "max": "You have scored the maximum points!",
    "back": "Return",
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
