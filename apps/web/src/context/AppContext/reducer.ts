import { addNewTopicData } from '@/utils/topicHelper';
import { Action, types } from './types';
import { AppState } from '@/types/common';

const AppReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case types.SET_APP_CONFIG:
      return {
        ...state,
        appConfig: action.payload.appConfig,
      };
    case types.STORE_TOPIC_DATA:
      return {
        ...state,
        topicSet: addNewTopicData(state.topicSet, action.payload.topicName, action.payload.topicData),
      };
    default:
      throw new Error('invalid action');
  }
};

export default AppReducer;
