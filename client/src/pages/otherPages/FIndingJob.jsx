import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components";

const FindingJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/job/alljob`, {
        params: {
          keyword: searchQuery,
          page: currentPage,
          ...appliedFilters,
        },
      });
      setJobs(response.data.data);
      setFilterOptions(response.data.filters);
      setTotalPages(response.data.pagination.totalPages);
      setCurrentPage(response.data.pagination.currentPage);
    } catch (error) {
      setError("Error fetching job data. Please try again later.");
      console.error("Error fetching job data:", error.message);
    }
    setLoading(false);
  }, [currentPage, appliedFilters, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [currentPage, appliedFilters, searchQuery, fetchData]); // Include fetchData in the dependency array

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...appliedFilters, [filterType]: value };
    setAppliedFilters(updatedFilters);
    setSearchQuery("");
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleRemoveFilter = (filterType) => {
    const { [filterType]: removedFilter, ...restFilters } = appliedFilters;
    setAppliedFilters(restFilters);
    setSearchQuery("");
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleViewDetails = (jobId) => {
    navigate(`/vacancy-details/${jobId}`);
  };

  const resetFilters = () => {
    setAppliedFilters({});
    setSearchQuery("");
    setCurrentPage(1); // Reset to first page when filters are reset
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData(); // Reset to first page when search query is submitted
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Job Listings
        </h2>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          {/* Search input */}
          <div className="flex flex-col sm:flex-row items-stretch">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for jobs..."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-l-md mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {/* Search button */}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-r-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Active Filters */}
        <div className="flex flex-wrap justify-center mb-8">
          {/* Active filters */}
          {Object.keys(appliedFilters).map((filterType, index) => (
            <div key={index} className="mr-2 mb-2">
              <span className="bg-blue-200 px-3 py-1 rounded-md mr-1 text-sm text-gray-700">
                {filterType}: {appliedFilters[filterType]}
              </span>
              <button
                onClick={() => handleRemoveFilter(filterType)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Filter options */}
        <div className="flex flex-wrap justify-center mb-8">
          {/* Location filter */}
          <select
            name="location"
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md mr-4 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            style={{ minWidth: "200px" }}
          >
            <option value="">Select Location</option>
            {filterOptions.locations &&
              filterOptions.locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
          </select>
          {/* Skill filter */}
          <select
            name="skill"
            onChange={(e) => handleFilterChange("skill", e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md mr-4 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            style={{ minWidth: "200px" }}
          >
            <option value="">Select Skill</option>
            {filterOptions.skills &&
              filterOptions.skills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
          </select>
          {/* Job Type filter */}
          <select
            name="jobType"
            onChange={(e) => handleFilterChange("jobType", e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md mr-4 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            style={{ minWidth: "200px" }}
          >
            <option value="">Select Job Type</option>
            {filterOptions.jobTypes &&
              filterOptions.jobTypes.map((jobType, index) => (
                <option key={index} value={jobType}>
                  {jobType}
                </option>
              ))}
          </select>
          {/* Reset Filters button */}
          <button
            onClick={resetFilters}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            Reset Filters
          </button>
        </div>

        {/* Job listings */}
        {error && <p className="text-red-500 text-center mb-8">{error}</p>}
        {loading ? (
          <p className="text-gray-600 text-center mb-8">Loading...</p>
        ) : jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-md p-6 mb-8 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
              onClick={() => handleViewDetails(job._id)}
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {job.company.name}
              </h3>
              <h4 className="text-base md:text-lg font-semibold text-blue-500 mb-2">
                {job.title}
              </h4>
              <p className="text-sm md:text-base text-gray-600 mb-2">
                {job.location}
              </p>
              <div className="flex flex-wrap mb-4">
                {job.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full mr-2 mb-2"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                {job.jobType}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No jobs found</p>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md mr-2 mb-2 sm:mb-0 sm:mr-2 focus:outline-none"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 mb-2 sm:mb-0 sm:mr-2 focus:outline-none">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md focus:outline-none"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default FindingJob;
