'use client';
import React, { useEffect } from 'react';
import eventManagerService from '../../services/eventManagerService';
import eventBus from '../../services/eventBusServices';
import { storeTopicData } from '@/context/AppContext/action';
import { useAppContext } from '@/context/AppContext';
import { DispatchAction } from '@/context/AppContext/types';
import { TOPIC_NAME } from '@/utils/constants';

export type HeaderEventData = { text: string };

// const broadCastEvent = (text: string) => {
//   eventManagerService.broadcast({
//     name: 'headerEvent',
//     data: {
//       text,
//     },
//   });
// };

const broadCastEvent = (text: string, dispatch: DispatchAction) => {
  // eventBus.dispatch<HeaderEventData>('headerEvent', { text });
  dispatch(storeTopicData(TOPIC_NAME.HEADER_EVENT, { text }));
};

function Header() {
  const { dispatch } = useAppContext();
  useEffect(() => {
    broadCastEvent('1st broadcast from header', dispatch);
    // broadCastEvent('1st broadcast from header');
  }, []);

  return (
    <div>
      <div>Web Header</div>
      <button
        onClick={() => broadCastEvent('2nd broadcast from header', dispatch)}
        // onClick={() => broadCastEvent('2nd broadcast from header')}
      >
        broadcast
      </button>
    </div>
  );
}

export default Header;
