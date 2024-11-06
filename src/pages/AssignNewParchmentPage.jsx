import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import AssignNewParchmentTable from "../partials/dashboard/AssignNewParchmentTable";
import { fetchAllDryings } from "../redux/actions/dryings/allDryings.action";
import { fetchAllTransactions } from "../redux/actions/transactions/allTransactions.action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assigParchment } from "../redux/actions/parchnment/assignNewParchment.action.action";
import AssignNewParchmentModel from "../components/AssignNewParchmentModel";
import {
  setCertification,
  clearCertification,
} from "../redux/actions/parchnment/setCertification.action";
import { Toaster } from "react-hot-toast";
import { assigParchmentGrade } from "../redux/actions/parchnment/assignParchmentGrade.action";

function AssignNewParchment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [allDryings, setAllDryings] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [cherryLotToAssign, setCherryLotToAssign] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dryToParch, setDryToParch] = useState(null);
  const [parchmentWeight, setParchmentWeight] = useState();
  const [assignedParchment, setAssignedParchment] = useState();
  const [certificate, setCertificate] = useState();
  const [selectedGrade, setSelectedGrade] = useState("Grade A");
  const { parchment } = useSelector((state) => state.newParchment);
  const { parchmentGrade, isloading } = useSelector(
    (state) => state.newParchmentGrade
  );
  const [newParchmentGrade, setNewParchmentGrade] = useState();

  const [selectedCertification, setSelectedCertification] =
    useState("Certified");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const { transactions } = useSelector((state) => state.fetchAllTransactions);

  const { dryings } = useSelector((state) => state.fetchAllDrying);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchAllTransactions(token));
  }, [dispatch]);

  useEffect(() => {
    if (transactions) {
      setAllTransactions(transactions.data);
    }
  }, [transactions]);

  useEffect(() => {
    dispatch(fetchAllDryings());
  }, [dispatch]);

  useEffect(() => {
    if (dryings) {
      setAllDryings(dryings.data);
    }
  }, [dryings]);

  const getUniqueValues = (arr, key) => {
    const uniqueValues = [];
    const uniqueKeys = new Set();

    arr.forEach((item) => {
      const value = item[key];

      if (!uniqueKeys.has(value)) {
        uniqueKeys.add(value);
        uniqueValues.push(item);
      }
    });

    return uniqueValues;
  };

  const handleCertificationChange = (e) => {
    setSelectedCertification(e.target.value);
    dispatch(setCertification(selectedCertification));
  };
  useEffect(() => {
    if (selectedCertification === "Certified") {
      setCertificate(1);
    } else {
      setCertificate(0);
    }
  }, [selectedCertification]);

  const filteredTransaction = searchQuery
    ? getUniqueValues(
        allTransactions?.filter((transaction) =>
          Object.values(transaction).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(searchQuery?.toLowerCase())
          )
        ),
        "transaction_date"
      )
    : getUniqueValues(allTransactions, "transaction_date");

  const filteredByCherryLotID = filteredTransaction.filter((transaction) =>
    allDryings.some(
      (drying) => drying.day_lot_number === transaction.cherry_lot_id
    )
  );
  const filteredByCertification =
    selectedCertification === "Certified"
      ? filteredByCherryLotID.filter(
          (transaction) => transaction.certified === 1
        )
      : filteredByCherryLotID.filter(
          (transaction) => transaction.certified === 0
        );

  const totalPages = Math.ceil(filteredTransaction?.length / itemsPerPage);

  const paginatedTransactions = filteredByCertification?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const calculateSumKilograms = (daylotnumber) => {
    const filteredTransactionsByDaylot = allTransactions.filter(
      (transaction) => transaction.cherry_lot_id === daylotnumber
    );

    if (filteredTransactionsByDaylot.length > 0) {
      return filteredTransactionsByDaylot.reduce(
        (sum, transaction) => sum + parseFloat(transaction.kilograms),
        0
      );
    } else {
      return 0;
    }
  };

  const totalKilograms = (daylotnumber) => calculateSumKilograms(daylotnumber);

  const getGradeA = (cherry_lot_id) => {
    const gradeA = allDryings?.find(
      (dry) => dry.day_lot_number === cherry_lot_id
    );
    return gradeA ? gradeA.GradeA : null;
  };

  const getGradeB = (cherry_lot_id) => {
    const gradeB = allDryings?.find(
      (dry) => dry.day_lot_number === cherry_lot_id
    );
    return gradeB ? gradeB.GradeB : null;
  };

  const getGradeC = (cherry_lot_id) => {
    const gradeC = allDryings?.find(
      (dry) => dry.day_lot_number === cherry_lot_id
    );
    return gradeC ? gradeC.GradeC : 0;
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
  };

  const openModal = (cherryLotId, dry) => {
    setCherryLotToAssign(cherryLotId);
    setDryToParch(dry);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  const handleConfirmAssign = async (cherry_lot_id) => {
    try {
      const data = {
        cherry_lot_id: cherry_lot_id,
        grade: selectedGrade,
      };

      const res = await dispatch(assigParchment(data));
      setAssignedParchment(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleParchmentWeight = (e) => {
    e.preventDefault();
    setParchmentWeight(e.target.value)?.toLocaleString();
  };

  const handleProceed = async () => {
    const data = {
      cherry_lot_id: assignedParchment?.cherry_lot_id,
      parch_grade: assignedParchment?.grade,
      certificate: certificate,
      parch_weight: parchmentWeight,
    };
    dispatch(assigParchmentGrade(data, token));
  };
  useEffect(() => {
    if (parchmentGrade) {
      navigate("/user_inventory_management/new_parchment_assignement");
    }
  }, [parchmentGrade, navigate]);

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

            <div className="py-4 ml-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="items-center  justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="flex items-center sm:justify-end">
                    <div className="ml-3">
                      <p>Record</p>
                      <select
                        name=""
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="rounded-lg w-40"
                      >
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                      </select>
                    </div>
                  </div>
                  <form className="sm:pr-3" action="#" method="GET">
                    <label htmlFor="products-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-48 ml-3 mt-1 sm:w-64 mr-1 xl:w-96">
                      <span>Cherry Lot ID</span>
                      <input
                        type="text"
                        name="email"
                        onChange={handleSearch}
                        id="products-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Sarch for transaction"
                      />
                    </div>
                  </form>
                  <div className="flex pl-2 space-x-3 ">
                    <div>
                      <span>From</span>
                      <input
                        type="date"
                        value={new Date().toISOString().split("T")[0]}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <span>To</span>
                      <input
                        type="date"
                        value={new Date().toISOString().split("T")[0]}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!parchment && (
              <div className="py-4 ml-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm mt-2 border border-slate-200 dark:border-slate-700">
                <div className="items-center  justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <div className="flex items-center sm:justify-end">
                      <div className="flex pl-2 space-x-1 mt-1">
                        <div className="flex justify-center items-center">
                          <select
                            name=""
                            value={selectedCertification}
                            onChange={handleCertificationChange}
                            className="rounded-lg w-80"
                          >
                            <option value="Certified">Certified</option>
                            <option value="NotCertified">Not Certified</option>
                          </select>
                        </div>
                        <div className="flex justify-center items-center">
                          <select
                            value={selectedGrade}
                            onChange={handleGradeChange}
                            className="rounded-lg w-80"
                          >
                            <option value="Grade A">Grade A</option>
                            <option value="Grade B">Grade B</option>
                            <option value="Grade C">Grade C</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {parchment && (
              <div className="py-4 ml-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <div className="items-center  justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="flex items-center sm:justify-end">
                      <div className="flex pl-2 space-x-1 mt-1">
                        <div>
                          <select
                            name=""
                            className="rounded-lg w-40 bg-gray-300"
                          >
                            <option value="closed">
                              {parchment.data.grade}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="flex pl-2 space-x-1 mt-1">
                        <div>
                          <select
                            name=""
                            className="rounded-lg w-40 bg-gray-300"
                          >
                            <option value="closed">
                              {selectedCertification}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="flex pl-2 space-x-1 mt-1">
                        <div>
                          <input
                            name=""
                            type="text"
                            placeholder="Enter parchment weight here"
                            className="rounded-lg w-80"
                            value={parchmentWeight}
                            onChange={handleParchmentWeight}
                          />
                        </div>
                      </div>
                      <div className="flex pl-2 space-x-1 mt-1">
                        <div>
                          <button
                            name=""
                            className="rounded-lg w-40 bg-green-500 text-white p-2"
                            onClick={handleProceed}
                          >
                            {isloading ? "Loading.." : "Proceed"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-row left-4 items-center justify-center  gap-3"></div>

            <AssignNewParchmentTable
              filteredTransactions={paginatedTransactions}
              totalKilograms={totalKilograms}
              getGradeA={getGradeA}
              getGradeB={getGradeB}
              getGradeC={getGradeC}
              currentPage={currentPage}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              itemsPerPage={itemsPerPage}
              isModalOpen={isModalOpen}
              openModal={openModal}
              closeModal={closeModal}
              handleConfirmAssign={handleConfirmAssign}
              cherryLotIdToAssign={cherryLotToAssign}
            />
          </div>
          <Toaster />
        </main>
      </div>
    </div>
  );
}
export default AssignNewParchment;
