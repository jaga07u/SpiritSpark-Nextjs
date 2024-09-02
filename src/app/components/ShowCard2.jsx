import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaOm, FaRegComment } from "react-icons/fa6";
import { BsSave } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import Dropdown from './Dropdown';
import Avatar from './Avatar';
//import useApp from '../contex/Contex';
import { useRouter } from 'next/navigation';
import {Card, CardHeader, CardBody} from "@nextui-org/react";
// import {Button} from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent, Button, User} from "@nextui-org/react";
import { UserTwitterCard } from './UserTweeterCard';
import {Dropdown,DropdownTrigger, DropdownMenu, DropdownItem, RadioGroup, Radio} from "@nextui-org/react"
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiSaveArrow } from "react-icons/gi";
import Cookie from "js-cookie"


function ShowCard2({ Data,CUser }) {
 console.log("poem data",Data);
  
  // const [isFollowed, setIsFollowed] = useState(Data?.isFollowed || false);
  const [isLiked, setIsLiked] = useState(Data?.isLikedByCurrentUser || false);
   const [likeCount, setLikeCount] = useState(Data?.likeCount || 0);
  // const [timeSinceCreation, setTimeSinceCreation] = useState('');
 // const {setUserCard}=useApp();
 const [isFollowed, setIsFollowed] = React.useState(false);
  const router=useRouter();
  // useEffect(() => {
  //   const createdAtDate = new Date(Data.createdAt);
  //   const currentDate = new Date();
  //   const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);
  //   if (timeDifferenceInSeconds < 60) {
  //     setTimeSinceCreation(`${timeDifferenceInSeconds} seconds ago`);
  //   } else if (timeDifferenceInSeconds < 3600) {
  //     const minutes = Math.floor(timeDifferenceInSeconds / 60);
  //     setTimeSinceCreation(`${minutes} minutes ago`);
  //   } else if (timeDifferenceInSeconds < 86400) {
  //     const hours = Math.floor(timeDifferenceInSeconds / 3600);
  //     setTimeSinceCreation(`${hours} hours ago`);
  //   } else {
  //     const days = Math.floor(timeDifferenceInSeconds / 86400);
  //     setTimeSinceCreation(`${days} days ago`);
  //   }
  // }, [Data.createdAt]);
  // console.log(Data.Owner?._id === User._id);
  // console.log(Data.Owner?._id === User.id );
  // console.log(Data.Owner?._id);
  // console.log(User.id);
  // const handleFollow = async (id) => {
  //  // console.log(id);
  //   const res = await axios.post(`api/users/follow/${id}`);
  //   setIsFollowed(!isFollowed);
  //   console.log(res.data);
  // };
  // const hanldeUserProfile=async(id)=>{
  //     router.push(`/profile/${id}`);
  // }
  const userString = localStorage.getItem("user");
  let user;
  
  if (userString) {
    try {
      user = JSON.parse(userString); // Parse the JSON string to an object
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
  }
  console.log("CurrUser",user);
  console.log("ProfileUser",CUser);
  
  const deletePost=async(id)=>{
    console.log(id);
    const token = Cookie.get('accessToken');
    if(Data?.poem){
              const mode="poem";
              console.log(mode);
              
           const res=await axios.delete(`https://spirit-spark-backendv2.onrender.com/api/v1/post/${mode}/${id}`,{withCredentials:true,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      
           });
           console.log(res.data);
           window.location.reload()
           
    }else{
       const mode="story";
       console.log(mode);
       const res=await axios.delete(`https://spirit-spark-backendv2.onrender.com/api/v1/post/${mode}/${id}`,{withCredentials:true,  headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
       console.log(res.data);
       window.location.reload()
    }
}
const handleLike = async (id) => {
  console.log(id);
  setIsLiked(!isLiked);
  const token = Cookie.get('accessToken');
  
  setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
  if(Data.story){
    const res = await axios.post(`http://localhost:4000/api/v1/like/story`, { storyId: id },{withCredentials:true,headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
  }});
    console.log(res.data);
  }else{
    const res = await axios.post(`http://localhost:4000/api/v1/like/poem`, { poemId: id },{withCredentials:true,headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
  }});
    console.log(res.data);
  }
  

 
  console.log("like");
};
  return (
    <>
    <div className="h-[500px] w-full  rounded-md justify-center items-center  ">
    <div className="w-full h-[70px]  flex  ">
          <div className="w-[80%] h-full my-3 px-2">
          <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <User   
          as="button"
          name={`${CUser?.
            username
            }`}
         // description="Father of Universe"
          className="transition-transform"
          avatarProps={{
            src: `${CUser?.avatarImg}`
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserTwitterCard data={Data} />
      </PopoverContent>
    </Popover>
          </div>
          <div className="w-[10%] h-full flex justify-center items-center">
          {  user?._id !== CUser?._id ? (
        <>
        <button></button>
        </>
      ):
      (  <Dropdown>
      <DropdownTrigger>
        <Button 
          color="default"
          variant="light"
          className="capitalize"
        >
          <BsThreeDotsVertical className="text-3xl "/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Dropdown Variants"
        color="default"
        variant="light"
      >
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger"
        onClick={()=>{deletePost(Data._id)}}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
      )
    
    }
          </div>
    </div>
    <div className="w-full h-[390px] flex justify-center items-center text-2xl " style={{backgroundImage:`url(${Data?.BgImageUrl})`,backgroundAttachment:"scroll",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
       
       {Data?.story || Data.poem}
    </div>
    <div className="w-full h-[40px] flex justify-between items-center p-1 bg">
    <div className="flex justify-center items-center flex-col">
    <FaOm 
   onClick={()=>{handleLike(Data?._id)}}
    className={`text-4xl font-bold  ${isLiked ? "text-red-500" :"text-gray-400"}  outline-4 outline-black`}/>
    <h1>{likeCount}</h1>
    </div>
     <GiSaveArrow className="text-3xl" />
    </div>
    </div>
    </>
  );
}

export default ShowCard2;
