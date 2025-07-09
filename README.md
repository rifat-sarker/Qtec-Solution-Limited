# 🛒 Qtec Solution Limited - Server

This is the backend server for **Qtec Solution Limited**, a shopping cart application built with Express and MongoDB. It includes product management, cart operations, and server-side validation, designed to work seamlessly with the frontend client.

---

## 🚀 Live Demo

**Frontend (Vercel):**  
🔗 [https://qtec-solution-limited-client.vercel.app](https://qtec-solution-limited-client.vercel.app)

**Backend (Vercel):**  
🔗 [https://qtec-solution-limited-server.vercel.app](https://qtec-solution-limited-server.vercel.app)

---

## 📦 Features

- 🛍 Product management (add/update/get products)
- 🛒 Add to cart, update quantity, and calculate total
- 🔐 Input validation
- 🌐 API-based architecture ready for frontend integration
- 🌍 CORS-configured for Vercel and local development

---

## 🧪 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/rifat-sarker/Qtec-Solution-Limited.git
cd Qtec-Solution-Limited
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Environment Setup
Create a .env file at the root:
```
PORT=5000
DATABASE_URL=""
NODE_ENV=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_SECRET=""
CLOUDINARY_API_KEY=""
```

### 4. Build the Project
```bash
bun run build
```

### 5. Start the Server
```bash
bun run start:prod
```

### 6. Development Mode
```bash
bun run dev
```

### 🛠 Tech Stack
| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| **Node.js**    | Runtime environment           |
| **Express.js** | Web framework                 |
| **MongoDB**    | NoSQL database                |
| **Mongoose**   | ODM for MongoDB               |
| **TypeScript** | Static typing                 |
| **Zod**        | Input validation              |
| **Vercel**     | Deployment platform (server)  |
| **CORS**       | Cross-Origin Resource Sharing |
| **Multer**     | File uploads (for future use) |


### 📁 Project Structure
```
src/
├── app/
│   ├── modules/
│   │   ├── cart/
│   │   ├── product/
│   │   └── ...
│   └── routes/
├── config/
├── utils/
└── server.ts
```


### 📬 API Endpoints
```
| Method | Endpoint                      | Description          |
| ------ | ------------------------------|--------------------- |
| POST   | `/api/cart/add`               | Add product to cart  |
| PATCH  | `/api/cart/item/:cartItemId`  | Update item quantity |
| GET    | `/api/cart`                   | Get current cart     |
| GET    | `/api/products`               | Get all products     |
| GET    | `/api/products/:productId`    | Get product by ID    |

```

👨‍💻 Author
Rifat Sarker
🌐 LinkedIn
📧 rifatswd@gmail.com
