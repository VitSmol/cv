hljs.initHighlightingOnLoad();
const menuBtn = document.querySelector(".m-menu");
const firstLine = menuBtn.querySelector(`.first__line`)
const secondLine = menuBtn.querySelector(`.second__line`)
const lastLine = menuBtn.querySelector(`.last__line`)
const menu = document.querySelector('.header__nav');
menuBtn.addEventListener('click', function () {
   menu.classList.toggle('active');
   firstLine.classList.toggle(`active__first`);
   secondLine.classList.toggle(`active__second`);
   lastLine.classList.toggle(`active__last`);
});

const inputForm = document.querySelector(".input__form");
const input = document.querySelector(`.comment__input`);
const button = document.querySelector(`.check`);
const inputTel = document.querySelector(`.tel__input`);
const msg = document.querySelector(`.msg`)

const checkNumber = (a) => {
  a = a.replace(/[^+\d]/g, "")
  // a = a.split('').filter(el => el !== '(').filter(el => el !== ')').filter(el => el != '-').join('')
  console.log(a);
  if (a[0] != '+') {
    a = '+' + a
  } 
  if (a.length != 13){
    msg.innerText = `номер не верный`
  } else {
    inputTel.value = a
    msg.innerText = `номер верный`
  }
}

button.addEventListener('click', () => {
  (!input.value.length && !inputTel.value.length) ? input.value = `smolitskiy@mail.ru` : checkNumber(inputTel.value);
})

