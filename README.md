# 🌿 Parks of Mill Creek - Sentiment Analysis App

This is a **full-stack web application** that allows users to **explore parks, view Google Street View images, and analyze sentiment from user reviews**.

## 🚀 Features
- 🌍 **Interactive Map** with parks using OpenStreetMap (No API key required)
- 📊 **Sentiment Analysis** using NLP techniques
- 🏩 **Street View Integration**
- 🔍 **Compare different parks and user reviews**

---

# 🛠️ **How to Install & Run This Project Locally**

## **1️⃣ Clone the Repository**
Run this command in your terminal:
```sh
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

---

## **2️⃣ Backend Setup (Plumber API - R)**
### 📌 **Install R & Required Packages**
Ensure **R** is installed on your system. Then, install all required packages:
```sh
Rscript backend/requirements.R
```

### 📌 **Run the API**
```sh
Rscript backend/app.R
```
This starts the **R API** at `http://127.0.0.1:8000/`.

👉 **Check if the API is running:** Open `http://127.0.0.1:8000/__docs__/` in your browser.

---

## **3️⃣ Frontend Setup (React App)**
### 📌 **Navigate to the frontend folder**
```sh
cd frontend
```

### 📌 **Install dependencies**
```sh
npm install
```

### 📌 **Start the frontend**
```sh
npm start
```
The React app will be available at **`http://localhost:3000/`**.

👉 The frontend automatically fetches data from the backend.

---

# **📂 Project Structure**
```
yourrepo/
│── backend/           # R API using Plumber
│   ├── app.R          # Main backend script
│   ├── requirements.R # Install dependencies
│   ├── fake_reviews.csv  # Preloaded reviews
│   ├── fake_reviews.json # JSON version of reviews
│── frontend/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/      # Review data
│   ├── package.json   # Dependencies
│   ├── index.js
│── .gitignore         # Ignore venv, node_modules
│── README.md
```

---

# 🛠️ **Running the App**
### 📌 **Start the Backend (R API)**
```sh
cd backend
Rscript app.R
```
The API will run at **http://127.0.0.1:8000/**.

### 📌 **Start the Frontend (React App)**
```sh
cd frontend
npm start
```
The frontend will be accessible at **http://localhost:3000/**.

---

# 🛠️ **Troubleshooting**
### **Frontend Issues**
- If `npm start` fails:
```sh
rm -rf node_modules package-lock.json
npm install
npm start
```
- If the map doesn't load, make sure **Leaflet and React Router** are installed:
```sh
npm install react-leaflet leaflet react-router-dom framer-motion
```

### **Backend Issues**
- If R dependencies are missing, run:
```sh
Rscript backend/requirements.R
```
- If the API is **not reachable**, ensure R is running on **port 8000**.