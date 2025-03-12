import { AppConfig } from '@/types/common';
import { Action, types } from './types';

export const setAppConfig = (appConfig: AppConfig) => {
  return {
    type: types.SET_APP_CONFIG,
    payload: {
      appConfig,
    },
  };
};

export const storeTopicData = <T>(topicName: string, topicData: T): Action => {
  return {
    type: types.STORE_TOPIC_DATA,
    payload: {
      topicName,
      topicData,
    },
  };
}