import React, { useState, useEffect } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editInspectionAnswer } from "../redux/actions/inspectionAnswers/updateInspectionAnswer.action";
export default function EditAnswerModel({ answer, onClose, onSubmit }) {
  const dispatch = useDispatch();
  const [editedAnswer, setEditedAnswer] = useState({
    english: answer.Eng_answer,
    kinyarwanda: answer.Kiny_answer,
    priority: answer.priority,
    score: answer.score,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAnswer((prevAnswer) => ({
      ...prevAnswer,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(editInspectionAnswer(answer.id, editedAnswer));
      toast.success("answer updated successfully");
      onClose();
      onSubmit(editedAnswer);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update answer");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white  rounded-lg shadow-md mt-auto  mb-20">
        <div className="flex justify-end ">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>

        <div className=" px-16 space-y-3 mb-10">
          <p className="text-green-500">Edit Translation</p>
          <hr className="mb-4 border border-gray-200 " />
          <p>English</p>
          <input
            className="rounded-lg   w-80"
            name="english"
            type="text"
            value={editedAnswer.english}
            onChange={handleInputChange}
          />

          <p> Kinyarwanda</p>

          <input
            type="text"
            name="kinyarwanda"
            value={editedAnswer.kinyarwanda}
            onChange={handleInputChange}
            placeholder=""
            className="rounded-lg   w-80"
          />

          <p>Priority</p>

          <input
            className="rounded-lg w-80"
            type="number"
            name="priority"
            value={editedAnswer.priority}
            onChange={handleInputChange}
          />
          <p>Score</p>

          <input
            className="rounded-lg w-80"
            type="number"
            name="score"
            value={editedAnswer.score}
            onChange={handleInputChange}
          />

          <ToastContainer />

          <button
            className="bg-green-400 w-48 h-10  flex items-center justify-center rounded-lg"
            onClick={handleEditSubmit}
          >
            Edit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
