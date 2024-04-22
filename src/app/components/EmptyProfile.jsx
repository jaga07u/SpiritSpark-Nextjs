import React from 'react'

function EmptyProfile() {
    return (
        <>
        <div className="flex flex-col gap-14 w-[100vh] my-10 fixed top-2 left-0 right-0">
  <div className="flex gap-3 items-center">
    <div className="flex flex-col gap-2 my-3">
    <div className="skeleton w-14 h-14 rounded-full shrink-0 mx-2"></div>
    <div className="skeleton h-4 w-[80px] p-2"></div>
    </div>
    <div className="flex  gap-4">
      <div className="skeleton h-4 w-[74px] p-4"></div>
      <div className="skeleton h-4 w-[74px] p-4"></div>
      <div className="skeleton h-4 w-[74px] p-4"></div>
    </div>
  </div>
  <div className=" w-full flex gap-4  items-center">
    <div className="flex  gap-4 w-full flex-wrap">
      <div className="skeleton h-[105px] w-[105px]"></div>
      <div className="skeleton h-[105px] w-[105px]"></div>
      <div className="skeleton h-[105px] w-[105px]"></div>
      <div className="skeleton h-[105px] w-[105px]"></div>
      <div className="skeleton h-[105px] w-[105px]"></div>
      <div className="skeleton h-[105px] w-[105px]"></div>
      <div className="skeleton h-[105px] w-[105px]"></div>
      <div className="skeleton h-[105px] w-[105px]"></div>
    </div>
  </div>
 
</div>
        </>
    )
}

export default EmptyProfile
