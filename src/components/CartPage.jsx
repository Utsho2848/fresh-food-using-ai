// CartPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/CartPage.css";

import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";


function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // INCREASE

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (
        item.id === id &&
        item.quantity < item.availableKg
      ) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);
  };

  // DECREASE

  const decreaseQuantity = (id) => {
  const updatedCart = cart.map((item) => {
    if (item.id === id && item.quantity > 1) {
      return {
        ...item,
        quantity: item.quantity - 1,
      };
    }

    return item;
  });

  setCart(updatedCart);
};

  // REMOVE

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);
  };

  // TOTAL

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
  <div className="cart-page">
    {/* TOP HEADER */}

    <div className="cart-top">
      <button
        className="back-btn"
        onClick={() => navigate("/products")}
      >
        <FaArrowLeft />
      </button>

      <h1>Your Shopping Cart</h1>
    </div>

    {/* EMPTY CART */}

    {cart.length === 0 ? (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>

        <p>
          Fresh vegetables are waiting for you 🌱
        </p>

        <button
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    ) : (
      <>
        {/* CART ITEMS */}

        <div className="cart-items">
          {cart.map((item) => (
            <div
              className="cart-card"
              key={item.id}
            >
              {/* IMAGE */}

              <img
                src={item.image}
                alt={item.name}
              />

              {/* INFO */}

              <div className="cart-info">
                <h2>{item.name}</h2>

                <p>{item.description}</p>

                <div className="stock-text">
                  Available Stock:
                  {" "}
                  {item.availableKg} KG
                </div>

                <h3>
                  ${item.price} / kg
                </h3>

                {/* ACTIONS */}

                <div className="cart-actions">
                  {/* QUANTITY */}

                  <div className="quantity-box">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      disabled={
                        item.quantity === 1
                      }
                    >
                      <FaMinus />
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      disabled={
                        item.quantity >=
                        item.availableKg
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* DELETE */}

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* TOTAL */}

                <div className="item-price">
                  Total:
                  {" "}
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}

        <div className="cart-summary">
          <div>
            <p>Total Items</p>

            <h2>
              {cart.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}{" "}
              KG
            </h2>
          </div>

          <div>
            <p>Total Price</p>

            <h2>
              $
              {totalPrice.toFixed(2)}
            </h2>
          </div>

          <button
            className="checkout-btn"
            onClick={() =>
              navigate("/payments")
            }
          >
            Place Order
          </button>
        </div>
      </>
    )}
  </div>
);}

export default CartPage;