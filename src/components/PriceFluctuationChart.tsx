import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockPriceData {
  id: number;
  symbol: string;
  date: string;
  cp: string;
}

interface PriceFluctuationChartProps {
  data: StockPriceData[];
}

function PriceFluctuationChart({ data }: PriceFluctuationChartProps) {
  const labels = data.map((item) =>
    new Date(item.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );
  const closePrices = data.map((item) => parseFloat(item.cp));
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${data[0]?.symbol} Close Price`,
        data: closePrices,
        borderColor: "rgba(117, 251, 76, 1)",
        backgroundColor: "rgba(117, 251, 76, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 1,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: `${data[0]?.symbol} Price Fluctuation`,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          display: false, // White ticks
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md">
      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default PriceFluctuationChart;
