import { App } from './App'
import { Console } from './Logger/Console'
import { InteractiveApp } from './InteractiveApp'
import { BatchApp } from './BatchApp'

const app = new App([], new Console())
const isInteractive = process.argv.some(arg => arg === '-i')

if (isInteractive) {
  new InteractiveApp(app).start()
} else {
  new BatchApp(app).start()
}
