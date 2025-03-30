// import React, { useEffect, useState } from 'react';
// import Image from "next/image";
// import { CgProfile } from "react-icons/cg";
// import { FaOm, FaRegComment } from "react-icons/fa6";
// import { BsSave } from "react-icons/bs";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faOm } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// // import Dropdown from './Dropdown';
// import Avatar from './Avatar';
// //import useApp from '../contex/Contex';
// import { useRouter } from 'next/navigation';
// import {Card, CardHeader, CardBody} from "@nextui-org/react";
// // import {Button} from "@nextui-org/react";
// import {Popover, PopoverTrigger, PopoverContent, Button, User} from "@nextui-org/react";
// import { UserTwitterCard } from './UserTweeterCard';
// import {Dropdown,DropdownTrigger, DropdownMenu, DropdownItem, RadioGroup, Radio} from "@nextui-org/react"
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { GiSaveArrow } from "react-icons/gi";
// import { WhatsappShareButton, WhatsappIcon } from "react-share"; // Import WhatsApp components
// import Cookie from "js-cookie"


// function PoemCard({ Data }) {
//   // const [isFollowed, setIsFollowed] = useState(Data?.isFollowed || false);
//   const [isLiked, setIsLiked] = useState(Data?.isLiked || false);
//   const [likeCount, setLikeCount] = useState(Data?.likeCount || 0);
//   // const [timeSinceCreation, setTimeSinceCreation] = useState('');
//  // const {setUserCard}=useApp();
//  const shareUrl = `${window.location.origin}/share/${Data?._id}`; // URL for sharing
//  const [isFollowed, setIsFollowed] = React.useState(false);
//   const router=useRouter();
//   // useEffect(() => {
//   //   const createdAtDate = new Date(Data.createdAt);
//   //   const currentDate = new Date();
//   //   const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);
//   //   if (timeDifferenceInSeconds < 60) {
//   //     setTimeSinceCreation(`${timeDifferenceInSeconds} seconds ago`);
//   //   } else if (timeDifferenceInSeconds < 3600) {
//   //     const minutes = Math.floor(timeDifferenceInSeconds / 60);
//   //     setTimeSinceCreation(`${minutes} minutes ago`);
//   //   } else if (timeDifferenceInSeconds < 86400) {
//   //     const hours = Math.floor(timeDifferenceInSeconds / 3600);
//   //     setTimeSinceCreation(`${hours} hours ago`);
//   //   } else {
//   //     const days = Math.floor(timeDifferenceInSeconds / 86400);
//   //     setTimeSinceCreation(`${days} days ago`);
//   //   }
//   // }, [Data.createdAt]);
//   // console.log(Data.Owner?._id === User._id);
//   // console.log(Data.Owner?._id === User.id );
//   // console.log(Data.Owner?._id);
//   // console.log(User.id);
//   // const handleFollow = async (id) => {
//   //  // console.log(id);
//   //   const res = await axios.post(`api/users/follow/${id}`);
//   //   setIsFollowed(!isFollowed);
//   //   console.log(res.data);
//   // };
//   // const hanldeUserProfile=async(id)=>{
//   //     router.push(`/profile/${id}`);
//   // }

//   const handleLike = async (id) => {
//     console.log(id);
//     setIsLiked(!isLiked);
//     setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
//     const token = Cookie.get('accessToken');
//      const res = await axios.post(`https://spirit-spark-backendv2.onrender.com/api/v1/like/poem`, { poemId: id },
//       {withCredentials:true,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//     console.log(res.data);
//     console.log("like");
//   };


//   return (
//     <>
//     <div className="h-[550px] w-full border-2 border-gray-300 rounded-md  ">
//     <div className="w-full h-[70px]  flex  ">
//           <div className="w-[80%] h-full my-3 px-2">
//           <Popover showArrow placement="bottom">
//       <PopoverTrigger>
//         <User   
//           as="button"
//           name={`${Data?.Owner?.username}`}
//          // description="Product Designer"
//           className="transition-transform"
//           avatarProps={{
//             src: `${Data?.Owner?.avatar}`
//           }}
//         />
//       </PopoverTrigger>
//       <PopoverContent className="p-1">
//         <UserTwitterCard data={Data} />
//       </PopoverContent>
//     </Popover>
//           </div>
//           <div className="w-[10%] h-full flex justify-center items-center">
//           <Dropdown>
//       <DropdownTrigger>
//         <Button 
//           color="default"
//           variant="light"
//           className="capitalize"
//         >
//           <BsThreeDotsVertical className="text-3xl "/>
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu 
//         aria-label="Dropdown Variants"
//         color="default"
//         variant="light"
//       >
//         <DropdownItem key="new">New file</DropdownItem>
//         <DropdownItem key="copy">Copy link</DropdownItem>
//         <DropdownItem key="edit">Edit file</DropdownItem>
//         <DropdownItem key="delete" className="text-danger" color="danger">
//           Delete file
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//           </div>
//     </div>
//     <div className="w-full h-[420px] flex justify-center items-center text-2xl p-2 flex-wrap " style={{backgroundImage:`url(${Data?.BgImageUrl})`,backgroundAttachment:"scroll",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
       
