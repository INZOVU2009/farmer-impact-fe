import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const UserInspectionsTable = ({
  inspections,
  stationName,
  farmerName,
  farmerId,
  groupId,
  farmerPhone,
  householdID,
  filteredstation,
  filteredInspections,
  handleDownload,
  courseName,
  handleSearch,
}) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
  const [selectedStation, setSelectedStation] = useState("all");

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  const filteredInspectionsByStation =
    selectedStation === "all"
      ? inspections
      : inspections.filter(
          (inspection) =>
            stationName(inspection._kf_Station) === selectedStation
        );
  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="py-4 ml-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 mb-10">
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
                  name="email"
                  onChange={handleSearch}
                  id="products-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-[65%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search by Farmer Id, Name ..."
                />
              </div>
            </form>
            <div className="flex space-x-4 mt-1 -ml-32">
              <div>
                <p>Station</p>

                <select
                  name=""
                  className="rounded-lg w-40"
                  value={selectedStation}
                  onChange={handleStationChange}
                >
                  <option value="all">All</option>

                  {filteredstation?.map((station) => (
                    <option key={station.__kp_Station} value={station.Name}>
                      {station.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p>Observation mode</p>
                <select name="" className="rounded-lg w-40">
                  <option value="all">All</option>
                  {filteredInspections?.map((Inspection) => (
                    <option key={Inspection.id} value={Inspection.Score_n}>
                      {Inspection.Score_n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Inspection Date</p>
                <input type="Date" className="rounded-lg w-40" />
              </div>
            </div>

            <div className="ml-4">
              <button
                className="bg-green-500 text-white p-1.5 rounded-md mt-6"
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
                      STATION
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      GROUP.ID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      FARMER.ID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      HOUSEHOLD.ID
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      MOBILE
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      COURSE
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      MODE
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      DATE
                    </th>

                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      By
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      LONG
                    </th>
                    <th
                      scope="col"
                      className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      LAT
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {filteredInspectionsByStation?.map((inspection, index) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {index + 1}
                      </td>

                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {stationName(inspection._kf_Station)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {groupId(inspection._kf_Station)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <a
                          href={`/user_registration/farmer_details/overview/${farmerId(
                            inspection._kf_Station
                          )}`}
                          className="text-blue-500 hover:text-gray-500"
                        >
                          {farmerName(inspection._kf_Station)}
                        </a>
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {farmerId(inspection._kf_Station)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {householdID(inspection._kf_Station)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {farmerPhone(inspection._kf_Station)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {courseName(inspection._kf_Course)}
                      </td>
                      <td className="p-4 space-x-2 whitespace-nowrap">
                        {inspection.Score_n}
                      </td>
                      <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {formatDate(inspection.created_at.toLocaleString())}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {inspection.created_by}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {inspection.longitude}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {inspection.latitude}
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

export default UserInspectionsTable;
