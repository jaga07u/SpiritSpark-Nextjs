"use client"
import React, { useState } from 'react'
import Avatar from '../components/Avatar';
import { CgProfile } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
function EditProfile({User,hiidenble}) {
  const [username,setUsername]=useState(User?.username||" ");
  const [fullname,setFullname]=useState(User?.fullname||" ");
  const [avatarfile,setAvatarfile]=useState(null);
  const [avatarURL,setAvatarURL]=useState(null);
  const [userAvatar,setUserAvatar]=useState(User?.avatarImg);
  const router=useRouter();
  
  const handleEditProfile=()=>{
    hiidenble(false);
  }
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
           setAvatarfile(reader.result);
        }
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setAvatarURL(imageUrl);
        console.log(avatarURL);
      }
  };
  const DeleteAvtartar=()=>{
    setUserAvatar("");
  }
  const SaveProfile=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("ID",User?._id);
    formData.append('username', username);
    formData.append('fullname',  fullname);
    // Append file data to FormData
    formData.append('file',avatarfile);
   try {
     const res=await axios.patch("/api/users/login",formData);
     console.log(res.data);
     toast.success("profile Update Successfully");
     window.location.reload();
   } catch (error) {
     console.log("someting went wrong",error);
   }
  }
    return (
        <>
        <div className="w-[100vw] h-[100vh] backdrop-blur-lg  z-50 flex justify-center items-center flex-col absolute">
        <MdCancel
        onClick={handleEditProfile}
        style={{marginLeft:"270px",marginTop:"-60px",width: "30px", height: "30px" }} />
        <div className="">
          <AiFillDelete 
           onClick={DeleteAvtartar}
          style={{marginLeft:"100px",marginTop:"10px",width: "30px", height: "30px" }}/>
          </div>
            <div className="w-[90%] h-[70%]" >
                 <div className="w-full h-[80px] flex justify-center items-center" >

                    {
                          userAvatar || avatarURL ?
                          <>
                          <div>
                          <input type="file" 
                            onChange={handleImageChange}
                            className=" absolute left-[-20px] opacity-0 mx-[-60px] my-3 z-50" />
                         <Avatar AvatarUrl={userAvatar||avatarURL} width={20} />
                         </div>
                          </>:
                          <>
                          <div>
                            <input type="file" 
                            onChange={handleImageChange}
                            className=" absolute left-[-20px] opacity-0 mx-[-60px] my-3" />
                          <CgProfile className="z-50" style={{ width: "70px", height: "70px" }}/>
                          </div>
                          </>
                    }
                 </div>
                 <div className="w-full h-[80px] flex justify-center items-center">
                 <input type="text"
                  value={username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                 placeholder="Type here" className="input input-bordered input-error w-full max-w-xs" />
                 </div>
                 <div className="w-full h-[80px] flex justify-center items-center">
                 <input type="text"
                  value={fullname}
                  onChange={(e)=>{setFullname(e.target.value)}}
                 placeholder="Type here" className="input input-bordered input-error w-full max-w-xs" />
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
        </>
    )
}

export default EditProfile