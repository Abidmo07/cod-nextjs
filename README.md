
# Project Title

A brief description of what this project does and who it's for

# 🛍️ Laravel E-Commerce Project (Frontend - Next.js)

## Overview
This is the **frontend** for the Laravel-based eCommerce platform, built using **Next.js** and designed for modern user experience. Customers can browse products, view categories, and place orders using a simple and clean interface. No authentication is required for the checkout process.

---

## Features

- Fully responsive frontend UI
- Product listing with category filtering
- Single product page with order form
- Cash on Delivery (COD) checkout
- Delivery fee displayed dynamically based on Wilaya
- Integration with Laravel backend via RESTful API

---

## Requirements

- **Node.js**: 18.x or higher  
- **npm** or **yarn**: Latest stable version  
- **Next.js**: 13+ with App Router  

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abidmo07/cod-nextjs.git
cd cid-nextj
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install

```
### 3. Configure Environment Variables
Create a .env.local file and set the base URL of your Laravel backend:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```
### Development
```bash
npm run dev
# or
yarn dev
```
### Access the app at:
```bash
http://localhost:3000/
```
### 🛡️ Admin Access
Admins can log in from the following route:
```bash
🔐 http://localhost:3000/auth/login

```
Once authenticated, admins can:

    Manage products and categories

    View and update orders

    Change order status
