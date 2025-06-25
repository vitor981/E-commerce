import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    alert(`Pedido finalizado com sucesso!\nTotal: R$ ${getCartTotal().toFixed(2)}\n\nObrigado pela compra!`);
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <FiShoppingBag className="empty-cart-icon" />
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione alguns livros incríveis ao seu carrinho!</p>
          <Link to="/" className="btn-primary">
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-page">
        <h1>Meu Carrinho</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <h3>Resumo do Pedido</h3>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>R$ {getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Frete:</span>
              <span>Grátis</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>R$ {getCartTotal().toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="btn-primary checkout-btn"
            >
              Finalizar Pedido
            </button>
            
            <Link to="/" className="continue-shopping">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;