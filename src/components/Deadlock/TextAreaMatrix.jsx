const TextAreaMatrix = ({ label, value, onChange, placeholder }) => {
  return (
    <label className="flex items-start gap-3 w-full">
      <span className="w-44 pt-2 text-sm text-gray-300 whitespace-nowrap">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
      />
    </label>
  );
};

export default TextAreaMatrix;
