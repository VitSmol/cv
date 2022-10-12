const burger = document.querySelector('.burger__menu')
const modal = document.querySelector('.modal__active')
const menu = document.getElementById('menu')
const close = document.getElementById('close')
const links = document.querySelectorAll('.header__nav__item')

function showMenu() {
    modal.classList.toggle('show')
    menu.classList.toggle('show')
}

burger.addEventListener('click', ()=> {
    showMenu()
})
close.addEventListener('click', ()=> {
    showMenu()
})

window.onclick = function(e) {
    if (e.target == modal) {
        showMenu()
    } 
}
links.forEach(el => {
    el.addEventListener(`click`, showMenu)
})


// const roundButtonLeft = document.querySelector('.btn-left')
// const roundButtonRight = document.querySelector('.btn-right')
// const sliderContainer = document.querySelector('.slider')
// const outContainer = document.querySelector('.outer__container')
const path = `../../assets/images/`

// const petsArray = [
//     {
//         name: 'giant Pandas',
//         location: `Native to Southwest China`,
//         smallImage: `banana.png`,
//         bigImage: `pandas.png`,
//         altSmall: `banana`,
//         alt: `pandas`
//     },
//     {
//         name: 'Eagles',
//         location: `Native to South America`,
//         smallImage: `meet-fish_icon.png`,
//         bigImage: `eagles.png`,
//         altSmall: `meet`,
//         alt: `pandas`
//     },
//     {
//         name: 'Gorillas',
//         location: `Native to Congo`,
//         smallImage: `banana.png`,
//         bigImage: `gorillas.png`,
//         altSmall: `banana`,
//         alt: `gorillas`
//     },
//     {
//         name: 'Two-toed Sloth',
//         location: `Mesoamerica, South America`,
//         smallImage: `banana.png`,
//         bigImage: `sloth.png`,
//         altSmall: `banana`,
//         alt: `sloth`
//     },
//     {
//         name: 'cheetahs',
//         location: `Native to Africa`,
//         smallImage: `meet-fish_icon.png`,
//         bigImage: `cheetahs.png`,
//         altSmall: `meet`,
//         alt: `cheetahs`
//     },
//     {
//         name: 'Penguins',
//         location: `Native to Antarctica`,
//         smallImage: `meet-fish_icon.png`,
//         bigImage: `penguins.png`,
//         altSmall: `meet`,
//         alt: `penguins`
//     },
//     {
//         name: 'Alligators',
//         location: `Native to Southeastern U. S.`,
//         smallImage: `meet-fish_icon.png`,
//         bigImage: `aligator.png`,
//         altSmall: `meet`,
//         alt: `aligator`
//     },
//     {
//         name: 'Gorillas',
//         location: `Native to Congo`,
//         smallImage: `banana.png`,
//         bigImage: `gorillas2.png`,
//         altSmall: `banana`,
//         alt: `aligator`
//     },
// ]

// const shuffle = (arr) => {
//     arr.sort(() => Math.random() -0.5 )
// }

