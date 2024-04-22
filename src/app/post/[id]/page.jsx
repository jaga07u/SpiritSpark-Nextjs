"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { TbPhotoPlus } from 'react-icons/tb';

function Page({ params }) {
  const [quote, setQuote] = useState(null);
  const [user, setUser] = useState(null);
  const [quoteText, setQuoteText] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("black");
  const [catagory,setCatagory]=useState("");
  const router = useRouter();
  const Back = () => {
    router.push('/');
  };
  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await axios.patch(`http://localhost:3000/api/users/post`,{id:params.id});
        console.log(res.data);
        setQuote(res.data.quote);
        setQuoteText(res.data.quote.quote);
        setImage(res.data.quote.BgImageUrl);
        setColor(res.data.quote.BgColor);
        setTextColor(res.data.quote.TextColor);
        setCatagory(res.data.quote.catagory);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/login");
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getQuote();
    getUser();
  }, [params.id]);
 console.log(quoteText);
  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('quote', quoteText);
      formData.append('category', catagory);
      if (imageFile) {
        formData.append('file', imageFile);
      }
      formData.append('bgColor', color);
      formData.append('textCol', textColor);

      const res = await axios.patch(`http://localhost:3000/api/quotes/${params.id}`, formData);
      console.log(res.data);
      toast.success("Quote updated successfully");
      router.push("/");
    } catch (error) {
      console.error("Error updating quote:", error);
      toast.error("Failed to update quote");
    }
  };
  const RemoveBgImg=()=>{
    setImage(" ");
  }

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="w-screen h-[100vh] text-white overflow-x-hidden" style={{backgroundImage:'url("https://geniebook.com/cms/storage/app/media/pri.-science-blog/adobestock-301377172.webp")',backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}}>
    <div className="w-full h-[60px] flex justify-between items-center">
    <button onClick={Back}><IoMdArrowRoundBack style={{ width: "50px", height: "50px", marginTop: "0px",color:"whitesmoke" }} /></button>
    <button type="button" onClick={handleSubmit} className="w-[90px] h-[40px] relative right-3  shadow-2xl border-2 border-white backdrop-blur-lg rounded-lg bg-opacity-55  text-xl font-bold">Post</button>
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
      <div className="dropdown dropdown-top">
  <div tabIndex={0} role="button" className="btn m-1">Click</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li className="text-black" onClick={RemoveBgImg}><a>RemoveBgImg</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
      {/* <div className={`${Hidden}`} >
      <PostOpt BgChange={BgRemove} />
      </div> */}
      {/*  */}
      </div>
      <textarea
      value={quoteText}
      placeholder="Enter your quote"
        className={`w-[92%] h-[400px] mx-4 my-1 text-3xl text-center bg-white bg-opacity-35 backdrop-blur-sm  outline-none  p-4 resize-none shadow-xl border-none rounded-md`}
        style={{
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundColor:`${color}`,
          color:`${textColor}`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word"
        }}
        onChange={(e) => setQuoteText(e.target.value)}
       />
      {/* {errors.quote && <span className="text-red-700 text-xl mx-4  relative top-[-40px]">MaxLength 150 and Min Length 20</span>} */}
      </div>
      <div className="w-full h-[50vh] bg-transparent">
         <div className="w-full h-[50px] border-b-black flex justify-around items-center flex-col bg-transparent">
          <div className="flex my-[-20px]">
         <h1>Catagory:</h1>
        <select
        defaultValue={catagory}
        onChange={(e)=>{setCatagory(e.target.value)}}
        name="catagory" id="" className="w-[150px] h-[30px] bg-transparent backdrop-blur-lg rounded-lg bg-opacity-55 border border-3">
          <option value="" className="bg-transparent text-black" >Select Category</option>
       <option value="Spiritual" className="bg-transparent text-black"  >Spiritual</option>
       <option value="Spiritual"  className="bg-transparent text-black" >Business</option>
       <option value="Spiritual"  className="bg-transparent text-black" >Life</option>
       <option value="Spiritual"  className="bg-transparent text-black" >Motivational</option>
        </select>
        </div>
        {/* {errors.catagory &&  <span className="text-red-700 text-xl relative left-8 ">Catagory required</span> } */}
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
         <hr  className="w-[85%] mx-8"/>
         <div className="w-full h-[50px] border-b-black flex justify-center items-center gap-3">
          <h1></h1>
         <input
            type="color"
            onChange={(e)=>setTextColor(e.target.value)}
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
