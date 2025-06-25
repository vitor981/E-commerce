import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />
      
      <div className="cart-item-info">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-author">por {item.author}</p>
        <p className="cart-item-price">R$ {item.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="quantity-btn"
          >
            <FiMinus />
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="quantity-btn"
          >
            <FiPlus />
          </button>
        </div>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="remove-btn"
        >
          <FiTrash2 />
        </button>
      </div>

      <div className="cart-item-total">
        R$ {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;