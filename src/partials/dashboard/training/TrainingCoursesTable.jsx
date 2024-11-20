import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import EditCourseModel from "../../../components/EditCourseModel";
import { getModules } from "../../../redux/actions/accessModules/getAllModules.action";
import { assignedModules } from "../../../redux/actions/accessModules/getAssignedModules.action";
import { useDispatch, useSelector } from "react-redux";
import { createNewCoursesAction } from "../../../redux/actions/trainings/createNewCourses.action";
import { resetCourseCreateState } from "../../../redux/slices/trainings/createNewCourseSlice";
const TrainingsTable = ({
  trainings,
  handleClickEditIconAction,
  handleEditCourseSUbmit,
  showEditCourseModel,
  setShowEditCourseModel,
  selectedCourse,
  handleNextPage,
  handlePrevPage,
  currentPage,
  itemsPerPage,
  totalItems,
}) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { modules } = useSelector((state) => state.fetchAllModules);
  const { modulesAssigned } = useSelector(
    (state) => state.fetchAssignedModules
  );
  const createCourseState = useSelector((state) => state.createNewCourse);

  const [searchTerm, setSearchTerm] = useState("");
  const [displayCourses, setDisplayCourses] = useState([]);
  const [generatedID, setGeneratedID] = useState("CRS _ _ _");
  const [formData, setFormData] = useState({
    course_code: "",
    course_name_eng: "",
    course_name_kiny: "",
    course_name_fr: "",
    course_duration: "2",
  });

  const [allAssignedModules, setAllAssignedModules] = useState();
  const [retrievedModules, setRetrievedModules] = useState();
  const [filteredModules, setFilteredModules] = useState([]);
  const [assignedModuleIds, setAssignedModuleIds] = useState([]);
  const [isAllowedToApprove, setIsAllowedToApprove] = useState(false);
  const [crsNameValidKiny, setCrsNameValidKiny] = useState(false);
  const [crsNameValidEng, setCrsNameValidEng] = useState(false);
  const [crsNameValidFr, setCrsNameValidFr] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "course_name_kiny") {
      let pattern = /^[a-zA-Z s]+$/;
      setCrsNameValidKiny(pattern.test(value));
    }
    if (name === "course_name_eng") {
      let pattern = /^[a-zA-Z s]+$/;
      setCrsNameValidEng(pattern.test(value));
    }
    if (name === "course_name_fr") {
      let pattern = /^[a-zA-Z s]+$/;
      setCrsNameValidFr(pattern.test(value));
    }

    setFormData((prevState) => ({
      ...prevState,
      ...{ [name]: value },
    }));
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setFormData({
      course_code: "",
      course_name_eng: "",
      course_name_kiny: "",
      course_name_fr: "",
      course_duration: "2",
    });
    setCrsNameValidKiny(false);
    setCrsNameValidEng(false);
    setCrsNameValidFr(false);
    setSubmitted(false);
    dispatch(resetCourseCreateState());
  };

  const handleCreateCourse = () => {
    setSubmitted(true);

    let submitData = {
      course_name_eng: formData?.course_name_eng,
      course_name_kiny: formData?.course_name_kiny,
      course_name_fr: formData?.course_name_fr,
      course_duration: formData?.course_duration,
    };

    dispatch(createNewCoursesAction(submitData, token));
  };

  useEffect(() => {
    if (createCourseState.response) {
      let fullyGeneratedID = createCourseState.response.generatedID;
      let newCourse = createCourseState.response.newCourse;

      let allcourses = [...displayCourses];

      allcourses.unshift(newCourse);

      setDisplayCourses(allcourses);

      setGeneratedID(fullyGeneratedID);
    }
  }, [createCourseState.response]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      let text = searchTerm.toLowerCase();

      let currentCsrs = [...displayCourses];

      const filteredCourses = currentCsrs.filter((item) => {
        return Object.values(item).some((value) => {
          return String(value).toLowerCase().includes(text);
        });
      });
      setDisplayCourses(filteredCourses);
    } else {
      setDisplayCourses(trainings || []);
    }
  }, [searchTerm]);

  useEffect(() => {
    setDisplayCourses(trainings || []);
  }, [trainings]);

  useEffect(() => {
    let filteredMods = retrievedModules?.filter((module) =>
      assignedModuleIds.includes(module.id)
    );

    setIsAllowedToApprove(
      filteredMods?.some((module) => module.module_name === "Courses approve")
    );
    setFilteredModules(filteredMods);
  }, [retrievedModules]);

  useEffect(() => {
    if (modules) {
      setRetrievedModules(modules.data);
    }
  }, [modules]);

  useEffect(() => {
    if (allAssignedModules) {
      setAssignedModuleIds(
        allAssignedModules?.map((mod) => mod.moduleid) || []
      );
    }
  }, [allAssignedModules]);

  useEffect(() => {
    if (modulesAssigned) {
      setAllAssignedModules(modulesAssigned.data);
    }
  }, [modulesAssigned]);

  useEffect(() => {
    dispatch(getModules());
    dispatch(assignedModules(token));

    return () => {
      setCrsNameValidKiny(false);
      setCrsNameValidEng(false);
      setCrsNameValidFr(false);
      setGeneratedID("CRS _ _ _");
      setSubmitted(false);
      dispatch(resetCourseCreateState());
    };
  }, []);

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex flex-row justify-center items-center mb-4 sm:mb-0">
            <form className="sm:pr-3" action="#" method="GET">
              <label htmlFor="products-search" className="sr-only">
                Search
              </label>
              <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="search"
                  id="products-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search for a course"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>

            {filteredModules?.some(
              (module) => module.module_name === "Courses create"
            ) && (
              <button
                id="createProductButton"
                className="btn bg-blue-500 hover:bg-blue-600 text-white mx-1"
                type="button"
                onClick={() => setAddModalOpen(true)}
              >
                Create New Course
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200  table-fixed dark:divide-gray-600 ">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr className=""></tr>
                  <tr>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      No
                    </th>

                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      English
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Kinyarwanda
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      French
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {displayCourses?.map((training, index) => (
                    <tr
                      key={training.ID_COURSE}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td
                        className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        tyle={{ maxWidth: "300px" }}
                      >
                        {training.ID_COURSE.length > 0 ? (
                          training.ID_COURSE
                        ) : (
                          <label className="align-middle text-gray-400 text-sm text-center">
                            N/A
                          </label>
                        )}
                      </td>
                      <td
                        className="p-4 text-base font-medium text-gray-900 dark:text-white whitespace-normal overflow-hidden text-ellipsis"
                        style={{ maxWidth: "300px", wordBreak: "break-word" }}
                      >
                        {training.Name.length > 0 ? (
                          training.Name
                        ) : (
                          <label className="align-middle text-gray-400 text-sm text-center">
                            N/A
                          </label>
                        )}
                      </td>
                      <td
                        className="p-4 text-base font-medium text-gray-900 dark:text-white whitespace-normal overflow-hidden text-ellipsis"
                        style={{ maxWidth: "300px", wordBreak: "break-word" }}
                      >
                        {training.Name_rw.length > 0 ? (
                          training.Name_rw
                        ) : (
                          <label className="align-middle text-gray-400 text-sm text-center">
                            N/A
                          </label>
                        )}
                      </td>
                      <td
                        className="p-4 text-base font-medium text-gray-900 dark:text-white whitespace-normal overflow-hidden text-ellipsis"
                        style={{ maxWidth: "300px", wordBreak: "break-word" }}
                      >
                        {training.Name_fr.length > 0 ? (
                          training.Name_fr
                        ) : (
                          <label className="align-middle text-gray-400 text-sm text-center">
                            N/A
                          </label>
                        )}
                      </td>

                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className=" flex gap-4 text-xl">
                          <MdOutlineEdit
                            className="text-orange-500 cursor-pointer"
                            onClick={handleClickEditIconAction}
                          />{" "}
                          {showEditCourseModel && selectedCourse && (
                            <EditCourseModel
                              course={selectedCourse}
                              onClose={() => setShowEditCourseModel(false)}
                              onSubmit={handleEditCourseSUbmit}
                            />
                          )}{" "}
                          <FaQuestion className="text-orange-700" />
                          <MdOutlineDelete className=" text-red-500" />
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
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handlePrevPage}
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
            className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handleNextPage}
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
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalItems}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="#"
            onClick={handlePrevPage}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
            onClick={handleNextPage}
            href="#"
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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

      {/* Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div
            className="flex flex-col bg-white items-center justify-center dark:bg-gray-800 p-8 rounded-lg shadow-lg z-10 w-fit"
            style={{ maxWidth: "1000px" }}
          >
            <div className="flex justify-center mb-4">
              <h1 className="text-xl font-semibold uppercase">
                Create a new Course
              </h1>
            </div>
            <hr className="mb-4" />
            <div className="flex w-full items-center justify-center">
              <form className="flex flex-row gap-8 w-full justify-center">
                <div className="flex flex-col gap-4 w-64">
                  <div className="flex flex-col gap-4 w-64">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-md">Course ID (generated):</label>
                      <input
                        name="course_code"
                        className="rounded-lg w-auto opacity-70"
                        type="text"
                        value={generatedID}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-md">Course Duration:</label>
                      <input
                        name="course_duration"
                        className={`rounded-lg w-64 opacity-70`}
                        type="text"
                        value={formData?.course_duration || ""}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-md">Course name:</label>
                      <input
                        name="course_name_eng"
                        className={`rounded-lg w-64 ${
                          crsNameValidEng
                            ? "border-green-400"
                            : "border-red-500"
                        }`}
                        type="text"
                        value={formData?.course_name_eng || ""}
                        onChange={handleInputChange}
                      />
                      {crsNameValidEng ? (
                        <div className="flex flex-row items-center gap-1">
                          <svg
                            width={25}
                            height={25}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M12 2C6.4898 2 2 6.4898 2 12C2 17.5102 6.4898 22 12 22C17.5102 22 22 17.5102 22 12C22 6.4898 17.5102 2 12 2ZM15.5714 10.4694L11.4898 14.551C11.2857 14.6531 11.1837 14.7551 10.9796 14.7551C10.7755 14.7551 10.5714 14.6531 10.4694 14.551L8.42857 12.5102C8.12245 12.2041 8.12245 11.6939 8.42857 11.3878C8.73469 11.0816 9.2449 11.0816 9.55102 11.3878L11.0816 12.9184L14.6531 9.34694C14.9592 9.04082 15.4694 9.04082 15.7755 9.34694C15.8776 9.7551 15.8776 10.1633 15.5714 10.4694Z"
                                fill="#4ade80"
                              ></path>{" "}
                            </g>
                          </svg>
                          <label className="text-sm text-green-400">
                            Course name is valid
                          </label>
                        </div>
                      ) : (
                        <div className="flex flex-row items-center gap-1">
                          <svg
                            width={25}
                            height={25}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                                fill="#ef4444"
                              ></path>{" "}
                            </g>
                          </svg>
                          <label className="text-sm text-red-400">
                            Course name is invalid
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-64">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-md">
                      Course name | Kinyarwanda:
                    </label>
                    <input
                      name="course_name_kiny"
                      className={`rounded-lg w-64 ${
                        crsNameValidKiny ? "border-green-400" : "border-red-500"
                      }`}
                      type="text"
                      value={formData?.course_name_kiny || ""}
                      onChange={handleInputChange}
                    />
                    {crsNameValidKiny ? (
                      <div className="flex flex-row items-center gap-1">
                        <svg
                          width={25}
                          height={25}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M12 2C6.4898 2 2 6.4898 2 12C2 17.5102 6.4898 22 12 22C17.5102 22 22 17.5102 22 12C22 6.4898 17.5102 2 12 2ZM15.5714 10.4694L11.4898 14.551C11.2857 14.6531 11.1837 14.7551 10.9796 14.7551C10.7755 14.7551 10.5714 14.6531 10.4694 14.551L8.42857 12.5102C8.12245 12.2041 8.12245 11.6939 8.42857 11.3878C8.73469 11.0816 9.2449 11.0816 9.55102 11.3878L11.0816 12.9184L14.6531 9.34694C14.9592 9.04082 15.4694 9.04082 15.7755 9.34694C15.8776 9.7551 15.8776 10.1633 15.5714 10.4694Z"
                              fill="#4ade80"
                            ></path>{" "}
                          </g>
                        </svg>
                        <label className="text-sm text-green-400">
                          Course name is valid
                        </label>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center gap-1">
                        <svg
                          width={25}
                          height={25}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                              fill="#ef4444"
                            ></path>{" "}
                          </g>
                        </svg>
                        <label className="text-sm text-red-400">
                          Course name is invalid
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-md">Course name | French:</label>
                    <input
                      name="course_name_fr"
                      className={`rounded-lg w-64 ${
                        crsNameValidFr ? "border-green-400" : "border-red-500"
                      }`}
                      type="text"
                      value={formData?.course_name_fr || ""}
                      onChange={handleInputChange}
                    />
                    {crsNameValidFr ? (
                      <div className="flex flex-row items-center gap-1">
                        <svg
                          width={25}
                          height={25}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M12 2C6.4898 2 2 6.4898 2 12C2 17.5102 6.4898 22 12 22C17.5102 22 22 17.5102 22 12C22 6.4898 17.5102 2 12 2ZM15.5714 10.4694L11.4898 14.551C11.2857 14.6531 11.1837 14.7551 10.9796 14.7551C10.7755 14.7551 10.5714 14.6531 10.4694 14.551L8.42857 12.5102C8.12245 12.2041 8.12245 11.6939 8.42857 11.3878C8.73469 11.0816 9.2449 11.0816 9.55102 11.3878L11.0816 12.9184L14.6531 9.34694C14.9592 9.04082 15.4694 9.04082 15.7755 9.34694C15.8776 9.7551 15.8776 10.1633 15.5714 10.4694Z"
                              fill="#4ade80"
                            ></path>{" "}
                          </g>
                        </svg>
                        <label className="text-sm text-green-400">
                          Course name is valid
                        </label>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center gap-1">
                        <svg
                          width={25}
                          height={25}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                              fill="#ef4444"
                            ></path>{" "}
                          </g>
                        </svg>
                        <label className="text-sm text-red-400">
                          Course name is invalid
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-4 flex w-full justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className={`bg-green-500 text-white px-4 py-2 rounded-lg ${
                  submitted || !crsNameValidEng ? "opacity-40" : "opacity-100"
                }`}
                onClick={() => {
                  handleCreateCourse();
                }}
                disabled={submitted || !crsNameValidEng}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingsTable;
