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
      <div className="p-4 mb-5 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">
        <p className="mb-6 ml-20">
          <strong style={{ fontSize: "1.2rem" }}>
            Dashboard access control for{" "}
            <b style={{ color: "#4F46E5" }}>{fetchedStaff?.Name}</b>
          </strong>
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
                  {retrievedModules
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
