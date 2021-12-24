const { Command } = require('commander');

const program = new Command()

program
  .command('abc')
  .action(() => {
    console.log('abcd')
  })

console.log(program)
console.log(process.argv)

program.parse(process.argv)