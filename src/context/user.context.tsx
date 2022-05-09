import { User } from 'firebase/auth';
import { createContext, useContext, useMemo, useState } from 'react';

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
