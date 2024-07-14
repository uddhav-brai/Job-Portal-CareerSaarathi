import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate();

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/blog/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    setSelectedBlogId(blogId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/blog/blogs/${selectedBlogId}`);
      fetchBlogs();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedBlogId(null);
  };

  const handleUpdate = (blogId) => {
    navigate(`/admin/update-blog/${blogId}`);
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
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-blue-200">Title</th>
                <th className="px-4 py-2 bg-blue-200">Content</th>
                <th className="px-4 py-2 bg-blue-200">Tags</th>
                <th className="px-4 py-2 bg-blue-200">Created At</th>
                <th className="px-4 py-2 bg-blue-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  className={index % 2 === 0 ? "bg-green-100" : "bg-yellow-100"}
                >
                  <td className="border px-4 py-2">{blog.title}</td>
                  <td className="border px-4 py-2">
                    {/* Display only the first 20 characters of the content */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: truncateContent(blog.content, 20),
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2">{blog.tags.join(", ")}</td>
                  <td className="border px-4 py-2">
                    {new Date(blog.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleUpdate(blog._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete confirmation dialog */}
        {deleteDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-8 rounded shadow-md">
              <p className="text-lg mb-4">
                Are you sure you want to delete this blog?
              </p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
