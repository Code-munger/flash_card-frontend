import { Flashcard } from '../types';

// Local storage keys
const FLASHCARDS_STORAGE_KEY = 'flashforge_flashcards';

// Save flashcards to local storage
export const saveFlashcards = (flashcards: Flashcard[]): void => {
  localStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(flashcards));
};

// Load flashcards from local storage
export const loadFlashcards = (): Flashcard[] => {
  const savedData = localStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (error) {
      console.error('Failed to parse flashcards from local storage:', error);
      return [];
    }
  }
  return [];
};

// Add a single flashcard
export const addFlashcard = (flashcard: Flashcard): void => {
  const flashcards = loadFlashcards();
  flashcards.push(flashcard);
  saveFlashcards(flashcards);
};

// Add multiple flashcards
export const addFlashcards = (newFlashcards: Flashcard[]): void => {
  const flashcards = loadFlashcards();
  saveFlashcards([...flashcards, ...newFlashcards]);
};

// Update a flashcard
export const updateFlashcard = (updatedFlashcard: Flashcard): void => {
  const flashcards = loadFlashcards();
  const index = flashcards.findIndex(card => card.id === updatedFlashcard.id);
  
  if (index !== -1) {
    flashcards[index] = updatedFlashcard;
    saveFlashcards(flashcards);
  }
};

// Delete a flashcard
export const deleteFlashcard = (flashcardId: string): void => {
  const flashcards = loadFlashcards();
  const filteredFlashcards = flashcards.filter(card => card.id !== flashcardId);
  saveFlashcards(filteredFlashcards);
};

// Delete all flashcards
export const clearFlashcards = (): void => {
  saveFlashcards([]);
};