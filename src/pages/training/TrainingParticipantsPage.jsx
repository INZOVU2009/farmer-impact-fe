import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import TrainingParticipantsTable from "../../partials/dashboard/training/TrainingsParticipantTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTrainings } from "../../redux/actions/trainings/fetchAllTrainings.action";
import { fetchAllTrainingsAttendance } from "../../redux/actions/trainingAttendnces/trainingsAttendence";
import { fetchAllGroups } from "../../redux/actions/groups/fetchAllGroups.action";
import { fetchAllFarmers } from "../../redux/actions/farmers/fetchAllFarmers.action";
import { fetchAllStation } from "../../redux/actions/station/allStations.action";
import { fetchAllHouseHolds } from "../../redux/actions/households/fetchAllHousehold.action";
import { fetchAllUsers } from "../../redux/actions/user/Users.action";
import { getUser } from "../../api/userApi";

function TrainingParticipantsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allFarmers, setAllFarmers] = useState(null);
  const [allGroups, setAllGroups] = useState(null);
  const [allHouseholds, setAllHouseholds] = useState(null);
  const [allStation, setAllStation] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const [searchQuery, setSearchQuery] = useState();
  const [allAttendances, setAllAttendances] = useState([]);

  const { farmers } = useSelector((state) => state.fetchAllFarmers);
  const { groups } = useSelector((state) => state.fetchAllGroups);
  const { households } = useSelector((state) => state.fetchAllHouseHolds);
  const { stations } = useSelector((state) => state.fetchAllStations);
  const { trainings } = useSelector((state) => state.fetchAllTrainings);
  const { attendences, loading } = useSelector(
    (state) => state.fetchAllAttendences
  );
  const [allUsers, setAllUsers] = useState([]);
  const { users } = useSelector((state) => state.users);

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const defaultFromDate = `${lastYear}-07-01`;

  // August 1st of the current year
  const defaultToDate = `${currentYear}-08-31`;
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTrainingsAttendance(currentPage, itemsPerPage,fromDate,toDate));
  }, [dispatch, currentPage, itemsPerPage,fromDate,toDate]);

  useEffect(() => {
    if (attendences) {
      setAllAttendances(attendences.data.attendance);
    }
  }, [attendences]);

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
  const getFarmerName = (_kf_Farmer) => {
    const farmer = allFarmers?.find(
      (farmer) => farmer.__Kp_Farmer === _kf_Farmer
    );
    return farmer ? farmer.Name : null;
  };

  const getFarmerId = (_kf_Farmer) => {
    const farmer = allFarmers?.find(
      (farmer) => farmer.__Kp_Farmer === _kf_Farmer
    );
    return farmer ? farmer.farmerid : null;
  };
  const getFarmerPhone = (_kf_Farmer) => {
    const farmer = allFarmers?.find(
      (farmer) => farmer.__Kp_Farmer === _kf_Farmer
    );
    return farmer ? farmer.phone : 0;
  };
  const getGroupID = (_kf_Group) => {
    const group = allGroups?.find((group) => group.__Kp_Group === _kf_Group);
    return group ? group.ID_GROUP : null;
  };
  const getUsername = (nameUser) => {
    const user = allUsers?.find((user) => user.Name_User === nameUser);
    return user ? user.Name_Full : null;
  };
  const getCourseName = (_kf_Course) => {
    const course = allTrainings?.find(
      (course) => course.__Kp_Course === _kf_Course
    );
    return course ? course.Name : null;
  };

  const getCourseId = (_kf_Course) => {
    const course = allTrainings?.find(
      (course) => course.__Kp_Course === _kf_Course
    );
    return course ? course.ID_COURSE : null;
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const totalPages = allAttendances
    ? Math.ceil(allAttendances.totalItems / itemsPerPage)
    : 1;

  const handleDownload = () => {
    if (!allAttendances || allAttendances.length === 0) return;

    // Headers for the CSV file, customize as needed
    const headers = [
      "ATTENDANCE ID",
      "CREATED AT",
      "Farmer Name",
      "Farmer ID",
      "STATION NAME",
      "GROUP ID",
      " COURSE ID",
      "TRAINING COURSE ",
      "CREATED BY",
    ];
    const data = [];

    // Push headers to the CSV data
    data.push(headers.join(","));

    // Loop through all inspections to populate the CSV rows
    allAttendances.forEach((attendance) => {
      const rowData = [
        attendance.id,
        attendance.created_at,
        getFarmerName(attendance._kf_Farmer),
        getFarmerId(attendance._kf_Farmer),
        getStationName(attendance._kf_Station),
        getGroupID(attendance._kf_Group),
        getCourseId(attendance._kf_Course),
        getCourseName(attendance._kf_Course),
        // getUsername(inspection.created_by),
        // getCourseName(inspection._kf_Course),
        getUsername(attendance.username),
      
      ];
      data.push(rowData.join(","));
    });

    // Convert data array to CSV format
    const csvContent = "data:text/csv;charset=utf-8," + data.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "training_attendance.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAttendances = allAttendances?.filter((attendance) => {
    const farmerName = getFarmerName(attendance._kf_Farmer);
    const courseName = getCourseName(attendance._kf_Course);
    return (
      farmerName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      courseName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      allAttendances
    );
  });

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
                <TrainingParticipantsTable
                  attendances={filteredAttendances}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  totalItems={attendences?.data?.totalItems}
                  stationName={getStationName}
                  farmerName={getFarmerName}
                  farmerId={getFarmerId}
                  groupId={getGroupID}
                  courseName={getCourseName}
                  CourseID={getCourseId}
                  handleDownload={handleDownload}
                  searchQuery={searchQuery}
                  handleSearch={handleSearchChange}
                  filteredTrainings={allTrainings}
                  filteredGroups={allGroups}
                  filteredStations={allStation}
                  fromDate={fromDate}
                  toDate={toDate}
                  setFromDate={setFromDate}
                  setToDate={setToDate}
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
export default TrainingParticipantsPage;
