import { useEffect, useState } from "react";
import { formatQuantity, roundQuantity } from "../functions/utils";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  step?: number; // amount the +/- buttons move by (default 1 whole share)
  max?: number; // optional upper bound (e.g. quantity owned when selling)
}

function QuantityInput({ value, onChange, step = 1, max }: QuantityInputProps) {
  // Local text state so fractional input (e.g. "0.25", or the transient "0.")
  // types cleanly without being reformatted mid-keystroke.
  const [text, setText] = useState(value ? formatQuantity(value) : "");

  // Re-sync only when the value is changed from outside (e.g. percentage chips),
  // not while the user is typing the same value.
  useEffect(() => {
    const parsed = parseFloat(text);
    if (isNaN(parsed) || Math.abs(parsed - value) > 1e-9) {
      setText(value ? formatQuantity(value) : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const clamp = (n: number) => {
    if (n < 0) n = 0;
    if (max != null && n > max) n = roundQuantity(max);
    return roundQuantity(n);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow digits and a single decimal point while typing.
    if (raw !== "" && !/^\d*\.?\d*$/.test(raw)) return;
    setText(raw);
    const parsed = parseFloat(raw);
    onChange(isNaN(parsed) ? 0 : clamp(parsed));
  };

  const stepBy = (delta: number) => onChange(clamp((value || 0) + delta));

  return (
    <div className="flex items-center bg-transparent text-white rounded-lg p-2 justify-between w-11/12 min-h-25">
      <button
        onClick={() => stepBy(-step)}
        className="text-3xl px-4 py-2 bg-green-500  rounded-l-lg w-1/6 h-full"
      >
        -
      </button>
      <input
        type="text"
        inputMode="decimal"
        value={text}
        onChange={handleChange}
        placeholder="0"
        className="w-4/6 text-center texture-bg  text-white text-xl h-full"
      />
      <button
        onClick={() => stepBy(step)}
        className="text-3xl text-white px-4 py-2 bg-green-500 rounded-r-lg w-1/6 h-full"
      >
        +
      </button>
    </div>
  );
}

export default QuantityInput;
