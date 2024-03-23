# Lovely Stay Dev Assessment
This is a simple project to demonstrate the ability
of interacting with the GitHub REST API using Node and TypeScript.

The application is a simple CLI that allows the user to interact with the GitHub API to get information about a user, 
their repositories and programing languages (experimental).

## Instructions
1. Clone the repository
2. Run the following commands (To make the most of the app, be sure to have Docker installed, for convenience, this application has a Makefile with a lot of shortcuts that will make your life easier, but you must have Make installed on your machine):
```bash
    make build
    make run
```
   
3. Follow the Main Menu instructions on the CLI

## Features
- Get user information
- Get user repositories
- List users stored in the local database (previously fetched)

## Technologies
- Node.js
- TypeScript
- Docker
- Jest

## Running the tests
To run the tests, you can use the following command:
```bash
  make test
```

## Technical Debts
- [ ] Add more tests
- [ ] Improve error handling
- [ ] Fix the issue with the programing languages and repositories