// const firstInitImages = (obj, countOfContainers, countOfImages,) => {
//         // create 3 pets container blocks
//         for (let i = 0; i < countOfContainers; i++) {
//             const petsContainer = document.createElement('div');
//             petsContainer.classList.add('pets__container')
//             const tempObj = [...obj]
//             if (i !== 1 ) {
//                 shuffle(tempObj)
//             }
//             tempObj.splice(countOfImages)
//             tempObj.forEach(el => {
//                 const pet = document.createElement('div')
//                 pet.classList.add('pet');
//                 const img = document.createElement('img');
//                 img.setAttribute('src', `${path}${el.bigImage}`)
//                 img.setAttribute('alt', `${el.alt}`)
//                 const petContent = document.createElement('div')
//                 petContent.classList.add('pet__content')
//                 const petContentHeader = document.createElement('h5')
//                 const petContentParagraph = document.createElement('p')
//                 const petContentImage = document.createElement('img')
//                 petContentHeader.innerText = el.name
//                 petContentParagraph.innerText = el.location
//                 petContentImage.setAttribute('src', `${path}${el.smallImage}`)
//                 petContentImage.setAttribute('alt', `${el.altSmall}`)
//                 petContentImage.classList.add('img__icon')
//                 petContentImage.classList.add(`icon__${el.altSmall}`)
//                 petContent.append(petContentHeader)
//                 petContent.append(petContentParagraph)
//                 petContent.append(petContentImage)
//                 pet.append(img)
//                 pet.append(petContent)
//                 petsContainer.append(pet)
//             })
//             sliderContainer.append(petsContainer)
//         }
//         sliderContainer.style.left = `-${document.querySelector('.pets__container').offsetWidth + 'px'}`
//     }
// const resolutionSelection = () => {
//         if (window.innerWidth > 830) {
//             firstInitImages(petsArray, 10, 6)
//         } else {
//             firstInitImages(petsArray, 10, 4)
//         }
//     }
// resolutionSelection()
// function slideWrapp(wrapper, items, prev, next) {
//     let posX1 = 0,
//         posX2 = 0,
//         posInitial,
//         posFinal,
//         threshold = 100,
//         slides = items.getElementsByClassName('pets__container'), // массив со слайдами
//         slidesLength = slides.length, // количество слайдов
//         slideSize = items.getElementsByClassName('pets__container')[0].offsetWidth, // ширина слайда
//         firstSlide = slides[0], // первый слайд
//         lastSlide = slides[slidesLength - 1], // последний слайд
//         cloneFirst = firstSlide.cloneNode(true), // клонирование первого слайда
//         cloneLast = lastSlide.cloneNode(true), // клонирование второго слайда
//         index = 0,
//         allowShift = true;
        
//         // Clone first and last slide
//         items.appendChild(cloneFirst);
//         items.insertBefore(cloneLast, firstSlide);
//         // wrapper.classList.add('loaded');
        
//         //! Mouse events
//         items.onmousedown = dragStart;
        
//         //! Touch events
//         items.addEventListener('touchstart', dragStart);
//         items.addEventListener('touchend', dragEnd);
//         items.addEventListener('touchmove', dragAction);
        
//         //! Click events
//         prev.addEventListener('click', function () { 
//           shiftSlide(-1) 
//         });
//         next.addEventListener('click', function () { 
//           shiftSlide(1) 
//         });
        
//         // Transition events
//         items.addEventListener('transitionend', checkIndex);
        
//         function dragStart (e) {
//           e = e || window.event;
//           e.preventDefault();
//           posInitial = items.offsetLeft;
//           if (e.type == 'touchstart') {
//             posX1 = e.touches[0].clientX;
//           } else {
//             posX1 = e.clientX;
//             document.onmouseup = dragEnd;
//             document.onmousemove = dragAction;
//           }
//         }
      
//         function dragAction (e) {
//           e = e || window.event;
          
//           if (e.type == 'touchmove') {
//             posX2 = posX1 - e.touches[0].clientX;
//             posX1 = e.touches[0].clientX;
//         } else {
//             posX2 = posX1 - e.clientX;
//             posX1 = e.clientX;
//           }
//           items.style.left = (items.offsetLeft - posX2) + "px";
//         }
        
//         function dragEnd (e) {
//           posFinal = items.offsetLeft;
//           if (posFinal - posInitial < -threshold) {
//             shiftSlide(1, 'drag');
//           } else if (posFinal - posInitial > threshold) {
//             shiftSlide(-1, 'drag');
//           } else {
//             items.style.left = (posInitial) + "px";
//           }
      
//           document.onmouseup = null;
//           document.onmousemove = null;
//         }
        
//         function shiftSlide(dir, action) {
//           items.classList.add('shifting');

//           if (allowShift) {
//             if (!action) { posInitial = items.offsetLeft; }
            
//             if (dir == 1) {
//               items.style.left = (posInitial - slideSize) + "px";
//               index++;

//             } else if (dir == -1) {
//               items.style.left = (posInitial + slideSize) + "px";
//               index--;      
//             }
//           };
          
//           allowShift = false;
//         }
          
//         function checkIndex (){
//           items.classList.remove('shifting');
          
