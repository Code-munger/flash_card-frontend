import axios from "axios";
import { Flashcard } from '../types';

export const loadFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const response = await axios.get("http://localhost:3001/api/flashcards");
    return response.data;
  } catch (error) {
    console.error("Failed to load flashcards:", error);
    return [];
  }
};
