function exercise() {
    const btn = document.querySelector('#btn1')



    function btnClassToggle() {
        const svg = btn.querySelectorAll('.svg')
        svg.forEach(el => el.classList.toggle('off'))
    }

    btn.addEventListener('click', btnClassToggle)
}

document.addEventListener('DOMContentLoaded', exercise)
