import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FileUpload from '../components/FileUpload';
import DataPreview from '../components/DataPreview';
import FlashcardList from '../components/FlashcardList';
import StudyMode from '../components/StudyMode';
import EmptyState from '../components/EmptyState';
import EditFlashcardModal from '../components/EditFlashcardModal';
import { Flashcard } from '../types';
import { loadFlashcards, saveFlashcards, deleteFlashcard, updateFlashcard } from '../utils/storage';

const Home: React.FC = () => {
  const [step, setStep] = useState<'empty' | 'upload' | 'preview' | 'list'>('empty');
  const [fileData, setFileData] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  useEffect(() => {
    const savedFlashcards = loadFlashcards();
    if (savedFlashcards.length > 0) {
      setFlashcards(savedFlashcards);
      setStep('list');
    }
  }, []);

  const handleFileUploaded = (data: string, name: string, type: string) => {
    setFileData(data);
    setFileName(name);
    setFileType(type);
    setStep('preview');
  };

  const handleDataMapped = (mappedData: Array<{ question: string; answer: string }>) => {
    const newFlashcards = mappedData.map(card => ({
      id: uuidv4(),
      question: card.question,
      answer: card.answer,
      lastStudied: undefined,
      known: false
    }));
    
    const updatedFlashcards = [...flashcards, ...newFlashcards];
    setFlashcards(updatedFlashcards);
    saveFlashcards(updatedFlashcards);
    setStep('list');
  };

  const handleDeleteFlashcard = (id: string) => {
    const updatedFlashcards = flashcards.filter(card => card.id !== id);
    setFlashcards(updatedFlashcards);
    deleteFlashcard(id);
    
    if (updatedFlashcards.length === 0) {
      setStep('empty');
    }
  };

  const handleEditFlashcard = (id: string) => {
    const cardToEdit = flashcards.find(card => card.id === id);
    if (cardToEdit) {
      setEditingCard(cardToEdit);
    }
  };

  const handleSaveEdit = (updatedCard: Flashcard) => {
    const updatedFlashcards = flashcards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    );
    
    setFlashcards(updatedFlashcards);
    updateFlashcard(updatedCard);
    setEditingCard(null);
  };

  const handleCreateNew = () => {
    setFileData('');
    setFileName('');
    setFileType('');
    setStep('upload');
  };

  return (
    <>
      {step === 'empty' && (
        <EmptyState onUploadClick={() => setStep('upload')} />
      )}
      
      {step === 'upload' && (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Upload Your Data</h1>
          <FileUpload onFileUploaded={handleFileUploaded} />
        </div>
      )}
      
      {step === 'preview' && fileData && (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Configure Your Flashcards</h1>
          <DataPreview 
            data={fileData}
            fileName={fileName}
            fileType={fileType}
            onDataMapped={handleDataMapped}
          />
        </div>
      )}
      
      {step === 'list' && (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Your Flashcard Deck</h1>
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add More Cards
            </button>
          </div>
          
          <FlashcardList 
            flashcards={flashcards}
            onStartStudy={() => setStudyMode(true)}
            onDelete={handleDeleteFlashcard}
            onEdit={handleEditFlashcard}
          />
        </div>
      )}
      
      {studyMode && (
        <StudyMode 
          flashcards={flashcards}
          onClose={() => setStudyMode(false)}
        />
      )}
      
      {editingCard && (
        <EditFlashcardModal 
          flashcard={editingCard}
          onSave={handleSaveEdit}
          onCancel={() => setEditingCard(null)}
        />
      )}
    </>
  );
};

export default Home;