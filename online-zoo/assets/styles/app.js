// const radio1000 = document.getElementById('three')
// const radio100 = document.getElementById('six')

// const checkResolution = () => {
//     if (window.outerWidth <= 740) {
//         radio100.setAttribute('checked', 'true')
//         radio1000.removeAttribute('checked')
//     } else {
//         const radio1000 = document.getElementById('three')
//         radio100.removeAttribute('checked')
//         radio1000.setAttribute('checked', 'true')
//     }
// }

// checkResolution()
// window.onresize = () => {
//     checkResolution()
// }
console.log(`script`);

const burger = document.querySelector('.burger__menu')
const modal = document.querySelector('.modal__active')
const menu = document.getElementById('menu')
const close = document.getElementById('close')
const links = document.querySelectorAll('.header__nav__item')

console.log(links);

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

burger.addEventListener(`click`, ()=> {
    console.log(`burger`);
    console.log(modal);
    console.log(menu);
})

window.onclick = function(e) {
    if (e.target == modal) {
        showMenu()
    } 
}
links.forEach(el => {
    el.addEventListener(`click`, showMenu)
})