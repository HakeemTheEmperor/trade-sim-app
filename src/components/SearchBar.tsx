import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

function SearchBar() {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="relative w-full my-4">
      {/* Search Bar */}
      <div className="flex items-center bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-300 w-full">
        <CiSearch className="w-5 h-5 text-gray-600 cursor-pointer" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none px-2 flex-1 text-gray-700 placeholder-gray-400 w-full"
        />
        <HiOutlineAdjustmentsHorizontal
          className="w-5 h-5 text-gray-600 cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className=" mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md p-3 z-10">
          <h3 className="text-gray-700 font-semibold mb-2">Filters</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
              />
              Only show recent results
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
              />
              Include archived data
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
              />
              Sort by relevance
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
