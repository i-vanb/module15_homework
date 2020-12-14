function exercise() {
    const btn = document.querySelector('#btn2')

    btn.addEventListener('click', getScreen)

    function getScreen() {
        alert(`Screen size: \n width: ${window.screen.width}\n height: ${window.screen.height}
            \nBrowser size:\n width: ${window.innerWidth}\n height: ${window.innerHeight}`)
    }


}

document.addEventListener('DOMContentLoaded', exercise)


