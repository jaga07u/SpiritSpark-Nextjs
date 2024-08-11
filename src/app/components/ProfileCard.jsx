import React from 'react'
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa6";
import { BsSave } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Dropdown from './Dropdown';
import useApp from '../contex/Contex';
import { FaOm} from "react-icons/fa6";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import CoupletCards from './CoupletCard';
import PoemCard from './PoemCard';
import ShowCard1 from './ShowCard1'
import ShowCard2 from './ShowCard2'
function ProfileCard({Data,User}) {
  //  console.log(Data);
  console.log(User);
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("top");


   // const {setCardDetails}=useApp();
    return (
        <>
        <div
      //  onClick={()=>{showFun();setCardDetails(Data)}}
      onClick={onOpen}
          style={{ 
            color:`${Data?.TextColor}`
            ,backgroundImage:`url(${Data?.BgImageUrl})`
            ,backgroundPosition:"center"
            ,backgroundRepeat:"no-repeat"
            ,backgroundSize:"cover"}}
          className="h-[118px] w-[125px] shadow-md text-center flex justify-center items-center overflow-hidden"
        >
         <h1  style={{fontSize:"10px"}}>{Data?.quote ||Data?.poem || Data?.story || Data?.couplet}</h1>
             {/* <div className="w-full h-[50px]  mx-[-10px] flex justify-between items-center top-3">
              <div className="w-[40%] h-full flex justify-between items-center mx-3">
                <div className="flex flex-col  justify-center items-center gap-">
                <FaOm className={`text-4xl font-bold ${Data?.isLikedByCurrentUser?"text-gray-400 outline-4":"text-red-500"}  outline-black`}/>
                  <h1 className="text-white text-center">{}</h1>
                </div>
                <FaRegComment
                  style={{ width: "30px", height: "30px", color: "white", marginBottom:"-10px" }}
                />
              </div>
              <BsSave
                style={{ width: "30px", height: "30px", color: "white", marginBottom:"-10px" }}
              />
            </div>  */}
          </div>
          <Modal 
        isOpen={isOpen} 
        size='full'
        className='p-0 bg-white text-foreground'
       placement={modalPlacement}
        onOpenChange={onOpenChange} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                {
                  Data.couplet || Data.quote?(
                    <>
                    <ShowCard1 Data={Data} CUser={User} />
                    </>
                  )
                  :
                  (
                    <>
                    <ShowCard2 Data={Data} CUser={User} />
                    </>
                  )
                }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
        </>
    )
}

export default ProfileCard
