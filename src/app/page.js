/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useEffect, useState} from "react";
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';
import { Input } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import Cookie from "js-cookie"
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { SearchIcon } from "./components/SearchIcon";
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { AppContext } from "./contex/Contex";
import { FaCirclePlus } from "react-icons/fa6";
import Home2 from './components/Home2'
import { useRouter } from "next/navigation";
import axios from "axios";
import useStore from "./zustandStore/store.js"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,useDisclosure} from "@nextui-org/react";
import SearchUser from "./components/User"
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [QuoteDetails, setQuoteDetails] = useState(null);
  const [UserCard, setUserCard] = useState(null);
  const [searchedUser,setSearchedUser]=useState([]);
  const [searchValue,setSearchValue]=useState("");
 const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["couplet"]));
  const [selectedKeys1, setSelectedKeys1] =useState(new Set(["Hindi"]));
  const [currentMode,setCurrentMode]=useState("couplet");
  const [userString, setUserString]=useState(null);
  const [currentUser,setCurrUser]=useState(null);
  const theme=useStore((state)=>state.theme);
  const route=useRouter();
  const postChange=()=>{
    route.push('/post/');
  }

  const token = Cookie.get('accessToken');
  const getProfile=async(id)=>{
    const res=await axios.get(`https://spirit-spark-backendv2.onrender.com/api/v1/users/profile/post/${id}`,{
     withCredentials:true,
     headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
  },});
    console.log(res.data);
      setCurrUser(res.data.data.UserDetails);
    }
  useEffect(() => {
    let user2;
  
    if (token) {
      try {
        const user = jwtDecode(token); // Decode the token
        localStorage.setItem("user", JSON.stringify(user)); // Store the user object as a string in localStorage
        const usstr = localStorage.getItem("user");
        user2 = JSON.parse(usstr); // Parse the string back to an object
        setUserString(usstr);
      } catch (error) {
        console.error("Invalid token", error);
      }
      console.log(user2._id);
      getProfile(user2._id);
    } else {
      console.error("No token found");
    }
  }, []);
 
  let user;
  
  if (userString) {
    try {
      user = JSON.parse(userString); // Parse the JSON string to an object
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
  }
  const changeProfile=()=>{
    route.push(`/profile/${user?._id}`);
  }
  
  const avatarImg = currentUser ? currentUser.avatarImg : null;
  const email=user?user.email:null;
  const fullname=user?user.fullname:null;
  useEffect(()=>{
    searchUser();
  },[searchValue])
  const searchUser=async()=>{
    if(searchValue.length>0){
    const res=await axios.get(`https://spirit-spark-backendv2.onrender.com/api/v1/user/search/${searchValue}`,{withCredentials:true,
      headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
  }
});
    setSearchedUser(res.data?.data)
    console.log(res.data.data);
    }
  }
  // console.log(user);
  
  const logout=async()=>{
   const res =await axios.delete("https://spirit-spark-backendv2.onrender.com/api/v1/user/signout",{withCredentials:true,
    headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
}});
   console.log(res.data);
    Cookie.remove('accessToken');
    localStorage.removeItem("user");
    route.push('/login');
  }
  const selectedValue = React.useMemo(
    () =>Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const selectedValue1 = React.useMemo(
    () =>Array.from(selectedKeys1).join(", ").replaceAll("_", " "),
    [selectedKeys1]
  );
  const [isRotating, setIsRotating] = useState(false);
  const ThemeSet = useStore((state) => state.ThemeChange)
  return (
      <AppContext.Provider
        value={{ QuoteDetails, setQuoteDetails, UserCard, setUserCard,currentMode,setCurrentMode,theme}}
      >
        <div
          style={{backgroundColor:`${theme == "dark"?"#09143C":""}`}}
           className={`w-full min-h-screen ${theme=="dark"?"dark text-foreground ":""}`}
        >
           <div>
        <Navbar shouldHideOnScroll
        style={{backgroundColor:`${theme == "dark"?"#09143C":""}`}}
        className="flex justify-between items-center"
        >
      <NavbarContent justify="end">
        <NavbarBrand className="mr-2">
          <Image src={"/LOGO2-removebg-preview.png"} width={50} height={50}/>
          <p className="hidden sm:block font-bold text-inherit mx-2">SPIRITSPARK</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
      <div className={`w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer`}
      onClick={ThemeSet}
      >
         {
          theme == "dark"?<Moon
          className={` ${isRotating ? 'animate-rotate' : ''}`}/>:<Sun  className={` ${isRotating ? 'animate-rotate' : ''}`}/>
         }
      </div>
      <NavbarContent as="div" className=" flex justify-between items-center " justify="center">
        <FaSearch
         onClick={onOpen}
        className="md:hidden text-2xl mx-2"/>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
          <div className="w-full h-[500px]  bg-gray-300 flex justify-center items-center flex-col gap-7">
              <div className="w-[80%] h-[60px] py-7">
                <input type="text" className="w-full h-[50px] rounded-md p-2"
                 onChange={(e) => setSearchValue(e.target.value)} 
                placeholder="Search here..."/>
              </div>
              <div className="w-[80%] h-[420px]   overflow-scroll flex flex-col">
                   {
                    searchedUser?.map((items)=>(
                      <>
                      <SearchUser data={items}/>
                      </>
                    ))
                   }
              </div>
          </div>
            </>
          )}
        </ModalContent>
      </Modal>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10 hidden md:block",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
          <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={`${avatarImg || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKpQUy8JP90MAZxFjU0P9bPqkUWL35fd8Ag&s"}`}
          />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{fullname}</p>
              <p className="font-semibold">{email}</p>
            </DropdownItem>
            <DropdownItem 
            key="profile"
            onClick={changeProfile}
            >My Profile</DropdownItem>
            <DropdownItem 
            onClick={logout}
            key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    <Home2 Mode={selectedKeys.currentKey || "couplet"} lang={selectedKeys1.currentKey || "Hindi"}/>
    </div> 
    <footer>
          <div
           style={{backgroundColor:`${theme == "dark"?"#09143C":""}`}}
        className={`fixed bottom-0 h-[50px] left-0 w-full  ${theme=="dark"?"bg-black":"bg-white"}  flex justify-center gap-[90px] items-center`}
      >
         <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize"
        >
          {selectedValue1}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys1}
        onSelectionChange={setSelectedKeys1}
      >
         <DropdownItem key="Hindi">Hindi</DropdownItem>
        <DropdownItem key="English">English  <span className="text-success">Upcoming</span></DropdownItem>
      </DropdownMenu>
    </Dropdown>
        <div>
          <FaCirclePlus
            style={{ width: "35px", height: "35px"}}
            onClick={postChange}
          />
        </div>
        <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
         <DropdownItem key="quote">Quote</DropdownItem>
        <DropdownItem key="couplet">Couplet(doha)</DropdownItem>
        <DropdownItem key="poem">Poem</DropdownItem>
        <DropdownItem key="story">Story</DropdownItem>
      </DropdownMenu>
    </Dropdown>
      </div>
      </footer>
        </div>
      </AppContext.Provider>
    // </LocomotiveScrollProvider>
  );
}
