import React, { createContext, useState, useEffect, useContext } from 'react';
import api, { setAuthToken } from '../api';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const STORAGE_KEY = 'gm_auth_data';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = (token, userData) => {
    if (token && userData) {
      setAuthToken(token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user: userData }));
      setUser(userData);
      return;
    }
    setAuthToken(null);
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    saveSession(response.data.token, response.data.user);

    // Store user data in Firestore
    try {
      const userData = response.data.user;
      const userId = userData.id || userData._id;
      if (userId) {
        await setDoc(doc(db, 'users', userId), {
          name: userData.name,
          email: userData.email,
          role: userData.role,
          lastLogin: new Date().toISOString()
        }, { merge: true });
      }
    } catch (e) {
      // Silent fail - don't break login if Firestore fails
    }

    return response.data.user;
  };

  const signup = async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    saveSession(response.data.token, response.data.user);

    // Store user data in Firestore
    try {
      const userData = response.data.user;
      const userId = userData.id || userData._id;
      if (userId) {
        await setDoc(doc(db, 'users', userId), {
          name: userData.name,
          email: userData.email,
          role: userData.role,
          createdAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (e) {
      // Silent fail - don't break signup if Firestore fails
    }

    return response.data.user;
  };

  const logout = () => {
    saveSession(null, null);
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (!parsed?.token) {
        setLoading(false);
        return;
      }

      setAuthToken(parsed.token);
      api.get('/auth/me')
        .then((response) => {
          setUser(response.data.user);
          saveSession(parsed.token, response.data.user);
        })
        .catch(() => {
          saveSession(null, null);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      saveSession(null, null);
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
