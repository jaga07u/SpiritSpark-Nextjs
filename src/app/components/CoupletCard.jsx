// import React, { useEffect, useState } from 'react';
// import { FaOm } from "react-icons/fa6";
// import { WhatsappShareButton, WhatsappIcon } from "react-share"; // Import WhatsApp components
// import Cookie from "js-cookie";
// import axios from 'axios';
// import { Popover, PopoverTrigger, PopoverContent, User } from "@nextui-org/react";
// import { UserTwitterCard } from './UserTweeterCard';
// function CoupletCards({ Data }) {
//   const [isLiked, setIsLiked] = useState(Data?.isLiked || false);
//   const [likeCount, setLikeCount] = useState(Data?.likeCount || 0);
//   const [timeSinceCreation, setTimeSinceCreation] = useState('');
//   const shareUrl = `${window.location.origin}/share/${Data?._id}`; // URL for sharing

//   useEffect(() => {
//     const createdAtDate = new Date(Data.createdAt);
//     const currentDate = new Date();
//     const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);

//     if (timeDifferenceInSeconds < 60) {
//       setTimeSinceCreation(`${timeDifferenceInSeconds} seconds ago`);
//     } else if (timeDifferenceInSeconds < 3600) {
//       const minutes = Math.floor(timeDifferenceInSeconds / 60);
//       setTimeSinceCreation(`${minutes} minutes ago`);
//     } else if (timeDifferenceInSeconds < 86400) {
//       const hours = Math.floor(timeDifferenceInSeconds / 3600);
//       setTimeSinceCreation(`${hours} hours ago`);
//     } else {
//       const days = Math.floor(timeDifferenceInSeconds / 86400);
//       setTimeSinceCreation(`${days} days ago`);
//     }
//   }, [Data.createdAt]);

//   const handleLike = async (id) => {
//     const token = Cookie.get('accessToken');
//     setIsLiked(!isLiked);
//     setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
//     await axios.post(
//       `https://spirit-spark-backendv2.onrender.com/api/v1/like/couplet`,
//       { coupletId: id },
//       {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   };

//   return (
//     <div className="h-[500px] w-full border-2 border-gray-300 rounded-md">
//       <div className="w-full h-[70px] flex">
//         <div className="w-[80%] h-full my-3 px-2">
//           <Popover showArrow placement="bottom">
//             <PopoverTrigger>
//               <User
//                 as="button"
//                 name={`${Data?.Owner?.username}`}
//                 avatarProps={{
//                   src: `${Data?.Owner?.avatar}`,
//                 }}
//               />
//             </PopoverTrigger>
//             <PopoverContent className="p-1">
//              <UserTwitterCard data={Data} />
//             </PopoverContent>
//           </Popover>
//         </div>
//         <div className="w-[30%] h-full flex justify-center items-center text-sm">
//           <h1>{timeSinceCreation}</h1>
//         </div>
//       </div>
//       <div
//         className="w-full h-[360px] flex justify-center items-center text-3xl p-2 flex-wrap"
//         style={{
//           backgroundImage: `url(${Data?.BgImageUrl})`,
//           backgroundAttachment: "scroll",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//         }}
//       >
//         {Data?.couplet || Data.quote}
//       </div>
//       <div className="w-full h-[60px] flex justify-between items-center p-3 bg">
//         <div className="flex justify-center items-center flex-col">
//           <FaOm
//             onClick={() => {
//               handleLike(Data?._id);
//             }}
//             className={`text-4xl font-bold ${
//               isLiked ? "text-red-500" : "text-gray-400"
//             } outline-4 outline-black`}
//           />
//           <h1>{likeCount}</h1>
//         </div>
//         <WhatsappShareButton
//           url={shareUrl}
//        //   title={`Check out this couplet: "${Data?.couplet || Data.quote}"`}
//         >
//           <WhatsappIcon size={32} round />
//         </WhatsappShareButton>
//       </div>
//     </div>
//   );
// }

"use client"
// export default QuoteCards;
import { useState } from "react";
//import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@nextui-org/react";
import { UserPlus, UserCheck, Bookmark, Share2 } from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import axios from "axios"
import Cookie from "js-cookie"
import { jwtDecode } from "jwt-decode";
const demoData = {
  image: "https://images.unsplash.com/photo-1738848392298-cf0b62edc750?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  content: "सूरज की तरह चमको, अपने सपनों को पूरा करो।\nरास्ते चाहे कठिन हों, हिम्मत कबी मत हारो।",
  user: {
    name: "आर्य देव",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  contentType: "poem",
  timestamp: new Date(),
  isFollowing: false,
  likes: 120,
};

export default function CoupletCards(data) {
  console.log(data);
  console.log(data?.Data?.createdAt);
  const [following, setFollowing] = useState(data?.Data?.isFollowed);
  const [likeCount, setLikeCount] = useState(data?.Data?.likeCount);
  const [isLiked, setIsLiked] = useState(data?.Data?.isLiked);
  const [isSaved, setIsSaved] = useState(false);
  const [showBigLotus, setShowBigLotus] = useState(false);
 const token = Cookie.get('accessToken');
 let user=jwtDecode(token);
  const handleLike = async(id) => {
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
    setShowBigLotus(true);
    setTimeout(() => setShowBigLotus(false), 1000);
    const res=await axios.post(
            `https://spirit-spark-backendv2.onrender.com/api/v1/like/couplet`,
            { coupletId: id },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
   console.log(res.data)
  };
//   console.log(data);
// console.log(data[0]?.createdAt);

  return (
    <div className="w-full overflow-hidden transition-all duration-500 hover:shadow-xl dark:shadow-primary/5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm border-opacity-50">
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
        <img
          src={data?.Data?.BgImageUrl}
          alt="Spiritual content"
          className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 z-20 text-white/90 text-sm">
          {formatDistanceToNow(new Date(Date.parse(data?.Data?.createdAt)), { addSuffix: true })}
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
                {data?.Data?.Owner?.username}
              </h3>
              {/* <p className="text-xs font-medium text-muted-foreground">
                {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
              </p> */}
            </div>
          </div>
          
        { user._id != data?.Data?.Owner?._id && <Button
            variant={following ? "secondary" : "outline"}
            size="sm"
            className="transition-all duration-300"
            onClick={() => setFollowing(!following)}
          >
            {following ? <UserCheck className="w-4 h-4 mr-1.5" /> : <UserPlus className="w-4 h-4 mr-1.5" />}
            {following ? "Following" : "Follow"}
          </Button>
}
        </div>
       
        <p className="text-base leading-relaxed dark:text-gray-300 whitespace-pre-line font-serif">
          {data?.Data?.couplet}
        </p>

        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700/50">
          <div className="flex items-center gap-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1.5 transition-all duration-300 ${isLiked ? "text-orange-500" : "text-muted-foreground"}`}
              onClick={()=>handleLike(data?.Data?._id)}
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

