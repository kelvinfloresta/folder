import { Folder } from '../Folder'
import { Command } from './Command'

export class Create implements Command {
  private readonly newFolders: string[]

  constructor(arg: string) {
    this.newFolders = arg.split('/')
  }

  private addFolder(newFolders: Folder[], baseFolders: Folder[]): void {
    const [next, ...rest] = newFolders
    if (!next) {
      return
    }

    const existingFolder = baseFolders.find((f) => f.name === next.name)

    if (existingFolder) {
      return this.addFolder(rest, existingFolder.subFolders)
    }

    baseFolders.push(next)

    return this.addFolder(rest, next.subFolders)
  }

  execute(folders: Folder[]) {
    if (this.newFolders.length === 1) {
      return folders.push({ name: this.newFolders[0], subFolders: [] })
    }

    const newFolders = this.newFolders.map<Folder>((f) => ({
      name: f,
      subFolders: [],
    }))

    this.addFolder(newFolders, folders)
  }
}
