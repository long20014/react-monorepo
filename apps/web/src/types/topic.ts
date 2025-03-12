
export type Topic = {
  name: string;
  message: {
    data: any;
  };
}

export type TopicSet = {
  [key: string]: Topic;
}

