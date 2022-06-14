import { Logger } from '../Logger/Logger'
import { CommandError } from './Command/CommandError'
import { Create } from './Command/Create'
import { Delete } from './Command/Delete'
import { List } from './Command/List'
import { Move } from './Command/Move'

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
