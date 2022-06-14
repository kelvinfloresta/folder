import fs from 'fs/promises'
import { App } from './App'

export class BatchApp {
  constructor(private readonly app: App) {}

  start() {
    fs.readFile('input', 'utf-8').then(file => {
      const commands = file.split(/\r?\n/)
      commands.forEach(this.app.execute)
    })
  }
}
