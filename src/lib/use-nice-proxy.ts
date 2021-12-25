import fs from 'fs'
import path from 'path'

const getContent = filename => {
  return fs.readFileSync(path.resolve(process.cwd(), 'nice-proxy', filename), { encoding: 'utf-8' })
}

export const useNiceProxy = (req) => {
  console.log(Date.now())

  try {
    const config = JSON.parse(getContent('proxy-config.json'))
    const list = JSON.parse(getContent('proxy-list.json'))

    console.log(config)
    console.log(list)

    return Reflect.get(list, config.target)
  } catch (err) {
    console.log(err)
  }
}
