function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="backdrop-filter backdrop-blur-xs py-4 sticky top-16 z-40">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for inspiration"
            className="w-full pl-12 pr-4 py-3 bg-gray-900 text-white placeholder-gray-500 rounded-full border border-gray-800 focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-700 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
