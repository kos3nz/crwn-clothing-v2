import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from 'firebase/auth';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from 'utils/firebase/firebase.utils';

const useProviderValue = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return value;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useProviderValue();
  const { setCurrentUser } = value;

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be called within UserProvider');
  }

  return context;
};

/* Types */
type UserContextType = ReturnType<typeof useProviderValue>;
