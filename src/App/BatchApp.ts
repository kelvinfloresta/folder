import fs from 'fs/promises'
import { App } from './App'

export class BatchApp {
  constructor(private readonly app: App) {}

  async start() {
    const file = await fs.readFile('input', 'utf-8')

    const commands = file.split(/\r?\n/)
    commands.forEach(this.app.execute)
  }
}
