import React, { useState } from 'react';
import hogs from  "./components/Porker_data.jsx";
import HogTile from "./components/HogTile.jsx";
import HogForm from "./components/HogForm.jsx";
function App() {
  const [hogList, setHogList] = useState(hogs);
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [hiddenHogs, setHiddenHogs] = useState(new Set());

  // Toggle the visibility of the hogs
  const toggleHogVisibility = (name) => {
    setHiddenHogs((prev) => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  // Filter hogs based on grease status
  const filteredHogs = greasedOnly
    ? hogList.filter((hog) => hog.greased)
    : hogList;

  // Sort hogs based on the selected option
  const sortedHogs = filteredHogs.sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'weight') return a.weight - b.weight;
    return 0;
  });

  // Add new hog to the list
  const addHog = (newHog) => {
    setHogList((prev) => [...prev, newHog]);
  };

  return (
    <div className="App">
      <h1>Hogwild</h1>
      
      {/* Filters and Sort */}
      <label>
        <input
          type="checkbox"
          checked={greasedOnly}
          onChange={() => setGreasedOnly(!greasedOnly)}
        />
        Show Greased Only
      </label>

      <label>
        Sort by:
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Select</option>
          <option value="name">Name</option>
          <option value="weight">Weight</option>
        </select>
      </label>

      {/* Hog Tiles */}
      <div className="hog-grid">
        {sortedHogs.map((hog) =>
          hiddenHogs.has(hog.name) ? null : (
            <HogTile
              key={hog.name}
              hog={hog}
              onToggleHide={() => toggleHogVisibility(hog.name)}
            />
          )
        )}
      </div>

      {/* Add New Hog Form */}
      <HogForm onAddHog={addHog} />
    </div>
  );
}

export default App;
