
# Blueprint: Weight Loss & Fitness Tracker

## 1. Overview

This document outlines the ground-up rebuild of the Weight Loss & Fitness Tracker application. The primary goal is to create a stable, reliable, and aesthetically pleasing web application that helps users track their weight, meals, and progress towards their fitness goals.

This rebuild is being undertaken to correct fundamental architectural flaws that led to critical errors, including infinite rendering loops. The new architecture will prioritize stability, state management integrity, and a superior user experience.

## 2. Core Features

The application will include the following features:

*   **User Authentication:** Secure user sign-up and login. User data will be persisted locally.
*   **Onboarding Flow:** New users or users with incomplete profiles will be guided to complete their profile information (age, gender, height, goal weight).
*   **Dashboard:** A central hub displaying:
    *   A welcome message.
    *   A chart visualizing weight progress over time.
    *   Key metric cards: Current Weight, Starting Weight, Goal Weight, BMR, and Total Calories Consumed Today.
*   **Profile Management:** A dedicated page for users to view and update their personal details.
*   **Daily Weight Logging:** A modal to quickly log the user's weight for the current day.
*   **Meal Logging:** A dedicated page to log meals, including a description and calorie count. The page will display a list of meals logged for the current day.
*   **Responsive Design:** A fully responsive and mobile-first user interface.

## 3. Technology Stack & Libraries

*   **Framework:** React (with Vite)
*   **Component Library:** Material-UI (MUI) for a comprehensive and customizable set of UI components.
*   **Routing:** `react-router-dom` for client-side navigation.
*   **State Management:** `zustand` for simple, powerful, and performant global state management.
*   **Charting:** `recharts` for creating beautiful and interactive charts.
*   **Linting & Formatting:** ESLint and Prettier to maintain code quality.

## 4. Design & Styling Philosophy

The application will adhere to a modern, bold, and intuitive design language.

*   **Color Palette:** A vibrant and energetic palette. Primary color will be a deep purple, with complementary colors for accents, charts, and notifications.
*   **Typography:** Clean and readable fonts (e.g., Roboto from Google Fonts, the default for MUI) with a clear hierarchy for headings, subheadings, and body text.
*   **Layout:** Consistent use of spacing, padding, and Material-UI's grid system to create a balanced and visually appealing layout.
*   **Components:** Use of modern MUI components, with subtle "lifted" effects (drop shadows) on cards and "glow" effects on interactive elements to create a sense of depth and premium quality.
*   **Iconography:** Integration of icons to enhance usability and visual appeal.

## 5. Architectural Plan & Rebuild Steps

This section details the step-by-step plan for the rebuild.

### **Phase 0: Project Cleanup**

1.  **Delete Existing Source:** Remove all files from the `src` directory to ensure a completely clean slate.
2.  **Verify Dependencies:** Review `package.json` and reinstall all necessary dependencies from scratch (`npm install`).

### **Phase 1: Foundation & Core Structure**

1.  **Create `main.jsx`:**
    *   Set up the main application entry point.
    *   Wrap the entire application in `BrowserRouter`.
2.  **Create `theme/theme.js`:**
    *   Define the custom Material-UI theme (colors, typography).
3.  **Create `App.jsx`:**
    *   The root component of the application.
    *   Wrap all content in MUI's `ThemeProvider` and `CssBaseline`.
    *   Implement the main routing structure using `Routes` and `Route`.
    *   Include a `Navbar` component for consistent navigation.
4.  **Create `components/ErrorBoundary.jsx`:**
    *   Implement a global error boundary to catch runtime errors and display a user-friendly fallback UI. This is critical for preventing the "blank screen" issue.
    *   Wrap the entire application's route content within this boundary.

### **Phase 2: State Management (Zustand)**

1.  **Create `store/userStore.js`:**
    *   Define the store structure, including `users` and `currentUser`.
    *   **Crucially, the `updateProfile` function will be re-written to be defensive. It will explicitly preserve the references of `weightLog` and `mealLog` from the existing state, preventing the primary cause of the previous infinite loops.**
    *   Implement all necessary actions: `signup`, `login`, `logout`, `updateProfile`, `addWeightLog`, `addMealLog`.
    *   Set up `persist` middleware for local storage.

### **Phase 3: Components & Pages**

1.  **Create `components/Navbar.jsx`:** A responsive navigation bar.
2.  **Create Pages:**
    *   `pages/SignUp.jsx`
    *   `pages/Login.jsx`
    *   `pages/Dashboard.jsx`
    *   `pages/Profile.jsx`
    *   `pages/Meal.jsx`
3.  **Implement Routing:** Define routes for all pages in `App.jsx`, including protected routes that redirect to the login page if no user is signed in.

### **Phase 4: Feature Implementation**

1.  **Authentication:** Build the UI and logic for the `SignUp` and `Login` pages.
2.  **Profile Page:** Build the `Profile` page form and connect it to the (new, stable) `updateProfile` action.
3.  **Meal Logging:** Build the `Meal` page, including the input form and the list of today's meals. Use `useMemo` correctly to prevent re-renders when filtering the meal log.
4.  **Dashboard:**
    *   Build the component using **granular, memoized selectors** from Zustand from the start to ensure optimal performance and prevent unnecessary re-renders.
    *   Implement the `recharts` line chart for weight progress.
    *   Create the summary stat cards.
    *   Implement the `useEffect` logic for the onboarding modals (`Profile` and `LogWeightModal`) with checks to prevent them from opening if they are already open.
