import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookie from "js-cookie"
function Dropdown({Id}) {
  const router=useRouter();
  const token = Cookie.get('accessToken');
  const UpdateQuote=()=>{
    console.log("hii",Id);
    router.push(`post/${Id}`);
  }
  //
  const DeletePost=async()=>{
    console.log("hii",Id);
   // router.push(`https://spirit-spark-backendv2.onrender.com//api/v1/post/${Id}`);
    try{
     const res = await axios.delete(
                    `https://spirit-spark-backendv2.onrender.com/api/v1/post/delete/${Id}`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
    toast.success("Post Deleted Sucessfully");
    window.location.reload();
              }
     catch(e){
         console.log(e);
         toast.error("Something went wrong .. please try agian ")
         
     }
  }
    return (
        <>
        <div className="dropdown mx-[-25px] border-none outline-none shadow-none text-white ">
  <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none outline-none shadow-none "><BsThreeDotsVertical style={{width:"30px",height:"30px"}}/></div>
  <ul tabIndex={0} className="dropdown-content z-[1]  menu p-2 shadow bg-base-100 rounded-box min-w-32 mx-[-80px]">
    <li className="flex justify-between items-center" onClick={()=>{UpdateQuote(QuoteId)}}><a>EditQuote <spam className="text-sm text-success-300">coming</spam></a></li>
    <li
    onClick={DeletePost}
    ><a>DeleteQuote</a></li>
  </ul>
</div>
        </>
    )
}

export default Dropdown
