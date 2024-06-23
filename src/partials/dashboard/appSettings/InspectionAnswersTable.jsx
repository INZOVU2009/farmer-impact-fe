import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import AddNewPhraseModel from "../../../components/AddNewPhraseModel";
import DeleteAnswerModel from "../../../components/DeleteAnswerModel";
import EditAnswerModel from "../../../components/EditAnswerModel";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewInspectionAnswer } from "../../../redux/actions/inspectionAnswers/addNewInspectionAnswer.action";
import { deleteInspectionAnswer } from "../../../redux/actions/inspectionAnswers/deleteInspectionAnswer.action";
function InspectionAnswersTable({ answers }) {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [answerToDelete, setAnswerToDelete] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showEditAnswerModel, setShowEditAnswerModel] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const id = useParams().id;

  const handleAddNewPhrase = (formData) => {
    dispatch(addNewInspectionAnswer(id, token, formData));
    setAddModalOpen(false);
  };
  const { deletedAnswer } = useSelector(
    (state) => state.deleteInspectionAnswer
  );
  //removing an answers
  const openModal = (answerId) => {
    setAnswerToDelete(answerId);
    setModalOpen(true);
  };
  const closeModal = () => {
    setAnswerToDelete(null);
    setModalOpen(false);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteInspectionAnswer(answerToDelete));
    if (deletedAnswer) {
    }
    closeModal();
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
  const handleClickAction = (answer) => {
    setSelectedAnswer(answer);
    setShowEditAnswerModel(true);
  };

  const handleAnswerEdit = (answerId, editedAnswer) => {
    setSelectedAnswer(null);
    setShowEditAnswerModel(true);
  };
  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <button
          id="createProductButton"
          className="btn bg-green-500 hover:bg-green-500 text-white mb-3"
          type="button"
          onClick={() => setAddModalOpen(true)}
        >
          + New Phrase
        </button>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4">
                      No
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Created time
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      English
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Kinyarwanda
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Score
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {answers?.map((answer, index) => (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      key={answer.id}
                    >
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {formatDate(answer.created_at)}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {answer.Eng_answer}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {answer.Kiny_answer}
                      </td>

                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {answer.priority}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {answer.score}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex gap-2 cursor-pointer">
                          <RiDeleteBin5Line
                            className=" text-red-500 text-xl"
                            onClick={() => openModal(answer.id)}
                          />
                          <DeleteAnswerModel
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onConfirmDelete={handleConfirmDelete}
                            answerId={answerToDelete}
                          />
                          <FaRegEdit
                            className=" text-green-500 text-xl"
                            onClick={() => handleClickAction(answer)}
                          />
                          {showEditAnswerModel && selectedAnswer && (
                            <EditAnswerModel
                              answer={selectedAnswer}
                              onClose={() => setShowEditAnswerModel(false)}
                              onSubmit={handleAnswerEdit}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddNewPhraseModel
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddNewPhrase}
      />
    </div>
  );
}

export default InspectionAnswersTable;
