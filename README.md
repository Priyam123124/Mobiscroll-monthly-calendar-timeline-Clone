# Mobiscroll Monthly Calendar Timeline Clone

This project is a clone of the Mobiscroll monthly calendar timeline, built using Vite and React. It provides an interactive calendar interface where users can manage events across multiple resources and dates.

## Features

- **Calendar Navigation**: Change the calendar view by month and year.
- **Quick Navigation Buttons**: Decrease month, move to today, and increase month buttons.
- **Calendar Interface**:
  - Rows represent resources (e.g., "Resource A" to "Resource O").
  - Columns represent dates and days of the month.
  - Click on any box to add an event.
  - Drag events to change their duration or position.
  - Add more resources dynamically.
  - Highlight the current date.
  - Delete events with a confirmation alert.
- **Persistent State**: Data is stored in local storage to prevent data loss on refresh.
- **State Management**: Implemented using `useState`, `useContext`, `createContext`, and `useRef`.
- **Component-Based Architecture**: Modular components for better maintainability.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   git clone https://github.com/Priyam123124/Mobiscroll-monthly-calendar-timeline-Clone.git
   cd mobiscroll-calendar-clone
2. **Install Dependencies:**
   npm install
3. **Start the development server:**
   npm run dev

4. Open your browser and navigate to http://localhost:3000 to see the app in action.

## Project Structure

mobiscroll-calendar-clone/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── Footer.jsx
│   │   ├── Dd.jsx
│   │   ├── Alert.jsx
│   │   ├── delete.svg
│   │   ├── nav.css
│   │   └── footer.css
│   ├── context/
│   │   ├── CalendarContext.jsx
│   │   ├── WebContext.jsx
│   │   └── WebState.jsx
│   ├── App.jsx
│   ├── index.jsx
│   ├── main.jsx
│   ├── add.png
│   ├── android-logo.svg
│   ├── Apple_logo.svg
│   ├── usaflag.png
│   └── window_logo.svg
├── .gitignore
├── package.json
├── README.md
├── vite.config.js
└── yarn.lock 


## Available Scripts

**npm run dev**: Starts the development server.
**npm run build**: Builds the app for production.
**npm run serve**: Serves the production build locally.
**npm run lint**: Lints the code for errors and style issues.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or features you'd like to add.

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## Short Answers

### 3 Things Learned

1. Learnt About using onMouseDown, onMouseMove, onMouseUp event
2. Learnt to use .map and for loop to render enormous amount of divs easily
3. Learnt to store and retrive array & objects from localStorage by using JSON.strigify and JSON.parse

### Most Difficult Part

Most Difficult part was the dragging and positioning of the event DIV becuase I had to use onMouse move to handle two event like dragging after click & mouseMove on the edge of the div and positioning after click & mouseMove the center of the div. Along with that i had to manage start time and end time of the event on mouseMove Event.

### What Would Have Been Done Differently

I would refine the logic of the events and add more event listeners for better user experience. I would implement features like alarm and notification for a particular event. I would try to make more appealing UI for the app.
