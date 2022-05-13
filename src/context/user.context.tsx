import { createContext, useContext, useEffect, useReducer } from 'react';
import { User } from 'firebase/auth';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from 'utils/firebase/firebase.utils';
import { createAction } from 'utils/reducer/reducer.utils';

/* Helper */

const useProviderValue = () => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user: SetUserPayload) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  return { currentUser, setCurrentUser };
};

/* State */
const INITIAL_STATE = {
  currentUser: null,
};

/* Action */
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
} as const;

/* Context */
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

/* Reducer */
const userReducer = (state: UserState, action: UserAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: payload,
      };
    }

    default: {
      throw new Error(`Unhandled type ${type} in userReducer`);
    }
  }
};

/* Provider */
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

type UserState = {
  currentUser: SetUserPayload;
};

type UserAction = {
  type: keyof typeof USER_ACTION_TYPES;
  payload: SetUserPayload;
};

type SetUserPayload = User | null;
