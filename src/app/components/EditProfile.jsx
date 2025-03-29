"use client";
import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { Input, Button } from "@nextui-org/react";
import Cookie from "js-cookie";
import { Camera } from "lucide-react";
import useStore from "../zustandStore/store";

function EditProfile({ User, hiidenble }) {
  const [username, setUsername] = useState(User?.username || "");
  const [fullname, setFullname] = useState(User?.fullname || "");
  const [avatarfile, setAvatarfile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [userAvatar, setUserAvatar] = useState(User?.avatarImg);
  
  const { theme } = useStore((state) => state);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setAvatarfile(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarURL(imageUrl);
      setUserAvatar(imageUrl);
    }
  };

  const SaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullname", fullname);
    if (avatarfile) {
      formData.append("avatar", avatarfile);
    }

    const token = Cookie.get("accessToken");
    try {
      const res = await axios.patch(
        "https://spirit-spark-backendv2.onrender.com/api/v1/user/update",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Profile updated successfully");
      hiidenble(false);
      window.location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      {/* Full Width Modal */}
      <div className={`w-full max-w-3xl p-8 rounded-xl shadow-xl relative transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transform scale-100`}>
        
        {/* Close Button */}
        <button onClick={() => hiidenble(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <MdCancel size={28} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

        <form onSubmit={SaveProfile} className="space-y-6">
          <div className="flex flex-col items-center">
            {userAvatar && <Avatar AvatarUrl={avatarURL || userAvatar} className="w-32 h-32 rounded-full border-4 shadow-lg" />}
            <label htmlFor="profileImage" className="mt-3 p-2 bg-gray-300 text-gray-900 rounded-full shadow-md cursor-pointer flex items-center gap-2">
              <Camera className="w-6 h-6" /> Change Avatar
            </label>
            <input id="profileImage" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} fullWidth className="text-black" placeholder="Enter your username" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input value={fullname} onChange={(e) => setFullname(e.target.value)} fullWidth className="text-black" placeholder="Enter your full name" />
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
