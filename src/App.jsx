import ReactDOM from "react-dom/client";
import Navbar from "./Components/Navbar";
import {app} from "./Config/firebase";
import { useState ,useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./Components/Contact";
import Addandupdatecontact from "./Components/Addandupdatecontact";
import NotFoundContact from "./Components/NotfoundContact";



import { getFirestore,collection,onSnapshot   } from "firebase/firestore";

const db=getFirestore(app);
const App=()=>{
  

   const [contact,setContact]=useState([]);
   const [showModal,setShowModal]=useState(false)
   const onOpen=()=>{
    setShowModal(true);
   }
   const onClose=()=>{
    setShowModal(false);
   }

   useEffect(()=>{
    const getContact=async()=>{
      try{
       const ContactRef=collection(db,"contacts");
       onSnapshot(ContactRef, (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContact(contactLists);
        return contactLists;
      });
      }
       catch(error){
        console.log(error);
       }
    }
    getContact();
   },[]);

   const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.Name.toLowerCase().includes(value.toLowerCase())
      );

      setContact(filteredContacts);

      return filteredContacts;
    });
  };


    return (
        <>
        <div className="mx-auto max-w-[370px] px-4">
            <Navbar/>
            
            <div className="flex relative items-center">
            <FiSearch className="text-white absolute ml-1 text-3xl"/>
                <input  onChange={filterContacts} className="bg-transparent flex-grow h-10 pl-9 border rounded-md mr-3 border-white text-white" type="text" placeholder="Search Contact"/>
                <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white" />
            </div>
           
            <div className="mt-4">
             {contact.length <= 0 ? (
            <NotFoundContact />
          ) : (
               contact.map((con) => (
                <Contact key={con.id} con={con} />
               )
               )
          )
              }
          
            </div>
          
            
        </div>
       <Addandupdatecontact isOpen={showModal} onClose={onClose}/>
       <ToastContainer position="bottom-center"/>
        </>
    );
};
const container=document.getElementById("root");
const root=ReactDOM.createRoot(container);
root.render(<App/>)