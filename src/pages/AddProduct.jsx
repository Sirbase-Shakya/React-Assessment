import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];
const empty = { title: "", price: "", image: "", category: CATEGORIES[0] };

function validate({ title, price, image }) {
  const errors = {};
  if (!title.trim()) errors.title = "Enter a product name.";
  if (price === "" || isNaN(Number(price)) || Number(price) <= 0) errors.price = "Enter a price greater than 0.";
  try {
    const u = new URL(image);
    if (!["http:", "https:"].includes(u.protocol)) throw new Error();
  } catch {
    errors.image = "Enter a full image URL starting with http:// or https://.";
  }
  return errors;
}

export default function AddProduct() {
  const { addProduct } = useShop();
  const navigate = useNavigate();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (Object.keys(errors).length) setErrors(validate(next));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    addProduct({ ...values, title: values.title.trim(), price: Number(values.price), description: "" });
    navigate("/");
  };

  const field = (name, label, props = {}) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <input id={name} name={name} value={values[name]} onChange={handleChange}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`} {...props} />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="border rounded w-75 m-auto">
      <h1 className="mb-3 text-center">Add a product</h1>
      <form className="col-md-8 col-lg-6 p-0 m-auto p-5" onSubmit={handleSubmit} noValidate>
        {field("title", "Product name")}
        {field("price", "Price (USD)", { type: "number", step: "0.01", min: "0" })}
        {field("image", "Image URL", { placeholder: "https://…" })}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select id="category" name="category" className="form-select" value={values.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add product</button>
      </form>
    </div>
  );
}
