import React from 'react';
import { Trash2, Edit, Clock } from 'lucide-react';
import { Flashcard } from '../types';

interface FlashcardListProps {
  flashcards: Flashcard[];
  onStartStudy: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const FlashcardList: React.FC<FlashcardListProps> = ({ 
  flashcards, 
  onStartStudy,
  onDelete,
  onEdit
}) => {
  if (flashcards.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Flashcards</h2>
        <button
          onClick={onStartStudy}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center"
        >
          <Clock className="w-5 h-5 mr-2" />
          Start Studying
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {flashcards.map((card, index) => (
            <li key={card.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">
                    {index + 1}. {card.question}
                  </p>
                  <p className="text-gray-500 mt-1">{card.answer}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(card.id)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors duration-150"
                    aria-label="Edit flashcard"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(card.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors duration-150"
                    aria-label="Delete flashcard"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlashcardList;