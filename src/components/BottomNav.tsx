import { LuChartNoAxesCombined } from "react-icons/lu";
import { FaBookmark, FaUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full p-3 z-10 bg-white rounded-md shadow-md">
      <ul className="flex justify-around">
        <NavLink
          to="/portfolio"
          className={({ isActive }) => (isActive ? "text-green-600" : "")}
        >
          <li className="flex flex-col justify-center items-center">
            <MdHome
              className="w-full"
              size={20}
            />
            <span className="font-semibold">Portfolio</span>
          </li>
        </NavLink>
        <NavLink
          to="/learn"
          className={({ isActive }) => (isActive ? "text-green-600" : "")}
        >
          <li className="flex flex-col justify-center items-center">
            <FaBookmark
              className="w-full"
              size={20}
            />
            <span className="font-semibold">Learn</span>
          </li>
        </NavLink>
        <NavLink
          to="/market"
          className={({ isActive }) => (isActive ? "text-green-600" : "")}
        >
          <li className="flex flex-col justify-center items-center">
            <LuChartNoAxesCombined
              className="w-full"
              size={20}
            />
            <span className="font-semibold">Market</span>
          </li>
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? "text-green-600" : "")}
        >
          <li className="flex flex-col justify-center items-center">
            <FaUser
              className="w-full"
              size={20}
            />
            <span className="font-semibold">Account</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default BottomNav;
