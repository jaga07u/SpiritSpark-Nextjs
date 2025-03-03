/* eslint-disable @next/next/no-img-element */
// /* eslint-disable react-hooks/exhaustive-deps */
"use client"
// import React from 'react'
// import { useState,useEffect } from 'react';
// import { useRouter } from 'next/navigation'
// import Image from 'next/image';
// import Avatar from '../../components/Avatar';
// import { CgProfile } from "react-icons/cg";
// import axios from 'axios';
// import { IoMdArrowRoundBack } from "react-icons/io";
// import ProfileCard from '../../components/ProfileCard';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faOm } from '@fortawesome/free-solid-svg-icons'
// import EditProfile from '../../components/EditProfile';
// import useApp, { AppContext } from '../../contex/Contex';
// import CardElement from '../../components/CardElement';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import useStore from "../../zustandStore/store";
// import Cookie from "js-cookie";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem
// } from "@nextui-org/dropdown";
// import { Button } from "@nextui-org/react";
// function Page({params}) {
//   //  const [user,setUser]=useState(null);
//     const [post,setPost]=useState("couplet");
//     const [posts,setPosts]=useState(null);
//     const [curruser,setCurrUser]=useState(null);
//     const [hidden,setHidden]=useState(false);
//     const [Cardhidden,setCardHidden]=useState(false);
//     const [CardDetails,setCardDetails]=useState(null);
//       const [isFollowed, setIsFollowed] = useState(false);
//       const [followerCount,setFollowercount]=useState(0);
//       const [followingCount,setFollowingcount]=useState(0);
//     const router=useRouter();
//     const theme=useStore((state)=>state.theme);
//      const token = Cookie.get('accessToken');
//   //   const userString = localStorage.getItem("user");
//   // let user;
  
//   // if (userString) {
//   //   try {
//   //     user = JSON.parse(userString); // Parse the JSON string to an object
//   //   } catch (e) {
//   //     console.error("Error parsing user data from localStorage", e);
//   //   }
//   // }
//     const back=()=>{
//         router.push("/");
//     }
//     const cards=[1,2,3,4,5,6,7,8,9];
//    const getProfile=async()=>{
//     const res=await axios.get(`https://spirit-spark-backendv2.onrender.com/api/v1/users/profile/post/${params.id}`,{
//      withCredentials:true,
//      headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//   },});
//   console.log(res.data);
//       setCurrUser(res.data.data.UserDetails);
//       setIsFollowed(res.data.data.UserDetails.isFollowed)
//       setFollowercount(res.data.data.UserDetails.followerCount)
//    //   setFollowingcount(res.data.data.UserDetails.followingCount)
//     setPosts(res.data.data.posts);
//    }
//  // console.log(posts);
//    console.log(curruser);
//    console.log(isFollowed);
   
//    const handleFollow = async () => {
//     try {
//       setIsFollowed((prev) => !prev);
//       setFollowercount((prev)=>prev+1);
//       const res = await axios.post(`https://spirit-spark-backendv2.onrender.com/api/v1/follow/${curruser?._id}`,{data:"jaga"},{withCredentials:true});
    
//       console.log(res.data);
//     } catch (error) {
//       console.error("Error following/unfollowing the user:", error);
//     }
//   };
// //    const handleEditProfile = () => {
// //     setHidden(true);
// // }
// // const handleshowCard=()=>{
// //   setCardHidden(true);
// // }
// //   // console.log(hidden);
//    useEffect(()=>{
//        getProfile();
//    },[])

