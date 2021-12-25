import fs from 'fs/promises'

export default {
  get (filepath: string) {
    return fs.readFile(filepath, {
      encoding: 'utf-8'
    })
  },
  set (filepath: string) {

  },
}

