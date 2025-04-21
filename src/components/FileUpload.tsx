import React, { useState } from 'react';
import { Upload, FileWarning, FileCheck } from 'lucide-react';

interface FileUploadProps {
  onFileUploaded: (data: string, fileName: string, fileType: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    setSuccess(null);

    const fileType = file.name.split('.').pop()?.toLowerCase();

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        onFileUploaded(content, file.name, fileType || '');
        setSuccess(`Successfully uploaded ${file.name}`);
      } catch (err) {
        setError('Failed to read file content.');
      }
    };

    reader.onerror = () => {
      setError('Failed to read file.');
    };

    reader.readAsText(file);
  };

  return (
    <div
      className={`w-full p-8 border-2 border-dashed rounded-lg text-center transition-all duration-200 ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        Upload your data file
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Drag and drop any file here, or click to browse
      </p>

      <label className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors duration-200">
        Browse Files
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {error && (
        <div className="mt-4 flex items-center justify-center text-red-600">
          <FileWarning className="mr-2 h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-4 flex items-center justify-center text-green-600">
          <FileCheck className="mr-2 h-5 w-5" />
          <p>{success}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
