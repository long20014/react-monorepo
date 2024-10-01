'use client';
import React, { useEffect } from 'react';
import eventManagerService from '../../services/eventManagerService';
import eventBus from '../../services/eventBusServices';

const broadCastEvent = (text: string) => {
  // eventManagerService.broadcast({
  //   name: 'headerEvent',
  //   data: {
  //     text,
  //   },
  // });
  eventBus.dispatch('headerEvent', { text });
};

function Header() {
  useEffect(() => {
    broadCastEvent('1st broadcast from header');
  }, []);

  return (
    <div>
      <div>Header</div>
      <button onClick={() => broadCastEvent('2nd broadcast from header')}>
        broadcast
      </button>
    </div>
  );
}

export default Header;
