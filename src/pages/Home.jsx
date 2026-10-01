import { useMemo, useState } from "react";
import { useShop } from "../context/ShopContext.jsx";
import ProductList from "../components/ProductList.jsx";
import Skeletons from "../components/Skeletons.jsx";

export default function Home() {
  const { products, loading, error, reload, addToCart } = useShop();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("none");

  const visible = useMemo(() => {
    const list = products.filter((p) => p.title.toLowerCase().includes(query.trim().toLowerCase()));
    if (sort === "asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, query, sort]);

  return (
    <>
      <h1 className="mb-3">Products</h1>
      <div className="row g-2 mb-4">
        <div className="col-md-8">
          <input type="search" className="form-control" placeholder="Search by name…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search products" />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            <option value="none">Sort: default</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {loading && (
        <>
          <div className="d-flex align-items-center gap-2 mb-3" role="status">
            <div className="spinner-border spinner-border-sm" /> <span>Loading products…</span>
          </div>
          <Skeletons />
        </>
      )}
      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <span>Couldn't load products: {error}</span>
          <button className="btn btn-sm btn-danger" onClick={reload}>Try again</button>
        </div>
      )}
      {!loading && !error && <ProductList products={visible} onAddToCart={addToCart} />}
    </>
  );
}
