export interface User {
    id?: number;
    username: string;
    name: string;
    location: string;
    programmingLanguages?: string[];
    followersCount: number;
}
