import React from 'react';
import { Link } from 'react-router-dom';
import { FolderPlus, BookOpen } from 'lucide-react';
import { loadFlashcards } from '../utils/storage';

const MyDecks: React.FC = () => {
  const flashcards = loadFlashcards();
  const totalCards = flashcards.length;
  const knownCards = flashcards.filter(card => card.known).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Decks</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <FolderPlus className="w-5 h-5 mr-2" />
          Create New Deck
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Default Deck</h2>
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="space-y-2 mb-6">
            <p className="text-gray-600">
              Total Cards: <span className="font-medium">{totalCards}</span>
            </p>
            <p className="text-gray-600">
              Mastered: <span className="font-medium">{knownCards}</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(knownCards / totalCards) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Link
              to="/study"
              className="flex-1 px-4 py-2 bg-purple-600 text-white text-center rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              Study Now
            </Link>
            <Link
              to="/"
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Edit Deck
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDecks;