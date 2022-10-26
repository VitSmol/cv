const EAGLE = {
  name: 'eagles',
  native: 'Native to South America',
  isVegan: false,
  img: '../../assets/imgs/pets_imgs/eagle.jpg'
}
const PANDA = {
  name: 'giant pandas',
  native: 'Native to Southwest China',
  isVegan: true,
  img: '../../assets/imgs/pets_imgs/panda.jpg'
}
const GORILLA = {
  name: 'Gorillas',
  native: 'Native to Congo',
  isVegan: true,
  img: '../../assets/imgs/pets_imgs/gorilla.jpg'
}
const SLOTH = {
  name: 'Two-toed Sloth',
  native: 'Mesoamerica, South America',
  isVegan: true,
  img: '../../assets/imgs/pets_imgs/two-toed-sloth.jpg'
}
const CHEETAH = {
  name: 'cheetahs',
  native: 'Native to Africa',
  isVegan: false,
  img: '../../assets/imgs/pets_imgs/cheetahs.jpg'
}
const PENGUIN = {
  name: 'Penguins',
  native: 'Native to Antarctica',
  isVegan: false,
  img: '../../assets/imgs/pets_imgs/penguin.jpg'
}
const PIG = {
  name: 'pig',
  native: 'Native to Russia',
  isVegan: true,
  img: '../../assets/imgs/pets_imgs/pig.jpg'
}
const FOX = {
  name: 'fox',
  native: 'Native to Russia',
  isVegan: false,
  img: '../../assets/imgs/pets_imgs/fox.jpg'
}
const KENGOO = {
  name: 'kengoo',
  native: 'Native to Australia',
  isVegan: true,
  img: '../../assets/imgs/pets_imgs/kengoo.jpg'
}
const POLAR_BEAR = {
  name: 'polar bear',
  native: 'Native to Antarctica',
  isVegan: false,
  img: '../../assets/imgs/pets_imgs/polar_bear.jpg'
}
const SKUNK = {
  name: 'skunk',
  native: 'Native to Asia',
  isVegan: true,
  img: '../../assets/imgs/pets_imgs/skunk.jpg'
}
const OWL = {
  name: 'owl',
  native: 'Native to Europe',
  isVegan: false,
  img: '../../assets/imgs/pets_imgs/owl.jpg'
}
const PUMA = {
  name: 'puma',
  native: 'Native to America',
  isVegan: false,
  img: '../../assets/imgs/pets_imgs/puma.jpg'
}
const CROCODILE = {
  name: 'crocodile',
  native: 'Native to Southeastern USA',
  isVegan: false,
  img: '../../assets/imgs/pets_imgs/crocodile.jpg'
}

  const pets = [
    EAGLE,
    PANDA,
    GORILLA,
    SLOTH,
    CHEETAH,
    PENGUIN,
    PIG,
    FOX,
    KENGOO,
    POLAR_BEAR,
    SKUNK,
    OWL,
    PUMA,
    CROCODILE
  ]
  
  class PetCard {
    constructor(obj) {
      this.name = obj.name;
      this.native = obj.native;
      this.isVegan = obj.isVegan;
      this.img = obj.img;
    }
    makeTextDescription() {
      const div = document.createElement('div');
      const p = document.createElement('p');
      const h = document.createElement('h5');
      h.append(this.name);
      p.append(this.native);
      p.classList.add('pet-p');
      div.append(h);
      div.append(p);
      div.classList.add('pet-text__container');
      return div;
    }
    makeTotalDescription() {
      const div = document.createElement('div');
      div.classList.add('pet-description__container');
      div.append(this.makeTextDescription());
      const foodImg = document.createElement('img');
      if (this.isVegan) {
        foodImg.src = '../../assets/icons/banana_icon.svg';
      } else {
        foodImg.src = '../../assets/icons/meet-fish_icon.svg';
        foodImg.classList.add('pet-food__icon__meet');
      }
      foodImg.classList.add('pet-food__icon');
      div.append(foodImg);
      return div;
    }
    makePetBlock() {
      const div = document.createElement('div');
      div.classList.add('pet-block');
      const img = document.createElement('img');
      img.classList.add('pet-img');
      img.src = this.img;
      div.append(img);
      div.append(this.makeTotalDescription());
      return div;
    }
    makeContainer() {
      const div = document.createElement('div');
      div.classList.add('pet__container');
      div.append(this.makePetBlock());
      return div;
    }
  }
  
  class Slide {
    makeContainer() {
      const div = document.createElement('div');
      div.classList.add('pet-card__container');
      return div;
    }
    getRandom() {
      return Math.floor(Math.random() * (pets.length));
    }
    getUnicumPets() {
      const unicumPetCards = new Set();
      while (unicumPetCards.size < 6) {
        unicumPetCards.add(pets[this.getRandom()]);
      }
      return unicumPetCards;
    }
    makeSlide() {
      const div = this.makeContainer();
      this.getUnicumPets().forEach(elem => {
        const pet = new PetCard(elem);
        div.append(pet.makeContainer());
      })
      return div;
    }
  }
  
  // Pets carousel
  const carousel = document.querySelector('.carousel__container');
  const startSlide = () => {
    const slide = new Slide().makeSlide();
    carousel.append(slide);
  }
  startSlide();
  let petCards = document.querySelectorAll('.pet-card__container');
  let currentCard = 0;
  let isEnabled = true;
  
  const changeCurrentCard = card => {
    currentCard = (card + petCards.length) % petCards.length;
  }
  const hideCard = direction => {
    isEnabled = false;
    petCards[currentCard].classList.add(direction);
    petCards[currentCard].addEventListener('animationend', function() {
      this.classList.remove('active-card', direction);
    })
  }
  const showCard = direction => {
    petCards[currentCard].classList.add('next-card', direction);
    petCards[currentCard].addEventListener('animationend', function() {
      this.classList.remove('next-card', direction);
      this.classList.add('active-card');
      isEnabled = true;
    })
  }
  
  const previousCard = card => {
    hideCard('to-right');
    changeCurrentCard(card - 1);
    showCard('from-left');
  }
  const nextCard = card => {
    hideCard('to-left');
    changeCurrentCard(card + 1);
    showCard('from-right');
  }
  
  document.querySelector('.arrow-left__btn').addEventListener('click', function() {
    petCards = document.querySelectorAll('.pet-card__container');
    if (isEnabled) {
      previousCard(currentCard);
      setTimeout(() => {
        const index = currentCard == 1 ? 0 : 1;
        petCards[index].remove();
        const slide = new Slide().makeSlide();
        if (index == 1) {
          carousel.append(slide);
        } else {
          carousel.prepend(slide);
        }
        petCards = document.querySelectorAll('.pet-card__container');
      }, 501)
    }
  })
  document.querySelector('.arrow-right__btn').addEventListener('click', function() {
    petCards = document.querySelectorAll('.pet-card__container');
    if (isEnabled) {
      nextCard(currentCard);
      setTimeout(() => {
        const index = currentCard == 1 ? 0 : 1;
        petCards[index].remove();
        const slide = new Slide().makeSlide();
        if (index == 1) {
          carousel.append(slide);
        } else {
          carousel.prepend(slide);
        }
        petCards = document.querySelectorAll('.pet-card__container');
      }, 501)
    }
  })