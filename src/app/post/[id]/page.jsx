// "use client"
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { IoMdArrowRoundBack } from 'react-icons/io';
// import { CgProfile } from "react-icons/cg";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { toast } from "react-hot-toast";
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import { TbPhotoPlus } from 'react-icons/tb';

// function Page({ params }) {
//   const [quote, setQuote] = useState(null);
//   const [user, setUser] = useState(null);
//   const [quoteText, setQuoteText] = useState("");
//   const [image, setImage] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [color, setColor] = useState("");
//   const [textColor, setTextColor] = useState("black");
//   const [catagory,setCatagory]=useState("");
//   const router = useRouter();
//   const Back = () => {
//     router.push('/');
//   };
//   useEffect(() => {
//     const getQuote = async () => {
//       try {
//         const res = await axios.patch(`/api/users/post`,{id:params.id});
//         console.log(res.data);
//         setQuote(res.data.quote);
//         setQuoteText(res.data.quote.quote);
//         setImage(res.data.quote.BgImageUrl);
//         setColor(res.data.quote.BgColor);
//         setTextColor(res.data.quote.TextColor);
//         setCatagory(res.data.quote.catagory);
//       } catch (error) {
//         console.error("Error fetching quote:", error);
//       }
//     };

//     const getUser = async () => {
//       try {
//         const res = await axios.get("/api/users/login");
//         setUser(res.data.data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     getQuote();
//     getUser();
//   }, [params.id]);
//  console.log(quoteText);
//   const handleImageChange = (e) => {
//     e.preventDefault();
//     if (e.target.files.length > 0) {
//       setImageFile(e.target.files[0]);
//       const imageUrl = URL.createObjectURL(e.target.files[0]);
//       setImage(imageUrl);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('quote', quoteText);
//       formData.append('category', catagory);
//       if (imageFile) {
//         formData.append('file', imageFile);
//       }
//       formData.append('bgColor', color);
//       formData.append('textCol', textColor);

//       const res = await axios.patch(`http://localhost:3000/api/quotes/${params.id}`, formData);
//       console.log(res.data);
//       toast.success("Quote updated successfully");
//       router.push("/");
//     } catch (error) {
//       console.error("Error updating quote:", error);
//       toast.error("Failed to update quote");
//     }
//   };
//   const RemoveBgImg=()=>{
//     setImage(" ");
//   }

//   const handleBack = () => {
//     router.push('/');
//   };

//   return (
//     <div className="w-screen h-[100vh] text-white overflow-x-hidden" style={{backgroundImage:'url("https://geniebook.com/cms/storage/app/media/pri.-science-blog/adobestock-301377172.webp")',backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}}>
//     <div className="w-full h-[60px] flex justify-between items-center">
//     <button onClick={Back}><IoMdArrowRoundBack style={{ width: "50px", height: "50px", marginTop: "0px",color:"whitesmoke" }} /></button>
//     <button type="button" onClick={handleSubmit} className="w-[90px] h-[40px] relative right-3  shadow-2xl border-2 border-white backdrop-blur-lg rounded-lg bg-opacity-55  text-xl font-bold">Post</button>
//     </div>
//     <hr />
//     <div className="w-full h-[50px] flex justify-center my-4 items-center  text-white text-center text-xl font-bold underline ">
//          <h1>🌸जीवन सिर्फ जियो मत दुसरो को भी जीना सिखाओ🌺</h1>
//       </div>
      
