import { Company } from "../models/company.model.js";

//creating or register the company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      //check company already exist or not
      return res.status(400).json({
        message: "you can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "company register/created sucessfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get the comapny
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //the user id of logged in user
    const companies = await Company.find({ userId }); //only show the logged in user companies
    if (!companies) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById({ companyId });
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company information updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
