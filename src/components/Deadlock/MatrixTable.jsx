const MatrixTable = ({ title, data }) => {
  if (!data?.length) return null;
  return (
    <div className="overflow-x-auto">
      <div className="text-sm mb-2 text-gray-300">{title}</div>
      <table className="text-sm border border-gray-700 rounded overflow-hidden">
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="divide-x divide-gray-700">
              {row.map((v, j) => (
                <td key={j} className="px-3 py-1 bg-gray-900/80">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixTable;
