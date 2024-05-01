import Image from 'next/image'
import React from 'react'

function Avatar({AvatarUrl,width,margin,changefun}) {
    return (
        <>
<div className="avatar" onClick={changefun}>
  <div className={`w-20 rounded-full`}>
  <Image 
    width={60}
    height={60}
    src={`${AvatarUrl}`}
    alt="AirMax Pro"
    />
  </div>
</div>
        </>
    )
}

export default Avatar
