# 🏥 Homeopathy Hospital Management System

A premium, full-stack management solution for Homeopathy Hospitals. This repository contains the modern React-based frontend application designed for both patients and clinic administrators.

## ✨ Features

### 👤 Patient Portal
- **Medicine Showcase**: A beautiful, animated catalog of homeopathic remedies.
- **Easy Ordering**: Simple, guided ordering process with real-time validation.
- **Responsive Design**: Optimized for all devices, from mobile phones to desktops.

### 🛡️ Admin Dashboard
- **Real-time Analytics**: Monitor daily visits, monthly trends, and pending tasks.
- **Detailed Order Management**: 
    - Click any order to view full patient details (Address, Phone, etc.).
    - Interactive status updates (Pending → Contacted → Completed).
- **Medicine Vault**: Full CRUD operations for managing the medicine catalog with image uploads.
- **Automated Reporting**: One-click CSV generation for all order data, perfectly formatted for Excel.
- **Secure Access**: JWT-based authentication with refresh token logic for persistent sessions.

## 🚀 Tech Stack

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Design System)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Routing**: React Router 6
- **API Client**: Axios (with interceptors for auth)
- **Feedback**: React Hot Toast

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your backend URL:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── api/          # Axios client and API modules
├── assets/       # Static assets and styles
├── components/   # Reusable UI components (Modals, Layouts, etc.)
├── context/      # Authentication and Global State
├── pages/        # Main application views
└── App.jsx       # Route definitions
```

## 🎨 Design Philosophy
The application follows a **Premium & Clean** aesthetic, utilizing:
- **Glassmorphism**: Subtle backdrop blurs for modern overlays.
- **Dynamic Feedback**: Micro-animations and toast notifications for every action.
- **Vibrant Palettes**: A curated mix of medical emerald and professional slate tones.

---
Built with ❤️ for Homeopathy Hospital.
