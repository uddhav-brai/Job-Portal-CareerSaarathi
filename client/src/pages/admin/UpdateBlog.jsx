import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function UpdateBlog() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    picture: null,
    content: "",
    tags: [],
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (blogId) {
      axios
        .get(`/blog/${blogId}`)
        .then((response) => {
          const { title, content, tags, picture } = response.data;
          setFormData({
            title,
            picture,
            content,
            tags,
          });
          console.log("Content received from server:", content);
          try {
            const blocksFromHTML = convertFromHTML(content[0]); // Access the first element of the array
            if (blocksFromHTML) {
              const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
              );
              const editorState = EditorState.createWithContent(state);
              setEditorState(editorState);
            }
          } catch (error) {
            console.error(
              "Error converting HTML content to editor state:",
              error
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching blog post:", error);
        });
    }
  }, [blogId]);

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const contentHTML = draftToHtml(convertToRaw(contentState));
    setFormData((prevState) => ({
      ...prevState,
      content: contentHTML,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("picture", formData.picture);
      formData.tags.forEach((tag) => {
        data.append("tags", tag);
      });

      await axios.put(`/blog/blogs/${blogId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Blog post updated successfully");
      navigate("/admin/all-blog");
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const addTagField = () => {
    setFormData((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, ""],
    }));
  };
  const handleTagChange = (index, e) => {
    const { value } = e.target;
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      tags: newTags,
    }));
  };

  const removeTagField = (index) => {
    const newTags = [...formData.tags];
    newTags.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      tags: newTags,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-semibold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Content:</label>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            required
            editorClassName="demo-editor border border-gray-300 rounded-md px-3 py-2"
            onEditorStateChange={handleEditorStateChange}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "list",
                "textAlign",
                "link",
                "history",
              ],
              inline: {
                options: ["bold", "italic", "underline", "strikethrough"],
              },
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Picture:</label>
          <input
            type="file"
            name="picture"
            onChange={(e) =>
              setFormData({ ...formData, picture: e.target.files[0] })
            }
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <img
            src={formData.picture}
            alt=""
            style={{ width: "100%", maxWidth: "400px" }}
            className="mt-2"
          />
        </div>
        {formData.tags.map((tag, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-lg font-semibold mb-2">
              Tags (comma-separated):
            </label>
            <input
              type="text"
              required
              value={tag}
              onChange={(e) => handleTagChange(index, e)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <button
              type="button"
              onClick={() => removeTagField(index)}
              className="text-red-600 mt-2"
            >
              Remove Tag
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTagField}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Tag
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default UpdateBlog;
