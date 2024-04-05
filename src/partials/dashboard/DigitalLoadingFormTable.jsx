import React, { useState, useEffect } from "react";
import UpdateItemDrawer from "./UpdateItemDrawer";
import DeleteItemDrawer from "./DeleteItemDrawer";
import AddItemDrawer from "./AddItemDrawer";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditTransactionModel from "../../components/EditTransactionModel";
import RemoveTransactionModel from "../../components/RemoveTransactionModel";
import { fetchAllTransactionsByJournal } from "../../redux/actions/transactions/transactionsByJournal.action";
import { removeTransaction } from "../../redux/actions/transactions/removeTransaction.action";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchAllTransactions } from "../../redux/actions/transactions/allTransactions.action";
import { CommisionFees } from "../../redux/actions/transactions/addCommissinFees";
import { addCommission } from "../../redux/actions/transactions/commission.action";
import "react-toastify/dist/ReactToastify.css";
import { approveJoulnal } from "../../redux/actions/transactions/approveJournal.action";

const DigitalLoadingFormTable = () => {
  

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className=" mb-8  dark:bg-slate-800 ">
        <span className="font-large font-bold ml-12 ">
        Digital Loading Form
        </span>
        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex w-full items-center mb-4  sm:mb-0 ">
            <table className="min-w-full  divide-y divide-gray-200  mt-6 table-fixed dark:divide-gray-600 border border-gray-300 dark:border-gray-600">
              <thead className=" dark:bg-gray-700">
                <tr className="border-b">
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r "
                  >
                   Delivery ID	
                  </th>
                  <td className="p-3 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                  LF-24--2289

                  </td>
                  
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="  p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    CWS Name	
                  </th>
                  <td className="p-3 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {/* {journal?.staffData[0].Name} */}
                  </td>
                  
                </tr>
                <tr className="border-b">
                  
                 
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    CWS ID	
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                    {/* {totalValues.totalCoffeeValue.toLocaleString()} */}
                  </td>
                </tr>
               
                <tr className="border-b hover:bg-gray-100 ">
                    <th
                      scope="col"
                      className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      TALLY SHEET No.	
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input type="text"
                        // value={transportFeesCherry.toLocaleString()}
                        className="rounded-lg w-80"
                        name="transportCherry"
                        placeholder="Tally sheet no"
                        // onChange={handleAdditionalInfoChange}
                         />

                    </td>

                  </tr>
                  <tr className="border-b">
                    <th
                      scope="col"
                      className="  p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      NUMBER.OF.BAGS	
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input
                        type="text"
                        name="transportFloaters"
                        // value={transportFeesFloaters.toLocaleString()}
                        className="rounded-lg w-80"
                        // onChange={handleAdditionalInfoChange}
                        placeholder="number of bags"
                         />

                    </td>

                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                     TOTAL.WEIGHT	
                    </th>
                    <td
                     className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input type="text"
                        // value={transportFeesCherry.toLocaleString()}
                        className="rounded-lg w-80"
                        name="transportCherry"
                        // onChange={handleAdditionalInfoChange}
                        placeholder="total weight"
                         />

                    </td>

                  </tr>
                  <tr className="border-b ">
                    <th
                      scope="col"
                      className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Loading date	
                    </th>
                    <td className=" p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    <input
                      
                      // type="date"
                      className="rounded-lg w-80"
                      value={new Date().toISOString().split("T")[0]}
                      // class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />

                    </td>

                  </tr>
                  <tr className="border-b ">
                    <th
                      scope="col"
                      className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Expected Delivery date		
                    </th>
                    <td className=" p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    <input
                      
                      // type="date"
                      className="rounded-lg w-80"
                      value={new Date().toISOString().split("T")[0]}
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />

                    </td>

                  </tr>
              </thead>
            </table>
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
                    <th scope="col" className=" p-2">
                    Choose lot	
                    </th>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      PARCH CODE	
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      STOCK INIT	
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      STOCK BAL	
                    </th>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      CHERRY.LOTID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      NUMBER.OF.BAGS
                    </th>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      KILOGRAMS.LOADED
                    </th>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      ANY.PARCHMENT.LEFT
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      #BAGS.OF.PARCHMENT.LEFT
                    </th>
                   
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  
                    <tr
                      // key={transaction.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                     
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                       <select name="" id="" className="rounded-lg">
                        <option value="">No</option>
                        <option value="">Yes</option>
                       </select>
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      24SR188P26205CA	
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      41	
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        0
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      24SR188CH1202C
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                       
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                       
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        
                      </td>
                    
                    </tr>
                    <tr
                      // key={transaction.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                     
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                       <select name="" id="" className="rounded-lg">
                        <option value="">No</option>
                        <option value="">Yes</option>
                       </select>
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      24SR188P26205CA	
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      41	
                      </td>
                      <td class="p-4 text-base   font-medium text-gray -500 whitespace-nowrap dark:text-white">
                        0
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                      24SR188CH1202C
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                       
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                       
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        
                      </td>
                    
                    </tr>
                
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
              {Math.min(currentPage * itemsPerPage, journals?.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {journals?.length}
            </span>
          </span>
        </div>
      </div>      */}
       {/* {isCommissionFeesAdded &&(

                  <div className="flex justify-center items-center">
                  <button
                    className="bg-green-500 text-white p-2 m-2"
                    onClick={handleApprove}
                    disabled={totalValues.approved}
                  >Approve Transaction</button>
                </div>
                )} */}
      
      <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex w-full items-center mb-4  sm:mb-0 ">
            <table className="min-w-full  divide-y divide-gray-200  mt-6 table-fixed dark:divide-gray-600 border border-gray-300 dark:border-gray-600">
              <thead className=" dark:bg-gray-700">
             
                  
               
               
              <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                     Loaded by	
                    </th>
                    <td
                     className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input type="text"
                        // value={transportFeesCherry.toLocaleString()}
                        className="rounded-lg w-full"
                        name="transportCherry"
                        // onChange={handleAdditionalInfoChange}
                        placeholder="Enter the name of the loader"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         />

                    </td>

                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                     Inspected by
                    </th>
                    <td
                     className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input type="text"
                        // value={transportFeesCherry.toLocaleString()}
                        className="rounded-lg w-full"
                        name="transportCherry"
                        // onChange={handleAdditionalInfoChange}
                        placeholder="Enter Name of inspector"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         />

                    </td>

                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                     Accountant's Name
                    </th>
                    <td
                     className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input type="text"
                        // value={transportFeesCherry.toLocaleString()}
                        className="rounded-lg w-full"
                        name="transportCherry"
                        // onChange={handleAdditionalInfoChange}
                        placeholder="Enter name of accountant"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         />

                    </td>

                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                     Driver's Name
                    </th>
                    <td
                     className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input type="text"
                        // value={transportFeesCherry.toLocaleString()}
                        className="rounded-lg w-full"
                        name="transportCherry"
                        // onChange={handleAdditionalInfoChange}
                        placeholder="Enter Name of driver"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         />

                    </td>

                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                     Driver's Licence or National ID	
                    </th>
                    <td
                     className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input type="text"
                        // value={transportFeesCherry.toLocaleString()}
                        className="rounded-lg w-full"
                        name="transportCherry"
                        // onChange={handleAdditionalInfoChange}
                        placeholder="Enter Driver's Licence or National ID	"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         />

                    </td>

                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                    Vehicle Plate No.	
                    </th>
                    <td
                     className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input type="text"
                        // value={transportFeesCherry.toLocaleString()}
                        className="rounded-lg w-full"
                        name="transportCherry"
                        // onChange={handleAdditionalInfoChange}
                        placeholder="Enter Vehicle Plate No.	"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         />

                    </td>

                  </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-3  items-center"> 
          <button className="bg-green-500 text-white py-3 px-7 rounded-lg ">
            Submit to RTC
          </button>
        </div>

      {/* update drawer */}
      <UpdateItemDrawer />

      {/* Delete Product Drawer */}
      <DeleteItemDrawer />

      {/* Add Product Drawer */}
      <AddItemDrawer />
    </div>
  );
};

export default DigitalLoadingFormTable;
