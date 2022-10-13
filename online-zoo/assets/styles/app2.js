const radio1000 = document.getElementById('three')
const radio100 = document.getElementById('six')
const allRadio = document.getElementsByName('amount')
const num = document.getElementById('num')
console.dir(allRadio);

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

const debounce = (fn, ms) => {
    let timeout;
    return function() {
        const fnCall = () => {fn.apply(this, arguments)}
        clearTimeout(timeout)
        timeout = setTimeout(fnCall, ms)
    }
}

function findNum(e) {
    if (e.target.value > 4) {
        num.value = num.value.slice(0, 4)
    }
    allRadio.forEach(el => {
        if (num.value !== el.value) {
            allRadio.forEach(el => el.removeAttribute('checked'))
            el.checked = false
        } 
        if (num.value == el.value) {
            el.checked = true
        }
    })
}

findNum = debounce(findNum, 500)

num.addEventListener('input', findNum)

// клик по радио-кнопкам
allRadio.forEach(el => {
    el.addEventListener('click', () => {
        num.value = el.value
    })
})