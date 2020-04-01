import Messages from 'messageformat-runtime/messages'
import en from './messages_en.properties'

const messages = new Messages({ en })

function component() {
  const element = document.createElement('div')
  element.innerHTML = messages.get(
    ['errors', 'format'],
    ['Foo', messages.get(['errors', 'messages', 'wrong_length'], { count: 42 })]
  )
  return element
}

console.log('locale', messages.locale)
console.log('messages', messages.get([]))
if (typeof document !== 'undefined') document.body.appendChild(component())
