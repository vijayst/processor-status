import { useState } from 'react';
import './App.css';
import Chart from './chart/Chart';
import LoadData from './LoadData';

function App() {
  const [refreshKey, setRefreshKey] = useState();
  return (
    <div className="app">
      <LoadData setRefreshKey={setRefreshKey} />
      <Chart refreshKey={refreshKey} />
    </div>
  );
}

export default App;
