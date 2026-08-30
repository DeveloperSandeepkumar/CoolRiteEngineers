import React, { useState, useMemo } from "react";
import { productCategories, allProducts } from "./productsData";
import SEO from "./SEO";
import "./OurProduct.css";
import { 
  FaThLarge, 
  FaFan, 
  FaBolt, 
  FaWater, 
  FaFireExtinguisher, 
  FaCrosshairs, 
  FaIndustry, 
  FaSearch, 
  FaCheckCircle, 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaTimes, 
  FaArrowRight 
} from "react-icons/fa";

export default function OurProduct() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Category Icon Resolver
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "FaFan": return <FaFan />;
      case "FaBolt": return <FaBolt />;
      case "FaWater": return <FaWater />;
      case "FaFireExtinguisher": return <FaFireExtinguisher />;
      case "FaCrosshairs": return <FaCrosshairs />;
      case "FaIndustry": return <FaIndustry />;
      default: return <FaThLarge />;
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.applications.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="products-page-wrapper">
      <SEO 
        title="Manufactured Products | HVAC, Electrical, Plumbing, Fire Fighting, CNC Laser & Sheet Metal | CoolRite Engineers"
        description="Explore CoolRite Engineers manufactured product catalog: AHU components, GI ducting, electrical enclosures, cable trays, pipe supports, fire fighting headers, CNC laser cutting, and custom sheet metal."
        canonicalUrl="https://www.coolriteengineers.com/OurProduct"
      />

      {/* Hero Banner */}
      <section className="products-hero-banner">
        <div className="container">
          <span className="products-hero-badge">Engineering & Manufacturing Excellence</span>
          <h1 className="products-hero-title">Industrial Manufactured Products</h1>
          <p className="products-hero-subtitle">
            CoolRite Engineers manufactures high-precision HVAC components, electrical panels, plumbing supports, fire safety hardware, CNC laser cut parts, and custom sheet metal solutions.
          </p>

          {/* Search Bar */}
          <div className="products-search-box">
            <FaSearch className="products-search-icon" />
            <input 
              type="text"
              className="products-search-input"
              placeholder="Search products (e.g. AHU, Cable Tray, Laser Cutting, Dampers)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="container">
        <div className="products-filter-container">
          {productCategories.map((cat) => {
            const count = cat.id === "all" 
              ? allProducts.length 
              : allProducts.filter(p => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                className={`category-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
                <span className="category-count-badge">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-2">
          <p className="text-muted small mb-0">
            Showing <strong>{filteredProducts.length}</strong> products
            {activeCategory !== "all" && ` in ${productCategories.find(c => c.id === activeCategory)?.name}`}
          </p>
          {searchQuery && (
            <button 
              className="btn btn-sm btn-outline-secondary rounded-pill"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 shadow-sm my-4">
            <h4 className="fw-bold text-dark mb-2">No Products Found</h4>
            <p className="text-muted mb-3">Try clearing your search query or switching categories.</p>
            <button 
              className="btn btn-primary rounded-pill px-4"
              style={{ background: "#0A2540", borderColor: "#0A2540" }}
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                <div className="product-card" onClick={() => setSelectedProduct(product)}>
                  
                  {/* Image Container */}
                  <div className="product-image-container">
                    <span className="product-cat-tag">{product.categoryName}</span>
                    <img 
                      src={product.image} 
                      alt={`${product.name} manufacturing by CoolRite Engineers`}
                      className="product-card-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="product-card-body">
                    <h3 className="product-card-title">{product.name}</h3>
                    <p className="product-card-desc">{product.shortDesc}</p>

                    <div className="product-spec-pills">
                      <span className="product-spec-pill"><strong>Material:</strong> {product.material.split('/')[0]}</span>
                      <span className="product-spec-pill"><strong>Gauge:</strong> {product.thickness.split(',')[0]}</span>
                    </div>

                    <button className="product-inquire-btn">
                      View Specs & Inquire <FaArrowRight style={{ fontSize: "0.8rem" }} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="product-modal-header">
              <button 
                className="product-modal-close-btn"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close"
              >
                <FaTimes />
              </button>
              <span className="badge bg-warning text-dark px-3 py-1 mb-2 fw-bold">
                {selectedProduct.categoryName}
              </span>
              <h2 className="h3 fw-bold text-white mb-0">{selectedProduct.name}</h2>
            </div>

            {/* Body */}
            <div className="product-modal-body">
              <p className="lead fs-6 text-muted mb-4">{selectedProduct.shortDesc}</p>

              <h4 className="fw-bold mb-3" style={{ color: "#0A2540", fontSize: "1.1rem" }}>Technical Specifications</h4>
              <table className="product-spec-table">
                <tbody>
                  <tr>
                    <th>Material</th>
                    <td>{selectedProduct.material}</td>
                  </tr>
                  <tr>
                    <th>Thickness / Gauge</th>
                    <td>{selectedProduct.thickness}</td>
                  </tr>
                  <tr>
                    <th>Surface Finish</th>
                    <td>{selectedProduct.finish}</td>
                  </tr>
                  <tr>
                    <th>Applications</th>
                    <td>{selectedProduct.applications}</td>
                  </tr>
                  <tr>
                    <th>Compliance Standards</th>
                    <td>{selectedProduct.standards}</td>
                  </tr>
                </tbody>
              </table>

              <h4 className="fw-bold mb-3" style={{ color: "#0A2540", fontSize: "1.1rem" }}>Key Engineering Highlights</h4>
              <ul className="product-modal-features">
                {selectedProduct.features.map((feat, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="text-success flex-shrink-0 mt-1" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="product-modal-actions">
                <a 
                  href={`https://wa.me/917009167480?text=${encodeURIComponent(`Hello CoolRite Engineers, I am interested in inquiring about ${selectedProduct.name} (${selectedProduct.categoryName}). Please share quote and specifications.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-modal-quote-btn"
                >
                  <FaWhatsapp style={{ fontSize: "1.2rem" }} />
                  Request WhatsApp Quote
                </a>

                <a 
                  href="tel:+917009167480"
                  className="product-modal-call-btn"
                >
                  <FaPhoneAlt />
                  Call Engineer
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
