import { Folder } from '../Folder'
import { Command } from './Command'
import { CommandError } from './CommandError'

export class Move implements Command {
  private readonly origin: string[]
  private readonly destination: string[]

  constructor(origin: string, destination: string) {
    this.origin = origin.split('/')
    this.destination = destination.split('/')
  }

  findFolder(paths: string[], folders: Folder[]): Folder {
    const [path, ...rest] = paths
    const found = folders.find(f => f.name === path)

    if (!found) {
      throw new CommandError(`Path not found`)
    }

    if (rest.length > 0) {
      return this.findFolder(rest, found.subFolders)
    }

    return found
  }

  findAndRemove(paths: string[], folders: Folder[]): Folder {
    const [path, ...rest] = paths
    const indexFound = folders.findIndex(f => f.name === path)

    if (indexFound === -1) {
      throw new CommandError(`Path not found`)
    }

    const folderFound = folders[indexFound]
    if (rest.length > 0) {
      return this.findAndRemove(rest, folderFound.subFolders)
    }

    folders.splice(indexFound, 1)

    return folderFound
  }

  execute(folders: Folder[]): void {
    const dest = this.findFolder(this.destination, folders)
    const origin = this.findAndRemove(this.origin, folders)
    dest.subFolders.push(origin)
  }
}
