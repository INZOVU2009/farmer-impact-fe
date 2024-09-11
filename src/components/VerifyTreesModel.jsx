import React, { useState } from 'react';

function VerifyTreesModel({ isOpen, onClose, onSubmit }) {
  const [english, setEnglish] = useState('');
  const [kinyarwanda, setKinyarwanda] = useState('');
  const [priority, setPriority] = useState();
  const [score, setScore] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ english, kinyarwanda, priority,score });
    setEnglish('');
    setKinyarwanda('');
    setPriority();
    setScore();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded  shadow-md">
        <h2 className="text-xl mb-4">New Phrase </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phrase">
              English 
            </label>
            <input
              type="text"
              id="english"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phrasefr">
          Kinyarwanda
            </label>
            <input
              type="text"
              id="kinyarwanda"
              value={kinyarwanda}
              onChange={(e) => setKinyarwanda(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phraserw">
             Priority
            </label>
            <input
              type="number"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phraserw">
             Score
            </label>
            <input
              type="number"
              id="score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between gap-20">
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

export default VerifyTreesModel;
