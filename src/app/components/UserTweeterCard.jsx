import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const UserTwitterCard = ({ data }) => {
  const [isFollowed, setIsFollowed] = useState(data?.isFollowed);
  const router = useRouter();

  const GoUserProfile = () => {
    router.push(`/profile/${data?.Owner?._id}`);
  };

  const handleFollow = async () => {
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/follow/${data?.Owner?._id}`,{data:"jaga"},{withCredentials:true});
      setIsFollowed((prev) => !prev);
      console.log(res.data);
    } catch (error) {
      console.error("Error following/unfollowing the user:", error);
    }
  };

  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={data?.Owner?.avatar}
            onClick={GoUserProfile}
            style={{ cursor: 'pointer' }}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {data?.Owner?.username}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">
              {data?.Owner?.username}
            </h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          onClick={handleFollow}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">
          Full-stack developer, @getnextui lover she/her
          <span aria-label="confetti" role="img">🎉</span>
        </p>
      </CardBody>
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
