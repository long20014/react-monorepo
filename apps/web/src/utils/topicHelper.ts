import { TopicSet } from "@/types/topic";

export const addNewTopicData = (topicSet: TopicSet, topicName: string, data: any): TopicSet => {
  topicSet[topicName] = {
    name: topicName,
    message: { data }
  };
  return { ...topicSet };
}