# 📖 BookStore E-commerce - Relatório

## 🎯 Objetivo do Projeto

O projeto **BookStore E-commerce** tem como objetivo simular uma loja virtual de livros, oferecendo funcionalidades essenciais para usuários e administradores. A aplicação permite aos usuários navegarem por produtos, visualizarem detalhes, adicionarem itens ao carrinho e finalizarem suas compras. Já os administradores podem gerenciar produtos e usuários, garantindo controle sobre o conteúdo da loja. O foco está em uma interface amigável, responsiva e funcional.

---

## 🧰 Tecnologias Utilizadas

### 🔧 Frontend
- **React** (v19.1.0) – Biblioteca principal para construção da interface.
- **React DOM** – Integração do React com o DOM.
- **React Router DOM** – Gerenciamento de rotas.
- **React Icons** – Ícones diversos para enriquecer a UI.

### 💻 Ferramentas de Desenvolvimento
- **Vite** – Ferramenta de build moderna e rápida.
- **ESLint** – Análise estática para garantir qualidade de código.
- **TypeScript (com tipos do React)** – Suporte à tipagem estática.

### 📦 Outras Dependências
- **@vitejs/plugin-react** – Integração oficial do React no Vite.
- **eslint-plugin-react-hooks**, **eslint-plugin-react-refresh** – Regras para manter boas práticas com React.

---

## 📄 Descrição das Páginas e Funcionalidades

A aplicação está dividida em páginas principais, organizadas da seguinte forma:

- **Home** (`/`) – Exibe carrossel com destaque e listagem de produtos.
- **Detalhes do Produto** (`/produto/:id`) – Mostra informações detalhadas sobre um livro.
- **Carrinho** (`/carrinho`) – Lista de produtos selecionados com possibilidade de remoção.
- **Painel Administrativo** (`/admin`) – CRUD completo de produtos.
- **Usuários** (`/usuarios`) – CRUD de usuários da plataforma.

Além disso, há componentes como carrossel, cards de produto, modal de login, entre outros, compondo a experiência completa de navegação.

Funcionalidades implementadas:
- Autenticação de usuários (login e registro)
- Carrinho de compras persistente
- Filtros e sistema de busca
- CRUD de produtos e usuários (admin)
- Interface mobile-first com breakpoints para diferentes dispositivos

---

## 🗂 Onde e Como os Dados Estão Sendo Armazenados

Toda a persistência de dados é realizada no **LocalStorage** do navegador, permitindo manter o estado mesmo após o fechamento da aba. Os seguintes dados são armazenados:

- 🛒 Carrinho de compras
- 👤 Sessão do usuário autenticado
- 📚 Lista de produtos
- 👥 Lista de usuários

Isso garante uma experiência fluida e permite testes da aplicação sem necessidade de backend ou banco de dados externo. Para simulações realistas, há credenciais de demonstração disponíveis:

- **Email**: `admin@bookstore.com`  
- **Senha**: `admin123`
