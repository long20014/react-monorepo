'use client';
import { useAppContext } from '@/context/AppContext';
import { AppState } from '@/types/common';
import { TOPIC_NAME } from '@/utils/constants';
import { addNewTopicData } from '@/utils/topicHelper';
import React, { useEffect } from 'react';

export type HeaderEventData = { text: string };

const broadCastEvent = (
  text: string,
  updateAppState: any,
  appState: AppState
) => {
  updateAppState({
    ...appState,
    topicSet: addNewTopicData(appState.topicSet, TOPIC_NAME.HEADER_EVENT, {
      text,
    }),
  });
};

function Header() {
  const { appState, updateAppState } = useAppContext();
  useEffect(() => {
    broadCastEvent('1st broadcast from header', updateAppState, appState);
  }, []);

  return (
    <div>
      <div>Doc Header</div>
      <button
        onClick={() =>
          broadCastEvent('2nd broadcast from header', updateAppState, appState)
        }
      >
        broadcast
      </button>
    </div>
  );
}

export default Header;
