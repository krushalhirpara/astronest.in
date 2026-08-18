// In-memory user store for demo purposes
// In a real app, this would be a database like MongoDB or PostgreSQL

export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Global user storage (resets on server restart)
export const users: UserDB[] = [];
