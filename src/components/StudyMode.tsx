import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Flashcard } from '../types';

interface StudyModeProps {
  flashcards: Flashcard[];
  onClose: () => void;
}

const StudyMode: React.FC<StudyModeProps> = ({ flashcards, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 200);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 200);
    }
  };

  const handleMarkKnown = () => {
    const updatedKnown = new Set(knownCards);
    updatedKnown.add(currentCard.id);
    setKnownCards(updatedKnown);
    handleNextCard();
  };

  const handleMarkUnknown = () => {
    const updatedKnown = new Set(knownCards);
    updatedKnown.delete(currentCard.id);
    setKnownCards(updatedKnown);
    handleNextCard();
  };

  const handleResetProgress = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards(new Set());
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        handleCardClick();
      } else if (e.key === 'ArrowRight') {
        handleNextCard();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCard();
      } else if (e.key === 'k') {
        handleMarkKnown();
      } else if (e.key === 'u') {
        handleMarkUnknown();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isFlipped]);

  const isComplete = currentIndex === flashcards.length - 1 && isFlipped;
  const knownCount = knownCards.size;
  const knownPercentage = Math.round((knownCount / flashcards.length) * 100);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Study Mode</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-4 py-2 bg-gray-50">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress: {currentIndex + 1}/{flashcards.length}</span>
            <span>Known: {knownCount}/{flashcards.length} ({knownPercentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="p-8 flex-grow flex items-center justify-center">
          <div
            ref={cardRef}
            className={`w-full max-w-md h-64 cursor-pointer relative transition-transform duration-500 transform-gpu ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleCardClick}
            style={{ perspective: '1000px' }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 flex flex-col justify-center items-center shadow-md transition-transform duration-500 transform-gpu backface-visible-hidden ${
                isFlipped ? 'rotate-y-180 invisible' : ''
              }`}
            >
              <p className="text-xl font-semibold text-center">{currentCard?.question}</p>
              <p className="mt-4 text-sm text-gray-500 text-center">Click to reveal answer</p>
            </div>
            <div
              className={`absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 flex flex-col justify-center items-center shadow-md transition-transform duration-500 transform-gpu backface-visible-hidden rotate-y-180 ${
                isFlipped ? 'visible' : 'invisible'
              }`}
            >
              <p className="text-xl font-semibold text-center">{currentCard?.answer}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-gray-200 flex flex-wrap justify-between items-center bg-gray-50 rounded-b-lg">
          <div className="flex space-x-2">
            <button
              onClick={handlePrevCard}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full ${
                currentIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextCard}
              disabled={currentIndex === flashcards.length - 1 && isFlipped}
              className={`p-2 rounded-full ${
                currentIndex === flashcards.length - 1 && isFlipped
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex space-x-3 mt-2 sm:mt-0">
            <button
              onClick={handleResetProgress}
              className="flex items-center px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </button>
            <button
              onClick={handleMarkKnown}
              className="flex items-center px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              I know this
            </button>
            <button
              onClick={handleMarkUnknown}
              className="flex items-center px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Don't know
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;