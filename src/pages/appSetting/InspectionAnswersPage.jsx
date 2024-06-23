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
  const [answers, setAnswers] = useState([]);

  const dispatch = useDispatch();
  const id = useParams().id;

  const { answer, loading } = useSelector(
    (state) => state.getSingleInspectionAnswer
  );
  const { deletedAnswer } = useSelector(
    (state) => state.deleteInspectionAnswer
  );

  const { newAnswer } = useSelector((state) => state.addNewInspectionAnswer);

  useEffect(() => {
    dispatch(fetchSingleInspectionAnswer(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (answer) {
      setAnswers(answer.data);
    }
  }, [answer]);

  useEffect(() => {
    if (newAnswer) {
      let addedAnswer = newAnswer.data;
      let currentAnswers = answers;

      let updatedAnswers = [addedAnswer, ...currentAnswers];

      setAnswers(updatedAnswers);
    }
  }, [newAnswer]);

  useEffect(() => {
    if (deletedAnswer) {
      const deletedAnswerId = deletedAnswer?.data?.id;
      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== deletedAnswerId)
      );
    }
  }, [deletedAnswer]);

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
            <InspectionAnswersTable answers={answers} />
            <div className="grid grid-cols-12 gap-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InspectionAnswersPage;
