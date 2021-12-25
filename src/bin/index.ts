#!/usr/bin/env node


import { Command } from 'commander'
import path from 'path'
import copydir from 'copy-dir'
import inquirer from 'inquirer'
import JsonStore from './JsonStore'

class ListJson {
  private content: {
    [key: string]: string
  }

  constructor(content: string) {
    this.content = JSON.parse(content)
  }

  getContent () {
    return JSON.stringify(this.content)
  }

  list () {
    return Object.entries(this.content)
  }

  add ({ target, url }) {
    Reflect.set(this.content, target, url)
  }
}

class ConfigJson {
  private content: {
    target: string
  }

  constructor(json: string) {
    this.content = JSON.parse(json)
  }

  getContent () {
    return JSON.stringify(this.content)
  }

  get target () {
    return this.content.target
  }

  set target (target: string) {
    Reflect.set(this.content, 'target', target)
  }
}

const program = new Command()

const NiceProxyDir = path.resolve(process.cwd(), 'nice-proxy')

const listJsonStore = new JsonStore(path.resolve(NiceProxyDir, 'proxy-list.json'))
const configJsonStore = new JsonStore(path.resolve(NiceProxyDir, 'proxy-config.json'))

program
  .command('init')
  .description('初始化')
  .action(() => {
    // console.log('init')
    const from = path.resolve(__dirname, '../../nice-proxy')
    const to = NiceProxyDir
    copydir.sync(from, to)
    console.log('初始化成功')
  })

program
  .command('list')
  .alias('ls')
  .description('列出所有代理')
  .action(async () => {
    // console.log('command list')

    const list = await listJsonStore.get()
    const listJson = new ListJson(list)


    const config = await configJsonStore.get()
    const configJson = new ConfigJson(config)


    const proxies = listJson.list()

    console.log()
    for (const [target, url] of proxies) {
      const used = configJson.target === target ? '*' : ' '
      // 格式化输出
      const fmtTarget = target.padEnd(15, '-')

      console.log(` ${used} ${fmtTarget} ${url}`)
    }
    console.log()
  })

program
  .command('add')
  .description('添加代理')
  .action(() => {
    // console.log('command add')

    const required = value => {
      return value ? true : '必填'
    }

    inquirer
      .prompt([
        {
          name: 'target',
          message: '请输入代理名称，方便区分。例如：test',
          validate: required,
        },
        {
          name: 'url',
          message: '请输入代理地址。例如：http://localhost:3000/test',
          validate: required,
        },
      ])
      .then(async ({ target, url }) => {

        const list = await listJsonStore.get()
        const listJson = new ListJson(list)

        listJson.add({
          target,
          url,
        })

        listJsonStore.set(listJson.getContent())

        console.log('添加成功')
      })
  })

program
  .command('change')
  .description('切换代理')
  .action(async () => {
    // console.log('change proxy')
    const list = await listJsonStore.get()
    const listJson = new ListJson(list)

    const targets = listJson.list()

    inquirer
      .prompt({
        name: 'target',
        type: 'list',
        message: '请选择要切换的代理',
        choices: targets.map(([target]) => {
          return {
            name: target,
            value: target,
          }
        })
      })
      .then(async answers => {
        // console.log(answers.target)

        const config = await configJsonStore.get()
        const configJson = new ConfigJson(config)

        configJson.target = answers.target

        configJsonStore.set(configJson.getContent())
      })
  })

program.parse()