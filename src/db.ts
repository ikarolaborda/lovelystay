import pgp from 'pg-promise';
import dbConfig from './config';
import { User } from './types/User';

const db = pgp()(dbConfig);

export async function createUser(user: User): Promise<User> {
    const nameToInsert = user.name || user.username;

    return db.tx(async t => {
        const insertedUser = await t.one(
            'INSERT INTO users(username, name, location, followers_count) VALUES($1, $2, $3, $4) RETURNING *',
            [user.username, nameToInsert, user.location, user.followersCount]
        );

        if (user.programmingLanguages && user.programmingLanguages.length > 0) {
            const validLanguages = user.programmingLanguages.filter(lang => lang != null && lang.trim() !== '');

            for (const language of validLanguages) {

                let langId = await t.oneOrNone(
                    `INSERT INTO programming_languages(name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`,
                    [language]
                );

                if (!langId) {
                    langId = await t.oneOrNone('SELECT id FROM programming_languages WHERE name = $1', [language]);
                }

                if (langId && langId.id) {
                    await t.none(
                        `INSERT INTO user_programming_languages(user_id, programming_language_id) VALUES ($1, $2)`,
                        [insertedUser.id, langId.id]
                    );
                } else {
                    console.error(`Failed to find or insert programming language: ${language}`);
                }
            }
        }

        return insertedUser;
    });
}

export async function getAllUsers(): Promise<User[]> {
    return db.any('SELECT * FROM users');
}

export async function getUserByUsername(username: string): Promise<User | null> {
    return db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
}


export async function getUsersByLocation(location: string): Promise<User[]> {
    const locationPattern = `%${location}%`;
    return db.any('SELECT * FROM users WHERE location LIKE $1', [locationPattern]);
}

export async function listUserRepositories(username: string): Promise<string[]> {
    return db.any(
        'SELECT r.name FROM repositories r JOIN users u ON r.user_id = u.id WHERE u.username = $1',
        [username]
    ).then(repos => repos.map(repo => repo.name));
}

