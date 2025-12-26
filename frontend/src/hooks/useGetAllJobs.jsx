import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const {searchText}=useSelector(store=>store.job)
  useEffect(() => {
    
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          // ?keyword=${searchText || ""}
          //api call from backend
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs)); //send jobs and save all jobs in redux store globally
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [searchText]);
}

export default useGetAllJobs;
