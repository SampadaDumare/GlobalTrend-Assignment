import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import TaskState from './context/TaskState.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TaskState>
        <Navbar />
        <App />
      </TaskState>
    </BrowserRouter>
  </StrictMode>
);