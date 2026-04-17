export interface ReadingLesson {
  lesson: number;
  newWord: string;
  collectionSize: number;
  versions: string[];
}

export interface WordToken {
  display: string;
  normalized: string;
}
