"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
function Page() {
    const route=useRouter();
    const Back=()=>{
        route.push("/")
    }
    return (
        <>
        <button onClick={Back}>Back</button>
        <h1>This is Menu Page</h1>
        </>
    )
}

export default Page
