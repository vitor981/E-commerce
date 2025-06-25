import { useState } from 'react';
import { FiX, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const result = login(formData.email, formData.password);
      if (result.success) {
        handleClose();
      } else {
        setError(result.message);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        setLoading(false);
        return;
      }

      const result = register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        handleClose();
      } else {
        setError(result.message);
      }
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal login-modal">
        <div className="modal-header">
          <h2>{isLogin ? 'Entrar' : 'Criar Conta'}</h2>
          <button onClick={handleClose} className="close-btn">
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          {!isLogin && (
            <div className="form-group">
              <label>
                <FiUser className="form-icon" />
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required={!isLogin}
                placeholder="Digite seu nome completo"
              />
            </div>
          )}

          <div className="form-group">
            <label>
              <FiMail className="form-icon" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label>
              <FiLock className="form-icon" />
              Senha
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              placeholder="Digite sua senha"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>
                <FiLock className="form-icon" />
                Confirmar Senha
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required={!isLogin}
                placeholder="Confirme sua senha"
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary login-btn"
            disabled={loading}
          >
            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>

          <div className="login-toggle">
            <p>
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button type="button" onClick={toggleMode} className="toggle-btn">
                {isLogin ? 'Criar conta' : 'Fazer login'}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="demo-credentials">
              <p><strong>Credenciais de demonstração:</strong></p>
              <p>Email: admin@bookstore.com</p>
              <p>Senha: admin123</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;