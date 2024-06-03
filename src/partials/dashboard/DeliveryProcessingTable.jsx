import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import "react-toastify/dist/ReactToastify.css";

const DeliveryProcessingTable = ({
  parchments,
  handleStart,
  startDate,
  status,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="flex flex-row left-4 items-center justify-center py-3 gap-3"></div>

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
                      CreatedTime
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      DeliveryID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      StartedProcessing
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      EndingProcessing
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {parchments?.map((parchment, index) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {parchment.created_at}
                      </td>

                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {parchment.deliveryid}
                      </td>

                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {status(parchment.deliveryid?.split("-").pop()) ===
                        0 ? (
                          <>
                            <div className="flex gap-4">
                              <button className=" p-2 rounded-lg  bg-green-500 text-2xl">
                                <BsSend />
                              </button>
                              <button
                                className="p-2 rounded-lg text-2xl bg-green-500 "
                                onClick={() => {
                                  navigate(
                                    `/user_inventory_management/delivery_processing/${parchment.id}`
                                  );
                                }}
                              >
                                <CiViewList />
                              </button>
                            </div>
                          </>
                        ) : (
                          <button
                            className="bg-orange-950 p-2 rounded-lg text-white"
                            onClick={() => handleStart(parchment)}
                          >
                            Start processing
                          </button>
                        )}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {startDate(
                          parchment.deliveryid?.split("-").pop()
                        )?.toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        0000-00-00 00:00:00
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProcessingTable;
