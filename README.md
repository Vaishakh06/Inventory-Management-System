# 📦 Inventory Management System

A web-based Inventory Management System that helps track and manage product stock in a factory or warehouse. The system allows users to add, update, reduce, and delete stock, along with generating low-stock alerts.

## 🚀 Features
- User Login Authentication  
- Add new products or increase stock  
- Reduce stock when products are used/sold  
- Delete products from inventory  
- View all products  
- Low-stock alert based on threshold  

## 🛠️ Tech Stack
- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js, Express.js  
- Database: MongoDB  

## 📁 Project Structure

inventory-system/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── login.html
│   ├── index.html
│   ├── add.html
│   ├── reduce.html
│   ├── delete.html
│   ├── report.html
│   └── style.css
│
├── .env
└── package.json

## ▶️ How to Run
1. Start MongoDB  
2. Run backend:
   node server.js  
3. Open frontend using Live Server (login.html)

## ⚙️ How It Works
- Frontend sends requests using fetch()  
- Backend handles APIs and logic  
- MongoDB stores data  

## 📌 Use Case
Useful for small industries, shops, and warehouses to manage inventory efficiently.

## 📈 Future Improvements
- Email verification  
- Role-based access  
- Transaction history  
- Cloud deployment  

## 👨‍💻 Author
Vaishakh R