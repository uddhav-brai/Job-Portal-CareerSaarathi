import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components";

const ViewBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/blog/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {blog ? (
          <div>
            <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
            <div className="mb-4">
              <strong className="mr-2">Tags:</strong>
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            {blog.picture && (
              <img
                src={blog.picture}
                alt="Blog"
                className="max-w-full mb-4 rounded-lg"
              />
            )}
            <div className="mb-4">
              <strong className="mr-2">Content:</strong>
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="leading-relaxed text-justify"
              />
            </div>
            <p>Created At: {new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ViewBlog;
