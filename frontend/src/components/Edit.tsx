import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import avatar2 from "../assets/avatar2.png";
import { BACKEND_URL } from "../config";

interface ArticleProps {
  postId: string;
  title: string;
  content: string;
  name: string;
}

export function Edit({ postId, title, content, name }: ArticleProps) {
  const [toggle, setToggle] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);
  const [date] = useState<string>("November " + (Math.floor(Math.random() * 31) + 1) + ", 2023");

  const handleCancel = () => {
    window.location.href = `/profile`;
    setToggle(false);
  };

  const handleSave = async () => {
    try {
      const tokenFromCookies: any = Cookies.get("token");
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id: postId,
          title: updatedTitle,
          content: updatedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenFromCookies}`,
          },
        }
      );
      console.log(toggle);
      console.log(response.data);
      setToggle(false);
      window.location.href = `/profile`;
    } catch (error) {
      console.error("Error updating post:", error);
      setToggle(false);
      alert("An error occurred while updating the post.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="space-y-4 border-2 border-gray-300 p-5 rounded-3xl bg-gray-100 w-full">
        <form className="space-y-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
            Article
          </span>
          <input
            className="text-3xl font-extrabold tracking-tight text-gray-700 w-full  bg-white border-2 border-gray-300 p-2 rounded-md"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            className="text-gray-500 dark:text-gray-400 w-full h-40 border-2 border-gray-300 p-2 rounded-md"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        </form>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <img
              src={avatar2}
              alt="Author"
              width="32"
              height="32"
              className="rounded-full"
            />
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold">{name}</h4>
              <time className="text-sm font-normal">
                {date}
              </time>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default Edit;
