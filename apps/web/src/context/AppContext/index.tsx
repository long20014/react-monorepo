'use client';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import AppReducer from './reducer';
import { AppState } from '@/types/common';
import { Action } from './types';

const initialState: AppState = {
  appConfig: { commentMaxDepth: 2 },
  topicSet: {},
};

type AppStateContextType = {
  state: AppState;
  dispatch: Dispatch<Action>;
};

export const AppContext = createContext<AppStateContextType>({
  state: initialState,
  dispatch: () => {},
});

export const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext);

  return { state, dispatch };
};

type ContextProviderProps = {
  children?: ReactNode;
};

export const AppStateProvider: React.FC<ContextProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
