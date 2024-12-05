import React from 'react';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  // Remove item from cart
  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter((item) => item.name !== itemToRemove.name));
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {cart.length > 0 ? (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button className="delete-button" onClick={() => removeFromCart(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
