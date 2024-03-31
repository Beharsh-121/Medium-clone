import { Link } from "react-router-dom";
import avatar1 from "../assets/avatar1.png";

interface ArticleProps {
  postId: string; // Renamed key to postId
  title: string;
  content: string;
  name: string;
}

function Article({ postId, title, content, name }: ArticleProps) {
  return (
    <div className="space-y-4 border-2 border-gray-300 p-5 rounded-3xl bg-violet-50">
      <div className="space-y-2">
        <span className="text-sm font-medium text-purple-900">
          Article
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-gray-800">
          {title}
        </h2>
        <p className="text-gray-600">
          {trimTo20Words(content)}
        </p>
      </div>
      <div className="grid items-center grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <img
            src={avatar1}
            alt="Author"
            width="32"
            height="32"
            className="rounded-full"
          />
          <div className="space-y-0.5">
            <h4 className="text-sm font-semibold">{name}</h4>
            <time className="text-sm font-normal">November 12, 2023</time>
          </div>
        </div>
        <div className="flex justify-end items-center space-x-4">
          <Link
            className="font-semibold  border-2 border-gray-200 px-4 py-2 rounded-3xl bg-gray-900 text-white"
            to={`/blog/${postId}`}
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Article;

function trimTo20Words(str: string) {
  str = str.trim();
  const words = str.split(/\s+/);
  if (words.length > 20) str = words.slice(0, 20).join(" ") + "...";
  return str;
}
