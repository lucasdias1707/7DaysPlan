# 7DaysPlan

Este repositório contém um projeto fullstack composto por um servidor backend utilizando **Node.js** com **Fastify** e um frontend desenvolvido com **React** e **TailwindCSS**.

## Tecnologias Utilizadas

### Backend (Server)
- **Node.js** com **Fastify**
- **Drizzle ORM** para manipulação do banco de dados
- **PostgreSQL** como banco de dados
- **Zod** para validação de schemas
- **CORS** para segurança de requisições

### Frontend (Web)
- **React 19** com **Vite** para desenvolvimento rápido
- **TailwindCSS** para estilização
- **React Hook Form** para manipulação de formulários
- **Radix UI** para componentes acessíveis
- **Tanstack React Query** para gerenciamento de estado assíncrono

## Como Rodar o Projeto

### Requisitos
- **Node.js 18+** instalado
- **Node.js** instalado
- **Docker** instalado e configurado
- **PostgreSQL** configurado e rodando
- **Gerenciador de pacotes** (npm ou yarn)

### Subindo a Instância do Banco de Dados com Docker
O projeto contém um arquivo `docker-compose.yml` para facilitar a inicialização do banco de dados. Para subir a instância do PostgreSQL, execute:
```sh
  docker-compose up -d
```
Isso iniciará o banco de dados em segundo plano.

### Clonando o Repositório
```sh
  git clone https://github.com/lucasdias1707/7DaysPlan.git
  cd 7DaysPlan
```

### Configurando o Backend (Server)
1. Acesse a pasta do servidor:
   ```sh
   cd server
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure o banco de dados e as variáveis de ambiente criando um arquivo `.env`.
4. Execute as migrações e seeds (se aplicável):
   ```sh
   npm run seed
   ```
5. Inicie o servidor em modo desenvolvimento:
   ```sh
   npm run dev
   ```

### Configurando o Frontend (Web)
1. Acesse a pasta do frontend:
   ```sh
   cd web
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

O frontend estará disponível em [http://localhost:5173](http://localhost:5173) (ou outra porta definida pelo Vite).

## Estrutura do Projeto
```
/
├── server/   # Backend
│   ├── src/http/  # Rotas e lógica do servidor
│   ├── src/db/    # Configuração do banco de dados
│   ├── .env       # Configuração das variáveis de ambiente (não versionado)
│   ├── package.json
│   └── ...
│
└── web/      # Frontend
    ├── src/
    │   ├── components/  # Componentes reutilizáveis
    │   ├── pages/       # Páginas principais
    │   ├── hooks/       # Hooks personalizados
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── ...
    ├── tailwind.config.js
    ├── package.json
    └── ...
```