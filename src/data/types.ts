// Types for Grade Nerd Demo content

export interface Topic {
  id: string;
  number: number;
  name: string;
  shortName: string;
  description: string;
  slug: string;
}

export interface Interest {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface ContentSection {
  type: 'heading' | 'paragraph' | 'list' | 'formula' | 'example' | 'calculation' | 'conclusion';
  content: string;
  items?: string[];
  steps?: string[];
}

export interface TopicContent {
  topicId: string;
  interestId: string;
  title: string;
  sections: ContentSection[];
  imagePath: string;
}

export interface ELI5Content {
  topicId: string;
  title: string;
  sections: ContentSection[];
  imagePath: string;
}

export type ViewedTopic = `${string}-${string}`; // topicId-interestId
