import PropTypes from "prop-types";
import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products, onAddToCart }) {
  if (products.length === 0) return <p className="text-center text-body-secondary py-5">No products match your search.</p>;
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {products.map((p) => (
        <div className="col" key={p.id}>
          <ProductCard
            id={p.id}
            name={p.title}
            price={Number(p.price)}
            image={p.image}
            rating={p.rating?.rate ?? 0}
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
}
ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
