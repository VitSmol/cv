// const translateArr = {
//   "caption": {
//     "ru": "угадай птицу по голосу",
//     "en": "guess the bird by voice"
//   },
//   "begin": {
//     "ru": "Начнем",
//     "en": "Let's begin"
//   },
//   "main": {
//     "ru": `главная`,
//     "en": `main`
//   },
//   "gallery": {
//     "ru": "галерея",
//     "en": "gallery",
//   },
//   "game": {
//     "ru": "играть",
//     "en": "game"
//   }
  
// }

const langLinks = document.querySelectorAll(`.lang-link`)

// const translate = (lang) => {
//   for (let key in translateArr) {
//     let all = document.querySelectorAll(`.lang-${key}`)
//     all.forEach(el=> {
//       el.innerHTML = translateArr[key][lang]
//     })
//   }
// }


// const translateByClick = (linksArray, lang) => {
//   linksArray.forEach(el => {
//     el.addEventListener(`click`, function () {
//       lang = this.dataset.matrixId 
//       console.log(lang)
//       for (let key in translateArr) {
//         let all = document.querySelectorAll(`.lang-${key}`)
//         all.forEach(el=> {
//           el.innerHTML = translateArr[key][lang]
//         })
//       }
//     }
//     )
//   })
// }

// translate(`ru`)

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

let lang = localStorage.getItem(`lang`) || `en`;

const translate = (lang, arr) => {
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


// let widget = localStorage.getItem("yt-widget")
// localStorage.setItem("yt-widget", `{"lang":"hi","active":"true"}`)
// console.log(
//   widget
// );