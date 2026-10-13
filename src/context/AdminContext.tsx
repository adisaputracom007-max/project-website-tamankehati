import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (pinOrPassword: string) => boolean;
  logout: () => void;
}

const ADMIN_STORAGE_KEY = 'taman_kehati_admin_session';

// Allowed default passwords / PINs for DLH Kabupaten Mesuji admin
const VALID_PASSWORDS = ['admin123', 'kehatimesuji', 'mesuji2026', 'admin'];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync admin state to localStorage
  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      } else {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving admin session', e);
    }
  }, [isAdmin]);

  // Hidden admin access triggers (No visible button in public)
  // 1. Keyboard Shortcut: Ctrl + Shift + A (or Alt + Shift + A)
  // 2. URL parameter / hash: ?admin=login, ?admin=true, or #admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsLoginModalOpen(true);
      }
    };

    const checkSecretUrlParam = () => {
      if (typeof window !== 'undefined') {
        const search = window.location.search.toLowerCase();
        const hash = window.location.hash.toLowerCase();
        if (search.includes('admin') || hash === '#admin') {
          setIsLoginModalOpen(true);
        }
      }
    };

    checkSecretUrlParam();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkSecretUrlParam);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkSecretUrlParam);
    };
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (input: string): boolean => {
    const trimmed = input.trim().toLowerCase();
    if (VALID_PASSWORDS.includes(trimmed)) {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      // Clean up secret url hash if present
      if (window.location.hash === '#admin') {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
