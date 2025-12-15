# 🖥️ Operating System Algorithms Simulator

An interactive **Operating System Algorithms Simulator** built to help understand and visualize core OS concepts such as **CPU Scheduling, Page Replacement, Disk Scheduling, and Deadlock Handling**.

This project provides an intuitive UI where users can experiment with different algorithms, inputs, and see how system behavior changes in real time.

---

## 🌐 Live Demo

🔗 Deployment Link:
👉 [https://operating-systems-algorithms-simula.vercel.app](https://operating-systems-algorithms-simula.vercel.app/)

---

## 🚀 Features

### 🧠 CPU Scheduling Algorithms
- First Come First Serve (FCFS)
- Shortest Job First (SJF)
- Shortest Remaining Time First (SRTF)
- Priority Scheduling  
  - Preemptive  
  - Non-Preemptive
- Round Robin (RR)

---

### 📄 Page Replacement Algorithms
- FIFO (First In First Out)
- Optimal Page Replacement
- LRU (Least Recently Used)
- MRU (Most Recently Used)
- LFU (Least Frequently Used)
- MFU (Most Frequently Used)

---

### 💽 Disk Scheduling Algorithms
- FCFS
- SSTF (Shortest Seek Time First)
- SCAN
- C-SCAN
- LOOK
- C-LOOK

---

### 🔒 Deadlock Algorithms
- Banker’s Algorithm
- Deadlock Detection Algorithm

---

### ✨ Additional Highlights
- Interactive and responsive UI
- Real-time visualization of algorithm behavior
- User-friendly input forms
- Feedback system integrated using **EmailJS**

---

### 🎨 User Experience
- Clean and responsive UI built with Tailwind CSS
- Interactive inputs and real-time outputs
- Easy-to-understand visual representation of algorithms

---

### 📬 Feedback System
- Integrated EmailJS for collecting user feedback directly from the application

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **JavaScript**
- **Tailwind CSS**

### Other Tools
- **EmailJS** – for collecting user feedback

---

## 📦 Run Locally
Follow these steps to run the project on your local machine:

### Clone the repository
```bash
git clone https://github.com/AdityaSingh7905/Operating-Systems-Algorithms-Simulation.git
```

### Navigate to project directory
```bash
cd Operating-Systems-Algorithms-Simulation
```

### Install dependencies
```bash
npm install
```
### Create .env.local file:
```bash
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

### Start the development server
```bash
npm start
```

### The app will run at:
```bash
http://localhost:3000
```

---

## 🤝 Contributing
- Contributions are welcome!
- Feel free to fork this repository, raise issues, or submit pull requests.

---

## 📬 Feedback
- Feedback is highly appreciated!
- You can directly send feedback through the integrated EmailJS system in the application.