//     <form>
//       {/* <div className="w-full h-150 flex justify-center items-center gap-2">
//         <input
//           type="file"
//           onChange={handleImageChange}
//           // {...register("quoteImage")}
//           className="opacity-0 left-[-80px]"
//         />
//         <div>
//           <TbPhotoPlus style={{ width: "80px", height: "80px", marginLeft: "-200px",color:"white" }} />
//           <h1 className="mx-[-200px]">Click for Bg  Image</h1>
//         </div>
//         <h1 className="">Or</h1>
//         <div>
//           <input
//             type="color"
//             onChange={(e)=>setColor(e.target.value)}
//             className="mx-3"
//           />
//           <h1 className="mx-3">Click to <br /> Choose Bg Color</h1>
//         </div>
//       </div> */}
//       {/* <div className="w-full h-[50px] flex justify-center items-center  text-white text-center text-xl font-bold underline ">
//          <h1>🌸जीवन सिर्फ जियो मत दुसरो को भी जीना सिखाओ🌺</h1>
//       </div> */}
//       {/* <div className="w-[200px] h-[70px]  flex justify-center items-center">
//         <h1>Catagroy:</h1>
//         <select name="catagory" id="" className="w-[100px] h-[30px] bg-transparent backdrop-blur-lg rounded-lg bg-opacity-55 border border-3">
//        <option value="Spiritual">Spiritual</option>
//        <option value="Spiritual">Business</option>
//        <option value="Spiritual">Life</option>
//        <option value="Spiritual">Motivational</option>

//         </select>
//       </div> */}
//       <div className="w-[100%] h-[80%]">
//         <div className=" my-3 w-full h-[60px]   backdrop-blur  flex justify-between items-center p-2">
//           <div className="flex justify-center items-center">
//       <CgProfile className="z-50" style={{ width: "50px", height: "50px",marginLeft:"0px" }}/>
//       <h1>{user?.username}</h1>
//       </div>
//       <div className="dropdown dropdown-top">
//   <div tabIndex={0} role="button" className="btn m-1">Click</div>
//   <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
//     <li className="text-black" onClick={RemoveBgImg}><a>RemoveBgImg</a></li>
//     <li><a>Item 2</a></li>
//   </ul>
// </div>
//       {/* <div className={`${Hidden}`} >
//       <PostOpt BgChange={BgRemove} />
//       </div> */}
//       {/*  */}
//       </div>
//       <textarea
//       value={quoteText}
//       placeholder="Enter your quote"
//         className={`w-[92%] h-[400px] mx-4 my-1 text-3xl text-center bg-white bg-opacity-35 backdrop-blur-sm  outline-none  p-4 resize-none shadow-xl border-none rounded-md`}
//         style={{
//           backgroundImage: image ? `url(${image})` : 'none',
//           backgroundColor:`${color}`,
//           color:`${textColor}`,
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           overflowY: "auto",
//           whiteSpace: "pre-wrap",
//           wordWrap: "break-word"
//         }}
//         onChange={(e) => setQuoteText(e.target.value)}
//        />
//       {/* {errors.quote && <span className="text-red-700 text-xl mx-4  relative top-[-40px]">MaxLength 150 and Min Length 20</span>} */}
//       </div>
//       <div className="w-full h-[50vh] bg-transparent">
//          <div className="w-full h-[50px] border-b-black flex justify-around items-center flex-col bg-transparent">
//           <div className="flex my-[-20px]">
//          <h1>Catagory:</h1>
//         <select
//         defaultValue={catagory}
//         onChange={(e)=>{setCatagory(e.target.value)}}
//         name="catagory" id="" className="w-[150px] h-[30px] bg-transparent backdrop-blur-lg rounded-lg bg-opacity-55 border border-3">
//           <option value="" className="bg-transparent text-black" >Select Category</option>
//        <option value="Spiritual" className="bg-transparent text-black"  >Spiritual</option>
//        <option value="Spiritual"  className="bg-transparent text-black" >Business</option>
//        <option value="Spiritual"  className="bg-transparent text-black" >Life</option>
//        <option value="Spiritual"  className="bg-transparent text-black" >Motivational</option>
//         </select>
//         </div>
//         {/* {errors.catagory &&  <span className="text-red-700 text-xl relative left-8 ">Catagory required</span> } */}
//          </div>
//      {/* */}
      
//      {/*  */}
//          <hr className="w-[85%] mx-8" />
//          <div className="w-full h-[50px] border-b-black flex justify-between items-center">
//         <input
//           type="file"
//           onChange={handleImageChange}
//           // {...register("quoteImage")}
//           className="opacity-0 z-50 "
//         />
//         <div className=" w-full flex justify-center items-center">
//           <TbPhotoPlus style={{ width: "50px", height: "50px", marginLeft: "0px",color:"white",position:"relative",left:"-90px" }} />
//           <h1 className="relative left-[-90px]">Click for Bg  Image</h1>
//           </div>
//          </div>
//          <hr className="w-[85%] mx-8"/>
//          <div className="w-full h-[50px] border-b-black flex justify-center items-center ">
//          <input
//             type="color"
            
