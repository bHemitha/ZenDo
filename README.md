# 🧘‍♂️ ZenDo – Calm Meets Productivity

**ZenDo** is your elegantly crafted personal life planner, designed to bring structure and serenity to your day. With a timeless aesthetic inspired by vintage notebooks and Moleskine diaries, ZenDo lets you plan your tasks, block your time, journal your thoughts, and visualize your progress — all in one peaceful interface.

---

## ✨ Key Features

### ✅ Daily Task Planner
- Create, edit, and organize your daily to-do list
- Mark tasks as complete/incomplete
- Unfinished tasks auto-carry forward to the next day

### 🕰️ Time-Blocked Scheduler
- Assign start and end times to tasks
- Build your schedule with an hour-by-hour planner
- Clean, timeline-style visual layout

### 📅 Minimal Calendar View
- Navigate through your schedule and journal entries by date
- Click any day to view, edit, or add content
- Subtle highlights show which dates have activity

### 📓 Daily Journal
- Write one entry per day using Markdown or rich text
- Auto-save support (local first, cloud optional)
- View journal entries via calendar integration
- Private, peaceful writing environment

### 📊 Weekly Productivity Tracker
- Visual chart showing daily task completion trends
- Daily breakdown and weekly score
- Optional end-of-week review prompts

### 🌿 Daily Affirmations
- Gentle motivational quote shown each morning
- Option to customize or use your own collection
- Designed to foster mindfulness and intentionality

### 🎨 Vintage-Inspired Design
- Typography: *Playfair Display*, *Cormorant Garamond*, *DM Serif Display*
- Color palette: muted olive, ivory cream, soft navy, dusty gold
- Elegant spacing, smooth animations, and gentle transitions

---

## 🚀 Tech Stack

| Layer        | Technology                              |
|--------------|------------------------------------------|
| Frontend     | React.js, Tailwind CSS                   |
| State Mgmt   | React Hooks + Context API or Zustand     |
| Calendar     | `react-calendar` or `react-big-calendar` |
| Journal      | `react-markdown`, `react-quill`          |
| Storage      | `localStorage` (MVP), Supabase (optional)|
| Backend (opt)| Node.js + Express                        |
| Database     | PostgreSQL (via Supabase or ElephantSQL) |
| Hosting      | Vercel (Frontend), Render / Supabase     |
| Auth (opt)   | Firebase Auth or Supabase Auth           |

---

## 📦 Folder Structure

zendo/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── styles/
│ ├── utils/
│ ├── App.tsx
│ └── index.tsx
├── .env
├── tailwind.config.js
├── package.json
└── README.md


---

## 🛠️ Getting Started

### 🔧 1. Clone the Repository
```bash
git clone https://github.com/yourusername/zendo.git
cd zendo

📦 2. Install Dependencies

npm install

▶️ 3. Start the Development Server

npm run dev

Visit http://localhost:3000 to use ZenDo locally.

💡 Future Additions
🔒 Sync to cloud with secure login (Supabase or Firebase)

📆 Monthly and Yearly overview modes

⏳ Pomodoro mode with focus tracking

🧘 Meditation / mindful break reminders

🌐 Cross-platform (PWA and mobile app support)

🤝 Contributions
ZenDo is open to contributions, suggestions, and ideas!
Feel free to fork the project, create a pull request, or open an issue.

Crafted with clarity and calm to help you live better, one day at a time. 🌿

---

Let me know if you'd like:
- Shields.io badges (e.g. `made with React`, `MIT license`, etc.)
- Screenshots or GIF previews
- Dark mode toggle in-app
- Deployment setup on Vercel  
I can prepare all of these in seconds.
