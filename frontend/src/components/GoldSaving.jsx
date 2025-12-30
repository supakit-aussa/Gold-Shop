import { useEffect, useState } from "react";
import API from "../api";

export default function GoldSaving() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
  async function loadSaving() {
    try {
      const res = await fetch(`${API}/saving`);
      const data = await res.json();
      setList(data);
    } catch (err) {
      console.error("Failed to load saving:", err);
    }
  }

    loadSaving();   
    }, []);            


  async function saveGold() {
    try {
      await fetch(`${API}/saving`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          amount_paid: Number(amount),
        }),
      });

      setName("");
      setAmount("");

      // reload list
      const res = await fetch(`${API}/saving`);
      const data = await res.json();
      setList(data);
    } catch (err) {
      console.error("Save failed:", err);
    }
  }

  return (
    <>
      <h2>ออมทอง</h2>

      <input
        placeholder="ชื่อ"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="จำนวนเงิน (บาท)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={saveGold}>ออมทอง</button>

      <ul>
        {list.map((s) => (
          <li key={s.id}>
            {s.customer_name} → {s.gold_grams} กรัม
          </li>
        ))}
      </ul>
    </>
  );
}

