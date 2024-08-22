import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getModules } from "../../../redux/actions/accessModules/getAllModules.action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { createNewModule } from "../../../redux/actions/accessModules/createNewModule.action";
import EditAccessModel from "../../../components/EditAccessModuleModel";
import { Toaster } from "react-hot-toast";

const AccessModuleTable = ({ onSubmit }) => {
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
  const { create } = useSelector((state) => state.createModule);

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

  const [formData, setFormData] = useState({
    module_name: "",
    platform: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevModule) => ({
      ...prevModule,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createNewModule(formData));
      onSubmit(formData);
      setFormData({
        module_name: "",
        platform: "",
      });
    } catch (error) {
      console.error("Adding new module failed", error);
    }
  };
  useEffect(() => {
    if (create) {
      dispatch(getModules);
    }
  }, [create, dispatch]);
  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
        <div className="w-[55%] flex flex-col ml-48 mb-4 border-2 rounded-md">
  <div className="p-5 border-b-3 w-full">
    <p className="text-green-500">Add new access control</p>
  </div>
  <div className="p-2">
    <form action="" className="space-y-2">
      <div className="flex space-x-4">
        <input
          type="text"
          className="w-1/2 rounded-md"
          name="module_name"
          placeholder="Enter module name"
          value={formData.module_name}
          onChange={handleInputChange}
        />
        <select
          className="w-1/2 rounded-md"
          name="platform"
          value={formData.platform}
          onChange={handleInputChange}
        >
          <option value="">Select Platform</option>
          <option value="dashboard">dashboard</option>
          <option value="mobile">mobile</option>
        </select>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 text-white rounded-md w-48 p-2"
          onClick={handleAddSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>



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
          <Toaster/>
        </div>
      </div>
    </div>
  );
};

export default AccessModuleTable;
