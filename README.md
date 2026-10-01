# React Assessment – Dokan 

A React Project that shows products like online stores.

## Run it
```bash
npm install
npm run dev      
npm run build    
```

## Where each section lives
| Section | Files |
|---|---|
| A – Props, `.map()`, PropTypes | `components/ProductCard.jsx`, `components/ProductList.jsx` |
| B – Cart count, search, sort | `components/Navbar.jsx`, `pages/Home.jsx`, `context/ShopContext.jsx` |
| C – `useEffect` fetch, loading, error | `context/ShopContext.jsx`, `pages/Home.jsx` |
| D – Controlled form + validation | `pages/AddProduct.jsx` |
| E – Routing (`/`, `/product/:id`, `/cart`, 404) | `App.jsx`, `pages/*` |

## Testing the error state (C.3)
In `src/context/ShopContext.jsx`, change `API_URL` to a wrong URL (e.g. `https://fakestoreapi.com/productz`). The page shows an error message with a "Try again" button.

## Assumptions
- Products come from `https://fakestoreapi.com/products`; products and the cart live in a shared React Context so every route sees the same data.
- The cart and newly added products are kept in memory only (they reset on a full page refresh).
- The "Add New Product" form is on its own route, `/add`; a successful submit returns to `/` with the new product at the top, with no page reload.
- Locally added products get a timestamp ID and are kept if the fetch is retried.
- Styling uses Bootstrap (installed via npm, imported in `src/main.jsx`); `src/index.css` holds only a few small extras.
- Cart count is the total quantity of items (adding the same product twice shows 2).


