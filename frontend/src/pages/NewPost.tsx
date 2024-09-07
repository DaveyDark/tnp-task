import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost } from "../utils";

interface NewPostProps {
  existing?: boolean;
}

const NewPost = ({ existing }: NewPostProps) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("announcement");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const params = useParams();
  const [existingPost, setExistingPost] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  async function createPost() {
    try {
      // Validate the input
      if (!title) setFeedback("Title is required");
      else if (!content) setFeedback("Content is required");
      else setFeedback("");

      await axios.post(
        import.meta.env.VITE_API_URL + "/posts",
        {
          title,
          type,
          content,
          tags,
        },
        {
          headers: {
            accept: "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (existing) {
      const id = params.id;
      axios
        .get(import.meta.env.VITE_API_URL + "/posts/" + id)
        .then((res) => {
          setExistingPost(res.data.id);
          setTitle(res.data.title);
          setType(res.data.type);
          setContent(res.data.content);
          if (res.data.tags) setTags(res.data.tags);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <div className="w-full px-2 mx-auto flex-grow flex flex-col items-center">
      <div className="flex flex-col max-w-screen-sm w-full gap-4 h-fit bg-white rounded-xl shadow p-6">
        <h2 className="text-xl">
          {existing ? "Edit post" : "Create a new post"}
        </h2>
        <p className="text-red-500 text-sm italic -mb-3 -mt-4">{feedback}</p>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 border border-gray-300 block w-full rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <select
            id="type"
            className="mt-1 p-2 border border-gray-300 block w-full rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="announcement">Announcement</option>
            <option value="placement">Placement</option>
            <option value="internship">Internship</option>
            <option value="hackathon">Hackathon</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            rows={6}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 border border-gray-300 block w-full rounded-md resize-y"
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags(Comma separated)
          </label>
          <input
            type="text"
            id="tags"
            className="mt-1 p-2 border border-gray-300 block w-full rounded-md"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button
          className="bg-primary text-white p-2 w-full rounded-lg"
          onClick={
            existingPost
              ? () =>
                  editPost({
                    id: existingPost,
                    title: title,
                    type: type,
                    content: content,
                    tags: tags,
                    token: localStorage.getItem("token")!,
                  }).then(() => navigate(`/post/${existingPost}`))
              : () => createPost()
          }
        >
          {existingPost ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </div>
  );
};

export default NewPost;
