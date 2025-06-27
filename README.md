# 📚 AI-Enhanced Book Management App

A full-stack web application for managing books and authors, with AI-generated book descriptions. Built using **NestJS**, **React**, **MongoDB**, and **OpenAI GPT**.

---

## ✨ Features

- 🔐 JWT-based authentication (access token only)
- 📘 Full CRUD operations for books and authors
- 🔗 Book ↔ Author relation
- 🤖 Generate book descriptions using OpenAI
- 🧭 Protected backend routes via NestJS guards
- 📑 API documentation via Swagger
- 💡 Clean modern UI with Tailwind CSS + React Query

---

## 🛠 Stack

| Layer      | Technology                                 |
|------------|---------------------------------------------|
| Backend    | NestJS, Mongoose, JWT, OpenAI API           |
| Frontend   | React, React Router, Tailwind CSS, React Query |
| Database   | MongoDB                                     |
| Auth       | JWT Access Token (no refresh token)         |
| Docs       | Swagger (`@nestjs/swagger`)                 |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-ai-app.git
cd book-ai-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/bookdb
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

#### Run the server:

```bash
npm run start:dev
```

- API: http://localhost:3001  
- Swagger: http://localhost:3001/api/docs

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

- Frontend: http://localhost:3003

---

## 📑 Swagger Documentation

Access the API documentation at:

```
http://localhost:3001/api/docs
```

Includes all endpoints for:
- Auth
- Book CRUD
- Author CRUD
- AI description generation

---

## 🔐 Auth Flow

- Login via `/auth/login` with email + password
- JWT token is returned and stored on the client
- All protected routes require `Authorization: Bearer <token>`
- Logout is done by clearing the token on the client (no refresh token logic)

---

## 📚 Core Features

### Books

- `GET /books` — get all books
- `GET /books/:id` — get book by ID
- `POST /books` — create a new book
- `PUT /books/:id` — update book
- `DELETE /books/:id` — delete book

Books contain:

- `title`
- `authorName`
- `description`
- `imageUrl`

Relations:
- Book stores `authorId` as reference to an author
- Populated with `author.name`


When a book is created with a new author name, the system auto-creates the author.

---

## 🤖 AI Integration

**Endpoint:**  
```
POST /ai/generate-description
```

**Body:**
```json
{
  "bookTitle": "The Last Memory",
  "authorName": "Jane Doe"
}
```

**Returns:**
```json
{
  "description": "An emotionally gripping tale of..."
}
```

Used on the frontend to generate short blurbs for each book.

---

## 📦 Frontend Highlights

- Uses **React Query** for API state
- **Tailwind CSS** for styling
- Dynamic modals for AI-generated content
- Route protection and redirects
- Forms validated with **Zod**

---

## 📝 License

MIT — Free to use, modify and share.
