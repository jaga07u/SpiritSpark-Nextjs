"use client";
import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import { CgProfile } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookie from "js-cookie"


function EditProfile({ User, hiidenble }) {
  const [username, setUsername] = useState(User?.username || "");
  const [fullname, setFullname] = useState(User?.fullname || "");
  const [avatarfile, setAvatarfile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [userAvatar, setUserAvatar] = useState(User?.avatarImg);
  const router = useRouter();
  
  const handleEditProfile = () => {
    hiidenble(false);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setAvatarfile(file);  // Store the file directly
      const imageUrl = URL.createObjectURL(file);
      setAvatarURL(imageUrl);
    }
  };

  const DeleteAvatar = () => {
    setUserAvatar("");
    setAvatarfile(null);  // Clear the file
  };

  const SaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullname', fullname);

    if (avatarfile) {
      formData.append('avatar', avatarfile);  // Append the file to FormData
    }
    const token = Cookie.get('accessToken');
    try {
      const res = await axios.patch("https://spirit-spark-backendv2.onrender.com/api/v1/user/update", formData, 
        { withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
         });
      console.log(res.data);
      toast.success("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] backdrop-blur-lg z-50 flex justify-center items-center flex-col absolute">
      <MdCancel onClick={handleEditProfile} style={{ marginLeft: "270px", marginTop: "-60px", width: "30px", height: "30px" }} />
      <div>
        <AiFillDelete onClick={DeleteAvatar} style={{ marginLeft: "100px", marginTop: "10px", width: "30px", height: "30px" }} />
      </div>
      <div className="w-[90%] h-[70%]">
        <div className="w-full h-[80px] flex justify-center items-center">
          {userAvatar || avatarURL ? (
            <div>
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute left-[-20px] opacity-0 mx-[-60px] my-3 z-50"
              />
              <Avatar AvatarUrl={userAvatar || avatarURL} width={20} />
            </div>
          ) : (
            <div>
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute left-[-20px] opacity-0 mx-[-60px] my-3"
              />
              <CgProfile className="z-50" style={{ width: "70px", height: "70px" }} />
            </div>
          )}
        </div>
        <div className="w-full h-[80px] flex justify-center items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type here"
            className="input input-bordered input-error w-full max-w-xs"
          />
        </div>
        <div className="w-full h-[80px] flex justify-center items-center">
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Type here"
            className="input input-bordered input-error w-full max-w-xs"
          />
        </div>
        <div className="w-full h-[80px] flex justify-center items-center">
          <button
            onClick={SaveProfile}
            className="btn w-[100px] text-xl">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
