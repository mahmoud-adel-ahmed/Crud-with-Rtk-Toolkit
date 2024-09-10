/* eslint-disable react/prop-types */
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDeletePostMutation } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Items = ({ posts }) => {
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap();
      toast.error("Post " + id + " deleted successfully", { autoClose: 1500 });
    } catch (error) {
      console.error("Failed to delete the post: ", error);
    }
  };

  return (
    <div className="mt-4">
      {posts?.length ? (
        posts?.map((post) => (
          <div
            key={post.id}
            className="flex justify-between items-center p-2 mb-2 border border-gray-300 rounded-lg shadow-sm bg-white capitalize"
          >
            <div className="flex gap-2 items-center">
              <h3
                className={`text-lg ${
                  post.checked ? "line-through text-gray-500" : "text-gray-700"
                }`}
              >
                {post.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(post.id)}
                type="button"
                className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors text-center"
              >
                <FaTrash size={17} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center"
                onClick={() => navigate("/edit", { state: { id: post.id } })}
              >
                <FaEdit size={17} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-center">You don&apos;t have Posts 😒</h3>
      )}
    </div>
  );
};

export default Items;
