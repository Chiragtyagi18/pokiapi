import './style.css';
const types = [
  '', 'fire', 'water', 'grass', 'electric', 'bug', 'normal',
  'poison', 'fairy', 'ground', 'fighting', 'psychic', 'rock', 'ghost', 'dragon'
];

const SearchBar = ({ search, setSearch, typeFilter, setTypeFilter }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search Pokémon"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

export default SearchBar;
