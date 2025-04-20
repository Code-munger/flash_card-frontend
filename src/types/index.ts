export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  deckId?: string;
  lastStudied?: Date;
  known?: boolean;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  flashcardCount: number;
  createdAt: Date;
}

export interface StudySession {
  id: string;
  deckId: string;
  startTime: Date;
  endTime?: Date;
  cardsStudied: number;
  cardsCorrect: number;
}