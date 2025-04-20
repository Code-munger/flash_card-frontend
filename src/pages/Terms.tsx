import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-blue">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and using FlashForge, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use License</h2>
          <p className="text-gray-600 mb-4">
            Permission is granted to temporarily use FlashForge for personal, non-commercial study purposes only. This is the grant of a license, not a transfer of title.
          </p>
          <p className="text-gray-600 mb-4">
            Under this license you may not:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to reverse engineer any software contained within FlashForge</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
          <p className="text-gray-600 mb-4">
            The materials on FlashForge are provided on an 'as is' basis. FlashForge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitations</h2>
          <p className="text-gray-600 mb-4">
            In no event shall FlashForge or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use FlashForge.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;