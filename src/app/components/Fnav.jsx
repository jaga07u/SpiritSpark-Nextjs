import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaCirclePlus } from "react-icons/fa6";
import useApp from "../contex/Contex";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import axios from "axios";
import {Popover, PopoverTrigger, PopoverContent, Button, User} from "@nextui-org/react";
import {Dropdown,DropdownTrigger, DropdownMenu, DropdownItem, RadioGroup, Radio} from "@nextui-org/react"
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuSelect from "./MenuSelect"
import LangSelect from "./LangSelect"

function Fnav({ UserDetails }) {
  console.log();
  const {theme}=useApp();
  // const { sideVal, setSideVal } = useApp();
  // const router = useRouter();
  const sideChange = () => {
    router.push("/profile");
  };
  const postChange = () => {
    router.push("/post");
  };
  const menChange = () => {
    router.push("/menu");
  };
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Couplet"]));
  
  const selectedValue = React.useMemo(
    () =>Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  // const logout = async () => {
  //   const res = await axios.delete("/api/users/login");
  //   console.log(res.data);
  //   router.push("/login");
  // };
  return (
    <>
      <div
        className={`fixed bottom-0 h-[50px] left-0 w-full  ${theme=="dark"?"bg-black":"bg-white"}  flex justify-center gap-[90px] items-center`}
      >
        <select className="select select-bordered w-full max-w-xs" defaultValue="Hindi">
  <option value="Hindi">Hindi</option>
  <option value="English">English</option>
</select>
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
        onSelectionChange={()=>setSelectedKeys}
      >
         <DropdownItem key="Quote">Quote</DropdownItem>
        <DropdownItem key="Couplet">Couplet(doha)</DropdownItem>
        <DropdownItem key="Poem">Poem</DropdownItem>
        <DropdownItem key="Story">Sotry</DropdownItem>
      </DropdownMenu>
    </Dropdown>
      </div>
    </>
  );
}

export default Fnav;
