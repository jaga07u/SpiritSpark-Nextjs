import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa6";
import { BsSave } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Dropdown from './Dropdown';
import Avatar from './Avatar';
import useApp from '../contex/Contex';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/navigation';
function Cards({ Data,User }) {
  const [isFollowed, setIsFollowed] = useState(Data?.isFollowed || false);
  const [isLiked, setIsLiked] = useState(Data?.isLiked || false);
  const [likeCount, setLikeCount] = useState(Data?.likeCount || 0);
  const [timeSinceCreation, setTimeSinceCreation] = useState('');
  const {setUserCard}=useApp();
  const router=useRouter();
  useEffect(() => {
    const createdAtDate = new Date(Data.createdAt);
    const currentDate = new Date();
    const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);
    if (timeDifferenceInSeconds < 60) {
      setTimeSinceCreation(`${timeDifferenceInSeconds} seconds ago`);
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      setTimeSinceCreation(`${minutes} minutes ago`);
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      setTimeSinceCreation(`${hours} hours ago`);
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      setTimeSinceCreation(`${days} days ago`);
    }
  }, [Data.createdAt]);
  // console.log(Data.Owner?._id === User._id);
  // console.log(Data.Owner?._id === User.id );
  // console.log(Data.Owner?._id);
  // console.log(User.id);
  const handleFollow = async (id) => {
   // console.log(id);
    const res = await axios.post(`api/users/follow/${id}`);
    setIsFollowed(!isFollowed);
    console.log(res.data);
  };
  const hanldeUserProfile=async(id)=>{
      router.push(`/profile/${id}`);
  }

  const handleLike = async (id) => {
    console.log(id);
    const res = await axios.post(`api/users/like`, { quoteId: id });
    setIsLiked(!isLiked);
    setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
    console.log(res.data);
    console.log("like");
  };

  return (
    <>
      <div
        

      style={{backgroundColor:`${"white"}`}}
      className="w-[88%] h-[410px]  rounded-md  backdrop-blur-lg flex justify-center items-center flex-col overflow-hidden">
        {/* <h1 className="relative left-[100px]  z-[60]" style={{fontSize:"12px"}}>{timeSinceCreation}</h1> */}
        <div className="w-full h-[60px] bg-transparent  bg-opacity-35 backdrop-blur-lg  flex justify-between items-center z-50">
          <div className="flex justify-center items-center gap-2">
            {Data.Owner?.avatar ? (
             <div 
       
             onClick={()=>{hanldeUserProfile(Data.Owner?._id)}}
             className="avatar" >
        <div className={`w-10 rounded-full`}>
        <Image 
          width={60}
          height={60}
          src={`${Data.Owner?.avatar}`}
          alt="AirMax Pro"
          />
        </div>
      </div>
            ) : (
              <CgProfile
              onClick={()=>{hanldeUserProfile(Data.Owner?._id)}}
                style={{ width: "50px", height: "50px" }}
              />
            )
            }
            <div>
            <h1 className="">{Data?.Owner?.username}</h1>
          {Data.Owner?._id !== User?._id && <h1 style={{fontSize:"12px"}}>{timeSinceCreation}</h1> }
            </div>
          </div>
         { Data.Owner?._id === User?._id ?<><h1 style={{fontSize:"15px",marginLeft:"-10px"}}>{timeSinceCreation}</h1>
         </>:<>
         <div>
         <button
            className="w-[90px] h-[40px] bg-gray-300 bg-opacity-75 backdrop-filter backdrop-blur-lg shadow-lg rounded-md relative right-[10px]"
            onClick={() => handleFollow(Data.Owner?._id)}
          >
            {isFollowed ? "Followed" : "Follow"}
          </button>
         
          </div>
          </> }
        </div>
        <hr />
        <div
          style={{ backgroundColor: `${Data?.BgColor}`, color: `${Data.TextColor}`, position: "relative" }}
          className="h-[350px] w-full shadow-md text-center"
        >
          {Data.BgImageUrl && (
            <Image
              width={300}
              height={400}
              src={`${Data?.BgImageUrl}`}
              alt="image not found"
              className="z-0 h-full w-full object-cover my-[0px]"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <div className="w-full h-[300px] mx-[-10px] flex flex-col justify-center items-center relative text-center">
              <p className="text-2xl  mx-6" style={{color:`${Data.TextColor}`}}>{Data?.quote}</p>
            </div>
            <div className="w-full h-[50px]  mx-[-10px] flex justify-between items-center top-3">
              <div className="w-[40%] h-full flex justify-between items-center mx-3">
                <div className="flex flex-col  justify-center items-center gap-">
                  <FontAwesomeIcon icon={faOm} style={{ width: "30px", height: "30px", color:`${isLiked ? "red" : "white"}`,marginTop:"30px" }} onClick={() => handleLike(Data._id)} />
                  <h1 className="text-white text-center">{likeCount}</h1>
                </div>
                <FaRegComment
                  style={{ width: "30px", height: "30px", color: "white", marginBottom:"-10px" }}
                />
              </div>
              <BsSave
                style={{ width: "30px", height: "30px", color: "white", marginBottom:"-10px" }}
              />
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
