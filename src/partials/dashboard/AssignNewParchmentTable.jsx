import React, { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import AssignNewParchmentModel from "../../components/AssignNewParchmentModel";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
const AssignNewParchmentTable = ({
  filteredTransactions,
  totalKilograms,
  getGradeA,
  getGradeB,
  getGradeC,
  currentPage,
  handleNextPage,
  handlePrevPage,
  itemsPerPage,
  isModalOpen,
  handleConfirmAssign,
  closeModal,
  cherryLotIdToAssign,
  openModal,
}) => {
  const { parchment, isloading } = useSelector((state) => state.newParchment);

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="flex flex-row left-4 items-center justify-center py-8 gap-3"></div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200  table-fixed dark:divide-gray-600 ">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr className="">
                    <th scope="col" colSpan={2} className="p-4"></th>
                    <th
                      scope="col"
                      colSpan={2}
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      CERTIFIED
                    </th>
                    <th
                      scope="col"
                      colSpan={2}
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      UNCERTIFIED
                    </th>
                    <th
                      scope="col"
                      colSpan={4}
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    ></th>
                  </tr>

                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Cherry LOT ID
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      KG
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      PX
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      KG
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      PX
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      GRADE.A
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      GRADE.B
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      GRADE.C
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>

                {!parchment && (
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {filteredTransactions?.map((dry, index) => (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="w-4 p-4">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {dry.cherry_lot_id}
                        </td>

                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {dry.certified === 1
                            ? totalKilograms(dry.cherry_lot_id).toLocaleString()
                            : ""}
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {dry.certified === 1 ? dry.unitprice : ""}
                        </td>
                        <td className="p-4 space-x-2 whitespace-nowrap">
                          {dry.certified === 1
                            ? ""
                            : totalKilograms(
                                dry.cherry_lot_id
                              ).toLocaleString()}
                        </td>
                        <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                          {dry.certified === 1 ? "" : dry.unitprice}
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {getGradeA(dry.cherry_lot_id)}
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {getGradeB(dry.cherry_lot_id)}
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {getGradeC(dry.cherry_lot_id)}
                        </td>

                        <td>
                          <MdAdd
                            className="text-white   rounded-full w-[30%] h-[30%]  ml-5 bg-green-500 "
                            onClick={() => openModal(dry.cherry_lot_id, dry)}
                          />

                          <AssignNewParchmentModel
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            confirmAssign={handleConfirmAssign}
                            cherryLotId={cherryLotIdToAssign}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        <Toaster/>

        </div>
      </div>
    </div>
  );
};

export default AssignNewParchmentTable;
