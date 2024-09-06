import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import '../styles/Cart.css';

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const { loading, error, request } = useApi();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await request('get', '/cart');
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await request('delete', `/cart/remove/${itemId}`);
      fetchCart(); // Refresh cart after removal
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
    }
  };

  const clearCart = async () => {
    try {
      await request('delete', '/cart/clear');
      fetchCart(); // Refresh cart after clearing
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`cart ${isOpen ? 'open' : ''}`}>
      <button className="cart-toggle" onClick={toggleCart}>
        Panier ({cart.items.length})
      </button>
      {isOpen && (
        <div className="cart-content">
          <h3>Votre panier</h3>
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur: {error}</p>
          ) : cart.items.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <>
              <ul>
                {cart.items.map(item => (
                  <li key={item._id}>
                    {item.title} - {item.price.toFixed(2)} €
                    <button onClick={() => removeFromCart(item._id)}>Supprimer</button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                Total: {cart.total.toFixed(2)} €
              </div>
              <button className="clear-cart" onClick={clearCart}>Vider le panier</button>
              <button className="checkout">Passer à la caisse</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;