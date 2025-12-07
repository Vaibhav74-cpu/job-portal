import React from "react";
import LatestJobCards from "./LatestJobCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
function LatestJobs() {
  return (
    <div className="max-w-7xl pl-28 pr-28 mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-yellow-600">Latest & Top</span> Job Opening
      </h1>
      <div className="grid grid-cols-3 my-3 gap-3">
        {randomJobs.slice(0, 6).map((item, index) => (
          <LatestJobCards key={item} />
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
