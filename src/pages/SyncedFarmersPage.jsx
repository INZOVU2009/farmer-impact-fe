import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SyncedFarmersTable from "../partials/dashboard/SyncedFarmersTable";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { fetchAllFarmers } from "../redux/actions/farmers/fetchAllFarmers.action";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStation } from "../redux/actions/station/allStations.action";
import { fetchAllGroups } from "../redux/actions/groups/fetchAllGroups.action";
import { fetchAllHouseHolds } from "../redux/actions/households/fetchAllHousehold.action";

function SyncedFarmersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allFarmers, setAllFarmers] = useState([]);
  const [allGroups, setAllGroups] = useState(null);
  const [allHouseholds, setAllHouseholds] = useState(null);
  const [searchQuery, setSearchQuery] = useState();

  const { farmers } = useSelector((state) => state.fetchAllFarmers);
  const [currentPage, setCurrentPage] = useState(1);
  const { stations } = useSelector((state) => state.fetchAllStations);
  const { groups } = useSelector((state) => state.fetchAllGroups);
  const { households } = useSelector((state) => state.fetchAllHouseHolds);

  const [allStation, setAllStation] = useState([]);
  const itemsPerPage = 100;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFarmers());
  }, [dispatch]);

  useEffect(() => {
    if (farmers) {
      setAllFarmers(farmers.data);
    }
  }, [farmers]);

  useEffect(() => {
    dispatch(fetchAllStation());
  }, [dispatch]);

  useEffect(() => {
    if (stations) {
      setAllStation(stations.data);
    }
  }, [stations]);
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
  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
  };
  const filteredFarmers = searchQuery
    ? allFarmers?.filter((farmer) =>
        Object.values(farmer).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery?.toLowerCase())
        )
      )
    : allFarmers;

  const totalPages = Math.ceil(filteredFarmers?.length / itemsPerPage);

  const paginatedFarmers = filteredFarmers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const getStationName = (_kf_Station) => {
    const station = allStation?.find(
      (station) => station.__kp_Station === _kf_Station
    );
    return station ? station.Name : null;
  };
  const getGroupID = (_kf_Station) => {
    const group = allGroups?.find((group) => group._kf_Station === _kf_Station);
    return group ? group.ID_GROUP : null;
  };
  const getHouseholdInspectionStatus = (_kf_Station) => {
    const household = allHouseholds?.find(
      (household) => household._kf_Station === _kf_Station
    );
    return household ? household.InspectionStatus : null;
  };
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
    link.setAttribute("download", "Synced farmers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/** sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/** Header  */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/** Main content */}
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/** Welcome Banner */}
            <WelcomeBanner />
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
            </div>

            <div className="grid grid-cols-12 gap-6">
              <SyncedFarmersTable
                farmers={paginatedFarmers}
                itemsPerPage={itemsPerPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                allFarmers={allFarmers}
                currentPage={currentPage}
                station={getStationName}
                groupId={getGroupID}
                inspectionStatus={getHouseholdInspectionStatus}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                handleDownload={handleDownload}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SyncedFarmersPage;
