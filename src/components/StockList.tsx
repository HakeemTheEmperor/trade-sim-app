import StockItem from "./StockItem";
import { StockListProp } from "../mockData/Data";

function StockList({ heading, stockData }: StockListProp) {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="main_text text-xl p-2 antialiased font-bold">
          {heading}
        </h2>
        <p className="text-green-600 p-2">view all &rarr;</p>
      </div>
      <ul className="flex flex-col list-none py-4">
        {stockData.map((stock) => (
          <StockItem
            key={stock.id}
            symbol={stock.symbol}
            companyName={stock.company_name}
            currentPrice={stock.price.current_price}
            percentageChange={stock.price.percentage_change}
            logo={stock.image}
          />
        ))}
      </ul>
    </>
  );
}

export default StockList;
