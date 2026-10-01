import PropTypes from "prop-types";


export default function Skeletons({ count = 8 }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div className="col" key={i}>
          <div className="card h-100 placeholder-glow">
            <div className="placeholder product-img w-100" />
            <div className="card-body">
              <span className="placeholder col-10 mb-2" />
              <span className="placeholder col-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
Skeletons.propTypes = { count: PropTypes.number };
