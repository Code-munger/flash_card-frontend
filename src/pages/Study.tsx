import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Trophy } from 'lucide-react';
import { loadFlashcards } from '../utils/storage';
import StudyMode from '../components/StudyMode';

const Study: React.FC = () => {
  const [isStudying, setIsStudying] = useState(false);
  const flashcards = loadFlashcards();
  const totalCards = flashcards.length;
  const knownCards = flashcards.filter(card => card.known).length;
  const progress = Math.round((knownCards / totalCards) * 100) || 0;

  if (isStudying) {
    return <StudyMode flashcards={flashcards} onClose={() => setIsStudying(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Study Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Progress</h2>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{progress}%</div>
          <p className="text-gray-600">Cards mastered: {knownCards} of {totalCards}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Study Time</h2>
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {totalCards > 0 ? `~${Math.ceil(totalCards * 0.5)} min` : '0 min'}
          </div>
          <p className="text-gray-600">Estimated time to complete deck</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Start Studying</h2>
        
        {totalCards > 0 ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              You have {totalCards} cards ready for review. Continue your progress!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsStudying(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
              >
                Start Study Session
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Edit Cards
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              You don't have any flashcards yet. Create some to start studying!
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
            >
              Create Flashcards
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Study;