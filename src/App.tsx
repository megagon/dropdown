import './App.css';
import { AutoSuggest } from './Dropdown/';
import { useDataLoader } from './hooks/useDataLoader';

function App() {
  const {values: {data, loading} } = useDataLoader();
  return (
    <div className="App">
      <AutoSuggest data={data?.results || []} loading={loading}/>
    </div>
  );
}

export default App;