//        <h1>{Data.poem || Data.story}</h1>
//     </div>
//     <div className="w-full h-[60px] flex justify-between items-center p-3 bg">
//     <div className="flex justify-center items-center flex-col">
//     <FaOm 
//    onClick={()=>{handleLike(Data?._id)}}
//     className={`text-4xl font-bold  ${isLiked ? "text-red-500" :"text-gray-400"}  outline-4 outline-black`}/>
//     <h1>{likeCount}</h1>
//     </div>
//      <WhatsappShareButton
//               url={shareUrl}
//               title={`Check out this couplet: "${Data?.couplet || Data.quote}"`}
//             >
//               <WhatsappIcon size={32} round />
//             </WhatsappShareButton>
//     </div>
//     </div>
//     </>
//   );
// }

// export default PoemCard;
import { useState } from "react";
//import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@nextui-org/react";
import { UserPlus, UserCheck, Bookmark, Share2 } from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export default function PoemCard(data) {
  const [following, setFollowing] = useState(data?.isFollowed);
  const [likeCount, setLikeCount] = useState(data?.likeCount);
  const [isLiked, setIsLiked] = useState(data?.isLiked);
  const [isSaved, setIsSaved] = useState(false);
  const [showBigLotus, setShowBigLotus] = useState(false);

  const handleLike = () => {
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
    setShowBigLotus(true);
    setTimeout(() => setShowBigLotus(false), 1000);
  };
  const handleFollow = async () => {
    setFollowing(!following);
    const res = await axios.post(
      `https://spirit-spark-backendv2.onrender.com/api/v1/follow/${data?.Data?.Owner?._id}`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }
//   console.log(data);
// console.log(data[0]?.createdAt);

  return (
    <div className="w-full overflow-hidden transition-all duration-500 hover:shadow-xl dark:shadow-primary/5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm border-opacity-50">
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
        <img
          src={data?.BgImageUrl}
          alt="Spiritual content"
          className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 z-20 text-white/90 text-sm">
          {formatDistanceToNow(new Date(Date.parse(data?.createdAt)), { addSuffix: true })}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Image
                  src={data?.Data?.Owner?.avatar}
                  alt={data?.Data?.Owner?.username}
                  width={40}
                  height={40}
                  quality={100}
                  className="w-[50px] h-[50px] rounded-full object-cover aspect-square"
                       />
            <div>
              <h3 className="font-semibold text-base dark:text-gray-200">
                {data?.Owner?.username}
              </h3>
              {/* <p className="text-xs font-medium text-muted-foreground">
                {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
              </p> */}
            </div>
          </div>
          
          <Button
            variant={following ? "secondary" : "outline"}
            size="sm"
            className="transition-all duration-300"
            onClick={handleFollow}
          >
            {following ? <UserCheck className="w-4 h-4 mr-1.5" /> : <UserPlus className="w-4 h-4 mr-1.5" />}
            {following ? "Following" : "Follow"}
          </Button>
        </div>
       
        <p className="text-base leading-relaxed dark:text-gray-300 whitespace-pre-line font-serif">
          {data?.poem}
        </p>

        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700/50">
          <div className="flex items-center gap-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1.5 transition-all duration-300 ${isLiked ? "text-orange-500" : "text-muted-foreground"}`}
              onClick={handleLike}
            >
              <GiLotus className={`w-6 h-6 transition-transform duration-300 ${isLiked ? "scale-110 text-pink-500" : "text-gray-400"}`} />
              {likeCount}
            </Button>
            {showBigLotus && (
              <GiLotus className="absolute text-pink-500 opacity-75 animate-ping w-24 h-24 transform -translate-x-1/2" />
            )}
           
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-primary">
              <Share2 className="w-5 h-5" />
              Share
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`transition-colors duration-300 ${isSaved ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
