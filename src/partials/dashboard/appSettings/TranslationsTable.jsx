import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteTranslationModel from "../../../components/DeleteTranslationModel";
import { deleteTranslation } from "../../../redux/actions/translations/deleteTranslation.action";
import { updateTranslation } from "../../../redux/actions/translations/updateTranslation.action";
import AddTranslationModal from "../../../components/AddTranslationModal";
import EditTranslationModel from "../../../components/EditTranslationModel.jsX";
import { addNewPhraseTranslation } from "../../../redux/actions/translations/addNewPhrase.action";
function TranslationsTable({
  translations,
  handleNextPage,
  handlePrevPage,
  handleSearchChange,
  currentPage,
  itemsPerPage,
  searchTerm,
  allTranslations,
}) {
  const [translationToDelete, setTranslationToDelete] = useState(null);
  const [showEditTranslationModel, setShowEditTranslationModel] =
    useState(false);

  const { removedTranslation } = useSelector(
    (state) => state.deleteTranslation
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  //removing translation
  const openModal = (translationId) => {
    setTranslationToDelete(translationId);
    setModalOpen(true);
  };
  const closeModal = () => {
    setTranslationToDelete(null);
    setModalOpen(false);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteTranslation(translationToDelete));
    if (removedTranslation) {
    }
    closeModal();
  };

  const handleClickAction = (translation) => {
    setSelectedTranslation(translation);
    setShowEditTranslationModel(true);
  };

  const handleTranslationUpdate = (translationId, editedTranslation) => {
    setSelectedTranslation(null);
    setShowEditTranslationModel(true);
  };
  const formatDate = (dateString) => {
    if (!dateString) {
      return "0000 0000 0000 0000";
    }

    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid date";
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleAddNewPhrase = (newPhrase) => {
    dispatch(addNewPhraseTranslation(token, newPhrase)); // Dispatch the action to add the new phrase
    setAddModalOpen(false);
  };
  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <button
          id="createProductButton"
          className="btn bg-green-500 hover:bg-green-500 text-white mb-3"
          type="button"
          onClick={() => setAddModalOpen(true)}
        >
          + New Phrase
        </button>
        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center mb-4 sm:mb-0">
            <form className="sm:pr-3" action="#" method="GET">
              <label htmlFor="products-search" className="sr-only">
                Search
              </label>
              <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="email"
                  id="products-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search for phrase"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div>
        </div>
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
                      CODE
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      ENGLISH
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      FRENCH
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      KINYARWANDA{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {translations?.map((translation, index) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {translation.code}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {translation.phrase}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {translation.phrasefr}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {translation.phraserw}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className=" flex flex-row gap-1">
                          <MdEdit
                            className=" text-green-500 border-2 border-green-500 rounded-full  text-3xl  p-1 cursor-pointer  hover:bg-green-500 hover:text-white"
                            onClick={() => handleClickAction(translation)}
                          />


                          <RiDeleteBin6Line
                            className="text-red-500 border-2 border-red-500 rounded-full text-3xl p-1 cursor-pointer hover:bg-red-500 hover:text-white"
                            onClick={() => openModal(translation.id)}
                          />
                         
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

      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <a
            href="#"
            onClick={handlePrevPage}
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            onClick={handleNextPage}
            className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(currentPage * itemsPerPage, allTranslations)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {allTranslations}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="#"
            onClick={handlePrevPage}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-black hover:bg-black "
          >
            <svg
              className="w-5 h-5 mr-1 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </a>
          <a
            href="#"
            onClick={handleNextPage}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-black hover:bg-black "
          >
            Next
            <svg
              className="w-5 h-5 ml-1 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <AddTranslationModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddNewPhrase}
      />
       <DeleteTranslationModel
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onConfirmDelete={handleConfirmDelete}
                            translationId={translationToDelete}
                          />
                                                    {showEditTranslationModel && selectedTranslation && (
                            <EditTranslationModel
                              translation={selectedTranslation}
                              onClose={() => setShowEditTranslationModel(false)}
                              onSubmit={handleTranslationUpdate}
                            />
                          )}
    </div>
  );
}

export default TranslationsTable;
