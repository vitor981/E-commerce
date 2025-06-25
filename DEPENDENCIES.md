# 📦 Lista Completa de Dependências - BookStore E-commerce

## 🚀 Dependências de Produção (Production Dependencies)

### Framework Principal
- **react** (^19.1.0) - Biblioteca JavaScript para construção de interfaces de usuário
- **react-dom** (^19.1.0) - Renderização do React para o DOM

### Roteamento
- **react-router-dom** (^6.26.1) - Roteamento declarativo para React

### Ícones
- **react-icons** (^5.2.1) - Biblioteca de ícones populares para React (inclui Feather Icons, Font Awesome, etc.)

## 🛠️ Dependências de Desenvolvimento (Development Dependencies)

### Build Tool
- **vite** (^7.0.0-beta.2) - Ferramenta de build rápida e servidor de desenvolvimento

### Plugin do Vite
- **@vitejs/plugin-react** (^4.5.2) - Plugin oficial do Vite para suporte ao React

### Linting (Qualidade de Código)
- **eslint** (^9.29.0) - Ferramenta de linting para JavaScript/TypeScript
- **@eslint/js** (^9.29.0) - Configurações JavaScript do ESLint
- **eslint-plugin-react-hooks** (^5.2.0) - Regras ESLint para React Hooks
- **eslint-plugin-react-refresh** (^0.4.20) - Plugin ESLint para React Fast Refresh
- **globals** (^16.2.0) - Variáveis globais para diferentes ambientes

### TypeScript (Suporte a Tipos)
- **@types/react** (^19.1.8) - Definições de tipos TypeScript para React
- **@types/react-dom** (^19.1.6) - Definições de tipos TypeScript para React DOM

## 📋 Scripts Disponíveis

```json
{
  "dev": "vite",           // Inicia o servidor de desenvolvimento
  "build": "vite build",   // Constrói a aplicação para produção
  "lint": "eslint .",      // Executa o linting do código
  "preview": "vite preview" // Visualiza a build de produção localmente
}
```

## 🔧 Instalação das Dependências

### Usando npm:
```bash
npm install
```

### Usando yarn:
```bash
yarn install
```

### Usando pnpm:
```bash
pnpm install
```

## 🌐 Recursos Externos Utilizados

### Imagens (Pexels)
- **https://images.pexels.com/** - Imagens gratuitas de alta qualidade para:
  - Carrossel principal
  - Produtos (livros)
  - Placeholders

### Fontes
- **Segoe UI, Tahoma, Geneva, Verdana, sans-serif** - Fontes do sistema

## 📱 Funcionalidades Implementadas

### Frontend
- ✅ Interface responsiva (mobile-first)
- ✅ Carrossel interativo com navegação
- ✅ Sistema de autenticação (login/registro)
- ✅ Carrinho de compras funcional
- ✅ CRUD de produtos (admin)
- ✅ CRUD de usuários (admin)
- ✅ Filtros e busca de produtos
- ✅ Páginas de detalhes de produtos

### Armazenamento
- ✅ **LocalStorage** para persistência de dados:
  - Produtos
  - Usuários
  - Carrinho de compras
  - Sessão de autenticação

### Responsividade
- ✅ Design mobile-first
- ✅ Breakpoints para tablet e desktop
- ✅ Componentes adaptativos
- ✅ Imagens otimizadas

## 🎨 Paleta de Cores

- **Amarelo**: #FFD700 (Gold) - Cor principal/destaque
- **Laranja**: #FFA500 - Hover states
- **Preto**: #000000 - Texto principal e header
- **Branco**: #FFFFFF - Background principal
- **Cinza**: #666666 - Texto secundário

## 🚀 Como Executar o Projeto

1. **Clone o repositório**
2. **Instale as dependências**: `npm install`
3. **Execute o projeto**: `npm run dev`
4. **Acesse**: http://localhost:5173

### Credenciais de Demonstração
- **Email**: admin@bookstore.com
- **Senha**: admin123

## 📦 Estrutura de Arquivos

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Carousel.jsx    # Carrossel principal
│   ├── Header.jsx      # Cabeçalho com navegação
│   ├── LoginModal.jsx  # Modal de login/registro
│   ├── ProductCard.jsx # Card de produto
│   └── CartItem.jsx    # Item do carrinho
├── contexts/           # Contextos React
│   ├── AuthContext.jsx # Autenticação
│   ├── CartContext.jsx # Carrinho
│   └── ProductContext.jsx # Produtos
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── ProductDetail.jsx # Detalhes do produto
│   ├── Cart.jsx        # Carrinho de compras
│   ├── Admin.jsx       # Painel administrativo
│   └── Users.jsx       # Gerenciamento de usuários
├── App.jsx             # Componente principal
├── App.css             # Estilos principais
└── main.jsx            # Ponto de entrada
```

Esta documentação fornece uma visão completa de todas as dependências e recursos necessários para executar o projeto BookStore E-commerce.