//           if (index == -1) {
//             items.style.left = -(slidesLength * slideSize) + "px";
//             index = slidesLength - 1;
//           }
      
//           if (index == slidesLength) {
//             items.style.left = -(1 * slideSize) + "px";
//             index = 0;
//           }
          
//           allowShift = true;
//         }
//       }

// slideWrapp(outContainer, sliderContainer, roundButtonLeft, roundButtonRight);

const testimonialsArray = [
  {
    name: 'Michael John',
    local: 'Austria',
    was: 'Yesterday',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'anon.png'
  },
  {
    name: 'Oskar Samborsky',
    local: 'France',
    was: 'Yesterday',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'oskar.png'
  },
  {
    name: 'Fredericka Michelin',
    local: 'Austria',
    was: 'Last week',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'frederica.png'
  },
  {
    name: 'Mila Riksha',
    local: 'Spain',
    was: 'Last week',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'mila.png'
  },
  {
    name: 'Jon Snow',
    local: 'Westeros',
    was: 'Last month',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'anon.png'
  },
  {
    name: 'Ramsey Snow',
    local: 'Westeros',
    was: 'Yesterday',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'anon.png'
  },
  {
    name: 'Tywin Lannister',
    local: 'Westeros',
    was: 'Today',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'anon.png'
  },
  {
    name: 'Tyrion Lannister',
    local: 'Westeros',
    was: 'Today',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'anon.png'
  },
  {
    name: 'Sansa Stark',
    local: 'Westeros',
    was: 'Today',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'anon.png'
  },
  {
    name: 'Ariya Stark',
    local: 'Westeros',
    was: 'Today',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'anon.png'
  },
  {
    name: 'Ned Stark',
    local: 'Westeros',
    was: 'Last year',
    text: `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals. <br>
    The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.  The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.`,
    avatar: 'anon.png'
  },
]

const testimonialsContainer = document.querySelector('.testinonials__cards')

const createTestimonials = () => {
  testimonialsArray.forEach(el => {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add(`card`)
    
    const userInfoDiv = document.createElement('div')
    userInfoDiv.classList.add(`user__info`)

    const userAvatar = document.createElement('img')
    userAvatar.setAttribute('src', `${path}${el.avatar}`)
    userAvatar.setAttribute('alt', `avatar`)

    const nameDiv = document.createElement('div')
    nameDiv.classList.add(`name`)

    const name = document.createElement('h5')
    name.innerText = `${el.name}`

    const localContainer = document.createElement('p')
    localContainer.classList.add(`local`)

    const local = document.createElement('span')
    local.innerText = `Local ${el.local}`

    const was = document.createElement('span')
    was.innerText = `${el.was}`

    localContainer.append(local, was)
    nameDiv.append(name, localContainer)

    userInfoDiv.append(userAvatar, nameDiv)

    const textContainer = document.createElement('div')
    textContainer.classList.add('text')

    const text = document.createElement('p')
    text.innerText = `${el.text}`

    textContainer.append(text)

    cardDiv.append(userInfoDiv, textContainer)
    testimonialsContainer.append(cardDiv)
  })
  
}
createTestimonials()

const rangeInput = document.querySelector('.input-range')
const card = document.querySelector('.card')

if (window.innerWidth < 1350) {
  // testimonialsContainer.style.left = '110px'
  rangeInput.max = 8
}

rangeInput.addEventListener('input', () => {
    testimonialsContainer.classList.add('shifting')
    testimonialsContainer.style.left = `-${rangeInput.value * (card.offsetWidth + 30)}px`
}
)

const allCards = document.querySelectorAll('.card')

allCards.forEach(el => {
  el.addEventListener('click', (e) => {
    let modalTest = document.querySelector('.testimon__modal')
    let clone = e.target.cloneNode(true)
    modalTest.appendChild(clone)
    modalTest.classList.toggle('show')
    window.onclick = function(e) {
      if (e.target == modalTest || e.target == document.getElementById('close_modal')) {
          modalTest.classList.toggle('show')
          modalTest.removeChild(modalTest.lastChild)
        } 
  }
  })
})

// .shifting
    // transition: left $transition-time ease-out