import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

const WeeklyReportTable = ({
  allReports,
  paginatedReports,
  handleNextPage,
  handlePrevPage,
  itemsPerPage,
  currentPage,
  handleDownload,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="w-full flex justify-end mb-4">
        <button
          className="w-40 bg-green-500 text-white rounded-md py-2.5"
          onClick={handleDownload}
        >
          Download Report
        </button>
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
                      Trainer Name
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      CW NAME
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      inspected Farmers
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Planned groups
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      inspected groups
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Attended farmers
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Attended women
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Attended men
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400 max-w-[9rem]">
                    
                      Comment
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {paginatedReports?.map((report, index) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {formatDate(report.createdAt)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.full_name}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.CW_Name}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.farm_inspected}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.planned_groups}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.planned_inspected}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.trained_number}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.women_attended}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.men_attended}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 dark:text-white break-words whitespace-normal max-w-[9rem]">
  Nasuye pipinyeri abahinzi bakomeje igikorwa gusasira nakoranye inama n abahinzi tuganira kumusaruro wubutaha
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
              {Math.min(currentPage * itemsPerPage, allReports?.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {allReports?.length}
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

export default WeeklyReportTable;
