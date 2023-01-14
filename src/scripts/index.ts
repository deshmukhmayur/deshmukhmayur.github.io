import './icon.component'

const message: string = 'world'

console.log(message)

/* Registering Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}