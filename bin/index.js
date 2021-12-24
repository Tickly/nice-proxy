#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var program = new commander_1.Command();
program.parse(process.argv);
program
    .command('init')
    .description('初始化')
    .action(function () {
    console.log('init');
});
program
    .command('list')
    .description('列出所有代理')
    .action(function () {
});
program
    .command('add')
    .description('添加代理')
    .action(function () {
});
program
    .command('target')
    .description('切换代理')
    .action(function () {
});
console.log('Hello');
