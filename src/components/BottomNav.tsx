import { LuChartNoAxesCombined } from "react-icons/lu";
import { FaBookmark, FaUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";

function BottomNav() {
  return (
    <div className="sticky bottom-0 w-full p-3 z-10 bg-zinc-100">
      <ul className="flex justify-around">
        <li className="flex flex-col justify-center">
          <MdHome
            className="w-full"
            size={20}
          />
          <span className="font-semibold">Portfolio</span>
        </li>
        <li className="flex flex-col justify-center">
          <FaBookmark
            className="w-full"
            size={20}
          />
          <span className="font-semibold">Watchlist</span>
        </li>
        <li className="flex flex-col justify-center">
          <LuChartNoAxesCombined
            className="w-full"
            size={20}
          />
          <span className="font-semibold">Market</span>
        </li>
        <li className="flex flex-col justify-center">
          <FaUser
            className="w-full"
            size={20}
          />
          <span className="font-semibold">Account</span>
        </li>
      </ul>
    </div>
  );
}

export default BottomNav;
