import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader,User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Cookie from "js-cookie"
import { jwtDecode } from "jwt-decode";
export const UserTwitterCard = ({ data }) => {
  const [isFollowed, setIsFollowed] = useState(data?.isFollowed);
  const router = useRouter();
   const token = Cookie.get('accessToken');
   let user=jwtDecode(token);
  const GoUserProfile = () => {
    router.push(`/profile/${data?.Owner?._id}`);
  };

  const handleFollow = async () => {
    setIsFollowed((prev) => !prev);
    try {
      const res = await axios.post(`https://spirit-spark-backendv2.onrender.com/api/v1/follow/${data?.Owner?._id}`,{},{withCredentials:true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error following/unfollowing the user:", error);
    }
  };

  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
           <User   
          as="button"
          onClick={GoUserProfile}
          name={`${data?.Owner?.username}`}
         // description="Product Designer"
          className="transition-transform"
          avatarProps={{
            src: `${data?.Owner?.avatar}`
          }}
        />
        </div>
      {user?._id != data?.Owner?._id &&  <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          onClick={handleFollow}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
}
      </CardHeader>
      {/* <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">
          Full-stack developer, @getnextui lover she/her
          <span aria-label="confetti" role="img">🎉</span>
        </p>
      </CardBody> */}
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">{data?.followingCount}</p>
          <p className="text-default-500 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">{data?.followerCount}</p>
          <p className="text-default-500 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};
