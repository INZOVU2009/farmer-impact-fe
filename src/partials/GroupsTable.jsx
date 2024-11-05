import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllGroupsByStation } from "../redux/actions/groups/fetchGroupsByStation.action";

function GroupsTable() {
  const dispatch = useDispatch();

  const [displayGroups, setDisplayGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const { groups } = useSelector((state) => state.fetchAllGroups);

  const token = localStorage.getItem("token");

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, groups?.totalItems));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApproveClick = (tree) => {};

  const handleCloseModal = () => {};

  useEffect(() => {
    let allGroups = groups.data;
    if (searchTerm.length > 0) {
      let filteredGroups = allGroups?.filter((group) =>
        Object.values(group).some(
          (value) =>
            value
              ?.toString()
              ?.toLowerCase()
              ?.indexOf(searchTerm?.toLowerCase()) !== -1
        )
      );
      setDisplayGroups(filteredGroups);
    }
  }, [searchTerm]);

  useEffect(() => {
    dispatch(fetchAllGroupsByStation(currentPage, itemsPerPage, token));
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    let allGroups = groups.data;
    if (allGroups) {
      setDisplayGroups(groups.data);
    }
  }, [groups]);

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex flex-row justify-center items-center mb-4 sm:mb-0">
            <form className="sm:pr-3" action="#" method="GET">
              <label htmlFor="products-search" className="sr-only">
                Search
              </label>
              <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="search"
                  id="products-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search for group"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>

            <button
              id="createProductButton"
              className="btn bg-blue-500 hover:bg-blue-600 text-white mx-1"
              type="button"
              onClick={() => handleApproveClick(tree)}
            >
              Create New Group
            </button>
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
                    <th scope="col" className="p-4">
                      No
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Station
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Group ID
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Group Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Province
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      District
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Cell
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {displayGroups.map((group, index) => (
                    <tr
                      key={group.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="w-4 p-4">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {"station"}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {group.ID_GROUP}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {group.Name}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {group.Area_Biggest}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {group.Area_Big}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {group.Area_Medium}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {group.active == "0" ? (
                          <button
                            id="createProductButton"
                            className="btn bg-green-500 hover:bg-green-600 text-white mb-3 mx-1"
                            type="button"
                            onClick={() => handleApproveClick(group)}
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            id="createProductButton"
                            className="btn bg-red-500 hover:bg-red-600 text-white mb-3 mx-1"
                            type="button"
                            onClick={() => handleApproveClick(group)}
                          >
                            Deactivate
                          </button>
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
          {groups?.totalItems > 0 ? (
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              -{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.min(currentPage * itemsPerPage, groups?.totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {groups?.totalItems}
              </span>
            </span>
          ) : (
            <span className="text-lg font-bold text-[#4F46E5] dark:text-gray-400">
              No items to display
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="#"
            onClick={handlePrevPage}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-black hover:bg-black"
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
            href="#"
            onClick={handleNextPage}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-black hover:bg-black"
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

      {/* Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-10 w-full"
            style={{ maxWidth: "1000px" }}
          >
            <div className="flex justify-center mb-4">
              <h1 className="text-xl font-semibold uppercase">
                Household Trees details{" "}
              </h1>
            </div>
            <hr className="mb-4" />
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  handleCloseModal();
                }}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  handleCloseModal();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupsTable;
