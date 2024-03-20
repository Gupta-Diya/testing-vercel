import {HiOutlineUserCircle} from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import {app} from "../Config/firebase";
import { getFirestore, deleteDoc ,doc } from "firebase/firestore";
import Addandupdatecontact from "./Addandupdatecontact";
import { useState } from "react";
import { toast } from "react-toastify";

const db=getFirestore(app);
const Contact=({con})=>{
  const [showModal,setShowModal]=useState(false)
   const onOpen=()=>{
    setShowModal(true);
   }
   const onClose=()=>{
    setShowModal(false);
   }
  const deleteContact=async (id)=>{
    try {
      console.log(id);
      await deleteDoc(doc(db,"contacts",id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }
   return (
    <>
          <div key={con.id} className="flex  items-center justify-between rounded-md  text-black bg-yellow mb-4">
            <div className="flex gap-1">
            <HiOutlineUserCircle className="text-4xl text-orange"/>
           
            <div>
            <h2 className="font-medium">{con.Name}</h2>
            <p className="text-sm">{con.Email}</p>
            </div>
            </div>
            <div className="flex gap-1 text-3xl">
            <RiEditCircleLine className="cursor-pointer " onClick={onOpen}/>
            <IoMdTrash className="text-orange cursor-pointer " onClick={()=>deleteContact(con.id)}/>
            

           
            </div>
           
            </div>
  <Addandupdatecontact contact={con} isUpdate isOpen={showModal} onClose={onClose} />
  </>
        );
      };
   


export default Contact;