import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Cookie from "js-cookie";
import useStore from "../zustandStore/store";

function Dropdown({ Id }) {
  const router = useRouter();
  const token = Cookie.get("accessToken");
  const theme = useStore((state) => state.theme);

  const UpdateQuote = () => {
    console.log("hii", Id);
    router.push(`post/${Id}`);
  };

  const DeletePost = async () => {
    console.log("hii", Id);
    try {
      await axios.delete(
        `https://spirit-spark-backendv2.onrender.com/api/v1/post/delete/${Id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Post Deleted Successfully");
      window.location.reload();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong .. please try again ");
    }
  };

  return (
    <div className="relative">
      {/* Three dots button */}
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 bg-transparent border-none outline-none shadow-none"
      >
        <BsThreeDotsVertical style={{ width: "30px", height: "30px" }} />
      </div>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className={`absolute right-0 dropdown-content z-[1] flex flex-col p-2 shadow-lg rounded-lg min-w-40 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <li
          className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-md"
          onClick={UpdateQuote}
        >
          <span className="flex justify-between items-center">
            Edit Quote <span className="text-sm text-green-500">coming</span>
          </span>
        </li>
        <li
          className="w-full px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer rounded-md"
          onClick={DeletePost}
        >
          Delete Quote
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
