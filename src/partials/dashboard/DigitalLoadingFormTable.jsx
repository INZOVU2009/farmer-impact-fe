import React, { useState, useEffect } from "react";
import UpdateItemDrawer from "./UpdateItemDrawer";
import DeleteItemDrawer from "./DeleteItemDrawer";
import AddItemDrawer from "./AddItemDrawer";
import "react-toastify/dist/ReactToastify.css";

const DigitalLoadingFormTable = ({
  parchments,
  stationName,
  StationID,
  decodedToken,
  stockbal,
  handleSelectChange,
  selectedParchment,
  selectedOption,
  handleSelectedOption,
  formData,
  handleFormData,
  handleSubmit,
  handleClick,
  Spinner,
  isloading,
  selectedValue
}) => {

  const calculateTotalWeight = () => {
    let totalWeight = 0;
    selectedParchment.forEach((parchmentId) => {
      totalWeight += parseFloat(formData[`weight_${parchmentId}`]) || 0;
    });
    return totalWeight;
  }

  const calculateTotalBags = () => {
    let totalBags = 0;
    selectedParchment.forEach((parchmentId) => {
      totalBags += parseFloat(formData[`bags_${parchmentId}`]) || 0;
    });
    return totalBags;
  }
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
                    <input
                      type="text"
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
                      name="bags"
                      value={calculateTotalBags()}
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
                  <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                  <input
                      type="text"
                      value={calculateTotalWeight()} // Display the calculated total weight
                      className="rounded-lg w-80"
                      name="weight"
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
                      className="rounded-lg w-80"
                      value={new Date().toISOString().split("T")[0]}
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
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                    {/* <select
                      name={`cherry_lot_${index}`}
                      className="rounded-lg"
                      onClick={() => handleClick(parchment)}
                      onChange={handleSelectChange}
                      data-parchment-id={parchment.parchment_id}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select> */}


<select
              name={`cherry_lot_${index}`} // Use a unique name for each dropdown
              className="rounded-lg"
              onClick={() => handleClick(parchment)}
              onChange={handleSelectChange} // Call handleSelectChange on selection change
              data-parchment-id={parchment.parchment_id} // Attach parchment ID as data attribute
              value={selectedParchment.includes(parchment.parchment_id) ? 'Yes' : 'No'} // Set the value based on selected parchments
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>




                    
                    
                      </td>
                      <td
                        className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white"
                        type="text"
                        name="parch_lot_ID"
                        value={formData.parch_lot_ID}
                        onChange={handleFormData}
                        placeholder="number of bags"
                      >
                        {parchment.parchment_id}
                      </td>

                      <td
                        className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white"
                        type="text"
                        name="total_number_of_bags"
                        // value={formData.stock_init}
                        // onChange={handleFormData}
                        placeholder="number of bags"
                      >
                        {parchment.parch_weight}
                      </td>
                      <td
                        className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white"
                        type="text"
                        name="total_number_of_bags"
                        placeholder="number of bags"
                      >
                        {stockbal(parchment)}
                      </td>
                      <td
                        className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white"
                        type="text"
                        name="cherry_lot_id"
                        placeholder="number of bags"
                      >
                        {parchment.cherry_lot_id}
                      </td>

     <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
      {selectedParchment.includes(parchment.parchment_id) && (
        <input
          type="text"
          name={`bags_${parchment.parchment_id}`} // Use a unique name for each input field
          className="rounded-lg w-40"
          placeholder="Number of bags"
          value={formData[`bags_${parchment.parchment_id}`]}
          onChange={handleFormData}
        />
      )}
    </td>
    <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
      {selectedParchment.includes(parchment.parchment_id) && (
        <input
          type="text"
          name={`weight_${parchment.parchment_id}`} // Use a unique name for each input field
          className="rounded-lg w-40"
          placeholder="Weight"
          value={formData[`weight_${parchment.parchment_id}`]}
          onChange={handleFormData}
        />
      )}
    </td>
            <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">

           {selectedParchment.includes(parchment.parchment_id) && (
              <select
              name={`parchment${index}`} // Use a unique name for each dropdown
              className="rounded-lg"
              onChange={handleSelectedOption} // Call handleSelectChange on selection change
              data-parchment-id={parchment.parchment_id}
              value={selectedOption.includes(parchment.parchment_id) ? 'yes' : 'no'} 
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
           )}


          
           </td>

           
            <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
              
            {selectedOption.includes(parchment.parchment_id) && (
                <input
                  type="text"
                  name={`bags_of_parchment_left_${parchment.parchment_id}`} // Use a unique name for each input field
                  className="rounded-lg w-40"
                  placeholder="bags_of_parchment_left"
                  onChange={handleFormData}
                  value={formData[`bags_of_parchment_left_${parchment.parchment_id}`]}

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
                <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                  <input
                    type="text"
                    className="rounded-lg w-full"
                    name="loaded_by"
                    value={formData.loaded_by}
                    onChange={handleFormData}
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
                <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                  <input
                    type="text"
                    className="rounded-lg w-full"
                    name="inspected_by"
                    value={formData.inspected_by}
                    onChange={handleFormData}
                    placeholder="Enter the name of an inspector"
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
                <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                  <input
                    type="text"
                    className="rounded-lg w-full"
                    name="accountant_by"
                    value={formData.accountant_by}
                    onChange={handleFormData}
                    placeholder="Enter Accountant's name"
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
                <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                  <input
                    type="text"
                    className="rounded-lg w-full"
                    name="driver_name"
                    value={formData.driver_name}
                    onChange={handleFormData}
                    placeholder="Enter Driver's name "
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
                <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                  <input
                    type="text"
                    className="rounded-lg w-full"
                    name="driver_licence_or_national_id"
                    value={formData.driver_licence_or_national_id}
                    onChange={handleFormData}
                    placeholder="Enter Driver's license or national ID"
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
                <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                  <input
                    type="text"
                    className="rounded-lg w-full"
                    name="truck_plate"
                    value={formData.truck_plate}
                    onChange={handleFormData}
                    placeholder="Enter vehicle plate number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-3 items-center">
        {isloading ? (
          <Spinner className="h-8 w-8 text-green-500" />
        ) : (
          <button
            className="bg-green-500 text-white py-3 px-7 rounded-lg"
            onClick={handleSubmit}
          >
            Submit to RTC
          </button>
        )}
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
