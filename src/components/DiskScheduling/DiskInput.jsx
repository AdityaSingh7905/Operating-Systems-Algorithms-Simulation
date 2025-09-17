const DiskInput = ({ head, setHead, requestsInput, setRequestsInput }) => {
  return (
    <>
      <div className="my-2">
        <label className="block text-sm font-medium text-white">
          Head [0 - 199]
        </label>
        <input
          type="number"
          value={head}
          onChange={(e) => setHead(Number(e.target.value))}
          className="mt-1 block w-full bg-gray-700 border-none rounded px-3 py-2 text-white"
        />
      </div>

      <div className="my-2">
        <label className="block text-sm font-medium text-white">
          Requests (comma separated) [0 - 199]
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={requestsInput}
            onChange={(e) => setRequestsInput(e.target.value)}
            className="flex-1 border-none bg-gray-700 rounded px-3 py-2 text-white"
          />
        </div>
      </div>
    </>
  );
};

export default DiskInput;
