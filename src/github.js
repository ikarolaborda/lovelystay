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
exports.fetchUser = void 0;
const axios_1 = __importDefault(require("axios"));
function fetchUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://api.github.com/users/${username}`);
        const reposResponse = yield axios_1.default.get(`https://api.github.com/users/${username}/repos`);
        const languages = new Set();
        reposResponse.data.forEach((repo) => {
            if (repo.language)
                languages.add(repo.language);
        });
        return {
            username: response.data.login,
            name: response.data.name,
            location: response.data.location,
            programmingLanguages: Array.from(languages),
            followersCount: response.data.followers,
        };
    });
}
exports.fetchUser = fetchUser;
function fetchUserLanguages(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://api.github.com/users/${username}/repos`);
        const languages = new Set();
        response.data.forEach((repo) => {
            if (repo.language)
                languages.add(repo.language);
        });
        return languages;
    });
}
function fetchUserFollowersCount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://api.github.com/users/${username}`);
        return response.data.followers; // Directly return the followers count
    });
}