//     return (
//         <>
//         <AppContext.Provider
//         // value={{CardDetails,setCardDetails}}
//          >
//         {/* {hidden && <EditProfile
//        //  User={user} hiidenble={setHidden}
//          /> } */}
//         {/* {Cardhidden && <CardElement hiddenble={setCardHidden} User={user} />  } */}
//        {/* {quotes?.length ? */}
//        <div  style={{backgroundColor:`${theme == "dark"?"#09143C":""}`}}
//         className={`w-full min-h-[100vh] ${theme=="dark"?"dark text-foreground ":""}`}>
//         <div 
//         //  style={{backgroundColor:`${theme == "dark"?"#09143C":""}`}}
//         className="w-full h-[50px] flex justify-between items-center">
//         <button onClick={back}><IoMdArrowRoundBack style={{ width: "30px", height: "30px" }} /></button>
//         {/* <div className="w-[10%] h-full flex justify-center items-center">
//       <Dropdown>
//         <DropdownTrigger>
//           <Button 
//             color="default"
//             variant="light"
//             className="capitalize"
//           >
//             <BsThreeDotsVertical className="text-3xl"/>
//           </Button>
//         </DropdownTrigger>
//         <DropdownMenu 
//           aria-label="Dropdown Variants"
//           color="default"
//           variant="light"
//         >
//           <DropdownItem 
//             className={`${posts === "couplet" ? "text-success" : ""}`}
//             onClick={() => setPosts("couplet")}
//             key="new"
//           >
//             couplet
//           </DropdownItem>
//           <DropdownItem
//             className={`${posts === "quote" ? "text-success" : ""}`}
//             onClick={() => setPosts("quote")}
//             key="copy"
//           >
//             quote
//           </DropdownItem>
//           <DropdownItem
//             className={`${posts === "poem" ? "text-success" : ""}`}
//             onClick={() => setPosts("poem")}
//             key="edit"
//           >
//             poem
//           </DropdownItem>
//           <DropdownItem 
//             className={`${posts === "story" ? "text-success" : ""}`}
//             onClick={() => setPosts("story")}
//             key="delete"
//           >
//             story
//           </DropdownItem>
//         </DropdownMenu>
//       </Dropdown>
//     </div> */}
//         </div>
//         <div className={`w-full h-[80px] flex justify-center items-center gap-2`}>
//            <div className="w-[80px] h-full">
//             {
//          curruser?.avatarImg ?
//          <>
//         <Avatar AvatarUrl={curruser?.avatarImg} width={22} />
//          </>:
//          <>
//          <CgProfile className="z-50" style={{ width: "50px", height: "50px" }}/>
//          </>
//             }
//           <h1 className="text-center  inline-block font-bold" style={{marginLeft:"0px",fontSize:"14px"}}> 
            
//             {curruser?.username} 
//             </h1>
//            </div>
//            <div className="w-[70px] h-[80px] text-center font-bold">
//             <h1>
//               {posts?.length}
//               </h1>
//             <h1>Posts</h1>
//            </div>
//            <div className="w-[70px] h-[80px] text-center font-bold">
//             <h1>
//               {followerCount}
//               </h1>
//             <h1>Follower</h1>
//            </div>
//            <div className="w-[70px] h-[80px] text-center font-bold">
//             <h1>
//               {curruser?.followingCount}
//               </h1>
//             <h1>Following</h1>
//            </div>
//         </div>
//         <div className="w-full h-[60px]  flex justify-around items-center ">
//         { params.id=== curruser?._id ? ( <button 
//        // onClick={handleEditProfile}
//         className="btn btn-xs  w-[100px] h-[40px] text-lg bg-blue-500">EditProfile</button>
//       ):(
//         <>
//         <button 
//         onClick={handleFollow}
//         className="btn btn-xs  w-[100px] h-[40px] text-lg bg-blue-500">
//           {isFollowed ?"Following":"Follow"
//           }</button>
//         </>
//       )
//       }
//         </div>
//         <div className="w-full min-h-full gap-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 justify-items-center items-center my-1 ">
//           {
//             posts?.map((items,index)=>(
//                 <>
//                 <ProfileCard
//                 key={items._id} 
//                 Data={items} 
//                 User={curruser}
//                 // showFun={handleshowCard}
//                 />
//                 </>
//             ))
//           }
//         </div>
//         </div>
//         {/* :
//         <>
//        <EmptyProfile/>
//         </> */}
// </AppContext.Provider>

//         </>
       
        
//     )
// }

