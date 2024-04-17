import React, { useState, useEffect } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { updateBucketWeight } from "../redux/actions/transactions/updateTransactionBucketWeight.action";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";


export default function UpdateBucketWeightModel({ bucket, onClose, onSubmit }) {
  const dispatch = useDispatch();
  const journalId = useParams();
  const [formData, setFormData] = useState({
    taken_c: bucket[0].gradeCTaken,
    grade_c: bucket[0].GradeC,
    taken_b: bucket[0].gradeBTaken,
    grade_b: bucket[0].GradeB,
    taken_a: bucket[0].gradeATaken,
    grade_a: bucket[0].GradeA,
    day_lot: bucket[0].day_lot_number,
    // certified: bucket.certified,
  });

  const { weight } = useSelector((state) => state.bucketWeighting);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("taken_")) {
      const bucket = name.split("_")[1];
      setFormData((bucketWeight) => ({
        ...bucketWeight,
        [`taken_${bucket}`]: value,
      }));
    } else {
      setFormData((bucketWeight) => ({
        ...bucketWeight,
        [name]: value,
      }));
    }
  };
  console.log(formData)

 

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateBucketWeight(formData));
      toast.success("Transaction updated successfully");
      onClose();
      onSubmit(formData);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update bucket weight");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white  rounded-lg shadow-md ">
        <div className="flex justify-end ">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>

        <div className=" px-16 space-y-3 mb-4">
          <p className="text-green-500">UPDATE BUCKET WEIGHT</p>
          <hr className="mb-4 border border-gray-200 " />

          <label htmlFor=""> BUCKET A</label>
          <input
            className="rounded-lg   w-80 ml-2"
            type="text"
            value={formData.bucket_a}
            onChange={handleInputChange}
            name="grade_a"
          />
          <br />

          <label htmlFor="grade_a_weight_taken">Grade A Weight Taken</label>

          <div className="flex items-center">
            <input
              type="radio"
              id="grade_a_weight_taken_before"
              name="taken_a"
              value="before"
              onChange={handleInputChange}
            />
            <label htmlFor="grade_a_weight_taken_before" className="mr-4">
              Before Drying{" "}
            </label>
            <input
              type="radio"
              id="grade_a_weight_taken_after"
              name="taken_a"
              value="after"
              onChange={handleInputChange}
              // checked
            />
            <label htmlFor="grade_a_weight_taken_after">After Drying</label>
          </div>

          <br />

          <label htmlFor=""> BUCKET B</label>

          <input
            className="rounded-lg   w-80 ml-2"
            type="text"
            value={formData.bucket_b}
            onChange={handleInputChange}
            name="grade_b"
          />
          <br />

          <label htmlFor="grade_b_weight_taken">Grade B Weight Taken</label>

          <div className="flex items-center">
            <input
              type="radio"
              id="grade_b_weight_taken_before"
              name="taken_b"
              value="before"
              onChange={handleInputChange}
            />
            <label htmlFor="grade_b_weight_taken_before" className="mr-4">
              Before Drying{" "}
            </label>
            <input
              type="radio"
              id="grade_b_weight_taken_after"
              name="taken_b"
              value="after"
              onChange={handleInputChange}
              // checked
            />
            <label htmlFor="grade_b_weight_taken_after">After Drying</label>
          </div>

          <br />

          <label htmlFor=""> BUCKET C</label>

          <input
            className="rounded-lg   w-80 ml-2"
            type="text"
            value={formData.bucket_c}
            onChange={handleInputChange}
            name="grade_c"
          />
          <br />

          <label htmlFor="grade_c_weight_taken">Grade C Weight Taken</label>

          <div className="flex items-center">
            <input
              type="radio"
              id="grade_c_weight_taken_before"
              name="taken_c"
              value="before"
              onChange={handleInputChange}
            />
            <label htmlFor="grade_c_weight_taken_before" className="mr-4">
              Before Drying{" "}
            </label>
            <input
              type="radio"
              id="grade_c_weight_taken_after"
              name="taken_c"
              value="after"
              onChange={handleInputChange}
              // checked
            />
            <label htmlFor="grade_c_weight_taken_after">After Drying</label>
          </div>

          <ToastContainer />

          <button
            className="bg-green-400 w-48 h-10  flex items-center justify-center rounded-lg"
            onClick={handleUpdateSubmit}
          >
            Update Bucket Weight
          </button>
        </div>
      </div>
    </div>
  );
}