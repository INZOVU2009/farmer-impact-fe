import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { addUntraceableCoffee } from "../redux/actions/untraceableCoffee/addUntraceableCoffee.action";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function AddUntraceableCoffee({ onSubmit }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isloading, error, success } = useSelector((state) => state.addUntraceableCoffee);
  const [formData, setFormData] = useState({
    kilograms: "",
    unitprice: "",
    floaters: "",
    bad_price: "",
    cash_paid: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevTransaction) => { 
      const updatedData = { ...prevTransaction,[name]: value };

      const kilograms = parseFloat(updatedData.kilograms) || 0;
      const unitprice = parseFloat(updatedData.unitprice) || 0;
      const floaters = parseFloat(updatedData.floaters) || 0;
      const bad_price = parseFloat(updatedData.bad_price) || 0;

      updatedData.cash_paid = (kilograms * unitprice) + (floaters * bad_price);

      return updatedData;
      
  });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addUntraceableCoffee(formData, token));
      
      // Clear the form fields if submission was successful
      if (!error) {
        setFormData({
          kilograms: "",
          unitprice: "",
          floaters: "",
          bad_price: "",
          cash_paid: "",
        });
        onSubmit(formData);
        
      }
      
    } catch (error) {
      console.error("Adding untraceable coffee failed", error);
    }
  };
  const isDisabled = !formData.kilograms || !formData.unitprice;
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
          </div>
          <div className="flex items-center justify-center h-[60%] ">
            <div className="bg-white w-[45%] flex flex-col border-2 rounded-md ">
              <div className="p-5 border-b-3 w-full">
                <p className="text-green-500">Add Untraceable Coffee</p>
              </div>
              <div className="p-4">
                <form className="space-y-4" onSubmit={handleAddSubmit}>
                  <input
                    type="number"
                    className="w-full rounded-md"
                    name="kilograms"
                    placeholder="Enter Good cherry kgs"
                    value={formData.kilograms}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    className="w-full rounded-md"
                    name="unitprice"
                    placeholder="Enter unit price"
                    value={formData.unitprice}
                    onChange={handleInputChange}
                  />
                   <input
                    type="number"
                    className="w-full rounded-md"
                    name="floaters"
                    placeholder="Enter floaters"
                    value={formData.floaters}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    className="w-full rounded-md"
                    name="bad_price"
                    placeholder="Enter unit price"
                    value={formData.bad_price}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    className="w-full rounded-md"
                    placeholder="Enter the amount paid"
                    name="cash_paid"
                    value={formData.cash_paid}
                    onChange={handleInputChange}
                  />
                  <div className="flex justify-center">
                    <button
                      className={`bg-green-500 text-white rounded-md w-48 p-2 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      type="submit" disabled ={isDisabled}>
                      {isloading ? "Loading..." : "Save Coffee"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default AddUntraceableCoffee;
