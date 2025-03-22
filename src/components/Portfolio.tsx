import PercentageChange from "./PercentageChange";

function Portfolio() {
  return (
    <div className="py-15 transparent_light rounded-3xl shadow-xl p-2 text-white flex justify-between">
      <div className="w-full flex flex-col justify-center items-start pl-3 gap-2">
        <span className="text-gray-400 text-md">My Portfolio</span>
        <span className="text-3xl">$258,105</span>
      </div>
      <div className="w-full flex flex-col justify-center items-end pr-3 gap-2">
        <span>Profit</span>
        <PercentageChange percentage={15.23} />
        <span>$12,030,801</span>
      </div>
    </div>
  );
}

export default Portfolio;
