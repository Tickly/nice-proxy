"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
var JsonStore = /** @class */ (function () {
    function JsonStore(filepath) {
        this.filepath = filepath;
    }
    JsonStore.prototype.get = function () {
        return promises_1.default.readFile(this.filepath, { encoding: 'utf-8' });
    };
    JsonStore.prototype.set = function (content) {
        return promises_1.default.writeFile(this.filepath, content, { encoding: 'utf-8' });
    };
    return JsonStore;
}());
exports.default = JsonStore;
