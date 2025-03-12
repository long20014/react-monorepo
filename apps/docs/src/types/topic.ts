
export type Topic = {
  name: string;
  message: {
    data: unknown;
  };
}

export type TopicSet = {
  [key: string]: Topic;
}

