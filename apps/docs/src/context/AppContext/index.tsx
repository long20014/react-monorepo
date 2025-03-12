'use client';
import React, { createContext, useContext, useState } from 'react';
import { AppState } from '@/types/common';

export type AppContextType = {
  appState: AppState;
  updateAppState: (newState: AppState) => void;
};

const initialState: AppState = {
  appConfig: { commentMaxDepth: 2 },
  topicSet: {},
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const { appState, updateAppState } = useContext(AppContext) as AppContextType;
  return { appState, updateAppState };
};

export const AppStateProvider: React.FC<any> = (props) => {
  const { children } = props;
  const [appState, setAppState] = useState<AppState>(initialState);

  const updateAppState = (newState: AppState) => {
    setAppState(newState);
  };

  return (
    <AppContext.Provider value={{ appState, updateAppState }}>
      {children}
    </AppContext.Provider>
  );
};
