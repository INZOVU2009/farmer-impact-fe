import React, { useEffect, useState } from "react";
import { fetchAllSuppliers } from '../../redux/actions/supplier/allSuppliers.action';
import { fetchAllTransactions } from '../../redux/actions/supplier/transaction.action';
import { fetchAllSeasons } from '../../redux/actions/seasons/currentSeason.action';
import { useDispatch, useSelector } from "react-redux";

const SupplyInventoryDetailsTable = () => {
  const dispatch = useDispatch();
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [season, setSeasons] = useState([]);
  const [searchItem, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  const { Suppliers, loading: loadingSuppliers, error: errorSuppliers } = useSelector((state) => state.Suppliers);
  const { transactions: transactionData, loading: loadingTransactions, error: errorTransactions } = useSelector((state) => state.fetchAllTransactions);
  const { seasons } = useSelector((state) => state.fetchAllSeasons);

  useEffect(() => {
    dispatch(fetchAllSuppliers());
    dispatch(fetchAllTransactions());
    dispatch(fetchAllSeasons());
  }, [dispatch]);

  useEffect(() => {
    if (Suppliers && Suppliers.data) {
      setAllSuppliers(Suppliers.data);
    }
  }, [Suppliers]);


  useEffect(() => {
    if (transactionData && transactionData.data) {
      setTransactions(transactionData.data);
    }
  }, [transactionData]);


  useEffect(() => {
    if (seasons && seasons.data) {
      setSeasons(seasons.data);
    }
  }, [seasons]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const searchQuery = searchItem.toLowerCase();

  const filteredSuppliers = allSuppliers.filter(supplier =>
    transactions.some(transaction => transaction._kf_Supplier === supplier.__kp_Supplier) &&
    supplier.Name?.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const TotalSupplier = filteredSuppliers.length;

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loadingSuppliers || loadingTransactions) return <div>Loading...</div>;
  if (errorSuppliers) return <div>Error fetching suppliers: {errorSuppliers}</div>;
  if (errorTransactions) return <div>Error fetching transactions: {errorTransactions}</div>;

  const transactionSummary = transactions.filter(transaction =>
    transaction.fm_approval === 1 &&
    transaction.status === 0 &&
    transaction.approved === 1
  ).reduce((acc, transaction) => {
    const supplierId = transaction._kf_Supplier;
    const kilograms = transaction.kilograms || 0;
    const badKilograms = transaction.bad_kilograms || 0;
    const transactionDate = new Date(transaction.transaction_date);
    const unitPrice = transaction.unitprice || 0;
    const state = transaction.state;

    const supplier = allSuppliers.find(s => s.__kp_Supplier === supplierId);


    if (!acc[supplierId]) {
      acc[supplierId] = {
        totalKilograms: 0,
        deliveredKilograms: 0,
        inDryStorageKilograms: 0,
        transactions: [],
        supplierName: supplier ? supplier.Name : 'Unknown Supplier',
        latestTransactionDate: null,
        latestUnitPrice: null
      };
    }

    const totalKilograms = kilograms + badKilograms;
    acc[supplierId].totalKilograms += totalKilograms;
    acc[supplierId].transactions.push(transaction);

    if (state === "delivered") {
      acc[supplierId].deliveredKilograms += totalKilograms;
    } else if (state === "in-dry-storage") {
      acc[supplierId].inDryStorageKilograms += totalKilograms;
    }

    if (!acc[supplierId].latestTransactionDate || transactionDate > acc[supplierId].latestTransactionDate) {
      acc[supplierId].latestTransactionDate = transactionDate;
      acc[supplierId].latestUnitPrice = unitPrice;
    }

    return acc;
  }, {});

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center mb-4">
          <form className="sm:pr-3" action="#" method="GET">
            <label htmlFor="products-search" className="sr-only">Search</label>
            <div className="relative w-64">
              <input
                type="text"
                id="products-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Search for suppliers"
                value={searchItem}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Supplier</th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Latest Transaction Date</th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Total Kilograms Purchased</th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Delivered Kilograms</th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">In Dry Storage Kilograms</th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Latest Unit Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {paginatedSuppliers.length > 0 ? (
                    paginatedSuppliers.map((supplier) => {
                      const supplierSummary = transactionSummary[supplier.__kp_Supplier] || {
                        totalKilograms: 0,
                        deliveredKilograms: 0,
                        inDryStorageKilograms: 0,
                        latestUnitPrice: null
                      };
                      return (
                        <tr key={supplier.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="p-4">{supplier.Name}</td>
                          <td className="p-4">
                            {supplierSummary.latestTransactionDate ? supplierSummary.latestTransactionDate.toLocaleDateString() : '-'}
                          </td>
                          <td className="p-4">
                            <span className="bg-green-200 text-green-800 font-semibold rounded px-2 py-1">
                              {supplierSummary.totalKilograms.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-4">{supplierSummary.deliveredKilograms.toLocaleString()}</td>
                          <td className="p-4">{supplierSummary.inDryStorageKilograms.toLocaleString()}</td>
                          <td className="p-4">{supplierSummary.latestUnitPrice !== null ? supplierSummary.latestUnitPrice.toFixed(0) : '-'}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">No suppliers found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-4">
        <button
          className="px-3 py-1 text-white rounded-md bg-primary-600"
        >
          Total Suppliers: {TotalSupplier}
        </button>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-white rounded-md ${currentPage === 1 ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          Previous
        </button>
        <span className="mx-1 text-sm">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-white rounded-md ${currentPage === totalPages ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SupplyInventoryDetailsTable;
