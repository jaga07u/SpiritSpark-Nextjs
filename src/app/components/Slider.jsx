import React from 'react'
import './slider.css'

function Slider() {
    return (
        <>
        <div className="flex justify-center items-center overflow-x-scroll relative top-[0px]  bg-white" id="scorllbar">
  <div className="flex justify-center gap-2 h-full" style={{ minWidth: "100%" }}>
  {/* <h1 className=" bg-black bg-opacity-5 backdrop-blur-md text-black rounded-md text-center flex justify-center items-center px-1 whitespace-normal mx-5" style={{ lineHeight: "30px", borderRadius: "20px" }}>Mot</h1> */}
  <h1 className=" bg-black bg-opacity-10  backdrop-blur-md text-black rounded-sm text-center flex justify-center items-center px-1 whitespace-normal " style={{ lineHeight: "33px", borderRadius: "10px" }} id="id1">Spiritual</h1>
    <h1 className=" bg-black bg-opacity-10 backdrop-blur-md text-black rounded-sm text-center flex justify-center items-center px-1 whitespace-normal" style={{ lineHeight: "33px", borderRadius: "10px" }} id="id2">business</h1>
    <h1 className=" bg-black   bg-opacity-10 backdrop-blur-md text-black rounded-sm text-center flex justify-center items-center px-1 whitespace-normal" style={{ lineHeight: "33px", borderRadius: "10px" }}id="id3">life</h1>
    <h1 className=" bg-black  bg-opacity-10 backdrop-blur-md  text-black rounded-sm text-center flex justify-center items-center px-1 whitespace-normal" style={{ lineHeight: "33px", borderRadius: "10px" }}id="id4">gita</h1>
        <h1 className=" bg-black  bg-opacity-10  backdrop-blur-md text-black rounded-sm text-center flex justify-center items-center px-1 whitespace-normal" style={{ lineHeight: "33px", borderRadius: "10px" }}>Motivational</h1>
  </div>
</div>
        </>
    )
}

export default Slider
