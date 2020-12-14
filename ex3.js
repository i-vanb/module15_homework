function exercise() {
    let isConnected = false
    let websocket
    const send = document.querySelector('#button_send')
    const text = document.querySelector('#new_message')
    const chat = document.querySelector('#chat')
    const connectBtn = document.querySelector('#btn1')
    const geoBtn = document.querySelector('#geo')


    send.addEventListener('click', sendMessage)
    connectBtn.addEventListener('click', connectToggle)
    geoBtn.addEventListener('click', getGeolocation)

    function getGeolocation() {
        const newMsg = createMessage('Показать моё местоположение', true)
        chat.appendChild(newMsg)
        if(!isConnected) {
            const newMsg = createMessage('Нет соединения с сервером', true)
            newMsg.style.backgroundColor = '#E25151'
            chat.appendChild(newMsg)
        } else if (!navigator.geolocation) {
            const newMsg = createMessage('Определение геолокации недоступно. Проверьте наличие соответствующего разрешения', false)
            newMsg.style.backgroundColor = '#E25151'
            chat.appendChild(newMsg)
        } else {
            const preMsg = createMessage('Определяю ваше местоположение...', false)
            chat.appendChild(preMsg)
            navigator.geolocation.getCurrentPosition(position => {
                const latitude  = position.coords.latitude;
                const longitude = position.coords.longitude;
                const linkMap = `<a target="_blank" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Показать на карте</a>`
                const newMsg = createMessage(`Широта: ${latitude} °, Долгота: ${longitude} °\n${linkMap}`, false)
                chat.appendChild(newMsg)
                }, ()=>{
                const preMsg = createMessage('Не удалось определить местоположение...', false)
                chat.appendChild(preMsg)
                })
        }
    }

    function connectToggle() {
        isConnected = !isConnected
        if(!isConnected) {
            websocket.close()
        } else {
            websocket = new WebSocket("wss://echo.websocket.org/")
            websocket.onopen = function(evt) {
                connectBtn.classList.toggle('connected')
            }
            websocket.onclose = function(evt) {
                connectBtn.classList.toggle('connected')
            }
            websocket.onerror = function(evt) {
                const newMsg = createMessage('Сервер не отвечает', true)
                newMsg.style.backgroundColor = '#E25151'
                chat.appendChild(newMsg)
            }
            websocket.onmessage = function(evt) {
                const newMsg = createMessage(
                    '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>', false
                )
                chat.appendChild(newMsg)
            }
        }
    }


    function sendMessage() {
        // console.log(isConnected)
        if(!text.value) return alert('Введите текст')
        const newMsg = createMessage(text.value, true)
        chat.appendChild(newMsg)
        if (isConnected) websocket.send(text.value)
        text.value = ''
    }

    function createMessage(text, isFromMe) {
        const newMsg = document.createElement('div')
        newMsg.className = isFromMe ? 'msg my_msg' : 'msg guest_msg'
        newMsg.innerHTML = `<p>${text}</p>`
        return newMsg
    }
}

document.addEventListener('DOMContentLoaded', exercise)



/*

const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

btn.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});




*/
