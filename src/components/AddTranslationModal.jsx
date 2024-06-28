import React, { useState } from 'react';

function AddTranslationModal({ isOpen, onClose, onSubmit }) {
  const [phrase, setPhrase] = useState('');
  const [phrasefr, setPhrasefr] = useState('');
  const [phraserw, setPhraserw] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ phrase, phrasefr, phraserw });
    setPhrase('');
    setPhrasefr('');
    setPhraserw('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Add New Translation Phrase</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phrase">
              English Phrase
            </label>
            <input
              type="text"
              id="phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phrasefr">
              French Phrase
            </label>
            <input
              type="text"
              id="phrasefr"
              value={phrasefr}
              onChange={(e) => setPhrasefr(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phraserw">
              Kinyarwanda Phrase
            </label>
            <input
              type="text"
              id="phraserw"
              value={phraserw}
              onChange={(e) => setPhraserw(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-900 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Phrase
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTranslationModal;
