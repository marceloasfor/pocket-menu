export default interface IUserContext {
    username: string;
    setUsername: React.Dispatch<string>;
    token: string;
    setToken: React.Dispatch<string>;
}