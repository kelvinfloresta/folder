export interface Folder {
  readonly name: string
  subFolders: Folder[]
}
