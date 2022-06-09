import { App } from './App'
import fs from 'fs/promises'

fs.readFile('input', 'utf-8').then(file => {
  const app = new App([])
  const commands = file.split(/\r?\n/)
  commands.forEach(app.execute)
})
