'use client';
import React from 'react';
import { useEffect, useState } from 'react';

const firstMessageFromDoc = 'this is 1st message from docs';

function Body() {
  const [isInit, setIsInit] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [message, setMessage] = useState('no message received');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3000') return;
      setMessage(`${event.data} (id: ${event.lastEventId})`);
      if (!isConnect) {
        setIsConnect(true);
      }
      // event?.ports[0]?.postMessage(messageFromDoc);
    };
    if (!isInit && !isConnect) {
      setIsInit(true);
      const parentElement = window.parent;
      parentElement?.postMessage(firstMessageFromDoc, 'http://localhost:3000');
    }
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [message, isConnect]);

  return (
    <div>
      <div>{'this is doc'}</div>
      <div>{message}</div>
      <button
        onClick={() => {
          const parentElement = window.parent;
          parentElement?.postMessage(
            'new message from doc',
            'http://localhost:3000'
          );
        }}
      >
        {'Send message to web'}
      </button>
    </div>
  );
}

export default Body;
