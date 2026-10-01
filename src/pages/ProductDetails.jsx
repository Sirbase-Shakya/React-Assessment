import { Link, useNavigate, useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, addToCart } = useShop();
  const product = products.find((p) => String(p.id) === id);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status" /></div>;
  if (!product)
    return (
      <div className="alert alert-warning">
        We couldn't find that product. <Link to="/">Back to products</Link>
      </div>
    );

  return (
    <>
      <button className="btn btn-outline-secondary btn-sm mb-3" onClick={() => navigate(-1)}>← Back</button>
      <section className="row g-4">
        <div className="col-md-5">
          <img src={product.image} alt={product.title} className="img-fluid rounded border bg-white p-4 w-100" style={{ maxHeight: 420, objectFit: "contain" }} />
        </div>
        <div className="col-md-7">
          <span className="badge text-bg-secondary mb-2">{product.category}</span>
          <h1 className="h2">{product.title}</h1>
          <p className="text-body-secondary">★ {(product.rating?.rate ?? 0).toFixed(1)} ({product.rating?.count ?? 0} reviews)</p>
          <p>{product.description || "No description provided."}</p>
          <p className="display-6 fw-bold">${Number(product.price).toFixed(2)}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add to cart</button>
        </div>
      </section>
    </>
  );
}
