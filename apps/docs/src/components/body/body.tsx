'use client';
import { useAppContext } from '@/context/AppContext';
import { TOPIC_NAME } from '@/utils/constants';
import React from 'react';
import { useEffect, useState } from 'react';

const firstMessageFromDoc = 'this is 1st message from docs';

function Body() {
  const [isInit, setIsInit] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [message, setMessage] = useState('no message received');
  const [messageFromSub, setMessageFromSub] = useState('No message from sub');
  const { appState } = useAppContext();

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

  useEffect(() => {
    const headerEvent = appState.topicSet[TOPIC_NAME.HEADER_EVENT];
    if (headerEvent) {
      const data = headerEvent.data as { text: string };
      setMessageFromSub(data.text);
    }
  }, [appState.topicSet[TOPIC_NAME.HEADER_EVENT]]);

  return (
    <div>
      <div>{'this is doc'}</div>
      <div>{message}</div>
      <div>{messageFromSub}</div>
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
