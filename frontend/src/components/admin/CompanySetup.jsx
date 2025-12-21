import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
// import { store } from "@/redux/store";

function CompanySetup() {
  const navigate = useNavigate();
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  //show text fields with filled values
  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-8 items-center my-6">
            <div>
              <Label className="font-semibold text-lg">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label className="font-semibold text-lg">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={inputHandler}
              />
            </div>
            <div className="font-semibold text-lg">
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label className="font-semibold text-lg">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={inputHandler}
              />
            </div>
            <div>
              <Label className="text-lg font-semibold">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={fileHandler}
              />
            </div>
          </div>
          <Button type="submit" className="w-full ">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;

/*
6946ed424105ceb531586e3b
*/
