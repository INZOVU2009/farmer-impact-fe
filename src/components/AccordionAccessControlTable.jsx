import React, { useEffect, useState } from "react";
import { TECollapse } from "tw-elements-react";

export const AccordionAccessControlTable = ({
  handleClick,
  tableLabel,
  elementID,
  handleSelectAllChange,
  modules,
  permissions,
  handlePermissionChange,
  activeElement,
  selectAll,
}) => {
  return (
    <div id="accordionExample">
      <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="mb-0" id="headingOne">
          <button
            className={`${
              activeElement === elementID &&
              `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
            type="button"
            onClick={() => handleClick(elementID)}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {tableLabel}
            <span
              className={`${
                activeElement === elementID
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529]  dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <TECollapse
          show={activeElement === elementID}
          className="!mt-0 !rounded-b-none !shadow-none"
        >
          <div className="px-5 py-4">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                          checked={selectAll}
                          onChange={(e) =>
                            handleSelectAllChange(e.target.checked)
                          }
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      View
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Add
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Del
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {modules
                    ?.filter(
                      (module) =>
                        module.platform === "dashboard" && module.module_name
                    )
                    .map((module) => (
                      <tr
                        key={module.id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {module.module_name}
                        </td>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={permissions[module.id]?.view || false}
                            onChange={(e) =>
                              handlePermissionChange(
                                module,
                                "view",
                                e.target.checked
                              )
                            }
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={permissions[module.id]?.add || false}
                            onChange={(e) =>
                              handlePermissionChange(
                                module,
                                "add",
                                e.target.checked
                              )
                            }
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={permissions[module.id]?.delete || false}
                            onChange={(e) =>
                              handlePermissionChange(
                                module,
                                "delete",
                                e.target.checked
                              )
                            }
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={permissions[module.id]?.edit || false}
                            onChange={(e) =>
                              handlePermissionChange(
                                module,
                                "edit",
                                e.target.checked
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TECollapse>
      </div>
    </div>
  );
};
