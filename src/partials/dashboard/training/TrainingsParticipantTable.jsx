import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

const TrainingParticipantsTable = ({
  handleNextPage,
  handlePrevPage,
  itemsPerPage,
  currentPage,
  attendances,
  farmerName,
  farmerId,
  groupId,
  courseName,
  CourseID,
  totalItems,
  handleDownload,
  searchQuerry,
  handleSearch,
  filteredTrainings,
  filteredGroups,
  filteredStations,
  fromDate,
  toDate,
  setFromDate,
  setToDate
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns 0-indexed month
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const filteredAttendances = attendances.filter((attendance) => {
    const courseMatch =
      selectedCourse === "all" ||
      courseName(attendance.__Kf_Training) === selectedCourse;
    const groupMatch =
      selectedGroup === "all" ||
      groupId(attendance.__Kf_Group) === selectedGroup;
    return courseMatch && groupMatch;
  });

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
    <div className="py-4 ml-0 overflow-x-auto px-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 mb-10">
        <div className="items-center  justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center  mb-4 sm:mb-0">
            <form className="sm:pr-3" action="#" method="GET">
              <label htmlFor="products-search" className="sr-only">
                Search
              </label>
              <div className="relative w-48 ml-3 mt-1 sm:w-64 mr-1 xl:w-96">
                <span>Search by Farmer Id, Name ...</span>
                <input
                  type="text"
                  name=""
                  value={searchQuerry}
                  onChange={handleSearch}
                  id="products-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-[65%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search by Farmer Id, Name ..."
                />
              </div>
            </form>

            <div className="flex items-end pr-5 space-x-4 my-1 -ml-32">
              <div>
                <p>Station</p>

                <select name="" className="rounded-lg w-40">
                  <option value="all">All</option>

                  {filteredStations?.map((station) => (
                    <option key={station.__kp_Station} value={station.Name}>
                      {station.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p>Group</p>
                <select
                  name=""
                  value={selectedGroup}
                  onChange={handleGroupChange}
                  className="rounded-lg w-40"
                >
                  <option value="all">All</option>
                  {filteredGroups?.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.ID_GROUP}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p>Course Name</p>
                <select
                  name=""
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  className="rounded-lg w-40"
                >
                  <option value="all">All</option>
                  {filteredTrainings?.map((training) => (
                    <option key={training.id} value={training.Name}>
                      {training.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>From :</p>
                <input 
                type="Date" 
                className="rounded-lg w-40" 
                value={fromDate}
                onChange={(e)=>setFromDate(e.target.value)}
                />
              </div>
              <div>
                <p>To : </p>
                <input 
                type="Date" 
                className="rounded-lg w-40"
                value={toDate}
                onChange={(e)=>setToDate(e.target.value)}
                 />
              </div>
              <button
                className="w-40 bg-green-500 text-white rounded-md py-2.5"
                onClick={handleDownload}
              >
                Download Report
              </button>
            </div>

          
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
                      NO
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Created
                    </th>

                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Farmer
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Farmer ID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Group ID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      COURSE ID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Training Course
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      By
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {filteredAttendances?.map((attendance, index) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {formatDate(attendance.created_at)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {farmerName(attendance.__Kf_Farmer)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {farmerId(attendance.__Kf_Farmer)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {groupId(attendance.__Kf_Group)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {CourseID(attendance.__Kf_Training)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {courseName(attendance.__Kf_Training)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {attendance.username}
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
    </div>
  );
};

export default TrainingParticipantsTable;
