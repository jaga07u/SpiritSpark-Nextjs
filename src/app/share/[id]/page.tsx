"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaOm, FaRegComment } from "react-icons/fa6";
import { BsSave } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import Dropdown from './Dropdown';
import Avatar from '../../components/Avatar';
//import useApp from '../contex/Contex';
import { useRouter } from 'next/navigation';
import {Card, CardHeader, CardBody} from "@nextui-org/react";
// import {Button} from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent, Button, User} from "@nextui-org/react";
import { UserTwitterCard } from '../../components/UserTweeterCard';
import {Dropdown,DropdownTrigger, DropdownMenu, DropdownItem, RadioGroup, Radio} from "@nextui-org/react"
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiSaveArrow } from "react-icons/gi";
import Cookie from "js-cookie"
import { WhatsappShareButton, WhatsappIcon } from "react-share"; // Import WhatsApp components

function Page({params}) {
 // const [isFollowed, setIsFollowed] = useState(Data?.isFollowed || false);
 const [isLiked, setIsLiked] = useState(false);
 const [likeCount, setLikeCount] = useState(0);
 const shareUrl = `${window.location.origin}/share/${params.id}`; // URL for sharing
   const [page,setPage]=useState(1);
     const [Data,setData]=useState(null);
     const [loading, setLoading] = useState(false);
   const [user, setUser] = useState(null);
   const [lastScrollY, setLastScrollY] = useState(0);
   const [QuoteDetails, setQuoteDetails] = useState(null);
   const [UserCard, setUserCard] = useState(null);
   const [scrollDirection, setScrollDirection] = useState(null);
 // const [timeSinceCreation, setTimeSinceCreation] = useState('');
// const {setUserCard}=useApp();
const [isFollowed, setIsFollowed] = React.useState(false);
 const router=useRouter();
 useEffect(()=>{
    // console.log("Reloding completed");
     getCardData();
   },[page])
const getCardData = async () => {
  const token = Cookie.get('accessToken');
    try {
      setLoading(true);
      const res = await axios.get(`https://spirit-spark-backendv2.onrender.com/api/v1/users/profile/share/${params.id}`,{
        withCredentials:true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
      });
      const data = res.data;
      console.log(data);
     //   const cardData=data.data;
    //  console.log(cardData);
       setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
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
 const token = Cookie.get('accessToken');
 const handleLike = async (id) => {
   console.log(id);
   setIsLiked(!isLiked);
   setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
   const res = await axios.post(`https://spirit-spark-backendv2.onrender.com/api/v1/like/quote`, { quoteId: id },{withCredentials:true,
     headers: {
       Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json'
   }
   });
    
   console.log(res.data);
   console.log("like");
 };
 return (
   <>
   <div className="h-[500px] w-full border-2 border-gray-300 rounded-md  ">
   <div className="w-full h-[70px]  flex  ">
         <div className="w-[80%] h-full my-3 px-2">
         <Popover showArrow placement="bottom">
     <PopoverTrigger>
       <User   
         as="button"
         name={`${Data?.Owner?.username}`}
        // description="Father of Universe"
         className="transition-transform"
         avatarProps={{
           src: `${Data?.Owner?.avatar}`
         }}
       />
     </PopoverTrigger>
     <PopoverContent className="p-1">
       <UserTwitterCard data={Data}/>
     </PopoverContent>
   </Popover>
         </div>
         <div className="w-[10%] h-full flex justify-center items-center">
         <Dropdown>
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
       <DropdownItem key="new">New file</DropdownItem>
       <DropdownItem key="copy">Copy link</DropdownItem>
       <DropdownItem key="edit">Edit file</DropdownItem>
       <DropdownItem key="delete" className="text-danger" color="danger">
         Delete file
       </DropdownItem>
     </DropdownMenu>
   </Dropdown>
         </div>
   </div>
   <div className="w-full h-[360px] flex justify-center items-center p-2 flex-wrap " style={{backgroundImage:`url(${Data?.data?.BgImageUrl})`,backgroundAttachment:"scroll",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
      
     <h1 className="text-3xl">{Data?.data.quote || Data?.data.couplet || Data?.data.poem || Data?.data.story  }</h1> 
   </div>
   <div className="w-full h-[60px] flex justify-between items-center px-3 bg">
   <div className="flex justify-center items-center flex-col">
   <FaOm 
  onClick={()=>{handleLike(Data?.data?._id)}}
   className={`text-4xl font-bold  ${isLiked ? "text-red-500" :"text-gray-400"}  outline-4 outline-black`}/>
   <h1>{likeCount}</h1>
   </div>
    <WhatsappShareButton
             url={shareUrl}
             title={`Check out this couplet: "${Data?.data?.couplet || Data?.data?.quote}"`}
           >
             <WhatsappIcon size={32} round />
           </WhatsappShareButton>
   </div>
   </div>
   </>
 );
}

export default Page
