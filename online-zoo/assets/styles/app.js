const radio1000 = document.getElementById('three')
const radio100 = document.getElementById('six')

const checkResolution = () => {
    if (window.outerWidth <= 740) {
        radio100.setAttribute('checked', 'true')
        radio1000.removeAttribute('checked')
    } else {
        const radio1000 = document.getElementById('three')
        radio100.removeAttribute('checked')
        radio1000.setAttribute('checked', 'true')
    }
}

checkResolution()
window.onresize = () => {
    checkResolution()
}