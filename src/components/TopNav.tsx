import { MdNotifications } from "react-icons/md";
import "../index.css";

function TopNav() {
  return (
    <div className="top-0 w-full p-3 z-10 rounded-xl shadow-md ">
      <div className="flex justify-between">
        <p className="text-white font-bold">Company</p>
        <MdNotifications
          size={30}
          fill="black"
        />
      </div>
    </div>
  );
}

export default TopNav;
