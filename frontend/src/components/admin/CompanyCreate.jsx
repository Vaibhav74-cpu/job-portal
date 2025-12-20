import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CompanyCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  const createNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res?.date?.company)); //store/save company globally
        toast.success(res.data.message);
        const companyId = res?.data?.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-4">
          <h1 className="font-bold text-2xl">Your company Name</h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, Lorem, ipsum dolor sit amet consectetur adipisicing.
            quibusdam.
          </p>
        </div>
        <div className="mt-5">
          <Label className="font-bold text-xl">Company Name</Label>
          <Input
            type="text"
            placeholder="Microsoft india"
            className="mt-2 w-full"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="space-x-4 my-6">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={createNewCompany} >Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
