import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getModules } from "../../../redux/actions/accessModules/getAllModules.action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import EditAccessModel from "../../../components/EditAccessModuleModel";
const AccessModuleTable = () => {
  const userId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [retrievedModules, setRetrievedModules] = useState();
  const [moduleName, setModuleName] = useState("");
  const [selectedModule, setSelectedModule] = useState();
  const [showEditAccessModel, setShowAccessModel] = useState(false);
  const { user, loading } = useSelector((state) => state.fetchSingleUser);
  const { modules } = useSelector((state) => state.fetchAllModules);
  const { update } = useSelector((state) => state.updateModule);
  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  useEffect(() => {
    if (modules) {
      setRetrievedModules(modules.data);
    }
  }, [modules]);

  const handleClickAction = (module) => {
    setSelectedModule(module);
    setShowAccessModel(true);
  };
  // console.log("seleeeee",selectedUser)

  const handleModuleNameUpdate = () => {
    setSelectedModule(null);
    setShowAccessModel(true);
  };
  useEffect(() => {
    if (update) {
      dispatch(getModules);
    }
  }, [update, dispatch]);
  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-bold text-left text-black uppercase dark:text-gray-400"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-bold text-left text-black uppercase dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-bold text-left text-black uppercase dark:text-gray-400"
                    >
                      platform
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-bold text-left text-black uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {retrievedModules?.map((module, index) => (
                    <tr
                      key={module.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {index + 1}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {module.module_name}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {module.platform}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        <CiEdit
                          className="text-blue-500 text-3xl"
                          onClick={() => {
                            handleClickAction(module);
                          }}
                        />
                        {showEditAccessModel && selectedModule && (
                          <EditAccessModel
                            module={selectedModule}
                            onClose={() => setShowAccessModel(false)}
                            onSubmit={handleModuleNameUpdate}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessModuleTable;
