import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    const filteredCompanpy =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompanpy);
  }, [searchCompanyByText, companies]);
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
          {companies.length < 0 ? (
            <span>You havn't register company yet</span>
          ) : (
            filterCompany.map((company) => (
              <>
                <TableRow key={company._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        className="h-14 w-14"
                        size="icon"
                        src={company.logo}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex gap-3 mt-3 items-center cursor-pointer"
                        >
                          <Edit2 />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
