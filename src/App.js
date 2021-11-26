import './App.css';
import Chart from './chart/Chart';
import LoadData from './LoadData';

function App() {
  return (
    <div className="app">
      <LoadData />
      <Chart />
    </div>
  );
}

export default App;
