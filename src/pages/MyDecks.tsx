import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderPlus, BookOpen } from 'lucide-react';
import { loadFlashcards } from '../utils/storage';
import { Flashcard } from '../types'; // If you don’t have this type, I’ll help define it

const MyDecks: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadFlashcards();
      setFlashcards(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalCards = flashcards.length;
  const knownCards = flashcards.filter(card => card.mastered).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Decks</h1>
        <Link to="/create" className="px-4 py-2 bg-blue-600 text-white rounded">
          <FolderPlus className="w-5 h-5 mr-2 inline-block" />
          Create New Deck
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Default Deck</h2>
            <BookOpen />
          </div>
          <p>Total Cards: {loading ? '...' : totalCards}</p>
          <p>Mastered: {loading ? '...' : knownCards}</p>
          <div
            className="h-2 bg-green-500 mt-2 rounded-full"
            style={{ width: `${(knownCards / (totalCards || 1)) * 100}%` }}
          />
          <div className="mt-4 flex gap-2">
            <Link to="/study" className="bg-purple-600 text-white px-4 py-2 rounded">Study Now</Link>
            <Link to="/edit" className="bg-gray-100 text-gray-800 px-4 py-2 rounded">Edit Deck</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDecks;
