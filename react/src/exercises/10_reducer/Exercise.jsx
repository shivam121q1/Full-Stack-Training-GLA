import React, { useReducer } from 'react';

// Product Catalog
const PRODUCTS = [
  { id: 'p1', name: 'Developer Mechanical Keyboard', price: 89 },
  { id: 'p2', name: 'Ergonomic Vertical Mouse', price: 49 },
  { id: 'p3', name: 'UltraWide Curved Monitor', price: 299 },
];

// TODO: 1. Complete the reducer function below to manage state changes
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // TODO: Add item to state array. If already exists, increment its quantity.
      return state;
      
    case 'REMOVE_ITEM':
      // TODO: Remove the item matching action.payload from array.
      return state;

    case 'CLEAR_CART':
      // TODO: Return empty array.
      return state;

    default:
      return state;
  }
}

export default function ReducerExercise() {
  // TODO: 2. Initialize useReducer hook with cartReducer and an empty array state []
  const [cart, dispatch] = [[]]; // Replace with useReducer implementation

  const handleAddItem = (product) => {
    // TODO: Dispatch ADD_ITEM action
  };

  const handleRemoveItem = (id) => {
    // TODO: Dispatch REMOVE_ITEM action
  };

  const handleClearCart = () => {
    // TODO: Dispatch CLEAR_CART action
  };

  // Calculate sum of item prices * quantity
  const totalAmount = 0;

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '15px' }}>Device Catalog</h2>
      
      {/* Product List */}
      <div style={catalogGrid}>
        {PRODUCTS.map(product => (
          <div key={product.id} style={productCard}>
            <div>
              <h4 style={{ color: '#f8fafc' }}>{product.name}</h4>
              <p style={{ color: '#94a3b8', fontSize: '13px' }}>${product.price}</p>
            </div>
            <button 
              style={smallBtnStyle} 
              onClick={() => handleAddItem(product)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Shopping Cart display */}
      <div style={cartContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ color: '#cbd5e1' }}>Shopping Cart</h3>
          <button style={clearBtnStyle} onClick={handleClearCart}>Clear All</button>
        </div>

        {cart.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic' }}>Your cart is empty.</p>
        ) : (
          <div>
            {/* Render cart items */}
            {/* Show item name, quantity, item total, and a delete button */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <strong>Total:</strong>
              <strong style={{ color: '#38bdf8' }}>${totalAmount}</strong>
            </div>
          </div>
        )}
      </div>

      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '25px', textAlign: 'center' }}>
        Open src/exercises/10_reducer/Exercise.jsx and complete the cart reducer!
      </p>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '500px',
  margin: '0 auto',
  textAlign: 'left',
};

const catalogGrid = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '20px',
};

const productCard = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.04)',
  padding: '12px 16px',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const smallBtnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  fontWeight: '600',
  cursor: 'pointer',
};

const cartContainer = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.06)',
  padding: '16px',
  borderRadius: '8px',
};

const clearBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#f87171',
  cursor: 'pointer',
  fontSize: '12px',
  textDecoration: 'underline',
};
