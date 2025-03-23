import { MdNotifications } from "react-icons/md";
import "../index.css";

function TopNav() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="top-0 w-full p-3 z-10 rounded-xl shadow-md ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Avatar"
            className="w-10 h-10 rounded-3xl"
          />
          <p className="flex flex-col text-white">
            <span className="text-lg font-bold ">Hello {user.username}</span>
            <span className="text-sm">
              {user.first_name} {user.last_name}
            </span>
          </p>
        </div>
        <MdNotifications
          size={30}
          fill="white"
        />
      </div>
    </div>
  );
}

export default TopNav;
