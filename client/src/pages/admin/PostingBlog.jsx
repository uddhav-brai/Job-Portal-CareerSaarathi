import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function PostingBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    picture: "",
    tags: [],
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const addTagField = () => {
    setFormData((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, ""],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );

      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", content);
      data.append("picture", formData.picture);
      formData.tags.forEach((tag) => {
        data.append("tags", tag);
      });

      await axios.post("/blog/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Blog post created successfully");
      navigate("/admin/all-blog");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posting Blog Post</h1>
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
              value={tag}
              required
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
          Create Post
        </button>
      </form>
    </div>
  );
}

export default PostingBlog;
