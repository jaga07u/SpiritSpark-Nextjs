import Image from "next/image";
import React from "react";

function Avatar({ AvatarUrl, width = 40, margin, changefun }) {
  return (
    <div className={`avatar cursor-pointer ${margin}`} onClick={changefun}>
      <div
        className={`rounded-full border-4 border-pink-600 shadow-lg`}
        style={{ width: `${width}px`, height: `${width}px` }}
      >
        <Image
          width={width}
          height={width}
          src={AvatarUrl || "/default-avatar.png"} // Ensure a valid URL
          alt="User Avatar"
          className="rounded-full"
          quality={100}
        />
      </div>
    </div>
  );
}

export default Avatar;
