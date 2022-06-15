import { Folder } from './Folder'
import { Command } from './Command'
import { CommandError } from './CommandError'

export class Delete implements Command {
  constructor(private readonly path: string[]) {}

  del(paths: string[], folders: Folder[]): void {
    const [path, ...rest] = paths

    const indexFound = folders.findIndex(f => f.name === path)
    const folderFound = folders[indexFound]

    if (folderFound === undefined) {
      throw new CommandError(
        `Cannot delete ${this.path.join('/')} - ${path} does not exist`,
      )
    }

    if (rest.length !== 0) {
      return this.del(rest, folderFound.subFolders)
    }

    folders.splice(indexFound, 1)
  }

  execute(folders: Folder[]): void {
    this.del(this.path, folders)
  }
}
