import React from 'react'
import useApp from '../contex/Contex';

function Sidebar() {
    const {sideVal,setSideVal} =useApp();
    return (
        <>
        <div className={`w-[100vw] h-[100vh] bg-red-500 absolute z-50 mx-[${sideVal}]`}>

        </div>
        </>
    )
}

export default Sidebar