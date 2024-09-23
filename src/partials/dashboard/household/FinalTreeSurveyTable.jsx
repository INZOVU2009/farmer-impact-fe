import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTrees } from "../../../redux/actions/householdTrees/fetchAllTrees.action";
import { verifyTrees } from "../../../redux/actions/householdTrees/verifyHouseholdTrees.action";
import { getTreeDetails } from "../../../redux/actions/householdTrees/fetchTreeDetails.action";
function FinalTreeSurveyTable() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [allTrees, setAllTrees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null);
  const [kpTreesSurvey, setKpTreessurvey] = useState(null);
  const [treeDetails, setTreeDetails] = useState([]);
  const { householdTrees } = useSelector((state) => state.fetchAllTrees);
  const { details } = useSelector((state) => state.fetchTreeDetails);

  useEffect(() => {
    dispatch(fetchAllTrees(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);
  useEffect(() => {
    if (householdTrees) {
      // Filter trees with status 'Approved'
      const approvedTrees =
        householdTrees?.data?.household?.filter(
          (tree) => tree.status === "verified"
        ) || [];
      setAllTrees(approvedTrees);
    }
  }, [householdTrees]);

  useEffect(() => {
    if (kpTreesSurvey) {
      dispatch(getTreeDetails(kpTreesSurvey));
    }
  }, [kpTreesSurvey, dispatch]);

  useEffect(() => {
    if (details) {
      setTreeDetails(details?.data);
    }
  }, [details]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = householdTrees?.data?.totalPages || 1;
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHouseholdTrees = allTrees.filter((tree) =>
    Object.values(tree).some(
      (value) =>
        value?.toString()?.toLowerCase()?.indexOf(searchTerm?.toLowerCase()) !==
        -1
    )
  );

  const handleVerifyClick = (tree) => {
    setSelectedTree(tree);
    setKpTreessurvey(tree.__kp_trees_survey);

    setAddModalOpen(true);
  };

  const handleVerifyTrees = (id) => {
    dispatch(verifyTrees(id)).then(() => {
      setAllTrees((prevTrees) => prevTrees.filter((trees) => trees.id !== id));
    });
  };
  const handleCloseModal = () => {
    setAddModalOpen(false);
    setSelectedTree(null);
  };

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center mb-4 sm:mb-0">
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
                  placeholder="Search for household"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
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
                      Group
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Farmer Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Farmer ID
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      National ID
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Surveyor
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
                  {filteredHouseholdTrees.map((tree, index) => (
                    <tr
                      key={tree.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="w-4 p-4">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {tree.station_name}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {tree.group_id}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {tree.farmer_name}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {tree.farmer_id}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {tree.national_id}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {tree.gender}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {tree.full_name}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button
                          id="createProductButton"
                          className="btn bg-green-500 hover:bg-green-600 text-white mb-3"
                          type="button"
                          onClick={() => handleVerifyClick(tree)}
                        >
                          Verify
                        </button>
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
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(currentPage * itemsPerPage, allTrees?.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {allTrees?.length}
            </span>
          </span>
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
            {selectedTree && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
                <div>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Station:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.station_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Group:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.group_id}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Farmer Name:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.farmer_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Farmer ID:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.farmer_id}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>National ID:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.national_id}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Year:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.year_of_birth}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Gender:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.gender}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Phone:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.phone}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Children:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          ( -20 is {selectedTree.child_1_to_20_yrs})<br />(
                          20-30 is {selectedTree.child_20_to_30_yrs})
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Source of income:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.income_source_main}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Coffee Plot:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.coffee_farms}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Trees:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.coffee_trees}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Receiving Trees:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          ({treeDetails.received_seedlings_year} is{" "}
                          {treeDetails.received_seedlings})<br />
                          {/* (
                          {selectedTree.seedling_last_2_year} is{" "}
                          {selectedTree.received_tree_2_y})<br />(
                          {selectedTree.seedling_last_year} is{" "}
                          {selectedTree.received_tree_l_y}) */}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Trees Year:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          ( -10 is {selectedTree.trees_less_than_10})<br />(
                          10-20 is {selectedTree.trees_10_20})<br />( 20+ is{" "}
                          {selectedTree.trees_20_more})
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Rejuvenation Trees:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          ({treeDetails.rejuvenated_seedlings_year} is{" "}
                          {treeDetails.rejuvenated_seedlings})<br />
                          {/* ( */}
                          {/* {selectedTree.rejuvenation_current_year} is{" "}
                          {selectedTree.rejuvenated_c_tree}) */}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Production:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          ({treeDetails.est_production_year} is{" "}
                          {treeDetails.est_production_year})<br />
                          {/* ( */}
                          {/* {selectedTree.current_season} is{" "}
                          {selectedTree.current_season_production}) */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Nitrogen Trees:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.nitrogen_fixing_shade_trees}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Natural Shade Trees:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.natural_shade_trees}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Shade Trees:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.shade_trees}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Other Crops:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.other_crops_in_coffee_farm}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Other Farm:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.other_crops_in_farm}
                        </td>
                      </tr>

                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>GPS:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.latitude}
                          <br />
                          {selectedTree.longitude}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-medium text-gray-900 dark:text-white">
                          <strong>Serveyor:</strong>
                        </td>
                        <td className="p-2 text-left text-gray-500 dark:text-gray-400">
                          {selectedTree.full_name}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  handleVerifyTrees(selectedTree.id);
                  handleCloseModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalTreeSurveyTable;
