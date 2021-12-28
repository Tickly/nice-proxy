import fs from 'fs'
import path from 'path'

const getContent = filename => {
  return fs.readFileSync(path.resolve(process.cwd(), 'nice-proxy', filename), { encoding: 'utf-8' })
}

export const useNiceProxy = (req) => {
  try {
    const config = JSON.parse(getContent('proxy-config.json'))
    const list = JSON.parse(getContent('proxy-list.json'))

    return Reflect.get(list, config.target)
  } catch (err) {
    console.log(err)
  }
}
