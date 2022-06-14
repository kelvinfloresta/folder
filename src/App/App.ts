import { Command } from '../Command/Command'
import { CommandError } from '../Command/CommandError'
import { Create } from '../Command/Create'
import { Delete } from '../Command/Delete'
import { List } from '../Command/List'
import { Move } from '../Command/Move'
import { Folder } from '../Folder'
import { Logger } from '../Logger/Logger'

export class App {
  constructor(public folders: Folder[], private readonly logger: Logger) {
    this.execute = this.execute.bind(this)
  }

  private buildCommand(rawCommand: string): Command {
    const [command, ...args] = rawCommand.split(' ')

    switch (command.toLowerCase()) {
      case 'create':
        return new Create(args[0])
      case 'list':
        return new List(this.logger.info)
      case 'move':
        return new Move(args[0], args[1])
      case 'delete':
        return new Delete(args[0])
    }

    throw new CommandError(`Unknow command: ${command}`)
  }

  public execute(rawCommand: string) {
    if (rawCommand === '') {
      return
    }

    const command = this.buildCommand(rawCommand)

    try {
      this.logger.info(rawCommand)
      command.execute(this.folders)
    } catch (e: any) {
      if (e instanceof CommandError) {
        return this.logger.warn(e.message)
      }

      this.logger.error(e)
    }
  }
}
