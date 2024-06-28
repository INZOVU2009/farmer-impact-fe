import React, { useState, useEffect } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateTranslation } from "../redux/actions/translations/updateTranslation.action";
export default function EditTranslationModel({
  translation,
  onClose,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const [editedTranslation, setEditedTranslation] = useState({
    phrase: translation.phrase,
    phrasefr: translation.phrasefr,
    phraserw: translation.phraserw,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTranslation((prevTranslation) => ({
      ...prevTranslation,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateTranslation(translation.id, editedTranslation));
      toast.success("Translation updated successfully");
      onClose();
      onSubmit(editedTranslation);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update transaction");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white  rounded-lg shadow-md mt-auto ">
        <div className="flex justify-end ">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>

        <div className=" px-16 space-y-3 mb-10">
          <p className="text-green-500">Edit Translation</p>
          <hr className="mb-4 border border-gray-200 " />
          <p>Phrase</p>
          <input
            className="rounded-lg   w-80"
            name="phrase"
            type="text"
            value={editedTranslation.phrase}
            onChange={handleInputChange}
          />

          <p>Phrase in Kinyarwanda</p>

          <input
            type="text"
            name="phraserw"
            value={editedTranslation.phraserw}
            onChange={handleInputChange}
            placeholder=""
            className="rounded-lg   w-80"
          />

          <p>Phrase in French</p>

          <input
            className="rounded-lg w-80"
            type="text"
            name="phrasefr"
            value={editedTranslation.phrasefr}
            onChange={handleInputChange}
          />

          <ToastContainer />

          <button
            className="bg-green-400 w-48 h-10  flex items-center justify-center rounded-lg"
            onClick={handleEditSubmit}
          >
            Edit Translation
          </button>
        </div>
      </div>
    </div>
  );
}
