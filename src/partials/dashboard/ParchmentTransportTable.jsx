import React, { useState, useEffect } from "react";
import UpdateItemDrawer from "./UpdateItemDrawer";
import DeleteItemDrawer from "./DeleteItemDrawer";
import AddItemDrawer from "./AddItemDrawer";
import "react-toastify/dist/ReactToastify.css";
import { GrDeliver } from "react-icons/gr";
const ParchmentTransportTable = ({reports
}) => {

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
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                    DELIVERY.ID	
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     TALLY SHEET	
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                    TRUCK.PLATE	
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      LOADING.DATE	
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     EXPECTED.DELIVERY.DATE	
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                   GRADE
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                  TOTAL.WEIGHT.KG	
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                     #OF.BAGS	
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
                    {reports?.map((report, index) => (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                       
                       <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">

                        {report.status}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">

                        {report.deliveryid}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {report.tally_sheet_no}
                        </td>

                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.truck_plate}

                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.loading_date}
                        </td>
                        <td className="p-4 space-x-2 whitespace-nowrap">
                        {report.expected_delivery_date}
                      
                        </td>
                        <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {report.grade}
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       
                        {report.weight.toLocaleString()}

                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {report.bags}
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <GrDeliver className="w-[100%] text-green-500" />

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

      {/* update drawer */}
      <UpdateItemDrawer />

      {/* Delete Product Drawer */}
      <DeleteItemDrawer />

      {/* Add Product Drawer */}
      <AddItemDrawer />
    </div>
  );
};

export default ParchmentTransportTable;