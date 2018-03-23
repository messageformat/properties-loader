import en from './messages_en.properties'
import MessageFormat from 'messageformat/lib/get'
const messages = new MessageFormat({ en })

function component() {
  const element = document.createElement('div')
  element.innerHTML = messages.get(['errors', 'format'], [
    'Your message',
    messages.get(['errors', 'messages', 'wrong_length'], { count: 42 })
  ])
  return element
}

console.log('messages', messages.get([]))
document.body.appendChild(component())
