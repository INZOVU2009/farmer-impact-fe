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

  const [selectedStation, setSelectedStation] = useState();
  const [selectedGrp, setSelectedGrp] = useState();
  const [selectedFarmers, setSelectedFarmers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "station") {
      setSelectedStation(value);
    }
    if (name === "group") {
      setSelectedGrp(value);
    }
  };

  useEffect(() => {
    let allGroups = groups.data;

    setGrpsList(allGroups || []);
  }, [groups]);

  useEffect(() => {
    if (farmersState.response) {
      let allFarmers = farmersState.response.allFarmers || [];
      setFarmersList(allFarmers);
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
                  className="rounded-md w-full"
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
                  className="rounded-md w-full"
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default TrainingAttendanceSheet;
