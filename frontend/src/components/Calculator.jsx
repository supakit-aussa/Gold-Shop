import { useState } from "react";
import API from "../api";

export default function Calculator() {
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calc = async () => {
    const r = await fetch(`${API}/calculate?weight=${weight}`);
    const d = await r.json();
    setResult(d.estimated);
  };

  return (
    <>
      <h3>Price Calculator</h3>
      <input value={weight} onChange={e => setWeight(e.target.value)} />
      <button onClick={calc}>Calculate</button>
      {result && <p>{result} THB</p>}
    </>
  );
}
