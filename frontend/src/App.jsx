import GoldPrice from "./components/GoldPrice";
import Products from "./components/Products";
import Calculator from "./components/Calculator";
import PriceChart from "./components/PriceChart";
import GoldSaving from "./components/GoldSaving";
import Admin from "./components/Admin";

export default function App() {
  return (
    <div className="app">
      <h1>ร้านทองเยาวราชนากลาง</h1>

      <div className="card">
        <GoldPrice />
      </div>

      <div className="card">
        <Calculator />
      </div>

      <div className="card">
        <PriceChart />
      </div>

      <div className="card">
        <Products />
      </div>

      <div className="card">
        <GoldSaving />
      </div>

      <div className="card">
        <Admin />
      </div>
    </div>
  );
}

