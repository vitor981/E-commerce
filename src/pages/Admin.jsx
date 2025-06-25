import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useProducts } from '../contexts/ProductContext';

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    image: '',
    description: '',
    category: '',
    stock: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      price: '',
      image: '',
      description: '',
      category: '',
      stock: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      author: product.author,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock.toString()
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="container">
      <div className="admin-page">
        <div className="admin-header">
          <h1>Painel Administrativo</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <FiPlus />
            Novo Produto
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
                <button onClick={resetForm} className="close-btn">×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Autor</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preço</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Estoque</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Categoria</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>URL da Imagem</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingProduct ? 'Atualizar' : 'Criar'} Produto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.title} className="table-image" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.author}</td>
                  <td>{product.category}</td>
                  <td>R$ {product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="table-actions">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="btn-edit"
                      >
                        <FiEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="btn-delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;