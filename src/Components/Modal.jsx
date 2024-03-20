import { createPortal } from "react-dom";
import {AiOutlineClose} from "react-icons/ai";
const Modal=({isOpen,onClose,children})=>{
return createPortal(
    <>
    {isOpen ? 
    <div className="absolute top-0 z-40 grid h-screen w-screen place-items-center backdrop-blur" >
    <div className="relative z-50 m-auto min-h-[200px] min-w-[27%] bg-white p-4">
        <div className="flex justify-end">
            <AiOutlineClose onClick={onClose} className="text-2xl"/>
            
        </div>
        {children}
        </div>
    </div>:null}
   
    </>
    ,document.getElementById("modal")
);
};
export default Modal;