import {HiOutlineUserCircle} from "react-icons/hi";
const NotfoundContact = () => {
    return (
      <div className="flex h-[80vh] items-center justify-center gap-4">
        
        <HiOutlineUserCircle className="text-6xl"/>
        
        <h3 className="text-2xl font-semibold text-white"> Contact Not Found</h3>
      </div>
    );
  };
  
  export default NotfoundContact;