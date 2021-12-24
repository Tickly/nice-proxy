#!/usr/bin/env node


import { Command } from 'commander'

const program = new Command()

program.parse(process.argv)

program
  .command('init')
  .description('初始化')
  .action(() => {
    console.log('init')
  })

program
  .command('list')
  .description('列出所有代理')
  .action(() => {

  })

program
  .command('add')
  .description('添加代理')
  .action(() => {

  })

program
  .command('target')
  .description('切换代理')
  .action(() => {

  })




console.log('Hello')