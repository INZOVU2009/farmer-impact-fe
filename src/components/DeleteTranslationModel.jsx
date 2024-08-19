import React from "react";

function DeleteTranslationModel({
  isOpen,
  onClose,
  onConfirmDelete,
  translationId,
}) {
  const handleConfirmDelete = () => {
    onConfirmDelete(translationId);
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="mb-4">
              Are you sure you want to delete this translation ?
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
              onClick={handleConfirmDelete}
            >
              Yes, Delete
            </button>
            <button
              className="bg-green-300 text-gray-800 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteTranslationModel;
