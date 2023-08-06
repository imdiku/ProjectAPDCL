import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import SimpleForm from './pages/create/SimpleForm';
import reportWebVitals from './reportWebVitals';
import Output from './pages/view/Output';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<SimpleForm />} />
        <Route path="/view" element={<Output />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
