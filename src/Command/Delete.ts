import { Folder } from '../Domain/Folder'
import { Command } from './Command'
import { CommandError } from './CommandError'

export class Delete implements Command {
  private readonly path: string[]

  constructor(private readonly args: string) {
    this.path = args.split('/')
  }

  del(paths: string[], folders: Folder[]): void {
    const [path, ...rest] = paths

    const indexFound = folders.findIndex(f => f.name === path)
    if (indexFound === -1) {
      throw new CommandError(
        `Cannot delete ${this.args} - ${path} does not exist`,
      )
    }

    if (rest.length !== 0) {
      return this.del(rest, folders[indexFound].subFolders)
    }

    folders.splice(indexFound, 1)
  }

  execute(folders: Folder[]): void {
    this.del(this.path, folders)
  }
}