// export default Page
import React, { useEffect, useState } from 'react'
import { MapPin, Link as LinkIcon, Calendar, Users, Settings, MessageSquare, Heart, MessageCircle, Bookmark, X, Share2 } from 'lucide-react'
import { Button } from "@nextui-org/react";
import { UserPlus, UserCheck} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import axios from "axios"
import Cookie from "js-cookie"
import { jwtDecode } from "jwt-decode";
import useStore from '../../zustandStore/store';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Dropdown from "../../components/Dropdown"
function Page({params}) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [following, setFollowing] = useState(false);
  const [followerCount,setFollowercount]=useState(0);
  const [followeingCount,setFolloweingcount]=useState(0);
  const [posts,setPosts]=useState([]);
  const [likeCount, setLikeCount] = useState(2);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showBigLotus, setShowBigLotus] = useState(false);
  const [curruser,setCurrUser]=useState(null);
  const theme=useStore((state)=>state.theme);
   const token = Cookie.get('accessToken');
  useEffect(()=>{
    getProfile();
 },[])
  const handleLike = async(id) => {
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
    setShowBigLotus(true);
    setTimeout(() => setShowBigLotus(false), 1000);
  }
       const getProfile=async()=>{
    const res=await axios.get(`https://spirit-spark-backendv2.onrender.com/api/v1/users/profile/post/${params.id}`,{
     withCredentials:true,
     headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
  },});
    console.log(res.data);
      setCurrUser(res.data.data.UserDetails);
      setFollowing(res.data.data.UserDetails.isFollowed)
      setFollowercount(res.data.data.UserDetails.followerCount)
      setFolloweingcount(res.data.data.UserDetails.followingCount)
    setPosts(res.data.data.posts);
    }
    
    // const res=await axios.post(
    //         `https://spirit-spark-backendv2.onrender.com/api/v1/like/couplet`,
    //         { coupletId: id },
    //         {
    //           withCredentials: true,
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //           },
    //         }
    //       );
  // console.log(res.data)
  const Back = () => {
    router.push('/');
  };

  // const posts = [
  //   {
  //     id: 1,
  //     image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&h=800&fit=crop',
  //     likes: '24.5K',
  //     comments: '328',
  //     caption: 'Exploring the hidden gems of the city. Sometimes the best adventures are right in your backyard! 🌆 #CityLife #Photography',
  //     date: '2 hours ago'
  //   },
  //   {
  //     id: 2,
  //     image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop',
  //     likes: '18.2K',
  //     comments: '245',
  //     caption: 'Paradise found 🌊 Nothing beats a sunset by the beach. The perfect end to a perfect day.',
  //     date: '1 day ago'
  //   },
  //   {
  //     id: 3,
  //     image: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=800&h=800&fit=crop',
  //     likes: '32.1K',
  //     comments: '421',
  //     caption: 'Coffee and creativity ☕️ Starting the morning right with some inspiration.',
  //     date: '3 days ago'
  //   },
  //   {
  //     id: 4,
  //     image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop',
  //     likes: '29.8K',
  //     comments: '385',
  //     caption: 'Nature never ceases to amaze me 🌲 Weekend hiking adventures are the best kind of adventures.',
  //     date: '5 days ago'
  //   },
  //   {
  //     id: 5,
  //     image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=800&fit=crop',
  //     likes: '21.3K',
  //     comments: '276',
  //     caption: 'Chasing waterfalls 💦 Some places just take your breath away.',
  //     date: '1 week ago'
  //   },
  //   {
  //     id: 6,
  //     image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop',
  //     likes: '27.4K',
  //     comments: '342',
  //     caption: 'Meet my new friend! 🐱 Sometimes the best connections are the unexpected ones.',
  //     date: '1 week ago'
  //   }
  // ]
  const router=useRouter();

  return (
    <div className={`min-h-screen ${theme == "dark"?"bg-slate-900": "bg-gray-50"}`}>
       <button onClick={Back}><IoMdArrowRoundBack style={{ width: "30px", height: "30px", marginTop: "0px",color:`${theme=="dark" ? "white":"black" }`}}/></button>
      {/* Cover Photo */}
      <div 
        className="h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2000&h=500')`
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className={`relative -mt-24 ${theme =="dark"?"bg-slate-950 text-white":"bg-gray-50 text-black"}`}>
          <div className=" rounded-xl shadow-lg p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img
                    className="mx-auto h-32 w-32 rounded-full border-4 border-white shadow-lg"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                    alt="Profile"
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:pt-1 sm:text-left">
                  <div className="flex items-center">
                    <h1 className="text-xl font-bold  sm:text-2xl">Sarah Anderson</h1>
                    <span className="ml-2 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">Pro</span>
                  </div>
                  <p className="text-sm font-medium">@sarahanderson</p>
                  {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    San Francisco, CA
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <LinkIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <a href="#" className="hover:text-blue-500">sarah-anderson.com</a>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    Joined December 2021
                  </div> */}
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
                <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Follow
                </button>
              </div>
            </div>

            {/* <div className="mt-6 flex flex-col sm:flex-row sm:space-x-6">
              <div className="flex-1">
                <p className="text-gray-700">
                  Digital creator and photography enthusiast. Capturing moments and sharing stories through my lens. 
                  Always exploring new perspectives and creative possibilities.
                </p>
              </div>
            </div> */}

            <div className="mt-6 grid grid-cols-3 gap-6 text-center">
              <div className="border rounded-lg px-4 py-3">
                <div className="text-2xl font-bold ">1.2M</div>
                <div className="text-sm ">Followers</div>
              </div>
              <div className="border rounded-lg px-4 py-3">
                <div className="text-2xl font-bold ">829</div>
                <div className="text-sm 0">Following</div>
              </div>
              <div className="border rounded-lg px-4 py-3">
                <div className="text-2xl font-bold ">2.4K</div>
                <div className="text-sm ">Posts</div>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="mt-8">
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {posts.map((post) => (
                <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="aspect-square relative group cursor-pointer overflow-hidden"
              >
                <img
                  src={post.BgImageUrl}
                  alt={`Post ${post._id}`}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 text-white flex space-x-4">
                    <div className="flex items-center">
                      <Heart className="h-6 w-6 mr-1" />
                      <span>{post.likeCount}</span>
                    </div>
                    {/* <div className="flex items-center">
                      <MessageCircle className="h-6 w-6 mr-1" />
                      <span>{post.comments}</span>
                    </div> */}
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    {/* Post Modal */}
    {selectedPost && (
      <>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setSelectedPost(null)}>
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>
            <div className="w-full overflow-hidden transition-all duration-500 hover:shadow-xl dark:shadow-primary/5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm border-opacity-50">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
                <img
                  src={selectedPost?.BgImageUrl}
                  alt="Spiritual content"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20 text-white/90 text-sm">
                  {formatDistanceToNow(new Date(Date.parse(new Date())), { addSuffix: true })}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"}
                      alt={"jagadish"}
                      width={40}
                      height={40}
                      quality={100}
                      className="w-[50px] h-[50px] rounded-full object-cover aspect-square"
                    />
                    <div>
                      <h3 className="font-semibold text-base dark:text-gray-200">
                        jagadish
                      </h3>
                    </div>
                  </div>
                  {1 != 1  ? (
                    <Button
                      variant={following ? "secondary" : "outline"}
                      size="sm"
                      className="transition-all duration-300"
                      onClick={() => setFollowing(!following)}
                    >
                      {following ? <UserCheck className="w-4 h-4 mr-1.5" /> : <UserPlus className="w-4 h-4 mr-1.5" />}
                      {following ? "Following" : "Follow"}
                    </Button>
                  ):(
                    <>
                    <Dropdown QuoteId={selectedPost?._id}/>
                    </>
                  )}
                </div>
                <p className="text-base leading-relaxed dark:text-gray-300 whitespace-pre-line font-serif">
                  {selectedPost?.quote ||selectedPost?.poem || selectedPost?.story || selectedPost?.couplet}
                </p>
                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700/50">
                  <div className="flex items-center gap-4 relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-1.5 transition-all duration-300 ${isLiked ? "text-orange-500" : "text-muted-foreground"}`}
                      onClick={() => handleLike(1)}
                    >
                      <GiLotus className={`w-6 h-6 transition-transform duration-300 ${isLiked ? "scale-110 text-pink-500" : "text-gray-400"}`} />
                      {selectedPost.likes}
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
          </div>
        </div>
      </>
    )}
    </div>
  );
}

export default Page