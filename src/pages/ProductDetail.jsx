import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Produto não encontrado</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Voltar à página inicial
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert('Produto adicionado ao carrinho!');
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <FiArrowLeft />
        Voltar
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-author">por {product.author}</p>
          <p className="product-detail-category">{product.category}</p>
          
          <div className="product-detail-price">
            R$ {product.price.toFixed(2)}
          </div>

          <div className="product-detail-description">
            <h3>Descrição</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-detail-stock">
            <p>Estoque: {product.stock} unidades</p>
          </div>

          <button 
            onClick={handleAddToCart}
            className="btn-primary add-to-cart-detail"
            disabled={product.stock === 0}
          >
            <FiShoppingCart />
            {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;