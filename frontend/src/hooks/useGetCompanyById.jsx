import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));//update single company
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [dispatch, companyId]);
};

export default useGetCompanyById;
