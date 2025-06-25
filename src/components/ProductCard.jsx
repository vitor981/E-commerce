import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-author">por {product.author}</p>
          <p className="product-price">R$ {product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        <FiShoppingCart />
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;