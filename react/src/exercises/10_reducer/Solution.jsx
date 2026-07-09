import React, { useReducer } from 'react';

const PRODUCTS = [
  { id: 'p1', name: 'Developer Mechanical Keyboard', price: 89 },
  { id: 'p2', name: 'Ergonomic Vertical Mouse', price: 49 },
  { id: 'p3', name: 'UltraWide Curved Monitor', price: 299 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'DECREMENT_ITEM': {
      const targetItem = state.find(item => item.id === action.payload);
      if (targetItem.quantity === 1) {
        return state.filter(item => item.id !== action.payload);
      }
      return state.map(item =>
        item.id === action.payload 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    }
      
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

export default function ReducerSolution() {
  const [cart, dispatch] = useReducer(cartReducer, [
    { id: 'p1', name: 'Developer Mechanical Keyboard', price: 89, quantity: 1 }
  ]);

  const handleAddItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleDecrementItem = (id) => {
    dispatch({ type: 'DECREMENT_ITEM', payload: id });
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '15px', textAlign: 'center' }}>Reducer Cart Reference Solution</h2>
      
      {/* Product List */}
      <h4 style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '13px' }}>Product Catalog</h4>
      <div style={catalogGrid}>
        {PRODUCTS.map(product => (
          <div key={product.id} style={productCard}>
            <div>
              <h4 style={{ color: '#f8fafc', fontSize: '14px' }}>{product.name}</h4>
              <p style={{ color: '#818cf8', fontSize: '12px', marginTop: '2px' }}>${product.price}</p>
            </div>
            <button 
              style={smallBtnStyle} 
              onClick={() => handleAddItem(product)}
            >
              ✚ Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Shopping Cart display */}
      <div style={cartContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ color: '#cbd5e1', fontSize: '15px' }}>Your Shopping Cart</h3>
          {cart.length > 0 && (
            <button style={clearBtnStyle} onClick={handleClearCart}>
              🗑 Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic', textAlign: 'center', padding: '15px 0' }}>
            Your cart is currently empty.
          </p>
        ) : (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cart.map(item => (
                <div key={item.id} style={cartItemRow}>
                  <div>
                    <h5 style={{ color: '#f8fafc', margin: 0 }}>{item.name}</h5>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                      ${item.price} × {item.quantity}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button style={controlBtn} onClick={() => handleDecrementItem(item.id)}>-</button>
                    <span style={{ color: '#f8fafc', fontSize: '13px', minWidth: '15px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button style={controlBtn} onClick={() => handleAddItem(item)}>+</button>
                    
                    <button 
                      style={{ ...controlBtn, background: 'rgba(248,113,113,0.1)', color: '#f87171', border: 'none', marginLeft: '6px' }} 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={totalRowStyle}>
              <span>Order Summary:</span>
              <span style={{ color: '#00d8ff', fontSize: '18px', fontWeight: 'bold' }}>
                ${totalAmount}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '520px',
  margin: '0 auto',
  textAlign: 'left',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
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
  fontSize: '12px',
  transition: 'background 0.2s',
};

const cartContainer = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.06)',
  padding: '16px',
  borderRadius: '8px',
};

const cartItemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.02)',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid rgba(255,255,255,0.04)',
};

const controlBtn = {
  background: '#334155',
  color: '#cbd5e1',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '4px',
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 'bold',
};

const clearBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#f87171',
  cursor: 'pointer',
  fontSize: '12px',
  textDecoration: 'underline',
};

const totalRowStyle = {
  borderTop: '1px solid rgba(255,255,255,0.08)',
  paddingTop: '12px',
  marginTop: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: '600',
  fontSize: '14px',
  color: '#cbd5e1',
};
