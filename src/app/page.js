/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import Cards from "./components/Cards";
import Nav from "./components/Nav";
import Fnav from "./components/Fnav";
import EmptyBox from "./components/EmptyBox";
import { AppContext } from "./contex/Contex";
import UserProfile from "./components/UserProfile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm } from '@fortawesome/free-solid-svg-icons';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [QuoteDetails,setQuoteDetails]=useState(null);
  const [UserCard,setUserCard]=useState(null);
  const [scrollDirection, setScrollDirection] = useState(null);
  const limit = 8;

  const getUser = async () => {
    try {
      const res = await axios.get("api/users/login");
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getCardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`api/users/post/${limit}/${page}`);
      const data = res.data.data;
      setQuotes((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getCardData();
  }, [page]);

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

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
    setLastScrollY(currentScrollY);
  };
  const containerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <LocomotiveScrollProvider
  options={
    {
      smooth: true,
      // ... all available Locomotive Scroll instance options 
    }
  }
  watch={
    [
      //..all the dependencies you want to watch to update the scroll.
      //  Basicaly, you would want to watch page/location changes
      //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
    ]
  }
  containerRef={containerRef}
>
    <AppContext.Provider value={{ QuoteDetails, setQuoteDetails, UserCard, setUserCard }}>
      <div ref={containerRef} data-scroll-container className="w-[100vw] h-[100vh]">
       <Nav />  {/* Show Nav only if isNavVisible is true */}
        {quotes.length > 0 ? (
          <div className="w-full min-h-full flex flex-col justify-center items-center gap-5 my-[20px] bg-white">
            {quotes.map((item) => (
              <Cards key={item._id} Data={item} User={user} />
            ))}
            {loading && (
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 flex justify-center items-center">
                <FontAwesomeIcon icon={faOm} style={{ width: "50px", height: "50px", color: "blue" }} />
              </div>
            )}
          </div>
        ) : (
          <EmptyBox />
        )}
        <Fnav UserDetails={user} />
      </div>
    </AppContext.Provider>
    </LocomotiveScrollProvider>
  );
}
