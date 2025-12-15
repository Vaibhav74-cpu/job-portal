// import { Badge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

function LatestJobCards({ job }) {
  return (
    <div className="cursor-pointer shadow-xl border border-gray-100 rounded-md bg-white p-5 mt-3">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-gray-500 text-sm">{job?.description}</p>
      </div>
      <div className="flex gap-2 mt-3">
        <Badge className="text-blue-600 font-bold" variant="ghost">
          {job.position} Positions
        </Badge>
        <Badge className="text-yellow-600 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-violet-600 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
