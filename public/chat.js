const socket = io('http://localhost:3000')

socket.on('update_messages', (messages) => {

    updateMessagesOnScreen(messages)

})

function updateMessagesOnScreen(messages) {

    const div_msgs = document.querySelector('#msgs')

    let msgs_list = '<ul>'

    messages.forEach(message => {

        msgs_list += `<li>${message}</li>`
    })

    msgs_list += '</ul>'

    div_msgs.innerHTML = msgs_list
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#msgForm')

    form.addEventListener('submit', (theEvent) => {

        theEvent.preventDefault()

        const message = document.forms['msgFormName']['msgInput'].value

        document.forms['msgFormName']['msgInput'].value = ''

        socket.emit('new_message', { msg: message })

        console.log(message)
    })
})