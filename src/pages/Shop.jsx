import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";
import "./Shop.css";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export default function Shop() {
  const { products } = useApp();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type");

  const [types, setTypes] = useState(() => (initialType ? [initialType] : []));
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [sort, setSort] = useState("newest");

  // Keep the type filter in sync if the user arrives via a new category link
  useEffect(() => {
    if (initialType) setTypes([initialType]);
  }, [initialType]);

  const toggleType = (type) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setTypes([]);
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setSort("newest");
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.slice();

    if (types.length > 0) {
      filtered = filtered.filter((p) => types.includes(p.type));
    }

    filtered = filtered.filter((p) => {
      const price = parseFloat(p.price) || 0;
      return price >= (minPrice || 0) && price <= (maxPrice || DEFAULT_MAX_PRICE);
    });

    if (sort === "price_low") {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === "price_high") {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [products, types, minPrice, maxPrice, sort]);

  return (
    <div className="section container">
      <h2 className="section-title">Shop All Clocks</h2>
      <div className="shop-container">
        <aside className="filters">
          <h3>Filters</h3>

          <div className="filter-group">
            <h3>Clock Type</h3>
            {[
              { id: "wall", label: "Wall Clocks" },
              { id: "alarm", label: "Alarm Clocks" },
              { id: "luxury", label: "Luxury Clocks" },
            ].map((opt) => (
              <div className="filter-option" key={opt.id}>
                <input
                  type="checkbox"
                  id={`${opt.id}Type`}
                  checked={types.includes(opt.id)}
                  onChange={() => toggleType(opt.id)}
                />
                <label htmlFor={`${opt.id}Type`}>{opt.label}</label>
              </div>
            ))}
          </div>

          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="price-range">
              <input
                type="number"
                aria-label="Minimum price"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="number"
                aria-label="Maximum price"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="filter-group">
            <h3>Sort By</h3>
            {[
              { id: "newest", label: "Newest" },
              { id: "price_low", label: "Price: Low to High" },
              { id: "price_high", label: "Price: High to Low" },
            ].map((opt) => (
              <div className="filter-option" key={opt.id}>
                <input
                  type="radio"
                  name="sort"
                  id={`sort-${opt.id}`}
                  checked={sort === opt.id}
                  onChange={() => setSort(opt.id)}
                />
                <label htmlFor={`sort-${opt.id}`}>{opt.label}</label>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-block" onClick={resetFilters}>
            Reset Filters
          </button>
        </aside>

        <div>
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h2>No products found</h2>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
