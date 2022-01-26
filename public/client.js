const socket = io();

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

do {
  name = prompt("Please enter your name !")
}while(!name)

textarea.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter'){
    sendMessage(e.target.value)
  }
})

const sendMessage = (message) => {
  let msg = {
    user: name,
    message: message.trim()
  }
  // append
  appendMessage(msg, 'outgoing_message')
  textarea.value = '';
  scrollToBottom()

  //send to server
  socket.emit('message', msg)
}

const appendMessage = (msg, type) =>{
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, "message")

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `

  mainDiv.innerHTML = markup
  messageArea.appendChild(mainDiv)
}

// Receve Message
socket.on('message', (msg)=>{
  appendMessage(msg, 'incomming_message')
  scrollToBottom()
})

const scrollToBottom = ()=>{
  messageArea.scrollTop = messageArea.scrollHeight
}