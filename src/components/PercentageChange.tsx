interface PercentageChangeProps {
  percentage: number;
}

function PercentageChange({ percentage }: PercentageChangeProps) {
  const changeColor =
    percentage > 0
      ? "text-green-700 bg-green-300"
      : percentage < 0
      ? "text-red-700 bg-red-300"
      : "text-gray-700 bg-gray-300";
  return (
    <span className={`${changeColor} text-center p-1 rounded-xl`}>
      {percentage.toFixed(2)}%
    </span>
  );
}

export default PercentageChange;
