import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";


const ProcessedContributionTable = ({ processedContributions, getStationName, getUserName}) => {

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="flex flex-row left-4 items-center justify-center py-3 gap-3"></div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200  table-fixed dark:divide-gray-600 ">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr className="">
                  
                    {/* <th
                      scope="col"
                      colSpan={3}
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Skin Drying Grade Weighing
                    </th> */}
                    {/* <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    ></th> */}
                  </tr>

                  <tr>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     ID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     CERTIFICATION
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     FARMER NAME 
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                   FARMER ID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      FLOATERS
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      PARCHMENT WEIGHT
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     RATIO
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                    STATION
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                    AMOUNT PAID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                    UNIT PRICE
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     CONTRIBUTION SENT AT
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     CONTRIBUTION SENT BY
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     TRANSACTION WEIGHT
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     LOADED WEIGHT
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     PROCESSING STARTED AT 
                    </th>
                  </tr>
                </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {processedContributions?.map((contribution,index)=>(
  <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      
  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
 {contribution.id}
  </td>

 
  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.certification}
  </td>

  
  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
{contribution.farmer_name}
</td>

  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
{contribution.farmer_id}
  </td>
  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.floaters}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.parch_weight}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.parch_ratio}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {getStationName(contribution.station)}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.amount_paid.toLocaleString()}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.unit_price}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.contribution_sent_at}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {getUserName(contribution.contribution_created_by)}


  </td>
  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.transaction_weight}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.weight_loaded}


  </td><td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
  {contribution.started_at.toLocaleString()}


  </td>
</tr>
                    ))}
                    
                    
                      
                   
                  </tbody>
              
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
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
              {Math.min(
                currentPage * itemsPerPage,
                filteredTransactions?.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredTransactions?.length}
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
      </div> */}

      
    </div>
  );
};

export default ProcessedContributionTable;