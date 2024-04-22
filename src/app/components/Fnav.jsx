import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdOutlineMenu } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import useApp from '../contex/Contex';
import { useRouter } from 'next/navigation';
import Avatar from './Avatar';
import axios from 'axios';
function Fnav({UserDetails}) {
  console.log();
  const {sideVal,setSideVal} =useApp();
  const router=useRouter();
  const sideChange=()=>{
     router.push("/profile");
  }
  const postChange=()=>{
    router.push("/post");
  }
  const menChange=()=>{
    router.push("/menu");
  }
  const logout=async()=>{
    const res= await axios.delete("/api/users/login");
    console.log(res.data);
    router.push("/login");
  }
    return (
        <>
        <div
        style={{transition:2}}
          className="fixed bottom-0  h-[50px] left-0 w-full transition-all flex justify-around items-center bg-white bg-opacity-75"
        >
            <div className="w-[55px] h-[50px] rounded-full  flex justify-center items-center gap-2 ">
               {UserDetails?.avatarImg?<>
               <div className=" flex w-full h-full justify-center items-center relative left-[-20px]">
               <Avatar AvatarUrl={UserDetails?.avatarImg} width={10}  changefun={sideChange} />
               </div>
               </>:
               <>
                <CgProfile style={{ width: "35px", height: "35px",marginLeft:"-73px" }} onClick={sideChange} />
               </>}
                
            </div>
          <div>
          <FaCirclePlus style={{ width: "35px", height: "35px",marginLeft:"-19px" }} onClick={postChange} />
            </div>
          <div className="w-[50px] h-[50px] mx-[-10px]">
            <div className="dropdown dropdown-top dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1"> <MdOutlineMenu  style={{ width: "35px", height: "35px",marginLeft:"20px"}}/></div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li onClick={logout}><a>Logout</a></li>
    <li><a>SavedQuote</a></li>
  </ul>
</div>
          </div>
        </div>
        </>
    )
}

export default Fnav
