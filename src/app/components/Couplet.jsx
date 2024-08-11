/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react'
import CoupletCards from './CoupletCard';
import axios from 'axios';

function Couplet() {
    const couplet=[1,2,3,5,6];
    const [page,setPage]=useState(1);
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [QuoteDetails, setQuoteDetails] = useState(null);
  const [UserCard, setUserCard] = useState(null);
  const [scrollDirection, setScrollDirection] = useState(null);
    const limit=8;

    useEffect(()=>{
        // console.log("Reloding completed");
         getCardData();
       },[page])
    const getCardData = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`http://localhost:4000/api/v1/post/couplet/${limit}/${page}`,{withCredentials:true});
          const data = res.data.data;
          const cardData=data.data;
        //  console.log(cardData);
           setData((prev) => [...prev, ...cardData]);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
      const handleInfiniteScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
        ) {
          setPage((prev) => prev + 1);
        }
      };
    
      useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
    
        return () => {
          window.removeEventListener("scroll", handleInfiniteScroll);
        };
      }, []);
    return (
        <>
        <div className="w-full min-h-full grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4" >
    {
        data.map((item,index)=>(
            <>
            <CoupletCards Data={item} key={item?._id}/>
            </>
        ))
          }
        </div>  
        </>
    )
}

export default Couplet
