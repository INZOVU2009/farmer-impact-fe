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
  const { attendences } = useSelector((state) => state.fetchAllAttendences);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTrainingsAttendance(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);

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
    link.setAttribute("download", "full inspections.csv");
    document.body.appendChild(link);
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
              />
            </div>
            <ToastContainer />
          </div>
        </main>
      </div>
    </div>
  );
}
export default TrainingParticipantsPage;
