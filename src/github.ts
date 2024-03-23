import axios from 'axios';
import {User} from "./types/User";


export async function fetchUser(username: string): Promise<User> {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
    const languages = new Set<string>();

    reposResponse.data.forEach((repo: { language: string }) => {
        if (repo.language) languages.add(repo.language);
    });

    return {
        username: response.data.login,
        name: response.data.name,
        location: response.data.location,
        programmingLanguages: Array.from(languages),
        followersCount: response.data.followers,
    };
}

async function fetchUserLanguages(username: string): Promise<Set<string>> {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const languages = new Set<string>();
    response.data.forEach((repo: { language: string }) => {
        if (repo.language) languages.add(repo.language);
    });
    return languages;
}

async function fetchUserFollowersCount(username: string): Promise<number> {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data.followers; // Directly return the followers count
}

