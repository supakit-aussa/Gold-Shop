import { useEffect, useState } from "react";
import API from "../api";

export default function GoldPrice() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetch(`${API}/gold-price`)
      .then(r => r.json())
      .then(setPrice);
  }, []);

  if (!price) return null;

  return (
    <>
      <h2>ราคาทองวันนี้</h2>
      <p>รับซื้อ: 66,000 บาท</p>
      <p>ขายออก: 67,000 บาท</p>
    </>
  );
}
