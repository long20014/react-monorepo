import { TopicSet } from "./topic";

export type AppConfig = {
  commentMaxDepth: number;
};

export type AppState = {
  appConfig: AppConfig;
  topicSet: TopicSet;
};