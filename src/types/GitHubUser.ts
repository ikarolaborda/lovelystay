export default interface GitHubUser {
    login: string;
    name: string;
    location: string;
    languages: Set<string>;
    followersCount: number;
}