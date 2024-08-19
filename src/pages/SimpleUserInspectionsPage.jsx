import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { fetchAllInspections } from "../redux/actions/inspections/fetchInspections.action";
import { fetchAllStation } from "../redux/actions/station/allStations.action";
import { fetchAllFarmers } from "../redux/actions/farmers/fetchAllFarmers.action";
import { fetchAllGroups } from "../redux/actions/groups/fetchAllGroups.action";
import { fetchAllHouseHolds } from "../redux/actions/households/fetchAllHousehold.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTrainings } from "../redux/actions/trainings/fetchAllTrainings.action";
import { fetchAllUsers } from "../redux/actions/user/Users.action";
import SimpleUserInspectionsTable from "../partials/dashboard/SimpleUserInspectionsTable";

function UserInspectionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allInspections, setAllInspections] = useState(null);
  const [allFarmers, setAllFarmers] = useState(null);
  const [allGroups, setAllGroups] = useState(null);
  const [allHouseholds, setAllHouseholds] = useState(null);
  const [allStation, setAllStation] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState();
  const { inspections, loading } = useSelector(
    (state) => state.fetchAllInspections
  );
  const { farmers } = useSelector((state) => state.fetchAllFarmers);
  const { groups } = useSelector((state) => state.fetchAllGroups);
  const { households } = useSelector((state) => state.fetchAllHouseHolds);
  const { stations } = useSelector((state) => state.fetchAllStations);
  const { trainings } = useSelector((state) => state.fetchAllTrainings);
  const [allUsers, setAllUsers] = useState([]);

  const { users } = useSelector((state) => state.users);

  const itemsPerPage = 20;

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const defaultFromDate = `${lastYear}-07-01`;

  // August 1st of the current year
  const defaultToDate = `${currentYear}-08-31`;
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllInspections(fromDate, toDate));
  }, [dispatch, fromDate, toDate]);

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

  useEffect(() => {
    dispatch(fetchAllTrainings());
  }, [dispatch]);

  useEffect(() => {
    if (trainings) {
      setAllTrainings(trainings.data);
    }
  }, [trainings]);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setAllUsers(users.data);
    }
  }, [users]);
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
  const getGroupID = (_kf_Station) => {
    const group = allGroups?.find((group) => group._kf_Station === _kf_Station);
    return group ? group.ID_GROUP : null;
  };
  const getFarmerPhone = (_kf_Station) => {
    const farmer = allFarmers?.find(
      (farmer) => farmer._kf_Station === _kf_Station
    );
    return farmer ? farmer.phone : 0;
  };

  const getHouseholdId = (_kf_Station) => {
    const household = allHouseholds?.find(
      (household) => household._kf_Station === _kf_Station
    );
    return household ? household.householdid : null;
  };

  const getCourseName = (_kf_Course) => {
    const course = allTrainings?.find(
      (course) => course.__Kp_Course === _kf_Course
    );
    return course ? course.Name : null;
  };
  const getUsername = (nameUser) => {
    const user = allUsers?.find((user) => user.Name_User === nameUser);
    return user ? user.Name_Full : null;
  };

  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
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
    if (!allInspections || allInspections.length === 0) return;

    // Headers for the CSV file, customize as needed
    const headers = [
      "Inspection ID",
      "Station Name",
      "Farmer Name",
      "Farmer ID",
      "Group ID",
      "Farmer Phone",
      "Household ID",
      "Inspector",
      "Course Name",
      "Score",
    ];
    const data = [];

    // Push headers to the CSV data
    data.push(headers.join(","));

    // Loop through all inspections to populate the CSV rows
    allInspections.forEach((inspection) => {
      const rowData = [
        inspection.id,
        getStationName(inspection._kf_Station),
        getFarmerName(inspection._kf_Station),
        getFarmerId(inspection._kf_Station),

        getGroupID(inspection._kf_Station),

        getFarmerPhone(inspection._kf_Station),
        getHouseholdId(inspection._kf_Station),

        getUsername(inspection.created_by),
        getCourseName(inspection._kf_Course),
        inspection.Score_n,
      ];
      data.push(rowData.join(","));
    });

    // Convert data array to CSV format
    const csvContent = "data:text/csv;charset=utf-8," + data.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "all_inspections.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const handleDateChange = () => {
    dispatch(fetchAllInspections(fromDate, toDate));
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
              {loading ? (
                <div className="text-center text-3xl">Loading...</div>
              ) : (
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
                  courseName={getCourseName}
                  handleSearch={handleSearch}
                  fromDate={fromDate}
                  toDate={toDate}
                  handleDateChange={handleDateChange}
                  setFromDate={setFromDate}
                  setToDate={setToDate}
                  fullName={getUsername}
                />
              )}
            </div>
            <ToastContainer />
          </div>
        </main>
      </div>
    </div>
  );
}
export default UserInspectionsPage;
