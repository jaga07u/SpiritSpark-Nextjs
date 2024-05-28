import React from 'react'
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa6";
import { BsSave } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Dropdown from './Dropdown';
import useApp from '../contex/Contex';
function ProfileCard({Data,showFun}) {
    console.log(Data);
    const {setCardDetails}=useApp();
    return (
        <>
        <div
        onClick={()=>{showFun();setCardDetails(Data)}}
          style={{ backgroundColor:`${Data?.BgColor}`, color: `${Data?.TextColor}`,backgroundImage:`url(${Data?.BgImageUrl})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
          className="h-[128px] w-[128px] shadow-md text-center flex justify-center items-center"
        >
         <h1  style={{fontSize:"10px"}}>{Data?.quote}</h1>
            {/* <div className="w-full h-[50px]  mx-[-10px] flex justify-between items-center top-3">
              <div className="w-[40%] h-full flex justify-between items-center mx-3">
                <div className="flex flex-col  justify-center items-center gap-">
                  <FontAwesomeIcon icon={faOm} style={{ width: "30px", height: "30px", color:``,marginTop:"30px" }} onClick={() => handleLike(Data._id)} />
                  <h1 className="text-white text-center">{}</h1>
                </div>
                <FaRegComment
                  style={{ width: "30px", height: "30px", color: "white", marginBottom:"-10px" }}
                />
              </div>
              <BsSave
                style={{ width: "30px", height: "30px", color: "white", marginBottom:"-10px" }}
              />
            </div> */}
          </div>
        </>
    )
}

export default ProfileCard
