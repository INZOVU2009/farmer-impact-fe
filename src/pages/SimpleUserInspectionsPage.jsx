import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import SimpleUserInspectionsTable from "../partials/dashboard/SimpleUserInspectionsTable";
import { fetchAllInspections } from "../redux/actions/inspections/fetchInspections.action";
import { fetchAllStation } from "../redux/actions/station/allStations.action";
import { fetchAllFarmers } from "../redux/actions/farmers/fetchAllFarmers.action";
import { fetchAllGroups } from "../redux/actions/groups/fetchAllGroups.action";
import { fetchAllHouseHolds } from "../redux/actions/households/fetchAllHousehold.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

function SimpleUserInspectionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allInspections, setAllInspections] = useState(null);
  const [allFarmers, setAllFarmers] = useState(null);
  const [allGroups, setAllGroups] = useState(null);
  const [allHouseholds, setAllHouseholds] = useState(null);
  const [allStation, setAllStation] = useState([]);
  const { inspections } = useSelector((state) => state.fetchAllInspections);
  const { farmers } = useSelector((state) => state.fetchAllFarmers);
  const { groups } = useSelector((state) => state.fetchAllGroups);
  const { households } = useSelector((state) => state.fetchAllHouseHolds);
  const { stations } = useSelector((state) => state.fetchAllStations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllInspections());
  }, [dispatch]);

  useEffect(() => {
    if (inspections) {
      setAllInspections(inspections.data);
    }
  }, [inspections]);

  useEffect(() => {
    dispatch(fetchAllFarmers());
  }, [dispatch]);

  useEffect(() => {
    if (farmers) {
      setAllFarmers(farmers.data);
    }
  }, [farmers]);

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, [dispatch]);

  useEffect(() => {
    if (groups) {
      setAllGroups(groups.data);
    }
  }, [groups]);

  useEffect(() => {
    dispatch(fetchAllHouseHolds());
  }, [dispatch]);

  useEffect(() => {
    if (households) {
      setAllHouseholds(households.data);
    }
  }, [households]);

  useEffect(() => {
    dispatch(fetchAllStation());
  }, [dispatch]);

  useEffect(() => {
    if (stations) {
      setAllStation(stations.data);
    }
  }, [stations]);

  const getStationName = (_kf_Station) => {
    const station = allStation?.find(
      (station) => station.__kp_Station === _kf_Station
    );
    return station ? station.Name : null;
  };

  const getFarmerName = (_kf_Station) => {
    const farmer = allFarmers?.find(
      (farmer) => farmer._kf_Station === _kf_Station
    );
    return farmer ? farmer.Name : null;
  };

  const getFarmerId = (_kf_Station) => {
    const farmer = allFarmers?.find(
      (farmer) => farmer._kf_Station === _kf_Station
    );
    return farmer ? farmer.farmerid : null;
  };
  const getFarmerPhone = (_kf_Station) => {
    const farmer = allFarmers?.find(
      (farmer) => farmer._kf_Station === _kf_Station
    );
    return farmer ? farmer.phone : 0;
  };
  const getGroupID = (_kf_Station) => {
    const group = allGroups?.find((group) => group._kf_Station === _kf_Station);
    return group ? group.ID_GROUP : null;
  };
  const getHouseholdId = (_kf_Station) => {
    const household = allHouseholds?.find(
      (household) => household._kf_Station === _kf_Station
    );
    return household ? household.householdid : null;
  };

  const getUniqueValues = (arr, key) => {
    const uniqueValues = [];
    const uniqueKeys = new Set();

    arr?.forEach((item) => {
      const value = item[key];

      if (!uniqueKeys.has(value)) {
        uniqueKeys.add(value);
        uniqueValues.push(item);
      }
    });

    return uniqueValues;
  };

  let filteredStation = getUniqueValues(allStation, "Name");
  let filteredInspections = getUniqueValues(allInspections, "Score_n");

  const handleDownload = () => {
    const table = document.querySelector(".table-fixed");
    const rows = table.querySelectorAll("tr");

    const data = [];

    const headers = Array.from(rows[0].querySelectorAll("th")).map(
      (header) => header.innerText
    );
    data.push(headers.join(","));

    rows.forEach((row, index) => {
      if (index !== 0) {
        const rowData = [];
        const cells = row.querySelectorAll("td");
        cells.forEach((cell) => {
          rowData.push(cell.innerText);
        });
        data.push(rowData.join(","));
      }
    });

    const csvContent = "data:text/csv;charset=utf-8," + data.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "simple inspections .csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />

            <div className="sm:flex sm:justify-between sm:items-center mb-8"></div>

            <div className="grid grid-cols-12 gap-6">
              <SimpleUserInspectionsTable
                inspections={allInspections}
                stationName={getStationName}
                farmerName={getFarmerName}
                farmerId={getFarmerId}
                groupId={getGroupID}
                farmerPhone={getFarmerPhone}
                householdID={getHouseholdId}
                filteredstation={filteredStation}
                filteredInspections={filteredInspections}
                handleDownload={handleDownload}
              />
            </div>
            <ToastContainer />
          </div>
        </main>
      </div>
    </div>
  );
}
export default SimpleUserInspectionsPage;
