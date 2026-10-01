import { createContext, useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const API_URL = "https://fakestoreapi.com/products";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
      const data = await res.json();
      setProducts((prev) => [...prev.filter((p) => p.local), ...data]);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const changeQty = (id, delta) =>
    setCart((c) => {
      const qty = (c[id] || 0) + delta;
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  const removeFromCart = (id) => changeQty(id, -Infinity);
  const addProduct = (p) =>
    setProducts((prev) => [{ ...p, id: Date.now(), local: true, rating: { rate: 0, count: 0 } }, ...prev]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <ShopContext.Provider
      value={{ products, loading, error, reload: load, cart, cartCount, addToCart, changeQty, removeFromCart, addProduct }}
    >
      {children}
    </ShopContext.Provider>
  );
}
ShopProvider.propTypes = { children: PropTypes.node };

export const useShop = () => useContext(ShopContext);
