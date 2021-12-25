"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
exports.default = {
    get: function (filepath) {
        return promises_1.default.readFile(filepath, {
            encoding: 'utf-8'
        });
    },
    set: function (filepath) {
    },
};
