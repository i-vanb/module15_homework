function setHeight() {
    const header = document.querySelector('#header')
    const footer = document.querySelector('#footer')
    const chat = document.querySelector('#chat')
    chat.style.height = `${window.innerHeight - header.offsetHeight - footer.offsetHeight}px`


}

document.addEventListener('DOMContentLoaded', setHeight)
