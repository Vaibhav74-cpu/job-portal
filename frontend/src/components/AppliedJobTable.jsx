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

function AppliedJobTable() {
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
          {[1, 2, 3].map((item, index) => (
            <TableRow key={item}>
              <TableCell>7-12-25</TableCell>
              <TableCell>Full stack developer</TableCell>
              <TableCell>TCS</TableCell>
              <TableCell className="text-right font-bold">Selected</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
