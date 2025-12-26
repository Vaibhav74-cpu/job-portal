import React, { useEffect, useState } from "react";

import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { easeOut, motion } from "framer-motion";
// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {
  const { allJobs, searchText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchText) {
      //searh text is empty
      setFilterJobs(allJobs);
    } else {
      const filterdJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchText.toLowerCase()) ||
          job.location.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilterJobs(filterdJobs);
    }
  }, [allJobs, searchText]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl  mt-5 mx-auto">
        <div className="flex gap-5">
          <div className="w-[180px]">
            <FilterCard />
          </div>
          <div>
            {filterJobs.length <= 0 ? (
              <span>Job Not Found </span>
            ) : (
              <div className="flex-1 h-[88vh]  overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {filterJobs.map((job) => (
                    <motion.div
                    initial={{opacity:0, y:-100}}
                    animate={{opacity:100, y:0}}
                    exit={{opacity:0, y:-100}}
                    transition={{duration:0.3, ease:'easeOut'}}
                    key={job._id} className="w-[350px]">
                      <Job job={job} />
                    </motion.div>
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
