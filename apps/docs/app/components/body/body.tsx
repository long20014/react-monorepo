'use client';
import React from 'react';
import { useCommunicator } from '@repo/core/communicator';
import { useEffect, useState } from 'react';

const messageFromDoc = 'this is message from docs';

function Body() {
  const { port2 } = useCommunicator();
  const [message, setMessage] = useState('no message received');

  useEffect(() => {
    // port2.postMessage(messageFromDoc);
    // port2.onmessage = (e: any) => {
    //   console.log('msg: ', e.data);
    //   setMessage(e.data);
    // };
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3000') return;
      setMessage(event.data);
      // event?.ports[0]?.postMessage(messageFromDoc);
    };
    const parentElement = window.parent;
    console.log(parentElement);
    parentElement?.postMessage(messageFromDoc, 'http://localhost:3000');
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [message]);

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
