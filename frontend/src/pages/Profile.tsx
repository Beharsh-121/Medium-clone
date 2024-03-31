import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PersonalArticle from "../components/PersonalArticle";
import avatar3 from "../assets/avatar2.png";
import Spinner from "../components/Spinner";
import { BACKEND_URL } from "../config";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorName: string;
  authorId: string;
}

function Profile(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const tokenFromCookies: any = Cookies.get("token");
      if (!tokenFromCookies) {
        window.location.href = "/signin";
      }
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/profile/me`,
          {
            headers: {
              Authorization: `Bearer ${tokenFromCookies}`,
            },
          }
        );
        setUser(response.data.user);
        setPosts(response.data.posts);
        setLoading(false);
        setError(null);
      } catch (error: any) {
        setError(error.response.data.error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto md:px-6 lg:py-12 bg-white  flex items-center justify-center ">
      {!loading ? (
        <div className="space-y-4">
          {user && (
            <div className="flex items-center space-x-4">
              <img
                src={avatar3}
                alt="Profile image"
                width="80"
                height="80"
                className="rounded-full"
                style={{ aspectRatio: "80 / 80", objectFit: "cover" }}
              />
              <div className="space-y-1.5">
                <h1 className="text-4xl font-bold text-gray-700">
                  {user.name}
                </h1>
                <div className="flex flex-col">
                  <div className="flex items-center  text-gray-500 ">
                    <div className="text-md">Himachal, India</div>
                  </div>
                  <div className="flex items-center  text-gray-500 ">
                    <dd className="text-md">{user.email}</dd>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grid gap-4 md:gap-6">
            {posts.map((post) => (
              <PersonalArticle
                key={post.id}
                postId={post.id}
                title={post.title}
                content={post.content}
                name={post.authorName}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-32">
          <Spinner/>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default Profile;
