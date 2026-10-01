import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

export default function Cart() {
  const { products, cart, changeQty, removeFromCart } = useShop();
  const items = products.filter((p) => cart[p.id]);
  const total = items.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  if (items.length === 0)
    return (
      <div className="text-center py-5">
        <h1 className="h3">Your cart is empty</h1>
        <Link to="/" className="btn btn-primary mt-2">Browse products</Link>
      </div>
    );

  return (
    <>
      <h1 className="mb-3">Cart</h1>
      <ul className="list-group mb-3">
        {items.map((p) => (
          <li key={p.id} className="list-group-item d-flex flex-wrap align-items-center gap-3">
            <img src={p.image} alt="" width="56" height="56" style={{ objectFit: "contain" }} className="bg-white rounded" />
            <Link to={`/product/${p.id}`} className="flex-grow-1 text-body clamp-2">{p.title}</Link>
            <div className="btn-group btn-group-sm" role="group" aria-label="Quantity">
              <button className="btn btn-outline-secondary" onClick={() => changeQty(p.id, -1)} aria-label="Decrease quantity">−</button>
              <span className="btn btn-outline-secondary disabled">{cart[p.id]}</span>
              <button className="btn btn-outline-secondary" onClick={() => changeQty(p.id, 1)} aria-label="Increase quantity">+</button>
            </div>
            <strong style={{ minWidth: 70 }} className="text-end">${(p.price * cart[p.id]).toFixed(2)}</strong>
            <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(p.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="text-end fs-4">Total: <strong>${total.toFixed(2)}</strong></p>
    </>
  );
}
