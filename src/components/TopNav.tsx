import { MdNotifications } from "react-icons/md";
import "../index.css";

function TopNav() {
  return (
    <div className="sticky top-0 w-full p-6 z-10 rounded-xl shadow-md main_text">
      <div className="flex justify-between">
        <p>Company</p>
        <MdNotifications size={30} />
      </div>
    </div>
  );
}

export default TopNav;
