const radio1000 = document.getElementById('three')
const radio100 = document.getElementById('six')
const allRadio = document.getElementsByName('amount')
const num = document.getElementById('num')
console.dir(allRadio);

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
            // allRadio.forEach(el => el.removeAttribute('checked'))
            el.checked = true
        }
        console.log(el.value);
    })
}

let tempArr = [...allRadio]
console.log(tempArr);

findNum = debounce(findNum, 500)


num.addEventListener('input', findNum)

// клик по радио-кнопкам
allRadio.forEach(el => {
    el.addEventListener('click', () => {
        num.value = el.value
    })
})