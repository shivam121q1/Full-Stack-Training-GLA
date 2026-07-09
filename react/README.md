# React Practice Arena ⚛️

Welcome to the React Practice Arena! This repository contains a structured, interactive playground for students to learn React.js from absolute basic patterns up to advanced state optimization concepts.

---

## 🚀 How to Run the Arena

To get started, follow these simple steps in your terminal:

1. **Navigate to the React folder**:
   ```bash
   cd react
   ```

2. **Install the dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open the Local URL displayed in your terminal (usually `http://localhost:5173`).

---

## 📖 Curriculum Structure

The practice arena contains 12 lessons split into three levels:

### 🟢 Level 1: Basic (Foundations)
- **01 - Hello World & Props**: Constructing components, properties binding, lists mapping.
- **02 - Interactive Counter (State)**: Dynamic state tracking, boundaries check, conditional warning panels.
- **03 - Dynamic Toggles (Conditional Rendering)**: Conditional displays (`&&`, `? :`), dynamic classes toggle.
- **04 - Render Lists (Lists & Keys)**: Output arrays with unique key identifiers, implement list search bar.

### 🟡 Level 2: Intermediate (Interactivity & Side-Effects)
- **05 - Controlled Forms**: Form bindings (text, selects, inputs, checkboxes), verification handlers.
- **06 - API Fetching (useEffect)**: Lifecycle fetching, loader icons, catch errors, manual refresh.
- **07 - Window Event Listener**: Global events registrations, hook cleanup routines (`removeEventListener`).
- **08 - Lifting State Up**: Host shared state in ancestor, link siblings through callback handlers.

### 🔴 Level 3: Advanced (Context, Reducers, Custom Hooks & Optimization)
- **09 - Theme Context API**: Share global states deeply (dark/light themes) bypassing prop drilling.
- **10 - Shopping Cart (useReducer)**: Orchestrate complex actions (Add, Decrement, Remove, Clear) using dispatchers.
- **11 - Reusable Custom Hooks**: Extract hooks logic into reusable definitions (`useFetch` and `useLocalStorage`).
- **12 - Performance Optimization**: Block wasteful re-renders using `useMemo`, `useCallback`, and `React.memo`.

---

## 🛠 How Students Practice

1. Select an exercise from the sidebar.
2. Read the **Tasks & Objectives** and **Helper Hints** in the left dashboard panel.
3. Open the target file in your code editor. For example, for Lesson 1:
   👉 Open: `react/src/exercises/01_props/Exercise.jsx`
4. Write your code inside the file following the `// TODO` comments.
5. Save the file. The browser will hot-reload your workspace.
6. Swap between the **Student Sandbox** (your work) and **Reference Solution** tabs on the top right to compare outputs!
