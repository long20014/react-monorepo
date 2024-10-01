'use client';
import React from 'react';
import { useCommunicator } from '@repo/core/communicator';
import { useEffect, useState } from 'react';
import eventManagerService from '../../services/eventManagerService';
import eventBus from '../../services/eventBusServices';

const firstMessageFromWeb = 'this is 1st message from web';
export const wait = (second: number) =>
  new Promise((res) => setTimeout(res, second * 1000));

function Body() {
  const { port1, port2 } = useCommunicator();
  const [isConnect, setIsConnect] = useState(false);
  const [isFirstMsgPosted, setIsFirstMsgPosted] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [message, setMessage] = useState('no message receive');
  const [messageFromSub, setMessageFromSub] = useState('No message from sub');

  useEffect(() => {
    const handleHandShakeMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3001') return;
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

  useEffect(() => {
    // const headerSubscriber = eventManagerService.subscribe(
    //   'headerEvent',
    //   (event: any) => {
    //     console.log(event);
    //     setMessageFromSub(event.data.text);
    //   }
    // );
    // return () => {
    //   eventManagerService.destroy(headerSubscriber);
    // };
    eventBus.on('headerEvent', (data: any) => {
      console.log(data);
      setMessageFromSub(data.text);
    });
    return () => {
      eventBus.remove('headerEvent');
    };
  }, []);

  return (
    <div style={{ marginTop: '10px' }}>
      <div>{'this is web'}</div>
      <div>{message}</div>
      <div>{messageFromSub}</div>
      <button
        onClick={() => {
          let iframeElement = document.querySelector('iframe');
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
