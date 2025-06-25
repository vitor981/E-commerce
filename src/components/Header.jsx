import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiBook, FiLogOut, FiSettings } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <FiBook className="logo-icon" />
            <span>BookStore</span>
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">Início</Link>
            {isAuthenticated && user?.role === 'admin' && (
              <>
                <Link to="/admin" className="nav-link">Produtos</Link>
                <Link to="/users" className="nav-link">Usuários</Link>
              </>
            )}
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="cart-link">
              <FiShoppingCart className="cart-icon" />
              {getCartItemsCount() > 0 && (
                <span className="cart-badge">{getCartItemsCount()}</span>
              )}
            </Link>

            <div className="user-menu">
              {isAuthenticated ? (
                <div className="user-dropdown">
                  <button 
                    className="user-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <FiUser className="user-icon" />
                    <span className="user-name">{user.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="user-dropdown-menu">
                      <div className="user-info">
                        <p className="user-email">{user.email}</p>
                        <span className={`user-role ${user.role}`}>
                          {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                        </span>
                      </div>
                      <div className="dropdown-divider"></div>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="dropdown-item">
                          <FiSettings />
                          Painel Admin
                        </Link>
                      )}
                      <button onClick={handleLogout} className="dropdown-item logout">
                        <FiLogOut />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="login-btn"
                >
                  <FiUser />
                  Entrar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header;