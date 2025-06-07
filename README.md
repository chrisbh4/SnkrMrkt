# SnkrMrkt 👟

[![Live Site](https://img.shields.io/badge/Live%20Site-SnkrMrkt-blue)](https://snkrmrkt.org)

SnkrMrkt is a full-stack e-commerce platform dedicated to sneaker enthusiasts, offering a seamless experience for buying and selling premium footwear.

## 📋 Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Contact](#contact)

## ✨ Features

### User Authentication
- Secure sign-up and login with email/password
- Demo account available for testing

### Shopping Experience
- Browse comprehensive sneaker catalog
- Detailed product listings with reviews
- Advanced filtering system
- Shopping cart functionality
- Order processing and history tracking

### User Interactions
- Create, edit, and manage shoe listings
- Write and manage product reviews
- Customizable shopping experience with filters

## 🛠 Technologies

### Backend
- Node.js
- Express.js
- SQL
- Sequelize ORM

### Frontend
- React
- Redux
- Chakra UI
- HTML5
- CSS3

### Cloud Services
- AWS (Amazon Web Services)

## 📸 Screenshots

### About Page
![About Page](https://imgur.com/oOcv5cp.png)

### Home Page
![Home Page](https://imgur.com/XbOQzSP.png)

### Product Details
![Shoe Details](https://imgur.com/KQ9k3W4.png)

### Checkout Process
![Checkout Form](https://imgur.com/8UqiqTx.png)

## 🚀 Installation

1. Clone the repository and install dependencies:
   ```bash
   git clone [repository-url]
   cd Snkr_Mrkt
   npm install
   ```

2. Create the database:
   ```bash
   cd backend
   npx dotenv sequelize db:create
   ```

3. Run database migrations:
   ```bash
   npx dotenv sequelize db:migrate
   ```

4. Seed the database:
   ```bash
   npx dotenv sequelize db:seed:all
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

6. In a new terminal, start the frontend:
   ```bash
   cd ../frontend
   npm start
   ```

7. Visit [http://localhost:3000](http://localhost:3000) in your browser

## 📫 Contact

Connect with me:

[![Email](https://img.shields.io/badge/Email-chrismbh4%40gmail.com-red)](mailto:chrismbh4@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Christian%20Brown-blue)](https://www.linkedin.com/in/christian-brown-8770311ba/)
[![GitHub](https://img.shields.io/badge/GitHub-chrisbh4-black)](https://github.com/chrisbh4)

---
© 2024 SnkrMrkt. All rights reserved.
