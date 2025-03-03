import React,{useState,useEffect} from 'react'
import PoemCard from './PoemCard';
import axios from 'axios';
import Cookie from "js-cookie"
import LoadingLotus from "./LoadinLotos"
 
function Poem() {
    const poem=[1,2,3,5,6];
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
    // const demoData = {
    //   image: "https://images.unsplash.com/photo-1738848392298-cf0b62edc750?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   content: "सूरज की तरह चमको, अपने सपनों को पूरा करो।\nरास्ते चाहे कठिन हों, हिम्मत कभी मत हारो।",
    //   user: {
    //     name: "आर्य देव",
    //     image: "https://randomuser.me/api/portraits/men/45.jpg",
    //   },
    //   contentType: "poem",
    //   timestamp: new Date(),
    //   isFollowing: false,
    //   likes: 120,
    // };
    

    useEffect(()=>{
        //console.log("Reloding completed");
         getCardData();
       },[page])
    const getCardData = async () => {
        try {
          const token = Cookie.get('accessToken');
          setLoading(true);
          const res = await axios.get(`https://spirit-spark-backendv2.onrender.com/api/v1/post/poem/${limit}/${page}`,
            {withCredentials:true,
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
          const data = res.data.data;
          const cardData=data.data;
         console.log(cardData);
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
        <>
       { 
       data.length>0 ?
       <>
            <div className="w-full min-h-full grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
                {data.map((item,index) => (
                    <PoemCard {...item} key={index}/>
                ))}
                {!hasMore && (
                 <LoadingLotus isLoading={!hasMore} />
            )}
            </div>
          </>
        :
        <>
          <div className="flex justify-center items-center w-full h-full py-32">
          <LoadingLotus isLoading={true} />

                </div>
        </>
}
        </>
    )
}

export default Poem
