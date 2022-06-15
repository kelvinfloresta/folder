import { Logger } from '../Logger/Logger'
import { CommandError } from './CommandError'
import { Create } from './Create'
import { Delete } from './Delete'
import { List } from './List'
import { Move } from './Move'

export class CommandBuilder {
  constructor(private readonly logger: Logger) {}

  private static parsePath(args: string | undefined): string[] {
    if (args === undefined) {
      throw new Error('Invalid Command')
    }

    if (['', '/', '\\'].includes(args)) {
      throw new Error('Invalid Command')
    }

    return args.split('/')
  }

  public build(rawCommand: string) {
    const [command, arg0, arg1] = rawCommand.split(' ')

    if (command === undefined) {
      throw new Error('Invalid Command')
    }

    const commandName = command.toLowerCase()

    switch (commandName) {
      case 'create': {
        const path0 = CommandBuilder.parsePath(arg0)
        return new Create(path0)
      }

      case 'list':
        return new List(this.logger.info)

      case 'move': {
        const path0 = CommandBuilder.parsePath(arg0)
        const path1 = CommandBuilder.parsePath(arg1)
        return new Move(path0, path1)
      }

      case 'delete': {
        const path0 = CommandBuilder.parsePath(arg0)
        return new Delete(path0)
      }
    }

    throw new CommandError(`Unknow command: ${command}`)
  }
}
