import React, { useState } from 'react'
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa6";
import { BsSave } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm } from '@fortawesome/free-solid-svg-icons';
import { MdCancel } from "react-icons/md";
import Avatar from './Avatar';
import useApp from '../contex/Contex';
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
function CardElement({hiddenble,User}) {
    const {CardDetails}=useApp();
   
    const [likeCount,setLikeCount]=useState(CardDetails?.likeCount|| 0);
    const [IsCurrentUserLiked,setIsCurrentUserLiked]=useState(CardDetails?.isLikedByCurrentUser || "");
    console.log(CardDetails);
    const handleEditProfile=()=>{
        hiddenble(false)
    }
    const handleLike = async (id) => {
        console.log(id);
        const res = await axios.post(`/api/users/like`, { quoteId: id });
        setIsCurrentUserLiked(!IsCurrentUserLiked);
        setLikeCount(prevCount => IsCurrentUserLiked ? prevCount - 1 : prevCount + 1);
        console.log(res.data);
      };
    return (
    //     <>
    //      <div
    //   style={{backgroundColor:`${"white"}`}}
    //   className="w-[88%] h-[410px]  rounded-md  backdrop-blur-lg flex justify-center items-center flex-col overflow-hidden">
    //     {/* <h1 className="relative left-[100px]  z-[60]" style={{fontSize:"12px"}}>{timeSinceCreation}</h1> */}
    //     <div className="w-full h-[60px] bg-transparent  bg-opacity-35 backdrop-blur-lg  flex justify-between items-center z-50">
    //       <div className="flex justify-center items-center gap-2">
    //         {Data.Owner?.avatar ? (
    //          <Avatar AvatarUrl={Data.Owner?.avatar} width={10} />
    //         ) : (
    //           <CgProfile
    //             style={{ width: "50px", height: "50px" }}
    //           />
    //         )
    //         }
    //         <div>
    //         <h1 className="">{Data?.Owner?.username}</h1>
    //       {Data.Owner?._id !== User?._id && <h1 style={{fontSize:"12px"}}>{timeSinceCreation}</h1> }
    //         </div>
    //       </div>
    //      { Data.Owner?._id === User?._id ?<><h1 style={{fontSize:"15px",marginLeft:"-10px"}}>{timeSinceCreation}</h1>
    //      </>:<>
    //      <div>
    //      <button
    //         className="w-[90px] h-[40px] bg-gray-300 bg-opacity-75 backdrop-filter backdrop-blur-lg shadow-lg rounded-md relative right-[10px]"
    //         onClick={() => handleFollow(Data.Owner?._id)}
    //       >
    //         {isFollowed ? "Followed" : "Follow"}
    //       </button>
         
    //       </div>
    //       </> }
    //     </div>
    //     <hr />
    //     <div
    //       style={{ backgroundColor: `${Data?.BgColor}`, color: `${Data.TextColor}`, position: "relative" }}
    //       className="h-[350px] w-full shadow-md text-center"
    //     >
    //       {Data.BgImageUrl && (
    //         <Image
    //           width={300}
    //           height={400}
    //           src={`${Data?.BgImageUrl}`}
    //           alt="AirMax Pro"
    //           className="z-0 h-full w-full object-cover my-[0px]"
    //         />
    //       )}

    //       <div className="absolute inset-0 bg-gradient-to-t"></div>
    //       <div className="absolute bottom-4 left-4 text-left">
    //         <div className="w-full h-[300px] mx-[-10px] flex flex-col justify-center items-center relative text-center">
    //           <p className="text-2xl  mx-6" style={{color:`${Data.TextColor}`}}>{Data?.quote}</p>
    //         </div>
    //         <div className="w-full h-[50px]  mx-[-10px] flex justify-between items-center top-3">
    //           <div className="w-[40%] h-full flex justify-between items-center mx-3">
    //             <div className="flex flex-col  justify-center items-center gap-">
    //               <FontAwesomeIcon icon={faOm} style={{ width: "30px", height: "30px", color:`${isLiked ? "red" : "white"}`,marginTop:"30px" }} onClick={() => handleLike(Data._id)} />
    //               <h1 className="text-white text-center">{likeCount}</h1>
    //             </div>
    //             <FaRegComment
    //               style={{ width: "30px", height: "30px", color: "white", marginBottom:"-10px" }}
    //             />
    //           </div>
    //           <BsSave
    //             style={{ width: "30px", height: "30px", color: "white", marginBottom:"-10px" }}
    //           />
    //         </div>
           
    //       </div>
    //     </div>
    //   </div>

    //     </>
    <>
    <div className="w-[100vw] h-[100vh] backdrop-blur-lg absolute z-50 flex justify-center items-center flex-col gap-8">
    <MdCancel
        onClick={handleEditProfile}
        style={{marginLeft:"280px",marginTop:"-40px",width: "30px", height: "30px" }} />
    <div
      style={{backgroundColor:`${"white"}`}}
      className="w-[88%] h-[410px]  rounded-md  backdrop-blur-lg flex justify-center items-center flex-col overflow-hidden">
        {/* <h1 className="relative left-[100px]  z-[60]" style={{fontSize:"12px"}}>{timeSinceCreation}</h1> */}
        <div className="w-full h-[60px] bg-transparent  bg-opacity-35 backdrop-blur-lg  flex justify-between items-center z-50">
          <div className="flex justify-center items-center gap-2">
            {User?.avatarImg  ? (
             <Avatar AvatarUrl={User?.avatarImg } width={10} />
            ) : (
              <CgProfile
                style={{ width: "50px", height: "50px" }}
              />
            )
            }
            
        <div>
            <h1 className="">{User?.username}</h1>
            </div>
           </div>
         <div>
         <div className="dropdown bg-white border-none shadow-none">
  <div tabIndex={0} role="button" className="btn m-1 bg-white"><BsThreeDotsVertical /></div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-[100px] mx-[-70px]">
    <li><a>EditPost</a></li>
    <li><a>DeletePost</a></li>
  </ul>
</div>
          </div>
        </div>
        <hr />
        <div
          style={{ backgroundColor: `${CardDetails?.BgColor}`, color: `white`, position: "relative" }}
          className="h-[350px] w-full shadow-md text-center"
        >
          { CardDetails?.BgImageUrl && <Image
              width={300}
              height={400}
              src={`${CardDetails?.BgImageUrl}`}
              alt="AirMax Pro"
              className="z-0 h-full w-full object-cover my-[0px]"
            /> }


          <div className="absolute inset-0 bg-gradient-to-t"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <div className="w-full h-[300px] mx-[-10px] flex flex-col justify-center items-center relative text-center">
              <p className="text-2xl  mx-6" style={{color:`${CardDetails?.TextColor}`}}>{CardDetails?.quote}</p>
            </div>
            <div className="w-full h-[50px]  mx-[-10px] flex justify-between items-center top-3">
              <div className="w-[40%] h-full flex justify-between items-center mx-3">
                <div className="flex flex-col  justify-center items-center gap-">
                  <FontAwesomeIcon
                   onClick={()=>{handleLike(CardDetails?._id)}}
                  icon={faOm} style={{ width: "30px", height: "30px", color:`${IsCurrentUserLiked? "red" :"white"}`,marginTop:"30px" }}  />
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
    </div>
    </>
    )
}

export default CardElement
