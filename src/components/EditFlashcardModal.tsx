import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Flashcard } from '../types';

interface EditFlashcardModalProps {
  flashcard: Flashcard;
  onSave: (updatedFlashcard: Flashcard) => void;
  onCancel: () => void;
}

const EditFlashcardModal: React.FC<EditFlashcardModalProps> = ({
  flashcard,
  onSave,
  onCancel
}) => {
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);
  const [error, setError] = useState('');

  useEffect(() => {
    // Focus the first input when modal opens
    const timer = setTimeout(() => {
      const input = document.getElementById('question-input');
      if (input) input.focus();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!question.trim()) {
      setError('Question cannot be empty');
      return;
    }
    
    if (!answer.trim()) {
      setError('Answer cannot be empty');
      return;
    }
    
    onSave({
      ...flashcard,
      question: question.trim(),
      answer: answer.trim()
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-800">Edit Flashcard</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-200">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label 
              htmlFor="question-input" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Question
            </label>
            <textarea
              id="question-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Enter the question"
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="answer-input" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Answer
            </label>
            <textarea
              id="answer-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Enter the answer"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFlashcardModal;