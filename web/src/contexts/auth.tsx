import { createContext, useEffect, useState } from 'react';

// backend
import { api } from '../services/api';

// types
import type { ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthResponse = {
  token: string;
  user: User;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>({
  user: {
    id: '',
    name: '',
    login: '',
    avatar_url: '',
  },
  signInUrl: '',
  signOut() {},
});

type AuthProvider = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }`;

  async function signIn(gitHubCode: string) {
    const {
      data: { token, user },
    } = await api.post<AuthResponse>('authenticate', { code: gitHubCode });

    localStorage.setItem('@dowhile:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then((response) => setUser(response.data));
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGitHubCode = url.includes('?code=');

    if (hasGitHubCode) {
      const [urlWithoutCode, gitHubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(gitHubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
