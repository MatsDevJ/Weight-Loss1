# Weight Loss App Blueprint

## Overview

A responsive web application designed to help users track their weight loss progress. The app provides features for user authentication, profile management, weight logging, and progress visualization. It is built with React and MUI for a modern and intuitive user experience.

## Implemented Features

- **Project Setup:**
  - Installed all necessary dependencies (`@mui/material`, `react-router-dom`, `recharts`, `zustand`).
  - Created a structured directory layout for `components`, `pages`, `theme`, and `store`.
- **Theming & Styling:**
  - A custom MUI theme has been created with a specific color palette and typography.
  - `CssBaseline` is used for consistent styling.
- **User Authentication & Onboarding:**
  - Implemented client-side routing using `react-router-dom`.
  - Created `SignUp.jsx` and `Login.jsx` pages.
  - Users can sign up with their name and email.
  - Existing users can log in with their email.
  - A global `userStore` (using `zustand`) manages user data and authentication state.
  - The navigation bar dynamically changes based on whether a user is logged in.
  - When a new user logs in for the first time, a modal prompts them to complete their profile (Name, Age, Gender, Height, Goal Weight, and Current Weight). All fields are mandatory.
  - The user's first weight entry is automatically logged upon completion of their initial profile.
- **State Management:**
  - Set up a global state management store using `zustand`.
  - The store manages all user data, including profile information and weight logs.
- **Pages & Components:**
  - **Profile Page:**
    - A functional page where users can view and edit their profile information.
    - Users can log their current weight, which is stored with the date.
    - A history of all logged weights is displayed.
    - Snackbar notifications confirm when the profile is saved or a new weight is logged.
  - **Dashboard Page:**
    - Displays a personalized welcome message.
    - Features a weight progress chart using `recharts` to visualize the user's weight log over time.
    - Includes summary cards for "Starting Weight," "Current Weight," "Goal Weight," and "BMR."
    - Calculates and displays the user's Basal Metabolic Rate (BMR) using the Mifflin-St Jeor formula.
    - Displays a card with the total calories consumed for the current day.
  - **Meal Page:**
    - A dedicated page for logging meals.
    - Includes a form for users to enter a free-text description of their meal and an optional weight/volume.
    - A mock calorie calculation function is in place for demonstration purposes.
    - Displays a log of all meals consumed on the current day.

## Design & Styling
- **Framework:** React with Vite.
- **Component Library:** MUI (Material-UI) for a consistent and modern look and feel.
- **Routing:** `react-router-dom` for navigating between pages.
- **Charts:** `recharts` for data visualization.
- **State Management:** `zustand` for global state management.
- **Layout:** A clean, card-based layout that is mobile-responsive.
- **Color Palette:** A motivating and energetic color scheme.
- **Typography:** Clear and readable fonts.

## Current Task: Meal Tracking

- **Task:** Implement a feature for users to log their meals and track their daily calorie intake.
- **Completed Steps:**
    - Updated the `userStore` to include a `mealLog` for each user.
    - Created a new "Meal" page with a form for meal input.
    - Implemented a mock calorie calculation.
    - Updated the dashboard to display the total daily calorie intake.
    - Added navigation to the new "Meal" page.