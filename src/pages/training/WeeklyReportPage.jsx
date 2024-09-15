import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import { Toaster } from "react-hot-toast";
import WeeklyReportTable from "../../partials/dashboard/training/WeeklyReportTable";
import { fetchAllWeeklyReport } from "../../redux/actions/trainings/fetchWeeklyReport.action";

function WeeklyReportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize with an empty array to avoid undefined issues
  const [allWeeklyReport, setAllWeeklyReport] = useState([]);

  const { weeklyReport } = useSelector((state) => state.fetchWeeklyReport);
  const itemsPerPage = 20
  const dispatch = useDispatch();

  // Fetch the weekly report on component mount
  useEffect(() => {
    dispatch(fetchAllWeeklyReport());
  }, [dispatch]);

  // Update the state when the weekly report data is available
  useEffect(() => {
    if (weeklyReport ) {
      setAllWeeklyReport(weeklyReport.data);
    }
  }, [weeklyReport]);

const totalPages = Math.ceil(allWeeklyReport?.length / itemsPerPage);

// Paginate the user data
const paginatedReports = allWeeklyReport?.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

const handleNextPage = () => {
  setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
};
console.log("hsfdhg",allWeeklyReport)
const handleDownload = () => {
  if (!allWeeklyReport || allWeeklyReport.length === 0) return;

  // Headers for the CSV file, customize as needed
  const headers = [
    "USER ID",
    "CREATED AT",
    "TRAINER NAME",
    "CW NAME",
    "INSPECTED FARMERS",
    "PLANNED GROUPS",
    "INSPECTED GROUPS",
    "ATTENDED FARMERS",
    "ATTENDED WOMEN",
    "ATTENDED MEN",
    "COMMENTS",
  ];
  const data = [];

  // Push headers to the CSV data
  data.push(headers.join(","));

  // Loop through all inspections to populate the CSV rows
  allWeeklyReport.forEach((report) => {
    const rowData = [
      report.ID,
      report.createdAt,
      report.full_name,
      report.CW_Name,
      report.farm_inspected,
      report.planned_groups,
      report.trained_number,
      report.women_attended,
      report.men_attendade,
      report.comments

    
    ];
    data.push(rowData.join(","));
  });

  // Convert data array to CSV format
  const csvContent = "data:text/csv;charset=utf-8," + data.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "training_weekly_report.csv");
  document.body.appendChild(link); // Required for FF
  link.click();
  document.body.removeChild(link);
};
 
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
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
            </div>

            <div className="grid grid-cols-12 gap-6">
              <WeeklyReportTable allReports={allWeeklyReport} 
              paginatedReports={paginatedReports}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handleDownload={handleDownload}
              />
            </div>
            <Toaster />
          </div>
        </main>
      </div>
    </div>
  );
}

export default WeeklyReportPage;
