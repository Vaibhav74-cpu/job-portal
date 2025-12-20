import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover } from "../ui/popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

function CompaniesTable() {
  return (
    <div>
      <Table className="max-w-6xl">
        <TableCaption>list of registerd company</TableCaption>
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <Avatar>
              <AvatarImage
                className="h-14 w-14"
                size="icon"
                src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01104813/1268-768x591.png"
              />
            </Avatar>
          </TableCell>
          <TableCell>ICIS</TableCell>
          <TableCell>04-01-04</TableCell>
          <TableCell className="text-right">
            <Popover>
              <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
              <PopoverContent >
                <div className="flex gap-3 mt-3 items-center cursor-pointer"><Edit2/>
                <span>Edit</span></div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
