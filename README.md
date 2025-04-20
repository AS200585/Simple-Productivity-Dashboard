# Productivity Dashboard

A lightweight, browser-based productivity suite featuring a to-do list, pomodoro timer, and daily notes functionality. Built with HTML, CSS, and JavaScript, this dashboard uses localStorage to persist your data between sessions.

## Features

### To-Do List
- Add, remove, and track tasks
- Persistent storage (saves between sessions)
- Inspirational quotes that update with a click
- Clear all functionality

### Pomodoro Timer
- 25-minute work intervals followed by 5-minute breaks
- Automatic cycle tracking
- Start, pause, and reset controls
- Session count persistence

### Daily Notes
- Simple, distraction-free note-taking
- Auto-saving as you type
- Persistent storage using localStorage
- Clear notes option

## Tech Stack

- **HTML5**: The core structure of the application, providing the basic markup for the user interface (UI) of the productivity dashboard.
- **CSS3 with Tailwind CSS**: Tailwind CSS is used to style the application. It offers utility-first CSS classes that enable rapid and responsive design without writing custom styles.
- **JavaScript**: Handles the interactive functionality of the dashboard, including the to-do list management, pomodoro timer controls, and daily notes auto-saving features.
- **Local Storage API**: This is used to persist the data on the user's browser, allowing the application to retain tasks, timer sessions, and notes between sessions without any server-side infrastructure.

## How It Works

The dashboard uses a modular approach where each productivity tool has its own page but shares common styling and JavaScript functionality. Data persistence is achieved through the browser's localStorage API.

### Common Elements
- Live clock in the navigation bar
- Consistent dark theme
- Responsive design
- Cross-page navigation

### JavaScript Structure
The main `script.js` file contains modular code blocks that load only when the relevant DOM elements are present, allowing the same script to be used across all pages.

## Using the Application
- **Home Page**: Navigate to any tool using the top navigation bar
- **To-Do List**: Add tasks, check them off, or remove them
- **Pomodoro Timer**: Use the 25/5 minute work/break cycle to stay focused
- **Notes**: Keep track of important information
