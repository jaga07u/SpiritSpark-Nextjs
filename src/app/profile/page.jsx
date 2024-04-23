"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Avatar from '../components/Avatar';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import ProfileCard from '../components/ProfileCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOm } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile';
import EmptyProfile from '../components/EmptyProfile';
import useApp, { AppContext } from '../contex/Contex';
import CardElement from '../components/CardElement';
function Page() {
    const [user,setUser]=useState(null);
    const [quotes,setQuotes]=useState(null);
    const [hidden,setHidden]=useState(false);
    const [Cardhidden,setCardHidden]=useState(false);
    const [CardDetails,setCardDetails]=useState(null);
    const router=useRouter();
    const back=()=>{
        router.push("/");
    }
   const getProfile=async()=>{
    const res=await axios.get("/api/users/post");
   // console.log(res.data.UserDetails[0]);
    setUser(res.data.UserDetails[0]);
    setQuotes(res.data.quote);
   }
   const handleEditProfile = () => {
    setHidden(true);
}
const handleshowCard=()=>{
  setCardHidden(true);
}
  // console.log(hidden);
   useEffect(()=>{
       getProfile();
   },[])

    return (
        <>
        <AppContext.Provider value={{CardDetails,setCardDetails}}>
        {hidden && <EditProfile User={user} hiidenble={setHidden}/> }
        {Cardhidden && <CardElement hiddenble={setCardHidden} User={user} />  }
       {quotes?.length ?<div>
      
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
            <h1>{user?.followerCount}</h1>
            <h1>Follower</h1>
           </div>
           <div className="w-[70px] h-[80px] text-center font-bold">
            <h1>{user?.followingCount}</h1>
            <h1>Following</h1>
           </div>
        </div>
        <div className="w-full h-[60px] bg-gray-100 flex justify-around items-center ">
        <button 
        onClick={handleEditProfile}
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-[100px] h-[40px] text-lg bg-blue-500">EditProfile</button>
        </div>
        <div className="w-full  flex gap-[3px] flex-wrap bg-white ">
          {
            quotes?.map((items,index)=>(
                <>
                <ProfileCard key={index} Data={items} showFun={handleshowCard}/>
                </>
            ))
          }
        </div>
        </div>:
        <>
       <EmptyProfile/>
        </>
}
</AppContext.Provider>

        </>
       
        
    )
}

export default Page
