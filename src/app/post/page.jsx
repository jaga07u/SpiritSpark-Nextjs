"use client"
import React, { useState } from 'react';
import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TbPhotoPlus } from 'react-icons/tb';
import useApp from '../contex/Contex'; // Ensure library is installed
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { TbPhotoFilled } from "react-icons/tb";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import { Button } from '@nextui-org/react';
import Cookie from "js-cookie"


function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState("");
  const [imagefile, setImagefile] = useState(null);
  const [color, setColor] = useState("");
  const [TextCol, setTextCol] = useState("black");
  const [Hidden, setHidden] = useState("hidden");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["couplet"]));
  const [content,setContent]=useState("");
  const [base64Data,setBase64Data]=useState(null);
  const router = useRouter();
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const token = Cookie.get('accessToken');
 // const router=useRouter();
  const genAI = new GoogleGenerativeAI("AIzaSyBZDc9p5AEfmEJKUHo-iVpY7DO7XuxNYEA"); // Replace with your actual key
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Double-check model compatibility
  const prompt = "if the given picture has any romance or adult content then respond only yes otherwise respond no. don't give any fullstop";

  const ChangeHiddent = () => {
    setHidden("block");
  }

  const Back = () => {
    router.push('/');
  };
  const ContentGenerate = async () => {
    if(!selectedKeys.currentKey){
      toast.error("please select Mode");
      return ;
    }
    const prompt1=`one motivation ${selectedKeys.currentKey == "couplet"?"kabir dash dohe with out title":selectedKeys.currentKey} ${selectedKeys.currentKey == "story" ||selectedKeys.currentKey == "poem"?"in 70 words only in hindi no translate":"only in hindi no translate"}`
    setContent("");
  //  setIsLoading(true);
    try {
      const result = await model.generateContentStream(prompt1);
      for await (const item of result.stream) {
        setContent((prev) => `${prev}${item.candidates[0].content.parts[0].text}`);
      }
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   setIsLoading(false);
    // }
  };

  // const img_detect = () => {
  //   return new Promise((resolve, reject) => {
  //     if (!imagefile) {
  //       console.error("Please upload an image!");
  //       reject("Please upload an image!");
  //       return;
  //     }
  
  //     try {
  //       const reader = new FileReader();
  //       reader.onloadend = async () => {
  //         const base64String = reader.result.split(',')[1]; // Get base64 string from the result
  //         const image = {
  //           inlineData: {
  //             data: base64String,
  //             mimeType: imagefile.type
  //           }
  //         };
  //         try {
  //           const result = await model.generateContent([prompt, image]);
  //           resolve(result.response.text().trim());
  //         } catch (error) {
  //           toast.error("Sorry you can't upload this type of content");
  //           // console.error("Error generating content:", error);
  //           reject("yes");
  //         }
  //       };
  //       reader.readAsDataURL(imagefile); // Read the image file as a data URL
  //     } catch (error) {
  //       console.error("Error processing image:", error);
  //       reject(error);
  //     }
  //   });
  // }
  
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
        setImagefile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        console.log(imageUrl);

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

  
  const QuoteSubmit = async () => {
    console.log(content);
  
    if (!(image.length > 0)) {
      toast.error("Please select an image");
      return;
    }
  
    const formData = new FormData();
    formData.append(`${selectedKeys.currentKey}`, content);
    formData.append('bgImg', imagefile);
    formData.append('TextCol', TextCol);
    formData.append('image',base64Data)
  
    try {
      // const imageResult = await img_detect();
      // console.log(imageResult);
  
      // const textResult = await Text_detection(content);
      // console.log(textResult);
  
      // if (imageResult?.toLocaleLowerCase() === "yes" || textResult?.toLocaleLowerCase() === "yes") {
      //   console.log("yes");
      //   toast.error("Sorry, you can't upload this type of content");
      //   await axios.delete("http://localhost:4000/api/v1/user/signout", { withCredentials: true });
      //   Cookie.remove('accessToken');
      //   router.push('/login');
      //   return;
      // }
      const toastId = toast.loading("Wait, we are checking your content");
      console.log(selectedKeys.currentKey);
      console.log(formData);
      const res = await axios.post(`https://spirit-spark-backendv2.onrender.com/api/v1/post/${selectedKeys.currentKey}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      },
      });
      console.log(res.data);
      toast.dismiss(toastId);
      if(!(res.data?.success)){
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
   router.push('/');
      // Continue with the submission logic if necessary
    } catch (error) {
      console.error("Error detecting image content:", error);
      toast.error("An error occurred while submitting the quote. Please try again.");
    }
  };
  
  
  return (
    <div className="w-screen h-[100vh] text-white overflow-x-hidden" style={{backgroundImage:'url("https://png.pngtree.com/thumb_back/fh260/background/20190925/pngtree-cool-decoration-abstract-light-dark-blue-futuristic-background-design-creative-dynamic-image_315241.jpg")',backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}}>
      <div className="w-full h-[60px] flex justify-between items-center">
        <button onClick={Back}><IoMdArrowRoundBack style={{ width: "50px", height: "50px", marginTop: "0px",color:"whitesmoke" }} /></button>
        <button type="button" 
        onClick={handleSubmit(QuoteSubmit)} 
        className="w-[90px] h-[40px] relative right-3  shadow-2xl border-2 border-white backdrop-blur-lg rounded-lg bg-opacity-55  text-xl font-bold">Post</button>
      </div>
      <hr />
      <div className="w-full h-[50px] flex justify-center my-4 items-center  text-white text-center text-xl font-bold underline ">
        <h1>🌸जीवन सिर्फ जियो मत दुसरो को भी जीना सिखाओ🌺</h1>
      </div>
        
      <form>
        <div className="w-[100%] h-[80%]">
          <textarea
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder="Enter your Beautifull Words 🕉"
          className={`w-[100%] h-[400px] text-3xl text-center bg-white bg-opacity-35 backdrop-blur-sm outline-none p-4 resize-none shadow-xl border-none`}
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
            color:`${TextCol}`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word"
          }}
          />
          {/* {errors.quote && <span className="text-red-700 text-xl mx-4 relative top-[-40px]">MaxLength 150 and Min Length 20</span>} */}
        </div>
      </form>
      <Button
      onClick={ContentGenerate}
      className="w-full h-[40px] bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg text-2xl rounded-lg mb-4">
      Generate
    </Button>
      <div className="w-full h-[80px] flex justify-between items-center p-2">
        <div className='w-[100px] h-[60px] flex justify-center items-center flex-col'>
          <TbPhotoFilled style={{width:60,height:60,paddingTop:2,color:"yellow",scale:12.5}} />
          <input type='file'
           className="opacity-1 relative  left-[-150px] " 
           onChange={handleImageChange}
           />
           <h1>Image</h1>
        </div>
        <div className='w-[100px] h-[60px] flex justify-center items-center flex-col'>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                className="capitalize"
                style={{color:"white"}}
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Multiple selection example"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem key="quote">Quote</DropdownItem>
              <DropdownItem key="couplet">Couplet(doha)</DropdownItem>
              <DropdownItem key="poem">Poem</DropdownItem>
              <DropdownItem key="story">Story</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <h1>Mode</h1>
        </div>
        <div className='w-[100px] h-[60px] flex justify-center items-center flex-col'>
          <div className='w-[40px] h-[40px] bg-yellow-400 rounded-full'>
          <input 
          onChange={(e)=>setTextCol(e.target.value)}
          type='color'  style={{width:50,height:30}} className="rounded-full  bg-white opacity-0"/>
          </div>
          <h1>TextColor</h1>
        </div>
      </div>
    </div>
  );
}

export default Page;
