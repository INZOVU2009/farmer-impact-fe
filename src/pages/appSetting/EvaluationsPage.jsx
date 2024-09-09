import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import { useDispatch, useSelector } from "react-redux";
import EvaluationsTable from "../../partials/dashboard/appSettings/EvaluationsTable";
import { fetchAllEvaluations } from "../../redux/actions/evaluations/fetchAllEvaluations.action";
import { addNewInspectionQuestion } from "../../redux/actions/evaluations/addNewInspectionQuestion.action";
import { Toaster } from "react-hot-toast";

function EvaluationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allEvaluations, setAllEvaluations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { evaluations, loading } = useSelector(
    (state) => state.fetchAllEvaluations
  );

  useEffect(() => {
    // Fetch evaluations when the component loads or currentPage changes
    dispatch(fetchAllEvaluations(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    if (evaluations) {
      
      setAllEvaluations(evaluations.data?.evaluations);
    }
  }, [evaluations]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1, evaluations.data?.totalPages);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddNewQuestion = (inspectionQuestion) => {
    dispatch(addNewInspectionQuestion(inspectionQuestion))
      .then(() => {
        // Refetch evaluations after adding a new question
        dispatch(fetchAllEvaluations(currentPage, itemsPerPage));
      })
      .catch((error) => {
        console.error("Error adding new inspection question:", error);
      });

    setAddModalOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Header */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Main content */}
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
            <EvaluationsTable
              allEvaluations={allEvaluations}  
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              totalItems={evaluations?.data?.totalItems}
              isAddModalOpen={isAddModalOpen}
              handleAddNewQuestion={handleAddNewQuestion}
              setAddModalOpen={setAddModalOpen}
            />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default EvaluationsPage;
