"use client"
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { set, useForm } from 'react-hook-form';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TbPhotoPlus } from 'react-icons/tb';

import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import PostOpt from '../components/PostOpt';
import {toast} from "react-hot-toast"

function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState("");
  const [imagefile,setImagefile]=useState(null);
  const [color,setColor]=useState("");
  const [TextCol,setTextCol]=useState("black");
  const [Hidden,setHidden]=useState("hidden");
  const [user,setUser]=useState(null);
  const [error,setError]=useState(false);
  const router = useRouter();
  const ChangeHiddent=()=>{
    setHidden("block");
  }
  const Back = () => {
    router.push('/');
  };
  const getUser=async()=>{
    const res=await axios.get("api/users/login");
    // console.log(res.data.data);
    setUser(res.data.data);
  }
   useEffect(()=>{
    getUser();
   },[]);

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      setImagefile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
      console.log(imageUrl);
      console.log(imagefile);
    }
  };
  const QuoteSubmit = async (data) => {
    const { quote, catagory } = data;
    // Create a new FormData object
    const formData = new FormData();
    // Append form fields to FormData
    formData.append('quote', quote);
    formData.append('catagory', catagory);
    // Append file data to FormData
    formData.append('file',imagefile);
    // if (imagefile) {
    //   for (let i = 0; i < imagefile.length; i++) {
    //     formData.append('file', imagefile[i]);
    //   }
    // }
    if(!color.length>0){
       setError(true);
       return;
    }
    formData.append('bgColor', color);
    formData.append('TextCol', TextCol);
  
    try {
      console.log(formData);
      const res = await axios.post("/api/users/post", formData);
      const response = res.data;
      console.log(response);
      toast.success("Your post Uploaded Successfully")
      router.push("/");

    } catch (error) {
      console.log("Something went Wrong",error);
    }
  };
  const BgRemove=()=>{
    setImage("");
  }
  return (
    <div className="w-screen h-[100vh] text-white overflow-x-hidden" style={{backgroundImage:'url("https://geniebook.com/cms/storage/app/media/pri.-science-blog/adobestock-301377172.webp")',backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}}>
      <div className="w-full h-[60px] flex justify-between items-center">
      <button onClick={Back}><IoMdArrowRoundBack style={{ width: "50px", height: "50px", marginTop: "0px",color:"whitesmoke" }} /></button>
      <button type="button" onClick={handleSubmit(QuoteSubmit)} className="w-[90px] h-[40px] relative right-3  shadow-2xl border-2 border-white backdrop-blur-lg rounded-lg bg-opacity-55  text-xl font-bold">Post</button>
      </div>
      <hr />
      <div className="w-full h-[50px] flex justify-center my-4 items-center  text-white text-center text-xl font-bold underline ">
           <h1>🌸जीवन सिर्फ जियो मत दुसरो को भी जीना सिखाओ🌺</h1>
        </div>
        
      <form>
        {/* <div className="w-full h-150 flex justify-center items-center gap-2">
          <input
            type="file"
            onChange={handleImageChange}
            // {...register("quoteImage")}
            className="opacity-0 left-[-80px]"
          />
          <div>
            <TbPhotoPlus style={{ width: "80px", height: "80px", marginLeft: "-200px",color:"white" }} />
            <h1 className="mx-[-200px]">Click for Bg  Image</h1>
          </div>
          <h1 className="">Or</h1>
          <div>
            <input
              type="color"
              onChange={(e)=>setColor(e.target.value)}
              className="mx-3"
            />
            <h1 className="mx-3">Click to <br /> Choose Bg Color</h1>
          </div>
        </div> */}
        {/* <div className="w-full h-[50px] flex justify-center items-center  text-white text-center text-xl font-bold underline ">
           <h1>🌸जीवन सिर्फ जियो मत दुसरो को भी जीना सिखाओ🌺</h1>
        </div> */}
        {/* <div className="w-[200px] h-[70px]  flex justify-center items-center">
          <h1>Catagroy:</h1>
          <select name="catagory" id="" className="w-[100px] h-[30px] bg-transparent backdrop-blur-lg rounded-lg bg-opacity-55 border border-3">
         <option value="Spiritual">Spiritual</option>
         <option value="Spiritual">Business</option>
         <option value="Spiritual">Life</option>
         <option value="Spiritual">Motivational</option>

          </select>
        </div> */}
        <div className="w-[100%] h-[80%]">
          <div className=" my-3 w-full h-[60px]   backdrop-blur  flex justify-between items-center p-2">
            <div className="flex justify-center items-center">
        <CgProfile className="z-50" style={{ width: "50px", height: "50px",marginLeft:"0px" }}/>
        <h1>{user?.username}</h1>
        </div>
        <BsThreeDotsVertical style={{width:"30px",height:"30px"}} onClick={ChangeHiddent} />
        {/* <div className={`${Hidden}`} >
        <PostOpt BgChange={BgRemove} />
        </div> */}
        {/*  */}
        </div>
        <textarea
        placeholder="Enter your quote"
          className={`w-[92%] h-[400px] mx-4 my-1 text-3xl text-center bg-white bg-opacity-35 backdrop-blur-sm  outline-none  p-4 resize-none shadow-xl border-none rounded-md`}
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundColor:`${color}`,
            color:`${TextCol}`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word"
          }}
          {...register("quote", { required: true, maxLength: 150, minLength: 20 })}
        />
        {errors.quote && <span className="text-red-700 text-xl mx-4  relative top-[-40px]">MaxLength 150 and Min Length 20</span>}
        </div>
        <div className="w-full h-[50vh] bg-transparent">
           <div className="w-full h-[50px] border-b-black flex justify-around items-center flex-col bg-transparent">
            <div className="flex my-[-20px]">
           <h1>Catagory:</h1>
          <select
          {...register("catagory",{required:true})}
          name="catagory" id="" className="w-[150px] h-[30px] bg-transparent backdrop-blur-lg rounded-lg bg-opacity-55 border border-3">
            <option value="" className="bg-transparent text-black" >Select Category</option>
         <option value="Spiritual" className="bg-transparent text-black"  >Spiritual</option>
         <option value="Spiritual"  className="bg-transparent text-black" >Business</option>
         <option value="Spiritual"  className="bg-transparent text-black" >Life</option>
         <option value="Spiritual"  className="bg-transparent text-black" >Motivational</option>
          </select>
          </div>
          {errors.catagory &&  <span className="text-red-700 text-xl relative left-8 ">Catagory required</span> }
           </div>
       {/* */}
        
       {/*  */}
           <hr className="w-[85%] mx-8" />
           <div className="w-full h-[50px] border-b-black flex justify-between items-center">
          <input
            type="file"
            onChange={handleImageChange}
            // {...register("quoteImage")}
            className="opacity-0 z-50 "
          />
          <div className=" w-full flex justify-center items-center">
            <TbPhotoPlus style={{ width: "50px", height: "50px", marginLeft: "0px",color:"white",position:"relative",left:"-90px" }} />
            <h1 className="relative left-[-90px]">Click for Bg  Image</h1>
            </div>
           </div>
           <hr className="w-[85%] mx-8"/>
           <div className="w-full h-[50px] border-b-black flex justify-center items-center ">
           <input
              type="color"
              
              onChange={(e)=>setColor(e.target.value)}
              className="mx-3 "
            />
            <h1 className="mx-1"> Click for Bg Color</h1>
           </div>
           {error && <h1 className="text-red-500 mx-10">Bg Color is required</h1>}
           <hr  className="w-[85%] mx-8"/>
           <div className="w-full h-[50px] border-b-black flex justify-center items-center gap-3">
            <h1></h1>
           <input
              type="color"
              onChange={(e)=>{setTextCol(e.target.value); setError(false) }}
              className=" relative"
            />
            <h1 className="text-white">Click for text color</h1>
           </div>
           <hr className="w-[85%] mx-8" />
        </div>
        {/* <div className="flex justify-between items-center ">
          <div className="flex">
        <input
              type="color"
              onChange={(e)=>setTextCol(e.target.value)}
              className="mx-3 relative top-[-30px]"
            />
            <h1 className=" relative top-[-30px] text-white">Click for text color</h1>
            </div>
            <div className="w-[90px] h-[30px]  relative top-[-30px] left-[-10px] flex justify-center items-center flex-col">
              <div >
            <MdDelete style={{width:"30px",height:"30px",color:"orange"}} onClick={BgRemove} />
            </div>
            <h1>Delete Bg</h1>
            </div>
            </div> */}
        {/*  */}
      </form>
    </div>
  );
}

export default Page;
