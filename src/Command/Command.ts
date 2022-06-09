import { Folder } from '../Folder'

export interface Command {
  execute(folders: Folder[]): void
}