//             onChange={(e)=>setColor(e.target.value)}
//             className="mx-3 "
//           />
//           <h1 className="mx-1"> Click for Bg Color</h1>
//          </div>
//          <hr  className="w-[85%] mx-8"/>
//          <div className="w-full h-[50px] border-b-black flex justify-center items-center gap-3">
//           <h1></h1>
//          <input
//             type="color"
//             onChange={(e)=>setTextColor(e.target.value)}
//             className=" relative"
//           />
//           <h1 className="text-white">Click for text color</h1>
//          </div>
//          <hr className="w-[85%] mx-8" />
//       </div>
//       {/* <div className="flex justify-between items-center ">
//         <div className="flex">
//       <input
//             type="color"
//             onChange={(e)=>setTextCol(e.target.value)}
//             className="mx-3 relative top-[-30px]"
//           />
//           <h1 className=" relative top-[-30px] text-white">Click for text color</h1>
//           </div>
//           <div className="w-[90px] h-[30px]  relative top-[-30px] left-[-10px] flex justify-center items-center flex-col">
//             <div >
//           <MdDelete style={{width:"30px",height:"30px",color:"orange"}} onClick={BgRemove} />
//           </div>
//           <h1>Delete Bg</h1>
//           </div>
//           </div> */}
//       {/*  */}
//     </form>
//   </div>
//   );
// }

// export default Page;
import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import useStore from "../zustandStore/store"
import toast from "react-hot-toast";
import axios from "axios";
import Cookie from "js-cookie"
const UNSPLASH_ACCESS_KEY = "5aV5DAnzh261jk2ljOgMy8evKANOEG2XnjoPFM30aFM";
const BASE_URL = "https://api.unsplash.com";

const topics = ["Nature", "Technology", "Travel", "Food", "Animals", "Art", "Fashion"];
const modes = ["Quote", "Couplet", "Poem", "Story"];

