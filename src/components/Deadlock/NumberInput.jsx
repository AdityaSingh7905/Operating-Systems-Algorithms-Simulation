const NumberInput = ({ label, value, onChange, min = 0, max = 999 }) => {
  return (
    <label className="flex items-center gap-3 w-full">
      <span className="w-44 text-sm text-gray-300 whitespace-nowrap">
        {label}
      </span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
};

export default NumberInput;
