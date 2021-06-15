const { program } = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const resolvePath = p => {
  return path.resolve(__dirname, p)
}

function getUsed () {
  const used = require('./nice-proxy/local.json')
  return used.path
}


class ProxyTarget {
  /**
   * 
   * @param {String} name 
   * @param {String} path 
   * @param {String} target 
   */
  constructor (name, path, target) {
    this.name = name
    this.path = path
    this.target = target
  }
}



const DirName = 'nice-proxy'
const DirPath = resolvePath(DirName)
const ListFilePath = path.resolve(DirPath, './list.json')
const LocalFilePath = path.resolve(DirPath, './local.json')

class NiceProxy {
  // 检测目录是否存在
  existsDir (dirPath) {
    return new Promise((resolve, reject) => {
      fs.stat(dirPath, (err, stats) => {
        if (err) {
          console.error(err)
          reject()
        } else {
          if (stats.isDirectory()) {
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  }
  // 创建目录
  mkDir (dirPath) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dirPath, err => {
        if (err) {
          console.error(err)
          reject()
        } else {
          resolve()
        }
      })
    })
  }

  // 读取list
  get () {
    return new Promise((resolve, reject) => {
      fs.readFile(ListFilePath, 'utf-8', (err, data) => {
        if (err) {
          console.error(err)
          return resolve([])
        }

        resolve(JSON.parse(data))
      })
    })
  }

  /**
   * 保存列表文件
   * @param {Array} list 
   */
  saveListFile (list) {
    this.safeDir()
      .then(() => {
        fs.writeFile(ListFilePath, JSON.stringify(list), err => {
          if (err) {
            console.error(err)
            return
          }

          console.log('保存成功')
        })
      })
  }

  /**
   * 确保目录存在
   * @returns {Promise}
   */
  safeDir () {
    // 检测目录是否存在
    return this.existsDir(DirPath)
      // 不存在则创建
      .catch(() => {
        return this.mkDir(DirPath)
      })
  }

  /**
   * @param {Object} local 
   */
  saveLocalFile (local) {
    this.safeDir().then(() => {
      fs.writeFile(LocalFilePath, JSON.stringify(local), err => {
        if (err) {
          console.error(err)
          return
        }

        console.log('切换代理成功')
      })
    })
  }
}


const np = new NiceProxy()

const required = value => {
  return value ? true : '必填'
}

program
  .command('add')
  .description('添加代理')
  .action(() => {
    inquirer
      .prompt([
        {
          name: 'name',
          message: '请输入代理名称，例如：张三',
          validate: required
        },
        {
          name: 'path',
          message: '请输入代理路径，例如：zhangsan',
          validate: required
        },
        {
          name: 'target',
          message: '请输入代理目标，例如：http://127.0.0.1:8080',
          validate: required,
        },
      ])
      .then(async ({ name, path, target }) => {
        const tp = new ProxyTarget(name, path, target)
        const list = await np.get()
        list.push(tp)
        np.saveListFile(list)
      })
  })



program
  .command('list')
  .alias('ls')
  .description('列出所有代理')
  .action(async () => {
    /**
     * @type {ProxyTarget[]}
     */
    const list = await np.get()
    const used = getUsed()
    console.log()
    for (const item of list) {
      const isUsed = item.path === used ? '*' : ' '
      const alias = `${item.name}(${item.path})`.padEnd(15)
      console.log(`${isUsed} ${alias} ${item.target}`)
    }
    console.log()
  })

program
  .command('change')
  .description('切换代理')
  .action(async () => {
    const list = await np.get()
    const used = getUsed()

    inquirer
      .prompt({
        name: 'used',
        type: 'list',
        message: '请选择要切换的代理',
        choices: list.map(v => {
          return {
            name: v.name,
            value: v.path,
          }
        }),
        default: used,
      })
      .then(answers => {
        np.saveLocalFile({
          path: answers.used
        })
      })
  })


program.parse(process.argv)
