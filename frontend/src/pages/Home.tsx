import { useEffect, useState } from "react";
import axios from "axios";
import { deletePost, formatDate } from "../utils";
import { useNavigate } from "react-router-dom";
import { Edit, Trash } from "react-feather";

const PAGE_SIZE = 4;

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Function to fetch posts
  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts?page=${page}&perPage=${PAGE_SIZE}`,
      );
      const data = res.data.data;
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasMore(res.data.current_page < res.data.last_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the first page of posts
  useEffect(() => {
    fetchPosts(1);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // Fetch more posts when page changes
  useEffect(() => {
    if (page > 1) {
      fetchPosts(page);
    }
  }, [page]);

  return (
    <div className="max-w-screen-md w-full mx-auto px-4 pb-4">
      <h2 className="text-xl mt-4 mb-2">Latest Posts</h2>
      <div className="flex gap-4 flex-col">
        {posts.map((post) => {
          const dateString = formatDate(post.created_at);
          return (
            <div key={post.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex w-full mb-4 gap-2 sm:flex-row flex-col">
                <div>
                  <h1 className="font-semibold text-2xl">{post.title}</h1>
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
                        deletePost(post.id, token).then(
                          () => window.location.reload,
                        )
                      }
                    >
                      <Trash size={16} />
                    </span>
                  </div>
                )}
                <p className="rounded-xl px-2 py-1 bg-secondary text-white uppercase h-fit font-semibold w-fit sm:ml-auto">
                  {post.type}
                </p>
              </div>
              <p className="prose whitespace-pre-wrap line-clamp-6">
                {post.content}
              </p>
              <button
                className="bg-primary text-white p-2 w-full rounded-lg"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                Read more
              </button>
            </div>
          );
        })}
      </div>
      {loading && <p>Loading more posts...</p>}
    </div>
  );
};

export default Home;
