import { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { stockSearch } from "../functions/stockService";
import { StockDataShort } from "../mockData/Data";
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("symbol");
  const [searchResults, setSearchResults] = useState<StockDataShort[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) return;
    const search = async () => {
      try {
        const result = await stockSearch(query, searchType);
        setSearchResults(result);
        setShowResults(true);
      } catch (error: any) {
        setSearchResults([]);
        setError(error.message);
      }
    };
    const debounce = setTimeout(search, 500);
    return () => clearTimeout(debounce);
  }, [query, searchType]);

  // Hide results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative w-full my-4"
      ref={searchRef}
    >
      {/* Search Bar */}
      <div className="flex items-center bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-300 w-full">
        <CiSearch className="w-5 h-5 text-gray-600 cursor-pointer" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setShowResults(true);
            setShowFilters(false);
          }}
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
        <div className="mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md p-3 z-10">
          <h3 className="text-gray-700 font-semibold mb-2">Filters</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="symbol"
                checked={searchType === "symbol"}
                onChange={() => setSearchType("symbol")}
                className="form-radio text-blue-500"
              />
              Search by Symbol
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="company"
                checked={searchType === "company"}
                onChange={() => setSearchType("company")}
                className="form-radio text-blue-500"
              />
              Search by Company Name
            </label>
          </div>
        </div>
      )}

      {showResults && query && (
        <ul className="w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md z-20 max-h-40 overflow-scroll">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Link
                key={index}
                to={`/market/stock/${result.symbol}`}
              >
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {searchType === "symbol"
                    ? result.symbol
                    : result.company_name}
                </li>
              </Link>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 text-center">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
