import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchStockData,
  fetchStockPriceHistory,
  stockSearch,
} from "../functions/stockService";
import { formatMarketCap } from "../functions/utils";
import CompareChart, { HistoryPoint } from "./CompareChart";
import PercentageChange from "./PercentageChange";

interface Snapshot {
  symbol: string;
  company_name: string;
  image: string;
  market_cap: number;
  sector: string;
  price: { current_price: number; percentage_change: number };
}

interface StockBundle {
  snapshot: Snapshot;
  history: HistoryPoint[];
}

async function loadStock(symbol: string): Promise<StockBundle | null> {
  const [snapshot, history] = await Promise.all([
    fetchStockData(symbol),
    fetchStockPriceHistory(symbol),
  ]);
  if (!snapshot) return null;
  return { snapshot, history: history ?? [] };
}

function Compare() {
  const { stockSymbol } = useParams();
  const [base, setBase] = useState<StockBundle | null>(null);
  const [other, setOther] = useState<StockBundle | null>(null);
  const [mode, setMode] = useState<"normalized" | "absolute">("normalized");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ symbol: string; company_name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load the base stock (the one we came from).
  useEffect(() => {
    if (!stockSymbol) return;
    loadStock(stockSymbol).then((b) => {
      if (!b) setError("Could not load this stock.");
      else setBase(b);
    });
  }, [stockSymbol]);

  // Debounced symbol search for the second stock.
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const run = async () => {
      try {
        const found = await stockSearch(query, "symbol");
        // Never offer the stock we're already comparing against.
        setResults(found.filter((r: any) => r.symbol !== stockSymbol));
      } catch {
        setResults([]);
      }
    };
    const debounce = setTimeout(run, 500);
    return () => clearTimeout(debounce);
  }, [query, stockSymbol]);

  const pickSecond = async (symbol: string) => {
    setError(null);
    setQuery("");
    setResults([]);
    const bundle = await loadStock(symbol);
    if (!bundle) setError("Could not load that stock.");
    else setOther(bundle);
  };

  if (!base) {
    return <p className="text-white">{error ?? "Loading stock..."}</p>;
  }

  const change = (b: StockBundle) => b.snapshot.price.percentage_change;
  // Highlight the better performer by % change when both are loaded.
  const baseWins = other ? change(base) >= change(other) : false;
  const otherWins = other ? change(other) > change(base) : false;

  const statRow = (label: string, a: React.ReactNode, b: React.ReactNode) => (
    <tr className="border-b border-gray-700">
      <td className="py-2 pr-2 text-gray-400 text-sm">{label}</td>
      <td className="py-2 px-2 text-center">{a}</td>
      <td className="py-2 px-2 text-center">{b}</td>
    </tr>
  );

  return (
    <div className="flex flex-col main_text text-white">
      <h2 className="text-2xl font-bold mb-1">Compare</h2>

      {/* Second-stock picker */}
      {!other ? (
        <div className="relative my-3">
          <p className="text-sm text-gray-300 mb-1">
            Compare <span className="font-bold">{base.snapshot.symbol}</span> with:
          </p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a stock symbol..."
            className="w-full p-2 rounded bg-white text-gray-700 outline-none"
          />
          {results.length > 0 && (
            <ul className="absolute w-full bg-white text-gray-700 border border-gray-300 mt-1 rounded-md shadow-md z-20 max-h-40 overflow-y-auto">
              {results.map((r) => (
                <li
                  key={r.symbol}
                  onClick={() => pickSecond(r.symbol)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {r.symbol} — {r.company_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between my-3">
          <p className="text-sm">
            <span className="font-bold">{base.snapshot.symbol}</span> vs{" "}
            <span className="font-bold">{other.snapshot.symbol}</span>
          </p>
          <button
            onClick={() => setOther(null)}
            className="text-xs px-2 py-1 rounded bg-gray-600"
          >
            Change
          </button>
        </div>
      )}

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      {other && (
        <>
          {/* Absolute / % toggle */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setMode("normalized")}
              className={`px-3 py-1 text-xs rounded ${
                mode === "normalized" ? "bg-green-600" : "bg-green-900 text-gray-300"
              }`}
            >
              % change
            </button>
            <button
              onClick={() => setMode("absolute")}
              className={`px-3 py-1 text-xs rounded ${
                mode === "absolute" ? "bg-green-600" : "bg-green-900 text-gray-300"
              }`}
            >
              Price
            </button>
          </div>

          <CompareChart
            series={[
              { symbol: base.snapshot.symbol, history: base.history },
              { symbol: other.snapshot.symbol, history: other.history },
            ]}
            mode={mode}
          />

          {/* Stats table */}
          <table className="w-full mt-4 table-fixed">
            <thead>
              <tr className="border-b-2 border-gray-600">
                <th className="py-2 text-left text-sm text-gray-400"></th>
                <th className={`py-2 text-center ${baseWins ? "text-green-400" : ""}`}>
                  {base.snapshot.symbol}
                </th>
                <th className={`py-2 text-center ${otherWins ? "text-green-400" : ""}`}>
                  {other.snapshot.symbol}
                </th>
              </tr>
            </thead>
            <tbody>
              {statRow(
                "Price",
                `$${base.snapshot.price.current_price.toFixed(2)}`,
                `$${other.snapshot.price.current_price.toFixed(2)}`
              )}
              {statRow(
                "Change",
                <PercentageChange percentage={change(base)} />,
                <PercentageChange percentage={change(other)} />
              )}
              {statRow(
                "Market Cap",
                `$${formatMarketCap(base.snapshot.market_cap)}`,
                `$${formatMarketCap(other.snapshot.market_cap)}`
              )}
              {statRow("Sector", base.snapshot.sector, other.snapshot.sector)}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Compare;
