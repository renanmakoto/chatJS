const chatRoom = window.location.pathname.replace(/\//g, '')
const socket = io(`http://localhost:3000/${chatRoom}`)

let user = null

socket.on('update_messages', (messages) => {
    updateMessagesOnScreen(messages)
})

function updateMessagesOnScreen(messages) {
    const div_msgs = document.querySelector('#msgs')
    let msgs_list = '<ul>'
    messages.forEach(message => {
        msgs_list += `<li> ${message.user}: ${message.msg}</li>`
    })
    msgs_list += '</ul>'
    div_msgs.innerHTML = msgs_list
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#msgForm')
    form.addEventListener('submit', (theEvent) => {
        theEvent.preventDefault()
        if (!user) {
            alert('Type an username, please.')
            return
        }

        const message = document.forms['msgFormName']['msgInput'].value
        document.forms['msgFormName']['msgInput'].value = ''
        socket.emit('new_message', { user: user, msg: message })
        console.log(message)
    })

    const userForm = document.querySelector('#userForm')
    userForm.addEventListener('submit', (theEvent) => {
        theEvent.preventDefault()
        user = document.forms['userFormName']['userInput'].value
        userForm.parentNode.removeChild(userForm)
    })
})