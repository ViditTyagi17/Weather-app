function SearchHistory({ history, onSelect }) {
  
  if (!history.length) return;
  return (
    <div className="w-full sm:w-md  p-4 bg-white rounded-lg shadow-md m-2">
      <h1 className="text-gray-700 font-semibold text-sm mb-2 uppercase tracking-wide">Recent Search</h1>
      <ul className="max-h-40 overflow-auto divide-y divide-gray-200">
        {history.map((item) => (
          <li
            className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors"
            key={item}
            onMouseDown={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
