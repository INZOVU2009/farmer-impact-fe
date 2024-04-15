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

const DigitalLoadingFormTable = ({parchments, stationName, StationID, decodedToken, showInputs, handleSelectChange, selectedParchment, selectedOption, handleSelectedOption, formData, handleFormData}) => {
  

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
                  {stationName(decodedToken?.staff._kf_Station)}
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
                  {StationID(decodedToken?.staff._kf_Station)}
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
                        value={formData.tally_sheet_no}
                        className="rounded-lg w-80"
                        name="tally_sheet_no"
                        placeholder="Tally sheet no"
                        onChange={handleFormData}
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
                        name="total_number_of_bags"
                        value={formData.total_number_of_bags}
                        className="rounded-lg w-80"
                        onChange={handleFormData}
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
                        value={formData.total_weight}
                        className="rounded-lg w-80"
                        name="transportCherry"
                        onChange={handleFormData}
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
    {parchments?.map((parchment, index) => (
        <tr
            // key={transaction.id}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
        >
            <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
            {/* <select
        name="cherry_lot"
        id=""
        className="rounded-lg"
        onChange={handleSelectChange} // Call handleSelectChange on selection change
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select> */}
        <select
                    name={`cherry_lot_${index}`} // Use a unique name for each dropdown
                    className="rounded-lg"
                    onChange={handleSelectChange} // Call handleSelectChange on selection change
                    data-parchment-id={parchment.parchment_id} // Attach parchment ID as data attribute
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
            </td>
            <td 
            className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white"
            type="text"
            name="total_number_of_bags"
            value={formData.parchment_code}
            onChange={handleFormData}
            placeholder="number of bags"
            
            >
                {parchment.parchment_id}
            </td>
           
            <td 
            className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white"
            type="text"
            name="total_number_of_bags"
            value={formData.stock_init}
            onChange={handleFormData}
            placeholder="number of bags"
            
            
            >
                {parchment.parch_weight}
            </td>
            <td 
            className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white"
            type="text"
            name="total_number_of_bags"
            value={formData.stock_bal}
            onChange={handleFormData}
            placeholder="number of bags"
            
            >
                {parchment.parch_weight}
            </td>
            <td 
            className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white"
            type="text"
            name="total_number_of_bags"
            value={formData.cherry_lot_id}
            onChange={handleFormData}
            placeholder="number of bags"
            
            >
                {parchment.cherry_lot_id}
            </td>
            <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
             
                    { selectedParchment === parchment.parchment_id &&(
                     <input
                     type="text"
                     name={`number of bags${index}`} // Use a unique name for each input field
                     className="rounded-lg w-40"
                     placeholder="number of bags"
                     value={formData.number_of_bags}
                   />
                    )}
           
            </td>
            <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
               
            { selectedParchment === parchment.parchment_id  &&(
                     <input
                     type="text"
                     name={`kilograms loaded${index}`} // Use a unique name for each input field
                     className="rounded-lg w-40"
                     placeholder="number of bags"
                     value={formData.kilograms_loaded}
                   />
                    )}
           
            </td>
            <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">

           {selectedParchment === parchment.parchment_id  && (
              <select
              name={`parchment${index}`} // Use a unique name for each dropdown
              className="rounded-lg"
              onChange={handleSelectedOption} // Call handleSelectChange on selection change
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
           )}
              

          
           </td>

           
            <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
              
            {selectedOption === `parchment${index}` && (
                <input
                  type="text"
                  name={`leftParchments${index}`} // Use a unique name for each input field
                  className="rounded-lg w-40"
                  placeholder="number of bags"
                  value={formData.left_parchments}
                />
              )}
               
            </td>
        </tr>
    ))}
</tbody>

              </table>
            </div>
          </div>
        </div>
      </div>

    
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
