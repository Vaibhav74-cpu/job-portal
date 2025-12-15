import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job); //fetch jobs from redux store
  return (
    <div className="max-w-7xl pl-28 pr-28 mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-yellow-600">Latest & Top</span> Job Opening
      </h1>
      <div className="grid grid-cols-3 my-3 gap-3">
        {allJobs.length < 0 ? (
          <span>Job Not Found</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />) //loop for each job in an array and pass that job as props to the next component
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
