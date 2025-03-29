interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

function QuantityInput({ value, onChange }: QuantityInputProps) {
  const handleIncrease = () => onChange(value + 1);
  const handleDecrease = () => onChange(value - 1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      onChange(newValue);
    } else {
      onChange(0); // Default to 1 if the input is invalid
    }
  };

  return (
    <div className="flex items-center bg-transparent text-white rounded-lg p-2 justify-between w-11/12 min-h-25">
      <button
        onClick={handleDecrease}
        className="text-3xl px-4 py-2 bg-green-500  rounded-l-lg w-1/6 h-full"
      >
        -
      </button>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-4/6 text-center texture-bg  text-white text-xl h-full"
      />
      <button
        onClick={handleIncrease}
        className="text-3xl text-white px-4 py-2 bg-green-500 rounded-r-lg w-1/6 h-full"
      >
        +
      </button>
    </div>
  );
}

export default QuantityInput;
