import { Folder } from './Folder'
import { Command } from './Command'

export class List implements Command {
  private readonly separator = '  '

  constructor(private readonly stdout: (x: string) => void) {
    this.print = this.print.bind(this)
  }

  private print(folders: Folder[], separator: string): string {
    const subSeparator = separator + this.separator
    return folders
      .map(f => {
        if (f.subFolders.length === 0) {
          return `${separator}${f.name}`
        }

        f.subFolders.sort((a, b) => a.name.localeCompare(b.name))

        const subFolders = this.print(f.subFolders, subSeparator)

        return `${separator}${f.name}\n${subFolders}`
      })
      .join('\n')
  }

  execute(folders: Folder[]): void {
    const initialSeparator = ''
    const output = this.print(folders, initialSeparator)
    this.stdout(output)
  }
}
