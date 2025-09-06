# Web Based Editor

A full-stack web application that serves as an AI-powered assistant for developers. It can convert pseudocode to actual code in various languages and provide solutions to general programming problems, all powered by the high-speed Groq API.

---


## 🚀 Project Preview

![Web Based Editor Screenshot](./assets/ss.png.)

---

## Features

* **Code Generation:** Convert natural language or pseudocode into JavaScript, Python, and more.
* **Problem Solver:** Ask any technical question and get a concise, accurate answer.
* **Interactive UI:** A clean and modern user interface built with React and styled with Tailwind CSS.
* **Live Code Editor:** Uses the CodeMirror editor for a smooth and familiar coding experience.
* **Blazing Fast Responses:** Powered by the Groq API with the Llama 3.1 model for near-instantaneous results.

---

## Tech Stack

### Frontend
* **React** (with Vite)
* **Tailwind CSS**
* **CodeMirror**
* **Axios**

### Backend
* **Node.js**
* **Express.js**
* **Groq SDK**
* **Dotenv**

---

## Setup and Installation

To get this project running locally, follow these steps.

### Prerequisites
* Node.js (v18 or later)
* Yarn (or npm)
* A Groq API Key (get one for free at [console.groq.com](https://console.groq.com/))

### 1. Clone the Repository
```bash
git clone [https://github.com/YourUsername/your-repo-name.git](https://github.com/YourUsername/your-repo-name.git)
cd your-repo-name

2. Backend Setup
Bash

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create the environment file (see below)
3. Frontend Setup
Bash

# Navigate to the frontend folder from the root
cd frontend

# Install dependencies
yarn install

## Environment Variables
This project requires a secret API key from Groq to function.

Navigate to the backend directory.

Create a new file named .env.

Add the following content to the file, replacing the placeholder with your actual key:

Code snippet

GROQ_API_KEY="gsk_YourSecretGroqApiKeyGoesHere"
▶️ How to Run
You will need two separate terminals to run both the backend and frontend servers.

1. Run the Backend Server:

Bash

# In the /backend folder
npm start
The server will be running on http://localhost:5000.

2. Run the Frontend Application:

Bash

# In the /frontend folder
yarn dev
The application will open in your browser, usually at http://localhost:5173.