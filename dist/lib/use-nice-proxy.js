"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNiceProxy = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var getContent = function (filename) {
    return fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), 'nice-proxy', filename), { encoding: 'utf-8' });
};
var useNiceProxy = function (req) {
    try {
        var config = JSON.parse(getContent('proxy-config.json'));
        var list = JSON.parse(getContent('proxy-list.json'));
        return Reflect.get(list, config.target);
    }
    catch (err) {
        console.log(err);
    }
};
exports.useNiceProxy = useNiceProxy;
