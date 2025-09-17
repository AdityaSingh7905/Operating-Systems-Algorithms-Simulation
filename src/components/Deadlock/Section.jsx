const Section = ({ title, children }) => {
  return (
    <div className="w-full max-w-6xl bg-gray-800/60 border border-gray-700 rounded-2xl p-5 shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Section;
