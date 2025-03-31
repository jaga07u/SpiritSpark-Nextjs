import React,{useState,useEffect} from 'react'
import CoupletCards from './CoupletCard';
import QuoteCards from './QuoteCards';
import axios from 'axios';
import Cookie from "js-cookie"
import LoadingLotus from './LoadinLotos';

function Quote() {
    const quote=[1,2,3,5,6];
    const [page,setPage]=useState(1);
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [QuoteDetails, setQuoteDetails] = useState(null);
  const [UserCard, setUserCard] = useState(null);
  const [scrollDirection, setScrollDirection] = useState(null);
   const [hasMore, setHasMore] = useState(true); 
    const limit=8;
    const token = Cookie.get('accessToken');
 

    useEffect(()=>{
        // console.log("Reloding completed");
         getCardData();
       },[page])
    const getCardData = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`http://localhost:4000/api/v1/post/quote/${limit}/${page}`,{withCredentials:true,
             headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });
          const data = res.data.data;
          const cardData=data.data;
         // console.log(cardData);
           setData((prev) => [...prev, ...cardData]);
           setHasMore(cardData.length === limit);
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
        <>{
          data.length>0 ? 
                    <div className="w-full min-h-full grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
                        {data.map((item, index) => (
                            <QuoteCards Data={item} key={item?._id} />
                        ))}
                        {!hasMore && <LoadingLotus isLoading={!hasMore} />}
                    </div>
             : (
                <div className="flex justify-center items-center w-full h-full py-32">
                    <LoadingLotus isLoading={loading} />
                </div>
            )}
        </>
    );
}

export default Quote
