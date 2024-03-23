import * as db from '../src/db';
import { fetchUser } from '../src/github';
import { User } from '../src/types/User';

// Mock data for user creation
const mockUser: Omit<User, 'programmingLanguages'> = {
    username: 'ikarolaborda',
    name: 'Ikaro Laborda',
    location: 'Portugal',
    followersCount: 0,
};

jest.mock('../src/db', () => ({
    getUserByUsername: jest.fn(),
    createUser: jest.fn(),
}));

describe('createUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Default mock implementations
        (db.getUserByUsername as jest.Mock).mockImplementation(username =>
            Promise.resolve(username === mockUser.username ? null : {...mockUser, id: 1}));
        (db.createUser as jest.Mock).mockImplementation(user => Promise.resolve({...user, id: 1}));
    });

    it('should create and return a new user when user does not exist in db', async () => {
        const userInDbBefore = await db.getUserByUsername(mockUser.username);
        expect(userInDbBefore).toBeNull();

        const fetchedUser = { ...mockUser };
        const createdUser = await db.createUser(fetchedUser);

        expect(db.getUserByUsername).toHaveBeenCalledWith(mockUser.username);
        expect(createdUser).toEqual({...fetchedUser, id: expect.any(Number)});
    });

    it('should return the existing user from db without creating a new one', async () => {
        const existingUser = { ...mockUser, id: 1 };
        (db.getUserByUsername as jest.Mock).mockResolvedValueOnce(existingUser);

        const userInDb = await db.getUserByUsername(mockUser.username);

        expect(userInDb).toEqual(existingUser);
        expect(db.createUser).not.toHaveBeenCalled();
    });
});

