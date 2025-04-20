import React, { useState, useEffect } from 'react';
import { Table, ChevronRight, ChevronLeft } from 'lucide-react';

interface DataPreviewProps {
  data: string;
  fileType: string;
  fileName: string;
  onDataMapped: (mappedData: Array<{ question: string; answer: string }>) => void;
}

const DataPreview: React.FC<DataPreviewProps> = ({ data, fileType, fileName, onDataMapped }) => {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [questionField, setQuestionField] = useState<string>('');
  const [answerField, setAnswerField] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 5;

  useEffect(() => {
    try {
      let parsed: any[] = [];
      
      if (fileType === 'csv') {
        parsed = parseCSV(data);
      } else if (fileType === 'json') {
        parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) {
          parsed = [parsed]; // Convert object to array if it's not already
        }
      } else if (fileType === 'txt') {
        parsed = parseTXT(data);
      }
      
      if (parsed.length > 0) {
        setParsedData(parsed);
        // Get headers from the first item
        if (typeof parsed[0] === 'object') {
          setHeaders(Object.keys(parsed[0]));
          if (headers.length >= 2) {
            setQuestionField(headers[0]);
            setAnswerField(headers[1]);
          }
        }
      } else {
        setError('No data could be parsed from the file.');
      }
    } catch (err) {
      setError('Failed to parse the file. Please check the file format.');
    }
  }, [data, fileType]);

  const parseCSV = (csvData: string): any[] => {
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const obj: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      
      return obj;
    });
  };

  const parseTXT = (txtData: string): any[] => {
    const lines = txtData.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => {
      const parts = line.split('\t').map(part => part.trim());
      
      if (parts.length >= 2) {
        return {
          question: parts[0],
          answer: parts[1]
        };
      } else {
        return {
          line: line,
          index: index
        };
      }
    });
  };

  const handleCreateFlashcards = () => {
    if (!questionField || !answerField) {
      setError('Please select both question and answer fields.');
      return;
    }
    
    const mappedData = parsedData.map(item => ({
      question: item[questionField] || '',
      answer: item[answerField] || ''
    })).filter(card => card.question && card.answer);
    
    if (mappedData.length === 0) {
      setError('No valid flashcards could be created from the selected fields.');
      return;
    }
    
    onDataMapped(mappedData);
  };

  const totalPages = Math.ceil(parsedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleData = parsedData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Data Preview: {fileName}</h2>
        <div className="flex items-center text-sm text-gray-600">
          <Table className="w-5 h-5 mr-1" />
          {parsedData.length} rows
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-200">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row[header] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-1 rounded border ${
              currentPage === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-1 rounded border ${
              currentPage === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Map Data to Flashcards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Field
            </label>
            <select
              value={questionField}
              onChange={(e) => setQuestionField(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a field</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer Field
            </label>
            <select
              value={answerField}
              onChange={(e) => setAnswerField(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a field</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleCreateFlashcards}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Create Flashcards
        </button>
      </div>
    </div>
  );
};

export default DataPreview;