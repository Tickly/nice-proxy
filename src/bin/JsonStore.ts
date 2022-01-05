import fs from 'fs/promises'

const encoding = 'utf-8'

export default class JsonStore {
  filepath: string

  constructor(filepath: string) {
    this.filepath = filepath
  }

  /**
   * 如果文件不存在，就直接返回一个空对象过去。
   */
  get () {
    return fs.readFile(this.filepath, { encoding })
      .catch(() => {
        return JSON.stringify({})
      })
  }

  set (content: string) {
    return fs.writeFile(this.filepath, content, { encoding })
  }
}