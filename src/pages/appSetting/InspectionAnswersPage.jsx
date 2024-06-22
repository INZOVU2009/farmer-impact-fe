import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import { useDispatch, useSelector } from "react-redux";
import InspectionAnswersTable from "../../partials/dashboard/appSettings/InspectionAnswersTable";
import { fetchSingleInspectionAnswer } from "../../redux/actions/inspectionAnswers/getSingleInspectionAnswer.action";
import { useParams } from "react-router-dom";
function InspectionAnswersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [answers, setAnswers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
const id = useParams().id
console.log("id",id)
  const { answer, loading } = useSelector(
    (state) => state.getSingleInspectionAnswer
  );

  useEffect(() => {
    dispatch(fetchSingleInspectionAnswer(id));
  }, [dispatch,id]);

  useEffect(() => {
    if (answer) {
      setAnswers(answer.data);
    }
  }, [answer]);
console.log("hehefffffffd", answer?.question)


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1,evaluations.data?.totalPages);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
            <p className=" font-bold">Question : {answer?.question} </p> 

            </div>
           <InspectionAnswersTable
           answers = {answers}
       
        
           />
            <div className="grid grid-cols-12 gap-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InspectionAnswersPage;
