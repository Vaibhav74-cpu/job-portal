import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

function JobDescription() {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const initiallyApplied = singleJob?.applications?.some(
    ((application) => application.applicant === user?._id) || false
  );

  const [isApplied, setIsApplied] = useState(initiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data.message);
        setIsApplied(true);
        const updatedJobs = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }], //for real time update
        };
        dispatch(setSingleJob(updatedJobs));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application => application.applicant === user?._id)
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <div className="max-w-7xl mx-auto pl-28 pr-28 my-10">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex gap-4 mt-3">
              <Badge variant="ghost" className="text-blue-600 font-bold">
                {singleJob?.position} Positions
              </Badge>
              <Badge variant="ghost" className="text-yellow-600 font-bold">
                {singleJob?.jobType}
              </Badge>
              <Badge variant="ghost" className="text-violet-600 font-bold">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <div>
            <Button
              disabled={isApplied}
              onClick={isApplied ? null : applyJobHandler}
              className={`rounded-lg  ${
                isApplied
                  ? "bg-gray-500 hover: cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-800"
              }`}
            >
              {isApplied ? "Already Apllied" : "Apply now"}
            </Button>
          </div>
        </div>

        <h1 className="font-bold pb-4 my-4 border-b-2 border-b-gray-400 ">
          {singleJob?.description}
        </h1>
        <div className="mt-4">
          <h1 className="font-bold">
            Role :{" "}
            <span className="text-gray-800 font-normal pl-3">
              {singleJob?.title}
            </span>{" "}
          </h1>
          <h1 className="font-bold ">
            Location :{" "}
            <span className="text-gray-800 font-normal pl-3">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold">
            Description :{" "}
            <span className="text-gray-800 font-normal pl-3">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold ">
            Experience :{" "}
            <span className="text-gray-800 font-normal pl-3">
              {singleJob?.experiencelevel} years
            </span>
          </h1>
          <h1 className="font-bold ">
            Salary :{" "}
            <span className="text-gray-800 font-normal pl-3">
              {singleJob?.salary}
            </span>
          </h1>
          <h1 className="font-bold ">
            Total Application :
            <span className="text-gray-800 font-normal pl-3">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold ">
            Posted Date :{" "}
            <span className="text-gray-800 font-normal pl-3">
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
