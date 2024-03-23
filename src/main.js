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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const db_1 = require("./db");
const github_1 = require("./github");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command({
    command: 'fetch',
    describe: 'Fetch user data',
    builder: (yargs) => yargs.option('username', { type: 'string', demandOption: true }),
    handler: (argv) => __awaiter(void 0, void 0, void 0, function* () {
        const githubUser = yield (0, github_1.fetchUser)(argv.username);
        // Process GitHub data, extract languages
        const dbUser = yield (0, db_1.createUser)(githubUser); // assuming languages also stored
        console.log('User created:', dbUser);
    })
})
    .command({
    command: 'list',
    describe: 'List all users',
    handler: () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, db_1.getAllUsers)();
        console.log(users);
    })
})
    .command({
    command: 'list-by-location',
    describe: 'List users by location',
    builder: (yargs) => yargs.option('location', { type: 'string', demandOption: true }),
    handler: (argv) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, db_1.getUsersByLocation)(argv.location);
        console.log(users);
    })
})
    .command({
    command: 'list-user-repos',
    describe: 'List user repositories',
    builder: (yargs) => yargs.option('username', { type: 'string', demandOption: true }),
    handler: (argv) => __awaiter(void 0, void 0, void 0, function* () {
        // Implement listing user repositories using a suitable function from your db module
        const repos = yield (0, db_1.listUserRepositories)(argv.username);
        console.log(repos);
    })
})
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;
