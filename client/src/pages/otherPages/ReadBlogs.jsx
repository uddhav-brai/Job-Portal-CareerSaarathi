import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5); // Number of blogs to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blog/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = (blogId) => {
    navigate(`/view-blogs/${blogId}`);
  };
  const truncateContent = (content, maxLength) => {
    // Create a temporary div element to parse HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;

    // Get the text content of the element
    let textContent = tempElement.textContent || tempElement.innerText;

    // Truncate the text content
    if (textContent.length <= maxLength) {
      return content; // If content length is less than or equal to maxLength, return content as is
    } else {
      // If content length exceeds maxLength, truncate and append ellipsis
      return textContent.substring(0, maxLength) + "...";
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-2xl font-bold mt-8 mb-4">All Blogs</h2>
        <ul className="divide-y divide-gray-200">
          {currentBlogs.map((blog) => (
            <li key={blog._id} className="py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="mt-2 text-gray-600">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: truncateContent(blog.content, 20),
                      }}
                    />
                  </p>
                  <p className="mt-2">
                    <strong>Tags:</strong> {blog.tags.join(", ")}
                  </p>
                  <p className="mt-2">
                    <strong>Created At:</strong>{" "}
                    {new Date(blog.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => handleView(blog._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(blogs.length / blogsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 mx-1 rounded-full focus:outline-none ${
                  i + 1 === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ReadBlogs;
