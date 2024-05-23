import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getSingleUserById } from "../../redux/actions/user/singleUser.action";
import { getModules } from "../../redux/actions/accessModules/getAllModules.action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PiUsersFourDuotone } from "react-icons/pi";
import { IoIosPhonePortrait } from "react-icons/io";
import { GrSystem } from "react-icons/gr";
import { assignPermission } from "../../redux/actions/accessModules/addPermissions.action";

const AccessControlMobileTable = () => {
  const userId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchedUser, setFetchedUser] = useState();
  const { user, loading } = useSelector((state) => state.fetchSingleUser);
  const { modules } = useSelector((state) => state.fetchAllModules);
  const [retrievedModules, setRetrievedModules] = useState();
  const [selectedModules, setSelectedModules] = useState([]);
  useEffect(() => {
    dispatch(getSingleUserById(userId.userId));
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setFetchedUser(user?.data);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  useEffect(() => {
    if (modules) {
      setRetrievedModules(modules.data);
    }
  }, [modules]);

  const handleModuleCheckboxChange = (moduleId, checked) => {
    setSelectedModules((prevSelectedModules) => {
      if (checked) {
        return [...prevSelectedModules, moduleId];
      } else {
        return prevSelectedModules.filter((id) => id !== moduleId);
      }
    });
  };

  const handleSavePermissions = () => {
    const permissionList = selectedModules.map((moduleId) => ({
      userid: parseInt(userId.userId, 10),
      moduleid: parseInt(moduleId, 10),
      view_record: 1,
      add_record: 1,
      delete_record: 1,
      edit_record: 1,
      platform: "mobile",
    }));

    dispatch(assignPermission(permissionList));
  };

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 mb-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <p className="mb-6 ml-20">
          Mobile access control for <b>{fetchedUser?.Name_Full}</b>
        </p>
        <div className="   items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
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
                  to="/user-administaration/access-controll/mobile-access/:userId"
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
                  to="/user-administaration/access-controll/module-access/:userId"
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
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {retrievedModules
                    ?.filter(
                      (module) =>
                        module.platform === "mobile" && module.module_name
                    )
                    .map((module, index) => (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedModules.includes(module.id)}
                              onChange={(e) =>
                                handleModuleCheckboxChange(
                                  module.id,
                                  e.target.checked
                                )
                              }
                            />
                            <label htmlFor="checkbox-all" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {module.module_name}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <button
                  className="bg-green-400 mt-4   w-48 h-10 flex items-center justify-center rounded-lg"
                  onClick={handleSavePermissions}
                >
                  Save Access Control
                </button>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControlMobileTable;
