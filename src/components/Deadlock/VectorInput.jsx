const VectorInput = ({ label, value, onChange, placeholder }) => {
  return (
    <label className="flex items-center gap-3 w-full">
      <span className="w-44 text-sm text-gray-300 whitespace-nowrap">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
      />
    </label>
  );
};

export default VectorInput;
