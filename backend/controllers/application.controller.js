import { Application } from "../models/application.model.js";
// import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    // const { id: jobId } = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "job id is required",
        success: false,
      });
    }

    //check user is already applied for job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "you already applied for this jobs",
        success: false,
      });
    }

    //check job exist or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not exist",
        success: false,
      });
    }

    //create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "job applied succesfully",
      success: true,
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "failed to apply for job",
      success: false,
    });
  }
};

//get applied jobs
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    
    return res.status(400).json({
      message: "failed to get applied jobs",
    });
  }
};

//admin see how much students is currently applied for this specfic job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "job not found ",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    
    return res.status(400).json({
      message: "failed to get job applicant",
    });
  }
};

//check status of user selected or not
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application is not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "status updated successfully",
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "failed to update status",
      success: false,
    });
  }
};
