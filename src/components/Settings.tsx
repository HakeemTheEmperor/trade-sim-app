import { FaRegUser, FaLock } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { logout } from "../functions/authService";

function Settings() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="text-white rounded-md transparent_light py-5 px-3 my-2">
      <h3 className="font-bold text-2xl">Settings</h3>
      <ul className="my-5 list-none">
        <li className="flex justify-between items-center p-3 border-b-2 border-gray-700 cursor-not-allowed">
          <div className="flex gap-10 items-center text-md">
            <FaRegUser
              className="text-green-600"
              size={20}
            />
            <span>Profile Setting</span>
          </div>
          <span className="text-green-600 text-xl">&gt;</span>
        </li>
        <li className="flex justify-between items-center p-3 border-b-2 border-gray-700 cursor-not-allowed">
          <div className="flex gap-10 items-center text-md">
            <MdOutlinePayment
              className="text-green-600"
              size={20}
            />
            <span>Payment Method</span>
          </div>
          <span className="text-green-600 text-xl">&gt;</span>
        </li>
        <li className="flex justify-between items-center p-3 border-b-2 border-gray-700 cursor-not-allowed">
          <div className="flex gap-10 items-center text-md">
            <FaLock
              className="text-green-600"
              size={20}
            />
            <span>Security</span>
          </div>
          <span className="text-green-600 text-xl">&gt;</span>
        </li>
        <li className="flex justify-between items-center p-3 border-b-2 border-gray-700 cursor-not-allowed">
          <div className="flex gap-10 items-center text-md">
            <FiSettings
              className="text-green-600"
              size={20}
            />
            <span>Help and Settings</span>
          </div>
          <span className="text-green-600 text-xl">&gt;</span>
        </li>
        <li
          className="flex justify-between items-center p-3 border-b-2 border-gray-700 cursor-pointer"
          onClick={handleLogout}
        >
          <div className="flex gap-10 items-center text-md">
            <FiLogOut
              className="text-green-600"
              size={20}
            />
            <span>Logout</span>
          </div>
          <span className="text-green-600 text-xl">&gt;</span>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
