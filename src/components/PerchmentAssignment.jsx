import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function PerchmentAssignment({
  cardTitle,
  drying,
  dryStorange,
  transit,
  delivered,
}) {
  return (
    <div className="flex flex-col  col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <div>
          <div className="flex flex-row justify-between text-[12px] mb-4">
            <label className="">{cardTitle}</label>
          </div>
          <hr></hr>
          <div>
            <div className="flex flex-row justify-between text-[12px] mt-4 mb-2">
              <label>
                {" "}
                <strong className="text-green-500">{drying} kg(s)</strong>{" "}
                Drying{" "}
              </label>
            </div>
            <div className="flex flex-row justify-between text-[12px] mb-2">
              <label>
                {" "}
                <strong className="text-green-500">
                  {dryStorange} kg(s){" "}
                </strong>{" "}
                In Dry Storage{" "}
              </label>
            </div>
            <div className="flex flex-row justify-between text-[12px] mb-2">
              <label>
                {" "}
                <strong className="text-green-500">{transit} kg(s)</strong> In
                Transit
              </label>
            </div>
            <div className="flex flex-row justify-between text-[12px] mb-2">
              <label>
                {" "}
                <strong className="text-green-500">{delivered} kg(s)</strong> In
                Delivered to Dry Mill{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerchmentAssignment;
