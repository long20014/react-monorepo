'use client';
import React from 'react';
import { useCommunicator } from '@repo/core/communicator';
import { useEffect, useState } from 'react';

const firstMessageFromDoc = 'this is 1st message from docs';

function Body() {
  const { port2 } = useCommunicator();
  const [isInit, setIsInit] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [isFirstMsgPosted, setIsFirstMsgPosted] = useState(false);
  const [message, setMessage] = useState('no message received');

  useEffect(() => {
    // port2.postMessage(messageFromDoc);
    // port2.onmessage = (e: any) => {
    //   console.log('msg: ', e.data);
    //   setMessage(e.data);
    // };
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
      console.log(parentElement);
      parentElement?.postMessage(firstMessageFromDoc, 'http://localhost:3000');
      setIsFirstMsgPosted(true);
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
          console.log(parentElement);
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
