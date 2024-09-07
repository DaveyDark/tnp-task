import { useState, useEffect } from "react";
import { deletePost, formatDate } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Edit, Trash } from "react-feather";

const Post = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${id}`,
        );
        setPost(res.data as Post);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, []);

  if (!post)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-semibold">
        Loading...
      </div>
    );

  const dateString = formatDate(post.created_at);

  return (
    <div className="bg-white rounded-xl shadow p-6 w-fit mx-auto">
      <div className="flex gap-2 w-full mb-4">
        <div>
          <h1 className="font-semibold text-2xl uppercase">{post.title}</h1>
          <p className="font-light">{dateString}</p>
        </div>

        {token && (
          <div className="flex gap-1 h-fit">
            <span
              className="p-2 rounded-full bg-surface/50 hover:bg-primary hover:text-white
                      transition duration-300 ease-in-out
                      "
              onClick={() => navigate(`/post/${post.id}/edit`)}
            >
              <Edit size={16} />
            </span>
            <span
              className="p-2 rounded-full bg-surface/50 hover:bg-red-500 hover:text-white
                      transition duration-300 ease-in-out
                      "
              onClick={() =>
                deletePost(post.id, token).then(() => navigate("/"))
              }
            >
              <Trash size={16} />
            </span>
          </div>
        )}
        <p className="rounded-xl px-2 py-1 bg-secondary text-white uppercase h-fit font-semibold ml-auto">
          {post.type}
        </p>
      </div>
      <p className="prose whitespace-pre-wrap">{post.content}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags &&
          post.tags.split(",").map((tag) => (
            <span
              className="rounded-xl px-2 py-1 bg-primary text-white uppercase h-fit font-semibold"
              key={tag}
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Post;
