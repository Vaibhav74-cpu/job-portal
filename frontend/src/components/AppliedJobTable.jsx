import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A List of Applied Job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length <= 0 ? (
            <span>You haven't applied for job yet</span>
          ) : (
            allAppliedJobs?.map((appliedJob) => (
              <TableRow key={appliedJob?._id}>
                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right font-bold capitalize">
                  <Badge 
                    className= {`${
                      appliedJob.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob.status === "accepted"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    } text-center rounded-full`}
                  >
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
