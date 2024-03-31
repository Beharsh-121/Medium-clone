import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tokenFromCookies = Cookies.get("token");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenFromCookies}`,
          },
        }
      );
      console.log(response.data);
      alert("Blog post created successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("An error occurred while creating the blog post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-50 border-2 p-5 rounded-xl">
      <h1 className="text-3xl font-bold mb-5">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-rose-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-semibold">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300  p-2 focus:outline-none focus:border-rose-500 rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-violet-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-violet-700 focus:outline-none focus:bg-purple-600"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default NewBlog;
