"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
var encoding = 'utf-8';
var JsonStore = /** @class */ (function () {
    function JsonStore(filepath) {
        this.filepath = filepath;
    }
    /**
     * 如果文件不存在，就直接返回一个空对象过去。
     */
    JsonStore.prototype.get = function () {
        return promises_1.default.readFile(this.filepath, { encoding: encoding })
            .catch(function () {
            return JSON.stringify({});
        });
    };
    JsonStore.prototype.set = function (content) {
        return promises_1.default.writeFile(this.filepath, content, { encoding: encoding });
    };
    return JsonStore;
}());
exports.default = JsonStore;
