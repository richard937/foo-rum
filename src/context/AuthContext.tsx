import { createContext, useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";

type User = { 
  name: string;
  email: string;
} | null;

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

const USERS_STORAGE_KEY = "atlys_users";
const CURRENT_USER_KEY = "atlys_current_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // Load current user from localStorage on mount
  useEffect(() => {
    const currentUserStr = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        setUser(currentUser);
      } catch (error) {
        console.error("Error parsing current user:", error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  }, []);

  // Helper function to get all registered users from localStorage
  function getStoredUsers(): StoredUser[] {
    const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersStr) return [];
    try {
      return JSON.parse(usersStr);
    } catch (error) {
      console.error("Error parsing stored users:", error);
      return [];
    }
  }

  // Helper function to save users to localStorage
  function saveUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  // Register a new user
  async function register(name: string, email: string, password: string) {
    const users = getStoredUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error("An account with this email already exists");
    }

    // Add new user
    const newUser: StoredUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    // Set as current user
    const userObj: User = { name, email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userObj));
    setUser(userObj);
  }

  // Login with email and password
  async function login(email: string, password: string) {
    const users = getStoredUsers();
    
    // Find user by email and validate password
    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    // Set as current user
    const userObj: User = { name: foundUser.name, email: foundUser.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userObj));
    setUser(userObj);
  }

  // Logout
  function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


