// Books.js
import React, { useState } from 'react';
import './Books.css';

function Books() {
  const [books, setBooks] = useState([
    { id: 1, name: 'Seven-Volume Hardcover Book | Author J.K. Rowling', price: 20000 },
    { id: 2, name: 'Every Avengers Comics', price: 10000 },
    { id: 3, name: 'Every Hulk Comics', price: 1000 },
    { id: 4, name: 'Every Captain America Comics', price: 1000 },
    { id: 5, name: 'Every Iron Man Comics', price: 1000 },
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
  });
  const [step, setStep] = useState(1);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData({ ...checkoutData, [name]: value });
  };

  const proceedToCheckout = () => {
    if (cartItems.length > 0) {
      setStep(3);
    } else {
      alert('Your cart is empty. Please add items to proceed.');
    }
  };

  const confirmOrder = () => {
    const confirmation = {
      items: cartItems,
      ...checkoutData,
    };
    setOrderConfirmation(confirmation);
    setStep(4);
  };

  function calculateTotal() {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }

  return (
    <center>
    <div className="books">
      {step === 1 && (
        <div>
          <h2>Books</h2>
          <ul>
            {books.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} RS{' '}
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setStep(2)}>View Cart</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} RS{' '}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Checkout</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} RS
              </li>
            ))}
          </ul>
          <p>Total: {calculateTotal()} RS</p>
          <form>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={checkoutData.name}
              onChange={handleInputChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={checkoutData.email}
              onChange={handleInputChange}
            />
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={checkoutData.address}
              onChange={handleInputChange}
              required
            />
            <label>Payment Method:</label>
            <select
              name="paymentMethod"
              value={checkoutData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="">Select Payment Method</option>
              <option value="credit">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
            <br></br>
            <button onClick={confirmOrder}>Confirm Order</button>
          </form>
        </div>
      )}
      {step === 4 && (
        <div className="confirmation">
          <h2>Confirmation</h2>
          {orderConfirmation && (
            <div className="orderSummary">
              <h3>Order Summary</h3>
              <ul>
                {orderConfirmation.items.map((item) => (
                  <li key={item.id}>
                    <div className="confirmationItem">
                      <span className="itemName">{item.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p>Total: {calculateTotal()} RS</p>
              <h3>Shipping Information</h3>
              <p>Name: {orderConfirmation.name}</p>
              <p>Email: {orderConfirmation.email}</p>
              <p>Address: {orderConfirmation.address}</p>
            </div>
          )}
        </div>
      )}
    </div>
    </center>
  );
}

export default Books;
