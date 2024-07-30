import React, { useEffect, useState } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSingleBucketWeight } from "../redux/actions/bucketing/getSingleBuketWeightByDayLotNumber.action";
import { editBucketWeight } from "../redux/actions/bucketing/updateBucketWeight.action";
export default function EditBucketWeightingModel({
  isOpen,
  journal,
  onClose,
  onSave,
}) {
  const { bucket } = useSelector(
    (state) => state.getSingleBucketWeightByDayLotNumber
  );
  const dispatch = useDispatch();
  const [grades, setGrades] = useState({
    grade_a: journal?.FinalGradeA || "",
    grade_b: journal?.FinalGradeB || "",
    grade_c: journal?.FinalGradeC || "",
    taken_a: journal?.FinalGradeA_taken || "before",
    taken_b: journal?.FinalGradeB_taken || "before",
    taken_c: journal?.FinalGradeC_taken || "before",
  });

  useEffect(() => {
    if (isOpen && journal.cherry_lot_id) {
      dispatch(getSingleBucketWeight(journal.cherry_lot_id));
    }
  }, [isOpen, journal?.cherry_lot_id, dispatch]);

  useEffect(() => {
    if (bucket) {
      setGrades({
        grade_a: Math.round(bucket.data.FinalGradeA) || "",
        grade_b: Math.round(bucket.data.FinalGradeB) || "",
        grade_c: Math.round(bucket.data.FinalGradeC) || "",
        taken_a: bucket.data.gradeATaken || "before",
        taken_b: bucket.data.gradeBTaken || "before",
        taken_c: bucket.data.gradeCTaken || "before",
      });
    }
  }, [bucket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editBucketWeight(journal?.cherry_lot_id, grades));
      toast.success("Grades updated successfully");
      onClose();
      onSubmit();
    } catch (error) {
      toast.error("Failed to update grades");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-[40%]">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>

        <h2 className="text-lg mb-4">Edit Grades</h2>

        <div className="mb-4">
          <label htmlFor="grade_a" className="block text-gray-700">
            Grade A
          </label>
          <input
            id="grade_a"
            type="text"
            name="grade_a"
            value={grades.grade_a}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 w-full mb-2 p-2"
          />
          <label htmlFor="grade_a_weight_taken">Grade A Weight Taken</label>

          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="taken_a"
              name="taken_a_before"
              value="before"
              checked={grades.taken_a === "before"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeA_taken_before" className="mr-4">
              Before Drying
            </label>
            <input
              type="radio"
              id="taken_a_after"
              name="taken_a"
              value="after"
              checked={grades.taken_a === "after"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeA_taken_after">After Drying</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="grade_b" className="block text-gray-700">
            Grade B
          </label>
          <input
            id="grade_b"
            type="text"
            name="grade_b"
            value={grades.grade_b}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 w-full mb-2 p-2"
          />
          <label htmlFor="grade_a_weight_taken">Grade B Weight Taken</label>

          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="taken_b_before"
              name="taken_b"
              value="before"
              checked={grades.taken_b === "before"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeB_taken_before" className="mr-4">
              Before Drying
            </label>
            <input
              type="radio"
              id="taken_b_after"
              name="taken_b"
              value="after"
              checked={grades.taken_b === "after"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeB_taken_after">After Drying</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="grade_c" className="block text-gray-700">
            Grade C
          </label>
          <input
            id="grade_c"
            type="text"
            name="grade_c"
            value={grades.grade_c}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 w-full mb-2 p-2"
          />
          <label htmlFor="grade_a_weight_taken">Grade C Weight Taken</label>

          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="taken_c_before"
              name="taken_c"
              value="before"
              checked={grades.taken_c === "before"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeC_taken_before" className="mr-4">
              Before Drying
            </label>
            <input
              type="radio"
              id="taken_c_after"
              name="taken_c"
              value="after"
              checked={grades.taken_c === "after"}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeC_taken_after">After Drying</label>
          </div>
        </div>

        <ToastContainer />

        <button
          onClick={handleSubmit}
          className="bg-green-400 w-full h-10 flex items-center justify-center rounded-lg text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
