import avatar2 from "../assets/avatar2.png";
import { useState } from "react";
import { Edit } from "./Edit";


interface ArticleProps {
  postId: string;
  title: string;
  content: string;
  name: string;
}

function PersonalArticle({ postId, title, content, name }: ArticleProps) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex justify-center ">
      {!toggle ?
        <div className="space-y-4 border-2 border-gray-300 p-5 rounded-3xl bg-gray-100">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Article
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-gray-700">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{content}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="cols-start-1 flex items-center space-x-2">
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
                  November {Math.floor(Math.random() * 31 + 1)}, 2023
                </time>
              </div>
            </div>
            <div className="cols-end-2 justify-self-end">
              <button
                onClick={() => setToggle(!toggle)}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        :
        <div className="w-full">
          <Edit postId={postId} title={title} content={content} name={name}/>
        </div>
      }
    </div>
  );
}

export default PersonalArticle;
