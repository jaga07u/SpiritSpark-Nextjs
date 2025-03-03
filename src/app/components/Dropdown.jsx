import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from 'next/navigation';
function Dropdown({QuoteId}) {
  const router=useRouter();
  const UpdateQuote=()=>{
    console.log("hii",QuoteId);
    router.push(`post/${QuoteId}`);
  }
  //
  const DeletePost=()=>{
    console.log("hii",QuoteId);
    router.push(`http://localhost:4000//${QuoteId}`);
  }
    return (
        <>
        <div className="dropdown mx-[-25px] bg-transparent border-none outline-none shadow-none ">
  <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none outline-none shadow-none "><BsThreeDotsVertical style={{width:"30px",height:"30px"}}/></div>
  <ul tabIndex={0} className="dropdown-content z-[1]  menu p-2 shadow bg-base-100 rounded-box w-32 mx-[-80px]">
    <li onClick={()=>{UpdateQuote(QuoteId)}}><a>EditQuote</a></li>
    <li><a>DeleteQuote</a></li>
  </ul>
</div>
        </>
    )
}

export default Dropdown
