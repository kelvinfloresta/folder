import { Folder } from '../Domain/Folder'

export interface Command {
  execute(folders: Folder[]): void
}
