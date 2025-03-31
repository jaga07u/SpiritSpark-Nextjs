/* eslint-disable @next/next/no-img-element */
 "use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Camera } from "lucide-react";
import { useRouter } from 'next/navigation';
import useStore from "../zustandStore/store"
import {toast}from "react-hot-toast";
import axios from "axios";
import Cookie from "js-cookie"
import {GoogleGenerativeAI} from "@google/generative-ai"
import Image from "next/image"; 
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
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY); // Initialize Gemini API
  const generateContent = async () => {
    if (selectedMode === modes[0]) {
      const toastID = toast.error("Please select a mode");
    //  toast.dismiss(toastID);
      return;
    }
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Get Gemini Model
  
      const prompt = `
        Generate an original and deeply inspiring ${selectedMode} that uplifts the human spirit.
        - If it's a quote, make it short yet powerful, leaving a lasting impact.
        - If it's a couplet, craft it in a poetic and rhythmic way, resonating with wisdom and motivation.
        - If it's a poem, make it heartfelt, rhythmic, and full of positivity, focusing on perseverance, resilience, or self-discovery.
        - If it's a short story, weave a meaningful narrative that inspires personal growth, overcoming challenges, or the beauty of kindness.
        - Ensure the content aligns with SpiritSpark’s theme of motivation, positivity, and mental strength.
      `;
  
      const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
  
      const generatedText = result.response.candidates[0]?.content?.parts[0]?.text || "No response received";
      setPostText(generatedText)
      console.log(generatedText);
      toast.success("Content generated successfully!");
      
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    }
  };
    const QuoteSubmit = async () => {
    console.log(postText);
    console.log(selectedMode);
    if(postText.length<=10){
         toast.error("please Enter more content...😊");
         return ;
    }
    // if (!(image.length > 0)) {
    //   toast.error("Please select an image");
    //   return;
    // }
  
    const formData = new FormData();
    formData.append(`${selectedMode.toLocaleLowerCase()}`, postText);
   // let selectImg="";
    //  const data={};
    // if(selectedMode=="Quote") {
    //   data["quote"]=postText;
    //   data["bgImg"]=imagefile;
    //   data["TextCol"]="peir90e";
    //   data["image"]=base64Data;
    //   data["url"]=selectedImage
    // }
    // else if(selectedMode=="Couplet"){
    //   data["couplet"]=postText;
    //   data["bgImg"]=imagefile;
    //   data["TextCol"]="peir90e";
    //   data["image"]=base64Data;
    //   data["url"]=selectedImage
    // }
    // else if(selectedMode=="Poem"){
    //   data["poem"]=postText;
    //   data["bgImg"]=imagefile;
    //   data["TextCol"]="peir90e";
    //   data["image"]=base64Data;
    //   data["url"]=selectedImage
    // }
    // else{
    //   data["story"]=postText;
    //   data["bgImg"]=imagefile;
    //   data["TextCol"]="peir90e";
    //   data["image"]=base64Data;
    //   data["url"]=selectedImage
    // }
    formData.append('bgImg',imagefile);
    formData.append('TextCol', "04st");
    formData.append('image',base64Data);
    formData.append('url',selectedImage);
   console.log(formData);
   console.log(formData.url);
 //  console.log(data);
   const toastId = toast.loading("Wait, we are checking your content");
  //https://spirit-spark-backendv2.onrender.com/api/v1/post/
    try {
      console.log(selectedMode);
      console.log(formData);
      const res = await axios.post(`https://spirit-spark-backendv2.onrender.com/api/v1/post/${selectedMode?.toLocaleLowerCase()}`, formData, {
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
        setImagefile(null);
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
    <div className={`max-w-md min-h-full  p-2 rounded-lg shadow-md relative ${theme=="dark" ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <button onClick={Back}><IoMdArrowRoundBack style={{ width: "30px", height: "30px", marginTop: "0px",color:`${theme=="dark" ? "white":"black" }`}}/></button>
      <div className="relative h-56 w-full mb-4">
        <img 
          src={selectedImage || "https://plus.unsplash.com/premium_photo-1717279908053-e0e8618eca45?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D"}
          alt="Selected Content"
        className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
        />
          <button
        onClick={() => setIsDialogOpen(true)}
        className="btn btn-outline mt-4"
      >
        <Camera className="w-5 h-5"/>
        Select Image
      </button>

      </div>

      <textarea
  className="w-full p-2 border rounded-md text-gray-600 flex justify-center placeholder:text-wrap"
  placeholder="जीवन सिर्फ जियो मत, दूसरों को भी जीना सिखाओ।
  अपनी रोशनी बाँटो, औरों को भी जलना सिखाओ।(अपने खूबसूरत शब्द यहाँ लिखें)
  "
  maxLength={500}
  value={postText}
  onChange={(e) => {
    setPostText(e.target.value);
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = e.target.scrollHeight + "px"; // Set new height
  }}
  style={{ minHeight: "104px", resize: "none", overflowY: "hidden" }}
/>

<button 
//onClick={generateContent}
className="btn mt-4 w-full" style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)' }}>
  Generate <span className="text-success">Upcoming</span>
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
