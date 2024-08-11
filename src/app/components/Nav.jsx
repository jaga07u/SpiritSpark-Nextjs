import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';
import { Input } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import {Switch} from "@nextui-org/react";
import { MoonIcon } from './MoonIcont';
import { SunIcon } from './SunIcon';
import {Button} from "@nextui-org/react";

import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";
import { AcmeLogo } from './AcmeLogo';
import { SearchIcon } from './SearchIcon';
import Image from 'next/image';
import useApp from '../contex/Contex';
import { Moon, Sun } from 'lucide-react';
function Nav() {
  const {theme,setTheme }=useApp();
  const [isSelected,setIsSelected]=useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Quote"]));
  const [isRotating, setIsRotating] = useState(false);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const ThemeSet = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
   // duration of the rotation animation
  };

    return (
        // <>
        // <div className={`w-full bg-white h-[100px] z-50${fixed?" fixed top-0 left-0 right-0 " :""} `}>
        // <nav
        //   className={`w-full h-[77px] flex  justify-between items-center shadow-md bg-white   `}
        // >
        //   <div className="w-[70%] h-full flex  items-center gap-3">
        //     <div className="w-[70px] h-[70px] rounded-full  flex justify-center items-center gap-2">
        //       <div>
        //         {/* <CgProfile style={{ width: "50px", height: "50px" }} /> */}
        //         <Image src="/LOGO2.jpg" width={55} height={55} alt="logo" />
        //       </div>
        //     </div>
        //   </div>
        //   <div className="w-[50px] h-[50px] flex justify-center items-center">
        //     <FaSearch style={{ width: "30px", height: "30px",marginLeft:"-15px"}} />
        //   </div>
        // </nav>
        // <Slider/>
        // </div>
        // </>
        <>
        <div>
        <Navbar shouldHideOnScroll
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
        <FaSearch className="md:hidden text-2xl mx-2"/>
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
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>

            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    {/* <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="Quote">Quote</DropdownItem>
        <DropdownItem key="Couplet">Couplet</DropdownItem>
        <DropdownItem key="Poem">Poem</DropdownItem>
        <DropdownItem key="Story">Story</DropdownItem>
      </DropdownMenu>
    </Dropdown> */}
    </Navbar>
    </div>
        </>
    )
}

export default Nav
