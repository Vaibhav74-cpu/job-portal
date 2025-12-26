import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import Footer from "./shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchText } from "@/redux/jobSlice";

function Browse() {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  
 
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-4">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4 my-4">
          {allJobs.map((job, index) => {
            return (
              <div key={job?._id}>
                <Job job={job} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Browse;
