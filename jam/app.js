export let k = 4
export const createArray = (k) => {
    return new Array(k*k).fill(0).map((el, ind) => el = ind + 1)
}
export const arr = createArray(k)
// export const arr = new Array(16).fill(0).map((el, ind) => el = ind + 1)
export const buttonsName = [`Shuffle and start`, `Stop`, `Save`, `Results`]
// Shuffle Array
export const shuffle = (array) => {
    let arr = [...array]
    return arr.sort(() => Math.random() -0.5 )
}

// Создаем заголовок h1
export const createHeader = (appendTo) => {
    let h1 = document.createElement(`h1`);
    h1.innerText = `Gem puzzle`
    appendTo.append(h1)
}
// Создаем блок управляющих кнопок 
export const createButtonContainer = (arr, appendTo) => {
    let buttonContainer = document.createElement(`div`);
    buttonContainer.classList.add(`buttons__container`);
    for (let val of arr) {
        let btn = document.createElement(`button`);
        btn.setAttribute(`type`, `button`)
        btn.classList.add(`controls__button`)
        btn.innerText = val
        buttonContainer.append(btn)
    }
    appendTo.append(buttonContainer)
}
// Создаем блок информации об игре
export const createGameInfo = (appendTo) => {
    let gameInfo = document.createElement(`div`);
    gameInfo.classList.add(`game__info`);
    
    let moves = document.createElement(`span`);
    moves.classList.add(`moves`)
    moves.innerText = `Moves: 0`

    let time = document.createElement(`span`);
    moves.classList.add(`time`)
    time.innerText = `Time: 00:00`
    gameInfo.append(moves, time)
    appendTo.append(gameInfo)
}
// Создаем блок с выбором размера поля,
export const createFrameContainer = (appendTo) => {
    // 1. Общий контейнер
    let frameContainer = document.createElement(`div`);
    frameContainer.classList.add(`frame__container`);
    // 2. Контейнер отображающий текущий размер
    let currentSize = document.createElement(`div`);
    currentSize.classList.add(`current__size`);
    let paragraph = document.createElement(`p`)
    paragraph.innerText = `Frame size: `
    let span = document.createElement(`span`);
    span.innerText = `4x4`
    paragraph.append(span)
    currentSize.append(paragraph)
    
    let selectSize = document.createElement(`div`);
    selectSize.classList.add(`select__size`)
    let selectSizeParagraph = document.createElement(`p`)
    selectSizeParagraph.innerText = `Other sizes: `
    
    let availableSize = document.createElement(`div`);
    availableSize.classList.add(`links__container`)
    for (let i = 0; i < 6; i++) {
        let link = document.createElement(`a`);
        link.setAttribute(`href`, `#`)
        link.innerText = ` ${ i + 3 }x${ i + 3 } `;
        link.setAttribute(`data-matrix-id`, i + 3)
        link.classList.add(`size__link`)
        if (i + 3 === 4) {
            link.classList.add(`active`)
        }
        availableSize.append(link)
    }
    selectSizeParagraph.append(availableSize)
    selectSize.append(selectSizeParagraph)
    frameContainer.append(currentSize, selectSize)
    appendTo.append(frameContainer)
}

//создаем разметку (без игрового поля)
export const createMarkup = (arr) => {
    const page = document.createElement(`div`)
    page.classList.add(`page`)
    createHeader(page) //
    createButtonContainer(buttonsName, page)
    createGameInfo(page)
    createFrameContainer(page)
    document.body.append(page)
}

//! создаем игровое поле
export const createField = (arr, k) => {
    const fifteen = document.createElement(`div`);
    const insert = document.querySelector(`.page`)
    fifteen.classList.add(`fifteen`)
    arr.forEach(el => {
        const btn = document.createElement(`button`);
        const span = document.createElement(`span`)
        btn.setAttribute(`type`, `button`);
        btn.setAttribute(`data-matrix-id`, `${el}`);
        span.classList.add(`item-val`)
        btn.classList.add(`item`);
        btn.style.width = `${100 / k}%`
        btn.style.height = `${100 / k}%`
        span.innerText = el
        btn.append(span)
        fifteen.append(btn)
    });
    insert.lastElementChild.before(fifteen)
}
export const destroyField = (field) => {
    field.remove()
}
