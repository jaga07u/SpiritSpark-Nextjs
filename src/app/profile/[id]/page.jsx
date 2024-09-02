/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Avatar from '../../components/Avatar';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import ProfileCard from '../../components/ProfileCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOm } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../../components/EditProfile';
import useApp, { AppContext } from '../../contex/Contex';
import CardElement from '../../components/CardElement';
import { BsThreeDotsVertical } from "react-icons/bs";
import useStore from "../../zustandStore/store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
function Page({params}) {
  //  const [user,setUser]=useState(null);
    const [post,setPost]=useState("couplet");
    const [posts,setPosts]=useState(null);
    const [curruser,setCurrUser]=useState(null);
    const [hidden,setHidden]=useState(false);
    const [Cardhidden,setCardHidden]=useState(false);
    const [CardDetails,setCardDetails]=useState(null);
      const [isFollowed, setIsFollowed] = useState(false);
      const [followerCount,setFollowercount]=useState(0);
      const [followingCount,setFollowingcount]=useState(0);
    const router=useRouter();
    const theme=useStore((state)=>state.theme);
    const userString = localStorage.getItem("user");
  let user;
  
  if (userString) {
    try {
      user = JSON.parse(userString); // Parse the JSON string to an object
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
  }
    const back=()=>{
        router.push("/");
    }
    const cards=[1,2,3,4,5,6,7,8,9];
   const getProfile=async()=>{
    const res=await axios.get(`https://spiritspark-backend-3.onrender.com/api/v1/users/profile/post/${params.id}`,{withCredentials:true});
  console.log(res.data);
      setCurrUser(res.data.data.UserDetails);
      setIsFollowed(res.data.data.UserDetails.isFollowed)
      setFollowercount(res.data.data.UserDetails.followerCount)
   //   setFollowingcount(res.data.data.UserDetails.followingCount)
    setPosts(res.data.data.posts);
   }
 // console.log(posts);
   console.log(curruser);
   console.log(isFollowed);
   
   const handleFollow = async () => {
    try {
      setIsFollowed((prev) => !prev);
      setFollowercount((prev)=>prev+1);
      const res = await axios.post(`https://spiritspark-backend-3.onrender.com/api/v1/follow/${curruser?._id}`,{data:"jaga"},{withCredentials:true});
    
      console.log(res.data);
    } catch (error) {
      console.error("Error following/unfollowing the user:", error);
    }
  };
//    const handleEditProfile = () => {
//     setHidden(true);
// }
// const handleshowCard=()=>{
//   setCardHidden(true);
// }
//   // console.log(hidden);
   useEffect(()=>{
       getProfile();
   },[])

    return (
        <>
        <AppContext.Provider
        // value={{CardDetails,setCardDetails}}
         >
        {/* {hidden && <EditProfile
       //  User={user} hiidenble={setHidden}
         /> } */}
        {/* {Cardhidden && <CardElement hiddenble={setCardHidden} User={user} />  } */}
       {/* {quotes?.length ? */}
       <div  style={{backgroundColor:`${theme == "dark"?"#09143C":""}`}}
        className={`w-full min-h-[100vh] ${theme=="dark"?"dark text-foreground ":""}`}>
        <div 
        //  style={{backgroundColor:`${theme == "dark"?"#09143C":""}`}}
        className="w-full h-[50px] flex justify-between items-center">
        <button onClick={back}><IoMdArrowRoundBack style={{ width: "30px", height: "30px" }} /></button>
        {/* <div className="w-[10%] h-full flex justify-center items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button 
            color="default"
            variant="light"
            className="capitalize"
          >
            <BsThreeDotsVertical className="text-3xl"/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Dropdown Variants"
          color="default"
          variant="light"
        >
          <DropdownItem 
            className={`${posts === "couplet" ? "text-success" : ""}`}
            onClick={() => setPosts("couplet")}
            key="new"
          >
            couplet
          </DropdownItem>
          <DropdownItem
            className={`${posts === "quote" ? "text-success" : ""}`}
            onClick={() => setPosts("quote")}
            key="copy"
          >
            quote
          </DropdownItem>
          <DropdownItem
            className={`${posts === "poem" ? "text-success" : ""}`}
            onClick={() => setPosts("poem")}
            key="edit"
          >
            poem
          </DropdownItem>
          <DropdownItem 
            className={`${posts === "story" ? "text-success" : ""}`}
            onClick={() => setPosts("story")}
            key="delete"
          >
            story
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div> */}
        </div>
        <div className={`w-full h-[80px] flex justify-center items-center gap-2`}>
           <div className="w-[80px] h-full">
            {
         curruser?.avatarImg ?
         <>
        <Avatar AvatarUrl={curruser?.avatarImg} width={22} />
         </>:
         <>
         <CgProfile className="z-50" style={{ width: "50px", height: "50px" }}/>
         </>
            }
          <h1 className="text-center  inline-block font-bold" style={{marginLeft:"0px",fontSize:"14px"}}> 
            
            {curruser?.username} 
            </h1>
           </div>
           <div className="w-[70px] h-[80px] text-center font-bold">
            <h1>
              {posts?.length}
              </h1>
            <h1>Posts</h1>
           </div>
           <div className="w-[70px] h-[80px] text-center font-bold">
            <h1>
              {followerCount}
              </h1>
            <h1>Follower</h1>
           </div>
           <div className="w-[70px] h-[80px] text-center font-bold">
            <h1>
              {curruser?.followingCount}
              </h1>
            <h1>Following</h1>
           </div>
        </div>
        <div className="w-full h-[60px]  flex justify-around items-center ">
        { user?._id === curruser?._id ? ( <button 
       // onClick={handleEditProfile}
        className="btn btn-xs  w-[100px] h-[40px] text-lg bg-blue-500">EditProfile</button>
      ):(
        <>
        <button 
        onClick={handleFollow}
        className="btn btn-xs  w-[100px] h-[40px] text-lg bg-blue-500">
          {isFollowed ?"Following":"Follow"
          }</button>
        </>
      )
      }
        </div>
        <div className="w-full min-h-full gap-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 justify-items-center items-center my-1 ">
          {
            posts?.map((items,index)=>(
                <>
                <ProfileCard
                key={items._id} 
                Data={items} 
                User={curruser}
                // showFun={handleshowCard}
                />
                </>
            ))
          }
        </div>
        </div>
        {/* :
        <>
       <EmptyProfile/>
        </> */}
</AppContext.Provider>

        </>
       
        
    )
}

export default Page
