import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Puff } from "react-loader-spinner";
import avatar1 from "../assets/avatar1.png";
import { BACKEND_URL } from "../config";

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
}

function FullBlog() {
  const { id } = useParams();
  const [posts, setPosts] = useState<Post>({} as Post);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        if (!token) {
          window.location.href = "/signin";
        }
        const response = await axios.get<Post>(
          `${BACKEND_URL}/api/v1/blog/` + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLoading(false);

        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen">
      {!loading ? (
        <div className="w-full py-12 lg:py-16 flex justify-center">
          <div className="container grid max-w-2xl gap-6 px-4 md:gap-8 lg:grid-cols-12 lg:max-w-5xl lg:px-6 xl:max-w-6xl ">
            <div className="space-y-2 lg:col-span-8 lg:space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400">
                  Personal Blog
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl xl:text-5xl">
                  {posts.title}
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-full overflow-hidden w-10 h-10">
                  <img
                    src={avatar1}
                    alt="Avatar"
                    width="40"
                    height="40"
                    className="rounded-full object-cover"
                    style={{ aspectRatio: "40/40", objectFit: "cover" }}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold">
                    {posts.authorName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    August 24, 2023
                  </p>
                </div>
              </div>
              <article className="prose prose-gray dark:prose-invert">
                <p>{posts.content}</p>
              </article>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center ">
          <Puff
            height="50"
            width="50"
            radius={1}
            color="gray"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
}

export default FullBlog;
