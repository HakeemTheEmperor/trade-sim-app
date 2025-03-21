interface StockItemProps {
  symbol: string;
  companyName: string;
  currentPrice: number;
  percentageChange: number;
  logo: string;
}

function StockItem({
  symbol,
  companyName,
  currentPrice,
  percentageChange,
  logo,
}: StockItemProps) {
  const changeColor =
    percentageChange > 0
      ? "text-green-700 bg-green-300"
      : percentageChange < 0
      ? "text-red-700 bg-red-300"
      : "text-gray-700 bg-gray-300"; // Or "text-white" for dark themes
  return (
    <li className="flex justify-between w-full mb-2 bg-gray-500 rounded-md p-4">
      <div className="flex">
        <img
          src={logo}
          alt={`${symbol} logo`}
          className="w-12 h-12 mr-2"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-white">{companyName}</span>
          <span className="text-gray-300">{symbol}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-white">${currentPrice.toFixed(2)}</span>
        <span className={`${changeColor} text-center p-1 rounded-sm`}>
          {percentageChange.toFixed(2)}%
        </span>
      </div>
    </li>
  );
}

export default StockItem;
