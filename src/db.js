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
exports.listUserRepositories = exports.getUsersByLocation = exports.getAllUsers = exports.createUser = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const config_1 = __importDefault(require("./config"));
const db = (0, pg_promise_1.default)()(config_1.default);
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.tx((t) => __awaiter(this, void 0, void 0, function* () {
            const insertedUser = yield t.one('INSERT INTO users(username, name, location, followers_count) VALUES($1, $2, $3, $4) RETURNING *', [user.username, user.name, user.location, user.followersCount]);
            for (const language of user.programmingLanguages) {
                let langId = yield t.oneOrNone('SELECT id FROM programming_languages WHERE language = $1', language);
                if (!langId) {
                    langId = yield t.one('INSERT INTO programming_languages(language) VALUES($1) RETURNING id', language);
                }
                yield t.none('INSERT INTO user_programming_languages(user_id, programming_language_id) VALUES($1, $2)', [insertedUser.id, langId.id]);
            }
            return insertedUser;
        }));
    });
}
exports.createUser = createUser;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return db.any('SELECT * FROM users');
    });
}
exports.getAllUsers = getAllUsers;
function getUsersByLocation(location) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.any('SELECT * FROM users WHERE location = $1', [location]);
    });
}
exports.getUsersByLocation = getUsersByLocation;
function listUserRepositories(username) {
    return __awaiter(this, void 0, void 0, function* () {
        // Implement listing user repositories using a suitable function from your db module
        return [];
    });
}
exports.listUserRepositories = listUserRepositories;
