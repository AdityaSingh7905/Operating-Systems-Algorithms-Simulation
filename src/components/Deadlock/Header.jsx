const Header = ({ algo }) => {
  return (
    <div className="w-full max-w-6xl flex flex-col gap-4 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mx-auto font-bold">{algo}</h1>
      </div>
      <p className="text-gray-300 mx-auto text-sm">
        Enter matrices below. Separate numbers with spaces or commas, rows by
        newlines or semicolons. Use the sample buttons to try a safe/unsafe
        case.
      </p>
    </div>
  );
};

export default Header;
