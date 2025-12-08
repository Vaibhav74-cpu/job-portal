import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mt-5 mx-auto pl-28 pr-28 ">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          <div>
            {jobArray.length <= 0 ? (
              <span>Job Not Found </span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {jobArray.map((item, index) => (
                    <div key={item}>
                      <Job />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;

/* Filter Jobs */

/* job cards */
