const DiskInput = ({ head, setHead, requestsInput, setRequestsInput }) => {
  return (
    <>
      <div className="my-2">
        <label className="block text-sm font-medium text-white">
          Head [0 - 199]
        </label>
        <input
          type="text"
          value={head}
          placeholder="Eg: 50"
          onChange={(e) => setHead(e.target.value)}
          className="mt-1 block w-full bg-gray-700 border-none rounded px-3 py-2 text-white"
          required
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
            placeholder="Eg: 82,170,43,140,24,16,190"
            onChange={(e) => setRequestsInput(e.target.value)}
            className="flex-1 border-none bg-gray-700 rounded px-3 py-2 text-white"
            required
          />
        </div>
      </div>
    </>
  );
};

export default DiskInput;
