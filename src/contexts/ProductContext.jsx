import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const initialProducts = [
  {
    id: 1,
    title: "Dom Casmurro",
    author: "Machado de Assis",
    price: 29.90,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Um dos maiores clássicos da literatura brasileira, Dom Casmurro narra a história de Bentinho e sua obsessão por Capitu.",
    category: "Literatura Brasileira",
    stock: 15
  },
  {
    id: 2,
    title: "O Cortiço",
    author: "Aluísio Azevedo",
    price: 24.90,
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Romance naturalista que retrata a vida em um cortiço no Rio de Janeiro do século XIX.",
    category: "Literatura Brasileira",
    stock: 12
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 34.90,
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Distopia clássica sobre um futuro totalitário onde o Grande Irmão observa tudo.",
    category: "Ficção Científica",
    stock: 20
  },
  {
    id: 4,
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    price: 19.90,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Uma fábula poética sobre amizade, amor e a natureza humana.",
    category: "Literatura Infantil",
    stock: 25
  },
  {
    id: 5,
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    price: 39.90,
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Obra-prima do realismo mágico que conta a saga da família Buendía.",
    category: "Literatura Latino-americana",
    stock: 8
  },
  {
    id: 6,
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    price: 89.90,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Épica fantasia sobre a jornada para destruir o Um Anel e salvar a Terra-média.",
    category: "Fantasia",
    stock: 10
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('bookstore-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('bookstore-products', JSON.stringify(initialProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('bookstore-products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};