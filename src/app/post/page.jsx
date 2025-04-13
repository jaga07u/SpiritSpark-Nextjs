"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import useStore from "../zustandStore/store";
import { toast } from "react-hot-toast";
import axios from "axios";
import Cookie from "js-cookie";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Camera } from "lucide-react";

const topics = ["Nature", "Technology", "Travel", "Food", "Animals", "Art", "Fashion"];
const modes = ["Quote", "Couplet", "Poem", "Story"];

const UNSPLASH_ACCESS_KEY = "5aV5DAnzh261jk2ljOgMy8evKANOEG2XnjoPFM30aFM";
const BASE_URL = "https://api.unsplash.com";

export default function PostCard() {
  const router = useRouter();
  const theme = useStore((state) => state.theme);
  const token = Cookie.get("accessToken");

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [selectedMode, setSelectedMode] = useState("Quote");
  const [postText, setPostText] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [base64Data, setBase64Data] = useState(null);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY);

  const generateContent = async () => {
    if (!selectedMode || selectedMode === "Quote") {
      toast.error("Please select a valid mode");
      return;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Generate an inspiring ${selectedMode} for a motivational community app called SpiritSpark.
    `;

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const generatedText = result.response.candidates[0]?.content?.parts[0]?.text || "";
      setPostText(generatedText);
      toast.success("Content generated!");
    } catch (err) {
      toast.error("Failed to generate content.");
    }
  };

  const submitPost = async () => {
    if (!postText || postText.length < 10) {
      toast.error("Please write something meaningful.");
      return;
    }

    const formData = new FormData();
    formData.append(selectedMode.toLowerCase(), postText);
    formData.append("bgImg", imageFile);
    formData.append("TextCol", "peir90e");
    formData.append("image", base64Data);
    formData.append("url", selectedImage);

    const toastId = toast.loading("Submitting your post...");

    try {
      const res = await axios.post(
        `https://spirit-spark-backendv2.onrender.com/api/v1/post/${selectedMode.toLowerCase()}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        toast.success("Post uploaded!");
        router.push("/");
      } else {
        throw new Error("Not allowed to upload");
      }
    } catch (err) {
      toast.error("Upload failed or unauthorized.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.replace(/^data:image\/\w+;base64,/, "");
      setBase64Data(base64);
    };
    reader.readAsDataURL(file);
  };

  const loadMoreImages = (entries) => {
    if (entries[0].isIntersecting) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [selectedTopic]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/search/photos?query=${selectedTopic}&page=${page}&per_page=10&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const data = await res.json();
        setImages((prev) => [...prev, ...data.results.map((img) => img.urls.small)]);
      } catch {
        toast.error("Couldn't load images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, selectedTopic]);

  useEffect(() => {
    const imageObserver = new IntersectionObserver(loadMoreImages);
    const lastImg = document.querySelector(".image-item:last-child");
    if (lastImg) imageObserver.observe(lastImg);
    return () => imageObserver.disconnect();
  }, [images]);

  return (
    <div className={`p-4 mx-auto max-w-md rounded-xl ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} shadow-md`}>
      <button onClick={() => router.push("/")}>
        <IoMdArrowRoundBack size={30} />
      </button>

      <div className="mb-4">
        <img src={selectedImage} alt="Preview" className="w-full h-56 object-cover rounded-lg" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} className="p-2 rounded bg-gray-100 dark:bg-gray-800">
          {modes.map((mode) => (
            <option key={mode}>{mode}</option>
          ))}
        </select>

        <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="p-2 rounded bg-gray-100 dark:bg-gray-800">
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Write or generate your content here..."
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        className="w-full p-3 mb-4 border rounded resize-none h-32 dark:bg-gray-800"
      />

      <div className="flex items-center justify-between mb-4">
        <label className="cursor-pointer flex items-center gap-2">
          <Camera size={20} />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          Upload
        </label>
        <button onClick={generateContent} className="px-4 py-2 rounded bg-green-600 text-white">Generate</button>
      </div>

      <button
        onClick={submitPost}
        className="w-full py-2 mt-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
      >
        Submit
      </button>

      <h3 className="mt-6 text-lg font-semibold">Or choose an image below:</h3>
      <div className="grid grid-cols-3 gap-2 mt-2 max-h-60 overflow-y-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="image-item cursor-pointer w-full h-24 object-cover rounded hover:scale-105 transition"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
