import React, { useState, useEffect } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { updateBucket } from "../redux/actions/transactions/updateTransactionBucket.action";


export default function UpdateBucketModel({
  bucket,
  onClose,
  onSubmit,
}) {

  const dispatch = useDispatch();
  const journalId = useParams();
  const [formData, setFormData] = useState({
    bucket_a:bucket[0].bucketA,
    bucket_b:bucket[0].bucketB,
    bucket_c:bucket[0].bucketC,
    day_lot: bucket[0].day_lot_number

  });

console.log("bucketttt", bucket)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevBucket) => ({
      ...prevBucket,
      [name]: value,
    }));
  };
  const {isloading } = useSelector(
    (state) => state.updateTransactionBucket
  );

console.log("I am parchment", formData)
 

  const handleUpdateBucket = async (e) => {
    e.preventDefault();
    try {
       dispatch(updateBucket(formData));
      // toast.success("Parchment adjusted successfully");
      onClose();
      onSubmit(formData);
  
      // Fetch transactions after successful update
      // dispatch(fetchAllTransactionsByJournal(token, journalId.journalId.replace(":", "")));
  
    } catch (error) {
      console.error("update failed:", error);
      toast.error("Failed to update bucket");
    }
  };
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white  rounded-lg shadow-md ">

        {/* Modal */}

        <div className="flex justify-end ">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>

        <div className=" px-16 space-y-3 mb-4" >
          <p className="text-green-500">UPDATE bucket</p>
          <hr className="mb-4 border border-gray-200 " />
          <p>BUCKET A</p>
          <input
            className="rounded-lg   w-80"
            type="text"
            value={formData.bucket_a}
            onChange={handleInputChange}
            name="bucket_a"

            // readOnly
          />

      
          <p>BUCKET B</p>
          <input
            type="text"
            name="bucket_b"
            value={formData.bucket_b}
            onChange={handleInputChange}
            className="rounded-lg w-80"
          />

         
          <p>BUCKET C</p>
          <input
            type="text"
            name="bucket_c"
            value={formData.bucket_c}
            onChange={handleInputChange}
            className="rounded-lg w-80"
          />

          <ToastContainer />

          <button
            className="bg-green-400 w-48 h-10  flex items-center justify-center rounded-lg"
            onClick={handleUpdateBucket}
          >
           {isloading?"...Loading":"Update"}
          </button>
        </div>

      </div>
    </div>

  );
}
