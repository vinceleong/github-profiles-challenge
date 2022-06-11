export interface IUser {
  id?: string;
  name?: string;
  loginName?: string;
  avatarUrl?: string;
  githubUrl?: string;
  role?: string;
  followersCount?: number;
  followingCount?: number;
  publicReposCount: number;
}
