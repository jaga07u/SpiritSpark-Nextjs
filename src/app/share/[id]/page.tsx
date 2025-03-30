"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,User } from "@nextui-org/react";
import Cookie from "js-cookie";
import axios from "axios";
import { WhatsappShareButton } from "react-share"; // Import WhatsApp Share
import { UserTwitterCard } from "../../components/UserTweeterCard";
import { GiLotus } from "react-icons/gi";
import { Bookmark, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function Page({ params }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareUrl, setShareUrl] = useState("");
  const [data, setData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showBigLotus, setShowBigLotus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShareUrl(`${window.location.origin}/share/${params.id}`); // Ensure window is used client-side
    getCardData();
  }, []);

  const getCardData = async () => {
    const token = Cookie.get("accessToken");
    try {
      const res = await axios.get(
        `https://spirit-spark-backendv2.onrender.com/api/v1/users/profile/share/${params.id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(data)
  const handleLike = async (id) => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
    setShowBigLotus(true);
    setTimeout(() => setShowBigLotus(false), 1000);

    const token = Cookie.get("accessToken");
    await axios.post(
      `https://spirit-spark-backendv2.onrender.com/api/v1/like/couplet`,
      { coupletId: id },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="w-full overflow-hidden transition-all duration-500 hover:shadow-xl dark:shadow-primary/5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/90 dark:to-gray-900/90 border-opacity-50">
      <div className="relative h-56 overflow-hidden">
        <img
          src={data?.data?.BgImageUrl}
          alt="Spiritual content"
          className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
        />
        {/* <div className="absolute bottom-4 left-4 text-white/90 text-sm">
          {formatDistanceToNow(new Date(Date.parse(data?.data?.createdAt)), { addSuffix: true })}
        </div> */}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Popover showArrow placement="bottom">
            <PopoverTrigger>
            <User   
          as="button"
          name={`${data?.Owner?.username}`}
         // description="Product Designer"
          className="transition-transform"
          avatarProps={{
            src: `${data?.Owner?.avatar}`
          }}
        />
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <UserTwitterCard data={data?.data} />
            </PopoverContent>
          </Popover>

          <h3 className="font-semibold text-base dark:text-gray-200">{data?.data?.Owner?.username}</h3>
        </div>

        <p className="text-base leading-relaxed dark:text-gray-300 font-serif">{data?.data?.couplet}</p>

        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700/50">
          <div className="flex items-center gap-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1.5 transition-all duration-300 ${isLiked ? "text-orange-500" : "text-muted-foreground"}`}
              onClick={() => handleLike(data?.data?._id)}
            >
              <GiLotus className={`w-6 h-6 transition-transform duration-300 ${isLiked ? "scale-110 text-pink-500" : "text-gray-400"}`} />
              {likeCount}
            </Button>
            {showBigLotus && <GiLotus className="absolute text-pink-500 opacity-75 animate-ping w-24 h-24 transform -translate-x-1/2" />}

            {/* WhatsApp Share Button */}
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-primary">
              <WhatsappShareButton url={shareUrl} title={`Check out this couplet: "${data?.data?.couplet}"`}>
                <Share2 className="w-5 h-5" />
              </WhatsappShareButton>
              Share
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className={`transition-colors duration-300 ${isSaved ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
