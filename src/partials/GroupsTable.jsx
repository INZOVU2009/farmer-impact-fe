import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllGroupsByStation } from "../redux/actions/groups/fetchGroupsByStation.action";
import acronymGenerator from "../helpers/acronymGenerator";
import { createNewGroups } from "../redux/actions/groups/createNewGroup.action";
import { resetCreateGroupState } from "../redux/slices/groups/createNewGroupSlice";
import { approveNewGroup } from "../redux/actions/groups/approveNewGroup.action";
import { toggleGroupAction } from "../redux/actions/groups/toggleGroup.action";
import { resetApproveGroupState } from "../redux/slices/groups/approveNewGroupSlice";
import { resetToggleGroupState } from "../redux/slices/groups/toggleGroupSlice";
import { getModules } from "../redux/actions/accessModules/getAllModules.action";
import { assignedModules } from "../redux/actions/accessModules/getAssignedModules.action";

function GroupsTable() {
  const dispatch = useDispatch();

  const [displayGroups, setDisplayGroups] = useState([]);
  const [stationsList, setStationsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    station: "",
    Area_Big: "",
    Area_Biggest: "",
    Area_Medium: "",
  });
  const [selectedStation, setSelectedStation] = useState();
  const [generatedID, setGeneratedID] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [grpNameValid, setGrpNameValid] = useState(false);

  const [allAssignedModules, setAllAssignedModules] = useState();
  const [retrievedModules, setRetrievedModules] = useState();
  const [filteredModules, setFilteredModules] = useState([]);
  const [assignedModuleIds, setAssignedModuleIds] = useState([]);
  const [isAllowedToApprove, setIsAllowedToApprove] = useState(false);
  const [isAllowedToToggle, setIsAllowedToToggle] = useState(false);

  const { groups } = useSelector((state) => state.fetchAllGroups);
  const { modules } = useSelector((state) => state.fetchAllModules);
  const { modulesAssigned } = useSelector(
    (state) => state.fetchAssignedModules
  );

  const createGroupState = useSelector((state) => state.createFarmerGroup);
  const approveGroupState = useSelector((state) => state.approveFarmerGroup);
  const toggleGroupState = useSelector((state) => state.activateFarmerGroup);

  const token = localStorage.getItem("token");

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, groups?.totalPages));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApproveClick = (id) => {
    dispatch(approveNewGroup(id, token));
  };

  const handleActivateClick = (id) => {
    dispatch(toggleGroupAction(id, token));
  };

  const handleDeactivateClick = (id) => {
    dispatch(toggleGroupAction(id, token));
  };

  const handleCreateGroup = () => {
    setSubmitted(true);
    let submitData = {
      ...formData,
      ...{
        _kf_Station: getStation(selectedStation).__kp_Station,
        _kf_Supplier: getStation(selectedStation)._kf_Supplier,
        Area_Big: formData?.Area_Big || getStation(selectedStation).Area_Big,
        Area_Biggest:
          formData?.Area_Biggest || getStation(selectedStation).Area_Biggest,
        Area_Medium:
          formData?.Area_Medium || getStation(selectedStation).Area_Medium,
        ID_GROUP: generatedID,
      },
    };

    dispatch(createNewGroups({ group: submitData }, token));
  };

  const getStation = (kp) => {
    return stationsList.find((item) => item.__kp_Station === kp);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setFormData({
      station: "",
      Area_Big: "",
      Area_Biggest: "",
      Area_Medium: "",
    });
    setGeneratedID();
    setSubmitted(false);
    setSelectedStation();
    setGrpNameValid(false);
    dispatch(resetToggleGroupState());
    dispatch(resetApproveGroupState());
    dispatch(resetCreateGroupState());
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "station") {
      let selected_station = getStation(value);
      let prefix = acronymGenerator(selected_station?.Name);
      setGeneratedID(prefix);
      setSelectedStation(value);
    }
    if (name === "group_name") {
      let pattern = /^[a-zA-Z s]+$/;
      setGrpNameValid(pattern.test(value));
    }

    setFormData((prevState) => ({
      ...prevState,
      ...{ [name]: value },
    }));
  };

  useEffect(() => {
    let filteredMods = retrievedModules?.filter((module) =>
      assignedModuleIds.includes(module.id)
    );

    setIsAllowedToApprove(
      filteredMods?.some((module) => module.module_name === "Groups approve")
    );
    setIsAllowedToToggle(
      filteredMods?.some((module) => module.module_name === "Groups toggle")
    );
    setFilteredModules(filteredMods);
  }, [retrievedModules]);

  useEffect(() => {
    if (modules) {
      setRetrievedModules(modules.data);
    }
  }, [modules]);

  useEffect(() => {
    if (allAssignedModules) {
      setAssignedModuleIds(
        allAssignedModules?.map((mod) => mod.moduleid) || []
      );
    }
  }, [allAssignedModules]);

  useEffect(() => {
    if (modulesAssigned) {
      setAllAssignedModules(modulesAssigned.data);
    }
  }, [modulesAssigned]);

  useEffect(() => {
    if (selectedStation) {
      setFormData({
        station: selectedStation,
        Area_Big: getStation(selectedStation)?.Area_Big || "N/A",
        Area_Biggest: getStation(selectedStation)?.Area_Biggest || "N/A",
        Area_Medium: getStation(selectedStation)?.Area_Medium || "N/A",
      });
    }
  }, [selectedStation]);

  useEffect(() => {
    if (createGroupState.response) {
      let fullyGeneratedID = createGroupState.response.generatedID;
      let newGroup = createGroupState.response.createdGroup;

      let allGroups = [...displayGroups];

      allGroups.unshift(newGroup);

      setDisplayGroups(allGroups);

      setGeneratedID(fullyGeneratedID);
    }
  }, [createGroupState.response]);

  useEffect(() => {
    if (approveGroupState.response) {
      let approvedGroup = approveGroupState.response.approvedGroup;

      let allGroups = displayGroups.filter(
        (item) => item.__kp_Group !== approvedGroup.__kp_Group
      );

      allGroups.unshift(approvedGroup);
      setDisplayGroups(allGroups);
    }
  }, [approveGroupState.response]);

  useEffect(() => {
    if (toggleGroupState.response) {
      let toggledGroup = toggleGroupState.response.toggledGroup;

      let allGroups = displayGroups.filter(
        (item) => item.__kp_Group !== toggledGroup.__kp_Group
      );

      allGroups.unshift(toggledGroup);
      setDisplayGroups(allGroups);
    }
  }, [toggleGroupState.response]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      let text = searchTerm.toLowerCase();

      let currentGrps = [...displayGroups];

      const filteredGroups = currentGrps.filter((item) => {
        return Object.values(item).some((value) => {
          return String(value).toLowerCase().includes(text);
        });
      });
      setDisplayGroups(filteredGroups);
    } else {
      setDisplayGroups(groups.data || []);
    }
  }, [searchTerm]);

  useEffect(() => {
    dispatch(fetchAllGroupsByStation(currentPage, itemsPerPage, token));
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    let allGroups = groups.data;
    let allStations = groups.allStations;

    setDisplayGroups(allGroups || []);
    setStationsList(allStations || []);
  }, [groups]);

  useEffect(() => {
    dispatch(getModules());
    dispatch(assignedModules(token));

    return () => {
      setAddModalOpen(false);
      setFormData({
        station: "",
        Area_Big: "",
        Area_Biggest: "",
        Area_Medium: "",
      });
      setGeneratedID();
      setSubmitted(false);
      setSelectedStation();
      setGrpNameValid(false);
      dispatch(resetToggleGroupState());
      dispatch(resetApproveGroupState());
      dispatch(resetCreateGroupState());
    };
  }, []);

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

            {filteredModules?.some(
              (module) => module.module_name === "Groups create"
            ) && (
              <button
                id="createProductButton"
                className="btn bg-blue-500 hover:bg-blue-600 text-white mx-1"
                type="button"
                onClick={() => setAddModalOpen(true)}
              >
                Create New Group
              </button>
            )}
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
                      Status
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
                        {getStation(group._kf_Station)?.Name || (
                          <label className="align-middle text-gray-400 text-sm text-center">
                            N/A
                          </label>
                        )}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {group.ID_GROUP}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {group.Name.length > 0 ? (
                          group.Name
                        ) : (
                          <label className="align-middle text-gray-400 text-sm text-center">
                            N/A
                          </label>
                        )}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {group.Area_Biggest.length > 0 ? (
                          group.Area_Biggest
                        ) : (
                          <label className="align-middle text-gray-400 text-sm text-center">
                            N/A
                          </label>
                        )}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {group.Area_Big.length > 0 ? (
                          group.Area_Big
                        ) : (
                          <label className="align-middle text-gray-400 text-sm text-center">
                            N/A
                          </label>
                        )}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {group.status === "approved" ? (
                          <label className="text-green-600 text-xs bg-green-300 rounded-full p-1">
                            Approved
                          </label>
                        ) : (
                          <label className="text-yellow-600 text-xs bg-yellow-200 rounded-full p-1">
                            Pending
                          </label>
                        )}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {group.active == "0" && group.status !== "pending" ? (
                          <button
                            id="createProductButton"
                            className={`btn bg-green-500 text-white mb-3 mx-1 ${
                              isAllowedToToggle
                                ? "opacity-100 hover:bg-green-600"
                                : "opacity-40"
                            }`}
                            type="button"
                            onClick={() =>
                              handleActivateClick(group.__kp_Group)
                            }
                            disabled={!isAllowedToToggle}
                          >
                            Activate
                          </button>
                        ) : group.active == "1" &&
                          group.status !== "pending" ? (
                          <button
                            id="createProductButton"
                            className={`btn bg-red-500 text-white mb-3 mx-1 ${
                              isAllowedToToggle
                                ? "opacity-100 hover:bg-red-600"
                                : "opacity-40"
                            }`}
                            type="button"
                            onClick={() =>
                              handleDeactivateClick(group.__kp_Group)
                            }
                            disabled={!isAllowedToToggle}
                          >
                            Deactivate
                          </button>
                        ) : (
                          ""
                        )}
                        {group.status === "pending" && (
                          <button
                            id="createProductButton"
                            className={`btn bg-blue-500 hover:bg-blue-600 text-white mb-3 mx-1 ${
                              isAllowedToApprove ? "opacity-100" : "opacity-40"
                            }`}
                            type="button"
                            onClick={() => handleApproveClick(group.__kp_Group)}
                            disabled={!isAllowedToApprove}
                          >
                            Approve
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
            className="flex flex-col bg-white items-center justify-center dark:bg-gray-800 p-8 rounded-lg shadow-lg z-10 w-fit"
            style={{ maxWidth: "1000px" }}
          >
            <div className="flex justify-center mb-4">
              <h1 className="text-xl font-semibold uppercase">Create Group</h1>
            </div>
            <hr className="mb-4" />
            <div className="flex w-full items-center justify-center">
              <form className="flex flex-row gap-4 w-full justify-center">
                <div className="flex flex-col gap-2 w-64">
                  <div className="flex flex-col gap-4 w-64">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-xl">Station: </label>
                      <select
                        className="rounded-md w-full"
                        name="station"
                        value={formData?.station}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Station</option>
                        {stationsList.map((station) => (
                          <option
                            key={station.__kp_Station}
                            value={station.__kp_Station}
                          >
                            {station.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-xl">Group ID(prefix):</label>
                      <input
                        name="ID_GROUP"
                        className="rounded-lg w-auto opacity-70"
                        type="text"
                        value={
                          generatedID && !createGroupState.response
                            ? `${generatedID} _ _ _ _`
                            : generatedID && createGroupState.response
                            ? generatedID
                            : "N/A"
                        }
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-xl">Group name:</label>
                      <input
                        name="group_name"
                        className={`rounded-lg w-64 ${
                          grpNameValid ? "border-green-400" : "border-red-500"
                        }`}
                        type="text"
                        value={formData?.group_name || ""}
                        onChange={handleInputChange}
                      />

                      {grpNameValid ? (
                        <div className="flex flex-row items-center gap-1">
                          <svg
                            width={25}
                            height={25}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M12 2C6.4898 2 2 6.4898 2 12C2 17.5102 6.4898 22 12 22C17.5102 22 22 17.5102 22 12C22 6.4898 17.5102 2 12 2ZM15.5714 10.4694L11.4898 14.551C11.2857 14.6531 11.1837 14.7551 10.9796 14.7551C10.7755 14.7551 10.5714 14.6531 10.4694 14.551L8.42857 12.5102C8.12245 12.2041 8.12245 11.6939 8.42857 11.3878C8.73469 11.0816 9.2449 11.0816 9.55102 11.3878L11.0816 12.9184L14.6531 9.34694C14.9592 9.04082 15.4694 9.04082 15.7755 9.34694C15.8776 9.7551 15.8776 10.1633 15.5714 10.4694Z"
                                fill="#4ade80"
                              ></path>{" "}
                            </g>
                          </svg>
                          <label className="text-sm text-green-400">
                            Group name is valid
                          </label>
                        </div>
                      ) : (
                        <div className="flex flex-row items-center gap-1">
                          <svg
                            width={25}
                            height={25}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                                fill="#ef4444"
                              ></path>{" "}
                            </g>
                          </svg>
                          <label className="text-sm text-red-400">
                            Group name is invalid
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-64">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xl">Location | Biggest:</label>
                    <input
                      name="Area_Biggest"
                      className="rounded-lg w-64"
                      type="text"
                      value={formData?.Area_Biggest}
                      onChange={handleInputChange}
                      disabled={!selectedStation}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xl">Location | Big:</label>
                    <input
                      name="Area_Big"
                      className="rounded-lg w-64"
                      type="text"
                      value={formData?.Area_Big}
                      onChange={handleInputChange}
                      disabled={!selectedStation}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xl">Location | Medium:</label>
                    <input
                      name="Area_Medium"
                      className="rounded-lg w-64"
                      type="text"
                      value={formData?.Area_Medium}
                      onChange={handleInputChange}
                      disabled={!selectedStation}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-4 flex w-full justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className={`bg-green-500 text-white px-4 py-2 rounded-lg ${
                  submitted || !selectedStation || !grpNameValid
                    ? "opacity-40"
                    : "opacity-100"
                }`}
                onClick={() => {
                  handleCreateGroup();
                }}
                disabled={submitted || !selectedStation || !grpNameValid}
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

export default GroupsTable;
