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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";

const shortlist = ["Accepted", "Rejected"];
function ApplicantsTable() {
  // const params = useParams();
  const navigate = useNavigate();
  const { applicants } = useSelector((store) => store.application);
  // console.log(applicants);

  const statusHandler = async (status, id) => {
    try {
      // axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mt-3">
      <Table>
        <TableCaption>A list of recent applied user.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-700 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="font-semibold">NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="float-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-20 mt-2 boder border-gray-200 bg-white shadow-lg rounded-md p-2">
                      {shortlist.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="cursor-pointer items-center w-fit "
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
