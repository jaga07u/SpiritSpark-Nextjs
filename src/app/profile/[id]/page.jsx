/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOm } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '@/app/components/EditProfile'
import EmptyProfile from '@/app/components/EmptyProfile'
import useApp,{AppContext} from '@/app/contex/Contex'
import CardElement from '@/app/components/CardElement'
import Image from 'next/image';
import Avatar from '@/app/components/Avatar'
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import ProfileCard from '@/app/components/ProfileCard';
import { useRouter } from 'next/navigation'

function Page({params}) {
    const [user,setUser]=useState(null);
    const [quotes,setQuotes]=useState(null);
    const [CardDetails,setCardDetails]=useState(null);
    const [hidden,setHidden]=useState(false);
    const [Cardhidden,setCardHidden]=useState(false);
    const [isFollowed, setIsFollowed] = useState("");
    const [FollowerCount,setFollowerCount]=useState(0);
    const [CurrentUser,setCurrentUser]=useState(null);
   // console.log(params);
   const handleEditProfile = () => {
    setHidden(true);
}
    const getProfile=async()=>{
        const res=await axios.get(`http://localhost:3000/api/users/${params.id}`);
       // console.log(res.data.UserDetails[0]);
        setUser(res.data.user[0]);
        //console.log(res.data.user);
        setIsFollowed(res.data.user[0].isFollwed);
        setFollowerCount(res.data.user[0].followerCount)
        setQuotes(res.data.quote);
      //  console.log("Quote Owner",res.data.quote[0].Owner);
       }
       const getUser = async () => {
        try {
          const res = await axios.get("/api/users/login");
          setCurrentUser(res.data.data);
         // console.log("CUrrent user",res.data.data._id);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      // console.log(hidden);
       useEffect(()=>{
           getProfile();
           getUser();
       },[])
       const router=useRouter();
       const back=()=>{
           router.push("/");
       }
       const handleFollow =async () => {
    const res = await axios.post(`/api/users/follow/${params.id}`);
    setIsFollowed(!isFollowed);
    setFollowerCount(prevCount => isFollowed ? prevCount - 1 : prevCount + 1);
   // console.log(res.data);
    }
    const handleshowCard=()=>{
      setCardHidden(true);
    }
    return (
        <>
        { quotes?.length>0?  <AppContext.Provider value={{CardDetails,setCardDetails}}>
         {hidden && <EditProfile User={user} hiidenble={setHidden}/> }
        {Cardhidden && <CardElement hiddenble={setCardHidden} User={user} />  } 
     <div>
      
        <div className="w-full h-[50px] bg-gray-100 flex justify-between items-center gap-8">
        <button onClick={back}><IoMdArrowRoundBack style={{ width: "30px", height: "30px" }} /></button>
        <div className="relative left-[-120px] font-bold">{user?.username}</div>
        </div>
        <div className="w-full h-[80px]  bg-gray-100 flex justify-center items-center gap-2">
           <div className="w-[80px] h-full">
            {
         user?.avatarImg ?
         <>
        <Avatar AvatarUrl={user?.avatarImg} width={22} />
         </>:
         <>
         <CgProfile className="z-50" style={{ width: "50px", height: "50px" }}/>
         </>
            }
          <h1 className="text-center inline-block font-bold" style={{marginLeft:"-12px",fontSize:"14px"}}> {user?.fullname} </h1>
           </div>
           <div className="w-[70px] h-[80px] text-center font-bold">
            <h1>{quotes?.length}</h1>
            <h1>Quotes</h1>
           </div>
           <div className="w-[70px] h-[80px] text-center font-bold">
            <h1>{FollowerCount}</h1>
            <h1>Follower</h1>
           </div>
           <div className="w-[70px] h-[80px] text-center font-bold">
            <h1>{user?.followingCount}</h1>
            <h1>Following</h1>
           </div>
        </div>
        <div className="w-full h-[60px] bg-gray-100 flex justify-around items-center ">
       {CurrentUser?._id === quotes[0].Owner?
       <>
       <button 
        onClick={handleEditProfile}
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-[100px] h-[40px] text-lg bg-blue-500">EditProfile</button>
       </>
       :
       <>
       <button 
        onClick={handleFollow}className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-[100px] h-[40px] text-lg bg-blue-500">{isFollowed?"Followed":"Follow"}</button>
        </>
}
        </div>
        <div className="w-full  flex gap-[3px] flex-wrap">
          {
            quotes?.map((items,index)=>(
                <>
                <ProfileCard key={index} Data={items} showFun={handleshowCard}/>
                </>
            ))
          }
        </div>
        </div>
        </AppContext.Provider> :
        <>
        <EmptyProfile/>
        </>
}
        </>
    
    )
}

export default Page
