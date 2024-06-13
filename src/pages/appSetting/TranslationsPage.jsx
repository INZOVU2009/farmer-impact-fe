import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import TranslationsTable from "../../partials/dashboard/appSettings/TranslationsTable";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import { fetchAllTranslations } from "../../redux/actions/translations/fetchAllTranslations.action";
import { useDispatch,useSelector } from "react-redux";

function TransalationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTranslations, setAllTranslations] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");


  const { translations, loading } = useSelector(
    (state) => state.fetchAllTranslations
  );
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllTranslations(currentPage, itemsPerPage));
  }, [dispatch]);

  useEffect(() => {
    if (translations) {
      setAllTranslations(translations.data?.translations);
    }
  }, [translations]);
  console.log("hehe",allTranslations)
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredTranslations = allTranslations?.filter((translation) =>
  Object.values(translation).some(
    (value) =>
      value?.toString()?.toLowerCase()?.indexOf(searchTerm?.toLowerCase()) !==
      -1
  )
);

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
            <TranslationsTable
            translations={filteredTranslations}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            handleSearchChange={handleSearchChange}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            searchTerm={searchTerm}
            allTranslations={translations.data?.totalItems}
            />
            <div className="grid grid-cols-12 gap-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TransalationsPage;
