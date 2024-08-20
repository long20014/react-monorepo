'use client';
import React from 'react';
import { useCommunicator } from '@repo/core/communicator';
import { useEffect, useState } from 'react';

const firstMessageFromWeb = 'this is 1st message from web';
export const wait = (second: number) =>
  new Promise((res) => setTimeout(res, second * 1000));

function Body() {
  const { port1, port2 } = useCommunicator();
  const [isConnect, setIsConnect] = useState(false);
  const [isFirstMsgPosted, setIsFirstMsgPosted] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [message, setMessage] = useState('no message receive');

  useEffect(() => {
    const handleHandShakeMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3001') return;
      console.log('connected to doc');
      setMessage(`${event.data} (id: ${event.lastEventId})`);
      if (!isConnect) {
        setIsConnect(true);
      }
    };

    const postMessage = async () => {
      // let iframeElement = document.querySelector('iframe');
      // iframeElement?.contentWindow?.postMessage(
      //   messageFromWeb,
      //   'http://localhost:3001'
      // );
      let iframeWindow = window?.top?.frames[0];
      iframeWindow?.postMessage(firstMessageFromWeb, 'http://localhost:3001');
    };
    if (!isInit) {
      setIsInit(true);
    }
    if (isConnect && !isFirstMsgPosted) {
      postMessage();
      setIsFirstMsgPosted(true);
    }
    window.addEventListener('message', handleHandShakeMessage, false);
    // let iframeElement = document.querySelector('iframe');
    // const onMessage = (e: MessageEvent) => {
    //   console.log('msg: ', e.data);
    //   setMessage(e.data);
    // };
    // const onLoad = () => {
    //   // Listen for messages on port1
    //   port1.onmessage = onMessage;

    //   // Transfer port2 to the iframe
    //   iframeElement?.contentWindow?.postMessage(
    //     messageFromWeb,
    //     'http://localhost:3001',
    //     [port2]
    //   );
    // };
    // iframeElement?.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('message', handleHandShakeMessage);
    };
  }, [message]);

  return (
    <div>
      <div>{'this is web'}</div>
      <div>{message}</div>
      <button
        onClick={() => {
          let iframeElement = document.querySelector('iframe');
          console.log(iframeElement);
          iframeElement?.contentWindow?.postMessage(
            'new message from web',
            'http://localhost:3001'
          );
        }}
      >
        {'Send message to doc'}
      </button>
      <div>
        <iframe src='http://localhost:3001'></iframe>
      </div>
    </div>
  );
}

export default Body;
