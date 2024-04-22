import React from 'react'
import { MdDelete } from "react-icons/md";
function PostOpt({BgChange}) {
    return (
        <>
        <div className="w-[100px] h-[60px] flex justify-center items-center bg-white opacity-25 left-[-50px] absolute z-50 ">
        <MdDelete className="z-50" style={{width:"30px",height:"30px",color:"orange",zIndex:"50px"}} onClick={BgChange} />
        </div>
        </>
    )
}

export default PostOpt
