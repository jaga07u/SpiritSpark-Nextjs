import React from 'react'
import { Avatar } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
function SearchUser({data}) {
    console.log(data?.avatarImg);
    const router=useRouter();
    const GoUserProfile = () => {
        router.push(`/profile/${data?._id}`);
      };
    return (
        <>
        <div className="w-full h-[60px] flex justify-between bg-white items-center  p-4 border-1 border-gray-200 rounded-md">
        <Avatar
         onClick={GoUserProfile}
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="md"
              src={`${data?.avatarImg}`}
            />
            <h1>{data?.username}</h1>
        </div>
        </>
    )
}

export default SearchUser
