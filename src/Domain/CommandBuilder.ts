import { Logger } from '../Logger/Logger'
import { CommandError } from './CommandError'
import { Create } from './Create'
import { Delete } from './Delete'
import { List } from './List'
import { Move } from './Move'

export class CommandBuilder {
  constructor(private readonly logger: Logger) {}

  public build(rawCommand: string) {
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
}
