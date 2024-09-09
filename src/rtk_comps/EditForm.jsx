import { MdDone } from "react-icons/md";
import { useGetPostQuery, useUpdatePostMutation } from "../services/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditForm = () => {
  const { state: { id } = {} } = useLocation();
  const { data } = useGetPostQuery(id);
  const [newVal, setNewVal] = useState(data?.title || "");
  const [checked, setChecked] = useState(data?.checked || false);
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setNewVal(data.title || "");
      setChecked(data.checked || false);
    }
  }, [data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost({
        ...data,
        title: newVal?.trim() || data?.title,
        checked,
      }).unwrap();
      toast.success("Post " + data?.id + " updated successfully", {
        autoClose: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to update the post: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-center text-2xl font-semibold text-blue-600 mb-6">
        Edit Post
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            className="w-full py-3 px-4 border-none focus:outline-none"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
          />
          <button type="submit" className=" text-gray-500 p-3 border-none ">
            <MdDone size={25} />
          </button>
        </div>
        <div className="flex items-center space-x-4 justify-between">
          <h3
            className={`text-lg ${
              checked
                ? "line-through text-gray-500 capitalize"
                : "text-gray-700 capitalize"
            }`}
          >
            {data?.title}
          </h3>
          <label className="flex items-center cursor-pointer space-x-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="hidden"
            />
            <div
              className={`w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded-md cursor-pointer transition-colors ${
                checked ? "bg-blue-600 border-blue-600" : "bg-white"
              }`}
            >
              {checked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </label>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
