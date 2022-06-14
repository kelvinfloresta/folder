import { App } from './App/App'
import { BatchApp } from './App/BatchApp'
import { InteractiveApp } from './App/InteractiveApp'
import { Console } from './Logger/Console'

const app = new App([], new Console())
const isInteractive = process.argv.some(arg => arg === '-i')

if (isInteractive) {
  new InteractiveApp(app).start()
} else {
  new BatchApp(app).start()
}
