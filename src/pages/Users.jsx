import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiUser, FiMail, FiLock, FiShield } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Users = () => {
  const { users, addUser, updateUser, deleteUser, user: currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
    setEditingUser(null);
    setShowForm(false);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password && formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    let result;
    if (editingUser) {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      result = updateUser(editingUser.id, updateData);
    } else {
      if (!formData.password) {
        setError('A senha é obrigatória para novos usuários');
        return;
      }
      result = addUser(formData);
    }

    if (result.success) {
      resetForm();
    } else {
      setError(result.message);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (currentUser && currentUser.id === id) {
      alert('Você não pode excluir sua própria conta');
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      deleteUser(id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getRoleLabel = (role) => {
    return role === 'admin' ? 'Administrador' : 'Usuário';
  };

  const getRoleBadgeClass = (role) => {
    return role === 'admin' ? 'role-badge admin' : 'role-badge user';
  };

  return (
    <div className="container">
      <div className="users-page">
        <div className="users-header">
          <h1>Gerenciar Usuários</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <FiPlus />
            Novo Usuário
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h2>
                <button onClick={resetForm} className="close-btn">×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="user-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                  <label>
                    <FiUser className="form-icon" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Digite o nome completo"
                  />
                </div>

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
                    placeholder="Digite o email"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FiLock className="form-icon" />
                    Senha {editingUser && '(deixe em branco para manter a atual)'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required={!editingUser}
                    placeholder={editingUser ? "Nova senha (opcional)" : "Digite a senha"}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FiShield className="form-icon" />
                    Tipo de Usuário
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingUser ? 'Atualizar' : 'Criar'} Usuário
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <FiUser className="user-avatar" />
                      {user.name}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={getRoleBadgeClass(user.role)}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="table-actions">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="btn-edit"
                        title="Editar usuário"
                      >
                        <FiEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="btn-delete"
                        title="Excluir usuário"
                        disabled={currentUser && currentUser.id === user.id}
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

        {users.length === 0 && (
          <div className="no-users">
            <FiUser className="no-users-icon" />
            <p>Nenhum usuário cadastrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;