# 🎧 SonicSport

SonicSport is a modern and secure online music streaming platform where users can listen to songs categorized by language and artist. The application supports Google authentication and includes an admin dashboard to manage content and users.

---

## 🚀 Features

- 🎵 **Stream Songs** — Play, pause, skip to next/previous tracks
- 🔐 **Secure Login** — Sign in with **Google OAuth**
- 🧑‍💼 **Admin Dashboard** — Promote users to admin, manage songs and categories
- 📁 **Upload Music** — Admins can upload songs with metadata:
  - 🎤 Artist
  - 🗂️ Category (e.g., language or genre)
- 📚 **Organized Catalog** — Browse music by language, artist, or search

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js
- Tailwind CSS  
- JavaScript
- React-Redux

**Backend:**  
- Node.js  
- Express.js
- Firebase
- MongoDB  

**Authentication:**  
- Google OAuth 2.0  
- JWT-based session management  

**Tools:**  
- Git • Postman • VS Code

---

## 📸 Screenshots


---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/sufal54/sonicsport.git
cd sonicsport

# Install dependencies
npm install

# Set up your environment
cp .env.example .env
# Fill in Google OAuth client IDs, JWT secrets, etc.

# Run locally
npm run dev
