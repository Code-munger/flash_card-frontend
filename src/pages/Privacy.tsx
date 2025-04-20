import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-blue">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Collection and Usage</h2>
          <p className="text-gray-600 mb-4">
            FlashForge is committed to protecting your privacy. We only store your flashcards locally in your browser's storage and do not collect any personal information.
          </p>
          <p className="text-gray-600 mb-4">
            Your study data and flashcards remain on your device and are never transmitted to our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Local Storage</h2>
          <p className="text-gray-600 mb-4">
            We use your browser's local storage to save:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Flashcard content</li>
            <li>Study progress</li>
            <li>User preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
          <p className="text-gray-600 mb-4">
            Since all data is stored locally, you have complete control over your information. You can clear your browser data at any time to remove all stored flashcards and preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about our privacy policy, please contact us through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;