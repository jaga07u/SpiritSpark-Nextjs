 "use client"
// import React, { useState } from 'react';
// import 'dotenv/config'
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { IoMdArrowRoundBack } from 'react-icons/io';
// import { TbPhotoPlus } from 'react-icons/tb';
// import useApp from '../contex/Contex'; // Ensure library is installed
// import { CgProfile } from "react-icons/cg";
// import axios from 'axios';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { toast } from "react-hot-toast";
// import { TbPhotoFilled } from "react-icons/tb";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem
// } from "@nextui-org/dropdown";
// import { Button } from '@nextui-org/react';
// import Cookie from "js-cookie"


// function Page() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [image, setImage] = useState("");
//   const [imagefile, setImagefile] = useState(null);
//   const [color, setColor] = useState("");
//   const [TextCol, setTextCol] = useState("black");
//   const [Hidden, setHidden] = useState("hidden");
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(false);
//   const [selectedKeys, setSelectedKeys] = useState(new Set(["couplet"]));
//   const [content,setContent]=useState("");
//   const [base64Data,setBase64Data]=useState(null);
//   const router = useRouter();
//   const selectedValue = React.useMemo(
//     () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
//     [selectedKeys]
//   );
//   const token = Cookie.get('accessToken');
//  // const router=useRouter();
//   const genAI = new GoogleGenerativeAI("AIzaSyBZDc9p5AEfmEJKUHo-iVpY7DO7XuxNYEA"); // Replace with your actual key
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Double-check model compatibility
//   const prompt = "if the given picture has any romance or adult content then respond only yes otherwise respond no. don't give any fullstop";

//   const ChangeHiddent = () => {
//     setHidden("block");
//   }

//   const Back = () => {
//     router.push('/');
//   };
//   const ContentGenerate = async () => {
//     if(!selectedKeys.currentKey){
//       toast.error("please select Mode");
//       return ;
//     }
//     const prompt1=`one motivation ${selectedKeys.currentKey == "couplet"?"kabir dash dohe with out title":selectedKeys.currentKey} ${selectedKeys.currentKey == "story" ||selectedKeys.currentKey == "poem"?"in 70 words only in hindi no translate":"only in hindi no translate"}`
//     setContent("");
//   //  setIsLoading(true);
//     try {
//       const result = await model.generateContentStream(prompt1);
//       for await (const item of result.stream) {
//         setContent((prev) => `${prev}${item.candidates[0].content.parts[0].text}`);
//       }
//     } catch (error) {
//       console.log(error);
//     } 
//     // finally {
//     //   setIsLoading(false);
//     // }
//   };

//   // const img_detect = () => {
//   //   return new Promise((resolve, reject) => {
//   //     if (!imagefile) {
//   //       console.error("Please upload an image!");
//   //       reject("Please upload an image!");
//   //       return;
//   //     }
  
//   //     try {
//   //       const reader = new FileReader();
//   //       reader.onloadend = async () => {
//   //         const base64String = reader.result.split(',')[1]; // Get base64 string from the result
//   //         const image = {
//   //           inlineData: {
//   //             data: base64String,
//   //             mimeType: imagefile.type
//   //           }
//   //         };
//   //         try {
//   //           const result = await model.generateContent([prompt, image]);
//   //           resolve(result.response.text().trim());
//   //         } catch (error) {
//   //           toast.error("Sorry you can't upload this type of content");
//   //           // console.error("Error generating content:", error);
//   //           reject("yes");
//   //         }
//   //       };
//   //       reader.readAsDataURL(imagefile); // Read the image file as a data URL
//   //     } catch (error) {
//   //       console.error("Error processing image:", error);
//   //       reject(error);
//   //     }
//   //   });
//   // }
  
  //   console.log(imageUrl);
//   const handleImageChange = (e) => {
//     e.preventDefault();
//     const file = e.target.files?.[0];
//     if (file) {
//         setImagefile(file);
//         const imageUrl = URL.createObjectURL(file);
//         setImage(imageUrl);
//    
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const base64String = reader.result; // This is the complete data URI
//             setBase64Data(base64String); // Save the full base64 string

//             // Log base64Data here
//             console.log(base64String); // This will show the base64 data
//         };
//         reader.readAsDataURL(file); // Read the image file as a data URL
//     }
// };

  
//   const QuoteSubmit = async () => {
//     console.log(content);
  
//     if (!(image.length > 0)) {
//       toast.error("Please select an image");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append(`${selectedKeys.currentKey}`, content);
//     formData.append('bgImg', imagefile);
//     formData.append('TextCol', TextCol);
//     formData.append('image',base64Data)
  
//     try {
//       // const imageResult = await img_detect();
//       // console.log(imageResult);
  
//       // const textResult = await Text_detection(content);
//       // console.log(textResult);
  
