import React, { useState } from 'react';

function AddNewInspectionQuestionModel({ isOpen, onClose, onSubmit }) {
  const [EngPhrase, setEngPhrase] = useState('');
  const [KinyPhrase, setKinyPhrase] = useState('');
  const [award, setAward] = useState('');
  const [evaluationMode, setEvaluationMode] = useState('');
  const [priority, setPriority] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ EngPhrase, KinyPhrase, award,evaluationMode,priority });
    setEngPhrase('');
    setKinyPhrase('');
    setAward();
    setEvaluationMode();
    setPriority();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded  shadow-md">
        <h2 className="text-xl mb-4">New Inspection Question </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phrase">
              English 
            </label>
            <input
              type="text"
              id="english"
              value={EngPhrase}
              onChange={(e) => setEngPhrase(e.target.value)}
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
              value={KinyPhrase}
              onChange={(e) => setKinyPhrase(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phrasefr">
          Award
            </label>
            <input
              type="text"
              id="award"
              value={award}
              onChange={(e) => setAward(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phrasefr">
          Evaluation Mode
            </label>
            <input
              type="text"
              id="evaluation"
              value={evaluationMode}
              onChange={(e) => setEvaluationMode(e.target.value)}
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
          
          <div className="flex items-center justify-between gap-20">
            <button
              type="submit"
              className="bg-orange-900 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Question
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

export default AddNewInspectionQuestionModel;
