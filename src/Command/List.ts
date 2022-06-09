import { Folder } from '../Folder'
import { Command } from './Command'

export class List implements Command {
  private readonly separator = '  '

  constructor(private readonly stdout: (x: string) => void) {
    this.print = this.print.bind(this)
  }

  private print(folders: Folder[], separator: string): string {
    const subSeparator = separator + separator
    return folders
      .map((f) => {
        if (f.subFolders.length === 0) {
          return f.name
        }

        const subFolders = this.print(f.subFolders, subSeparator)

        return `${f.name}\n${separator}${subFolders}`
      })
      .join('\n')
  }

  execute(folders: Folder[]): void {
    const output = this.print(folders, this.separator)
    this.stdout(output)
  }
}
