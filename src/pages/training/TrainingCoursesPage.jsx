import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import TrainingsTable from "../../partials/dashboard/training/TrainingCoursesTable";
import { fetchAllTrainings } from "../../redux/actions/trainings/fetchAllTrainings.action";
import { useDispatch, useSelector } from "react-redux";
import EditCourseModel from "../../components/EditCourseModel";

function TrainingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTrainings, setAllTrainings] = useState([]);
  const [showEditCourseModel, setShowEditCourseModel] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const { trainings, loading } = useSelector(
    (state) => state.fetchAllTrainings
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTrainings(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    if (trainings) {
      setAllTrainings(trainings.data);
    }
  }, [trainings]);
  const handleClickEditIconAction = (course) => {
    setSelectedCourse(course);
    setShowEditCourseModel(true);
  };

  const handleTransactionUpdate = (userId, newPassword) => {
    setSelectedCourse(null);
    setShowEditCourseModel(true);
  };
  const totalItems = trainings?.totalItems;
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="flex h-screen overflow-hidden">
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
                <TrainingsTable
                  trainings={allTrainings}
                  handleClickEditIconAction={handleClickEditIconAction}
                  showEditCourseModel={showEditCourseModel}
                  setShowEditCourseModel={setShowEditCourseModel}
                  selectedCourse={selectedCourse}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default TrainingsPage;
