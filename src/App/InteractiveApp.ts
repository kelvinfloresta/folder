import readline from 'readline'
import { App } from './App'

export class InteractiveApp {
  constructor(private readonly app: App) {}

  start() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.on('line', command => {
      this.app.execute(command)
    })

    rl.on('close', () => {
      console.log('\nSee you soon!')
      process.exit(0)
    })

    console.log('Waiting for a command... \n')
  }
}
