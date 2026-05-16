import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaStar,
  FaLeaf,
  FaClock,
  FaTimes,
} from "react-icons/fa";

import "./css/Products.css";

function Products() {
  const navigate = useNavigate();
  const allProducts = [
    {
      id: 1,
      name: "Fresh Tomato",
      category: "Vegetables",
      price: 2,
      rating: 4.8,
      availableKg: 12,
      harvest: "Collected Today - 6:00 AM",
      image:
        "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
      description:
        "Fresh organic tomatoes directly collected from local farms.",
    },

    {
      id: 2,
      name: "Green Broccoli",
      category: "Organic",
      price: 4,
      rating: 4.9,
      availableKg: 8,
      harvest: "Collected Today - 7:30 AM",
      image:
        "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
      description:
        "Healthy green broccoli full of vitamins and nutrients.",
    },

    {
      id: 3,
      name: "Fresh Carrot",
      category: "Vegetables",
      price: 3,
      rating: 4.7,
      availableKg: 15,
      harvest: "Collected Today - 5:15 AM",
      image:
        "https://images.unsplash.com/photo-1447175008436-054170c2e979",
      description:
        "Crunchy and sweet carrots freshly harvested from the field.",
    },

    {
      id: 4,
      name: "Organic Capsicum",
      category: "Organic",
      price: 5,
      rating: 4.8,
      availableKg: 6,
      harvest: "Collected Today - 8:00 AM",
      image:
        "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
      description:
        "Farm fresh colorful capsicum with natural taste.",
    },

    {
      id: 5,
      name: "Fresh Spinach",
      category: "Leafy",
      price: 2,
      rating: 4.6,
      availableKg: 10,
      harvest: "Collected Today - 6:45 AM",
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
      description:
        "Fresh spinach leaves full of iron and natural freshness.",
    },

    {
      id: 6,
      name: "Organic Cucumber",
      category: "Vegetables",
      price: 3,
      rating: 4.7,
      availableKg: 20,
      harvest: "Collected Today - 9:00 AM",
      image:
        "https://images.unsplash.com/photo-1604977042946-1eecc30f269e",
      description:
        "Cool and refreshing cucumbers directly from organic farms.",
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // LOCAL STORAGE থেকে CART LOAD
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  // CART SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["All", "Vegetables", "Organic", "Leafy"];

  const filteredProducts = allProducts.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  // PRODUCT কতবার CART এ আছে
  const getProductQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);

    return item ? item.quantity : 0;
  };

  // ADD TO CART
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    // LIMIT CHECK
    if (
      existingItem &&
      existingItem.quantity >= product.availableKg
    ) {
      alert("Stock limit reached!");
      return;
    }

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  return (
    <div className="products-page">
      {/* HEADER */}

      <div className="top-bar">
        <div>
          <h1>Fresh Vegetable Market</h1>

          <p className="subtitle">
            Farm fresh vegetables collected every morning
          </p>
        </div>

        <div
  className="cart"
  onClick={() => navigate("/cart")}
  style={{ cursor: "pointer" }}
>
  <FaShoppingCart />

  <span>
    {cart.reduce(
      (total, item) => total + item.quantity,
      0
    )}
  </span>
</div>
      </div>

      {/* SEARCH */}

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search fresh vegetables..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <FaTimes
            className="clear-icon"
            onClick={() => setSearch("")}
          />
        )}
      </div>

      {/* CATEGORIES */}

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}

      <div className="products-container">
        {filteredProducts.map((product) => {
          const quantityInCart = getProductQuantity(product.id);

          return (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <div className="organic-badge">
                  <FaLeaf />
                  Fresh Organic
                </div>

                <h2>{product.name}</h2>

                <p>{product.description}</p>

                <div className="harvest-time">
                  <FaClock />
                  <span>{product.harvest}</span>
                </div>

                <div className="rating">
                  <FaStar />
                  <span>{product.rating}</span>
                </div>

                {/* AVAILABLE STOCK */}

                <div className="stock-info">
                  Available:
                  <strong>
                    {" "}
                    {product.availableKg - quantityInCart} KG
                  </strong>
                </div>

                <h3>${product.price} / kg</h3>

                <div className="buttons">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={
                      quantityInCart >= product.availableKg
                    }
                  >
                    {quantityInCart >= product.availableKg
                      ? "Out Of Stock"
                      : "Add To Cart"}
                  </button>

                  <button
                    className="details-btn"
                    onClick={() =>
                      setSelectedProduct(product)
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <FaTimes
              className="close-icon"
              onClick={() => setSelectedProduct(null)}
            />

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div className="organic-badge center-badge">
              <FaLeaf />
              100% Farm Fresh
            </div>

            <h2>{selectedProduct.name}</h2>

            <p>{selectedProduct.description}</p>

            <div className="harvest-time modal-time">
              <FaClock />
              <span>{selectedProduct.harvest}</span>
            </div>

            <div className="stock-info">
              Available:
              <strong>
                {" "}
                {selectedProduct.availableKg -
                  getProductQuantity(selectedProduct.id)}{" "}
                KG
              </strong>
            </div>

            <h3>${selectedProduct.price} / kg</h3>

            <button
              onClick={() => addToCart(selectedProduct)}
              disabled={
                getProductQuantity(selectedProduct.id) >=
                selectedProduct.availableKg
              }
            >
              {getProductQuantity(selectedProduct.id) >=
              selectedProduct.availableKg
                ? "Out Of Stock"
                : "Add To Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;