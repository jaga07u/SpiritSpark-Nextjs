/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import useApp from "../contex/Contex";

export default function MenuSelect() {
    const {setMode}=useApp();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Couplet"]));
  
  const selectedValue = React.useMemo(
    () =>Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
 //setMode(selectedKeys);
  return (
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
  );
}
