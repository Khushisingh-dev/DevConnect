# DevConnect 🚀

A full-stack MERN social platform where developers can share posts, interact through comments, manage profiles, and engage with the community.

---

## 🌟 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality

### 👤 User Profile

* View Profile
* Edit Username
* Edit Bio
* Profile Picture Support
* Delete Account

### 📝 Posts

* Create Posts
* View Posts
* Delete Own Posts
* Post Timestamps
* User-specific Posts

### ❤️ Likes

* Like / Unlike Posts
* Dynamic Like Counter

### 💬 Comments

* Add Comments
* View Comments
* Delete Comments
* Comment Author Display

### 🏠 Feed

* Home Feed
* Latest Posts First
* Interactive Post Cards

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Lucide React
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt.js

---

## 📂 Project Structure

```bash
DevConnect
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🗄 Database Collections

### User

```js
{
  username,
  email,
  password,
  bio,
  profilePic
}
```

### Post

```js
{
  user,
  content,
  likes,
  createdAt
}
```

### Comment

```js
{
  user,
  post,
  text,
  createdAt
}
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Khushisingh-dev/DevConnect.git
cd DevConnect
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Users

```http
GET    /api/users/:id
PUT    /api/users/profile/update
DELETE /api/users/profile/delete
```

### Posts

```http
GET    /api/posts
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
PUT    /api/posts/like/:id
```

### Comments

```http
GET    /api/comments/:postId
POST   /api/comments/:postId
DELETE /api/comments/:id
```

---

## 🎯 Future Enhancements

* Real-Time Chat
* Follow / Unfollow Users
* Notifications
* Image Uploads
* Search Users
* Dark Mode
* Socket.io Integration

---

## 👨‍💻 Author

**Khushi Singh**

Built with ❤️ using the MERN Stack.
