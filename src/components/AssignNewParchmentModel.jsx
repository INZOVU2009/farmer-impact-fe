import React from 'react'

function AssignNewParchmentModel({ isOpen, onClose, confirmAssign, cherryLotId}) {
    const handleConfirmAssign = () => {
      
        confirmAssign(cherryLotId);
        onClose(); // Close the modal after deletion
      };
    return (
        <>
          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="mb-4 text-black">Do you want to add Cherry ID {cherryLotId} to this parchment lot ID</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
                  onClick={handleConfirmAssign}
                >
                  Yes, Add
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
    };


export default AssignNewParchmentModel