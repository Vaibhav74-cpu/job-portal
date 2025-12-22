import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";

function AdminJobs() {
  const dispatch = useDispatch();
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            placeholder="Filter by Job Name & Title"
            className="max-w-48 font-semibold"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button>New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
