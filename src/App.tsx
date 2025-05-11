import "./App.scss";
import { Provider } from 'react-redux';
import { store } from './store';
import BetBulletinTable from "./components/BetBulletin/BetBulletinTable";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Bet Bulletin</h1>
        <BetBulletinTable />
      </div>
    </Provider>
  );
}

export default App;
