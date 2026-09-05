import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { products } = useApp();
  const featured = products.slice(0, 4);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <section className="section container" style={{ background: "white" }}>
        <h2 className="section-title">Featured Products</h2>
        {featured.length === 0 ? (
          <div className="spinner" />
        ) : (
          <div className="grid grid-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
