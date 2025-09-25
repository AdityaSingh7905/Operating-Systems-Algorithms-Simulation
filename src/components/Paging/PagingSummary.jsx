const PagingSummary = ({ totalRequests, pageFaults }) => {
  const pageHits = totalRequests - pageFaults;
  const faultRatio = ((pageFaults / totalRequests) * 100).toFixed(2);

  return (
    <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow px-4 py-6 my-4 mx-auto">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-sm text-gray-400">Total Requests</p>
          <p className="text-2xl font-bold">{totalRequests}</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-sm text-gray-400">Page Faults</p>
          <p className="text-2xl font-bold text-red-400">{pageFaults}</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-sm text-gray-400">Hits</p>
          <p className="text-2xl font-bold text-green-400">{pageHits}</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-sm text-gray-400">Fault Ratio</p>
          <p className="text-2xl font-bold">{faultRatio}%</p>
        </div>
      </div>
    </div>
  );
};

export default PagingSummary;
