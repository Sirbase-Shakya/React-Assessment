import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ id, name, price, image, rating, onAddToCart }) {
  return (
    <article className="card h-100 shadow-sm">
      {/* Clicking the image or title navigates to the details page */}
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className="card-img-top product-img" loading="lazy" />
      </Link>
      <div className="card-body d-flex flex-column">
        <h3 className="h6 clamp-2">
          <Link to={`/product/${id}`} className="text-body text-decoration-none">{name}</Link>
        </h3>
        <p className="text-body-secondary small mb-3">★ {rating.toFixed(1)}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <strong className="fs-5">${price.toFixed(2)}</strong>
          <button className="btn btn-info" onClick={() => onAddToCart(id)}><ShoppingCart /> Add to cart</button>
        </div>
      </div>
    </article>
  );
}

// Section A.3 – prop validation
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
