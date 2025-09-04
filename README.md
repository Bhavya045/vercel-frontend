
# 🌐 Full-Stack Portfolio Website

A modern and responsive personal portfolio website built with the **MERN stack**.  
It showcases my profile, skills, education, experience, certifications, and projects in a clean, pastel-themed UI.  

🚀 **Live Demo (Frontend):** [Vercel Deployment](https://vercel-frontend-git-main-bhavyas-projects-12a25f3b.vercel.app/)  
⚙️ **Backend API:** [Render Deployment]([https://vercel-backend-bw39.onrender.com])  

📂 **Repositories**  
- Frontend Repo: [vercel-frontend](https://github.com/Bhavya045/vercel-frontend)  
- Backend Repo: [vercel-backend](https://github.com/Bhavya045/vercel-backend)  

---

## 📂 Project Structure

```

INTER\_PORTFOLIO
│
├── me-api-backend/               # Backend (Node.js + Express + MongoDB)
│   ├── models/                   # Mongoose models
│   ├── node\_modules/             # Dependencies (ignored by git)
│   ├── .env                      # Environment variables
│   ├── .gitignore                # Git ignore file
│   ├── index.js                  # Main server entry point
│   ├── package.json              # Backend dependencies & scripts
│   ├── package-lock.json
│   └── vercel.json               # Deployment config (if used)
│
├── me-api-frontend/              # Frontend (React + CSS)
│   ├── node\_modules/             # Dependencies (ignored by git)
│   ├── public/                   # Static assets
│   ├── src/                      # Source code
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── .env                      # Frontend environment variables
│   ├── .gitignore
│   ├── package.json              # Frontend dependencies & scripts
│   ├── package-lock.json
│   └── README.md                 # Documentation (this file)

```

---

## 🏗️ Architecture

```

Frontend (React, Netlify)  <---->  Backend (Node.js + Express, Render)  <---->  MongoDB (Cloud)

````

- **Frontend:** React.js (functional components & hooks)  
- **Styling:** Custom CSS + Tailwind utilities  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas (cloud-hosted)  
- **Hosting:**  
  - Frontend → Vercel
  - Backend → Render  

---

## ⚙️ Setup Instructions

### 🔹 Clone Repositories
```bash
# Clone frontend
git clone https://github.com/Bhavya045/vercel-frontend.git
cd vercel-frontend
npm install
npm start   # runs on http://localhost:3000

# Clone backend
git clone https://github.com/Bhavya045/vercel-backend.git
cd vercel-backend
npm install
npm run dev   # runs on http://localhost:4000
````

### 🔹 Production Build (Frontend)

```bash
npm run build
```

Deploy the `build/` folder on **Vercel/Render**.

---

## 🗄️ Schema (MongoDB)

### Profile Document

```json
{
  "name": "Bhavya Methi",
  "email": "example@gmail.com",
  "phone": "1234567890",
  "summary": "MERN stack developer and B.Tech IT student.",
  "skills": {
    "languages": ["JavaScript", "Java", "C++"],
    "dsa": "Strong problem-solving",
    "frontend": ["React", "Redux", "Tailwind"],
    "backend": ["Node.js", "Express"],
    "database": ["MongoDB"]
  },
  "projects": [
    {
      "name": "Quick Eats",
      "description": ["Food delivery UI using Swiggy API"],
      "technologies": ["React", "Redux", "Tailwind"],
      "deployment": "https://quick-eats.netlify.app"
    }
  ],
  "education": [
    {
      "institution": "XYZ University",
      "degree": "B.Tech IT",
      "startDate": "2021",
      "endDate": "2025",
      "cgpa": "7.83"
    }
  ],
  "experience": [],
  "certifications": ["MongoDB Basics", "React Essentials"]
}
```

---




## ⚠️ Known Limitations

* Deployment on **Render free tier** may cause a **50s cold start delay**
---

## 📎 Resume

👉 [Bhavya Methi Resume](https://your-resume-link.com)

---

## 👨‍💻 Author

**Bhavya Methi**

* GitHub: [@Bhavya045](https://drive.google.com/file/d/1YFW8VNENoYcBcyD9kytrRBmtrjavgr3n/view?usp=drivesdk)


---

⭐ If you like this project, please give it a **star** on GitHub!

```

 


