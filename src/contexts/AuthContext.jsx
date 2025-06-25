import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    case 'REGISTER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOAD_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
        user: state.user && state.user.id === action.payload.id ? action.payload : state.user
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        user: state.user && state.user.id === action.payload ? null : state.user,
        isAuthenticated: state.user && state.user.id === action.payload ? false : state.isAuthenticated
      };
    default:
      return state;
  }
};

const initialUsers = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@bookstore.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    users: []
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('bookstore-auth');
    const savedUsers = localStorage.getItem('bookstore-users');
    
    if (savedUsers) {
      dispatch({ type: 'LOAD_USERS', payload: JSON.parse(savedUsers) });
    } else {
      dispatch({ type: 'LOAD_USERS', payload: initialUsers });
      localStorage.setItem('bookstore-users', JSON.stringify(initialUsers));
    }

    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      dispatch({ type: 'LOGIN', payload: authData });
    }
  }, []);

  useEffect(() => {
    if (state.users.length > 0) {
      localStorage.setItem('bookstore-users', JSON.stringify(state.users));
    }
  }, [state.users]);

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem('bookstore-auth', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('bookstore-auth');
    }
  }, [state.isAuthenticated, state.user]);

  const login = (email, password) => {
    const user = state.users.find(u => u.email === email && u.password === password);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return { success: true };
    }
    return { success: false, message: 'Email ou senha incorretos' };
  };

  const register = (userData) => {
    const existingUser = state.users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email já cadastrado' };
    }

    const newUser = {
      ...userData,
      id: Date.now(),
      role: 'user',
      createdAt: new Date().toISOString()
    };

    dispatch({ type: 'ADD_USER', payload: newUser });
    dispatch({ type: 'REGISTER', payload: newUser });
    return { success: true };
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addUser = (userData) => {
    const existingUser = state.users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email já cadastrado' };
    }

    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    dispatch({ type: 'ADD_USER', payload: newUser });
    return { success: true };
  };

  const updateUser = (id, userData) => {
    const existingUser = state.users.find(u => u.email === userData.email && u.id !== id);
    if (existingUser) {
      return { success: false, message: 'Email já está em uso' };
    }

    const updatedUser = {
      ...userData,
      id: parseInt(id),
      updatedAt: new Date().toISOString()
    };

    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    return { success: true };
  };

  const deleteUser = (id) => {
    dispatch({ type: 'DELETE_USER', payload: id });
    return { success: true };
  };

  const getUserById = (id) => {
    return state.users.find(user => user.id === parseInt(id));
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      addUser,
      updateUser,
      deleteUser,
      getUserById
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};