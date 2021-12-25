import fs from 'fs/promises'

export default class JsonStore {
  filepath: string

  constructor(filepath: string) {
    this.filepath = filepath
  }

  get () {
    return fs.readFile(this.filepath, { encoding: 'utf-8' })
  }

  set (content: string) {
    return fs.writeFile(this.filepath, content, { encoding: 'utf-8' })
  }
}