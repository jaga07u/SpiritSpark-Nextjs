import React from 'react'
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Slider from "./Slider";
function Nav({fixed}) {
    return (
        <>
        <div className={`w-full bg-white h-[100px] z-50${fixed?" fixed top-0 left-0 right-0 " :""} `}>
        <nav
          className={`w-full h-[77px] flex  justify-between items-center shadow-md bg-white   `}
        >
          <div className="w-[70%] h-full flex  items-center gap-3">
            <div className="w-[70px] h-[70px] rounded-full  flex justify-center items-center gap-2">
              <div>
                {/* <CgProfile style={{ width: "50px", height: "50px" }} /> */}
                <Image src="/LOGO2.jpg" width={55} height={55} alt="logo" />
              </div>
            </div>
          </div>
          <div className="w-[50px] h-[50px] flex justify-center items-center">
            <FaSearch style={{ width: "30px", height: "30px",marginLeft:"-15px"}} />
          </div>
        </nav>
        <Slider/>
        </div>
        </>
    )
}

export default Nav
