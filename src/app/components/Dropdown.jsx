import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Cookie from "js-cookie";
import useStore from "../zustandStore/store";

function Dropdown({ Id }) {
  const router = useRouter();
  const token = Cookie.get("accessToken");
  const theme=useStore((state)=>state.theme);
  // Check the user's preferred theme
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
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 bg-transparent border-none outline-none shadow-none"
      >
        <BsThreeDotsVertical style={{ width: "30px", height: "30px" }} />
      </div>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-2 shadow rounded-box min-w-32 mx-[-80px] ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <li
          className="flex justify-between items-center"
          onClick={() => UpdateQuote(Id)}
        >
          <a>Edit Quote <span className="text-sm text-success-300">coming</span></a>
        </li>
        <li onClick={DeletePost}>
          <a>Delete Quote</a>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
