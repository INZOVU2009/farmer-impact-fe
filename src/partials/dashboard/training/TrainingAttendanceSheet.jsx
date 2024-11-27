import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import { useDispatch, useSelector } from "react-redux";
import { stationsListAction } from "../../../redux/actions/station/stationsList.action";
import { fetchAllGroupsByStation } from "../../../redux/actions/groups/fetchGroupsByStation.action";
import { fetchFarmersByGroupAction } from "../../../redux/actions/farmers/fetchFarmersByGroupAction";

function TrainingAttendanceSheet() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const stationsListState = useSelector((state) => state.stationsByUser);
  const farmersState = useSelector((state) => state.fetchFarmersByGroup);
  const { groups } = useSelector((state) => state.fetchAllGroups);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stationsList, setStationsList] = useState([]);
  const [grpsList, setGrpsList] = useState([]);
  const [farmersList, setFarmersList] = useState([]);
  const [displayFarmers, setDisplayFarmers] = useState([]);

  const [selectedStation, setSelectedStation] = useState();
  const [selectedGrp, setSelectedGrp] = useState();
  const [selectedFarmers, setSelectedFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "station") {
      setSelectedStation(value);
    }
    if (name === "group") {
      setSelectedGrp(value);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectFarmer = (farmer) => {
    let allFarmers = farmersList;
    let displayedFrms = displayFarmers;
    let selectedFrms = selectedFarmers;

    let selectedFrm = farmersList.find(
      (fm) => fm.__kp_Farmer === farmer.__kp_Farmer
    );

    selectedFrms.push(selectedFrm);

    setSelectedFarmers(selectedFrms);

    allFarmers = allFarmers.filter(
      (fm) => fm.__kp_Farmer !== farmer.__kp_Farmer
    );

    displayedFrms = displayedFrms.filter(
      (fm) => fm.__kp_Farmer !== farmer.__kp_Farmer
    );

    setFarmersList(allFarmers);
    setDisplayFarmers(displayedFrms);
  };

  const handleUnselectFarmer = (farmer) => {
    let allFarmers = farmersList;
    let selectedFrms = selectedFarmers;

    let unSelectedFrm = selectedFrms.find(
      (fm) => fm.__kp_Farmer === farmer.__kp_Farmer
    );

    allFarmers.push(unSelectedFrm);

    selectedFrms = selectedFrms.filter(
      (fm) => fm.__kp_Farmer !== farmer.__kp_Farmer
    );

    setFarmersList(allFarmers);
    setDisplayFarmers(allFarmers);
    setSelectedFarmers(selectedFrms);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      let text = searchTerm.toLowerCase();

      let allFarmers = [...farmersList];

      const filteredFarmers = allFarmers.filter((item) => {
        return Object.values(item).some((value) => {
          return String(value).toLowerCase().includes(text);
        });
      });

      setDisplayFarmers(filteredFarmers);
    } else {
      setDisplayFarmers(farmersList || []);
    }
  }, [searchTerm]);

  useEffect(() => {
    let allGroups = groups.data;

    setGrpsList(allGroups || []);
  }, [groups]);

  useEffect(() => {
    if (farmersState.response) {
      let allFarmers = farmersState.response.allFarmers || [];
      setFarmersList(allFarmers);
      setDisplayFarmers(allFarmers);
    }
  }, [farmersState]);

  useEffect(() => {
    if (stationsListState.response) {
      let allStations = stationsListState.response.allStations;
      setStationsList(allStations);
    }
  }, [stationsListState]);

  useEffect(() => {
    if (selectedStation) {
      setSelectedGrp();
      setFarmersList([]);
      setDisplayFarmers([]);
      setSelectedFarmers([]);
      setGrpsList([]);

      dispatch(fetchAllGroupsByStation(1, 999999999, token, selectedStation));
    }
  }, [selectedStation]);

  useEffect(() => {
    if (selectedGrp) {
      dispatch(fetchFarmersByGroupAction(selectedGrp, token));
    }
  }, [selectedGrp]);

  useEffect(() => {
    dispatch(stationsListAction(token));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex flex-row justify-center gap-16 w-full">
              <div className="flex flex-col gap-2 w-auto">
                <label className="text-md">Station: </label>
                <select
                  className="rounded-md w-full bg-white dark:bg-slate-700"
                  name="station"
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
              <div className="flex flex-col gap-2 w-auto">
                <label className="text-md">Group: </label>
                <select
                  className="rounded-md w-full bg-white dark:bg-slate-700"
                  name="group"
                  onChange={handleInputChange}
                >
                  <option value="">Select group</option>
                  {grpsList.map((group) => (
                    <option key={group.id} value={group.__kp_Group}>
                      {group.ID_GROUP}{" "}
                      {group.Name?.length > 1 && `| ${group.Name}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr className="my-8" />
            <div className="flex flex-col">
              <div className="flex flex-row justify-around w-full">
                <div className="flex flex-col gap-2 w-[40%]">
                  {farmersList.length > 0 && (
                    <div className="flex flex-col sm:mb-0 w-full">
                      <h1 className="text-xl">Select farmers for attendance</h1>
                      <hr />
                      <form className="my-4 sm:pr-3" action="#" method="GET">
                        <label htmlFor="products-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                          <input
                            type="text"
                            name="search"
                            id="products-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search farmer"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </form>
                    </div>
                  )}
                  {displayFarmers?.map((farmer) => (
                    <div
                      className="flex flex-row justify-between gap-2 w-full shadow-sm p-3 bg-white dark:bg-slate-800 rounded-sm hover:dark:bg-black hover:rounded-xl hover:bg-slate-200 hover:text-black cursor-pointer duration-100"
                      onClick={() => handleSelectFarmer(farmer)}
                    >
                      <label className="text-base dark:text-gray-400">
                        {farmer.Name}
                      </label>
                      <svg
                        length={25}
                        width={25}
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
                            d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                            fill="#8be58c"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 w-[40%]">
                  {selectedFarmers?.length > 0 && (
                    <div className="flex flex-col sm:mb-0 w-full">
                      <h1 className="text-xl">Selected farmers</h1>
                      <hr />
                      <button
                        id="createProductButton"
                        className="btn bg-blue-500 hover:bg-blue-600 text-white mx-1 my-6"
                        type="button"
                        onClick={() => generateSheet()}
                      >
                        Generate Attendance sheet
                      </button>
                    </div>
                  )}
                  {selectedFarmers?.map((farmer) => (
                    <div
                      className="flex flex-row justify-between gap-2 w-full shadow-sm p-3 bg-white dark:bg-slate-800 rounded-sm hover:dark:bg-black hover:rounded-xl hover:bg-orange-200 hover:text-black duration-100 cursor-pointer"
                      onClick={() => handleUnselectFarmer(farmer)}
                    >
                      <label className="text-base dark:text-gray-400">
                        {farmer.Name}
                      </label>
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TrainingAttendanceSheet;
