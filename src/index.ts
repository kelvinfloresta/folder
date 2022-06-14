import { App } from './App'
import fs from 'fs/promises'
import { Console } from './Logger/Console'

fs.readFile('input', 'utf-8').then(file => {
  const app = new App([], new Console())
  const commands = file.split(/\r?\n/)
  commands.forEach(app.execute)
})
