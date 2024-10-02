import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PiUsersFourDuotone } from "react-icons/pi";
import { IoIosPhonePortrait } from "react-icons/io";
import { GrSystem } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserById } from "../../redux/actions/user/singleUser.action";
import { getModules } from "../../redux/actions/accessModules/getAllModules.action";
import { assignedModulesForSingleUser } from "../../redux/actions/accessModules/getAssignedModulesForSingleUser.action";
import { assignPermission } from "../../redux/actions/accessModules/addPermissions.action";
import { getSingleStaffById } from "../../redux/actions/staff/getSingleStaff.action";
import { Toaster } from "react-hot-toast";
import { TECollapse } from "tw-elements-react";

const AccessControlTable = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchedUser, setFetchedUser] = useState();
  const [fetchedStaff, setFetchedStaff] = useState();
  const [retrievedModules, setRetrievedModules] = useState();
  const { user, loading } = useSelector((state) => state.fetchSingleUser);
  const { staff } = useSelector((state) => state.fetchSingleStaff);
  const { modules } = useSelector((state) => state.fetchAllModules);
  const { assignedModulesList } = useSelector(
    (state) => state.getAssignedModulesForSingleUser
  );
  const [permissions, setPermissions] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const { permission } = useSelector((state) => state.addPermissions);
  const [moduleGroups, setModuleGroups] = useState({
    register: [],
    farmer: [],
    inspection: [],
    finance: [],
    trees_survey: [],
    coffee_purchase: [],
    training: [],
    coffee_inventory: [],
    cash_requisition: [],
    app_setting: [],
    manage_users: [],
  });
  const [activeElement, setActiveElement] = useState("");

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  const isAmong = (thisMod, thoseMods) => {
    return thoseMods?.some((module) => module === thisMod);
  };

  const groupMods = (mods = []) => {
    if (mods.length < 1) return;

    let groupedMods = {
      register: [],
      farmer: [],
      inspection: [],
      finance: [],
      trees_survey: [],
      coffee_purchase: [],
      training: [],
      coffee_inventory: [],
      cash_requisition: [],
      app_setting: [],
      manage_users: [],
    };

    for (const mod of mods) {
      if (
        isAmong(mod.module_name, [
          "Recent registrations",
          "Updated farmers",
          "Verified Registrations",
          "Approved Registrations",
        ])
      ) {
        groupedMods.register.push(mod);
      } else if (
        isAmong(mod.module_name, [
          "Synced farmers",
          "Verified farmers",
          "Approved farmers",
          "Pending farmers",
        ])
      ) {
        groupedMods.farmer.push(mod);
      } else if (
        isAmong(mod.module_name, [
          "Full Inspection",
          "Simple inspection",
          "Inspections",
          "farmer_inspections",
          "Wet Mill Audit",
        ])
      ) {
        groupedMods.inspection.push(mod);
      } else if (isAmong(mod.module_name, ["cws_finance"])) {
        groupedMods.finance.push(mod);
      } else if (
        isAmong(mod.module_name, [
          "Household",
          "Household Trees",
          "Approved Household Trees",
        ])
      ) {
        groupedMods.trees_survey.push(mod);
      } else if (
        isAmong(mod.module_name, [
          "Add Untraceable Coffee",
          "sc_daily_journals",
          "cw_daily_journals",
          "Coffee Purchases",
          "bucketing",
          "drying_process",
        ])
      ) {
        groupedMods.coffee_purchase.push(mod);
      } else if (
        isAmong(mod.module_name, [
          "assigned_parchment",
          "parchment_transport",
          "parchment_reception",
          "coffee_inventory",
        ])
      ) {
        groupedMods.coffee_inventory.push(mod);
      } else if (
        isAmong(mod.module_name, [
          "Trainings",
          "courses",
          "participants",
          "weekly_report_forms",
        ])
      ) {
        groupedMods.training.push(mod);
      } else if (
        isAmong(mod.module_name, [
          "cash_requisition",
          "cash_requisition_approval",
          "cash_requisition_request",
          "cash_requisition_payment",
        ])
      ) {
        groupedMods.cash_requisition.push(mod);
      } else if (
        isAmong(mod.module_name, [
          "Web Resetting",
          "App Settings",
          "app_settings",
        ])
      ) {
        groupedMods.app_setting.push(mod);
      } else if (isAmong(mod.module_name, ["List Users", "Manage Users"])) {
        groupedMods.manage_users.push(mod);
      } else continue;
    }

    setModuleGroups(groupedMods);
  };

  useEffect(() => {
    dispatch(getSingleStaffById(userId));
  }, [dispatch]);

  useEffect(() => {
    if (staff) {
      setFetchedStaff(staff?.data);
    }
  }, [staff]);

  useEffect(() => {
    dispatch(getModules());
    dispatch(assignedModulesForSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (modules) {
      setRetrievedModules(modules.data);
      groupMods(modules.data);
    }
  }, [modules]);

  useEffect(() => {
    if (assignedModulesList) {
      const initialPermissions = {};
      assignedModulesList.data.forEach((assignedModule) => {
        initialPermissions[assignedModule.moduleid] = {
          view: assignedModule.view_record === 1,
          add: assignedModule.add_record === 1,
          delete: assignedModule.delete_record === 1,
          edit: assignedModule.edit_record === 1,
        };
      });
      setPermissions(initialPermissions);
    }
  }, [assignedModulesList]);

  const handlePermissionChange = (module, permissionType, value) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [module.id]: {
        ...prevPermissions[module.id],
        [permissionType]: value,
      },
    }));
  };

  const handleSelectAllChange = (value) => {
    setSelectAll(value);
    const updatedPermissions = {};
    retrievedModules?.forEach((module) => {
      updatedPermissions[module.id] = {
        view: value,
        add: value,
        delete: value,
        edit: value,
      };
    });
    setPermissions(updatedPermissions);
  };

  const handleSavePermissions = () => {
    // Filter out permissions where none of the actions (view, add, delete, edit) are selected
    const filteredPermissionList = Object.keys(permissions)
      .map((moduleId) => ({
        userid: parseInt(userId, 10), // Ensure userId is an integer
        moduleid: parseInt(moduleId, 10),
        view_record: permissions[moduleId].view ? 1 : 0,
        add_record: permissions[moduleId].add ? 1 : 0,
        delete_record: permissions[moduleId].delete ? 1 : 0,
        edit_record: permissions[moduleId].edit ? 1 : 0,
        platform: "dashboard",
      }))
      .filter(
        (permission) =>
          permission.view_record ||
          permission.add_record ||
          permission.delete_record ||
          permission.edit_record
      ); // Only include permissions with at least one action selected

    console.log("Filtered Permissions being sent:", filteredPermissionList);

    // Dispatch the action with the filtered permissions list
    dispatch(assignPermission(filteredPermissionList)).then(() => {
      navigate("/user-administration"); // Redirect to the users list;
    });
  };

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 mb-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <p className="mb-6 ml-20">
          Dashboard access control for <b>{fetchedStaff?.Name}</b>
        </p>
        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center ml-20 mb-4 sm:mb-0 gap-24">
            <ul className="flex items-center gap-10">
              <li className="flex items-center gap-2">
                <PiUsersFourDuotone />
                <NavLink
                  end
                  to="/user-administration"
                  className="block text-slate-500 hover:text-slate-200 transition duration-150 truncate"
                >
                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    List All Users
                  </span>
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <IoIosPhonePortrait />
                <NavLink
                  end
                  to={`/user-administration/access-control/mobile-access/${userId}`}
                  className="block text-slate-500 hover:text-slate-400 transition duration-150 truncate"
                >
                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Mobile Menus
                  </span>
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <GrSystem />
                <NavLink
                  end
                  to={`/user-administration/access-control/module-access/${userId}`}
                  className="block text-slate-500 hover:text-slate-400 transition duration-150 truncate"
                >
                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Web Console Modules
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              {/* registrations modules */}
              {moduleGroups.register?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element1" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element1")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Registers
                        <span
                          className={`${
                            activeElement === "element1"
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
                      show={activeElement === "element1"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.register
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* farmer modules */}
              {moduleGroups.farmer?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element2" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element2")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Farmer
                        <span
                          className={`${
                            activeElement === "element2"
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
                      show={activeElement === "element2"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.farmer
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* inspection modules */}
              {moduleGroups.inspection?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element3" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element3")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Inspection
                        <span
                          className={`${
                            activeElement === "element3"
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
                      show={activeElement === "element3"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.inspection
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* finance modules */}
              {moduleGroups.finance?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element4" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element4")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Finance
                        <span
                          className={`${
                            activeElement === "element4"
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
                      show={activeElement === "element4"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.finance
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* tree survey / household modules */}
              {moduleGroups.trees_survey?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element5" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element5")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Trees Survey(Household)
                        <span
                          className={`${
                            activeElement === "element5"
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
                      show={activeElement === "element5"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.trees_survey
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* coffee purchase modules */}
              {moduleGroups.coffee_purchase?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element6" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element6")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Coffee Purchase
                        <span
                          className={`${
                            activeElement === "element6"
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
                      show={activeElement === "element6"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.coffee_purchase
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* training modules */}
              {moduleGroups.training?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element7" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element7")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Training
                        <span
                          className={`${
                            activeElement === "element7"
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
                      show={activeElement === "element7"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.training
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* coffee inventory modules */}
              {moduleGroups.coffee_inventory?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element8" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element8")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Coffee Inventory
                        <span
                          className={`${
                            activeElement === "element8"
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
                      show={activeElement === "element8"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.training
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* cash requisition modules */}
              {moduleGroups.cash_requisition?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element9" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element9")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Cash Requisition
                        <span
                          className={`${
                            activeElement === "element9"
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
                      show={activeElement === "element9"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.training
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* app setting modules */}
              {moduleGroups.app_setting?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element10" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element10")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        App Settings
                        <span
                          className={`${
                            activeElement === "element10"
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
                      show={activeElement === "element10"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.training
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              {/* manage users modules */}
              {moduleGroups.manage_users?.length > 0 && (
                <div id="accordionExample">
                  <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className={`${
                          activeElement === "element11" &&
                          `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element11")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Manage users
                        <span
                          className={`${
                            activeElement === "element11"
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
                      show={activeElement === "element11"}
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
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
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
                              {moduleGroups.training
                                ?.filter(
                                  (module) =>
                                    module.platform === "dashboard" &&
                                    module.module_name
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
                                        checked={
                                          permissions[module.id]?.view || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.add || false
                                        }
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
                                        checked={
                                          permissions[module.id]?.delete ||
                                          false
                                        }
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
                                        checked={
                                          permissions[module.id]?.edit || false
                                        }
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
              )}

              <button
                className="bg-green-400 mt-4   w-48 h-10 flex items-center justify-center rounded-lg"
                onClick={handleSavePermissions}
              >
                Save Access Control
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleSavePermissions}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Save Permissions
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AccessControlTable;
