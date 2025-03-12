import { Dispatch } from "react";

export const types = {
  SET_APP_CONFIG: 'SET_APP_CONFIG',
  STORE_TOPIC_DATA: 'STORE_TOPIC_DATA',
};

export type Action = {
  type: string;
  payload: any;
}

export type DispatchAction = Dispatch<Action>;
