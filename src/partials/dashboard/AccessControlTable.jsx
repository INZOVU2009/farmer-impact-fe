import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PiUsersFourDuotone } from "react-icons/pi";
import { IoIosPhonePortrait } from "react-icons/io";
import { GrSystem } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getModules } from "../../redux/actions/accessModules/getAllModules.action";
import { assignedModulesForSingleUser } from "../../redux/actions/accessModules/getAssignedModulesForSingleUser.action";
import { assignPermission } from "../../redux/actions/accessModules/addPermissions.action";
import { getSingleStaffById } from "../../redux/actions/staff/getSingleStaff.action";
import { Toaster } from "react-hot-toast";
import { AccordionAccessControlTable } from "../../components/AccordionAccessControlTable";

const AccessControlTable = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchedStaff, setFetchedStaff] = useState();
  const [retrievedModules, setRetrievedModules] = useState();
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
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Registers"}
                  elementID={"element1"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.register}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* farmer modules */}
              {moduleGroups.farmer?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Farmer"}
                  elementID={"element2"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.farmer}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* inspection modules */}
              {moduleGroups.inspection?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Inspections"}
                  elementID={"element3"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.inspection}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* finance modules */}
              {moduleGroups.finance?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Finance"}
                  elementID={"element4"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.finance}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* tree survey / household modules */}
              {moduleGroups.trees_survey?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Household (Trees Survey)"}
                  elementID={"element5"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.trees_survey}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* coffee purchase modules */}
              {moduleGroups.coffee_purchase?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Coffee Purchase"}
                  elementID={"element6"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.coffee_purchase}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* training modules */}
              {moduleGroups.training?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Training"}
                  elementID={"element7"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.training}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* coffee inventory modules */}
              {moduleGroups.coffee_inventory?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Coffee Inventory"}
                  elementID={"element8"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.coffee_inventory}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* cash requisition modules */}
              {moduleGroups.cash_requisition?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"Cash Requisition"}
                  elementID={"element9"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.cash_requisition}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* app setting modules */}
              {moduleGroups.app_setting?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"App Settings"}
                  elementID={"element10"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.app_setting}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
              )}

              {/* manage users modules */}
              {moduleGroups.manage_users?.length > 0 && (
                <AccordionAccessControlTable
                  handleClick={handleClick}
                  tableLabel={"User Management"}
                  elementID={"element11"}
                  handleSelectAllChange={handleSelectAllChange}
                  modules={moduleGroups.manage_users}
                  activeElement={activeElement}
                  permissions={permissions}
                  selectAll={selectAll}
                  handlePermissionChange={handlePermissionChange}
                />
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
