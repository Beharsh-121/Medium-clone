import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Article from "../components/Article";
import { BACKEND_URL } from "../config";
import Spinner from "../components/Spinner";

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
}

function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        if (!token) {
          window.location.href = "/signin";
        }
        const response = await axios.get<Post[]>(
          `${BACKEND_URL}/api/v1/blog`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        setLoading(false);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {!loading?<div className="px-4 py-6 md:py-12 lg:py-16 ">
        <div className="grid max-w-6xl gap-10 mx-auto lg:grid-cols-2 lg:gap-14 lg:px-6 ">
          {posts.map((post) => (
            <Article
              key={post.id}
              postId={post.id}
              title={post.title}
              content={post.content}
              name={post.authorName}
            />
          ))}
        </div>
      </div>
      :
      <div className="h-screen flex justify-center items-center ">
          <Spinner/>
        </div>
      }
    </div>
  );
}

export default Blog;
