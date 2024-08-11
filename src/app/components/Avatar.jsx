import Image from 'next/image'
import React from 'react'

function Avatar({AvatarUrl,width,margin,changefun}) {
    return (
        <>
<div className="avatar" onClick={changefun}>
  <div className={`w-16 rounded-full`}>
  <Image 
    width={40}
    height={40}
    src={`${AvatarUrl}`}
    alt="AirMax Pro"
    />
  </div>
</div>
        </>
    )
}

export default Avatar
