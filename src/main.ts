import inquirer from 'inquirer';
import { createUser, getAllUsers, getUsersByLocation, listUserRepositories } from './db';
import { fetchUser } from './github';

async function mainMenu() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                { name: 'Fetch user data', value: 'fetch' },
                { name: 'List all users', value: 'list' },
                { name: 'List users by location', value: 'list-by-location' },
                { name: 'List user repositories', value: 'list-user-repos' },
                { name: 'Exit', value: 'exit' }
            ],
        },
    ]);

    switch (answer.action) {
        case 'fetch':
            await fetchUserData();
            break;
        case 'list':
            const users = await getAllUsers();
            console.log(users);
            break;
        case 'list-by-location':
            await listUsersByLocation();
            break;
        case 'list-user-repos':
            await listRepositories();
            break;
        case 'exit':
            console.log('Exiting...');
            return;
    }

    mainMenu(); // Loop back to main menu unless user exits
}

async function fetchUserData() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter the GitHub username:',
            validate: (input) => !!input || 'Username is required.',
        },
    ]);
    const githubUser = await fetchUser(answers.username);
    const dbUser = await createUser(githubUser); // assuming languages also stored
    console.log('User created:', dbUser);
}

async function listUsersByLocation() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'location',
            message: 'Enter the location to filter by:',
            validate: (input) => !!input || 'Location is required.',
        },
    ]);
    const users = await getUsersByLocation(answers.location);
    console.log(users);
}

async function listRepositories() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter the GitHub username to list repositories for:',
            validate: (input) => !!input || 'Username is required.',
        },
    ]);
    const repos = await listUserRepositories(answers.username);
    console.log(repos);
}

mainMenu().catch(console.error);