//       // if (imageResult?.toLocaleLowerCase() === "yes" || textResult?.toLocaleLowerCase() === "yes") {
//       //   console.log("yes");
//       //   toast.error("Sorry, you can't upload this type of content");
//       //   await axios.delete("http://localhost:4000/api/v1/user/signout", { withCredentials: true });
//       //   Cookie.remove('accessToken');
//       //   router.push('/login');
//       //   return;
//       // }
//       const toastId = toast.loading("Wait, we are checking your content");
//       console.log(selectedKeys.currentKey);
//       console.log(formData);
//       const res = await axios.post(`https://spirit-spark-backendv2.onrender.com/api/v1/post/${selectedKeys.currentKey}`, formData, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//       },
//       });
//       console.log(res.data);
//       toast.dismiss(toastId);
//       if(!(res.data?.success)){
//          toast.error("Sorry you can't upload this type of content");
//          await axios.delete("https://spirit-spark-backendv2.onrender.com/api/v1/user/signout", { withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${token}`,
//         }
//           });
//          Cookie.remove('accessToken');
//          router.push('/login');
//          return ;
//       }
//    router.push('/');
//       // Continue with the submission logic if necessary
//     } catch (error) {
//       console.error("Error detecting image content:", error);
//       toast.error("An error occurred while submitting the quote. Please try again.");
//     }
//   };
  
  
//   return (
//     <div className="w-screen h-[100vh] text-white overflow-x-hidden" style={{backgroundImage:'url("https://png.pngtree.com/thumb_back/fh260/background/20190925/pngtree-cool-decoration-abstract-light-dark-blue-futuristic-background-design-creative-dynamic-image_315241.jpg")',backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}}>
//       <div className="w-full h-[60px] flex justify-between items-center">
//         <button onClick={Back}><IoMdArrowRoundBack style={{ width: "50px", height: "50px", marginTop: "0px",color:"whitesmoke" }} /></button>
//         <button type="button" 
//         onClick={handleSubmit(QuoteSubmit)} 
//         className="w-[90px] h-[40px] relative right-3  shadow-2xl border-2 border-white backdrop-blur-lg rounded-lg bg-opacity-55  text-xl font-bold">Post</button>
//       </div>
//       <hr />
//       <div className="w-full h-[50px] flex justify-center my-4 items-center  text-white text-center text-xl font-bold underline ">
//         <h1>🌸जीवन सिर्फ जियो मत दुसरो को भी जीना सिखाओ🌺</h1>
//       </div>
        
//       <form>
//         <div className="w-[100%] h-[80%]">
//           <textarea
//           value={content}
//           onChange={(e)=>setContent(e.target.value)}
//           placeholder="Enter your Beautifull Words 🕉"
//           className={`w-[100%] h-[400px] text-3xl text-center bg-white bg-opacity-35 backdrop-blur-sm outline-none p-4 resize-none shadow-xl border-none`}
//           style={{
//             backgroundImage: image ? `url(${image})` : 'none',
//             color:`${TextCol}`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//             overflowY: "auto",
//             whiteSpace: "pre-wrap",
//             wordWrap: "break-word"
//           }}
//           />
//           {/* {errors.quote && <span className="text-red-700 text-xl mx-4 relative top-[-40px]">MaxLength 150 and Min Length 20</span>} */}
//         </div>
//       </form>
//       <Button
//       onClick={ContentGenerate}
//       className="w-full h-[40px] bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg text-2xl rounded-lg mb-4">
//       Generate
//     </Button>
//       <div className="w-full h-[80px] flex justify-between items-center p-2">
//         <div className='w-[100px] h-[60px] flex justify-center items-center flex-col'>
//           <TbPhotoFilled style={{width:60,height:60,paddingTop:2,color:"yellow",scale:12.5}} />
//           <input type='file'
//            className="opacity-1 relative  left-[-150px] " 
//            onChange={handleImageChange}
//            />
//            <h1>Image</h1>
//         </div>
//         <div className='w-[100px] h-[60px] flex justify-center items-center flex-col'>
//           <Dropdown>
//             <DropdownTrigger>
//               <Button 
//                 variant="bordered" 
//                 className="capitalize"
//                 style={{color:"white"}}
//               >
//                 {selectedValue}
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu 
//               aria-label="Multiple selection example"
//               variant="flat"
//               closeOnSelect={false}
//               disallowEmptySelection
//               selectionMode="single"
//               selectedKeys={selectedKeys}
//               onSelectionChange={setSelectedKeys}
//             >
//               <DropdownItem key="quote">Quote</DropdownItem>
//               <DropdownItem key="couplet">Couplet(doha)</DropdownItem>
//               <DropdownItem key="poem">Poem</DropdownItem>
//               <DropdownItem key="story">Story</DropdownItem>
//             </DropdownMenu>
//           </Dropdown>
//           <h1>Mode</h1>
//         </div>
//         <div className='w-[100px] h-[60px] flex justify-center items-center flex-col'>
//           <div className='w-[40px] h-[40px] bg-yellow-400 rounded-full'>
//           <input 
//           onChange={(e)=>setTextCol(e.target.value)}
//           type='color'  style={{width:50,height:30}} className="rounded-full  bg-white opacity-0"/>
//           </div>
//           <h1>TextColor</h1>
//         </div>
//       </div>
//     </div>
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

export default function PoemCard() {
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
