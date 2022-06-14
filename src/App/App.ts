import { CommandError } from '../Domain/CommandError'
import { CommandBuilder } from '../Domain/CommandBuilder'
import { Folder } from '../Domain/Folder'
import { Logger } from '../Logger/Logger'

export class App {
  private readonly commandBuilder: CommandBuilder

  constructor(public folders: Folder[], private readonly logger: Logger) {
    this.execute = this.execute.bind(this)
    this.commandBuilder = new CommandBuilder(logger)
  }

  public execute(rawCommand: string) {
    const command = this.commandBuilder.build(rawCommand)

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
