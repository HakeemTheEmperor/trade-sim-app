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
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface HistoryPoint {
  date: string;
  cp: string;
}

export interface CompareSeries {
  symbol: string;
  history: HistoryPoint[];
}

interface CompareChartProps {
  series: CompareSeries[]; // exactly two
  mode: "normalized" | "absolute";
}

// Two distinct line colours for the overlay.
const COLORS = ["rgba(117, 251, 76, 1)", "rgba(76, 168, 251, 1)"];

// Index a series to its first point: percentage change from the start. Lets two
// stocks on very different price scales be compared by shape/relative performance.
function normalize(values: number[]): number[] {
  const base = values[0];
  if (!base) return values.map(() => 0);
  return values.map((v) => ((v - base) / base) * 100);
}

function CompareChart({ series, mode }: CompareChartProps) {
  // Align the two series on the dates they have in common (histories can differ
  // in length/range), so every plotted point exists for both stocks.
  const dateMaps = series.map((s) => {
    const map = new Map<string, number>();
    s.history.forEach((p) => map.set(p.date, parseFloat(p.cp)));
    return map;
  });

  const commonDates = [...dateMaps[0].keys()]
    .filter((d) => dateMaps.every((m) => m.has(d)))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  if (commonDates.length === 0) {
    return (
      <div className="p-4 bg-gray-900 rounded-lg text-center text-gray-400 text-sm">
        No overlapping dates between these stocks — can't chart them together.
      </div>
    );
  }

  const labels = commonDates.map((d) =>
    new Date(d).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  const datasets = series.map((s, i) => {
    const raw = commonDates.map((d) => dateMaps[i].get(d) as number);
    const values = mode === "normalized" ? normalize(raw) : raw;
    return {
      label: s.symbol,
      data: values,
      borderColor: COLORS[i],
      backgroundColor: COLORS[i],
      fill: false,
      tension: 0.3,
      pointRadius: 1,
      borderWidth: 1.5,
    };
  });

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: "#fff" } },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) =>
            mode === "normalized"
              ? `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`
              : `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: { grid: { display: true }, ticks: { display: false } },
      y: {
        grid: { display: false },
        ticks: {
          color: "#9ca3af",
          callback: (value: any) =>
            mode === "normalized" ? `${value}%` : `$${value}`,
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md">
      <Line
        data={{ labels, datasets }}
        options={options}
      />
    </div>
  );
}

export default CompareChart;