export default function Page({params}) {
  const [selectedImage, setSelectedImage] = useState("https://plus.unsplash.com/premium_photo-1717279908053-e0e8618eca45?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D");
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [postText, setPostText] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [base64Data,setBase64Data]=useState(null);
    const [image, setImage] = useState("");
  const [imagefile, setImagefile] = useState(null);
  const observer = useRef();
  const router=useRouter();
  const theme=useStore((state)=>state.theme);
  const Back = () => {
    router.push('/');
  };
  const token = Cookie.get('accessToken');
  console.log(token);
    const QuoteSubmit = async () => {
    console.log(postText);
    console.log(selectedMode);
    
    // if (!(image.length > 0)) {
    //   toast.error("Please select an image");
    //   return;
    // }
  
    const formData = new FormData();
    formData.append(`${selectedImage}`, postText);
   // let selectImg="";
    const data={};
    if(selectedMode=="Quote") {
      data["quote"]=postText;
      data["bgImg"]=imagefile;
      data["TextCol"]="peir90e";
      data["image"]=base64Data;
      data["url"]=selectedImage
    }
    else if(selectedMode=="Couplet"){
      data["couplet"]=postText;
      data["bgImg"]=imagefile;
      data["TextCol"]="peir90e";
      data["image"]=base64Data;
      data["url"]=selectedImage
    }
    else if(selectedMode=="Poem"){
      data["poem"]=postText;
      data["bgImg"]=imagefile;
      data["TextCol"]="peir90e";
      data["image"]=base64Data;
      data["url"]=selectedImage
    }
    else{
      data["story"]=postText;
      data["bgImg"]=imagefile;
      data["TextCol"]="peir90e";
      data["image"]=base64Data;
      data["url"]=selectedImage
    }
  //   formData.append('bgImg',imagefile);
  //   formData.append('TextCol', "04st");
  //   formData.append('image',base64Data);
  //   formData.append('url',selectedImage);
  //  console.log(formData);
  //  console.log(formData.url);
   console.log(data);
   const toastId = toast.loading("Wait, we are checking your content");
    try {
      console.log(selectedMode);
      console.log(formData);
      const res = await axios.post(`https://spirit-spark-backendv2.onrender.com/api/v1/post/${selectedMode?.toLocaleLowerCase()}`, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      },
      });
      console.log(res.data);
      if(res.data?.Error){
        toast.dismiss(toastId);
        toast.error(`${res.data?.Error}`);
        router.push('/');
        return ;
     }
      if(!(res.data?.success)){
        toast.dismiss(toastId);
         toast.error("Sorry you can't upload this type of content");
         await axios.delete("https://spirit-spark-backendv2.onrender.com/api/v1/user/signout", { withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
        }
          });
         Cookie.remove('accessToken');
         router.push('/login');
         return ;
      }
  toast.dismiss(toastId);
   router.push('/');
      // Continue with the submission logic if necessary
    } catch (error) {
      console.error("Error detecting image content:", error);
      toast.dismiss(toastId);
      toast.error("An error occurred while submitting the quote. Please try again.");
      
    }
  };
  
  
  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [selectedTopic]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/search/photos?query=${encodeURIComponent(
            selectedTopic
          )}&page=${page}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await res.json();
        setImages((prevImages) => [...prevImages, ...data.results.map((img) => img.urls.small)]);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [selectedTopic, page]);

  const loadMoreImages = (entries) => {
    if (entries[0].isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await axios.patch(`/api/users/post`,{id:params.id});
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
  },[param.id]);

  useEffect(() => {
    if (loading) return;
    const lastImageRef = observer.current;
    if (lastImageRef) lastImageRef.disconnect();
    observer.current = new IntersectionObserver(loadMoreImages);
    const imagesList = document.querySelectorAll(".image-item");
    if (imagesList.length > 0) {
      observer.current.observe(imagesList[imagesList.length - 1]);
    }
  }, [images, loading]);
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
        setImagefile(file);
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
   
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result; // This is the complete data URI
            setBase64Data(base64String); // Save the full base64 string

            // Log base64Data here
            console.log(base64String); // This will show the base64 data
        };
        reader.readAsDataURL(file); // Read the image file as a data URL
    }
};
  const handleImageSelect = (img) => {
    setSelectedImage(img);
    setIsDialogOpen(false);
  };

  return (
    <div className={`max-w-md p-2 rounded-lg shadow-md relative ${theme=="dark" ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <button onClick={Back}><IoMdArrowRoundBack style={{ width: "30px", height: "30px", marginTop: "0px",color:`${theme=="dark" ? "white":"black" }`}}/></button>
      <div className="relative h-56 w-full mb-4">
        <img
          src={selectedImage || "https://plus.unsplash.com/premium_photo-1717279908053-e0e8618eca45?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D"}
          alt="Selected Content"
          className="w-full h-full object-center rounded-md"
        />
      </div>

      <textarea
        className={`w-full  p-2 border rounded-md text-gray-600 flext justify-center `}
        placeholder="Write something (max 250 words)"
        maxLength={250}
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        style={{ minHeight: "104px", resize: "none", overflowY: "hidden" }}
      />
<button className="btn mt-4 w-full" style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)' }}>
  Generate
</button>


      <div className="flex gap-2 mt-4">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-4 py-2 rounded-md ${
              mode === selectedMode ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsDialogOpen(true)}
        className="btn btn-outline mt-4"
      >
        Select Image
      </button>

      <button className="btn btn-primary mt-4 w-full"
      onClick={()=>QuoteSubmit()}
      >Post</button>

      {isDialogOpen && (
        <div className="w-full h-full absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="p-2 rounded-lg w-full max-h-[80vh] overflow-auto relative bg-white dark:bg-gray-900">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold mb-4">Select an Image</h3>
            <input type="file" className="mb-4" onChange={(e) => handleImageChange(e)} />

            <div className="grid grid-cols-2 gap-2 mb-4">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2 rounded-md ${
                    topic === selectedTopic ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 overflow-y-auto min-h-64">
              {images?.length==0 ? (
                <p>Loading...</p>
              ) : (
                images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Unsplash selection"
                    className="image-item w-full h-[100px] cursor-pointer rounded-lg"
                    onClick={() => handleImageSelect(img)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
