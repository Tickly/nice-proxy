#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var path_1 = __importDefault(require("path"));
var copy_dir_1 = __importDefault(require("copy-dir"));
var inquirer_1 = __importDefault(require("inquirer"));
var JsonStore_1 = __importDefault(require("./JsonStore"));
var package_json_1 = __importDefault(require("../../package.json"));
var ListJson = /** @class */ (function () {
    function ListJson(content) {
        this.content = JSON.parse(content);
    }
    ListJson.prototype.getContent = function () {
        return JSON.stringify(this.content);
    };
    ListJson.prototype.list = function () {
        return Object.entries(this.content);
    };
    ListJson.prototype.add = function (_a) {
        var target = _a.target, url = _a.url;
        Reflect.set(this.content, target, url);
    };
    return ListJson;
}());
var ConfigJson = /** @class */ (function () {
    function ConfigJson(json) {
        this.content = JSON.parse(json);
    }
    ConfigJson.prototype.getContent = function () {
        return JSON.stringify(this.content);
    };
    Object.defineProperty(ConfigJson.prototype, "target", {
        get: function () {
            return this.content.target;
        },
        set: function (target) {
            Reflect.set(this.content, 'target', target);
        },
        enumerable: false,
        configurable: true
    });
    return ConfigJson;
}());
var program = new commander_1.Command();
// 版本号
program.version(package_json_1.default.version);
var NiceProxyDir = path_1.default.resolve(process.cwd(), 'nice-proxy');
var listJsonStore = new JsonStore_1.default(path_1.default.resolve(NiceProxyDir, 'proxy-list.json'));
var configJsonStore = new JsonStore_1.default(path_1.default.resolve(NiceProxyDir, 'proxy-config.json'));
program
    .command('init')
    .description('初始化')
    .action(function () {
    // console.log('init')
    var from = path_1.default.resolve(__dirname, '../nice-proxy');
    var to = NiceProxyDir;
    copy_dir_1.default.sync(from, to);
    console.log('初始化成功');
});
program
    .command('list')
    .alias('ls')
    .description('列出所有代理')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var list, listJson, config, configJson, proxies, _i, proxies_1, _a, target, url, used, fmtTarget;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, listJsonStore.get()];
            case 1:
                list = _b.sent();
                listJson = new ListJson(list);
                return [4 /*yield*/, configJsonStore.get()];
            case 2:
                config = _b.sent();
                configJson = new ConfigJson(config);
                proxies = listJson.list();
                console.log();
                for (_i = 0, proxies_1 = proxies; _i < proxies_1.length; _i++) {
                    _a = proxies_1[_i], target = _a[0], url = _a[1];
                    used = configJson.target === target ? '*' : ' ';
                    fmtTarget = target.padEnd(15, '-');
                    console.log(" ".concat(used, " ").concat(fmtTarget, " ").concat(url));
                }
                console.log();
                return [2 /*return*/];
        }
    });
}); });
program
    .command('add')
    .description('添加代理')
    .action(function () {
    // console.log('command add')
    var required = function (value) {
        return value ? true : '必填';
    };
    inquirer_1.default
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
        .then(function (_a) {
        var target = _a.target, url = _a.url;
        return __awaiter(void 0, void 0, void 0, function () {
            var list, listJson;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, listJsonStore.get()];
                    case 1:
                        list = _b.sent();
                        listJson = new ListJson(list);
                        listJson.add({
                            target: target,
                            url: url,
                        });
                        listJsonStore.set(listJson.getContent());
                        console.log('添加成功');
                        return [2 /*return*/];
                }
            });
        });
    });
});
program
    .command('change')
    .description('切换代理')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var list, listJson, targets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, listJsonStore.get()];
            case 1:
                list = _a.sent();
                listJson = new ListJson(list);
                targets = listJson.list();
                inquirer_1.default
                    .prompt({
                    name: 'target',
                    type: 'list',
                    message: '请选择要切换的代理',
                    choices: targets.map(function (_a) {
                        var target = _a[0];
                        return {
                            name: target,
                            value: target,
                        };
                    })
                })
                    .then(function (answers) { return __awaiter(void 0, void 0, void 0, function () {
                    var config, configJson;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, configJsonStore.get()];
                            case 1:
                                config = _a.sent();
                                configJson = new ConfigJson(config);
                                configJson.target = answers.target;
                                configJsonStore.set(configJson.getContent());
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
program.parse();
