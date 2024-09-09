import { LuUpload } from "react-icons/lu";
import Items from "./Items";
import { useCreatePostMutation, useGetPostsQuery } from "../services/apiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const Form = () => {
  const { data } = useGetPostsQuery();
  const [post, setPost] = useState("");
  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post) {
      toast.error("Pls add a Post", { autoClose: 1500 });
      return;
    }
    try {
      await createPost({ title: post, id: (data?.length || 0) + 1 }).unwrap();
      toast.success("Added Post successfully", { autoClose: 1500 });
      setPost("");
    } catch (error) {
      console.error("Failed to create the post: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center text-xl text-gray-700 mb-4">CRUD Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Add post"
            className="w-full py-2 px-4 border-none focus:outline-none"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button type="submit" className="text-gray-500 p-2 border-none">
            <LuUpload size={25} />
          </button>
        </div>
        <Items posts={data} />
      </form>
    </div>
  );
};

export default Form;
