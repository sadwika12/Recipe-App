import { StrictMode } from 'react'
import {createElement} from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import './App.css';
import './index.css';


// ...existing code...
const root = createRoot(document.getElementById("root"));
root.render(
    <App />
);
// ...existing code...



