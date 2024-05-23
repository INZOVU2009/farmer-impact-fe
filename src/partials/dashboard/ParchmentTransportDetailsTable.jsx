import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const ParchmentTransportDetailsTable = ({
  reportById,
  reportLotById,
  stationName,
  StationID,
  decodedToken,
}) => {
  console.log("I am reports", reportLotById);
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
                <tr className="border-b hover:bg-gray-100 ">
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    TALLY SHEET No.
                  </th>
                  <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.tally_sheet_no}
                  </td>
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    TALLY SHEET No.
                  </th>
                  <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.tally_sheet_no}
                  </td>
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r "
                  >
                    Delivery ID
                  </th>
                  <td className="p-3 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.deliveryid}
                  </td>

                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r "
                  >
                    Receiving formid
                  </th>
                  <td className="p-3 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.receiving_form_id}
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
                <tr className="border-b">
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r "
                  >
                    Bag type
                  </th>
                  <td className="p-3 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.bag_type}
                  </td>

                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r "
                  >
                    Bags weight
                  </th>
                  <td className="p-3 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.weight_received_bags}
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-100 ">
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    NUMBER.OF.BAGS
                  </th>
                  <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.bags}
                  </td>
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    Total Received Bags.
                  </th>
                  <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.total_bags_received}
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
                    {reportById?.weight}
                  </td>
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    Received Weight (Kgs):
                  </th>
                  <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.gross_weight_parch_received}
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
                    {reportById?.loading_date}
                  </td>
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    Expected Delivery date
                  </th>
                  <td className=" p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.expected_delivery_date}
                  </td>
                </tr>
                <tr className="border-b ">
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    Moisture
                  </th>
                  <td className=" p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.moisture}
                  </td>
                  <th
                    scope="col"
                    className=" p-3 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    Received By:
                  </th>
                  <td className=" p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {reportById?.received_by}
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
                      #
                    </th>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      LOT NUMBER
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      CHERRY.LOT.ID
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
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      ANY.PARCHMENT.LEFT
                    </th>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      #BAGS.OF.PARCHMENT.LEFT
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {reportLotById?.map((parchment, index) => (
                    <tr
                      // key={transaction.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.parch_lot_ID}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.parch_lot_ID}
                      </td>

                      <td>{parchment.bags_loaded}</td>

                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.weight}
                      </td>

                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.bags_of_parchment_left === 0 ? "No" : "Yes"}
                      </td>

                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.bags_of_parchment_left} bags
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
                  {reportById?.loaded_by}
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
                  {reportById?.inspected_by}
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
                  {reportById?.accountant_by}
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
                  {reportById?.driver_name}
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
                  {reportById?.driver_licence_or_national_id}
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
                  {reportById?.truck_plate}
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParchmentTransportDetailsTable;
