// import Job from "../models/job.model.js";
import { Job } from "../models/job.model.js";
//create a jobs or post jobs

//admin post jobs
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      jobType,
      location,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !jobType ||
      !location ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements,
      salary: Number(salary),
      jobType,
      location,
      experiencelevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(400).json({
        message: "jobs are not found ",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get job by id
export const getjobById = async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(400).json({
      message: "job not fiund by id",
      success: false,
    });
  }
  return res.status(200).json({ job, success: true });
};

//Admin create job till now
export const adminJobs = async (req, res) => {
  const adminId = req.id;
  const jobs = await Job.find({ created_by: adminId });
  if (!jobs) {
    return res.status(400).json({
      message: "job not fiund by id",
      success: false,
    });
  }
  return res.status(200).json({ jobs, success: true });
};

/**
 
{
  "title":"frontend dev",
  "description":"i require frontend dev",
  "requirements":"react , js",
  "salary":25000,
  "jobType":"full time",
  "location":"india",
  "experience":2,
  "position":3,
  "companyId":"691eb539b796618b5f830863"
  }

 */
