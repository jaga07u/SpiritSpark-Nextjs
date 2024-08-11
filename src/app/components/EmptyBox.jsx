import React from 'react'

function EmptyBox() {
    return (
        <>
        <div className="flex justify-center items-center w-full h-screen bg-white flex-col gap-3 overflow-hidden ">
        <div className="flex flex-col gap-4 w-[88%] h-full my-10">
  <div className="skeleton h-[330px] w-full"></div>
  <div className="skeleton h-[330px] w-full"></div>
</div>
    </div>
        </>
    )
}

export default EmptyBox
