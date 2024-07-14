import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Register,
  LogIn,
  Verify,
  CreateProfile,
  CompanyDashboard,
  CompanyProfile,
  JobPostingDescription,
  PostedApplication,
  PostingApplication,
  EmployerDashboardLayout,
  UpdateJob,
} from "./pages";
import {
  JobDashboardLayout,
  BrowseCompany,
  FindJob,
  JobDashboard,
  MyApplication,
  MyProfile,
  JobDescription,
  LandingPage,
} from "./pages";
import UpdateCompany from "./pages/employer/UpdateCompany";
import JobDetails from "./pages/employer/JobDetails";
import GetApplication from "./pages/employer/GetApplication";
import AllApplicants from "./pages/employer/AllApplicants";
import PostingBLog from "./pages/admin/PostingBlog";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UpdateBlog from "./pages/admin/UpdateBlog";
import GetAllBlogs from "./pages/admin/GetAllBlogs";
import AdminLayout from "./pages/admin/AdminLayout";
import ReadBlogs from "./pages/otherPages/ReadBlogs";
import JobApplicant from "./pages/admin/JobApplicant";
import GetAllApplicant from "./pages/admin/GetAllApplicant";
import ApproveJob from "./pages/admin/ApproveJob";
import AppliedJob from "./pages/jobseeker/AppliedJob";
import JobSeekerDetails from "./pages/employer/JobSeekerDetails";
import ApplicantDetails from "./pages/admin/ApplicantDetails";
import GetAllUsers from "./pages/admin/GetAllUsers";
import ViewJobSeekerDetails from "./pages/admin/ViewJobSeekerDetails";
import ViewCompany from "./pages/admin/ViewCompany";
import ViewBlog from "./pages/otherPages/ViewBlogs";
import JobseekerSetting from "./pages/jobseeker/JobseekerSetting";
import EmployerSetting from "./pages/employer/EmployerSetting";
import AdminSetting from "./pages/admin/AdminSetting";
import ForgotPassword from "./pages/forms/ForgotPassword";
import Protected from "./Protected";
import UpdateMyProfile from "./pages/jobseeker/UpdateMyProfile";
import FindingJob from "./pages/otherPages/FIndingJob";
import VacancyDetails from "./pages/otherPages/VacancyDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/readblogs" element={<ReadBlogs />} />
        <Route path="/view-blogs/:blogId" element={<ViewBlog />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/view-company/:companyId" element={<ViewCompany />} />
        <Route path="/search-vacancy" element={<FindingJob />} />
        <Route path="/vacancy-details/:jobId" element={<VacancyDetails />} />

        {/* Protected Routes for Job Seekers */}
        <Route path="" element={<Protected role="jobseeker" />}>
          <Route path="/dashboard" element={<JobDashboardLayout />}>
            <Route index element={<JobDashboard />} />
            <Route path="browsecompany" element={<BrowseCompany />} />
            <Route path="findjob" element={<FindJob />} />
            <Route path="appliedjob" element={<AppliedJob />} />
            <Route path="myapplication" element={<MyApplication />} />
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="update-profile" element={<UpdateMyProfile />} />
            <Route path="jobseeker-setting" element={<JobseekerSetting />} />
            <Route path="job-description/:jobId" element={<JobDescription />} />
          </Route>
        </Route>
        <Route path="" element={<Protected role="admin" />}>
          {/* Protected Routes for Admins */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route
              path="applicant-details/:resumeId"
              element={<ApplicantDetails />}
            />
            <Route path="get-all-users" element={<GetAllUsers />} />
            <Route
              path="view-jobseeker/:resumeId"
              element={<ViewJobSeekerDetails />}
            />
            <Route path="view-company/:companyId" element={<ViewCompany />} />
            <Route path="post-blog" element={<PostingBLog />} />
            <Route path="approve-job" element={<ApproveJob />} />
            <Route
              path="get-all-applicant/:jobId"
              element={<GetAllApplicant />}
            />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />
            <Route path="all-blog" element={<GetAllBlogs />} />
            <Route path="admin-setting" element={<AdminSetting />} />
            <Route path="job-applicant" element={<JobApplicant />} />
            <Route path="job-description/:jobId" element={<JobDescription />} />
          </Route>
        </Route>
        <Route path="" element={<Protected role="employer" />}>
          {/* Protected Routes for Employers */}
          <Route
            path="/employer-dashboard"
            element={<EmployerDashboardLayout />}
          >
            <Route index element={<CompanyDashboard />} />
            <Route path="create-profile" element={<CreateProfile />} />

            <Route
              path="/employer-dashboard/update-application/:jobId"
              element={<UpdateJob />}
            />
            <Route
              path="/employer-dashboard/job-details/:jobId"
              element={<JobDetails />}
            />
            <Route
              path="/employer-dashboard/jobseeker-details/:resumeId"
              element={<JobSeekerDetails />}
            />
            <Route path="get-applicants" element={<GetApplication />} />
            <Route path="all-applicants/:jobId" element={<AllApplicants />} />
            <Route
              path="posting-description"
              element={<JobPostingDescription />}
            />
            <Route path="update-profile" element={<UpdateCompany />} />
            <Route path="posted-application" element={<PostedApplication />} />

            <Route
              path="posting-application"
              element={<PostingApplication />}
            />
            <Route path="company-profile" element={<CompanyProfile />} />
            <Route path="employer-setting" element={<EmployerSetting />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
