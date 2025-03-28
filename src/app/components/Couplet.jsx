/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import CoupletCards from './CoupletCard';
import axios from 'axios';
import Cookie from "js-cookie";
import Loading from "./Loading";
import LoadingLotus from "./LoadinLotos"

function Couplet() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // To track if more data is available
    const limit = 8;

    const getCardData = async () => {
        const token = Cookie.get('accessToken');
        try {
            setLoading(true);
            const res = await axios.get(
                `https://spirit-spark-backendv2.onrender.com/api/v1/post/couplet/${limit}/${page}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const fetchedData = res.data.data.data;

            // Append new data and check if there's more
            if (fetchedData.length > 0) {
                setData((prev) => [...prev, ...fetchedData]);
                setHasMore(fetchedData.length === limit); // Assume if less than limit, no more data
            } else {
                setHasMore(false);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getCardData();
    }, [page]);

    const handleInfiniteScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            if (hasMore && !loading) { // Prevent multiple API calls when already loading
                setPage((prev) => prev + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => {
            window.removeEventListener("scroll", handleInfiniteScroll);
        };
    }, [loading, hasMore]);
    return (
        <>
          { data.length > 0 ? 
            <div className="w-full min-h-full grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
                {data.map((item) => (
                    <CoupletCards Data={item} key={item?._id} />
                ))}
                {!hasMore &&  (
                 <LoadingLotus isLoading={!hasMore} />
            )}
            </div>
            :
              <div className="flex justify-center items-center w-full h-full py-32">
                   { loading && <LoadingLotus isLoading={true} /> }
                </div>
        }
            
        </>
    );
}

export default Couplet;
