import { useEffect, useState } from "react";
import API from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(setProducts);
  }, []);

  return (
    <>
      <h2>สินค้า</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} ({p.purity}) – {p.weight} กรัม
          </li>
        ))}
      </ul>
    </>
  );
}
