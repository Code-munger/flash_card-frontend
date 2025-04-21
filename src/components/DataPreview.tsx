import React from 'react';
import { Table } from 'lucide-react';

interface Flashcard {
  question: string;
  answer: string;
}

interface DataPreviewProps {
  flashcards: Flashcard[];
  fileName: string;
  onDataMapped: (mappedData: Flashcard[]) => void;
}

const DataPreview: React.FC<DataPreviewProps> = ({ flashcards, fileName, onDataMapped }) => {
  const handleConfirm = () => {
    onDataMapped(flashcards);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Data Preview: {fileName}</h2>
        <div className="flex items-center text-sm text-gray-600">
          <Table className="w-5 h-5 mr-1" />
          {flashcards.length} rows
        </div>
      </div>

      {flashcards.length === 0 ? (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-200">
          No data could be parsed from the file.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Answer</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {flashcards.map((card, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{card.question}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{card.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleConfirm}
          disabled={flashcards.length === 0}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
            flashcards.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Create Flashcards
        </button>
      </div>
    </div>
  );
};

export default DataPreview;
