import React, { useState } from 'react';
import './Books.css';
function Product() {
  const [menuItems, setMenuItems] = useState([
    
    { id: 1, name: 'Beyond Burger ', price: 200},
    { id: 2, name: 'Beyond Chicken Tenders', price: 300},
    { id: 3, name: 'Beyond Chicken Nuggets', price: 150},
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
    <div className="product">
      {step === 1 && (
        <div>
          <h2>Menu</h2>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price}RS{' '}
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
                {item.name} - {item.price}RS{' '}
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
                {item.name} - {item.price}RS
              </li>
            ))}
          </ul>
          <p>Total: {calculateTotal()}RS</p>
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
              <option value="UPI">UPI</option>
            </select>
            <br></br>
            <button onClick={confirmOrder}>Confirm Order</button>
          </form>
        </div>
      )}
      {step === 4 && (
        <center>{step === 4 && (
          <div>
            <h2>Confirmation</h2>
            {orderConfirmation && (
              <div>
                <h3>Order Summary</h3>
                <ul>
                  {orderConfirmation.items.map((item) => (
                    <li key={item.id}>
                      {item.name} - {item.price}RS
                    </li>
                  ))}
                </ul>
                <p>Total: {calculateTotal()}RS</p>
                <h3>Shipping Information</h3>
                <p>Name: {orderConfirmation.name}</p>
                <p>Email: {orderConfirmation.email}</p>
                <p>Address: {orderConfirmation.address}</p>
                <p>Payment Method: {orderConfirmation.paymentMethod}</p>
              </div>
            )}
          </div>
        )}
      
  </center>
      )}
    </div>
  );
}

export default Books;