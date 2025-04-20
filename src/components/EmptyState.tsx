import React from 'react';
import { Upload, FileText, Database } from 'lucide-react';

interface EmptyStateProps {
  onUploadClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onUploadClick }) => {
  return (
    <div className="text-center p-12 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <FileText className="h-12 w-12 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create your flashcards</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Upload formatted data and convert it into flashcards for efficient studying
      </p>
      
      <button
        onClick={onUploadClick}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        <Upload className="mr-2 h-5 w-5" />
        Upload File
      </button>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <Upload className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-gray-900">1. Upload data</h3>
          </div>
          <p className="text-sm text-gray-600">
            Upload CSV, JSON, or TXT files containing your study material
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <Database className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-medium text-gray-900">2. Map fields</h3>
          </div>
          <p className="text-sm text-gray-600">
            Select which fields should be used for questions and answers
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 text-teal-600 mr-2" />
            <h3 className="font-medium text-gray-900">3. Study</h3>
          </div>
          <p className="text-sm text-gray-600">
            Start studying with your new flashcards and track your progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;