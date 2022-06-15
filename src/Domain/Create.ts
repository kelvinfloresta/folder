import { Folder } from './Folder'
import { Command } from './Command'

export class Create implements Command {
  constructor(private readonly newFolders: string[]) {}

  private addFolder(newFolders: Folder[], baseFolders: Folder[]): void {
    const [next, ...rest] = newFolders
    if (!next) {
      return
    }

    const existingFolder = baseFolders.find(f => f.name === next.name)

    if (existingFolder) {
      return this.addFolder(rest, existingFolder.subFolders)
    }

    baseFolders.push(next)

    return this.addFolder(rest, next.subFolders)
  }

  execute(folders: Folder[]) {
    const newFolders = this.newFolders.map<Folder>(f => ({
      name: f,
      subFolders: [],
    }))

    this.addFolder(newFolders, folders)
  }
}
