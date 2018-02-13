import messages from './messages_en.properties'
const { format, messages: errors } = messages.errors

function component() {
  const element = document.createElement('div')
  element.innerHTML = format([
    'Your message',
    errors.wrong_length({ count: 42 })
  ])
  return element
}

console.log('messages', messages)
document.body.appendChild(component())
